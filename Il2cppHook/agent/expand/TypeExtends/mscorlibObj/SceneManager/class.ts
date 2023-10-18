import { mscorlib_System_Object_impl as System_Object } from "../class"
import { UnityEngine_SceneManagement_LoadSceneMode as LoadSceneMode } from "../ValueType/LoadSceneParameters/enum"
import { UnityEngine_SceneManagement_LoadSceneParameters_Impl as LoadSceneParameters } from "../ValueType/LoadSceneParameters/class"
import { UnityEngine_SceneManagement_Scene_Impl as Scene } from "../ValueType/Scene/class"
import { UnityEngine_AsyncOperation_Impl as AsyncOperation } from "../YieldInstruction/AsyncOperation/class"

type System_Boolean = NativePointer
type System_Int32 = NativePointer
type System_Void = void
type System_String = string
type UnityEngine_SceneManagement_CreateSceneParameters = NativePointer
type UnityEngine_SceneManagement_UnloadSceneOptions = NativePointer

class SceneManager_Impl extends System_Object {

    s_AllowLoadScene: System_Boolean = lfv(this.handle, "s_AllowLoadScene") as unknown as System_Boolean
    // sceneLoaded: UnityEngine_Events.UnityAction<UnityEngine.SceneManagement.Scene,UnityEngine.SceneManagement.LoadSceneMode> = lfv(this.handle, "sceneLoaded") as unknown as UnityEngine_Events.UnityAction<UnityEngine.SceneManagement.Scene,UnityEngine.SceneManagement.LoadSceneMode>
    // sceneUnloaded: UnityEngine_Events.UnityAction<UnityEngine.SceneManagement.Scene> = lfv(this.handle, "sceneUnloaded") as unknown as UnityEngine_Events.UnityAction<UnityEngine.SceneManagement.Scene>
    // activeSceneChanged: UnityEngine_Events.UnityAction<UnityEngine.SceneManagement.Scene,UnityEngine.SceneManagement.Scene> = lfv(this.handle, "activeSceneChanged") as unknown as UnityEngine_Events.UnityAction<UnityEngine.SceneManagement.Scene,UnityEngine.SceneManagement.Scene>
    sceneLoaded: NativePointer = lfv(this.handle, "sceneLoaded") as unknown as NativePointer
    sceneUnloaded: NativePointer = lfv(this.handle, "sceneUnloaded") as unknown as NativePointer
    activeSceneChanged: NativePointer = lfv(this.handle, "activeSceneChanged") as unknown as NativePointer

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    static get_sceneCount(): System_Int32 {
        return Il2Cpp.Api.SceneManager._get_sceneCount()
    }

    static GetActiveScene(): Scene {
        return Il2Cpp.Api.SceneManager._GetActiveScene()
    }

    static SetActiveScene(scene: Scene): System_Boolean {
        return Il2Cpp.Api.SceneManager._SetActiveScene(scene)
    }

    static GetSceneByName(name: System_String): Scene {
        return Il2Cpp.Api.SceneManager._GetSceneByName(name)
    }

    static GetSceneAt(index: System_Int32): Scene {
        return Il2Cpp.Api.SceneManager._GetSceneAt(index)
    }

    static CreateScene(sceneName: System_String, parameters: UnityEngine_SceneManagement_CreateSceneParameters): Scene {
        return Il2Cpp.Api.SceneManager._CreateScene(allocUStr(sceneName), parameters)
    }

    static UnloadSceneAsyncInternal(scene: Scene, options: UnityEngine_SceneManagement_UnloadSceneOptions): AsyncOperation {
        return Il2Cpp.Api.SceneManager._UnloadSceneAsyncInternal(scene, options)
    }

    static LoadSceneAsyncNameIndexInternal(sceneName: System_String, sceneBuildIndex: System_Int32, parameters: LoadSceneParameters, mustCompleteNextFrame: System_Boolean): AsyncOperation {
        return Il2Cpp.Api.SceneManager._LoadSceneAsyncNameIndexInternal(sceneName, sceneBuildIndex, parameters, mustCompleteNextFrame)
    }

    static UnloadSceneNameIndexInternal(sceneName: System_String, sceneBuildIndex: System_Int32, immediately: System_Boolean, options: UnityEngine_SceneManagement_UnloadSceneOptions, outSuccess: System_Boolean): AsyncOperation {
        return Il2Cpp.Api.SceneManager._UnloadSceneNameIndexInternal(sceneName, sceneBuildIndex, immediately, options, outSuccess)
    }

    static CreateScene_1(sceneName: System_String): Scene {
        return Il2Cpp.Api.SceneManager._CreateScene(sceneName)
    }

    static LoadScene(sceneName: System_String, mode: LoadSceneMode): System_Void {
        return Il2Cpp.Api.SceneManager._LoadScene(sceneName, mode)
    }

    static LoadScene_string_Para(sceneName: System_String, parameters: LoadSceneParameters): Scene {
        return Il2Cpp.Api.SceneManager._LoadScene(sceneName, parameters)
    }

    static LoadScene_string_Mode(sceneBuildIndex: System_Int32, mode: LoadSceneMode): System_Void {
        return Il2Cpp.Api.SceneManager._LoadScene(sceneBuildIndex, mode)
    }

    static LoadScene_Int_Para(sceneBuildIndex: System_Int32, parameters: LoadSceneParameters): Scene {
        return Il2Cpp.Api.SceneManager._LoadScene(sceneBuildIndex, parameters)
    }

    static LoadSceneAsync(sceneName: System_String, mode: LoadSceneMode): AsyncOperation {
        return Il2Cpp.Api.SceneManager._LoadSceneAsync(sceneName, mode)
    }

    static LoadSceneAsync_2(sceneName: System_String, parameters: LoadSceneParameters): AsyncOperation {
        return Il2Cpp.Api.SceneManager._LoadSceneAsync(sceneName, parameters)
    }

    static UnloadSceneAsync(sceneName: System_String): AsyncOperation {
        return Il2Cpp.Api.SceneManager._UnloadSceneAsync(sceneName)
    }

    static UnloadSceneAsync_1(scene: Scene): AsyncOperation {
        return Il2Cpp.Api.SceneManager._UnloadSceneAsync(scene)
    }

    static Internal_SceneLoaded(scene: Scene, mode: LoadSceneMode): System_Void {
        return Il2Cpp.Api.SceneManager._Internal_SceneLoaded(scene, mode)
    }

    static Internal_SceneUnloaded(scene: Scene): System_Void {
        return Il2Cpp.Api.SceneManager._Internal_SceneUnloaded(scene)
    }

    static Internal_ActiveSceneChanged(previousActiveScene: Scene, newActiveScene: Scene): System_Void {
        return Il2Cpp.Api.SceneManager._Internal_ActiveSceneChanged(previousActiveScene, newActiveScene)
    }

    static _cctor(): System_Void {
        return Il2Cpp.Api.SceneManager.__cctor()
    }

    static GetActiveScene_Injected(ret: Scene): System_Void {
        return Il2Cpp.Api.SceneManager._GetActiveScene_Injected(ret)
    }

    static SetActiveScene_Injected(scene: Scene): System_Boolean {
        return Il2Cpp.Api.SceneManager._SetActiveScene_Injected(scene)
    }

    static GetSceneByName_Injected(name: System_String, ret: Scene): System_Void {
        return Il2Cpp.Api.SceneManager._GetSceneByName_Injected(name, ret)
    }

    static GetSceneAt_Injected(index: System_Int32, ret: Scene): System_Void {
        return Il2Cpp.Api.SceneManager._GetSceneAt_Injected(index, ret)
    }

    static CreateScene_Injected(sceneName: System_String, parameters: UnityEngine_SceneManagement_CreateSceneParameters, ret: Scene): System_Void {
        return Il2Cpp.Api.SceneManager._CreateScene_Injected(sceneName, parameters, ret)
    }

    static UnloadSceneAsyncInternal_Injected(scene: Scene, options: UnityEngine_SceneManagement_UnloadSceneOptions): AsyncOperation {
        return Il2Cpp.Api.SceneManager._UnloadSceneAsyncInternal_Injected(scene, options)
    }

}


Il2Cpp.SceneManager = SceneManager_Impl

declare global {
    namespace Il2Cpp {
        class SceneManager extends SceneManager_Impl { }
    }
}

export { SceneManager_Impl }