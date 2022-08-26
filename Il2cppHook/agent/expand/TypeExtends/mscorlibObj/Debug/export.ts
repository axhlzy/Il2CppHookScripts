
const HookDebugLog = () => {
    // public static void Log(object message)
    // A(find_method("UnityEngine.CoreModule", "Debug", "Log", 1, true), (args) => {
    //     LOG("\n[*] Debug.LOG('" + readU16(args[0]) + "')", LogColor.C36)
    // })

    // public void Log(LogType logType, object message)
    let addr_Log = find_method("UnityEngine.CoreModule", "Logger", "Log", 2, true)
    LOGD("[*] Hook : UnityEngine.CoreModule.Logger.Log : " + addr_Log)
    A(addr_Log, (args, ctx) => {
        LOGG(`\n[*] Logger.LOG('${args[1]}' , '${readU16(args[2])}')  <---  LR : ${checkCtx(ctx, "LR")}`)
    })

    // public static void LogException(Exception exception)
    let addr_LogException = Il2Cpp.Api.Debug.LogException_2
    LOGD("[*] Hook : UnityEngine.CoreModule.Debug.LogException : " + addr_LogException)
    A(addr_LogException, (args, ctx) => {
        let retStr = callFunction(find_method("mscorlib", "Exception", "ToString", 0, true), args[0])
        LOGG(`\n[*] Logger.LOG('${readU16(retStr)}')  <---  LR : ${checkCtx(ctx, "LR")}`)
    })
}

export { HookDebugLog }

declare global {
    var HookDebugLog: () => void;
}

globalThis.HookDebugLog = HookDebugLog;