import { UnityEngine_EventSystems_PointerEventData_Impl as PointerEventData } from "../../../../../../AbstractEventData/BaseEventData/PointerEventData/class"
import { UnityEngine_EventSystems_BaseEventData_Impl as BaseEventData } from "../../../../../../AbstractEventData/BaseEventData/class"
import { UnityEngine_UI_Button_ButtonClickedEvent_Impl as ButtonClickedEvent } from "../../../../../../UnityEventBase/UnityEvent/ButtonClickedEvent/class"
import { UnityEngine_UI_Selectable_Impl as Selectable } from "../class"
import { IEnumerator } from "../../../../../../interface"

type System_Void = void

class UnityEngine_UI_Button_Impl extends Selectable {

    m_OnClick: PointerEventData = new PointerEventData(lfv(this.handle, "m_OnClick"))

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    _ctor_Button(): System_Void {
        return Il2Cpp.Api.Button._ctor(this.handle)
    }

    get_onClick(): ButtonClickedEvent {
        return new ButtonClickedEvent(Il2Cpp.Api.Button._get_onClick(this.handle))
    }

    set_onClick(value: PointerEventData): System_Void {
        return Il2Cpp.Api.Button._set_onClick(this.handle, value)
    }

    Press(): System_Void {
        return Il2Cpp.Api.Button._Press(this.handle)
    }

    OnPointerClick(eventData: PointerEventData): System_Void {
        return Il2Cpp.Api.Button._OnPointerClick(this.handle, eventData)
    }

    OnSubmit(eventData: BaseEventData): System_Void {
        return Il2Cpp.Api.Button._OnSubmit(this.handle, eventData)
    }

    OnFinishSubmit(): IEnumerator {
        return Il2Cpp.Api.Button._OnFinishSubmit(this.handle)
    }

}

Il2Cpp.Button = UnityEngine_UI_Button_Impl

declare global {
    namespace Il2Cpp {
        class Button extends UnityEngine_UI_Button_Impl { }
    }
}

export { UnityEngine_UI_Button_Impl as Button }