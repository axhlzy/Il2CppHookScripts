import { cache } from "decorator-cache-getter"

class UnityEngine_Touch_API {
    // public Int32 get_fingerId()
    @cache
    static get _get_fingerId() {
        return Il2Cpp.Api.t("UnityEngine.InputLegacyModule", "UnityEngine.Touch", "get_fingerId", 0, "pointer", ["pointer"])
    }

    // public Vector2 get_position()
    @cache
    static get _get_position() {
        return Il2Cpp.Api.t("UnityEngine.InputLegacyModule", "UnityEngine.Touch", "get_position", 0, "pointer", ["pointer"])
    }

    // public Vector2 get_deltaPosition()
    @cache
    static get _get_deltaPosition() {
        return Il2Cpp.Api.t("UnityEngine.InputLegacyModule", "UnityEngine.Touch", "get_deltaPosition", 0, "pointer", ["pointer"])
    }

    // public TouchPhase get_phase()
    @cache
    static get _get_phase() {
        return Il2Cpp.Api.t("UnityEngine.InputLegacyModule", "UnityEngine.Touch", "get_phase", 0, "pointer", ["pointer"])
    }

    // public TouchType get_type()
    @cache
    static get _get_type() {
        return Il2Cpp.Api.t("UnityEngine.InputLegacyModule", "UnityEngine.Touch", "get_type", 0, "pointer", ["pointer"])
    }

}

Il2Cpp.Api.Touch = UnityEngine_Touch_API

declare global {
    namespace Il2Cpp.Api {
        class Touch extends UnityEngine_Touch_API { }
    }
}

export { }