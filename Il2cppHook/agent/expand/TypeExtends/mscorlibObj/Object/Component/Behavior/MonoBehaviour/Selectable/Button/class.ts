import { UnityEngine_EventSystems_PointerEventData_Impl as PointerEventData } from "../../../../../../AbstractEventData/BaseEventData/PointerEventData/class"
import { UnityEngine_UI_Button_ButtonClickedEvent_Impl as ButtonClickedEvent } from "../../../../../../UnityEventBase/UnityEvent/ButtonClickedEvent/class"
import { UnityEngine_UI_Selectable_Impl as Selectable } from "../class"

class ButtonImpl extends Selectable {

    m_OnClick: ButtonClickedEvent = new ButtonClickedEvent(lfv(this.handle, "m_OnClick"))

    static get ctor_0(): Il2Cpp.Button {
        return new Il2Cpp.Button(Il2Cpp.Api.Button._ctor(alloc()))
    }

    OnFinishSubmit() {
        return Il2Cpp.Api.Button._OnFinishSubmit(this.handle)
    }

    OnPointerClick(PointerEventData: PointerEventData): void {
        return Il2Cpp.Api.Button._OnPointerClick(this.handle, PointerEventData.handle)
    }

    OnSubmit(BaseEventData: NativePointer): void {
        return Il2Cpp.Api.Button._OnSubmit(this.handle, BaseEventData)
    }

    // 模拟点击
    Press(): void {
        return Il2Cpp.Api.Button._Press(this.handle)
    }

    get_onClick(): ButtonClickedEvent {
        return new ButtonClickedEvent(Il2Cpp.Api.Button._get_onClick(this.handle))
    }

    set_onClick(ButtonClickedEvent: NativePointer): void {
        return Il2Cpp.Api.Button._set_onClick(this.handle, ButtonClickedEvent)
    }
}

declare global {
    namespace Il2Cpp {
        class Button extends ButtonImpl { }
    }
}

Il2Cpp.Button = ButtonImpl

export { ButtonImpl }