import { UnityEngine_EventSystems_PointerEventData_Impl as PointerEventImpl } from "../../../../../../AbstractEventData/BaseEventData/PointerEventData/class"
import { ButtonClickedEvent } from "./class"

function OnPointerClick() {
    let funcAddr: NativePointer | undefined = undefined
    switch (arguments[0]) {
        default:
            funcAddr = Il2Cpp.Api.Button._OnPointerClick
            if (funcAddr == undefined || funcAddr.isNull()) break
            LOGE("\nEnable Hook OnPointerClick at " + funcAddr + "(" + funcAddr.sub(soAddr) + ")" + "\n")
            A(Il2Cpp.Api.Button._OnPointerClick, (args) => {
                LOGW("\n" + getLine(38))
                LOGD("public void OnPointerClick( " + args[0] + " , " + args[1] + " );")
                FakePointerEventData(args[1])
            })
            break
        case 0:
            funcAddr = find_method("UnityEngine.UI", "PointerInputModule", "DeselectIfSelectionChanged", 2)
            if (funcAddr.isNull()) break
            LOGE("\nEnable Hook DeselectIfSelectionChanged at " + funcAddr + "(" + funcAddr.sub(soAddr) + ")" + "\n")
            A(funcAddr, (args) => {
                LOGW("\n" + getLine(38))
                LOGD("protected void DeselectIfSelectionChanged(Ins = " + args[0] + " , GameObject = " + args[1] + " , BaseEventData(" + findClass("BaseEventData") + ") = " + args[2] + " );")
                if (!args[1].isNull()) showGameObject(args[1])
            })
            break
        case 1:
            funcAddr = find_method("UnityEngine.UI", "ScrollRect", "OnInitializePotentialDrag", 1)
            if (funcAddr.isNull()) break
            LOGE("\nEnable Hook OnInitializePotentialDrag at " + funcAddr + "(" + funcAddr.sub(soAddr) + ")" + "\n")
            A(funcAddr, (args) => {
                LOGW("\n" + getLine(38))
                LOGD("public void OnInitializePotentialDrag( " + args[0] + " , " + args[1] + " );")
                FakePointerEventData(args[1])
            })
            break
        case 2:
            A(find_method("UnityEngine.UI", "PointerInputModule", "ProcessMove", 1), (args) => {
                LOGW("\n" + getLine(38))
                LOGD("protected virtual Void ProcessMove( " + (args[1]) + " );")
                FakePointerEventData(args[1])
            })
            break
        case 3:
            A(find_method("UnityEngine.UI", "PointerInputModule", "ProcessDrag", 1), (args) => {
                LOGW("\n" + getLine(38))
                LOGD("protected virtual Void ProcessDrag( " + (args[1]) + " );")
                FakePointerEventData(args[1])
            })
            break
        case 4:
            A(find_method("UnityEngine.UI", "BaseInputModule", "HandlePointerExitAndEnter", 2), (args) => {
                LOGW("\n" + getLine(38))
                LOGD("protected virtual Void HandlePointerExitAndEnter( " + (args[1]) + " , " + (args[2]) + ")")
                FakePointerEventData(args[1])
            })
            break
        case 5:
            A(find_method("UnityEngine.UI", "PointerEventData", "set_pointerPress", 1), (args) => {
                LOGW("\n" + getLine(38))
                LOGD("protected virtual Void set_pointerPress( " + (args[1]) + " );")
                showGameObject(args[1])
            })
            break
        case 6:
            A(find_method("UnityEngine.UI", "PointerInputModule", "GetPointerData", 3), (args) => {
                LOGW("\n" + getLine(38))
                LOGD("protected virtual Void GetPointerData( " + (args[2]) + " );")
                showGameObject(args[1])
                showEventData(args[2])
            })
            break
        case 7:
            // EventSystem --->  public Void RaycastAll (PointerEventData eventData,List`1 raycastResults)
            A(find_method("UnityEngine.UI", "EventSystem", "RaycastAll", 2), (args) => {
                LOGW("\n" + getLine(38))
                LOGD(`protected virtual Void RaycastAll( ${args[0]} , ${args[1]} , ${args[2]} );`)
                FakePointerEventData(args[1])
            })
            break
        case 8:
            // PointerInputModule --->  protected PointerEventData GetTouchPointerEventData (Touch input,Boolean pressed,Boolean released)
            A(find_method("UnityEngine.UI", "PointerInputModule", "GetTouchPointerEventData", 3), (args) => { }, (ret) => {
                LOGW("\n" + getLine(38))
                LOGD(`protected virtual Void GetTouchPointerEventData `)
                FakePointerEventData(ret)
            })
        case 9:
            // Selectable --->  public virtual Void OnPointerExit (PointerEventData eventData)
            A(find_method("UnityEngine.UI", "Selectable", "OnPointerExit", 1), (args) => {
                LOGW("\n" + getLine(38))
                LOGD("protected virtual Void OnPointerExit( " + (args[1]) + " );")
                FakePointerEventData(args[1])
            })
            break
    }

    function FakePointerEventData(eventData: NativePointer): void {
        if (eventData.isNull()) return
        let gameObj: Il2Cpp.GameObject = new PointerEventImpl(eventData).get_pointerEnter()
        if (!gameObj.handle.isNull()) showGameObject(gameObj.handle)
        // showTransform(f_getTransform(gameObj))
        // showEventData(pointerEventData)
    }
}

type PointerEventData = NativePointer
const OnButtonClick = () => {
    A(Il2Cpp.Api.Button._OnPointerClick, (args) => {
        let current: PointerEventData = args[0]
        // addRuntimeType(current)
        let ButtonClickedEvent = new Il2Cpp.Button(current).m_OnClick
        // LOGJSON(ButtonClickedEvent) //debug commit
        let gobj: NativePointer | undefined = getGameObject(current)
        let gObjPack: Il2Cpp.GameObject
        if (gobj != undefined) gObjPack = new Il2Cpp.GameObject(gobj)
        else throw new Error("Il2Cpp.GameObject is null")
        LOGH("\n[*] " + current + " ---> " + gObjPack.get_name() + " { G:" + gobj + " | T:" + gObjPack.get_transform().handle + " }")
        LOGO("    [-] InvokableCallList(" + findClass("InvokableCallList") + ") m_Calls " + ButtonClickedEvent.m_Calls.handle)
        setTimeout(() => ansItems(ButtonClickedEvent), 10);
    })

    function ansItems(event: ButtonClickedEvent): void {
        //  ps:暂时只是适配了arm32
        if (Process.arch != "arm") return
        // lf(event.m_Calls.m_PersistentCalls)
        // lf(event.m_Calls.m_ExecutingCalls)
        // lf(event.m_Calls.m_RuntimeCalls)

        let persistentCalls = event.m_Calls.m_PersistentCalls
        let executingCalls = event.m_Calls.m_ExecutingCalls
        let runtimeCalls = event.m_Calls.m_RuntimeCalls

        LOGD(`\t${parseList(persistentCalls).toSimpleString()}`)
        LOGD(`\t${parseList(executingCalls).toSimpleString()}`)
        LOGD(`\t${parseList(runtimeCalls).toSimpleString()}`)
    }
}

// /**
//  * 内部调用函数（展示解析的数据）  
//  * @param {*} ret_mCalls 
//  * @param {*} itemStr 
//  */
// let ansItems = (ret_mCalls, itemStr) => {

//     let ret_itemCalls = getFieldInfoFromCls(ret_mCalls[2], itemStr, ret_mCalls[5])
//     let m_size = getFieldInfoFromCls(ret_itemCalls[2], "_size", ret_itemCalls[5])[5]
//     if (m_size != 0) {
//         let item = getFieldInfoFromCls(ret_itemCalls[2], "_items", ret_itemCalls[5])
//         let arrAddr = []
//         for (let i = 0; i < m_size; ++i) {
//             // 本来是想解析动态解析类型的
//             let tmpType = "UnityAction"
//             // 这里就默认使用了0x8偏移位置的函数指针 从dump出来的情况看起来并不是每一个子类类型都有一个0x8，但实测0x8是可用的
//             let tmpValue = FackKnownType(tmpType, ptr(item[5]).add(p_size * (4 + i)).readPointer().add(p_size * 2).readPointer())
//             let functionName = mapNameToAddr(tmpValue)
//             tmpValue += (functionName == "" || functionName == undefined ? "" : (" | " + functionName))
//             arrAddr.push(tmpValue)
//         }
//         LOGD("\t" + itemStr.substring(2, 3) + "_calls ( INS :" + item[5] + ")  [TYPE : " + ret_itemCalls[3] + " ( " + ret_itemCalls[2] + " ) | LEN : " + m_size +
//             "] \n\t\t" + JSON.stringify(arrAddr) + " <--- " + JSON.stringify(JSON.parse(FackKnownType(item[3], item[5], item[2])).slice(0, m_size)))
//     }
// }




/**
 * 隐藏模拟点击位置的gameobj
 * 这里find_method()在移植的时候写具体的地址就是，不用移植整个js代码
 * @param {*} x 
 * @param {*} y 
 */
const HideClickedObj = (x: number, y: number) => {
    let m_ptr = find_method("UnityEngine.UI", "Button", "OnPointerClick", 1)
    let srcFunc = new NativeFunction(m_ptr, 'void', ['pointer', 'pointer', 'pointer', 'pointer'])
    Interceptor.revert(m_ptr)
    Interceptor.replace(m_ptr, new NativeCallback(function (arg0, pointerEventData, arg2, arg3) {
        srcFunc(arg0, pointerEventData, arg2, arg3)
        if (pointerEventData.isNull()) return
        let gameObj = new PointerEventImpl(pointerEventData).get_pointerEnter()
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

export { OnPointerClick, OnButtonClick, HideClickedObj }

declare global {
    var HookOnPointerClick: () => void;
    var B_Button: () => void;
    var HideClickedObj: (x: number, y: number) => void;
}

globalThis.HookOnPointerClick = OnPointerClick;
globalThis.B_Button = OnButtonClick;
globalThis.HideClickedObj = HideClickedObj;
