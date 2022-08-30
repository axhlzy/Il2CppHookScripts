import { cache } from "decorator-cache-getter"

class UnityEngine_AsyncOperation_API {
    // private static Void InternalDestroy(IntPtr ptr)
    @cache
    static get _InternalDestroy() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.AsyncOperation", "InternalDestroy", 1, "void", ["pointer"])
    }

    // public Boolean get_isDone()
    @cache
    static get _get_isDone() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.AsyncOperation", "get_isDone", 0, "pointer", ["pointer"])
    }

    // public Single get_progress()
    @cache
    static get _get_progress() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.AsyncOperation", "get_progress", 0, "pointer", ["pointer"])
    }

    // public Void set_allowSceneActivation(Boolean value)
    @cache
    static get _set_allowSceneActivation() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.AsyncOperation", "set_allowSceneActivation", 1, "void", ["pointer", "pointer"])
    }

    // protected override Void Finalize()
    @cache
    static get _Finalize() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.AsyncOperation", "Finalize", 0, "void", ["pointer"])
    }

    // internal Void InvokeCompletionEvent()
    @cache
    static get _InvokeCompletionEvent() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.AsyncOperation", "InvokeCompletionEvent", 0, "void", ["pointer"])
    }

    // public Void .ctor()
    @cache
    static get __ctor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.AsyncOperation", ".ctor", 0, "void", ["pointer"])
    }

}

Il2Cpp.Api.AsyncOperation = UnityEngine_AsyncOperation_API

declare global {
    namespace Il2Cpp.Api {
        class AsyncOperation extends UnityEngine_AsyncOperation_API { }
    }
}

export { }