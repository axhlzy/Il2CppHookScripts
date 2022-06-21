import "./interface"

// 拓展 mscorlib.System.Object
class mscorlib_System_Object_impl implements mscorlib_System_Object {

    handle: NativePointerValue;
    constructor(handleOrWrapper: NativePointerValue) {
        this.handle = handleOrWrapper;
    }

    ctor(): mscorlib_System_Object {
        return Il2Cpp.Api.mscorlibObj._ctor_0(allocP(1));
    }

    toString(): string {
        return Il2Cpp.Api.mscorlibObj._toString(this.handle);
    }

    memberwiseClone(): mscorlib_System_Object {
        return Il2Cpp.Api.mscorlibObj._toString(this.handle);
    }

    getType(): Il2Cpp.Type {
        return Il2Cpp.Api.mscorlibObj._getType(this.handle);
    }

    finalize(): void {
        return Il2Cpp.Api.mscorlibObj._finalize(this.handle);
    }

    getHashCode(): number {
        return Il2Cpp.Api.mscorlibObj._getHashCode(this.handle);
    }
}

declare global {
    namespace Il2Cpp.Object {
    }
}

export { mscorlib_System_Object_impl };