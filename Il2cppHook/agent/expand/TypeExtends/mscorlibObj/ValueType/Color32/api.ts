import { cache } from "decorator-cache-getter"

class UnityEngine_Color32_API {
    // public Void .ctor(Byte r,Byte g,Byte b,Byte a)
    @cache
    static get __ctor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Color32", ".ctor", 4, "void", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public static Color32 op_Implicit(Color c)
    @cache
    static get _op_Implicit() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Color32", "op_Implicit", 1, "pointer", ["pointer"])
    }

    // public static Color op_Implicit(Color32 c)
    @cache
    static get _op_Implicit_c() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Color32", "op_Implicit", 1, ["UnityEngine.Color32"], "pointer", ["pointer"])
    }

    // public static Color32 Lerp(Color32 a,Color32 b,Single t)
    @cache
    static get _Lerp() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Color32", "Lerp", 3, "pointer", ["pointer", "pointer", "pointer"])
    }

    // public override String ToString()
    @cache
    static get _ToString() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Color32", "ToString", 0, "pointer", ["pointer"])
    }

    // public String ToString(String format,IFormatProvider formatProvider)
    @cache
    static get _ToString_format_formatProvider() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Color32", "ToString", 2, ["System.String", "System.IFormatProvider"], "pointer", ["pointer", "pointer", "pointer"])
    }

}

Il2Cpp.Api.Color32 = UnityEngine_Color32_API

declare global {
    namespace Il2Cpp.Api {
        class Color32 extends UnityEngine_Color32_API { }
    }
}

export { }