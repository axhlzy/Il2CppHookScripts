import { UnityEngine_Component_Impl } from "../class"

class UnityEngine_Behaviour_Impl extends UnityEngine_Component_Impl {

    constructor(handle: NativePointerValue) {
        super(handle)
    }

    get_enabled(): boolean {
        return Il2Cpp.Api.Behaviour._get_enabled(this.handle)
    }

    set_enabled(value: boolean): void {
        return Il2Cpp.Api.Behaviour._set_enabled(this.handle, value)
    }

    get_isActiveAndEnabled(): boolean {
        return Il2Cpp.Api.Behaviour._get_isActiveAndEnabled(this.handle)
    }

    _ctor(): void {
        return Il2Cpp.Api.Behaviour.__ctor(this.handle)
    }
}

declare global {
    namespace Il2Cpp {
        class Behaviour extends UnityEngine_Behaviour_Impl { }
    }
}

export { UnityEngine_Behaviour_Impl }