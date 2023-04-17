
import { UnityEngine_Vector2_Impl as UnityEngine_Vector2 } from "../../../ValueType/Vector2/class"
import { UnityEngine_Texture_Impl as UnityEngine_Texture } from "../../Texture/class"
import { mscorlib_System_Object_impl as System_Object } from "../../../class"
import { UnityEngine_Color_Impl } from "../../../ValueType/Color/class"
import { UnityEngine_Rect } from "../../../ValueType/Rect/class"
import { UnityEngine_Material_Impl } from "../../Material/class"
import { UnityEngine_Component_Impl } from "../class"

type System_Void = void
type System_Int32 = number
type System_Boolean = boolean
type UnityEngine_Color = UnityEngine_Color_Impl
type UnityEngine_Material = UnityEngine_Material_Impl
type UnityEngine_Mesh = NativePointer

class UnityEngine_CanvasRenderer_Impl extends UnityEngine_Component_Impl {

    // <isMask>k__BackingField: System_Boolean = lfv(this.handle, "<isMask>k__BackingField") as unknown as System_Boolean

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    set_hasPopInstruction(value: System_Boolean): System_Void {
        return Il2Cpp.Api.CanvasRenderer._set_hasPopInstruction(this.handle, value)
    }

    get_materialCount(): System_Int32 {
        return Il2Cpp.Api.CanvasRenderer._get_materialCount(this.handle)
    }

    set_materialCount(value: System_Int32): System_Void {
        return Il2Cpp.Api.CanvasRenderer._set_materialCount(this.handle, value)
    }

    set_popMaterialCount(value: System_Int32): System_Void {
        return Il2Cpp.Api.CanvasRenderer._set_popMaterialCount(this.handle, value)
    }

    get_absoluteDepth(): System_Int32 {
        return Il2Cpp.Api.CanvasRenderer._get_absoluteDepth(this.handle)
    }

    get_hasMoved(): System_Boolean {
        return Il2Cpp.Api.CanvasRenderer._get_hasMoved(this.handle)
    }

    get_cull(): System_Boolean {
        return Il2Cpp.Api.CanvasRenderer._get_cull(this.handle)
    }

    set_cull(value: System_Boolean): System_Void {
        return Il2Cpp.Api.CanvasRenderer._set_cull(this.handle, value)
    }

    SetColor(color: UnityEngine_Color): System_Void {
        return Il2Cpp.Api.CanvasRenderer._SetColor(this.handle, color.handle)
    }

    GetColor(): UnityEngine_Color {
        return new UnityEngine_Color_Impl(Il2Cpp.Api.CanvasRenderer._GetColor(this.handle))
    }

    EnableRectClipping(rect: UnityEngine_Rect): System_Void {
        return Il2Cpp.Api.CanvasRenderer._EnableRectClipping(this.handle, rect.handle)
    }

    set_clippingSoftness(value: UnityEngine_Vector2): System_Void {
        return Il2Cpp.Api.CanvasRenderer._set_clippingSoftness(this.handle, value.handle)
    }

    DisableRectClipping(): System_Void {
        return Il2Cpp.Api.CanvasRenderer._DisableRectClipping(this.handle)
    }

    SetMaterial(material: UnityEngine_Material, index: System_Int32): System_Void {
        return Il2Cpp.Api.CanvasRenderer._SetMaterial(this.handle, material.handle, index)
    }

    GetMaterial(index: System_Int32): UnityEngine_Material {
        return new UnityEngine_Material_Impl(Il2Cpp.Api.CanvasRenderer._GetMaterial(this.handle, index))
    }

    SetPopMaterial(material: UnityEngine_Material, index: System_Int32): System_Void {
        return Il2Cpp.Api.CanvasRenderer._SetPopMaterial(this.handle, material.handle, index)
    }

    SetTexture(texture: UnityEngine_Texture): System_Void {
        return Il2Cpp.Api.CanvasRenderer._SetTexture(this.handle, texture.handle)
    }

    SetAlphaTexture(texture: UnityEngine_Texture): System_Void {
        return Il2Cpp.Api.CanvasRenderer._SetAlphaTexture(this.handle, texture.handle)
    }

    SetMesh(mesh: UnityEngine_Mesh): System_Void {
        return Il2Cpp.Api.CanvasRenderer._SetMesh(this.handle, mesh)
    }

    Clear(): System_Void {
        return Il2Cpp.Api.CanvasRenderer._Clear(this.handle)
    }

    SetMaterial_2(material: UnityEngine_Material, texture: UnityEngine_Texture): System_Void {
        return Il2Cpp.Api.CanvasRenderer._SetMaterial(this.handle, material.handle, texture.handle)
    }

    // static SplitUIVertexStreams(verts: System_Collections.Generic.List<UnityEngine.UIVertex>, positions: System_Collections.Generic.List<UnityEngine.Vector3>, colors: System_Collections.Generic.List<UnityEngine.Color32>, uv0S: System_Collections.Generic.List<UnityEngine.Vector4>, uv1S: System_Collections.Generic.List<UnityEngine.Vector4>, uv2S: System_Collections.Generic.List<UnityEngine.Vector4>, uv3S: System_Collections.Generic.List<UnityEngine.Vector4>, normals: System_Collections.Generic.List<UnityEngine.Vector3>, tangents: System_Collections.Generic.List<UnityEngine.Vector4>, indices: System_Collections.Generic.List<System.Int32>): System_Void {
    //     return Il2Cpp.Api.CanvasRenderer._SplitUIVertexStreams(verts, positions, colors, uv0S, uv1S, uv2S, uv3S, normals, tangents, indices)
    // }

    // static CreateUIVertexStream(verts: System_Collections.Generic.List<UnityEngine.UIVertex>, positions: System_Collections.Generic.List<UnityEngine.Vector3>, colors: System_Collections.Generic.List<UnityEngine.Color32>, uv0S: System_Collections.Generic.List<UnityEngine.Vector4>, uv1S: System_Collections.Generic.List<UnityEngine.Vector4>, uv2S: System_Collections.Generic.List<UnityEngine.Vector4>, uv3S: System_Collections.Generic.List<UnityEngine.Vector4>, normals: System_Collections.Generic.List<UnityEngine.Vector3>, tangents: System_Collections.Generic.List<UnityEngine.Vector4>, indices: System_Collections.Generic.List<System.Int32>): System_Void {
    //     return Il2Cpp.Api.CanvasRenderer._CreateUIVertexStream(verts, positions, colors, uv0S, uv1S, uv2S, uv3S, normals, tangents, indices)
    // }

    // static AddUIVertexStream(verts: System_Collections.Generic.List<UnityEngine.UIVertex>, positions: System_Collections.Generic.List<UnityEngine.Vector3>, colors: System_Collections.Generic.List<UnityEngine.Color32>, uv0S: System_Collections.Generic.List<UnityEngine.Vector4>, uv1S: System_Collections.Generic.List<UnityEngine.Vector4>, uv2S: System_Collections.Generic.List<UnityEngine.Vector4>, uv3S: System_Collections.Generic.List<UnityEngine.Vector4>, normals: System_Collections.Generic.List<UnityEngine.Vector3>, tangents: System_Collections.Generic.List<UnityEngine.Vector4>): System_Void {
    //     return Il2Cpp.Api.CanvasRenderer._AddUIVertexStream(verts, positions, colors, uv0S, uv1S, uv2S, uv3S, normals, tangents)
    // }

    static SplitIndicesStreamsInternal(verts: System_Object, indices: System_Object): System_Void {
        return Il2Cpp.Api.CanvasRenderer._SplitIndicesStreamsInternal(verts.handle, indices.handle)
    }

    static SplitUIVertexStreamsInternal(verts: System_Object, positions: System_Object, colors: System_Object, uv0S: System_Object, uv1S: System_Object, uv2S: System_Object, uv3S: System_Object, normals: System_Object, tangents: System_Object): System_Void {
        return Il2Cpp.Api.CanvasRenderer._SplitUIVertexStreamsInternal(verts.handle, positions.handle, colors.handle, uv0S.handle, uv1S.handle, uv2S.handle, uv3S.handle, normals.handle, tangents.handle)
    }

    static CreateUIVertexStreamInternal(verts: System_Object, positions: System_Object, colors: System_Object, uv0S: System_Object, uv1S: System_Object, uv2S: System_Object, uv3S: System_Object, normals: System_Object, tangents: System_Object, indices: System_Object): System_Void {
        return Il2Cpp.Api.CanvasRenderer._CreateUIVertexStreamInternal(verts.handle, positions.handle, colors.handle, uv0S.handle, uv1S.handle, uv2S.handle, uv3S.handle, normals.handle, tangents.handle, indices.handle)
    }

    SetColor_Injected(color: UnityEngine_Color): System_Void {
        return Il2Cpp.Api.CanvasRenderer._SetColor_Injected(this.handle, color.handle)
    }

    GetColor_Injected(ret: UnityEngine_Color): System_Void {
        return Il2Cpp.Api.CanvasRenderer._GetColor_Injected(this.handle, ret.handle)
    }

    EnableRectClipping_Injected(rect: UnityEngine_Rect): System_Void {
        return Il2Cpp.Api.CanvasRenderer._EnableRectClipping_Injected(this.handle, rect.handle)
    }

    set_clippingSoftness_Injected(value: UnityEngine_Vector2): System_Void {
        return Il2Cpp.Api.CanvasRenderer._set_clippingSoftness_Injected(this.handle, value.handle)
    }

    toString(): string {
        return "TODO..."
    }

}

Il2Cpp.CanvasRenderer = UnityEngine_CanvasRenderer_Impl

declare global {
    namespace Il2Cpp {
        class CanvasRenderer extends UnityEngine_CanvasRenderer_Impl { }
    }
}

export { UnityEngine_CanvasRenderer_Impl }