import { cache } from "decorator-cache-getter"

class UnityEngine_Light_API {
    // public LightType get_type()
    @cache
    static get _get_type() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Light", "get_type", 0, "pointer", ["pointer"])
    }

    // public Single get_spotAngle()
    @cache
    static get _get_spotAngle() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Light", "get_spotAngle", 0, "pointer", ["pointer"])
    }

    // public Color get_color()
    @cache
    static get _get_color() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Light", "get_color", 0, "pointer", ["pointer"])
    }

    // public Void set_color(Color value)
    @cache
    static get _set_color() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Light", "set_color", 1, "void", ["pointer", "pointer"])
    }

    // public Single get_intensity()
    @cache
    static get _get_intensity() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Light", "get_intensity", 0, "pointer", ["pointer"])
    }

    // public Void set_intensity(Single value)
    @cache
    static get _set_intensity() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Light", "set_intensity", 1, "void", ["pointer", "pointer"])
    }

    // public Single get_bounceIntensity()
    @cache
    static get _get_bounceIntensity() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Light", "get_bounceIntensity", 0, "pointer", ["pointer"])
    }

    // public Single get_range()
    @cache
    static get _get_range() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Light", "get_range", 0, "pointer", ["pointer"])
    }

    // public LightBakingOutput get_bakingOutput()
    @cache
    static get _get_bakingOutput() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Light", "get_bakingOutput", 0, "pointer", ["pointer"])
    }

    // public LightShadows get_shadows()
    @cache
    static get _get_shadows() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Light", "get_shadows", 0, "pointer", ["pointer"])
    }

    // public Single get_cookieSize()
    @cache
    static get _get_cookieSize() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Light", "get_cookieSize", 0, "pointer", ["pointer"])
    }

    // public Texture get_cookie()
    @cache
    static get _get_cookie() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Light", "get_cookie", 0, "pointer", ["pointer"])
    }

    // private Void get_color_Injected(Color& ret)
    @cache
    static get _get_color_Injected() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Light", "get_color_Injected", 1, "void", ["pointer", "pointer"])
    }

    // private Void set_color_Injected(Color& value)
    @cache
    static get _set_color_Injected() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Light", "set_color_Injected", 1, "void", ["pointer", "pointer"])
    }

    // private Void get_bakingOutput_Injected(LightBakingOutput& ret)
    @cache
    static get _get_bakingOutput_Injected() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Light", "get_bakingOutput_Injected", 1, "void", ["pointer", "pointer"])
    }

}

Il2Cpp.Api.Light = UnityEngine_Light_API

declare global {
    namespace Il2Cpp.Api {
        class Light extends UnityEngine_Light_API { }
    }
}

export { }