import { PackList } from "../../../../bridge/fix/packer/packList"
import { mscorlib_System_Object_impl } from "../class"

type System_Void = void
type UnityEngine_EventSystems_BaseRaycaster = void

class UnityEngine_EventSystems_RaycasterManager_Impl extends mscorlib_System_Object_impl {

    s_Raycasters: PackList = new PackList(lfv(this.handle, "s_Raycasters"))

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    static AddRaycaster(baseRaycaster: UnityEngine_EventSystems_BaseRaycaster): System_Void {
        return Il2Cpp.Api.RaycasterManager._AddRaycaster(baseRaycaster)
    }

    static GetRaycasters(): PackList {
        return new PackList(Il2Cpp.Api.RaycasterManager._GetRaycasters())
    }

    static RemoveRaycasters(baseRaycaster: UnityEngine_EventSystems_BaseRaycaster): System_Void {
        return Il2Cpp.Api.RaycasterManager._RemoveRaycasters(baseRaycaster)
    }

    static _cctor(): System_Void {
        return Il2Cpp.Api.RaycasterManager.__cctor()
    }

}

Il2Cpp.RaycasterManager = UnityEngine_EventSystems_RaycasterManager_Impl

declare global {
    namespace Il2Cpp {
        class RaycasterManager extends UnityEngine_EventSystems_RaycasterManager_Impl { }
    }
}

export { UnityEngine_EventSystems_RaycasterManager_Impl }