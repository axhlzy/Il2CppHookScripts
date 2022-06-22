import { ComponentImpl } from "../class";

class TransformImpl extends ComponentImpl implements Il2cppTransform {

    constructor(handle: NativePointerValue) {
        super(handle)
    }

    ctor_0(): Il2Cpp.Transform {
        return new TransformImpl(Il2Cpp.Api.Transform._ctor(alloc()));
    }

    GetChild(index: number): Il2Cpp.Transform {
        return new TransformImpl(Il2Cpp.Api.Transform._GetChild(this.handle, index));
    }

    GetEnumerator() {
        throw new Error("Method not implemented.");
    }

    GetParent(): Il2Cpp.Transform {
        return new TransformImpl(Il2Cpp.Api.Transform._get_parent(this.handle));
    }

    GetSiblingIndex(): number {
        throw new Error("Method not implemented.");
    }

    InverseTransformDirection(direction: Il2Cpp.Vector3): Il2Cpp.Vector3 {
        throw new Error("Method not implemented.");
    }

    InverseTransformPoint(position: Il2Cpp.Vector3): Il2Cpp.Vector3 {
        throw new Error("Method not implemented.");
    }

    InverseTransformVector(vector: Il2Cpp.Vector3): Il2Cpp.Vector3 {
        throw new Error("Method not implemented.");
    }

    IsChildOf(parent: Il2Cpp.Transform): boolean {
        return Il2Cpp.Api.Transform._IsChildOf(this.handle, parent.handle);
    }

    // LookAt(target: Il2Cpp.Transform): void;
    // LookAt(target: Il2Cpp.Vector3): void;
    // LookAt(target: Il2Cpp.Transform, worldUp: Il2Cpp.Vector3): void;
    // LookAt(target: Il2Cpp.Vector3, worldUp: Il2Cpp.Vector3): void;
    // LookAt(target: unknown, worldUp?: unknown): void {
    //     throw new Error("Method not implemented.");
    // }
    // Rotate(eulerAngles: Il2Cpp.Vector3): void;
    // Rotate(eulerAngles: Il2Cpp.Vector3, relativeTo: Il2Cpp.Space): void;
    // Rotate(axis: Il2Cpp.Vector3, angle: number): void;
    // Rotate(axis: Il2Cpp.Vector3, angle: number, relativeTo: Il2Cpp.Space): void;
    // Rotate(x: number, y: number, z: number, relativeTo: Il2Cpp.Space): void;
    // Rotate(x: unknown, y?: unknown, z?: unknown, relativeTo?: unknown): void {
    //     throw new Error("Method not implemented.");
    // }
    RotateAround(point: Il2Cpp.Vector3, axis: Il2Cpp.Vector3, angle: number): void {
        throw new Error("Method not implemented.");
    }

    SetAsFirstSibling(): void {
        throw new Error("Method not implemented.");
    }

    SetAsLastSibling(): void {
        throw new Error("Method not implemented.");
    }

    // SetParent(parent: Il2Cpp.Transform): void;
    // SetParent(parent: Il2Cpp.Transform, worldPositionStays: boolean): void;
    // SetParent(parent: unknown, worldPositionStays?: unknown): void {
    //     throw new Error("Method not implemented.");
    // }
    SetPositionAndRotation(position: Il2Cpp.Vector3, rotation: Il2Cpp.Quaternion): void {
        throw new Error("Method not implemented.");
    }

    SetSiblingIndex(index: number): void {
        throw new Error("Method not implemented.");
    }

    TransformDirection(direction: Il2Cpp.Vector3): Il2Cpp.Vector3;
    TransformDirection(x: number, y: number, z: number): Il2Cpp.Vector3;
    TransformDirection(x: unknown, y?: unknown, z?: unknown): Il2Cpp.Vector3 {
        throw new Error("Method not implemented.");
    }

    TransformPoint(position: Il2Cpp.Vector3): Il2Cpp.Vector3 {
        throw new Error("Method not implemented.");
    }

    TransformVector(vector: Il2Cpp.Vector3): Il2Cpp.Vector3 {
        throw new Error("Method not implemented.");
    }

    Translate(translation: Il2Cpp.Vector3): void;
    Translate(translation: Il2Cpp.Vector3, relativeTo: Il2Cpp.Space): void;
    Translate(x: number, y: number, z: number, relativeTo: Il2Cpp.Space): void;
    Translate(x: unknown, y?: unknown, z?: unknown, relativeTo?: unknown): void {
        throw new Error("Method not implemented.");
    }

    get_childCount(): number {
        return Il2Cpp.Api.Transform._get_childCount(this.handle);
    }

    get_eulerAngles(): Il2Cpp.Vector3 {
        return Il2Cpp.Api.Transform._get_eulerAngles(this.handle);
    }

    set_eulerAngles(value: Il2Cpp.Vector3): void {
        throw new Error("Method not implemented.");
    }

    get_forward(): Il2Cpp.Vector3 {
        return Il2Cpp.Api.Transform._get_forward(this.handle);
    }

    set_hasChanged(value: boolean): void {
        throw new Error("Method not implemented.");
    }

    get_hasChanged(): boolean {
        throw new Error("Method not implemented.");
    }

    get_localEulerAngles(): Il2Cpp.Vector3 {
        return new Il2Cpp.Vector3(Il2Cpp.Api.Transform._get_localEulerAngles(this.handle));
    }

    set_localEulerAngles(value: Il2Cpp.Vector3): void {
        return Il2Cpp.Api.Transform._set_localEulerAngles(this.handle, value);
    }

    get_localPosition(): Il2Cpp.Vector3 {
        return new Il2Cpp.Vector3(Il2Cpp.Api.Transform._get_localPosition(this.handle));
    }

    set_localPosition(value: Il2Cpp.Vector3): void {
        return Il2Cpp.Api.Transform._set_localPosition(this.handle, value.handle);
    }

    get_localRotation(): Il2Cpp.Quaternion {
        return new Il2Cpp.Quaternion(Il2Cpp.Api.Transform._get_localRotation(this.handle))
    }

    set_localRotation(value: Il2Cpp.Quaternion): void {
        return Il2Cpp.Api.Transform._set_localRotation(this.handle, value.handle);
    }

    get_localScale(): Il2Cpp.Vector3 {
        return new Il2Cpp.Vector3(Il2Cpp.Api.Transform._get_localScale(this.handle));
    }

    set_localScale(value: Il2Cpp.Vector3): void {
        return Il2Cpp.Api.Transform._set_localScale(this.handle, value.handle);
    }

    get_lossyScale(): Il2Cpp.Vector3 {
        throw new Error("Method not implemented.");
    }

    get_parent(): Il2Cpp.Transform {
        if (this.handle == ptr(0)) return new Il2Cpp.Transform(ptr(0));
        return new Il2Cpp.Transform(Il2Cpp.Api.Transform._get_parent(this.handle));
    }

    set_parent(value: Il2Cpp.Transform): void {
        return Il2Cpp.Api.Transform._set_parent(this.handle, value.handle);
    }

    get_position(): Il2Cpp.Vector3 {
        return new Il2Cpp.Vector3(Il2Cpp.Api.Transform._get_position(this.handle));
    }

    set_position(value: Il2Cpp.Vector3): void {
        return Il2Cpp.Api.Transform._set_position(this.handle, value.handle);
    }

    get_right(): Il2Cpp.Vector3 {
        throw new Error("Method not implemented.");
    }

    get_rotation(): Il2Cpp.Quaternion {
        return new Il2Cpp.Quaternion(Il2Cpp.Api.Transform._get_rotation(this.handle));
    }

    set_rotation(value: Il2Cpp.Quaternion): void {
        return Il2Cpp.Api.Transform._set_rotation(this.handle, value.handle);
    }

    get_up(): Il2Cpp.Vector3 {
        return new Il2Cpp.Vector3(Il2Cpp.Api.Transform._get_up(this.handle));
    }

    set_up(value: Il2Cpp.Vector3): void {
        throw new Error("Method not implemented.");
    }
}

declare global {
    namespace Il2Cpp {
        class Transform extends TransformImpl { }
    }
}

Il2Cpp.Transform = TransformImpl;

export { }