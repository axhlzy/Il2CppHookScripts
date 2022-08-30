import { cache } from "decorator-cache-getter"

class UnityEngine_EventSystems_AbstractEventData_API {
    // public virtual Void Reset()
    @cache
    static get _Reset() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.AbstractEventData", "Reset", 0, "void", ["pointer"])
    }

    // public virtual Void Use()
    @cache
    static get _Use() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.AbstractEventData", "Use", 0, "void", ["pointer"])
    }

    // public virtual Boolean get_used()
    @cache
    static get _get_used() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.AbstractEventData", "get_used", 0, "pointer", ["pointer"])
    }

    // protected Void .ctor()
    @cache
    static get __ctor() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.AbstractEventData", ".ctor", 0, "void", ["pointer"])
    }

}

Il2Cpp.Api.AbstractEventData = UnityEngine_EventSystems_AbstractEventData_API

declare global {
    namespace Il2Cpp.Api {
        class AbstractEventData extends UnityEngine_EventSystems_AbstractEventData_API { }
    }
}

export { }