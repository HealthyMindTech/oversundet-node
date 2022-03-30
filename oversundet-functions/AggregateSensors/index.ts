import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { DefaultAzureCredential } from '@azure/identity';
import axios, { AxiosResponse } from 'axios';
import Bottleneck from 'bottleneck';

const TIMESERIES_FQDN = "858c82fb-226a-46bb-89c0-5bb7c278aa73.env.timeseries.azure.com";
const TIMESERIES_QUERY_URL = `https://${TIMESERIES_FQDN}/timeseries/query?api-version=2020-07-31`;
const TIMESERIES_INSTANCES_URL = `https://${TIMESERIES_FQDN}/timeseries/instances?api-version=2020-07-31`

const MEASUREMENTS = [
    "Temperature",
    "PM1",
    "PM2.5",
    "PM10",
    "Noise",
    "Humidity",
    "Pressure",
    "Mood"
];

const GOOD_INTERVALS = ["PT1M", "PT5M", "PT1H", "PT12H", "P1D"];

const getSensors = async function*(accessToken: string): AsyncIterable<Array<string>> {
    let continuationToken: string = null;
    try {
        do {
            const headers = {
                'Authorization': `Bearer ${accessToken}`
            }
            if (continuationToken != null) {
                headers["x-ms-continuation"] = continuationToken;
            }
            let res = await axios.get(TIMESERIES_INSTANCES_URL, { headers: headers });
            for (const elem of res.data["instances"]) {
                yield elem["timeSeriesId"];
            }
            continuationToken = res.data["continuationToken"]
        } while (continuationToken != null);
    } catch (e) {
        console.log(e.response.data);
        throw e;
    }
}

const getSensor = async function(accessToken: string, timeSeriesId: Array<string>, measurements: Array<string>,
    fromTime: string, toTime: string, interval: string): Promise<any> {
    const headers = {
        Authorization: `Bearer ${accessToken}`
    };


    let res: AxiosResponse<any>;
    let retries = 5;
    while (retries > 0) {
        try {
            const variables = measurements.map((measurement) => (
                {
                    [measurement]: {
                        "kind": "numeric",
                        "value": {
                            "tsx": `coalesce($event['${measurement}'].Double, toDouble($event['${measurement}'].Long))`
                        },
                        "aggregation": {
                            "tsx": "avg($value)"
                        }
                    }
                }));


            res = await axios.post(TIMESERIES_QUERY_URL, {
                "aggregateSeries": {
                    timeSeriesId,
                    "searchSpan": {
                        "from": fromTime,
                        "to": toTime,
                    },
                    "interval": interval,
                    "inlineVariables": Object.assign({}, ...variables),
                    "ProjectedVariables": variables.flatMap((variable) => Object.keys(variable))
                },
            }, { headers: { "Authorization": `Bearer ${accessToken}` } });
            break;
        } catch (ex) {
            console.log(ex.response.data);
            retries--;
            if (retries === 0) {
                return null;
            }
        }
    };

    const measurementValues = res.data["properties"].map((property) =>
        property["values"].map(value => ({
            [property["name"]]: value
        })));

    const times = {};
    for (let i = 0; i < measurementValues[0].length; i++) {
        times[res.data["timestamps"][i]] = Object.assign({}, ...measurementValues.map(values => values[i]));
    }
    return times;
}

const httpTrigger: AzureFunction = async function(context: Context, req: HttpRequest): Promise<void> {
    const credential = new DefaultAzureCredential();

    let measurements = String(req.query.measure || req.query.measurements || MEASUREMENTS.join(',')).split(',');
    const interval = req.query.interval || 'PT1M';
    const fromTime = req.query.fromTime || new Date(new Date().getTime() - 86400000).toISOString();
    const toTime = req.query.toTime || new Date().toISOString();
    const format = req.query.format || 'json';

    if (GOOD_INTERVALS.indexOf(interval) === -1) {
        context.res = {
            body: `Error: interval should be one of: ${GOOD_INTERVALS.join(",")}`,
            status: 400
        }
        return;
    }

    if (format !== 'json' && format !== 'csv') {
        context.res = {
            body: `Error: invalid format: ${format}`,
            status: 400
        }
        return;
    }

    for (let measurement of measurements) {
        if (MEASUREMENTS.indexOf(measurement) === -1) {
            context.res = {
                body: `Error: measurement should be one of: ${MEASUREMENTS.join(",")}`,
                status: 400
            }
            return;
        }
    }

    if (measurements.length === 0) {
        context.res = {
            body: `Error: expected at least one measurement}`,
            status: 400
        }
        return;
    }
    const token = await credential.getToken("https://api.timeseries.azure.com/");
    const accessToken = token.token;

    let res = {};

    const limiter = new Bottleneck({
        minTime: 25,
        maxConcurrent: 10
    });

    for await (const l of getSensors(accessToken)) {
        res[l[0]] = limiter.schedule(() => getSensor(accessToken, l, measurements, fromTime, toTime, interval));
    }

    for (const l of Object.keys(res)) {
        res[l] = await res[l];
    }

    if (Object.keys(res).length === 0) {
        context.res = {
            body: []
        };
        return;
    }

    const output = [];
    const times = Object.keys(res[Object.keys(res)[0]]);
    for (const t of times) {
        const arr = {};
        for (const device of Object.keys(res)) {
            const d = res[device][t];
            for (const k of Object.keys(d)) {
                if (!arr[k]) {
                    arr[k] = [];
                }
                if (d[k] !== null && d[k] !== undefined) {
                    arr[k].push(d[k]);
                }
            }
        }
        for (const measure of Object.keys(arr)) {
            if (arr[measure].length === 0) {
                arr[measure] = null;
            } else {
                arr[measure] = arr[measure].reduce(
                    (a, b) => a + b) / arr[measure].length;
            }
        }
        arr["Timestamp"] = t;
        output.push(arr);
    }
    if (format === 'csv') {
        const columns = ["timestamp", ...MEASUREMENTS];
        const headers = columns.join(',');
        const lines = output.map(l => [
            l["Timestamp"],
            ...MEASUREMENTS.map(h => l[h] === null ? '' : l[h].toFixed(2))
        ]);
        const csv = [headers, ...lines, ''].join("\r\n");
        context.res = {
            body: csv,
            contentType: "text/csv"
        }
        return;
    } else {
        context.res = {
            body: output
        };
        return;
    }
};


export default httpTrigger;
