import { mscorlib_System_Object_impl } from "../class"

type InvokableCallList = NativePointer
type BaseInvokableCall = NativePointer
type mscorlib_System_Reflection_MethodInfo = NativePointer

export class InvokableCallList_impl extends mscorlib_System_Object_impl {

    // m_Calls : InvokableCallList
    m_Calls: InvokableCallList = lfv(this.handle, "m_Calls", findClass("UnityEventBase"))
    // m_ExecutingCalls : List<BaseInvokableCall>
    m_ExecutingCalls: NativePointer = lfv(this.handle, "m_ExecutingCalls", findClass("UnityEventBase"))
    // m_NeedsUpdate : Boolean
    m_NeedsUpdate: boolean = lfv(this.handle, "m_NeedsUpdate", findClass("UnityEventBase")) as unknown as boolean
    // m_PersistentCalls : List<BaseInvokableCall>
    m_PersistentCalls: NativePointer = lfv(this.handle, "m_PersistentCalls", findClass("UnityEventBase"))
    // m_RuntimeCalls : List<BaseInvokableCall>
    m_RuntimeCalls: NativePointer = lfv(this.handle, "m_RuntimeCalls", findClass("UnityEventBase"))

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    ctor_0(): mscorlib.InvokableCallList {
        return new InvokableCallList_impl(mscorlib.Api.InvokableCallList._ctor_0(alloc()))
    }

    AddListener(call: BaseInvokableCall): void {
        return new mscorlib.Api.InvokableCallList._AddListener(this.handle, call)
    }

    ClearPersistent(): void {
        return new mscorlib.Api.InvokableCallList._ClearPersistent(this.handle)
    }

    PrepareInvoke(): void {
        return new mscorlib.Api.InvokableCallList._PrepareInvoke(this.handle)
    }

    // RemoveListener(Object, MethodInfo) : Void
    RemoveListener_2(target: mscorlib_System_Object_impl, method: mscorlib_System_Reflection_MethodInfo): void {
        return new mscorlib.Api.InvokableCallList._RemoveListener(this.handle, target, method)
    }
}

declare global {
    namespace mscorlib {
        class InvokableCallList extends InvokableCallList_impl { }
    }
}

mscorlib.InvokableCallList = InvokableCallList_impl;

export { mscorlib_System_Object_impl };