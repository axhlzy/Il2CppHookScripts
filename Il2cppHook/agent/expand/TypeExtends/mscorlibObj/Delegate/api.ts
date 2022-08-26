
import { cache } from "decorator-cache-getter";

class DelegateAPI {

    // Clone() : Object
    @cache
    static get _Clone_0() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.InvokableCallList", "Clone", 0, "pointer", ["pointer"])
    }

    // Combine(Delegate[]) : Delegate
    @cache
    static get _Combine_1() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "Combine", 1, "pointer", ["pointer", "pointer"])
    }

    // Combine(Delegate, Delegate) : Delegate
    @cache
    static get _Combine_2() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "Combine", 2, "pointer", ["pointer", "pointer"])
    }

    // CombineImpl(Delegate) : Delegate
    @cache
    static get _CombineImpl_1() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "CombineImpl", 1, "pointer", ["pointer", "pointer"])
    }

    // CreateDelegate(Type, MethodInfo) : Delegate
    @cache
    static get _CreateDelegate_2() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "CreateDelegate", 2, "pointer", ["pointer", "pointer", "pointer"])
    }

    // CreateDelegate(Type, Object, MethodInfo) : Delegate
    @cache
    static get _CreateDelegate_3() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "CreateDelegate", 3, "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // ......

    // DynamicInvoke(Object[]) : Object
    @cache
    static get _DynamicInvoke() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "DynamicInvoke", 1, "pointer", ["pointer", "pointer"])
    }

    // DynamicInvokeImpl(Object[]) : Object
    @cache
    static get _DynamicInvokeImpl() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "DynamicInvokeImpl", 1, "pointer", ["pointer", "pointer"])
    }

    // Equals(Object) : Boolean
    @cache
    static get _Equals() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "Equals", 1, "bool", ["pointer", "pointer"])
    }

    // GetHashCode() : Int32
    @cache
    static get _GetHashCode() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "GetHashCode", 0, "int", ["pointer"])
    }

    // GetInvocationList() : Delegate[]
    @cache
    static get _GetInvocationList() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "GetInvocationList", 0, "pointer", ["pointer"])
    }

    // GetMethodImpl() : MethodInfo
    @cache
    static get _GetMethodImpl() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "GetMethodImpl", 0, "pointer", ["pointer"])
    }

    // GetObjectData(SerializationInfo, StreamingContext) : Void
    @cache
    static get _GetObjectData() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "GetObjectData", 2, "void", ["pointer", "pointer", "pointer"])
    }

    // GetVirtualMethod_internal() : MethodInfo
    @cache
    static get _GetVirtualMethod_internal() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "GetVirtualMethod_internal", 0, "pointer", ["pointer"])
    }

    // op_Equality(Delegate, Delegate) : Boolean
    @cache
    static get _op_Equality() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "op_Equality", 2, "bool", ["pointer", "pointer"])
    }

    // op_Inequality(Delegate, Delegate) : Boolean
    @cache
    static get _op_Inequality() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "op_Inequality", 2, "bool", ["pointer", "pointer"])
    }

    // Remove(Delegate, Delegate) : Delegate
    @cache
    static get _Remove() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "Remove", 2, "pointer", ["pointer", "pointer", "pointer"])
    }

    // RemoveImpl(Delegate) : Delegate
    @cache
    static get _RemoveImpl() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "RemoveImpl", 1, "pointer", ["pointer", "pointer"])
    }

    // return_type_match(Type, Type) : Boolean
    @cache
    static get _return_type_match() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "return_type_match", 2, "bool", ["pointer", "pointer"])
    }

    // get_Method() : MethodInfo
    @cache
    static get _get_Method() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "get_Method", 0, "pointer", ["pointer"])
    }

    // get_Target() : Object
    @cache
    static get _get_Target() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "get_Target", 0, "pointer", ["pointer"])
    }
}

declare global {
    namespace Il2cpp.Api {
        class Delegate extends DelegateAPI { }
    }
}

Il2cpp.Api.Delegate = DelegateAPI;

export { }