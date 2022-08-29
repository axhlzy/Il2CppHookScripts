import { cache } from "decorator-cache-getter"

class System_ValueType_API {
    // protected Void .ctor()
    @cache
    static get __ctor() {
        return Il2Cpp.Api.t("mscorlib", "System.ValueType", ".ctor", 0, "void", ["pointer"])
    }

    // private static Boolean InternalEquals(Object o1,Object o2,Object[]& fields)
    @cache
    static get _InternalEquals() {
        return Il2Cpp.Api.t("mscorlib", "System.ValueType", "InternalEquals", 3, "pointer", ["pointer", "pointer", "pointer"])
    }

    // internal static Boolean DefaultEquals(Object o1,Object o2)
    @cache
    static get _DefaultEquals() {
        return Il2Cpp.Api.t("mscorlib", "System.ValueType", "DefaultEquals", 2, "pointer", ["pointer", "pointer"])
    }

    // public override Boolean Equals(Object obj)
    @cache
    static get _Equals() {
        return Il2Cpp.Api.t("mscorlib", "System.ValueType", "Equals", 1, "pointer", ["pointer", "pointer"])
    }

    // internal static Int32 InternalGetHashCode(Object o,Object[]& fields)
    @cache
    static get _InternalGetHashCode() {
        return Il2Cpp.Api.t("mscorlib", "System.ValueType", "InternalGetHashCode", 2, "pointer", ["pointer", "pointer"])
    }

    // public override Int32 GetHashCode()
    @cache
    static get _GetHashCode() {
        return Il2Cpp.Api.t("mscorlib", "System.ValueType", "GetHashCode", 0, "pointer", ["pointer"])
    }

    // public override String ToString()
    @cache
    static get _ToString() {
        return Il2Cpp.Api.t("mscorlib", "System.ValueType", "ToString", 0, "pointer", ["pointer"])
    }

}

declare global {
    namespace mscorlib.Api {
        class ValueType extends System_ValueType_API { }
    }
}

mscorlib.Api.ValueType = System_ValueType_API

export { }