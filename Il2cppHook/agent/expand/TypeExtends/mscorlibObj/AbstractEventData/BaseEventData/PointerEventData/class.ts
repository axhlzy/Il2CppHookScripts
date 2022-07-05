import { Vector3Impl } from "../../../ValueType/Vector3/class";
import { BaseEventDataImpl } from "../class";

class PointerEventImpl extends BaseEventDataImpl implements PointerEventDataInterface {

    ctor_11(eventSystem: NativePointer): PointerEventImpl {
        return new PointerEventImpl(Il2Cpp.Api.PointerEventData._ctor_1(alloc(), eventSystem))
    }

    IsPointerMoving(): boolean {
        return Il2Cpp.Api.PointerEventData._IsPointerMoving(this.handle)
    }

    IsScrolling(): boolean {
        return Il2Cpp.Api.PointerEventData._IsScrolling(this.handle)
    }

    toString(): string {
        return Il2Cpp.Api.PointerEventData._ToString(this.handle)
    }

    set_button(button: NativePointer): void {
        return Il2Cpp.Api.PointerEventData._set_button(this.handle, button)
    }

    get_button(): NativePointer {
        return Il2Cpp.Api.PointerEventData._get_button(this.handle)
    }

    set_clickCount(clickCount: number): void {
        return Il2Cpp.Api.PointerEventData._set_clickCount(this.handle, clickCount)
    }

    get_clickCount(): number {
        return Il2Cpp.Api.PointerEventData._get_clickCount(this.handle)
    }

    set_clickTime(clickTime: number): void {
        return Il2Cpp.Api.PointerEventData._set_clickTime(this.handle, clickTime)
    }

    get_clickTime(): number {
        return Il2Cpp.Api.PointerEventData._get_clickTime(this.handle)
    }

    set_delta(delta: NativePointer): void {
        return Il2Cpp.Api.PointerEventData._set_delta(this.handle, delta)
    }

    get_delta(): NativePointer {
        return Il2Cpp.Api.PointerEventData._get_delta(this.handle)
    }

    set_dragging(dragging: boolean): void {
        return Il2Cpp.Api.PointerEventData._set_dragging(this.handle, dragging)
    }

    get_dragging(): boolean {
        return Il2Cpp.Api.PointerEventData._get_dragging(this.handle)
    }

    set_eligibleForClick(eligibleForClick: boolean): void {
        return Il2Cpp.Api.PointerEventData._set_eligibleForClick(this.handle, eligibleForClick)
    }

    get_eligibleForClick(): boolean {
        return Il2Cpp.Api.PointerEventData._get_eligibleForClick(this.handle)
    }

    get_enterEventCamera(): NativePointer {
        return Il2Cpp.Api.PointerEventData._get_enterEventCamera(this.handle)
    }

    set_pointerCurrentRaycast(pointerCurrentRaycast: NativePointer): void {
        return Il2Cpp.Api.PointerEventData._set_pointerCurrentRaycast(this.handle, pointerCurrentRaycast)
    }

    get_pointerCurrentRaycast(): NativePointer {
        return Il2Cpp.Api.PointerEventData._get_pointerCurrentRaycast(this.handle)
    }

    set_lastPress(lastPress: Il2Cpp.GameObject): void {
        return Il2Cpp.Api.PointerEventData._set_lastPress(this.handle, lastPress)
    }

    get_lastPress(): Il2Cpp.GameObject {
        return new Il2Cpp.GameObject(Il2Cpp.Api.PointerEventData._get_lastPress(this.handle))
    }

    set_pointerDrag(pointerDrag: Il2Cpp.GameObject): void {
        return Il2Cpp.Api.PointerEventData._set_pointerEnter(this.handle, pointerDrag)
    }

    get_pointerDrag(): Il2Cpp.GameObject {
        return new Il2Cpp.GameObject(Il2Cpp.Api.PointerEventData._get_pointerDrag(this.handle))
    }

    set_pointerEnter(pointerEnter: Il2Cpp.GameObject): void {
        return Il2Cpp.Api.PointerEventData._set_pointerEnter(this.handle, pointerEnter)
    }

    get_pointerEnter(): Il2Cpp.GameObject {
        return new Il2Cpp.GameObject(Il2Cpp.Api.PointerEventData._get_pointerEnter(this.handle))
    }

    set_pointerId(pointerId: number): void {
        return Il2Cpp.Api.PointerEventData._set_pointerId(this.handle, pointerId)
    }

    get_pointerId(): number {
        return Il2Cpp.Api.PointerEventData._get_pointerId(this.handle)
    }

    set_pointerPress(pointerPress: Il2Cpp.GameObject): void {
        return Il2Cpp.Api.PointerEventData._set_pointerPress(this.handle, pointerPress)
    }

    get_pointerPress(): Il2Cpp.GameObject {
        return new Il2Cpp.GameObject(Il2Cpp.Api.PointerEventData._get_pointerPress(this.handle))
    }

    set_pointerPressRaycast(pointerPressRaycast: NativePointer): void {
        return Il2Cpp.Api.PointerEventData._set_pointerPressRaycast(this.handle, pointerPressRaycast)
    }

    get_pointerPressRaycast(): NativePointer {
        return Il2Cpp.Api.PointerEventData._get_pointerPressRaycast(this.handle)
    }

    set_position(position: NativePointer): void {
        return Il2Cpp.Api.PointerEventData._set_position(this.handle, position)
    }
    get_position(): NativePointer {
        return Il2Cpp.Api.PointerEventData._get_position(this.handle)
    }

    get_pressEventCamera(): NativePointer {
        return Il2Cpp.Api.PointerEventData._get_pressEventCamera(this.handle)
    }

    set_pressPosition(pressPosition: NativePointer): void {
        return Il2Cpp.Api.PointerEventData._set_pressPosition(this.handle, pressPosition)
    }

    get_pressPosition(): NativePointer {
        return Il2Cpp.Api.PointerEventData._get_pressPosition(this.handle)
    }

    set_rawPointerPress(rawPointerPress: Il2Cpp.GameObject): void {
        return Il2Cpp.Api.PointerEventData._set_rawPointerPress(this.handle, rawPointerPress)
    }

    get_rawPointerPress(): Il2Cpp.GameObject {
        return new Il2Cpp.GameObject(Il2Cpp.Api.PointerEventData._get_rawPointerPress(this.handle))
    }

    set_scrollDelta(scrollDelta: NativePointer): void {
        return Il2Cpp.Api.PointerEventData._set_scrollDelta(this.handle, scrollDelta)
    }

    get_scrollDelta(): NativePointer {
        return Il2Cpp.Api.PointerEventData._get_scrollDelta(this.handle)
    }

    set_useDragThreshold(useDragThreshold: boolean): void {
        return Il2Cpp.Api.PointerEventData._set_useDragThreshold(this.handle, useDragThreshold)
    }

    get_useDragThreshold(): boolean {
        return Il2Cpp.Api.PointerEventData._get_useDragThreshold(this.handle)
    }

    set_worldNormal(worldNormal: Vector3Impl): void {
        return Il2Cpp.Api.PointerEventData._set_worldNormal(this.handle, worldNormal)
    }

    get_worldNormal(): Vector3Impl {
        return Il2Cpp.Api.PointerEventData._get_worldNormal(this.handle)
    }

    set_worldPosition(worldPosition: Vector3Impl): void {
        return Il2Cpp.Api.PointerEventData._set_worldPosition(this.handle, worldPosition)
    }

    get_worldPosition(): Vector3Impl {
        return Il2Cpp.Api.PointerEventData._get_worldPosition(this.handle)
    }
}

export { PointerEventImpl };