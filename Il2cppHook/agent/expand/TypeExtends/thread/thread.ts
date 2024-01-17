const attachCurrentThread = () => {
    let thread = Il2Cpp.Api._threadCurrent()
    if (thread.isNull()) Il2Cpp.Domain.attach()
}

const detachCurrentThread = () => {
    let threadHandle = Il2Cpp.Api._threadCurrent();
    if (!threadHandle.isNull()) new Il2Cpp.Thread(threadHandle).detach()
}

globalThis.attachCurrentThread = attachCurrentThread
globalThis.detachCurrentThread = detachCurrentThread

declare global {
    var attachCurrentThread: () => void
    var detachCurrentThread: () => void
}

export { }