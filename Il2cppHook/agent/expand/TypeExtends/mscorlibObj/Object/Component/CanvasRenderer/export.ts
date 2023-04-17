import { UI_Image } from "../Behavior/MonoBehaviour/UIBehaviour/Graphic/MaskableGraphic/Image/class"
import { Text } from "../Behavior/MonoBehaviour/UIBehaviour/Graphic/MaskableGraphic/Text/class"
import { Button } from "../Behavior/MonoBehaviour/Selectable/Button/class"
import { PackArray } from "../../../../../../bridge/fix/packer/packArray"
import { UnityEngine_Rect as Rect } from "../../../ValueType/Rect/class"
import { getTextFormart as FMT } from "../../../../../../utils/logger"
import { GetGameObjectFromPtr } from "../../GameObject/export"

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
    if (mPtr == undefined) throw new Error("PrintHierarchy: mPtr is undefined")
    let local_mPtr: NativePointer = checkCmdInput(mPtr)
    if (local_mPtr.isNull()) throw new Error("PrintHierarchy: mPtr is null")
    let trsIns: Il2Cpp.Transform = GetGameObjectFromPtr(local_mPtr)!.transform
    let thisTopChildName: string = trsIns.get_name()
    let thisTopChildCount = trsIns.get_childCount()
    let levelDes = level == 2 ? `default 2 level` : `${level} level`
    LOG(FMT(`${thisTopChildName}`, LogColor.C36) + FMT(`  [ ${thisTopChildCount} childs / ${levelDes}]`, LogColor.C90))
    if (level == 10) LOGO(`${getLine(75)}\n`)
    // 当前level作为第一级
    let baseLevel = getLevel(trsIns)
    getChild(trsIns)
    if (level == 10) LOGO(`${getLine(75)}\n`)

    // 递归调用下层信息
    function getChild(trsInsLocal: Il2Cpp.Transform) {
        let count: number = trsInsLocal.get_childCount()
        if (count == 0) return
        for (let index = 0; index < count; ++index) {
            let child_transform: Il2Cpp.Transform = trsInsLocal.GetChild(index)
            let levelC: number = getLevel(child_transform) - baseLevel
            // 这里可能出现 -1 -2 的情况，打出来一大片和当前transform无关的transform
            if (levelC > 0 && levelC <= level) {
                let spaceText: string = inCall ? "" : "\t" + getLine(levelC - 1, "\t")
                let childHandle: string = child_transform.handle + " : "
                let childName: string = child_transform.get_name()
                let infoMore = needComponent ? '' : '  ' + getMoreInfo(child_transform)
                LOG(FMT(`${spaceText}${childHandle}${childName}`, LogColor.C36) + "  " + FMT(infoMore, LogColor.C90))
                if (needComponent) LOGZ(`${GetComponentsText(child_transform, childName, spaceText, levelC)}`)
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
    function getLevel(mPtr: Il2Cpp.Transform) {
        for (let level = 0; level < 10; ++level) {
            try {
                if (mPtr.handle.isNull()) return level
                mPtr = mPtr.get_parent()
            } catch (e) {
                return level
            }
        }
        return 0
    }

    function getMoreInfo(mPtr: Il2Cpp.Transform): string {
        let scripts: PackArray | undefined = listScripts(mPtr)
        let retStr: string = ''
        if (scripts && scripts.length > 0) {
            scripts.forEach((item: Il2Cpp.Object) => {
                try {
                    // LOGW(item.class.name)
                    if (item.class.name == "Text") retStr = new Text(item.handle).m_Text
                    if (item.class.name == "Button") retStr = new Button(item.handle).get_onClick().m_Calls.m_PersistentCalls.itemsToString()
                    if (item.class.name == "Image") {
                        const local_image: UI_Image = new UI_Image(item.handle)
                        const local_rect: Rect = local_image.m_RectTransform.get_rect()
                        retStr = `m_width:${local_rect.m_Width} | m_height:${local_rect.m_Height}`
                    }
                } catch { }
            })
        }
        return retStr
    }
}

/**
 * 获取/打印GameObject信息（从transform）
 * @param {NativePointer | Il2Cpp.GameObject | Il2Cpp.Transform | Il2Cpp.Component} mPtr Transform Pointer
 * @param {Boolean} inCall true：不返回pointer而是直接showGameObject
 **/
globalThis.getGameObject = (mPtr: NativePointer | Il2Cpp.GameObject | Il2Cpp.Transform | Il2Cpp.Component, inCall: boolean = false): undefined | NativePointer => {
    let localGObj: Il2Cpp.GameObject = GetGameObjectFromPtr(mPtr)!
    if (inCall) showGameObject(localGObj)
    else return localGObj.handle
}

// alias for PrintHierarchy
globalThis.p = globalThis.PrintHierarchy

globalThis.packTransform = (transform: NativePointer) => new Il2Cpp.Transform(transform)

globalThis.PrintHierarchyWithComponents = (mPtr: NativePointer, level: number) => PrintHierarchy(mPtr, level, false, true)

declare global {
    var showTransform: (transform: NativePointer) => void
    // alias for PrintHierarchy
    var p: (mPtr: NativePointer, level?: number, inCall?: boolean) => void
    var PrintHierarchy: (mPtr: NativePointer, level?: number, inCall?: boolean, needComponent?: boolean) => void
    var PrintHierarchyWithComponents: (mPtr: NativePointer, level: number) => void
    var getGameObject: (transform: NativePointer) => undefined | NativePointer
    var packTransform: (transform: NativePointer) => Il2Cpp.Transform
}

export { } 