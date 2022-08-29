import { UnityEngine_UI_MaskableGraphic_Impl } from "../class"

type UnityEngine_UI_FontData = NativePointer
type UnityEngine_TextGenerator = NativePointer
type UnityEngine_Material = NativePointer
type UnityEngine_UIVertex = NativePointer
type UnityEngine_Texture = NativePointer
type UnityEngine_Font = NativePointer
type UnityEngine_TextAnchor = NativePointer
type UnityEngine_HorizontalWrapMode = NativePointer
type UnityEngine_VerticalWrapMode = NativePointer
type UnityEngine_FontStyle = NativePointer
type UnityEngine_Vector2 = NativePointer
type UnityEngine_TextGenerationSettings = NativePointer
type UnityEngine_UI_VertexHelper = NativePointer

class UnityEngine_UI_Text_Impl extends UnityEngine_UI_MaskableGraphic_Impl {

    m_FontData: UnityEngine_UI_FontData = lfv(this.handle, "m_FontData") as unknown as UnityEngine_UI_FontData
    m_Text: string = readU16(lfv(this.handle, "m_Text"))
    m_TextCache: UnityEngine_TextGenerator = lfv(this.handle, "m_TextCache") as unknown as UnityEngine_TextGenerator
    m_TextCacheForLayout: UnityEngine_TextGenerator = lfv(this.handle, "m_TextCacheForLayout") as unknown as UnityEngine_TextGenerator
    s_DefaultText: UnityEngine_Material = lfv(this.handle, "s_DefaultText") as unknown as UnityEngine_Material
    m_DisableFontTextureRebuiltCallback: boolean = lfv(this.handle, "m_DisableFontTextureRebuiltCallback") as unknown as boolean
    m_TempVerts: UnityEngine_UIVertex[] = lfv(this.handle, "m_TempVerts") as unknown as UnityEngine_UIVertex[]


    _ctor(): void {
        return Il2Cpp.Api.Text.__ctor(this.handle)
    }

    get_cachedTextGenerator(): UnityEngine_TextGenerator {
        return Il2Cpp.Api.Text._get_cachedTextGenerator(this.handle)
    }

    get_cachedTextGeneratorForLayout(): UnityEngine_TextGenerator {
        return Il2Cpp.Api.Text._get_cachedTextGeneratorForLayout(this.handle)
    }

    get_mainTexture(): UnityEngine_Texture {
        return Il2Cpp.Api.Text._get_mainTexture(this.handle)
    }

    FontTextureChanged(): void {
        return Il2Cpp.Api.Text._FontTextureChanged(this.handle)
    }

    get_font(): UnityEngine_Font {
        return Il2Cpp.Api.Text._get_font(this.handle)
    }

    set_font(value: UnityEngine_Font): void {
        return Il2Cpp.Api.Text._set_font(this.handle, value)
    }

    get_text(): string {
        return readU16(Il2Cpp.Api.Text._get_text(this.handle))
    }

    set_text(value: string): void {
        return Il2Cpp.Api.Text._set_text(this.handle, allocUStr(value))
    }

    get_supportRichText(): boolean {
        return Il2Cpp.Api.Text._get_supportRichText(this.handle)
    }

    set_supportRichText(value: boolean): void {
        return Il2Cpp.Api.Text._set_supportRichText(this.handle, value)
    }

    get_resizeTextForBestFit(): boolean {
        return Il2Cpp.Api.Text._get_resizeTextForBestFit(this.handle)
    }

    set_resizeTextForBestFit(value: boolean): void {
        return Il2Cpp.Api.Text._set_resizeTextForBestFit(this.handle, value)
    }

    get_resizeTextMinSize(): number {
        return Il2Cpp.Api.Text._get_resizeTextMinSize(this.handle)
    }

    set_resizeTextMinSize(value: number): void {
        return Il2Cpp.Api.Text._set_resizeTextMinSize(this.handle, value)
    }

    get_resizeTextMaxSize(): number {
        return Il2Cpp.Api.Text._get_resizeTextMaxSize(this.handle)
    }

    set_resizeTextMaxSize(value: number): void {
        return Il2Cpp.Api.Text._set_resizeTextMaxSize(this.handle, value)
    }

    get_alignment(): UnityEngine_TextAnchor {
        return Il2Cpp.Api.Text._get_alignment(this.handle)
    }

    set_alignment(value: UnityEngine_TextAnchor): void {
        return Il2Cpp.Api.Text._set_alignment(this.handle, value)
    }

    get_alignByGeometry(): boolean {
        return Il2Cpp.Api.Text._get_alignByGeometry(this.handle)
    }

    set_alignByGeometry(value: boolean): void {
        return Il2Cpp.Api.Text._set_alignByGeometry(this.handle, value)
    }

    get_fontSize(): number {
        return Il2Cpp.Api.Text._get_fontSize(this.handle)
    }

    set_fontSize(value: number): void {
        return Il2Cpp.Api.Text._set_fontSize(this.handle, value)
    }

    get_horizontalOverflow(): UnityEngine_HorizontalWrapMode {
        return Il2Cpp.Api.Text._get_horizontalOverflow(this.handle)
    }

    set_horizontalOverflow(value: UnityEngine_HorizontalWrapMode): void {
        return Il2Cpp.Api.Text._set_horizontalOverflow(this.handle, value)
    }

    get_verticalOverflow(): UnityEngine_VerticalWrapMode {
        return Il2Cpp.Api.Text._get_verticalOverflow(this.handle)
    }

    set_verticalOverflow(value: UnityEngine_VerticalWrapMode): void {
        return Il2Cpp.Api.Text._set_verticalOverflow(this.handle, value)
    }

    get_lineSpacing(): number {
        return Il2Cpp.Api.Text._get_lineSpacing(this.handle)
    }

    set_lineSpacing(value: number): void {
        return Il2Cpp.Api.Text._set_lineSpacing(this.handle, value)
    }

    get_fontStyle(): UnityEngine_FontStyle {
        return Il2Cpp.Api.Text._get_fontStyle(this.handle)
    }

    set_fontStyle(value: UnityEngine_FontStyle): void {
        return Il2Cpp.Api.Text._set_fontStyle(this.handle, value)
    }

    get_pixelsPerUnit(): number {
        return Il2Cpp.Api.Text._get_pixelsPerUnit(this.handle)
    }

    OnEnable(): void {
        return Il2Cpp.Api.Text._OnEnable(this.handle)
    }

    OnDisable(): void {
        return Il2Cpp.Api.Text._OnDisable(this.handle)
    }

    UpdateGeometry(): void {
        return Il2Cpp.Api.Text._UpdateGeometry(this.handle)
    }

    AssignDefaultFont(): void {
        return Il2Cpp.Api.Text._AssignDefaultFont(this.handle)
    }

    GetGenerationSettings(extents: UnityEngine_Vector2): UnityEngine_TextGenerationSettings {
        return Il2Cpp.Api.Text._GetGenerationSettings(this.handle, extents)
    }

    GetTextAnchorPivot(anchor: UnityEngine_TextAnchor): UnityEngine_Vector2 {
        return Il2Cpp.Api.Text._GetTextAnchorPivot(anchor)
    }

    OnPopulateMesh(toFill: UnityEngine_UI_VertexHelper): void {
        return Il2Cpp.Api.Text._OnPopulateMesh(this.handle, toFill)
    }

    CalculateLayoutInputHorizontal(): void {
        return Il2Cpp.Api.Text._CalculateLayoutInputHorizontal(this.handle)
    }

    CalculateLayoutInputVertical(): void {
        return Il2Cpp.Api.Text._CalculateLayoutInputVertical(this.handle)
    }

    get_minWidth(): number {
        return Il2Cpp.Api.Text._get_minWidth(this.handle)
    }

    get_preferredWidth(): number {
        return Il2Cpp.Api.Text._get_preferredWidth(this.handle)
    }

    get_flexibleWidth(): number {
        return Il2Cpp.Api.Text._get_flexibleWidth(this.handle)
    }

    get_minHeight(): number {
        return Il2Cpp.Api.Text._get_minHeight(this.handle)
    }

    get_preferredHeight(): number {
        return Il2Cpp.Api.Text._get_preferredHeight(this.handle)
    }

    get_flexibleHeight(): number {
        return Il2Cpp.Api.Text._get_flexibleHeight(this.handle)
    }

    get_layoutPriority(): number {
        return Il2Cpp.Api.Text._get_layoutPriority(this.handle)
    }

    _cctor(): void {
        return Il2Cpp.Api.Text.__cctor()
    }

}

declare global {
    namespace Il2Cpp {
        class Text extends UnityEngine_UI_Text_Impl { }
    }
}

export { UnityEngine_UI_Text_Impl }