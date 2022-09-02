import { formartClass } from "../../utils/formart"
import { getModifier } from "./il2cppM"

export class FieldsParser {

    private mPtr: NativePointer // instance
    private mClass: Il2Cpp.Class // not null

    // using instance ptr to parse fields
    constructor(mPtr: NativePointer | Number | String, classHandle: NativePointer | string | object | number = 0) {
        if (typeof mPtr === "number") {
            this.mPtr = ptr(mPtr)
        } else if (typeof mPtr === "string") {
            if (mPtr.indexOf('0x') == 0) this.mPtr = ptr(mPtr)
            else this.mPtr = findClass(mPtr)
            if (this.mPtr.isNull()) throw new Error("FieldsParser : Class not found")
        }
        else if (mPtr instanceof NativePointer) this.mPtr = mPtr
        else throw new Error("Input type is not support")

        if (classHandle == undefined || classHandle == 0) {
            try {
                this.mClass = new Il2Cpp.Object(this.mPtr).class
                this.mClass.name // use to check if instance is valid
            } catch (error) {
                this.mClass = new Il2Cpp.Class(this.mPtr)
                this.mPtr = ptr(0) // not instance need set it to null
            }
        } else {
            let clsPtr: NativePointer
            if (typeof classHandle === "number") {
                clsPtr = ptr(classHandle)
            } else if (typeof classHandle === "string") {
                if (classHandle.indexOf('0x') == 0) clsPtr = ptr(classHandle)
                throw new Error("Input string like '0x...' ")
            }
            else if (typeof classHandle === "object") clsPtr = ptr(String(classHandle))
            else throw new Error("Input type is not support")
            this.mClass = new Il2Cpp.Class(clsPtr)
        }
    }

    fieldInstance(fieldName: string): Il2Cpp.Field {
        if (this.mPtr.isNull()) throw new Error("fieldInstance : Instance is null")
        return this.mClass.field(fieldName)
    }

    fieldValue(fieldName: string): NativePointer {
        let field = this.fieldInstance(fieldName)
        if (field.isStatic) return this.fakeStaticField(field).readPointer()
        return this.mPtr.add(this.fieldOffset(fieldName)).readPointer()
    }

    fieldOffset(fieldName: string): number {
        return this.fieldInstance(fieldName).offset
    }

    toShow(retB: Boolean = false) {
        newLine()
        let titile = `Found ${this.mClass.fields.length} fields in class: ${this.mClass.name} (${this.mClass.handle})`
        this.mClass.fields.length == 0 ? LOGE(titile) : LOGO(titile)
        if (this.mClass.fields.length == 0) return newLine()
        LOGO(getLine(50))
        let countNum: number = -1
        this.mClass.fields
            .sort((f1: Il2Cpp.Field, f2: Il2Cpp.Field) => f1.offset - f2.offset)
            .forEach(field => {
                let index = formartClass.alignStr(`[${++countNum}]`, 5)
                let offset = ptr(field.offset)
                let modifier = getModifier(field.flags).trim()
                let classDes = `${field.type.class.name} (${field.type.class.handle})`
                let fieldName = field.name
                // 字段通用信息打印
                LOGD(`${index}  ${offset} ${modifier} ${classDes}\t${fieldName}`)
                // 即对静态变量进行值解析
                if (field.isStatic) {
                    let tmpOut = this.fakeStaticField(field)
                    let realPtr = tmpOut.readPointer()
                    // LOGZ(`\t${tmpOut}  --->  ${realPtr}  ---> ${new Il2Cpp.Object(realPtr).toString()}`)
                    LOGZ(`\t${tmpOut}  --->  ${realPtr}  ---> ${field.value}`)
                }
                // 即对实例进行值解析
                else if (!this.mPtr.isNull()) {
                    let thisHandle = this.mPtr.add(field.offset)
                    let thisValue = thisHandle.readPointer()
                    let thisString: string = "--->  "
                    try {
                        // 需要考虑一些自定义处理(包含基本数据类型)，手动解析的一些常用类型
                        let retDes = dealWithSpecialType(field, thisValue)
                        // 其次才是包含大多数情况的通用处理逻辑（Object.toString()）（这个方法可能会抛异常）
                        thisString += retDes === "" ? new Il2Cpp.Object(thisValue).toString() : retDes
                    } catch {
                        try {
                            // 使用 frida-il2cpp-bridge 提供的手段来解析（这个方法可能会抛异常）
                            thisString += field.value.toString()
                        }
                        // 实在莫得解析代码那就直接空着吧...
                        catch { thisString = "" }
                    }
                    LOGZ(`\t${thisHandle}  --->  ${formartClass.alignStr(thisValue)}  ${thisString}`)
                }
                // 对 class 只展示 fields，无法值解析
                else { }
                if (!retB) newLine()
            })
        LOGO(getLine(50))
    }

    private fakeStaticField(field: Il2Cpp.Field): NativePointer {
        let tmpOut = alloc()
        Il2Cpp.Api._fieldGetStaticValue(field.handle, tmpOut)
        return tmpOut
    }
}

const dealWithSpecialType = (field: Il2Cpp.Field, thisValue: NativePointer) => {
    // LOGE("" + field.type.class.name)

    // todo 判断枚举类型

    switch (field.type.class.name) {
        case "Boolean":
            return thisValue.isNull() ? "FALSE" : "TRUE"
        case "Int32":
            return thisValue.toInt32()
        // 此处拓展解析逻辑

        default:
            // 空字符串即不处理，留在后面走通用处理逻辑
            return ""
    }
}

declare global {
    // list fields to show
    var lfs: (mPtr: NativePointer, classHandle?: NativePointer) => void
    // list filed contain parent class
    var lfp: (mPtr: NativePointer) => void
    // list filed to return field type
    var lft: (mPtr: NativePointer, fieldName: string, classHandle?: NativePointer) => Il2Cpp.Field
    // list filed to return value
    var lfv: (mPtr: NativePointer, fieldName: string, classHandle?: NativePointer) => NativePointer
    // list fields to return whth try catch
    var lfvt: (mPtr: NativePointer, fieldName: string, classHandle?: NativePointer) => NativePointer
    // list filedoffset to return
    var lfo: (mPtr: NativePointer, fieldName: string, classHandle?: NativePointer) => number
}

// 解析当前实例的 fields / 非实例不解析值 （s means show）
globalThis.lfs = (mPtr: NativePointer, classHandle: NativePointer | string | object | number = 0) => new FieldsParser(mPtr, classHandle).toShow()

// 解析实例的 fields 以及 class 父级 fields （p means parents）
globalThis.lfp = (mPtr: NativePointer) => {
    let classType: Array<mscorlib.Type> = getTypeParent(mPtr) as Array<mscorlib.Type>
    classType.reverse().forEach(type => new FieldsParser(mPtr, type.class).toShow(true))
    showTypeParent(mPtr)
}

// 拿到实例 field type (t means type)
globalThis.lft = (mPtr: NativePointer, fieldName: string, classHandle?: NativePointer) => new FieldsParser(mPtr, classHandle).fieldInstance(fieldName)

// 拿到实例指针指向的值 (v means value)
globalThis.lfv = (mPtr: NativePointer, fieldName: string, classHandle?: NativePointer) => new FieldsParser(mPtr, classHandle).fieldValue(fieldName)

// 拿到实例 field offset (o means offset)
globalThis.lfo = (mPtr: NativePointer, fieldName: string, classHandle?: NativePointer) => new FieldsParser(mPtr, classHandle).fieldOffset(fieldName)

// 拿到实例指定的 field 值 (try catch)
globalThis.lfvt = (mPtr: NativePointer, fieldName: string, classHandle?: NativePointer) => {
    try {
        return new FieldsParser(mPtr, classHandle).fieldValue(fieldName)
    } catch { return new NativePointer(0) }
}