import { enumNumToName } from "../../../../bridge/fix/enum"
import { mscorlib_System_Object_impl } from "../class"
import { UnityEngine_Experimental_Rendering_DefaultFormat, UnityEngine_Experimental_Rendering_FormatUsage, UnityEngine_Experimental_Rendering_GraphicsFormat } from "../Object/Texture/enum"
import { CopyTextureSupport, DeviceType, GraphicsDeviceType, OperatingSystemFamily, RenderTextureFormat } from "./enum"

type System_String = string
type System_Int32 = number
type System_Boolean = boolean
type System_Enum = NativePointer
type TextureFormat = NativePointer
type UnityEngine_RenderTextureDescriptor = NativePointer

class UnityEngine_SystemInfo_Impl extends mscorlib_System_Object_impl {

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    static get_operatingSystem(): System_String {
        return readU16(Il2Cpp.Api.SystemInfo._get_operatingSystem())
    }

    static get_operatingSystemFamily(): OperatingSystemFamily {
        return Il2Cpp.Api.SystemInfo._get_operatingSystemFamily()
    }

    static get_operatingSystemFamily_toString(): string {
        return enumNumToName(Il2Cpp.Api.SystemInfo._get_operatingSystemFamily(), "OperatingSystemFamily")
    }

    static get_processorType(): System_String {
        return readU16(Il2Cpp.Api.SystemInfo._get_processorType())
    }

    static get_deviceUniqueIdentifier(): System_String {
        return readU16(Il2Cpp.Api.SystemInfo._get_deviceUniqueIdentifier())
    }

    static get_deviceName(): System_String {
        return readU16(Il2Cpp.Api.SystemInfo._get_deviceName())
    }

    static get_deviceModel(): System_String {
        return readU16(Il2Cpp.Api.SystemInfo._get_deviceModel())
    }

    static get_deviceType(): DeviceType {
        return Il2Cpp.Api.SystemInfo._get_deviceType()
    }

    static get_deviceType_toString(): string {
        return enumNumToName(Il2Cpp.Api.SystemInfo._get_deviceType(), "DeviceType")
    }

    static get_graphicsMemorySize(): System_Int32 {
        return Il2Cpp.Api.SystemInfo._get_graphicsMemorySize().toInt32()
    }

    static get_graphicsDeviceVendor(): System_String {
        return readU16(Il2Cpp.Api.SystemInfo._get_graphicsDeviceVendor())
    }

    static get_graphicsDeviceType(): GraphicsDeviceType {
        return Il2Cpp.Api.SystemInfo._get_graphicsDeviceType()
    }

    static get_graphicsDeviceType_toString(): string {
        return enumNumToName(Il2Cpp.Api.SystemInfo._get_graphicsDeviceType(), "GraphicsDeviceType")
    }

    static get_graphicsUVStartsAtTop(): System_Boolean {
        return Il2Cpp.Api.SystemInfo._get_graphicsUVStartsAtTop() == 1
    }

    static get_graphicsDeviceVersion(): System_String {
        return readU16(Il2Cpp.Api.SystemInfo._get_graphicsDeviceVersion())
    }

    static get_graphicsShaderLevel(): System_Int32 {
        return Il2Cpp.Api.SystemInfo._get_graphicsShaderLevel().toInt32()
    }

    static get_hasHiddenSurfaceRemovalOnGPU(): System_Boolean {
        return Il2Cpp.Api.SystemInfo._get_hasHiddenSurfaceRemovalOnGPU() == 1
    }

    static get_supportsShadows(): System_Boolean {
        return Il2Cpp.Api.SystemInfo._get_supportsShadows() == 1
    }

    static get_copyTextureSupport(): CopyTextureSupport {
        return Il2Cpp.Api.SystemInfo._get_copyTextureSupport()
    }

    static get_supportsRenderTargetArrayIndexFromVertexShader(): System_Boolean {
        return Il2Cpp.Api.SystemInfo._get_supportsRenderTargetArrayIndexFromVertexShader()
    }

    static get_supportedRenderTargetCount(): System_Int32 {
        return Il2Cpp.Api.SystemInfo._get_supportedRenderTargetCount()
    }

    static get_supportsMultisampledTextures(): System_Int32 {
        return Il2Cpp.Api.SystemInfo._get_supportsMultisampledTextures()
    }

    static get_supportsMultisampleAutoResolve(): System_Boolean {
        return Il2Cpp.Api.SystemInfo._get_supportsMultisampleAutoResolve()
    }

    static get_usesReversedZBuffer(): System_Boolean {
        return Il2Cpp.Api.SystemInfo._get_usesReversedZBuffer()
    }

    static IsValidEnumValue(value: System_Enum): System_Boolean {
        return Il2Cpp.Api.SystemInfo._IsValidEnumValue(value)
    }

    static SupportsRenderTextureFormat(format: RenderTextureFormat): System_Boolean {
        return Il2Cpp.Api.SystemInfo._SupportsRenderTextureFormat(format) == 1
    }

    static SupportsTextureFormat(format: TextureFormat): System_Boolean {
        return Il2Cpp.Api.SystemInfo._SupportsTextureFormat(format) == 1
    }

    static get_supportsGraphicsFence(): System_Boolean {
        return Il2Cpp.Api.SystemInfo._get_supportsGraphicsFence()
    }

    static get_supportsMultiview(): System_Boolean {
        return Il2Cpp.Api.SystemInfo._get_supportsMultiview()
    }

    static get_supportsStoreAndResolveAction(): System_Boolean {
        return Il2Cpp.Api.SystemInfo._get_supportsStoreAndResolveAction()
    }

    static GetOperatingSystem(): System_String {
        return readU16(Il2Cpp.Api.SystemInfo._GetOperatingSystem())
    }

    static GetOperatingSystemFamily(): OperatingSystemFamily {
        return Il2Cpp.Api.SystemInfo._GetOperatingSystemFamily()
    }

    static GetOperatingSystemFamily_toString(): string {
        return enumNumToName(Il2Cpp.Api.SystemInfo._GetOperatingSystemFamily(), "OperatingSystemFamily")
    }

    static GetProcessorType(): System_String {
        return readU16(Il2Cpp.Api.SystemInfo._GetProcessorType())
    }

    static GetDeviceUniqueIdentifier(): System_String {
        return readU16(Il2Cpp.Api.SystemInfo._GetDeviceUniqueIdentifier())
    }

    static GetDeviceName(): System_String {
        return readU16(Il2Cpp.Api.SystemInfo._GetDeviceName())
    }

    static GetDeviceModel(): System_String {
        return readU16(Il2Cpp.Api.SystemInfo._GetDeviceModel())
    }

    static GetDeviceType(): DeviceType {
        return Il2Cpp.Api.SystemInfo._GetDeviceType()
    }

    static GetDeviceType_toString(): string {
        return enumNumToName(Il2Cpp.Api.SystemInfo._GetDeviceType(), "DeviceType")
    }

    static GetGraphicsMemorySize(): System_Int32 {
        return Il2Cpp.Api.SystemInfo._GetGraphicsMemorySize().toInt32()
    }

    static GetGraphicsDeviceVendor(): System_String {
        return readU16(Il2Cpp.Api.SystemInfo._GetGraphicsDeviceVendor())
    }

    static GetGraphicsDeviceType(): GraphicsDeviceType {
        return Il2Cpp.Api.SystemInfo._GetGraphicsDeviceType()
    }

    static GetGraphicsDeviceType_toString(): string {
        return enumNumToName(Il2Cpp.Api.SystemInfo._GetGraphicsDeviceType(), "GraphicsDeviceType")
    }

    static GetGraphicsUVStartsAtTop(): System_Boolean {
        return Il2Cpp.Api.SystemInfo._GetGraphicsUVStartsAtTop() == 1
    }

    static GetGraphicsDeviceVersion(): System_String {
        return readU16(Il2Cpp.Api.SystemInfo._GetGraphicsDeviceVersion())
    }

    static GetGraphicsShaderLevel(): System_Int32 {
        return Il2Cpp.Api.SystemInfo._GetGraphicsShaderLevel().toInt32()
    }

    static HasHiddenSurfaceRemovalOnGPU(): System_Boolean {
        return Il2Cpp.Api.SystemInfo._HasHiddenSurfaceRemovalOnGPU() == 1
    }

    static SupportsShadows(): System_Boolean {
        return Il2Cpp.Api.SystemInfo._SupportsShadows() == 1
    }

    static GetCopyTextureSupport(): CopyTextureSupport {
        return Il2Cpp.Api.SystemInfo._GetCopyTextureSupport()
    }

    static GetCopyTextureSupport_toString(): string {
        return enumNumToName(Il2Cpp.Api.SystemInfo._GetCopyTextureSupport(), "CopyTextureSupport")
    }

    static SupportsRenderTargetArrayIndexFromVertexShader(): System_Boolean {
        return Il2Cpp.Api.SystemInfo._SupportsRenderTargetArrayIndexFromVertexShader() == 1
    }

    static SupportedRenderTargetCount(): System_Int32 {
        return Il2Cpp.Api.SystemInfo._SupportedRenderTargetCount().toInt32()
    }

    static SupportsMultisampledTextures(): System_Int32 {
        return Il2Cpp.Api.SystemInfo._SupportsMultisampledTextures().toInt32()
    }

    static SupportsMultisampleAutoResolve(): System_Boolean {
        return Il2Cpp.Api.SystemInfo._SupportsMultisampleAutoResolve() == 1
    }

    static UsesReversedZBuffer(): System_Boolean {
        return Il2Cpp.Api.SystemInfo._UsesReversedZBuffer()
    }

    static HasRenderTextureNative(format: RenderTextureFormat): System_Boolean {
        return Il2Cpp.Api.SystemInfo._HasRenderTextureNative(format) == 1
    }

    static SupportsTextureFormatNative(format: TextureFormat): System_Boolean {
        return Il2Cpp.Api.SystemInfo._SupportsTextureFormatNative(format) == 1
    }

    static SupportsGPUFence(): System_Boolean {
        return Il2Cpp.Api.SystemInfo._SupportsGPUFence() == 1
    }

    static IsFormatSupported(format: UnityEngine_Experimental_Rendering_GraphicsFormat, usage: UnityEngine_Experimental_Rendering_FormatUsage): System_Boolean {
        return Il2Cpp.Api.SystemInfo._IsFormatSupported(format, usage) == 1
    }

    static GetCompatibleFormat(format: UnityEngine_Experimental_Rendering_GraphicsFormat, usage: UnityEngine_Experimental_Rendering_FormatUsage): UnityEngine_Experimental_Rendering_GraphicsFormat {
        return Il2Cpp.Api.SystemInfo._GetCompatibleFormat(format, usage)
    }

    static GetGraphicsFormat(format: UnityEngine_Experimental_Rendering_DefaultFormat): UnityEngine_Experimental_Rendering_GraphicsFormat {
        return Il2Cpp.Api.SystemInfo._GetGraphicsFormat(format)
    }

    static GetRenderTextureSupportedMSAASampleCount(desc: UnityEngine_RenderTextureDescriptor): System_Int32 {
        return Il2Cpp.Api.SystemInfo._GetRenderTextureSupportedMSAASampleCount(desc)
    }

    static SupportsMultiview(): System_Boolean {
        return Il2Cpp.Api.SystemInfo._SupportsMultiview()
    }

    static SupportsStoreAndResolveAction(): System_Boolean {
        return Il2Cpp.Api.SystemInfo._SupportsStoreAndResolveAction()
    }

    static GetRenderTextureSupportedMSAASampleCount_Injected(desc: UnityEngine_RenderTextureDescriptor): System_Int32 {
        return Il2Cpp.Api.SystemInfo._GetRenderTextureSupportedMSAASampleCount_Injected(desc)
    }

}

Il2Cpp.SystemInfo = UnityEngine_SystemInfo_Impl

declare global {
    namespace Il2Cpp {
        class SystemInfo extends UnityEngine_SystemInfo_Impl { }
    }
}

export { UnityEngine_SystemInfo_Impl }