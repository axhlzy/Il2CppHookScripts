export class DownloadHandlerFileHooker {

    static hook() {

        try {
            let local_GetText = Il2Cpp.Api.DownloadHandlerFile._GetText
            if (local_GetText) {
                A(local_GetText, undefined, (ret) => {
                    LOGD(`[*] DownloadHandlerFile.GetText() | ret = '${readU16(ret)}'`)
                })
            }
            LOGD(`Hook DownloadHandlerFile.GetText()`)
        } catch (error) {
            LOGE(error)
        }

        try {
            let local_GetData = Il2Cpp.Api.DownloadHandlerFile._GetData
            if (local_GetData) {
                A(local_GetData, undefined, (ret) => {
                    LOGD(`[*] DownloadHandlerFile.GetData() | ret = '${ret}'`)
                })
            }
            LOGD(`Hook DownloadHandlerFile.GetData()`)
        } catch (error) {
            LOGE(error)
        }


    }

}