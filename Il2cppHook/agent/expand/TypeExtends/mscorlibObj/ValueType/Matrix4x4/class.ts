import { mscorlib_System_Object_impl as System_Object } from "../../class"
import { System_ValueType_Impl } from "../class"
import { UnityEngine_Quaternion_Impl as Quaternion } from "../Quaternion/class"
import { UnityEngine_Vector3_Impl as Vector3 } from "../Vector3/class"
import { UnityEngine_Vector4_Impl as Vector4 } from "../Vector4/class"

type System_IFormatProvider = NativePointer

class UnityEngine_Matrix4x4_Impl extends System_ValueType_Impl {

    m00: number = lfv(this.handle, "m00") as unknown as number
    m10: number = lfv(this.handle, "m10") as unknown as number
    m20: number = lfv(this.handle, "m20") as unknown as number
    m30: number = lfv(this.handle, "m30") as unknown as number
    m01: number = lfv(this.handle, "m01") as unknown as number
    m11: number = lfv(this.handle, "m11") as unknown as number
    m21: number = lfv(this.handle, "m21") as unknown as number
    m31: number = lfv(this.handle, "m31") as unknown as number
    m02: number = lfv(this.handle, "m02") as unknown as number
    m12: number = lfv(this.handle, "m12") as unknown as number
    m22: number = lfv(this.handle, "m22") as unknown as number
    m32: number = lfv(this.handle, "m32") as unknown as number
    m03: number = lfv(this.handle, "m03") as unknown as number
    m13: number = lfv(this.handle, "m13") as unknown as number
    m23: number = lfv(this.handle, "m23") as unknown as number
    m33: number = lfv(this.handle, "m33") as unknown as number
    zeroMatrix: UnityEngine_Matrix4x4_Impl = lfv(this.handle, "zeroMatrix") as unknown as UnityEngine_Matrix4x4_Impl
    identityMatrix: UnityEngine_Matrix4x4_Impl = lfv(this.handle, "identityMatrix") as unknown as UnityEngine_Matrix4x4_Impl


    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    GetLossyScale(): Vector3 {
        return Il2Cpp.Api.Matrix4x4._GetLossyScale(this.handle)
    }

    get_lossyScale(): Vector3 {
        return Il2Cpp.Api.Matrix4x4._get_lossyScale(this.handle)
    }

    static TRS(pos: Vector3, q: Quaternion, s: Vector3): UnityEngine_Matrix4x4_Impl {
        return Il2Cpp.Api.Matrix4x4._TRS(pos, q, s)
    }

    SetTRS(pos: Vector3, q: Quaternion, s: Vector3): void {
        return Il2Cpp.Api.Matrix4x4._SetTRS(this.handle, pos, q, s)
    }

    static Inverse(m: UnityEngine_Matrix4x4_Impl): UnityEngine_Matrix4x4_Impl {
        return Il2Cpp.Api.Matrix4x4._Inverse(m)
    }

    get_inverse(): UnityEngine_Matrix4x4_Impl {
        return Il2Cpp.Api.Matrix4x4._get_inverse(this.handle)
    }

    static Transpose(m: UnityEngine_Matrix4x4_Impl): UnityEngine_Matrix4x4_Impl {
        return Il2Cpp.Api.Matrix4x4._Transpose(m)
    }

    get_transpose(): UnityEngine_Matrix4x4_Impl {
        return Il2Cpp.Api.Matrix4x4._get_transpose(this.handle)
    }

    static Perspective(fov: number, aspect: number, zNear: number, zFar: number): UnityEngine_Matrix4x4_Impl {
        return Il2Cpp.Api.Matrix4x4._Perspective(fov, aspect, zNear, zFar)
    }

    __ctor(column0: Vector4, column1: Vector4, column2: Vector4, column3: Vector4): void {
        return Il2Cpp.Api.Matrix4x4.__ctor(this.handle, column0, column1, column2, column3)
    }

    GetHashCode(): number {
        return Il2Cpp.Api.Matrix4x4._GetHashCode(this.handle)
    }

    Equals(other: System_Object): boolean {
        return Il2Cpp.Api.Matrix4x4._Equals(this.handle, other)
    }

    Equals_1(other: UnityEngine_Matrix4x4_Impl): boolean {
        return Il2Cpp.Api.Matrix4x4._Equals(this.handle, other)
    }

    static op_Multiply(lhs: UnityEngine_Matrix4x4_Impl, rhs: UnityEngine_Matrix4x4_Impl): UnityEngine_Matrix4x4_Impl {
        return Il2Cpp.Api.Matrix4x4._op_Multiply(lhs, rhs)
    }

    static op_Multiply_2(lhs: UnityEngine_Matrix4x4_Impl, vector: Vector4): Vector4 {
        return Il2Cpp.Api.Matrix4x4._op_Multiply(lhs, vector)
    }

    static op_Equality(lhs: UnityEngine_Matrix4x4_Impl, rhs: UnityEngine_Matrix4x4_Impl): boolean {
        return Il2Cpp.Api.Matrix4x4._op_Equality(lhs, rhs)
    }

    GetColumn(index: number): Vector4 {
        return Il2Cpp.Api.Matrix4x4._GetColumn(this.handle, index)
    }

    MultiplyPoint(point: Vector3): Vector3 {
        return Il2Cpp.Api.Matrix4x4._MultiplyPoint(this.handle, point)
    }

    MultiplyPoint3x4(point: Vector3): Vector3 {
        return Il2Cpp.Api.Matrix4x4._MultiplyPoint3x4(this.handle, point)
    }

    MultiplyVector(vector: Vector3): Vector3 {
        return Il2Cpp.Api.Matrix4x4._MultiplyVector(this.handle, vector)
    }

    static Translate(vector: Vector3): UnityEngine_Matrix4x4_Impl {
        return Il2Cpp.Api.Matrix4x4._Translate(vector)
    }

    static Rotate(q: Quaternion): UnityEngine_Matrix4x4_Impl {
        return Il2Cpp.Api.Matrix4x4._Rotate(q)
    }

    static get_identity(): UnityEngine_Matrix4x4_Impl {
        return Il2Cpp.Api.Matrix4x4._get_identity()
    }

    ToString(): string {
        return readU16(Il2Cpp.Api.Matrix4x4._ToString(this.handle))
    }

    ToString_2(format: string, formatProvider: System_IFormatProvider): string {
        return readU16(Il2Cpp.Api.Matrix4x4._ToString(this.handle, format, formatProvider))
    }

    static _cctor(): void {
        return Il2Cpp.Api.Matrix4x4.__cctor()
    }

    static GetLossyScale_Injected(_unity_self: UnityEngine_Matrix4x4_Impl, ret: Vector3): void {
        return Il2Cpp.Api.Matrix4x4._GetLossyScale_Injected(_unity_self, ret)
    }

    static TRS_Injected(pos: Vector3, q: Quaternion, s: Vector3, ret: UnityEngine_Matrix4x4_Impl): void {
        return Il2Cpp.Api.Matrix4x4._TRS_Injected(pos, q, s, ret)
    }

    static Inverse_Injected(m: UnityEngine_Matrix4x4_Impl, ret: UnityEngine_Matrix4x4_Impl): void {
        return Il2Cpp.Api.Matrix4x4._Inverse_Injected(m, ret)
    }

    static Transpose_Injected(m: UnityEngine_Matrix4x4_Impl, ret: UnityEngine_Matrix4x4_Impl): void {
        return Il2Cpp.Api.Matrix4x4._Transpose_Injected(m, ret)
    }

    static Perspective_Injected(fov: number, aspect: number, zNear: number, zFar: number, ret: UnityEngine_Matrix4x4_Impl): void {
        return Il2Cpp.Api.Matrix4x4._Perspective_Injected(fov, aspect, zNear, zFar, ret)
    }
}

Il2Cpp.Matrix4x4 = UnityEngine_Matrix4x4_Impl

declare global {
    namespace Il2Cpp {
        class Matrix4x4 extends UnityEngine_Matrix4x4_Impl { }
    }
}

export { UnityEngine_Matrix4x4_Impl }