import { mscorlib_System_Object_impl } from "../class"

type System_IntPtr = NativePointer
type System_Boolean = NativePointer
type System_Void = void

class UnityEngine_GlobalJavaObjectRef_Impl extends mscorlib_System_Object_impl {

    m_disposed: System_Boolean = lfv(this.handle, "m_disposed") as unknown as System_Boolean
    m_jobject: System_IntPtr = lfv(this.handle, "m_jobject") as unknown as System_IntPtr

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }
    _ctor(jobject: System_IntPtr): System_Void {
        return Il2Cpp.Api.GlobalJavaObjectRef.__ctor(this.handle, jobject)
    }

    Finalize(): System_Void {
        return Il2Cpp.Api.GlobalJavaObjectRef._Finalize(this.handle)
    }

    static op_Implicit(obj: UnityEngine_GlobalJavaObjectRef_Impl): System_IntPtr {
        return Il2Cpp.Api.GlobalJavaObjectRef._op_Implicit(obj)
    }

    Dispose(): System_Void {
        return Il2Cpp.Api.GlobalJavaObjectRef._Dispose(this.handle)
    }

}

Il2Cpp.GlobalJavaObjectRef = UnityEngine_GlobalJavaObjectRef_Impl

declare global {
    namespace Il2Cpp {
        class GlobalJavaObjectRef extends UnityEngine_GlobalJavaObjectRef_Impl { }
    }
}

export { UnityEngine_GlobalJavaObjectRef_Impl }