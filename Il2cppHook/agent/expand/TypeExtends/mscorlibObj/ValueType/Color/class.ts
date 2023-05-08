import { UnityEngine_Object } from "../../Object/class"
import { System_ValueType_Impl } from "../class"
import { System_Int32_Impl as System_Int32 } from "../Int32/class"


type System_IFormatProvider = NativePointer
type UnityEngine_Vector4 = NativePointer

class UnityEngine_Color_Impl extends System_ValueType_Impl {

    r: number = lfv(this.handle, "r") as unknown as number
    g: number = lfv(this.handle, "g") as unknown as number
    b: number = lfv(this.handle, "b") as unknown as number
    a: number = lfv(this.handle, "a") as unknown as number

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    _ctor_rgba(r: number, g: number, b: number, a: number): void {
        return Il2Cpp.Api.Color.__ctor(this.handle, r, g, b, a)
    }

    _ctor_rgb(r: number, g: number, b: number): void {
        return Il2Cpp.Api.Color.__ctor(this.handle, r, g, b)
    }

    ToString(): string {
        // return readU16(Il2Cpp.Api.Color._ToString(this.handle))
        return "TODO..."
    }

    toString(): string {
        return "TODO..."
    }

    ToString_2(format: string, formatProvider: System_IFormatProvider): string {
        return readU16(Il2Cpp.Api.Color._ToString(this.handle, format, formatProvider))
    }

    GetHashCode(): System_Int32 {
        return Il2Cpp.Api.Color._GetHashCode(this.handle)
    }

    Equals_obj(other: UnityEngine_Object): boolean {
        return Il2Cpp.Api.Color._Equals(this.handle, other)
    }

    Equals_color(other: UnityEngine_Color_Impl): boolean {
        return Il2Cpp.Api.Color._Equals(this.handle, other)
    }

    static op_Addition(a: UnityEngine_Color_Impl, b: UnityEngine_Color_Impl): UnityEngine_Color_Impl {
        return Il2Cpp.Api.Color._op_Addition(a, b)
    }

    static op_Subtraction(a: UnityEngine_Color_Impl, b: UnityEngine_Color_Impl): UnityEngine_Color_Impl {
        return Il2Cpp.Api.Color._op_Subtraction(a, b)
    }

    static op_Multiply_color_color(a: UnityEngine_Color_Impl, b: UnityEngine_Color_Impl): UnityEngine_Color_Impl {
        return Il2Cpp.Api.Color._op_Multiply(a, b)
    }

    static op_Multiply_color_number(a: UnityEngine_Color_Impl, b: number): UnityEngine_Color_Impl {
        return Il2Cpp.Api.Color._op_Multiply(a, b)
    }

    static op_Equality(lhs: UnityEngine_Color_Impl, rhs: UnityEngine_Color_Impl): boolean {
        return Il2Cpp.Api.Color._op_Equality(lhs, rhs)
    }

    static Lerp(a: UnityEngine_Color_Impl, b: UnityEngine_Color_Impl, t: number): UnityEngine_Color_Impl {
        return Il2Cpp.Api.Color._Lerp(a, b, t)
    }

    RGBMultiplied(multiplier: number): UnityEngine_Color_Impl {
        return Il2Cpp.Api.Color._RGBMultiplied(this.handle, multiplier)
    }

    static get_red(): UnityEngine_Color_Impl {
        return Il2Cpp.Api.Color._get_red()
    }

    static get_green(): UnityEngine_Color_Impl {
        return Il2Cpp.Api.Color._get_green()
    }

    static get_blue(): UnityEngine_Color_Impl {
        return Il2Cpp.Api.Color._get_blue()
    }

    static get_white(): UnityEngine_Color_Impl {
        return Il2Cpp.Api.Color._get_white()
    }

    static get_black(): UnityEngine_Color_Impl {
        return Il2Cpp.Api.Color._get_black()
    }

    static get_yellow(): UnityEngine_Color_Impl {
        return Il2Cpp.Api.Color._get_yellow()
    }

    static get_magenta(): UnityEngine_Color_Impl {
        return Il2Cpp.Api.Color._get_magenta()
    }

    static get_gray(): UnityEngine_Color_Impl {
        return Il2Cpp.Api.Color._get_gray()
    }

    static get_clear(): UnityEngine_Color_Impl {
        return Il2Cpp.Api.Color._get_clear()
    }

    get_linear(): UnityEngine_Color_Impl {
        return Il2Cpp.Api.Color._get_linear(this.handle)
    }

    get_maxColorComponent(): number {
        return Il2Cpp.Api.Color._get_maxColorComponent(this.handle)
    }

    static op_Implicit_UnityEngine_Color_Impl(c: UnityEngine_Color_Impl): UnityEngine_Vector4 {
        return Il2Cpp.Api.Color._op_Implicit(c)
    }

    static op_Implicit_UnityEngine_Vector4(v: UnityEngine_Vector4): UnityEngine_Color_Impl {
        return Il2Cpp.Api.Color._op_Implicit(v)
    }

}

Il2Cpp.Color = UnityEngine_Color_Impl

declare global {
    namespace Il2Cpp {
        class Color extends UnityEngine_Color_Impl { }
    }
}

export { UnityEngine_Color_Impl }