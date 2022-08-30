import { mscorlib_System_Object_impl } from "../class"

type System_Collections_IDictionary = NativePointer
type System_Runtime_Serialization_SafeSerializationManager = NativePointer
type System_Diagnostics_StackTrace = NativePointer
type System_IntPtr = NativePointer
type System_Runtime_Serialization_SerializationInfo = NativePointer
type System_Runtime_Serialization_StreamingContext = NativePointer
type System_Reflection_MethodBase = NativePointer
type System_Runtime_ExceptionServices_ExceptionDispatchInfo = NativePointer
type System_Exception_Impl_ExceptionMessageKind = NativePointer

class System_Exception_Impl extends mscorlib_System_Object_impl {

    s_EDILock: mscorlib_System_Object_impl = lfv(this.handle, "s_EDILock") as unknown as mscorlib_System_Object_impl
    _className: string = lfv(this.handle, "_className") as unknown as string
    _message: string = lfv(this.handle, "_message") as unknown as string
    _data: System_Collections_IDictionary = lfv(this.handle, "_data") as unknown as System_Collections_IDictionary
    _innerException: System_Exception_Impl = lfv(this.handle, "_innerException") as unknown as System_Exception_Impl
    _helpURL: string = lfv(this.handle, "_helpURL") as unknown as string
    _stackTrace: mscorlib_System_Object_impl = lfv(this.handle, "_stackTrace") as unknown as mscorlib_System_Object_impl
    _stackTraceString: string = lfv(this.handle, "_stackTraceString") as unknown as string
    _remoteStackTraceString: string = lfv(this.handle, "_remoteStackTraceString") as unknown as string
    _remoteStackIndex: number = lfv(this.handle, "_remoteStackIndex") as unknown as number
    _dynamicMethods: mscorlib_System_Object_impl = lfv(this.handle, "_dynamicMethods") as unknown as mscorlib_System_Object_impl
    _HResult: number = lfv(this.handle, "_HResult") as unknown as number
    _source: string = lfv(this.handle, "_source") as unknown as string
    _safeSerializationManager: System_Runtime_Serialization_SafeSerializationManager = lfv(this.handle, "_safeSerializationManager") as unknown as System_Runtime_Serialization_SafeSerializationManager
    captured_traces: System_Diagnostics_StackTrace[] = lfv(this.handle, "captured_traces") as unknown as System_Diagnostics_StackTrace[]
    native_trace_ips: System_IntPtr[] = lfv(this.handle, "native_trace_ips") as unknown as System_IntPtr[]
    _COMPlusExceptionCode: number = lfv(this.handle, "_COMPlusExceptionCode") as unknown as number


    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    Init(): void {
        return mscorlib.Api.Exception._Init(this.handle)
    }

    _ctor(): void {
        return mscorlib.Api.Exception.__ctor(this.handle)
    }

    _ctor_1(message: string): void {
        return mscorlib.Api.Exception.__ctor(this.handle, message)
    }

    _ctor_msg_exception(message: string, innerException: System_Exception_Impl): void {
        return mscorlib.Api.Exception.__ctor(this.handle, message, innerException)
    }

    _ctor_info_ctx(info: System_Runtime_Serialization_SerializationInfo, context: System_Runtime_Serialization_StreamingContext): void {
        return mscorlib.Api.Exception.__ctor(this.handle, info, context)
    }

    get_Message(): string {
        return readU16(mscorlib.Api.Exception._get_Message(this.handle))
    }

    get_Data(): System_Collections_IDictionary {
        return mscorlib.Api.Exception._get_Data(this.handle)
    }

    static IsImmutableAgileException(e: System_Exception_Impl): boolean {
        return mscorlib.Api.Exception._IsImmutableAgileException(e)
    }

    GetClassName(): string {
        return readU16(mscorlib.Api.Exception._GetClassName(this.handle))
    }

    get_InnerException(): System_Exception_Impl {
        return mscorlib.Api.Exception._get_InnerException(this.handle)
    }

    get_TargetSite(): System_Reflection_MethodBase {
        return mscorlib.Api.Exception._get_TargetSite(this.handle)
    }

    get_StackTrace(): string {
        return readU16(mscorlib.Api.Exception._get_StackTrace(this.handle))
    }

    GetStackTrace(needFileInfo: boolean): string {
        return readU16(mscorlib.Api.Exception._GetStackTrace(this.handle, needFileInfo))
    }

    SetErrorCode(hr: number): void {
        return mscorlib.Api.Exception._SetErrorCode(this.handle, hr)
    }

    get_Source(): string {
        return readU16(mscorlib.Api.Exception._get_Source(this.handle))
    }

    ToString(): string {
        return readU16(mscorlib.Api.Exception._ToString(this.handle))
    }

    ToString_2(needFileLineInfo: boolean, needMessage: boolean): string {
        return readU16(mscorlib.Api.Exception._ToString(this.handle, needFileLineInfo, needMessage))
    }

    GetObjectData(info: System_Runtime_Serialization_SerializationInfo, context: System_Runtime_Serialization_StreamingContext): void {
        return mscorlib.Api.Exception._GetObjectData(this.handle, info, context)
    }

    OnDeserialized(context: System_Runtime_Serialization_StreamingContext): void {
        return mscorlib.Api.Exception._OnDeserialized(this.handle, context)
    }

    StripFileInfo(stackTrace: string, isRemoteStackTrace: boolean): string {
        return readU16(mscorlib.Api.Exception._StripFileInfo(this.handle, stackTrace, isRemoteStackTrace))
    }

    RestoreExceptionDispatchInfo(exceptionDispatchInfo: System_Runtime_ExceptionServices_ExceptionDispatchInfo): void {
        return mscorlib.Api.Exception._RestoreExceptionDispatchInfo(this.handle, exceptionDispatchInfo)
    }

    get_HResult(): number {
        return mscorlib.Api.Exception._get_HResult(this.handle)
    }

    set_HResult(value: number): void {
        return mscorlib.Api.Exception._set_HResult(this.handle, value)
    }

    GetType(): Il2Cpp.Type {
        return mscorlib.Api.Exception._GetType(this.handle)
    }

    static GetMessageFromNativeResources(kind: System_Exception_Impl_ExceptionMessageKind): string {
        return readU16(mscorlib.Api.Exception._GetMessageFromNativeResources(kind))
    }

    FixRemotingException(): System_Exception_Impl {
        return mscorlib.Api.Exception._FixRemotingException(this.handle)
    }

    static ReportUnhandledException(exception: System_Exception_Impl): void {
        return mscorlib.Api.Exception._ReportUnhandledException(exception)
    }

    static _cctor(): void {
        return mscorlib.Api.Exception.__cctor()
    }

}

mscorlib.Exception = System_Exception_Impl

declare global {
    namespace mscorlib {
        class Exception extends System_Exception_Impl { }
    }
}

export { System_Exception_Impl }