import { MonoBehaviourImpl } from "../class";

class SelectableImpl extends MonoBehaviourImpl implements Il2cppSelectable {

    Awake(): void {
        return Il2Cpp.Api.Selectable._Awake(this.handle)
    }

}

declare global {
    namespace Il2Cpp {
        class Selectable extends SelectableImpl { }
    }
}

Il2Cpp.Selectable = SelectableImpl;

export { SelectableImpl }