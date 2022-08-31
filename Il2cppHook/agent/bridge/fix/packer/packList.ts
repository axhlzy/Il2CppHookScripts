interface list_impl {
    _defaultCapacity: number
    _emptyArray: NativePointer
    _items: NativePointer
    _size: number
    _version: number
    _syncRoot: NativePointer
}

export class PackList implements list_impl {

    private handle: NativePointer
    private object: Il2Cpp.Object
    private class: Il2Cpp.Class

    public _defaultCapacity: number
    public _emptyArray: NativePointer
    public _size: number
    public _items: NativePointer
    public _version: number
    public _syncRoot: NativePointer

    constructor(mPtr: NativePointer) {
        this.handle = mPtr
        try {
            this.object = new Il2Cpp.Object(mPtr)
            this.class = this.object.class
            if (!this.class.name.includes('List`')) throw new Error('Input mPtr is not a list')
            this._defaultCapacity = this.class.field('_defaultCapacity').value as number
            this._emptyArray = this.class.field('_emptyArray').value as NativePointer
            this._items = this.class.field('_items').value as NativePointer
            this._size = this.class.field('_size').value as number
            this._version = this.class.field('_version').value as number
            this._syncRoot = this.class.field('_syncRoot').value as NativePointer
        } catch (error) { throw error }
    }

    toString(): string {
        let itemName = this.get_Count() == 0 ? '' : ` < '${this.get_Item().class.name}' > `
        return `${this.handle} ---> ${this.class.name} (${this.object.class.handle}${itemName} | ${this.get_Count()}/${this.get_Capacity()} )`
    }

    toShow(): void {
        newLine()
        LOGE(`${new mscorlib.Object(this.handle).toString()} @ ${this.handle}`)
        LOGJSON(this)
    }

    forEach(callback: (item: Il2Cpp.Object, index: number) => void): void {
        if (this.get_Count() == 0) return
        for (let i = 0; i < this.get_Count(); i++) callback(this.get_Item(i), i)
    }

    toArray(): Il2Cpp.Object[] {
        const arr: Array<Il2Cpp.Object> = []
        this.forEach(item => arr.push(item))
        return arr
    }

    toJsonString(): string {
        return JSON.stringify(this)
    }

    // toSimpleString(): string {
    //     return this.toArray().map(item => {
    //         let action = item.add(p_size * 2).readPointer()
    //         let method = new mscorlib.Delegate(action).method
    //         LOGE(`\t${method.readPointer().readPointer().sub(soAddr)}`)
    //         return `${getLine(4, " ")}${item} ("${new Il2Cpp.Object(item).toString()}")`
    //     }).join(getLine(4, " "))
    // }

    get_Item(index: number = 0): Il2Cpp.Object {
        if (index > this.get_Count() - 1) throw new Error(`Index out of range: ${index}`)
        return this.object.method('get_Item').invoke(index) as Il2Cpp.Object
    }

    set_Item(index: number = 0, value: NativePointer): void {
        return this.object.method('set_Item').invoke(index, value) as void
    }

    get_Capacity(): number {
        return this.object.method('get_Capacity').invoke() as number
    }

    set_Capacity(newCapacity: number): void {
        return this.object.method('set_Capacity').invoke(newCapacity) as void
    }

    get_Count(): number {
        return this.object.method('get_Count').invoke() as number
    }

    RemoveAt(index: number = 0): void {
        return this.object.method('RemoveAt').invoke(index) as void
    }

    Add(value: NativePointer): void {
        return this.object.method('Add').invoke(value) as void
    }

    Contains(value: NativePointer): boolean {
        return this.object.method('Contains').invoke(value) as boolean
    }

    Clear(): void {
        return this.object.method('Clear').invoke() as void
    }

    Reverse(): void {
        return this.object.method('Reverse').invoke() as void
    }

}