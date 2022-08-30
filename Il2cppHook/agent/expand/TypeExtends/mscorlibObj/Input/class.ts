import { mscorlib_System_Object_impl as System_Object_Impl } from "../class"
import { UnityEngine_Touch_Impl as UnityEngine_Touch } from "../ValueType/Touch/class"
import { UnityEngine_Vector2_Impl as UnityEngine_Vector2 } from "../ValueType/Vector2/class"
import { UnityEngine_Vector3_Impl as UnityEngine_Vector3 } from "../ValueType/Vector3/class"

class UnityEngine_Input_Impl extends System_Object_Impl {

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    static GetKeyInt(key: UnityEngine_KeyCode): boolean {
        return Il2Cpp.Api.Input._GetKeyInt(key)
    }

    static GetKeyUpInt(key: UnityEngine_KeyCode): boolean {
        return Il2Cpp.Api.Input._GetKeyUpInt(key)
    }

    static GetKeyDownInt(key: UnityEngine_KeyCode): boolean {
        return Il2Cpp.Api.Input._GetKeyDownInt(key)
    }

    static GetAxis(axisName: string): number {
        return Il2Cpp.Api.Input._GetAxis(axisName)
    }

    static GetAxisRaw(axisName: string): number {
        return Il2Cpp.Api.Input._GetAxisRaw(axisName)
    }

    static GetButtonDown(buttonName: string): boolean {
        return Il2Cpp.Api.Input._GetButtonDown(buttonName)
    }

    static GetMouseButton(button: number): boolean {
        return Il2Cpp.Api.Input._GetMouseButton(button)
    }

    static GetMouseButtonDown(button: number): boolean {
        return Il2Cpp.Api.Input._GetMouseButtonDown(button)
    }

    static GetMouseButtonUp(button: number): boolean {
        return Il2Cpp.Api.Input._GetMouseButtonUp(button)
    }

    static GetTouch(index: number): UnityEngine_Touch {
        return Il2Cpp.Api.Input._GetTouch(index)
    }

    static GetKey(key: UnityEngine_KeyCode): boolean {
        return Il2Cpp.Api.Input._GetKey(key)
    }

    static GetKeyUp(key: UnityEngine_KeyCode): boolean {
        return Il2Cpp.Api.Input._GetKeyUp(key)
    }

    static GetKeyDown(key: UnityEngine_KeyCode): boolean {
        return Il2Cpp.Api.Input._GetKeyDown(key)
    }

    static set_simulateMouseWithTouches(value: boolean): void {
        return Il2Cpp.Api.Input._set_simulateMouseWithTouches(value)
    }

    static get_mousePosition(): UnityEngine_Vector3 {
        return Il2Cpp.Api.Input._get_mousePosition()
    }

    static get_mouseScrollDelta(): UnityEngine_Vector2 {
        return Il2Cpp.Api.Input._get_mouseScrollDelta()
    }

    static get_imeCompositionMode(): UnityEngine_IMECompositionMode {
        return Il2Cpp.Api.Input._get_imeCompositionMode()
    }

    static set_imeCompositionMode(value: UnityEngine_IMECompositionMode): void {
        return Il2Cpp.Api.Input._set_imeCompositionMode(value)
    }

    static get_compositionString(): string {
        return readU16(Il2Cpp.Api.Input._get_compositionString())
    }

    static get_compositionCursorPos(): UnityEngine_Vector2 {
        return Il2Cpp.Api.Input._get_compositionCursorPos()
    }

    static set_compositionCursorPos(value: UnityEngine_Vector2): void {
        return Il2Cpp.Api.Input._set_compositionCursorPos(value)
    }

    static get_mousePresent(): boolean {
        return Il2Cpp.Api.Input._get_mousePresent()
    }

    static get_touchCount(): number {
        return Il2Cpp.Api.Input._get_touchCount()
    }

    static get_touchSupported(): boolean {
        return Il2Cpp.Api.Input._get_touchSupported()
    }

    static set_multiTouchEnabled(value: boolean): void {
        return Il2Cpp.Api.Input._set_multiTouchEnabled(value)
    }

    static get_touches(): UnityEngine_Touch[] {
        return Il2Cpp.Api.Input._get_touches()
    }

    static GetTouch_Injected(index: number, ret: UnityEngine_Touch): void {
        return Il2Cpp.Api.Input._GetTouch_Injected(index, ret)
    }

    static get_mousePosition_Injected(ret: UnityEngine_Vector3): void {
        return Il2Cpp.Api.Input._get_mousePosition_Injected(ret)
    }

    static get_mouseScrollDelta_Injected(ret: UnityEngine_Vector2): void {
        return Il2Cpp.Api.Input._get_mouseScrollDelta_Injected(ret)
    }

    static get_compositionCursorPos_Injected(ret: UnityEngine_Vector2): void {
        return Il2Cpp.Api.Input._get_compositionCursorPos_Injected(ret)
    }

    static set_compositionCursorPos_Injected(value: UnityEngine_Vector2): void {
        return Il2Cpp.Api.Input._set_compositionCursorPos_Injected(value)
    }

}

Il2Cpp.Input = UnityEngine_Input_Impl

declare global {
    namespace Il2Cpp {
        class Input extends UnityEngine_Input_Impl { }
    }
}

export { UnityEngine_Input_Impl }