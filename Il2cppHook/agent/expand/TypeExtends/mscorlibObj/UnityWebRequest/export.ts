export { }

const B_network = () => {
    Il2Cpp.perform(() => {
        D()
        B("HttpWebRequest")
        B("UnityWebRequest")
        B("WWW")
        BM("UnityWebRequest")
    })
}

declare global {
    var B_network: () => void
}

globalThis.B_network = B_network