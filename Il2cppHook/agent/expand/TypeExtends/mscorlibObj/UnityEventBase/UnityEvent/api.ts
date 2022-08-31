import { cache } from "decorator-cache-getter"

class UnityEngine_Events_UnityEvent_API {
    // public Void .ctor()
    @cache
    static get __ctor() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Events.UnityEvent", ".ctor", 0, [], "void", ["pointer"])
    }

    // public Void AddListener(UnityAction call)
    @cache
    static get _AddListener() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Events.UnityEvent", "AddListener", 1, ["UnityEngine.Events.UnityAction"], "void", ["pointer", "pointer"])
    }

    // public Void RemoveListener(UnityAction call)
    @cache
    static get _RemoveListener() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Events.UnityEvent", "RemoveListener", 1, ["UnityEngine.Events.UnityAction"], "void", ["pointer", "pointer"])
    }

    // protected override MethodInfo FindMethod_Impl(String name,Object targetObj)
    @cache
    static get _FindMethod_Impl() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Events.UnityEvent", "FindMethod_Impl", 2, ["System.String", "System.Object"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // internal override BaseInvokableCall GetDelegate(Object target,MethodInfo theFunction)
    @cache
    static get _GetDelegate() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Events.UnityEvent", "GetDelegate", 2, ["System.Object", "System.Reflection.MethodInfo"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // private static BaseInvokableCall GetDelegate(UnityAction action)
    @cache
    static get _GetDelegate_action() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Events.UnityEvent", "GetDelegate", 1, ["UnityEngine.Events.UnityAction"], "pointer", ["pointer"])
    }

    // public Void Invoke()
    @cache
    static get _Invoke() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Events.UnityEvent", "Invoke", 0, [], "void", ["pointer"])
    }

}

Il2Cpp.Api.UnityEvent = UnityEngine_Events_UnityEvent_API

declare global {
    namespace Il2Cpp.Api {
        class UnityEvent extends UnityEngine_Events_UnityEvent_API { }
    }
}

export { }