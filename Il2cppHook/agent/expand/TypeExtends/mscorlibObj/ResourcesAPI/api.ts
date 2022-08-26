
import { cache } from "decorator-cache-getter";

class ResourcesAPI_API {

    // .cctor()
    // .ctor()
    // FindObjectsOfTypeAll(Type) : Object[]
    // FindShaderByName(String) : Shader
    // Load(String, Type) : Object
    // LoadAll(String, Type) : Object[]
    // LoadAsync(String, Type) : ResourceRequest
    // UnloadAsset(Object) : Void

    @cache
    static get _get_cctor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourcesAPI", ".cctor", 0, "pointer", ["pointer"]);
    }

    @cache
    static get _get_ctor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourcesAPI", ".ctor", 0, "pointer", ["pointer"]);
    }

    @cache
    static get _FindObjectsOfTypeAll() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourcesAPI", "FindObjectsOfTypeAll", 1, "pointer", ["pointer"]);
    }

    @cache
    static get _FindShaderByName() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourcesAPI", "FindShaderByName", 1, "pointer", ["pointer"]);
    }

    @cache
    static get _Load() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourcesAPI", "Load", 2, "pointer", ["pointer", "pointer"]);
    }

    @cache
    static get _LoadAll() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourcesAPI", "LoadAll", 2, "pointer", ["pointer", "pointer"]);
    }

    @cache
    static get _LoadAsync() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourcesAPI", "LoadAsync", 2, "pointer", ["pointer", "pointer"]);
    }

    @cache
    static get _UnloadAsset() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourcesAPI", "UnloadAsset", 1, "pointer", ["pointer"]);
    }

    // get_ActiveAPI() : ResourcesAPI
    // get_overrideAPI() : ResourcesAPI

    @cache
    static get _get_ActiveAPI() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourcesAPI", "get_ActiveAPI", 0, "pointer", ["pointer"]);
    }

    @cache
    static get _get_overrideAPI() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourcesAPI", "get_overrideAPI", 0, "pointer", ["pointer"]);
    }

}

declare global {
    namespace Il2cpp.Api {
        class ResourcesAPI extends ResourcesAPI_API { }
    }
}

Il2cpp.Api.ResourcesAPI = ResourcesAPI_API;

export { }