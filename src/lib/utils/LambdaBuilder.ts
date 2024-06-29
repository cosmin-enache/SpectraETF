import {Code, Function, Runtime} from "aws-cdk-lib/aws-lambda";
import {getLambdasFolderAbsolutePath} from "./utils";
import {Construct} from "constructs";
import {Builder} from "../interfaces";

class LambdaBuilder implements Builder<Function>{
    private _description: string | undefined;
    private _functionName: string | undefined;

    constructor(
        private readonly scope: Construct,
        private readonly id: string,
        private readonly folderName: string,
    ) {}

    build() {
        return new Function(this.scope, this.id, {
            runtime: Runtime.NODEJS_LATEST,
            code: Code.fromAsset(
                `${getLambdasFolderAbsolutePath()}/${this.folderName}`
            ),
            handler: 'lambda.handler',
            description: this._description,
            functionName: this._functionName,
        });
    }

    description(description: string): this {
        this._description = description;

        return this;
    }

    functionName(functionName: string): this {
        this._functionName = functionName;

        return this;
    }
}

export default LambdaBuilder;