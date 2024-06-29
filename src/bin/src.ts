#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { StackProps } from "aws-cdk-lib";
import { Constants } from "../lib/utils";
import {SpectraETFServiceStack} from "../lib/stacks";

const app = new cdk.App();

const defaultStackProps: StackProps = {
    env: {
        account: Constants.AWS_ACCOUNT_ID,
        region: Constants.AWS_REGION,
    }
};

new SpectraETFServiceStack(app, 'SpectraETFServiceStack', defaultStackProps);