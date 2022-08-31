import { mscorlib_System_Object_impl as System_Object } from "../../class"
import { System_ValueType_Impl as System_ValueType } from "../class"
import { System_Int32_Impl as System_Int32 } from "../Int32/class"

type System_IFormatProvider = NativePointer
type System_TypeCode = NativePointer
type System_Char = NativePointer
type System_SByte = NativePointer
type System_Byte = NativePointer
type System_Int16 = NativePointer
type System_UInt16 = NativePointer
type System_UInt32 = NativePointer
type System_UInt64 = NativePointer
type System_Decimal = NativePointer
type System_DateTime = NativePointer

class System_Boolean_Impl extends System_ValueType {

    m_value: boolean = !lfv(this.handle, "m_value").isNull()
    True: number = lfv(this.handle, "True").toInt32()
    False: number = lfv(this.handle, "False").toInt32()
    TrueLiteral: string = readU16(lfv(this.handle, "TrueLiteral"))
    FalseLiteral: string = readU16(lfv(this.handle, "FalseLiteral"))
    TrueString: string = readU16(lfv(this.handle, "TrueString"))
    FalseString: string = readU16(lfv(this.handle, "FalseString"))

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    GetHashCode(): System_Int32 {
        return mscorlib.Api.Boolean._GetHashCode(this.handle)
    }

    ToString(): string {
        return readU16(mscorlib.Api.Boolean._ToString(this.handle))
    }

    ToString_1(provider: System_IFormatProvider): string {
        return readU16(mscorlib.Api.Boolean._ToString(this.handle, provider))
    }

    Equals(obj: System_Object): boolean {
        return !mscorlib.Api.Boolean._Equals(this.handle, obj.handle).isNull()
    }

    Equals_1(obj: boolean): boolean {
        return mscorlib.Api.Boolean._Equals(this.handle, obj)
    }

    CompareTo(obj: System_Object): number {
        return mscorlib.Api.Boolean._CompareTo(this.handle, obj.handle)
    }

    CompareTo_1(value: boolean): number {
        return mscorlib.Api.Boolean._CompareTo(this.handle, value)
    }

    static Parse(value: string): boolean {
        return !mscorlib.Api.Boolean._Parse(allocUStr(value)).isNull()
    }

    static TryParse(value: string, result: boolean): boolean {
        return !mscorlib.Api.Boolean._TryParse(allocUStr(value), result).isNull()
    }

    static TrimWhiteSpaceAndNull(value: string): string {
        return readU16(mscorlib.Api.Boolean._TrimWhiteSpaceAndNull(value))
    }

    GetTypeCode(): System_TypeCode {
        return mscorlib.Api.Boolean._GetTypeCode(this.handle)
    }

    System_IConvertible_ToBoolean(provider: System_IFormatProvider): boolean {
        return mscorlib.Api.Boolean._System_IConvertible_ToBoolean(this.handle, provider)
    }

    System_IConvertible_ToChar(provider: System_IFormatProvider): System_Char {
        return mscorlib.Api.Boolean._System_IConvertible_ToChar(this.handle, provider)
    }

    System_IConvertible_ToSByte(provider: System_IFormatProvider): System_SByte {
        return mscorlib.Api.Boolean._System_IConvertible_ToSByte(this.handle, provider)
    }

    System_IConvertible_ToByte(provider: System_IFormatProvider): System_Byte {
        return mscorlib.Api.Boolean._System_IConvertible_ToByte(this.handle, provider)
    }

    System_IConvertible_ToInt16(provider: System_IFormatProvider): System_Int16 {
        return mscorlib.Api.Boolean._System_IConvertible_ToInt16(this.handle, provider)
    }

    System_IConvertible_ToUInt16(provider: System_IFormatProvider): System_UInt16 {
        return mscorlib.Api.Boolean._System_IConvertible_ToUInt16(this.handle, provider)
    }

    System_IConvertible_ToInt32(provider: System_IFormatProvider): number {
        return mscorlib.Api.Boolean._System_IConvertible_ToInt32(this.handle, provider)
    }

    System_IConvertible_ToUInt32(provider: System_IFormatProvider): System_UInt32 {
        return mscorlib.Api.Boolean._System_IConvertible_ToUInt32(this.handle, provider)
    }

    System_IConvertible_ToInt64(provider: System_IFormatProvider): number {
        return mscorlib.Api.Boolean._System_IConvertible_ToInt64(this.handle, provider)
    }

    System_IConvertible_ToUInt64(provider: System_IFormatProvider): System_UInt64 {
        return mscorlib.Api.Boolean._System_IConvertible_ToUInt64(this.handle, provider)
    }

    System_IConvertible_ToSingle(provider: System_IFormatProvider): number {
        return mscorlib.Api.Boolean._System_IConvertible_ToSingle(this.handle, provider)
    }

    System_IConvertible_ToDouble(provider: System_IFormatProvider): number {
        return mscorlib.Api.Boolean._System_IConvertible_ToDouble(this.handle, provider)
    }

    System_IConvertible_ToDecimal(provider: System_IFormatProvider): System_Decimal {
        return mscorlib.Api.Boolean._System_IConvertible_ToDecimal(this.handle, provider)
    }

    System_IConvertible_ToDateTime(provider: System_IFormatProvider): System_DateTime {
        return mscorlib.Api.Boolean._System_IConvertible_ToDateTime(this.handle, provider)
    }

    System_IConvertible_ToType(type: System_ValueType, provider: System_IFormatProvider): System_Object {
        return mscorlib.Api.Boolean._System_IConvertible_ToType(this.handle, type, provider)
    }

    static _cctor(): void {
        return mscorlib.Api.Boolean.__cctor()
    }

}

mscorlib.Boolean = System_Boolean_Impl

declare global {
    namespace mscorlib {
        class Boolean extends System_Boolean_Impl { }
    }
}

export { System_Boolean_Impl }