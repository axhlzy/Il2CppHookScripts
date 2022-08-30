import { cache } from "decorator-cache-getter"

class UnityEngine_Physics_API {
    // public static Vector3 get_gravity()
    @cache
    static get _get_gravity() {
        return Il2Cpp.Api.t("UnityEngine.PhysicsModule", "UnityEngine.Physics", "get_gravity", 0, "pointer", [])
    }

    // public static Void set_gravity(Vector3 value)
    @cache
    static get _set_gravity() {
        return Il2Cpp.Api.t("UnityEngine.PhysicsModule", "UnityEngine.Physics", "set_gravity", 1, "void", ["pointer"])
    }

    // public static PhysicsScene get_defaultPhysicsScene()
    @cache
    static get _get_defaultPhysicsScene() {
        return Il2Cpp.Api.t("UnityEngine.PhysicsModule", "UnityEngine.Physics", "get_defaultPhysicsScene", 0, "pointer", [])
    }

    // public static Void IgnoreCollision(Collider collider1,Collider collider2,Boolean ignore)
    @cache
    static get _IgnoreCollision() {
        return Il2Cpp.Api.t("UnityEngine.PhysicsModule", "UnityEngine.Physics", "IgnoreCollision", 3, "void", ["pointer", "pointer", "pointer"])
    }

    // public static Void IgnoreLayerCollision(Int32 layer1,Int32 layer2,Boolean ignore)
    @cache
    static get _IgnoreLayerCollision() {
        return Il2Cpp.Api.t("UnityEngine.PhysicsModule", "UnityEngine.Physics", "IgnoreLayerCollision", 3, "void", ["pointer", "pointer", "pointer"])
    }

    // public static Void IgnoreLayerCollision(Int32 layer1,Int32 layer2)
    @cache
    static get _IgnoreLayerCollision_layer1_layer2() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Physics", "IgnoreLayerCollision", 2, ["System.Int32", "System.Int32"], "void", ["pointer", "pointer"])
    }

    // public static Boolean Raycast(Vector3 origin,Vector3 direction,Single maxDistance,Int32 layerMask,QueryTriggerInteraction queryTriggerInteraction)
    @cache
    static get _Raycast() {
        return Il2Cpp.Api.t("UnityEngine.PhysicsModule", "UnityEngine.Physics", "Raycast", 5, "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public static Boolean Raycast(Vector3 origin,Vector3 direction,Single maxDistance,Int32 layerMask)
    @cache
    static get _Raycast_origin_direction_maxDistance_layerMask() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Physics", "Raycast", 4, ["UnityEngine.Vector3", "UnityEngine.Vector3", "System.Single", "System.Int32"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // public static Boolean Raycast(Vector3 origin,Vector3 direction,Single maxDistance)
    @cache
    static get _Raycast_origin_direction_maxDistance() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Physics", "Raycast", 3, ["UnityEngine.Vector3", "UnityEngine.Vector3", "System.Single"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // public static Boolean Raycast(Vector3 origin,Vector3 direction)
    @cache
    static get _Raycast_origin_direction() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Physics", "Raycast", 2, ["UnityEngine.Vector3", "UnityEngine.Vector3"], "pointer", ["pointer", "pointer"])
    }

    // public static Boolean Raycast(Vector3 origin,Vector3 direction,RaycastHit& hitInfo,Single maxDistance,Int32 layerMask,QueryTriggerInteraction queryTriggerInteraction)
    @cache
    static get _Raycast_origin_direction_hitInfo_maxDistance_layerMask_queryTriggerInteraction() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Physics", "Raycast", 6, ["UnityEngine.Vector3", "UnityEngine.Vector3", "UnityEngine.RaycastHit&", "System.Single", "System.Int32", "UnityEngine.QueryTriggerInteraction"], "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public static Boolean Raycast(Vector3 origin,Vector3 direction,RaycastHit& hitInfo,Single maxDistance,Int32 layerMask)
    @cache
    static get _Raycast_origin_direction_hitInfo_maxDistance_layerMask() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Physics", "Raycast", 5, ["UnityEngine.Vector3", "UnityEngine.Vector3", "UnityEngine.RaycastHit&", "System.Single", "System.Int32"], "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public static Boolean Raycast(Vector3 origin,Vector3 direction,RaycastHit& hitInfo,Single maxDistance)
    @cache
    static get _Raycast_origin_direction_hitInfo_maxDistance() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Physics", "Raycast", 4, ["UnityEngine.Vector3", "UnityEngine.Vector3", "UnityEngine.RaycastHit&", "System.Single"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // public static Boolean Raycast(Vector3 origin,Vector3 direction,RaycastHit& hitInfo)
    @cache
    static get _Raycast_origin_direction_hitInfo() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Physics", "Raycast", 3, ["UnityEngine.Vector3", "UnityEngine.Vector3", "UnityEngine.RaycastHit&"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // public static Boolean Raycast(Ray ray,Single maxDistance,Int32 layerMask,QueryTriggerInteraction queryTriggerInteraction)
    @cache
    static get _Raycast_ray_maxDistance_layerMask_queryTriggerInteraction() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Physics", "Raycast", 4, ["UnityEngine.Ray", "System.Single", "System.Int32", "UnityEngine.QueryTriggerInteraction"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // public static Boolean Raycast(Ray ray,Single maxDistance,Int32 layerMask)
    @cache
    static get _Raycast_ray_maxDistance_layerMask() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Physics", "Raycast", 3, ["UnityEngine.Ray", "System.Single", "System.Int32"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // public static Boolean Raycast(Ray ray,Single maxDistance)
    @cache
    static get _Raycast_ray_maxDistance() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Physics", "Raycast", 2, ["UnityEngine.Ray", "System.Single"], "pointer", ["pointer", "pointer"])
    }

    // public static Boolean Raycast(Ray ray)
    @cache
    static get _Raycast_ray() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Physics", "Raycast", 1, ["UnityEngine.Ray"], "pointer", ["pointer"])
    }

    // public static Boolean Raycast(Ray ray,RaycastHit& hitInfo,Single maxDistance,Int32 layerMask,QueryTriggerInteraction queryTriggerInteraction)
    @cache
    static get _Raycast_ray_hitInfo_maxDistance_layerMask_queryTriggerInteraction() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Physics", "Raycast", 5, ["UnityEngine.Ray", "UnityEngine.RaycastHit&", "System.Single", "System.Int32", "UnityEngine.QueryTriggerInteraction"], "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public static Boolean Raycast(Ray ray,RaycastHit& hitInfo,Single maxDistance,Int32 layerMask)
    @cache
    static get _Raycast_ray_hitInfo_maxDistance_layerMask() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Physics", "Raycast", 4, ["UnityEngine.Ray", "UnityEngine.RaycastHit&", "System.Single", "System.Int32"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // public static Boolean Raycast(Ray ray,RaycastHit& hitInfo,Single maxDistance)
    @cache
    static get _Raycast_ray_hitInfo_maxDistance() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Physics", "Raycast", 3, ["UnityEngine.Ray", "UnityEngine.RaycastHit&", "System.Single"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // public static Boolean Raycast(Ray ray,RaycastHit& hitInfo)
    @cache
    static get _Raycast_ray_hitInfo() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Physics", "Raycast", 2, ["UnityEngine.Ray", "UnityEngine.RaycastHit&"], "pointer", ["pointer", "pointer"])
    }

    // public static Boolean Linecast(Vector3 start,Vector3 end,RaycastHit& hitInfo,Int32 layerMask,QueryTriggerInteraction queryTriggerInteraction)
    @cache
    static get _Linecast() {
        return Il2Cpp.Api.t("UnityEngine.PhysicsModule", "UnityEngine.Physics", "Linecast", 5, "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public static Boolean Linecast(Vector3 start,Vector3 end,RaycastHit& hitInfo)
    @cache
    static get _Linecast_start_end_hitInfo() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Physics", "Linecast", 3, ["UnityEngine.Vector3", "UnityEngine.Vector3", "UnityEngine.RaycastHit&"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // public static Boolean SphereCast(Vector3 origin,Single radius,Vector3 direction,RaycastHit& hitInfo,Single maxDistance,Int32 layerMask,QueryTriggerInteraction queryTriggerInteraction)
    @cache
    static get _SphereCast() {
        return Il2Cpp.Api.t("UnityEngine.PhysicsModule", "UnityEngine.Physics", "SphereCast", 7, "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public static Boolean SphereCast(Vector3 origin,Single radius,Vector3 direction,RaycastHit& hitInfo,Single maxDistance)
    @cache
    static get _SphereCast_origin_radius_direction_hitInfo_maxDistance() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Physics", "SphereCast", 5, ["UnityEngine.Vector3", "System.Single", "UnityEngine.Vector3", "UnityEngine.RaycastHit&", "System.Single"], "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public static Boolean SphereCast(Vector3 origin,Single radius,Vector3 direction,RaycastHit& hitInfo)
    @cache
    static get _SphereCast_origin_radius_direction_hitInfo() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Physics", "SphereCast", 4, ["UnityEngine.Vector3", "System.Single", "UnityEngine.Vector3", "UnityEngine.RaycastHit&"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // public static Boolean SphereCast(Ray ray,Single radius,RaycastHit& hitInfo,Single maxDistance,Int32 layerMask,QueryTriggerInteraction queryTriggerInteraction)
    @cache
    static get _SphereCast_ray_radius_hitInfo_maxDistance_layerMask_queryTriggerInteraction() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Physics", "SphereCast", 6, ["UnityEngine.Ray", "System.Single", "UnityEngine.RaycastHit&", "System.Single", "System.Int32", "UnityEngine.QueryTriggerInteraction"], "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public static Boolean SphereCast(Ray ray,Single radius,RaycastHit& hitInfo,Single maxDistance,Int32 layerMask)
    @cache
    static get _SphereCast_ray_radius_hitInfo_maxDistance_layerMask() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Physics", "SphereCast", 5, ["UnityEngine.Ray", "System.Single", "UnityEngine.RaycastHit&", "System.Single", "System.Int32"], "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public static Boolean BoxCast(Vector3 center,Vector3 halfExtents,Vector3 direction,RaycastHit& hitInfo,Quaternion orientation,Single maxDistance,Int32 layerMask,QueryTriggerInteraction queryTriggerInteraction)
    @cache
    static get _BoxCast() {
        return Il2Cpp.Api.t("UnityEngine.PhysicsModule", "UnityEngine.Physics", "BoxCast", 8, "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public static Boolean BoxCast(Vector3 center,Vector3 halfExtents,Vector3 direction,RaycastHit& hitInfo,Quaternion orientation,Single maxDistance,Int32 layerMask)
    @cache
    static get _BoxCast_center_halfExtents_direction_hitInfo_orientation_maxDistance_layerMask() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Physics", "BoxCast", 7, ["UnityEngine.Vector3", "UnityEngine.Vector3", "UnityEngine.Vector3", "UnityEngine.RaycastHit&", "UnityEngine.Quaternion", "System.Single", "System.Int32"], "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // private static RaycastHit[] Internal_RaycastAll(PhysicsScene physicsScene,Ray ray,Single maxDistance,Int32 mask,QueryTriggerInteraction queryTriggerInteraction)
    @cache
    static get _Internal_RaycastAll() {
        return Il2Cpp.Api.t("UnityEngine.PhysicsModule", "UnityEngine.Physics", "Internal_RaycastAll", 5, "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public static RaycastHit[] RaycastAll(Vector3 origin,Vector3 direction,Single maxDistance,Int32 layerMask,QueryTriggerInteraction queryTriggerInteraction)
    @cache
    static get _RaycastAll() {
        return Il2Cpp.Api.t("UnityEngine.PhysicsModule", "UnityEngine.Physics", "RaycastAll", 5, "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public static RaycastHit[] RaycastAll(Vector3 origin,Vector3 direction,Single maxDistance,Int32 layerMask)
    @cache
    static get _RaycastAll_origin_direction_maxDistance_layerMask() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Physics", "RaycastAll", 4, ["UnityEngine.Vector3", "UnityEngine.Vector3", "System.Single", "System.Int32"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // public static RaycastHit[] RaycastAll(Vector3 origin,Vector3 direction,Single maxDistance)
    @cache
    static get _RaycastAll_origin_direction_maxDistance() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Physics", "RaycastAll", 3, ["UnityEngine.Vector3", "UnityEngine.Vector3", "System.Single"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // public static RaycastHit[] RaycastAll(Vector3 origin,Vector3 direction)
    @cache
    static get _RaycastAll_origin_direction() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Physics", "RaycastAll", 2, ["UnityEngine.Vector3", "UnityEngine.Vector3"], "pointer", ["pointer", "pointer"])
    }

    // public static RaycastHit[] RaycastAll(Ray ray,Single maxDistance,Int32 layerMask,QueryTriggerInteraction queryTriggerInteraction)
    @cache
    static get _RaycastAll_ray_maxDistance_layerMask_queryTriggerInteraction() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Physics", "RaycastAll", 4, ["UnityEngine.Ray", "System.Single", "System.Int32", "UnityEngine.QueryTriggerInteraction"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // public static RaycastHit[] RaycastAll(Ray ray,Single maxDistance,Int32 layerMask)
    @cache
    static get _RaycastAll_ray_maxDistance_layerMask() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Physics", "RaycastAll", 3, ["UnityEngine.Ray", "System.Single", "System.Int32"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // public static RaycastHit[] RaycastAll(Ray ray,Single maxDistance)
    @cache
    static get _RaycastAll_ray_maxDistance() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Physics", "RaycastAll", 2, ["UnityEngine.Ray", "System.Single"], "pointer", ["pointer", "pointer"])
    }

    // public static RaycastHit[] RaycastAll(Ray ray)
    @cache
    static get _RaycastAll_ray() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Physics", "RaycastAll", 1, ["UnityEngine.Ray"], "pointer", ["pointer"])
    }

    // public static Int32 RaycastNonAlloc(Ray ray,RaycastHit[] results,Single maxDistance,Int32 layerMask,QueryTriggerInteraction queryTriggerInteraction)
    @cache
    static get _RaycastNonAlloc() {
        return Il2Cpp.Api.t("UnityEngine.PhysicsModule", "UnityEngine.Physics", "RaycastNonAlloc", 5, "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public static Int32 RaycastNonAlloc(Ray ray,RaycastHit[] results,Single maxDistance,Int32 layerMask)
    @cache
    static get _RaycastNonAlloc_ray_results_maxDistance_layerMask() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Physics", "RaycastNonAlloc", 4, ["UnityEngine.Ray", "UnityEngine.RaycastHit[]", "System.Single", "System.Int32"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // public static Int32 RaycastNonAlloc(Ray ray,RaycastHit[] results,Single maxDistance)
    @cache
    static get _RaycastNonAlloc_ray_results_maxDistance() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Physics", "RaycastNonAlloc", 3, ["UnityEngine.Ray", "UnityEngine.RaycastHit[]", "System.Single"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // public static Int32 RaycastNonAlloc(Ray ray,RaycastHit[] results)
    @cache
    static get _RaycastNonAlloc_ray_results() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Physics", "RaycastNonAlloc", 2, ["UnityEngine.Ray", "UnityEngine.RaycastHit[]"], "pointer", ["pointer", "pointer"])
    }

    // public static Int32 RaycastNonAlloc(Vector3 origin,Vector3 direction,RaycastHit[] results,Single maxDistance,Int32 layerMask,QueryTriggerInteraction queryTriggerInteraction)
    @cache
    static get _RaycastNonAlloc_origin_direction_results_maxDistance_layerMask_queryTriggerInteraction() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Physics", "RaycastNonAlloc", 6, ["UnityEngine.Vector3", "UnityEngine.Vector3", "UnityEngine.RaycastHit[]", "System.Single", "System.Int32", "UnityEngine.QueryTriggerInteraction"], "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public static Int32 RaycastNonAlloc(Vector3 origin,Vector3 direction,RaycastHit[] results,Single maxDistance,Int32 layerMask)
    @cache
    static get _RaycastNonAlloc_origin_direction_results_maxDistance_layerMask() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Physics", "RaycastNonAlloc", 5, ["UnityEngine.Vector3", "UnityEngine.Vector3", "UnityEngine.RaycastHit[]", "System.Single", "System.Int32"], "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public static Int32 RaycastNonAlloc(Vector3 origin,Vector3 direction,RaycastHit[] results,Single maxDistance)
    @cache
    static get _RaycastNonAlloc_origin_direction_results_maxDistance() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Physics", "RaycastNonAlloc", 4, ["UnityEngine.Vector3", "UnityEngine.Vector3", "UnityEngine.RaycastHit[]", "System.Single"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // public static Int32 RaycastNonAlloc(Vector3 origin,Vector3 direction,RaycastHit[] results)
    @cache
    static get _RaycastNonAlloc_origin_direction_results() {
        return Il2Cpp.Api.o("UnityEngine.PhysicsModule", "UnityEngine.Physics", "RaycastNonAlloc", 3, ["UnityEngine.Vector3", "UnityEngine.Vector3", "UnityEngine.RaycastHit[]"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // private static Boolean Query_ComputePenetration(Collider colliderA,Vector3 positionA,Quaternion rotationA,Collider colliderB,Vector3 positionB,Quaternion rotationB,Vector3& direction,Single& distance)
    @cache
    static get _Query_ComputePenetration() {
        return Il2Cpp.Api.t("UnityEngine.PhysicsModule", "UnityEngine.Physics", "Query_ComputePenetration", 8, "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public static Boolean ComputePenetration(Collider colliderA,Vector3 positionA,Quaternion rotationA,Collider colliderB,Vector3 positionB,Quaternion rotationB,Vector3& direction,Single& distance)
    @cache
    static get _ComputePenetration() {
        return Il2Cpp.Api.t("UnityEngine.PhysicsModule", "UnityEngine.Physics", "ComputePenetration", 8, "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public static Int32 OverlapSphereNonAlloc(Vector3 position,Single radius,Collider[] results,Int32 layerMask,QueryTriggerInteraction queryTriggerInteraction)
    @cache
    static get _OverlapSphereNonAlloc() {
        return Il2Cpp.Api.t("UnityEngine.PhysicsModule", "UnityEngine.Physics", "OverlapSphereNonAlloc", 5, "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public static Int32 SphereCastNonAlloc(Vector3 origin,Single radius,Vector3 direction,RaycastHit[] results,Single maxDistance,Int32 layerMask,QueryTriggerInteraction queryTriggerInteraction)
    @cache
    static get _SphereCastNonAlloc() {
        return Il2Cpp.Api.t("UnityEngine.PhysicsModule", "UnityEngine.Physics", "SphereCastNonAlloc", 7, "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // private static Void get_gravity_Injected(Vector3& ret)
    @cache
    static get _get_gravity_Injected() {
        return Il2Cpp.Api.t("UnityEngine.PhysicsModule", "UnityEngine.Physics", "get_gravity_Injected", 1, "void", ["pointer"])
    }

    // private static Void set_gravity_Injected(Vector3& value)
    @cache
    static get _set_gravity_Injected() {
        return Il2Cpp.Api.t("UnityEngine.PhysicsModule", "UnityEngine.Physics", "set_gravity_Injected", 1, "void", ["pointer"])
    }

    // private static Void get_defaultPhysicsScene_Injected(PhysicsScene& ret)
    @cache
    static get _get_defaultPhysicsScene_Injected() {
        return Il2Cpp.Api.t("UnityEngine.PhysicsModule", "UnityEngine.Physics", "get_defaultPhysicsScene_Injected", 1, "void", ["pointer"])
    }

    // private static RaycastHit[] Internal_RaycastAll_Injected(PhysicsScene& physicsScene,Ray& ray,Single maxDistance,Int32 mask,QueryTriggerInteraction queryTriggerInteraction)
    @cache
    static get _Internal_RaycastAll_Injected() {
        return Il2Cpp.Api.t("UnityEngine.PhysicsModule", "UnityEngine.Physics", "Internal_RaycastAll_Injected", 5, "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // private static Boolean Query_ComputePenetration_Injected(Collider colliderA,Vector3& positionA,Quaternion& rotationA,Collider colliderB,Vector3& positionB,Quaternion& rotationB,Vector3& direction,Single& distance)
    @cache
    static get _Query_ComputePenetration_Injected() {
        return Il2Cpp.Api.t("UnityEngine.PhysicsModule", "UnityEngine.Physics", "Query_ComputePenetration_Injected", 8, "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer"])
    }

}

Il2Cpp.Api.Physics = UnityEngine_Physics_API

declare global {
    namespace Il2Cpp.Api {
        class Physics extends UnityEngine_Physics_API { }
    }
}

export { }