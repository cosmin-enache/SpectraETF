import { getLambdasFolderAbsolutePath } from "../../lib";
import { Code, Function, FunctionProps } from "aws-cdk-lib/aws-lambda";
import { App } from "aws-cdk-lib";
import FakeStack from "../../lib/utils/FakeStack";
import SpyInstance = jest.SpyInstance;
import LambdaBuilder from "../../lib/utils/LambdaBuilder";

jest.mock("aws-cdk-lib/aws-lambda");

describe("LambdaBuilder test suite", () => {
    let lambdaConstructorSpy: SpyInstance;
    let fromAssetFunctionSpy: SpyInstance;

    beforeEach(() => {
        // @ts-ignore
        lambdaConstructorSpy = jest.spyOn(Function.prototype, 'constructor');
        fromAssetFunctionSpy = jest.spyOn(Code, 'fromAsset');
    });

    it("when calling build() with constructor parameters, then create bare-bones lambda", () => {
        const app = new App();

        const mockStack = new FakeStack(app, 'FakeStack', {});
        const mockId = 'mockId';
        const mockFolderName = 'folderName';

        new LambdaBuilder(mockStack, mockId, mockFolderName).build();

        expect(lambdaConstructorSpy).toHaveBeenCalledWith(mockStack, mockId, expect.objectContaining({}));
        expect(fromAssetFunctionSpy).toHaveBeenCalledWith(`${getLambdasFolderAbsolutePath()}/${mockFolderName}`);
    });

    it("when calling build() with constructor parameters, then create fully built lambda", () => {
        const app = new App();

        const mockStack = new FakeStack(app, 'FakeStack', {});

        const mockFunctionName = 'mockFunctionName';
        const mockFunctionDescription = 'mockFunctionDescription';

        const builder = new LambdaBuilder(mockStack, 'mockId', 'folderName');
        builder
            .functionName(mockFunctionName)
            .description(mockFunctionDescription)
            .build()

        expect(lambdaConstructorSpy).toHaveBeenCalledWith(
            expect.anything(),
            expect.anything(),
            expect.objectContaining({
                functionName: mockFunctionName,
                description: mockFunctionDescription
            } as FunctionProps)
        );
    });
});
