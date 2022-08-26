import { mscorlib_System_Object_impl } from "../class";

type System_Char = NativePointer
type mscorlib_System_Type_array = NativePointer

class mscorlib_System_Type_impl extends mscorlib_System_Object_impl implements mscorlib_System_Type {

    // Delimiter : Char
    Delimiter: System_Char = lfvt(this.handle, "Delimiter", findClass("Type"))
    // EmptyTypes : Type[]
    EmptyTypes: mscorlib_System_Type_array = lfvt(this.handle, "EmptyTypes", findClass("Type"))
    // FilterAttribute : MemberFilter
    FilterAttribute: NativePointer = lfvt(this.handle, "FilterAttribute", findClass("Type"))
    // FilterName : MemberFilter
    FilterName: NativePointer = lfvt(this.handle, "FilterName", findClass("Type"))
    // FilterNameIgnoreCase : MemberFilter
    FilterNameIgnoreCase: NativePointer = lfvt(this.handle, "FilterNameIgnoreCase", findClass("Type"))
    // Missing : Object
    Missing: Il2cpp.Object = new Il2cpp.Object(lfvt(this.handle, "Missing", findClass("Type")))

    Equals_obj(obj: any): boolean {
        return Il2cpp.Api.Type._Equals_obj(this.handle, obj);
    }

    Equals_type(type: mscorlib_System_Type_impl): boolean {
        return Il2cpp.Api.Type._Equals_type(this.handle, type.handle);
    }

    GetArrayRank(): number {
        return Il2cpp.Api.Type._GetArrayRank(this.handle).toInt32();
    }

    GetConstructor(types: mscorlib_System_Type_impl[]) {
        return Il2cpp.Api.Type._GetConstructor(this.handle, types[0].handle);
    }

    GetEnumName(obj: any): string {
        return readU16(Il2cpp.Api.Type._GetEnumName(this.handle, obj));
    }

    GetEnumNames(): string[] {
        return Il2cpp.Api.Type._GetEnumNames(this.handle);
    }

    GetHashCode(): number {
        return Il2cpp.Api.Type._GetHashCode(this.handle).toInt32();
    }

    GetType_0(): mscorlib_System_Type {
        return new mscorlib_System_Type_impl(Il2cpp.Api.Type._GetType_0(this.handle));
    }

    GetType_1(typeName: string): mscorlib_System_Type {
        return new mscorlib_System_Type_impl(Il2cpp.Api.Type._GetType_1(this.handle, typeName));
    }

    toString(): string {
        return readU16(Il2cpp.Api.Type._ToString(this.handle));
    }

    get name(): string {
        return this.toString().split('Type: ')[1];
    }

    get class(): NativePointer {
        return findClass(this.name)
    }

    // mscorlib.Type case to mscorlib.RuntimeType
    get caseToRuntimeType(): Il2cpp.RuntimeType {
        return new Il2cpp.RuntimeType(this.handle)
    }
}

declare global {
    namespace Il2cpp {
        class Type extends mscorlib_System_Type_impl { }
    }
}

Il2cpp.Type = mscorlib_System_Type_impl;

export { mscorlib_System_Type_impl }