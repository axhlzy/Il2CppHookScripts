import { mscorlib_System_Type_impl } from "../Type/class"
import './api'

class UnityEngine_SystemInfo_impl extends mscorlib_System_Type_impl {

    GetCompatibleFormat(format: RenderTextureFormat): RenderTextureFormat {
        return Il2Cpp.Api.SystemInfo._GetCompatibleFormat(this.handle, format)
    }

    GetCopyTextureSupport(): CopyTextureSupport {
        return Il2Cpp.Api.SystemInfo._GetCopyTextureSupport(this.handle)
    }

    get deviceModel(): string {
        return readU16(Il2Cpp.Api.SystemInfo._get_deviceModel(this.handle))
    }

    get deviceName(): string {
        return readU16(Il2Cpp.Api.SystemInfo._get_deviceName(this.handle))
    }

    get deviceType(): DeviceType {
        return Il2Cpp.Api.SystemInfo._get_deviceType(this.handle)
    }

    get graphicsDeviceName(): string {
        return readU16(Il2Cpp.Api.SystemInfo._get_graphicsDeviceName(this.handle))
    }

    get graphicsDeviceVendorID(): number {
        return Il2Cpp.Api.SystemInfo._get_graphicsDeviceVendorID(this.handle)
    }

    get graphicsDeviceVersion(): string {
        return readU16(Il2Cpp.Api.SystemInfo._get_graphicsDeviceVersion(this.handle))
    }

    get graphicsMemorySize(): number {
        return Il2Cpp.Api.SystemInfo._get_graphicsMemorySize(this.handle)
    }

    get graphicsShaderLevel(): number {
        return Il2Cpp.Api.SystemInfo._get_graphicsShaderLevel(this.handle)
    }

    get maxTextureSize(): number {
        return Il2Cpp.Api.SystemInfo._get_maxTextureSize(this.handle)
    }

    get operatingSystem(): string {
        return readU16(Il2Cpp.Api.SystemInfo._get_operatingSystem(this.handle))
    }

    get operatingSystemFamily(): OperatingSystemFamily {
        return Il2Cpp.Api.SystemInfo._get_operatingSystemFamily(this.handle)
    }

    get processorCount(): number {
        return Il2Cpp.Api.SystemInfo._get_processorCount(this.handle)
    }

    get processorFrequency(): number {
        return Il2Cpp.Api.SystemInfo._get_processorFrequency(this.handle)
    }

    get processorType(): string {
        return readU16(Il2Cpp.Api.SystemInfo._get_processorType(this.handle))
    }

    get supportedRandomWriteTargetCount(): number {
        return Il2Cpp.Api.SystemInfo._get_supportedRandomWriteTargetCount(this.handle)
    }

    get supportedRenderTargetCount(): number {
        return Il2Cpp.Api.SystemInfo._get_supportedRenderTargetCount(this.handle)
    }

    get supports3DTextures(): boolean {
        return Il2Cpp.Api.SystemInfo._get_supports3DTextures(this.handle)
    }

    get supportsComputeShaders(): boolean {
        return Il2Cpp.Api.SystemInfo._get_supportsComputeShaders(this.handle)
    }

    get supportsImageEffects(): boolean {
        return Il2Cpp.Api.SystemInfo._get_supportsImageEffects(this.handle)
    }

    get supportsRenderTextures(): boolean {
        return Il2Cpp.Api.SystemInfo._get_supportsRenderTextures(this.handle)
    }

    get systemMemorySize(): number {
        return Il2Cpp.Api.SystemInfo._get_systemMemorySize(this.handle)
    }
}

declare global {
    namespace Il2Cpp {
        class SystemInfo extends UnityEngine_SystemInfo_impl { }
    }
}

Il2Cpp.SystemInfo = UnityEngine_SystemInfo_impl

export { UnityEngine_SystemInfo_impl }

export enum RenderTextureFormat {
    ARGB1555 = 6,
    ARGB2101010 = 8,
    ARGB32 = 0,
    ARGB4444 = 5,
    ARGB64 = 10,
    ARGBFloat = 11,
    ARGBHalf = 2,
    ARGBInt = 0x11,
    BGR101010_XR = 0x1B,
    BGRA10101010_XR = 0x1A,
    BGRA32 = 20,
    Default = 7,
    DefaultHDR = 9,
    Depth = 1,
    R16 = 0x1C,
    R8 = 0x10,
    RFloat = 14,
    RG16 = 0x19,
    RG32 = 0x17,
    RGB111110Float = 0x16,
    RGB565 = 4,
    RGBAUShort = 0x18,
    RGFloat = 12,
    RGHalf = 13,
    RGInt = 0x12,
    RHalf = 15,
    RInt = 0x13,
    Shadowmap = 3
}

export enum CopyTextureSupport {
    Basic = 1,
    Copy3D = 2,
    DifferentTypes = 4,
    None = 0,
    RTToTexture = 0x10,
    TextureToRT = 8
}

export enum DeviceType {
    Console = 2,
    Desktop = 3,
    Handheld = 1,
    Unknown = 0
}

export enum OperatingSystemFamily {
    Linux = 3,
    MacOSX = 1,
    Other = 0,
    Windows = 2
}