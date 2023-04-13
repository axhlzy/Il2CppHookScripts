import { UnityEngine_AudioClip_Impl as UnityEngine_AudioClip } from "../../Object/AudioClip/class"
import { UnityEngine_Networking_DownloadHandler_Impl } from "../class"
import { UnityEngine_AudioType } from "./enum"

type UnityEngine_Networking_UnityWebRequest = NativePointer
type System_IntPtr = NativePointer
type System_Byte = NativePointer
type System_String = string
type System_Void = void

class UnityEngine_Networking_DownloadHandlerAudioClip_Impl extends UnityEngine_Networking_DownloadHandler_Impl {

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }
    static Create(obj: UnityEngine_Networking_DownloadHandlerAudioClip_Impl, url: System_String, audioType: UnityEngine_AudioType): System_IntPtr {
        return Il2Cpp.Api.DownloadHandlerAudioClip._Create(obj, allocUStr(url), audioType)
    }

    InternalCreateAudioClip(url: System_String, audioType: UnityEngine_AudioType): System_Void {
        return Il2Cpp.Api.DownloadHandlerAudioClip._InternalCreateAudioClip(this.handle, url, audioType)
    }

    _ctor(url: System_String, audioType: UnityEngine_AudioType): System_Void {
        return Il2Cpp.Api.DownloadHandlerAudioClip.__ctor(this.handle, url, audioType)
    }

    GetData(): System_Byte[] {
        return Il2Cpp.Api.DownloadHandlerAudioClip._GetData(this.handle)
    }

    GetText(): System_String {
        return readU16(Il2Cpp.Api.DownloadHandlerAudioClip._GetText(this.handle))
    }

    get_audioClip(): UnityEngine_AudioClip {
        return new UnityEngine_AudioClip(Il2Cpp.Api.DownloadHandlerAudioClip._get_audioClip(this.handle))
    }

    static GetContent(www: UnityEngine_Networking_UnityWebRequest): UnityEngine_AudioClip {
        return Il2Cpp.Api.DownloadHandlerAudioClip._GetContent(www)
    }

}

Il2Cpp.DownloadHandlerAudioClip = UnityEngine_Networking_DownloadHandlerAudioClip_Impl

declare global {
    namespace Il2Cpp {
        class DownloadHandlerAudioClip extends UnityEngine_Networking_DownloadHandlerAudioClip_Impl { }
    }
}

export { UnityEngine_Networking_DownloadHandlerAudioClip_Impl }