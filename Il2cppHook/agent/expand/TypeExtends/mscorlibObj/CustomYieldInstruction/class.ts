import { mscorlib_System_Object_impl } from "../class"

type System_Void = void
type System_Boolean = boolean

class UnityEngine_CustomYieldInstruction_Impl extends mscorlib_System_Object_impl {

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    get_keepWaiting(): System_Boolean {
        return Il2Cpp.Api.CustomYieldInstruction._get_keepWaiting(this.handle)
    }

    get_Current(): mscorlib_System_Object_impl {
        return Il2Cpp.Api.CustomYieldInstruction._get_Current(this.handle)
    }

    MoveNext(): System_Boolean {
        return Il2Cpp.Api.CustomYieldInstruction._MoveNext(this.handle)
    }

    Reset(): System_Void {
        return Il2Cpp.Api.CustomYieldInstruction._Reset(this.handle)
    }

    _ctor(): System_Void {
        return Il2Cpp.Api.CustomYieldInstruction.__ctor(this.handle)
    }
}

Il2Cpp.CustomYieldInstruction = UnityEngine_CustomYieldInstruction_Impl

declare global {
    namespace Il2Cpp {
        class CustomYieldInstruction extends UnityEngine_CustomYieldInstruction_Impl { }
    }
}

export { UnityEngine_CustomYieldInstruction_Impl }