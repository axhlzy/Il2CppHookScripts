import { UnityEngine_Object } from "../../Object/class"
import { System_ValueType_Impl } from "../class"
import { System_Int32_Impl } from "../Int32/class"

type System_IFormatProvider = NativePointer

class UnityEngine_Vector3_Impl extends System_ValueType_Impl {

    kEpsilon: number = lfv(this.handle, "kEpsilon") as unknown as number
    kEpsilonNormalSqrt: number = lfv(this.handle, "kEpsilonNormalSqrt") as unknown as number
    x: number = lfv(this.handle, "x") as unknown as number
    y: number = lfv(this.handle, "y") as unknown as number
    z: number = lfv(this.handle, "z") as unknown as number
    zeroVector: UnityEngine_Vector3_Impl = lfv(this.handle, "zeroVector") as unknown as UnityEngine_Vector3_Impl
    oneVector: UnityEngine_Vector3_Impl = lfv(this.handle, "oneVector") as unknown as UnityEngine_Vector3_Impl
    upVector: UnityEngine_Vector3_Impl = lfv(this.handle, "upVector") as unknown as UnityEngine_Vector3_Impl
    downVector: UnityEngine_Vector3_Impl = lfv(this.handle, "downVector") as unknown as UnityEngine_Vector3_Impl
    leftVector: UnityEngine_Vector3_Impl = lfv(this.handle, "leftVector") as unknown as UnityEngine_Vector3_Impl
    rightVector: UnityEngine_Vector3_Impl = lfv(this.handle, "rightVector") as unknown as UnityEngine_Vector3_Impl
    forwardVector: UnityEngine_Vector3_Impl = lfv(this.handle, "forwardVector") as unknown as UnityEngine_Vector3_Impl
    backVector: UnityEngine_Vector3_Impl = lfv(this.handle, "backVector") as unknown as UnityEngine_Vector3_Impl
    positiveInfinityVector: UnityEngine_Vector3_Impl = lfv(this.handle, "positiveInfinityVector") as unknown as UnityEngine_Vector3_Impl
    negativeInfinityVector: UnityEngine_Vector3_Impl = lfv(this.handle, "negativeInfinityVector") as unknown as UnityEngine_Vector3_Impl


    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    Slerp(a: UnityEngine_Vector3_Impl, b: UnityEngine_Vector3_Impl, t: number): UnityEngine_Vector3_Impl {
        return Il2Cpp.Api.Vector3._Slerp(a, b, t)
    }

    Lerp(a: UnityEngine_Vector3_Impl, b: UnityEngine_Vector3_Impl, t: number): UnityEngine_Vector3_Impl {
        return Il2Cpp.Api.Vector3._Lerp(a, b, t)
    }

    LerpUnclamped(a: UnityEngine_Vector3_Impl, b: UnityEngine_Vector3_Impl, t: number): UnityEngine_Vector3_Impl {
        return Il2Cpp.Api.Vector3._LerpUnclamped(a, b, t)
    }

    MoveTowards(current: UnityEngine_Vector3_Impl, target: UnityEngine_Vector3_Impl, maxDistanceDelta: number): UnityEngine_Vector3_Impl {
        return Il2Cpp.Api.Vector3._MoveTowards(current, target, maxDistanceDelta)
    }

    SmoothDamp_4(current: UnityEngine_Vector3_Impl, target: UnityEngine_Vector3_Impl, currentVelocity: UnityEngine_Vector3_Impl, smoothTime: number): UnityEngine_Vector3_Impl {
        return Il2Cpp.Api.Vector3._SmoothDamp(current, target, currentVelocity, smoothTime)
    }

    SmoothDamp_6(current: UnityEngine_Vector3_Impl, target: UnityEngine_Vector3_Impl, currentVelocity: UnityEngine_Vector3_Impl, smoothTime: number, maxSpeed: number, deltaTime: number): UnityEngine_Vector3_Impl {
        return Il2Cpp.Api.Vector3._SmoothDamp(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime)
    }

    get_Item(index: number): number {
        return Il2Cpp.Api.Vector3._get_Item(this.handle, index)
    }

    set_Item(index: number, value: number): void {
        return Il2Cpp.Api.Vector3._set_Item(this.handle, index, value)
    }

    _ctor_xyz(x: number, y: number, z: number): void {
        return Il2Cpp.Api.Vector3.__ctor(this.handle, x, y, z)
    }

    _ctor_xy(x: number, y: number): void {
        return Il2Cpp.Api.Vector3.__ctor(this.handle, x, y)
    }

    Scale(a: UnityEngine_Vector3_Impl, b: UnityEngine_Vector3_Impl): UnityEngine_Vector3_Impl {
        return Il2Cpp.Api.Vector3._Scale(a, b)
    }

    Cross(lhs: UnityEngine_Vector3_Impl, rhs: UnityEngine_Vector3_Impl): UnityEngine_Vector3_Impl {
        return Il2Cpp.Api.Vector3._Cross(lhs, rhs)
    }

    GetHashCode(): System_Int32_Impl {
        return Il2Cpp.Api.Vector3._GetHashCode(this.handle)
    }

    Equals_obj(other: UnityEngine_Object): boolean {
        return Il2Cpp.Api.Vector3._Equals(this.handle, other)
    }

    Equals_v3(other: UnityEngine_Vector3_Impl): boolean {
        return Il2Cpp.Api.Vector3._Equals(this.handle, other)
    }

    Reflect(inDirection: UnityEngine_Vector3_Impl, inNormal: UnityEngine_Vector3_Impl): UnityEngine_Vector3_Impl {
        return Il2Cpp.Api.Vector3._Reflect(inDirection, inNormal)
    }

    Normalize_v3(value: UnityEngine_Vector3_Impl): UnityEngine_Vector3_Impl {
        return Il2Cpp.Api.Vector3._Normalize(value)
    }

    Normalize(): void {
        return Il2Cpp.Api.Vector3._Normalize(this.handle)
    }

    get_normalized(): UnityEngine_Vector3_Impl {
        return Il2Cpp.Api.Vector3._get_normalized(this.handle)
    }

    Dot(lhs: UnityEngine_Vector3_Impl, rhs: UnityEngine_Vector3_Impl): number {
        return Il2Cpp.Api.Vector3._Dot(lhs, rhs)
    }

    Project(vector: UnityEngine_Vector3_Impl, onNormal: UnityEngine_Vector3_Impl): UnityEngine_Vector3_Impl {
        return Il2Cpp.Api.Vector3._Project(vector, onNormal)
    }

    ProjectOnPlane(vector: UnityEngine_Vector3_Impl, planeNormal: UnityEngine_Vector3_Impl): UnityEngine_Vector3_Impl {
        return Il2Cpp.Api.Vector3._ProjectOnPlane(vector, planeNormal)
    }

    Angle(from: UnityEngine_Vector3_Impl, to: UnityEngine_Vector3_Impl): number {
        return Il2Cpp.Api.Vector3._Angle(from, to)
    }

    SignedAngle(from: UnityEngine_Vector3_Impl, to: UnityEngine_Vector3_Impl, axis: UnityEngine_Vector3_Impl): number {
        return Il2Cpp.Api.Vector3._SignedAngle(from, to, axis)
    }

    Distance(a: UnityEngine_Vector3_Impl, b: UnityEngine_Vector3_Impl): number {
        return Il2Cpp.Api.Vector3._Distance(a, b)
    }

    ClampMagnitude(vector: UnityEngine_Vector3_Impl, maxLength: number): UnityEngine_Vector3_Impl {
        return Il2Cpp.Api.Vector3._ClampMagnitude(vector, maxLength)
    }

    Magnitude(vector: UnityEngine_Vector3_Impl): number {
        return Il2Cpp.Api.Vector3._Magnitude(vector)
    }

    get_magnitude(): number {
        return Il2Cpp.Api.Vector3._get_magnitude(this.handle)
    }

    SqrMagnitude(vector: UnityEngine_Vector3_Impl): number {
        return Il2Cpp.Api.Vector3._SqrMagnitude(vector)
    }

    get_sqrMagnitude(): number {
        return Il2Cpp.Api.Vector3._get_sqrMagnitude(this.handle)
    }

    Min(lhs: UnityEngine_Vector3_Impl, rhs: UnityEngine_Vector3_Impl): UnityEngine_Vector3_Impl {
        return Il2Cpp.Api.Vector3._Min(lhs, rhs)
    }

    Max(lhs: UnityEngine_Vector3_Impl, rhs: UnityEngine_Vector3_Impl): UnityEngine_Vector3_Impl {
        return Il2Cpp.Api.Vector3._Max(lhs, rhs)
    }

    get_zero(): UnityEngine_Vector3_Impl {
        return Il2Cpp.Api.Vector3._get_zero()
    }

    get_one(): UnityEngine_Vector3_Impl {
        return Il2Cpp.Api.Vector3._get_one()
    }

    get_forward(): UnityEngine_Vector3_Impl {
        return Il2Cpp.Api.Vector3._get_forward()
    }

    get_back(): UnityEngine_Vector3_Impl {
        return Il2Cpp.Api.Vector3._get_back()
    }

    get_up(): UnityEngine_Vector3_Impl {
        return Il2Cpp.Api.Vector3._get_up()
    }

    get_down(): UnityEngine_Vector3_Impl {
        return Il2Cpp.Api.Vector3._get_down()
    }

    get_left(): UnityEngine_Vector3_Impl {
        return Il2Cpp.Api.Vector3._get_left()
    }

    get_right(): UnityEngine_Vector3_Impl {
        return Il2Cpp.Api.Vector3._get_right()
    }

    op_Addition(a: UnityEngine_Vector3_Impl, b: UnityEngine_Vector3_Impl): UnityEngine_Vector3_Impl {
        return Il2Cpp.Api.Vector3._op_Addition(a, b)
    }

    op_Subtraction(a: UnityEngine_Vector3_Impl, b: UnityEngine_Vector3_Impl): UnityEngine_Vector3_Impl {
        return Il2Cpp.Api.Vector3._op_Subtraction(a, b)
    }

    op_UnaryNegation(a: UnityEngine_Vector3_Impl): UnityEngine_Vector3_Impl {
        return Il2Cpp.Api.Vector3._op_UnaryNegation(a)
    }

    op_Multiply_v3_number(a: UnityEngine_Vector3_Impl, d: number): UnityEngine_Vector3_Impl {
        return Il2Cpp.Api.Vector3._op_Multiply(a, d)
    }

    op_Multiply_number_v3(d: number, a: UnityEngine_Vector3_Impl): UnityEngine_Vector3_Impl {
        return Il2Cpp.Api.Vector3._op_Multiply(d, a)
    }

    op_Division(a: UnityEngine_Vector3_Impl, d: number): UnityEngine_Vector3_Impl {
        return Il2Cpp.Api.Vector3._op_Division(a, d)
    }

    op_Equality(lhs: UnityEngine_Vector3_Impl, rhs: UnityEngine_Vector3_Impl): boolean {
        return Il2Cpp.Api.Vector3._op_Equality(lhs, rhs)
    }

    op_Inequality(lhs: UnityEngine_Vector3_Impl, rhs: UnityEngine_Vector3_Impl): boolean {
        return Il2Cpp.Api.Vector3._op_Inequality(lhs, rhs)
    }

    ToString(): string {
        return readU16(Il2Cpp.Api.Vector3._ToString(this.handle))
    }

    ToString_2(format: string, formatProvider: System_IFormatProvider): string {
        return readU16(Il2Cpp.Api.Vector3._ToString(this.handle, format, formatProvider))
    }

    _cctor(): void {
        return Il2Cpp.Api.Vector3.__cctor()
    }

    Slerp_Injected(a: UnityEngine_Vector3_Impl, b: UnityEngine_Vector3_Impl, t: number, ret: UnityEngine_Vector3_Impl): void {
        return Il2Cpp.Api.Vector3._Slerp_Injected(a, b, t, ret)
    }

}

declare global {
    namespace Il2Cpp {
        class Vector3 extends UnityEngine_Vector3_Impl { }
    }
}

Il2Cpp.Vector3 = UnityEngine_Vector3_Impl

export { UnityEngine_Vector3_Impl }
