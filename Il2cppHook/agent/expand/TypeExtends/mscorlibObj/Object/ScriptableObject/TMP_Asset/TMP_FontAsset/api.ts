import { cache } from "decorator-cache-getter"

class TMPro_TMP_FontAsset_API {
    // public String get_version()
    @cache
    static get _get_version() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "get_version", 0, [], "pointer", ["pointer"])
    }

    // internal Void set_version(String value)
    @cache
    static get _set_version() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "set_version", 1, ["System.String"], "void", ["pointer", "pointer"])
    }

    // public Font get_sourceFontFile()
    @cache
    static get _get_sourceFontFile() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "get_sourceFontFile", 0, [], "pointer", ["pointer"])
    }

    // internal Void set_sourceFontFile(Font value)
    @cache
    static get _set_sourceFontFile() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "set_sourceFontFile", 1, ["UnityEngine.Font"], "void", ["pointer", "pointer"])
    }

    // public AtlasPopulationMode get_atlasPopulationMode()
    @cache
    static get _get_atlasPopulationMode() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "get_atlasPopulationMode", 0, [], "pointer", ["pointer"])
    }

    // public Void set_atlasPopulationMode(AtlasPopulationMode value)
    @cache
    static get _set_atlasPopulationMode() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "set_atlasPopulationMode", 1, ["TMPro.AtlasPopulationMode"], "void", ["pointer", "pointer"])
    }

    // public FaceInfo get_faceInfo()
    @cache
    static get _get_faceInfo() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "get_faceInfo", 0, [], "pointer", ["pointer"])
    }

    // public Void set_faceInfo(FaceInfo value)
    @cache
    static get _set_faceInfo() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "set_faceInfo", 1, ["UnityEngine.TextCore.FaceInfo"], "void", ["pointer", "pointer"])
    }

    // public System.Collections.Generic.List<UnityEngine.TextCore.Glyph> get_glyphTable()
    @cache
    static get _get_glyphTable() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "get_glyphTable", 0, [], "pointer", ["pointer"])
    }

    // internal Void set_glyphTable(System.Collections.Generic.List<UnityEngine.TextCore.Glyph> value)
    @cache
    static get _set_glyphTable() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "set_glyphTable", 1, ["System.Collections.Generic.List<UnityEngine.TextCore.Glyph>"], "void", ["pointer", "pointer"])
    }

    // public System.Collections.Generic.Dictionary<System.UInt32,UnityEngine.TextCore.Glyph> get_glyphLookupTable()
    @cache
    static get _get_glyphLookupTable() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "get_glyphLookupTable", 0, [], "pointer", ["pointer"])
    }

    // public System.Collections.Generic.List<TMPro.TMP_Character> get_characterTable()
    @cache
    static get _get_characterTable() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "get_characterTable", 0, [], "pointer", ["pointer"])
    }

    // internal Void set_characterTable(System.Collections.Generic.List<TMPro.TMP_Character> value)
    @cache
    static get _set_characterTable() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "set_characterTable", 1, ["System.Collections.Generic.List<TMPro.TMP_Character>"], "void", ["pointer", "pointer"])
    }

    // public System.Collections.Generic.Dictionary<System.UInt32,TMPro.TMP_Character> get_characterLookupTable()
    @cache
    static get _get_characterLookupTable() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "get_characterLookupTable", 0, [], "pointer", ["pointer"])
    }

    // public Texture2D get_atlasTexture()
    @cache
    static get _get_atlasTexture() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "get_atlasTexture", 0, [], "pointer", ["pointer"])
    }

    // public Texture2D[] get_atlasTextures()
    @cache
    static get _get_atlasTextures() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "get_atlasTextures", 0, [], "pointer", ["pointer"])
    }

    // public Void set_atlasTextures(Texture2D[] value)
    @cache
    static get _set_atlasTextures() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "set_atlasTextures", 1, ["UnityEngine.Texture2D[]"], "void", ["pointer", "pointer"])
    }

    // public Int32 get_atlasTextureCount()
    @cache
    static get _get_atlasTextureCount() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "get_atlasTextureCount", 0, [], "pointer", ["pointer"])
    }

    // public Boolean get_isMultiAtlasTexturesEnabled()
    @cache
    static get _get_isMultiAtlasTexturesEnabled() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "get_isMultiAtlasTexturesEnabled", 0, [], "pointer", ["pointer"])
    }

    // public Void set_isMultiAtlasTexturesEnabled(Boolean value)
    @cache
    static get _set_isMultiAtlasTexturesEnabled() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "set_isMultiAtlasTexturesEnabled", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // internal Boolean get_clearDynamicDataOnBuild()
    @cache
    static get _get_clearDynamicDataOnBuild() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "get_clearDynamicDataOnBuild", 0, [], "pointer", ["pointer"])
    }

    // internal Void set_clearDynamicDataOnBuild(Boolean value)
    @cache
    static get _set_clearDynamicDataOnBuild() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "set_clearDynamicDataOnBuild", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // internal System.Collections.Generic.List<UnityEngine.TextCore.GlyphRect> get_usedGlyphRects()
    @cache
    static get _get_usedGlyphRects() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "get_usedGlyphRects", 0, [], "pointer", ["pointer"])
    }

    // internal Void set_usedGlyphRects(System.Collections.Generic.List<UnityEngine.TextCore.GlyphRect> value)
    @cache
    static get _set_usedGlyphRects() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "set_usedGlyphRects", 1, ["System.Collections.Generic.List<UnityEngine.TextCore.GlyphRect>"], "void", ["pointer", "pointer"])
    }

    // internal System.Collections.Generic.List<UnityEngine.TextCore.GlyphRect> get_freeGlyphRects()
    @cache
    static get _get_freeGlyphRects() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "get_freeGlyphRects", 0, [], "pointer", ["pointer"])
    }

    // internal Void set_freeGlyphRects(System.Collections.Generic.List<UnityEngine.TextCore.GlyphRect> value)
    @cache
    static get _set_freeGlyphRects() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "set_freeGlyphRects", 1, ["System.Collections.Generic.List<UnityEngine.TextCore.GlyphRect>"], "void", ["pointer", "pointer"])
    }

    // public FaceInfo_Legacy get_fontInfo()
    @cache
    static get _get_fontInfo() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "get_fontInfo", 0, [], "pointer", ["pointer"])
    }

    // public Int32 get_atlasWidth()
    @cache
    static get _get_atlasWidth() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "get_atlasWidth", 0, [], "pointer", ["pointer"])
    }

    // internal Void set_atlasWidth(Int32 value)
    @cache
    static get _set_atlasWidth() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "set_atlasWidth", 1, ["System.Int32"], "void", ["pointer", "pointer"])
    }

    // public Int32 get_atlasHeight()
    @cache
    static get _get_atlasHeight() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "get_atlasHeight", 0, [], "pointer", ["pointer"])
    }

    // internal Void set_atlasHeight(Int32 value)
    @cache
    static get _set_atlasHeight() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "set_atlasHeight", 1, ["System.Int32"], "void", ["pointer", "pointer"])
    }

    // public Int32 get_atlasPadding()
    @cache
    static get _get_atlasPadding() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "get_atlasPadding", 0, [], "pointer", ["pointer"])
    }

    // internal Void set_atlasPadding(Int32 value)
    @cache
    static get _set_atlasPadding() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "set_atlasPadding", 1, ["System.Int32"], "void", ["pointer", "pointer"])
    }

    // public GlyphRenderMode get_atlasRenderMode()
    @cache
    static get _get_atlasRenderMode() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "get_atlasRenderMode", 0, [], "pointer", ["pointer"])
    }

    // internal Void set_atlasRenderMode(GlyphRenderMode value)
    @cache
    static get _set_atlasRenderMode() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "set_atlasRenderMode", 1, ["UnityEngine.TextCore.LowLevel.GlyphRenderMode"], "void", ["pointer", "pointer"])
    }

    // public TMP_FontFeatureTable get_fontFeatureTable()
    @cache
    static get _get_fontFeatureTable() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "get_fontFeatureTable", 0, [], "pointer", ["pointer"])
    }

    // internal Void set_fontFeatureTable(TMP_FontFeatureTable value)
    @cache
    static get _set_fontFeatureTable() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "set_fontFeatureTable", 1, ["TMPro.TMP_FontFeatureTable"], "void", ["pointer", "pointer"])
    }

    // public System.Collections.Generic.List<TMPro.TMP_FontAsset> get_fallbackFontAssetTable()
    @cache
    static get _get_fallbackFontAssetTable() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "get_fallbackFontAssetTable", 0, [], "pointer", ["pointer"])
    }

    // public Void set_fallbackFontAssetTable(System.Collections.Generic.List<TMPro.TMP_FontAsset> value)
    @cache
    static get _set_fallbackFontAssetTable() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "set_fallbackFontAssetTable", 1, ["System.Collections.Generic.List<TMPro.TMP_FontAsset>"], "void", ["pointer", "pointer"])
    }

    // public FontAssetCreationSettings get_creationSettings()
    @cache
    static get _get_creationSettings() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "get_creationSettings", 0, [], "pointer", ["pointer"])
    }

    // public Void set_creationSettings(FontAssetCreationSettings value)
    @cache
    static get _set_creationSettings() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "set_creationSettings", 1, ["TMPro.FontAssetCreationSettings"], "void", ["pointer", "pointer"])
    }

    // public TMP_FontWeightPair[] get_fontWeightTable()
    @cache
    static get _get_fontWeightTable() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "get_fontWeightTable", 0, [], "pointer", ["pointer"])
    }

    // internal Void set_fontWeightTable(TMP_FontWeightPair[] value)
    @cache
    static get _set_fontWeightTable() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "set_fontWeightTable", 1, ["TMPro.TMP_FontWeightPair[]"], "void", ["pointer", "pointer"])
    }

    // public static TMP_FontAsset CreateFontAsset(Font font)
    @cache
    static get _CreateFontAsset() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "CreateFontAsset", 1, ["UnityEngine.Font"], "pointer", ["pointer"])
    }

    // public static TMP_FontAsset CreateFontAsset(Font font, Int32 samplingPointSize, Int32 atlasPadding, GlyphRenderMode renderMode, Int32 atlasWidth, Int32 atlasHeight, AtlasPopulationMode atlasPopulationMode, Boolean enableMultiAtlasSupport)
    @cache
    static get _CreateFontAsset_font_samplingPointSize_atlasPadding_renderMode_atlasWidth_atlasHeight_atlasPopulationMode_enableMultiAtlasSupport() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "CreateFontAsset", 8, ["UnityEngine.Font", "System.Int32", "System.Int32", "UnityEngine.TextCore.LowLevel.GlyphRenderMode", "System.Int32", "System.Int32", "TMPro.AtlasPopulationMode", "System.Boolean"], "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // private Void Awake()
    @cache
    static get _Awake() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "Awake", 0, [], "void", ["pointer"])
    }

    // public Void ReadFontAssetDefinition()
    @cache
    static get _ReadFontAssetDefinition() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "ReadFontAssetDefinition", 0, [], "void", ["pointer"])
    }

    // internal Void InitializeDictionaryLookupTables()
    @cache
    static get _InitializeDictionaryLookupTables() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "InitializeDictionaryLookupTables", 0, [], "void", ["pointer"])
    }

    // internal Void InitializeGlyphLookupDictionary()
    @cache
    static get _InitializeGlyphLookupDictionary() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "InitializeGlyphLookupDictionary", 0, [], "void", ["pointer"])
    }

    // internal Void InitializeCharacterLookupDictionary()
    @cache
    static get _InitializeCharacterLookupDictionary() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "InitializeCharacterLookupDictionary", 0, [], "void", ["pointer"])
    }

    // internal Void InitializeGlyphPaidAdjustmentRecordsLookupDictionary()
    @cache
    static get _InitializeGlyphPaidAdjustmentRecordsLookupDictionary() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "InitializeGlyphPaidAdjustmentRecordsLookupDictionary", 0, [], "void", ["pointer"])
    }

    // internal Void AddSynthesizedCharactersAndFaceMetrics()
    @cache
    static get _AddSynthesizedCharactersAndFaceMetrics() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "AddSynthesizedCharactersAndFaceMetrics", 0, [], "void", ["pointer"])
    }

    // private Void AddSynthesizedCharacter(UInt32 unicode, Boolean isFontFaceLoaded, Boolean addImmediately)
    @cache
    static get _AddSynthesizedCharacter() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "AddSynthesizedCharacter", 3, ["System.UInt32", "System.Boolean", "System.Boolean"], "void", ["pointer", "pointer", "pointer", "pointer"])
    }

    // internal Void AddCharacterToLookupCache(UInt32 unicode, TMP_Character character)
    @cache
    static get _AddCharacterToLookupCache() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "AddCharacterToLookupCache", 2, ["System.UInt32", "TMPro.TMP_Character"], "void", ["pointer", "pointer", "pointer"])
    }

    // internal Void SortCharacterTable()
    @cache
    static get _SortCharacterTable() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "SortCharacterTable", 0, [], "void", ["pointer"])
    }

    // internal Void SortGlyphTable()
    @cache
    static get _SortGlyphTable() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "SortGlyphTable", 0, [], "void", ["pointer"])
    }

    // internal Void SortFontFeatureTable()
    @cache
    static get _SortFontFeatureTable() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "SortFontFeatureTable", 0, [], "void", ["pointer"])
    }

    // internal Void SortAllTables()
    @cache
    static get _SortAllTables() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "SortAllTables", 0, [], "void", ["pointer"])
    }

    // public Boolean HasCharacter(Int32 character)
    @cache
    static get _HasCharacter() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "HasCharacter", 1, ["System.Int32"], "pointer", ["pointer", "pointer"])
    }

    // public Boolean HasCharacter(Char character, Boolean searchFallbacks, Boolean tryAddCharacter)
    @cache
    static get _HasCharacter_character_searchFallbacks_tryAddCharacter() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "HasCharacter", 3, ["System.Char", "System.Boolean", "System.Boolean"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // private Boolean HasCharacter_Internal(UInt32 character, Boolean searchFallbacks, Boolean tryAddCharacter)
    @cache
    static get _HasCharacter_Internal() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "HasCharacter_Internal", 3, ["System.UInt32", "System.Boolean", "System.Boolean"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // public Boolean HasCharacters(String text, System.Collections.Generic.List<System.Char>& missingCharacters)
    @cache
    static get _HasCharacters() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "HasCharacters", 2, ["System.String", "System.Collections.Generic.List<System.Char>&"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // public Boolean HasCharacters(String text, UInt32[]& missingCharacters, Boolean searchFallbacks, Boolean tryAddCharacter)
    @cache
    static get _HasCharacters_text_missingCharacters_searchFallbacks_tryAddCharacter() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "HasCharacters", 4, ["System.String", "System.UInt32[]&", "System.Boolean", "System.Boolean"], "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public Boolean HasCharacters(String text)
    @cache
    static get _HasCharacters_text() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "HasCharacters", 1, ["System.String"], "pointer", ["pointer", "pointer"])
    }

    // public static String GetCharacters(TMP_FontAsset fontAsset)
    @cache
    static get _GetCharacters() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "GetCharacters", 1, ["TMPro.TMP_FontAsset"], "pointer", ["pointer"])
    }

    // public static Int32[] GetCharactersArray(TMP_FontAsset fontAsset)
    @cache
    static get _GetCharactersArray() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "GetCharactersArray", 1, ["TMPro.TMP_FontAsset"], "pointer", ["pointer"])
    }

    // internal UInt32 GetGlyphIndex(UInt32 unicode)
    @cache
    static get _GetGlyphIndex() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "GetGlyphIndex", 1, ["System.UInt32"], "pointer", ["pointer", "pointer"])
    }

    // internal static Void RegisterFontAssetForFontFeatureUpdate(TMP_FontAsset fontAsset)
    @cache
    static get _RegisterFontAssetForFontFeatureUpdate() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "RegisterFontAssetForFontFeatureUpdate", 1, ["TMPro.TMP_FontAsset"], "void", ["pointer"])
    }

    // internal static Void UpdateFontFeaturesForFontAssetsInQueue()
    @cache
    static get _UpdateFontFeaturesForFontAssetsInQueue() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "UpdateFontFeaturesForFontAssetsInQueue", 0, [], "void", [])
    }

    // internal static Void RegisterFontAssetForAtlasTextureUpdate(TMP_FontAsset fontAsset)
    @cache
    static get _RegisterFontAssetForAtlasTextureUpdate() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "RegisterFontAssetForAtlasTextureUpdate", 1, ["TMPro.TMP_FontAsset"], "void", ["pointer"])
    }

    // internal static Void UpdateAtlasTexturesForFontAssetsInQueue()
    @cache
    static get _UpdateAtlasTexturesForFontAssetsInQueue() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "UpdateAtlasTexturesForFontAssetsInQueue", 0, [], "void", [])
    }

    // public Boolean TryAddCharacters(UInt32[] unicodes, Boolean includeFontFeatures)
    @cache
    static get _TryAddCharacters() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "TryAddCharacters", 2, ["System.UInt32[]", "System.Boolean"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // public Boolean TryAddCharacters(UInt32[] unicodes, UInt32[]& missingUnicodes, Boolean includeFontFeatures)
    @cache
    static get _TryAddCharacters_unicodes_missingUnicodes_includeFontFeatures() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "TryAddCharacters", 3, ["System.UInt32[]", "System.UInt32[]&", "System.Boolean"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // public Boolean TryAddCharacters(String characters, Boolean includeFontFeatures)
    @cache
    static get _TryAddCharacters_characters_includeFontFeatures() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "TryAddCharacters", 2, ["System.String", "System.Boolean"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // public Boolean TryAddCharacters(String characters, String& missingCharacters, Boolean includeFontFeatures)
    @cache
    static get _TryAddCharacters_characters_missingCharacters_includeFontFeatures() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "TryAddCharacters", 3, ["System.String", "System.String&", "System.Boolean"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // internal Boolean TryAddCharacterInternal(UInt32 unicode, TMP_Character& character)
    @cache
    static get _TryAddCharacterInternal() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "TryAddCharacterInternal", 2, ["System.UInt32", "TMPro.TMP_Character&"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // internal Boolean TryGetCharacter_and_QueueRenderToTexture(UInt32 unicode, TMP_Character& character)
    @cache
    static get _TryGetCharacter_and_QueueRenderToTexture() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "TryGetCharacter_and_QueueRenderToTexture", 2, ["System.UInt32", "TMPro.TMP_Character&"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // internal Void TryAddGlyphsToAtlasTextures()
    @cache
    static get _TryAddGlyphsToAtlasTextures() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "TryAddGlyphsToAtlasTextures", 0, [], "void", ["pointer"])
    }

    // private Boolean TryAddGlyphsToNewAtlasTexture()
    @cache
    static get _TryAddGlyphsToNewAtlasTexture() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "TryAddGlyphsToNewAtlasTexture", 0, [], "pointer", ["pointer"])
    }

    // private Void SetupNewAtlasTexture()
    @cache
    static get _SetupNewAtlasTexture() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "SetupNewAtlasTexture", 0, [], "void", ["pointer"])
    }

    // internal Void UpdateAtlasTexture()
    @cache
    static get _UpdateAtlasTexture() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "UpdateAtlasTexture", 0, [], "void", ["pointer"])
    }

    // internal Void UpdateGlyphAdjustmentRecords()
    @cache
    static get _UpdateGlyphAdjustmentRecords() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "UpdateGlyphAdjustmentRecords", 0, [], "void", ["pointer"])
    }

    // // internal Void UpdateGlyphAdjustmentRecords(UInt32[] glyphIndexes)
    // @cache
    // static get _UpdateGlyphAdjustmentRecords_glyphIndexes() {
    //         return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "UpdateGlyphAdjustmentRecords", 1, ["System.UInt32[]"], "void", ["pointer","pointer"])
    // }

    // // internal Void UpdateGlyphAdjustmentRecords(System.Collections.Generic.List<System.UInt32> glyphIndexes)
    // @cache
    // static get _UpdateGlyphAdjustmentRecords_glyphIndexes() {
    //         return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "UpdateGlyphAdjustmentRecords", 1, ["System.Collections.Generic.List<System.UInt32>"], "void", ["pointer","pointer"])
    // }

    // internal Void UpdateGlyphAdjustmentRecords(System.Collections.Generic.List<System.UInt32> newGlyphIndexes, System.Collections.Generic.List<System.UInt32> allGlyphIndexes)
    @cache
    static get _UpdateGlyphAdjustmentRecords_newGlyphIndexes_allGlyphIndexes() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "UpdateGlyphAdjustmentRecords", 2, ["System.Collections.Generic.List<System.UInt32>", "System.Collections.Generic.List<System.UInt32>"], "void", ["pointer", "pointer", "pointer"])
    }

    // private Void CopyListDataToArray(System.Collections.Generic.List<T> srcList, T[]& dstArray)
    @cache
    static get _CopyListDataToArray() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "CopyListDataToArray", 2, ["System.Collections.Generic.List<T>", "T[]&"], "void", ["pointer", "pointer", "pointer"])
    }

    // public Void ClearFontAssetData(Boolean setAtlasSizeToZero)
    @cache
    static get _ClearFontAssetData() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "ClearFontAssetData", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // internal Void ClearFontAssetDataInternal()
    @cache
    static get _ClearFontAssetDataInternal() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "ClearFontAssetDataInternal", 0, [], "void", ["pointer"])
    }

    // internal Void UpdateFontAssetData()
    @cache
    static get _UpdateFontAssetData() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "UpdateFontAssetData", 0, [], "void", ["pointer"])
    }

    // internal Void ClearFontAssetTables()
    @cache
    static get _ClearFontAssetTables() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "ClearFontAssetTables", 0, [], "void", ["pointer"])
    }

    // internal Void ClearAtlasTextures(Boolean setAtlasSizeToZero)
    @cache
    static get _ClearAtlasTextures() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "ClearAtlasTextures", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // internal Void UpgradeFontAsset()
    @cache
    static get _UpgradeFontAsset() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "UpgradeFontAsset", 0, [], "void", ["pointer"])
    }

    // private Void UpgradeGlyphAdjustmentTableToFontFeatureTable()
    @cache
    static get _UpgradeGlyphAdjustmentTableToFontFeatureTable() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", "UpgradeGlyphAdjustmentTableToFontFeatureTable", 0, [], "void", ["pointer"])
    }

    // public Void .ctor()
    @cache
    static get __ctor() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", ".ctor", 0, [], "void", ["pointer"])
    }

    // private static Void .cctor()
    @cache
    static get __cctor() {
        return Il2Cpp.Api.o("Unity.TextMeshPro", "TMPro.TMP_FontAsset", ".cctor", 0, [], "void", [])
    }

}

Il2Cpp.Api.TMP_FontAsset = TMPro_TMP_FontAsset_API

declare global {
    namespace Il2Cpp.Api {
        class TMP_FontAsset extends TMPro_TMP_FontAsset_API { }
    }
}

export { }