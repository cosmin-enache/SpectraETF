import * as cdk from 'aws-cdk-lib';
import {aws_apigateway, aws_ec2, aws_sns} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {Constants, LambdaBuilder} from "../utils";
import {
  InstanceClass,
  InstanceSize,
  InstanceType,
  MachineImage,
  Peer,
  Port,
  SecurityGroup,
  Vpc
} from "aws-cdk-lib/aws-ec2";

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

    const defaultVpc = Vpc.fromLookup(this, 'DefaultVPC', {
      vpcId: 'vpc-0a2b413018997c8ac',
    });

    const sshSecurityGroup = new SecurityGroup(this, 'SSHSecurityGroup', {
      vpc: defaultVpc,
      allowAllOutbound: true,
    });

    sshSecurityGroup.addIngressRule(Peer.anyIpv4(), Port.SSH, 'Allow SSH access from anywhere');

    new aws_ec2.Instance(this, 'UITestInstance', {
      instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.MICRO),
      vpc: defaultVpc,
      securityGroup: sshSecurityGroup,
      machineImage: MachineImage.latestAmazonLinux2023()
    });

    new aws_sns.Topic(this, 'UITestFailedTopic', {
      topicName: 'SpectraUITestFailedTopic'
    });
  }
}

export default SpectraETFServiceStack;