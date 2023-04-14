import { mscorlib_System_Object_impl as System_Object } from "../../class"
import { System_ValueType_Impl } from "../class"

type System_Void = void

class System_Collections_DictionaryEntry_Impl extends System_ValueType_Impl {

    _key: System_Object = lfv(this.handle, "_key") as unknown as System_Object
    _value: System_Object = lfv(this.handle, "_value") as unknown as System_Object

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    _ctor_DictionaryEntry(key: System_Object, value: System_Object): System_Void {
        return mscorlib.Api.DictionaryEntry.__ctor(this.handle, key, value)
    }

    get_Key(): System_Object {
        return mscorlib.Api.DictionaryEntry._get_Key(this.handle)
    }

    get_Value(): System_Object {
        return mscorlib.Api.DictionaryEntry._get_Value(this.handle)
    }

}

mscorlib.DictionaryEntry = System_Collections_DictionaryEntry_Impl

declare global {
    namespace mscorlib {
        class DictionaryEntry extends System_Collections_DictionaryEntry_Impl { }
    }
}

export { System_Collections_DictionaryEntry_Impl as System_Collections_DictionaryEntry }
