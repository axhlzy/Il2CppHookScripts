import { PackList } from "../../../../../../../../../bridge/fix/packer/packList"
import { UnityEngine_EventSystems_BaseEventData_Impl as BaseEventData } from "../../../../../../AbstractEventData/BaseEventData/class"
import { UnityEngine_EventSystems_PointerEventData_Impl as PointerEventData } from "../../../../../../AbstractEventData/BaseEventData/PointerEventData/class"
import { UnityEngine_EventSystems_RaycastResult_Impl as RaycastResult } from "../../../../../../ValueType/RaycastResult/class"
import { GameObjectImpl as GameObject } from "../../../../../GameObject/class"
import { UnityEngine_EventSystems_BaseInputModule_Impl as BaseInputModule } from "../BaseInputModule/class"
import { UnityEngine_EventSystems_UIBehaviour_Impl } from "../class"

type System_Void = void
type System_Boolean = boolean
type System_Int32 = number
type System_String = string

class UnityEngine_EventSystems_EventSystem_Impl extends UnityEngine_EventSystems_UIBehaviour_Impl {

    m_SystemInputModules: PackList = new PackList(lfv(this.handle, "m_SystemInputModules"))
    m_CurrentInputModule: BaseInputModule = new BaseInputModule(lfv(this.handle, "m_CurrentInputModule"))
    m_EventSystems: PackList = new PackList(lfv(this.handle, "m_EventSystems"))
    m_FirstSelected: GameObject = new GameObject(lfv(this.handle, "m_FirstSelected"))
    m_sendNavigationEvents: System_Boolean = lfv(this.handle, "m_sendNavigationEvents") as unknown as System_Boolean
    m_DragThreshold: System_Int32 = lfv(this.handle, "m_DragThreshold") as unknown as System_Int32
    m_CurrentSelected: GameObject = new GameObject(lfv(this.handle, "m_CurrentSelected"))
    m_HasFocus: System_Boolean = lfv(this.handle, "m_HasFocus") as unknown as System_Boolean
    m_SelectionGuard: System_Boolean = lfv(this.handle, "m_SelectionGuard") as unknown as System_Boolean
    m_DummyData: BaseEventData = new BaseEventData(lfv(this.handle, "m_DummyData"))
    // s_RaycastComparer: System_Comparison<UnityEngine.EventSystems.RaycastResult> = lfv(this.handle, "s_RaycastComparer") as unknown as System_Comparison<UnityEngine.EventSystems.RaycastResult>

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    static get get_current(): UnityEngine_EventSystems_EventSystem_Impl {
        return new UnityEngine_EventSystems_EventSystem_Impl(Il2Cpp.Api.EventSystem._get_current())
    }

    static set set_current(value: UnityEngine_EventSystems_EventSystem_Impl) {
        Il2Cpp.Api.EventSystem._set_current(value.handle)
    }

    get_sendNavigationEvents(): System_Boolean {
        return Il2Cpp.Api.EventSystem._get_sendNavigationEvents(this.handle)
    }

    set_sendNavigationEvents(value: System_Boolean): System_Void {
        return Il2Cpp.Api.EventSystem._set_sendNavigationEvents(this.handle, value)
    }

    get_pixelDragThreshold(): System_Int32 {
        return Il2Cpp.Api.EventSystem._get_pixelDragThreshold(this.handle)
    }

    set_pixelDragThreshold(value: System_Int32): System_Void {
        return Il2Cpp.Api.EventSystem._set_pixelDragThreshold(this.handle, value)
    }

    get_currentInputModule(): BaseInputModule {
        return new BaseInputModule(Il2Cpp.Api.EventSystem._get_currentInputModule(this.handle))
    }

    get_firstSelectedGameObject(): GameObject {
        return new GameObject(Il2Cpp.Api.EventSystem._get_firstSelectedGameObject(this.handle))
    }

    set_firstSelectedGameObject(value: GameObject): System_Void {
        return Il2Cpp.Api.EventSystem._set_firstSelectedGameObject(this.handle, value.handle)
    }

    get_currentSelectedGameObject(): GameObject | null {
        let local: NativePointer = Il2Cpp.Api.EventSystem._get_currentSelectedGameObject(this.handle)
        if (local.isNull()) return null
        return new GameObject(local)
    }

    get_lastSelectedGameObject(): GameObject {
        return new GameObject(Il2Cpp.Api.EventSystem._get_lastSelectedGameObject(this.handle))
    }

    get_isFocused(): System_Boolean {
        return Il2Cpp.Api.EventSystem._get_isFocused(this.handle)
    }

    _ctor(): System_Void {
        return Il2Cpp.Api.EventSystem.__ctor(this.handle)
    }

    UpdateModules(): System_Void {
        return Il2Cpp.Api.EventSystem._UpdateModules(this.handle)
    }

    get_alreadySelecting(): System_Boolean {
        return Il2Cpp.Api.EventSystem._get_alreadySelecting(this.handle)
    }

    SetSelectedGameObject(selected: GameObject, pointer: BaseEventData): System_Void {
        return Il2Cpp.Api.EventSystem._SetSelectedGameObject(this.handle, selected.handle, pointer.handle)
    }

    get_baseEventDataCache(): BaseEventData {
        return new BaseEventData(Il2Cpp.Api.EventSystem._get_baseEventDataCache(this.handle))
    }

    SetSelectedGameObject_1(selected: GameObject): System_Void {
        return Il2Cpp.Api.EventSystem._SetSelectedGameObject(this.handle, selected.handle)
    }

    static RaycastComparer(lhs: RaycastResult, rhs: RaycastResult): System_Int32 {
        return Il2Cpp.Api.EventSystem._RaycastComparer(lhs.handle, rhs.handle).toInt32()
    }

    // RaycastAll(eventData: PointerEventData, raycastResults: System_Collections.Generic.List<UnityEngine.EventSystems.RaycastResult>): System_Void {
    //     return Il2Cpp.Api.EventSystem._RaycastAll(this.handle, eventData, raycastResults)
    // }
    RaycastAll(eventData: PointerEventData, raycastResults: PackList): System_Void {
        return Il2Cpp.Api.EventSystem._RaycastAll(this.handle, eventData.handle, raycastResults.handle)
    }

    IsPointerOverGameObject(): System_Boolean {
        return Il2Cpp.Api.EventSystem._IsPointerOverGameObject(this.handle)
    }

    IsPointerOverGameObject_1(pointerId: System_Int32): System_Boolean {
        return Il2Cpp.Api.EventSystem._IsPointerOverGameObject(this.handle, pointerId)
    }

    OnEnable(): System_Void {
        return Il2Cpp.Api.EventSystem._OnEnable(this.handle)
    }

    OnDisable(): System_Void {
        return Il2Cpp.Api.EventSystem._OnDisable(this.handle)
    }

    TickModules(): System_Void {
        return Il2Cpp.Api.EventSystem._TickModules(this.handle)
    }

    OnApplicationFocus(hasFocus: System_Boolean): System_Void {
        return Il2Cpp.Api.EventSystem._OnApplicationFocus(this.handle, hasFocus)
    }

    Update(): System_Void {
        return Il2Cpp.Api.EventSystem._Update(this.handle)
    }

    ChangeEventModule(module: BaseInputModule): System_Void {
        return Il2Cpp.Api.EventSystem._ChangeEventModule(this.handle, module.handle)
    }

    ToString(): System_String {
        return readU16(Il2Cpp.Api.EventSystem._ToString(this.handle))
    }

    static _cctor(): System_Void {
        return Il2Cpp.Api.EventSystem.__cctor()
    }

}

Il2Cpp.EventSystem = UnityEngine_EventSystems_EventSystem_Impl

declare global {
    namespace Il2Cpp {
        class EventSystem extends UnityEngine_EventSystems_EventSystem_Impl { }
    }
}

export { UnityEngine_EventSystems_EventSystem_Impl }