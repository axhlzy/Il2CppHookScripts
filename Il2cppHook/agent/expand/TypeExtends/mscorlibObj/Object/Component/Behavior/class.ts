import { UnityEngine_Component_Impl } from "../class"

class UnityEngine_Behaviour_Impl extends UnityEngine_Component_Impl {

    constructor(handle: NativePointerValue) {
        super(handle)
    }

    get_enabled(): boolean {
        return !Il2Cpp.Api.Behaviour._get_enabled(this.handle).isNull()
    }

    set_enabled(value: boolean): void {
        return Il2Cpp.Api.Behaviour._set_enabled(this.handle, value ? ptr(1) : ptr(0))
    }

    get_isActiveAndEnabled(): boolean {
        return !Il2Cpp.Api.Behaviour._get_isActiveAndEnabled(this.handle).isNull()
    }

    _ctor(): void {
        return Il2Cpp.Api.Behaviour.__ctor(alloc())
    }
}

declare global {
    namespace Il2Cpp {
        class Behaviour extends UnityEngine_Behaviour_Impl { }
    }
}

Il2Cpp.Behaviour = UnityEngine_Behaviour_Impl

export { UnityEngine_Behaviour_Impl }