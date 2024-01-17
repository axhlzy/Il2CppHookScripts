import { OnEnterType, OnExitType } from "../utils/common"

/**
 * 这部分代码主要用来实现反射提前预加载指定程序集下的所有class以及方法，以便于实现类似命令行代码提示或者说是自动补全的功能
 */

// 过滤只加载指定的程序集 {全部加载会导致启动过慢，可能把项目费时代码写成一个cmodule或者是考虑是全部移植到cpp即可解决问题}
Reflect.set(globalThis, "Assembly", {})

// 是否启用动态加载
const enable_dynamic = true
// 是否简化类名
// globalClassName { "Assembly.Assembly_CSharp.AndroidAgent" --简化为--> "AndroidAgent.SetPauseGame"}
// AndroidAgent.SetPauseGame.hook() === b(AndroidAgent.SetPauseGame) { b(MethodInfo) }
// AndroidAgent.SetPauseGame.hook((args,_ctx)=>{},(ret,_ctx)=>{}) === A(AndroidAgent.SetPauseGame.virtualAddress,(args,_ctx)=>{},(ret,_ctx)=>{})
// 这个可能导致Module冲突被覆盖，故使用不了 Module.findExportByName("libc++.so", '__cxa_demangle')
const globalClassName = false
// 过滤 Assembly
// const filter_assembly: string[] = []
const filter_assembly: string[] = ["Assembly"]

Il2Cpp.perform(() => {
    if (!enable_dynamic) return
    Il2Cpp.domain.assemblies.forEach(async (assembly: Il2Cpp.Assembly) => {
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
    clazz.methods.forEach((method: Il2Cpp.Method) => Reflect.set(methods, repName(method.name), packMethod(method)))
    if (globalClassName) Reflect.set(globalThis, repName(clazz.name), methods)
    return methods
}

const packMethod = (method: Il2Cpp.Method) => {
    Reflect.set(method, "handle", method.handle)
    Reflect.set(method, "show", showMethodInfo.bind(null, method.handle))
    Reflect.set(method, "hook", (onEnter?: (args: NativePointer) => {}, onLeave?: (ret: NativePointer) => {}) => {
        if (typeof onEnter == "function" || typeof onLeave == "function")
            A.apply(null, [method.virtualAddress, onEnter as unknown as OnEnterType, onLeave as unknown as OnExitType])
        else
            b.apply(null, [method.handle])
    })
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

// replace . and - to _
const repName = (name: string): string => name.replace(/\./g, "_").replace(/-/g, "_")

declare global {
    class Assembly { }
    var showParentClass: (handle: NativePointer | Il2Cpp.Class) => void
}

globalThis.showParentClass = showParentClass