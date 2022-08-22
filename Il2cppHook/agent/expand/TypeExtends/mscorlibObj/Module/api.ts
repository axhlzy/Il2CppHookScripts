
import { cache } from "decorator-cache-getter";

class ModuleApi {

    // .cctor()
    static get _cctor() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "cctor", 0, "void", [])
    }

    // .ctor()
    static get _ctor() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", ".ctor", 0, "void", ["pointer"])
    }

    // CreateNIE() : Exception
    static get _CreateNIE() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "CreateNIE", 0, "pointer", ["pointer"])
    }

    // Equals(Object) : Boolean
    static get _Equals() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "Equals", 0, "bool", ["pointer", "pointer"])
    }

    // filter_by_type_name(Type, Object) : Boolean
    static get _filter_by_type_name() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "filter_by_type_name", 2, "bool", ["pointer", "pointer", "pointer"]);
    }

    // filter_by_type_name_ignore_case(Type, Object) : Boolean
    static get _filter_by_type_name_ignore_case() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "filter_by_type_name_ignore_case", 2, "bool", ["pointer", "pointer", "pointer"])
    }

    // GetCustomAttributes(Boolean) : Object[]
    static get _GetCustomAttributes() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "GetCustomAttributes", 1, "pointer", ["pointer", "bool"])
    }

    // GetCustomAttributes(Type, Boolean) : Object[]
    static get _GetCustomAttributes_1() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "GetCustomAttributes", 2, "pointer", ["pointer", "pointer", "bool"])
    }

    // GetGuidInternal() : String
    static get _GetGuidInternal() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "GetGuidInternal", 0, "pointer", ["pointer"])
    }

    // GetHashCode() : Int32
    static get _GetHashCode() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "GetHashCode", 0, "int32", ["pointer"])
    }

    // GetModuleVersionId() : Guid
    static get _GetModuleVersionId() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "GetModuleVersionId", 0, "pointer", ["pointer"])
    }

    // GetObjectData(SerializationInfo, StreamingContext) : Void
    static get _GetObjectData() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "GetObjectData", 2, "void", ["pointer", "pointer", "pointer"])
    }

    // IsDefined(Type, Boolean) : Boolean
    static get _IsDefined() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "IsDefined", 2, "bool", ["pointer", "pointer", "bool"])
    }

    // IsResource() : Boolean
    static get _IsResource() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "IsResource", 0, "bool", ["pointer"])
    }

    // op_Equality(Module, Module) : Boolean
    static get _op_Equality() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "op_Equality", 2, "bool", ["pointer", "pointer"])
    }

    // ToString() : String
    static get _ToString() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "ToString", 0, "pointer", ["pointer"])
    }

    // get_Assembly() : Assembly
    static get _get_Assembly() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "get_Assembly", 0, "pointer", ["pointer"])
    }

    // get_ModuleVersionId() : Guid
    static get _get_ModuleVersionId() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "get_ModuleVersionId", 0, "pointer", ["pointer"])
    }

    // get_ScopeName() : String
    static get _get_ScopeName() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "get_ScopeName", 0, "pointer", ["pointer"])
    }
}

declare global {
    namespace mscorlib.Api {
        class Module extends ModuleApi { }
    }
}

mscorlib.Api.Module = ModuleApi;

export { }