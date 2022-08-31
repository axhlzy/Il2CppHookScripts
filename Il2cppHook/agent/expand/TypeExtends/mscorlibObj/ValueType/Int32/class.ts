import { mscorlib_System_Object_impl as System_Object } from "../../class"
import { System_ValueType_Impl as System_ValueType } from "../class"

type System_IFormatProvider = NativePointer
type System_Globalization_NumberStyles = NativePointer
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

class System_Int32_Impl extends System_ValueType {

    m_value: number = lfv(this.handle, "m_value").toInt32()
    MaxValue: number = lfv(this.handle, "MaxValue").toInt32()
    MinValue: number = lfv(this.handle, "MinValue").toInt32()

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    CompareTo(value: System_Object): number {
        return mscorlib.Api.Int32._CompareTo(this.handle, value.handle).toInt32()
    }

    CompareTo_1(value: number): number {
        return mscorlib.Api.Int32._CompareTo(this.handle, value).toInt32()
    }

    Equals(obj: System_Object): boolean {
        return !mscorlib.Api.Int32._Equals(this.handle, obj.handle).isNull()
    }

    Equals_1(obj: number): boolean {
        return mscorlib.Api.Int32._Equals(this.handle, obj)
    }

    GetHashCode(): System_Int32_Impl {
        return mscorlib.Api.Int32._GetHashCode(this.handle).toInt32()
    }

    ToString(): string {
        return readU16(mscorlib.Api.Int32._ToString(this.handle))
    }

    ToString_formart(format: string): string {
        return readU16(mscorlib.Api.Int32._ToString(this.handle, allocUStr(format)))
    }

    ToString_provider(provider: System_IFormatProvider): string {
        return readU16(mscorlib.Api.Int32._ToString(this.handle, provider))
    }

    ToString_2(format: string, provider: System_IFormatProvider): string {
        return readU16(mscorlib.Api.Int32._ToString(this.handle, format, provider))
    }

    static Parse(s: string): number {
        return mscorlib.Api.Int32._Parse(allocUStr(s))
    }

    static Parse_2(s: string, style: System_Globalization_NumberStyles): number {
        return mscorlib.Api.Int32._Parse(s, style)
    }

    static Parse_s_p(s: string, provider: System_IFormatProvider): number {
        return mscorlib.Api.Int32._Parse(s, provider)
    }

    static Parse_3(s: string, style: System_Globalization_NumberStyles, provider: System_IFormatProvider): number {
        return mscorlib.Api.Int32._Parse(s, style, provider)
    }

    static TryParse(s: string, result: number): boolean {
        return mscorlib.Api.Int32._TryParse(s, result)
    }

    static TryParse_4(s: string, style: System_Globalization_NumberStyles, provider: System_IFormatProvider, result: number): boolean {
        return mscorlib.Api.Int32._TryParse(s, style, provider, result)
    }

    GetTypeCode(): System_TypeCode {
        return mscorlib.Api.Int32._GetTypeCode(this.handle)
    }

    System_IConvertible_ToBoolean(provider: System_IFormatProvider): boolean {
        return mscorlib.Api.Int32._System_IConvertible_ToBoolean(this.handle, provider)
    }

    System_IConvertible_ToChar(provider: System_IFormatProvider): System_Char {
        return mscorlib.Api.Int32._System_IConvertible_ToChar(this.handle, provider)
    }

    System_IConvertible_ToSByte(provider: System_IFormatProvider): System_SByte {
        return mscorlib.Api.Int32._System_IConvertible_ToSByte(this.handle, provider)
    }

    System_IConvertible_ToByte(provider: System_IFormatProvider): System_Byte {
        return mscorlib.Api.Int32._System_IConvertible_ToByte(this.handle, provider)
    }

    System_IConvertible_ToInt16(provider: System_IFormatProvider): System_Int16 {
        return mscorlib.Api.Int32._System_IConvertible_ToInt16(this.handle, provider)
    }

    System_IConvertible_ToUInt16(provider: System_IFormatProvider): System_UInt16 {
        return mscorlib.Api.Int32._System_IConvertible_ToUInt16(this.handle, provider)
    }

    System_IConvertible_ToInt32(provider: System_IFormatProvider): number {
        return mscorlib.Api.Int32._System_IConvertible_ToInt32(this.handle, provider)
    }

    System_IConvertible_ToUInt32(provider: System_IFormatProvider): System_UInt32 {
        return mscorlib.Api.Int32._System_IConvertible_ToUInt32(this.handle, provider)
    }

    System_IConvertible_ToInt64(provider: System_IFormatProvider): number {
        return mscorlib.Api.Int32._System_IConvertible_ToInt64(this.handle, provider)
    }

    System_IConvertible_ToUInt64(provider: System_IFormatProvider): System_UInt64 {
        return mscorlib.Api.Int32._System_IConvertible_ToUInt64(this.handle, provider)
    }

    System_IConvertible_ToSingle(provider: System_IFormatProvider): number {
        return mscorlib.Api.Int32._System_IConvertible_ToSingle(this.handle, provider)
    }

    System_IConvertible_ToDouble(provider: System_IFormatProvider): number {
        return mscorlib.Api.Int32._System_IConvertible_ToDouble(this.handle, provider)
    }

    System_IConvertible_ToDecimal(provider: System_IFormatProvider): System_Decimal {
        return mscorlib.Api.Int32._System_IConvertible_ToDecimal(this.handle, provider)
    }

    System_IConvertible_ToDateTime(provider: System_IFormatProvider): System_DateTime {
        return mscorlib.Api.Int32._System_IConvertible_ToDateTime(this.handle, provider)
    }

    System_IConvertible_ToType(type: System_ValueType, provider: System_IFormatProvider): System_Object {
        return mscorlib.Api.Int32._System_IConvertible_ToType(this.handle, type, provider)
    }

}

mscorlib.Int32 = System_Int32_Impl

declare global {
    namespace mscorlib {
        class Int32 extends System_Int32_Impl { }
    }
}

export { System_Int32_Impl }