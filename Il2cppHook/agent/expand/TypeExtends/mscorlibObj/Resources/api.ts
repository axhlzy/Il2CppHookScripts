
import { cache } from "decorator-cache-getter";

class Resources_API {

    // FindObjectsOfTypeAll(Type) : Object[]
    // GetBuiltinResource(Type, String) : Object
    // Load(String) : Object
    // Load(String, Type) : Object
    // LoadAll(String, Type) : Object[]
    // LoadAsync(String, Type) : ResourceRequest
    // UnloadAsset(Object) : Void

    @cache
    static get _FindObjectsOfTypeAll() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Resources", "FindObjectsOfTypeAll", 1, "pointer", ["pointer"]);
    }

    @cache
    static get _GetBuiltinResource() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Resources", "GetBuiltinResource", 2, "pointer", ["pointer", "pointer"]);
    }

    @cache
    static get _Load() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Resources", "Load", 1, "pointer", ["pointer"]);
    }

    @cache
    static get _LoadAll() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Resources", "LoadAll", 2, "pointer", ["pointer", "pointer"]);
    }

    @cache
    static get _LoadAsync() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Resources", "LoadAsync", 2, "pointer", ["pointer", "pointer"]);
    }

    @cache
    static get _UnloadAsset() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Resources", "UnloadAsset", 1, "pointer", ["pointer"]);
    }
}

declare global {
    namespace Il2cpp.Api {
        class Resources extends Resources_API { }
    }
}

Il2cpp.Api.Resources = Resources_API;

export { }