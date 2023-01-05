import { mscorlib_System_Object_impl } from "../class"

type System_Boolean = boolean
type System_Void = void
type System_String = string
type System_IntPtr = NativePointer

type System_Array = NativePointer
type UnityEngine_AndroidJavaRunnable = NativePointer
type UnityEngine_AndroidJavaProxy = NativePointer
type System_Object_array = NativePointer
type System_Object = NativePointer
type UnityEngine_jvalue_array = NativePointer
type ArrayType = NativePointer

class UnityEngine_AndroidJNIHelper_Impl extends mscorlib_System_Object_impl {

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }
    static get_debug(): System_Boolean {
        return Il2Cpp.Api.AndroidJNIHelper._get_debug()
    }

    static set_debug(value: System_Boolean): System_Void {
        return Il2Cpp.Api.AndroidJNIHelper._set_debug(value)
    }

    static GetConstructorID(javaClass: System_IntPtr): System_IntPtr {
        return Il2Cpp.Api.AndroidJNIHelper._GetConstructorID(javaClass)
    }

    static GetConstructorID_javaClass_signature(javaClass: System_IntPtr, signature: System_String): System_IntPtr {
        return Il2Cpp.Api.AndroidJNIHelper._GetConstructorID(javaClass, signature)
    }

    static GetMethodID_javaClass_methodName(javaClass: System_IntPtr, methodName: System_String): System_IntPtr {
        return Il2Cpp.Api.AndroidJNIHelper._GetMethodID(javaClass, methodName)
    }

    static GetMethodID_javaClass_methodName_signature(javaClass: System_IntPtr, methodName: System_String, signature: System_String): System_IntPtr {
        return Il2Cpp.Api.AndroidJNIHelper._GetMethodID(javaClass, methodName, signature)
    }

    static GetMethodID_javaClass_methodName_signature_isStatic(javaClass: System_IntPtr, methodName: System_String, signature: System_String, isStatic: System_Boolean): System_IntPtr {
        return Il2Cpp.Api.AndroidJNIHelper._GetMethodID(javaClass, methodName, signature, isStatic)
    }

    static GetFieldID(javaClass: System_IntPtr, fieldName: System_String): System_IntPtr {
        return Il2Cpp.Api.AndroidJNIHelper._GetFieldID(javaClass, fieldName)
    }

    static GetFieldID_javaClass_fieldName_signature(javaClass: System_IntPtr, fieldName: System_String, signature: System_String): System_IntPtr {
        return Il2Cpp.Api.AndroidJNIHelper._GetFieldID(javaClass, fieldName, signature)
    }

    static GetFieldID_4(javaClass: System_IntPtr, fieldName: System_String, signature: System_String, isStatic: System_Boolean): System_IntPtr {
        return Il2Cpp.Api.AndroidJNIHelper._GetFieldID(javaClass, fieldName, signature, isStatic)
    }

    static CreateJavaRunnable(jrunnable: UnityEngine_AndroidJavaRunnable): System_IntPtr {
        return Il2Cpp.Api.AndroidJNIHelper._CreateJavaRunnable(jrunnable)
    }

    static CreateJavaProxy(proxy: UnityEngine_AndroidJavaProxy): System_IntPtr {
        return Il2Cpp.Api.AndroidJNIHelper._CreateJavaProxy(proxy)
    }

    static ConvertToJNIArray(array: System_Array): System_IntPtr {
        return Il2Cpp.Api.AndroidJNIHelper._ConvertToJNIArray(array)
    }

    static CreateJNIArgArray(args: System_Object_array): UnityEngine_jvalue_array {
        return Il2Cpp.Api.AndroidJNIHelper._CreateJNIArgArray(args)
    }

    static DeleteJNIArgArray(args: System_Object_array, jniArgs: UnityEngine_jvalue_array): System_Void {
        return Il2Cpp.Api.AndroidJNIHelper._DeleteJNIArgArray(args, jniArgs)
    }

    static GetConstructorID_2(jclass: System_IntPtr, args: System_Object_array): System_IntPtr {
        return Il2Cpp.Api.AndroidJNIHelper._GetConstructorID(jclass, args)
    }

    static GetMethodID_4(jclass: System_IntPtr, methodName: System_String, args: System_Object_array, isStatic: System_Boolean): System_IntPtr {
        return Il2Cpp.Api.AndroidJNIHelper._GetMethodID(jclass, methodName, args, isStatic)
    }

    static GetSignature(obj: System_Object): System_String {
        return readU16(Il2Cpp.Api.AndroidJNIHelper._GetSignature(obj))
    }

    static GetSignature_1(args: System_Object_array): System_String {
        return readU16(Il2Cpp.Api.AndroidJNIHelper._GetSignature(args))
    }

    static ConvertFromJNIArray(array: System_IntPtr): ArrayType {
        return Il2Cpp.Api.AndroidJNIHelper._ConvertFromJNIArray(array)
    }

    static GetMethodID_jclass_methodName_args_isStatic(jclass: System_IntPtr, methodName: System_String, args: System_Object_array, isStatic: System_Boolean): System_IntPtr {
        return Il2Cpp.Api.AndroidJNIHelper._GetMethodID(jclass, methodName, args, isStatic)
    }

    static GetFieldID_jclass_fieldName_isStatic(jclass: System_IntPtr, fieldName: System_String, isStatic: System_Boolean): System_IntPtr {
        return Il2Cpp.Api.AndroidJNIHelper._GetFieldID(jclass, fieldName, isStatic)
    }

    static GetSignature_args(args: System_Object_array): System_String {
        return readU16(Il2Cpp.Api.AndroidJNIHelper._GetSignature(args))
    }

}

Il2Cpp.AndroidJNIHelper = UnityEngine_AndroidJNIHelper_Impl

declare global {
    namespace Il2Cpp {
        class AndroidJNIHelper extends UnityEngine_AndroidJNIHelper_Impl { }
    }
}

export { UnityEngine_AndroidJNIHelper_Impl }