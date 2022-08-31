import { UnityEngine_Rect_Impl as Rect } from "../../../../ValueType/Rect/class"
import { UnityEngine_Vector2_Impl as Vector2 } from "../../../../ValueType/Vector2/class"
import { UnityEngine_Vector3_Impl as Vector3 } from "../../../../ValueType/Vector3/class"
import { UnityEngine_Transform_Impl } from "../class"

type UnityEngine_RectTransform_ReapplyDrivenProperties = NativePointer
type UnityEngine_RectTransform_Axis = NativePointer

class UnityEngine_RectTransform_Impl extends UnityEngine_Transform_Impl {

    reapplyDrivenProperties: UnityEngine_RectTransform_ReapplyDrivenProperties = lfv(this.handle, "reapplyDrivenProperties")

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    static add_reapplyDrivenProperties(value: UnityEngine_RectTransform_ReapplyDrivenProperties): void {
        return Il2Cpp.Api.RectTransform._add_reapplyDrivenProperties(value)
    }

    static remove_reapplyDrivenProperties(value: UnityEngine_RectTransform_ReapplyDrivenProperties): void {
        return Il2Cpp.Api.RectTransform._remove_reapplyDrivenProperties(value)
    }

    get_rect(): Rect {
        return new Rect(Il2Cpp.Api.RectTransform._get_rect(this.handle))
    }

    get_anchorMin(): Vector2 {
        return new Vector2(Il2Cpp.Api.RectTransform._get_anchorMin(this.handle))
    }

    set_anchorMin(value: Vector2): void {
        return Il2Cpp.Api.RectTransform._set_anchorMin(this.handle, value.handle)
    }

    get_anchorMax(): Vector2 {
        return new Vector2(Il2Cpp.Api.RectTransform._get_anchorMax(this.handle))
    }

    set_anchorMax(value: Vector2): void {
        return Il2Cpp.Api.RectTransform._set_anchorMax(this.handle, value.handle)
    }

    get_anchoredPosition(): Vector2 {
        return new Vector2(Il2Cpp.Api.RectTransform._get_anchoredPosition(this.handle))
    }

    set_anchoredPosition(value: Vector2): void {
        return Il2Cpp.Api.RectTransform._set_anchoredPosition(this.handle, value.handle)
    }

    get_sizeDelta(): Vector2 {
        return new Vector2(Il2Cpp.Api.RectTransform._get_sizeDelta(this.handle))
    }

    set_sizeDelta(value: Vector2): void {
        return Il2Cpp.Api.RectTransform._set_sizeDelta(this.handle, value.handle)
    }

    get_pivot(): Vector2 {
        return new Vector2(Il2Cpp.Api.RectTransform._get_pivot(this.handle))
    }

    set_pivot(value: Vector2): void {
        return Il2Cpp.Api.RectTransform._set_pivot(this.handle, value.handle)
    }

    get_anchoredPosition3D(): Vector3 {
        return new Vector3(Il2Cpp.Api.RectTransform._get_anchoredPosition3D(this.handle))
    }

    set_anchoredPosition3D(value: Vector3): void {
        return Il2Cpp.Api.RectTransform._set_anchoredPosition3D(this.handle, value.handle)
    }

    get_offsetMin(): Vector2 {
        return new Vector2(Il2Cpp.Api.RectTransform._get_offsetMin(this.handle))
    }

    set_offsetMin(value: Vector2): void {
        return Il2Cpp.Api.RectTransform._set_offsetMin(this.handle, value.handle)
    }

    get_offsetMax(): Vector2 {
        return new Vector2(Il2Cpp.Api.RectTransform._get_offsetMax(this.handle))
    }

    set_offsetMax(value: Vector2): void {
        return Il2Cpp.Api.RectTransform._set_offsetMax(this.handle, value.handle)
    }

    ForceUpdateRectTransforms(): void {
        return Il2Cpp.Api.RectTransform._ForceUpdateRectTransforms(this.handle)
    }

    GetLocalCorners(fourCornersArray: Vector3[]): void {
        return Il2Cpp.Api.RectTransform._GetLocalCorners(this.handle, fourCornersArray)
    }

    GetWorldCorners(fourCornersArray: Vector3[]): void {
        return Il2Cpp.Api.RectTransform._GetWorldCorners(this.handle, fourCornersArray)
    }

    SetSizeWithCurrentAnchors(axis: UnityEngine_RectTransform_Axis, size: number): void {
        return Il2Cpp.Api.RectTransform._SetSizeWithCurrentAnchors(this.handle, axis, size)
    }

    static SendReapplyDrivenProperties(driven: UnityEngine_RectTransform_Impl): void {
        return Il2Cpp.Api.RectTransform._SendReapplyDrivenProperties(driven)
    }

    GetParentSize(): Vector2 {
        return new Vector2(Il2Cpp.Api.RectTransform._GetParentSize(this.handle))
    }

    get_rect_Injected(ret: Rect): void {
        return Il2Cpp.Api.RectTransform._get_rect_Injected(this.handle, ret.handle)
    }

    get_anchorMin_Injected(ret: Vector2): void {
        return Il2Cpp.Api.RectTransform._get_anchorMin_Injected(this.handle, ret.handle)
    }

    set_anchorMin_Injected(value: Vector2): void {
        return Il2Cpp.Api.RectTransform._set_anchorMin_Injected(this.handle, value.handle)
    }

    get_anchorMax_Injected(ret: Vector2): void {
        return Il2Cpp.Api.RectTransform._get_anchorMax_Injected(this.handle, ret.handle)
    }

    set_anchorMax_Injected(value: Vector2): void {
        return Il2Cpp.Api.RectTransform._set_anchorMax_Injected(this.handle, value.handle)
    }

    get_anchoredPosition_Injected(ret: Vector2): void {
        return Il2Cpp.Api.RectTransform._get_anchoredPosition_Injected(this.handle, ret.handle)
    }

    set_anchoredPosition_Injected(value: Vector2): void {
        return Il2Cpp.Api.RectTransform._set_anchoredPosition_Injected(this.handle, value.handle)
    }

    get_sizeDelta_Injected(ret: Vector2): void {
        return Il2Cpp.Api.RectTransform._get_sizeDelta_Injected(this.handle, ret.handle)
    }

    set_sizeDelta_Injected(value: Vector2): void {
        return Il2Cpp.Api.RectTransform._set_sizeDelta_Injected(this.handle, value.handle)
    }

    get_pivot_Injected(ret: Vector2): void {
        return Il2Cpp.Api.RectTransform._get_pivot_Injected(this.handle, ret.handle)
    }

    set_pivot_Injected(value: Vector2): void {
        return Il2Cpp.Api.RectTransform._set_pivot_Injected(this.handle, value.handle)
    }

}

Il2Cpp.RectTransform = UnityEngine_RectTransform_Impl

declare global {
    namespace Il2Cpp {
        class RectTransform extends UnityEngine_RectTransform_Impl { }
    }
}

export { UnityEngine_RectTransform_Impl }