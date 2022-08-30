import { cache } from "decorator-cache-getter"

class UnityEngine_Collider_API {
    // public Boolean get_enabled()
    @cache
    static get _get_enabled() {
        return Il2Cpp.Api.t("UnityEngine.PhysicsModule", "UnityEngine.Collider", "get_enabled", 0, "pointer", ["pointer"])
    }

    // public Void set_enabled(Boolean value)
    @cache
    static get _set_enabled() {
        return Il2Cpp.Api.t("UnityEngine.PhysicsModule", "UnityEngine.Collider", "set_enabled", 1, "void", ["pointer", "pointer"])
    }

    // public Rigidbody get_attachedRigidbody()
    @cache
    static get _get_attachedRigidbody() {
        return Il2Cpp.Api.t("UnityEngine.PhysicsModule", "UnityEngine.Collider", "get_attachedRigidbody", 0, "pointer", ["pointer"])
    }

    // public Void set_isTrigger(Boolean value)
    @cache
    static get _set_isTrigger() {
        return Il2Cpp.Api.t("UnityEngine.PhysicsModule", "UnityEngine.Collider", "set_isTrigger", 1, "void", ["pointer", "pointer"])
    }

    // public Vector3 ClosestPoint(Vector3 position)
    @cache
    static get _ClosestPoint() {
        return Il2Cpp.Api.t("UnityEngine.PhysicsModule", "UnityEngine.Collider", "ClosestPoint", 1, "pointer", ["pointer", "pointer"])
    }

    // public Bounds get_bounds()
    @cache
    static get _get_bounds() {
        return Il2Cpp.Api.t("UnityEngine.PhysicsModule", "UnityEngine.Collider", "get_bounds", 0, "pointer", ["pointer"])
    }

    // private RaycastHit Raycast(Ray ray,Single maxDistance,Boolean& hasHit)
    @cache
    static get _Raycast() {
        return Il2Cpp.Api.t("UnityEngine.PhysicsModule", "UnityEngine.Collider", "Raycast", 3, "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // public Boolean Raycast(Ray ray,RaycastHit& hitInfo,Single maxDistance)
    @cache
    static get _Raycast_ray_hitInfo_maxDistance() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Collider", "Raycast", 3, ["UnityEngine.Ray", "UnityEngine.RaycastHit&", "System.Single"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // private Void ClosestPoint_Injected(Vector3& position,Vector3& ret)
    @cache
    static get _ClosestPoint_Injected() {
        return Il2Cpp.Api.t("UnityEngine.PhysicsModule", "UnityEngine.Collider", "ClosestPoint_Injected", 2, "void", ["pointer", "pointer", "pointer"])
    }

    // private Void get_bounds_Injected(Bounds& ret)
    @cache
    static get _get_bounds_Injected() {
        return Il2Cpp.Api.t("UnityEngine.PhysicsModule", "UnityEngine.Collider", "get_bounds_Injected", 1, "void", ["pointer", "pointer"])
    }

    // private Void Raycast_Injected(Ray& ray,Single maxDistance,Boolean& hasHit,RaycastHit& ret)
    @cache
    static get _Raycast_Injected() {
        return Il2Cpp.Api.t("UnityEngine.PhysicsModule", "UnityEngine.Collider", "Raycast_Injected", 4, "void", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

}

Il2Cpp.Api.Collider = UnityEngine_Collider_API

declare global {
    namespace Il2Cpp.Api {
        class Collider extends UnityEngine_Collider_API { }
    }
}

export { }