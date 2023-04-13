export class DownloadHandlerTextureHooker {

    static hook() {

        let local_GetData = Il2Cpp.Api.DownloadHandlerTexture._GetData
        if (local_GetData) {
            A(local_GetData, undefined, (ret) => {
                LOGD(`[*] DownloadHandlerTexture.GetData() | ret = '${ret}'`)
            })
        }

        let local_GetContent = Il2Cpp.Api.DownloadHandlerTexture._GetContent
        if (local_GetContent) {
            A(local_GetContent, undefined, (ret) => {
                LOGD(`[*] DownloadHandlerTexture.GetContent() | ret = '${ret}'`)
            })
        }

        let local_get_texture = Il2Cpp.Api.DownloadHandlerTexture._get_texture
        if (local_get_texture) {
            A(local_get_texture, undefined, (ret) => {
                LOGD(`[*] DownloadHandlerTexture.get_texture() | ret = '${ret}'`)
            })
        }

    }

}