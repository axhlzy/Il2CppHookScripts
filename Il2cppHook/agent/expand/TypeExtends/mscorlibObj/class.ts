import { type } from "os";
import "./interface"

// 拓展 mscorlib.System.Object
class mscorlib_System_Object_impl implements mscorlib_System_Object {

    handle: NativePointerValue;
    constructor(handleOrWrapper: NativePointerValue) {
        this.handle = handleOrWrapper;
    }

    ctor(): mscorlib_System_Object {
        return mscorlib.Api.mscorlibObj._ctor_0(allocP(1));
    }

    toString(): string {
        return readU16(mscorlib.Api.mscorlibObj._toString(this.handle));
    }

    memberwiseClone(): mscorlib_System_Object {
        throw new Error("Not implemented");
    }

    getType(): mscorlib.Type {
        return new mscorlib.Type(mscorlib.Api.mscorlibObj._getType(this.handle));
    }

    finalize(): void {
        return mscorlib.Api.mscorlibObj._finalize(this.handle);
    }

    getHashCode(): number {
        return mscorlib.Api.mscorlibObj._getHashCode(this.handle);
    }
}

const getTypeInner = (mPtr: NativePointer): mscorlib.Type => {
    if (typeof mPtr == "number") mPtr = ptr(mPtr)
    return new mscorlib_System_Object_impl(mPtr).getType();
}

const getTypeNameInner = (mPtr: NativePointer): string => {
    return getTypeInner(mPtr).toString();
}

declare global {

    namespace mscorlib {
        class Object extends mscorlib_System_Object_impl { }
    }

    var getType: (mPtr: NativePointer) => mscorlib.Type;
    var getTypeName: (mPtr: NativePointer) => string;
}


mscorlib.Object = mscorlib_System_Object_impl;

globalThis.getType = getTypeInner
globalThis.getTypeName = getTypeNameInner

export { mscorlib_System_Object_impl };