export const setActiveT = (transform: Il2Cpp.Transform, active: boolean = false) => transform.get_gameObject().SetActive(active)

export const setActiveTChange = (transform: Il2Cpp.Transform) => transform.get_gameObject().SetActive(!transform.get_gameObject().get_activeSelf())