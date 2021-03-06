import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { DefaultAzureCredential, ManagedIdentityCredential } from '@azure/identity';
import axios, { AxiosResponse } from 'axios';

const TIMESERIES_FQDN = "858c82fb-226a-46bb-89c0-5bb7c278aa73.env.timeseries.azure.com";
const TIMESERIES_QUERY_URL = `https://${TIMESERIES_FQDN}/timeseries/query?api-version=2020-07-31`;
const AVAILABILITY_URL = `https://${TIMESERIES_FQDN}/availability?api-version=2020-07-31`

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

const httpTrigger: AzureFunction = async function(context: Context, req: HttpRequest): Promise<void> {
    const timeseries = req.query.device || 'hmt-hq-2';
    let measurements = String(req.query.measure || req.query.measurements || 'Temperature').split(',');
    const interval = req.query.interval || 'PT1M';
    const fromTime = req.query.fromTime || new Date(new Date().getTime() - 86400000).toISOString();
    const toTime = req.query.toTime || new Date().toISOString();
    const credential = new DefaultAzureCredential();
    const output = req.query.format || 'json';

    if (output !== 'json' && output !== 'csv') {
        context.res = {
            body: `Error: invalid output: ${output}`,
            status: 400
        }
        return;

    }
    if (GOOD_INTERVALS.indexOf(interval) === -1) {
        context.res = {
            body: `Error: interval should be one of: ${GOOD_INTERVALS.join(",")}`,
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

    let res: AxiosResponse<any>;
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
                "timeSeriesId": [
                    timeseries
                ],
                "searchSpan": {
                    "from": fromTime,
                    "to": toTime,
                },
                "interval": interval,
                "inlineVariables": Object.assign({}, ...variables),
                "ProjectedVariables": variables.flatMap((variable) => Object.keys(variable))
            },
        }, { headers: { "Authorization": `Bearer ${accessToken}` } });
    } catch (ex) {
        console.log(ex.response.data);
        context.res = {
            body: `Internal error: ${ex.response.data}`,
            status: 500
        }
        return;
    }

    const measurementValues = res.data["properties"].map((property) => ({
        [property["name"]]: property["values"]
    }));


    if (output === 'csv') {
        const headers = ["timestamp", ...measurements].join(',');

        const body = res.data["timestamps"].map((timestamp, idx) => (
            [timestamp, ...res.data["properties"].map((property) =>
                property["values"][idx] === null ? '' :
                    property["values"][idx].toFixed(2))
            ].join(',')
        ));
        const csv = [headers, ...body, ''].join("\r\n");
        context.res = {
            body: csv,
            contentType: "text/csv"
        }
        return;
    } else {
        context.res = {
            body: {
                timestamps: res.data["timestamps"],
                values: res.data["properties"][0]["values"],
                ...Object.assign({}, ...measurementValues)
            },
            contentType: "application/json"
        };
    }
};

export default httpTrigger;
