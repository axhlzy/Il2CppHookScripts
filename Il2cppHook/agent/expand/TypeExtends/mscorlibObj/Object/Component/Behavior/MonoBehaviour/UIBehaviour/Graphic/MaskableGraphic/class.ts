import { UnityEngine_Rect_Impl as UnityEngine_Rect } from "../../../../../../../ValueType/Rect/class"
import { UnityEngine_Material_Impl as UnityEngine_Material } from "../../../../../../Material/class"
import { UnityEngine_UI_Graphic_Impl } from "../class"

type UnityEngine_UI_RectMask2D = NativePointer
type UnityEngine_UI_MaskableGraphic_CullStateChangedEvent = NativePointer
type UnityEngine_Vector3 = NativePointer
type UnityEngine_Vector2 = NativePointer

class UnityEngine_UI_MaskableGraphic_Impl extends UnityEngine_UI_Graphic_Impl {

    m_ShouldRecalculateStencil: boolean = lfv(this.handle, "m_ShouldRecalculateStencil") as unknown as boolean
    m_MaskMaterial: UnityEngine_Material = lfv(this.handle, "m_MaskMaterial") as unknown as UnityEngine_Material
    m_ParentMask: UnityEngine_UI_RectMask2D = lfv(this.handle, "m_ParentMask")
    m_Maskable: boolean = lfv(this.handle, "m_Maskable") as unknown as boolean
    m_IsMaskingGraphic: boolean = lfv(this.handle, "m_IsMaskingGraphic") as unknown as boolean
    m_IncludeForMasking: boolean = lfv(this.handle, "m_IncludeForMasking") as unknown as boolean
    m_OnCullStateChanged: UnityEngine_UI_MaskableGraphic_CullStateChangedEvent = lfv(this.handle, "m_OnCullStateChanged")
    m_ShouldRecalculate: boolean = lfv(this.handle, "m_ShouldRecalculate") as unknown as boolean
    m_StencilValue: number = lfv(this.handle, "m_StencilValue") as unknown as number
    m_Corners: UnityEngine_Vector3[] = lfv(this.handle, "m_Corners") as unknown as UnityEngine_Vector3[]


    get_onCullStateChanged(): UnityEngine_UI_MaskableGraphic_CullStateChangedEvent {
        return Il2Cpp.Api.MaskableGraphic._get_onCullStateChanged(this.handle)
    }

    set_onCullStateChanged(value: UnityEngine_UI_MaskableGraphic_CullStateChangedEvent): void {
        return Il2Cpp.Api.MaskableGraphic._set_onCullStateChanged(this.handle, value)
    }

    get_maskable(): boolean {
        return Il2Cpp.Api.MaskableGraphic._get_maskable(this.handle)
    }

    set_maskable(value: boolean): void {
        return Il2Cpp.Api.MaskableGraphic._set_maskable(this.handle, value)
    }

    get_isMaskingGraphic(): boolean {
        return Il2Cpp.Api.MaskableGraphic._get_isMaskingGraphic(this.handle)
    }

    set_isMaskingGraphic(value: boolean): void {
        return Il2Cpp.Api.MaskableGraphic._set_isMaskingGraphic(this.handle, value)
    }

    GetModifiedMaterial(baseMaterial: UnityEngine_Material): UnityEngine_Material {
        return Il2Cpp.Api.MaskableGraphic._GetModifiedMaterial(this.handle, baseMaterial)
    }

    Cull(clipRect: UnityEngine_Rect, validRect: boolean): void {
        return Il2Cpp.Api.MaskableGraphic._Cull(this.handle, clipRect, validRect)
    }

    UpdateCull(cull: boolean): void {
        return Il2Cpp.Api.MaskableGraphic._UpdateCull(this.handle, cull)
    }

    SetClipRect(clipRect: UnityEngine_Rect, validRect: boolean): void {
        return Il2Cpp.Api.MaskableGraphic._SetClipRect(this.handle, clipRect, validRect)
    }

    SetClipSoftness(clipSoftness: UnityEngine_Vector2): void {
        return Il2Cpp.Api.MaskableGraphic._SetClipSoftness(this.handle, clipSoftness)
    }

    OnEnable(): void {
        return Il2Cpp.Api.MaskableGraphic._OnEnable(this.handle)
    }

    OnDisable(): void {
        return Il2Cpp.Api.MaskableGraphic._OnDisable(this.handle)
    }

    OnTransformParentChanged(): void {
        return Il2Cpp.Api.MaskableGraphic._OnTransformParentChanged(this.handle)
    }

    ParentMaskStateChanged(): void {
        return Il2Cpp.Api.MaskableGraphic._ParentMaskStateChanged(this.handle)
    }

    OnCanvasHierarchyChanged(): void {
        return Il2Cpp.Api.MaskableGraphic._OnCanvasHierarchyChanged(this.handle)
    }

    get_rootCanvasRect(): UnityEngine_Rect {
        return Il2Cpp.Api.MaskableGraphic._get_rootCanvasRect(this.handle)
    }

    UpdateClipParent(): void {
        return Il2Cpp.Api.MaskableGraphic._UpdateClipParent(this.handle)
    }

    RecalculateClipping(): void {
        return Il2Cpp.Api.MaskableGraphic._RecalculateClipping(this.handle)
    }

    RecalculateMasking(): void {
        return Il2Cpp.Api.MaskableGraphic._RecalculateMasking(this.handle)
    }

    _ctor(): void {
        return Il2Cpp.Api.MaskableGraphic.__ctor(this.handle)
    }

}

declare global {
    namespace Il2Cpp {
        class MaskableGraphic extends UnityEngine_UI_MaskableGraphic_Impl { }
    }
}

export { UnityEngine_UI_MaskableGraphic_Impl }