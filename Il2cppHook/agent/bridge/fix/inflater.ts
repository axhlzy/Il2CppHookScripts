
/**
 * @example
 * 
 *      [Pixel 4::XXX ]-> inflaterMethod(0xa386d3d4,"Component")
        [-]UnityEngine.CoreModule @ 0xa38837a0
        [-]UnityEngine.CoreModule.dll @ 0xee908c24 | C:560
            [-]GameObject @ 0xe9792c10 | M:46 | F:0 | N:UnityEngine
            [-]public Component[] GetComponents() @ MI:0x91366538 & MP: 0xa63fc8fc & RP: 0x5fb8fc
                [-]_RET_       | type: 0x91366568 | @ class:0x91366588 | System.ComponentModel.Component[]

 * @param method_pointer MethodPointer 指针或者 Il2cpp.Method
 * @param class_pointer ClassPtr 或者 类名
 * @returns void 或者 Il2cpp.Method
 */
export const inflaterMethodLocal = (method_pointer: NativePointer | Il2Cpp.Method | string, class_pointer: NativePointer | string): Il2Cpp.Method => {
    let localClassPtr: NativePointer = ptr(0)
    if (class_pointer instanceof NativePointer) {
        localClassPtr = ptr(checkCmdInput(class_pointer) as unknown as string)
    } else if (typeof method_pointer == "string") {
        localClassPtr = findClass(class_pointer as string)
    } else
        throw new Error("Not support class_pointer type")
    let localMethodPtr: NativePointer = ptr(0)
    if (method_pointer instanceof NativePointer) {
        localMethodPtr = checkCmdInput(method_pointer)
    } else if (typeof method_pointer == "string") {
        localMethodPtr = ptr(method_pointer)
    } else if (method_pointer instanceof Il2Cpp.Method) {
        localMethodPtr = method_pointer.handle
    } else {
        localMethodPtr = ptr(method_pointer)
    }
    if (localMethodPtr.isNull() || localClassPtr.isNull()) throw new Error("method_pointer or class_pointer is null")
    let method = new Il2Cpp.Method(localMethodPtr)
    let klass = new Il2Cpp.Class(localClassPtr)
    let refMethod = method.inflate(klass)
    return refMethod
}

declare global {
    var inflaterMethod: (method_pointer: NativePointer | Il2Cpp.Method | string, class_pointer: NativePointer | string) => void
}

globalThis.inflaterMethod = (method_pointer: NativePointer | Il2Cpp.Method | string, class_pointer: NativePointer | string) => { showMethodInfo(inflaterMethodLocal(method_pointer, class_pointer)) }