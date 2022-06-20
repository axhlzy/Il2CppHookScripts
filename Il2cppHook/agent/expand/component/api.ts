
import "./export"
import "./instance"
import "./interface"

class ComponentAPI {

}

declare global {
    namespace Il2Cpp.Api {
        class Component extends ComponentAPI { }
    }
}

Il2Cpp.Api.Component = ComponentAPI;

export { }
