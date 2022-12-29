import {
    getMethodDesFromMethodInfo as getMethodDes,
    getMethodMaxArgNameLength as getMethodArgLen,
    getMethodModifier, methodToString
} from "../bridge/fix/il2cppM"
import { closest } from "fastest-levenshtein"
import { formartClass as FC } from "../utils/formart"
import { HookerBase } from "./base"
import { TIME_SIMPLE } from "../utils/common"
import ValueResolve from "./valueResolve"

export { Breaker }
declare global {
    var b: (mPtr: NativePointer) => void
    var h: (filterStr?: string, countLogs?: number, reverse?: boolean, detachAll?: boolean) => void
    var hn: (start?: number, end?: number) => void
    var B: (mPtr: NativePointer | number | string | SpecialClass) => void
    var D: () => void
    var DD: () => void
    var BF: (filterStr: string) => void
    var breakWithArgs: (mPtr: NativePointer, argCount?: number) => void
    var breakInline: (mPtr: NativePointer, callback?: (value: InvocationContext) => void) => void
    var breakWithStack: (mPtr: NativePointer) => void
    var getPlatform: () => string
    var getPlatformCtx: (ctx: CpuContext) => ArmCpuContext | Arm64CpuContext
    // getPlatformCtxWithArgV 用于获取参数, argIndex 从 0 开始 (arm32 r0 / arm64 x0)
    var getPlatformCtxWithArgV: (ctx: CpuContext, argIndex: number) => NativePointer | undefined
    var maxCallTimes: number
    var attathing: boolean
    var printDesertedMethods: (filterName?: string) => void
    var printCurrentMethods: () => void
}

type SpecialClass = "CommonClass" | "JNI" | "AUI" | "Soon"
var CommonClass = ["Assembly-CSharp", "MaxSdk.Scripts", "Game", "Zenject", "UniRx", "Purchasing.Common", "UnityEngine.Purchasing"]
class Breaker {

    public static maxCallTimes: number = 10     // 出现 ${maxCallTimes} 次后不再显示
    public static detachTimes: number = 500     // 出现 ${detachTimes}  次后取消 hook
    public static map_attachedMethodInfos: Map<Il2Cpp.Method, InvocationListener> = new Map()
    private static map_methodInfo_callTimes: Map<Il2Cpp.Method, number> = new Map()
    private static array_methodInfo_detached: Array<Il2Cpp.Method> = new Array<Il2Cpp.Method>()
    private static array_methodValue_cache: Array<ValueResolve> = new Array<ValueResolve>() // 日志相关,记录参数
    private static array_attach_failed: Array<Il2Cpp.Method> = new Array<Il2Cpp.Method>()
    // private static array_log_cache: Map<string, [string, NativePointer[], NativePointer]> = new Map()

    static addBreakPoint(imgOrClsPtr: NativePointer | number | string | SpecialClass = "CommonClass",nSp:string=""): void {
        if (imgOrClsPtr instanceof NativePointer) {
            innerImage(imgOrClsPtr)
        } else if (typeof imgOrClsPtr == "number") {
            if (Process.arch == "arm64") throw new Error("Use '0x..' instead of number")
            innerImage(ptr(imgOrClsPtr))
        } else if (typeof imgOrClsPtr == "string") {
            if (Process.arch == "arm64" && imgOrClsPtr.trim().startsWith("0x")) return innerImage(ptr(imgOrClsPtr))
            if (imgOrClsPtr == "CommonClass" || imgOrClsPtr == "JNI" || imgOrClsPtr == "Soon") return checkSpecialClass(imgOrClsPtr)
            if (imgOrClsPtr == "AUI") return BF("Update")
            // is ImageName or className
            if (HookerBase._list_images_names.toString().includes(imgOrClsPtr)) { // is ImageName.dll / assemblyName
                // ---> ImageName case to Pointer
                HookerBase._list_images.forEach((image: Il2Cpp.Image) => {
                    if (image.name.includes(imgOrClsPtr)) {
                        FC.printTitile("Found : ImageName: " + imgOrClsPtr + " at " + image.handle)
                        innerImage(image.handle)
                    }
                })
            } else {
                // ---> className case to Pointer
                let clsPtr: NativePointer = findClass(imgOrClsPtr)
                if (!clsPtr.isNull()) {
                    FC.printTitile("Found : ClassName: " + imgOrClsPtr + " at " + clsPtr)
                    innerImage(clsPtr)
                } else {
                    // Do not found className
                    let imageName = closest(imgOrClsPtr, HookerBase._list_images_names)
                    LOGE(`You mean this ? ${imageName} @ ${Il2Cpp.Domain.assemblies.filter(item => item.name.includes)[0].handle}`)
                }
            }
        }

        function innerImage(imgOrClsPtr: NativePointer): void {
            let lastSize = Breaker.map_attachedMethodInfos.size
            if (imgOrClsPtr.isNull()) throw new Error("can't attach nullptr")
            if (HookerBase._list_images_pointers.map(item => Number(item)).includes(Number(imgOrClsPtr))) {
                // find classPtr from images cache then and attach it(class)
                let imageHandle = imgOrClsPtr
                new Il2Cpp.Image(imageHandle).classes
                    .filter(cls => cls.namespace.includes(nSp)) // filter namespace
                    .flatMap(cls => cls.methods)
                    .forEach(Breaker.attachMethod)
            } else {
                // string status
                let classHandle = imgOrClsPtr
                new Il2Cpp.Class(classHandle).methods.forEach(Breaker.attachMethod)
            }
            LOGO(`${getLine(40, "-")}\n Attached ${Breaker.map_attachedMethodInfos.size - lastSize} methods / All ${Breaker.map_attachedMethodInfos.size} methods\n${getLine(85, "-")}`)
        }

        function checkSpecialClass(type: SpecialClass) {
            if (type == "CommonClass") {
                HookerBase._list_images.forEach((image: Il2Cpp.Image) => {
                    if (CommonClass.includes(image.assembly.name)) {
                        FC.printTitile("Found : ImageName: " + image.name + " at " + image.handle)
                        innerImage(image.handle)
                    }
                })
            } else if (type == "JNI") {
                let clsTmp = Il2Cpp.Domain.assembly("UnityEngine.AndroidJNIModule").image.class("UnityEngine.AndroidJNI")
                if (clsTmp.isNull()) throw new Error("can't find class UnityEngine.AndroidJNI")
                FC.printTitile("Found : ClassName: " + clsTmp.name + " at " + clsTmp.handle)
                innerImage(clsTmp.handle)
                // innerImage(Il2Cpp.Domain.assembly("UnityEngine.AndroidJNIModule").image.class("UnityEngine.AndroidJNIHelper").handle)
            } else if ("AUI") {
                innerImage(Il2Cpp.Domain.assembly("Assembly-CSharp").image.handle)
                setTimeout(() => h("Update"), 3000)
            } else if (type == "Soon") {
                //TODO others
            } else {
                throw new Error("checkSpecialClass : type error")
            }
        }
    }

    static attachMethod(method: Il2Cpp.Method): void {

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
    public static attachMethodInfo(method: Il2Cpp.Method, detailLog: boolean = false): void {
        if (method.virtualAddress.isNull()) {
            LOGE(methodToString(method))
            return
        }
        if (Breaker.map_attachedMethodInfos.has(method)) return
        try {
            let handleFunc: InvocationListener = Interceptor.attach(method.virtualAddress, {
                onEnter: function (this: InvocationContext, args: InvocationArguments) {
                    if (!Breaker.needShowLOG(method, "onEnter")) return
                    // detailLog 详细或者粗略的LOG（是否带参数解析）
                    if (!detailLog) {
                        // 批量版 B() 针对单个classes/Images
                        let cacheID = `[${++Breaker.callTimesInline}|${TIME_SIMPLE()}]`
                        this.passValue = new ValueResolve(cacheID, method).setArgs(args)
                        return LOGD((this.passValue as ValueResolve).toString())
                    } else {
                        // 详细版 b() 针对单个函数
                        let tmp_content: Array<string> = new Array<string>()
                        let parameterNameMax: number = getMethodArgLen(method) + 1
                        this.passParameterNameMaxStr = getLine(parameterNameMax, " ")
                        if (!method.isStatic) {
                            // 非static方法
                            tmp_content[0] = `  inst\t|${this.passParameterNameMaxStr}\t\t\t${args[0]}\t\t[ ${ValueResolve.fakeValue(args[0], new Il2Cpp.Type(ptr(1)), method)} ] ( ${method.class.handle} )`
                            for (let index = 1; index < method.parameterCount + 1; ++index) {
                                let start = `  arg${index}  | `
                                let parameterName: string
                                try {
                                    parameterName = FC.alignStr(`${method.parameters[index - 1].name}`, parameterNameMax)
                                } catch { parameterName = FC.alignStr(` `, parameterNameMax) }
                                let mid = `${parameterName}\t--->\t\t${FC.getPtrFormart(args[index])}\t\t`
                                let end = `${method.parameters[index - 1].type.name} (${method.parameters[index - 1].type.class.handle})`
                                let res = `\t ${ValueResolve.fakeValue(args[index], method.parameters[index - 1].type, method)}`
                                tmp_content[tmp_content.length] = `${start}${mid}${end}${res}`
                            }
                        } else {
                            // static方法
                            for (let index = 0; index < method.parameterCount; ++index) {
                                let start = `  arg${index}  | `
                                let parameterName: string
                                try {
                                    parameterName = FC.alignStr(`${method.parameters[index - 1].name}`, parameterNameMax)
                                } catch { parameterName = FC.alignStr(` `, parameterNameMax) }
                                let mid = `${parameterName}\t--->\t\t${FC.getPtrFormart(args[index])}\t\t`
                                let end = `${method.parameters[index].type.name} (${method.parameters[index].type.class.handle})\t `
                                let res = `${ValueResolve.fakeValue(args[index], method.parameters[index].type, method)}`
                                tmp_content[tmp_content.length] = `${start}${mid}${end}${res}`
                            }
                        }
                        this.content = tmp_content
                        let clsStr = `${method.class.namespace}`
                        let classTitle = `${clsStr.length == 0 ? "" : clsStr + "."}${method.class.name}`
                        let disptitle = `${classTitle} | ${methodToString(method, true)}\t [${method.handle} -> ${method.virtualAddress} -> ${method.relativeVirtualAddress}] | ${TIME_SIMPLE()}`
                        this.disp_title = disptitle
                    }
                },
                onLeave: function (this: InvocationContext, retval: InvocationReturnValue) {
                    if (!Breaker.needShowLOG(method, "onLeave")) return
                    if (!detailLog && this.passValue != undefined)
                        Breaker.array_methodValue_cache.push((this.passValue as ValueResolve).setRetval(retval))
                    if (this.content == null || this.disp_title == null) return
                    let start = `  ret\t| `
                    let mid = `${this.passParameterNameMaxStr}\t\t\t${FC.getPtrFormart(retval)}\t\t`
                    let end = `${method.returnType.name} (${method.returnType.class.handle})\t `
                    let res = `${new ValueResolve("", method).setRetval(retval).resolve(-1)}`
                    this.content[this.content.length] = `${start}${mid}${end}${res}`
                    let lenMax = Math.max(...(this.content as Array<string>).map(item => item.length), this.disp_title.length) + 6 // 黄线长度
                    LOGO(`\n${getLine(lenMax)}`)                // 长线 ------------------
                    LOGD(this.disp_title)                       // 标题 className | methodToString | address | time
                    LOGO(getLine(this.disp_title.length / 3))   // 短线 ----
                    this.content.forEach(LOGD)                  // 内容 ins, arg, ret
                    LOGO(getLine(lenMax))                       // 长线 ------------------
                }
            })
            LOGD(methodToString(method))
            Breaker.map_attachedMethodInfos.set(method, handleFunc)
        } catch { catchError(method) }

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

    private static needShowLOG = (method: Il2Cpp.Method | NativePointer, enterType: "onEnter" | "onEnterSingle" | "onLeave" = "onEnter"): boolean => {
        // LOGD("needShowLOG : " + enterType + " " + Breaker.attathing)
        if (method instanceof Il2Cpp.Method) {
            if (!Breaker.map_methodInfo_callTimes.has(method)) Breaker.map_methodInfo_callTimes.set(method, 0)
            let times = Breaker.map_methodInfo_callTimes.get(method)
            if (times === undefined || times === null) times = 0
            if (times >= Breaker.detachTimes) {
                Breaker.map_attachedMethodInfos.get(method)!.detach()
                Breaker.array_methodInfo_detached.push(method)
            }
            if (enterType === "onEnter") Breaker.map_methodInfo_callTimes.set(method, times + 1)
            return times < Breaker.maxCallTimes
        } else {
            throw new Error("method must be Il2Cpp.Method")
        }
    }

    static breakWithArgs = (mPtr: NativePointer, argCount: number = 4) => {
        mPtr = checkPointer(mPtr)
        Interceptor.attach(mPtr, {
            onEnter(this: InvocationContext, args: InvocationArguments) {
                LOGO(`\n${getLine(85)}`)
                LOGH(`Called from ${mPtr} ---> ${mPtr.sub(soAddr)}\t|  LR : ${checkCtx(getPlatformCtx(this.context))}`)
                let tStr = String(args[0])
                for (let t = 1; t < argCount; ++t) tStr += "\t" + args[t]
                LOGD(`Args\t---> ${tStr}`)
            },
            onLeave(this: InvocationContext, retval: InvocationReturnValue) {
                LOGD(`Retval\t---> ${retval}`)
            },
        })
    }

    static breakWithStack = (mPtr: NativePointer) => {
        mPtr = checkPointer(mPtr)
        Interceptor.attach(mPtr, {
            onEnter(this: InvocationContext, args: InvocationArguments) {
                LOGO(`\n${getLine(65)}`)
                LOGH(`Called from ${mPtr} ---> ${mPtr.sub(soAddr)}\t|  LR : ${checkCtx(getPlatformCtx(this.context))}\n`)
                PrintStackTraceN(this.context)
                LOGO(`\n${getLine(65)}`)
            }
        })
    }

    static breakInline = (mPtr: NativePointer, callback: (value: InvocationContext) => void) => {
        mPtr = checkPointer(mPtr)
        Interceptor.attach(mPtr, {
            onEnter(this: InvocationContext, args: InvocationArguments) {
                LOGO(`\n${getLine(65)}`)
                LOGH(`Called from ${mPtr} ---> ${mPtr.sub(soAddr)}\t|  LR : ${checkCtx(getPlatformCtx(this.context))}\n`)
                LOGD(JSON.stringify(this.context))
                if (callback != undefined) callback(this)
            }
        })
    }

    static clearBreak = () => {
        d()
        Breaker.map_attachedMethodInfos.clear()
        Breaker.map_methodInfo_callTimes.clear()
        Breaker.array_methodInfo_detached = []
    }

    static clearBreakAll = () => {
        Breaker.clearBreak()
        Breaker.array_methodValue_cache = []
        Breaker.array_attach_failed = []
    }

    static printDesertedMethods = (filterName: string = "") => {
        if (Breaker.map_methodInfo_callTimes.size == 0) return
        let title = `\n${getLine(20)} detached methods ${getLine(20)}`
        let countHideFunctions: number = 0
        LOGM(`${title}`)
        // 筛选 Breaker.map_methodInfo_callTimes 调用次数大雨 maxCallTimes 的方法
        Breaker.map_methodInfo_callTimes.forEach((value: number, method: Il2Cpp.Method) => {
            if (value >= Breaker.maxCallTimes) {
                if (filterName == "" || method.name.indexOf(filterName) != -1) {
                    let arr = methodToArray(method)
                    let times = this.map_methodInfo_callTimes.get(method)
                    ++countHideFunctions
                    LOGD(`[*] ${arr[0]}  --->  ${arr[1]}\t${FC.alignStr(arr[2],p_size*2+2)}\t${FC.alignStr(times,4)}   | ${FC.alignStr(method.class.name,16)} |  \t${arr[3]}`)
                }
            }
        })
        LOGM(`${getLine(40)}`)
        LOGD(` ${Breaker.map_attachedMethodInfos.size} attached / ${Breaker.array_methodInfo_detached.length} detached / ${countHideFunctions} hidden`)
        LOGM(getLine(title.length) + '\n')
    }

    static printHistoryLog = (filterStr: string = "", countLogs: number = 50, reverse: boolean = false, detachAll: boolean = true) => {
        if (detachAll) D()
        // attathing = true
        if (typeof filterStr == "number") {
            countLogs = filterStr
            filterStr = ""
        }
        let filterArray = Breaker.array_methodValue_cache
            .map((value: ValueResolve) => value.toString())
            .filter((value: string) => value.includes(filterStr))
            .slice(0, countLogs)
        if (reverse) filterArray.reverse()
        filterArray.forEach(LOGD)
    }

    static printHistoryNum = (start: number = 0, end: number = 100, detachAll: boolean = false) => {
        if (detachAll) D()
        Breaker.array_methodValue_cache.slice(start, end).forEach(LOGD)
    }
}

globalThis.maxCallTimes = Breaker.maxCallTimes
globalThis.D = Breaker.clearBreak
globalThis.DD = Breaker.clearBreakAll
globalThis.B = Breaker.addBreakPoint
globalThis.h = Breaker.printHistoryLog
globalThis.hn = Breaker.printHistoryNum
globalThis.breakWithArgs = Breaker.breakWithArgs
globalThis.breakWithStack = Breaker.breakWithStack
globalThis.breakInline = Breaker.breakInline as any
globalThis.printDesertedMethods = Breaker.printDesertedMethods
globalThis.getPlatform = (): string => (Process.platform == "linux" && Process.pageSize == 0x4) ? "arm" : "arm64"
globalThis.getPlatformCtx = (ctx: CpuContext): ArmCpuContext | Arm64CpuContext => getPlatform() == "arm" ? ctx as ArmCpuContext : ctx as Arm64CpuContext

globalThis.b = (mPtr: NativePointer | string | number) => {
    if (typeof mPtr == "number") {
        if (Process.arch == "arm") mPtr = ptr(mPtr)
        // arm64 指针长度超过15位使用String传参
        else if (Process.arch == "arm64" && (mPtr.toString().length > 15)) 
            throw new Error("\nNot support parameter typed number at arm64\n\n\tUse b('0x...') instead\n")
        else mPtr = ptr(mPtr)
    } else if (typeof mPtr == "string") {
        mPtr = mPtr.trim()
        if (mPtr.startsWith("0x")) mPtr = ptr(mPtr)
        else throw new Error("Only support String format (like '0x...')")
    }
    try {
        new Il2Cpp.Method(mPtr).name // 用报错来判断是method指针还是一个普通的地址
        if (mPtr instanceof Il2Cpp.Method) return Breaker.attachMethodInfo(mPtr, true)
        Breaker.attachMethodInfo(new Il2Cpp.Method(mPtr), true)
    } catch (error) {
        Breaker.breakWithArgs(mPtr)
    }
}

globalThis.getPlatformCtxWithArgV = (ctx: CpuContext,argIndex:number): NativePointer|undefined => {
    if ((ctx as ArmCpuContext).r0 != undefined) {
        // case arm32
        switch (argIndex) {
            case 0: return (ctx as ArmCpuContext).r0
            case 1: return (ctx as ArmCpuContext).r1
            case 2: return (ctx as ArmCpuContext).r2
            case 3: return (ctx as ArmCpuContext).r3
            case 4: return (ctx as ArmCpuContext).r4
            case 5: return (ctx as ArmCpuContext).r5
            case 6: return (ctx as ArmCpuContext).r6
            case 7: return (ctx as ArmCpuContext).r7
            case 8: return (ctx as ArmCpuContext).r8
            case 9: return (ctx as ArmCpuContext).r9
            case 10: return (ctx as ArmCpuContext).r10
            case 11: return (ctx as ArmCpuContext).r11
            case 12: return (ctx as ArmCpuContext).r12
            case 13: return (ctx as ArmCpuContext).sp
            case 14: return (ctx as ArmCpuContext).lr
            case 15: return (ctx as ArmCpuContext).pc
            default: throw new Error(`ARM32 -> argIndex ${argIndex} is out of range`)
        } 
    } else {
        // case arm64
        switch (argIndex) {
            case 0: return (ctx as Arm64CpuContext).x0
            case 1: return (ctx as Arm64CpuContext).x1
            case 2: return (ctx as Arm64CpuContext).x2
            case 3: return (ctx as Arm64CpuContext).x3
            case 4: return (ctx as Arm64CpuContext).x4
            case 5: return (ctx as Arm64CpuContext).x5
            case 6: return (ctx as Arm64CpuContext).x6
            case 7: return (ctx as Arm64CpuContext).x7
            case 8: return (ctx as Arm64CpuContext).x8
            case 9: return (ctx as Arm64CpuContext).x9
            case 10: return (ctx as Arm64CpuContext).x10
            case 11: return (ctx as Arm64CpuContext).x11
            case 12: return (ctx as Arm64CpuContext).x12
            case 13: return (ctx as Arm64CpuContext).x13
            case 14: return (ctx as Arm64CpuContext).x14
            case 15: return (ctx as Arm64CpuContext).x15
            case 16: return (ctx as Arm64CpuContext).x16
            case 17: return (ctx as Arm64CpuContext).x17
            case 18: return (ctx as Arm64CpuContext).x18
            case 19: return (ctx as Arm64CpuContext).x19
            case 20: return (ctx as Arm64CpuContext).x20
            case 21: return (ctx as Arm64CpuContext).x21
            case 22: return (ctx as Arm64CpuContext).x22
            case 23: return (ctx as Arm64CpuContext).x23
            case 24: return (ctx as Arm64CpuContext).x24
            case 25: return (ctx as Arm64CpuContext).x25
            case 26: return (ctx as Arm64CpuContext).x26
            case 27: return (ctx as Arm64CpuContext).x27
            case 28: return (ctx as Arm64CpuContext).x28
            case 29: return (ctx as Arm64CpuContext).fp
            case 30: return (ctx as Arm64CpuContext).lr
            case 31: return (ctx as Arm64CpuContext).sp
            case 32: return (ctx as Arm64CpuContext).pc
            default: throw new Error(`ARM64 -> argIndex ${argIndex} is out of range`)
        }
    }
}

/**
 * 原 print_list_result
 * 用来列出已经 attach的方法
 */
globalThis.printCurrentMethods = (filterName:string ="",types: boolean = false) => {
    let currentTime = Date.now()
    new Promise((resolve: Function) => {
        let methodInfos = new Array<Il2Cpp.Method>()
        Breaker.map_attachedMethodInfos.forEach((_value: InvocationListener, key: Il2Cpp.Method) => { methodInfos.push(key) })
        if (filterName != "")
            methodInfos = methodInfos.filter((method: Il2Cpp.Method) => method.name.includes(filterName))
        resolve(methodInfos)
    }).then((methodInfos) => {
        let localT = <Array<Il2Cpp.Method>>methodInfos
        let address = localT.flatMap((method: Il2Cpp.Method) => method.relativeVirtualAddress)
        let names = localT.flatMap((method: Il2Cpp.Method) => `${method.class.name}::${getMethodDes(method)}`)
        return [address, names]
    }).then((addressAndNames) => {
        let value: [Array<NativePointer>, Array<string>] = <[Array<NativePointer>, Array<string>]>addressAndNames
        if (types) {
            LOGD(`\nvar arrayAddr : string[] = \n${JSON.stringify(value[0])}\n\nvar arrayName : string[] = \n${JSON.stringify(value[1])}\n`)
        } else {
            LOGD(`\nvar arrayAddr = \n${JSON.stringify(value[0])}\n\nvar arrayName = \n${JSON.stringify(value[1])}\n`)
        }
    }).catch((error) => {
        LOGE(error)
    }).finally(() => {
        LOGZ(`list ${Breaker.map_attachedMethodInfos.size} methods in ${Date.now() - currentTime} ms \n`)
    })
}

// 默认改到全部img中的所有方法 filterStr 为方法名的关键字
globalThis.BF = (filterStr: string, allImg:boolean = true): void => {
    if (typeof filterStr != "string") return
    DD()
    HookerBase._list_images.forEach((image: Il2Cpp.Image) => {
        if (allImg || CommonClass.includes(image.assembly.name)) {
            image.classes.flatMap((cls: Il2Cpp.Class) => cls.methods).forEach((mPtr: Il2Cpp.Method) => {
                if (mPtr.name.indexOf(filterStr) != -1) Breaker.attachMethodInfo(mPtr, false)
            })
        }
    })
}