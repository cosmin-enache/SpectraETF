import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import Ajv from "ajv";

class HTTPError extends Error {
    constructor(
        readonly message: string,
        readonly statusCode: 400 | 500
    ) {
        super(message);
    }
}

// Handler function
export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    context

    if (event.body === null || event.body === undefined)
        throw new HTTPError("Request doesn't contain any data!", 400)

    const data = JSON.parse(event.body);
    const dataSchema = require('./object-schema.json');
    const ajv = new Ajv();

    ajv.validate(dataSchema, data);

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
