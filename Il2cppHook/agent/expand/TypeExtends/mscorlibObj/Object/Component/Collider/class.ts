import { UnityEngine_Ray_Impl as Ray } from "../../../ValueType/Ray/class"
import { UnityEngine_Vector3_Impl as Vector3 } from "../../../ValueType/Vector3/class"
import { UnityEngine_Component_Impl } from "../class"

type UnityEngine_Rigidbody = NativePointer
type UnityEngine_RaycastHit = NativePointer
type UnityEngine_Bounds = NativePointer

class UnityEngine_Collider_Impl extends UnityEngine_Component_Impl {

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }
    get_enabled(): boolean {
        return Il2Cpp.Api.Collider._get_enabled(this.handle)
    }

    set_enabled(value: boolean): void {
        return Il2Cpp.Api.Collider._set_enabled(this.handle, value)
    }

    get_attachedRigidbody(): UnityEngine_Rigidbody {
        return Il2Cpp.Api.Collider._get_attachedRigidbody(this.handle)
    }

    set_isTrigger(value: boolean): void {
        return Il2Cpp.Api.Collider._set_isTrigger(this.handle, value)
    }

    ClosestPoint(position: Vector3): Vector3 {
        return Il2Cpp.Api.Collider._ClosestPoint(this.handle, position)
    }

    get_bounds(): UnityEngine_Bounds {
        return Il2Cpp.Api.Collider._get_bounds(this.handle)
    }

    Raycast(ray: Ray, maxDistance: number, hasHit: boolean): UnityEngine_RaycastHit {
        return Il2Cpp.Api.Collider._Raycast(this.handle, ray, maxDistance, hasHit)
    }

    Raycast_3(ray: Ray, hitInfo: UnityEngine_RaycastHit, maxDistance: number): boolean {
        return Il2Cpp.Api.Collider._Raycast(this.handle, ray, hitInfo, maxDistance)
    }

    ClosestPoint_Injected(position: Vector3, ret: Vector3): void {
        return Il2Cpp.Api.Collider._ClosestPoint_Injected(this.handle, position, ret)
    }

    get_bounds_Injected(ret: UnityEngine_Bounds): void {
        return Il2Cpp.Api.Collider._get_bounds_Injected(this.handle, ret)
    }

    Raycast_Injected(ray: Ray, maxDistance: number, hasHit: boolean, ret: UnityEngine_RaycastHit): void {
        return Il2Cpp.Api.Collider._Raycast_Injected(this.handle, ray, maxDistance, hasHit, ret)
    }
}

Il2Cpp.Collider = UnityEngine_Collider_Impl

declare global {
    namespace Il2Cpp {
        class Collider extends UnityEngine_Collider_Impl { }
    }
}

export { UnityEngine_Collider_Impl }