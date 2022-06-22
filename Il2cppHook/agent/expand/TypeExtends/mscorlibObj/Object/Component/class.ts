import { ObjectIl2cpp_impl } from "../class";

class ComponentImpl extends ObjectIl2cpp_impl implements Il2cppComponent {
    constructor(handle: NativePointerValue) {
        super(handle);
    }
}

declare global {
    namespace Il2Cpp {
        class Component extends ComponentImpl { }
    }
}

Il2Cpp.Component = ComponentImpl;

export { ComponentImpl }