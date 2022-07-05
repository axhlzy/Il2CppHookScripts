import { SelectableImpl } from "../class";

class ButtonImpl extends SelectableImpl implements Il2cppButton {

    ctor_0(): Il2Cpp.Button {
        return new ButtonImpl(Il2Cpp.Api.Button._ctor(alloc()));
    }

    OnFinishSubmit() {
        return Il2Cpp.Api.Button._OnFinishSubmit(this.handle);
    }

    OnPointerClick(PointerEventData: NativePointer): void {
        return Il2Cpp.Api.Button._OnPointerClick(this.handle, PointerEventData);
    }

    OnSubmit(BaseEventData: NativePointer): void {
        return Il2Cpp.Api.Button._OnSubmit(this.handle, BaseEventData);
    }

    Press(): void {
        return Il2Cpp.Api.Button._Press(this.handle);
    }

    get_onClick(): NativePointer {
        return Il2Cpp.Api.Button._get_onClick(this.handle);
    }

    set_onClick(ButtonClickedEvent: NativePointer): void {
        return Il2Cpp.Api.Button._set_onClick(this.handle, ButtonClickedEvent);
    }
}

declare global {
    namespace Il2Cpp {
        class Button extends ButtonImpl { }
    }
}

Il2Cpp.Button = ButtonImpl;

export { ButtonImpl }