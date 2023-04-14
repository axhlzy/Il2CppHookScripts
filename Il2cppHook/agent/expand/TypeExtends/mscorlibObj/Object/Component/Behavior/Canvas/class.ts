import { UnityEngine_Material_Impl as Material } from "../../../Material/class"
import { UnityEngine_Behaviour_Impl as Behaviour } from "../class"
import { UnityEngine_Camera as Camera } from "../Camera/class"

type UnityEngine_Canvas_WillRenderCanvases = NativePointer
type UnityEngine_RenderMode = NativePointer
type UnityEngine_AdditionalCanvasShaderChannels = NativePointer

class UnityEngine_Canvas_Impl extends Behaviour {

    willRenderCanvases: UnityEngine_Canvas_WillRenderCanvases = lfv(this.handle, "willRenderCanvases")

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    static add_willRenderCanvases(value: UnityEngine_Canvas_WillRenderCanvases): void {
        return Il2Cpp.Api.Canvas._add_willRenderCanvases(value)
    }

    static remove_willRenderCanvases(value: UnityEngine_Canvas_WillRenderCanvases): void {
        return Il2Cpp.Api.Canvas._remove_willRenderCanvases(value)
    }

    get_renderMode(): UnityEngine_RenderMode {
        return Il2Cpp.Api.Canvas._get_renderMode(this.handle)
    }

    set_renderMode(value: UnityEngine_RenderMode): void {
        return Il2Cpp.Api.Canvas._set_renderMode(this.handle, value)
    }

    get_isRootCanvas(): boolean {
        return Il2Cpp.Api.Canvas._get_isRootCanvas(this.handle)
    }

    get_scaleFactor(): number {
        return Il2Cpp.Api.Canvas._get_scaleFactor(this.handle)
    }

    set_scaleFactor(value: number): void {
        return Il2Cpp.Api.Canvas._set_scaleFactor(this.handle, value)
    }

    get_referencePixelsPerUnit(): number {
        return Il2Cpp.Api.Canvas._get_referencePixelsPerUnit(this.handle)
    }

    set_referencePixelsPerUnit(value: number): void {
        return Il2Cpp.Api.Canvas._set_referencePixelsPerUnit(this.handle, value)
    }

    get_pixelPerfect(): boolean {
        return Il2Cpp.Api.Canvas._get_pixelPerfect(this.handle)
    }

    get_renderOrder(): number {
        return Il2Cpp.Api.Canvas._get_renderOrder(this.handle)
    }

    get_overrideSorting(): boolean {
        return Il2Cpp.Api.Canvas._get_overrideSorting(this.handle)
    }

    set_overrideSorting(value: boolean): void {
        return Il2Cpp.Api.Canvas._set_overrideSorting(this.handle, value)
    }

    get_sortingOrder(): number {
        return Il2Cpp.Api.Canvas._get_sortingOrder(this.handle)
    }

    set_sortingOrder(value: number): void {
        return Il2Cpp.Api.Canvas._set_sortingOrder(this.handle, value)
    }

    get_targetDisplay(): number {
        return Il2Cpp.Api.Canvas._get_targetDisplay(this.handle)
    }

    get_sortingLayerID(): number {
        return Il2Cpp.Api.Canvas._get_sortingLayerID(this.handle)
    }

    set_sortingLayerID(value: number): void {
        return Il2Cpp.Api.Canvas._set_sortingLayerID(this.handle, value)
    }

    get_additionalShaderChannels(): UnityEngine_AdditionalCanvasShaderChannels {
        return Il2Cpp.Api.Canvas._get_additionalShaderChannels(this.handle)
    }

    set_additionalShaderChannels(value: UnityEngine_AdditionalCanvasShaderChannels): void {
        return Il2Cpp.Api.Canvas._set_additionalShaderChannels(this.handle, value)
    }

    get_rootCanvas(): UnityEngine_Canvas_Impl {
        return new UnityEngine_Canvas_Impl(Il2Cpp.Api.Canvas._get_rootCanvas(this.handle))
    }

    get_worldCamera(): Camera {
        return new Camera(Il2Cpp.Api.Canvas._get_worldCamera(this.handle))
    }

    set_worldCamera(value: Camera): void {
        return Il2Cpp.Api.Canvas._set_worldCamera(this.handle, value.handle)
    }

    static GetDefaultCanvasMaterial(): Material {
        return new Material(Il2Cpp.Api.Canvas._GetDefaultCanvasMaterial())
    }

    static GetETC1SupportedCanvasMaterial(): Material {
        return new Material(Il2Cpp.Api.Canvas._GetETC1SupportedCanvasMaterial())
    }

    static ForceUpdateCanvases(): void {
        return Il2Cpp.Api.Canvas._ForceUpdateCanvases()
    }

    static SendWillRenderCanvases(): void {
        return Il2Cpp.Api.Canvas._SendWillRenderCanvases()
    }

    _ctor(): void {
        return Il2Cpp.Api.Canvas.__ctor(alloc())
    }

}

Il2Cpp.Canvas = UnityEngine_Canvas_Impl

declare global {
    namespace Il2Cpp {
        class Canvas extends UnityEngine_Canvas_Impl { }
    }
}

export { UnityEngine_Canvas_Impl }
