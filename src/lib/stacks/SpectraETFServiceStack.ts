import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Constants, LambdaBuilder } from "../utils";
import {aws_apigateway} from "aws-cdk-lib";

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
  }
}

export default SpectraETFServiceStack;