import { cache } from "decorator-cache-getter"
import { PTR } from "../base/enum"
import { PTR2NativePtr } from "../utils/common"


class Il2cppGameObject extends Il2Cpp.Object {

    constructor(handle: NativePointer) {
        super(handle)
    }

    @cache
    get name() {
        return Il2Cpp.Api._typeGetName(this)
    }

    get transform(): Transform {
        return new Transform(ptr(0))
    }

    get layer() {
        return null
    }

}

function getTransformFormGameObject(gameObject: PTR) {
    gameObject = PTR2NativePtr(gameObject)
    return new Il2Cpp.GameObject(gameObject).transform.handle
}


globalThis.gobj2transform = getTransformFormGameObject;

declare global {
    namespace Il2Cpp {
        class GameObject extends Il2cppGameObject { }
    }
    var gobj2transform: (gameObject: PTR) => NativePointer
}

Il2Cpp.GameObject = Il2cppGameObject;

export { getTransformFormGameObject }