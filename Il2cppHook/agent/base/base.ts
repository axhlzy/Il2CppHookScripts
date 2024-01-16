import { getMethodDesFromMethodInfo as GMD, getMethodModifier as GMM } from "../bridge/fix/il2cppM"
import { formartClass as FM } from "../utils/formart"
import { FieldAccess, LogColor, MethodSortType } from "./enum"
import { cache } from "decorator-cache-getter"
import { allocCStr } from "../utils/alloc"
import { FakeCommonType } from "./valueResolve"

export class HookerBase {
    constructor() { }

    @cache
    static get _list_assemblies(): Il2Cpp.Assembly[] {
        return Il2Cpp.domain.assemblies
    }

    @cache
    static get _list_assemblies_names(): string[] {
        return HookerBase._list_assemblies.map(item => item.name)
    }

    @cache
    static get _list_images(): Il2Cpp.Image[] {
        return HookerBase._list_assemblies.map((assembly: Il2Cpp.Assembly) => assembly.image)
    }

    @cache
    static get _list_images_pointers(): NativePointer[] {
        return HookerBase._list_images.map(item => item.handle)
    }

    @cache
    static get _list_images_names(): string[] {
        return HookerBase._list_assemblies.map((assembly: Il2Cpp.Assembly) => assembly.image.name.split(".dll")[0])
    }

    private static getMapImagesCacheMap = new Map()
    static getMapImages(): Map<string, NativePointer> {
        if (HookerBase.getMapImagesCacheMap.size != 0) return HookerBase.getMapImagesCacheMap
        HookerBase._list_images_names.forEach((item, index) => HookerBase.getMapImagesCacheMap.set(item, HookerBase._list_images_pointers[index]))
        return HookerBase.getMapImagesCacheMap
    }

    @cache
    static get _list_classes(): Il2Cpp.Class[] {
        return Il2Cpp.domain.assemblies.map((assembly: Il2Cpp.Assembly) => assembly.image).flatMap((image: Il2Cpp.Image) => image.classes)
    }

    static showImages(filter: string = "", sort: boolean = true): void {
        FM.printTitile("List Images { assembly -> image -> classCount -> imageName }")
        HookerBase._list_images.filter((image: Il2Cpp.Image) => {
            return filter != "" ? image.name.indexOf(filter) != -1 : true
        }).sort((first, secend) => {
            return sort ? (first.name.toLowerCase().charAt(0) > secend.name.toLowerCase().charAt(0) ? 1 : -1) : 0
        }).forEach((image: Il2Cpp.Image) => {
            LOGD(`[*] ${image.assembly.handle} -> ${image.handle}\t${image.classCount}\t${image.assembly.name}`)
        })
        if (filter == "") {
            LOGO(getLine(28))
            LOGE(`  List ${HookerBase._list_images.length} Images`)
        }
        LOGO(getLine(85))
    }

    static showClasses(imageOrName: string | NativePointer | number, filterNameSpace: string = "", filterClassName: string = ""): void {
        // todo 这里想添加一个 c(methodinfo)
        let image: Il2Cpp.Image
        try {
            if (typeof imageOrName == "string") {
                // 处理arm64以参数形式传递会出bug的问题,长十六进制参数用引号包裹起来当String传递
                // 一般情况是在0x后面大于13个十六进制数就不能把他当成参数传递，否则入参都是错的 emmmm ...
                if (imageOrName.startsWith("0x")) {
                    image = new Il2Cpp.Image(ptr(imageOrName.trim()))
                } else {
                    //传递ImageName的情况
                    image = Il2Cpp.domain.assembly(imageOrName).image
                }
            } else if (typeof imageOrName == "number") {
                if (Process.arch == "arm64" && (imageOrName.toString().length > 15))
                    throw new Error("\nNot support parameter typed number at arm64\n\n\tUse b('0x...') instead\n")
                image = new Il2Cpp.Image(ptr(imageOrName))
            } else if (arguments[0] == undefined) {
                throw new Error("imageOrName can not be null")
            } else {
                throw new Error("imageOrName must be string or number")
            }
            if (image.handle.equals(1)) throw new Error("image handle can not be null")
        } catch (error) {
            LOGE(error)
            // throw new Error("Il2Cpp.Image can not be found")
            return
        }

        // namespace as key:string ， classes as value:Array<class>
        let tMap = new Map<string, Array<Il2Cpp.Class>>()
        let countNameSpace: number = 0
        let countFilterCls: number = 0
        for (let i = 0; i < image.classes.length; i++) {
            let key = "[*] " + image.classes[i].namespace
            if (tMap.get(key) == undefined) tMap.set(key, new Array<Il2Cpp.Class>())
            tMap.get(key)?.push(image.classes[i])
        }

        LOG(`\n Current -> ${image.name} @ ${image.handle}\n`, LogColor.C104)
        let titleLen = FM.printTitileA("List Classes { namespace {classPtr->filedsCount->methodsCount->enumClass->className} }", LogColor.C90)
        for (let key of tMap.keys()) {
            let nameSpace: string = key
            if (nameSpace != undefined) {
                let nameSpaces: Array<Il2Cpp.Class> = tMap.get(nameSpace)!
                // filterNameSpace 不区分大小写
                if (nameSpace.toLowerCase().indexOf(filterNameSpace.toLowerCase()) == -1) continue
                ++countNameSpace
                LOGD(`\n${nameSpace}`)
                nameSpaces?.forEach((klass: Il2Cpp.Class) => {
                    // filterClassName 不区分大小写
                    if (klass.name.toLowerCase().indexOf(filterClassName.toLowerCase()) != -1) {
                        ++countFilterCls
                        LOGD(`\t[-] ${klass.handle} (F:${klass.fields.length}/M:${klass.methods.length}/E:${Number(klass.isEnum)})\t${klass.name}`)
                    }
                })
            }
        }

        LOGO("\n" + getLine(28))
        if (filterNameSpace == "" && filterClassName == "") {
            LOGE(`List ${image.classCount} Classes | Group by ${countNameSpace} NameSpaces`)
        } else {
            LOGE(`ALl ${image.classCount} Classes | List ${countFilterCls} Classes | Group by ${countNameSpace} NameSpaces`)
        }
        LOGO(getLine(titleLen))
    }

    static checkType(mPtr: NativePointer | string | number): Il2Cpp.Class {
        let klass: Il2Cpp.Class
        if (mPtr instanceof NativePointer) {
            klass = new Il2Cpp.Class(mPtr)
        } else if (typeof mPtr == "string") {
            if (mPtr.startsWith("0x")) klass = new Il2Cpp.Class(ptr(mPtr.trim()))
            else klass = new Il2Cpp.Class(findClass(mPtr))
        } else if (typeof mPtr == "number") {
            klass = new Il2Cpp.Class(ptr(mPtr))
        } else {
            throw ("mPtr must be string or number or NativePointer")
        }
        if (klass.handle.equals(ptr(0))) throw ("klass handle can not be null")
        return klass
    }

    /**
     * showMethods
     * @param {NativePointer | String | number} mPtr class ptr | class name | methodinfo ptr
     * @param {boolean} detailed show detail info (default false)
     * @returns 
     * @example
     * 
     * m("GameObject") 这种写法少数重名类可能会出问题
     * 你应该先使用findClasses找到指定的类以后再使用m(classPtr)的形式进行调用查看
     * 
     * example1 ↓
     * 
     * [Pixel 4::XXX ]->  m(findClass("GameObject"),1) === m("GameObject")

            -----------------------------------------------------
            | Found 46 Methods  in class: GameObject @ 0xe9792c10 |
            -----------------------------------------------------

            [*] 0xa386d198 ---> 0x0 ---> 0x5a1ff000
                    public T GetComponent()
                            ---> retval     0x97f4f350  <-  T

            [*] 0xa386d1c4 ---> 0xa6d24494 ---> 0xf23494
                    public Component GetComponent(Type type)
                            ---> args[0]    0xa7b7d734  <-  System.Type
                            ---> retval     0xe9785470  <-  Component

            [*] 0xa386d1f0 ---> 0xa6d290d4 ---> 0xf280d4
                    internal Void GetComponentFastPath(Type type,IntPtr oneFurtherThanResultValue)
                            ---> args[0]    0xa7b7d734  <-  System.Type
                            ---> args[1]    0xa7b7c9a4  <-  System.IntPtr
                            ---> retval     0xe9781f00  <-  Void

            [*] 0xa386d21c ---> 0xa6d29134 ---> 0xf28134
                    internal Component GetComponentByName(String type)
                            ---> args[0]    0xa7b7d414  <-  System.String
                            ---> retval     0xe9785470  <-  Component
            ......

            example2 ↓

            [Pixel 4::XXX ]->  m(findClass("GameObject")) === m("GameObject")

            -----------------------------------------------------
            | Found 46 Methods  in class: GameObject @ 0xe9792c10 |
            -----------------------------------------------------
            [*] 0xa386d198 ---> 0x0 ---> 0x0        |  public T GetComponent()
            [*] 0xa386d1c4 ---> 0xa6d24494 ---> 0xf23494    |  public Component GetComponent(Type type)
            [*] 0xa386d1f0 ---> 0xa6d290d4 ---> 0xf280d4    |  internal Void GetComponentFastPath(Type type,IntPtr oneFurtherThanResultValue)
            [*] 0xa386d21c ---> 0xa6d29134 ---> 0xf28134    |  internal Component GetComponentByName(String type)
            [*] 0xa386d248 ---> 0xa6d2918c ---> 0xf2818c    |  public Component GetComponent(String type)
            [*] 0xa386d274 ---> 0xa6d245fc ---> 0xf235fc    |  public Component GetComponentInChildren(Type type,Boolean includeInactive)
            ......
     */
    static showMethods(input: NativePointer | String | number, sort: MethodSortType = MethodSortType.ADDRESS, detailed: boolean = false): void {
        if (input instanceof NativePointer && input.isNull()) throw new Error("input can not be null")
        if (typeof input == "string" && input.trim().length == 0) throw new Error("input can not be null")
        let klass: Il2Cpp.Class = HookerBase.inputCheck(input)
        if (klass.methods.length == 0) return
        newLine()
        FM.printTitile(`Found ${klass.methods.length} Methods ${klass.isEnum ? "(enum) " : ""} in class: ${klass.name} @ ${klass.handle}`)
        if (detailed) {
            // 带详细参数解析 => example 1
            let maxStrLen: number = 0
            klass.methods.forEach((method: Il2Cpp.Method) => {
                LOGD(`\n[*] ${method.handle} ---> ${method.virtualAddress} ---> ${method.relativeVirtualAddress}`)
                let methodInfoDes = `\t${GMD(method)}`
                LOGD(methodInfoDes)
                maxStrLen = Math.max(maxStrLen, methodInfoDes.length)
                let countArgs: number = -1
                method.parameters
                    .map((param: Il2Cpp.Parameter) => `\t\t---> args[${++countArgs}]\t${param.type.handle}  <-  ${param.type.name}`)
                    .forEach(LOGZ)
                LOGZ(`\t\t---> retval\t${method.returnType.class.handle}  <-  ${method.returnType.class.name}`)
            })
            newLine()
            LOGO(getLine(maxStrLen))
        } else {
            // 不带参数解析的  => example 2
            // 分开展示泛型方法和非泛型方法 避免看起来混乱

            let localMethods: Il2Cpp.Method[] = klass.methods
            switch (sort) {
                case MethodSortType.ADDRESS:
                    localMethods = localMethods.sort((first, secend) => first.relativeVirtualAddress.compare(secend.relativeVirtualAddress))
                    break
                case MethodSortType.ACCESS:
                    localMethods = localMethods.sort((first, second) => (second.modifier ?? '').localeCompare(first.modifier ?? ''))
                    break
                case MethodSortType.MethodName:
                    localMethods = localMethods.sort((first, second) => second.name.localeCompare(first.name))
                    break
                case MethodSortType.ARGSCOUNT:
                    localMethods = localMethods.sort((first, second) => first.parameterCount - second.parameterCount)
                    break
            }

            localMethods.filter((method: Il2Cpp.Method) => !method.virtualAddress.isNull())
                .forEach((method: Il2Cpp.Method) => {
                    LOGD(`[*] ${method.handle} ---> ${method.virtualAddress} ---> ${method.relativeVirtualAddress}\t|  ${GMD(method)}`)
                })
            newLine()
            localMethods.filter((method: Il2Cpp.Method) => method.virtualAddress.isNull())
                .forEach((method: Il2Cpp.Method) => {
                    LOGZ(`[*] ${method.handle}\t|  ${GMD(method)}`)
                })
            newLine()
        }
    }

    static showFields(mPtr: NativePointer | String | number): void {
        let klass: Il2Cpp.Class = HookerBase.inputCheck(mPtr)
        if (klass.fields.length == 0) {
            LOGZ(`\n${klass.toString()}`)
            LOGE(`\n[!] ${klass.assemblyName}.${klass.namespace}.${klass.name} @ ${klass.handle} has no fields\n`)
            return
        }
        FM.printTitile(`Found ${klass.fields.length} Fields ${klass.isEnum ? "(enum) " : ""}in class: ${klass.name} (${klass.handle})`)
        klass.fields.forEach((field: Il2Cpp.Field) => LOGD(`[*] ${field.handle} ${field.type.name} ${field.toString()} [type:${field.type.class.handle}]`))
        newLine()
    }

    private static inputCheck(input: NativePointer | String | number): Il2Cpp.Class {
        let klass: Il2Cpp.Class
        if (input instanceof NativePointer) {
            klass = HookerBase.checkType(input)
        } else if (typeof input == "string") {
            klass = HookerBase.checkType(input.trim())
        } else if (typeof input == "number") {
            if (Process.arch == "arm64" && (input.toString().length > 15))
                throw new Error(`\nNot support parameter typed number at ${Process.arch}\n\n\tUse ('0x...') instead\n`)
            // arm32 使用 number
            klass = HookerBase.checkType(ptr(input))
        } else {
            throw (`mPtr must be string('0x...') or NativePointer`)
        }
        return klass
    }

    // findClass cache
    private static map_cache_class = new Map<string, Il2Cpp.Class>()
    /**
     * 优先从fromAssebly列表中去查找，找不到再查找其他Assebly 
     * fromCache 是否使用cache (tips: Class -> UnityEngine.CoreModule.Object/mscorlib.Object 得取消cache，指定fromAssebly)
     * @param searchClassName 待查找的类名
     * @param fromAssebly 优先查找的Assebly列表
     * @param fromCache 是否使用cache
     * @returns 
     */
    static findClass(searchClassName: string, fromAssebly: string[] = ["Assembly-CSharp", "MaxSdk.Scripts", "mscorlib"], fromCache: boolean = true): NativePointer {
        if (searchClassName as any instanceof NativePointer) return ptr(0)
        if (searchClassName as any instanceof Number) return ptr(0)
        if (searchClassName == undefined) throw (`Search name can not be null or undefined`)
        if (typeof searchClassName != "string") throw (`findClass need a string value`)
        if (fromCache) {
            let cache: Il2Cpp.Class | undefined = HookerBase.map_cache_class.get(searchClassName)
            if (cache != undefined) return cache.handle
        }
        let assemblies = Il2Cpp.domain.assemblies
        for (let index = 0; index < assemblies.length; index++) {
            if (fromAssebly.includes(assemblies[index].name)) {
                let ret = innerCall(assemblies[index].image.classes)
                if (ret != undefined) return ret.handle
            }
        }
        for (let index = 0; index < assemblies.length; index++) {
            if (!fromAssebly.includes(assemblies[index].name)) {
                let ret = innerCall(assemblies[index].image.classes)
                if (ret != undefined) return ret.handle
            }
        }
        function innerCall(kclasses: Il2Cpp.Class[]): Il2Cpp.Class | undefined {
            for (let index = 0; index < kclasses.length; index++)
                if (kclasses[index].name == searchClassName) {
                    HookerBase.map_cache_class.set(searchClassName, kclasses[index])
                    return kclasses[index]
                }
        }
        return ptr(0)
    }

    /**
     * using example:
     * 
     * findMethod("UnityEngine.CoreModule","UnityEngine.Transform","Rotate",2,["UnityEngine.Vector3","System.Single"]) // 最快 带参数重载
     * findMethod("UnityEngine.CoreModule","UnityEngine.Color","GetHashCode",0)  //最快 注意第二个参数全称
     * findMethod("GetHashCode","Color") functionName ClassName(简称)
     * findMethod("LerpUnclamped") // 最慢
     * 
     * 以下三种写法等价:
     * Il2Cpp.domain.assembly("UnityEngine.CoreModule").image.class("UnityEngine.Texture").method("get_width",1).virtualAddress
     * ===
     * find_method("UnityEngine.CoreModule","Texture","get_width",0)
     * ===
     * findMethod("UnityEngine.CoreModule","UnityEngine.Texture","get_width",0,undefined,false)
     * 
     * @param assemblyName  Assembly 名称
     * @param className     类名称(全称)
     * @param methodName    函数名称
     * @param argsCount     函数参数个数
     * @param overload      函数重载(字符串数组[全称])
     * @param cmdCall       是否是命令行调用(控制是返回值还是打印日志)
     */
    static findMethodNew(assemblyName: string, className: string, methodName: string, argsCount: number = -1, overload: string[] = [], cmdCall = true): Il2Cpp.Method | undefined {
        let methodInfo: Il2Cpp.Method | undefined
        if (arguments[3] != undefined && typeof arguments[3] == "number") {
            try {
                methodInfo = Il2Cpp.domain.assembly(assemblyName).image.class(className).method(methodName, argsCount)
                if (overload.length != 0) methodInfo = methodInfo?.overload(...overload)
            } catch {
                throw new Error(`findMethod failed: Not Found ${methodName}(argCount:${argsCount}) in ${className}`)
            }
        } else if (arguments[1] != undefined) {
            methodInfo = new Il2Cpp.Class(findClass(arguments[1])).method(arguments[0], arguments[2])
        } else if (arguments[0] != undefined && arguments[1] == undefined) {
            for (let i = 0; i < HookerBase._list_classes.length; i++) {
                for (let m = 0; m < HookerBase._list_classes[i].methods.length; m++) {
                    if (HookerBase._list_classes[i].methods[m] == arguments[0]) {
                        methodInfo = HookerBase._list_classes[i].methods[m]
                        break
                    }
                }
            }
        }
        if (methodInfo == undefined) throw new Error(`Method not found`)
        if (cmdCall) {
            showMethodInfo(methodInfo.handle)
        } else {
            return methodInfo
        }
    }

    /**
     *  根据 ImageName , ClassName , functionName , argsCount 找到对应 function 的地址
     *  最后一个参数 isRealAddr 用作显示静态分析地址还是当前内存地址（带这个参数则只返回地址，不带则列表信息）
     *  find_method("UnityEngine.UI","Text","get_text",0)
     *  find_method("UnityEngine.UI","Text","get_text",0,false)
     * @param {String} imageName    
     * @param {String} className 
     * @param {String} functionName 
     * @param {Number} argsCount 
     * @param {Boolean} isRealAddr 
     */
    private static findMethodsyncCacheMap = new Map<string, NativePointer>()
    static findMethodSync(imageName: string, className: string, functionName: string, argsCount: number = -1, isRealAddr: boolean = true, cmdCall: boolean = true): NativePointer | undefined {
        if (imageName == undefined || className == undefined || functionName == undefined) return ptr(0)
        // var corlib = il2cpp_get_corlib()
        const soAddr = Il2Cpp.module.base
        let cacheKey = imageName + "." + className + "." + functionName + "." + argsCount
        if (isRealAddr) {
            let cachedPointer = HookerBase.findMethodsyncCacheMap.get(cacheKey)
            if (cachedPointer != undefined) return cachedPointer as NativePointer
        }
        let currentlibPack = Il2Cpp.domain.assembly(imageName).image
        let currentlib: NativePointer = currentlibPack.handle
        let klass = Il2Cpp.api.classFromName(currentlib, allocCStr(imageName), allocCStr(className))
        if (klass.isNull()) {
            for (let j = 0; j < Il2Cpp.api.imageGetClassCount(currentlib); j++) {
                let il2CppClass = new Il2Cpp.Class(Il2Cpp.api.imageGetClass(currentlib, j))
                if (il2CppClass.name == className) {
                    klass = il2CppClass.handle
                    break
                }
            }
        }

        if (klass.isNull()) return ptr(0)
        let method = Il2Cpp.api.classGetMethodFromName(klass, allocCStr(functionName), argsCount)
        if (method.isNull()) return ptr(0)
        if (arguments[5] != undefined && arguments[5] != 2) {
            return method
        } else if (arguments[5] != undefined && arguments[5] == 2) {
            return method.readPointer().sub(soAddr)
        }

        HookerBase.findMethodsyncCacheMap.set(cacheKey, method.readPointer())

        if (isRealAddr) return isRealAddr ? method.readPointer() : method.readPointer().sub(soAddr)

        let il2cppMethod = new Il2Cpp.Method(method)
        let parameters_count = il2cppMethod.parameterCount
        let arr_args = new Array()
        let arr_args_type_addr = new Array()
        for (let i = 0; i < parameters_count; i++) {
            let currentParamter = il2cppMethod.parameters[i]
            let typeClass = currentParamter.type.class.handle
            let TypeName = currentParamter.type.class.name
            arr_args.push(TypeName + " " + currentParamter.name)
            arr_args_type_addr.push(TypeName + " " + typeClass)
        }
        let disStr = GMM(method) + il2cppMethod.returnType.name + " " +
            il2cppMethod.name + " " +
            "(" + arr_args + ")" + "\t"
        LOGO(getLine(85))
        LOG(imageName + "." + className + "\t" + disStr, LogColor.RED)
        LOGO(getLine(30))
        let ShowMore = false
        LOG("Il2CppImage\t---->\t" + currentlib + (ShowMore ? " (" + currentlib.add(p_size).readPointer().readCString() + ")" : ""))
        LOG("Il2CppClass\t---->\t" + klass + (ShowMore ? " (" + Il2Cpp.api.classGetName(klass) + ")" : ""))
        LOG("MethodInfo\t---->\t" + method + (ShowMore ? " (" + Il2Cpp.api.classGetName(method) + ")" : ""))
        LOGD("MethodPointer\t---->\t" + method.readPointer() + "\t===>\t" + method.readPointer().sub(soAddr))
        LOGO(getLine(85))
    }

    static MethodToShow(method: Il2Cpp.Method): void {
        if (typeof method == "string" && (String(method).startsWith('0x') || String(method).startsWith('0X'))) {
            method = new Il2Cpp.Method(ptr(method))
        }
        if (typeof method == "number") method = new Il2Cpp.Method(ptr(method))
        let methodDes = GMD(method)
        let nameSpace = method.class.namespace
        let classBelow = `${nameSpace.length == 0 ? '' : nameSpace + '.'}${method.class.name}`
        let title = `${classBelow}\t${methodDes}`
        let lineLen = title.length + 0x10
        LOGW(getLine(lineLen, "-"))
        LOGE(title)
        LOGW(getLine(lineLen / 2, "-"))
        LOGZ("Il2CppImage\t---->\t" + method.class.image.handle)
        LOGZ("Il2CppClass\t---->\t" + method.class.handle)
        LOGZ("MethodInfo\t---->\t" + method.handle)
        LOGD("MethodPointer\t---->\t" + method.virtualAddress + "\t===>\t" + (method.virtualAddress.isNull() ? ptr(0) : method.relativeVirtualAddress))
        LOGW(getLine(lineLen, "-"))
    }

    // static getFieldOffFromCls(clsptr: NativePointer, fieldName: string): NativePointer {
    //     if (arguments[2] == undefined) return HookerBase.listFieldsFromCls(clsptr, 0, 2, fieldName)
    //     return HookerBase.listFieldsFromCls(clsptr, ptr(arguments[2]), 1, fieldName)
    // }

    // static getFieldInfoFromCls(clsptrOrName: string | NativePointer | number, fieldName: string) {
    //     if (typeof clsptrOrName == "string") clsptrOrName = findClass(clsptrOrName)
    //     if (typeof clsptrOrName == "number") clsptrOrName = ptr(clsptrOrName)
    //     if (arguments[2] == undefined) return listFieldsFromCls(clsptrOrName, 0, 2, fieldName)
    //     return HookerBase.listFieldsFromCls(clsptrOrName, ptr(arguments[2]), 2, fieldName)
    // }

    static listFieldsFromCls(klass: NativePointer | number, instance: NativePointer | number) {
        if (klass == undefined || klass == null) return
        if (typeof klass == "number") klass = ptr(klass)
        if (typeof instance == "number") instance = ptr(instance)
        let packCls = new Il2Cpp.Class(klass)
        let fieldsCount = packCls.fields.length
        if (fieldsCount <= 0) return
        let is_enum = packCls.isEnum
        if (arguments[2] == undefined) LOGH("\nFound " + fieldsCount + " Fields" + (is_enum ? "(enum)" : "") + " in class: " + packCls.name + " (" + klass + ")")
        // ...\Data\il2cpp\libil2cpp\il2cpp-class-internals.h
        let iter = alloc()
        let field = null
        let maxlength = 0
        let arrStr = new Array()
        let enumIndex = 0
        while (field = Il2Cpp.api.classGetFields(klass, iter)) {
            if (field.isNull()) break
            let fieldName = field.readPointer().readCString()
            let filedType = field.add(p_size).readPointer()
            let filedOffset = "0x" + field.add(3 * p_size).readInt().toString(16)
            let field_class = Il2Cpp.api.typeGetClass(filedType)
            let fieldClassName = new Il2Cpp.Class(field_class).name
            let accessStr = fackAccess(filedType)
            accessStr = accessStr.substring(0, accessStr.length - 1)
            let enumStr = (is_enum && (String(field_class) == String(klass))) ? (enumIndex++ + "\t") : " "
            let retStr = filedOffset + "\t" + accessStr + "\t" + fieldClassName + "\t" + field_class + "\t" + fieldName + "\t" + enumStr
            if (arguments[2] == "1" && fieldName == arguments[3]) return ptr(filedOffset)
            if (arguments[2] == "2" && fieldName == arguments[3]) {
                let tmpValue = !instance.isNull() ? instance.add(ptr(filedOffset)) : ptr(0)
                let tmpValueR = !instance.isNull() ? instance.add(ptr(filedOffset)).readPointer() : ptr(0)
                return [fieldName, filedOffset, field_class, fieldClassName, tmpValue, tmpValueR]
            }
            arrStr.push(retStr)
            maxlength = retStr.length < maxlength ? maxlength : retStr.length
        }
        if (arguments[2] != undefined) return ptr(0)

        LOGO("\n" + getLine(maxlength + 5))

        /**
         * mStr[0] offset
         * mStr[1] access flag str
         * mStr[2] field class name
         * mStr[3] field class pointer
         * mStr[4] field name
         */
        arrStr.sort((x, y) => {
            return parseInt(x.split("\t")[0]) - parseInt(y.split("\t")[0])
        }).forEach((str, index) => {
            // 静态变量
            // if (str.indexOf("static") != -1) str = str.replace("0x0", "---")
            let mStr = str.split("\t")
            // 值解析          
            let mName = mStr[2]
            let indexStr = String("[" + index + "]")
            let indexSP = indexStr.length == 3 ? " " : ""
            let enumStr = String(mStr[5]).length == 1 ? String(mStr[5] + " ") : String(mStr[5])
            LOG(indexStr + indexSP + " " + mStr[0] + " " + mStr[1] + " " + mStr[2] + "(" + mStr[3] + ") " + enumStr + " " + mStr[4], LogColor.C36)
            if (typeof instance == "number") instance = ptr(instance)
            if (instance != undefined && str.indexOf("static") == -1) {
                let mPtr = instance.add(mStr[0])
                let realP = mPtr.readPointer()
                let fRet = FackKnownType(mName, realP, mStr[3])
                // 当它是boolean的时候只保留 最后两位显示
                if (mName == "Boolean") {
                    let header = String(realP).substr(0, 2)
                    let endstr = String(realP).substr(String(realP).length - 2, String(realP).length).replace("x", "0")
                    let middle = getLine(((Process.arch == "arm" ? 10 : 14) - 2 - 2), ".")
                    // realP = header + middle + endstr
                }
                // fRet = fRet == "UnKnown" ? (mPtr + " ---> " + realP) : (mPtr + " ---> " + realP + " ---> " + fRet)
                LOG("\t" + fRet + "\n", LogColor.C90)
            } else if (str.indexOf("static") != -1) {
                // console.warn(+ptr(mStr[3])+allocStr(mStr[4])+"\t"+mStr[4])
                let field = Il2Cpp.api.classGetFieldFromName(ptr(mStr[3]), allocCStr(mStr[4]))
                if (!field.isNull()) {
                    let addrOut = alloc()
                    Il2Cpp.api.fieldGetStaticValue(field, addrOut)
                    let realP = addrOut.readPointer()
                    LOG("\t" + addrOut + " ---> " + realP + " ---> " + FackKnownType(mName, realP, mStr[3]), LogColor.C90)
                }
                LOG("\n")
            }
        })
        LOGO(getLine(maxlength + 5))

        function fackAccess(m_type: NativePointer) {
            let attrs = m_type.add(p_size).readPointer()
            let outPut = ""
            let access = Number(attrs) & FieldAccess.FIELD_ATTRIBUTE_FIELD_ACCESS_MASK
            switch (access) {
                case FieldAccess.FIELD_ATTRIBUTE_PRIVATE:
                    outPut += "private "
                    break;
                case FieldAccess.FIELD_ATTRIBUTE_PUBLIC:
                    outPut += "public "
                    break;
                case FieldAccess.FIELD_ATTRIBUTE_FAMILY:
                    outPut += "protected "
                    break;
                case FieldAccess.FIELD_ATTRIBUTE_ASSEMBLY:
                case FieldAccess.FIELD_ATTRIBUTE_FAM_AND_ASSEM:
                    outPut += "internal "
                    break;
                case FieldAccess.FIELD_ATTRIBUTE_FAM_OR_ASSEM:
                    outPut += "protected internal "
                    break;
            }
            if (Number(attrs) & FieldAccess.FIELD_ATTRIBUTE_LITERAL) {
                outPut += "const "
            } else {
                if (Number(attrs) & FieldAccess.FIELD_ATTRIBUTE_STATIC) {
                    outPut += "static "
                }
                if (Number(attrs) & FieldAccess.FIELD_ATTRIBUTE_INIT_ONLY) {
                    outPut += "readonly "
                }
            }
            return outPut
        }

        // 已弃用 现换做 dealWithSpecialType @ FieldsParser.ts
        function FackKnownType(...args: any[]) {

        }
    }
}

/**
 * 这个方法可以参考用在查找文本上
 * 其次除了这样找还有一个 GetComponents 也有同样的效果，还能找到更全文本，不过麻烦点
 * @param inputClass 查找的class
 * @returns 
 */
export const get_gc_instance = (inputClass: string | NativePointer | Il2Cpp.Class = "GameObject"): Array<Il2Cpp.Object> => {
    let localClass: Il2Cpp.Class
    if (inputClass instanceof NativePointer) {
        if (inputClass.isNull()) throw new Error(`inputClass can not be null`)
        localClass = new Il2Cpp.Class(inputClass)
    } else if (inputClass instanceof Il2Cpp.Class) {
        if (inputClass.isNull()) throw new Error(`inputClass can not be null`)
        localClass = inputClass
    } else if (typeof inputClass == "string") {
        let localC = findClass(inputClass)
        if (localC.isNull()) throw new Error(`If the class is not found, please pay attention to capitalization`)
        localClass = new Il2Cpp.Class(localC)
    } else {
        throw new Error(`inputClass type error`)
    }
    return Il2Cpp.gc.choose(localClass)
}

export const show_gc_instance = (inputClass: string | NativePointer | Il2Cpp.Class): void => get_gc_instance(inputClass).forEach((item: Il2Cpp.Object) => {
    let localDes = FakeCommonType(item.class.type, item.handle)
    LOGD(`[*] ${item.handle}\t${localDes}`)
})

/**
 * @example fakeGCInstance('TMP_Text', (instance)=>{return callFunctionRUS(findMethod('Unity.TextMeshPro',"TMPro.TMP_Text","get_text",0,[],false).virtualAddress,instance.handle)})
 */
export const fake_gc_instance = (inputClass: string | NativePointer | Il2Cpp.Class, mapFunction?: (item: Il2Cpp.Object) => string): void => {
    if (typeof inputClass == "string") {
        if (inputClass == "TMP_Text" && !mapFunction) {
            mapFunction = (instance) => { return callFunctionRUS(find_method('Unity.TextMeshPro', "TMP_Text", "get_text", 0), instance.handle) }
        }
    }
    get_gc_instance(inputClass)
        .map((item: Il2Cpp.Object) => mapFunction ? mapFunction(item) : item)
        .forEach((item: string | Il2Cpp.Object) => {
            if (typeof item == "string") {
                LOGD(`[*] ${item}`)
            } else if (item instanceof Il2Cpp.Object) {
                LOGD(`[*] ${item.handle}\t${item}`)
            }
        })
}

export const find_method = HookerBase.findMethodSync as find_MethodType

type find_MethodType = (imageName: string, className: string, functionName: string, argsCount?: number, isRealAddr?: boolean, cmdCall?: boolean) => NativePointer
type findMethodType = (assemblyName: string, className: string, methodName: string, argsCount?: number, overload?: string[], cmdCall?: boolean) => Il2Cpp.Method | undefined

Reflect.set(globalThis, "Hooker", HookerBase)

globalThis.i = HookerBase.showImages
globalThis.c = HookerBase.showClasses
globalThis.m = HookerBase.showMethods
globalThis.f = HookerBase.showFields
globalThis.F = HookerBase.listFieldsFromCls // 弃用
globalThis.fc = HookerBase.findClass
globalThis.findClass = HookerBase.findClass
globalThis.findMethod = HookerBase.findMethodNew
globalThis.find_method = HookerBase.findMethodSync as find_MethodType
globalThis.MethodToShow = HookerBase.MethodToShow
globalThis.af = (className: string) => B(findClass(className))
globalThis.aui = () => B("AUI")
globalThis.getGCInstance = get_gc_instance
globalThis.showGCInstance = show_gc_instance
globalThis.fakeGCInstance = fake_gc_instance

globalThis.J = (fn: () => void) => Java.perform(fn)

Il2Cpp.perform(() => globalThis.soAddr = Il2Cpp.module.base)

declare global {
    namespace Il2Cpp {
        class Hooker extends HookerBase { }
    }
    var i: (filter?: string, sort?: boolean) => void
    var c: (imageOrName: string | NativePointer, filter: string) => void
    var m: (klass: NativePointer, sort?: MethodSortType, detailed?: boolean) => void
    var f: (klass: NativePointer) => void
    var F: (klass: NativePointer | number, instance: NativePointer | number) => void // 老版本写法已弃用
    var findClass: (name: string, fromAssebly?: string[], fromCache?: boolean) => NativePointer
    var fc: (name: string, fromAssebly?: string[]) => NativePointer
    var af: (className: string) => void
    var aui: () => void
    var J: (fn: () => void) => void // alias Java.perform

    var findMethod: findMethodType
    var find_method: find_MethodType

    var MethodToShow: (methodInfo: Il2Cpp.Method) => void

    var getGCInstance: (inputClass?: string | NativePointer | Il2Cpp.Class) => Array<Il2Cpp.Object>
    var showGCInstance: (inputClass: string | NativePointer | Il2Cpp.Class) => void
    var fakeGCInstance: (inputClass: string | NativePointer | Il2Cpp.Class, mapFunction?: (item: Il2Cpp.Object) => string) => void

    var soAddr: NativePointerValue
}
