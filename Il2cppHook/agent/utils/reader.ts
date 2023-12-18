import { LogColor, PTR } from "../base/enum"
import { ARGM } from "../base/globle"
import { PTR2NativePtr } from "./common"

const readSingle = (value: NativePointer): number => allocP().writePointer(value).readFloat()

const readBoolean = (value: NativePointer): boolean => alloc(1).writePointer(value).readU8() == 0x1

const readInt = (value: NativePointer): number => allocP().writePointer(value).readInt()

const readUInt = (value: NativePointer): number => allocP().writePointer(value).readUInt()

const readInt64 = (value: NativePointer): UInt64 => allocP(2).writePointer(value).readS64()

const readUInt64 = (value: NativePointer): UInt64 => allocP(2).writePointer(value).readU64()

/**
 * 读取 c# 字符串
 * @param {Number} mPtr c#字符串指针}
 */
const readU16 = (mPtr: ARGM): string => {
    if (typeof mPtr == "number") mPtr = ptr(mPtr)
    if (typeof mPtr == "string" && (String(mPtr).startsWith('0x') || String(mPtr).startsWith('0X'))) mPtr = ptr(mPtr)
    if (mPtr instanceof NativePointer) mPtr = mPtr
    if (mPtr == undefined || mPtr == 0) return ""
    try {
        return mPtr.add(p_size * 2 + 4).readUtf16String()
    } catch { return "" }
}

// const readStdString_ = (str) => {
//     str = ptr(str)
//     const isTiny = (str.readU8() & 1) === 0;
//     if (isTiny) {
//         return str.add(1).readUtf8String();
//     }
//     return str.add(2 * Process.pointerSize).readPointer().readUtf8String();
// }

// funcTransform 自定义解析函数
const showArray = (mPtr: ARGM, funcTransform?: (itemPtr: NativePointer, objName: string) => string): void => {

    if (typeof mPtr == "number") mPtr = ptr(mPtr)
    if (mPtr == undefined || mPtr == ptr(0)) return
    let retPtr = mPtr
    let arrLength = retPtr.add(p_size * 3).readUInt()
    LOGD(`\n[*] Array length : ${arrLength}  |  RET => ${retPtr}\n`)
    if (arrLength == 0 || arrLength >= 20) return
    seeHexA(retPtr.add(p_size * 4), (arrLength > 32 ? 32 : arrLength) * p_size, false, LogColor.C33)
    newLine()
    for (let i = 0; i < arrLength; ++i) {
        let tmpPtr = ptr(retPtr).add(p_size * (4 + i))
        try {
            var relItem = tmpPtr.readPointer()
        } catch {
            LOGE("Not support type")
            newLine()
            return
        }
        let ObjToString = ""
        try {
            ObjToString = `${getType(relItem).toString()} | ${new Il2Cpp.Object(relItem).toString()}`
        } catch {
            ObjToString = new Il2Cpp.Object(relItem).toString()
        }
        // 常用解析
        if (ObjToString.indexOf("String"))
            ObjToString += `\t|${readU16(relItem)}|`
        if (ObjToString.indexOf("Text"))
            ObjToString += `\t${callFunctionRUS(["UnityEngine.UI", "Text", "get_fontSize", 0])} ${relItem}`
        if (ObjToString.indexOf("TermData") || ObjToString.indexOf("LanguageData"))
            ObjToString += `\t | ${readU16(tmpPtr.readPointer().add(0x8).readPointer())}| `
        LOGD(String("[" + i + "]").padEnd(5, " ") + " " + tmpPtr + " ---> " + relItem + "  |  " + ObjToString)
        // 自定义解析
        if (funcTransform != undefined && typeof funcTransform == "function") LOG("\t" + funcTransform(relItem, ObjToString), LogColor.C90)
    }
    newLine()
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

// test code 
rpc.exports = {
    find_base_address: function (muduleName, offset = 0, length = 0x60) {
        console.log("findBase muduleName: " + Module.findBaseAddress(muduleName))
        return muduleName
    }
}

const getFloat = (intNum: number): NativePointer => alloc(1).writeFloat(intNum).readPointer()

export { readSingle, readBoolean, readInt, readUInt, readUInt64, readInt64, readU16, showArray, seeHexR, seeHexA, getFloat }

declare global {
    var readSingle: (value: NativePointer) => number
    var readBoolean: (value: NativePointer) => boolean
    var readInt: (value: NativePointer) => number
    var readUInt: (value: NativePointer) => number
    var readInt64: (value: NativePointer) => Int64
    var readUInt64: (value: NativePointer) => UInt64
    var readU16: (mPtr: ARGM) => string
    var showArray: (mPtr: ARGM, funcTransform?: (itemPtr: NativePointer, objName: string) => string) => void
    var seeHexR: (addr: PTR, length?: number, color?: LogColor | undefined) => void
    var seeHexA: (addr: PTR, length?: number, header?: boolean, color?: any | undefined) => void
    var getFloat: () => NativePointer
    // var readStdString: (str: any) => void
}

globalThis.readSingle = readSingle
globalThis.readBoolean = readBoolean
globalThis.readInt = readInt
globalThis.readUInt = readUInt
globalThis.readInt64 = readInt64
globalThis.readUInt64 = readUInt64
globalThis.readU16 = readU16
globalThis.showArray = showArray
globalThis.seeHexR = seeHexR
globalThis.seeHexA = seeHexA