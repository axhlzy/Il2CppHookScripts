import { getMethodDesFromMethodInfo } from "../../../bridge/fix/il2cppM"

const generateClass = (className: string, classPtr: NativePointer = ptr(0)) => {
    if (className == undefined) return
    LOGW(getLine(80))

    let clsInstance: Il2Cpp.Class

    // gen class title
    if (classPtr.isNull()) {
        clsInstance = new Il2Cpp.Class(findClass(className))
    } else {
        clsInstance = new Il2Cpp.Class(classPtr)
    }
    let clsName = clsInstance.namespace.replace('.', '_') + "_" + clsInstance.name + "_Impl"
    let clsExtend = clsInstance.parent?.namespace.replace('.', '_') + "_" + clsInstance.parent?.name + "_Impl"
    LOGD(`\nclass ${clsName} extends ${clsExtend} {\n`)
    // gen fields
    let fields = clsInstance.fields
    fields.forEach((field: Il2Cpp.Field) => {
        //     m_Transition: Transition = lfv(this.handle, "m_Transition")
        let type = repStr(field.type.name.replace('.', '_'))
        LOGD(`\t${field.name}: ${type} = lfv(this.handle, "${field.name}") as unknown as ${type}`)
    })

    // constructor(handleOrWrapper: NativePointer) {
    //     super(handleOrWrapper)
    // }
    LOGD('\n\tconstructor(handleOrWrapper: NativePointer) {')
    LOGD('\t\t super(handleOrWrapper)')
    LOGD('\t}\n')

    // gen methods
    let methods = clsInstance.methods
    let names = new Array<string>()
    let usingTypes = new Set<string>()
    methods.forEach((method: Il2Cpp.Method) => {
        // CancelInvoke_methodName(methodName: string): void {
        //     return Il2Cpp.Api.MonoBehaviour._CancelInvoke_String(this.handle, allocCStr(methodName));
        // }
        let params = method.parameters.map((param: Il2Cpp.Parameter) => {
            return param.name + ':' + param.type.name.replace('.', '_').replace("&", "").replace("[]", "_Array")
        }).join(', ')
        let paramNames = method.parameters.map((param: Il2Cpp.Parameter) => {
            return param.name
        }).join(', ')

        let staticStr = method.isStatic ? "static " : ""
        let sameNameFix = names.includes(method.name) ? `_${method.parameterCount}` : ""
        let firstName = method.name.includes('ctor') ? method.name.concat(`_${method.class.name}`) : method.name
        let localTypeStr = method.returnType.name.replace('.', '_')
        let line1 = `\t${staticStr}${firstName.replace('.', '_')}${sameNameFix}(${params}): ${repStr(localTypeStr)} {`

        usingTypes.add(localTypeStr)
        line1 = repStr(line1)

        let firstParam = method.isStatic ? '' : (method.parameters.length == 0 ? 'this.handle' : 'this.handle , ')

        let methodName = '_' + method.name.replace('.', '_')
        let retValue = `${incorLib(className) ? "mscorlib" : "Il2Cpp"}.Api.${clsInstance.name}.${methodName}(${firstParam}${paramNames})`
        if (method.returnType.name == "System.String") retValue = 'readU16(' + retValue + ')'
        // else if (method.returnType.name != "System.Void" && method.returnType.name != "System.Boolean" && method.returnType.name != "System.Int32") {
        //     retValue = `new ${method.returnType.name.replace('.', '_')}(${retValue})`
        // }
        let line2 = `\t\treturn ${retValue}`
        let line3 = '\t}'
        LOGD(`${line1} \n ${line2} \n ${line3} \n`)
        usingTypes.add(method.returnType.name.replace('.', '_'))
        names.push(method.name)
    })
    LOGD('}\n')

    usingTypes.forEach((type: string) => {
        LOGD(`type ${type} = NativePointer`)
    })

    newLine()

    // declare global {
    //     namespace Il2Cpp {
    //         class MonoBehaviour extends UnityEngine_MonoBehaviour_Impl { }
    //     }
    // }

    // export { UnityEngine_MonoBehaviour_Impl }

    LOGD(`${incorLib(className) ? "mscorlib" : "Il2Cpp"}.${className} = ${clsName}\n`)

    LOGD('declare global {')
    LOGD(`\tnamespace ${incorLib(className) ? "mscorlib" : "Il2Cpp"}{`)
    LOGD(`\t\tclass ${className} extends ${clsName} { }`)
    LOGD('\t}')
    LOGD('}\n')
    LOGD(`export { ${clsName} } `)
    // LOGD(`export { ${clsName} as ${className}} `)

    newLine()

    LOGW(getLine(80))
}

const repStr = (str: string): string => {
    return str
    // .replace('System_Void', 'void')
    // .replace('System_String', 'string')
    // .replace('System_Int32', 'number')
    // .replace('System_Int64', 'number')
    // .replace('System_Single', 'number')
    // .replace('System_Double', 'number')
    // .replace('System_Boolean', 'boolean')
}

const incorLib = (name: string) => {
    let corLib: boolean = false
    Il2Cpp.Domain.assembly('mscorlib').image.classes.forEach((cls: Il2Cpp.Class) => {
        if (cls.name == name) corLib = true
    })
    return corLib
}

const generateApi = (className: string, classPtr: NativePointer = ptr(0)) => {
    if (className == undefined) return
    LOGW(getLine(80))

    let clsInstance: Il2Cpp.Class

    // gen class title
    if (classPtr.isNull()) {
        clsInstance = new Il2Cpp.Class(findClass(className))
    } else {
        clsInstance = new Il2Cpp.Class(classPtr)
    }

    // gen class title
    let clsName = clsInstance.namespace.replace('.', '_') + "_" + clsInstance.name + "_API"

    // import { cache } from "decorator-cache-getter"
    LOGD(`import { cache } from "decorator-cache-getter"\n`)
    // class ApplicationApi {
    LOGD(`class ${clsName} {`)

    // @cache
    // static get _CancelInvoke() {
    //     // CancelInvoke() : Void
    //     return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "CancelInvoke", 0, "void", ["pointer"]);
    // }

    // gen methods
    let methods = clsInstance.methods
    let names = new Array<string>()
    methods.forEach((method: Il2Cpp.Method) => {
        LOGZ(`\t// ${getMethodDesFromMethodInfo(method)}`)
        // 静态函数没有第一个pointer
        let param = ''
        if (!method.isStatic) param += `"pointer"`

        for (let i = 0; i < method.parameters.length; i++) {
            param += `,"pointer"`
        }
        if (param.startsWith(',')) param = param.substring(1)
        param = `[${param}]`
        LOGD(`\t@cache`)

        let disPName = method.name.replace('.', '_')
        if (names.includes(method.name)) {
            let addName = method.parameters.map((param: Il2Cpp.Parameter) => param.name).join('_')
            disPName += '_' + addName
        }

        LOGD(`\tstatic get _${disPName}() {`)
        let retName = method.returnType.name
        if (retName == "System.Void") retName = 'void'
        else retName = 'pointer'
        let classNameSpace = method.class.namespace.length == 0 ? "" : `${method.class.namespace}.`
        if (false && !names.includes(method.name)) {
            LOGD(`\t\treturn Il2Cpp.Api.t("${method.class.image.assembly.name}", "${classNameSpace}${className}", "${method.name}", ${method.parameters.length}, "${retName}", ${param})`)
        } else {
            // 重名函数
            // return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "StartCoroutine", 1, ["System.Collections.IEnumerator"], "pointer", ["pointer", "pointer"]);
            let paramTypes = `[${method.parameters.map((param: Il2Cpp.Parameter) => `"${param.type.name}"`).join(',')}]`
            LOGD(`\t\treturn Il2Cpp.Api.o("${method.class.image.assembly.name}", "${classNameSpace}${className}", "${method.name}", ${method.parameters.length}, ${paramTypes}, "${retName}", ${param})`)
        }
        LOGD('\t}\n')

        names.push(method.name)
    })
    LOGD('}\n')

    // declare global {
    //     namespace Il2Cpp.Api {
    //         class MonoBehaviour extends MonoBehaviourAPI { }
    //     }
    // }

    // Il2Cpp.Api.MonoBehaviour = MonoBehaviourAPI;

    // export { }


    LOGE(`Il2Cpp.Api.${className} = ${clsName}\n`)

    LOGD('declare global {')
    LOGD(`\tnamespace ${incorLib(className) ? "mscorlib" : "Il2Cpp"}.Api{`)
    LOGD(`\t\tclass ${className} extends ${clsName} { }`)
    LOGD('\t}')
    LOGD('}\n')
    LOGD(`export { }\n`)

    LOGW(getLine(80))
}

const generateFieldEnum = (className: string, classPtr: NativePointer = ptr(0)) => {
    LOGW(getLine(80))

    let clsInstance: Il2Cpp.Class

    // gen class title
    if (classPtr.isNull()) {
        clsInstance = new Il2Cpp.Class(findClass(className))
    } else {
        clsInstance = new Il2Cpp.Class(classPtr)
    }

    // export enum UnityEngine_ColorSpace {
    //     Gamma = 0,
    //     Linear = 1,
    //     Uninitialized = -1
    // }

    LOGE(`export enum ${clsInstance.namespace.replace('.', '_')}_${clsInstance.name} {`)
    clsInstance.fields.forEach((field: Il2Cpp.Field) => {
        Il2Cpp.Api._typeGetTypeEnum
        LOGD(`\t${field.name} = ${field}`)
    })
    LOGO(`}\n`)
}

/**
    interface System_Collections_ICollection {
        CopyTo: (instance: NativePointer, array: System_Array, index: System_Int32) => System_Void
        get_Count: (instance: NativePointer) => System_Int32
        get_SyncRoot: (instance: NativePointer) => System_Object
    }
 */
const generateInterface = (className: string, classPtr: NativePointer = ptr(0)) => {
    if (className == undefined) return
    LOGW(getLine(80))

    let clsInstance: Il2Cpp.Class

    // gen class title
    if (classPtr.isNull()) {
        clsInstance = new Il2Cpp.Class(findClass(className))
    } else {
        clsInstance = new Il2Cpp.Class(classPtr)
    }
    let clsName = clsInstance.namespace.replace('.', '_') + "_" + clsInstance.name
    LOGD(`interface ${clsName} {`)
    clsInstance.methods.forEach((method: Il2Cpp.Method) => {
        let param = ''
        for (let i = 0; i < method.parameters.length; i++) {
            param += `,${method.parameters[i].name}: ${method.parameters[i].type.name.replace('.', '_')}`
        }
        if (param.startsWith(',')) param = param.substring(1)
        LOGD(`\t${method.name}: (instance: NativePointer, ${param}) => ${method.returnType.name.replace('.', '_')}`)
    })
    LOGD('}\n')
}

function generateClassCxxH(className: string): void {
    let klass = new Il2Cpp.Class(findClass(className))
    if (klass.methods.length == 0) return
    newLine()

    let localMethods = klass.methods.filter((method: Il2Cpp.Method) => !method.name.includes("ctor"))

    var Group_Public = `public:`
    var Group_Private = `private:`
    var Group_Protected = `protected:`

    localMethods.filter((method: Il2Cpp.Method) => !method.virtualAddress.isNull()).forEach((method: Il2Cpp.Method) => {
        let mdes: string = getMethodDesFromMethodInfo(method)
        let line_0 = `// ${mdes}`
        let line_1 = ``

        line_1 += method.isStatic ? "static " : ""
        line_1 += mdes.includes("virtual") ? "virtual " : ""
        line_1 += `${method.returnType.name.includes(">") ? `${TransformType(method.returnType.name)}` : `${TransformType(method.returnType.name.split(".").pop() as string)}`} `
        line_1 += method.name
        line_1 += "("
        if (method.parameterCount != 0) {
            for (let i = 0; i < method.parameterCount; i++) {
                let param = method.parameters[i].type
                let paramType = param.name.includes(">") ? `${TransformType(param.name)}` : `${TransformType(param.name.split(".").pop() as string)}`;
                line_1 += `${paramType == 'std::string' ? 'const std::string&' : paramType}`
                line_1 += ` ${method.parameters[i].name}`
                if (i != method.parameterCount - 1) line_1 += ", "
                if (i == method.parameterCount - 1) line_1 += ")"
            }
        } else {
            line_1 += ")"
        }

        if (mdes.indexOf("public") != -1) {
            Group_Public += `\n\t`
            Group_Public += `\n\t${line_0}`
            Group_Public += `\n\t${line_1};`
        }

        if (mdes.indexOf("private") != -1) {
            Group_Private += `\n\t`
            Group_Private += `\n\t${line_0}`
            Group_Private += `\n\t${line_1};`
        }

        if (mdes.indexOf("protected") != -1 || mdes.indexOf("internal") != -1) {
            Group_Protected += `\n\t`
            Group_Protected += `\n\t${line_0}`
            Group_Protected += `\n\t${line_1};`
        }
    })

    LOGD(`${Group_Public}\n\n${Group_Private}\n\n${Group_Protected}`)

    newLine()
}


function generateClassCxxCPP(className: string): void {
    let klass = new Il2Cpp.Class(findClass(className))
    if (klass.methods.length == 0) return
    newLine()

    let localMethods = klass.methods.filter((method: Il2Cpp.Method) => !method.name.includes("ctor"))

    let assemblyName = klass.image.assembly.name
    let declarationType = klass.namespace == "" ? klass.name : klass.namespace + "." + klass.name

    let line_result: string = ``

    localMethods.filter((method: Il2Cpp.Method) => !method.virtualAddress.isNull()).forEach((method: Il2Cpp.Method) => {
        let mdes: string = getMethodDesFromMethodInfo(method)
        let line_0 = `// ${mdes}`
        let line_1 = ``

        line_1 += `${method.returnType.name.includes(">") ? `${TransformType(method.returnType.name)}` : `${TransformType(method.returnType.name.split(".").pop() as string)}`} `
        line_1 += className + '::'
        line_1 += method.name
        line_1 += "("

        if (method.parameterCount != 0) {
            for (let i = 0; i < method.parameterCount; i++) {
                let param = method.parameters[i].type
                let paramType = param.name.includes(">") ? `${TransformType(param.name)}` : `${TransformType(param.name.split(".").pop() as string)}`;
                line_1 += `${paramType == 'std::string' ? 'const std::string&' : paramType}`
                line_1 += ` ${method.parameters[i].name}`
                if (i != method.parameterCount - 1) line_1 += ", "
            }
        }

        line_1 += ")"
        line_1 += `{`
        line_1 += `\n\t`

        let returnType = method.returnType.name.includes(">") ? `${TransformType(method.returnType.name)}` : `${TransformType(method.returnType.name.split(".").pop() as string)}`;

        if (returnType == 'std::string') returnType = 'MonoString*';

        line_1 += `return execute_il2cpp_method<${returnType} `;

        if (!method.isStatic) {
            line_1 += `(*)(${className}*`
            if (method.parameterCount != 0) line_1 += ", ";
        } else {
            line_1 += `(*)(`;
        }

        if (method.parameterCount != 0) {
            for (let i = 0; i < method.parameterCount; i++) {
                let param = method.parameters[i].type
                let paramType = param.name.includes(">") ? `${TransformType(param.name)}` : `${TransformType(param.name.split(".").pop() as string)}`;
                if (paramType == 'std::string') paramType = 'MonoString*';
                line_1 += paramType
                if (i != method.parameterCount - 1) line_1 += ", "
            }
        }

        line_1 += `)>`
        line_1 += `("${assemblyName}", "${declarationType}", "${method.name}", ${method.parameterCount}, `

        if (!method.isStatic) {
            line_1 += "this"
            if (method.parameterCount != 0) line_1 += ", ";
        }

        if (method.parameterCount != 0) {
            for (let i = 0; i < method.parameterCount; i++) {
                let param = method.parameters[i].type
                let paramType = param.name.includes(">") ? `${TransformType(param.name)}` : `${TransformType(param.name.split(".").pop() as string)}`;
                line_1 += paramType == 'std::string' ? `IL2CPP::new_string(${method.parameters[i].name})` : `${method.parameters[i].name}`
                if (i != method.parameterCount - 1) line_1 += ", "
            }
        }

        line_1 += ")"

        if (returnType == 'MonoString*') {
            line_1 += `->toString();`
        } else {
            line_1 += `;`
        }

        line_1 += `\n}`

        line_result += line_0
        line_result += "\n"
        line_result += line_1
        line_result += "\n\n"
    })

    LOGD(`${line_result}`)

    newLine()
}

function TransformType(inputType: string) {
    if (inputType == "Void") return "void"
    if (inputType.includes("&")) inputType = inputType.replace("&", "*")
    if (inputType.includes("[]")) return inputType.replace("[]", "*")
    if (inputType == "Boolean") return "bool"
    if (inputType == "Int32") return "int"
    if (inputType == "UInt32") return "int"
    if (inputType == "Int64") return "long"
    if (inputType == "UInt64") return "long"
    if (inputType == "Single") return "float"
    if (inputType == "Double") return "double"
    if (inputType == "String") return "std::string"
    return `${inputType}*`
}

declare global {
    var generateClass: (className: string, classPtr?: NativePointer) => void
    var generateApi: (className: string, classPtr?: NativePointer) => void
    var generateFieldEnum: (className: string, classPtr?: NativePointer) => void
    var generateInterface: (className: string, classPtr?: NativePointer) => void
    var generateClassCxxH: (mPtr: string) => void
    var generateClassCxxCPP: (mPtr: string) => void
}

globalThis.generateClass = generateClass
globalThis.generateApi = generateApi
globalThis.generateFieldEnum = generateFieldEnum
globalThis.generateInterface = generateInterface
globalThis.generateClassCxxH = generateClassCxxH
globalThis.generateClassCxxCPP = generateClassCxxCPP

export { }