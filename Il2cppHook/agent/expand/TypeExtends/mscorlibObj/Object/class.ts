import { cache } from "decorator-cache-getter"

class il2cppObjAPI_impl extends Il2Cpp.Object implements CoreModule_Object {

    // m_CachedPtr : IntPtr
    // m_CachedPtr: NativePointer = lfv(this.handle, "m_CachedPtr")

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
}

class Unity_Object_Impl extends il2cppObjAPI_impl {

}

export { Unity_Object_Impl as UnityEngine_Object }