import { mscorlib_System_Object_impl as System_Object_Impl } from "../class"
import { UnityEngine_Quaternion_Impl as UnityEngine_Quaternion } from "../ValueType/Quaternion/class"
import { UnityEngine_Vector3_Impl as UnityEngine_Vector3 } from "../ValueType/Vector3/class"

type UnityEngine_PhysicsScene = NativePointer
type UnityEngine_Collider = NativePointer
type UnityEngine_QueryTriggerInteraction = NativePointer
type UnityEngine_Ray = NativePointer
type UnityEngine_RaycastHit = NativePointer

class UnityEngine_Physics_Impl extends System_Object_Impl {

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    static get_gravity(): UnityEngine_Vector3 {
        return Il2Cpp.Api.Physics._get_gravity()
    }

    static set_gravity(value: UnityEngine_Vector3): void {
        return Il2Cpp.Api.Physics._set_gravity(value)
    }

    static get_defaultPhysicsScene(): UnityEngine_PhysicsScene {
        return Il2Cpp.Api.Physics._get_defaultPhysicsScene()
    }

    static IgnoreCollision(collider1: UnityEngine_Collider, collider2: UnityEngine_Collider, ignore: boolean): void {
        return Il2Cpp.Api.Physics._IgnoreCollision(collider1, collider2, ignore)
    }

    static IgnoreLayerCollision(layer1: number, layer2: number, ignore: boolean): void {
        return Il2Cpp.Api.Physics._IgnoreLayerCollision(layer1, layer2, ignore)
    }

    static IgnoreLayerCollision_2(layer1: number, layer2: number): void {
        return Il2Cpp.Api.Physics._IgnoreLayerCollision(layer1, layer2)
    }

    static Raycast(origin: UnityEngine_Vector3, direction: UnityEngine_Vector3, maxDistance: number, layerMask: number, queryTriggerInteraction: UnityEngine_QueryTriggerInteraction): boolean {
        return Il2Cpp.Api.Physics._Raycast(origin, direction, maxDistance, layerMask, queryTriggerInteraction)
    }

    static Raycast_4(origin: UnityEngine_Vector3, direction: UnityEngine_Vector3, maxDistance: number, layerMask: number): boolean {
        return Il2Cpp.Api.Physics._Raycast(origin, direction, maxDistance, layerMask)
    }

    static Raycast_3(origin: UnityEngine_Vector3, direction: UnityEngine_Vector3, maxDistance: number): boolean {
        return Il2Cpp.Api.Physics._Raycast(origin, direction, maxDistance)
    }

    static Raycast_2(origin: UnityEngine_Vector3, direction: UnityEngine_Vector3): boolean {
        return Il2Cpp.Api.Physics._Raycast(origin, direction)
    }

    static Raycast_6(origin: UnityEngine_Vector3, direction: UnityEngine_Vector3, hitInfo: UnityEngine_RaycastHit, maxDistance: number, layerMask: number, queryTriggerInteraction: UnityEngine_QueryTriggerInteraction): boolean {
        return Il2Cpp.Api.Physics._Raycast(origin, direction, hitInfo, maxDistance, layerMask, queryTriggerInteraction)
    }

    static Raycast_v3_dir_hit_max_layer(origin: UnityEngine_Vector3, direction: UnityEngine_Vector3, hitInfo: UnityEngine_RaycastHit, maxDistance: number, layerMask: number): boolean {
        return Il2Cpp.Api.Physics._Raycast(origin, direction, hitInfo, maxDistance, layerMask)
    }

    static Raycast_org_v3_hit_dis(origin: UnityEngine_Vector3, direction: UnityEngine_Vector3, hitInfo: UnityEngine_RaycastHit, maxDistance: number): boolean {
        return Il2Cpp.Api.Physics._Raycast(origin, direction, hitInfo, maxDistance)
    }

    static Raycast_v3_v3_hit(origin: UnityEngine_Vector3, direction: UnityEngine_Vector3, hitInfo: UnityEngine_RaycastHit): boolean {
        return Il2Cpp.Api.Physics._Raycast(origin, direction, hitInfo)
    }

    static Raycast_ray_num_num_query(ray: UnityEngine_Ray, maxDistance: number, layerMask: number, queryTriggerInteraction: UnityEngine_QueryTriggerInteraction): boolean {
        return Il2Cpp.Api.Physics._Raycast(ray, maxDistance, layerMask, queryTriggerInteraction)
    }

    static Raycast_ray_num_num(ray: UnityEngine_Ray, maxDistance: number, layerMask: number): boolean {
        return Il2Cpp.Api.Physics._Raycast(ray, maxDistance, layerMask)
    }

    static Raycast_ray_num(ray: UnityEngine_Ray, maxDistance: number): boolean {
        return Il2Cpp.Api.Physics._Raycast(ray, maxDistance)
    }

    static Raycast_ray(ray: UnityEngine_Ray): boolean {
        return Il2Cpp.Api.Physics._Raycast(ray)
    }

    static Raycast_5(ray: UnityEngine_Ray, hitInfo: UnityEngine_RaycastHit, maxDistance: number, layerMask: number, queryTriggerInteraction: UnityEngine_QueryTriggerInteraction): boolean {
        return Il2Cpp.Api.Physics._Raycast(ray, hitInfo, maxDistance, layerMask, queryTriggerInteraction)
    }

    static Raycast_ray_hit_dis_layer(ray: UnityEngine_Ray, hitInfo: UnityEngine_RaycastHit, maxDistance: number, layerMask: number): boolean {
        return Il2Cpp.Api.Physics._Raycast(ray, hitInfo, maxDistance, layerMask)
    }

    static Raycast_ray_ray_num(ray: UnityEngine_Ray, hitInfo: UnityEngine_RaycastHit, maxDistance: number): boolean {
        return Il2Cpp.Api.Physics._Raycast(ray, hitInfo, maxDistance)
    }

    static Raycast_ray_hit(ray: UnityEngine_Ray, hitInfo: UnityEngine_RaycastHit): boolean {
        return Il2Cpp.Api.Physics._Raycast(ray, hitInfo)
    }

    static Linecast(start: UnityEngine_Vector3, end: UnityEngine_Vector3, hitInfo: UnityEngine_RaycastHit, layerMask: number, queryTriggerInteraction: UnityEngine_QueryTriggerInteraction): boolean {
        return Il2Cpp.Api.Physics._Linecast(start, end, hitInfo, layerMask, queryTriggerInteraction)
    }

    static Linecast_3(start: UnityEngine_Vector3, end: UnityEngine_Vector3, hitInfo: UnityEngine_RaycastHit): boolean {
        return Il2Cpp.Api.Physics._Linecast(start, end, hitInfo)
    }

    static SphereCast(origin: UnityEngine_Vector3, radius: number, direction: UnityEngine_Vector3, hitInfo: UnityEngine_RaycastHit, maxDistance: number, layerMask: number, queryTriggerInteraction: UnityEngine_QueryTriggerInteraction): boolean {
        return Il2Cpp.Api.Physics._SphereCast(origin, radius, direction, hitInfo, maxDistance, layerMask, queryTriggerInteraction)
    }

    static SphereCast_v3_num_v3_hit_num(origin: UnityEngine_Vector3, radius: number, direction: UnityEngine_Vector3, hitInfo: UnityEngine_RaycastHit, maxDistance: number): boolean {
        return Il2Cpp.Api.Physics._SphereCast(origin, radius, direction, hitInfo, maxDistance)
    }

    static SphereCast_4(origin: UnityEngine_Vector3, radius: number, direction: UnityEngine_Vector3, hitInfo: UnityEngine_RaycastHit): boolean {
        return Il2Cpp.Api.Physics._SphereCast(origin, radius, direction, hitInfo)
    }

    static SphereCast_6(ray: UnityEngine_Ray, radius: number, hitInfo: UnityEngine_RaycastHit, maxDistance: number, layerMask: number, queryTriggerInteraction: UnityEngine_QueryTriggerInteraction): boolean {
        return Il2Cpp.Api.Physics._SphereCast(ray, radius, hitInfo, maxDistance, layerMask, queryTriggerInteraction)
    }

    static SphereCast_5(ray: UnityEngine_Ray, radius: number, hitInfo: UnityEngine_RaycastHit, maxDistance: number, layerMask: number): boolean {
        return Il2Cpp.Api.Physics._SphereCast(ray, radius, hitInfo, maxDistance, layerMask)
    }

    static BoxCast(center: UnityEngine_Vector3, halfExtents: UnityEngine_Vector3, direction: UnityEngine_Vector3, hitInfo: UnityEngine_RaycastHit, orientation: UnityEngine_Quaternion, maxDistance: number, layerMask: number, queryTriggerInteraction: UnityEngine_QueryTriggerInteraction): boolean {
        return Il2Cpp.Api.Physics._BoxCast(center, halfExtents, direction, hitInfo, orientation, maxDistance, layerMask, queryTriggerInteraction)
    }

    static BoxCast_7(center: UnityEngine_Vector3, halfExtents: UnityEngine_Vector3, direction: UnityEngine_Vector3, hitInfo: UnityEngine_RaycastHit, orientation: UnityEngine_Quaternion, maxDistance: number, layerMask: number): boolean {
        return Il2Cpp.Api.Physics._BoxCast(center, halfExtents, direction, hitInfo, orientation, maxDistance, layerMask)
    }

    static Internal_RaycastAll(physicsScene: UnityEngine_PhysicsScene, ray: UnityEngine_Ray, maxDistance: number, mask: number, queryTriggerInteraction: UnityEngine_QueryTriggerInteraction): UnityEngine_RaycastHit[] {
        return Il2Cpp.Api.Physics._Internal_RaycastAll(physicsScene, ray, maxDistance, mask, queryTriggerInteraction)
    }

    static RaycastAll(origin: UnityEngine_Vector3, direction: UnityEngine_Vector3, maxDistance: number, layerMask: number, queryTriggerInteraction: UnityEngine_QueryTriggerInteraction): UnityEngine_RaycastHit[] {
        return Il2Cpp.Api.Physics._RaycastAll(origin, direction, maxDistance, layerMask, queryTriggerInteraction)
    }

    static RaycastAll_4_1(origin: UnityEngine_Vector3, direction: UnityEngine_Vector3, maxDistance: number, layerMask: number): UnityEngine_RaycastHit[] {
        return Il2Cpp.Api.Physics._RaycastAll(origin, direction, maxDistance, layerMask)
    }

    static RaycastAll_3_1(origin: UnityEngine_Vector3, direction: UnityEngine_Vector3, maxDistance: number): UnityEngine_RaycastHit[] {
        return Il2Cpp.Api.Physics._RaycastAll(origin, direction, maxDistance)
    }

    static RaycastAll_2_1(origin: UnityEngine_Vector3, direction: UnityEngine_Vector3): UnityEngine_RaycastHit[] {
        return Il2Cpp.Api.Physics._RaycastAll(origin, direction)
    }

    static RaycastAll_4(ray: UnityEngine_Ray, maxDistance: number, layerMask: number, queryTriggerInteraction: UnityEngine_QueryTriggerInteraction): UnityEngine_RaycastHit[] {
        return Il2Cpp.Api.Physics._RaycastAll(ray, maxDistance, layerMask, queryTriggerInteraction)
    }

    static RaycastAll_3(ray: UnityEngine_Ray, maxDistance: number, layerMask: number): UnityEngine_RaycastHit[] {
        return Il2Cpp.Api.Physics._RaycastAll(ray, maxDistance, layerMask)
    }

    static RaycastAll_2_2(ray: UnityEngine_Ray, maxDistance: number): UnityEngine_RaycastHit[] {
        return Il2Cpp.Api.Physics._RaycastAll(ray, maxDistance)
    }

    static RaycastAll_1(ray: UnityEngine_Ray): UnityEngine_RaycastHit[] {
        return Il2Cpp.Api.Physics._RaycastAll(ray)
    }

    static RaycastNonAlloc(ray: UnityEngine_Ray, results: UnityEngine_RaycastHit[], maxDistance: number, layerMask: number, queryTriggerInteraction: UnityEngine_QueryTriggerInteraction): number {
        return Il2Cpp.Api.Physics._RaycastNonAlloc(ray, results, maxDistance, layerMask, queryTriggerInteraction)
    }

    static RaycastNonAlloc_4_1(ray: UnityEngine_Ray, results: UnityEngine_RaycastHit[], maxDistance: number, layerMask: number): number {
        return Il2Cpp.Api.Physics._RaycastNonAlloc(ray, results, maxDistance, layerMask)
    }

    static RaycastNonAlloc_3_1(ray: UnityEngine_Ray, results: UnityEngine_RaycastHit[], maxDistance: number): number {
        return Il2Cpp.Api.Physics._RaycastNonAlloc(ray, results, maxDistance)
    }

    static RaycastNonAlloc_2(ray: UnityEngine_Ray, results: UnityEngine_RaycastHit[]): number {
        return Il2Cpp.Api.Physics._RaycastNonAlloc(ray, results)
    }

    static RaycastNonAlloc_6(origin: UnityEngine_Vector3, direction: UnityEngine_Vector3, results: UnityEngine_RaycastHit[], maxDistance: number, layerMask: number, queryTriggerInteraction: UnityEngine_QueryTriggerInteraction): number {
        return Il2Cpp.Api.Physics._RaycastNonAlloc(origin, direction, results, maxDistance, layerMask, queryTriggerInteraction)
    }

    static RaycastNonAlloc_5(origin: UnityEngine_Vector3, direction: UnityEngine_Vector3, results: UnityEngine_RaycastHit[], maxDistance: number, layerMask: number): number {
        return Il2Cpp.Api.Physics._RaycastNonAlloc(origin, direction, results, maxDistance, layerMask)
    }

    static RaycastNonAlloc_4(origin: UnityEngine_Vector3, direction: UnityEngine_Vector3, results: UnityEngine_RaycastHit[], maxDistance: number): number {
        return Il2Cpp.Api.Physics._RaycastNonAlloc(origin, direction, results, maxDistance)
    }

    static RaycastNonAlloc_3(origin: UnityEngine_Vector3, direction: UnityEngine_Vector3, results: UnityEngine_RaycastHit[]): number {
        return Il2Cpp.Api.Physics._RaycastNonAlloc(origin, direction, results)
    }

    static Query_ComputePenetration(colliderA: UnityEngine_Collider, positionA: UnityEngine_Vector3, rotationA: UnityEngine_Quaternion, colliderB: UnityEngine_Collider, positionB: UnityEngine_Vector3, rotationB: UnityEngine_Quaternion, direction: UnityEngine_Vector3, distance: number): boolean {
        return Il2Cpp.Api.Physics._Query_ComputePenetration(colliderA, positionA, rotationA, colliderB, positionB, rotationB, direction, distance)
    }

    static ComputePenetration(colliderA: UnityEngine_Collider, positionA: UnityEngine_Vector3, rotationA: UnityEngine_Quaternion, colliderB: UnityEngine_Collider, positionB: UnityEngine_Vector3, rotationB: UnityEngine_Quaternion, direction: UnityEngine_Vector3, distance: number): boolean {
        return Il2Cpp.Api.Physics._ComputePenetration(colliderA, positionA, rotationA, colliderB, positionB, rotationB, direction, distance)
    }

    static OverlapSphereNonAlloc(position: UnityEngine_Vector3, radius: number, results: UnityEngine_Collider[], layerMask: number, queryTriggerInteraction: UnityEngine_QueryTriggerInteraction): number {
        return Il2Cpp.Api.Physics._OverlapSphereNonAlloc(position, radius, results, layerMask, queryTriggerInteraction)
    }

    static SphereCastNonAlloc(origin: UnityEngine_Vector3, radius: number, direction: UnityEngine_Vector3, results: UnityEngine_RaycastHit[], maxDistance: number, layerMask: number, queryTriggerInteraction: UnityEngine_QueryTriggerInteraction): number {
        return Il2Cpp.Api.Physics._SphereCastNonAlloc(origin, radius, direction, results, maxDistance, layerMask, queryTriggerInteraction)
    }

    static get_gravity_Injected(ret: UnityEngine_Vector3): void {
        return Il2Cpp.Api.Physics._get_gravity_Injected(ret)
    }

    static set_gravity_Injected(value: UnityEngine_Vector3): void {
        return Il2Cpp.Api.Physics._set_gravity_Injected(value)
    }

    static get_defaultPhysicsScene_Injected(ret: UnityEngine_PhysicsScene): void {
        return Il2Cpp.Api.Physics._get_defaultPhysicsScene_Injected(ret)
    }

    static Internal_RaycastAll_Injected(physicsScene: UnityEngine_PhysicsScene, ray: UnityEngine_Ray, maxDistance: number, mask: number, queryTriggerInteraction: UnityEngine_QueryTriggerInteraction): UnityEngine_RaycastHit[] {
        return Il2Cpp.Api.Physics._Internal_RaycastAll_Injected(physicsScene, ray, maxDistance, mask, queryTriggerInteraction)
    }

    static Query_ComputePenetration_Injected(colliderA: UnityEngine_Collider, positionA: UnityEngine_Vector3, rotationA: UnityEngine_Quaternion, colliderB: UnityEngine_Collider, positionB: UnityEngine_Vector3, rotationB: UnityEngine_Quaternion, direction: UnityEngine_Vector3, distance: number): boolean {
        return Il2Cpp.Api.Physics._Query_ComputePenetration_Injected(colliderA, positionA, rotationA, colliderB, positionB, rotationB, direction, distance)
    }

}

Il2Cpp.Physics = UnityEngine_Physics_Impl

declare global {
    namespace Il2Cpp {
        class Physics extends UnityEngine_Physics_Impl { }
    }
}

export { UnityEngine_Physics_Impl }