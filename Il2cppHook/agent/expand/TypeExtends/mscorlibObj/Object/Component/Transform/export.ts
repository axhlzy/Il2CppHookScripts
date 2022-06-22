const showTransform = (transform: NativePointer) => {
    if (typeof transform == "number") transform = ptr(transform)
    LOGO(`${getLine(15)} Transform ${getLine(15)}`)
    let trsIns = new Il2Cpp.Transform(transform)
    LOGD(`childCount\t--->\t${trsIns.get_childCount()}\t(${trsIns.get_name()})`)


}

/**
 * 打印transform往下的层级
 * ps:不建议打印底层的层级，展现一大篇出来毫无重点
 * @param {Number} mPtr Transform Pointer
 * @param {Number} level 最大显示层级
 * @param {Boolean} inCall 内部调用，去掉LOG的相关判断
 */
const PrintHierarchy = (mPtr: NativePointer, level: number, inCall: boolean = false) => {

    if (typeof mPtr == "number") mPtr = ptr(mPtr)
    if (mPtr.isNull()) return
    let trsIns = new Il2Cpp.Transform(mPtr)
    LOGD(getTypeName(mPtr))

    // if (getType(ptr(mPtr), 2)[0] == "GameObject") mPtr = f_getTransform(ptr(mPtr))

    // if (level == undefined) level = 2
    // let transform = ptr(mPtr)

    // if (level == 10) LOG(getLine(75) + "\n", LogColor.C33)
    // // 当前level作为第一级
    // let baseLevel = getLevel(transform)
    // LOG((inCall != undefined ? "\t" : "") + getLine(0, "\t") + transform + " : " + getObjName(transform), LogColor.C36)
    // getChild(transform)

    // if (level == 10) LOG("\n" + getLine(75), LogColor.C33)

    // // 递归调用下层信息
    // function getChild(p1) {
    //     let childCount = f_getChildCount(p1)
    //     for (let i = 0; i < childCount; i++) {
    //         let c_transform = f_getChild(p1, i)
    //         let levelC = getLevel(c_transform) - baseLevel
    //         // 这里可能出现 -1 -2 的情况，打出来一大片和当前transform无关的transform
    //         if (levelC > 0 && levelC <= level)
    //             LOG((inCall != undefined ? "\t" : "") +
    //                 getLine(levelC, "\t") +
    //                 c_transform + " : " +
    //                 readU16(f_getName(c_transform)), LogColor.C36)
    //         getChild(c_transform)
    //     }
    // }

    // // 判断当前transform的层级
    // function getLevel(transform) {
    //     for (let i = 0; i < 10; i++) {
    //         try {
    //             transform = f_getParent(transform)
    //             if (transform == 0) return i
    //         } catch (e) {
    //             return 0
    //         }
    //     }
    //     return 0
    // }
}



globalThis.showTransform = showTransform

declare global {
    var showTransform: (transform: NativePointer) => void;
}

export { } 