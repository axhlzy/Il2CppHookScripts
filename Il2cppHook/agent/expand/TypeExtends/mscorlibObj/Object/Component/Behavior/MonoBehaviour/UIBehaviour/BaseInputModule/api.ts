import { cache } from "decorator-cache-getter"

class UnityEngine_EventSystems_BaseInputModule_API {
    // protected Void .ctor()
    @cache
    static get __ctor() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseInputModule", ".ctor", 0, [], "void", ["pointer"])
    }

    // public BaseInput get_input()
    @cache
    static get _get_input() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseInputModule", "get_input", 0, [], "pointer", ["pointer"])
    }

    // public BaseInput get_inputOverride()
    @cache
    static get _get_inputOverride() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseInputModule", "get_inputOverride", 0, [], "pointer", ["pointer"])
    }

    // public Void set_inputOverride(BaseInput value)
    @cache
    static get _set_inputOverride() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseInputModule", "set_inputOverride", 1, ["UnityEngine.EventSystems.BaseInput"], "void", ["pointer", "pointer"])
    }

    // protected EventSystem get_eventSystem()
    @cache
    static get _get_eventSystem() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseInputModule", "get_eventSystem", 0, [], "pointer", ["pointer"])
    }

    // protected override Void OnEnable()
    @cache
    static get _OnEnable() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseInputModule", "OnEnable", 0, [], "void", ["pointer"])
    }

    // protected override Void OnDisable()
    @cache
    static get _OnDisable() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseInputModule", "OnDisable", 0, [], "void", ["pointer"])
    }

    // public abstract Void Process()
    @cache
    static get _Process() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseInputModule", "Process", 0, [], "void", ["pointer"])
    }

    // protected static RaycastResult FindFirstRaycast(RaycastResult> candidates)
    @cache
    static get _FindFirstRaycast() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseInputModule", "FindFirstRaycast", 1, ["System.Collections.Generic.List<UnityEngine.EventSystems.RaycastResult>"], "pointer", ["pointer"])
    }

    // protected static MoveDirection DetermineMoveDirection(Single x,Single y)
    @cache
    static get _DetermineMoveDirection() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseInputModule", "DetermineMoveDirection", 2, ["System.Single", "System.Single"], "pointer", ["pointer", "pointer"])
    }

    // protected static MoveDirection DetermineMoveDirection(Single x,Single y,Single deadZone)
    @cache
    static get _DetermineMoveDirection_x_y_deadZone() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseInputModule", "DetermineMoveDirection", 3, ["System.Single", "System.Single", "System.Single"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // protected static GameObject FindCommonRoot(GameObject g1,GameObject g2)
    @cache
    static get _FindCommonRoot() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseInputModule", "FindCommonRoot", 2, ["UnityEngine.GameObject", "UnityEngine.GameObject"], "pointer", ["pointer", "pointer"])
    }

    // protected Void HandlePointerExitAndEnter(PointerEventData currentPointerData,GameObject newEnterTarget)
    @cache
    static get _HandlePointerExitAndEnter() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseInputModule", "HandlePointerExitAndEnter", 2, ["UnityEngine.EventSystems.PointerEventData", "UnityEngine.GameObject"], "void", ["pointer", "pointer", "pointer"])
    }

    // protected virtual AxisEventData GetAxisEventData(Single x,Single y,Single moveDeadZone)
    @cache
    static get _GetAxisEventData() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseInputModule", "GetAxisEventData", 3, ["System.Single", "System.Single", "System.Single"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // protected virtual BaseEventData GetBaseEventData()
    @cache
    static get _GetBaseEventData() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseInputModule", "GetBaseEventData", 0, [], "pointer", ["pointer"])
    }

    // public virtual Boolean IsPointerOverGameObject(Int32 pointerId)
    @cache
    static get _IsPointerOverGameObject() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseInputModule", "IsPointerOverGameObject", 1, ["System.Int32"], "pointer", ["pointer", "pointer"])
    }

    // public virtual Boolean ShouldActivateModule()
    @cache
    static get _ShouldActivateModule() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseInputModule", "ShouldActivateModule", 0, [], "pointer", ["pointer"])
    }

    // public virtual Void DeactivateModule()
    @cache
    static get _DeactivateModule() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseInputModule", "DeactivateModule", 0, [], "void", ["pointer"])
    }

    // public virtual Void ActivateModule()
    @cache
    static get _ActivateModule() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseInputModule", "ActivateModule", 0, [], "void", ["pointer"])
    }

    // public virtual Void UpdateModule()
    @cache
    static get _UpdateModule() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseInputModule", "UpdateModule", 0, [], "void", ["pointer"])
    }

    // public virtual Boolean IsModuleSupported()
    @cache
    static get _IsModuleSupported() {
        return Il2Cpp.Api.o("UnityEngine.UI", "UnityEngine.EventSystems.BaseInputModule", "IsModuleSupported", 0, [], "pointer", ["pointer"])
    }

}

Il2Cpp.Api.BaseInputModule = UnityEngine_EventSystems_BaseInputModule_API

declare global {
    namespace Il2Cpp.Api {
        class BaseInputModule extends UnityEngine_EventSystems_BaseInputModule_API { }
    }
}

export { }