import { ComponentImpl } from "../../class";

class MonoBehaviourImpl extends ComponentImpl implements Il2cppMonoBehaviour {

    ctor_0(): Il2cppMonoBehaviour {
        return new MonoBehaviourImpl(Il2Cpp.Api.MonoBehaviour._ctor(alloc()));
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
        class MonoBehaviour extends MonoBehaviourImpl { }
    }
}

Il2Cpp.MonoBehaviour = MonoBehaviourImpl;

export { MonoBehaviourImpl }