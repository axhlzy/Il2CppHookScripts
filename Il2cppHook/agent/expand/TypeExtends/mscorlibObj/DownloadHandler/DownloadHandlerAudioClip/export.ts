export class DownloadHandlerAudioClipHooker {

    static hook() {
        try {
            let local_GetText = Il2Cpp.Api.DownloadHandlerAudioClip._GetText
            if (local_GetText != null) {
                A(local_GetText, undefined, (ret) => {
                    LOGD(`[*] DownloadHandlerAudioClipHooker.GetText() | ret = '${readU16(ret)}'`)
                })
            }
            LOGD(`Hook DownloadHandlerAudioClipHooker.GetText()`)
        } catch (error) {
            LOGE(error)
        }

        try {
            let local_GetData = Il2Cpp.Api.DownloadHandlerAudioClip._GetData
            if (local_GetData != null) {
                A(local_GetData, undefined, (ret) => {
                    LOGD(`[*] DownloadHandlerAudioClipHooker.GetData() | ret = '${ret}'`)
                })
            }
            LOGD(`Hook DownloadHandlerAudioClipHooker.GetData()`)
        } catch (error) {
            LOGE(error)
        }

    }

}