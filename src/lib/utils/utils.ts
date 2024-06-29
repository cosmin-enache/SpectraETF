export function getLambdasFolderAbsolutePath(): string {
    const dirArray = __dirname.split("\\");

    dirArray.pop();
    dirArray.push("lambdas");

    return dirArray.join("\\");
}