import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

// Handler function
export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    // Log the received event and context for debugging purposes
    console.log('Event:', JSON.stringify(event, null, 2));
    console.log('Context:', JSON.stringify(context, null, 2));

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: 'Hello, world!',
            input: event,
        }),
    };
};
