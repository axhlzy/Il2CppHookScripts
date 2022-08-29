import { cache } from "decorator-cache-getter"

class UnityEngine_Quaternion_API {
    // public static Quaternion FromToRotation(Vector3 fromDirection,Vector3 toDirection)
    @cache
    static get _FromToRotation() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Quaternion", "FromToRotation", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Quaternion Inverse(Quaternion rotation)
    @cache
    static get _Inverse() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Quaternion", "Inverse", 1, "pointer", ["pointer"])
    }

    // public static Quaternion Slerp(Quaternion a,Quaternion b,Single t)
    @cache
    static get _Slerp() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Quaternion", "Slerp", 3, "pointer", ["pointer", "pointer", "pointer"])
    }

    // public static Quaternion SlerpUnclamped(Quaternion a,Quaternion b,Single t)
    @cache
    static get _SlerpUnclamped() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Quaternion", "SlerpUnclamped", 3, "pointer", ["pointer", "pointer", "pointer"])
    }

    // public static Quaternion Lerp(Quaternion a,Quaternion b,Single t)
    @cache
    static get _Lerp() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Quaternion", "Lerp", 3, "pointer", ["pointer", "pointer", "pointer"])
    }

    // private static Quaternion Internal_FromEulerRad(Vector3 euler)
    @cache
    static get _Internal_FromEulerRad() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Quaternion", "Internal_FromEulerRad", 1, "pointer", ["pointer"])
    }

    // private static Vector3 Internal_ToEulerRad(Quaternion rotation)
    @cache
    static get _Internal_ToEulerRad() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Quaternion", "Internal_ToEulerRad", 1, "pointer", ["pointer"])
    }

    // public static Quaternion AngleAxis(Single angle,Vector3 axis)
    @cache
    static get _AngleAxis() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Quaternion", "AngleAxis", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Quaternion LookRotation(Vector3 forward,Vector3 upwards)
    @cache
    static get _LookRotation() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Quaternion", "LookRotation", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Quaternion LookRotation(Vector3 forward)
    @cache
    static get _LookRotation_forward() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Quaternion", "LookRotation", 1, ["UnityEngine.Vector3"], "pointer", ["pointer"])
    }

    // public Void .ctor(Single x,Single y,Single z,Single w)
    @cache
    static get __ctor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Quaternion", ".ctor", 4, "void", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public static Quaternion get_identity()
    @cache
    static get _get_identity() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Quaternion", "get_identity", 0, "pointer", [])
    }

    // public static Quaternion op_Multiply(Quaternion lhs,Quaternion rhs)
    @cache
    static get _op_Multiply() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Quaternion", "op_Multiply", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Vector3 op_Multiply(Quaternion rotation,Vector3 point)
    @cache
    static get _op_Multiply_rotation_point() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Quaternion", "op_Multiply", 2, ["UnityEngine.Quaternion", "UnityEngine.Vector3"], "pointer", ["pointer", "pointer"])
    }

    // private static Boolean IsEqualUsingDot(Single dot)
    @cache
    static get _IsEqualUsingDot() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Quaternion", "IsEqualUsingDot", 1, "pointer", ["pointer"])
    }

    // public static Boolean op_Equality(Quaternion lhs,Quaternion rhs)
    @cache
    static get _op_Equality() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Quaternion", "op_Equality", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Boolean op_Inequality(Quaternion lhs,Quaternion rhs)
    @cache
    static get _op_Inequality() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Quaternion", "op_Inequality", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Single Dot(Quaternion a,Quaternion b)
    @cache
    static get _Dot() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Quaternion", "Dot", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Single Angle(Quaternion a,Quaternion b)
    @cache
    static get _Angle() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Quaternion", "Angle", 2, "pointer", ["pointer", "pointer"])
    }

    // private static Vector3 Internal_MakePositive(Vector3 euler)
    @cache
    static get _Internal_MakePositive() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Quaternion", "Internal_MakePositive", 1, "pointer", ["pointer"])
    }

    // public Vector3 get_eulerAngles()
    @cache
    static get _get_eulerAngles() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Quaternion", "get_eulerAngles", 0, "pointer", ["pointer"])
    }

    // public static Quaternion Euler(Single x,Single y,Single z)
    @cache
    static get _Euler() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Quaternion", "Euler", 3, "pointer", ["pointer", "pointer", "pointer"])
    }

    // public static Quaternion Euler(Vector3 euler)
    @cache
    static get _Euler_euler() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Quaternion", "Euler", 1, ["UnityEngine.Vector3"], "pointer", ["pointer"])
    }

    // public static Quaternion Normalize(Quaternion q)
    @cache
    static get _Normalize() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Quaternion", "Normalize", 1, "pointer", ["pointer"])
    }

    // public Quaternion get_normalized()
    @cache
    static get _get_normalized() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Quaternion", "get_normalized", 0, "pointer", ["pointer"])
    }

    // public override Int32 GetHashCode()
    @cache
    static get _GetHashCode() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Quaternion", "GetHashCode", 0, "pointer", ["pointer"])
    }

    // public override Boolean Equals(Object other)
    @cache
    static get _Equals() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Quaternion", "Equals", 1, "pointer", ["pointer", "pointer"])
    }

    // public Boolean Equals(Quaternion other)
    @cache
    static get _Equals_other() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Quaternion", "Equals", 1, ["UnityEngine.Quaternion"], "pointer", ["pointer", "pointer"])
    }

    // public override String ToString()
    @cache
    static get _ToString() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Quaternion", "ToString", 0, "pointer", ["pointer"])
    }

    // public String ToString(String format,IFormatProvider formatProvider)
    @cache
    static get _ToString_format_formatProvider() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Quaternion", "ToString", 2, ["System.String", "System.IFormatProvider"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // private static Void .cctor()
    @cache
    static get __cctor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Quaternion", ".cctor", 0, "void", [])
    }

    // private static Void FromToRotation_Injected(Vector3& fromDirection,Vector3& toDirection,Quaternion& ret)
    @cache
    static get _FromToRotation_Injected() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Quaternion", "FromToRotation_Injected", 3, "void", ["pointer", "pointer", "pointer"])
    }

    // private static Void Inverse_Injected(Quaternion& rotation,Quaternion& ret)
    @cache
    static get _Inverse_Injected() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Quaternion", "Inverse_Injected", 2, "void", ["pointer", "pointer"])
    }

    // private static Void Slerp_Injected(Quaternion& a,Quaternion& b,Single t,Quaternion& ret)
    @cache
    static get _Slerp_Injected() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Quaternion", "Slerp_Injected", 4, "void", ["pointer", "pointer", "pointer", "pointer"])
    }

    // private static Void SlerpUnclamped_Injected(Quaternion& a,Quaternion& b,Single t,Quaternion& ret)
    @cache
    static get _SlerpUnclamped_Injected() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Quaternion", "SlerpUnclamped_Injected", 4, "void", ["pointer", "pointer", "pointer", "pointer"])
    }

    // private static Void Lerp_Injected(Quaternion& a,Quaternion& b,Single t,Quaternion& ret)
    @cache
    static get _Lerp_Injected() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Quaternion", "Lerp_Injected", 4, "void", ["pointer", "pointer", "pointer", "pointer"])
    }

    // private static Void Internal_FromEulerRad_Injected(Vector3& euler,Quaternion& ret)
    @cache
    static get _Internal_FromEulerRad_Injected() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Quaternion", "Internal_FromEulerRad_Injected", 2, "void", ["pointer", "pointer"])
    }

    // private static Void Internal_ToEulerRad_Injected(Quaternion& rotation,Vector3& ret)
    @cache
    static get _Internal_ToEulerRad_Injected() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Quaternion", "Internal_ToEulerRad_Injected", 2, "void", ["pointer", "pointer"])
    }

    // private static Void AngleAxis_Injected(Single angle,Vector3& axis,Quaternion& ret)
    @cache
    static get _AngleAxis_Injected() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Quaternion", "AngleAxis_Injected", 3, "void", ["pointer", "pointer", "pointer"])
    }

    // private static Void LookRotation_Injected(Vector3& forward,Vector3& upwards,Quaternion& ret)
    @cache
    static get _LookRotation_Injected() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Quaternion", "LookRotation_Injected", 3, "void", ["pointer", "pointer", "pointer"])
    }

}

declare global {
    namespace Il2Cpp.Api {
        class Quaternion extends UnityEngine_Quaternion_API { }
    }
}

Il2Cpp.Api.Quaternion = UnityEngine_Quaternion_API

export { }