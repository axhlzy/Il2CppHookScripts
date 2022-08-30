import { cache } from "decorator-cache-getter"

class System_Exception_API {
    // private Void Init()
    @cache
    static get _Init() {
        return Il2Cpp.Api.t("mscorlib", "System.Exception", "Init", 0, "void", ["pointer"])
    }

    // public Void .ctor()
    @cache
    static get __ctor() {
        return Il2Cpp.Api.t("mscorlib", "System.Exception", ".ctor", 0, "void", ["pointer"])
    }

    // public Void .ctor(String message)
    @cache
    static get __ctor_message() {
        return Il2Cpp.Api.o("mscorlib", "System.Exception", ".ctor", 1, ["System.String"], "void", ["pointer", "pointer"])
    }

    // public Void .ctor(String message,Exception innerException)
    @cache
    static get __ctor_message_innerException() {
        return Il2Cpp.Api.o("mscorlib", "System.Exception", ".ctor", 2, ["System.String", "System.Exception"], "void", ["pointer", "pointer", "pointer"])
    }

    // protected Void .ctor(SerializationInfo info,StreamingContext context)
    @cache
    static get __ctor_info_context() {
        return Il2Cpp.Api.o("mscorlib", "System.Exception", ".ctor", 2, ["System.Runtime.Serialization.SerializationInfo", "System.Runtime.Serialization.StreamingContext"], "void", ["pointer", "pointer", "pointer"])
    }

    // public virtual String get_Message()
    @cache
    static get _get_Message() {
        return Il2Cpp.Api.t("mscorlib", "System.Exception", "get_Message", 0, "pointer", ["pointer"])
    }

    // public virtual IDictionary get_Data()
    @cache
    static get _get_Data() {
        return Il2Cpp.Api.t("mscorlib", "System.Exception", "get_Data", 0, "pointer", ["pointer"])
    }

    // private static Boolean IsImmutableAgileException(Exception e)
    @cache
    static get _IsImmutableAgileException() {
        return Il2Cpp.Api.t("mscorlib", "System.Exception", "IsImmutableAgileException", 1, "pointer", ["pointer"])
    }

    // private String GetClassName()
    @cache
    static get _GetClassName() {
        return Il2Cpp.Api.t("mscorlib", "System.Exception", "GetClassName", 0, "pointer", ["pointer"])
    }

    // public Exception get_InnerException()
    @cache
    static get _get_InnerException() {
        return Il2Cpp.Api.t("mscorlib", "System.Exception", "get_InnerException", 0, "pointer", ["pointer"])
    }

    // public MethodBase get_TargetSite()
    @cache
    static get _get_TargetSite() {
        return Il2Cpp.Api.t("mscorlib", "System.Exception", "get_TargetSite", 0, "pointer", ["pointer"])
    }

    // public virtual String get_StackTrace()
    @cache
    static get _get_StackTrace() {
        return Il2Cpp.Api.t("mscorlib", "System.Exception", "get_StackTrace", 0, "pointer", ["pointer"])
    }

    // private String GetStackTrace(Boolean needFileInfo)
    @cache
    static get _GetStackTrace() {
        return Il2Cpp.Api.t("mscorlib", "System.Exception", "GetStackTrace", 1, "pointer", ["pointer", "pointer"])
    }

    // internal Void SetErrorCode(Int32 hr)
    @cache
    static get _SetErrorCode() {
        return Il2Cpp.Api.t("mscorlib", "System.Exception", "SetErrorCode", 1, "void", ["pointer", "pointer"])
    }

    // public virtual String get_Source()
    @cache
    static get _get_Source() {
        return Il2Cpp.Api.t("mscorlib", "System.Exception", "get_Source", 0, "pointer", ["pointer"])
    }

    // public override String ToString()
    @cache
    static get _ToString() {
        return Il2Cpp.Api.t("mscorlib", "System.Exception", "ToString", 0, "pointer", ["pointer"])
    }

    // private String ToString(Boolean needFileLineInfo,Boolean needMessage)
    @cache
    static get _ToString_needFileLineInfo_needMessage() {
        return Il2Cpp.Api.o("mscorlib", "System.Exception", "ToString", 2, ["System.Boolean", "System.Boolean"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // public virtual Void GetObjectData(SerializationInfo info,StreamingContext context)
    @cache
    static get _GetObjectData() {
        return Il2Cpp.Api.t("mscorlib", "System.Exception", "GetObjectData", 2, "void", ["pointer", "pointer", "pointer"])
    }

    // private Void OnDeserialized(StreamingContext context)
    @cache
    static get _OnDeserialized() {
        return Il2Cpp.Api.t("mscorlib", "System.Exception", "OnDeserialized", 1, "void", ["pointer", "pointer"])
    }

    // private String StripFileInfo(String stackTrace,Boolean isRemoteStackTrace)
    @cache
    static get _StripFileInfo() {
        return Il2Cpp.Api.t("mscorlib", "System.Exception", "StripFileInfo", 2, "pointer", ["pointer", "pointer", "pointer"])
    }

    // internal Void RestoreExceptionDispatchInfo(ExceptionDispatchInfo exceptionDispatchInfo)
    @cache
    static get _RestoreExceptionDispatchInfo() {
        return Il2Cpp.Api.t("mscorlib", "System.Exception", "RestoreExceptionDispatchInfo", 1, "void", ["pointer", "pointer"])
    }

    // public Int32 get_HResult()
    @cache
    static get _get_HResult() {
        return Il2Cpp.Api.t("mscorlib", "System.Exception", "get_HResult", 0, "pointer", ["pointer"])
    }

    // protected Void set_HResult(Int32 value)
    @cache
    static get _set_HResult() {
        return Il2Cpp.Api.t("mscorlib", "System.Exception", "set_HResult", 1, "void", ["pointer", "pointer"])
    }

    // public Type GetType()
    @cache
    static get _GetType() {
        return Il2Cpp.Api.t("mscorlib", "System.Exception", "GetType", 0, "pointer", ["pointer"])
    }

    // internal static String GetMessageFromNativeResources(ExceptionMessageKind kind)
    @cache
    static get _GetMessageFromNativeResources() {
        return Il2Cpp.Api.t("mscorlib", "System.Exception", "GetMessageFromNativeResources", 1, "pointer", ["pointer"])
    }

    // internal Exception FixRemotingException()
    @cache
    static get _FixRemotingException() {
        return Il2Cpp.Api.t("mscorlib", "System.Exception", "FixRemotingException", 0, "pointer", ["pointer"])
    }

    // internal static Void ReportUnhandledException(Exception exception)
    @cache
    static get _ReportUnhandledException() {
        return Il2Cpp.Api.t("mscorlib", "System.Exception", "ReportUnhandledException", 1, "void", ["pointer"])
    }

    // private static Void .cctor()
    @cache
    static get __cctor() {
        return Il2Cpp.Api.t("mscorlib", "System.Exception", ".cctor", 0, "void", [])
    }

}

mscorlib.Api.Exception = System_Exception_API

declare global {
    namespace mscorlib.Api {
        class Exception extends System_Exception_API { }
    }
}

export { }
