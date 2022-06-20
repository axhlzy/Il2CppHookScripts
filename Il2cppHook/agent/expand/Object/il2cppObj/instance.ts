import { cache } from "decorator-cache-getter";
import { il2cppObjAPI } from "./api";

// 拓展 mscorlib.System.Object
class il2cppObjAPI_impl extends Il2Cpp.Object implements CoreModule_Object {

    ctor(): CoreModule_Object {
        return Il2Cpp.Api.il2cppObj._ctor_0(allocP(1));
    }
    Equals(other: il2cppObjAPI_impl): boolean {
        return Il2Cpp.Api.il2cppObj._Equals(this.handle, other.handle);
    }
    GetHashCode(): number {
        return Il2Cpp.Api.il2cppObj._GetHashCode(this.handle);
    }
    GetInstanceID(): number {
        return Il2Cpp.Api.il2cppObj._GetInstanceID(this.handle);
    }
    ToString(): string {
        return Il2Cpp.Api.il2cppObj._ToString(this.handle);
    }
    set_name(value: string): void {
        return Il2Cpp.Api.il2cppObj._set_name(this.handle, allocUStr(value));
    }
    get_name(): string {
        return readU16(Il2Cpp.Api.il2cppObj._get_name(this.handle));
    }

    static Destroy_1(obj: CoreModule_Object): void {
        return Il2Cpp.Api.il2cppObj._Destroy_1(obj);
    }

    static Destroy_2(obj: CoreModule_Object, t: number): void {
        return Il2Cpp.Api.il2cppObj._Destroy_2(obj, t);
    }


}


declare global {
    namespace Il2Cpp {
        class il2cppObjAPI_impl extends il2cppObjAPI { }
    }
}

Il2Cpp.Object = il2cppObjAPI_impl;

export { il2cppObjAPI_impl };