import { cache } from "decorator-cache-getter"

class System_DateTime_API {
    // public Void .ctor(Int64 ticks)
    @cache
    static get __ctor() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", ".ctor", 1, ["System.Int64"], "void", ["pointer", "pointer"])
    }

    // private Void .ctor(UInt64 dateData)
    @cache
    static get __ctor_dateData() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", ".ctor", 1, ["System.UInt64"], "void", ["pointer", "pointer"])
    }

    // public Void .ctor(Int64 ticks,DateTimeKind kind)
    @cache
    static get __ctor_ticks_kind() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", ".ctor", 2, ["System.Int64", "System.DateTimeKind"], "void", ["pointer", "pointer", "pointer"])
    }

    // internal Void .ctor(Int64 ticks,DateTimeKind kind,Boolean isAmbiguousDst)
    @cache
    static get __ctor_ticks_kind_isAmbiguousDst() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", ".ctor", 3, ["System.Int64", "System.DateTimeKind", "System.Boolean"], "void", ["pointer", "pointer", "pointer", "pointer"])
    }

    // public Void .ctor(Int32 year,Int32 month,Int32 day)
    @cache
    static get __ctor_year_month_day() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", ".ctor", 3, ["System.Int32", "System.Int32", "System.Int32"], "void", ["pointer", "pointer", "pointer", "pointer"])
    }

    // public Void .ctor(Int32 year,Int32 month,Int32 day,Int32 hour,Int32 minute,Int32 second)
    @cache
    static get __ctor_year_month_day_hour_minute_second() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", ".ctor", 6, ["System.Int32", "System.Int32", "System.Int32", "System.Int32", "System.Int32", "System.Int32"], "void", ["pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public Void .ctor(Int32 year,Int32 month,Int32 day,Int32 hour,Int32 minute,Int32 second,Int32 millisecond)
    @cache
    static get __ctor_year_month_day_hour_minute_second_millisecond() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", ".ctor", 7, ["System.Int32", "System.Int32", "System.Int32", "System.Int32", "System.Int32", "System.Int32", "System.Int32"], "void", ["pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public Void .ctor(Int32 year,Int32 month,Int32 day,Int32 hour,Int32 minute,Int32 second,Int32 millisecond,DateTimeKind kind)
    @cache
    static get __ctor_year_month_day_hour_minute_second_millisecond_kind() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", ".ctor", 8, ["System.Int32", "System.Int32", "System.Int32", "System.Int32", "System.Int32", "System.Int32", "System.Int32", "System.DateTimeKind"], "void", ["pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // private Void .ctor(SerializationInfo info,StreamingContext context)
    @cache
    static get __ctor_info_context() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", ".ctor", 2, ["System.Runtime.Serialization.SerializationInfo", "System.Runtime.Serialization.StreamingContext"], "void", ["pointer", "pointer", "pointer"])
    }

    // internal Int64 get_InternalTicks()
    @cache
    static get _get_InternalTicks() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "get_InternalTicks", 0, [], "pointer", ["pointer"])
    }

    // private UInt64 get_InternalKind()
    @cache
    static get _get_InternalKind() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "get_InternalKind", 0, [], "pointer", ["pointer"])
    }

    // public DateTime Add(TimeSpan value)
    @cache
    static get _Add() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "Add", 1, ["System.TimeSpan"], "pointer", ["pointer", "pointer"])
    }

    // private DateTime Add(Double value,Int32 scale)
    @cache
    static get _Add_value_scale() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "Add", 2, ["System.Double", "System.Int32"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // public DateTime AddDays(Double value)
    @cache
    static get _AddDays() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "AddDays", 1, ["System.Double"], "pointer", ["pointer", "pointer"])
    }

    // public DateTime AddHours(Double value)
    @cache
    static get _AddHours() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "AddHours", 1, ["System.Double"], "pointer", ["pointer", "pointer"])
    }

    // public DateTime AddMilliseconds(Double value)
    @cache
    static get _AddMilliseconds() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "AddMilliseconds", 1, ["System.Double"], "pointer", ["pointer", "pointer"])
    }

    // public DateTime AddMinutes(Double value)
    @cache
    static get _AddMinutes() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "AddMinutes", 1, ["System.Double"], "pointer", ["pointer", "pointer"])
    }

    // public DateTime AddMonths(Int32 months)
    @cache
    static get _AddMonths() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "AddMonths", 1, ["System.Int32"], "pointer", ["pointer", "pointer"])
    }

    // public DateTime AddSeconds(Double value)
    @cache
    static get _AddSeconds() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "AddSeconds", 1, ["System.Double"], "pointer", ["pointer", "pointer"])
    }

    // public DateTime AddTicks(Int64 value)
    @cache
    static get _AddTicks() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "AddTicks", 1, ["System.Int64"], "pointer", ["pointer", "pointer"])
    }

    // public DateTime AddYears(Int32 value)
    @cache
    static get _AddYears() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "AddYears", 1, ["System.Int32"], "pointer", ["pointer", "pointer"])
    }

    // public Int32 CompareTo(Object value)
    @cache
    static get _CompareTo() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "CompareTo", 1, ["System.Object"], "pointer", ["pointer", "pointer"])
    }

    // public Int32 CompareTo(DateTime value)
    @cache
    static get _CompareTo_value() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "CompareTo", 1, ["System.DateTime"], "pointer", ["pointer", "pointer"])
    }

    // private static Int64 DateToTicks(Int32 year,Int32 month,Int32 day)
    @cache
    static get _DateToTicks() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "DateToTicks", 3, ["System.Int32", "System.Int32", "System.Int32"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // private static Int64 TimeToTicks(Int32 hour,Int32 minute,Int32 second)
    @cache
    static get _TimeToTicks() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "TimeToTicks", 3, ["System.Int32", "System.Int32", "System.Int32"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // public static Int32 DaysInMonth(Int32 year,Int32 month)
    @cache
    static get _DaysInMonth() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "DaysInMonth", 2, ["System.Int32", "System.Int32"], "pointer", ["pointer", "pointer"])
    }

    // public override Boolean Equals(Object value)
    @cache
    static get _Equals() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "Equals", 1, ["System.Object"], "pointer", ["pointer", "pointer"])
    }

    // public Boolean Equals(DateTime value)
    @cache
    static get _Equals_value() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "Equals", 1, ["System.DateTime"], "pointer", ["pointer", "pointer"])
    }

    // public static DateTime FromBinary(Int64 dateData)
    @cache
    static get _FromBinary() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "FromBinary", 1, ["System.Int64"], "pointer", ["pointer"])
    }

    // internal static DateTime FromBinaryRaw(Int64 dateData)
    @cache
    static get _FromBinaryRaw() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "FromBinaryRaw", 1, ["System.Int64"], "pointer", ["pointer"])
    }

    // private Void System.Runtime.Serialization.ISerializable.GetObjectData(SerializationInfo info,StreamingContext context)
    @cache
    static get _System_Runtime_Serialization_ISerializable_GetObjectData() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "System.Runtime.Serialization.ISerializable.GetObjectData", 2, ["System.Runtime.Serialization.SerializationInfo", "System.Runtime.Serialization.StreamingContext"], "void", ["pointer", "pointer", "pointer"])
    }

    // public static DateTime SpecifyKind(DateTime value,DateTimeKind kind)
    @cache
    static get _SpecifyKind() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "SpecifyKind", 2, ["System.DateTime", "System.DateTimeKind"], "pointer", ["pointer", "pointer"])
    }

    // internal Int64 ToBinaryRaw()
    @cache
    static get _ToBinaryRaw() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "ToBinaryRaw", 0, [], "pointer", ["pointer"])
    }

    // public DateTime get_Date()
    @cache
    static get _get_Date() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "get_Date", 0, [], "pointer", ["pointer"])
    }

    // private Int32 GetDatePart(Int32 part)
    @cache
    static get _GetDatePart() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "GetDatePart", 1, ["System.Int32"], "pointer", ["pointer", "pointer"])
    }

    // public Int32 get_Day()
    @cache
    static get _get_Day() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "get_Day", 0, [], "pointer", ["pointer"])
    }

    // public DayOfWeek get_DayOfWeek()
    @cache
    static get _get_DayOfWeek() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "get_DayOfWeek", 0, [], "pointer", ["pointer"])
    }

    // public override Int32 GetHashCode()
    @cache
    static get _GetHashCode() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "GetHashCode", 0, [], "pointer", ["pointer"])
    }

    // public Int32 get_Hour()
    @cache
    static get _get_Hour() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "get_Hour", 0, [], "pointer", ["pointer"])
    }

    // public DateTimeKind get_Kind()
    @cache
    static get _get_Kind() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "get_Kind", 0, [], "pointer", ["pointer"])
    }

    // public Int32 get_Millisecond()
    @cache
    static get _get_Millisecond() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "get_Millisecond", 0, [], "pointer", ["pointer"])
    }

    // public Int32 get_Minute()
    @cache
    static get _get_Minute() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "get_Minute", 0, [], "pointer", ["pointer"])
    }

    // public Int32 get_Month()
    @cache
    static get _get_Month() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "get_Month", 0, [], "pointer", ["pointer"])
    }

    // public static DateTime get_Now()
    @cache
    static get _get_Now() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "get_Now", 0, [], "pointer", [])
    }

    // public static DateTime get_UtcNow()
    @cache
    static get _get_UtcNow() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "get_UtcNow", 0, [], "pointer", [])
    }

    // internal static Int64 GetSystemTimeAsFileTime()
    @cache
    static get _GetSystemTimeAsFileTime() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "GetSystemTimeAsFileTime", 0, [], "pointer", [])
    }

    // public Int32 get_Second()
    @cache
    static get _get_Second() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "get_Second", 0, [], "pointer", ["pointer"])
    }

    // public Int64 get_Ticks()
    @cache
    static get _get_Ticks() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "get_Ticks", 0, [], "pointer", ["pointer"])
    }

    // public TimeSpan get_TimeOfDay()
    @cache
    static get _get_TimeOfDay() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "get_TimeOfDay", 0, [], "pointer", ["pointer"])
    }

    // public static DateTime get_Today()
    @cache
    static get _get_Today() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "get_Today", 0, [], "pointer", [])
    }

    // public Int32 get_Year()
    @cache
    static get _get_Year() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "get_Year", 0, [], "pointer", ["pointer"])
    }

    // public static Boolean IsLeapYear(Int32 year)
    @cache
    static get _IsLeapYear() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "IsLeapYear", 1, ["System.Int32"], "pointer", ["pointer"])
    }

    // public static DateTime Parse(String s)
    @cache
    static get _Parse() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "Parse", 1, ["System.String"], "pointer", ["pointer"])
    }

    // public static DateTime Parse(String s,IFormatProvider provider)
    @cache
    static get _Parse_s_provider() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "Parse", 2, ["System.String", "System.IFormatProvider"], "pointer", ["pointer", "pointer"])
    }

    // public static DateTime ParseExact(String s,String format,IFormatProvider provider)
    @cache
    static get _ParseExact() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "ParseExact", 3, ["System.String", "System.String", "System.IFormatProvider"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // public static DateTime ParseExact(String s,String format,IFormatProvider provider,DateTimeStyles style)
    @cache
    static get _ParseExact_s_format_provider_style() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "ParseExact", 4, ["System.String", "System.String", "System.IFormatProvider", "System.Globalization.DateTimeStyles"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // public TimeSpan Subtract(DateTime value)
    @cache
    static get _Subtract() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "Subtract", 1, ["System.DateTime"], "pointer", ["pointer", "pointer"])
    }

    // public DateTime ToLocalTime()
    @cache
    static get _ToLocalTime() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "ToLocalTime", 0, [], "pointer", ["pointer"])
    }

    // internal DateTime ToLocalTime(Boolean throwOnOverflow)
    @cache
    static get _ToLocalTime_throwOnOverflow() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "ToLocalTime", 1, ["System.Boolean"], "pointer", ["pointer", "pointer"])
    }

    // public override String ToString()
    @cache
    static get _ToString() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "ToString", 0, [], "pointer", ["pointer"])
    }

    // public String ToString(IFormatProvider provider)
    @cache
    static get _ToString_provider() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "ToString", 1, ["System.IFormatProvider"], "pointer", ["pointer", "pointer"])
    }

    // public String ToString(String format,IFormatProvider provider)
    @cache
    static get _ToString_format_provider() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "ToString", 2, ["System.String", "System.IFormatProvider"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // public DateTime ToUniversalTime()
    @cache
    static get _ToUniversalTime() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "ToUniversalTime", 0, [], "pointer", ["pointer"])
    }

    // public static Boolean TryParse(String s,IFormatProvider provider,DateTimeStyles styles,DateTime& result)
    @cache
    static get _TryParse() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "TryParse", 4, ["System.String", "System.IFormatProvider", "System.Globalization.DateTimeStyles", "System.DateTime&"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // public static DateTime op_Addition(DateTime d,TimeSpan t)
    @cache
    static get _op_Addition() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "op_Addition", 2, ["System.DateTime", "System.TimeSpan"], "pointer", ["pointer", "pointer"])
    }

    // public static DateTime op_Subtraction(DateTime d,TimeSpan t)
    @cache
    static get _op_Subtraction() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "op_Subtraction", 2, ["System.DateTime", "System.TimeSpan"], "pointer", ["pointer", "pointer"])
    }

    // public static TimeSpan op_Subtraction(DateTime d1,DateTime d2)
    @cache
    static get _op_Subtraction_d1_d2() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "op_Subtraction", 2, ["System.DateTime", "System.DateTime"], "pointer", ["pointer", "pointer"])
    }

    // public static Boolean op_Equality(DateTime d1,DateTime d2)
    @cache
    static get _op_Equality() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "op_Equality", 2, ["System.DateTime", "System.DateTime"], "pointer", ["pointer", "pointer"])
    }

    // public static Boolean op_Inequality(DateTime d1,DateTime d2)
    @cache
    static get _op_Inequality() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "op_Inequality", 2, ["System.DateTime", "System.DateTime"], "pointer", ["pointer", "pointer"])
    }

    // public static Boolean op_LessThan(DateTime t1,DateTime t2)
    @cache
    static get _op_LessThan() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "op_LessThan", 2, ["System.DateTime", "System.DateTime"], "pointer", ["pointer", "pointer"])
    }

    // public static Boolean op_LessThanOrEqual(DateTime t1,DateTime t2)
    @cache
    static get _op_LessThanOrEqual() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "op_LessThanOrEqual", 2, ["System.DateTime", "System.DateTime"], "pointer", ["pointer", "pointer"])
    }

    // public static Boolean op_GreaterThan(DateTime t1,DateTime t2)
    @cache
    static get _op_GreaterThan() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "op_GreaterThan", 2, ["System.DateTime", "System.DateTime"], "pointer", ["pointer", "pointer"])
    }

    // public static Boolean op_GreaterThanOrEqual(DateTime t1,DateTime t2)
    @cache
    static get _op_GreaterThanOrEqual() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "op_GreaterThanOrEqual", 2, ["System.DateTime", "System.DateTime"], "pointer", ["pointer", "pointer"])
    }

    // public TypeCode GetTypeCode()
    @cache
    static get _GetTypeCode() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "GetTypeCode", 0, [], "pointer", ["pointer"])
    }

    // private Boolean System.IConvertible.ToBoolean(IFormatProvider provider)
    @cache
    static get _System_IConvertible_ToBoolean() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "System.IConvertible.ToBoolean", 1, ["System.IFormatProvider"], "pointer", ["pointer", "pointer"])
    }

    // private Char System.IConvertible.ToChar(IFormatProvider provider)
    @cache
    static get _System_IConvertible_ToChar() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "System.IConvertible.ToChar", 1, ["System.IFormatProvider"], "pointer", ["pointer", "pointer"])
    }

    // private SByte System.IConvertible.ToSByte(IFormatProvider provider)
    @cache
    static get _System_IConvertible_ToSByte() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "System.IConvertible.ToSByte", 1, ["System.IFormatProvider"], "pointer", ["pointer", "pointer"])
    }

    // private Byte System.IConvertible.ToByte(IFormatProvider provider)
    @cache
    static get _System_IConvertible_ToByte() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "System.IConvertible.ToByte", 1, ["System.IFormatProvider"], "pointer", ["pointer", "pointer"])
    }

    // private Int16 System.IConvertible.ToInt16(IFormatProvider provider)
    @cache
    static get _System_IConvertible_ToInt16() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "System.IConvertible.ToInt16", 1, ["System.IFormatProvider"], "pointer", ["pointer", "pointer"])
    }

    // private UInt16 System.IConvertible.ToUInt16(IFormatProvider provider)
    @cache
    static get _System_IConvertible_ToUInt16() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "System.IConvertible.ToUInt16", 1, ["System.IFormatProvider"], "pointer", ["pointer", "pointer"])
    }

    // private Int32 System.IConvertible.ToInt32(IFormatProvider provider)
    @cache
    static get _System_IConvertible_ToInt32() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "System.IConvertible.ToInt32", 1, ["System.IFormatProvider"], "pointer", ["pointer", "pointer"])
    }

    // private UInt32 System.IConvertible.ToUInt32(IFormatProvider provider)
    @cache
    static get _System_IConvertible_ToUInt32() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "System.IConvertible.ToUInt32", 1, ["System.IFormatProvider"], "pointer", ["pointer", "pointer"])
    }

    // private Int64 System.IConvertible.ToInt64(IFormatProvider provider)
    @cache
    static get _System_IConvertible_ToInt64() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "System.IConvertible.ToInt64", 1, ["System.IFormatProvider"], "pointer", ["pointer", "pointer"])
    }

    // private UInt64 System.IConvertible.ToUInt64(IFormatProvider provider)
    @cache
    static get _System_IConvertible_ToUInt64() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "System.IConvertible.ToUInt64", 1, ["System.IFormatProvider"], "pointer", ["pointer", "pointer"])
    }

    // private Single System.IConvertible.ToSingle(IFormatProvider provider)
    @cache
    static get _System_IConvertible_ToSingle() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "System.IConvertible.ToSingle", 1, ["System.IFormatProvider"], "pointer", ["pointer", "pointer"])
    }

    // private Double System.IConvertible.ToDouble(IFormatProvider provider)
    @cache
    static get _System_IConvertible_ToDouble() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "System.IConvertible.ToDouble", 1, ["System.IFormatProvider"], "pointer", ["pointer", "pointer"])
    }

    // private Decimal System.IConvertible.ToDecimal(IFormatProvider provider)
    @cache
    static get _System_IConvertible_ToDecimal() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "System.IConvertible.ToDecimal", 1, ["System.IFormatProvider"], "pointer", ["pointer", "pointer"])
    }

    // private DateTime System.IConvertible.ToDateTime(IFormatProvider provider)
    @cache
    static get _System_IConvertible_ToDateTime() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "System.IConvertible.ToDateTime", 1, ["System.IFormatProvider"], "pointer", ["pointer", "pointer"])
    }

    // private Object System.IConvertible.ToType(Type type,IFormatProvider provider)
    @cache
    static get _System_IConvertible_ToType() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "System.IConvertible.ToType", 2, ["System.Type", "System.IFormatProvider"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // internal static Boolean TryCreate(Int32 year,Int32 month,Int32 day,Int32 hour,Int32 minute,Int32 second,Int32 millisecond,DateTime& result)
    @cache
    static get _TryCreate() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", "TryCreate", 8, ["System.Int32", "System.Int32", "System.Int32", "System.Int32", "System.Int32", "System.Int32", "System.Int32", "System.DateTime&"], "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // private static Void .cctor()
    @cache
    static get __cctor() {
        return Il2Cpp.Api.o("mscorlib", "System.DateTime", ".cctor", 0, [], "void", [])
    }

}

mscorlib.Api.DateTime = System_DateTime_API

declare global {
    namespace mscorlib.Api {
        class DateTime extends System_DateTime_API { }
    }
}

export { }