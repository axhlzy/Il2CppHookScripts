export const setActiveT = (transform: Il2Cpp.Transform, active: boolean = false) => transform.get_gameObject().SetActive(active)

export const setActiveTChange = (transform: Il2Cpp.Transform) => transform.get_gameObject().SetActive(!transform.get_gameObject().get_activeSelf())

// export const GetComponentsInChildren = (transform: Il2Cpp.Transform, type: Il2Cpp.Type, includeInactive: boolean = false): void => {
//     // transform.GetComponentsInChildren(type, includeInactive)
//     Il2Cpp.perform(() => {
//         Il2Cpp.attachedThreads.forEach((thread: Il2Cpp.Thread) => {
//             LOGD(`Thread: ${thread.id} ${thread.object.toString()}`)
//             let tmpMem: NativePointer = alloc(0x1000)
//             callFunction(0xC9B6A8, 0x7b015e2600, tmpMem, 0x7b01e86a20)
//         })
//     })
// }

// declare global {
//     var getComponentsInChildren: (transform: Il2Cpp.Transform, type: Il2Cpp.Type, includeInactive?: boolean) => void
// }

// globalThis.getComponentsInChildren = GetComponentsInChildren