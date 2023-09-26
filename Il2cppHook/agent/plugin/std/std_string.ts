const STD_STRING_SIZE = 3 * Process.pointerSize
export class StdString {

    handle: NativePointer

    constructor(mPtr: NativePointer = Memory.alloc(STD_STRING_SIZE)) {
        this.handle = mPtr
    }

    setHandle(handle: NativePointer) {
        this.handle = handle
    }

    dispose() {
        // const [data, isTiny] = this._getData()
        // if (!isTiny) {
        //     Java.api.$delete(data)
        // }
    }

    disposeToString(): string {
        const result = this.toString()
        this.dispose()
        return result
    }

    toString(): string {
        const [data, _isTiny] = this._getData()
        let str: string | null = (data as NativePointer).readUtf8String()
        if (str == null) str = ""
        return str
    }

    _getData() {
        const str = this.handle
        const isTiny = (str.readU8() & 1) === 0
        const data = isTiny ? str.add(1) : str.add(2 * Process.pointerSize).readPointer()
        return [data, isTiny]
    }
}