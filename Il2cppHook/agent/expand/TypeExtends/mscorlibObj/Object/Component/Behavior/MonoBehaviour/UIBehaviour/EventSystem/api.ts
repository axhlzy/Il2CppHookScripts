import { UnityEngine_Behaviour_Impl } from "../../../class"
import { cache } from "decorator-cache-getter"

class UnityEngine_EventSystems_EventSystem_API extends UnityEngine_Behaviour_Impl {
    // public static EventSystem get_current()
    @cache
    static get _get_current() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.EventSystem", "get_current", 0, [], "pointer", [])
    }

    // public static Void set_current(EventSystem value)
    @cache
    static get _set_current() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.EventSystem", "set_current", 1, ["UnityEngine.EventSystems.EventSystem"], "void", ["pointer"])
    }

    // public Boolean get_sendNavigationEvents()
    @cache
    static get _get_sendNavigationEvents() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.EventSystem", "get_sendNavigationEvents", 0, [], "pointer", ["pointer"])
    }

    // public Void set_sendNavigationEvents(Boolean value)
    @cache
    static get _set_sendNavigationEvents() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.EventSystem", "set_sendNavigationEvents", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // public Int32 get_pixelDragThreshold()
    @cache
    static get _get_pixelDragThreshold() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.EventSystem", "get_pixelDragThreshold", 0, [], "pointer", ["pointer"])
    }

    // public Void set_pixelDragThreshold(Int32 value)
    @cache
    static get _set_pixelDragThreshold() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.EventSystem", "set_pixelDragThreshold", 1, ["System.Int32"], "void", ["pointer", "pointer"])
    }

    // public BaseInputModule get_currentInputModule()
    @cache
    static get _get_currentInputModule() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.EventSystem", "get_currentInputModule", 0, [], "pointer", ["pointer"])
    }

    // public GameObject get_firstSelectedGameObject()
    @cache
    static get _get_firstSelectedGameObject() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.EventSystem", "get_firstSelectedGameObject", 0, [], "pointer", ["pointer"])
    }

    // public Void set_firstSelectedGameObject(GameObject value)
    @cache
    static get _set_firstSelectedGameObject() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.EventSystem", "set_firstSelectedGameObject", 1, ["UnityEngine.GameObject"], "void", ["pointer", "pointer"])
    }

    // public GameObject get_currentSelectedGameObject()
    @cache
    static get _get_currentSelectedGameObject() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.EventSystem", "get_currentSelectedGameObject", 0, [], "pointer", ["pointer"])
    }

    // public GameObject get_lastSelectedGameObject()
    @cache
    static get _get_lastSelectedGameObject() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.EventSystem", "get_lastSelectedGameObject", 0, [], "pointer", ["pointer"])
    }

    // public Boolean get_isFocused()
    @cache
    static get _get_isFocused() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.EventSystem", "get_isFocused", 0, [], "pointer", ["pointer"])
    }

    // protected Void .ctor()
    @cache
    static get __ctor() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.EventSystem", ".ctor", 0, [], "void", ["pointer"])
    }

    // public Void UpdateModules()
    @cache
    static get _UpdateModules() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.EventSystem", "UpdateModules", 0, [], "void", ["pointer"])
    }

    // public Boolean get_alreadySelecting()
    @cache
    static get _get_alreadySelecting() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.EventSystem", "get_alreadySelecting", 0, [], "pointer", ["pointer"])
    }

    // public Void SetSelectedGameObject(GameObject selected,BaseEventData pointer)
    @cache
    static get _SetSelectedGameObject() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.EventSystem", "SetSelectedGameObject", 2, ["UnityEngine.GameObject", "UnityEngine.EventSystems.BaseEventData"], "void", ["pointer", "pointer", "pointer"])
    }

    // private BaseEventData get_baseEventDataCache()
    @cache
    static get _get_baseEventDataCache() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.EventSystem", "get_baseEventDataCache", 0, [], "pointer", ["pointer"])
    }

    // public Void SetSelectedGameObject(GameObject selected)
    @cache
    static get _SetSelectedGameObject_selected() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.EventSystem", "SetSelectedGameObject", 1, ["UnityEngine.GameObject"], "void", ["pointer", "pointer"])
    }

    // private static Int32 RaycastComparer(RaycastResult lhs,RaycastResult rhs)
    @cache
    static get _RaycastComparer() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.EventSystem", "RaycastComparer", 2, ["UnityEngine.EventSystems.RaycastResult", "UnityEngine.EventSystems.RaycastResult"], "pointer", ["pointer", "pointer"])
    }

    // public Void RaycastAll(PointerEventData eventData,RaycastResult> raycastResults)
    @cache
    static get _RaycastAll() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.EventSystem", "RaycastAll", 2, ["UnityEngine.EventSystems.PointerEventData", "System.Collections.Generic.List<UnityEngine.EventSystems.RaycastResult>"], "void", ["pointer", "pointer", "pointer"])
    }

    // public Boolean IsPointerOverGameObject()
    @cache
    static get _IsPointerOverGameObject() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.EventSystem", "IsPointerOverGameObject", 0, [], "pointer", ["pointer"])
    }

    // public Boolean IsPointerOverGameObject(Int32 pointerId)
    @cache
    static get _IsPointerOverGameObject_pointerId() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.EventSystem", "IsPointerOverGameObject", 1, ["System.Int32"], "pointer", ["pointer", "pointer"])
    }

    // protected override Void OnEnable()
    @cache
    static get _OnEnable() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.EventSystem", "OnEnable", 0, [], "void", ["pointer"])
    }

    // protected override Void OnDisable()
    @cache
    static get _OnDisable() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.EventSystem", "OnDisable", 0, [], "void", ["pointer"])
    }

    // private Void TickModules()
    @cache
    static get _TickModules() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.EventSystem", "TickModules", 0, [], "void", ["pointer"])
    }

    // protected virtual Void OnApplicationFocus(Boolean hasFocus)
    @cache
    static get _OnApplicationFocus() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.EventSystem", "OnApplicationFocus", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // protected virtual Void Update()
    @cache
    static get _Update() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.EventSystem", "Update", 0, [], "void", ["pointer"])
    }

    // private Void ChangeEventModule(BaseInputModule module)
    @cache
    static get _ChangeEventModule() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.EventSystem", "ChangeEventModule", 1, ["UnityEngine.EventSystems.BaseInputModule"], "void", ["pointer", "pointer"])
    }

    // public override String ToString()
    @cache
    static get _ToString() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.EventSystem", "ToString", 0, [], "pointer", ["pointer"])
    }

    // private static Void .cctor()
    @cache
    static get __cctor() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.EventSystem", ".cctor", 0, [], "void", [])
    }

}

Il2Cpp.Api.EventSystem = UnityEngine_EventSystems_EventSystem_API

declare global {
    namespace Il2Cpp.Api {
        class EventSystem extends UnityEngine_EventSystems_EventSystem_API { }
    }
}

export { }