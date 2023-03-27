import { GameObjectImpl as GameObject } from "../../GameObject/class"
import { UnityEngine_Transform_Impl as Transform } from "./class"

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
globalThis.PrintHierarchy = (mPtr: NativePointer, level: number = 2, inCall: boolean = false) => {

    mPtr = checkCmdInput(mPtr)
    if (mPtr.isNull()) return

    let trsIns: Il2Cpp.Transform
    if (getTypeName(mPtr) == "GameObject") mPtr = new Il2Cpp.GameObject(mPtr).get_transform().handle
    trsIns = new Il2Cpp.Transform(mPtr)
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
            if (levelC > 0 && levelC <= level)
                LOGD((inCall != undefined ? "\t" : "") +
                    getLine(levelC - 1, "\t") +
                    child_transform.handle + " : " +
                    child_transform.get_name())
            getChild(child_transform)
        }
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

globalThis.p = globalThis.PrintHierarchy

declare global {
    var showTransform: (transform: NativePointer) => void
    // alias for PrintHierarchy
    var p: (mPtr: NativePointer, level?: number, inCall?: boolean) => void
    var PrintHierarchy: (mPtr: NativePointer, level?: number, inCall?: boolean) => void
    var getGameObject: (transform: NativePointer) => undefined | NativePointer
    var getGameObjectPack: (mPtr: NativePointer) => GameObject
}

export { } 