import { TYPE_CHECK_POINTER } from "../base/globle"

/**
 * 判断mPtr是不是ilbil2cpp.so中的地址,自动加上基址
 * 只会自动添加上属于libil2cpp的基地址
 * @param {Pointer} value
 * @returns ptr
 */
const checkPointer = (value: TYPE_CHECK_POINTER, throwErr: boolean = false, showLog: boolean = false): NativePointer => {
    if (typeof value == "number") value = ptr(value)
    if (typeof value != "string" && !(value instanceof Array) && value.isNull()) return ptr(0)
    let tmpValue: NativePointer | null
    if (value instanceof Array) {
        switch (value.length) {
            case 1:
                // checkPointer(["expName"])
                if (typeof value[0] == "string")
                    tmpValue = Module.findExportByName(null, value[0])
                break
            case 2:
                // checkPointer(["mdName","expName"])
                if (typeof value[0] == "string" && typeof value[1] == "string")
                    tmpValue = Module.findExportByName(value[0], value[1])
                break
            case 4:
                // find_method(imageName, className, functionName, argsCount, isRealAddr)
                if (typeof value[0] == "string" && typeof value[1] == "string" && typeof value[2] == "string" && typeof value[3] == "number")
                    value = find_method(value[0], value[1], value[2], value[3])
                break
            default:
                value = ptr(0)
                break
        }
    } else {
        // checkPointer("expName")
        tmpValue = Module.findExportByName(null, value as string)
        if (tmpValue?.isNull() && value instanceof Array) tmpValue = Module.findExportByName(Il2Cpp.module.name, value[0])
    }
    if (throwErr != undefined && (value as NativePointer) == ptr(0)) {
        LOGE("Can't call ptr 0x0")
        return ptr(0)
    }
    if ((value as NativePointer) == ptr(0)) return ptr(0)
    try {
        var t0 = Il2Cpp.module.base.add(Number(value)) ?? ptr(0)
        var t1 = Process.findModuleByAddress(t0)?.base ?? ptr(0)
        var retValue = Process.findModuleByAddress(value as NativePointer) == null ? t1.add(value as NativePointer) : value
    } catch {
        var retValue = value
    }
    if (!showLog) return retValue as NativePointer
    let moduleValue = Process.findModuleByAddress(retValue as NativePointer)
    let moduleStr = JSON.stringify(moduleValue)
    if (moduleValue == null) return ptr(0)
    LOG(`${getLine(moduleStr.length)}\n[*] ${retValue} ---> ${(retValue as NativePointer).sub(moduleValue.base)}\n
    ${moduleStr}\n${getLine(moduleStr.length)}`, LogColor.C36)
    return retValue as NativePointer
}

declare global {
    var checkPointer: (value: TYPE_CHECK_POINTER | number | string | Array<string>, throwErr?: boolean, showLog?: boolean) => NativePointer
}

globalThis.checkPointer = checkPointer

export { checkPointer }
