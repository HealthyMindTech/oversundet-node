import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { ManagedIdentityCredential } from '@azure/identity';
import axios from 'axios';

const TIMESERIES_FQDN = "858c82fb-226a-46bb-89c0-5bb7c278aa73.env.timeseries.azure.com";
const TIMESERIES_QUERY_URL = `https://${TIMESERIES_FQDN}/timeseries/query?api-version=2020-07-31`;

const httpTrigger: AzureFunction = async function(context: Context, req: HttpRequest): Promise<void> {
    const timeseries = req.query.timeseries || 'hmt-hq-2';

    const credential = new ManagedIdentityCredential();
    const token = await credential.getToken("https://api.timeseries.azure.com/");

    var accessToken = token.token;

    const res = await axios.post(TIMESERIES_QUERY_URL, {
        "aggregateSeries": {
            "timeSeriesId": [
                timeseries,
            ],
            "searchSpan": {
                "from": "2021-02-14T00:00:00Z",
                "to": "2021-02-15T00:00:00Z"
            },
            "interval": "PT1M",
            "inlineVariables": {
                "Count": {
                    "kind": "aggregate",
                    "filter": null,
                    "aggregation": {
                        "tsx": "count()"
                    }
                },
            },
            "projectedVariables": [
                "Count",
            ]
        }
    }, { headers: { "Authorization": `Bearer ${accessToken}` } });

    console.log(res);


    // POST https://{environmentFqdn}/timeseries/query?api-version=2020-07-31
    // fetch();

    context.res = {
        body: res.data
    };
};

export default httpTrigger;
