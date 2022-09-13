import { UnityEngine_Collider_Impl as Collider } from "../../Object/Component/Collider/class"
import { UnityEngine_Rigidbody_Impl as Rigidbody } from "../../Object/Component/Rigidbody/class"
import { UnityEngine_Transform_Impl as Transform } from "../../Object/Component/Transform/class"
import { System_ValueType_Impl } from "../class"
import { UnityEngine_Vector2_Impl as Vector2 } from "../Vector2/class"
import { UnityEngine_Vector3_Impl as Vector3 } from "../Vector3/class"

type System_Int32 = number
type System_UInt32 = number
type System_Single = number

class UnityEngine_RaycastHit_Impl extends System_ValueType_Impl {

    m_Point: Vector3 = new Vector3(lfv(this.handle, "m_Point"))
    m_Normal: Vector3 = new Vector3(lfv(this.handle, "m_Normal"))
    m_FaceID: System_UInt32 = lfv(this.handle, "m_FaceID").toInt32()
    m_Distance: System_Single = readSingle(lfv(this.handle, "m_Distance"))
    m_UV: Vector2 = new Vector2(lfv(this.handle, "m_UV"))
    m_Collider: System_Int32 = lfv(this.handle, "m_Collider").toInt32()

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    get_collider(): Collider {
        return new Collider(Il2Cpp.Api.RaycastHit._get_collider(this.handle))
    }

    get_point(): Vector3 {
        return new Vector3(Il2Cpp.Api.RaycastHit._get_point(this.handle))
    }

    get_normal(): Vector3 {
        return new Vector3(Il2Cpp.Api.RaycastHit._get_normal(this.handle))
    }

    get_distance(): System_Single {
        return readSingle(Il2Cpp.Api.RaycastHit._get_distance(this.handle))
    }

    get_triangleIndex(): System_Int32 {
        return Il2Cpp.Api.RaycastHit._get_triangleIndex(this.handle).toInt32()
    }

    get_transform(): Transform {
        return new Transform(Il2Cpp.Api.RaycastHit._get_transform(this.handle))
    }

    get_rigidbody(): Rigidbody {
        return new Rigidbody(Il2Cpp.Api.RaycastHit._get_rigidbody(this.handle))
    }

}

Il2Cpp.RaycastHit = UnityEngine_RaycastHit_Impl

declare global {
    namespace Il2Cpp {
        class RaycastHit extends UnityEngine_RaycastHit_Impl { }
    }
}

export { UnityEngine_RaycastHit_Impl }