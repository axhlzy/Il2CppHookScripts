import { cache } from "decorator-cache-getter"

class UnityEngine_UI_Button_ButtonClickedEvent_API {
    // public Void .ctor()
    @cache
    static get __ctor() {
        return Il2Cpp.Api.o("UnityEngine.UI", "ButtonClickedEvent", ".ctor", 0, [], "void", ["pointer"])
    }

}

Il2Cpp.Api.ButtonClickedEvent = UnityEngine_UI_Button_ButtonClickedEvent_API

declare global {
    namespace Il2Cpp.Api {
        class ButtonClickedEvent extends UnityEngine_UI_Button_ButtonClickedEvent_API { }
    }
}

export { }