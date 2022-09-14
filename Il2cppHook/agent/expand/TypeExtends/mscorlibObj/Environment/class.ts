import { enumNumToName } from "../../../../bridge/fix/enum"
import { PackArray } from "../../../../bridge/fix/packer/packArray"
import { mscorlib_System_Object_impl } from "../class"
import { System_IntPtr_Impl as IntPtr } from "../ValueType/IntPtr/class"
import { System_PlatformID } from "./enum"

type System_Version = NativePointer
type System_Exception = NativePointer
type System_Int32 = number
type System_Boolean = boolean
type System_Void = void
type System_String = string
type OperatingSystem = NativePointer

class System_Environment_Impl extends mscorlib_System_Object_impl {

    mono_corlib_version: System_Int32 = lfv(this.handle, "mono_corlib_version").toInt32()
    nl: System_String = readU16(lfv(this.handle, "nl"))
    os: OperatingSystem = lfv(this.handle, "os")

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    static GetResourceString(key: System_String): System_String {
        return readU16(mscorlib.Api.Environment._GetResourceString(key))
    }

    // static GetResourceString_2(key: System_String, values: System_Object[]): System_String {
    //     return readU16(mscorlib.Api.Environment._GetResourceString(key, values))
    // }

    static GetResourceStringEncodingName(codePage: System_Int32): System_String {
        return readU16(mscorlib.Api.Environment._GetResourceStringEncodingName(codePage))
    }

    static get_CurrentManagedThreadId(): System_Int32 {
        return mscorlib.Api.Environment._get_CurrentManagedThreadId()
    }

    static get_HasShutdownStarted(): System_Boolean {
        return mscorlib.Api.Environment._get_HasShutdownStarted() == 1
    }

    static GetNewLine(): System_String {
        return readU16(mscorlib.Api.Environment._GetNewLine())
    }

    static get_NewLine(): System_String {
        return readU16(mscorlib.Api.Environment._get_NewLine())
    }

    static get_Platform(): System_PlatformID {
        return mscorlib.Api.Environment._get_Platform()
    }

    static get Platform(): string {
        return enumNumToName(mscorlib.Api.Environment._get_Platform(), 'PlatformID')
    }

    static GetOSVersionString(): System_String {
        return readU16(mscorlib.Api.Environment._GetOSVersionString())
    }

    static get_OSVersion(): OperatingSystem {
        return mscorlib.Api.Environment._get_OSVersion()
    }

    static CreateVersionFromString(info: System_String): System_Version {
        return mscorlib.Api.Environment._CreateVersionFromString(info)
    }

    static get_StackTrace(): System_String {
        return readU16(mscorlib.Api.Environment._get_StackTrace())
    }

    static get_TickCount(): System_Int32 {
        return mscorlib.Api.Environment._get_TickCount()
    }

    static Exit(exitCode: System_Int32): System_Void {
        return mscorlib.Api.Environment._Exit(exitCode)
    }

    static ExpandEnvironmentVariables(name: System_String): System_String {
        return readU16(mscorlib.Api.Environment._ExpandEnvironmentVariables(name))
    }

    static GetCommandLineArgs(): System_String[] {
        return mscorlib.Api.Environment._GetCommandLineArgs()
    }

    static internalGetEnvironmentVariable_native(variable: IntPtr): System_String {
        return readU16(mscorlib.Api.Environment._internalGetEnvironmentVariable_native(variable))
    }

    static internalGetEnvironmentVariable(variable: System_String): System_String {
        return readU16(mscorlib.Api.Environment._internalGetEnvironmentVariable(variable))
    }

    static GetEnvironmentVariable(variable: System_String): System_String {
        return readU16(mscorlib.Api.Environment._GetEnvironmentVariable(variable))
    }

    // static GetEnvironmentVariablesNoCase(): System_Collections.Hashtable {
    //     return mscorlib.Api.Environment._GetEnvironmentVariablesNoCase()
    // }

    // static GetFolderPath(folder: System_Environment.SpecialFolder): System_String {
    //     return readU16(mscorlib.Api.Environment._GetFolderPath(folder))
    // }

    // static GetWindowsFolderPath(folder: System_Int32): System_String {
    //     return readU16(mscorlib.Api.Environment._GetWindowsFolderPath(folder))
    // }

    // static GetFolderPath_2(folder: System_Environment.SpecialFolder, option: System_Environment.SpecialFolderOption): System_String {
    //     return readU16(mscorlib.Api.Environment._GetFolderPath(folder, option))
    // }

    // static ReadXdgUserDir(config_dir: System_String, home_dir: System_String, key: System_String, fallback: System_String): System_String {
    //     return readU16(mscorlib.Api.Environment._ReadXdgUserDir(config_dir, home_dir, key, fallback))
    // }

    // static UnixGetFolderPath(folder: System_Environment.SpecialFolder, option: System_Environment.SpecialFolderOption): System_String {
    //     return readU16(mscorlib.Api.Environment._UnixGetFolderPath(folder, option))
    // }

    static FailFast(message: System_String, exception: System_Exception): System_Void {
        return mscorlib.Api.Environment._FailFast(message, exception)
    }

    static get_Is64BitProcess(): System_Boolean {
        return mscorlib.Api.Environment._get_Is64BitProcess() == 1
    }

    static get_ProcessorCount(): System_Int32 {
        return mscorlib.Api.Environment._get_ProcessorCount()
    }

    static get_IsRunningOnWindows(): System_Boolean {
        return mscorlib.Api.Environment._get_IsRunningOnWindows() == 1
    }

    // static GetEnvironmentVariableNames(): System_String[] {
    //     return mscorlib.Api.Environment._GetEnvironmentVariableNames()
    // }
    static GetEnvironmentVariableNames(): PackArray {
        return new PackArray(mscorlib.Api.Environment._GetEnvironmentVariableNames())
    }

    static GetMachineConfigPath(): System_String {
        return readU16(mscorlib.Api.Environment._GetMachineConfigPath())
    }

    static internalGetHome(): System_String {
        return readU16(mscorlib.Api.Environment._internalGetHome())
    }

    static GetPageSize(): System_Int32 {
        return mscorlib.Api.Environment._GetPageSize()
    }

    static GetStackTrace(e: System_Exception, needFileInfo: System_Boolean): System_String {
        return readU16(mscorlib.Api.Environment._GetStackTrace(e, needFileInfo))
    }

}

mscorlib.Environment = System_Environment_Impl

declare global {
    namespace mscorlib {
        class Environment extends System_Environment_Impl { }
    }
}

export { System_Environment_Impl }