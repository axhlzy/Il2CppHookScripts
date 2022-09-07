import { GameObjectImpl } from "../../../../../GameObject/class"
import { UnityEngine_EventSystems_UIBehaviour_Impl } from "../class"

type UnityEngine_EventSystems_AxisEventData = NativePointer
type UnityEngine_EventSystems_EventSystem = NativePointer
type UnityEngine_EventSystems_BaseEventData = NativePointer
type UnityEngine_EventSystems_BaseInput = NativePointer
type UnityEngine_EventSystems_MoveDirection = NativePointer
type UnityEngine_EventSystems_PointerEventData = NativePointer
type System_Single = number
type System_Boolean = boolean
type System_Int32 = number

class UnityEngine_EventSystems_BaseInputModule_Impl extends UnityEngine_EventSystems_UIBehaviour_Impl {

    // m_RaycastResultCache: System_Collections.Generic.List<UnityEngine.EventSystems.RaycastResult> = lfv(this.handle, "m_RaycastResultCache") as unknown as System_Collections.Generic.List<UnityEngine.EventSystems.RaycastResult>
    m_AxisEventData: UnityEngine_EventSystems_AxisEventData = lfv(this.handle, "m_AxisEventData") as unknown as UnityEngine_EventSystems_AxisEventData
    m_EventSystem: UnityEngine_EventSystems_EventSystem = lfv(this.handle, "m_EventSystem") as unknown as UnityEngine_EventSystems_EventSystem
    m_BaseEventData: UnityEngine_EventSystems_BaseEventData = lfv(this.handle, "m_BaseEventData") as unknown as UnityEngine_EventSystems_BaseEventData
    m_InputOverride: UnityEngine_EventSystems_BaseInput = lfv(this.handle, "m_InputOverride") as unknown as UnityEngine_EventSystems_BaseInput
    m_DefaultInput: UnityEngine_EventSystems_BaseInput = lfv(this.handle, "m_DefaultInput") as unknown as UnityEngine_EventSystems_BaseInput

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    _ctor(): void {
        return Il2Cpp.Api.BaseInputModule.__ctor(this.handle)
    }

    get_input(): UnityEngine_EventSystems_BaseInput {
        return Il2Cpp.Api.BaseInputModule._get_input(this.handle)
    }

    get_inputOverride(): UnityEngine_EventSystems_BaseInput {
        return Il2Cpp.Api.BaseInputModule._get_inputOverride(this.handle)
    }

    set_inputOverride(value: UnityEngine_EventSystems_BaseInput): void {
        return Il2Cpp.Api.BaseInputModule._set_inputOverride(this.handle, value)
    }

    get_eventSystem(): UnityEngine_EventSystems_EventSystem {
        return Il2Cpp.Api.BaseInputModule._get_eventSystem(this.handle)
    }

    OnEnable(): void {
        return Il2Cpp.Api.BaseInputModule._OnEnable(this.handle)
    }

    OnDisable(): void {
        return Il2Cpp.Api.BaseInputModule._OnDisable(this.handle)
    }

    Process(): void {
        return Il2Cpp.Api.BaseInputModule._Process(this.handle)
    }

    // static FindFirstRaycast(candidates: System_Collections.Generic.List<UnityEngine.EventSystems.RaycastResult>): UnityEngine_EventSystems.RaycastResult {
    //     return Il2Cpp.Api.BaseInputModule._FindFirstRaycast(candidates)
    // }

    static DetermineMoveDirection(x: System_Single, y: System_Single): UnityEngine_EventSystems_MoveDirection {
        return Il2Cpp.Api.BaseInputModule._DetermineMoveDirection(x, y)
    }

    static DetermineMoveDirection_3(x: System_Single, y: System_Single, deadZone: System_Single): UnityEngine_EventSystems_MoveDirection {
        return Il2Cpp.Api.BaseInputModule._DetermineMoveDirection(x, y, deadZone)
    }

    static FindCommonRoot(g1: GameObjectImpl, g2: GameObjectImpl): GameObjectImpl {
        return Il2Cpp.Api.BaseInputModule._FindCommonRoot(g1, g2)
    }

    HandlePointerExitAndEnter(currentPointerData: UnityEngine_EventSystems_PointerEventData, newEnterTarget: GameObjectImpl): void {
        return Il2Cpp.Api.BaseInputModule._HandlePointerExitAndEnter(this.handle, currentPointerData, newEnterTarget)
    }

    GetAxisEventData(x: System_Single, y: System_Single, moveDeadZone: System_Single): UnityEngine_EventSystems_AxisEventData {
        return Il2Cpp.Api.BaseInputModule._GetAxisEventData(this.handle, x, y, moveDeadZone)
    }

    GetBaseEventData(): UnityEngine_EventSystems_BaseEventData {
        return Il2Cpp.Api.BaseInputModule._GetBaseEventData(this.handle)
    }

    IsPointerOverGameObject(pointerId: System_Int32): System_Boolean {
        return Il2Cpp.Api.BaseInputModule._IsPointerOverGameObject(this.handle, pointerId)
    }

    ShouldActivateModule(): System_Boolean {
        return Il2Cpp.Api.BaseInputModule._ShouldActivateModule(this.handle)
    }

    DeactivateModule(): void {
        return Il2Cpp.Api.BaseInputModule._DeactivateModule(this.handle)
    }

    ActivateModule(): void {
        return Il2Cpp.Api.BaseInputModule._ActivateModule(this.handle)
    }

    UpdateModule(): void {
        return Il2Cpp.Api.BaseInputModule._UpdateModule(this.handle)
    }

    IsModuleSupported(): System_Boolean {
        return Il2Cpp.Api.BaseInputModule._IsModuleSupported(this.handle)
    }

}

Il2Cpp.BaseInputModule = UnityEngine_EventSystems_BaseInputModule_Impl

declare global {
    namespace Il2Cpp {
        class BaseInputModule extends UnityEngine_EventSystems_BaseInputModule_Impl { }
    }
}

export { UnityEngine_EventSystems_BaseInputModule_Impl }