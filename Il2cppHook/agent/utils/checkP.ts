import { TYPE_CHECK_POINTER } from "../base/globle"

/**
 * 判断mPtr是不是ilbil2cpp.so中的地址,自动加上基址
 * 只会自动添加上属于libil2cpp的基地址
 * @param {Pointer} value
 * @returns ptr
 */
const checkPointer = (value: TYPE_CHECK_POINTER, throwErr: boolean = false, showLog: boolean = false): NativePointer | NativePointerValue => {
    // if (typeof value == "number") value = ptr(value)
    // if (typeof value != "string" && !(value instanceof Array)) return ptr(0)
    // if (typeof value == "function") return value as NativePointer

    return Il2Cpp.module.base.add(ptr(value as unknown as number))
}

declare global {
    var checkPointer: Function
}

globalThis.checkPointer = checkPointer

export { checkPointer }
