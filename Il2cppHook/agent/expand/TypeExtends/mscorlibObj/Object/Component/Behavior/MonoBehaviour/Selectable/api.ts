import { cache } from "decorator-cache-getter"
import "./interface"

class SelectableAPI {

    @cache
    static get _Awake() {
        // Awake() : Void
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.Selectable", "Awake", 0, "pointer", ["pointer"]);
    }

}

declare global {
    namespace Il2Cpp.Api {
        class Selectable extends SelectableAPI { }
    }
}

Il2Cpp.Api.Selectable = SelectableAPI;

export { }