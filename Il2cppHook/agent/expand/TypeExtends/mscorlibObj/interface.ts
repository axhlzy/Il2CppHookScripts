interface mscorlib_System_Object {
    // .ctor()
    ctor(): mscorlib_System_Object;

    // ToString() : String
    toString(): string;

    // MemberwiseClone() : Object
    memberwiseClone(): mscorlib_System_Object;

    // GetType() : Type
    getType(): mscorlib.Type;

    // Finalize() : Void
    finalize(): void;

    // GetHashCode() : Int32
    getHashCode(): number;

    // Equals(obj : Object) : Boolean
    // _equals(obj: mscorlib_System_Object): boolean;

    // static Equals(Object, Object) : Boolean
    // _equals(objA: mscorlib_System_Object, objB: mscorlib_System_Object): boolean;
}