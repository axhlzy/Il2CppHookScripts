export { }

const UnityWebRequest = (): void => BM("UnityWebRequest")

const B_network = () => {
    Il2Cpp.perform(() => {
        B("HttpWebRequest")
        B("UnityWebRequest")
        B("WWW")
        UnityWebRequest()
    })
}

declare global {
    var B_network: () => void
}

globalThis.B_network = B_network