import { cache } from "decorator-cache-getter"

class UnityEngine_SceneManagement_Scene_API {
    // private static String GetPathInternal(Int32 sceneHandle)
    @cache
    static get _GetPathInternal() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.Scene", "GetPathInternal", 1, "pointer", ["pointer"])
    }

    // private static String GetNameInternal(Int32 sceneHandle)
    @cache
    static get _GetNameInternal() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.Scene", "GetNameInternal", 1, "pointer", ["pointer"])
    }

    // private static Int32 GetBuildIndexInternal(Int32 sceneHandle)
    @cache
    static get _GetBuildIndexInternal() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.Scene", "GetBuildIndexInternal", 1, "pointer", ["pointer"])
    }

    // public Int32 get_handle()
    @cache
    static get _get_handle() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.Scene", "get_handle", 0, "pointer", ["pointer"])
    }

    // public String get_path()
    @cache
    static get _get_path() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.Scene", "get_path", 0, "pointer", ["pointer"])
    }

    // public String get_name()
    @cache
    static get _get_name() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.Scene", "get_name", 0, "pointer", ["pointer"])
    }

    // public Int32 get_buildIndex()
    @cache
    static get _get_buildIndex() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.Scene", "get_buildIndex", 0, "pointer", ["pointer"])
    }

    // public override Int32 GetHashCode()
    @cache
    static get _GetHashCode() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.Scene", "GetHashCode", 0, "pointer", ["pointer"])
    }

    // public override Boolean Equals(Object other)
    @cache
    static get _Equals() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.Scene", "Equals", 1, "pointer", ["pointer", "pointer"])
    }

}

Il2Cpp.Api.Scene = UnityEngine_SceneManagement_Scene_API

declare global {
    namespace Il2Cpp.Api {
        class Scene extends UnityEngine_SceneManagement_Scene_API { }
    }
}

export { }