const HookWWWCtor = () => {
    //todo
}

declare global {
    var HookWWWCtor: () => void
}

globalThis.HookWWWCtor = HookWWWCtor

export { }