// public enum Result
// {
//     [Token(Token="0x4000041")]
//     ConnectionError = 2,
//     [Token(Token="0x4000043")]
//     DataProcessingError = 4,
//     [Token(Token="0x400003F")]
//     InProgress = 0,
//     [Token(Token="0x4000042")]
//     ProtocolError = 3,
//     [Token(Token="0x4000040")]
//     Success = 1
// }

export enum UnityEngine_Networking_UnityWebRequest_Result {
    InProgress = 0,
    Success = 1,
    ConnectionError = 2,
    ProtocolError = 3,
    DataProcessingError = 4,
}
 
// internal enum UnityWebRequestMethod
// {
//     [Token(Token="0x400001F")]
//     Custom = 4,
//     [Token(Token="0x400001B")]
//     Get = 0,
//     [Token(Token="0x400001E")]
//     Head = 3,
//     [Token(Token="0x400001C")]
//     Post = 1,
//     [Token(Token="0x400001D")]
//     Put = 2
// }

export enum UnityEngine_Networking_UnityWebRequest_UnityWebRequestMethod {
    Get = 0,
    Post = 1,
    Put = 2,
    Head = 3,
    Custom = 4,
}

// internal enum UnityWebRequestError
// {
//     [Token(Token="0x4000031")]
//     Aborted = 0x10,
//     [Token(Token="0x4000029")]
//     AccessDenied = 8,
//     [Token(Token="0x4000028")]
//     CannotConnectToHost = 7,
//     [Token(Token="0x4000027")]
//     CannotResolveHost = 6,
//     [Token(Token="0x4000026")]
//     CannotResolveProxy = 5,
//     [Token(Token="0x4000036")]
//     FailedToReceiveData = 0x15,
//     [Token(Token="0x4000035")]
//     FailedToSendData = 20,
//     [Token(Token="0x400002A")]
//     GenericHttpError = 9,
//     [Token(Token="0x400002F")]
//     HTTPPostError = 14,
//     [Token(Token="0x400003B")]
//     LoginFailed = 0x1a,
//     [Token(Token="0x4000025")]
//     MalformattedUrl = 4,
//     [Token(Token="0x400003D")]
//     NoInternetConnection = 0x1c,
//     [Token(Token="0x4000021")]
//     OK = 0,
//     [Token(Token="0x400002D")]
//     OutOfMemory = 12,
//     [Token(Token="0x400002C")]
//     ReadError = 11,
//     [Token(Token="0x4000033")]
//     ReceivedNoData = 0x12,
//     [Token(Token="0x4000023")]
//     SDKError = 2,
//     [Token(Token="0x4000039")]
//     SSLCACertError = 0x18,
//     [Token(Token="0x4000030")]
//     SSLCannotConnect = 15,
//     [Token(Token="0x4000037")]
//     SSLCertificateError = 0x16,
//     [Token(Token="0x4000038")]
//     SSLCipherNotAvailable = 0x17,
//     [Token(Token="0x4000034")]
//     SSLNotSupported = 0x13,
//     [Token(Token="0x400003C")]
//     SSLShutdownFailed = 0x1b,
//     [Token(Token="0x400002E")]
//     Timeout = 13,
//     [Token(Token="0x4000032")]
//     TooManyRedirects = 0x11,
//     [Token(Token="0x4000022")]
//     Unknown = 1,
//     [Token(Token="0x400003A")]
//     UnrecognizedContentEncoding = 0x19,
//     [Token(Token="0x4000024")]
//     UnsupportedProtocol = 3,
//     [Token(Token="0x400002B")]
//     WriteError = 10
// }

export enum UnityEngine_Networking_UnityWebRequest_UnityWebRequestError {
    OK = 0,
    Unknown = 1,
    SDKError = 2,
    MalformattedUrl = 4,
    CannotResolveProxy = 5,
    CannotResolveHost = 6,
    CannotConnectToHost = 7,
    AccessDenied = 8,
    GenericHttpError = 9,
    WriteError = 10,
    ReadError = 11,
    OutOfMemory = 12,
    Timeout = 13,
    HTTPPostError = 14,
    SSLCannotConnect = 15,
    FailedToSendData = 0x10,
    Aborted = 0x10,
    FailedToReceiveData = 0x15,
    SSLCertificateError = 0x16,
    SSLCipherNotAvailable = 0x17,
    SSLCACertError = 0x18,
    UnrecognizedContentEncoding = 0x19,
    LoginFailed = 0x1a,
    SSLShutdownFailed = 0x1b,
    NoInternetConnection = 0x1c,
    TooManyRedirects = 0x11,
    ReceivedNoData = 0x12,
    SSLNotSupported = 0x13,
}