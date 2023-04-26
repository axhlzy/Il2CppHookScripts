import { UnityEngine_Coroutine_Impl as UnityEngine_Coroutine } from "../../../../../../../../../YieldInstruction/Coroutine/class"
import { UnityEngine_MeshRenderer_Impl as UnityEngine_MeshRenderer } from "../../../../../../../Renderer/MeshRenderer/class"
import { UnityEngine_Matrix4x4_Impl as UnityEngine_Matrix4x4 } from "../../../../../../../../../ValueType/Matrix4x4/class"
import { UnityEngine_Color32_Impl as UnityEngine_Color32 } from "../../../../../../../../../ValueType/Color32/class"
import { UnityEngine_Vector4_Impl as UnityEngine_Vector4 } from "../../../../../../../../../ValueType/Vector4/class"
import { UnityEngine_Material_Impl as UnityEngine_Material } from "../../../../../../../../Material/class"
import { UnityEngine_Rect as UnityEngine_Rect } from "../../../../../../../../../ValueType/Rect/class"
import { UnityEngine_Canvas_Impl as UnityEngine_Canvas } from "../../../../../../Canvas/class"
import { TMPro_TMP_Text_Impl } from "../class"

type System_Int32 = number
type System_Boolean = boolean
type System_Single = number
type System_Void = void
type System_String = string

type UnityEngine_Vector3_array = NativePointer
type TMPro_TMP_VertexDataUpdateFlags = NativePointer
type TMPro_TMP_TextInfo = NativePointer
type UnityEngine_Material_array = NativePointer
type TMPro_TMP_SubMeshUI_array = NativePointer
type UnityEngine_CanvasRenderer = NativePointer
type UnityEngine_Bounds = NativePointer
type UnityEngine_UI_CanvasUpdate = NativePointer
type System_Collections_IEnumerator = NativePointer
type Unity_Profiling_ProfilerMarker = NativePointer

class TMPro_TextMeshProUGUI_Impl extends TMPro_TMP_Text_Impl {

    m_isRebuildingLayout: System_Boolean = lfv(this.handle, "m_isRebuildingLayout") as unknown as System_Boolean
    m_DelayedGraphicRebuild: UnityEngine_Coroutine = lfv(this.handle, "m_DelayedGraphicRebuild") as unknown as UnityEngine_Coroutine
    m_DelayedMaterialRebuild: UnityEngine_Coroutine = lfv(this.handle, "m_DelayedMaterialRebuild") as unknown as UnityEngine_Coroutine
    m_ClipRect: UnityEngine_Rect = lfv(this.handle, "m_ClipRect") as unknown as UnityEngine_Rect
    m_ValidRect: System_Boolean = lfv(this.handle, "m_ValidRect") as unknown as System_Boolean
    // OnPreRenderText: System_Action<TMPro.TMP_TextInfo> = lfv(this.handle, "OnPreRenderText") as unknown as System_Action<TMPro.TMP_TextInfo>
    m_hasFontAssetChanged: System_Boolean = lfv(this.handle, "m_hasFontAssetChanged") as unknown as System_Boolean
    m_subTextObjects: TMPro_TMP_SubMeshUI_array = lfv(this.handle, "m_subTextObjects") as unknown as TMPro_TMP_SubMeshUI_array
    m_previousLossyScaleY: System_Single = lfv(this.handle, "m_previousLossyScaleY") as unknown as System_Single
    m_RectTransformCorners: UnityEngine_Vector3_array = lfv(this.handle, "m_RectTransformCorners") as unknown as UnityEngine_Vector3_array
    m_canvasRenderer: UnityEngine_CanvasRenderer = lfv(this.handle, "m_canvasRenderer") as unknown as UnityEngine_CanvasRenderer
    m_canvas: UnityEngine_Canvas = lfv(this.handle, "m_canvas") as unknown as UnityEngine_Canvas
    m_CanvasScaleFactor: System_Single = lfv(this.handle, "m_CanvasScaleFactor") as unknown as System_Single
    m_isFirstAllocation: System_Boolean = lfv(this.handle, "m_isFirstAllocation") as unknown as System_Boolean
    m_max_characters: System_Int32 = lfv(this.handle, "m_max_characters") as unknown as System_Int32
    m_baseMaterial: UnityEngine_Material = lfv(this.handle, "m_baseMaterial") as unknown as UnityEngine_Material
    m_isScrollRegionSet: System_Boolean = lfv(this.handle, "m_isScrollRegionSet") as unknown as System_Boolean
    m_maskOffset: UnityEngine_Vector4 = lfv(this.handle, "m_maskOffset") as unknown as UnityEngine_Vector4
    m_EnvMapMatrix: UnityEngine_Matrix4x4 = lfv(this.handle, "m_EnvMapMatrix") as unknown as UnityEngine_Matrix4x4
    m_isRegisteredForEvents: System_Boolean = lfv(this.handle, "m_isRegisteredForEvents") as unknown as System_Boolean
    k_GenerateTextMarker: Unity_Profiling_ProfilerMarker = lfv(this.handle, "k_GenerateTextMarker") as unknown as Unity_Profiling_ProfilerMarker
    k_SetArraySizesMarker: Unity_Profiling_ProfilerMarker = lfv(this.handle, "k_SetArraySizesMarker") as unknown as Unity_Profiling_ProfilerMarker
    k_GenerateTextPhaseIMarker: Unity_Profiling_ProfilerMarker = lfv(this.handle, "k_GenerateTextPhaseIMarker") as unknown as Unity_Profiling_ProfilerMarker
    k_ParseMarkupTextMarker: Unity_Profiling_ProfilerMarker = lfv(this.handle, "k_ParseMarkupTextMarker") as unknown as Unity_Profiling_ProfilerMarker
    k_CharacterLookupMarker: Unity_Profiling_ProfilerMarker = lfv(this.handle, "k_CharacterLookupMarker") as unknown as Unity_Profiling_ProfilerMarker
    k_HandleGPOSFeaturesMarker: Unity_Profiling_ProfilerMarker = lfv(this.handle, "k_HandleGPOSFeaturesMarker") as unknown as Unity_Profiling_ProfilerMarker
    k_CalculateVerticesPositionMarker: Unity_Profiling_ProfilerMarker = lfv(this.handle, "k_CalculateVerticesPositionMarker") as unknown as Unity_Profiling_ProfilerMarker
    k_ComputeTextMetricsMarker: Unity_Profiling_ProfilerMarker = lfv(this.handle, "k_ComputeTextMetricsMarker") as unknown as Unity_Profiling_ProfilerMarker
    k_HandleVisibleCharacterMarker: Unity_Profiling_ProfilerMarker = lfv(this.handle, "k_HandleVisibleCharacterMarker") as unknown as Unity_Profiling_ProfilerMarker
    k_HandleWhiteSpacesMarker: Unity_Profiling_ProfilerMarker = lfv(this.handle, "k_HandleWhiteSpacesMarker") as unknown as Unity_Profiling_ProfilerMarker
    k_HandleHorizontalLineBreakingMarker: Unity_Profiling_ProfilerMarker = lfv(this.handle, "k_HandleHorizontalLineBreakingMarker") as unknown as Unity_Profiling_ProfilerMarker
    k_HandleVerticalLineBreakingMarker: Unity_Profiling_ProfilerMarker = lfv(this.handle, "k_HandleVerticalLineBreakingMarker") as unknown as Unity_Profiling_ProfilerMarker
    k_SaveGlyphVertexDataMarker: Unity_Profiling_ProfilerMarker = lfv(this.handle, "k_SaveGlyphVertexDataMarker") as unknown as Unity_Profiling_ProfilerMarker
    k_ComputeCharacterAdvanceMarker: Unity_Profiling_ProfilerMarker = lfv(this.handle, "k_ComputeCharacterAdvanceMarker") as unknown as Unity_Profiling_ProfilerMarker
    k_HandleCarriageReturnMarker: Unity_Profiling_ProfilerMarker = lfv(this.handle, "k_HandleCarriageReturnMarker") as unknown as Unity_Profiling_ProfilerMarker
    k_HandleLineTerminationMarker: Unity_Profiling_ProfilerMarker = lfv(this.handle, "k_HandleLineTerminationMarker") as unknown as Unity_Profiling_ProfilerMarker
    k_SavePageInfoMarker: Unity_Profiling_ProfilerMarker = lfv(this.handle, "k_SavePageInfoMarker") as unknown as Unity_Profiling_ProfilerMarker
    k_SaveProcessingStatesMarker: Unity_Profiling_ProfilerMarker = lfv(this.handle, "k_SaveProcessingStatesMarker") as unknown as Unity_Profiling_ProfilerMarker
    k_GenerateTextPhaseIIMarker: Unity_Profiling_ProfilerMarker = lfv(this.handle, "k_GenerateTextPhaseIIMarker") as unknown as Unity_Profiling_ProfilerMarker
    k_GenerateTextPhaseIIIMarker: Unity_Profiling_ProfilerMarker = lfv(this.handle, "k_GenerateTextPhaseIIIMarker") as unknown as Unity_Profiling_ProfilerMarker

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }
    get_materialForRendering(): UnityEngine_Material {
        return Il2Cpp.Api.TextMeshProUGUI._get_materialForRendering(this.handle)
    }

    get_autoSizeTextContainer(): System_Boolean {
        return Il2Cpp.Api.TextMeshProUGUI._get_autoSizeTextContainer(this.handle)
    }

    set_autoSizeTextContainer(value: System_Boolean): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._set_autoSizeTextContainer(this.handle, value)
    }

    get_mesh(): UnityEngine_MeshRenderer {
        return Il2Cpp.Api.TextMeshProUGUI._get_mesh(this.handle)
    }

    get_canvasRenderer(): UnityEngine_CanvasRenderer {
        return Il2Cpp.Api.TextMeshProUGUI._get_canvasRenderer(this.handle)
    }

    CalculateLayoutInputHorizontal(): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._CalculateLayoutInputHorizontal(this.handle)
    }

    CalculateLayoutInputVertical(): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._CalculateLayoutInputVertical(this.handle)
    }

    SetVerticesDirty(): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._SetVerticesDirty(this.handle)
    }

    SetLayoutDirty(): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._SetLayoutDirty(this.handle)
    }

    SetMaterialDirty(): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._SetMaterialDirty(this.handle)
    }

    SetAllDirty(): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._SetAllDirty(this.handle)
    }

    DelayedGraphicRebuild(): System_Collections_IEnumerator {
        return Il2Cpp.Api.TextMeshProUGUI._DelayedGraphicRebuild(this.handle)
    }

    DelayedMaterialRebuild(): System_Collections_IEnumerator {
        return Il2Cpp.Api.TextMeshProUGUI._DelayedMaterialRebuild(this.handle)
    }

    Rebuild(update: UnityEngine_UI_CanvasUpdate): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._Rebuild(this.handle, update)
    }

    UpdateSubObjectPivot(): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._UpdateSubObjectPivot(this.handle)
    }

    GetModifiedMaterial(baseMaterial: UnityEngine_Material): UnityEngine_Material {
        return Il2Cpp.Api.TextMeshProUGUI._GetModifiedMaterial(this.handle, baseMaterial)
    }

    UpdateMaterial(): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._UpdateMaterial(this.handle)
    }

    get_maskOffset(): UnityEngine_Vector4 {
        return Il2Cpp.Api.TextMeshProUGUI._get_maskOffset(this.handle)
    }

    set_maskOffset(value: UnityEngine_Vector4): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._set_maskOffset(this.handle, value)
    }

    RecalculateClipping(): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._RecalculateClipping(this.handle)
    }

    Cull(clipRect: UnityEngine_Rect, validRect: System_Boolean): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._Cull(this.handle, clipRect, validRect)
    }

    UpdateCulling(): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._UpdateCulling(this.handle)
    }

    UpdateMeshPadding(): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._UpdateMeshPadding(this.handle)
    }

    // InternalCrossFadeColor(targetColor: UnityEngine_Color, duration: System_Single, ignoreTimeScale: System_Boolean, useAlpha: System_Boolean): System_Void {
    //     return Il2Cpp.Api.TextMeshProUGUI._InternalCrossFadeColor(this.handle, targetColor, duration, ignoreTimeScale, useAlpha)
    // }

    // InternalCrossFadeAlpha(alpha: System_Single, duration: System_Single, ignoreTimeScale: System_Boolean): System_Void {
    //     return Il2Cpp.Api.TextMeshProUGUI._InternalCrossFadeAlpha(this.handle, alpha, duration, ignoreTimeScale)
    // }

    // ForceMeshUpdate(ignoreActiveState: System_Boolean, forceTextReparsing: System_Boolean): System_Void {
    //     return Il2Cpp.Api.TextMeshProUGUI._ForceMeshUpdate(this.handle, ignoreActiveState, forceTextReparsing)
    // }

    GetTextInfo(text: System_String): TMPro_TMP_TextInfo {
        return Il2Cpp.Api.TextMeshProUGUI._GetTextInfo(this.handle, text)
    }

    ClearMesh(): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._ClearMesh(this.handle)
    }

    // add_OnPreRenderText(value: System_Action<TMPro.TMP_TextInfo>): System_Void {
    //     return Il2Cpp.Api.TextMeshProUGUI._add_OnPreRenderText(this.handle, value)
    // }

    // remove_OnPreRenderText(value: System_Action<TMPro.TMP_TextInfo>): System_Void {
    //     return Il2Cpp.Api.TextMeshProUGUI._remove_OnPreRenderText(this.handle, value)
    // }

    // UpdateGeometry(mesh: UnityEngine_Mesh, index: System_Int32): System_Void {
    //     return Il2Cpp.Api.TextMeshProUGUI._UpdateGeometry(this.handle, mesh, index)
    // }

    UpdateVertexData(flags: TMPro_TMP_VertexDataUpdateFlags): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._UpdateVertexData(this.handle, flags)
    }

    UpdateVertexData_0(): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._UpdateVertexData(this.handle)
    }

    UpdateFontAsset(): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._UpdateFontAsset(this.handle)
    }

    Awake(): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._Awake(this.handle)
    }

    OnEnable(): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._OnEnable(this.handle)
    }

    OnDisable(): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._OnDisable(this.handle)
    }

    OnDestroy(): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._OnDestroy(this.handle)
    }

    LoadFontAsset(): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._LoadFontAsset(this.handle)
    }

    GetCanvas(): UnityEngine_Canvas {
        return Il2Cpp.Api.TextMeshProUGUI._GetCanvas(this.handle)
    }

    UpdateEnvMapMatrix(): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._UpdateEnvMapMatrix(this.handle)
    }

    EnableMasking(): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._EnableMasking(this.handle)
    }

    DisableMasking(): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._DisableMasking(this.handle)
    }

    UpdateMask(): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._UpdateMask(this.handle)
    }

    GetMaterial(mat: UnityEngine_Material): UnityEngine_Material {
        return Il2Cpp.Api.TextMeshProUGUI._GetMaterial(this.handle, mat)
    }

    GetMaterials(mats: UnityEngine_Material_array): UnityEngine_Material_array {
        return Il2Cpp.Api.TextMeshProUGUI._GetMaterials(this.handle, mats)
    }

    SetSharedMaterial(mat: UnityEngine_Material): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._SetSharedMaterial(this.handle, mat)
    }

    GetSharedMaterials(): UnityEngine_Material_array {
        return Il2Cpp.Api.TextMeshProUGUI._GetSharedMaterials(this.handle)
    }

    SetSharedMaterials(materials: UnityEngine_Material_array): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._SetSharedMaterials(this.handle, materials)
    }

    SetOutlineThickness(thickness: System_Single): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._SetOutlineThickness(this.handle, thickness)
    }

    SetFaceColor(color: UnityEngine_Color32): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._SetFaceColor(this.handle, color)
    }

    SetOutlineColor(color: UnityEngine_Color32): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._SetOutlineColor(this.handle, color)
    }

    SetShaderDepth(): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._SetShaderDepth(this.handle)
    }

    SetCulling(): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._SetCulling(this.handle)
    }

    SetPerspectiveCorrection(): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._SetPerspectiveCorrection(this.handle)
    }

    SetMeshArrays(size: System_Int32): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._SetMeshArrays(this.handle, size)
    }

    // SetArraySizes(unicodeChars: TMPro_TMP_Text.UnicodeChar_array): System_Int32 {
    //     return Il2Cpp.Api.TextMeshProUGUI._SetArraySizes(this.handle, unicodeChars)
    // }

    ComputeMarginSize(): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._ComputeMarginSize(this.handle)
    }

    OnDidApplyAnimationProperties(): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._OnDidApplyAnimationProperties(this.handle)
    }

    OnCanvasHierarchyChanged(): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._OnCanvasHierarchyChanged(this.handle)
    }

    OnTransformParentChanged(): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._OnTransformParentChanged(this.handle)
    }

    OnRectTransformDimensionsChange(): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._OnRectTransformDimensionsChange(this.handle)
    }

    InternalUpdate(): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._InternalUpdate(this.handle)
    }

    OnPreRenderCanvas(): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._OnPreRenderCanvas(this.handle)
    }

    GenerateTextMesh(): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._GenerateTextMesh(this.handle)
    }

    GetTextContainerLocalCorners_0(): UnityEngine_Vector3_array {
        return Il2Cpp.Api.TextMeshProUGUI._GetTextContainerLocalCorners(this.handle)
    }

    SetActiveSubMeshes(state: System_Boolean): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._SetActiveSubMeshes(this.handle, state)
    }

    DestroySubMeshObjects(): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._DestroySubMeshObjects(this.handle)
    }

    GetCompoundBounds(): UnityEngine_Bounds {
        return Il2Cpp.Api.TextMeshProUGUI._GetCompoundBounds(this.handle)
    }

    GetCanvasSpaceClippingRect(): UnityEngine_Rect {
        return Il2Cpp.Api.TextMeshProUGUI._GetCanvasSpaceClippingRect(this.handle)
    }

    UpdateSDFScale(scaleDelta: System_Single): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI._UpdateSDFScale(this.handle, scaleDelta)
    }

    _ctor(): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI.__ctor(this.handle)
    }

    static _cctor(): System_Void {
        return Il2Cpp.Api.TextMeshProUGUI.__cctor()
    }

}

Il2Cpp.UI_TextMeshProUGUI = TMPro_TextMeshProUGUI_Impl

declare global {
    namespace Il2Cpp {
        class UI_TextMeshProUGUI extends TMPro_TextMeshProUGUI_Impl { }
    }
}

export { TMPro_TextMeshProUGUI_Impl }