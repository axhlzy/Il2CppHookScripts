import { cache } from "decorator-cache-getter"

class SystemInfoApi {

    // GetCompatibleFormat(GraphicsFormat, FormatUsage) : GraphicsFormat
    @cache
    static get _GetCompatibleFormat() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetCompatibleFormat", 2, "pointer", ["pointer", "pointer", "pointer"])
    }

    // GetCopyTextureSupport() : CopyTextureSupport
    @cache
    static get _GetCopyTextureSupport() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetCopyTextureSupport", 0, "pointer", ["pointer"])
    }

    // GetDeviceModel() : String
    @cache
    static get _GetDeviceModel() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetDeviceModel", 0, "pointer", ["pointer"])
    }

    // GetDeviceName() : String
    @cache
    static get _GetDeviceName() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetDeviceName", 0, "pointer", ["pointer"])
    }

    // GetDeviceType() : DeviceType
    @cache
    static get _GetDeviceType() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetDeviceType", 0, "pointer", ["pointer"])
    }

    // GetDeviceUniqueIdentifier() : String
    @cache
    static get _GetDeviceUniqueIdentifier() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetDeviceUniqueIdentifier", 0, "pointer", ["pointer"])
    }

    // GetGraphicsDeviceID() : Int32
    @cache
    static get _GetGraphicsDeviceID() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetGraphicsDeviceID", 0, "int32", ["pointer"])
    }

    // GetGraphicsDeviceName() : String
    @cache
    static get _GetGraphicsDeviceName() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetGraphicsDeviceName", 0, "pointer", ["pointer"])
    }

    // GetGraphicsDeviceType() : GraphicsDeviceType
    @cache
    static get _GetGraphicsDeviceType() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetGraphicsDeviceType", 0, "pointer", ["pointer"])
    }

    // GetGraphicsDeviceVendor() : String
    @cache
    static get _GetGraphicsDeviceVendor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetGraphicsDeviceVendor", 0, "pointer", ["pointer"])
    }

    // GetGraphicsDeviceVendorID() : Int32
    @cache
    static get _GetGraphicsDeviceVendorID() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetGraphicsDeviceVendorID", 0, "int32", ["pointer"])
    }

    // GetGraphicsDeviceVersion() : String
    @cache
    static get _GetGraphicsDeviceVersion() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetGraphicsDeviceVersion", 0, "pointer", ["pointer"])
    }

    // GetGraphicsFormat(DefaultFormat) : GraphicsFormat
    @cache
    static get _GetGraphicsFormat() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetGraphicsFormat", 1, "pointer", ["pointer", "pointer"])
    }

    // GetGraphicsMemorySize() : Int32
    @cache
    static get _GetGraphicsMemorySize() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetGraphicsMemorySize", 0, "int32", ["pointer"])
    }

    // GetGraphicsShaderLevel() : Int32
    @cache
    static get _GetGraphicsShaderLevel() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetGraphicsShaderLevel", 0, "int32", ["pointer"])
    }

    // GetMaxTextureSize() : Int32
    @cache
    static get _GetMaxTextureSize() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetMaxTextureSize", 0, "int32", ["pointer"])
    }

    // GetOperatingSystem() : String
    @cache
    static get _GetOperatingSystem() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetOperatingSystem", 0, "pointer", ["pointer"])
    }

    // GetOperatingSystemFamily() : OperatingSystemFamily
    @cache
    static get _GetOperatingSystemFamily() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetOperatingSystemFamily", 0, "pointer", ["pointer"])
    }

    // GetPhysicalMemoryMB() : Int32
    @cache
    static get _GetPhysicalMemoryMB() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetPhysicalMemoryMB", 0, "int32", ["pointer"])
    }

    // GetProcessorCount() : Int32
    @cache
    static get _GetProcessorCount() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetProcessorCount", 0, "int32", ["pointer"])
    }

    // GetProcessorFrequencyMHz() : Int32
    @cache
    static get _GetProcessorFrequencyMHz() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetProcessorFrequencyMHz", 0, "int32", ["pointer"])
    }

    // GetProcessorType() : String
    @cache
    static get _GetProcessorType() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetProcessorType", 0, "pointer", ["pointer"])
    }

    // HasRenderTextureNative(RenderTextureFormat) : Boolean
    @cache
    static get _HasRenderTextureNative() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "HasRenderTextureNative", 1, "bool", ["pointer", "pointer"])
    }

    // IsFormatSupported(GraphicsFormat, FormatUsage) : Boolean
    @cache
    static get _IsFormatSupported() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "IsFormatSupported", 2, "bool", ["pointer", "pointer", "pointer"])
    }

    // IsValidEnumValue(Enum) : Boolean
    @cache
    static get _IsValidEnumValue() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "IsValidEnumValue", 1, "bool", ["pointer"])
    }

    // SupportedRandomWriteTargetCount() : Int32
    @cache
    static get _SupportedRandomWriteTargetCount() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "SupportedRandomWriteTargetCount", 0, "int32", ["pointer"])
    }

    // SupportedRenderTargetCount() : Int32
    @cache
    static get _SupportedRenderTargetCount() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "SupportedRenderTargetCount", 0, "int32", ["pointer"])
    }

    // Supports3DTextures() : Boolean
    @cache
    static get _Supports3DTextures() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "Supports3DTextures", 0, "bool", ["pointer"])
    }

    // SupportsComputeShaders() : Boolean
    @cache
    static get _SupportsComputeShaders() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "SupportsComputeShaders", 0, "bool", ["pointer"])
    }

    // SupportsRenderTextureFormat(RenderTextureFormat) : Boolean
    @cache
    static get _SupportsRenderTextureFormat() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "SupportsRenderTextureFormat", 1, "bool", ["pointer", "pointer"])
    }

    // SupportsTextureFormat(TextureFormat) : Boolean
    @cache
    static get _SupportsTextureFormat() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "SupportsTextureFormat", 1, "bool", ["pointer", "pointer"])
    }

    // SupportsTextureFormatNative(TextureFormat) : Boolean
    @cache
    static get _SupportsTextureFormatNative() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "SupportsTextureFormatNative", 1, "bool", ["pointer", "pointer"])
    }

    // get_copyTextureSupport() : CopyTextureSupport
    @cache
    static get _get_copyTextureSupport() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_copyTextureSupport", 0, "pointer", ["pointer"])
    }

    // get_deviceModel() : String
    @cache
    static get _get_deviceModel() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_deviceModel", 0, "pointer", ["pointer"])
    }

    // get_deviceName() : String
    @cache
    static get _get_deviceName() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_deviceName", 0, "pointer", ["pointer"])
    }

    // get_deviceType() : DeviceType
    @cache
    static get _get_deviceType() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_deviceType", 0, "pointer", ["pointer"])
    }

    // get_deviceUniqueIdentifier() : String
    @cache
    static get _get_deviceUniqueIdentifier() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_deviceUniqueIdentifier", 0, "pointer", ["pointer"])
    }

    // get_graphicsDeviceID() : Int32
    @cache
    static get _get_graphicsDeviceID() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_graphicsDeviceID", 0, "int32", ["pointer"])
    }

    // get_graphicsDeviceName() : String
    @cache
    static get _get_graphicsDeviceName() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_graphicsDeviceName", 0, "pointer", ["pointer"])
    }

    // get_graphicsDeviceType() : GraphicsDeviceType
    @cache
    static get _get_graphicsDeviceType() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_graphicsDeviceType", 0, "pointer", ["pointer"])
    }

    // get_graphicsDeviceVendor() : String
    @cache
    static get _get_graphicsDeviceVendor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_graphicsDeviceVendor", 0, "pointer", ["pointer"])
    }

    // get_graphicsDeviceVendorID() : Int32
    @cache
    static get _get_graphicsDeviceVendorID() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_graphicsDeviceVendorID", 0, "int32", ["pointer"])
    }

    // get_graphicsDeviceVersion() : String
    @cache
    static get _get_graphicsDeviceVersion() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_graphicsDeviceVersion", 0, "pointer", ["pointer"])
    }

    // get_graphicsMemorySize() : Int32
    @cache
    static get _get_graphicsMemorySize() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_graphicsMemorySize", 0, "int32", ["pointer"])
    }

    // get_graphicsShaderLevel() : Int32
    @cache
    static get _get_graphicsShaderLevel() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_graphicsShaderLevel", 0, "int32", ["pointer"])
    }

    // get_maxTextureSize() : Int32
    @cache
    static get _get_maxTextureSize() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_maxTextureSize", 0, "int32", ["pointer"])
    }

    // get_operatingSystem() : String
    @cache
    static get _get_operatingSystem() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_operatingSystem", 0, "pointer", ["pointer"])
    }

    // get_operatingSystemFamily() : OperatingSystemFamily
    @cache
    static get _get_operatingSystemFamily() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_operatingSystemFamily", 0, "pointer", ["pointer"])
    }

    // get_processorCount() : Int32
    @cache
    static get _get_processorCount() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_processorCount", 0, "int32", ["pointer"])
    }

    // get_processorFrequency() : Int32
    @cache
    static get _get_processorFrequency() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_processorFrequency", 0, "int32", ["pointer"])
    }

    // get_processorType() : String
    @cache
    static get _get_processorType() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_processorType", 0, "pointer", ["pointer"])
    }

    // get_supportedRandomWriteTargetCount() : Int32
    @cache
    static get _get_supportedRandomWriteTargetCount() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_supportedRandomWriteTargetCount", 0, "int32", ["pointer"])
    }

    // get_supportedRenderTargetCount() : Int32
    @cache
    static get _get_supportedRenderTargetCount() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_supportedRenderTargetCount", 0, "int32", ["pointer"])
    }

    // get_supports3DTextures() : Boolean
    @cache
    static get _get_supports3DTextures() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_supports3DTextures", 0, "int32", ["pointer"])
    }

    // get_supportsComputeShaders() : Boolean
    @cache
    static get _get_supportsComputeShaders() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_supportsComputeShaders", 0, "int32", ["pointer"])
    }

    // get_supportsImageEffects() : Boolean
    @cache
    static get _get_supportsImageEffects() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_supportsImageEffects", 0, "int32", ["pointer"])
    }

    // get_supportsRenderTextures() : Boolean
    @cache
    static get _get_supportsRenderTextures() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_supportsRenderTextures", 0, "int32", ["pointer"])
    }

    // get_systemMemorySize() : Int32
    @cache
    static get _get_systemMemorySize() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_systemMemorySize", 0, "int32", ["pointer"])
    }
}

declare global {
    namespace Il2Cpp.Api {
        class SystemInfo extends SystemInfoApi { }
    }
}

Il2Cpp.Api.SystemInfo = SystemInfoApi;

export { }