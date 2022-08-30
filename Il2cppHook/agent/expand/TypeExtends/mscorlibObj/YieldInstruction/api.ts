import { cache } from "decorator-cache-getter"

class UnityEngine_YieldInstruction_API {
    // public Void .ctor()
    @cache
    static get __ctor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.YieldInstruction", ".ctor", 0, "void", ["pointer"])
    }

}

Il2Cpp.Api.YieldInstruction = UnityEngine_YieldInstruction_API

declare global {
    namespace Il2Cpp.Api {
        class YieldInstruction extends UnityEngine_YieldInstruction_API { }
    }
}

export { }