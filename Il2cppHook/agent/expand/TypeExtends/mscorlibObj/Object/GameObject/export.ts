
const HookSetActive = (defaltActive: number = 1) => {
    A(Il2Cpp.Api.GameObject._SetActive, (args: any[], ctx: { lr: any }) => {
        let gameObject = new Il2Cpp.GameObject(args[0])
        if (filterDuplicateOBJ(gameObject.toString()) == -1) return
        if (defaltActive == 2 || args[1].toInt32() == defaltActive) {
            let strTmp = "public extern void SetActive( " + (args[1].toInt32() == 0 ? "false" : "true") + " );  LR:" + checkCtx(ctx.lr)
            LOGW("\n" + getLine(strTmp.length))
            LOGD(strTmp)
            LOGO(getLine(strTmp.length / 2))
            showGameObject(args[0])
        }
    })
}

function showGameObject(mPtr: NativePointer) {
    if (typeof mPtr == "number") mPtr = ptr(mPtr)
    let gameObject: Il2Cpp.GameObject
    if (getTypeName(mPtr) == "GameObject") {
        gameObject = new Il2Cpp.GameObject(mPtr)
    } else if (getTypeName(mPtr) == "RectTransform") {
        gameObject = new Il2Cpp.Transform(mPtr).get_gameObject()
    } else {
        throw new Error("showGameObject: mPtr is not GameObject or Transform")
    }
    LOGO("--------- GameObject ---------")
    LOGD("gameObj\t\t--->\t" + gameObject.handle)
    LOGD("getName\t\t--->\t" + gameObject.get_name())
    LOGD("getLayer\t--->\t" + gameObject.get_layer())
    let m_transform = gameObject.get_transform()
    LOGD("getTransform\t--->\t" + m_transform.handle)
    let layerNames = ""
    for (var i = 0; i < 10; i++) {
        if (m_transform.handle.isNull()) break
        let getName = m_transform.get_gameObject().get_name()
        let handle = m_transform.handle
        let spl = layerNames == "" ? "" : " <--- "
        layerNames = layerNames + spl + getName + "(" + handle + ")"
        m_transform = m_transform.get_parent()
    }
    LOGD("hierarchy\t--->\t" + layerNames)
}

globalThis.HookSetActive = HookSetActive
globalThis.showGameObject = showGameObject

declare global {
    var HookSetActive: (defaltActive: number) => void;
    var showGameObject: (gameObjOrTransform: NativePointer) => void;
}

export { showGameObject } 