import { cache } from "decorator-cache-getter"

class UnityEngine_AndroidJavaObject_API {
        // public Void .ctor(String className,String[] args)
        @cache
        static get __ctor() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", ".ctor", 2, ["System.String","System.String[]"], "void", ["pointer","pointer","pointer"])
        }

        // public Void .ctor(String className,AndroidJavaObject[] args)
        @cache
        static get __ctor_className_args() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", ".ctor", 2, ["System.String","UnityEngine.AndroidJavaObject[]"], "void", ["pointer","pointer","pointer"])
        }

        // public Void .ctor(String className,AndroidJavaClass[] args)
        @cache
        static get __ctor_className_AndroidJavaClass() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", ".ctor", 2, ["System.String","UnityEngine.AndroidJavaClass[]"], "void", ["pointer","pointer","pointer"])
        }

        // public Void .ctor(String className,AndroidJavaRunnable[] args)
        @cache
        static get __ctor_className_AndroidJavaRunnable() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", ".ctor", 2, ["System.String","UnityEngine.AndroidJavaRunnable[]"], "void", ["pointer","pointer","pointer"])
        }

        // public Void .ctor(String className,Object[] args)
        @cache
        static get __ctor_className_Object() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", ".ctor", 2, ["System.String","System.Object[]"], "void", ["pointer","pointer","pointer"])
        }

        // public Void Dispose()
        @cache
        static get _Dispose() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", "Dispose", 0, [], "void", ["pointer"])
        }

        // public Void Call(String methodName,T[] args)
        @cache
        static get _Call() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", "Call", 2, ["System.String","T[]"], "void", ["pointer","pointer","pointer"])
        }

        // public Void Call(String methodName,Object[] args)
        @cache
        static get _Call_methodName_args() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", "Call", 2, ["System.String","System.Object[]"], "void", ["pointer","pointer","pointer"])
        }

        // public Void CallStatic(String methodName,T[] args)
        @cache
        static get _CallStatic() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", "CallStatic", 2, ["System.String","T[]"], "void", ["pointer","pointer","pointer"])
        }

        // public Void CallStatic(String methodName,Object[] args)
        @cache
        static get _CallStatic_methodName_args() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", "CallStatic", 2, ["System.String","System.Object[]"], "void", ["pointer","pointer","pointer"])
        }

        // public FieldType Get(String fieldName)
        @cache
        static get _Get() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", "Get", 1, ["System.String"], "pointer", ["pointer","pointer"])
        }

        // public Void Set(String fieldName,FieldType val)
        @cache
        static get _Set() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", "Set", 2, ["System.String","FieldType"], "void", ["pointer","pointer","pointer"])
        }

        // public FieldType GetStatic(String fieldName)
        @cache
        static get _GetStatic() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", "GetStatic", 1, ["System.String"], "pointer", ["pointer","pointer"])
        }

        // public Void SetStatic(String fieldName,FieldType val)
        @cache
        static get _SetStatic() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", "SetStatic", 2, ["System.String","FieldType"], "void", ["pointer","pointer","pointer"])
        }

        // public IntPtr GetRawObject()
        @cache
        static get _GetRawObject() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", "GetRawObject", 0, [], "pointer", ["pointer"])
        }

        // public IntPtr GetRawClass()
        @cache
        static get _GetRawClass() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", "GetRawClass", 0, [], "pointer", ["pointer"])
        }

        // public AndroidJavaObject CloneReference()
        @cache
        static get _CloneReference() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", "CloneReference", 0, [], "pointer", ["pointer"])
        }

        // // public ReturnType Call(String methodName,T[] args)
        // @cache
        // static get _Call_methodName_args() {
        //         return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", "Call", 2, ["System.String","T[]"], "pointer", ["pointer","pointer","pointer"])
        // }

        // // public ReturnType Call(String methodName,Object[] args)
        // @cache
        // static get _Call_methodName_args() {
        //         return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", "Call", 2, ["System.String","System.Object[]"], "pointer", ["pointer","pointer","pointer"])
        // }

        // // public ReturnType CallStatic(String methodName,T[] args)
        // @cache
        // static get _CallStatic_methodName_args() {
        //         return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", "CallStatic", 2, ["System.String","T[]"], "pointer", ["pointer","pointer","pointer"])
        // }

        // public ReturnType CallStatic(String methodName,Object[] args)
        // @cache
        // static get _CallStatic_methodName_args() {
        //         return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", "CallStatic", 2, ["System.String","System.Object[]"], "pointer", ["pointer","pointer","pointer"])
        // }

        // protected Void DebugPrint(String msg)
        @cache
        static get _DebugPrint() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", "DebugPrint", 1, ["System.String"], "void", ["pointer","pointer"])
        }

        // protected Void DebugPrint(String call,String methodName,String signature,Object[] args)
        @cache
        static get _DebugPrint_call_methodName_signature_args() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", "DebugPrint", 4, ["System.String","System.String","System.String","System.Object[]"], "void", ["pointer","pointer","pointer","pointer","pointer"])
        }

        // private Void _AndroidJavaObject(String className,Object[] args)
        @cache
        static get __AndroidJavaObject() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", "_AndroidJavaObject", 2, ["System.String","System.Object[]"], "void", ["pointer","pointer","pointer"])
        }

        // internal Void .ctor(IntPtr jobject)
        @cache
        static get __ctor_jobject() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", ".ctor", 1, ["System.IntPtr"], "void", ["pointer","pointer"])
        }

        // internal Void .ctor()
        @cache
        static get __ctor_() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", ".ctor", 0, [], "void", ["pointer"])
        }

        // protected override Void Finalize()
        @cache
        static get _Finalize() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", "Finalize", 0, [], "void", ["pointer"])
        }

        // protected virtual Void Dispose(Boolean disposing)
        @cache
        static get _Dispose_disposing() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", "Dispose", 1, ["System.Boolean"], "void", ["pointer","pointer"])
        }

        // protected Void _Call(String methodName,Object[] args)
        @cache
        static get __Call() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", "_Call", 2, ["System.String","System.Object[]"], "void", ["pointer","pointer","pointer"])
        }

        // protected ReturnType _Call(String methodName,Object[] args)
        @cache
        static get __Call_methodName_args() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", "_Call", 2, ["System.String","System.Object[]"], "pointer", ["pointer","pointer","pointer"])
        }

        // protected FieldType _Get(String fieldName)
        @cache
        static get __Get() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", "_Get", 1, ["System.String"], "pointer", ["pointer","pointer"])
        }

        // protected Void _Set(String fieldName,FieldType val)
        @cache
        static get __Set() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", "_Set", 2, ["System.String","FieldType"], "void", ["pointer","pointer","pointer"])
        }

        // protected Void _CallStatic(String methodName,Object[] args)
        @cache
        static get __CallStatic() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", "_CallStatic", 2, ["System.String","System.Object[]"], "void", ["pointer","pointer","pointer"])
        }

        // protected ReturnType _CallStatic(String methodName,Object[] args)
        @cache
        static get __CallStatic_methodName_args() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", "_CallStatic", 2, ["System.String","System.Object[]"], "pointer", ["pointer","pointer","pointer"])
        }

        // protected FieldType _GetStatic(String fieldName)
        @cache
        static get __GetStatic() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", "_GetStatic", 1, ["System.String"], "pointer", ["pointer","pointer"])
        }

        // protected Void _SetStatic(String fieldName,FieldType val)
        @cache
        static get __SetStatic() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", "_SetStatic", 2, ["System.String","FieldType"], "void", ["pointer","pointer","pointer"])
        }

        // internal static AndroidJavaObject AndroidJavaObjectDeleteLocalRef(IntPtr jobject)
        @cache
        static get _AndroidJavaObjectDeleteLocalRef() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", "AndroidJavaObjectDeleteLocalRef", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // internal static AndroidJavaClass AndroidJavaClassDeleteLocalRef(IntPtr jclass)
        @cache
        static get _AndroidJavaClassDeleteLocalRef() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", "AndroidJavaClassDeleteLocalRef", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // internal static ReturnType FromJavaArrayDeleteLocalRef(IntPtr jobject)
        @cache
        static get _FromJavaArrayDeleteLocalRef() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", "FromJavaArrayDeleteLocalRef", 1, ["System.IntPtr"], "pointer", ["pointer"])
        }

        // protected IntPtr _GetRawObject()
        @cache
        static get __GetRawObject() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", "_GetRawObject", 0, [], "pointer", ["pointer"])
        }

        // protected IntPtr _GetRawClass()
        @cache
        static get __GetRawClass() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaObject", "_GetRawClass", 0, [], "pointer", ["pointer"])
        }

}

Il2Cpp.Api.AndroidJavaObject = UnityEngine_AndroidJavaObject_API

declare global {
        namespace Il2Cpp.Api{
                class AndroidJavaObject extends UnityEngine_AndroidJavaObject_API { }
        }
}

export { }