import { getEventSystem } from "../../Object/Component/Behavior/MonoBehaviour/UIBehaviour/EventSystem/export"

export const HookAddListener = () => {
    // let local_ptr: NativePointer = find_method("UnityEngine.CoreModule", "UnityEvent", "AddListener", 1)
    let local_ptr: NativePointer = Il2Cpp.Api.UnityEvent._AddListener
    if (!local_ptr.isNull()) {
        A(local_ptr, (args: InvocationArguments) => {
            let instance: Il2Cpp.Object = new Il2Cpp.Object(args[0])
            let action: NativePointer = args[1]
            let acttionToString: string = new mscorlib.Delegate(action).toString()
            let currentClickGobj: Il2Cpp.GameObject | null = getEventSystem().get_currentSelectedGameObject()
            LOGD(`\n[*] HookAddListener : ${getObjName(instance.handle)} @ ${instance.handle}`)
            LOGZ(`\tAction\t\t->  ${acttionToString}`)
            if (currentClickGobj != null) LOGZ(`\tGameObject\t->  ${currentClickGobj.toString()} @ ${currentClickGobj.handle}`)
        })
    }
}

declare global {
    var HookAddListener_UnityEvent: () => void
}

globalThis.HookAddListener_UnityEvent = HookAddListener