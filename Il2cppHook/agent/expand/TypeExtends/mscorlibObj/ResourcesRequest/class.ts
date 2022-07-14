import { mscorlib_System_Type_impl } from "../Type/class";

class ResourcesRequest_impl extends mscorlib_System_Type_impl {


}

declare global {

    namespace mscorlib {
        class ResourcesRequest extends ResourcesRequest_impl { }
    }
}

mscorlib.ResourcesRequest = ResourcesRequest_impl;

export { ResourcesRequest_impl };