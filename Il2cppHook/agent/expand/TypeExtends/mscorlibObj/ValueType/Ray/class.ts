import { System_ValueType_Impl } from "../class"
import { UnityEngine_Vector3_Impl as Vector3 } from "../Vector3/class"

type System_IFormatProvider = NativePointer

class UnityEngine_Ray_Impl extends System_ValueType_Impl {

    m_Origin: Vector3 = lfv(this.handle, "m_Origin") as unknown as Vector3
    m_Direction: Vector3 = lfv(this.handle, "m_Direction") as unknown as Vector3

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    __ctor(origin: Vector3, direction: Vector3): void {
        return Il2Cpp.Api.Ray.__ctor(this.handle, origin.handle, direction.handle)
    }

    get_origin(): Vector3 {
        return new Vector3(Il2Cpp.Api.Ray._get_origin(this.handle))
    }

    set_origin(value: Vector3): void {
        return Il2Cpp.Api.Ray._set_origin(this.handle, value.handle)
    }

    get_direction(): Vector3 {
        return new Vector3(Il2Cpp.Api.Ray._get_direction(this.handle))
    }

    set_direction(value: Vector3): void {
        return Il2Cpp.Api.Ray._set_direction(this.handle, value)
    }

    GetPoint(distance: number): Vector3 {
        return new Vector3(Il2Cpp.Api.Ray._GetPoint(this.handle, distance))
    }

    ToString(): string {
        return readU16(Il2Cpp.Api.Ray._ToString(this.handle))
    }

    ToString_2(format: string, formatProvider: System_IFormatProvider): string {
        return readU16(Il2Cpp.Api.Ray._ToString(this.handle, format, formatProvider))
    }
}

Il2Cpp.Ray = UnityEngine_Ray_Impl

declare global {
    namespace Il2Cpp {
        class Ray extends UnityEngine_Ray_Impl { }
    }
}

export { UnityEngine_Ray_Impl }