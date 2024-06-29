import Ajv from "ajv";
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
} from 'aws-lambda';

class HTTPError extends Error {
    constructor(
        readonly message: string,
        readonly statusCode: 400 | 500
    ) {
        super(message);
    }
}

// Handler function
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.body === null || event.body === undefined)
        throw new HTTPError("Request doesn't contain any data!", 400)

    const data: object = event.body as any; // We're actually passed an object here, not a string
    const dataSchema = require('./object-schema.json');
    const ajv = new Ajv();

    console.log("Received data:\n" + JSON.stringify(data, null, 4) + "\n");
    console.log("Validating against schema:\n" + JSON.stringify(dataSchema, null, 4) + "\n");

    const isDataValid = ajv.validate(dataSchema, data);

    if (!isDataValid)
        throw new HTTPError("Data is invalid!", 400);

    console.log("Data validation success!");

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: 'Ingestion Success!'
        }),
    };
};
