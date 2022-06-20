

interface CoreModule_Object {
    // .ctor()
    ctor(): CoreModule_Object;

    // public override bool Equals(object other)
    Equals(other: CoreModule_Object): boolean;

    // public override int GetHashCode() 
    GetHashCode(): number;

    // public int GetInstanceID() 
    GetInstanceID(): number;

    // public override string ToString()
    ToString(): string;

    // public extern void set_hideFlags(HideFlags value);
    // set_hideFlags(value: Il2Cpp.HideFlags): void;
    // // public extern HideFlags get_hideFlags();
    // get_hideFlags(): Il2Cpp.HideFlags;

    // public void set_name(string value)
    set_name(value: string): void;

    // public string get_name()
    get_name(): string;


    /** static methods ↓ */

    // // public static void Destroy(Object obj)
    // Destroy_1(obj: CoreModule_Object): void;

    // // public static extern void Destroy(Object obj, float t)
    // Destroy_2(obj: CoreModule_Object, t: number): void;

    // // public static void DestroyImmediate(Object obj)
    // DestroyImmediate(obj: CoreModule_Object): void;

    // // public static extern void DestroyImmediate(Object obj, bool allowDestroyingAssets)
    // DestroyImmediate_2(obj: CoreModule_Object, allowDestroyingAssets: boolean): void;

    // // public static extern void DontDestroyOnLoad(Object target)
    // DontDestroyOnLoad(target: CoreModule_Object): void;

    // // public static Object FindObjectOfType(Type type)
    // FindObjectOfType(type: Il2Cpp.Type): CoreModule_Object;

    // // public static extern Object[] FindObjectsOfType(Type type)
    // FindObjectsOfType(type: Il2Cpp.Type): CoreModule_Object[];

    // // private static extern string GetName(Object obj)
    // GetName(): string;

    // // public static Object Instantiate(Object original)
    // Instantiate_1(original: CoreModule_Object): CoreModule_Object;

    // // public static Object Instantiate(Object original, Transform parent, bool instantiateInWorldSpace) 
    // Instantiate_3(original: CoreModule_Object, parent: Il2Cpp.Transform, instantiateInWorldSpace: boolean): CoreModule_Object;

    // // public static Object Instantiate(Object original, Vector3 position, Quaternion rotation) 
    // Instantiate_3_1(original: CoreModule_Object, position: Il2Cpp.Vector3, rotation: Il2Cpp.Quaternion): CoreModule_Object;

    // // public static Object Instantiate(Object original, Vector3 position, Quaternion rotation, Transform parent) 
    // Instantiate_4(original: CoreModule_Object, position: Il2Cpp.Vector3, rotation: Il2Cpp.Quaternion, parent: Il2Cpp.Transform): CoreModule_Object;

    // // public static bool operator ==(Object x, Object y)
    // operator_equal(x: CoreModule_Object, y: CoreModule_Object): boolean;

    // // public static implicit operator bool(Object exists)
    // operator_implicit_bool(exists: CoreModule_Object): boolean;

    // // public static bool operator !=(Object x, Object y) 
    // operator_not_equal(x: CoreModule_Object, y: CoreModule_Object): boolean;

    // // private static extern void SetName(Object obj, string name)
    // SetName(obj: CoreModule_Object, name: string): void;
}
