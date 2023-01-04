import { cache } from "decorator-cache-getter"

class UnityEngine_Coroutine_API {
        // private Void .ctor()
        @cache
        static get __ctor() {
                return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Coroutine", ".ctor", 0, [], "void", ["pointer"])
        }

        // protected override Void Finalize()
        @cache
        static get _Finalize() {
                return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Coroutine", "Finalize", 0, [], "void", ["pointer"])
        }

        // private static Void ReleaseCoroutine(IntPtr ptr)
        @cache
        static get _ReleaseCoroutine() {
                return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Coroutine", "ReleaseCoroutine", 1, ["System.IntPtr"], "void", ["pointer"])
        }

}

Il2Cpp.Api.Coroutine = UnityEngine_Coroutine_API

declare global {
        namespace Il2Cpp.Api{
                class Coroutine extends UnityEngine_Coroutine_API { }
        }
}

export { }