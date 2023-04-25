import { mscorlib_System_Type_impl } from "../../Type/class"
import { UnityEngine_Object } from "../class"

type System_Type = mscorlib_System_Type_impl
type System_Void = void
type System_Boolean = boolean

class UnityEngine_ScriptableObject_Impl extends UnityEngine_Object {

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    _ctor_ScriptableObject(): System_Void {
        return Il2Cpp.Api.ScriptableObject.__ctor(this.handle)
    }

    static CreateInstance(type: System_Type): UnityEngine_ScriptableObject_Impl {
        return new UnityEngine_ScriptableObject_Impl(Il2Cpp.Api.ScriptableObject._CreateInstance(type))
    }

    // static CreateInstance_0(): T {
    //     return Il2Cpp.Api.ScriptableObject._CreateInstance()
    // }

    static CreateScriptableObject(self: UnityEngine_ScriptableObject_Impl): System_Void {
        return Il2Cpp.Api.ScriptableObject._CreateScriptableObject(self)
    }

    static CreateScriptableObjectInstanceFromType(type: System_Type, applyDefaultsAndReset: System_Boolean): UnityEngine_ScriptableObject_Impl {
        return new UnityEngine_ScriptableObject_Impl(Il2Cpp.Api.ScriptableObject._CreateScriptableObjectInstanceFromType(type, applyDefaultsAndReset))
    }

}

Il2Cpp.ScriptableObject = UnityEngine_ScriptableObject_Impl

declare global {
    namespace Il2Cpp {
        class ScriptableObject extends UnityEngine_ScriptableObject_Impl { }
    }
}

export { UnityEngine_ScriptableObject_Impl }