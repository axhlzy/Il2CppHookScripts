import { GameObjectImpl as UnityEngine_GameObject } from "../../Object/GameObject/class"
import { UnityEngine_EventSystems_AbstractEventData_Impl } from "../class"

type UnityEngine_EventSystems_EventSystem = NativePointer
type UnityEngine_EventSystems_BaseInputModule = NativePointer

class UnityEngine_EventSystems_BaseEventData_Impl extends UnityEngine_EventSystems_AbstractEventData_Impl {

    m_EventSystem: UnityEngine_EventSystems_EventSystem = lfv(this.handle, "m_EventSystem") as unknown as UnityEngine_EventSystems_EventSystem

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    __ctor(eventSystem: UnityEngine_EventSystems_EventSystem): void {
        return Il2Cpp.Api.BaseEventData.__ctor(this.handle, eventSystem)
    }

    get_currentInputModule(): UnityEngine_EventSystems_BaseInputModule {
        return Il2Cpp.Api.BaseEventData._get_currentInputModule(this.handle)
    }

    get_selectedObject(): UnityEngine_GameObject {
        return Il2Cpp.Api.BaseEventData._get_selectedObject(this.handle)
    }

    set_selectedObject(value: UnityEngine_GameObject): void {
        return Il2Cpp.Api.BaseEventData._set_selectedObject(this.handle, value)
    }

}

Il2Cpp.BaseEventData = UnityEngine_EventSystems_BaseEventData_Impl

declare global {
    namespace Il2Cpp {
        class BaseEventData extends UnityEngine_EventSystems_BaseEventData_Impl { }
    }
}

export { UnityEngine_EventSystems_BaseEventData_Impl }