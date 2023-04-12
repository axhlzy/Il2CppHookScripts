import { UnityEngine_Texture2D_Impl as UnityEngine_Texture2D } from "../../Object/Texture/Texture2D/class"
import { UnityEngine_CustomYieldInstruction_Impl } from "../class"

type System_Void = void
type System_Boolean = boolean
type System_String = string

class UnityEngine_WWW_Impl extends UnityEngine_CustomYieldInstruction_Impl {

    // <threadPriority>k__BackingField: UnityEngine_ThreadPriority = lfv(this.handle, "<threadPriority>k__BackingField") as unknown as UnityEngine_ThreadPriority
    // _uwr: UnityEngine_Networking.UnityWebRequest = lfv(this.handle, "_uwr") as unknown as UnityEngine_Networking.UnityWebRequest
    // _assetBundle: UnityEngine_AssetBundle = lfv(this.handle, "_assetBundle") as unknown as UnityEngine_AssetBundle
    // _responseHeaders: System_Collections.Generic.Dictionary<System.String,System.String> = lfv(this.handle, "_responseHeaders") as unknown as System_Collections.Generic.Dictionary<System.String,System.String>

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    // _ctor(url: System_String): System_Void {
    //     return Il2Cpp.Api.WWW.__ctor(this.handle, url)
    // }

    get_error(): System_String {
        return readU16(Il2Cpp.Api.WWW._get_error(this.handle))
    }

    CreateTextureFromDownloadedData(markNonReadable: System_Boolean): UnityEngine_Texture2D {
        return Il2Cpp.Api.WWW._CreateTextureFromDownloadedData(this.handle, markNonReadable)
    }

    get_texture(): UnityEngine_Texture2D {
        return Il2Cpp.Api.WWW._get_texture(this.handle)
    }

    LoadImageIntoTexture(texture: UnityEngine_Texture2D): System_Void {
        return Il2Cpp.Api.WWW._LoadImageIntoTexture(this.handle, texture)
    }

    get_url(): System_String {
        return readU16(Il2Cpp.Api.WWW._get_url(this.handle))
    }

    get_keepWaiting(): System_Boolean {
        return Il2Cpp.Api.WWW._get_keepWaiting(this.handle)
    }

    Dispose(): System_Void {
        return Il2Cpp.Api.WWW._Dispose(this.handle)
    }

    WaitUntilDoneIfPossible(): System_Boolean {
        return Il2Cpp.Api.WWW._WaitUntilDoneIfPossible(this.handle)
    }
}

Il2Cpp.WWW = UnityEngine_WWW_Impl

declare global {
    namespace Il2Cpp {
        class WWW extends UnityEngine_WWW_Impl { }
    }
}

export { UnityEngine_WWW_Impl }