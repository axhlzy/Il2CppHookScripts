import { ObjectIl2cpp_impl } from "../../Object/class"
import { System_ValueType_Impl } from "../class"
import { UnityEngine_Vector3_Impl as Vector3Impl } from "../Vector3/class"

type System_IFormatProvider = NativePointer
class UnityEngine_Quaternion_Impl extends System_ValueType_Impl {

    x: number = lfv(this.handle, "x") as unknown as number
    y: number = lfv(this.handle, "y") as unknown as number
    z: number = lfv(this.handle, "z") as unknown as number
    w: number = lfv(this.handle, "w") as unknown as number
    identityQuaternion: UnityEngine_Quaternion_Impl = lfv(this.handle, "identityQuaternion") as unknown as UnityEngine_Quaternion_Impl
    kEpsilon: number = lfv(this.handle, "kEpsilon") as unknown as number


    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    FromToRotation(fromDirection: Vector3Impl, toDirection: Vector3Impl): UnityEngine_Quaternion_Impl {
        return Il2Cpp.Api.Quaternion._FromToRotation(fromDirection, toDirection)
    }

    Inverse(rotation: UnityEngine_Quaternion_Impl): UnityEngine_Quaternion_Impl {
        return Il2Cpp.Api.Quaternion._Inverse(rotation)
    }

    Slerp(a: UnityEngine_Quaternion_Impl, b: UnityEngine_Quaternion_Impl, t: number): UnityEngine_Quaternion_Impl {
        return Il2Cpp.Api.Quaternion._Slerp(a, b, t)
    }

    SlerpUnclamped(a: UnityEngine_Quaternion_Impl, b: UnityEngine_Quaternion_Impl, t: number): UnityEngine_Quaternion_Impl {
        return Il2Cpp.Api.Quaternion._SlerpUnclamped(a, b, t)
    }

    Lerp(a: UnityEngine_Quaternion_Impl, b: UnityEngine_Quaternion_Impl, t: number): UnityEngine_Quaternion_Impl {
        return Il2Cpp.Api.Quaternion._Lerp(a, b, t)
    }

    Internal_FromEulerRad(euler: Vector3Impl): UnityEngine_Quaternion_Impl {
        return Il2Cpp.Api.Quaternion._Internal_FromEulerRad(euler)
    }

    Internal_ToEulerRad(rotation: UnityEngine_Quaternion_Impl): Vector3Impl {
        return Il2Cpp.Api.Quaternion._Internal_ToEulerRad(rotation)
    }

    AngleAxis(angle: number, axis: Vector3Impl): UnityEngine_Quaternion_Impl {
        return Il2Cpp.Api.Quaternion._AngleAxis(angle, axis)
    }

    LookRotation_2(forward: Vector3Impl, upwards: Vector3Impl): UnityEngine_Quaternion_Impl {
        return Il2Cpp.Api.Quaternion._LookRotation(forward, upwards)
    }

    LookRotation_1(forward: Vector3Impl): UnityEngine_Quaternion_Impl {
        return Il2Cpp.Api.Quaternion._LookRotation(forward)
    }

    _ctor_4(x: number, y: number, z: number, w: number): void {
        return Il2Cpp.Api.Quaternion.__ctor(this.handle, x, y, z, w)
    }

    get_identity(): UnityEngine_Quaternion_Impl {
        return Il2Cpp.Api.Quaternion._get_identity()
    }

    op_Multiply(lhs: UnityEngine_Quaternion_Impl, rhs: UnityEngine_Quaternion_Impl): UnityEngine_Quaternion_Impl {
        return Il2Cpp.Api.Quaternion._op_Multiply(lhs, rhs)
    }

    op_Multiply_rotation_point(rotation: UnityEngine_Quaternion_Impl, point: Vector3Impl): Vector3Impl {
        return Il2Cpp.Api.Quaternion._op_Multiply(rotation, point)
    }

    IsEqualUsingDot(dot: number): boolean {
        return Il2Cpp.Api.Quaternion._IsEqualUsingDot(dot)
    }

    op_Equality(lhs: UnityEngine_Quaternion_Impl, rhs: UnityEngine_Quaternion_Impl): boolean {
        return Il2Cpp.Api.Quaternion._op_Equality(lhs, rhs)
    }

    op_Inequality(lhs: UnityEngine_Quaternion_Impl, rhs: UnityEngine_Quaternion_Impl): boolean {
        return Il2Cpp.Api.Quaternion._op_Inequality(lhs, rhs)
    }

    Dot(a: UnityEngine_Quaternion_Impl, b: UnityEngine_Quaternion_Impl): number {
        return Il2Cpp.Api.Quaternion._Dot(a, b)
    }

    Angle(a: UnityEngine_Quaternion_Impl, b: UnityEngine_Quaternion_Impl): number {
        return Il2Cpp.Api.Quaternion._Angle(a, b)
    }

    Internal_MakePositive(euler: Vector3Impl): Vector3Impl {
        return Il2Cpp.Api.Quaternion._Internal_MakePositive(euler)
    }

    get_eulerAngles(): Vector3Impl {
        return Il2Cpp.Api.Quaternion._get_eulerAngles(this.handle)
    }

    Euler_3(x: number, y: number, z: number): UnityEngine_Quaternion_Impl {
        return Il2Cpp.Api.Quaternion._Euler(x, y, z)
    }

    Euler_1(euler: Vector3Impl): UnityEngine_Quaternion_Impl {
        return Il2Cpp.Api.Quaternion._Euler(euler)
    }

    Normalize(q: UnityEngine_Quaternion_Impl): UnityEngine_Quaternion_Impl {
        return Il2Cpp.Api.Quaternion._Normalize(q)
    }

    get_normalized(): UnityEngine_Quaternion_Impl {
        return Il2Cpp.Api.Quaternion._get_normalized(this.handle)
    }

    GetHashCode(): number {
        return Il2Cpp.Api.Quaternion._GetHashCode(this.handle)
    }

    Equals_System_Object(other: ObjectIl2cpp_impl): boolean {
        return Il2Cpp.Api.Quaternion._Equals(this.handle, other)
    }

    Equals_Quaternion(other: UnityEngine_Quaternion_Impl): boolean {
        return Il2Cpp.Api.Quaternion._Equals(this.handle, other)
    }

    ToString(): string {
        return readU16(Il2Cpp.Api.Quaternion._ToString(this.handle))
    }

    ToString_2(format: string, formatProvider: System_IFormatProvider): string {
        return readU16(Il2Cpp.Api.Quaternion._ToString(this.handle, format, formatProvider))
    }

    _cctor(): void {
        return Il2Cpp.Api.Quaternion.__cctor()
    }

    FromToRotation_Injected(fromDirection: Vector3Impl, toDirection: Vector3Impl, ret: UnityEngine_Quaternion_Impl): void {
        return Il2Cpp.Api.Quaternion._FromToRotation_Injected(fromDirection, toDirection, ret)
    }

    Inverse_Injected(rotation: UnityEngine_Quaternion_Impl, ret: UnityEngine_Quaternion_Impl): void {
        return Il2Cpp.Api.Quaternion._Inverse_Injected(rotation, ret)
    }

    Slerp_Injected(a: UnityEngine_Quaternion_Impl, b: UnityEngine_Quaternion_Impl, t: number, ret: UnityEngine_Quaternion_Impl): void {
        return Il2Cpp.Api.Quaternion._Slerp_Injected(a, b, t, ret)
    }

    SlerpUnclamped_Injected(a: UnityEngine_Quaternion_Impl, b: UnityEngine_Quaternion_Impl, t: number, ret: UnityEngine_Quaternion_Impl): void {
        return Il2Cpp.Api.Quaternion._SlerpUnclamped_Injected(a, b, t, ret)
    }

    Lerp_Injected(a: UnityEngine_Quaternion_Impl, b: UnityEngine_Quaternion_Impl, t: number, ret: UnityEngine_Quaternion_Impl): void {
        return Il2Cpp.Api.Quaternion._Lerp_Injected(a, b, t, ret)
    }

    Internal_FromEulerRad_Injected(euler: Vector3Impl, ret: UnityEngine_Quaternion_Impl): void {
        return Il2Cpp.Api.Quaternion._Internal_FromEulerRad_Injected(euler, ret)
    }

    Internal_ToEulerRad_Injected(rotation: UnityEngine_Quaternion_Impl, ret: Vector3Impl): void {
        return Il2Cpp.Api.Quaternion._Internal_ToEulerRad_Injected(rotation, ret)
    }

    AngleAxis_Injected(angle: number, axis: Vector3Impl, ret: UnityEngine_Quaternion_Impl): void {
        return Il2Cpp.Api.Quaternion._AngleAxis_Injected(angle, axis, ret)
    }

    LookRotation_Injected(forward: Vector3Impl, upwards: Vector3Impl, ret: UnityEngine_Quaternion_Impl): void {
        return Il2Cpp.Api.Quaternion._LookRotation_Injected(forward, upwards, ret)
    }

}

Il2Cpp.Quaternion = UnityEngine_Quaternion_Impl

declare global {
    namespace Il2Cpp {
        class Quaternion extends UnityEngine_Quaternion_Impl { }
    }
}

export { UnityEngine_Quaternion_Impl }