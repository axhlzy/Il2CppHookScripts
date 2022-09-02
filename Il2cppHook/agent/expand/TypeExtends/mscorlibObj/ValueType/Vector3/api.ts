import { cache } from "decorator-cache-getter"

class UnityEngine_Vector3_API {
    // public static Vector3 Slerp(Vector3 a,Vector3 b,Single t)
    @cache
    static get _Slerp() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "Slerp", 3, "pointer", ["pointer", "pointer", "pointer"])
    }

    // public static Vector3 Lerp(Vector3 a,Vector3 b,Single t)
    @cache
    static get _Lerp() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "Lerp", 3, "pointer", ["pointer", "pointer", "float"])
    }

    // public static Vector3 LerpUnclamped(Vector3 a,Vector3 b,Single t)
    @cache
    static get _LerpUnclamped() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "LerpUnclamped", 3, "pointer", ["pointer", "pointer", "pointer"])
    }

    // public static Vector3 MoveTowards(Vector3 current,Vector3 target,Single maxDistanceDelta)
    @cache
    static get _MoveTowards() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "MoveTowards", 3, "pointer", ["pointer", "pointer", "pointer"])
    }

    // public static Vector3 SmoothDamp(Vector3 current,Vector3 target,Vector3& currentVelocity,Single smoothTime)
    @cache
    static get _SmoothDamp() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "SmoothDamp", 4, "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // public static Vector3 SmoothDamp(Vector3 current,Vector3 target,Vector3& currentVelocity,Single smoothTime,Single maxSpeed,Single deltaTime)
    @cache
    static get _SmoothDamp_current_target_currentVelocity_smoothTime_maxSpeed_deltaTime() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Vector3", "SmoothDamp", 6, ["UnityEngine.Vector3", "UnityEngine.Vector3", "UnityEngine.Vector3&", "System.Single", "System.Single", "System.Single"], "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public Single get_Item(Int32 index)
    @cache
    static get _get_Item() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "get_Item", 1, "pointer", ["pointer", "pointer"])
    }

    // public Void set_Item(Int32 index,Single value)
    @cache
    static get _set_Item() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "set_Item", 2, "void", ["pointer", "pointer", "float"])
    }

    // public Void .ctor(Single x,Single y,Single z)
    @cache
    static get __ctor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", ".ctor", 3, "void", ["pointer", "float", "float", "float"])
    }

    // public Void .ctor(Single x,Single y)
    @cache
    static get __ctor_x_y() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Vector3", ".ctor", 2, ["System.Single", "System.Single"], "void", ["pointer", "float", "float"])
    }

    // public static Vector3 Scale(Vector3 a,Vector3 b)
    @cache
    static get _Scale() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "Scale", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Vector3 Cross(Vector3 lhs,Vector3 rhs)
    @cache
    static get _Cross() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "Cross", 2, "pointer", ["pointer", "pointer"])
    }

    // public override Int32 GetHashCode()
    @cache
    static get _GetHashCode() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "GetHashCode", 0, "pointer", ["pointer"])
    }

    // public override Boolean Equals(Object other)
    @cache
    static get _Equals() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "Equals", 1, "pointer", ["pointer", "pointer"])
    }

    // public Boolean Equals(Vector3 other)
    @cache
    static get _Equals_other() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Vector3", "Equals", 1, ["UnityEngine.Vector3"], "pointer", ["pointer", "pointer"])
    }

    // public static Vector3 Reflect(Vector3 inDirection,Vector3 inNormal)
    @cache
    static get _Reflect() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "Reflect", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Vector3 Normalize(Vector3 value)
    @cache
    static get _Normalize() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "Normalize", 1, "pointer", ["pointer"])
    }

    // public Void Normalize()
    @cache
    static get _Normalize_() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Vector3", "Normalize", 0, [], "void", ["pointer"])
    }

    // public Vector3 get_normalized()
    @cache
    static get _get_normalized() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "get_normalized", 0, "pointer", ["pointer"])
    }

    // public static Single Dot(Vector3 lhs,Vector3 rhs)
    @cache
    static get _Dot() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "Dot", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Vector3 Project(Vector3 vector,Vector3 onNormal)
    @cache
    static get _Project() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "Project", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Vector3 ProjectOnPlane(Vector3 vector,Vector3 planeNormal)
    @cache
    static get _ProjectOnPlane() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "ProjectOnPlane", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Single Angle(Vector3 from,Vector3 to)
    @cache
    static get _Angle() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "Angle", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Single SignedAngle(Vector3 from,Vector3 to,Vector3 axis)
    @cache
    static get _SignedAngle() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "SignedAngle", 3, "pointer", ["pointer", "pointer", "pointer"])
    }

    // public static Single Distance(Vector3 a,Vector3 b)
    @cache
    static get _Distance() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "Distance", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Vector3 ClampMagnitude(Vector3 vector,Single maxLength)
    @cache
    static get _ClampMagnitude() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "ClampMagnitude", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Single Magnitude(Vector3 vector)
    @cache
    static get _Magnitude() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "Magnitude", 1, "pointer", ["pointer"])
    }

    // public Single get_magnitude()
    @cache
    static get _get_magnitude() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "get_magnitude", 0, "pointer", ["pointer"])
    }

    // public static Single SqrMagnitude(Vector3 vector)
    @cache
    static get _SqrMagnitude() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "SqrMagnitude", 1, "pointer", ["pointer"])
    }

    // public Single get_sqrMagnitude()
    @cache
    static get _get_sqrMagnitude() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "get_sqrMagnitude", 0, "pointer", ["pointer"])
    }

    // public static Vector3 Min(Vector3 lhs,Vector3 rhs)
    @cache
    static get _Min() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "Min", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Vector3 Max(Vector3 lhs,Vector3 rhs)
    @cache
    static get _Max() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "Max", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Vector3 get_zero()
    @cache
    static get _get_zero() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "get_zero", 0, "pointer", ['pointer'])
    }

    // public static Vector3 get_one()
    @cache
    static get _get_one() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "get_one", 0, "pointer", ['pointer'])
    }

    // public static Vector3 get_forward()
    @cache
    static get _get_forward() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "get_forward", 0, "pointer", ['pointer'])
    }

    // public static Vector3 get_back()
    @cache
    static get _get_back() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "get_back", 0, "pointer", ['pointer'])
    }

    // public static Vector3 get_up()
    @cache
    static get _get_up() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "get_up", 0, "pointer", ['pointer'])
    }

    // public static Vector3 get_down()
    @cache
    static get _get_down() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "get_down", 0, "pointer", ['pointer'])
    }

    // public static Vector3 get_left()
    @cache
    static get _get_left() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "get_left", 0, "pointer", ['pointer'])
    }

    // public static Vector3 get_right()
    @cache
    static get _get_right() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "get_right", 0, "pointer", ['pointer'])
    }

    // public static Vector3 op_Addition(Vector3 a,Vector3 b)
    @cache
    static get _op_Addition() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "op_Addition", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Vector3 op_Subtraction(Vector3 a,Vector3 b)
    @cache
    static get _op_Subtraction() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "op_Subtraction", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Vector3 op_UnaryNegation(Vector3 a)
    @cache
    static get _op_UnaryNegation() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "op_UnaryNegation", 1, "pointer", ["pointer"])
    }

    // public static Vector3 op_Multiply(Vector3 a,Single d)
    @cache
    static get _op_Multiply() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "op_Multiply", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Vector3 op_Multiply(Single d,Vector3 a)
    @cache
    static get _op_Multiply_d_a() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Vector3", "op_Multiply", 2, ["System.Single", "UnityEngine.Vector3"], "pointer", ["pointer", "pointer"])
    }

    // public static Vector3 op_Division(Vector3 a,Single d)
    @cache
    static get _op_Division() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "op_Division", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Boolean op_Equality(Vector3 lhs,Vector3 rhs)
    @cache
    static get _op_Equality() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "op_Equality", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Boolean op_Inequality(Vector3 lhs,Vector3 rhs)
    @cache
    static get _op_Inequality() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "op_Inequality", 2, "pointer", ["pointer", "pointer"])
    }

    // public override String ToString()
    @cache
    static get _ToString() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "ToString", 0, "pointer", ["pointer"])
    }

    // public String ToString(String format,IFormatProvider formatProvider)
    @cache
    static get _ToString_format_formatProvider() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Vector3", "ToString", 2, ["System.String", "System.IFormatProvider"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // private static Void .cctor()
    @cache
    static get __cctor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", ".cctor", 0, "void", [])
    }

    // private static Void Slerp_Injected(Vector3& a,Vector3& b,Single t,Vector3& ret)
    @cache
    static get _Slerp_Injected() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Vector3", "Slerp_Injected", 4, "void", ["pointer", "pointer", "pointer", "pointer"])
    }

}

declare global {
    namespace Il2Cpp.Api {
        class Vector3 extends UnityEngine_Vector3_API { }
    }
}

Il2Cpp.Api.Vector3 = UnityEngine_Vector3_API

export { }
