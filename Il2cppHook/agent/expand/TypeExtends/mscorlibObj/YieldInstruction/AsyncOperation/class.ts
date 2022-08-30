import { UnityEngine_YieldInstruction_Impl as YieldInstruction } from "../class"

type System_IntPtr = NativePointer
type Action = NativePointer

class UnityEngine_AsyncOperation_Impl extends YieldInstruction {

    m_Ptr: System_IntPtr = lfv(this.handle, "m_Ptr") as unknown as System_IntPtr
    // m_completeCallback: System_Action<UnityEngine.AsyncOperation> = lfv(this.handle, "m_completeCallback") as unknown as System_Action<UnityEngine.AsyncOperation>
    m_completeCallback: Action = lfv(this.handle, "m_completeCallback") as Action


    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    static InternalDestroy(ptr: System_IntPtr): void {
        return Il2Cpp.Api.AsyncOperation._InternalDestroy(ptr)
    }

    get_isDone(): boolean {
        return Il2Cpp.Api.AsyncOperation._get_isDone(this.handle)
    }

    get_progress(): number {
        return Il2Cpp.Api.AsyncOperation._get_progress(this.handle)
    }

    set_allowSceneActivation(value: boolean): void {
        return Il2Cpp.Api.AsyncOperation._set_allowSceneActivation(this.handle, value)
    }

    Finalize(): void {
        return Il2Cpp.Api.AsyncOperation._Finalize(this.handle)
    }

    InvokeCompletionEvent(): void {
        return Il2Cpp.Api.AsyncOperation._InvokeCompletionEvent(this.handle)
    }

    _ctor(): void {
        return Il2Cpp.Api.AsyncOperation.__ctor(this.handle)
    }
}

Il2Cpp.AsyncOperation = UnityEngine_AsyncOperation_Impl

declare global {
    namespace Il2Cpp {
        class AsyncOperation extends UnityEngine_AsyncOperation_Impl { }
    }
}

export { UnityEngine_AsyncOperation_Impl }