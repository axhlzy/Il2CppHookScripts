import { UnityEngine_Object } from "../../Object/class"
import { System_ValueType_Impl } from "../class"
import { UnityEngine_Vector3_Impl as Vector3Impl } from "../Vector3/class"

type System_IFormatProvider = NativePointer

class UnityEngine_Vector4_Impl extends System_ValueType_Impl {

    kEpsilon: number = lfv(this.handle, "kEpsilon") as unknown as number
    x: number = lfv(this.handle, "x") as unknown as number
    y: number = lfv(this.handle, "y") as unknown as number
    z: number = lfv(this.handle, "z") as unknown as number
    w: number = lfv(this.handle, "w") as unknown as number
    zeroVector: UnityEngine_Vector4_Impl = lfv(this.handle, "zeroVector") as unknown as UnityEngine_Vector4_Impl
    oneVector: UnityEngine_Vector4_Impl = lfv(this.handle, "oneVector") as unknown as UnityEngine_Vector4_Impl
    positiveInfinityVector: UnityEngine_Vector4_Impl = lfv(this.handle, "positiveInfinityVector") as unknown as UnityEngine_Vector4_Impl
    negativeInfinityVector: UnityEngine_Vector4_Impl = lfv(this.handle, "negativeInfinityVector") as unknown as UnityEngine_Vector4_Impl


    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    get_Item(index: number): number {
        return Il2Cpp.Api.Vector4._get_Item(this.handle, index)
    }

    set_Item(index: number, value: number): void {
        return Il2Cpp.Api.Vector4._set_Item(this.handle, index, value)
    }

    _ctor_xyzw(x: number, y: number, z: number, w: number): void {
        return Il2Cpp.Api.Vector4.__ctor(this.handle, x, y, z, w)
    }

    _ctor_xyz(x: number, y: number, z: number): void {
        return Il2Cpp.Api.Vector4.__ctor(this.handle, x, y, z)
    }

    Lerp(a: UnityEngine_Vector4_Impl, b: UnityEngine_Vector4_Impl, t: number): UnityEngine_Vector4_Impl {
        return Il2Cpp.Api.Vector4._Lerp(a, b, t)
    }

    GetHashCode(): number {
        return Il2Cpp.Api.Vector4._GetHashCode(this.handle)
    }

    Equals_obj(other: UnityEngine_Object): boolean {
        return Il2Cpp.Api.Vector4._Equals(this.handle, other)
    }

    Equals_v4(other: UnityEngine_Vector4_Impl): boolean {
        return Il2Cpp.Api.Vector4._Equals(this.handle, other)
    }

    Normalize(a: UnityEngine_Vector4_Impl): UnityEngine_Vector4_Impl {
        return Il2Cpp.Api.Vector4._Normalize(a)
    }

    get_normalized(): UnityEngine_Vector4_Impl {
        return Il2Cpp.Api.Vector4._get_normalized(this.handle)
    }

    Dot(a: UnityEngine_Vector4_Impl, b: UnityEngine_Vector4_Impl): number {
        return Il2Cpp.Api.Vector4._Dot(a, b)
    }

    Magnitude(a: UnityEngine_Vector4_Impl): number {
        return Il2Cpp.Api.Vector4._Magnitude(a)
    }

    get_magnitude(): number {
        return Il2Cpp.Api.Vector4._get_magnitude(this.handle)
    }

    get_sqrMagnitude(): number {
        return Il2Cpp.Api.Vector4._get_sqrMagnitude(this.handle)
    }

    get_zero(): UnityEngine_Vector4_Impl {
        return Il2Cpp.Api.Vector4._get_zero()
    }

    op_Addition(a: UnityEngine_Vector4_Impl, b: UnityEngine_Vector4_Impl): UnityEngine_Vector4_Impl {
        return Il2Cpp.Api.Vector4._op_Addition(a, b)
    }

    op_Subtraction(a: UnityEngine_Vector4_Impl, b: UnityEngine_Vector4_Impl): UnityEngine_Vector4_Impl {
        return Il2Cpp.Api.Vector4._op_Subtraction(a, b)
    }

    op_Multiply(a: UnityEngine_Vector4_Impl, d: number): UnityEngine_Vector4_Impl {
        return Il2Cpp.Api.Vector4._op_Multiply(a, d)
    }

    op_Division(a: UnityEngine_Vector4_Impl, d: number): UnityEngine_Vector4_Impl {
        return Il2Cpp.Api.Vector4._op_Division(a, d)
    }

    op_Equality(lhs: UnityEngine_Vector4_Impl, rhs: UnityEngine_Vector4_Impl): boolean {
        return Il2Cpp.Api.Vector4._op_Equality(lhs, rhs)
    }

    op_Inequality(lhs: UnityEngine_Vector4_Impl, rhs: UnityEngine_Vector4_Impl): boolean {
        return Il2Cpp.Api.Vector4._op_Inequality(lhs, rhs)
    }

    op_Implicit_v3(v: Vector3Impl): UnityEngine_Vector4_Impl {
        return Il2Cpp.Api.Vector4._op_Implicit(v)
    }

    op_Implicit_v4(v: UnityEngine_Vector4_Impl): Vector3Impl {
        return Il2Cpp.Api.Vector4._op_Implicit(v)
    }

    ToString(): string {
        return readU16(Il2Cpp.Api.Vector4._ToString(this.handle))
    }

    ToString_2(format: string, formatProvider: System_IFormatProvider): string {
        return readU16(Il2Cpp.Api.Vector4._ToString(this.handle, format, formatProvider))
    }

    _cctor(): void {
        return Il2Cpp.Api.Vector4.__cctor()
    }

}

Il2Cpp.Vector4 = UnityEngine_Vector4_Impl

declare global {
    namespace Il2Cpp {
        class Vector4 extends UnityEngine_Vector4_Impl { }
    }
}

export { UnityEngine_Vector4_Impl }