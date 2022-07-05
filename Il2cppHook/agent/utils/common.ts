import { EpFunc, LogColor, MapKAY, PTR } from "../base/enum";
import { ARGM, GET_F, GET_MAP, GET_MAP_VALUE, SET_MAP_VALUE } from "../base/globle";

function PTR2NativePtr(mPtr: PTR): NativePointer {
    if (mPtr == undefined) return ptr(0)
    if (typeof mPtr == "number") mPtr = ptr(mPtr)
    return mPtr
}

export enum passValueKey {
    org = "org",
    src = "src",
    enter = "enter",
    leave = "leave",
    time = "time"
}

let map_attach_listener = GET_MAP<string, InvocationListener>(MapKAY.map_attach_listener)
type OnEnterType = (args: InvocationArguments, ctx: CpuContext, passValue: Map<passValueKey, any>) => void
type OnExitType = (retval: InvocationReturnValue, ctx: CpuContext, passValue: Map<passValueKey, any>) => void
const attachNative = (mPtr: ARGM, mOnEnter?: OnEnterType, mOnLeave?: OnExitType, needRecord: boolean = true): void => {
    if (typeof mPtr == "number") mPtr = ptr(mPtr)
    if (mPtr instanceof NativePointer && mPtr.isNull()) return
    var passValue = new Map()
    passValue.set(passValueKey.org, mPtr)
    passValue.set(passValueKey.src, mPtr)
    passValue.set(passValueKey.enter, mOnEnter)
    passValue.set(passValueKey.leave, mOnLeave)
    passValue.set(passValueKey.time, new Date())
    mPtr = checkPointer(mPtr)
    let Listener = Interceptor.attach(mPtr, {
        onEnter: function (args: InvocationArguments) {
            if (mOnEnter != undefined) mOnEnter(args, this.context, passValue)
        },
        onLeave: function (retval: InvocationReturnValue) {
            if (mOnLeave != undefined) mOnLeave(retval, this.context, passValue)
        }
    })
    // 记录已经被Attach的函数地址以及listner,默认添加listener记录 (只有填写false的时候不记录)
    if (needRecord) map_attach_listener.set(String(mPtr), Listener)
}

// 用来记录已经被 replace 的函数地址
let arr_nop_addr = new Array()
// nop 指定函数
var nopFunction = (mPtr: ARGM): void => {
    if (typeof mPtr == "number") mPtr = ptr(mPtr)
    if (mPtr == undefined) return
    replaceFunction(mPtr, () => ptr(0), true)
}

// 取消被 nop 的函数
var cancelNop = (mPtr: ARGM): void => {
    if (typeof mPtr == "number") mPtr = ptr(mPtr)
    if (mPtr == ptr(0)) return
    mPtr = checkPointer(mPtr)
    Interceptor.revert(mPtr)
    for (let i = 0; i < arr_nop_addr.length; i++) {
        if (String(arr_nop_addr[i]) == String(mPtr)) {
            arr_nop_addr = arr_nop_addr.splice(arr_nop_addr[i], 1)
        }
    }
}

// 取消所有已经Replace的函数
var cancelAllNopedFunction = () => arr_nop_addr.forEach((addr) => Interceptor.revert(addr))

//detach ---> A(mPtr)
const detachAll = (mPtr?: ARGM) => {
    let map_attach_listener = GET_MAP<string, InvocationListener>(MapKAY.map_attach_listener)
    if (typeof mPtr == "number") mPtr = ptr(mPtr)
    if (mPtr == undefined) {
        map_attach_listener.clear()
        Interceptor.detachAll()
    } else {
        let key = String(checkPointer(mPtr))
        let listener = map_attach_listener.get(key)
        if (listener != undefined) {
            listener.detach()
            map_attach_listener.delete(key)
        }
    }
}

// R(0xabcd,(srcFunc,arg0,arg1,arg2,arg3)=>{......})
type ReplaceFunc = NativeFunction<NativePointer, [NativePointerValue, NativePointerValue, NativePointerValue, NativePointerValue]>
type ReplaceFuncType = (srcCall: ReplaceFunc, arg0: NativePointer, arg1: NativePointer, arg2: NativePointer, arg3: NativePointer) => any
function replaceFunction(mPtr: ARGM, callBack: ReplaceFuncType, TYPENOP: boolean = true): void {
    if (typeof mPtr == "number") mPtr = ptr(mPtr)
    let src_ptr = mPtr
    mPtr = checkPointer(mPtr)
    // 记录已经被 Replace 的函数地址
    if (String(arr_nop_addr).indexOf(String(mPtr)) == -1) {
        arr_nop_addr.push(String(mPtr))
    } else {
        //先取消掉再重新 replace
        Interceptor.revert(mPtr)
    }
    // 原函数的引用也可以再replace中调用findTransform
    let srcFunc = new NativeFunction(mPtr, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer'])
    Interceptor.replace(mPtr, new NativeCallback((arg0, arg1, arg2, arg3) => {
        LOGW("\nCalled " + (TYPENOP ? "Replaced" : "Nop") + " function ---> " + mPtr + " (" + src_ptr.sub(Il2Cpp.module.base) + ")")
        let ret = callBack(srcFunc, arg0, arg1, arg2, arg3)
        return ret == null ? ptr(0) : ret
    }, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer']))
}

export const getFunctionAddrFromCls = (clsptr: NativePointer | number | string, funcName: string) => {
    if (typeof clsptr == "string") clsptr = findClass(clsptr)
    if (typeof clsptr == "number") clsptr = ptr(clsptr)
    let retArray = new Il2Cpp.Class(clsptr).methods
    for (let i = 0; i < retArray.length; i++)
        if (retArray[i].name.indexOf(funcName) != -1) return retArray[i].relativeVirtualAddress
    return -1
}


// 查看类型的,主要用来区分transform和gameObj
export const SeeTypeToString = (obj: number | NativePointer, b: boolean) => {
    if (typeof obj == "number") obj = ptr(obj)
    if (obj == undefined || obj == ptr(0)) return
    let s_type = callFunction(find_method("UnityEngine.CoreModule", "Object", "ToString", 0), obj)
    if (b == undefined) {
        LOG(readU16(s_type))
    } else {
        return readU16(s_type)
    }
}

/**
 * 未找到 void *Art::Current() 就将就这么用一下
 * 运行这个 getJclassName 函数时候再两秒钟内触发一下 DecodeJObject 函数即可得到 jclsName
 * 
 * 参考链接：
 * https://www.jianshu.com/p/dba5e5ef2ad5?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation
 * https://cs.android.com/android/platform/superproject/+/master:art/runtime/mirror/class.cc;l=1634;bpv=1;bpt=1?q=class.cc&sq=&ss=android%2Fplatform%2Fsuperproject
 * @param {*} jclsName 
 */
const getJclassName = (jclsName: NativePointer, ShouldRet: boolean): string | undefined => {
    ShouldRet == undefined ? false : true
    let pVoid = callFunction(GET_F(EpFunc.DecodeJObject), GET_F(EpFunc.ArtCurrent), jclsName)
    let k_class = callFunction(GET_F(EpFunc.GetDescriptor), pVoid, alloc())
    if (ShouldRet) return String(k_class.readCString())
    LOG("\n" + String(k_class.readCString()) + "\n", LogColor.C36)
}

function checkCtx(ctx: CpuContext): void | string {
    let lr: NativePointer = getPlatformCtx(ctx).lr
    let md = Process.findModuleByAddress(lr)
    if (md == null) {
        LOGE("Module not found")
        return
    }
    return lr.sub(md.base) + `|${md.name}`
}

const mapValueToArray = (map: Map<any, any>) => {
    var list = []
    for (var key in map) list.push([key, map.get(key)])
    return list
}


/**
 * 大于最大出现次数返回值为 -1
 * 主要是为了过滤比如setActive中重复出现的一直频繁调用的obj
 * @param {String} objstr 重复出现的str 
 * @param {int} maxCount 最大出现次数
 * @returns ? -1
 */
const filterDuplicateOBJ = (objstr: string, maxCount: number = 10) => {
    if (!GET_MAP(MapKAY.outFilterMap).has(objstr)) {
        SET_MAP_VALUE(MapKAY.outFilterMap, objstr, 0)
        return 0
    }
    let count = Number(GET_MAP_VALUE(MapKAY.outFilterMap, objstr)) + 1
    SET_MAP_VALUE(MapKAY.outFilterMap, objstr, count)
    return (count >= maxCount) ? -1 : count
}

(Number as any).prototype.add = (num: string | number) => {
    return Number(this) + Number(num)
}

export {
    attachNative, detachAll, replaceFunction, nopFunction, cancelNop, cancelAllNopedFunction, checkCtx,
    filterDuplicateOBJ, PTR2NativePtr, mapValueToArray, getJclassName
}

declare global {
    var d: () => void
    var A: (mPtr: NativePointer | number, mOnEnter?: OnEnterType, mOnLeave?: OnExitType, needRecord?: boolean) => void
    var n: (mPtr: NativePointer) => void
    var nn: (mPtr: NativePointer) => void
    var nnn: () => void
    var R: (mPtr: NativePointer, callBack: ReplaceFuncType, TYPENOP: boolean) => void
    var getJclassName: (jclsName: NativePointer, ShouldRet: boolean) => string | undefined
    var checkCtx: (ctx: CpuContext) => void | string
    // var filterDuplicateOBJ: (objstr: string, maxCount?: number) => number
}

globalThis.d = detachAll
globalThis.A = attachNative
globalThis.n = nopFunction
globalThis.nn = cancelNop
globalThis.nnn = cancelAllNopedFunction
globalThis.R = replaceFunction
globalThis.getJclassName = getJclassName
globalThis.checkCtx = checkCtx
// globalThis.filterDuplicateOBJ = filterDuplicateOBJ
