import { cache } from "decorator-cache-getter"

class UnityEngine_Texture_API {
    // protected Void .ctor()
    @cache
    static get __ctor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Texture", ".ctor", 0, "void", ["pointer"])
    }

    // private Int32 GetDataWidth()
    @cache
    static get _GetDataWidth() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Texture", "GetDataWidth", 0, "pointer", ["pointer"])
    }

    // private Int32 GetDataHeight()
    @cache
    static get _GetDataHeight() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Texture", "GetDataHeight", 0, "pointer", ["pointer"])
    }

    // public virtual Int32 get_width()
    @cache
    static get _get_width() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Texture", "get_width", 0, "pointer", ["pointer"])
    }

    // public virtual Void set_width(Int32 value)
    @cache
    static get _set_width() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Texture", "set_width", 1, "void", ["pointer", "pointer"])
    }

    // public virtual Int32 get_height()
    @cache
    static get _get_height() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Texture", "get_height", 0, "pointer", ["pointer"])
    }

    // public virtual Void set_height(Int32 value)
    @cache
    static get _set_height() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Texture", "set_height", 1, "void", ["pointer", "pointer"])
    }

    // public virtual Boolean get_isReadable()
    @cache
    static get _get_isReadable() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Texture", "get_isReadable", 0, "pointer", ["pointer"])
    }

    // public TextureWrapMode get_wrapMode()
    @cache
    static get _get_wrapMode() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Texture", "get_wrapMode", 0, "pointer", ["pointer"])
    }

    // public Vector2 get_texelSize()
    @cache
    static get _get_texelSize() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Texture", "get_texelSize", 0, "pointer", ["pointer"])
    }

    // private Int32 Internal_GetActiveTextureColorSpace()
    @cache
    static get _Internal_GetActiveTextureColorSpace() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Texture", "Internal_GetActiveTextureColorSpace", 0, "pointer", ["pointer"])
    }

    // internal ColorSpace get_activeTextureColorSpace()
    @cache
    static get _get_activeTextureColorSpace() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Texture", "get_activeTextureColorSpace", 0, "pointer", ["pointer"])
    }

    // internal Boolean ValidateFormat(TextureFormat format)
    @cache
    static get _ValidateFormat() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Texture", "ValidateFormat", 1, "pointer", ["pointer", "pointer"])
    }

    // internal Boolean ValidateFormat(GraphicsFormat format,FormatUsage usage)
    @cache
    static get _ValidateFormat_format_usage() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Texture", "ValidateFormat", 2, ["UnityEngine.Experimental.Rendering.GraphicsFormat", "UnityEngine.Experimental.Rendering.FormatUsage"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // internal UnityException CreateNonReadableException(Texture t)
    @cache
    static get _CreateNonReadableException() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Texture", "CreateNonReadableException", 1, "pointer", ["pointer", "pointer"])
    }

    // private static Void .cctor()
    @cache
    static get __cctor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Texture", ".cctor", 0, "void", [])
    }

    // private Void get_texelSize_Injected(Vector2& ret)
    @cache
    static get _get_texelSize_Injected() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Texture", "get_texelSize_Injected", 1, "void", ["pointer", "pointer"])
    }
}

Il2Cpp.Api.Texture = UnityEngine_Texture_API

declare global {
    namespace Il2Cpp.Api {
        class Texture extends UnityEngine_Texture_API { }
    }
}

export { }