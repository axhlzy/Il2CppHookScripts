import { mscorlib_System_Object_impl } from "../class"
import { System_Exception_Impl } from "../Exception/class"
import { UnityEngine_Object } from "../Object/class"
import { UnityEngine_Color_Impl } from "../ValueType/Color/class"
import { UnityEngine_Vector3_Impl } from "../ValueType/Vector3/class"

type UnityEngine_ILogger = NativePointer

class UnityEngine_Debug_Impl extends mscorlib_System_Object_impl {

    s_Logger: UnityEngine_ILogger = lfv(this.handle, "s_Logger") as unknown as UnityEngine_ILogger

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    static get_unityLogger(): UnityEngine_ILogger {
        return Il2Cpp.Api.Debug._get_unityLogger()
    }

    static DrawLine(start: UnityEngine_Vector3_Impl, end: UnityEngine_Vector3_Impl, color: UnityEngine_Color_Impl, duration: number, depthTest: boolean): void {
        return Il2Cpp.Api.Debug._DrawLine(start, end, color, duration, depthTest)
    }

    static DrawRay(start: UnityEngine_Vector3_Impl, dir: UnityEngine_Vector3_Impl, color: UnityEngine_Color_Impl): void {
        return Il2Cpp.Api.Debug._DrawRay(start, dir, color)
    }

    static DrawRay_5(start: UnityEngine_Vector3_Impl, dir: UnityEngine_Vector3_Impl, color: UnityEngine_Color_Impl, duration: number, depthTest: boolean): void {
        return Il2Cpp.Api.Debug._DrawRay(start, dir, color, duration, depthTest)
    }

    static Log(message: mscorlib_System_Object_impl): void {
        return Il2Cpp.Api.Debug._Log(message)
    }

    static Log_2(message: mscorlib_System_Object_impl, context: UnityEngine_Object): void {
        return Il2Cpp.Api.Debug._Log(message, context)
    }

    static LogError(message: mscorlib_System_Object_impl): void {
        return Il2Cpp.Api.Debug._LogError(message)
    }

    static LogError_2(message: mscorlib_System_Object_impl, context: UnityEngine_Object): void {
        return Il2Cpp.Api.Debug._LogError(message, context)
    }

    static LogErrorFormat(format: string, args: mscorlib_System_Object_impl[]): void {
        return Il2Cpp.Api.Debug._LogErrorFormat(allocUStr(format), args)
    }

    static LogErrorFormat_3(context: UnityEngine_Object, format: string, args: mscorlib_System_Object_impl[]): void {
        return Il2Cpp.Api.Debug._LogErrorFormat(context, allocUStr(format), args)
    }

    static LogException(exception: System_Exception_Impl): void {
        return Il2Cpp.Api.Debug._LogException(exception)
    }

    static LogException_2(exception: System_Exception_Impl, context: UnityEngine_Object): void {
        return Il2Cpp.Api.Debug._LogException(exception, context)
    }

    static LogWarning(message: mscorlib_System_Object_impl): void {
        return Il2Cpp.Api.Debug._LogWarning(message)
    }

    static LogWarning_2(message: mscorlib_System_Object_impl, context: UnityEngine_Object): void {
        return Il2Cpp.Api.Debug._LogWarning(message, context)
    }

    static LogWarningFormat(format: string, args: mscorlib_System_Object_impl[]): void {
        return Il2Cpp.Api.Debug._LogWarningFormat(allocUStr(format), args)
    }

    static LogWarningFormat_3(context: UnityEngine_Object, format: string, args: mscorlib_System_Object_impl[]): void {
        return Il2Cpp.Api.Debug._LogWarningFormat(context, allocUStr(format), args)
    }

    static CallOverridenDebugHandler(exception: System_Exception_Impl, obj: UnityEngine_Object): boolean {
        return Il2Cpp.Api.Debug._CallOverridenDebugHandler(exception, obj)
    }

    static _cctor(): void {
        return Il2Cpp.Api.Debug.__cctor()
    }

    static DrawLine_Injected(start: UnityEngine_Vector3_Impl, end: UnityEngine_Vector3_Impl, color: UnityEngine_Color_Impl, duration: number, depthTest: boolean): void {
        return Il2Cpp.Api.Debug._DrawLine_Injected(start, end, color, duration, depthTest)
    }
}

Il2Cpp.Debug = UnityEngine_Debug_Impl

declare global {
    namespace Il2Cpp {
        class Debug extends UnityEngine_Debug_Impl { }
    }
}

export { UnityEngine_Debug_Impl }