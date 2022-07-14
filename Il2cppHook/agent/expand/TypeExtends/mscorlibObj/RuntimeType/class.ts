import { mscorlib_System_RuntimeTypeHandle_impl } from "../RuntimeTypeHandle/class";
import { mscorlib_System_Type_impl } from "../Type/class";
import "./interface"

class mscorlib_System_RuntimeType_impl extends mscorlib_System_Type_impl implements mscorlib_System_RuntimeType {

    get_AssemblyQualifiedName(): string {
        return readU16(mscorlib.Api.RuntimeType._get_AssemblyQualifiedName(this.handle));
    }

    get_BaseType(): mscorlib_System_Type_impl {
        return new mscorlib_System_Type_impl(mscorlib.Api.RuntimeType._get_BaseType(this.handle));
    }

    get_DeclaringType(): mscorlib_System_Type_impl {
        return new mscorlib_System_Type_impl(mscorlib.Api.RuntimeType._get_DeclaringType(this.handle));
    }

    get_FullName(): string {
        return readU16(mscorlib.Api.RuntimeType._get_FullName(this.handle));
    }

    get_IsEnum(): boolean {
        return mscorlib.Api.RuntimeType._get_IsEnum(this.handle);
    }

    get_IsGenericParameter(): boolean {
        return mscorlib.Api.RuntimeType._get_IsGenericParameter(this.handle);
    }

    get_IsGenericType(): boolean {
        return mscorlib.Api.RuntimeType._get_IsGenericType(this.handle);
    }

    get_Name(): string {
        return readU16(mscorlib.Api.RuntimeType._get_Name(this.handle));
    }

    get_Namespace(): string {
        return readU16(mscorlib.Api.RuntimeType._get_Namespace(this.handle));
    }

    get_ReflectedType(): mscorlib_System_Type_impl {
        return new mscorlib_System_Type_impl(mscorlib.Api.RuntimeType._get_ReflectedType(this.handle));
    }

    get_TypeHandle(): mscorlib_System_RuntimeTypeHandle {
        return new mscorlib_System_RuntimeTypeHandle_impl(mscorlib.Api.RuntimeType._get_TypeHandle(this.handle));
    }

    get_UnderlyingSystemType(): mscorlib_System_Type_impl {
        return new mscorlib_System_Type_impl(mscorlib.Api.RuntimeType._get_UnderlyingSystemType(this.handle));
    }
}

declare global {

    namespace mscorlib {
        class RuntimeType extends mscorlib_System_RuntimeType_impl { }
    }
}

mscorlib.RuntimeType = mscorlib_System_RuntimeType_impl;

export { mscorlib_System_RuntimeType_impl };