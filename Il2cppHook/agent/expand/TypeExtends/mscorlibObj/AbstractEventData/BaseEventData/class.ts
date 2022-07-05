import { mscorlib_System_Object_impl } from "../../class";
import { GameObjectImpl } from "../../Object/GameObject/class";

class BaseEventDataImpl extends mscorlib_System_Object_impl implements BaseEventData_Interface {

    ctor_1(): BaseEventData_Interface {
        return new BaseEventDataImpl(Il2Cpp.Api.BaseEventData._ctor_1(alloc()));
    }

    get_currentInputModule(): NativePointer {
        return Il2Cpp.Api.BaseEventData._get_currentInputModule(this.handle);
    }

    set_selectedObject(gameObject: GameObjectImpl): void {
        return Il2Cpp.Api.BaseEventData._set_selectedObject(this.handle, gameObject.handle)
    }

    get_selectedObject(): GameObjectImpl {
        return new GameObjectImpl(Il2Cpp.Api.BaseEventData._get_selectedObject(this.handle))
    }

}

export { BaseEventDataImpl };