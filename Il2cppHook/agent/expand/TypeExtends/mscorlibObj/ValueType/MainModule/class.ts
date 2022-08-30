import { UnityEngine_ParticleSystem_Impl } from "../../Object/Component/ParticleSystem/class"
import { System_ValueType_Impl } from "../class"

type UnityEngine_ParticleSystem_MinMaxGradient = NativePointer

class UnityEngine_ParticleSystem_MainModule_Impl extends System_ValueType_Impl {

    m_ParticleSystem: UnityEngine_ParticleSystem_Impl = lfv(this.handle, "m_ParticleSystem") as unknown as UnityEngine_ParticleSystem_Impl
    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    __ctor(particleSystem: UnityEngine_ParticleSystem_Impl): void {
        return Il2Cpp.Api.MainModule.__ctor(this.handle, particleSystem)
    }

    get_startColor(): UnityEngine_ParticleSystem_MinMaxGradient {
        return Il2Cpp.Api.MainModule._get_startColor(this.handle)
    }

    set_startColor(value: UnityEngine_ParticleSystem_MinMaxGradient): void {
        return Il2Cpp.Api.MainModule._set_startColor(this.handle, value)
    }

    static get_startColor_Injected(_unity_self: UnityEngine_ParticleSystem_MainModule_Impl, ret: UnityEngine_ParticleSystem_MinMaxGradient): void {
        return Il2Cpp.Api.MainModule._get_startColor_Injected(_unity_self, ret)
    }

    static set_startColor_Injected(_unity_self: UnityEngine_ParticleSystem_MainModule_Impl, value: UnityEngine_ParticleSystem_MinMaxGradient): void {
        return Il2Cpp.Api.MainModule._set_startColor_Injected(_unity_self, value)
    }
}

Il2Cpp.MainModule = UnityEngine_ParticleSystem_MainModule_Impl

declare global {
    namespace Il2Cpp {
        class MainModule extends UnityEngine_ParticleSystem_MainModule_Impl { }
    }
}

export { UnityEngine_ParticleSystem_MainModule_Impl }