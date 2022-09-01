import { UnityEngine_Camera_Impl as Camera } from "../../../Object/Component/Behavior/Camera/class"
import { GameObjectImpl as GameObject } from "../../../Object/GameObject/class"
import { UnityEngine_Vector2_Impl as Vector2 } from "../../../ValueType/Vector2/class"
import { UnityEngine_Vector3_Impl as Vector3 } from "../../../ValueType/Vector3/class"
import { UnityEngine_EventSystems_BaseEventData_Impl as BaseEventData } from "../class"

type UnityEngine_EventSystems_RaycastResult = NativePointer
type UnityEngine_EventSystems_EventSystem = NativePointer

class UnityEngine_EventSystems_PointerEventData_Impl extends BaseEventData {

    // hovered : List<GameObject>
    hovered: NativePointer = lfv(this.handle, "hovered")
    // m_PointerPress : GameObject
    m_PointerPress: GameObject = new GameObject(lfv(this.handle, "m_PointerPress"))

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    get_pointerEnter(): GameObject {
        return new GameObject(Il2Cpp.Api.PointerEventData._get_pointerEnter(this.handle))
    }

    set_pointerEnter(value: GameObject): void {
        return Il2Cpp.Api.PointerEventData._set_pointerEnter(this.handle, value.handle)
    }

    get_lastPress(): GameObject {
        return new GameObject(Il2Cpp.Api.PointerEventData._get_lastPress(this.handle))
    }

    set_lastPress(value: GameObject): void {
        return Il2Cpp.Api.PointerEventData._set_lastPress(this.handle, value.handle)
    }

    get_rawPointerPress(): GameObject {
        return new GameObject(Il2Cpp.Api.PointerEventData._get_rawPointerPress(this.handle))
    }

    set_rawPointerPress(value: GameObject): void {
        return Il2Cpp.Api.PointerEventData._set_rawPointerPress(this.handle, value.handle)
    }

    get_pointerDrag(): GameObject {
        return new GameObject(Il2Cpp.Api.PointerEventData._get_pointerDrag(this.handle))
    }

    set_pointerDrag(value: GameObject): void {
        return Il2Cpp.Api.PointerEventData._set_pointerDrag(this.handle, value.handle)
    }

    get_pointerCurrentRaycast(): UnityEngine_EventSystems_RaycastResult {
        return Il2Cpp.Api.PointerEventData._get_pointerCurrentRaycast(this.handle)
    }

    set_pointerCurrentRaycast(value: UnityEngine_EventSystems_RaycastResult): void {
        return Il2Cpp.Api.PointerEventData._set_pointerCurrentRaycast(this.handle, value)
    }

    get_pointerPressRaycast(): UnityEngine_EventSystems_RaycastResult {
        return Il2Cpp.Api.PointerEventData._get_pointerPressRaycast(this.handle)
    }

    set_pointerPressRaycast(value: UnityEngine_EventSystems_RaycastResult): void {
        return Il2Cpp.Api.PointerEventData._set_pointerPressRaycast(this.handle, value)
    }

    get_eligibleForClick(): boolean {
        return !Il2Cpp.Api.PointerEventData._get_eligibleForClick(this.handle).isNull()
    }

    set_eligibleForClick(value: boolean): void {
        return Il2Cpp.Api.PointerEventData._set_eligibleForClick(this.handle, value ? ptr(1) : ptr(0))
    }

    get_pointerId(): number {
        return Il2Cpp.Api.PointerEventData._get_pointerId(this.handle).toInt32()
    }

    set_pointerId(value: number): void {
        return Il2Cpp.Api.PointerEventData._set_pointerId(this.handle, value).toInt32()
    }

    get_position(): Vector2 {
        return new Vector2(Il2Cpp.Api.PointerEventData._get_position(this.handle))
    }

    set_position(value: Vector2): void {
        return Il2Cpp.Api.PointerEventData._set_position(this.handle, value.handle)
    }

    get_delta(): Vector2 {
        return new Vector2(Il2Cpp.Api.PointerEventData._get_delta(this.handle))
    }

    set_delta(value: Vector2): void {
        return Il2Cpp.Api.PointerEventData._set_delta(this.handle, value.handle)
    }

    get_pressPosition(): Vector2 {
        return new Vector2(Il2Cpp.Api.PointerEventData._get_pressPosition(this.handle))
    }

    set_pressPosition(value: Vector2): void {
        return Il2Cpp.Api.PointerEventData._set_pressPosition(this.handle, value.handle)
    }

    get_worldPosition(): Vector3 {
        return new Vector3(Il2Cpp.Api.PointerEventData._get_worldPosition(this.handle))
    }

    set_worldPosition(value: Vector3): void {
        return Il2Cpp.Api.PointerEventData._set_worldPosition(this.handle, value.handle)
    }

    get_worldNormal(): Vector3 {
        return new Vector3(Il2Cpp.Api.PointerEventData._get_worldNormal(this.handle))
    }

    set_worldNormal(value: Vector3): void {
        return Il2Cpp.Api.PointerEventData._set_worldNormal(this.handle, value.handle)
    }

    get_clickTime(): number {
        return Il2Cpp.Api.PointerEventData._get_clickTime(this.handle)
    }

    set_clickTime(value: number): void {
        return Il2Cpp.Api.PointerEventData._set_clickTime(this.handle, value)
    }

    get_clickCount(): number {
        return Il2Cpp.Api.PointerEventData._get_clickCount(this.handle)
    }

    set_clickCount(value: number): void {
        return Il2Cpp.Api.PointerEventData._set_clickCount(this.handle, value)
    }

    get_scrollDelta(): Vector2 {
        return new Vector2(Il2Cpp.Api.PointerEventData._get_scrollDelta(this.handle))
    }

    set_scrollDelta(value: Vector2): void {
        return Il2Cpp.Api.PointerEventData._set_scrollDelta(this.handle, value.handle)
    }

    get_useDragThreshold(): boolean {
        return !Il2Cpp.Api.PointerEventData._get_useDragThreshold(this.handle).isNull()
    }

    set_useDragThreshold(value: boolean): void {
        return Il2Cpp.Api.PointerEventData._set_useDragThreshold(this.handle, value ? ptr(1) : ptr(0))
    }

    get_dragging(): boolean {
        return !Il2Cpp.Api.PointerEventData._get_dragging(this.handle).isNull()
    }

    set_dragging(value: boolean): void {
        return Il2Cpp.Api.PointerEventData._set_dragging(this.handle, value ? ptr(1) : ptr(0))
    }

    get_button(): UnityEngine_EventSystems_PointerEventData_InputButton {
        return Il2Cpp.Api.PointerEventData._get_button(this.handle)
    }

    set_button(value: UnityEngine_EventSystems_PointerEventData_InputButton): void {
        return Il2Cpp.Api.PointerEventData._set_button(this.handle, value)
    }

    __ctor(eventSystem: UnityEngine_EventSystems_EventSystem): void {
        return Il2Cpp.Api.PointerEventData.__ctor(this.handle, eventSystem)
    }

    IsPointerMoving(): boolean {
        return !Il2Cpp.Api.PointerEventData._IsPointerMoving(this.handle).isNull()
    }

    IsScrolling(): boolean {
        return !Il2Cpp.Api.PointerEventData._IsScrolling(this.handle).isNull()
    }

    get_enterEventCamera(): Camera {
        return new Camera(Il2Cpp.Api.PointerEventData._get_enterEventCamera(this.handle))
    }

    get_pressEventCamera(): Camera {
        return new Camera(Il2Cpp.Api.PointerEventData._get_pressEventCamera(this.handle))
    }

    get_pointerPress(): GameObject {
        return new GameObject(Il2Cpp.Api.PointerEventData._get_pointerPress(this.handle))
    }

    set_pointerPress(value: GameObject): void {
        return Il2Cpp.Api.PointerEventData._set_pointerPress(this.handle, value.handle)
    }

    ToString(): string {
        return readU16(Il2Cpp.Api.PointerEventData._ToString(this.handle))
    }

}

Il2Cpp.PointerEventData = UnityEngine_EventSystems_PointerEventData_Impl

declare global {
    namespace Il2Cpp {
        class PointerEventData extends UnityEngine_EventSystems_PointerEventData_Impl { }
    }
}

export { UnityEngine_EventSystems_PointerEventData_Impl }