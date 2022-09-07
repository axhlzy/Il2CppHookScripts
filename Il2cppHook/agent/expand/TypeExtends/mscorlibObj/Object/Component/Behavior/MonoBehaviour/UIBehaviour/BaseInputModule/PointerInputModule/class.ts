import { UnityEngine_EventSystems_BaseEventData_Impl as BaseEventData } from "../../../../../../../AbstractEventData/BaseEventData/class"
import { UnityEngine_Touch_Impl as Touch } from "../../../../../../../ValueType/Touch/class"
import { UnityEngine_Vector2_Impl as Vector2 } from "../../../../../../../ValueType/Vector2/class"
import { GameObjectImpl as GameObject } from "../../../../../../GameObject/class"
import { UnityEngine_EventSystems_BaseInputModule_Impl } from "../class"

type System_Int32 = number
type System_Boolean = boolean
type System_Single = NativePointer
type System_String = string
type UnityEngine_EventSystems_PointerEventData = number
type UnityEngine_EventSystems_PointerEventData_FramePressState = NativePointer
type UnityEngine_EventSystems_PointerInputModule_MouseState = NativePointer

class UnityEngine_EventSystems_PointerInputModule_Impl extends UnityEngine_EventSystems_BaseInputModule_Impl {

    kMouseLeftId: System_Int32 = lfv(this.handle, "kMouseLeftId") as unknown as System_Int32
    kMouseRightId: System_Int32 = lfv(this.handle, "kMouseRightId") as unknown as System_Int32
    kMouseMiddleId: System_Int32 = lfv(this.handle, "kMouseMiddleId") as unknown as System_Int32
    kFakeTouchesId: System_Int32 = lfv(this.handle, "kFakeTouchesId") as unknown as System_Int32
    // m_PointerData: System_Collections.Generic.Dictionary<System.Int32, UnityEngine.EventSystems.PointerEventData> = lfv(this.handle, "m_PointerData") as unknown as System_Collections.Generic.Dictionary<System.Int32, UnityEngine.EventSystems.PointerEventData>
    // m_MouseState: UnityEngine_EventSystems.PointerInputModule.MouseState = lfv(this.handle, "m_MouseState") as unknown as UnityEngine_EventSystems.PointerInputModule.MouseState

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    _ctor(): void {
        return Il2Cpp.Api.PointerInputModule.__ctor(this.handle)
    }

    GetPointerData(id: System_Int32, data: UnityEngine_EventSystems_PointerEventData, create: System_Boolean): System_Boolean {
        return Il2Cpp.Api.PointerInputModule._GetPointerData(this.handle, id, data, create)
    }

    RemovePointerData(data: UnityEngine_EventSystems_PointerEventData): void {
        return Il2Cpp.Api.PointerInputModule._RemovePointerData(this.handle, data)
    }

    GetTouchPointerEventData(input: Touch, pressed: System_Boolean, released: System_Boolean): UnityEngine_EventSystems_PointerEventData {
        return Il2Cpp.Api.PointerInputModule._GetTouchPointerEventData(this.handle, input.handle, pressed, released)
    }

    CopyFromTo(from: UnityEngine_EventSystems_PointerEventData, to: UnityEngine_EventSystems_PointerEventData): void {
        return Il2Cpp.Api.PointerInputModule._CopyFromTo(this.handle, from, to)
    }

    StateForMouseButton(buttonId: System_Int32): UnityEngine_EventSystems_PointerEventData_FramePressState {
        return Il2Cpp.Api.PointerInputModule._StateForMouseButton(this.handle, buttonId)
    }

    GetMousePointerEventData(): UnityEngine_EventSystems_PointerInputModule_MouseState {
        return Il2Cpp.Api.PointerInputModule._GetMousePointerEventData(this.handle)
    }

    GetMousePointerEventData_1(id: System_Int32): UnityEngine_EventSystems_PointerInputModule_MouseState {
        return Il2Cpp.Api.PointerInputModule._GetMousePointerEventData(this.handle, id)
    }

    GetLastPointerEventData(id: System_Int32): UnityEngine_EventSystems_PointerEventData {
        return Il2Cpp.Api.PointerInputModule._GetLastPointerEventData(this.handle, id)
    }

    static ShouldStartDrag(pressPos: Vector2, currentPos: Vector2, threshold: System_Single, useDragThreshold: System_Boolean): System_Boolean {
        return Il2Cpp.Api.PointerInputModule._ShouldStartDrag(pressPos, currentPos, threshold, useDragThreshold)
    }

    ProcessMove(pointerEvent: UnityEngine_EventSystems_PointerEventData): void {
        return Il2Cpp.Api.PointerInputModule._ProcessMove(this.handle, pointerEvent)
    }

    ProcessDrag(pointerEvent: UnityEngine_EventSystems_PointerEventData): void {
        return Il2Cpp.Api.PointerInputModule._ProcessDrag(this.handle, pointerEvent)
    }

    // IsPointerOverGameObject(pointerId: System_Int32): System_Boolean {
    //     return Il2Cpp.Api.PointerInputModule._IsPointerOverGameObject(this.handle, pointerId)
    // }

    ClearSelection(): void {
        return Il2Cpp.Api.PointerInputModule._ClearSelection(this.handle)
    }

    ToString(): System_String {
        return readU16(Il2Cpp.Api.PointerInputModule._ToString(this.handle))
    }

    DeselectIfSelectionChanged(currentOverGo: GameObject, pointerEvent: BaseEventData): void {
        return Il2Cpp.Api.PointerInputModule._DeselectIfSelectionChanged(this.handle, currentOverGo, pointerEvent)
    }

}

Il2Cpp.PointerInputModule = UnityEngine_EventSystems_PointerInputModule_Impl

declare global {
    namespace Il2Cpp {
        class PointerInputModule extends UnityEngine_EventSystems_PointerInputModule_Impl { }
    }
}

export { UnityEngine_EventSystems_PointerInputModule_Impl }