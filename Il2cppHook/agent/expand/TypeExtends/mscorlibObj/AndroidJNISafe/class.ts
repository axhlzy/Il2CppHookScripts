import { mscorlib_System_Object_impl } from "../class"

type System_Int16 = number
type System_Int32 = number
type System_Int64 = number
type System_IntPtr = NativePointer
type System_Boolean = NativePointer
type System_String = string
type System_Void = void
type System_SByte = NativePointer
type System_Char = NativePointer
type System_Single = NativePointer
type System_Double = NativePointer

type UnityEngine_jvalue_array = NativePointer
type System_Char_array = NativePointer
type System_Boolean_array = NativePointer
type System_Int16_array = NativePointer
type System_Byte_array = NativePointer
type System_Int32_array = NativePointer
type System_Int64_array = NativePointer
type System_SByte_array = NativePointer
type System_IntPtr_array = NativePointer
type System_Single_array = NativePointer
type System_Double_array = NativePointer

class UnityEngine_AndroidJNISafe_Impl extends mscorlib_System_Object_impl {

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }
    static CheckException(): System_Void {
        return Il2Cpp.Api.AndroidJNISafe._CheckException()
    }

    static DeleteGlobalRef(globalref: System_IntPtr): System_Void {
        return Il2Cpp.Api.AndroidJNISafe._DeleteGlobalRef(globalref)
    }

    static DeleteWeakGlobalRef(globalref: System_IntPtr): System_Void {
        return Il2Cpp.Api.AndroidJNISafe._DeleteWeakGlobalRef(globalref)
    }

    static DeleteLocalRef(localref: System_IntPtr): System_Void {
        return Il2Cpp.Api.AndroidJNISafe._DeleteLocalRef(localref)
    }

    static NewString(chars: System_String): System_IntPtr {
        return Il2Cpp.Api.AndroidJNISafe._NewString(chars)
    }

    static GetStringChars(str: System_IntPtr): System_String {
        return readU16(Il2Cpp.Api.AndroidJNISafe._GetStringChars(str))
    }

    static GetObjectClass(ptr: System_IntPtr): System_IntPtr {
        return Il2Cpp.Api.AndroidJNISafe._GetObjectClass(ptr)
    }

    static GetStaticMethodID(clazz: System_IntPtr, name: System_String, sig: System_String): System_IntPtr {
        return Il2Cpp.Api.AndroidJNISafe._GetStaticMethodID(clazz, name, sig)
    }

    static GetMethodID(obj: System_IntPtr, name: System_String, sig: System_String): System_IntPtr {
        return Il2Cpp.Api.AndroidJNISafe._GetMethodID(obj, name, sig)
    }

    static GetFieldID(clazz: System_IntPtr, name: System_String, sig: System_String): System_IntPtr {
        return Il2Cpp.Api.AndroidJNISafe._GetFieldID(clazz, name, sig)
    }

    static GetStaticFieldID(clazz: System_IntPtr, name: System_String, sig: System_String): System_IntPtr {
        return Il2Cpp.Api.AndroidJNISafe._GetStaticFieldID(clazz, name, sig)
    }

    static FromReflectedMethod(refMethod: System_IntPtr): System_IntPtr {
        return Il2Cpp.Api.AndroidJNISafe._FromReflectedMethod(refMethod)
    }

    static FindClass(name: System_String): System_IntPtr {
        return Il2Cpp.Api.AndroidJNISafe._FindClass(name)
    }

    static NewObject(clazz: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_IntPtr {
        return Il2Cpp.Api.AndroidJNISafe._NewObject(clazz, methodID, args)
    }

    static SetStaticObjectField(clazz: System_IntPtr, fieldID: System_IntPtr, val: System_IntPtr): System_Void {
        return Il2Cpp.Api.AndroidJNISafe._SetStaticObjectField(clazz, fieldID, val)
    }

    static SetStaticStringField(clazz: System_IntPtr, fieldID: System_IntPtr, val: System_String): System_Void {
        return Il2Cpp.Api.AndroidJNISafe._SetStaticStringField(clazz, fieldID, val)
    }

    static SetStaticCharField(clazz: System_IntPtr, fieldID: System_IntPtr, val: System_Char): System_Void {
        return Il2Cpp.Api.AndroidJNISafe._SetStaticCharField(clazz, fieldID, val)
    }

    static SetStaticDoubleField(clazz: System_IntPtr, fieldID: System_IntPtr, val: System_Double): System_Void {
        return Il2Cpp.Api.AndroidJNISafe._SetStaticDoubleField(clazz, fieldID, val)
    }

    static SetStaticFloatField(clazz: System_IntPtr, fieldID: System_IntPtr, val: System_Single): System_Void {
        return Il2Cpp.Api.AndroidJNISafe._SetStaticFloatField(clazz, fieldID, val)
    }

    static SetStaticLongField(clazz: System_IntPtr, fieldID: System_IntPtr, val: System_Int64): System_Void {
        return Il2Cpp.Api.AndroidJNISafe._SetStaticLongField(clazz, fieldID, val)
    }

    static SetStaticShortField(clazz: System_IntPtr, fieldID: System_IntPtr, val: System_Int16): System_Void {
        return Il2Cpp.Api.AndroidJNISafe._SetStaticShortField(clazz, fieldID, val)
    }

    static SetStaticSByteField(clazz: System_IntPtr, fieldID: System_IntPtr, val: System_SByte): System_Void {
        return Il2Cpp.Api.AndroidJNISafe._SetStaticSByteField(clazz, fieldID, val)
    }

    static SetStaticBooleanField(clazz: System_IntPtr, fieldID: System_IntPtr, val: System_Boolean): System_Void {
        return Il2Cpp.Api.AndroidJNISafe._SetStaticBooleanField(clazz, fieldID, val)
    }

    static SetStaticIntField(clazz: System_IntPtr, fieldID: System_IntPtr, val: System_Int32): System_Void {
        return Il2Cpp.Api.AndroidJNISafe._SetStaticIntField(clazz, fieldID, val)
    }

    static GetStaticObjectField(clazz: System_IntPtr, fieldID: System_IntPtr): System_IntPtr {
        return Il2Cpp.Api.AndroidJNISafe._GetStaticObjectField(clazz, fieldID)
    }

    static GetStaticStringField(clazz: System_IntPtr, fieldID: System_IntPtr): System_String {
        return readU16(Il2Cpp.Api.AndroidJNISafe._GetStaticStringField(clazz, fieldID))
    }

    static GetStaticCharField(clazz: System_IntPtr, fieldID: System_IntPtr): System_Char {
        return Il2Cpp.Api.AndroidJNISafe._GetStaticCharField(clazz, fieldID)
    }

    static GetStaticDoubleField(clazz: System_IntPtr, fieldID: System_IntPtr): System_Double {
        return Il2Cpp.Api.AndroidJNISafe._GetStaticDoubleField(clazz, fieldID)
    }

    static GetStaticFloatField(clazz: System_IntPtr, fieldID: System_IntPtr): System_Single {
        return Il2Cpp.Api.AndroidJNISafe._GetStaticFloatField(clazz, fieldID)
    }

    static GetStaticLongField(clazz: System_IntPtr, fieldID: System_IntPtr): System_Int64 {
        return Il2Cpp.Api.AndroidJNISafe._GetStaticLongField(clazz, fieldID)
    }

    static GetStaticShortField(clazz: System_IntPtr, fieldID: System_IntPtr): System_Int16 {
        return Il2Cpp.Api.AndroidJNISafe._GetStaticShortField(clazz, fieldID)
    }

    static GetStaticSByteField(clazz: System_IntPtr, fieldID: System_IntPtr): System_SByte {
        return Il2Cpp.Api.AndroidJNISafe._GetStaticSByteField(clazz, fieldID)
    }

    static GetStaticBooleanField(clazz: System_IntPtr, fieldID: System_IntPtr): System_Boolean {
        return Il2Cpp.Api.AndroidJNISafe._GetStaticBooleanField(clazz, fieldID)
    }

    static GetStaticIntField(clazz: System_IntPtr, fieldID: System_IntPtr): System_Int32 {
        return Il2Cpp.Api.AndroidJNISafe._GetStaticIntField(clazz, fieldID)
    }

    static CallStaticVoidMethod(clazz: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_Void {
        return Il2Cpp.Api.AndroidJNISafe._CallStaticVoidMethod(clazz, methodID, args)
    }

    static CallStaticObjectMethod(clazz: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_IntPtr {
        return Il2Cpp.Api.AndroidJNISafe._CallStaticObjectMethod(clazz, methodID, args)
    }

    static CallStaticStringMethod(clazz: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_String {
        return readU16(Il2Cpp.Api.AndroidJNISafe._CallStaticStringMethod(clazz, methodID, args))
    }

    static CallStaticCharMethod(clazz: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_Char {
        return Il2Cpp.Api.AndroidJNISafe._CallStaticCharMethod(clazz, methodID, args)
    }

    static CallStaticDoubleMethod(clazz: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_Double {
        return Il2Cpp.Api.AndroidJNISafe._CallStaticDoubleMethod(clazz, methodID, args)
    }

    static CallStaticFloatMethod(clazz: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_Single {
        return Il2Cpp.Api.AndroidJNISafe._CallStaticFloatMethod(clazz, methodID, args)
    }

    static CallStaticLongMethod(clazz: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_Int64 {
        return Il2Cpp.Api.AndroidJNISafe._CallStaticLongMethod(clazz, methodID, args)
    }

    static CallStaticShortMethod(clazz: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_Int16 {
        return Il2Cpp.Api.AndroidJNISafe._CallStaticShortMethod(clazz, methodID, args)
    }

    static CallStaticSByteMethod(clazz: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_SByte {
        return Il2Cpp.Api.AndroidJNISafe._CallStaticSByteMethod(clazz, methodID, args)
    }

    static CallStaticBooleanMethod(clazz: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_Boolean {
        return Il2Cpp.Api.AndroidJNISafe._CallStaticBooleanMethod(clazz, methodID, args)
    }

    static CallStaticIntMethod(clazz: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_Int32 {
        return Il2Cpp.Api.AndroidJNISafe._CallStaticIntMethod(clazz, methodID, args)
    }

    static SetObjectField(obj: System_IntPtr, fieldID: System_IntPtr, val: System_IntPtr): System_Void {
        return Il2Cpp.Api.AndroidJNISafe._SetObjectField(obj, fieldID, val)
    }

    static SetStringField(obj: System_IntPtr, fieldID: System_IntPtr, val: System_String): System_Void {
        return Il2Cpp.Api.AndroidJNISafe._SetStringField(obj, fieldID, val)
    }

    static SetCharField(obj: System_IntPtr, fieldID: System_IntPtr, val: System_Char): System_Void {
        return Il2Cpp.Api.AndroidJNISafe._SetCharField(obj, fieldID, val)
    }

    static SetDoubleField(obj: System_IntPtr, fieldID: System_IntPtr, val: System_Double): System_Void {
        return Il2Cpp.Api.AndroidJNISafe._SetDoubleField(obj, fieldID, val)
    }

    static SetFloatField(obj: System_IntPtr, fieldID: System_IntPtr, val: System_Single): System_Void {
        return Il2Cpp.Api.AndroidJNISafe._SetFloatField(obj, fieldID, val)
    }

    static SetLongField(obj: System_IntPtr, fieldID: System_IntPtr, val: System_Int64): System_Void {
        return Il2Cpp.Api.AndroidJNISafe._SetLongField(obj, fieldID, val)
    }

    static SetShortField(obj: System_IntPtr, fieldID: System_IntPtr, val: System_Int16): System_Void {
        return Il2Cpp.Api.AndroidJNISafe._SetShortField(obj, fieldID, val)
    }

    static SetSByteField(obj: System_IntPtr, fieldID: System_IntPtr, val: System_SByte): System_Void {
        return Il2Cpp.Api.AndroidJNISafe._SetSByteField(obj, fieldID, val)
    }

    static SetBooleanField(obj: System_IntPtr, fieldID: System_IntPtr, val: System_Boolean): System_Void {
        return Il2Cpp.Api.AndroidJNISafe._SetBooleanField(obj, fieldID, val)
    }

    static SetIntField(obj: System_IntPtr, fieldID: System_IntPtr, val: System_Int32): System_Void {
        return Il2Cpp.Api.AndroidJNISafe._SetIntField(obj, fieldID, val)
    }

    static GetObjectField(obj: System_IntPtr, fieldID: System_IntPtr): System_IntPtr {
        return Il2Cpp.Api.AndroidJNISafe._GetObjectField(obj, fieldID)
    }

    static GetStringField(obj: System_IntPtr, fieldID: System_IntPtr): System_String {
        return readU16(Il2Cpp.Api.AndroidJNISafe._GetStringField(obj, fieldID))
    }

    static GetCharField(obj: System_IntPtr, fieldID: System_IntPtr): System_Char {
        return Il2Cpp.Api.AndroidJNISafe._GetCharField(obj, fieldID)
    }

    static GetDoubleField(obj: System_IntPtr, fieldID: System_IntPtr): System_Double {
        return Il2Cpp.Api.AndroidJNISafe._GetDoubleField(obj, fieldID)
    }

    static GetFloatField(obj: System_IntPtr, fieldID: System_IntPtr): System_Single {
        return Il2Cpp.Api.AndroidJNISafe._GetFloatField(obj, fieldID)
    }

    static GetLongField(obj: System_IntPtr, fieldID: System_IntPtr): System_Int64 {
        return Il2Cpp.Api.AndroidJNISafe._GetLongField(obj, fieldID)
    }

    static GetShortField(obj: System_IntPtr, fieldID: System_IntPtr): System_Int16 {
        return Il2Cpp.Api.AndroidJNISafe._GetShortField(obj, fieldID)
    }

    static GetSByteField(obj: System_IntPtr, fieldID: System_IntPtr): System_SByte {
        return Il2Cpp.Api.AndroidJNISafe._GetSByteField(obj, fieldID)
    }

    static GetBooleanField(obj: System_IntPtr, fieldID: System_IntPtr): System_Boolean {
        return Il2Cpp.Api.AndroidJNISafe._GetBooleanField(obj, fieldID)
    }

    static GetIntField(obj: System_IntPtr, fieldID: System_IntPtr): System_Int32 {
        return Il2Cpp.Api.AndroidJNISafe._GetIntField(obj, fieldID)
    }

    static CallVoidMethod(obj: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_Void {
        return Il2Cpp.Api.AndroidJNISafe._CallVoidMethod(obj, methodID, args)
    }

    static CallObjectMethod(obj: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_IntPtr {
        return Il2Cpp.Api.AndroidJNISafe._CallObjectMethod(obj, methodID, args)
    }

    static CallStringMethod(obj: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_String {
        return readU16(Il2Cpp.Api.AndroidJNISafe._CallStringMethod(obj, methodID, args))
    }

    static CallCharMethod(obj: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_Char {
        return Il2Cpp.Api.AndroidJNISafe._CallCharMethod(obj, methodID, args)
    }

    static CallDoubleMethod(obj: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_Double {
        return Il2Cpp.Api.AndroidJNISafe._CallDoubleMethod(obj, methodID, args)
    }

    static CallFloatMethod(obj: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_Single {
        return Il2Cpp.Api.AndroidJNISafe._CallFloatMethod(obj, methodID, args)
    }

    static CallLongMethod(obj: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_Int64 {
        return Il2Cpp.Api.AndroidJNISafe._CallLongMethod(obj, methodID, args)
    }

    static CallShortMethod(obj: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_Int16 {
        return Il2Cpp.Api.AndroidJNISafe._CallShortMethod(obj, methodID, args)
    }

    static CallSByteMethod(obj: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_SByte {
        return Il2Cpp.Api.AndroidJNISafe._CallSByteMethod(obj, methodID, args)
    }

    static CallBooleanMethod(obj: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_Boolean {
        return Il2Cpp.Api.AndroidJNISafe._CallBooleanMethod(obj, methodID, args)
    }

    static CallIntMethod(obj: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_Int32 {
        return Il2Cpp.Api.AndroidJNISafe._CallIntMethod(obj, methodID, args)
    }

    static FromCharArray(array: System_IntPtr): System_Char_array {
        return Il2Cpp.Api.AndroidJNISafe._FromCharArray(array)
    }

    static FromDoubleArray(array: System_IntPtr): System_Double_array {
        return Il2Cpp.Api.AndroidJNISafe._FromDoubleArray(array)
    }

    static FromFloatArray(array: System_IntPtr): System_Single_array {
        return Il2Cpp.Api.AndroidJNISafe._FromFloatArray(array)
    }

    static FromLongArray(array: System_IntPtr): System_Int64_array {
        return Il2Cpp.Api.AndroidJNISafe._FromLongArray(array)
    }

    static FromShortArray(array: System_IntPtr): System_Int16_array {
        return Il2Cpp.Api.AndroidJNISafe._FromShortArray(array)
    }

    static FromByteArray(array: System_IntPtr): System_Byte_array {
        return Il2Cpp.Api.AndroidJNISafe._FromByteArray(array)
    }

    static FromSByteArray(array: System_IntPtr): System_SByte_array {
        return Il2Cpp.Api.AndroidJNISafe._FromSByteArray(array)
    }

    static FromBooleanArray(array: System_IntPtr): System_Boolean_array {
        return Il2Cpp.Api.AndroidJNISafe._FromBooleanArray(array)
    }

    static FromIntArray(array: System_IntPtr): System_Int32_array {
        return Il2Cpp.Api.AndroidJNISafe._FromIntArray(array)
    }

    static ToObjectArray(array: System_IntPtr_array, type: System_IntPtr): System_IntPtr {
        return Il2Cpp.Api.AndroidJNISafe._ToObjectArray(array, type)
    }

    static ToCharArray(array: System_Char_array): System_IntPtr {
        return Il2Cpp.Api.AndroidJNISafe._ToCharArray(array)
    }

    static ToDoubleArray(array: System_Double_array): System_IntPtr {
        return Il2Cpp.Api.AndroidJNISafe._ToDoubleArray(array)
    }

    static ToFloatArray(array: System_Single_array): System_IntPtr {
        return Il2Cpp.Api.AndroidJNISafe._ToFloatArray(array)
    }

    static ToLongArray(array: System_Int64_array): System_IntPtr {
        return Il2Cpp.Api.AndroidJNISafe._ToLongArray(array)
    }

    static ToShortArray(array: System_Int16_array): System_IntPtr {
        return Il2Cpp.Api.AndroidJNISafe._ToShortArray(array)
    }

    static ToByteArray(array: System_Byte_array): System_IntPtr {
        return Il2Cpp.Api.AndroidJNISafe._ToByteArray(array)
    }

    static ToSByteArray(array: System_SByte_array): System_IntPtr {
        return Il2Cpp.Api.AndroidJNISafe._ToSByteArray(array)
    }

    static ToBooleanArray(array: System_Boolean_array): System_IntPtr {
        return Il2Cpp.Api.AndroidJNISafe._ToBooleanArray(array)
    }

    static ToIntArray(array: System_Int32_array): System_IntPtr {
        return Il2Cpp.Api.AndroidJNISafe._ToIntArray(array)
    }

    static GetObjectArrayElement(array: System_IntPtr, index: System_Int32): System_IntPtr {
        return Il2Cpp.Api.AndroidJNISafe._GetObjectArrayElement(array, index)
    }

    static GetArrayLength(array: System_IntPtr): System_Int32 {
        return Il2Cpp.Api.AndroidJNISafe._GetArrayLength(array)
    }

}

Il2Cpp.AndroidJNISafe = UnityEngine_AndroidJNISafe_Impl

declare global {
    namespace Il2Cpp {
        class AndroidJNISafe extends UnityEngine_AndroidJNISafe_Impl { }
    }
}

export { UnityEngine_AndroidJNISafe_Impl }