import { getMethodDesFromMethodInfo as methodDEs } from "../bridge/fix/il2cppM"
import { formartClass as FM} from "../utils/formart"

// 侧重参数信息 还有一个 MethodToShow() 用在 findMethod / find_method 侧重基本信息
export const showMethodInfo = (methodInfoPtr: NativePointer): void => {
    newLine()
    if (typeof methodInfoPtr == "number") methodInfoPtr = ptr(methodInfoPtr)
    let packMethod = new Il2Cpp.Method(methodInfoPtr)
    let params = packMethod.parameters.map((param: Il2Cpp.Parameter) => {
        return (`${getLine(8, ' ')}[-]${FM.alignStr(param.name)} | type: ${param.type.handle} | @ class:${param.type.class.handle} | ${param.type.name}`)
    }).join("\n")
    LOGZ(`[-]${packMethod.class.image.assembly.name} @ ${packMethod.class.image.assembly.handle}`)
    LOGZ(`${getLine(2, ' ')}[-]${packMethod.class.image.name} @ ${packMethod.class.image.handle} | C:${packMethod.class.image.classCount}`)
    LOGZ(`${getLine(4, ' ')}[-]${packMethod.class.name} @ ${packMethod.class.handle} | M:${packMethod.class.methods.length} | F:${packMethod.class.fields.length}`)
    LOGD(`${getLine(6, ' ')}[-]${methodDEs(packMethod)} @ MI:${packMethod.handle} & MP: ${packMethod.virtualAddress} ( ${packMethod.relativeVirtualAddress} ) `)
    LOGZ(`${params}`)
    newLine()
}

export const getClassFromMethodInfo = (methodInfoPtr: NativePointer): Il2Cpp.Class => {
    if (typeof methodInfoPtr == "number") {
        if (Process.arch == "arm64" && (String(methodInfoPtr).toString().length > 15))
            throw new Error("\nNot support parameter typed number at arm64\n\n\tUse b('0x...') instead\n")
        methodInfoPtr = ptr(methodInfoPtr)
    }else if (typeof methodInfoPtr == "string") {
        if (!String(methodInfoPtr).startsWith("0x"))
            throw new Error("\nNot a Pointer\n")
        methodInfoPtr = ptr(String(methodInfoPtr))
    }
    return new Il2Cpp.Method(methodInfoPtr).class
}

declare global {
    var showMethodInfo: (methodInfo: NativePointer) => void
    var methodToClass: (methodInfo: NativePointer) => NativePointer
    var methodToClassShow: (methodInfo: NativePointer) => void
}

globalThis.showMethodInfo = showMethodInfo
globalThis.methodToClass = (methodInfo:NativePointer) => getClassFromMethodInfo(methodInfo).handle
globalThis.methodToClassShow = (methodInfo:NativePointer) => m(methodToClass(methodInfo))