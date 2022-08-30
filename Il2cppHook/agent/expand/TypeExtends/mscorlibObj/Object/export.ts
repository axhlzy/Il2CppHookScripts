import { mscorlib_System_Object_impl } from "../class"
import { UnityEngine_Object } from "./class"

const getObjName = (mPtr: NativePointer): string => {
    if (mPtr instanceof NativePointer && !mPtr.isNull()) {
        return new mscorlib_System_Object_impl(mPtr).toString()
    } else if (typeof mPtr == "number" && mPtr != 0) {
        return new mscorlib_System_Object_impl(ptr(mPtr)).toString()
    }
    return ""
}

const getObjClass = (mPtr: NativePointer): NativePointer => {
    if (typeof mPtr == "number") mPtr = ptr(mPtr)
    let obj = new UnityEngine_Object(mPtr)
    return obj.class.handle
}

export { getObjName, getObjClass }

declare global {
    var getObjName: (mPtr: NativePointer) => string
    var getObjClass: (mPtr: NativePointer) => NativePointer
}

globalThis.getObjName = getObjName
globalThis.getObjClass = getObjClass