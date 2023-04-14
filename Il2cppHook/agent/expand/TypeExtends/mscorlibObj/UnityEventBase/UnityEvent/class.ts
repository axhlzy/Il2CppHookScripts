import { mscorlib_System_Object_impl as System_Object } from "../../class"
import { UnityEngine_Events_UnityEventBase_Impl as UnityEventBase } from "../class"

type UnityEngine_Events_UnityAction = NativePointer
type System_Reflection_MethodInfo = NativePointer
type UnityEngine_Events_BaseInvokableCall = NativePointer

class UnityEngine_Events_UnityEvent_Impl extends UnityEventBase {

    m_InvokeArray: System_Object[] = lfv(this.handle, "m_InvokeArray") as unknown as System_Object[]

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    _ctor_UnityEvent(): void {
        return Il2Cpp.Api.UnityEvent.__ctor(this.handle)
    }

    AddListener(call: UnityEngine_Events_UnityAction): void {
        return Il2Cpp.Api.UnityEvent._AddListener(this.handle, call)
    }

    RemoveListener(call: UnityEngine_Events_UnityAction): void {
        return Il2Cpp.Api.UnityEvent._RemoveListener(this.handle, call)
    }

    FindMethod_Impl(name: string, targetObj: System_Object): System_Reflection_MethodInfo {
        return Il2Cpp.Api.UnityEvent._FindMethod_Impl(this.handle, name, targetObj)
    }

    GetDelegate(target: System_Object, theFunction: System_Reflection_MethodInfo): UnityEngine_Events_BaseInvokableCall {
        return Il2Cpp.Api.UnityEvent._GetDelegate(this.handle, target, theFunction)
    }

    static GetDelegate_1(action: UnityEngine_Events_UnityAction): UnityEngine_Events_BaseInvokableCall {
        return Il2Cpp.Api.UnityEvent._GetDelegate(action)
    }

    Invoke(): void {
        return Il2Cpp.Api.UnityEvent._Invoke(this.handle)
    }

}

Il2Cpp.UnityEvent = UnityEngine_Events_UnityEvent_Impl

declare global {
    namespace Il2Cpp {
        class UnityEvent extends UnityEngine_Events_UnityEvent_Impl { }
    }
}

export { UnityEngine_Events_UnityEvent_Impl }
