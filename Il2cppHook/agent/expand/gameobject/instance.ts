import { cache } from "decorator-cache-getter"
import { PTR } from "../../base/enum"
import { PTR2NativePtr } from "../../utils/common"

class Il2cppGameObject extends Il2Cpp.Object implements GameObject {
    ctor_0(): GameObject {
        throw new Error("Method not implemented.")
    }
    ctor_1(name: string): GameObject {
        throw new Error("Method not implemented.")
    }
    ctor_2(name: string, type: Il2Cpp.Type[]): GameObject {
        throw new Error("Method not implemented.")
    }
    AddComponent(componentType: Il2Cpp.Type): Component {
        throw new Error("Method not implemented.")
    }
    GetComponent(type: Il2Cpp.Type): Component {
        throw new Error("Method not implemented.")
    }
    GetComponentInChildren(type: Il2Cpp.Type, includeInactive: boolean): Component {
        throw new Error("Method not implemented.")
    }
    GetComponentInParent(type: Il2Cpp.Type, includeInactive: boolean): Component {
        throw new Error("Method not implemented.")
    }
    GetComponentsInternal(type: Il2Cpp.Type, useSearchTypeAsArrayReturnType: boolean, recursive: boolean, includeInactive: boolean, reverse: boolean, resultList: any) {
        throw new Error("Method not implemented.")
    }
    SendMessage(methodName: string, options: NativePointer): void {
        throw new Error("Method not implemented.")
    }
    SetActive(value: boolean): void {
        throw new Error("Method not implemented.")
    }
    TryGetComponentFastPath(type: Il2Cpp.Type, oneFurtherThanResultValue: NativePointer): void {
        throw new Error("Method not implemented.")
    }
    CompareTag(tag: string): boolean {
        throw new Error("Method not implemented.")
    }
    get_transform(): Transform {
        throw new Error("Method not implemented.")
    }
    get_tag(): string {
        throw new Error("Method not implemented.")
    }
    set_layer(value: number): void {
        throw new Error("Method not implemented.")
    }
    get_layer(): number {
        throw new Error("Method not implemented.")
    }
    get_gameObject(): GameObject {
        throw new Error("Method not implemented.")
    }
    get_activeSelf(): boolean {
        throw new Error("Method not implemented.")
    }
    get_activeInHierarchy(): boolean {
        throw new Error("Method not implemented.")
    }

    // public static extern GameObject Find(string name);
    static Find(name: string): GameObject {
        throw new Error("Method not implemented.")
    }

    // public static extern GameObject[] FindGameObjectsWithTag(string tag);
    static FindGameObjectsWithTag_A(tag: string): GameObject[] {
        throw new Error("Method not implemented.")
    }

    // public static extern GameObject FindGameObjectWithTag(string tag);
    static FindGameObjectWithTag(tag: string): GameObject {
        throw new Error("Method not implemented.")
    }

    // public static GameObject FindWithTag(string tag)
    static FindWithTag(tag: string): GameObject {
        throw new Error("Method not implemented.")
    }


    @cache
    get name() {
        return Il2Cpp.Api._typeGetName(this)
    }

    get transform(): Transform {
        return new Transform(ptr(0))
    }

    get layer() {
        return null
    }

}

function getTransformFormGameObject(gameObject: PTR) {
    gameObject = PTR2NativePtr(gameObject)
    return new Il2Cpp.GameObject(gameObject).transform.handle
}


globalThis.gobj2transform = getTransformFormGameObject;

declare global {
    namespace Il2Cpp {
        class GameObject extends Il2cppGameObject { }
    }
    var gobj2transform: (gameObject: PTR) => NativePointer
}

Il2Cpp.GameObject = Il2cppGameObject;

export { getTransformFormGameObject }