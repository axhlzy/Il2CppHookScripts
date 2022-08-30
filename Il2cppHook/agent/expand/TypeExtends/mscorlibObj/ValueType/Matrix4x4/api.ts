import { cache } from "decorator-cache-getter"

class UnityEngine_Matrix4x4_API {
    // private Vector3 GetLossyScale()
    @cache
    static get _GetLossyScale() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Matrix4x4", "GetLossyScale", 0, "pointer", ["pointer"])
    }

    // public Vector3 get_lossyScale()
    @cache
    static get _get_lossyScale() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Matrix4x4", "get_lossyScale", 0, "pointer", ["pointer"])
    }

    // public static Matrix4x4 TRS(Vector3 pos,Quaternion q,Vector3 s)
    @cache
    static get _TRS() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Matrix4x4", "TRS", 3, "pointer", ["pointer", "pointer", "pointer"])
    }

    // public Void SetTRS(Vector3 pos,Quaternion q,Vector3 s)
    @cache
    static get _SetTRS() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Matrix4x4", "SetTRS", 3, "void", ["pointer", "pointer", "pointer", "pointer"])
    }

    // public static Matrix4x4 Inverse(Matrix4x4 m)
    @cache
    static get _Inverse() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Matrix4x4", "Inverse", 1, "pointer", ["pointer"])
    }

    // public Matrix4x4 get_inverse()
    @cache
    static get _get_inverse() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Matrix4x4", "get_inverse", 0, "pointer", ["pointer"])
    }

    // public static Matrix4x4 Transpose(Matrix4x4 m)
    @cache
    static get _Transpose() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Matrix4x4", "Transpose", 1, "pointer", ["pointer"])
    }

    // public Matrix4x4 get_transpose()
    @cache
    static get _get_transpose() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Matrix4x4", "get_transpose", 0, "pointer", ["pointer"])
    }

    // public static Matrix4x4 Perspective(Single fov,Single aspect,Single zNear,Single zFar)
    @cache
    static get _Perspective() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Matrix4x4", "Perspective", 4, "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // public Void .ctor(Vector4 column0,Vector4 column1,Vector4 column2,Vector4 column3)
    @cache
    static get __ctor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Matrix4x4", ".ctor", 4, "void", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public override Int32 GetHashCode()
    @cache
    static get _GetHashCode() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Matrix4x4", "GetHashCode", 0, "pointer", ["pointer"])
    }

    // public override Boolean Equals(Object other)
    @cache
    static get _Equals() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Matrix4x4", "Equals", 1, "pointer", ["pointer", "pointer"])
    }

    // public Boolean Equals(Matrix4x4 other)
    @cache
    static get _Equals_other() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Matrix4x4", "Equals", 1, ["UnityEngine.Matrix4x4"], "pointer", ["pointer", "pointer"])
    }

    // public static Matrix4x4 op_Multiply(Matrix4x4 lhs,Matrix4x4 rhs)
    @cache
    static get _op_Multiply() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Matrix4x4", "op_Multiply", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Vector4 op_Multiply(Matrix4x4 lhs,Vector4 vector)
    @cache
    static get _op_Multiply_lhs_vector() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Matrix4x4", "op_Multiply", 2, ["UnityEngine.Matrix4x4", "UnityEngine.Vector4"], "pointer", ["pointer", "pointer"])
    }

    // public static Boolean op_Equality(Matrix4x4 lhs,Matrix4x4 rhs)
    @cache
    static get _op_Equality() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Matrix4x4", "op_Equality", 2, "pointer", ["pointer", "pointer"])
    }

    // public Vector4 GetColumn(Int32 index)
    @cache
    static get _GetColumn() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Matrix4x4", "GetColumn", 1, "pointer", ["pointer", "pointer"])
    }

    // public Vector3 MultiplyPoint(Vector3 point)
    @cache
    static get _MultiplyPoint() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Matrix4x4", "MultiplyPoint", 1, "pointer", ["pointer", "pointer"])
    }

    // public Vector3 MultiplyPoint3x4(Vector3 point)
    @cache
    static get _MultiplyPoint3x4() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Matrix4x4", "MultiplyPoint3x4", 1, "pointer", ["pointer", "pointer"])
    }

    // public Vector3 MultiplyVector(Vector3 vector)
    @cache
    static get _MultiplyVector() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Matrix4x4", "MultiplyVector", 1, "pointer", ["pointer", "pointer"])
    }

    // public static Matrix4x4 Translate(Vector3 vector)
    @cache
    static get _Translate() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Matrix4x4", "Translate", 1, "pointer", ["pointer"])
    }

    // public static Matrix4x4 Rotate(Quaternion q)
    @cache
    static get _Rotate() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Matrix4x4", "Rotate", 1, "pointer", ["pointer"])
    }

    // public static Matrix4x4 get_identity()
    @cache
    static get _get_identity() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Matrix4x4", "get_identity", 0, "pointer", [])
    }

    // public override String ToString()
    @cache
    static get _ToString() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Matrix4x4", "ToString", 0, "pointer", ["pointer"])
    }

    // public String ToString(String format,IFormatProvider formatProvider)
    @cache
    static get _ToString_format_formatProvider() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Matrix4x4", "ToString", 2, ["System.String", "System.IFormatProvider"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // private static Void .cctor()
    @cache
    static get __cctor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Matrix4x4", ".cctor", 0, "void", [])
    }

    // private static Void GetLossyScale_Injected(Matrix4x4& _unity_self,Vector3& ret)
    @cache
    static get _GetLossyScale_Injected() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Matrix4x4", "GetLossyScale_Injected", 2, "void", ["pointer", "pointer"])
    }

    // private static Void TRS_Injected(Vector3& pos,Quaternion& q,Vector3& s,Matrix4x4& ret)
    @cache
    static get _TRS_Injected() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Matrix4x4", "TRS_Injected", 4, "void", ["pointer", "pointer", "pointer", "pointer"])
    }

    // private static Void Inverse_Injected(Matrix4x4& m,Matrix4x4& ret)
    @cache
    static get _Inverse_Injected() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Matrix4x4", "Inverse_Injected", 2, "void", ["pointer", "pointer"])
    }

    // private static Void Transpose_Injected(Matrix4x4& m,Matrix4x4& ret)
    @cache
    static get _Transpose_Injected() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Matrix4x4", "Transpose_Injected", 2, "void", ["pointer", "pointer"])
    }

    // private static Void Perspective_Injected(Single fov,Single aspect,Single zNear,Single zFar,Matrix4x4& ret)
    @cache
    static get _Perspective_Injected() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Matrix4x4", "Perspective_Injected", 5, "void", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

}

Il2Cpp.Api.Matrix4x4 = UnityEngine_Matrix4x4_API

declare global {
    namespace Il2Cpp.Api {
        class Matrix4x4 extends UnityEngine_Matrix4x4_API { }
    }
}

export { }