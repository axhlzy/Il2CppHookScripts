import { cache } from "decorator-cache-getter"

class UnityEngine_CharacterController_API {
}

Il2Cpp.Api.CharacterController = UnityEngine_CharacterController_API

declare global {
    namespace Il2Cpp.Api {
        class CharacterController extends UnityEngine_CharacterController_API { }
    }
}

export { }