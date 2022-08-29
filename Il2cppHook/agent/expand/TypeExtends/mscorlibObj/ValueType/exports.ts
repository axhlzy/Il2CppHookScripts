import { mscorlib_System_Object_impl } from "../class"

const getTypeInner = (mPtr: NativePointer): mscorlib.Type => {
    if (typeof mPtr == "number") mPtr = ptr(mPtr)
    return new mscorlib_System_Object_impl(mPtr).getType()
}

const getTypeNameInner = (mPtr: NativePointer): string => {
    return getTypeInner(mPtr).name;
}

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

const getTypeParent = (mPtr: NativePointer, needRetArr: boolean = false): void | Array<mscorlib.Type> => {
    const MAX_PARENT_INDEX = 20
    let retArr: Array<mscorlib.Type> = []
    let current: mscorlib.Type = getType(mPtr).caseToRuntimeType
    for (let i = 0; i < MAX_PARENT_INDEX; ++i) {
        let type: mscorlib.Type = getBaseType(current, i)
        if (type.handle.isNull()) break
        retArr.push(type)
        // LOGE(JSON.stringify(type))
    }
    if (needRetArr) return retArr
    newLine()
    LOGD(retArr.map((type: mscorlib.Type) => `${type.name}(${type.handle})`).join(" <--- "))
    newLine()
    function getBaseType(current: mscorlib.Type, parentIndex: number = 0): mscorlib.Type {
        if (mPtr == undefined || mPtr == null) throw new Error("current mPtr can't be null")
        for (let i = 0; i < parentIndex; ++i) current = current.caseToRuntimeType.get_BaseType()
        return current
    }
}

export { getTypeNameInner as getTypeName }

declare global {
    var getType: (mPtr: NativePointer) => mscorlib.Type
    var getTypeName: (mPtr: NativePointer) => string
    var getTypeParent: (mPtr: NativePointer) => Array<mscorlib.Type> | void
    // 展示父级type信息
    var showTypeParent: (mPtr: NativePointer) => void
    // 展示type成员变量module信息
    var showTypeModuleByType: (mPtr: NativePointer) => void
    var showTypeModuleByIns: (mPtr: NativePointer) => void
}

globalThis.getType = getTypeInner
globalThis.getTypeName = getTypeNameInner
globalThis.showTypeParent = getTypeParent
globalThis.getTypeParent = (mPtr: NativePointer) => getTypeParent(mPtr, true)
globalThis.showTypeModuleByType = showTypeModuleByType
globalThis.showTypeModuleByIns = showTypeModuleByIns