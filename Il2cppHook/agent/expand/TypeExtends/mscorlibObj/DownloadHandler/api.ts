import { cache } from "decorator-cache-getter"

class UnityEngine_Networking_DownloadHandler_API {
    // private Void Release()
    @cache
    static get _Release() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.DownloadHandler", "Release", 0, [], "void", ["pointer"])
    }

    // internal Void .ctor()
    @cache
    static get __ctor() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.DownloadHandler", ".ctor", 0, [], "void", ["pointer"])
    }

    // protected override Void Finalize()
    @cache
    static get _Finalize() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.DownloadHandler", "Finalize", 0, [], "void", ["pointer"])
    }

    // public Void Dispose()
    @cache
    static get _Dispose() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.DownloadHandler", "Dispose", 0, [], "void", ["pointer"])
    }

    // public Byte[] get_data()
    @cache
    static get _get_data() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.DownloadHandler", "get_data", 0, [], "pointer", ["pointer"])
    }

    // public String get_text()
    @cache
    static get _get_text() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.DownloadHandler", "get_text", 0, [], "pointer", ["pointer"])
    }

    // protected virtual Byte[] GetData()
    @cache
    static get _GetData() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.DownloadHandler", "GetData", 0, [], "pointer", ["pointer"])
    }

    // protected virtual String GetText()
    @cache
    static get _GetText() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.DownloadHandler", "GetText", 0, [], "pointer", ["pointer"])
    }

    // private Encoding GetTextEncoder()
    @cache
    static get _GetTextEncoder() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.DownloadHandler", "GetTextEncoder", 0, [], "pointer", ["pointer"])
    }

    // private String GetContentType()
    @cache
    static get _GetContentType() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.DownloadHandler", "GetContentType", 0, [], "pointer", ["pointer"])
    }

    // protected static T GetCheckedDownloader(UnityWebRequest www)
    @cache
    static get _GetCheckedDownloader() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.DownloadHandler", "GetCheckedDownloader", 1, ["UnityEngine.Networking.UnityWebRequest"], "pointer", ["pointer"])
    }

    // internal static Byte[] InternalGetByteArray(DownloadHandler dh)
    @cache
    static get _InternalGetByteArray() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.DownloadHandler", "InternalGetByteArray", 1, ["UnityEngine.Networking.DownloadHandler"], "pointer", ["pointer"])
    }

}

Il2Cpp.Api.DownloadHandler = UnityEngine_Networking_DownloadHandler_API

declare global {
    namespace Il2Cpp.Api {
        class DownloadHandler extends UnityEngine_Networking_DownloadHandler_API { }
    }
}

export { }