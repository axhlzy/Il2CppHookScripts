interface UnityEngine_Component_Interface {

    // public Component()
    __ctor__(): UnityEngine_Component_Interface;

    // public bool CompareTag(string tag)
    CompareTag(tag: string): boolean;

    // public Component GetComponent(Type type)
    GetComponent(type: Il2Cpp.Type): UnityEngine_Component_Interface;

    // public Component GetComponentInChildren(Type t, bool includeInactive)
    GetComponentInChildren(t: Il2Cpp.Type, includeInactive: boolean): UnityEngine_Component_Interface;

    // public Component GetComponentInParent(Type t) 
    GetComponentInParent(t: Il2Cpp.Type): UnityEngine_Component_Interface;

    // public void GetComponents(Type type, List<Component> results)
    GetComponents(type: Il2Cpp.Type, results: any): void;

    // public extern GameObject get_gameObject();
    get_gameObject(): Il2Cpp.GameObject;

    // public void set_tag(string value)
    set_tag(value: string): void;

    // public extern Transform get_transform();
    get_transform(): Il2Cpp.Transform;
}