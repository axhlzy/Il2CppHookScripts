import { cache } from "decorator-cache-getter"

class UnityEngine_CanvasRenderer_API {
    // public Void set_hasPopInstruction(Boolean value)
    @cache
    static get _set_hasPopInstruction() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.CanvasRenderer", "set_hasPopInstruction", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // public Int32 get_materialCount()
    @cache
    static get _get_materialCount() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.CanvasRenderer", "get_materialCount", 0, [], "pointer", ["pointer"])
    }

    // public Void set_materialCount(Int32 value)
    @cache
    static get _set_materialCount() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.CanvasRenderer", "set_materialCount", 1, ["System.Int32"], "void", ["pointer", "pointer"])
    }

    // public Void set_popMaterialCount(Int32 value)
    @cache
    static get _set_popMaterialCount() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.CanvasRenderer", "set_popMaterialCount", 1, ["System.Int32"], "void", ["pointer", "pointer"])
    }

    // public Int32 get_absoluteDepth()
    @cache
    static get _get_absoluteDepth() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.CanvasRenderer", "get_absoluteDepth", 0, [], "pointer", ["pointer"])
    }

    // public Boolean get_hasMoved()
    @cache
    static get _get_hasMoved() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.CanvasRenderer", "get_hasMoved", 0, [], "pointer", ["pointer"])
    }

    // public Boolean get_cull()
    @cache
    static get _get_cull() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.CanvasRenderer", "get_cull", 0, [], "pointer", ["pointer"])
    }

    // public Void set_cull(Boolean value)
    @cache
    static get _set_cull() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.CanvasRenderer", "set_cull", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
    }

    // public Void SetColor(Color color)
    @cache
    static get _SetColor() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.CanvasRenderer", "SetColor", 1, ["UnityEngine.Color"], "void", ["pointer", "pointer"])
    }

    // public Color GetColor()
    @cache
    static get _GetColor() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.CanvasRenderer", "GetColor", 0, [], "pointer", ["pointer"])
    }

    // public Void EnableRectClipping(Rect rect)
    @cache
    static get _EnableRectClipping() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.CanvasRenderer", "EnableRectClipping", 1, ["UnityEngine.Rect"], "void", ["pointer", "pointer"])
    }

    // public Void set_clippingSoftness(Vector2 value)
    @cache
    static get _set_clippingSoftness() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.CanvasRenderer", "set_clippingSoftness", 1, ["UnityEngine.Vector2"], "void", ["pointer", "pointer"])
    }

    // public Void DisableRectClipping()
    @cache
    static get _DisableRectClipping() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.CanvasRenderer", "DisableRectClipping", 0, [], "void", ["pointer"])
    }

    // public Void SetMaterial(Material material, Int32 index)
    @cache
    static get _SetMaterial() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.CanvasRenderer", "SetMaterial", 2, ["UnityEngine.Material", "System.Int32"], "void", ["pointer", "pointer", "pointer"])
    }

    // public Material GetMaterial(Int32 index)
    @cache
    static get _GetMaterial() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.CanvasRenderer", "GetMaterial", 1, ["System.Int32"], "pointer", ["pointer", "pointer"])
    }

    // public Void SetPopMaterial(Material material, Int32 index)
    @cache
    static get _SetPopMaterial() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.CanvasRenderer", "SetPopMaterial", 2, ["UnityEngine.Material", "System.Int32"], "void", ["pointer", "pointer", "pointer"])
    }

    // public Void SetTexture(Texture texture)
    @cache
    static get _SetTexture() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.CanvasRenderer", "SetTexture", 1, ["UnityEngine.Texture"], "void", ["pointer", "pointer"])
    }

    // public Void SetAlphaTexture(Texture texture)
    @cache
    static get _SetAlphaTexture() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.CanvasRenderer", "SetAlphaTexture", 1, ["UnityEngine.Texture"], "void", ["pointer", "pointer"])
    }

    // public Void SetMesh(Mesh mesh)
    @cache
    static get _SetMesh() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.CanvasRenderer", "SetMesh", 1, ["UnityEngine.Mesh"], "void", ["pointer", "pointer"])
    }

    // public Void Clear()
    @cache
    static get _Clear() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.CanvasRenderer", "Clear", 0, [], "void", ["pointer"])
    }

    // public Void SetMaterial(Material material, Texture texture)
    @cache
    static get _SetMaterial_material_texture() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.CanvasRenderer", "SetMaterial", 2, ["UnityEngine.Material", "UnityEngine.Texture"], "void", ["pointer", "pointer", "pointer"])
    }

    // public static Void SplitUIVertexStreams(System.Collections.Generic.List<UnityEngine.UIVertex> verts, System.Collections.Generic.List<UnityEngine.Vector3> positions, System.Collections.Generic.List<UnityEngine.Color32> colors, System.Collections.Generic.List<UnityEngine.Vector4> uv0S, System.Collections.Generic.List<UnityEngine.Vector4> uv1S, System.Collections.Generic.List<UnityEngine.Vector4> uv2S, System.Collections.Generic.List<UnityEngine.Vector4> uv3S, System.Collections.Generic.List<UnityEngine.Vector3> normals, System.Collections.Generic.List<UnityEngine.Vector4> tangents, System.Collections.Generic.List<System.Int32> indices)
    @cache
    static get _SplitUIVertexStreams() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.CanvasRenderer", "SplitUIVertexStreams", 10, ["System.Collections.Generic.List<UnityEngine.UIVertex>", "System.Collections.Generic.List<UnityEngine.Vector3>", "System.Collections.Generic.List<UnityEngine.Color32>", "System.Collections.Generic.List<UnityEngine.Vector4>", "System.Collections.Generic.List<UnityEngine.Vector4>", "System.Collections.Generic.List<UnityEngine.Vector4>", "System.Collections.Generic.List<UnityEngine.Vector4>", "System.Collections.Generic.List<UnityEngine.Vector3>", "System.Collections.Generic.List<UnityEngine.Vector4>", "System.Collections.Generic.List<System.Int32>"], "void", ["pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public static Void CreateUIVertexStream(System.Collections.Generic.List<UnityEngine.UIVertex> verts, System.Collections.Generic.List<UnityEngine.Vector3> positions, System.Collections.Generic.List<UnityEngine.Color32> colors, System.Collections.Generic.List<UnityEngine.Vector4> uv0S, System.Collections.Generic.List<UnityEngine.Vector4> uv1S, System.Collections.Generic.List<UnityEngine.Vector4> uv2S, System.Collections.Generic.List<UnityEngine.Vector4> uv3S, System.Collections.Generic.List<UnityEngine.Vector3> normals, System.Collections.Generic.List<UnityEngine.Vector4> tangents, System.Collections.Generic.List<System.Int32> indices)
    @cache
    static get _CreateUIVertexStream() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.CanvasRenderer", "CreateUIVertexStream", 10, ["System.Collections.Generic.List<UnityEngine.UIVertex>", "System.Collections.Generic.List<UnityEngine.Vector3>", "System.Collections.Generic.List<UnityEngine.Color32>", "System.Collections.Generic.List<UnityEngine.Vector4>", "System.Collections.Generic.List<UnityEngine.Vector4>", "System.Collections.Generic.List<UnityEngine.Vector4>", "System.Collections.Generic.List<UnityEngine.Vector4>", "System.Collections.Generic.List<UnityEngine.Vector3>", "System.Collections.Generic.List<UnityEngine.Vector4>", "System.Collections.Generic.List<System.Int32>"], "void", ["pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public static Void AddUIVertexStream(System.Collections.Generic.List<UnityEngine.UIVertex> verts, System.Collections.Generic.List<UnityEngine.Vector3> positions, System.Collections.Generic.List<UnityEngine.Color32> colors, System.Collections.Generic.List<UnityEngine.Vector4> uv0S, System.Collections.Generic.List<UnityEngine.Vector4> uv1S, System.Collections.Generic.List<UnityEngine.Vector4> uv2S, System.Collections.Generic.List<UnityEngine.Vector4> uv3S, System.Collections.Generic.List<UnityEngine.Vector3> normals, System.Collections.Generic.List<UnityEngine.Vector4> tangents)
    @cache
    static get _AddUIVertexStream() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.CanvasRenderer", "AddUIVertexStream", 9, ["System.Collections.Generic.List<UnityEngine.UIVertex>", "System.Collections.Generic.List<UnityEngine.Vector3>", "System.Collections.Generic.List<UnityEngine.Color32>", "System.Collections.Generic.List<UnityEngine.Vector4>", "System.Collections.Generic.List<UnityEngine.Vector4>", "System.Collections.Generic.List<UnityEngine.Vector4>", "System.Collections.Generic.List<UnityEngine.Vector4>", "System.Collections.Generic.List<UnityEngine.Vector3>", "System.Collections.Generic.List<UnityEngine.Vector4>"], "void", ["pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // private static Void SplitIndicesStreamsInternal(Object verts, Object indices)
    @cache
    static get _SplitIndicesStreamsInternal() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.CanvasRenderer", "SplitIndicesStreamsInternal", 2, ["System.Object", "System.Object"], "void", ["pointer", "pointer"])
    }

    // private static Void SplitUIVertexStreamsInternal(Object verts, Object positions, Object colors, Object uv0S, Object uv1S, Object uv2S, Object uv3S, Object normals, Object tangents)
    @cache
    static get _SplitUIVertexStreamsInternal() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.CanvasRenderer", "SplitUIVertexStreamsInternal", 9, ["System.Object", "System.Object", "System.Object", "System.Object", "System.Object", "System.Object", "System.Object", "System.Object", "System.Object"], "void", ["pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // private static Void CreateUIVertexStreamInternal(Object verts, Object positions, Object colors, Object uv0S, Object uv1S, Object uv2S, Object uv3S, Object normals, Object tangents, Object indices)
    @cache
    static get _CreateUIVertexStreamInternal() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.CanvasRenderer", "CreateUIVertexStreamInternal", 10, ["System.Object", "System.Object", "System.Object", "System.Object", "System.Object", "System.Object", "System.Object", "System.Object", "System.Object", "System.Object"], "void", ["pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // private Void SetColor_Injected(Color& color)
    @cache
    static get _SetColor_Injected() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.CanvasRenderer", "SetColor_Injected", 1, ["UnityEngine.Color&"], "void", ["pointer", "pointer"])
    }

    // private Void GetColor_Injected(Color& ret)
    @cache
    static get _GetColor_Injected() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.CanvasRenderer", "GetColor_Injected", 1, ["UnityEngine.Color&"], "void", ["pointer", "pointer"])
    }

    // private Void EnableRectClipping_Injected(Rect& rect)
    @cache
    static get _EnableRectClipping_Injected() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.CanvasRenderer", "EnableRectClipping_Injected", 1, ["UnityEngine.Rect&"], "void", ["pointer", "pointer"])
    }

    // private Void set_clippingSoftness_Injected(Vector2& value)
    @cache
    static get _set_clippingSoftness_Injected() {
        return Il2Cpp.Api.o("UnityEngine.UIModule", "UnityEngine.CanvasRenderer", "set_clippingSoftness_Injected", 1, ["UnityEngine.Vector2&"], "void", ["pointer", "pointer"])
    }

}

Il2Cpp.Api.CanvasRenderer = UnityEngine_CanvasRenderer_API

declare global {
    namespace Il2Cpp.Api {
        class CanvasRenderer extends UnityEngine_CanvasRenderer_API { }
    }
}

export { }