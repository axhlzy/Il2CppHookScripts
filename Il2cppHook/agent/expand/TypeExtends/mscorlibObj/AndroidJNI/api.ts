import { cache } from "decorator-cache-getter"

class UnityEngine_AndroidJNI_API {
        // public static Int32 AttachCurrentThread()
        @cache
        static get _AttachCurrentThread() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "AttachCurrentThread", 0, [], "pointer", [])
        }

        // public static Int32 DetachCurrentThread()
        @cache
        static get _DetachCurrentThread() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "DetachCurrentThread", 0, [], "pointer", [])
        }

        // public static Int32 GetVersion()
        @cache
        static get _GetVersion() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetVersion", 0, [], "pointer", [])
        }

        // public static IntPtr FindClass(String name)
        @cache
        static get _FindClass() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "FindClass", 1, ["System.String"], "pointer", ["pointer"])
        }

        // public static IntPtr FromReflectedMethod(IntPtr refMethod)
        @cache
        static get _FromReflectedMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "FromReflectedMethod", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static IntPtr FromReflectedField(IntPtr refField)
        @cache
        static get _FromReflectedField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "FromReflectedField", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static IntPtr ToReflectedMethod(IntPtr clazz,IntPtr methodID,Boolean isStatic)
        @cache
        static get _ToReflectedMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "ToReflectedMethod", 3, ["System.IntPtr", "System.IntPtr", "System.Boolean"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static IntPtr ToReflectedField(IntPtr clazz,IntPtr fieldID,Boolean isStatic)
        @cache
        static get _ToReflectedField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "ToReflectedField", 3, ["System.IntPtr", "System.IntPtr", "System.Boolean"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static IntPtr GetSuperclass(IntPtr clazz)
        @cache
        static get _GetSuperclass() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetSuperclass", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static Boolean IsAssignableFrom(IntPtr clazz1,IntPtr clazz2)
        @cache
        static get _IsAssignableFrom() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "IsAssignableFrom", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static Int32 Throw(IntPtr obj)
        @cache
        static get _Throw() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "Throw", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static Int32 ThrowNew(IntPtr clazz,String message)
        @cache
        static get _ThrowNew() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "ThrowNew", 2, ["System.IntPtr", "System.String"], "pointer", ["pointer", "pointer"])
        }

        // public static IntPtr ExceptionOccurred()
        @cache
        static get _ExceptionOccurred() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "ExceptionOccurred", 0, [], "pointer", [])
        }

        // public static Void ExceptionDescribe()
        @cache
        static get _ExceptionDescribe() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "ExceptionDescribe", 0, [], "void", [])
        }

        // public static Void ExceptionClear()
        @cache
        static get _ExceptionClear() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "ExceptionClear", 0, [], "void", [])
        }

        // public static Void FatalError(String message)
        @cache
        static get _FatalError() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "FatalError", 1, ["System.String"], "void", ["pointer"])
        }

        // public static Int32 PushLocalFrame(Int32 capacity)
        @cache
        static get _PushLocalFrame() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "PushLocalFrame", 1, ["System.Int32"], "pointer", ["pointer"])
        }

        // public static IntPtr PopLocalFrame(IntPtr ptr)
        @cache
        static get _PopLocalFrame() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "PopLocalFrame", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static IntPtr NewGlobalRef(IntPtr obj)
        @cache
        static get _NewGlobalRef() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "NewGlobalRef", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static Void DeleteGlobalRef(IntPtr obj)
        @cache
        static get _DeleteGlobalRef() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "DeleteGlobalRef", 1, ["System.IntPtr"], "void", ["pointer"])
        }

        // public static IntPtr NewWeakGlobalRef(IntPtr obj)
        @cache
        static get _NewWeakGlobalRef() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "NewWeakGlobalRef", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static Void DeleteWeakGlobalRef(IntPtr obj)
        @cache
        static get _DeleteWeakGlobalRef() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "DeleteWeakGlobalRef", 1, ["System.IntPtr"], "void", ["pointer"])
        }

        // public static IntPtr NewLocalRef(IntPtr obj)
        @cache
        static get _NewLocalRef() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "NewLocalRef", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static Void DeleteLocalRef(IntPtr obj)
        @cache
        static get _DeleteLocalRef() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "DeleteLocalRef", 1, ["System.IntPtr"], "void", ["pointer"])
        }

        // public static Boolean IsSameObject(IntPtr obj1,IntPtr obj2)
        @cache
        static get _IsSameObject() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "IsSameObject", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static Int32 EnsureLocalCapacity(Int32 capacity)
        @cache
        static get _EnsureLocalCapacity() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "EnsureLocalCapacity", 1, ["System.Int32"], "pointer", ["pointer"])
        }

        // public static IntPtr AllocObject(IntPtr clazz)
        @cache
        static get _AllocObject() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "AllocObject", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static IntPtr NewObject(IntPtr clazz,IntPtr methodID,jvalue[] args)
        @cache
        static get _NewObject() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "NewObject", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static IntPtr GetObjectClass(IntPtr obj)
        @cache
        static get _GetObjectClass() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetObjectClass", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static Boolean IsInstanceOf(IntPtr obj,IntPtr clazz)
        @cache
        static get _IsInstanceOf() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "IsInstanceOf", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static IntPtr GetMethodID(IntPtr clazz,String name,String sig)
        @cache
        static get _GetMethodID() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetMethodID", 3, ["System.IntPtr", "System.String", "System.String"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static IntPtr GetFieldID(IntPtr clazz,String name,String sig)
        @cache
        static get _GetFieldID() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetFieldID", 3, ["System.IntPtr", "System.String", "System.String"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static IntPtr GetStaticMethodID(IntPtr clazz,String name,String sig)
        @cache
        static get _GetStaticMethodID() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetStaticMethodID", 3, ["System.IntPtr", "System.String", "System.String"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static IntPtr GetStaticFieldID(IntPtr clazz,String name,String sig)
        @cache
        static get _GetStaticFieldID() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetStaticFieldID", 3, ["System.IntPtr", "System.String", "System.String"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static IntPtr NewString(String chars)
        @cache
        static get _NewString() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "NewString", 1, ["System.String"], "pointer", ["pointer"])
        }

        // private static IntPtr NewStringFromStr(String chars)
        @cache
        static get _NewStringFromStr() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "NewStringFromStr", 1, ["System.String"], "pointer", ["pointer"])
        }

        // public static IntPtr NewString(Char[] chars)
        @cache
        static get _NewString_chars() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "NewString", 1, ["System.Char[]"], "pointer", ["pointer"])
        }

        // public static IntPtr NewStringUTF(String bytes)
        @cache
        static get _NewStringUTF() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "NewStringUTF", 1, ["System.String"], "pointer", ["pointer"])
        }

        // public static String GetStringChars(IntPtr str)
        @cache
        static get _GetStringChars() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetStringChars", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static Int32 GetStringLength(IntPtr str)
        @cache
        static get _GetStringLength() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetStringLength", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static Int32 GetStringUTFLength(IntPtr str)
        @cache
        static get _GetStringUTFLength() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetStringUTFLength", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static String GetStringUTFChars(IntPtr str)
        @cache
        static get _GetStringUTFChars() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetStringUTFChars", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static String CallStringMethod(IntPtr obj,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallStringMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "CallStringMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static IntPtr CallObjectMethod(IntPtr obj,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallObjectMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "CallObjectMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static Int32 CallIntMethod(IntPtr obj,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallIntMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "CallIntMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static Boolean CallBooleanMethod(IntPtr obj,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallBooleanMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "CallBooleanMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static Int16 CallShortMethod(IntPtr obj,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallShortMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "CallShortMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static Byte CallByteMethod(IntPtr obj,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallByteMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "CallByteMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static SByte CallSByteMethod(IntPtr obj,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallSByteMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "CallSByteMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static Char CallCharMethod(IntPtr obj,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallCharMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "CallCharMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static Single CallFloatMethod(IntPtr obj,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallFloatMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "CallFloatMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static Double CallDoubleMethod(IntPtr obj,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallDoubleMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "CallDoubleMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static Int64 CallLongMethod(IntPtr obj,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallLongMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "CallLongMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static Void CallVoidMethod(IntPtr obj,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallVoidMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "CallVoidMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static String GetStringField(IntPtr obj,IntPtr fieldID)
        @cache
        static get _GetStringField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetStringField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static IntPtr GetObjectField(IntPtr obj,IntPtr fieldID)
        @cache
        static get _GetObjectField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetObjectField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static Boolean GetBooleanField(IntPtr obj,IntPtr fieldID)
        @cache
        static get _GetBooleanField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetBooleanField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static Byte GetByteField(IntPtr obj,IntPtr fieldID)
        @cache
        static get _GetByteField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetByteField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static SByte GetSByteField(IntPtr obj,IntPtr fieldID)
        @cache
        static get _GetSByteField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetSByteField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static Char GetCharField(IntPtr obj,IntPtr fieldID)
        @cache
        static get _GetCharField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetCharField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static Int16 GetShortField(IntPtr obj,IntPtr fieldID)
        @cache
        static get _GetShortField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetShortField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static Int32 GetIntField(IntPtr obj,IntPtr fieldID)
        @cache
        static get _GetIntField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetIntField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static Int64 GetLongField(IntPtr obj,IntPtr fieldID)
        @cache
        static get _GetLongField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetLongField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static Single GetFloatField(IntPtr obj,IntPtr fieldID)
        @cache
        static get _GetFloatField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetFloatField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static Double GetDoubleField(IntPtr obj,IntPtr fieldID)
        @cache
        static get _GetDoubleField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetDoubleField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static Void SetStringField(IntPtr obj,IntPtr fieldID,String val)
        @cache
        static get _SetStringField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "SetStringField", 3, ["System.IntPtr", "System.IntPtr", "System.String"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetObjectField(IntPtr obj,IntPtr fieldID,IntPtr val)
        @cache
        static get _SetObjectField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "SetObjectField", 3, ["System.IntPtr", "System.IntPtr", "System.IntPtr"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetBooleanField(IntPtr obj,IntPtr fieldID,Boolean val)
        @cache
        static get _SetBooleanField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "SetBooleanField", 3, ["System.IntPtr", "System.IntPtr", "System.Boolean"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetByteField(IntPtr obj,IntPtr fieldID,Byte val)
        @cache
        static get _SetByteField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "SetByteField", 3, ["System.IntPtr", "System.IntPtr", "System.Byte"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetSByteField(IntPtr obj,IntPtr fieldID,SByte val)
        @cache
        static get _SetSByteField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "SetSByteField", 3, ["System.IntPtr", "System.IntPtr", "System.SByte"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetCharField(IntPtr obj,IntPtr fieldID,Char val)
        @cache
        static get _SetCharField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "SetCharField", 3, ["System.IntPtr", "System.IntPtr", "System.Char"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetShortField(IntPtr obj,IntPtr fieldID,Int16 val)
        @cache
        static get _SetShortField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "SetShortField", 3, ["System.IntPtr", "System.IntPtr", "System.Int16"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetIntField(IntPtr obj,IntPtr fieldID,Int32 val)
        @cache
        static get _SetIntField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "SetIntField", 3, ["System.IntPtr", "System.IntPtr", "System.Int32"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetLongField(IntPtr obj,IntPtr fieldID,Int64 val)
        @cache
        static get _SetLongField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "SetLongField", 3, ["System.IntPtr", "System.IntPtr", "System.Int64"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetFloatField(IntPtr obj,IntPtr fieldID,Single val)
        @cache
        static get _SetFloatField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "SetFloatField", 3, ["System.IntPtr", "System.IntPtr", "System.Single"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetDoubleField(IntPtr obj,IntPtr fieldID,Double val)
        @cache
        static get _SetDoubleField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "SetDoubleField", 3, ["System.IntPtr", "System.IntPtr", "System.Double"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static String CallStaticStringMethod(IntPtr clazz,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallStaticStringMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "CallStaticStringMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static IntPtr CallStaticObjectMethod(IntPtr clazz,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallStaticObjectMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "CallStaticObjectMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static Int32 CallStaticIntMethod(IntPtr clazz,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallStaticIntMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "CallStaticIntMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static Boolean CallStaticBooleanMethod(IntPtr clazz,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallStaticBooleanMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "CallStaticBooleanMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static Int16 CallStaticShortMethod(IntPtr clazz,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallStaticShortMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "CallStaticShortMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static Byte CallStaticByteMethod(IntPtr clazz,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallStaticByteMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "CallStaticByteMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static SByte CallStaticSByteMethod(IntPtr clazz,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallStaticSByteMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "CallStaticSByteMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static Char CallStaticCharMethod(IntPtr clazz,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallStaticCharMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "CallStaticCharMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static Single CallStaticFloatMethod(IntPtr clazz,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallStaticFloatMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "CallStaticFloatMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static Double CallStaticDoubleMethod(IntPtr clazz,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallStaticDoubleMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "CallStaticDoubleMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static Int64 CallStaticLongMethod(IntPtr clazz,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallStaticLongMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "CallStaticLongMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static Void CallStaticVoidMethod(IntPtr clazz,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallStaticVoidMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "CallStaticVoidMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static String GetStaticStringField(IntPtr clazz,IntPtr fieldID)
        @cache
        static get _GetStaticStringField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetStaticStringField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static IntPtr GetStaticObjectField(IntPtr clazz,IntPtr fieldID)
        @cache
        static get _GetStaticObjectField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetStaticObjectField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static Boolean GetStaticBooleanField(IntPtr clazz,IntPtr fieldID)
        @cache
        static get _GetStaticBooleanField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetStaticBooleanField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static Byte GetStaticByteField(IntPtr clazz,IntPtr fieldID)
        @cache
        static get _GetStaticByteField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetStaticByteField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static SByte GetStaticSByteField(IntPtr clazz,IntPtr fieldID)
        @cache
        static get _GetStaticSByteField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetStaticSByteField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static Char GetStaticCharField(IntPtr clazz,IntPtr fieldID)
        @cache
        static get _GetStaticCharField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetStaticCharField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static Int16 GetStaticShortField(IntPtr clazz,IntPtr fieldID)
        @cache
        static get _GetStaticShortField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetStaticShortField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static Int32 GetStaticIntField(IntPtr clazz,IntPtr fieldID)
        @cache
        static get _GetStaticIntField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetStaticIntField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static Int64 GetStaticLongField(IntPtr clazz,IntPtr fieldID)
        @cache
        static get _GetStaticLongField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetStaticLongField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static Single GetStaticFloatField(IntPtr clazz,IntPtr fieldID)
        @cache
        static get _GetStaticFloatField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetStaticFloatField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static Double GetStaticDoubleField(IntPtr clazz,IntPtr fieldID)
        @cache
        static get _GetStaticDoubleField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetStaticDoubleField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static Void SetStaticStringField(IntPtr clazz,IntPtr fieldID,String val)
        @cache
        static get _SetStaticStringField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "SetStaticStringField", 3, ["System.IntPtr", "System.IntPtr", "System.String"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetStaticObjectField(IntPtr clazz,IntPtr fieldID,IntPtr val)
        @cache
        static get _SetStaticObjectField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "SetStaticObjectField", 3, ["System.IntPtr", "System.IntPtr", "System.IntPtr"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetStaticBooleanField(IntPtr clazz,IntPtr fieldID,Boolean val)
        @cache
        static get _SetStaticBooleanField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "SetStaticBooleanField", 3, ["System.IntPtr", "System.IntPtr", "System.Boolean"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetStaticByteField(IntPtr clazz,IntPtr fieldID,Byte val)
        @cache
        static get _SetStaticByteField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "SetStaticByteField", 3, ["System.IntPtr", "System.IntPtr", "System.Byte"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetStaticSByteField(IntPtr clazz,IntPtr fieldID,SByte val)
        @cache
        static get _SetStaticSByteField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "SetStaticSByteField", 3, ["System.IntPtr", "System.IntPtr", "System.SByte"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetStaticCharField(IntPtr clazz,IntPtr fieldID,Char val)
        @cache
        static get _SetStaticCharField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "SetStaticCharField", 3, ["System.IntPtr", "System.IntPtr", "System.Char"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetStaticShortField(IntPtr clazz,IntPtr fieldID,Int16 val)
        @cache
        static get _SetStaticShortField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "SetStaticShortField", 3, ["System.IntPtr", "System.IntPtr", "System.Int16"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetStaticIntField(IntPtr clazz,IntPtr fieldID,Int32 val)
        @cache
        static get _SetStaticIntField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "SetStaticIntField", 3, ["System.IntPtr", "System.IntPtr", "System.Int32"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetStaticLongField(IntPtr clazz,IntPtr fieldID,Int64 val)
        @cache
        static get _SetStaticLongField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "SetStaticLongField", 3, ["System.IntPtr", "System.IntPtr", "System.Int64"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetStaticFloatField(IntPtr clazz,IntPtr fieldID,Single val)
        @cache
        static get _SetStaticFloatField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "SetStaticFloatField", 3, ["System.IntPtr", "System.IntPtr", "System.Single"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetStaticDoubleField(IntPtr clazz,IntPtr fieldID,Double val)
        @cache
        static get _SetStaticDoubleField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "SetStaticDoubleField", 3, ["System.IntPtr", "System.IntPtr", "System.Double"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static IntPtr ToBooleanArray(Boolean[] array)
        @cache
        static get _ToBooleanArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "ToBooleanArray", 1, ["System.Boolean[]"], "pointer", ["pointer"])
        }

        // public static IntPtr ToByteArray(Byte[] array)
        @cache
        static get _ToByteArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "ToByteArray", 1, ["System.Byte[]"], "pointer", ["pointer"])
        }

        // public static IntPtr ToSByteArray(SByte[] array)
        @cache
        static get _ToSByteArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "ToSByteArray", 1, ["System.SByte[]"], "pointer", ["pointer"])
        }

        // public static IntPtr ToCharArray(Char[] array)
        @cache
        static get _ToCharArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "ToCharArray", 1, ["System.Char[]"], "pointer", ["pointer"])
        }

        // public static IntPtr ToShortArray(Int16[] array)
        @cache
        static get _ToShortArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "ToShortArray", 1, ["System.Int16[]"], "pointer", ["pointer"])
        }

        // public static IntPtr ToIntArray(Int32[] array)
        @cache
        static get _ToIntArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "ToIntArray", 1, ["System.Int32[]"], "pointer", ["pointer"])
        }

        // public static IntPtr ToLongArray(Int64[] array)
        @cache
        static get _ToLongArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "ToLongArray", 1, ["System.Int64[]"], "pointer", ["pointer"])
        }

        // public static IntPtr ToFloatArray(Single[] array)
        @cache
        static get _ToFloatArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "ToFloatArray", 1, ["System.Single[]"], "pointer", ["pointer"])
        }

        // public static IntPtr ToDoubleArray(Double[] array)
        @cache
        static get _ToDoubleArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "ToDoubleArray", 1, ["System.Double[]"], "pointer", ["pointer"])
        }

        // public static IntPtr ToObjectArray(IntPtr[] array,IntPtr arrayClass)
        @cache
        static get _ToObjectArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "ToObjectArray", 2, ["System.IntPtr[]", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static IntPtr ToObjectArray(IntPtr[] array)
        @cache
        static get _ToObjectArray_array() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "ToObjectArray", 1, ["System.IntPtr[]"], "pointer", ["pointer"])
        }

        // public static Boolean[] FromBooleanArray(IntPtr array)
        @cache
        static get _FromBooleanArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "FromBooleanArray", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static Byte[] FromByteArray(IntPtr array)
        @cache
        static get _FromByteArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "FromByteArray", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static SByte[] FromSByteArray(IntPtr array)
        @cache
        static get _FromSByteArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "FromSByteArray", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static Char[] FromCharArray(IntPtr array)
        @cache
        static get _FromCharArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "FromCharArray", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static Int16[] FromShortArray(IntPtr array)
        @cache
        static get _FromShortArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "FromShortArray", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static Int32[] FromIntArray(IntPtr array)
        @cache
        static get _FromIntArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "FromIntArray", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static Int64[] FromLongArray(IntPtr array)
        @cache
        static get _FromLongArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "FromLongArray", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static Single[] FromFloatArray(IntPtr array)
        @cache
        static get _FromFloatArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "FromFloatArray", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static Double[] FromDoubleArray(IntPtr array)
        @cache
        static get _FromDoubleArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "FromDoubleArray", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static IntPtr[] FromObjectArray(IntPtr array)
        @cache
        static get _FromObjectArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "FromObjectArray", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static Int32 GetArrayLength(IntPtr array)
        @cache
        static get _GetArrayLength() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetArrayLength", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static IntPtr NewBooleanArray(Int32 size)
        @cache
        static get _NewBooleanArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "NewBooleanArray", 1, ["System.Int32"], "pointer", ["pointer"])
        }

        // public static IntPtr NewByteArray(Int32 size)
        @cache
        static get _NewByteArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "NewByteArray", 1, ["System.Int32"], "pointer", ["pointer"])
        }

        // public static IntPtr NewSByteArray(Int32 size)
        @cache
        static get _NewSByteArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "NewSByteArray", 1, ["System.Int32"], "pointer", ["pointer"])
        }

        // public static IntPtr NewCharArray(Int32 size)
        @cache
        static get _NewCharArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "NewCharArray", 1, ["System.Int32"], "pointer", ["pointer"])
        }

        // public static IntPtr NewShortArray(Int32 size)
        @cache
        static get _NewShortArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "NewShortArray", 1, ["System.Int32"], "pointer", ["pointer"])
        }

        // public static IntPtr NewIntArray(Int32 size)
        @cache
        static get _NewIntArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "NewIntArray", 1, ["System.Int32"], "pointer", ["pointer"])
        }

        // public static IntPtr NewLongArray(Int32 size)
        @cache
        static get _NewLongArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "NewLongArray", 1, ["System.Int32"], "pointer", ["pointer"])
        }

        // public static IntPtr NewFloatArray(Int32 size)
        @cache
        static get _NewFloatArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "NewFloatArray", 1, ["System.Int32"], "pointer", ["pointer"])
        }

        // public static IntPtr NewDoubleArray(Int32 size)
        @cache
        static get _NewDoubleArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "NewDoubleArray", 1, ["System.Int32"], "pointer", ["pointer"])
        }

        // public static IntPtr NewObjectArray(Int32 size,IntPtr clazz,IntPtr obj)
        @cache
        static get _NewObjectArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "NewObjectArray", 3, ["System.Int32", "System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static Boolean GetBooleanArrayElement(IntPtr array,Int32 index)
        @cache
        static get _GetBooleanArrayElement() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetBooleanArrayElement", 2, ["System.IntPtr", "System.Int32"], "pointer", ["pointer", "pointer"])
        }

        // public static Byte GetByteArrayElement(IntPtr array,Int32 index)
        @cache
        static get _GetByteArrayElement() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetByteArrayElement", 2, ["System.IntPtr", "System.Int32"], "pointer", ["pointer", "pointer"])
        }

        // public static SByte GetSByteArrayElement(IntPtr array,Int32 index)
        @cache
        static get _GetSByteArrayElement() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetSByteArrayElement", 2, ["System.IntPtr", "System.Int32"], "pointer", ["pointer", "pointer"])
        }

        // public static Char GetCharArrayElement(IntPtr array,Int32 index)
        @cache
        static get _GetCharArrayElement() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetCharArrayElement", 2, ["System.IntPtr", "System.Int32"], "pointer", ["pointer", "pointer"])
        }

        // public static Int16 GetShortArrayElement(IntPtr array,Int32 index)
        @cache
        static get _GetShortArrayElement() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetShortArrayElement", 2, ["System.IntPtr", "System.Int32"], "pointer", ["pointer", "pointer"])
        }

        // public static Int32 GetIntArrayElement(IntPtr array,Int32 index)
        @cache
        static get _GetIntArrayElement() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetIntArrayElement", 2, ["System.IntPtr", "System.Int32"], "pointer", ["pointer", "pointer"])
        }

        // public static Int64 GetLongArrayElement(IntPtr array,Int32 index)
        @cache
        static get _GetLongArrayElement() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetLongArrayElement", 2, ["System.IntPtr", "System.Int32"], "pointer", ["pointer", "pointer"])
        }

        // public static Single GetFloatArrayElement(IntPtr array,Int32 index)
        @cache
        static get _GetFloatArrayElement() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetFloatArrayElement", 2, ["System.IntPtr", "System.Int32"], "pointer", ["pointer", "pointer"])
        }

        // public static Double GetDoubleArrayElement(IntPtr array,Int32 index)
        @cache
        static get _GetDoubleArrayElement() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetDoubleArrayElement", 2, ["System.IntPtr", "System.Int32"], "pointer", ["pointer", "pointer"])
        }

        // public static IntPtr GetObjectArrayElement(IntPtr array,Int32 index)
        @cache
        static get _GetObjectArrayElement() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "GetObjectArrayElement", 2, ["System.IntPtr", "System.Int32"], "pointer", ["pointer", "pointer"])
        }

        // public static Void SetBooleanArrayElement(IntPtr array,Int32 index,Byte val)
        @cache
        static get _SetBooleanArrayElement() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "SetBooleanArrayElement", 3, ["System.IntPtr", "System.Int32", "System.Byte"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetBooleanArrayElement(IntPtr array,Int32 index,Boolean val)
        @cache
        static get _SetBooleanArrayElement_array_index_val() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "SetBooleanArrayElement", 3, ["System.IntPtr", "System.Int32", "System.Boolean"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetByteArrayElement(IntPtr array,Int32 index,SByte val)
        @cache
        static get _SetByteArrayElement() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "SetByteArrayElement", 3, ["System.IntPtr", "System.Int32", "System.SByte"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetSByteArrayElement(IntPtr array,Int32 index,SByte val)
        @cache
        static get _SetSByteArrayElement() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "SetSByteArrayElement", 3, ["System.IntPtr", "System.Int32", "System.SByte"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetCharArrayElement(IntPtr array,Int32 index,Char val)
        @cache
        static get _SetCharArrayElement() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "SetCharArrayElement", 3, ["System.IntPtr", "System.Int32", "System.Char"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetShortArrayElement(IntPtr array,Int32 index,Int16 val)
        @cache
        static get _SetShortArrayElement() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "SetShortArrayElement", 3, ["System.IntPtr", "System.Int32", "System.Int16"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetIntArrayElement(IntPtr array,Int32 index,Int32 val)
        @cache
        static get _SetIntArrayElement() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "SetIntArrayElement", 3, ["System.IntPtr", "System.Int32", "System.Int32"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetLongArrayElement(IntPtr array,Int32 index,Int64 val)
        @cache
        static get _SetLongArrayElement() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "SetLongArrayElement", 3, ["System.IntPtr", "System.Int32", "System.Int64"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetFloatArrayElement(IntPtr array,Int32 index,Single val)
        @cache
        static get _SetFloatArrayElement() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "SetFloatArrayElement", 3, ["System.IntPtr", "System.Int32", "System.Single"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetDoubleArrayElement(IntPtr array,Int32 index,Double val)
        @cache
        static get _SetDoubleArrayElement() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "SetDoubleArrayElement", 3, ["System.IntPtr", "System.Int32", "System.Double"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetObjectArrayElement(IntPtr array,Int32 index,IntPtr obj)
        @cache
        static get _SetObjectArrayElement() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNI", "SetObjectArrayElement", 3, ["System.IntPtr", "System.Int32", "System.IntPtr"], "void", ["pointer", "pointer", "pointer"])
        }

}

Il2Cpp.Api.AndroidJNI = UnityEngine_AndroidJNI_API

declare global {
        namespace Il2Cpp.Api {
                class AndroidJNI extends UnityEngine_AndroidJNI_API { }
        }
}

export { }