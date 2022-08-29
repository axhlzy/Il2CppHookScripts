import { cache } from "decorator-cache-getter"

class UnityEngine_Vector2_API {
    // public Single get_Item(Int32 index)
    @cache
    static get _get_Item() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector2", "get_Item", 1, "pointer", ["pointer", "pointer"])
    }

    // public Void set_Item(Int32 index,Single value)
    @cache
    static get _set_Item() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector2", "set_Item", 2, "void", ["pointer", "pointer", "pointer"])
    }

    // public Void .ctor(Single x,Single y)
    @cache
    static get __ctor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector2", ".ctor", 2, "void", ["pointer", "pointer", "pointer"])
    }

    // public static Vector2 Lerp(Vector2 a,Vector2 b,Single t)
    @cache
    static get _Lerp() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector2", "Lerp", 3, "pointer", ["pointer", "pointer", "pointer"])
    }

    // public static Vector2 Scale(Vector2 a,Vector2 b)
    @cache
    static get _Scale() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector2", "Scale", 2, "pointer", ["pointer", "pointer"])
    }

    // public Void Normalize()
    @cache
    static get _Normalize() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector2", "Normalize", 0, "void", ["pointer"])
    }

    // public Vector2 get_normalized()
    @cache
    static get _get_normalized() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector2", "get_normalized", 0, "pointer", ["pointer"])
    }

    // public override String ToString()
    @cache
    static get _ToString() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector2", "ToString", 0, "pointer", ["pointer"])
    }

    // public String ToString(String format,IFormatProvider formatProvider)
    @cache
    static get _ToString_format_formatProvider() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Vector2", "ToString", 2, ["System.String", "System.IFormatProvider"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // public override Int32 GetHashCode()
    @cache
    static get _GetHashCode() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector2", "GetHashCode", 0, "pointer", ["pointer"])
    }

    // public override Boolean Equals(Object other)
    @cache
    static get _Equals() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector2", "Equals", 1, "pointer", ["pointer", "pointer"])
    }

    // public Boolean Equals(Vector2 other)
    @cache
    static get _Equals_other() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Vector2", "Equals", 1, ["UnityEngine.Vector2"], "pointer", ["pointer", "pointer"])
    }

    // public static Single Dot(Vector2 lhs,Vector2 rhs)
    @cache
    static get _Dot() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector2", "Dot", 2, "pointer", ["pointer", "pointer"])
    }

    // public Single get_magnitude()
    @cache
    static get _get_magnitude() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector2", "get_magnitude", 0, "pointer", ["pointer"])
    }

    // public Single get_sqrMagnitude()
    @cache
    static get _get_sqrMagnitude() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector2", "get_sqrMagnitude", 0, "pointer", ["pointer"])
    }

    // public static Single Angle(Vector2 from,Vector2 to)
    @cache
    static get _Angle() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector2", "Angle", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Single Distance(Vector2 a,Vector2 b)
    @cache
    static get _Distance() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector2", "Distance", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Vector2 ClampMagnitude(Vector2 vector,Single maxLength)
    @cache
    static get _ClampMagnitude() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector2", "ClampMagnitude", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Single SqrMagnitude(Vector2 a)
    @cache
    static get _SqrMagnitude() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector2", "SqrMagnitude", 1, "pointer", ["pointer"])
    }

    // public static Vector2 Min(Vector2 lhs,Vector2 rhs)
    @cache
    static get _Min() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector2", "Min", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Vector2 Max(Vector2 lhs,Vector2 rhs)
    @cache
    static get _Max() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector2", "Max", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Vector2 op_Addition(Vector2 a,Vector2 b)
    @cache
    static get _op_Addition() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector2", "op_Addition", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Vector2 op_Subtraction(Vector2 a,Vector2 b)
    @cache
    static get _op_Subtraction() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector2", "op_Subtraction", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Vector2 op_Multiply(Vector2 a,Vector2 b)
    @cache
    static get _op_Multiply() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector2", "op_Multiply", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Vector2 op_Division(Vector2 a,Vector2 b)
    @cache
    static get _op_Division() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector2", "op_Division", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Vector2 op_UnaryNegation(Vector2 a)
    @cache
    static get _op_UnaryNegation() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector2", "op_UnaryNegation", 1, "pointer", ["pointer"])
    }

    // public static Vector2 op_Multiply(Vector2 a,Single d)
    @cache
    static get _op_Multiply_a_d() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Vector2", "op_Multiply", 2, ["UnityEngine.Vector2", "System.Single"], "pointer", ["pointer", "pointer"])
    }

    // public static Vector2 op_Division(Vector2 a,Single d)
    @cache
    static get _op_Division_a_d() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Vector2", "op_Division", 2, ["UnityEngine.Vector2", "System.Single"], "pointer", ["pointer", "pointer"])
    }

    // public static Boolean op_Equality(Vector2 lhs,Vector2 rhs)
    @cache
    static get _op_Equality() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector2", "op_Equality", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Boolean op_Inequality(Vector2 lhs,Vector2 rhs)
    @cache
    static get _op_Inequality() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector2", "op_Inequality", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Vector2 op_Implicit(Vector3 v)
    @cache
    static get _op_Implicit() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector2", "op_Implicit", 1, "pointer", ["pointer"])
    }

    // public static Vector3 op_Implicit(Vector2 v)
    @cache
    static get _op_Implicit_v() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Vector2", "op_Implicit", 1, ["UnityEngine.Vector2"], "pointer", ["pointer"])
    }

    // public static Vector2 get_zero()
    @cache
    static get _get_zero() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector2", "get_zero", 0, "pointer", [])
    }

    // public static Vector2 get_one()
    @cache
    static get _get_one() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector2", "get_one", 0, "pointer", [])
    }

    // public static Vector2 get_up()
    @cache
    static get _get_up() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector2", "get_up", 0, "pointer", [])
    }

    // public static Vector2 get_right()
    @cache
    static get _get_right() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector2", "get_right", 0, "pointer", [])
    }

    // private static Void .cctor()
    @cache
    static get __cctor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector2", ".cctor", 0, "void", [])
    }

}

declare global {
    namespace Il2Cpp.Api {
        class Vector2 extends UnityEngine_Vector2_API { }
    }
}

Il2Cpp.Api.Vector2 = UnityEngine_Vector2_API

export { }