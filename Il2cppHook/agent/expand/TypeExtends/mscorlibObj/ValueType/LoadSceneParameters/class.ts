import { System_ValueType_Impl } from "../class"
import { UnityEngine_SceneManagement_LoadSceneMode as LoadSceneMode, UnityEngine_SceneManagement_LocalPhysicsMode as LocalPhysicsMode } from "./enum"

class UnityEngine_SceneManagement_LoadSceneParameters_Impl extends System_ValueType_Impl {

    m_LoadSceneMode: LoadSceneMode = lfv(this.handle, "m_LoadSceneMode") as unknown as LoadSceneMode
    m_LocalPhysicsMode: LocalPhysicsMode = lfv(this.handle, "m_LocalPhysicsMode") as unknown as LocalPhysicsMode


    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    __ctor(mode: LoadSceneMode): void {
        return Il2Cpp.Api.LoadSceneParameters.__ctor(this.handle, mode)
    }

}

Il2Cpp.LoadSceneParameters = UnityEngine_SceneManagement_LoadSceneParameters_Impl

declare global {
    namespace Il2Cpp {
        class LoadSceneParameters extends UnityEngine_SceneManagement_LoadSceneParameters_Impl { }
    }
}

export { UnityEngine_SceneManagement_LoadSceneParameters_Impl }