interface Il2cppMonoBehaviour {

    // .ctor()
    ctor_0(): Il2cppMonoBehaviour;

    // CancelInvoke() : Void
    CancelInvoke_0(): void;

    // CancelInvoke(String) : Void
    CancelInvoke_methodName(methodName: string): void;

    // InvokeRepeating(String, Single, Single) : Void
    InvokeRepeating(methodName: string, time: number, repeatRate: number): void;

    // Invoke(String, Single) : Void
    Invoke(methodName: string, time: number): void;

    // IsInvoking(String) : Boolean
    IsInvoking_methodName(methodName: string): boolean;

    // IsInvoking() : Boolean
    IsInvoking_0(): boolean;

    // print(Object) : Void
    print(obj: NativePointer): void;

    // StartCoroutine(IEnumerator) : Coroutine
    StartCoroutine_enumerator(enumerator: NativePointer): NativePointer;

    // StartCoroutine(String) : Coroutine
    StartCoroutine_methodName(methodName: string): NativePointer;

    // StartCoroutine(String, Object) : Coroutine
    StartCoroutine_methodName_obj(methodName: string, obj: NativePointer): NativePointer;

    // StartCoroutine_Auto(IEnumerator) : Coroutine
    StartCoroutine_Auto(enumerator: NativePointer): NativePointer;

    // StopAllCoroutines() : Void
    StopAllCoroutines(): void;

    // StopCoroutine(Coroutine) : Void
    StopCoroutine_coroutine(coroutine: NativePointer): void;

    // StopCoroutine(String) : Void
    StopCoroutine_methodName(methodName: string): void;

    // StopCoroutine(IEnumerator) : Void
    StopCoroutine_enumerator(enumerator: NativePointer): void;

    // set_useGUILayout(Boolean) : Void
    set_useGUILayout(value: boolean): void;

    // get_useGUILayout() : Boolean
    get_useGUILayout(): boolean;

}