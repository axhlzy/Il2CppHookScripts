import { cache } from "decorator-cache-getter"

class UnityEngine_UI_MaskableGraphic_API {

    @cache
    static get _get_onCullStateChanged() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.MaskableGraphic", "get_onCullStateChanged", 0, "pointer", ["pointer"]);
    }

    @cache
    static get _set_onCullStateChanged() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.MaskableGraphic", "set_onCullStateChanged", 1, "void", ["pointer", "pointer"]);
    }

    @cache
    static get _get_maskable() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.MaskableGraphic", "get_maskable", 0, "bool", ["pointer"]);
    }

    @cache
    static get _set_maskable() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.MaskableGraphic", "set_maskable", 1, "void", ["pointer", "bool"]);
    }

    @cache
    static get _get_isMaskingGraphic() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.MaskableGraphic", "get_isMaskingGraphic", 0, "bool", ["pointer"]);
    }

    @cache
    static get _set_isMaskingGraphic() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.MaskableGraphic", "set_isMaskingGraphic", 1, "void", ["pointer", "bool"]);
    }

    @cache
    static get _GetModifiedMaterial() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.MaskableGraphic", "GetModifiedMaterial", 0, "pointer", ["pointer", "pointer"]);
    }

    @cache
    static get _Cull() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.MaskableGraphic", "Cull", 0, "void", ["pointer", "pointer", "bool"]);
    }

    @cache
    static get _UpdateCull() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.MaskableGraphic", "UpdateCull", 0, "void", ["pointer", "bool"]);
    }

    @cache
    static get _SetClipRect() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.MaskableGraphic", "SetClipRect", 0, "void", ["pointer", "pointer", "bool"]);
    }

    @cache
    static get _SetClipSoftness() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.MaskableGraphic", "SetClipSoftness", 0, "void", ["pointer", "pointer"]);
    }

    @cache
    static get _OnEnable() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.MaskableGraphic", "OnEnable", 0, "void", ["pointer"]);
    }

    @cache
    static get _OnDisable() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.MaskableGraphic", "OnDisable", 0, "void", ["pointer"]);
    }

    @cache
    static get _OnTransformParentChanged() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.MaskableGraphic", "OnTransformParentChanged", 0, "void", ["pointer"]);
    }

    @cache
    static get _ParentMaskStateChanged() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.MaskableGraphic", "ParentMaskStateChanged", 0, "void", ["pointer"]);
    }

    @cache
    static get _OnCanvasHierarchyChanged() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.MaskableGraphic", "OnCanvasHierarchyChanged", 0, "void", ["pointer"]);
    }

    @cache
    static get _get_rootCanvasRect() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.MaskableGraphic", "get_rootCanvasRect", 0, "pointer", ["pointer"]);
    }

    @cache
    static get _UpdateClipParent() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.MaskableGraphic", "UpdateClipParent", 0, "void", ["pointer"]);
    }

    @cache
    static get _RecalculateClipping() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.MaskableGraphic", "RecalculateClipping", 0, "void", ["pointer"]);
    }

    @cache
    static get _RecalculateMasking() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.MaskableGraphic", "RecalculateMasking", 0, "void", ["pointer"]);
    }

    @cache
    static get __ctor() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.MaskableGraphic", ".ctor", 0, "void", ["pointer"]);
    }

    @cache
    static get _get_gameObject() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.IClippable", "get_gameObject", 0, "pointer", ["pointer"]);
    }
}

declare global {
    namespace Il2Cpp.Api {
        class MaskableGraphic extends UnityEngine_UI_MaskableGraphic_API { }
    }
}

Il2Cpp.Api.MaskableGraphic = UnityEngine_UI_MaskableGraphic_API

export { UnityEngine_UI_MaskableGraphic_API as MaskableGraphicApi }