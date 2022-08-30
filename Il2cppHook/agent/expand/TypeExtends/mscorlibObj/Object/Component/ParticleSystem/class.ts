import { UnityEngine_Color32_Impl as Color32 } from "../../../ValueType/Color32/class"
import { UnityEngine_ParticleSystem_EmitParams_Impl as EmitParams } from "../../../ValueType/EmitParams/class"
import { UnityEngine_ParticleSystem_MainModule_Impl as MainModule } from "../../../ValueType/MainModule/class"
import { UnityEngine_Vector3_Impl as Vector3 } from "../../../ValueType/Vector3/class"
import { UnityEngine_Component_Impl } from "../class"
import { UnityEngine_ParticleSystemStopBehavior as ParticleSystemStopBehavior } from "./enum"

class UnityEngine_ParticleSystem_Impl extends UnityEngine_Component_Impl {

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    Emit(position: Vector3, velocity: Vector3, size: number, lifetime: number, color: Color32): void {
        return Il2Cpp.Api.ParticleSystem._Emit(this.handle, position, velocity, size, lifetime, color.handle)
    }

    Emit_particle(particle: UnityEngine_ParticleSystem_Impl): void {
        return Il2Cpp.Api.ParticleSystem._Emit(this.handle, particle.handle)
    }

    get_isPlaying(): boolean {
        return Il2Cpp.Api.ParticleSystem._get_isPlaying(this.handle)
    }

    Play(withChildren: boolean): void {
        return Il2Cpp.Api.ParticleSystem._Play(this.handle, withChildren)
    }

    Play_0(): void {
        return Il2Cpp.Api.ParticleSystem._Play(this.handle)
    }

    Stop(withChildren: boolean, stopBehavior: ParticleSystemStopBehavior): void {
        return Il2Cpp.Api.ParticleSystem._Stop(this.handle, withChildren, stopBehavior)
    }

    Stop_1(withChildren: boolean): void {
        return Il2Cpp.Api.ParticleSystem._Stop(this.handle, withChildren)
    }

    Stop_0(): void {
        return Il2Cpp.Api.ParticleSystem._Stop(this.handle)
    }

    Emit_count(count: number): void {
        return Il2Cpp.Api.ParticleSystem._Emit(this.handle, count)
    }

    Emit_Internal(count: number): void {
        return Il2Cpp.Api.ParticleSystem._Emit_Internal(this.handle, count)
    }

    Emit_2(emitParams: EmitParams, count: number): void {
        return Il2Cpp.Api.ParticleSystem._Emit(this.handle, emitParams, count)
    }

    EmitOld_Internal(particle: UnityEngine_ParticleSystem_Impl): void {
        return Il2Cpp.Api.ParticleSystem._EmitOld_Internal(this.handle, particle)
    }

    get_main(): MainModule {
        return new MainModule(Il2Cpp.Api.ParticleSystem._get_main(this.handle))
    }

    Emit_Injected(emitParams: EmitParams, count: number): void {
        return Il2Cpp.Api.ParticleSystem._Emit_Injected(this.handle, emitParams, count)
    }
}

Il2Cpp.ParticleSystem = UnityEngine_ParticleSystem_Impl

declare global {
    namespace Il2Cpp {
        class ParticleSystem extends UnityEngine_ParticleSystem_Impl { }
    }
}

export { UnityEngine_ParticleSystem_Impl }
