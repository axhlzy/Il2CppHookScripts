import { cache } from "decorator-cache-getter"

class System_Delegate_API {
    // public MethodInfo get_Method()
    @cache
    static get _get_Method() {
        return Il2Cpp.Api.o("mscorlib", "System.Delegate", "get_Method", 0, [], "pointer", ["pointer"])
    }

    // private MethodInfo GetVirtualMethod_internal()
    @cache
    static get _GetVirtualMethod_internal() {
        return Il2Cpp.Api.o("mscorlib", "System.Delegate", "GetVirtualMethod_internal", 0, [], "pointer", ["pointer"])
    }

    // public Object get_Target()
    @cache
    static get _get_Target() {
        return Il2Cpp.Api.o("mscorlib", "System.Delegate", "get_Target", 0, [], "pointer", ["pointer"])
    }

    // internal static Delegate CreateDelegate_internal(Type type,Object target,MethodInfo info,Boolean throwOnBindFailure)
    @cache
    static get _CreateDelegate_internal() {
        return Il2Cpp.Api.o("mscorlib", "System.Delegate", "CreateDelegate_internal", 4, ["System.Type", "System.Object", "System.Reflection.MethodInfo", "System.Boolean"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // private static Boolean arg_type_match(Type delArgType,Type argType)
    @cache
    static get _arg_type_match() {
        return Il2Cpp.Api.o("mscorlib", "System.Delegate", "arg_type_match", 2, ["System.Type", "System.Type"], "pointer", ["pointer", "pointer"])
    }

    // private static Boolean arg_type_match_this(Type delArgType,Type argType,Boolean boxedThis)
    @cache
    static get _arg_type_match_this() {
        return Il2Cpp.Api.o("mscorlib", "System.Delegate", "arg_type_match_this", 3, ["System.Type", "System.Type", "System.Boolean"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // private static Boolean return_type_match(Type delReturnType,Type returnType)
    @cache
    static get _return_type_match() {
        return Il2Cpp.Api.o("mscorlib", "System.Delegate", "return_type_match", 2, ["System.Type", "System.Type"], "pointer", ["pointer", "pointer"])
    }

    // public static Delegate CreateDelegate(Type type,Object firstArgument,MethodInfo method,Boolean throwOnBindFailure)
    @cache
    static get _CreateDelegate() {
        return Il2Cpp.Api.o("mscorlib", "System.Delegate", "CreateDelegate", 4, ["System.Type", "System.Object", "System.Reflection.MethodInfo", "System.Boolean"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // private static Delegate CreateDelegate(Type type,Object firstArgument,MethodInfo method,Boolean throwOnBindFailure,Boolean allowClosed)
    @cache
    static get _CreateDelegate_type_firstArgument_method_throwOnBindFailure_allowClosed() {
        return Il2Cpp.Api.o("mscorlib", "System.Delegate", "CreateDelegate", 5, ["System.Type", "System.Object", "System.Reflection.MethodInfo", "System.Boolean", "System.Boolean"], "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public static Delegate CreateDelegate(Type type,Object firstArgument,MethodInfo method)
    @cache
    static get _CreateDelegate_type_firstArgument_method() {
        return Il2Cpp.Api.o("mscorlib", "System.Delegate", "CreateDelegate", 3, ["System.Type", "System.Object", "System.Reflection.MethodInfo"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // public static Delegate CreateDelegate(Type type,MethodInfo method,Boolean throwOnBindFailure)
    @cache
    static get _CreateDelegate_type_method_throwOnBindFailure() {
        return Il2Cpp.Api.o("mscorlib", "System.Delegate", "CreateDelegate", 3, ["System.Type", "System.Reflection.MethodInfo", "System.Boolean"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // public static Delegate CreateDelegate(Type type,MethodInfo method)
    @cache
    static get _CreateDelegate_type_method() {
        return Il2Cpp.Api.o("mscorlib", "System.Delegate", "CreateDelegate", 2, ["System.Type", "System.Reflection.MethodInfo"], "pointer", ["pointer", "pointer"])
    }

    // public static Delegate CreateDelegate(Type type,Object target,String method)
    @cache
    static get _CreateDelegate_type_target_method() {
        return Il2Cpp.Api.o("mscorlib", "System.Delegate", "CreateDelegate", 3, ["System.Type", "System.Object", "System.String"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // private static MethodInfo GetCandidateMethod(Type type,Type target,String method,BindingFlags bflags,Boolean ignoreCase,Boolean throwOnBindFailure)
    @cache
    static get _GetCandidateMethod() {
        return Il2Cpp.Api.o("mscorlib", "System.Delegate", "GetCandidateMethod", 6, ["System.Type", "System.Type", "System.String", "System.Reflection.BindingFlags", "System.Boolean", "System.Boolean"], "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public static Delegate CreateDelegate(Type type,Type target,String method,Boolean ignoreCase,Boolean throwOnBindFailure)
    @cache
    static get _CreateDelegate_type_target_method_ignoreCase_throwOnBindFailure() {
        return Il2Cpp.Api.o("mscorlib", "System.Delegate", "CreateDelegate", 5, ["System.Type", "System.Type", "System.String", "System.Boolean", "System.Boolean"], "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public static Delegate CreateDelegate(Type type,Type target,String method)
    @cache
    static get _CreateDelegate_type_target_method_() {
        return Il2Cpp.Api.o("mscorlib", "System.Delegate", "CreateDelegate", 3, ["System.Type", "System.Type", "System.String"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // public static Delegate CreateDelegate(Type type,Object target,String method,Boolean ignoreCase,Boolean throwOnBindFailure)
    @cache
    static get _CreateDelegate_type_target_method_ignoreCase_throwOnBindFailure_() {
        return Il2Cpp.Api.o("mscorlib", "System.Delegate", "CreateDelegate", 5, ["System.Type", "System.Object", "System.String", "System.Boolean", "System.Boolean"], "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer"])
    }

    // public static Delegate CreateDelegate(Type type,Object target,String method,Boolean ignoreCase)
    @cache
    static get _CreateDelegate_type_target_method_ignoreCase() {
        return Il2Cpp.Api.o("mscorlib", "System.Delegate", "CreateDelegate", 4, ["System.Type", "System.Object", "System.String", "System.Boolean"], "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // public Object DynamicInvoke(Object[] args)
    @cache
    static get _DynamicInvoke() {
        return Il2Cpp.Api.o("mscorlib", "System.Delegate", "DynamicInvoke", 1, ["System.Object[]"], "pointer", ["pointer", "pointer"])
    }

    // private Void InitializeDelegateData()
    @cache
    static get _InitializeDelegateData() {
        return Il2Cpp.Api.o("mscorlib", "System.Delegate", "InitializeDelegateData", 0, [], "void", ["pointer"])
    }

    // protected virtual Object DynamicInvokeImpl(Object[] args)
    @cache
    static get _DynamicInvokeImpl() {
        return Il2Cpp.Api.o("mscorlib", "System.Delegate", "DynamicInvokeImpl", 1, ["System.Object[]"], "pointer", ["pointer", "pointer"])
    }

    // public virtual Object Clone()
    @cache
    static get _Clone() {
        return Il2Cpp.Api.o("mscorlib", "System.Delegate", "Clone", 0, [], "pointer", ["pointer"])
    }

    // public override Boolean Equals(Object obj)
    @cache
    static get _Equals() {
        return Il2Cpp.Api.o("mscorlib", "System.Delegate", "Equals", 1, ["System.Object"], "pointer", ["pointer", "pointer"])
    }

    // public override Int32 GetHashCode()
    @cache
    static get _GetHashCode() {
        return Il2Cpp.Api.o("mscorlib", "System.Delegate", "GetHashCode", 0, [], "pointer", ["pointer"])
    }

    // protected virtual MethodInfo GetMethodImpl()
    @cache
    static get _GetMethodImpl() {
        return Il2Cpp.Api.o("mscorlib", "System.Delegate", "GetMethodImpl", 0, [], "pointer", ["pointer"])
    }

    // public virtual Void GetObjectData(SerializationInfo info,StreamingContext context)
    @cache
    static get _GetObjectData() {
        return Il2Cpp.Api.o("mscorlib", "System.Delegate", "GetObjectData", 2, ["System.Runtime.Serialization.SerializationInfo", "System.Runtime.Serialization.StreamingContext"], "void", ["pointer", "pointer", "pointer"])
    }

    // public virtual Delegate[] GetInvocationList()
    @cache
    static get _GetInvocationList() {
        return Il2Cpp.Api.o("mscorlib", "System.Delegate", "GetInvocationList", 0, [], "pointer", ["pointer"])
    }

    // public static Delegate Combine(Delegate a,Delegate b)
    @cache
    static get _Combine() {
        return Il2Cpp.Api.o("mscorlib", "System.Delegate", "Combine", 2, ["System.Delegate", "System.Delegate"], "pointer", ["pointer", "pointer"])
    }

    // public static Delegate Combine(Delegate[] delegates)
    @cache
    static get _Combine_delegates() {
        return Il2Cpp.Api.o("mscorlib", "System.Delegate", "Combine", 1, ["System.Delegate[]"], "pointer", ["pointer"])
    }

    // protected virtual Delegate CombineImpl(Delegate d)
    @cache
    static get _CombineImpl() {
        return Il2Cpp.Api.o("mscorlib", "System.Delegate", "CombineImpl", 1, ["System.Delegate"], "pointer", ["pointer", "pointer"])
    }

    // public static Delegate Remove(Delegate source,Delegate value)
    @cache
    static get _Remove() {
        return Il2Cpp.Api.o("mscorlib", "System.Delegate", "Remove", 2, ["System.Delegate", "System.Delegate"], "pointer", ["pointer", "pointer"])
    }

    // protected virtual Delegate RemoveImpl(Delegate d)
    @cache
    static get _RemoveImpl() {
        return Il2Cpp.Api.o("mscorlib", "System.Delegate", "RemoveImpl", 1, ["System.Delegate"], "pointer", ["pointer", "pointer"])
    }

    // public static Boolean op_Equality(Delegate d1,Delegate d2)
    @cache
    static get _op_Equality() {
        return Il2Cpp.Api.o("mscorlib", "System.Delegate", "op_Equality", 2, ["System.Delegate", "System.Delegate"], "pointer", ["pointer", "pointer"])
    }

    // public static Boolean op_Inequality(Delegate d1,Delegate d2)
    @cache
    static get _op_Inequality() {
        return Il2Cpp.Api.o("mscorlib", "System.Delegate", "op_Inequality", 2, ["System.Delegate", "System.Delegate"], "pointer", ["pointer", "pointer"])
    }

    // internal static Delegate CreateDelegateNoSecurityCheck(RuntimeType type,Object firstArgument,MethodInfo method)
    @cache
    static get _CreateDelegateNoSecurityCheck() {
        return Il2Cpp.Api.o("mscorlib", "System.Delegate", "CreateDelegateNoSecurityCheck", 3, ["System.RuntimeType", "System.Object", "System.Reflection.MethodInfo"], "pointer", ["pointer", "pointer", "pointer"])
    }

    // internal static MulticastDelegate AllocDelegateLike_internal(Delegate d)
    @cache
    static get _AllocDelegateLike_internal() {
        return Il2Cpp.Api.o("mscorlib", "System.Delegate", "AllocDelegateLike_internal", 1, ["System.Delegate"], "pointer", ["pointer"])
    }

}

mscorlib.Api.Delegate = System_Delegate_API

declare global {
    namespace mscorlib.Api {
        class Delegate extends System_Delegate_API { }
    }
}

export { }