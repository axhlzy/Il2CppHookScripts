import { checkCmdInput } from "../../utils/checkP"

/**
 * 参数值的修改
 * @param mPtr 指定函数地址
 * @param retValue 修改的新值
 * @param index 修改第 ${index} 个,默认 -1 ： 修改返回值
 */
export let setFunctionValue = (mPtr: NativePointer, retValue: NativePointer = ptr(0), index: number = -1) => {
    let srcPtr = mPtr
    retValue = checkCmdInput(retValue)
    Interceptor.attach(checkPointer(checkCmdInput(mPtr)), {
        onEnter: function (args) {
            if (index != -1) {
                args[index] = retValue
                LOGW(`setFunctionValue: Modify index: ${index} value: ${retValue}`)
            }
        },
        onLeave: (retval) => {
            if (index == -1) {
                LOGW(`setFunctionValue | ${ptr(srcPtr as unknown as number)} | ret => { ${retval} -> ${retValue} } `)
                retval.replace(retValue)
            }
        }
    })
}

/**
 * 修改函数返回值 true / false
 * @param mPtr 指定函数地址
 * @param retval 指定函数返回值
 */
export const setFunctionBool = (mPtr: NativePointer, retval: boolean = false) => setFunctionValue(mPtr, ptr(retval ? 1 : 0))

declare global {
    var setFunctionBool: (mPtr: NativePointer, retval: boolean) => void
    var setFunctionValue: (mPtr: NativePointer, retval: NativePointer) => void
}

globalThis.setFunctionBool = setFunctionBool
globalThis.setFunctionValue = setFunctionValue