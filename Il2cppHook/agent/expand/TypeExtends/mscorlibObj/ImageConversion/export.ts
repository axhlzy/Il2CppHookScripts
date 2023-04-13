export { }

declare global {
    var showTexture2D: (mPtr: NativePointer) => void
}

globalThis.showTexture2D = (mPtr: NativePointer) => {

    let local_mPtr = checkCmdInput(mPtr)
    // let encodeToJPG_1 = find_method("UnityEngine.ImageConversionModule", "ImageConversion", "EncodeToJPG", 1)
    let encodeToJPG_1 = Il2Cpp.Api.ImageConversion._EncodeToJPG_tex
    if (encodeToJPG_1) {
        seeHexA(encodeToJPG_1(local_mPtr))
        return
    }

    // let encodeToJPG_2 = find_method("UnityEngine.ImageConversionModule", "ImageConversion", "EncodeToJPG", 2)
    let encodeToJPG_2 = Il2Cpp.Api.ImageConversion._EncodeToJPG
    if (encodeToJPG_2) {
        seeHexA(encodeToJPG_2(local_mPtr, 100))
        return
    }

    let encodeToPNG_1 = find_method("UnityEngine.ImageConversionModule", "ImageConversion", "EncodeToPNG", 1)
    if (encodeToPNG_1) {
        seeHexA(callFunction(encodeToPNG_1, local_mPtr))
        return
    }

}