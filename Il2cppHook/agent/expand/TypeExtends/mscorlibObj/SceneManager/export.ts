export { }
declare global {
    var HookLoadScene: () => void
    var getSceneName: (mPtr: NativePointer) => string
    // var HookLoadSceneLisener: () => void
    // var SceneInfo: () => void
}

globalThis.HookLoadScene = (): void => {

    try {
        LOGD(`Hooked -> LoadScene( sceneName: String ) : Void @ ${Il2Cpp.Api.SceneManager._LoadScene}`)
        A(Il2Cpp.Api.SceneManager._LoadScene, (args: InvocationArguments, _ctx: CpuContext) => {
            LOGD(`[*] LoadScene( sceneName = '${readU16(args[0])}' )`)
        })
    } catch (error) {
        LOGE(error)
    }

    try {
        LOGD(`Hooked -> LoadScene( sceneName: String, parameters: LoadSceneParameters ) : Void @ ${Il2Cpp.Api.SceneManager._LoadScene_sceneName_parameters}`)
        A(Il2Cpp.Api.SceneManager._LoadScene_sceneName_parameters, (args: InvocationArguments, _ctx: CpuContext) => {
            LOGZ(`\t[*] LoadScene( sceneName = '${readU16(args[0])}', LoadSceneParameters = '${args[1]}' )`)
        })
    } catch (error) {
        LOGE(error)
    }

    try {
        LOGD(`Hooked -> LoadSceneAsyncNameIndexInternal( sceneName: String, sceneBuildIndex: Int32, parameters: LoadSceneParameters, mustCompleteNextFrame: Boolean ) : AsyncOperation @ ${Il2Cpp.Api.SceneManager._LoadSceneAsyncNameIndexInternal}`)
        // UnityEngine.SceneManagement.SceneManager | private static AsyncOperation LoadSceneAsyncNameIndexInternal(String sceneName, Int32 sceneBuildIndex, LoadSceneParameters parameters, Boolean mustCompleteNextFrame)
        A(Il2Cpp.Api.SceneManager._LoadSceneAsyncNameIndexInternal, (args: InvocationArguments, _ctx: CpuContext) => {
            LOGD(`[*] LoadSceneAsyncNameIndexInternal( sceneName = '${readU16(args[0])}', sceneBuildIndex = ${args[1]}, LoadSceneParameters = '${args[2]}', mustCompleteNextFrame = ${args[3]} )`)
        })
    } catch (error) {
        LOGE(error)
    }

    try {
        LOGD(`Hooked -> Internal_ActiveSceneChanged( previousActiveScene: Scene, newActiveScene: Scene ) : Void @ ${Il2Cpp.Api.SceneManager._Internal_ActiveSceneChanged}`)
        // UnityEngine.SceneManagement.SceneManager | private static Void Internal_ActiveSceneChanged(Scene previousActiveScene, Scene newActiveScene)
        A(Il2Cpp.Api.SceneManager._Internal_ActiveSceneChanged, (args: InvocationArguments, _ctx: CpuContext) => {
            LOGD(`[*] Internal_ActiveSceneChanged( previousActiveScene = '${args[0]}' <- '${getSceneName(args[0])}', newActiveScene = '${args[1]}' <- '${getSceneName(args[1])}' )`)
        })
    } catch (error) {
        LOGE(error)
    }

}

globalThis.getSceneName = (mPtr: NativePointer): string => {
    let tmpMem = alloc(0x4)
    tmpMem.writePointer(mPtr)
    let sceneName = Il2Cpp.Api.Scene._get_name(tmpMem)
    return readU16(sceneName)
}

// globalThis.HookLoadSceneLisener = (): void => {
//     A(Il2Cpp.Api.SceneManager._add, (args: InvocationArguments, _ctx: CpuContext) => {
//         LOGD('called -> add_sceneLoaded(UnityAction<Scene, LoadSceneMode>) : Void')
//         lfs(args[0])
//     })

//     A(Il2Cpp.Api.SceneManager._add_activeSceneChanged, (args: InvocationArguments, _ctx: CpuContext) => {
//         LOGD('called -> add_activeSceneChanged(UnityAction<Scene, Scene>) : Void')
//         lfs(args[0])
//     })

//     A(Il2Cpp.Api.SceneManager._remove_activeSceneChanged, (args: InvocationArguments, _ctx: CpuContext) => {
//         LOGD('called -> remove_activeSceneChanged(UnityAction<Scene, Scene>) : Void')
//         lfs(args[0])
//     })

//     A(Il2Cpp.Api.SceneManager._remove_sceneLoaded, (args: InvocationArguments, _ctx: CpuContext) => {
//         LOGD('called -> remove_sceneLoaded(UnityAction<Scene, LoadSceneMode>) : Void')
//         lfs(args[0])
//     })
// }

// globalThis.SceneInfo = (): void => {
//     try {
//         let sceneCount = Il2Cpp.SceneManager.get_sceneCount
//         let sceneCountInBuildSettings = Il2Cpp.SceneManager.get_sceneCountInBuildSettings
//         formartClass.printTitileA(`Scene Count: ${sceneCount} | InBuildSettings: ${sceneCountInBuildSettings}`)
//         for (let index = 0; index < sceneCountInBuildSettings; index++) {
//             let scene = Il2Cpp.SceneManager.GetSceneByBuildIndex(index)
//             LOGD(`\t[${index}] Scene Name: '${scene.get_name()}'`)
//             LOGZ(`\t\t Scene Path: '${scene.get_path()}' `)
//             LOGZ(`\t\t Scene Build Index: ${scene.get_buildIndex()} / ${ptr(scene.get_handle())} `)
//         }
//     } catch {
//         let sceneCount = Il2Cpp.SceneManager.get_sceneCount
//         let rootCount = Il2Cpp.SceneManager.GetActiveScene.get_rootCount()
//         // let rootGameObjects = Il2Cpp.SceneManager.GetActiveScene.GetRootGameObjects()
//         LOGD(`${sceneCount} ${rootCount}`)
//     }
// }

// globalThis.SceneInfo = (): void => {
//     let sceneCount = Il2Cpp.SceneManager.get_sceneCount
//     FM.printTitileA(`Scene Count: ${sceneCount}`)
//     for (let index = 0; index < sceneCount; index++) {
//         let scene = Il2Cpp.SceneManager.GetSceneAt(index)
//         LOGD(`[${index}] Scene Name: '${scene.get_name()}'`)
//         LOGZ(`\t Path: '${scene.get_path()}' `)
//         LOGZ(`\t Build Index: ${scene.get_buildIndex()} / ${ptr(scene.get_handle())} `)
//         LOGZ(`\t RootCount: ${scene.get_rootCount()}`)
//     }
// }