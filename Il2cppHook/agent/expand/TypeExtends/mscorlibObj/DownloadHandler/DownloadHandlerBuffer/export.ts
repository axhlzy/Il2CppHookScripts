export class DownloadHandlerBufferHooker {

    static hook() {
        let local_GetData = Il2Cpp.Api.DownloadHandlerBuffer._GetData
        if (local_GetData) {
            A(local_GetData, undefined, (ret) => {
                LOGD(`[*] DownloadHandlerBuffer.GetData() | ret = '${ret}'`)
            })
        }
    }

}