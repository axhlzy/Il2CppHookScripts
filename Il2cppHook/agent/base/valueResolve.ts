import { UnityEngine_Color_Impl } from "../expand/TypeExtends/mscorlibObj/ValueType/Color/class"
import { UnityEngine_Object } from "../expand/TypeExtends/mscorlibObj/Object/class"
import { readInt, readInt64, readSingle, readU16, readUInt } from "../utils/reader"
import { getObjName } from "../expand/TypeExtends/mscorlibObj/Object/export"
import { getMethodDesFromMethodInfo, methodToString } from "../bridge/fix/il2cppM"
import { formartClass as FM } from "../utils/formart"
import { enumNumToName } from "../bridge/fix/enum"

export class ValueResolve {

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
    // NativePointer[] === InvocationArguments
    public setArgs(value: InvocationArguments | NativePointer[]): ValueResolve {
        if (value == undefined || value.length == 0) return this
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
            this.method.isStatic ? "" : append += "," + FM.alignStr(String(this.args[0]), length, " ")
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

    public argsToArray(): Array<string> {
        let argsArray: Array<string> = []
        // LOGJSON(this.args)
        if (!this.method.isStatic) {
            // not static method
            try {
                argsArray[0] = `instance = ${new Il2Cpp.Object(ptr(String(this.args[0]))).toString()} @ ${this.args[0]}`
            } catch {
                argsArray[0] = `instance = ${String(this.args[0])}`
            }
            for (let i = 1; i <= this.method.parameterCount; i++) {
                let argName = this.method.parameters[i - 1].name
                try {
                    argsArray[i] = `${argName} = '${this.resolve(i - 1)}'`
                } catch (error) {
                    argsArray[i] = `${argName} = 'NULL'`
                }
            }
        } else {
            // static method
            for (let i = 0; i < this.method.parameterCount; i++) {
                let argName = this.method.parameters[i].name
                try {
                    argsArray[i] = `${argName} = '${this.resolve(i)}'`
                } catch (error) {
                    argsArray[i] = `${argName} = 'NULL'`
                }
            }
        }
        return argsArray
    }

    public argsToString(): string {
        return this.argsToArray().join(', ')
    }

    public static fakeValue = (insPtr: NativePointer, type: Il2Cpp.Type, method: Il2Cpp.Method): string => {
        if (typeof insPtr == "number") insPtr = ptr(insPtr)
        if (typeof method == "number") method = new Il2Cpp.Method(ptr(method))
        if (type.handle.equals(1)) return new Il2Cpp.Object(insPtr).toString()
        if (type.isNull() || method.isNull()) return ""

        // 这里不可以使用 insPtr 来获取class，因为有可能是一个空指针（enum，或者其他值的情况，不一定是指针）
        // let obj : Il2Cpp.Object = new Il2Cpp.Object(insPtr)
        // 只能通过type来获取，如下 `type.class`

        if (!type.class.handle.isNull() && type.class.isEnum) return enumType()
        if (insPtr.isNull() && type.name != "System.Boolean" && !method.class.isEnum && !type.name.includes("Void")) return "NULL"
        if (!method.class.isNull() && type.name.endsWith("[]")) return arrayType()
        if (!method.class.isNull() && type.name.includes("Dictionary")) return dictionaryType()

        return FakeCommonType(type, insPtr)

        function arrayType(): string {
            return ""
        }

        function dictionaryType(): string {
            return ""
        }

        function enumType(): string {
            return `Enum : ${enumNumToName(insPtr.toInt32(), type.class.name)}`
        }
    }
}

// 类型解析
export function FakeCommonType(type: Il2Cpp.Type, mPtr: NativePointer): string {
    // LOGW(`FakeCommonType ${type.name} ${mPtr}`)
    switch (type.name) {
        case "System.Void":
            return ""
        case "System.Boolean":
            return !mPtr.isNull() ? "True" : "False"
        case "System.Int32":
            return readInt(mPtr).toString()
        case "System.IntPtr":
            if (mPtr.isNull()) return "null"
            let disp: string = ''
            try {
                disp = `${new Il2Cpp.Method(mPtr).virtualAddress} -> ${getMethodDesFromMethodInfo(mPtr)}`
            } catch (error) {
                disp = DebugSymbol.fromAddress(mPtr).toString()
            }
            return disp
        case "System.UInt32":
            return readUInt(mPtr).toString()
        case "System.Int64":
            return readInt64(mPtr).toString()
        case "System.Single":
            return readSingle(mPtr).toString()
        case "System.Double":
            try {
                return mPtr.add(Process.pointerSize * 2).readDouble().toString()
            } catch (error) {
                return `Parse Error ${error}`
            }
        case "System.String":
            return readU16(mPtr)
        case "System.Object":
            if (mPtr.isNull()) return "null"
            return new Il2Cpp.Object(mPtr).toString()
        case "System.UnityEngine":
            return new UnityEngine_Object(mPtr).get_name()
        case "UnityEngine.Color":
            return new UnityEngine_Color_Impl(mPtr).toString()
        case "UnityEngine.SceneManagement.Scene":
            return getSceneName(mPtr)
        case "Vector2":
            return `${mPtr.readFloat()} ${mPtr.add(4).readFloat()}`
        default:
            let obj: Il2Cpp.Object = new Il2Cpp.Object(mPtr)
            try {
                if (type.name.includes("System.Collections.Generic.List")) {
                    const items = obj.tryField('_items')!
                    let disp: string = `${items.value} | `
                    disp += ` | size -> ${obj.tryField('_size')?.value}`
                    disp += ` | items -> ${items.handle}`
                    return disp
                }
            } catch (error) {
                return obj.toString()
            }
            try {
                if (type.name.includes("System.Collections.Generic.Dictionary")) {
                    const entries = obj.tryField('_entries')!
                    const count: number = obj.tryField<number>('_count')!.value
                    let disp: string = `${entries.handle} | `
                    disp += ` | count -> ${obj.tryField('_count')?.value}`
                    for (let i = 0; i < count; i++) {
                        let key = entries.handle.add(Process.pointerSize * 2).readPointer()
                        let value = entries.handle.add(Process.pointerSize * 3).readPointer()
                        disp += ` | ${new Il2Cpp.Object(key).toString()} -> ${new Il2Cpp.Object(value).toString()}`
                    }
                    return disp
                }
            } catch (error) {
                return obj.toString()
            }
            try {
                if (type.name.includes("System.Action")) return new mscorlib.Delegate(mPtr).toString(true)
            } catch (error) {
                return obj.toString()
            }
            try {
                return obj.toString()
            } catch {
                return mPtr.toString()
            }
    }
}