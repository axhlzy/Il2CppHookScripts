export { }

declare global {
    var HookUnityWebRequest: () => void
}

const UnityWebRequest = (): void => BM("UnityWebRequest")

globalThis.HookUnityWebRequest = UnityWebRequest