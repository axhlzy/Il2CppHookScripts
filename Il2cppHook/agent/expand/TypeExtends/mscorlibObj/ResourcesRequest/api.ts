
import { cache } from "decorator-cache-getter";

class ResourcesRequest_API {

    // .ctor()
    // GetResult() : Object
    // get_asset() : Object

    @cache
    static get _get_ctor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourceRequest", ".ctor", 0, "pointer", ["pointer"]);
    }

    @cache
    static get _get_asset() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourceRequest", "get_asset", 0, "pointer", ["pointer"]);
    }

    @cache
    static get _GetResult() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourceRequest", "GetResult", 0, "pointer", ["pointer"]);
    }
}

declare global {
    namespace Il2cpp.Api {
        class ResourcesRequest extends ResourcesRequest_API { }
    }
}

Il2cpp.Api.ResourcesRequest = ResourcesRequest_API;

export { }