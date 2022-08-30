import { cache } from "decorator-cache-getter"

class UnityEngine_ParticleSystem_API {
    // public Void Emit(Vector3 position,Vector3 velocity,Single size,Single lifetime,Color32 color)
    @cache
    static get _Emit() {
        return Il2Cpp.Api.t("UnityEngine.ParticleSystemModule", "UnityEngine.ParticleSystem", "Emit", 5, "void", ["pointer", "pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public Void Emit(Particle particle)
    @cache
    static get _Emit_particle() {
        return Il2Cpp.Api.o("UnityEngine.ParticleSystemModule", "UnityEngine.ParticleSystem", "Emit", 1, ["UnityEngine.ParticleSystem.Particle"], "void", ["pointer", "pointer"])
    }

    // public Boolean get_isPlaying()
    @cache
    static get _get_isPlaying() {
        return Il2Cpp.Api.t("UnityEngine.ParticleSystemModule", "UnityEngine.ParticleSystem", "get_isPlaying", 0, "pointer", ["pointer"])
    }

    // public Void Play(Boolean withChildren)
    @cache
    static get _Play() {
        return Il2Cpp.Api.t("UnityEngine.ParticleSystemModule", "UnityEngine.ParticleSystem", "Play", 1, "void", ["pointer", "pointer"])
    }

    // public Void Play()
    @cache
    static get _Play_() {
        return Il2Cpp.Api.o("UnityEngine.ParticleSystemModule", "UnityEngine.ParticleSystem", "Play", 0, [], "void", ["pointer"])
    }

    // public Void Stop(Boolean withChildren,ParticleSystemStopBehavior stopBehavior)
    @cache
    static get _Stop() {
        return Il2Cpp.Api.t("UnityEngine.ParticleSystemModule", "UnityEngine.ParticleSystem", "Stop", 2, "void", ["pointer", "pointer", "pointer"])
    }

    // public Void Stop(Boolean withChildren)
    @cache
    static get _Stop_withChildren() {
        return Il2Cpp.Api.o("UnityEngine.ParticleSystemModule", "UnityEngine.ParticleSystem", "Stop", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // public Void Stop()
    @cache
    static get _Stop_() {
        return Il2Cpp.Api.o("UnityEngine.ParticleSystemModule", "UnityEngine.ParticleSystem", "Stop", 0, [], "void", ["pointer"])
    }

    // public Void Emit(Int32 count)
    @cache
    static get _Emit_count() {
        return Il2Cpp.Api.o("UnityEngine.ParticleSystemModule", "UnityEngine.ParticleSystem", "Emit", 1, ["System.Int32"], "void", ["pointer", "pointer"])
    }

    // private Void Emit_Internal(Int32 count)
    @cache
    static get _Emit_Internal() {
        return Il2Cpp.Api.t("UnityEngine.ParticleSystemModule", "UnityEngine.ParticleSystem", "Emit_Internal", 1, "void", ["pointer", "pointer"])
    }

    // public Void Emit(EmitParams emitParams,Int32 count)
    @cache
    static get _Emit_emitParams_count() {
        return Il2Cpp.Api.o("UnityEngine.ParticleSystemModule", "UnityEngine.ParticleSystem", "Emit", 2, ["UnityEngine.ParticleSystem.EmitParams", "System.Int32"], "void", ["pointer", "pointer", "pointer"])
    }

    // private Void EmitOld_Internal(Particle& particle)
    @cache
    static get _EmitOld_Internal() {
        return Il2Cpp.Api.t("UnityEngine.ParticleSystemModule", "UnityEngine.ParticleSystem", "EmitOld_Internal", 1, "void", ["pointer", "pointer"])
    }

    // public MainModule get_main()
    @cache
    static get _get_main() {
        return Il2Cpp.Api.t("UnityEngine.ParticleSystemModule", "UnityEngine.ParticleSystem", "get_main", 0, "pointer", ["pointer"])
    }

    // private Void Emit_Injected(EmitParams& emitParams,Int32 count)
    @cache
    static get _Emit_Injected() {
        return Il2Cpp.Api.t("UnityEngine.ParticleSystemModule", "UnityEngine.ParticleSystem", "Emit_Injected", 2, "void", ["pointer", "pointer", "pointer"])
    }
}

Il2Cpp.Api.ParticleSystem = UnityEngine_ParticleSystem_API

declare global {
    namespace Il2Cpp.Api {
        class ParticleSystem extends UnityEngine_ParticleSystem_API { }
    }
}

export { }