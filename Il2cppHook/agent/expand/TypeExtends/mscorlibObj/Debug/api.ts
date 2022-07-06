import { cache } from "decorator-cache-getter";

class DebugAPI {

    @cache
    static get _cctor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", ".cctor", 0, "pointer", ["pointer"]);
    }

    @cache
    static get Break() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "Break", 0, "void", ["void"]);
    }

    @cache
    static get DrawLine_3() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "DrawLine", 3, "void", ["pointer", "pointer", "pointer"]);
    }

    @cache
    static get DrawLine_4() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "DrawLine", 4, "void", ["pointer", "pointer", "pointer", "float"]);
    }

    @cache
    static get DrawLine_5() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "DrawLine", 5, "void", ["pointer", "pointer", "pointer", "float", "bool"]);
    }

    @cache
    static get DrawRay_3() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "DrawRay", 3, "void", ["pointer", "pointer", "float"]);
    }

    @cache
    static get DrawRay_4() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "DrawRay", 4, "void", ["pointer", "pointer", "float", "bool"]);
    }

    @cache
    static get Log_1() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "Log", 1, "void", ["pointer"]);
    }

    @cache
    static get Log_2() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "Log", 2, "void", ["pointer", "pointer"]);
    }

    @cache
    static get LogAssertion_1() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "LogAssertion", 1, "void", ["pointer"]);
    }

    @cache
    static get LogError_1() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "LogError", 1, "void", ["pointer"]);
    }

    @cache
    static get LogError_2() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "LogError", 2, "void", ["pointer", "pointer"]);
    }

    @cache
    static get LogErrorFormat_2() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "LogErrorFormat", 2, "void", ["pointer", "pointer"]);
    }

    @cache
    static get LogException_1() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "LogException", 1, "void", ["pointer"]);
    }

    @cache
    static get LogException_2() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "LogException", 2, "void", ["pointer", "pointer"]);
    }

    @cache
    static get LogFormat_2() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "LogFormat", 2, "void", ["pointer", "pointer"]);
    }

    @cache
    static get LogWarning_1() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "LogWarning", 1, "void", ["pointer"]);
    }

    @cache
    static get LogWarning_2() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "LogWarning", 2, "void", ["pointer", "pointer"]);
    }

    @cache
    static get LogWarningFormat_2() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "LogWarningFormat", 2, "void", ["pointer", "pointer"]);
    }

    @cache
    static get get_isDebugBuild() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "get_isDebugBuild", 0, "bool", ["void"]);
    }

    @cache
    static get get_unityLogger() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "get_unityLogger", 0, "pointer", ["void"]);
    }

}

declare global {
    namespace Il2Cpp.Api {
        class Debug extends DebugAPI { }
    }
}

Il2Cpp.Api.Debug = DebugAPI;

export { }