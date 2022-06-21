interface Il2cppTransform {

    // Find(String) : Transform
    ctor_0(): Il2Cpp.Transform;

    // GetChild(Int32) : Transform
    GetChild(index: number): Il2Cpp.Transform;

    // GetEnumerator() : IEnumerator
    GetEnumerator(): any;

    // GetParent() : Transform
    GetParent(): Il2Cpp.Transform;

    // GetSiblingIndex() : Int32
    GetSiblingIndex(): number;

    // InverseTransformDirection(Vector3) : Vector3
    InverseTransformDirection(direction: Il2Cpp.Vector3): Il2Cpp.Vector3;

    // InverseTransformPoint(Vector3) : Vector3
    InverseTransformPoint(position: Il2Cpp.Vector3): Il2Cpp.Vector3;

    // InverseTransformVector(Vector3) : Vector3
    InverseTransformVector(vector: Il2Cpp.Vector3): Il2Cpp.Vector3;

    // IsChildOf(Transform) : Boolean
    IsChildOf(parent: Il2Cpp.Transform): boolean;

    // LookAt(Transform) : Void
    LookAt(target: Il2Cpp.Transform): void;

    // LookAt(Vector3) : Void
    LookAt(target: Il2Cpp.Vector3): void;

    // LookAt(Transform, Vector3) : Void
    LookAt(target: Il2Cpp.Transform, worldUp: Il2Cpp.Vector3): void;

    // LookAt(Vector3, Vector3) : Void
    LookAt(target: Il2Cpp.Vector3, worldUp: Il2Cpp.Vector3): void;

    // Rotate(Vector3) : Void
    Rotate(eulerAngles: Il2Cpp.Vector3): void;

    // Rotate(Vector3, Space) : Void
    Rotate(eulerAngles: Il2Cpp.Vector3, relativeTo: Il2Cpp.Space): void;

    // public void Rotate(Vector3 axis, float angle)
    Rotate(axis: Il2Cpp.Vector3, angle: number): void;

    // Rotate(Vector3, Single, Space) : Void
    Rotate(axis: Il2Cpp.Vector3, angle: number, relativeTo: Il2Cpp.Space): void;

    // Rotate(Single, Single, Single, Space) : Void
    Rotate(x: number, y: number, z: number, relativeTo: Il2Cpp.Space): void;

    // RotateAround(Vector3, Vector3, Single) : Void
    RotateAround(point: Il2Cpp.Vector3, axis: Il2Cpp.Vector3, angle: number): void;

    // SetAsFirstSibling() : Void
    SetAsFirstSibling(): void;

    // SetAsLastSibling() : Void
    SetAsLastSibling(): void;

    // SetParent(Transform) : Void
    SetParent(parent: Il2Cpp.Transform): void;

    // SetParent(Transform, Boolean) : Void
    SetParent(parent: Il2Cpp.Transform, worldPositionStays: boolean): void;

    // SetPositionAndRotation(Vector3, Quaternion) : Void
    SetPositionAndRotation(position: Il2Cpp.Vector3, rotation: Il2Cpp.Quaternion): void;

    // SetSiblingIndex(Int32) : Void
    SetSiblingIndex(index: number): void;

    // TransformDirection(Vector3) : Vector3
    TransformDirection(direction: Il2Cpp.Vector3): Il2Cpp.Vector3;

    // TransformDirection(Single, Single, Single) : Vector3
    TransformDirection(x: number, y: number, z: number): Il2Cpp.Vector3;

    // TransformPoint(Vector3) : Vector3
    TransformPoint(position: Il2Cpp.Vector3): Il2Cpp.Vector3;

    // TransformVector(Vector3) : Vector3
    TransformVector(vector: Il2Cpp.Vector3): Il2Cpp.Vector3;

    // Translate(Vector3) : Void
    Translate(translation: Il2Cpp.Vector3): void;

    // Translate(Vector3, Space) : Void
    Translate(translation: Il2Cpp.Vector3, relativeTo: Il2Cpp.Space): void;

    // Translate(Single, Single, Single, Space) : Void
    Translate(x: number, y: number, z: number, relativeTo: Il2Cpp.Space): void;

    /**
     * get/set Transform fileds
     */

    // get_childCount() : Int32
    get_childCount(): number;

    // get_eulerAngles() : Vector3
    get_eulerAngles(): Il2Cpp.Vector3;

    // set_eulerAngles(Vector3) : Void
    set_eulerAngles(value: Il2Cpp.Vector3): void;

    // get_forward() : Vector3
    get_forward(): Il2Cpp.Vector3;

    // set_hasChanged(Boolean) : Void
    set_hasChanged(value: boolean): void;

    // get_hasChanged() : Boolean
    get_hasChanged(): boolean;

    // get_localEulerAngles() : Vector3
    get_localEulerAngles(): Il2Cpp.Vector3;

    // set_localEulerAngles(Vector3) : Void
    set_localEulerAngles(value: Il2Cpp.Vector3): void;

    // get_localPosition() : Vector3
    get_localPosition(): Il2Cpp.Vector3;

    // set_localPosition(Vector3) : Void
    set_localPosition(value: Il2Cpp.Vector3): void;

    // get_localRotation() : Quaternion
    get_localRotation(): Il2Cpp.Quaternion;

    // set_localRotation(Quaternion) : Void
    set_localRotation(value: Il2Cpp.Quaternion): void;

    // get_localScale() : Vector3
    get_localScale(): Il2Cpp.Vector3;

    // set_localScale(Vector3) : Void
    set_localScale(value: Il2Cpp.Vector3): void;

    // get_localToWorldMatrix() : Matrix4x4
    // get_localToWorldMatrix(): Il2Cpp.Matrix4x4;

    // get_lossyScale() : Vector3
    get_lossyScale(): Il2Cpp.Vector3;

    // get_parent() : Transform
    get_parent(): Il2Cpp.Transform;

    // set_parent(Transform) : Void
    set_parent(value: Il2Cpp.Transform): void;

    // get_position() : Vector3
    get_position(): Il2Cpp.Vector3;

    // set_position(Vector3) : Void
    set_position(value: Il2Cpp.Vector3): void;

    // get_right() : Vector3
    get_right(): Il2Cpp.Vector3;

    // get_rotation() : Quaternion
    get_rotation(): Il2Cpp.Quaternion;

    // set_rotation(Quaternion) : Void
    set_rotation(value: Il2Cpp.Quaternion): void;

    // get_up() : Vector3
    get_up(): Il2Cpp.Vector3;

    // set_up(Vector3) : Void
    set_up(value: Il2Cpp.Vector3): void;
}