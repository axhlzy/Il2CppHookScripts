import { cache } from "decorator-cache-getter"

class System_Environment_API {
    // internal static String GetResourceString(String key)
    @cache
    static get _GetResourceString() {
        return Il2Cpp.Api.o("mscorlib", "System.Environment", "GetResourceString", 1, ["System.String"], "pointer", ["pointer"])
    }

    // internal static String GetResourceString(String key,Object[] values)
    @cache
    static get _GetResourceString_key_values() {
        return Il2Cpp.Api.o("mscorlib", "System.Environment", "GetResourceString", 2, ["System.String", "System.Object[]"], "pointer", ["pointer", "pointer"])
    }

    // internal static String GetResourceStringEncodingName(Int32 codePage)
    @cache
    static get _GetResourceStringEncodingName() {
        return Il2Cpp.Api.o("mscorlib", "System.Environment", "GetResourceStringEncodingName", 1, ["System.Int32"], "pointer", ["pointer"])
    }

    // public static Int32 get_CurrentManagedThreadId()
    @cache
    static get _get_CurrentManagedThreadId() {
        return Il2Cpp.Api.o("mscorlib", "System.Environment", "get_CurrentManagedThreadId", 0, [], "pointer", [])
    }

    // public static Boolean get_HasShutdownStarted()
    @cache
    static get _get_HasShutdownStarted() {
        return Il2Cpp.Api.o("mscorlib", "System.Environment", "get_HasShutdownStarted", 0, [], "pointer", [])
    }

    // private static String GetNewLine()
    @cache
    static get _GetNewLine() {
        return Il2Cpp.Api.o("mscorlib", "System.Environment", "GetNewLine", 0, [], "pointer", [])
    }

    // public static String get_NewLine()
    @cache
    static get _get_NewLine() {
        return Il2Cpp.Api.o("mscorlib", "System.Environment", "get_NewLine", 0, [], "pointer", [])
    }

    // internal static PlatformID get_Platform()
    @cache
    static get _get_Platform() {
        return Il2Cpp.Api.o("mscorlib", "System.Environment", "get_Platform", 0, [], "pointer", [])
    }

    // internal static String GetOSVersionString()
    @cache
    static get _GetOSVersionString() {
        return Il2Cpp.Api.o("mscorlib", "System.Environment", "GetOSVersionString", 0, [], "pointer", [])
    }

    // public static OperatingSystem get_OSVersion()
    @cache
    static get _get_OSVersion() {
        return Il2Cpp.Api.o("mscorlib", "System.Environment", "get_OSVersion", 0, [], "pointer", [])
    }

    // internal static Version CreateVersionFromString(String info)
    @cache
    static get _CreateVersionFromString() {
        return Il2Cpp.Api.o("mscorlib", "System.Environment", "CreateVersionFromString", 1, ["System.String"], "pointer", ["pointer"])
    }

    // public static String get_StackTrace()
    @cache
    static get _get_StackTrace() {
        return Il2Cpp.Api.o("mscorlib", "System.Environment", "get_StackTrace", 0, [], "pointer", [])
    }

    // public static Int32 get_TickCount()
    @cache
    static get _get_TickCount() {
        return Il2Cpp.Api.o("mscorlib", "System.Environment", "get_TickCount", 0, [], "pointer", [])
    }

    // public static Void Exit(Int32 exitCode)
    @cache
    static get _Exit() {
        return Il2Cpp.Api.o("mscorlib", "System.Environment", "Exit", 1, ["System.Int32"], "void", ["pointer"])
    }

    // public static String ExpandEnvironmentVariables(String name)
    @cache
    static get _ExpandEnvironmentVariables() {
        return Il2Cpp.Api.o("mscorlib", "System.Environment", "ExpandEnvironmentVariables", 1, ["System.String"], "pointer", ["pointer"])
    }

    // public static String[] GetCommandLineArgs()
    @cache
    static get _GetCommandLineArgs() {
        return Il2Cpp.Api.o("mscorlib", "System.Environment", "GetCommandLineArgs", 0, [], "pointer", [])
    }

    // internal static String internalGetEnvironmentVariable_native(IntPtr variable)
    @cache
    static get _internalGetEnvironmentVariable_native() {
        return Il2Cpp.Api.o("mscorlib", "System.Environment", "internalGetEnvironmentVariable_native", 1, ["System.IntPtr"], "pointer", ["pointer"])
    }

    // internal static String internalGetEnvironmentVariable(String variable)
    @cache
    static get _internalGetEnvironmentVariable() {
        return Il2Cpp.Api.o("mscorlib", "System.Environment", "internalGetEnvironmentVariable", 1, ["System.String"], "pointer", ["pointer"])
    }

    // public static String GetEnvironmentVariable(String variable)
    @cache
    static get _GetEnvironmentVariable() {
        return Il2Cpp.Api.o("mscorlib", "System.Environment", "GetEnvironmentVariable", 1, ["System.String"], "pointer", ["pointer"])
    }

    // private static Hashtable GetEnvironmentVariablesNoCase()
    @cache
    static get _GetEnvironmentVariablesNoCase() {
        return Il2Cpp.Api.o("mscorlib", "System.Environment", "GetEnvironmentVariablesNoCase", 0, [], "pointer", [])
    }

    // public static String GetFolderPath(SpecialFolder folder)
    @cache
    static get _GetFolderPath() {
        return Il2Cpp.Api.o("mscorlib", "System.Environment", "GetFolderPath", 1, ["System.Environment.SpecialFolder"], "pointer", ["pointer"])
    }

    // private static String GetWindowsFolderPath(Int32 folder)
    @cache
    static get _GetWindowsFolderPath() {
        return Il2Cpp.Api.o("mscorlib", "System.Environment", "GetWindowsFolderPath", 1, ["System.Int32"], "pointer", ["pointer"])
    }

    // public static String GetFolderPath(SpecialFolder folder,SpecialFolderOption option)
    @cache
    static get _GetFolderPath_folder_option() {
        return Il2Cpp.Api.o("mscorlib", "System.Environment", "GetFolderPath", 2, ["System.Environment.SpecialFolder", "System.Environment.SpecialFolderOption"], "pointer", ["pointer", "pointer"])
    }

    // private static String ReadXdgUserDir(String config_dir,String home_dir,String key,String fallback)
    @cache
    static get _ReadXdgUserDir() {
        return Il2Cpp.Api.o("mscorlib", "System.Environment", "ReadXdgUserDir", 4, ["System.String", "System.String", "System.String", "System.String"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // internal static String UnixGetFolderPath(SpecialFolder folder,SpecialFolderOption option)
    @cache
    static get _UnixGetFolderPath() {
        return Il2Cpp.Api.o("mscorlib", "System.Environment", "UnixGetFolderPath", 2, ["System.Environment.SpecialFolder", "System.Environment.SpecialFolderOption"], "pointer", ["pointer", "pointer"])
    }

    // public static Void FailFast(String message,Exception exception)
    @cache
    static get _FailFast() {
        return Il2Cpp.Api.o("mscorlib", "System.Environment", "FailFast", 2, ["System.String", "System.Exception"], "void", ["pointer", "pointer"])
    }

    // public static Boolean get_Is64BitProcess()
    @cache
    static get _get_Is64BitProcess() {
        return Il2Cpp.Api.o("mscorlib", "System.Environment", "get_Is64BitProcess", 0, [], "pointer", [])
    }

    // public static Int32 get_ProcessorCount()
    @cache
    static get _get_ProcessorCount() {
        return Il2Cpp.Api.o("mscorlib", "System.Environment", "get_ProcessorCount", 0, [], "pointer", [])
    }

    // internal static Boolean get_IsRunningOnWindows()
    @cache
    static get _get_IsRunningOnWindows() {
        return Il2Cpp.Api.o("mscorlib", "System.Environment", "get_IsRunningOnWindows", 0, [], "pointer", [])
    }

    // private static String[] GetEnvironmentVariableNames()
    @cache
    static get _GetEnvironmentVariableNames() {
        return Il2Cpp.Api.o("mscorlib", "System.Environment", "GetEnvironmentVariableNames", 0, [], "pointer", [])
    }

    // internal static String GetMachineConfigPath()
    @cache
    static get _GetMachineConfigPath() {
        return Il2Cpp.Api.o("mscorlib", "System.Environment", "GetMachineConfigPath", 0, [], "pointer", [])
    }

    // internal static String internalGetHome()
    @cache
    static get _internalGetHome() {
        return Il2Cpp.Api.o("mscorlib", "System.Environment", "internalGetHome", 0, [], "pointer", [])
    }

    // internal static Int32 GetPageSize()
    @cache
    static get _GetPageSize() {
        return Il2Cpp.Api.o("mscorlib", "System.Environment", "GetPageSize", 0, [], "pointer", [])
    }

    // internal static String GetStackTrace(Exception e,Boolean needFileInfo)
    @cache
    static get _GetStackTrace() {
        return Il2Cpp.Api.o("mscorlib", "System.Environment", "GetStackTrace", 2, ["System.Exception", "System.Boolean"], "pointer", ["pointer", "pointer"])
    }

}

mscorlib.Api.Environment = System_Environment_API

declare global {
    namespace mscorlib.Api {
        class Environment extends System_Environment_API { }
    }
}

export { }