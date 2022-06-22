
import { cache } from "decorator-cache-getter";

class mscorlibRuntimeTypeHandleAPI {

    @cache
    static get _ctor_0() {
        return Il2Cpp.Api.t("mscorlib", "System.Object", ".ctor", 0, "pointer", ["pointer"]);
    }

}

declare global {
    namespace mscorlib.Api {
        class RuntimeTypeHandle extends mscorlibRuntimeTypeHandleAPI { }
    }
}

mscorlib.Api.RuntimeTypeHandle = mscorlibRuntimeTypeHandleAPI;

export { }