import { cache } from "decorator-cache-getter"

class UnityEngine_EventSystems_PointerInputModule_API {
    // protected Void .ctor()
    @cache
    static get __ctor() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.PointerInputModule", ".ctor", 0, [], "void", ["pointer"])
    }

    // protected Boolean GetPointerData(Int32 id,PointerEventData& data,Boolean create)
    @cache
    static get _GetPointerData() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.PointerInputModule", "GetPointerData", 3, ["System.Int32", "UnityEngine.EventSystems.PointerEventData&", "System.Boolean"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // protected Void RemovePointerData(PointerEventData data)
    @cache
    static get _RemovePointerData() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.PointerInputModule", "RemovePointerData", 1, ["UnityEngine.EventSystems.PointerEventData"], "void", ["pointer", "pointer"])
    }

    // protected PointerEventData GetTouchPointerEventData(Touch input,Boolean& pressed,Boolean& released)
    @cache
    static get _GetTouchPointerEventData() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.PointerInputModule", "GetTouchPointerEventData", 3, ["UnityEngine.Touch", "System.Boolean&", "System.Boolean&"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // protected Void CopyFromTo(PointerEventData from,PointerEventData to)
    @cache
    static get _CopyFromTo() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.PointerInputModule", "CopyFromTo", 2, ["UnityEngine.EventSystems.PointerEventData", "UnityEngine.EventSystems.PointerEventData"], "void", ["pointer", "pointer", "pointer"])
    }

    // protected FramePressState StateForMouseButton(Int32 buttonId)
    @cache
    static get _StateForMouseButton() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.PointerInputModule", "StateForMouseButton", 1, ["System.Int32"], "pointer", ["pointer", "pointer"])
    }

    // protected virtual MouseState GetMousePointerEventData()
    @cache
    static get _GetMousePointerEventData() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.PointerInputModule", "GetMousePointerEventData", 0, [], "pointer", ["pointer"])
    }

    // protected virtual MouseState GetMousePointerEventData(Int32 id)
    @cache
    static get _GetMousePointerEventData_id() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.PointerInputModule", "GetMousePointerEventData", 1, ["System.Int32"], "pointer", ["pointer", "pointer"])
    }

    // protected PointerEventData GetLastPointerEventData(Int32 id)
    @cache
    static get _GetLastPointerEventData() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.PointerInputModule", "GetLastPointerEventData", 1, ["System.Int32"], "pointer", ["pointer", "pointer"])
    }

    // private static Boolean ShouldStartDrag(Vector2 pressPos,Vector2 currentPos,Single threshold,Boolean useDragThreshold)
    @cache
    static get _ShouldStartDrag() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.PointerInputModule", "ShouldStartDrag", 4, ["UnityEngine.Vector2", "UnityEngine.Vector2", "System.Single", "System.Boolean"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // protected virtual Void ProcessMove(PointerEventData pointerEvent)
    @cache
    static get _ProcessMove() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.PointerInputModule", "ProcessMove", 1, ["UnityEngine.EventSystems.PointerEventData"], "void", ["pointer", "pointer"])
    }

    // protected virtual Void ProcessDrag(PointerEventData pointerEvent)
    @cache
    static get _ProcessDrag() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.PointerInputModule", "ProcessDrag", 1, ["UnityEngine.EventSystems.PointerEventData"], "void", ["pointer", "pointer"])
    }

    // public override Boolean IsPointerOverGameObject(Int32 pointerId)
    @cache
    static get _IsPointerOverGameObject() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.PointerInputModule", "IsPointerOverGameObject", 1, ["System.Int32"], "pointer", ["pointer", "pointer"])
    }

    // protected Void ClearSelection()
    @cache
    static get _ClearSelection() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.PointerInputModule", "ClearSelection", 0, [], "void", ["pointer"])
    }

    // public override String ToString()
    @cache
    static get _ToString() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.PointerInputModule", "ToString", 0, [], "pointer", ["pointer"])
    }

    // protected Void DeselectIfSelectionChanged(GameObject currentOverGo,BaseEventData pointerEvent)
    @cache
    static get _DeselectIfSelectionChanged() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.PointerInputModule", "DeselectIfSelectionChanged", 2, ["UnityEngine.GameObject", "UnityEngine.EventSystems.BaseEventData"], "void", ["pointer", "pointer", "pointer"])
    }

}

Il2Cpp.Api.PointerInputModule = UnityEngine_EventSystems_PointerInputModule_API

declare global {
    namespace Il2Cpp.Api {
        class PointerInputModule extends UnityEngine_EventSystems_PointerInputModule_API { }
    }
}

export { }