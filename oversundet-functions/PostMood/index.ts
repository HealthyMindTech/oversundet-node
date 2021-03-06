import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { DefaultAzureCredential } from "@azure/identity";
import { EventHubProducerClient } from "@azure/event-hubs";

const GOOD_CITIES = [
    "elsinore",
    "helsingborg",
    "other"
];

const GOOD_MOODS = {
    "happy": 2,
    "neutral": 1,
    "sad": 0,
    "2": 2,
    "1": 1,
    "0": 0,
};


const httpTrigger: AzureFunction = async function(context: Context, req: HttpRequest): Promise<void> {
    if (req.method !== "POST") {
        context.res = {
            status: 400,
            body: {
                "error": "Only takes Post method"
            }
        }
        return;
    };

    const moodParam: string = String(req.body.mood || '');
    const cityParam: string = (req.body.city || '').toLowerCase();

    const mood = GOOD_MOODS[moodParam.toLowerCase()];
    if (!mood && mood !== 0) {
        context.res = {
            status: 400,
            body: {
                "error": `Didn't recognize mood: ${moodParam}`
            }
        };
        return;
    };


    if (GOOD_CITIES.indexOf(cityParam) === -1) {
        context.res = {
            status: 400,
            body: {
                "error": `Unknown city: ${cityParam}`
            }
        };
        return;
    }


    const credential = new DefaultAzureCredential();
    const producerClient = new EventHubProducerClient("oversundet.servicebus.windows.net",
        "oversundet-hub",
        credential);
    console.log("Creating batch");
    producerClient.sendBatch
    const eventDataBatch = await producerClient.createBatch();
    console.log("Finding batch");

    eventDataBatch.tryAdd({
        body: {
            "deviceId": `web-${cityParam}`,
            "Mood": mood
        }
    });

    await producerClient.sendBatch(eventDataBatch);
    await producerClient.close();

    context.res = {
        status: 200,
        body: {
            "success": `Message sent`
        }
    };


}
export default httpTrigger;
