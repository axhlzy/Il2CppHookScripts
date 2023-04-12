import { cache } from "decorator-cache-getter"

class UnityEngine_WWW_API {
    // public Void .ctor(String url)
    @cache
    static get __ctor() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestWWWModule", "UnityEngine.WWW", ".ctor", 1, ["System.String"], "void", ["pointer", "pointer"])
    }

    // public String get_error()
    @cache
    static get _get_error() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestWWWModule", "UnityEngine.WWW", "get_error", 0, [], "pointer", ["pointer"])
    }

    // private Texture2D CreateTextureFromDownloadedData(Boolean markNonReadable)
    @cache
    static get _CreateTextureFromDownloadedData() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestWWWModule", "UnityEngine.WWW", "CreateTextureFromDownloadedData", 1, ["System.Boolean"], "pointer", ["pointer", "pointer"])
    }

    // public Texture2D get_texture()
    @cache
    static get _get_texture() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestWWWModule", "UnityEngine.WWW", "get_texture", 0, [], "pointer", ["pointer"])
    }

    // public Void LoadImageIntoTexture(Texture2D texture)
    @cache
    static get _LoadImageIntoTexture() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestWWWModule", "UnityEngine.WWW", "LoadImageIntoTexture", 1, ["UnityEngine.Texture2D"], "void", ["pointer", "pointer"])
    }

    // public String get_url()
    @cache
    static get _get_url() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestWWWModule", "UnityEngine.WWW", "get_url", 0, [], "pointer", ["pointer"])
    }

    // public override Boolean get_keepWaiting()
    @cache
    static get _get_keepWaiting() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestWWWModule", "UnityEngine.WWW", "get_keepWaiting", 0, [], "pointer", ["pointer"])
    }

    // public Void Dispose()
    @cache
    static get _Dispose() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestWWWModule", "UnityEngine.WWW", "Dispose", 0, [], "void", ["pointer"])
    }

    // private Boolean WaitUntilDoneIfPossible()
    @cache
    static get _WaitUntilDoneIfPossible() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestWWWModule", "UnityEngine.WWW", "WaitUntilDoneIfPossible", 0, [], "pointer", ["pointer"])
    }

}

Il2Cpp.Api.WWW = UnityEngine_WWW_API

declare global {
    namespace Il2Cpp.Api {
        class WWW extends UnityEngine_WWW_API { }
    }
}

export { }