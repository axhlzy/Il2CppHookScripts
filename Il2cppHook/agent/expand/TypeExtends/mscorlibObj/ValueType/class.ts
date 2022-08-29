import { mscorlib_System_Object_impl } from "../class"

class System_ValueType_Impl extends mscorlib_System_Object_impl {

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    _ctor(): void {
        return mscorlib.Api.ValueType.__ctor(this.handle)
    }

    InternalEquals(o1: mscorlib_System_Object_impl, o2: mscorlib_System_Object_impl, fields: mscorlib_System_Object_impl[]): boolean {
        return mscorlib.Api.ValueType._InternalEquals(o1, o2, fields)
    }

    DefaultEquals(o1: mscorlib_System_Object_impl, o2: mscorlib_System_Object_impl): boolean {
        return mscorlib.Api.ValueType._DefaultEquals(o1, o2)
    }

    Equals(obj: mscorlib_System_Object_impl): boolean {
        return mscorlib.Api.ValueType._Equals(this.handle, obj)
    }

    InternalGetHashCode(o: mscorlib_System_Object_impl, fields: mscorlib_System_Object_impl[]): number {
        return mscorlib.Api.ValueType._InternalGetHashCode(o, fields)
    }

    GetHashCode(): number {
        return mscorlib.Api.ValueType._GetHashCode(this.handle)
    }

    ToString(): string {
        return readU16(mscorlib.Api.ValueType._ToString(this.handle))
    }

}

declare global {
    namespace mscorlib {
        class ValueType extends System_ValueType_Impl { }
    }
}

export { System_ValueType_Impl }