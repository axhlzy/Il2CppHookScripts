import { System_Boolean_Impl as System_Boolean } from "../../../ValueType/Boolean/class"
import { UnityEngine_Color_Impl as Color } from "../../../ValueType/Color/class"
import { UnityEngine_Color32_Impl as Color32 } from "../../../ValueType/Color32/class"
import { UnityEngine_Texture_Impl } from "../class"

type System_Int32 = NativePointer
type System_Single = NativePointer
type System_IntPtr = NativePointer
type UnityEngine_Experimental_Rendering_GraphicsFormat = NativePointer
type UnityEngine_Experimental_Rendering_TextureCreationFlags = NativePointer
type UnityEngine_TextureFormat = NativePointer

class UnityEngine_Texture2D_Impl extends UnityEngine_Texture_Impl {

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }
    static get_whiteTexture(): UnityEngine_Texture2D_Impl {
        return new UnityEngine_Texture2D_Impl(Il2Cpp.Api.Texture2D._get_whiteTexture())
    }

    static Internal_CreateImpl(mono: UnityEngine_Texture2D_Impl, w: number, h: System_Int32, mipCount: System_Int32, format: UnityEngine_Experimental_Rendering_GraphicsFormat, flags: UnityEngine_Experimental_Rendering_TextureCreationFlags, nativeTex: System_IntPtr): boolean {
        return Il2Cpp.Api.Texture2D._Internal_CreateImpl(mono.handle, w, h, mipCount, format, flags, nativeTex)
    }

    static Internal_Create(mono: UnityEngine_Texture2D_Impl, w: number, h: System_Int32, mipCount: System_Int32, format: UnityEngine_Experimental_Rendering_GraphicsFormat, flags: UnityEngine_Experimental_Rendering_TextureCreationFlags, nativeTex: System_IntPtr): void {
        return Il2Cpp.Api.Texture2D._Internal_Create(mono.handle, w, h, mipCount, format, flags, nativeTex)
    }

    get_isReadable(): boolean {
        return Il2Cpp.Api.Texture2D._get_isReadable(this.handle)
    }

    ApplyImpl(updateMipmaps: boolean, makeNoLongerReadable: System_Boolean): void {
        return Il2Cpp.Api.Texture2D._ApplyImpl(this.handle, updateMipmaps, makeNoLongerReadable)
    }

    ResizeImpl(width: number, height: System_Int32): boolean {
        return Il2Cpp.Api.Texture2D._ResizeImpl(this.handle, width, height)
    }

    GetPixelBilinearImpl(image: number, u: number, v: System_Single): System_Single {
        return Il2Cpp.Api.Texture2D._GetPixelBilinearImpl(this.handle, image, u, v)
    }

    ResizeWithFormatImpl(width: number, height: System_Int32, format: UnityEngine_Experimental_Rendering_GraphicsFormat, hasMipMap: boolean): boolean {
        return Il2Cpp.Api.Texture2D._ResizeWithFormatImpl(this.handle, width, height, format, hasMipMap)
    }

    GetPixels32(miplevel: number): Color32[] {
        return Il2Cpp.Api.Texture2D._GetPixels32(this.handle, miplevel)
    }

    GetPixels32_0(): Color32[] {
        return Il2Cpp.Api.Texture2D._GetPixels32(this.handle)
    }

    _ctor_6(width: number, height: System_Int32, textureFormat: UnityEngine_TextureFormat, mipCount: System_Int32, linear: boolean, nativeTex: System_IntPtr): void {
        return Il2Cpp.Api.Texture2D.__ctor(this.handle, width, height, textureFormat, mipCount, linear, nativeTex)
    }

    _ctor_4(width: number, height: System_Int32, textureFormat: UnityEngine_TextureFormat, mipChain: boolean): void {
        return Il2Cpp.Api.Texture2D.__ctor(this.handle, width, height, textureFormat, mipChain)
    }

    _ctor_2(width: number, height: System_Int32): void {
        return Il2Cpp.Api.Texture2D.__ctor(this.handle, width, height)
    }

    GetPixelBilinear(u: number, v: System_Single): Color {
        return Il2Cpp.Api.Texture2D._GetPixelBilinear(this.handle, u, v)
    }

    Apply(updateMipmaps: boolean, makeNoLongerReadable: System_Boolean): void {
        return Il2Cpp.Api.Texture2D._Apply(this.handle, updateMipmaps, makeNoLongerReadable)
    }

    Apply_0(): void {
        return Il2Cpp.Api.Texture2D._Apply(this.handle)
    }

    Resize(width: number, height: System_Int32): boolean {
        return Il2Cpp.Api.Texture2D._Resize(this.handle, width, height)
    }

    Resize_4(width: number, height: System_Int32, format: UnityEngine_TextureFormat, hasMipMap: boolean): boolean {
        return Il2Cpp.Api.Texture2D._Resize(this.handle, width, height, format, hasMipMap)
    }

    GetPixelBilinearImpl_Injected(image: number, u: number, v: System_Single, ret: Color): void {
        return Il2Cpp.Api.Texture2D._GetPixelBilinearImpl_Injected(this.handle, image, u, v, ret)
    }

}

Il2Cpp.Texture2D = UnityEngine_Texture2D_Impl

declare global {
    namespace Il2Cpp {
        class Texture2D extends UnityEngine_Texture2D_Impl { }
    }
}

export { UnityEngine_Texture2D_Impl }