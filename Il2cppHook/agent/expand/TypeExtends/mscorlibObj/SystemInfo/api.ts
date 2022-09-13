import { cache } from "decorator-cache-getter"

class UnityEngine_SystemInfo_API {
    // public static String get_operatingSystem()
    @cache
    static get _get_operatingSystem() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_operatingSystem", 0, [], "pointer", [])
    }

    // public static OperatingSystemFamily get_operatingSystemFamily()
    @cache
    static get _get_operatingSystemFamily() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_operatingSystemFamily", 0, [], "pointer", [])
    }

    // public static String get_processorType()
    @cache
    static get _get_processorType() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_processorType", 0, [], "pointer", [])
    }

    // public static String get_deviceUniqueIdentifier()
    @cache
    static get _get_deviceUniqueIdentifier() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_deviceUniqueIdentifier", 0, [], "pointer", [])
    }

    // public static String get_deviceName()
    @cache
    static get _get_deviceName() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_deviceName", 0, [], "pointer", [])
    }

    // public static String get_deviceModel()
    @cache
    static get _get_deviceModel() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_deviceModel", 0, [], "pointer", [])
    }

    // public static DeviceType get_deviceType()
    @cache
    static get _get_deviceType() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_deviceType", 0, [], "pointer", [])
    }

    // public static Int32 get_graphicsMemorySize()
    @cache
    static get _get_graphicsMemorySize() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_graphicsMemorySize", 0, [], "pointer", [])
    }

    // public static String get_graphicsDeviceVendor()
    @cache
    static get _get_graphicsDeviceVendor() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_graphicsDeviceVendor", 0, [], "pointer", [])
    }

    // public static GraphicsDeviceType get_graphicsDeviceType()
    @cache
    static get _get_graphicsDeviceType() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_graphicsDeviceType", 0, [], "pointer", [])
    }

    // public static Boolean get_graphicsUVStartsAtTop()
    @cache
    static get _get_graphicsUVStartsAtTop() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_graphicsUVStartsAtTop", 0, [], "pointer", [])
    }

    // public static String get_graphicsDeviceVersion()
    @cache
    static get _get_graphicsDeviceVersion() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_graphicsDeviceVersion", 0, [], "pointer", [])
    }

    // public static Int32 get_graphicsShaderLevel()
    @cache
    static get _get_graphicsShaderLevel() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_graphicsShaderLevel", 0, [], "pointer", [])
    }

    // public static Boolean get_hasHiddenSurfaceRemovalOnGPU()
    @cache
    static get _get_hasHiddenSurfaceRemovalOnGPU() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_hasHiddenSurfaceRemovalOnGPU", 0, [], "pointer", [])
    }

    // public static Boolean get_supportsShadows()
    @cache
    static get _get_supportsShadows() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_supportsShadows", 0, [], "pointer", [])
    }

    // public static CopyTextureSupport get_copyTextureSupport()
    @cache
    static get _get_copyTextureSupport() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_copyTextureSupport", 0, [], "pointer", [])
    }

    // public static Boolean get_supportsRenderTargetArrayIndexFromVertexShader()
    @cache
    static get _get_supportsRenderTargetArrayIndexFromVertexShader() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_supportsRenderTargetArrayIndexFromVertexShader", 0, [], "pointer", [])
    }

    // public static Int32 get_supportedRenderTargetCount()
    @cache
    static get _get_supportedRenderTargetCount() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_supportedRenderTargetCount", 0, [], "pointer", [])
    }

    // public static Int32 get_supportsMultisampledTextures()
    @cache
    static get _get_supportsMultisampledTextures() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_supportsMultisampledTextures", 0, [], "pointer", [])
    }

    // public static Boolean get_supportsMultisampleAutoResolve()
    @cache
    static get _get_supportsMultisampleAutoResolve() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_supportsMultisampleAutoResolve", 0, [], "pointer", [])
    }

    // public static Boolean get_usesReversedZBuffer()
    @cache
    static get _get_usesReversedZBuffer() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_usesReversedZBuffer", 0, [], "pointer", [])
    }

    // private static Boolean IsValidEnumValue(Enum value)
    @cache
    static get _IsValidEnumValue() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "IsValidEnumValue", 1, ["System.Enum"], "pointer", ["pointer"])
    }

    // public static Boolean SupportsRenderTextureFormat(RenderTextureFormat format)
    @cache
    static get _SupportsRenderTextureFormat() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "SupportsRenderTextureFormat", 1, ["UnityEngine.RenderTextureFormat"], "pointer", ["pointer"])
    }

    // public static Boolean SupportsTextureFormat(TextureFormat format)
    @cache
    static get _SupportsTextureFormat() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "SupportsTextureFormat", 1, ["UnityEngine.TextureFormat"], "pointer", ["pointer"])
    }

    // public static Boolean get_supportsGraphicsFence()
    @cache
    static get _get_supportsGraphicsFence() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_supportsGraphicsFence", 0, [], "pointer", [])
    }

    // public static Boolean get_supportsMultiview()
    @cache
    static get _get_supportsMultiview() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_supportsMultiview", 0, [], "pointer", [])
    }

    // public static Boolean get_supportsStoreAndResolveAction()
    @cache
    static get _get_supportsStoreAndResolveAction() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_supportsStoreAndResolveAction", 0, [], "pointer", [])
    }

    // private static String GetOperatingSystem()
    @cache
    static get _GetOperatingSystem() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetOperatingSystem", 0, [], "pointer", [])
    }

    // private static OperatingSystemFamily GetOperatingSystemFamily()
    @cache
    static get _GetOperatingSystemFamily() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetOperatingSystemFamily", 0, [], "pointer", [])
    }

    // private static String GetProcessorType()
    @cache
    static get _GetProcessorType() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetProcessorType", 0, [], "pointer", [])
    }

    // private static String GetDeviceUniqueIdentifier()
    @cache
    static get _GetDeviceUniqueIdentifier() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetDeviceUniqueIdentifier", 0, [], "pointer", [])
    }

    // private static String GetDeviceName()
    @cache
    static get _GetDeviceName() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetDeviceName", 0, [], "pointer", [])
    }

    // private static String GetDeviceModel()
    @cache
    static get _GetDeviceModel() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetDeviceModel", 0, [], "pointer", [])
    }

    // private static DeviceType GetDeviceType()
    @cache
    static get _GetDeviceType() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetDeviceType", 0, [], "pointer", [])
    }

    // private static Int32 GetGraphicsMemorySize()
    @cache
    static get _GetGraphicsMemorySize() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetGraphicsMemorySize", 0, [], "pointer", [])
    }

    // private static String GetGraphicsDeviceVendor()
    @cache
    static get _GetGraphicsDeviceVendor() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetGraphicsDeviceVendor", 0, [], "pointer", [])
    }

    // private static GraphicsDeviceType GetGraphicsDeviceType()
    @cache
    static get _GetGraphicsDeviceType() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetGraphicsDeviceType", 0, [], "pointer", [])
    }

    // private static Boolean GetGraphicsUVStartsAtTop()
    @cache
    static get _GetGraphicsUVStartsAtTop() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetGraphicsUVStartsAtTop", 0, [], "pointer", [])
    }

    // private static String GetGraphicsDeviceVersion()
    @cache
    static get _GetGraphicsDeviceVersion() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetGraphicsDeviceVersion", 0, [], "pointer", [])
    }

    // private static Int32 GetGraphicsShaderLevel()
    @cache
    static get _GetGraphicsShaderLevel() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetGraphicsShaderLevel", 0, [], "pointer", [])
    }

    // private static Boolean HasHiddenSurfaceRemovalOnGPU()
    @cache
    static get _HasHiddenSurfaceRemovalOnGPU() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "HasHiddenSurfaceRemovalOnGPU", 0, [], "pointer", [])
    }

    // private static Boolean SupportsShadows()
    @cache
    static get _SupportsShadows() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "SupportsShadows", 0, [], "pointer", [])
    }

    // private static CopyTextureSupport GetCopyTextureSupport()
    @cache
    static get _GetCopyTextureSupport() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetCopyTextureSupport", 0, [], "pointer", [])
    }

    // private static Boolean SupportsRenderTargetArrayIndexFromVertexShader()
    @cache
    static get _SupportsRenderTargetArrayIndexFromVertexShader() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "SupportsRenderTargetArrayIndexFromVertexShader", 0, [], "pointer", [])
    }

    // private static Int32 SupportedRenderTargetCount()
    @cache
    static get _SupportedRenderTargetCount() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "SupportedRenderTargetCount", 0, [], "pointer", [])
    }

    // private static Int32 SupportsMultisampledTextures()
    @cache
    static get _SupportsMultisampledTextures() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "SupportsMultisampledTextures", 0, [], "pointer", [])
    }

    // private static Boolean SupportsMultisampleAutoResolve()
    @cache
    static get _SupportsMultisampleAutoResolve() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "SupportsMultisampleAutoResolve", 0, [], "pointer", [])
    }

    // private static Boolean UsesReversedZBuffer()
    @cache
    static get _UsesReversedZBuffer() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "UsesReversedZBuffer", 0, [], "pointer", [])
    }

    // private static Boolean HasRenderTextureNative(RenderTextureFormat format)
    @cache
    static get _HasRenderTextureNative() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "HasRenderTextureNative", 1, ["UnityEngine.RenderTextureFormat"], "pointer", ["pointer"])
    }

    // private static Boolean SupportsTextureFormatNative(TextureFormat format)
    @cache
    static get _SupportsTextureFormatNative() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "SupportsTextureFormatNative", 1, ["UnityEngine.TextureFormat"], "pointer", ["pointer"])
    }

    // private static Boolean SupportsGPUFence()
    @cache
    static get _SupportsGPUFence() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "SupportsGPUFence", 0, [], "pointer", [])
    }

    // public static Boolean IsFormatSupported(GraphicsFormat format,FormatUsage usage)
    @cache
    static get _IsFormatSupported() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "IsFormatSupported", 2, ["UnityEngine.Experimental.Rendering.GraphicsFormat", "UnityEngine.Experimental.Rendering.FormatUsage"], "pointer", ["pointer", "pointer"])
    }

    // public static GraphicsFormat GetCompatibleFormat(GraphicsFormat format,FormatUsage usage)
    @cache
    static get _GetCompatibleFormat() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetCompatibleFormat", 2, ["UnityEngine.Experimental.Rendering.GraphicsFormat", "UnityEngine.Experimental.Rendering.FormatUsage"], "pointer", ["pointer", "pointer"])
    }

    // public static GraphicsFormat GetGraphicsFormat(DefaultFormat format)
    @cache
    static get _GetGraphicsFormat() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetGraphicsFormat", 1, ["UnityEngine.Experimental.Rendering.DefaultFormat"], "pointer", ["pointer"])
    }

    // public static Int32 GetRenderTextureSupportedMSAASampleCount(RenderTextureDescriptor desc)
    @cache
    static get _GetRenderTextureSupportedMSAASampleCount() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetRenderTextureSupportedMSAASampleCount", 1, ["UnityEngine.RenderTextureDescriptor"], "pointer", ["pointer"])
    }

    // private static Boolean SupportsMultiview()
    @cache
    static get _SupportsMultiview() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "SupportsMultiview", 0, [], "pointer", [])
    }

    // private static Boolean SupportsStoreAndResolveAction()
    @cache
    static get _SupportsStoreAndResolveAction() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "SupportsStoreAndResolveAction", 0, [], "pointer", [])
    }

    // private static Int32 GetRenderTextureSupportedMSAASampleCount_Injected(RenderTextureDescriptor& desc)
    @cache
    static get _GetRenderTextureSupportedMSAASampleCount_Injected() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetRenderTextureSupportedMSAASampleCount_Injected", 1, ["UnityEngine.RenderTextureDescriptor&"], "pointer", ["pointer"])
    }

}

Il2Cpp.Api.SystemInfo = UnityEngine_SystemInfo_API

declare global {
    namespace Il2Cpp.Api {
        class SystemInfo extends UnityEngine_SystemInfo_API { }
    }
}

export { }