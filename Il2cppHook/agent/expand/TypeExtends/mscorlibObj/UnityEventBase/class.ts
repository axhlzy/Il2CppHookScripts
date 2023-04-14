import { mscorlib_System_Object_impl } from "../class";
import { InvokableCallList_impl as InvokableCallList } from "../InvokableCallList/class";

type PersistentCallGroup = NativePointer
type BaseInvokableCall = NativePointer
type mscorlib_System_Reflection_MethodInfo = NativePointer

export class UnityEngine_Events_UnityEventBase_Impl extends mscorlib_System_Object_impl {

    // m_Calls : InvokableCallList
    m_Calls: InvokableCallList = new InvokableCallList(lfv(this.handle, "m_Calls", findClass("UnityEventBase", ['UnityEngine.CoreModule'])))
    // m_CallsDirty : Boolean
    m_CallsDirty: boolean = lfv(this.handle, "m_CallsDirty", findClass("UnityEventBase", ['UnityEngine.CoreModule'])) as unknown as boolean
    // m_PersistentCalls : PersistentCallGroup
    m_PersistentCalls: PersistentCallGroup = lfv(this.handle, "m_PersistentCalls", findClass("UnityEventBase", ['UnityEngine.CoreModule']))

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    ctor_UnityEventBase(): mscorlib.UnityEventBase {
        return new UnityEngine_Events_UnityEventBase_Impl(mscorlib.Api.UnityEventBase._ctor_0(alloc()))
    }

    AddListener(call: BaseInvokableCall): void {
        return mscorlib.Api.UnityEventBase._AddCall(this.handle, call)
    }

    DirtyPersistentCalls(): void {
        return mscorlib.Api.UnityEventBase._DirtyPersistentCalls(this.handle)
    }

    Findmethod(target: mscorlib_System_Object_impl, method: mscorlib_System_Reflection_MethodInfo): void {
        return mscorlib.Api.UnityEventBase._FindMethod(this.handle, target, method)
    }

    Findmethod_2(target: mscorlib_System_Object_impl, method: mscorlib_System_Reflection_MethodInfo): void {
        return mscorlib.Api.UnityEventBase._FindMethod_2(this.handle, target, method)
    }

    get_Calls(): InvokableCallList {
        return this.m_Calls
    }

    get_CallsDirty(): boolean {
        return this.m_CallsDirty
    }

    get_PersistentCalls(): PersistentCallGroup {
        return this.m_PersistentCalls
    }

}

declare global {
    namespace mscorlib {
        class UnityEventBase extends UnityEngine_Events_UnityEventBase_Impl { }
    }
}

mscorlib.UnityEventBase = UnityEngine_Events_UnityEventBase_Impl

export { UnityEngine_Events_UnityEventBase_Impl as UnityEventBase }