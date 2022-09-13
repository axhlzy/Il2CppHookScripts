import { mscorlib_System_Object_impl as System_Object_Impl } from "../class"
import { UnityEngine_Quaternion_Impl as UnityEngine_Quaternion } from "../ValueType/Quaternion/class"
import { UnityEngine_Ray_Impl as Ray } from "../ValueType/Ray/class"
import { UnityEngine_RaycastHit_Impl as RaycastHit } from "../ValueType/RaycastHit/class"
import { UnityEngine_Vector3_Impl as Vector3 } from "../ValueType/Vector3/class"

type UnityEngine_PhysicsScene = NativePointer
type UnityEngine_Collider = NativePointer
type UnityEngine_QueryTriggerInteraction = NativePointer

class UnityEngine_Physics_Impl extends System_Object_Impl {

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    static get_gravity(): Vector3 {
        return Il2Cpp.Api.Physics._get_gravity()
    }

    static set_gravity(value: Vector3): void {
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

    static Raycast(origin: Vector3, direction: Vector3, maxDistance: number, layerMask: number, queryTriggerInteraction: UnityEngine_QueryTriggerInteraction): boolean {
        return Il2Cpp.Api.Physics._Raycast(origin, direction, maxDistance, layerMask, queryTriggerInteraction)
    }

    static Raycast_4(origin: Vector3, direction: Vector3, maxDistance: number, layerMask: number): boolean {
        return Il2Cpp.Api.Physics._Raycast(origin, direction, maxDistance, layerMask)
    }

    static Raycast_3(origin: Vector3, direction: Vector3, maxDistance: number): boolean {
        return Il2Cpp.Api.Physics._Raycast(origin, direction, maxDistance)
    }

    static Raycast_2(origin: Vector3, direction: Vector3): boolean {
        return Il2Cpp.Api.Physics._Raycast(origin, direction)
    }

    static Raycast_6(origin: Vector3, direction: Vector3, hitInfo: RaycastHit, maxDistance: number, layerMask: number, queryTriggerInteraction: UnityEngine_QueryTriggerInteraction): boolean {
        return Il2Cpp.Api.Physics._Raycast(origin, direction, hitInfo, maxDistance, layerMask, queryTriggerInteraction)
    }

    static Raycast_v3_dir_hit_max_layer(origin: Vector3, direction: Vector3, hitInfo: RaycastHit, maxDistance: number, layerMask: number): boolean {
        return Il2Cpp.Api.Physics._Raycast(origin, direction, hitInfo, maxDistance, layerMask)
    }

    static Raycast_org_v3_hit_dis(origin: Vector3, direction: Vector3, hitInfo: RaycastHit, maxDistance: number): boolean {
        return Il2Cpp.Api.Physics._Raycast(origin, direction, hitInfo, maxDistance)
    }

    static Raycast_v3_v3_hit(origin: Vector3, direction: Vector3, hitInfo: RaycastHit): boolean {
        return Il2Cpp.Api.Physics._Raycast(origin, direction, hitInfo)
    }

    static Raycast_ray_num_num_query(ray: Ray, maxDistance: number, layerMask: number, queryTriggerInteraction: UnityEngine_QueryTriggerInteraction): boolean {
        return Il2Cpp.Api.Physics._Raycast(ray, maxDistance, layerMask, queryTriggerInteraction)
    }

    static Raycast_ray_num_num(ray: Ray, maxDistance: number, layerMask: number): boolean {
        return Il2Cpp.Api.Physics._Raycast(ray, maxDistance, layerMask)
    }

    static Raycast_ray_num(ray: Ray, maxDistance: number): boolean {
        return Il2Cpp.Api.Physics._Raycast(ray, maxDistance)
    }

    static Raycast_ray(ray: Ray): boolean {
        return Il2Cpp.Api.Physics._Raycast(ray)
    }

    static Raycast_5(ray: Ray, hitInfo: RaycastHit, maxDistance: number, layerMask: number, queryTriggerInteraction: UnityEngine_QueryTriggerInteraction): boolean {
        return Il2Cpp.Api.Physics._Raycast(ray, hitInfo, maxDistance, layerMask, queryTriggerInteraction)
    }

    static Raycast_Ray_RaycastHit_Int32_layerMask(ray: Ray, hitInfo: RaycastHit, maxDistance: number, layerMask: number): boolean {
        return Il2Cpp.Api.Physics._Raycast(ray, hitInfo, maxDistance, layerMask)
    }

    static Raycast_Ray_RaycastHit_Int32(ray: Ray, hitInfo: RaycastHit, maxDistance: number): boolean {
        return Il2Cpp.Api.Physics._Raycast(ray, hitInfo, maxDistance)
    }

    static Raycast_Ray_RaycastHit(ray: Ray, hitInfo: RaycastHit): boolean {
        return Il2Cpp.Api.Physics._Raycast(ray, hitInfo)
    }

    static Linecast(start: Vector3, end: Vector3, hitInfo: RaycastHit, layerMask: number, queryTriggerInteraction: UnityEngine_QueryTriggerInteraction): boolean {
        return Il2Cpp.Api.Physics._Linecast(start, end, hitInfo, layerMask, queryTriggerInteraction)
    }

    static Linecast_3(start: Vector3, end: Vector3, hitInfo: RaycastHit): boolean {
        return Il2Cpp.Api.Physics._Linecast(start, end, hitInfo)
    }

    static SphereCast(origin: Vector3, radius: number, direction: Vector3, hitInfo: RaycastHit, maxDistance: number, layerMask: number, queryTriggerInteraction: UnityEngine_QueryTriggerInteraction): boolean {
        return Il2Cpp.Api.Physics._SphereCast(origin, radius, direction, hitInfo, maxDistance, layerMask, queryTriggerInteraction)
    }

    static SphereCast_v3_num_v3_hit_num(origin: Vector3, radius: number, direction: Vector3, hitInfo: RaycastHit, maxDistance: number): boolean {
        return Il2Cpp.Api.Physics._SphereCast(origin, radius, direction, hitInfo, maxDistance)
    }

    static SphereCast_4(origin: Vector3, radius: number, direction: Vector3, hitInfo: RaycastHit): boolean {
        return Il2Cpp.Api.Physics._SphereCast(origin, radius, direction, hitInfo)
    }

    static SphereCast_6(ray: Ray, radius: number, hitInfo: RaycastHit, maxDistance: number, layerMask: number, queryTriggerInteraction: UnityEngine_QueryTriggerInteraction): boolean {
        return Il2Cpp.Api.Physics._SphereCast(ray, radius, hitInfo, maxDistance, layerMask, queryTriggerInteraction)
    }

    static SphereCast_5(ray: Ray, radius: number, hitInfo: RaycastHit, maxDistance: number, layerMask: number): boolean {
        return Il2Cpp.Api.Physics._SphereCast(ray, radius, hitInfo, maxDistance, layerMask)
    }

    static BoxCast(center: Vector3, halfExtents: Vector3, direction: Vector3, hitInfo: RaycastHit, orientation: UnityEngine_Quaternion, maxDistance: number, layerMask: number, queryTriggerInteraction: UnityEngine_QueryTriggerInteraction): boolean {
        return Il2Cpp.Api.Physics._BoxCast(center, halfExtents, direction, hitInfo, orientation, maxDistance, layerMask, queryTriggerInteraction)
    }

    static BoxCast_7(center: Vector3, halfExtents: Vector3, direction: Vector3, hitInfo: RaycastHit, orientation: UnityEngine_Quaternion, maxDistance: number, layerMask: number): boolean {
        return Il2Cpp.Api.Physics._BoxCast(center, halfExtents, direction, hitInfo, orientation, maxDistance, layerMask)
    }

    static Internal_RaycastAll(physicsScene: UnityEngine_PhysicsScene, ray: Ray, maxDistance: number, mask: number, queryTriggerInteraction: UnityEngine_QueryTriggerInteraction): RaycastHit[] {
        return Il2Cpp.Api.Physics._Internal_RaycastAll(physicsScene, ray, maxDistance, mask, queryTriggerInteraction)
    }

    static RaycastAll(origin: Vector3, direction: Vector3, maxDistance: number, layerMask: number, queryTriggerInteraction: UnityEngine_QueryTriggerInteraction): RaycastHit[] {
        return Il2Cpp.Api.Physics._RaycastAll(origin, direction, maxDistance, layerMask, queryTriggerInteraction)
    }

    static RaycastAll_4_1(origin: Vector3, direction: Vector3, maxDistance: number, layerMask: number): RaycastHit[] {
        return Il2Cpp.Api.Physics._RaycastAll(origin, direction, maxDistance, layerMask)
    }

    static RaycastAll_3_1(origin: Vector3, direction: Vector3, maxDistance: number): RaycastHit[] {
        return Il2Cpp.Api.Physics._RaycastAll(origin, direction, maxDistance)
    }

    static RaycastAll_2_1(origin: Vector3, direction: Vector3): RaycastHit[] {
        return Il2Cpp.Api.Physics._RaycastAll(origin, direction)
    }

    static RaycastAll_4(ray: Ray, maxDistance: number, layerMask: number, queryTriggerInteraction: UnityEngine_QueryTriggerInteraction): RaycastHit[] {
        return Il2Cpp.Api.Physics._RaycastAll(ray, maxDistance, layerMask, queryTriggerInteraction)
    }

    static RaycastAll_3(ray: Ray, maxDistance: number, layerMask: number): RaycastHit[] {
        return Il2Cpp.Api.Physics._RaycastAll(ray, maxDistance, layerMask)
    }

    static RaycastAll_2_2(ray: Ray, maxDistance: number): RaycastHit[] {
        return Il2Cpp.Api.Physics._RaycastAll(ray, maxDistance)
    }

    static RaycastAll_1(ray: Ray): RaycastHit[] {
        return Il2Cpp.Api.Physics._RaycastAll(ray)
    }

    static RaycastNonAlloc(ray: Ray, results: RaycastHit[], maxDistance: number, layerMask: number, queryTriggerInteraction: UnityEngine_QueryTriggerInteraction): number {
        return Il2Cpp.Api.Physics._RaycastNonAlloc(ray, results, maxDistance, layerMask, queryTriggerInteraction)
    }

    static RaycastNonAlloc_4_1(ray: Ray, results: RaycastHit[], maxDistance: number, layerMask: number): number {
        return Il2Cpp.Api.Physics._RaycastNonAlloc(ray, results, maxDistance, layerMask)
    }

    static RaycastNonAlloc_3_1(ray: Ray, results: RaycastHit[], maxDistance: number): number {
        return Il2Cpp.Api.Physics._RaycastNonAlloc(ray, results, maxDistance)
    }

    static RaycastNonAlloc_2(ray: Ray, results: RaycastHit[]): number {
        return Il2Cpp.Api.Physics._RaycastNonAlloc(ray, results)
    }

    static RaycastNonAlloc_6(origin: Vector3, direction: Vector3, results: RaycastHit[], maxDistance: number, layerMask: number, queryTriggerInteraction: UnityEngine_QueryTriggerInteraction): number {
        return Il2Cpp.Api.Physics._RaycastNonAlloc(origin, direction, results, maxDistance, layerMask, queryTriggerInteraction)
    }

    static RaycastNonAlloc_5(origin: Vector3, direction: Vector3, results: RaycastHit[], maxDistance: number, layerMask: number): number {
        return Il2Cpp.Api.Physics._RaycastNonAlloc(origin, direction, results, maxDistance, layerMask)
    }

    static RaycastNonAlloc_4(origin: Vector3, direction: Vector3, results: RaycastHit[], maxDistance: number): number {
        return Il2Cpp.Api.Physics._RaycastNonAlloc(origin, direction, results, maxDistance)
    }

    static RaycastNonAlloc_3(origin: Vector3, direction: Vector3, results: RaycastHit[]): number {
        return Il2Cpp.Api.Physics._RaycastNonAlloc(origin, direction, results)
    }

    static Query_ComputePenetration(colliderA: UnityEngine_Collider, positionA: Vector3, rotationA: UnityEngine_Quaternion, colliderB: UnityEngine_Collider, positionB: Vector3, rotationB: UnityEngine_Quaternion, direction: Vector3, distance: number): boolean {
        return Il2Cpp.Api.Physics._Query_ComputePenetration(colliderA, positionA, rotationA, colliderB, positionB, rotationB, direction, distance)
    }

    static ComputePenetration(colliderA: UnityEngine_Collider, positionA: Vector3, rotationA: UnityEngine_Quaternion, colliderB: UnityEngine_Collider, positionB: Vector3, rotationB: UnityEngine_Quaternion, direction: Vector3, distance: number): boolean {
        return Il2Cpp.Api.Physics._ComputePenetration(colliderA, positionA, rotationA, colliderB, positionB, rotationB, direction, distance)
    }

    static OverlapSphereNonAlloc(position: Vector3, radius: number, results: UnityEngine_Collider[], layerMask: number, queryTriggerInteraction: UnityEngine_QueryTriggerInteraction): number {
        return Il2Cpp.Api.Physics._OverlapSphereNonAlloc(position, radius, results, layerMask, queryTriggerInteraction)
    }

    static SphereCastNonAlloc(origin: Vector3, radius: number, direction: Vector3, results: RaycastHit[], maxDistance: number, layerMask: number, queryTriggerInteraction: UnityEngine_QueryTriggerInteraction): number {
        return Il2Cpp.Api.Physics._SphereCastNonAlloc(origin, radius, direction, results, maxDistance, layerMask, queryTriggerInteraction)
    }

    static get_gravity_Injected(ret: Vector3): void {
        return Il2Cpp.Api.Physics._get_gravity_Injected(ret)
    }

    static set_gravity_Injected(value: Vector3): void {
        return Il2Cpp.Api.Physics._set_gravity_Injected(value)
    }

    static get_defaultPhysicsScene_Injected(ret: UnityEngine_PhysicsScene): void {
        return Il2Cpp.Api.Physics._get_defaultPhysicsScene_Injected(ret)
    }

    static Internal_RaycastAll_Injected(physicsScene: UnityEngine_PhysicsScene, ray: Ray, maxDistance: number, mask: number, queryTriggerInteraction: UnityEngine_QueryTriggerInteraction): RaycastHit[] {
        return Il2Cpp.Api.Physics._Internal_RaycastAll_Injected(physicsScene, ray, maxDistance, mask, queryTriggerInteraction)
    }

    static Query_ComputePenetration_Injected(colliderA: UnityEngine_Collider, positionA: Vector3, rotationA: UnityEngine_Quaternion, colliderB: UnityEngine_Collider, positionB: Vector3, rotationB: UnityEngine_Quaternion, direction: Vector3, distance: number): boolean {
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