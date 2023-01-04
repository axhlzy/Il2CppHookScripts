import { FakeCommonType } from "../../../../../../../base/valueResolve"

const HookMonoBehavior = (): void => {
    A(Il2Cpp.Api.MonoBehaviour._ctor,(args) => {
        LOGD(`[*] Init -> ${args[0]} ${FakeCommonType(new Il2Cpp.Object(args[0]).class.type,args[0])}`)
    })
}

const HookCoroutine = (): void => {
    // StartCoroutine_Auto(IEnumerator) : Coroutine
    A(Il2Cpp.Api.MonoBehaviour._StartCoroutine_Auto,(args, _ctx: CpuContext, passValue: Map<string,any>) => {
        passValue.set("instance",args[0])
        passValue.set("IEnumerator",args[1])
    },(routine, _ctx: CpuContext, passValue: Map<string,any>) => {
        let instance = passValue.get("instance")
        let arg1 = passValue.get("IEnumerator")
        let info= `[*] StartCoroutine_Auto( ins='${instance}'(${new Il2Cpp.Object(instance).toString()}) , IEnumerator='${arg1} (${new Il2Cpp.Object(arg1).toString()})' )`
        LOGD(`${info}`)
        try {
            LOGZ(`\tIEnumerator = ${arg1} | ${lfss(arg1)}`)
            LOGZ(`\tCoroutine   = ${new Il2Cpp.Coroutine(routine).toFieldsString()}`)
        } catch {}
    })

    // StartCoroutine(IEnumerator) : Coroutine
    A(Il2Cpp.Api.MonoBehaviour._StartCoroutine_IEnumerator,(args, _ctx: CpuContext, passValue: Map<string,any>) => {
        passValue.set("instance",args[0])
        passValue.set("IEnumerator",args[1])
    },(routine, _ctx: CpuContext, passValue: Map<string,any>) => {
        let instance = passValue.get("instance")
        let arg1 = passValue.get("IEnumerator")
        let info= `[*] StartCoroutine_IEnumerator( ins='${instance}'(${new Il2Cpp.Object(instance).toString()}) , IEnumerator='${arg1} (${new Il2Cpp.Object(arg1).toString()})' )`
        LOGD(`${info}`)
        try {
            LOGZ(`\tIEnumerator = ${arg1} | ${lfss(arg1)}`)
            LOGZ(`\tCoroutine   = ${new Il2Cpp.Coroutine(routine).toFieldsString()}`)
        } catch {}
    })

    // StartCoroutine(String) : Coroutine
    A(Il2Cpp.Api.MonoBehaviour._StartCoroutine_String,(args, _ctx: CpuContext, passValue: Map<string,any>) => {
        passValue.set("instance",args[0])
        passValue.set("methodName",args[1])
    },(routine, _ctx: CpuContext, passValue: Map<string,any>) => {
        let instance = passValue.get("instance")
        let arg1 = passValue.get("string")
        let info= `[*] StartCoroutine_String( ins='${instance}' (${new Il2Cpp.Object(instance).toString()}) , methodName='${readU16(arg1)}' )`
        LOGD(`${info}`)
        LOGZ(`\tmethodName  = ${readU16(arg1)}}`)
        try {
            LOGZ(`\tCoroutine   = ${new Il2Cpp.Coroutine(routine).toFieldsString()}`)
        } catch {}
    })

    // StartCoroutine(String, Object) : Coroutine
    A(Il2Cpp.Api.MonoBehaviour._StartCoroutine_String,(args, _ctx: CpuContext, passValue: Map<string,any>) => {
        passValue.set("instance",args[0])
        passValue.set("methodName",args[1])
        passValue.set("Object",args[2])
    },(routine, _ctx: CpuContext, passValue: Map<string,any>) => {
        let instance = passValue.get("instance")
        let arg1 = passValue.get("string")
        let arg2 = passValue.get("Object")
        let info= `[*] _StartCoroutine_String( ins='${instance}' (${new Il2Cpp.Object(instance).toString()}) , methodName='${readU16(arg1)}' )`
        LOGD(`${info}`)
        LOGZ(`\tIEnumerator = ${arg1} | ${new Il2Cpp.Object(arg2).toString()}`)
        LOGZ(`\tmethodName  = ${readU16(arg1)}}`)
        try {
            LOGZ(`\tCoroutine   = ${new Il2Cpp.Coroutine(routine).toFieldsString()}`)
        } catch {}
    })

    // StopAllCoroutines() : Void
    A(Il2Cpp.Api.MonoBehaviour._StopAllCoroutines,(args) => {
        LOGE(`[*] StopAllCoroutines( ins='${args[0]}' (${new Il2Cpp.Object(args[0]).toString()}) )`)
    })
    
    // StopCoroutine(IEnumerator) : Void
    A(Il2Cpp.Api.MonoBehaviour._StopCoroutine_IEnumerator,(args) => { 
        LOGE(`[*] StopCoroutine_IEnumerator( ins='${args[0]}' (${new Il2Cpp.Object(args[0]).toString()}) , IEnumerator='${args[1]}'(${new Il2Cpp.Object(args[1]).toString()}) )`)
    })

    // StopCoroutine(String) : Void
    A(Il2Cpp.Api.MonoBehaviour._StopCoroutine_String,(args) => {
        LOGE(`[*] StopCoroutine_String( ins='${args[0]}' (${new Il2Cpp.Object(args[0]).toString()}) , methodName='${readU16(args[1])}' )`)
    })

    // StopCoroutine(Coroutine) : Void
    A(Il2Cpp.Api.MonoBehaviour._StopCoroutine_Coroutine,(args) => {
        LOGE(`[*] StopCoroutine_Coroutine( ins='${args[0]}' (${new Il2Cpp.Object(args[0]).toString()}) , Coroutine='${args[1]}'(${new Il2Cpp.Object(args[1]).toString()}) )`)
    })
}

declare global {
    var HookMonoBehavior: () => void
    var HookCoroutine: () => void
}

globalThis.HookMonoBehavior = HookMonoBehavior
globalThis.HookCoroutine = HookCoroutine