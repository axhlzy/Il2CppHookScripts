interface GameObject {

    ctor_0(): GameObject;
    ctor_1(name: string): GameObject;
    ctor_2(name: string, type: Il2Cpp.Type[]): GameObject;

    // public Component AddComponent(Type componentType)
    AddComponent(componentType: Il2Cpp.Type): Component;

    // public extern Component GetComponent(Type type);
    GetComponent(type: Il2Cpp.Type): Component;

    // public extern Component GetComponentInChildren(Type type, bool includeInactive);
    GetComponentInChildren(type: Il2Cpp.Type, includeInactive: boolean): Component;

    // public extern Component GetComponentInParent(Type type, bool includeInactive);
    GetComponentInParent(type: Il2Cpp.Type, includeInactive: boolean): Component;

    // private extern Array GetComponentsInternal(Type type, bool useSearchTypeAsArrayReturnType, bool recursive, bool includeInactive, bool reverse, object resultList);
    GetComponentsInternal(type: Il2Cpp.Type, useSearchTypeAsArrayReturnType: boolean, recursive: boolean, includeInactive: boolean, reverse: boolean, resultList: any): any;

    // public extern void SendMessage(string methodName, SendMessageOptions options);
    SendMessage(methodName: string, options: NativePointer): void;

    // public extern void SetActive(bool value);
    SetActive(value: boolean): void;

    // internal extern void TryGetComponentFastPath(Type type, IntPtr oneFurtherThanResultValue);
    TryGetComponentFastPath(type: Il2Cpp.Type, oneFurtherThanResultValue: NativePointer): void;

    // public extern bool CompareTag(string tag);
    CompareTag(tag: string): boolean;

    // public extern Transform get_transform();
    get_transform(): Transform;

    // public extern string get_tag();
    get_tag(): string;

    // public extern void set_layer(int value);
    set_layer(value: number): void;

    // public extern int get_layer();
    get_layer(): number;

    // public GameObject get_gameObject();
    get_gameObject(): GameObject;

    // public extern bool get_activeSelf();
    get_activeSelf(): boolean;

    // public extern bool get_activeInHierarchy();
    get_activeInHierarchy(): boolean;

}
