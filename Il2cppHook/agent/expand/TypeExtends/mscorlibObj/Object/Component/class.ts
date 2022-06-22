import { ObjectIl2cpp_impl } from "../class";

class ComponentImpl extends ObjectIl2cpp_impl implements Il2cppComponent {

    __ctor__(): ComponentImpl {
        return new Il2Cpp.Component(Il2Cpp.Api.Component._ctor_0(this.handle, allocP(1)))
    }

    CompareTag(tag: string): boolean {
        return Il2Cpp.Api.Component._CompareTag(this.handle, allocUStr(tag))
    }

    GetComponent(type: Il2Cpp.Type): Il2cppComponent {
        return new Il2Cpp.Component(Il2Cpp.Api.Component._GetComponent(this.handle, type))
    }

    GetComponentInChildren(t: Il2Cpp.Type, includeInactive: boolean): Il2cppComponent {
        return new Il2Cpp.Component(Il2Cpp.Api.Component._GetComponentInChildren(this.handle, t.handle, includeInactive))
    }

    GetComponentInParent(t: Il2Cpp.Type): Il2cppComponent {
        return new Il2Cpp.Component(Il2Cpp.Api.Component._GetComponentInParent(this.handle, t.handle))
    }

    GetComponents(type: Il2Cpp.Type, results: any): void {
        return Il2Cpp.Api.Component._GetComponents(this.handle, type, results)
    }

    get_gameObject(): Il2Cpp.GameObject {
        return new Il2Cpp.GameObject(Il2Cpp.Api.Component._get_gameObject(this.handle))
    }

    set_tag(value: string): void {
        return Il2Cpp.Api.Component._set_tag(this.handle, allocUStr(value))
    }

    get_transform(): Il2Cpp.Transform {
        return Il2Cpp.Api.Component._get_transform(this.handle)
    }
}

declare global {
    namespace Il2Cpp {
        class Component extends ComponentImpl { }
    }
}

Il2Cpp.Component = ComponentImpl;

export { ComponentImpl }