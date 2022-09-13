import { cache } from "decorator-cache-getter"

class UnityEngine_Rigidbody_API {
    // public Vector3 get_velocity()
    @cache
    static get _get_velocity() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Rigidbody", "get_velocity", 0, [], "pointer", ["pointer"])
    }

    // public Void set_velocity(Vector3 value)
    @cache
    static get _set_velocity() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Rigidbody", "set_velocity", 1, ["UnityEngine.Vector3"], "void", ["pointer", "pointer"])
    }

    // public Boolean get_useGravity()
    @cache
    static get _get_useGravity() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Rigidbody", "get_useGravity", 0, [], "pointer", ["pointer"])
    }

    // public Void set_isKinematic(Boolean value)
    @cache
    static get _set_isKinematic() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Rigidbody", "set_isKinematic", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // public Void set_freezeRotation(Boolean value)
    @cache
    static get _set_freezeRotation() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Rigidbody", "set_freezeRotation", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // public Vector3 get_position()
    @cache
    static get _get_position() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Rigidbody", "get_position", 0, [], "pointer", ["pointer"])
    }

    // public Quaternion get_rotation()
    @cache
    static get _get_rotation() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Rigidbody", "get_rotation", 0, [], "pointer", ["pointer"])
    }

    // public Void set_rotation(Quaternion value)
    @cache
    static get _set_rotation() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Rigidbody", "set_rotation", 1, ["UnityEngine.Quaternion"], "void", ["pointer", "pointer"])
    }

    // public Void MovePosition(Vector3 position)
    @cache
    static get _MovePosition() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Rigidbody", "MovePosition", 1, ["UnityEngine.Vector3"], "void", ["pointer", "pointer"])
    }

    // public Void MoveRotation(Quaternion rot)
    @cache
    static get _MoveRotation() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Rigidbody", "MoveRotation", 1, ["UnityEngine.Quaternion"], "void", ["pointer", "pointer"])
    }

    // public Void AddForce(Vector3 force,ForceMode mode)
    @cache
    static get _AddForce() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Rigidbody", "AddForce", 2, ["UnityEngine.Vector3", "UnityEngine.ForceMode"], "void", ["pointer", "pointer", "pointer"])
    }

    // public Void AddForce(Vector3 force)
    @cache
    static get _AddForce_force() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Rigidbody", "AddForce", 1, ["UnityEngine.Vector3"], "void", ["pointer", "pointer"])
    }

    // public Void AddTorque(Vector3 torque,ForceMode mode)
    @cache
    static get _AddTorque() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Rigidbody", "AddTorque", 2, ["UnityEngine.Vector3", "UnityEngine.ForceMode"], "void", ["pointer", "pointer", "pointer"])
    }

    // public Void .ctor()
    @cache
    static get __ctor() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Rigidbody", ".ctor", 0, [], "void", ["pointer"])
    }

    // private Void get_velocity_Injected(Vector3& ret)
    @cache
    static get _get_velocity_Injected() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Rigidbody", "get_velocity_Injected", 1, ["UnityEngine.Vector3&"], "void", ["pointer", "pointer"])
    }

    // private Void set_velocity_Injected(Vector3& value)
    @cache
    static get _set_velocity_Injected() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Rigidbody", "set_velocity_Injected", 1, ["UnityEngine.Vector3&"], "void", ["pointer", "pointer"])
    }

    // private Void get_position_Injected(Vector3& ret)
    @cache
    static get _get_position_Injected() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Rigidbody", "get_position_Injected", 1, ["UnityEngine.Vector3&"], "void", ["pointer", "pointer"])
    }

    // private Void get_rotation_Injected(Quaternion& ret)
    @cache
    static get _get_rotation_Injected() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Rigidbody", "get_rotation_Injected", 1, ["UnityEngine.Quaternion&"], "void", ["pointer", "pointer"])
    }

    // private Void set_rotation_Injected(Quaternion& value)
    @cache
    static get _set_rotation_Injected() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Rigidbody", "set_rotation_Injected", 1, ["UnityEngine.Quaternion&"], "void", ["pointer", "pointer"])
    }

    // private Void MovePosition_Injected(Vector3& position)
    @cache
    static get _MovePosition_Injected() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Rigidbody", "MovePosition_Injected", 1, ["UnityEngine.Vector3&"], "void", ["pointer", "pointer"])
    }

    // private Void MoveRotation_Injected(Quaternion& rot)
    @cache
    static get _MoveRotation_Injected() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Rigidbody", "MoveRotation_Injected", 1, ["UnityEngine.Quaternion&"], "void", ["pointer", "pointer"])
    }

    // private Void AddForce_Injected(Vector3& force,ForceMode mode)
    @cache
    static get _AddForce_Injected() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Rigidbody", "AddForce_Injected", 2, ["UnityEngine.Vector3&", "UnityEngine.ForceMode"], "void", ["pointer", "pointer", "pointer"])
    }

    // private Void AddTorque_Injected(Vector3& torque,ForceMode mode)
    @cache
    static get _AddTorque_Injected() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Rigidbody", "AddTorque_Injected", 2, ["UnityEngine.Vector3&", "UnityEngine.ForceMode"], "void", ["pointer", "pointer", "pointer"])
    }

}

Il2Cpp.Api.Rigidbody = UnityEngine_Rigidbody_API

declare global {
    namespace Il2Cpp.Api {
        class Rigidbody extends UnityEngine_Rigidbody_API { }
    }
}

export { }