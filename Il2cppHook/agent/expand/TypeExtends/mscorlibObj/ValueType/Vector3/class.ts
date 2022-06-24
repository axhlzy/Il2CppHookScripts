import { mscorlib_System_ValueType } from "../class";

class Vector3Impl extends mscorlib_System_ValueType implements Il2cppVector3 {

    x: number;
    y: number;
    z: number;

    private toFixedNum: number = 2;

    constructor(handle: NativePointer, FixedNum: number = 2) {
        super(handle);
        this.toFixedNum = FixedNum
        this.x = handle.readFloat();
        this.y = handle.add(Process.pageSize).readFloat();
        this.z = handle.add(Process.pageSize * 2).readFloat();
    }

    set FixedNum(value: number) {
        this.toFixedNum = value;
    }

    new(x: number, y: number, z: number): Vector3Impl {
        let allocMem = allocVector(0, 0, 0);
        allocMem.writeFloat(x);
        allocMem.add(Process.pageSize).writeFloat(y);
        allocMem.add(Process.pageSize * 2).writeFloat(z);
        return new Vector3Impl(allocMem);
    }

    toString(): string {
        return `Vector3(${this.handle}) : (${this.x.toFixed(this.toFixedNum)}, ${this.y.toFixed(this.toFixedNum)}, ${this.z.toFixed(this.toFixedNum)})`;
    }
}

declare global {
    namespace Il2Cpp {
        class Vector3 extends Vector3Impl { }
    }
}

Il2Cpp.Vector3 = Vector3Impl;

export { Vector3Impl }