export class PackArray<T> {

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

    public get_Count(): number {
        return this.Obj.method("System.Collections.Generic.ICollection`1.get_Count").invoke() as number
    }

    public get_Item(index: number): Il2Cpp.Object {
        if (index >= this.get_Count()) throw new Error(`Index out of range: ${index} >= ${this.get_Count()}`)
        return this.Obj.method("System.Collections.Generic.IList`1.get_Item").invoke(index) as Il2Cpp.Object
    }

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

    toArraySimple(): string[] {
        let result: string[] = []
        this.forEach((item: Il2Cpp.Object) => result.push(item.toString()))
        return result
    }

    toString(): string {
        return JSON.stringify(this.toArray())
    }

}