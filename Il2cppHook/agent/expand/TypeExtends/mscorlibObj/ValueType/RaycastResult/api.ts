import { cache } from "decorator-cache-getter"

class UnityEngine_EventSystems_RaycastResult_API {
    // public GameObject get_gameObject()
    @cache
    static get _get_gameObject() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.RaycastResult", "get_gameObject", 0, [], "pointer", ["pointer"])
    }

    // public Void set_gameObject(GameObject value)
    @cache
    static get _set_gameObject() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.RaycastResult", "set_gameObject", 1, ["UnityEngine.GameObject"], "void", ["pointer", "pointer"])
    }

    // public Boolean get_isValid()
    @cache
    static get _get_isValid() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.RaycastResult", "get_isValid", 0, [], "pointer", ["pointer"])
    }

    // public Void Clear()
    @cache
    static get _Clear() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.RaycastResult", "Clear", 0, [], "void", ["pointer"])
    }

    // public override String ToString()
    @cache
    static get _ToString() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.RaycastResult", "ToString", 0, [], "pointer", ["pointer"])
    }

}

Il2Cpp.Api.RaycastResult = UnityEngine_EventSystems_RaycastResult_API

declare global {
    namespace Il2Cpp.Api {
        class RaycastResult extends UnityEngine_EventSystems_RaycastResult_API { }
    }
}

export { }