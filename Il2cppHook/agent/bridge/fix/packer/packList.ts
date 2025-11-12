interface list_impl {
    _defaultCapacity: number
    _emptyArray: NativePointer
    _items: Il2Cpp.Object
    _size: number
    _version: number
    _syncRoot: NativePointer
}

export class PackList implements list_impl {

    public handle: NativePointer
    private object: Il2Cpp.Object
    private class: Il2Cpp.Class

    public _defaultCapacity!: number
    public _emptyArray: NativePointer
    public _size: number
    public _items: Il2Cpp.Object
    public _version: number
    public _syncRoot: NativePointer

    constructor(mPtr: NativePointer, doNotCheck: boolean = false) {
        this.handle = mPtr
        // LOGD("PackList handle " + this.handle)
        try {
            if (doNotCheck) {
                mPtr.writePointer(findClass("Object"))
            }
            this.object = new Il2Cpp.Object(mPtr)
            this.class = this.object.class
            if (!doNotCheck) {
                if (!this.class.name.includes('List`')) throw new Error('Input mPtr is not a list')
            }
            // _defaultCapacity 和 _emptyArray 不同 unity版本可能不太一样
            try {
                try {
                    this._defaultCapacity = this.object.field<number>('_defaultCapacity').value
                } catch {
                    this._defaultCapacity = this.object.tryField<number>('DefaultCapacity')!.value
                }
            } catch (error) {
                // 这两个可能都不存在
            }
            try {
                this._emptyArray = this.object.field<NativePointer>('_emptyArray').value
            } catch {
                this._emptyArray = this.object.tryField<NativePointer>('s_emptyArray')!.value
            }
            this._items = this.object.tryField<Il2Cpp.Object>('_items')!.value
            this._size = this.object.tryField<number>('_size')!.value
            this._version = this.object.tryField<number>('_version')!.value
            this._syncRoot = this.object.tryField<NativePointer>('_syncRoot')!.value
        } catch (error) { throw error }
    }

    toString(): string {
        const itemName = this.get_Count() == 0 ? '' : ` < '${this.get_Item().class.name}' > `
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

    itemsToString(): string {
        return this.toArray().map(item => item.toString()).join(getLine(4, " "))
    }

    showList(transformer?: (item: Il2Cpp.Object) => string): void {
        if (this.get_Count() == 0) throw new Error('List is empty')
        LOGZ(`\nList<${this.get_Item().class.name}> ( Count: ${this.get_Count()} / Capacity: ${this.get_Capacity()} )\n`)
        let count: number = 0
        let arrayResult: Array<string> = new Array<string>()
        this.forEach((item: Il2Cpp.Object) => {
            let simpleStr: string = '-> '
            if (transformer != undefined) {
                let res = transformer(item)
                simpleStr += res
                arrayResult.push(res.toString().replace('"', '').replace('"', ''))
            }
            let detail = lfss(item.handle).toString()
            detail.length > 200 ? detail = " " : detail = " " + detail + " "
            LOGD(`[${++count}]  ${item.handle} -> ${item.toString()}${detail}${transformer == undefined ? '' : simpleStr}`)
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
        let ret = null 
        try {
            ret = new Il2Cpp.Object(this.object.method<NativePointer>('get_Item').invoke(index))
            // get_Item 可能不存在 ⬆️
        } catch (error) {
            const itemSize = Process.pointerSize
            const itemsArrayPtr = this._items.handle
            const itemPtr = itemsArrayPtr.add(itemSize * (index + 4)).readPointer()
            ret = new Il2Cpp.Object(itemPtr)
        }
        // LOGE(`${this.handle} | ${this.object.handle} | ${this.object.method<NativePointer>('get_Item')} | get_Item(${index}) -> ${ret} | ${ret.handle}`)
        return ret
    }

    set_Item(index: number = 0, value: NativePointer): void {
        this.object.method('set_Item').invoke(index, value)
    }

    get_Capacity(): number {
        return this.object.method<number>('get_Capacity').invoke()
    }

    set_Capacity(newCapacity: number): void {
        this.object.method('set_Capacity').invoke(newCapacity)
    }

    get_Count(): number {
        try {
            return this.object.tryMethod<number>('get_Count')!.invoke()
        } catch (error) {
            return this._size
        }
    }

    RemoveAt(index: number = 0): void {
        this.object.method('RemoveAt').invoke(index)
    }

    Add(value: NativePointer): void {
        this.object.method('Add').invoke(value)
    }

    Contains(value: NativePointer): boolean {
        return !this.object.method<NativePointer>('Contains').invoke(value).isNull()
    }

    Clear(): void {
        this.object.method('Clear').invoke()
    }

    Reverse(): void {
        this.object.method('Reverse').invoke()
    }

    static localArray(mPtr: NativePointer): NativePointer {
        return mPtr.add(Process.pointerSize * 2).readPointer()
    }

}

declare global {
    var showList: (mPtr: NativePointer) => void
    var packList: (mPtr: NativePointer) => PackList
}

/**
 * 用来简单解析 unity 的 List<T> 类型
 * @param mPtr 指定一个指向 list 的指针
 * @param transformer 值变换函数：用来解析item内部的指定数据，返回一个字符串
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
globalThis.showList = (mPtr: NativePointer, transformer?: (item: Il2Cpp.Object) => string) => { new PackList(checkCmdInput(mPtr)).showList(transformer) }

globalThis.packList = (mPtr: NativePointer) => new PackList(checkCmdInput(mPtr))