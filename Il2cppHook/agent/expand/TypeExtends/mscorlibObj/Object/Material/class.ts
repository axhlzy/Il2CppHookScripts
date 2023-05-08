import { UnityEngine_Color_Impl as Color } from "../../ValueType/Color/class"
import { UnityEngine_Matrix4x4_Impl as Matrix4x4 } from "../../ValueType/Matrix4x4/class"
import { UnityEngine_Vector2_Impl as Vector2 } from "../../ValueType/Vector2/class"
import { UnityEngine_Vector4_Impl as Vector4 } from "../../ValueType/Vector4/class"
import { UnityEngine_Object } from "../class"
import { UnityEngine_Shader_Impl as Shader } from "../Shader/class"
import { UnityEngine_Texture_Impl as Texture } from "../Texture/class"

type UnityEngine_Rendering_ShaderPropertyFlags = number

class UnityEngine_Material_Impl extends UnityEngine_Object {

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }
    static CreateWithShader(self: UnityEngine_Material_Impl, shader: Shader): void {
        return Il2Cpp.Api.Material._CreateWithShader(self.handle, shader.handle)
    }

    static CreateWithMaterial(self: UnityEngine_Material_Impl, source: UnityEngine_Material_Impl): void {
        return Il2Cpp.Api.Material._CreateWithMaterial(self.handle, source.handle)
    }

    static CreateWithString(self: UnityEngine_Material_Impl): void {
        return Il2Cpp.Api.Material._CreateWithString(self.handle)
    }

    _ctor(shader: Shader): void {
        return Il2Cpp.Api.Material.__ctor(this.handle, shader.handle)
    }

    _ctor_source(source: UnityEngine_Material_Impl): void {
        return Il2Cpp.Api.Material.__ctor(this.handle, source.handle)
    }

    _ctor_contents(contents: string): void {
        return Il2Cpp.Api.Material.__ctor(this.handle, allocUStr(contents))
    }

    set_shader(value: Shader): void {
        return Il2Cpp.Api.Material._set_shader(this.handle, value.handle)
    }

    get_color(): Color {
        return new Color(Il2Cpp.Api.Material._get_color(this.handle))
    }

    get_color_ptr(): NativePointer {
        return Il2Cpp.Api.Material._get_color(this.handle)
    }

    set_color(value: Color): void {
        return Il2Cpp.Api.Material._set_color(this.handle, value.handle)
    }

    get_mainTexture(): Texture {
        return new Texture(Il2Cpp.Api.Material._get_mainTexture(this.handle))
    }

    set_mainTextureScale(value: Vector2): void {
        return Il2Cpp.Api.Material._set_mainTextureScale(this.handle, value.handle)
    }

    GetFirstPropertyNameIdByAttribute(attributeFlag: UnityEngine_Rendering_ShaderPropertyFlags): number {
        return Il2Cpp.Api.Material._GetFirstPropertyNameIdByAttribute(this.handle, attributeFlag)
    }

    HasProperty(nameID: number): boolean {
        return Il2Cpp.Api.Material._HasProperty(this.handle, nameID)
    }

    HasProperty_1(name: string): boolean {
        return Il2Cpp.Api.Material._HasProperty(this.handle, allocUStr(name))
    }

    set_renderQueue(value: number): void {
        return Il2Cpp.Api.Material._set_renderQueue(this.handle, value)
    }

    EnableKeyword(keyword: string): void {
        return Il2Cpp.Api.Material._EnableKeyword(this.handle, allocUStr(keyword))
    }

    DisableKeyword(keyword: string): void {
        return Il2Cpp.Api.Material._DisableKeyword(this.handle, allocUStr(keyword))
    }

    get_passCount(): number {
        return Il2Cpp.Api.Material._get_passCount(this.handle)
    }

    SetPass(pass: number): boolean {
        return Il2Cpp.Api.Material._SetPass(this.handle, pass)
    }

    CopyPropertiesFromMaterial(mat: UnityEngine_Material_Impl): void {
        return Il2Cpp.Api.Material._CopyPropertiesFromMaterial(this.handle, mat.handle)
    }

    GetShaderKeywords(): string[] {
        return Il2Cpp.Api.Material._GetShaderKeywords(this.handle)
    }

    SetShaderKeywords(names: string[]): void {
        return Il2Cpp.Api.Material._SetShaderKeywords(this.handle, names)
    }

    get_shaderKeywords(): string[] {
        return Il2Cpp.Api.Material._get_shaderKeywords(this.handle)
    }

    set_shaderKeywords(value: string[]): void {
        return Il2Cpp.Api.Material._set_shaderKeywords(this.handle, value)
    }

    ComputeCRC(): number {
        return Il2Cpp.Api.Material._ComputeCRC(this.handle)
    }

    SetFloatImpl(name: number, value: number): void {
        return Il2Cpp.Api.Material._SetFloatImpl(this.handle, name, value)
    }

    SetColorImpl(name: number, value: Color): void {
        return Il2Cpp.Api.Material._SetColorImpl(this.handle, name, value.handle)
    }

    SetMatrixImpl(name: number, value: Matrix4x4): void {
        return Il2Cpp.Api.Material._SetMatrixImpl(this.handle, name, value.handle)
    }

    SetTextureImpl(name: number, value: Texture): void {
        return Il2Cpp.Api.Material._SetTextureImpl(this.handle, name, value.handle)
    }

    GetFloatImpl(name: number): number {
        return Il2Cpp.Api.Material._GetFloatImpl(this.handle, name)
    }

    GetColorImpl(name: number): Color {
        return new Color(Il2Cpp.Api.Material._GetColorImpl(this.handle, name))
    }

    GetTextureImpl(name: number): Texture {
        return new Texture(Il2Cpp.Api.Material._GetTextureImpl(this.handle, name))
    }

    GetTextureScaleAndOffsetImpl(name: number): Vector4 {
        return new Vector4(Il2Cpp.Api.Material._GetTextureScaleAndOffsetImpl(this.handle, name))
    }

    SetTextureOffsetImpl(name: number, offset: Vector2): void {
        return Il2Cpp.Api.Material._SetTextureOffsetImpl(this.handle, name, offset.handle)
    }

    SetTextureScaleImpl(name: number, scale: Vector2): void {
        return Il2Cpp.Api.Material._SetTextureScaleImpl(this.handle, name, scale.handle)
    }

    SetFloat(name: string, value: number): void {
        return Il2Cpp.Api.Material._SetFloat(this.handle, allocUStr(name), value)
    }

    SetFloat_2(nameID: number, value: number): void {
        return Il2Cpp.Api.Material._SetFloat(this.handle, nameID, value)
    }

    SetInt(name: string, value: number): void {
        return Il2Cpp.Api.Material._SetInt(this.handle, allocUStr(name), value)
    }

    SetColor(name: string, value: Color): void {
        return Il2Cpp.Api.Material._SetColor(this.handle, allocUStr(name), value.handle)
    }

    SetColor_2(nameID: number, value: Color): void {
        return Il2Cpp.Api.Material._SetColor(this.handle, nameID, value.handle)
    }

    SetVector(name: string, value: Vector4): void {
        return Il2Cpp.Api.Material._SetVector(this.handle, allocUStr(name), value.handle)
    }

    SetVector_2(nameID: number, value: Vector4): void {
        return Il2Cpp.Api.Material._SetVector(this.handle, nameID, value.handle)
    }

    SetMatrix(name: string, value: Matrix4x4): void {
        return Il2Cpp.Api.Material._SetMatrix(this.handle, allocUStr(name), value.handle)
    }

    SetMatrix_2(nameID: number, value: Matrix4x4): void {
        return Il2Cpp.Api.Material._SetMatrix(this.handle, nameID, value.handle)
    }

    SetTexture(name: string, value: Texture): void {
        return Il2Cpp.Api.Material._SetTexture(this.handle, allocUStr(name), value.handle)
    }

    SetTexture_2(nameID: number, value: Texture): void {
        return Il2Cpp.Api.Material._SetTexture(this.handle, nameID, value.handle)
    }

    GetFloat(name: string): number {
        return Il2Cpp.Api.Material._GetFloat(this.handle, allocUStr(name))
    }

    GetFloat_1(nameID: number): number {
        return Il2Cpp.Api.Material._GetFloat(this.handle, nameID)
    }

    GetColor(name: string): Color {
        return new Color(Il2Cpp.Api.Material._GetColor(this.handle, allocUStr(name)))
    }

    GetColor_1(nameID: number): Color {
        return new Color(Il2Cpp.Api.Material._GetColor(this.handle, nameID))
    }

    GetVector(nameID: number): Vector4 {
        return new Vector4(Il2Cpp.Api.Material._GetVector(this.handle, nameID))
    }

    GetTexture(name: string): Texture {
        return new Texture(Il2Cpp.Api.Material._GetTexture(this.handle, allocUStr(name)))
    }

    GetTexture_1(nameID: number): Texture {
        return new Texture(Il2Cpp.Api.Material._GetTexture(this.handle, nameID))
    }

    SetTextureOffset(nameID: number, value: Vector2): void {
        return Il2Cpp.Api.Material._SetTextureOffset(this.handle, nameID, value.handle)
    }

    SetTextureScale(name: string, value: Vector2): void {
        return Il2Cpp.Api.Material._SetTextureScale(this.handle, allocUStr(name), value.handle)
    }

    SetTextureScale_2(nameID: number, value: Vector2): void {
        return Il2Cpp.Api.Material._SetTextureScale(this.handle, nameID, value.handle)
    }

    GetTextureOffset(nameID: number): Vector2 {
        return new Vector2(Il2Cpp.Api.Material._GetTextureOffset(this.handle, nameID))
    }

    GetTextureScale(nameID: number): Vector2 {
        return new Vector2(Il2Cpp.Api.Material._GetTextureScale(this.handle, nameID))
    }

    SetColorImpl_Injected(name: number, value: Color): void {
        return Il2Cpp.Api.Material._SetColorImpl_Injected(this.handle, name, value.handle)
    }

    SetMatrixImpl_Injected(name: number, value: Matrix4x4): void {
        return Il2Cpp.Api.Material._SetMatrixImpl_Injected(this.handle, name, value.handle)
    }

    GetColorImpl_Injected(name: number, ret: Color): void {
        return Il2Cpp.Api.Material._GetColorImpl_Injected(this.handle, name, ret.handle)
    }

    GetTextureScaleAndOffsetImpl_Injected(name: number, ret: Vector4): void {
        return Il2Cpp.Api.Material._GetTextureScaleAndOffsetImpl_Injected(this.handle, name, ret.handle)
    }

    SetTextureOffsetImpl_Injected(name: number, offset: Vector2): void {
        return Il2Cpp.Api.Material._SetTextureOffsetImpl_Injected(this.handle, name, offset.handle)
    }

    SetTextureScaleImpl_Injected(name: number, scale: Vector2): void {
        return Il2Cpp.Api.Material._SetTextureScaleImpl_Injected(this.handle, name, scale.handle)
    }
}

Il2Cpp.Material = UnityEngine_Material_Impl

declare global {
    namespace Il2Cpp {
        class Material extends UnityEngine_Material_Impl { }
    }
}

export { UnityEngine_Material_Impl }
