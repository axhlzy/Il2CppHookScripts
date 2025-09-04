import { TYPE_STR } from "../base/enum"

const allocStrInner = (str: string, type: TYPE_STR = TYPE_STR.C_STR): NativePointer => {
    if (type == TYPE_STR.U_STR && Process.findModuleByName("libil2cpp.so") == null){
        throw new Error("[!] allocUStr: libil2cpp.so not found")
    }
    if (type == TYPE_STR.OC_STR && (Process.platform != "darwin" || typeof str != "string")) {
        throw new Error("[!] allocOCStr: input type must be string")
    }
    switch (type) {
        case TYPE_STR.C_STR: return Memory.allocUtf8String(str)
        case TYPE_STR.U_STR: return Il2Cpp.Api._stringNew(Memory.allocUtf8String(str))
        case TYPE_STR.OC_STR: return ObjC.classes["NSString"]["+ stringWithUTF8String:"](allocCStr(str))
    }
}

const allocCStr = (str: string): NativePointer => allocStrInner(str, TYPE_STR.C_STR)

const allocUStr = (str: string): NativePointer => allocStrInner(str, TYPE_STR.U_STR)

const allocOCStr = (str: string): NativePointer => allocStrInner(str, TYPE_STR.OC_STR)

const allocP = (size: number = Process.pointerSize): NativePointer => Memory.alloc(size)

const alloc = (size: number = 1): NativePointer => allocP(size * p_size)

/**
 * 创建一个vector2/vector3/vector4
 * 也可使用u3d自己的函数创建
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} z 
 * @param {Number} w 
 */
function allocVector(_x: number = 0, _y: number = 0, _z: number = 0, _w?: number): NativePointer {
    let argsLength = arguments.length
    argsLength = argsLength == 0 ? 3 : argsLength
    let temp_vector = alloc(argsLength + 1)
    for (let index = 0; index < argsLength; ++index)
        temp_vector.add(Process.pointerSize * index).writeFloat(arguments[index] == undefined ? 0 : arguments[index])
    temp_vector.add(Process.pointerSize * argsLength).writeInt(0)
    return temp_vector
}

export { alloc, allocP, allocCStr, allocUStr, allocOCStr, allocVector }

declare global {
    var allocCStr: (str: string) => NativePointer
    var allocUStr: (str: string) => NativePointer
    var allocOCStr: (str: string) => NativePointer
    var allocVector: (x?: number, y?: number, z?: number, w?: number) => NativePointer
    // 分配 size 个字节大小
    var alloc: (size?: number) => NativePointer
    // 分配 size 个指针大小
    var allocP: (size?: number) => NativePointer
}

globalThis.allocCStr = allocCStr
globalThis.allocUStr = allocUStr
globalThis.allocOCStr = allocOCStr
globalThis.allocVector = allocVector

globalThis.alloc = alloc
globalThis.allocP = allocP