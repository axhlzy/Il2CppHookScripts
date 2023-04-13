import { cache } from "decorator-cache-getter"

class UnityEngine_Networking_DownloadHandlerFile_API {

    // private static IntPtr Create(DownloadHandlerFile obj, String path, Boolean append)
    @cache
    static get _Create() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.DownloadHandlerFile", "Create", 3, ["UnityEngine.Networking.DownloadHandlerFile", "System.String", "System.Boolean"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // private Void InternalCreateVFS(String path, Boolean append)
    @cache
    static get _InternalCreateVFS() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.DownloadHandlerFile", "InternalCreateVFS", 2, ["System.String", "System.Boolean"], "void", ["pointer", "pointer", "pointer"])
    }

    // public Void .ctor(String path)
    @cache
    static get __ctor() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.DownloadHandlerFile", ".ctor", 1, ["System.String"], "void", ["pointer", "pointer"])
    }

    // protected override Byte[] GetData()
    @cache
    static get _GetData() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.DownloadHandlerFile", "GetData", 0, [], "pointer", ["pointer"])
    }

    // protected override String GetText()
    @cache
    static get _GetText() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.DownloadHandlerFile", "GetText", 0, [], "pointer", ["pointer"])
    }

}

Il2Cpp.Api.DownloadHandlerFile = UnityEngine_Networking_DownloadHandlerFile_API

declare global {
    namespace Il2Cpp.Api {
        class DownloadHandlerFile extends UnityEngine_Networking_DownloadHandlerFile_API { }
    }
}

export { }