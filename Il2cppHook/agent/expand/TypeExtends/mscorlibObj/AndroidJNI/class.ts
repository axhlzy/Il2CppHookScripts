import { mscorlib_System_Object_impl } from "../class"

type System_Int16 = number
type System_Int32 = number
type System_Int64 = number
type System_IntPtr = NativePointer
type System_Boolean = NativePointer
type System_String = string
type System_Void = void
type System_Byte = NativePointer
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

class UnityEngine_AndroidJNI_Impl extends mscorlib_System_Object_impl {

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }
    static AttachCurrentThread(): System_Int32 {
        return Il2Cpp.Api.AndroidJNI._AttachCurrentThread()
    }

    static DetachCurrentThread(): System_Int32 {
        return Il2Cpp.Api.AndroidJNI._DetachCurrentThread()
    }

    static GetVersion(): System_Int32 {
        return Il2Cpp.Api.AndroidJNI._GetVersion()
    }

    static FindClass(name: System_String): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._FindClass(name)
    }

    static FromReflectedMethod(refMethod: System_IntPtr): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._FromReflectedMethod(refMethod)
    }

    static FromReflectedField(refField: System_IntPtr): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._FromReflectedField(refField)
    }

    static ToReflectedMethod(clazz: System_IntPtr, methodID: System_IntPtr, isStatic: System_Boolean): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._ToReflectedMethod(clazz, methodID, isStatic)
    }

    static ToReflectedField(clazz: System_IntPtr, fieldID: System_IntPtr, isStatic: System_Boolean): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._ToReflectedField(clazz, fieldID, isStatic)
    }

    static GetSuperclass(clazz: System_IntPtr): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._GetSuperclass(clazz)
    }

    static IsAssignableFrom(clazz1: System_IntPtr, clazz2: System_IntPtr): System_Boolean {
        return Il2Cpp.Api.AndroidJNI._IsAssignableFrom(clazz1, clazz2)
    }

    static Throw(obj: System_IntPtr): System_Int32 {
        return Il2Cpp.Api.AndroidJNI._Throw(obj)
    }

    static ThrowNew(clazz: System_IntPtr, message: System_String): System_Int32 {
        return Il2Cpp.Api.AndroidJNI._ThrowNew(clazz, message)
    }

    static ExceptionOccurred(): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._ExceptionOccurred()
    }

    static ExceptionDescribe(): System_Void {
        return Il2Cpp.Api.AndroidJNI._ExceptionDescribe()
    }

    static ExceptionClear(): System_Void {
        return Il2Cpp.Api.AndroidJNI._ExceptionClear()
    }

    static FatalError(message: System_String): System_Void {
        return Il2Cpp.Api.AndroidJNI._FatalError(message)
    }

    static PushLocalFrame(capacity: System_Int32): System_Int32 {
        return Il2Cpp.Api.AndroidJNI._PushLocalFrame(capacity)
    }

    static PopLocalFrame(ptr: System_IntPtr): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._PopLocalFrame(ptr)
    }

    static NewGlobalRef(obj: System_IntPtr): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._NewGlobalRef(obj)
    }

    static DeleteGlobalRef(obj: System_IntPtr): System_Void {
        return Il2Cpp.Api.AndroidJNI._DeleteGlobalRef(obj)
    }

    static NewWeakGlobalRef(obj: System_IntPtr): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._NewWeakGlobalRef(obj)
    }

    static DeleteWeakGlobalRef(obj: System_IntPtr): System_Void {
        return Il2Cpp.Api.AndroidJNI._DeleteWeakGlobalRef(obj)
    }

    static NewLocalRef(obj: System_IntPtr): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._NewLocalRef(obj)
    }

    static DeleteLocalRef(obj: System_IntPtr): System_Void {
        return Il2Cpp.Api.AndroidJNI._DeleteLocalRef(obj)
    }

    static IsSameObject(obj1: System_IntPtr, obj2: System_IntPtr): System_Boolean {
        return Il2Cpp.Api.AndroidJNI._IsSameObject(obj1, obj2)
    }

    static EnsureLocalCapacity(capacity: System_Int32): System_Int32 {
        return Il2Cpp.Api.AndroidJNI._EnsureLocalCapacity(capacity)
    }

    static AllocObject(clazz: System_IntPtr): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._AllocObject(clazz)
    }

    static NewObject(clazz: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._NewObject(clazz, methodID, args)
    }

    static GetObjectClass(obj: System_IntPtr): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._GetObjectClass(obj)
    }

    static IsInstanceOf(obj: System_IntPtr, clazz: System_IntPtr): System_Boolean {
        return Il2Cpp.Api.AndroidJNI._IsInstanceOf(obj, clazz)
    }

    static GetMethodID(clazz: System_IntPtr, name: System_String, sig: System_String): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._GetMethodID(clazz, name, sig)
    }

    static GetFieldID(clazz: System_IntPtr, name: System_String, sig: System_String): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._GetFieldID(clazz, name, sig)
    }

    static GetStaticMethodID(clazz: System_IntPtr, name: System_String, sig: System_String): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._GetStaticMethodID(clazz, name, sig)
    }

    static GetStaticFieldID(clazz: System_IntPtr, name: System_String, sig: System_String): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._GetStaticFieldID(clazz, name, sig)
    }

    static NewString(chars: System_String): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._NewString(chars)
    }

    static NewStringFromStr(chars: System_String): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._NewStringFromStr(chars)
    }

    static NewString_1(chars: System_Char_array): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._NewString(chars)
    }

    static NewStringUTF(bytes: System_String): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._NewStringUTF(bytes)
    }

    static GetStringChars(str: System_IntPtr): System_String {
        return readU16(Il2Cpp.Api.AndroidJNI._GetStringChars(str))
    }

    static GetStringLength(str: System_IntPtr): System_Int32 {
        return Il2Cpp.Api.AndroidJNI._GetStringLength(str)
    }

    static GetStringUTFLength(str: System_IntPtr): System_Int32 {
        return Il2Cpp.Api.AndroidJNI._GetStringUTFLength(str)
    }

    static GetStringUTFChars(str: System_IntPtr): System_String {
        return readU16(Il2Cpp.Api.AndroidJNI._GetStringUTFChars(str))
    }

    static CallStringMethod(obj: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_String {
        return readU16(Il2Cpp.Api.AndroidJNI._CallStringMethod(obj, methodID, args))
    }

    static CallObjectMethod(obj: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._CallObjectMethod(obj, methodID, args)
    }

    static CallIntMethod(obj: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_Int32 {
        return Il2Cpp.Api.AndroidJNI._CallIntMethod(obj, methodID, args)
    }

    static CallBooleanMethod(obj: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_Boolean {
        return Il2Cpp.Api.AndroidJNI._CallBooleanMethod(obj, methodID, args)
    }

    static CallShortMethod(obj: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_Int16 {
        return Il2Cpp.Api.AndroidJNI._CallShortMethod(obj, methodID, args)
    }

    static CallByteMethod(obj: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_Byte {
        return Il2Cpp.Api.AndroidJNI._CallByteMethod(obj, methodID, args)
    }

    static CallSByteMethod(obj: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_SByte {
        return Il2Cpp.Api.AndroidJNI._CallSByteMethod(obj, methodID, args)
    }

    static CallCharMethod(obj: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_Char {
        return Il2Cpp.Api.AndroidJNI._CallCharMethod(obj, methodID, args)
    }

    static CallFloatMethod(obj: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_Single {
        return Il2Cpp.Api.AndroidJNI._CallFloatMethod(obj, methodID, args)
    }

    static CallDoubleMethod(obj: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_Double {
        return Il2Cpp.Api.AndroidJNI._CallDoubleMethod(obj, methodID, args)
    }

    static CallLongMethod(obj: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_Int64 {
        return Il2Cpp.Api.AndroidJNI._CallLongMethod(obj, methodID, args)
    }

    static CallVoidMethod(obj: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_Void {
        return Il2Cpp.Api.AndroidJNI._CallVoidMethod(obj, methodID, args)
    }

    static GetStringField(obj: System_IntPtr, fieldID: System_IntPtr): System_String {
        return readU16(Il2Cpp.Api.AndroidJNI._GetStringField(obj, fieldID))
    }

    static GetObjectField(obj: System_IntPtr, fieldID: System_IntPtr): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._GetObjectField(obj, fieldID)
    }

    static GetBooleanField(obj: System_IntPtr, fieldID: System_IntPtr): System_Boolean {
        return Il2Cpp.Api.AndroidJNI._GetBooleanField(obj, fieldID)
    }

    static GetByteField(obj: System_IntPtr, fieldID: System_IntPtr): System_Byte {
        return Il2Cpp.Api.AndroidJNI._GetByteField(obj, fieldID)
    }

    static GetSByteField(obj: System_IntPtr, fieldID: System_IntPtr): System_SByte {
        return Il2Cpp.Api.AndroidJNI._GetSByteField(obj, fieldID)
    }

    static GetCharField(obj: System_IntPtr, fieldID: System_IntPtr): System_Char {
        return Il2Cpp.Api.AndroidJNI._GetCharField(obj, fieldID)
    }

    static GetShortField(obj: System_IntPtr, fieldID: System_IntPtr): System_Int16 {
        return Il2Cpp.Api.AndroidJNI._GetShortField(obj, fieldID)
    }

    static GetIntField(obj: System_IntPtr, fieldID: System_IntPtr): System_Int32 {
        return Il2Cpp.Api.AndroidJNI._GetIntField(obj, fieldID)
    }

    static GetLongField(obj: System_IntPtr, fieldID: System_IntPtr): System_Int64 {
        return Il2Cpp.Api.AndroidJNI._GetLongField(obj, fieldID)
    }

    static GetFloatField(obj: System_IntPtr, fieldID: System_IntPtr): System_Single {
        return Il2Cpp.Api.AndroidJNI._GetFloatField(obj, fieldID)
    }

    static GetDoubleField(obj: System_IntPtr, fieldID: System_IntPtr): System_Double {
        return Il2Cpp.Api.AndroidJNI._GetDoubleField(obj, fieldID)
    }

    static SetStringField(obj: System_IntPtr, fieldID: System_IntPtr, val: System_String): System_Void {
        return Il2Cpp.Api.AndroidJNI._SetStringField(obj, fieldID, val)
    }

    static SetObjectField(obj: System_IntPtr, fieldID: System_IntPtr, val: System_IntPtr): System_Void {
        return Il2Cpp.Api.AndroidJNI._SetObjectField(obj, fieldID, val)
    }

    static SetBooleanField(obj: System_IntPtr, fieldID: System_IntPtr, val: System_Boolean): System_Void {
        return Il2Cpp.Api.AndroidJNI._SetBooleanField(obj, fieldID, val)
    }

    static SetByteField(obj: System_IntPtr, fieldID: System_IntPtr, val: System_Byte): System_Void {
        return Il2Cpp.Api.AndroidJNI._SetByteField(obj, fieldID, val)
    }

    static SetSByteField(obj: System_IntPtr, fieldID: System_IntPtr, val: System_SByte): System_Void {
        return Il2Cpp.Api.AndroidJNI._SetSByteField(obj, fieldID, val)
    }

    static SetCharField(obj: System_IntPtr, fieldID: System_IntPtr, val: System_Char): System_Void {
        return Il2Cpp.Api.AndroidJNI._SetCharField(obj, fieldID, val)
    }

    static SetShortField(obj: System_IntPtr, fieldID: System_IntPtr, val: System_Int16): System_Void {
        return Il2Cpp.Api.AndroidJNI._SetShortField(obj, fieldID, val)
    }

    static SetIntField(obj: System_IntPtr, fieldID: System_IntPtr, val: System_Int32): System_Void {
        return Il2Cpp.Api.AndroidJNI._SetIntField(obj, fieldID, val)
    }

    static SetLongField(obj: System_IntPtr, fieldID: System_IntPtr, val: System_Int64): System_Void {
        return Il2Cpp.Api.AndroidJNI._SetLongField(obj, fieldID, val)
    }

    static SetFloatField(obj: System_IntPtr, fieldID: System_IntPtr, val: System_Single): System_Void {
        return Il2Cpp.Api.AndroidJNI._SetFloatField(obj, fieldID, val)
    }

    static SetDoubleField(obj: System_IntPtr, fieldID: System_IntPtr, val: System_Double): System_Void {
        return Il2Cpp.Api.AndroidJNI._SetDoubleField(obj, fieldID, val)
    }

    static CallStaticStringMethod(clazz: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_String {
        return readU16(Il2Cpp.Api.AndroidJNI._CallStaticStringMethod(clazz, methodID, args))
    }

    static CallStaticObjectMethod(clazz: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._CallStaticObjectMethod(clazz, methodID, args)
    }

    static CallStaticIntMethod(clazz: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_Int32 {
        return Il2Cpp.Api.AndroidJNI._CallStaticIntMethod(clazz, methodID, args)
    }

    static CallStaticBooleanMethod(clazz: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_Boolean {
        return Il2Cpp.Api.AndroidJNI._CallStaticBooleanMethod(clazz, methodID, args)
    }

    static CallStaticShortMethod(clazz: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_Int16 {
        return Il2Cpp.Api.AndroidJNI._CallStaticShortMethod(clazz, methodID, args)
    }

    static CallStaticByteMethod(clazz: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_Byte {
        return Il2Cpp.Api.AndroidJNI._CallStaticByteMethod(clazz, methodID, args)
    }

    static CallStaticSByteMethod(clazz: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_SByte {
        return Il2Cpp.Api.AndroidJNI._CallStaticSByteMethod(clazz, methodID, args)
    }

    static CallStaticCharMethod(clazz: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_Char {
        return Il2Cpp.Api.AndroidJNI._CallStaticCharMethod(clazz, methodID, args)
    }

    static CallStaticFloatMethod(clazz: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_Single {
        return Il2Cpp.Api.AndroidJNI._CallStaticFloatMethod(clazz, methodID, args)
    }

    static CallStaticDoubleMethod(clazz: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_Double {
        return Il2Cpp.Api.AndroidJNI._CallStaticDoubleMethod(clazz, methodID, args)
    }

    static CallStaticLongMethod(clazz: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_Int64 {
        return Il2Cpp.Api.AndroidJNI._CallStaticLongMethod(clazz, methodID, args)
    }

    static CallStaticVoidMethod(clazz: System_IntPtr, methodID: System_IntPtr, args: UnityEngine_jvalue_array): System_Void {
        return Il2Cpp.Api.AndroidJNI._CallStaticVoidMethod(clazz, methodID, args)
    }

    static GetStaticStringField(clazz: System_IntPtr, fieldID: System_IntPtr): System_String {
        return readU16(Il2Cpp.Api.AndroidJNI._GetStaticStringField(clazz, fieldID))
    }

    static GetStaticObjectField(clazz: System_IntPtr, fieldID: System_IntPtr): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._GetStaticObjectField(clazz, fieldID)
    }

    static GetStaticBooleanField(clazz: System_IntPtr, fieldID: System_IntPtr): System_Boolean {
        return Il2Cpp.Api.AndroidJNI._GetStaticBooleanField(clazz, fieldID)
    }

    static GetStaticByteField(clazz: System_IntPtr, fieldID: System_IntPtr): System_Byte {
        return Il2Cpp.Api.AndroidJNI._GetStaticByteField(clazz, fieldID)
    }

    static GetStaticSByteField(clazz: System_IntPtr, fieldID: System_IntPtr): System_SByte {
        return Il2Cpp.Api.AndroidJNI._GetStaticSByteField(clazz, fieldID)
    }

    static GetStaticCharField(clazz: System_IntPtr, fieldID: System_IntPtr): System_Char {
        return Il2Cpp.Api.AndroidJNI._GetStaticCharField(clazz, fieldID)
    }

    static GetStaticShortField(clazz: System_IntPtr, fieldID: System_IntPtr): System_Int16 {
        return Il2Cpp.Api.AndroidJNI._GetStaticShortField(clazz, fieldID)
    }

    static GetStaticIntField(clazz: System_IntPtr, fieldID: System_IntPtr): System_Int32 {
        return Il2Cpp.Api.AndroidJNI._GetStaticIntField(clazz, fieldID)
    }

    static GetStaticLongField(clazz: System_IntPtr, fieldID: System_IntPtr): System_Int64 {
        return Il2Cpp.Api.AndroidJNI._GetStaticLongField(clazz, fieldID)
    }

    static GetStaticFloatField(clazz: System_IntPtr, fieldID: System_IntPtr): System_Single {
        return Il2Cpp.Api.AndroidJNI._GetStaticFloatField(clazz, fieldID)
    }

    static GetStaticDoubleField(clazz: System_IntPtr, fieldID: System_IntPtr): System_Double {
        return Il2Cpp.Api.AndroidJNI._GetStaticDoubleField(clazz, fieldID)
    }

    static SetStaticStringField(clazz: System_IntPtr, fieldID: System_IntPtr, val: System_String): System_Void {
        return Il2Cpp.Api.AndroidJNI._SetStaticStringField(clazz, fieldID, val)
    }

    static SetStaticObjectField(clazz: System_IntPtr, fieldID: System_IntPtr, val: System_IntPtr): System_Void {
        return Il2Cpp.Api.AndroidJNI._SetStaticObjectField(clazz, fieldID, val)
    }

    static SetStaticBooleanField(clazz: System_IntPtr, fieldID: System_IntPtr, val: System_Boolean): System_Void {
        return Il2Cpp.Api.AndroidJNI._SetStaticBooleanField(clazz, fieldID, val)
    }

    static SetStaticByteField(clazz: System_IntPtr, fieldID: System_IntPtr, val: System_Byte): System_Void {
        return Il2Cpp.Api.AndroidJNI._SetStaticByteField(clazz, fieldID, val)
    }

    static SetStaticSByteField(clazz: System_IntPtr, fieldID: System_IntPtr, val: System_SByte): System_Void {
        return Il2Cpp.Api.AndroidJNI._SetStaticSByteField(clazz, fieldID, val)
    }

    static SetStaticCharField(clazz: System_IntPtr, fieldID: System_IntPtr, val: System_Char): System_Void {
        return Il2Cpp.Api.AndroidJNI._SetStaticCharField(clazz, fieldID, val)
    }

    static SetStaticShortField(clazz: System_IntPtr, fieldID: System_IntPtr, val: System_Int16): System_Void {
        return Il2Cpp.Api.AndroidJNI._SetStaticShortField(clazz, fieldID, val)
    }

    static SetStaticIntField(clazz: System_IntPtr, fieldID: System_IntPtr, val: System_Int32): System_Void {
        return Il2Cpp.Api.AndroidJNI._SetStaticIntField(clazz, fieldID, val)
    }

    static SetStaticLongField(clazz: System_IntPtr, fieldID: System_IntPtr, val: System_Int64): System_Void {
        return Il2Cpp.Api.AndroidJNI._SetStaticLongField(clazz, fieldID, val)
    }

    static SetStaticFloatField(clazz: System_IntPtr, fieldID: System_IntPtr, val: System_Single): System_Void {
        return Il2Cpp.Api.AndroidJNI._SetStaticFloatField(clazz, fieldID, val)
    }

    static SetStaticDoubleField(clazz: System_IntPtr, fieldID: System_IntPtr, val: System_Double): System_Void {
        return Il2Cpp.Api.AndroidJNI._SetStaticDoubleField(clazz, fieldID, val)
    }

    static ToBooleanArray(array: System_Boolean_array): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._ToBooleanArray(array)
    }

    static ToByteArray(array: System_Byte_array): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._ToByteArray(array)
    }

    static ToSByteArray(array: System_SByte_array): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._ToSByteArray(array)
    }

    static ToCharArray(array: System_Char_array): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._ToCharArray(array)
    }

    static ToShortArray(array: System_Int16_array): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._ToShortArray(array)
    }

    static ToIntArray(array: System_Int32_array): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._ToIntArray(array)
    }

    static ToLongArray(array: System_Int64_array): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._ToLongArray(array)
    }

    static ToFloatArray(array: System_Single_array): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._ToFloatArray(array)
    }

    static ToDoubleArray(array: System_Double_array): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._ToDoubleArray(array)
    }

    static ToObjectArray(array: System_IntPtr_array, arrayClass: System_IntPtr): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._ToObjectArray(array, arrayClass)
    }

    static ToObjectArray_1(array: System_IntPtr_array): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._ToObjectArray(array)
    }

    static FromBooleanArray(array: System_IntPtr): System_Boolean_array {
        return Il2Cpp.Api.AndroidJNI._FromBooleanArray(array)
    }

    static FromByteArray(array: System_IntPtr): System_Byte_array {
        return Il2Cpp.Api.AndroidJNI._FromByteArray(array)
    }

    static FromSByteArray(array: System_IntPtr): System_SByte_array {
        return Il2Cpp.Api.AndroidJNI._FromSByteArray(array)
    }

    static FromCharArray(array: System_IntPtr): System_Char_array {
        return Il2Cpp.Api.AndroidJNI._FromCharArray(array)
    }

    static FromShortArray(array: System_IntPtr): System_Int16_array {
        return Il2Cpp.Api.AndroidJNI._FromShortArray(array)
    }

    static FromIntArray(array: System_IntPtr): System_Int32_array {
        return Il2Cpp.Api.AndroidJNI._FromIntArray(array)
    }

    static FromLongArray(array: System_IntPtr): System_Int64_array {
        return Il2Cpp.Api.AndroidJNI._FromLongArray(array)
    }

    static FromFloatArray(array: System_IntPtr): System_Single_array {
        return Il2Cpp.Api.AndroidJNI._FromFloatArray(array)
    }

    static FromDoubleArray(array: System_IntPtr): System_Double_array {
        return Il2Cpp.Api.AndroidJNI._FromDoubleArray(array)
    }

    static FromObjectArray(array: System_IntPtr): System_IntPtr_array {
        return Il2Cpp.Api.AndroidJNI._FromObjectArray(array)
    }

    static GetArrayLength(array: System_IntPtr): System_Int32 {
        return Il2Cpp.Api.AndroidJNI._GetArrayLength(array)
    }

    static NewBooleanArray(size: System_Int32): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._NewBooleanArray(size)
    }

    static NewByteArray(size: System_Int32): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._NewByteArray(size)
    }

    static NewSByteArray(size: System_Int32): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._NewSByteArray(size)
    }

    static NewCharArray(size: System_Int32): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._NewCharArray(size)
    }

    static NewShortArray(size: System_Int32): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._NewShortArray(size)
    }

    static NewIntArray(size: System_Int32): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._NewIntArray(size)
    }

    static NewLongArray(size: System_Int32): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._NewLongArray(size)
    }

    static NewFloatArray(size: System_Int32): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._NewFloatArray(size)
    }

    static NewDoubleArray(size: System_Int32): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._NewDoubleArray(size)
    }

    static NewObjectArray(size: System_Int32, clazz: System_IntPtr, obj: System_IntPtr): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._NewObjectArray(size, clazz, obj)
    }

    static GetBooleanArrayElement(array: System_IntPtr, index: System_Int32): System_Boolean {
        return Il2Cpp.Api.AndroidJNI._GetBooleanArrayElement(array, index)
    }

    static GetByteArrayElement(array: System_IntPtr, index: System_Int32): System_Byte {
        return Il2Cpp.Api.AndroidJNI._GetByteArrayElement(array, index)
    }

    static GetSByteArrayElement(array: System_IntPtr, index: System_Int32): System_SByte {
        return Il2Cpp.Api.AndroidJNI._GetSByteArrayElement(array, index)
    }

    static GetCharArrayElement(array: System_IntPtr, index: System_Int32): System_Char {
        return Il2Cpp.Api.AndroidJNI._GetCharArrayElement(array, index)
    }

    static GetShortArrayElement(array: System_IntPtr, index: System_Int32): System_Int16 {
        return Il2Cpp.Api.AndroidJNI._GetShortArrayElement(array, index)
    }

    static GetIntArrayElement(array: System_IntPtr, index: System_Int32): System_Int32 {
        return Il2Cpp.Api.AndroidJNI._GetIntArrayElement(array, index)
    }

    static GetLongArrayElement(array: System_IntPtr, index: System_Int32): System_Int64 {
        return Il2Cpp.Api.AndroidJNI._GetLongArrayElement(array, index)
    }

    static GetFloatArrayElement(array: System_IntPtr, index: System_Int32): System_Single {
        return Il2Cpp.Api.AndroidJNI._GetFloatArrayElement(array, index)
    }

    static GetDoubleArrayElement(array: System_IntPtr, index: System_Int32): System_Double {
        return Il2Cpp.Api.AndroidJNI._GetDoubleArrayElement(array, index)
    }

    static GetObjectArrayElement(array: System_IntPtr, index: System_Int32): System_IntPtr {
        return Il2Cpp.Api.AndroidJNI._GetObjectArrayElement(array, index)
    }

    static SetBooleanArrayElement(array: System_IntPtr, index: System_Int32, val: System_Byte): System_Void {
        return Il2Cpp.Api.AndroidJNI._SetBooleanArrayElement(array, index, val)
    }

    static SetBooleanArrayElement_3(array: System_IntPtr, index: System_Int32, val: System_Boolean): System_Void {
        return Il2Cpp.Api.AndroidJNI._SetBooleanArrayElement(array, index, val)
    }

    static SetByteArrayElement(array: System_IntPtr, index: System_Int32, val: System_SByte): System_Void {
        return Il2Cpp.Api.AndroidJNI._SetByteArrayElement(array, index, val)
    }

    static SetSByteArrayElement(array: System_IntPtr, index: System_Int32, val: System_SByte): System_Void {
        return Il2Cpp.Api.AndroidJNI._SetSByteArrayElement(array, index, val)
    }

    static SetCharArrayElement(array: System_IntPtr, index: System_Int32, val: System_Char): System_Void {
        return Il2Cpp.Api.AndroidJNI._SetCharArrayElement(array, index, val)
    }

    static SetShortArrayElement(array: System_IntPtr, index: System_Int32, val: System_Int16): System_Void {
        return Il2Cpp.Api.AndroidJNI._SetShortArrayElement(array, index, val)
    }

    static SetIntArrayElement(array: System_IntPtr, index: System_Int32, val: System_Int32): System_Void {
        return Il2Cpp.Api.AndroidJNI._SetIntArrayElement(array, index, val)
    }

    static SetLongArrayElement(array: System_IntPtr, index: System_Int32, val: System_Int64): System_Void {
        return Il2Cpp.Api.AndroidJNI._SetLongArrayElement(array, index, val)
    }

    static SetFloatArrayElement(array: System_IntPtr, index: System_Int32, val: System_Single): System_Void {
        return Il2Cpp.Api.AndroidJNI._SetFloatArrayElement(array, index, val)
    }

    static SetDoubleArrayElement(array: System_IntPtr, index: System_Int32, val: System_Double): System_Void {
        return Il2Cpp.Api.AndroidJNI._SetDoubleArrayElement(array, index, val)
    }

    static SetObjectArrayElement(array: System_IntPtr, index: System_Int32, obj: System_IntPtr): System_Void {
        return Il2Cpp.Api.AndroidJNI._SetObjectArrayElement(array, index, obj)
    }

}



Il2Cpp.AndroidJNI = UnityEngine_AndroidJNI_Impl

declare global {
    namespace Il2Cpp {
        class AndroidJNI extends UnityEngine_AndroidJNI_Impl { }
    }
}

export { UnityEngine_AndroidJNI_Impl }