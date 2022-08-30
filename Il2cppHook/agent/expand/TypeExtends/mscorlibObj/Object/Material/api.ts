import { cache } from "decorator-cache-getter"

class UnityEngine_Material_API {
    // private static Void CreateWithShader(Material self,Shader shader)
    @cache
    static get _CreateWithShader() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "CreateWithShader", 2, "void", ["pointer", "pointer"])
    }

    // private static Void CreateWithMaterial(Material self,Material source)
    @cache
    static get _CreateWithMaterial() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "CreateWithMaterial", 2, "void", ["pointer", "pointer"])
    }

    // private static Void CreateWithString(Material self)
    @cache
    static get _CreateWithString() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "CreateWithString", 1, "void", ["pointer"])
    }

    // public Void .ctor(Shader shader)
    @cache
    static get __ctor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", ".ctor", 1, "void", ["pointer", "pointer"])
    }

    // public Void .ctor(Material source)
    @cache
    static get __ctor_source() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Material", ".ctor", 1, ["UnityEngine.Material"], "void", ["pointer", "pointer"])
    }

    // public Void .ctor(String contents)
    @cache
    static get __ctor_contents() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Material", ".ctor", 1, ["System.String"], "void", ["pointer", "pointer"])
    }

    // public Void set_shader(Shader value)
    @cache
    static get _set_shader() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "set_shader", 1, "void", ["pointer", "pointer"])
    }

    // public Color get_color()
    @cache
    static get _get_color() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "get_color", 0, "pointer", ["pointer"])
    }

    // public Void set_color(Color value)
    @cache
    static get _set_color() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "set_color", 1, "void", ["pointer", "pointer"])
    }

    // public Texture get_mainTexture()
    @cache
    static get _get_mainTexture() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "get_mainTexture", 0, "pointer", ["pointer"])
    }

    // public Void set_mainTextureScale(Vector2 value)
    @cache
    static get _set_mainTextureScale() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "set_mainTextureScale", 1, "void", ["pointer", "pointer"])
    }

    // private Int32 GetFirstPropertyNameIdByAttribute(ShaderPropertyFlags attributeFlag)
    @cache
    static get _GetFirstPropertyNameIdByAttribute() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "GetFirstPropertyNameIdByAttribute", 1, "pointer", ["pointer", "pointer"])
    }

    // public Boolean HasProperty(Int32 nameID)
    @cache
    static get _HasProperty() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "HasProperty", 1, "pointer", ["pointer", "pointer"])
    }

    // public Boolean HasProperty(String name)
    @cache
    static get _HasProperty_name() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Material", "HasProperty", 1, ["System.String"], "pointer", ["pointer", "pointer"])
    }

    // public Void set_renderQueue(Int32 value)
    @cache
    static get _set_renderQueue() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "set_renderQueue", 1, "void", ["pointer", "pointer"])
    }

    // public Void EnableKeyword(String keyword)
    @cache
    static get _EnableKeyword() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "EnableKeyword", 1, "void", ["pointer", "pointer"])
    }

    // public Void DisableKeyword(String keyword)
    @cache
    static get _DisableKeyword() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "DisableKeyword", 1, "void", ["pointer", "pointer"])
    }

    // public Int32 get_passCount()
    @cache
    static get _get_passCount() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "get_passCount", 0, "pointer", ["pointer"])
    }

    // public Boolean SetPass(Int32 pass)
    @cache
    static get _SetPass() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "SetPass", 1, "pointer", ["pointer", "pointer"])
    }

    // public Void CopyPropertiesFromMaterial(Material mat)
    @cache
    static get _CopyPropertiesFromMaterial() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "CopyPropertiesFromMaterial", 1, "void", ["pointer", "pointer"])
    }

    // private String[] GetShaderKeywords()
    @cache
    static get _GetShaderKeywords() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "GetShaderKeywords", 0, "pointer", ["pointer"])
    }

    // private Void SetShaderKeywords(String[] names)
    @cache
    static get _SetShaderKeywords() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "SetShaderKeywords", 1, "void", ["pointer", "pointer"])
    }

    // public String[] get_shaderKeywords()
    @cache
    static get _get_shaderKeywords() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "get_shaderKeywords", 0, "pointer", ["pointer"])
    }

    // public Void set_shaderKeywords(String[] value)
    @cache
    static get _set_shaderKeywords() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "set_shaderKeywords", 1, "void", ["pointer", "pointer"])
    }

    // public Int32 ComputeCRC()
    @cache
    static get _ComputeCRC() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "ComputeCRC", 0, "pointer", ["pointer"])
    }

    // private Void SetFloatImpl(Int32 name,Single value)
    @cache
    static get _SetFloatImpl() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "SetFloatImpl", 2, "void", ["pointer", "pointer", "pointer"])
    }

    // private Void SetColorImpl(Int32 name,Color value)
    @cache
    static get _SetColorImpl() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "SetColorImpl", 2, "void", ["pointer", "pointer", "pointer"])
    }

    // private Void SetMatrixImpl(Int32 name,Matrix4x4 value)
    @cache
    static get _SetMatrixImpl() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "SetMatrixImpl", 2, "void", ["pointer", "pointer", "pointer"])
    }

    // private Void SetTextureImpl(Int32 name,Texture value)
    @cache
    static get _SetTextureImpl() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "SetTextureImpl", 2, "void", ["pointer", "pointer", "pointer"])
    }

    // private Single GetFloatImpl(Int32 name)
    @cache
    static get _GetFloatImpl() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "GetFloatImpl", 1, "pointer", ["pointer", "pointer"])
    }

    // private Color GetColorImpl(Int32 name)
    @cache
    static get _GetColorImpl() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "GetColorImpl", 1, "pointer", ["pointer", "pointer"])
    }

    // private Texture GetTextureImpl(Int32 name)
    @cache
    static get _GetTextureImpl() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "GetTextureImpl", 1, "pointer", ["pointer", "pointer"])
    }

    // private Vector4 GetTextureScaleAndOffsetImpl(Int32 name)
    @cache
    static get _GetTextureScaleAndOffsetImpl() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "GetTextureScaleAndOffsetImpl", 1, "pointer", ["pointer", "pointer"])
    }

    // private Void SetTextureOffsetImpl(Int32 name,Vector2 offset)
    @cache
    static get _SetTextureOffsetImpl() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "SetTextureOffsetImpl", 2, "void", ["pointer", "pointer", "pointer"])
    }

    // private Void SetTextureScaleImpl(Int32 name,Vector2 scale)
    @cache
    static get _SetTextureScaleImpl() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "SetTextureScaleImpl", 2, "void", ["pointer", "pointer", "pointer"])
    }

    // public Void SetFloat(String name,Single value)
    @cache
    static get _SetFloat() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "SetFloat", 2, "void", ["pointer", "pointer", "pointer"])
    }

    // public Void SetFloat(Int32 nameID,Single value)
    @cache
    static get _SetFloat_nameID_value() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Material", "SetFloat", 2, ["System.Int32", "System.Single"], "void", ["pointer", "pointer", "pointer"])
    }

    // public Void SetInt(String name,Int32 value)
    @cache
    static get _SetInt() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "SetInt", 2, "void", ["pointer", "pointer", "pointer"])
    }

    // public Void SetColor(String name,Color value)
    @cache
    static get _SetColor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "SetColor", 2, "void", ["pointer", "pointer", "pointer"])
    }

    // public Void SetColor(Int32 nameID,Color value)
    @cache
    static get _SetColor_nameID_value() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Material", "SetColor", 2, ["System.Int32", "UnityEngine.Color"], "void", ["pointer", "pointer", "pointer"])
    }

    // public Void SetVector(String name,Vector4 value)
    @cache
    static get _SetVector() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "SetVector", 2, "void", ["pointer", "pointer", "pointer"])
    }

    // public Void SetVector(Int32 nameID,Vector4 value)
    @cache
    static get _SetVector_nameID_value() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Material", "SetVector", 2, ["System.Int32", "UnityEngine.Vector4"], "void", ["pointer", "pointer", "pointer"])
    }

    // public Void SetMatrix(String name,Matrix4x4 value)
    @cache
    static get _SetMatrix() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "SetMatrix", 2, "void", ["pointer", "pointer", "pointer"])
    }

    // public Void SetMatrix(Int32 nameID,Matrix4x4 value)
    @cache
    static get _SetMatrix_nameID_value() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Material", "SetMatrix", 2, ["System.Int32", "UnityEngine.Matrix4x4"], "void", ["pointer", "pointer", "pointer"])
    }

    // public Void SetTexture(String name,Texture value)
    @cache
    static get _SetTexture() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "SetTexture", 2, "void", ["pointer", "pointer", "pointer"])
    }

    // public Void SetTexture(Int32 nameID,Texture value)
    @cache
    static get _SetTexture_nameID_value() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Material", "SetTexture", 2, ["System.Int32", "UnityEngine.Texture"], "void", ["pointer", "pointer", "pointer"])
    }

    // public Single GetFloat(String name)
    @cache
    static get _GetFloat() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "GetFloat", 1, "pointer", ["pointer", "pointer"])
    }

    // public Single GetFloat(Int32 nameID)
    @cache
    static get _GetFloat_nameID() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Material", "GetFloat", 1, ["System.Int32"], "pointer", ["pointer", "pointer"])
    }

    // public Color GetColor(String name)
    @cache
    static get _GetColor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "GetColor", 1, "pointer", ["pointer", "pointer"])
    }

    // public Color GetColor(Int32 nameID)
    @cache
    static get _GetColor_nameID() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Material", "GetColor", 1, ["System.Int32"], "pointer", ["pointer", "pointer"])
    }

    // public Vector4 GetVector(Int32 nameID)
    @cache
    static get _GetVector() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "GetVector", 1, "pointer", ["pointer", "pointer"])
    }

    // public Texture GetTexture(String name)
    @cache
    static get _GetTexture() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "GetTexture", 1, "pointer", ["pointer", "pointer"])
    }

    // public Texture GetTexture(Int32 nameID)
    @cache
    static get _GetTexture_nameID() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Material", "GetTexture", 1, ["System.Int32"], "pointer", ["pointer", "pointer"])
    }

    // public Void SetTextureOffset(Int32 nameID,Vector2 value)
    @cache
    static get _SetTextureOffset() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "SetTextureOffset", 2, "void", ["pointer", "pointer", "pointer"])
    }

    // public Void SetTextureScale(String name,Vector2 value)
    @cache
    static get _SetTextureScale() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "SetTextureScale", 2, "void", ["pointer", "pointer", "pointer"])
    }

    // public Void SetTextureScale(Int32 nameID,Vector2 value)
    @cache
    static get _SetTextureScale_nameID_value() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Material", "SetTextureScale", 2, ["System.Int32", "UnityEngine.Vector2"], "void", ["pointer", "pointer", "pointer"])
    }

    // public Vector2 GetTextureOffset(Int32 nameID)
    @cache
    static get _GetTextureOffset() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "GetTextureOffset", 1, "pointer", ["pointer", "pointer"])
    }

    // public Vector2 GetTextureScale(Int32 nameID)
    @cache
    static get _GetTextureScale() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "GetTextureScale", 1, "pointer", ["pointer", "pointer"])
    }

    // private Void SetColorImpl_Injected(Int32 name,Color& value)
    @cache
    static get _SetColorImpl_Injected() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "SetColorImpl_Injected", 2, "void", ["pointer", "pointer", "pointer"])
    }

    // private Void SetMatrixImpl_Injected(Int32 name,Matrix4x4& value)
    @cache
    static get _SetMatrixImpl_Injected() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "SetMatrixImpl_Injected", 2, "void", ["pointer", "pointer", "pointer"])
    }

    // private Void GetColorImpl_Injected(Int32 name,Color& ret)
    @cache
    static get _GetColorImpl_Injected() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "GetColorImpl_Injected", 2, "void", ["pointer", "pointer", "pointer"])
    }

    // private Void GetTextureScaleAndOffsetImpl_Injected(Int32 name,Vector4& ret)
    @cache
    static get _GetTextureScaleAndOffsetImpl_Injected() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "GetTextureScaleAndOffsetImpl_Injected", 2, "void", ["pointer", "pointer", "pointer"])
    }

    // private Void SetTextureOffsetImpl_Injected(Int32 name,Vector2& offset)
    @cache
    static get _SetTextureOffsetImpl_Injected() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "SetTextureOffsetImpl_Injected", 2, "void", ["pointer", "pointer", "pointer"])
    }

    // private Void SetTextureScaleImpl_Injected(Int32 name,Vector2& scale)
    @cache
    static get _SetTextureScaleImpl_Injected() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Material", "SetTextureScaleImpl_Injected", 2, "void", ["pointer", "pointer", "pointer"])
    }
}

Il2Cpp.Api.Material = UnityEngine_Material_API

declare global {
    namespace Il2Cpp.Api {
        class Material extends UnityEngine_Material_API { }
    }
}

export { }