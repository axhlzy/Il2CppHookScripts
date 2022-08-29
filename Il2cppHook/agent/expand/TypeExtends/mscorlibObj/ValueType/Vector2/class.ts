import { mscorlib_System_Object_impl } from "../../class"
import { System_ValueType_Impl } from "../class"
import { UnityEngine_Vector3_Impl as Vector3Impl } from "../Vector3/class"

type System_IFormatProvider = NativePointer

class UnityEngine_Vector2_Impl extends System_ValueType_Impl {

    x: number = lfv(this.handle, "x") as unknown as number
    y: number = lfv(this.handle, "y") as unknown as number
    zeroVector: UnityEngine_Vector2_Impl = lfv(this.handle, "zeroVector") as unknown as UnityEngine_Vector2_Impl
    oneVector: UnityEngine_Vector2_Impl = lfv(this.handle, "oneVector") as unknown as UnityEngine_Vector2_Impl
    upVector: UnityEngine_Vector2_Impl = lfv(this.handle, "upVector") as unknown as UnityEngine_Vector2_Impl
    downVector: UnityEngine_Vector2_Impl = lfv(this.handle, "downVector") as unknown as UnityEngine_Vector2_Impl
    leftVector: UnityEngine_Vector2_Impl = lfv(this.handle, "leftVector") as unknown as UnityEngine_Vector2_Impl
    rightVector: UnityEngine_Vector2_Impl = lfv(this.handle, "rightVector") as unknown as UnityEngine_Vector2_Impl
    positiveInfinityVector: UnityEngine_Vector2_Impl = lfv(this.handle, "positiveInfinityVector") as unknown as UnityEngine_Vector2_Impl
    negativeInfinityVector: UnityEngine_Vector2_Impl = lfv(this.handle, "negativeInfinityVector") as unknown as UnityEngine_Vector2_Impl
    kEpsilon: number = lfv(this.handle, "kEpsilon") as unknown as number
    kEpsilonNormalSqrt: number = lfv(this.handle, "kEpsilonNormalSqrt") as unknown as number


    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    get_Item(index: number): number {
        return Il2Cpp.Api.Vector2._get_Item(this.handle, index)
    }

    set_Item(index: number, value: number): void {
        return Il2Cpp.Api.Vector2._set_Item(this.handle, index, value)
    }

    _ctor_2(x: number, y: number): void {
        return Il2Cpp.Api.Vector2.__ctor(this.handle, x, y)
    }

    Lerp(a: UnityEngine_Vector2_Impl, b: UnityEngine_Vector2_Impl, t: number): UnityEngine_Vector2_Impl {
        return Il2Cpp.Api.Vector2._Lerp(a, b, t)
    }

    Scale(a: UnityEngine_Vector2_Impl, b: UnityEngine_Vector2_Impl): UnityEngine_Vector2_Impl {
        return Il2Cpp.Api.Vector2._Scale(a, b)
    }

    Normalize(): void {
        return Il2Cpp.Api.Vector2._Normalize(this.handle)
    }

    get_normalized(): UnityEngine_Vector2_Impl {
        return Il2Cpp.Api.Vector2._get_normalized(this.handle)
    }

    ToString(): string {
        return readU16(Il2Cpp.Api.Vector2._ToString(this.handle))
    }

    ToString_2(format: string, formatProvider: System_IFormatProvider): string {
        return readU16(Il2Cpp.Api.Vector2._ToString(this.handle, format, formatProvider))
    }

    GetHashCode(): number {
        return Il2Cpp.Api.Vector2._GetHashCode(this.handle)
    }

    Equals_obj(other: mscorlib_System_Object_impl): boolean {
        return Il2Cpp.Api.Vector2._Equals(this.handle, other)
    }

    Equals_vector(other: UnityEngine_Vector2_Impl): boolean {
        return Il2Cpp.Api.Vector2._Equals(this.handle, other)
    }

    Dot(lhs: UnityEngine_Vector2_Impl, rhs: UnityEngine_Vector2_Impl): number {
        return Il2Cpp.Api.Vector2._Dot(lhs, rhs)
    }

    get_magnitude(): number {
        return Il2Cpp.Api.Vector2._get_magnitude(this.handle)
    }

    get_sqrMagnitude(): number {
        return Il2Cpp.Api.Vector2._get_sqrMagnitude(this.handle)
    }

    Angle(from: UnityEngine_Vector2_Impl, to: UnityEngine_Vector2_Impl): number {
        return Il2Cpp.Api.Vector2._Angle(from, to)
    }

    Distance(a: UnityEngine_Vector2_Impl, b: UnityEngine_Vector2_Impl): number {
        return Il2Cpp.Api.Vector2._Distance(a, b)
    }

    ClampMagnitude(vector: UnityEngine_Vector2_Impl, maxLength: number): UnityEngine_Vector2_Impl {
        return Il2Cpp.Api.Vector2._ClampMagnitude(vector, maxLength)
    }

    SqrMagnitude(a: UnityEngine_Vector2_Impl): number {
        return Il2Cpp.Api.Vector2._SqrMagnitude(a)
    }

    Min(lhs: UnityEngine_Vector2_Impl, rhs: UnityEngine_Vector2_Impl): UnityEngine_Vector2_Impl {
        return Il2Cpp.Api.Vector2._Min(lhs, rhs)
    }

    Max(lhs: UnityEngine_Vector2_Impl, rhs: UnityEngine_Vector2_Impl): UnityEngine_Vector2_Impl {
        return Il2Cpp.Api.Vector2._Max(lhs, rhs)
    }

    op_Addition(a: UnityEngine_Vector2_Impl, b: UnityEngine_Vector2_Impl): UnityEngine_Vector2_Impl {
        return Il2Cpp.Api.Vector2._op_Addition(a, b)
    }

    op_Subtraction(a: UnityEngine_Vector2_Impl, b: UnityEngine_Vector2_Impl): UnityEngine_Vector2_Impl {
        return Il2Cpp.Api.Vector2._op_Subtraction(a, b)
    }

    op_Multiply(a: UnityEngine_Vector2_Impl, b: UnityEngine_Vector2_Impl): UnityEngine_Vector2_Impl {
        return Il2Cpp.Api.Vector2._op_Multiply(a, b)
    }

    op_Division(a: UnityEngine_Vector2_Impl, b: UnityEngine_Vector2_Impl): UnityEngine_Vector2_Impl {
        return Il2Cpp.Api.Vector2._op_Division(a, b)
    }

    op_UnaryNegation(a: UnityEngine_Vector2_Impl): UnityEngine_Vector2_Impl {
        return Il2Cpp.Api.Vector2._op_UnaryNegation(a)
    }

    op_Multiply_2(a: UnityEngine_Vector2_Impl, d: number): UnityEngine_Vector2_Impl {
        return Il2Cpp.Api.Vector2._op_Multiply(a, d)
    }

    op_Division_2(a: UnityEngine_Vector2_Impl, d: number): UnityEngine_Vector2_Impl {
        return Il2Cpp.Api.Vector2._op_Division(a, d)
    }

    op_Equality(lhs: UnityEngine_Vector2_Impl, rhs: UnityEngine_Vector2_Impl): boolean {
        return Il2Cpp.Api.Vector2._op_Equality(lhs, rhs)
    }

    op_Inequality(lhs: UnityEngine_Vector2_Impl, rhs: UnityEngine_Vector2_Impl): boolean {
        return Il2Cpp.Api.Vector2._op_Inequality(lhs, rhs)
    }

    op_Implicit(v: Vector3Impl): UnityEngine_Vector2_Impl {
        return Il2Cpp.Api.Vector2._op_Implicit(v)
    }

    op_Implicit_v2(v: UnityEngine_Vector2_Impl): Vector3Impl {
        return Il2Cpp.Api.Vector2._op_Implicit(v)
    }

    get_zero(): UnityEngine_Vector2_Impl {
        return Il2Cpp.Api.Vector2._get_zero()
    }

    get_one(): UnityEngine_Vector2_Impl {
        return Il2Cpp.Api.Vector2._get_one()
    }

    get_up(): UnityEngine_Vector2_Impl {
        return Il2Cpp.Api.Vector2._get_up()
    }

    get_right(): UnityEngine_Vector2_Impl {
        return Il2Cpp.Api.Vector2._get_right()
    }

    _cctor(): void {
        return Il2Cpp.Api.Vector2.__cctor()
    }

}

Il2Cpp.Vector2 = UnityEngine_Vector2_Impl

declare global {
    namespace Il2Cpp {
        class Vector2 extends UnityEngine_Vector2_Impl { }
    }
}

export { UnityEngine_Vector2_Impl }