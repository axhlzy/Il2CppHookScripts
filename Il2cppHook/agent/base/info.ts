import { getMethodDesFromMethodInfo as methodDes } from "../bridge/fix/il2cppM"
import { inflaterMethodLocal } from "../bridge/fix/inflater"
import { showMethodInfoFromAddress } from "../java/info"
import { formartClass as FM } from "../utils/formart"

// 侧重参数信息 还有一个 MethodToShow() 用在 findMethod / find_method 侧重基本信息
export function showMethodInfo(mPtr: NativePointer | Il2Cpp.Method): void {
    let packMethod: Il2Cpp.Method
    if (typeof mPtr == "number") {
        if (Process.arch == "arm64" && (String(mPtr).toString().length > 15))
            throw new Error("\nNot support parameter typed number at arm64\n\n\tUse showMethodInfo('0x...') instead\n")
        mPtr = ptr(mPtr)
    } else if (typeof mPtr == "string") {
        if (String(mPtr).startsWith("0x")) {
            mPtr = ptr(mPtr)
        } else {
            throw new Error("\nNot a Pointer\n")
        }
    } else if (mPtr instanceof Il2Cpp.Method) {
        mPtr = mPtr.handle
    }
    packMethod = new Il2Cpp.Method(mPtr)
    try {
        // 借助这个错误来调用 showMethodInfoFromAddress
        packMethod.class.name
        newLine()
    } catch (e) {
        showMethodInfoFromAddress(mPtr)
        return
    }
    let AppendRelativeVirtualAddress = packMethod.virtualAddress.isNull() ? '' : `& RP: ${packMethod.relativeVirtualAddress}`
    let params: string = packMethod.parameters.map((param: Il2Cpp.Parameter) => {
        return (`${getLine(8, ' ')}[-]${FM.alignStr(param.name)} | type: ${param.type.handle} | @ class:${param.type.class.handle} | ${param.type.name}`)
    }).join("\n")
    if (packMethod.returnType.name != "System.Void")
        params += `${packMethod.parameterCount == 0 ? '' : '\n'}${getLine(8, ' ')}[-]${FM.alignStr(`_RET_`)} | type: ${packMethod.returnType.handle} | @ class:${packMethod.returnType.class.handle} | ${packMethod.returnType.name}`
    /** like this ↓
        [-]Assembly-CSharp @ 0x7c00f74bf0
        [-]Assembly-CSharp.dll @ 0x7b6bb29850 | C:1001
            [-]RewardedAdsManager @ 0x7a007245c0 | M:21 | F:8 | N:ZeroX.AdsSystem
            [-]public WaitToken<ZeroX.AdsSystem.ShowRewardedResult> Show(String where,String reason) @ MI:0x7aec6b6e10 & MP: 0x7ae4358a44 & RP: 0x756a44
                [-]where               | type: 0x7ae57f9720 | @ class:0x7b0a454e00 | System.String
                [-]reason              | type: 0x7ae57f9720 | @ class:0x7b0a454e00 | System.String
                [-]_RET_               | type: 0x7ae56e5b00 | @ class:0x7940de4050 | WaitToken<ZeroX.AdsSystem.ShowRewardedResult>
     */
    LOGZ(`[-]${packMethod.class.image.assembly.name} @ ${packMethod.class.image.assembly.handle}`)
    LOGZ(`${getLine(2, ' ')}[-]${packMethod.class.image.name} @ ${packMethod.class.image.handle} | C:${packMethod.class.image.classCount}`)
    LOGZ(`${getLine(4, ' ')}[-]${packMethod.class.name} @ ${packMethod.class.handle} | M:${packMethod.class.methods.length} | F:${packMethod.class.fields.length} ${packMethod.class.namespace.length > 0 ? `| N:${packMethod.class.namespace}` : ''}`)
    LOGD(`${getLine(6, ' ')}[-]${methodDes(packMethod)} @ MI: ${packMethod.handle} & MP: ${packMethod.virtualAddress} ${AppendRelativeVirtualAddress}`)
    LOGZ(`${params}`)
    newLine()

    if (packMethod.virtualAddress.isNull()) {
        let localMethod: Il2Cpp.Method = inflaterMethodLocal(packMethod, "Object") as Il2Cpp.Method
        let info = `${methodDes(localMethod)} @ MI:${localMethod.handle} & MP: ${localMethod.virtualAddress} & RP: ${localMethod.relativeVirtualAddress}`
        LOGZ(`Inflate Object ↓\n${info}\n`)
    }
}

export const getClassFromMethodInfo = (methodInfoPtr: NativePointer): Il2Cpp.Class => {
    if (typeof methodInfoPtr == "number") {
        if (Process.arch == "arm64" && (String(methodInfoPtr).toString().length > 15))
            throw new Error("\nNot support parameter typed number at arm64\n\n\tUse b('0x...') instead\n")
        methodInfoPtr = ptr(methodInfoPtr)
    } else if (typeof methodInfoPtr == "string") {
        if (!String(methodInfoPtr).startsWith("0x"))
            throw new Error("\nNot a Pointer\n")
        methodInfoPtr = ptr(String(methodInfoPtr))
    }
    return new Il2Cpp.Method(methodInfoPtr).class
}

declare global {
    var showMethodInfo: (methodInfo: NativePointer | Il2Cpp.Method) => void
    var methodToClass: (methodInfo: NativePointer) => NativePointer
    var methodToClassShow: (methodInfo: NativePointer) => void
}

globalThis.showMethodInfo = showMethodInfo
globalThis.methodToClass = (methodInfo: NativePointer) => getClassFromMethodInfo(methodInfo).handle
globalThis.methodToClassShow = (methodInfo: NativePointer) => m(methodToClass(methodInfo))