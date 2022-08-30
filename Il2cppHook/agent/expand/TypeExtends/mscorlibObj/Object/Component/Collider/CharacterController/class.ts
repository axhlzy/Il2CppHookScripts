import { UnityEngine_Collider_Impl } from "../class"

class UnityEngine_CharacterController_Impl extends UnityEngine_Collider_Impl {

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }
}

Il2Cpp.CharacterController = UnityEngine_CharacterController_Impl

declare global {
    namespace Il2Cpp {
        class CharacterController extends UnityEngine_CharacterController_Impl { }
    }
}

export { UnityEngine_CharacterController_Impl }