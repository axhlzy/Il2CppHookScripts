import { cache } from "decorator-cache-getter"

class UnityEngine_EventSystems_UIBehaviour_API {
    // protected virtual Void Awake()
    @cache
    static get _Awake() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.UIBehaviour", "Awake", 0, "void", ["pointer"]);
    }

    // protected virtual Void OnEnable()
    @cache
    static get _OnEnable() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.UIBehaviour", "OnEnable", 0, "void", ["pointer"]);
    }

    // protected virtual Void Start()
    @cache
    static get _Start() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.UIBehaviour", "Start", 0, "void", ["pointer"]);
    }

    // protected virtual Void OnDisable()
    @cache
    static get _OnDisable() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.UIBehaviour", "OnDisable", 0, "void", ["pointer"]);
    }

    // protected virtual Void OnDestroy()
    @cache
    static get _OnDestroy() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.UIBehaviour", "OnDestroy", 0, "void", ["pointer"]);
    }

    // public virtual Boolean IsActive()
    @cache
    static get _IsActive() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.UIBehaviour", "IsActive", 0, "pointer", ["pointer"]);
    }

    // protected virtual Void OnRectTransformDimensionsChange()
    @cache
    static get _OnRectTransformDimensionsChange() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.UIBehaviour", "OnRectTransformDimensionsChange", 0, "void", ["pointer"]);
    }

    // protected virtual Void OnBeforeTransformParentChanged()
    @cache
    static get _OnBeforeTransformParentChanged() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.UIBehaviour", "OnBeforeTransformParentChanged", 0, "void", ["pointer"]);
    }

    // protected virtual Void OnTransformParentChanged()
    @cache
    static get _OnTransformParentChanged() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.UIBehaviour", "OnTransformParentChanged", 0, "void", ["pointer"]);
    }

    // protected virtual Void OnDidApplyAnimationProperties()
    @cache
    static get _OnDidApplyAnimationProperties() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.UIBehaviour", "OnDidApplyAnimationProperties", 0, "void", ["pointer"]);
    }

    // protected virtual Void OnCanvasGroupChanged()
    @cache
    static get _OnCanvasGroupChanged() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.UIBehaviour", "OnCanvasGroupChanged", 0, "void", ["pointer"]);
    }

    // protected virtual Void OnCanvasHierarchyChanged()
    @cache
    static get _OnCanvasHierarchyChanged() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.UIBehaviour", "OnCanvasHierarchyChanged", 0, "void", ["pointer"]);
    }

    // public Boolean IsDestroyed()
    @cache
    static get _IsDestroyed() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.UIBehaviour", "IsDestroyed", 0, "pointer", ["pointer"]);
    }

    // protected Void .ctor()
    @cache
    static get __ctor() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.UIBehaviour", ".ctor", 0, "void", ["pointer"]);
    }

}

declare global {
    namespace Il2Cpp.Api {
        class UIBehaviour extends UnityEngine_EventSystems_UIBehaviour_API { }
    }
}

Il2Cpp.Api.UIBehaviour = UnityEngine_EventSystems_UIBehaviour_API;

export { }