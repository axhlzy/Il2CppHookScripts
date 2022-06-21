
import { mscorlib_System_Object_impl } from "../../class";
import "./export"
import "./class"
import "./interface"

class QuaternionAPI extends mscorlib_System_Object_impl {

}

declare global {
    namespace Il2Cpp.Api {
        class Quaternion extends QuaternionAPI { }
    }
}

Il2Cpp.Api.Quaternion = QuaternionAPI;

export { }