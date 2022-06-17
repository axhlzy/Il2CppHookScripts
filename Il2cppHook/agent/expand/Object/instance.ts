import { cache } from "decorator-cache-getter";

// 拓展 mscorlib.System.Object
class mscorlib_System_Object {

}

// 拓展 UnityEngine.CoreModule.UnityEngine.Object
class UnityEngine_CoreModule_UnityEngine_Object extends mscorlib_System_Object {

    @cache
    static get _toString() {
        // public override string ToString()
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Object", "ToString", 0, "pointer", ["pointer"]);
    }

    @cache
    static get _toString_object() {
        // private static extern string ToString(Object obj);
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Object", "ToString", 1, "pointer", ["pointer", "pointer"]);
    }

    @cache
    static get _set_name() {
        // public void set_name(string value)
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Object", "set_name", 1, "pointer", ["pointer", "pointer"]);
    }

    @cache
    static get _get_name() {
        // public string get_name()
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Object", "get_name", 0, "pointer", ["pointer"]);
    }


}

Il2Cpp.Object.ObjtoString = UnityEngine_CoreModule_UnityEngine_Object.toString


declare global {
    namespace Il2Cpp.Object {
        var name: string
        var ObjtoString: Function
    }
}

class TmpClsT {
    /** @internal */
    static transfromStrToFunction<R extends NativeFunctionReturnType, A extends NativeFunctionArgumentType[] | []>(
        AssemblyName: string, NameSpaces: string, functionName: string, argsCount: number,
        retType: R, argTypes: A
    ) {
        let exportPointer = findMethod(AssemblyName, NameSpaces, functionName, argsCount, false)?.virtualAddress
        if (exportPointer == null) throw new Error("Could not find method")
        return new NativeFunction<R, A>(exportPointer, retType, argTypes);
    }
}

Il2Cpp.Api.t = TmpClsT.transfromStrToFunction

declare global {
    namespace Il2Cpp.Api {
        var t: <R extends NativeFunctionReturnType, A extends NativeFunctionArgumentType[] | []>
            (AssemblyName: string, NameSpaces: string, functionName: string, argsCount: number,
            retType: R, argTypes: A) => any
    }
}
export { };