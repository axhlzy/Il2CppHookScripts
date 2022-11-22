import { enumNumToName } from "../../../../bridge/fix/enum"
import { mscorlib_System_Type_impl } from "../Type/class"
import { NetworkReachability, RuntimePlatform, SystemLanguage, LogType, StackTraceLogType } from "./enum"

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
        return Il2Cpp.Api.Application._Quit_()
    }

    static get Quit(): void {
        return Il2Cpp.Api.Application._Quit()
    }

    static get isPlaying(): boolean {
        return Il2Cpp.Api.Application._get_isPlaying() == 1
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
        try {
            return readU16(Il2Cpp.Api.Application._get_temporaryCachePath())
        } catch (error) {
            return "Function : temporaryCachePath not found"
        }
    }

    static get unityVersion(): string {
        return readU16(Il2Cpp.Api.Application._get_unityVersion())
    }

    static get version(): string {
        return readU16(Il2Cpp.Api.Application._get_version())
    }

    static get identifier(): string {
        if (ptr(Il2Cpp.Api.Application._get_identifier).isNull())
            return Java.use('android.app.ActivityThread').currentApplication().getApplicationContext().getPackageName() + " ( from java api )"
        return readU16(Il2Cpp.Api.Application._get_identifier())
    }

    static get productName(): string {
        try {
            return readU16(Il2Cpp.Api.Application._get_productName())
        } catch (error) {
            return "Function : productName not found"
        }
    }

    static get companyName(): string {
        return readU16(Il2Cpp.Api.Application._get_companyName())
    }

    static get cloudProjectId(): string {
        return readU16(Il2Cpp.Api.Application._get_cloudProjectId())
    }

    static OpenURL(url: string): void {
        return Il2Cpp.Api.Application._OpenURL(allocUStr(url))
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

    static get internetReachability(): NetworkReachability {
        return Il2Cpp.Api.Application._get_internetReachability()
    }

    static get internetReachability_toString(): string {
        return enumNumToName(Il2Cpp.Application.internetReachability, 'NetworkReachability')
    }

    static get_internetReachability(): NetworkReachability {
        return Il2Cpp.Api.Application._get_internetReachability()
    }

    static get_internetReachability_toString(): string {
        return enumNumToName(UnityEngine_Application_impl.internetReachability, 'NetworkReachability')
    }

    static get platform(): RuntimePlatform {
        return <RuntimePlatform>Il2Cpp.Api.Application._get_platform()
    }

    static get platform_toString(): string {
        return enumNumToName(UnityEngine_Application_impl.platform, 'RuntimePlatform')
    }

    static get systemLanguage(): SystemLanguage {
        try {
            return <SystemLanguage>Il2Cpp.Api.Application._get_platform()
        } catch (error) {
            return -1
        }
    }

    static get systemLanguage_toString(): string {
        try {
            return enumNumToName(UnityEngine_Application_impl.systemLanguage, 'SystemLanguage')
        } catch (error) {
            return "Function : systemLanguage not found"
        }        
    }

    static CallLowMemory(): void {
        return Il2Cpp.Api.Application._CallLowMemory()
    }

    static add_logMessageReceived(value: LogCallback): void {
        return Il2Cpp.Api.Application._add_logMessageReceived(value)
    }

    static remove_logMessageReceived(value: LogCallback): void {
        return Il2Cpp.Api.Application._remove_logMessageReceived(value)
    }

    static add_logMessageReceivedThreaded(value: LogCallback): void {
        return Il2Cpp.Api.Application._add_logMessageReceivedThreaded(value)
    }

    static remove_logMessageReceivedThreaded(value: LogCallback): void {
        return Il2Cpp.Api.Application._remove_logMessageReceivedThreaded(value)
    }

    static CallLogCallback(logString: string, stackTrace: string, type: number, invokedOnMainThread: boolean): void {
        return Il2Cpp.Api.Application._CallLogCallback(allocUStr(logString), allocUStr(stackTrace), type, invokedOnMainThread)
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
        return Il2Cpp.Api.Application._InvokeDeepLinkActivated(allocUStr(url))
    }

    static RegisterLogCallback_1(handler: any): void {
        return Il2Cpp.Api.Application._RegisterLogCallback(handler)
    }

    static RegisterLogCallback_2(handler: any, threaded: boolean): void {
        return Il2Cpp.Api.Application._RegisterLogCallback(handler, threaded)
    }

    static get isEditor(): boolean {
        return Il2Cpp.Api.Application._get_isEditor() == 1
    }

    static GetStackTraceLogType_1(logType: LogType): StackTraceLogType {
        return Il2Cpp.Api.Application._GetStackTraceLogType(logType)
    }

    static GetStackTraceLogType_toString(logType: LogType): string {
        return enumNumToName(Il2Cpp.Application.GetStackTraceLogType_1(logType), 'StackTraceLogType')
    }
}

declare global {
    namespace Il2Cpp {
        class Application extends UnityEngine_Application_impl { }
    }
}

Il2Cpp.Application = UnityEngine_Application_impl;

export { UnityEngine_Application_impl };