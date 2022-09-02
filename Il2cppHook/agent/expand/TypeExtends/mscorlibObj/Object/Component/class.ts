import { PackList } from "../../../../../bridge/fix/packer/packList";
import { mscorlib_System_Type_impl as System_Type } from "../../Type/class";
import { UnityEngine_Object } from "../class";
import { GameObjectImpl as GameObject } from "../GameObject/class";

class UnityEngine_Component_Impl extends UnityEngine_Object {

    __ctor__(): UnityEngine_Component_Impl {
        return new UnityEngine_Component_Impl(Il2Cpp.Api.Component._ctor_0(allocP()))
    }

    CompareTag(tag: string): boolean {
        return !Il2Cpp.Api.Component._CompareTag(this.handle, allocUStr(tag)).isNull()
    }

    // pass
    GetComponent(type: System_Type): UnityEngine_Component_Impl {
        return new UnityEngine_Component_Impl(Il2Cpp.Api.Component._GetComponent(this.handle, type.handle))
    }

    // pass
    GetComponentInChildren(t: System_Type, includeInactive: boolean): UnityEngine_Component_Impl {
        return new UnityEngine_Component_Impl(Il2Cpp.Api.Component._GetComponentInChildren(this.handle, t.handle, includeInactive ? ptr(1) : ptr(0)))
    }

    // pass
    GetComponentInParent(t: System_Type): UnityEngine_Component_Impl {
        return new UnityEngine_Component_Impl(Il2Cpp.Api.Component._GetComponentInParent(this.handle, t.handle))
    }

    // GetComponents(type: System_Type): PackList {
    //     let allocTmp = alloc(0x10)
    //     seeHexA(allocTmp)
    //     Il2Cpp.Api.Component._GetComponents(this.handle, type, allocTmp)
    //     seeHexA(allocTmp)
    //     return new PackList(allocTmp)
    // }

    // pass
    get_gameObject(): GameObject {
        return new GameObject(Il2Cpp.Api.Component._get_gameObject(this.handle))
    }

    set_tag(value: string): void {
        return Il2Cpp.Api.Component._set_tag(this.handle, allocUStr(value))
    }

    // pass
    get_transform(): Il2Cpp.Transform {
        return new Il2Cpp.Transform(Il2Cpp.Api.Component._get_transform(this.handle))
    }
}

declare global {
    namespace Il2Cpp {
        class Component extends UnityEngine_Component_Impl { }
    }
}

Il2Cpp.Component = UnityEngine_Component_Impl;

export { UnityEngine_Component_Impl }