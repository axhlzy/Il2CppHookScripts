import { filterDuplicateOBJ, PassType } from "../../../../../utils/common"
import { setActiveT, setActiveTChange } from "../Component/export"

globalThis.HookSetActive = (defaltActive: number = 1) => {
    A(Il2Cpp.Api.GameObject._SetActive, (args: InvocationArguments, ctx: CpuContext, passValue: Map<PassType, any>) => {
        if (args[0].isNull()) return
        let gameObject = new Il2Cpp.GameObject(args[0])
        if (filterDuplicateOBJ(gameObject.toString()) == -1) return
        if (defaltActive == 2 || args[1].toInt32() == defaltActive) {
            let strTmp = "public extern void SetActive( " + (args[1].toInt32() == 0 ? "false" : "true") + " );  LR:" + checkCtx(ctx)
            LOGW("\n" + getLine(strTmp.length))
            LOGD(strTmp)
            LOGO(getLine(strTmp.length / 2))
            showGameObject(args[0])
        }
    })
}

globalThis.showGameObject = (mPtr: NativePointer) => {
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

globalThis.getTransform = (mPtr: NativePointer) => {
    if (typeof mPtr == "number") mPtr = ptr(mPtr)
    let gameObject: Il2Cpp.GameObject
    try {
        if (getTypeName(mPtr) == "GameObject") {
            gameObject = new Il2Cpp.GameObject(mPtr)
        } else {
            gameObject = new Il2Cpp.Component(mPtr).get_gameObject()
        }
    } catch {
        throw new Error("getTransform: mPtr is not GameObject or Transform")
    }
    return gameObject.get_transform().handle
}

globalThis.setActive = (mPtr: Il2Cpp.GameObject | Il2Cpp.Transform | string | number | NativePointer, active: boolean = false) => {
    mPtr = checkGT(mPtr)
    if (mPtr instanceof Il2Cpp.GameObject) setActiveG(mPtr, active)
    else if (mPtr instanceof Il2Cpp.Transform) setActiveT(mPtr, active)
    else throw new Error("setActive: mPtr is not GameObject or Transform or number or string")
}

globalThis.setActiveC = (mPtr: Il2Cpp.GameObject | Il2Cpp.Transform | string | number | NativePointer, active: boolean = false) => {
    mPtr = checkGT(mPtr)
    if (mPtr instanceof Il2Cpp.GameObject) setActiveGChange(mPtr)
    else if (mPtr instanceof Il2Cpp.Transform) setActiveTChange(mPtr)
    else throw new Error("setActive: mPtr is not GameObject or Transform or number or string")
}

const checkGT = (mPtr: Il2Cpp.GameObject | Il2Cpp.Transform | string | number | NativePointer): Il2Cpp.GameObject | Il2Cpp.Transform => {
    let newPtr: NativePointer
    if (typeof mPtr == 'number' || typeof mPtr == 'string' || mPtr instanceof NativePointer) {
        newPtr = checkCmdInput(mPtr)
        let typeName = getTypeName(newPtr)
        if (typeName.includes('Transform')) mPtr = new Il2Cpp.Transform(newPtr) // type : RectTransform
        else if (typeName.includes('GameObject')) mPtr = new Il2Cpp.GameObject(newPtr)
        else throw new Error("setActive: mPtr is not GameObject or Transform")
    }
    return mPtr
}

export const setActiveG = (gameObject: Il2Cpp.GameObject, active: boolean = false) => gameObject.SetActive(active)

export const setActiveGChange = (gameObject: Il2Cpp.GameObject) => gameObject.SetActive(!gameObject.get_activeSelf())

declare global {
    var HookSetActive: (defaltActive?: number) => void
    var showGameObject: (gameObjOrTransform: NativePointer) => void
    var getTransform: (gameObjOrComponent: NativePointer) => NativePointer
    var setActive: (mPtr: Il2Cpp.GameObject | Il2Cpp.Transform | string | number | NativePointer, active?: boolean) => void
    var setActiveC: (mPtr: Il2Cpp.GameObject | Il2Cpp.Transform | string | number | NativePointer, active?: boolean) => void
}

export { showGameObject, HookSetActive, getTransform } 