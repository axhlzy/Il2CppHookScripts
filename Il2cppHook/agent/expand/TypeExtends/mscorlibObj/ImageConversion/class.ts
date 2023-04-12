import { UnityEngine_Texture2D_Impl as UnityEngine_Texture2D } from "../Object/Texture/Texture2D/class"
import { System_Boolean_Impl as System_Boolean } from "../ValueType/Boolean/class"
import { mscorlib_System_Object_impl } from "../class"

type System_Int32 = number
type System_Byte = NativePointer

class UnityEngine_ImageConversion_Impl extends mscorlib_System_Object_impl {

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }
    static EncodeToPNG(tex: UnityEngine_Texture2D): System_Byte[] {
        return Il2Cpp.Api.ImageConversion._EncodeToPNG(tex)
    }

    static EncodeToJPG(tex: UnityEngine_Texture2D, quality: System_Int32): System_Byte[] {
        return Il2Cpp.Api.ImageConversion._EncodeToJPG(tex, quality)
    }

    static EncodeToJPG_1(tex: UnityEngine_Texture2D): System_Byte[] {
        return Il2Cpp.Api.ImageConversion._EncodeToJPG(tex)
    }

    static LoadImage(tex: UnityEngine_Texture2D, data: System_Byte[], markNonReadable: System_Boolean): System_Boolean {
        return Il2Cpp.Api.ImageConversion._LoadImage(tex, data, markNonReadable)
    }

    static LoadImage_2(tex: UnityEngine_Texture2D, data: System_Byte[]): System_Boolean {
        return Il2Cpp.Api.ImageConversion._LoadImage(tex, data)
    }
}

Il2Cpp.ImageConversion = UnityEngine_ImageConversion_Impl

declare global {
    namespace Il2Cpp {
        class ImageConversion extends UnityEngine_ImageConversion_Impl { }
    }
}

export { UnityEngine_ImageConversion_Impl }