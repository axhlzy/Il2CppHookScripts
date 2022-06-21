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

function showGameObject(gameObj: NativePointer) {
    if (typeof gameObj == "number") gameObj = ptr(gameObj)
    let gameObject = new Il2Cpp.GameObject(gameObj)
    LOGO("--------- GameObject ---------")
    LOGD("gameObj\t\t--->\t" + gameObj)
    LOGD("getName\t\t--->\t" + gameObject.get_name())
    LOGD("getLayer\t--->\t" + gameObject.get_layer())
    let m_transform = gameObject.get_transform()
    LOGD("getTransform\t--->\t" + m_transform.handle)
    let layerNames = ""
    for (var i = 0; i < 10; i++) {
        let getName = m_transform.get_name()
        let spl = layerNames == "" ? "" : " <--- "
        layerNames = layerNames + spl + getName
        m_transform = m_transform.get_parent()
        if (m_transform.handle == ptr(0)) break
    }
    LOGD("hierarchy\t--->\t" + layerNames)
}

globalThis.HookSetActive = HookSetActive
globalThis.showGameObject = showGameObject

declare global {
    var HookSetActive: (defaltActive: number) => void;
    var showGameObject: (gameObj: NativePointer) => void;
}

export { showGameObject }