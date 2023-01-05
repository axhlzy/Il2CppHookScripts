import { UnityEngine_AndroidJavaObject_Impl } from "../class"

type System_Void = void
type System_String = string
type System_IntPtr = NativePointer

class UnityEngine_AndroidJavaClass_Impl extends UnityEngine_AndroidJavaObject_Impl {

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    _ctor_className(className: System_String): System_Void {
        return Il2Cpp.Api.AndroidJavaClass.__ctor(this.handle, className)
    }

    _AndroidJavaClass_className(className: System_String): System_Void {
        return Il2Cpp.Api.AndroidJavaClass.__AndroidJavaClass(this.handle, className)
    }

    _ctor_jclass(jclass: System_IntPtr): System_Void {
        return Il2Cpp.Api.AndroidJavaClass.__ctor(this.handle, jclass)
    }

}

Il2Cpp.AndroidJavaClass = UnityEngine_AndroidJavaClass_Impl

declare global {
    namespace Il2Cpp {
        class AndroidJavaClass extends UnityEngine_AndroidJavaClass_Impl { }
    }
}

export { UnityEngine_AndroidJavaClass_Impl }