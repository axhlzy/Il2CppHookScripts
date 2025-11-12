import { PackList } from "../../../../bridge/fix/packer/packList"
import { mscorlib_System_Object_impl } from "../class"

type BaseInvokableCall = NativePointer
type mscorlib_System_Reflection_MethodInfo = NativePointer

export class InvokableCallList_impl extends mscorlib_System_Object_impl {

    // m_ExecutingCalls : List<BaseInvokableCall>
    get m_ExecutingCalls(): PackList | undefined {
        try {
            const m_ExecutingCallsField = new Il2Cpp.Object(this.handle).tryField<Il2Cpp.Object>("m_ExecutingCalls")!.value.handle
            // LOGD("m_ExecutingCallsField " + m_ExecutingCallsField)
            return new PackList(m_ExecutingCallsField)
        } catch (error) {
            return undefined
        }
    }
    // m_NeedsUpdate : Boolean
    get m_NeedsUpdate(): boolean {
        try {
            return new Il2Cpp.Object(this.handle).tryField<NativePointer>("m_NeedsUpdate")!.value.isNull() === false
        } catch (error) {
            return false
        }
    }
    // m_PersistentCalls : List<BaseInvokableCall>
    get m_PersistentCalls(): PackList | undefined {
        try {
            const m_PersistentCallsField = new Il2Cpp.Object(this.handle).tryField<Il2Cpp.Object>("m_PersistentCalls")!.value.handle
            return new PackList(m_PersistentCallsField)
        } catch (error) {
            return undefined
        }
    }
    // m_RuntimeCalls : List<BaseInvokableCall>
    get m_RuntimeCalls(): PackList | undefined {
        try {
            const m_RuntimeCallsField = new Il2Cpp.Object(this.handle).tryField<Il2Cpp.Object>("m_RuntimeCalls")!.value.handle
            return new PackList(m_RuntimeCallsField)
        } catch (error) {
            return undefined
        }
    }

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    static get ctor_0(): mscorlib.InvokableCallList {
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

mscorlib.InvokableCallList = InvokableCallList_impl

export { mscorlib_System_Object_impl }