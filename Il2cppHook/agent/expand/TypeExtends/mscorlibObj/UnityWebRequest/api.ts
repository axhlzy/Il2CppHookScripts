import { cache } from "decorator-cache-getter"

class UnityEngine_Networking_UnityWebRequest_API {
        // private static String GetWebErrorString(UnityWebRequestError err)
        @cache
        static get _GetWebErrorString() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "GetWebErrorString", 1, ["UnityEngine.Networking.UnityWebRequest.UnityWebRequestError"], "pointer", ["pointer"])
        }

        // internal static String GetHTTPStatusString(Int64 responseCode)
        @cache
        static get _GetHTTPStatusString() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "GetHTTPStatusString", 1, ["System.Int64"], "pointer", ["pointer"])
        }

        // public Boolean get_disposeCertificateHandlerOnDispose()
        @cache
        static get _get_disposeCertificateHandlerOnDispose() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "get_disposeCertificateHandlerOnDispose", 0, [], "pointer", ["pointer"])
        }

        // public Void set_disposeCertificateHandlerOnDispose(Boolean value)
        @cache
        static get _set_disposeCertificateHandlerOnDispose() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "set_disposeCertificateHandlerOnDispose", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
        }

        // public Boolean get_disposeDownloadHandlerOnDispose()
        @cache
        static get _get_disposeDownloadHandlerOnDispose() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "get_disposeDownloadHandlerOnDispose", 0, [], "pointer", ["pointer"])
        }

        // public Void set_disposeDownloadHandlerOnDispose(Boolean value)
        @cache
        static get _set_disposeDownloadHandlerOnDispose() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "set_disposeDownloadHandlerOnDispose", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
        }

        // public Boolean get_disposeUploadHandlerOnDispose()
        @cache
        static get _get_disposeUploadHandlerOnDispose() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "get_disposeUploadHandlerOnDispose", 0, [], "pointer", ["pointer"])
        }

        // public Void set_disposeUploadHandlerOnDispose(Boolean value)
        @cache
        static get _set_disposeUploadHandlerOnDispose() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "set_disposeUploadHandlerOnDispose", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
        }

        // internal static IntPtr Create()
        @cache
        static get _Create() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "Create", 0, [], "pointer", [])
        }

        // private Void Release()
        @cache
        static get _Release() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "Release", 0, [], "void", ["pointer"])
        }

        // internal Void InternalDestroy()
        @cache
        static get _InternalDestroy() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "InternalDestroy", 0, [], "void", ["pointer"])
        }

        // private Void InternalSetDefaults()
        @cache
        static get _InternalSetDefaults() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "InternalSetDefaults", 0, [], "void", ["pointer"])
        }

        // public Void .ctor(String url,String method)
        @cache
        static get __ctor() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", ".ctor", 2, ["System.String", "System.String"], "void", ["pointer", "pointer", "pointer"])
        }

        // public Void .ctor(String url,String method,DownloadHandler downloadHandler,UploadHandler uploadHandler)
        @cache
        static get __ctor_url_method_downloadHandler_uploadHandler() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", ".ctor", 4, ["System.String", "System.String", "UnityEngine.Networking.DownloadHandler", "UnityEngine.Networking.UploadHandler"], "void", ["pointer", "pointer", "pointer", "pointer", "pointer"])
        }

        // protected override Void Finalize()
        @cache
        static get _Finalize() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "Finalize", 0, [], "void", ["pointer"])
        }

        // public Void Dispose()
        @cache
        static get _Dispose() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "Dispose", 0, [], "void", ["pointer"])
        }

        // private Void DisposeHandlers()
        @cache
        static get _DisposeHandlers() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "DisposeHandlers", 0, [], "void", ["pointer"])
        }

        // internal UnityWebRequestAsyncOperation BeginWebRequest()
        @cache
        static get _BeginWebRequest() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "BeginWebRequest", 0, [], "pointer", ["pointer"])
        }

        // public UnityWebRequestAsyncOperation SendWebRequest()
        @cache
        static get _SendWebRequest() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "SendWebRequest", 0, [], "pointer", ["pointer"])
        }

        // public Void Abort()
        @cache
        static get _Abort() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "Abort", 0, [], "void", ["pointer"])
        }

        // private UnityWebRequestError SetMethod(UnityWebRequestMethod methodType)
        @cache
        static get _SetMethod() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "SetMethod", 1, ["UnityEngine.Networking.UnityWebRequest.UnityWebRequestMethod"], "pointer", ["pointer", "pointer"])
        }

        // internal Void InternalSetMethod(UnityWebRequestMethod methodType)
        @cache
        static get _InternalSetMethod() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "InternalSetMethod", 1, ["UnityEngine.Networking.UnityWebRequest.UnityWebRequestMethod"], "void", ["pointer", "pointer"])
        }

        // private UnityWebRequestError SetCustomMethod(String customMethodName)
        @cache
        static get _SetCustomMethod() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "SetCustomMethod", 1, ["System.String"], "pointer", ["pointer", "pointer"])
        }

        // internal Void InternalSetCustomMethod(String customMethodName)
        @cache
        static get _InternalSetCustomMethod() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "InternalSetCustomMethod", 1, ["System.String"], "void", ["pointer", "pointer"])
        }

        // public Void set_method(String value)
        @cache
        static get _set_method() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "set_method", 1, ["System.String"], "void", ["pointer", "pointer"])
        }

        // private UnityWebRequestError GetError()
        @cache
        static get _GetError() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "GetError", 0, [], "pointer", ["pointer"])
        }

        // public String get_error()
        @cache
        static get _get_error() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "get_error", 0, [], "pointer", ["pointer"])
        }

        // public String get_url()
        @cache
        static get _get_url() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "get_url", 0, [], "pointer", ["pointer"])
        }

        // public Void set_url(String value)
        @cache
        static get _set_url() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "set_url", 1, ["System.String"], "void", ["pointer", "pointer"])
        }

        // private String GetUrl()
        @cache
        static get _GetUrl() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "GetUrl", 0, [], "pointer", ["pointer"])
        }

        // private UnityWebRequestError SetUrl(String url)
        @cache
        static get _SetUrl() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "SetUrl", 1, ["System.String"], "pointer", ["pointer", "pointer"])
        }

        // private Void InternalSetUrl(String url)
        @cache
        static get _InternalSetUrl() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "InternalSetUrl", 1, ["System.String"], "void", ["pointer", "pointer"])
        }

        // public Int64 get_responseCode()
        @cache
        static get _get_responseCode() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "get_responseCode", 0, [], "pointer", ["pointer"])
        }

        // private Single GetUploadProgress()
        @cache
        static get _GetUploadProgress() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "GetUploadProgress", 0, [], "pointer", ["pointer"])
        }

        // private Boolean IsExecuting()
        @cache
        static get _IsExecuting() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "IsExecuting", 0, [], "pointer", ["pointer"])
        }

        // public Single get_uploadProgress()
        @cache
        static get _get_uploadProgress() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "get_uploadProgress", 0, [], "pointer", ["pointer"])
        }

        // public Boolean get_isModifiable()
        @cache
        static get _get_isModifiable() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "get_isModifiable", 0, [], "pointer", ["pointer"])
        }

        // public Boolean get_isDone()
        @cache
        static get _get_isDone() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "get_isDone", 0, [], "pointer", ["pointer"])
        }

        // public Boolean get_isNetworkError()
        @cache
        static get _get_isNetworkError() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "get_isNetworkError", 0, [], "pointer", ["pointer"])
        }

        // public Boolean get_isHttpError()
        @cache
        static get _get_isHttpError() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "get_isHttpError", 0, [], "pointer", ["pointer"])
        }

        // public Result get_result()
        @cache
        static get _get_result() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "get_result", 0, [], "pointer", ["pointer"])
        }

        // private Single GetDownloadProgress()
        @cache
        static get _GetDownloadProgress() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "GetDownloadProgress", 0, [], "pointer", ["pointer"])
        }

        // public Single get_downloadProgress()
        @cache
        static get _get_downloadProgress() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "get_downloadProgress", 0, [], "pointer", ["pointer"])
        }

        // private UnityWebRequestError SetChunked(Boolean chunked)
        @cache
        static get _SetChunked() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "SetChunked", 1, ["System.Boolean"], "pointer", ["pointer", "pointer"])
        }

        // public Void set_chunkedTransfer(Boolean value)
        @cache
        static get _set_chunkedTransfer() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "set_chunkedTransfer", 1, ["System.Boolean"], "void", ["pointer", "pointer"])
        }

        // internal UnityWebRequestError InternalSetRequestHeader(String name,String value)
        @cache
        static get _InternalSetRequestHeader() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "InternalSetRequestHeader", 2, ["System.String", "System.String"], "pointer", ["pointer", "pointer", "pointer"])
        }

        // public Void SetRequestHeader(String name,String value)
        @cache
        static get _SetRequestHeader() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "SetRequestHeader", 2, ["System.String", "System.String"], "void", ["pointer", "pointer", "pointer"])
        }

        // public String GetResponseHeader(String name)
        @cache
        static get _GetResponseHeader() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "GetResponseHeader", 1, ["System.String"], "pointer", ["pointer", "pointer"])
        }

        // internal String[] GetResponseHeaderKeys()
        @cache
        static get _GetResponseHeaderKeys() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "GetResponseHeaderKeys", 0, [], "pointer", ["pointer"])
        }

        // public String> GetResponseHeaders()
        @cache
        static get _GetResponseHeaders() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "GetResponseHeaders", 0, [], "pointer", ["pointer"])
        }

        // private UnityWebRequestError SetUploadHandler(UploadHandler uh)
        @cache
        static get _SetUploadHandler() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "SetUploadHandler", 1, ["UnityEngine.Networking.UploadHandler"], "pointer", ["pointer", "pointer"])
        }

        // public UploadHandler get_uploadHandler()
        @cache
        static get _get_uploadHandler() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "get_uploadHandler", 0, [], "pointer", ["pointer"])
        }

        // public Void set_uploadHandler(UploadHandler value)
        @cache
        static get _set_uploadHandler() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "set_uploadHandler", 1, ["UnityEngine.Networking.UploadHandler"], "void", ["pointer", "pointer"])
        }

        // private UnityWebRequestError SetDownloadHandler(DownloadHandler dh)
        @cache
        static get _SetDownloadHandler() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "SetDownloadHandler", 1, ["UnityEngine.Networking.DownloadHandler"], "pointer", ["pointer", "pointer"])
        }

        // public DownloadHandler get_downloadHandler()
        @cache
        static get _get_downloadHandler() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "get_downloadHandler", 0, [], "pointer", ["pointer"])
        }

        // public Void set_downloadHandler(DownloadHandler value)
        @cache
        static get _set_downloadHandler() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "set_downloadHandler", 1, ["UnityEngine.Networking.DownloadHandler"], "void", ["pointer", "pointer"])
        }

        // public CertificateHandler get_certificateHandler()
        @cache
        static get _get_certificateHandler() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "get_certificateHandler", 0, [], "pointer", ["pointer"])
        }

        // private UnityWebRequestError SetTimeoutMsec(Int32 timeout)
        @cache
        static get _SetTimeoutMsec() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "SetTimeoutMsec", 1, ["System.Int32"], "pointer", ["pointer", "pointer"])
        }

        // public Void set_timeout(Int32 value)
        @cache
        static get _set_timeout() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "set_timeout", 1, ["System.Int32"], "void", ["pointer", "pointer"])
        }

        // public static UnityWebRequest Get(String uri)
        @cache
        static get _Get() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "Get", 1, ["System.String"], "pointer", ["pointer"])
        }

        // public static UnityWebRequest Post(String uri,WWWForm formData)
        @cache
        static get _Post() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "Post", 2, ["System.String", "UnityEngine.WWWForm"], "pointer", ["pointer", "pointer"])
        }

        // private static Void SetupPost(UnityWebRequest request,WWWForm formData)
        @cache
        static get _SetupPost() {
                return Il2Cpp.Api.o("UnityEngine.UnityWebRequestModule", "UnityEngine.Networking.UnityWebRequest", "SetupPost", 2, ["UnityEngine.Networking.UnityWebRequest", "UnityEngine.WWWForm"], "void", ["pointer", "pointer"])
        }
}

Il2Cpp.Api.UnityWebRequest = UnityEngine_Networking_UnityWebRequest_API

declare global {
        namespace Il2Cpp.Api {
                class UnityWebRequest extends UnityEngine_Networking_UnityWebRequest_API { }
        }
}

export { }