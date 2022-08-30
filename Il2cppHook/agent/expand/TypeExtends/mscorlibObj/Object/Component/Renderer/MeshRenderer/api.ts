import { cache } from "decorator-cache-getter"

class UnityEngine_MeshRenderer_API {
    // private Void DontStripMeshRenderer()
    @cache
    static get _DontStripMeshRenderer() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.MeshRenderer", "DontStripMeshRenderer", 0, "void", ["pointer"])
    }
}

Il2Cpp.Api.MeshRenderer = UnityEngine_MeshRenderer_API

declare global {
    namespace Il2Cpp.Api {
        class MeshRenderer extends UnityEngine_MeshRenderer_API { }
    }
}

export { }