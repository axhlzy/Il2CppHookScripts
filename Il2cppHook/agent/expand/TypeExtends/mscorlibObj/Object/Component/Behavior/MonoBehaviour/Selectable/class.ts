import { UnityEngine_Vector3_Impl as UnityEngine_Vector3 } from "../../../../../ValueType/Vector3/class"
import { UnityEngine_Vector2_Impl as UnityEngine_Vector2 } from "../../../../../ValueType/Vector2/class"
import { UnityEngine_Color_Impl as UnityEngine_Color } from "../../../../../ValueType/Color/class"
import { UnityEngine_EventSystems_UIBehaviour_Impl as UnityEngine_EventSystems_UIBehaviour } from "../UIBehaviour/class"
import { UnityEngine_EventSystems_PointerEventData_Impl as PointerEventData } from "../../../../../AbstractEventData/BaseEventData/PointerEventData/class"
import { UnityEngine_EventSystems_BaseEventData_Impl as BaseEventData } from "../../../../../AbstractEventData/BaseEventData/class"
import { UnityEngine_UI_Graphic_Impl as Graphic } from "../UIBehaviour/Graphic/class"
import { PackList } from "../../../../../../../../bridge/fix/packer/packList"

type UnityEngine_UI_Navigation = NativePointer
type UnityEngine_UI_Selectable_Impl_Transition = NativePointer
type UnityEngine_UI_SpriteState = NativePointer
type UnityEngine_UI_ColorBlock = NativePointer
type UnityEngine_UI_AnimationTriggers = NativePointer
type UnityEngine_UI_Graphic = NativePointer
type UnityEngine_UI_Image = NativePointer
type UnityEngine_Animator = NativePointer
type UnityEngine_UI_Selectable_Impl_SelectionState = NativePointer
type UnityEngine_RectTransform = NativePointer
type UnityEngine_EventSystems_AxisEventData = NativePointer
type UnityEngine_Sprite = NativePointer

class UnityEngine_UI_Selectable_Impl extends UnityEngine_EventSystems_UIBehaviour {

    // s_Selectables: NativePointer = lfv(this.handle, "s_Selectables") as unknown as NativePointer
    // s_SelectableCount: number = lfv(this.handle, "s_SelectableCount") as unknown as number
    // m_EnableCalled: boolean = lfv(this.handle, "m_EnableCalled") as unknown as boolean
    m_Navigation: UnityEngine_UI_Navigation
    m_Transition: UnityEngine_UI_Selectable_Impl_Transition
    m_Colors: UnityEngine_UI_ColorBlock
    m_SpriteState: UnityEngine_UI_SpriteState
    m_AnimationTriggers: UnityEngine_UI_AnimationTriggers
    m_Interactable: boolean
    // m_TargetGraphic: Graphic = new Graphic(lfv(this.handle, "m_TargetGraphic"))
    m_GroupsAllowInteraction: boolean
    // m_CurrentIndex: number = lfv(this.handle, "m_CurrentIndex").toInt32()
    // < isPointerInside > k__BackingField: boolean = lfv(this.handle, "<isPointerInside>k__BackingField") as unknown as boolean
    //     < isPointerDown > k__BackingField: boolean = lfv(this.handle, "<isPointerDown>k__BackingField") as unknown as boolean
    //         < hasSelection > k__BackingField: boolean = lfv(this.handle, "<hasSelection>k__BackingField") as unknown as boolean
    // m_CanvasGroupCache: System_Collections.Generic.List<UnityEngine.CanvasGroup> = lfv(this.handle, "m_CanvasGroupCache") as unknown as System_Collections.Generic.List<UnityEngine.CanvasGroup>


    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
        this.m_Navigation = lfv(this.handle, "m_Navigation") as UnityEngine_UI_Navigation
        this.m_Transition = lfv(this.handle, "m_Transition") as UnityEngine_UI_Selectable_Impl_Transition
        this.m_Colors = lfv(this.handle, "m_Colors") as UnityEngine_UI_ColorBlock
        this.m_SpriteState = lfv(this.handle, "m_SpriteState") as UnityEngine_UI_SpriteState
        this.m_AnimationTriggers = lfv(this.handle, "m_AnimationTriggers") as UnityEngine_UI_AnimationTriggers
        this.m_Interactable = lfv(this.handle, "m_Interactable").toInt32() == 0
        // this.m_TargetGraphic = new Graphic(lfv(this.handle, "m_TargetGraphic"))
        this.m_GroupsAllowInteraction = lfv(this.handle, "m_GroupsAllowInteraction").toInt32() == 0
        // this.m_CurrentIndex = lfv(this.handle, "m_CurrentIndex").toInt32()
    }

    static get_allSelectablesArray(): UnityEngine_UI_Selectable_Impl[] {
        return Il2Cpp.Api.Selectable._get_allSelectablesArray()
    }

    static get_allSelectableCount(): number {
        return Il2Cpp.Api.Selectable._get_allSelectableCount()
    }

    // static get_allSelectables(): System_Collections.Generic.List<UnityEngine.UI.Selectable> {
    //     return Il2Cpp.Api.Selectable._get_allSelectables()
    // }
    static get_allSelectables(): PackList {
        return new PackList(Il2Cpp.Api.Selectable._get_allSelectables())
    }

    static AllSelectablesNoAlloc(selectables: UnityEngine_UI_Selectable_Impl[]): number {
        return Il2Cpp.Api.Selectable._AllSelectablesNoAlloc(selectables)
    }

    get_navigation(): UnityEngine_UI_Navigation {
        return Il2Cpp.Api.Selectable._get_navigation(this.handle)
    }

    set_navigation(value: UnityEngine_UI_Navigation): void {
        return Il2Cpp.Api.Selectable._set_navigation(this.handle, value)
    }

    get_transition(): UnityEngine_UI_Selectable_Impl_Transition {
        return Il2Cpp.Api.Selectable._get_transition(this.handle)
    }

    set_transition(value: UnityEngine_UI_Selectable_Impl_Transition): void {
        return Il2Cpp.Api.Selectable._set_transition(this.handle, value)
    }

    get_colors(): UnityEngine_UI_ColorBlock {
        return Il2Cpp.Api.Selectable._get_colors(this.handle)
    }

    set_colors(value: UnityEngine_UI_ColorBlock): void {
        return Il2Cpp.Api.Selectable._set_colors(this.handle, value)
    }

    get_spriteState(): UnityEngine_UI_SpriteState {
        return Il2Cpp.Api.Selectable._get_spriteState(this.handle)
    }

    set_spriteState(value: UnityEngine_UI_SpriteState): void {
        return Il2Cpp.Api.Selectable._set_spriteState(this.handle, value)
    }

    get_animationTriggers(): UnityEngine_UI_AnimationTriggers {
        return Il2Cpp.Api.Selectable._get_animationTriggers(this.handle)
    }

    set_animationTriggers(value: UnityEngine_UI_AnimationTriggers): void {
        return Il2Cpp.Api.Selectable._set_animationTriggers(this.handle, value)
    }

    get_targetGraphic(): UnityEngine_UI_Graphic {
        return Il2Cpp.Api.Selectable._get_targetGraphic(this.handle)
    }

    set_targetGraphic(value: UnityEngine_UI_Graphic): void {
        return Il2Cpp.Api.Selectable._set_targetGraphic(this.handle, value)
    }

    get_interactable(): boolean {
        return Il2Cpp.Api.Selectable._get_interactable(this.handle)
    }

    set_interactable(value: boolean): void {
        return Il2Cpp.Api.Selectable._set_interactable(this.handle, value)
    }

    get_isPointerInside(): boolean {
        return Il2Cpp.Api.Selectable._get_isPointerInside(this.handle)
    }

    set_isPointerInside(value: boolean): void {
        return Il2Cpp.Api.Selectable._set_isPointerInside(this.handle, value)
    }

    get_isPointerDown(): boolean {
        return Il2Cpp.Api.Selectable._get_isPointerDown(this.handle)
    }

    set_isPointerDown(value: boolean): void {
        return Il2Cpp.Api.Selectable._set_isPointerDown(this.handle, value)
    }

    get_hasSelection(): boolean {
        return Il2Cpp.Api.Selectable._get_hasSelection(this.handle)
    }

    set_hasSelection(value: boolean): void {
        return Il2Cpp.Api.Selectable._set_hasSelection(this.handle, value)
    }

    _ctor(): void {
        return Il2Cpp.Api.Selectable.__ctor(this.handle)
    }

    get_image(): UnityEngine_UI_Image {
        return Il2Cpp.Api.Selectable._get_image(this.handle)
    }

    set_image(value: UnityEngine_UI_Image): void {
        return Il2Cpp.Api.Selectable._set_image(this.handle, value)
    }

    get_animator(): UnityEngine_Animator {
        return Il2Cpp.Api.Selectable._get_animator(this.handle)
    }

    Awake(): void {
        return Il2Cpp.Api.Selectable._Awake(this.handle)
    }

    OnCanvasGroupChanged(): void {
        return Il2Cpp.Api.Selectable._OnCanvasGroupChanged(this.handle)
    }

    IsInteractable(): boolean {
        return Il2Cpp.Api.Selectable._IsInteractable(this.handle)
    }

    OnDidApplyAnimationProperties(): void {
        return Il2Cpp.Api.Selectable._OnDidApplyAnimationProperties(this.handle)
    }

    OnEnable(): void {
        return Il2Cpp.Api.Selectable._OnEnable(this.handle)
    }

    OnTransformParentChanged(): void {
        return Il2Cpp.Api.Selectable._OnTransformParentChanged(this.handle)
    }

    OnSetProperty(): void {
        return Il2Cpp.Api.Selectable._OnSetProperty(this.handle)
    }

    OnDisable(): void {
        return Il2Cpp.Api.Selectable._OnDisable(this.handle)
    }

    get_currentSelectionState(): UnityEngine_UI_Selectable_Impl_SelectionState {
        return Il2Cpp.Api.Selectable._get_currentSelectionState(this.handle)
    }

    InstantClearState(): void {
        return Il2Cpp.Api.Selectable._InstantClearState(this.handle)
    }

    DoStateTransition(state: UnityEngine_UI_Selectable_Impl_SelectionState, instant: boolean): void {
        return Il2Cpp.Api.Selectable._DoStateTransition(this.handle, state, instant)
    }

    FindSelectable(dir: UnityEngine_Vector3): UnityEngine_UI_Selectable_Impl {
        return Il2Cpp.Api.Selectable._FindSelectable(this.handle, dir)
    }

    static GetPointOnRectEdge(rect: UnityEngine_RectTransform, dir: UnityEngine_Vector2): UnityEngine_Vector3 {
        return Il2Cpp.Api.Selectable._GetPointOnRectEdge(rect, dir)
    }

    Navigate(eventData: UnityEngine_EventSystems_AxisEventData, sel: UnityEngine_UI_Selectable_Impl): void {
        return Il2Cpp.Api.Selectable._Navigate(this.handle, eventData, sel)
    }

    FindSelectableOnLeft(): UnityEngine_UI_Selectable_Impl {
        return Il2Cpp.Api.Selectable._FindSelectableOnLeft(this.handle)
    }

    FindSelectableOnRight(): UnityEngine_UI_Selectable_Impl {
        return Il2Cpp.Api.Selectable._FindSelectableOnRight(this.handle)
    }

    FindSelectableOnUp(): UnityEngine_UI_Selectable_Impl {
        return Il2Cpp.Api.Selectable._FindSelectableOnUp(this.handle)
    }

    FindSelectableOnDown(): UnityEngine_UI_Selectable_Impl {
        return Il2Cpp.Api.Selectable._FindSelectableOnDown(this.handle)
    }

    OnMove(eventData: UnityEngine_EventSystems_AxisEventData): void {
        return Il2Cpp.Api.Selectable._OnMove(this.handle, eventData)
    }

    StartColorTween(targetColor: UnityEngine_Color, instant: boolean): void {
        return Il2Cpp.Api.Selectable._StartColorTween(this.handle, targetColor, instant)
    }

    DoSpriteSwap(newSprite: UnityEngine_Sprite): void {
        return Il2Cpp.Api.Selectable._DoSpriteSwap(this.handle, newSprite)
    }

    TriggerAnimation(triggername: string): void {
        return Il2Cpp.Api.Selectable._TriggerAnimation(this.handle, triggername)
    }

    IsHighlighted(): boolean {
        return Il2Cpp.Api.Selectable._IsHighlighted(this.handle)
    }

    IsPressed(): boolean {
        return Il2Cpp.Api.Selectable._IsPressed(this.handle)
    }

    EvaluateAndTransitionToSelectionState(): void {
        return Il2Cpp.Api.Selectable._EvaluateAndTransitionToSelectionState(this.handle)
    }

    OnPointerDown(eventData: PointerEventData): void {
        return Il2Cpp.Api.Selectable._OnPointerDown(this.handle, eventData)
    }

    OnPointerUp(eventData: PointerEventData): void {
        return Il2Cpp.Api.Selectable._OnPointerUp(this.handle, eventData)
    }

    OnPointerEnter(eventData: PointerEventData): void {
        return Il2Cpp.Api.Selectable._OnPointerEnter(this.handle, eventData)
    }

    OnPointerExit(eventData: PointerEventData): void {
        return Il2Cpp.Api.Selectable._OnPointerExit(this.handle, eventData)
    }

    OnSelect(eventData: BaseEventData): void {
        return Il2Cpp.Api.Selectable._OnSelect(this.handle, eventData)
    }

    OnDeselect(eventData: BaseEventData): void {
        return Il2Cpp.Api.Selectable._OnDeselect(this.handle, eventData)
    }

    Select(): void {
        return Il2Cpp.Api.Selectable._Select(this.handle)
    }

    static _cctor(): void {
        return Il2Cpp.Api.Selectable.__cctor()
    }

}

Il2Cpp.Selectable = UnityEngine_UI_Selectable_Impl

declare global {
    namespace Il2Cpp {
        class Selectable extends UnityEngine_UI_Selectable_Impl { }
    }
}

export { UnityEngine_UI_Selectable_Impl }