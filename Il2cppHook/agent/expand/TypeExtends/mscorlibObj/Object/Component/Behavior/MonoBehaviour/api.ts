import { cache } from "decorator-cache-getter"
import "./interface"

class MonoBehaviourAPI {

    @cache
    static get _ctor() {
        // .ctor()
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", ".ctor", 0, "pointer", ["pointer"]);
    }

    @cache
    static get _CancelInvoke() {
        // CancelInvoke() : Void
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "CancelInvoke", 0, "void", ["pointer"]);
    }

    @cache
    static get _CancelInvoke_String() {
        // CancelInvoke(String) : Void
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "CancelInvoke", 1, "void", ["pointer", "pointer"]);
    }

    @cache
    static get _InvokeRepeating() {
        // InvokeRepeating(String, Single, Single) : Void
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "InvokeRepeating", 3, "void", ["pointer", "float", "float", "float"]);
    }

    @cache
    static get _Invoke() {
        // Invoke(String, Single) : Void
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "Invoke", 2, "void", ["pointer", "float", "float"]);
    }

    @cache
    static get _IsInvoking_String() {
        // IsInvoking(String) : Boolean
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "IsInvoking", 1, "bool", ["pointer", "pointer"]);
    }

    @cache
    static get _IsInvoking_0() {
        // IsInvoking() : Boolean
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "IsInvoking", 0, "bool", ["pointer"]);
    }

    @cache
    static get _print() {
        // print(Object) : Void
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "print", 1, "void", ["pointer", "pointer"]);
    }

    @cache
    static get _StartCoroutine_IEnumerator() {
        // StartCoroutine(IEnumerator) : Coroutine
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "StartCoroutine", 1, ["System.Collections.IEnumerator"], "pointer", ["pointer", "pointer"]);
    }

    @cache
    static get _StartCoroutine_String() {
        // StartCoroutine(String) : Coroutine
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "StartCoroutine", 1, ["System.String"], "pointer", ["pointer", "pointer"]);
    }

    @cache
    static get _StartCoroutine_String_Object() {
        // StartCoroutine(String, Object) : Coroutine
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "StartCoroutine", 2, ["System.String", "System.Object"], "pointer", ["pointer", "pointer", "pointer"]);
    }

    @cache
    static get _StartCoroutine_Auto() {
        // StartCoroutine_Auto(IEnumerator) : Coroutine
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "StartCoroutine_Auto", 1, ["System.Collections.IEnumerator"], "pointer", ["pointer", "pointer"]);
    }

    @cache
    static get _StopAllCoroutines() {
        // StopAllCoroutines() : Void
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "StopAllCoroutines", 0, "void", ["pointer"]);
    }

    @cache
    static get _StopCoroutine_Coroutine() {
        // StopCoroutine(Coroutine) : Void
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "StopCoroutine", 1, ["System.Collections.IEnumerator"], "void", ["pointer", "pointer"]);
    }

    @cache
    static get _StopCoroutine_String() {
        // StopCoroutine(String) : Void
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "StopCoroutine", 1, ["System.String"], "void", ["pointer", "pointer"]);
    }

    @cache
    static get _StopCoroutine_IEnumerator() {
        // StopCoroutine(IEnumerator) : Void
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "StopCoroutine", 1, ["System.Collections.IEnumerator"], "void", ["pointer", "pointer"]);
    }

    @cache
    static get _set_useGUILayout() {
        // set_useGUILayout(Boolean) : Void
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "set_useGUILayout", 1, "void", ["pointer", "bool"]);
    }

    @cache
    static get _get_useGUILayout() {
        // get_useGUILayout() : Boolean
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "get_useGUILayout", 0, "bool", ["pointer"]);
    }
}

declare global {
    namespace Il2Cpp.Api {
        class MonoBehaviour extends MonoBehaviourAPI { }
    }
}

Il2Cpp.Api.MonoBehaviour = MonoBehaviourAPI;

export { }