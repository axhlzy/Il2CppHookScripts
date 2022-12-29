interface list_impl {
    _defaultCapacity: number
    _emptyArray: NativePointer
    _items: NativePointer
    _size: number
    _version: number
    _syncRoot: NativePointer
}

export class PackList implements list_impl {

    public handle: NativePointer
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
            // _defaultCapacity 和 _emptyArray 不同unity版本可能不太一样
            try {
                this._defaultCapacity = this.class.field('_defaultCapacity').value as number
            } catch {
                this._defaultCapacity = this.class.field('DefaultCapacity').value as number
            }
            try {
                this._emptyArray = this.class.field('_emptyArray').value as NativePointer
            } catch {
                this._emptyArray = this.class.field('s_emptyArray').value as NativePointer
            }
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

    showList(simpleCallback?: (item: Il2Cpp.Object) => string): void {
        if (this.get_Count() == 0) throw new Error('List is empty')
        LOGZ(`\nList<${this.get_Item().class.name}> ( Count: ${this.get_Count()} / Capacity: ${this.get_Capacity()} )\n`)
        let count: number = 0
        let arrayResult: Array<string> = new Array<string>()
        this.forEach((item: Il2Cpp.Object) => {
            let simpleStr: string = '-> '
            if (simpleCallback != undefined) {
                let res = simpleCallback(item)
                simpleStr += res
                arrayResult.push(res.toString().replace('"', '').replace('"', ''))
            }
            LOGD(`[${++count}]  ${item.handle} -> ${item.toString()}  ${lfss(item.handle)} ${simpleCallback == undefined ? '' : simpleStr}`)
        })
        if (arrayResult.length != 0) {
            newLine()
            LOGJSON(arrayResult)
        }
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

declare global {
    var showList: (mPtr: NativePointer) => void
}

/**
 * 用来简单解析 unity 的 List<T> 类型
 * @param mPtr 指定一个指向 list 的指针
 * @param simpleCallback simpleCallback 用来解析 item 内部的指定数据，返回一个字符串
 * 
 * @example
 *  showList(0xbf71efa0,(item)=>{return item.field('name').value})
 *  [76]  0xaf049090 -> NameDef -> "Giulia"
 *  [77]  0xaf049078 -> NameDef -> "Glenn"
 *  [78]  0xaf049060 -> NameDef -> "Haley"
 *  [79]  0xaf049048 -> NameDef -> "Hedwig"
 *  [80]  0xaf049030 -> NameDef -> "Helena"
 *  [81]  0xaf049018 -> NameDef -> "Hildagarde"
 */
globalThis.showList = (mPtr: NativePointer, simpleCallback?: (item: Il2Cpp.Object) => string) => { new PackList(checkCmdInput(mPtr)).showList(simpleCallback) }