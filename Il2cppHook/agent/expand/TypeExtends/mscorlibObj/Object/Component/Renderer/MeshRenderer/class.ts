import { UnityEngine_Renderer_Impl } from "../class"

class UnityEngine_MeshRenderer_Impl extends UnityEngine_Renderer_Impl {

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    DontStripMeshRenderer(): void {
        return Il2Cpp.Api.MeshRenderer._DontStripMeshRenderer(this.handle)
    }
}

Il2Cpp.MeshRenderer = UnityEngine_MeshRenderer_Impl

declare global {
    namespace Il2Cpp {
        class MeshRenderer extends UnityEngine_MeshRenderer_Impl { }
    }
}

export { UnityEngine_MeshRenderer_Impl }