import { mscorlib_System_Type_impl } from "../Type/class"

export enum NetworkReachability {
    NotReachable = 0,
    ReachableViaCarrierDataNetwork = 1,
    ReachableViaLocalAreaNetwork = 2
}

export enum StackTraceLogType {
    None = 0,
    ScriptOnly = 1,
    Full = 2
}

export enum LogType {
    Error = 0,
    Assert = 1,
    Warning = 2,
    Log = 3,
    Exception = 4
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

export enum SystemLanguage {
    Afrikaans = 0,
    Arabic = 1,
    Basque = 2,
    Belarusian = 3,
    Bulgarian = 4,
    Catalan = 5,
    Chinese = 6,
    ChineseSimplified = 40,
    ChineseTraditional = 41,
    Czech = 7,
    Danish = 8,
    Dutch = 9,
    English = 10,
    Estonian = 11,
    Faroese = 12,
    Finnish = 13,
    French = 14,
    German = 15,
    Greek = 16,
    Hebrew = 17,
    Hungarian = 18,
    Icelandic = 19,
    Indonesian = 20,
    Italian = 21,
    Japanese = 22,
    Korean = 23,
    Latvian = 24,
    Lithuanian = 25,
    Norwegian = 26,
    Polish = 27,
    Portuguese = 28,
    Romanian = 29,
    Russian = 30,
    SerboCroatian = 31,
    Slovak = 32,
    Slovenian = 33,
    Spanish = 34,
    Swedish = 35,
    Thai = 36,
    Turkish = 37,
    Ukrainian = 38,
    Unknown = 42,
    Vietnamese = 39,
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

    static get Quit_1(): void {
        return Il2Cpp.Api.Application._Quit_1()
    }

    static get Quit(): void {
        return Il2Cpp.Api.Application._Quit()
    }

    static get isPlaying(): boolean {
        return Il2Cpp.Api.Application._get_isPlaying()
    }

    static get dataPath(): string {
        return readU16(Il2Cpp.Api.Application._get_dataPath())
    }

    static get streamingAssetsPath(): string {
        return readU16(Il2Cpp.Api.Application._get_streamingAssetsPath())
    }

    static get persistentDataPath(): string {
        return readU16(Il2Cpp.Api.Application._get_persistentDataPath())
    }

    static get temporaryCachePath(): string {
        return readU16(Il2Cpp.Api.Application._get_temporaryCachePath())
    }

    static get unityVersion(): string {
        return readU16(Il2Cpp.Api.Application._get_unityVersion())
    }

    static get version(): string {
        return readU16(Il2Cpp.Api.Application._get_version())
    }

    static get identifier(): string {
        return readU16(Il2Cpp.Api.Application._get_identifier())
    }

    static get productName(): string {
        return readU16(Il2Cpp.Api.Application._get_productName())
    }

    static get companyName(): string {
        return readU16(Il2Cpp.Api.Application._get_companyName())
    }

    static get cloudProjectId(): string {
        return readU16(Il2Cpp.Api.Application._get_cloudProjectId())
    }

    static get_internetReachability(): NetworkReachability {
        return Il2Cpp.Api.Application._get_internetReachability()
    }

    static OpenURL(url: string): void {
        return Il2Cpp.Api.Application._OpenURL(url)
    }

    static targetFrameRate(value: number): void {
        return Il2Cpp.Api.Application._set_targetFrameRate(value)
    }

    static SetLogCallbackDefined(defined: boolean): void {
        return Il2Cpp.Api.Application._SetLogCallbackDefined(defined)
    }

    static GetStackTraceLogType(logType: number): number {
        return Il2Cpp.Api.Application._GetStackTraceLogType(logType)
    }

    static get platform(): RuntimePlatform {
        return Il2Cpp.Api.Application._get_platform()
    }

    static get systemLanguage(): SystemLanguage {
        return Il2Cpp.Api.Application._get_platform() as SystemLanguage
    }

    static get internetReachability(): number {
        return Il2Cpp.Api.Application._get_internetReachability()
    }

    static CallLowMemory(): void {
        return Il2Cpp.Api.Application._CallLowMemory()
    }

    static add_logMessageReceived(value: any): void {
        return Il2Cpp.Api.Application._add_logMessageReceived(value)
    }

    static remove_logMessageReceived(value: any): void {
        return Il2Cpp.Api.Application._remove_logMessageReceived(value)
    }

    static add_logMessageReceivedThreaded(value: any): void {
        return Il2Cpp.Api.Application._add_logMessageReceivedThreaded(value)
    }

    static remove_logMessageReceivedThreaded(value: any): void {
        return Il2Cpp.Api.Application._remove_logMessageReceivedThreaded(value)
    }

    static CallLogCallback(logString: string, stackTrace: string, type: number, invokedOnMainThread: boolean): void {
        return Il2Cpp.Api.Application._CallLogCallback(logString, stackTrace, type, invokedOnMainThread)
    }

    static Internal_ApplicationWantsToQuit(): boolean {
        return Il2Cpp.Api.Application._Internal_ApplicationWantsToQuit()
    }

    static Internal_ApplicationQuit(): void {
        return Il2Cpp.Api.Application._Internal_ApplicationQuit()
    }

    static Internal_ApplicationUnload(): void {
        return Il2Cpp.Api.Application._Internal_ApplicationUnload()
    }

    static InvokeOnBeforeRender(): void {
        return Il2Cpp.Api.Application._InvokeOnBeforeRender()
    }

    static InvokeFocusChanged(focus: boolean): void {
        return Il2Cpp.Api.Application._InvokeFocusChanged(focus)
    }

    static InvokeDeepLinkActivated(url: string): void {
        return Il2Cpp.Api.Application._InvokeDeepLinkActivated(url)
    }

    static RegisterLogCallback_1(handler: any): void {
        return Il2Cpp.Api.Application._RegisterLogCallback(handler)
    }

    static RegisterLogCallback_2(handler: any, threaded: boolean): void {
        return Il2Cpp.Api.Application._RegisterLogCallback(handler, threaded)
    }

    static get isEditor(): boolean {
        return Il2Cpp.Api.Application._get_isEditor()
    }

    static GetStackTraceLogType_1(logType: LogType): StackTraceLogType {
        return Il2Cpp.Api.Application._GetStackTraceLogType(logType)
    }

    // add_logMessageReceivedThreaded(LogCallback) : Void
    static add_logMessageReceivedThreaded_1(value: LogCallback): void {
        return Il2Cpp.Api.Application._add_logMessageReceivedThreaded(value)
    }

    // remove_logMessageReceivedThreaded(LogCallback) : Void
    static remove_logMessageReceivedThreaded_1(value: LogCallback): void {
        return Il2Cpp.Api.Application._remove_logMessageReceivedThreaded(value)
    }

    // add_logMessageReceived(LogCallback) : Void
    static add_logMessageReceived_1(value: LogCallback): void {
        return Il2Cpp.Api.Application._add_logMessageReceived(value)
    }

    // remove_logMessageReceived(LogCallback) : Void
    static remove_logMessageReceived_1(value: LogCallback): void {
        return Il2Cpp.Api.Application._remove_logMessageReceived(value)
    }
}

declare global {
    namespace Il2Cpp {
        class Application extends UnityEngine_Application_impl { }
    }
}

Il2Cpp.Application = UnityEngine_Application_impl;

export { UnityEngine_Application_impl };