import { formartClass as FM} from "../../../../utils/formart"

export { }
declare global {
    var HookLoadScene: () => void
    var HookLoadSceneLisener: () => void
    var SceneInfo: () => void
}

globalThis.HookLoadScene = (): void => {

    A(Il2Cpp.Api.SceneManager._LoadScene, (args: InvocationArguments, ctx: CpuContext) => {
        LOGD(`[*] LoadScene( sceneName = '${readU16(args[0])}' )`)
    })

    A(Il2Cpp.Api.SceneManager._LoadScene_sceneName_parameters, (args: InvocationArguments, ctx: CpuContext) => {
        LOGZ(`\t[*] LoadScene( sceneName = '${readU16(args[0])}', LoadSceneParameters = '${args[1]}' )`)
    })
}

globalThis.HookLoadSceneLisener = (): void => {
    A(Il2Cpp.Api.SceneManager._add_sceneLoaded, (args: InvocationArguments, ctx: CpuContext) => {
        LOGD('called -> add_sceneLoaded(UnityAction<Scene, LoadSceneMode>) : Void')
        lfs(args[0])
    })

    A(Il2Cpp.Api.SceneManager._add_activeSceneChanged, (args: InvocationArguments, ctx: CpuContext) => {
        LOGD('called -> add_activeSceneChanged(UnityAction<Scene, Scene>) : Void')
        lfs(args[0])
    })

    A(Il2Cpp.Api.SceneManager._remove_activeSceneChanged, (args: InvocationArguments, ctx: CpuContext) => {
        LOGD('called -> remove_activeSceneChanged(UnityAction<Scene, Scene>) : Void')
        lfs(args[0])
    })

    A(Il2Cpp.Api.SceneManager._remove_sceneLoaded, (args: InvocationArguments, ctx: CpuContext) => {
        LOGD('called -> remove_sceneLoaded(UnityAction<Scene, LoadSceneMode>) : Void')
        lfs(args[0])
    })
}

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
globalThis.SceneInfo = (): void => {
    let sceneCount = Il2Cpp.SceneManager.get_sceneCount
    FM.printTitileA(`Scene Count: ${sceneCount}`)
    for (let index = 0; index < sceneCount; index++) {
        let scene = Il2Cpp.SceneManager.GetSceneAt(index)
        LOGD(`[${index}] Scene Name: '${scene.get_name()}'`)
        LOGZ(`\t Path: '${scene.get_path()}' `)
        LOGZ(`\t Build Index: ${scene.get_buildIndex()} / ${ptr(scene.get_handle())} `)
        LOGZ(`\t RootCount: ${scene.get_rootCount()}`)
    }
}