import { mscorlib_System_Type_impl } from "../Type/class"

export enum NetworkReachability {
    NotReachable = 0,
    ReachableViaCarrierDataNetwork = 1,
    ReachableViaLocalAreaNetwork = 2
}

export enum RuntimePlatform {
    Android = 11,
    BlackBerryPlayer = 0x16,
    CloudRendering = 0x23,
    FlashPlayer = 15,
    GameCoreScarlett = 0x24,
    GameCoreXboxOne = 0x25,
    GameCoreXboxSeries = 0x24,
    IPhonePlayer = 8,
    LinuxEditor = 0x10,
    LinuxPlayer = 13,
    Lumin = 0x21,
    MetroPlayerARM = 20,
    MetroPlayerX64 = 0x13,
    MetroPlayerX86 = 0x12,
    NaCl = 12,
    OSXDashboardPlayer = 4,
    OSXEditor = 0,
    OSXPlayer = 1,
    OSXWebPlayer = 3,
    PS3 = 9,
    PS4 = 0x19,
    PS5 = 0x26,
    PSM = 0x1a,
    PSP2 = 0x18,
    SamsungTVPlayer = 0x1c,
    Stadia = 0x22,
    Switch = 0x20,
    TizenPlayer = 0x17,
    tvOS = 0x1f,
    WebGLPlayer = 0x11,
    WiiU = 30,
    WindowsEditor = 7,
    WindowsPlayer = 2,
    WindowsWebPlayer = 5,
    WP8Player = 0x15,
    WSAPlayerARM = 20,
    WSAPlayerX64 = 0x13,
    WSAPlayerX86 = 0x12,
    XBOX360 = 10,
    XboxOne = 0x1b,
}

type LogCallback = NativePointer

class UnityEngine_Application_impl extends mscorlib_System_Type_impl {

    // deepLinkActivated : Action<String>
    deepLinkActivated = lfv(this.handle, "deepLinkActivated")
    // focusChanged : Action<Boolean>
    focusChanged = lfv(this.handle, "focusChanged")
    // lowMemory : LowMemoryCallback
    LowMemoryCallback = lfv(this.handle, "LowMemoryCallback")
    // quitting : Action
    quitting = lfv(this.handle, "quitting")
    // s_LogCallbackHandler : LogCallback
    s_LogCallbackHandler = lfv(this.handle, "s_LogCallbackHandler")
    // s_LogCallbackHandlerThreaded : LogCallback
    s_LogCallbackHandlerThreaded = lfv(this.handle, "s_LogCallbackHandlerThreaded")
    // s_RegisterLogCallbackDeprecated : LogCallback
    s_RegisterLogCallbackDeprecated = lfv(this.handle, "s_RegisterLogCallbackDeprecated")
    // wantsToQuit : Func<Boolean>
    wantsToQuit = lfv(this.handle, "wantsToQuit")

    CallLogCallback(logString: NativePointer, stackTrace: NativePointer, type: NativePointer): void {
        return Il2Cpp.Api.Application._CallLogCallback(this.handle, logString, stackTrace, type)
    }

    CallLowMemory(): void {
        return Il2Cpp.Api.Application._CallLowMemory(this.handle)
    }

    get cloudProjectId(): string {
        return readU16(Il2Cpp.Api.Application._get_cloudProjectId(this.handle))
    }

    get dataPath(): string {
        return readU16(Il2Cpp.Api.Application._get_dataPath(this.handle))
    }

    get identifier(): string {
        return readU16(Il2Cpp.Api.Application._get_identifier(this.handle))
    }

    get internetReachability(): NetworkReachability {
        return Il2Cpp.Api.Application._get_internetReachability(this.handle)
    }

    get isEditor(): boolean {
        return Il2Cpp.Api.Application._get_isEditor(this.handle).toInt32() === 1
    }

    get isMobilePlatform(): boolean {
        return Il2Cpp.Api.Application._get_isMobilePlatform(this.handle).toInt32() === 1
    }

    get isPlaying(): boolean {
        return Il2Cpp.Api.Application._get_isPlaying(this.handle).toInt32() === 1
    }

    get persistentDataPath(): string {
        return readU16(Il2Cpp.Api.Application._get_persistentDataPath(this.handle))
    }

    get platform(): RuntimePlatform {
        return Il2Cpp.Api.Application._get_platform(this.handle)
    }

    set runInBackground(value: boolean) {
        Il2Cpp.Api.Application._set_runInBackground(this.handle, value)
    }

    get streamingAssetsPath(): string {
        return readU16(Il2Cpp.Api.Application._get_streamingAssetsPath(this.handle))
    }

    set targetFrameRate(value: number) {
        Il2Cpp.Api.Application._set_targetFrameRate(this.handle, value)
    }

    get unityVersion(): string {
        return readU16(Il2Cpp.Api.Application._get_unityVersion(this.handle))
    }

    addLogMessageReceived(callback: LogCallback): void {
        Il2Cpp.Api.Application._add_logMessageReceived(this.handle, callback)
    }

    removeLogMessageReceived(callback: LogCallback): void {
        Il2Cpp.Api.Application._remove_logMessageReceived(this.handle, callback)
    }

    addLogMessageReceivedThreaded(callback: LogCallback): void {
        Il2Cpp.Api.Application._add_logMessageReceivedThreaded(this.handle, callback)
    }

    removeLogMessageReceivedThreaded(callback: LogCallback): void {
        Il2Cpp.Api.Application._remove_logMessageReceivedThreaded(this.handle, callback)
    }
}

declare global {
    namespace Il2Cpp {
        class Application extends UnityEngine_Application_impl { }
    }
}

Il2Cpp.Application = UnityEngine_Application_impl;

export { UnityEngine_Application_impl };