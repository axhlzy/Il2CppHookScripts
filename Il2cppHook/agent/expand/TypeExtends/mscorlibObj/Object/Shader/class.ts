import { UnityEngine_Object } from "../class"

class UnityEngine_Shader_Impl extends UnityEngine_Object {

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    static Find(name: string): UnityEngine_Shader_Impl {
        return Il2Cpp.Api.Shader._Find(name)
    }

    static PropertyToID(name: string): number {
        return Il2Cpp.Api.Shader._PropertyToID(name)
    }

    _ctor(): void {
        return Il2Cpp.Api.Shader.__ctor(this.handle)
    }

}

Il2Cpp.Shader = UnityEngine_Shader_Impl

declare global {
    namespace Il2Cpp {
        class Shader extends UnityEngine_Shader_Impl { }
    }
}

export { UnityEngine_Shader_Impl }