import { UnityEngine_EventSystems_PointerEventData_Impl as PointerEventData } from "../../../../../../../../AbstractEventData/BaseEventData/PointerEventData/class"
import { UnityEngine_Vector2_Impl as Vector2 } from "../../../../../../../../ValueType/Vector2/class"
import { GameObjectImpl as GameObject } from "../../../../../../../GameObject/class"
import { UnityEngine_EventSystems_PointerInputModule_Impl } from "../class"
import { UnityEngine_EventSystems_StandaloneInputModule_InputMode } from "./enum"

type System_Int32 = number
type System_Single = number
type System_String = string
type System_Boolean = boolean
type System_Void = void
type UnityEngine_EventSystems_PointerInputModule_MouseButtonEventData = void

class UnityEngine_EventSystems_StandaloneInputModule_Impl extends UnityEngine_EventSystems_PointerInputModule_Impl {

    m_PrevActionTime: System_Single = lfv(this.handle, "m_PrevActionTime") as unknown as System_Single
    m_LastMoveVector: Vector2 = lfv(this.handle, "m_LastMoveVector") as unknown as Vector2
    m_ConsecutiveMoveCount: System_Int32 = lfv(this.handle, "m_ConsecutiveMoveCount") as unknown as System_Int32
    m_LastMousePosition: Vector2 = lfv(this.handle, "m_LastMousePosition") as unknown as Vector2
    m_MousePosition: Vector2 = lfv(this.handle, "m_MousePosition") as unknown as Vector2
    m_CurrentFocusedGameObject: GameObject = lfv(this.handle, "m_CurrentFocusedGameObject") as unknown as GameObject
    m_InputPointerEvent: PointerEventData = new PointerEventData(lfv(this.handle, "m_InputPointerEvent"))
    m_HorizontalAxis: System_String = lfv(this.handle, "m_HorizontalAxis") as unknown as System_String
    m_VerticalAxis: System_String = lfv(this.handle, "m_VerticalAxis") as unknown as System_String
    m_SubmitButton: System_String = lfv(this.handle, "m_SubmitButton") as unknown as System_String
    m_CancelButton: System_String = lfv(this.handle, "m_CancelButton") as unknown as System_String
    m_InputActionsPerSecond: System_Single = lfv(this.handle, "m_InputActionsPerSecond") as unknown as System_Single
    m_RepeatDelay: System_Single = lfv(this.handle, "m_RepeatDelay") as unknown as System_Single
    m_ForceModuleActive: System_Boolean = lfv(this.handle, "m_ForceModuleActive") as unknown as System_Boolean

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    _ctor(): System_Void {
        return Il2Cpp.Api.StandaloneInputModule.__ctor(this.handle)
    }

    get_inputMode(): UnityEngine_EventSystems_StandaloneInputModule_InputMode {
        return Il2Cpp.Api.StandaloneInputModule._get_inputMode(this.handle)
    }

    get_allowActivationOnMobileDevice(): System_Boolean {
        return Il2Cpp.Api.StandaloneInputModule._get_allowActivationOnMobileDevice(this.handle)
    }

    set_allowActivationOnMobileDevice(value: System_Boolean): System_Void {
        return Il2Cpp.Api.StandaloneInputModule._set_allowActivationOnMobileDevice(this.handle, value)
    }

    get_forceModuleActive(): System_Boolean {
        return Il2Cpp.Api.StandaloneInputModule._get_forceModuleActive(this.handle)
    }

    set_forceModuleActive(value: System_Boolean): System_Void {
        return Il2Cpp.Api.StandaloneInputModule._set_forceModuleActive(this.handle, value)
    }

    get_inputActionsPerSecond(): System_Single {
        return Il2Cpp.Api.StandaloneInputModule._get_inputActionsPerSecond(this.handle)
    }

    set_inputActionsPerSecond(value: System_Single): System_Void {
        return Il2Cpp.Api.StandaloneInputModule._set_inputActionsPerSecond(this.handle, value)
    }

    get_repeatDelay(): System_Single {
        return Il2Cpp.Api.StandaloneInputModule._get_repeatDelay(this.handle)
    }

    set_repeatDelay(value: System_Single): System_Void {
        return Il2Cpp.Api.StandaloneInputModule._set_repeatDelay(this.handle, value)
    }

    get_horizontalAxis(): System_String {
        return readU16(Il2Cpp.Api.StandaloneInputModule._get_horizontalAxis(this.handle))
    }

    set_horizontalAxis(value: System_String): System_Void {
        return Il2Cpp.Api.StandaloneInputModule._set_horizontalAxis(this.handle, value)
    }

    get_verticalAxis(): System_String {
        return readU16(Il2Cpp.Api.StandaloneInputModule._get_verticalAxis(this.handle))
    }

    set_verticalAxis(value: System_String): System_Void {
        return Il2Cpp.Api.StandaloneInputModule._set_verticalAxis(this.handle, value)
    }

    get_submitButton(): System_String {
        return readU16(Il2Cpp.Api.StandaloneInputModule._get_submitButton(this.handle))
    }

    set_submitButton(value: System_String): System_Void {
        return Il2Cpp.Api.StandaloneInputModule._set_submitButton(this.handle, value)
    }

    get_cancelButton(): System_String {
        return readU16(Il2Cpp.Api.StandaloneInputModule._get_cancelButton(this.handle))
    }

    set_cancelButton(value: System_String): System_Void {
        return Il2Cpp.Api.StandaloneInputModule._set_cancelButton(this.handle, value)
    }

    ShouldIgnoreEventsOnNoFocus(): System_Boolean {
        return Il2Cpp.Api.StandaloneInputModule._ShouldIgnoreEventsOnNoFocus(this.handle)
    }

    UpdateModule(): System_Void {
        return Il2Cpp.Api.StandaloneInputModule._UpdateModule(this.handle)
    }

    IsModuleSupported(): System_Boolean {
        return Il2Cpp.Api.StandaloneInputModule._IsModuleSupported(this.handle)
    }

    ShouldActivateModule(): System_Boolean {
        return Il2Cpp.Api.StandaloneInputModule._ShouldActivateModule(this.handle)
    }

    ActivateModule(): System_Void {
        return Il2Cpp.Api.StandaloneInputModule._ActivateModule(this.handle)
    }

    DeactivateModule(): System_Void {
        return Il2Cpp.Api.StandaloneInputModule._DeactivateModule(this.handle)
    }

    Process(): System_Void {
        return Il2Cpp.Api.StandaloneInputModule._Process(this.handle)
    }

    ProcessTouchEvents(): System_Boolean {
        return Il2Cpp.Api.StandaloneInputModule._ProcessTouchEvents(this.handle)
    }

    ProcessTouchPress(pointerEvent: PointerEventData, pressed: System_Boolean, released: System_Boolean): System_Void {
        return Il2Cpp.Api.StandaloneInputModule._ProcessTouchPress(this.handle, pointerEvent, pressed, released)
    }

    SendSubmitEventToSelectedObject(): System_Boolean {
        return Il2Cpp.Api.StandaloneInputModule._SendSubmitEventToSelectedObject(this.handle)
    }

    GetRawMoveVector(): Vector2 {
        return Il2Cpp.Api.StandaloneInputModule._GetRawMoveVector(this.handle)
    }

    SendMoveEventToSelectedObject(): System_Boolean {
        return Il2Cpp.Api.StandaloneInputModule._SendMoveEventToSelectedObject(this.handle)
    }

    ProcessMouseEvent(): System_Void {
        return Il2Cpp.Api.StandaloneInputModule._ProcessMouseEvent(this.handle)
    }

    ForceAutoSelect(): System_Boolean {
        return Il2Cpp.Api.StandaloneInputModule._ForceAutoSelect(this.handle)
    }

    ProcessMouseEvent_1(id: System_Int32): System_Void {
        return Il2Cpp.Api.StandaloneInputModule._ProcessMouseEvent(this.handle, id)
    }

    SendUpdateEventToSelectedObject(): System_Boolean {
        return Il2Cpp.Api.StandaloneInputModule._SendUpdateEventToSelectedObject(this.handle)
    }

    ProcessMousePress(data: UnityEngine_EventSystems_PointerInputModule_MouseButtonEventData): System_Void {
        return Il2Cpp.Api.StandaloneInputModule._ProcessMousePress(this.handle, data)
    }

    GetCurrentFocusedGameObject(): GameObject {
        return Il2Cpp.Api.StandaloneInputModule._GetCurrentFocusedGameObject(this.handle)
    }

}

Il2Cpp.StandaloneInputModule = UnityEngine_EventSystems_StandaloneInputModule_Impl

declare global {
    namespace Il2Cpp {
        class StandaloneInputModule extends UnityEngine_EventSystems_StandaloneInputModule_Impl { }
    }
}

export { UnityEngine_EventSystems_StandaloneInputModule_Impl }
