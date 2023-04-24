import { HookerBase } from "../../../base/base"

export { }

let recordCallStr: Map<string, AdEvent> = new Map()
let recordSrcInfo: Map<string, string> = new Map()

const HookMaxCallBack = (jsonParse: boolean = true) => {
    // public void ForwardEvent(string eventPropsStr)
    let forwardEvent: NativePointer = find_method("MaxSdk.Scripts", "MaxSdkCallbacks", "ForwardEvent", 1)
    if (!forwardEvent.isNull())
        A(forwardEvent, (args: InvocationArguments) => {
            let srcText: string = readU16(args[1])
            let jsonObj: AdEvent = JSON.parse(srcText)
            let logStr = jsonParse ? jsonObj : srcText
            try {
                // 只保留一个 networkResponses，展示简洁些
                jsonObj.waterfallInfo.networkResponses = jsonObj.waterfallInfo.networkResponses.splice(0, 1)
            } catch { }
            recordCallStr.set(jsonObj.name, jsonObj)
            recordSrcInfo.set(jsonObj.name, srcText)
            LOGE(`\n[*] MaxSdkCallbacks.ForwardEvent('${args[0]}','${logStr}')\n`)
            if (jsonParse) LOGJSON(logStr)
        })

    // private static void InvokeEvent(Action evt, string eventName)
    let invokeEvent: NativePointer = find_method("MaxSdk.Scripts", "MaxSdkCallbacks", "InvokeEvent", 2)
    if (!invokeEvent.isNull())
        A(invokeEvent, (args: InvocationArguments) => {
            let logStr = jsonParse ? JSON.parse(readU16(args[1])) : readU16(args[1])
            LOGE(`\n[*] MaxSdkCallbacks.InvokeEvent('${args[0]}','${logStr}')`)
            if (jsonParse) LOGJSON(logStr)
        })
}

const listMaxCallBack = (showSendMsg: boolean = false) => {
    if (recordCallStr.size == 0) LOGE(`Noting to show ...`)
    for (let [key, value] of recordCallStr) {
        let src: AdEvent = JSON.parse(recordSrcInfo.get(key)!)
        let infoModify: string = ''
        try {
            if (showSendMsg) {
                LOGE(`\n[*] ${key} ↓`)
                LOGD(`SendUnityMessage("MaxSdkCallbacks", "ForwardEvent", "${recordSrcInfo.get(key)!.replace(/"/g, '\\"')})");`)
            } else {
                infoModify = "{ " + src.waterfallInfo.networkResponses.length + " -> 1" + " }"
                LOGE(`\n[*] ${key} ${infoModify} ↓`)
                LOGJSON(value)
            }
        } catch { }
    }
    newLine()
}


declare global {
    var HookMaxCallBack: () => void
    var listMaxCallBack: (showSendMsg?: boolean) => void
    var onMaxInit: () => void
    var onMaxReward: () => void
}

globalThis.HookMaxCallBack = HookMaxCallBack
globalThis.listMaxCallBack = listMaxCallBack

globalThis.onMaxInit = () => {
    if (!HookerBase._list_assemblies_names.includes("MaxSdk.Scripts")) throw new Error("MaxSdk.Scripts not found")
    // MaxSdkCallbacks ForwardEvent {"name":"OnSdkInitializedEvent","consentDialogState":"1","countryCode":"GB","isSuccessfullyInitialized":"true"}
    SendMessage("MaxSdkCallbacks", "ForwardEvent", '{"name":"OnSdkInitializedEvent","consentDialogState":"1","countryCode":"GB","isSuccessfullyInitialized":"true"}')
    setFunctionBool(find_method("MaxSdk.Scripts", "MaxSdkAndroid", "IsRewardedAdReady"), true)
    n(find_method("MaxSdk.Scripts", "MaxSdkAndroid", "ShowRewardedAd"))
}

globalThis.onMaxReward = () => {
    if (!HookerBase._list_assemblies_names.includes("MaxSdk.Scripts")) throw new Error("MaxSdk.Scripts not found")

    // MaxSdkCallbacks.MaxSdkAndroid ↓

    SendMessage("MaxSdkCallbacks", "ForwardEvent", `{"adUnitId":"889d134d7f3d3d7d","adFormat":"REWARDED","networkName":"AppLovin","networkPlacement":"inter_videoa","creativeId":"20945973","placement":"","revenue":"0.002465956926345825","revenuePrecision":"exact","waterfallInfo":{},"dspName":"","name":"OnRewardedAdReceivedRewardEvent","rewardLabel":"","rewardAmount":"0"}`)
    SendMessage("MaxSdkCallbacks", "ForwardEvent", `{"adUnitId":"889d134d7f3d3d7d","adFormat":"REWARDED","networkName":"AppLovin","networkPlacement":"inter_videoa","creativeId":"20945973","placement":"","revenue":"0.002465956926345825","revenuePrecision":"exact","waterfallInfo":{},"dspName":"","name":"OnRewardedAdHiddenEvent"}`)

    SendMessage("MaxSdkCallbacks", "ForwardEvent", `{"adUnitId":"22c7da7816de341e","adFormat":"REWARDED","networkName":"Google AdMob","networkPlacement":"ca-app-pub-3032511519363854\/5658671116","creativeId":"rl5GZLaCJpaOrATD4bGYBA","placement":"","revenue":"0.002943064","revenuePrecision":"exact","waterfallInfo":{},"dspName":"","name":"OnRewardedAdReceivedRewardEvent","rewardLabel":"","rewardAmount":"0"}`)
    SendMessage("MaxSdkCallbacks", "ForwardEvent", `{"adUnitId":"22c7da7816de341e","adFormat":"REWARDED","networkName":"Google AdMob","networkPlacement":"ca-app-pub-3032511519363854\/5658671116","creativeId":"rl5GZLaCJpaOrATD4bGYBA","placement":"","revenue":"0.002943064","revenuePrecision":"exact","waterfallInfo":{},"dspName":"","name":"OnRewardedAdHiddenEvent"}`)

    // Assembly-CSharp.IronSourceRewardedVideoAndroid ↓ 
    // todo: Ultimate Car Driving Simulator @ https://apkcombo.com/zh/ultimate-car-driving-simulator/com.sir.racing.ultimatecardrivingsimulator/


}

interface AdEvent {
    adUnitId: string
    adFormat: string
    networkName: string
    networkPlacement: string
    creativeId: string
    placement: string
    revenue: string
    revenuePrecision: string
    waterfallInfo: WaterfallInfo
    dspName: string
    name: string
}

interface WaterfallInfo {
    name: string
    testName: string
    networkResponses: NetworkResponse[]
    latencyMillis: number
}

interface NetworkResponse {
    adLoadState: string
    mediatedNetwork: MediatedNetwork
    credentials: Credentials
    error: Error
    latencyMillis: string
}

interface MediatedNetwork {
    name: string
    adapterClassName: string
    adapterVersion: string
    sdkVersion: string
}

interface Credentials {
    app_id: string
    placement_id: string
}

interface Error {
    errorMessage: string
    errorCode: string
}
