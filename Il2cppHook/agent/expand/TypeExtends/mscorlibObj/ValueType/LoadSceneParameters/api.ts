import { cache } from "decorator-cache-getter"

class UnityEngine_SceneManagement_LoadSceneParameters_API {
    // public Void .ctor(LoadSceneMode mode)
    @cache
    static get __ctor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SceneManagement.LoadSceneParameters", ".ctor", 1, "void", ["pointer", "pointer"])
    }
}

Il2Cpp.Api.LoadSceneParameters = UnityEngine_SceneManagement_LoadSceneParameters_API

declare global {
    namespace Il2Cpp.Api {
        class LoadSceneParameters extends UnityEngine_SceneManagement_LoadSceneParameters_API { }
    }
}

export { }