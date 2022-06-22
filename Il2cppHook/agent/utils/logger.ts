import { GKEY, LogColor } from "../base/enum";
import { GET_GT, SET_G } from "../base/globle";

const setNeedLog = (flag: boolean): void => SET_G(GKEY.LogFlag, flag) as unknown as void;

const getNeedLog = (): boolean => GET_GT<boolean>(GKEY.LogFlag)

export const LOG = (str: any, type: LogColor = LogColor.WHITE): void => {
    switch (type) {
        case LogColor.WHITE: console.log(str); break
        case LogColor.RED: console.error(str); break
        case LogColor.YELLOW: console.warn(str); break
        default: console.log("\x1b[" + type + "m" + str + "\x1b[0m"); break
    }
}

export const LOGW = (msg: any): void => LOG(msg, LogColor.YELLOW)
export const LOGE = (msg: any): void => LOG(msg, LogColor.RED)
export const LOGD = (msg: any): void => LOG(msg, LogColor.C36)
export const LOGO = (msg: any): void => LOG(msg, LogColor.C33)
export const LOGH = (msg: any): void => LOG(msg, LogColor.C96)

export function printLogColors(): void {
    let str = "123456789"
    console.log("----------------  listLogColors  ----------------")
    for (let i = 30; i <= 37; i++) {
        console.log("\t\t\x1b[" + i + "m" + i + "\t" + str + "\x1b[0m")
    }
    console.log("----------------------------------------------")
    for (let i = 40; i <= 47; i++) {
        console.log("\t\t\x1b[" + i + "m" + i + "\t" + str + "\x1b[0m")
    }
    console.log("----------------------------------------------")
    for (let i = 90; i <= 97; i++) {
        console.log("\t\t\x1b[" + i + "m" + i + "\t" + str + "\x1b[0m")
    }
    console.log("----------------------------------------------")
    for (let i = 100; i <= 107; i++) {
        console.log("\t\t\x1b[" + i + "m" + i + "\t" + str + "\x1b[0m")
    }
    console.log("----------------------------------------------")
}

let linesMap = new Map()
export const getLine = (length: number, fillStr: string = "-") => {
    let key = length + "|" + fillStr
    if (linesMap.get(key) != null) return linesMap.get(key)
    for (var index = 0, tmpRet = ""; index < length; index++) tmpRet += fillStr
    linesMap.set(key, tmpRet)
    return tmpRet
}

declare global {
    var LOG: (str: any, type?: LogColor) => void
    var LOGW: (msg: any) => void // LogColor.YELLOW
    var LOGE: (msg: any) => void // LogColor.RED
    var LOGD: (msg: any) => void // LogColor.C36
    var LOGO: (msg: any) => void // LogColor.C33
    var LOGH: (msg: any) => void // LogColor.C96
    var getLine: (length: number, fillStr?: string) => string
    var printLogColors: () => void
    var LogColor: any
}

globalThis.LOG = LOG
globalThis.LOGW = LOGW
globalThis.LOGE = LOGE
globalThis.LOGD = LOGD
globalThis.LOGO = LOGO
globalThis.LOGH = LOGH
globalThis.getLine = getLine
globalThis.printLogColors = printLogColors
globalThis.LogColor = LogColor