import { cache } from "decorator-cache-getter"

class UnityEngine_Debug_API {
    // public static ILogger get_unityLogger()
    @cache
    static get _get_unityLogger() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "get_unityLogger", 0, "pointer", [])
    }

    // public static Void DrawLine(Vector3 start,Vector3 end,Color color,Single duration,Boolean depthTest)
    @cache
    static get _DrawLine() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "DrawLine", 5, "void", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public static Void DrawRay(Vector3 start,Vector3 dir,Color color)
    @cache
    static get _DrawRay() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "DrawRay", 3, "void", ["pointer", "pointer", "pointer"])
    }

    // public static Void DrawRay(Vector3 start,Vector3 dir,Color color,Single duration,Boolean depthTest)
    @cache
    static get _DrawRay_start_dir_color_duration_depthTest() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Debug", "DrawRay", 5, ["UnityEngine.Vector3", "UnityEngine.Vector3", "UnityEngine.Color", "System.Single", "System.Boolean"], "void", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public static Void Log(Object message)
    @cache
    static get _Log() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Debug", "Log", 1, ["System.Object"], "void", ["pointer"])
    }

    // public static Void Log(Object message,Object context)
    @cache
    static get _Log_message_context() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Debug", "Log", 2, ["System.Object", "UnityEngine.Object"], "void", ["pointer", "pointer"])
    }

    // public static Void LogError(Object message)
    @cache
    static get _LogError() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "LogError", 1, "void", ["pointer"])
    }

    // public static Void LogError(Object message,Object context)
    @cache
    static get _LogError_message_context() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Debug", "LogError", 2, ["System.Object", "UnityEngine.Object"], "void", ["pointer", "pointer"])
    }

    // public static Void LogErrorFormat(String format,Object[] args)
    @cache
    static get _LogErrorFormat() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Debug", "LogErrorFormat", 2, ["System.String", "System.Object[]"], "void", ["pointer", "pointer"])
    }

    // public static Void LogErrorFormat(Object context,String format,Object[] args)
    @cache
    static get _LogErrorFormat_context_format_args() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Debug", "LogErrorFormat", 3, ["UnityEngine.Object", "System.String", "System.Object[]"], "void", ["pointer", "pointer", "pointer"])
    }

    // public static Void LogException(Exception exception)
    @cache
    static get _LogException() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Debug", "LogException", 1, ["System.Exception"], "void", ["pointer"])
    }

    // public static Void LogException(Exception exception,Object context)
    @cache
    static get _LogException_exception_context() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Debug", "LogException", 2, ["System.Exception", "UnityEngine.Object"], "void", ["pointer", "pointer"])
    }

    // public static Void LogWarning(Object message)
    @cache
    static get _LogWarning() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Debug", "LogWarning", 1, ["System.Object"], "void", ["pointer"])
    }

    // public static Void LogWarning(Object message,Object context)
    @cache
    static get _LogWarning_message_context() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Debug", "LogWarning", 2, ["System.Object", "UnityEngine.Object"], "void", ["pointer", "pointer"])
    }

    // public static Void LogWarningFormat(String format,Object[] args)
    @cache
    static get _LogWarningFormat() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Debug", "LogWarningFormat", 2, ["System.String", "System.Object[]"], "void", ["pointer", "pointer"])
    }

    // public static Void LogWarningFormat(Object context,String format,Object[] args)
    @cache
    static get _LogWarningFormat_context_format_args() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Debug", "LogWarningFormat", 3, ["UnityEngine.Object", "System.String", "System.Object[]"], "void", ["pointer", "pointer", "pointer"])
    }

    // internal static Boolean CallOverridenDebugHandler(Exception exception,Object obj)
    @cache
    static get _CallOverridenDebugHandler() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "CallOverridenDebugHandler", 2, "pointer", ["pointer", "pointer"])
    }

    // private static Void .cctor()
    @cache
    static get __cctor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", ".cctor", 0, "void", [])
    }

    // private static Void DrawLine_Injected(Vector3& start,Vector3& end,Color& color,Single duration,Boolean depthTest)
    @cache
    static get _DrawLine_Injected() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "DrawLine_Injected", 5, "void", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

}

Il2Cpp.Api.Debug = UnityEngine_Debug_API

declare global {
    namespace Il2Cpp.Api {
        class Debug extends UnityEngine_Debug_API { }
    }
}

export { }