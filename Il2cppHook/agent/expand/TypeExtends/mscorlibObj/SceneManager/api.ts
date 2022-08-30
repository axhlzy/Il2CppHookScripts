import { cache } from "decorator-cache-getter"

class UnityEngine_SceneManagement_SceneManager_API {
    // public static Int32 get_sceneCount()
    @cache
    static get _get_sceneCount() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "get_sceneCount", 0, "pointer", [])
    }

    // public static Int32 get_sceneCountInBuildSettings()
    @cache
    static get _get_sceneCountInBuildSettings() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "get_sceneCountInBuildSettings", 0, "pointer", [])
    }

    // public static Scene GetActiveScene()
    @cache
    static get _GetActiveScene() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "GetActiveScene", 0, "pointer", [])
    }

    // public static Scene GetSceneByBuildIndex(Int32 buildIndex)
    @cache
    static get _GetSceneByBuildIndex() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "GetSceneByBuildIndex", 1, "pointer", ["int32"])
    }

    // public static Scene GetSceneAt(Int32 index)
    @cache
    static get _GetSceneAt() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "GetSceneAt", 1, "pointer", ["int32"])
    }

    // private static AsyncOperation LoadSceneAsyncNameIndexInternal(String sceneName,Int32 sceneBuildIndex,LoadSceneParameters parameters,Boolean mustCompleteNextFrame)
    @cache
    static get _LoadSceneAsyncNameIndexInternal() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "LoadSceneAsyncNameIndexInternal", 4, "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // public static Void MoveGameObjectToScene(GameObject go,Scene scene)
    @cache
    static get _MoveGameObjectToScene() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "MoveGameObjectToScene", 2, "void", ["pointer", "pointer"])
    }

    // public static Void add_sceneLoaded(LoadSceneMode> value)
    @cache
    static get _add_sceneLoaded() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "add_sceneLoaded", 1, "void", ["pointer"])
    }

    // public static Void remove_sceneLoaded(LoadSceneMode> value)
    @cache
    static get _remove_sceneLoaded() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "remove_sceneLoaded", 1, "void", ["pointer"])
    }

    // public static Void add_sceneUnloaded(Scene> value)
    @cache
    static get _add_sceneUnloaded() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "add_sceneUnloaded", 1, "void", ["pointer"])
    }

    // public static Void remove_sceneUnloaded(Scene> value)
    @cache
    static get _remove_sceneUnloaded() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "remove_sceneUnloaded", 1, "void", ["pointer"])
    }

    // public static Void LoadScene(String sceneName)
    @cache
    static get _LoadScene() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "LoadScene", 1, "void", ["pointer"])
    }

    // public static Scene LoadScene(String sceneName,LoadSceneParameters parameters)
    @cache
    static get _LoadScene_sceneName_parameters() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "LoadScene", 2, ["System.String", "UnityEngine.SceneManagement.LoadSceneParameters"], "pointer", ["pointer", "pointer"])
    }

    // public static Void LoadScene(Int32 sceneBuildIndex)
    @cache
    static get _LoadScene_sceneBuildIndex() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "LoadScene", 1, ["System.Int32"], "void", ["pointer"])
    }

    // public static Scene LoadScene(Int32 sceneBuildIndex,LoadSceneParameters parameters)
    @cache
    static get _LoadScene_sceneBuildIndex_parameters() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "LoadScene", 2, ["System.Int32", "UnityEngine.SceneManagement.LoadSceneParameters"], "pointer", ["pointer", "pointer"])
    }

    // public static AsyncOperation LoadSceneAsync(String sceneName)
    @cache
    static get _LoadSceneAsync() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "LoadSceneAsync", 1, "pointer", ["pointer"])
    }

    // public static AsyncOperation LoadSceneAsync(String sceneName,LoadSceneParameters parameters)
    @cache
    static get _LoadSceneAsync_sceneName_parameters() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "LoadSceneAsync", 2, ["System.String", "UnityEngine.SceneManagement.LoadSceneParameters"], "pointer", ["pointer", "pointer"])
    }

    // private static Void Internal_SceneLoaded(Scene scene,LoadSceneMode mode)
    @cache
    static get _Internal_SceneLoaded() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "Internal_SceneLoaded", 2, "void", ["pointer", "pointer"])
    }

    // private static Void Internal_SceneUnloaded(Scene scene)
    @cache
    static get _Internal_SceneUnloaded() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "Internal_SceneUnloaded", 1, "void", ["pointer"])
    }

    // private static Void Internal_ActiveSceneChanged(Scene previousActiveScene,Scene newActiveScene)
    @cache
    static get _Internal_ActiveSceneChanged() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "Internal_ActiveSceneChanged", 2, "void", ["pointer", "pointer"])
    }

    // private static Void .cctor()
    @cache
    static get __cctor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", ".cctor", 0, "void", [])
    }

    // private static Void GetActiveScene_Injected(Scene& ret)
    @cache
    static get _GetActiveScene_Injected() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "GetActiveScene_Injected", 1, "void", ["pointer"])
    }

    // private static Void GetSceneByBuildIndex_Injected(Int32 buildIndex,Scene& ret)
    @cache
    static get _GetSceneByBuildIndex_Injected() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "GetSceneByBuildIndex_Injected", 2, "void", ["pointer", "pointer"])
    }

    // private static Void GetSceneAt_Injected(Int32 index,Scene& ret)
    @cache
    static get _GetSceneAt_Injected() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "GetSceneAt_Injected", 2, "void", ["pointer", "pointer"])
    }

    // private static Void MoveGameObjectToScene_Injected(GameObject go,Scene& scene)
    @cache
    static get _MoveGameObjectToScene_Injected() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "MoveGameObjectToScene_Injected", 2, "void", ["pointer", "pointer"])
    }

    // public static Void add_activeSceneChanged(Scene> value)
    @cache
    static get _add_activeSceneChanged() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "add_activeSceneChanged", 1, ["UnityEngine.Events.UnityAction<UnityEngine.SceneManagement.Scene,UnityEngine.SceneManagement.Scene>"], "void", ["pointer"])
    }

    // public static Void remove_activeSceneChanged(Scene> value)
    @cache
    static get _remove_activeSceneChanged() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "remove_activeSceneChanged", 1, ["UnityEngine.Events.UnityAction<UnityEngine.SceneManagement.Scene,UnityEngine.SceneManagement.Scene>"], "void", ["pointer"])
    }

}

Il2Cpp.Api.SceneManager = UnityEngine_SceneManagement_SceneManager_API

declare global {
    namespace Il2Cpp.Api {
        class SceneManager extends UnityEngine_SceneManagement_SceneManager_API { }
    }
}

export { }