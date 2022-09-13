import { cache } from "decorator-cache-getter"

class ApplicationApi {

    // CallLogCallback(String, String, LogType, Boolean) : Void
    @cache
    static get _CallLogCallback() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "CallLogCallback", 4, "void", [
            "pointer", "pointer", "pointer", "bool"
        ])
    }

    // CallLowMemory() : Void
    @cache
    static get _CallLowMemory() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "CallLowMemory", 0, "void", [])
    }

    // GetStackTraceLogType(LogType) : StackTraceLogType
    @cache
    static get _GetStackTraceLogType() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "GetStackTraceLogType", 0, "pointer", [])
    }

    // LoadLevel(String) : Void
    @cache
    static get _LoadLevel() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "LoadLevel", 1, "void", ["pointer"])
    }

    // OpenURL(String) : Void
    @cache
    static get _OpenURL() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "OpenURL", 1, "void", ["pointer"])
    }

    // Quit() : Void
    @cache
    static get _Quit() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "Quit", 0, "void", [])
    }

    // RegisterLogCallback(LogCallback) : Void
    @cache
    static get _RegisterLogCallback() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "RegisterLogCallback", 1, "void", ["pointer"])
    }

    // get_cloudProjectId() : String
    @cache
    static get _get_cloudProjectId() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_cloudProjectId", 0, "pointer", [])
    }

    // get_dataPath() : String
    @cache
    static get _get_dataPath() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_dataPath", 0, "pointer", [])
    }

    // get_identifier() : String
    @cache
    static get _get_identifier() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_identifier", 0, "pointer", [])
    }

    // get_internetReachability() : NetworkReachability
    @cache
    static get _get_internetReachability() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_internetReachability", 0, "pointer", [])
    }

    // get_isEditor() : Boolean
    @cache
    static get _get_isEditor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_isEditor", 0, "bool", [])
    }

    // get_isMobilePlatform() : Boolean
    @cache
    static get _get_isMobilePlatform() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_isMobilePlatform", 0, "bool", [])
    }

    // get_isPlaying() : Boolean
    @cache
    static get _get_isPlaying() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_isPlaying", 0, "bool", [])
    }

    // get_persistentDataPath() : String
    @cache
    static get _get_persistentDataPath() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_persistentDataPath", 0, "pointer", [])
    }

    // get_temporaryCachePath: String
    @cache
    static get _get_temporaryCachePath() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_temporaryCachePath", 0, "pointer", [])
    }

    // public static String get_version()
    @cache
    static get _get_version() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_version", 0, "pointer", [])
    }

    // public static String get_productName()
    @cache
    static get _get_productName() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_productName", 0, "pointer", [])
    }

    // get_platform() : RuntimePlatform
    @cache
    static get _get_platform() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_platform", 0, "pointer", [])
    }

    // set_runInBackground(Boolean) : Void
    @cache
    static get _set_runInBackground() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "set_runInBackground", 1, "void", ["bool"])
    }

    // get_streamingAssetsPath() : String
    @cache
    static get _get_streamingAssetsPath() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_streamingAssetsPath", 0, "pointer", [])
    }

    // set_targetFrameRate(Int32) : Void
    @cache
    static get _set_targetFrameRate() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "set_targetFrameRate", 1, "void", ["int32"])
    }

    // get_unityVersion() : String
    @cache
    static get _get_unityVersion() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_unityVersion", 0, "pointer", [])
    }

    // add_logMessageReceived(LogCallback) : Void
    @cache
    static get _add_logMessageReceived() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "add_logMessageReceived", 1, "void", ["pointer"])
    }

    // SetLogCallbackDefined(Boolean defined)
    @cache
    static get _SetLogCallbackDefined() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "SetLogCallbackDefined", 1, "void", ["bool"])
    }

    // public static SystemLanguage get_systemLanguage()
    @cache
    static get _get_systemLanguage() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_systemLanguage", 0, "pointer", [])
    }

    // private static Boolean Internal_ApplicationWantsToQuit()
    @cache
    static get _Internal_ApplicationWantsToQuit() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "Internal_ApplicationWantsToQuit", 0, "bool", [])
    }

    // private static Void Internal_ApplicationQuit()
    @cache
    static get _Internal_ApplicationQuit() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "Internal_ApplicationQuit", 0, "void", [])
    }

    // private static Void Internal_ApplicationUnload()
    @cache
    static get _Internal_ApplicationUnload() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "Internal_ApplicationUnload", 0, "void", [])
    }

    // internal static Void InvokeOnBeforeRender()
    @cache
    static get _InvokeOnBeforeRender() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "InvokeOnBeforeRender", 0, "void", [])
    }

    // internal static Void InvokeFocusChanged(Boolean focus)
    @cache
    static get _InvokeFocusChanged() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "InvokeFocusChanged", 0, "void", ["bool"])
    }

    // internal static Void InvokeDeepLinkActivated(String url)
    @cache
    static get _InvokeDeepLinkActivated() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "InvokeDeepLinkActivated", 1, "void", ["pointer"])
    }

    // public static String get_companyName()
    @cache
    static get _get_companyName() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_companyName", 0, "pointer", [])
    }

    // remove_logMessageReceived(LogCallback) : Void
    @cache
    static get _remove_logMessageReceived() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "remove_logMessageReceived", 1, "void", ["pointer"])
    }

    // add_logMessageReceivedThreaded(LogCallback) : Void
    @cache
    static get _add_logMessageReceivedThreaded() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "add_logMessageReceivedThreaded", 1, "void", ["pointer"])
    }

    // remove_logMessageReceivedThreaded(LogCallback) : Void
    @cache
    static get _remove_logMessageReceivedThreaded() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "remove_logMessageReceivedThreaded", 1, "void", ["pointer"])
    }

    // public static Void Quit()
    @cache
    static get _Quit_() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Application", "Quit", 0, [], "void", [])
    }

    // public static Boolean get_isFocused()
    @cache
    static get _get_isFocused() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Application", "get_isFocused", 0, [], "pointer", [])
    }

    // public static Boolean get_isBatchMode()
    @cache
    static get _get_isBatchMode() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Application", "get_isBatchMode", 0, [], "pointer", [])
    }
}

declare global {
    namespace Il2Cpp.Api {
        class Application extends ApplicationApi { }
    }
}

Il2Cpp.Api.Application = ApplicationApi;

export { }