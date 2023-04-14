import { UnityEngine_Color32_Impl as Color32 } from "../../../../../../../../ValueType/Color32/class"
import { UnityEngine_Vector2_Impl as Vector2 } from "../../../../../../../../ValueType/Vector2/class"
import { UnityEngine_Vector4_Impl as Vector4 } from "../../../../../../../../ValueType/Vector4/class"
import { UnityEngine_Material_Impl as Material } from "../../../../../../../Material/class"
import { UnityEngine_Texture_Impl as Texture } from "../../../../../../../Texture/class"
import { UnityEngine_Camera as Camera } from "../../../../../Camera/class"
import { UnityEngine_UI_MaskableGraphic_Impl } from "../class"
import { FillMethod, Type } from "./enum"

type UnityEngine_Sprite = NativePointer
type UnityEngine_Rect = NativePointer
type UnityEngine_UI_VertexHelper = NativePointer
type UnityEngine_Vector3_Array = NativePointer

type System_Void = void
type System_Boolean = boolean
type System_Single = number
type System_Int32 = number
type UnityEngine_Material = Material
type UnityEngine_Texture = Texture
type UnityEngine_Vector4 = Vector4
type UnityEngine_Vector2 = Vector2
type UnityEngine_Color32 = Color32
type UnityEngine_Camera = Camera
type UnityEngine_U2D_SpriteAtlas = Camera

class UnityEngine_UI_Image_Impl extends UnityEngine_UI_MaskableGraphic_Impl {

    s_ETC1DefaultUI: UnityEngine_Material = new Material(lfv(this.handle, "s_ETC1DefaultUI"))
    m_Sprite: UnityEngine_Sprite = lfv(this.handle, "m_Sprite") as unknown as UnityEngine_Sprite
    m_OverrideSprite: UnityEngine_Sprite = lfv(this.handle, "m_OverrideSprite") as unknown as UnityEngine_Sprite
    m_Type: Type = lfv(this.handle, "m_Type") as unknown as Type
    m_PreserveAspect: System_Boolean = readBoolean(lfv(this.handle, "m_PreserveAspect"))
    m_FillCenter: System_Boolean = readBoolean(lfv(this.handle, "m_FillCenter"))
    m_FillMethod: FillMethod = lfv(this.handle, "m_FillMethod") as unknown as FillMethod
    m_FillAmount: System_Single = readSingle(lfv(this.handle, "m_FillAmount"))
    m_FillClockwise: System_Boolean = readBoolean(lfv(this.handle, "m_FillClockwise"))
    m_FillOrigin: System_Int32 = lfv(this.handle, "m_FillOrigin").toInt32()
    m_AlphaHitTestMinimumThreshold: System_Single = readSingle(lfv(this.handle, "m_AlphaHitTestMinimumThreshold"))
    m_Tracked: System_Boolean = readBoolean(lfv(this.handle, "m_Tracked"))
    m_UseSpriteMesh: System_Boolean = readBoolean(lfv(this.handle, "m_UseSpriteMesh"))
    m_PixelsPerUnitMultiplier: System_Single = readSingle(lfv(this.handle, "m_PixelsPerUnitMultiplier"))
    m_CachedReferencePixelsPerUnit: System_Single = readSingle(lfv(this.handle, "m_CachedReferencePixelsPerUnit"))
    s_VertScratch: UnityEngine_Vector2[] = lfv(this.handle, "s_VertScratch") as unknown as UnityEngine_Vector2[]
    s_UVScratch: UnityEngine_Vector2[] = lfv(this.handle, "s_UVScratch") as unknown as UnityEngine_Vector2[]
    // s_Xy: UnityEngine_Vector3[] = lfv(this.handle, "s_Xy") 
    // s_Uv: UnityEngine_Vector3[] = lfv(this.handle, "s_Uv")
    s_Xy: NativePointer = lfv(this.handle, "s_Xy")
    s_Uv: NativePointer = lfv(this.handle, "s_Uv")
    // m_TrackedTexturelessImages: System_Collections.Generic.List<UnityEngine.UI.Image> = lfv(this.handle, "m_TrackedTexturelessImages") as unknown as System_Collections.Generic.List<UnityEngine.UI.Image>
    s_Initialized: System_Boolean = lfv(this.handle, "s_Initialized") as unknown as System_Boolean

    _methods: {} = {}
    _fields: {} = {}

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
        // 这里想尝试一下动态静态结合一下
        // 静态的方法和属性：方便脚本的编写，多数时候UnityApi变化不大不会有啥问题，但是确实也有不同版本不准确的问题
        // 动态的方法和属性：方便CMD直接使用，保管准确 var s = new Il2Cpp.UI_Image(ptr(0x911e5790))；s._fields；
        let thisClass = Il2Cpp.Domain.assembly('UnityEngine.UI').image.class('UnityEngine.UI.Image')
        thisClass.methods.forEach((method: Il2Cpp.Method) => {
            Reflect.set(this._methods, method.name, method.invoke.apply(this.handle))
        })
        thisClass.fields.forEach((field: Il2Cpp.Field) => {
            Reflect.set(this._fields, field.name, field.value)
        })
    }

    get_sprite(): UnityEngine_Sprite {
        return Il2Cpp.Api.Image._get_sprite(this.handle)
    }

    set_sprite(value: UnityEngine_Sprite): System_Void {
        return Il2Cpp.Api.Image._set_sprite(this.handle, value)
    }

    DisableSpriteOptimizations(): System_Void {
        return Il2Cpp.Api.Image._DisableSpriteOptimizations(this.handle)
    }

    get_overrideSprite(): UnityEngine_Sprite {
        return Il2Cpp.Api.Image._get_overrideSprite(this.handle)
    }

    set_overrideSprite(value: UnityEngine_Sprite): System_Void {
        return Il2Cpp.Api.Image._set_overrideSprite(this.handle, value)
    }

    get_activeSprite(): UnityEngine_Sprite {
        return Il2Cpp.Api.Image._get_activeSprite(this.handle)
    }

    get_type(): Type {
        return Il2Cpp.Api.Image._get_type(this.handle)
    }

    set_type(value: Type): System_Void {
        return Il2Cpp.Api.Image._set_type(this.handle, value)
    }

    get_preserveAspect(): System_Boolean {
        return Il2Cpp.Api.Image._get_preserveAspect(this.handle)
    }

    set_preserveAspect(value: System_Boolean): System_Void {
        return Il2Cpp.Api.Image._set_preserveAspect(this.handle, value)
    }

    get_fillCenter(): System_Boolean {
        return Il2Cpp.Api.Image._get_fillCenter(this.handle)
    }

    set_fillCenter(value: System_Boolean): System_Void {
        return Il2Cpp.Api.Image._set_fillCenter(this.handle, value)
    }

    get_fillMethod(): FillMethod {
        return Il2Cpp.Api.Image._get_fillMethod(this.handle)
    }

    set_fillMethod(value: FillMethod): System_Void {
        return Il2Cpp.Api.Image._set_fillMethod(this.handle, value)
    }

    get_fillAmount(): System_Single {
        return readSingle(Il2Cpp.Api.Image._get_fillAmount(this.handle))
    }

    set_fillAmount(value: System_Single): System_Void {
        return Il2Cpp.Api.Image._set_fillAmount(this.handle, value)
    }

    get_fillClockwise(): System_Boolean {
        return Il2Cpp.Api.Image._get_fillClockwise(this.handle)
    }

    set_fillClockwise(value: System_Boolean): System_Void {
        return Il2Cpp.Api.Image._set_fillClockwise(this.handle, value)
    }

    get_fillOrigin(): System_Int32 {
        return Il2Cpp.Api.Image._get_fillOrigin(this.handle)
    }

    set_fillOrigin(value: System_Int32): System_Void {
        return Il2Cpp.Api.Image._set_fillOrigin(this.handle, value)
    }

    get_eventAlphaThreshold(): System_Single {
        return Il2Cpp.Api.Image._get_eventAlphaThreshold(this.handle)
    }

    set_eventAlphaThreshold(value: System_Single): System_Void {
        return Il2Cpp.Api.Image._set_eventAlphaThreshold(this.handle, value)
    }

    get_alphaHitTestMinimumThreshold(): System_Single {
        return Il2Cpp.Api.Image._get_alphaHitTestMinimumThreshold(this.handle)
    }

    set_alphaHitTestMinimumThreshold(value: System_Single): System_Void {
        return Il2Cpp.Api.Image._set_alphaHitTestMinimumThreshold(this.handle, value)
    }

    get_useSpriteMesh(): System_Boolean {
        return Il2Cpp.Api.Image._get_useSpriteMesh(this.handle)
    }

    set_useSpriteMesh(value: System_Boolean): System_Void {
        return Il2Cpp.Api.Image._set_useSpriteMesh(this.handle, value)
    }

    _ctor_Image(): System_Void {
        return Il2Cpp.Api.Image.__ctor(this.handle)
    }

    static get_defaultETC1GraphicMaterial(): UnityEngine_Material {
        return Il2Cpp.Api.Image._get_defaultETC1GraphicMaterial()
    }

    get_mainTexture(): UnityEngine_Texture {
        return Il2Cpp.Api.Image._get_mainTexture(this.handle)
    }

    get_hasBorder(): System_Boolean {
        return Il2Cpp.Api.Image._get_hasBorder(this.handle)
    }

    get_pixelsPerUnitMultiplier(): System_Single {
        return Il2Cpp.Api.Image._get_pixelsPerUnitMultiplier(this.handle)
    }

    set_pixelsPerUnitMultiplier(value: System_Single): System_Void {
        return Il2Cpp.Api.Image._set_pixelsPerUnitMultiplier(this.handle, value)
    }

    get_pixelsPerUnit(): System_Single {
        return readSingle(Il2Cpp.Api.Image._get_pixelsPerUnit(this.handle))
    }

    get_multipliedPixelsPerUnit(): System_Single {
        return Il2Cpp.Api.Image._get_multipliedPixelsPerUnit(this.handle)
    }

    get_material(): UnityEngine_Material {
        return Il2Cpp.Api.Image._get_material(this.handle)
    }

    set_material(value: UnityEngine_Material): System_Void {
        return Il2Cpp.Api.Image._set_material(this.handle, value)
    }

    OnBeforeSerialize(): System_Void {
        return Il2Cpp.Api.Image._OnBeforeSerialize(this.handle)
    }

    OnAfterDeserialize(): System_Void {
        return Il2Cpp.Api.Image._OnAfterDeserialize(this.handle)
    }

    PreserveSpriteAspectRatio(rect: UnityEngine_Rect, spriteSize: UnityEngine_Vector2): System_Void {
        return Il2Cpp.Api.Image._PreserveSpriteAspectRatio(this.handle, rect, spriteSize)
    }

    GetDrawingDimensions(shouldPreserveAspect: System_Boolean): UnityEngine_Vector4 {
        return Il2Cpp.Api.Image._GetDrawingDimensions(this.handle, shouldPreserveAspect)
    }

    SetNativeSize(): System_Void {
        return Il2Cpp.Api.Image._SetNativeSize(this.handle)
    }

    OnPopulateMesh(toFill: UnityEngine_UI_VertexHelper): System_Void {
        return Il2Cpp.Api.Image._OnPopulateMesh(this.handle, toFill)
    }

    TrackSprite(): System_Void {
        return Il2Cpp.Api.Image._TrackSprite(this.handle)
    }

    OnEnable(): System_Void {
        return Il2Cpp.Api.Image._OnEnable(this.handle)
    }

    OnDisable(): System_Void {
        return Il2Cpp.Api.Image._OnDisable(this.handle)
    }

    UpdateMaterial(): System_Void {
        return Il2Cpp.Api.Image._UpdateMaterial(this.handle)
    }

    OnCanvasHierarchyChanged(): System_Void {
        return Il2Cpp.Api.Image._OnCanvasHierarchyChanged(this.handle)
    }

    GenerateSimpleSprite(vh: UnityEngine_UI_VertexHelper, lPreserveAspect: System_Boolean): System_Void {
        return Il2Cpp.Api.Image._GenerateSimpleSprite(this.handle, vh, lPreserveAspect)
    }

    GenerateSprite(vh: UnityEngine_UI_VertexHelper, lPreserveAspect: System_Boolean): System_Void {
        return Il2Cpp.Api.Image._GenerateSprite(this.handle, vh, lPreserveAspect)
    }

    GenerateSlicedSprite(toFill: UnityEngine_UI_VertexHelper): System_Void {
        return Il2Cpp.Api.Image._GenerateSlicedSprite(this.handle, toFill)
    }

    GenerateTiledSprite(toFill: UnityEngine_UI_VertexHelper): System_Void {
        return Il2Cpp.Api.Image._GenerateTiledSprite(this.handle, toFill)
    }

    static AddQuad(vertexHelper: UnityEngine_UI_VertexHelper, quadPositions: UnityEngine_Vector3_Array, color: UnityEngine_Color32, quadUVs: UnityEngine_Vector3_Array): System_Void {
        return Il2Cpp.Api.Image._AddQuad(vertexHelper, quadPositions, color, quadUVs)
    }

    static AddQuad_6(vertexHelper: UnityEngine_UI_VertexHelper, posMin: UnityEngine_Vector2, posMax: UnityEngine_Vector2, color: UnityEngine_Color32, uvMin: UnityEngine_Vector2, uvMax: UnityEngine_Vector2): System_Void {
        return Il2Cpp.Api.Image._AddQuad(vertexHelper, posMin, posMax, color, uvMin, uvMax)
    }

    GetAdjustedBorders(border: UnityEngine_Vector4, adjustedRect: UnityEngine_Rect): UnityEngine_Vector4 {
        return Il2Cpp.Api.Image._GetAdjustedBorders(this.handle, border, adjustedRect)
    }

    GenerateFilledSprite(toFill: UnityEngine_UI_VertexHelper, preserveAspect: System_Boolean): System_Void {
        return Il2Cpp.Api.Image._GenerateFilledSprite(this.handle, toFill, preserveAspect)
    }

    static RadialCut(xy: UnityEngine_Vector3_Array, uv: UnityEngine_Vector3_Array, fill: System_Single, invert: System_Boolean, corner: System_Int32): System_Boolean {
        return Il2Cpp.Api.Image._RadialCut(xy, uv, fill, invert, corner)
    }

    static RadialCut_5(xy: UnityEngine_Vector3_Array, cos: System_Single, sin: System_Single, invert: System_Boolean, corner: System_Int32): System_Void {
        return Il2Cpp.Api.Image._RadialCut(xy, cos, sin, invert, corner)
    }

    CalculateLayoutInputHorizontal(): System_Void {
        return Il2Cpp.Api.Image._CalculateLayoutInputHorizontal(this.handle)
    }

    CalculateLayoutInputVertical(): System_Void {
        return Il2Cpp.Api.Image._CalculateLayoutInputVertical(this.handle)
    }

    get_minWidth(): System_Single {
        return readSingle(Il2Cpp.Api.Image._get_minWidth(this.handle))
    }

    get_preferredWidth(): System_Single {
        return readSingle(Il2Cpp.Api.Image._get_preferredWidth(this.handle))
    }

    get_flexibleWidth(): System_Single {
        return readSingle(Il2Cpp.Api.Image._get_flexibleWidth(this.handle))
    }

    get_minHeight(): System_Single {
        return readSingle(Il2Cpp.Api.Image._get_minHeight(this.handle))
    }

    get_preferredHeight(): System_Single {
        return readSingle(Il2Cpp.Api.Image._get_preferredHeight(this.handle))
    }

    get_flexibleHeight(): System_Single {
        return readSingle(Il2Cpp.Api.Image._get_flexibleHeight(this.handle))
    }

    get_layoutPriority(): System_Int32 {
        return Il2Cpp.Api.Image._get_layoutPriority(this.handle)
    }

    IsRaycastLocationValid(screenPoint: UnityEngine_Vector2, eventCamera: UnityEngine_Camera): System_Boolean {
        return Il2Cpp.Api.Image._IsRaycastLocationValid(this.handle, screenPoint, eventCamera)
    }

    MapCoordinate(local: UnityEngine_Vector2, rect: UnityEngine_Rect): UnityEngine_Vector2 {
        return Il2Cpp.Api.Image._MapCoordinate(this.handle, local, rect)
    }

    static RebuildImage(spriteAtlas: UnityEngine_U2D_SpriteAtlas): System_Void {
        return Il2Cpp.Api.Image._RebuildImage(spriteAtlas)
    }

    static TrackImage(g: UnityEngine_UI_Image_Impl): System_Void {
        return Il2Cpp.Api.Image._TrackImage(g.handle)
    }

    static UnTrackImage(g: UnityEngine_UI_Image_Impl): System_Void {
        return Il2Cpp.Api.Image._UnTrackImage(g.handle)
    }

    OnDidApplyAnimationProperties(): System_Void {
        return Il2Cpp.Api.Image._OnDidApplyAnimationProperties(this.handle)
    }

    static _cctor_Image(): System_Void {
        return Il2Cpp.Api.Image.__cctor()
    }

}

Il2Cpp.UI_Image = UnityEngine_UI_Image_Impl

declare global {
    namespace Il2Cpp {
        class UI_Image extends UnityEngine_UI_Image_Impl { }
    }
}

export { UnityEngine_UI_Image_Impl as UI_Image }