import { UnityEngine_Quaternion_Impl as Quaternion } from "../ValueType/Quaternion/class"
import { UnityEngine_Vector3_Impl as Vector3 } from "../ValueType/Vector3/class"
import { UnityEngine_Transform_Impl as Transform } from "./Component/Transform/class"

class il2cppObjAPI_impl extends Il2Cpp.Object implements CoreModule_Object {

    // m_CachedPtr : IntPtr
    // m_CachedPtr: NativePointer = lfv(this.handle, "m_CachedPtr")

    constructor(handle: NativePointerValue) {
        super(handle)
    }

    ctor(): CoreModule_Object {
        return Il2Cpp.Api.il2cppObj._ctor_0(allocP(1))
    }

    Equals(other: il2cppObjAPI_impl): boolean {
        return Il2Cpp.Api.il2cppObj._Equals(this.handle, other.handle)
    }

    GetHashCode(): number {
        return Il2Cpp.Api.il2cppObj._GetHashCode(this.handle)
    }

    GetInstanceID(): number {
        return Il2Cpp.Api.il2cppObj._GetInstanceID(this.handle)
    }

    ToString(): string {
        return Il2Cpp.Api.il2cppObj._ToString(this.handle)
    }

    set_name(value: string): void {
        return Il2Cpp.Api.il2cppObj._set_name(this.handle, allocUStr(value))
    }

    get_name(): string {
        return readU16(Il2Cpp.Api.il2cppObj._get_name(this.handle))
    }

    static Destroy_1(obj: CoreModule_Object): void {
        return Il2Cpp.Api.il2cppObj._Destroy_1(obj)
    }

    static Destroy_2(obj: CoreModule_Object, t: number): void {
        return Il2Cpp.Api.il2cppObj._Destroy_2(obj, t)
    }

    static DestroyImmediate(obj: CoreModule_Object): void {
        return Il2Cpp.Api.il2cppObj._DestroyImmediate(obj)
    }

    // public static Object Instantiate(Object original)
    static Instantiate_1(original: il2cppObjAPI_impl): il2cppObjAPI_impl {
        return new il2cppObjAPI_impl(Il2Cpp.Api.il2cppObj._Instantiate_1(original))
    }

    // public static Object Instantiate(Object original, Vector3 position, Quaternion rotation)
    static Instantiate_3(original: il2cppObjAPI_impl, position: Vector3, rotation: Quaternion): il2cppObjAPI_impl {
        return new il2cppObjAPI_impl(Il2Cpp.Api.il2cppObj._Instantiate_3(original, position, rotation))
    }

    // public static Object Instantiate(Object original, Transform parent, Boolean instantiateInWorldSpace)
    static Instantiate_3_1(original: il2cppObjAPI_impl, parent: Transform, instantiateInWorldSpace: boolean): il2cppObjAPI_impl {
        return Il2Cpp.Api.il2cppObj._Instantiate_3(original, parent, instantiateInWorldSpace)
    }

    // public static Object Instantiate(Object original, Vector3 position, Quaternion rotation, Transform parent)
    static Instantiate_4(original: il2cppObjAPI_impl, position: Vector3, rotation: Quaternion, parent: Transform): il2cppObjAPI_impl {
        return Il2Cpp.Api.il2cppObj._Instantiate_4(original, position, rotation, parent)
    }

}

class Unity_Object_Impl extends il2cppObjAPI_impl {

}

export { Unity_Object_Impl as UnityEngine_Object }