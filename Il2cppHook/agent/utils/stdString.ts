const get_PrettyMethod = () => {
    let PrettyMethod_ptr = Module.findExportByName("libart.so", "_ZN3art9ArtMethod12PrettyMethodEb")
    if (PrettyMethod_ptr == null) {
        LOGD(`libart.so PrettyMethod_ptr is null`)
        return
    }
    LOGD(`PrettyMethod_ptr => ${PrettyMethod_ptr}`)
    let PrettyMethod_func = new NativeFunction(PrettyMethod_ptr, ["pointer", "pointer", "pointer"], ["pointer", "bool"])
    return PrettyMethod_func
}

globalThis.readStdString = (pointers: NativePointer[]) => {
    let str = Memory.alloc(Process.pointerSize * 3)
    str.writePointer(pointers[0])
    str.add(Process.pointerSize * 1).writePointer(pointers[1])
    str.add(Process.pointerSize * 2).writePointer(pointers[2])
    let isTiny = (str.readU8() & 1) === 0
    if (isTiny) return str.add(1).readUtf8String()
    return str.add(2 * Process.pointerSize).readPointer().readUtf8String()
}

export { readStdString, get_PrettyMethod }

declare global {
    var readStdString: (pointers: NativePointer[]) => string | null
}

