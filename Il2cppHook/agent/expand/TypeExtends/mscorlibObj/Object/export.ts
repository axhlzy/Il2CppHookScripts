import { ObjectIl2cpp_impl } from "./class"

const getObjName = (mPtr: NativePointer): string => {
    if (typeof mPtr == "number" && mPtr != 0) {
        return new ObjectIl2cpp_impl(ptr(mPtr)).get_name()
    } else if (mPtr instanceof NativePointer && !mPtr.isNull()) {
        return new ObjectIl2cpp_impl(mPtr).get_name()
    }
    return ""
}

const getObjClass = (mPtr: NativePointer): NativePointer => {
    if (typeof mPtr == "number") mPtr = ptr(mPtr)
    let obj = new ObjectIl2cpp_impl(mPtr)
    return obj.class.handle
}

export { getObjName, getObjClass }

declare global {
    var getObjName: (mPtr: NativePointer) => string
    var getObjClass: (mPtr: NativePointer) => NativePointer
}

globalThis.getObjName = getObjName
globalThis.getObjClass = getObjClass