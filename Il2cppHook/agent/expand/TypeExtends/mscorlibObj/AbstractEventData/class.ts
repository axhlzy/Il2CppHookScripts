import { mscorlib_System_Object_impl } from "../class"

class UnityEngine_EventSystems_AbstractEventData_Impl extends mscorlib_System_Object_impl {

    m_Used: boolean = lfv(this.handle, "m_Used") as unknown as boolean

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    Reset(): void {
        return Il2Cpp.Api.AbstractEventData._Reset(this.handle)
    }

    Use(): void {
        return Il2Cpp.Api.AbstractEventData._Use(this.handle)
    }

    get_used(): boolean {
        return Il2Cpp.Api.AbstractEventData._get_used(this.handle)
    }

    _ctor(): void {
        return Il2Cpp.Api.AbstractEventData.__ctor(this.handle)
    }

}

Il2Cpp.AbstractEventData = UnityEngine_EventSystems_AbstractEventData_Impl

declare global {
    namespace Il2Cpp {
        class AbstractEventData extends UnityEngine_EventSystems_AbstractEventData_Impl { }
    }
}

export { UnityEngine_EventSystems_AbstractEventData_Impl }