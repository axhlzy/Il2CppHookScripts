import { mscorlib_System_Object_impl } from "../class"
import { UnityEngine_WWWForm_Impl as UnityEngine_WWWForm } from "../WWWForm/class"
import { 
    UnityEngine_Networking_UnityWebRequest_Result as UnityWebRequest_Result, 
    UnityEngine_Networking_UnityWebRequest_UnityWebRequestError as UnityWebRequestError, 
    UnityEngine_Networking_UnityWebRequest_UnityWebRequestMethod as UnityWebRequestMethod
} from "./enum"

type System_IntPtr = NativePointer
type UnityEngine_Networking_DownloadHandler = NativePointer
type UnityEngine_Networking_UploadHandler = NativePointer
type UnityEngine_Networking_CertificateHandler = NativePointer
type UnityEngine_Networking_UnityWebRequestAsyncOperation = NativePointer
type System_Uri = NativePointer
type System_String = string
type System_Int32 = number
type System_Int64 = number
type System_Single = number
type System_Boolean = boolean
type System_Void = void

class UnityEngine_Networking_UnityWebRequest_Impl extends mscorlib_System_Object_impl {

    m_Ptr: System_IntPtr = lfv(this.handle, "m_Ptr") as unknown as System_IntPtr
    m_DownloadHandler: UnityEngine_Networking_DownloadHandler = lfv(this.handle, "m_DownloadHandler") as unknown as UnityEngine_Networking_DownloadHandler
    m_UploadHandler: UnityEngine_Networking_UploadHandler = lfv(this.handle, "m_UploadHandler") as unknown as UnityEngine_Networking_UploadHandler
    m_CertificateHandler: UnityEngine_Networking_CertificateHandler = lfv(this.handle, "m_CertificateHandler") as unknown as UnityEngine_Networking_CertificateHandler
    m_Uri: System_Uri = lfv(this.handle, "m_Uri") as unknown as System_Uri
    // <disposeCertificateHandlerOnDispose>k__BackingField: System_Boolean = lfv(this.handle, "<disposeCertificateHandlerOnDispose>k__BackingField") as unknown as System_Boolean
    // <disposeDownloadHandlerOnDispose>k__BackingField: System_Boolean = lfv(this.handle, "<disposeDownloadHandlerOnDispose>k__BackingField") as unknown as System_Boolean
    // <disposeUploadHandlerOnDispose>k__BackingField: System_Boolean = lfv(this.handle, "<disposeUploadHandlerOnDispose>k__BackingField") as unknown as System_Boolean

    constructor(handleOrWrapper: NativePointer) {
             super(handleOrWrapper)
    }
    static GetWebErrorString(err:UnityWebRequestError): System_String {
        return readU16(Il2Cpp.Api.UnityWebRequest._GetWebErrorString(err))
    }

    static GetHTTPStatusString(responseCode:System_Int64): System_String {
        return readU16(Il2Cpp.Api.UnityWebRequest._GetHTTPStatusString(responseCode))
    }

    get_disposeCertificateHandlerOnDispose(): System_Boolean {
        return Il2Cpp.Api.UnityWebRequest._get_disposeCertificateHandlerOnDispose(this.handle)
    }

    set_disposeCertificateHandlerOnDispose(value:System_Boolean): System_Void {
        return Il2Cpp.Api.UnityWebRequest._set_disposeCertificateHandlerOnDispose(this.handle , value)
    }

    get_disposeDownloadHandlerOnDispose(): System_Boolean {
        return Il2Cpp.Api.UnityWebRequest._get_disposeDownloadHandlerOnDispose(this.handle)
    }

    set_disposeDownloadHandlerOnDispose(value:System_Boolean): System_Void {
        return Il2Cpp.Api.UnityWebRequest._set_disposeDownloadHandlerOnDispose(this.handle , value)
    }

    get_disposeUploadHandlerOnDispose(): System_Boolean {
        return Il2Cpp.Api.UnityWebRequest._get_disposeUploadHandlerOnDispose(this.handle)
    }

    set_disposeUploadHandlerOnDispose(value:System_Boolean): System_Void {
        return Il2Cpp.Api.UnityWebRequest._set_disposeUploadHandlerOnDispose(this.handle , value)
    }

    static Create(): System_IntPtr {
        return Il2Cpp.Api.UnityWebRequest._Create()
    }

    Release(): System_Void {
        return Il2Cpp.Api.UnityWebRequest._Release(this.handle)
    }

    InternalDestroy(): System_Void {
        return Il2Cpp.Api.UnityWebRequest._InternalDestroy(this.handle)
    }

    InternalSetDefaults(): System_Void {
        return Il2Cpp.Api.UnityWebRequest._InternalSetDefaults(this.handle)
    }

    _ctor(url:System_String, method:System_String): System_Void {
        return Il2Cpp.Api.UnityWebRequest.__ctor(this.handle , url, method)
    }

    _ctor_4(url:System_String, method:System_String, downloadHandler:UnityEngine_Networking_DownloadHandler, uploadHandler:UnityEngine_Networking_UploadHandler): System_Void {
        return Il2Cpp.Api.UnityWebRequest.__ctor(this.handle , url, method, downloadHandler, uploadHandler)
    }

    Finalize(): System_Void {
        return Il2Cpp.Api.UnityWebRequest._Finalize(this.handle)
    }

    Dispose(): System_Void {
        return Il2Cpp.Api.UnityWebRequest._Dispose(this.handle)
    }

    DisposeHandlers(): System_Void {
        return Il2Cpp.Api.UnityWebRequest._DisposeHandlers(this.handle)
    }

    BeginWebRequest(): UnityEngine_Networking_UnityWebRequestAsyncOperation {
        return Il2Cpp.Api.UnityWebRequest._BeginWebRequest(this.handle)
    }

    SendWebRequest(): UnityEngine_Networking_UnityWebRequestAsyncOperation {
        return Il2Cpp.Api.UnityWebRequest._SendWebRequest(this.handle)
    }

    Abort(): System_Void {
        return Il2Cpp.Api.UnityWebRequest._Abort(this.handle)
    }

    SetMethod(methodType:UnityWebRequestMethod): UnityWebRequestError {
        return Il2Cpp.Api.UnityWebRequest._SetMethod(this.handle , methodType)
    }

    InternalSetMethod(methodType:UnityWebRequestMethod): System_Void {
        return Il2Cpp.Api.UnityWebRequest._InternalSetMethod(this.handle , methodType)
    }

    SetCustomMethod(customMethodName:System_String): UnityWebRequestError {
        return Il2Cpp.Api.UnityWebRequest._SetCustomMethod(this.handle , customMethodName)
    }

    InternalSetCustomMethod(customMethodName:System_String): System_Void {
        return Il2Cpp.Api.UnityWebRequest._InternalSetCustomMethod(this.handle , customMethodName)
    }

    set_method(value:System_String): System_Void {
        return Il2Cpp.Api.UnityWebRequest._set_method(this.handle , value)
    }

    GetError(): UnityWebRequestError {
        return Il2Cpp.Api.UnityWebRequest._GetError(this.handle)
    }

    get_error(): System_String {
        return readU16(Il2Cpp.Api.UnityWebRequest._get_error(this.handle))
    }

    get_url(): System_String {
        return readU16(Il2Cpp.Api.UnityWebRequest._get_url(this.handle))
    }

    set_url(value:System_String): System_Void {
        return Il2Cpp.Api.UnityWebRequest._set_url(this.handle , value)
    }

    GetUrl(): System_String {
        return readU16(Il2Cpp.Api.UnityWebRequest._GetUrl(this.handle))
    }

    SetUrl(url:System_String): UnityWebRequestError {
        return Il2Cpp.Api.UnityWebRequest._SetUrl(this.handle , url)
    }

    InternalSetUrl(url:System_String): System_Void {
        return Il2Cpp.Api.UnityWebRequest._InternalSetUrl(this.handle , url)
    }

    get_responseCode(): System_Int64 {
        return Il2Cpp.Api.UnityWebRequest._get_responseCode(this.handle)
    }

    GetUploadProgress(): System_Single {
        return Il2Cpp.Api.UnityWebRequest._GetUploadProgress(this.handle)
    }

    IsExecuting(): System_Boolean {
        return Il2Cpp.Api.UnityWebRequest._IsExecuting(this.handle)
    }

    get_uploadProgress(): System_Single {
        return Il2Cpp.Api.UnityWebRequest._get_uploadProgress(this.handle)
    }

    get_isModifiable(): System_Boolean {
        return Il2Cpp.Api.UnityWebRequest._get_isModifiable(this.handle)
    }

    get_isDone(): System_Boolean {
        return Il2Cpp.Api.UnityWebRequest._get_isDone(this.handle)
    }

    get_isNetworkError(): System_Boolean {
        return Il2Cpp.Api.UnityWebRequest._get_isNetworkError(this.handle)
    }

    get_isHttpError(): System_Boolean {
        return Il2Cpp.Api.UnityWebRequest._get_isHttpError(this.handle)
    }

    get_result(): UnityWebRequest_Result {
        return Il2Cpp.Api.UnityWebRequest._get_result(this.handle)
    }

    GetDownloadProgress(): System_Single {
        return Il2Cpp.Api.UnityWebRequest._GetDownloadProgress(this.handle)
    }

    get_downloadProgress(): System_Single {
        return Il2Cpp.Api.UnityWebRequest._get_downloadProgress(this.handle)
    }

    SetChunked(chunked:System_Boolean): UnityWebRequestError {
        return Il2Cpp.Api.UnityWebRequest._SetChunked(this.handle , chunked)
    }

    set_chunkedTransfer(value:System_Boolean): System_Void {
        return Il2Cpp.Api.UnityWebRequest._set_chunkedTransfer(this.handle , value)
    }

    InternalSetRequestHeader(name:System_String, value:System_String): UnityWebRequestError {
        return Il2Cpp.Api.UnityWebRequest._InternalSetRequestHeader(this.handle , name, value)
    }

    SetRequestHeader(name:System_String, value:System_String): System_Void {
        return Il2Cpp.Api.UnityWebRequest._SetRequestHeader(this.handle , name, value)
    }

    GetResponseHeader(name:System_String): System_String {
        return readU16(Il2Cpp.Api.UnityWebRequest._GetResponseHeader(this.handle , name))
    }

    GetResponseHeaderKeys(): System_String[] {
        return Il2Cpp.Api.UnityWebRequest._GetResponseHeaderKeys(this.handle)
    }

    // GetResponseHeaders(): System_Collections.Generic.Dictionary<System.String,System.String> {
    //     return Il2Cpp.Api.UnityWebRequest._GetResponseHeaders(this.handle)
    // }

    SetUploadHandler(uh:UnityEngine_Networking_UploadHandler): UnityWebRequestError {
        return Il2Cpp.Api.UnityWebRequest._SetUploadHandler(this.handle , uh)
    }

    get_uploadHandler(): UnityEngine_Networking_UploadHandler {
        return Il2Cpp.Api.UnityWebRequest._get_uploadHandler(this.handle)
    }

    set_uploadHandler(value:UnityEngine_Networking_UploadHandler): System_Void {
        return Il2Cpp.Api.UnityWebRequest._set_uploadHandler(this.handle , value)
    }

    SetDownloadHandler(dh:UnityEngine_Networking_DownloadHandler): UnityWebRequestError {
        return Il2Cpp.Api.UnityWebRequest._SetDownloadHandler(this.handle , dh)
    }

    get_downloadHandler(): UnityEngine_Networking_DownloadHandler {
        return Il2Cpp.Api.UnityWebRequest._get_downloadHandler(this.handle)
    }

    set_downloadHandler(value:UnityEngine_Networking_DownloadHandler): System_Void {
        return Il2Cpp.Api.UnityWebRequest._set_downloadHandler(this.handle , value)
    }

    get_certificateHandler(): UnityEngine_Networking_CertificateHandler {
        return Il2Cpp.Api.UnityWebRequest._get_certificateHandler(this.handle)
    }

    SetTimeoutMsec(timeout:System_Int32): UnityWebRequestError {
        return Il2Cpp.Api.UnityWebRequest._SetTimeoutMsec(this.handle , timeout)
    }

    set_timeout(value:System_Int32): System_Void {
        return Il2Cpp.Api.UnityWebRequest._set_timeout(this.handle , value)
    }

    static Get(uri:System_String): UnityEngine_Networking_UnityWebRequest_Impl {
        return Il2Cpp.Api.UnityWebRequest._Get(allocUStr(uri))
    }

    static Post(uri:System_String, formData:UnityEngine_WWWForm): UnityEngine_Networking_UnityWebRequest_Impl {
        return Il2Cpp.Api.UnityWebRequest._Post(allocUStr(uri), formData)
    }

    static SetupPost(request:UnityEngine_Networking_UnityWebRequest_Impl, formData:UnityEngine_WWWForm): System_Void {
        return Il2Cpp.Api.UnityWebRequest._SetupPost(request, formData)
    }
}

Il2Cpp.UnityWebRequest = UnityEngine_Networking_UnityWebRequest_Impl

declare global {
    namespace Il2Cpp{
            class UnityWebRequest extends UnityEngine_Networking_UnityWebRequest_Impl { }
    }
}

export { UnityEngine_Networking_UnityWebRequest_Impl }