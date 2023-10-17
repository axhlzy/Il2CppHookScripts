import { EpFunc, LogColor, MapKAY, PTR } from "../base/enum";
import { ARGM, GET_F, GET_MAP, GET_MAP_VALUE, SET_MAP_VALUE } from "../base/globle";
import { il2cppObjAPI } from "../expand/TypeExtends/mscorlibObj/Object/api";

function PTR2NativePtr(mPtr: PTR): NativePointer {
    if (mPtr == undefined) return ptr(0)
    if (typeof mPtr == "number") mPtr = ptr(mPtr)
    return mPtr
}

enum passValueKey {
    org = "org",
    src = "src",
    enter = "enter",
    leave = "leave",
    time = "time"
}

export type PassType = passValueKey | string

let map_attach_listener = GET_MAP<string, InvocationListener>(MapKAY.map_attach_listener)
export type OnEnterType = (args: InvocationArguments, ctx: CpuContext, passValue: Map<PassType, any>) => void
export type OnExitType = (retval: InvocationReturnValue, ctx: CpuContext, passValue: Map<PassType, any>) => void
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
    let k_class = callFunction(GET_F(EpFunc.GetDescriptor), pVoid, allocP())
    if (ShouldRet) return String(k_class.readCString())
    LOG("\n" + String(k_class.readCString()) + "\n", LogColor.C36)
}

function checkCtx(ctx: CpuContext, type: "PC" | "LR" | "SP" = "LR"): void | string {
    let TMP: ArmCpuContext | Arm64CpuContext = getPlatformCtx(ctx)
    let lr: NativePointer = TMP.lr
    let pc: NativePointer = TMP.pc
    let md_lr = Process.findModuleByAddress(lr)
    if (type == "LR" && md_lr != null) return lr.sub(md_lr.base) + `|${md_lr.name}`
    let md_pc = Process.findModuleByAddress(pc)
    if (type == "PC" && md_pc != null) return pc.sub(md_pc.base) + `|${md_pc.name}`
    if (type == "SP") return String(TMP.sp).toString()
    return JSON.stringify(ctx)
}

const mapValueToArray = (map: Map<any, any>) => {
    var list = []
    for (var key in map) list.push([key, map.get(key)])
    return list
}

var runOnMain = (UpDatePtr: NativePointer, Callback: Function) => {
    if (Callback == undefined) return
    if (typeof (UpDatePtr) == "function") {
        Callback = UpDatePtr
        UpDatePtr = getEventUpdate<NativePointer>(false)
    }
    A(UpDatePtr, () => {
        if (Callback != undefined && Callback != null) {
            try {
                Callback()
            } catch (e) {
                LOGE(e)
            }
            Callback = () => { }
        }
    })
}

const runOnNewThread = (Callback: Function): NativePointer => {
    if (Callback == undefined) return ptr(0)
    let callback = new NativeCallback(function (_arg0, _arg1, _arg2, _arg3) {
        return Callback.apply(null, arguments)
    }, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer'])
    let ntid = Memory.alloc(p_size)
    new NativeFunction(Module.findExportByName(null, "pthread_create")!, 'pointer', ['pointer', 'int', 'pointer', 'int'])(ntid, 0, callback, 0)
    return ntid
}

const SendMessage = (str0: string, str1: string, str2: string = ""): void => {
    // Java 
    Java.perform(() => Java.use("com.unity3d.player.UnityPlayer").UnitySendMessage(str0, str1, str2))

    // Native 
    // callFunction(Module.findExportByName("libunity.so","UnitySendMessage"),allocStr(str0,1),allocStr(str1,1),allocStr(str2,1))
}

const SendMessageImpl = (platform: string | "IronSource" | "MaxSdkCallbacks" | "MoPubManager" | "TPluginsGameObject" | 'ALL' = 'ALL'): void => {

    switch (platform) {
        case "IronSource":
            IronSourceEvents()
            break
        case "MaxSdkCallbacks":
            MaxSdkCallbacks()
            break
        case "MoPubManager":
            MoPubManager()
            break
        case "TPluginsGameObject":
            TTPluginsGameObject()
            break
        case "ALL":
            IronSourceEvents()
            MaxSdkCallbacks()
            MoPubManager()
            TTPluginsGameObject()
        default:
            DefaultClass(platform)
            break
    }

    SendMessage('GameAnalytics', 'OnCommandCenterUpdated', '')
    SendMessage('GameAnalytics', 'OnRemoteConfigsUpdated', '')
    SendMessage('UnityFacebookSDKPlugin', 'OnInitComplete', '{"key_hash":"0eWmEB4CY7TpepNbZdxCOaz2Crs=\n"}')

    function IronSourceEvents() {
        SendMessage("IronSourceEvents", "onRewardedVideoAvailabilityChanged", "true")
        SendMessage("IronSourceEvents", "onRewardedVideoAdShowFailedDemandOnly", "true")
        SendMessage('IronSourceEvents', 'onInterstitialAdReady', '')
        SendMessage("IronSourceEvents", "onRewardedVideoAdOpened", "")
        SendMessage("IronSourceEvents", "onRewardedVideoAdStarted", "")
        SendMessage("IronSourceEvents", "onRewardedVideoAdEnded", "")
        SendMessage("IronSourceEvents", "onRewardedVideoAdRewarded", "{'placement_reward_name':'Virtual Item','placement_name':'rewardedVideo','placement_reward_amount':'1','placement_id':'2'}")
        SendMessage("IronSourceEvents", "onRewardedVideoAdClosed", "")

        SendMessage("IronSourceRewardedVideoAndroid", "onRewardedVideoAvailabilityChanged", "true")
        SendMessage("IronSourceRewardedVideoAndroid", "onRewardedVideoAdShowFailedDemandOnly", "true")
        SendMessage('IronSourceRewardedVideoAndroid', 'onInterstitialAdReady', '')
        SendMessage("IronSourceRewardedVideoAndroid", "onRewardedVideoAdOpened", "")
        SendMessage("IronSourceRewardedVideoAndroid", "onRewardedVideoAdStarted", "")
        SendMessage("IronSourceRewardedVideoAndroid", "onRewardedVideoAdEnded", "")
        SendMessage("IronSourceRewardedVideoAndroid", "OnRewardedVideoAdRewarded", "{'placement_reward_name':'Virtual Item','placement_name':'rewardedVideo','placement_reward_amount':'1','placement_id':'2'}")
        SendMessage("IronSourceRewardedVideoAndroid", "onRewardedVideoAdClosed", "")
    }

    function MaxSdkCallbacks() {
        SendMessage('MaxSdkCallbacks', 'ForwardEvent', 'networkName=AppLovin\nname=OnRewardedAdRevenuePaidEvent\nrevenue=0.014579974174499511\nplacement=\nadUnitId=e01cb721520cd33c\ncreativeId=11831000\n')
        SendMessage('MaxSdkCallbacks', 'ForwardEvent', 'networkName=AppLovin\nname=OnRewardedAdDisplayedEvent\nrevenue=0.014579974174499511\nplacement=\nadUnitId=e01cb721520cd33c\ncreativeId=11831000\n')
        SendMessage('MaxSdkCallbacks', 'ForwardEvent', 'revenue=0.014579974174499511\nnetworkName=AppLovin\nname=OnRewardedAdReceivedRewardEvent\nplacement=\nrewardAmount=0\nadUnitId=e01cb721520cd33c\ncreativeId=11831000\nrewardLabel=\n')
        SendMessage('MaxSdkCallbacks', 'ForwardEvent', 'networkName=AppLovin\nname=OnRewardedAdHiddenEvent\nrevenue=0.014579974174499511\nplacement=\nadUnitId=e01cb721520cd33c\ncreativeId=11831000\n')

        SendMessage('MaxSdkCallbacks', 'OnRollicAdsRewardedVideoClickedEvent', 'name=OnSdkInitializedEvent\nconsentDialogState=2\ncountryCode=SG\n')
        SendMessage("MaxSdkCallbacks", "OnRollicAdsRewardedVideoClosedEvent", "name=OnRewardedAdDisplayedEvent\nadUnitId=ec1a772e0459f45b")
        SendMessage("MaxSdkCallbacks", "OnRollicAdsRewardedVideoReceivedRewardEvent", "name=OnRewardedAdReceivedRewardEvent\nrewardAmount=0\nadUnitId=ec1a772e0459f45b\nrewardLabel=")
        SendMessage("MaxSdkCallbacks", "OnRollicAdsRewardedVideoShownEvent", "name=OnRewardedAdHiddenEvent\nadUnitId=ec1a772e0459f45b")
        SendMessage("MaxSdkCallbacks", "OnRollicAdsRewardedVideoLoadedEvent", "name=OnRewardedAdLoadedEvent\nadUnitId=ec1a772e0459f45b")
    }

    function MoPubManager() {

        // java.lang.Throwable
        // at com.unity3d.player.UnityPlayer.UnitySendMessage(Native Method)
        // at com.mopub.unity.MoPubUnityPlugin$UnityEvent.Emit(MoPubUnityPlugin.java:95)
        // at com.mopub.unity.MoPubRewardedVideoUnityPluginManager.onRewardedVideoClosed(MoPubRewardedVideoUnityPluginManager.java:67)
        // at com.mopub.mobileads.MoPubRewardedVideos$1.callback(MoPubRewardedVideos.java:87)
        // at com.mopub.mobileads.MoPubRewardedVideos.showRewardedVideo(MoPubRewardedVideos.java:77)
        // at com.mopub.mobileads.MoPubRewardedVideos.showRewardedVideo(MoPubRewardedVideos.java:103)
        // at com.mopub.unity.MoPubRewardedVideoUnityPlugin$2.run(MoPubRewardedVideoUnityPlugin.java:122)
        // at com.mopub.unity.MoPubUnityPlugin$10.run(MoPubUnityPlugin.java:526)
        // at android.os.Handler.handleCallback(Handler.java:790)
        // at android.os.Handler.dispatchMessage(Handler.java:99)
        // at android.os.Looper.loop(Looper.java:164)
        // at android.app.ActivityThread.main(ActivityThread.java:6494)
        // at java.lang.reflect.Method.invoke(Native Method)
        // at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:438)
        // at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:807)

        SendMessage("UnityFacebookSDKPlugin", "UnityFacebookSDKPlugin", "{\"key_hash\":\"NgS2u0aEWjJAWRbMgtyAolzO6s8=\\n\"}")
        SendMessage("MoPubManager", "EmitSdkInitializedEvent", "[\"0fe07d2ca88549ff9598aed6c45f0773\",\"70\"]")
        SendMessage("MoPubManager", "EmitInterstitialLoadedEvent", "[\"a44632b619174dfa98c46420592a3756\"]")
        SendMessage('MoPubManager', 'EmitAdLoadedEvent', '["f7a8241fad1041bda59f303eae75be2d","320","50"]')
        SendMessage("MoPubManager", "EmitRewardedVideoLoadedEvent", "[\"a44632b619174dfa98c46420592a3756\"]")

        SendMessage("MoPubManager", "EmitRewardedVideoShownEvent", "[\"a44632b619174dfa98c46420592a3756\"]")
        // SendMessage("MoPubManager", "EmitRewardedVideoReceivedRewardEvent", "[\"a44632b619174dfa98c46420592a3756\"]")
        SendMessage('MoPubManager', 'EmitRewardedVideoReceivedRewardEvent', '["a44632b619174dfa98c46420592a3756","","0"]')
        SendMessage("MoPubManager", "EmitRewardedVideoClosedEvent", "[\"a44632b619174dfa98c46420592a3756\"]")
    }

    function TTPluginsGameObject() {
        SendMessage("TTPluginsGameObject", "OnRewardedAdsShown", "")
        SendMessage("TTPluginsGameObject", "OnRewardedAdsClosed", "{\"shouldReward\":true,\"network\":\"admob-unityads\",\"revenue\":0.00138,\"currency\":\"USD\",\"precision\":\"ESTIMATED\"}")
        SendMessage("TTPluginsGameObject", "OnRewardedAdsReady", "{\"loaded\":true}")
    }

    function DefaultClass(className: string = "OmEvents") {
        SendMessage(className, "OnRewardedVideoAdLoaded", "")
        SendMessage(className, "OnRewardedVideoAdOpened", "")
        SendMessage(className, "onRewardedVideoShowed", "")
        SendMessage(className, "onRewardedVideoStarted", "")
        SendMessage(className, "onRewardedVideoEnded", "")
        SendMessage(className, "onRewardedVideoRewarded", "{'placement_reward_name':'Virtual Item','placement_name':'rewardedVideo','placement_reward_amount':'1','placement_id':'2'}")
        SendMessage(className, "OnRewardedVideoAdClosed", "")
        SendMessage(className, "onRewardedVideoAvailabilityChanged", "true")
    }
}

globalThis.HookForwardEvent = () => {
    Il2Cpp.perform(() => {
        // MaxSdk.Scripts + MaxSdkCallbacks + ForwardEvent
        let ass = Il2Cpp.Domain.tryAssembly("MaxSdk.Scripts")
        if (ass) {
            ass.image.class("MaxSdkCallbacks").method("ForwardEvent").implementation = function (instance: NativePointer, eventPropsStr: NativePointer) {
                LOGD(`ForwardEvent: ${instance}  ${readU16(eventPropsStr)}`)
                return this.method("ForwardEvent").invoke(...arguments)
            }
        } else {
            throw new Error("MaxSdk.Scripts not found")
        }
    })
}

export const TIME_SIMPLE = (): string => new Date().toLocaleTimeString().split(" ")[0]

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
    var d: (mPtr?: ARGM) => void
    var A: (mPtr: NativePointer | number, mOnEnter?: OnEnterType, mOnLeave?: OnExitType, needRecord?: boolean) => void
    var n: (mPtr: NativePointer | number) => void
    var nn: (mPtr: NativePointer | number) => void
    var nnn: () => void
    var R: (mPtr: NativePointer, callBack: ReplaceFuncType, TYPENOP?: boolean) => void
    var getJclassName: (jclsName: NativePointer, ShouldRet: boolean) => string | undefined
    var checkCtx: (ctx: CpuContext, type?: "LR" | "PC" | "SP") => void | string
    // var filterDuplicateOBJ: (objstr: string, maxCount?: number) => number
    var runOnMain: (UpDatePtr: NativePointer, Callback: Function) => void
    var runOnNewThread: (Callback: Function) => void
    var SendMessage: (str0: string, str1: string, str2?: string) => void
    var SendMessageImpl: (platform: "IronSource" | "MaxSdkCallbacks" | "MoPubManager" | "TPluginsGameObject") => void
    var HookForwardEvent: () => void
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
globalThis.runOnMain = runOnMain
globalThis.runOnNewThread = runOnNewThread
globalThis.SendMessage = SendMessage
globalThis.SendMessageImpl = SendMessageImpl
