import { mscorlib_System_Object_impl } from "../class"

type System_IntPtr = NativePointer
type System_Void = void
type System_Byte = NativePointer
type System_String = string
type System_Text_Encoding = NativePointer
// type UnityEngine_Networking_UnityWebRequest = NativePointer

class UnityEngine_Networking_DownloadHandler_Impl extends mscorlib_System_Object_impl {

    m_Ptr: System_IntPtr = lfv(this.handle, "m_Ptr") as unknown as System_IntPtr

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    Release(): System_Void {
        return Il2Cpp.Api.DownloadHandler._Release(this.handle)
    }

    _ctor_DownloadHandler(): System_Void {
        return Il2Cpp.Api.DownloadHandler.__ctor(this.handle)
    }

    Finalize(): System_Void {
        return Il2Cpp.Api.DownloadHandler._Finalize(this.handle)
    }

    Dispose(): System_Void {
        return Il2Cpp.Api.DownloadHandler._Dispose(this.handle)
    }

    get_data(): System_Byte[] {
        return Il2Cpp.Api.DownloadHandler._get_data(this.handle)
    }

    get_text(): System_String {
        return readU16(Il2Cpp.Api.DownloadHandler._get_text(this.handle))
    }

    GetData(): System_Byte[] {
        return Il2Cpp.Api.DownloadHandler._GetData(this.handle)
    }

    GetText(): System_String {
        return readU16(Il2Cpp.Api.DownloadHandler._GetText(this.handle))
    }

    GetTextEncoder(): System_Text_Encoding {
        return Il2Cpp.Api.DownloadHandler._GetTextEncoder(this.handle)
    }

    GetContentType(): System_String {
        return readU16(Il2Cpp.Api.DownloadHandler._GetContentType(this.handle))
    }

    // static GetCheckedDownloader(www: UnityEngine_Networking_UnityWebRequest): T {
    //     return Il2Cpp.Api.DownloadHandler._GetCheckedDownloader(www)
    // }

    static InternalGetByteArray(dh: UnityEngine_Networking_DownloadHandler_Impl): System_Byte[] {
        return Il2Cpp.Api.DownloadHandler._InternalGetByteArray(dh)
    }
}

Il2Cpp.DownloadHandler = UnityEngine_Networking_DownloadHandler_Impl

declare global {
    namespace Il2Cpp {
        class DownloadHandler extends UnityEngine_Networking_DownloadHandler_Impl { }
    }
}

export { UnityEngine_Networking_DownloadHandler_Impl }