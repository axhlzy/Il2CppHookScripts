import { UnityEngine_Networking_DownloadHandler_Impl as DownloadHandler } from "../class"

type System_Byte = NativePointer
type System_IntPtr = NativePointer
type System_Void = void

class UnityEngine_Networking_DownloadHandlerBuffer_Impl extends DownloadHandler {

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }
    static Create(obj: UnityEngine_Networking_DownloadHandlerBuffer_Impl): System_IntPtr {
        return Il2Cpp.Api.DownloadHandlerBuffer._Create(obj)
    }

    InternalCreateBuffer(): System_Void {
        return Il2Cpp.Api.DownloadHandlerBuffer._InternalCreateBuffer(this.handle)
    }

    _ctor(): System_Void {
        return Il2Cpp.Api.DownloadHandlerBuffer.__ctor(this.handle)
    }

    GetData(): System_Byte[] {
        return Il2Cpp.Api.DownloadHandlerBuffer._GetData(this.handle)
    }

    InternalGetData(): System_Byte[] {
        return Il2Cpp.Api.DownloadHandlerBuffer._InternalGetData(this.handle)
    }

}

Il2Cpp.DownloadHandlerBuffer = UnityEngine_Networking_DownloadHandlerBuffer_Impl

declare global {
    namespace Il2Cpp {
        class DownloadHandlerBuffer extends UnityEngine_Networking_DownloadHandlerBuffer_Impl { }
    }
}

export { UnityEngine_Networking_DownloadHandlerBuffer_Impl }