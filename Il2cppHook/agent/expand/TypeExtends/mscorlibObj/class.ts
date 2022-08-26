import "./interface"

// 拓展 mscorlib.System.Object
class mscorlib_System_Object_impl implements mscorlib_System_Object {

    handle: NativePointer;
    constructor(handleOrWrapper: NativePointer) {
        this.handle = handleOrWrapper;
    }

    ctor(): mscorlib_System_Object {
        return Il2cpp.Api.mscorlibObj._ctor_0(allocP(1));
    }

    toString(): string {
        return readU16(Il2cpp.Api.mscorlibObj._toString(this.handle));
    }

    memberwiseClone(): mscorlib_System_Object {
        throw new Error("Not implemented");
    }

    getType(): Il2cpp.Type {
        return new Il2cpp.Type(Il2cpp.Api.mscorlibObj._getType(this.handle));
    }

    finalize(): void {
        return Il2cpp.Api.mscorlibObj._finalize(this.handle);
    }

    getHashCode(): number {
        return Il2cpp.Api.mscorlibObj._getHashCode(this.handle);
    }
}

declare global {
    namespace Il2cpp {
        class Object extends mscorlib_System_Object_impl { }
    }
}

Il2cpp.Object = mscorlib_System_Object_impl;

export { mscorlib_System_Object_impl };