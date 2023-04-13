import { cache } from "decorator-cache-getter"

class UnityEngine_Networking_DownloadHandlerBuffer_API {
    // private static IntPtr Create(DownloadHandlerBuffer obj)
    @cache
    static get _Create() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.DownloadHandlerBuffer", "Create", 1, ["UnityEngine.Networking.DownloadHandlerBuffer"], "pointer", ["pointer"])
    }

    // private Void InternalCreateBuffer()
    @cache
    static get _InternalCreateBuffer() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.DownloadHandlerBuffer", "InternalCreateBuffer", 0, [], "void", ["pointer"])
    }

    // public Void .ctor()
    @cache
    static get __ctor() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.DownloadHandlerBuffer", ".ctor", 0, [], "void", ["pointer"])
    }

    // protected override Byte[] GetData()
    @cache
    static get _GetData() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.DownloadHandlerBuffer", "GetData", 0, [], "pointer", ["pointer"])
    }

    // private Byte[] InternalGetData()
    @cache
    static get _InternalGetData() {
        return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.DownloadHandlerBuffer", "InternalGetData", 0, [], "pointer", ["pointer"])
    }

}

Il2Cpp.Api.DownloadHandlerBuffer = UnityEngine_Networking_DownloadHandlerBuffer_API

declare global {
    namespace Il2Cpp.Api {
        class DownloadHandlerBuffer extends UnityEngine_Networking_DownloadHandlerBuffer_API { }
    }
}

export { }