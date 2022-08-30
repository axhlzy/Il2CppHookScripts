import { mscorlib_System_Object_impl as System_Object } from "../class"
import { UnityEngine_Object } from "../Object/class"
import { UnityEngine_AsyncOperation_Impl as AsyncOperation } from "../YieldInstruction/AsyncOperation/class"


class UnityEngine_Resources_Impl extends System_Object {

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    // static ConvertObjects(rawObjects: UnityEngine_Object[]): T[] {
    //     return Il2Cpp.Api.Resources._ConvertObjects(rawObjects)
    // }

    static FindObjectsOfTypeAll(type: Il2Cpp.Type): UnityEngine_Object[] {
        return Il2Cpp.Api.Resources._FindObjectsOfTypeAll(type)
    }

    // static FindObjectsOfTypeAll_0(): T[] {
    //     return Il2Cpp.Api.Resources._FindObjectsOfTypeAll()
    // }

    static Load(path: string): UnityEngine_Object {
        return new UnityEngine_Object(Il2Cpp.Api.Resources._Load(path))
    }

    // static Load_1(path: string): T {
    //     return Il2Cpp.Api.Resources._Load(path)
    // }

    static Load_2(path: string, systemTypeInstance: Il2Cpp.Type): UnityEngine_Object {
        return new UnityEngine_Object(Il2Cpp.Api.Resources._Load(path, systemTypeInstance))
    }

    static GetBuiltinResource(type: Il2Cpp.Type, path: string): UnityEngine_Object {
        return new UnityEngine_Object(Il2Cpp.Api.Resources._GetBuiltinResource(type, path))
    }

    // static GetBuiltinResource_1(path: string): T {
    //     return Il2Cpp.Api.Resources._GetBuiltinResource(path)
    // }

    static UnloadUnusedAssets(): AsyncOperation {
        return new AsyncOperation(Il2Cpp.Api.Resources._UnloadUnusedAssets())
    }
}

Il2Cpp.Resources = UnityEngine_Resources_Impl

declare global {
    namespace Il2Cpp {
        class Resources extends UnityEngine_Resources_Impl { }
    }
}

export { UnityEngine_Resources_Impl }