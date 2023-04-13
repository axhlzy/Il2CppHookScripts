import { DownloadHandlerAudioClipHooker } from "./DownloadHandlerAudioClip/export"
import { DownloadHandlerBufferHooker } from "./DownloadHandlerBuffer/export"
import { DownloadHandlerFileHooker } from "./DownloadHandlerFile/export"
import { DownloadHandlerTextureHooker } from "./DownloadHandlerTexture/export"

export { }

const HookDownloadHandler = () => {
    DownloadHandlerAudioClipHooker.hook()
    DownloadHandlerBufferHooker.hook()
    DownloadHandlerFileHooker.hook()
    DownloadHandlerTextureHooker.hook()
}

declare global {
    var HookDownloadHandler: () => void
}

globalThis.HookDownloadHandler = HookDownloadHandler