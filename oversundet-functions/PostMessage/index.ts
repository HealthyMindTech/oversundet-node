import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const CONNECTION_STRING = 'HostName=oversundet.azure-devices.net;SharedAccessKeyName=functions;SharedAccessKey=5YiN8f2sw6ggnc1lvb3Un4QWNDcbZRvR5fl7Wj2Bbtc=';
import { Client } from 'azure-iothub';

let iothub: Client | null = null;
function connectToIoThub(): Client {
    if (iothub === null) {
        iothub = Client.fromConnectionString(CONNECTION_STRING);
    }
    return iothub;
};

const httpTrigger: AzureFunction = async function(context: Context, req: HttpRequest): Promise<void> {
    const deviceParam = req.query.device || req.query.devices;
    if (!deviceParam) {
        context.res = {
            status: 400,
            body: {
                "error": "Expected a device"
            }
        };
        return;
    }
    const devices = deviceParam.split(',');

    const messageParam = req.query.message;
    if (!messageParam) {
        context.res = {
            status: 400,
            body: {
                "error": "Expected a device"
            }
        };
        return;
    }

    if (messageParam.length > 4096) {
        context.res = {
            status: 400,
            body: {
                "error": "Message was too long"
            }
        };
        return;
    }

    let message;
    try {
        message = JSON.parse(messageParam);
    } catch (e) {
        context.res = {
            status: 400,
            body: {
                "error": `Failed to parse message: ${e}`
            }
        };
        return;
    }

    if (typeof (message) !== 'object') {
        context.res = {
            status: 400,
            body: {
                "error": `Need a json object, got: ${message}`
            }
        };
        return;
    }
    const iothub = connectToIoThub();
    devices.forEach((device) => {
        try {
            iothub.send(device, JSON.stringify(message));
        } catch (e) {
            console.log(e);
        }
    });

    context.res = {
        body: "Messages sent!"
    };

};

export default httpTrigger;
