
import { cache } from "decorator-cache-getter";

class BaseEventDataAPI {

    @cache
    static get _ctor_0() {
        // .ctor()
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.BaseEventData", ".ctor", 0, "void", ["pointer"]);
    }

    @cache
    static get get_currentInputModule() {
        // get_currentInputModule() : BaseInputModule
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.BaseEventData", "get_currentInputModule", 0, "pointer", ["pointer"]);
    }

    @cache
    static get set_selectedObject() {
        // set_selectedObject(GameObject) : Void
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.BaseEventData", "set_selectedObject", 1, "void", ["pointer", "pointer"]);
    }

    @cache
    static get get_selectedObject() {
        // get_selectedObject() : GameObject
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.BaseEventData", "get_selectedObject", 0, "pointer", ["pointer"]);
    }

}

declare global {
    namespace Il2Cpp.Api {
        class BaseEventData extends BaseEventDataAPI { }
    }
}

Il2Cpp.Api.BaseEventData = BaseEventDataAPI;

export { BaseEventDataAPI }