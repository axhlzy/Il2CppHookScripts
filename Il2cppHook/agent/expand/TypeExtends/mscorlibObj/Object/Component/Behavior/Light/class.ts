import { UnityEngine_Color_Impl as Color } from "../../../../ValueType/Color/class"
import { UnityEngine_Texture_Impl as Texture } from "../../../Texture/class"
import { UnityEngine_Behaviour_Impl as Behaviour } from "../class"
import { UnityEngine_LightType as LightType } from "./enum"

type UnityEngine_LightBakingOutput = NativePointer
type UnityEngine_LightShadows = NativePointer

class UnityEngine_Light_Impl extends Behaviour {

    m_BakedIndex: number = lfv(this.handle, "m_BakedIndex") as unknown as number

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    get_type(): LightType {
        return Il2Cpp.Api.Light._get_type(this.handle)
    }

    get_spotAngle(): number {
        return Il2Cpp.Api.Light._get_spotAngle(this.handle)
    }

    get_color(): Color {
        return new Color(Il2Cpp.Api.Light._get_color(this.handle))
    }

    set_color(value: Color): void {
        return Il2Cpp.Api.Light._set_color(this.handle, value.handle)
    }

    get_intensity(): number {
        return Il2Cpp.Api.Light._get_intensity(this.handle)
    }

    set_intensity(value: number): void {
        return Il2Cpp.Api.Light._set_intensity(this.handle, value)
    }

    get_bounceIntensity(): number {
        return Il2Cpp.Api.Light._get_bounceIntensity(this.handle)
    }

    get_range(): number {
        return Il2Cpp.Api.Light._get_range(this.handle)
    }

    get_bakingOutput(): UnityEngine_LightBakingOutput {
        return Il2Cpp.Api.Light._get_bakingOutput(this.handle)
    }

    get_shadows(): UnityEngine_LightShadows {
        return Il2Cpp.Api.Light._get_shadows(this.handle)
    }

    get_cookieSize(): number {
        return Il2Cpp.Api.Light._get_cookieSize(this.handle)
    }

    get_cookie(): Texture {
        return new Texture(Il2Cpp.Api.Light._get_cookie(this.handle))
    }

    get_color_Injected(ret: Color): void {
        return Il2Cpp.Api.Light._get_color_Injected(this.handle, ret.handle)
    }

    set_color_Injected(value: Color): void {
        return Il2Cpp.Api.Light._set_color_Injected(this.handle, value.handle)
    }

    get_bakingOutput_Injected(ret: UnityEngine_LightBakingOutput): void {
        return Il2Cpp.Api.Light._get_bakingOutput_Injected(this.handle, ret)
    }

}

Il2Cpp.Light = UnityEngine_Light_Impl

declare global {
    namespace Il2Cpp {
        class Light extends UnityEngine_Light_Impl { }
    }
}

export { UnityEngine_Light_Impl }
