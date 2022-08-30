import { UnityEngine_Vector2_Impl as Vector2 } from "../../ValueType/Vector2/class"
import { UnityEngine_Object } from "../class"
import { UnityEngine_Texture_API } from "./api"
import {
    UnityEngine_ColorSpace as ColorSpace,
    UnityEngine_Experimental_Rendering_FormatUsage as FormatUsage,
    UnityEngine_Experimental_Rendering_GraphicsFormat as GraphicsFormat
} from "./enum"

type UnityEngine_TextureWrapMode = NativePointer
type UnityEngine_TextureFormat = NativePointer
type UnityEngine_UnityException = NativePointer

class UnityEngine_Texture_Impl extends UnityEngine_Object {

    GenerateAllMips: number = lfv(this.handle, "GenerateAllMips") as unknown as number

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    _ctor(): void {
        return UnityEngine_Texture_API.__ctor(allocP())
    }

    GetDataWidth(): number {
        return UnityEngine_Texture_API._GetDataWidth(this.handle)
    }

    GetDataHeight(): number {
        return UnityEngine_Texture_API._GetDataHeight(this.handle)
    }

    get_width(): number {
        return UnityEngine_Texture_API._get_width(this.handle)
    }

    set_width(value: number): void {
        return UnityEngine_Texture_API._set_width(this.handle, value)
    }

    get_height(): number {
        return UnityEngine_Texture_API._get_height(this.handle)
    }

    set_height(value: number): void {
        return UnityEngine_Texture_API._set_height(this.handle, value)
    }

    get_isReadable(): boolean {
        return UnityEngine_Texture_API._get_isReadable(this.handle)
    }

    get_wrapMode(): UnityEngine_TextureWrapMode {
        return UnityEngine_Texture_API._get_wrapMode(this.handle)
    }

    get_texelSize(): Vector2 {
        return new Vector2(UnityEngine_Texture_API._get_texelSize(this.handle))
    }

    Internal_GetActiveTextureColorSpace(): number {
        return UnityEngine_Texture_API._Internal_GetActiveTextureColorSpace(this.handle)
    }

    get_activeTextureColorSpace(): ColorSpace {
        return UnityEngine_Texture_API._get_activeTextureColorSpace(this.handle)
    }

    ValidateFormat(format: UnityEngine_TextureFormat): boolean {
        return UnityEngine_Texture_API._ValidateFormat(this.handle, format)
    }

    ValidateFormat_2(format: GraphicsFormat, usage: FormatUsage): boolean {
        return UnityEngine_Texture_API._ValidateFormat(this.handle, format, usage)
    }

    CreateNonReadableException(t: UnityEngine_Texture_Impl): UnityEngine_UnityException {
        return UnityEngine_Texture_API._CreateNonReadableException(this.handle, t.handle)
    }

    static _cctor(): void {
        return UnityEngine_Texture_API.__cctor()
    }

    get_texelSize_Injected(ret: Vector2): void {
        return UnityEngine_Texture_API._get_texelSize_Injected(this.handle, ret)
    }

}

Il2Cpp.Texture = UnityEngine_Texture_Impl

declare global {
    namespace Il2Cpp {
        class Texture extends UnityEngine_Texture_Impl { }
    }
}

export { UnityEngine_Texture_Impl }
