import { getMethodDesFromMethodInfo } from "../../../../../../../bridge/fix/il2cppM"
import { FakeCommonType } from "../../../../../../../base/valueResolve"
import { filterDuplicateOBJ } from "../../../../../../../utils/common"

const HookMonoBehavior = (): void => {
    A(Il2Cpp.Api.MonoBehaviour._ctor, (args) => {
        LOGD(`[*] Init -> ${args[0]} ${FakeCommonType(new Il2Cpp.Object(args[0]).class.type, args[0])}`)
    })
}

const HookCoroutine = (): void => {
    // StartCoroutine_Auto(IEnumerator) : Coroutine
    A(Il2Cpp.Api.MonoBehaviour._StartCoroutine_Auto, (args, _ctx: CpuContext, passValue: Map<string, any>) => {
        passValue.set("instance", args[0])
        passValue.set("IEnumerator", args[1])
    }, (routine, _ctx: CpuContext, passValue: Map<string, any>) => {
        let instance = passValue.get("instance")
        let arg1 = passValue.get("IEnumerator")
        let info = `[*] StartCoroutine_Auto( ins='${instance}'(${new Il2Cpp.Object(instance).toString()}) , IEnumerator='${arg1} (${new Il2Cpp.Object(arg1).toString()})' )`
        LOGD(`${info}`)
        try {
            LOGZ(`\tIEnumerator = ${arg1} | ${lfss(arg1)}`)
            LOGZ(`\tCoroutine   = ${new Il2Cpp.Coroutine(routine).toFieldsString()}`)
        } catch { }
    })

    // StartCoroutine(IEnumerator) : Coroutine
    A(Il2Cpp.Api.MonoBehaviour._StartCoroutine_IEnumerator, (args, _ctx: CpuContext, passValue: Map<string, any>) => {
        passValue.set("instance", args[0])
        passValue.set("IEnumerator", args[1])
    }, (routine, _ctx: CpuContext, passValue: Map<string, any>) => {
        let instance = passValue.get("instance")
        let arg1 = passValue.get("IEnumerator")
        let info = `[*] StartCoroutine_IEnumerator( ins='${instance}'(${new Il2Cpp.Object(instance).toString()}) , IEnumerator='${arg1} (${new Il2Cpp.Object(arg1).toString()})' )`
        LOGD(`${info}`)
        try {
            LOGZ(`\tIEnumerator = ${arg1} | ${lfss(arg1)}`)
            LOGZ(`\tCoroutine   = ${new Il2Cpp.Coroutine(routine).toFieldsString()}`)
        } catch { }
    })

    // StartCoroutine(String) : Coroutine
    A(Il2Cpp.Api.MonoBehaviour._StartCoroutine_String, (args, _ctx: CpuContext, passValue: Map<string, any>) => {
        passValue.set("instance", args[0])
        passValue.set("methodName", args[1])
    }, (routine, _ctx: CpuContext, passValue: Map<string, any>) => {
        let instance = passValue.get("instance")
        let arg1 = passValue.get("string")
        let info = `[*] StartCoroutine_String( ins='${instance}' (${new Il2Cpp.Object(instance).toString()}) , methodName='${readU16(arg1)}' )`
        LOGD(`${info}`)
        LOGZ(`\tmethodName  = ${readU16(arg1)}}`)
        try {
            LOGZ(`\tCoroutine   = ${new Il2Cpp.Coroutine(routine).toFieldsString()}`)
        } catch { }
    })

    // StartCoroutine(String, Object) : Coroutine
    A(Il2Cpp.Api.MonoBehaviour._StartCoroutine_String, (args, _ctx: CpuContext, passValue: Map<string, any>) => {
        passValue.set("instance", args[0])
        passValue.set("methodName", args[1])
        passValue.set("Object", args[2])
    }, (routine, _ctx: CpuContext, passValue: Map<string, any>) => {
        let instance = passValue.get("instance")
        let arg1 = passValue.get("string")
        let arg2 = passValue.get("Object")
        let info = `[*] _StartCoroutine_String( ins='${instance}' (${new Il2Cpp.Object(instance).toString()}) , methodName='${readU16(arg1)}' )`
        LOGD(`${info}`)
        LOGZ(`\tIEnumerator = ${arg1} | ${new Il2Cpp.Object(arg2).toString()}`)
        LOGZ(`\tmethodName  = ${readU16(arg1)}}`)
        try {
            LOGZ(`\tCoroutine   = ${new Il2Cpp.Coroutine(routine).toFieldsString()}`)
        } catch { }
    })

    // StopAllCoroutines() : Void
    A(Il2Cpp.Api.MonoBehaviour._StopAllCoroutines, (args) => {
        LOGE(`[*] StopAllCoroutines( ins='${args[0]}' (${new Il2Cpp.Object(args[0]).toString()}) )`)
    })

    // StopCoroutine(IEnumerator) : Void
    A(Il2Cpp.Api.MonoBehaviour._StopCoroutine_IEnumerator, (args) => {
        LOGE(`[*] StopCoroutine_IEnumerator( ins='${args[0]}' (${new Il2Cpp.Object(args[0]).toString()}) , IEnumerator='${args[1]}'(${new Il2Cpp.Object(args[1]).toString()}) )`)
    })

    // StopCoroutine(String) : Void
    A(Il2Cpp.Api.MonoBehaviour._StopCoroutine_String, (args) => {
        LOGE(`[*] StopCoroutine_String( ins='${args[0]}' (${new Il2Cpp.Object(args[0]).toString()}) , methodName='${readU16(args[1])}' )`)
    })

    // StopCoroutine(Coroutine) : Void
    A(Il2Cpp.Api.MonoBehaviour._StopCoroutine_Coroutine, (args) => {
        LOGE(`[*] StopCoroutine_Coroutine( ins='${args[0]}' (${new Il2Cpp.Object(args[0]).toString()}) , Coroutine='${args[1]}'(${new Il2Cpp.Object(args[1]).toString()}) )`)
    })
}

const findAndHook = (methodName: string, callback?: (instancePtr: NativePointer, ctx: CpuContext) => void) => {
    let methods: Array<Il2Cpp.Method> = findMethods(methodName, true, undefined, true, true) as Array<Il2Cpp.Method>
    let index: number = 0
    methods.forEach((method: Il2Cpp.Method) => {
        let currentName: string = `${method.handle} -> ${method.class.name}::${getMethodDesFromMethodInfo(method)}`
        LOGD(`[*] HookMono: ${currentName}`)
        try {
            A(method.virtualAddress, (args: NativePointer[], ctx: CpuContext) => {
                if (filterDuplicateOBJ(currentName, maxCallTimes) == -1) return
                let instance = args[0]
                try {
                    // do not check type so try catch
                    if (false && !getTypeParent(instance).map((type: mscorlib.Type) => type.toString()).includes("MonoBehaviour")) d(method.virtualAddress)
                    else LOGD(`[${++index}] ${getMethodDesFromMethodInfo(method)} -> instance:${instance} gobj:${getGameObject(instance)} (${new Il2Cpp.Object(instance).toString()})`)
                    if (callback != undefined) callback(instance, ctx)
                } catch (e) {
                    LOGE(`[*] HookMono: ${method.handle} -> ${method.class.name}::${getMethodDesFromMethodInfo(method)} -> ${e}`)
                }
            })
        } catch (e) {
            LOGE(`[*] HookMono: ${method.handle} -> ${method.class.name}::${getMethodDesFromMethodInfo(method)} -> ${e}`)
        }
    })
}

/**
 * Hook MonoBehaviour.Start() -> parse GameObject
 * 
 * usage: 
 * HookMonoStart((ins)=>{showGameObject(ins)})
 * HookMonoStart((ins,ctx)=>{PrintStackTraceNative(ctx)})
 * ...
 */
const HookMonoStart = (callback?: (instancePtr: NativePointer, ctx: CpuContext) => void): void => {
    findAndHook("Start", callback)
    // if (allMethodsCacheArray.length == 0) cacheMethods(false)
    // allMethodsCacheArray
    //     .filter((method: Il2Cpp.Method) => !method.handle.equals(0) && !method.virtualAddress.equals(0) && method.name == 'start')
    //     .filter((method: Il2Cpp.Method) => {
    //         LOGD(`[*] HookMonoStart: ${method.handle} -> ${method.class.name}::${getMethodDesFromMethodInfo(method)}`)
    //         A(method.virtualAddress, (args: NativePointer[], _ctx: CpuContext) => {
    //             let instance = args[0]
    //             if (!getTypeParent(instance).map((type: mscorlib.Type) => type.toString()).includes("MonoBehaviour")) d(method.virtualAddress)
    //             else LOGD(`[*] ${method.toString()} -> instance:${instance} gobj:${getGameObject(instance)} (${new Il2Cpp.Object(instance).toString()})`)
    //         })
    //     })
}

const HookMonoAwake = (callback?: (instancePtr: NativePointer, ctx: CpuContext) => void): void => findAndHook("Awake", callback)

declare global {
    var HookMonoBehavior: () => void
    var HookCoroutine: () => void
    var HookMonoStart: (callback?: (instancePtr: NativePointer, ctx: CpuContext) => void) => void
    var HookMonoAwake: (callback?: (instancePtr: NativePointer, ctx: CpuContext) => void) => void
}

globalThis.HookMonoBehavior = HookMonoBehavior
globalThis.HookCoroutine = HookCoroutine
globalThis.HookMonoStart = HookMonoStart
globalThis.HookMonoAwake = HookMonoAwake