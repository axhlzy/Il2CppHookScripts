import { mscorlib_System_Object_impl as System_Object } from "../../../class"
import { System_MulticastDelegate_Impl as MulticastDelegate } from "../class"

type System_IAsyncResult = NativePointer
type System_IntPtr = NativePointer
type System_AsyncCallback = NativePointer

class UnityEngine_Events_UnityAction_Impl extends MulticastDelegate {

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    _ctor(object: System_Object, method: System_IntPtr): void {
        return Il2Cpp.Api.UnityAction.__ctor(this.handle, object, method)
    }

    Invoke(): void {
        return Il2Cpp.Api.UnityAction._Invoke(this.handle)
    }

    BeginInvoke(callback: System_AsyncCallback, object: System_Object): System_IAsyncResult {
        return Il2Cpp.Api.UnityAction._BeginInvoke(this.handle, callback, object)
    }

    EndInvoke(result: System_IAsyncResult): void {
        return Il2Cpp.Api.UnityAction._EndInvoke(this.handle, result)
    }

}

Il2Cpp.UnityAction = UnityEngine_Events_UnityAction_Impl

declare global {
    namespace Il2Cpp {
        class UnityAction extends UnityEngine_Events_UnityAction_Impl { }
    }
}

export { UnityEngine_Events_UnityAction_Impl }