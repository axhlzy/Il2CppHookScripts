Reflect.set(globalThis, "Assembly", {})

// 是否启用动态加载
const enable_dynamic = true
// 过滤 Assembly
// const filter_assembly: string[] = []
const filter_assembly: string[] = ["Assembly"]

Il2Cpp.perform(() => {
    if (!enable_dynamic) return
    Il2Cpp.Domain.assemblies.forEach(async (assembly: Il2Cpp.Assembly) => {
        let key = repName(assembly.name)
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
    Reflect.set(classes, "handle_assembly", assembly.handle)
    Reflect.set(classes, "handle_image", assembly.image.handle)
    Reflect.set(classes, "hook", B.bind(null, assembly.image.handle))
    Reflect.set(classes, "show", c.bind(null, assembly.handle))
    assembly.image.classes.forEach((clazz: Il2Cpp.Class) => {
        let key = repName(clazz.name)
        Reflect.set(classes, key, packClass(clazz))
    })
    return classes
}

const packClass = (clazz: Il2Cpp.Class) => {
    let methods = {}
    Reflect.set(methods, "handle", clazz.handle)
    Reflect.set(methods, "hook", B.bind(null, clazz.handle))
    Reflect.set(methods, "show", m.bind(null, clazz.handle))
    Reflect.set(methods, "parents", showParentClass.bind(null, clazz.handle))
    clazz.methods.forEach((method: Il2Cpp.Method) => {
        let key = repName(method.name)
        Reflect.set(methods, key, paskMethod(method))
    })
    return methods
}

const paskMethod = (method: Il2Cpp.Method) => {
    Reflect.set(method, "handle", method.handle)
    Reflect.set(method, "show", showMethodInfo.bind(null, method.handle))
    Reflect.set(method, "hook", b.bind(null, method.handle))
    return method
}

export const showParentClass = (handle: NativePointer | Il2Cpp.Class) => {
    let clazz: Il2Cpp.Class | null = handle instanceof Il2Cpp.Class ? handle : new Il2Cpp.Class(checkCmdInput(handle))
    let display: string = ""
    while (clazz != null && !clazz.isNull()) {
        display += `${clazz.name} (${clazz.handle}) -> `
        clazz = clazz.parent
    }
    display = display.substring(0, display.length - 4)
    LOGD(`\n${display}\n`)
}

const repName = (name: string): string => name.replace(/\./g, "_").replace(/-/g, "_")

declare global {
    class Assembly { }
    var showParentClass: (handle: NativePointer | Il2Cpp.Class) => void
}

globalThis.showParentClass = showParentClass
