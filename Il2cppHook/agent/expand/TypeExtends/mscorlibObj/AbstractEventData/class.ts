import { mscorlib_System_Object_impl } from "../class";

class AbstractEventDataImpl extends mscorlib_System_Object_impl implements AbstractEventData_Interface {

    ctor_0(): AbstractEventData_Interface {
        return new AbstractEventDataImpl(Il2Cpp.Api.AbstractEventData._ctor_0(alloc()));
    }

    Reset(): void {
        return Il2Cpp.Api.AbstractEventData._Reset(this.handle);
    }
    Use(): void {
        return Il2Cpp.Api.AbstractEventData._Use(this.handle);
    }
    get_used(): boolean {
        return Il2Cpp.Api.AbstractEventData._get_used(this.handle);
    }

}

export { AbstractEventDataImpl };