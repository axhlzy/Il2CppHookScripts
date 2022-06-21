
class ComponentImpl extends Il2Cpp.Object implements Il2cppComponent {

}

declare global {
    namespace Il2Cpp {
        class Component extends ComponentImpl { }
    }
}

Il2Cpp.Component = ComponentImpl;

export { }