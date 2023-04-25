import { cache } from "decorator-cache-getter"

class TMPro_TMP_Asset_API {
    // public Int32 get_instanceID()
    @cache
    static get _get_instanceID() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Asset", "get_instanceID", 0, [], "pointer", ["pointer"])
    }

    // protected Void .ctor()
    @cache
    static get __ctor() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Asset", ".ctor", 0, [], "void", ["pointer"])
    }

}

Il2Cpp.Api.TMP_Asset = TMPro_TMP_Asset_API

declare global {
    namespace Il2Cpp.Api {
        class TMP_Asset extends TMPro_TMP_Asset_API { }
    }
}

export { }