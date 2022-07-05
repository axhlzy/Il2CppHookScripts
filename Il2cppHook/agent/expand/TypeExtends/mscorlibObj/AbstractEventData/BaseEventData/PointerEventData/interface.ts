// import { Vector3Impl } from "../../../ValueType/Vector3/class";

interface PointerEventDataInterface {

    // .ctor(EventSystem)
    ctor_11(eventSystem: NativePointer): PointerEventDataInterface;

    // IsPointerMoving() : Boolean
    IsPointerMoving(): boolean;

    // IsScrolling() : Boolean
    IsScrolling(): boolean;

    // ToString() : String
    toString(): string;

    // set_button(InputButton) : Void
    set_button(button: NativePointer): void;

    // get_button() : InputButton
    get_button(): NativePointer;

    // set_clickCount(Int32) : Void
    set_clickCount(clickCount: number): void;

    // get_clickCount() : Int32
    get_clickCount(): number;

    // set_clickTime(Single) : Void
    set_clickTime(clickTime: number): void;

    // get_clickTime() : Single
    get_clickTime(): number;

    // set_delta(Vector2) : Void
    set_delta(delta: NativePointer): void;

    // get_delta() : Vector2
    get_delta(): NativePointer;

    // set_dragging(Boolean) : Void
    set_dragging(dragging: boolean): void;

    // get_dragging() : Boolean
    get_dragging(): boolean;

    // set_eligibleForClick(Boolean) : Void
    set_eligibleForClick(eligibleForClick: boolean): void;

    // get_eligibleForClick() : Boolean
    get_eligibleForClick(): boolean;

    // get_enterEventCamera() : Camera
    get_enterEventCamera(): NativePointer;

    // set_lastPress(GameObject) : Void
    set_lastPress(lastPress: Il2cppGameObject): void;

    // get_lastPress() : GameObject
    get_lastPress(): Il2cppGameObject;

    // set_pointerCurrentRaycast(RaycastResult) : Void
    set_pointerCurrentRaycast(pointerCurrentRaycast: NativePointer): void;

    // get_pointerCurrentRaycast() : RaycastResult
    get_pointerCurrentRaycast(): NativePointer;

    // set_pointerDrag(GameObject) : Void
    set_pointerDrag(pointerDrag: Il2cppGameObject): void;

    // get_pointerDrag() : GameObject
    get_pointerDrag(): Il2cppGameObject;

    // set_pointerEnter(GameObject) : Void
    set_pointerEnter(pointerEnter: Il2cppGameObject): void;

    // get_pointerEnter() : GameObject
    get_pointerEnter(): Il2cppGameObject;

    // set_pointerId(Int32) : Void
    set_pointerId(pointerId: number): void;

    // get_pointerId() : Int32
    get_pointerId(): number;

    // set_pointerPress(GameObject) : Void
    set_pointerPress(pointerPress: Il2cppGameObject): void;

    // get_pointerPress() : GameObject
    get_pointerPress(): Il2cppGameObject;

    // set_pointerPressRaycast(RaycastResult) : Void
    set_pointerPressRaycast(pointerPressRaycast: NativePointer): void;

    // get_pointerPressRaycast() : RaycastResult
    get_pointerPressRaycast(): NativePointer;

    // set_position(Vector2) : Void
    set_position(position: NativePointer): void;

    // get_position() : Vector2
    get_position(): NativePointer;

    // get_pressEventCamera() : Camera
    get_pressEventCamera(): NativePointer;

    // set_pressPosition(Vector2) : Void
    set_pressPosition(pressPosition: NativePointer): void;

    // get_pressPosition() : Vector2
    get_pressPosition(): NativePointer;

    // set_rawPointerPress(GameObject) : Void
    set_rawPointerPress(rawPointerPress: Il2cppGameObject): void;

    // get_rawPointerPress() : GameObject
    get_rawPointerPress(): Il2cppGameObject;

    // set_scrollDelta(Vector2) : Void
    set_scrollDelta(scrollDelta: NativePointer): void;

    // get_scrollDelta() : Vector2
    get_scrollDelta(): NativePointer;

    // set_useDragThreshold(Boolean) : Void
    set_useDragThreshold(useDragThreshold: boolean): void;

    // get_useDragThreshold() : Boolean
    get_useDragThreshold(): boolean;

    // // set_worldNormal(Vector3) : Void
    // set_worldNormal(worldNormal: Vector3Impl): void;

    // // get_worldNormal() : Vector3
    // get_worldNormal(): Vector3Impl;

    // // set_worldPosition(Vector3) : Void
    // set_worldPosition(worldPosition: Vector3Impl): void;

    // // get_worldPosition() : Vector3
    // get_worldPosition(): Vector3Impl;
}