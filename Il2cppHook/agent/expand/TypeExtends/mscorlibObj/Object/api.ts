
import { cache } from "decorator-cache-getter";

class il2cppObjAPI {
    @cache
    static get _ctor_0() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Object", ".ctor", 0, "pointer", ["pointer"]);
    }

    @cache
    static get _GetHashCode() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Object", "GetHashCode", 0, "int32", ["pointer"]);
    }

    @cache
    static get _GetInstanceID() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Object", "GetInstanceID", 0, "int32", ["pointer"]);
    }
    @cache
    static get _ToString() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Object", "ToString", 0, "pointer", ["pointer"]);
    }
    @cache
    static get _set_name() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Object", "set_name", 1, "void", ["pointer", "pointer"]);
    }
    @cache
    static get _get_name() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Object", "get_name", 0, "pointer", ["pointer"]);
    }

    @cache
    static get _Equals() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Object", "Equals", 1, "bool", ["pointer"]);
    }

    // static methods ↓

    @cache
    static get _Destroy_1() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Object", "Destroy", 1, "void", ["pointer"]);
    }

    @cache
    static get _Destroy_2() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Object", "Destroy", 2, "void", ["pointer", "float"]);
    }

    @cache
    static get _DestroyImmediate() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Object", "DestroyImmediate", 1, "void", ["pointer"]);
    }

    // public static Object Instantiate(Object original)
    @cache
    static get _Instantiate_1() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Object", "Instantiate", 1, "pointer", ["pointer"]);
    }

    // public static Object Instantiate(Object original, Vector3 position, Quaternion rotation)
    @cache
    static get _Instantiate_3() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Object", "Instantiate", 3, "pointer", ["pointer", "pointer", "pointer"]);
    }

    // public static Object Instantiate(Object original, Transform parent, Boolean instantiateInWorldSpace)
    @cache
    static get _Instantiate_3_1() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Object", "Instantiate", 3, "pointer", ["pointer", "pointer", "bool"]);
    }

    // public static Object Instantiate(Object original, Vector3 position, Quaternion rotation, Transform parent)
    @cache
    static get _Instantiate_4() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Object", "Instantiate", 4, "pointer", ["pointer", "pointer", "pointer", "pointer"]);
    }

}

declare global {
    namespace Il2Cpp.Api {
        class il2cppObj extends il2cppObjAPI {

        }
    }
}

Il2Cpp.Api.il2cppObj = il2cppObjAPI;

export { il2cppObjAPI }