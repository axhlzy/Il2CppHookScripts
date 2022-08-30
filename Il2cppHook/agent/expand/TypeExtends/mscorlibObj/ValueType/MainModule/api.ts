import { cache } from "decorator-cache-getter"

class _MainModule_API {
    // internal Void .ctor(ParticleSystem particleSystem)
    @cache
    static get __ctor() {
        return Il2Cpp.Api.t("UnityEngine.ParticleSystemModule", "MainModule", ".ctor", 1, "void", ["pointer", "pointer"])
    }

    // public MinMaxGradient get_startColor()
    @cache
    static get _get_startColor() {
        return Il2Cpp.Api.t("UnityEngine.ParticleSystemModule", "MainModule", "get_startColor", 0, "pointer", ["pointer"])
    }

    // public Void set_startColor(MinMaxGradient value)
    @cache
    static get _set_startColor() {
        return Il2Cpp.Api.t("UnityEngine.ParticleSystemModule", "MainModule", "set_startColor", 1, "void", ["pointer", "pointer"])
    }

    // private static Void get_startColor_Injected(MainModule& _unity_self,MinMaxGradient& ret)
    @cache
    static get _get_startColor_Injected() {
        return Il2Cpp.Api.t("UnityEngine.ParticleSystemModule", "MainModule", "get_startColor_Injected", 2, "void", ["pointer", "pointer"])
    }

    // private static Void set_startColor_Injected(MainModule& _unity_self,MinMaxGradient& value)
    @cache
    static get _set_startColor_Injected() {
        return Il2Cpp.Api.t("UnityEngine.ParticleSystemModule", "MainModule", "set_startColor_Injected", 2, "void", ["pointer", "pointer"])
    }

}

Il2Cpp.Api.MainModule = _MainModule_API

declare global {
    namespace Il2Cpp.Api {
        class MainModule extends _MainModule_API { }
    }
}

export { }