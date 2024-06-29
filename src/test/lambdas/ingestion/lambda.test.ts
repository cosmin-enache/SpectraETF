import { handler } from "../../../lib/lambdas/ingestion/lambda";
import {APIGatewayProxyEvent, Context} from "aws-lambda";

const MOCK_VALID_OBJECT = {
    token: "as719827dfa7ty38835",
    openPositions: [
        {
            etfAlias: "IS3N.DE",
            etfFullName: "iShares Core MSCI",
            positionType: "BUY",
            Volume: 2.1,
            openPrice: 30.215,
        }
    ]
};

describe("Ingestion Lambda test suite", () => {
    it("When Ingestion Lambda receives expected input, validate according to schema, then return 200 OK", async () => {
        const result = await handler({
            body: JSON.stringify(MOCK_VALID_OBJECT)
        } as APIGatewayProxyEvent, {} as Context);

        expect(result.body).toMatch(JSON.stringify({
            message: 'Ingestion Success!'
        }));
    });

    it("When Ingestion Lambda receives no body in request, expect to throw", async () => {
        await expect(handler({} as APIGatewayProxyEvent, {} as Context))
            .rejects
            .toThrowError("Request doesn't contain any data!")
    });

    it("When Ingestion Lambda receives a request body, but the data is invalid, expect to throw", async () => {
        await expect(handler({ body: {} } as APIGatewayProxyEvent, {} as Context))
            .rejects
            .toThrow();
    });
});