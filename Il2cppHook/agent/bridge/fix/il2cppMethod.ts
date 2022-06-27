
enum il2cppTabledefs {
    METHOD_ATTRIBUTE_MEMBER_ACCESS_MASK = 0x0007,
    METHOD_ATTRIBUTE_COMPILER_CONTROLLED = 0x0000,
    METHOD_ATTRIBUTE_PRIVATE = 0x0001,
    METHOD_ATTRIBUTE_FAM_AND_ASSEM = 0x0002,
    METHOD_ATTRIBUTE_ASSEM = 0x0003,
    METHOD_ATTRIBUTE_FAMILY = 0x0004,
    METHOD_ATTRIBUTE_FAM_OR_ASSEM = 0x0005,
    METHOD_ATTRIBUTE_PUBLIC = 0x0006,

    METHOD_ATTRIBUTE_STATIC = 0x0010,
    METHOD_ATTRIBUTE_FINAL = 0x0020,
    METHOD_ATTRIBUTE_VIRTUAL = 0x0040,
    METHOD_ATTRIBUTE_ABSTRACT = 0x0400,
    METHOD_ATTRIBUTE_PINVOKE_IMPL = 0x2000,
    METHOD_ATTRIBUTE_VTABLE_LAYOUT_MASK = 0x0100,

    METHOD_ATTRIBUTE_REUSE_SLOT = 0x0000,
    METHOD_ATTRIBUTE_NEW_SLOT = 0x0100
}

// 解析 Method 的权限符
export const getMethodModifier = (methodPtr: NativePointer | number | Il2Cpp.Method): string => {
    if (typeof methodPtr == "number") methodPtr = ptr(methodPtr)
    let localMethod: Il2Cpp.Method
    // let flags = methodPtr.add(p_size * 8 + 4).readU16()
    if (methodPtr instanceof Il2Cpp.Method) {
        localMethod = methodPtr
    } else if (typeof methodPtr == "number") {
        localMethod = new Il2Cpp.Method(ptr(methodPtr))
    } else {
        localMethod = new Il2Cpp.Method(methodPtr)
    }
    let flags = localMethod.flags
    let access = flags & il2cppTabledefs.METHOD_ATTRIBUTE_MEMBER_ACCESS_MASK
    let ret_str = ""
    switch (access) {
        case il2cppTabledefs.METHOD_ATTRIBUTE_PRIVATE:
            ret_str += "private "
            break
        case il2cppTabledefs.METHOD_ATTRIBUTE_PUBLIC:
            ret_str += "public "
            break
        case il2cppTabledefs.METHOD_ATTRIBUTE_FAMILY:
            ret_str += "protected "
            break
        case il2cppTabledefs.METHOD_ATTRIBUTE_ASSEM:
        case il2cppTabledefs.METHOD_ATTRIBUTE_FAM_AND_ASSEM:
            ret_str += "internal "
            break
        case il2cppTabledefs.METHOD_ATTRIBUTE_FAM_OR_ASSEM:
            ret_str += "protected internal "
            break
    }

    if (flags & il2cppTabledefs.METHOD_ATTRIBUTE_STATIC) {
        ret_str += "static "
    }

    if (flags & il2cppTabledefs.METHOD_ATTRIBUTE_ABSTRACT) {
        ret_str += "abstract "
        if ((flags & il2cppTabledefs.METHOD_ATTRIBUTE_VTABLE_LAYOUT_MASK) == il2cppTabledefs.METHOD_ATTRIBUTE_REUSE_SLOT) {
            ret_str += "override "
        }
    } else if (flags & il2cppTabledefs.METHOD_ATTRIBUTE_FINAL) {
        if ((flags & il2cppTabledefs.METHOD_ATTRIBUTE_VTABLE_LAYOUT_MASK) == il2cppTabledefs.METHOD_ATTRIBUTE_REUSE_SLOT) {
            ret_str += "sealed override "
        }
    } else if (flags & il2cppTabledefs.METHOD_ATTRIBUTE_VIRTUAL) {
        if ((flags & il2cppTabledefs.METHOD_ATTRIBUTE_VTABLE_LAYOUT_MASK) == il2cppTabledefs.METHOD_ATTRIBUTE_NEW_SLOT) {
            ret_str += "virtual "
        } else {
            ret_str += "override "
        }
    }
    if (flags & il2cppTabledefs.METHOD_ATTRIBUTE_PINVOKE_IMPL) {
        ret_str += "extern "
    }
    return ret_str
}

export const getMethodDesFromMethodPtr = (methodPtr: NativePointer | number | Il2Cpp.Method, simpleType = true): string => {
    if (typeof methodPtr == "number") methodPtr = ptr(methodPtr)
    if (methodPtr == null || methodPtr.isNull()) throw new Error("getMethodDesFromMethodPtr: methodPtr can't be null")
    let localMethod: Il2Cpp.Method = methodPtr instanceof Il2Cpp.Method ? methodPtr : new Il2Cpp.Method(methodPtr)
    let ret_str = ""
    ret_str += getMethodModifier(localMethod)
    ret_str += localMethod.name
    ret_str += "(" + localMethod.parameters.map(x => `${simpleType ? (function (name) {
        let sp = name.split(".")
        return sp[sp.length - 1]
    }(x.type.name)) : x.type.name} ${x.name}`).join(",") + ")"
    return ret_str
}

// 缓存 method info to array
const map_cache_method_des = new Map<Il2Cpp.Method, Array<string | NativePointer>>()
export const methodToArray = (method: Il2Cpp.Method | NativePointer | number): Array<string | NativePointer> | undefined => {
    if (method instanceof NativePointer) {
        return getArrayFromMethod(new Il2Cpp.Method(method))
    } else if (typeof method == "number") {
        return getArrayFromMethod(new Il2Cpp.Method(ptr(method)))
    } else if (method instanceof Il2Cpp.Method) {
        return getArrayFromMethod(method)
    } else {
        throw new Error("methodToArray: method unknown type")
    }

    // [
    //     "0xbf88b6f4",
    //     "0xc81e101c",
    //     "0x99901c",
    //     "public static x0y1(Vector2 v)",
    //     "0xbf9ee3e0",
    //     "ExtensionMethods"
    // ]

    function getArrayFromMethod(method: Il2Cpp.Method): Array<string | NativePointer> {
        let cache = map_cache_method_des.get(method)
        if (cache != undefined) return cache
        let ret_arr = []
        ret_arr.push(method.handle)                     // 0
        ret_arr.push(method.virtualAddress)             // 1
        ret_arr.push(method.virtualAddress.isNull() ? ptr(0) : method.relativeVirtualAddress)     // 2
        ret_arr.push(getMethodDesFromMethodPtr(method)) // 3
        ret_arr.push(method.class.handle)               // 4
        ret_arr.push(method.class.name)                 // 5
        map_cache_method_des.set(method, ret_arr)
        return ret_arr
    }
}

//Il2Cpp.Method toString impl
export const methodToString = (method: Il2Cpp.Method, simple: boolean = false): string => {
    let arr = methodToArray(method)
    if (arr == undefined) throw new Error("methodToString: methodToArray return undefined")
    // ctor cctor
    if (simple) return `${arr[3]} ${(method.name.includes("ctor")) ? `   { class => ${arr[5]}( ${arr[4]} ) }` : ""}`
    let displayStr = `[*] `
    displayStr += `${arr[0]} ---> `
    displayStr += `${arr[1]} (${arr[2]})`
    displayStr += `${(arr[1] as NativePointer).isNull() ? `\t\t\t` : `\t`}|  `
    displayStr += `${arr[3]}`
    if (method.name.includes(".ctor")) displayStr += `   { class => ${arr[5]}( ${arr[4]} ) } `
    return displayStr
}

globalThis.methodToArray = methodToArray as any
declare global {
    var methodToArray: (method: Il2Cpp.Method | NativePointer | number) => Array<string | NativePointer>
}