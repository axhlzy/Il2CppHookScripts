export class DownloadHandlerBufferHooker {

    static hook() {
        try {
            let local_GetData = Il2Cpp.Api.DownloadHandlerBuffer._GetData
            if (local_GetData) {
                A(local_GetData, undefined, (ret) => {
                    LOGD(`[*] DownloadHandlerBuffer.GetData() | ret = '${ret}'`)
                })
            }
            LOGD(`Hook DownloadHandlerBuffer.GetData()`)
        } catch (error) {
            LOGE(error)
        }
    }

}