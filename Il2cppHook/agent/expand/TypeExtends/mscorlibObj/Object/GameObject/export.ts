import { filterDuplicateOBJ, PassType } from "../../../../../utils/common"
import { setActiveT, setActiveTChange } from "../Component/export"

globalThis.HookSetActive = (defaltActive: boolean = true) => {

    try {
        A(Il2Cpp.Api.GameObject._SetActive, (args: InvocationArguments, ctx: CpuContext, passValue: Map<PassType, any>) => {
            innerSetActive(args[0],ctx)
        })
    } catch (error) {
        // 优化一下当dobby inlinehook生效时，hook不上报错的情况
        A(Il2Cpp.Api.GameObject._SetActive.add(p_size*3), (args: InvocationArguments, ctx: CpuContext, passValue: Map<PassType, any>) => {
            innerSetActive(getPlatformCtxWithArgV(ctx,0)!,ctx)
        })
    }

    function innerSetActive(mPtr:NativePointer,ctx:CpuContext){
        if (mPtr.isNull()) return
        let gameObject = new Il2Cpp.GameObject(ptr(mPtr as unknown as number))
        if (filterDuplicateOBJ(gameObject.toString()) == -1) return
        if (defaltActive && !mPtr.isNull()) {
            let strTmp = "public extern void SetActive( " + (mPtr.toInt32() == 0 ? "false" : "true") + " );  LR:" + checkCtx(ctx)
            LOGW("\n" + getLine(strTmp.length))
            LOGD(strTmp)
            LOGO(getLine(strTmp.length / 2))
            showGameObject(mPtr)
        }
    }
}

globalThis.HookSendMessage = () => {
    try {
        var UnityPlayer = Java.use("com.unity3d.player.UnityPlayer")
        UnityPlayer.UnitySendMessage.implementation = function (str0:string, str1:string, str2:string) {
            console.warn("\n--------------\tCalled UnitySendMessage\t--------------")
            console.log("UnityPlayer.UnitySendMessage(\x1b[96m'" + str0 + "','" + str1 + "','" + str2 + "'\x1b[0m)")
            this.UnitySendMessage(str0, str1, str2)
            PrintStackTrace()
        }
    } catch (e) {}
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

/**
 * 两种方式查找 根据路径查找指定gameobj
 * @param {String} path 路径或者是顶层gobjName
 */
 export function findGameObject(path:string, transform?:NativePointer) {
    if (path == undefined) throw new Error("findGameObject: path is undefined")

    try {
        if (transform == undefined) {
            if (arguments[2] != undefined) {
                // 返回 gameobject
                let gobj:Il2Cpp.GameObject = Il2Cpp.GameObject.Find(path)
                if (gobj.handle.isNull()) throw "Not Found ..."
                showGameObject(gobj.handle)
                return gobj.handle
            } else {
                // GameObject.find（静态方法）得到GameObject,路径查找
                showGameObject(callFunction(["UnityEngine.CoreModule", "GameObject", "Find", 1], allocCStr(path)))
            }
        } else if (getType(transform).name.indexOf("Transform")!=-1) {
            if (arguments[2] != undefined) {
                // 返回 transform
                return callFunction(["UnityEngine.CoreModule", "Transform", "Find", 1], transform, allocCStr(path))
            } else {
                // Transform.find(非静态方法) 得到的也是transform，指定查找起始点，可以查找隐藏对象
                let gobj = getGameObject(callFunction(["UnityEngine.CoreModule", "Transform", "Find", 1], transform, allocCStr(path)))
                if (gobj != undefined) showGameObject(gobj)
            }
        } else {
            LOGE("\narguments[1] Need a Transform Ptr\n")
        }
    } catch (error) {
        LOGE("\nNot Found ...\n")
    }
}
globalThis.findGameObject = findGameObject

declare global {
    var HookSetActive: (defaltActive?: boolean) => void
    var showGameObject: (gameObjOrTransform: NativePointer) => void
    var getTransform: (gameObjOrComponent: NativePointer) => NativePointer
    var setActive: (mPtr: Il2Cpp.GameObject | Il2Cpp.Transform | string | number | NativePointer, active?: boolean) => void
    var setActiveC: (mPtr: Il2Cpp.GameObject | Il2Cpp.Transform | string | number | NativePointer, active?: boolean) => void
    var findGameObject: (path:string, transform?:NativePointer) => void
    var HookSendMessage: () => void
}

export { showGameObject, HookSetActive, getTransform, HookSendMessage }