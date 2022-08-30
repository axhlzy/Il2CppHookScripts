import { cache } from "decorator-cache-getter"

class UnityEngine_Logger_API {
    // public Void .ctor(ILogHandler logHandler)
    @cache
    static get __ctor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", ".ctor", 1, "void", ["pointer", "pointer"])
    }

    // public ILogHandler get_logHandler()
    @cache
    static get _get_logHandler() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "get_logHandler", 0, "pointer", ["pointer"])
    }

    // public Void set_logHandler(ILogHandler value)
    @cache
    static get _set_logHandler() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "set_logHandler", 1, "void", ["pointer", "pointer"])
    }

    // public Boolean get_logEnabled()
    @cache
    static get _get_logEnabled() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "get_logEnabled", 0, "pointer", ["pointer"])
    }

    // public Void set_logEnabled(Boolean value)
    @cache
    static get _set_logEnabled() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "set_logEnabled", 1, "void", ["pointer", "pointer"])
    }

    // public LogType get_filterLogType()
    @cache
    static get _get_filterLogType() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "get_filterLogType", 0, "pointer", ["pointer"])
    }

    // public Void set_filterLogType(LogType value)
    @cache
    static get _set_filterLogType() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "set_filterLogType", 1, "void", ["pointer", "pointer"])
    }

    // public Boolean IsLogTypeAllowed(LogType logType)
    @cache
    static get _IsLogTypeAllowed() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "IsLogTypeAllowed", 1, "pointer", ["pointer", "pointer"])
    }

    // private static String GetString(Object message)
    @cache
    static get _GetString() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "GetString", 1, "pointer", ["pointer"])
    }

    // public Void Log(LogType logType,Object message)
    @cache
    static get _Log() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "Log", 2, "void", ["pointer", "pointer", "pointer"])
    }

    // public Void Log(LogType logType,Object message,Object context)
    @cache
    static get _Log_logType_message_context() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Logger", "Log", 3, ["UnityEngine.LogType", "System.Object", "UnityEngine.Object"], "void", ["pointer", "pointer", "pointer", "pointer"])
    }

    // public Void LogFormat(LogType logType,String format,Object[] args)
    @cache
    static get _LogFormat() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "LogFormat", 3, "void", ["pointer", "pointer", "pointer", "pointer"])
    }

    // public Void LogFormat(LogType logType,Object context,String format,Object[] args)
    @cache
    static get _LogFormat_logType_context_format_args() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Logger", "LogFormat", 4, ["UnityEngine.LogType", "UnityEngine.Object", "System.String", "System.Object[]"], "void", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public Void LogException(Exception exception,Object context)
    @cache
    static get _LogException() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "LogException", 2, "void", ["pointer", "pointer", "pointer"])
    }

}

Il2Cpp.Api.Logger = UnityEngine_Logger_API

declare global {
    namespace Il2Cpp.Api {
        class Logger extends UnityEngine_Logger_API { }
    }
}

export { }