import { cache } from "decorator-cache-getter"

class UnityEngine_EventSystems_BaseRaycaster_API {
    // protected Void .ctor()
    @cache
    static get __ctor() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseRaycaster", ".ctor", 0, [], "void", ["pointer"])
    }

    // public abstract Void Raycast(PointerEventData eventData,RaycastResult> resultAppendList)
    @cache
    static get _Raycast() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseRaycaster", "Raycast", 2, ["UnityEngine.EventSystems.PointerEventData", "System.Collections.Generic.List<UnityEngine.EventSystems.RaycastResult>"], "void", ["pointer", "pointer", "pointer"])
    }

    // public abstract Camera get_eventCamera()
    @cache
    static get _get_eventCamera() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseRaycaster", "get_eventCamera", 0, [], "pointer", ["pointer"])
    }

    // public virtual Int32 get_priority()
    @cache
    static get _get_priority() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseRaycaster", "get_priority", 0, [], "pointer", ["pointer"])
    }

    // public virtual Int32 get_sortOrderPriority()
    @cache
    static get _get_sortOrderPriority() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseRaycaster", "get_sortOrderPriority", 0, [], "pointer", ["pointer"])
    }

    // public virtual Int32 get_renderOrderPriority()
    @cache
    static get _get_renderOrderPriority() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseRaycaster", "get_renderOrderPriority", 0, [], "pointer", ["pointer"])
    }

    // public override String ToString()
    @cache
    static get _ToString() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseRaycaster", "ToString", 0, [], "pointer", ["pointer"])
    }

    // protected override Void OnEnable()
    @cache
    static get _OnEnable() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseRaycaster", "OnEnable", 0, [], "void", ["pointer"])
    }

    // protected override Void OnDisable()
    @cache
    static get _OnDisable() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseRaycaster", "OnDisable", 0, [], "void", ["pointer"])
    }

}

Il2Cpp.Api.BaseRaycaster = UnityEngine_EventSystems_BaseRaycaster_API

declare global {
    namespace Il2Cpp.Api {
        class BaseRaycaster extends UnityEngine_EventSystems_BaseRaycaster_API { }
    }
}

export { }