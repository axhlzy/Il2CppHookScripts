import { mscorlib_System_Object_impl as System_Object } from "../class"
import { GameObjectImpl as GameObject } from "../Object/GameObject/class"
import { UnityEngine_SceneManagement_LoadSceneMode as LoadSceneMode } from "../ValueType/LoadSceneParameters/enum"
import { UnityEngine_SceneManagement_LocalPhysicsMode as LocalPhysicsMode } from "../ValueType/LoadSceneParameters/enum"
import { UnityEngine_SceneManagement_LoadSceneParameters_Impl as LoadSceneParameters } from "../ValueType/LoadSceneParameters/class"
import { UnityEngine_SceneManagement_Scene_Impl as Scene } from "../ValueType/Scene/class"
import { UnityEngine_AsyncOperation_Impl as AsyncOperation } from "../YieldInstruction/AsyncOperation/class"

class UnityEngine_SceneManagement_SceneManager_Impl extends System_Object {

    s_AllowLoadScene: boolean = lfv(this.handle, "s_AllowLoadScene") as unknown as boolean
    // sceneLoaded: UnityEngine_Events.UnityAction<UnityEngine.SceneManagement.Scene, UnityEngine.SceneManagement.LoadSceneMode> = lfv(this.handle, "sceneLoaded") as unknown as UnityEngine_Events.UnityAction<UnityEngine.SceneManagement.Scene, UnityEngine.SceneManagement.LoadSceneMode>
    sceneLoaded: NativePointer = lfv(this.handle, "sceneLoaded") as unknown as NativePointer
    // sceneUnloaded: UnityEngine_Events.UnityAction<UnityEngine.SceneManagement.Scene> = lfv(this.handle, "sceneUnloaded") as unknown as UnityEngine_Events.UnityAction<UnityEngine.SceneManagement.Scene>
    sceneUnloaded: NativePointer = lfv(this.handle, "sceneUnloaded") as unknown as NativePointer
    // activeSceneChanged: UnityEngine_Events.UnityAction<UnityEngine.SceneManagement.Scene, UnityEngine.SceneManagement.Scene> = lfv(this.handle, "activeSceneChanged") as unknown as UnityEngine_Events.UnityAction<UnityEngine.SceneManagement.Scene, UnityEngine.SceneManagement.Scene>
    activeSceneChanged: NativePointer = lfv(this.handle, "activeSceneChanged") as unknown as NativePointer

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    static get get_sceneCount(): number {
        return Il2Cpp.Api.SceneManager._get_sceneCount()
    }

    static get get_sceneCountInBuildSettings(): number {
        return Il2Cpp.Api.SceneManager._get_sceneCountInBuildSettings()
    }

    static get GetActiveScene(): Scene {
        return new Scene(Il2Cpp.Api.SceneManager._GetActiveScene())
    }

    static GetSceneByBuildIndex(buildIndex: number): Scene {
        return new Scene(Il2Cpp.Api.SceneManager._GetSceneByBuildIndex(buildIndex))
    }

    static GetSceneAt(index: number): Scene {
        return new Scene(Il2Cpp.Api.SceneManager._GetSceneAt(index))
    }

    static LoadSceneAsyncNameIndexInternal(sceneName: string, sceneBuildIndex: number, parameters: LoadSceneParameters, mustCompleteNextFrame: boolean): AsyncOperation {
        return new AsyncOperation(Il2Cpp.Api.SceneManager._LoadSceneAsyncNameIndexInternal(sceneName, sceneBuildIndex, parameters, mustCompleteNextFrame))
    }

    static MoveGameObjectToScene(go: GameObject, scene: Scene): void {
        return Il2Cpp.Api.SceneManager._MoveGameObjectToScene(go, scene)
    }

    // static add_sceneLoaded(value: UnityEngine_Events_UnityAction<Scene, UnityEngine_SceneManagement_LoadSceneMode>): void {
    //     return Il2Cpp.Api.SceneManager._add_sceneLoaded(value)
    // }
    static add_sceneLoaded(value: NativePointer): void {
        return Il2Cpp.Api.SceneManager._add_sceneLoaded(value)
    }

    // static remove_sceneLoaded(value: UnityEngine_Events.UnityAction<UnityEngine.SceneManagement.Scene, UnityEngine.SceneManagement.LoadSceneMode>): void {
    //     return Il2Cpp.Api.SceneManager._remove_sceneLoaded(value)
    // }
    static remove_sceneLoaded(value: NativePointer): void {
        return Il2Cpp.Api.SceneManager._remove_sceneLoaded(value)
    }

    // static add_sceneUnloaded(value: UnityEngine_Events.UnityAction<UnityEngine.SceneManagement.Scene>): void {
    //     return Il2Cpp.Api.SceneManager._add_sceneUnloaded(value)
    // }
    static add_sceneUnloaded(value: NativePointer): void {
        return Il2Cpp.Api.SceneManager._add_sceneUnloaded(value)
    }

    // static remove_sceneUnloaded(value: UnityEngine_Events.UnityAction<UnityEngine.SceneManagement.Scene>): void {
    //     return Il2Cpp.Api.SceneManager._remove_sceneUnloaded(value)
    // }
    static remove_sceneUnloaded(value: NativePointer): void {
        return Il2Cpp.Api.SceneManager._remove_sceneUnloaded(value)
    }

    static LoadScene(sceneName: string): void {
        return Il2Cpp.Api.SceneManager._LoadScene(sceneName)
    }

    static LoadScene_name_param(sceneName: string, parameters: LoadSceneParameters): Scene {
        return new Scene(Il2Cpp.Api.SceneManager._LoadScene(sceneName, parameters))
    }

    static LoadScene_1(sceneBuildIndex: number): void {
        return Il2Cpp.Api.SceneManager._LoadScene(sceneBuildIndex)
    }

    static LoadScene_index_param(sceneBuildIndex: number, parameters: LoadSceneParameters): Scene {
        return new Scene(Il2Cpp.Api.SceneManager._LoadScene(sceneBuildIndex, parameters))
    }

    static LoadSceneAsync(sceneName: string): AsyncOperation {
        return new AsyncOperation(Il2Cpp.Api.SceneManager._LoadSceneAsync(sceneName))
    }

    static LoadSceneAsync_2(sceneName: string, parameters: LoadSceneParameters): AsyncOperation {
        return new AsyncOperation(Il2Cpp.Api.SceneManager._LoadSceneAsync(sceneName, parameters))
    }

    static Internal_SceneLoaded(scene: Scene, mode: LoadSceneMode): void {
        return Il2Cpp.Api.SceneManager._Internal_SceneLoaded(scene, mode)
    }

    static Internal_SceneUnloaded(scene: Scene): void {
        return Il2Cpp.Api.SceneManager._Internal_SceneUnloaded(scene)
    }

    static Internal_ActiveSceneChanged(previousActiveScene: Scene, newActiveScene: Scene): void {
        return Il2Cpp.Api.SceneManager._Internal_ActiveSceneChanged(previousActiveScene, newActiveScene)
    }

    static _cctor(): void {
        return Il2Cpp.Api.SceneManager.__cctor()
    }

    static GetActiveScene_Injected(ret: Scene): void {
        return Il2Cpp.Api.SceneManager._GetActiveScene_Injected(ret)
    }

    static GetSceneByBuildIndex_Injected(buildIndex: number, ret: Scene): void {
        return Il2Cpp.Api.SceneManager._GetSceneByBuildIndex_Injected(buildIndex, ret)
    }

    static GetSceneAt_Injected(index: number, ret: Scene): void {
        return Il2Cpp.Api.SceneManager._GetSceneAt_Injected(index, ret)
    }

    static MoveGameObjectToScene_Injected(go: GameObject, scene: Scene): void {
        return Il2Cpp.Api.SceneManager._MoveGameObjectToScene_Injected(go, scene)
    }
}

Il2Cpp.SceneManager = UnityEngine_SceneManagement_SceneManager_Impl

declare global {
    namespace Il2Cpp {
        class SceneManager extends UnityEngine_SceneManagement_SceneManager_Impl { }
    }
}

export { UnityEngine_SceneManagement_SceneManager_Impl }