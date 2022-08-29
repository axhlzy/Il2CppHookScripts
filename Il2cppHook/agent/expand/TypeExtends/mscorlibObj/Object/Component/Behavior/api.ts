import { cache } from "decorator-cache-getter"

class UnityEngine_Behaviour_API {
    // public Boolean get_enabled()
    @cache
    static get _get_enabled() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Behaviour", "get_enabled", 0, "pointer", ["pointer"])
    }

    // public Void set_enabled(Boolean value)
    @cache
    static get _set_enabled() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Behaviour", "set_enabled", 1, "void", ["pointer", "pointer"])
    }

    // public Boolean get_isActiveAndEnabled()
    @cache
    static get _get_isActiveAndEnabled() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Behaviour", "get_isActiveAndEnabled", 0, "pointer", ["pointer"])
    }

    // public Void .ctor()
    @cache
    static get __ctor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Behaviour", ".ctor", 0, "void", ["pointer"])
    }

}

declare global {
    namespace Il2Cpp.Api {
        class Behaviour extends UnityEngine_Behaviour_API { }
    }
}

Il2Cpp.Api.Behaviour = UnityEngine_Behaviour_API

export { }