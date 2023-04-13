export class DownloadHandlerTextureHooker {

    static hook() {

        try {
            let local_GetData = Il2Cpp.Api.DownloadHandlerTexture._GetData
            if (local_GetData) {
                A(local_GetData, undefined, (ret) => {
                    LOGD(`[*] DownloadHandlerTexture.GetData() | ret = '${ret}'`)
                })
            }
            LOGD(`Hook DownloadHandlerTexture.GetData()`)
        } catch (error) {
            LOGE(error)
        }

        try {
            let local_GetContent = Il2Cpp.Api.DownloadHandlerTexture._GetContent
            if (local_GetContent) {
                A(local_GetContent, undefined, (ret) => {
                    LOGD(`[*] DownloadHandlerTexture.GetContent() | ret = '${ret}'`)
                })
            }
            LOGD(`Hook DownloadHandlerTexture.GetContent()`)
        } catch (error) {
            LOGE(error)
        }

        try {
            let local_get_texture = Il2Cpp.Api.DownloadHandlerTexture._get_texture
            if (local_get_texture) {
                A(local_get_texture, undefined, (ret) => {
                    LOGD(`[*] DownloadHandlerTexture.get_texture() | ret = '${ret}'`)
                })
            }
            LOGD(`Hook DownloadHandlerTexture.get_texture()`)
        } catch (error) {
            LOGE(error)
        }

    }

}