import { cache } from "decorator-cache-getter"

class UnityEngine_ImageConversion_API {
    // public static Byte[] EncodeToPNG(Texture2D tex)
    @cache
    static get _EncodeToPNG() {
        return Il2Cpp.Api.o("UnityEngine.ImageConversionModule", "UnityEngine.ImageConversion", "EncodeToPNG", 1, ["UnityEngine.Texture2D"], "pointer", ["pointer"])
    }

    // public static Byte[] EncodeToJPG(Texture2D tex, Int32 quality)
    @cache
    static get _EncodeToJPG() {
        return Il2Cpp.Api.o("UnityEngine.ImageConversionModule", "UnityEngine.ImageConversion", "EncodeToJPG", 2, ["UnityEngine.Texture2D", "System.Int32"], "pointer", ["pointer", "pointer"])
    }

    // public static Byte[] EncodeToJPG(Texture2D tex)
    @cache
    static get _EncodeToJPG_tex() {
        return Il2Cpp.Api.o("UnityEngine.ImageConversionModule", "UnityEngine.ImageConversion", "EncodeToJPG", 1, ["UnityEngine.Texture2D"], "pointer", ["pointer"])
    }

    // public static Boolean LoadImage(Texture2D tex, Byte[] data, Boolean markNonReadable)
    @cache
    static get _LoadImage() {
        return Il2Cpp.Api.o("UnityEngine.ImageConversionModule", "UnityEngine.ImageConversion", "LoadImage", 3, ["UnityEngine.Texture2D", "System.Byte[]", "System.Boolean"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // public static Boolean LoadImage(Texture2D tex, Byte[] data)
    @cache
    static get _LoadImage_tex_data() {
        return Il2Cpp.Api.o("UnityEngine.ImageConversionModule", "UnityEngine.ImageConversion", "LoadImage", 2, ["UnityEngine.Texture2D", "System.Byte[]"], "pointer", ["pointer", "pointer"])
    }

}

Il2Cpp.Api.ImageConversion = UnityEngine_ImageConversion_API

declare global {
    namespace Il2Cpp.Api {
        class ImageConversion extends UnityEngine_ImageConversion_API { }
    }
}

export { }