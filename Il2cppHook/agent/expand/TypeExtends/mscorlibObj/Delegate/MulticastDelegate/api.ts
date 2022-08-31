import { cache } from "decorator-cache-getter"

class System_MulticastDelegate_API {
    // public override Void GetObjectData(SerializationInfo info,StreamingContext context)
    @cache
    static get _GetObjectData() {
        return Il2Cpp.Api.o("mscorlib", "System.MulticastDelegate", "GetObjectData", 2, ["System.Runtime.Serialization.SerializationInfo", "System.Runtime.Serialization.StreamingContext"], "void", ["pointer", "pointer", "pointer"])
    }

    // protected sealed override Object DynamicInvokeImpl(Object[] args)
    @cache
    static get _DynamicInvokeImpl() {
        return Il2Cpp.Api.o("mscorlib", "System.MulticastDelegate", "DynamicInvokeImpl", 1, ["System.Object[]"], "pointer", ["pointer", "pointer"])
    }

    // public sealed override Boolean Equals(Object obj)
    @cache
    static get _Equals() {
        return Il2Cpp.Api.o("mscorlib", "System.MulticastDelegate", "Equals", 1, ["System.Object"], "pointer", ["pointer", "pointer"])
    }

    // public sealed override Int32 GetHashCode()
    @cache
    static get _GetHashCode() {
        return Il2Cpp.Api.o("mscorlib", "System.MulticastDelegate", "GetHashCode", 0, [], "pointer", ["pointer"])
    }

    // protected override MethodInfo GetMethodImpl()
    @cache
    static get _GetMethodImpl() {
        return Il2Cpp.Api.o("mscorlib", "System.MulticastDelegate", "GetMethodImpl", 0, [], "pointer", ["pointer"])
    }

    // public sealed override Delegate[] GetInvocationList()
    @cache
    static get _GetInvocationList() {
        return Il2Cpp.Api.o("mscorlib", "System.MulticastDelegate", "GetInvocationList", 0, [], "pointer", ["pointer"])
    }

    // protected sealed override Delegate CombineImpl(Delegate follow)
    @cache
    static get _CombineImpl() {
        return Il2Cpp.Api.o("mscorlib", "System.MulticastDelegate", "CombineImpl", 1, ["System.Delegate"], "pointer", ["pointer", "pointer"])
    }

    // private Int32 LastIndexOf(Delegate[] haystack,Delegate[] needle)
    @cache
    static get _LastIndexOf() {
        return Il2Cpp.Api.o("mscorlib", "System.MulticastDelegate", "LastIndexOf", 2, ["System.Delegate[]", "System.Delegate[]"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // protected sealed override Delegate RemoveImpl(Delegate value)
    @cache
    static get _RemoveImpl() {
        return Il2Cpp.Api.o("mscorlib", "System.MulticastDelegate", "RemoveImpl", 1, ["System.Delegate"], "pointer", ["pointer", "pointer"])
    }

}

mscorlib.Api.MulticastDelegate = System_MulticastDelegate_API

declare global {
    namespace mscorlib.Api {
        class MulticastDelegate extends System_MulticastDelegate_API { }
    }
}

export { }