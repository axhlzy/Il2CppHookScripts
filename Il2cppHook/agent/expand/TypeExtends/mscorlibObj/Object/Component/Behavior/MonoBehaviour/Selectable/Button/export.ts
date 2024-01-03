import { UnityEngine_EventSystems_PointerEventData_Impl as PointerEventData } from "../../../../../../AbstractEventData/BaseEventData/PointerEventData/class"
import { UnityEngine_UI_Button_ButtonClickedEvent_Impl as ButtonClickedEvent } from "../../../../../../UnityEventBase/UnityEvent/ButtonClickedEvent/class"
import { UnityEngine_Events_UnityAction_Impl as UnityAction } from "../../../../../../Delegate/MulticastDelegate/UnityAction/class"
import { PackList } from "../../../../../../../../../bridge/fix/packer/packList"
import { GameObjectImpl as GameObject } from "../../../../../GameObject/class"
import { formartClass as FM } from "../../../../../../../../../utils/formart"
import { checkExtends } from "../../../../../../ValueType/exports"
import { Button } from "./class"
import { soName } from "../../../../../../../../../base/globle"

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
                doDefaultHook()
            } else {
                funcAddr = ptr(self_addr as unknown as number)
                if (funcAddr == undefined || funcAddr.isNull()) break
                doSelfHook(funcAddr)
            }

            function doSelfHook(funcAddr: NativePointer) {
                let checkFuncAddr: NativePointer = checkCmdInput(funcAddr)
                let extra_str = ''
                if (!checkFuncAddr.equals(funcAddr))
                    extra_str = "| (" + checkFuncAddr.sub(Module.findBaseAddress(soName)!) + ")"
                LOGE(`\nEnable Hook OnPointerClick at ${funcAddr} ${extra_str}\n`)
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
            }

            function doDefaultHook() {

                const soAddr_local: NativePointer = Module.findBaseAddress(soName)!

                const _OnPointerClick_ptr = ptr(Il2Cpp.Api.Button._OnPointerClick)
                LOGE("\nEnable Hook Button OnPointerClick at " + _OnPointerClick_ptr + "(" + _OnPointerClick_ptr.sub(soAddr_local) + ")" + "\n")
                try {
                    A(_OnPointerClick_ptr, (args) => {
                        LOGW("\n" + getLine(38))
                        LOGD("public void Button::OnPointerClick( " + args[0] + " , " + args[1] + " )")
                        FakePointerEventData(args[1])
                    })
                } catch (error) {
                    A(_OnPointerClick_ptr.add(p_size * 2), (args: InvocationArguments, ctx: CpuContext) => {
                        LOGW("\n" + getLine(38))
                        LOGD("public void Button::OnPointerClick( " + getPlatformCtxWithArgV(ctx, 0) + " , " + getPlatformCtxWithArgV(ctx, 1) + " )")
                        FakePointerEventData(args[1])
                    })
                }

                let _UnityButton_OnPointerClick_ptr
                try {
                    _UnityButton_OnPointerClick_ptr = ptr(Il2Cpp.Api.UnityButton._OnPointerClick)
                    if (_UnityButton_OnPointerClick_ptr.isNull()) return
                } catch (error) {
                    return
                }

                LOGE("Enable Hook UnityButton OnPointerClick at " + _UnityButton_OnPointerClick_ptr + "(" + _UnityButton_OnPointerClick_ptr.sub(soAddr_local) + ")" + "\n")
                A(_UnityButton_OnPointerClick_ptr, (args) => {
                    LOGW("\n" + getLine(38))
                    LOGD("public void UnityButton::OnPointerClick( " + args[0] + " , " + args[1] + " )")
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
}

export function FakePointerEventData(eventData: NativePointer): void {
    if (eventData.isNull()) return
    let pointerEventData = new PointerEventData(eventData)
    let gameObj: Il2Cpp.GameObject = pointerEventData.get_pointerEnter()
    if (gameObj.isNull()) return
    showGameObject(gameObj)
    showComponents(gameObj)
    // showTransform(f_getTransform(gameObj))
    // showEventData(pointerEventData)
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

    try {
        A(Il2Cpp.Api.UnityButton._OnPointerClick, (args) => innerFunction(args[0], args[1]))
    } catch (error) {
        try {
            A(Il2Cpp.Api.UnityButton._OnPointerClick, (_args, ctx: CpuContext) => {
                innerFunction(getPlatformCtxWithArgV(ctx, 0)!, getPlatformCtxWithArgV(ctx, 1)!)
            })
        } catch (error) {
            // LOGE(`Don't find UnityButton.OnPointerClick`)
        }
    }

    // Il2Cpp.Api.EventTrigger._OnPointerClick
    try {
        A(Il2Cpp.Api.EventTrigger._OnPointerClick, (args) => innerFunction(args[0], args[1]))
    } catch (error) {
        try {
            A(Il2Cpp.Api.EventTrigger._OnPointerClick, (_args, ctx: CpuContext) => {
                innerFunction(getPlatformCtxWithArgV(ctx, 0)!, getPlatformCtxWithArgV(ctx, 1)!)
            })
        } catch (error) {
            // LOGE(`Don't find EventTrigger.OnPointerClick`)
        }
    }

    function innerFunction(buttonInstance: NativePointer, eventData: NativePointer) {
        let button: Button = new Button(buttonInstance)
        let pointerEventData: PointerEventData = new PointerEventData(eventData)
        let currentGameobj: GameObject = button.gameobject
        let buttonOnclickEvent: ButtonClickedEvent
        try {
            buttonOnclickEvent = button.get_onClick()
        } catch (error) {
            // Custom 函数可能导致实例并不是 Button (ps：Selectable 基本等价于Button)
            // example ↓
            // → showParentClass(findClass('UnityButton'))
            // ← BeveledUnityButton (0x7a80382480) -> UnityButton (0x7a94cc4700) -> MonoBehaviour (0x7a8049e800) -> Behaviour (0x7a8049e980) -> Component (0x7a8049eb00) -> Object (0x7a8047b600) -> Object (0x7a807fb800)
            if (!checkExtends(button, "Button") && checkExtends(button, "UnityButton")) {
                logTitle()
                let button: Il2Cpp.UnityButton = new Il2Cpp.UnityButton(buttonInstance)
                let method: Il2Cpp.Method = button._onClick.method
                LOGW(`\t[-] ${method.handle} -> ${method.relativeVirtualAddress} | ${method.class.image.assembly.name}.${method.class.name}.${method.name}`)
                return
            }

            if (checkExtends(button, "EventTrigger")) {
                let button: Il2Cpp.EventTrigger = new Il2Cpp.EventTrigger(buttonInstance)
                let m_Delegates: PackList = new PackList(button.m_Delegates)
                m_Delegates.forEach((instance: Il2Cpp.Object, index: number) => {
                    // LOGD(`${instance.toString()}`)
                    // 0x10 public EventTriggerType (0x790dba7400)     eventID
                    // let entryStr: string = enumNumToName(instance.field<number>('eventID').value, "Entry", instance.class.handle)
                    // 0x18 public TriggerEvent (0x790ddbd7c0) callback
                    // TriggerEvent (0x790ddbd7c0) -> UnityEvent`1 (0x790dbbc780) -> UnityEventBase (0x79cf97a140) -> Object (0x79cfd55000)
                    // let callback: UnityEventBase = new UnityEventBase(instance.field<NativePointer>('callback').value)
                    // delayPrint([callback.m_Calls.m_ExecutingCalls, callback.m_Calls.m_PersistentCalls, callback.m_Calls.m_RuntimeCalls])
                })
            }

            throw error
        }

        // m_ExecutingCalls : List<BaseInvokableCall>
        let exeCalls: PackList = buttonOnclickEvent.m_Calls.m_ExecutingCalls
        let persistentCalls: PackList = buttonOnclickEvent.m_Calls.m_PersistentCalls
        let runtimeCalls: PackList = buttonOnclickEvent.m_Calls.m_RuntimeCalls
        let callsArray: Array<PackList> = [exeCalls, persistentCalls, runtimeCalls]
        delayPrint(callsArray)

        function logTitle(needCls: boolean = false) {
            let obj = new Il2Cpp.Object(buttonInstance)
            let clsDes = needCls ? ` C:${obj.class.handle} |` : ''
            LOGD(`\n[*] ${pointerEventData.handle} ---> ${obj} {${clsDes} G:${currentGameobj.handle} | T:${currentGameobj.get_transform().handle} }`)
        }

        function delayPrint(callsArray: Array<PackList>) {
            logTitle()
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
                            method = unityAction.method
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
}

const OnClickScript = (mPtr: NativePointer = ptr(0)) => {
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
        listScripts(arg0)?.forEach((item: Il2Cpp.Object) => {
            if (index == 0) newLine()
            let itemStr: string = item.toString()
            LOGW(`${FM.alignStr(`[${++index}]`, 6)} ${item.handle} ${itemStr}`)
        })
    }
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

    // test ↓
    var HideClickedObj: (x: number, y: number) => void
}

globalThis.B_Button = OnButtonClick
globalThis.HideClickedObj = HideClickedObj
globalThis.HookOnPointerClick = OnPointerClick
globalThis.B_Button_Custom = (mPtr: NativePointer) => OnButtonClick(checkCmdInput(mPtr))
globalThis.HookOnPointerClick_Custom = (mPtr: NativePointer) => HookOnPointerClick(-1, checkCmdInput(mPtr))

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