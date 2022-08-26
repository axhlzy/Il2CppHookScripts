import { mscorlib_System_Object_impl } from "../class";
import { InvokableCallList_impl } from "../InvokableCallList/class";

type PersistentCallGroup = NativePointer
type BaseInvokableCall = NativePointer
type mscorlib_System_Reflection_MethodInfo = NativePointer

export class UnityEngine_Events_UnityEventBase_Impl extends mscorlib_System_Object_impl {

    // m_Calls : InvokableCallList
    m_Calls: InvokableCallList_impl = new InvokableCallList_impl(lfv(this.handle, "m_Calls", findClass("UnityEventBase", ['UnityEngine.CoreModule'])))
    // m_CallsDirty : Boolean
    m_CallsDirty: boolean = lfv(this.handle, "m_CallsDirty", findClass("UnityEventBase", ['UnityEngine.CoreModule'])) as unknown as boolean
    // m_PersistentCalls : PersistentCallGroup
    m_PersistentCalls: PersistentCallGroup = lfv(this.handle, "m_PersistentCalls", findClass("UnityEventBase", ['UnityEngine.CoreModule']))

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper);
    }

    ctor_0(): Il2Cpp.UnityEventBase {
        return new UnityEngine_Events_UnityEventBase_Impl(Il2cpp.Api.UnityEventBase._ctor_0(alloc()))
    }

    AddListener(call: BaseInvokableCall): void {
        return Il2cpp.Api.UnityEventBase._AddCall(this.handle, call)
    }

    DirtyPersistentCalls(): void {
        return Il2cpp.Api.UnityEventBase._DirtyPersistentCalls(this.handle)
    }

    Findmethod(target: mscorlib_System_Object_impl, method: mscorlib_System_Reflection_MethodInfo): void {
        return Il2cpp.Api.UnityEventBase._FindMethod(this.handle, target, method)
    }

    Findmethod_2(target: mscorlib_System_Object_impl, method: mscorlib_System_Reflection_MethodInfo): void {
        return Il2cpp.Api.UnityEventBase._FindMethod_2(this.handle, target, method)
    }
}

declare global {
    namespace Il2Cpp {
        class UnityEventBase extends UnityEngine_Events_UnityEventBase_Impl { }
    }
}

Il2Cpp.UnityEventBase = UnityEngine_Events_UnityEventBase_Impl;

export { mscorlib_System_Object_impl };