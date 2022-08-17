import { TYPE_CHECK_POINTER } from "../base/globle"

/**
 * 判断mPtr是不是ilbil2cpp.so中的地址,自动加上基址
 * 只会自动添加上属于libil2cpp的基地址,没有找到的地址直接返回
 * @param {TYPE_CHECK_POINTER} value
 * @returns {NativePointer}
 */
const checkPointer = (value: TYPE_CHECK_POINTER, throwErr: boolean = false, showLog: boolean = false): NativePointer => {
    if (Il2Cpp.module.base.isNull()) return ptr(value as unknown as number)
    if (Process.arch == 'arm64' && typeof value === "string" && value.trim().startsWith('0x')) value = Number(value)
    if (typeof value === "number") {
        return calPointer(ptr(value))
    } else if (typeof value === "string") {
        return Module.findExportByName(null, value) as NativePointer
    } else if (typeof value === "function") {
        return value as NativePointer
    } else if (typeof value === "object") {
        if (value instanceof NativePointer) {
            return calPointer(value)
        } else if (value instanceof Array<string | number>) {
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
    }
    return ptr(0)

    function calPointer(mPtr: NativePointer): NativePointer {
        if (mPtr.isNull() || !mPtr.compare(soAddr)) return mPtr
        try {
            let tmpValue: Module | null = Process.findModuleByAddress(mPtr)
            if (tmpValue === null) {
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
}

declare global {
    var checkPointer: (args: NativePointer | number) => NativePointer
}

globalThis.checkPointer = checkPointer as any

export { checkPointer }
