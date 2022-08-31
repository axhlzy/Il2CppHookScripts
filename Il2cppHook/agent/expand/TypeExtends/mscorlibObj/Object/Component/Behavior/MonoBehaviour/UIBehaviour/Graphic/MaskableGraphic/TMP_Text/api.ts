import { cache } from "decorator-cache-getter"

class TMPro_TMP_Text_API {
    // public String get_text()
    @cache
    static get _get_text() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_text", 0, [], "pointer", ["pointer"])
    }

    // public Void set_text(String value)
    @cache
    static get _set_text() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_text", 1, ["System.String"], "void", ["pointer", "pointer"])
    }

    // public Boolean get_isRightToLeftText()
    @cache
    static get _get_isRightToLeftText() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_isRightToLeftText", 0, [], "pointer", ["pointer"])
    }

    // public Void set_isRightToLeftText(Boolean value)
    @cache
    static get _set_isRightToLeftText() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_isRightToLeftText", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // public TMP_FontAsset get_font()
    @cache
    static get _get_font() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_font", 0, [], "pointer", ["pointer"])
    }

    // public Void set_font(TMP_FontAsset value)
    @cache
    static get _set_font() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_font", 1, ["TMPro.TMP_FontAsset"], "void", ["pointer", "pointer"])
    }

    // public virtual Material get_fontSharedMaterial()
    @cache
    static get _get_fontSharedMaterial() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_fontSharedMaterial", 0, [], "pointer", ["pointer"])
    }

    // public virtual Void set_fontSharedMaterial(Material value)
    @cache
    static get _set_fontSharedMaterial() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_fontSharedMaterial", 1, ["UnityEngine.Material"], "void", ["pointer", "pointer"])
    }

    // public virtual Material[] get_fontSharedMaterials()
    @cache
    static get _get_fontSharedMaterials() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_fontSharedMaterials", 0, [], "pointer", ["pointer"])
    }

    // public virtual Void set_fontSharedMaterials(Material[] value)
    @cache
    static get _set_fontSharedMaterials() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_fontSharedMaterials", 1, ["UnityEngine.Material[]"], "void", ["pointer", "pointer"])
    }

    // public Material get_fontMaterial()
    @cache
    static get _get_fontMaterial() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_fontMaterial", 0, [], "pointer", ["pointer"])
    }

    // public Void set_fontMaterial(Material value)
    @cache
    static get _set_fontMaterial() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_fontMaterial", 1, ["UnityEngine.Material"], "void", ["pointer", "pointer"])
    }

    // public virtual Material[] get_fontMaterials()
    @cache
    static get _get_fontMaterials() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_fontMaterials", 0, [], "pointer", ["pointer"])
    }

    // public virtual Void set_fontMaterials(Material[] value)
    @cache
    static get _set_fontMaterials() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_fontMaterials", 1, ["UnityEngine.Material[]"], "void", ["pointer", "pointer"])
    }

    // public override Color get_color()
    @cache
    static get _get_color() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_color", 0, [], "pointer", ["pointer"])
    }

    // public override Void set_color(Color value)
    @cache
    static get _set_color() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_color", 1, ["UnityEngine.Color"], "void", ["pointer", "pointer"])
    }

    // public Single get_alpha()
    @cache
    static get _get_alpha() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_alpha", 0, [], "pointer", ["pointer"])
    }

    // public Void set_alpha(Single value)
    @cache
    static get _set_alpha() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_alpha", 1, ["System.Single"], "void", ["pointer", "int32"])
    }

    // public Boolean get_enableVertexGradient()
    @cache
    static get _get_enableVertexGradient() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_enableVertexGradient", 0, [], "pointer", ["pointer"])
    }

    // public Void set_enableVertexGradient(Boolean value)
    @cache
    static get _set_enableVertexGradient() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_enableVertexGradient", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // public VertexGradient get_colorGradient()
    @cache
    static get _get_colorGradient() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_colorGradient", 0, [], "pointer", ["pointer"])
    }

    // public Void set_colorGradient(VertexGradient value)
    @cache
    static get _set_colorGradient() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_colorGradient", 1, ["TMPro.VertexGradient"], "void", ["pointer", "pointer"])
    }

    // public TMP_ColorGradient get_colorGradientPreset()
    @cache
    static get _get_colorGradientPreset() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_colorGradientPreset", 0, [], "pointer", ["pointer"])
    }

    // public Void set_colorGradientPreset(TMP_ColorGradient value)
    @cache
    static get _set_colorGradientPreset() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_colorGradientPreset", 1, ["TMPro.TMP_ColorGradient"], "void", ["pointer", "pointer"])
    }

    // public TMP_SpriteAsset get_spriteAsset()
    @cache
    static get _get_spriteAsset() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_spriteAsset", 0, [], "pointer", ["pointer"])
    }

    // public Void set_spriteAsset(TMP_SpriteAsset value)
    @cache
    static get _set_spriteAsset() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_spriteAsset", 1, ["TMPro.TMP_SpriteAsset"], "void", ["pointer", "pointer"])
    }

    // public Boolean get_tintAllSprites()
    @cache
    static get _get_tintAllSprites() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_tintAllSprites", 0, [], "pointer", ["pointer"])
    }

    // public Void set_tintAllSprites(Boolean value)
    @cache
    static get _set_tintAllSprites() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_tintAllSprites", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // public Boolean get_overrideColorTags()
    @cache
    static get _get_overrideColorTags() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_overrideColorTags", 0, [], "pointer", ["pointer"])
    }

    // public Void set_overrideColorTags(Boolean value)
    @cache
    static get _set_overrideColorTags() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_overrideColorTags", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // public Color32 get_faceColor()
    @cache
    static get _get_faceColor() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_faceColor", 0, [], "pointer", ["pointer"])
    }

    // public Void set_faceColor(Color32 value)
    @cache
    static get _set_faceColor() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_faceColor", 1, ["UnityEngine.Color32"], "void", ["pointer", "pointer"])
    }

    // public Color32 get_outlineColor()
    @cache
    static get _get_outlineColor() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_outlineColor", 0, [], "pointer", ["pointer"])
    }

    // public Void set_outlineColor(Color32 value)
    @cache
    static get _set_outlineColor() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_outlineColor", 1, ["UnityEngine.Color32"], "void", ["pointer", "pointer"])
    }

    // public Single get_outlineWidth()
    @cache
    static get _get_outlineWidth() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_outlineWidth", 0, [], "pointer", ["pointer"])
    }

    // public Void set_outlineWidth(Single value)
    @cache
    static get _set_outlineWidth() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_outlineWidth", 1, ["System.Single"], "void", ["pointer", "pointer"])
    }

    // public Single get_fontSize()
    @cache
    static get _get_fontSize() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_fontSize", 0, [], "pointer", ["pointer"])
    }

    // public Void set_fontSize(Single value)
    @cache
    static get _set_fontSize() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_fontSize", 1, ["System.Single"], "void", ["pointer", "pointer"])
    }

    // public Single get_fontScale()
    @cache
    static get _get_fontScale() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_fontScale", 0, [], "pointer", ["pointer"])
    }

    // public FontWeight get_fontWeight()
    @cache
    static get _get_fontWeight() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_fontWeight", 0, [], "pointer", ["pointer"])
    }

    // public Void set_fontWeight(FontWeight value)
    @cache
    static get _set_fontWeight() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_fontWeight", 1, ["TMPro.FontWeight"], "void", ["pointer", "pointer"])
    }

    // public Single get_pixelsPerUnit()
    @cache
    static get _get_pixelsPerUnit() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_pixelsPerUnit", 0, [], "pointer", ["pointer"])
    }

    // public Boolean get_enableAutoSizing()
    @cache
    static get _get_enableAutoSizing() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_enableAutoSizing", 0, [], "pointer", ["pointer"])
    }

    // public Void set_enableAutoSizing(Boolean value)
    @cache
    static get _set_enableAutoSizing() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_enableAutoSizing", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // public Single get_fontSizeMin()
    @cache
    static get _get_fontSizeMin() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_fontSizeMin", 0, [], "pointer", ["pointer"])
    }

    // public Void set_fontSizeMin(Single value)
    @cache
    static get _set_fontSizeMin() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_fontSizeMin", 1, ["System.Single"], "void", ["pointer", "pointer"])
    }

    // public Single get_fontSizeMax()
    @cache
    static get _get_fontSizeMax() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_fontSizeMax", 0, [], "pointer", ["pointer"])
    }

    // public Void set_fontSizeMax(Single value)
    @cache
    static get _set_fontSizeMax() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_fontSizeMax", 1, ["System.Single"], "void", ["pointer", "pointer"])
    }

    // public FontStyles get_fontStyle()
    @cache
    static get _get_fontStyle() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_fontStyle", 0, [], "pointer", ["pointer"])
    }

    // public Void set_fontStyle(FontStyles value)
    @cache
    static get _set_fontStyle() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_fontStyle", 1, ["TMPro.FontStyles"], "void", ["pointer", "pointer"])
    }

    // public Boolean get_isUsingBold()
    @cache
    static get _get_isUsingBold() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_isUsingBold", 0, [], "pointer", ["pointer"])
    }

    // public TextAlignmentOptions get_alignment()
    @cache
    static get _get_alignment() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_alignment", 0, [], "pointer", ["pointer"])
    }

    // public Void set_alignment(TextAlignmentOptions value)
    @cache
    static get _set_alignment() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_alignment", 1, ["TMPro.TextAlignmentOptions"], "void", ["pointer", "pointer"])
    }

    // public Single get_characterSpacing()
    @cache
    static get _get_characterSpacing() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_characterSpacing", 0, [], "pointer", ["pointer"])
    }

    // public Void set_characterSpacing(Single value)
    @cache
    static get _set_characterSpacing() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_characterSpacing", 1, ["System.Single"], "void", ["pointer", "pointer"])
    }

    // public Single get_wordSpacing()
    @cache
    static get _get_wordSpacing() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_wordSpacing", 0, [], "pointer", ["pointer"])
    }

    // public Void set_wordSpacing(Single value)
    @cache
    static get _set_wordSpacing() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_wordSpacing", 1, ["System.Single"], "void", ["pointer", "pointer"])
    }

    // public Single get_lineSpacing()
    @cache
    static get _get_lineSpacing() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_lineSpacing", 0, [], "pointer", ["pointer"])
    }

    // public Void set_lineSpacing(Single value)
    @cache
    static get _set_lineSpacing() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_lineSpacing", 1, ["System.Single"], "void", ["pointer", "pointer"])
    }

    // public Single get_lineSpacingAdjustment()
    @cache
    static get _get_lineSpacingAdjustment() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_lineSpacingAdjustment", 0, [], "pointer", ["pointer"])
    }

    // public Void set_lineSpacingAdjustment(Single value)
    @cache
    static get _set_lineSpacingAdjustment() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_lineSpacingAdjustment", 1, ["System.Single"], "void", ["pointer", "pointer"])
    }

    // public Single get_paragraphSpacing()
    @cache
    static get _get_paragraphSpacing() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_paragraphSpacing", 0, [], "pointer", ["pointer"])
    }

    // public Void set_paragraphSpacing(Single value)
    @cache
    static get _set_paragraphSpacing() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_paragraphSpacing", 1, ["System.Single"], "void", ["pointer", "pointer"])
    }

    // public Single get_characterWidthAdjustment()
    @cache
    static get _get_characterWidthAdjustment() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_characterWidthAdjustment", 0, [], "pointer", ["pointer"])
    }

    // public Void set_characterWidthAdjustment(Single value)
    @cache
    static get _set_characterWidthAdjustment() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_characterWidthAdjustment", 1, ["System.Single"], "void", ["pointer", "pointer"])
    }

    // public Boolean get_enableWordWrapping()
    @cache
    static get _get_enableWordWrapping() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_enableWordWrapping", 0, [], "pointer", ["pointer"])
    }

    // public Void set_enableWordWrapping(Boolean value)
    @cache
    static get _set_enableWordWrapping() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_enableWordWrapping", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // public Single get_wordWrappingRatios()
    @cache
    static get _get_wordWrappingRatios() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_wordWrappingRatios", 0, [], "pointer", ["pointer"])
    }

    // public Void set_wordWrappingRatios(Single value)
    @cache
    static get _set_wordWrappingRatios() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_wordWrappingRatios", 1, ["System.Single"], "void", ["pointer", "pointer"])
    }

    // public TextOverflowModes get_overflowMode()
    @cache
    static get _get_overflowMode() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_overflowMode", 0, [], "pointer", ["pointer"])
    }

    // public Void set_overflowMode(TextOverflowModes value)
    @cache
    static get _set_overflowMode() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_overflowMode", 1, ["TMPro.TextOverflowModes"], "void", ["pointer", "pointer"])
    }

    // public Boolean get_isTextOverflowing()
    @cache
    static get _get_isTextOverflowing() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_isTextOverflowing", 0, [], "pointer", ["pointer"])
    }

    // public Int32 get_firstOverflowCharacterIndex()
    @cache
    static get _get_firstOverflowCharacterIndex() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_firstOverflowCharacterIndex", 0, [], "pointer", ["pointer"])
    }

    // public TMP_Text get_linkedTextComponent()
    @cache
    static get _get_linkedTextComponent() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_linkedTextComponent", 0, [], "pointer", ["pointer"])
    }

    // public Void set_linkedTextComponent(TMP_Text value)
    @cache
    static get _set_linkedTextComponent() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_linkedTextComponent", 1, ["TMPro.TMP_Text"], "void", ["pointer", "pointer"])
    }

    // public Boolean get_isLinkedTextComponent()
    @cache
    static get _get_isLinkedTextComponent() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_isLinkedTextComponent", 0, [], "pointer", ["pointer"])
    }

    // public Void set_isLinkedTextComponent(Boolean value)
    @cache
    static get _set_isLinkedTextComponent() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_isLinkedTextComponent", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // public Boolean get_isTextTruncated()
    @cache
    static get _get_isTextTruncated() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_isTextTruncated", 0, [], "pointer", ["pointer"])
    }

    // public Boolean get_enableKerning()
    @cache
    static get _get_enableKerning() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_enableKerning", 0, [], "pointer", ["pointer"])
    }

    // public Void set_enableKerning(Boolean value)
    @cache
    static get _set_enableKerning() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_enableKerning", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // public Boolean get_extraPadding()
    @cache
    static get _get_extraPadding() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_extraPadding", 0, [], "pointer", ["pointer"])
    }

    // public Void set_extraPadding(Boolean value)
    @cache
    static get _set_extraPadding() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_extraPadding", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // public Boolean get_richText()
    @cache
    static get _get_richText() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_richText", 0, [], "pointer", ["pointer"])
    }

    // public Void set_richText(Boolean value)
    @cache
    static get _set_richText() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_richText", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // public Boolean get_parseCtrlCharacters()
    @cache
    static get _get_parseCtrlCharacters() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_parseCtrlCharacters", 0, [], "pointer", ["pointer"])
    }

    // public Void set_parseCtrlCharacters(Boolean value)
    @cache
    static get _set_parseCtrlCharacters() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_parseCtrlCharacters", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // public Boolean get_isOverlay()
    @cache
    static get _get_isOverlay() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_isOverlay", 0, [], "pointer", ["pointer"])
    }

    // public Void set_isOverlay(Boolean value)
    @cache
    static get _set_isOverlay() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_isOverlay", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // public Boolean get_isOrthographic()
    @cache
    static get _get_isOrthographic() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_isOrthographic", 0, [], "pointer", ["pointer"])
    }

    // public Void set_isOrthographic(Boolean value)
    @cache
    static get _set_isOrthographic() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_isOrthographic", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // public Boolean get_enableCulling()
    @cache
    static get _get_enableCulling() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_enableCulling", 0, [], "pointer", ["pointer"])
    }

    // public Void set_enableCulling(Boolean value)
    @cache
    static get _set_enableCulling() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_enableCulling", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // public Boolean get_ignoreRectMaskCulling()
    @cache
    static get _get_ignoreRectMaskCulling() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_ignoreRectMaskCulling", 0, [], "pointer", ["pointer"])
    }

    // public Void set_ignoreRectMaskCulling(Boolean value)
    @cache
    static get _set_ignoreRectMaskCulling() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_ignoreRectMaskCulling", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // public Boolean get_ignoreVisibility()
    @cache
    static get _get_ignoreVisibility() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_ignoreVisibility", 0, [], "pointer", ["pointer"])
    }

    // public Void set_ignoreVisibility(Boolean value)
    @cache
    static get _set_ignoreVisibility() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_ignoreVisibility", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // public TextureMappingOptions get_horizontalMapping()
    @cache
    static get _get_horizontalMapping() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_horizontalMapping", 0, [], "pointer", ["pointer"])
    }

    // public Void set_horizontalMapping(TextureMappingOptions value)
    @cache
    static get _set_horizontalMapping() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_horizontalMapping", 1, ["TMPro.TextureMappingOptions"], "void", ["pointer", "pointer"])
    }

    // public TextureMappingOptions get_verticalMapping()
    @cache
    static get _get_verticalMapping() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_verticalMapping", 0, [], "pointer", ["pointer"])
    }

    // public Void set_verticalMapping(TextureMappingOptions value)
    @cache
    static get _set_verticalMapping() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_verticalMapping", 1, ["TMPro.TextureMappingOptions"], "void", ["pointer", "pointer"])
    }

    // public Single get_mappingUvLineOffset()
    @cache
    static get _get_mappingUvLineOffset() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_mappingUvLineOffset", 0, [], "pointer", ["pointer"])
    }

    // public Void set_mappingUvLineOffset(Single value)
    @cache
    static get _set_mappingUvLineOffset() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_mappingUvLineOffset", 1, ["System.Single"], "void", ["pointer", "pointer"])
    }

    // public TextRenderFlags get_renderMode()
    @cache
    static get _get_renderMode() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_renderMode", 0, [], "pointer", ["pointer"])
    }

    // public Void set_renderMode(TextRenderFlags value)
    @cache
    static get _set_renderMode() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_renderMode", 1, ["TMPro.TextRenderFlags"], "void", ["pointer", "pointer"])
    }

    // public VertexSortingOrder get_geometrySortingOrder()
    @cache
    static get _get_geometrySortingOrder() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_geometrySortingOrder", 0, [], "pointer", ["pointer"])
    }

    // public Void set_geometrySortingOrder(VertexSortingOrder value)
    @cache
    static get _set_geometrySortingOrder() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_geometrySortingOrder", 1, ["TMPro.VertexSortingOrder"], "void", ["pointer", "pointer"])
    }

    // public Boolean get_vertexBufferAutoSizeReduction()
    @cache
    static get _get_vertexBufferAutoSizeReduction() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_vertexBufferAutoSizeReduction", 0, [], "pointer", ["pointer"])
    }

    // public Void set_vertexBufferAutoSizeReduction(Boolean value)
    @cache
    static get _set_vertexBufferAutoSizeReduction() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_vertexBufferAutoSizeReduction", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // public Int32 get_firstVisibleCharacter()
    @cache
    static get _get_firstVisibleCharacter() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_firstVisibleCharacter", 0, [], "pointer", ["pointer"])
    }

    // public Void set_firstVisibleCharacter(Int32 value)
    @cache
    static get _set_firstVisibleCharacter() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_firstVisibleCharacter", 1, ["System.Int32"], "void", ["pointer", "pointer"])
    }

    // public Int32 get_maxVisibleCharacters()
    @cache
    static get _get_maxVisibleCharacters() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_maxVisibleCharacters", 0, [], "pointer", ["pointer"])
    }

    // public Void set_maxVisibleCharacters(Int32 value)
    @cache
    static get _set_maxVisibleCharacters() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_maxVisibleCharacters", 1, ["System.Int32"], "void", ["pointer", "pointer"])
    }

    // public Int32 get_maxVisibleWords()
    @cache
    static get _get_maxVisibleWords() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_maxVisibleWords", 0, [], "pointer", ["pointer"])
    }

    // public Void set_maxVisibleWords(Int32 value)
    @cache
    static get _set_maxVisibleWords() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_maxVisibleWords", 1, ["System.Int32"], "void", ["pointer", "pointer"])
    }

    // public Int32 get_maxVisibleLines()
    @cache
    static get _get_maxVisibleLines() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_maxVisibleLines", 0, [], "pointer", ["pointer"])
    }

    // public Void set_maxVisibleLines(Int32 value)
    @cache
    static get _set_maxVisibleLines() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_maxVisibleLines", 1, ["System.Int32"], "void", ["pointer", "pointer"])
    }

    // public Boolean get_useMaxVisibleDescender()
    @cache
    static get _get_useMaxVisibleDescender() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_useMaxVisibleDescender", 0, [], "pointer", ["pointer"])
    }

    // public Void set_useMaxVisibleDescender(Boolean value)
    @cache
    static get _set_useMaxVisibleDescender() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_useMaxVisibleDescender", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // public Int32 get_pageToDisplay()
    @cache
    static get _get_pageToDisplay() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_pageToDisplay", 0, [], "pointer", ["pointer"])
    }

    // public Void set_pageToDisplay(Int32 value)
    @cache
    static get _set_pageToDisplay() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_pageToDisplay", 1, ["System.Int32"], "void", ["pointer", "pointer"])
    }

    // public virtual Vector4 get_margin()
    @cache
    static get _get_margin() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_margin", 0, [], "pointer", ["pointer"])
    }

    // public virtual Void set_margin(Vector4 value)
    @cache
    static get _set_margin() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_margin", 1, ["UnityEngine.Vector4"], "void", ["pointer", "pointer"])
    }

    // public TMP_TextInfo get_textInfo()
    @cache
    static get _get_textInfo() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_textInfo", 0, [], "pointer", ["pointer"])
    }

    // public Boolean get_havePropertiesChanged()
    @cache
    static get _get_havePropertiesChanged() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_havePropertiesChanged", 0, [], "pointer", ["pointer"])
    }

    // public Void set_havePropertiesChanged(Boolean value)
    @cache
    static get _set_havePropertiesChanged() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_havePropertiesChanged", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // public Boolean get_isUsingLegacyAnimationComponent()
    @cache
    static get _get_isUsingLegacyAnimationComponent() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_isUsingLegacyAnimationComponent", 0, [], "pointer", ["pointer"])
    }

    // public Void set_isUsingLegacyAnimationComponent(Boolean value)
    @cache
    static get _set_isUsingLegacyAnimationComponent() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_isUsingLegacyAnimationComponent", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // public Transform get_transform()
    @cache
    static get _get_transform() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_transform", 0, [], "pointer", ["pointer"])
    }

    // public RectTransform get_rectTransform()
    @cache
    static get _get_rectTransform() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_rectTransform", 0, [], "pointer", ["pointer"])
    }

    // public virtual Boolean get_autoSizeTextContainer()
    @cache
    static get _get_autoSizeTextContainer() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_autoSizeTextContainer", 0, [], "pointer", ["pointer"])
    }

    // public virtual Void set_autoSizeTextContainer(Boolean value)
    @cache
    static get _set_autoSizeTextContainer() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_autoSizeTextContainer", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // public virtual Mesh get_mesh()
    @cache
    static get _get_mesh() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_mesh", 0, [], "pointer", ["pointer"])
    }

    // public Boolean get_isVolumetricText()
    @cache
    static get _get_isVolumetricText() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_isVolumetricText", 0, [], "pointer", ["pointer"])
    }

    // public Void set_isVolumetricText(Boolean value)
    @cache
    static get _set_isVolumetricText() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "set_isVolumetricText", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // public Bounds get_bounds()
    @cache
    static get _get_bounds() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_bounds", 0, [], "pointer", ["pointer"])
    }

    // public Bounds get_textBounds()
    @cache
    static get _get_textBounds() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_textBounds", 0, [], "pointer", ["pointer"])
    }

    // protected TMP_SpriteAnimator get_spriteAnimator()
    @cache
    static get _get_spriteAnimator() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_spriteAnimator", 0, [], "pointer", ["pointer"])
    }

    // public Single get_flexibleHeight()
    @cache
    static get _get_flexibleHeight() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_flexibleHeight", 0, [], "pointer", ["pointer"])
    }

    // public Single get_flexibleWidth()
    @cache
    static get _get_flexibleWidth() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_flexibleWidth", 0, [], "pointer", ["pointer"])
    }

    // public Single get_minWidth()
    @cache
    static get _get_minWidth() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_minWidth", 0, [], "pointer", ["pointer"])
    }

    // public Single get_minHeight()
    @cache
    static get _get_minHeight() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_minHeight", 0, [], "pointer", ["pointer"])
    }

    // public Single get_maxWidth()
    @cache
    static get _get_maxWidth() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_maxWidth", 0, [], "pointer", ["pointer"])
    }

    // public Single get_maxHeight()
    @cache
    static get _get_maxHeight() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_maxHeight", 0, [], "pointer", ["pointer"])
    }

    // protected LayoutElement get_layoutElement()
    @cache
    static get _get_layoutElement() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_layoutElement", 0, [], "pointer", ["pointer"])
    }

    // public virtual Single get_preferredWidth()
    @cache
    static get _get_preferredWidth() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_preferredWidth", 0, [], "pointer", ["pointer"])
    }

    // public virtual Single get_preferredHeight()
    @cache
    static get _get_preferredHeight() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_preferredHeight", 0, [], "pointer", ["pointer"])
    }

    // public virtual Single get_renderedWidth()
    @cache
    static get _get_renderedWidth() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_renderedWidth", 0, [], "pointer", ["pointer"])
    }

    // public virtual Single get_renderedHeight()
    @cache
    static get _get_renderedHeight() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_renderedHeight", 0, [], "pointer", ["pointer"])
    }

    // public Int32 get_layoutPriority()
    @cache
    static get _get_layoutPriority() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "get_layoutPriority", 0, [], "pointer", ["pointer"])
    }

    // protected virtual Void LoadFontAsset()
    @cache
    static get _LoadFontAsset() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "LoadFontAsset", 0, [], "void", ["pointer"])
    }

    // protected virtual Void SetSharedMaterial(Material mat)
    @cache
    static get _SetSharedMaterial() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "SetSharedMaterial", 1, ["UnityEngine.Material"], "void", ["pointer", "pointer"])
    }

    // protected virtual Material GetMaterial(Material mat)
    @cache
    static get _GetMaterial() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "GetMaterial", 1, ["UnityEngine.Material"], "pointer", ["pointer", "pointer"])
    }

    // protected virtual Void SetFontBaseMaterial(Material mat)
    @cache
    static get _SetFontBaseMaterial() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "SetFontBaseMaterial", 1, ["UnityEngine.Material"], "void", ["pointer", "pointer"])
    }

    // protected virtual Material[] GetSharedMaterials()
    @cache
    static get _GetSharedMaterials() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "GetSharedMaterials", 0, [], "pointer", ["pointer"])
    }

    // protected virtual Void SetSharedMaterials(Material[] materials)
    @cache
    static get _SetSharedMaterials() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "SetSharedMaterials", 1, ["UnityEngine.Material[]"], "void", ["pointer", "pointer"])
    }

    // protected virtual Material[] GetMaterials(Material[] mats)
    @cache
    static get _GetMaterials() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "GetMaterials", 1, ["UnityEngine.Material[]"], "pointer", ["pointer", "pointer"])
    }

    // protected virtual Material CreateMaterialInstance(Material source)
    @cache
    static get _CreateMaterialInstance() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "CreateMaterialInstance", 1, ["UnityEngine.Material"], "pointer", ["pointer", "pointer"])
    }

    // protected Void SetVertexColorGradient(TMP_ColorGradient gradient)
    @cache
    static get _SetVertexColorGradient() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "SetVertexColorGradient", 1, ["TMPro.TMP_ColorGradient"], "void", ["pointer", "pointer"])
    }

    // protected Void SetTextSortingOrder(VertexSortingOrder order)
    @cache
    static get _SetTextSortingOrder() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "SetTextSortingOrder", 1, ["TMPro.VertexSortingOrder"], "void", ["pointer", "pointer"])
    }

    // protected Void SetTextSortingOrder(Int32[] order)
    @cache
    static get _SetTextSortingOrder_order() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "SetTextSortingOrder", 1, ["System.Int32[]"], "void", ["pointer", "pointer"])
    }

    // protected virtual Void SetFaceColor(Color32 color)
    @cache
    static get _SetFaceColor() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "SetFaceColor", 1, ["UnityEngine.Color32"], "void", ["pointer", "pointer"])
    }

    // protected virtual Void SetOutlineColor(Color32 color)
    @cache
    static get _SetOutlineColor() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "SetOutlineColor", 1, ["UnityEngine.Color32"], "void", ["pointer", "pointer"])
    }

    // protected virtual Void SetOutlineThickness(Single thickness)
    @cache
    static get _SetOutlineThickness() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "SetOutlineThickness", 1, ["System.Single"], "void", ["pointer", "pointer"])
    }

    // protected virtual Void SetShaderDepth()
    @cache
    static get _SetShaderDepth() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "SetShaderDepth", 0, [], "void", ["pointer"])
    }

    // protected virtual Void SetCulling()
    @cache
    static get _SetCulling() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "SetCulling", 0, [], "void", ["pointer"])
    }

    // protected virtual Single GetPaddingForMaterial()
    @cache
    static get _GetPaddingForMaterial() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "GetPaddingForMaterial", 0, [], "pointer", ["pointer"])
    }

    // protected virtual Single GetPaddingForMaterial(Material mat)
    @cache
    static get _GetPaddingForMaterial_mat() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "GetPaddingForMaterial", 1, ["UnityEngine.Material"], "pointer", ["pointer", "pointer"])
    }

    // protected virtual Vector3[] GetTextContainerLocalCorners()
    @cache
    static get _GetTextContainerLocalCorners() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "GetTextContainerLocalCorners", 0, [], "pointer", ["pointer"])
    }

    // public virtual Void ForceMeshUpdate()
    @cache
    static get _ForceMeshUpdate() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "ForceMeshUpdate", 0, [], "void", ["pointer"])
    }

    // public virtual Void ForceMeshUpdate(Boolean ignoreActiveState)
    @cache
    static get _ForceMeshUpdate_ignoreActiveState() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "ForceMeshUpdate", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // internal Void SetTextInternal(String text)
    @cache
    static get _SetTextInternal() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "SetTextInternal", 1, ["System.String"], "void", ["pointer", "pointer"])
    }

    // public virtual Void UpdateGeometry(Mesh mesh,Int32 index)
    @cache
    static get _UpdateGeometry() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "UpdateGeometry", 2, ["UnityEngine.Mesh", "System.Int32"], "void", ["pointer", "pointer", "pointer"])
    }

    // public virtual Void UpdateVertexData(TMP_VertexDataUpdateFlags flags)
    @cache
    static get _UpdateVertexData() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "UpdateVertexData", 1, ["TMPro.TMP_VertexDataUpdateFlags"], "void", ["pointer", "pointer"])
    }

    // public virtual Void UpdateVertexData()
    @cache
    static get _UpdateVertexData_() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "UpdateVertexData", 0, [], "void", ["pointer"])
    }

    // public virtual Void SetVertices(Vector3[] vertices)
    @cache
    static get _SetVertices() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "SetVertices", 1, ["UnityEngine.Vector3[]"], "void", ["pointer", "pointer"])
    }

    // public virtual Void UpdateMeshPadding()
    @cache
    static get _UpdateMeshPadding() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "UpdateMeshPadding", 0, [], "void", ["pointer"])
    }

    // public override Void CrossFadeColor(Color targetColor,Single duration,Boolean ignoreTimeScale,Boolean useAlpha)
    @cache
    static get _CrossFadeColor() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "CrossFadeColor", 4, ["UnityEngine.Color", "System.Single", "System.Boolean", "System.Boolean"], "void", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public override Void CrossFadeAlpha(Single alpha,Single duration,Boolean ignoreTimeScale)
    @cache
    static get _CrossFadeAlpha() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "CrossFadeAlpha", 3, ["System.Single", "System.Single", "System.Boolean"], "void", ["pointer", "pointer", "pointer", "pointer"])
    }

    // protected virtual Void InternalCrossFadeColor(Color targetColor,Single duration,Boolean ignoreTimeScale,Boolean useAlpha)
    @cache
    static get _InternalCrossFadeColor() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "InternalCrossFadeColor", 4, ["UnityEngine.Color", "System.Single", "System.Boolean", "System.Boolean"], "void", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // protected virtual Void InternalCrossFadeAlpha(Single alpha,Single duration,Boolean ignoreTimeScale)
    @cache
    static get _InternalCrossFadeAlpha() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "InternalCrossFadeAlpha", 3, ["System.Single", "System.Single", "System.Boolean"], "void", ["pointer", "pointer", "pointer", "pointer"])
    }

    // protected Void ParseInputText()
    @cache
    static get _ParseInputText() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "ParseInputText", 0, [], "void", ["pointer"])
    }

    // public Void SetText(String text)
    @cache
    static get _SetText() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "SetText", 1, ["System.String"], "void", ["pointer", "pointer"])
    }

    // public Void SetText(String text,Boolean syncTextInputBox)
    @cache
    static get _SetText_text_syncTextInputBox() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "SetText", 2, ["System.String", "System.Boolean"], "void", ["pointer", "pointer", "pointer"])
    }

    // public Void SetText(String text,Single arg0)
    @cache
    static get _SetText_text_arg0() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "SetText", 2, ["System.String", "System.Single"], "void", ["pointer", "pointer", "pointer"])
    }

    // public Void SetText(String text,Single arg0,Single arg1)
    @cache
    static get _SetText_text_arg0_arg1() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "SetText", 3, ["System.String", "System.Single", "System.Single"], "void", ["pointer", "pointer", "pointer", "pointer"])
    }

    // public Void SetText(String text,Single arg0,Single arg1,Single arg2)
    @cache
    static get _SetText_text_arg0_arg1_arg2() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "SetText", 4, ["System.String", "System.Single", "System.Single", "System.Single"], "void", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public Void SetText(StringBuilder text)
    @cache
    static get _SetText_text() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "SetText", 1, ["System.Text.StringBuilder"], "void", ["pointer", "pointer"])
    }

    // public Void SetCharArray(Char[] sourceText)
    @cache
    static get _SetCharArray() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "SetCharArray", 1, ["System.Char[]"], "void", ["pointer", "pointer"])
    }

    // public Void SetCharArray(Char[] sourceText,Int32 start,Int32 length)
    @cache
    static get _SetCharArray_sourceTextCHAR_start_length() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "SetCharArray", 3, ["System.Char[]", "System.Int32", "System.Int32"], "void", ["pointer", "pointer", "pointer", "pointer"])
    }

    // public Void SetCharArray(Int32[] sourceText,Int32 start,Int32 length)
    @cache
    static get _SetCharArray_sourceTextINT32_start_length() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "SetCharArray", 3, ["System.Int32[]", "System.Int32", "System.Int32"], "void", ["pointer", "pointer", "pointer", "pointer"])
    }

    // protected Void SetTextArrayToCharArray(Char[] sourceText,UnicodeChar[] charBuffer)
    @cache
    static get _SetTextArrayToCharArray() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "SetTextArrayToCharArray", 2, ["System.Char[]", "TMPro.TMP_Text.UnicodeChar[]"], "void", ["pointer", "pointer", "pointer"])
    }

    // protected Void StringToCharArray(String sourceText,UnicodeChar[] charBuffer)
    @cache
    static get _StringToCharArray() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "StringToCharArray", 2, ["System.String", "TMPro.TMP_Text.UnicodeChar[]"], "void", ["pointer", "pointer", "pointer"])
    }

    // protected Void StringBuilderToIntArray(StringBuilder sourceText,UnicodeChar[] charBuffer)
    @cache
    static get _StringBuilderToIntArray() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "StringBuilderToIntArray", 2, ["System.Text.StringBuilder", "TMPro.TMP_Text.UnicodeChar[]"], "void", ["pointer", "pointer", "pointer"])
    }

    // private Boolean ReplaceOpeningStyleTag(String sourceText,Int32 srcIndex,Int32 srcOffset,UnicodeChar[] charBuffer,Int32 writeIndex)
    @cache
    static get _ReplaceOpeningStyleTag() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "ReplaceOpeningStyleTag", 5, ["System.String", "System.Int32", "System.Int32", "TMPro.TMP_Text.UnicodeChar[]", "System.Int32"], "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // // private Boolean ReplaceOpeningStyleTag(Int32[] sourceText,Int32 srcIndex,Int32 srcOffset,UnicodeChar[] charBuffer,Int32 writeIndex)
    // @cache
    // static get _ReplaceOpeningStyleTag_sourceText_srcIndex_srcOffset_charBuffer_writeIndex() {
    //     return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "ReplaceOpeningStyleTag", 5, ["System.Int32[]", "System.Int32", "System.Int32", "TMPro.TMP_Text.UnicodeChar[]", "System.Int32"], "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer", "pointer"])
    // }

    // // private Boolean ReplaceOpeningStyleTag(Char[] sourceText,Int32 srcIndex,Int32 srcOffset,UnicodeChar[] charBuffer,Int32 writeIndex)
    // @cache
    // static get _ReplaceOpeningStyleTag_sourceText_srcIndex_srcOffset_charBuffer_writeIndex() {
    //     return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "ReplaceOpeningStyleTag", 5, ["System.Char[]", "System.Int32", "System.Int32", "TMPro.TMP_Text.UnicodeChar[]", "System.Int32"], "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer", "pointer"])
    // }

    // // private Boolean ReplaceOpeningStyleTag(StringBuilder sourceText,Int32 srcIndex,Int32 srcOffset,UnicodeChar[] charBuffer,Int32 writeIndex)
    // @cache
    // static get _ReplaceOpeningStyleTag_sourceText_srcIndex_srcOffset_charBuffer_writeIndex() {
    //     return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "ReplaceOpeningStyleTag", 5, ["System.Text.StringBuilder", "System.Int32", "System.Int32", "TMPro.TMP_Text.UnicodeChar[]", "System.Int32"], "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer", "pointer"])
    // }

    // private Boolean ReplaceClosingStyleTag(String sourceText,Int32 srcIndex,UnicodeChar[] charBuffer,Int32 writeIndex)
    @cache
    static get _ReplaceClosingStyleTag() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "ReplaceClosingStyleTag", 4, ["System.String", "System.Int32", "TMPro.TMP_Text.UnicodeChar[]", "System.Int32"], "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // // private Boolean ReplaceClosingStyleTag(Int32[] sourceText,Int32 srcIndex,UnicodeChar[] charBuffer,Int32 writeIndex)
    // @cache
    // static get _ReplaceClosingStyleTag_sourceText_srcIndex_charBuffer_writeIndex() {
    //     return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "ReplaceClosingStyleTag", 4, ["System.Int32[]", "System.Int32", "TMPro.TMP_Text.UnicodeChar[]", "System.Int32"], "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    // }

    // // private Boolean ReplaceClosingStyleTag(Char[] sourceText,Int32 srcIndex,UnicodeChar[] charBuffer,Int32 writeIndex)
    // @cache
    // static get _ReplaceClosingStyleTag_sourceText_srcIndex_charBuffer_writeIndex() {
    //     return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "ReplaceClosingStyleTag", 4, ["System.Char[]", "System.Int32", "TMPro.TMP_Text.UnicodeChar[]", "System.Int32"], "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    // }

    // // private Boolean ReplaceClosingStyleTag(StringBuilder sourceText,Int32 srcIndex,UnicodeChar[] charBuffer,Int32 writeIndex)
    // @cache
    // static get _ReplaceClosingStyleTag_sourceText_srcIndex_charBuffer_writeIndex() {
    //     return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "ReplaceClosingStyleTag", 4, ["System.Text.StringBuilder", "System.Int32", "TMPro.TMP_Text.UnicodeChar[]", "System.Int32"], "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    // }

    // private Boolean IsTagName(String text,String tag,Int32 index)
    @cache
    static get _IsTagName() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "IsTagName", 3, ["System.String", "System.String", "System.Int32"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // private Boolean IsTagName(Char[] text,String tag,Int32 index)
    @cache
    static get _IsTagName_textCHAR_tag_index() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "IsTagName", 3, ["System.Char[]", "System.String", "System.Int32"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // private Boolean IsTagName(Int32[] text,String tag,Int32 index)
    @cache
    static get _IsTagName_textINT32_tag_index() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "IsTagName", 3, ["System.Int32[]", "System.String", "System.Int32"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // private Boolean IsTagName(StringBuilder text,String tag,Int32 index)
    @cache
    static get _IsTagName_textBUILDER_tag_index() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "IsTagName", 3, ["System.Text.StringBuilder", "System.String", "System.Int32"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // private Int32 GetTagHashCode(String text,Int32 index,Int32 closeIndex)
    @cache
    static get _GetTagHashCode() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "GetTagHashCode", 3, ["System.String", "System.Int32", "System.Int32"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // private Int32 GetTagHashCode(Char[] text,Int32 index,Int32 closeIndex)
    @cache
    static get _GetTagHashCode_textCHAR_index_closeIndex() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "GetTagHashCode", 3, ["System.Char[]", "System.Int32", "System.Int32"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // private Int32 GetTagHashCode(Int32[] text,Int32 index,Int32 closeIndex)
    @cache
    static get _GetTagHashCode_textINT32_index_closeIndex() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "GetTagHashCode", 3, ["System.Int32[]", "System.Int32", "System.Int32"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // private Int32 GetTagHashCode(StringBuilder text,Int32 index,Int32 closeIndex)
    @cache
    static get _GetTagHashCode_textBUILDER_index_closeIndex() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "GetTagHashCode", 3, ["System.Text.StringBuilder", "System.Int32", "System.Int32"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // private Void ResizeInternalArray(T[] array)
    @cache
    static get _ResizeInternalArray() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "ResizeInternalArray", 1, ["T[]"], "void", ["pointer", "pointer"])
    }

    // protected Void AddFloatToCharArray(Double number,Int32 index,Int32 precision)
    @cache
    static get _AddFloatToCharArray() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "AddFloatToCharArray", 3, ["System.Double", "System.Int32", "System.Int32"], "void", ["pointer", "pointer", "pointer", "pointer"])
    }

    // protected Void AddIntToCharArray(Double number,Int32 index,Int32 precision)
    @cache
    static get _AddIntToCharArray() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "AddIntToCharArray", 3, ["System.Double", "System.Int32", "System.Int32"], "void", ["pointer", "pointer", "pointer", "pointer"])
    }

    // protected virtual Int32 SetArraySizes(UnicodeChar[] chars)
    @cache
    static get _SetArraySizes() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "SetArraySizes", 1, ["TMPro.TMP_Text.UnicodeChar[]"], "pointer", ["pointer", "pointer"])
    }

    // protected virtual Void GenerateTextMesh()
    @cache
    static get _GenerateTextMesh() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "GenerateTextMesh", 0, [], "void", ["pointer"])
    }

    // public Vector2 GetPreferredValues()
    @cache
    static get _GetPreferredValues() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "GetPreferredValues", 0, [], "pointer", ["pointer"])
    }

    // public Vector2 GetPreferredValues(Single width,Single height)
    @cache
    static get _GetPreferredValues_width_height() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "GetPreferredValues", 2, ["System.Single", "System.Single"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // public Vector2 GetPreferredValues(String text)
    @cache
    static get _GetPreferredValues_text() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "GetPreferredValues", 1, ["System.String"], "pointer", ["pointer", "pointer"])
    }

    // public Vector2 GetPreferredValues(String text,Single width,Single height)
    @cache
    static get _GetPreferredValues_text_width_height() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "GetPreferredValues", 3, ["System.String", "System.Single", "System.Single"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // protected Single GetPreferredWidth()
    @cache
    static get _GetPreferredWidth() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "GetPreferredWidth", 0, [], "pointer", ["pointer"])
    }

    // protected Single GetPreferredWidth(Vector2 margin)
    @cache
    static get _GetPreferredWidth_margin() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "GetPreferredWidth", 1, ["UnityEngine.Vector2"], "pointer", ["pointer", "pointer"])
    }

    // protected Single GetPreferredHeight()
    @cache
    static get _GetPreferredHeight() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "GetPreferredHeight", 0, [], "pointer", ["pointer"])
    }

    // protected Single GetPreferredHeight(Vector2 margin)
    @cache
    static get _GetPreferredHeight_margin() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "GetPreferredHeight", 1, ["UnityEngine.Vector2"], "pointer", ["pointer", "pointer"])
    }

    // public Vector2 GetRenderedValues()
    @cache
    static get _GetRenderedValues() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "GetRenderedValues", 0, [], "pointer", ["pointer"])
    }

    // public Vector2 GetRenderedValues(Boolean onlyVisibleCharacters)
    @cache
    static get _GetRenderedValues_onlyVisibleCharacters() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "GetRenderedValues", 1, ["System.Boolean"], "pointer", ["pointer", "pointer"])
    }

    // protected Single GetRenderedWidth()
    @cache
    static get _GetRenderedWidth() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "GetRenderedWidth", 0, [], "pointer", ["pointer"])
    }

    // protected Single GetRenderedWidth(Boolean onlyVisibleCharacters)
    @cache
    static get _GetRenderedWidth_onlyVisibleCharacters() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "GetRenderedWidth", 1, ["System.Boolean"], "pointer", ["pointer", "pointer"])
    }

    // protected Single GetRenderedHeight()
    @cache
    static get _GetRenderedHeight() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "GetRenderedHeight", 0, [], "pointer", ["pointer"])
    }

    // protected Single GetRenderedHeight(Boolean onlyVisibleCharacters)
    @cache
    static get _GetRenderedHeight_onlyVisibleCharacters() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "GetRenderedHeight", 1, ["System.Boolean"], "pointer", ["pointer", "pointer"])
    }

    // protected virtual Vector2 CalculatePreferredValues(Single defaultFontSize,Vector2 marginSize,Boolean ignoreTextAutoSizing)
    @cache
    static get _CalculatePreferredValues() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "CalculatePreferredValues", 3, ["System.Single", "UnityEngine.Vector2", "System.Boolean"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // protected virtual Bounds GetCompoundBounds()
    @cache
    static get _GetCompoundBounds() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "GetCompoundBounds", 0, [], "pointer", ["pointer"])
    }

    // protected Bounds GetTextBounds()
    @cache
    static get _GetTextBounds() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "GetTextBounds", 0, [], "pointer", ["pointer"])
    }

    // protected Bounds GetTextBounds(Boolean onlyVisibleCharacters)
    @cache
    static get _GetTextBounds_onlyVisibleCharacters() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "GetTextBounds", 1, ["System.Boolean"], "pointer", ["pointer", "pointer"])
    }

    // protected virtual Void AdjustLineOffset(Int32 startIndex,Int32 endIndex,Single offset)
    @cache
    static get _AdjustLineOffset() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "AdjustLineOffset", 3, ["System.Int32", "System.Int32", "System.Single"], "void", ["pointer", "pointer", "pointer", "pointer"])
    }

    // protected Void ResizeLineExtents(Int32 size)
    @cache
    static get _ResizeLineExtents() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "ResizeLineExtents", 1, ["System.Int32"], "void", ["pointer", "pointer"])
    }

    // public virtual TMP_TextInfo GetTextInfo(String text)
    @cache
    static get _GetTextInfo() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "GetTextInfo", 1, ["System.String"], "pointer", ["pointer", "pointer"])
    }

    // public virtual Void ComputeMarginSize()
    @cache
    static get _ComputeMarginSize() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "ComputeMarginSize", 0, [], "void", ["pointer"])
    }

    // protected Void SaveWordWrappingState(WordWrapState state,Int32 index,Int32 count)
    @cache
    static get _SaveWordWrappingState() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "SaveWordWrappingState", 3, ["TMPro.WordWrapState", "System.Int32", "System.Int32"], "void", ["pointer", "pointer", "pointer", "pointer"])
    }

    // protected Int32 RestoreWordWrappingState(WordWrapState state)
    @cache
    static get _RestoreWordWrappingState() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "RestoreWordWrappingState", 1, ["TMPro.WordWrapState"], "pointer", ["pointer", "pointer"])
    }

    // protected virtual Void SaveGlyphVertexInfo(Single padding,Single style_padding,Color32 vertexColor)
    @cache
    static get _SaveGlyphVertexInfo() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "SaveGlyphVertexInfo", 3, ["System.Single", "System.Single", "UnityEngine.Color32"], "void", ["pointer", "pointer", "pointer", "pointer"])
    }

    // protected virtual Void SaveSpriteVertexInfo(Color32 vertexColor)
    @cache
    static get _SaveSpriteVertexInfo() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "SaveSpriteVertexInfo", 1, ["UnityEngine.Color32"], "void", ["pointer", "pointer"])
    }

    // protected virtual Void FillCharacterVertexBuffers(Int32 i,Int32 index_X4)
    @cache
    static get _FillCharacterVertexBuffers() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "FillCharacterVertexBuffers", 2, ["System.Int32", "System.Int32"], "void", ["pointer", "pointer", "pointer"])
    }

    // protected virtual Void FillCharacterVertexBuffers(Int32 i,Int32 index_X4,Boolean isVolumetric)
    @cache
    static get _FillCharacterVertexBuffers_i_index_X4_isVolumetric() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "FillCharacterVertexBuffers", 3, ["System.Int32", "System.Int32", "System.Boolean"], "void", ["pointer", "pointer", "pointer", "pointer"])
    }

    // protected virtual Void FillSpriteVertexBuffers(Int32 i,Int32 index_X4)
    @cache
    static get _FillSpriteVertexBuffers() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "FillSpriteVertexBuffers", 2, ["System.Int32", "System.Int32"], "void", ["pointer", "pointer", "pointer"])
    }

    // protected virtual Void DrawUnderlineMesh(Vector3 start,Vector3 end,Int32 index,Single startScale,Single endScale,Single maxScale,Single sdfScale,Color32 underlineColor)
    @cache
    static get _DrawUnderlineMesh() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "DrawUnderlineMesh", 8, ["UnityEngine.Vector3", "UnityEngine.Vector3", "System.Int32", "System.Single", "System.Single", "System.Single", "System.Single", "UnityEngine.Color32"], "void", ["pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // protected virtual Void DrawTextHighlight(Vector3 start,Vector3 end,Int32 index,Color32 highlightColor)
    @cache
    static get _DrawTextHighlight() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "DrawTextHighlight", 4, ["UnityEngine.Vector3", "UnityEngine.Vector3", "System.Int32", "UnityEngine.Color32"], "void", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // protected Void LoadDefaultSettings()
    @cache
    static get _LoadDefaultSettings() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "LoadDefaultSettings", 0, [], "void", ["pointer"])
    }

    // protected Void GetSpecialCharacters(TMP_FontAsset fontAsset)
    @cache
    static get _GetSpecialCharacters() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "GetSpecialCharacters", 1, ["TMPro.TMP_FontAsset"], "void", ["pointer", "pointer"])
    }

    // protected Void ReplaceTagWithCharacter(Int32[] chars,Int32 insertionIndex,Int32 tagLength,Char c)
    @cache
    static get _ReplaceTagWithCharacter() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "ReplaceTagWithCharacter", 4, ["System.Int32[]", "System.Int32", "System.Int32", "System.Char"], "void", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // protected TMP_FontAsset GetFontAssetForWeight(Int32 fontWeight)
    @cache
    static get _GetFontAssetForWeight() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "GetFontAssetForWeight", 1, ["System.Int32"], "pointer", ["pointer", "pointer"])
    }

    // protected virtual Void SetActiveSubMeshes(Boolean state)
    @cache
    static get _SetActiveSubMeshes() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "SetActiveSubMeshes", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // protected virtual Void ClearSubMeshObjects()
    @cache
    static get _ClearSubMeshObjects() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "ClearSubMeshObjects", 0, [], "void", ["pointer"])
    }

    // public virtual Void ClearMesh()
    @cache
    static get _ClearMesh() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "ClearMesh", 0, [], "void", ["pointer"])
    }

    // public virtual Void ClearMesh(Boolean uploadGeometry)
    @cache
    static get _ClearMesh_uploadGeometry() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "ClearMesh", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // public virtual String GetParsedText()
    @cache
    static get _GetParsedText() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "GetParsedText", 0, [], "pointer", ["pointer"])
    }

    // protected Vector2 PackUV(Single x,Single y,Single scale)
    @cache
    static get _PackUV() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "PackUV", 3, ["System.Single", "System.Single", "System.Single"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // protected Single PackUV(Single x,Single y)
    @cache
    static get _PackUV_x_y() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "PackUV", 2, ["System.Single", "System.Single"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // internal virtual Void InternalUpdate()
    @cache
    static get _InternalUpdate() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "InternalUpdate", 0, [], "void", ["pointer"])
    }

    // protected Int32 HexToInt(Char hex)
    @cache
    static get _HexToInt() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "HexToInt", 1, ["System.Char"], "pointer", ["pointer", "pointer"])
    }

    // protected Int32 GetUTF16(String text,Int32 i)
    @cache
    static get _GetUTF16() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "GetUTF16", 2, ["System.String", "System.Int32"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // protected Int32 GetUTF16(StringBuilder text,Int32 i)
    @cache
    static get _GetUTF16_text_i() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "GetUTF16", 2, ["System.Text.StringBuilder", "System.Int32"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // protected Int32 GetUTF32(String text,Int32 i)
    @cache
    static get _GetUTF32() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "GetUTF32", 2, ["System.String", "System.Int32"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // protected Int32 GetUTF32(StringBuilder text,Int32 i)
    @cache
    static get _GetUTF32_text_i() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "GetUTF32", 2, ["System.Text.StringBuilder", "System.Int32"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // protected Color32 HexCharsToColor(Char[] hexChars,Int32 tagCount)
    @cache
    static get _HexCharsToColor() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "HexCharsToColor", 2, ["System.Char[]", "System.Int32"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // protected Color32 HexCharsToColor(Char[] hexChars,Int32 startIndex,Int32 length)
    @cache
    static get _HexCharsToColor_hexChars_startIndex_length() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "HexCharsToColor", 3, ["System.Char[]", "System.Int32", "System.Int32"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // private Int32 GetAttributeParameters(Char[] chars,Int32 startIndex,Int32 length,Single[] parameters)
    @cache
    static get _GetAttributeParameters() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "GetAttributeParameters", 4, ["System.Char[]", "System.Int32", "System.Int32", "System.Single[]"], "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // protected Single ConvertToFloat(Char[] chars,Int32 startIndex,Int32 length)
    @cache
    static get _ConvertToFloat() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "ConvertToFloat", 3, ["System.Char[]", "System.Int32", "System.Int32"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // protected Single ConvertToFloat(Char[] chars,Int32 startIndex,Int32 length,Int32 lastIndex)
    @cache
    static get _ConvertToFloat_chars_startIndex_length_lastIndex() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "ConvertToFloat", 4, ["System.Char[]", "System.Int32", "System.Int32", "System.Int32"], "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // protected Boolean ValidateHtmlTag(UnicodeChar[] chars,Int32 startIndex,Int32 endIndex)
    @cache
    static get _ValidateHtmlTag() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", "ValidateHtmlTag", 3, ["TMPro.TMP_Text.UnicodeChar[]", "System.Int32", "System.Int32"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // protected Void .ctor()
    @cache
    static get __ctor() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", ".ctor", 0, [], "void", ["pointer"])
    }

    // private static Void .cctor()
    @cache
    static get __cctor() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_Text", ".cctor", 0, [], "void", [])
    }

}

Il2Cpp.Api.TMP_Text = TMPro_TMP_Text_API

declare global {
    namespace Il2Cpp.Api {
        class TMP_Text extends TMPro_TMP_Text_API { }
    }
}

export { }