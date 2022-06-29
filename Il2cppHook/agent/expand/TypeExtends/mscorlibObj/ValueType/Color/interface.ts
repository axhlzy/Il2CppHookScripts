interface Il2cppColor {
    r: number;
    g: number;
    b: number;
    a: number;

    // .ctor(Single, Single, Single)
    ctor_3(r: number, g: number, b: number): Il2cppColor;

    // .ctor(Single, Single, Single, Single)
    ctor_4(r: number, g: number, b: number, a: number): Il2cppColor;

    // Equals(Object) : Boolean
    Equals_obj(obj: any): boolean;

    // Equals(Color): Boolean
    Equals_color(color: Il2cppColor): boolean;

    // GetHashCode() : Int32
    GetHashCode(): number;

    // ToString() : String
    toString(): string;

    // ToString(String, IFormatProvider) : String
    toString_str_IFormatProvider(format: string, provider: any): string;

    // static methds ↓

    // Lerp(Color, Color, Single): Color
    // op_Addition(Color, Color): Color
    // op_Division(Color, Single) : Color
    // op_Equality(Color, Color) : Boolean
    // op_Implicit(Color) : Vector4
    // op_Implicit(Vector4) : Color
    // op_Inequality(Color, Color) : Boolean
    // op_Multiply(Color, Single) : Color
    // op_Multiply(Color, Color) : Color
    // op_Subtraction(Color, Color) : Color

}