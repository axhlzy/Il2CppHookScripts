
import { cache } from "decorator-cache-getter";
import "./instance"
import "./interface"

class mscorlibObjAPI {
    @cache
    static get _ctor_0() {
        return Il2Cpp.Api.t("mscorlib", "System.Object", ".ctor", 0, "pointer", ["pointer"]);
    }

    @cache
    static get _toString() {
        return Il2Cpp.Api.t("mscorlib", "System.Object", "ToString", 0, "pointer", ["pointer"]);
    }

    @cache
    static get _getType() {
        return Il2Cpp.Api.t("mscorlib", "System.Object", "getType", 0, "pointer", ["pointer"]);
    }

    @cache
    static get _finalize() {
        return Il2Cpp.Api.t("mscorlib", "System.Object", "finalize", 0, "pointer", ["pointer"]);
    }

    @cache
    static get _getHashCode() {
        return Il2Cpp.Api.t("mscorlib", "System.Object", "getHashCode", 0, "pointer", ["pointer"]);
    }

    // 单个参数是实例方法，两个参数是静态方法，这里有bug  参数都是两个
    @cache
    static get _Equals_1() {
        return Il2Cpp.Api.t("mscorlib", "System.Object", "Equals", 2, "pointer", ["pointer", "pointer"]);
    }

    @cache
    static get _Equals_2() {
        return Il2Cpp.Api.t("mscorlib", "System.Object", "Equals", 2, "pointer", ["pointer", "pointer", "pointer"]);
    }
}

declare global {
    namespace Il2Cpp.Api {
        class mscorlibObj extends mscorlibObjAPI { }
    }
}

Il2Cpp.Api.mscorlibObj = mscorlibObjAPI;

export { }