import { Application } from "../expand/TypeExtends/mscorlibObj/Application/export"
import { Environment } from "../expand/TypeExtends/mscorlibObj/Environment/export"
import { SystemInfo } from "../expand/TypeExtends/mscorlibObj/SystemInfo/export"
import { getMethodDesFromMethodInfo as DM } from "../bridge/fix/il2cppM"
import { Time } from "../expand/TypeExtends/mscorlibObj/Times/export"
import { formartClass as FM } from "../utils/formart"
import { distance } from "fastest-levenshtein"
import { HookerBase } from "../base/base"
import { Breaker } from "../base/breaker"

/**
 * 获取APK的一些基本信息
 */
const getApkInfo = () => {

    Java.perform(() => {
        LOGO(getLine(100))
        let context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext()
        let pkgInfo = context.getPackageManager().getPackageInfo(context.getPackageName(), 0)
        // var appInfo = context.getApplicationInfo()
        let appInfo = pkgInfo.applicationInfo.value

        let labelRes: number = -1
        let strName: string = "Error Reading Name"
        try {
            labelRes = appInfo.labelRes.value
            strName = context.getResources().getString(labelRes)
        } catch { }

        LOGD("[*]AppName\t\t" + strName + " (UID:" + appInfo.uid.value + ")\t ID:0x" + (appInfo.labelRes.value).toString(16))
        let flags = appInfo.flags.value
        LOGZ("\t\t\tBackupable -> " + ((flags & 32768) != 0) + "\t" + "Debugable -> " + ((flags & 2) != 0))

        let str_pkgName = context.getPackageName()
        LOGD("\n[*]PkgName\t\t" + str_pkgName)

        let verName = pkgInfo.versionName.value
        let verCode = pkgInfo.versionCode.value
        let targetSdkVersion = pkgInfo.applicationInfo.value.targetSdkVersion.value
        LOGD("\n[*]Verison\t\t{ " + verName + " / " + verCode + " }\t(targetSdkVersion:" + targetSdkVersion + ")")

        let appSize = Java.use("java.io.File").$new(appInfo.sourceDir.value).length()
        LOGD("\n[*]AppSize\t\t" + appSize + "\t(" + (appSize / 1024 / 1024).toFixed(2) + " MB)")

        LOGD("\n[*]Time\t\t\tInstallTime\t" + new Date(pkgInfo.firstInstallTime.value).toLocaleString())
        LOGD("\t\t\tUpdateTime\t" + new Date(pkgInfo.lastUpdateTime.value).toLocaleString())

        let ApkLocation = appInfo.sourceDir.value
        let TempFile = appInfo.dataDir.value
        LOGD("\n[*]Location\t\t" + ApkLocation + "\n\t\t\t" + getLibPath() + "\n\t\t\t" + TempFile)

        // PackageManager.GET_SIGNATURES == 0x00000040
        let pis = context.getPackageManager().getPackageInfo(str_pkgName, 0x00000040)
        let hexDigist = (pis.signatures.value)[0].toByteArray()
        LOGD("\n[*]Signatures\t\tMD5\t " + hexdigest(hexDigist, 'MD5') +
            "\n\t\t\tSHA-1\t " + hexdigest(hexDigist, 'SHA-1') +
            "\n\t\t\tSHA-256\t " + hexdigest(hexDigist, 'SHA-256'))
        let buildId = getMetaData('unity.build-id')
        try {
            if (buildId.length != 0) LOGD("\n[*]unity.build-id\t" + getMetaData('unity.build-id'))
        } catch { }
        LOGO(getLine(100))
    })

    function getMetaData(key: string): string {
        // public static final int GET_META_DATA = 0x00000080
        let context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext()
        let appInfo = context.getPackageManager().getApplicationInfo(context.getPackageName(), 0x00000080)
        let metaData = appInfo.metaData.value
        if (null != metaData) {
            // var metaDataB = Java.cast(metaData,Java.use("android.os.BaseBundle"))
            // LOG(metaDataB.mMap.value)
            return metaData.getString(key)
        }
        return "..."
    }

    /**
     * 计算byte字节并转换为String返回
     * @param {*} paramArrayOfByte byte 字节
     * @param {*} algorithm 算法 MD5 / SHA-1 / SHA-256
     */
    function hexdigest(paramArrayOfByte: any, algorithm: string) {
        const hexDigits = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102]
        let localMessageDigest = Java.use("java.security.MessageDigest").getInstance(algorithm)
        localMessageDigest.update(paramArrayOfByte)
        let arrayOfByte = localMessageDigest.digest()
        let arrayOfChar = []
        for (let i = 0, j = 0; ; i++, j++) {
            let strLenth = algorithm == "MD5" ? 16 : (algorithm == "SHA-1" ? 20 : 32)
            if (i >= strLenth) return Java.use("java.lang.String").$new(arrayOfChar)
            let k = arrayOfByte[i]
            arrayOfChar[j] = hexDigits[(0xF & k >>> 4)]
            arrayOfChar[++j] = hexDigits[(k & 0xF)]
        }
    }

    function getLibPath(name: string | undefined = undefined): string {
        let retStr = ""
        Java.perform(() => {
            let context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext()
            let libPath = context.getApplicationInfo().nativeLibraryDir.value
            retStr = libPath + "/" + (name == undefined ? "" : name)
        })
        return retStr
    }
}

function getUnityInfo() {
    Application()
    SystemInfo()
    Environment()
    Time()
}

export var allMethodsCacheArray: Array<Il2Cpp.Method> = new Array<Il2Cpp.Method>() // all methods cache
const cacheMethods = (withLog: boolean = true) => {
    if (allMethodsCacheArray.length > 0) return
    if (withLog) LOGZ("Caching methods ...")
    let timeCurrent = Date.now()
    Il2Cpp.Domain.assemblies.forEach((assembly: Il2Cpp.Assembly) => {
        assembly.image.classes.forEach((klass: Il2Cpp.Class) => allMethodsCacheArray = allMethodsCacheArray.concat(klass.methods))
    })
    allMethodsCacheArray = allMethodsCacheArray.sort((a: Il2Cpp.Method, b: Il2Cpp.Method) => a.virtualAddress.compare(b.virtualAddress))
    if (withLog) LOGZ(`Caching methods done. ${allMethodsCacheArray.length} Methods . cost ${Date.now() - timeCurrent} ms`)
}

const findClasses = (filterClassName: string, completeMatch: boolean = false, retArray: boolean = false): void | Il2Cpp.Class[] => {
    let index: number = 0 // 行计数
    const maxClassLen: number = 30 // className 最大长度,保持格式，多出部分省略 (new Il2Cpp.Class(ptr(...)).name 获取)
    const localClasses: Il2Cpp.Class[] = HookerBase._list_classes
        .filter((item: Il2Cpp.Class) => completeMatch ? item.name == filterClassName : item.name.toLocaleLowerCase().includes(filterClassName.toLocaleLowerCase()))
    let maxNameLen: number = localClasses
        .reduce((a: number, b: Il2Cpp.Class) => a > b.name.length ? a : b.name.length, 0) + 1
    maxNameLen = (maxNameLen > maxClassLen ? maxClassLen : maxNameLen) - 1
    if (retArray) return localClasses
    localClasses
        .sort((a: Il2Cpp.Class, b: Il2Cpp.Class) => (b.isAbstract ? -1 : 1) - (a.isAbstract ? -1 : 1))
        .sort((a: Il2Cpp.Class, b: Il2Cpp.Class) => (b.isEnum ? 1 : -1) - (a.isEnum ? 1 : -1))
        .forEach((item: Il2Cpp.Class) => {
            if (index == 0) newLine(1)
            let M = FM.alignStr(`M:${item.methods.length}`, 6)
            let F = FM.alignStr(`F:${item.fields.length}`, 6)
            let E = FM.alignStr(`E:${item.isEnum}`, 8)
            let A = FM.alignStr(`A:${item.isAbstract}`, 8)
            // AssemblyName ${class.assemblyName} / NameSpace ${item.namespace}.${class.name}
            let N = `${TFM(FM.alignStr(item.name, maxNameLen), LogColor.C93)} ${TFM(`< ${item.assemblyName} -> ${item.namespace.length == 0 ? 'NULL' : item.namespace} >`, LogColor.C33)}`
            LOG(`${FM.alignStr(`[${++index}]`, 6)}${item.handle}  ===>  { ${M}| ${F}| ${E}| ${A} } ${N}`, (item.isAbstract || item.isEnum) ? LogColor.C90 : LogColor.C36)
        })
    newLine(1)
}

/**
 * 过滤并展示一些常用好用的函数及其地址
 * filter and show some useful methods
 * @param filter            过滤字段
 * @param findAll           查找所有方法还是常用方法
 * @param formartMaxLine    格式化字符串 仅在retArr为false时生效
 * @param retArr            返回一个数值还是直接打印结果
 * @param accurate          是否准且匹配 仅在findAll为true时生效
 * @returns 
 */
const printExp = (filter: string = "", findAll: boolean = true, formartMaxLine: number = -1, retArr: boolean = false, accurate: boolean = false): void | Array<Il2Cpp.Method> => {

    let countIndex: number = -1
    let arrStrResult: Array<string> = new Array<string>()
    let arrVirResult: Array<string> = new Array<string>() // 虚方法
    let arrPtrResult: Array<Il2Cpp.Method> = new Array<Il2Cpp.Method>()
    let enterTime: number = Date.now()

    try {
        // libil2cpp.so common export function
        findExport("il2cpp_", "libil2cpp.so", (item: ModuleExportDetails | ModuleSymbolDetails) => {
            if (item.type == "function" && item.name.toLocaleLowerCase().includes(filter.toLowerCase())) formartAndSaveModuleDetails(item)
        })

        findExport("", "libunity.so", (item: ModuleExportDetails | ModuleSymbolDetails) => {
            if (item.type == "function" && item.name.toLocaleLowerCase().includes(filter.toLowerCase())) formartAndSaveModuleDetails(item)
        })
    } catch (error) { LOGE(error) }

    // 查找所有函数
    if (findAll) {
        if (allMethodsCacheArray.length == 0) cacheMethods()
        allMethodsCacheArray
            .filter((item: Il2Cpp.Method) => accurate ? item.name == filter : item.name.toLocaleLowerCase().includes(filter.toLowerCase()))
            .forEach(formartAndSaveIl2cppMehods)
    }
    // 查找常用的一些函数
    else {
        new Il2Cpp.Class(findClass("Transform")).methods.forEach((item: Il2Cpp.Method) => {
            if (item.name.toLocaleLowerCase().includes(filter.toLowerCase())) formartAndSaveIl2cppMehods(item)
        })

        new Il2Cpp.Class(findClass("GameObject")).methods.forEach((item: Il2Cpp.Method) => {
            if (item.name.toLocaleLowerCase().includes(filter.toLowerCase())) formartAndSaveIl2cppMehods(item)
        })

        new Il2Cpp.Class(findClass("Application")).methods.forEach((item: Il2Cpp.Method) => {
            if (item.name.toLocaleLowerCase().includes(filter.toLowerCase())) formartAndSaveIl2cppMehods(item)
        })

        new Il2Cpp.Class(findClass("Input")).methods.forEach((item: Il2Cpp.Method) => {
            if (item.name.toLocaleLowerCase().includes(filter.toLowerCase())) formartAndSaveIl2cppMehods(item)
        })

        new Il2Cpp.Class(findClass("PlayerPrefs")).methods.forEach((item: Il2Cpp.Method) => {
            if (item.name.toLocaleLowerCase().includes(filter.toLowerCase())) formartAndSaveIl2cppMehods(item)
        })

        new Il2Cpp.Class(findClass("Object", ["UnityEngine.CoreModule"], false)).methods.forEach((item: Il2Cpp.Method) => {
            if (item.name.toLocaleLowerCase().includes(filter.toLowerCase())) formartAndSaveIl2cppMehods(item)
        })

        new Il2Cpp.Class(findClass("Object", ["mscorlib"], false)).methods.forEach((item: Il2Cpp.Method) => {
            if (item.name.toLocaleLowerCase().includes(filter.toLowerCase())) formartAndSaveIl2cppMehods(item)
        })

        try {
            new Il2Cpp.Class(findClass("Text")).methods.forEach((item: Il2Cpp.Method) => {
                if (item.name.toLocaleLowerCase().includes(filter.toLowerCase())) formartAndSaveIl2cppMehods(item)
            })
        } catch (error) {
            // LOGE("Not found 'Text' class") 
        }
    }

    if (retArr) return arrPtrResult

    newLine()
    arrStrResult.sort(distance).forEach(LOGD)
    newLine()
    arrVirResult.sort(distance).forEach(LOGZ)
    LOGZ(`\nTake ${Date.now() - enterTime}ms to find ${arrStrResult.length} ${arrStrResult.length <= 1 ? "result" : "results"}`)
    if (formartMaxLine != -1 && formartMaxLine < 100) LOGZ(`\n${formartMaxLine} lines of results are shown recommended to be greater than 100`)
    newLine()

    function formartAndSaveModuleDetails(item: ModuleExportDetails | ModuleSymbolDetails) {
        if (retArr) return
        let index = FM.alignStr(`[${++countIndex}]`, 6)
        let result = `${index} ${FM.alignStr(item.address, p_size * 4)}  --->   ${item.address.sub(soAddr)}\t${item.name}`
        if (formartMaxLine != -1 && formartMaxLine > 10) result = FM.alignStr(result, formartMaxLine)
        arrStrResult.push(result)
    }

    function formartAndSaveIl2cppMehods(item: Il2Cpp.Method) {
        if (retArr) {
            arrPtrResult.push(item)
            return
        }
        let index = FM.alignStr(`[${++countIndex}]`, 6)
        let virAddr = FM.alignStr(item.handle, p_size * 3) + (item.virtualAddress.isNull() ? "" : ` --->  ${FM.alignStr(item.relativeVirtualAddress, 12)}`)
        let className = FM.alignStr(item.class.name, 20)
        let result = `${index} ${virAddr}  |  ${className} @ ${item.class.handle} |  ${DM(item)}`
        if (formartMaxLine != -1 && formartMaxLine > 10) result = FM.alignStr(result, formartMaxLine)
        if (!item.virtualAddress.isNull()) {
            arrStrResult.push(result)
        } else {
            arrVirResult.push(result)
        }
    }
}

const AddressToMethod = (mPtr: NativePointer | number, withLog: boolean = true): Il2Cpp.Method => {
    allMethodsCacheArray.length == 0 ? cacheMethods(withLog) : null
    if (typeof mPtr == "string" && String(mPtr).startsWith("0x")) mPtr = ptr(mPtr)
    if (typeof mPtr == "number") mPtr = ptr(mPtr)
    let result = allMethodsCacheArray.find((item: Il2Cpp.Method) => item.virtualAddress.equals(mPtr) || item.relativeVirtualAddress.equals(mPtr))
    if (result) return result
    throw new Error(`Can't find method by address ${mPtr}`)
}

const AddressToMethodNoException = (mPtr: NativePointer, withLog: boolean = false): Il2Cpp.Method | null => {
    try {
        return AddressToMethod(mPtr, withLog)
    } catch { return null }
}

const AddressToMethodToShow = (mPtr: NativePointer, simple: boolean = true): void => {
    if (simple) return HookerBase.MethodToShow(AddressToMethod(mPtr))
    let method: Il2Cpp.Method = AddressToMethod(mPtr)
    let ImageName = method.class.image.name
    let NameSpace = method.class.namespace
    let MethodName = method.class.name
    let maxLen = Math.max(ImageName.length, NameSpace.length, MethodName.length) + 1
    ImageName = FM.alignStr(ImageName, maxLen)
    NameSpace = FM.alignStr(NameSpace, maxLen)
    MethodName = FM.alignStr(MethodName, maxLen)
    let line1 = `image\t\t${ImageName} @ ${method.class.image.handle}`
    let line2 = `namespace\t${NameSpace.trim().length == 0 ? FM.centerStr("---", maxLen) : NameSpace} @ ${method.class.handle}`
    let line3 = `class\t\t${MethodName} @ ${method.class.handle}`
    let line4 = `methodInfo\t${method.handle} -> ${method.virtualAddress} -> ${method.relativeVirtualAddress}`
    let line5 = `methodName\t${DM(method)}`
    let maxDispLen = Math.max(line1.length, line2.length, line3.length, line4.length, line5.length) + 4
    LOGW(getLine(maxDispLen))
    LOGD(`${line1}\n${line2}\n${line3}\n${line4}\n${line5}`)
    LOGW(getLine(maxDispLen))
}

export const showMethodInfoFromAddress = (mPtr: NativePointer | number = 0) => {
    if (typeof mPtr == "string" && mPtr == 0) return
    if (mPtr instanceof NativePointer && mPtr.isNull()) return
    showMethodInfo(AddressToMethod(checkCmdInput(mPtr)).handle)
}

/**
 * 用包名启动 APK
 * @param {String} pkgName 
 */
const launchApp = (pkgName: string): void => Java.perform(() => {
    let context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext()
    context.startActivity(Java.use("android.content.Intent").$new(context.getPackageManager().getLaunchIntentForPackage(pkgName)));
})

globalThis.bp = (filterName: string, breakMethodInfo: boolean = false) => {
    (printExp(filterName, true, -1, true) as Array<Il2Cpp.Method>)
        .forEach((item: Il2Cpp.Method) => {
            if (!item.virtualAddress.isNull()) breakMethodInfo ? b(item.handle) : Breaker.attachMethod(item)
        })
}

/**
 * 根据一个地址猜测它的上下${num}个函数
 * @param address 函数地址或者是行间地址  < 后续用作解析堆栈函数 >
 */

const functionProbe = (address: NativePointer | number | string, num: number = 5) => {
    const local_ptr: NativePointer = checkCmdInput(address)
    if (local_ptr.isNull()) throw new Error("Address is null")
    let inRange: boolean = Process.findModuleByName("libil2cpp.so")!
        .enumerateRanges("--x")
        .some((item: RangeDetails) => item.base.compare(local_ptr) <= 0 && item.base.add(item.size).compare(local_ptr) >= 0)
    if (!inRange) throw new Error("Address is not in libil2cpp.so (--x)")

    let methodInfo: Il2Cpp.Method | null = tryParseToMethodInfo(local_ptr)

    // methodInfo : startAddress 
    let retArray: Map<string, NativePointer> = new Map()

    if (methodInfo != null) {
        retArray = tryToParse(methodInfo.class.methods.sort((a: Il2Cpp.Method, b: Il2Cpp.Method) => a.virtualAddress.compare(b.virtualAddress)))
    } else {
        if (allMethodsCacheArray.length == 0) cacheMethods()
        retArray = tryToParse(allMethodsCacheArray)
    }

    retArray.set("inputAddress", local_ptr)
    retArray = new Map([...retArray.entries()].sort((a: [string, NativePointer], b: [string, NativePointer]) => a[1].compare(b[1])))

    showResult(retArray)

    function tryParseToMethodInfo(address: NativePointer): Il2Cpp.Method | null {
        try {
            return AddressToMethod(address)
        } catch { return null }
    }

    function tryToParse(methodInfos: Il2Cpp.Method[]): Map<string, NativePointer> {
        let local_ret = new Map<string, NativePointer>()
        methodInfos.some((item: Il2Cpp.Method, index: number, array: Il2Cpp.Method[]) => {
            if (item.virtualAddress.compare(local_ptr) <= 0 && array[index + 1].virtualAddress.compare(local_ptr) >= 0) {
                if (index + num >= array.length) {
                    array.slice(index).forEach((item: Il2Cpp.Method) => local_ret.set(item.name, item.virtualAddress))
                } else {
                    array.slice(index, index + num).forEach((item: Il2Cpp.Method) => local_ret.set(item.name, item.virtualAddress))
                }
                return true
            }
        })
        return local_ret
    }

    function showResult(retArray: Map<string, NativePointer>) {
        let maxLen = 0
        retArray.forEach((_value: NativePointer, key: string) => {
            maxLen = Math.max(maxLen, key.length)
        })
        const line = getLine(maxLen += 0x12)
        LOGW(line)
        retArray.forEach((value: NativePointer, key: string) => {
            let content = `${FM.alignStr(key, maxLen)}${value}`
            key == 'inputAddress' ? LOGE(content) : LOGD(content)
        })
        LOGW(line)
    }
}

export { getApkInfo, launchApp, cacheMethods, findClasses, functionProbe }

globalThis.getApkInfo = getApkInfo

Reflect.set(globalThis, "launchApp", launchApp)
Reflect.set(globalThis, "findMethods", printExp)
Reflect.set(globalThis, "findClasses", findClasses)
Reflect.set(globalThis, "getUnityInfo", getUnityInfo)
Reflect.set(globalThis, "functionProbe", functionProbe)
Reflect.set(globalThis, "AddressToMethod", AddressToMethod)
Reflect.set(globalThis, "AddressToMethodToString", AddressToMethodToShow)
Reflect.set(globalThis, "AddressToMethodNoException", AddressToMethodNoException)
// Reflect.set(globalThis, "showMethodInfoFromAddress", showMethodInfoFromAddress)

declare global {
    var getApkInfo: () => void
    var getUnityInfo: () => void
    var launchApp: (pkgName: string) => void
    var showAddressInfo: (mPtr: NativePointer) => void
    // var showMethodInfoFromAddress: (mPtr: NativePointer) => void
    var bp: (filterName: string, breakMethodInfo?: boolean) => void
    var AddressToMethod: (mPtr: NativePointer | number, withLog?: boolean) => Il2Cpp.Method
    var AddressToMethodNoException: (mPtr: NativePointer, withLog?: boolean) => Il2Cpp.Method | null
    var findMethods: (filter: string, findAll?: boolean, formartMaxLine?: number, retArr?: boolean, accurate?: boolean) => void | Array<Il2Cpp.Method>
    var findClasses: (filterClassName: string, completeMatch?: boolean, retArray?: boolean) => void | Il2Cpp.Class[]
}