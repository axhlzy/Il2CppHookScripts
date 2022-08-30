
const HookLoadScene = (): void => {
    A(Il2Cpp.Api.SceneManager._LoadScene, () => {
        LOGD("Enter LoadScene")
    })
}

const currentScene = (): void => {
    return LOGD(Il2Cpp.SceneManager.GetActiveScene.get_name())
}

export { }

declare global {
    var HookLoadScene: () => void
    var currentScene: () => void
}

globalThis.HookLoadScene = HookLoadScene
globalThis.currentScene = currentScene