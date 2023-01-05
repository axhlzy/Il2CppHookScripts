import { cache } from "decorator-cache-getter"

class UnityEngine_AndroidJNISafe_API {
        // public static Void CheckException()
        @cache
        static get _CheckException() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "CheckException", 0, [], "void", [])
        }

        // public static Void DeleteGlobalRef(IntPtr globalref)
        @cache
        static get _DeleteGlobalRef() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "DeleteGlobalRef", 1, ["System.IntPtr"], "void", ["pointer"])
        }

        // public static Void DeleteWeakGlobalRef(IntPtr globalref)
        @cache
        static get _DeleteWeakGlobalRef() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "DeleteWeakGlobalRef", 1, ["System.IntPtr"], "void", ["pointer"])
        }

        // public static Void DeleteLocalRef(IntPtr localref)
        @cache
        static get _DeleteLocalRef() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "DeleteLocalRef", 1, ["System.IntPtr"], "void", ["pointer"])
        }

        // public static IntPtr NewString(String chars)
        @cache
        static get _NewString() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "NewString", 1, ["System.String"], "pointer", ["pointer"])
        }

        // public static String GetStringChars(IntPtr str)
        @cache
        static get _GetStringChars() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "GetStringChars", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static IntPtr GetObjectClass(IntPtr ptr)
        @cache
        static get _GetObjectClass() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "GetObjectClass", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static IntPtr GetStaticMethodID(IntPtr clazz,String name,String sig)
        @cache
        static get _GetStaticMethodID() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "GetStaticMethodID", 3, ["System.IntPtr", "System.String", "System.String"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static IntPtr GetMethodID(IntPtr obj,String name,String sig)
        @cache
        static get _GetMethodID() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "GetMethodID", 3, ["System.IntPtr", "System.String", "System.String"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static IntPtr GetFieldID(IntPtr clazz,String name,String sig)
        @cache
        static get _GetFieldID() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "GetFieldID", 3, ["System.IntPtr", "System.String", "System.String"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static IntPtr GetStaticFieldID(IntPtr clazz,String name,String sig)
        @cache
        static get _GetStaticFieldID() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "GetStaticFieldID", 3, ["System.IntPtr", "System.String", "System.String"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static IntPtr FromReflectedMethod(IntPtr refMethod)
        @cache
        static get _FromReflectedMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "FromReflectedMethod", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static IntPtr FindClass(String name)
        @cache
        static get _FindClass() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "FindClass", 1, ["System.String"], "pointer", ["pointer"])
        }

        // public static IntPtr NewObject(IntPtr clazz,IntPtr methodID,jvalue[] args)
        @cache
        static get _NewObject() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "NewObject", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetStaticObjectField(IntPtr clazz,IntPtr fieldID,IntPtr val)
        @cache
        static get _SetStaticObjectField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "SetStaticObjectField", 3, ["System.IntPtr", "System.IntPtr", "System.IntPtr"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetStaticStringField(IntPtr clazz,IntPtr fieldID,String val)
        @cache
        static get _SetStaticStringField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "SetStaticStringField", 3, ["System.IntPtr", "System.IntPtr", "System.String"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetStaticCharField(IntPtr clazz,IntPtr fieldID,Char val)
        @cache
        static get _SetStaticCharField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "SetStaticCharField", 3, ["System.IntPtr", "System.IntPtr", "System.Char"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetStaticDoubleField(IntPtr clazz,IntPtr fieldID,Double val)
        @cache
        static get _SetStaticDoubleField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "SetStaticDoubleField", 3, ["System.IntPtr", "System.IntPtr", "System.Double"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetStaticFloatField(IntPtr clazz,IntPtr fieldID,Single val)
        @cache
        static get _SetStaticFloatField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "SetStaticFloatField", 3, ["System.IntPtr", "System.IntPtr", "System.Single"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetStaticLongField(IntPtr clazz,IntPtr fieldID,Int64 val)
        @cache
        static get _SetStaticLongField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "SetStaticLongField", 3, ["System.IntPtr", "System.IntPtr", "System.Int64"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetStaticShortField(IntPtr clazz,IntPtr fieldID,Int16 val)
        @cache
        static get _SetStaticShortField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "SetStaticShortField", 3, ["System.IntPtr", "System.IntPtr", "System.Int16"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetStaticSByteField(IntPtr clazz,IntPtr fieldID,SByte val)
        @cache
        static get _SetStaticSByteField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "SetStaticSByteField", 3, ["System.IntPtr", "System.IntPtr", "System.SByte"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetStaticBooleanField(IntPtr clazz,IntPtr fieldID,Boolean val)
        @cache
        static get _SetStaticBooleanField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "SetStaticBooleanField", 3, ["System.IntPtr", "System.IntPtr", "System.Boolean"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetStaticIntField(IntPtr clazz,IntPtr fieldID,Int32 val)
        @cache
        static get _SetStaticIntField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "SetStaticIntField", 3, ["System.IntPtr", "System.IntPtr", "System.Int32"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static IntPtr GetStaticObjectField(IntPtr clazz,IntPtr fieldID)
        @cache
        static get _GetStaticObjectField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "GetStaticObjectField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static String GetStaticStringField(IntPtr clazz,IntPtr fieldID)
        @cache
        static get _GetStaticStringField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "GetStaticStringField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static Char GetStaticCharField(IntPtr clazz,IntPtr fieldID)
        @cache
        static get _GetStaticCharField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "GetStaticCharField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static Double GetStaticDoubleField(IntPtr clazz,IntPtr fieldID)
        @cache
        static get _GetStaticDoubleField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "GetStaticDoubleField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static Single GetStaticFloatField(IntPtr clazz,IntPtr fieldID)
        @cache
        static get _GetStaticFloatField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "GetStaticFloatField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static Int64 GetStaticLongField(IntPtr clazz,IntPtr fieldID)
        @cache
        static get _GetStaticLongField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "GetStaticLongField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static Int16 GetStaticShortField(IntPtr clazz,IntPtr fieldID)
        @cache
        static get _GetStaticShortField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "GetStaticShortField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static SByte GetStaticSByteField(IntPtr clazz,IntPtr fieldID)
        @cache
        static get _GetStaticSByteField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "GetStaticSByteField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static Boolean GetStaticBooleanField(IntPtr clazz,IntPtr fieldID)
        @cache
        static get _GetStaticBooleanField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "GetStaticBooleanField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static Int32 GetStaticIntField(IntPtr clazz,IntPtr fieldID)
        @cache
        static get _GetStaticIntField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "GetStaticIntField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static Void CallStaticVoidMethod(IntPtr clazz,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallStaticVoidMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "CallStaticVoidMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static IntPtr CallStaticObjectMethod(IntPtr clazz,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallStaticObjectMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "CallStaticObjectMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static String CallStaticStringMethod(IntPtr clazz,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallStaticStringMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "CallStaticStringMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static Char CallStaticCharMethod(IntPtr clazz,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallStaticCharMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "CallStaticCharMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static Double CallStaticDoubleMethod(IntPtr clazz,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallStaticDoubleMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "CallStaticDoubleMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static Single CallStaticFloatMethod(IntPtr clazz,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallStaticFloatMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "CallStaticFloatMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static Int64 CallStaticLongMethod(IntPtr clazz,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallStaticLongMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "CallStaticLongMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static Int16 CallStaticShortMethod(IntPtr clazz,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallStaticShortMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "CallStaticShortMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static SByte CallStaticSByteMethod(IntPtr clazz,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallStaticSByteMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "CallStaticSByteMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static Boolean CallStaticBooleanMethod(IntPtr clazz,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallStaticBooleanMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "CallStaticBooleanMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static Int32 CallStaticIntMethod(IntPtr clazz,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallStaticIntMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "CallStaticIntMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetObjectField(IntPtr obj,IntPtr fieldID,IntPtr val)
        @cache
        static get _SetObjectField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "SetObjectField", 3, ["System.IntPtr", "System.IntPtr", "System.IntPtr"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetStringField(IntPtr obj,IntPtr fieldID,String val)
        @cache
        static get _SetStringField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "SetStringField", 3, ["System.IntPtr", "System.IntPtr", "System.String"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetCharField(IntPtr obj,IntPtr fieldID,Char val)
        @cache
        static get _SetCharField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "SetCharField", 3, ["System.IntPtr", "System.IntPtr", "System.Char"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetDoubleField(IntPtr obj,IntPtr fieldID,Double val)
        @cache
        static get _SetDoubleField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "SetDoubleField", 3, ["System.IntPtr", "System.IntPtr", "System.Double"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetFloatField(IntPtr obj,IntPtr fieldID,Single val)
        @cache
        static get _SetFloatField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "SetFloatField", 3, ["System.IntPtr", "System.IntPtr", "System.Single"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetLongField(IntPtr obj,IntPtr fieldID,Int64 val)
        @cache
        static get _SetLongField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "SetLongField", 3, ["System.IntPtr", "System.IntPtr", "System.Int64"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetShortField(IntPtr obj,IntPtr fieldID,Int16 val)
        @cache
        static get _SetShortField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "SetShortField", 3, ["System.IntPtr", "System.IntPtr", "System.Int16"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetSByteField(IntPtr obj,IntPtr fieldID,SByte val)
        @cache
        static get _SetSByteField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "SetSByteField", 3, ["System.IntPtr", "System.IntPtr", "System.SByte"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetBooleanField(IntPtr obj,IntPtr fieldID,Boolean val)
        @cache
        static get _SetBooleanField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "SetBooleanField", 3, ["System.IntPtr", "System.IntPtr", "System.Boolean"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static Void SetIntField(IntPtr obj,IntPtr fieldID,Int32 val)
        @cache
        static get _SetIntField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "SetIntField", 3, ["System.IntPtr", "System.IntPtr", "System.Int32"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static IntPtr GetObjectField(IntPtr obj,IntPtr fieldID)
        @cache
        static get _GetObjectField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "GetObjectField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static String GetStringField(IntPtr obj,IntPtr fieldID)
        @cache
        static get _GetStringField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "GetStringField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static Char GetCharField(IntPtr obj,IntPtr fieldID)
        @cache
        static get _GetCharField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "GetCharField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static Double GetDoubleField(IntPtr obj,IntPtr fieldID)
        @cache
        static get _GetDoubleField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "GetDoubleField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static Single GetFloatField(IntPtr obj,IntPtr fieldID)
        @cache
        static get _GetFloatField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "GetFloatField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static Int64 GetLongField(IntPtr obj,IntPtr fieldID)
        @cache
        static get _GetLongField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "GetLongField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static Int16 GetShortField(IntPtr obj,IntPtr fieldID)
        @cache
        static get _GetShortField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "GetShortField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static SByte GetSByteField(IntPtr obj,IntPtr fieldID)
        @cache
        static get _GetSByteField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "GetSByteField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static Boolean GetBooleanField(IntPtr obj,IntPtr fieldID)
        @cache
        static get _GetBooleanField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "GetBooleanField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static Int32 GetIntField(IntPtr obj,IntPtr fieldID)
        @cache
        static get _GetIntField() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "GetIntField", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static Void CallVoidMethod(IntPtr obj,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallVoidMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "CallVoidMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "void", ["pointer", "pointer", "pointer"])
        }

        // public static IntPtr CallObjectMethod(IntPtr obj,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallObjectMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "CallObjectMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static String CallStringMethod(IntPtr obj,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallStringMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "CallStringMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static Char CallCharMethod(IntPtr obj,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallCharMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "CallCharMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static Double CallDoubleMethod(IntPtr obj,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallDoubleMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "CallDoubleMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static Single CallFloatMethod(IntPtr obj,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallFloatMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "CallFloatMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static Int64 CallLongMethod(IntPtr obj,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallLongMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "CallLongMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static Int16 CallShortMethod(IntPtr obj,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallShortMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "CallShortMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static SByte CallSByteMethod(IntPtr obj,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallSByteMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "CallSByteMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static Boolean CallBooleanMethod(IntPtr obj,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallBooleanMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "CallBooleanMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static Int32 CallIntMethod(IntPtr obj,IntPtr methodID,jvalue[] args)
        @cache
        static get _CallIntMethod() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "CallIntMethod", 3, ["System.IntPtr", "System.IntPtr", "UnityEngine.jvalue[]"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static Char[] FromCharArray(IntPtr array)
        @cache
        static get _FromCharArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "FromCharArray", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static Double[] FromDoubleArray(IntPtr array)
        @cache
        static get _FromDoubleArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "FromDoubleArray", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static Single[] FromFloatArray(IntPtr array)
        @cache
        static get _FromFloatArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "FromFloatArray", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static Int64[] FromLongArray(IntPtr array)
        @cache
        static get _FromLongArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "FromLongArray", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static Int16[] FromShortArray(IntPtr array)
        @cache
        static get _FromShortArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "FromShortArray", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static Byte[] FromByteArray(IntPtr array)
        @cache
        static get _FromByteArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "FromByteArray", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static SByte[] FromSByteArray(IntPtr array)
        @cache
        static get _FromSByteArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "FromSByteArray", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static Boolean[] FromBooleanArray(IntPtr array)
        @cache
        static get _FromBooleanArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "FromBooleanArray", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static Int32[] FromIntArray(IntPtr array)
        @cache
        static get _FromIntArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "FromIntArray", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static IntPtr ToObjectArray(IntPtr[] array,IntPtr type)
        @cache
        static get _ToObjectArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "ToObjectArray", 2, ["System.IntPtr[]", "System.IntPtr"], "pointer", ["pointer", "pointer"])
        }

        // public static IntPtr ToCharArray(Char[] array)
        @cache
        static get _ToCharArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "ToCharArray", 1, ["System.Char[]"], "pointer", ["pointer"])
        }

        // public static IntPtr ToDoubleArray(Double[] array)
        @cache
        static get _ToDoubleArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "ToDoubleArray", 1, ["System.Double[]"], "pointer", ["pointer"])
        }

        // public static IntPtr ToFloatArray(Single[] array)
        @cache
        static get _ToFloatArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "ToFloatArray", 1, ["System.Single[]"], "pointer", ["pointer"])
        }

        // public static IntPtr ToLongArray(Int64[] array)
        @cache
        static get _ToLongArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "ToLongArray", 1, ["System.Int64[]"], "pointer", ["pointer"])
        }

        // public static IntPtr ToShortArray(Int16[] array)
        @cache
        static get _ToShortArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "ToShortArray", 1, ["System.Int16[]"], "pointer", ["pointer"])
        }

        // public static IntPtr ToByteArray(Byte[] array)
        @cache
        static get _ToByteArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "ToByteArray", 1, ["System.Byte[]"], "pointer", ["pointer"])
        }

        // public static IntPtr ToSByteArray(SByte[] array)
        @cache
        static get _ToSByteArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "ToSByteArray", 1, ["System.SByte[]"], "pointer", ["pointer"])
        }

        // public static IntPtr ToBooleanArray(Boolean[] array)
        @cache
        static get _ToBooleanArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "ToBooleanArray", 1, ["System.Boolean[]"], "pointer", ["pointer"])
        }

        // public static IntPtr ToIntArray(Int32[] array)
        @cache
        static get _ToIntArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "ToIntArray", 1, ["System.Int32[]"], "pointer", ["pointer"])
        }

        // public static IntPtr GetObjectArrayElement(IntPtr array,Int32 index)
        @cache
        static get _GetObjectArrayElement() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "GetObjectArrayElement", 2, ["System.IntPtr", "System.Int32"], "pointer", ["pointer", "pointer"])
        }

        // public static Int32 GetArrayLength(IntPtr array)
        @cache
        static get _GetArrayLength() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNISafe", "GetArrayLength", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

}

Il2Cpp.Api.AndroidJNISafe = UnityEngine_AndroidJNISafe_API

declare global {
        namespace Il2Cpp.Api {
                class AndroidJNISafe extends UnityEngine_AndroidJNISafe_API { }
        }
}

export { }