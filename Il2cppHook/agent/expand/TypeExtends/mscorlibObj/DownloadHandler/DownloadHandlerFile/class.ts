import { UnityEngine_Networking_DownloadHandler_Impl } from "../class"

type System_String = string
type System_Void = void
type System_Byte = NativePointer
type System_Boolean = boolean
type System_IntPtr = NativePointer

class UnityEngine_Networking_DownloadHandlerFile_Impl extends UnityEngine_Networking_DownloadHandler_Impl {

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }
    static Create(obj: UnityEngine_Networking_DownloadHandlerFile_Impl, path: System_String, append: System_Boolean): System_IntPtr {
        return Il2Cpp.Api.DownloadHandlerFile._Create(obj, path, append)
    }

    InternalCreateVFS(path: System_String, append: System_Boolean): System_Void {
        return Il2Cpp.Api.DownloadHandlerFile._InternalCreateVFS(this.handle, path, append)
    }

    _ctor_DownloadHandlerFile(path: System_String): System_Void {
        return Il2Cpp.Api.DownloadHandlerFile.__ctor(this.handle, path)
    }

    GetData(): System_Byte[] {
        return Il2Cpp.Api.DownloadHandlerFile._GetData(this.handle)
    }

    GetText(): System_String {
        return readU16(Il2Cpp.Api.DownloadHandlerFile._GetText(this.handle))
    }

}

Il2Cpp.DownloadHandlerFile = UnityEngine_Networking_DownloadHandlerFile_Impl

declare global {
    namespace Il2Cpp {
        class DownloadHandlerFile extends UnityEngine_Networking_DownloadHandlerFile_Impl { }
    }
}

export { UnityEngine_Networking_DownloadHandlerFile_Impl }