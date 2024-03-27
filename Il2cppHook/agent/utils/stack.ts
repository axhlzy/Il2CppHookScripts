import { getMethodDesFromMethodInfo } from "../bridge/fix/il2cppM"
import { allMethodsCacheArray, cacheMethods } from "../java/info"

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
        const method: Il2Cpp.Method = allMethodsCacheArray[i]
        const nextMethod: Il2Cpp.Method = allMethodsCacheArray[i + 1]
        if (mPtr.compare(method.virtualAddress) >= 0
            && Math.abs(mPtr.sub(method.virtualAddress).toInt32()) < 0x10000
            && mPtr.compare(nextMethod.virtualAddress) < 0) {
            tmpMethod = method
            break
        }
    }
    return tmpMethod
}

var symbMethod: Map<string, string> = new Map() // 放成全局的有重复的直接使用不在重复去查找以提高速度
const PrintStackTraceNative = (ctx: CpuContext, fuzzy: boolean = false, retText: boolean = false, slice: number = 6, parseIl2cppMethodName:boolean = true): string | void => {
    let stacks: NativePointer[] = Thread.backtrace(ctx, fuzzy ? Backtracer.FUZZY : Backtracer.ACCURATE)
    if (parseIl2cppMethodName) {
        stacks.forEach((frame: NativePointer, _index: number, _thisArr: NativePointer[]) => {
            if (symbMethod.has(frame.toString())) return
            const symb: DebugSymbol = DebugSymbol.fromAddress(frame)
            if (symb.moduleName == "libil2cpp.so" && symb.name?.startsWith("0x")) {
                const il2cppMethod: Il2Cpp.Method | null = ptrMightBeMethod(frame)
                if (il2cppMethod != null) {
                    const offset = symb.address.sub(il2cppMethod.virtualAddress)
                    symbMethod.set(frame.toString(), `MI:${il2cppMethod.handle} -> ${il2cppMethod.class.name}::${getMethodDesFromMethodInfo(il2cppMethod)} ${offset}↓`)
                }
            }
        })
    }
    const tmpText: string = stacks
        .slice(0, slice)
        .map(DebugSymbol.fromAddress)
        .map((sym: DebugSymbol) => {
            let strRet: string = `${sym}`
            const md: Module | null = Process.findModuleByAddress(sym.address)
            const methodstr: string | undefined = symbMethod.get(sym.address.toString())
            if (md != null && md.name == "libil2cpp.so" && strRet.startsWith('0x'))
                strRet = `${strRet}\t| ${methodstr == undefined ? "null" : methodstr}`
            return strRet
        })
        .join("\n")
    return !retText ? LOGZ(tmpText) : tmpText
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
    var PrintStackTraceNative: (ctx: CpuContext, fuzzy?: boolean, retText?: boolean, slice?: number, reverse?: boolean, parseIl2cppMethodName?:boolean) => string | void
    var GetStackTraceNative: (ctx: CpuContext, level?: number) => string
}

// java stack
globalThis.PrintStackTraceJava = PrintStackTrace
globalThis.GetStackTraceJava = GetStackTrace
// native stack
globalThis.PrintStackTraceNative = PrintStackTraceNative
globalThis.GetStackTraceNative = GetStackTraceNative


/** -------------------------------------------------------------------------------------------------------- */

// backtrace by SeeFlowerX
// ref https://gist.github.com/SeeFlowerX/80ffcd89dadb86ad681703aa1465cdbc

interface MemRegions {
    start: number
    end: number
    offset: number
    path: string
    name: string | undefined
}

var mem_regions: MemRegions[] = []

function read_maps(){
    let libc = Process.getModuleByName("libc.so")
    let fopen = new NativeFunction(libc.getExportByName("fopen"), "pointer", ["pointer", "pointer"])
    let fgets = new NativeFunction(libc.getExportByName("fgets"), "pointer", ["pointer", "int", "pointer"])
    let fclose = new NativeFunction(libc.getExportByName("fclose"), "int", ["pointer"])
    let filepath = Memory.allocUtf8String("/proc/self/maps")
    let mode = Memory.allocUtf8String("r")
    let file = fopen(filepath, mode)
    let line = Memory.alloc(1024)
    let results = []
    while (fgets(line, 1024, file).toInt32() != 0x0) {
        let text = line.readCString()
        if (text == null) {
            break
        }
        results.push(text)
    }
    fclose(file)
    for (let index = 0; index < results.length; index++) {
        let line = results[index]
        let infos = line.split("        ")
        let segment_path = infos[infos.length - 1]
        if (segment_path) {
            segment_path = segment_path.trim()
            if (segment_path == "") {
                segment_path = "UNKNOW"
            }
        }
        let [addr_info, permission, offset] = infos[0].split(" ", 3)
        let [start, end] = addr_info.split("-")
        mem_regions.push({
            "start": parseInt(`0x${start}`),
            "end": parseInt(`0x${end}`),
            "offset": parseInt(`0x${offset}`),
            "path": segment_path,
            "name": segment_path.split("/").pop(),
        })
    }
}

function get_addr_info(addr:NativePointer) {
    let info_head = `${addr}`.padStart(16, " ")
    let mem_region = find_mem_region(addr)
    if (!mem_region) {
        return `${info_head}[UNKNOW]`
    }
    let base_addr = mem_region.start - mem_region.offset
    return `${info_head}[${mem_region.name}:${addr.sub(base_addr)}]`
}

function find_mem_region(sp_addr:NativePointer) : MemRegions | undefined {
    for (let index = 0; index < mem_regions.length; index++) {
        let mem_region = mem_regions[index]
        if (sp_addr >= ptr(mem_region.start) && sp_addr < ptr(mem_region.end)) {
            return mem_region
        }
    }
}

function stacktrace(pc : NativePointer, fp: NativePointer, sp: NativePointer) {
    if (pc == null || fp == null || sp == null) 
        throw new Error("pc, fp, sp can not be null")
    let n = 0, stack_arr = [], fp_c = fp
    stack_arr[n++] = pc
    const mem_region = find_mem_region(sp)
    if (!mem_region) {
        LOGE(`[stacktrace] can not find mem_region ${sp}`)
        return stack_arr
    }
    while (n < 32) {
        if (parseInt(fp_c.toString()) < parseInt(sp.toString()) || fp_c < ptr(mem_region.start) || fp_c > ptr(mem_region.end)) {
            break
        }
        let next_fp = fp_c.readPointer()
        let lr = fp_c.add(8).readPointer()
        fp_c = next_fp
        stack_arr[n++] = lr
    }
    return stack_arr
}

function hook_libsscronet(){
    function hook_SSL_write(){
        const symbol = "SSL_write"
        const symbol_addr = libsscronet.getExportByName(symbol)
        LOGD(`[${symbol}] addr=${symbol_addr}`)
        Interceptor.attach(symbol_addr, {
            onEnter: function(args) {
                this.ssl = args[0]
                this.buf = args[1]
                this.num = args[2]
                const ctx :CpuContext = this.context
                this.info = stacktrace(ctx.pc, (ctx as Arm64CpuContext).fp, ctx.sp).map(get_addr_info).join("\n")
            }, onLeave: function(retval){
                let status = retval.toInt32()
                LOGD(`[${symbol}] retval=${status} SSL=${this.ssl} buf=${this.buf} num=${this.num}\n${this.info}`)
            }
        })
    }
    let libsscronet = Process.getModuleByName("libsscronet.so")
    hook_SSL_write()
}

setImmediate(()=>{read_maps()})

declare global {
    var hook_libsscronet: () => void
    var find_mem_region: (sp_addr: NativePointer) => MemRegions | undefined
    var stacktrace: (pc: NativePointer, fp: NativePointer, sp: NativePointer) => NativePointer[]
    var bts: (ctx: CpuContext) => void

    var mem_regions: MemRegions[]
}

globalThis.hook_libsscronet = hook_libsscronet
globalThis.find_mem_region = find_mem_region
globalThis.stacktrace = stacktrace

globalThis.mem_regions = mem_regions

// alias bts to stacktrace
// use age ↓
// A(xxx,(_args,ctx)=>{LOGD(bts(ctx))})
globalThis.bts = (ctx: CpuContext) => stacktrace(ctx.pc, (ctx as Arm64CpuContext).fp, ctx.sp).forEach((addr: NativePointer) => LOGD(get_addr_info(addr)))