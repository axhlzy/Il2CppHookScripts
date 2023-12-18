import { UnityEngine_EventSystems_PointerEventData_Impl as PointerEventData } from "../../../../../AbstractEventData/BaseEventData/PointerEventData/class"
import { UnityEngine_EventSystems_BaseEventData_Impl as BaseEventData } from "../../../../../AbstractEventData/BaseEventData/class"
import { UnityEngine_MonoBehaviour_Impl } from "../class"

class UnityEngine_EventSystems_EventTrigger_Impl extends UnityEngine_MonoBehaviour_Impl {

    // m_Delegates: System_Collections.Generic.List<UnityEngine.EventSystems.EventTrigger.Entry> = lfv(this.handle, "m_Delegates") as unknown as System_Collections.Generic.List<UnityEngine.EventSystems.EventTrigger.Entry>
    m_Delegates: NativePointer = lfv(this.handle, "m_Delegates")

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    // get_delegates(): System_Collections.Generic.List<UnityEngine.EventSystems.EventTrigger.Entry> {
    //         return Il2Cpp.Api.EventTrigger._get_delegates(this.handle)
    // }

    // set_delegates(value:System_Collections.Generic.List<UnityEngine.EventSystems.EventTrigger.Entry>): System_Void {
    //         return Il2Cpp.Api.EventTrigger._set_delegates(this.handle , value)
    // }

    _ctor_EventTrigger(): System_Void {
        return Il2Cpp.Api.EventTrigger.__ctor(this.handle)
    }

    // get_triggers(): System_Collections.Generic.List<UnityEngine.EventSystems.EventTrigger.Entry> {
    //         return Il2Cpp.Api.EventTrigger._get_triggers(this.handle)
    // }

    // set_triggers(value:System_Collections.Generic.List<UnityEngine.EventSystems.EventTrigger.Entry>): System_Void {
    //         return Il2Cpp.Api.EventTrigger._set_triggers(this.handle , value)
    // }

    // Execute(id:UnityEngine_EventSystems.EventTriggerType, eventData:BaseEventData): System_Void {
    //         return Il2Cpp.Api.EventTrigger._Execute(this.handle , id, eventData)
    // }

    OnPointerEnter(eventData: PointerEventData): System_Void {
        return Il2Cpp.Api.EventTrigger._OnPointerEnter(this.handle, eventData)
    }

    OnPointerExit(eventData: PointerEventData): System_Void {
        return Il2Cpp.Api.EventTrigger._OnPointerExit(this.handle, eventData)
    }

    OnDrag(eventData: PointerEventData): System_Void {
        return Il2Cpp.Api.EventTrigger._OnDrag(this.handle, eventData)
    }

    OnDrop(eventData: PointerEventData): System_Void {
        return Il2Cpp.Api.EventTrigger._OnDrop(this.handle, eventData)
    }

    OnPointerDown(eventData: PointerEventData): System_Void {
        return Il2Cpp.Api.EventTrigger._OnPointerDown(this.handle, eventData)
    }

    OnPointerUp(eventData: PointerEventData): System_Void {
        return Il2Cpp.Api.EventTrigger._OnPointerUp(this.handle, eventData)
    }

    OnPointerClick(eventData: PointerEventData): System_Void {
        return Il2Cpp.Api.EventTrigger._OnPointerClick(this.handle, eventData)
    }

    OnSelect(eventData: BaseEventData): System_Void {
        return Il2Cpp.Api.EventTrigger._OnSelect(this.handle, eventData)
    }

    OnDeselect(eventData: BaseEventData): System_Void {
        return Il2Cpp.Api.EventTrigger._OnDeselect(this.handle, eventData)
    }

    OnScroll(eventData: PointerEventData): System_Void {
        return Il2Cpp.Api.EventTrigger._OnScroll(this.handle, eventData)
    }

    // OnMove(eventData:UnityEngine_EventSystems.AxisEventData): System_Void {
    //         return Il2Cpp.Api.EventTrigger._OnMove(this.handle , eventData)
    // }

    OnUpdateSelected(eventData: BaseEventData): System_Void {
        return Il2Cpp.Api.EventTrigger._OnUpdateSelected(this.handle, eventData)
    }

    OnInitializePotentialDrag(eventData: PointerEventData): System_Void {
        return Il2Cpp.Api.EventTrigger._OnInitializePotentialDrag(this.handle, eventData)
    }

    OnBeginDrag(eventData: PointerEventData): System_Void {
        return Il2Cpp.Api.EventTrigger._OnBeginDrag(this.handle, eventData)
    }

    OnEndDrag(eventData: PointerEventData): System_Void {
        return Il2Cpp.Api.EventTrigger._OnEndDrag(this.handle, eventData)
    }

    OnSubmit(eventData: BaseEventData): System_Void {
        return Il2Cpp.Api.EventTrigger._OnSubmit(this.handle, eventData)
    }

    OnCancel(eventData: BaseEventData): System_Void {
        return Il2Cpp.Api.EventTrigger._OnCancel(this.handle, eventData)
    }

}

type System_Void = void

Il2Cpp.EventTrigger = UnityEngine_EventSystems_EventTrigger_Impl

declare global {
    namespace Il2Cpp {
        class EventTrigger extends UnityEngine_EventSystems_EventTrigger_Impl { }
    }
}

export { UnityEngine_EventSystems_EventTrigger_Impl }