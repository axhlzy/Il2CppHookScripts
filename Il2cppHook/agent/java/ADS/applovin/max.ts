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
                LOGD(`SendUnityMessage("MaxSdkCallbacks", "ForwardEvent", "${recordSrcInfo.get(key)!.replace(/"/g, '\\"')})")`)
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
}

globalThis.HookMaxCallBack = HookMaxCallBack
globalThis.listMaxCallBack = listMaxCallBack

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
