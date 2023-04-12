import { cache } from "decorator-cache-getter"

class UnityEngine_CustomYieldInstruction_API {
    // public abstract Boolean get_keepWaiting()
    @cache
    static get _get_keepWaiting() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.CustomYieldInstruction", "get_keepWaiting", 0, [], "pointer", ["pointer"])
    }

    // public Object get_Current()
    @cache
    static get _get_Current() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.CustomYieldInstruction", "get_Current", 0, [], "pointer", ["pointer"])
    }

    // public Boolean MoveNext()
    @cache
    static get _MoveNext() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.CustomYieldInstruction", "MoveNext", 0, [], "pointer", ["pointer"])
    }

    // public virtual Void Reset()
    @cache
    static get _Reset() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.CustomYieldInstruction", "Reset", 0, [], "void", ["pointer"])
    }

    // protected Void .ctor()
    @cache
    static get __ctor() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.CustomYieldInstruction", ".ctor", 0, [], "void", ["pointer"])
    }
}

Il2Cpp.Api.CustomYieldInstruction = UnityEngine_CustomYieldInstruction_API

declare global {
    namespace Il2Cpp.Api {
        class CustomYieldInstruction extends UnityEngine_CustomYieldInstruction_API { }
    }
}

export { }