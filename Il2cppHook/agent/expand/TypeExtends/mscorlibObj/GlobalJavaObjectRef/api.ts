import { cache } from "decorator-cache-getter"

class UnityEngine_GlobalJavaObjectRef_API {
    // public Void .ctor(IntPtr jobject)
    @cache
    static get __ctor() {
        return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.GlobalJavaObjectRef", ".ctor", 1, ["System.IntPtr"], "void", ["pointer", "pointer"])
    }

    // protected override Void Finalize()
    @cache
    static get _Finalize() {
        return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.GlobalJavaObjectRef", "Finalize", 0, [], "void", ["pointer"])
    }

    // public static IntPtr op_Implicit(GlobalJavaObjectRef obj)
    @cache
    static get _op_Implicit() {
        return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.GlobalJavaObjectRef", "op_Implicit", 1, ["UnityEngine.GlobalJavaObjectRef"], "pointer", ["pointer"])
    }

    // public Void Dispose()
    @cache
    static get _Dispose() {
        return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.GlobalJavaObjectRef", "Dispose", 0, [], "void", ["pointer"])
    }

}

Il2Cpp.Api.GlobalJavaObjectRef = UnityEngine_GlobalJavaObjectRef_API

declare global {
    namespace Il2Cpp.Api {
        class GlobalJavaObjectRef extends UnityEngine_GlobalJavaObjectRef_API { }
    }
}

export { }