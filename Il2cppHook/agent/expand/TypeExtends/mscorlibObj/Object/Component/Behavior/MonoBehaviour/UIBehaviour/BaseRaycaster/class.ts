import { PackList } from "../../../../../../../../../bridge/fix/packer/packList"
import { UnityEngine_EventSystems_PointerEventData_Impl as PointerEventData } from "../../../../../../AbstractEventData/BaseEventData/PointerEventData/class"
import { UnityEngine_Camera_Impl as Camera } from "../../../Camera/class"
import { UnityEngine_EventSystems_UIBehaviour_Impl } from "../class"

type System_Void = void
type System_Int32 = number
type System_String = string

class UnityEngine_EventSystems_BaseRaycaster_Impl extends UnityEngine_EventSystems_UIBehaviour_Impl {

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }
    _ctor(): System_Void {
        return Il2Cpp.Api.BaseRaycaster.__ctor(this.handle)
    }

    Raycast(eventData: PointerEventData, resultAppendList: PackList): System_Void {
        return Il2Cpp.Api.BaseRaycaster._Raycast(this.handle, eventData, resultAppendList.handle)
    }

    get_eventCamera(): Camera {
        return new Camera(Il2Cpp.Api.BaseRaycaster._get_eventCamera(this.handle))
    }

    get_priority(): System_Int32 {
        return Il2Cpp.Api.BaseRaycaster._get_priority(this.handle)
    }

    get_sortOrderPriority(): System_Int32 {
        return Il2Cpp.Api.BaseRaycaster._get_sortOrderPriority(this.handle)
    }

    get_renderOrderPriority(): System_Int32 {
        return Il2Cpp.Api.BaseRaycaster._get_renderOrderPriority(this.handle)
    }

    ToString(): System_String {
        return readU16(Il2Cpp.Api.BaseRaycaster._ToString(this.handle))
    }

    OnEnable(): System_Void {
        return Il2Cpp.Api.BaseRaycaster._OnEnable(this.handle)
    }

    OnDisable(): System_Void {
        return Il2Cpp.Api.BaseRaycaster._OnDisable(this.handle)
    }

}

Il2Cpp.BaseRaycaster = UnityEngine_EventSystems_BaseRaycaster_Impl

declare global {
    namespace Il2Cpp {
        class BaseRaycaster extends UnityEngine_EventSystems_BaseRaycaster_Impl { }
    }
}

export { UnityEngine_EventSystems_BaseRaycaster_Impl }