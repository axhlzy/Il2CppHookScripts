import { type } from "os";
import { mscorlib_System_Object_impl } from "../class";
import "./interface"

class mscorlib_System_RuntimeTypeHandle_impl extends mscorlib_System_Object_impl implements mscorlib_System_RuntimeTypeHandle {


}


declare global {

    namespace Il2cpp {
        class RuntimeTypeHandle extends mscorlib_System_RuntimeTypeHandle_impl { }
    }
}


Il2cpp.RuntimeTypeHandle = mscorlib_System_RuntimeTypeHandle_impl;

export { mscorlib_System_RuntimeTypeHandle_impl };