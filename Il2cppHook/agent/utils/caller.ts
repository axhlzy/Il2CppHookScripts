
import { TYPE_CHECK_POINTER } from "../base/globle"
import { checkPointer } from "./checkP"
import { readSingle, readU16, showArray } from "./reader"

// callNativePointer
function callNp(value: NativePointer, ...args: any[]): NativePointer {
    try {
        for (let i = 1; i <= (arguments.length < 5 ? 5 : arguments.length) - 1; i++)
            arguments[i] = arguments[i] == undefined ? ptr(0x0) : ptr(String(arguments[i]))
        return new NativeFunction(value, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer'])
            (arguments[1], arguments[2], arguments[3], arguments[4])
    } catch (e) {
        LOG(e, LogColor.C95)
        return ptr(0)
    }
}

function callFunction(value: TYPE_CHECK_POINTER, ...args: any[]): NativePointer {
    try {
        if (value == undefined) return ptr(0x0)
        let G_Value: NativePointer = ptr(0)
        if (args.length > 4) {
            throw new Error("callFunction: args.length > 4 \n please modify the `callFunction`")
        }
        // deal with array of string as the first argument
        {
            let L_Value: NativePointer | null | undefined = ptr(0)
            if (value instanceof Array) {
                // callFunction(["UnityEngine.CoreModule", "Component", "get_gameObject", 0], args[0])
                if (value.length == 4) {
                    if (!(value[1] as string).includes(".")) {
                        L_Value = find_method(value[0] as string, value[1] as string, value[2] as string, value[3] as number)
                    } else {
                        L_Value = findMethod(value[0] as string, value[1] as string, value[2] as string, value[3] as number)?.relativeVirtualAddress
                    }
                }
                // callFunction(["libc.so","strcmp"],allocCStr("123"),allocCStr("123"))
                if (value.length == 2) L_Value = Module.findExportByName(value[0] as string, value[1] as string)
                // callFunction(["strcmp"],allocCStr("123"),allocCStr("123"))
                if (value.length == 1) L_Value = Module.findExportByName(null, value[1] as string)
                if (L_Value == undefined || L_Value.isNull()) return ptr(0x0)
                G_Value = L_Value
            } else if (value instanceof String) {
                // callFunction("strcmp",allocCStr("123"),allocCStr("123"))
                if (value.length == 1) L_Value = Module.findExportByName(null, value[1])
                if (L_Value == undefined || L_Value.isNull()) return ptr(0x0)
                G_Value = L_Value
            } else if (value instanceof NativePointer) {
                G_Value = value
            } else {
                G_Value = ptr(value)
            }
        }
        // in common use
        for (let i = 1; i <= (arguments.length < 6 ? 6 : arguments.length) - 1; i++)
            arguments[i] = arguments[i] == undefined ? ptr(0x0) : ptr(String(arguments[i]))
        let localP = checkPointer(G_Value, true)
        // LOGE(G_Value + " " + localP)
        return new NativeFunction(localP, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer', 'pointer'])
            (arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
    } catch (e) {
        LOG(e, LogColor.C95)
        return ptr(0)
    }
}

function callFunctionLong(value: TYPE_CHECK_POINTER, ...args: any[]): NativePointer {
    try {
        if (value == undefined) return ptr(0x0)
        let G_Value: NativePointer = ptr(0)
        if (args.length > 8) {
            throw new Error("callFunction: args.length > 6 \n please modify the `callFunction`")
        }
        // deal with array of string as the first argument
        {
            let L_Value: NativePointer | null | undefined = ptr(0)
            if (value instanceof Array) {
                // callFunction(["UnityEngine.CoreModule", "Component", "get_gameObject", 0], args[0])
                if (value.length == 4) {
                    if (!(value[1] as string).includes(".")) {
                        L_Value = find_method(value[0] as string, value[1] as string, value[2] as string, value[3] as number)
                    } else {
                        L_Value = findMethod(value[0] as string, value[1] as string, value[2] as string, value[3] as number)?.relativeVirtualAddress
                    }
                }
                // callFunction(["libc.so","strcmp"],allocCStr("123"),allocCStr("123"))
                if (value.length == 2) L_Value = Module.findExportByName(value[0] as string, value[1] as string)
                // callFunction(["strcmp"],allocCStr("123"),allocCStr("123"))
                if (value.length == 1) L_Value = Module.findExportByName(null, value[1] as string)
                if (L_Value == undefined || L_Value.isNull()) return ptr(0x0)
                G_Value = L_Value
            } else if (value instanceof String) {
                // callFunction("strcmp",allocCStr("123"),allocCStr("123"))
                if (value.length == 1) L_Value = Module.findExportByName(null, value[1])
                if (L_Value == undefined || L_Value.isNull()) return ptr(0x0)
                G_Value = L_Value
            } else if (value instanceof NativePointer) {
                G_Value = value
            } else {
                G_Value = ptr(value)
            }
        }
        // in common use
        for (let i = 1; i <= (arguments.length < 10 ? 10 : arguments.length) - 1; i++)
            arguments[i] = arguments[i] == undefined ? ptr(0x0) : ptr(String(arguments[i]))
        let localP = checkPointer(G_Value, true)
        // LOGE(G_Value + " " + localP)
        return new NativeFunction(localP, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer', 'pointer', 'pointer', 'pointer', 'pointer', 'pointer'])
            (arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9])
    } catch (e) {
        LOG(e, LogColor.C95)
        return ptr(0)
    }
}

function callFunctionWithOutError(value: TYPE_CHECK_POINTER, ...args: any[]): NativePointer {
    try {
        if (value == undefined) return ptr(0x0)
        for (let i = 1; i <= (arguments.length < 5 ? 5 : arguments.length) - 1; i++)
            arguments[i] = arguments[i] == undefined ? ptr(0x0) : ptr(String(arguments[i]))
        return new NativeFunction(checkPointer(value, true), 'pointer', ['pointer', 'pointer', 'pointer', 'pointer'])
            (arguments[1], arguments[2], arguments[3], arguments[4])
    } catch (e) {
        return ptr(0)
    }
}

// 返回 boolean
const callFunctionRB = (mPtr: TYPE_CHECK_POINTER, ...args: any[]): boolean => callFunctionRI(mPtr, ...args) == 1

// 返回值 toInt32
const callFunctionRI = (mPtr: TYPE_CHECK_POINTER, ...args: any[]): number => callFunctionWithOutError(mPtr, ...args).toInt32()

// readSingle
const callFunctionRS = (mPtr: TYPE_CHECK_POINTER, ...args: any[]): number => readSingle(callFunctionWithOutError(mPtr, ...args))

// readFloat
const callFunctionRF = (mPtr: TYPE_CHECK_POINTER, ...args: any[]): number => allocP(2).writePointer(callFunctionWithOutError(mPtr, ...args)).readFloat()

// 返回值为 Unity String
const callFunctionRUS = (mPtr: TYPE_CHECK_POINTER, ...args: any[]): string => readU16(callFunction(mPtr, ...args))

// 返回stdstring
const callFunctionRSTDString = (mPtr: TYPE_CHECK_POINTER, ...args: any[]): string | null => {
    return readStdString(new NativeFunction(checkPointer(mPtr, true), ['pointer', 'pointer', 'pointer'], ['pointer', 'pointer', 'pointer', 'pointer'])(args[0], args[1], args[2], args[3] ?? ptr(0)))
}

// 返回值为 C String
const callFunctionRCS = (mPtr: TYPE_CHECK_POINTER, ...args: any[]): string => {
    let tmpRet = callFunction(mPtr, ...args).readCString()
    return tmpRet == null ? "" : tmpRet
}

// 返回值为 [] / display / hashset size off:0x10
const callFunctionRA = (mPtr: TYPE_CHECK_POINTER, ...args: any[]): void => showArray(callFunctionWithOutError(mPtr, ...args))

export { callFunction, callFunctionRB, callFunctionRI, callFunctionRS, callFunctionRF, callFunctionRUS, callFunctionRCS, callFunctionRA }

declare global {
    var callNp: (mPtr: NativePointer, ...args: any[]) => NativePointer
    var callFunction: (mPtr: TYPE_CHECK_POINTER, ...args: any[]) => NativePointer
    var callFunctionLong: (mPtr: TYPE_CHECK_POINTER, ...args: any[]) => NativePointer
    var callFunctionRB: (mPtr: TYPE_CHECK_POINTER, ...args: any[]) => boolean
    var callFunctionRI: (mPtr: TYPE_CHECK_POINTER, ...args: any[]) => number
    var callFunctionRS: (mPtr: TYPE_CHECK_POINTER, ...args: any[]) => number
    var callFunctionRF: (mPtr: TYPE_CHECK_POINTER, ...args: any[]) => number
    var callFunctionRUS: (mPtr: TYPE_CHECK_POINTER, ...args: any[]) => string
    var callFunctionRCS: (mPtr: TYPE_CHECK_POINTER, ...args: any[]) => string
    var callFunctionRA: (mPtr: TYPE_CHECK_POINTER, ...args: any[]) => void
    var callFunctionRSTDString: (mPtr: TYPE_CHECK_POINTER, ...args: any[]) => string | null
    var callFunctionWithOutError: (mPtr: TYPE_CHECK_POINTER, ...args: any[]) => NativePointer
}

globalThis.callNp = callNp
globalThis.callFunction = callFunction
globalThis.callFunctionLong = callFunctionLong
globalThis.callFunctionRB = callFunctionRB
globalThis.callFunctionRI = callFunctionRI
globalThis.callFunctionRS = callFunctionRS
globalThis.callFunctionRF = callFunctionRF
globalThis.callFunctionRUS = callFunctionRUS
globalThis.callFunctionRCS = callFunctionRCS
globalThis.callFunctionRA = callFunctionRA
globalThis.callFunctionRSTDString = callFunctionRSTDString
globalThis.callFunctionWithOutError = callFunctionWithOutError