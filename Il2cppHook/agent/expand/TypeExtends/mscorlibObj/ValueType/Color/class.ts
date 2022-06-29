import { mscorlib_System_ValueType } from "../class";
import { ColorAPI } from "./api";

class ColorImpl extends mscorlib_System_ValueType implements Il2cppColor {
    r: number
    g: number
    b: number
    a: number

    constructor(mPtr: NativePointer) {
        super(mPtr);
        this.r = mPtr.readU8()
        this.g = mPtr.add(8).readU8()
        this.b = mPtr.add(16).readU8()
        this.a = mPtr.add(24).readU8()
    }

    ctor_3(r: number, g: number, b: number): ColorImpl {
        return new ColorImpl(ColorAPI._ctor_3(this.handle, r, g, b));
    }
    ctor_4(r: number, g: number, b: number, a: number): ColorImpl {
        return new ColorImpl(ColorAPI._ctor_4(this.handle, r, g, b, a));
    }
    Equals_obj(obj: any): boolean {
        return ColorAPI._Equals_obj(this.handle, obj);
    }
    Equals_color(color: ColorImpl): boolean {
        return ColorAPI._Equals_color(this.handle, color.handle);
    }
    GetHashCode(): number {
        return ColorAPI._GetHashCode(this.handle);
    }
    toString(): string {
        return readU16(ColorAPI._toString(this.handle));
    }
    toString_str_IFormatProvider(format: string, provider: any): string {
        return readU16(ColorAPI._ToString_str_IFormatProvider(this.handle, format, provider));
    }
}

declare global {
    namespace Il2Cpp {
        class Color extends ColorImpl { }
    }
}

Il2Cpp.Color = ColorImpl;

export { ColorImpl }