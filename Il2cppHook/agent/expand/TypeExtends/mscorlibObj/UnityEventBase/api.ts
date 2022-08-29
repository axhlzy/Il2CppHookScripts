
import { cache } from "decorator-cache-getter";

class UnityEventBaseAPI {
    @cache
    static get _ctor_0() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", ".ctor", 0, "pointer", ["pointer"]);
    }

    // AddCall(BaseInvokableCall) : Void
    @cache
    static get _AddCall() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "AddCall", 1, "pointer", ["pointer", "pointer"]);
    }

    // DirtyPersistentCalls() : Void
    @cache
    static get _DirtyPersistentCalls() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "DirtyPersistentCalls", 0, "void", ["pointer"]);
    }

    // FindMethod(PersistentCall) : MethodInfo
    @cache
    static get _FindMethod() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "FindMethod", 1, "pointer", ["pointer", "pointer"]);
    }

    // FindMethod(String, Object, PersistentListenerMode, Type) : MethodInfo
    @cache
    static get _FindMethod_2() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "FindMethod", 4, "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer"]);
    }

    // GetValidMethodInfo(Object, String, Type[]) : MethodInfo
    @cache
    static get _GetValidMethodInfo() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "GetValidMethodInfo", 3, "pointer", ["pointer", "pointer", "pointer", "pointer"]);
    }

    // PrepareInvoke() : List<BaseInvokableCall>
    @cache
    static get _PrepareInvoke() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "PrepareInvoke", 0, "pointer", ["pointer"]);
    }

    // RebuildPersistentCallsIfNeeded() : Void
    @cache
    static get _RebuildPersistentCallsIfNeeded() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "RebuildPersistentCallsIfNeeded", 0, "void", ["pointer"]);
    }

    // RemoveListener(Object, MethodInfo) : Void
    @cache
    static get _RemoveListener() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "RemoveListener", 2, "void", ["pointer", "pointer", "pointer"]);
    }

    // ToString() : String
    @cache
    static get _ToString() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "ToString", 0, "pointer", ['pointer']);
    }
}

declare global {
    namespace mscorlib.Api {
        class UnityEventBase extends UnityEventBaseAPI { }
    }
}

mscorlib.Api.UnityEventBase = UnityEventBaseAPI;

export { }