import { UnityEngine_Texture2D_Impl } from "../../../Texture/Texture2D/class"
import { TMPro_TMP_Asset_Impl } from "../class"

type System_String = string
type System_Char = NativePointer
type System_Void = NativePointer
type TMPro_TMP_Character = NativePointer
type UnityEngine_Font = NativePointer
type TMPro_AtlasPopulationMode = NativePointer
type UnityEngine_TextCore_FaceInfo = NativePointer
// type System_Collections.Generic.List<UnityEngine.TextCore.Glyph> = NativePointer
// type System_Collections.Generic.Dictionary<System.UInt32,UnityEngine.TextCore.Glyph> = NativePointer
// type System_Collections.Generic.List<TMPro.TMP_Character> = NativePointer
// type System_Collections.Generic.Dictionary<System.UInt32,TMPro.TMP_Character> = NativePointer
type UnityEngine_Texture2D = UnityEngine_Texture2D_Impl
type UnityEngine_Texture2D_Array = NativePointer
type System_Int32 = number
type System_Boolean = boolean
// type System_Collections.Generic.List<UnityEngine.TextCore.GlyphRect> = NativePointer
type TMPro_FaceInfo_Legacy = NativePointer
type UnityEngine_TextCore_LowLevel_GlyphRenderMode = NativePointer
type TMPro_TMP_FontFeatureTable = NativePointer
// type System_Collections.Generic.List<TMPro.TMP_FontAsset> = NativePointer
type TMPro_FontAssetCreationSettings = NativePointer
type TMPro_TMP_FontWeightPair_Array = NativePointer
type System_Int32_Array = NativePointer
type System_UInt32 = NativePointer
type System_Single = number
type System_Byte = NativePointer
type Unity_Profiling_ProfilerMarker = NativePointer

class TMPro_TMP_FontAsset_Impl extends TMPro_TMP_Asset_Impl {

    m_Version: System_String = readU16(lfv(this.handle, "m_Version"))
    m_SourceFontFileGUID: System_String = readU16(lfv(this.handle, "m_SourceFontFileGUID"))
    m_SourceFontFile: UnityEngine_Font = lfv(this.handle, "m_SourceFontFile") as unknown as UnityEngine_Font
    m_AtlasPopulationMode: TMPro_AtlasPopulationMode = lfv(this.handle, "m_AtlasPopulationMode") as unknown as TMPro_AtlasPopulationMode
    m_FaceInfo: UnityEngine_TextCore_FaceInfo = lfv(this.handle, "m_FaceInfo") as unknown as UnityEngine_TextCore_FaceInfo

    // m_GlyphTable: System_Collections.Generic.List<UnityEngine.TextCore.Glyph> = lfv(this.handle, "m_GlyphTable") as unknown as System_Collections.Generic.List<UnityEngine.TextCore.Glyph>
    // m_GlyphLookupDictionary: System_Collections.Generic.Dictionary<System.UInt32,UnityEngine.TextCore.Glyph> = lfv(this.handle, "m_GlyphLookupDictionary") as unknown as System_Collections.Generic.Dictionary<System.UInt32,UnityEngine.TextCore.Glyph>
    // m_CharacterTable: System_Collections.Generic.List<TMPro.TMP_Character> = lfv(this.handle, "m_CharacterTable") as unknown as System_Collections.Generic.List<TMPro.TMP_Character>
    // m_CharacterLookupDictionary: System_Collections.Generic.Dictionary<System.UInt32,TMPro.TMP_Character> = lfv(this.handle, "m_CharacterLookupDictionary") as unknown as System_Collections.Generic.Dictionary<System.UInt32,TMPro.TMP_Character>
    m_GlyphTable: NativePointer = lfv(this.handle, "m_GlyphTable")
    m_GlyphLookupDictionary: NativePointer = lfv(this.handle, "m_GlyphLookupDictionary")
    m_CharacterTable: NativePointer = lfv(this.handle, "m_CharacterTable")
    m_CharacterLookupDictionary: NativePointer = lfv(this.handle, "m_CharacterLookupDictionary")

    m_AtlasTexture: UnityEngine_Texture2D = lfv(this.handle, "m_AtlasTexture") as unknown as UnityEngine_Texture2D
    m_AtlasTextures: UnityEngine_Texture2D_Array = lfv(this.handle, "m_AtlasTextures") as unknown as UnityEngine_Texture2D_Array
    m_AtlasTextureIndex: System_Int32 = lfv(this.handle, "m_AtlasTextureIndex") as unknown as System_Int32
    m_IsMultiAtlasTexturesEnabled: System_Boolean = lfv(this.handle, "m_IsMultiAtlasTexturesEnabled") as unknown as System_Boolean
    m_ClearDynamicDataOnBuild: System_Boolean = lfv(this.handle, "m_ClearDynamicDataOnBuild") as unknown as System_Boolean

    // m_UsedGlyphRects: System_Collections.Generic.List<UnityEngine.TextCore.GlyphRect> = lfv(this.handle, "m_UsedGlyphRects") as unknown as System_Collections.Generic.List<UnityEngine.TextCore.GlyphRect>
    // m_FreeGlyphRects: System_Collections.Generic.List<UnityEngine.TextCore.GlyphRect> = lfv(this.handle, "m_FreeGlyphRects") as unknown as System_Collections.Generic.List<UnityEngine.TextCore.GlyphRect>
    m_UsedGlyphRects: NativePointer = lfv(this.handle, "m_UsedGlyphRects")
    m_FreeGlyphRects: NativePointer = lfv(this.handle, "m_FreeGlyphRects")

    m_fontInfo: TMPro_FaceInfo_Legacy = lfv(this.handle, "m_fontInfo") as unknown as TMPro_FaceInfo_Legacy
    atlas: UnityEngine_Texture2D = lfv(this.handle, "atlas") as unknown as UnityEngine_Texture2D
    m_AtlasWidth: System_Int32 = lfv(this.handle, "m_AtlasWidth") as unknown as System_Int32
    m_AtlasHeight: System_Int32 = lfv(this.handle, "m_AtlasHeight") as unknown as System_Int32
    m_AtlasPadding: System_Int32 = lfv(this.handle, "m_AtlasPadding") as unknown as System_Int32
    m_AtlasRenderMode: UnityEngine_TextCore_LowLevel_GlyphRenderMode = lfv(this.handle, "m_AtlasRenderMode") as unknown as UnityEngine_TextCore_LowLevel_GlyphRenderMode
    m_FontFeatureTable: TMPro_TMP_FontFeatureTable = lfv(this.handle, "m_FontFeatureTable") as unknown as TMPro_TMP_FontFeatureTable

    // m_glyphInfoList: System_Collections.Generic.List<TMPro.TMP_Glyph> = lfv(this.handle, "m_glyphInfoList") as unknown as System_Collections.Generic.List<TMPro.TMP_Glyph>
    // m_KerningTable: TMPro_KerningTable = lfv(this.handle, "m_KerningTable") as unknown as TMPro_KerningTable
    // fallbackFontAssets: System_Collections.Generic.List<TMPro.TMP_FontAsset> = lfv(this.handle, "fallbackFontAssets") as unknown as System_Collections.Generic.List<TMPro.TMP_FontAsset>
    // m_FallbackFontAssetTable: System_Collections.Generic.List<TMPro.TMP_FontAsset> = lfv(this.handle, "m_FallbackFontAssetTable") as unknown as System_Collections.Generic.List<TMPro.TMP_FontAsset>
    m_glyphInfoList: NativePointer = lfv(this.handle, "m_glyphInfoList")
    m_KerningTable: NativePointer = lfv(this.handle, "m_KerningTable")
    fallbackFontAssets: NativePointer = lfv(this.handle, "fallbackFontAssets")
    m_FallbackFontAssetTable: NativePointer = lfv(this.handle, "m_FallbackFontAssetTable")

    m_CreationSettings: TMPro_FontAssetCreationSettings = lfv(this.handle, "m_CreationSettings") as unknown as TMPro_FontAssetCreationSettings
    m_FontWeightTable: TMPro_TMP_FontWeightPair_Array = lfv(this.handle, "m_FontWeightTable") as unknown as TMPro_TMP_FontWeightPair_Array
    fontWeights: TMPro_TMP_FontWeightPair_Array = lfv(this.handle, "fontWeights") as unknown as TMPro_TMP_FontWeightPair_Array
    normalStyle: System_Single = readSingle(lfv(this.handle, "normalStyle"))
    normalSpacingOffset: System_Single = readSingle(lfv(this.handle, "normalSpacingOffset"))
    boldStyle: System_Single = readSingle(lfv(this.handle, "boldStyle"))
    boldSpacing: System_Single = readSingle(lfv(this.handle, "boldSpacing"))
    italicStyle: System_Byte = lfv(this.handle, "italicStyle") as unknown as System_Byte
    tabSize: System_Byte = lfv(this.handle, "tabSize") as unknown as System_Byte
    IsFontAssetLookupTablesDirty: System_Boolean = lfv(this.handle, "IsFontAssetLookupTablesDirty") as unknown as System_Boolean
    k_ReadFontAssetDefinitionMarker: Unity_Profiling_ProfilerMarker = lfv(this.handle, "k_ReadFontAssetDefinitionMarker") as unknown as Unity_Profiling_ProfilerMarker
    k_AddSynthesizedCharactersMarker: Unity_Profiling_ProfilerMarker = lfv(this.handle, "k_AddSynthesizedCharactersMarker") as unknown as Unity_Profiling_ProfilerMarker
    k_TryAddCharacterMarker: Unity_Profiling_ProfilerMarker = lfv(this.handle, "k_TryAddCharacterMarker") as unknown as Unity_Profiling_ProfilerMarker
    k_TryAddCharactersMarker: Unity_Profiling_ProfilerMarker = lfv(this.handle, "k_TryAddCharactersMarker") as unknown as Unity_Profiling_ProfilerMarker
    k_UpdateGlyphAdjustmentRecordsMarker: Unity_Profiling_ProfilerMarker = lfv(this.handle, "k_UpdateGlyphAdjustmentRecordsMarker") as unknown as Unity_Profiling_ProfilerMarker
    k_ClearFontAssetDataMarker: Unity_Profiling_ProfilerMarker = lfv(this.handle, "k_ClearFontAssetDataMarker") as unknown as Unity_Profiling_ProfilerMarker
    k_UpdateFontAssetDataMarker: Unity_Profiling_ProfilerMarker = lfv(this.handle, "k_UpdateFontAssetDataMarker") as unknown as Unity_Profiling_ProfilerMarker
    s_DefaultMaterialSuffix: System_String = readU16(lfv(this.handle, "s_DefaultMaterialSuffix"))
    k_GlyphIndexArray: System_UInt32[] = lfv(this.handle, "k_GlyphIndexArray") as unknown as System_UInt32[]

    // FallbackSearchQueryLookup: System_Collections.Generic.HashSet<System.Int32> = lfv(this.handle, "FallbackSearchQueryLookup") as unknown as System_Collections.Generic.HashSet<System.Int32>
    // k_SearchedFontAssetLookup: System_Collections.Generic.HashSet<System.Int32> = lfv(this.handle, "k_SearchedFontAssetLookup") as unknown as System_Collections.Generic.HashSet<System.Int32>
    // k_FontAssets_FontFeaturesUpdateQueue: System_Collections.Generic.List<TMPro.TMP_FontAsset> = lfv(this.handle, "k_FontAssets_FontFeaturesUpdateQueue") as unknown as System_Collections.Generic.List<TMPro.TMP_FontAsset>
    // k_FontAssets_FontFeaturesUpdateQueueLookup: System_Collections.Generic.HashSet<System.Int32> = lfv(this.handle, "k_FontAssets_FontFeaturesUpdateQueueLookup") as unknown as System_Collections.Generic.HashSet<System.Int32>
    // k_FontAssets_AtlasTexturesUpdateQueue: System_Collections.Generic.List<TMPro.TMP_FontAsset> = lfv(this.handle, "k_FontAssets_AtlasTexturesUpdateQueue") as unknown as System_Collections.Generic.List<TMPro.TMP_FontAsset>
    // k_FontAssets_AtlasTexturesUpdateQueueLookup: System_Collections.Generic.HashSet<System.Int32> = lfv(this.handle, "k_FontAssets_AtlasTexturesUpdateQueueLookup") as unknown as System_Collections.Generic.HashSet<System.Int32>
    // m_GlyphsToRender: System_Collections.Generic.List<UnityEngine.TextCore.Glyph> = lfv(this.handle, "m_GlyphsToRender") as unknown as System_Collections.Generic.List<UnityEngine.TextCore.Glyph>
    // m_GlyphsRendered: System_Collections.Generic.List<UnityEngine.TextCore.Glyph> = lfv(this.handle, "m_GlyphsRendered") as unknown as System_Collections.Generic.List<UnityEngine.TextCore.Glyph>
    // m_GlyphIndexList: System_Collections.Generic.List<System.UInt32> = lfv(this.handle, "m_GlyphIndexList") as unknown as System_Collections.Generic.List<System.UInt32>
    // m_GlyphIndexListNewlyAdded: System_Collections.Generic.List<System.UInt32> = lfv(this.handle, "m_GlyphIndexListNewlyAdded") as unknown as System_Collections.Generic.List<System.UInt32>
    // m_GlyphsToAdd: System_Collections.Generic.List<System.UInt32> = lfv(this.handle, "m_GlyphsToAdd") as unknown as System_Collections.Generic.List<System.UInt32>
    // m_GlyphsToAddLookup: System_Collections.Generic.HashSet<System.UInt32> = lfv(this.handle, "m_GlyphsToAddLookup") as unknown as System_Collections.Generic.HashSet<System.UInt32>
    // m_CharactersToAdd: System_Collections.Generic.List<TMPro.TMP_Character> = lfv(this.handle, "m_CharactersToAdd") as unknown as System_Collections.Generic.List<TMPro.TMP_Character>
    // m_CharactersToAddLookup: System_Collections.Generic.HashSet<System.UInt32> = lfv(this.handle, "m_CharactersToAddLookup") as unknown as System_Collections.Generic.HashSet<System.UInt32>
    // s_MissingCharacterList: System_Collections.Generic.List<System.UInt32> = lfv(this.handle, "s_MissingCharacterList") as unknown as System_Collections.Generic.List<System.UInt32>
    // m_MissingUnicodesFromFontFile: System_Collections.Generic.HashSet<System.UInt32> = lfv(this.handle, "m_MissingUnicodesFromFontFile") as unknown as System_Collections.Generic.HashSet<System.UInt32>
    FallbackSearchQueryLookup: NativePointer = lfv(this.handle, "FallbackSearchQueryLookup")
    k_SearchedFontAssetLookup: NativePointer = lfv(this.handle, "k_SearchedFontAssetLookup")
    k_FontAssets_FontFeaturesUpdateQueue: NativePointer = lfv(this.handle, "k_FontAssets_FontFeaturesUpdateQueue")
    k_FontAssets_FontFeaturesUpdateQueueLookup: NativePointer = lfv(this.handle, "k_FontAssets_FontFeaturesUpdateQueueLookup")
    k_FontAssets_AtlasTexturesUpdateQueue: NativePointer = lfv(this.handle, "k_FontAssets_AtlasTexturesUpdateQueue")
    k_FontAssets_AtlasTexturesUpdateQueueLookup: NativePointer = lfv(this.handle, "k_FontAssets_AtlasTexturesUpdateQueueLookup")
    m_GlyphsToRender: NativePointer = lfv(this.handle, "m_GlyphsToRender")
    m_GlyphsRendered: NativePointer = lfv(this.handle, "m_GlyphsRendered")
    m_GlyphIndexList: NativePointer = lfv(this.handle, "m_GlyphIndexList")
    m_GlyphIndexListNewlyAdded: NativePointer = lfv(this.handle, "m_GlyphIndexListNewlyAdded")
    m_GlyphsToAdd: NativePointer = lfv(this.handle, "m_GlyphsToAdd")
    m_GlyphsToAddLookup: NativePointer = lfv(this.handle, "m_GlyphsToAddLookup")
    m_CharactersToAdd: NativePointer = lfv(this.handle, "m_CharactersToAdd")
    m_CharactersToAddLookup: NativePointer = lfv(this.handle, "m_CharactersToAddLookup")
    s_MissingCharacterList: NativePointer = lfv(this.handle, "s_MissingCharacterList")
    m_MissingUnicodesFromFontFile: NativePointer = lfv(this.handle, "m_MissingUnicodesFromFontFile")

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    get_version(): System_String {
        return readU16(Il2Cpp.Api.TMP_FontAsset._get_version(this.handle))
    }

    set_version(value: System_String): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._set_version(this.handle, allocUStr(value))
    }

    get_sourceFontFile(): UnityEngine_Font {
        return Il2Cpp.Api.TMP_FontAsset._get_sourceFontFile(this.handle)
    }

    set_sourceFontFile(value: UnityEngine_Font): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._set_sourceFontFile(this.handle, value)
    }

    get_atlasPopulationMode(): TMPro_AtlasPopulationMode {
        return Il2Cpp.Api.TMP_FontAsset._get_atlasPopulationMode(this.handle)
    }

    set_atlasPopulationMode(value: TMPro_AtlasPopulationMode): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._set_atlasPopulationMode(this.handle, value)
    }

    get_faceInfo(): UnityEngine_TextCore_FaceInfo {
        return Il2Cpp.Api.TMP_FontAsset._get_faceInfo(this.handle)
    }

    set_faceInfo(value: UnityEngine_TextCore_FaceInfo): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._set_faceInfo(this.handle, value)
    }

    // get_glyphTable(): System_Collections.Generic.List<UnityEngine.TextCore.Glyph> {
    //         return Il2Cpp.Api.TMP_FontAsset._get_glyphTable(this.handle)
    // }

    // set_glyphTable(value:System_Collections.Generic.List<UnityEngine.TextCore.Glyph>): System_Void {
    //         return Il2Cpp.Api.TMP_FontAsset._set_glyphTable(this.handle , value)
    // }

    // get_glyphLookupTable(): System_Collections.Generic.Dictionary<System.UInt32,UnityEngine.TextCore.Glyph> {
    //         return Il2Cpp.Api.TMP_FontAsset._get_glyphLookupTable(this.handle)
    // }

    // get_characterTable(): System_Collections.Generic.List<TMPro.TMP_Character> {
    //         return Il2Cpp.Api.TMP_FontAsset._get_characterTable(this.handle)
    // }

    // set_characterTable(value:System_Collections.Generic.List<TMPro.TMP_Character>): System_Void {
    //         return Il2Cpp.Api.TMP_FontAsset._set_characterTable(this.handle , value)
    // }

    // get_characterLookupTable(): System_Collections.Generic.Dictionary<System.UInt32,TMPro.TMP_Character> {
    //         return Il2Cpp.Api.TMP_FontAsset._get_characterLookupTable(this.handle)
    // }

    get_atlasTexture(): UnityEngine_Texture2D {
        return Il2Cpp.Api.TMP_FontAsset._get_atlasTexture(this.handle)
    }

    get_atlasTextures(): UnityEngine_Texture2D_Array {
        return Il2Cpp.Api.TMP_FontAsset._get_atlasTextures(this.handle)
    }

    set_atlasTextures(value: UnityEngine_Texture2D_Array): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._set_atlasTextures(this.handle, value)
    }

    get_atlasTextureCount(): System_Int32 {
        return Il2Cpp.Api.TMP_FontAsset._get_atlasTextureCount(this.handle)
    }

    get_isMultiAtlasTexturesEnabled(): System_Boolean {
        return Il2Cpp.Api.TMP_FontAsset._get_isMultiAtlasTexturesEnabled(this.handle)
    }

    set_isMultiAtlasTexturesEnabled(value: System_Boolean): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._set_isMultiAtlasTexturesEnabled(this.handle, value)
    }

    get_clearDynamicDataOnBuild(): System_Boolean {
        return Il2Cpp.Api.TMP_FontAsset._get_clearDynamicDataOnBuild(this.handle)
    }

    set_clearDynamicDataOnBuild(value: System_Boolean): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._set_clearDynamicDataOnBuild(this.handle, value)
    }

    // get_usedGlyphRects(): System_Collections.Generic.List<UnityEngine.TextCore.GlyphRect> {
    //         return Il2Cpp.Api.TMP_FontAsset._get_usedGlyphRects(this.handle)
    // }

    // set_usedGlyphRects(value:System_Collections.Generic.List<UnityEngine.TextCore.GlyphRect>): System_Void {
    //         return Il2Cpp.Api.TMP_FontAsset._set_usedGlyphRects(this.handle , value)
    // }

    // get_freeGlyphRects(): System_Collections.Generic.List<UnityEngine.TextCore.GlyphRect> {
    //         return Il2Cpp.Api.TMP_FontAsset._get_freeGlyphRects(this.handle)
    // }

    // set_freeGlyphRects(value:System_Collections.Generic.List<UnityEngine.TextCore.GlyphRect>): System_Void {
    //         return Il2Cpp.Api.TMP_FontAsset._set_freeGlyphRects(this.handle , value)
    // }

    get_fontInfo(): TMPro_FaceInfo_Legacy {
        return Il2Cpp.Api.TMP_FontAsset._get_fontInfo(this.handle)
    }

    get_atlasWidth(): System_Int32 {
        return Il2Cpp.Api.TMP_FontAsset._get_atlasWidth(this.handle)
    }

    set_atlasWidth(value: System_Int32): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._set_atlasWidth(this.handle, value)
    }

    get_atlasHeight(): System_Int32 {
        return Il2Cpp.Api.TMP_FontAsset._get_atlasHeight(this.handle)
    }

    set_atlasHeight(value: System_Int32): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._set_atlasHeight(this.handle, value)
    }

    get_atlasPadding(): System_Int32 {
        return Il2Cpp.Api.TMP_FontAsset._get_atlasPadding(this.handle)
    }

    set_atlasPadding(value: System_Int32): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._set_atlasPadding(this.handle, value)
    }

    get_atlasRenderMode(): UnityEngine_TextCore_LowLevel_GlyphRenderMode {
        return Il2Cpp.Api.TMP_FontAsset._get_atlasRenderMode(this.handle)
    }

    set_atlasRenderMode(value: UnityEngine_TextCore_LowLevel_GlyphRenderMode): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._set_atlasRenderMode(this.handle, value)
    }

    get_fontFeatureTable(): TMPro_TMP_FontFeatureTable {
        return Il2Cpp.Api.TMP_FontAsset._get_fontFeatureTable(this.handle)
    }

    set_fontFeatureTable(value: TMPro_TMP_FontFeatureTable): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._set_fontFeatureTable(this.handle, value)
    }

    // get_fallbackFontAssetTable(): System_Collections.Generic.List<TMPro.TMP_FontAsset> {
    //         return Il2Cpp.Api.TMP_FontAsset._get_fallbackFontAssetTable(this.handle)
    // }

    // set_fallbackFontAssetTable(value:System_Collections.Generic.List<TMPro.TMP_FontAsset>): System_Void {
    //         return Il2Cpp.Api.TMP_FontAsset._set_fallbackFontAssetTable(this.handle , value)
    // }

    get_creationSettings(): TMPro_FontAssetCreationSettings {
        return Il2Cpp.Api.TMP_FontAsset._get_creationSettings(this.handle)
    }

    set_creationSettings(value: TMPro_FontAssetCreationSettings): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._set_creationSettings(this.handle, value)
    }

    get_fontWeightTable(): TMPro_TMP_FontWeightPair_Array {
        return Il2Cpp.Api.TMP_FontAsset._get_fontWeightTable(this.handle)
    }

    set_fontWeightTable(value: TMPro_TMP_FontWeightPair_Array): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._set_fontWeightTable(this.handle, value)
    }

    static CreateFontAsset(font: UnityEngine_Font): TMPro_TMP_FontAsset_Impl {
        return new TMPro_TMP_FontAsset_Impl(Il2Cpp.Api.TMP_FontAsset._CreateFontAsset(font))
    }

    static CreateFontAsset_8(font: UnityEngine_Font, samplingPointSize: System_Int32, atlasPadding: System_Int32, renderMode: UnityEngine_TextCore_LowLevel_GlyphRenderMode, atlasWidth: System_Int32, atlasHeight: System_Int32, atlasPopulationMode: TMPro_AtlasPopulationMode, enableMultiAtlasSupport: System_Boolean): TMPro_TMP_FontAsset_Impl {
        return new TMPro_TMP_FontAsset_Impl(Il2Cpp.Api.TMP_FontAsset._CreateFontAsset(font, samplingPointSize, atlasPadding, renderMode, atlasWidth, atlasHeight, atlasPopulationMode, enableMultiAtlasSupport))
    }

    Awake(): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._Awake(this.handle)
    }

    ReadFontAssetDefinition(): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._ReadFontAssetDefinition(this.handle)
    }

    InitializeDictionaryLookupTables(): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._InitializeDictionaryLookupTables(this.handle)
    }

    InitializeGlyphLookupDictionary(): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._InitializeGlyphLookupDictionary(this.handle)
    }

    InitializeCharacterLookupDictionary(): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._InitializeCharacterLookupDictionary(this.handle)
    }

    InitializeGlyphPaidAdjustmentRecordsLookupDictionary(): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._InitializeGlyphPaidAdjustmentRecordsLookupDictionary(this.handle)
    }

    AddSynthesizedCharactersAndFaceMetrics(): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._AddSynthesizedCharactersAndFaceMetrics(this.handle)
    }

    AddSynthesizedCharacter(unicode: System_UInt32, isFontFaceLoaded: System_Boolean, addImmediately: System_Boolean): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._AddSynthesizedCharacter(this.handle, unicode, isFontFaceLoaded, addImmediately)
    }

    AddCharacterToLookupCache(unicode: System_UInt32, character: TMPro_TMP_Character): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._AddCharacterToLookupCache(this.handle, unicode, character)
    }

    SortCharacterTable(): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._SortCharacterTable(this.handle)
    }

    SortGlyphTable(): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._SortGlyphTable(this.handle)
    }

    SortFontFeatureTable(): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._SortFontFeatureTable(this.handle)
    }

    SortAllTables(): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._SortAllTables(this.handle)
    }

    HasCharacter(character: System_Int32): System_Boolean {
        return Il2Cpp.Api.TMP_FontAsset._HasCharacter(this.handle, character)
    }

    HasCharacter_3(character: System_Char, searchFallbacks: System_Boolean, tryAddCharacter: System_Boolean): System_Boolean {
        return Il2Cpp.Api.TMP_FontAsset._HasCharacter(this.handle, character, searchFallbacks, tryAddCharacter)
    }

    HasCharacter_Internal(character: System_UInt32, searchFallbacks: System_Boolean, tryAddCharacter: System_Boolean): System_Boolean {
        return Il2Cpp.Api.TMP_FontAsset._HasCharacter_Internal(this.handle, character, searchFallbacks, tryAddCharacter)
    }

    // HasCharacters(text:System_String, missingCharacters:System_Collections.Generic.List<System.Char>): System_Boolean {
    //         return Il2Cpp.Api.TMP_FontAsset._HasCharacters(this.handle , allocUStr(text), missingCharacters)
    // }

    // HasCharacters_4(text:System_String, missingCharacters:System_UInt32_Array, searchFallbacks:System_Boolean, tryAddCharacter:System_Boolean): System_Boolean {
    //         return Il2Cpp.Api.TMP_FontAsset._HasCharacters(this.handle , allocUStr(text), missingCharacters, searchFallbacks, tryAddCharacter)
    // }

    HasCharacters_1(text: System_String): System_Boolean {
        return Il2Cpp.Api.TMP_FontAsset._HasCharacters(this.handle, allocUStr(text))
    }

    static GetCharacters(fontAsset: TMPro_TMP_FontAsset_Impl): System_String {
        return readU16(Il2Cpp.Api.TMP_FontAsset._GetCharacters(fontAsset.handle))
    }

    static GetCharactersArray(fontAsset: TMPro_TMP_FontAsset_Impl): System_Int32_Array {
        return Il2Cpp.Api.TMP_FontAsset._GetCharactersArray(fontAsset.handle)
    }

    GetGlyphIndex(unicode: System_UInt32): System_UInt32 {
        return Il2Cpp.Api.TMP_FontAsset._GetGlyphIndex(this.handle, unicode)
    }

    static RegisterFontAssetForFontFeatureUpdate(fontAsset: TMPro_TMP_FontAsset_Impl): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._RegisterFontAssetForFontFeatureUpdate(fontAsset.handle)
    }

    static UpdateFontFeaturesForFontAssetsInQueue(): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._UpdateFontFeaturesForFontAssetsInQueue()
    }

    static RegisterFontAssetForAtlasTextureUpdate(fontAsset: TMPro_TMP_FontAsset_Impl): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._RegisterFontAssetForAtlasTextureUpdate(fontAsset.handle)
    }

    static UpdateAtlasTexturesForFontAssetsInQueue(): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._UpdateAtlasTexturesForFontAssetsInQueue()
    }

    // TryAddCharacters(unicodes:System_UInt32_Array, includeFontFeatures:System_Boolean): System_Boolean {
    //         return Il2Cpp.Api.TMP_FontAsset._TryAddCharacters(this.handle , unicodes, includeFontFeatures)
    // }

    // TryAddCharacters_3(unicodes:System_UInt32_Array, missingUnicodes:System_UInt32_Array, includeFontFeatures:System_Boolean): System_Boolean {
    //         return Il2Cpp.Api.TMP_FontAsset._TryAddCharacters(this.handle , unicodes, missingUnicodes, includeFontFeatures)
    // }

    // TryAddCharacters_2(characters:System_String, includeFontFeatures:System_Boolean): System_Boolean {
    //         return Il2Cpp.Api.TMP_FontAsset._TryAddCharacters(this.handle , characters, includeFontFeatures)
    // }

    // TryAddCharacters_3(characters:System_String, missingCharacters:System_String, includeFontFeatures:System_Boolean): System_Boolean {
    //         return Il2Cpp.Api.TMP_FontAsset._TryAddCharacters(this.handle , characters, missingCharacters, includeFontFeatures)
    // }

    TryAddCharacterInternal(unicode: System_UInt32, character: TMPro_TMP_Character): System_Boolean {
        return Il2Cpp.Api.TMP_FontAsset._TryAddCharacterInternal(this.handle, unicode, character)
    }

    TryGetCharacter_and_QueueRenderToTexture(unicode: System_UInt32, character: TMPro_TMP_Character): System_Boolean {
        return Il2Cpp.Api.TMP_FontAsset._TryGetCharacter_and_QueueRenderToTexture(this.handle, unicode, character)
    }

    TryAddGlyphsToAtlasTextures(): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._TryAddGlyphsToAtlasTextures(this.handle)
    }

    TryAddGlyphsToNewAtlasTexture(): System_Boolean {
        return Il2Cpp.Api.TMP_FontAsset._TryAddGlyphsToNewAtlasTexture(this.handle)
    }

    SetupNewAtlasTexture(): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._SetupNewAtlasTexture(this.handle)
    }

    UpdateAtlasTexture(): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._UpdateAtlasTexture(this.handle)
    }

    UpdateGlyphAdjustmentRecords(): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._UpdateGlyphAdjustmentRecords(this.handle)
    }

    // UpdateGlyphAdjustmentRecords_1(glyphIndexes:System_UInt32_Array): System_Void {
    //         return Il2Cpp.Api.TMP_FontAsset._UpdateGlyphAdjustmentRecords(this.handle , glyphIndexes)
    // }

    // UpdateGlyphAdjustmentRecords_1(glyphIndexes:System_Collections.Generic.List<System.UInt32>): System_Void {
    //         return Il2Cpp.Api.TMP_FontAsset._UpdateGlyphAdjustmentRecords(this.handle , glyphIndexes)
    // }

    // UpdateGlyphAdjustmentRecords_2(newGlyphIndexes:System_Collections.Generic.List<System.UInt32>, allGlyphIndexes:System_Collections.Generic.List<System.UInt32>): System_Void {
    //         return Il2Cpp.Api.TMP_FontAsset._UpdateGlyphAdjustmentRecords(this.handle , newGlyphIndexes, allGlyphIndexes)
    // }

    // CopyListDataToArray(srcList:System_Collections.Generic.List<T>, dstArray:T_Array): System_Void {
    //         return Il2Cpp.Api.TMP_FontAsset._CopyListDataToArray(this.handle , srcList, dstArray)
    // }

    ClearFontAssetData(setAtlasSizeToZero: System_Boolean): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._ClearFontAssetData(this.handle, setAtlasSizeToZero)
    }

    ClearFontAssetDataInternal(): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._ClearFontAssetDataInternal(this.handle)
    }

    UpdateFontAssetData(): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._UpdateFontAssetData(this.handle)
    }

    ClearFontAssetTables(): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._ClearFontAssetTables(this.handle)
    }

    ClearAtlasTextures(setAtlasSizeToZero: System_Boolean): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._ClearAtlasTextures(this.handle, setAtlasSizeToZero)
    }

    UpgradeFontAsset(): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._UpgradeFontAsset(this.handle)
    }

    UpgradeGlyphAdjustmentTableToFontFeatureTable(): System_Void {
        return Il2Cpp.Api.TMP_FontAsset._UpgradeGlyphAdjustmentTableToFontFeatureTable(this.handle)
    }

    _ctor_TMP_FontAsset(): System_Void {
        return Il2Cpp.Api.TMP_FontAsset.__ctor(this.handle)
    }

    static _cctor_TMP_FontAsset(): System_Void {
        return Il2Cpp.Api.TMP_FontAsset.__cctor()
    }

}

Il2Cpp.TMP_FontAsset = TMPro_TMP_FontAsset_Impl

declare global {
    namespace Il2Cpp {
        class TMP_FontAsset extends TMPro_TMP_FontAsset_Impl { }
    }
}

export { TMPro_TMP_FontAsset_Impl }