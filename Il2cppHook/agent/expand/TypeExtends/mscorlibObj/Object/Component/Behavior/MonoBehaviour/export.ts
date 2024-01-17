import { getMethodDesFromMethodInfo } from "../../../../../../../bridge/fix/il2cppM"
import { FakeCommonType } from "../../../../../../../base/valueResolve"
import { filterDuplicateOBJ } from "../../../../../../../utils/common"

const HookMonoBehavior = (): void => {
    A(Il2Cpp.Api.MonoBehaviour._ctor, (args) => {
        LOGD(`[*] Init -> ${args[0]} ${FakeCommonType(new Il2Cpp.Object(args[0]).class.type, args[0])}`)
    })
}

// instance  |  routine  |  iEnumerator
// Array -> { Il2Cpp.Object , UnityEngine.Coroutine , System.Collections.IEnumerator }
var cachingCoroutine: Array<[Il2Cpp.Object, Il2Cpp.Coroutine, Il2Cpp.Object]> = []

// cachingCoroutine 去重
function insertCachingCoroutine(coroutine: [Il2Cpp.Object, Il2Cpp.Coroutine, Il2Cpp.Object]) {
    let [instance, routine, iEnumerator] = coroutine
    let index = cachingCoroutine.findIndex((coroutine: [Il2Cpp.Object, Il2Cpp.Coroutine, Il2Cpp.Object]) => {
        let [_instance, _routine, _iEnumerator] = coroutine
        return _instance.toString() == instance.toString()
            && _routine.toString() == routine.toString()
            && _iEnumerator.toString() == iEnumerator.toString()
    })
    if (index == -1) cachingCoroutine.push(coroutine)
}

const HookCoroutine = (): void => {
    // StartCoroutine_Auto(IEnumerator) : Coroutine
    A(Il2Cpp.Api.MonoBehaviour._StartCoroutine_Auto, (args, _ctx: CpuContext, passValue: Map<string, any>) => {
        passValue.set("instance", args[0])
        passValue.set("IEnumerator", args[1])
    }, (routine, _ctx: CpuContext, passValue: Map<string, any>) => {
        let instance = passValue.get("instance")
        let iEnumerator = passValue.get("IEnumerator")
        insertCachingCoroutine([new Il2Cpp.Object(instance), new Il2Cpp.Coroutine(routine), new Il2Cpp.Object(iEnumerator)])
        let info = `[*] StartCoroutine_Auto( ins='${instance}'(${new Il2Cpp.Object(instance).toString()}) , IEnumerator='${iEnumerator} (${new Il2Cpp.Object(iEnumerator).toString()})' )`
        LOGD(`${info}`)
        try {
            LOGZ(`\tIEnumerator = ${iEnumerator} | ${lfss(iEnumerator)}`)
            LOGZ(`\tCoroutine   = ${new Il2Cpp.Coroutine(routine).toFieldsString()}`)
        } catch { }
    })

    // StartCoroutine(IEnumerator) : Coroutine
    A(Il2Cpp.Api.MonoBehaviour._StartCoroutine_IEnumerator, (args, _ctx: CpuContext, passValue: Map<string, any>) => {
        passValue.set("instance", args[0])
        passValue.set("IEnumerator", args[1])
    }, (routine, _ctx: CpuContext, passValue: Map<string, any>) => {
        let instance = passValue.get("instance")
        let iEnumerator = passValue.get("IEnumerator")
        insertCachingCoroutine([new Il2Cpp.Object(instance), new Il2Cpp.Coroutine(routine), new Il2Cpp.Object(iEnumerator)])
        let info = `[*] StartCoroutine_IEnumerator( ins='${instance}'(${new Il2Cpp.Object(instance).toString()}) , IEnumerator='${iEnumerator} (${new Il2Cpp.Object(iEnumerator).toString()})' )`
        LOGD(`${info}`)
        try {
            LOGZ(`\tIEnumerator = ${iEnumerator} | ${lfss(iEnumerator)}`)
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

const listCoroutine = (): void => {
    if (cachingCoroutine.length == 0) throw new Error("caching Coroutine is empty")
    LOGD(`[*] listCoroutine:`)
    let runningCoroutines: Array<[Il2Cpp.Object, Il2Cpp.Coroutine, Il2Cpp.Object]> = []
    let stopedCoroutines: Array<[Il2Cpp.Object, Il2Cpp.Coroutine, Il2Cpp.Object]> = []
    cachingCoroutine.forEach((coroutine: [Il2Cpp.Object, Il2Cpp.Coroutine, Il2Cpp.Object]) => {
        let [_instance, _routine, _iEnumerator] = coroutine
        if (_routine.handle.readPointer().readPointer().isNull()) {
            stopedCoroutines.push(coroutine)
        } else {
            runningCoroutines.push(coroutine)
        }
    })
    let index_runningCoroutines: number = 0
    runningCoroutines.forEach((coroutine: [Il2Cpp.Object, Il2Cpp.Coroutine, Il2Cpp.Object]) => {
        let [instance, routine, iEnumerator] = coroutine
        LOGD(`\t[${++index_runningCoroutines}]instance=${instance}(${new Il2Cpp.Object(instance).toString()})`)
        LOGD(`\t\troutine=${routine.toString()}`)
        LOGD(`\t\tiEnumerator=${iEnumerator.toString()}`)
    })
    newLine()
    let index_stopedCoroutines: number = 0
    stopedCoroutines.forEach((coroutine: [Il2Cpp.Object, Il2Cpp.Coroutine, Il2Cpp.Object]) => {
        let [instance, routine, iEnumerator] = coroutine
        LOGZ(`\t[${++index_stopedCoroutines}]instance=${instance}(${new Il2Cpp.Object(instance).toString()})`)
        LOGZ(`\t\troutine=${routine.toString()} @ ${routine.handle}`)
        LOGZ(`\t\tiEnumerator=${iEnumerator.toString()} @ ${iEnumerator.handle}`)
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
                    else LOGD(`[${++index}] ${method.handle} ${getMethodDesFromMethodInfo(method)} -> instance:${instance} gobj:${getGameObject(instance)} (${new Il2Cpp.Object(instance).toString()})`)
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

// [-]UnityEngine.CoreModule @ 0x7a1572b268
//   [-]UnityEngine.CoreModule.dll @ 0x7a158801f8 | C:556
//   [-]Sprite @ 0x79eb7a4b00 | M:32 | F:0 | N:UnityEngine
//     [-]public Texture2D get_texture() @ MI: 0x7904122fa0 & MP: 0x7a2042accc & RP: 0xb20ccc
//       [-]_RET_               | type: 0x7a21744c78 | @ class:0x790a972600 | UnityEngine.Texture2D
globalThis.HookSprite = () => {
    Il2Cpp.perform(() => {
        let class_Sprite = Il2Cpp.Domain.assembly("UnityEngine.CoreModule").image.class("UnityEngine.Sprite")
        let method_get_texture = class_Sprite.method("get_texture", 0)
        Interceptor.attach(method_get_texture.virtualAddress, {
            onEnter(args) {
                let instance = args[0]
                this.Obj = instance

            }, onLeave(retval) {
                let instance = this.Obj
                LOGD(`[*] ${method_get_texture.toString()} -> instance:${instance}\n\t texture:${new Il2Cpp.Object(retval)}`)
            }
        })
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

    let onceCallFlag: boolean = true
    Il2Cpp.perform(() => {
        // [-]UnityEngine.UI @ 0x7b0ce26528
        //   [-]UnityEngine.UI.dll @ 0x7b4dbcb438 | C:202
        //   [-]Graphic @ 0x7b618ede00 | M:61 | F:23 | N:UnityEngine.UI
        //     [-]protected virtual Void UpdateGeometry() @ MI: 0x7a14cce740 & MP: 0x7b6d83cda8 & RP: 0x213cda8
        const class_Graphic = Il2Cpp.Domain.assembly("UnityEngine.UI").image.class("UnityEngine.UI.Graphic")
        const method_UpdateGeometry = class_Graphic.method("UpdateGeometry", 0)
        const src_function = new NativeFunction(method_UpdateGeometry.virtualAddress, "void", ["pointer"])
        Interceptor.replace(method_UpdateGeometry.virtualAddress, new NativeCallback((instance: NativePointer) => {
            if (onceCallFlag) {
                findAndHook("Start", callback)
                onceCallFlag = false
            }
            return src_function(instance)
        }, "void", ["pointer"]))

    })
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
    var listCoroutine: () => void
    var cancelWatchCoroutine: () => void
    var watchCoroutine: () => void
    var HookSprite: () => void
    var HookMonoStart: (callback?: (instancePtr: NativePointer, ctx: CpuContext) => void) => void
    var HookMonoAwake: (callback?: (instancePtr: NativePointer, ctx: CpuContext) => void) => void
}

globalThis.HookMonoBehavior = HookMonoBehavior
globalThis.listCoroutine = listCoroutine
globalThis.watchCoroutine = w.bind(null, listCoroutine)
globalThis.HookCoroutine = HookCoroutine
globalThis.HookMonoStart = HookMonoStart
globalThis.HookMonoAwake = HookMonoAwake
globalThis.HookSprite = HookSprite