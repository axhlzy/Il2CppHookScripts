import { UnityEngine_Touch_Impl as Touch } from "../../../../../../ValueType/Touch/class"
import { UnityEngine_Vector2_Impl as Vector2 } from "../../../../../../ValueType/Vector2/class"
import { UnityEngine_EventSystems_UIBehaviour_Impl } from "../class"

type System_Boolean = boolean
type System_Void = void
type System_Int32 = number
type System_String = string
type System_Single = number

class UnityEngine_EventSystems_BaseInput_Impl extends UnityEngine_EventSystems_UIBehaviour_Impl {

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    _ctor(): System_Void {
        return Il2Cpp.Api.BaseInput.__ctor(this.handle)
    }

    get_compositionString(): System_String {
        return readU16(Il2Cpp.Api.BaseInput._get_compositionString(this.handle))
    }

    get_imeCompositionMode(): UnityEngine_IMECompositionMode {
        return Il2Cpp.Api.BaseInput._get_imeCompositionMode(this.handle)
    }

    set_imeCompositionMode(value: UnityEngine_IMECompositionMode): System_Void {
        return Il2Cpp.Api.BaseInput._set_imeCompositionMode(this.handle, value)
    }

    get_compositionCursorPos(): Vector2 {
        return new Vector2(Il2Cpp.Api.BaseInput._get_compositionCursorPos(this.handle))
    }

    set_compositionCursorPos(value: Vector2): System_Void {
        return Il2Cpp.Api.BaseInput._set_compositionCursorPos(this.handle, value.handle)
    }

    get_mousePresent(): System_Boolean {
        return Il2Cpp.Api.BaseInput._get_mousePresent(this.handle)
    }

    GetMouseButtonDown(button: System_Int32): System_Boolean {
        return Il2Cpp.Api.BaseInput._GetMouseButtonDown(this.handle, button)
    }

    GetMouseButtonUp(button: System_Int32): System_Boolean {
        return Il2Cpp.Api.BaseInput._GetMouseButtonUp(this.handle, button)
    }

    GetMouseButton(button: System_Int32): System_Boolean {
        return Il2Cpp.Api.BaseInput._GetMouseButton(this.handle, button)
    }

    get_mousePosition(): Vector2 {
        return new Vector2(Il2Cpp.Api.BaseInput._get_mousePosition(this.handle))
    }

    get_mouseScrollDelta(): Vector2 {
        return new Vector2(Il2Cpp.Api.BaseInput._get_mouseScrollDelta(this.handle))
    }

    get_touchSupported(): System_Boolean {
        return Il2Cpp.Api.BaseInput._get_touchSupported(this.handle)
    }

    get_touchCount(): System_Int32 {
        return Il2Cpp.Api.BaseInput._get_touchCount(this.handle).toInt32()
    }

    GetTouch(index: System_Int32): Touch {
        return new Touch(Il2Cpp.Api.BaseInput._GetTouch(this.handle, index))
    }

    GetAxisRaw(axisName: System_String): System_Single {
        return Il2Cpp.Api.BaseInput._GetAxisRaw(this.handle, axisName)
    }

    GetButtonDown(buttonName: System_String): System_Boolean {
        return Il2Cpp.Api.BaseInput._GetButtonDown(this.handle, buttonName)
    }

}

Il2Cpp.BaseInput = UnityEngine_EventSystems_BaseInput_Impl

declare global {
    namespace Il2Cpp {
        class BaseInput extends UnityEngine_EventSystems_BaseInput_Impl { }
    }
}

export { UnityEngine_EventSystems_BaseInput_Impl }
