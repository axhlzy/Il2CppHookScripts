import { il2cppObjAPI_impl } from "../class"



class GameObjectImpl extends il2cppObjAPI_impl implements Il2cppGameObject {

    ctor_0(): Il2Cpp.GameObject {
        return Il2Cpp.Api.GameObject._ctor_0(this.handle, allocP(1))
    }

    ctor_1(name: string): Il2Cpp.GameObject {
        return Il2Cpp.Api.GameObject._ctor_1(this.handle, allocP(1), allocUStr(name))
    }

    ctor_2(name: string, type: Il2Cpp.Type[]): Il2Cpp.GameObject {
        let types = Il2Cpp.Array.from(type[0].class, type.length)
        return Il2Cpp.Api.GameObject._ctor_2(this.handle, allocP(1), allocUStr(name), types)
    }

    AddComponent(componentType: Il2Cpp.Type): Il2Cpp.Component {
        return Il2Cpp.Api.GameObject._AddComponent(this.handle, componentType)
    }

    GetComponent(type: Il2Cpp.Type): Il2Cpp.Component {
        return Il2Cpp.Api.GameObject._GetComponent(this.handle, type)
    }

    GetComponentInChildren(type: Il2Cpp.Type, includeInactive: boolean): Il2Cpp.Component {
        return Il2Cpp.Api.GameObject._GetComponentInChildren(this.handle, type.handle, ptr(includeInactive as unknown as number))
    }

    GetComponentInParent(type: Il2Cpp.Type, includeInactive: boolean): Il2Cpp.Component {
        return Il2Cpp.Api.GameObject._GetComponentInParent(this.handle, type.handle, ptr(includeInactive as unknown as number))
    }

    GetComponentsInternal(type: Il2Cpp.Type, useSearchTypeAsArrayReturnType: boolean, recursive: boolean, includeInactive: boolean, reverse: boolean, resultList: any) {
        return Il2Cpp.Api.GameObject._GetComponentsInternal(this.handle, type.handle,
            ptr(useSearchTypeAsArrayReturnType as unknown as number),
            ptr(recursive as unknown as number),
            ptr(includeInactive as unknown as number),
            ptr(reverse as unknown as number),
            ptr(resultList))
    }

    SendMessage(methodName: string, options?: NativePointer): void {
        return Il2Cpp.Api.GameObject._SendMessage(this.handle, allocUStr(methodName), options)
    }

    SetActive(value: boolean): void {
        return Il2Cpp.Api.GameObject._SetActive(this.handle, ptr(value as unknown as number))
    }

    GetComponentFastPath(type: Il2Cpp.Type, oneFurtherThanResultValue: NativePointer): void {
        return Il2Cpp.Api.GameObject._GetComponentFastPath(this.handle, type, oneFurtherThanResultValue)
    }

    CompareTag(tag: string): boolean {
        return Il2Cpp.Api.GameObject._CompareTag(this.handle, allocUStr(tag))
    }

    get_transform(): Il2Cpp.Transform {
        return new Il2Cpp.Transform(Il2Cpp.Api.GameObject._get_transform(this.handle))
    }

    get_tag(): string {
        return Il2Cpp.Api.GameObject._get_tag(this.handle)
    }

    set_layer(value: number): void {
        return Il2Cpp.Api.GameObject._set_layer(this.handle, ptr(value))
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
    static Find(name: string): Il2Cpp.GameObject {
        return Il2Cpp.Api.GameObject._Find(allocUStr(name))
    }

    // public static extern GameObject[] FindGameObjectsWithTag(string tag);
    static FindGameObjectsWithTag_A(tag: string): Il2Cpp.GameObject[] {
        return Il2Cpp.Api.GameObject._FindGameObjectsWithTag_A(allocUStr(tag))
    }

    // public static extern GameObject FindGameObjectWithTag(string tag);
    static FindGameObjectWithTag(tag: string): Il2Cpp.GameObject {
        return Il2Cpp.Api.GameObject._FindGameObjectWithTag(allocUStr(tag))
    }

    // public static GameObject FindWithTag(string tag)
    static FindWithTag(tag: string): Il2Cpp.GameObject {
        return Il2Cpp.Api.GameObject._FindWithTag(allocUStr(tag))
    }
}

declare global {
    namespace Il2Cpp {
        class GameObject extends GameObjectImpl { }
    }
}

Il2Cpp.GameObject = GameObjectImpl;

export { }
