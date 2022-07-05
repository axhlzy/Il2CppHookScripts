interface BaseEventData_Interface {

    // .ctor(EventSystem)
    ctor_1(): BaseEventData_Interface;

    // get_currentInputModule() : BaseInputModule
    get_currentInputModule(): NativePointer;

    // set_selectedObject(GameObject) : Void
    set_selectedObject(gameObject: Il2cppGameObject): void;

    // get_selectedObject() : GameObject
    get_selectedObject(): Il2cppGameObject;

}
