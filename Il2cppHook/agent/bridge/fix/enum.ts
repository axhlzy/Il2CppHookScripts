export const enumNumToName = (enumValue: number, classInfo: string, classPtr?: NativePointer) => {
    let retValue: string = "Unknown"
    enumForEach(classInfo, (_field: NativePointer, fieldName: string, value: number) => {
        if (!fieldName.includes("value__"))
            if (Number(enumValue) === Number(value)) retValue = `${fieldName} ( ${value} ) `
    }, classPtr)
    return retValue
}

export const enumForEach = (className: string, callback: (field: NativePointer, fieldName: string, value: number) => void, clazzPtr: NativePointer = ptr(0)) => {
    let local_clazzPtr: NativePointer = clazzPtr
    if (local_clazzPtr.isNull()) {
        if (clazzPtr == undefined || clazzPtr == null || (clazzPtr instanceof NativePointer && clazzPtr.isNull())) {
            local_clazzPtr = findClass(className)
        }
    }
    if (local_clazzPtr.isNull()) throw new Error("Don't find class " + className)
    let local_clazz: Il2Cpp.Class = new Il2Cpp.Class(local_clazzPtr)
    if (!local_clazz.isEnum) throw new Error("Not enum class")
    let iter_ptr = alloc()
    let field_ptr: NativePointer = ptr(0)
    while (field_ptr = Il2Cpp.api.classGetFields(local_clazzPtr, iter_ptr)) {
        if (field_ptr.isNull()) break
        let fieldName: string = field_ptr.readPointer().readCString()!
        let value: NativePointer = alloc()
        try {
            Il2Cpp.api.fieldGetStaticValue(field_ptr, value)
        } catch { }
        callback(field_ptr, fieldName, value.readPointer().toInt32())
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
    LOGW(enumNumToName(0x2, "OperatingSystemFamily"))

    LOGD(mscorlib.Environment.GetEnvironmentVariableNames().toString())

    mscorlib.Environment.GetEnvironmentVariableNames().forEach((item: Il2Cpp.Object, index: number) => {
        LOGD(`${index} ${item}`)
    })

    // LOGD(new PackDictionary(ptr(0x6c88f188)).entries.handle)
    // LOGD(new PackDictionary(ptr(0x6c88f188)).get_Entry().get_Item(0))
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
