import { mscorlib_System_Object_impl } from "../class"
import { mscorlib_System_Type_impl } from "../Type/class"

type mscorlib_System_Runtime_Serialization_SerializationInfo_impl = NativePointer
type mscorlib_System_Reflection_MethodInfo_impl = NativePointer
type mscorlib_System_Runtime_Serialization_StreamingContext_impl = NativePointer

export class mscorlib_System_Delegate_impl extends mscorlib_System_Object_impl {

    // data : DelegateData
    data: NativePointer = lfv(this.handle, "data", findClass("Delegate"))
    // delegate_trampoline : IntPtr
    delegate_trampoline: NativePointer = lfv(this.handle, "delegate_trampoline", findClass("Delegate"))
    // extra_arg : IntPtr
    extra_arg: NativePointer = lfv(this.handle, "extra_arg", findClass("Delegate"))
    // invoke_impl : IntPtr
    invoke_impl: NativePointer = lfv(this.handle, "invoke_impl", findClass("Delegate"))
    // m_target : Object
    m_target: NativePointer = lfv(this.handle, "m_target", findClass("Delegate"))
    // method : IntPtr
    method: NativePointer = lfv(this.handle, "method", findClass("Delegate"))
    // method_code : IntPtr
    method_code: NativePointer = lfv(this.handle, "method_code", findClass("Delegate"))
    // method_info : MethodInfo
    method_info: NativePointer = lfv(this.handle, "method_info", findClass("Delegate"))
    // method_is_virtual : Boolean
    method_is_virtual: NativePointer = lfv(this.handle, "method_is_virtual", findClass("Delegate"))
    // method_ptr : IntPtr
    method_ptr: NativePointer = lfv(this.handle, "method_ptr", findClass("Delegate"))
    // original_method_info : MethodInfo
    original_method_info: NativePointer = lfv(this.handle, "original_method_info", findClass("Delegate"))

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    /**
     * 
     * @param call // Clone() : Object
    @cache
    static get _Clone_0() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.InvokableCallList", "Clone", 0, "pointer", ["pointer"])
    }

    // Combine(Delegate[]) : Delegate
    @cache
    static get _Combine_1() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "Combine", 1, "pointer", ["pointer", "pointer"])
    }

    // Combine(Delegate, Delegate) : Delegate
    @cache
    static get _Combine_2() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "Combine", 2, "pointer", ["pointer", "pointer"])
    }

    // CombineImpl(Delegate) : Delegate
    @cache
    static get _CombineImpl_1() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "CombineImpl", 1, "pointer", ["pointer", "pointer"])
    }

    // CreateDelegate(Type, MethodInfo) : Delegate
    @cache
    static get _CreateDelegate_2() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "CreateDelegate", 2, "pointer", ["pointer", "pointer", "pointer"])
    }

    // CreateDelegate(Type, Object, MethodInfo) : Delegate
    @cache
    static get _CreateDelegate_3() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "CreateDelegate", 3, "pointer", ["pointer", "pointer", "pointer", "pointer"])
    }

    // ......

    // DynamicInvoke(Object[]) : Object
    @cache
    static get _DynamicInvoke() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "DynamicInvoke", 1, "pointer", ["pointer", "pointer"])
    }

    // DynamicInvokeImpl(Object[]) : Object
    @cache
    static get _DynamicInvokeImpl() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "DynamicInvokeImpl", 1, "pointer", ["pointer", "pointer"])
    }

    // Equals(Object) : Boolean
    @cache
    static get _Equals() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "Equals", 1, "bool", ["pointer", "pointer"])
    }

    // GetHashCode() : Int32
    @cache
    static get _GetHashCode() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "GetHashCode", 0, "int", ["pointer"])
    }

    // GetInvocationList() : Delegate[]
    @cache
    static get _GetInvocationList() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "GetInvocationList", 0, "pointer", ["pointer"])
    }

    // GetMethodImpl() : MethodInfo
    @cache
    static get _GetMethodImpl() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "GetMethodImpl", 0, "pointer", ["pointer"])
    }

    // GetObjectData(SerializationInfo, StreamingContext) : Void
    @cache
    static get _GetObjectData() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "GetObjectData", 2, "void", ["pointer", "pointer", "pointer"])
    }

    // GetVirtualMethod_internal() : MethodInfo
    @cache
    static get _GetVirtualMethod_internal() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "GetVirtualMethod_internal", 0, "pointer", ["pointer"])
    }

    // op_Equality(Delegate, Delegate) : Boolean
    @cache
    static get _op_Equality() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "op_Equality", 2, "bool", ["pointer", "pointer"])
    }

    // op_Inequality(Delegate, Delegate) : Boolean
    @cache
    static get _op_Inequality() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "op_Inequality", 2, "bool", ["pointer", "pointer"])
    }

    // Remove(Delegate, Delegate) : Delegate
    @cache
    static get _Remove() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "Remove", 2, "pointer", ["pointer", "pointer", "pointer"])
    }

    // RemoveImpl(Delegate) : Delegate
    @cache
    static get _RemoveImpl() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "RemoveImpl", 1, "pointer", ["pointer", "pointer"])
    }

    // return_type_match(Type, Type) : Boolean
    @cache
    static get _return_type_match() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "return_type_match", 2, "bool", ["pointer", "pointer"])
    }

    // get_Method() : MethodInfo
    @cache
    static get _get_Method() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "get_Method", 0, "pointer", ["pointer"])
    }

    // get_Target() : Object
    @cache
    static get _get_Target() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "get_Target", 0, "pointer", ["pointer"])
    }
     */

    Clone_0(): mscorlib_System_Delegate_impl {
        return new Il2cpp.Api.Delegate._Clone_0(this.handle)
    }

    Combine_1(arg0: mscorlib_System_Delegate_impl): mscorlib_System_Delegate_impl {
        return new Il2cpp.Api.Delegate._Combine_1(this.handle, arg0.handle)
    }

    Combine_2(arg0: mscorlib_System_Delegate_impl, arg1: mscorlib_System_Delegate_impl): mscorlib_System_Delegate_impl {
        return new Il2cpp.Api.Delegate._Combine_2(this.handle, arg0.handle, arg1.handle)
    }

    CreateDelegate_3(arg0: NativePointer, arg1: NativePointer): mscorlib_System_Delegate_impl {
        return new Il2cpp.Api.Delegate._CreateDelegate_3(this.handle, arg0, arg1)
    }

    DynamicInvoke(arg0: mscorlib_System_Object_impl[]): mscorlib_System_Object_impl {
        return new Il2cpp.Api.Delegate._DynamicInvoke(this.handle, arg0)
    }

    DynamicInvokeImpl(arg0: mscorlib_System_Object_impl[]): mscorlib_System_Object_impl {
        return new Il2cpp.Api.Delegate._DynamicInvokeImpl(this.handle, arg0)
    }

    Equals(arg0: mscorlib_System_Object_impl): boolean {
        return new Il2cpp.Api.Delegate._Equals(this.handle, arg0.handle)
    }

    GetHashCode(): number {
        return new Il2cpp.Api.Delegate._GetHashCode(this.handle)
    }

    GetInvocationList(): mscorlib_System_Delegate_impl[] {
        return new Il2cpp.Api.Delegate._GetInvocationList(this.handle)
    }

    GetMethodImpl(): mscorlib_System_Reflection_MethodInfo_impl {
        return new Il2cpp.Api.Delegate._GetMethodImpl(this.handle)
    }

    GetObjectData(arg0: mscorlib_System_Runtime_Serialization_SerializationInfo_impl, arg1: mscorlib_System_Runtime_Serialization_StreamingContext_impl): void {
        return new Il2cpp.Api.Delegate._GetObjectData(this.handle, arg0, arg1)
    }

    GetVirtualMethod_internal(): mscorlib_System_Reflection_MethodInfo_impl {
        return new Il2cpp.Api.Delegate._GetVirtualMethod_internal(this.handle)
    }

    op_Equality(arg0: mscorlib_System_Delegate_impl, arg1: mscorlib_System_Delegate_impl): boolean {
        return new Il2cpp.Api.Delegate._op_Equality(this.handle, arg0.handle, arg1.handle)
    }

    op_Inequality(arg0: mscorlib_System_Delegate_impl, arg1: mscorlib_System_Delegate_impl): boolean {
        return new Il2cpp.Api.Delegate._op_Inequality(this.handle, arg0.handle, arg1.handle)
    }

    Remove(arg0: mscorlib_System_Delegate_impl, arg1: mscorlib_System_Delegate_impl): mscorlib_System_Delegate_impl {
        return new Il2cpp.Api.Delegate._Remove(this.handle, arg0.handle, arg1.handle)
    }

    RemoveImpl(arg0: mscorlib_System_Delegate_impl): mscorlib_System_Delegate_impl {
        return new Il2cpp.Api.Delegate._RemoveImpl(this.handle, arg0.handle)
    }

    return_type_match(arg0: mscorlib_System_Type_impl, arg1: mscorlib_System_Type_impl): boolean {
        return new Il2cpp.Api.Delegate._return_type_match(this.handle, arg0.handle, arg1.handle)
    }

    get_Method(): mscorlib_System_Reflection_MethodInfo_impl {
        return new Il2cpp.Api.Delegate._get_Method(this.handle)
    }

    get_Target(): mscorlib_System_Object_impl {
        return new Il2cpp.Api.Delegate._get_Target(this.handle)
    }
}

declare global {
    namespace Il2cpp {
        class Delegate extends mscorlib_System_Delegate_impl { }
    }
}

Il2cpp.Delegate = mscorlib_System_Delegate_impl;

export { mscorlib_System_Object_impl };