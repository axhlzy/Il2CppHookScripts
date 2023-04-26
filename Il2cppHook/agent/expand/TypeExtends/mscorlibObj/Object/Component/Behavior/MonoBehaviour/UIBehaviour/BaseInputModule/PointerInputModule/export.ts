import { FakePointerEventData } from "../../../Selectable/Button/export"

export { }

declare global {
    var HookGetTouchPointerEventData: () => void
}

globalThis.HookGetTouchPointerEventData = () => {
    A(Il2Cpp.Api.PointerInputModule._GetTouchPointerEventData, (args) => {
        LOGW("\n" + getLine(38))
        // protected PointerEventData GetTouchPointerEventData(Touch input, Boolean& pressed, Boolean& released)
        LOGD(`protected PointerEventData GetTouchPointerEventData(instane ${new Il2Cpp.Object(args[0])},Touch ${args[1]}, Boolean& ${readBoolean(args[2])}, Boolean& ${readBoolean(args[3])})`)
    }, (ret) => {
        FakePointerEventData(ret)
    })
}