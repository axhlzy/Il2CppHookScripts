import { UnityEngine_Events_UnityAction_Impl as UnityAction } from "../../../../../../Delegate/MulticastDelegate/UnityAction/class"
import { UnityEngine_Color_Impl as Color } from "../../../../../../ValueType/Color/class"
import { UnityEngine_Vector2_Impl as Vector2 } from "../../../../../../ValueType/Vector2/class"
import { UnityEngine_Vector4_Impl as Vector4 } from "../../../../../../ValueType/Vector4/class"
import { UnityEngine_Material_Impl as Material } from "../../../../../Material/class"
import { UnityEngine_Texture2D_Impl as Texture2D } from "../../../../../Texture/Texture2D/class"
import { UnityEngine_Texture_Impl as Texture } from "../../../../../Texture/class"
import { UnityEngine_RectTransform as RectTransform } from "../../../../Transform/RectTransform/class"
import { UnityEngine_Camera as Camera } from "../../../Camera/class"
import { UnityEngine_Canvas_Impl as Canvas } from "../../../Canvas/class"
import { UnityEngine_EventSystems_UIBehaviour_Impl } from "../class"

type UnityEngine_UI_VertexHelper = NativePointer
type UnityEngine_CanvasRenderer = NativePointer
type UnityEngine_Rect = NativePointer
type UnityEngine_Mesh = NativePointer

type UnityEngine_Texture = Texture
type UnityEngine_Events_UnityAction = UnityAction
type UnityEngine_UI_CanvasUpdate = NativePointer
type UnityEngine_Texture2D = Texture2D

class UnityEngine_UI_Graphic_Impl extends UnityEngine_EventSystems_UIBehaviour_Impl {

    s_DefaultUI: Material = new Material(lfv(this.handle, "s_DefaultUI"))
    s_WhiteTexture: UnityEngine_Texture2D = new Texture2D(lfv(this.handle, "s_WhiteTexture"))
    m_Material: Material = new Material(lfv(this.handle, "m_Material"))
    m_Color: Color = new Color(lfv(this.handle, "m_Color"))
    m_SkipLayoutUpdate: boolean = readBoolean(lfv(this.handle, "m_SkipLayoutUpdate"))
    m_SkipMaterialUpdate: boolean = readBoolean(lfv(this.handle, "m_SkipMaterialUpdate"))
    m_RaycastTarget: boolean = readBoolean(lfv(this.handle, "m_RaycastTarget"))
    m_RaycastPadding: Vector4 = lfv(this.handle, "m_RaycastPadding") as unknown as Vector4
    m_RectTransform: RectTransform = new RectTransform(lfv(this.handle, "m_RectTransform"))
    m_CanvasRenderer: UnityEngine_CanvasRenderer = lfv(this.handle, "m_CanvasRenderer") as unknown as UnityEngine_CanvasRenderer
    m_Canvas: Canvas = new Canvas(lfv(this.handle, "m_Canvas"))
    m_VertsDirty: boolean = readBoolean(lfv(this.handle, "m_VertsDirty"))
    m_MaterialDirty: boolean = readBoolean(lfv(this.handle, "m_MaterialDirty"))
    m_OnDirtyLayoutCallback: UnityEngine_Events_UnityAction = new UnityAction(lfv(this.handle, "m_OnDirtyLayoutCallback"))
    m_OnDirtyVertsCallback: UnityEngine_Events_UnityAction = new UnityAction(lfv(this.handle, "m_OnDirtyVertsCallback"))
    m_OnDirtyMaterialCallback: UnityEngine_Events_UnityAction = new UnityAction(lfv(this.handle, "m_OnDirtyMaterialCallback"))
    s_Mesh: UnityEngine_Mesh = lfv(this.handle, "s_Mesh") as unknown as UnityEngine_Mesh
    s_VertexHelper: UnityEngine_UI_VertexHelper = lfv(this.handle, "s_VertexHelper") as unknown as UnityEngine_UI_VertexHelper
    m_CachedMesh: UnityEngine_Mesh = lfv(this.handle, "m_CachedMesh") as unknown as UnityEngine_Mesh
    // m_CachedUvs: Vector2[] = lfv(this.handle, "m_CachedUvs") as unknown as Vector2[]
    m_CachedUvs: NativePointer = lfv(this.handle, "m_CachedUvs")

    get_defaultGraphicMaterial(): Material {
        return Il2Cpp.Api.Graphic._get_defaultGraphicMaterial()
    }

    get_color(): Color {
        return Il2Cpp.Api.Graphic._get_color(this.handle)
    }

    set_color(value: Color): void {
        return Il2Cpp.Api.Graphic._set_color(this.handle, value)
    }

    get_raycastTarget(): boolean {
        return Il2Cpp.Api.Graphic._get_raycastTarget(this.handle)
    }

    set_raycastTarget(value: boolean): void {
        return Il2Cpp.Api.Graphic._set_raycastTarget(this.handle, value)
    }

    get_raycastPadding(): Vector4 {
        return Il2Cpp.Api.Graphic._get_raycastPadding(this.handle)
    }

    set_raycastPadding(value: Vector4): void {
        return Il2Cpp.Api.Graphic._set_raycastPadding(this.handle, value)
    }

    get_useLegacyMeshGeneration(): boolean {
        return Il2Cpp.Api.Graphic._get_useLegacyMeshGeneration(this.handle)
    }

    set_useLegacyMeshGeneration(value: boolean): void {
        return Il2Cpp.Api.Graphic._set_useLegacyMeshGeneration(this.handle, value)
    }

    _ctor(): void {
        return Il2Cpp.Api.Graphic.__ctor(this.handle)
    }

    SetAllDirty(): void {
        return Il2Cpp.Api.Graphic._SetAllDirty(this.handle)
    }

    SetLayoutDirty(): void {
        return Il2Cpp.Api.Graphic._SetLayoutDirty(this.handle)
    }

    SetVerticesDirty(): void {
        return Il2Cpp.Api.Graphic._SetVerticesDirty(this.handle)
    }

    SetMaterialDirty(): void {
        return Il2Cpp.Api.Graphic._SetMaterialDirty(this.handle)
    }

    OnRectTransformDimensionsChange(): void {
        return Il2Cpp.Api.Graphic._OnRectTransformDimensionsChange(this.handle)
    }

    OnBeforeTransformParentChanged(): void {
        return Il2Cpp.Api.Graphic._OnBeforeTransformParentChanged(this.handle)
    }

    OnTransformParentChanged(): void {
        return Il2Cpp.Api.Graphic._OnTransformParentChanged(this.handle)
    }

    get_depth(): number {
        return Il2Cpp.Api.Graphic._get_depth(this.handle)
    }

    get_rectTransform(): RectTransform {
        return new RectTransform(Il2Cpp.Api.Graphic._get_rectTransform(this.handle))
    }

    get_canvas(): Canvas {
        return new Canvas(Il2Cpp.Api.Graphic._get_canvas(this.handle))
    }

    CacheCanvas(): void {
        return Il2Cpp.Api.Graphic._CacheCanvas(this.handle)
    }

    get_canvasRenderer(): UnityEngine_CanvasRenderer {
        return Il2Cpp.Api.Graphic._get_canvasRenderer(this.handle)
    }

    get_defaultMaterial(): Material {
        return Il2Cpp.Api.Graphic._get_defaultMaterial(this.handle)
    }

    get_material(): Material {
        return Il2Cpp.Api.Graphic._get_material(this.handle)
    }

    set_material(value: Material): void {
        return Il2Cpp.Api.Graphic._set_material(this.handle, value)
    }

    get_materialForRendering(): Material {
        return Il2Cpp.Api.Graphic._get_materialForRendering(this.handle)
    }

    get_mainTexture(): UnityEngine_Texture {
        return Il2Cpp.Api.Graphic._get_mainTexture(this.handle)
    }

    OnEnable(): void {
        return Il2Cpp.Api.Graphic._OnEnable(this.handle)
    }

    OnDisable(): void {
        return Il2Cpp.Api.Graphic._OnDisable(this.handle)
    }

    OnDestroy(): void {
        return Il2Cpp.Api.Graphic._OnDestroy(this.handle)
    }

    OnCanvasHierarchyChanged(): void {
        return Il2Cpp.Api.Graphic._OnCanvasHierarchyChanged(this.handle)
    }

    OnCullingChanged(): void {
        return Il2Cpp.Api.Graphic._OnCullingChanged(this.handle)
    }

    Rebuild(update: UnityEngine_UI_CanvasUpdate): void {
        return Il2Cpp.Api.Graphic._Rebuild(this.handle, update)
    }

    LayoutComplete(): void {
        return Il2Cpp.Api.Graphic._LayoutComplete(this.handle)
    }

    GraphicUpdateComplete(): void {
        return Il2Cpp.Api.Graphic._GraphicUpdateComplete(this.handle)
    }

    UpdateMaterial(): void {
        return Il2Cpp.Api.Graphic._UpdateMaterial(this.handle)
    }

    UpdateGeometry(): void {
        return Il2Cpp.Api.Graphic._UpdateGeometry(this.handle)
    }

    DoMeshGeneration(): void {
        return Il2Cpp.Api.Graphic._DoMeshGeneration(this.handle)
    }

    DoLegacyMeshGeneration(): void {
        return Il2Cpp.Api.Graphic._DoLegacyMeshGeneration(this.handle)
    }

    get_workerMesh(): UnityEngine_Mesh {
        return Il2Cpp.Api.Graphic._get_workerMesh()
    }

    OnFillVBO(vbo: NativePointer): void {
        return Il2Cpp.Api.Graphic._OnFillVBO(this.handle, vbo)
    }

    OnPopulateMesh(m: UnityEngine_Mesh): void {
        return Il2Cpp.Api.Graphic._OnPopulateMesh(this.handle, m)
    }

    OnPopulateMesh_vh(vh: UnityEngine_UI_VertexHelper): void {
        return Il2Cpp.Api.Graphic._OnPopulateMesh(this.handle, vh)
    }

    OnDidApplyAnimationProperties(): void {
        return Il2Cpp.Api.Graphic._OnDidApplyAnimationProperties(this.handle)
    }

    SetNativeSize(): void {
        return Il2Cpp.Api.Graphic._SetNativeSize(this.handle)
    }

    Raycast(sp: Vector2, eventCamera: Camera): boolean {
        return Il2Cpp.Api.Graphic._Raycast(this.handle, sp, eventCamera)
    }

    PixelAdjustPoint(point: Vector2): Vector2 {
        return Il2Cpp.Api.Graphic._PixelAdjustPoint(this.handle, point)
    }

    GetPixelAdjustedRect(): UnityEngine_Rect {
        return Il2Cpp.Api.Graphic._GetPixelAdjustedRect(this.handle)
    }

    CrossFadeColor_4(targetColor: Color, duration: number, ignoreTimeScale: boolean, useAlpha: boolean): void {
        return Il2Cpp.Api.Graphic._CrossFadeColor(this.handle, targetColor, duration, ignoreTimeScale, useAlpha)
    }

    CrossFadeColor_5(targetColor: Color, duration: number, ignoreTimeScale: boolean, useAlpha: boolean, useRGB: boolean): void {
        return Il2Cpp.Api.Graphic._CrossFadeColor(this.handle, targetColor, duration, ignoreTimeScale, useAlpha, useRGB)
    }

    CreateColorFromAlpha(alpha: number): Color {
        return Il2Cpp.Api.Graphic._CreateColorFromAlpha(alpha)
    }

    CrossFadeAlpha(alpha: number, duration: number, ignoreTimeScale: boolean): void {
        return Il2Cpp.Api.Graphic._CrossFadeAlpha(this.handle, alpha, duration, ignoreTimeScale)
    }

    RegisterDirtyLayoutCallback(action: UnityEngine_Events_UnityAction): void {
        return Il2Cpp.Api.Graphic._RegisterDirtyLayoutCallback(this.handle, action)
    }

    UnregisterDirtyLayoutCallback(action: UnityEngine_Events_UnityAction): void {
        return Il2Cpp.Api.Graphic._UnregisterDirtyLayoutCallback(this.handle, action)
    }

    RegisterDirtyVerticesCallback(action: UnityEngine_Events_UnityAction): void {
        return Il2Cpp.Api.Graphic._RegisterDirtyVerticesCallback(this.handle, action)
    }

    UnregisterDirtyVerticesCallback(action: UnityEngine_Events_UnityAction): void {
        return Il2Cpp.Api.Graphic._UnregisterDirtyVerticesCallback(this.handle, action)
    }

    RegisterDirtyMaterialCallback(action: UnityEngine_Events_UnityAction): void {
        return Il2Cpp.Api.Graphic._RegisterDirtyMaterialCallback(this.handle, action)
    }

    UnregisterDirtyMaterialCallback(action: UnityEngine_Events_UnityAction): void {
        return Il2Cpp.Api.Graphic._UnregisterDirtyMaterialCallback(this.handle, action)
    }

    _cctor(): void {
        return Il2Cpp.Api.Graphic.__cctor()
    }

}

declare global {
    namespace Il2Cpp {
        class Graphic extends UnityEngine_UI_Graphic_Impl { }
    }
}

export { UnityEngine_UI_Graphic_Impl }