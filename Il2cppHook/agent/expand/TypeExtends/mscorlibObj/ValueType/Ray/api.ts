import { cache } from "decorator-cache-getter"

class UnityEngine_Ray_API {
    // public Void .ctor(Vector3 origin,Vector3 direction)
    @cache
    static get __ctor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Ray", ".ctor", 2, "void", ["pointer", "pointer", "pointer"])
    }

    // public Vector3 get_origin()
    @cache
    static get _get_origin() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Ray", "get_origin", 0, "pointer", ["pointer"])
    }

    // public Void set_origin(Vector3 value)
    @cache
    static get _set_origin() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Ray", "set_origin", 1, "void", ["pointer", "pointer"])
    }

    // public Vector3 get_direction()
    @cache
    static get _get_direction() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Ray", "get_direction", 0, "pointer", ["pointer"])
    }

    // public Void set_direction(Vector3 value)
    @cache
    static get _set_direction() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Ray", "set_direction", 1, "void", ["pointer", "pointer"])
    }

    // public Vector3 GetPoint(Single distance)
    @cache
    static get _GetPoint() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Ray", "GetPoint", 1, "pointer", ["pointer", "pointer"])
    }

    // public override String ToString()
    @cache
    static get _ToString() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Ray", "ToString", 0, "pointer", ["pointer"])
    }

    // public String ToString(String format,IFormatProvider formatProvider)
    @cache
    static get _ToString_format_formatProvider() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Ray", "ToString", 2, ["System.String", "System.IFormatProvider"], "pointer", ["pointer", "pointer", "pointer"])
    }

}

Il2Cpp.Api.Ray = UnityEngine_Ray_API

declare global {
    namespace Il2Cpp.Api {
        class Ray extends UnityEngine_Ray_API { }
    }
}

export { }