import { PackArray } from "../../../../../../bridge/fix/packer/packArray"
import { GameObjectImpl as GameObject } from "../../GameObject/class"
import { UnityEngine_Transform_Impl as Transform } from "./class"
import { checkExtends } from "../../../ValueType/exports"

globalThis.showTransform = (transform: NativePointer) => {
    if (typeof transform == "number") transform = ptr(transform)
    LOGO(`${getLine(15)} Transform ${getLine(15)}`)
    let trsIns = new Il2Cpp.Transform(transform)
    LOGD(`childCount\t--->\t${trsIns.get_childCount()}\t(${trsIns.get_name()})`)
    PrintHierarchy(transform, 1, true)
    LOGD("get_position\t(" + trsIns.get_position().toString() + ")")
    // todo
}

/**
 * 打印transform往下的层级
 * ps:不建议打印底层的层级，展现一大篇出来毫无重点
 * @param {Number} mPtr Transform Pointer
 * @param {Number} level 最大显示层级
 * @param {Boolean} inCall 内部调用，去掉LOG的相关判断
 */
globalThis.PrintHierarchy = (mPtr: NativePointer, level: number = 2, inCall: boolean = false, needComponent: boolean = false) => {
    let local_mPtr: NativePointer = checkCmdInput(mPtr)
    if (local_mPtr.isNull()) return
    let trsIns: Il2Cpp.Transform
    let typeName: string = getTypeName(local_mPtr)
    if (typeName == "GameObject") {
        local_mPtr = new Il2Cpp.GameObject(local_mPtr).get_transform().handle
        trsIns = new Il2Cpp.Transform(local_mPtr)
    } else if (checkExtends(local_mPtr, "Transform")) {
        trsIns = new Il2Cpp.Transform(local_mPtr)
    } else {
        throw new Error("PrintHierarchy: mPtr must be Transform or GameObject")
    }

    if (level == 10) LOGO(`${getLine(75)}\n`)
    // 当前level作为第一级
    let baseLevel = getLevel(trsIns)
    getChild(trsIns)
    if (level == 10) LOGO(`${getLine(75)}\n`)

    // 递归调用下层信息
    function getChild(trsInsLocal: Il2Cpp.Transform) {
        let count = trsInsLocal.get_childCount()
        if (count == 0) return
        for (let index = 0; index < count; ++index) {
            let child_transform = trsInsLocal.GetChild(index)
            let levelC = getLevel(child_transform) - baseLevel
            // 这里可能出现 -1 -2 的情况，打出来一大片和当前transform无关的transform
            if (levelC > 0 && levelC <= level) {
                let spaceText: string = inCall ? "" : "\t" + getLine(levelC - 1, "\t")
                let childHandle: string = child_transform.handle + " : "
                let childName: string = child_transform.get_name()
                LOGD(`${spaceText}${childHandle}${childName}`)
                if (needComponent)
                    LOGZ(`${GetComponentsText(child_transform, childName, spaceText, levelC)}`)
            }
            getChild(child_transform)
        }
    }

    function GetComponentsText(trsInsLocal: Il2Cpp.Transform, filterName: string, spaceText: string, _level: number) {
        let scripts: PackArray | undefined = listScripts(trsInsLocal)
        let retStrings: Array<string> = new Array<string>()
        if (scripts && scripts.length > 0) {
            scripts.forEach((script: Il2Cpp.Object) => {
                let str: string = ''
                try {
                    str = script.toString()
                } catch (error) {
                    // LOGE(error)
                }
                if (str.includes(filterName)) {
                    try {
                        retStrings.push(`${spaceText}    ${script.handle} -> ${str}`)
                    } catch {
                        retStrings.push(`${spaceText}    ${script.handle} -> (→_→) ErrorToCase`)
                    }
                }
            })
        }
        return retStrings.join(`\n`)
    }

    // 判断当前transform的层级
    function getLevel(trsInsLocal: Il2Cpp.Transform) {
        for (let level = 0; level < 10; ++level) {
            try {
                if (trsInsLocal.handle.isNull()) return level
                trsInsLocal = trsInsLocal.get_parent()
            } catch (e) {
                return level
            }
        }
        return 0
    }
}

/**
 * 获取/打印GameObject信息（从transform）
 * @param {Number} transform Transform Pointer
 * @param {Boolean} inCall true：不返回pointer而是直接showGameObject
 **/
globalThis.getGameObject = (transform: NativePointer, inCall: boolean = false): undefined | NativePointer => {
    transform = checkCmdInput(transform)
    if (inCall) {
        showGameObject(transform)
    } else {
        return new Transform(transform).get_gameObject().handle
    }
}

globalThis.getGameObjectPack = (mPtr: NativePointer): GameObject => {
    return new GameObject(getGameObject(mPtr) as NativePointer)
}

// alias for PrintHierarchy
globalThis.p = globalThis.PrintHierarchy

globalThis.PrintHierarchyWithComponents = (mPtr: NativePointer, level: number) => PrintHierarchy(mPtr, level, false, true)

declare global {
    var showTransform: (transform: NativePointer) => void
    // alias for PrintHierarchy
    var p: (mPtr: NativePointer, level?: number, inCall?: boolean) => void
    var PrintHierarchy: (mPtr: NativePointer, level?: number, inCall?: boolean, needComponent?: boolean) => void
    var PrintHierarchyWithComponents: (mPtr: NativePointer, level: number) => void
    var getGameObject: (transform: NativePointer) => undefined | NativePointer
    var getGameObjectPack: (mPtr: NativePointer) => GameObject
}

export { } 