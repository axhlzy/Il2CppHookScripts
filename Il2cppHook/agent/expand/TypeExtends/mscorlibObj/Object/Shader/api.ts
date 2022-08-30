import { cache } from "decorator-cache-getter"

class UnityEngine_Shader_API {
    // public static Shader Find(String name)
    @cache
    static get _Find() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Shader", "Find", 1, "pointer", ["pointer"])
    }

    // public static Int32 PropertyToID(String name)
    @cache
    static get _PropertyToID() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Shader", "PropertyToID", 1, "pointer", ["pointer"])
    }

    // private Void .ctor()
    @cache
    static get __ctor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Shader", ".ctor", 0, "void", ["pointer"])
    }

}

Il2Cpp.Api.Shader = UnityEngine_Shader_API

declare global {
    namespace Il2Cpp.Api {
        class Shader extends UnityEngine_Shader_API { }
    }
}

export { }