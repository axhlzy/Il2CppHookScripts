import { cache } from "decorator-cache-getter"

class UnityEngine_SceneManagement_Scene_API {
    // private static String GetPathInternal(Int32 sceneHandle)
    @cache
    static get _GetPathInternal() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.Scene", "GetPathInternal", 1, "pointer", ["int32"])
    }

    // private static String GetNameInternal(Int32 sceneHandle)
    @cache
    static get _GetNameInternal() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.Scene", "GetNameInternal", 1, "pointer", ["int32"])
    }

    // private static Int32 GetBuildIndexInternal(Int32 sceneHandle)
    @cache
    static get _GetBuildIndexInternal() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.Scene", "GetBuildIndexInternal", 1, "pointer", ["int32"])
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

    // private static Boolean IsValidInternal(Int32 sceneHandle)
    @cache
    static get _IsValidInternal() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.Scene", "IsValidInternal", 1, "pointer", ["pointer"])
    }

    // private static Boolean GetIsLoadedInternal(Int32 sceneHandle)
    @cache
    static get _GetIsLoadedInternal() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.Scene", "GetIsLoadedInternal", 1, "pointer", ["pointer"])
    }

    // private static Int32 GetRootCountInternal(Int32 sceneHandle)
    @cache
    static get _GetRootCountInternal() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.Scene", "GetRootCountInternal", 1, "pointer", ["pointer"])
    }

    // private static Void GetRootGameObjectsInternal(Int32 sceneHandle,Object resultRootList)
    @cache
    static get _GetRootGameObjectsInternal() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.Scene", "GetRootGameObjectsInternal", 2, "void", ["pointer", "pointer"])
    }

    // public Boolean IsValid()
    @cache
    static get _IsValid() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.Scene", "IsValid", 0, "pointer", ["pointer"])
    }

    // public Boolean get_isLoaded()
    @cache
    static get _get_isLoaded() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.Scene", "get_isLoaded", 0, "pointer", ["pointer"])
    }

    // public Int32 get_rootCount()
    @cache
    static get _get_rootCount() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.Scene", "get_rootCount", 0, "pointer", ["pointer"])
    }

    // public GameObject[] GetRootGameObjects()
    @cache
    static get _GetRootGameObjects() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.Scene", "GetRootGameObjects", 0, "pointer", ["pointer"])
    }

    // public Void GetRootGameObjects(GameObject> rootGameObjects)
    @cache
    static get _GetRootGameObjects_rootGameObjects() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SceneManagement.Scene", "GetRootGameObjects", 1, ["System.Collections.Generic.List<UnityEngine.GameObject>"], "void", ["pointer", "pointer"])
    }
}

Il2Cpp.Api.Scene = UnityEngine_SceneManagement_Scene_API

declare global {
    namespace Il2Cpp.Api {
        class Scene extends UnityEngine_SceneManagement_Scene_API { }
    }
}

export { }