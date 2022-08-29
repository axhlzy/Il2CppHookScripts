import { cache } from "decorator-cache-getter"

class UnityEngine_Vector4_API {
    // public Single get_Item(Int32 index)
    @cache
    static get _get_Item() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector4", "get_Item", 1, "pointer", ["pointer", "pointer"])
    }

    // public Void set_Item(Int32 index,Single value)
    @cache
    static get _set_Item() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector4", "set_Item", 2, "void", ["pointer", "pointer", "pointer"])
    }

    // public Void .ctor(Single x,Single y,Single z,Single w)
    @cache
    static get __ctor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector4", ".ctor", 4, "void", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public Void .ctor(Single x,Single y,Single z)
    @cache
    static get __ctor_x_y_z() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Vector4", ".ctor", 3, ["System.Single", "System.Single", "System.Single"], "void", ["pointer", "pointer", "pointer", "pointer"])
    }

    // public static Vector4 Lerp(Vector4 a,Vector4 b,Single t)
    @cache
    static get _Lerp() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector4", "Lerp", 3, "pointer", ["pointer", "pointer", "pointer"])
    }

    // public override Int32 GetHashCode()
    @cache
    static get _GetHashCode() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector4", "GetHashCode", 0, "pointer", ["pointer"])
    }

    // public override Boolean Equals(Object other)
    @cache
    static get _Equals() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector4", "Equals", 1, "pointer", ["pointer", "pointer"])
    }

    // public Boolean Equals(Vector4 other)
    @cache
    static get _Equals_other() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Vector4", "Equals", 1, ["UnityEngine.Vector4"], "pointer", ["pointer", "pointer"])
    }

    // public static Vector4 Normalize(Vector4 a)
    @cache
    static get _Normalize() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector4", "Normalize", 1, "pointer", ["pointer"])
    }

    // public Vector4 get_normalized()
    @cache
    static get _get_normalized() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector4", "get_normalized", 0, "pointer", ["pointer"])
    }

    // public static Single Dot(Vector4 a,Vector4 b)
    @cache
    static get _Dot() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector4", "Dot", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Single Magnitude(Vector4 a)
    @cache
    static get _Magnitude() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector4", "Magnitude", 1, "pointer", ["pointer"])
    }

    // public Single get_magnitude()
    @cache
    static get _get_magnitude() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector4", "get_magnitude", 0, "pointer", ["pointer"])
    }

    // public Single get_sqrMagnitude()
    @cache
    static get _get_sqrMagnitude() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector4", "get_sqrMagnitude", 0, "pointer", ["pointer"])
    }

    // public static Vector4 get_zero()
    @cache
    static get _get_zero() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector4", "get_zero", 0, "pointer", [])
    }

    // public static Vector4 op_Addition(Vector4 a,Vector4 b)
    @cache
    static get _op_Addition() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector4", "op_Addition", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Vector4 op_Subtraction(Vector4 a,Vector4 b)
    @cache
    static get _op_Subtraction() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector4", "op_Subtraction", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Vector4 op_Multiply(Vector4 a,Single d)
    @cache
    static get _op_Multiply() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector4", "op_Multiply", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Vector4 op_Division(Vector4 a,Single d)
    @cache
    static get _op_Division() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector4", "op_Division", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Boolean op_Equality(Vector4 lhs,Vector4 rhs)
    @cache
    static get _op_Equality() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector4", "op_Equality", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Boolean op_Inequality(Vector4 lhs,Vector4 rhs)
    @cache
    static get _op_Inequality() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector4", "op_Inequality", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Vector4 op_Implicit(Vector3 v)
    @cache
    static get _op_Implicit() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector4", "op_Implicit", 1, "pointer", ["pointer"])
    }

    // public static Vector3 op_Implicit(Vector4 v)
    @cache
    static get _op_Implicit_v() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Vector4", "op_Implicit", 1, ["UnityEngine.Vector4"], "pointer", ["pointer"])
    }

    // public override String ToString()
    @cache
    static get _ToString() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector4", "ToString", 0, "pointer", ["pointer"])
    }

    // public String ToString(String format,IFormatProvider formatProvider)
    @cache
    static get _ToString_format_formatProvider() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Vector4", "ToString", 2, ["System.String", "System.IFormatProvider"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // private static Void .cctor()
    @cache
    static get __cctor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector4", ".cctor", 0, "void", [])
    }

}

declare global {
    namespace Il2Cpp.Api {
        class Vector4 extends UnityEngine_Vector4_API { }
    }
}

Il2Cpp.Api.Vector4 = UnityEngine_Vector4_API

export { }