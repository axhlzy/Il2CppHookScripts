import { getMethodDesFromMethodInfo } from "../bridge/fix/il2cppM"
import { allMethodsCacheArray, cacheMethods } from "../java/info"

// 打印java堆栈
const PrintStackTrace = () => LOG(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()), LogColor.C36)

// 补充用猜测的方式来补充打印il2cpp堆栈
var localSortedMethods: Array<Il2Cpp.Method> = []
const ptrMightBeMethod = (mPtr: NativePointer, withLog: boolean = true): Il2Cpp.Method | null => {
    allMethodsCacheArray.length == 0 ? cacheMethods(withLog) : null
    // sort allMethodsCacheArray as allMethodsCacheArray[0].virtualAddress save to localSortedMethods
    if (localSortedMethods.length == 0)
        localSortedMethods = allMethodsCacheArray.sort((a: Il2Cpp.Method, b: Il2Cpp.Method) => a.virtualAddress.compare(b.virtualAddress))
    let tmpMethod: Il2Cpp.Method | null = null
    for (let i = 0; i < allMethodsCacheArray.length - 1; i++) {
        let method: Il2Cpp.Method = allMethodsCacheArray[i]
        let nextMethod: Il2Cpp.Method = allMethodsCacheArray[i + 1]
        if (mPtr.compare(method.virtualAddress) >= 0
            && Math.abs(mPtr.sub(method.virtualAddress).toInt32()) < 0x10000
            && mPtr.compare(nextMethod.virtualAddress) < 0) {
            tmpMethod = method
            // LOGE(`[ptrMightBeMethod] ${mPtr} might be ${method.toString()}`)
            break
        }
    }
    return tmpMethod
}

// 打印native堆栈
var symbMethod: Map<string, string> = new Map() // 放成全局的有重复的直接使用不在重复去查找以提高速度
const PrintStackTraceNative = (ctx: CpuContext, fuzzy: boolean = false, retText: boolean = false, slice: number = 6): string | void => {
    let stacks: NativePointer[] = Thread.backtrace(ctx, fuzzy ? Backtracer.FUZZY : Backtracer.ACCURATE)
    stacks.forEach((frame: NativePointer, _index: number, _thisArr: NativePointer[]) => {
        if (symbMethod.has(frame.toString()))
            return
        let symb: DebugSymbol = DebugSymbol.fromAddress(frame)
        if (symb.moduleName == "libil2cpp.so" && symb.name?.startsWith("0x")) {
            let il2cppMethod: Il2Cpp.Method | null = ptrMightBeMethod(frame)
            if (il2cppMethod != null) {
                let offset = symb.address.sub(il2cppMethod.virtualAddress)
                symbMethod.set(frame.toString(), `MI:${il2cppMethod.handle} -> ${il2cppMethod.class.name} ${getMethodDesFromMethodInfo(il2cppMethod)} ${offset}↓`)
            }
        }
    })
    let tmpText: string = stacks
        .slice(0, slice)
        .map(DebugSymbol.fromAddress)
        .map((sym: DebugSymbol) => {
            let strRet: string = `${sym}`
            let md: Module | null = Process.findModuleByAddress(sym.address)
            let methodstr: string | undefined = symbMethod.get(sym.address.toString())
            if (md != null && md.name == "libil2cpp.so" && strRet.startsWith('0x'))
                strRet = `${strRet}\t| ${methodstr == undefined ? "null" : methodstr}`
            return strRet
        })
        .join("\n")
    return !retText ? LOGD(tmpText) : tmpText
}

var GetStackTrace = () => Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new())

var GetStackTraceNative = (ctx: CpuContext, level: number = 6) => {
    return Thread.backtrace(ctx, Backtracer.FUZZY)
        .slice(0, level)
        .map(frame => DebugSymbol.fromAddress(frame))
        .map(symbol => `${getLine(level == undefined ? 0 : level, "\n")}${symbol}\n`)
        .join("\n")
}

export { PrintStackTrace, PrintStackTraceNative, GetStackTrace, GetStackTraceNative }

declare global {
    var PrintStackTraceJava: () => void
    var GetStackTraceJava: () => void
    var PrintStackTraceNative: (ctx: CpuContext, fuzzy?: boolean, retText?: boolean, slice?: number, reverse?: boolean) => string | void
    var GetStackTraceNative: (ctx: CpuContext, level?: number) => string
}

// java stack
globalThis.PrintStackTraceJava = PrintStackTrace
globalThis.GetStackTraceJava = GetStackTrace
// native stack
globalThis.PrintStackTraceNative = PrintStackTraceNative
globalThis.GetStackTraceNative = GetStackTraceNative