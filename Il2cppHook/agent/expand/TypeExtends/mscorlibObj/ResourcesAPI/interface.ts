type Shader = NativePointer

interface ResourcesAPI_interface {

    // FindObjectsOfTypeAll(Type) : Object[]
    FindObjectsOfTypeAll(type: mscorlib.Type): Object[];

    // FindShaderByName(String) : Shader
    FindShaderByName(name: string): Shader;

    // Load(String, Type) : Object
    Load(name: string, type: mscorlib.Type): Object;

    // LoadAll(String, Type) : Object[]
    LoadAll(name: string, type: mscorlib.Type): Object[];

    // LoadAsync(String, Type) : ResourceRequest
    LoadAsync(name: string, type: mscorlib.Type): mscorlib.ResourcesRequest;

    // UnloadAsset(Object) : Void
    UnloadAsset(asset: Object): void;

    // get_ActiveAPI() : ResourcesAPI
    get ActiveAPI(): ResourcesAPI_interface;

    // get_overrideAPI() : ResourcesAPI
    get overrideAPI(): ResourcesAPI_interface;

}