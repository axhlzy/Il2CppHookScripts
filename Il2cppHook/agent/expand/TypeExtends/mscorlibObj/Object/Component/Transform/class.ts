import { UnityEngine_Matrix4x4_Impl as Matrix4x4 } from "../../../ValueType/Matrix4x4/class"
import { UnityEngine_Quaternion_Impl as Quaternion } from "../../../ValueType/Quaternion/class"
import { UnityEngine_Vector3_Impl as Vector3 } from "../../../ValueType/Vector3/class"
import { UnityEngine_Component_Impl } from "../class"

type UnityEngine_Space = NativePointer
type System_Single = NativePointer
class UnityEngine_Transform_Impl extends UnityEngine_Component_Impl {

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    _ctor(): void {
        return Il2Cpp.Api.Transform.__ctor(alloc())
    }

    get_position(): Vector3 {
        return new Vector3(Il2Cpp.Api.Transform._get_position(this.handle))
    }

    set_position(value: Vector3): void {
        return Il2Cpp.Api.Transform._set_position(this.handle, value.handle)
    }

    get_localPosition(): Vector3 {
        return new Vector3(Il2Cpp.Api.Transform._get_localPosition(this.handle))
    }

    set_localPosition(value: Vector3): void {
        return Il2Cpp.Api.Transform._set_localPosition(this.handle, value.handle)
    }

    get_eulerAngles(): Vector3 {
        return new Vector3(Il2Cpp.Api.Transform._get_eulerAngles(this.handle))
    }

    set_eulerAngles(value: Vector3): void {
        return Il2Cpp.Api.Transform._set_eulerAngles(this.handle, value.handle)
    }

    get_localEulerAngles(): Vector3 {
        return new Vector3(Il2Cpp.Api.Transform._get_localEulerAngles(this.handle))
    }

    get_up(): Vector3 {
        return new Vector3(Il2Cpp.Api.Transform._get_up(this.handle))
    }

    get_forward(): Vector3 {
        return new Vector3(Il2Cpp.Api.Transform._get_forward(this.handle))
    }

    set_forward(value: Vector3): void {
        return Il2Cpp.Api.Transform._set_forward(this.handle, value.handle)
    }

    get_rotation(): Quaternion {
        return new Quaternion(Il2Cpp.Api.Transform._get_rotation(this.handle))
    }

    set_rotation(value: Quaternion): void {
        return Il2Cpp.Api.Transform._set_rotation(this.handle, value.handle)
    }

    get_localRotation(): Quaternion {
        return new Quaternion(Il2Cpp.Api.Transform._get_localRotation(this.handle))
    }

    set_localRotation(value: Quaternion): void {
        return Il2Cpp.Api.Transform._set_localRotation(this.handle, value.handle)
    }

    get_localScale(): Vector3 {
        return new Vector3(Il2Cpp.Api.Transform._get_localScale(this.handle))
    }

    set_localScale(value: Vector3): void {
        return Il2Cpp.Api.Transform._set_localScale(this.handle, value.handle)
    }

    get_parent(): UnityEngine_Transform_Impl {
        return new UnityEngine_Transform_Impl(Il2Cpp.Api.Transform._get_parent(this.handle))
    }

    set_parent(value: UnityEngine_Transform_Impl): void {
        return Il2Cpp.Api.Transform._set_parent(this.handle, value.handle)
    }

    get_parentInternal(): UnityEngine_Transform_Impl {
        return new UnityEngine_Transform_Impl(Il2Cpp.Api.Transform._get_parentInternal(this.handle))
    }

    set_parentInternal(value: UnityEngine_Transform_Impl): void {
        return Il2Cpp.Api.Transform._set_parentInternal(this.handle, value.handle)
    }

    GetParent(): UnityEngine_Transform_Impl {
        return new UnityEngine_Transform_Impl(Il2Cpp.Api.Transform._GetParent(this.handle))
    }

    SetParent(p: UnityEngine_Transform_Impl): void {
        return Il2Cpp.Api.Transform._SetParent(this.handle, p.handle)
    }

    SetParent_2(parent: UnityEngine_Transform_Impl, worldPositionStays: boolean): void {
        return Il2Cpp.Api.Transform._SetParent(this.handle, parent.handle, worldPositionStays)
    }

    get_worldToLocalMatrix(): Matrix4x4 {
        return new Matrix4x4(Il2Cpp.Api.Transform._get_worldToLocalMatrix(this.handle))
    }

    get_localToWorldMatrix(): Matrix4x4 {
        return new Matrix4x4(Il2Cpp.Api.Transform._get_localToWorldMatrix(this.handle))
    }

    SetPositionAndRotation(position: Vector3, rotation: Quaternion): void {
        return Il2Cpp.Api.Transform._SetPositionAndRotation(this.handle, position.handle, rotation.handle)
    }

    Translate(translation: Vector3, relativeTo: UnityEngine_Space): void {
        return Il2Cpp.Api.Transform._Translate(this.handle, translation.handle, relativeTo)
    }

    Rotate(eulers: Vector3, relativeTo: UnityEngine_Space): void {
        return Il2Cpp.Api.Transform._Rotate(this.handle, eulers.handle, relativeTo)
    }

    Rotate_1(eulers: Vector3): void {
        return Il2Cpp.Api.Transform._Rotate(this.handle, eulers.handle)
    }

    Rotate_3(xAngle: number, yAngle: System_Single, zAngle: System_Single): void {
        return Il2Cpp.Api.Transform._Rotate(this.handle, xAngle, yAngle, zAngle)
    }

    RotateAroundInternal(axis: Vector3, angle: number): void {
        return Il2Cpp.Api.Transform._RotateAroundInternal(this.handle, axis.handle, angle)
    }

    RotateAround(point: Vector3, axis: Vector3, angle: number): void {
        return Il2Cpp.Api.Transform._RotateAround(this.handle, point.handle, axis.handle, angle)
    }

    LookAt(target: UnityEngine_Transform_Impl): void {
        return Il2Cpp.Api.Transform._LookAt(this.handle, target.handle)
    }

    LookAt_2(worldPosition: Vector3, worldUp: Vector3): void {
        return Il2Cpp.Api.Transform._LookAt(this.handle, worldPosition.handle, worldUp.handle)
    }

    LookAt_1(worldPosition: Vector3): void {
        return Il2Cpp.Api.Transform._LookAt(this.handle, worldPosition.handle)
    }

    Internal_LookAt(worldPosition: Vector3, worldUp: Vector3): void {
        return Il2Cpp.Api.Transform._Internal_LookAt(this.handle, worldPosition.handle, worldUp.handle)
    }

    TransformDirection(direction: Vector3): Vector3 {
        return new Vector3(Il2Cpp.Api.Transform._TransformDirection(this.handle, direction.handle))
    }

    TransformDirection_3(x: number, y: System_Single, z: System_Single): Vector3 {
        return new Vector3(Il2Cpp.Api.Transform._TransformDirection(this.handle, x, y, z))
    }

    InverseTransformDirection(direction: Vector3): Vector3 {
        return new Vector3(Il2Cpp.Api.Transform._InverseTransformDirection(this.handle, direction))
    }

    TransformVector(vector: Vector3): Vector3 {
        return new Vector3(Il2Cpp.Api.Transform._TransformVector(this.handle, vector.handle))
    }

    InverseTransformVector(vector: Vector3): Vector3 {
        return new Vector3(Il2Cpp.Api.Transform._InverseTransformVector(this.handle, vector.handle))
    }

    TransformPoint(position: Vector3): Vector3 {
        return new Vector3(Il2Cpp.Api.Transform._TransformPoint(this.handle, position.handle))
    }

    InverseTransformPoint(position: Vector3): Vector3 {
        return new Vector3(Il2Cpp.Api.Transform._InverseTransformPoint(this.handle, position.handle))
    }

    get_childCount(): number {
        try {
            return Il2Cpp.Api.Transform._get_childCount(this.handle)
        } catch (error) {
            return Il2Cpp.Api.Transform._GetChildCount(this.handle)
        }
    }

    get childCount(): number {
        return this.get_childCount()
    }

    SetAsFirstSibling(): void {
        return Il2Cpp.Api.Transform._SetAsFirstSibling(this.handle)
    }

    static FindRelativeTransformWithPath(transform: UnityEngine_Transform_Impl, path: string, isActiveOnly: boolean): UnityEngine_Transform_Impl {
        return new UnityEngine_Transform_Impl(Il2Cpp.Api.Transform._FindRelativeTransformWithPath(transform, path, isActiveOnly))
    }

    Find(name: string): UnityEngine_Transform_Impl {
        return new UnityEngine_Transform_Impl(Il2Cpp.Api.Transform._Find(this.handle, allocUStr(name)))
    }

    get_lossyScale(): Vector3 {
        return new Vector3(Il2Cpp.Api.Transform._get_lossyScale(this.handle))
    }

    IsChildOf(parent: UnityEngine_Transform_Impl): boolean {
        return !Il2Cpp.Api.Transform._IsChildOf(this.handle, parent.handle).isNull()
    }

    set_hasChanged(value: boolean): void {
        return Il2Cpp.Api.Transform._set_hasChanged(this.handle, value)
    }

    // GetEnumerator(): System_Collections.IEnumerator {
    //     return Il2Cpp.Api.Transform._GetEnumerator(this.handle)
    // }

    GetChild(index: number): UnityEngine_Transform_Impl {
        return new UnityEngine_Transform_Impl(Il2Cpp.Api.Transform._GetChild(this.handle, index))
    }

    get_position_Injected(ret: Vector3): void {
        return Il2Cpp.Api.Transform._get_position_Injected(this.handle, ret.handle)
    }

    set_position_Injected(value: Vector3): void {
        return Il2Cpp.Api.Transform._set_position_Injected(this.handle, value.handle)
    }

    get_localPosition_Injected(ret: Vector3): void {
        return Il2Cpp.Api.Transform._get_localPosition_Injected(this.handle, ret.handle)
    }

    set_localPosition_Injected(value: Vector3): void {
        return Il2Cpp.Api.Transform._set_localPosition_Injected(this.handle, value.handle)
    }

    get_rotation_Injected(ret: Quaternion): void {
        return Il2Cpp.Api.Transform._get_rotation_Injected(this.handle, ret.handle)
    }

    set_rotation_Injected(value: Quaternion): void {
        return Il2Cpp.Api.Transform._set_rotation_Injected(this.handle, value.handle)
    }

    get_localRotation_Injected(ret: Quaternion): void {
        return Il2Cpp.Api.Transform._get_localRotation_Injected(this.handle, ret.handle)
    }

    set_localRotation_Injected(value: Quaternion): void {
        return Il2Cpp.Api.Transform._set_localRotation_Injected(this.handle, value.handle)
    }

    get_localScale_Injected(ret: Vector3): void {
        return Il2Cpp.Api.Transform._get_localScale_Injected(this.handle, ret.handle)
    }

    set_localScale_Injected(value: Vector3): void {
        return Il2Cpp.Api.Transform._set_localScale_Injected(this.handle, value.handle)
    }

    get_worldToLocalMatrix_Injected(ret: Matrix4x4): void {
        return Il2Cpp.Api.Transform._get_worldToLocalMatrix_Injected(this.handle, ret.handle)
    }

    get_localToWorldMatrix_Injected(ret: Matrix4x4): void {
        return Il2Cpp.Api.Transform._get_localToWorldMatrix_Injected(this.handle, ret.handle)
    }

    SetPositionAndRotation_Injected(position: Vector3, rotation: Quaternion): void {
        return Il2Cpp.Api.Transform._SetPositionAndRotation_Injected(this.handle, position.handle, rotation.handle)
    }

    RotateAroundInternal_Injected(axis: Vector3, angle: number): void {
        return Il2Cpp.Api.Transform._RotateAroundInternal_Injected(this.handle, axis.handle, angle)
    }

    Internal_LookAt_Injected(worldPosition: Vector3, worldUp: Vector3): void {
        return Il2Cpp.Api.Transform._Internal_LookAt_Injected(this.handle, worldPosition.handle, worldUp.handle)
    }

    TransformDirection_Injected(direction: Vector3, ret: Vector3): void {
        return Il2Cpp.Api.Transform._TransformDirection_Injected(this.handle, direction.handle, ret.handle)
    }

    InverseTransformDirection_Injected(direction: Vector3, ret: Vector3): void {
        return Il2Cpp.Api.Transform._InverseTransformDirection_Injected(this.handle, direction.handle, ret.handle)
    }

    TransformVector_Injected(vector: Vector3, ret: Vector3): void {
        return Il2Cpp.Api.Transform._TransformVector_Injected(this.handle, vector.handle, ret.handle)
    }

    InverseTransformVector_Injected(vector: Vector3, ret: Vector3): void {
        return Il2Cpp.Api.Transform._InverseTransformVector_Injected(this.handle, vector.handle, ret.handle)
    }

    TransformPoint_Injected(position: Vector3, ret: Vector3): void {
        return Il2Cpp.Api.Transform._TransformPoint_Injected(this.handle, position.handle, ret.handle)
    }

    InverseTransformPoint_Injected(position: Vector3, ret: Vector3): void {
        return Il2Cpp.Api.Transform._InverseTransformPoint_Injected(this.handle, position.handle, ret.handle)
    }

    get_lossyScale_Injected(ret: Vector3): void {
        return Il2Cpp.Api.Transform._get_lossyScale_Injected(this.handle, ret.handle)
    }

    forEach(callback: (item: Il2Cpp.Transform, index: number) => void): void {
        if (this.childCount == 0) LOGE(`Transform.forEach: childCount = ${this.childCount}`)
        for (let i = 0; i < this.childCount; i++) {
            try {
                callback(this.GetChild(i), i)
            } catch (error) {
                LOGE(error)
            }
        }
    }

    toString(): string {
        if (this.handle.isNull()) return "null"
        return `${new Il2Cpp.Object(this).toString()}`
    }
}

Il2Cpp.Transform = UnityEngine_Transform_Impl

declare global {
    namespace Il2Cpp {
        class Transform extends UnityEngine_Transform_Impl { }
    }
}

export { UnityEngine_Transform_Impl }