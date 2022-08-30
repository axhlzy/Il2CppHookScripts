import { cache } from "decorator-cache-getter"

class UnityEngine_Rect_API {
    // public Void .ctor(Single x,Single y,Single width,Single height)
    @cache
    static get __ctor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Rect", ".ctor", 4, "void", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public Void .ctor(Vector2 position,Vector2 size)
    @cache
    static get __ctor_position_size() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Rect", ".ctor", 2, ["UnityEngine.Vector2", "UnityEngine.Vector2"], "void", ["pointer", "pointer", "pointer"])
    }

    // public Void .ctor(Rect source)
    @cache
    static get __ctor_source() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Rect", ".ctor", 1, ["UnityEngine.Rect"], "void", ["pointer", "pointer"])
    }

    // public static Rect get_zero()
    @cache
    static get _get_zero() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Rect", "get_zero", 0, "pointer", [])
    }

    // public Single get_x()
    @cache
    static get _get_x() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Rect", "get_x", 0, "pointer", ["pointer"])
    }

    // public Void set_x(Single value)
    @cache
    static get _set_x() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Rect", "set_x", 1, "void", ["pointer", "pointer"])
    }

    // public Single get_y()
    @cache
    static get _get_y() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Rect", "get_y", 0, "pointer", ["pointer"])
    }

    // public Void set_y(Single value)
    @cache
    static get _set_y() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Rect", "set_y", 1, "void", ["pointer", "pointer"])
    }

    // public Vector2 get_position()
    @cache
    static get _get_position() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Rect", "get_position", 0, "pointer", ["pointer"])
    }

    // public Void set_position(Vector2 value)
    @cache
    static get _set_position() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Rect", "set_position", 1, "void", ["pointer", "pointer"])
    }

    // public Vector2 get_center()
    @cache
    static get _get_center() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Rect", "get_center", 0, "pointer", ["pointer"])
    }

    // public Vector2 get_min()
    @cache
    static get _get_min() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Rect", "get_min", 0, "pointer", ["pointer"])
    }

    // public Vector2 get_max()
    @cache
    static get _get_max() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Rect", "get_max", 0, "pointer", ["pointer"])
    }

    // public Single get_width()
    @cache
    static get _get_width() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Rect", "get_width", 0, "pointer", ["pointer"])
    }

    // public Void set_width(Single value)
    @cache
    static get _set_width() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Rect", "set_width", 1, "void", ["pointer", "pointer"])
    }

    // public Single get_height()
    @cache
    static get _get_height() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Rect", "get_height", 0, "pointer", ["pointer"])
    }

    // public Void set_height(Single value)
    @cache
    static get _set_height() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Rect", "set_height", 1, "void", ["pointer", "pointer"])
    }

    // public Vector2 get_size()
    @cache
    static get _get_size() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Rect", "get_size", 0, "pointer", ["pointer"])
    }

    // public Single get_xMin()
    @cache
    static get _get_xMin() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Rect", "get_xMin", 0, "pointer", ["pointer"])
    }

    // public Void set_xMin(Single value)
    @cache
    static get _set_xMin() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Rect", "set_xMin", 1, "void", ["pointer", "pointer"])
    }

    // public Single get_yMin()
    @cache
    static get _get_yMin() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Rect", "get_yMin", 0, "pointer", ["pointer"])
    }

    // public Void set_yMin(Single value)
    @cache
    static get _set_yMin() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Rect", "set_yMin", 1, "void", ["pointer", "pointer"])
    }

    // public Single get_xMax()
    @cache
    static get _get_xMax() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Rect", "get_xMax", 0, "pointer", ["pointer"])
    }

    // public Void set_xMax(Single value)
    @cache
    static get _set_xMax() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Rect", "set_xMax", 1, "void", ["pointer", "pointer"])
    }

    // public Single get_yMax()
    @cache
    static get _get_yMax() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Rect", "get_yMax", 0, "pointer", ["pointer"])
    }

    // public Void set_yMax(Single value)
    @cache
    static get _set_yMax() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Rect", "set_yMax", 1, "void", ["pointer", "pointer"])
    }

    // public Boolean Contains(Vector2 point)
    @cache
    static get _Contains() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Rect", "Contains", 1, "pointer", ["pointer", "pointer"])
    }

    // public Boolean Contains(Vector3 point)
    @cache
    static get _Contains_point() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Rect", "Contains", 1, ["UnityEngine.Vector3"], "pointer", ["pointer", "pointer"])
    }

    // private static Rect OrderMinMax(Rect rect)
    @cache
    static get _OrderMinMax() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Rect", "OrderMinMax", 1, "pointer", ["pointer"])
    }

    // public Boolean Overlaps(Rect other)
    @cache
    static get _Overlaps() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Rect", "Overlaps", 1, "pointer", ["pointer", "pointer"])
    }

    // public Boolean Overlaps(Rect other,Boolean allowInverse)
    @cache
    static get _Overlaps_other_allowInverse() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Rect", "Overlaps", 2, ["UnityEngine.Rect", "System.Boolean"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // public static Boolean op_Inequality(Rect lhs,Rect rhs)
    @cache
    static get _op_Inequality() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Rect", "op_Inequality", 2, "pointer", ["pointer", "pointer"])
    }

    // public static Boolean op_Equality(Rect lhs,Rect rhs)
    @cache
    static get _op_Equality() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Rect", "op_Equality", 2, "pointer", ["pointer", "pointer"])
    }

    // public override Int32 GetHashCode()
    @cache
    static get _GetHashCode() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Rect", "GetHashCode", 0, "pointer", ["pointer"])
    }

    // public override Boolean Equals(Object other)
    @cache
    static get _Equals() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Rect", "Equals", 1, "pointer", ["pointer", "pointer"])
    }

    // public Boolean Equals(Rect other)
    @cache
    static get _Equals_other() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Rect", "Equals", 1, ["UnityEngine.Rect"], "pointer", ["pointer", "pointer"])
    }

    // public override String ToString()
    @cache
    static get _ToString() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Rect", "ToString", 0, "pointer", ["pointer"])
    }

    // public String ToString(String format,IFormatProvider formatProvider)
    @cache
    static get _ToString_format_formatProvider() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Rect", "ToString", 2, ["System.String", "System.IFormatProvider"], "pointer", ["pointer", "pointer", "pointer"])
    }

}

Il2Cpp.Api.Rect = UnityEngine_Rect_API

declare global {
    namespace Il2Cpp.Api {
        class Rect extends UnityEngine_Rect_API { }
    }
}

export { }