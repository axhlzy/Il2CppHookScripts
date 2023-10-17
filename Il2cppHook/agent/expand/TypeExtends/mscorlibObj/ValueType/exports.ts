import { mscorlib_System_Object_impl } from "../class"

const getTypeInner = (mPtr: NativePointer): mscorlib.Type => new mscorlib_System_Object_impl(checkCmdInput(mPtr)).getType()

const getTypeNameInner = (mPtr: NativePointer): string => getTypeInner(mPtr).name

export { getTypeNameInner as getTypeName }

const showTypeModuleByIns = (mPtr: NativePointer): void => {
    const RuntimeType: mscorlib.RuntimeType = getType(checkCmdInput(mPtr)).caseToRuntimeType
    lfs(RuntimeType.get_Module().handle, findClass("Module"))
}

const showTypeModuleByType = (mPtr: NativePointer): void => {
    const RuntimeType: mscorlib.RuntimeType = new mscorlib.Type(checkCmdInput(mPtr)).caseToRuntimeType
    LOGJSON(RuntimeType.get_Module())
}

const CACHE_TYPE_PARENT: Map<string, Array<mscorlib.Type>> = new Map()
const getTypeParentArray = (mPtr: NativePointer, retArray: boolean = false, isClassPtr: boolean = false): Array<mscorlib.Type> | undefined => {

    const MAX_PARENT_INDEX = 20
    let retArr: Array<mscorlib.Type> = []

    // if (isClassPtr) { // 传入的如果是一个class
    //     let tempMem = alloc(4)
    //     tempMem.writePointer(mPtr)
    //     mPtr = tempMem
    // }

    let current: mscorlib.Type = getType(mPtr).caseToRuntimeType
    let typeName: string = current.name

    if (CACHE_TYPE_PARENT.has(typeName)) {
        retArr = CACHE_TYPE_PARENT.get(typeName)!
    } else {
        for (let [_key, value] of CACHE_TYPE_PARENT) {
            let index = value.findIndex((type: mscorlib.Type) => type.name == typeName)
            if (index != -1) {
                retArr = value.slice(index)
                break
            }
        }
    }
    if (retArr.length == 0) {
        for (let i = 0; i < MAX_PARENT_INDEX; ++i) {
            let type: mscorlib.Type = getBaseType(current, i)
            if (type.handle.isNull()) break
            retArr.push(type)
        }
        CACHE_TYPE_PARENT.set(typeName, retArr)
    }

    if (retArray) return retArr
    newLine()
    LOGD(retArr.map((type: mscorlib.Type) => `${type.name}(${type.handle})`).join(` <--- `))
    newLine()

    function getBaseType(current: mscorlib.Type, parentIndex: number = 0): mscorlib.Type {
        if (mPtr == undefined || mPtr == null) throw new Error("current mPtr can't be null")
        for (let i = 0; i < parentIndex; ++i) current = current.caseToRuntimeType.get_BaseType()
        return current
    }
}

export function checkExtends(mPtr: NativePointer | Il2Cpp.Object, typeName: string = "Component"): boolean {
    if (mPtr instanceof Il2Cpp.Object) mPtr = mPtr.handle
    return getTypeParent(mPtr).map((type: mscorlib.Type) => type.name).some((name: string) => name == typeName)
}

declare global {
    var getType: (mPtr: NativePointer) => mscorlib.Type
    var getTypeName: (mPtr: NativePointer) => string
    var getTypeParent: (mPtr: NativePointer, retArray?: boolean, isClassPtr?: boolean) => Array<mscorlib.Type>
    // 展示父级type信息
    var showTypeParent: (mPtr: NativePointer, retArray?: boolean) => void
    // 展示type成员变量module信息
    var showTypeModuleByType: (mPtr: NativePointer) => void
    var showTypeModuleByIns: (mPtr: NativePointer) => void
}

globalThis.getType = getTypeInner
globalThis.getTypeName = getTypeNameInner
globalThis.showTypeParent = (mPtr: NativePointer, retArray: boolean = false) => getTypeParentArray(mPtr, retArray)
globalThis.getTypeParent = (mPtr: NativePointer, retArray: boolean = true, isClassPtr: boolean = false): Array<mscorlib.Type> => getTypeParentArray(mPtr, retArray, isClassPtr)!
globalThis.showTypeModuleByType = showTypeModuleByType
globalThis.showTypeModuleByIns = showTypeModuleByIns