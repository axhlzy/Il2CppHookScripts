import { cache } from "decorator-cache-getter"

class System_Collections_DictionaryEntry_API {
    // public Void .ctor(Object key, Object value)
    @cache
    static get __ctor() {
        return Il2Cpp.Api.o("mscorlib", "System.Collections.DictionaryEntry", ".ctor", 2, ["System.Object", "System.Object"], "void", ["pointer", "pointer", "pointer"])
    }

    // public Object get_Key()
    @cache
    static get _get_Key() {
        return Il2Cpp.Api.o("mscorlib", "System.Collections.DictionaryEntry", "get_Key", 0, [], "pointer", ["pointer"])
    }

    // public Object get_Value()
    @cache
    static get _get_Value() {
        return Il2Cpp.Api.o("mscorlib", "System.Collections.DictionaryEntry", "get_Value", 0, [], "pointer", ["pointer"])
    }

}

mscorlib.Api.DictionaryEntry = System_Collections_DictionaryEntry_API

declare global {
    namespace mscorlib.Api {
        class DictionaryEntry extends System_Collections_DictionaryEntry_API { }
    }
}

export { }