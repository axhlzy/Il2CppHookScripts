import { cache } from "decorator-cache-getter"

Reflect.set(globalThis, "Assembly", {})

const enable_dynamic = true
const filter_assembly = ["Assembly"]

Il2Cpp.perform(() => {
    if (!enable_dynamic) return
    Il2Cpp.Domain.assemblies.forEach((assembly: Il2Cpp.Assembly) => {
        let key = assembly.name.replace(/\./g, "_").replace(/-/g, "_")
        Reflect.set(Assembly, key, needPack(assembly) ? packAssembly(assembly) : assembly)
    })

    function needPack(assembly: Il2Cpp.Assembly) {
        if (filter_assembly.length == 0) return true
        for (let i = 0; i < filter_assembly.length; i++) {
            if (assembly.name.indexOf(filter_assembly[i]) != -1) return true
        }
        return false
    }
})

const packAssembly = (assembly: Il2Cpp.Assembly) => {
    let classes = {}
    assembly.image.classes.forEach((clazz: Il2Cpp.Class) => {
        let key = clazz.name.replace(/\./g, "_").replace(/-/g, "_")
        Reflect.set(classes, key, packClass(clazz))
    })
    return classes
}

const packClass = (clazz: Il2Cpp.Class) => {
    let methods = {}
    clazz.methods.forEach((method: Il2Cpp.Method) => {
        let key = method.name.replace(/\./g, "_").replace(/-/g, "_")
        Reflect.set(methods, key, paskMethod(method))
    })
    return methods
}

const paskMethod = (method: Il2Cpp.Method) => {
    Reflect.set(method, "show", showMethodInfo.bind(null, method.handle))
    Reflect.set(method, "hook", b.bind(null, method.handle))
    return method
}

declare global {
    class Assembly { }
}

export { }