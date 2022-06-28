import { type } from "os";
import { getMethodModifier, methodToString } from "../bridge/fix/il2cppMethod";
import { getObjClass, getObjName } from "../expand/TypeExtends/mscorlibObj/Object/export";
import { mapValueToArray } from "../utils/common";
import { formartClass } from "../utils/formart";
import { HookerBase } from "./base";

type SpecialClass = "CommonClass" | "JNI" | "Soon"
class Breaker {

    public static maxCallTimes: number = 10     // 出现 ${} 次后不再显示
    public static detachTimes: number = 500     // 出现 ${} 次后取消 hook
    public static attathing: boolean = false
    private static map_attachedMethodInfos: Map<Il2Cpp.Method, InvocationListener> = new Map()
    private static map_methodInfo_callTimes: Map<Il2Cpp.Method, number> = new Map()
    private static array_methodInfo_detached: Array<Il2Cpp.Method> = new Array<Il2Cpp.Method>()
    private static array_attach_failed: Array<Il2Cpp.Method> = new Array<Il2Cpp.Method>()
    private static array_log_cache: Array<string> = new Array<string>()

    // private static array_log_cache: Map<string, [string, NativePointer[], NativePointer]> = new Map()


    static addBreakPoint(imgOrClsPtr: NativePointer | number | string | SpecialClass = "CommonClass"): void {
        // Breaker.attathing = true
        if (imgOrClsPtr instanceof NativePointer) {
            innerImage(imgOrClsPtr)
        } else if (typeof imgOrClsPtr == "number") {
            innerImage(ptr(imgOrClsPtr))
        } else if (typeof imgOrClsPtr == "string") {
            if (imgOrClsPtr == "CommonClass" || imgOrClsPtr == "JNI" || imgOrClsPtr == "Soon") return checkSpecialClass(imgOrClsPtr)
            // ImageName
            if (HookerBase._list_images_names.toString().includes(imgOrClsPtr)) {
                HookerBase._list_images.forEach((image: Il2Cpp.Image) => {
                    if (image.name == imgOrClsPtr) innerImage(image.handle)
                })
            } else {
                // className
                innerImage(findClass(imgOrClsPtr))
            }
        }
        // Breaker.attathing = false

        function innerImage(imgOrClsPtr: NativePointer): void {
            let lastSize = Breaker.map_attachedMethodInfos.size
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
            LOGO(`${getLine(40, "-")}\n Attached ${Breaker.map_attachedMethodInfos.size - lastSize} methods / All ${Breaker.map_attachedMethodInfos.size}\n${getLine(85, "-")}`)
        }

        function checkSpecialClass(type: SpecialClass) {
            if (type == "CommonClass") {
                HookerBase._list_images.forEach((image: Il2Cpp.Image) => {
                    let name = image.assembly.name
                    if (name == "Assembly-CSharp" || name == "MaxSdk.Scripts" || name == "Game" || name == "Zenject" || name == "UniRx") innerImage(image.handle)
                })
            } else if (type == "JNI") {
                innerImage(Il2Cpp.Domain.assembly("UnityEngine.AndroidJNIModule").image.class("UnityEngine.AndroidJNI").handle)
                // innerImage(Il2Cpp.Domain.assembly("UnityEngine.AndroidJNIModule").image.class("UnityEngine.AndroidJNIHelper").handle)
            } else if (type == "Soon") {

            } else {
                throw new Error("checkSpecialClass : type error")
            }
        }
    }

    private static attachMethod(method: Il2Cpp.Method): void {

        attachMethodInner(method)

        function attachMethodInner(method: Il2Cpp.Method, filterModifier: "all" | "public" | "private" | "protected" | "internal" = "all"): void {
            if (filterModifier == "all") {
                if (!getMethodModifier(method).includes("abstract") && !method.virtualAddress.isNull()) Breaker.attachMethodInfo(method)
            } else {
                if (!getMethodModifier(method).includes(filterModifier)) return
                if (!method.virtualAddress.isNull()) Breaker.attachMethodInfo(method)
            }
        }
    }

    static callTimesInline: number = 0
    public static attachMethodInfo(method: Il2Cpp.Method, moreInfo: boolean = false): void {
        if (method.virtualAddress.isNull()) {
            LOGE(methodToString(method))
            return
        }
        if (Breaker.map_attachedMethodInfos.has(method)) return
        try {
            let handleFunc: InvocationListener = Interceptor.attach(method.virtualAddress, {
                onEnter: function (this: InvocationContext, args: InvocationArguments) {
                    if (!Breaker.needShowLOG(method, "onEnter")) return
                    if (!moreInfo) {
                        let startTime = `[${++Breaker.callTimesInline}|${new Date().toLocaleTimeString().split(" ")[0]}]`
                        let addressInfo = ` ${method.handle} -> ${method.virtualAddress} -> ${method.relativeVirtualAddress} `
                        let classInfo = `${formartClass.alignStr(method.class.name, 18)}(${method.class.handle})`
                        let infoContent = `===>  ${methodToString(method, true)}\t `
                        let finnalStr = `${startTime}\t${addressInfo}\t|  ${classInfo}  ${infoContent}`
                        let tmpValue = []
                        // 记录参数
                        for (let i = 0; i < (method.isStatic ? method.parameterCount + 1 : method.parameterCount); i++) tmpValue[i] = args[i]
                        this.translateValue = [startTime, finnalStr, tmpValue]
                        Breaker.array_log_cache.push(finnalStr)
                        return LOGD(finnalStr)
                    }
                    let tmp_content = []
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
                    let disptitle = `Called ${methodToString(method, true)}\t [${method.handle} -> ${method.virtualAddress} -> ${method.relativeVirtualAddress}] | ${new Date().toLocaleTimeString().split(" ")[0]}`
                    this.disp_title = disptitle
                },
                onLeave: function (this: InvocationContext, retval: InvocationReturnValue) {
                    // try {
                    //     if (!moreInfo) Breaker.array_log_cache.set(this.translateValue[0], [this.translateValue[1], this.translateValue[2], retval])
                    // } catch (error) {
                    //     LOGE(error)
                    // }
                    if (!Breaker.needShowLOG(method, "onLeave")) return
                    if (this.content == null || this.disp_title == null) return
                    this.content[this.content.length] = `  ret\t| \t\t\t${retval}\t\t\t${method.returnType.name} (${method.returnType.class.handle}]`
                    let lenMex = Math.max(...(this.content as Array<string>).map(item => item.length), this.disp_title.length)
                    LOGO(`\n${getLine(lenMex)}`)
                    LOGD(this.disp_title);
                    LOGO(getLine(this.disp_title.length / 3))
                    this.content.forEach(LOGD)
                    LOGO(getLine(lenMex))
                }
            })
            LOGD(methodToString(method))
            Breaker.map_attachedMethodInfos.set(method, handleFunc)
        } catch (error) {
            catchError(method)
        }

        function catchError(method: Il2Cpp.Method): void {
            LOGE(methodToString(method))
            if (Process.arch == "arm") {
                let ins = method.virtualAddress.readPointer()
                if (ins != null && ins.equals(0xE12FFF1E)) showErrorLog(ins)
            } else if (Process.arch == "arm64") {
                let ins = method.virtualAddress.readPointer()
                if (ins != null && ins.equals(0xC0035FD6)) showErrorLog(ins)
            } else {
                Breaker.array_attach_failed.push(method)
                printCtx(method.relativeVirtualAddress, 1, 1, LogColor.WHITE, 1)
            }

            function showErrorLog(ins: NativePointer, error: string = "\tMethod null implementation or attach by other intercepter"): void {
                LOGE(`\t${method.virtualAddress} -> ${ins} -> ${ins.toMatchPattern()} `)
                LOGE(error)
            }
        }
    }

    private static needShowLOG = (method: Il2Cpp.Method | NativePointer, enterType: "onEnter" | "onLeave" = "onEnter"): boolean => {
        // if (Breaker.attathing) return false
        if (method instanceof Il2Cpp.Method) {
            if (!Breaker.map_methodInfo_callTimes.has(method)) Breaker.map_methodInfo_callTimes.set(method, 0)
            let times = Breaker.map_methodInfo_callTimes.get(method)
            if (times == null || times == undefined) times = 0
            if (times >= Breaker.detachTimes) {
                Breaker.map_attachedMethodInfos.get(method)!.detach()
                Breaker.array_methodInfo_detached.push(method)
            }
            if (enterType == "onEnter") Breaker.map_methodInfo_callTimes.set(method, times + 1)
            return times < Breaker.maxCallTimes
        } else {
            throw new Error("method must be Il2Cpp.Method")
        }
    }

    private static recordMethodsValues = (): void => {

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

    static printDesertedMethods = (filterName: string = "") => {
        if (Breaker.map_methodInfo_callTimes.size == 0) return
        let title = `${getLine(20)} detached methods ${getLine(20)}`
        let countHideFunctions: number = 0
        LOG(`${title}`, LogColor.C92)
        // 筛选 Breaker.map_methodInfo_callTimes 调用次数大雨 maxCallTimes 的方法
        Breaker.map_methodInfo_callTimes.forEach((value: number, key: Il2Cpp.Method) => {
            if (value >= Breaker.maxCallTimes) {
                if (filterName == "" || key.name.indexOf(filterName) != -1) {
                    let arr = methodToArray(key)
                    let times = this.map_methodInfo_callTimes.get(key)
                    ++countHideFunctions
                    LOGD(`[*] ${arr[0]} ---> ${arr[1]} ${arr[2]}\t\t${times}\t${arr[3]}`)
                }
            }
        })
        LOG(`${getLine(20)}`, LogColor.C92)
        LOGD(` ${Breaker.map_attachedMethodInfos.size} attached / ${Breaker.array_methodInfo_detached.length} detached / ${countHideFunctions} hidden`)
        LOG(getLine(title.length), LogColor.C92)
    }

    static printHistoryLog = (filterStr: string = "", countLogs: number = 100, reverse: boolean = false, detachAll: boolean = true) => {
        if (detachAll) d()
        // 方便cmd调用
        if (typeof filterStr == "number") {
            countLogs = filterStr
            filterStr = ""
        }
        // let filterArray = (mapValueToArray(Breaker.array_log_cache) as Array<[string, NativePointer[], NativePointer]>)
        //     .map((value: [string, NativePointer[], NativePointer]) => value[0])

        let filterArray = Breaker.array_log_cache
        filterArray.filter((value: string) => value.includes(filterStr))
        if (reverse) filterArray.reverse()
        filterArray.forEach((value: string) => {
            if (countLogs-- > 0) LOGD(value)
        })
    }
}

globalThis.getPlatform = (): string => (Process.platform == "linux" && Process.pageSize == 0x4) ? "arm" : "arm64"
globalThis.getPlatformCtx = (ctx: CpuContext): ArmCpuContext | Arm64CpuContext => getPlatform() == "arm" ? ctx as ArmCpuContext : ctx as Arm64CpuContext
globalThis.maxCallTimes = Breaker.maxCallTimes
globalThis.attathing = Breaker.attathing
globalThis.D = Breaker.clearBreak
globalThis.B = Breaker.addBreakPoint
globalThis.h = Breaker.printHistoryLog
globalThis.b = (mPtr: NativePointer) => {
    if (typeof mPtr == "number") mPtr = ptr(mPtr)
    try {
        new Il2Cpp.Method(mPtr).name // 用报错来判断是method指针还是一个普通的地址
        if (mPtr instanceof Il2Cpp.Method) return Breaker.attachMethodInfo(mPtr, true)
        Breaker.attachMethodInfo(new Il2Cpp.Method(mPtr), true)
    } catch (error) {
        Breaker.breakWithArgs(mPtr)
    }
}
globalThis.printDesertedMethods = Breaker.printDesertedMethods
declare global {
    var b: (mPtr: NativePointer) => void
    var h: (filterStr?: string, countLogs?: number, reverse?: boolean, detachAll?: boolean) => void
    var B: (mPtr: NativePointer) => void
    var D: () => void
    var getPlatform: () => string
    var getPlatformCtx: (ctx: CpuContext) => ArmCpuContext | Arm64CpuContext
    var maxCallTimes: number
    var attathing: boolean
    var printDesertedMethods: (filterName?: string) => void
}

export { Breaker }