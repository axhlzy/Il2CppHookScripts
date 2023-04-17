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

export function checkExtends(mPtr: NativePointer | Il2Cpp.Object, typeName: string = "Component"): boolean {
    if (mPtr instanceof Il2Cpp.Object) mPtr = mPtr.handle
    return getTypeParent(mPtr).map((type: mscorlib.Type) => type.name).some((name: string) => name == typeName)
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