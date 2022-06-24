import { cache } from "decorator-cache-getter";
import "../bridge/fix/Il2cppClass"
import { getMethodModifier } from "../bridge/fix/il2cppMethod";
import { allocCStr } from "../utils/alloc";
import { LogColor } from "./enum";
import { formartClass } from "../utils/formart";

class HookerBase {
    constructor() { }

    @cache
    static get _list_assemblies(): Il2Cpp.Assembly[] {
        return Il2Cpp.Domain.assemblies
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

    // @cache
    private static getMapImagesCacheMap = new Map()
    static getMapImages(): Map<string, NativePointer> {
        if (HookerBase.getMapImagesCacheMap.size != 0) return HookerBase.getMapImagesCacheMap
        HookerBase._list_images_names.forEach((item, index) => HookerBase.getMapImagesCacheMap.set(item, HookerBase._list_images_pointers[index]))
        return HookerBase.getMapImagesCacheMap
    }

    @cache
    static get _list_classes(): Il2Cpp.Class[] {
        return Il2Cpp.Domain.assemblies.map((assembly: Il2Cpp.Assembly) => assembly.image).flatMap((image: Il2Cpp.Image) => image.classes)
    }

    static showImages(filter: string = "", sort: boolean = true): void {
        formartClass.printTitile("List Images { assembly -> image -> classCount -> imageName }")
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

    static showClasses(imageOrName: string | NativePointer | number, filterNameSpace: string = "", filterClassName: string = "",): void {
        let image: Il2Cpp.Image
        if (typeof imageOrName == "string") {
            image = Il2Cpp.Domain.assembly(imageOrName).image
        } else if (typeof imageOrName == "number") {
            image = new Il2Cpp.Image(ptr(imageOrName))
        } else if (arguments[0] == undefined) {
            LOGE("imageOrName can not be null")
            return
        } else {
            LOGE("imageOrName must be string or number")
            return
        }

        let tMap = new Map<string, Array<Il2Cpp.Class>>()
        let countNameSpace: number = 0
        let countFilterCls: number = 0
        for (let i = 0; i < image.classes.length; i++) {
            let key = "[*] " + image.classes[i].namespace
            if (tMap.get(key) == undefined) {
                tMap.set(key, new Array<Il2Cpp.Class>())
            }
            tMap.get(key)?.push(image.classes[i])
        }

        let titleLen = formartClass.printTitile("List Classes { namespace {classPtr->filedsCount->methodsCount->enumClass->className} }")
        for (let key of tMap.keys()) {
            let nameSpace = key
            if (nameSpace != undefined) {
                let array = tMap.get(nameSpace)
                // filterNameSpace 不区分大小写
                if (nameSpace.toLowerCase().indexOf(filterNameSpace.toLowerCase()) == -1) continue
                ++countNameSpace
                LOGD(`\n${nameSpace}`)
                array?.forEach((klass: Il2Cpp.Class) => {
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
        if (typeof mPtr == "string") {
            klass = new Il2Cpp.Class(findClass(mPtr))
        } else if (typeof mPtr == "number") {
            klass = new Il2Cpp.Class(ptr(mPtr))
        } else {
            throw ("mPtr must be string or number or NativePointer")
        }
        if (klass.handle.equals(ptr(0))) throw ("klass handle can not be null")
        return klass
    }

    static showMethods(mPtr: NativePointer): void {
        let klass: Il2Cpp.Class = HookerBase.checkType(mPtr)
        if (klass.methods.length == 0) return
        formartClass.printTitile(`Found ${klass.fields.length} Fields ${klass.isEnum ? "(enum)" : ""} in class: ${klass.name} (${klass.handle})`)
        klass.methods.forEach((method: Il2Cpp.Method) => {
            LOGD(`[*] ${method.toString()}`)
        })
    }

    static showFields(mPtr: NativePointer): void {
        let klass: Il2Cpp.Class = HookerBase.checkType(mPtr)
        if (klass.fields.length == 0) return
        formartClass.printTitile(`Found ${klass.fields.length} Fields ${klass.isEnum ? "(enum) " : ""}in class: ${klass.name} (${klass.handle})`)
        klass.fields.forEach((field: Il2Cpp.Field) => {
            LOGD(`[*] ${field.handle} ${field.type.name} ${field.toString()} [type:${field.type.class.handle}]`)
        })
        LOGO(``)
    }

    /** 优先从fromAssebly列表中去查找，找不到再查找其他Assebly */
    private static map_cache_class = new Map<string, Il2Cpp.Class>()
    static findClass(searchClassName: string, fromAssebly: string[] = ["Assembly-CSharp", "MaxSdk.Scripts", "mscorlib"]): NativePointer {
        if (searchClassName == undefined) throw ("Search name can not be null or undefined")
        if (typeof searchClassName != "string") throw ("findClass need a string value")
        let cache: Il2Cpp.Class | undefined = HookerBase.map_cache_class.get(searchClassName)
        if (cache != undefined) return cache.handle
        let assemblies = Il2Cpp.Domain.assemblies
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
                methodInfo = Il2Cpp.Domain.assembly(assemblyName).image.class(className).method(methodName, argsCount)
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
        if (methodInfo == undefined) throw new Error("Method not found")
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
    static findMethodSync(imageName: string, className: string, functionName: string, argsCount: number = -1, isRealAddr: boolean = true): NativePointer | undefined {
        if (imageName == undefined || className == undefined || functionName == undefined) return ptr(0)
        // var corlib = il2cpp_get_corlib()
        const soAddr = Il2Cpp.module.base
        let cacheKey = imageName + "." + className + "." + functionName + "." + argsCount
        if (isRealAddr) {
            let cachedPointer = HookerBase.findMethodsyncCacheMap.get(cacheKey)
            if (cache != undefined) return cachedPointer as NativePointer
        }
        let currentlibPack = Il2Cpp.Domain.assembly(imageName).image
        let currentlib: NativePointer = currentlibPack.handle
        let klass = Il2Cpp.Api._classFromName(currentlib, allocCStr(imageName), allocCStr(className))
        if (klass.isNull()) {
            for (let j = 0; j < Il2Cpp.Api._imageGetClassCount(currentlib); j++) {
                let il2CppClass = new Il2Cpp.Class(Il2Cpp.Api._imageGetClass(currentlib, j))
                if (il2CppClass.name == className) {
                    klass = il2CppClass.handle
                    break
                }
            }
        }

        if (klass.isNull()) return ptr(0)
        let method = Il2Cpp.Api._classGetMethodFromName(klass, allocCStr(functionName), argsCount)
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
        let disStr = getMethodModifier(method) + il2cppMethod.returnType.name + " " +
            il2cppMethod.name + " " +
            "(" + arr_args + ")" + "\t"
        LOGO(getLine(85))
        LOG(imageName + "." + className + "\t" + disStr, LogColor.RED)
        LOGO(getLine(30))
        let ShowMore = false
        LOG("Il2CppImage\t---->\t" + currentlib + (ShowMore ? " (" + currentlib.add(p_size).readPointer().readCString() + ")" : ""))
        LOG("Il2CppClass\t---->\t" + klass + (ShowMore ? " (" + Il2Cpp.Api._classGetName(klass) + ")" : ""))
        LOG("MethodInfo\t---->\t" + method + (ShowMore ? " (" + Il2Cpp.Api._classGetName(method) + ")" : ""))
        LOGD("methodPointer\t---->\t" + method.readPointer() + "\t===>\t" + method.readPointer().sub(soAddr))
        LOGO(getLine(85))
    }
}

const find_method = HookerBase.findMethodSync as find_MethodType
export { HookerBase, find_method }

type find_MethodType = (imageName: string, className: string, functionName: string, argsCount?: number, isRealAddr?: boolean) => NativePointer
type findMethodType = (assemblyName: string, className: string, methodName: string, argsCount?: number, overload?: string[], cmdCall?: boolean) => Il2Cpp.Method | undefined

Reflect.set(globalThis, "Hooker", HookerBase)

globalThis.i = HookerBase.showImages
globalThis.c = HookerBase.showClasses
globalThis.m = HookerBase.showMethods
globalThis.f = HookerBase.showFields
globalThis.findClass = HookerBase.findClass
globalThis.findMethod = HookerBase.findMethodNew
globalThis.find_method = HookerBase.findMethodSync as find_MethodType

Il2Cpp.perform(() => globalThis.soAddr = Il2Cpp.module.base)

declare global {
    namespace Il2Cpp {
        class Hooker extends HookerBase { }
    }
    var i: (filter?: string, sort?: boolean) => void
    var c: (imageOrName: string | NativePointer, filter: string) => void
    var m: (klass: NativePointer) => void
    var f: (klass: NativePointer) => void
    var findClass: (name: string, fromAssebly?: string[]) => NativePointer
    var findMethod: findMethodType
    var find_method: find_MethodType
    var soAddr: NativePointerValue
}