interface mscorlib_System_Type {

    // Equals(Object): Boolean
    Equals_obj(obj: any): boolean;

    // Equals(Type) : Boolean
    Equals_type(type: mscorlib_System_Type): boolean;

    // GetArrayRank() : Int32
    GetArrayRank(): number;

    // GetConstructor(Type[]) : ConstructorInfo
    GetConstructor(types: mscorlib_System_Type[]): any;

    // GetEnumName(Object) : String
    GetEnumName(obj: any): string;

    // GetEnumNames() : String[]
    GetEnumNames(): string[];

    // GetHashCode() : Int32
    GetHashCode(): number;

    // GetType() : Type
    GetType_0(): mscorlib_System_Type;

    // GetType(String) : Type
    GetType_1(typeName: string): mscorlib_System_Type;

    // ToString() : String
    toString(): string;

    // GetTypeFromHandle(RuntimeTypeHandle) : Type
    // GetTypeFromHandle(handle: mscorlib_System_RuntimeTypeHandle): mscorlib_System_Type;

    // GetTypeHandle(Object) : RuntimeTypeHandle
    // GetTypeHandle(obj: NativePointer): mscorlib_System_RuntimeTypeHandle_impl;

    // todo 未完全实现，摘取一些  ..........

}