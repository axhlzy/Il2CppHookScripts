import { cache } from "decorator-cache-getter"

class TMPro_TextMeshProUGUI_API {
    // public override Material get_materialForRendering()
    @cache
    static get _get_materialForRendering() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "get_materialForRendering", 0, [], "pointer", ["pointer"])
    }

    // public override Boolean get_autoSizeTextContainer()
    @cache
    static get _get_autoSizeTextContainer() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "get_autoSizeTextContainer", 0, [], "pointer", ["pointer"])
    }

    // public override Void set_autoSizeTextContainer(Boolean value)
    @cache
    static get _set_autoSizeTextContainer() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "set_autoSizeTextContainer", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // public override Mesh get_mesh()
    @cache
    static get _get_mesh() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "get_mesh", 0, [], "pointer", ["pointer"])
    }

    // public CanvasRenderer get_canvasRenderer()
    @cache
    static get _get_canvasRenderer() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "get_canvasRenderer", 0, [], "pointer", ["pointer"])
    }

    // public Void CalculateLayoutInputHorizontal()
    @cache
    static get _CalculateLayoutInputHorizontal() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "CalculateLayoutInputHorizontal", 0, [], "void", ["pointer"])
    }

    // public Void CalculateLayoutInputVertical()
    @cache
    static get _CalculateLayoutInputVertical() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "CalculateLayoutInputVertical", 0, [], "void", ["pointer"])
    }

    // public override Void SetVerticesDirty()
    @cache
    static get _SetVerticesDirty() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "SetVerticesDirty", 0, [], "void", ["pointer"])
    }

    // public override Void SetLayoutDirty()
    @cache
    static get _SetLayoutDirty() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "SetLayoutDirty", 0, [], "void", ["pointer"])
    }

    // public override Void SetMaterialDirty()
    @cache
    static get _SetMaterialDirty() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "SetMaterialDirty", 0, [], "void", ["pointer"])
    }

    // public override Void SetAllDirty()
    @cache
    static get _SetAllDirty() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "SetAllDirty", 0, [], "void", ["pointer"])
    }

    // private IEnumerator DelayedGraphicRebuild()
    @cache
    static get _DelayedGraphicRebuild() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "DelayedGraphicRebuild", 0, [], "pointer", ["pointer"])
    }

    // private IEnumerator DelayedMaterialRebuild()
    @cache
    static get _DelayedMaterialRebuild() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "DelayedMaterialRebuild", 0, [], "pointer", ["pointer"])
    }

    // public override Void Rebuild(CanvasUpdate update)
    @cache
    static get _Rebuild() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "Rebuild", 1, ["UnityEngine.UI.CanvasUpdate"], "void", ["pointer", "pointer"])
    }

    // private Void UpdateSubObjectPivot()
    @cache
    static get _UpdateSubObjectPivot() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "UpdateSubObjectPivot", 0, [], "void", ["pointer"])
    }

    // public override Material GetModifiedMaterial(Material baseMaterial)
    @cache
    static get _GetModifiedMaterial() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "GetModifiedMaterial", 1, ["UnityEngine.Material"], "pointer", ["pointer", "pointer"])
    }

    // protected override Void UpdateMaterial()
    @cache
    static get _UpdateMaterial() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "UpdateMaterial", 0, [], "void", ["pointer"])
    }

    // public Vector4 get_maskOffset()
    @cache
    static get _get_maskOffset() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "get_maskOffset", 0, [], "pointer", ["pointer"])
    }

    // public Void set_maskOffset(Vector4 value)
    @cache
    static get _set_maskOffset() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "set_maskOffset", 1, ["UnityEngine.Vector4"], "void", ["pointer", "pointer"])
    }

    // public override Void RecalculateClipping()
    @cache
    static get _RecalculateClipping() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "RecalculateClipping", 0, [], "void", ["pointer"])
    }

    // public override Void Cull(Rect clipRect,Boolean validRect)
    @cache
    static get _Cull() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "Cull", 2, ["UnityEngine.Rect", "System.Boolean"], "void", ["pointer", "pointer", "pointer"])
    }

    // internal override Void UpdateCulling()
    @cache
    static get _UpdateCulling() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "UpdateCulling", 0, [], "void", ["pointer"])
    }

    // public override Void UpdateMeshPadding()
    @cache
    static get _UpdateMeshPadding() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "UpdateMeshPadding", 0, [], "void", ["pointer"])
    }

    // protected override Void InternalCrossFadeColor(Color targetColor,Single duration,Boolean ignoreTimeScale,Boolean useAlpha)
    @cache
    static get _InternalCrossFadeColor() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "InternalCrossFadeColor", 4, ["UnityEngine.Color", "System.Single", "System.Boolean", "System.Boolean"], "void", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // protected override Void InternalCrossFadeAlpha(Single alpha,Single duration,Boolean ignoreTimeScale)
    @cache
    static get _InternalCrossFadeAlpha() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "InternalCrossFadeAlpha", 3, ["System.Single", "System.Single", "System.Boolean"], "void", ["pointer", "pointer", "pointer", "pointer"])
    }

    // public override Void ForceMeshUpdate(Boolean ignoreActiveState,Boolean forceTextReparsing)
    @cache
    static get _ForceMeshUpdate() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "ForceMeshUpdate", 2, ["System.Boolean", "System.Boolean"], "void", ["pointer", "pointer", "pointer"])
    }

    // public override TMP_TextInfo GetTextInfo(String text)
    @cache
    static get _GetTextInfo() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "GetTextInfo", 1, ["System.String"], "pointer", ["pointer", "pointer"])
    }

    // public override Void ClearMesh()
    @cache
    static get _ClearMesh() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "ClearMesh", 0, [], "void", ["pointer"])
    }

    // public override Void add_OnPreRenderText(TMP_TextInfo> value)
    @cache
    static get _add_OnPreRenderText() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "add_OnPreRenderText", 1, ["System.Action<TMPro.TMP_TextInfo>"], "void", ["pointer", "pointer"])
    }

    // public override Void remove_OnPreRenderText(TMP_TextInfo> value)
    @cache
    static get _remove_OnPreRenderText() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "remove_OnPreRenderText", 1, ["System.Action<TMPro.TMP_TextInfo>"], "void", ["pointer", "pointer"])
    }

    // public override Void UpdateGeometry(Mesh mesh,Int32 index)
    @cache
    static get _UpdateGeometry() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "UpdateGeometry", 2, ["UnityEngine.Mesh", "System.Int32"], "void", ["pointer", "pointer", "pointer"])
    }

    // public override Void UpdateVertexData(TMP_VertexDataUpdateFlags flags)
    @cache
    static get _UpdateVertexData() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "UpdateVertexData", 1, ["TMPro.TMP_VertexDataUpdateFlags"], "void", ["pointer", "pointer"])
    }

    // public override Void UpdateVertexData()
    @cache
    static get _UpdateVertexData_() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "UpdateVertexData", 0, [], "void", ["pointer"])
    }

    // public Void UpdateFontAsset()
    @cache
    static get _UpdateFontAsset() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "UpdateFontAsset", 0, [], "void", ["pointer"])
    }

    // protected override Void Awake()
    @cache
    static get _Awake() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "Awake", 0, [], "void", ["pointer"])
    }

    // protected override Void OnEnable()
    @cache
    static get _OnEnable() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "OnEnable", 0, [], "void", ["pointer"])
    }

    // protected override Void OnDisable()
    @cache
    static get _OnDisable() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "OnDisable", 0, [], "void", ["pointer"])
    }

    // protected override Void OnDestroy()
    @cache
    static get _OnDestroy() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "OnDestroy", 0, [], "void", ["pointer"])
    }

    // protected override Void LoadFontAsset()
    @cache
    static get _LoadFontAsset() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "LoadFontAsset", 0, [], "void", ["pointer"])
    }

    // private Canvas GetCanvas()
    @cache
    static get _GetCanvas() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "GetCanvas", 0, [], "pointer", ["pointer"])
    }

    // private Void UpdateEnvMapMatrix()
    @cache
    static get _UpdateEnvMapMatrix() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "UpdateEnvMapMatrix", 0, [], "void", ["pointer"])
    }

    // private Void EnableMasking()
    @cache
    static get _EnableMasking() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "EnableMasking", 0, [], "void", ["pointer"])
    }

    // private Void DisableMasking()
    @cache
    static get _DisableMasking() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "DisableMasking", 0, [], "void", ["pointer"])
    }

    // private Void UpdateMask()
    @cache
    static get _UpdateMask() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "UpdateMask", 0, [], "void", ["pointer"])
    }

    // protected override Material GetMaterial(Material mat)
    @cache
    static get _GetMaterial() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "GetMaterial", 1, ["UnityEngine.Material"], "pointer", ["pointer", "pointer"])
    }

    // protected override Material[] GetMaterials(Material[] mats)
    @cache
    static get _GetMaterials() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "GetMaterials", 1, ["UnityEngine.Material[]"], "pointer", ["pointer", "pointer"])
    }

    // protected override Void SetSharedMaterial(Material mat)
    @cache
    static get _SetSharedMaterial() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "SetSharedMaterial", 1, ["UnityEngine.Material"], "void", ["pointer", "pointer"])
    }

    // protected override Material[] GetSharedMaterials()
    @cache
    static get _GetSharedMaterials() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "GetSharedMaterials", 0, [], "pointer", ["pointer"])
    }

    // protected override Void SetSharedMaterials(Material[] materials)
    @cache
    static get _SetSharedMaterials() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "SetSharedMaterials", 1, ["UnityEngine.Material[]"], "void", ["pointer", "pointer"])
    }

    // protected override Void SetOutlineThickness(Single thickness)
    @cache
    static get _SetOutlineThickness() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "SetOutlineThickness", 1, ["System.Single"], "void", ["pointer", "pointer"])
    }

    // protected override Void SetFaceColor(Color32 color)
    @cache
    static get _SetFaceColor() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "SetFaceColor", 1, ["UnityEngine.Color32"], "void", ["pointer", "pointer"])
    }

    // protected override Void SetOutlineColor(Color32 color)
    @cache
    static get _SetOutlineColor() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "SetOutlineColor", 1, ["UnityEngine.Color32"], "void", ["pointer", "pointer"])
    }

    // protected override Void SetShaderDepth()
    @cache
    static get _SetShaderDepth() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "SetShaderDepth", 0, [], "void", ["pointer"])
    }

    // protected override Void SetCulling()
    @cache
    static get _SetCulling() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "SetCulling", 0, [], "void", ["pointer"])
    }

    // private Void SetPerspectiveCorrection()
    @cache
    static get _SetPerspectiveCorrection() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "SetPerspectiveCorrection", 0, [], "void", ["pointer"])
    }

    // private Void SetMeshArrays(Int32 size)
    @cache
    static get _SetMeshArrays() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "SetMeshArrays", 1, ["System.Int32"], "void", ["pointer", "pointer"])
    }

    // internal override Int32 SetArraySizes(UnicodeChar[] unicodeChars)
    @cache
    static get _SetArraySizes() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "SetArraySizes", 1, ["TMPro.TMP_Text.UnicodeChar[]"], "pointer", ["pointer", "pointer"])
    }

    // public override Void ComputeMarginSize()
    @cache
    static get _ComputeMarginSize() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "ComputeMarginSize", 0, [], "void", ["pointer"])
    }

    // protected override Void OnDidApplyAnimationProperties()
    @cache
    static get _OnDidApplyAnimationProperties() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "OnDidApplyAnimationProperties", 0, [], "void", ["pointer"])
    }

    // protected override Void OnCanvasHierarchyChanged()
    @cache
    static get _OnCanvasHierarchyChanged() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "OnCanvasHierarchyChanged", 0, [], "void", ["pointer"])
    }

    // protected override Void OnTransformParentChanged()
    @cache
    static get _OnTransformParentChanged() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "OnTransformParentChanged", 0, [], "void", ["pointer"])
    }

    // protected override Void OnRectTransformDimensionsChange()
    @cache
    static get _OnRectTransformDimensionsChange() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "OnRectTransformDimensionsChange", 0, [], "void", ["pointer"])
    }

    // internal override Void InternalUpdate()
    @cache
    static get _InternalUpdate() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "InternalUpdate", 0, [], "void", ["pointer"])
    }

    // private Void OnPreRenderCanvas()
    @cache
    static get _OnPreRenderCanvas() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "OnPreRenderCanvas", 0, [], "void", ["pointer"])
    }

    // protected virtual Void GenerateTextMesh()
    @cache
    static get _GenerateTextMesh() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "GenerateTextMesh", 0, [], "void", ["pointer"])
    }

    // protected override Vector3[] GetTextContainerLocalCorners()
    @cache
    static get _GetTextContainerLocalCorners() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "GetTextContainerLocalCorners", 0, [], "pointer", ["pointer"])
    }

    // protected override Void SetActiveSubMeshes(Boolean state)
    @cache
    static get _SetActiveSubMeshes() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "SetActiveSubMeshes", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // protected override Void DestroySubMeshObjects()
    @cache
    static get _DestroySubMeshObjects() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "DestroySubMeshObjects", 0, [], "void", ["pointer"])
    }

    // protected override Bounds GetCompoundBounds()
    @cache
    static get _GetCompoundBounds() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "GetCompoundBounds", 0, [], "pointer", ["pointer"])
    }

    // internal override Rect GetCanvasSpaceClippingRect()
    @cache
    static get _GetCanvasSpaceClippingRect() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "GetCanvasSpaceClippingRect", 0, [], "pointer", ["pointer"])
    }

    // private Void UpdateSDFScale(Single scaleDelta)
    @cache
    static get _UpdateSDFScale() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", "UpdateSDFScale", 1, ["System.Single"], "void", ["pointer", "pointer"])
    }

    // public Void .ctor()
    @cache
    static get __ctor() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", ".ctor", 0, [], "void", ["pointer"])
    }

    // private static Void .cctor()
    @cache
    static get __cctor() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TextMeshProUGUI", ".cctor", 0, [], "void", [])
    }

}

Il2Cpp.Api.TextMeshProUGUI = TMPro_TextMeshProUGUI_API

declare global {
    namespace Il2Cpp.Api {
        class TextMeshProUGUI extends TMPro_TextMeshProUGUI_API { }
    }
}

export { }