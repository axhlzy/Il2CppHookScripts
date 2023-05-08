import { UnityEngine_Material_Impl } from "../../Material/class"
import { UnityEngine_Component_Impl } from "../class"
import { UnityEngine_Rendering_ShadowCastingMode as ShadowCastingMode } from "./enum"

type UnityEngine_Bounds = NativePointer
type UnityEngine_Material = UnityEngine_Material_Impl

class UnityEngine_Renderer_Impl extends UnityEngine_Component_Impl {

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    get_bounds(): UnityEngine_Bounds {
        return Il2Cpp.Api.Renderer._get_bounds(this.handle)
    }

    GetMaterial(): UnityEngine_Material {
        return new UnityEngine_Material_Impl(Il2Cpp.Api.Renderer._GetMaterial(this.handle))
    }

    GetSharedMaterial(): UnityEngine_Material {
        return new UnityEngine_Material_Impl(Il2Cpp.Api.Renderer._GetSharedMaterial(this.handle))
    }

    SetMaterial(m: UnityEngine_Material): void {
        return Il2Cpp.Api.Renderer._SetMaterial(this.handle, m.handle)
    }

    // GetMaterialArray(): UnityEngine_Material[] {
    //     return Il2Cpp.Api.Renderer._GetMaterialArray(this.handle)
    // }

    // SetMaterialArray(m: UnityEngine_Material[]): void {
    //     return Il2Cpp.Api.Renderer._SetMaterialArray(this.handle, m)
    // }

    get_enabled(): boolean {
        return Il2Cpp.Api.Renderer._get_enabled(this.handle)
    }

    set_enabled(value: boolean): void {
        return Il2Cpp.Api.Renderer._set_enabled(this.handle, value ? ptr(1) : ptr(0))
    }

    get_isVisible(): boolean {
        return Il2Cpp.Api.Renderer._get_isVisible(this.handle)
    }

    set_shadowCastingMode(value: ShadowCastingMode): void {
        return Il2Cpp.Api.Renderer._set_shadowCastingMode(this.handle, value)
    }

    set_receiveShadows(value: boolean): void {
        return Il2Cpp.Api.Renderer._set_receiveShadows(this.handle, value)
    }

    get_sortingLayerID(): number {
        return Il2Cpp.Api.Renderer._get_sortingLayerID(this.handle)
    }

    set_sortingLayerID(value: number): void {
        return Il2Cpp.Api.Renderer._set_sortingLayerID(this.handle, value)
    }

    get_sortingOrder(): number {
        return Il2Cpp.Api.Renderer._get_sortingOrder(this.handle)
    }

    set_sortingOrder(value: number): void {
        return Il2Cpp.Api.Renderer._set_sortingOrder(this.handle, value)
    }

    // GetSharedMaterialArray(): UnityEngine_Material[] {
    //     return Il2Cpp.Api.Renderer._GetSharedMaterialArray(this.handle)
    // }

    // get_materials(): UnityEngine_Material[] {
    //     return Il2Cpp.Api.Renderer._get_materials(this.handle)
    // }

    // set_materials(value: UnityEngine_Material[]): void {
    //     return Il2Cpp.Api.Renderer._set_materials(this.handle, value)
    // }

    get_material(): UnityEngine_Material {
        return new UnityEngine_Material_Impl(Il2Cpp.Api.Renderer._get_material(this.handle))
    }

    set_material(value: UnityEngine_Material): void {
        return Il2Cpp.Api.Renderer._set_material(this.handle, value.handle)
    }

    get_sharedMaterial(): UnityEngine_Material {
        return new UnityEngine_Material_Impl(Il2Cpp.Api.Renderer._get_sharedMaterial(this.handle))
    }

    set_sharedMaterial(value: UnityEngine_Material): void {
        return Il2Cpp.Api.Renderer._set_sharedMaterial(this.handle, value.handle)
    }

    // get_sharedMaterials(): UnityEngine_Material[] {
    //     return Il2Cpp.Api.Renderer._get_sharedMaterials(this.handle)
    // }

    // set_sharedMaterials(value: UnityEngine_Material[]): void {
    //     return Il2Cpp.Api.Renderer._set_sharedMaterials(this.handle, value)
    // }

    get_bounds_Injected(ret: UnityEngine_Bounds): void {
        return Il2Cpp.Api.Renderer._get_bounds_Injected(this.handle, ret)
    }
}

Il2Cpp.Renderer = UnityEngine_Renderer_Impl

declare global {
    namespace Il2Cpp {
        class Renderer extends UnityEngine_Renderer_Impl { }
    }
}

export { UnityEngine_Renderer_Impl }