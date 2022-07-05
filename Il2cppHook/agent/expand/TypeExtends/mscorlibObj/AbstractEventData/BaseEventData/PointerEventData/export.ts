import { PointerEventImpl } from "./class"

const showEventData = (eventData: NativePointer): void => {
    LOGO(`${getLine(15)} EventData ${getLine(15)}`)

    let eventDataPack = new PointerEventImpl(eventData)
    let click_vector2 = allocVector()
    callFunction(find_method("UnityEngine.UI", "PointerEventData", "get_position", 0), click_vector2, eventData)
    LOGD("ClickPositon\t--->\t" + click_vector2.readFloat() + "\t" + click_vector2.add(p_size).readFloat())
    LOGD("clickTime\t--->\t" + eventDataPack.get_clickTime())
    LOGD("clickCount\t--->\t" + eventDataPack.get_clickCount())

    let delta_vector2 = allocVector()
    callFunction(find_method("UnityEngine.UI", "PointerEventData", "get_delta", 0), allocVector(), eventData)
    LOGD("delta\t\t--->\t" + delta_vector2.readFloat() + "\t" + delta_vector2.add(p_size).readFloat())
}

export { showEventData }

declare global {
    var showEventData: (eventData: NativePointer) => void;
}

globalThis.showEventData = showEventData;