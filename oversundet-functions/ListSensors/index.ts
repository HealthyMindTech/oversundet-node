import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { DefaultAzureCredential } from '@azure/identity';
import axios, { AxiosResponse } from 'axios';

const TIMESERIES_FQDN = "858c82fb-226a-46bb-89c0-5bb7c278aa73.env.timeseries.azure.com";
const TIMESERIES_QUERY_URL = `https://${TIMESERIES_FQDN}/timeseries/query?api-version=2020-07-31`;
const TIMESERIES_INSTANCES_URL = `https://${TIMESERIES_FQDN}/timeseries/instances?api-version=2020-07-31`

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

const getLastTimeSeen = async function(accessToken: string, timeSeriesId: Array<string>): Promise<any> {
    const headers = {
        Authorization: `Bearer ${accessToken}`
    };

    try {
        const today = new Date();
        const today_minus_30 = new Date();
        today_minus_30.setDate(today.getDate() - 30);

        const variables = MEASUREMENTS.map((measure: string) => {
            return {
                [`Last${measure}Timestamp`]: {
                    "kind": "aggregate",
                    "filter": {
                        "tsx": `coalesce($event['${measure}'].Double, toDouble($event['${measure}'].Long)) != NULL`,
                    },
                    "aggregation": {
                        "tsx": "last($event.$ts)"
                    }
                }
            }
        });

        variables.push({
            LatestFirmware: {
                "kind": "aggregate",
                "filter": {
                    "tsx": "$event['firmware'].String != NULL",
                },
                "aggregation": {
                    "tsx": "last($event['firmware'].String)"
                }
            }
        });

        const projectedVariables = variables.flatMap((s) => Object.keys(s)).concat(["EventCount", "LatestFirmware"]);
        const inlineVariables = Object.assign({}, ...variables);

        let res = await axios.post(TIMESERIES_QUERY_URL, {
            "aggregateSeries": {
                timeSeriesId,
                "searchSpan": {
                    "from": today_minus_30,
                    "to": today
                },
                "interval": "P30D",
                inlineVariables,
                projectedVariables: projectedVariables
            },

        }, { headers });

        return Object.assign({}, ...res.data["properties"].map(
            (x) => {
                return { [x["name"]]: x["values"][1] }
            }
        ));
    } catch (e) {
        console.log(e.response.data);
        throw e;
    }
}

const httpTrigger: AzureFunction = async function(context: Context, req: HttpRequest): Promise<void> {
    const credential = new DefaultAzureCredential();
    const token = await credential.getToken("https://api.timeseries.azure.com/");
    const accessToken = token.token;

    let res = {};

    for await (const l of getSensors(accessToken)) {
        res[l[0]] = getLastTimeSeen(accessToken, l);
    }

    for (const l of Object.keys(res)) {
        res[l] = await res[l];
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: res
    };

};

export default httpTrigger;
