import { cache } from "decorator-cache-getter"

class UnityEngine_Canvas_API {
    // public static Void add_willRenderCanvases(WillRenderCanvases value)
    @cache
    static get _add_willRenderCanvases() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.Canvas", "add_willRenderCanvases", 1, ["UnityEngine.Canvas.WillRenderCanvases"], "void", ["pointer"])
    }

    // public static Void remove_willRenderCanvases(WillRenderCanvases value)
    @cache
    static get _remove_willRenderCanvases() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.Canvas", "remove_willRenderCanvases", 1, ["UnityEngine.Canvas.WillRenderCanvases"], "void", ["pointer"])
    }

    // public RenderMode get_renderMode()
    @cache
    static get _get_renderMode() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.Canvas", "get_renderMode", 0, [], "pointer", ["pointer"])
    }

    // public Void set_renderMode(RenderMode value)
    @cache
    static get _set_renderMode() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.Canvas", "set_renderMode", 1, ["UnityEngine.RenderMode"], "void", ["pointer", "pointer"])
    }

    // public Boolean get_isRootCanvas()
    @cache
    static get _get_isRootCanvas() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.Canvas", "get_isRootCanvas", 0, [], "pointer", ["pointer"])
    }

    // public Single get_scaleFactor()
    @cache
    static get _get_scaleFactor() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.Canvas", "get_scaleFactor", 0, [], "pointer", ["pointer"])
    }

    // public Void set_scaleFactor(Single value)
    @cache
    static get _set_scaleFactor() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.Canvas", "set_scaleFactor", 1, ["System.Single"], "void", ["pointer", "pointer"])
    }

    // public Single get_referencePixelsPerUnit()
    @cache
    static get _get_referencePixelsPerUnit() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.Canvas", "get_referencePixelsPerUnit", 0, [], "pointer", ["pointer"])
    }

    // public Void set_referencePixelsPerUnit(Single value)
    @cache
    static get _set_referencePixelsPerUnit() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.Canvas", "set_referencePixelsPerUnit", 1, ["System.Single"], "void", ["pointer", "pointer"])
    }

    // public Boolean get_pixelPerfect()
    @cache
    static get _get_pixelPerfect() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.Canvas", "get_pixelPerfect", 0, [], "pointer", ["pointer"])
    }

    // public Int32 get_renderOrder()
    @cache
    static get _get_renderOrder() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.Canvas", "get_renderOrder", 0, [], "pointer", ["pointer"])
    }

    // public Boolean get_overrideSorting()
    @cache
    static get _get_overrideSorting() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.Canvas", "get_overrideSorting", 0, [], "pointer", ["pointer"])
    }

    // public Void set_overrideSorting(Boolean value)
    @cache
    static get _set_overrideSorting() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.Canvas", "set_overrideSorting", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // public Int32 get_sortingOrder()
    @cache
    static get _get_sortingOrder() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.Canvas", "get_sortingOrder", 0, [], "pointer", ["pointer"])
    }

    // public Void set_sortingOrder(Int32 value)
    @cache
    static get _set_sortingOrder() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.Canvas", "set_sortingOrder", 1, ["System.Int32"], "void", ["pointer", "pointer"])
    }

    // public Int32 get_targetDisplay()
    @cache
    static get _get_targetDisplay() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.Canvas", "get_targetDisplay", 0, [], "pointer", ["pointer"])
    }

    // public Int32 get_sortingLayerID()
    @cache
    static get _get_sortingLayerID() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.Canvas", "get_sortingLayerID", 0, [], "pointer", ["pointer"])
    }

    // public Void set_sortingLayerID(Int32 value)
    @cache
    static get _set_sortingLayerID() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.Canvas", "set_sortingLayerID", 1, ["System.Int32"], "void", ["pointer", "pointer"])
    }

    // public AdditionalCanvasShaderChannels get_additionalShaderChannels()
    @cache
    static get _get_additionalShaderChannels() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.Canvas", "get_additionalShaderChannels", 0, [], "pointer", ["pointer"])
    }

    // public Void set_additionalShaderChannels(AdditionalCanvasShaderChannels value)
    @cache
    static get _set_additionalShaderChannels() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.Canvas", "set_additionalShaderChannels", 1, ["UnityEngine.AdditionalCanvasShaderChannels"], "void", ["pointer", "pointer"])
    }

    // public Canvas get_rootCanvas()
    @cache
    static get _get_rootCanvas() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.Canvas", "get_rootCanvas", 0, [], "pointer", ["pointer"])
    }

    // public Camera get_worldCamera()
    @cache
    static get _get_worldCamera() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.Canvas", "get_worldCamera", 0, [], "pointer", ["pointer"])
    }

    // public Void set_worldCamera(Camera value)
    @cache
    static get _set_worldCamera() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.Canvas", "set_worldCamera", 1, ["UnityEngine.Camera"], "void", ["pointer", "pointer"])
    }

    // public static Material GetDefaultCanvasMaterial()
    @cache
    static get _GetDefaultCanvasMaterial() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.Canvas", "GetDefaultCanvasMaterial", 0, [], "pointer", [])
    }

    // public static Material GetETC1SupportedCanvasMaterial()
    @cache
    static get _GetETC1SupportedCanvasMaterial() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.Canvas", "GetETC1SupportedCanvasMaterial", 0, [], "pointer", [])
    }

    // public static Void ForceUpdateCanvases()
    @cache
    static get _ForceUpdateCanvases() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.Canvas", "ForceUpdateCanvases", 0, [], "void", [])
    }

    // private static Void SendWillRenderCanvases()
    @cache
    static get _SendWillRenderCanvases() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.Canvas", "SendWillRenderCanvases", 0, [], "void", [])
    }

    // public Void .ctor()
    @cache
    static get __ctor() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.Canvas", ".ctor", 0, [], "void", ["pointer"])
    }

}

Il2Cpp.Api.Canvas = UnityEngine_Canvas_API

declare global {
    namespace Il2Cpp.Api {
        class Canvas extends UnityEngine_Canvas_API { }
    }
}

export { }