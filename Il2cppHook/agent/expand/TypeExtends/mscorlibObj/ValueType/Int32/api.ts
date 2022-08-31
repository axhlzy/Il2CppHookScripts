import { cache } from "decorator-cache-getter"

class System_Int32_API {

    // public Int32 CompareTo(Object value)
    @cache
    static get _CompareTo() {
        return Il2Cpp.Api.o("mscorlib", "System.Int32", "CompareTo", 1, ["System.Object"], "pointer", ["pointer", "pointer"])
    }

    // public Int32 CompareTo(Int32 value)
    @cache
    static get _CompareTo_value() {
        return Il2Cpp.Api.o("mscorlib", "System.Int32", "CompareTo", 1, ["System.Int32"], "pointer", ["pointer", "pointer"])
    }

    // public override Boolean Equals(Object obj)
    @cache
    static get _Equals() {
        return Il2Cpp.Api.o("mscorlib", "System.Int32", "Equals", 1, ["System.Object"], "pointer", ["pointer", "pointer"])
    }

    // public Boolean Equals(Int32 obj)
    @cache
    static get _Equals_obj() {
        return Il2Cpp.Api.o("mscorlib", "System.Int32", "Equals", 1, ["System.Int32"], "pointer", ["pointer", "pointer"])
    }

    // public override Int32 GetHashCode()
    @cache
    static get _GetHashCode() {
        return Il2Cpp.Api.o("mscorlib", "System.Int32", "GetHashCode", 0, [], "pointer", ["pointer"])
    }

    // public override String ToString()
    @cache
    static get _ToString() {
        return Il2Cpp.Api.o("mscorlib", "System.Int32", "ToString", 0, [], "pointer", ["pointer"])
    }

    // public String ToString(String format)
    @cache
    static get _ToString_format() {
        return Il2Cpp.Api.o("mscorlib", "System.Int32", "ToString", 1, ["System.String"], "pointer", ["pointer", "pointer"])
    }

    // public String ToString(IFormatProvider provider)
    @cache
    static get _ToString_provider() {
        return Il2Cpp.Api.o("mscorlib", "System.Int32", "ToString", 1, ["System.IFormatProvider"], "pointer", ["pointer", "pointer"])
    }

    // public String ToString(String format,IFormatProvider provider)
    @cache
    static get _ToString_format_provider() {
        return Il2Cpp.Api.o("mscorlib", "System.Int32", "ToString", 2, ["System.String", "System.IFormatProvider"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // public static Int32 Parse(String s)
    @cache
    static get _Parse() {
        return Il2Cpp.Api.o("mscorlib", "System.Int32", "Parse", 1, ["System.String"], "pointer", ["pointer"])
    }

    // public static Int32 Parse(String s,NumberStyles style)
    @cache
    static get _Parse_s_style() {
        return Il2Cpp.Api.o("mscorlib", "System.Int32", "Parse", 2, ["System.String", "System.Globalization.NumberStyles"], "pointer", ["pointer", "pointer"])
    }

    // public static Int32 Parse(String s,IFormatProvider provider)
    @cache
    static get _Parse_s_provider() {
        return Il2Cpp.Api.o("mscorlib", "System.Int32", "Parse", 2, ["System.String", "System.IFormatProvider"], "pointer", ["pointer", "pointer"])
    }

    // public static Int32 Parse(String s,NumberStyles style,IFormatProvider provider)
    @cache
    static get _Parse_s_style_provider() {
        return Il2Cpp.Api.o("mscorlib", "System.Int32", "Parse", 3, ["System.String", "System.Globalization.NumberStyles", "System.IFormatProvider"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // public static Boolean TryParse(String s,Int32& result)
    @cache
    static get _TryParse() {
        return Il2Cpp.Api.o("mscorlib", "System.Int32", "TryParse", 2, ["System.String", "System.Int32&"], "pointer", ["pointer", "pointer"])
    }

    // public static Boolean TryParse(String s,NumberStyles style,IFormatProvider provider,Int32& result)
    @cache
    static get _TryParse_s_style_provider_result() {
        return Il2Cpp.Api.o("mscorlib", "System.Int32", "TryParse", 4, ["System.String", "System.Globalization.NumberStyles", "System.IFormatProvider", "System.Int32&"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // public TypeCode GetTypeCode()
    @cache
    static get _GetTypeCode() {
        return Il2Cpp.Api.o("mscorlib", "System.Int32", "GetTypeCode", 0, [], "pointer", ["pointer"])
    }

    // private Boolean System.IConvertible.ToBoolean(IFormatProvider provider)
    @cache
    static get _System_IConvertible_ToBoolean() {
        return Il2Cpp.Api.o("mscorlib", "System.Int32", "System.IConvertible.ToBoolean", 1, ["System.IFormatProvider"], "pointer", ["pointer", "pointer"])
    }

    // private Char System.IConvertible.ToChar(IFormatProvider provider)
    @cache
    static get _System_IConvertible_ToChar() {
        return Il2Cpp.Api.o("mscorlib", "System.Int32", "System.IConvertible.ToChar", 1, ["System.IFormatProvider"], "pointer", ["pointer", "pointer"])
    }

    // private SByte System.IConvertible.ToSByte(IFormatProvider provider)
    @cache
    static get _System_IConvertible_ToSByte() {
        return Il2Cpp.Api.o("mscorlib", "System.Int32", "System.IConvertible.ToSByte", 1, ["System.IFormatProvider"], "pointer", ["pointer", "pointer"])
    }

    // private Byte System.IConvertible.ToByte(IFormatProvider provider)
    @cache
    static get _System_IConvertible_ToByte() {
        return Il2Cpp.Api.o("mscorlib", "System.Int32", "System.IConvertible.ToByte", 1, ["System.IFormatProvider"], "pointer", ["pointer", "pointer"])
    }

    // private Int16 System.IConvertible.ToInt16(IFormatProvider provider)
    @cache
    static get _System_IConvertible_ToInt16() {
        return Il2Cpp.Api.o("mscorlib", "System.Int32", "System.IConvertible.ToInt16", 1, ["System.IFormatProvider"], "pointer", ["pointer", "pointer"])
    }

    // private UInt16 System.IConvertible.ToUInt16(IFormatProvider provider)
    @cache
    static get _System_IConvertible_ToUInt16() {
        return Il2Cpp.Api.o("mscorlib", "System.Int32", "System.IConvertible.ToUInt16", 1, ["System.IFormatProvider"], "pointer", ["pointer", "pointer"])
    }

    // private Int32 System.IConvertible.ToInt32(IFormatProvider provider)
    @cache
    static get _System_IConvertible_ToInt32() {
        return Il2Cpp.Api.o("mscorlib", "System.Int32", "System.IConvertible.ToInt32", 1, ["System.IFormatProvider"], "pointer", ["pointer", "pointer"])
    }

    // private UInt32 System.IConvertible.ToUInt32(IFormatProvider provider)
    @cache
    static get _System_IConvertible_ToUInt32() {
        return Il2Cpp.Api.o("mscorlib", "System.Int32", "System.IConvertible.ToUInt32", 1, ["System.IFormatProvider"], "pointer", ["pointer", "pointer"])
    }

    // private Int64 System.IConvertible.ToInt64(IFormatProvider provider)
    @cache
    static get _System_IConvertible_ToInt64() {
        return Il2Cpp.Api.o("mscorlib", "System.Int32", "System.IConvertible.ToInt64", 1, ["System.IFormatProvider"], "pointer", ["pointer", "pointer"])
    }

    // private UInt64 System.IConvertible.ToUInt64(IFormatProvider provider)
    @cache
    static get _System_IConvertible_ToUInt64() {
        return Il2Cpp.Api.o("mscorlib", "System.Int32", "System.IConvertible.ToUInt64", 1, ["System.IFormatProvider"], "pointer", ["pointer", "pointer"])
    }

    // private Single System.IConvertible.ToSingle(IFormatProvider provider)
    @cache
    static get _System_IConvertible_ToSingle() {
        return Il2Cpp.Api.o("mscorlib", "System.Int32", "System.IConvertible.ToSingle", 1, ["System.IFormatProvider"], "pointer", ["pointer", "pointer"])
    }

    // private Double System.IConvertible.ToDouble(IFormatProvider provider)
    @cache
    static get _System_IConvertible_ToDouble() {
        return Il2Cpp.Api.o("mscorlib", "System.Int32", "System.IConvertible.ToDouble", 1, ["System.IFormatProvider"], "pointer", ["pointer", "pointer"])
    }

    // private Decimal System.IConvertible.ToDecimal(IFormatProvider provider)
    @cache
    static get _System_IConvertible_ToDecimal() {
        return Il2Cpp.Api.o("mscorlib", "System.Int32", "System.IConvertible.ToDecimal", 1, ["System.IFormatProvider"], "pointer", ["pointer", "pointer"])
    }

    // private DateTime System.IConvertible.ToDateTime(IFormatProvider provider)
    @cache
    static get _System_IConvertible_ToDateTime() {
        return Il2Cpp.Api.o("mscorlib", "System.Int32", "System.IConvertible.ToDateTime", 1, ["System.IFormatProvider"], "pointer", ["pointer", "pointer"])
    }

    // private Object System.IConvertible.ToType(Type type,IFormatProvider provider)
    @cache
    static get _System_IConvertible_ToType() {
        return Il2Cpp.Api.o("mscorlib", "System.Int32", "System.IConvertible.ToType", 2, ["System.Type", "System.IFormatProvider"], "pointer", ["pointer", "pointer", "pointer"])
    }

}

mscorlib.Api.Int32 = System_Int32_API

declare global {
    namespace mscorlib.Api {
        class Int32 extends System_Int32_API { }
    }
}

export { }