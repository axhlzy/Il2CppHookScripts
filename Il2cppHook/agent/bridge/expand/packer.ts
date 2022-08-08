interface exFunc {
    methods: Il2Cpp.Method[]
    fields: Il2Cpp.Field[]
}

class PackerObject extends Il2Cpp.Object implements exFunc {
    methods: Il2Cpp.Method<Il2Cpp.Method.ReturnType>[] = [];
    fields: Il2Cpp.Field<Il2Cpp.Field.Type>[] = [];
    invoke(...args: any) { }
}

class Packer extends Il2Cpp.Object implements exFunc {
    methods: Il2Cpp.Method<Il2Cpp.Method.ReturnType>[] = this.class.methods
    fields: Il2Cpp.Field<Il2Cpp.Field.Type>[] = this.class.fields
    pack(): PackerObject {
        return new Proxy<Il2Cpp.Class>(this.class, {
            get: (target, property) => {
                Reflect.set(target, "methods", this.methods as Il2Cpp.Method[]);
                Reflect.set(target, "fields", this.fields as Il2Cpp.Field[]);
                return Reflect.get(target, property);
            }
        }) as unknown as PackerObject
    }
}

function packPack(mPtr: NativePointer | number) {
    if (typeof mPtr == "number") mPtr = ptr(mPtr)
    return new Packer(mPtr).fields["12"].value
}

Reflect.set(globalThis, "pack", packPack)

declare global {
    namespace Hooker {
        class Packer { }
    }
    var pack: (mPtr: NativePointer) => void
}

export { }