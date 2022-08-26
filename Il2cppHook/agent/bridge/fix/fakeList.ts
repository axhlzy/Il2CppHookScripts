import { formartClass } from "../../utils/formart"

interface list_impl {
    handle: NativePointer
    _defaultCapacity: number
    _emptyArray: NativePointer
    _items: NativePointer
    _size: number
    _version: number
    _syncRoot: Il2cpp.Object
}

export class parseList extends Il2cpp.Object implements list_impl {

    public _defaultCapacity: number = lfv(this.handle, "_defaultCapacity").toInt32()
    public _emptyArray: NativePointer = lfv(this.handle, "_emptyArray")
    public _items: NativePointer = lfv(this.handle, "_items")
    public _size: number = lfv(this.handle, "_size").toInt32()
    public _version: number = lfv(this.handle, "_version").toInt32()
    public _syncRoot: Il2cpp.Object = new Il2cpp.Object(lfv(this.handle, "_syncRoot"))

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    toShow(): void {
        newLine()
        formartClass.printTitileA(`${new Il2cpp.Object(this.handle).toString()} @ ${this.handle}`)
        LOGJSON(this)
    }

    toString(): string {
        return JSON.stringify(this)
    }

    // 返回指针，拿到指针后再用 new class(handle) 来包装它并调用其成员
    // 从0 开始计数
    getItem(index: number = 0): NativePointer {
        if (Process.arch != "arm") return ptr(0)  // TODO : arm64 的 list 内存结构未做验证
        if (index + 1 > this._size) throw new Error(`Out of list range: this list maxLen = ${this._size}, input index = ${index + 1}`)
        return this._items.add(p_size * (4 + index)).readPointer()
    }

    foreach(callback: (item: NativePointer) => void): void {
        for (let i = 0; i < this._size; i++) callback(this.getItem(i))
    }

    toArray(): NativePointer[] {
        const arr: Array<NativePointer> = []
        this.foreach(item => arr.push(item))
        return arr
    }

    // todo error while calcuate real ptr
    toSimpleString(): string {
        return this.toArray().map(item => {
            let action = item.add(p_size * 2).readPointer()
            let method = new Il2cpp.Delegate(action).method
            LOGE(`\t${method.readPointer().readPointer().sub(soAddr)}`)
            return `${getLine(4, " ")}${item} ("${new Il2Cpp.Object(item).toString()}")`
        }).join(getLine(4, " "))
    }
}

declare global {
    var parseList: (mPtr: NativePointer) => parseList
}

globalThis.parseList = (mPtr: NativePointer) => new parseList(checkCmdInput(mPtr))