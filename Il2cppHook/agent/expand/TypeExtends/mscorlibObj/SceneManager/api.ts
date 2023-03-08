import { cache } from "decorator-cache-getter"

class UnityEngine_SceneManagement_SceneManager_API {
    // public static Int32 get_sceneCount()
    @cache
    static get _get_sceneCount() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "get_sceneCount", 0, [], "pointer", [])
    }

    // public static Scene GetActiveScene()
    @cache
    static get _GetActiveScene() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "GetActiveScene", 0, [], "pointer", [])
    }

    // public static Boolean SetActiveScene(Scene scene)
    @cache
    static get _SetActiveScene() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "SetActiveScene", 1, ["UnityEngine.SceneManagement.Scene"], "pointer", ["pointer"])
    }

    // public static Scene GetSceneByName(String name)
    @cache
    static get _GetSceneByName() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "GetSceneByName", 1, ["System.String"], "pointer", ["pointer"])
    }

    // public static Scene GetSceneAt(Int32 index)
    @cache
    static get _GetSceneAt() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "GetSceneAt", 1, ["System.Int32"], "pointer", ["pointer"])
    }

    // public static Scene CreateScene(String sceneName,CreateSceneParameters parameters)
    @cache
    static get _CreateScene() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "CreateScene", 2, ["System.String", "UnityEngine.SceneManagement.CreateSceneParameters"], "pointer", ["pointer", "pointer"])
    }

    // private static AsyncOperation UnloadSceneAsyncInternal(Scene scene,UnloadSceneOptions options)
    @cache
    static get _UnloadSceneAsyncInternal() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "UnloadSceneAsyncInternal", 2, ["UnityEngine.SceneManagement.Scene", "UnityEngine.SceneManagement.UnloadSceneOptions"], "pointer", ["pointer", "pointer"])
    }

    // private static AsyncOperation LoadSceneAsyncNameIndexInternal(String sceneName,Int32 sceneBuildIndex,LoadSceneParameters parameters,Boolean mustCompleteNextFrame)
    @cache
    static get _LoadSceneAsyncNameIndexInternal() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "LoadSceneAsyncNameIndexInternal", 4, ["System.String", "System.Int32", "UnityEngine.SceneManagement.LoadSceneParameters", "System.Boolean"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // private static AsyncOperation UnloadSceneNameIndexInternal(String sceneName,Int32 sceneBuildIndex,Boolean immediately,UnloadSceneOptions options,Boolean& outSuccess)
    @cache
    static get _UnloadSceneNameIndexInternal() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "UnloadSceneNameIndexInternal", 5, ["System.String", "System.Int32", "System.Boolean", "UnityEngine.SceneManagement.UnloadSceneOptions", "System.Boolean&"], "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public static Scene CreateScene(String sceneName)
    @cache
    static get _CreateScene_sceneName() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "CreateScene", 1, ["System.String"], "pointer", ["pointer"])
    }

    // public static Void LoadScene(String sceneName,LoadSceneMode mode)
    @cache
    static get _LoadScene() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "LoadScene", 2, ["System.String", "UnityEngine.SceneManagement.LoadSceneMode"], "void", ["pointer", "pointer"])
    }

    // public static Scene LoadScene(String sceneName,LoadSceneParameters parameters)
    @cache
    static get _LoadScene_sceneName_parameters() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "LoadScene", 2, ["System.String", "UnityEngine.SceneManagement.LoadSceneParameters"], "pointer", ["pointer", "pointer"])
    }

    // public static Void LoadScene(Int32 sceneBuildIndex,LoadSceneMode mode)
    @cache
    static get _LoadScene_sceneBuildIndex_mode() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "LoadScene", 2, ["System.Int32", "UnityEngine.SceneManagement.LoadSceneMode"], "void", ["pointer", "pointer"])
    }

    // public static Scene LoadScene(Int32 sceneBuildIndex,LoadSceneParameters parameters)
    @cache
    static get _LoadScene_sceneBuildIndex_parameters() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "LoadScene", 2, ["System.Int32", "UnityEngine.SceneManagement.LoadSceneParameters"], "pointer", ["pointer", "pointer"])
    }

    // public static AsyncOperation LoadSceneAsync(String sceneName,LoadSceneMode mode)
    @cache
    static get _LoadSceneAsync() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "LoadSceneAsync", 2, ["System.String", "UnityEngine.SceneManagement.LoadSceneMode"], "pointer", ["pointer", "pointer"])
    }

    // public static AsyncOperation LoadSceneAsync(String sceneName,LoadSceneParameters parameters)
    @cache
    static get _LoadSceneAsync_sceneName_parameters() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "LoadSceneAsync", 2, ["System.String", "UnityEngine.SceneManagement.LoadSceneParameters"], "pointer", ["pointer", "pointer"])
    }

    // public static AsyncOperation UnloadSceneAsync(String sceneName)
    @cache
    static get _UnloadSceneAsync() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "UnloadSceneAsync", 1, ["System.String"], "pointer", ["pointer"])
    }

    // public static AsyncOperation UnloadSceneAsync(Scene scene)
    @cache
    static get _UnloadSceneAsync_scene() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "UnloadSceneAsync", 1, ["UnityEngine.SceneManagement.Scene"], "pointer", ["pointer"])
    }

    // private static Void Internal_SceneLoaded(Scene scene,LoadSceneMode mode)
    @cache
    static get _Internal_SceneLoaded() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "Internal_SceneLoaded", 2, ["UnityEngine.SceneManagement.Scene", "UnityEngine.SceneManagement.LoadSceneMode"], "void", ["pointer", "pointer"])
    }

    // private static Void Internal_SceneUnloaded(Scene scene)
    @cache
    static get _Internal_SceneUnloaded() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "Internal_SceneUnloaded", 1, ["UnityEngine.SceneManagement.Scene"], "void", ["pointer"])
    }

    // private static Void Internal_ActiveSceneChanged(Scene previousActiveScene,Scene newActiveScene)
    @cache
    static get _Internal_ActiveSceneChanged() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "Internal_ActiveSceneChanged", 2, ["UnityEngine.SceneManagement.Scene", "UnityEngine.SceneManagement.Scene"], "void", ["pointer", "pointer"])
    }

    // private static Void .cctor()
    @cache
    static get __cctor() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", ".cctor", 0, [], "void", [])
    }

    // private static Void GetActiveScene_Injected(Scene& ret)
    @cache
    static get _GetActiveScene_Injected() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "GetActiveScene_Injected", 1, ["UnityEngine.SceneManagement.Scene&"], "void", ["pointer"])
    }

    // private static Boolean SetActiveScene_Injected(Scene& scene)
    @cache
    static get _SetActiveScene_Injected() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "SetActiveScene_Injected", 1, ["UnityEngine.SceneManagement.Scene&"], "pointer", ["pointer"])
    }

    // private static Void GetSceneByName_Injected(String name,Scene& ret)
    @cache
    static get _GetSceneByName_Injected() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "GetSceneByName_Injected", 2, ["System.String", "UnityEngine.SceneManagement.Scene&"], "void", ["pointer", "pointer"])
    }

    // private static Void GetSceneAt_Injected(Int32 index,Scene& ret)
    @cache
    static get _GetSceneAt_Injected() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "GetSceneAt_Injected", 2, ["System.Int32", "UnityEngine.SceneManagement.Scene&"], "void", ["pointer", "pointer"])
    }

    // private static Void CreateScene_Injected(String sceneName,CreateSceneParameters& parameters,Scene& ret)
    @cache
    static get _CreateScene_Injected() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "CreateScene_Injected", 3, ["System.String", "UnityEngine.SceneManagement.CreateSceneParameters&", "UnityEngine.SceneManagement.Scene&"], "void", ["pointer", "pointer", "pointer"])
    }

    // private static AsyncOperation UnloadSceneAsyncInternal_Injected(Scene& scene,UnloadSceneOptions options)
    @cache
    static get _UnloadSceneAsyncInternal_Injected() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SceneManagement.SceneManager", "UnloadSceneAsyncInternal_Injected", 2, ["UnityEngine.SceneManagement.Scene&", "UnityEngine.SceneManagement.UnloadSceneOptions"], "pointer", ["pointer", "pointer"])
    }

}

Il2Cpp.Api.SceneManager = UnityEngine_SceneManagement_SceneManager_API

declare global {
    namespace Il2Cpp.Api {
        class SceneManager extends UnityEngine_SceneManagement_SceneManager_API { }
    }
}

export { }