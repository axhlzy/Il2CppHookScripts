
function OnPointerClick() {
    // let funcAddr: NativePointer | undefined = undefined
    // switch (arguments[0]) {
    //     default:
    //         funcAddr = find_method("UnityEngine.UI", "Button", "OnPointerClick", 1)
    //         if (funcAddr == undefined || funcAddr.isNull()) break
    //         LOGE("\nEnable Hook OnPointerClick at " + funcAddr + "(" + funcAddr.sub(soAddr) + ")" + "\n")
    //         A(funcAddr, (args) => {
    //             LOGW("\n" + getLine(38))
    //             LOGD("public void OnPointerClick( " + args[0] + " , " + args[1] + " );")
    //             FakePointerEventData(args[1])
    //         })
    //         break
    //     case 0:
    //         funcAddr = find_method("UnityEngine.UI", "PointerInputModule", "DeselectIfSelectionChanged", 2)
    //         if (funcAddr == 0) break
    //         LOGE("\nEnable Hook DeselectIfSelectionChanged at " + funcAddr + "(" + funcAddr.sub(soAddr) + ")" + "\n")
    //         A(funcAddr, (args) => {
    //             LOGW("\n" + getLine(38))
    //             LOGD("protected void DeselectIfSelectionChanged(Ins = " + args[0] + " , GameObject = " + args[1] + " , BaseEventData(" + findClass("BaseEventData") + ") = " + args[2] + " );")
    //             if (args[1] != 0) showGameObject(args[1])
    //         })
    //         break
    //     case 1:
    //         funcAddr = find_method("UnityEngine.UI", "ScrollRect", "OnInitializePotentialDrag", 1)
    //         if (funcAddr == 0) break
    //         LOGE("\nEnable Hook OnInitializePotentialDrag at " + funcAddr + "(" + funcAddr.sub(soAddr) + ")" + "\n")
    //         A(funcAddr, (args) => {
    //             LOGW("\n" + getLine(38))
    //             LOGD("public void OnInitializePotentialDrag( " + args[0] + " , " + args[1] + " );")
    //             FakePointerEventData(args[1])
    //         })
    //         break
    //     case 2:
    //         A(find_method("UnityEngine.UI", "PointerInputModule", "ProcessMove", 1), (args) => {
    //             LOGW("\n" + getLine(38))
    //             LOGD("protected virtual Void ProcessMove( " + (args[1]) + " );")
    //             FakePointerEventData(args[1])
    //         })
    //         break
    //     case 3:
    //         A(find_method("UnityEngine.UI", "PointerInputModule", "ProcessDrag", 1), (args) => {
    //             LOGW("\n" + getLine(38))
    //             LOGD("protected virtual Void ProcessDrag( " + (args[1]) + " );")
    //             FakePointerEventData(args[1])
    //         })
    //         break
    //     case 4:
    //         A(find_method("UnityEngine.UI", "BaseInputModule", "HandlePointerExitAndEnter", 2), (args) => {
    //             LOGW("\n" + getLine(38))
    //             LOGD("protected virtual Void HandlePointerExitAndEnter( " + (args[1]) + " , " + (args[2]) + ")")
    //             FakePointerEventData(args[1])
    //         })
    //         break
    //     case 5:
    //         A(find_method("UnityEngine.UI", "PointerEventData", "set_pointerPress", 1), (args) => {
    //             LOGW("\n" + getLine(38))
    //             LOGD("protected virtual Void set_pointerPress( " + (args[1]) + " );")
    //             showGameObject(args[1])
    //         })
    //         break
    //     case 6:
    //         A(find_method("UnityEngine.UI", "PointerInputModule", "GetPointerData", 3), (args) => {
    //             LOGW("\n" + getLine(38))
    //             LOGD("protected virtual Void GetPointerData( " + (args[2]) + " );")
    //             showGameObject(args[1])
    //             showEventData(args[2])
    //         })
    //         break
    //     case 7:
    //         // EventSystem --->  public Void RaycastAll (PointerEventData eventData,List`1 raycastResults)
    //         A(find_method("UnityEngine.UI", "EventSystem", "RaycastAll", 2), (args) => {
    //             LOGW("\n" + getLine(38))
    //             LOGD(`protected virtual Void RaycastAll( ${args[0]} , ${args[1]} , ${args[2]} );`)
    //             FakePointerEventData(args[1])
    //         })
    //         break
    //     case 8:
    //         // PointerInputModule --->  protected PointerEventData GetTouchPointerEventData (Touch input,Boolean pressed,Boolean released)
    //         A(find_method("UnityEngine.UI", "PointerInputModule", "GetTouchPointerEventData", 3), (args) => { }, (ret) => {
    //             LOGW("\n" + getLine(38))
    //             LOGD(`protected virtual Void GetTouchPointerEventData `)
    //             FakePointerEventData(ret)
    //         })
    //     case 9:
    //         // Selectable --->  public virtual Void OnPointerExit (PointerEventData eventData)
    //         A(find_method("UnityEngine.UI", "Selectable", "OnPointerExit", 1), (args) => {
    //             LOGW("\n" + getLine(38))
    //             LOGD("protected virtual Void OnPointerExit( " + (args[1]) + " );")
    //             FakePointerEventData(args[1])
    //         })
    //         break
    // }

    // function FakePointerEventData(eventData: any) {
    //     if (eventData == 0) return
    //     let gameObj = f_get_pointerEnter(eventData)
    //     if (gameObj != 0) showGameObject(gameObj)
    //     // showTransform(f_getTransform(gameObj))
    //     // showEventData(pointerEventData)
    // }
}

const OnButtonClick = () => {

}

export { OnPointerClick, OnButtonClick }

declare global {
    var HookOnPointerClick: () => void;
    var B_Button: () => void;
}

globalThis.HookOnPointerClick = OnPointerClick;
globalThis.B_Button = OnButtonClick;
