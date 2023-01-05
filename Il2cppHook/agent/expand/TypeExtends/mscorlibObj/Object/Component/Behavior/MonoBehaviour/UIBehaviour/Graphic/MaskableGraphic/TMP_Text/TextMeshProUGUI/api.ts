import { cache } from "decorator-cache-getter"

class TMPro_TextMeshPro_API {
    // public Int32 get_sortingLayerID()
    @cache
    static get _get_sortingLayerID() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "get_sortingLayerID", 0, [], "pointer", ["pointer"])
    }

    // public Void set_sortingLayerID(Int32 value)
    @cache
    static get _set_sortingLayerID() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "set_sortingLayerID", 1, ["System.Int32"], "void", ["pointer", "pointer"])
    }

    // public Int32 get_sortingOrder()
    @cache
    static get _get_sortingOrder() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "get_sortingOrder", 0, [], "pointer", ["pointer"])
    }

    // public Void set_sortingOrder(Int32 value)
    @cache
    static get _set_sortingOrder() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "set_sortingOrder", 1, ["System.Int32"], "void", ["pointer", "pointer"])
    }

    // public override Boolean get_autoSizeTextContainer()
    @cache
    static get _get_autoSizeTextContainer() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "get_autoSizeTextContainer", 0, [], "pointer", ["pointer"])
    }

    // public override Void set_autoSizeTextContainer(Boolean value)
    @cache
    static get _set_autoSizeTextContainer() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "set_autoSizeTextContainer", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // public TextContainer get_textContainer()
    @cache
    static get _get_textContainer() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "get_textContainer", 0, [], "pointer", ["pointer"])
    }

    // public Transform get_transform()
    @cache
    static get _get_transform() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "get_transform", 0, [], "pointer", ["pointer"])
    }

    // public Renderer get_renderer()
    @cache
    static get _get_renderer() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "get_renderer", 0, [], "pointer", ["pointer"])
    }

    // public override Mesh get_mesh()
    @cache
    static get _get_mesh() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "get_mesh", 0, [], "pointer", ["pointer"])
    }

    // public MeshFilter get_meshFilter()
    @cache
    static get _get_meshFilter() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "get_meshFilter", 0, [], "pointer", ["pointer"])
    }

    // public MaskingTypes get_maskType()
    @cache
    static get _get_maskType() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "get_maskType", 0, [], "pointer", ["pointer"])
    }

    // public Void set_maskType(MaskingTypes value)
    @cache
    static get _set_maskType() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "set_maskType", 1, ["TMPro.MaskingTypes"], "void", ["pointer", "pointer"])
    }

    // public Void SetMask(MaskingTypes type,Vector4 maskCoords)
    @cache
    static get _SetMask() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "SetMask", 2, ["TMPro.MaskingTypes", "UnityEngine.Vector4"], "void", ["pointer", "pointer", "pointer"])
    }

    // public Void SetMask(MaskingTypes type,Vector4 maskCoords,Single softnessX,Single softnessY)
    @cache
    static get _SetMask_type_maskCoords_softnessX_softnessY() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "SetMask", 4, ["TMPro.MaskingTypes", "UnityEngine.Vector4", "System.Single", "System.Single"], "void", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public override Void SetVerticesDirty()
    @cache
    static get _SetVerticesDirty() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "SetVerticesDirty", 0, [], "void", ["pointer"])
    }

    // public override Void SetLayoutDirty()
    @cache
    static get _SetLayoutDirty() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "SetLayoutDirty", 0, [], "void", ["pointer"])
    }

    // public override Void SetMaterialDirty()
    @cache
    static get _SetMaterialDirty() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "SetMaterialDirty", 0, [], "void", ["pointer"])
    }

    // public override Void SetAllDirty()
    @cache
    static get _SetAllDirty() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "SetAllDirty", 0, [], "void", ["pointer"])
    }

    // public override Void Rebuild(CanvasUpdate update)
    @cache
    static get _Rebuild() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "Rebuild", 1, ["UnityEngine.UI.CanvasUpdate"], "void", ["pointer", "pointer"])
    }

    // protected override Void UpdateMaterial()
    @cache
    static get _UpdateMaterial() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "UpdateMaterial", 0, [], "void", ["pointer"])
    }

    // public override Void UpdateMeshPadding()
    @cache
    static get _UpdateMeshPadding() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "UpdateMeshPadding", 0, [], "void", ["pointer"])
    }

    // public override Void ForceMeshUpdate(Boolean ignoreActiveState,Boolean forceTextReparsing)
    @cache
    static get _ForceMeshUpdate() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "ForceMeshUpdate", 2, ["System.Boolean", "System.Boolean"], "void", ["pointer", "pointer", "pointer"])
    }

    // public override TMP_TextInfo GetTextInfo(String text)
    @cache
    static get _GetTextInfo() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "GetTextInfo", 1, ["System.String"], "pointer", ["pointer", "pointer"])
    }

    // public override Void ClearMesh(Boolean updateMesh)
    @cache
    static get _ClearMesh() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "ClearMesh", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // public override Void add_OnPreRenderText(TMP_TextInfo> value)
    @cache
    static get _add_OnPreRenderText() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "add_OnPreRenderText", 1, ["System.Action<TMPro.TMP_TextInfo>"], "void", ["pointer", "pointer"])
    }

    // public override Void remove_OnPreRenderText(TMP_TextInfo> value)
    @cache
    static get _remove_OnPreRenderText() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "remove_OnPreRenderText", 1, ["System.Action<TMPro.TMP_TextInfo>"], "void", ["pointer", "pointer"])
    }

    // public override Void UpdateGeometry(Mesh mesh,Int32 index)
    @cache
    static get _UpdateGeometry() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "UpdateGeometry", 2, ["UnityEngine.Mesh", "System.Int32"], "void", ["pointer", "pointer", "pointer"])
    }

    // public override Void UpdateVertexData(TMP_VertexDataUpdateFlags flags)
    @cache
    static get _UpdateVertexData() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "UpdateVertexData", 1, ["TMPro.TMP_VertexDataUpdateFlags"], "void", ["pointer", "pointer"])
    }

    // public override Void UpdateVertexData()
    @cache
    static get _UpdateVertexData_() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "UpdateVertexData", 0, [], "void", ["pointer"])
    }

    // public Void UpdateFontAsset()
    @cache
    static get _UpdateFontAsset() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "UpdateFontAsset", 0, [], "void", ["pointer"])
    }

    // public Void CalculateLayoutInputHorizontal()
    @cache
    static get _CalculateLayoutInputHorizontal() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "CalculateLayoutInputHorizontal", 0, [], "void", ["pointer"])
    }

    // public Void CalculateLayoutInputVertical()
    @cache
    static get _CalculateLayoutInputVertical() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "CalculateLayoutInputVertical", 0, [], "void", ["pointer"])
    }

    // protected override Void Awake()
    @cache
    static get _Awake() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "Awake", 0, [], "void", ["pointer"])
    }

    // protected override Void OnEnable()
    @cache
    static get _OnEnable() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "OnEnable", 0, [], "void", ["pointer"])
    }

    // protected override Void OnDisable()
    @cache
    static get _OnDisable() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "OnDisable", 0, [], "void", ["pointer"])
    }

    // protected override Void OnDestroy()
    @cache
    static get _OnDestroy() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "OnDestroy", 0, [], "void", ["pointer"])
    }

    // protected override Void LoadFontAsset()
    @cache
    static get _LoadFontAsset() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "LoadFontAsset", 0, [], "void", ["pointer"])
    }

    // private Void UpdateEnvMapMatrix()
    @cache
    static get _UpdateEnvMapMatrix() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "UpdateEnvMapMatrix", 0, [], "void", ["pointer"])
    }

    // private Void SetMask(MaskingTypes maskType)
    @cache
    static get _SetMask_maskType() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "SetMask", 1, ["TMPro.MaskingTypes"], "void", ["pointer", "pointer"])
    }

    // private Void SetMaskCoordinates(Vector4 coords)
    @cache
    static get _SetMaskCoordinates() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "SetMaskCoordinates", 1, ["UnityEngine.Vector4"], "void", ["pointer", "pointer"])
    }

    // private Void SetMaskCoordinates(Vector4 coords,Single softX,Single softY)
    @cache
    static get _SetMaskCoordinates_coords_softX_softY() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "SetMaskCoordinates", 3, ["UnityEngine.Vector4", "System.Single", "System.Single"], "void", ["pointer", "pointer", "pointer", "pointer"])
    }

    // private Void EnableMasking()
    @cache
    static get _EnableMasking() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "EnableMasking", 0, [], "void", ["pointer"])
    }

    // private Void DisableMasking()
    @cache
    static get _DisableMasking() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "DisableMasking", 0, [], "void", ["pointer"])
    }

    // private Void UpdateMask()
    @cache
    static get _UpdateMask() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "UpdateMask", 0, [], "void", ["pointer"])
    }

    // protected override Material GetMaterial(Material mat)
    @cache
    static get _GetMaterial() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "GetMaterial", 1, ["UnityEngine.Material"], "pointer", ["pointer", "pointer"])
    }

    // protected override Material[] GetMaterials(Material[] mats)
    @cache
    static get _GetMaterials() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "GetMaterials", 1, ["UnityEngine.Material[]"], "pointer", ["pointer", "pointer"])
    }

    // protected override Void SetSharedMaterial(Material mat)
    @cache
    static get _SetSharedMaterial() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "SetSharedMaterial", 1, ["UnityEngine.Material"], "void", ["pointer", "pointer"])
    }

    // protected override Material[] GetSharedMaterials()
    @cache
    static get _GetSharedMaterials() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "GetSharedMaterials", 0, [], "pointer", ["pointer"])
    }

    // protected override Void SetSharedMaterials(Material[] materials)
    @cache
    static get _SetSharedMaterials() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "SetSharedMaterials", 1, ["UnityEngine.Material[]"], "void", ["pointer", "pointer"])
    }

    // protected override Void SetOutlineThickness(Single thickness)
    @cache
    static get _SetOutlineThickness() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "SetOutlineThickness", 1, ["System.Single"], "void", ["pointer", "pointer"])
    }

    // protected override Void SetFaceColor(Color32 color)
    @cache
    static get _SetFaceColor() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "SetFaceColor", 1, ["UnityEngine.Color32"], "void", ["pointer", "pointer"])
    }

    // protected override Void SetOutlineColor(Color32 color)
    @cache
    static get _SetOutlineColor() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "SetOutlineColor", 1, ["UnityEngine.Color32"], "void", ["pointer", "pointer"])
    }

    // private Void CreateMaterialInstance()
    @cache
    static get _CreateMaterialInstance() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "CreateMaterialInstance", 0, [], "void", ["pointer"])
    }

    // protected override Void SetShaderDepth()
    @cache
    static get _SetShaderDepth() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "SetShaderDepth", 0, [], "void", ["pointer"])
    }

    // protected override Void SetCulling()
    @cache
    static get _SetCulling() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "SetCulling", 0, [], "void", ["pointer"])
    }

    // private Void SetPerspectiveCorrection()
    @cache
    static get _SetPerspectiveCorrection() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "SetPerspectiveCorrection", 0, [], "void", ["pointer"])
    }

    // internal override Int32 SetArraySizes(UnicodeChar[] unicodeChars)
    @cache
    static get _SetArraySizes() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "SetArraySizes", 1, ["TMPro.TMP_Text.UnicodeChar[]"], "pointer", ["pointer", "pointer"])
    }

    // public override Void ComputeMarginSize()
    @cache
    static get _ComputeMarginSize() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "ComputeMarginSize", 0, [], "void", ["pointer"])
    }

    // protected override Void OnDidApplyAnimationProperties()
    @cache
    static get _OnDidApplyAnimationProperties() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "OnDidApplyAnimationProperties", 0, [], "void", ["pointer"])
    }

    // protected override Void OnTransformParentChanged()
    @cache
    static get _OnTransformParentChanged() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "OnTransformParentChanged", 0, [], "void", ["pointer"])
    }

    // protected override Void OnRectTransformDimensionsChange()
    @cache
    static get _OnRectTransformDimensionsChange() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "OnRectTransformDimensionsChange", 0, [], "void", ["pointer"])
    }

    // internal override Void InternalUpdate()
    @cache
    static get _InternalUpdate() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "InternalUpdate", 0, [], "void", ["pointer"])
    }

    // private Void OnPreRenderObject()
    @cache
    static get _OnPreRenderObject() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "OnPreRenderObject", 0, [], "void", ["pointer"])
    }

    // protected virtual Void GenerateTextMesh()
    @cache
    static get _GenerateTextMesh() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "GenerateTextMesh", 0, [], "void", ["pointer"])
    }

    // protected override Vector3[] GetTextContainerLocalCorners()
    @cache
    static get _GetTextContainerLocalCorners() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "GetTextContainerLocalCorners", 0, [], "pointer", ["pointer"])
    }

    // private Void SetMeshFilters(Boolean state)
    @cache
    static get _SetMeshFilters() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "SetMeshFilters", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // protected override Void SetActiveSubMeshes(Boolean state)
    @cache
    static get _SetActiveSubMeshes() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "SetActiveSubMeshes", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // protected Void SetActiveSubTextObjectRenderers(Boolean state)
    @cache
    static get _SetActiveSubTextObjectRenderers() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "SetActiveSubTextObjectRenderers", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // protected override Void DestroySubMeshObjects()
    @cache
    static get _DestroySubMeshObjects() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "DestroySubMeshObjects", 0, [], "void", ["pointer"])
    }

    // internal Void UpdateSubMeshSortingLayerID(Int32 id)
    @cache
    static get _UpdateSubMeshSortingLayerID() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "UpdateSubMeshSortingLayerID", 1, ["System.Int32"], "void", ["pointer", "pointer"])
    }

    // internal Void UpdateSubMeshSortingOrder(Int32 order)
    @cache
    static get _UpdateSubMeshSortingOrder() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "UpdateSubMeshSortingOrder", 1, ["System.Int32"], "void", ["pointer", "pointer"])
    }

    // protected override Bounds GetCompoundBounds()
    @cache
    static get _GetCompoundBounds() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "GetCompoundBounds", 0, [], "pointer", ["pointer"])
    }

    // private Void UpdateSDFScale(Single scaleDelta)
    @cache
    static get _UpdateSDFScale() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", "UpdateSDFScale", 1, ["System.Single"], "void", ["pointer", "pointer"])
    }

    // public Void .ctor()
    @cache
    static get __ctor() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", ".ctor", 0, [], "void", ["pointer"])
    }

    // private static Void .cctor()
    @cache
    static get __cctor() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshPro", ".cctor", 0, [], "void", [])
    }

}

Il2Cpp.Api.TextMeshPro = TMPro_TextMeshPro_API

declare global {
    namespace Il2Cpp.Api {
        class TextMeshPro extends TMPro_TextMeshPro_API { }
    }
}

export { }