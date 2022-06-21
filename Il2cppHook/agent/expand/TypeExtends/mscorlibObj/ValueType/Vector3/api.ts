
import "./export"
import "./class"
import "./interface"

class Vector3API {

}

declare global {
    namespace Il2Cpp.Api {
        class Vector3 extends Vector3API { }
    }
}

Il2Cpp.Api.Vector3 = Vector3API;

export { }
