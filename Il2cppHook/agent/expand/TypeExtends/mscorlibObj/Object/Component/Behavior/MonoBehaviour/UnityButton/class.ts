import { cache } from "decorator-cache-getter"

class _UnityButton_API {
    // protected virtual Void OnPressed()
    @cache
    static get _OnPressed() {
        return Il2Cpp.Api.o("Assembly-CSharp", "UnityButton", "OnPressed", 0, [], "void", ["pointer"])
    }

    // protected virtual Void OnClick()
    @cache
    static get _OnClick() {
        return Il2Cpp.Api.o("Assembly-CSharp", "UnityButton", "OnClick", 0, [], "void", ["pointer"])
    }

    // protected Void .ctor()
    @cache
    static get __ctor() {
        return Il2Cpp.Api.o("Assembly-CSharp", "UnityButton", ".ctor", 0, [], "void", ["pointer"])
    }

    // public Boolean get_IsInteractable()
    @cache
    static get _get_IsInteractable() {
        return Il2Cpp.Api.o("Assembly-CSharp", "UnityButton", "get_IsInteractable", 0, [], "pointer", ["pointer"])
    }

    // public Void set_IsInteractable(Boolean value)
    @cache
    static get _set_IsInteractable() {
        return Il2Cpp.Api.o("Assembly-CSharp", "UnityButton", "set_IsInteractable", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // protected virtual Void SetInteractable(Boolean value)
    @cache
    static get _SetInteractable() {
        return Il2Cpp.Api.o("Assembly-CSharp", "UnityButton", "SetInteractable", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // public Void OnPointerClick(PointerEventData eventData)
    @cache
    static get _OnPointerClick() {
        return Il2Cpp.Api.o("Assembly-CSharp", "UnityButton", "OnPointerClick", 1, ["UnityEngine.EventSystems.PointerEventData"], "void", ["pointer", "pointer"])
    }

    // public Void AddClickListener(Action onClick)
    @cache
    static get _AddClickListener() {
        return Il2Cpp.Api.o("Assembly-CSharp", "UnityButton", "AddClickListener", 1, ["System.Action"], "void", ["pointer", "pointer"])
    }

    // public Void RemoveClickListener(Action onClick)
    @cache
    static get _RemoveClickListener() {
        return Il2Cpp.Api.o("Assembly-CSharp", "UnityButton", "RemoveClickListener", 1, ["System.Action"], "void", ["pointer", "pointer"])
    }

    // public Void RemoveAllListeners()
    @cache
    static get _RemoveAllListeners() {
        return Il2Cpp.Api.o("Assembly-CSharp", "UnityButton", "RemoveAllListeners", 0, [], "void", ["pointer"])
    }

    // public Void OnPointerDown(PointerEventData eventData)
    @cache
    static get _OnPointerDown() {
        return Il2Cpp.Api.o("Assembly-CSharp", "UnityButton", "OnPointerDown", 1, ["UnityEngine.EventSystems.PointerEventData"], "void", ["pointer", "pointer"])
    }

    // public Void OnPointerUp(PointerEventData eventData)
    @cache
    static get _OnPointerUp() {
        return Il2Cpp.Api.o("Assembly-CSharp", "UnityButton", "OnPointerUp", 1, ["UnityEngine.EventSystems.PointerEventData"], "void", ["pointer", "pointer"])
    }

    // protected virtual Void OnPointerExitClick()
    @cache
    static get _OnPointerExitClick() {
        return Il2Cpp.Api.o("Assembly-CSharp", "UnityButton", "OnPointerExitClick", 0, [], "void", ["pointer"])
    }

    // public Void OnPointerExit(PointerEventData eventData)
    @cache
    static get _OnPointerExit() {
        return Il2Cpp.Api.o("Assembly-CSharp", "UnityButton", "OnPointerExit", 1, ["UnityEngine.EventSystems.PointerEventData"], "void", ["pointer", "pointer"])
    }

    // public Void FakeClick()
    @cache
    static get _FakeClick() {
        return Il2Cpp.Api.o("Assembly-CSharp", "UnityButton", "FakeClick", 0, [], "void", ["pointer"])
    }

    // public Void CancelFakeClick()
    @cache
    static get _CancelFakeClick() {
        return Il2Cpp.Api.o("Assembly-CSharp", "UnityButton", "CancelFakeClick", 0, [], "void", ["pointer"])
    }

    // protected abstract ButtonSfx get_Sfx()
    @cache
    static get _get_Sfx() {
        return Il2Cpp.Api.o("Assembly-CSharp", "UnityButton", "get_Sfx", 0, [], "pointer", ["pointer"])
    }

}

Il2Cpp.Api.UnityButton = _UnityButton_API

declare global {
    namespace Il2Cpp.Api {
        class UnityButton extends _UnityButton_API { }
    }
}

export { }