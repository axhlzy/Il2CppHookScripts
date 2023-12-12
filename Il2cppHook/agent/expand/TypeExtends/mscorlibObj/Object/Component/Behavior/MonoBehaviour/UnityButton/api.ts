import { UnityEngine_EventSystems_PointerEventData_Impl as PointerEventData } from "../../../../../AbstractEventData/BaseEventData/PointerEventData/class"
import { UnityEngine_Events_UnityAction_Impl as UnityAction } from "../../../../../Delegate/MulticastDelegate/UnityAction/class"
import { UnityEngine_MonoBehaviour_Impl } from "../class"

class _UnityButton_Impl extends UnityEngine_MonoBehaviour_Impl {

        _onClick: UnityAction = new UnityAction(lfv(this.handle, "_onClick"))
        _isInteractable: System_Boolean = lfv(this.handle, "_isInteractable") as unknown as System_Boolean
        _isPressed: System_Boolean = lfv(this.handle, "_isPressed") as unknown as System_Boolean
        _ignorePointerClick: System_Boolean = lfv(this.handle, "_ignorePointerClick") as unknown as System_Boolean

        constructor(handleOrWrapper: NativePointer) {
                super(handleOrWrapper)
        }

        OnPressed(): System_Void {
                return Il2Cpp.Api.UnityButton._OnPressed(this.handle)
        }

        OnClick(): System_Void {
                return Il2Cpp.Api.UnityButton._OnClick(this.handle)
        }

        _ctor_UnityButton(): System_Void {
                return Il2Cpp.Api.UnityButton.__ctor(this.handle)
        }

        get_IsInteractable(): System_Boolean {
                return Il2Cpp.Api.UnityButton._get_IsInteractable(this.handle)
        }

        set_IsInteractable(value: System_Boolean): System_Void {
                return Il2Cpp.Api.UnityButton._set_IsInteractable(this.handle, value)
        }

        SetInteractable(value: System_Boolean): System_Void {
                return Il2Cpp.Api.UnityButton._SetInteractable(this.handle, value)
        }

        OnPointerClick(eventData: PointerEventData): System_Void {
                return Il2Cpp.Api.UnityButton._OnPointerClick(this.handle, eventData)
        }

        AddClickListener(onClick: UnityAction): System_Void {
                return Il2Cpp.Api.UnityButton._AddClickListener(this.handle, onClick)
        }

        RemoveClickListener(onClick: UnityAction): System_Void {
                return Il2Cpp.Api.UnityButton._RemoveClickListener(this.handle, onClick)
        }

        RemoveAllListeners(): System_Void {
                return Il2Cpp.Api.UnityButton._RemoveAllListeners(this.handle)
        }

        OnPointerDown(eventData: PointerEventData): System_Void {
                return Il2Cpp.Api.UnityButton._OnPointerDown(this.handle, eventData)
        }

        OnPointerUp(eventData: PointerEventData): System_Void {
                return Il2Cpp.Api.UnityButton._OnPointerUp(this.handle, eventData)
        }

        OnPointerExitClick(): System_Void {
                return Il2Cpp.Api.UnityButton._OnPointerExitClick(this.handle)
        }

        OnPointerExit(eventData: PointerEventData): System_Void {
                return Il2Cpp.Api.UnityButton._OnPointerExit(this.handle, eventData)
        }

        FakeClick(): System_Void {
                return Il2Cpp.Api.UnityButton._FakeClick(this.handle)
        }

        CancelFakeClick(): System_Void {
                return Il2Cpp.Api.UnityButton._CancelFakeClick(this.handle)
        }

        get_Sfx(): ButtonSfx {
                return Il2Cpp.Api.UnityButton._get_Sfx(this.handle)
        }

}

type System_Void = NativePointer
type System_Boolean = NativePointer
type ButtonSfx = NativePointer


Il2Cpp.UnityButton = _UnityButton_Impl

declare global {
        namespace Il2Cpp {
                class UnityButton extends _UnityButton_Impl { }
        }
}

export { _UnityButton_Impl }