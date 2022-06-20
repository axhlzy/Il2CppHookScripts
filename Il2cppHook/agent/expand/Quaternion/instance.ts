import { mscorlib_System_Object_impl } from "../Object/mscorlibObj/instance";


class QuaternionImpl extends mscorlib_System_Object_impl implements Il2cppQuaternion {
    x: number;
    y: number;
    z: number;
    w: number;
    constructor(mPtr: NativePointer) {
        super(mPtr);
        this.x = mPtr.add(0x0).readFloat();
        this.y = mPtr.add(0x4).readFloat();
        this.z = mPtr.add(0x8).readFloat();
        this.w = mPtr.add(0xc).readFloat();
    }
    _ctor_4(x: number, y: number, z: number, w: number): Il2cppQuaternion {
        throw new Error("Method not implemented.");
    }
    _Angle_2(a: Il2cppQuaternion, b: Il2cppQuaternion): number {
        throw new Error("Method not implemented.");
    }
    _AngleAxis_2(angle: number, axis: Il2cppVector3): Il2cppQuaternion {
        throw new Error("Method not implemented.");
    }
    _Dot_2(a: Il2cppQuaternion, b: Il2cppQuaternion): number {
        throw new Error("Method not implemented.");
    }
    _Euler_1(euler: Il2cppVector3): Il2cppQuaternion {
        throw new Error("Method not implemented.");
    }
    _Euler_3(x: number, y: number, z: number): Il2cppQuaternion {
        throw new Error("Method not implemented.");
    }
    _FromToRotation_2(from: Il2cppVector3, to: Il2cppVector3): Il2cppQuaternion {
        throw new Error("Method not implemented.");
    }
    _GetHashCode(): number {
        throw new Error("Method not implemented.");
    }
    _Inverse_1(rotation: Il2cppQuaternion): Il2cppQuaternion {
        throw new Error("Method not implemented.");
    }
    _Lerp_3(a: Il2cppQuaternion, b: Il2cppQuaternion, t: number): Il2cppQuaternion {
        throw new Error("Method not implemented.");
    }
    _ToString(): string {
        throw new Error("Method not implemented.");
    }
    _get_eulerAngles(): Il2Cpp.Vector3 {
        throw new Error("Method not implemented.");
    }
    _get_identity(): Il2cppQuaternion {
        throw new Error("Method not implemented.");
    }
}

declare global {
    namespace Il2Cpp {
        class Quaternion extends QuaternionImpl { }
    }
}

Il2Cpp.Quaternion = QuaternionImpl;

export { }