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

        template.hasResourceProperties("AWS::ApiGateway::RestApi", {});

        template.hasResourceProperties("AWS::EC2::SecurityGroup", {
            "SecurityGroupEgress": [
                {
                    "CidrIp": "0.0.0.0/0",
                    "Description": "Allow all outbound traffic by default",
                }
            ],
            "SecurityGroupIngress": [
                {
                    "CidrIp": "0.0.0.0/0",
                    "Description": "Allow SSH access from anywhere",
                    "FromPort": 22,
                    "IpProtocol": "tcp",
                    "ToPort": 22
                }
            ]
        });

        template.hasResourceProperties("AWS::EC2::Instance", {
            "InstanceType": "t3.micro"
        });

        template.hasResourceProperties("AWS::SNS::Topic", {
            "TopicName": "SpectraUITestFailedTopic"
        });

        expect(stack.account).toBe(Constants.AWS_ACCOUNT_ID);
        expect(stack.region).toBe(Constants.AWS_REGION);
    });
});