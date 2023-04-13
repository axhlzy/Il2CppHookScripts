export class DownloadHandlerAudioClipHooker {

    static hook() {
        let local_GetText = Il2Cpp.Api.DownloadHandlerAudioClip._GetText
        if (local_GetText) {
            A(local_GetText, undefined, (ret) => {
                LOGD(`[*] DownloadHandlerAudioClipHooker.GetText() | ret = '${readU16(ret)}'`)
            })
        }
        let local_GetData = Il2Cpp.Api.DownloadHandlerAudioClip._GetData
        if (local_GetData) {
            A(local_GetData, undefined, (ret) => {
                LOGD(`[*] DownloadHandlerAudioClipHooker.GetData() | ret = '${ret}'`)
            })
        }
    }

}