export const getEventUpdate = <T>(needMethod: boolean = false): T => {
    let local_method: Il2Cpp.Method = Il2Cpp.domain.assembly("UnityEngine.UI").image.class("UnityEngine.EventSystems.EventSystem").method("Update");
    if (needMethod == undefined || needMethod == false) {
        return local_method.virtualAddress as unknown as T
    } else {
        return local_method as unknown as T
    }
}

// UnityEngine.UI.UnityEngine.EventSystems.EventSystem.get_current 0
export const getEventSystem = (): Il2Cpp.EventSystem => Il2Cpp.EventSystem.get_current

export const event_getcurrent_select_gameobj = () => {
    let gObj: Il2Cpp.GameObject | null = getEventSystem().get_currentSelectedGameObject()
    if (gObj == null) LOGE(`Noting to show ...`)
    if (gObj != null) showGameObject(gObj)
}

export const event_get_firstSelectGobj = () => {
    let gObj: Il2Cpp.GameObject | null = getEventSystem().get_firstSelectedGameObject()
    if (gObj != null) showGameObject(gObj)
}

export const event_get_lastSelectGobj = () => {
    let gObj: Il2Cpp.GameObject | null = getEventSystem().get_lastSelectedGameObject()
    if (gObj != null) showGameObject(gObj)
}

declare global {
    var getEventUpdate: <T>(needMethod?: boolean) => T
    var showCurrentEventGobj: () => void
    var showFirstEventGobj: () => void
    var showLastEventGobj: () => void
}

globalThis.getEventUpdate = getEventUpdate
globalThis.showCurrentEventGobj = event_getcurrent_select_gameobj
globalThis.showFirstEventGobj = event_get_firstSelectGobj
globalThis.showLastEventGobj = event_get_lastSelectGobj