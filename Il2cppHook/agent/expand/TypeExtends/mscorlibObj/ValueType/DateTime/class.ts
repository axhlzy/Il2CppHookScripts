import { mscorlib_System_Object_impl as System_Object } from "../../class"
import { System_ValueType_Impl as System_ValueType, System_ValueType_Impl } from "../class"
import { System_Int32_Impl as System_Int32 } from "../Int32/class"

type System_Char = NativePointer
type System_SByte = NativePointer
type System_Byte = NativePointer
type System_Int16 = NativePointer
type System_UInt16 = NativePointer
type System_UInt32 = NativePointer
type System_UInt64 = NativePointer
type System_String = NativePointer
type System_Decimal = NativePointer
type System_IFormatProvider = NativePointer
type System_TimeSpan = NativePointer
type System_DayOfWeek = NativePointer
type System_DateTimeKind = NativePointer
type System_TypeCode = NativePointer
type System_DateTime_ImplKind = NativePointer
type System_Runtime_Serialization_SerializationInfo = NativePointer
type System_Runtime_Serialization_StreamingContext = NativePointer
type System_Globalization_DateTimeStyles = NativePointer

class System_DateTime_Impl extends System_ValueType {

    TicksPerMillisecond: System_Int32 = lfv(this.handle, "TicksPerMillisecond") as unknown as System_Int32
    TicksPerSecond: System_Int32 = lfv(this.handle, "TicksPerSecond") as unknown as System_Int32
    TicksPerMinute: System_Int32 = lfv(this.handle, "TicksPerMinute") as unknown as System_Int32
    TicksPerHour: System_Int32 = lfv(this.handle, "TicksPerHour") as unknown as System_Int32
    TicksPerDay: System_Int32 = lfv(this.handle, "TicksPerDay") as unknown as System_Int32
    MillisPerSecond: System_Int32 = lfv(this.handle, "MillisPerSecond") as unknown as System_Int32
    MillisPerMinute: System_Int32 = lfv(this.handle, "MillisPerMinute") as unknown as System_Int32
    MillisPerHour: System_Int32 = lfv(this.handle, "MillisPerHour") as unknown as System_Int32
    MillisPerDay: System_Int32 = lfv(this.handle, "MillisPerDay") as unknown as System_Int32
    DaysPerYear: System_Int32 = lfv(this.handle, "DaysPerYear") as unknown as System_Int32
    DaysPer4Years: System_Int32 = lfv(this.handle, "DaysPer4Years") as unknown as System_Int32
    DaysPer100Years: System_Int32 = lfv(this.handle, "DaysPer100Years") as unknown as System_Int32
    DaysPer400Years: System_Int32 = lfv(this.handle, "DaysPer400Years") as unknown as System_Int32
    DaysTo1601: System_Int32 = lfv(this.handle, "DaysTo1601") as unknown as System_Int32
    DaysTo1899: System_Int32 = lfv(this.handle, "DaysTo1899") as unknown as System_Int32
    DaysTo1970: System_Int32 = lfv(this.handle, "DaysTo1970") as unknown as System_Int32
    DaysTo10000: System_Int32 = lfv(this.handle, "DaysTo10000") as unknown as System_Int32
    MinTicks: System_Int32 = lfv(this.handle, "MinTicks") as unknown as System_Int32
    MaxTicks: System_Int32 = lfv(this.handle, "MaxTicks") as unknown as System_Int32
    MaxMillis: System_Int32 = lfv(this.handle, "MaxMillis") as unknown as System_Int32
    FileTimeOffset: System_Int32 = lfv(this.handle, "FileTimeOffset") as unknown as System_Int32
    DoubleDateOffset: System_Int32 = lfv(this.handle, "DoubleDateOffset") as unknown as System_Int32
    OADateMinAsTicks: System_Int32 = lfv(this.handle, "OADateMinAsTicks") as unknown as System_Int32
    OADateMinAsDouble: System_Int32 = lfv(this.handle, "OADateMinAsDouble") as unknown as System_Int32
    OADateMaxAsDouble: System_Int32 = lfv(this.handle, "OADateMaxAsDouble") as unknown as System_Int32
    DatePartYear: System_Int32 = lfv(this.handle, "DatePartYear") as unknown as System_Int32
    DatePartDayOfYear: System_Int32 = lfv(this.handle, "DatePartDayOfYear") as unknown as System_Int32
    DatePartMonth: System_Int32 = lfv(this.handle, "DatePartMonth") as unknown as System_Int32
    DatePartDay: System_Int32 = lfv(this.handle, "DatePartDay") as unknown as System_Int32
    DaysToMonth365: System_Int32[] = lfv(this.handle, "DaysToMonth365") as unknown as System_Int32[]
    DaysToMonth366: System_Int32[] = lfv(this.handle, "DaysToMonth366") as unknown as System_Int32[]
    MinValue: System_DateTime_Impl = new System_DateTime_Impl(lfv(this.handle, "MinValue"))
    MaxValue: System_DateTime_Impl = new System_DateTime_Impl(lfv(this.handle, "MaxValue"))
    TicksMask: System_UInt64 = lfv(this.handle, "TicksMask") as unknown as System_UInt64
    FlagsMask: System_UInt64 = lfv(this.handle, "FlagsMask") as unknown as System_UInt64
    LocalMask: System_UInt64 = lfv(this.handle, "LocalMask") as unknown as System_UInt64
    TicksCeiling: System_Int32 = lfv(this.handle, "TicksCeiling") as unknown as System_Int32
    KindUnspecified: System_UInt64 = lfv(this.handle, "KindUnspecified") as unknown as System_UInt64
    KindUtc: System_UInt64 = lfv(this.handle, "KindUtc") as unknown as System_UInt64
    KindLocal: System_UInt64 = lfv(this.handle, "KindLocal") as unknown as System_UInt64
    KindLocalAmbiguousDst: System_UInt64 = lfv(this.handle, "KindLocalAmbiguousDst") as unknown as System_UInt64
    KindShift: System_Int32 = lfv(this.handle, "KindShift") as unknown as System_Int32
    TicksField: string = lfv(this.handle, "TicksField") as unknown as string
    DateDataField: string = lfv(this.handle, "DateDataField") as unknown as string
    dateData: System_UInt64 = lfv(this.handle, "dateData") as unknown as System_UInt64
    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }
    _ctor_System_Int32(ticks: System_Int32): void {
        return mscorlib.Api.DateTime.__ctor(this.handle, ticks)
    }

    _ctor_Uint64(dateData: System_UInt64): void {
        return mscorlib.Api.DateTime.__ctor(this.handle, dateData)
    }

    _ctor_num_kid(ticks: System_Int32, kind: System_DateTimeKind): void {
        return mscorlib.Api.DateTime.__ctor(this.handle, ticks, kind)
    }

    _ctor_3(ticks: System_Int32, kind: System_DateTimeKind, isAmbiguousDst: boolean): void {
        return mscorlib.Api.DateTime.__ctor(this.handle, ticks, kind, isAmbiguousDst)
    }

    _ctor_year_month_day(year: System_Int32, month: System_Int32, day: System_Int32): void {
        return mscorlib.Api.DateTime.__ctor(this.handle, year, month, day)
    }

    _ctor_6(year: System_Int32, month: System_Int32, day: System_Int32, hour: System_Int32, minute: System_Int32, second: System_Int32): void {
        return mscorlib.Api.DateTime.__ctor(this.handle, year, month, day, hour, minute, second)
    }

    _ctor_7(year: System_Int32, month: System_Int32, day: System_Int32, hour: System_Int32, minute: System_Int32, second: System_Int32, millisecond: System_Int32): void {
        return mscorlib.Api.DateTime.__ctor(this.handle, year, month, day, hour, minute, second, millisecond)
    }

    _ctor_8(year: System_Int32, month: System_Int32, day: System_Int32, hour: System_Int32, minute: System_Int32, second: System_Int32, millisecond: System_Int32, kind: System_DateTimeKind): void {
        return mscorlib.Api.DateTime.__ctor(this.handle, year, month, day, hour, minute, second, millisecond, kind)
    }

    _ctor_2(info: System_Runtime_Serialization_SerializationInfo, context: System_Runtime_Serialization_StreamingContext): void {
        return mscorlib.Api.DateTime.__ctor(this.handle, info, context)
    }

    get_InternalTicks(): System_Int32 {
        return mscorlib.Api.DateTime._get_InternalTicks(this.handle)
    }

    get_InternalKind(): System_UInt64 {
        return mscorlib.Api.DateTime._get_InternalKind(this.handle)
    }

    Add(value: System_TimeSpan): System_DateTime_Impl {
        return mscorlib.Api.DateTime._Add(this.handle, value)
    }

    Add_2(value: System_Int32, scale: System_Int32): System_DateTime_Impl {
        return mscorlib.Api.DateTime._Add(this.handle, value, scale)
    }

    AddDays(value: System_Int32): System_DateTime_Impl {
        return mscorlib.Api.DateTime._AddDays(this.handle, value)
    }

    AddHours(value: System_Int32): System_DateTime_Impl {
        return mscorlib.Api.DateTime._AddHours(this.handle, value)
    }

    AddMilliseconds(value: System_Int32): System_DateTime_Impl {
        return mscorlib.Api.DateTime._AddMilliseconds(this.handle, value)
    }

    AddMinutes(value: System_Int32): System_DateTime_Impl {
        return mscorlib.Api.DateTime._AddMinutes(this.handle, value)
    }

    AddMonths(months: System_Int32): System_DateTime_Impl {
        return mscorlib.Api.DateTime._AddMonths(this.handle, months)
    }

    AddSeconds(value: System_Int32): System_DateTime_Impl {
        return mscorlib.Api.DateTime._AddSeconds(this.handle, value)
    }

    AddTicks(value: System_Int32): System_DateTime_Impl {
        return mscorlib.Api.DateTime._AddTicks(this.handle, value)
    }

    AddYears(value: System_Int32): System_DateTime_Impl {
        return mscorlib.Api.DateTime._AddYears(this.handle, value)
    }

    CompareTo(value: System_Object): System_Int32 {
        return mscorlib.Api.DateTime._CompareTo(this.handle, value)
    }

    CompareTo_1(value: System_DateTime_Impl): System_Int32 {
        return mscorlib.Api.DateTime._CompareTo(this.handle, value)
    }

    static DateToTicks(year: System_Int32, month: System_Int32, day: System_Int32): System_Int32 {
        return mscorlib.Api.DateTime._DateToTicks(year, month, day)
    }

    static TimeToTicks(hour: System_Int32, minute: System_Int32, second: System_Int32): System_Int32 {
        return mscorlib.Api.DateTime._TimeToTicks(hour, minute, second)
    }

    static DaysInMonth(year: System_Int32, month: System_Int32): System_Int32 {
        return mscorlib.Api.DateTime._DaysInMonth(year, month)
    }

    Equals(value: System_Object): boolean {
        return mscorlib.Api.DateTime._Equals(this.handle, value)
    }

    Equals_1(value: System_DateTime_Impl): boolean {
        return mscorlib.Api.DateTime._Equals(this.handle, value)
    }

    static FromBinary(dateData: System_Int32): System_DateTime_Impl {
        return mscorlib.Api.DateTime._FromBinary(dateData)
    }

    static FromBinaryRaw(dateData: System_Int32): System_DateTime_Impl {
        return mscorlib.Api.DateTime._FromBinaryRaw(dateData)
    }

    static SpecifyKind(value: System_DateTime_Impl, kind: System_DateTime_ImplKind): System_DateTime_Impl {
        return mscorlib.Api.DateTime._SpecifyKind(value, kind)
    }

    ToBinaryRaw(): System_Int32 {
        return mscorlib.Api.DateTime._ToBinaryRaw(this.handle)
    }

    get_Date(): System_DateTime_Impl {
        return mscorlib.Api.DateTime._get_Date(this.handle)
    }

    GetDatePart(part: System_Int32): System_Int32 {
        return mscorlib.Api.DateTime._GetDatePart(this.handle, part)
    }

    get_Day(): System_Int32 {
        return mscorlib.Api.DateTime._get_Day(this.handle)
    }

    get_DayOfWeek(): System_DayOfWeek {
        return mscorlib.Api.DateTime._get_DayOfWeek(this.handle)
    }

    GetHashCode(): System_Int32 {
        return mscorlib.Api.DateTime._GetHashCode(this.handle)
    }

    get_Hour(): System_Int32 {
        return mscorlib.Api.DateTime._get_Hour(this.handle)
    }

    get_Kind(): System_DateTime_ImplKind {
        return mscorlib.Api.DateTime._get_Kind(this.handle)
    }

    get_Millisecond(): System_Int32 {
        return mscorlib.Api.DateTime._get_Millisecond(this.handle)
    }

    get_Minute(): System_Int32 {
        return mscorlib.Api.DateTime._get_Minute(this.handle)
    }

    get_Month(): System_Int32 {
        return mscorlib.Api.DateTime._get_Month(this.handle)
    }

    static get_Now(): System_DateTime_Impl {
        return mscorlib.Api.DateTime._get_Now()
    }

    static get_UtcNow(): System_DateTime_Impl {
        return mscorlib.Api.DateTime._get_UtcNow()
    }

    static GetSystemTimeAsFileTime(): System_Int32 {
        return mscorlib.Api.DateTime._GetSystemTimeAsFileTime()
    }

    get_Second(): System_Int32 {
        return mscorlib.Api.DateTime._get_Second(this.handle)
    }

    get_Ticks(): System_Int32 {
        return mscorlib.Api.DateTime._get_Ticks(this.handle)
    }

    get_TimeOfDay(): System_TimeSpan {
        return mscorlib.Api.DateTime._get_TimeOfDay(this.handle)
    }

    static get_Today(): System_DateTime_Impl {
        return mscorlib.Api.DateTime._get_Today()
    }

    get_Year(): System_Int32 {
        return mscorlib.Api.DateTime._get_Year(this.handle)
    }

    static IsLeapYear(year: System_Int32): boolean {
        return mscorlib.Api.DateTime._IsLeapYear(year)
    }

    static Parse(s: string): System_DateTime_Impl {
        return mscorlib.Api.DateTime._Parse(s)
    }

    static Parse_2(s: string, provider: System_IFormatProvider): System_DateTime_Impl {
        return mscorlib.Api.DateTime._Parse(s, provider)
    }

    static ParseExact(s: string, format: System_String, provider: System_IFormatProvider): System_DateTime_Impl {
        return mscorlib.Api.DateTime._ParseExact(s, format, provider)
    }

    static ParseExact_4(s: string, format: System_String, provider: System_IFormatProvider, style: System_Globalization_DateTimeStyles): System_DateTime_Impl {
        return mscorlib.Api.DateTime._ParseExact(s, format, provider, style)
    }

    Subtract(value: System_DateTime_Impl): System_TimeSpan {
        return mscorlib.Api.DateTime._Subtract(this.handle, value)
    }

    ToLocalTime(): System_DateTime_Impl {
        return mscorlib.Api.DateTime._ToLocalTime(this.handle)
    }

    ToLocalTime_1(throwOnOverflow: boolean): System_DateTime_Impl {
        return mscorlib.Api.DateTime._ToLocalTime(this.handle, throwOnOverflow)
    }

    ToString(): string {
        return readU16(mscorlib.Api.DateTime._ToString(this.handle))
    }

    ToString_1(provider: System_IFormatProvider): string {
        return readU16(mscorlib.Api.DateTime._ToString(this.handle, provider))
    }

    ToString_2(format: string, provider: System_IFormatProvider): string {
        return readU16(mscorlib.Api.DateTime._ToString(this.handle, format, provider))
    }

    ToUniversalTime(): System_DateTime_Impl {
        return mscorlib.Api.DateTime._ToUniversalTime(this.handle)
    }

    static TryParse(s: string, provider: System_IFormatProvider, styles: System_Globalization_DateTimeStyles, result: System_DateTime_Impl): boolean {
        return mscorlib.Api.DateTime._TryParse(s, provider, styles, result)
    }

    static op_Addition(d: System_DateTime_Impl, t: System_TimeSpan): System_DateTime_Impl {
        return mscorlib.Api.DateTime._op_Addition(d, t)
    }

    static op_Subtraction(d: System_DateTime_Impl, t: System_TimeSpan): System_DateTime_Impl {
        return mscorlib.Api.DateTime._op_Subtraction(d, t)
    }

    static op_Subtraction_2(d1: System_DateTime_Impl, d2: System_DateTime_Impl): System_TimeSpan {
        return mscorlib.Api.DateTime._op_Subtraction(d1, d2)
    }

    static op_Equality(d1: System_DateTime_Impl, d2: System_DateTime_Impl): boolean {
        return mscorlib.Api.DateTime._op_Equality(d1, d2)
    }

    static op_Inequality(d1: System_DateTime_Impl, d2: System_DateTime_Impl): boolean {
        return mscorlib.Api.DateTime._op_Inequality(d1, d2)
    }

    static op_LessThan(t1: System_DateTime_Impl, t2: System_DateTime_Impl): boolean {
        return mscorlib.Api.DateTime._op_LessThan(t1, t2)
    }

    static op_LessThanOrEqual(t1: System_DateTime_Impl, t2: System_DateTime_Impl): boolean {
        return mscorlib.Api.DateTime._op_LessThanOrEqual(t1, t2)
    }

    static op_GreaterThan(t1: System_DateTime_Impl, t2: System_DateTime_Impl): boolean {
        return mscorlib.Api.DateTime._op_GreaterThan(t1, t2)
    }

    static op_GreaterThanOrEqual(t1: System_DateTime_Impl, t2: System_DateTime_Impl): boolean {
        return mscorlib.Api.DateTime._op_GreaterThanOrEqual(t1, t2)
    }

    GetTypeCode(): System_TypeCode {
        return mscorlib.Api.DateTime._GetTypeCode(this.handle)
    }

    System_IConvertible_ToBoolean(provider: System_IFormatProvider): boolean {
        return mscorlib.Api.DateTime._System_IConvertible_ToBoolean(this.handle, provider)
    }

    System_IConvertible_ToChar(provider: System_IFormatProvider): System_Char {
        return mscorlib.Api.DateTime._System_IConvertible_ToChar(this.handle, provider)
    }

    System_IConvertible_ToSByte(provider: System_IFormatProvider): System_SByte {
        return mscorlib.Api.DateTime._System_IConvertible_ToSByte(this.handle, provider)
    }

    System_IConvertible_ToByte(provider: System_IFormatProvider): System_Byte {
        return mscorlib.Api.DateTime._System_IConvertible_ToByte(this.handle, provider)
    }

    System_IConvertible_ToInt16(provider: System_IFormatProvider): System_Int16 {
        return mscorlib.Api.DateTime._System_IConvertible_ToInt16(this.handle, provider)
    }

    System_IConvertible_ToUInt16(provider: System_IFormatProvider): System_UInt16 {
        return mscorlib.Api.DateTime._System_IConvertible_ToUInt16(this.handle, provider)
    }

    System_IConvertible_ToInt32(provider: System_IFormatProvider): System_Int32 {
        return mscorlib.Api.DateTime._System_IConvertible_ToInt32(this.handle, provider)
    }

    System_IConvertible_ToUInt32(provider: System_IFormatProvider): System_UInt32 {
        return mscorlib.Api.DateTime._System_IConvertible_ToUInt32(this.handle, provider)
    }

    System_IConvertible_ToInt64(provider: System_IFormatProvider): System_Int32 {
        return mscorlib.Api.DateTime._System_IConvertible_ToInt64(this.handle, provider)
    }

    System_IConvertible_ToUInt64(provider: System_IFormatProvider): System_UInt64 {
        return mscorlib.Api.DateTime._System_IConvertible_ToUInt64(this.handle, provider)
    }

    System_IConvertible_ToSingle(provider: System_IFormatProvider): System_Int32 {
        return mscorlib.Api.DateTime._System_IConvertible_ToSingle(this.handle, provider)
    }

    System_IConvertible_ToDouble(provider: System_IFormatProvider): System_Int32 {
        return mscorlib.Api.DateTime._System_IConvertible_ToDouble(this.handle, provider)
    }

    System_IConvertible_ToDecimal(provider: System_IFormatProvider): System_Decimal {
        return mscorlib.Api.DateTime._System_IConvertible_ToDecimal(this.handle, provider)
    }

    System_IConvertible_ToDateTime(provider: System_IFormatProvider): System_DateTime_Impl {
        return mscorlib.Api.DateTime._System_IConvertible_ToDateTime(this.handle, provider)
    }

    System_IConvertible_ToType(type: System_ValueType, provider: System_IFormatProvider): System_Object {
        return mscorlib.Api.DateTime._System_IConvertible_ToType(this.handle, type, provider)
    }

    static TryCreate(year: System_Int32, month: System_Int32, day: System_Int32, hour: System_Int32, minute: System_Int32, second: System_Int32, millisecond: System_Int32, result: System_DateTime_Impl): boolean {
        return mscorlib.Api.DateTime._TryCreate(year, month, day, hour, minute, second, millisecond, result)
    }

    static _cctor(): void {
        return mscorlib.Api.DateTime.__cctor()
    }

}

mscorlib.DateTime = System_DateTime_Impl

declare global {
    namespace mscorlib {
        class DateTime extends System_DateTime_Impl { }
    }
}

export { System_DateTime_Impl }