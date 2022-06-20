interface Il2cppGameObject {

    ctor_0(): Il2Cpp.GameObject;
    ctor_1(name: string): Il2Cpp.GameObject;
    ctor_2(name: string, type: Il2Cpp.Type[]): Il2Cpp.GameObject;

    // public Component AddComponent(Type componentType)
    AddComponent(componentType: Il2Cpp.Type): Il2Cpp.Component;

    // public extern Component GetComponent(Type type);
    GetComponent(type: Il2Cpp.Type): Il2Cpp.Component;

    // public extern Component GetComponentInChildren(Type type, bool includeInactive);
    GetComponentInChildren(type: Il2Cpp.Type, includeInactive: boolean): Il2Cpp.Component;

    // public extern Component GetComponentInParent(Type type, bool includeInactive);
    GetComponentInParent(type: Il2Cpp.Type, includeInactive: boolean): Il2Cpp.Component;

    // private extern Array GetComponentsInternal(Type type, bool useSearchTypeAsArrayReturnType, bool recursive, bool includeInactive, bool reverse, object resultList);
    GetComponentsInternal(type: Il2Cpp.Type, useSearchTypeAsArrayReturnType: boolean, recursive: boolean, includeInactive: boolean, reverse: boolean, resultList: any): any;

    // public extern void SendMessage(string methodName, SendMessageOptions options);
    SendMessage(methodName: string, options: NativePointer): void;

    // public extern void SetActive(bool value);
    SetActive(value: boolean): void;

    // internal extern void GetComponentFastPath(Type type, IntPtr oneFurtherThanResultValue);
    GetComponentFastPath(type: Il2Cpp.Type, oneFurtherThanResultValue: NativePointer): void;

    // public extern bool CompareTag(string tag);
    CompareTag(tag: string): boolean;

    // public extern Transform get_transform();
    get_transform(): Il2Cpp.Transform;

    // public extern string get_tag();
    get_tag(): string;

    // public extern void set_layer(int value);
    set_layer(value: number): void;

    // public extern int get_layer();
    get_layer(): number;

    // public GameObject get_gameObject();
    get_gameObject(): Il2Cpp.GameObject;

    // public extern bool get_activeSelf();
    get_activeSelf(): boolean;

    // public extern bool get_activeInHierarchy();
    get_activeInHierarchy(): boolean;

}
