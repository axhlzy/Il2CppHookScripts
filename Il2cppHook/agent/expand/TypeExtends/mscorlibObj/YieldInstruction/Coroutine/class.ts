import { UnityEngine_YieldInstruction_Impl } from "../class"

type System_Void = void
type System_IntPtr = NativePointer

class UnityEngine_Coroutine_Impl extends UnityEngine_YieldInstruction_Impl {

    m_Ptr: System_IntPtr = lfv(this.handle, "m_Ptr") as unknown as System_IntPtr

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    _ctor(): System_Void {
        return Il2Cpp.Api.Coroutine.__ctor(this.handle)
    }

    Finalize(): System_Void {
        return Il2Cpp.Api.Coroutine._Finalize(this.handle)
    }

    static ReleaseCoroutine(ptr: System_IntPtr): System_Void {
        return Il2Cpp.Api.Coroutine._ReleaseCoroutine(ptr)
    }

    toFieldsString() {
        return `${this.handle} | ${lfss(this.handle)}`
    }

}

Il2Cpp.Coroutine = UnityEngine_Coroutine_Impl

declare global {
    namespace Il2Cpp {
        class Coroutine extends UnityEngine_Coroutine_Impl { }
    }
}

export { UnityEngine_Coroutine_Impl }