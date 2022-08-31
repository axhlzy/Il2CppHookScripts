import { UnityEngine_Events_UnityEvent_Impl } from "../class"

class UnityEngine_UI_Button_ButtonClickedEvent_Impl extends UnityEngine_Events_UnityEvent_Impl {

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    _ctor(): void {
        return Il2Cpp.Api.ButtonClickedEvent.__ctor(alloc())
    }

}

Il2Cpp.ButtonClickedEvent = UnityEngine_UI_Button_ButtonClickedEvent_Impl

declare global {
    namespace Il2Cpp {
        class ButtonClickedEvent extends UnityEngine_UI_Button_ButtonClickedEvent_Impl { }
    }
}

export { UnityEngine_UI_Button_ButtonClickedEvent_Impl }