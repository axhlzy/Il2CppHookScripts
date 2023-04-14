import { UnityEngine_MeshRenderer_Impl as UnityEngine_MeshRenderer } from "../../../../../../Renderer/MeshRenderer/class"
import { UnityEngine_RectTransform as RectTransform } from "../../../../../../Transform/RectTransform/class"
import { UnityEngine_Matrix4x4_Impl as Matrix4x4 } from "../../../../../../../../ValueType/Matrix4x4/class"
import { UnityEngine_Color32_Impl as Color32 } from "../../../../../../../../ValueType/Color32/class"
import { UnityEngine_Vector2_Impl as Vector2 } from "../../../../../../../../ValueType/Vector2/class"
import { UnityEngine_Vector3_Impl as Vector3 } from "../../../../../../../../ValueType/Vector3/class"
import { UnityEngine_Vector4_Impl as Vector4 } from "../../../../../../../../ValueType/Vector4/class"
import { UnityEngine_Color_Impl as Color } from "../../../../../../../../ValueType/Color/class"
import { UnityEngine_Material_Impl as Material } from "../../../../../../../Material/class"
import { UnityEngine_Transform_Impl as Transform } from "../../../../../../Transform/class"
import { UnityEngine_UI_MaskableGraphic_Impl as MaskableGraphic } from "../class"

type TMPro_TMP_FontAsset = NativePointer
type TMPro_MaterialReference = NativePointer
type TMPro_ColorMode = NativePointer
type TMPro_VertexGradient = NativePointer
type TMPro_TMP_ColorGradient = NativePointer
type TMPro_TMP_SpriteAsset = NativePointer
type TMPro_FontWeight = NativePointer
type TMPro_FontStyles = NativePointer
type TMPro_TMP_FontStyleStack = NativePointer
type TMPro_TextAlignmentOptions = NativePointer
type TMPro_TextOverflowModes = NativePointer
type TMPro_TextureMappingOptions = NativePointer
type TMPro_TMP_TextInfo = NativePointer
type TMPro_TextRenderFlags = NativePointer
type TMPro_VertexSortingOrder = NativePointer
type UnityEngine_UI_LayoutElement = NativePointer
type TMPro_TMP_SpriteAnimator = NativePointer
type TMPro_TMP_Text_TextInputSources = NativePointer
type System_Char = NativePointer
type TMPro_RichTextTagAttribute = NativePointer
type TMPro_WordWrapState = NativePointer
type TMPro_Extents = NativePointer
type TMPro_TMP_TextElementType = NativePointer
type UnityEngine_Material_array = NativePointer
type TMPro_TMP_TextElement = NativePointer
type TMPro_TMP_Character = NativePointer
type UnityEngine_Mesh = NativePointer
type UnityEngine_Bounds = NativePointer
type TMPro_TMP_VertexDataUpdateFlags = NativePointer
type System_Boolean = NativePointer
type System_Single = NativePointer
type System_Int32 = NativePointer
type System_Text_StringBuilder = NativePointer
type TMPro_TMP_Text_UnicodeChar = NativePointer
type System_String = NativePointer

class TMPro_TMP_Text_Impl extends MaskableGraphic {

    m_text: string = lfv(this.handle, "m_text") as unknown as string
    m_isRightToLeft: boolean = lfv(this.handle, "m_isRightToLeft") as unknown as boolean
    m_fontAsset: TMPro_TMP_FontAsset = lfv(this.handle, "m_fontAsset") as unknown as TMPro_TMP_FontAsset
    m_currentFontAsset: TMPro_TMP_FontAsset = lfv(this.handle, "m_currentFontAsset") as unknown as TMPro_TMP_FontAsset
    m_isSDFShader: boolean = lfv(this.handle, "m_isSDFShader") as unknown as boolean
    m_sharedMaterial: Material = lfv(this.handle, "m_sharedMaterial") as unknown as Material
    m_currentMaterial: Material = lfv(this.handle, "m_currentMaterial") as unknown as Material
    m_materialReferences: TMPro_MaterialReference[] = lfv(this.handle, "m_materialReferences") as unknown as TMPro_MaterialReference[]
    // m_materialReferenceIndexLookup: System_CollectionsGeneric.Dictionary<System.Int32, System.Int32> = lfv(this.handle, "m_materialReferenceIndexLookup") as unknown as System_Collections.Generic.Dictionary<System.Int32, System.Int32>
    // m_materialReferenceStack: TMPro_TMP_RichTextTagStack<TMPro.MaterialReference> = lfv(this.handle, "m_materialReferenceStack") as unknown as TMPro_TMP_RichTextTagStack<TMPro.MaterialReference>
    m_currentMaterialIndex: number = lfv(this.handle, "m_currentMaterialIndex") as unknown as number
    m_fontSharedMaterials: Material[] = lfv(this.handle, "m_fontSharedMaterials") as unknown as Material[]
    m_fontMaterial: Material = lfv(this.handle, "m_fontMaterial") as unknown as Material
    m_fontMaterials: Material[] = lfv(this.handle, "m_fontMaterials") as unknown as Material[]
    m_isMaterialDirty: boolean = lfv(this.handle, "m_isMaterialDirty") as unknown as boolean
    m_fontColor32: Color32 = lfv(this.handle, "m_fontColor32") as unknown as Color32
    m_fontColor: Color = lfv(this.handle, "m_fontColor") as unknown as Color
    s_colorWhite: Color32 = lfv(this.handle, "s_colorWhite") as unknown as Color32
    m_underlineColor: Color32 = lfv(this.handle, "m_underlineColor") as unknown as Color32
    m_strikethroughColor: Color32 = lfv(this.handle, "m_strikethroughColor") as unknown as Color32
    m_highlightColor: Color32 = lfv(this.handle, "m_highlightColor") as unknown as Color32
    m_highlightPadding: Vector4 = lfv(this.handle, "m_highlightPadding") as unknown as Vector4
    m_enableVertexGradient: boolean = lfv(this.handle, "m_enableVertexGradient") as unknown as boolean
    m_colorMode: TMPro_ColorMode = lfv(this.handle, "m_colorMode") as unknown as TMPro_ColorMode
    m_fontColorGradient: TMPro_VertexGradient = lfv(this.handle, "m_fontColorGradient") as unknown as TMPro_VertexGradient
    m_fontColorGradientPreset: TMPro_TMP_ColorGradient = lfv(this.handle, "m_fontColorGradientPreset") as unknown as TMPro_TMP_ColorGradient
    m_spriteAsset: TMPro_TMP_SpriteAsset = lfv(this.handle, "m_spriteAsset") as unknown as TMPro_TMP_SpriteAsset
    m_tintAllSprites: boolean = lfv(this.handle, "m_tintAllSprites") as unknown as boolean
    m_tintSprite: boolean = lfv(this.handle, "m_tintSprite") as unknown as boolean
    m_spriteColor: Color32 = lfv(this.handle, "m_spriteColor") as unknown as Color32
    m_overrideHtmlColors: boolean = lfv(this.handle, "m_overrideHtmlColors") as unknown as boolean
    m_faceColor: Color32 = lfv(this.handle, "m_faceColor") as unknown as Color32
    m_outlineColor: Color32 = lfv(this.handle, "m_outlineColor") as unknown as Color32
    m_outlineWidth: number = lfv(this.handle, "m_outlineWidth") as unknown as number
    m_fontSize: number = lfv(this.handle, "m_fontSize") as unknown as number
    m_currentFontSize: number = lfv(this.handle, "m_currentFontSize") as unknown as number
    m_fontSizeBase: number = lfv(this.handle, "m_fontSizeBase") as unknown as number
    // m_sizeStack: TMPro_TMP_RichTextTagStack<System.Single> = lfv(this.handle, "m_sizeStack") as unknown as TMPro_TMP_RichTextTagStack<System.Single>
    m_fontWeight: TMPro_FontWeight = lfv(this.handle, "m_fontWeight") as unknown as TMPro_FontWeight
    m_FontWeightInternal: TMPro_FontWeight = lfv(this.handle, "m_FontWeightInternal") as unknown as TMPro_FontWeight
    // m_FontWeightStack: TMPro_TMP_RichTextTagStack<TMPro.FontWeight> = lfv(this.handle, "m_FontWeightStack") as unknown as TMPro_TMP_RichTextTagStack<TMPro.FontWeight>
    m_enableAutoSizing: boolean = lfv(this.handle, "m_enableAutoSizing") as unknown as boolean
    m_maxFontSize: number = lfv(this.handle, "m_maxFontSize") as unknown as number
    m_minFontSize: number = lfv(this.handle, "m_minFontSize") as unknown as number
    m_fontSizeMin: number = lfv(this.handle, "m_fontSizeMin") as unknown as number
    m_fontSizeMax: number = lfv(this.handle, "m_fontSizeMax") as unknown as number
    m_fontStyle: TMPro_FontStyles = lfv(this.handle, "m_fontStyle") as unknown as TMPro_FontStyles
    m_FontStyleInternal: TMPro_FontStyles = lfv(this.handle, "m_FontStyleInternal") as unknown as TMPro_FontStyles
    m_fontStyleStack: TMPro_TMP_FontStyleStack = lfv(this.handle, "m_fontStyleStack") as unknown as TMPro_TMP_FontStyleStack
    m_isUsingBold: boolean = lfv(this.handle, "m_isUsingBold") as unknown as boolean
    m_textAlignment: TMPro_TextAlignmentOptions = lfv(this.handle, "m_textAlignment") as unknown as TMPro_TextAlignmentOptions
    m_lineJustification: TMPro_TextAlignmentOptions = lfv(this.handle, "m_lineJustification") as unknown as TMPro_TextAlignmentOptions
    // m_lineJustificationStack: TMPro_TMP_RichTextTagStack<TMPro.TextAlignmentOptions> = lfv(this.handle, "m_lineJustificationStack") as unknown as TMPro_TMP_RichTextTagStack<TMPro.TextAlignmentOptions>
    m_textContainerLocalCorners: Vector3[] = lfv(this.handle, "m_textContainerLocalCorners") as unknown as Vector3[]
    m_characterSpacing: number = lfv(this.handle, "m_characterSpacing") as unknown as number
    m_cSpacing: number = lfv(this.handle, "m_cSpacing") as unknown as number
    m_monoSpacing: number = lfv(this.handle, "m_monoSpacing") as unknown as number
    m_wordSpacing: number = lfv(this.handle, "m_wordSpacing") as unknown as number
    m_lineSpacing: number = lfv(this.handle, "m_lineSpacing") as unknown as number
    m_lineSpacingDelta: number = lfv(this.handle, "m_lineSpacingDelta") as unknown as number
    m_lineHeight: number = lfv(this.handle, "m_lineHeight") as unknown as number
    m_lineSpacingMax: number = lfv(this.handle, "m_lineSpacingMax") as unknown as number
    m_paragraphSpacing: number = lfv(this.handle, "m_paragraphSpacing") as unknown as number
    m_charWidthMaxAdj: number = lfv(this.handle, "m_charWidthMaxAdj") as unknown as number
    m_charWidthAdjDelta: number = lfv(this.handle, "m_charWidthAdjDelta") as unknown as number
    m_enableWordWrapping: boolean = lfv(this.handle, "m_enableWordWrapping") as unknown as boolean
    m_isCharacterWrappingEnabled: boolean = lfv(this.handle, "m_isCharacterWrappingEnabled") as unknown as boolean
    m_isNonBreakingSpace: boolean = lfv(this.handle, "m_isNonBreakingSpace") as unknown as boolean
    m_isIgnoringAlignment: boolean = lfv(this.handle, "m_isIgnoringAlignment") as unknown as boolean
    m_wordWrappingRatios: number = lfv(this.handle, "m_wordWrappingRatios") as unknown as number
    m_overflowMode: TMPro_TextOverflowModes = lfv(this.handle, "m_overflowMode") as unknown as TMPro_TextOverflowModes
    m_firstOverflowCharacterIndex: number = lfv(this.handle, "m_firstOverflowCharacterIndex") as unknown as number
    m_linkedTextComponent: TMPro_TMP_Text_Impl = lfv(this.handle, "m_linkedTextComponent") as unknown as TMPro_TMP_Text_Impl
    m_isLinkedTextComponent: boolean = lfv(this.handle, "m_isLinkedTextComponent") as unknown as boolean
    m_isTextTruncated: boolean = lfv(this.handle, "m_isTextTruncated") as unknown as boolean
    m_enableKerning: boolean = lfv(this.handle, "m_enableKerning") as unknown as boolean
    m_enableExtraPadding: boolean = lfv(this.handle, "m_enableExtraPadding") as unknown as boolean
    checkPaddingRequired: boolean = lfv(this.handle, "checkPaddingRequired") as unknown as boolean
    m_isRichText: boolean = lfv(this.handle, "m_isRichText") as unknown as boolean
    m_parseCtrlCharacters: boolean = lfv(this.handle, "m_parseCtrlCharacters") as unknown as boolean
    m_isOverlay: boolean = lfv(this.handle, "m_isOverlay") as unknown as boolean
    m_isOrthographic: boolean = lfv(this.handle, "m_isOrthographic") as unknown as boolean
    m_isCullingEnabled: boolean = lfv(this.handle, "m_isCullingEnabled") as unknown as boolean
    m_ignoreRectMaskCulling: boolean = lfv(this.handle, "m_ignoreRectMaskCulling") as unknown as boolean
    m_ignoreCulling: boolean = lfv(this.handle, "m_ignoreCulling") as unknown as boolean
    m_horizontalMapping: TMPro_TextureMappingOptions = lfv(this.handle, "m_horizontalMapping") as unknown as TMPro_TextureMappingOptions
    m_verticalMapping: TMPro_TextureMappingOptions = lfv(this.handle, "m_verticalMapping") as unknown as TMPro_TextureMappingOptions
    m_uvLineOffset: number = lfv(this.handle, "m_uvLineOffset") as unknown as number
    m_renderMode: TMPro_TextRenderFlags = lfv(this.handle, "m_renderMode") as unknown as TMPro_TextRenderFlags
    m_geometrySortingOrder: TMPro_VertexSortingOrder = lfv(this.handle, "m_geometrySortingOrder") as unknown as TMPro_VertexSortingOrder
    m_VertexBufferAutoSizeReduction: boolean = lfv(this.handle, "m_VertexBufferAutoSizeReduction") as unknown as boolean
    m_firstVisibleCharacter: number = lfv(this.handle, "m_firstVisibleCharacter") as unknown as number
    m_maxVisibleCharacters: number = lfv(this.handle, "m_maxVisibleCharacters") as unknown as number
    m_maxVisibleWords: number = lfv(this.handle, "m_maxVisibleWords") as unknown as number
    m_maxVisibleLines: number = lfv(this.handle, "m_maxVisibleLines") as unknown as number
    m_useMaxVisibleDescender: boolean = lfv(this.handle, "m_useMaxVisibleDescender") as unknown as boolean
    m_pageToDisplay: number = lfv(this.handle, "m_pageToDisplay") as unknown as number
    m_isNewPage: boolean = lfv(this.handle, "m_isNewPage") as unknown as boolean
    m_margin: Vector4 = lfv(this.handle, "m_margin") as unknown as Vector4
    m_marginLeft: number = lfv(this.handle, "m_marginLeft") as unknown as number
    m_marginRight: number = lfv(this.handle, "m_marginRight") as unknown as number
    m_marginWidth: number = lfv(this.handle, "m_marginWidth") as unknown as number
    m_marginHeight: number = lfv(this.handle, "m_marginHeight") as unknown as number
    m_width: number = lfv(this.handle, "m_width") as unknown as number
    m_textInfo: TMPro_TMP_TextInfo = lfv(this.handle, "m_textInfo") as unknown as TMPro_TMP_TextInfo
    m_havePropertiesChanged: boolean = lfv(this.handle, "m_havePropertiesChanged") as unknown as boolean
    m_isUsingLegacyAnimationComponent: boolean = lfv(this.handle, "m_isUsingLegacyAnimationComponent") as unknown as boolean
    m_transform: Transform = new Transform(lfv(this.handle, "m_transform"))
    m_rectTransform: RectTransform = new RectTransform(lfv(this.handle, "m_rectTransform"))
    // < autoSizeTextContainer > k__BackingField: boolean = lfv(this.handle, "<autoSizeTextContainer>k__BackingField") as unknown as boolean
    m_autoSizeTextContainer: boolean = lfv(this.handle, "m_autoSizeTextContainer") as unknown as boolean
    m_mesh: UnityEngine_MeshRenderer = lfv(this.handle, "m_mesh") as unknown as UnityEngine_MeshRenderer
    m_isVolumetricText: boolean = lfv(this.handle, "m_isVolumetricText") as unknown as boolean
    m_spriteAnimator: TMPro_TMP_SpriteAnimator = lfv(this.handle, "m_spriteAnimator") as unknown as TMPro_TMP_SpriteAnimator
    m_flexibleHeight: number = lfv(this.handle, "m_flexibleHeight") as unknown as number
    m_flexibleWidth: number = lfv(this.handle, "m_flexibleWidth") as unknown as number
    m_minWidth: number = lfv(this.handle, "m_minWidth") as unknown as number
    m_minHeight: number = lfv(this.handle, "m_minHeight") as unknown as number
    m_maxWidth: number = lfv(this.handle, "m_maxWidth") as unknown as number
    m_maxHeight: number = lfv(this.handle, "m_maxHeight") as unknown as number
    m_LayoutElement: UnityEngine_UI_LayoutElement = lfv(this.handle, "m_LayoutElement") as unknown as UnityEngine_UI_LayoutElement
    m_preferredWidth: number = lfv(this.handle, "m_preferredWidth") as unknown as number
    m_renderedWidth: number = lfv(this.handle, "m_renderedWidth") as unknown as number
    m_isPreferredWidthDirty: boolean = lfv(this.handle, "m_isPreferredWidthDirty") as unknown as boolean
    m_preferredHeight: number = lfv(this.handle, "m_preferredHeight") as unknown as number
    m_renderedHeight: number = lfv(this.handle, "m_renderedHeight") as unknown as number
    m_isPreferredHeightDirty: boolean = lfv(this.handle, "m_isPreferredHeightDirty") as unknown as boolean
    m_isCalculatingPreferredValues: boolean = lfv(this.handle, "m_isCalculatingPreferredValues") as unknown as boolean
    m_recursiveCount: number = lfv(this.handle, "m_recursiveCount") as unknown as number
    m_layoutPriority: number = lfv(this.handle, "m_layoutPriority") as unknown as number
    m_isCalculateSizeRequired: boolean = lfv(this.handle, "m_isCalculateSizeRequired") as unknown as boolean
    m_isLayoutDirty: boolean = lfv(this.handle, "m_isLayoutDirty") as unknown as boolean
    m_verticesAlreadyDirty: boolean = lfv(this.handle, "m_verticesAlreadyDirty") as unknown as boolean
    m_layoutAlreadyDirty: boolean = lfv(this.handle, "m_layoutAlreadyDirty") as unknown as boolean
    m_isAwake: boolean = lfv(this.handle, "m_isAwake") as unknown as boolean
    m_isWaitingOnResourceLoad: boolean = lfv(this.handle, "m_isWaitingOnResourceLoad") as unknown as boolean
    m_isInputParsingRequired: boolean = lfv(this.handle, "m_isInputParsingRequired") as unknown as boolean
    m_inputSource: TMPro_TMP_Text_TextInputSources = lfv(this.handle, "m_inputSource") as unknown as TMPro_TMP_Text_TextInputSources
    old_text: string = lfv(this.handle, "old_text") as unknown as string
    m_fontScale: number = lfv(this.handle, "m_fontScale") as unknown as number
    m_fontScaleMultiplier: number = lfv(this.handle, "m_fontScaleMultiplier") as unknown as number
    m_htmlTag: System_Char[] = lfv(this.handle, "m_htmlTag") as unknown as System_Char[]
    m_xmlAttribute: TMPro_RichTextTagAttribute[] = lfv(this.handle, "m_xmlAttribute") as unknown as TMPro_RichTextTagAttribute[]
    m_attributeParameterValues: number[] = lfv(this.handle, "m_attributeParameterValues") as unknown as number[]
    tag_LineIndent: number = lfv(this.handle, "tag_LineIndent") as unknown as number
    tag_Indent: number = lfv(this.handle, "tag_Indent") as unknown as number
    // m_indentStack: TMPro_TMP_RichTextTagStack<System.Single> = lfv(this.handle, "m_indentStack") as unknown as TMPro_TMP_RichTextTagStack<System.Single>
    tag_NoParsing: boolean = lfv(this.handle, "tag_NoParsing") as unknown as boolean
    m_isParsingText: boolean = lfv(this.handle, "m_isParsingText") as unknown as boolean
    m_FXMatrix: Matrix4x4 = lfv(this.handle, "m_FXMatrix") as unknown as Matrix4x4
    m_isFXMatrixSet: boolean = lfv(this.handle, "m_isFXMatrixSet") as unknown as boolean
    // m_TextParsingBuffer: TMPro_TMP_Text_UnicodeChar[] = lfv(this.handle, "m_TextParsingBuffer") as unknown as TMPro_TMP_Text_UnicodeChar[]
    // m_internalCharacterInfo: TMPro_TMP_CharacterInfo[] = lfv(this.handle, "m_internalCharacterInfo") as unknown as TMPro_TMP_CharacterInfo[]
    m_input_CharArray: System_Char[] = lfv(this.handle, "m_input_CharArray") as unknown as System_Char[]
    m_charArray_Length: number = lfv(this.handle, "m_charArray_Length") as unknown as number
    m_totalCharacterCount: number = lfv(this.handle, "m_totalCharacterCount") as unknown as number
    m_SavedWordWrapState: TMPro_WordWrapState = lfv(this.handle, "m_SavedWordWrapState") as unknown as TMPro_WordWrapState
    m_SavedLineState: TMPro_WordWrapState = lfv(this.handle, "m_SavedLineState") as unknown as TMPro_WordWrapState
    m_characterCount: number = lfv(this.handle, "m_characterCount") as unknown as number
    m_firstCharacterOfLine: number = lfv(this.handle, "m_firstCharacterOfLine") as unknown as number
    m_firstVisibleCharacterOfLine: number = lfv(this.handle, "m_firstVisibleCharacterOfLine") as unknown as number
    m_lastCharacterOfLine: number = lfv(this.handle, "m_lastCharacterOfLine") as unknown as number
    m_lastVisibleCharacterOfLine: number = lfv(this.handle, "m_lastVisibleCharacterOfLine") as unknown as number
    m_lineNumber: number = lfv(this.handle, "m_lineNumber") as unknown as number
    m_lineVisibleCharacterCount: number = lfv(this.handle, "m_lineVisibleCharacterCount") as unknown as number
    m_pageNumber: number = lfv(this.handle, "m_pageNumber") as unknown as number
    m_maxAscender: number = lfv(this.handle, "m_maxAscender") as unknown as number
    m_maxCapHeight: number = lfv(this.handle, "m_maxCapHeight") as unknown as number
    m_maxDescender: number = lfv(this.handle, "m_maxDescender") as unknown as number
    m_maxLineAscender: number = lfv(this.handle, "m_maxLineAscender") as unknown as number
    m_maxLineDescender: number = lfv(this.handle, "m_maxLineDescender") as unknown as number
    m_startOfLineAscender: number = lfv(this.handle, "m_startOfLineAscender") as unknown as number
    m_lineOffset: number = lfv(this.handle, "m_lineOffset") as unknown as number
    m_meshExtents: TMPro_Extents = lfv(this.handle, "m_meshExtents") as unknown as TMPro_Extents
    m_htmlColor: Color32 = lfv(this.handle, "m_htmlColor") as unknown as Color32
    // m_colorStack: TMPro_TMP_RichTextTagStack<UnityEngine.Color32> = lfv(this.handle, "m_colorStack") as unknown as TMPro_TMP_RichTextTagStack<UnityEngine.Color32>
    // m_underlineColorStack: TMPro_TMP_RichTextTagStack<UnityEngine.Color32> = lfv(this.handle, "m_underlineColorStack") as unknown as TMPro_TMP_RichTextTagStack<UnityEngine.Color32>
    // m_strikethroughColorStack: TMPro_TMP_RichTextTagStack<UnityEngine.Color32> = lfv(this.handle, "m_strikethroughColorStack") as unknown as TMPro_TMP_RichTextTagStack<UnityEngine.Color32>
    // m_highlightColorStack: TMPro_TMP_RichTextTagStack<UnityEngine.Color32> = lfv(this.handle, "m_highlightColorStack") as unknown as TMPro_TMP_RichTextTagStack<UnityEngine.Color32>
    // m_colorGradientPreset: TMPro_TMP_ColorGradient = lfv(this.handle, "m_colorGradientPreset") as unknown as TMPro_TMP_ColorGradient
    // m_colorGradientStack: TMPro_TMP_RichTextTagStack<TMPro.TMP_ColorGradient> = lfv(this.handle, "m_colorGradientStack") as unknown as TMPro_TMP_RichTextTagStack<TMPro.TMP_ColorGradient>
    m_tabSpacing: number = lfv(this.handle, "m_tabSpacing") as unknown as number
    m_spacing: number = lfv(this.handle, "m_spacing") as unknown as number
    // m_styleStack: TMPro_TMP_RichTextTagStack<System.Int32> = lfv(this.handle, "m_styleStack") as unknown as TMPro_TMP_RichTextTagStack<System.Int32>
    // m_actionStack: TMPro_TMP_RichTextTagStack<System.Int32> = lfv(this.handle, "m_actionStack") as unknown as TMPro_TMP_RichTextTagStack<System.Int32>
    m_padding: number = lfv(this.handle, "m_padding") as unknown as number
    m_baselineOffset: number = lfv(this.handle, "m_baselineOffset") as unknown as number
    // m_baselineOffsetStack: TMPro_TMP_RichTextTagStack<System.Single> = lfv(this.handle, "m_baselineOffsetStack") as unknown as TMPro_TMP_RichTextTagStack<System.Single>
    m_xAdvance: number = lfv(this.handle, "m_xAdvance") as unknown as number
    m_textElementType: TMPro_TMP_TextElementType = lfv(this.handle, "m_textElementType") as unknown as TMPro_TMP_TextElementType
    m_cached_TextElement: TMPro_TMP_TextElement = lfv(this.handle, "m_cached_TextElement") as unknown as TMPro_TMP_TextElement
    m_cached_Underline_Character: TMPro_TMP_Character = lfv(this.handle, "m_cached_Underline_Character") as unknown as TMPro_TMP_Character
    m_cached_Ellipsis_Character: TMPro_TMP_Character = lfv(this.handle, "m_cached_Ellipsis_Character") as unknown as TMPro_TMP_Character
    m_defaultSpriteAsset: TMPro_TMP_SpriteAsset = lfv(this.handle, "m_defaultSpriteAsset") as unknown as TMPro_TMP_SpriteAsset
    m_currentSpriteAsset: TMPro_TMP_SpriteAsset = lfv(this.handle, "m_currentSpriteAsset") as unknown as TMPro_TMP_SpriteAsset
    m_spriteCount: number = lfv(this.handle, "m_spriteCount") as unknown as number
    m_spriteIndex: number = lfv(this.handle, "m_spriteIndex") as unknown as number
    m_spriteAnimationID: number = lfv(this.handle, "m_spriteAnimationID") as unknown as number
    m_ignoreActiveState: boolean = lfv(this.handle, "m_ignoreActiveState") as unknown as boolean
    k_Power: number[] = lfv(this.handle, "k_Power") as unknown as number[]
    k_LargePositiveVector2: Vector2 = lfv(this.handle, "k_LargePositiveVector2") as unknown as Vector2
    k_LargeNegativeVector2: Vector2 = lfv(this.handle, "k_LargeNegativeVector2") as unknown as Vector2
    k_LargePositiveFloat: number = lfv(this.handle, "k_LargePositiveFloat") as unknown as number
    k_LargeNegativeFloat: number = lfv(this.handle, "k_LargeNegativeFloat") as unknown as number
    k_LargePositiveInt: number = lfv(this.handle, "k_LargePositiveInt") as unknown as number
    k_LargeNegativeInt: number = lfv(this.handle, "k_LargeNegativeInt") as unknown as number
    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }
    get_text(): string {
        return readU16(Il2Cpp.Api.TMP_Text._get_text(this.handle))
    }

    set_text(value: string): void {
        return Il2Cpp.Api.TMP_Text._set_text(this.handle, value)
    }

    get_isRightToLeftText(): boolean {
        return Il2Cpp.Api.TMP_Text._get_isRightToLeftText(this.handle)
    }

    set_isRightToLeftText(value: boolean): void {
        return Il2Cpp.Api.TMP_Text._set_isRightToLeftText(this.handle, value)
    }

    get_font(): TMPro_TMP_FontAsset {
        return Il2Cpp.Api.TMP_Text._get_font(this.handle)
    }

    set_font(value: TMPro_TMP_FontAsset): void {
        return Il2Cpp.Api.TMP_Text._set_font(this.handle, value)
    }

    get_fontSharedMaterial(): Material {
        return Il2Cpp.Api.TMP_Text._get_fontSharedMaterial(this.handle)
    }

    set_fontSharedMaterial(value: Material): void {
        return Il2Cpp.Api.TMP_Text._set_fontSharedMaterial(this.handle, value)
    }

    get_fontSharedMaterials(): Material[] {
        return Il2Cpp.Api.TMP_Text._get_fontSharedMaterials(this.handle)
    }

    set_fontSharedMaterials(value: Material[]): void {
        return Il2Cpp.Api.TMP_Text._set_fontSharedMaterials(this.handle, value)
    }

    get_fontMaterial(): Material {
        return Il2Cpp.Api.TMP_Text._get_fontMaterial(this.handle)
    }

    set_fontMaterial(value: Material): void {
        return Il2Cpp.Api.TMP_Text._set_fontMaterial(this.handle, value)
    }

    get_fontMaterials(): Material[] {
        return Il2Cpp.Api.TMP_Text._get_fontMaterials(this.handle)
    }

    set_fontMaterials(value: Material[]): void {
        return Il2Cpp.Api.TMP_Text._set_fontMaterials(this.handle, value)
    }

    get_color(): Color {
        return new Color(Il2Cpp.Api.TMP_Text._get_color(this.handle))
    }

    set_color(value: Color): void {
        return Il2Cpp.Api.TMP_Text._set_color(this.handle, value.handle)
    }

    get_alpha(): number {
        return Il2Cpp.Api.TMP_Text._get_alpha(this.handle)
    }

    set_alpha(value: number): void {
        return Il2Cpp.Api.TMP_Text._set_alpha(this.handle, value)
    }

    get_enableVertexGradient(): boolean {
        return !Il2Cpp.Api.TMP_Text._get_enableVertexGradient(this.handle).isNull()
    }

    set_enableVertexGradient(value: boolean): void {
        return Il2Cpp.Api.TMP_Text._set_enableVertexGradient(this.handle, value ? ptr(1) : ptr(0))
    }

    get_colorGradient(): TMPro_VertexGradient {
        return Il2Cpp.Api.TMP_Text._get_colorGradient(this.handle)
    }

    set_colorGradient(value: TMPro_VertexGradient): void {
        return Il2Cpp.Api.TMP_Text._set_colorGradient(this.handle, value)
    }

    get_colorGradientPreset(): TMPro_TMP_ColorGradient {
        return Il2Cpp.Api.TMP_Text._get_colorGradientPreset(this.handle)
    }

    set_colorGradientPreset(value: TMPro_TMP_ColorGradient): void {
        return Il2Cpp.Api.TMP_Text._set_colorGradientPreset(this.handle, value)
    }

    get_spriteAsset(): TMPro_TMP_SpriteAsset {
        return Il2Cpp.Api.TMP_Text._get_spriteAsset(this.handle)
    }

    set_spriteAsset(value: TMPro_TMP_SpriteAsset): void {
        return Il2Cpp.Api.TMP_Text._set_spriteAsset(this.handle, value)
    }

    get_tintAllSprites(): boolean {
        return Il2Cpp.Api.TMP_Text._get_tintAllSprites(this.handle)
    }

    set_tintAllSprites(value: boolean): void {
        return Il2Cpp.Api.TMP_Text._set_tintAllSprites(this.handle, value)
    }

    get_overrideColorTags(): boolean {
        return Il2Cpp.Api.TMP_Text._get_overrideColorTags(this.handle)
    }

    set_overrideColorTags(value: boolean): void {
        return Il2Cpp.Api.TMP_Text._set_overrideColorTags(this.handle, value)
    }

    get_faceColor(): Color32 {
        return Il2Cpp.Api.TMP_Text._get_faceColor(this.handle)
    }

    set_faceColor(value: Color32): void {
        return Il2Cpp.Api.TMP_Text._set_faceColor(this.handle, value)
    }

    get_outlineColor(): Color32 {
        return Il2Cpp.Api.TMP_Text._get_outlineColor(this.handle)
    }

    set_outlineColor(value: Color32): void {
        return Il2Cpp.Api.TMP_Text._set_outlineColor(this.handle, value)
    }

    get_outlineWidth(): number {
        return Il2Cpp.Api.TMP_Text._get_outlineWidth(this.handle)
    }

    set_outlineWidth(value: number): void {
        return Il2Cpp.Api.TMP_Text._set_outlineWidth(this.handle, value)
    }

    get_fontSize(): number {
        return Il2Cpp.Api.TMP_Text._get_fontSize(this.handle)
    }

    set_fontSize(value: number): void {
        return Il2Cpp.Api.TMP_Text._set_fontSize(this.handle, value)
    }

    get_fontScale(): number {
        return Il2Cpp.Api.TMP_Text._get_fontScale(this.handle)
    }

    get_fontWeight(): TMPro_FontWeight {
        return Il2Cpp.Api.TMP_Text._get_fontWeight(this.handle)
    }

    set_fontWeight(value: TMPro_FontWeight): void {
        return Il2Cpp.Api.TMP_Text._set_fontWeight(this.handle, value)
    }

    get_pixelsPerUnit(): number {
        return Il2Cpp.Api.TMP_Text._get_pixelsPerUnit(this.handle)
    }

    get_enableAutoSizing(): boolean {
        return Il2Cpp.Api.TMP_Text._get_enableAutoSizing(this.handle)
    }

    set_enableAutoSizing(value: boolean): void {
        return Il2Cpp.Api.TMP_Text._set_enableAutoSizing(this.handle, value)
    }

    get_fontSizeMin(): number {
        return Il2Cpp.Api.TMP_Text._get_fontSizeMin(this.handle)
    }

    set_fontSizeMin(value: number): void {
        return Il2Cpp.Api.TMP_Text._set_fontSizeMin(this.handle, value)
    }

    get_fontSizeMax(): number {
        return Il2Cpp.Api.TMP_Text._get_fontSizeMax(this.handle)
    }

    set_fontSizeMax(value: number): void {
        return Il2Cpp.Api.TMP_Text._set_fontSizeMax(this.handle, value)
    }

    get_fontStyle(): TMPro_FontStyles {
        return Il2Cpp.Api.TMP_Text._get_fontStyle(this.handle)
    }

    set_fontStyle(value: TMPro_FontStyles): void {
        return Il2Cpp.Api.TMP_Text._set_fontStyle(this.handle, value)
    }

    get_isUsingBold(): boolean {
        return Il2Cpp.Api.TMP_Text._get_isUsingBold(this.handle)
    }

    get_alignment(): TMPro_TextAlignmentOptions {
        return Il2Cpp.Api.TMP_Text._get_alignment(this.handle)
    }

    set_alignment(value: TMPro_TextAlignmentOptions): void {
        return Il2Cpp.Api.TMP_Text._set_alignment(this.handle, value)
    }

    get_characterSpacing(): number {
        return Il2Cpp.Api.TMP_Text._get_characterSpacing(this.handle)
    }

    set_characterSpacing(value: number): void {
        return Il2Cpp.Api.TMP_Text._set_characterSpacing(this.handle, value)
    }

    get_wordSpacing(): number {
        return Il2Cpp.Api.TMP_Text._get_wordSpacing(this.handle)
    }

    set_wordSpacing(value: number): void {
        return Il2Cpp.Api.TMP_Text._set_wordSpacing(this.handle, value)
    }

    get_lineSpacing(): number {
        return Il2Cpp.Api.TMP_Text._get_lineSpacing(this.handle)
    }

    set_lineSpacing(value: number): void {
        return Il2Cpp.Api.TMP_Text._set_lineSpacing(this.handle, value)
    }

    get_lineSpacingAdjustment(): number {
        return Il2Cpp.Api.TMP_Text._get_lineSpacingAdjustment(this.handle)
    }

    set_lineSpacingAdjustment(value: number): void {
        return Il2Cpp.Api.TMP_Text._set_lineSpacingAdjustment(this.handle, value)
    }

    get_paragraphSpacing(): number {
        return Il2Cpp.Api.TMP_Text._get_paragraphSpacing(this.handle)
    }

    set_paragraphSpacing(value: number): void {
        return Il2Cpp.Api.TMP_Text._set_paragraphSpacing(this.handle, value)
    }

    get_characterWidthAdjustment(): number {
        return Il2Cpp.Api.TMP_Text._get_characterWidthAdjustment(this.handle)
    }

    set_characterWidthAdjustment(value: number): void {
        return Il2Cpp.Api.TMP_Text._set_characterWidthAdjustment(this.handle, value)
    }

    get_enableWordWrapping(): boolean {
        return Il2Cpp.Api.TMP_Text._get_enableWordWrapping(this.handle)
    }

    set_enableWordWrapping(value: boolean): void {
        return Il2Cpp.Api.TMP_Text._set_enableWordWrapping(this.handle, value)
    }

    get_wordWrappingRatios(): number {
        return Il2Cpp.Api.TMP_Text._get_wordWrappingRatios(this.handle)
    }

    set_wordWrappingRatios(value: number): void {
        return Il2Cpp.Api.TMP_Text._set_wordWrappingRatios(this.handle, value)
    }

    get_overflowMode(): TMPro_TextOverflowModes {
        return Il2Cpp.Api.TMP_Text._get_overflowMode(this.handle)
    }

    set_overflowMode(value: TMPro_TextOverflowModes): void {
        return Il2Cpp.Api.TMP_Text._set_overflowMode(this.handle, value)
    }

    get_isTextOverflowing(): boolean {
        return Il2Cpp.Api.TMP_Text._get_isTextOverflowing(this.handle)
    }

    get_firstOverflowCharacterIndex(): number {
        return Il2Cpp.Api.TMP_Text._get_firstOverflowCharacterIndex(this.handle)
    }

    get_linkedTextComponent(): TMPro_TMP_Text_Impl {
        return new TMPro_TMP_Text_Impl(Il2Cpp.Api.TMP_Text._get_linkedTextComponent(this.handle))
    }

    set_linkedTextComponent(value: TMPro_TMP_Text_Impl): void {
        return Il2Cpp.Api.TMP_Text._set_linkedTextComponent(this.handle, value.handle)
    }

    get_isLinkedTextComponent(): boolean {
        return !Il2Cpp.Api.TMP_Text._get_isLinkedTextComponent(this.handle).isNull()
    }

    set_isLinkedTextComponent(value: boolean): void {
        return Il2Cpp.Api.TMP_Text._set_isLinkedTextComponent(this.handle, value ? ptr(1) : ptr(0))
    }

    get_isTextTruncated(): boolean {
        return Il2Cpp.Api.TMP_Text._get_isTextTruncated(this.handle)
    }

    get_enableKerning(): boolean {
        return Il2Cpp.Api.TMP_Text._get_enableKerning(this.handle)
    }

    set_enableKerning(value: boolean): void {
        return Il2Cpp.Api.TMP_Text._set_enableKerning(this.handle, value)
    }

    get_extraPadding(): boolean {
        return Il2Cpp.Api.TMP_Text._get_extraPadding(this.handle)
    }

    set_extraPadding(value: boolean): void {
        return Il2Cpp.Api.TMP_Text._set_extraPadding(this.handle, value)
    }

    get_richText(): boolean {
        return Il2Cpp.Api.TMP_Text._get_richText(this.handle)
    }

    set_richText(value: boolean): void {
        return Il2Cpp.Api.TMP_Text._set_richText(this.handle, value)
    }

    get_parseCtrlCharacters(): boolean {
        return Il2Cpp.Api.TMP_Text._get_parseCtrlCharacters(this.handle)
    }

    set_parseCtrlCharacters(value: boolean): void {
        return Il2Cpp.Api.TMP_Text._set_parseCtrlCharacters(this.handle, value)
    }

    get_isOverlay(): boolean {
        return Il2Cpp.Api.TMP_Text._get_isOverlay(this.handle)
    }

    set_isOverlay(value: boolean): void {
        return Il2Cpp.Api.TMP_Text._set_isOverlay(this.handle, value)
    }

    get_isOrthographic(): boolean {
        return Il2Cpp.Api.TMP_Text._get_isOrthographic(this.handle)
    }

    set_isOrthographic(value: boolean): void {
        return Il2Cpp.Api.TMP_Text._set_isOrthographic(this.handle, value)
    }

    get_enableCulling(): boolean {
        return Il2Cpp.Api.TMP_Text._get_enableCulling(this.handle)
    }

    set_enableCulling(value: boolean): void {
        return Il2Cpp.Api.TMP_Text._set_enableCulling(this.handle, value)
    }

    get_ignoreRectMaskCulling(): boolean {
        return Il2Cpp.Api.TMP_Text._get_ignoreRectMaskCulling(this.handle)
    }

    set_ignoreRectMaskCulling(value: boolean): void {
        return Il2Cpp.Api.TMP_Text._set_ignoreRectMaskCulling(this.handle, value)
    }

    get_ignoreVisibility(): boolean {
        return Il2Cpp.Api.TMP_Text._get_ignoreVisibility(this.handle)
    }

    set_ignoreVisibility(value: boolean): void {
        return Il2Cpp.Api.TMP_Text._set_ignoreVisibility(this.handle, value)
    }

    get_horizontalMapping(): TMPro_TextureMappingOptions {
        return Il2Cpp.Api.TMP_Text._get_horizontalMapping(this.handle)
    }

    set_horizontalMapping(value: TMPro_TextureMappingOptions): void {
        return Il2Cpp.Api.TMP_Text._set_horizontalMapping(this.handle, value)
    }

    get_verticalMapping(): TMPro_TextureMappingOptions {
        return Il2Cpp.Api.TMP_Text._get_verticalMapping(this.handle)
    }

    set_verticalMapping(value: TMPro_TextureMappingOptions): void {
        return Il2Cpp.Api.TMP_Text._set_verticalMapping(this.handle, value)
    }

    get_mappingUvLineOffset(): number {
        return Il2Cpp.Api.TMP_Text._get_mappingUvLineOffset(this.handle)
    }

    set_mappingUvLineOffset(value: number): void {
        return Il2Cpp.Api.TMP_Text._set_mappingUvLineOffset(this.handle, value)
    }

    get_renderMode(): TMPro_TextRenderFlags {
        return Il2Cpp.Api.TMP_Text._get_renderMode(this.handle)
    }

    set_renderMode(value: TMPro_TextRenderFlags): void {
        return Il2Cpp.Api.TMP_Text._set_renderMode(this.handle, value)
    }

    get_geometrySortingOrder(): TMPro_VertexSortingOrder {
        return Il2Cpp.Api.TMP_Text._get_geometrySortingOrder(this.handle)
    }

    set_geometrySortingOrder(value: TMPro_VertexSortingOrder): void {
        return Il2Cpp.Api.TMP_Text._set_geometrySortingOrder(this.handle, value)
    }

    get_vertexBufferAutoSizeReduction(): boolean {
        return Il2Cpp.Api.TMP_Text._get_vertexBufferAutoSizeReduction(this.handle)
    }

    set_vertexBufferAutoSizeReduction(value: boolean): void {
        return Il2Cpp.Api.TMP_Text._set_vertexBufferAutoSizeReduction(this.handle, value)
    }

    get_firstVisibleCharacter(): number {
        return Il2Cpp.Api.TMP_Text._get_firstVisibleCharacter(this.handle)
    }

    set_firstVisibleCharacter(value: number): void {
        return Il2Cpp.Api.TMP_Text._set_firstVisibleCharacter(this.handle, value)
    }

    get_maxVisibleCharacters(): number {
        return Il2Cpp.Api.TMP_Text._get_maxVisibleCharacters(this.handle)
    }

    set_maxVisibleCharacters(value: number): void {
        return Il2Cpp.Api.TMP_Text._set_maxVisibleCharacters(this.handle, value)
    }

    get_maxVisibleWords(): number {
        return Il2Cpp.Api.TMP_Text._get_maxVisibleWords(this.handle)
    }

    set_maxVisibleWords(value: number): void {
        return Il2Cpp.Api.TMP_Text._set_maxVisibleWords(this.handle, value)
    }

    get_maxVisibleLines(): number {
        return Il2Cpp.Api.TMP_Text._get_maxVisibleLines(this.handle)
    }

    set_maxVisibleLines(value: number): void {
        return Il2Cpp.Api.TMP_Text._set_maxVisibleLines(this.handle, value)
    }

    get_useMaxVisibleDescender(): boolean {
        return Il2Cpp.Api.TMP_Text._get_useMaxVisibleDescender(this.handle)
    }

    set_useMaxVisibleDescender(value: boolean): void {
        return Il2Cpp.Api.TMP_Text._set_useMaxVisibleDescender(this.handle, value)
    }

    get_pageToDisplay(): number {
        return Il2Cpp.Api.TMP_Text._get_pageToDisplay(this.handle)
    }

    set_pageToDisplay(value: number): void {
        return Il2Cpp.Api.TMP_Text._set_pageToDisplay(this.handle, value)
    }

    get_margin(): Vector4 {
        return Il2Cpp.Api.TMP_Text._get_margin(this.handle)
    }

    set_margin(value: Vector4): void {
        return Il2Cpp.Api.TMP_Text._set_margin(this.handle, value)
    }

    get_textInfo(): TMPro_TMP_TextInfo {
        return Il2Cpp.Api.TMP_Text._get_textInfo(this.handle)
    }

    get_havePropertiesChanged(): boolean {
        return Il2Cpp.Api.TMP_Text._get_havePropertiesChanged(this.handle)
    }

    set_havePropertiesChanged(value: boolean): void {
        return Il2Cpp.Api.TMP_Text._set_havePropertiesChanged(this.handle, value)
    }

    get_isUsingLegacyAnimationComponent(): boolean {
        return Il2Cpp.Api.TMP_Text._get_isUsingLegacyAnimationComponent(this.handle)
    }

    set_isUsingLegacyAnimationComponent(value: boolean): void {
        return Il2Cpp.Api.TMP_Text._set_isUsingLegacyAnimationComponent(this.handle, value)
    }

    get_transform(): Il2Cpp.Transform {
        return Il2Cpp.Api.TMP_Text._get_transform(this.handle)
    }

    get_rectTransform(): RectTransform {
        return new RectTransform(Il2Cpp.Api.TMP_Text._get_rectTransform(this.handle))
    }

    get_autoSizeTextContainer(): boolean {
        return Il2Cpp.Api.TMP_Text._get_autoSizeTextContainer(this.handle)
    }

    set_autoSizeTextContainer(value: boolean): void {
        return Il2Cpp.Api.TMP_Text._set_autoSizeTextContainer(this.handle, value)
    }

    get_mesh(): UnityEngine_MeshRenderer {
        return Il2Cpp.Api.TMP_Text._get_mesh(this.handle)
    }

    get_isVolumetricText(): boolean {
        return Il2Cpp.Api.TMP_Text._get_isVolumetricText(this.handle)
    }

    set_isVolumetricText(value: boolean): void {
        return Il2Cpp.Api.TMP_Text._set_isVolumetricText(this.handle, value)
    }

    get_bounds(): UnityEngine_Bounds {
        return Il2Cpp.Api.TMP_Text._get_bounds(this.handle)
    }

    get_textBounds(): UnityEngine_Bounds {
        return Il2Cpp.Api.TMP_Text._get_textBounds(this.handle)
    }

    get_spriteAnimator(): TMPro_TMP_SpriteAnimator {
        return Il2Cpp.Api.TMP_Text._get_spriteAnimator(this.handle)
    }

    get_flexibleHeight(): number {
        return Il2Cpp.Api.TMP_Text._get_flexibleHeight(this.handle)
    }

    get_flexibleWidth(): number {
        return Il2Cpp.Api.TMP_Text._get_flexibleWidth(this.handle)
    }

    get_minWidth(): number {
        return Il2Cpp.Api.TMP_Text._get_minWidth(this.handle)
    }

    get_minHeight(): number {
        return Il2Cpp.Api.TMP_Text._get_minHeight(this.handle)
    }

    get_maxWidth(): number {
        return Il2Cpp.Api.TMP_Text._get_maxWidth(this.handle)
    }

    get_maxHeight(): number {
        return Il2Cpp.Api.TMP_Text._get_maxHeight(this.handle)
    }

    get_layoutElement(): UnityEngine_UI_LayoutElement {
        return Il2Cpp.Api.TMP_Text._get_layoutElement(this.handle)
    }

    get_preferredWidth(): number {
        return Il2Cpp.Api.TMP_Text._get_preferredWidth(this.handle)
    }

    get_preferredHeight(): number {
        return Il2Cpp.Api.TMP_Text._get_preferredHeight(this.handle)
    }

    get_renderedWidth(): number {
        return Il2Cpp.Api.TMP_Text._get_renderedWidth(this.handle)
    }

    get_renderedHeight(): number {
        return Il2Cpp.Api.TMP_Text._get_renderedHeight(this.handle)
    }

    get_layoutPriority(): number {
        return Il2Cpp.Api.TMP_Text._get_layoutPriority(this.handle)
    }

    LoadFontAsset(): void {
        return Il2Cpp.Api.TMP_Text._LoadFontAsset(this.handle)
    }

    SetSharedMaterial(mat: Material): void {
        return Il2Cpp.Api.TMP_Text._SetSharedMaterial(this.handle, mat)
    }

    GetMaterial(mat: Material): Material {
        return Il2Cpp.Api.TMP_Text._GetMaterial(this.handle, mat)
    }

    SetFontBaseMaterial(mat: Material): void {
        return Il2Cpp.Api.TMP_Text._SetFontBaseMaterial(this.handle, mat)
    }

    GetSharedMaterials(): UnityEngine_Material_array {
        return Il2Cpp.Api.TMP_Text._GetSharedMaterials(this.handle)
    }

    SetSharedMaterials(materials: UnityEngine_Material_array): void {
        return Il2Cpp.Api.TMP_Text._SetSharedMaterials(this.handle, materials)
    }

    GetMaterials(mats: UnityEngine_Material_array): UnityEngine_Material_array {
        return Il2Cpp.Api.TMP_Text._GetMaterials(this.handle, mats)
    }

    CreateMaterialInstance(source: Material): Material {
        return Il2Cpp.Api.TMP_Text._CreateMaterialInstance(this.handle, source)
    }

    SetVertexColorGradient(gradient: TMPro_TMP_ColorGradient): void {
        return Il2Cpp.Api.TMP_Text._SetVertexColorGradient(this.handle, gradient)
    }

    SetTextSortingOrder(order: TMPro_VertexSortingOrder): void {
        return Il2Cpp.Api.TMP_Text._SetTextSortingOrder(this.handle, order)
    }

    SetTextSortingOrder_1(order: number[]): void {
        return Il2Cpp.Api.TMP_Text._SetTextSortingOrder(this.handle, order)
    }

    SetFaceColor(color: Color32): void {
        return Il2Cpp.Api.TMP_Text._SetFaceColor(this.handle, color)
    }

    SetOutlineColor(color: Color32): void {
        return Il2Cpp.Api.TMP_Text._SetOutlineColor(this.handle, color)
    }

    SetOutlineThickness(thickness: number): void {
        return Il2Cpp.Api.TMP_Text._SetOutlineThickness(this.handle, thickness)
    }

    SetShaderDepth(): void {
        return Il2Cpp.Api.TMP_Text._SetShaderDepth(this.handle)
    }

    SetCulling(): void {
        return Il2Cpp.Api.TMP_Text._SetCulling(this.handle)
    }

    GetPaddingForMaterial(): number {
        return Il2Cpp.Api.TMP_Text._GetPaddingForMaterial(this.handle)
    }

    GetPaddingForMaterial_1(mat: Material): number {
        return Il2Cpp.Api.TMP_Text._GetPaddingForMaterial(this.handle, mat)
    }

    GetTextContainerLocalCorners(): Vector3[] {
        return Il2Cpp.Api.TMP_Text._GetTextContainerLocalCorners(this.handle)
    }

    ForceMeshUpdate(): void {
        return Il2Cpp.Api.TMP_Text._ForceMeshUpdate(this.handle)
    }

    ForceMeshUpdate_1(ignoreActiveState: boolean): void {
        return Il2Cpp.Api.TMP_Text._ForceMeshUpdate(this.handle, ignoreActiveState)
    }

    SetTextInternal(text: string): void {
        return Il2Cpp.Api.TMP_Text._SetTextInternal(this.handle, text)
    }

    UpdateGeometry_2(mesh: UnityEngine_Mesh, index: number): void {
        return Il2Cpp.Api.TMP_Text._UpdateGeometry(this.handle, mesh, index)
    }

    UpdateVertexData(flags: TMPro_TMP_VertexDataUpdateFlags): void {
        return Il2Cpp.Api.TMP_Text._UpdateVertexData(this.handle, flags)
    }

    UpdateVertexData_0(): void {
        return Il2Cpp.Api.TMP_Text._UpdateVertexData(this.handle)
    }

    SetVertices(vertices: Vector3[]): void {
        return Il2Cpp.Api.TMP_Text._SetVertices(this.handle, vertices)
    }

    UpdateMeshPadding(): void {
        return Il2Cpp.Api.TMP_Text._UpdateMeshPadding(this.handle)
    }

    CrossFadeColor(targetColor: Color, duration: number, ignoreTimeScale: boolean, useAlpha: System_Boolean): void {
        return Il2Cpp.Api.TMP_Text._CrossFadeColor(this.handle, targetColor, duration, ignoreTimeScale, useAlpha)
    }

    CrossFadeAlpha_3(alpha: number, duration: System_Single, ignoreTimeScale: boolean): void {
        return Il2Cpp.Api.TMP_Text._CrossFadeAlpha(this.handle, alpha, duration, ignoreTimeScale)
    }

    InternalCrossFadeColor(targetColor: Color, duration: number, ignoreTimeScale: System_Boolean, useAlpha: System_Boolean): void {
        return Il2Cpp.Api.TMP_Text._InternalCrossFadeColor(this.handle, targetColor, duration, ignoreTimeScale, useAlpha)
    }

    InternalCrossFadeAlpha(alpha: number, duration: System_Single, ignoreTimeScale: boolean): void {
        return Il2Cpp.Api.TMP_Text._InternalCrossFadeAlpha(this.handle, alpha, duration, ignoreTimeScale)
    }

    ParseInputText(): void {
        return Il2Cpp.Api.TMP_Text._ParseInputText(this.handle)
    }

    SetText(text: string): void {
        return Il2Cpp.Api.TMP_Text._SetText(this.handle, text)
    }

    SetText_string_bool(text: string, syncTextInputBox: boolean): void {
        return Il2Cpp.Api.TMP_Text._SetText(this.handle, text, syncTextInputBox)
    }

    SetText_string_number(text: string, arg0: number): void {
        return Il2Cpp.Api.TMP_Text._SetText(this.handle, text, arg0)
    }

    SetText_3(text: string, arg0: number, arg1: System_Single): void {
        return Il2Cpp.Api.TMP_Text._SetText(this.handle, text, arg0, arg1)
    }

    SetText_4(text: string, arg0: number, arg1: System_Single, arg2: System_Single): void {
        return Il2Cpp.Api.TMP_Text._SetText(this.handle, text, arg0, arg1, arg2)
    }

    SetText_1(text: System_Text_StringBuilder): void {
        return Il2Cpp.Api.TMP_Text._SetText(this.handle, text)
    }

    SetCharArray(sourceText: System_Char[]): void {
        return Il2Cpp.Api.TMP_Text._SetCharArray(this.handle, sourceText)
    }

    SetCharArray_char(sourceText: System_Char[], start: number, length: System_Int32): void {
        return Il2Cpp.Api.TMP_Text._SetCharArray(this.handle, sourceText, start, length)
    }

    SetCharArray_num(sourceText: number[], start: System_Int32, length: System_Int32): void {
        return Il2Cpp.Api.TMP_Text._SetCharArray(this.handle, sourceText, start, length)
    }

    SetTextArrayToCharArray(sourceText: System_Char[], charBuffer: TMPro_TMP_Text_UnicodeChar[]): void {
        return Il2Cpp.Api.TMP_Text._SetTextArrayToCharArray(this.handle, sourceText, charBuffer)
    }

    StringToCharArray(sourceText: string, charBuffer: TMPro_TMP_Text_UnicodeChar[]): void {
        return Il2Cpp.Api.TMP_Text._StringToCharArray(this.handle, sourceText, charBuffer)
    }

    StringBuilderToIntArray(sourceText: System_Text_StringBuilder, charBuffer: TMPro_TMP_Text_UnicodeChar[]): void {
        return Il2Cpp.Api.TMP_Text._StringBuilderToIntArray(this.handle, sourceText, charBuffer)
    }

    ReplaceOpeningStyleTag(sourceText: string, srcIndex: number, srcOffset: System_Int32, charBuffer: TMPro_TMP_Text_UnicodeChar[], writeIndex: System_Int32): boolean {
        return Il2Cpp.Api.TMP_Text._ReplaceOpeningStyleTag(this.handle, sourceText, srcIndex, srcOffset, charBuffer, writeIndex)
    }

    ReplaceOpeningStyleTag_5(sourceText: number[], srcIndex: System_Int32, srcOffset: System_Int32, charBuffer: TMPro_TMP_Text_UnicodeChar[], writeIndex: System_Int32): boolean {
        return Il2Cpp.Api.TMP_Text._ReplaceOpeningStyleTag(this.handle, sourceText, srcIndex, srcOffset, charBuffer, writeIndex)
    }

    // ReplaceOpeningStyleTag_5(sourceText: System_Char[], srcIndex: number, srcOffset: System_Int32, charBuffer: TMPro_TMP_Text_UnicodeChar[], writeIndex: System_Int32): boolean {
    //     return Il2Cpp.Api.TMP_Text._ReplaceOpeningStyleTag(this.handle, sourceText, srcIndex, srcOffset, charBuffer, writeIndex)
    // }

    // ReplaceOpeningStyleTag_5(sourceText: System_Text.StringBuilder, srcIndex: number, srcOffset: System_Int32, charBuffer: TMPro_TMP_Text_UnicodeChar[], writeIndex: System_Int32): boolean {
    //     return Il2Cpp.Api.TMP_Text._ReplaceOpeningStyleTag(this.handle, sourceText, srcIndex, srcOffset, charBuffer, writeIndex)
    // }

    ReplaceClosingStyleTag(sourceText: string, srcIndex: number, charBuffer: TMPro_TMP_Text_UnicodeChar[], writeIndex: System_Int32): boolean {
        return Il2Cpp.Api.TMP_Text._ReplaceClosingStyleTag(this.handle, sourceText, srcIndex, charBuffer, writeIndex)
    }

    // ReplaceClosingStyleTag_4(sourceText: number[], srcIndex: System_Int32, charBuffer: TMPro_TMP_Text_UnicodeChar[], writeIndex: System_Int32): boolean {
    //     return Il2Cpp.Api.TMP_Text._ReplaceClosingStyleTag(this.handle, sourceText, srcIndex, charBuffer, writeIndex)
    // }

    // ReplaceClosingStyleTag_4(sourceText: System_Char[], srcIndex: number, charBuffer: TMPro_TMP_Text_UnicodeChar[], writeIndex: System_Int32): boolean {
    //     return Il2Cpp.Api.TMP_Text._ReplaceClosingStyleTag(this.handle, sourceText, srcIndex, charBuffer, writeIndex)
    // }

    // ReplaceClosingStyleTag_4(sourceText: System_Text_StringBuilder, srcIndex: number, charBuffer: TMPro_TMP_Text_UnicodeChar[], writeIndex: System_Int32): boolean {
    //     return Il2Cpp.Api.TMP_Text._ReplaceClosingStyleTag(this.handle, sourceText, srcIndex, charBuffer, writeIndex)
    // }

    IsTagName(text: string, tag: System_String, index: number): boolean {
        return Il2Cpp.Api.TMP_Text._IsTagName(this.handle, text, tag, index)
    }

    // IsTagName_3(text: System_Char[], tag: string, index: number): boolean {
    //     return Il2Cpp.Api.TMP_Text._IsTagName(this.handle, text, tag, index)
    // }

    // IsTagName_3(text: number[], tag: string, index: System_Int32): boolean {
    //     return Il2Cpp.Api.TMP_Text._IsTagName(this.handle, text, tag, index)
    // }

    IsTagName_3(text: System_Text_StringBuilder, tag: string, index: number): boolean {
        return Il2Cpp.Api.TMP_Text._IsTagName(this.handle, text, tag, index)
    }

    GetTagHashCode(text: string, index: number, closeIndex: System_Int32): number {
        return Il2Cpp.Api.TMP_Text._GetTagHashCode(this.handle, text, index, closeIndex)
    }

    GetTagHashCode_3(text: System_Char[], index: number, closeIndex: System_Int32): number {
        return Il2Cpp.Api.TMP_Text._GetTagHashCode(this.handle, text, index, closeIndex)
    }

    // GetTagHashCode_3(text: number[], index: System_Int32, closeIndex: System_Int32): number {
    //     return Il2Cpp.Api.TMP_Text._GetTagHashCode(this.handle, text, index, closeIndex)
    // }

    // GetTagHashCode_3(text: System_Text.StringBuilder, index: number, closeIndex: System_Int32): number {
    //     return Il2Cpp.Api.TMP_Text._GetTagHashCode(this.handle, text, index, closeIndex)
    // }

    AddFloatToCharArray(number: number, index: number, precision: System_Int32): void {
        return Il2Cpp.Api.TMP_Text._AddFloatToCharArray(this.handle, number, index, precision)
    }

    AddIntToCharArray(number: number, index: number, precision: System_Int32): void {
        return Il2Cpp.Api.TMP_Text._AddIntToCharArray(this.handle, number, index, precision)
    }

    SetArraySizes(chars: TMPro_TMP_Text_UnicodeChar[]): number {
        return Il2Cpp.Api.TMP_Text._SetArraySizes(this.handle, chars)
    }

    GenerateTextMesh(): void {
        return Il2Cpp.Api.TMP_Text._GenerateTextMesh(this.handle)
    }

    GetPreferredValues(): Vector2 {
        return Il2Cpp.Api.TMP_Text._GetPreferredValues(this.handle)
    }

    GetPreferredValues_2(width: number, height: System_Single): Vector2 {
        return Il2Cpp.Api.TMP_Text._GetPreferredValues(this.handle, width, height)
    }

    GetPreferredValues_1(text: string): Vector2 {
        return Il2Cpp.Api.TMP_Text._GetPreferredValues(this.handle, text)
    }

    GetPreferredValues_3(text: string, width: number, height: System_Single): Vector2 {
        return Il2Cpp.Api.TMP_Text._GetPreferredValues(this.handle, text, width, height)
    }

    GetPreferredWidth(): number {
        return Il2Cpp.Api.TMP_Text._GetPreferredWidth(this.handle)
    }

    GetPreferredWidth_1(margin: Vector2): number {
        return Il2Cpp.Api.TMP_Text._GetPreferredWidth(this.handle, margin)
    }

    GetPreferredHeight(): number {
        return Il2Cpp.Api.TMP_Text._GetPreferredHeight(this.handle)
    }

    GetPreferredHeight_1(margin: Vector2): number {
        return Il2Cpp.Api.TMP_Text._GetPreferredHeight(this.handle, margin)
    }

    GetRenderedValues(): Vector2 {
        return Il2Cpp.Api.TMP_Text._GetRenderedValues(this.handle)
    }

    GetRenderedValues_1(onlyVisibleCharacters: boolean): Vector2 {
        return Il2Cpp.Api.TMP_Text._GetRenderedValues(this.handle, onlyVisibleCharacters)
    }

    GetRenderedWidth(): number {
        return Il2Cpp.Api.TMP_Text._GetRenderedWidth(this.handle)
    }

    GetRenderedWidth_1(onlyVisibleCharacters: boolean): number {
        return Il2Cpp.Api.TMP_Text._GetRenderedWidth(this.handle, onlyVisibleCharacters)
    }

    GetRenderedHeight(): number {
        return Il2Cpp.Api.TMP_Text._GetRenderedHeight(this.handle)
    }

    GetRenderedHeight_1(onlyVisibleCharacters: boolean): number {
        return Il2Cpp.Api.TMP_Text._GetRenderedHeight(this.handle, onlyVisibleCharacters)
    }

    CalculatePreferredValues(defaultFontSize: number, marginSize: Vector2, ignoreTextAutoSizing: boolean): Vector2 {
        return Il2Cpp.Api.TMP_Text._CalculatePreferredValues(this.handle, defaultFontSize, marginSize, ignoreTextAutoSizing)
    }

    GetCompoundBounds(): UnityEngine_Bounds {
        return Il2Cpp.Api.TMP_Text._GetCompoundBounds(this.handle)
    }

    GetTextBounds(): UnityEngine_Bounds {
        return Il2Cpp.Api.TMP_Text._GetTextBounds(this.handle)
    }

    GetTextBounds_1(onlyVisibleCharacters: boolean): UnityEngine_Bounds {
        return Il2Cpp.Api.TMP_Text._GetTextBounds(this.handle, onlyVisibleCharacters)
    }

    AdjustLineOffset(startIndex: number, endIndex: System_Int32, offset: number): void {
        return Il2Cpp.Api.TMP_Text._AdjustLineOffset(this.handle, startIndex, endIndex, offset)
    }

    ResizeLineExtents(size: number): void {
        return Il2Cpp.Api.TMP_Text._ResizeLineExtents(this.handle, size)
    }

    GetTextInfo(text: string): TMPro_TMP_TextInfo {
        return Il2Cpp.Api.TMP_Text._GetTextInfo(this.handle, text)
    }

    ComputeMarginSize(): void {
        return Il2Cpp.Api.TMP_Text._ComputeMarginSize(this.handle)
    }

    SaveWordWrappingState(state: TMPro_WordWrapState, index: number, count: System_Int32): void {
        return Il2Cpp.Api.TMP_Text._SaveWordWrappingState(this.handle, state, index, count)
    }

    RestoreWordWrappingState(state: TMPro_WordWrapState): number {
        return Il2Cpp.Api.TMP_Text._RestoreWordWrappingState(this.handle, state)
    }

    SaveGlyphVertexInfo(padding: number, style_padding: System_Single, vertexColor: Color32): void {
        return Il2Cpp.Api.TMP_Text._SaveGlyphVertexInfo(this.handle, padding, style_padding, vertexColor)
    }

    SaveSpriteVertexInfo(vertexColor: Color32): void {
        return Il2Cpp.Api.TMP_Text._SaveSpriteVertexInfo(this.handle, vertexColor)
    }

    FillCharacterVertexBuffers(i: number, index_X4: System_Int32): void {
        return Il2Cpp.Api.TMP_Text._FillCharacterVertexBuffers(this.handle, i, index_X4)
    }

    FillCharacterVertexBuffers_3(i: number, index_X4: System_Int32, isVolumetric: boolean): void {
        return Il2Cpp.Api.TMP_Text._FillCharacterVertexBuffers(this.handle, i, index_X4, isVolumetric)
    }

    FillSpriteVertexBuffers(i: number, index_X4: System_Int32): void {
        return Il2Cpp.Api.TMP_Text._FillSpriteVertexBuffers(this.handle, i, index_X4)
    }

    DrawUnderlineMesh(start: Vector3, end: Vector3, index: number, startScale: number, endScale: System_Single, maxScale: System_Single, sdfScale: System_Single, underlineColor: Color32): void {
        return Il2Cpp.Api.TMP_Text._DrawUnderlineMesh(this.handle, start, end, index, startScale, endScale, maxScale, sdfScale, underlineColor)
    }

    DrawTextHighlight(start: Vector3, end: Vector3, index: number, highlightColor: Color32): void {
        return Il2Cpp.Api.TMP_Text._DrawTextHighlight(this.handle, start, end, index, highlightColor)
    }

    LoadDefaultSettings(): void {
        return Il2Cpp.Api.TMP_Text._LoadDefaultSettings(this.handle)
    }

    GetSpecialCharacters(fontAsset: TMPro_TMP_FontAsset): void {
        return Il2Cpp.Api.TMP_Text._GetSpecialCharacters(this.handle, fontAsset)
    }

    ReplaceTagWithCharacter(chars: number[], insertionIndex: System_Int32, tagLength: System_Int32, c: System_Char): void {
        return Il2Cpp.Api.TMP_Text._ReplaceTagWithCharacter(this.handle, chars, insertionIndex, tagLength, c)
    }

    GetFontAssetForWeight(fontWeight: number): TMPro_TMP_FontAsset {
        return Il2Cpp.Api.TMP_Text._GetFontAssetForWeight(this.handle, fontWeight)
    }

    SetActiveSubMeshes(state: boolean): void {
        return Il2Cpp.Api.TMP_Text._SetActiveSubMeshes(this.handle, state)
    }

    ClearSubMeshObjects(): void {
        return Il2Cpp.Api.TMP_Text._ClearSubMeshObjects(this.handle)
    }

    ClearMesh(): void {
        return Il2Cpp.Api.TMP_Text._ClearMesh(this.handle)
    }

    ClearMesh_1(uploadGeometry: boolean): void {
        return Il2Cpp.Api.TMP_Text._ClearMesh(this.handle, uploadGeometry)
    }

    GetParsedText(): string {
        return readU16(Il2Cpp.Api.TMP_Text._GetParsedText(this.handle))
    }

    PackUV(x: number, y: System_Single, scale: System_Single): Vector2 {
        return Il2Cpp.Api.TMP_Text._PackUV(this.handle, x, y, scale)
    }

    PackUV_2(x: number, y: System_Single): number {
        return Il2Cpp.Api.TMP_Text._PackUV(this.handle, x, y)
    }

    InternalUpdate(): void {
        return Il2Cpp.Api.TMP_Text._InternalUpdate(this.handle)
    }

    HexToInt(hex: System_Char): number {
        return Il2Cpp.Api.TMP_Text._HexToInt(this.handle, hex)
    }

    GetUTF16(text: string, i: number): number {
        return Il2Cpp.Api.TMP_Text._GetUTF16(this.handle, text, i)
    }

    GetUTF16_2(text: System_Text_StringBuilder, i: number): number {
        return Il2Cpp.Api.TMP_Text._GetUTF16(this.handle, text, i)
    }

    GetUTF32(text: string, i: number): number {
        return Il2Cpp.Api.TMP_Text._GetUTF32(this.handle, text, i)
    }

    GetUTF32_2(text: System_Text_StringBuilder, i: number): number {
        return Il2Cpp.Api.TMP_Text._GetUTF32(this.handle, text, i)
    }

    HexCharsToColor(hexChars: System_Char[], tagCount: number): Color32 {
        return Il2Cpp.Api.TMP_Text._HexCharsToColor(this.handle, hexChars, tagCount)
    }

    HexCharsToColor_3(hexChars: System_Char[], startIndex: number, length: System_Int32): Color32 {
        return Il2Cpp.Api.TMP_Text._HexCharsToColor(this.handle, hexChars, startIndex, length)
    }

    GetAttributeParameters(chars: System_Char[], startIndex: number, length: System_Int32, parameters: number[]): number {
        return Il2Cpp.Api.TMP_Text._GetAttributeParameters(this.handle, chars, startIndex, length, parameters)
    }

    ConvertToFloat(chars: System_Char[], startIndex: number, length: System_Int32): number {
        return Il2Cpp.Api.TMP_Text._ConvertToFloat(this.handle, chars, startIndex, length)
    }

    ConvertToFloat_4(chars: System_Char[], startIndex: number, length: System_Int32, lastIndex: System_Int32): number {
        return Il2Cpp.Api.TMP_Text._ConvertToFloat(this.handle, chars, startIndex, length, lastIndex)
    }

    ValidateHtmlTag(chars: TMPro_TMP_Text_UnicodeChar[], startIndex: number, endIndex: System_Int32): boolean {
        return Il2Cpp.Api.TMP_Text._ValidateHtmlTag(this.handle, chars, startIndex, endIndex)
    }

    _ctor(): void {
        return Il2Cpp.Api.TMP_Text.__ctor(this.handle)
    }

    static _cctor(): void {
        return Il2Cpp.Api.TMP_Text.__cctor()
    }
}

Il2Cpp.TMP_Text = TMPro_TMP_Text_Impl

declare global {
    namespace Il2Cpp {
        class TMP_Text extends TMPro_TMP_Text_Impl { }
    }
}

export { TMPro_TMP_Text_Impl }