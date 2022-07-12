

import { PTR } from "../base/enum"
import { TYPE_CHECK_POINTER } from "../base/globle"
import { checkPointer } from "./checkP"
import { readSingle, readU16, showArray } from "./reader"

// callFunction("strcmp",allocStr("123"),allocStr("123"))
// callFunction(["strcmp"],allocStr("123"),allocStr("123"))
// callFunction(["libc.so","strcmp"],allocStr("123"),allocStr("123"))
function callFunction(value: TYPE_CHECK_POINTER, ...args: any[]): NativePointer {
    try {
        if (value == undefined) return ptr(0x0)
        for (let i = 1; i <= (arguments.length < 5 ? 5 : arguments.length) - 1; i++)
            arguments[i] = arguments[i] == undefined ? ptr(0x0) : ptr(String(arguments[i]))
        return new NativeFunction(checkPointer(value, true), 'pointer', ['pointer', 'pointer', 'pointer', 'pointer'])
            (arguments[1], arguments[2], arguments[3], arguments[4])
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
const callFunctionRI = (mPtr: TYPE_CHECK_POINTER, ...args: any[]): number => callFunction(mPtr, ...args).toInt32()

// readSingle
const callFunctionRS = (mPtr: TYPE_CHECK_POINTER, ...args: any[]): number => readSingle(callFunction(mPtr, ...args))

// readFloat
const callFunctionRF = (mPtr: TYPE_CHECK_POINTER, ...args: any[]): number => alloc(p_size * 2).writePointer(callFunction(mPtr, ...args)).readFloat()

// 返回值为 Unity String
const callFunctionRUS = (mPtr: TYPE_CHECK_POINTER, ...args: any[]): string => readU16(callFunction(mPtr, ...args))

// 返回值为 C String
const callFunctionRCS = (mPtr: TYPE_CHECK_POINTER, ...args: any[]): string => {
    let tmpRet = callFunction(mPtr, ...args).readCString()
    return tmpRet == null ? "" : tmpRet
}

// 返回值为 [] / display / hashset size off:0x10
const callFunctionRA = (mPtr: TYPE_CHECK_POINTER, ...args: any[]): void => showArray(callFunction(mPtr, ...args))

export { callFunction, callFunctionRB, callFunctionRI, callFunctionRS, callFunctionRF, callFunctionRUS, callFunctionRCS, callFunctionRA }

declare global {
    var callFunction: (mPtr: TYPE_CHECK_POINTER, ...args: any[]) => NativePointer;
    var callFunctionRB: (mPtr: TYPE_CHECK_POINTER, ...args: any[]) => boolean;
    var callFunctionRI: (mPtr: TYPE_CHECK_POINTER, ...args: any[]) => number;
    var callFunctionRS: (mPtr: TYPE_CHECK_POINTER, ...args: any[]) => number;
    var callFunctionRF: (mPtr: TYPE_CHECK_POINTER, ...args: any[]) => number;
    var callFunctionRUS: (mPtr: TYPE_CHECK_POINTER, ...args: any[]) => string;
    var callFunctionRCS: (mPtr: TYPE_CHECK_POINTER, ...args: any[]) => string;
    var callFunctionRA: (mPtr: TYPE_CHECK_POINTER, ...args: any[]) => void;
    var callFunctionWithOutError: (mPtr: TYPE_CHECK_POINTER, ...args: any[]) => NativePointer;
}

globalThis.callFunction = callFunction
globalThis.callFunctionRB = callFunctionRB
globalThis.callFunctionRI = callFunctionRI
globalThis.callFunctionRS = callFunctionRS
globalThis.callFunctionRF = callFunctionRF
globalThis.callFunctionRUS = callFunctionRUS
globalThis.callFunctionRCS = callFunctionRCS
globalThis.callFunctionRA = callFunctionRA
globalThis.callFunctionWithOutError = callFunctionWithOutError