import { cache } from "decorator-cache-getter"

class UnityEngine_Texture2D_API {
    // public static Texture2D get_whiteTexture()
    @cache
    static get _get_whiteTexture() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Texture2D", "get_whiteTexture", 0, [], "pointer", [])
    }

    // private static Boolean Internal_CreateImpl(Texture2D mono,Int32 w,Int32 h,Int32 mipCount,GraphicsFormat format,TextureCreationFlags flags,IntPtr nativeTex)
    @cache
    static get _Internal_CreateImpl() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Texture2D", "Internal_CreateImpl", 7, ["UnityEngine.Texture2D", "System.Int32", "System.Int32", "System.Int32", "UnityEngine.Experimental.Rendering.GraphicsFormat", "UnityEngine.Experimental.Rendering.TextureCreationFlags", "System.IntPtr"], "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // private static Void Internal_Create(Texture2D mono,Int32 w,Int32 h,Int32 mipCount,GraphicsFormat format,TextureCreationFlags flags,IntPtr nativeTex)
    @cache
    static get _Internal_Create() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Texture2D", "Internal_Create", 7, ["UnityEngine.Texture2D", "System.Int32", "System.Int32", "System.Int32", "UnityEngine.Experimental.Rendering.GraphicsFormat", "UnityEngine.Experimental.Rendering.TextureCreationFlags", "System.IntPtr"], "void", ["pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public override Boolean get_isReadable()
    @cache
    static get _get_isReadable() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Texture2D", "get_isReadable", 0, [], "pointer", ["pointer"])
    }

    // private Void ApplyImpl(Boolean updateMipmaps,Boolean makeNoLongerReadable)
    @cache
    static get _ApplyImpl() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Texture2D", "ApplyImpl", 2, ["System.Boolean", "System.Boolean"], "void", ["pointer", "pointer", "pointer"])
    }

    // private Boolean ResizeImpl(Int32 width,Int32 height)
    @cache
    static get _ResizeImpl() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Texture2D", "ResizeImpl", 2, ["System.Int32", "System.Int32"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // private Color GetPixelBilinearImpl(Int32 image,Single u,Single v)
    @cache
    static get _GetPixelBilinearImpl() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Texture2D", "GetPixelBilinearImpl", 3, ["System.Int32", "System.Single", "System.Single"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // private Boolean ResizeWithFormatImpl(Int32 width,Int32 height,GraphicsFormat format,Boolean hasMipMap)
    @cache
    static get _ResizeWithFormatImpl() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Texture2D", "ResizeWithFormatImpl", 4, ["System.Int32", "System.Int32", "UnityEngine.Experimental.Rendering.GraphicsFormat", "System.Boolean"], "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public Color32[] GetPixels32(Int32 miplevel)
    @cache
    static get _GetPixels32() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Texture2D", "GetPixels32", 1, ["System.Int32"], "pointer", ["pointer", "pointer"])
    }

    // public Color32[] GetPixels32()
    @cache
    static get _GetPixels32_() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Texture2D", "GetPixels32", 0, [], "pointer", ["pointer"])
    }

    // internal Void .ctor(Int32 width,Int32 height,TextureFormat textureFormat,Int32 mipCount,Boolean linear,IntPtr nativeTex)
    @cache
    static get __ctor() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Texture2D", ".ctor", 6, ["System.Int32", "System.Int32", "UnityEngine.TextureFormat", "System.Int32", "System.Boolean", "System.IntPtr"], "void", ["pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public Void .ctor(Int32 width,Int32 height,TextureFormat textureFormat,Boolean mipChain)
    @cache
    static get __ctor_width_height_textureFormat_mipChain() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Texture2D", ".ctor", 4, ["System.Int32", "System.Int32", "UnityEngine.TextureFormat", "System.Boolean"], "void", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public Void .ctor(Int32 width,Int32 height)
    @cache
    static get __ctor_width_height() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Texture2D", ".ctor", 2, ["System.Int32", "System.Int32"], "void", ["pointer", "pointer", "pointer"])
    }

    // public Color GetPixelBilinear(Single u,Single v)
    @cache
    static get _GetPixelBilinear() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Texture2D", "GetPixelBilinear", 2, ["System.Single", "System.Single"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // public Void Apply(Boolean updateMipmaps,Boolean makeNoLongerReadable)
    @cache
    static get _Apply() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Texture2D", "Apply", 2, ["System.Boolean", "System.Boolean"], "void", ["pointer", "pointer", "pointer"])
    }

    // public Void Apply()
    @cache
    static get _Apply_() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Texture2D", "Apply", 0, [], "void", ["pointer"])
    }

    // public Boolean Resize(Int32 width,Int32 height)
    @cache
    static get _Resize() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Texture2D", "Resize", 2, ["System.Int32", "System.Int32"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // public Boolean Resize(Int32 width,Int32 height,TextureFormat format,Boolean hasMipMap)
    @cache
    static get _Resize_width_height_format_hasMipMap() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Texture2D", "Resize", 4, ["System.Int32", "System.Int32", "UnityEngine.TextureFormat", "System.Boolean"], "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // private Void GetPixelBilinearImpl_Injected(Int32 image,Single u,Single v,Color& ret)
    @cache
    static get _GetPixelBilinearImpl_Injected() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Texture2D", "GetPixelBilinearImpl_Injected", 4, ["System.Int32", "System.Single", "System.Single", "UnityEngine.Color&"], "void", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

}

Il2Cpp.Api.Texture2D = UnityEngine_Texture2D_API

declare global {
    namespace Il2Cpp.Api {
        class Texture2D extends UnityEngine_Texture2D_API { }
    }
}

export { }