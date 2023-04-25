import { UnityEngine_Material_Impl } from "../../Material/class"
import { UnityEngine_ScriptableObject_Impl } from "../class"

type UnityEngine_Material = UnityEngine_Material_Impl
type System_Int32 = number
type System_Void = void

class TMPro_TMP_Asset_Impl extends UnityEngine_ScriptableObject_Impl {

    m_InstanceID: System_Int32 = lfv(this.handle, "m_InstanceID").toInt32()
    hashCode: System_Int32 = lfv(this.handle, "hashCode").toInt32()
    material: UnityEngine_Material = new UnityEngine_Material_Impl(lfv(this.handle, "material"))
    materialHashCode: System_Int32 = lfv(this.handle, "materialHashCode").toInt32()

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    get_instanceID(): System_Int32 {
        return Il2Cpp.Api.TMP_Asset._get_instanceID(this.handle)
    }

    _ctor_TMP_Asset(): System_Void {
        return Il2Cpp.Api.TMP_Asset.__ctor(this.handle)
    }

}

Il2Cpp.TMP_Asset = TMPro_TMP_Asset_Impl

declare global {
    namespace Il2Cpp {
        class TMP_Asset extends TMPro_TMP_Asset_Impl { }
    }
}

export { TMPro_TMP_Asset_Impl }