import { cache } from "decorator-cache-getter"

class UnityEngine_AndroidJNIHelper_API {
        // public static Boolean get_debug()
        @cache
        static get _get_debug() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNIHelper", "get_debug", 0, [], "pointer", [])
        }

        // public static Void set_debug(Boolean value)
        @cache
        static get _set_debug() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNIHelper", "set_debug", 1, ["System.Boolean"], "void", ["pointer"])
        }

        // public static IntPtr GetConstructorID(IntPtr javaClass)
        @cache
        static get _GetConstructorID() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNIHelper", "GetConstructorID", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static IntPtr GetConstructorID(IntPtr javaClass,String signature)
        @cache
        static get _GetConstructorID_javaClass_signature() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNIHelper", "GetConstructorID", 2, ["System.IntPtr", "System.String"], "pointer", ["pointer", "pointer"])
        }

        // public static IntPtr GetMethodID(IntPtr javaClass,String methodName)
        @cache
        static get _GetMethodID() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNIHelper", "GetMethodID", 2, ["System.IntPtr", "System.String"], "pointer", ["pointer", "pointer"])
        }

        // public static IntPtr GetMethodID(IntPtr javaClass,String methodName,String signature)
        @cache
        static get _GetMethodID_javaClass_methodName_signature() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNIHelper", "GetMethodID", 3, ["System.IntPtr", "System.String", "System.String"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static IntPtr GetMethodID(IntPtr javaClass,String methodName,String signature,Boolean isStatic)
        @cache
        static get _GetMethodID_javaClass_methodName_signature_isStatic() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNIHelper", "GetMethodID", 4, ["System.IntPtr", "System.String", "System.String", "System.Boolean"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
        }

        // public static IntPtr GetFieldID(IntPtr javaClass,String fieldName)
        @cache
        static get _GetFieldID() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNIHelper", "GetFieldID", 2, ["System.IntPtr", "System.String"], "pointer", ["pointer", "pointer"])
        }

        // public static IntPtr GetFieldID(IntPtr javaClass,String fieldName,String signature)
        @cache
        static get _GetFieldID_javaClass_fieldName_signature() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNIHelper", "GetFieldID", 3, ["System.IntPtr", "System.String", "System.String"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static IntPtr GetFieldID(IntPtr javaClass,String fieldName,String signature,Boolean isStatic)
        @cache
        static get _GetFieldID_javaClass_fieldName_signature_isStatic() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNIHelper", "GetFieldID", 4, ["System.IntPtr", "System.String", "System.String", "System.Boolean"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
        }

        // public static IntPtr CreateJavaRunnable(AndroidJavaRunnable jrunnable)
        @cache
        static get _CreateJavaRunnable() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNIHelper", "CreateJavaRunnable", 1, ["UnityEngine.AndroidJavaRunnable"], "pointer", ["pointer"])
        }

        // public static IntPtr CreateJavaProxy(AndroidJavaProxy proxy)
        @cache
        static get _CreateJavaProxy() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNIHelper", "CreateJavaProxy", 1, ["UnityEngine.AndroidJavaProxy"], "pointer", ["pointer"])
        }

        // public static IntPtr ConvertToJNIArray(Array array)
        @cache
        static get _ConvertToJNIArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNIHelper", "ConvertToJNIArray", 1, ["System.Array"], "pointer", ["pointer"])
        }

        // public static jvalue[] CreateJNIArgArray(Object[] args)
        @cache
        static get _CreateJNIArgArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNIHelper", "CreateJNIArgArray", 1, ["System.Object[]"], "pointer", ["pointer"])
        }

        // public static Void DeleteJNIArgArray(Object[] args,jvalue[] jniArgs)
        @cache
        static get _DeleteJNIArgArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNIHelper", "DeleteJNIArgArray", 2, ["System.Object[]", "UnityEngine.jvalue[]"], "void", ["pointer", "pointer"])
        }

        // public static IntPtr GetConstructorID(IntPtr jclass,Object[] args)
        @cache
        static get _GetConstructorID_jclass_args() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNIHelper", "GetConstructorID", 2, ["System.IntPtr", "System.Object[]"], "pointer", ["pointer", "pointer"])
        }

        // public static IntPtr GetMethodID(IntPtr jclass,String methodName,Object[] args,Boolean isStatic)
        @cache
        static get _GetMethodID_jclass_methodName_args_isStatic() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNIHelper", "GetMethodID", 4, ["System.IntPtr", "System.String", "System.Object[]", "System.Boolean"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
        }

        // public static String GetSignature(Object obj)
        @cache
        static get _GetSignature() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNIHelper", "GetSignature", 1, ["System.Object"], "pointer", ["pointer"])
        }

        // public static String GetSignature(Object[] args)
        @cache
        static get _GetSignature_Object_array() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNIHelper", "GetSignature", 1, ["System.Object[]"], "pointer", ["pointer"])
        }

        // public static ArrayType ConvertFromJNIArray(IntPtr array)
        @cache
        static get _ConvertFromJNIArray() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNIHelper", "ConvertFromJNIArray", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // public static IntPtr GetFieldID(IntPtr jclass,String fieldName,Boolean isStatic)
        @cache
        static get _GetFieldID_jclass_fieldName_isStatic() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNIHelper", "GetFieldID", 3, ["System.IntPtr", "System.String", "System.Boolean"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public static String GetSignature(Object[] args)
        @cache
        static get _GetSignature_args() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJNIHelper", "GetSignature", 1, ["System.Object[]"], "pointer", ["pointer"])
        }

}

Il2Cpp.Api.AndroidJNIHelper = UnityEngine_AndroidJNIHelper_API

declare global {
        namespace Il2Cpp.Api {
                class AndroidJNIHelper extends UnityEngine_AndroidJNIHelper_API { }
        }
}

export { }