import { cache } from "decorator-cache-getter"

class UnityEngine_Resources_API {
    // internal static T[] ConvertObjects(Object[] rawObjects)
    @cache
    static get _ConvertObjects() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Resources", "ConvertObjects", 1, "pointer", ["pointer"])
    }

    // public static Object[] FindObjectsOfTypeAll(Type type)
    @cache
    static get _FindObjectsOfTypeAll() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Resources", "FindObjectsOfTypeAll", 1, "pointer", ["pointer"])
    }

    // public static T[] FindObjectsOfTypeAll()
    @cache
    static get _FindObjectsOfTypeAll_() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Resources", "FindObjectsOfTypeAll", 0, [], "pointer", [])
    }

    // public static Object Load(String path)
    @cache
    static get _Load() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Resources", "Load", 1, "pointer", ["pointer"])
    }

    // public static T Load(String path)
    @cache
    static get _Load_path() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Resources", "Load", 1, ["System.String"], "pointer", ["pointer"])
    }

    // public static Object Load(String path,Type systemTypeInstance)
    @cache
    static get _Load_path_systemTypeInstance() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Resources", "Load", 2, ["System.String", "System.Type"], "pointer", ["pointer", "pointer"])
    }

    // public static Object GetBuiltinResource(Type type,String path)
    @cache
    static get _GetBuiltinResource() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Resources", "GetBuiltinResource", 2, "pointer", ["pointer", "pointer"])
    }

    // public static T GetBuiltinResource(String path)
    @cache
    static get _GetBuiltinResource_path() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Resources", "GetBuiltinResource", 1, ["System.String"], "pointer", ["pointer"])
    }

    // public static AsyncOperation UnloadUnusedAssets()
    @cache
    static get _UnloadUnusedAssets() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Resources", "UnloadUnusedAssets", 0, "pointer", [])
    }

}

Il2Cpp.Api.Resources = UnityEngine_Resources_API

declare global {
    namespace Il2Cpp.Api {
        class Resources extends UnityEngine_Resources_API { }
    }
}

export { }