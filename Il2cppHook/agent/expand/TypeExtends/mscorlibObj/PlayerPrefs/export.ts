import { filterDuplicateOBJ as FOBJ, PassType } from "../../../../utils/common"

const HookPlayerPrefs = (isShowPrintStack: boolean = false, needLRInfo: boolean = true): void => {

    InterceptorGetFunctions()
    InterceptorSetFunctions()

    function InterceptorGetFunctions() {

        //public static extern float GetFloat(string key, float defaultValue)
        A(Il2Cpp.Api.PlayerPrefs._GetFloat_2, (args: InvocationArguments, ctx: CpuContext, pass: Map<PassType, any>) => {
            pass.set("arg0", readU16(args[0]))
            pass.set("arg1", args[1])
        }, (retval: InvocationReturnValue, ctx: CpuContext, pass: Map<PassType, any>) => {
            LOGD("\n[*] '" + retval + "' = GetFloat('" + pass.get("arg0") + "'," + pass.get("arg1") + ")")
            let disp = `\n[*] ${retval} = GetFloat(${pass.get("arg0")},${pass.get("arg1")})`
            if (FOBJ(disp, 10)) return
            LOGD(disp)
            if (needLRInfo) LOGZ("\t\t { LR:" + checkCtx(ctx) + " } | { PC:" + checkCtx(ctx, "PC") + " }")
            if (isShowPrintStack) LOGZ((GetStackTraceNative(ctx)))
        })

        //public static extern int GetInt(string key, int defaultValue)
        A(Il2Cpp.Api.PlayerPrefs._GetInt_2, (args: InvocationArguments, ctx: CpuContext, pass: Map<PassType, any>) => {
            pass.set("arg0", readU16(args[0]))
            pass.set("arg1", args[1])
        }, (retval: InvocationReturnValue, ctx: CpuContext, pass: Map<PassType, any>) => {
            let disp = `\n[*] ${retval.toInt32()} = GetInt(${pass.get("arg0")},${pass.get("arg1")})`
            if (FOBJ(disp, 10)) return
            LOGD(disp)
            if (needLRInfo) LOGZ("\t\t { LR:" + checkCtx(ctx) + " } | { PC:" + checkCtx(ctx, "PC") + " }")
            if (isShowPrintStack) LOGZ((GetStackTraceNative(ctx)))
            if (pass.get("arg0").indexOf("SaleBoughted") != -1) retval.replace(ptr(0x1))
        })

        //public static string GetString(string key)
        A(Il2Cpp.Api.PlayerPrefs._GetString, (args: InvocationArguments, ctx: CpuContext, pass: Map<PassType, any>) => {
            pass.set("arg0", readU16(args[0]))
        }, (retval: InvocationReturnValue, ctx: CpuContext, pass: Map<PassType, any>) => {
            let disp = `\n[*] ${readU16(retval)} = GetString(${pass.get("arg0")})`
            if (FOBJ(disp, 10)) return
            LOGD(disp)
            if (needLRInfo) LOGZ("\t\t { LR:" + checkCtx(ctx) + " } | { PC:" + checkCtx(ctx, "PC") + " }")
            if (isShowPrintStack) LOGZ((GetStackTraceNative(ctx)))
        })
    }

    function InterceptorSetFunctions() {

        //public static extern float SetFloat(string key, float value)
        A(Il2Cpp.Api.PlayerPrefs._SetFloat, (args: InvocationArguments, ctx: CpuContext, pass: Map<PassType, any>) => {
            pass.set("arg0", readU16(args[0]))
            pass.set("arg1", (args[1].isNull() ? 0 : readSingle(args[1])))
        }, (retval: InvocationReturnValue, ctx: CpuContext, pass: Map<PassType, any>) => {
            let disp = `\n[*] SetFloat(${pass.get("arg0")},${pass.get("arg1")})`
            if (FOBJ(disp, 10)) return
            LOGD(disp)
            if (needLRInfo) LOGZ("\t\t { LR:" + checkCtx(ctx) + " } | { PC:" + checkCtx(ctx, "PC") + " }")
            if (isShowPrintStack) LOGZ((GetStackTraceNative(ctx)))
        })

        //public static extern int SetInt(string key, int value)
        A(Il2Cpp.Api.PlayerPrefs._SetInt, (args: InvocationArguments, ctx: CpuContext, pass: Map<PassType, any>) => {
            pass.set("arg0", readU16(args[0]))
            pass.set("arg1", args[1])
        }, (retval: InvocationReturnValue, ctx: CpuContext, pass: Map<PassType, any>) => {
            let disp = `\n[*] SetInt(${pass.get("arg0")},${pass.get("arg1")})`
            if (FOBJ(disp, 10)) return
            LOGD(disp)
            if (needLRInfo) LOGZ("\t\t { LR:" + checkCtx(ctx) + " } | { PC:" + checkCtx(ctx, "PC") + " }")
            if (isShowPrintStack) LOGZ((GetStackTraceNative(ctx)))
        })

        //public static string SetString(string key, string value)
        A(Il2Cpp.Api.PlayerPrefs._SetString, (args: InvocationArguments, ctx: CpuContext, pass: Map<PassType, any>) => {
            pass.set("arg0", readU16(args[0]))
            pass.set("arg1", readU16(args[1]))
        }, (retval: InvocationReturnValue, ctx: CpuContext, pass: Map<PassType, any>) => {
            let disp = `\n[*] SetString(${pass.get("arg0")},${pass.get("arg1")})`
            if (FOBJ(disp, 10)) return
            LOGD(disp)
            if (needLRInfo) LOGZ("\t\t { LR:" + checkCtx(ctx) + " } | { PC:" + checkCtx(ctx, "PC") + " }")
            if (isShowPrintStack) LOGZ((GetStackTraceNative(ctx)))
        })
    }
}

globalThis.SetInt = (key: string, value: number) => callFunction(find_method("UnityEngine.CoreModule", "PlayerPrefs", "SetInt", 2, true), allocUStr(key), value)

globalThis.SetFloat = (key: string, value: number) => callFunction(find_method("UnityEngine.CoreModule", "PlayerPrefs", "SetFloat", 2, true), allocUStr(key), value)

globalThis.SetString = (key: string, value: string) => callFunction(find_method("UnityEngine.CoreModule", "PlayerPrefs", "SetString", 2, true), allocUStr(key), allocUStr(value))

globalThis.GetInt = (key: string): void => {
    let ret = callFunctionRI(find_method("UnityEngine.CoreModule", "PlayerPrefs", "GetInt", 2, true), allocUStr(key), 0)
    LOG("\n[*] GetInt('" + key + "')\t--->\t" + ret + "\n", LogColor.C95)
}

globalThis.GetFloat = (key: string): void => {
    let ret = callFunctionRF(find_method("UnityEngine.CoreModule", "PlayerPrefs", "GetFloat", 2, true), allocUStr(key), 0)
    LOG("\n[*] GetFloat('" + key + "')\t--->\t" + ret + "\n", LogColor.C95)
}

globalThis.GetString = (key: string): void => {
    let ret = callFunctionRUS(find_method("UnityEngine.CoreModule", "PlayerPrefs", "GetString", 1), allocUStr(key))
    LOG("\n[*] GetString('" + key + "')\t--->\t" + ret + "\n", LogColor.C95)
}

declare global {
    var HookPlayerPrefs: (isShowPrintStack?: boolean, needLRInfo?: boolean) => void
    var SetInt: (key: string, value: number) => void
    var SetFloat: (key: string, value: number) => void
    var SetString: (key: string, value: string) => void
    var GetInt: (key: string) => void
    var GetFloat: (key: string) => void
    var GetString: (key: string) => void
}

globalThis.HookPlayerPrefs = HookPlayerPrefs

export { HookPlayerPrefs }  