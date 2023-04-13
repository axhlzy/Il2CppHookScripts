import { cache } from "decorator-cache-getter"

class UnityEngine_Networking_DownloadHandlerTexture_API {
    // private static IntPtr Create(DownloadHandlerTexture obj, Boolean readable)
    @cache
    static get _Create() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestTextureModule", "UnityEngine.Networking.DownloadHandlerTexture", "Create", 2, ["UnityEngine.Networking.DownloadHandlerTexture", "System.Boolean"], "pointer", ["pointer", "pointer"])
    }

    // private Void InternalCreateTexture(Boolean readable)
    @cache
    static get _InternalCreateTexture() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestTextureModule", "UnityEngine.Networking.DownloadHandlerTexture", "InternalCreateTexture", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // public Void .ctor(Boolean readable)
    @cache
    static get __ctor() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestTextureModule", "UnityEngine.Networking.DownloadHandlerTexture", ".ctor", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // protected override Byte[] GetData()
    @cache
    static get _GetData() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestTextureModule", "UnityEngine.Networking.DownloadHandlerTexture", "GetData", 0, [], "pointer", ["pointer"])
    }

    // public Texture2D get_texture()
    @cache
    static get _get_texture() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestTextureModule", "UnityEngine.Networking.DownloadHandlerTexture", "get_texture", 0, [], "pointer", ["pointer"])
    }

    // private Texture2D InternalGetTexture()
    @cache
    static get _InternalGetTexture() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestTextureModule", "UnityEngine.Networking.DownloadHandlerTexture", "InternalGetTexture", 0, [], "pointer", ["pointer"])
    }

    // private Texture2D InternalGetTextureNative()
    @cache
    static get _InternalGetTextureNative() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestTextureModule", "UnityEngine.Networking.DownloadHandlerTexture", "InternalGetTextureNative", 0, [], "pointer", ["pointer"])
    }

    // public static Texture2D GetContent(UnityWebRequest www)
    @cache
    static get _GetContent() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestTextureModule", "UnityEngine.Networking.DownloadHandlerTexture", "GetContent", 1, ["UnityEngine.Networking.UnityWebRequest"], "pointer", ["pointer"])
    }

}

Il2Cpp.Api.DownloadHandlerTexture = UnityEngine_Networking_DownloadHandlerTexture_API

declare global {
    namespace Il2Cpp.Api {
        class DownloadHandlerTexture extends UnityEngine_Networking_DownloadHandlerTexture_API { }
    }
}

export { }