import { cache } from "decorator-cache-getter"

class System_IntPtr_API {
    // public Void .ctor(Int32 value)
    @cache
    static get __ctor_Int32() {
        return Il2Cpp.Api.o("mscorlib", "System.IntPtr", ".ctor", 1, ["System.Int32"], "void", ["pointer", "pointer"])
    }

    // public Void .ctor(Int64 value)
    @cache
    static get __ctor_value_Int64() {
        return Il2Cpp.Api.o("mscorlib", "System.IntPtr", ".ctor", 1, ["System.Int64"], "void", ["pointer", "pointer"])
    }

    // public Void .ctor(Void* value)
    @cache
    static get __ctor_value_void_() {
        return Il2Cpp.Api.o("mscorlib", "System.IntPtr", ".ctor", 1, ["System.Void*"], "void", ["pointer", "pointer"])
    }

    // private Void .ctor(SerializationInfo info,StreamingContext context)
    @cache
    static get __ctor_info_context() {
        return Il2Cpp.Api.o("mscorlib", "System.IntPtr", ".ctor", 2, ["System.Runtime.Serialization.SerializationInfo", "System.Runtime.Serialization.StreamingContext"], "void", ["pointer", "pointer", "pointer"])
    }

    // public static Int32 get_Size()
    @cache
    static get _get_Size() {
        return Il2Cpp.Api.o("mscorlib", "System.IntPtr", "get_Size", 0, [], "pointer", [])
    }

    // private Void System.Runtime.Serialization.ISerializable.GetObjectData(SerializationInfo info,StreamingContext context)
    @cache
    static get _System_Runtime_Serialization_ISerializable_GetObjectData() {
        return Il2Cpp.Api.o("mscorlib", "System.IntPtr", "System.Runtime.Serialization.ISerializable.GetObjectData", 2, ["System.Runtime.Serialization.SerializationInfo", "System.Runtime.Serialization.StreamingContext"], "void", ["pointer", "pointer", "pointer"])
    }

    // public override Boolean Equals(Object obj)
    @cache
    static get _Equals() {
        return Il2Cpp.Api.o("mscorlib", "System.IntPtr", "Equals", 1, ["System.Object"], "pointer", ["pointer", "pointer"])
    }

    // public override Int32 GetHashCode()
    @cache
    static get _GetHashCode() {
        return Il2Cpp.Api.o("mscorlib", "System.IntPtr", "GetHashCode", 0, [], "pointer", ["pointer"])
    }

    // public Int64 ToInt64()
    @cache
    static get _ToInt64() {
        return Il2Cpp.Api.o("mscorlib", "System.IntPtr", "ToInt64", 0, [], "pointer", ["pointer"])
    }

    // public Void* ToPointer()
    @cache
    static get _ToPointer() {
        return Il2Cpp.Api.o("mscorlib", "System.IntPtr", "ToPointer", 0, [], "pointer", ["pointer"])
    }

    // public override String ToString()
    @cache
    static get _ToString() {
        return Il2Cpp.Api.o("mscorlib", "System.IntPtr", "ToString", 0, [], "pointer", ["pointer"])
    }

    // public String ToString(String format)
    @cache
    static get _ToString_format() {
        return Il2Cpp.Api.o("mscorlib", "System.IntPtr", "ToString", 1, ["System.String"], "pointer", ["pointer", "pointer"])
    }

    // public static Boolean op_Equality(IntPtr value1,IntPtr value2)
    @cache
    static get _op_Equality() {
        return Il2Cpp.Api.o("mscorlib", "System.IntPtr", "op_Equality", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
    }

    // public static Boolean op_Inequality(IntPtr value1,IntPtr value2)
    @cache
    static get _op_Inequality() {
        return Il2Cpp.Api.o("mscorlib", "System.IntPtr", "op_Inequality", 2, ["System.IntPtr", "System.IntPtr"], "pointer", ["pointer", "pointer"])
    }

    // public static IntPtr op_Explicit(Int32 value)
    @cache
    static get _op_Explicit() {
        return Il2Cpp.Api.o("mscorlib", "System.IntPtr", "op_Explicit", 1, ["System.Int32"], "pointer", ["pointer"])
    }

    // public static IntPtr op_Explicit(Int64 value)
    @cache
    static get _op_Explicit_value() {
        return Il2Cpp.Api.o("mscorlib", "System.IntPtr", "op_Explicit", 1, ["System.Int64"], "pointer", ["pointer"])
    }

    // public static IntPtr op_Explicit(Void* value)
    @cache
    static get _op_Explicit_value_IntPtr() {
        return Il2Cpp.Api.o("mscorlib", "System.IntPtr", "op_Explicit", 1, ["System.Void*"], "pointer", ["pointer"])
    }

    // public static Int32 op_Explicit(IntPtr value)
    @cache
    static get _op_Explicit_value_Int32() {
        return Il2Cpp.Api.o("mscorlib", "System.IntPtr", "op_Explicit", 1, ["System.IntPtr"], "pointer", ["pointer"])
    }

    // public static Void* op_Explicit(IntPtr value)
    @cache
    static get _op_Explicit_value_void_() {
        return Il2Cpp.Api.o("mscorlib", "System.IntPtr", "op_Explicit", 1, ["System.IntPtr"], "pointer", ["pointer"])
    }

    // internal Boolean IsNull()
    @cache
    static get _IsNull() {
        return Il2Cpp.Api.o("mscorlib", "System.IntPtr", "IsNull", 0, [], "pointer", ["pointer"])
    }

}

mscorlib.Api.IntPtr = System_IntPtr_API

declare global {
    namespace mscorlib.Api {
        class IntPtr extends System_IntPtr_API { }
    }
}

export { }