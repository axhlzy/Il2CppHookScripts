
function transfromStrToFunction<R extends NativeFunctionReturnType, A extends NativeFunctionArgumentType[] | []>(
    AssemblyName: string, NameSpaces: string, functionName: string, argsCount: number,
    retType: R, argTypes: A
) {
    let method = findMethod(AssemblyName, NameSpaces, functionName, argsCount, false)
    if (method == undefined) throw new Error(`method ${functionName} not found`)
    let exportPointer = method.virtualAddress
    if (exportPointer == null) throw new Error("Could not find method")
    return new NativeFunction<R, A>(exportPointer, retType, argTypes);
}

Il2Cpp.Api.t = transfromStrToFunction

declare global {
    namespace Il2Cpp.Api {
        var t: <R extends NativeFunctionReturnType, A extends NativeFunctionArgumentType[] | []>
            (AssemblyName: string, NameSpaces: string, functionName: string, argsCount: number,
            retType: R, argTypes: A) => any
    }
}

export { }