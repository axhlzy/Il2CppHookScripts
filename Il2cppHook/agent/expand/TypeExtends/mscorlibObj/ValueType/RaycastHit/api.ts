import { cache } from "decorator-cache-getter"

class UnityEngine_RaycastHit_API {
    // public Collider get_collider()
    @cache
    static get _get_collider() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.RaycastHit", "get_collider", 0, [], "pointer", ["pointer"])
    }

    // public Vector3 get_point()
    @cache
    static get _get_point() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.RaycastHit", "get_point", 0, [], "pointer", ["pointer"])
    }

    // public Vector3 get_normal()
    @cache
    static get _get_normal() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.RaycastHit", "get_normal", 0, [], "pointer", ["pointer"])
    }

    // public Single get_distance()
    @cache
    static get _get_distance() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.RaycastHit", "get_distance", 0, [], "pointer", ["pointer"])
    }

    // public Int32 get_triangleIndex()
    @cache
    static get _get_triangleIndex() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.RaycastHit", "get_triangleIndex", 0, [], "pointer", ["pointer"])
    }

    // public Transform get_transform()
    @cache
    static get _get_transform() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.RaycastHit", "get_transform", 0, [], "pointer", ["pointer"])
    }

    // public Rigidbody get_rigidbody()
    @cache
    static get _get_rigidbody() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.RaycastHit", "get_rigidbody", 0, [], "pointer", ["pointer"])
    }

}

Il2Cpp.Api.RaycastHit = UnityEngine_RaycastHit_API

declare global {
    namespace Il2Cpp.Api {
        class RaycastHit extends UnityEngine_RaycastHit_API { }
    }
}

export { }