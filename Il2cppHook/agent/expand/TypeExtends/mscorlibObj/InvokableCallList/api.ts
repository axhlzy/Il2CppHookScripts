
import { cache } from "decorator-cache-getter";

class InvokableCallListAPI {

    @cache
    static get _ctor_0() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.InvokableCallList", ".ctor", 0, "pointer", ["pointer"]);
    }

    // AddListener(BaseInvokableCall) : Void
    @cache
    static get _AddListener() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.InvokableCallList", "AddListener", 1, "void", ["pointer", "pointer"]);
    }

    // AddPersistentInvokableCall(BaseInvokableCall) : Void
    @cache
    static get _AddPersistentInvokableCall() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.InvokableCallList", "AddPersistentInvokableCall", 1, "void", ["pointer", "pointer"]);
    }

    // ClearPersistent() : Void
    @cache
    static get _ClearPersistent() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.InvokableCallList", "ClearPersistent", 0, "void", []);
    }

    // PrepareInvoke() : List<BaseInvokableCall>
    @cache
    static get _PrepareInvoke() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.InvokableCallList", "PrepareInvoke", 0, "pointer", []);
    }

    // RemoveListener(Object, MethodInfo) : Void
    @cache
    static get _RemoveListener() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.InvokableCallList", "RemoveListener", 2, "void", ["pointer", "pointer", "pointer"]);
    }
}

declare global {
    namespace mscorlib.Api {
        class InvokableCallList extends InvokableCallListAPI { }
    }
}

mscorlib.Api.InvokableCallList = InvokableCallListAPI;

export { }