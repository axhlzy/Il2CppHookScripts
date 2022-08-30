import { cache } from "decorator-cache-getter"

class UnityEngine_EventSystems_BaseEventData_API {
    // public Void .ctor(EventSystem eventSystem)
    @cache
    static get __ctor() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.BaseEventData", ".ctor", 1, "void", ["pointer", "pointer"])
    }

    // public BaseInputModule get_currentInputModule()
    @cache
    static get _get_currentInputModule() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.BaseEventData", "get_currentInputModule", 0, "pointer", ["pointer"])
    }

    // public GameObject get_selectedObject()
    @cache
    static get _get_selectedObject() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.BaseEventData", "get_selectedObject", 0, "pointer", ["pointer"])
    }

    // public Void set_selectedObject(GameObject value)
    @cache
    static get _set_selectedObject() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.BaseEventData", "set_selectedObject", 1, "void", ["pointer", "pointer"])
    }

}

Il2Cpp.Api.BaseEventData = UnityEngine_EventSystems_BaseEventData_API

declare global {
    namespace Il2Cpp.Api {
        class BaseEventData extends UnityEngine_EventSystems_BaseEventData_API { }
    }
}

export { }