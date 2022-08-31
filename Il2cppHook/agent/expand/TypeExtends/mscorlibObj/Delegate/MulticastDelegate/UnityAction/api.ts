import { cache } from "decorator-cache-getter"

class UnityEngine_Events_UnityAction_API {
    // public Void .ctor(Object object,IntPtr method)
    @cache
    static get __ctor() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Events.UnityAction", ".ctor", 2, ["System.Object", "System.IntPtr"], "void", ["pointer", "pointer", "pointer"])
    }

    // public virtual Void Invoke()
    @cache
    static get _Invoke() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Events.UnityAction", "Invoke", 0, [], "void", ["pointer"])
    }

    // public virtual IAsyncResult BeginInvoke(AsyncCallback callback,Object object)
    @cache
    static get _BeginInvoke() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Events.UnityAction", "BeginInvoke", 2, ["System.AsyncCallback", "System.Object"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // public virtual Void EndInvoke(IAsyncResult result)
    @cache
    static get _EndInvoke() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Events.UnityAction", "EndInvoke", 1, ["System.IAsyncResult"], "void", ["pointer", "pointer"])
    }

}

Il2Cpp.Api.UnityAction = UnityEngine_Events_UnityAction_API

declare global {
    namespace Il2Cpp.Api {
        class UnityAction extends UnityEngine_Events_UnityAction_API { }
    }
}

export { }