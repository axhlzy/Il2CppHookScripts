import { cache } from "decorator-cache-getter"

class UnityEngine_GUI_API {
    // public static Color get_color()
    @cache
    static get _get_color() {
        return Il2Cpp.Api.t("UnityEngine.IMGUIModule", "UnityEngine.GUI", "get_color", 0, "pointer", [])
    }

    // public static Void set_color(Color value)
    @cache
    static get _set_color() {
        return Il2Cpp.Api.t("UnityEngine.IMGUIModule", "UnityEngine.GUI", "set_color", 1, "void", ["pointer"])
    }

    // public static Void set_changed(Boolean value)
    @cache
    static get _set_changed() {
        return Il2Cpp.Api.t("UnityEngine.IMGUIModule", "UnityEngine.GUI", "set_changed", 1, "void", ["pointer"])
    }

    // public static Void set_depth(Int32 value)
    @cache
    static get _set_depth() {
        return Il2Cpp.Api.t("UnityEngine.IMGUIModule", "UnityEngine.GUI", "set_depth", 1, "void", ["pointer"])
    }

    // private static Void .cctor()
    @cache
    static get __cctor() {
        return Il2Cpp.Api.t("UnityEngine.IMGUIModule", "UnityEngine.GUI", ".cctor", 0, "void", [])
    }

    // internal static Void set_nextScrollStepTime(DateTime value)
    @cache
    static get _set_nextScrollStepTime() {
        return Il2Cpp.Api.t("UnityEngine.IMGUIModule", "UnityEngine.GUI", "set_nextScrollStepTime", 1, "void", ["pointer"])
    }

    // public static Void set_skin(GUISkin value)
    @cache
    static get _set_skin() {
        return Il2Cpp.Api.t("UnityEngine.IMGUIModule", "UnityEngine.GUI", "set_skin", 1, "void", ["pointer"])
    }

    // public static GUISkin get_skin()
    @cache
    static get _get_skin() {
        return Il2Cpp.Api.t("UnityEngine.IMGUIModule", "UnityEngine.GUI", "get_skin", 0, "pointer", [])
    }

    // internal static Void DoSetSkin(GUISkin newSkin)
    @cache
    static get _DoSetSkin() {
        return Il2Cpp.Api.t("UnityEngine.IMGUIModule", "UnityEngine.GUI", "DoSetSkin", 1, "void", ["pointer"])
    }

    // public static Void Label(Rect position,String text,GUIStyle style)
    @cache
    static get _Label() {
        return Il2Cpp.Api.t("UnityEngine.IMGUIModule", "UnityEngine.GUI", "Label", 3, "void", ["pointer", "pointer", "pointer"])
    }

    // public static Void Label(Rect position,GUIContent content,GUIStyle style)
    @cache
    static get _Label_position_content_style() {
        return Il2Cpp.Api.o("UnityEngine.IMGUIModule", "UnityEngine.GUI", "Label", 3, ["UnityEngine.Rect", "UnityEngine.GUIContent", "UnityEngine.GUIStyle"], "void", ["pointer", "pointer", "pointer"])
    }

    // private static Void DoLabel(Rect position,GUIContent content,GUIStyle style)
    @cache
    static get _DoLabel() {
        return Il2Cpp.Api.t("UnityEngine.IMGUIModule", "UnityEngine.GUI", "DoLabel", 3, "void", ["pointer", "pointer", "pointer"])
    }

    // internal static GenericStack get_scrollViewStates()
    @cache
    static get _get_scrollViewStates() {
        return Il2Cpp.Api.t("UnityEngine.IMGUIModule", "UnityEngine.GUI", "get_scrollViewStates", 0, "pointer", [])
    }

    // internal static Void CallWindowDelegate(WindowFunction func,Int32 id,Int32 instanceID,GUISkin _skin,Int32 forceRect,Single width,Single height,GUIStyle style)
    @cache
    static get _CallWindowDelegate() {
        return Il2Cpp.Api.t("UnityEngine.IMGUIModule", "UnityEngine.GUI", "CallWindowDelegate", 8, "void", ["pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // private static Void get_color_Injected(Color& ret)
    @cache
    static get _get_color_Injected() {
        return Il2Cpp.Api.t("UnityEngine.IMGUIModule", "UnityEngine.GUI", "get_color_Injected", 1, "void", ["pointer"])
    }

    // private static Void set_color_Injected(Color& value)
    @cache
    static get _set_color_Injected() {
        return Il2Cpp.Api.t("UnityEngine.IMGUIModule", "UnityEngine.GUI", "set_color_Injected", 1, "void", ["pointer"])
    }

}

Il2Cpp.Api.GUI = UnityEngine_GUI_API

declare global {
    namespace Il2Cpp.Api {
        class GUI extends UnityEngine_GUI_API { }
    }
}

export { }