import { mscorlib_System_Object_impl as System_Object } from "../../class"
import { System_ValueType_Impl as System_ValueType } from "../class"

class UnityEngine_SceneManagement_Scene_Impl extends System_ValueType {

    m_Handle: number

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
        this.m_Handle = Number(handleOrWrapper)
    }

    static GetPathInternal(sceneHandle: number): string {
        return readU16(Il2Cpp.Api.Scene._GetPathInternal(sceneHandle))
    }

    static GetNameInternal(sceneHandle: number): string {
        return readU16(Il2Cpp.Api.Scene._GetNameInternal(sceneHandle))
    }

    static GetBuildIndexInternal(sceneHandle: number): number {
        return Il2Cpp.Api.Scene._GetBuildIndexInternal(sceneHandle)
    }

    get_handle(): number {
        return this.m_Handle
    }

    get_path(): string {
        return UnityEngine_SceneManagement_Scene_Impl.GetPathInternal(this.m_Handle)
    }

    get_name(): string {
        return UnityEngine_SceneManagement_Scene_Impl.GetNameInternal(this.m_Handle)
    }

    get_buildIndex(): number {
        return UnityEngine_SceneManagement_Scene_Impl.GetBuildIndexInternal(this.m_Handle)
    }

    GetHashCode(): number {
        return Il2Cpp.Api.Scene._GetHashCode(this.handle)
    }

    Equals(other: System_Object): boolean {
        return Il2Cpp.Api.Scene._Equals(this.handle, other)
    }
}

Il2Cpp.Scene = UnityEngine_SceneManagement_Scene_Impl

declare global {
    namespace Il2Cpp {
        class Scene extends UnityEngine_SceneManagement_Scene_Impl { }
    }
}

export { UnityEngine_SceneManagement_Scene_Impl }