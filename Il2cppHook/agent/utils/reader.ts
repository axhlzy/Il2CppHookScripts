import { LogColor, PTR } from "../base/enum"
import { ARGM } from "../base/globle"
import { PTR2NativePtr } from "./common"

// 读取浮点数 ptr().readFloat() === readSingle(ptr().readPointer())
const readSingle = (value: NativePointer): number => alloc(2).writePointer(value).readFloat()

const readBoolean = (value: NativePointer): boolean => alloc(0.25).writePointer(value).readU8() == 0x1

const readInt = (value: NativePointer): number => alloc().writePointer(value).readInt()

const readUInt = (value: NativePointer): number => alloc(1).writePointer(value).readUInt()

const readUInt64 = (value: NativePointer): UInt64 => alloc(2).writePointer(value).readU64()

/**
 * 读取 c# 字符串
 * @param {Number} mPtr c#字符串指针}
 */
const readU16 = (mPtr: ARGM): string => {
    if (typeof mPtr == "number") mPtr = ptr(mPtr)
    if (mPtr == undefined || mPtr == ptr(0)) return ""
    try {
        return mPtr.add(p_size * 2 + 4).readUtf16String()
    } catch (e) {
        return ""
    }
}

const showArray = (mPtr: ARGM): void => {

    if (typeof mPtr == "number") mPtr = ptr(mPtr)
    if (mPtr == undefined || mPtr == ptr(0)) return
    let retPtr = mPtr
    let arrLength = retPtr.add(p_size * 3).readUInt()
    LOGD("\n[*] Array length : " + arrLength + "  |  RET => " + retPtr + "\n")
    if (arrLength == 0) return
    seeHexA(retPtr.add(p_size * 4), (arrLength > 32 ? 32 : arrLength) * p_size, false, LogColor.C33)
    LOG("\n")
    for (let i = 0; i < arrLength; ++i) {
        let tmpPtr = retPtr.add(p_size * (4 + i))
        let ObjToString = callFunctionRUS(find_method("mscorlib", "Object", "ToString", 0), tmpPtr.readPointer())
        if (ObjToString == "UnityEngine.UI.Text")
            ObjToString += ("\t" + callFunctionRUS(find_method("UnityEngine.UI", "Text", "get_text", 0), tmpPtr.readPointer()))
        LOGD(String("[" + i + "]").padEnd(5, " ") + " " + tmpPtr + " ---> " + tmpPtr.readPointer() + "  |  " + ObjToString)
    }
    LOG("\n")
}

var seeHexR = (addr: PTR, length: number = 0x40, color: LogColor | undefined) => {
    addr = PTR2NativePtr(addr)
    LOG(hexdump(addr.readPointer(), {
        length: length
    }), color == undefined ? LogColor.WHITE : color)
}

var seeHexA = (addr: PTR, length: number = 0x40, header: boolean = true, color: any | undefined) => {
    addr = PTR2NativePtr(addr)
    LOG(hexdump(addr, {
        length: length,
        header: header,
    }), color == undefined ? LogColor.WHITE : color)
}

export { readSingle, readBoolean, readInt, readUInt, readUInt64, readU16, showArray, seeHexR, seeHexA }

declare global {
    var readSingle: (value: NativePointer) => number
    var readBoolean: (value: NativePointer) => boolean
    var readInt: (value: NativePointer) => number
    var readUInt: (value: NativePointer) => number
    var readUInt64: (value: NativePointer) => UInt64
    var readU16: (mPtr: ARGM) => string
    var showArray: (mPtr: ARGM) => void
    var seeHexR: (addr: PTR, length?: number, color?: LogColor | undefined) => void
    var seeHexA: (addr: PTR, length?: number, header?: boolean, color?: any | undefined) => void
}

globalThis.readSingle = readSingle
globalThis.readBoolean = readBoolean
globalThis.readInt = readInt
globalThis.readUInt = readUInt
globalThis.readUInt64 = readUInt64
globalThis.readU16 = readU16
globalThis.showArray = showArray
globalThis.seeHexR = seeHexR
globalThis.seeHexA = seeHexA