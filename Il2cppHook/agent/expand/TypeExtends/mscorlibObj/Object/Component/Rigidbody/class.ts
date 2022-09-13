import { UnityEngine_Quaternion_Impl as Quaternion } from "../../../ValueType/Quaternion/class"
import { UnityEngine_Vector3_Impl as Vector3 } from "../../../ValueType/Vector3/class"
import { UnityEngine_Component_Impl } from "../class"

type System_Void = void
type System_Boolean = boolean
type UnityEngine_ForceMode = boolean

class UnityEngine_Rigidbody_Impl extends UnityEngine_Component_Impl {

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    get_velocity(): Vector3 {
        return new Vector3(Il2Cpp.Api.Rigidbody._get_velocity(this.handle))
    }

    set_velocity(value: Vector3): System_Void {
        return Il2Cpp.Api.Rigidbody._set_velocity(this.handle, value.handle)
    }

    get_useGravity(): System_Boolean {
        return Il2Cpp.Api.Rigidbody._get_useGravity(this.handle)
    }

    set_isKinematic(value: System_Boolean): System_Void {
        return Il2Cpp.Api.Rigidbody._set_isKinematic(this.handle, value)
    }

    set_freezeRotation(value: System_Boolean): System_Void {
        return Il2Cpp.Api.Rigidbody._set_freezeRotation(this.handle, value)
    }

    get_position(): Vector3 {
        return new Vector3(Il2Cpp.Api.Rigidbody._get_position(this.handle))
    }

    get_rotation(): Quaternion {
        return new Quaternion(Il2Cpp.Api.Rigidbody._get_rotation(this.handle))
    }

    set_rotation(value: Quaternion): System_Void {
        return Il2Cpp.Api.Rigidbody._set_rotation(this.handle, value.handle)
    }

    MovePosition(position: Vector3): System_Void {
        return Il2Cpp.Api.Rigidbody._MovePosition(this.handle, position.handle)
    }

    MoveRotation(rot: Quaternion): System_Void {
        return Il2Cpp.Api.Rigidbody._MoveRotation(this.handle, rot.handle)
    }

    AddForce(force: Vector3, mode: UnityEngine_ForceMode): System_Void {
        return Il2Cpp.Api.Rigidbody._AddForce(this.handle, force.handle, mode)
    }

    AddForce_1(force: Vector3): System_Void {
        return Il2Cpp.Api.Rigidbody._AddForce(this.handle, force.handle)
    }

    AddTorque(torque: Vector3, mode: UnityEngine_ForceMode): System_Void {
        return Il2Cpp.Api.Rigidbody._AddTorque(this.handle, torque.handle, mode)
    }

    _ctor(): System_Void {
        return Il2Cpp.Api.Rigidbody.__ctor(this.handle)
    }

    get_velocity_Injected(ret: Vector3): System_Void {
        return Il2Cpp.Api.Rigidbody._get_velocity_Injected(this.handle, ret.handle)
    }

    set_velocity_Injected(value: Vector3): System_Void {
        return Il2Cpp.Api.Rigidbody._set_velocity_Injected(this.handle, value.handle)
    }

    get_position_Injected(ret: Vector3): System_Void {
        return Il2Cpp.Api.Rigidbody._get_position_Injected(this.handle, ret.handle)
    }

    get_rotation_Injected(ret: Quaternion): System_Void {
        return Il2Cpp.Api.Rigidbody._get_rotation_Injected(this.handle, ret.handle)
    }

    set_rotation_Injected(value: Quaternion): System_Void {
        return Il2Cpp.Api.Rigidbody._set_rotation_Injected(this.handle, value.handle)
    }

    MovePosition_Injected(position: Vector3): System_Void {
        return Il2Cpp.Api.Rigidbody._MovePosition_Injected(this.handle, position.handle)
    }

    MoveRotation_Injected(rot: Quaternion): System_Void {
        return Il2Cpp.Api.Rigidbody._MoveRotation_Injected(this.handle, rot.handle)
    }

    AddForce_Injected(force: Vector3, mode: UnityEngine_ForceMode): System_Void {
        return Il2Cpp.Api.Rigidbody._AddForce_Injected(this.handle, force.handle, mode)
    }

    AddTorque_Injected(torque: Vector3, mode: UnityEngine_ForceMode): System_Void {
        return Il2Cpp.Api.Rigidbody._AddTorque_Injected(this.handle, torque.handle, mode)
    }

}

Il2Cpp.Rigidbody = UnityEngine_Rigidbody_Impl

declare global {
    namespace Il2Cpp {
        class Rigidbody extends UnityEngine_Rigidbody_Impl { }
    }
}

export { UnityEngine_Rigidbody_Impl }