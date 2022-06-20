import { cache } from "decorator-cache-getter";

// 拓展 mscorlib.System.Object
class mscorlib_System_Object_impl implements mscorlib_System_Object {

    handle: NativePointerValue;
    constructor(handleOrWrapper: NativePointerValue) {
        this.handle = handleOrWrapper;
    }

    _equals(obj: mscorlib_System_Object): boolean;
    _equals(objA: mscorlib_System_Object, objB: mscorlib_System_Object): boolean;
    _equals(objA: unknown, objB?: unknown): boolean {
        return Il2Cpp.Api.mscorlibObj._ctor_0((objA as mscorlib_System_Object_impl).handle,
            (objB as mscorlib_System_Object_impl).handle);
    }

    ctor(): mscorlib_System_Object {
        return Il2Cpp.Api.mscorlibObj._ctor_0(allocP(1));
    }

    toString(): string {
        return Il2Cpp.Api.mscorlibObj._toString(this.handle);
    }

    memberwiseClone(): mscorlib_System_Object {
        return Il2Cpp.Api.mscorlibObj._toString(this.handle);
    }

    getType(): Il2Cpp.Type {
        return Il2Cpp.Api.mscorlibObj._getType(this.handle);
    }

    finalize(): void {
        return Il2Cpp.Api.mscorlibObj._finalize(this.handle);
    }

    getHashCode(): number {
        return Il2Cpp.Api.mscorlibObj._getHashCode(this.handle);
    }



}


// 拓展 UnityEngine.CoreModule.UnityEngine.Object
class UnityEngine_CoreModule_UnityEngine_Object extends mscorlib_System_Object_impl {

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
export { mscorlib_System_Object_impl, UnityEngine_CoreModule_UnityEngine_Object };