
// 拓展 mscorlib.System.Object
// 拓展 UnityEngine.CoreModule.UnityEngine.Object

Reflect.set(globalThis, "Il2Cpp.Object", Reflect.get(globalThis, "Il2Cpp.Object"))

/** @internal */
function transfromStrToFunction<R extends NativeFunctionReturnType, A extends NativeFunctionArgumentType[] | []>(
    AssemblyName: string, NameSpaces: string, functionName: string, argsCount: number,
    retType: R, argTypes: A
) {
    let exportPointer = findMethod(AssemblyName, NameSpaces, functionName, argsCount, false)?.virtualAddress
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
export { };