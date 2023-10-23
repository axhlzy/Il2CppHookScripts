import { TYPE_CHECK_POINTER } from "../base/globle"

/**
 * 判断mPtr是不是ilbil2cpp.so中的地址,自动加上基址
 * 只会自动添加上属于libil2cpp的基地址,没有找到的地址直接返回
 * @param {TYPE_CHECK_POINTER} value
 * @returns {NativePointer}
 */
var baseAddress: NativePointer = ptr(0)

setImmediate(() => {
    Il2Cpp.perform(() => {
        let errorTimes: number = 0
        let task = setInterval(() => {
            try {
                baseAddress = Process.findModuleByName("libil2cpp.so")!.base
            } catch {
                ++errorTimes
            }
            if (!baseAddress.isNull() || errorTimes > 10) clearInterval(task)
        }, 200)
    })
})

export let checkPointer = (value: TYPE_CHECK_POINTER, throwErr: boolean = false, _showLog: boolean = false): NativePointer => {
    if (Process.findModuleByName("libil2cpp.so") == null) return value as NativePointer
    if (baseAddress.isNull()) baseAddress = Il2Cpp.module.base
    if (baseAddress.isNull()) throw new Error("checkPointer: libil2cpp.so not found ! \n please call setBaseAddress first")

    function innerCall(value: TYPE_CHECK_POINTER, throwErr?: boolean, _showLog?: boolean): NativePointer {
        // if (String(value).startsWith("0x") || String(value).startsWith("0X") && String(value).length >= 15)  // 0xb400007096672af0
        //     throw new Error("checkPointer: Error type")
        if (Process.arch == 'arm64' && typeof value === "string" && value.trim().startsWith('0x')) value = Number(value)
        switch (typeof value) {
            case 'number':
                return calPointer(ptr(value))
            case 'string':
                return Module.findExportByName(null, value) as NativePointer
            case 'function':
                return value as NativePointer
            case 'object':
                if (value instanceof NativePointer) {
                    return calPointer(value)
                } else if (value instanceof Array) {
                    if (!checkValue(value as Array<string | number>)) {
                        if (throwErr) throw new Error("checkPointer: checkValue Error")
                        else return ptr(0)
                    }
                    switch (value.length) {
                        case 1:
                            return Module.findExportByName(null, value[0] as string) as NativePointer
                        case 2:
                            return Module.findExportByName(value[0] as string, value[1] as string) as NativePointer
                        case 3:
                            return find_method(value[0] as string, value[1] as string, value[2] as string, value[3] as number)
                        default:
                            if (throwErr) throw new Error("checkPointer:UnKnow value length \nArray<> length must be 1,2,3")
                            else return ptr(0)
                    }
                } else {
                    if (throwErr) throw new Error("checkPointer: Error type")
                    else return ptr(0)
                }
            default:
                throw new Error("checkPointer: Error type")
        }
    }

    function calPointer(mPtr: NativePointer): NativePointer {
        if (mPtr.isNull() || !mPtr.compare(soAddr)) return mPtr
        try {
            let tmpValue: Module | null = Process.findModuleByAddress(mPtr)
            if (tmpValue === null) {
                soAddr
                let addValue = Il2Cpp.module.base.add(mPtr)
                let tmpModule = Process.findModuleByAddress(addValue)
                if (tmpModule === null) {
                    if (throwErr) throw new Error("checkPointer: can't find module")
                    else return ptr(0)
                }
                else return addValue
            } else return mPtr
        } catch (error) {
            if (throwErr) throw error
            return ptr(0)
        }
    }

    function checkValue(value: Array<number | string>): boolean {
        if (value.length == 3) {
            if (typeof value[0] !== "string") return false
            if (typeof value[1] !== "string") return false
            if (typeof value[2] !== "number") return false
        }
        for (let i = 0; i < value.length; i++) {
            if (value.length != 3) {
                if (typeof value[i] !== "string") return false
            }
        }
        return true
    }

    const ret = innerCall(value, throwErr, _showLog)
    checkPointer = innerCall
    return ret
}

globalThis.checkPointer = checkPointer as any

export const checkCmdInput = (mPtr: NativePointer | NativePointerValue | number | string | Function): NativePointer => {
    if (mPtr == undefined || (mPtr instanceof NativePointer && mPtr.isNull())) throw new Error("checkCmdInput: null pointer")
    if (mPtr instanceof NativePointer) return mPtr
    switch (typeof mPtr) {
        case "number":
            return ptr(mPtr)
        case "string":
            if (mPtr.startsWith("0x") || mPtr.startsWith("0X")) return ptr(mPtr)
        case "function":
            return ptr(mPtr as any)
        default:
            throw new Error("checkCmdInput: Error type")
    }
}

const getMD = (mdName: string | NativePointer = "libil2cpp.so"): Module => {
    let md: Module = Process.findModuleByName("libil2cpp.so")!
    switch (typeof mdName) {
        case "number":
            try {
                md = Process.getModuleByAddress(mdName)!
            } catch {
                md = Process.findModuleByName(mdName)!
            }
            break
        case "string":
            try {
                md = Process.findModuleByName(mdName)!
            } catch (error) { throw error }
            break
        default:
            mdName = ptr(<string><unknown>mdName)
            break
    }
    if (md == null) throw new Error("getSubBasePtr: can't find module")
    return md
}

globalThis.getSubBasePtr = (mPtr: NativePointer): NativePointer => mPtr.sub(getMD(mPtr).base)

globalThis.getSubBaseDes = (mPtr: NativePointer): string => {
    let md: Module = getMD(mPtr)
    return `${mPtr.sub(md.base)} <--- ${mPtr} @ ${md.name} (${md.base})`
}

globalThis.setBaseAddress = (mPtr: NativePointer): void => { baseAddress = checkCmdInput(mPtr) }

globalThis.getBaseAddress = (): NativePointer => baseAddress

globalThis.checkCmdInput = checkCmdInput

declare global {
    var checkPointer: (args: NativePointer | number | string) => NativePointer
    var checkCmdInput: (mPtr: NativePointer | NativePointerValue | number | string | Function) => NativePointer
    var getSubBasePtr: (mPtr: NativePointer, mdName?: string) => NativePointer
    var getSubBaseDes: (mPtr: NativePointer, mdName?: string) => string
    var setBaseAddress: (mPtr: NativePointer) => void
    var getBaseAddress: () => NativePointer
}

