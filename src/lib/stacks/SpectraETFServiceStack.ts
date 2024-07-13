import * as cdk from 'aws-cdk-lib';
import {aws_apigateway, aws_sns} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {Constants, LambdaBuilder} from "../utils";
import {EmailSubscription} from "aws-cdk-lib/aws-sns-subscriptions";

class SpectraETFServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const ingestionLambda = new LambdaBuilder(this, 'IngestionLambda', Constants.INGESTION_LAMBDA_FOLDER_NAME)
        .functionName("IngestionLambda")
        .description("This is our ingestion lambda")
        .build();

    new aws_apigateway.LambdaRestApi(this, 'ApiGateway', {
      handler: ingestionLambda,
      defaultCorsPreflightOptions: {
        allowOrigins: ['https://xstation5.xtb.com'],
      }
    });

    const uiTestFailedTopic = new aws_sns.Topic(this, 'UITestFailedTopic', {
      // This needs to remain STATIC for the mail SDK on the UI Test server to work
      topicName: 'SpectraUITestFailedTopic'
    })

    uiTestFailedTopic.addSubscription(
        new EmailSubscription("cosminache96@gmail.com")
    );

    uiTestFailedTopic.addSubscription(
        new EmailSubscription("alexenache590@gmail.com")
    );
  }
}

export default SpectraETFServiceStack;