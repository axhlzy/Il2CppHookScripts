import { cache } from "decorator-cache-getter"

class ButtonAPI {

    @cache
    static get _ctor() {
        // .ctor()
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.Button", ".ctor", 0, "pointer", ["pointer"]);
    }

    @cache
    static get _OnFinishSubmit() {
        // OnFinishSubmit() : IEnumerator
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.Button", "OnFinishSubmit", 0, "pointer", ["pointer"]);
    }

    @cache
    static get _OnPointerClick() {
        // OnPointerClick(PointerEventData) : Void
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.Button", "OnPointerClick", 1, "pointer", ["pointer", "pointer"]);
    }

    @cache
    static get _OnSubmit() {
        // OnSubmit(BaseEventData) : Void
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.Button", "OnSubmit", 1, "pointer", ["pointer", "pointer"]);
    }

    @cache
    static get _Press() {
        // Press() : Void
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.Button", "Press", 0, "pointer", ["pointer"]);
    }

    @cache
    static get _set_onClick() {
        // set_onClick(ButtonClickedEvent) : Void
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.Button", "set_onClick", 1, "pointer", ["pointer", "pointer"]);
    }

    @cache
    static get _get_onClick() {
        // get_onClick() : ButtonClickedEvent
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.Button", "get_onClick", 0, "pointer", ["pointer"]);
    }
}

declare global {
    namespace Il2Cpp.Api {
        class Button extends ButtonAPI { }
    }
}

Il2Cpp.Api.Button = ButtonAPI;

export { }