import { GameObjectImpl as GameObject } from "../../Object/GameObject/class"
import { System_ValueType_Impl } from "../class"
import { UnityEngine_Vector2_Impl as Vector2 } from "../Vector2/class"
import { UnityEngine_Vector3_Impl as Vector3 } from "../Vector3/class"

type UnityEngine_EventSystems_BaseRaycaster = NativePointer
type System_Single = number
type System_Int32 = number
type System_Void = void
type System_Boolean = boolean
type System_String = string

class UnityEngine_EventSystems_RaycastResult_Impl extends System_ValueType_Impl {

    m_GameObject: GameObject = new GameObject(lfv(this.handle, "m_GameObject"))
    module: UnityEngine_EventSystems_BaseRaycaster = lfv(this.handle, "module") as unknown as UnityEngine_EventSystems_BaseRaycaster
    distance: System_Single = readSingle(lfv(this.handle, "distance"))
    index: System_Single = readSingle(lfv(this.handle, "index"))
    depth: System_Int32 = lfv(this.handle, "depth").toInt32()
    sortingLayer: System_Int32 = lfv(this.handle, "sortingLayer").toInt32()
    sortingOrder: System_Int32 = lfv(this.handle, "sortingOrder").toInt32()
    worldPosition: Vector3 = new Vector3(lfv(this.handle, "worldPosition"))
    worldNormal: Vector3 = new Vector3(lfv(this.handle, "worldNormal"))
    screenPosition: Vector2 = new Vector2(lfv(this.handle, "screenPosition"))
    displayIndex: System_Int32 = lfv(this.handle, "displayIndex").toInt32()

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    get_gameObject(): GameObject {
        return new GameObject(Il2Cpp.Api.RaycastResult._get_gameObject(this.handle))
    }

    set_gameObject(value: GameObject): System_Void {
        return Il2Cpp.Api.RaycastResult._set_gameObject(this.handle, value.handle)
    }

    get_isValid(): System_Boolean {
        return Il2Cpp.Api.RaycastResult._get_isValid(this.handle)
    }

    Clear(): System_Void {
        return Il2Cpp.Api.RaycastResult._Clear(this.handle)
    }

    ToString(): System_String {
        return readU16(Il2Cpp.Api.RaycastResult._ToString(this.handle))
    }

}

Il2Cpp.RaycastResult = UnityEngine_EventSystems_RaycastResult_Impl

declare global {
    namespace Il2Cpp {
        class RaycastResult extends UnityEngine_EventSystems_RaycastResult_Impl { }
    }
}

export { UnityEngine_EventSystems_RaycastResult_Impl }