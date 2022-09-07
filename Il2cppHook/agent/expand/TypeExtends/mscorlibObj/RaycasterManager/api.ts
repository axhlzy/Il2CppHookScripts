import { cache } from "decorator-cache-getter"

class UnityEngine_EventSystems_RaycasterManager_API {
    // public static Void AddRaycaster(BaseRaycaster baseRaycaster)
    @cache
    static get _AddRaycaster() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.RaycasterManager", "AddRaycaster", 1, ["UnityEngine.EventSystems.BaseRaycaster"], "void", ["pointer"])
    }

    // public static BaseRaycaster> GetRaycasters()
    @cache
    static get _GetRaycasters() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.RaycasterManager", "GetRaycasters", 0, [], "pointer", [])
    }

    // public static Void RemoveRaycasters(BaseRaycaster baseRaycaster)
    @cache
    static get _RemoveRaycasters() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.RaycasterManager", "RemoveRaycasters", 1, ["UnityEngine.EventSystems.BaseRaycaster"], "void", ["pointer"])
    }

    // private static Void .cctor()
    @cache
    static get __cctor() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.RaycasterManager", ".cctor", 0, [], "void", [])
    }

}

Il2Cpp.Api.RaycasterManager = UnityEngine_EventSystems_RaycasterManager_API

declare global {
    namespace Il2Cpp.Api {
        class RaycasterManager extends UnityEngine_EventSystems_RaycasterManager_API { }
    }
}

export { }