import { cache } from "decorator-cache-getter"

class UnityEngine_AndroidJavaClass_API {
        // public Void .ctor(String className)
        @cache
        static get __ctor() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaClass", ".ctor", 1, ["System.String"], "void", ["pointer", "pointer"])
        }

        // private Void _AndroidJavaClass(String className)
        @cache
        static get __AndroidJavaClass() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaClass", "_AndroidJavaClass", 1, ["System.String"], "void", ["pointer", "pointer"])
        }

        // internal Void .ctor(IntPtr jclass)
        @cache
        static get __ctor_jclass() {
                return Il2Cpp.Api.o("UnityEngine.AndroidJNIModule", "UnityEngine.AndroidJavaClass", ".ctor", 1, ["System.IntPtr"], "void", ["pointer", "pointer"])
        }

}

Il2Cpp.Api.AndroidJavaClass = UnityEngine_AndroidJavaClass_API

declare global {
        namespace Il2Cpp.Api {
                class AndroidJavaClass extends UnityEngine_AndroidJavaClass_API { }
        }
}

export { }