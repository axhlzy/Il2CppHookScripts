import { cache } from "decorator-cache-getter"

class UnityEngine_Input_API {
    // private static Boolean GetKeyInt(KeyCode key)
    @cache
    static get _GetKeyInt() {
        return Il2Cpp.Api.t("UnityEngine.InputLegacyModule", "UnityEngine.Input", "GetKeyInt", 1, "pointer", ["pointer"])
    }

    // private static Boolean GetKeyUpInt(KeyCode key)
    @cache
    static get _GetKeyUpInt() {
        return Il2Cpp.Api.t("UnityEngine.InputLegacyModule", "UnityEngine.Input", "GetKeyUpInt", 1, "pointer", ["pointer"])
    }

    // private static Boolean GetKeyDownInt(KeyCode key)
    @cache
    static get _GetKeyDownInt() {
        return Il2Cpp.Api.t("UnityEngine.InputLegacyModule", "UnityEngine.Input", "GetKeyDownInt", 1, "pointer", ["pointer"])
    }

    // public static Single GetAxis(String axisName)
    @cache
    static get _GetAxis() {
        return Il2Cpp.Api.t("UnityEngine.InputLegacyModule", "UnityEngine.Input", "GetAxis", 1, "pointer", ["pointer"])
    }

    // public static Single GetAxisRaw(String axisName)
    @cache
    static get _GetAxisRaw() {
        return Il2Cpp.Api.t("UnityEngine.InputLegacyModule", "UnityEngine.Input", "GetAxisRaw", 1, "pointer", ["pointer"])
    }

    // public static Boolean GetButtonDown(String buttonName)
    @cache
    static get _GetButtonDown() {
        return Il2Cpp.Api.t("UnityEngine.InputLegacyModule", "UnityEngine.Input", "GetButtonDown", 1, "pointer", ["pointer"])
    }

    // public static Boolean GetMouseButton(Int32 button)
    @cache
    static get _GetMouseButton() {
        return Il2Cpp.Api.t("UnityEngine.InputLegacyModule", "UnityEngine.Input", "GetMouseButton", 1, "pointer", ["pointer"])
    }

    // public static Boolean GetMouseButtonDown(Int32 button)
    @cache
    static get _GetMouseButtonDown() {
        return Il2Cpp.Api.t("UnityEngine.InputLegacyModule", "UnityEngine.Input", "GetMouseButtonDown", 1, "pointer", ["pointer"])
    }

    // public static Boolean GetMouseButtonUp(Int32 button)
    @cache
    static get _GetMouseButtonUp() {
        return Il2Cpp.Api.t("UnityEngine.InputLegacyModule", "UnityEngine.Input", "GetMouseButtonUp", 1, "pointer", ["pointer"])
    }

    // public static Touch GetTouch(Int32 index)
    @cache
    static get _GetTouch() {
        return Il2Cpp.Api.t("UnityEngine.InputLegacyModule", "UnityEngine.Input", "GetTouch", 1, "pointer", ["pointer"])
    }

    // public static Boolean GetKey(KeyCode key)
    @cache
    static get _GetKey() {
        return Il2Cpp.Api.t("UnityEngine.InputLegacyModule", "UnityEngine.Input", "GetKey", 1, "pointer", ["pointer"])
    }

    // public static Boolean GetKeyUp(KeyCode key)
    @cache
    static get _GetKeyUp() {
        return Il2Cpp.Api.t("UnityEngine.InputLegacyModule", "UnityEngine.Input", "GetKeyUp", 1, "pointer", ["pointer"])
    }

    // public static Boolean GetKeyDown(KeyCode key)
    @cache
    static get _GetKeyDown() {
        return Il2Cpp.Api.t("UnityEngine.InputLegacyModule", "UnityEngine.Input", "GetKeyDown", 1, "pointer", ["pointer"])
    }

    // public static Void set_simulateMouseWithTouches(Boolean value)
    @cache
    static get _set_simulateMouseWithTouches() {
        return Il2Cpp.Api.t("UnityEngine.InputLegacyModule", "UnityEngine.Input", "set_simulateMouseWithTouches", 1, "void", ["pointer"])
    }

    // public static Vector3 get_mousePosition()
    @cache
    static get _get_mousePosition() {
        return Il2Cpp.Api.t("UnityEngine.InputLegacyModule", "UnityEngine.Input", "get_mousePosition", 0, "pointer", [])
    }

    // public static Vector2 get_mouseScrollDelta()
    @cache
    static get _get_mouseScrollDelta() {
        return Il2Cpp.Api.t("UnityEngine.InputLegacyModule", "UnityEngine.Input", "get_mouseScrollDelta", 0, "pointer", [])
    }

    // public static IMECompositionMode get_imeCompositionMode()
    @cache
    static get _get_imeCompositionMode() {
        return Il2Cpp.Api.t("UnityEngine.InputLegacyModule", "UnityEngine.Input", "get_imeCompositionMode", 0, "pointer", [])
    }

    // public static Void set_imeCompositionMode(IMECompositionMode value)
    @cache
    static get _set_imeCompositionMode() {
        return Il2Cpp.Api.t("UnityEngine.InputLegacyModule", "UnityEngine.Input", "set_imeCompositionMode", 1, "void", ["pointer"])
    }

    // public static String get_compositionString()
    @cache
    static get _get_compositionString() {
        return Il2Cpp.Api.t("UnityEngine.InputLegacyModule", "UnityEngine.Input", "get_compositionString", 0, "pointer", [])
    }

    // public static Vector2 get_compositionCursorPos()
    @cache
    static get _get_compositionCursorPos() {
        return Il2Cpp.Api.t("UnityEngine.InputLegacyModule", "UnityEngine.Input", "get_compositionCursorPos", 0, "pointer", [])
    }

    // public static Void set_compositionCursorPos(Vector2 value)
    @cache
    static get _set_compositionCursorPos() {
        return Il2Cpp.Api.t("UnityEngine.InputLegacyModule", "UnityEngine.Input", "set_compositionCursorPos", 1, "void", ["pointer"])
    }

    // public static Boolean get_mousePresent()
    @cache
    static get _get_mousePresent() {
        return Il2Cpp.Api.t("UnityEngine.InputLegacyModule", "UnityEngine.Input", "get_mousePresent", 0, "pointer", [])
    }

    // public static Int32 get_touchCount()
    @cache
    static get _get_touchCount() {
        return Il2Cpp.Api.t("UnityEngine.InputLegacyModule", "UnityEngine.Input", "get_touchCount", 0, "pointer", [])
    }

    // public static Boolean get_touchSupported()
    @cache
    static get _get_touchSupported() {
        return Il2Cpp.Api.t("UnityEngine.InputLegacyModule", "UnityEngine.Input", "get_touchSupported", 0, "pointer", [])
    }

    // public static Void set_multiTouchEnabled(Boolean value)
    @cache
    static get _set_multiTouchEnabled() {
        return Il2Cpp.Api.t("UnityEngine.InputLegacyModule", "UnityEngine.Input", "set_multiTouchEnabled", 1, "void", ["pointer"])
    }

    // public static Touch[] get_touches()
    @cache
    static get _get_touches() {
        return Il2Cpp.Api.t("UnityEngine.InputLegacyModule", "UnityEngine.Input", "get_touches", 0, "pointer", [])
    }

    // private static Void GetTouch_Injected(Int32 index,Touch& ret)
    @cache
    static get _GetTouch_Injected() {
        return Il2Cpp.Api.t("UnityEngine.InputLegacyModule", "UnityEngine.Input", "GetTouch_Injected", 2, "void", ["pointer", "pointer"])
    }

    // private static Void get_mousePosition_Injected(Vector3& ret)
    @cache
    static get _get_mousePosition_Injected() {
        return Il2Cpp.Api.t("UnityEngine.InputLegacyModule", "UnityEngine.Input", "get_mousePosition_Injected", 1, "void", ["pointer"])
    }

    // private static Void get_mouseScrollDelta_Injected(Vector2& ret)
    @cache
    static get _get_mouseScrollDelta_Injected() {
        return Il2Cpp.Api.t("UnityEngine.InputLegacyModule", "UnityEngine.Input", "get_mouseScrollDelta_Injected", 1, "void", ["pointer"])
    }

    // private static Void get_compositionCursorPos_Injected(Vector2& ret)
    @cache
    static get _get_compositionCursorPos_Injected() {
        return Il2Cpp.Api.t("UnityEngine.InputLegacyModule", "UnityEngine.Input", "get_compositionCursorPos_Injected", 1, "void", ["pointer"])
    }

    // private static Void set_compositionCursorPos_Injected(Vector2& value)
    @cache
    static get _set_compositionCursorPos_Injected() {
        return Il2Cpp.Api.t("UnityEngine.InputLegacyModule", "UnityEngine.Input", "set_compositionCursorPos_Injected", 1, "void", ["pointer"])
    }

}

Il2Cpp.Api.Input = UnityEngine_Input_API

declare global {
    namespace Il2Cpp.Api {
        class Input extends UnityEngine_Input_API { }
    }
}

export { }