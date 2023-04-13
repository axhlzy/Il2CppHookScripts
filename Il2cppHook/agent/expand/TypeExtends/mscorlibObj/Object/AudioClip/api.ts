import { cache } from "decorator-cache-getter"

class UnityEngine_AudioClip_API {
    // private Void .ctor()
    @cache
    static get __ctor() {
        return Il2Cpp.Api.o("UnityEngine.AudioModule", "UnityEngine.AudioClip", ".ctor", 0, [], "void", ["pointer"])
    }

    // public Single get_length()
    @cache
    static get _get_length() {
        return Il2Cpp.Api.o("UnityEngine.AudioModule", "UnityEngine.AudioClip", "get_length", 0, [], "pointer", ["pointer"])
    }

    // private Void InvokePCMReaderCallback_Internal(Single[] data)
    @cache
    static get _InvokePCMReaderCallback_Internal() {
        return Il2Cpp.Api.o("UnityEngine.AudioModule", "UnityEngine.AudioClip", "InvokePCMReaderCallback_Internal", 1, ["System.Single[]"], "void", ["pointer", "pointer"])
    }

    // private Void InvokePCMSetPositionCallback_Internal(Int32 position)
    @cache
    static get _InvokePCMSetPositionCallback_Internal() {
        return Il2Cpp.Api.o("UnityEngine.AudioModule", "UnityEngine.AudioClip", "InvokePCMSetPositionCallback_Internal", 1, ["System.Int32"], "void", ["pointer", "pointer"])
    }

}

Il2Cpp.Api.AudioClip = UnityEngine_AudioClip_API

declare global {
    namespace Il2Cpp.Api {
        class AudioClip extends UnityEngine_AudioClip_API { }
    }
}

export { }