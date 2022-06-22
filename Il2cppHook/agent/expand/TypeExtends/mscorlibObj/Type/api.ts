
import { cache } from "decorator-cache-getter";

class mscorlibTypeAPI {

    @cache
    static get Equals_obj() {
        return Il2Cpp.Api.o("mscorlib", "System.Type", "Equals", 1, ["System.Object"], "pointer", ["pointer", "pointer"]);
    }

    @cache
    static get Equals_type() {
        return Il2Cpp.Api.o("mscorlib", "System.Type", "Equals", 1, ["System.Type"], "bool", ["pointer", "pointer"]);
    }

    @cache
    static get GetArrayRank() {
        return Il2Cpp.Api.t("mscorlib", "System.Type", "GetArrayRank", 0, "int", ["pointer"]);
    }

    @cache
    static get GetConstructor() {
        return Il2Cpp.Api.o("mscorlib", "System.Type", "GetConstructor", 1, ["System.Type[]"], "pointer", ["pointer", "pointer"]);
    }

    @cache
    static get GetEnumName() {
        return Il2Cpp.Api.t("mscorlib", "System.Type", "GetEnumName", 0, "pointer", ["pointer"]);
    }

    @cache
    static get GetEnumNames() {
        return Il2Cpp.Api.t("mscorlib", "System.Type", "GetEnumNames", 0, "pointer", ["pointer"]);
    }

    @cache
    static get GetHashCode() {
        return Il2Cpp.Api.t("mscorlib", "System.Type", "GetHashCode", 0, "int", ["pointer"]);
    }

    @cache
    static get GetType_0() {
        return Il2Cpp.Api.t("mscorlib", "System.Type", "GetType", 0, "pointer", ["pointer"]);
    }

    @cache
    static get GetType_1() {
        return Il2Cpp.Api.t("mscorlib", "System.Type", "GetType", 1, "pointer", ["pointer", "pointer"]);
    }

    @cache
    static get ToString() {
        return Il2Cpp.Api.t("mscorlib", "System.Type", "ToString", 0, "pointer", ["pointer"]);
    }
}

declare global {
    namespace mscorlib.Api {
        class Type extends mscorlibTypeAPI { }
    }
}

mscorlib.Api.Type = mscorlibTypeAPI;

export { }