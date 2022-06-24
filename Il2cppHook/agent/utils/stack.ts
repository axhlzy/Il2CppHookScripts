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

var GetStackTraceN = (ctx: CpuContext, level: number = 6) => {
    return Thread.backtrace(ctx, Backtracer.FUZZY)
        .slice(0, level)
        // .reverse()
        .map(frame => DebugSymbol.fromAddress(frame))
        // .map(symbol => `${getLine(level==undefined?0:level,"\n")}${symbol}\n`)
        .join("\n")
}
export { PrintStackTrace, PrintStackTraceN, GetStackTrace, GetStackTraceN }

declare global {
    var PrintStackTrace: () => void
    var PrintStackTraceN: (ctx: CpuContext, retText?: boolean, slice?: number, reverse?: boolean) => string | void
    var GetStackTrace: () => void
    var GetStackTraceN: (ctx: CpuContext, level?: number) => string
}

globalThis.PrintStackTrace = PrintStackTrace
globalThis.PrintStackTraceN = PrintStackTraceN
globalThis.GetStackTrace = GetStackTrace
globalThis.GetStackTraceN = GetStackTraceN