
let classMap = new Map<string, Il2Cpp.AndroidJavaClass>()

// 想要使用 classMap 需要再启动时候附加，AndroidJavaClass的构造不出意外的话只走了一次
setTimeout(() => {
    Il2Cpp.perform(() => {
        let address = Module.findBaseAddress("libil2cpp.so")
        if (!address) return
        setBaseAddress(address)
        recordClasses()
    })
}, 1000)

const recordClasses = () => {
    if (Il2Cpp.Api.AndroidJavaClass.__AndroidJavaClass == undefined) return
    // UnityEngine.AndroidJavaClass | private Void _AndroidJavaClass(String className)
    A(Il2Cpp.Api.AndroidJavaClass.__AndroidJavaClass, (args, _ctx) => {
        classMap.set(readU16(args[1]), new Il2Cpp.AndroidJavaClass(args[0]))
    })
}

export const listAndroidClass = () => {
    if (classMap.size == 0) return
    LOGD(`[+] listAndroidClass ( count:${classMap.size} ) ↓ `)
    for (let [name, clazz] of classMap) {
        LOGD(`\t[-] ${clazz.handle} -> ${name}`)
    }
}

export const getAndroidClassNameFromHandle = (handle: NativePointer) => {
    for (let [name, clazz] of classMap) {
        if (clazz.handle.equals(handle)) {
            return name
        }
    }
    return "Unknown"
}

export const getAndroidClassFromName = (name: string) => classMap.get(name)

declare global {
    var listAndroidClass: () => void
}

globalThis.listAndroidClass = listAndroidClass