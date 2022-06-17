import { cache } from "decorator-cache-getter";

class GameObjectAPI {

    @cache
    static get _AddComponent() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "AddComponent", 1, "pointer", ["pointer", "pointer"]);
    }

    @cache
    static get _GetComponent() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "GetComponent", 1, "pointer", ["pointer", "pointer"]);
    }


}

declare global {
    namespace Il2Cpp.Api {
        class GameObject extends GameObjectAPI { }
    }
}

Il2Cpp.Api.GameObject = GameObjectAPI;

export { }