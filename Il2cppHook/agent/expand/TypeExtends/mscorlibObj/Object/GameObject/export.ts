import { filterDuplicateOBJ, PassType } from "../../../../../utils/common"
import { PackArray } from "../../../../../bridge/fix/packer/packArray"
import { PackList } from "../../../../../bridge/fix/packer/packList"
import { setActiveT, setActiveTChange } from "../Component/export"
import { checkExtends } from "../../ValueType/exports"
import { allocP } from "../../../../../utils/alloc"

globalThis.HookSetActive = (defaltActive: boolean = true, PrintStackTrace: boolean = false, filterString: Array<string> | string = "") => {

    let setActiveAddress = find_method("UnityEngine.CoreModule", "GameObject", "SetActive", 1)
    try {
        A(setActiveAddress, (args: InvocationArguments, ctx: CpuContext, _passValue: Map<PassType, any>) => {
            innerSetActive(args[0], ctx)
        })
    } catch {
        // 优化一下当dobby inlinehook生效时，hook不上报错的情况
        A(setActiveAddress.add(p_size * 3), (args: InvocationArguments, ctx: CpuContext, _passValue: Map<PassType, any>) => {
            innerSetActive(getPlatformCtxWithArgV(ctx, 0)!, ctx)
        })
    }

    function innerSetActive(mPtr: NativePointer, ctx: CpuContext) {
        if (mPtr.isNull()) return
        let gameObject = new Il2Cpp.GameObject(ptr(mPtr as unknown as number))
        if (filterString != "") {
            if (filterString instanceof Array) {
                let isPass = false
                for (let i = 0; i < filterString.length; i++) {
                    if (gameObject.get_name().indexOf(filterString[i]) != -1) {
                        isPass = true
                        break
                    }
                }
                if (!isPass) return
            } else if (filterString != "" && gameObject.get_name().indexOf(filterString) == -1) return
        }
        if (filterDuplicateOBJ(gameObject.toString()) == -1) return
        if (defaltActive && !mPtr.isNull()) {
            let strTmp = "public extern void SetActive( " + (mPtr.toInt32() == 0 ? "false" : "true") + " );  LR:" + checkCtx(ctx)
            LOGW("\n" + getLine(strTmp.length))
            LOGD(strTmp)
            LOGO(getLine(strTmp.length / 2))
            showGameObject(mPtr)
        }
        if (PrintStackTrace) PrintStackTraceN(ctx)
    }
}

globalThis.HookSendMessage = () => {
    // try {
    //     var UnityPlayer = Java.use("com.unity3d.player.UnityPlayer")
    //     UnityPlayer.UnitySendMessage.implementation = function (str0:string, str1:string, str2:string) {
    //         console.warn("\n--------------\tCalled UnitySendMessage\t--------------")
    //         console.log("UnityPlayer.UnitySendMessage(\x1b[96m'" + str0 + "','" + str1 + "','" + str2 + "'\x1b[0m)")
    //         this.UnitySendMessage(str0, str1, str2)
    //         PrintStackTrace()
    //     }
    // } catch (e) {}  
    A(Module.findExportByName("libunity.so", "UnitySendMessage")!, (args) => {
        LOGW("\n--------------\tCalled UnitySendMessage\t--------------")
        LOGD("UnitySendMessage => " + args[0].readCString() + " " + args[1].readCString() + " " + args[2].readCString())
    })
}

export function GetGameObjectFromPtr(mPtr: NativePointer | Il2Cpp.GameObject | Il2Cpp.Component | Il2Cpp.Transform): Il2Cpp.GameObject | undefined {
    if (mPtr == undefined) throw new Error("mPtr is undefined")
    if (mPtr instanceof Il2Cpp.GameObject) {
        return mPtr
    } else if (mPtr instanceof Il2Cpp.Transform || mPtr instanceof Il2Cpp.Component) {
        return mPtr.gameobject
    } else if (mPtr instanceof NativePointer || typeof mPtr == "number") {
        const ptr = checkCmdInput(mPtr)
        const typeName = getTypeName(ptr)
        if (checkExtends(ptr, "Component")) {
            return new Il2Cpp.Component(ptr).gameobject
        } else if (typeName == "GameObject") {
            return new Il2Cpp.GameObject(ptr)
        }
    } else throw new Error("mPtr is not a valid instance of the specified type")
}

globalThis.showGameObject = (mPtr: NativePointer | Il2Cpp.GameObject | Il2Cpp.Transform) => {
    if (mPtr == undefined || (mPtr instanceof NativePointer && mPtr.isNull())) return
    let gameObject: Il2Cpp.GameObject = GetGameObjectFromPtr(mPtr)!
    LOGO("--------- GameObject ---------")
    LOGD("gameObj\t\t--->\t" + gameObject.handle)
    LOGD("getName\t\t--->\t" + gameObject.get_name())
    LOGD("getLayer\t--->\t" + gameObject.get_layer())
    let m_transform = gameObject.get_transform()
    LOGD("getTransform\t--->\t" + m_transform.handle)
    let layerNames = ''
    for (var i = 0; i < 10; i++) {
        if (m_transform.handle.isNull()) break
        let getName = m_transform.get_gameObject().get_name()
        let handle = m_transform.handle
        let spl = layerNames == `` ? `` : ` <--- `
        layerNames = layerNames + spl + getName + "(" + handle + ")"
        m_transform = m_transform.get_parent()
    }
    LOGD("hierarchy\t--->\t" + layerNames)
}

globalThis.getTransform = (mPtr: NativePointer) => {
    return GetGameObjectFromPtr(mPtr)!.transform.handle
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

const setActiveG = (gameObject: Il2Cpp.GameObject, active: boolean = false) => gameObject.SetActive(active)

const setActiveGChange = (gameObject: Il2Cpp.GameObject) => gameObject.SetActive(!gameObject.get_activeSelf())

globalThis.findGameObject = findGameObject

/**
 * 两种方式查找 根据路径查找指定gameobj
 * @param {String} path 路径或者是顶层gobjName
 */
export function findGameObject(path: string, transform?: NativePointer) {
    if (path == undefined) throw new Error("findGameObject: path is undefined")

    try {
        if (transform == undefined) {
            if (arguments[2] != undefined) {
                // 返回 gameobject
                let gobj: Il2Cpp.GameObject = Il2Cpp.GameObject.Find(path)
                if (gobj.handle.isNull()) throw "Not Found ..."
                showGameObject(gobj.handle)
                return gobj.handle
            } else {
                // GameObject.find（静态方法）得到GameObject,路径查找
                showGameObject(callFunction(["UnityEngine.CoreModule", "GameObject", "Find", 1], allocCStr(path)))
            }
        } else if (getType(transform).name.indexOf("Transform") != -1) {
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

function GetComponentRuntimeType(transform: Il2Cpp.Transform): NativePointer {
    const retType: Array<mscorlib.Type> = getTypeParent(transform.handle) as Array<mscorlib.Type>
    const retRuntimeType = retType.find(type => type.name === "Component")?.handle ?? ptr(0)
    return retRuntimeType
}

var allocTmp = ptr(0)
function list_Components_from_GameObject(gameObject: NativePointer | Il2Cpp.GameObject | Il2Cpp.Object): PackArray | undefined {
    if (gameObject instanceof Il2Cpp.GameObject || gameObject instanceof Il2Cpp.Object) gameObject = gameObject.handle
    let localGobj = new Il2Cpp.GameObject(checkCmdInput(gameObject))
    let comp_addr: NativePointer = ptr(0)
    let comp_type = GetComponentRuntimeType(localGobj.get_transform()) // <- got component runtimeType

    // 这个会获取 child 所有,还得手动分类，故不使用
    // public Component[] GetComponentsInChildren(Type type, Boolean includeInactive)
    // comp_addr = find_method("UnityEngine.CoreModule", "GameObject", "GetComponentsInChildren", 2)
    // if (!comp_addr.isNull())
    //     return new PackArray(callFunction(comp_addr, localGobj.handle, comp_type, 0))

    // 获取当前对象的所有组件
    // public Component[] GetComponents(Type type)
    comp_addr = find_method("UnityEngine.CoreModule", "GameObject", "GetComponents", 1)
    if (!comp_addr.isNull()) {
        let local_array = callFunction(comp_addr, localGobj.handle, comp_type)
        if (local_array.isNull()) return undefined
        return new PackArray(local_array)
    }

    // private Array GetComponentsInternal(Type type, Boolean useSearchTypeAsArrayReturnType, Boolean recursive, Boolean includeInactive, Boolean reverse, Object resultList)
    comp_addr = find_method("UnityEngine.CoreModule", "GameObject", "GetComponentsInternal", 6)
    if (!comp_addr.isNull()) {  // not test
        let local_array = callFunctionLong(comp_addr, localGobj.handle, comp_type, 1, 1, 0, allocTmp)
        if (local_array.isNull()) return undefined
        return new PackArray(local_array)
    }
    throw new Error("list_Components_GameObject: not found method")
}

const ALLOC_SIZE = 0x1000
function list_Components_from_Component(component: NativePointer | Il2Cpp.Component): PackArray | undefined {
    if (component instanceof Il2Cpp.Component) component = component.handle
    let localComp = new Il2Cpp.Component(checkCmdInput(component))
    let comp_addr: NativePointer = ptr(0)
    let comp_type = GetComponentRuntimeType(localComp.get_transform())

    // public Void GetComponents(Type type, System.Collections.Generic.List<UnityEngine.Component> results)
    comp_addr = find_method("UnityEngine.CoreModule", "Component", "GetComponents", 2)
    if (comp_addr.isNull()) {
        // private Void GetComponentsForListInternal(Type searchType, Object resultList) 同上条其实是等价的
        comp_addr = find_method("UnityEngine.CoreModule", "Component", "GetComponentsForListInternal", 2)
    }
    if (!comp_addr.isNull()) {
        allocTmp = allocP(ALLOC_SIZE)
        callFunction(comp_addr, localComp.handle, comp_type, allocTmp)
        // 这里因为我们直接alloc的一块地址来存放list返回值，故list头并不带类型指针，所以不可使用new PackList来解析
        // 反之直接直接使用静态方法（PackList.localArray）去读取指定位置即可
        let local_array = PackList.localArray(allocTmp)
        if (local_array.isNull()) return undefined
        return new PackArray(local_array)
    }
    throw new Error("list_Components_Component: not found method")
}

globalThis.listScripts = (mPtr: NativePointer | Il2Cpp.GameObject | Il2Cpp.Transform | Il2Cpp.Component): PackArray | undefined => {

    if (mPtr instanceof Il2Cpp.GameObject) {
        return list_Components_from_GameObject(mPtr.handle)
    } else if (mPtr instanceof Il2Cpp.Transform) {
        return list_Components_from_GameObject(mPtr.get_gameObject())
    } else if (mPtr instanceof Il2Cpp.Component) {
        return list_Components_from_Component(mPtr.handle)
    }

    let local_mPtr = checkCmdInput(mPtr)
    let typeName = getTypeName(local_mPtr)
    if (typeName == "GameObject") {
        return list_Components_from_GameObject(local_mPtr)
    } else if (typeName == "RectTransform") {
        return list_Components_from_Component(local_mPtr)
    } else if (checkExtends(local_mPtr)) {
        return list_Components_from_Component(local_mPtr)
    } else {
        throw new Error("listScripts: unsport type")
    }
}

// 解析挂载在 gameObject/transform ... 下的componnet脚本
globalThis.showComponents = (mPtr: NativePointer | Il2Cpp.GameObject | Il2Cpp.Transform | Il2Cpp.Component) => {
    let scripts: PackArray | undefined = listScripts(mPtr)
    if (!scripts?.handle.isNull() && scripts != undefined && scripts.length > 0) {
        LOGO("--------- Components ---------")
        scripts.forEach((script: Il2Cpp.Object) => {
            // LOGE(getTypeName(script.handle))
            try {
                LOGD(`${script.handle} -> ${script}`)
            } catch {
                LOGE(`${script.handle} -> (→_→) ErrorToCase `)
            }
        })
    }
}

// alias for globalThis.showComponents
globalThis.s = globalThis.showComponents

declare global {
    var HookSetActive: (defaltActive?: boolean, PrintStackTrace?: boolean, filterString?: string | Array<string>) => void
    var showGameObject: (gameObjOrTransform: NativePointer | Il2Cpp.GameObject | Il2Cpp.Transform) => void
    var getTransform: (gameObjOrComponent: NativePointer) => NativePointer
    var setActive: (mPtr: Il2Cpp.GameObject | Il2Cpp.Transform | string | number | NativePointer, active?: boolean) => void
    var setActiveC: (mPtr: Il2Cpp.GameObject | Il2Cpp.Transform | string | number | NativePointer, active?: boolean) => void
    var findGameObject: (path: string, transform?: NativePointer) => void
    var HookSendMessage: () => void

    var listScripts: (mPtr: NativePointer | Il2Cpp.GameObject | Il2Cpp.Transform | Il2Cpp.Component) => PackArray | undefined
    var showComponents: (mPtr: NativePointer | Il2Cpp.GameObject | Il2Cpp.Transform | Il2Cpp.Component) => void
    var s: (mPtr: NativePointer) => void
}

export { showGameObject, HookSetActive, getTransform, HookSendMessage }