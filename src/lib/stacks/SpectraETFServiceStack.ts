import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Constants, LambdaBuilder } from "../utils";

class SpectraETFServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new LambdaBuilder(this, id, Constants.INGESTION_LAMBDA_FOLDER_NAME)
        .functionName("IngestionLambda")
        .description("This is our ingestion lambda")
        .build();
  }
}

export default SpectraETFServiceStack;