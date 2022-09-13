import { cache } from "decorator-cache-getter"

class UnityEngine_Screen_API {
    // public static Int32 get_width()
    @cache
    static get _get_width() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Screen", "get_width", 0, [], "pointer", [])
    }

    // public static Int32 get_height()
    @cache
    static get _get_height() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Screen", "get_height", 0, [], "pointer", [])
    }

    // public static Single get_dpi()
    @cache
    static get _get_dpi() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Screen", "get_dpi", 0, [], "pointer", [])
    }

    // private static ScreenOrientation GetScreenOrientation()
    @cache
    static get _GetScreenOrientation() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Screen", "GetScreenOrientation", 0, [], "pointer", [])
    }

    // public static ScreenOrientation get_orientation()
    @cache
    static get _get_orientation() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Screen", "get_orientation", 0, [], "pointer", [])
    }

    // public static Void set_sleepTimeout(Int32 value)
    @cache
    static get _set_sleepTimeout() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Screen", "set_sleepTimeout", 1, ["System.Int32"], "void", ["pointer"])
    }

    // public static FullScreenMode get_fullScreenMode()
    @cache
    static get _get_fullScreenMode() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Screen", "get_fullScreenMode", 0, [], "pointer", [])
    }

}

Il2Cpp.Api.Screen = UnityEngine_Screen_API

declare global {
    namespace Il2Cpp.Api {
        class Screen extends UnityEngine_Screen_API { }
    }
}

export { }