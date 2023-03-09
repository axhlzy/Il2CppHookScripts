import { cache } from "decorator-cache-getter"

Reflect.set(globalThis, "Assembly", {})

const enable_dynamic = false
const filter_assembly: string[] = []
// const filter_assembly:string[] = ["Assembly"]

Il2Cpp.perform(() => {
    if (!enable_dynamic) return
    Il2Cpp.Domain.assemblies.forEach(async (assembly: Il2Cpp.Assembly) => {
        let key = repName(assembly.name)
        // LOGD(key)
        Reflect.set(Assembly, key, needPack(assembly) ? packAssembly(assembly) : assembly)
    })

    function needPack(assembly: Il2Cpp.Assembly) {
        if (filter_assembly.length == 0) return true
        for (let i = 0; i < filter_assembly.length; i++)
            if (assembly.name.indexOf(filter_assembly[i]) != -1) return true
        return false
    }
})

const packAssembly = (assembly: Il2Cpp.Assembly) => {
    let classes = {}
    assembly.image.classes.forEach((clazz: Il2Cpp.Class) => {
        let key = repName(clazz.name)
        Reflect.set(classes, key, packClass(clazz))
    })
    return classes
}

const packClass = (clazz: Il2Cpp.Class) => {
    let methods = {}
    Reflect.set(methods, "hook", B.bind(null, clazz.handle))
    Reflect.set(methods, "show", m.bind(null, clazz.handle))
    clazz.methods.forEach((method: Il2Cpp.Method) => {
        let key = repName(method.name)
        Reflect.set(methods, key, paskMethod(method))
    })
    return methods
}

const paskMethod = (method: Il2Cpp.Method) => {
    Reflect.set(method, "show", showMethodInfo.bind(null, method.handle))
    Reflect.set(method, "hook", b.bind(null, method.handle))
    return method
}

const repName = (name: string): string => name.replace(/\./g, "_").replace(/-/g, "_")

declare global {
    class Assembly { }
}

export { }
