
import { cache } from "decorator-cache-getter";

class AbstractEventDataAPI {

    @cache
    static get _ctor_0() {
        // .ctor()
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.AbstractEventData", ".ctor", 0, "void", ["pointer"]);
    }

    @cache
    static get Reset() {
        // Reset() : Void
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.AbstractEventData", "Reset", 0, "void", ["pointer"]);
    }

    @cache
    static get Use() {
        // Use() : Void
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.AbstractEventData", "Use", 0, "void", ["pointer"]);
    }

    @cache
    static get used() {
        // get_used() : Boolean
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.AbstractEventData", "get_used", 0, "bool", ["pointer"]);
    }

}

declare global {
    namespace Il2Cpp.Api {
        class AbstractEventData extends AbstractEventDataAPI {


        }
    }
}

Il2Cpp.Api.AbstractEventData = AbstractEventDataAPI;

export { AbstractEventDataAPI }