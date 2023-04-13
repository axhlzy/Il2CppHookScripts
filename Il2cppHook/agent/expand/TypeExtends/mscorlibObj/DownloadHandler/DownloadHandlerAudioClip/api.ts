import { cache } from "decorator-cache-getter"

class UnityEngine_Networking_DownloadHandlerAudioClip_API {
    // private static IntPtr Create(DownloadHandlerAudioClip obj, String url, AudioType audioType)
    @cache
    static get _Create() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestAudioModule", "UnityEngine.Networking.DownloadHandlerAudioClip", "Create", 3, ["UnityEngine.Networking.DownloadHandlerAudioClip", "System.String", "UnityEngine.AudioType"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // private Void InternalCreateAudioClip(String url, AudioType audioType)
    @cache
    static get _InternalCreateAudioClip() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestAudioModule", "UnityEngine.Networking.DownloadHandlerAudioClip", "InternalCreateAudioClip", 2, ["System.String", "UnityEngine.AudioType"], "void", ["pointer", "pointer", "pointer"])
    }

    // public Void .ctor(String url, AudioType audioType)
    @cache
    static get __ctor() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestAudioModule", "UnityEngine.Networking.DownloadHandlerAudioClip", ".ctor", 2, ["System.String", "UnityEngine.AudioType"], "void", ["pointer", "pointer", "pointer"])
    }

    // protected override Byte[] GetData()
    @cache
    static get _GetData() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestAudioModule", "UnityEngine.Networking.DownloadHandlerAudioClip", "GetData", 0, [], "pointer", ["pointer"])
    }

    // protected override String GetText()
    @cache
    static get _GetText() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestAudioModule", "UnityEngine.Networking.DownloadHandlerAudioClip", "GetText", 0, [], "pointer", ["pointer"])
    }

    // public AudioClip get_audioClip()
    @cache
    static get _get_audioClip() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestAudioModule", "UnityEngine.Networking.DownloadHandlerAudioClip", "get_audioClip", 0, [], "pointer", ["pointer"])
    }

    // public static AudioClip GetContent(UnityWebRequest www)
    @cache
    static get _GetContent() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestAudioModule", "UnityEngine.Networking.DownloadHandlerAudioClip", "GetContent", 1, ["UnityEngine.Networking.UnityWebRequest"], "pointer", ["pointer"])
    }

}

Il2Cpp.Api.DownloadHandlerAudioClip = UnityEngine_Networking_DownloadHandlerAudioClip_API

declare global {
    namespace Il2Cpp.Api {
        class DownloadHandlerAudioClip extends UnityEngine_Networking_DownloadHandlerAudioClip_API { }
    }
}

export { }