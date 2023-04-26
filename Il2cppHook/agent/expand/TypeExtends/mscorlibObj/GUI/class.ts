import { mscorlib_System_Object_impl as System_Object_Impl } from "../class"
import { UnityEngine_Color_Impl as UnityEngine_Color } from "../ValueType/Color/class"

type UnityEngine_GUISkin = NativePointer
type System_DateTime = NativePointer
type UnityEngine_GUIStyle = NativePointer
type UnityEngine_GUIContent = NativePointer
type UnityEngine_Rect = NativePointer
type UnityEngineInternal_GenericStack = NativePointer
type UnityEngine_GUI_WindowFunction = NativePointer

class UnityEngine_GUI_Impl extends System_Object_Impl {

    s_HotTextField: number = lfv(this.handle, "s_HotTextField") as unknown as number
    s_BoxHash: number = lfv(this.handle, "s_BoxHash") as unknown as number
    s_ButonHash: number = lfv(this.handle, "s_ButonHash") as unknown as number
    s_RepeatButtonHash: number = lfv(this.handle, "s_RepeatButtonHash") as unknown as number
    s_ToggleHash: number = lfv(this.handle, "s_ToggleHash") as unknown as number
    s_ButtonGridHash: number = lfv(this.handle, "s_ButtonGridHash") as unknown as number
    s_SliderHash: number = lfv(this.handle, "s_SliderHash") as unknown as number
    s_BeginGroupHash: number = lfv(this.handle, "s_BeginGroupHash") as unknown as number
    s_ScrollviewHash: number = lfv(this.handle, "s_ScrollviewHash") as unknown as number
    // < nextScrollStepTime > k__BackingField: System_DateTime = lfv(this.handle, "<nextScrollStepTime>k__BackingField") as unknown as System_DateTime
    s_Skin: UnityEngine_GUISkin = lfv(this.handle, "s_Skin") as unknown as UnityEngine_GUISkin
    // < scrollViewStates > k__BackingField: UnityEngineInternal_GenericStack = lfv(this.handle, "<scrollViewStates>k__BackingField") as unknown as UnityEngineInternal_GenericStack

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    static get_color(): UnityEngine_Color {
        return Il2Cpp.Api.GUI._get_color()
    }

    static set_color(value: UnityEngine_Color): void {
        return Il2Cpp.Api.GUI._set_color(value)
    }

    static set_changed(value: boolean): void {
        return Il2Cpp.Api.GUI._set_changed(value)
    }

    static set_depth(value: number): void {
        return Il2Cpp.Api.GUI._set_depth(value)
    }

    static _cctor(): void {
        return Il2Cpp.Api.GUI.__cctor()
    }

    static set_nextScrollStepTime(value: System_DateTime): void {
        return Il2Cpp.Api.GUI._set_nextScrollStepTime(value)
    }

    static set_skin(value: UnityEngine_GUISkin): void {
        return Il2Cpp.Api.GUI._set_skin(value)
    }

    static get_skin(): UnityEngine_GUISkin {
        return Il2Cpp.Api.GUI._get_skin()
    }

    static DoSetSkin(newSkin: UnityEngine_GUISkin): void {
        return Il2Cpp.Api.GUI._DoSetSkin(newSkin)
    }

    static Label(position: UnityEngine_Rect, text: string, style: UnityEngine_GUIStyle): void {
        return Il2Cpp.Api.GUI._Label(position, text, style)
    }

    static Label_3(position: UnityEngine_Rect, content: UnityEngine_GUIContent, style: UnityEngine_GUIStyle): void {
        return Il2Cpp.Api.GUI._Label(position, content, style)
    }

    static DoLabel(position: UnityEngine_Rect, content: UnityEngine_GUIContent, style: UnityEngine_GUIStyle): void {
        return Il2Cpp.Api.GUI._DoLabel(position, content, style)
    }

    static get_scrollViewStates(): UnityEngineInternal_GenericStack {
        return Il2Cpp.Api.GUI._get_scrollViewStates()
    }

    static CallWindowDelegate(func: UnityEngine_GUI_WindowFunction, id: number, instanceID: number, _skin: UnityEngine_GUISkin, forceRect: number, width: number, height: number, style: UnityEngine_GUIStyle): void {
        return Il2Cpp.Api.GUI._CallWindowDelegate(func, id, instanceID, _skin, forceRect, width, height, style)
    }

    static get_color_Injected(ret: UnityEngine_Color): void {
        return Il2Cpp.Api.GUI._get_color_Injected(ret)
    }

    static set_color_Injected(value: UnityEngine_Color): void {
        return Il2Cpp.Api.GUI._set_color_Injected(value)
    }
}

Il2Cpp.GUI = UnityEngine_GUI_Impl

declare global {
    namespace Il2Cpp {
        class GUI extends UnityEngine_GUI_Impl { }
    }
}

export { UnityEngine_GUI_Impl }
