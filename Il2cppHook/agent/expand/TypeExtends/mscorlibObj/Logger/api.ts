import { cache } from "decorator-cache-getter";

class LoggerAPI {

    @cache
    static get _cctor() {
        // .ctor(ILogHandler)
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", ".cctor", 1, "pointer", ["pointer", "pointer"]);
    }

    @cache
    static get IsLogTypeAllowed() {
        // IsLogTypeAllowed(LogType) : Boolean
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "IsLogTypeAllowed", 1, "bool", ["pointer", "int"]);
    }

    @cache
    static get Log_string_object() {
        // Log(String, Object) : Void
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "Log", 2, "void", ["pointer", "pointer", "pointer"]);
    }

    @cache
    static get Log_logType_object() {
        // Log(LogType, Object) : Void
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "Log", 2, "void", ["pointer", "int", "pointer"]);
    }

    @cache
    static get Log_logType_object_object() {
        // Log(LogType, Object, Object) : Void
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "Log", 3, "void", ["pointer", "int", "pointer", "pointer"]);
    }

    @cache
    static get LogError_string_object() {
        // LogError(String, Object) : Void
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "LogError", 2, "void", ["pointer", "pointer", "pointer"]);
    }

    @cache
    static get LogException_exception() {
        // LogException(Exception) : Void
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "LogException", 1, "void", ["pointer", "pointer"]);
    }

    @cache
    static get LogException_exception_object() {
        // LogException(Exception, Object) : Void
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "LogException", 2, "void", ["pointer", "pointer", "pointer"]);
    }

    @cache
    static get LogFormat_logType_string_object() {
        // LogFormat(LogType, String, Object[]) : Void
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "LogFormat", 3, "void", ["pointer", "int", "pointer", "pointer"]);
    }

    @cache
    static get LogFormat_logType_object_string_object() {
        // LogFormat(LogType, Object, String, Object[]) : Void
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "LogFormat", 4, "void", ["pointer", "int", "pointer", "pointer", "pointer"]);
    }

    @cache
    static get LogWarning_string_object() {
        // LogWarning(String, Object) : Void
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "LogWarning", 2, "void", ["pointer", "pointer", "pointer"]);
    }

    @cache
    static get set_filterLogType() {
        // set_filterLogType(LogType) : Void
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "set_filterLogType", 1, "void", ["pointer", "int"]);
    }

    @cache
    static get get_filterLogType() {
        // get_filterLogType() : LogType
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "get_filterLogType", 0, "int", ["pointer"]);
    }

    @cache
    static get set_logEnabled() {
        // set_logEnabled(Boolean) : Void
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "set_logEnabled", 1, "void", ["pointer", "bool"]);
    }

    @cache
    static get get_logEnabled() {
        // get_logEnabled() : Boolean
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "get_logEnabled", 0, "bool", ["pointer"]);
    }

    @cache
    static get set_logHandler() {
        // set_logHandler(ILogHandler) : Void
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "set_logHandler", 1, "void", ["pointer", "pointer"]);
    }

    @cache
    static get get_logHandler() {
        // get_logHandler() : ILogHandler
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "get_logHandler", 0, "pointer", ["pointer"]);
    }

}

declare global {
    namespace Il2Cpp.Api {
        class Logger extends LoggerAPI { }
    }
}

Il2Cpp.Api.Logger = LoggerAPI;

export { }