const showMethodInfo = (methodInfo: NativePointer): void => {
    if (typeof methodInfo == "number") methodInfo = ptr(methodInfo)
    let packMethod = new Il2Cpp.Method(methodInfo)
    let Il2CppClass = packMethod.class.handle
    let Il2CppImage = packMethod.class.image.handle
    let Il2CppAssembly = packMethod.class.image.assembly.handle

    LOG("\nCurrent Function " + packMethod.name + "\t" + packMethod.parameterCount + "\t0x" + Number(methodInfo).toString(16) + " ---> "
        + packMethod.virtualAddress + " ---> " + packMethod.relativeVirtualAddress + "\n", LogColor.C96)
    LOG(packMethod.name + " ---> " + packMethod.class.name + "(" + Il2CppClass + ") ---> " + (packMethod.class.namespace.length == 0 ? " - " : packMethod.class.namespace)
        + " ---> " + packMethod.class.image.name + "(" + Il2CppImage + ") ---> Il2CppAssembly(" + Il2CppAssembly + ")", LogColor.C96)
}


declare global {
    var showMethodInfo: (methodInfo: NativePointer) => void
}

globalThis.showMethodInfo = showMethodInfo

export { showMethodInfo }