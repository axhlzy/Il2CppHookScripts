import { cache } from "decorator-cache-getter"

class UnityEngine_Color_API {
    // public Void .ctor(Single r,Single g,Single b,Single a)
    @cache
    static get __ctor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Color", ".ctor", 4, "void", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public Void .ctor(Single r,Single g,Single b)
    @cache
    static get __ctor_r_g_b() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Color", ".ctor", 3, ["System.Single", "System.Single", "System.Single"], "void", ["pointer", "pointer", "pointer", "pointer"])
    }

    // public override String ToString()
    @cache
    static get _ToString() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Color", "ToString", 0, "pointer", ["pointer"])
    }

    // public String ToString(String format,IFormatProvider formatProvider)
    @cache
    static get _ToString_format_formatProvider() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Color", "ToString", 2, ["System.String", "System.IFormatProvider"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // public override Int32 GetHashCode()
    @cache
    static get _GetHashCode() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Color", "GetHashCode", 0, "pointer", ["pointer"])
    }

    // public override Boolean Equals(Object other)
    @cache
    static get _Equals() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Color", "Equals", 1, "pointer", ["pointer", "pointer"])
    }

    // public Boolean Equals(Color other)
    @cache
    static get _Equals_other() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Color", "Equals", 1, ["UnityEngine.Color"], "pointer", ["pointer", "pointer"])
    }

    // public static Color op_Addition(Color a,Color b)
    @cache
    static get _op_Addition() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Color", "op_Addition", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Color op_Subtraction(Color a,Color b)
    @cache
    static get _op_Subtraction() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Color", "op_Subtraction", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Color op_Multiply(Color a,Color b)
    @cache
    static get _op_Multiply() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Color", "op_Multiply", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Color op_Multiply(Color a,Single b)
    @cache
    static get _op_Multiply_a_b() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Color", "op_Multiply", 2, ["UnityEngine.Color", "System.Single"], "pointer", ["pointer", "pointer"])
    }

    // public static Boolean op_Equality(Color lhs,Color rhs)
    @cache
    static get _op_Equality() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Color", "op_Equality", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Color Lerp(Color a,Color b,Single t)
    @cache
    static get _Lerp() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Color", "Lerp", 3, "pointer", ["pointer", "pointer", "pointer"])
    }

    // internal Color RGBMultiplied(Single multiplier)
    @cache
    static get _RGBMultiplied() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Color", "RGBMultiplied", 1, "pointer", ["pointer", "pointer"])
    }

    // public static Color get_red()
    @cache
    static get _get_red() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Color", "get_red", 0, "pointer", [])
    }

    // public static Color get_green()
    @cache
    static get _get_green() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Color", "get_green", 0, "pointer", [])
    }

    // public static Color get_blue()
    @cache
    static get _get_blue() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Color", "get_blue", 0, "pointer", [])
    }

    // public static Color get_white()
    @cache
    static get _get_white() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Color", "get_white", 0, "pointer", [])
    }

    // public static Color get_black()
    @cache
    static get _get_black() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Color", "get_black", 0, "pointer", [])
    }

    // public static Color get_yellow()
    @cache
    static get _get_yellow() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Color", "get_yellow", 0, "pointer", [])
    }

    // public static Color get_magenta()
    @cache
    static get _get_magenta() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Color", "get_magenta", 0, "pointer", [])
    }

    // public static Color get_gray()
    @cache
    static get _get_gray() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Color", "get_gray", 0, "pointer", [])
    }

    // public static Color get_clear()
    @cache
    static get _get_clear() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Color", "get_clear", 0, "pointer", [])
    }

    // public Color get_linear()
    @cache
    static get _get_linear() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Color", "get_linear", 0, "pointer", ["pointer"])
    }

    // public Single get_maxColorComponent()
    @cache
    static get _get_maxColorComponent() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Color", "get_maxColorComponent", 0, "pointer", ["pointer"])
    }

    // public static Vector4 op_Implicit(Color c)
    @cache
    static get _op_Implicit() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Color", "op_Implicit", 1, "pointer", ["pointer"])
    }

    // public static Color op_Implicit(Vector4 v)
    @cache
    static get _op_Implicit_v() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Color", "op_Implicit", 1, ["UnityEngine.Vector4"], "pointer", ["pointer"])
    }

}

declare global {
    namespace Il2Cpp.Api {
        class Color extends UnityEngine_Color_API { }
    }
}

Il2Cpp.Api.Color = UnityEngine_Color_API

export { }