import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { DefaultAzureCredential, ManagedIdentityCredential } from '@azure/identity';
import axios from 'axios';

const TIMESERIES_FQDN = "858c82fb-226a-46bb-89c0-5bb7c278aa73.env.timeseries.azure.com";
const TIMESERIES_QUERY_URL = `https://${TIMESERIES_FQDN}/timeseries/query?api-version=2020-07-31`;
const AVAILABILITY_URL = `https://${TIMESERIES_FQDN}/availability?api-version=2020-07-31`
const MEASUREMENTS = [
    "Temperature",
    "PM1",
    "PM2.5",
    "PM10",
    "Noise",
    "Humidity"
];

const GOOD_INTERVALS = ["PT1M", "PT5M", "PT1H", "PT12H", "P1D"];

const httpTrigger: AzureFunction = async function(context: Context, req: HttpRequest): Promise<void> {
    const timeseries = req.query.device || 'hmt-hq-2';
    let measurement = req.query.measure || 'Temperature';
    const interval = req.query.interval || 'PT1M';
    const fromTime = req.query.fromTime || new Date(new Date().getTime() - 86400000).toISOString();
    const toTime = req.query.toTime || new Date().toISOString();
    const credential = new DefaultAzureCredential();

    if (GOOD_INTERVALS.indexOf(interval) === -1) {
        context.res = {
            body: `Error: interval should be one of: ${GOOD_INTERVALS.join(",")}`,
            status: 400
        }
        return;
    }

    if (MEASUREMENTS.indexOf(measurement) === -1) {
        context.res = {
            body: `Error: measurement should be one of: ${MEASUREMENTS.join(",")}`,
            status: 400
        }
    }

    measurement = `'${measurement}'`;

    const token = await credential.getToken("https://api.timeseries.azure.com/");
    const accessToken = token.token;

    let res;
    try {
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
                "inlineVariables": {
                    "Value": {
                        "kind": "numeric",
                        "value": {
                            "tsx": `$event[${measurement}]`
                        },
                        "filter": {
                            "tsx": `$event[${measurement}].Double != NULL`,
                        },
                        "aggregation": {
                            "tsx": "avg($value)"
                        }
                    },
                },
                "ProjectedVariables": [
                    "Value"
                ]
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

    context.res = {
        body: {
            timestamps: res.data["timestamps"],
            values: res.data["properties"][0]["values"]
        },
        contentType: "application/json"
    };
};

export default httpTrigger;
