const currentScene = (): void => LOGD(Il2Cpp.SceneManager.GetActiveScene.toString())

export { }
declare global {
    var currentScene: () => void
}

globalThis.currentScene = currentScene