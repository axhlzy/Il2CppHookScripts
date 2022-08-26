import { cache } from "decorator-cache-getter"

class UnityEngine_EventSystems_UIBehaviour_API {

    @cache
    static get _Awake() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.EventSystems.UIBehaviour", "Awake", 0, "pointer", ["pointer"]);
    }

    @cache
    static get _OnEnable() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.EventSystems.UIBehaviour", "OnEnable", 0, "pointer", ["pointer"]);
    }

    @cache
    static get _Start() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.EventSystems.UIBehaviour", "Start", 0, "pointer", ["pointer"]);
    }

    @cache
    static get _OnDisable() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.EventSystems.UIBehaviour", "OnDisable", 0, "pointer", ["pointer"]);
    }

    @cache
    static get _OnDestroy() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.EventSystems.UIBehaviour", "OnDestroy", 0, "pointer", ["pointer"]);
    }

    @cache
    static get _IsActive() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.EventSystems.UIBehaviour", "IsActive", 0, "pointer", ["pointer"]);
    }

    @cache
    static get _OnRectTransformDimensionsChange() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.EventSystems.UIBehaviour", "OnRectTransformDimensionsChange", 0, "pointer", ["pointer"]);
    }

    @cache
    static get _OnBeforeTransformParentChanged() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.EventSystems.UIBehaviour", "OnBeforeTransformParentChanged", 0, "pointer", ["pointer"]);
    }

    @cache
    static get _OnTransformParentChanged() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.EventSystems.UIBehaviour", "OnTransformParentChanged", 0, "pointer", ["pointer"]);
    }

    @cache
    static get _OnDidApplyAnimationProperties() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.EventSystems.UIBehaviour", "OnDidApplyAnimationProperties", 0, "pointer", ["pointer"]);
    }

    @cache
    static get _OnCanvasGroupChanged() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.EventSystems.UIBehaviour", "OnCanvasGroupChanged", 0, "pointer", ["pointer"]);
    }

    @cache
    static get _OnCanvasHierarchyChanged() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.EventSystems.UIBehaviour", "OnCanvasHierarchyChanged", 0, "pointer", ["pointer"]);
    }

    @cache
    static get _IsDestroyed() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.EventSystems.UIBehaviour", "IsDestroyed", 0, "pointer", ["pointer"]);
    }

    @cache
    static get _Ctor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.EventSystems.UIBehaviour", ".ctor", 0, "pointer", ["pointer"]);
    }
}

declare global {
    namespace Il2Cpp.Api {
        class UIBehaviour extends UnityEngine_EventSystems_UIBehaviour_API { }
    }
}

Il2Cpp.Api.UIBehaviour = UnityEngine_EventSystems_UIBehaviour_API;

export { }