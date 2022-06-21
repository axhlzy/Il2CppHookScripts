interface Il2cppQuaternion {
    x: number;
    y: number;
    z: number;
    w: number;

    // .ctor(Single, Single, Single, Single);
    _ctor_4(x: number, y: number, z: number, w: number): Il2cppQuaternion;

    // public static float Angle(Quaternion a, Quaternion b) 
    _Angle_2(a: Il2cppQuaternion, b: Il2cppQuaternion): number;

    // public static Quaternion AngleAxis(float angle, Vector3 axis) 
    _AngleAxis_2(angle: number, axis: Il2cppVector3): Il2cppQuaternion;

    // public static float Dot(Quaternion a, Quaternion b) 
    _Dot_2(a: Il2cppQuaternion, b: Il2cppQuaternion): number;

    // public static Quaternion Euler(Vector3 euler) 
    _Euler_1(euler: Il2cppVector3): Il2cppQuaternion;

    // public static Quaternion Euler(float x, float y, float z) 
    _Euler_3(x: number, y: number, z: number): Il2cppQuaternion;

    // public static Quaternion FromToRotation(Vector3 fromDirection, Vector3 toDirection)
    _FromToRotation_2(from: Il2cppVector3, to: Il2cppVector3): Il2cppQuaternion;

    // public override int GetHashCode()
    _GetHashCode(): number;

    // public static Quaternion Inverse(Quaternion rotation) 
    _Inverse_1(rotation: Il2cppQuaternion): Il2cppQuaternion;

    // public static Quaternion Lerp(Quaternion a, Quaternion b, float t) 
    _Lerp_3(a: Il2cppQuaternion, b: Il2cppQuaternion, t: number): Il2cppQuaternion;

    // ...........

    // public override string ToString() 
    _ToString(): string;

    // public Vector3 get_eulerAngles() 
    _get_eulerAngles(): Il2Cpp.Vector3;

    // public static Quaternion get_identity() 
    _get_identity(): Il2cppQuaternion;

}