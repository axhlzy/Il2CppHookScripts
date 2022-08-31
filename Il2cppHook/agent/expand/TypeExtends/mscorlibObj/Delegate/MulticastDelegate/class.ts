import { mscorlib_System_Object_impl as System_Object } from "../../class"
import { System_Delegate_Impl as System_Delegate, System_Delegate_Impl } from "../class"

type System_Runtime_Serialization_StreamingContext = NativePointer
type System_Reflection_MethodInfo = NativePointer

class System_MulticastDelegate_Impl extends System_Delegate_Impl {

    delegates: System_Delegate[] = lfv(this.handle, "delegates") as unknown as System_Delegate[]

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    GetObjectData(info: System_Runtime_Serialization_StreamingContext, context: System_Runtime_Serialization_StreamingContext): void {
        return mscorlib.Api.MulticastDelegate._GetObjectData(this.handle, info, context)
    }

    DynamicInvokeImpl(args: System_Object[]): System_Object {
        return mscorlib.Api.MulticastDelegate._DynamicInvokeImpl(this.handle, args)
    }

    Equals(obj: System_Object): boolean {
        return mscorlib.Api.MulticastDelegate._Equals(this.handle, obj)
    }

    GetHashCode(): number {
        return mscorlib.Api.MulticastDelegate._GetHashCode(this.handle)
    }

    GetMethodImpl(): System_Reflection_MethodInfo {
        return mscorlib.Api.MulticastDelegate._GetMethodImpl(this.handle)
    }

    GetInvocationList(): System_Delegate[] {
        return mscorlib.Api.MulticastDelegate._GetInvocationList(this.handle)
    }

    CombineImpl(follow: System_Delegate): System_Delegate {
        return new System_Delegate(mscorlib.Api.MulticastDelegate._CombineImpl(this.handle, follow.handle))
    }

    LastIndexOf(haystack: System_Delegate[], needle: System_Delegate[]): number {
        return mscorlib.Api.MulticastDelegate._LastIndexOf(this.handle, haystack, needle)
    }

    RemoveImpl(value: System_Delegate): System_Delegate {
        return new System_Delegate(mscorlib.Api.MulticastDelegate._RemoveImpl(this.handle, value.handle))
    }

}

mscorlib.MulticastDelegate = System_MulticastDelegate_Impl

declare global {
    namespace mscorlib {
        class MulticastDelegate extends System_MulticastDelegate_Impl { }
    }
}

export { System_MulticastDelegate_Impl }