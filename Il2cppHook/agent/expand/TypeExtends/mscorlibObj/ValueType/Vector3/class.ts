import { OffsetManager } from "../../../../../bridge/fix/offsetManager"
import { mscorlib_System_Object_impl as System_Object } from "../../class"
import { System_ValueType_Impl } from "../class"
import { System_Int32_Impl as System_Int32 } from "../Int32/class"

type System_IFormatProvider = NativePointer
type System_Single = NativePointer

class UnityEngine_Vector3_Impl extends System_ValueType_Impl {

    // kEpsilon: number = readSingle(lfv(this.handle, "kEpsilon"))
    // kEpsilonNormalSqrt: number = readSingle(lfv(this.handle, "kEpsilonNormalSqrt"))
    x: number = readSingle(lfv(this.handle, "x", findClass("Vector3"))) // lfn （not read pointer）, 不使用lf解析值
    y: number = readSingle(lfv(this.handle, "y", findClass("Vector3")))
    z: number = readSingle(lfv(this.handle, "z", findClass("Vector3")))
    // zeroVector: UnityEngine_Vector3_Impl = new UnityEngine_Vector3_Impl(lfv(this.handle, "zeroVector", findClass("Vector3")))
    // oneVector: UnityEngine_Vector3_Impl = new UnityEngine_Vector3_Impl(lfv(this.handle, "oneVector", findClass("Vector3")))
    // upVector: UnityEngine_Vector3_Impl = new UnityEngine_Vector3_Impl(lfv(this.handle, "upVector", findClass("Vector3")))
    // downVector: UnityEngine_Vector3_Impl = new UnityEngine_Vector3_Impl(lfv(this.handle, "downVector", findClass("Vector3")))
    // leftVector: UnityEngine_Vector3_Impl = new UnityEngine_Vector3_Impl(lfv(this.handle, "leftVector"))
    // rightVector: UnityEngine_Vector3_Impl = new UnityEngine_Vector3_Impl(lfv(this.handle, "rightVector"))
    // forwardVector: UnityEngine_Vector3_Impl = new UnityEngine_Vector3_Impl(lfv(this.handle, "forwardVector"))
    // backVector: UnityEngine_Vector3_Impl = new UnityEngine_Vector3_Impl(lfv(this.handle, "backVector"))
    // positiveInfinityVector: UnityEngine_Vector3_Impl = new UnityEngine_Vector3_Impl(lfv(this.handle, "positiveInfinityVector"))
    // negativeInfinityVector: UnityEngine_Vector3_Impl = new UnityEngine_Vector3_Impl(lfv(this.handle, "negativeInfinityVector"))

    static cache = new Array<NativePointer>()

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    static Lerp(a: UnityEngine_Vector3_Impl, b: UnityEngine_Vector3_Impl, t: System_Single): UnityEngine_Vector3_Impl {
        return new UnityEngine_Vector3_Impl(Il2Cpp.Api.Vector3._Lerp(a.handle, b.handle, t))
    }

    get_Item(index: System_Int32): number {
        return readSingle(Il2Cpp.Api.Vector3._get_Item(this.handle, index))
    }

    set_Item(index: System_Int32, value: number): void {
        return Il2Cpp.Api.Vector3._set_Item(this.handle, index, value)
    }

    __ctor(x: System_Single, y: System_Single, z: System_Single): void {
        let tmp = alloc(6)
        return Il2Cpp.Api.Vector3.__ctor(tmp, x, y, z)
    }

    _ctor_2(x: System_Single, y: System_Single): void {
        return Il2Cpp.Api.Vector3.__ctor(this.handle, x, y)
    }

    static Cross(lhs: UnityEngine_Vector3_Impl, rhs: UnityEngine_Vector3_Impl): UnityEngine_Vector3_Impl {
        return new UnityEngine_Vector3_Impl(Il2Cpp.Api.Vector3._Cross(lhs.handle, rhs.handle))
    }

    GetHashCode(): System_Int32 {
        return Il2Cpp.Api.Vector3._GetHashCode(this.handle)
    }

    Equals(other: System_Object): boolean {
        return !Il2Cpp.Api.Vector3._Equals(this.handle, other.handle).isNull()
    }

    Equals_1(other: UnityEngine_Vector3_Impl): boolean {
        return !Il2Cpp.Api.Vector3._Equals(this.handle, other.handle).isNull()
    }

    static Normalize(value: UnityEngine_Vector3_Impl): UnityEngine_Vector3_Impl {
        return Il2Cpp.Api.Vector3._Normalize(value.handle)
    }

    Normalize_0(): void {
        return Il2Cpp.Api.Vector3._Normalize(this.handle)
    }

    get_normalized(): UnityEngine_Vector3_Impl {
        return new UnityEngine_Vector3_Impl(Il2Cpp.Api.Vector3._get_normalized(this.handle))
    }

    static Dot(lhs: UnityEngine_Vector3_Impl, rhs: UnityEngine_Vector3_Impl): number {
        return readSingle(Il2Cpp.Api.Vector3._Dot(lhs.handle, rhs.handle))
    }

    static ProjectOnPlane(vector: UnityEngine_Vector3_Impl, planeNormal: UnityEngine_Vector3_Impl): UnityEngine_Vector3_Impl {
        return Il2Cpp.Api.Vector3._ProjectOnPlane(vector, planeNormal)
    }

    static Distance(a: UnityEngine_Vector3_Impl, b: UnityEngine_Vector3_Impl): number {
        return readSingle(Il2Cpp.Api.Vector3._Distance(a.handle, b.handle))
    }

    static ClampMagnitude(vector: UnityEngine_Vector3_Impl, maxLength: System_Single): UnityEngine_Vector3_Impl {
        return new UnityEngine_Vector3_Impl(Il2Cpp.Api.Vector3._ClampMagnitude(vector.handle, maxLength))
    }

    static Magnitude(vector: UnityEngine_Vector3_Impl): number {
        return readSingle(Il2Cpp.Api.Vector3._Magnitude(vector.handle))
    }

    get_magnitude(): System_Single {
        return Il2Cpp.Api.Vector3._get_magnitude(this.handle)
    }

    static SqrMagnitude(vector: UnityEngine_Vector3_Impl): number {
        return readSingle(Il2Cpp.Api.Vector3._SqrMagnitude(vector.handle))
    }

    get_sqrMagnitude(): number {
        return readSingle(Il2Cpp.Api.Vector3._get_sqrMagnitude(this.handle))
    }

    static Min(lhs: UnityEngine_Vector3_Impl, rhs: UnityEngine_Vector3_Impl): UnityEngine_Vector3_Impl {
        return new UnityEngine_Vector3_Impl(Il2Cpp.Api.Vector3._Min(lhs, rhs))
    }

    static Max(lhs: UnityEngine_Vector3_Impl, rhs: UnityEngine_Vector3_Impl): UnityEngine_Vector3_Impl {
        return new UnityEngine_Vector3_Impl(Il2Cpp.Api.Vector3._Max(lhs, rhs))
    }

    static get get_zero(): UnityEngine_Vector3_Impl {
        let start = OffsetManager.getInstance().getOffset("Vector3", "x")
        let end = OffsetManager.getInstance().getOffset("Vector3", "z")
        let alloc3 = alloc(end)
        Il2Cpp.Api.Vector3._get_zero(alloc(start))
        UnityEngine_Vector3_Impl.cache.push(alloc3)
        return new UnityEngine_Vector3_Impl(alloc3)
    }

    static get get_one(): UnityEngine_Vector3_Impl {
        let start = OffsetManager.getInstance().getOffset("Vector3", "x")
        let end = OffsetManager.getInstance().getOffset("Vector3", "z")
        let alloc3 = alloc(end)
        Il2Cpp.Api.Vector3._get_one(alloc3.add(start))
        UnityEngine_Vector3_Impl.cache.push(alloc3)
        return new UnityEngine_Vector3_Impl(alloc3)
    }

    static get get_forward(): UnityEngine_Vector3_Impl {
        let start = OffsetManager.getInstance().getOffset("Vector3", "x")
        let end = OffsetManager.getInstance().getOffset("Vector3", "z")
        let alloc3 = alloc(end)
        Il2Cpp.Api.Vector3._get_forward(alloc(start))
        UnityEngine_Vector3_Impl.cache.push(alloc3)
        return new UnityEngine_Vector3_Impl(alloc3)
    }

    static get get_back(): UnityEngine_Vector3_Impl {
        let start = OffsetManager.getInstance().getOffset("Vector3", "x")
        let end = OffsetManager.getInstance().getOffset("Vector3", "z")
        let alloc3 = alloc(end)
        Il2Cpp.Api.Vector3._get_back(alloc(start))
        UnityEngine_Vector3_Impl.cache.push(alloc3)
        return new UnityEngine_Vector3_Impl(alloc3)
    }

    static get get_up(): UnityEngine_Vector3_Impl {
        let start = OffsetManager.getInstance().getOffset("Vector3", "x")
        let end = OffsetManager.getInstance().getOffset("Vector3", "z")
        let alloc3 = alloc(end)
        Il2Cpp.Api.Vector3._get_up(alloc(start))
        return new UnityEngine_Vector3_Impl(alloc3)
    }

    static get get_down(): UnityEngine_Vector3_Impl {
        let start = OffsetManager.getInstance().getOffset("Vector3", "x")
        let end = OffsetManager.getInstance().getOffset("Vector3", "z")
        let alloc3 = alloc(end)
        Il2Cpp.Api.Vector3._get_down(alloc(start))
        return new UnityEngine_Vector3_Impl(alloc3)
    }

    static get get_left(): UnityEngine_Vector3_Impl {
        let start = OffsetManager.getInstance().getOffset("Vector3", "x")
        let end = OffsetManager.getInstance().getOffset("Vector3", "z")
        let alloc3 = alloc(end)
        Il2Cpp.Api.Vector3._get_left(alloc(start))
        return new UnityEngine_Vector3_Impl(alloc3)
    }

    static get get_right(): UnityEngine_Vector3_Impl {
        let start = OffsetManager.getInstance().getOffset("Vector3", "x")
        let end = OffsetManager.getInstance().getOffset("Vector3", "z")
        let alloc3 = alloc(end)
        Il2Cpp.Api.Vector3._get_right(alloc(start))
        return new UnityEngine_Vector3_Impl(alloc3)
    }

    static op_Addition(a: UnityEngine_Vector3_Impl, b: UnityEngine_Vector3_Impl): UnityEngine_Vector3_Impl {
        return Il2Cpp.Api.Vector3._op_Addition(a, b)
    }

    static op_Subtraction(a: UnityEngine_Vector3_Impl, b: UnityEngine_Vector3_Impl): UnityEngine_Vector3_Impl {
        return Il2Cpp.Api.Vector3._op_Subtraction(a, b)
    }

    static op_UnaryNegation(a: UnityEngine_Vector3_Impl): UnityEngine_Vector3_Impl {
        return Il2Cpp.Api.Vector3._op_UnaryNegation(a)
    }

    static op_Multiply(a: UnityEngine_Vector3_Impl, d: System_Single): UnityEngine_Vector3_Impl {
        return Il2Cpp.Api.Vector3._op_Multiply(a, d)
    }

    static op_Multiply_2(d: System_Single, a: UnityEngine_Vector3_Impl): UnityEngine_Vector3_Impl {
        return Il2Cpp.Api.Vector3._op_Multiply(d, a)
    }

    static op_Division(a: UnityEngine_Vector3_Impl, d: System_Single): UnityEngine_Vector3_Impl {
        return Il2Cpp.Api.Vector3._op_Division(a, d)
    }

    static op_Equality(lhs: UnityEngine_Vector3_Impl, rhs: UnityEngine_Vector3_Impl): boolean {
        return Il2Cpp.Api.Vector3._op_Equality(lhs, rhs)
    }

    static op_Inequality(lhs: UnityEngine_Vector3_Impl, rhs: UnityEngine_Vector3_Impl): boolean {
        return Il2Cpp.Api.Vector3._op_Inequality(lhs, rhs)
    }

    ToString(): string {
        return readU16(Il2Cpp.Api.Vector3._ToString(this.handle))
    }

    ToString_2(format: string, formatProvider: System_IFormatProvider): string {
        return readU16(Il2Cpp.Api.Vector3._ToString(this.handle, allocUStr(format), formatProvider))
    }

    toString(): string {
        if (this.handle.isNull()) return "null"
        return `${this.x}, ${this.y}, ${this.z}`
    }

    static get _cctor(): void {
        return Il2Cpp.Api.Vector3.__cctor()
    }

}

declare global {
    namespace Il2Cpp {
        class Vector3 extends UnityEngine_Vector3_Impl { }
    }
}

Il2Cpp.Vector3 = UnityEngine_Vector3_Impl

export { UnityEngine_Vector3_Impl }
