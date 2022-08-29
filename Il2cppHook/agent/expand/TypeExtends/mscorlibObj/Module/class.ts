import { mscorlib_System_Type_impl } from "../Type/class";

type mscorlib_System_Reflection_Assembly_impl = NativePointer
type mscorlib_System_Exception = NativePointer
type mscorlib_System_Guid = NativePointer
type mscorlib_System_Runtime_Serialization_SerializationInfo_impl = NativePointer
type mscorlib_System_Runtime_Serialization_StreamingContext = NativePointer

class mscorlib_System_Reflection_Module_impl extends mscorlib_System_Type_impl {

    // _impl : In
    inter = lfv(this.handle, "_impl")
    // assembly : Assembly
    assembly: mscorlib_System_Reflection_Assembly_impl = lfv(this.handle, "assembly", findClass("Module", ["mscorlib"]))
    // defaultBindingFlags : BindingFlags
    defaultBindingFlags: number = lfv(this.handle, "defaultBindingFlags") as unknown as number
    // FilterTypeName : TypeFilter
    FilterTypeName: NativePointer = lfv(this.handle, "FilterTypeName")
    // FilterTypeNameIgnoreCase : TypeFilter
    FilterTypeNameIgnoreCase: NativePointer = lfv(this.handle, "FilterTypeNameIgnoreCase")
    // fqname : String
    fqname: string = readU16(lfv(this.handle, "fqname"))
    // is_resource : Boolean
    is_resource: boolean = lfv(this.handle, "is_resource") as unknown as boolean
    // name : String
    _name: string = readU16(lfv(this.handle, "name"))
    // scopename : String
    scopename: string = readU16(lfv(this.handle, "scopename"))
    // token : Int32
    token: number = lfv(this.handle, "token") as unknown as number

    static get ctor(): mscorlib_System_Object {
        return new mscorlib_System_Reflection_Module_impl(mscorlib.Api.Module._ctor(alloc()))
    }

    static get _cctor(): mscorlib_System_Reflection_Module_impl {
        return new mscorlib_System_Reflection_Module_impl(mscorlib.Api.Module._cctor(alloc()))
    }

    CreateNIE(): mscorlib_System_Exception {
        return mscorlib.Api.Module._CreateNIE(this.handle)
    }

    Equals(other: NativePointer): boolean {
        return mscorlib.Api.Module._Equals(this.handle, other)
    }

    filter_by_type_name(type: mscorlib_System_Type_impl, obj: NativePointer): boolean {
        return mscorlib.Api.Module._filter_by_type_name(this.handle, type.handle, obj)
    }

    filter_by_type_name_ignore_case(type: mscorlib_System_Type_impl, obj: NativePointer): boolean {
        return mscorlib.Api.Module._filter_by_type_name_ignore_case(this.handle, type.handle, obj)
    }

    GetCustomAttributes_1(inherit: boolean): NativePointer {
        return mscorlib.Api.Module._GetCustomAttributes(this.handle, inherit)
    }

    GetCustomAttributes_2(type: mscorlib_System_Type_impl, inherit: boolean): NativePointer {
        return mscorlib.Api.Module._GetCustomAttributes_1(this.handle, type.handle, inherit)
    }

    GetGuidInternal(): string {
        return readU16(mscorlib.Api.Module._GetGuidInternal(this.handle))
    }

    GetHashCode(): number {
        return mscorlib.Api.Module._GetHashCode(this.handle) as number
    }

    GetModuleVersionId(): mscorlib_System_Guid {
        return mscorlib.Api.Module._GetModuleVersionId(this.handle)
    }

    GetObjectData(info: mscorlib_System_Runtime_Serialization_SerializationInfo_impl, context: mscorlib_System_Runtime_Serialization_StreamingContext): void {
        return mscorlib.Api.Module._GetObjectData(this.handle, info, context)
    }

    IsDefined(type: mscorlib_System_Type_impl, inherit: boolean): boolean {
        return mscorlib.Api.Module._IsDefined(this.handle, type.handle, inherit)
    }

    IsResource(): boolean {
        return mscorlib.Api.Module._IsResource(this.handle)
    }

    op_Equality(other: mscorlib_System_Reflection_Module_impl): boolean {
        return mscorlib.Api.Module._op_Equality(this.handle, other.handle)
    }

    ToString(): string {
        return readU16(mscorlib.Api.Module._ToString(this.handle))
    }

    get_Assembly(): mscorlib_System_Reflection_Assembly_impl {
        return mscorlib.Api.Module._get_Assembly(this.handle)
    }

    get_ModuleVersionId(): mscorlib_System_Guid {
        return mscorlib.Api.Module._get_ModuleVersionId(this.handle)
    }

    get_ScopeName(): string {
        return readU16(mscorlib.Api.Module._get_ScopeName(this.handle))
    }
}

declare global {
    namespace mscorlib {
        class Module extends mscorlib_System_Reflection_Module_impl { }
    }
}

mscorlib.Module = mscorlib_System_Reflection_Module_impl;

export { mscorlib_System_Reflection_Module_impl };