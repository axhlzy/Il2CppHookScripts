import { UnityEngine_EventSystems_PointerEventData_Impl as PointerEventData } from "../../../../../../AbstractEventData/BaseEventData/PointerEventData/class"
import { UnityEngine_UI_Button_ButtonClickedEvent_Impl as ButtonClickedEvent } from "../../../../../../UnityEventBase/UnityEvent/ButtonClickedEvent/class"
import { UnityEngine_Events_UnityAction_Impl as UnityAction } from "../../../../../../Delegate/MulticastDelegate/UnityAction/class"
import { PackList } from "../../../../../../../../../bridge/fix/packer/packList"
import { GameObjectImpl as GameObject } from "../../../../../GameObject/class"
import { formartClass as FM } from "../../../../../../../../../utils/formart"
import { ButtonImpl as Button } from "./class"

/**
 * 打印点击事件GameObject层级
 * @param arg0 一般不用传，或者给个 -1 即可
 * @param self_addr 有时候游戏不走Button的OnPointerClick，需要自己找找 OnPointerClick 的地址 `BF("OnPointerClick")`
 */
export function OnPointerClick(arg0: number = -1, self_addr: NativePointer = ptr(0)) {
    let funcAddr: NativePointer | undefined = undefined
    switch (arguments[0]) {
        default:
            if (self_addr.isNull()) {
                funcAddr = ptr(Il2Cpp.Api.Button._OnPointerClick)
            } else {
                funcAddr = checkCmdInput(self_addr)
            }
            if (funcAddr == undefined || funcAddr.isNull()) break
            LOGE("\nEnable Hook OnPointerClick at " + funcAddr + "(" + funcAddr.sub(soAddr) + ")" + "\n")
            try {
                A(funcAddr, (args) => {
                    LOGW("\n" + getLine(38))
                    LOGD("public void OnPointerClick( " + args[0] + " , " + args[1] + " )")
                    FakePointerEventData(args[1])
                })
            } catch (error) {
                A(funcAddr.add(p_size * 2), (args: InvocationArguments, ctx: CpuContext) => {
                    LOGW("\n" + getLine(38))
                    LOGD("public void OnPointerClick( " + getPlatformCtxWithArgV(ctx, 0) + " , " + getPlatformCtxWithArgV(ctx, 1) + " )")
                    FakePointerEventData(args[1])
                })
            }
            break
        case 0:
            funcAddr = ptr(Il2Cpp.Api.PointerInputModule._DeselectIfSelectionChanged)
            if (funcAddr.isNull()) break
            LOGE("\nEnable Hook DeselectIfSelectionChanged at " + funcAddr + "(" + funcAddr.sub(soAddr) + ")" + "\n")
            A(funcAddr, (args) => {
                LOGW("\n" + getLine(38))
                LOGD("protected void DeselectIfSelectionChanged(Ins = " + args[0] + " , GameObject = " + args[1] + " , BaseEventData(" + findClass("BaseEventData") + ") = " + args[2] + " )")
                if (!args[1].isNull()) showGameObject(args[1])
            })
            break
        case 1:
            funcAddr = find_method("UnityEngine.UI", "ScrollRect", "OnInitializePotentialDrag", 1)
            if (funcAddr.isNull()) break
            LOGE("\nEnable Hook OnInitializePotentialDrag at " + funcAddr + "(" + funcAddr.sub(soAddr) + ")" + "\n")
            A(funcAddr, (args) => {
                LOGW("\n" + getLine(38))
                LOGD("public void OnInitializePotentialDrag( " + args[0] + " , " + args[1] + " )")
                FakePointerEventData(args[1])
            })
            break
        case 2:
            A(Il2Cpp.Api.PointerInputModule._ProcessMove, (args) => {
                LOGW("\n" + getLine(38))
                LOGD("protected virtual Void ProcessMove( " + (args[1]) + " )")
                FakePointerEventData(args[1])
            })
            break
        case 3:
            A(Il2Cpp.Api.PointerInputModule._ProcessDrag, (args) => {
                LOGW("\n" + getLine(38))
                LOGD("protected virtual Void ProcessDrag( " + (args[1]) + " )")
                FakePointerEventData(args[1])
            })
            break
        case 4:
            A(Il2Cpp.Api.BaseInputModule._HandlePointerExitAndEnter, (args) => {
                LOGW("\n" + getLine(38))
                LOGD("protected virtual Void HandlePointerExitAndEnter( " + (args[1]) + " , " + (args[2]) + ")")
                FakePointerEventData(args[1])
            })
            break
        case 5:
            A(Il2Cpp.Api.PointerEventData._set_pointerPress, (args) => {
                LOGW("\n" + getLine(38))
                LOGD("protected virtual Void set_pointerPress( " + (args[1]) + " )")
                showGameObject(args[1])
            })
            break
        case 6:
            A(Il2Cpp.Api.PointerInputModule._GetPointerData, (args) => {
                LOGW("\n" + getLine(38))
                LOGD("protected virtual Void GetPointerData( " + (args[2]) + " )")
                showGameObject(args[1])
                showEventData(args[2])
            })
            break
        case 7:
            // EventSystem --->  public Void RaycastAll (PointerEventData eventData,List`1 raycastResults)
            A(Il2Cpp.Api.EventSystem._RaycastAll, (args) => {
                LOGW("\n" + getLine(38))
                LOGD(`protected virtual Void RaycastAll( ${args[0]} , ${args[1]} , ${args[2]} )`)
                FakePointerEventData(args[1])
            })
            break
        case 8:
            // PointerInputModule --->  protected PointerEventData GetTouchPointerEventData (Touch input,Boolean pressed,Boolean released)
            A(Il2Cpp.Api.PointerInputModule._GetTouchPointerEventData, (args) => { }, (ret) => {
                LOGW("\n" + getLine(38))
                LOGD(`protected virtual Void GetTouchPointerEventData `)
                FakePointerEventData(ret)
            })
        case 9:
            // Selectable --->  public virtual Void OnPointerExit (PointerEventData eventData)
            A(Il2Cpp.Api.Selectable._OnPointerExit, (args) => {
                LOGW("\n" + getLine(38))
                LOGD("protected virtual Void OnPointerExit( " + (args[1]) + " )")
                FakePointerEventData(args[1])
            })
            break
    }

    function FakePointerEventData(eventData: NativePointer): void {
        if (eventData.isNull()) return
        let pointerEventData = new PointerEventData(eventData)
        let gameObj: Il2Cpp.GameObject = pointerEventData.get_pointerEnter()
        // LOGD(pointerEventData.toString())
        if (!gameObj.handle.isNull()) showGameObject(gameObj.handle)
        // showTransform(f_getTransform(gameObj))
        // showEventData(pointerEventData)
    }
}

export const OnButtonClick = (mPtr: NativePointer = ptr(0)) => {
    if (!mPtr.isNull()) {
        A(checkCmdInput(mPtr), (args) => innerFunction(args[0], args[1]))
        return
    }
    try {
        A(Il2Cpp.Api.Button._OnPointerClick, (args) => innerFunction(args[0], args[1]))
    } catch (error) {
        A(Il2Cpp.Api.Button._OnPointerClick, (_args, ctx: CpuContext) => {
            innerFunction(getPlatformCtxWithArgV(ctx, 0)!, getPlatformCtxWithArgV(ctx, 1)!)
        })
    }

    function innerFunction(arg0: NativePointer, arg1: NativePointer) {
        let button: Button = new Button(arg0)
        let currentGameobj: GameObject = getGameObjectPack(arg0)
        let pointerEventData: PointerEventData = new PointerEventData(arg1)
        let buttonOnclickEvent: ButtonClickedEvent = button.get_onClick()
        LOGD(`\n[*] ${pointerEventData.handle} ---> ${currentGameobj.get_name()} { G:${currentGameobj.handle} | T:${currentGameobj.get_transform().handle} }`)

        // m_ExecutingCalls : List<BaseInvokableCall>
        let exeCalls: PackList = buttonOnclickEvent.m_Calls.m_ExecutingCalls
        let persistentCalls: PackList = buttonOnclickEvent.m_Calls.m_PersistentCalls
        let runtimeCalls: PackList = buttonOnclickEvent.m_Calls.m_RuntimeCalls
        let callsArray: Array<PackList> = [exeCalls, persistentCalls, runtimeCalls]

        setTimeout(() => {
            callsArray.forEach((callList: PackList) => {
                if (callList.get_Count() != 0) LOGZ(`\t[+] ${callList}`)
                callList.forEach((instance: Il2Cpp.Object, index: number) => {
                    // UnityEngine.Events.InvokableCall
                    // LOGD(index + " : " + instance + " " + instance.handle)
                    let action: Il2Cpp.Object = <Il2Cpp.Object>instance.field('Delegate').value
                    // lfp(action.handle)
                    let unityAction: UnityAction = new UnityAction(action.handle)
                    let method: Il2Cpp.Method
                    if (!unityAction.method.isNull()) {
                        // action 中本身就包含了 MethodInfo
                        method = new Il2Cpp.Method(unityAction.method)
                    } else if (!unityAction.method_ptr.isNull()) {
                        // 备用的相对较慢的解析手段 （address to method 需要遍历）
                        method = AddressToMethod(unityAction.method_ptr, false)
                    } else throw new Error("unityAction.method is null")
                    LOGW(`\t\t[${index}] ${method.handle} -> ${method.relativeVirtualAddress} | ${method.class.image.assembly.name}.${method.class.name}.${method.name}`)
                })
            })
        }, 20)
    }
}

export const OnClickScript = (mPtr: NativePointer = ptr(0)) => {
    if (!mPtr.isNull()) {
        A(checkCmdInput(mPtr), (args) => innerFunction(args[0], args[1]))
        return
    }
    try {
        A(Il2Cpp.Api.Button._OnPointerClick, (args) => innerFunction(args[0], args[1]))
    } catch (error) {
        A(Il2Cpp.Api.Button._OnPointerClick, (_args, ctx: CpuContext) => {
            innerFunction(getPlatformCtxWithArgV(ctx, 0)!, getPlatformCtxWithArgV(ctx, 1)!)
        })
    }

    function innerFunction(arg0: NativePointer, _arg1: NativePointer) {
        let index: number = 0
        listScripts(getGameObjectPack(arg0).handle)?.forEach((item: Il2Cpp.Object) => {
            if (index == 0) newLine()
            let itemStr: string = item.toString()
            LOGW(`${FM.alignStr(`[${++index}]`, 6)} ${item.handle} ${itemStr}`)

        })
    }
}

export const PrintScriptHierarchy = (mPtr: NativePointer) => {
    let local_mPtr = checkCmdInput(mPtr)
    new Il2Cpp.GameObject(local_mPtr).transform.forEach((item: Il2Cpp.Transform) => {
        LOGW(`${FM.alignStr(`[${item.get_gameObject().get_name()}]`, 20)} ${item.get_gameObject().handle} ${item.handle}`)
    })
}

/**
 * 隐藏模拟点击位置的gameobj
 * 这里find_method()在移植的时候写具体的地址就是，不用移植整个js代码
 * @param {*} x 
 * @param {*} y 
 */
export const HideClickedObj = (x: number, y: number) => {
    let m_ptr = find_method("UnityEngine.UI", "Button", "OnPointerClick", 1)
    let srcFunc = new NativeFunction(m_ptr, 'void', ['pointer', 'pointer', 'pointer', 'pointer'])
    Interceptor.revert(m_ptr)
    Interceptor.replace(m_ptr, new NativeCallback(function (arg0, pointerEventData, arg2, arg3) {
        srcFunc(arg0, pointerEventData, arg2, arg3)
        if (pointerEventData.isNull()) return
        let gameObj = new PointerEventData(pointerEventData).get_pointerEnter()
        // 判断名字后使用这三种方式都可以去掉该对象
        if (gameObj.get_name() === "Settings Button") {
            // setActive(gameObj,0)
            // var m_transform = new NativeFunction(find_method("UnityEngine.CoreModule","GameObject","get_transform",0),'pointer',['pointer'])(gameObj)
            // SetLocalScale(m_transform,0,0,0)
            // destroyObj(gameObj)
        }
    }, 'void', ['pointer', 'pointer', 'pointer', 'pointer']))

    setClick(x, y)
    // B 去断点找到点击事件的处理函数并nop掉
    // 循环调用，出现时destory掉这个gameObj
}

declare global {
    var HookOnPointerClick: (arg: number, mPtr: NativePointer) => void
    var HookOnPointerClick_Custom: (mPtr: NativePointer) => void // Customize the function address of OnPointerClick
    var B_Button: () => void
    var B_Button_Custom: (mPtr: NativePointer) => void // Customize the function address of OnPointerClick
    var B_Click_Script: (mPtr: NativePointer) => void
    var B_Click_Script_Custom: (mPtr: NativePointer) => void
    var PrintScriptHierarchy: (mPtr: NativePointer) => void

    // test ↓
    var B_ButtonTest: () => void
    var HideClickedObj: (x: number, y: number) => void
}

globalThis.HookOnPointerClick = OnPointerClick
globalThis.HookOnPointerClick_Custom = (mPtr: NativePointer) => HookOnPointerClick(-1, checkCmdInput(mPtr))
globalThis.HideClickedObj = HideClickedObj
globalThis.PrintScriptHierarchy = PrintScriptHierarchy
globalThis.B_Button = OnButtonClick
globalThis.B_Button_Custom = (mPtr: NativePointer) => OnButtonClick(checkCmdInput(mPtr))
globalThis.B_Click_Script = OnClickScript
globalThis.B_Click_Script_Custom = (mPtr: NativePointer) => OnClickScript(checkCmdInput(mPtr))

// globalThis.B_ButtonTest = () => {
//     // OnPointerClick(instance, PointerEventData) : Void
//     A(Il2Cpp.Api.Button._OnPointerClick, (args) => {
//         // let currentGameobj: GameObject = getGameObjectPack(args[0])
//         // let button: Button = new Button(args[0])
//         // let pointerEventData: PointerEventData = new PointerEventData(args[1])
//         // let buttonOnclickEvent: ButtonClickedEvent = button.get_onClick()
//         // LOGD(`\n[*] ${pointerEventData.handle} ---> ${currentGameobj.get_name()} { G:${currentGameobj.handle} | T:${currentGameobj.get_transform().handle} }`)

//         // LOGD(getType(button.handle).toString());

//         // (getTypeParent(button.handle) as Array<mscorlib.Type>).forEach((type: mscorlib.Type) => {
//         //     LOGD(type.toString())
//         // })

//         // // let ret = button.GetComponentInChildren(new System_Type(ptr(0xc52af5c0)), true)

//         // // let s = button.GetComponent(new System_Type(ptr(0xa278bdc0))).toString()
//         // // LOGE(s)

//         // LOGD(currentGameobj.GetComponent(new System_Type(ptr(0xa276e8e0))).toString())

//         // LOGD(currentGameobj.GetComponentsInternal(new System_Type(ptr(0xa276e8e0))))

//         new PackList(ptr(0xd684d940)).forEach((instance: Il2Cpp.Object, index: number) => {
//             LOGD(`${instance.toString()}`)
//         })

//     })
// }