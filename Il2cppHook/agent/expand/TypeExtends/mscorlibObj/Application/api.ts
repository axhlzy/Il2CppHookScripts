import { cache } from "decorator-cache-getter"

class ApplicationApi {

    // CallLogCallback(String, String, LogType, Boolean) : Void
    @cache
    static get _CallLogCallback() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "CallLogCallback", 4, "void", [
            "pointer", "pointer", "pointer", "pointer", "bool"
        ])
    }

    // CallLowMemory() : Void
    @cache
    static get _CallLowMemory() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "CallLowMemory", 0, "void", ["pointer"])
    }

    // GetStackTraceLogType(LogType) : StackTraceLogType
    @cache
    static get _GetStackTraceLogType() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "GetStackTraceLogType", 0, "pointer", ["pointer"])
    }

    // LoadLevel(String) : Void
    @cache
    static get _LoadLevel() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "LoadLevel", 1, "void", ["pointer", "pointer"])
    }

    // OpenURL(String) : Void
    @cache
    static get _OpenURL() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "OpenURL", 1, "void", ["pointer", "pointer"])
    }

    // Quit() : Void
    @cache
    static get _Quit() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "Quit", 0, "void", ["pointer"])
    }

    // Quit(Int32) : Void
    @cache
    static get _Quit_1() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "Quit", 1, "void", ["pointer", "int32"])
    }

    // RegisterLogCallback(LogCallback) : Void
    @cache
    static get _RegisterLogCallback() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "RegisterLogCallback", 1, "void", ["pointer", "pointer"])
    }

    // get_cloudProjectId() : String
    @cache
    static get _get_cloudProjectId() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_cloudProjectId", 0, "pointer", ["pointer"])
    }

    // get_dataPath() : String
    @cache
    static get _get_dataPath() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_dataPath", 0, "pointer", ["pointer"])
    }

    // get_identifier() : String
    @cache
    static get _get_identifier() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_identifier", 0, "pointer", ["pointer"])
    }

    // get_internetReachability() : NetworkReachability
    @cache
    static get _get_internetReachability() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_internetReachability", 0, "pointer", ["pointer"])
    }

    // get_isEditor() : Boolean
    @cache
    static get _get_isEditor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_isEditor", 0, "bool", ["pointer"])
    }

    // get_isMobilePlatform() : Boolean
    @cache
    static get _get_isMobilePlatform() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_isMobilePlatform", 0, "bool", ["pointer"])
    }

    // get_isPlaying() : Boolean
    @cache
    static get _get_isPlaying() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_isPlaying", 0, "bool", ["pointer"])
    }

    // get_persistentDataPath() : String
    @cache
    static get _get_persistentDataPath() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_persistentDataPath", 0, "pointer", ["pointer"])
    }

    // get_platform() : RuntimePlatform
    @cache
    static get _get_platform() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_platform", 0, "pointer", ["pointer"])
    }

    // set_runInBackground(Boolean) : Void
    @cache
    static get _set_runInBackground() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "set_runInBackground", 1, "void", ["pointer", "bool"])
    }

    // get_streamingAssetsPath() : String
    @cache
    static get _get_streamingAssetsPath() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_streamingAssetsPath", 0, "pointer", ["pointer"])
    }

    // set_targetFrameRate(Int32) : Void
    @cache
    static get _set_targetFrameRate() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "set_targetFrameRate", 1, "void", ["pointer", "int32"])
    }

    // get_unityVersion() : String
    @cache
    static get _get_unityVersion() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_unityVersion", 0, "pointer", ["pointer"])
    }

    // add_logMessageReceived(LogCallback) : Void
    @cache
    static get _add_logMessageReceived() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "add_logMessageReceived", 1, "void", ["pointer", "pointer"])
    }

    // remove_logMessageReceived(LogCallback) : Void
    @cache
    static get _remove_logMessageReceived() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "remove_logMessageReceived", 1, "void", ["pointer", "pointer"])
    }

    // add_logMessageReceivedThreaded(LogCallback) : Void
    @cache
    static get _add_logMessageReceivedThreaded() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "add_logMessageReceivedThreaded", 1, "void", ["pointer", "pointer"])
    }

    // remove_logMessageReceivedThreaded(LogCallback) : Void
    @cache
    static get _remove_logMessageReceivedThreaded() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "remove_logMessageReceivedThreaded", 1, "void", ["pointer", "pointer"])
    }
}

declare global {
    namespace Il2Cpp.Api {
        class Application extends ApplicationApi { }
    }
}

Il2Cpp.Api.Application = ApplicationApi;

export { }