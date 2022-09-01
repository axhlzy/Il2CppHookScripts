import { UnityEngine_Vector3_Impl as Vector3 } from "./class"


globalThis.v3_one = (): Vector3 => {
    return Il2Cpp.Vector3.get_one
}

globalThis.v3_zero = (): Vector3 => {
    return Il2Cpp.Vector3.get_zero
}

globalThis.v3_forward = (): Vector3 => {
    return Il2Cpp.Vector3.get_forward
}

globalThis.v3_back = (): Vector3 => {
    return Il2Cpp.Vector3.get_back
}

globalThis.v3_up = (): Vector3 => {
    return Il2Cpp.Vector3.get_up
}

globalThis.v3_down = (): Vector3 => {
    return Il2Cpp.Vector3.get_down
}

globalThis.v3_left = (): Vector3 => {
    return Il2Cpp.Vector3.get_left
}

globalThis.v3_right = (): Vector3 => {
    return Il2Cpp.Vector3.get_right
}

declare global {
    var v3_one: () => Vector3
    var v3_zero: () => Vector3
    var v3_forward: () => Vector3
    var v3_back: () => Vector3
    var v3_up: () => Vector3
    var v3_down: () => Vector3
    var v3_left: () => Vector3
    var v3_right: () => Vector3
}