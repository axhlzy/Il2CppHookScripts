import { FakeCommonType } from "../../base/valueResolve"
import { formartClass as FM } from "../../utils/formart"
import { HookerBase } from "../../base/base"
import { getModifier } from "./il2cppM"
import { enumNumToName } from "./enum"

export class FieldsParser {

    private mPtr: NativePointer // instance
    private mClass: Il2Cpp.Class // not null

    // using instance ptr to parse fields
    constructor(mPtr: NativePointer | Number | String, classHandle: NativePointer | string | object | number = 0) {
        // LOGD(`constructor ${mPtr} ${classHandle}`)
        if (typeof mPtr === "number") {
            this.mPtr = ptr(mPtr)
        } else if (typeof mPtr === "string") {
            if (mPtr.indexOf('0x') == 0) this.mPtr = ptr(mPtr)
            else this.mPtr = findClass(mPtr)
            if (this.mPtr.isNull()) LOGE("FieldsParser : Class not found")
        }
        else if (mPtr instanceof NativePointer) this.mPtr = mPtr
        else throw new Error("Input type is not support")

        if (classHandle == undefined || classHandle == 0) {
            try {
                this.mClass = new Il2Cpp.Object(this.mPtr).class
                this.mClass.name // use to check if instance is valid
            } catch {
                if (this.mPtr.isNull()) this.mClass = Il2Cpp.domain.assembly("mscorlib").image.class("System.Object")
                else this.mClass = new Il2Cpp.Class(this.mPtr)
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

    fieldInstance(fieldName: string): Il2Cpp.Field | null {
        if (this.mPtr.isNull()) return null
        return this.mClass.field(fieldName)
    }

    fieldValue(fieldName: string): NativePointer {
        if (this.mPtr.isNull()) return ptr(0)
        try {
            let field: Il2Cpp.Field | null = this.fieldInstance(fieldName)
            if (field == null) return ptr(0)
            if (field.isStatic) return fakeStaticField(field).readPointer()
            return this.mPtr.add(this.fieldOffset(fieldName)).readPointer()
        } catch (error) {
            return ptr(0)
        }
    }

    fieldOffset(fieldName: string): number {
        let field: Il2Cpp.Field | null = this.fieldInstance(fieldName)
        if (field == null) return -1
        return field.offset
    }

    toShow(retB: Boolean = false) {
        if (this.mPtr.isNull()) return
        newLine()
        let titile = `Found ${this.mClass.fields.length} fields in class: ${this.mClass.name} (${this.mClass.handle})`
        this.mClass.fields.length == 0 ? LOGE(titile) : LOGO(titile)
        if (this.mClass.fields.length == 0) return newLine()
        LOGO(getLine(50))
        let countNum: number = -1
        this.mClass.fields
            .sort((f1: Il2Cpp.Field, f2: Il2Cpp.Field) => f1.offset - f2.offset)
            .forEach((field: Il2Cpp.Field) => {
                let index: string = FM.alignStr(`[${++countNum}]`, 6)
                let offset: NativePointer = ptr(field.offset)
                let modifier: string = getModifier(field.flags).trim()
                let classDes: string = `${field.type.class.name} (${field.type.class.handle})`
                let fieldName: string = field.name
                LOGD(`${index}  ${offset} ${modifier} ${classDes}\t${fieldName}`) // 字段通用信息打印
                let disp = dealWithSpecialType(field, this.mPtr)
                let thisHandle: NativePointer = this.mPtr.add(field.offset)
                let thisValue: NativePointer = thisHandle.readPointer()
                let splitStr = "  --->  "
                LOGZ(`\t${thisHandle}${splitStr}${FM.alignStr(thisValue)}${String(disp).length == 0 ? "" : splitStr}${disp}`)
                if (!retB) newLine()
            })
        LOGO(getLine(50))
    }

    toString(): string {
        if (this.mPtr.isNull()) return ""
        let retMap: Map<string, any> = new Map()
        this.mClass.fields
            .sort((f1: Il2Cpp.Field, f2: Il2Cpp.Field) => f1.offset - f2.offset)
            .forEach((field: Il2Cpp.Field) => {
                if (!field.isStatic)
                    retMap.set(field.name, this.mPtr.add(field.offset).readPointer())
            })
        return JSON.stringify([...retMap]).replace(/\"/g, "'").replace(/,/g, ':')
    }
}

const dealWithSpecialType = (field: Il2Cpp.Field, thisValueP: NativePointer): string => {

    if (field.handle.isNull()) return ""

    // 即对静态变量进行值解析
    if (field.isStatic)
        return fakeStaticField(field).toString()
    // 对枚举的解析
    else if (field.type.class.isEnum) {
        let value = thisValueP.add(field.offset)
        return `Enum : ${enumNumToName(value.readPointer().toInt32(), field.type.class.name, field.type.class.handle)}`
    }

    if (thisValueP.isNull()) return ""
    let thisValue: NativePointer = thisValueP.add(field.offset).readPointer()

    return FakeCommonType(field.type, thisValue)
}

function fakeStaticField(field: Il2Cpp.Field): NativePointer {
    try {
        let tmpOut: NativePointer = alloc()
        Il2Cpp.api.fieldGetStaticValue(field.handle, tmpOut)
        return tmpOut
    } catch (error) {
        return ptr(0)
    }
}

declare global {
    // list fields to string
    var lfss: (mPtr: NativePointer, classHandle?: NativePointer) => string
    // list fields to show
    var lfs: (mPtr: NativePointer, classHandle?: NativePointer) => void
    // list filed contain parent class
    var lfp: (mPtr: NativePointer) => void
    // list filed to return field type
    var lft: (mPtr: NativePointer, fieldName: string, classHandle?: NativePointer) => Il2Cpp.Field | null
    // list filed to return value
    var lfv: (mPtr: NativePointer, fieldName: string, classHandle?: NativePointer) => NativePointer
    // list fields to return whth try catch
    var lfvt: (mPtr: NativePointer, fieldName: string, classHandle?: NativePointer) => NativePointer
    // list filedoffset to return
    var lfo: (mPtr: NativePointer, fieldName: string, classHandle?: NativePointer) => number
    // list methods from instance
    var lms: (mPtr: NativePointer) => void
}


globalThis.lfss = (mPtr: NativePointer, classHandle: NativePointer | string | object | number = 0) => new FieldsParser(mPtr, classHandle).toString()

// 解析当前实例的 fields / 非实例不解析值 （s means show）
globalThis.lfs = (mPtr: NativePointer, classHandle: NativePointer | string | object | number = 0) => new FieldsParser(mPtr, classHandle).toShow()

// 解析实例的 fields 以及 class 父级 fields （p means parents）
globalThis.lfp = (mPtr: NativePointer) => {
    let classType: Array<mscorlib.Type> = (getTypeParent(mPtr) as Array<mscorlib.Type>).reverse().map((localType: mscorlib.Type) => {
        let localT = new Il2Cpp.Class(localType.handle)
        if (localT.isAbstract) {
            let objT = Il2Cpp.corlib.class("System.Object")
            return new mscorlib.Type(localT.inflate(objT).type.handle)
        }
        return localType
    })
    setTimeout(() => {
        classType.reverse().forEach(type => new FieldsParser(mPtr, type.class).toShow(true))
    }, 200)
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
    } catch {
        return new NativePointer(0)
    }
}

globalThis.lms = (mPtr: NativePointer) => HookerBase.showMethods(new Il2Cpp.Object(checkCmdInput(mPtr)).class.handle)
