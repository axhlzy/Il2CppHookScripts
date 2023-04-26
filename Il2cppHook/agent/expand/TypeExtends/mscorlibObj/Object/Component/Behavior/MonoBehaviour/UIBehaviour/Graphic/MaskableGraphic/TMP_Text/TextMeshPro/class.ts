import { UnityEngine_Color32_Impl as UnityEngine_Color32 } from "../../../../../../../../../ValueType/Color32/class"
import { UnityEngine_Matrix4x4_Impl as UnityEngine_Matrix4x4 } from "../../../../../../../../../ValueType/Matrix4x4/class"
import { UnityEngine_Vector4_Impl as UnityEngine_Vector4 } from "../../../../../../../../../ValueType/Vector4/class"
import { UnityEngine_Material_Impl as UnityEngine_Material } from "../../../../../../../../Material/class"
import { UnityEngine_Renderer_Impl as UnityEngine_Renderer } from "../../../../../../../Renderer/class"
import { UnityEngine_Transform_Impl as Transform } from "../../../../../../../Transform/class"
import { TMPro_TMP_Text_Impl } from "../class"

type System_Int32 = number
type System_Boolean = boolean
type System_Single = number
type System_Void = void
type System_String = string

type UnityEngine_MeshFilter = NativePointer
type TMPro_TMP_SubMesh_array = NativePointer
type TMPro_MaskingTypes = NativePointer
type UnityEngine_Vector3_array = NativePointer
type TMPro_TextContainer = NativePointer
type Unity_Profiling_ProfilerMarker = NativePointer
type UnityEngine_UI_CanvasUpdate = NativePointer
type TMPro_TMP_VertexDataUpdateFlags = NativePointer
type TMPro_TMP_TextInfo = NativePointer
type UnityEngine_Material_array = NativePointer
type UnityEngine_Bounds = NativePointer
type TMPro_TMP_Text_UnicodeChar_array = NativePointer

class TMPro_TextMeshPro_Impl extends TMPro_TMP_Text_Impl {

    _SortingLayer: System_Int32 = lfv(this.handle, "_SortingLayer") as unknown as System_Int32
    _SortingLayerID: System_Int32 = lfv(this.handle, "_SortingLayerID") as unknown as System_Int32
    _SortingOrder: System_Int32 = lfv(this.handle, "_SortingOrder") as unknown as System_Int32
    // OnPreRenderText: System_Action<TMPro.TMP_TextInfo> = lfv(this.handle, "OnPreRenderText") as unknown as System_Action<TMPro.TMP_TextInfo>
    m_currentAutoSizeMode: System_Boolean = lfv(this.handle, "m_currentAutoSizeMode") as unknown as System_Boolean
    m_hasFontAssetChanged: System_Boolean = lfv(this.handle, "m_hasFontAssetChanged") as unknown as System_Boolean
    m_previousLossyScaleY: System_Single = lfv(this.handle, "m_previousLossyScaleY") as unknown as System_Single
    m_renderer: UnityEngine_Renderer = lfv(this.handle, "m_renderer") as unknown as UnityEngine_Renderer
    m_meshFilter: UnityEngine_MeshFilter = lfv(this.handle, "m_meshFilter") as unknown as UnityEngine_MeshFilter
    m_isFirstAllocation: System_Boolean = lfv(this.handle, "m_isFirstAllocation") as unknown as System_Boolean
    m_max_characters: System_Int32 = lfv(this.handle, "m_max_characters") as unknown as System_Int32
    m_max_numberOfLines: System_Int32 = lfv(this.handle, "m_max_numberOfLines") as unknown as System_Int32
    m_subTextObjects: TMPro_TMP_SubMesh_array = lfv(this.handle, "m_subTextObjects") as unknown as TMPro_TMP_SubMesh_array
    m_maskType: TMPro_MaskingTypes = lfv(this.handle, "m_maskType") as unknown as TMPro_MaskingTypes
    m_EnvMapMatrix: UnityEngine_Matrix4x4 = lfv(this.handle, "m_EnvMapMatrix") as unknown as UnityEngine_Matrix4x4
    m_RectTransformCorners: UnityEngine_Vector3_array = lfv(this.handle, "m_RectTransformCorners") as unknown as UnityEngine_Vector3_array
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
    get_sortingLayerID(): System_Int32 {
        return Il2Cpp.Api.TextMeshPro._get_sortingLayerID(this.handle)
    }

    set_sortingLayerID(value: System_Int32): System_Void {
        return Il2Cpp.Api.TextMeshPro._set_sortingLayerID(this.handle, value)
    }

    get_sortingOrder(): System_Int32 {
        return Il2Cpp.Api.TextMeshPro._get_sortingOrder(this.handle)
    }

    set_sortingOrder(value: System_Int32): System_Void {
        return Il2Cpp.Api.TextMeshPro._set_sortingOrder(this.handle, value)
    }

    get_autoSizeTextContainer(): System_Boolean {
        return Il2Cpp.Api.TextMeshPro._get_autoSizeTextContainer(this.handle)
    }

    set_autoSizeTextContainer(value: System_Boolean): System_Void {
        return Il2Cpp.Api.TextMeshPro._set_autoSizeTextContainer(this.handle, value)
    }

    get_textContainer(): TMPro_TextContainer {
        return Il2Cpp.Api.TextMeshPro._get_textContainer(this.handle)
    }

    get_transform(): Transform {
        return Il2Cpp.Api.TextMeshPro._get_transform(this.handle)
    }

    get_renderer(): UnityEngine_Renderer {
        return Il2Cpp.Api.TextMeshPro._get_renderer(this.handle)
    }

    // get_mesh(): UnityEngine_MeshRenderer {
    //         return Il2Cpp.Api.TextMeshPro._get_mesh(this.handle)
    // }

    get_meshFilter(): UnityEngine_MeshFilter {
        return Il2Cpp.Api.TextMeshPro._get_meshFilter(this.handle)
    }

    get_maskType(): TMPro_MaskingTypes {
        return Il2Cpp.Api.TextMeshPro._get_maskType(this.handle)
    }

    set_maskType(value: TMPro_MaskingTypes): System_Void {
        return Il2Cpp.Api.TextMeshPro._set_maskType(this.handle, value)
    }

    SetMask(type: TMPro_MaskingTypes, maskCoords: UnityEngine_Vector4): System_Void {
        return Il2Cpp.Api.TextMeshPro._SetMask(this.handle, type, maskCoords)
    }

    SetMask_4(type: TMPro_MaskingTypes, maskCoords: UnityEngine_Vector4, softnessX: System_Single, softnessY: System_Single): System_Void {
        return Il2Cpp.Api.TextMeshPro._SetMask(this.handle, type, maskCoords, softnessX, softnessY)
    }

    SetVerticesDirty(): System_Void {
        return Il2Cpp.Api.TextMeshPro._SetVerticesDirty(this.handle)
    }

    SetLayoutDirty(): System_Void {
        return Il2Cpp.Api.TextMeshPro._SetLayoutDirty(this.handle)
    }

    SetMaterialDirty(): System_Void {
        return Il2Cpp.Api.TextMeshPro._SetMaterialDirty(this.handle)
    }

    SetAllDirty(): System_Void {
        return Il2Cpp.Api.TextMeshPro._SetAllDirty(this.handle)
    }

    Rebuild(update: UnityEngine_UI_CanvasUpdate): System_Void {
        return Il2Cpp.Api.TextMeshPro._Rebuild(this.handle, update)
    }

    UpdateMaterial(): System_Void {
        return Il2Cpp.Api.TextMeshPro._UpdateMaterial(this.handle)
    }

    UpdateMeshPadding(): System_Void {
        return Il2Cpp.Api.TextMeshPro._UpdateMeshPadding(this.handle)
    }

    // ForceMeshUpdate(ignoreActiveState:System_Boolean, forceTextReparsing:System_Boolean): System_Void {
    //         return Il2Cpp.Api.TextMeshPro._ForceMeshUpdate(this.handle , ignoreActiveState, forceTextReparsing)
    // }

    GetTextInfo(text: System_String): TMPro_TMP_TextInfo {
        return Il2Cpp.Api.TextMeshPro._GetTextInfo(this.handle, text)
    }

    // ClearMesh(updateMesh:System_Boolean): System_Void {
    //         return Il2Cpp.Api.TextMeshPro._ClearMesh(this.handle , updateMesh)
    // }

    // add_OnPreRenderText(value:System_Action<TMPro.TMP_TextInfo>): System_Void {
    //         return Il2Cpp.Api.TextMeshPro._add_OnPreRenderText(this.handle , value)
    // }

    // remove_OnPreRenderText(value:System_Action<TMPro.TMP_TextInfo>): System_Void {
    //         return Il2Cpp.Api.TextMeshPro._remove_OnPreRenderText(this.handle , value)
    // }

    // UpdateGeometry(mesh:UnityEngine_Mesh, index:System_Int32): System_Void {
    //         return Il2Cpp.Api.TextMeshPro._UpdateGeometry(this.handle , mesh, index)
    // }

    UpdateVertexData(flags: TMPro_TMP_VertexDataUpdateFlags): System_Void {
        return Il2Cpp.Api.TextMeshPro._UpdateVertexData(this.handle, flags)
    }

    UpdateVertexData_0(): System_Void {
        return Il2Cpp.Api.TextMeshPro._UpdateVertexData(this.handle)
    }

    UpdateFontAsset(): System_Void {
        return Il2Cpp.Api.TextMeshPro._UpdateFontAsset(this.handle)
    }

    CalculateLayoutInputHorizontal(): System_Void {
        return Il2Cpp.Api.TextMeshPro._CalculateLayoutInputHorizontal(this.handle)
    }

    CalculateLayoutInputVertical(): System_Void {
        return Il2Cpp.Api.TextMeshPro._CalculateLayoutInputVertical(this.handle)
    }

    Awake(): System_Void {
        return Il2Cpp.Api.TextMeshPro._Awake(this.handle)
    }

    OnEnable(): System_Void {
        return Il2Cpp.Api.TextMeshPro._OnEnable(this.handle)
    }

    OnDisable(): System_Void {
        return Il2Cpp.Api.TextMeshPro._OnDisable(this.handle)
    }

    OnDestroy(): System_Void {
        return Il2Cpp.Api.TextMeshPro._OnDestroy(this.handle)
    }

    LoadFontAsset(): System_Void {
        return Il2Cpp.Api.TextMeshPro._LoadFontAsset(this.handle)
    }

    UpdateEnvMapMatrix(): System_Void {
        return Il2Cpp.Api.TextMeshPro._UpdateEnvMapMatrix(this.handle)
    }

    SetMask_1(maskType: TMPro_MaskingTypes): System_Void {
        return Il2Cpp.Api.TextMeshPro._SetMask(this.handle, maskType)
    }

    SetMaskCoordinates(coords: UnityEngine_Vector4): System_Void {
        return Il2Cpp.Api.TextMeshPro._SetMaskCoordinates(this.handle, coords)
    }

    SetMaskCoordinates_3(coords: UnityEngine_Vector4, softX: System_Single, softY: System_Single): System_Void {
        return Il2Cpp.Api.TextMeshPro._SetMaskCoordinates(this.handle, coords, softX, softY)
    }

    EnableMasking(): System_Void {
        return Il2Cpp.Api.TextMeshPro._EnableMasking(this.handle)
    }

    DisableMasking(): System_Void {
        return Il2Cpp.Api.TextMeshPro._DisableMasking(this.handle)
    }

    UpdateMask(): System_Void {
        return Il2Cpp.Api.TextMeshPro._UpdateMask(this.handle)
    }

    GetMaterial_mat(mat: UnityEngine_Material): UnityEngine_Material {
        return Il2Cpp.Api.TextMeshPro._GetMaterial(this.handle, mat)
    }

    GetMaterials_mat_array(mats: UnityEngine_Material_array): UnityEngine_Material_array {
        return Il2Cpp.Api.TextMeshPro._GetMaterials(this.handle, mats)
    }

    SetSharedMaterial(mat: UnityEngine_Material): System_Void {
        return Il2Cpp.Api.TextMeshPro._SetSharedMaterial(this.handle, mat)
    }

    GetSharedMaterials_0(): UnityEngine_Material_array {
        return Il2Cpp.Api.TextMeshPro._GetSharedMaterials(this.handle)
    }

    SetSharedMaterials_materials(materials: UnityEngine_Material_array): System_Void {
        return Il2Cpp.Api.TextMeshPro._SetSharedMaterials(this.handle, materials)
    }

    SetOutlineThickness(thickness: System_Single): System_Void {
        return Il2Cpp.Api.TextMeshPro._SetOutlineThickness(this.handle, thickness)
    }

    SetFaceColor(color: UnityEngine_Color32): System_Void {
        return Il2Cpp.Api.TextMeshPro._SetFaceColor(this.handle, color)
    }

    SetOutlineColor(color: UnityEngine_Color32): System_Void {
        return Il2Cpp.Api.TextMeshPro._SetOutlineColor(this.handle, color)
    }

    CreateMaterialInstance_0(): System_Void {
        return Il2Cpp.Api.TextMeshPro._CreateMaterialInstance(this.handle)
    }

    SetShaderDepth(): System_Void {
        return Il2Cpp.Api.TextMeshPro._SetShaderDepth(this.handle)
    }

    SetCulling(): System_Void {
        return Il2Cpp.Api.TextMeshPro._SetCulling(this.handle)
    }

    SetPerspectiveCorrection(): System_Void {
        return Il2Cpp.Api.TextMeshPro._SetPerspectiveCorrection(this.handle)
    }

    SetArraySizes_unicodeChars(unicodeChars: TMPro_TMP_Text_UnicodeChar_array): System_Int32 {
        return Il2Cpp.Api.TextMeshPro._SetArraySizes(this.handle, unicodeChars)
    }

    ComputeMarginSize(): System_Void {
        return Il2Cpp.Api.TextMeshPro._ComputeMarginSize(this.handle)
    }

    OnDidApplyAnimationProperties(): System_Void {
        return Il2Cpp.Api.TextMeshPro._OnDidApplyAnimationProperties(this.handle)
    }

    OnTransformParentChanged(): System_Void {
        return Il2Cpp.Api.TextMeshPro._OnTransformParentChanged(this.handle)
    }

    OnRectTransformDimensionsChange(): System_Void {
        return Il2Cpp.Api.TextMeshPro._OnRectTransformDimensionsChange(this.handle)
    }

    InternalUpdate(): System_Void {
        return Il2Cpp.Api.TextMeshPro._InternalUpdate(this.handle)
    }

    OnPreRenderObject(): System_Void {
        return Il2Cpp.Api.TextMeshPro._OnPreRenderObject(this.handle)
    }

    GenerateTextMesh(): System_Void {
        return Il2Cpp.Api.TextMeshPro._GenerateTextMesh(this.handle)
    }

    GetTextContainerLocalCorners_0(): UnityEngine_Vector3_array {
        return Il2Cpp.Api.TextMeshPro._GetTextContainerLocalCorners(this.handle)
    }

    SetMeshFilters(state: System_Boolean): System_Void {
        return Il2Cpp.Api.TextMeshPro._SetMeshFilters(this.handle, state)
    }

    SetActiveSubMeshes(state: System_Boolean): System_Void {
        return Il2Cpp.Api.TextMeshPro._SetActiveSubMeshes(this.handle, state)
    }

    SetActiveSubTextObjectRenderers(state: System_Boolean): System_Void {
        return Il2Cpp.Api.TextMeshPro._SetActiveSubTextObjectRenderers(this.handle, state)
    }

    DestroySubMeshObjects(): System_Void {
        return Il2Cpp.Api.TextMeshPro._DestroySubMeshObjects(this.handle)
    }

    UpdateSubMeshSortingLayerID(id: System_Int32): System_Void {
        return Il2Cpp.Api.TextMeshPro._UpdateSubMeshSortingLayerID(this.handle, id)
    }

    UpdateSubMeshSortingOrder(order: System_Int32): System_Void {
        return Il2Cpp.Api.TextMeshPro._UpdateSubMeshSortingOrder(this.handle, order)
    }

    GetCompoundBounds(): UnityEngine_Bounds {
        return Il2Cpp.Api.TextMeshPro._GetCompoundBounds(this.handle)
    }

    UpdateSDFScale(scaleDelta: System_Single): System_Void {
        return Il2Cpp.Api.TextMeshPro._UpdateSDFScale(this.handle, scaleDelta)
    }

    _ctor(): System_Void {
        return Il2Cpp.Api.TextMeshPro.__ctor(this.handle)
    }

    static _cctor(): System_Void {
        return Il2Cpp.Api.TextMeshPro.__cctor()
    }

}

Il2Cpp.UI_TextMeshPro = TMPro_TextMeshPro_Impl

declare global {
    namespace Il2Cpp {
        class UI_TextMeshPro extends TMPro_TextMeshPro_Impl { }
    }
}

export { TMPro_TextMeshPro_Impl }