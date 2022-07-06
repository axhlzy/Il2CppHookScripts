import { PassType } from "../../../../utils/common"

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
            if (needLRInfo) LOGZ("\t\t { LR:" + checkCtx(ctx) + " } | { PC:" + checkCtx(ctx, "PC") + " }")
            if (isShowPrintStack) LOGZ((GetStackTraceN(ctx)))
        })

        //public static extern int GetInt(string key, int defaultValue)
        A(Il2Cpp.Api.PlayerPrefs._GetInt_2, (args: InvocationArguments, ctx: CpuContext, pass: Map<PassType, any>) => {
            pass.set("arg0", readU16(args[0]))
            pass.set("arg1", args[1])
        }, (retval: InvocationReturnValue, ctx: CpuContext, pass: Map<PassType, any>) => {
            LOGD("\n[*] '" + retval.toInt32() + "' = GetInt('" + pass.get("arg0") + "'," + pass.get("arg1") + ")")
            if (needLRInfo) LOGZ("\t\t { LR:" + checkCtx(ctx) + " } | { PC:" + checkCtx(ctx, "PC") + " }")
            if (isShowPrintStack) LOGZ((GetStackTraceN(ctx)))
            if (pass.get("arg0").indexOf("SaleBoughted") != -1) retval.replace(ptr(0x1))
        })

        //public static string GetString(string key)
        A(Il2Cpp.Api.PlayerPrefs._GetString, (args: InvocationArguments, ctx: CpuContext, pass: Map<PassType, any>) => {
            pass.set("arg0", readU16(args[0]))
        }, (retval: InvocationReturnValue, ctx: CpuContext, pass: Map<PassType, any>) => {
            LOGD("\n[*] '" + readU16(retval) + "' = GetString('" + pass.get("arg0") + "')")
            if (needLRInfo) LOGZ("\t\t { LR:" + checkCtx(ctx) + " } | { PC:" + checkCtx(ctx, "PC") + " }")
            if (isShowPrintStack) LOGZ((GetStackTraceN(ctx)))
        })
    }

    function InterceptorSetFunctions() {

        //public static extern float GetFloat(string key, float defaultValue)
        A(Il2Cpp.Api.PlayerPrefs._SetFloat, (args: InvocationArguments, ctx: CpuContext, pass: Map<PassType, any>) => {
            pass.set("arg0", readU16(args[0]))
            pass.set("arg1", (args[1].isNull() ? 0 : readSingle(args[1])))
        }, (retval: InvocationReturnValue, ctx: CpuContext, pass: Map<PassType, any>) => {
            LOGD("\n[*] SetFloat('" + pass.get("arg0") + "'," + pass.get("arg1") + ")")
            if (needLRInfo) LOGZ("\t\t { LR:" + checkCtx(ctx) + " } | { PC:" + checkCtx(ctx, "PC") + " }")
            if (isShowPrintStack) LOGZ((GetStackTraceN(ctx)))
        })

        //public static extern int GetInt(string key, int defaultValue)
        A(Il2Cpp.Api.PlayerPrefs._SetInt, (args: InvocationArguments, ctx: CpuContext, pass: Map<PassType, any>) => {
            pass.set("arg0", readU16(args[0]))
            pass.set("arg1", args[1])
        }, (retval: InvocationReturnValue, ctx: CpuContext, pass: Map<PassType, any>) => {
            LOGD("\n[*] SetInt('" + pass.get("arg0") + "'," + pass.get("arg1") + ")")
            if (needLRInfo) LOGZ("\t\t { LR:" + checkCtx(ctx) + " } | { PC:" + checkCtx(ctx, "PC") + " }")
            if (isShowPrintStack) LOGZ((GetStackTraceN(ctx)))
        })

        //public static string GetString(string key)
        A(Il2Cpp.Api.PlayerPrefs._SetString, (args: InvocationArguments, ctx: CpuContext, pass: Map<PassType, any>) => {
            pass.set("arg0", readU16(args[0]))
            pass.set("arg1", readU16(args[1]))
        }, (retval: InvocationReturnValue, ctx: CpuContext, pass: Map<PassType, any>) => {
            LOGD("\n[*] SetString('" + pass.get("arg0") + "','" + pass.get("arg1") + "')")
            if (needLRInfo) LOGZ("\t\t { LR:" + checkCtx(ctx) + " } | { PC:" + checkCtx(ctx, "PC") + " }")
            if (isShowPrintStack) LOGZ((GetStackTraceN(ctx)))
        })
    }
}

declare global {
    var HookPlayerPrefs: (isShowPrintStack?: boolean, needLRInfo?: boolean) => void
}

globalThis.HookPlayerPrefs = HookPlayerPrefs

export { HookPlayerPrefs }  