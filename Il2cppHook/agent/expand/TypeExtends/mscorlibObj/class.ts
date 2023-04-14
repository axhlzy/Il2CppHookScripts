// 拓展 mscorlib.System.Object
class mscorlib_System_Object_impl {

    handle: NativePointer

    constructor(handleOrWrapper: NativePointer) {
        this.handle = handleOrWrapper
    }

    ctor_mscorlib_System_Object(): mscorlib_System_Object_impl {
        return mscorlib.Api.mscorlibObj._ctor_0(allocP(1))
    }

    toString(): string {
        return readU16(mscorlib.Api.mscorlibObj._toString(this.handle))
    }

    memberwiseClone(): mscorlib_System_Object_impl {
        throw new Error("Not implemented")
    }

    getType(): mscorlib.Type {
        return new mscorlib.Type(mscorlib.Api.mscorlibObj._getType(this.handle))
    }

    finalize(): void {
        return mscorlib.Api.mscorlibObj._finalize(this.handle)
    }

    getHashCode(): number {
        return mscorlib.Api.mscorlibObj._getHashCode(this.handle)
    }

    caseTo<type extends mscorlib_System_Object_impl>() {
        // return new type(this.handle)
    }
}

declare global {
    namespace mscorlib {
        class Object extends mscorlib_System_Object_impl { }
    }
}

mscorlib.Object = mscorlib_System_Object_impl

export { mscorlib_System_Object_impl }