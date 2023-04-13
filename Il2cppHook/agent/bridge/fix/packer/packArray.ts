/**
 * PackArray 用于打包一个 array, 解析 array 的值
 */
export class PackArray {

    public handle: NativePointer
    public Obj: Il2Cpp.Object

    constructor(handle: NativePointer) {
        this.handle = handle

        try {
            this.Obj = new Il2Cpp.Object(handle)
        } catch (error) {
            throw error
        }
    }

    public get length(): number {
        return this.get_Count()
    }

    public get itemClass(): Il2Cpp.Class | null {
        if (this.length == 0) return null
        return this.get_Item(0).class
    }

    public get_Count(): number {
        return this.Obj.method("System.Collections.Generic.ICollection`1.get_Count").invoke() as number
    }

    // 注意此处的返回值直接是一个 Il2Cpp.Object
    public get_Item(index: number): Il2Cpp.Object {
        if (index >= this.get_Count()) throw new Error(`Index out of range: ${index} >= ${this.get_Count()}`)
        return this.Obj.method("System.Collections.Generic.IList`1.get_Item").invoke(index) as Il2Cpp.Object
    }

    // setValue 如果是str，应该 set_Item(0,allocUStr('xxx'))
    public set_Item(index: number, value: NativePointer): void {
        if (index >= this.get_Count()) throw new Error(`Index out of range: ${index} >= ${this.get_Count()}`)
        this.Obj.method("System.Collections.Generic.IList`1.set_Item").invoke(index, value)
    }

    public IndexOf(item: NativePointer): number {
        return this.Obj.method("System.Collections.Generic.IList`1.IndexOf").invoke(item) as number
    }

    public RemoveAt(index: number): number {
        if (index >= this.get_Count()) throw new Error(`Index out of range: ${index} >= ${this.get_Count()}`)
        return this.Obj.method("System.Collections.Generic.IList`1.RemoveAt").invoke(index) as number
    }

    forEach(callback: (item: Il2Cpp.Object, index: number) => void): void {
        if (this.length == 0) return
        for (let i = 0; i < this.get_Count(); i++) callback(this.get_Item(i), i)
    }

    toArray(): Il2Cpp.Object[] {
        let result: Il2Cpp.Object[] = []
        this.forEach((item: Il2Cpp.Object) => result.push(item))
        return result
    }

    toArrayStr(): string[] {
        let result: string[] = []
        this.forEach((item: Il2Cpp.Object) => result.push(item.toString()))
        return result
    }

    toString(): string {
        return this.toArrayStr().toString()
    }

    show(): void {
        showArray(this.handle)
    }
}

declare global {
    var packArray: (mPtr: NativePointer) => PackArray
}

globalThis.packArray = (mPtr: NativePointer) => new PackArray(checkCmdInput(mPtr))