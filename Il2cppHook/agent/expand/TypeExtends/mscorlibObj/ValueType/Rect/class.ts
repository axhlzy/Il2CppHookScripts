import { mscorlib_System_Object_impl as System_Object } from "../../class"
import { UnityEngine_Vector2_Impl as Vector2 } from "../Vector2/class"
import { UnityEngine_Vector3_Impl as Vector3 } from "../Vector3/class"
import { System_Int32_Impl as Int32 } from "../Int32/class"
import { System_ValueType_Impl } from "../class"

type System_IFormatProvider = NativePointer
type UnityEngine_Vector3 = Vector3
type UnityEngine_Vector2 = Vector2
type System_Int32 = Int32
type System_Single = number
type System_Void = void

type System_Boolean = boolean
type System_String = string

class UnityEngine_Rect_Impl extends System_ValueType_Impl {

    m_XMin: System_Single = readSingle(lfv(this.handle, "m_XMin"))
    m_YMin: System_Single = readSingle(lfv(this.handle, "m_YMin"))
    m_Width: System_Single = readSingle(lfv(this.handle, "m_Width"))
    m_Height: System_Single = readSingle(lfv(this.handle, "m_Height"))

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    _ctor_Rect(x: System_Single, y: System_Single, width: System_Single, height: System_Single): System_Void {
        return Il2Cpp.Api.Rect.__ctor(this.handle, x, y, width, height)
    }

    _ctor_Rect_2(position: UnityEngine_Vector2, size: UnityEngine_Vector2): System_Void {
        return Il2Cpp.Api.Rect.__ctor(this.handle, position, size)
    }

    static get_zero(): UnityEngine_Rect_Impl {
        return new UnityEngine_Rect_Impl(Il2Cpp.Api.Rect._get_zero())
    }

    get_x(): System_Single {
        return readSingle(Il2Cpp.Api.Rect._get_x(this.handle))
    }

    set_x(value: System_Single): System_Void {
        return Il2Cpp.Api.Rect._set_x(this.handle, value)
    }

    get_y(): System_Single {
        return readSingle(Il2Cpp.Api.Rect._get_y(this.handle))
    }

    set_y(value: System_Single): System_Void {
        return Il2Cpp.Api.Rect._set_y(this.handle, value)
    }

    get_position(): UnityEngine_Vector2 {
        return new Vector2(Il2Cpp.Api.Rect._get_position(this.handle))
    }

    set_position(value: UnityEngine_Vector2): System_Void {
        return Il2Cpp.Api.Rect._set_position(this.handle, value.handle)
    }

    get_center(): UnityEngine_Vector2 {
        return new Vector2(Il2Cpp.Api.Rect._get_center(this.handle))
    }

    get_min(): UnityEngine_Vector2 {
        return new Vector2(Il2Cpp.Api.Rect._get_min(this.handle))
    }

    get_max(): UnityEngine_Vector2 {
        return new Vector2(Il2Cpp.Api.Rect._get_max(this.handle))
    }

    get_width(): System_Single {
        return readSingle(Il2Cpp.Api.Rect._get_width(this.handle))
    }

    set_width(value: System_Single): System_Void {
        return Il2Cpp.Api.Rect._set_width(this.handle, value)
    }

    get_height(): System_Single {
        return readSingle(Il2Cpp.Api.Rect._get_height(this.handle))
    }

    set_height(value: System_Single): System_Void {
        return Il2Cpp.Api.Rect._set_height(this.handle, value)
    }

    get_size(): UnityEngine_Vector2 {
        return new Vector2(Il2Cpp.Api.Rect._get_size(this.handle))
    }

    get_xMin(): System_Single {
        return readSingle(Il2Cpp.Api.Rect._get_xMin(this.handle))
    }

    set_xMin(value: System_Single): System_Void {
        return Il2Cpp.Api.Rect._set_xMin(this.handle, value)
    }

    get_yMin(): System_Single {
        return readSingle(Il2Cpp.Api.Rect._get_yMin(this.handle))
    }

    set_yMin(value: System_Single): System_Void {
        return Il2Cpp.Api.Rect._set_yMin(this.handle, value)
    }

    get_xMax(): System_Single {
        return readSingle(Il2Cpp.Api.Rect._get_xMax(this.handle))
    }

    set_xMax(value: System_Single): System_Void {
        return Il2Cpp.Api.Rect._set_xMax(this.handle, value)
    }

    get_yMax(): System_Single {
        return readSingle(Il2Cpp.Api.Rect._get_yMax(this.handle))
    }

    set_yMax(value: System_Single): System_Void {
        Il2Cpp.Api.Rect._set_yMax(this.handle, value)
    }

    Contains(point: UnityEngine_Vector2): System_Boolean {
        return readBoolean(Il2Cpp.Api.Rect._Contains(this.handle, point.handle))
    }

    Contains_1(point: UnityEngine_Vector3): System_Boolean {
        return readBoolean(Il2Cpp.Api.Rect._Contains(this.handle, point.handle))
    }

    static OrderMinMax(rect: UnityEngine_Rect_Impl): UnityEngine_Rect_Impl {
        return new UnityEngine_Rect_Impl(Il2Cpp.Api.Rect._OrderMinMax(rect.handle))
    }

    Overlaps(other: UnityEngine_Rect_Impl): System_Boolean {
        return readBoolean(Il2Cpp.Api.Rect._Overlaps(this.handle, other.handle))
    }

    Overlaps_2(other: UnityEngine_Rect_Impl, allowInverse: System_Boolean): System_Boolean {
        return readBoolean(Il2Cpp.Api.Rect._Overlaps(this.handle, other.handle, allowInverse))
    }

    static op_Inequality(lhs: UnityEngine_Rect_Impl, rhs: UnityEngine_Rect_Impl): System_Boolean {
        return readBoolean(Il2Cpp.Api.Rect._op_Inequality(lhs.handle, rhs.handle))
    }

    static op_Equality(lhs: UnityEngine_Rect_Impl, rhs: UnityEngine_Rect_Impl): System_Boolean {
        return readBoolean(Il2Cpp.Api.Rect._op_Equality(lhs.handle, rhs.handle))
    }

    GetHashCode(): System_Int32 {
        return Il2Cpp.Api.Rect._GetHashCode(this.handle)
    }

    Equals(other: System_Object): System_Boolean {
        return readBoolean(Il2Cpp.Api.Rect._Equals(this.handle, other))
    }

    Equals_1(other: UnityEngine_Rect_Impl): System_Boolean {
        return readBoolean(Il2Cpp.Api.Rect._Equals(this.handle, other.handle))
    }

    ToString(): System_String {
        return readU16(Il2Cpp.Api.Rect._ToString(this.handle))
    }

    ToString_2(format: System_String, formatProvider: System_IFormatProvider): System_String {
        return readU16(Il2Cpp.Api.Rect._ToString(this.handle, allocUStr(format), formatProvider))
    }

}

Il2Cpp.Rect = UnityEngine_Rect_Impl

declare global {
    namespace Il2Cpp {
        class Rect extends UnityEngine_Rect_Impl { }
    }
}

export { UnityEngine_Rect_Impl as UnityEngine_Rect }
