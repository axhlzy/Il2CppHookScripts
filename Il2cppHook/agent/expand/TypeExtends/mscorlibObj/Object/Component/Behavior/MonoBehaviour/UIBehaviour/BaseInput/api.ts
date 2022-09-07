import { cache } from "decorator-cache-getter"

class UnityEngine_EventSystems_BaseInput_API {
    // public Void .ctor()
    @cache
    static get __ctor() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseInput", ".ctor", 0, [], "void", ["pointer"])
    }

    // public virtual String get_compositionString()
    @cache
    static get _get_compositionString() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseInput", "get_compositionString", 0, [], "pointer", ["pointer"])
    }

    // public virtual IMECompositionMode get_imeCompositionMode()
    @cache
    static get _get_imeCompositionMode() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseInput", "get_imeCompositionMode", 0, [], "pointer", ["pointer"])
    }

    // public virtual Void set_imeCompositionMode(IMECompositionMode value)
    @cache
    static get _set_imeCompositionMode() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseInput", "set_imeCompositionMode", 1, ["UnityEngine.IMECompositionMode"], "void", ["pointer", "pointer"])
    }

    // public virtual Vector2 get_compositionCursorPos()
    @cache
    static get _get_compositionCursorPos() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseInput", "get_compositionCursorPos", 0, [], "pointer", ["pointer"])
    }

    // public virtual Void set_compositionCursorPos(Vector2 value)
    @cache
    static get _set_compositionCursorPos() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseInput", "set_compositionCursorPos", 1, ["UnityEngine.Vector2"], "void", ["pointer", "pointer"])
    }

    // public virtual Boolean get_mousePresent()
    @cache
    static get _get_mousePresent() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseInput", "get_mousePresent", 0, [], "pointer", ["pointer"])
    }

    // public virtual Boolean GetMouseButtonDown(Int32 button)
    @cache
    static get _GetMouseButtonDown() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseInput", "GetMouseButtonDown", 1, ["System.Int32"], "pointer", ["pointer", "pointer"])
    }

    // public virtual Boolean GetMouseButtonUp(Int32 button)
    @cache
    static get _GetMouseButtonUp() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseInput", "GetMouseButtonUp", 1, ["System.Int32"], "pointer", ["pointer", "pointer"])
    }

    // public virtual Boolean GetMouseButton(Int32 button)
    @cache
    static get _GetMouseButton() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseInput", "GetMouseButton", 1, ["System.Int32"], "pointer", ["pointer", "pointer"])
    }

    // public virtual Vector2 get_mousePosition()
    @cache
    static get _get_mousePosition() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseInput", "get_mousePosition", 0, [], "pointer", ["pointer"])
    }

    // public virtual Vector2 get_mouseScrollDelta()
    @cache
    static get _get_mouseScrollDelta() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseInput", "get_mouseScrollDelta", 0, [], "pointer", ["pointer"])
    }

    // public virtual Boolean get_touchSupported()
    @cache
    static get _get_touchSupported() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseInput", "get_touchSupported", 0, [], "pointer", ["pointer"])
    }

    // public virtual Int32 get_touchCount()
    @cache
    static get _get_touchCount() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseInput", "get_touchCount", 0, [], "pointer", ["pointer"])
    }

    // public virtual Touch GetTouch(Int32 index)
    @cache
    static get _GetTouch() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseInput", "GetTouch", 1, ["System.Int32"], "pointer", ["pointer", "pointer"])
    }

    // public virtual Single GetAxisRaw(String axisName)
    @cache
    static get _GetAxisRaw() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseInput", "GetAxisRaw", 1, ["System.String"], "pointer", ["pointer", "pointer"])
    }

    // public virtual Boolean GetButtonDown(String buttonName)
    @cache
    static get _GetButtonDown() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseInput", "GetButtonDown", 1, ["System.String"], "pointer", ["pointer", "pointer"])
    }

}

Il2Cpp.Api.BaseInput = UnityEngine_EventSystems_BaseInput_API

declare global {
    namespace Il2Cpp.Api {
        class BaseInput extends UnityEngine_EventSystems_BaseInput_API { }
    }
}

export { }
