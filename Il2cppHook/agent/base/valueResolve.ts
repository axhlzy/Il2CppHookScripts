import { methodToString } from "../bridge/fix/il2cppM"
import { UnityEngine_Object } from "../expand/TypeExtends/mscorlibObj/Object/class"
import { getObjName } from "../expand/TypeExtends/mscorlibObj/Object/export"
import { UnityEngine_Color_Impl } from "../expand/TypeExtends/mscorlibObj/ValueType/Color/class"
import { formartClass as FM} from "../utils/formart"
import { readInt, readInt64, readSingle, readU16, readUInt } from "../utils/reader"

class ValueResolve {

    private cacheId: string = ""
    private method: Il2Cpp.Method
    private args: InvocationArguments
    private retval: NativePointer = ptr(0)

    public constructor(cacheID: string, methodInfo: Il2Cpp.Method) {
        this.cacheId = cacheID
        this.method = methodInfo
        this.args = new Array<NativePointer>(methodInfo.genericParameterCount)
    }

    public getCacheId(): string {
        return this.cacheId
    }

    public setCacheId(cacheId: string): ValueResolve {
        this.cacheId = cacheId
        return this
    }

    public getMethod(): Il2Cpp.Method {
        return this.method
    }

    public setMethod(method: Il2Cpp.Method): ValueResolve {
        this.method = method
        this.args = new Array<NativePointer>(method.genericParameterCount)
        return this
    }

    public setArg(index: number, arg: NativePointer): ValueResolve {
        this.args[index] = arg
        return this
    }

    public setRetval(retval: NativePointer): ValueResolve {
        this.retval = retval
        return this
    }

    public getArg(index: number): NativePointer {
        return this.args[index]
    }

    public getRetval(): NativePointer {
        return this.retval
    }

    public getArgs(): Array<NativePointer> {
        return this.args
    }

    public getArgsCount(): number {
        return this.method.parameterCount
    }

    // `value` looks like a `NativePointer[]` type, but it may actually be a `never` type
    public setArgs(value: InvocationArguments): ValueResolve {
        if (value == undefined) return this
        if (value instanceof Array && (value.length === 0 || value.length < this.method.parameterCount)) return this
        this.args = value
        return this
    }

    static MapCacheStringWithOutValue: Map<string, string> = new Map<string, string>()
    public toString(): string {
        let cache = ValueResolve.MapCacheStringWithOutValue.get(this.cacheId)
        if (cache) return cache
        let addressInfo = ` ${this.method.handle} -> ${this.method.relativeVirtualAddress} `
        let append = ""
        let length = String(this.method.class.handle).length + 1
        try {
            append += ","
            append += FM.alignStr(String(this.args[0]), length, " ")
        } catch {
            append += "  "
            append += FM.getLine(length, " ")
        }
        let classInfo = `${FM.alignStr(this.method.class.name, 18)}(${this.method.class.handle}${append.trim()})`
        let infoContent = `===>  ${methodToString(this.method, true)}\t `
        let retStr = `${this.cacheId}\t${addressInfo}\t|  ${classInfo}  ${infoContent}`
        ValueResolve.MapCacheStringWithOutValue.set(this.cacheId, retStr)
        return retStr
    }

    public resolve(index: number): string {
        if (index > this.method.parameterCount) throw new Error("index out of parameterCount range")
        let args = index == -1 ? this.retval : this.args[index]
        let type = index == -1 ? this.method.returnType : this.method.parameters[index].type
        return ValueResolve.fakeValue(args, type, this.method)
    }

    public static fakeValue = (insPtr: NativePointer, type: Il2Cpp.Type, method: Il2Cpp.Method): string => {
        if (typeof insPtr == "number") insPtr = ptr(insPtr)
        if (typeof method == "number") method = new Il2Cpp.Method(ptr(method))
        if (type.handle.equals(1)) return new Il2Cpp.Object(insPtr).toString()
        if (type.isNull() || method.isNull()) return ""
        if (insPtr.isNull() && type.name != "System.Boolean" && !method.class.isEnum && !type.name.includes("Void")) return "NULL"
        if (!method.class.isNull() && type.name.endsWith("[]")) return arrayType()
        if (!method.class.isNull() && type.name.includes("Dictionary")) return dictionaryType()
        if (!method.class.isNull() && method.class.isEnum) return enumType()

        return CommonType(type)

        function arrayType(): string {
            return ""
        }

        function dictionaryType(): string {
            return ""
        }

        function enumType(): string {
            return ""
        }

        function CommonType(type: Il2Cpp.Type): string {
            switch (type.name) {
                case "System.Void":
                    return ""
                case "System.Boolean":
                    return !insPtr.isNull() ? "True" : "False"
                case "System.Int32":
                    return readInt(insPtr).toString()
                case "System.UInt32":
                    return readUInt(insPtr).toString()
                case "System.Int64":
                    return readInt64(insPtr).toString()
                case "System.Single":
                    return readSingle(insPtr).toString()
                case "System.String":
                    return readU16(insPtr)
                case "System.Object":
                    return getObjName(insPtr)
                case "System.UnityEngine":
                    return new UnityEngine_Object(insPtr).get_name()
                case "UnityEngine.Color":
                    return new UnityEngine_Color_Impl(insPtr).toString()
                case "Vector2":
                    return `${insPtr.readFloat()} ${insPtr.add(4).readFloat()}`
                case "System.Action":
                case "System.Action`1":
                case "System.Action`2":
                    return insPtr.add(Process.pageSize === 4 ? 0x14 : 0x10).readPointer().readPointer().sub(soAddr).toString()
                default:
                    try {
                        return new Il2Cpp.Object(insPtr).toString()
                    } catch (error) {
                        return ""
                    }
            }
        }

        function getParentsStr(clsPtr: Il2Cpp.Class): string {
            let ret = ""
            while (true) {
                let parent = clsPtr.parent
                if (parent != null) {
                    clsPtr = parent
                    ret += clsPtr.name + "<---"
                } else {
                    // LOGD(ret)
                    return ret
                }
            }
        }
    }
}

export default ValueResolve