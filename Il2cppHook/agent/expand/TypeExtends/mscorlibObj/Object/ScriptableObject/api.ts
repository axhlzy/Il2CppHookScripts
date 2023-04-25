import { cache } from "decorator-cache-getter"

class UnityEngine_ScriptableObject_API {
    // public Void .ctor()
    @cache
    static get __ctor() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.ScriptableObject", ".ctor", 0, [], "void", ["pointer"])
    }

    // public static ScriptableObject CreateInstance(Type type)
    @cache
    static get _CreateInstance() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.ScriptableObject", "CreateInstance", 1, ["System.Type"], "pointer", ["pointer"])
    }

    // public static T CreateInstance()
    @cache
    static get _CreateInstance_() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.ScriptableObject", "CreateInstance", 0, [], "pointer", [])
    }

    // private static Void CreateScriptableObject(ScriptableObject self)
    @cache
    static get _CreateScriptableObject() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.ScriptableObject", "CreateScriptableObject", 1, ["UnityEngine.ScriptableObject"], "void", ["pointer"])
    }

    // internal static ScriptableObject CreateScriptableObjectInstanceFromType(Type type, Boolean applyDefaultsAndReset)
    @cache
    static get _CreateScriptableObjectInstanceFromType() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.ScriptableObject", "CreateScriptableObjectInstanceFromType", 2, ["System.Type", "System.Boolean"], "pointer", ["pointer", "pointer"])
    }

}

Il2Cpp.Api.ScriptableObject = UnityEngine_ScriptableObject_API

declare global {
    namespace Il2Cpp.Api {
        class ScriptableObject extends UnityEngine_ScriptableObject_API { }
    }
}

export { }