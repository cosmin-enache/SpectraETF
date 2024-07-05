import { handler } from "../../../lib/lambdas/ingestion/lambda";
import {APIGatewayProxyEvent} from "aws-lambda";

const MOCK_VALID_OBJECT = {
    f3ec13d9506d9cc32cdfab2becf36a216d2b2b35c7324c7a9bd44bea51b3a83: {
        891382446: {
            etfAlias: "EUNL.DE",
            etfFullName: "ishares core msci world ucits (acc eur)",
            openDateTime: "2023-03-03T13:12:45Z",
            volume: 1,
            openPrice: 72.704
        },
        891385174: {
            etfAlias: "IS3N.DE",
            etfFullName: "ishares core msci em imi ucits (acc eur)",
            openDateTime: "2023-03-03T13:15:59Z",
            volume: 1,
            openPrice: 27.950
        },
        918364384: {
            etfAlias: "EUNL.DE",
            etfFullName: "ishares core msci world ucits (acc eur)",
            openDateTime: "2023-03-27T15:44:24Z",
            volume: 1,
            openPrice: 71.070
        }
    }
}


describe("Ingestion Lambda test suite", () => {
    it("When Ingestion Lambda receives expected input, validate according to schema, then return 200 OK", async () => {
        const result = await handler({
            body: JSON.stringify(MOCK_VALID_OBJECT)
        } as APIGatewayProxyEvent);

        expect(result.body).toMatch(JSON.stringify({
            message: 'Ingestion Success!'
        }));
    });

    it("When Ingestion Lambda receives no body in request, expect to throw", async () => {
        await expect(handler({} as APIGatewayProxyEvent))
            .rejects
            .toThrowError("Request doesn't contain any data!")
    });

    it("When Ingestion Lambda receives a request body, but the data is empty, expect to throw", async () => {
        await expect(handler({ body: JSON.stringify({}) as any } as APIGatewayProxyEvent))
            .rejects
            .toThrowError("Data is invalid!");
    });

    it("When Ingestion Lambda receives a request body, but the data is invalid, expect to throw", async () => {
        await expect(handler({ body: JSON.stringify({"mockKey": 125}) as any } as APIGatewayProxyEvent))
            .rejects
            .toThrowError("Data is invalid!");
    });
});