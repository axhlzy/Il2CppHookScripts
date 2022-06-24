import { type } from "os";
import "./interface"

// 拓展 mscorlib.System.Object
class mscorlib_System_Object_impl implements mscorlib_System_Object {

    handle: NativePointer;
    constructor(handleOrWrapper: NativePointer) {
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
    return getTypeInner(mPtr).name;
}

const getTypeParentShowInfo = (mPtr: NativePointer) => {
    let handle = getTypeInner(mPtr).handle
    LOGD(`\nType => ${handle}`);
    LOGD(`Name => ${getTypeInner(mPtr).toString()}\n`);
    let describe = `${getTypeInner(mPtr).name}(${getTypeInner(mPtr).handle})`;
    let lastHandle: NativePointer = handle;
    for (let i = 0; i < 10; i++) {
        let baseType = new mscorlib.RuntimeType(handle).get_BaseType();
        if (lastHandle.equals(baseType.handle)) break;
        lastHandle = baseType.handle;
        if (baseType.handle == ptr(0) || baseType.handle.isNull()) break;
        describe += ` <--- ${baseType.name}(${baseType.handle}) `
    }
    LOGD(`${describe}\n`);
}

declare global {

    namespace mscorlib {
        class Object extends mscorlib_System_Object_impl { }
    }

    var getType: (mPtr: NativePointer) => mscorlib.Type;
    var getTypeName: (mPtr: NativePointer) => string;
    var showType: (mPtr: NativePointer) => void;
}

mscorlib.Object = mscorlib_System_Object_impl;

globalThis.getType = getTypeInner
globalThis.getTypeName = getTypeNameInner
globalThis.showType = getTypeParentShowInfo

export { mscorlib_System_Object_impl };