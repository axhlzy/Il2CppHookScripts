import { UnityEngine_EventSystems_UIBehaviour_Impl } from "../class"

type UnityEngine_Material = NativePointer
type UnityEngine_Texture2D = NativePointer
type UnityEngine_Color = NativePointer
type UnityEngine_Vector2 = NativePointer
type UnityEngine_Vector4 = NativePointer
type UnityEngine_UI_VertexHelper = NativePointer
type UnityEngine_RectTransform = NativePointer
type UnityEngine_CanvasRenderer = NativePointer
type UnityEngine_Canvas = NativePointer
type UnityEngine_Events_UnityAction = NativePointer
type UnityEngine_Mesh = NativePointer
type UnityEngine_Texture = NativePointer
type System_Boolean = NativePointer
type UnityEngine_Camera = NativePointer
type UnityEngine_UI_CanvasUpdate = NativePointer
type UnityEngine_Rect = NativePointer

class UnityEngine_UI_Graphic_Impl extends UnityEngine_EventSystems_UIBehaviour_Impl {

    s_DefaultUI: UnityEngine_Material = lfv(this.handle, "s_DefaultUI") as unknown as UnityEngine_Material
    s_WhiteTexture: UnityEngine_Texture2D = lfv(this.handle, "s_WhiteTexture") as unknown as UnityEngine_Texture2D
    m_Material: UnityEngine_Material = lfv(this.handle, "m_Material") as unknown as UnityEngine_Material
    m_Color: UnityEngine_Color = lfv(this.handle, "m_Color") as unknown as UnityEngine_Color
    m_SkipLayoutUpdate: boolean = lfv(this.handle, "m_SkipLayoutUpdate") as unknown as boolean
    m_SkipMaterialUpdate: boolean = lfv(this.handle, "m_SkipMaterialUpdate") as unknown as boolean
    m_RaycastTarget: boolean = lfv(this.handle, "m_RaycastTarget") as unknown as boolean
    m_RaycastPadding: UnityEngine_Vector4 = lfv(this.handle, "m_RaycastPadding") as unknown as UnityEngine_Vector4
    m_RectTransform: UnityEngine_RectTransform = lfv(this.handle, "m_RectTransform") as unknown as UnityEngine_RectTransform
    m_CanvasRenderer: UnityEngine_CanvasRenderer = lfv(this.handle, "m_CanvasRenderer") as unknown as UnityEngine_CanvasRenderer
    m_Canvas: UnityEngine_Canvas = lfv(this.handle, "m_Canvas") as unknown as UnityEngine_Canvas
    m_VertsDirty: boolean = lfv(this.handle, "m_VertsDirty") as unknown as boolean
    m_MaterialDirty: boolean = lfv(this.handle, "m_MaterialDirty") as unknown as boolean
    m_OnDirtyLayoutCallback: UnityEngine_Events_UnityAction = lfv(this.handle, "m_OnDirtyLayoutCallback") as unknown as UnityEngine_Events_UnityAction
    m_OnDirtyVertsCallback: UnityEngine_Events_UnityAction = lfv(this.handle, "m_OnDirtyVertsCallback") as unknown as UnityEngine_Events_UnityAction
    m_OnDirtyMaterialCallback: UnityEngine_Events_UnityAction = lfv(this.handle, "m_OnDirtyMaterialCallback") as unknown as UnityEngine_Events_UnityAction
    s_Mesh: UnityEngine_Mesh = lfv(this.handle, "s_Mesh") as unknown as UnityEngine_Mesh
    s_VertexHelper: UnityEngine_UI_VertexHelper = lfv(this.handle, "s_VertexHelper") as unknown as UnityEngine_UI_VertexHelper
    m_CachedMesh: UnityEngine_Mesh = lfv(this.handle, "m_CachedMesh") as unknown as UnityEngine_Mesh
    m_CachedUvs: UnityEngine_Vector2[] = lfv(this.handle, "m_CachedUvs") as unknown as UnityEngine_Vector2[]

    get_defaultGraphicMaterial(): UnityEngine_Material {
        return Il2Cpp.Api.Graphic._get_defaultGraphicMaterial()
    }

    get_color(): UnityEngine_Color {
        return Il2Cpp.Api.Graphic._get_color(this.handle)
    }

    set_color(value: UnityEngine_Color): void {
        return Il2Cpp.Api.Graphic._set_color(this.handle, value)
    }

    get_raycastTarget(): boolean {
        return Il2Cpp.Api.Graphic._get_raycastTarget(this.handle)
    }

    set_raycastTarget(value: boolean): void {
        return Il2Cpp.Api.Graphic._set_raycastTarget(this.handle, value)
    }

    get_raycastPadding(): UnityEngine_Vector4 {
        return Il2Cpp.Api.Graphic._get_raycastPadding(this.handle)
    }

    set_raycastPadding(value: UnityEngine_Vector4): void {
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

    get_rectTransform(): UnityEngine_RectTransform {
        return Il2Cpp.Api.Graphic._get_rectTransform(this.handle)
    }

    get_canvas(): UnityEngine_Canvas {
        return Il2Cpp.Api.Graphic._get_canvas(this.handle)
    }

    CacheCanvas(): void {
        return Il2Cpp.Api.Graphic._CacheCanvas(this.handle)
    }

    get_canvasRenderer(): UnityEngine_CanvasRenderer {
        return Il2Cpp.Api.Graphic._get_canvasRenderer(this.handle)
    }

    get_defaultMaterial(): UnityEngine_Material {
        return Il2Cpp.Api.Graphic._get_defaultMaterial(this.handle)
    }

    get_material(): UnityEngine_Material {
        return Il2Cpp.Api.Graphic._get_material(this.handle)
    }

    set_material(value: UnityEngine_Material): void {
        return Il2Cpp.Api.Graphic._set_material(this.handle, value)
    }

    get_materialForRendering(): UnityEngine_Material {
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

    Raycast(sp: UnityEngine_Vector2, eventCamera: UnityEngine_Camera): boolean {
        return Il2Cpp.Api.Graphic._Raycast(this.handle, sp, eventCamera)
    }

    PixelAdjustPoint(point: UnityEngine_Vector2): UnityEngine_Vector2 {
        return Il2Cpp.Api.Graphic._PixelAdjustPoint(this.handle, point)
    }

    GetPixelAdjustedRect(): UnityEngine_Rect {
        return Il2Cpp.Api.Graphic._GetPixelAdjustedRect(this.handle)
    }

    CrossFadeColor_4(targetColor: UnityEngine_Color, duration: number, ignoreTimeScale: boolean, useAlpha: System_Boolean): void {
        return Il2Cpp.Api.Graphic._CrossFadeColor(this.handle, targetColor, duration, ignoreTimeScale, useAlpha)
    }

    CrossFadeColor_5(targetColor: UnityEngine_Color, duration: number, ignoreTimeScale: boolean, useAlpha: System_Boolean, useRGB: System_Boolean): void {
        return Il2Cpp.Api.Graphic._CrossFadeColor(this.handle, targetColor, duration, ignoreTimeScale, useAlpha, useRGB)
    }

    CreateColorFromAlpha(alpha: number): UnityEngine_Color {
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