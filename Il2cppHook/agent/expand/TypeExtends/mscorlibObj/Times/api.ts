import { cache } from "decorator-cache-getter"

class UnityEngine_Time_API {

    @cache
    static get _get_time() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Time", "get_time", 0, "float", [])
    }

    @cache
    static get _get_deltaTime() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Time", "get_deltaTime", 0, "float", [])
    }

    @cache
    static get _get_unscaledTime() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Time", "get_unscaledTime", 0, "float", [])
    }

    @cache
    static get _get_fixedUnscaledTime() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Time", "get_fixedUnscaledTime", 0, "float", [])
    }

    @cache
    static get _get_unscaledDeltaTime() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Time", "get_unscaledDeltaTime", 0, "float", [])
    }

    @cache
    static get _get_fixedDeltaTime() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Time", "get_fixedDeltaTime", 0, "float", [])
    }

    @cache
    static get _get_smoothDeltaTime() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Time", "get_smoothDeltaTime", 0, "float", [])
    }

    @cache
    static get _get_timeScale() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Time", "get_timeScale", 0, "float", [])
    }

    @cache
    static get _set_timeScale() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Time", "set_timeScale", 1, "void", ["float"])
    }

    @cache
    static get _get_frameCount() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Time", "get_frameCount", 0, "int", [])
    }

    @cache
    static get _get_realtimeSinceStartup() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Time", "get_realtimeSinceStartup", 0, "float", [])
    }

    @cache
    static get _get_timeSinceLevelLoad() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Time", "get_timeSinceLevelLoad", 0, "float", [])
    }

    @cache
    static get _get_fixedTime() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Time", "get_fixedTime", 0, "float", [])
    }

    @cache
    static get _get_fixedTimeScale() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Time", "get_fixedTimeScale", 0, "float", [])
    }
}

declare global {
    namespace Il2Cpp.Api {
        class Time extends UnityEngine_Time_API { }
    }
}

Il2Cpp.Api.Time = UnityEngine_Time_API;

export { }