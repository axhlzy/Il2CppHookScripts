import { mscorlib_System_ValueType } from "../class";

class Vector3Impl extends mscorlib_System_ValueType implements Il2cppVector3 {

}

declare global {
    namespace Il2Cpp {
        class Vector3 extends Vector3Impl { }
    }
}

Il2Cpp.Vector3 = Vector3Impl;

export { }