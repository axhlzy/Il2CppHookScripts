export let setFunctionValue = (mPtr: NativePointer, retValue: NativePointer = ptr(0)) => {
    let srcPtr = mPtr
    if (!retValue.equals(0) && !retValue.equals(1)) retValue = checkCmdInput(retValue)
    mPtr = checkPointer(checkCmdInput(mPtr))
    Interceptor.attach(mPtr, {
        onLeave: (retval) => {
            LOGW(`setFunctionValue | ${ptr(srcPtr as unknown as number)} | ret => { ${retval} -> ${retValue} } `)
            retval.replace(retValue)
        }
    })
}

export const setFunctionBool = (mPtr: NativePointer, retval: boolean = false) => setFunctionValue(mPtr, ptr(retval ? 1 : 0))

declare global {
    var setFunctionBool: (mPtr: NativePointer, retval: boolean) => void
    var setFunctionValue: (mPtr: NativePointer, retval: NativePointer) => void
}

globalThis.setFunctionBool = setFunctionBool
globalThis.setFunctionValue = setFunctionValue