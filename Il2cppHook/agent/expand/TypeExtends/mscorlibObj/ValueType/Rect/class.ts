import { mscorlib_System_Object_impl as System_Object } from "../../class"
import { System_ValueType_Impl } from "../class"
import { System_Int32_Impl } from "../Int32/class"
import { UnityEngine_Vector2_Impl as Vector2 } from "../Vector2/class"
import { UnityEngine_Vector3_Impl as Vector3 } from "../Vector3/class"

type System_IFormatProvider = NativePointer

class UnityEngine_Rect_Impl extends System_ValueType_Impl {

    m_XMin: number = lfv(this.handle, "m_XMin") as unknown as number
    m_YMin: number = lfv(this.handle, "m_YMin") as unknown as number
    m_Width: number = lfv(this.handle, "m_Width") as unknown as number
    m_Height: number = lfv(this.handle, "m_Height") as unknown as number


    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    __ctor(x: number, y: number, width: number, height: number): void {
        return Il2Cpp.Api.Rect.__ctor(this.handle, x, y, width, height)
    }

    _ctor_2(position: Vector2, size: Vector2): void {
        return Il2Cpp.Api.Rect.__ctor(this.handle, position, size)
    }

    _ctor_1(source: UnityEngine_Rect_Impl): void {
        return Il2Cpp.Api.Rect.__ctor(this.handle, source)
    }

    static get_zero(): UnityEngine_Rect_Impl {
        return new UnityEngine_Rect_Impl(Il2Cpp.Api.Rect._get_zero())
    }

    get_x(): number {
        return Il2Cpp.Api.Rect._get_x(this.handle)
    }

    set_x(value: number): void {
        return Il2Cpp.Api.Rect._set_x(this.handle, value)
    }

    get_y(): number {
        return Il2Cpp.Api.Rect._get_y(this.handle)
    }

    set_y(value: number): void {
        return Il2Cpp.Api.Rect._set_y(this.handle, value)
    }

    get_position(): Vector2 {
        return new Vector2(Il2Cpp.Api.Rect._get_position(this.handle))
    }

    set_position(value: Vector2): void {
        return Il2Cpp.Api.Rect._set_position(this.handle, value.handle)
    }

    get_center(): Vector2 {
        return new Vector2(Il2Cpp.Api.Rect._get_center(this.handle))
    }

    get_min(): Vector2 {
        return new Vector2(Il2Cpp.Api.Rect._get_min(this.handle))
    }

    get_max(): Vector2 {
        return Il2Cpp.Api.Rect._get_max(this.handle)
    }

    get_width(): number {
        return Il2Cpp.Api.Rect._get_width(this.handle)
    }

    set_width(value: number): void {
        return Il2Cpp.Api.Rect._set_width(this.handle, value)
    }

    get_height(): number {
        return Il2Cpp.Api.Rect._get_height(this.handle)
    }

    set_height(value: number): void {
        return Il2Cpp.Api.Rect._set_height(this.handle, value)
    }

    get_size(): Vector2 {
        return new Vector2(Il2Cpp.Api.Rect._get_size(this.handle))
    }

    get_xMin(): number {
        return Il2Cpp.Api.Rect._get_xMin(this.handle)
    }

    set_xMin(value: number): void {
        return Il2Cpp.Api.Rect._set_xMin(this.handle, value)
    }

    get_yMin(): number {
        return Il2Cpp.Api.Rect._get_yMin(this.handle)
    }

    set_yMin(value: number): void {
        return Il2Cpp.Api.Rect._set_yMin(this.handle, value)
    }

    get_xMax(): number {
        return Il2Cpp.Api.Rect._get_xMax(this.handle)
    }

    set_xMax(value: number): void {
        return Il2Cpp.Api.Rect._set_xMax(this.handle, value)
    }

    get_yMax(): number {
        return Il2Cpp.Api.Rect._get_yMax(this.handle)
    }

    set_yMax(value: number): void {
        return Il2Cpp.Api.Rect._set_yMax(this.handle, value)
    }

    Contains(point: Vector2): boolean {
        return Il2Cpp.Api.Rect._Contains(this.handle, point.handle)
    }

    Contains_1(point: Vector3): boolean {
        return Il2Cpp.Api.Rect._Contains(this.handle, point.handle)
    }

    static OrderMinMax(rect: UnityEngine_Rect_Impl): UnityEngine_Rect_Impl {
        return new UnityEngine_Rect_Impl(Il2Cpp.Api.Rect._OrderMinMax(rect.handle))
    }

    Overlaps(other: UnityEngine_Rect_Impl): boolean {
        return Il2Cpp.Api.Rect._Overlaps(this.handle, other.handle)
    }

    Overlaps_2(other: UnityEngine_Rect_Impl, allowInverse: boolean): boolean {
        return Il2Cpp.Api.Rect._Overlaps(this.handle, other.handle, allowInverse)
    }

    static op_Inequality(lhs: UnityEngine_Rect_Impl, rhs: UnityEngine_Rect_Impl): boolean {
        return Il2Cpp.Api.Rect._op_Inequality(lhs.handle, rhs.handle)
    }

    static op_Equality(lhs: UnityEngine_Rect_Impl, rhs: UnityEngine_Rect_Impl): boolean {
        return Il2Cpp.Api.Rect._op_Equality(lhs.handle, rhs.handle)
    }

    GetHashCode(): System_Int32_Impl {
        return Il2Cpp.Api.Rect._GetHashCode(this.handle)
    }

    Equals(other: System_Object): boolean {
        return Il2Cpp.Api.Rect._Equals(this.handle, other.handle)
    }

    Equals_1(other: UnityEngine_Rect_Impl): boolean {
        return Il2Cpp.Api.Rect._Equals(this.handle, other.handle)
    }

    ToString(): string {
        return readU16(Il2Cpp.Api.Rect._ToString(this.handle))
    }

    ToString_2(format: string, formatProvider: System_IFormatProvider): string {
        return readU16(Il2Cpp.Api.Rect._ToString(this.handle, format, formatProvider))
    }
}

Il2Cpp.Rect = UnityEngine_Rect_Impl

declare global {
    namespace Il2Cpp {
        class Rect extends UnityEngine_Rect_Impl { }
    }
}

export { UnityEngine_Rect_Impl }
