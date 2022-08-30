import { mscorlib_System_Object_impl } from "../class"

class UnityEngine_YieldInstruction_Impl extends mscorlib_System_Object_impl {

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    _ctor(): void {
        return Il2Cpp.Api.YieldInstruction.__ctor(this.handle)
    }

}

Il2Cpp.YieldInstruction = UnityEngine_YieldInstruction_Impl

declare global {
    namespace Il2Cpp {
        class YieldInstruction extends UnityEngine_YieldInstruction_Impl { }
    }
}

export { UnityEngine_YieldInstruction_Impl }