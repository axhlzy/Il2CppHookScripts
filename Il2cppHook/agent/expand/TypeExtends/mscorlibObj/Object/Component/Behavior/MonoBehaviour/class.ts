import { ComponentImpl } from "../../class";

type Transition = NativePointer
type Selectable = NativePointer
type Graphic = NativePointer
type SpriteState = NativePointer
type Navigation = NativePointer
type ColorBlock = NativePointer
class UnityEngine_MonoBehaviour_Impl extends Il2Cpp.Component implements UnityEngine_MonoBehaviour_Interface {

    // m_Transition : Transition
    m_Transition: Transition = lfv(this.handle, "m_Transition")
    // s_SelectableCount : Int32
    s_SelectableCount: number = lfv(this.handle, "s_SelectableCount") as unknown as number
    // s_Selectables : Selectable[]
    s_Selectables: Selectable[] = lfv(this.handle, "s_Selectables") as unknown as Selectable[]
    // m_TargetGraphic : Graphic
    m_TargetGraphic: Graphic = lfv(this.handle, "m_TargetGraphic")
    // m_SpriteState : SpriteState
    m_SpriteState: SpriteState = lfv(this.handle, "m_SpriteState")
    // m_Navigation : Navigation
    m_Navigation: Navigation = lfv(this.handle, "m_Navigation")
    // m_Interactable : Boolean
    m_Interactable: boolean = lfv(this.handle, "m_Interactable") as unknown as boolean
    // m_GroupsAllowInteraction : Boolean
    m_GroupsAllowInteraction: boolean = lfv(this.handle, "m_GroupsAllowInteraction") as unknown as boolean
    // m_EnableCalled : Boolean
    m_EnableCalled: boolean = lfv(this.handle, "m_EnableCalled") as unknown as boolean
    // m_CurrentIndex : Int32
    m_CurrentIndex: number = lfv(this.handle, "m_CurrentIndex") as unknown as number
    // m_Colors : ColorBlock
    m_Colors: ColorBlock = lfv(this.handle, "m_Colors") as unknown as ColorBlock
    // m_CanvasGroupCache : List<CanvasGroup>
    m_CanvasGroupCache: NativePointer = lfv(this.handle, "m_CanvasGroupCache")

    ctor_0(): UnityEngine_MonoBehaviour_Interface {
        return new UnityEngine_MonoBehaviour_Impl(Il2Cpp.Api.MonoBehaviour._ctor(alloc()));
    }

    CancelInvoke_0(): void {
        return Il2Cpp.Api.MonoBehaviour._CancelInvoke(this.handle);
    }

    CancelInvoke_methodName(methodName: string): void {
        return Il2Cpp.Api.MonoBehaviour._CancelInvoke_String(this.handle, allocCStr(methodName));
    }

    InvokeRepeating(methodName: string, time: number, repeatRate: number): void {
        return Il2Cpp.Api.MonoBehaviour._InvokeRepeating(this.handle, allocCStr(methodName), time, repeatRate);
    }

    Invoke(methodName: string, time: number): void {
        return Il2Cpp.Api.MonoBehaviour._Invoke(this.handle, allocCStr(methodName), time);
    }

    IsInvoking_methodName(methodName: string): boolean {
        return Il2Cpp.Api.MonoBehaviour._IsInvoking_String(this.handle, allocCStr(methodName));
    }

    IsInvoking_0(): boolean {
        return Il2Cpp.Api.MonoBehaviour._IsInvoking_0(this.handle);
    }

    print(obj: NativePointer): void {
        return Il2Cpp.Api.MonoBehaviour._print(this.handle, obj);
    }

    StartCoroutine_enumerator(enumerator: NativePointer) {
        return Il2Cpp.Api.MonoBehaviour._StartCoroutine_IEnumerator(this.handle, enumerator);
    }

    StartCoroutine_methodName(methodName: string) {
        return Il2Cpp.Api.MonoBehaviour._StartCoroutine_String(this.handle, allocCStr(methodName));
    }

    StartCoroutine_methodName_obj(methodName: string, obj: NativePointer) {
        return Il2Cpp.Api.MonoBehaviour._StartCoroutine_String_Object(this.handle, allocCStr(methodName), obj);
    }

    StartCoroutine_Auto(enumerator: NativePointer) {
        return Il2Cpp.Api.MonoBehaviour._StartCoroutine_Auto(this.handle, enumerator);
    }

    StopAllCoroutines(): void {
        return Il2Cpp.Api.MonoBehaviour._StopAllCoroutines(this.handle);
    }

    StopCoroutine_coroutine(coroutine: NativePointer): void {
        return Il2Cpp.Api.MonoBehaviour._StopCoroutine_Coroutine(this.handle, coroutine);
    }

    StopCoroutine_methodName(methodName: string): void {
        return Il2Cpp.Api.MonoBehaviour._StopCoroutine_String(this.handle, allocCStr(methodName));
    }

    StopCoroutine_enumerator(enumerator: NativePointer): void {
        return Il2Cpp.Api.MonoBehaviour._StopCoroutine_IEnumerator(this.handle, enumerator);
    }

    set_useGUILayout(value: boolean): void {
        return Il2Cpp.Api.MonoBehaviour._set_useGUILayout(this.handle, value);
    }

    get_useGUILayout(): boolean {
        return Il2Cpp.Api.MonoBehaviour._get_useGUILayout(this.handle);
    }
}

declare global {
    namespace Il2Cpp {
        class MonoBehaviour extends UnityEngine_MonoBehaviour_Impl { }
    }
}

Il2Cpp.MonoBehaviour = UnityEngine_MonoBehaviour_Impl;

export { UnityEngine_MonoBehaviour_Impl as MonoBehaviourImpl }