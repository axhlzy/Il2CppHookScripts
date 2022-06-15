// 打印java堆栈
const PrintStackTrace = () => LOG(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()), LogColor.C36)

// 打印native堆栈
const PrintStackTraceN = (ctx: CpuContext, retText: boolean = false, slice: number = 6, reverse: boolean = false): string | void => {
    let tmpText: string = ""
    if (reverse) {
        tmpText = Thread.backtrace(ctx, Backtracer.FUZZY)
            .slice(0, slice)
            .reverse()
            .map(DebugSymbol.fromAddress).join("\n")
    } else {
        tmpText = Thread.backtrace(ctx, Backtracer.FUZZY)
            .slice(0, slice)
            .map(DebugSymbol.fromAddress).join("\n")
    }
    return !retText ? LOGD(tmpText) : tmpText
}

var GetStackTrace = () => Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new())

var GetStackTraceN = (ctx: CpuContext, level?: number) => {
    return Thread.backtrace(ctx, Backtracer.FUZZY)
        .slice(0, level === undefined ? 6 : level)
        // .reverse()
        .map(frame => DebugSymbol.fromAddress(frame))
        // .map(symbol => `${getLine(level==undefined?0:level,"\n")}${symbol}\n`)
        .join("\n")
}
export { PrintStackTrace, PrintStackTraceN, GetStackTrace, GetStackTraceN }

declare global {
    var PrintStackTrace: Function
    var PrintStackTraceN: Function
    var GetStackTrace: Function
    var GetStackTraceN: Function
}

globalThis.PrintStackTrace = PrintStackTrace
globalThis.PrintStackTraceN = PrintStackTraceN
globalThis.GetStackTrace = GetStackTrace
globalThis.GetStackTraceN = GetStackTraceN