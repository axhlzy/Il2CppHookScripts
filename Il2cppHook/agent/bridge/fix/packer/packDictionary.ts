import { PackArray } from "./packArray"
import { PackList } from "./packList"

// 还没修改好 用不了。。。。 
export class PackDictionary {

    public handle: NativePointer
    public Obj: Il2Cpp.Object

    constructor(handle: NativePointer) {
        this.handle = handle
        try {
            this.Obj = new Il2Cpp.Object(handle)
        } catch (error) { throw error }
    }

    public get comparer(): Il2Cpp.Object {
        return this.Obj.method("get_Comparer").invoke() as Il2Cpp.Object
    }

    public get entries(): Il2Cpp.Object {
        return this.Obj.field("entries").value as Il2Cpp.Object
    }

    public get buckets(): Il2Cpp.Object {
        return this.Obj.field("buckets").value as Il2Cpp.Object
    }

    // alias of get_Count
    public get length(): number {
        return this.get_Count()
    }

    // public Int32 get_Count()
    public get_Count(): number {
        return <number>this.Obj.method("get_Count").invoke()
    }

    // public Object> get_Keys()
    public get_Keys(): PackArray {
        return new PackArray((<Il2Cpp.Object>this.Obj.method("get_Keys").invoke()).handle)
    }

    public get_Entry(): PackArray {
        return new PackArray(this.entries.handle)
    }

    public get_buckets(): PackList {
        return new PackList(this.buckets.handle)
    }

    // public Void Add(String key,Object value) 
    // key not allways string, so use nativePointer instead
    public Add(key: NativePointer, value: NativePointer): void {
        this.Obj.method("Add").invoke(key, value)
    }

    // public Boolean ContainsKey(String key)
    public ContainsKey(key: NativePointer): boolean {
        return (<Il2Cpp.Object>this.Obj.method("ContainsKey").invoke(key)).handle.readU8() == 1
    }

    // public Boolean ContainsValue(Object value)
    public ContainsValue(value: NativePointer): boolean {
        return (<Il2Cpp.Object>this.Obj.method("ContainsValue").invoke(value)).handle.readU8() == 1
    }

    // public Void Clear()
    public Clear(): void {
        this.Obj.method("Clear").invoke()
    }

    // forEach(callback: (value: Il2Cpp.Object, key: Il2Cpp.Object, index: number) => void): void {
    //     let keys: PackArray = this.get_Keys()
    //     let values: PackArray = this.get_Values()
    //     if (keys.length != values.length) throw new Error("keys.length != values.length")
    //     for (let i = 0; i < keys.length; i++) {
    //         callback(values.get_Item(i), keys.get_Item(i), i)
    //     }
    // }

    // toString(): string {
    //     let keys: string = this.get_Keys().toString()
    //     let values: string = this.get_Values().toString()
    //     return `keys: ${keys}\nvalues: ${values}`
    // }

}

declare global {
    var PackDictionary: (mPtr: NativePointer) => PackDictionary
}

globalThis.PackDictionary = (mPtr: NativePointer) => new PackDictionary(checkCmdInput(mPtr))