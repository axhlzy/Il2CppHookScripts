import { mscorlib_System_Type_impl } from "../Type/class";
import "./interface"

class ResourcesApi_impl extends mscorlib_System_Type_impl implements ResourcesAPI_interface {

    // s_DefaultAPI : ResourcesAPI
    s_DefaultAPI: ResourcesApi_impl = new ResourcesApi_impl(lfv(this.handle, "s_DefaultAPI"))

    FindObjectsOfTypeAll(type: Il2cpp.Type): Object[] {
        return Il2cpp.Api.ResourcesAPI._FindObjectsOfTypeAll(this.handle, type);
    }

    FindShaderByName(name: string): NativePointer {
        return Il2cpp.Api.ResourcesAPI._FindShaderByName(this.handle, name);
    }

    Load(name: string, type: Il2cpp.Type): Object {
        return new Il2Cpp.Object(Il2cpp.Api.ResourcesAPI._Load(this.handle, name, type));
    }
    LoadAll(name: string, type: Il2cpp.Type): Object[] {
        return Il2cpp.Api.ResourcesAPI._LoadAll(this.handle, name, type);
    }

    LoadAsync(name: string, type: Il2cpp.Type) {
        return Il2cpp.Api.ResourcesAPI._LoadAsync(this.handle, name, type);
    }

    UnloadAsset(asset: Object): void {
        return Il2cpp.Api.ResourcesAPI._UnloadAsset(this.handle, asset);
    }

    get ActiveAPI(): ResourcesAPI_interface {
        return Il2cpp.Api.ResourcesAPI._get_ActiveAPI();
    }

    get overrideAPI(): ResourcesAPI_interface {
        return Il2cpp.Api.ResourcesAPI._get_overrideAPI();
    }

}

declare global {

    namespace Il2cpp {
        class ResourcesAPI extends ResourcesApi_impl { }
    }
}

Il2cpp.ResourcesAPI = ResourcesApi_impl;

export { ResourcesApi_impl };