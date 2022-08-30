import { System_ValueType_Impl } from "../class"
import { UnityEngine_Color_Impl as Color } from "../Color/class"

type System_IFormatProvider = NativePointer
type System_Byte = NativePointer

class UnityEngine_Color32_Impl extends System_ValueType_Impl {

    rgba: number = lfv(this.handle, "rgba") as unknown as number
    r: System_Byte = lfv(this.handle, "r") as unknown as System_Byte
    g: System_Byte = lfv(this.handle, "g") as unknown as System_Byte
    b: System_Byte = lfv(this.handle, "b") as unknown as System_Byte
    a: System_Byte = lfv(this.handle, "a") as unknown as System_Byte
    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    __ctor(r: System_Byte, g: System_Byte, b: System_Byte, a: System_Byte): void {
        return Il2Cpp.Api.Color32.__ctor(this.handle, r, g, b, a)
    }

    static op_Implicit(c: Color): Color {
        return new Color(Il2Cpp.Api.Color32._op_Implicit(c))
    }

    static op_Implicit_1(c: UnityEngine_Color32_Impl): Color {
        return new Color(Il2Cpp.Api.Color32._op_Implicit(c))
    }

    static Lerp(a: UnityEngine_Color32_Impl, b: UnityEngine_Color32_Impl, t: number): UnityEngine_Color32_Impl {
        return new UnityEngine_Color32_Impl(Il2Cpp.Api.Color32._Lerp(a, b, t))
    }

    ToString(): string {
        return readU16(Il2Cpp.Api.Color32._ToString(this.handle))
    }

    ToString_2(format: string, formatProvider: System_IFormatProvider): string {
        return readU16(Il2Cpp.Api.Color32._ToString(this.handle, format, formatProvider))
    }
}

Il2Cpp.Color32 = UnityEngine_Color32_Impl

declare global {
    namespace Il2Cpp {
        class Color32 extends UnityEngine_Color32_Impl { }
    }
}

export { UnityEngine_Color32_Impl }