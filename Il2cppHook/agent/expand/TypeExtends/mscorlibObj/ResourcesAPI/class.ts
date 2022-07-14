import { mscorlib_System_Type_impl } from "../Type/class";
import "./interface"

class ResourcesApi_impl extends mscorlib_System_Type_impl implements ResourcesAPI_interface {

    FindObjectsOfTypeAll(type: mscorlib.Type): Object[] {
        return mscorlib.Api.ResourcesAPI._FindObjectsOfTypeAll(this.handle, type);
    }

    FindShaderByName(name: string): NativePointer {
        return mscorlib.Api.ResourcesAPI._FindShaderByName(this.handle, name);
    }

    Load(name: string, type: mscorlib.Type): Object {
        return new Il2Cpp.Object(mscorlib.Api.ResourcesAPI._Load(this.handle, name, type));
    }
    LoadAll(name: string, type: mscorlib.Type): Object[] {
        return mscorlib.Api.ResourcesAPI._LoadAll(this.handle, name, type);
    }

    LoadAsync(name: string, type: mscorlib.Type) {
        return mscorlib.Api.ResourcesAPI._LoadAsync(this.handle, name, type);
    }

    UnloadAsset(asset: Object): void {
        return mscorlib.Api.ResourcesAPI._UnloadAsset(this.handle, asset);
    }

    get ActiveAPI(): ResourcesAPI_interface {
        return mscorlib.Api.ResourcesAPI._get_ActiveAPI();
    }

    get overrideAPI(): ResourcesAPI_interface {
        return mscorlib.Api.ResourcesAPI._get_overrideAPI();
    }

}

declare global {

    namespace mscorlib {
        class ResourcesAPI extends ResourcesApi_impl { }
    }
}

mscorlib.ResourcesAPI = ResourcesApi_impl;

export { ResourcesApi_impl };