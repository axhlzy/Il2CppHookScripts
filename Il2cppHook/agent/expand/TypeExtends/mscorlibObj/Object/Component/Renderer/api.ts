import { cache } from "decorator-cache-getter"

class UnityEngine_Renderer_API {
    // public Bounds get_bounds()
    @cache
    static get _get_bounds() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Renderer", "get_bounds", 0, "pointer", ["pointer"])
    }

    // private Material GetMaterial()
    @cache
    static get _GetMaterial() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Renderer", "GetMaterial", 0, "pointer", ["pointer"])
    }

    // private Material GetSharedMaterial()
    @cache
    static get _GetSharedMaterial() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Renderer", "GetSharedMaterial", 0, "pointer", ["pointer"])
    }

    // private Void SetMaterial(Material m)
    @cache
    static get _SetMaterial() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Renderer", "SetMaterial", 1, "void", ["pointer", "pointer"])
    }

    // private Material[] GetMaterialArray()
    @cache
    static get _GetMaterialArray() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Renderer", "GetMaterialArray", 0, "pointer", ["pointer"])
    }

    // private Void SetMaterialArray(Material[] m)
    @cache
    static get _SetMaterialArray() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Renderer", "SetMaterialArray", 1, "void", ["pointer", "pointer"])
    }

    // public Boolean get_enabled()
    @cache
    static get _get_enabled() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Renderer", "get_enabled", 0, "pointer", ["pointer"])
    }

    // public Void set_enabled(Boolean value)
    @cache
    static get _set_enabled() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Renderer", "set_enabled", 1, "void", ["pointer", "pointer"])
    }

    // public Boolean get_isVisible()
    @cache
    static get _get_isVisible() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Renderer", "get_isVisible", 0, "pointer", ["pointer"])
    }

    // public Void set_shadowCastingMode(ShadowCastingMode value)
    @cache
    static get _set_shadowCastingMode() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Renderer", "set_shadowCastingMode", 1, "void", ["pointer", "pointer"])
    }

    // public Void set_receiveShadows(Boolean value)
    @cache
    static get _set_receiveShadows() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Renderer", "set_receiveShadows", 1, "void", ["pointer", "pointer"])
    }

    // public Int32 get_sortingLayerID()
    @cache
    static get _get_sortingLayerID() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Renderer", "get_sortingLayerID", 0, "pointer", ["pointer"])
    }

    // public Void set_sortingLayerID(Int32 value)
    @cache
    static get _set_sortingLayerID() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Renderer", "set_sortingLayerID", 1, "void", ["pointer", "pointer"])
    }

    // public Int32 get_sortingOrder()
    @cache
    static get _get_sortingOrder() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Renderer", "get_sortingOrder", 0, "pointer", ["pointer"])
    }

    // public Void set_sortingOrder(Int32 value)
    @cache
    static get _set_sortingOrder() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Renderer", "set_sortingOrder", 1, "void", ["pointer", "pointer"])
    }

    // private Material[] GetSharedMaterialArray()
    @cache
    static get _GetSharedMaterialArray() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Renderer", "GetSharedMaterialArray", 0, "pointer", ["pointer"])
    }

    // public Material[] get_materials()
    @cache
    static get _get_materials() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Renderer", "get_materials", 0, "pointer", ["pointer"])
    }

    // public Void set_materials(Material[] value)
    @cache
    static get _set_materials() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Renderer", "set_materials", 1, "void", ["pointer", "pointer"])
    }

    // public Material get_material()
    @cache
    static get _get_material() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Renderer", "get_material", 0, "pointer", ["pointer"])
    }

    // public Void set_material(Material value)
    @cache
    static get _set_material() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Renderer", "set_material", 1, "void", ["pointer", "pointer"])
    }

    // public Material get_sharedMaterial()
    @cache
    static get _get_sharedMaterial() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Renderer", "get_sharedMaterial", 0, "pointer", ["pointer"])
    }

    // public Void set_sharedMaterial(Material value)
    @cache
    static get _set_sharedMaterial() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Renderer", "set_sharedMaterial", 1, "void", ["pointer", "pointer"])
    }

    // public Material[] get_sharedMaterials()
    @cache
    static get _get_sharedMaterials() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Renderer", "get_sharedMaterials", 0, "pointer", ["pointer"])
    }

    // public Void set_sharedMaterials(Material[] value)
    @cache
    static get _set_sharedMaterials() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Renderer", "set_sharedMaterials", 1, "void", ["pointer", "pointer"])
    }

    // private Void get_bounds_Injected(Bounds& ret)
    @cache
    static get _get_bounds_Injected() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Renderer", "get_bounds_Injected", 1, "void", ["pointer", "pointer"])
    }

}

Il2Cpp.Api.Renderer = UnityEngine_Renderer_API

declare global {
    namespace Il2Cpp.Api {
        class Renderer extends UnityEngine_Renderer_API { }
    }
}

export { }