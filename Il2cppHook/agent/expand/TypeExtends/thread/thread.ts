const attachCurrentThread = () => {
    let thread = Il2Cpp.Api.threadCurrent()
    if (thread.isNull()) Il2Cpp.domain.attach()
}

const detachCurrentThread = () => {
    let threadHandle = Il2Cpp.Api.threadCurrent();
    if (!threadHandle.isNull()) new Il2Cpp.Thread(threadHandle).detach()
}

globalThis.attachCurrentThread = attachCurrentThread
globalThis.detachCurrentThread = detachCurrentThread

declare global {
    var attachCurrentThread: () => void
    var detachCurrentThread: () => void
}

export { }
