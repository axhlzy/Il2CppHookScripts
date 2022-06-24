import { getMethodModifier, methodToString } from "../bridge/fix/il2cppMethod";
import { getObjClass, getObjName } from "../expand/TypeExtends/mscorlibObj/Object/export";
import { PTR2NativePtr } from "../utils/common";
import { HookerBase } from "./base";
import { PTR } from "./enum";

class Breaker {

    public static maxCallTimes: number = 10
    private static map_attachedMethodInfos: Map<Il2Cpp.Method, InvocationListener> = new Map()
    private static map_methodInfo_callTimes: Map<Il2Cpp.Method, number> = new Map()
    private static array_methodInfo_detached: Array<Il2Cpp.Method> = new Array<Il2Cpp.Method>()

    static break(imgOrClsPtr: PTR): void {
        imgOrClsPtr = PTR2NativePtr(imgOrClsPtr) as NativePointer
        if (imgOrClsPtr.isNull()) throw new Error("can't attach nullptr")
        if (HookerBase._list_images_pointers.map(item => Number(item)).includes(Number(imgOrClsPtr))) {
            let imageHandle = imgOrClsPtr
            new Il2Cpp.Image(imageHandle).classes
                .flatMap(cls => cls.methods)
                .forEach(Breaker.attachMethod)

        } else {
            let classHandle = imgOrClsPtr
            new Il2Cpp.Class(classHandle).methods
                .forEach(Breaker.attachMethod)
        }
    }

    static attachMethod(method: Il2Cpp.Method): void {

        attachMethodInner(method)

        function attachMethodInner(method: Il2Cpp.Method, filterModifier: "all" | "public" | "private" | "protected" | "internal" = "all"): void {
            if (filterModifier == "all") {
                attachMethodInfo(method)
            } else {
                if (!getMethodModifier(method).includes(filterModifier)) return
                attachMethodInfo(method)
            }
        }

        function attachMethodInfo(method: Il2Cpp.Method): void {
            LOGD(methodToString(method))
            let handleFunc: InvocationListener = Interceptor.attach(method.virtualAddress, {
                onEnter: function (this: InvocationContext, args: InvocationArguments) {
                    if (Breaker.needDetach(method)) {
                        Breaker.map_attachedMethodInfos.get(method)!.detach()
                        Breaker.array_methodInfo_detached.push(method)
                    }
                    this.disp_title = `Called ${methodToString(method, true)}\t [${method.handle} -> ${method.virtualAddress} -> ${method.relativeVirtualAddress}] | ${new Date().toLocaleTimeString().split(" ")[0]}`
                    let tmp_content = []
                    // 不是 static 方法
                    if (!method.isStatic) {
                        tmp_content[0] = `  inst\t| \t\t\t${args[0]}\t\t[${getObjName(args[0])}(${getObjClass(args[0])})]`
                        for (let index = 1; index < method.parameterCount + 1; ++index) {
                            let formartArg = args[index] < soAddr ? `${args[index]}\t` : args[index]
                            tmp_content[tmp_content.length] = `  arg${index}  | ${method.parameters[index - 1].name}\t--->\t${formartArg}\t\t${method.parameters[index - 1].type.name} (${method.parameters[index - 1].type.class.handle})`
                        }
                    } else {
                        for (let index = 0; index < method.parameterCount; ++index) {
                            let formartArg = args[index] < soAddr ? `${args[index]}\t` : args[index]
                            tmp_content[tmp_content.length] = `  arg${index}  | ${method.parameters[index].name}\t--->\t${formartArg}\t\t${method.parameters[index].type.name} (${method.parameters[index].type.class.handle})`
                        }
                    }
                    this.content = tmp_content
                },
                onLeave: function (this: InvocationContext, retval: InvocationReturnValue) {
                    this.content[this.content.length] = `  ret\t| \t\t\t${retval}\t\t\t${method.returnType.name} (${method.returnType.class.handle}]`
                    let lenMex = Math.max(...(this.content as Array<string>).map(item => item.length), this.disp_title.length)
                    LOGO(`\n${getLine(lenMex)}`)
                    LOGD(this.disp_title);
                    LOGO(getLine(this.disp_title.length / 3))
                    this.content.forEach(LOGD)
                    LOGO(getLine(lenMex))
                }
            })
            Breaker.map_attachedMethodInfos.set(method, handleFunc)
        }
    }

    private static needDetach = (method: Il2Cpp.Method | NativePointer): boolean => {
        if (method instanceof Il2Cpp.Method) {
            if (!Breaker.map_methodInfo_callTimes.has(method)) Breaker.map_methodInfo_callTimes.set(method, 0)
            let times = Breaker.map_methodInfo_callTimes.get(method)
            if (times == null || times == undefined) times = 0
            Breaker.map_methodInfo_callTimes.set(method, times + 1)
            return times >= Breaker.maxCallTimes
        }
        return false
    }

    static breakWithArgs = (mPtr: NativePointer, argCount: number = 4) => {
        mPtr = checkPointer(mPtr)
        Interceptor.attach(mPtr, {
            onEnter(this, args) {
                LOGO("\n" + getLine(65))
                LOGH("Called from " + mPtr + " ---> " + mPtr.sub(soAddr) + "\t|  LR : " + checkCtx(getPlatformCtx(this.context).lr) + "\n")
                let tStr = String(args[0])
                for (let t = 1; t < argCount; ++t) tStr += "\t" + args[t]
                LOGD(tStr)
            },
            onLeave(this, retval) {
                LOGD("End Function return ---> " + retval)
            },
        })
    }

    static breakWithStack = (mPtr: NativePointer) => {
        mPtr = checkPointer(mPtr)
        Interceptor.attach(mPtr, {
            onEnter(this, args) {
                LOGO("\n" + getLine(65))
                LOGH("Called from " + mPtr + " ---> " + mPtr.sub(soAddr) + "\t|  LR : " + checkCtx(getPlatformCtx(this.context).lr) + "\n")
                PrintStackTraceN(this.context)
                LOGO("\n" + getLine(65))
            }
        })
    }

    static breakInline = (mPtr: NativePointer, maxCount: number = 20) => {
        if (maxCount == undefined) maxCount = 10
        mPtr = checkPointer(mPtr)
        Interceptor.attach(mPtr, {
            onEnter(this, args) {
                LOGO("\n" + getLine(65))
                LOGH("Called from " + mPtr + " ---> " + mPtr.sub(soAddr) + "\n")
                LOGD(JSON.stringify(this.context))
            }
        })
    }

    static clearBreak = () => {
        Breaker.map_attachedMethodInfos.clear()
        Breaker.map_methodInfo_callTimes.clear()
        Breaker.array_methodInfo_detached = []
    }
}


globalThis.getPlatform = (): string => (Process.platform == "linux" && Process.pageSize == 0x4) ? "arm" : "arm64"
globalThis.getPlatformCtx = (ctx: CpuContext): ArmCpuContext | Arm64CpuContext => getPlatform() == "arm" ? ctx as ArmCpuContext : ctx as Arm64CpuContext
globalThis.maxCallTimes = Breaker.maxCallTimes
globalThis.D = Breaker.clearBreak
globalThis.B = Breaker.break
globalThis.b = (mPtr: NativePointer) => {
    if (typeof mPtr == "number") mPtr = ptr(mPtr)
    try {
        new Il2Cpp.Method(mPtr).name // 用报错来判断是methodInfoPtr还是methodAddress
        if (mPtr instanceof Il2Cpp.Method) return Breaker.attachMethod(mPtr)
        Breaker.attachMethod(new Il2Cpp.Method(mPtr))
    } catch (error) {
        Breaker.breakWithArgs(mPtr)
    }
}

declare global {
    var b: (mPtr: NativePointer) => void
    var B: (mPtr: NativePointer) => void
    var D: () => void
    var getPlatform: () => string
    var getPlatformCtx: (ctx: CpuContext) => ArmCpuContext | Arm64CpuContext
    var maxCallTimes: number
}

export { Breaker }