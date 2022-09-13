import { mscorlib_System_Object_impl as System_Object } from "../../class"
import { System_ValueType_Impl } from "../class"
import { System_Int32_Impl as System_Int32 } from "../Int32/class"

type System_Void_xin = NativePointer
type System_Void = void
type System_Int64 = number
type System_Boolean = boolean
type System_String = string
type System_Runtime_Serialization_SerializationInfo = NativePointer
type System_Runtime_Serialization_StreamingContext = NativePointer

class System_IntPtr_Impl extends System_ValueType_Impl {

    m_value: System_Void_xin = <System_Void_xin>lfv(this.handle, "m_value")
    Zero: System_IntPtr_Impl = new System_IntPtr_Impl(lfv(this.handle, "Zero"))

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    _ctor_Int32(value: System_Int32): System_Void {
        return mscorlib.Api.IntPtr.__ctor_Int32(this.handle, value)
    }

    _ctor_Int64(value: System_Int64): System_Void {
        return mscorlib.Api.IntPtr.__ctor_value_Int64(this.handle, value)
    }

    _ctor_1(value: System_Void_xin): System_Void {
        return mscorlib.Api.IntPtr.__ctor_value_void_(this.handle, value)
    }

    _ctor_2(info: System_Runtime_Serialization_SerializationInfo, context: System_Runtime_Serialization_StreamingContext): System_Void {
        return mscorlib.Api.IntPtr.__ctor_info_context(this.handle, info, context)
    }

    static get_Size(): System_Int32 {
        return mscorlib.Api.IntPtr._get_Size().tpInt32()
    }

    // System_Runtime.Serialization.ISerializable.GetObjectData(info: System_Runtime.Serialization.SerializationInfo, context: System_Runtime.Serialization.StreamingContext): System_Void {
    //         return mscorlib.Api.IntPtr._System_Runtime.Serialization.ISerializable.GetObjectData(this.handle, info, context)
    //     }

    Equals(obj: System_Object): System_Boolean {
        return mscorlib.Api.IntPtr._Equals(this.handle, obj)
    }

    GetHashCode(): System_Int32 {
        return mscorlib.Api.IntPtr._GetHashCode(this.handle)
    }

    ToInt64(): System_Int64 {
        return mscorlib.Api.IntPtr._ToInt64(this.handle)
    }

    ToPointer(): System_Void_xin {
        return mscorlib.Api.IntPtr._ToPointer(this.handle)
    }

    ToString(): System_String {
        return readU16(mscorlib.Api.IntPtr._ToString(this.handle))
    }

    ToString_1(format: System_String): System_String {
        return readU16(mscorlib.Api.IntPtr._ToString(this.handle, format))
    }

    static op_Equality(value1: System_IntPtr_Impl, value2: System_IntPtr_Impl): System_Boolean {
        return mscorlib.Api.IntPtr._op_Equality(value1.handle, value2.handle)
    }

    static op_Inequality(value1: System_IntPtr_Impl, value2: System_IntPtr_Impl): System_Boolean {
        return mscorlib.Api.IntPtr._op_Inequality(value1.handle, value2.handle)
    }

    static op_Explicit(value: System_Int32): System_IntPtr_Impl {
        return mscorlib.Api.IntPtr._op_Explicit(value)
    }

    static op_Explicit_Int64(value: System_Int64): System_IntPtr_Impl {
        return mscorlib.Api.IntPtr._op_Explicit(value)
    }

    static op_Explicit_void_(value: System_Void_xin): System_IntPtr_Impl {
        return mscorlib.Api.IntPtr._op_Explicit(value)
    }

    static op_Explicit_ret_Int32(value: System_IntPtr_Impl): System_Int32 {
        return mscorlib.Api.IntPtr._op_Explicit(value.handle)
    }

    static op_Explicit_ret_Void_xin(value: System_IntPtr_Impl): System_Void_xin {
        return mscorlib.Api.IntPtr._op_Explicit(value.handle)
    }

    IsNull(): System_Boolean {
        return mscorlib.Api.IntPtr._IsNull(this.handle)
    }

}

mscorlib.IntPtr = System_IntPtr_Impl

declare global {
    namespace mscorlib {
        class IntPtr extends System_IntPtr_Impl { }
    }
}

export { System_IntPtr_Impl }