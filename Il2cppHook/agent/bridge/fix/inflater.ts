
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
export const inflaterMethodLocal = (method_pointer: NativePointer | Il2Cpp.Method, class_pointer: NativePointer | string): Il2Cpp.Method => {
    if (class_pointer instanceof NativePointer) {
        class_pointer = ptr(checkCmdInput(class_pointer) as unknown as string)
    } else {
        class_pointer = findClass(class_pointer as string)
    }
    if (method_pointer instanceof NativePointer) {
        method_pointer = checkCmdInput(method_pointer)
    } else {
        method_pointer = method_pointer.handle
    }
    if (method_pointer.isNull() || class_pointer.isNull()) throw new Error("method_pointer or class_pointer is null")
    let method = new Il2Cpp.Method(method_pointer)
    let klass = new Il2Cpp.Class(class_pointer)
    let refMethod = method.inflate(klass)
    return refMethod
}

declare global {
    var inflaterMethod: (method_pointer: NativePointer | Il2Cpp.Method, class_pointer: NativePointer | string) => void
}

globalThis.inflaterMethod = (method_pointer: NativePointer | Il2Cpp.Method, class_pointer: NativePointer | string) => { showMethodInfo(inflaterMethodLocal(method_pointer, class_pointer)) }