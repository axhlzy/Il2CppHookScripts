import { mscorlib_System_Object_impl } from "../class"
import { UnityEngine_Object } from "./class"

export { getObjName, getObjClass }

globalThis.getObjName = (mPtr: NativePointer): string => {
    try {
        if (mPtr instanceof NativePointer && !mPtr.isNull()) {
            return new mscorlib_System_Object_impl(mPtr).toString()
        } else if (typeof mPtr == "number" && mPtr != 0) {
            return new mscorlib_System_Object_impl(ptr(mPtr)).toString()
        }
    } catch (error) {
        return ''
    }
    return ''
}

globalThis.getObjClass = (mPtr: NativePointer): NativePointer => {
    if (typeof mPtr == "number") mPtr = ptr(mPtr)
    let obj = new UnityEngine_Object(mPtr)
    return obj.class.handle
}

globalThis.HookInstantiate = () => {

    let index: number = 0
    const stack: boolean = true

    // public static Object Instantiate(Object original)
    if (Il2Cpp.Api.il2cppObj._Instantiate_1 == undefined) {
        LOGE("NOT FOUND UnityEngine.CoreModule.UnityEngine.Object => public static Object Instantiate(Object original)")
    } else {
        A(Il2Cpp.Api.il2cppObj._Instantiate_1, (args: NativePointer[], _ctx: CpuContext, passValue: Map<string, any>) => {
            let msg = (`[${++index}] Instantiate(Object original=${new Il2Cpp.Object(args[0])} @ ${args[0]})`)
            passValue.set("InstantiateMsg", msg)
        }, (ret: InvocationReturnValue, ctx: CpuContext, passValue: Map<string, any>) => {
            LOGD(`${passValue.get("InstantiateMsg")} | ret = ${new Il2Cpp.Object(ret).toString()} @ ${ret}`)
            if (stack) PrintStackTraceNative(ctx, true)
        })
    }

    // public static Object Instantiate(Object original, Vector3 position, Quaternion rotation)
    if (Il2Cpp.Api.il2cppObj._Instantiate_3 == undefined) {
        LOGE("NOT FOUND UnityEngine.CoreModule.UnityEngine.Object => public static Object Instantiate(Object original, Vector3 position, Quaternion rotation)")
    } else {
        A(Il2Cpp.Api.il2cppObj._Instantiate_3, (args: NativePointer[], _ctx: CpuContext, passValue: Map<string, any>) => {
            let msg = (`[${++index}] Instantiate(Object original=${new Il2Cpp.Object(args[0])} @ ${args[0]}, Vector3 position=${args[1]}, Quaternion rotation=${args[2]})`)
            passValue.set("InstantiateMsg", msg)
        }, (ret: InvocationReturnValue, ctx: CpuContext, passValue: Map<string, any>) => {
            LOGD(`${passValue.get("InstantiateMsg")} | ret = ${new Il2Cpp.Object(ret).toString()} @ ${ret}`)
            if (stack) PrintStackTraceNative(ctx, true)
        })
    }

    // public static Object Instantiate(Object original, Transform parent, Boolean instantiateInWorldSpace)
    if (Il2Cpp.Api.il2cppObj._Instantiate_3_1 == undefined) {
        LOGE("NOT FOUND UnityEngine.CoreModule.UnityEngine.Object => public static Object Instantiate(Object original, Transform parent, Boolean instantiateInWorldSpace)")
    } else {
        A(Il2Cpp.Api.il2cppObj._Instantiate_3_1, (args: NativePointer[], _ctx: CpuContext, passValue: Map<string, any>) => {
            let msg = (`[${++index}] Instantiate(Object original=${new Il2Cpp.Object(args[0])} @ ${args[0]}, Transform parent=${args[1]}, Boolean instantiateInWorldSpace=${args[2]})`)
            passValue.set("InstantiateMsg", msg)
        }, (ret: InvocationReturnValue, ctx: CpuContext, passValue: Map<string, any>) => {
            LOGD(`${passValue.get("InstantiateMsg")} | ret = ${new Il2Cpp.Object(ret).toString()} @ ${ret}`)
            if (stack) PrintStackTraceNative(ctx, true)
        })
    }

    // public static Object Instantiate(Object original, Vector3 position, Quaternion rotation, Transform parent)
    if (Il2Cpp.Api.il2cppObj._Instantiate_4 == undefined) {
        LOGE("NOT FOUND UnityEngine.CoreModule.UnityEngine.Object => public static Object Instantiate(Object original, Vector3 position, Quaternion rotation, Transform parent)")
    } else {
        A(Il2Cpp.Api.il2cppObj._Instantiate_4, (args: NativePointer[], _ctx: CpuContext, passValue: Map<string, any>) => {
            let msg = (`[${++index}] Instantiate(Object original=${new Il2Cpp.Object(args[0])} @ ${args[0]}, Vector3 position=$${args[1]}, Quaternion rotation=${args[2]}, Transform parent=${args[3]})`)
            passValue.set("InstantiateMsg", msg)
        }, (ret: InvocationReturnValue, ctx: CpuContext, passValue: Map<string, any>) => {
            LOGD(`${passValue.get("InstantiateMsg")} | ret = ${new Il2Cpp.Object(ret).toString()} @ ${ret}`)
            if (stack) PrintStackTraceNative(ctx, true)
        })
    }
}

declare global {
    var getObjName: (mPtr: NativePointer) => string
    var getObjClass: (mPtr: NativePointer) => NativePointer
    var HookInstantiate: () => void
}