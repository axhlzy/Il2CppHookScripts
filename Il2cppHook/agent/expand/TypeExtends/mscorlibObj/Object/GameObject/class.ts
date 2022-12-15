import { UnityEngine_Object } from "../class"
import { mscorlib_System_Type_impl as System_Type } from "../../Type/class"
import { UnityEngine_Component_Impl as Component } from "../Component/class"

class GameObjectImpl extends UnityEngine_Object {

    constructor(handle: NativePointer) {
        super(handle)
    }

    ctor_0(): Il2Cpp.GameObject {
        return new Il2Cpp.GameObject(Il2Cpp.Api.GameObject._ctor_0(alloc()))
    }

    ctor_1(name: string): Il2Cpp.GameObject {
        return new Il2Cpp.GameObject(Il2Cpp.Api.GameObject._ctor_1(alloc(), allocUStr(name)))
    }

    // ctor_2(name: string, type: System_Type[]): Il2Cpp.GameObject {
    //     // let types = Il2Cpp.Array.from(type[0].class, type.length)
    //     return Il2Cpp.Api.GameObject._ctor_2(this.handle, allocP(1), allocUStr(name), types)
    // }

    AddComponent(componentType: System_Type): Component {
        return Il2Cpp.Api.GameObject._AddComponent(this.handle, componentType.handle)
    }

    GetComponent(type: System_Type): Component {
        return new Component(Il2Cpp.Api.GameObject._GetComponent(this.handle, type.handle))
    }

    GetComponentInChildren(type: System_Type, includeInactive: boolean): Component {
        return new Component(Il2Cpp.Api.GameObject._GetComponentInChildren(this.handle, type.handle, includeInactive ? ptr(1) : ptr(0)))
    }

    GetComponentInParent(type: System_Type, includeInactive: boolean): Component {
        return new Component(Il2Cpp.Api.GameObject._GetComponentInParent(this.handle, type.handle, includeInactive ? ptr(1) : ptr(0)))
    }

    GetComponentsInternal(type: System_Type, useSearchTypeAsArrayReturnType: boolean = true, recursive: boolean = true, includeInactive: boolean = true, reverse: boolean = true, resultList: NativePointer = ptr(0)): NativePointer {
        resultList = alloc(0x20)
        let ret = Il2Cpp.Api.GameObject._GetComponentsInternal(
            this.handle,
            type.handle,
            useSearchTypeAsArrayReturnType ? ptr(1) : ptr(0),
            recursive ? ptr(1) : ptr(0),
            includeInactive ? ptr(1) : ptr(0),
            reverse ? ptr(1) : ptr(0),
            resultList)
        seeHexA(resultList)
        return ret
    }

    SendMessage(methodName: string, options?: NativePointer): void {
        return Il2Cpp.Api.GameObject._SendMessage(this.handle, allocUStr(methodName), options)
    }

    SetActive(value: boolean): void {
        return Il2Cpp.Api.GameObject._SetActive(this.handle, value ? ptr(1) : ptr(0))
    }

    GetComponentFastPath(type: System_Type, oneFurtherThanResultValue: NativePointer): void {
        return Il2Cpp.Api.GameObject._GetComponentFastPath(this.handle, type.handle, oneFurtherThanResultValue)
    }

    CompareTag(tag: string): boolean {
        return Il2Cpp.Api.GameObject._CompareTag(this.handle, allocUStr(tag))
    }

    get_transform(): Il2Cpp.Transform {
        if (this.handle == ptr(0)) throw new Error("get_transform : GameObject is null")
        return new Il2Cpp.Transform(Il2Cpp.Api.GameObject._get_transform(this.handle))
    }

    get_tag(): string {
        return readU16(Il2Cpp.Api.GameObject._get_tag(this.handle))
    }

    set_layer(value: number): void {
        return Il2Cpp.Api.GameObject._set_layer(this.handle, value)
    }

    get_layer(): number {
        return Il2Cpp.Api.GameObject._get_layer(this.handle)
    }

    get_gameObject(): Il2Cpp.GameObject {
        return new Il2Cpp.GameObject(Il2Cpp.Api.GameObject._get_gameObject(this.handle))
    }

    get_activeSelf(): boolean {
        return Il2Cpp.Api.GameObject._get_activeSelf(this.handle)
    }

    get_activeInHierarchy(): boolean {
        return Il2Cpp.Api.GameObject._get_activeSelf(this.handle)
    }

    // public static extern GameObject Find(string name);
    static Find(path: string): Il2Cpp.GameObject {
        return new Il2Cpp.GameObject(Il2Cpp.Api.GameObject._Find(allocUStr(path)))
    }

    // public static extern GameObject[] FindGameObjectsWithTag(string tag);
    // static FindGameObjectsWithTag_A(tag: string): GameObjectImpl[] {
    //     return new GameObjectImpl(Il2Cpp.Api.GameObject._FindGameObjectsWithTag_A(allocUStr(tag))) as unknown as Il2Cpp.GameObject[]
    // }

    // public static extern GameObject FindGameObjectWithTag(string tag);
    static FindGameObjectWithTag(tag: string): Il2Cpp.GameObject {
        return new Il2Cpp.GameObject(Il2Cpp.Api.GameObject._FindGameObjectWithTag(allocUStr(tag)))
    }

    // public static GameObject FindWithTag(string tag)
    static FindWithTag(tag: string): Il2Cpp.GameObject {
        return new Il2Cpp.GameObject(Il2Cpp.Api.GameObject._FindWithTag(allocUStr(tag)))
    }

    showSelf(): void {
        if (!this.handle.isNull()) showGameObject(this.handle)
    }
}

Il2Cpp.GameObject = GameObjectImpl
declare global {
    namespace Il2Cpp {
        class GameObject extends GameObjectImpl { }
    }
}

export { GameObjectImpl }
