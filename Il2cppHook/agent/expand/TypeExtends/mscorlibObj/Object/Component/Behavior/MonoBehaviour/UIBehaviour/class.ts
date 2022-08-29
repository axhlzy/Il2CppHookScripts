import { UnityEngine_MonoBehaviour_Impl } from "../class"

class UnityEngine_EventSystems_UIBehaviour_Impl extends UnityEngine_MonoBehaviour_Impl {

    constructor(handle: NativePointerValue) {
        super(handle)
    }

    Awake(): void {
        return Il2Cpp.Api.UIBehaviour._Awake(this.handle)
    }

    OnEnable(): void {
        return Il2Cpp.Api.UIBehaviour._OnEnable(this.handle)
    }

    Start(): void {
        return Il2Cpp.Api.UIBehaviour._Start(this.handle)
    }

    OnDisable(): void {
        return Il2Cpp.Api.UIBehaviour._OnDisable(this.handle)
    }

    OnDestroy(): void {
        return Il2Cpp.Api.UIBehaviour._OnDestroy(this.handle)
    }

    IsActive(): boolean {
        return Il2Cpp.Api.UIBehaviour._IsActive(this.handle)
    }

    OnRectTransformDimensionsChange(): void {
        return Il2Cpp.Api.UIBehaviour._OnRectTransformDimensionsChange(this.handle)
    }

    OnBeforeTransformParentChanged(): void {
        return Il2Cpp.Api.UIBehaviour._OnBeforeTransformParentChanged(this.handle)
    }

    OnTransformParentChanged(): void {
        return Il2Cpp.Api.UIBehaviour._OnTransformParentChanged(this.handle)
    }

    OnDidApplyAnimationProperties(): void {
        return Il2Cpp.Api.UIBehaviour._OnDidApplyAnimationProperties(this.handle)
    }

    OnCanvasGroupChanged(): void {
        return Il2Cpp.Api.UIBehaviour._OnCanvasGroupChanged(this.handle)
    }

    OnCanvasHierarchyChanged(): void {
        return Il2Cpp.Api.UIBehaviour._OnCanvasHierarchyChanged(this.handle)
    }

    IsDestroyed(): boolean {
        return Il2Cpp.Api.UIBehaviour._IsDestroyed(this.handle)
    }

    _ctor(): void {
        return Il2Cpp.Api.UIBehaviour.__ctor(this.handle)
    }
}

declare global {
    namespace Il2Cpp {
        class UIBehaviour extends UnityEngine_EventSystems_UIBehaviour_Impl { }
    }
}

export { UnityEngine_EventSystems_UIBehaviour_Impl }