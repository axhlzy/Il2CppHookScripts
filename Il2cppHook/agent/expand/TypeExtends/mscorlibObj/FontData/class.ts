import { mscorlib_System_Object_impl } from "../class"

type UnityEngine_Font = NativePointer
type UnityEngine_FontStyle = NativePointer
type UnityEngine_TextAnchor = NativePointer
type UnityEngine_HorizontalWrapMode = NativePointer
type UnityEngine_VerticalWrapMode = NativePointer

class UnityEngine_UI_FontData_Impl extends mscorlib_System_Object_impl {

    m_Font: UnityEngine_Font = lfv(this.handle, "m_Font") as unknown as UnityEngine_Font
    m_FontSize: number = lfv(this.handle, "m_FontSize") as unknown as number
    m_FontStyle: UnityEngine_FontStyle = lfv(this.handle, "m_FontStyle") as unknown as UnityEngine_FontStyle
    m_BestFit: boolean = lfv(this.handle, "m_BestFit") as unknown as boolean
    m_MinSize: number = lfv(this.handle, "m_MinSize") as unknown as number
    m_MaxSize: number = lfv(this.handle, "m_MaxSize") as unknown as number
    m_Alignment: UnityEngine_TextAnchor = lfv(this.handle, "m_Alignment") as unknown as UnityEngine_TextAnchor
    m_AlignByGeometry: boolean = lfv(this.handle, "m_AlignByGeometry") as unknown as boolean
    m_RichText: boolean = lfv(this.handle, "m_RichText") as unknown as boolean
    m_HorizontalOverflow: UnityEngine_HorizontalWrapMode = lfv(this.handle, "m_HorizontalOverflow") as unknown as UnityEngine_HorizontalWrapMode
    m_VerticalOverflow: UnityEngine_VerticalWrapMode = lfv(this.handle, "m_VerticalOverflow") as unknown as UnityEngine_VerticalWrapMode
    m_LineSpacing: number = lfv(this.handle, "m_LineSpacing") as unknown as number

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    get_defaultFontData(): UnityEngine_UI_FontData_Impl {
        return Il2Cpp.Api.FontData._get_defaultFontData()
    }

    get_font(): UnityEngine_Font {
        return Il2Cpp.Api.FontData._get_font(this.handle)
    }

    set_font(value: UnityEngine_Font): void {
        return Il2Cpp.Api.FontData._set_font(this.handle, value)
    }

    get_fontSize(): number {
        return Il2Cpp.Api.FontData._get_fontSize(this.handle)
    }

    set_fontSize(value: number): void {
        return Il2Cpp.Api.FontData._set_fontSize(this.handle, value)
    }

    get_fontStyle(): UnityEngine_FontStyle {
        return Il2Cpp.Api.FontData._get_fontStyle(this.handle)
    }

    set_fontStyle(value: UnityEngine_FontStyle): void {
        return Il2Cpp.Api.FontData._set_fontStyle(this.handle, value)
    }

    get_bestFit(): boolean {
        return Il2Cpp.Api.FontData._get_bestFit(this.handle)
    }

    set_bestFit(value: boolean): void {
        return Il2Cpp.Api.FontData._set_bestFit(this.handle, value)
    }

    get_minSize(): number {
        return Il2Cpp.Api.FontData._get_minSize(this.handle)
    }

    set_minSize(value: number): void {
        return Il2Cpp.Api.FontData._set_minSize(this.handle, value)
    }

    get_maxSize(): number {
        return Il2Cpp.Api.FontData._get_maxSize(this.handle)
    }

    set_maxSize(value: number): void {
        return Il2Cpp.Api.FontData._set_maxSize(this.handle, value)
    }

    get_alignment(): UnityEngine_TextAnchor {
        return Il2Cpp.Api.FontData._get_alignment(this.handle)
    }

    set_alignment(value: UnityEngine_TextAnchor): void {
        return Il2Cpp.Api.FontData._set_alignment(this.handle, value)
    }

    get_alignByGeometry(): boolean {
        return Il2Cpp.Api.FontData._get_alignByGeometry(this.handle)
    }

    set_alignByGeometry(value: boolean): void {
        return Il2Cpp.Api.FontData._set_alignByGeometry(this.handle, value)
    }

    get_richText(): boolean {
        return Il2Cpp.Api.FontData._get_richText(this.handle)
    }

    set_richText(value: boolean): void {
        return Il2Cpp.Api.FontData._set_richText(this.handle, value)
    }

    get_horizontalOverflow(): UnityEngine_HorizontalWrapMode {
        return Il2Cpp.Api.FontData._get_horizontalOverflow(this.handle)
    }

    set_horizontalOverflow(value: UnityEngine_HorizontalWrapMode): void {
        return Il2Cpp.Api.FontData._set_horizontalOverflow(this.handle, value)
    }

    get_verticalOverflow(): UnityEngine_VerticalWrapMode {
        return Il2Cpp.Api.FontData._get_verticalOverflow(this.handle)
    }

    set_verticalOverflow(value: UnityEngine_VerticalWrapMode): void {
        return Il2Cpp.Api.FontData._set_verticalOverflow(this.handle, value)
    }

    get_lineSpacing(): number {
        return Il2Cpp.Api.FontData._get_lineSpacing(this.handle)
    }

    set_lineSpacing(value: number): void {
        return Il2Cpp.Api.FontData._set_lineSpacing(this.handle, value)
    }

    UnityEngine_ISerializationCallbackReceiver_OnBeforeSerialize(): void {
        return Il2Cpp.Api.FontData._UnityEngine_ISerializationCallbackReceiver_OnBeforeSerialize(this.handle)
    }

    UnityEngine_ISerializationCallbackReceiver_OnAfterDeserialize(): void {
        return Il2Cpp.Api.FontData._UnityEngine_ISerializationCallbackReceiver_OnAfterDeserialize(this.handle)
    }

    _ctor(): void {
        return Il2Cpp.Api.FontData.__ctor(this.handle)
    }

}

declare global {
    namespace Il2Cpp {
        class FontData extends UnityEngine_UI_FontData_Impl { }
    }
}

export { UnityEngine_UI_FontData_Impl }