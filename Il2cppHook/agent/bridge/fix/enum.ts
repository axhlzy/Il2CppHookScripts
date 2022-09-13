export const enumNumToName = (enumValue: number, classInfo: string) => {
    let retValue: string = "Unknown"
    enumForEach(classInfo, (field: NativePointer, fieldName: string, value: number) => {
        if (Number(enumValue) === Number(value)) retValue = `${fieldName} ( ${value} ) `
    })
    return retValue
}

export const enumForEach = (className: string, callback: (field: NativePointer, fieldName: string, value: number) => void) => {
    let clsPtr = findClass(className)
    if (clsPtr.isNull()) throw new Error("Don't find class " + className)
    let localCls = new Il2Cpp.Class(findClass(className))
    if (!localCls.isEnum) throw new Error("Not enum class")
    let iter = alloc()
    let field
    while (field = Il2Cpp.Api._classGetFields(clsPtr, iter)) {
        if (field.isNull()) break
        let fieldName: string = field.readPointer().readCString()!
        let value = alloc()
        try {
            Il2Cpp.Api._fieldGetStaticValue(field, value)
        } catch (error) { }
        callback(field, fieldName, value.readPointer().toInt32())
    }
}

// export const enumNumToName1 = (value: number, enumName: string) => {
//     let clsPtr = findClass(enumName)
//     if (clsPtr.isNull()) throw new Error("Don't find class " + enumName)
//     let localCls = new Il2Cpp.Class(findClass(enumName))
//     if (!localCls.isEnum) throw new Error("Not enum class")
//     let retStr: string = ""
//     localCls.fields.forEach((field: Il2Cpp.Field) => {
//         let value: any
//         try {
//             value = field.value
//         } catch { }
//         LOGD(value + " " + field.name)
//         retStr = value
//     })
//     return retStr
// }

globalThis.testCall = () => {
    // LOGW(enumNumToName1(0x2, "OperatingSystemFamily"))

    LOGD(mscorlib.Environment.GetEnvironmentVariableNames().toString())

    mscorlib.Environment.GetEnvironmentVariableNames().forEach((item: Il2Cpp.Object, index: number) => {
        LOGD(`${index} ${item}`)
    })

}

declare global {
    var testCall: Function
}

// function read(pointer: NativePointer, type: Il2Cpp.Type): Il2Cpp.Field.Type {
//     switch (type.typeEnum) {
//         case Il2Cpp.Type.Enum.Boolean:
//             return !!pointer.readS8();
//         case Il2Cpp.Type.Enum.I1:
//             return pointer.readS8();
//         case Il2Cpp.Type.Enum.U1:
//             return pointer.readU8();
//         case Il2Cpp.Type.Enum.I2:
//             return pointer.readS16();
//         case Il2Cpp.Type.Enum.U2:
//             return pointer.readU16();
//         case Il2Cpp.Type.Enum.I4:
//             return pointer.readS32();
//         case Il2Cpp.Type.Enum.U4:
//             return pointer.readU32();
//         case Il2Cpp.Type.Enum.Char:
//             return pointer.readU16();
//         case Il2Cpp.Type.Enum.I8:
//             return pointer.readS64();
//         case Il2Cpp.Type.Enum.U8:
//             return pointer.readU64();
//         case Il2Cpp.Type.Enum.R4:
//             return pointer.readFloat();
//         case Il2Cpp.Type.Enum.R8:
//             return pointer.readDouble();
//         case Il2Cpp.Type.Enum.NativeInteger:
//         case Il2Cpp.Type.Enum.UnsignedNativeInteger:
//             return pointer.readPointer();
//         case Il2Cpp.Type.Enum.Pointer:
//             return new Il2Cpp.Pointer(pointer.readPointer(), type.class.baseType!);
//         case Il2Cpp.Type.Enum.ValueType:
//             return new Il2Cpp.ValueType(pointer, type);
//         case Il2Cpp.Type.Enum.Object:
//         case Il2Cpp.Type.Enum.Class:
//             return new Il2Cpp.Object(pointer.readPointer());
//         case Il2Cpp.Type.Enum.GenericInstance:
//             return type.class.isValueType ? new Il2Cpp.ValueType(pointer, type) : new Il2Cpp.Object(pointer.readPointer());
//         case Il2Cpp.Type.Enum.String:
//             return new Il2Cpp.String(pointer.readPointer());
//         case Il2Cpp.Type.Enum.SingleDimensionalZeroLowerBoundArray:
//         case Il2Cpp.Type.Enum.Array:
//             return new Il2Cpp.Array(pointer.readPointer());
//     }
//     throw new Error(`read: "${type.name}" (${type.typeEnum}) has not been handled yet. Please file an issue!`);
// }