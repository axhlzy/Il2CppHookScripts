import { mscorlib_System_Object_impl } from "../class"

const getTypeInner = (mPtr: NativePointer): mscorlib.Type => {
    if (typeof mPtr == "number") mPtr = ptr(mPtr)
    return new mscorlib_System_Object_impl(mPtr).getType()
}

const getTypeNameInner = (mPtr: NativePointer): string => {
    return getTypeInner(mPtr).name;
}

export { getTypeNameInner as getTypeName }

const showTypeModuleByIns = (mPtr: NativePointer): void => {
    mPtr = checkCmdInput(mPtr)
    const RuntimeType: mscorlib.RuntimeType = getType(mPtr).caseToRuntimeType
    lfs(RuntimeType.get_Module().handle, findClass("Module"))
}

const showTypeModuleByType = (mPtr: NativePointer): void => {
    mPtr = checkCmdInput(mPtr)
    const RuntimeType: mscorlib.RuntimeType = new mscorlib.Type(mPtr).caseToRuntimeType
    LOGJSON(RuntimeType.get_Module())
}

const getTypeParentList = (mPtr: NativePointer, needRetArr: boolean = false): Array<mscorlib.Type> | undefined => {
    const MAX_PARENT_INDEX = 20
    let retArr: Array<mscorlib.Type> = []
    let current: mscorlib.Type = getType(mPtr).caseToRuntimeType
    for (let i = 0; i < MAX_PARENT_INDEX; ++i) {
        let type: mscorlib.Type = getBaseType(current, i)
        if (type.handle.isNull()) break
        retArr.push(type)
    }
    if (needRetArr) return retArr
    newLine()
    LOGD(retArr.map((type: mscorlib.Type) => `${type.name}(${type.handle})`).join(` <--- `))
    newLine()

    function getBaseType(current: mscorlib.Type, parentIndex: number = 0): mscorlib.Type {
        if (mPtr == undefined || mPtr == null) throw new Error("current mPtr can't be null")
        for (let i = 0; i < parentIndex; ++i) current = current.caseToRuntimeType.get_BaseType()
        return current
    }
}

export function checkExtends(local_mPtr: NativePointer, typeName: string = "Component"): boolean {
    return getTypeParent(local_mPtr).map((type: mscorlib.Type) => type.name).some((name: string) => name == typeName)
}

declare global {
    var getType: (mPtr: NativePointer) => mscorlib.Type
    var getTypeName: (mPtr: NativePointer) => string
    var getTypeParent: (mPtr: NativePointer) => Array<mscorlib.Type>
    // 展示父级type信息
    var showTypeParent: (mPtr: NativePointer) => void
    // 展示type成员变量module信息
    var showTypeModuleByType: (mPtr: NativePointer) => void
    var showTypeModuleByIns: (mPtr: NativePointer) => void
}

globalThis.getType = getTypeInner
globalThis.getTypeName = getTypeNameInner
globalThis.showTypeParent = (mPtr: NativePointer) => getTypeParentList(mPtr, false)
globalThis.getTypeParent = (mPtr: NativePointer): Array<mscorlib.Type> => getTypeParentList(mPtr, true)!
globalThis.showTypeModuleByType = showTypeModuleByType
globalThis.showTypeModuleByIns = showTypeModuleByIns