import {SpectraETFServiceStack} from "../../lib/stacks";
import {App, Stack} from "aws-cdk-lib";
import {Constants} from "../../lib/utils";
import {Template} from "aws-cdk-lib/assertions";

describe("SpectraETFServiceStack test suite", () => {
    let stack: Stack;
    let template: Template;

    beforeAll(() => {
        stack = new SpectraETFServiceStack(new App(), 'MockStack', {
            env: {
                account: Constants.AWS_ACCOUNT_ID,
                region: Constants.AWS_REGION,
            }
        });
        template = Template.fromStack(stack);
    });

    it("Stack is constructed as expected", () => {
        template.hasResourceProperties("AWS::Lambda::Function", {
            "FunctionName": "IngestionLambda",
            "Description": "This is our ingestion lambda",
        });

        expect(stack.account).toBe(Constants.AWS_ACCOUNT_ID);
        expect(stack.region).toBe(Constants.AWS_REGION);
    });
});