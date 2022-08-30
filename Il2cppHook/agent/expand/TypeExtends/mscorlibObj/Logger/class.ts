import { mscorlib_System_Object_impl as System_Object } from "../class"
import { System_Exception_Impl as System_Exception } from "../Exception/class"
import { UnityEngine_Object } from "../Object/class"

type UnityEngine_ILogHandler = NativePointer

class UnityEngine_Logger_Impl extends System_Object {

    //     <logHandler>k__BackingField: UnityEngine_ILogHandler = lfv(this.handle, "<logHandler>k__BackingField") as unknown as UnityEngine_ILogHandler
    // < logEnabled > k__BackingField: boolean = lfv(this.handle, "<logEnabled>k__BackingField") as unknown as boolean
    //     < filterLogType > k__BackingField: UnityEngine_LogType = lfv(this.handle, "<filterLogType>k__BackingField") as unknown as UnityEngine_LogType


    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    _ctor(logHandler: UnityEngine_ILogHandler): void {
        return Il2Cpp.Api.Logger.__ctor(this.handle, logHandler)
    }

    get_logHandler(): UnityEngine_ILogHandler {
        return Il2Cpp.Api.Logger._get_logHandler(this.handle)
    }

    set_logHandler(value: UnityEngine_ILogHandler): void {
        return Il2Cpp.Api.Logger._set_logHandler(this.handle, value)
    }

    get_logEnabled(): boolean {
        return Il2Cpp.Api.Logger._get_logEnabled(this.handle)
    }

    set_logEnabled(value: boolean): void {
        return Il2Cpp.Api.Logger._set_logEnabled(this.handle, value)
    }

    get_filterLogType(): UnityEngine_LogType {
        return Il2Cpp.Api.Logger._get_filterLogType(this.handle)
    }

    set_filterLogType(value: UnityEngine_LogType): void {
        return Il2Cpp.Api.Logger._set_filterLogType(this.handle, value)
    }

    IsLogTypeAllowed(logType: UnityEngine_LogType): boolean {
        return Il2Cpp.Api.Logger._IsLogTypeAllowed(this.handle, logType)
    }

    static GetString(message: System_Object): string {
        return readU16(Il2Cpp.Api.Logger._GetString(message))
    }

    Log(logType: UnityEngine_LogType, message: System_Object): void {
        return Il2Cpp.Api.Logger._Log(this.handle, logType, message)
    }

    Log_3(logType: UnityEngine_LogType, message: System_Object, context: UnityEngine_Object): void {
        return Il2Cpp.Api.Logger._Log(this.handle, logType, message, context)
    }

    LogFormat(logType: UnityEngine_LogType, format: string, args: System_Object[]): void {
        return Il2Cpp.Api.Logger._LogFormat(this.handle, logType, format, args)
    }

    LogFormat_4(logType: UnityEngine_LogType, context: UnityEngine_Object, format: string, args: System_Object[]): void {
        return Il2Cpp.Api.Logger._LogFormat(this.handle, logType, context, format, args)
    }

    LogException(exception: System_Exception, context: UnityEngine_Object): void {
        return Il2Cpp.Api.Logger._LogException(this.handle, exception, context)
    }

}

Il2Cpp.Logger = UnityEngine_Logger_Impl

declare global {
    namespace Il2Cpp {
        class Logger extends UnityEngine_Logger_Impl { }
    }
}

export { UnityEngine_Logger_Impl }