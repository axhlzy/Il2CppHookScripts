import { mscorlib_System_RuntimeType_impl as System_RuntimeType } from "../RuntimeType/class"
import { getMethodDesFromMethodInfo } from "../../../../bridge/fix/il2cppM"
import { mscorlib_System_Object_impl as System_Object } from "../class"
import { mscorlib_System_Type_impl as System_Type } from "../Type/class"

type System_IntPtr = NativePointer
type System_Reflection_MethodInfo = NativePointer
type System_DelegateData = NativePointer
type System_Runtime_Serialization_StreamingContext = NativePointer
type System_Reflection_BindingFlags = NativePointer
type System_Runtime_Serialization_SerializationInfo = NativePointer
type System_MulticastDelegate = NativePointer

class System_Delegate_Impl extends System_Object {

    method_ptr: System_IntPtr = lfv(this.handle, "method_ptr") as unknown as System_IntPtr
    invoke_impl: System_IntPtr = lfv(this.handle, "invoke_impl") as unknown as System_IntPtr
    m_target: System_Object = new System_Object(lfv(this.handle, "m_target"))
    method: Il2Cpp.Method = new Il2Cpp.Method(lfv(this.handle, "method"))
    delegate_trampoline: System_IntPtr = lfv(this.handle, "delegate_trampoline") as unknown as System_IntPtr
    extra_arg: System_IntPtr = lfv(this.handle, "extra_arg") as unknown as System_IntPtr
    method_code: System_IntPtr = lfv(this.handle, "method_code") as unknown as System_IntPtr
    method_info: System_Reflection_MethodInfo = lfv(this.handle, "method_info") as unknown as System_Reflection_MethodInfo
    original_method_info: System_Reflection_MethodInfo = lfv(this.handle, "original_method_info") as unknown as System_Reflection_MethodInfo
    data: System_DelegateData = lfv(this.handle, "data") as unknown as System_DelegateData
    method_is_virtual: boolean = !lfv(this.handle, "method_is_virtual").isNull()

    constructor(handleOrWrapper: NativePointer) {
        if (handleOrWrapper instanceof NativePointer && !handleOrWrapper.isNull()) {
            super(handleOrWrapper)
        }
    }

    get_Method(): System_Reflection_MethodInfo {
        return mscorlib.Api.Delegate._get_Method(this.handle)
    }

    GetVirtualMethod_internal(): System_Reflection_MethodInfo {
        return mscorlib.Api.Delegate._GetVirtualMethod_internal(this.handle)
    }

    get_Target(): System_Object {
        return mscorlib.Api.Delegate._get_Target(this.handle)
    }

    static CreateDelegate_internal(type: System_Type, target: System_Object, info: System_Reflection_MethodInfo, throwOnBindFailure: boolean): System_Delegate_Impl {
        return mscorlib.Api.Delegate._CreateDelegate_internal(type.handle, target.handle, info, throwOnBindFailure)
    }

    static arg_type_match(delArgType: System_Type, argType: System_Type): boolean {
        return mscorlib.Api.Delegate._arg_type_match(delArgType, argType)
    }

    static arg_type_match_this(delArgType: System_Type, argType: System_Type, boxedThis: boolean): boolean {
        return mscorlib.Api.Delegate._arg_type_match_this(delArgType, argType, boxedThis)
    }

    static return_type_match(delReturnType: System_Type, returnType: System_Type): boolean {
        return mscorlib.Api.Delegate._return_type_match(delReturnType, returnType)
    }

    static CreateDelegate(type: System_Type, firstArgument: System_Object, method: System_Reflection_MethodInfo, throwOnBindFailure: boolean): System_Delegate_Impl {
        return new System_Delegate_Impl(mscorlib.Api.Delegate._CreateDelegate(type.handle, firstArgument, method, throwOnBindFailure))
    }

    static CreateDelegate_5_(type: System_Type, firstArgument: System_Object, method: System_Reflection_MethodInfo, throwOnBindFailure: boolean, allowClosed: boolean): System_Delegate_Impl {
        return mscorlib.Api.Delegate._CreateDelegate(type.handle, firstArgument, method, throwOnBindFailure, allowClosed)
    }

    static CreateDelegate_3_(type: System_Type, firstArgument: System_Object, method: System_Reflection_MethodInfo): System_Delegate_Impl {
        return new System_Delegate_Impl(mscorlib.Api.Delegate._CreateDelegate(type.handle, firstArgument, method))
    }

    static CreateDelegate_3(type: System_Type, method: System_Reflection_MethodInfo, throwOnBindFailure: boolean): System_Delegate_Impl {
        return new System_Delegate_Impl(mscorlib.Api.Delegate._CreateDelegate(type.handle, method, throwOnBindFailure))
    }

    static CreateDelegate_2(type: System_Type, method: System_Reflection_MethodInfo): System_Delegate_Impl {
        return new System_Delegate_Impl(mscorlib.Api.Delegate._CreateDelegate(type.handle, method))
    }

    static CreateDelegate_3__(type: System_Type, target: System_Object, method: string): System_Delegate_Impl {
        return new System_Delegate_Impl(mscorlib.Api.Delegate._CreateDelegate(type.handle, target.handle, method))
    }

    static GetCandidateMethod(type: System_Type, target: System_Type, method: string, bflags: System_Reflection_BindingFlags, ignoreCase: boolean, throwOnBindFailure: boolean): System_Reflection_MethodInfo {
        return mscorlib.Api.Delegate._GetCandidateMethod(type.handle, target.handle, method, bflags, ignoreCase, throwOnBindFailure)
    }

    static CreateDelegate_5__(type: System_Type, target: System_Type, method: string, ignoreCase: boolean, throwOnBindFailure: boolean): System_Delegate_Impl {
        return new System_Delegate_Impl(mscorlib.Api.Delegate._CreateDelegate(type.handle, target.handle, method, ignoreCase, throwOnBindFailure))
    }

    static CreateDelegate_3___(type: System_Type, target: System_Type, method: string): System_Delegate_Impl {
        return new System_Delegate_Impl(mscorlib.Api.Delegate._CreateDelegate(type.handle, target.handle, method))
    }

    static CreateDelegate_5(type: System_Type, target: System_Object, method: string, ignoreCase: boolean, throwOnBindFailure: boolean): System_Delegate_Impl {
        return new System_Delegate_Impl(mscorlib.Api.Delegate._CreateDelegate(type.handle, target.handle, method, ignoreCase, throwOnBindFailure))
    }

    static CreateDelegate_4(type: System_Type, target: System_Object, method: string, ignoreCase: boolean): System_Delegate_Impl {
        return new System_Delegate_Impl(mscorlib.Api.Delegate._CreateDelegate(type.handle, target.handle, method, ignoreCase))
    }

    DynamicInvoke(args: System_Object[]): System_Object {
        return new System_Object(mscorlib.Api.Delegate._DynamicInvoke(this.handle, args))
    }

    InitializeDelegateData(): void {
        return mscorlib.Api.Delegate._InitializeDelegateData(this.handle)
    }

    DynamicInvokeImpl(args: System_Object[]): System_Object {
        return new System_Object(mscorlib.Api.Delegate._DynamicInvokeImpl(this.handle, args))
    }

    Clone(): System_Object {
        return new System_Object(mscorlib.Api.Delegate._Clone(this.handle))
    }

    Equals(obj: System_Object): boolean {
        return mscorlib.Api.Delegate._Equals(this.handle, obj)
    }

    GetHashCode(): number {
        return mscorlib.Api.Delegate._GetHashCode(this.handle)
    }

    GetMethodImpl(): System_Reflection_MethodInfo {
        return mscorlib.Api.Delegate._GetMethodImpl(this.handle)
    }

    GetObjectData(info: System_Runtime_Serialization_SerializationInfo, context: System_Runtime_Serialization_StreamingContext): void {
        return mscorlib.Api.Delegate._GetObjectData(this.handle, info, context)
    }

    GetInvocationList(): System_Delegate_Impl[] {
        return mscorlib.Api.Delegate._GetInvocationList(this.handle)
    }

    static Combine(a: System_Delegate_Impl, b: System_Delegate_Impl): System_Delegate_Impl {
        return new System_Delegate_Impl(mscorlib.Api.Delegate._Combine(a.handle, b.handle))
    }

    static Combine_1(delegates: System_Delegate_Impl[]): System_Delegate_Impl {
        return new System_Delegate_Impl(mscorlib.Api.Delegate._Combine(delegates))
    }

    CombineImpl(d: System_Delegate_Impl): System_Delegate_Impl {
        return new System_Delegate_Impl(mscorlib.Api.Delegate._CombineImpl(this.handle, d.handle))
    }

    static Remove(source: System_Delegate_Impl, value: System_Delegate_Impl): System_Delegate_Impl {
        return new System_Delegate_Impl(mscorlib.Api.Delegate._Remove(source.handle, value.handle))
    }

    RemoveImpl(d: System_Delegate_Impl): System_Delegate_Impl {
        return new System_Delegate_Impl(mscorlib.Api.Delegate._RemoveImpl(this.handle, d.handle))
    }

    static op_Equality(d1: System_Delegate_Impl, d2: System_Delegate_Impl): boolean {
        return mscorlib.Api.Delegate._op_Equality(d1.handle, d2.handle)
    }

    static op_Inequality(d1: System_Delegate_Impl, d2: System_Delegate_Impl): boolean {
        return mscorlib.Api.Delegate._op_Inequality(d1.handle, d2.handle)
    }

    static CreateDelegateNoSecurityCheck(type: System_RuntimeType, firstArgument: System_Object, method: System_Reflection_MethodInfo): System_Delegate_Impl {
        return mscorlib.Api.Delegate._CreateDelegateNoSecurityCheck(type, firstArgument, method)
    }

    static AllocDelegateLike_internal(d: System_Delegate_Impl): System_MulticastDelegate {
        return mscorlib.Api.Delegate._AllocDelegateLike_internal(d.handle)
    }

    toString(detailName: boolean = false): string {
        try {
            const method: Il2Cpp.Method = this.method
            const methodName: string = detailName ? getMethodDesFromMethodInfo(method.handle) : method.name
            return `${methodName} | MI:${this.method.handle} | MP:${method.relativeVirtualAddress} | TG:${this.m_target} | virtual:${this.method_is_virtual}`
        } catch (error) {
            return "Error"
        }
    }

    toArray(): any[] {
        return [this.method, this.method_ptr, this.m_target, this.method_is_virtual]
    }

}

mscorlib.Delegate = System_Delegate_Impl

declare global {
    namespace mscorlib {
        class Delegate extends System_Delegate_Impl { }
    }
}

export { System_Delegate_Impl }