import { UnityEngine_FullScreenMode as FullScreenMode, UnityEngine_ScreenOrientation as ScreenOrientation } from "./enum"
import { enumNumToName } from "../../../../bridge/fix/enum"
import { mscorlib_System_Object_impl } from "../class"

type System_Int32 = number
type System_Single = number
type System_Void = void

class UnityEngine_Screen_Impl extends mscorlib_System_Object_impl {

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    static get_width(): System_Int32 {
        return Il2Cpp.Api.Screen._get_width().toInt32()
    }

    static get_height(): System_Int32 {
        return Il2Cpp.Api.Screen._get_height().toInt32()
    }

    static get_dpi(): System_Single {
        return readSingle(Il2Cpp.Api.Screen._get_dpi())
    }

    static GetScreenOrientation(): ScreenOrientation {
        return Il2Cpp.Api.Screen._GetScreenOrientation()
    }

    static GetScreenOrientation_toString(): string {
        return enumNumToName(Il2Cpp.Api.Screen._GetScreenOrientation(), "ScreenOrientation")
    }

    static get_fullScreenMode(): FullScreenMode {
        return Il2Cpp.Api.Screen._get_fullScreenMode()
    }

    static get_fullScreenMode_toString(): string {
        return enumNumToName(Il2Cpp.Api.Screen._get_fullScreenMode(), "FullScreenMode")
    }

    static get_orientation(): ScreenOrientation {
        return Il2Cpp.Api.Screen._get_orientation()
    }

    static get_orientation_toString(): string {
        return enumNumToName(Il2Cpp.Api.Screen._get_orientation(), "ScreenOrientation")
    }

    static set_sleepTimeout(value: System_Int32): System_Void {
        return Il2Cpp.Api.Screen._set_sleepTimeout(value)
    }

}

Il2Cpp.Screen = UnityEngine_Screen_Impl

declare global {
    namespace Il2Cpp {
        class Screen extends UnityEngine_Screen_Impl { }
    }
}

export { UnityEngine_Screen_Impl }