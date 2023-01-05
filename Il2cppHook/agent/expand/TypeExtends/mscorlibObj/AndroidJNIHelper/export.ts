import { formartClass } from "../../../../utils/formart"

let MethodIDs: Map<string, [NativePointer, string, string, boolean]> = new Map()
let FieldIDs: Map<string, [NativePointer, string, string, boolean]> = new Map()

setTimeout(() => {
    Il2Cpp.perform(() => {
        let address = Module.findBaseAddress("libil2cpp.so")
        if (!address) return
        setBaseAddress(address)
        recordMethodID()
        recordFieldID()
    })
}, 1000)

// UnityEngine.AndroidJNIHelper | public static IntPtr GetFieldID(IntPtr javaClass,String fieldName,String signature,Boolean isStatic)
const recordMethodID = () => {
    if (Il2Cpp.Api.AndroidJNIHelper._GetMethodID_javaClass_methodName_signature_isStatic == undefined) return
    A(Il2Cpp.Api.AndroidJNIHelper._GetMethodID_javaClass_methodName_signature_isStatic, (args, _ctx, passValue) => {
        passValue.set('value', [args[0], readU16(args[1]), readU16(args[2]), args[3]])
    }, (ret, _ctx, passValue) => {
        MethodIDs.set(ret.toString(), passValue.get('value'))
    })
}

// UnityEngine.AndroidJNIHelper | public static IntPtr GetFieldID(IntPtr javaClass,String fieldName,String signature,Boolean isStatic)
const recordFieldID = () => {
    if (Il2Cpp.Api.AndroidJNIHelper._GetFieldID_javaClass_fieldName_signature_isStatic == undefined) return
    A(Il2Cpp.Api.AndroidJNIHelper._GetFieldID_javaClass_fieldName_signature_isStatic, (args, _ctx, passValue) => {
        passValue.set('value', [args[0], readU16(args[1]), readU16(args[2]), args[3]])
    }, (ret, _ctx, passValue) => {
        FieldIDs.set(ret.toString(), passValue.get('value'))
    })
}

export const listAndroidMethodID = () => {
    if (MethodIDs.size == 0) return
    LOGD(`[+] listAndroidMethodID ( count:${MethodIDs.size} ) ↓ `)
    for (let [id, [clazz, name, signature, isStatic]] of MethodIDs) {
        LOGD(`\t[-] ${formartClass.alignStr(id, 14)} ->   ${clazz} ${isStatic} ${name} ${signature}`)
    }
}

export const listAndroidFieldID = () => {
    if (FieldIDs.size == 0) return
    LOGD(`[+] listAndroidFieldID ( count:${FieldIDs.size} ) ↓ `)
    for (let [id, [clazz, name, signature, isStatic]] of FieldIDs) {
        LOGD(`\t[-] ${formartClass.alignStr(id, 14)} ->   ${clazz} ${isStatic} ${name} ${signature}`)
    }
}

export const getAndroidMethodNameFromHandle = (handle: NativePointer) => {
    for (let [id, [_clazz, name, _signature, _isStatic]] of MethodIDs) {
        if (id == handle.toString()) return name
    }
    return "Unknown"
}

export const getAndroidFieldNameFromHandle = (handle: NativePointer) => {
    for (let [id, [_clazz, name, _signature, _isStatic]] of FieldIDs) {
        if (id == handle.toString()) return name
    }
    return "Unknown"
}

declare global {
    var listAndroidMethodID: () => void
    var listAndroidFieldID: () => void
}

globalThis.listAndroidMethodID = listAndroidMethodID
globalThis.listAndroidFieldID = listAndroidFieldID