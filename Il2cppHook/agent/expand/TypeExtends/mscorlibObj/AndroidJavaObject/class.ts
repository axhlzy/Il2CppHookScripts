import { mscorlib_System_Object_impl } from "../class"
import { UnityEngine_GlobalJavaObjectRef_Impl as GlobalJavaObjectRef } from "../GlobalJavaObjectRef/class"

type System_IntPtr = NativePointer
type System_Boolean = NativePointer
type System_Void = void
type System_String = string
type UnityEngine_AndroidJavaObject_array = NativePointer
type UnityEngine_AndroidJavaProxy_array = NativePointer
type UnityEngine_AndroidJavaClass_array = NativePointer
type UnityEngine_AndroidJavaRunnable_array = NativePointer
type T_array = NativePointer
type FieldType = NativePointer
type ReturnType = NativePointer
type System_Object_array = NativePointer
type System_String_array = NativePointer

class UnityEngine_AndroidJavaObject_Impl extends mscorlib_System_Object_impl {

    enableDebugPrints: System_Boolean = lfv(this.handle, "enableDebugPrints")
    m_jobject: GlobalJavaObjectRef = new GlobalJavaObjectRef(lfv(this.handle, "m_jobject"))
    m_jclass: GlobalJavaObjectRef = new GlobalJavaObjectRef(lfv(this.handle, "m_jclass"))

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    _ctor(className: System_String, args: System_String_array): System_Void {
        return Il2Cpp.Api.AndroidJavaObject.__ctor(this.handle, className, args)
    }

    _ctor_AndroidJavaObject_array(className: System_String, args: UnityEngine_AndroidJavaObject_array): System_Void {
        return Il2Cpp.Api.AndroidJavaObject.__ctor(this.handle, className, args)
    }

    _ctor_AndroidJavaClass_array(className: System_String, args: UnityEngine_AndroidJavaClass_array): System_Void {
        return Il2Cpp.Api.AndroidJavaObject.__ctor(this.handle, className, args)
    }

    _ctor_AndroidJavaProxy_array(className: System_String, args: UnityEngine_AndroidJavaProxy_array): System_Void {
        return Il2Cpp.Api.AndroidJavaObject.__ctor(this.handle, className, args)
    }

    _ctor_AndroidJavaRunnable_array(className: System_String, args: UnityEngine_AndroidJavaRunnable_array): System_Void {
        return Il2Cpp.Api.AndroidJavaObject.__ctor(this.handle, className, args)
    }

    _ctor_Object_array(className: System_String, args: System_Object_array): System_Void {
        return Il2Cpp.Api.AndroidJavaObject.__ctor(this.handle, className, args)
    }

    Dispose(): System_Void {
        return Il2Cpp.Api.AndroidJavaObject._Dispose(this.handle)
    }

    Call_T_array(methodName: System_String, args: T_array): System_Void {
        return Il2Cpp.Api.AndroidJavaObject._Call(this.handle, methodName, args)
    }

    Call_Object_array(methodName: System_String, args: System_Object_array): System_Void {
        return Il2Cpp.Api.AndroidJavaObject._Call(this.handle, methodName, args)
    }

    CallStatic_T_array(methodName: System_String, args: T_array): System_Void {
        return Il2Cpp.Api.AndroidJavaObject._CallStatic(this.handle, methodName, args)
    }

    CallStatic_Object_array(methodName: System_String, args: System_Object_array): System_Void {
        return Il2Cpp.Api.AndroidJavaObject._CallStatic(this.handle, methodName, args)
    }

    Get(fieldName: System_String): FieldType {
        return Il2Cpp.Api.AndroidJavaObject._Get(this.handle, fieldName)
    }

    Set(fieldName: System_String, val: FieldType): System_Void {
        return Il2Cpp.Api.AndroidJavaObject._Set(this.handle, fieldName, val)
    }

    GetStatic(fieldName: System_String): FieldType {
        return Il2Cpp.Api.AndroidJavaObject._GetStatic(this.handle, fieldName)
    }

    SetStatic(fieldName: System_String, val: FieldType): System_Void {
        return Il2Cpp.Api.AndroidJavaObject._SetStatic(this.handle, fieldName, val)
    }

    GetRawObject(): System_IntPtr {
        return Il2Cpp.Api.AndroidJavaObject._GetRawObject(this.handle)
    }

    GetRawClass(): System_IntPtr {
        return Il2Cpp.Api.AndroidJavaObject._GetRawClass(this.handle)
    }

    CloneReference(): UnityEngine_AndroidJavaObject_Impl {
        return new UnityEngine_AndroidJavaObject_Impl(Il2Cpp.Api.AndroidJavaObject._CloneReference(this.handle))
    }

    Call_System_String_T_array(methodName: System_String, args: T_array): ReturnType {
        return Il2Cpp.Api.AndroidJavaObject._Call(this.handle, methodName, args)
    }

    Call_2(methodName: System_String, args: System_Object_array): ReturnType {
        return Il2Cpp.Api.AndroidJavaObject._Call(this.handle, methodName, args)
    }

    CallStatic_System_String_T_array(methodName: System_String, args: T_array): ReturnType {
        return Il2Cpp.Api.AndroidJavaObject._CallStatic(this.handle, methodName, args)
    }

    CallStatic_System_System_Object_array(methodName: System_String, args: System_Object_array): ReturnType {
        return Il2Cpp.Api.AndroidJavaObject._CallStatic(this.handle, methodName, args)
    }

    DebugPrint(msg: System_String): System_Void {
        return Il2Cpp.Api.AndroidJavaObject._DebugPrint(this.handle, msg)
    }

    DebugPrint_4(call: System_String, methodName: System_String, signature: System_String, args: System_Object_array): System_Void {
        return Il2Cpp.Api.AndroidJavaObject._DebugPrint(this.handle, call, methodName, signature, args)
    }

    _AndroidJavaObject(className: System_String, args: System_Object_array): System_Void {
        return Il2Cpp.Api.AndroidJavaObject.__AndroidJavaObject(this.handle, className, args)
    }

    _ctor_1(jobject: System_IntPtr): System_Void {
        return Il2Cpp.Api.AndroidJavaObject.__ctor(this.handle, jobject)
    }

    _ctor_0(): System_Void {
        return Il2Cpp.Api.AndroidJavaObject.__ctor(this.handle)
    }

    Finalize(): System_Void {
        return Il2Cpp.Api.AndroidJavaObject._Finalize(this.handle)
    }

    Dispose_1(disposing: System_Boolean): System_Void {
        return Il2Cpp.Api.AndroidJavaObject._Dispose(this.handle, disposing)
    }

    _Call(methodName: System_String, args: System_Object_array): System_Void {
        return Il2Cpp.Api.AndroidJavaObject.__Call(this.handle, methodName, args)
    }

    _Call_2(methodName: System_String, args: System_Object_array): ReturnType {
        return Il2Cpp.Api.AndroidJavaObject.__Call(this.handle, methodName, args)
    }

    _Get(fieldName: System_String): FieldType {
        return Il2Cpp.Api.AndroidJavaObject.__Get(this.handle, fieldName)
    }

    _Set(fieldName: System_String, val: FieldType): System_Void {
        return Il2Cpp.Api.AndroidJavaObject.__Set(this.handle, fieldName, val)
    }

    _CallStatic(methodName: System_String, args: System_Object_array): System_Void {
        return Il2Cpp.Api.AndroidJavaObject.__CallStatic(this.handle, methodName, args)
    }

    _CallStatic_2(methodName: System_String, args: System_Object_array): ReturnType {
        return Il2Cpp.Api.AndroidJavaObject.__CallStatic(this.handle, methodName, args)
    }

    _GetStatic(fieldName: System_String): FieldType {
        return Il2Cpp.Api.AndroidJavaObject.__GetStatic(this.handle, fieldName)
    }

    _SetStatic(fieldName: System_String, val: FieldType): System_Void {
        return Il2Cpp.Api.AndroidJavaObject.__SetStatic(this.handle, fieldName, val)
    }

    static AndroidJavaObjectDeleteLocalRef(jobject: System_IntPtr): UnityEngine_AndroidJavaObject_Impl {
        return new UnityEngine_AndroidJavaObject_Impl(Il2Cpp.Api.AndroidJavaObject._AndroidJavaObjectDeleteLocalRef(jobject))
    }

    static AndroidJavaClassDeleteLocalRef(jclass: System_IntPtr): UnityEngine_AndroidJavaObject_Impl {
        return new UnityEngine_AndroidJavaObject_Impl(Il2Cpp.Api.AndroidJavaObject._AndroidJavaClassDeleteLocalRef(jclass))
    }

    static FromJavaArrayDeleteLocalRef(jobject: System_IntPtr): ReturnType {
        return Il2Cpp.Api.AndroidJavaObject._FromJavaArrayDeleteLocalRef(jobject)
    }

    _GetRawObject(): System_IntPtr {
        return Il2Cpp.Api.AndroidJavaObject.__GetRawObject(this.handle)
    }

    _GetRawClass(): System_IntPtr {
        return Il2Cpp.Api.AndroidJavaObject.__GetRawClass(this.handle)
    }

}

Il2Cpp.AndroidJavaObject = UnityEngine_AndroidJavaObject_Impl

declare global {
    namespace Il2Cpp {
        class AndroidJavaObject extends UnityEngine_AndroidJavaObject_Impl { }
    }
}

export { UnityEngine_AndroidJavaObject_Impl }