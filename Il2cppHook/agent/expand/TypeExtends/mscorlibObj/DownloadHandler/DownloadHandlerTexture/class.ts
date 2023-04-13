import { UnityEngine_Texture2D_Impl as UnityEngine_Texture2D } from "../../Object/Texture/Texture2D/class"
import { UnityEngine_Networking_DownloadHandler_Impl } from "../class"

type System_Boolean = boolean
type System_IntPtr = NativePointer
type System_Void = void
type System_Byte = NativePointer
type UnityEngine_Networking_UnityWebRequest = NativePointer

class UnityEngine_Networking_DownloadHandlerTexture_Impl extends UnityEngine_Networking_DownloadHandler_Impl {

    mTexture: UnityEngine_Texture2D = new UnityEngine_Texture2D(lfv(this.handle, "mTexture"))
    mHasTexture: System_Boolean = lfv(this.handle, "mHasTexture") as unknown as System_Boolean
    mNonReadable: System_Boolean = lfv(this.handle, "mNonReadable") as unknown as System_Boolean

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    static Create(obj: UnityEngine_Networking_DownloadHandlerTexture_Impl, readable: System_Boolean): System_IntPtr {
        return Il2Cpp.Api.DownloadHandlerTexture._Create(obj, readable)
    }

    InternalCreateTexture(readable: System_Boolean): System_Void {
        return Il2Cpp.Api.DownloadHandlerTexture._InternalCreateTexture(this.handle, readable)
    }

    _ctor_DownloadHandlerTexture(readable: System_Boolean): System_Void {
        return Il2Cpp.Api.DownloadHandlerTexture.__ctor(this.handle, readable)
    }

    GetData(): System_Byte[] {
        return Il2Cpp.Api.DownloadHandlerTexture._GetData(this.handle)
    }

    get_texture(): UnityEngine_Texture2D {
        return Il2Cpp.Api.DownloadHandlerTexture._get_texture(this.handle)
    }

    InternalGetTexture(): UnityEngine_Texture2D {
        return Il2Cpp.Api.DownloadHandlerTexture._InternalGetTexture(this.handle)
    }

    InternalGetTextureNative(): UnityEngine_Texture2D {
        return Il2Cpp.Api.DownloadHandlerTexture._InternalGetTextureNative(this.handle)
    }

    static GetContent(www: UnityEngine_Networking_UnityWebRequest): UnityEngine_Texture2D {
        return Il2Cpp.Api.DownloadHandlerTexture._GetContent(www)
    }

}

Il2Cpp.DownloadHandlerTexture = UnityEngine_Networking_DownloadHandlerTexture_Impl

declare global {
    namespace Il2Cpp {
        class DownloadHandlerTexture extends UnityEngine_Networking_DownloadHandlerTexture_Impl { }
    }
}

export { UnityEngine_Networking_DownloadHandlerTexture_Impl }