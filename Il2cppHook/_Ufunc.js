(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../utils/common");
/**
 * 读取 TMP_TEXT 字符串
 * @param {Number} mPtr TMP_TEXT INSTANCE
 */
var readTMPText = (mPtr) => {
    mPtr = (0, common_1.PTR2NativePtr)(mPtr);
    if (mPtr.isNull())
        return "";
    return "";
    // return callFunctionRUS(find_method("Unity.TextMeshPro", "TMP_Text", "get_text", 0), mPtr)
};
},{"../utils/common":98}],3:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.find_method = exports.HookerBase = void 0;
const decorator_cache_getter_1 = require("decorator-cache-getter");
require("../bridge/fix/Il2cppClass");
const il2cppMethod_1 = require("../bridge/fix/il2cppMethod");
const alloc_1 = require("../utils/alloc");
const enum_1 = require("./enum");
const formart_1 = require("../utils/formart");
class HookerBase {
    constructor() { }
    static get _list_assemblies() {
        return Il2Cpp.Domain.assemblies;
    }
    static get _list_assemblies_names() {
        return HookerBase._list_assemblies.map(item => item.name);
    }
    static get _list_images() {
        return HookerBase._list_assemblies.map((assembly) => assembly.image);
    }
    static get _list_images_pointers() {
        return HookerBase._list_images.map(item => item.handle);
    }
    static get _list_images_names() {
        return HookerBase._list_assemblies.map((assembly) => assembly.image.name.split(".dll")[0]);
    }
    // @cache
    static getMapImagesCacheMap = new Map();
    static getMapImages() {
        if (HookerBase.getMapImagesCacheMap.size != 0)
            return HookerBase.getMapImagesCacheMap;
        HookerBase._list_images_names.forEach((item, index) => HookerBase.getMapImagesCacheMap.set(item, HookerBase._list_images_pointers[index]));
        return HookerBase.getMapImagesCacheMap;
    }
    static get _list_classes() {
        return Il2Cpp.Domain.assemblies.map((assembly) => assembly.image).flatMap((image) => image.classes);
    }
    static showImages(filter = "", sort = true) {
        formart_1.formartClass.printTitile("List Images { assembly -> image -> classCount -> imageName }");
        HookerBase._list_images.filter((image) => {
            return filter != "" ? image.name.indexOf(filter) != -1 : true;
        }).sort((first, secend) => {
            return sort ? (first.name.toLowerCase().charAt(0) > secend.name.toLowerCase().charAt(0) ? 1 : -1) : 0;
        }).forEach((image) => {
            LOGD(`[*] ${image.assembly.handle} -> ${image.handle}\t${image.classCount}\t${image.assembly.name}`);
        });
        if (filter == "") {
            LOGO(getLine(28));
            LOGE(`  List ${HookerBase._list_images.length} Images`);
        }
        LOGO(getLine(85));
    }
    static showClasses(imageOrName, filterNameSpace = "", filterClassName = "") {
        let image;
        if (typeof imageOrName == "string") {
            image = Il2Cpp.Domain.assembly(imageOrName).image;
        }
        else if (typeof imageOrName == "number") {
            image = new Il2Cpp.Image(ptr(imageOrName));
        }
        else if (arguments[0] == undefined) {
            LOGE("imageOrName can not be null");
            return;
        }
        else {
            LOGE("imageOrName must be string or number");
            return;
        }
        let tMap = new Map();
        let countNameSpace = 0;
        let countFilterCls = 0;
        for (let i = 0; i < image.classes.length; i++) {
            let key = "[*] " + image.classes[i].namespace;
            if (tMap.get(key) == undefined) {
                tMap.set(key, new Array());
            }
            tMap.get(key)?.push(image.classes[i]);
        }
        let titleLen = formart_1.formartClass.printTitile("List Classes { namespace {classPtr->filedsCount->methodsCount->enumClass->className} }");
        for (let key of tMap.keys()) {
            let nameSpace = key;
            if (nameSpace != undefined) {
                let array = tMap.get(nameSpace);
                // filterNameSpace 不区分大小写
                if (nameSpace.toLowerCase().indexOf(filterNameSpace.toLowerCase()) == -1)
                    continue;
                ++countNameSpace;
                LOGD(`\n${nameSpace}`);
                array?.forEach((klass) => {
                    // filterClassName 不区分大小写
                    if (klass.name.toLowerCase().indexOf(filterClassName.toLowerCase()) != -1) {
                        ++countFilterCls;
                        LOGD(`\t[-] ${klass.handle} (F:${klass.fields.length}/M:${klass.methods.length}/E:${Number(klass.isEnum)})\t${klass.name}`);
                    }
                });
            }
        }
        LOGO("\n" + getLine(28));
        if (filterNameSpace == "" && filterClassName == "") {
            LOGE(`List ${image.classCount} Classes | Group by ${countNameSpace} NameSpaces`);
        }
        else {
            LOGE(`ALl ${image.classCount} Classes | List ${countFilterCls} Classes | Group by ${countNameSpace} NameSpaces`);
        }
        LOGO(getLine(titleLen));
    }
    static checkType(mPtr) {
        let klass;
        if (mPtr instanceof NativePointer) {
            klass = new Il2Cpp.Class(mPtr);
        }
        else if (typeof mPtr == "string") {
            klass = new Il2Cpp.Class(findClass(mPtr));
        }
        else if (typeof mPtr == "number") {
            klass = new Il2Cpp.Class(ptr(mPtr));
        }
        else {
            throw ("mPtr must be string or number or NativePointer");
        }
        if (klass.handle.equals(ptr(0)))
            throw ("klass handle can not be null");
        return klass;
    }
    static showMethods(mPtr) {
        let klass = HookerBase.checkType(mPtr);
        if (klass.methods.length == 0)
            return;
        formart_1.formartClass.printTitile(`Found ${klass.fields.length} Fields ${klass.isEnum ? "(enum)" : ""} in class: ${klass.name} (${klass.handle})`);
        klass.methods.forEach((method) => {
            LOGD(`[*] ${method.toString()}`);
        });
    }
    static showFields(mPtr) {
        let klass = HookerBase.checkType(mPtr);
        if (klass.fields.length == 0)
            return;
        formart_1.formartClass.printTitile(`Found ${klass.fields.length} Fields ${klass.isEnum ? "(enum) " : ""}in class: ${klass.name} (${klass.handle})`);
        klass.fields.forEach((field) => {
            LOGD(`[*] ${field.handle} ${field.type.name} ${field.toString()} [type:${field.type.class.handle}]`);
        });
        LOGO(``);
    }
    /** 优先从fromAssebly列表中去查找，找不到再查找其他Assebly */
    static map_cache_class = new Map();
    static findClass(searchClassName, fromAssebly = ["Assembly-CSharp", "MaxSdk.Scripts", "mscorlib"]) {
        if (searchClassName == undefined)
            throw ("Search name can not be null or undefined");
        if (typeof searchClassName != "string")
            throw ("findClass need a string value");
        let cache = HookerBase.map_cache_class.get(searchClassName);
        if (cache != undefined)
            return cache.handle;
        let assemblies = Il2Cpp.Domain.assemblies;
        for (let index = 0; index < assemblies.length; index++) {
            if (fromAssebly.includes(assemblies[index].name)) {
                let ret = innerCall(assemblies[index].image.classes);
                if (ret != undefined)
                    return ret.handle;
            }
        }
        for (let index = 0; index < assemblies.length; index++) {
            if (!fromAssebly.includes(assemblies[index].name)) {
                let ret = innerCall(assemblies[index].image.classes);
                if (ret != undefined)
                    return ret.handle;
            }
        }
        function innerCall(kclasses) {
            for (let index = 0; index < kclasses.length; index++)
                if (kclasses[index].name == searchClassName) {
                    HookerBase.map_cache_class.set(searchClassName, kclasses[index]);
                    return kclasses[index];
                }
        }
        return ptr(0);
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
    static findMethodNew(assemblyName, className, methodName, argsCount = -1, overload = [], cmdCall = true) {
        let methodInfo;
        if (arguments[3] != undefined && typeof arguments[3] == "number") {
            try {
                methodInfo = Il2Cpp.Domain.assembly(assemblyName).image.class(className).method(methodName, argsCount);
                if (overload.length != 0)
                    methodInfo = methodInfo?.overload(...overload);
            }
            catch {
                throw new Error(`findMethod failed: Not Found ${methodName}(argCount:${argsCount}) in ${className}`);
            }
        }
        else if (arguments[1] != undefined) {
            methodInfo = new Il2Cpp.Class(findClass(arguments[1])).method(arguments[0], arguments[2]);
        }
        else if (arguments[0] != undefined && arguments[1] == undefined) {
            for (let i = 0; i < HookerBase._list_classes.length; i++) {
                for (let m = 0; m < HookerBase._list_classes[i].methods.length; m++) {
                    if (HookerBase._list_classes[i].methods[m] == arguments[0]) {
                        methodInfo = HookerBase._list_classes[i].methods[m];
                        break;
                    }
                }
            }
        }
        if (methodInfo == undefined)
            throw new Error("Method not found");
        if (cmdCall) {
            showMethodInfo(methodInfo.handle);
        }
        else {
            return methodInfo;
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
    static findMethodsyncCacheMap = new Map();
    static findMethodSync(imageName, className, functionName, argsCount = -1, isRealAddr = true) {
        if (imageName == undefined || className == undefined || functionName == undefined)
            return ptr(0);
        // var corlib = il2cpp_get_corlib()
        const soAddr = Il2Cpp.module.base;
        let cacheKey = imageName + "." + className + "." + functionName + "." + argsCount;
        if (isRealAddr) {
            let cachedPointer = HookerBase.findMethodsyncCacheMap.get(cacheKey);
            if (decorator_cache_getter_1.cache != undefined)
                return cachedPointer;
        }
        let currentlibPack = Il2Cpp.Domain.assembly(imageName).image;
        let currentlib = currentlibPack.handle;
        let klass = Il2Cpp.Api._classFromName(currentlib, (0, alloc_1.allocCStr)(imageName), (0, alloc_1.allocCStr)(className));
        if (klass.isNull()) {
            for (let j = 0; j < Il2Cpp.Api._imageGetClassCount(currentlib); j++) {
                let il2CppClass = new Il2Cpp.Class(Il2Cpp.Api._imageGetClass(currentlib, j));
                if (il2CppClass.name == className) {
                    klass = il2CppClass.handle;
                    break;
                }
            }
        }
        if (klass.isNull())
            return ptr(0);
        let method = Il2Cpp.Api._classGetMethodFromName(klass, (0, alloc_1.allocCStr)(functionName), argsCount);
        if (method.isNull())
            return ptr(0);
        if (arguments[5] != undefined && arguments[5] != 2) {
            return method;
        }
        else if (arguments[5] != undefined && arguments[5] == 2) {
            return method.readPointer().sub(soAddr);
        }
        HookerBase.findMethodsyncCacheMap.set(cacheKey, method.readPointer());
        if (isRealAddr)
            return isRealAddr ? method.readPointer() : method.readPointer().sub(soAddr);
        let il2cppMethod = new Il2Cpp.Method(method);
        let parameters_count = il2cppMethod.parameterCount;
        let arr_args = new Array();
        let arr_args_type_addr = new Array();
        for (let i = 0; i < parameters_count; i++) {
            let currentParamter = il2cppMethod.parameters[i];
            let typeClass = currentParamter.type.class.handle;
            let TypeName = currentParamter.type.class.name;
            arr_args.push(TypeName + " " + currentParamter.name);
            arr_args_type_addr.push(TypeName + " " + typeClass);
        }
        let disStr = (0, il2cppMethod_1.getMethodModifier)(method) + il2cppMethod.returnType.name + " " +
            il2cppMethod.name + " " +
            "(" + arr_args + ")" + "\t";
        LOGO(getLine(85));
        LOG(imageName + "." + className + "\t" + disStr, enum_1.LogColor.RED);
        LOGO(getLine(30));
        let ShowMore = false;
        LOG("Il2CppImage\t---->\t" + currentlib + (ShowMore ? " (" + currentlib.add(p_size).readPointer().readCString() + ")" : ""));
        LOG("Il2CppClass\t---->\t" + klass + (ShowMore ? " (" + Il2Cpp.Api._classGetName(klass) + ")" : ""));
        LOG("MethodInfo\t---->\t" + method + (ShowMore ? " (" + Il2Cpp.Api._classGetName(method) + ")" : ""));
        LOGD("methodPointer\t---->\t" + method.readPointer() + "\t===>\t" + method.readPointer().sub(soAddr));
        LOGO(getLine(85));
    }
}
__decorate([
    decorator_cache_getter_1.cache
], HookerBase, "_list_assemblies", null);
__decorate([
    decorator_cache_getter_1.cache
], HookerBase, "_list_assemblies_names", null);
__decorate([
    decorator_cache_getter_1.cache
], HookerBase, "_list_images", null);
__decorate([
    decorator_cache_getter_1.cache
], HookerBase, "_list_images_pointers", null);
__decorate([
    decorator_cache_getter_1.cache
], HookerBase, "_list_images_names", null);
__decorate([
    decorator_cache_getter_1.cache
], HookerBase, "_list_classes", null);
exports.HookerBase = HookerBase;
const find_method = HookerBase.findMethodSync;
exports.find_method = find_method;
Reflect.set(globalThis, "Hooker", HookerBase);
globalThis.i = HookerBase.showImages;
globalThis.c = HookerBase.showClasses;
globalThis.m = HookerBase.showMethods;
globalThis.f = HookerBase.showFields;
globalThis.fc = HookerBase.findClass;
globalThis.findClass = HookerBase.findClass;
globalThis.findMethod = HookerBase.findMethodNew;
globalThis.find_method = HookerBase.findMethodSync;
globalThis.af = (className) => B(findClass(className));
globalThis.aui = () => B("AUI");
Il2Cpp.perform(() => globalThis.soAddr = Il2Cpp.module.base);
},{"../bridge/fix/Il2cppClass":10,"../bridge/fix/il2cppMethod":12,"../utils/alloc":94,"../utils/formart":100,"./enum":5,"decorator-cache-getter":105}],4:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Breaker = void 0;
const fastest_levenshtein_1 = require("fastest-levenshtein");
const il2cppMethod_1 = require("../bridge/fix/il2cppMethod");
const formart_1 = require("../utils/formart");
const base_1 = require("./base");
const valueResolve_1 = __importDefault(require("./valueResolve"));
class Breaker {
    static maxCallTimes = 10; // 出现 ${maxCallTimes} 次后不再显示
    static detachTimes = 500; // 出现 ${detachTimes} 次后取消 hook
    static map_attachedMethodInfos = new Map();
    static map_methodInfo_callTimes = new Map();
    static array_methodInfo_detached = new Array();
    static array_attach_failed = new Array();
    static array_methodValue_cache = new Array(); // 日志相关,记录参数
    // private static array_log_cache: Map<string, [string, NativePointer[], NativePointer]> = new Map()
    static addBreakPoint(imgOrClsPtr = "CommonClass") {
        if (imgOrClsPtr instanceof NativePointer) {
            innerImage(imgOrClsPtr);
        }
        else if (typeof imgOrClsPtr == "number") {
            innerImage(ptr(imgOrClsPtr));
        }
        else if (typeof imgOrClsPtr == "string") {
            if (imgOrClsPtr == "CommonClass" || imgOrClsPtr == "JNI" || imgOrClsPtr == "Soon")
                return checkSpecialClass(imgOrClsPtr);
            // is ImageName or className
            if (base_1.HookerBase._list_images_names.toString().includes(imgOrClsPtr)) { // is ImageName.dll / assemblyName
                // ImageName
                base_1.HookerBase._list_images.forEach((image) => {
                    if (image.name.includes(imgOrClsPtr)) {
                        formart_1.formartClass.printTitile("Found : ImageName: " + imgOrClsPtr + " at " + image.handle);
                        innerImage(image.handle);
                    }
                });
            }
            else {
                // className
                let clsPtr = findClass(imgOrClsPtr);
                if (!clsPtr.isNull()) {
                    formart_1.formartClass.printTitile("Found : ClassName: " + imgOrClsPtr + " at " + clsPtr);
                    innerImage(clsPtr);
                }
                else {
                    let imageName = (0, fastest_levenshtein_1.closest)(imgOrClsPtr, base_1.HookerBase._list_images_names);
                    LOGE(`You mean this ? ${imageName} @ ${Il2Cpp.Domain.assemblies.filter(item => item.name.includes)[0].handle}`);
                }
            }
        }
        function innerImage(imgOrClsPtr) {
            let lastSize = Breaker.map_attachedMethodInfos.size;
            if (imgOrClsPtr.isNull())
                throw new Error("can't attach nullptr");
            if (base_1.HookerBase._list_images_pointers.map(item => Number(item)).includes(Number(imgOrClsPtr))) {
                let imageHandle = imgOrClsPtr;
                new Il2Cpp.Image(imageHandle).classes
                    .flatMap(cls => cls.methods)
                    .forEach(Breaker.attachMethod);
            }
            else {
                let classHandle = imgOrClsPtr;
                new Il2Cpp.Class(classHandle).methods
                    .forEach(Breaker.attachMethod);
            }
            LOGO(`${getLine(40, "-")}\n Attached ${Breaker.map_attachedMethodInfos.size - lastSize} methods / All ${Breaker.map_attachedMethodInfos.size} methods\n${getLine(85, "-")}`);
        }
        function checkSpecialClass(type) {
            if (type == "CommonClass") {
                let CommonClass = ["Assembly-CSharp", "MaxSdk.Scripts", "Game", "Zenject", "UniRx", "Purchasing.Common", "UnityEngine.Purchasing"];
                base_1.HookerBase._list_images.forEach((image) => {
                    if (CommonClass.includes(image.assembly.name)) {
                        formart_1.formartClass.printTitile("Found : ImageName: " + image.name + " at " + image.handle);
                        innerImage(image.handle);
                    }
                });
            }
            else if (type == "JNI") {
                let clsTmp = Il2Cpp.Domain.assembly("UnityEngine.AndroidJNIModule").image.class("UnityEngine.AndroidJNI");
                if (clsTmp.isNull())
                    throw new Error("can't find class UnityEngine.AndroidJNI");
                formart_1.formartClass.printTitile("Found : ClassName: " + clsTmp.name + " at " + clsTmp.handle);
                innerImage(clsTmp.handle);
                // innerImage(Il2Cpp.Domain.assembly("UnityEngine.AndroidJNIModule").image.class("UnityEngine.AndroidJNIHelper").handle)
            }
            else if ("AUI") {
                B("UnityEngine.UI");
                setTimeout(() => h("Update"), 3000);
            }
            else if (type == "Soon") {
                //todo others
            }
            else {
                throw new Error("checkSpecialClass : type error");
            }
        }
    }
    static attachMethod(method) {
        attachMethodInner(method);
        function attachMethodInner(method, filterModifier = "all") {
            if (filterModifier == "all") {
                if (!(0, il2cppMethod_1.getMethodModifier)(method).includes("abstract") && !method.virtualAddress.isNull())
                    Breaker.attachMethodInfo(method);
            }
            else {
                if (!(0, il2cppMethod_1.getMethodModifier)(method).includes(filterModifier))
                    return;
                if (!method.virtualAddress.isNull())
                    Breaker.attachMethodInfo(method);
            }
        }
    }
    static callTimesInline = 0;
    static attachMethodInfo(method, moreInfo = false) {
        if (method.virtualAddress.isNull()) {
            LOGE((0, il2cppMethod_1.methodToString)(method));
            return;
        }
        if (Breaker.map_attachedMethodInfos.has(method))
            return;
        try {
            let handleFunc = Interceptor.attach(method.virtualAddress, {
                onEnter: function (args) {
                    if (!Breaker.needShowLOG(method, "onEnter"))
                        return;
                    if (!moreInfo) {
                        // 精简版 B() 针对单个classes/Images
                        let cacheID = `[${++Breaker.callTimesInline}|${new Date().toLocaleTimeString().split(" ")[0]}]`;
                        this.passValue = new valueResolve_1.default(cacheID, method).setArgs(args);
                        return LOGD(this.passValue.toString());
                    }
                    else {
                        // 详细版 b() 针对单个函数
                        let tmp_content = [];
                        if (!method.isStatic) {
                            // 非static方法
                            tmp_content[0] = `  inst\t| \t\t\t${args[0]}\t\t[ ${valueResolve_1.default.fakeValue(args[0], new Il2Cpp.Type(ptr(1)), method)} ] ( ${method.class.handle} )`;
                            for (let index = 1; index < method.parameterCount + 1; ++index) {
                                let start = `  arg${index}  | `;
                                let mid = `${method.parameters[index - 1].name}\t--->\t\t${formart_1.formartClass.getPtrFormart(args[index])}\t\t`;
                                let end = `${method.parameters[index - 1].type.name} (${method.parameters[index - 1].type.class.handle})`;
                                let res = `\t ${valueResolve_1.default.fakeValue(args[index], method.parameters[index - 1].type, method)}`;
                                tmp_content[tmp_content.length] = `${start}${mid}${end}${res}`;
                            }
                        }
                        else {
                            // static方法
                            for (let index = 0; index < method.parameterCount; ++index) {
                                let start = `  arg${index}  | `;
                                let mid = `${method.parameters[index].name}\t--->\t\t${formart_1.formartClass.getPtrFormart(args[index])}\t\t`;
                                let end = `${method.parameters[index].type.name} (${method.parameters[index].type.class.handle})\t `;
                                let res = `${valueResolve_1.default.fakeValue(args[index], method.parameters[index].type, method)}`;
                                tmp_content[tmp_content.length] = `${start}${mid}${end}${res}`;
                            }
                        }
                        this.content = tmp_content;
                        let classTitle = `${method.class.namespace}.${method.class.name}`;
                        let disptitle = `${classTitle} | ${(0, il2cppMethod_1.methodToString)(method, true)}\t [${method.handle} -> ${method.virtualAddress} -> ${method.relativeVirtualAddress}] | ${new Date().toLocaleTimeString().split(" ")[0]}`;
                        this.disp_title = disptitle;
                    }
                },
                onLeave: function (retval) {
                    if (!Breaker.needShowLOG(method, "onLeave"))
                        return;
                    if (!moreInfo && this.passValue != undefined) {
                        Breaker.array_methodValue_cache.push(this.passValue.setRetval(retval));
                    }
                    if (this.content == null || this.disp_title == null)
                        return;
                    let start = `  ret\t| `;
                    let mid = `\t\t\t${formart_1.formartClass.getPtrFormart(retval)}\t\t`;
                    let end = `${method.returnType.name} (${method.returnType.class.handle})\t `;
                    let res = `${new valueResolve_1.default("", method).setRetval(retval).resolve(-1)}`;
                    this.content[this.content.length] = `${start}${mid}${end}${res}`;
                    let lenMex = Math.max(...this.content.map(item => item.length), this.disp_title.length);
                    LOGO(`\n${getLine(lenMex)}`);
                    LOGD(this.disp_title);
                    LOGO(getLine(this.disp_title.length / 3));
                    this.content.forEach(LOGD);
                    LOGO(getLine(lenMex));
                }
            });
            LOGD((0, il2cppMethod_1.methodToString)(method));
            Breaker.map_attachedMethodInfos.set(method, handleFunc);
        }
        catch (error) {
            catchError(method);
        }
        function catchError(method) {
            LOGE((0, il2cppMethod_1.methodToString)(method));
            if (Process.arch == "arm") {
                let ins = method.virtualAddress.readPointer();
                if (ins != null && ins.equals(0xE12FFF1E))
                    showErrorLog(ins);
            }
            else if (Process.arch == "arm64") {
                let ins = method.virtualAddress.readPointer();
                if (ins != null && ins.equals(0xC0035FD6))
                    showErrorLog(ins);
            }
            else {
                Breaker.array_attach_failed.push(method);
                printCtx(method.relativeVirtualAddress, 1, 1, LogColor.WHITE, 1);
            }
            function showErrorLog(ins, error = "\tMethod null implementation or attach by other intercepter") {
                LOGE(`\t${method.virtualAddress} -> ${ins} -> ${ins.toMatchPattern()} `);
                LOGE(error);
            }
        }
    }
    static needShowLOG = (method, enterType = "onEnter") => {
        // LOGD("needShowLOG : " + enterType + " " + Breaker.attathing)
        if (method instanceof Il2Cpp.Method) {
            if (!Breaker.map_methodInfo_callTimes.has(method))
                Breaker.map_methodInfo_callTimes.set(method, 0);
            let times = Breaker.map_methodInfo_callTimes.get(method);
            if (times === undefined || times === null)
                times = 0;
            if (times >= Breaker.detachTimes) {
                Breaker.map_attachedMethodInfos.get(method).detach();
                Breaker.array_methodInfo_detached.push(method);
            }
            if (enterType === "onEnter")
                Breaker.map_methodInfo_callTimes.set(method, times + 1);
            return times < Breaker.maxCallTimes;
        }
        else {
            throw new Error("method must be Il2Cpp.Method");
        }
    };
    static breakWithArgs = (mPtr, argCount = 4) => {
        mPtr = checkPointer(mPtr);
        Interceptor.attach(mPtr, {
            onEnter(args) {
                LOGO("\n" + getLine(65));
                LOGH("Called from " + mPtr + " ---> " + mPtr.sub(soAddr) + "\t|  LR : " + checkCtx(getPlatformCtx(this.context).lr) + "\n");
                let tStr = String(args[0]);
                for (let t = 1; t < argCount; ++t)
                    tStr += "\t" + args[t];
                LOGD(tStr);
            },
            onLeave(retval) {
                LOGD("End Function return ---> " + retval);
            },
        });
    };
    static breakWithStack = (mPtr) => {
        mPtr = checkPointer(mPtr);
        Interceptor.attach(mPtr, {
            onEnter(args) {
                LOGO("\n" + getLine(65));
                LOGH("Called from " + mPtr + " ---> " + mPtr.sub(soAddr) + "\t|  LR : " + checkCtx(getPlatformCtx(this.context).lr) + "\n");
                PrintStackTraceN(this.context);
                LOGO("\n" + getLine(65));
            }
        });
    };
    static breakInline = (mPtr, maxCount = 20) => {
        if (maxCount == undefined)
            maxCount = 10;
        mPtr = checkPointer(mPtr);
        Interceptor.attach(mPtr, {
            onEnter(args) {
                LOGO("\n" + getLine(65));
                LOGH("Called from " + mPtr + " ---> " + mPtr.sub(soAddr) + "\n");
                LOGD(JSON.stringify(this.context));
            }
        });
    };
    static clearBreak = () => {
        d();
        Breaker.map_attachedMethodInfos.clear();
        Breaker.map_methodInfo_callTimes.clear();
        Breaker.array_methodInfo_detached = [];
    };
    static clearBreakAll = () => {
        Breaker.clearBreak();
        Breaker.array_methodValue_cache = [];
        Breaker.array_attach_failed = [];
    };
    static printDesertedMethods = (filterName = "") => {
        if (Breaker.map_methodInfo_callTimes.size == 0)
            return;
        let title = `${getLine(20)} detached methods ${getLine(20)}`;
        let countHideFunctions = 0;
        LOG(`${title}`, LogColor.C92);
        // 筛选 Breaker.map_methodInfo_callTimes 调用次数大雨 maxCallTimes 的方法
        Breaker.map_methodInfo_callTimes.forEach((value, key) => {
            if (value >= Breaker.maxCallTimes) {
                if (filterName == "" || key.name.indexOf(filterName) != -1) {
                    let arr = methodToArray(key);
                    let times = this.map_methodInfo_callTimes.get(key);
                    ++countHideFunctions;
                    LOGD(`[*] ${arr[0]} ---> ${arr[1]} ${arr[2]}\t\t${times}\t${arr[3]}`);
                }
            }
        });
        LOG(`${getLine(20)}`, LogColor.C92);
        LOGD(` ${Breaker.map_attachedMethodInfos.size} attached / ${Breaker.array_methodInfo_detached.length} detached / ${countHideFunctions} hidden`);
        LOG(getLine(title.length), LogColor.C92);
    };
    static printHistoryLog = (filterStr = "", countLogs = 50, reverse = false, detachAll = true) => {
        if (detachAll)
            D();
        // attathing = true
        if (typeof filterStr == "number") {
            countLogs = filterStr;
            filterStr = "";
        }
        let filterArray = Breaker.array_methodValue_cache
            .map((value) => value.toString())
            .filter((value) => value.includes(filterStr))
            .slice(0, countLogs);
        if (reverse)
            filterArray.reverse();
        filterArray.forEach(LOGD);
    };
}
exports.Breaker = Breaker;
globalThis.getPlatform = () => (Process.platform == "linux" && Process.pageSize == 0x4) ? "arm" : "arm64";
globalThis.getPlatformCtx = (ctx) => getPlatform() == "arm" ? ctx : ctx;
globalThis.maxCallTimes = Breaker.maxCallTimes;
globalThis.D = Breaker.clearBreak;
globalThis.DD = Breaker.clearBreakAll;
globalThis.B = Breaker.addBreakPoint;
globalThis.h = Breaker.printHistoryLog;
globalThis.b = (mPtr) => {
    if (typeof mPtr == "number")
        mPtr = ptr(mPtr);
    try {
        new Il2Cpp.Method(mPtr).name; // 用报错来判断是method指针还是一个普通的地址
        if (mPtr instanceof Il2Cpp.Method)
            return Breaker.attachMethodInfo(mPtr, true);
        Breaker.attachMethodInfo(new Il2Cpp.Method(mPtr), true);
    }
    catch (error) {
        Breaker.breakWithArgs(mPtr);
    }
};
globalThis.printDesertedMethods = Breaker.printDesertedMethods;
},{"../bridge/fix/il2cppMethod":12,"../utils/formart":100,"./base":3,"./valueResolve":8,"fastest-levenshtein":106}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADS_TYPE = exports.LogColor = exports.FieldAccess = exports.il2cppTabledefs = exports.ArrKAY = exports.MapKAY = exports.GKEY = exports.EpFunc = exports.TYPE_STR = void 0;
var TYPE_STR;
(function (TYPE_STR) {
    TYPE_STR[TYPE_STR["U_STR"] = 0] = "U_STR";
    TYPE_STR[TYPE_STR["C_STR"] = 1] = "C_STR";
})(TYPE_STR = exports.TYPE_STR || (exports.TYPE_STR = {}));
// ExportFunctions
var EpFunc;
(function (EpFunc) {
    EpFunc[EpFunc["il2cpp_get_corlib"] = 0] = "il2cpp_get_corlib";
    EpFunc[EpFunc["il2cpp_domain_get"] = 1] = "il2cpp_domain_get";
    EpFunc[EpFunc["il2cpp_domain_get_assemblies"] = 2] = "il2cpp_domain_get_assemblies";
    EpFunc[EpFunc["il2cpp_assembly_get_image"] = 3] = "il2cpp_assembly_get_image";
    EpFunc[EpFunc["il2cpp_image_get_class_count"] = 4] = "il2cpp_image_get_class_count";
    EpFunc[EpFunc["il2cpp_image_get_class"] = 5] = "il2cpp_image_get_class";
    EpFunc[EpFunc["il2cpp_class_get_methods"] = 6] = "il2cpp_class_get_methods";
    EpFunc[EpFunc["il2cpp_class_from_type"] = 7] = "il2cpp_class_from_type";
    EpFunc[EpFunc["il2cpp_class_get_type"] = 8] = "il2cpp_class_get_type";
    EpFunc[EpFunc["il2cpp_class_from_system_type"] = 9] = "il2cpp_class_from_system_type";
    EpFunc[EpFunc["il2cpp_class_from_name"] = 10] = "il2cpp_class_from_name";
    EpFunc[EpFunc["il2cpp_class_get_method_from_name"] = 11] = "il2cpp_class_get_method_from_name";
    EpFunc[EpFunc["il2cpp_string_new"] = 12] = "il2cpp_string_new";
    EpFunc[EpFunc["il2cpp_type_get_name"] = 13] = "il2cpp_type_get_name";
    EpFunc[EpFunc["il2cpp_type_get_class_or_element_class"] = 14] = "il2cpp_type_get_class_or_element_class";
    EpFunc[EpFunc["il2cpp_class_get_field_from_name"] = 15] = "il2cpp_class_get_field_from_name";
    EpFunc[EpFunc["il2cpp_class_num_fields"] = 16] = "il2cpp_class_num_fields";
    EpFunc[EpFunc["il2cpp_class_get_fields"] = 17] = "il2cpp_class_get_fields";
    EpFunc[EpFunc["il2cpp_field_static_get_value"] = 18] = "il2cpp_field_static_get_value";
    EpFunc[EpFunc["il2cpp_field_static_set_value"] = 19] = "il2cpp_field_static_set_value";
    EpFunc[EpFunc["getName"] = 20] = "getName";
    EpFunc[EpFunc["getLayer"] = 21] = "getLayer";
    EpFunc[EpFunc["getTransform"] = 22] = "getTransform";
    EpFunc[EpFunc["getParent"] = 23] = "getParent";
    EpFunc[EpFunc["getChildCount"] = 24] = "getChildCount";
    EpFunc[EpFunc["getChild"] = 25] = "getChild";
    EpFunc[EpFunc["get_pointerEnter"] = 26] = "get_pointerEnter";
    EpFunc[EpFunc["pthread_create"] = 27] = "pthread_create";
    EpFunc[EpFunc["getpid"] = 28] = "getpid";
    EpFunc[EpFunc["gettid"] = 29] = "gettid";
    EpFunc[EpFunc["sleep"] = 30] = "sleep";
    EpFunc[EpFunc["DecodeJObject"] = 31] = "DecodeJObject";
    EpFunc[EpFunc["GetDescriptor"] = 32] = "GetDescriptor";
    EpFunc[EpFunc["ArtCurrent"] = 33] = "ArtCurrent";
    EpFunc[EpFunc["newThreadCallBack"] = 34] = "newThreadCallBack";
})(EpFunc = exports.EpFunc || (exports.EpFunc = {}));
var GKEY;
(function (GKEY) {
    // 格式化展示使用到 let lastTime = 0
    // 不要LOG的时候值为false，需要时候true let LogFlag = true
    // count_method_times 数组用于记录 breakPoints 中方法出现的次数,index是基于临时变量 t_arrayAddr，而不是 arrayAddr  var count_method_times
    // 断点的函数出现次数大于 maxCallTime 即不显示 var maxCallTime = 10
    // let LshowLOG = true | let newThreadDelay = 0
    GKEY[GKEY["soName"] = 0] = "soName";
    GKEY[GKEY["soAddr"] = 1] = "soAddr";
    GKEY[GKEY["p_size"] = 2] = "p_size";
    GKEY[GKEY["lastTime"] = 3] = "lastTime";
    GKEY[GKEY["LogFlag"] = 4] = "LogFlag";
    GKEY[GKEY["count_method_times"] = 5] = "count_method_times";
    GKEY[GKEY["maxCallTime"] = 6] = "maxCallTime";
    GKEY[GKEY["LshowLOG"] = 7] = "LshowLOG";
    GKEY[GKEY["newThreadDelay"] = 8] = "newThreadDelay";
    GKEY[GKEY["frida_env"] = 9] = "frida_env";
})(GKEY = exports.GKEY || (exports.GKEY = {}));
// map key
var MapKAY;
(function (MapKAY) {
    // map_attach_listener      用来记录已经被 Attach  的函数Listener
    // map_find_class_cache     find_class 的缓存
    // outFilterMap             filterDuplicateOBJ
    // CommonCache 通用缓存      目前暂时只用来缓存 Text
    MapKAY[MapKAY["map_attach_listener"] = 0] = "map_attach_listener";
    MapKAY[MapKAY["map_find_class_cache"] = 1] = "map_find_class_cache";
    MapKAY[MapKAY["map_find_method_cache"] = 2] = "map_find_method_cache";
    MapKAY[MapKAY["outFilterMap"] = 3] = "outFilterMap";
    MapKAY[MapKAY["CommonCache"] = 4] = "CommonCache";
})(MapKAY = exports.MapKAY || (exports.MapKAY = {}));
//array key
var ArrKAY;
(function (ArrKAY) {
    // arr_img_addr
    // arr_img_names    存放初始化（list_Images）时候的 imgAddr 以及 imgName
    // findClassCache   第二次使用findClass的缓存
    // arr_nop_addr     用来记录已经被 replace 的函数地址
    // arr_runtimeType  用来记录运行时类型
    // findMethodArray  只存在于B时候的临时变量，用来记录需要断点的方法地址并方便 b 移除，避免重复显示
    // t_arrayAddr      过滤 只显示指定ClassName下的Methods filterClass.push("clsName") //即可开启过滤clsName
    // filterClass      clsName 如果显示不全可以使用 getClassName(ptr) 得到全名，不用过滤的时候置空这个array即可
    // arrMethodInfo    存放MethodInfo指针（供动态断点 a() 提供更详细的信息）
    ArrKAY[ArrKAY["arr_img_addr"] = 0] = "arr_img_addr";
    ArrKAY[ArrKAY["arr_img_names"] = 1] = "arr_img_names";
    ArrKAY[ArrKAY["findClassCache"] = 2] = "findClassCache";
    ArrKAY[ArrKAY["arr_nop_addr"] = 3] = "arr_nop_addr";
    ArrKAY[ArrKAY["arr_runtimeType"] = 4] = "arr_runtimeType";
    ArrKAY[ArrKAY["findMethodArray"] = 5] = "findMethodArray";
    ArrKAY[ArrKAY["t_arrayAddr"] = 6] = "t_arrayAddr";
    ArrKAY[ArrKAY["filterClass"] = 7] = "filterClass";
    ArrKAY[ArrKAY["arrMethodInfo"] = 8] = "arrMethodInfo";
    ArrKAY[ArrKAY["arrayAddr"] = 9] = "arrayAddr";
    ArrKAY[ArrKAY["arrayName"] = 10] = "arrayName";
})(ArrKAY = exports.ArrKAY || (exports.ArrKAY = {}));
var il2cppTabledefs;
(function (il2cppTabledefs) {
    il2cppTabledefs[il2cppTabledefs["METHOD_ATTRIBUTE_MEMBER_ACCESS_MASK"] = 7] = "METHOD_ATTRIBUTE_MEMBER_ACCESS_MASK";
    il2cppTabledefs[il2cppTabledefs["METHOD_ATTRIBUTE_COMPILER_CONTROLLED"] = 0] = "METHOD_ATTRIBUTE_COMPILER_CONTROLLED";
    il2cppTabledefs[il2cppTabledefs["METHOD_ATTRIBUTE_PRIVATE"] = 1] = "METHOD_ATTRIBUTE_PRIVATE";
    il2cppTabledefs[il2cppTabledefs["METHOD_ATTRIBUTE_FAM_AND_ASSEM"] = 2] = "METHOD_ATTRIBUTE_FAM_AND_ASSEM";
    il2cppTabledefs[il2cppTabledefs["METHOD_ATTRIBUTE_ASSEM"] = 3] = "METHOD_ATTRIBUTE_ASSEM";
    il2cppTabledefs[il2cppTabledefs["METHOD_ATTRIBUTE_FAMILY"] = 4] = "METHOD_ATTRIBUTE_FAMILY";
    il2cppTabledefs[il2cppTabledefs["METHOD_ATTRIBUTE_FAM_OR_ASSEM"] = 5] = "METHOD_ATTRIBUTE_FAM_OR_ASSEM";
    il2cppTabledefs[il2cppTabledefs["METHOD_ATTRIBUTE_PUBLIC"] = 6] = "METHOD_ATTRIBUTE_PUBLIC";
    il2cppTabledefs[il2cppTabledefs["METHOD_ATTRIBUTE_STATIC"] = 16] = "METHOD_ATTRIBUTE_STATIC";
    il2cppTabledefs[il2cppTabledefs["METHOD_ATTRIBUTE_FINAL"] = 32] = "METHOD_ATTRIBUTE_FINAL";
    il2cppTabledefs[il2cppTabledefs["METHOD_ATTRIBUTE_VIRTUAL"] = 64] = "METHOD_ATTRIBUTE_VIRTUAL";
    il2cppTabledefs[il2cppTabledefs["METHOD_ATTRIBUTE_ABSTRACT"] = 1024] = "METHOD_ATTRIBUTE_ABSTRACT";
    il2cppTabledefs[il2cppTabledefs["METHOD_ATTRIBUTE_PINVOKE_IMPL"] = 8192] = "METHOD_ATTRIBUTE_PINVOKE_IMPL";
    il2cppTabledefs[il2cppTabledefs["METHOD_ATTRIBUTE_VTABLE_LAYOUT_MASK"] = 256] = "METHOD_ATTRIBUTE_VTABLE_LAYOUT_MASK";
    il2cppTabledefs[il2cppTabledefs["METHOD_ATTRIBUTE_REUSE_SLOT"] = 0] = "METHOD_ATTRIBUTE_REUSE_SLOT";
    il2cppTabledefs[il2cppTabledefs["METHOD_ATTRIBUTE_NEW_SLOT"] = 256] = "METHOD_ATTRIBUTE_NEW_SLOT";
})(il2cppTabledefs = exports.il2cppTabledefs || (exports.il2cppTabledefs = {}));
var FieldAccess;
(function (FieldAccess) {
    FieldAccess[FieldAccess["FIELD_ATTRIBUTE_FIELD_ACCESS_MASK"] = 7] = "FIELD_ATTRIBUTE_FIELD_ACCESS_MASK";
    FieldAccess[FieldAccess["FIELD_ATTRIBUTE_COMPILER_CONTROLLED"] = 0] = "FIELD_ATTRIBUTE_COMPILER_CONTROLLED";
    FieldAccess[FieldAccess["FIELD_ATTRIBUTE_PRIVATE"] = 1] = "FIELD_ATTRIBUTE_PRIVATE";
    FieldAccess[FieldAccess["FIELD_ATTRIBUTE_FAM_AND_ASSEM"] = 2] = "FIELD_ATTRIBUTE_FAM_AND_ASSEM";
    FieldAccess[FieldAccess["FIELD_ATTRIBUTE_ASSEMBLY"] = 3] = "FIELD_ATTRIBUTE_ASSEMBLY";
    FieldAccess[FieldAccess["FIELD_ATTRIBUTE_FAMILY"] = 4] = "FIELD_ATTRIBUTE_FAMILY";
    FieldAccess[FieldAccess["FIELD_ATTRIBUTE_FAM_OR_ASSEM"] = 5] = "FIELD_ATTRIBUTE_FAM_OR_ASSEM";
    FieldAccess[FieldAccess["FIELD_ATTRIBUTE_PUBLIC"] = 6] = "FIELD_ATTRIBUTE_PUBLIC";
    FieldAccess[FieldAccess["FIELD_ATTRIBUTE_STATIC"] = 16] = "FIELD_ATTRIBUTE_STATIC";
    FieldAccess[FieldAccess["FIELD_ATTRIBUTE_INIT_ONLY"] = 32] = "FIELD_ATTRIBUTE_INIT_ONLY";
    FieldAccess[FieldAccess["FIELD_ATTRIBUTE_LITERAL"] = 64] = "FIELD_ATTRIBUTE_LITERAL";
    FieldAccess[FieldAccess["FIELD_ATTRIBUTE_NOT_SERIALIZED"] = 128] = "FIELD_ATTRIBUTE_NOT_SERIALIZED";
    FieldAccess[FieldAccess["FIELD_ATTRIBUTE_SPECIAL_NAME"] = 512] = "FIELD_ATTRIBUTE_SPECIAL_NAME";
    FieldAccess[FieldAccess["FIELD_ATTRIBUTE_PINVOKE_IMPL"] = 8192] = "FIELD_ATTRIBUTE_PINVOKE_IMPL";
    FieldAccess[FieldAccess["FIELD_ATTRIBUTE_RESERVED_MASK"] = 38144] = "FIELD_ATTRIBUTE_RESERVED_MASK";
    FieldAccess[FieldAccess["FIELD_ATTRIBUTE_RT_SPECIAL_NAME"] = 1024] = "FIELD_ATTRIBUTE_RT_SPECIAL_NAME";
    FieldAccess[FieldAccess["FIELD_ATTRIBUTE_HAS_FIELD_MARSHAL"] = 4096] = "FIELD_ATTRIBUTE_HAS_FIELD_MARSHAL";
    FieldAccess[FieldAccess["FIELD_ATTRIBUTE_HAS_DEFAULT"] = 32768] = "FIELD_ATTRIBUTE_HAS_DEFAULT";
    FieldAccess[FieldAccess["FIELD_ATTRIBUTE_HAS_FIELD_RVA"] = 256] = "FIELD_ATTRIBUTE_HAS_FIELD_RVA";
})(FieldAccess = exports.FieldAccess || (exports.FieldAccess = {}));
var LogColor;
(function (LogColor) {
    LogColor[LogColor["WHITE"] = 0] = "WHITE";
    LogColor[LogColor["RED"] = 1] = "RED";
    LogColor[LogColor["YELLOW"] = 3] = "YELLOW";
    LogColor[LogColor["C31"] = 31] = "C31";
    LogColor[LogColor["C32"] = 32] = "C32";
    LogColor[LogColor["C33"] = 33] = "C33";
    LogColor[LogColor["C34"] = 34] = "C34";
    LogColor[LogColor["C35"] = 35] = "C35";
    LogColor[LogColor["C36"] = 36] = "C36";
    LogColor[LogColor["C41"] = 41] = "C41";
    LogColor[LogColor["C42"] = 42] = "C42";
    LogColor[LogColor["C43"] = 43] = "C43";
    LogColor[LogColor["C44"] = 44] = "C44";
    LogColor[LogColor["C45"] = 45] = "C45";
    LogColor[LogColor["C46"] = 46] = "C46";
    LogColor[LogColor["C90"] = 90] = "C90";
    LogColor[LogColor["C91"] = 91] = "C91";
    LogColor[LogColor["C92"] = 92] = "C92";
    LogColor[LogColor["C93"] = 93] = "C93";
    LogColor[LogColor["C94"] = 94] = "C94";
    LogColor[LogColor["C95"] = 95] = "C95";
    LogColor[LogColor["C96"] = 96] = "C96";
    LogColor[LogColor["C97"] = 97] = "C97";
    LogColor[LogColor["C100"] = 100] = "C100";
    LogColor[LogColor["C101"] = 101] = "C101";
    LogColor[LogColor["C102"] = 102] = "C102";
    LogColor[LogColor["C103"] = 103] = "C103";
    LogColor[LogColor["C104"] = 104] = "C104";
    LogColor[LogColor["C105"] = 105] = "C105";
    LogColor[LogColor["C106"] = 106] = "C106";
    LogColor[LogColor["C107"] = 107] = "C107";
})(LogColor = exports.LogColor || (exports.LogColor = {}));
var ADS_TYPE;
(function (ADS_TYPE) {
    ADS_TYPE[ADS_TYPE["IronSource"] = 0] = "IronSource";
    ADS_TYPE[ADS_TYPE["MaxSdkCallbacks"] = 1] = "MaxSdkCallbacks";
    ADS_TYPE[ADS_TYPE["MoPubManager"] = 2] = "MoPubManager";
    ADS_TYPE[ADS_TYPE["TTPluginsGameObject"] = 3] = "TTPluginsGameObject";
})(ADS_TYPE = exports.ADS_TYPE || (exports.ADS_TYPE = {}));
// (NativePointer as any).prototype.callFunction = function (...args: any[]): NativePointer {
//     return callFunction(this, ...args)
// }
// Object.defineProperty(NativePointer.prototype, "callFunction", {
//     value: function (...args: any[]): NativePointer {
//         return callFunction(this, ...args)
//     }
// })
NativePointer.prototype.callFunction = function (...args) {
    return ptr(1);
};
Object.defineProperty(NativePointer.prototype, "callFunction", {
    value: function (...args) {
        return ptr(2);
    }
});
},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOP_MAP = exports.NOP_ARRAY = exports.SET_ARRAY = exports.GET_ARRAY = exports.GET_MAP_VALUE = exports.SET_MAP_VALUE = exports.SET_MAP = exports.GET_MAP = exports.SET_G = exports.GET_GT = exports.GET_G = exports.GET_F = exports.SET_F_A = exports.SET_F = exports.SET_A = exports.GET_A = exports.newThreadCallBack = exports.p_size = exports.soName = void 0;
exports.soName = "libil2cpp.so";
exports.p_size = Process.pointerSize;
let newThreadCallBack = () => { };
exports.newThreadCallBack = newThreadCallBack;
// export type GameObject = NativePointer
// export type Component = NativePointer
// export type Transform = NativePointer
// ---------------------- 全局变量 ---------------------- 
// 记录函数地址 address (SET_A:set address / GET_A:get address)
let MAP_EXPORT_ADDRESS = new Map();
const GET_A = (typeEp) => MAP_EXPORT_ADDRESS.get(typeEp);
exports.GET_A = GET_A;
const SET_A = (typeEp, mPtr) => MAP_EXPORT_ADDRESS.set(typeEp, mPtr);
exports.SET_A = SET_A;
// 记录函数 function (SET_F:set function / GET_F:get function)
let MAP_EXPORT_FUNCTIONS = new Map();
function SET_F(type, func) {
    MAP_EXPORT_FUNCTIONS.set(type, func);
    (0, exports.SET_A)(type, func);
}
exports.SET_F = SET_F;
function SET_F_A(type, func) {
    MAP_EXPORT_FUNCTIONS.set(type, func);
    (0, exports.SET_A)(type, func);
}
exports.SET_F_A = SET_F_A;
function GET_F(type) {
    return MAP_EXPORT_FUNCTIONS.get(type);
}
exports.GET_F = GET_F;
// 记录全局变量
let MAP_GLOABE_OBJ = new Map();
const GET_G = (gKey) => MAP_GLOABE_OBJ.get(gKey);
exports.GET_G = GET_G;
function GET_GT(gKey) {
    let tmp = MAP_GLOABE_OBJ.get(gKey);
    if (tmp == undefined)
        tmp = 0;
    return MAP_GLOABE_OBJ.get(gKey);
}
exports.GET_GT = GET_GT;
function SET_G(gKey, obj) {
    return MAP_GLOABE_OBJ.set(gKey, obj);
}
exports.SET_G = SET_G;
function GET_MAP(tKay) {
    if (MAP_GLOABE_OBJ.get(tKay)) {
        return MAP_GLOABE_OBJ.get(tKay);
    }
    else {
        let tmp = new Map();
        SET_MAP(tKay, tmp);
        return tmp;
    }
}
exports.GET_MAP = GET_MAP;
function SET_MAP(tKay, map) {
    MAP_GLOABE_OBJ.set(tKay, map);
}
exports.SET_MAP = SET_MAP;
function SET_MAP_VALUE(tKay, key, value) {
    SET_MAP(tKay, GET_MAP(tKay).set(key, value));
}
exports.SET_MAP_VALUE = SET_MAP_VALUE;
function GET_MAP_VALUE(tKay, key) {
    return GET_MAP(tKay).get(key);
}
exports.GET_MAP_VALUE = GET_MAP_VALUE;
function GET_ARRAY(tKay) {
    if (MAP_GLOABE_OBJ.get(tKay)) {
        return MAP_GLOABE_OBJ.get(tKay);
    }
    else {
        let tmp = new Array();
        SET_ARRAY(tKay, tmp);
        return tmp;
    }
}
exports.GET_ARRAY = GET_ARRAY;
function SET_ARRAY(tKay, array) {
    MAP_GLOABE_OBJ.set(tKay, array);
}
exports.SET_ARRAY = SET_ARRAY;
function NOP_ARRAY(tKay) {
    MAP_GLOABE_OBJ.delete(tKay);
}
exports.NOP_ARRAY = NOP_ARRAY;
function NOP_MAP(tKay) {
    MAP_GLOABE_OBJ.delete(tKay);
}
exports.NOP_MAP = NOP_MAP;
globalThis.MAP_EXPORT_FUNCTIONS = MAP_EXPORT_FUNCTIONS.forEach((value, key) => { LOGD(`${key} => ${value}`); });
globalThis.MAP_EXPORT_ADDRESS = MAP_EXPORT_ADDRESS;
globalThis.MAP_GLOABE_OBJ = MAP_GLOABE_OBJ;
globalThis.p_size = exports.p_size;
},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showMethodInfo = void 0;
const showMethodInfo = (methodInfo) => {
    if (typeof methodInfo == "number")
        methodInfo = ptr(methodInfo);
    let packMethod = new Il2Cpp.Method(methodInfo);
    let Il2CppClass = packMethod.class.handle;
    let Il2CppImage = packMethod.class.image.handle;
    let Il2CppAssembly = packMethod.class.image.assembly.handle;
    LOGH("Function: " + packMethod.name + "\t" + packMethod.parameterCount + "\t0x" + Number(methodInfo).toString(16) + " ---> "
        + packMethod.virtualAddress + " ---> " + packMethod.relativeVirtualAddress + "\n");
    LOGH(packMethod.name + " ---> " + packMethod.class.name + "(" + Il2CppClass + ") ---> " + (packMethod.class.namespace.length == 0 ? " - " : packMethod.class.namespace)
        + " ---> " + packMethod.class.image.name + "(" + Il2CppImage + ") ---> Il2CppAssembly(" + Il2CppAssembly + ")\n");
    if (packMethod.parameterCount != 0)
        LOGH("ARGS: " + packMethod.parameters.map(p => p.type.name + "(" + p.type.handle + ") " + p.name).join(", ") + "\n");
};
exports.showMethodInfo = showMethodInfo;
globalThis.showMethodInfo = showMethodInfo;
},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const il2cppMethod_1 = require("../bridge/fix/il2cppMethod");
const class_1 = require("../expand/TypeExtends/mscorlibObj/Object/class");
const class_2 = require("../expand/TypeExtends/mscorlibObj/ValueType/Color/class");
const formart_1 = require("../utils/formart");
const reader_1 = require("../utils/reader");
class ValueResolve {
    cacheId = "";
    method;
    args;
    retval = ptr(0);
    constructor(cacheID, methodInfo) {
        this.cacheId = cacheID;
        this.method = methodInfo;
        this.args = new Array(methodInfo.genericParameterCount);
    }
    getCacheId() {
        return this.cacheId;
    }
    setCacheId(cacheId) {
        this.cacheId = cacheId;
        return this;
    }
    getMethod() {
        return this.method;
    }
    setMethod(method) {
        this.method = method;
        this.args = new Array(method.genericParameterCount);
        return this;
    }
    setArg(index, arg) {
        this.args[index] = arg;
        return this;
    }
    setRetval(retval) {
        this.retval = retval;
        return this;
    }
    getArg(index) {
        return this.args[index];
    }
    getRetval() {
        return this.retval;
    }
    getArgs() {
        return this.args;
    }
    getArgsCount() {
        return this.method.parameterCount;
    }
    setArgs(value) {
        if (value == undefined || value.length == 0 || value.length < this.method.parameterCount)
            return this;
        this.args = value;
        return this;
    }
    static MapCacheStringWithOutValue = new Map();
    toString() {
        let cache = ValueResolve.MapCacheStringWithOutValue.get(this.cacheId);
        if (cache)
            return cache;
        let addressInfo = ` ${this.method.handle} -> ${this.method.relativeVirtualAddress} `;
        let classInfo = `${formart_1.formartClass.alignStr(this.method.class.name, 18)}(${this.method.class.handle} - ${this.args[0]})`;
        let infoContent = `===>  ${(0, il2cppMethod_1.methodToString)(this.method, true)}\t `;
        let retStr = `${this.cacheId}\t${addressInfo}\t|  ${classInfo}  ${infoContent}`;
        ValueResolve.MapCacheStringWithOutValue.set(this.cacheId, retStr);
        return retStr;
    }
    resolve(index) {
        if (index > this.method.parameterCount)
            throw new Error("index out of parameterCount range");
        let args = index == -1 ? this.retval : this.args[index];
        let type = index == -1 ? this.method.returnType : this.method.parameters[index].type;
        return ValueResolve.fakeValue(args, type, this.method);
    }
    static fakeValue = (insPtr, type, method) => {
        if (typeof insPtr == "number")
            insPtr = ptr(insPtr);
        if (typeof method == "number")
            method = new Il2Cpp.Method(ptr(method));
        if (type.handle.equals(1))
            return new Il2Cpp.Object(insPtr).toString();
        if (type.isNull() || method.isNull())
            return "";
        if (insPtr.isNull() && type.name != "System.Boolean" && !method.class.isEnum && !type.name.includes("Void"))
            return "NULL";
        if (!method.class.isNull() && type.name.endsWith("[]"))
            return arrayType();
        if (!method.class.isNull() && type.name.includes("Dictionary"))
            return dictionaryType();
        if (!method.class.isNull() && method.class.isEnum)
            return enumType();
        return CommonType(type);
        function arrayType() {
            return "";
        }
        function dictionaryType() {
            return "";
        }
        function enumType() {
            return "";
        }
        function CommonType(type) {
            switch (type.name) {
                case "System.Void":
                    return "";
                case "System.Boolean":
                    return !insPtr.isNull() ? "True" : "False";
                case "System.Int32":
                    return (0, reader_1.readInt)(insPtr).toString();
                case "System.UInt32":
                    return (0, reader_1.readUInt)(insPtr).toString();
                case "System.Int64":
                    return (0, reader_1.readInt64)(insPtr).toString();
                case "System.Single":
                    return (0, reader_1.readSingle)(insPtr).toString();
                case "System.String":
                    return (0, reader_1.readU16)(insPtr);
                case "System.Object":
                    return getObjName(insPtr);
                case "System.UnityEngine":
                    return new class_1.ObjectIl2cpp_impl(insPtr).get_name();
                case "UnityEngine.Color":
                    return new class_2.ColorImpl(insPtr).toString();
                case "Vector2":
                    return `${insPtr.readFloat()} ${insPtr.add(4).readFloat()}`;
                case "System.Action":
                case "System.Action`1":
                case "System.Action`2":
                    return insPtr.add(Process.pageSize === 4 ? 0x14 : 0x10).readPointer().readPointer().sub(soAddr).toString();
                default:
                    try {
                        return new Il2Cpp.Object(insPtr).toString();
                    }
                    catch (error) {
                        return "";
                    }
            }
        }
        function getParentsStr(clsPtr) {
            let ret = "";
            while (true) {
                let parent = clsPtr.parent;
                if (parent != null) {
                    clsPtr = parent;
                    ret += clsPtr.name + "<---";
                }
                else {
                    // LOGD(ret)
                    return ret;
                }
            }
        }
    };
}
exports.default = ValueResolve;
},{"../bridge/fix/il2cppMethod":12,"../expand/TypeExtends/mscorlibObj/Object/class":53,"../expand/TypeExtends/mscorlibObj/ValueType/Color/class":72,"../utils/formart":100,"../utils/reader":103}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PackerObject extends Il2Cpp.Object {
    methods = [];
    fields = [];
    invoke(...args) {
    }
}
class Packer extends Il2Cpp.Object {
    methods = this.class.methods;
    fields = this.class.fields;
    pack() {
        return new Proxy(this.class, {
            get: (target, property) => {
                Reflect.set(target, "methods", this.methods);
                Reflect.set(target, "fields", this.fields);
                return Reflect.get(target, property);
            }
        });
    }
}
function packPack(mPtr) {
    if (typeof mPtr == "number")
        mPtr = ptr(mPtr);
    return new Packer(mPtr).fields["12"].value;
}
Reflect.set(globalThis, "pack", packPack);
},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Reflect.defineProperty(Il2Cpp.Class, "prettyString", {
    value: function () {
        var proto = Il2Cpp.Class.prototype;
        return `${proto.isEnum ? `enum` : proto.isValueType ? `struct` : proto.isInterface ? `interface` : `class`}`;
    }
});
},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.methodToString = exports.methodToArray = exports.getMethodDesFromMethodPtr = exports.getMethodModifier = void 0;
const enum_1 = require("../../base/enum");
// 解析 Method 的权限符
const getMethodModifier = (methodPtr) => {
    if (typeof methodPtr == "number")
        methodPtr = ptr(methodPtr);
    let localMethod;
    // let flags = methodPtr.add(p_size * 8 + 4).readU16()
    if (methodPtr instanceof Il2Cpp.Method) {
        localMethod = methodPtr;
    }
    else if (typeof methodPtr == "number") {
        localMethod = new Il2Cpp.Method(ptr(methodPtr));
    }
    else {
        localMethod = new Il2Cpp.Method(methodPtr);
    }
    let flags = localMethod.flags;
    let access = flags & enum_1.il2cppTabledefs.METHOD_ATTRIBUTE_MEMBER_ACCESS_MASK;
    let ret_str = "";
    switch (access) {
        case enum_1.il2cppTabledefs.METHOD_ATTRIBUTE_PRIVATE:
            ret_str += "private ";
            break;
        case enum_1.il2cppTabledefs.METHOD_ATTRIBUTE_PUBLIC:
            ret_str += "public ";
            break;
        case enum_1.il2cppTabledefs.METHOD_ATTRIBUTE_FAMILY:
            ret_str += "protected ";
            break;
        case enum_1.il2cppTabledefs.METHOD_ATTRIBUTE_ASSEM:
        case enum_1.il2cppTabledefs.METHOD_ATTRIBUTE_FAM_AND_ASSEM:
            ret_str += "internal ";
            break;
        case enum_1.il2cppTabledefs.METHOD_ATTRIBUTE_FAM_OR_ASSEM:
            ret_str += "protected internal ";
            break;
    }
    if (flags & enum_1.il2cppTabledefs.METHOD_ATTRIBUTE_STATIC) {
        ret_str += "static ";
    }
    if (flags & enum_1.il2cppTabledefs.METHOD_ATTRIBUTE_ABSTRACT) {
        ret_str += "abstract ";
        if ((flags & enum_1.il2cppTabledefs.METHOD_ATTRIBUTE_VTABLE_LAYOUT_MASK) == enum_1.il2cppTabledefs.METHOD_ATTRIBUTE_REUSE_SLOT) {
            ret_str += "override ";
        }
    }
    else if (flags & enum_1.il2cppTabledefs.METHOD_ATTRIBUTE_FINAL) {
        if ((flags & enum_1.il2cppTabledefs.METHOD_ATTRIBUTE_VTABLE_LAYOUT_MASK) == enum_1.il2cppTabledefs.METHOD_ATTRIBUTE_REUSE_SLOT) {
            ret_str += "sealed override ";
        }
    }
    else if (flags & enum_1.il2cppTabledefs.METHOD_ATTRIBUTE_VIRTUAL) {
        if ((flags & enum_1.il2cppTabledefs.METHOD_ATTRIBUTE_VTABLE_LAYOUT_MASK) == enum_1.il2cppTabledefs.METHOD_ATTRIBUTE_NEW_SLOT) {
            ret_str += "virtual ";
        }
        else {
            ret_str += "override ";
        }
    }
    if (flags & enum_1.il2cppTabledefs.METHOD_ATTRIBUTE_PINVOKE_IMPL) {
        ret_str += "extern ";
    }
    return ret_str;
};
exports.getMethodModifier = getMethodModifier;
const getMethodDesFromMethodPtr = (methodPtr, simpleType = true) => {
    if (typeof methodPtr == "number")
        methodPtr = ptr(methodPtr);
    if (methodPtr == null || methodPtr.isNull())
        throw new Error("getMethodDesFromMethodPtr: methodPtr can't be null");
    let localMethod = methodPtr instanceof Il2Cpp.Method ? methodPtr : new Il2Cpp.Method(methodPtr);
    let returnTypeArr = localMethod.returnType.name.split(".");
    let ret_str = "";
    ret_str += (0, exports.getMethodModifier)(localMethod);
    ret_str += `${returnTypeArr[returnTypeArr.length - 1]} `;
    ret_str += localMethod.name;
    ret_str += "(" + localMethod.parameters.map(x => `${simpleType ? (function (name) {
        let sp = name.split(".");
        return sp[sp.length - 1];
    }(x.type.name)) : x.type.name} ${x.name}`).join(",") + ")";
    return ret_str;
};
exports.getMethodDesFromMethodPtr = getMethodDesFromMethodPtr;
// 缓存 method info to array
const map_cache_method_des = new Map();
const methodToArray = (method) => {
    if (method instanceof NativePointer) {
        return getArrayFromMethod(new Il2Cpp.Method(method));
    }
    else if (typeof method == "number") {
        return getArrayFromMethod(new Il2Cpp.Method(ptr(method)));
    }
    else if (method instanceof Il2Cpp.Method) {
        return getArrayFromMethod(method);
    }
    else {
        throw new Error("methodToArray: method unknown type");
    }
    // [
    //     "0xbf88b6f4",
    //     "0xc81e101c",
    //     "0x99901c",
    //     "public static x0y1(Vector2 v)",
    //     "0xbf9ee3e0",
    //     "ExtensionMethods"
    // ]
    function getArrayFromMethod(method) {
        let cache = map_cache_method_des.get(method);
        if (cache != undefined)
            return cache;
        let ret_arr = [];
        ret_arr.push(method.handle); // 0
        ret_arr.push(method.virtualAddress); // 1
        ret_arr.push(method.virtualAddress.isNull() ? ptr(0) : method.relativeVirtualAddress); // 2
        ret_arr.push((0, exports.getMethodDesFromMethodPtr)(method)); // 3
        ret_arr.push(method.class.handle); // 4
        ret_arr.push(method.class.name); // 5
        map_cache_method_des.set(method, ret_arr);
        return ret_arr;
    }
};
exports.methodToArray = methodToArray;
//Il2Cpp.Method toString impl
const methodToString = (method, simple = false) => {
    let arr = (0, exports.methodToArray)(method);
    if (arr == undefined)
        throw new Error("methodToString: methodToArray return undefined");
    // ctor cctor
    if (simple)
        return `${arr[3]} ${(method.name.includes("ctor")) ? `   { class => ${arr[5]}( ${arr[4]} ) }` : ""}`;
    let displayStr = `[*] `;
    displayStr += `${arr[0]} ---> `;
    displayStr += `${arr[1]} (${arr[2]})`;
    displayStr += `${arr[1].isNull() ? `\t\t\t` : `\t`}|  `;
    displayStr += `${arr[3]}`;
    if (method.name.includes(".ctor"))
        displayStr += `   { class => ${arr[5]}( ${arr[4]} ) } `;
    return displayStr;
};
exports.methodToString = methodToString;
globalThis.methodToArray = exports.methodToArray;
},{"../../base/enum":5}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./apiExtends/apiExtends");
require("./mscorlibObj/include");
require("./thread/_include");
},{"./apiExtends/apiExtends":14,"./mscorlibObj/include":79,"./thread/_include":81}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function transfromStrToFunction(AssemblyName, NameSpaces, functionName, argsCount = -1, retType, argTypes) {
    return overloadTransfromStrToFunction(AssemblyName, NameSpaces, functionName, argsCount, [], retType, argTypes);
}
function overloadTransfromStrToFunction(AssemblyName, NameSpaces, functionName, argsCount = -1, overload, retType, argTypes) {
    let method = findMethod(AssemblyName, NameSpaces, functionName, argsCount, overload, false);
    if (method == undefined)
        throw new Error(`method ${functionName} not found`);
    let exportPointer = method.virtualAddress;
    if (exportPointer == null)
        throw new Error("Could not find method");
    return new NativeFunction(exportPointer, retType, argTypes);
}
Il2Cpp.Api.t = transfromStrToFunction;
Il2Cpp.Api.o = overloadTransfromStrToFunction;
},{}],15:[function(require,module,exports){
"use strict";
},{}],16:[function(require,module,exports){
"use strict";
},{}],17:[function(require,module,exports){
"use strict";
},{}],18:[function(require,module,exports){
"use strict";
},{}],19:[function(require,module,exports){
"use strict";
},{}],20:[function(require,module,exports){
"use strict";
},{}],21:[function(require,module,exports){
"use strict";
},{}],22:[function(require,module,exports){
"use strict";
},{}],23:[function(require,module,exports){
"use strict";
},{}],24:[function(require,module,exports){
"use strict";
},{}],25:[function(require,module,exports){
"use strict";
},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./Animation/include");
require("./Animator/include");
require("./AudioSourse/include");
require("./Camera/include");
require("./Light/include");
require("./MonoBehaviour/include");
require("./NetworkView/include");
},{"./Animation/include":19,"./Animator/include":20,"./AudioSourse/include":21,"./Camera/include":22,"./Light/include":23,"./MonoBehaviour/include":24,"./NetworkView/include":25}],27:[function(require,module,exports){
"use strict";
},{}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./CharacterController/include");
},{"./CharacterController/include":27}],29:[function(require,module,exports){
"use strict";
},{}],30:[function(require,module,exports){
"use strict";
},{}],31:[function(require,module,exports){
"use strict";
},{}],32:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_cache_getter_1 = require("decorator-cache-getter");
require("./interface");
class TransformAPI {
    static get _ctor() {
        // public extern Transform GetChild(int index);
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", ".ctor", 1, "pointer", ["pointer"]);
    }
    static get _GetChild() {
        // public extern Transform GetChild(int index);
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "GetChild", 1, "pointer", ["pointer", "int"]);
    }
    static get _IsChildOf() {
        // public extern bool IsChildOf([NotNull] Transform parent);
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "IsChildOf", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _LookAt() {
        // public void LookAt(Vector3 worldPosition)
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "LookAt", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _Rotate_eulers() {
        //public void Rotate(Vector3 eulers)
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "Rotate", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _Rotate_eulers_relativeTo() {
        // public void Rotate(Vector3 eulers, Space relativeTo)
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "Rotate", 2, "pointer", ["pointer", "pointer"]);
    }
    static get _Rotate_xAngle_yAngle_zAngle() {
        // public void Rotate(float xAngle, float yAngle, float zAngle)
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "Rotate", 3, "pointer", ["pointer", "float", "float", "float"]);
    }
    static get _SetAsFirstSibling() {
        // public extern void SetAsFirstSibling();
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "SetAsFirstSibling", 0, "pointer", ["pointer"]);
    }
    static get _SetParent() {
        // public void SetParent(Transform p)
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "SetParent", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _SetParent_parent_worldPositionStays() {
        // public extern void SetParent(Transform parent, bool worldPositionStays);
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "SetParent", 2, "pointer", ["pointer", "pointer", "bool"]);
    }
    static get _TransformDirection() {
        // public Vector3 TransformDirection(Vector3 direction)
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "TransformDirection", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _TransformPoint() {
        // public Vector3 TransformPoint(Vector3 position)
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "TransformPoint", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _get_childCount() {
        // public extern int get_childCount();
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "get_childCount", 0, "int", ["pointer"]);
    }
    static get _get_eulerAngles() {
        // public Vector3 get_eulerAngles()
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "get_eulerAngles", 0, "pointer", ["pointer", "pointer"]);
    }
    static get _get_forward() {
        // public Vector3 get_forward()
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "get_forward", 0, "pointer", ["pointer"]);
    }
    static get _set_localEulerAngles() {
        // public void set_localEulerAngles(Vector3 value)
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "set_localEulerAngles", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _get_localEulerAngles() {
        // public Vector3 get_localEulerAngles()
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "get_localEulerAngles", 0, "pointer", ["pointer"]);
    }
    static get _set_localPosition() {
        // public void set_localPosition(Vector3 value)
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "set_localPosition", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _get_localPosition() {
        // public Vector3 get_localPosition()
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "get_localPosition", 0, "pointer", ["pointer"]);
    }
    static get _set_localRotation() {
        // public void set_localRotation(Quaternion value)
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "set_localRotation", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _get_localRotation() {
        // public Quaternion get_localRotation()
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "get_localRotation", 0, "pointer", ["pointer"]);
    }
    static get _set_localScale() {
        // public void set_localScale(Vector3 value)
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "set_localScale", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _get_localScale() {
        // public Vector3 get_localScale()
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "get_localScale", 0, "pointer", ["pointer"]);
    }
    static get _get_localToWorldMatrix() {
        // public Matrix4x4 get_localToWorldMatrix()
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "get_localToWorldMatrix", 0, "pointer", ["pointer"]);
    }
    static get _set_parent() {
        // public void set_parent(Transform value)
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "set_parent", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _get_parent() {
        // public Transform get_parent()
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "get_parent", 0, "pointer", ["pointer"]);
    }
    static get _set_position() {
        // public void set_position(Vector3 value)
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "set_position", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _get_position() {
        // public Vector3 get_position()
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "get_position", 0, "pointer", ["pointer", "pointer"]);
    }
    static get _set_rotation() {
        // public void set_rotation(Quaternion value)
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "set_rotation", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _get_rotation() {
        // public Quaternion get_rotation()
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "get_rotation", 0, "pointer", ["pointer"]);
    }
    static get _get_up() {
        // public Vector3 get_up()
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "get_up", 0, "pointer", ["pointer"]);
    }
    static get _get_worldToLocalMatrix() {
        // public Matrix4x4 get_worldToLocalMatrix()
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "get_worldToLocalMatrix", 0, "pointer", ["pointer"]);
    }
}
__decorate([
    decorator_cache_getter_1.cache
], TransformAPI, "_ctor", null);
__decorate([
    decorator_cache_getter_1.cache
], TransformAPI, "_GetChild", null);
__decorate([
    decorator_cache_getter_1.cache
], TransformAPI, "_IsChildOf", null);
__decorate([
    decorator_cache_getter_1.cache
], TransformAPI, "_LookAt", null);
__decorate([
    decorator_cache_getter_1.cache
], TransformAPI, "_Rotate_eulers", null);
__decorate([
    decorator_cache_getter_1.cache
], TransformAPI, "_Rotate_eulers_relativeTo", null);
__decorate([
    decorator_cache_getter_1.cache
], TransformAPI, "_Rotate_xAngle_yAngle_zAngle", null);
__decorate([
    decorator_cache_getter_1.cache
], TransformAPI, "_SetAsFirstSibling", null);
__decorate([
    decorator_cache_getter_1.cache
], TransformAPI, "_SetParent", null);
__decorate([
    decorator_cache_getter_1.cache
], TransformAPI, "_SetParent_parent_worldPositionStays", null);
__decorate([
    decorator_cache_getter_1.cache
], TransformAPI, "_TransformDirection", null);
__decorate([
    decorator_cache_getter_1.cache
], TransformAPI, "_TransformPoint", null);
__decorate([
    decorator_cache_getter_1.cache
], TransformAPI, "_get_childCount", null);
__decorate([
    decorator_cache_getter_1.cache
], TransformAPI, "_get_eulerAngles", null);
__decorate([
    decorator_cache_getter_1.cache
], TransformAPI, "_get_forward", null);
__decorate([
    decorator_cache_getter_1.cache
], TransformAPI, "_set_localEulerAngles", null);
__decorate([
    decorator_cache_getter_1.cache
], TransformAPI, "_get_localEulerAngles", null);
__decorate([
    decorator_cache_getter_1.cache
], TransformAPI, "_set_localPosition", null);
__decorate([
    decorator_cache_getter_1.cache
], TransformAPI, "_get_localPosition", null);
__decorate([
    decorator_cache_getter_1.cache
], TransformAPI, "_set_localRotation", null);
__decorate([
    decorator_cache_getter_1.cache
], TransformAPI, "_get_localRotation", null);
__decorate([
    decorator_cache_getter_1.cache
], TransformAPI, "_set_localScale", null);
__decorate([
    decorator_cache_getter_1.cache
], TransformAPI, "_get_localScale", null);
__decorate([
    decorator_cache_getter_1.cache
], TransformAPI, "_get_localToWorldMatrix", null);
__decorate([
    decorator_cache_getter_1.cache
], TransformAPI, "_set_parent", null);
__decorate([
    decorator_cache_getter_1.cache
], TransformAPI, "_get_parent", null);
__decorate([
    decorator_cache_getter_1.cache
], TransformAPI, "_set_position", null);
__decorate([
    decorator_cache_getter_1.cache
], TransformAPI, "_get_position", null);
__decorate([
    decorator_cache_getter_1.cache
], TransformAPI, "_set_rotation", null);
__decorate([
    decorator_cache_getter_1.cache
], TransformAPI, "_get_rotation", null);
__decorate([
    decorator_cache_getter_1.cache
], TransformAPI, "_get_up", null);
__decorate([
    decorator_cache_getter_1.cache
], TransformAPI, "_get_worldToLocalMatrix", null);
Il2Cpp.Api.Transform = TransformAPI;
},{"./interface":36,"decorator-cache-getter":105}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformImpl = void 0;
const class_1 = require("../../../ValueType/Vector3/class");
const class_2 = require("../class");
class TransformImpl extends class_2.ComponentImpl {
    ctor_0() {
        return new TransformImpl(Il2Cpp.Api.Transform._ctor(alloc()));
    }
    GetChild(index) {
        return new TransformImpl(Il2Cpp.Api.Transform._GetChild(this.handle, index));
    }
    GetEnumerator() {
        throw new Error("Method not implemented.");
    }
    GetParent() {
        return new TransformImpl(Il2Cpp.Api.Transform._get_parent(this.handle));
    }
    GetSiblingIndex() {
        throw new Error("Method not implemented.");
    }
    InverseTransformDirection(direction) {
        throw new Error("Method not implemented.");
    }
    InverseTransformPoint(position) {
        throw new Error("Method not implemented.");
    }
    InverseTransformVector(vector) {
        throw new Error("Method not implemented.");
    }
    IsChildOf(parent) {
        return Il2Cpp.Api.Transform._IsChildOf(this.handle, parent.handle);
    }
    // LookAt(target: Il2Cpp.Transform): void;
    // LookAt(target: Il2Cpp.Vector3): void;
    // LookAt(target: Il2Cpp.Transform, worldUp: Il2Cpp.Vector3): void;
    // LookAt(target: Il2Cpp.Vector3, worldUp: Il2Cpp.Vector3): void;
    // LookAt(target: unknown, worldUp?: unknown): void {
    //     throw new Error("Method not implemented.");
    // }
    // Rotate(eulerAngles: Il2Cpp.Vector3): void;
    // Rotate(eulerAngles: Il2Cpp.Vector3, relativeTo: Il2Cpp.Space): void;
    // Rotate(axis: Il2Cpp.Vector3, angle: number): void;
    // Rotate(axis: Il2Cpp.Vector3, angle: number, relativeTo: Il2Cpp.Space): void;
    // Rotate(x: number, y: number, z: number, relativeTo: Il2Cpp.Space): void;
    // Rotate(x: unknown, y?: unknown, z?: unknown, relativeTo?: unknown): void {
    //     throw new Error("Method not implemented.");
    // }
    RotateAround(point, axis, angle) {
        throw new Error("Method not implemented.");
    }
    SetAsFirstSibling() {
        throw new Error("Method not implemented.");
    }
    SetAsLastSibling() {
        throw new Error("Method not implemented.");
    }
    // SetParent(parent: Il2Cpp.Transform): void;
    // SetParent(parent: Il2Cpp.Transform, worldPositionStays: boolean): void;
    // SetParent(parent: unknown, worldPositionStays?: unknown): void {
    //     throw new Error("Method not implemented.");
    // }
    SetPositionAndRotation(position, rotation) {
        throw new Error("Method not implemented.");
    }
    SetSiblingIndex(index) {
        throw new Error("Method not implemented.");
    }
    TransformDirection(x, y, z) {
        throw new Error("Method not implemented.");
    }
    TransformPoint(position) {
        throw new Error("Method not implemented.");
    }
    TransformVector(vector) {
        throw new Error("Method not implemented.");
    }
    Translate(x, y, z, relativeTo) {
        throw new Error("Method not implemented.");
    }
    get_childCount() {
        return Il2Cpp.Api.Transform._get_childCount(this.handle);
    }
    get_eulerAngles() {
        let allocMem = alloc(4);
        Il2Cpp.Api.Transform._get_eulerAngles(this.handle, allocMem);
        return new Il2Cpp.Vector3(allocMem);
    }
    set_eulerAngles(value) {
        throw new Error("Method not implemented.");
    }
    get_forward() {
        return Il2Cpp.Api.Transform._get_forward(this.handle);
    }
    set_hasChanged(value) {
        throw new Error("Method not implemented.");
    }
    get_hasChanged() {
        throw new Error("Method not implemented.");
    }
    get_localEulerAngles() {
        return new Il2Cpp.Vector3(Il2Cpp.Api.Transform._get_localEulerAngles(this.handle));
    }
    set_localEulerAngles(value) {
        return Il2Cpp.Api.Transform._set_localEulerAngles(this.handle, value);
    }
    get_localPosition() {
        return new Il2Cpp.Vector3(Il2Cpp.Api.Transform._get_localPosition(this.handle));
    }
    set_localPosition(value) {
        return Il2Cpp.Api.Transform._set_localPosition(this.handle, value.handle);
    }
    get_localRotation() {
        return new Il2Cpp.Quaternion(Il2Cpp.Api.Transform._get_localRotation(this.handle));
    }
    set_localRotation(value) {
        return Il2Cpp.Api.Transform._set_localRotation(this.handle, value.handle);
    }
    get_localScale() {
        return new Il2Cpp.Vector3(Il2Cpp.Api.Transform._get_localScale(this.handle));
    }
    set_localScale(value) {
        return Il2Cpp.Api.Transform._set_localScale(this.handle, value.handle);
    }
    get_lossyScale() {
        throw new Error("Method not implemented.");
    }
    get_parent() {
        if (this.handle == ptr(0))
            return new Il2Cpp.Transform(ptr(0));
        return new Il2Cpp.Transform(Il2Cpp.Api.Transform._get_parent(this.handle));
    }
    set_parent(value) {
        return Il2Cpp.Api.Transform._set_parent(this.handle, value.handle);
    }
    get_position() {
        let allocMem = allocVector(0, 0, 0);
        Il2Cpp.Api.Transform._get_position(allocMem, this.handle);
        return new class_1.Vector3Impl(allocMem, 2);
    }
    set_position(value) {
        return Il2Cpp.Api.Transform._set_position(this.handle, value.handle);
    }
    get_right() {
        throw new Error("Method not implemented.");
    }
    get_rotation() {
        return new Il2Cpp.Quaternion(Il2Cpp.Api.Transform._get_rotation(this.handle));
    }
    set_rotation(value) {
        return Il2Cpp.Api.Transform._set_rotation(this.handle, value.handle);
    }
    get_up() {
        return new Il2Cpp.Vector3(Il2Cpp.Api.Transform._get_up(this.handle));
    }
    set_up(value) {
        throw new Error("Method not implemented.");
    }
}
exports.TransformImpl = TransformImpl;
Il2Cpp.Transform = TransformImpl;
},{"../../../ValueType/Vector3/class":75,"../class":38}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_1 = require("./class");
const showTransform = (transform) => {
    if (typeof transform == "number")
        transform = ptr(transform);
    LOGO(`${getLine(15)} Transform ${getLine(15)}`);
    let trsIns = new Il2Cpp.Transform(transform);
    LOGD(`childCount\t--->\t${trsIns.get_childCount()}\t(${trsIns.get_name()})`);
    PrintHierarchy(transform, 1, true);
    LOGD("get_position\t(" + trsIns.get_position().toString() + ")");
    // todo
};
/**
 * 打印transform往下的层级
 * ps:不建议打印底层的层级，展现一大篇出来毫无重点
 * @param {Number} mPtr Transform Pointer
 * @param {Number} level 最大显示层级
 * @param {Boolean} inCall 内部调用，去掉LOG的相关判断
 */
const PrintHierarchy = (mPtr, level = 2, inCall = false) => {
    if (typeof mPtr == "number")
        mPtr = ptr(mPtr);
    if (mPtr.isNull())
        return;
    let trsIns;
    if (getTypeName(mPtr) == "GameObject")
        mPtr = new Il2Cpp.GameObject(mPtr).get_transform().handle;
    trsIns = new Il2Cpp.Transform(mPtr);
    if (level == 10)
        LOGO(`${getLine(75)}\n`);
    // 当前level作为第一级
    let baseLevel = getLevel(trsIns);
    getChild(trsIns);
    if (level == 10)
        LOGO(`${getLine(75)}\n`);
    // 递归调用下层信息
    function getChild(trsInsLocal) {
        // LOGD(trsInsLocal.get_childCount())
        for (let index = 0; index < trsInsLocal.get_childCount(); ++index) {
            let child_transform = trsInsLocal.GetChild(index);
            let levelC = getLevel(child_transform) - baseLevel;
            // 这里可能出现 -1 -2 的情况，打出来一大片和当前transform无关的transform
            if (levelC > 0 && levelC <= level)
                LOGD((inCall != undefined ? "\t" : "") +
                    getLine(levelC - 1, "\t") +
                    child_transform.handle + " : " +
                    child_transform.get_name());
            getChild(child_transform);
        }
    }
    // 判断当前transform的层级
    function getLevel(trsInsLocal) {
        for (let level = 0; level < 10; ++level) {
            try {
                if (trsInsLocal.handle.isNull())
                    return level;
                trsInsLocal = trsInsLocal.get_parent();
            }
            catch (e) {
                return level;
            }
        }
        return 0;
    }
};
const getGameObject = (transform, inCall = false) => {
    if (typeof transform == "number")
        transform = ptr(transform);
    if (inCall) {
        showGameObject(transform);
    }
    else {
        return new class_1.TransformImpl(transform).get_gameObject().handle;
    }
};
globalThis.showTransform = showTransform;
globalThis.PrintHierarchy = PrintHierarchy;
globalThis.getGameObject = getGameObject;
},{"./class":33}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./api");
require("./export");
require("./class");
require("./interface");
},{"./api":32,"./class":33,"./export":34,"./interface":36}],36:[function(require,module,exports){
"use strict";
},{}],37:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_cache_getter_1 = require("decorator-cache-getter");
class ComponentAPI {
    static get _ctor_0() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Component", ".ctor", 0, "pointer", ["pointer"]);
    }
    static get _CompareTag() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Component", "CompareTag", 1, "bool", ["pointer", "pointer"]);
    }
    static get _GetComponent() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Component", "GetComponent", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _GetComponentInChildren() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Component", "GetComponentInChildren", 2, "pointer", ["pointer", "pointer", "bool"]);
    }
    static get _GetComponentInParent() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Component", "GetComponentInParent", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _GetComponents() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Component", "GetComponents", 2, "void", ["pointer", "pointer", "pointer"]);
    }
    static get _get_gameObject() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Component", "get_gameObject", 0, "pointer", ["pointer"]);
    }
    static get _set_tag() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Component", "set_tag", 1, "void", ["pointer", "pointer"]);
    }
    static get _get_transform() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Component", "get_transform", 0, "pointer", ["pointer"]);
    }
}
__decorate([
    decorator_cache_getter_1.cache
], ComponentAPI, "_ctor_0", null);
__decorate([
    decorator_cache_getter_1.cache
], ComponentAPI, "_CompareTag", null);
__decorate([
    decorator_cache_getter_1.cache
], ComponentAPI, "_GetComponent", null);
__decorate([
    decorator_cache_getter_1.cache
], ComponentAPI, "_GetComponentInChildren", null);
__decorate([
    decorator_cache_getter_1.cache
], ComponentAPI, "_GetComponentInParent", null);
__decorate([
    decorator_cache_getter_1.cache
], ComponentAPI, "_GetComponents", null);
__decorate([
    decorator_cache_getter_1.cache
], ComponentAPI, "_get_gameObject", null);
__decorate([
    decorator_cache_getter_1.cache
], ComponentAPI, "_set_tag", null);
__decorate([
    decorator_cache_getter_1.cache
], ComponentAPI, "_get_transform", null);
Il2Cpp.Api.Component = ComponentAPI;
},{"decorator-cache-getter":105}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentImpl = void 0;
const class_1 = require("../class");
class ComponentImpl extends class_1.ObjectIl2cpp_impl {
    __ctor__() {
        return new Il2Cpp.Component(Il2Cpp.Api.Component._ctor_0(this.handle, allocP(1)));
    }
    CompareTag(tag) {
        return Il2Cpp.Api.Component._CompareTag(this.handle, allocUStr(tag));
    }
    GetComponent(type) {
        return new Il2Cpp.Component(Il2Cpp.Api.Component._GetComponent(this.handle, type));
    }
    GetComponentInChildren(t, includeInactive) {
        return new Il2Cpp.Component(Il2Cpp.Api.Component._GetComponentInChildren(this.handle, t.handle, includeInactive));
    }
    GetComponentInParent(t) {
        return new Il2Cpp.Component(Il2Cpp.Api.Component._GetComponentInParent(this.handle, t.handle));
    }
    GetComponents(type, results) {
        return Il2Cpp.Api.Component._GetComponents(this.handle, type, results);
    }
    get_gameObject() {
        return new Il2Cpp.GameObject(Il2Cpp.Api.Component._get_gameObject(this.handle));
    }
    set_tag(value) {
        return Il2Cpp.Api.Component._set_tag(this.handle, allocUStr(value));
    }
    get_transform() {
        return Il2Cpp.Api.Component._get_transform(this.handle);
    }
}
exports.ComponentImpl = ComponentImpl;
Il2Cpp.Component = ComponentImpl;
},{"../class":53}],39:[function(require,module,exports){
"use strict";
},{}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./Behavior/include");
require("./Collider/include");
require("./ParticleSystem/include");
require("./Rigidbody/include");
require("./Renderer/include");
require("./Transform/include");
require("./api");
require("./class");
require("./export");
require("./interface");
},{"./Behavior/include":26,"./Collider/include":28,"./ParticleSystem/include":29,"./Renderer/include":30,"./Rigidbody/include":31,"./Transform/include":35,"./api":37,"./class":38,"./export":39,"./interface":41}],41:[function(require,module,exports){
"use strict";
},{}],42:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_cache_getter_1 = require("decorator-cache-getter");
class GameObjectAPI {
    static get _ctor_0() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", ".ctor", 0, "pointer", ["pointer"]);
    }
    static get _ctor_1() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", ".ctor", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _ctor_2() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", ".ctor", 2, "pointer", ["pointer", "pointer", "pointer"]);
    }
    static get _AddComponent() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "AddComponent", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _GetComponent() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "GetComponent", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _GetComponentInChildren() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "GetComponentInChildren", 2, "pointer", ["pointer", "pointer", "pointer"]);
    }
    static get _GetComponentInParent() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "GetComponentInParent", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _GetComponentsInternal() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "GetComponentsInternal", 6, "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer"]);
    }
    static get _SendMessage() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "SendMessage", 2, "pointer", ["pointer", "pointer", "pointer"]);
    }
    static get _SetActive() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "SetActive", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _GetComponentFastPath() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "TryGetComponentFastPath", 2, "pointer", ["pointer", "pointer"]);
    }
    static get _CompareTag() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "CompareTag", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _get_transform() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "get_transform", 0, "pointer", ["pointer"]);
    }
    static get _get_tag() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "get_tag", 0, "pointer", ["pointer"]);
    }
    static get _get_layer() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "get_layer", 0, "pointer", ["pointer"]);
    }
    static get _set_layer() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "set_layer", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _get_gameObject() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "get_gameObject", 0, "pointer", ["pointer"]);
    }
    static get _get_activeSelf() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "get_activeSelf", 0, "bool", ["pointer"]);
    }
    static get _Find() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "Find", 1, "pointer", ["pointer"]);
    }
    static get _FindGameObjectsWithTag_A() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "FindGameObjectsWithTag", 1, "pointer", ["pointer"]);
    }
    static get _FindGameObjectWithTag() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "FindGameObjectWithTag", 1, "pointer", ["pointer"]);
    }
    static get _FindWithTag() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "FindWithTag", 1, "pointer", ["pointer"]);
    }
}
__decorate([
    decorator_cache_getter_1.cache
], GameObjectAPI, "_ctor_0", null);
__decorate([
    decorator_cache_getter_1.cache
], GameObjectAPI, "_ctor_1", null);
__decorate([
    decorator_cache_getter_1.cache
], GameObjectAPI, "_ctor_2", null);
__decorate([
    decorator_cache_getter_1.cache
], GameObjectAPI, "_AddComponent", null);
__decorate([
    decorator_cache_getter_1.cache
], GameObjectAPI, "_GetComponent", null);
__decorate([
    decorator_cache_getter_1.cache
], GameObjectAPI, "_GetComponentInChildren", null);
__decorate([
    decorator_cache_getter_1.cache
], GameObjectAPI, "_GetComponentInParent", null);
__decorate([
    decorator_cache_getter_1.cache
], GameObjectAPI, "_GetComponentsInternal", null);
__decorate([
    decorator_cache_getter_1.cache
], GameObjectAPI, "_SendMessage", null);
__decorate([
    decorator_cache_getter_1.cache
], GameObjectAPI, "_SetActive", null);
__decorate([
    decorator_cache_getter_1.cache
], GameObjectAPI, "_GetComponentFastPath", null);
__decorate([
    decorator_cache_getter_1.cache
], GameObjectAPI, "_CompareTag", null);
__decorate([
    decorator_cache_getter_1.cache
], GameObjectAPI, "_get_transform", null);
__decorate([
    decorator_cache_getter_1.cache
], GameObjectAPI, "_get_tag", null);
__decorate([
    decorator_cache_getter_1.cache
], GameObjectAPI, "_get_layer", null);
__decorate([
    decorator_cache_getter_1.cache
], GameObjectAPI, "_set_layer", null);
__decorate([
    decorator_cache_getter_1.cache
], GameObjectAPI, "_get_gameObject", null);
__decorate([
    decorator_cache_getter_1.cache
], GameObjectAPI, "_get_activeSelf", null);
__decorate([
    decorator_cache_getter_1.cache
], GameObjectAPI, "_Find", null);
__decorate([
    decorator_cache_getter_1.cache
], GameObjectAPI, "_FindGameObjectsWithTag_A", null);
__decorate([
    decorator_cache_getter_1.cache
], GameObjectAPI, "_FindGameObjectWithTag", null);
__decorate([
    decorator_cache_getter_1.cache
], GameObjectAPI, "_FindWithTag", null);
Il2Cpp.Api.GameObject = GameObjectAPI;
},{"decorator-cache-getter":105}],43:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_1 = require("../class");
class GameObjectImpl extends class_1.ObjectIl2cpp_impl {
    constructor(handle) {
        super(handle);
    }
    ctor_0() {
        return new Il2Cpp.GameObject(Il2Cpp.Api.GameObject._ctor_0(allocP(1)));
    }
    ctor_1(name) {
        return new Il2Cpp.GameObject(Il2Cpp.Api.GameObject._ctor_1(allocP(1), allocUStr(name)));
    }
    ctor_2(name, type) {
        let types = Il2Cpp.Array.from(type[0].class, type.length);
        return Il2Cpp.Api.GameObject._ctor_2(this.handle, allocP(1), allocUStr(name), types);
    }
    AddComponent(componentType) {
        return Il2Cpp.Api.GameObject._AddComponent(this.handle, componentType);
    }
    GetComponent(type) {
        return Il2Cpp.Api.GameObject._GetComponent(this.handle, type);
    }
    GetComponentInChildren(type, includeInactive) {
        return Il2Cpp.Api.GameObject._GetComponentInChildren(this.handle, type.handle, ptr(includeInactive));
    }
    GetComponentInParent(type, includeInactive) {
        return Il2Cpp.Api.GameObject._GetComponentInParent(this.handle, type.handle, ptr(includeInactive));
    }
    GetComponentsInternal(type, useSearchTypeAsArrayReturnType, recursive, includeInactive, reverse, resultList) {
        return Il2Cpp.Api.GameObject._GetComponentsInternal(this.handle, type.handle, ptr(useSearchTypeAsArrayReturnType), ptr(recursive), ptr(includeInactive), ptr(reverse), ptr(resultList));
    }
    SendMessage(methodName, options) {
        return Il2Cpp.Api.GameObject._SendMessage(this.handle, allocUStr(methodName), options);
    }
    SetActive(value) {
        return Il2Cpp.Api.GameObject._SetActive(this.handle, ptr(value));
    }
    GetComponentFastPath(type, oneFurtherThanResultValue) {
        return Il2Cpp.Api.GameObject._GetComponentFastPath(this.handle, type, oneFurtherThanResultValue);
    }
    CompareTag(tag) {
        return Il2Cpp.Api.GameObject._CompareTag(this.handle, allocUStr(tag));
    }
    get_transform() {
        if (this.handle == ptr(0))
            throw new Error("get_transform : GameObject is null");
        return new Il2Cpp.Transform(Il2Cpp.Api.GameObject._get_transform(this.handle));
    }
    get_tag() {
        return Il2Cpp.Api.GameObject._get_tag(this.handle);
    }
    set_layer(value) {
        return Il2Cpp.Api.GameObject._set_layer(this.handle, ptr(value));
    }
    get_layer() {
        return Il2Cpp.Api.GameObject._get_layer(this.handle);
    }
    get_gameObject() {
        return new Il2Cpp.GameObject(Il2Cpp.Api.GameObject._get_gameObject(this.handle));
    }
    get_activeSelf() {
        return Il2Cpp.Api.GameObject._get_activeSelf(this.handle);
    }
    get_activeInHierarchy() {
        return Il2Cpp.Api.GameObject._get_activeSelf(this.handle);
    }
    // public static extern GameObject Find(string name);
    static Find(name) {
        return new Il2Cpp.GameObject(Il2Cpp.Api.GameObject._Find(allocUStr(name)));
    }
    // public static extern GameObject[] FindGameObjectsWithTag(string tag);
    static FindGameObjectsWithTag_A(tag) {
        return new Il2Cpp.GameObject(Il2Cpp.Api.GameObject._FindGameObjectsWithTag_A(allocUStr(tag)));
    }
    // public static extern GameObject FindGameObjectWithTag(string tag);
    static FindGameObjectWithTag(tag) {
        return new Il2Cpp.GameObject(Il2Cpp.Api.GameObject._FindGameObjectWithTag(allocUStr(tag)));
    }
    // public static GameObject FindWithTag(string tag)
    static FindWithTag(tag) {
        return new Il2Cpp.GameObject(Il2Cpp.Api.GameObject._FindWithTag(allocUStr(tag)));
    }
}
Il2Cpp.GameObject = GameObjectImpl;
},{"../class":53}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showGameObject = void 0;
const HookSetActive = (defaltActive = 1) => {
    A(Il2Cpp.Api.GameObject._SetActive, (args, ctx) => {
        let gameObject = new Il2Cpp.GameObject(args[0]);
        if (filterDuplicateOBJ(gameObject.toString()) == -1)
            return;
        if (defaltActive == 2 || args[1].toInt32() == defaltActive) {
            let strTmp = "public extern void SetActive( " + (args[1].toInt32() == 0 ? "false" : "true") + " );  LR:" + checkCtx(ctx.lr);
            LOGW("\n" + getLine(strTmp.length));
            LOGD(strTmp);
            LOGO(getLine(strTmp.length / 2));
            showGameObject(args[0]);
        }
    });
};
function showGameObject(mPtr) {
    if (typeof mPtr == "number")
        mPtr = ptr(mPtr);
    let gameObject;
    if (getTypeName(mPtr) == "GameObject") {
        gameObject = new Il2Cpp.GameObject(mPtr);
    }
    else if (getTypeName(mPtr) == "RectTransform") {
        gameObject = new Il2Cpp.Transform(mPtr).get_gameObject();
    }
    else {
        throw new Error("showGameObject: mPtr is not GameObject or Transform");
    }
    LOGO("--------- GameObject ---------");
    LOGD("gameObj\t\t--->\t" + gameObject.handle);
    LOGD("getName\t\t--->\t" + gameObject.get_name());
    LOGD("getLayer\t--->\t" + gameObject.get_layer());
    let m_transform = gameObject.get_transform();
    LOGD("getTransform\t--->\t" + m_transform.handle);
    let layerNames = "";
    for (var i = 0; i < 10; i++) {
        if (m_transform.handle.isNull())
            break;
        let getName = m_transform.get_gameObject().get_name();
        let handle = m_transform.handle;
        let spl = layerNames == "" ? "" : " <--- ";
        layerNames = layerNames + spl + getName + "(" + handle + ")";
        m_transform = m_transform.get_parent();
    }
    LOGD("hierarchy\t--->\t" + layerNames);
}
exports.showGameObject = showGameObject;
globalThis.HookSetActive = HookSetActive;
globalThis.showGameObject = showGameObject;
},{}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./api");
require("./class");
require("./export");
require("./interface");
},{"./api":42,"./class":43,"./export":44,"./interface":46}],46:[function(require,module,exports){
"use strict";
},{}],47:[function(require,module,exports){
"use strict";
},{}],48:[function(require,module,exports){
"use strict";
},{}],49:[function(require,module,exports){
"use strict";
},{}],50:[function(require,module,exports){
"use strict";
},{}],51:[function(require,module,exports){
"use strict";
},{}],52:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.il2cppObjAPI = void 0;
const decorator_cache_getter_1 = require("decorator-cache-getter");
class il2cppObjAPI {
    static get _ctor_0() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Object", ".ctor", 0, "pointer", ["pointer"]);
    }
    static get _GetHashCode() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Object", "GetHashCode", 0, "int32", ["pointer"]);
    }
    static get _GetInstanceID() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Object", "GetInstanceID", 0, "int32", ["pointer"]);
    }
    static get _ToString() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Object", "ToString", 0, "pointer", ["pointer"]);
    }
    static get _set_name() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Object", "set_name", 1, "void", ["pointer", "pointer"]);
    }
    static get _get_name() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Object", "get_name", 0, "pointer", ["pointer"]);
    }
    static get _Equals() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Object", "Equals", 1, "bool", ["pointer"]);
    }
    // static methods ↓
    static get _Destroy_1() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Object", "Destroy", 1, "void", ["pointer"]);
    }
    static get _Destroy_2() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Object", "Destroy", 2, "void", ["pointer", "float"]);
    }
    static get _DestroyImmediate() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Object", "DestroyImmediate", 1, "void", ["pointer"]);
    }
}
__decorate([
    decorator_cache_getter_1.cache
], il2cppObjAPI, "_ctor_0", null);
__decorate([
    decorator_cache_getter_1.cache
], il2cppObjAPI, "_GetHashCode", null);
__decorate([
    decorator_cache_getter_1.cache
], il2cppObjAPI, "_GetInstanceID", null);
__decorate([
    decorator_cache_getter_1.cache
], il2cppObjAPI, "_ToString", null);
__decorate([
    decorator_cache_getter_1.cache
], il2cppObjAPI, "_set_name", null);
__decorate([
    decorator_cache_getter_1.cache
], il2cppObjAPI, "_get_name", null);
__decorate([
    decorator_cache_getter_1.cache
], il2cppObjAPI, "_Equals", null);
__decorate([
    decorator_cache_getter_1.cache
], il2cppObjAPI, "_Destroy_1", null);
__decorate([
    decorator_cache_getter_1.cache
], il2cppObjAPI, "_Destroy_2", null);
__decorate([
    decorator_cache_getter_1.cache
], il2cppObjAPI, "_DestroyImmediate", null);
exports.il2cppObjAPI = il2cppObjAPI;
Il2Cpp.Api.il2cppObj = il2cppObjAPI;
},{"decorator-cache-getter":105}],53:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectIl2cpp_impl = void 0;
class il2cppObjAPI_impl extends Il2Cpp.Object {
    ctor() {
        return Il2Cpp.Api.il2cppObj._ctor_0(allocP(1));
    }
    Equals(other) {
        return Il2Cpp.Api.il2cppObj._Equals(this.handle, other.handle);
    }
    GetHashCode() {
        return Il2Cpp.Api.il2cppObj._GetHashCode(this.handle);
    }
    GetInstanceID() {
        return Il2Cpp.Api.il2cppObj._GetInstanceID(this.handle);
    }
    ToString() {
        return Il2Cpp.Api.il2cppObj._ToString(this.handle);
    }
    set_name(value) {
        return Il2Cpp.Api.il2cppObj._set_name(this.handle, allocUStr(value));
    }
    get_name() {
        return readU16(Il2Cpp.Api.il2cppObj._get_name(this.handle));
    }
    static Destroy_1(obj) {
        return Il2Cpp.Api.il2cppObj._Destroy_1(obj);
    }
    static Destroy_2(obj, t) {
        return Il2Cpp.Api.il2cppObj._Destroy_2(obj, t);
    }
    static DestroyImmediate(obj) {
        return Il2Cpp.Api.il2cppObj._DestroyImmediate(obj);
    }
}
class ObjectIl2cpp_impl extends il2cppObjAPI_impl {
}
exports.ObjectIl2cpp_impl = ObjectIl2cpp_impl;
},{}],54:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./api");
require("./class");
require("./interface");
require("./AssetBundle/include");
require("./Avatar/include");
require("./Component/include");
require("./GameObject/include");
require("./Material/include");
require("./Mesh/include");
require("./Montion/include");
require("./Shader/include");
require("./Sprite/include");
},{"./AssetBundle/include":17,"./Avatar/include":18,"./Component/include":40,"./GameObject/include":45,"./Material/include":47,"./Mesh/include":48,"./Montion/include":49,"./Shader/include":50,"./Sprite/include":51,"./api":52,"./class":53,"./interface":55}],55:[function(require,module,exports){
"use strict";
},{}],56:[function(require,module,exports){
"use strict";
},{}],57:[function(require,module,exports){
"use strict";
},{}],58:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class mscorlibRuntimeTypeHandleAPI {
}
mscorlib.Api.RuntimeTypeHandle = mscorlibRuntimeTypeHandleAPI;
},{}],59:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mscorlib_System_RuntimeTypeHandle_impl = void 0;
const class_1 = require("../class");
require("./interface");
class mscorlib_System_RuntimeTypeHandle_impl extends class_1.mscorlib_System_Object_impl {
}
exports.mscorlib_System_RuntimeTypeHandle_impl = mscorlib_System_RuntimeTypeHandle_impl;
mscorlib.RuntimeTypeHandle = mscorlib_System_RuntimeTypeHandle_impl;
},{"../class":78,"./interface":61}],60:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./api");
require("./class");
require("./interface");
},{"./api":58,"./class":59,"./interface":61}],61:[function(require,module,exports){
"use strict";
},{}],62:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_cache_getter_1 = require("decorator-cache-getter");
class mscorlibRuntimeTypeAPI {
    static get _get_AssemblyQualifiedName() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "get_AssemblyQualifiedName", 0, "pointer", ["pointer"]);
    }
    static get _get_BaseType() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "get_BaseType", 0, "pointer", ["pointer"]);
    }
    static get _get_DeclaringType() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "get_DeclaringType", 0, "pointer", ["pointer"]);
    }
    static get _get_FullName() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "get_FullName", 0, "pointer", ["pointer"]);
    }
    static get _get_IsEnum() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "get_IsEnum", 0, "bool", ["pointer"]);
    }
    static get _get_IsGenericParameter() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "get_IsGenericParameter", 0, "bool", ["pointer"]);
    }
    static get _get_IsGenericType() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "get_IsGenericType", 0, "bool", ["pointer"]);
    }
    static get _get_Name() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "get_Name", 0, "pointer", ["pointer"]);
    }
    static get _get_Namespace() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "get_Namespace", 0, "pointer", ["pointer"]);
    }
    static get _get_ReflectedType() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "get_ReflectedType", 0, "pointer", ["pointer"]);
    }
    static get _get_TypeHandle() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "get_TypeHandle", 0, "pointer", ["pointer"]);
    }
    static get _get_UnderlyingSystemType() {
        return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "get_UnderlyingSystemType", 0, "pointer", ["pointer"]);
    }
}
__decorate([
    decorator_cache_getter_1.cache
], mscorlibRuntimeTypeAPI, "_get_AssemblyQualifiedName", null);
__decorate([
    decorator_cache_getter_1.cache
], mscorlibRuntimeTypeAPI, "_get_BaseType", null);
__decorate([
    decorator_cache_getter_1.cache
], mscorlibRuntimeTypeAPI, "_get_DeclaringType", null);
__decorate([
    decorator_cache_getter_1.cache
], mscorlibRuntimeTypeAPI, "_get_FullName", null);
__decorate([
    decorator_cache_getter_1.cache
], mscorlibRuntimeTypeAPI, "_get_IsEnum", null);
__decorate([
    decorator_cache_getter_1.cache
], mscorlibRuntimeTypeAPI, "_get_IsGenericParameter", null);
__decorate([
    decorator_cache_getter_1.cache
], mscorlibRuntimeTypeAPI, "_get_IsGenericType", null);
__decorate([
    decorator_cache_getter_1.cache
], mscorlibRuntimeTypeAPI, "_get_Name", null);
__decorate([
    decorator_cache_getter_1.cache
], mscorlibRuntimeTypeAPI, "_get_Namespace", null);
__decorate([
    decorator_cache_getter_1.cache
], mscorlibRuntimeTypeAPI, "_get_ReflectedType", null);
__decorate([
    decorator_cache_getter_1.cache
], mscorlibRuntimeTypeAPI, "_get_TypeHandle", null);
__decorate([
    decorator_cache_getter_1.cache
], mscorlibRuntimeTypeAPI, "_get_UnderlyingSystemType", null);
mscorlib.Api.RuntimeType = mscorlibRuntimeTypeAPI;
},{"decorator-cache-getter":105}],63:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mscorlib_System_RuntimeType_impl = void 0;
const class_1 = require("../RuntimeTypeHandle/class");
const class_2 = require("../Type/class");
require("./interface");
class mscorlib_System_RuntimeType_impl extends class_2.mscorlib_System_Type_impl {
    get_AssemblyQualifiedName() {
        return readU16(mscorlib.Api.RuntimeType._get_AssemblyQualifiedName(this.handle));
    }
    get_BaseType() {
        return new class_2.mscorlib_System_Type_impl(mscorlib.Api.RuntimeType._get_BaseType(this.handle));
    }
    get_DeclaringType() {
        return new class_2.mscorlib_System_Type_impl(mscorlib.Api.RuntimeType._get_DeclaringType(this.handle));
    }
    get_FullName() {
        return readU16(mscorlib.Api.RuntimeType._get_FullName(this.handle));
    }
    get_IsEnum() {
        return mscorlib.Api.RuntimeType._get_IsEnum(this.handle);
    }
    get_IsGenericParameter() {
        return mscorlib.Api.RuntimeType._get_IsGenericParameter(this.handle);
    }
    get_IsGenericType() {
        return mscorlib.Api.RuntimeType._get_IsGenericType(this.handle);
    }
    get_Name() {
        return readU16(mscorlib.Api.RuntimeType._get_Name(this.handle));
    }
    get_Namespace() {
        return readU16(mscorlib.Api.RuntimeType._get_Namespace(this.handle));
    }
    get_ReflectedType() {
        return new class_2.mscorlib_System_Type_impl(mscorlib.Api.RuntimeType._get_ReflectedType(this.handle));
    }
    get_TypeHandle() {
        return new class_1.mscorlib_System_RuntimeTypeHandle_impl(mscorlib.Api.RuntimeType._get_TypeHandle(this.handle));
    }
    get_UnderlyingSystemType() {
        return new class_2.mscorlib_System_Type_impl(mscorlib.Api.RuntimeType._get_UnderlyingSystemType(this.handle));
    }
}
exports.mscorlib_System_RuntimeType_impl = mscorlib_System_RuntimeType_impl;
mscorlib.RuntimeType = mscorlib_System_RuntimeType_impl;
},{"../RuntimeTypeHandle/class":59,"../Type/class":68,"./interface":65}],64:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./api");
require("./class");
require("./interface");
},{"./api":62,"./class":63,"./interface":65}],65:[function(require,module,exports){
"use strict";
},{}],66:[function(require,module,exports){
"use strict";
},{}],67:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_cache_getter_1 = require("decorator-cache-getter");
class mscorlibTypeAPI {
    static get _Equals_obj() {
        return Il2Cpp.Api.o("mscorlib", "System.Type", "Equals", 1, ["System.Object"], "pointer", ["pointer", "pointer"]);
    }
    static get _Equals_type() {
        return Il2Cpp.Api.o("mscorlib", "System.Type", "Equals", 1, ["System.Type"], "bool", ["pointer", "pointer"]);
    }
    static get _GetArrayRank() {
        return Il2Cpp.Api.t("mscorlib", "System.Type", "GetArrayRank", 0, "int", ["pointer"]);
    }
    static get _GetConstructor() {
        return Il2Cpp.Api.o("mscorlib", "System.Type", "GetConstructor", 1, ["System.Type[]"], "pointer", ["pointer", "pointer"]);
    }
    static get _GetEnumName() {
        return Il2Cpp.Api.t("mscorlib", "System.Type", "GetEnumName", 0, "pointer", ["pointer"]);
    }
    static get _GetEnumNames() {
        return Il2Cpp.Api.t("mscorlib", "System.Type", "GetEnumNames", 0, "pointer", ["pointer"]);
    }
    static get _GetHashCode() {
        return Il2Cpp.Api.t("mscorlib", "System.Type", "GetHashCode", 0, "int", ["pointer"]);
    }
    static get _GetType_0() {
        return Il2Cpp.Api.t("mscorlib", "System.Type", "GetType", 0, "pointer", ["pointer"]);
    }
    static get _GetType_1() {
        return Il2Cpp.Api.t("mscorlib", "System.Type", "GetType", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _ToString() {
        return Il2Cpp.Api.t("mscorlib", "System.Type", "ToString", 0, "pointer", ["pointer"]);
    }
}
__decorate([
    decorator_cache_getter_1.cache
], mscorlibTypeAPI, "_Equals_obj", null);
__decorate([
    decorator_cache_getter_1.cache
], mscorlibTypeAPI, "_Equals_type", null);
__decorate([
    decorator_cache_getter_1.cache
], mscorlibTypeAPI, "_GetArrayRank", null);
__decorate([
    decorator_cache_getter_1.cache
], mscorlibTypeAPI, "_GetConstructor", null);
__decorate([
    decorator_cache_getter_1.cache
], mscorlibTypeAPI, "_GetEnumName", null);
__decorate([
    decorator_cache_getter_1.cache
], mscorlibTypeAPI, "_GetEnumNames", null);
__decorate([
    decorator_cache_getter_1.cache
], mscorlibTypeAPI, "_GetHashCode", null);
__decorate([
    decorator_cache_getter_1.cache
], mscorlibTypeAPI, "_GetType_0", null);
__decorate([
    decorator_cache_getter_1.cache
], mscorlibTypeAPI, "_GetType_1", null);
__decorate([
    decorator_cache_getter_1.cache
], mscorlibTypeAPI, "_ToString", null);
mscorlib.Api.Type = mscorlibTypeAPI;
},{"decorator-cache-getter":105}],68:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mscorlib_System_Type_impl = void 0;
const class_1 = require("../class");
class mscorlib_System_Type_impl extends class_1.mscorlib_System_Object_impl {
    Equals_obj(obj) {
        return mscorlib.Api.Type._Equals_obj(this.handle, obj);
    }
    Equals_type(type) {
        return mscorlib.Api.Type._Equals_type(this.handle, type.handle);
    }
    GetArrayRank() {
        return mscorlib.Api.Type._GetArrayRank(this.handle).toInt32();
    }
    GetConstructor(types) {
        return mscorlib.Api.Type._GetConstructor(this.handle, types[0].handle);
    }
    GetEnumName(obj) {
        return readU16(mscorlib.Api.Type._GetEnumName(this.handle, obj));
    }
    GetEnumNames() {
        return mscorlib.Api.Type._GetEnumNames(this.handle);
    }
    GetHashCode() {
        return mscorlib.Api.Type._GetHashCode(this.handle).toInt32();
    }
    GetType_0() {
        return new mscorlib_System_Type_impl(mscorlib.Api.Type._GetType_0(this.handle));
    }
    GetType_1(typeName) {
        return new mscorlib_System_Type_impl(mscorlib.Api.Type._GetType_1(this.handle, typeName));
    }
    toString() {
        return readU16(mscorlib.Api.Type._ToString(this.handle));
    }
    get name() {
        return this.toString().split('Type: ')[1];
    }
}
exports.mscorlib_System_Type_impl = mscorlib_System_Type_impl;
mscorlib.Type = mscorlib_System_Type_impl;
},{"../class":78}],69:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./api");
require("./class");
require("./interface");
},{"./api":67,"./class":68,"./interface":70}],70:[function(require,module,exports){
"use strict";
},{}],71:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorAPI = void 0;
const class_1 = require("../../class");
require("./export");
require("./class");
require("./interface");
const decorator_cache_getter_1 = require("decorator-cache-getter");
class ColorAPI extends class_1.mscorlib_System_Object_impl {
    static get _ctor_3() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Color", ".ctor", 3, "pointer", ["pointer", "pointer", "pointer", "pointer"]);
    }
    static get _ctor_4() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Color", ".ctor", 4, "pointer", ["pointer", "pointer", "pointer", "pointer", "pointer"]);
    }
    static get _Equals_obj() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Color", "Equals", 1, ["System.Object"], "bool", ["pointer", "pointer"]);
    }
    static get _Equals_color() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Color", "Equals", 1, ["UnityEngine.Color"], "bool", ["pointer", "pointer"]);
    }
    static get _GetHashCode() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Color", "GetHashCode", 0, "uint32", ["pointer"]);
    }
    static get _toString() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Color", "ToString", 0, "pointer", ["pointer"]);
    }
    static get _ToString_str_IFormatProvider() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Color", "ToString", 2, "pointer", ["pointer", "pointer", "pointer"]);
    }
}
__decorate([
    decorator_cache_getter_1.cache
], ColorAPI, "_ctor_3", null);
__decorate([
    decorator_cache_getter_1.cache
], ColorAPI, "_ctor_4", null);
__decorate([
    decorator_cache_getter_1.cache
], ColorAPI, "_Equals_obj", null);
__decorate([
    decorator_cache_getter_1.cache
], ColorAPI, "_Equals_color", null);
__decorate([
    decorator_cache_getter_1.cache
], ColorAPI, "_GetHashCode", null);
__decorate([
    decorator_cache_getter_1.cache
], ColorAPI, "_toString", null);
__decorate([
    decorator_cache_getter_1.cache
], ColorAPI, "_ToString_str_IFormatProvider", null);
exports.ColorAPI = ColorAPI;
Il2Cpp.Api.Color = ColorAPI;
},{"../../class":78,"./class":72,"./export":73,"./interface":74,"decorator-cache-getter":105}],72:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorImpl = void 0;
const class_1 = require("../class");
const api_1 = require("./api");
class ColorImpl extends class_1.mscorlib_System_ValueType {
    r;
    g;
    b;
    a;
    constructor(mPtr) {
        super(mPtr);
        this.r = mPtr.readU8();
        this.g = mPtr.add(8).readU8();
        this.b = mPtr.add(16).readU8();
        this.a = mPtr.add(24).readU8();
    }
    ctor_3(r, g, b) {
        return new ColorImpl(api_1.ColorAPI._ctor_3(this.handle, r, g, b));
    }
    ctor_4(r, g, b, a) {
        return new ColorImpl(api_1.ColorAPI._ctor_4(this.handle, r, g, b, a));
    }
    Equals_obj(obj) {
        return api_1.ColorAPI._Equals_obj(this.handle, obj);
    }
    Equals_color(color) {
        return api_1.ColorAPI._Equals_color(this.handle, color.handle);
    }
    GetHashCode() {
        return api_1.ColorAPI._GetHashCode(this.handle);
    }
    toString() {
        return readU16(api_1.ColorAPI._toString(this.handle));
    }
    toString_str_IFormatProvider(format, provider) {
        return readU16(api_1.ColorAPI._ToString_str_IFormatProvider(this.handle, format, provider));
    }
}
exports.ColorImpl = ColorImpl;
Il2Cpp.Color = ColorImpl;
},{"../class":76,"./api":71}],73:[function(require,module,exports){
"use strict";
},{}],74:[function(require,module,exports){
"use strict";
},{}],75:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector3Impl = void 0;
const class_1 = require("../class");
class Vector3Impl extends class_1.mscorlib_System_ValueType {
    x;
    y;
    z;
    toFixedNum = 2;
    constructor(handle, FixedNum = 2) {
        super(handle);
        this.toFixedNum = FixedNum;
        this.x = handle.readFloat();
        this.y = handle.add(Process.pageSize).readFloat();
        this.z = handle.add(Process.pageSize * 2).readFloat();
    }
    set FixedNum(value) {
        this.toFixedNum = value;
    }
    new(x, y, z) {
        let allocMem = allocVector(0, 0, 0);
        allocMem.writeFloat(x);
        allocMem.add(Process.pageSize).writeFloat(y);
        allocMem.add(Process.pageSize * 2).writeFloat(z);
        return new Vector3Impl(allocMem);
    }
    toString() {
        return `Vector3(${this.handle}) : (${this.x.toFixed(this.toFixedNum)}, ${this.y.toFixed(this.toFixedNum)}, ${this.z.toFixed(this.toFixedNum)})`;
    }
}
exports.Vector3Impl = Vector3Impl;
Il2Cpp.Vector3 = Vector3Impl;
},{"../class":76}],76:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mscorlib_System_ValueType = void 0;
const class_1 = require("../class");
class mscorlib_System_ValueType extends class_1.mscorlib_System_Object_impl {
}
exports.mscorlib_System_ValueType = mscorlib_System_ValueType;
},{"../class":78}],77:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_cache_getter_1 = require("decorator-cache-getter");
class mscorlibObjAPI {
    static get _ctor_0() {
        return Il2Cpp.Api.t("mscorlib", "System.Object", ".ctor", 0, "pointer", ["pointer"]);
    }
    static get _toString() {
        return Il2Cpp.Api.t("mscorlib", "System.Object", "ToString", 0, "pointer", ["pointer"]);
    }
    static get _getType() {
        return Il2Cpp.Api.t("mscorlib", "System.Object", "GetType", 0, "pointer", ["pointer"]);
    }
    static get _finalize() {
        return Il2Cpp.Api.t("mscorlib", "System.Object", "finalize", 0, "pointer", ["pointer"]);
    }
    static get _getHashCode() {
        return Il2Cpp.Api.t("mscorlib", "System.Object", "getHashCode", 0, "pointer", ["pointer"]);
    }
    // 单个参数是实例方法，两个参数是静态方法，这里有bug  参数都是两个
    static get _Equals_1() {
        return Il2Cpp.Api.t("mscorlib", "System.Object", "Equals", 2, "pointer", ["pointer", "pointer"]);
    }
    static get _Equals_2() {
        return Il2Cpp.Api.t("mscorlib", "System.Object", "Equals", 2, "pointer", ["pointer", "pointer", "pointer"]);
    }
}
__decorate([
    decorator_cache_getter_1.cache
], mscorlibObjAPI, "_ctor_0", null);
__decorate([
    decorator_cache_getter_1.cache
], mscorlibObjAPI, "_toString", null);
__decorate([
    decorator_cache_getter_1.cache
], mscorlibObjAPI, "_getType", null);
__decorate([
    decorator_cache_getter_1.cache
], mscorlibObjAPI, "_finalize", null);
__decorate([
    decorator_cache_getter_1.cache
], mscorlibObjAPI, "_getHashCode", null);
__decorate([
    decorator_cache_getter_1.cache
], mscorlibObjAPI, "_Equals_1", null);
__decorate([
    decorator_cache_getter_1.cache
], mscorlibObjAPI, "_Equals_2", null);
Reflect.set(globalThis, "mscorlib", class {
});
Reflect.set(mscorlib, "Api", class {
});
mscorlib.Api.mscorlibObj = mscorlibObjAPI;
},{"decorator-cache-getter":105}],78:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mscorlib_System_Object_impl = void 0;
require("./interface");
// 拓展 mscorlib.System.Object
class mscorlib_System_Object_impl {
    handle;
    constructor(handleOrWrapper) {
        this.handle = handleOrWrapper;
    }
    ctor() {
        return mscorlib.Api.mscorlibObj._ctor_0(allocP(1));
    }
    toString() {
        return readU16(mscorlib.Api.mscorlibObj._toString(this.handle));
    }
    memberwiseClone() {
        throw new Error("Not implemented");
    }
    getType() {
        return new mscorlib.Type(mscorlib.Api.mscorlibObj._getType(this.handle));
    }
    finalize() {
        return mscorlib.Api.mscorlibObj._finalize(this.handle);
    }
    getHashCode() {
        return mscorlib.Api.mscorlibObj._getHashCode(this.handle);
    }
}
exports.mscorlib_System_Object_impl = mscorlib_System_Object_impl;
const getTypeInner = (mPtr) => {
    if (typeof mPtr == "number")
        mPtr = ptr(mPtr);
    return new mscorlib_System_Object_impl(mPtr).getType();
};
const getTypeNameInner = (mPtr) => {
    return getTypeInner(mPtr).name;
};
const getTypeParentShowInfo = (mPtr) => {
    let handle = getTypeInner(mPtr).handle;
    LOGD(`\nType => ${handle}`);
    LOGD(`Name => ${getTypeInner(mPtr).toString()}\n`);
    let describe = `${getTypeInner(mPtr).name}(${getTypeInner(mPtr).handle})`;
    let lastHandle = handle;
    for (let i = 0; i < 10; i++) {
        let baseType = new mscorlib.RuntimeType(handle).get_BaseType();
        if (lastHandle.equals(baseType.handle))
            break;
        lastHandle = baseType.handle;
        if (baseType.handle == ptr(0) || baseType.handle.isNull())
            break;
        describe += ` <--- ${baseType.name}(${baseType.handle}) `;
    }
    LOGD(`${describe}\n`);
};
mscorlib.Object = mscorlib_System_Object_impl;
globalThis.getType = getTypeInner;
globalThis.getTypeName = getTypeNameInner;
globalThis.showType = getTypeParentShowInfo;
},{"./interface":80}],79:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./api");
require("./class");
require("./interface");
require("./GUI/include");
require("./Object/include");
require("./Input/include");
require("./Physics/include");
require("./Resources/include");
require("./Times/include");
require("./Type/include");
require("./RuntimeType/include");
require("./RuntimeTypeHandle/include");
},{"./GUI/include":15,"./Input/include":16,"./Object/include":54,"./Physics/include":56,"./Resources/include":57,"./RuntimeType/include":64,"./RuntimeTypeHandle/include":60,"./Times/include":66,"./Type/include":69,"./api":77,"./class":78,"./interface":80}],80:[function(require,module,exports){
"use strict";
},{}],81:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./thread");
},{"./thread":82}],82:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attachCurrentThread = () => {
    let thread = Il2Cpp.Api._threadCurrent();
    if (thread.isNull())
        Il2Cpp.Domain.attach();
};
const detachCurrentThread = () => {
    let threadHandle = Il2Cpp.Api._threadCurrent();
    if (!threadHandle.isNull())
        new Il2Cpp.Thread(threadHandle).detach();
};
globalThis.attachCurrentThread = attachCurrentThread;
globalThis.detachCurrentThread = detachCurrentThread;
},{}],83:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./TypeExtends/_include");
},{"./TypeExtends/_include":13}],84:[function(require,module,exports){
"use strict";
},{}],85:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("frida-il2cpp-bridge");
require("./API/list");
require("./API/text");
require("./expand/include");
require("./base/base");
require("./base/breaker");
require("./base/enum");
require("./base/globle");
require("./base/info");
require("./bridge/expand/packer");
require("./bridge/fix/apiFix");
require("./bridge/fix/Il2cppClass");
require("./bridge/fix/il2cppMethod");
require("./java/info");
require("./native/std/std_deque");
require("./native/std/std_string");
require("./native/std/std_vector");
require("./utils/_include");
require("./native/include");
require("./globel");
},{"./API/list":1,"./API/text":2,"./base/base":3,"./base/breaker":4,"./base/enum":5,"./base/globle":6,"./base/info":7,"./bridge/expand/packer":9,"./bridge/fix/Il2cppClass":10,"./bridge/fix/apiFix":11,"./bridge/fix/il2cppMethod":12,"./expand/include":83,"./globel":84,"./java/info":87,"./native/include":88,"./native/std/std_deque":90,"./native/std/std_string":91,"./native/std/std_vector":92,"./utils/_include":93,"frida-il2cpp-bridge":133}],86:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
require("./include");
// setImmediate(() => Il2Cpp.perform(() => main()))
function main() {
}
exports.main = main;
globalThis.main = main;
},{"./include":85}],87:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchApp = exports.getApkInfo = void 0;
const enum_1 = require("../base/enum");
/**
 * 获取APK的一些基本信息
 */
function getApkInfo() {
    Java.perform(() => {
        LOG(getLine(100), enum_1.LogColor.C33);
        var context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext();
        var pkgInfo = context.getPackageManager().getPackageInfo(context.getPackageName(), 0);
        // var appInfo = context.getApplicationInfo()
        let appInfo = pkgInfo.applicationInfo.value;
        let labelRes = appInfo.labelRes.value;
        let strName = context.getResources().getString(labelRes);
        LOG("[*]AppName\t\t" + strName + " (UID:" + appInfo.uid.value + ")\t ID:0x" + (appInfo.labelRes.value).toString(16), enum_1.LogColor.C36);
        let flags = appInfo.flags.value;
        LOG("\t\t\tBackupable -> " + ((flags & 32768) != 0) + "\t" + "Debugable -> " + ((flags & 2) != 0), enum_1.LogColor.C36);
        let str_pkgName = context.getPackageName();
        LOG("\n[*]PkgName\t\t" + str_pkgName, enum_1.LogColor.C36);
        var verName = pkgInfo.versionName.value;
        var verCode = pkgInfo.versionCode.value;
        var targetSdkVersion = pkgInfo.applicationInfo.value.targetSdkVersion.value;
        LOG("\n[*]Verison\t\t{ " + verName + " / " + verCode + " }\t(targetSdkVersion:" + targetSdkVersion + ")", enum_1.LogColor.C36);
        let appSize = Java.use("java.io.File").$new(appInfo.sourceDir.value).length();
        LOG("\n[*]AppSize\t\t" + appSize + "\t(" + (appSize / 1024 / 1024).toFixed(2) + " MB)", enum_1.LogColor.C36);
        LOG("\n[*]Time\t\t\tInstallTime\t" + new Date(pkgInfo.firstInstallTime.value).toLocaleString(), enum_1.LogColor.C36);
        LOG("\t\t\tUpdateTime\t" + new Date(pkgInfo.lastUpdateTime.value).toLocaleString(), enum_1.LogColor.C36);
        let ApkLocation = appInfo.sourceDir.value;
        let TempFile = appInfo.dataDir.value;
        LOG("\n[*]Location\t\t" + ApkLocation + "\n\t\t\t" + getLibPath() + "\n\t\t\t" + TempFile, enum_1.LogColor.C36);
        // PackageManager.GET_SIGNATURES == 0x00000040
        let pis = context.getPackageManager().getPackageInfo(str_pkgName, 0x00000040);
        let hexDigist = (pis.signatures.value)[0].toByteArray();
        LOG("\n[*]Signatures\t\tMD5\t " + hexdigest(hexDigist, 'MD5') +
            "\n\t\t\tSHA-1\t " + hexdigest(hexDigist, 'SHA-1') +
            "\n\t\t\tSHA-256\t " + hexdigest(hexDigist, 'SHA-256'), enum_1.LogColor.C36);
        LOG("\n[*]unity.build-id\t" + getMetaData('unity.build-id'), enum_1.LogColor.C36);
        LOG(getLine(100), enum_1.LogColor.C33);
    });
    function getMetaData(key) {
        // public static final int GET_META_DATA = 0x00000080
        let context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext();
        let appInfo = context.getPackageManager().getApplicationInfo(context.getPackageName(), 0x00000080);
        let metaData = appInfo.metaData.value;
        if (null != metaData) {
            // var metaDataB = Java.cast(metaData,Java.use("android.os.BaseBundle"))
            // LOG(metaDataB.mMap.value)
            return metaData.getString(key);
        }
        return "...";
    }
    /**
     * 计算byte字节并转换为String返回
     * @param {*} paramArrayOfByte byte 字节
     * @param {*} algorithm 算法 MD5 / SHA-1 / SHA-256
     */
    function hexdigest(paramArrayOfByte, algorithm) {
        const hexDigits = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102];
        let localMessageDigest = Java.use("java.security.MessageDigest").getInstance(algorithm);
        localMessageDigest.update(paramArrayOfByte);
        let arrayOfByte = localMessageDigest.digest();
        let arrayOfChar = [];
        for (let i = 0, j = 0;; i++, j++) {
            let strLenth = algorithm == "MD5" ? 16 : (algorithm == "SHA-1" ? 20 : 32);
            if (i >= strLenth)
                return Java.use("java.lang.String").$new(arrayOfChar);
            let k = arrayOfByte[i];
            arrayOfChar[j] = hexDigits[(0xF & k >>> 4)];
            arrayOfChar[++j] = hexDigits[(k & 0xF)];
        }
    }
    function getLibPath(name = undefined) {
        let retStr = "";
        Java.perform(() => {
            let context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext();
            let libPath = context.getApplicationInfo().nativeLibraryDir.value;
            retStr = libPath + "/" + (name == undefined ? "" : name);
        });
        return retStr;
    }
}
exports.getApkInfo = getApkInfo;
/**
 * 用包名启动 APK
 * @param {String} pkgName
 */
var launchApp = (pkgName) => Java.perform(() => {
    let context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext();
    context.startActivity(Java.use("android.content.Intent").$new(context.getPackageManager().getLaunchIntentForPackage(pkgName)));
});
exports.launchApp = launchApp;
Reflect.set(globalThis, "launchApp", launchApp);
Reflect.set(globalThis, "getApkInfo", getApkInfo);
},{"../base/enum":5}],88:[function(require,module,exports){
"use strict";
// import "./qbdi/frida-qbdi"
// import "./qbdi/main-qdbi"
Object.defineProperty(exports, "__esModule", { value: true });
require("./std/_include");
},{"./std/_include":89}],89:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./std_deque");
require("./std_string");
require("./std_vector");
},{"./std_deque":90,"./std_string":91,"./std_vector":92}],90:[function(require,module,exports){
"use strict";
// std::deque of MSVC 120 (2013)
Object.defineProperty(exports, "__esModule", { value: true });
/*
_Container_proxy *_Myproxy; // from _Container_base12

_Mapptr _Map;		// pointer to array of pointers to blocks
size_type _Mapsize;	// size of map array, zero or 2^N
size_type _Myoff;	// offset of initial element
size_type _Mysize;	// current length of sequence


#define _DEQUESIZ	(sizeof (value_type) <= 1 ? 16 \
                    : sizeof (value_type) <= 2 ? 8 \
                    : sizeof (value_type) <= 4 ? 4 \
                    : sizeof (value_type) <= 8 ? 2 \
                    : 1)	// elements per block (a power of 2)
*/
class StdDeque {
    constructor(addr, valueSize, introspectElement) {
        this.addr = addr;
        this.valueSize = valueSize;
        this.introspectElement = introspectElement;
    }
    get DEQUESIZ() {
        return this.valueSize <= 1 ? 16 :
            this.valueSize <= 2 ? 8 :
                this.valueSize <= 4 ? 4 :
                    this.valueSize <= 8 ? 2 :
                        1;
    }
    get containerProxy() {
        return this.addr.readPointer();
    }
    get map() {
        return this.addr.add(Process.pointerSize).readPointer();
    }
    get mapsize() {
        return this.addr.add(Process.pointerSize * 2).readPointer();
    }
    get myoff() {
        return this.addr.add(Process.pointerSize * 3).readPointer();
    }
    get mysize() {
        return this.addr.add(Process.pointerSize * 4).readPointer();
    }
    get contents() {
        const r = [];
        const DEQUESIZ = this.DEQUESIZ;
        const map = this.map;
        const mapsize = this.mapsize;
        const myoff = this.myoff.toInt32();
        const mysize = this.mysize.toInt32();
        for (let i = myoff; i < myoff + mysize; i++) {
            const wrappedIndex = i % mapsize;
            const blockIndex = Math.floor(wrappedIndex / DEQUESIZ);
            const off = wrappedIndex % DEQUESIZ;
            const blockAddr = map.add(Process.pointerSize * blockIndex).readPointer();
            const elemAddr = blockAddr.add(this.valueSize * off);
            let elem;
            if (this.introspectElement) {
                elem = this.introspectElement(elemAddr);
            }
            else {
                elem = elemAddr.readByteArray(this.valueSize);
            }
            r.push(elem);
        }
        return r;
    }
    toString() {
        return "deque@" + this.addr +
            "{ map=" + this.map +
            ", offset=" + this.myoff +
            ", size=" + this.mysize +
            ", contents: " + this.contents + "}";
    }
}
exports.default = StdDeque;
},{}],91:[function(require,module,exports){
"use strict";
// std::string of MSVC 120 (2013)
Object.defineProperty(exports, "__esModule", { value: true });
/*
union
{
    value_type _Buf[_BUF_SIZE];
    pointer _Ptr;
};
size_type _Mysize;	// current length of string
size_type _Myres;	// current storage reserved for string
*/
const BUF_SIZE = 16;
class StdString {
    constructor(addr) {
        this.addr = addr;
    }
    get bufAddr() {
        if (this.reservedSize.compare(16) > 0) {
            return this.addr.readPointer();
        }
        else {
            return this.addr;
        }
    }
    get size() {
        return this.addr.add(BUF_SIZE).readPointer();
    }
    get reservedSize() {
        return this.addr.add(BUF_SIZE).add(Process.pointerSize).readPointer();
    }
    toString() {
        const size = this.size;
        if (size.isNull()) {
            return "<EMPTY std::string>";
        }
        return Memory.readCString(this.bufAddr, size.toInt32());
    }
}
exports.default = StdString;
},{}],92:[function(require,module,exports){
"use strict";
// std::vector of MSVC 120 (2013)
Object.defineProperty(exports, "__esModule", { value: true });
/*
pointer _Myfirst;	// pointer to beginning of array
pointer _Mylast;	// pointer to current end of sequence
pointer _Myend;		// pointer to end of array
*/
class StdVector {
    constructor(addr, options) {
        this.addr = addr;
        this.elementSize = options.elementSize ? options.elementSize : Process.pointerSize;
        this.introspectElement = options.introspectElement;
    }
    get myfirst() {
        return this.addr.readPointer();
    }
    get mylast() {
        return this.addr.add(Process.pointerSize).readPointer();
    }
    get myend() {
        return this.addr.add(2 * Process.pointerSize).readPointer();
    }
    countBetween(begin, end) {
        if (begin.isNull()) {
            return 0;
        }
        const delta = end.sub(begin);
        return delta.toInt32() / this.elementSize;
    }
    get size() {
        return this.countBetween(this.myfirst, this.mylast);
    }
    get capacity() {
        return this.countBetween(this.myfirst, this.myend);
    }
    toString() {
        let r = "std::vector(" + this.myfirst + ", " + this.mylast + ", " + this.myend + ")";
        r += "{ size: " + this.size + ", capacity: " + this.capacity;
        if (this.introspectElement) {
            r += ", content: [";
            const first = this.myfirst;
            if (!first.isNull()) {
                const last = this.mylast;
                for (let p = first; p.compare(last) < 0; p = p.add(this.elementSize)) {
                    if (p.compare(first) > 0) {
                        r += ", ";
                    }
                    r += this.introspectElement(p);
                }
            }
            r += "]";
        }
        r += " }";
        return r;
    }
}
exports.default = StdVector;
},{}],93:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./alloc");
require("./cache");
require("./caller");
require("./checkP");
require("./common");
require("./formart");
require("./logger");
require("./math");
require("./reader");
require("./stack");
require("./context");
// 不需要就注释减小体积
// import "./http"
},{"./alloc":94,"./cache":95,"./caller":96,"./checkP":97,"./common":98,"./context":99,"./formart":100,"./logger":101,"./math":102,"./reader":103,"./stack":104}],94:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allocVector = exports.allocUStr = exports.allocCStr = exports.allocS = exports.alloc = void 0;
const enum_1 = require("../base/enum");
let allocStrInner = (str, type = enum_1.TYPE_STR.C_STR) => type == enum_1.TYPE_STR.C_STR ?
    Memory.allocUtf8String(str) : Il2Cpp.Api._stringNew(Memory.allocUtf8String(str));
const allocCStr = (str) => allocStrInner(str, enum_1.TYPE_STR.C_STR);
exports.allocCStr = allocCStr;
const allocUStr = (str) => allocStrInner(str, enum_1.TYPE_STR.U_STR);
exports.allocUStr = allocUStr;
const allocS = (size = Process.pointerSize) => Memory.alloc(size);
exports.allocS = allocS;
const alloc = (size = 1) => allocS(size * p_size);
exports.alloc = alloc;
/**
 * 创建一个vector2/vector3/vector4
 * 也可使用u3d自己的函数创建
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @param {Number} w
 */
function allocVector(x, y, z, w) {
    let argsLength = arguments.length;
    argsLength = argsLength == 0 ? 3 : argsLength;
    let temp_vector = alloc(argsLength + 1);
    for (let index = 0; index < argsLength; ++index)
        temp_vector.add(Process.pointerSize * index).writeFloat(arguments[index] == undefined ? 0 : arguments[index]);
    temp_vector.add(Process.pointerSize * argsLength).writeInt(0);
    return temp_vector;
}
exports.allocVector = allocVector;
globalThis.allocCStr = allocCStr;
globalThis.allocUStr = allocUStr;
globalThis.allocVector = allocVector;
globalThis.alloc = alloc;
globalThis.allocP = allocS;
},{"../base/enum":5}],95:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runOnce = exports.cacheInstances = void 0;
function cacheInstances(Class) {
    const instanceCache = new Map();
    return new Proxy(Class, {
        construct(Target, argArray) {
            const handle = argArray[0].toUInt32();
            if (!instanceCache.has(handle)) {
                instanceCache.set(handle, new Target(argArray[0]));
            }
            return instanceCache.get(handle);
        }
    });
}
exports.cacheInstances = cacheInstances;
const runOnceCache = new Map();
function runOnce(name) {
    return function decorator(t, n, descriptor) {
        const original = descriptor.value;
        if (!runOnceCache.has(original)) {
            if (typeof original === 'function') {
                descriptor.value = function (...args) {
                    console.log("Logged at:", new Date().toLocaleString());
                    const result = original.apply(this, args);
                    console.log(`Result from ${name}: ${result}`);
                    runOnceCache.set(original, result);
                    return result;
                };
            }
        }
        return runOnceCache.get(original);
    };
}
exports.runOnce = runOnce;
},{}],96:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callFunctionRA = exports.callFunctionRCS = exports.callFunctionRUS = exports.callFunctionRF = exports.callFunctionRS = exports.callFunctionRI = exports.callFunctionRB = exports.callFunction = void 0;
const checkP_1 = require("./checkP");
const reader_1 = require("./reader");
// callFunction("strcmp",allocStr("123"),allocStr("123"))
// callFunction(["strcmp"],allocStr("123"),allocStr("123"))
// callFunction(["libc.so","strcmp"],allocStr("123"),allocStr("123"))
function callFunction(value, ...args) {
    try {
        if (value == undefined)
            return ptr(0x0);
        for (let i = 1; i <= (arguments.length < 5 ? 5 : arguments.length) - 1; i++)
            arguments[i] = arguments[i] == undefined ? ptr(0x0) : ptr(String(arguments[i]));
        return new NativeFunction((0, checkP_1.checkPointer)(value, true), 'pointer', ['pointer', 'pointer', 'pointer', 'pointer'])(arguments[1], arguments[2], arguments[3], arguments[4]);
    }
    catch (e) {
        LOG(e, LogColor.C95);
        return ptr(0);
    }
}
exports.callFunction = callFunction;
// 返回 boolean
const callFunctionRB = (mPtr, ...args) => callFunctionRI(mPtr, ...args) == 1;
exports.callFunctionRB = callFunctionRB;
// 返回值 toInt32
const callFunctionRI = (mPtr, ...args) => callFunction(mPtr, ...args).toInt32();
exports.callFunctionRI = callFunctionRI;
// readSingle
const callFunctionRS = (mPtr, ...args) => (0, reader_1.readSingle)(callFunction(mPtr, ...args));
exports.callFunctionRS = callFunctionRS;
// readFloat
const callFunctionRF = (mPtr, ...args) => alloc(p_size * 2).writePointer(callFunction(mPtr, ...args)).readFloat();
exports.callFunctionRF = callFunctionRF;
// 返回值为 Unity String
const callFunctionRUS = (mPtr, ...args) => (0, reader_1.readU16)(callFunction(mPtr, ...args));
exports.callFunctionRUS = callFunctionRUS;
// 返回值为 C String
const callFunctionRCS = (mPtr, ...args) => {
    let tmpRet = callFunction(mPtr, ...args).readCString();
    return tmpRet == null ? "" : tmpRet;
};
exports.callFunctionRCS = callFunctionRCS;
// 返回值为 [] / display / hashset size off:0x10
const callFunctionRA = (mPtr, ...args) => (0, reader_1.showArray)(callFunction(mPtr, ...args));
exports.callFunctionRA = callFunctionRA;
globalThis.callFunction = callFunction;
globalThis.callFunctionRB = callFunctionRB;
globalThis.callFunctionRI = callFunctionRI;
globalThis.callFunctionRS = callFunctionRS;
globalThis.callFunctionRF = callFunctionRF;
globalThis.callFunctionRUS = callFunctionRUS;
globalThis.callFunctionRCS = callFunctionRCS;
globalThis.callFunctionRA = callFunctionRA;
},{"./checkP":97,"./reader":103}],97:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPointer = void 0;
/**
 * 判断mPtr是不是ilbil2cpp.so中的地址,自动加上基址
 * 只会自动添加上属于libil2cpp的基地址
 * @param {Pointer} value
 * @returns ptr
 */
const checkPointer = (value, throwErr = false, showLog = false) => {
    if (typeof value === "number") {
        return calPointer(new NativePointer(value));
    }
    else if (typeof value === "string") {
        return Module.findExportByName(null, value);
    }
    else if (typeof value === "object") {
        if (value instanceof NativePointer) {
            return calPointer(value);
        }
        else if (value instanceof (Array)) {
            if (!checkValue(value)) {
                if (throwErr)
                    throw new Error("checkPointer: checkValue Error");
                else
                    return ptr(0);
            }
            switch (value.length) {
                case 1:
                    return Module.findExportByName(null, value[0]);
                case 2:
                    return Module.findExportByName(value[0], value[1]);
                case 3:
                    return find_method(value[0], value[1], value[2], value[3]);
                default:
                    if (throwErr)
                        throw new Error("checkPointer:UnKnow value length \nArray<> length must be 1,2,3");
                    else
                        return ptr(0);
            }
        }
        else {
            if (throwErr)
                throw new Error("checkPointer: Error type");
            else
                return ptr(0);
        }
    }
    return ptr(0);
    function calPointer(mPtr) {
        if (mPtr.isNull() || mPtr.compare(soAddr))
            return mPtr;
        try {
            let tmpValue = Process.findModuleByAddress(mPtr);
            if (tmpValue === null) {
                let addValue = Il2Cpp.module.base.add(mPtr);
                let tmpModule = Process.findModuleByAddress(addValue);
                if (tmpModule === null) {
                    if (throwErr)
                        throw new Error("checkPointer: can't find module");
                    else
                        return ptr(0);
                }
                else
                    return addValue;
            }
            else
                return mPtr;
        }
        catch (error) {
            if (throwErr)
                throw error;
            return ptr(0);
        }
    }
    function checkValue(value) {
        if (value.length == 3) {
            if (typeof value[0] !== "string")
                return false;
            if (typeof value[1] !== "string")
                return false;
            if (typeof value[2] !== "number")
                return false;
        }
        for (let i = 0; i < value.length; i++) {
            if (value.length != 3) {
                if (typeof value[i] !== "string")
                    return false;
            }
        }
        return true;
    }
};
exports.checkPointer = checkPointer;
globalThis.checkPointer = checkPointer;
},{}],98:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapValueToArray = exports.PTR2NativePtr = exports.filterDuplicateOBJ = exports.checkCtx = exports.cancelAllNopedFunction = exports.cancelNop = exports.nopFunction = exports.replaceFunction = exports.detachAll = exports.attachNative = exports.getJclassName = exports.SeeTypeToString = exports.getFunctionAddrFromCls = void 0;
const enum_1 = require("../base/enum");
const globle_1 = require("../base/globle");
function PTR2NativePtr(mPtr) {
    if (mPtr == undefined)
        return ptr(0);
    if (typeof mPtr == "number")
        mPtr = ptr(mPtr);
    return mPtr;
}
exports.PTR2NativePtr = PTR2NativePtr;
let map_attach_listener = (0, globle_1.GET_MAP)(enum_1.MapKAY.map_attach_listener);
const attachNative = (mPtr, mOnEnter, mOnLeave, needRecord = true) => {
    if (typeof mPtr == "number")
        mPtr = ptr(mPtr);
    if (mPtr == ptr(0))
        return;
    var passValue = new Map();
    passValue.set("org", mPtr);
    passValue.set("src", mPtr);
    passValue.set("enter", mOnEnter);
    passValue.set("leave", mOnLeave);
    passValue.set("time", new Date());
    mPtr = checkPointer(mPtr);
    let Listener = Interceptor.attach(mPtr, {
        onEnter: function (args) {
            if (mOnEnter != undefined)
                mOnEnter(args, this.context, passValue);
        },
        onLeave: function (retval) {
            if (mOnLeave != undefined)
                mOnLeave(retval, this.context, passValue);
        }
    });
    // 记录已经被Attach的函数地址以及listner,默认添加listener记录 (只有填写false的时候不记录)
    if (needRecord)
        map_attach_listener.set(String(mPtr), Listener);
};
exports.attachNative = attachNative;
// 用来记录已经被 replace 的函数地址
let arr_nop_addr = new Array();
// nop 指定函数
var nopFunction = (mPtr) => {
    if (typeof mPtr == "number")
        mPtr = ptr(mPtr);
    if (mPtr == undefined)
        return;
    replaceFunction(mPtr, () => ptr(0), true);
};
exports.nopFunction = nopFunction;
// 取消被 nop 的函数
var cancelNop = (mPtr) => {
    if (typeof mPtr == "number")
        mPtr = ptr(mPtr);
    if (mPtr == ptr(0))
        return;
    mPtr = checkPointer(mPtr);
    Interceptor.revert(mPtr);
    for (let i = 0; i < arr_nop_addr.length; i++) {
        if (String(arr_nop_addr[i]) == String(mPtr)) {
            arr_nop_addr = arr_nop_addr.splice(arr_nop_addr[i], 1);
        }
    }
};
exports.cancelNop = cancelNop;
// 取消所有已经Replace的函数
var cancelAllNopedFunction = () => arr_nop_addr.forEach((addr) => Interceptor.revert(addr));
exports.cancelAllNopedFunction = cancelAllNopedFunction;
//detach ---> A(mPtr)
const detachAll = (mPtr) => {
    let map_attach_listener = (0, globle_1.GET_MAP)(enum_1.MapKAY.map_attach_listener);
    if (typeof mPtr == "number")
        mPtr = ptr(mPtr);
    if (mPtr == undefined) {
        map_attach_listener.clear();
        Interceptor.detachAll();
    }
    else {
        let key = String(checkPointer(mPtr));
        let listener = map_attach_listener.get(key);
        if (listener != undefined) {
            listener.detach();
            map_attach_listener.delete(key);
        }
    }
};
exports.detachAll = detachAll;
function replaceFunction(mPtr, callBack, TYPENOP = true) {
    if (typeof mPtr == "number")
        mPtr = ptr(mPtr);
    let src_ptr = mPtr;
    mPtr = checkPointer(mPtr);
    // 记录已经被 Replace 的函数地址
    if (String(arr_nop_addr).indexOf(String(mPtr)) == -1) {
        arr_nop_addr.push(String(mPtr));
    }
    else {
        //先取消掉再重新 replace
        Interceptor.revert(mPtr);
    }
    // 原函数的引用也可以再replace中调用findTransform
    let srcFunc = new NativeFunction(mPtr, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer']);
    Interceptor.replace(mPtr, new NativeCallback((arg0, arg1, arg2, arg3) => {
        LOGW("\nCalled " + (TYPENOP ? "Replaced" : "Nop") + " function ---> " + mPtr + " (" + src_ptr.sub(Il2Cpp.module.base) + ")");
        let ret = callBack(srcFunc, arg0, arg1, arg2, arg3);
        return ret == null ? ptr(0) : ret;
    }, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer']));
}
exports.replaceFunction = replaceFunction;
const getFunctionAddrFromCls = (clsptr, funcName) => {
    if (typeof clsptr == "string")
        clsptr = findClass(clsptr);
    if (typeof clsptr == "number")
        clsptr = ptr(clsptr);
    let retArray = new Il2Cpp.Class(clsptr).methods;
    for (let i = 0; i < retArray.length; i++)
        if (retArray[i].name.indexOf(funcName) != -1)
            return retArray[i].relativeVirtualAddress;
    return -1;
};
exports.getFunctionAddrFromCls = getFunctionAddrFromCls;
// 查看类型的,主要用来区分transform和gameObj
const SeeTypeToString = (obj, b) => {
    if (typeof obj == "number")
        obj = ptr(obj);
    if (obj == undefined || obj == ptr(0))
        return;
    let s_type = callFunction(find_method("UnityEngine.CoreModule", "Object", "ToString", 0), obj);
    if (b == undefined) {
        LOG(readU16(s_type));
    }
    else {
        return readU16(s_type);
    }
};
exports.SeeTypeToString = SeeTypeToString;
/**
 * 自定义参数解析模板
 * 将mPtr指向的位置以 strType 类型解析并返回 String
 * 拓展解析一些常用的类，用b断某个方法的时候就可以很方便的打印出参数
 * @param {String}  typeStr     类型字符串
 * @param {Pointer} insPtr      内存指针cls
 * @param {Pointer} clsPtr      类指针（非必选）
 * @returns {String}            简写字符串描述
 */
// export const FackKnownType = (typeStr: string, insPtr: ARGM, clsPtr: ARGM = findClass(typeStr)) => {
//     if (typeof clsPtr == "number") clsPtr = ptr(clsPtr)
//     if (typeof insPtr == "number") insPtr = ptr(insPtr)
//     if (insPtr == ptr(0) && typeStr != "Boolean" && !class_is_enum(clsPtr)) return "NULL"
//     try {
//         // 数组类型的数据解析
//         if (Number(clsPtr) > 100 && typeStr.endsWith("[]")) {
//             let addr_getCount = getFunctionAddrFromCls(clsPtr, "get_Count")
//             let addr_get_Item = getFunctionAddrFromCls(clsPtr, "get_Item")
//             let arr_retStr = new Array()
//             for (let index = 0; index < callFunctionRI(addr_getCount, insPtr); index++) {
//                 let item = callFunction(addr_get_Item, insPtr, index)
//                 let type = String(typeStr).split("[]")[0]
//                 // LOG("--->" + mPtr + " " + type + " " + addr_get_Item, LogColor.RED)
//                 if (type.indexOf("Int") != -1) {
//                     // int数组转回int该有的显示类型
//                     arr_retStr.push(item.toInt32())
//                 } else if (type.indexOf(".........") != -1) {
//                     //TODO
//                 } else {
//                     // 通用解法速度偏慢，所以前面针对性的先处理一些常用的类型处理
//                     arr_retStr.push(FackKnownType(type, item, findClass(type)))
//                 }
//             }
//             return JSON.stringify(arr_retStr)
//         }
//         // Dictionary 数据解析
//         if (Number(clsPtr) > 100 && typeStr.startsWith("Dictionary")) {
//             let addr_getCount = getFunctionAddrFromCls(clsPtr, "get_Count")
//             let count = callFunction(addr_getCount, insPtr)
//             return count + "\t" + FackKnownType("-1", insPtr, 0x0)
//         }
//         // 枚举解析
//         if (Number(clsPtr) > 100 && class_is_enum(clsPtr)) {
//             let iter = alloc()
//             let field: number | NativePointer
//             let enumIndex = 0
//             while (field = GET_F<TWO_ARG>(EpFunc.il2cpp_class_get_fields)(clsPtr, iter)) {
//                 if (field == ptr(0)) break
//                 let fieldName = field.readPointer().readCString()
//                 let filedType = field.add(p_size).readPointer()
//                 let field_class = GET_F<ONE_ARG>(EpFunc.il2cpp_class_from_type)(filedType)
//                 if (String(field_class) != String(clsPtr)) continue
//                 if (Number(insPtr) == Number(enumIndex++)) return (typeStr != "1" ? "Eunm -> " : "") + fieldName
//             }
//         }
//         switch (typeStr) {
//             case "Void":
//                 return ""
//             case "String":
//                 return readU16(insPtr)
//             case "Boolean":
//                 return readBoolean(insPtr) ? "True" : "False"
//             case "Int32":
//                 return readInt(insPtr)
//             case "UInt32":
//                 return readUInt(insPtr)
//             case "Int64":
//                 return readUInt64(insPtr)
//             case "Single":
//                 return readSingle(insPtr)
//             case "Object":
//             case "Transform":
//             case "GameObject":
//                 return SeeTypeToString(insPtr, false)
//             case "Texture":
//                 let w = callFunctionRI(["UnityEngine.CoreModule", "Texture", "GetDataWidth", 0], insPtr)
//                 let h = callFunctionRI(["UnityEngine.CoreModule", "Texture", "GetDataHeight", 0], insPtr)
//                 let r = callFunctionRI(["UnityEngine.CoreModule", "Texture", "get_isReadable", 0], insPtr)
//                 let m = callFunctionRI(["UnityEngine.CoreModule", "Texture", "get_wrapMode", 0], insPtr)
//                 let r_t = r == 0 ? "False" : "True"
//                 let m_t = m == 0 ? "Repeat" : (m == 1 ? "Clamp" : (m == 2 ? "Mirror" : "MirrorOnce"))
//                 return JSON.stringify([m_t, w, h, r_t])
//             case "Component":
//                 if (insPtr == ptr(0)) return ""
//                 let mTransform = callFunction(["UnityEngine.CoreModule", "Component", "get_transform", 0], insPtr)
//                 let mGameObject = callFunction(["UnityEngine.CoreModule", "Component", "get_gameObject", 0], insPtr)
//                 let gName = getObjName(mGameObject)
//                 return gName + "\tG:" + mGameObject + " T:" + mTransform + ""
//             case "IntPtr":
//                 if (insPtr == ptr(0)) return "0x0"
//                 return callFunctionRUS(find_method('mscorlib', 'IntPtr', 'ToString', 0), insPtr)
//             case "Block":
//             case "Block`1":
//             case "UnityAction":
//             case "Action":
//             case "Action`1":
//             case "Action`2":
//                 if (insPtr == ptr(0)) return "0x0"
//                 return insPtr.add(p_size == 4 ? 0x14 : 0x10).readPointer().readPointer().sub(Il2Cpp.module.base)
//             case "Delegate":
//                 if (insPtr == ptr(0)) return "0x0"
//                 let tmp_ptr = insPtr.add(0x8).readPointer()
//                 let temp_m_target = insPtr.add(0x10).readPointer()
//                 return tmp_ptr + "(" + tmp_ptr.sub(Il2Cpp.module.base) + ")  m_target:" + temp_m_target + "  virtual:" + (insPtr.add(0x30).readInt() == 0x0 ? "false" : "true")
//             case "Char":
//                 return insPtr.readCString()
//             case "JObject":
//                 return getJclassName(insPtr, true)
//             case "OBJ":
//                 let objName = getObjName(insPtr)
//                 let tmp_type_Ptr = callFunction(["mscorlib", "Object", "GetType", 0], insPtr)
//                 let tmp_str_Ptr = callFunction(["mscorlib", "Object", "ToString", 0], insPtr)
//                 if (Number(clsPtr) == 0x1) return [objName, readU16(tmp_str_Ptr), tmp_type_Ptr]
//                 return objName + "\t\t" + readU16(tmp_str_Ptr) + " (" + tmp_type_Ptr + ")"
//             case "Image":
//                 let retStr = "Sprite : " + callFunction(["UnityEngine.UI", "Image", "get_sprite", 0], insPtr) + " | "
//                 retStr += ("Type : " + FackKnownType("Type", callFunctionRI(["UnityEngine.UI", "Image", "get_type", 0], insPtr), findClass("UnityEngine.UI", "Type")) + " | ")
//                 retStr += ("fillMethod : " + FackKnownType("FillMethod", callFunctionRI(["UnityEngine.UI", "Image", "get_fillMethod", 0], insPtr), findClass("UnityEngine.UI", "FillMethod")) + " ")
//                 return retStr
//             case "Text":
//                 return callFunctionRUS(["UnityEngine.UI", "Text", "get_text", 0], insPtr)
//             case "Vector2":
//                 return callFunctionRUS(["UnityEngine.CoreModule", "Vector2", "ToString", 0], insPtr)
//             case "Vector3":
//                 return callFunctionRUS(["UnityEngine.CoreModule", "Vector3", "ToString", 0], insPtr)
//             case "Vector4":
//                 return callFunctionRUS(["UnityEngine.CoreModule", "Vector4", "ToString", 0], insPtr)
//             case "Color":
//                 // RGBA {float,float,float,float}  这里有问题，暂时没空改
//                 return callFunctionRUS(["UnityEngine.CoreModule", "Color", "ToString", 0], insPtr)
//             case "Color32":
//                 return callFunctionRUS(["UnityEngine.CoreModule", "Color32", "ToString", 0], insPtr)
//             case "Event":
//                 return callFunctionRUS(["UnityEngine.IMGUIModule", "Event", "ToString", 0], insPtr)
//             case "Bounds":
//                 return callFunctionRUS(["UnityEngine.CoreModule", "Bounds", "ToString", 0], insPtr)
//             case "TextAsset":
//                 return callFunctionRUS(["UnityEngine.CoreModule", "TextAsset", "ToString", 0], insPtr)
//             case "Rect":
//                 return callFunctionRUS(["UnityEngine.CoreModule", "Rect", "ToString", 0], insPtr)
//             case "Ray":
//                 return callFunctionRUS(["UnityEngine.CoreModule", "Ray", "ToString", 0], insPtr)
//             case "Quaternion":
//                 return callFunctionRUS(["UnityEngine.CoreModule", "Quaternion", "ToString", 0], insPtr)
//             case "Pose":
//                 return callFunctionRUS(["UnityEngine.CoreModule", "Pose", "ToString", 0], insPtr)
//             case "Plane":
//                 return callFunctionRUS(["UnityEngine.CoreModule", "Plane", "ToString", 0], insPtr)
//             case "Type":
//                 return callFunctionRUS(["mscorlib", "Type", "ToString", 0], insPtr)
//             case "TextMeshPro":
//             case "TextMeshProUGUI":
//                 return callFunctionRUS(["Unity.TextMeshPro", "TMP_Text", "GetParsedText", 0], insPtr)
//             default:
//                 return callFunctionRUS(["mscorlib", "Object", "ToString", 0], insPtr)
//         }
//     } catch (e) {
//         // LOG(e)
//         return e
//     }
// }
// /**
//  * 解析 unity list
//  * @param {Pointer} listPtr 该类专属的list实现类指针
//  * @param {Pointer} valuePtr 带解析的list指针
//  */
// export const ShowList = (listPtr: number | NativePointer, valuePtr: number | NativePointer, type: any) => {
//     if (typeof listPtr === "number") listPtr = ptr(listPtr)
//     if (typeof valuePtr === "number") valuePtr = ptr(valuePtr)
//     if (type = undefined) lffc(listPtr, valuePtr)
//     let a_get_Count = getFunctionAddrFromCls(listPtr, "get_Count")
//     let a_get_Capacity = getFunctionAddrFromCls(listPtr, "get_Capacity")
//     let a_get_Item = getFunctionAddrFromCls(listPtr, "get_Item")
//     let Count = callFunction(a_get_Count, valuePtr).toInt32()
//     let Capacity = callFunction(a_get_Capacity, valuePtr).toInt32()
//     LOG("\nList Size " + Count + " / " + Capacity + "   " + getType(valuePtr, 1) + "\n", LogColor.RED)
//     for (let i = 0; i < Count; i++) {
//         let header = String("[" + i + "]").length == 3 ? String("[" + i + "]  ") : String("[" + i + "] ")
//         let mPtr = callFunction(a_get_Item, valuePtr, i)
//         let name = ""
//         try {
//             name = getObjName(mPtr)
//         } catch (e) {
//             name = FackKnownType("-1", mPtr)
//         }
//         LOG(header + mPtr + "\t\t" + name, LogColor.C36)
//     }
//     LOG("\n" + FackKnownType("-1", valuePtr) + "\n", LogColor.YELLOW)
// }
/**
 * 未找到 void *Art::Current() 就将就这么用一下
 * 运行这个 getJclassName 函数时候再两秒钟内触发一下 DecodeJObject 函数即可得到 jclsName
 *
 * 参考链接：
 * https://www.jianshu.com/p/dba5e5ef2ad5?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation
 * https://cs.android.com/android/platform/superproject/+/master:art/runtime/mirror/class.cc;l=1634;bpv=1;bpt=1?q=class.cc&sq=&ss=android%2Fplatform%2Fsuperproject
 * @param {*} jclsName
 */
const getJclassName = (jclsName, ShouldRet) => {
    ShouldRet == undefined ? false : true;
    let pVoid = callFunction((0, globle_1.GET_F)(enum_1.EpFunc.DecodeJObject), (0, globle_1.GET_F)(enum_1.EpFunc.ArtCurrent), jclsName);
    let k_class = callFunction((0, globle_1.GET_F)(enum_1.EpFunc.GetDescriptor), pVoid, alloc());
    if (ShouldRet)
        return String(k_class.readCString());
    LOG("\n" + String(k_class.readCString()) + "\n", enum_1.LogColor.C36);
};
exports.getJclassName = getJclassName;
function checkCtx(lr) {
    if (typeof lr === "number")
        lr = ptr(lr);
    let md = Process.findModuleByAddress(lr);
    if (md == null) {
        LOGE("Module not found");
        return;
    }
    return ptr(lr).sub(md.base) + `|${md.name}`;
}
exports.checkCtx = checkCtx;
const mapValueToArray = (map) => {
    var list = [];
    for (var key in map)
        list.push([key, map.get(key)]);
    return list;
};
exports.mapValueToArray = mapValueToArray;
/**
 * 大于最大出现次数返回值为 -1
 * 主要是为了过滤比如setActive中重复出现的一直频繁调用的obj
 * @param {String} objstr 重复出现的str
 * @param {int} maxCount 最大出现次数
 * @returns ? -1
 */
const filterDuplicateOBJ = (objstr, maxCount = 10) => {
    if (!(0, globle_1.GET_MAP)(enum_1.MapKAY.outFilterMap).has(objstr)) {
        (0, globle_1.SET_MAP_VALUE)(enum_1.MapKAY.outFilterMap, objstr, 0);
        return 0;
    }
    let count = Number((0, globle_1.GET_MAP_VALUE)(enum_1.MapKAY.outFilterMap, objstr)) + 1;
    (0, globle_1.SET_MAP_VALUE)(enum_1.MapKAY.outFilterMap, objstr, count);
    return (count >= maxCount) ? -1 : count;
};
exports.filterDuplicateOBJ = filterDuplicateOBJ;
Number.prototype.add = (num) => {
    return Number(this) + Number(num);
};
globalThis.d = detachAll;
globalThis.A = attachNative;
globalThis.n = nopFunction;
globalThis.nn = cancelNop;
globalThis.nnn = cancelAllNopedFunction;
globalThis.R = replaceFunction;
globalThis.getJclassName = getJclassName;
globalThis.checkCtx = checkCtx;
globalThis.filterDuplicateOBJ = filterDuplicateOBJ;
},{"../base/enum":5,"../base/globle":6}],99:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printCtx = void 0;
const enum_1 = require("../base/enum");
/**
 * 展示代码上下文
 * @param {Pointer} mPtr 指针位置
 * @param {Int} range 展示的范围
 * @param {Int} type 1:正向 2:反向(小端存储，同IDA)   不填写着以当前pointer为中心位置打印信息
 */
var printCtx = (mPtr, range = 5, type = 0, redLine = enum_1.LogColor.WHITE, space = 0) => {
    if (Process.arch != "arm")
        return;
    mPtr = checkPointer(mPtr);
    if (mPtr.isNull())
        return;
    if (type != 0) {
        for (let offset = 0; offset < range; offset++)
            printLOG(mPtr, offset);
    }
    else {
        let max = range == undefined ? 5 : (range % 2 == 1 ? (range + 1) : range) / 2;
        let min = range == undefined ? -4 : max - range;
        for (let offset = min; offset < max; offset++)
            printLOG(mPtr, offset);
    }
    function printLOG(pointer, offset) {
        let cur_p = pointer.add(p_size * offset);
        let cur_value = String(cur_p.readPointer());
        // fix 12 00 00 0A => 0x0A00012 少一个0的情况 
        if (Process.arch == "arm" && cur_value.length != 10)
            cur_value = cur_value.replace("000", "0000");
        let cur_tmp = Array.from(cur_value.toUpperCase());
        let cur_str = (cur_tmp.length == 10) ? cur_value : "";
        if (type == 1) {
            cur_str = cur_tmp[2] + cur_tmp[3] + ' ' + cur_tmp[4] + cur_tmp[5] + ' ' + cur_tmp[6] + cur_tmp[7] + ' ' + cur_tmp[8] + cur_tmp[9];
        }
        else if (type == 2) {
            cur_str = cur_tmp[8] + cur_tmp[9] + ' ' + cur_tmp[6] + cur_tmp[7] + ' ' + cur_tmp[4] + cur_tmp[5] + ' ' + cur_tmp[2] + cur_tmp[3];
        }
        try {
            LOG(getLine(space, "\t") + cur_p + "\t" + cur_str + "\t" + Instruction.parse(cur_p), redLine);
        }
        catch (e) { }
    }
};
exports.printCtx = printCtx;
globalThis.printCtx = printCtx;
},{"../base/enum":5}],100:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formartClass = void 0;
const enum_1 = require("../base/enum");
class formartClass {
    static printTitile = (strTitle, Line1 = enum_1.LogColor.C33, Line2 = enum_1.LogColor.C33, Line3 = enum_1.LogColor.C33) => {
        let len = strTitle.length + 2;
        LOG(` ${getLine(len)} `, Line1);
        LOG(`| ${strTitle} |`, Line2);
        LOG(` ${getLine(len)} `, Line3);
        return len;
    };
    static linesMap = new Map();
    static getLine = (length, fillStr = "-") => {
        let key = length + "|" + fillStr;
        if (formartClass.linesMap.get(key) != null)
            return formartClass.linesMap.get(key);
        for (var index = 0, tmpRet = ""; index < length; index++)
            tmpRet += fillStr;
        formartClass.linesMap.set(key, tmpRet);
        return tmpRet;
    };
    static alignStr(str, size = 13, fillStr = ".") {
        let srcSize = str.length;
        if (srcSize >= size) {
            str = str.substring(0, size - 1);
            str += fillStr;
        }
        else
            for (let i = size - srcSize; i > 0; i--)
                str += " ";
        return str;
    }
    /**
     * 字符串指定位置添加元素
     * @param str1:原字符串
     * @param n:插入位置
     * @param str2:插入元素
     * @return  拼接后的字符串
     */
    static insertStr(str1, n, str2) {
        var s1 = '';
        var s2 = '';
        if (str1.length < n) {
            return str1 + "" + str2;
        }
        else {
            s1 = str1.substring(0, n);
            s2 = str1.substring(n, str1.length);
            return `${s1}${str2}${s2}`;
        }
    }
    static getPtrFormart = (ptr, size = String(Il2Cpp.module.base).length) => {
        let str = ptr.toString(16);
        if (str.length > size)
            return str.substring(0, size - 1) + ".";
        for (let i = size - str.length; i > 0; i--)
            str += " ";
        return `0x${str}`;
    };
}
exports.formartClass = formartClass;
globalThis.insertStr = formartClass.insertStr;
},{"../base/enum":5}],101:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLine = exports.printLogColors = exports.LOGH = exports.LOGO = exports.LOGD = exports.LOGE = exports.LOGW = exports.LOGS = exports.LOG = void 0;
const enum_1 = require("../base/enum");
const globle_1 = require("../base/globle");
const formart_1 = require("./formart");
const setNeedLog = (flag) => (0, globle_1.SET_G)(enum_1.GKEY.LogFlag, flag);
const getNeedLog = () => (0, globle_1.GET_GT)(enum_1.GKEY.LogFlag);
const LOG = (str, type = enum_1.LogColor.WHITE) => {
    switch (type) {
        case enum_1.LogColor.WHITE:
            console.log(str);
            break;
        case enum_1.LogColor.RED:
            console.error(str);
            break;
        case enum_1.LogColor.YELLOW:
            console.warn(str);
            break;
        default:
            console.log("\x1b[" + type + "m" + str + "\x1b[0m");
            break;
    }
};
exports.LOG = LOG;
const colorEndDes = "\x1b[0m";
const colorStartDes = (color) => {
    return `\x1b[${color}m`;
};
// not used
const LOGS = (str, colorDescription = [[0, str.length, enum_1.LogColor.RED]]) => {
    let localStr = str;
    for (let i = 0; i < colorDescription.length; i++) {
        const [start, end, color] = colorDescription[i];
        let strStart = colorStartDes(color);
        localStr = formart_1.formartClass.insertStr(localStr, start, strStart);
        localStr = formart_1.formartClass.insertStr(localStr, end + strStart.length, colorEndDes);
    }
    console.log(localStr);
};
exports.LOGS = LOGS;
const LOGW = (msg) => (0, exports.LOG)(msg, enum_1.LogColor.YELLOW);
exports.LOGW = LOGW;
const LOGE = (msg) => (0, exports.LOG)(msg, enum_1.LogColor.RED);
exports.LOGE = LOGE;
const LOGD = (msg) => (0, exports.LOG)(msg, enum_1.LogColor.C36);
exports.LOGD = LOGD;
const LOGO = (msg) => (0, exports.LOG)(msg, enum_1.LogColor.C33);
exports.LOGO = LOGO;
const LOGH = (msg) => (0, exports.LOG)(msg, enum_1.LogColor.C96);
exports.LOGH = LOGH;
function printLogColors() {
    let str = "123456789";
    console.log("----------------  listLogColors  ----------------");
    for (let i = 30; i <= 37; i++) {
        console.log(`\t\t${colorStartDes(i)} C${i}\t${str} ${colorEndDes}`);
    }
    console.log("----------------------------------------------");
    for (let i = 40; i <= 47; i++) {
        console.log(`\t\t${colorStartDes(i)} C${i}\t${str} ${colorEndDes}`);
    }
    console.log("----------------------------------------------");
    for (let i = 90; i <= 97; i++) {
        console.log(`\t\t${colorStartDes(i)} C${i}\t${str} ${colorEndDes}`);
    }
    console.log("----------------------------------------------");
    for (let i = 100; i <= 107; i++) {
        console.log(`\t\t${colorStartDes(i)} C${i}\t${str} ${colorEndDes}`);
    }
    console.log("----------------------------------------------");
}
exports.printLogColors = printLogColors;
let linesMap = new Map();
const getLine = (length, fillStr = "-") => {
    if (length == 0)
        return "";
    let key = length + "|" + fillStr;
    if (linesMap.get(key) != null)
        return linesMap.get(key);
    for (var index = 0, tmpRet = ""; index < length; index++)
        tmpRet += fillStr;
    linesMap.set(key, tmpRet);
    return tmpRet;
};
exports.getLine = getLine;
globalThis.LOG = exports.LOG;
// globalThis.LOGS = LOGS
globalThis.LOGW = exports.LOGW;
globalThis.LOGE = exports.LOGE;
globalThis.LOGD = exports.LOGD;
globalThis.LOGO = exports.LOGO;
globalThis.LOGH = exports.LOGH;
globalThis.getLine = exports.getLine;
globalThis.printLogColors = printLogColors;
globalThis.LogColor = enum_1.LogColor;
},{"../base/enum":5,"../base/globle":6,"./formart":100}],102:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Random = exports.randomSeed = void 0;
function randomSeed() {
    return Math.floor(Math.random() * 2 ** 31);
}
exports.randomSeed = randomSeed;
class Random {
    seed;
    constructor(seed) {
        this.seed = seed;
    }
    next = () => this.seed ? ((2 ** 31 - 1) & (this.seed = Math.imul(48271, this.seed))) / 2 ** 31 : Math.random();
    nextInt = (min, max) => Math.floor(this.next() * (max - min + 1) + min);
}
exports.Random = Random;
},{}],103:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFloat = exports.seeHexA = exports.seeHexR = exports.showArray = exports.readU16 = exports.readInt64 = exports.readUInt64 = exports.readUInt = exports.readInt = exports.readBoolean = exports.readSingle = void 0;
const enum_1 = require("../base/enum");
const common_1 = require("./common");
// 读取浮点数 ptr().readFloat() === readSingle(ptr().readPointer())
const readSingle = (value) => alloc(2).writePointer(value).readFloat();
exports.readSingle = readSingle;
const readBoolean = (value) => alloc(0.25).writePointer(value).readU8() == 0x1;
exports.readBoolean = readBoolean;
const readInt = (value) => alloc().writePointer(value).readInt();
exports.readInt = readInt;
const readUInt = (value) => alloc(1).writePointer(value).readUInt();
exports.readUInt = readUInt;
const readInt64 = (value) => alloc(2).writePointer(value).readS64();
exports.readInt64 = readInt64;
const readUInt64 = (value) => alloc(2).writePointer(value).readU64();
exports.readUInt64 = readUInt64;
/**
 * 读取 c# 字符串
 * @param {Number} mPtr c#字符串指针}
 */
const readU16 = (mPtr) => {
    if (typeof mPtr == "number")
        mPtr = ptr(mPtr);
    if (mPtr == undefined || mPtr == ptr(0))
        return "";
    try {
        return mPtr.add(p_size * 2 + 4).readUtf16String();
    }
    catch (e) {
        return "";
    }
};
exports.readU16 = readU16;
const showArray = (mPtr) => {
    if (typeof mPtr == "number")
        mPtr = ptr(mPtr);
    if (mPtr == undefined || mPtr == ptr(0))
        return;
    let retPtr = mPtr;
    let arrLength = retPtr.add(p_size * 3).readUInt();
    LOGD("\n[*] Array length : " + arrLength + "  |  RET => " + retPtr + "\n");
    if (arrLength == 0)
        return;
    seeHexA(retPtr.add(p_size * 4), (arrLength > 32 ? 32 : arrLength) * p_size, false, enum_1.LogColor.C33);
    LOG("\n");
    for (let i = 0; i < arrLength; ++i) {
        let tmpPtr = retPtr.add(p_size * (4 + i));
        let ObjToString = callFunctionRUS(find_method("mscorlib", "Object", "ToString", 0), tmpPtr.readPointer());
        if (ObjToString == "UnityEngine.UI.Text")
            ObjToString += ("\t" + callFunctionRUS(find_method("UnityEngine.UI", "Text", "get_text", 0), tmpPtr.readPointer()));
        LOGD(String("[" + i + "]").padEnd(5, " ") + " " + tmpPtr + " ---> " + tmpPtr.readPointer() + "  |  " + ObjToString);
    }
    LOG("\n");
};
exports.showArray = showArray;
var seeHexR = (addr, length = 0x40, color) => {
    addr = (0, common_1.PTR2NativePtr)(addr);
    LOG(hexdump(addr.readPointer(), {
        length: length
    }), color == undefined ? enum_1.LogColor.WHITE : color);
};
exports.seeHexR = seeHexR;
var seeHexA = (addr, length = 0x40, header = true, color) => {
    addr = (0, common_1.PTR2NativePtr)(addr);
    LOG(hexdump(addr, {
        length: length,
        header: header,
    }), color == undefined ? enum_1.LogColor.WHITE : color);
};
exports.seeHexA = seeHexA;
const getFloat = (intNum) => alloc(1).writeFloat(intNum).readPointer();
exports.getFloat = getFloat;
globalThis.readSingle = readSingle;
globalThis.readBoolean = readBoolean;
globalThis.readInt = readInt;
globalThis.readUInt = readUInt;
globalThis.readInt64 = readInt64;
globalThis.readUInt64 = readUInt64;
globalThis.readU16 = readU16;
globalThis.showArray = showArray;
globalThis.seeHexR = seeHexR;
globalThis.seeHexA = seeHexA;
},{"../base/enum":5,"./common":98}],104:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetStackTraceN = exports.GetStackTrace = exports.PrintStackTraceN = exports.PrintStackTrace = void 0;
// 打印java堆栈
const PrintStackTrace = () => LOG(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()), LogColor.C36);
exports.PrintStackTrace = PrintStackTrace;
// 打印native堆栈
const PrintStackTraceN = (ctx, retText = false, slice = 6, reverse = false) => {
    let tmpText = "";
    if (reverse) {
        tmpText = Thread.backtrace(ctx, Backtracer.FUZZY)
            .slice(0, slice)
            .reverse()
            .map(DebugSymbol.fromAddress).join("\n");
    }
    else {
        tmpText = Thread.backtrace(ctx, Backtracer.FUZZY)
            .slice(0, slice)
            .map(DebugSymbol.fromAddress).join("\n");
    }
    return !retText ? LOGD(tmpText) : tmpText;
};
exports.PrintStackTraceN = PrintStackTraceN;
var GetStackTrace = () => Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new());
exports.GetStackTrace = GetStackTrace;
var GetStackTraceN = (ctx, level = 6) => {
    return Thread.backtrace(ctx, Backtracer.FUZZY)
        .slice(0, level)
        // .reverse()
        .map(frame => DebugSymbol.fromAddress(frame))
        // .map(symbol => `${getLine(level==undefined?0:level,"\n")}${symbol}\n`)
        .join("\n");
};
exports.GetStackTraceN = GetStackTraceN;
globalThis.PrintStackTrace = PrintStackTrace;
globalThis.PrintStackTraceN = PrintStackTraceN;
globalThis.GetStackTrace = GetStackTrace;
globalThis.GetStackTraceN = GetStackTraceN;
},{}],105:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
function cache(target, name, descriptor) {
    var getter = descriptor.get;
    if (!getter)
        throw new TypeError("Getter property descriptor expected");
    descriptor.get = function () {
        var value = getter.call(this);
        Object.defineProperty(this, name, {
            configurable: descriptor.configurable,
            enumerable: descriptor.enumerable,
            writable: false,
            value: value
        });
        return value;
    };
}
exports.cache = cache;

},{}],106:[function(require,module,exports){
"use strict";
const peq = new Uint32Array(0x10000);
const myers_32 = (a, b) => {
  const n = a.length;
  const m = b.length;
  const lst = 1 << (n - 1);
  let pv = -1;
  let mv = 0;
  let sc = n;
  let i = n;
  while (i--) {
    peq[a.charCodeAt(i)] |= 1 << i;
  }
  for (i = 0; i < m; i++) {
    let eq = peq[b.charCodeAt(i)];
    const xv = eq | mv;
    eq |= ((eq & pv) + pv) ^ pv;
    mv |= ~(eq | pv);
    pv &= eq;
    if (mv & lst) {
      sc++;
    }
    if (pv & lst) {
      sc--;
    }
    mv = (mv << 1) | 1;
    pv = (pv << 1) | ~(xv | mv);
    mv &= xv;
  }
  i = n;
  while (i--) {
    peq[a.charCodeAt(i)] = 0;
  }
  return sc;
};

const myers_x = (a, b) => {
  const n = a.length;
  const m = b.length;
  const mhc = [];
  const phc = [];
  const hsize = Math.ceil(n / 32);
  const vsize = Math.ceil(m / 32);
  let score = m;
  for (let i = 0; i < hsize; i++) {
    phc[i] = -1;
    mhc[i] = 0;
  }
  let j = 0;
  for (; j < vsize - 1; j++) {
    let mv = 0;
    let pv = -1;
    const start = j * 32;
    const end = Math.min(32, m) + start;
    for (let k = start; k < end; k++) {
      peq[b.charCodeAt(k)] |= 1 << k;
    }
    score = m;
    for (let i = 0; i < n; i++) {
      const eq = peq[a.charCodeAt(i)];
      const pb = (phc[(i / 32) | 0] >>> i) & 1;
      const mb = (mhc[(i / 32) | 0] >>> i) & 1;
      const xv = eq | mv;
      const xh = ((((eq | mb) & pv) + pv) ^ pv) | eq | mb;
      let ph = mv | ~(xh | pv);
      let mh = pv & xh;
      if ((ph >>> 31) ^ pb) {
        phc[(i / 32) | 0] ^= 1 << i;
      }
      if ((mh >>> 31) ^ mb) {
        mhc[(i / 32) | 0] ^= 1 << i;
      }
      ph = (ph << 1) | pb;
      mh = (mh << 1) | mb;
      pv = mh | ~(xv | ph);
      mv = ph & xv;
    }
    for (let k = start; k < end; k++) {
      peq[b.charCodeAt(k)] = 0;
    }
  }
  let mv = 0;
  let pv = -1;
  const start = j * 32;
  const end = Math.min(32, m - start) + start;
  for (let k = start; k < end; k++) {
    peq[b.charCodeAt(k)] |= 1 << k;
  }
  score = m;
  for (let i = 0; i < n; i++) {
    const eq = peq[a.charCodeAt(i)];
    const pb = (phc[(i / 32) | 0] >>> i) & 1;
    const mb = (mhc[(i / 32) | 0] >>> i) & 1;
    const xv = eq | mv;
    const xh = ((((eq | mb) & pv) + pv) ^ pv) | eq | mb;
    let ph = mv | ~(xh | pv);
    let mh = pv & xh;
    score += (ph >>> (m - 1)) & 1;
    score -= (mh >>> (m - 1)) & 1;
    if ((ph >>> 31) ^ pb) {
      phc[(i / 32) | 0] ^= 1 << i;
    }
    if ((mh >>> 31) ^ mb) {
      mhc[(i / 32) | 0] ^= 1 << i;
    }
    ph = (ph << 1) | pb;
    mh = (mh << 1) | mb;
    pv = mh | ~(xv | ph);
    mv = ph & xv;
  }
  for (let k = start; k < end; k++) {
    peq[b.charCodeAt(k)] = 0;
  }
  return score;
};

const distance = (a, b) => {
  if (a.length > b.length) {
    const tmp = b;
    b = a;
    a = tmp;
  }
  if (a.length === 0) {
    return b.length;
  }
  if (a.length <= 32) {
    return myers_32(a, b);
  }
  return myers_x(a, b);
};

const closest = (str, arr) => {
  let min_distance = Infinity;
  let min_index = 0;
  for (let i = 0; i < arr.length; i++) {
    const dist = distance(str, arr[i]);
    if (dist < min_distance) {
      min_distance = dist;
      min_index = i;
    }
  }
  return arr[min_index];
};

module.exports = {
  closest, distance
}

},{}],107:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_cache_getter_1 = require("decorator-cache-getter");
const versioning_1 = __importDefault(require("versioning"));
const console_1 = require("../utils/console");
class Il2CppApi {
    constructor() { }
    static get _alloc() {
        return this.r("il2cpp_alloc", "pointer", ["size_t"]);
    }
    static get _arrayGetElements() {
        return this.r("il2cpp_array_get_elements", "pointer", ["pointer"]);
    }
    static get _arrayGetLength() {
        return this.r("il2cpp_array_length", "uint32", ["pointer"]);
    }
    static get _arrayNew() {
        return this.r("il2cpp_array_new", "pointer", ["pointer", "uint32"]);
    }
    static get _assemblyGetImage() {
        return this.r("il2cpp_assembly_get_image", "pointer", ["pointer"]);
    }
    static get _classForEach() {
        return this.r("il2cpp_class_for_each", "void", ["pointer", "pointer"]);
    }
    static get _classFromName() {
        return this.r("il2cpp_class_from_name", "pointer", ["pointer", "pointer", "pointer"]);
    }
    static get _classFromSystemType() {
        return this.r("il2cpp_class_from_system_type", "pointer", ["pointer"]);
    }
    static get _classFromType() {
        return this.r("il2cpp_class_from_type", "pointer", ["pointer"]);
    }
    static get _classGetActualInstanceSize() {
        return this.r("il2cpp_class_get_actual_instance_size", "int32", ["pointer"]);
    }
    static get _classGetArrayClass() {
        return this.r("il2cpp_array_class_get", "pointer", ["pointer", "uint32"]);
    }
    static get _classGetArrayElementSize() {
        return this.r("il2cpp_class_array_element_size", "int", ["pointer"]);
    }
    static get _classGetAssemblyName() {
        return this.r("il2cpp_class_get_assemblyname", "pointer", ["pointer"]);
    }
    static get _classGetBaseType() {
        return this.r("il2cpp_class_enum_basetype", "pointer", ["pointer"]);
    }
    static get _classGetDeclaringType() {
        return this.r("il2cpp_class_get_declaring_type", "pointer", ["pointer"]);
    }
    static get _classGetElementClass() {
        return this.r("il2cpp_class_get_element_class", "pointer", ["pointer"]);
    }
    static get _classGetFieldFromName() {
        return this.r("il2cpp_class_get_field_from_name", "pointer", ["pointer", "pointer"]);
    }
    static get _classGetFields() {
        return this.r("il2cpp_class_get_fields", "pointer", ["pointer", "pointer"]);
    }
    static get _classGetFlags() {
        return this.r("il2cpp_class_get_flags", "int", ["pointer"]);
    }
    static get _classGetImage() {
        return this.r("il2cpp_class_get_image", "pointer", ["pointer"]);
    }
    static get _classGetInstanceSize() {
        return this.r("il2cpp_class_instance_size", "int32", ["pointer"]);
    }
    static get _classGetInterfaces() {
        return this.r("il2cpp_class_get_interfaces", "pointer", ["pointer", "pointer"]);
    }
    static get _classGetMethodFromName() {
        return this.r("il2cpp_class_get_method_from_name", "pointer", ["pointer", "pointer", "int"]);
    }
    static get _classGetMethods() {
        return this.r("il2cpp_class_get_methods", "pointer", ["pointer", "pointer"]);
    }
    static get _classGetName() {
        return this.r("il2cpp_class_get_name", "pointer", ["pointer"]);
    }
    static get _classGetNamespace() {
        return this.r("il2cpp_class_get_namespace", "pointer", ["pointer"]);
    }
    static get _classGetNestedClasses() {
        return this.r("il2cpp_class_get_nested_types", "pointer", ["pointer", "pointer"]);
    }
    static get _classGetParent() {
        return this.r("il2cpp_class_get_parent", "pointer", ["pointer"]);
    }
    static get _classGetRank() {
        return this.r("il2cpp_class_get_rank", "int", ["pointer"]);
    }
    static get _classGetStaticFieldData() {
        return this.r("il2cpp_class_get_static_field_data", "pointer", ["pointer"]);
    }
    static get _classGetValueSize() {
        return this.r("il2cpp_class_value_size", "int32", ["pointer", "pointer"]);
    }
    static get _classGetType() {
        return this.r("il2cpp_class_get_type", "pointer", ["pointer"]);
    }
    static get _classHasReferences() {
        return this.r("il2cpp_class_has_references", "bool", ["pointer"]);
    }
    static get _classInit() {
        return this.r("il2cpp_runtime_class_init", "void", ["pointer"]);
    }
    static get _classIsAbstract() {
        return this.r("il2cpp_class_is_abstract", "bool", ["pointer"]);
    }
    static get _classIsAssignableFrom() {
        return this.r("il2cpp_class_is_assignable_from", "bool", ["pointer", "pointer"]);
    }
    static get _classIsBlittable() {
        return this.r("il2cpp_class_is_blittable", "bool", ["pointer"]);
    }
    static get _classIsEnum() {
        return this.r("il2cpp_class_is_enum", "bool", ["pointer"]);
    }
    static get _classIsGeneric() {
        return this.r("il2cpp_class_is_generic", "bool", ["pointer"]);
    }
    static get _classIsInflated() {
        return this.r("il2cpp_class_is_inflated", "bool", ["pointer"]);
    }
    static get _classIsInterface() {
        return this.r("il2cpp_class_is_interface", "bool", ["pointer"]);
    }
    static get _classIsSubclassOf() {
        return this.r("il2cpp_class_is_subclass_of", "bool", ["pointer", "pointer", "bool"]);
    }
    static get _classIsValueType() {
        return this.r("il2cpp_class_is_valuetype", "bool", ["pointer"]);
    }
    static get _domainAssemblyOpen() {
        return this.r("il2cpp_domain_assembly_open", "pointer", ["pointer", "pointer"]);
    }
    static get _domainGet() {
        return this.r("il2cpp_domain_get", "pointer", []);
    }
    static get _domainGetAssemblies() {
        return this.r("il2cpp_domain_get_assemblies", "pointer", ["pointer", "pointer"]);
    }
    static get _fieldGetModifier() {
        return this.r("il2cpp_field_get_modifier", "pointer", ["pointer"]);
    }
    static get _fieldGetClass() {
        return this.r("il2cpp_field_get_parent", "pointer", ["pointer"]);
    }
    static get _fieldGetFlags() {
        return this.r("il2cpp_field_get_flags", "int", ["pointer"]);
    }
    static get _fieldGetName() {
        return this.r("il2cpp_field_get_name", "pointer", ["pointer"]);
    }
    static get _fieldGetOffset() {
        return this.r("il2cpp_field_get_offset", "int32", ["pointer"]);
    }
    static get _fieldGetStaticValue() {
        return this.r("il2cpp_field_static_get_value", "void", ["pointer", "pointer"]);
    }
    static get _fieldGetType() {
        return this.r("il2cpp_field_get_type", "pointer", ["pointer"]);
    }
    static get _fieldIsLiteral() {
        return this.r("il2cpp_field_is_literal", "bool", ["pointer"]);
    }
    static get _fieldIsStatic() {
        return this.r("il2cpp_field_is_static", "bool", ["pointer"]);
    }
    static get _fieldIsThreadStatic() {
        return this.r("il2cpp_field_is_thread_static", "bool", ["pointer"]);
    }
    static get _fieldSetStaticValue() {
        return this.r("il2cpp_field_static_set_value", "void", ["pointer", "pointer"]);
    }
    static get _free() {
        return this.r("il2cpp_free", "void", ["pointer"]);
    }
    static get _gcCollect() {
        return this.r("il2cpp_gc_collect", "void", ["int"]);
    }
    static get _gcCollectALittle() {
        return this.r("il2cpp_gc_collect_a_little", "void", []);
    }
    static get _gcDisable() {
        return this.r("il2cpp_gc_disable", "void", []);
    }
    static get _gcEnable() {
        return this.r("il2cpp_gc_enable", "void", []);
    }
    static get _gcGetHeapSize() {
        return this.r("il2cpp_gc_get_heap_size", "int64", []);
    }
    static get _gcGetMaxTimeSlice() {
        return this.r("il2cpp_gc_get_max_time_slice_ns", "int64", []);
    }
    static get _gcGetUsedSize() {
        return this.r("il2cpp_gc_get_used_size", "int64", []);
    }
    static get _gcHandleGetTarget() {
        return this.r("il2cpp_gchandle_get_target", "pointer", ["uint32"]);
    }
    static get _gcHandleFree() {
        return this.r("il2cpp_gchandle_free", "void", ["uint32"]);
    }
    static get _gcHandleNew() {
        return this.r("il2cpp_gchandle_new", "uint32", ["pointer", "bool"]);
    }
    static get _gcHandleNewWeakRef() {
        return this.r("il2cpp_gchandle_new_weakref", "uint32", ["pointer", "bool"]);
    }
    static get _gcIsDisabled() {
        return this.r("il2cpp_gc_is_disabled", "bool", []);
    }
    static get _gcIsIncremental() {
        return this.r("il2cpp_gc_is_incremental", "bool", []);
    }
    static get _gcSetMaxTimeSlice() {
        return this.r("il2cpp_gc_set_max_time_slice_ns", "void", ["int64"]);
    }
    static get _gcStartIncrementalCollection() {
        return this.r("il2cpp_gc_start_incremental_collection", "void", []);
    }
    static get _gcStartWorld() {
        return this.r("il2cpp_start_gc_world", "void", []);
    }
    static get _gcStopWorld() {
        return this.r("il2cpp_stop_gc_world", "void", []);
    }
    static get _getCorlib() {
        return this.r("il2cpp_get_corlib", "pointer", []);
    }
    static get _imageGetAssembly() {
        return this.r("il2cpp_image_get_assembly", "pointer", ["pointer"]);
    }
    static get _imageGetClass() {
        return this.r("il2cpp_image_get_class", "pointer", ["pointer", "uint"]);
    }
    static get _imageGetClassCount() {
        return this.r("il2cpp_image_get_class_count", "uint32", ["pointer"]);
    }
    static get _imageGetName() {
        return this.r("il2cpp_image_get_name", "pointer", ["pointer"]);
    }
    static get _init() {
        return this.r("il2cpp_init", "void", []);
    }
    static get _livenessAllocateStruct() {
        return this.r("il2cpp_unity_liveness_allocate_struct", "pointer", ["pointer", "int", "pointer", "pointer", "pointer"]);
    }
    static get _livenessCalculationBegin() {
        return this.r("il2cpp_unity_liveness_calculation_begin", "pointer", ["pointer", "int", "pointer", "pointer", "pointer", "pointer"]);
    }
    static get _livenessCalculationEnd() {
        return this.r("il2cpp_unity_liveness_calculation_end", "void", ["pointer"]);
    }
    static get _livenessCalculationFromStatics() {
        return this.r("il2cpp_unity_liveness_calculation_from_statics", "void", ["pointer"]);
    }
    static get _livenessFinalize() {
        return this.r("il2cpp_unity_liveness_finalize", "void", ["pointer"]);
    }
    static get _livenessFreeStruct() {
        return this.r("il2cpp_unity_liveness_free_struct", "void", ["pointer"]);
    }
    static get _memorySnapshotCapture() {
        return this.r("il2cpp_capture_memory_snapshot", "pointer", []);
    }
    static get _memorySnapshotFree() {
        return this.r("il2cpp_free_captured_memory_snapshot", "void", ["pointer"]);
    }
    static get _memorySnapshotGetClasses() {
        return this.r("il2cpp_memory_snapshot_get_classes", "pointer", ["pointer", "pointer"]);
    }
    static get _memorySnapshotGetGCHandles() {
        return this.r("il2cpp_memory_snapshot_get_gc_handles", ["uint32", "pointer"], ["pointer"]);
    }
    static get _memorySnapshotGetRuntimeInformation() {
        return this.r("il2cpp_memory_snapshot_get_information", ["uint32", "uint32", "uint32", "uint32", "uint32", "uint32"], ["pointer"]);
    }
    static get _methodGetModifier() {
        return this.r("il2cpp_method_get_modifier", "pointer", ["pointer"]);
    }
    static get _methodGetClass() {
        return this.r("il2cpp_method_get_class", "pointer", ["pointer"]);
    }
    static get _methodGetFlags() {
        return this.r("il2cpp_method_get_flags", "uint32", ["pointer", "pointer"]);
    }
    static get _methodGetFromReflection() {
        return this.r("il2cpp_method_get_from_reflection", "pointer", ["pointer"]);
    }
    static get _methodGetName() {
        return this.r("il2cpp_method_get_name", "pointer", ["pointer"]);
    }
    static get _methodGetObject() {
        return this.r("il2cpp_method_get_object", "pointer", ["pointer", "pointer"]);
    }
    static get _methodGetParameterCount() {
        return this.r("il2cpp_method_get_param_count", "uint8", ["pointer"]);
    }
    static get _methodGetParameterName() {
        return this.r("il2cpp_method_get_param_name", "pointer", ["pointer", "uint32"]);
    }
    static get _methodGetParameters() {
        return this.r("il2cpp_method_get_parameters", "pointer", ["pointer", "pointer"]);
    }
    static get _methodGetParameterType() {
        return this.r("il2cpp_method_get_param", "pointer", ["pointer", "uint32"]);
    }
    static get _methodGetPointer() {
        return this.r("il2cpp_method_get_pointer", "pointer", ["pointer"]);
    }
    static get _methodGetReturnType() {
        return this.r("il2cpp_method_get_return_type", "pointer", ["pointer"]);
    }
    static get _methodIsExternal() {
        return this.r("il2cpp_method_is_external", "bool", ["pointer"]);
    }
    static get _methodIsGeneric() {
        return this.r("il2cpp_method_is_generic", "bool", ["pointer"]);
    }
    static get _methodIsInflated() {
        return this.r("il2cpp_method_is_inflated", "bool", ["pointer"]);
    }
    static get _methodIsInstance() {
        return this.r("il2cpp_method_is_instance", "bool", ["pointer"]);
    }
    static get _methodIsSynchronized() {
        return this.r("il2cpp_method_is_synchronized", "bool", ["pointer"]);
    }
    static get _monitorEnter() {
        return this.r("il2cpp_monitor_enter", "void", ["pointer"]);
    }
    static get _monitorExit() {
        return this.r("il2cpp_monitor_exit", "void", ["pointer"]);
    }
    static get _monitorPulse() {
        return this.r("il2cpp_monitor_pulse", "void", ["pointer"]);
    }
    static get _monitorPulseAll() {
        return this.r("il2cpp_monitor_pulse_all", "void", ["pointer"]);
    }
    static get _monitorTryEnter() {
        return this.r("il2cpp_monitor_try_enter", "bool", ["pointer", "uint32"]);
    }
    static get _monitorTryWait() {
        return this.r("il2cpp_monitor_try_wait", "bool", ["pointer", "uint32"]);
    }
    static get _monitorWait() {
        return this.r("il2cpp_monitor_wait", "void", ["pointer"]);
    }
    static get _objectGetClass() {
        return this.r("il2cpp_object_get_class", "pointer", ["pointer"]);
    }
    static get _objectGetVirtualMethod() {
        return this.r("il2cpp_object_get_virtual_method", "pointer", ["pointer", "pointer"]);
    }
    static get _objectInit() {
        return this.r("il2cpp_runtime_object_init_exception", "void", ["pointer", "pointer"]);
    }
    static get _objectNew() {
        return this.r("il2cpp_object_new", "pointer", ["pointer"]);
    }
    static get _objectGetSize() {
        return this.r("il2cpp_object_get_size", "uint32", ["pointer"]);
    }
    static get _objectUnbox() {
        return this.r("il2cpp_object_unbox", "pointer", ["pointer"]);
    }
    static get _resolveInternalCall() {
        return this.r("il2cpp_resolve_icall", "pointer", ["pointer"]);
    }
    static get _stringChars() {
        return this.r("il2cpp_string_chars", "pointer", ["pointer"]);
    }
    static get _stringLength() {
        return this.r("il2cpp_string_length", "int32", ["pointer"]);
    }
    static get _stringNew() {
        return this.r("il2cpp_string_new", "pointer", ["pointer"]);
    }
    static get _stringSetLength() {
        return this.r("il2cpp_string_set_length", "void", ["pointer", "int32"]);
    }
    static get _valueBox() {
        return this.r("il2cpp_value_box", "pointer", ["pointer", "pointer"]);
    }
    static get _threadAttach() {
        return this.r("il2cpp_thread_attach", "pointer", ["pointer"]);
    }
    static get _threadCurrent() {
        return this.r("il2cpp_thread_current", "pointer", []);
    }
    static get _threadGetAllAttachedThreads() {
        return this.r("il2cpp_thread_get_all_attached_threads", "pointer", ["pointer"]);
    }
    static get _threadIsVm() {
        return this.r("il2cpp_is_vm_thread", "bool", ["pointer"]);
    }
    static get _threadDetach() {
        return this.r("il2cpp_thread_detach", "void", ["pointer"]);
    }
    static get _typeGetName() {
        return this.r("il2cpp_type_get_name", "pointer", ["pointer"]);
    }
    static get _typeGetObject() {
        return this.r("il2cpp_type_get_object", "pointer", ["pointer"]);
    }
    static get _typeGetTypeEnum() {
        return this.r("il2cpp_type_get_type", "int", ["pointer"]);
    }
    static get _typeIsByReference() {
        return this.r("il2cpp_type_is_byref", "bool", ["pointer"]);
    }
    static get _typeIsPrimitive() {
        return this.r("il2cpp_type_is_primitive", "bool", ["pointer"]);
    }
    /** @internal */
    static get cModule() {
        if (versioning_1.default.lt(Il2Cpp.unityVersion, "5.3.0") || versioning_1.default.gte(Il2Cpp.unityVersion, "2022.2.0")) {
            (0, console_1.warn)(`current Unity version ${Il2Cpp.unityVersion} is not supported, expect breakage`);
        }
        const offsetsFinderCModule = new CModule(`\
#include <stdint.h>

#define OFFSET_OF(name, type) \
    int16_t name (char * p,\
                  type e)\
    {\
        for (int16_t i = 0; i < 512; i++) if (* ((type *) p + i) == e) return i;\
        return -1;\
    }

OFFSET_OF (offset_of_int32, int32_t)
OFFSET_OF (offset_of_pointer, void *)
            `);
        const offsetOfInt32 = new NativeFunction(offsetsFinderCModule.offset_of_int32, "int16", ["pointer", "int32"]);
        const offsetOfPointer = new NativeFunction(offsetsFinderCModule.offset_of_pointer, "int16", ["pointer", "pointer"]);
        const SystemString = Il2Cpp.Image.corlib.class("System.String");
        const SystemDateTime = Il2Cpp.Image.corlib.class("System.DateTime");
        const SystemReflectionModule = Il2Cpp.Image.corlib.class("System.Reflection.Module");
        SystemDateTime.initialize();
        SystemReflectionModule.initialize();
        const DaysToMonth365 = (SystemDateTime.tryField("daysmonth") ??
            SystemDateTime.tryField("DaysToMonth365") ??
            SystemDateTime.field("s_daysToMonth365")).value;
        const FilterTypeName = SystemReflectionModule.field("FilterTypeName").value;
        const FilterTypeNameMethodPointer = FilterTypeName.field("method_ptr").value;
        const FilterTypeNameMethod = FilterTypeName.field("method").value;
        const source = `\
#include <stdint.h>
#include <string.h>


typedef struct _Il2CppObject Il2CppObject;
typedef enum _Il2CppTypeEnum Il2CppTypeEnum;
typedef struct _Il2CppReflectionMethod Il2CppReflectionMethod;
typedef struct _Il2CppManagedMemorySnapshot Il2CppManagedMemorySnapshot;
typedef struct _Il2CppMetadataType Il2CppMetadataType;


struct _Il2CppObject
{
    void * class;
    void * monitor;
};

enum _Il2CppTypeEnum
{
    IL2CPP_TYPE_END = 0x00,
    IL2CPP_TYPE_VOID = 0x01,
    IL2CPP_TYPE_BOOLEAN = 0x02,
    IL2CPP_TYPE_CHAR = 0x03,
    IL2CPP_TYPE_I1 = 0x04,
    IL2CPP_TYPE_U1 = 0x05,
    IL2CPP_TYPE_I2 = 0x06,
    IL2CPP_TYPE_U2 = 0x07,
    IL2CPP_TYPE_I4 = 0x08,
    IL2CPP_TYPE_U4 = 0x09,
    IL2CPP_TYPE_I8 = 0x0a,
    IL2CPP_TYPE_U8 = 0x0b,
    IL2CPP_TYPE_R4 = 0x0c,
    IL2CPP_TYPE_R8 = 0x0d,
    IL2CPP_TYPE_STRING = 0x0e,
    IL2CPP_TYPE_PTR = 0x0f,
    IL2CPP_TYPE_BYREF = 0x10,
    IL2CPP_TYPE_VALUETYPE = 0x11,
    IL2CPP_TYPE_CLASS = 0x12,
    IL2CPP_TYPE_VAR = 0x13,
    IL2CPP_TYPE_ARRAY = 0x14,
    IL2CPP_TYPE_GENERICINST = 0x15,
    IL2CPP_TYPE_TYPEDBYREF = 0x16,
    IL2CPP_TYPE_I = 0x18,
    IL2CPP_TYPE_U = 0x19,
    IL2CPP_TYPE_FNPTR = 0x1b,
    IL2CPP_TYPE_OBJECT = 0x1c,
    IL2CPP_TYPE_SZARRAY = 0x1d,
    IL2CPP_TYPE_MVAR = 0x1e,
    IL2CPP_TYPE_CMOD_REQD = 0x1f,
    IL2CPP_TYPE_CMOD_OPT = 0x20,
    IL2CPP_TYPE_INTERNAL = 0x21,
    IL2CPP_TYPE_MODIFIER = 0x40,
    IL2CPP_TYPE_SENTINEL = 0x41,
    IL2CPP_TYPE_PINNED = 0x45,
    IL2CPP_TYPE_ENUM = 0x55
};

struct _Il2CppReflectionMethod
{
    Il2CppObject object;
    void * method;
    void * name;
    void * reftype;
};

struct _Il2CppManagedMemorySnapshot
{
    struct Il2CppManagedHeap
    {
        uint32_t section_count;
        void * sections;
    } heap;
    struct Il2CppStacks
    {
        uint32_t stack_count;
        void * stacks;
    } stacks;
    struct Il2CppMetadataSnapshot
    {
        uint32_t type_count;
        Il2CppMetadataType * types;
    } metadata_snapshot;
    struct Il2CppGCHandles
    {
        uint32_t tracked_object_count;
        Il2CppObject ** pointers_to_objects;
    } gc_handles;
    struct Il2CppRuntimeInformation
    {
        uint32_t pointer_size;
        uint32_t object_header_size;
        uint32_t array_header_size;
        uint32_t array_bounds_offset_in_header;
        uint32_t array_size_offset_in_header;
        uint32_t allocation_granularity;
    } runtime_information;
    void * additional_user_information;
};

struct _Il2CppMetadataType
{
    uint32_t flags;
    void * fields;
    uint32_t field_count;
    uint32_t statics_size;
    uint8_t * statics;
    uint32_t base_or_element_type_index;
    char * name;
    const char * assembly_name;
    uint64_t type_info_address;
    uint32_t size;
};


#define THREAD_STATIC_FIELD_OFFSET -1;

#define FIELD_ATTRIBUTE_FIELD_ACCESS_MASK 0x0007
#define FIELD_ATTRIBUTE_COMPILER_CONTROLLED 0x0000
#define FIELD_ATTRIBUTE_PRIVATE 0x0001
#define FIELD_ATTRIBUTE_FAM_AND_ASSEM 0x0002
#define FIELD_ATTRIBUTE_ASSEMBLY 0x0003
#define FIELD_ATTRIBUTE_FAMILY 0x0004
#define FIELD_ATTRIBUTE_FAM_OR_ASSEM 0x0005
#define FIELD_ATTRIBUTE_PUBLIC 0x0006

#define FIELD_ATTRIBUTE_STATIC 0x0010
#define FIELD_ATTRIBUTE_LITERAL 0x0040

#define METHOD_ATTRIBUTE_MEMBER_ACCESS_MASK 0x0007
#define METHOD_ATTRIBUTE_COMPILER_CONTROLLED 0x0000
#define METHOD_ATTRIBUTE_PRIVATE 0x0001
#define METHOD_ATTRIBUTE_FAM_AND_ASSEM 0x0002
#define METHOD_ATTRIBUTE_ASSEMBLY 0x0003
#define METHOD_ATTRIBUTE_FAMILY 0x0004
#define METHOD_ATTRIBUTE_FAM_OR_ASSEM 0x0005
#define METHOD_ATTRIBUTE_PUBLIC 0x0006

#define METHOD_ATTRIBUTE_STATIC 0x0010
#define METHOD_IMPL_ATTRIBUTE_INTERNAL_CALL 0x1000
#define METHOD_IMPL_ATTRIBUTE_SYNCHRONIZED 0x0020


static const char * (*il2cpp_class_get_name) (void *) = (void *) ${this._classGetName};
static int (*il2cpp_field_get_flags) (void *) = (void *) ${this._fieldGetFlags};
static size_t (*il2cpp_field_get_offset) (void *) = (void *) ${this._fieldGetOffset};
static uint32_t (*il2cpp_method_get_flags) (void *, uint32_t *) = (void *) ${this._methodGetFlags};
static char * (*il2cpp_type_get_name) (void *) = (void *) ${this._typeGetName};
static Il2CppTypeEnum (*il2cpp_type_get_type_enum) (void *) = (void *) ${this._typeGetTypeEnum};
static void (*il2cpp_free) (void * pointer) = (void *) ${this._free};


void
il2cpp_string_set_length (int32_t * string,
                          int32_t length)
{
    *(string + ${offsetOfInt32(Il2Cpp.String.from("vfsfitvnm"), 9)}) = length;
}

void *
il2cpp_array_get_elements (int32_t * array)
{ 
    return array + ${offsetOfInt32(DaysToMonth365, 31) - 1};
}

uint8_t
il2cpp_type_is_byref (void * type)
{   
    char * name;
    char last_char;

    name = il2cpp_type_get_name (type);
    last_char = name[strlen (name) - 1];

    il2cpp_free (name);
    return last_char == '&';
}

uint8_t
il2cpp_type_is_primitive (void * type)
{
    Il2CppTypeEnum type_enum;

    type_enum = il2cpp_type_get_type_enum (type);

    return ((type_enum >= IL2CPP_TYPE_BOOLEAN && 
        type_enum <= IL2CPP_TYPE_R8) || 
        type_enum == IL2CPP_TYPE_I || 
        type_enum == IL2CPP_TYPE_U
    );
}

int32_t
il2cpp_class_get_actual_instance_size (int32_t * class)
{
    return *(class + ${offsetOfInt32(SystemString, SystemString.instanceSize - 2)});
}

uint8_t
il2cpp_class_get_rank (void * class)
{
    uint8_t rank;
    const char * name;
    
    rank = 0;
    name = il2cpp_class_get_name (class);

    for (uint16_t i = strlen (name) - 1; i > 0; i--)
    {
        char c = name[i];

        if (c == ']') rank++;
        else if (c == '[' || rank == 0) break;
        else if (c == ',') rank++;
        else break;
    }

    return rank;
}

const char *
il2cpp_field_get_modifier (void * field)
{   
    int flags;

    flags = il2cpp_field_get_flags (field);

    switch (flags & FIELD_ATTRIBUTE_FIELD_ACCESS_MASK) {
        case FIELD_ATTRIBUTE_PRIVATE:
            return "private";
        case FIELD_ATTRIBUTE_FAM_AND_ASSEM:
            return "private protected";
        case FIELD_ATTRIBUTE_ASSEMBLY:
            return "internal";
        case FIELD_ATTRIBUTE_FAMILY:
            return "protected";
        case FIELD_ATTRIBUTE_FAM_OR_ASSEM:
            return "protected internal";
        case FIELD_ATTRIBUTE_PUBLIC:
            return "public";
    }

    return "";
}

uint8_t
il2cpp_field_is_literal (void * field)
{
    return (il2cpp_field_get_flags (field) & FIELD_ATTRIBUTE_LITERAL) != 0;
}

uint8_t
il2cpp_field_is_static (void * field)
{
    return (il2cpp_field_get_flags (field) & FIELD_ATTRIBUTE_STATIC) != 0;
}

uint8_t
il2cpp_field_is_thread_static (void * field)
{
    return il2cpp_field_get_offset (field) == THREAD_STATIC_FIELD_OFFSET;
}

const char *
il2cpp_method_get_modifier (void * method)
{
    uint32_t flags;

    flags = il2cpp_method_get_flags (method, NULL);

    switch (flags & METHOD_ATTRIBUTE_MEMBER_ACCESS_MASK) {
        case METHOD_ATTRIBUTE_PRIVATE:
            return "private";
        case METHOD_ATTRIBUTE_FAM_AND_ASSEM:
            return "private protected";
        case METHOD_ATTRIBUTE_ASSEMBLY:
            return "internal";
        case METHOD_ATTRIBUTE_FAMILY:
            return "protected";
        case METHOD_ATTRIBUTE_FAM_OR_ASSEM:
            return "protected internal";
        case METHOD_ATTRIBUTE_PUBLIC:
            return "public";
    }

    return "";
}

void *
il2cpp_method_get_from_reflection (const Il2CppReflectionMethod * method)
{
    return method->method;
}

void *
il2cpp_method_get_pointer (void ** method)
{
    return * (method + ${offsetOfPointer(FilterTypeNameMethod, FilterTypeNameMethodPointer)});
}

uint8_t
il2cpp_method_is_external (void * method)
{
    uint32_t implementation_flags;

    il2cpp_method_get_flags (method, &implementation_flags);

    return (implementation_flags & METHOD_IMPL_ATTRIBUTE_INTERNAL_CALL) != 0;
}

uint8_t
il2cpp_method_is_synchronized (void * method)
{
    uint32_t implementation_flags;

    il2cpp_method_get_flags (method, &implementation_flags);

    return (implementation_flags & METHOD_IMPL_ATTRIBUTE_SYNCHRONIZED) != 0;
}

uintptr_t
il2cpp_memory_snapshot_get_classes (const Il2CppManagedMemorySnapshot * snapshot,
                                    Il2CppMetadataType ** iter)
{
    const int zero;
    const void * null;

    if (iter != NULL && snapshot->metadata_snapshot.type_count > zero)
    {
        if (*iter == null)
        {
            *iter = snapshot->metadata_snapshot.types;
            return (uintptr_t) (*iter)->type_info_address;
        }
        else
        {
            Il2CppMetadataType * metadata_type = *iter + 1;

            if (metadata_type < snapshot->metadata_snapshot.types + snapshot->metadata_snapshot.type_count)
            {
                *iter = metadata_type;
                return (uintptr_t) (*iter)->type_info_address;
            }
        }
    }
    return 0;
}

struct Il2CppGCHandles
il2cpp_memory_snapshot_get_gc_handles (const Il2CppManagedMemorySnapshot * snapshot)
{
    return snapshot->gc_handles;
}

struct Il2CppRuntimeInformation
il2cpp_memory_snapshot_get_information (const Il2CppManagedMemorySnapshot * snapshot)
{
    return snapshot->runtime_information;
}
        `;
        offsetsFinderCModule.dispose();
        return new CModule(source);
    }
    /** @internal */
    static r(exportName, retType, argTypes) {
        const exportPointer = Il2Cpp.module.findExportByName(exportName) ?? this.cModule[exportName];
        if (exportPointer == null) {
            (0, console_1.raise)(`cannot resolve export ${exportName}`);
        }
        return new NativeFunction(exportPointer, retType, argTypes);
    }
}
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_alloc", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_arrayGetElements", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_arrayGetLength", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_arrayNew", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_assemblyGetImage", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_classForEach", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_classFromName", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_classFromSystemType", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_classFromType", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_classGetActualInstanceSize", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_classGetArrayClass", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_classGetArrayElementSize", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_classGetAssemblyName", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_classGetBaseType", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_classGetDeclaringType", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_classGetElementClass", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_classGetFieldFromName", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_classGetFields", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_classGetFlags", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_classGetImage", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_classGetInstanceSize", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_classGetInterfaces", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_classGetMethodFromName", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_classGetMethods", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_classGetName", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_classGetNamespace", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_classGetNestedClasses", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_classGetParent", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_classGetRank", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_classGetStaticFieldData", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_classGetValueSize", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_classGetType", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_classHasReferences", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_classInit", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_classIsAbstract", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_classIsAssignableFrom", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_classIsBlittable", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_classIsEnum", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_classIsGeneric", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_classIsInflated", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_classIsInterface", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_classIsSubclassOf", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_classIsValueType", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_domainAssemblyOpen", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_domainGet", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_domainGetAssemblies", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_fieldGetModifier", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_fieldGetClass", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_fieldGetFlags", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_fieldGetName", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_fieldGetOffset", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_fieldGetStaticValue", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_fieldGetType", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_fieldIsLiteral", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_fieldIsStatic", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_fieldIsThreadStatic", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_fieldSetStaticValue", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_free", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_gcCollect", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_gcCollectALittle", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_gcDisable", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_gcEnable", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_gcGetHeapSize", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_gcGetMaxTimeSlice", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_gcGetUsedSize", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_gcHandleGetTarget", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_gcHandleFree", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_gcHandleNew", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_gcHandleNewWeakRef", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_gcIsDisabled", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_gcIsIncremental", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_gcSetMaxTimeSlice", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_gcStartIncrementalCollection", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_gcStartWorld", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_gcStopWorld", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_getCorlib", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_imageGetAssembly", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_imageGetClass", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_imageGetClassCount", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_imageGetName", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_init", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_livenessAllocateStruct", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_livenessCalculationBegin", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_livenessCalculationEnd", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_livenessCalculationFromStatics", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_livenessFinalize", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_livenessFreeStruct", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_memorySnapshotCapture", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_memorySnapshotFree", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_memorySnapshotGetClasses", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_memorySnapshotGetGCHandles", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_memorySnapshotGetRuntimeInformation", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_methodGetModifier", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_methodGetClass", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_methodGetFlags", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_methodGetFromReflection", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_methodGetName", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_methodGetObject", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_methodGetParameterCount", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_methodGetParameterName", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_methodGetParameters", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_methodGetParameterType", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_methodGetPointer", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_methodGetReturnType", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_methodIsExternal", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_methodIsGeneric", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_methodIsInflated", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_methodIsInstance", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_methodIsSynchronized", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_monitorEnter", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_monitorExit", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_monitorPulse", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_monitorPulseAll", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_monitorTryEnter", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_monitorTryWait", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_monitorWait", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_objectGetClass", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_objectGetVirtualMethod", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_objectInit", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_objectNew", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_objectGetSize", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_objectUnbox", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_resolveInternalCall", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_stringChars", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_stringLength", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_stringNew", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_stringSetLength", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_valueBox", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_threadAttach", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_threadCurrent", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_threadGetAllAttachedThreads", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_threadIsVm", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_threadDetach", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_typeGetName", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_typeGetObject", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_typeGetTypeEnum", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_typeIsByReference", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "_typeIsPrimitive", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppApi, "cModule", null);
Il2Cpp.Api = Il2CppApi;

},{"../utils/console":134,"decorator-cache-getter":105,"versioning":140}],108:[function(require,module,exports){
(function (setImmediate){(function (){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_cache_getter_1 = require("decorator-cache-getter");
const versioning_1 = __importDefault(require("versioning"));
const console_1 = require("../utils/console");
const native_wait_1 = require("../utils/native-wait");
/** */
class Il2CppBase {
    constructor() { }
    /** @internal Gets the Il2Cpp module name. */
    static get moduleName() {
        switch (Process.platform) {
            case "linux":
                try {
                    const _ = Java.androidVersion;
                    return "libil2cpp.so";
                }
                catch (e) {
                    return "GameAssembly.so";
                }
            case "windows":
                return "GameAssembly.dll";
            case "darwin":
                try {
                    return "UnityFramework";
                }
                catch (e) {
                    return "GameAssembly.dylib";
                }
        }
        (0, console_1.raise)(`${Process.platform} is not supported yet`);
    }
    /** */
    static get applicationDataPath() {
        const get_persistentDataPath = this.internalCall("UnityEngine.Application::get_persistentDataPath", "pointer", []);
        return new Il2Cpp.String(get_persistentDataPath()).content;
    }
    /** */
    static get applicationIdentifier() {
        const get_identifier = this.internalCall("UnityEngine.Application::get_identifier", "pointer", []) ??
            this.internalCall("UnityEngine.Application::get_bundleIdentifier", "pointer", []);
        return get_identifier ? new Il2Cpp.String(get_identifier()).content : null;
    }
    /** Gets the version of the application */
    static get applicationVersion() {
        const get_version = this.internalCall("UnityEngine.Application::get_version", "pointer", []);
        return get_version ? new Il2Cpp.String(get_version()).content : null;
    }
    /** Gets the attached threads. */
    static get attachedThreads() {
        if (Il2Cpp.currentThread == null) {
            (0, console_1.raise)("only Il2Cpp threads can invoke Il2Cpp.attachedThreads");
        }
        const array = [];
        const sizePointer = Memory.alloc(Process.pointerSize);
        const startPointer = Il2Cpp.Api._threadGetAllAttachedThreads(sizePointer);
        const size = sizePointer.readInt();
        for (let i = 0; i < size; i++) {
            array.push(new Il2Cpp.Thread(startPointer.add(i * Process.pointerSize).readPointer()));
        }
        return array;
    }
    /** Gets the current attached thread, if any. */
    static get currentThread() {
        const handle = Il2Cpp.Api._threadCurrent();
        return handle.isNull() ? null : new Il2Cpp.Thread(handle);
    }
    /** Gets the Il2Cpp module as a Frida module. */
    static get module() {
        return Process.getModuleByName(this.moduleName);
    }
    /** Gets the Unity version of the current application. */
    static get unityVersion() {
        const get_unityVersion = this.internalCall("UnityEngine.Application::get_unityVersion", "pointer", []);
        if (get_unityVersion == null) {
            (0, console_1.raise)("couldn't determine the Unity version, please specify it manually");
        }
        return new Il2Cpp.String(get_unityVersion()).content;
    }
    /** @internal */
    static get unityVersionIsBelow201830() {
        return versioning_1.default.lt(this.unityVersion, "2018.3.0");
    }
    /** Allocates the given amount of bytes. */
    static alloc(size = Process.pointerSize) {
        return Il2Cpp.Api._alloc(size);
    }
    /** Dumps the application. */
    static dump(fileName, path) {
        fileName = fileName ?? `${Il2Cpp.applicationIdentifier ?? "unknown"}_${Il2Cpp.applicationVersion ?? "unknown"}.cs`;
        const destination = `${path ?? Il2Cpp.applicationDataPath}/${fileName}`;
        const file = new File(destination, "w");
        for (const assembly of Il2Cpp.Domain.assemblies) {
            (0, console_1.inform)(`dumping ${assembly.name}...`);
            for (const klass of assembly.image.classes) {
                file.write(`${klass}\n\n`);
            }
        }
        file.flush();
        file.close();
        (0, console_1.ok)(`dump saved to ${destination}`);
    }
    /** Frees memory. */
    static free(pointer) {
        return Il2Cpp.Api._free(pointer);
    }
    /** @internal Waits for Unity and Il2Cpp native libraries to be loaded and initialized. */
    static async initialize() {
        if (Process.platform == "darwin") {
            let il2cppModuleName = Process.findModuleByAddress(Module.findExportByName(null, "il2cpp_init") ?? NULL)?.name;
            if (il2cppModuleName == undefined) {
                il2cppModuleName = await (0, native_wait_1.forModule)("UnityFramework", "GameAssembly.dylib");
            }
            Reflect.defineProperty(Il2Cpp, "moduleName", { value: il2cppModuleName });
        }
        else {
            await (0, native_wait_1.forModule)(this.moduleName);
        }
        if (Il2Cpp.Api._getCorlib().isNull()) {
            await new Promise(resolve => {
                const interceptor = Interceptor.attach(Il2Cpp.Api._init, {
                    onLeave() {
                        interceptor.detach();
                        setImmediate(resolve);
                    }
                });
            });
        }
    }
    /** */
    static installExceptionListener(targetThread = "current") {
        const threadId = Process.getCurrentThreadId();
        return Interceptor.attach(Il2Cpp.module.getExportByName("__cxa_throw"), function (args) {
            if (targetThread == "current" && this.threadId != threadId) {
                return;
            }
            (0, console_1.inform)(new Il2Cpp.Object(args[0].readPointer()));
        });
    }
    /** */
    static internalCall(name, retType, argTypes) {
        const handle = Il2Cpp.Api._resolveInternalCall(Memory.allocUtf8String(name));
        return handle.isNull() ? null : new NativeFunction(handle, retType, argTypes);
    }
    /** Schedules a callback on the Il2Cpp initializer thread. */
    static scheduleOnInitializerThread(block) {
        return new Promise(resolve => {
            const listener = Interceptor.attach(Il2Cpp.Api._threadCurrent, () => {
                const currentThreadId = Il2Cpp.currentThread?.id;
                if (currentThreadId != undefined && currentThreadId == Il2Cpp.attachedThreads[0].id) {
                    listener.detach();
                    const result = block();
                    setImmediate(() => resolve(result));
                }
            });
        });
    }
    /** Attaches the caller thread to Il2Cpp domain and executes the given block.  */
    static async perform(block) {
        await this.initialize();
        let thread = this.currentThread;
        const isForeignThread = thread == null;
        if (thread == null) {
            thread = Il2Cpp.Domain.attach();
        }
        try {
            const result = block();
            return result instanceof Promise ? await result : result;
        }
        catch (e) {
            globalThis.console.log(e);
            throw e;
        }
        finally {
            if (isForeignThread) {
                thread.detach();
            }
        }
    }
    /** Creates a new `Il2Cpp.Tracer` instance. */
    static trace() {
        return new Il2Cpp.Tracer();
    }
}
__decorate([
    decorator_cache_getter_1.cache
], Il2CppBase, "applicationDataPath", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppBase, "applicationIdentifier", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppBase, "applicationVersion", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppBase, "module", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppBase, "unityVersion", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppBase, "unityVersionIsBelow201830", null);
Reflect.set(globalThis, "Il2Cpp", Il2CppBase);

}).call(this)}).call(this,require("timers").setImmediate)

},{"../utils/console":134,"../utils/native-wait":136,"decorator-cache-getter":105,"timers":139,"versioning":140}],109:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Filtering utilities. */
class Il2CppFiltering {
    constructor() { }
    /** Creates a filter which includes `element`s whose type can be assigned to `klass` variables. */
    static Is(klass) {
        return (element) => {
            if (element instanceof Il2Cpp.Class) {
                return klass.isAssignableFrom(element);
            }
            else {
                return klass.isAssignableFrom(element.class);
            }
        };
    }
    /** Creates a filter which includes `element`s whose type corresponds to `klass` type. */
    static IsExactly(klass) {
        return (element) => {
            if (element instanceof Il2Cpp.Class) {
                return element.equals(klass);
            }
            else {
                return element.class.equals(klass);
            }
        };
    }
}
Il2Cpp.Filtering = Il2CppFiltering;

},{}],110:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./base");
require("./api");
require("./filtering");
require("./runtime");
require("./tracer");
require("./structs/array");
require("./structs/assembly");
require("./structs/class");
require("./structs/domain");
require("./structs/field");
require("./structs/gc");
require("./structs/gc-handle");
require("./structs/image");
require("./structs/memory-snapshot");
require("./structs/method");
require("./structs/object");
require("./structs/parameter");
require("./structs/pointer");
require("./structs/reference");
require("./structs/string");
require("./structs/thread");
require("./structs/type");
require("./structs/type-enum");
require("./structs/value-type");

},{"./api":107,"./base":108,"./filtering":109,"./runtime":111,"./structs/array":112,"./structs/assembly":113,"./structs/class":114,"./structs/domain":115,"./structs/field":116,"./structs/gc":118,"./structs/gc-handle":117,"./structs/image":119,"./structs/memory-snapshot":120,"./structs/method":121,"./structs/object":122,"./structs/parameter":123,"./structs/pointer":124,"./structs/reference":125,"./structs/string":126,"./structs/thread":127,"./structs/type":129,"./structs/type-enum":128,"./structs/value-type":130,"./tracer":131}],111:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_cache_getter_1 = require("decorator-cache-getter");
/** */
class Il2CppRuntime {
    constructor() { }
    /** Gets the allocation granularity. */
    static get allocationGranularity() {
        return this.information[5];
    }
    /** Gets the size of the Il2CppArray struct. */
    static get arrayHeaderSize() {
        return this.information[2];
    }
    /** @internal */
    static get information() {
        const snapshot = Il2Cpp.MemorySnapshot.capture();
        try {
            return Il2Cpp.Api._memorySnapshotGetRuntimeInformation(snapshot);
        }
        finally {
            Il2Cpp.Api._memorySnapshotFree(snapshot);
        }
    }
    /** Gets the pointer size. */
    static get pointerSize() {
        return this.information[0];
    }
    /** Gets the size of the Il2CppObject struct. */
    static get objectHeaderSize() {
        return this.information[1];
    }
}
__decorate([
    decorator_cache_getter_1.cache
], Il2CppRuntime, "information", null);
Il2Cpp.Runtime = Il2CppRuntime;

},{"decorator-cache-getter":105}],112:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_cache_getter_1 = require("decorator-cache-getter");
const console_1 = require("../../utils/console");
const native_struct_1 = require("../../utils/native-struct");
/** Represents a `Il2CppArraySize`. */
class Il2CppArray extends native_struct_1.NativeStruct {
    /** @internal */
    static from(klass, lengthOrElements) {
        const length = typeof lengthOrElements == "number" ? lengthOrElements : lengthOrElements.length;
        const array = new Il2Cpp.Array(Il2Cpp.Api._arrayNew(klass, length));
        if (Array.isArray(lengthOrElements)) {
            array.elements.write(lengthOrElements);
        }
        return array;
    }
    /** @internal Gets a pointer to the first element of the current array. */
    get elements() {
        return new Il2Cpp.Pointer(Il2Cpp.Api._arrayGetElements(this), this.elementType);
    }
    /** Gets the size of the object encompassed by the current array. */
    get elementSize() {
        return this.elementType.class.arrayElementSize;
    }
    /** Gets the type of the object encompassed by the current array. */
    get elementType() {
        return this.object.class.type.class.baseType;
    }
    /** Gets the total number of elements in all the dimensions of the current array. */
    get length() {
        return Il2Cpp.Api._arrayGetLength(this);
    }
    /** Gets the encompassing object of the current array. */
    get object() {
        return new Il2Cpp.Object(this);
    }
    /** Gets the element at the specified index of the current array. */
    get(index) {
        if (index < 0 || index >= this.length) {
            (0, console_1.raise)(`cannot get element at index ${index}: array length is ${this.length}`);
        }
        return this.elements.get(index);
    }
    /** Sets the element at the specified index of the current array. */
    set(index, value) {
        if (index < 0 || index >= this.length) {
            (0, console_1.raise)(`cannot get element at index ${index}: array length is ${this.length}`);
        }
        this.elements.set(index, value);
    }
    /** */
    toString() {
        return this.isNull() ? "null" : `[${this.elements.read(this.length, 0)}]`;
    }
    /** Iterable. */
    *[Symbol.iterator]() {
        for (let i = 0; i < this.length; i++) {
            yield this.elements.get(i);
        }
    }
}
__decorate([
    decorator_cache_getter_1.cache
], Il2CppArray.prototype, "elements", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppArray.prototype, "elementSize", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppArray.prototype, "elementType", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppArray.prototype, "length", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppArray.prototype, "object", null);
Il2Cpp.Array = Il2CppArray;

},{"../../utils/console":134,"../../utils/native-struct":135,"decorator-cache-getter":105}],113:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_cache_getter_1 = require("decorator-cache-getter");
const native_struct_1 = require("../../utils/native-struct");
const utils_1 = require("../../utils/utils");
/** Represents a `Il2CppAssembly`. */
let Il2CppAssembly = class Il2CppAssembly extends native_struct_1.NonNullNativeStruct {
    /** Gets the image of this assembly. */
    get image() {
        return new Il2Cpp.Image(Il2Cpp.Api._assemblyGetImage(this));
    }
    /** Gets the name of this assembly. */
    get name() {
        return this.image.name.replace(".dll", "");
    }
    /** Gets the encompassing object of the current assembly. */
    get object() {
        return Il2Cpp.Image.corlib.class("System.Reflection.Assembly").method("Load").invoke(Il2Cpp.String.from(this.name));
    }
};
__decorate([
    decorator_cache_getter_1.cache
], Il2CppAssembly.prototype, "image", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppAssembly.prototype, "name", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppAssembly.prototype, "object", null);
Il2CppAssembly = __decorate([
    utils_1.cacheInstances
], Il2CppAssembly);
Il2Cpp.Assembly = Il2CppAssembly;

},{"../../utils/native-struct":135,"../../utils/utils":137,"decorator-cache-getter":105}],114:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_cache_getter_1 = require("decorator-cache-getter");
const console_1 = require("../../utils/console");
const native_struct_1 = require("../../utils/native-struct");
const utils_1 = require("../../utils/utils");
/** Represents a `Il2CppClass`. */
let Il2CppClass = class Il2CppClass extends native_struct_1.NonNullNativeStruct {
    /** Gets the actual size of the instance of the current class. */
    get actualInstanceSize() {
        return Il2Cpp.Api._classGetActualInstanceSize(this);
    }
    /** Gets the array class which encompass the current class. */
    get arrayClass() {
        return new Il2Cpp.Class(Il2Cpp.Api._classGetArrayClass(this, 1));
    }
    /** Gets the size of the object encompassed by the current array class. */
    get arrayElementSize() {
        return Il2Cpp.Api._classGetArrayElementSize(this);
    }
    /** Gets the name of the assembly in which the current class is defined. */
    get assemblyName() {
        return Il2Cpp.Api._classGetAssemblyName(this).readUtf8String();
    }
    /** Gets the class that declares the current nested class. */
    get declaringClass() {
        const handle = Il2Cpp.Api._classGetDeclaringType(this);
        return handle.isNull() ? null : new Il2Cpp.Class(handle);
    }
    /** Gets the encompassed type of this array, reference, pointer or enum type. */
    get baseType() {
        const handle = Il2Cpp.Api._classGetBaseType(this);
        return handle.isNull() ? null : new Il2Cpp.Type(handle);
    }
    /** Gets the class of the object encompassed or referred to by the current array, pointer or reference class. */
    get elementClass() {
        const handle = Il2Cpp.Api._classGetElementClass(this);
        return handle.isNull() ? null : new Il2Cpp.Class(handle);
    }
    /** Gets the fields of the current class. */
    get fields() {
        return Array.from((0, utils_1.nativeIterator)(this, Il2Cpp.Api._classGetFields, Il2Cpp.Field));
    }
    /** Gets the flags of the current class. */
    get flags() {
        return Il2Cpp.Api._classGetFlags(this);
    }
    /** Gets the amount of generic parameters of this generic class. */
    get genericParameterCount() {
        if (!this.isGeneric) {
            return 0;
        }
        return this.type.object.method("GetGenericArguments").invoke().length;
    }
    /** Determines whether the GC has tracking references to the current class instances. */
    get hasReferences() {
        return !!Il2Cpp.Api._classHasReferences(this);
    }
    /** Determines whether ther current class has a valid static constructor. */
    get hasStaticConstructor() {
        const staticConstructor = this.tryMethod(".cctor");
        return staticConstructor != null && !staticConstructor.virtualAddress.isNull();
    }
    /** Gets the image in which the current class is defined. */
    get image() {
        return new Il2Cpp.Image(Il2Cpp.Api._classGetImage(this));
    }
    /** Gets the size of the instance of the current class. */
    get instanceSize() {
        return Il2Cpp.Api._classGetInstanceSize(this);
    }
    /** Determines whether the current class is abstract. */
    get isAbstract() {
        return !!Il2Cpp.Api._classIsAbstract(this);
    }
    /** Determines whether the current class is blittable. */
    get isBlittable() {
        return !!Il2Cpp.Api._classIsBlittable(this);
    }
    /** Determines whether the current class is an enumeration. */
    get isEnum() {
        return !!Il2Cpp.Api._classIsEnum(this);
    }
    /** Determines whether the current class is a generic one. */
    get isGeneric() {
        return !!Il2Cpp.Api._classIsGeneric(this);
    }
    /** Determines whether the current class is inflated. */
    get isInflated() {
        return !!Il2Cpp.Api._classIsInflated(this);
    }
    /** Determines whether the current class is an interface. */
    get isInterface() {
        return !!Il2Cpp.Api._classIsInterface(this);
    }
    /** Determines whether the current class is a value type. */
    get isValueType() {
        return !!Il2Cpp.Api._classIsValueType(this);
    }
    /** Gets the interfaces implemented or inherited by the current class. */
    get interfaces() {
        return Array.from((0, utils_1.nativeIterator)(this, Il2Cpp.Api._classGetInterfaces, Il2Cpp.Class));
    }
    /** Gets the methods implemented by the current class. */
    get methods() {
        return Array.from((0, utils_1.nativeIterator)(this, Il2Cpp.Api._classGetMethods, Il2Cpp.Method));
    }
    /** Gets the name of the current class. */
    get name() {
        return Il2Cpp.Api._classGetName(this).readUtf8String();
    }
    /** Gets the namespace of the current class. */
    get namespace() {
        return Il2Cpp.Api._classGetNamespace(this).readUtf8String();
    }
    /** Gets the classes nested inside the current class. */
    get nestedClasses() {
        return Array.from((0, utils_1.nativeIterator)(this, Il2Cpp.Api._classGetNestedClasses, Il2Cpp.Class));
    }
    /** Gets the class from which the current class directly inherits. */
    get parent() {
        const handle = Il2Cpp.Api._classGetParent(this);
        return handle.isNull() ? null : new Il2Cpp.Class(handle);
    }
    /** Gets the rank (number of dimensions) of the current array class. */
    get rank() {
        return Il2Cpp.Api._classGetRank(this);
    }
    /** Gets a pointer to the static fields of the current class. */
    get staticFieldsData() {
        return Il2Cpp.Api._classGetStaticFieldData(this);
    }
    /** Gets the size of the instance - as a value type - of the current class. */
    get valueSize() {
        return Il2Cpp.Api._classGetValueSize(this, NULL);
    }
    /** Gets the type of the current class. */
    get type() {
        return new Il2Cpp.Type(Il2Cpp.Api._classGetType(this));
    }
    /** Allocates a new object of the current class. */
    alloc() {
        return new Il2Cpp.Object(Il2Cpp.Api._objectNew(this));
    }
    /** Gets the field identified by the given name. */
    field(name) {
        return this.tryField(name);
    }
    /** Builds a generic instance of the current generic class. */
    inflate(...classes) {
        if (!this.isGeneric) {
            (0, console_1.raise)(`cannot inflate class ${this.type.name}: it has no generic parameters`);
        }
        if (this.genericParameterCount != classes.length) {
            (0, console_1.raise)(`cannot inflate class ${this.type.name}: it needs ${this.genericParameterCount} generic parameter(s), not ${classes.length}`);
        }
        const types = classes.map(klass => klass.type.object);
        const typeArray = Il2Cpp.Array.from(Il2Cpp.Image.corlib.class("System.Type"), types);
        const inflatedType = this.type.object.method("MakeGenericType", 1).invoke(typeArray);
        return new Il2Cpp.Class(Il2Cpp.Api._classFromSystemType(inflatedType));
    }
    /** Calls the static constructor of the current class. */
    initialize() {
        Il2Cpp.Api._classInit(this);
    }
    /** Determines whether an instance of `other` class can be assigned to a variable of the current type. */
    isAssignableFrom(other) {
        return !!Il2Cpp.Api._classIsAssignableFrom(this, other);
    }
    /** Determines whether the current class derives from `other` class. */
    isSubclassOf(other, checkInterfaces) {
        return !!Il2Cpp.Api._classIsSubclassOf(this, other, +checkInterfaces);
    }
    /** Gets the method identified by the given name and parameter count. */
    method(name, parameterCount = -1) {
        return this.tryMethod(name, parameterCount);
    }
    /** Gets the nested class with the given name. */
    nested(name) {
        return this.tryNested(name);
    }
    /** Allocates a new object of the current class and calls its default constructor. */
    new() {
        const object = this.alloc();
        const exceptionArray = Memory.alloc(Process.pointerSize);
        Il2Cpp.Api._objectInit(object, exceptionArray);
        const exception = exceptionArray.readPointer();
        if (!exception.isNull()) {
            (0, console_1.raise)(new Il2Cpp.Object(exception).toString());
        }
        return object;
    }
    /** Gets the field with the given name. */
    tryField(name) {
        const handle = Il2Cpp.Api._classGetFieldFromName(this, Memory.allocUtf8String(name));
        return handle.isNull() ? null : new Il2Cpp.Field(handle);
    }
    /** Gets the method with the given name and parameter count. */
    tryMethod(name, parameterCount = -1) {
        const handle = Il2Cpp.Api._classGetMethodFromName(this, Memory.allocUtf8String(name), parameterCount);
        return handle.isNull() ? null : new Il2Cpp.Method(handle);
    }
    /** Gets the nested class with the given name. */
    tryNested(name) {
        return this.nestedClasses.find(e => e.name == name);
    }
    /** */
    toString() {
        const inherited = [this.parent].concat(this.interfaces);
        return `\
// ${this.assemblyName}
${this.isEnum ? `enum` : this.isValueType ? `struct` : this.isInterface ? `interface` : `class`} \
${this.type.name}\
${inherited ? ` : ${inherited.map(e => e?.type.name).join(`, `)}` : ``}
{
    ${this.fields.join(`\n    `)}
    ${this.methods.join(`\n    `)}
}`;
    }
    /** Executes a callback for every defined class. */
    static enumerate(block) {
        const callback = new NativeCallback(function (klass, _) {
            block(new Il2Cpp.Class(klass));
        }, "void", ["pointer", "pointer"]);
        return Il2Cpp.Api._classForEach(callback, NULL);
    }
};
__decorate([
    decorator_cache_getter_1.cache
], Il2CppClass.prototype, "actualInstanceSize", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppClass.prototype, "arrayClass", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppClass.prototype, "arrayElementSize", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppClass.prototype, "assemblyName", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppClass.prototype, "declaringClass", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppClass.prototype, "baseType", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppClass.prototype, "elementClass", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppClass.prototype, "fields", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppClass.prototype, "flags", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppClass.prototype, "genericParameterCount", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppClass.prototype, "hasReferences", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppClass.prototype, "hasStaticConstructor", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppClass.prototype, "image", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppClass.prototype, "instanceSize", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppClass.prototype, "isAbstract", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppClass.prototype, "isBlittable", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppClass.prototype, "isEnum", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppClass.prototype, "isGeneric", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppClass.prototype, "isInflated", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppClass.prototype, "isInterface", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppClass.prototype, "isValueType", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppClass.prototype, "interfaces", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppClass.prototype, "methods", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppClass.prototype, "name", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppClass.prototype, "namespace", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppClass.prototype, "nestedClasses", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppClass.prototype, "parent", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppClass.prototype, "rank", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppClass.prototype, "staticFieldsData", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppClass.prototype, "valueSize", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppClass.prototype, "type", null);
__decorate([
    (0, utils_1.levenshtein)("fields")
], Il2CppClass.prototype, "field", null);
__decorate([
    (0, utils_1.levenshtein)("methods")
], Il2CppClass.prototype, "method", null);
__decorate([
    (0, utils_1.levenshtein)("nestedClasses")
], Il2CppClass.prototype, "nested", null);
Il2CppClass = __decorate([
    utils_1.cacheInstances
], Il2CppClass);
Il2Cpp.Class = Il2CppClass;

},{"../../utils/console":134,"../../utils/native-struct":135,"../../utils/utils":137,"decorator-cache-getter":105}],115:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_cache_getter_1 = require("decorator-cache-getter");
const utils_1 = require("../../utils/utils");
/** Represents a `Il2CppDomain`. */
class Il2CppDomain {
    constructor() { }
    /** Gets the assemblies that have been loaded into the execution context of the application domain. */
    static get assemblies() {
        const sizePointer = Memory.alloc(Process.pointerSize);
        const startPointer = Il2Cpp.Api._domainGetAssemblies(this, sizePointer);
        const count = sizePointer.readInt();
        const array = new Array(count);
        for (let i = 0; i < count; i++) {
            array[i] = new Il2Cpp.Assembly(startPointer.add(i * Process.pointerSize).readPointer());
        }
        if (count == 0) {
            for (const assemblyObject of this.object.method("GetAssemblies").overload().invoke()) {
                const assemblyName = assemblyObject.method("GetSimpleName").invoke().content;
                if (assemblyName != null) {
                    array.push(this.assembly(assemblyName));
                }
            }
        }
        return array;
    }
    /** Gets the application domain handle. */
    static get handle() {
        return Il2Cpp.Api._domainGet();
    }
    /** Gets the encompassing object of the application domain. */
    static get object() {
        return Il2Cpp.Image.corlib.class("System.AppDomain").method("get_CurrentDomain").invoke();
    }
    /** Opens and loads the assembly with the given name. */
    static assembly(name) {
        return this.tryAssembly(name);
    }
    /** Attached a new thread to the application domain. */
    static attach() {
        return new Il2Cpp.Thread(Il2Cpp.Api._threadAttach(this));
    }
    /** Opens and loads the assembly with the given name. */
    static tryAssembly(name) {
        const handle = Il2Cpp.Api._domainAssemblyOpen(this, Memory.allocUtf8String(name));
        return handle.isNull() ? null : new Il2Cpp.Assembly(handle);
    }
}
__decorate([
    decorator_cache_getter_1.cache
], Il2CppDomain, "assemblies", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppDomain, "handle", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppDomain, "object", null);
__decorate([
    (0, utils_1.levenshtein)("assemblies")
], Il2CppDomain, "assembly", null);
Il2Cpp.Domain = Il2CppDomain;

},{"../../utils/utils":137,"decorator-cache-getter":105}],116:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_cache_getter_1 = require("decorator-cache-getter");
const console_1 = require("../../utils/console");
const native_struct_1 = require("../../utils/native-struct");
const utils_1 = require("../utils");
/** Represents a `FieldInfo`. */
class Il2CppField extends native_struct_1.NonNullNativeStruct {
    /** Gets the class in which this field is defined. */
    get class() {
        return new Il2Cpp.Class(Il2Cpp.Api._fieldGetClass(this));
    }
    /** Gets the flags of the current field. */
    get flags() {
        return Il2Cpp.Api._fieldGetFlags(this);
    }
    /** Determines whether this field value is known at compile time. */
    get isLiteral() {
        return !!Il2Cpp.Api._fieldIsLiteral(this);
    }
    /** Determines whether this field is static. */
    get isStatic() {
        return !!Il2Cpp.Api._fieldIsStatic(this);
    }
    /** Determines whether this field is thread static. */
    get isThreadStatic() {
        return !!Il2Cpp.Api._fieldIsThreadStatic(this);
    }
    /** Gets the access modifier of this field. */
    get modifier() {
        return Il2Cpp.Api._fieldGetModifier(this).readUtf8String();
    }
    /** Gets the name of this field. */
    get name() {
        return Il2Cpp.Api._fieldGetName(this).readUtf8String();
    }
    /** Gets the offset of this field, calculated as the difference with its owner virtual address. */
    get offset() {
        return Il2Cpp.Api._fieldGetOffset(this);
    }
    /** Gets the type of this field. */
    get type() {
        return new Il2Cpp.Type(Il2Cpp.Api._fieldGetType(this));
    }
    /** Gets the value of this field. */
    get value() {
        const handle = Memory.alloc(Process.pointerSize);
        Il2Cpp.Api._fieldGetStaticValue(this.handle, handle);
        return (0, utils_1.read)(handle, this.type);
    }
    /** Sets the value of this field. Thread static or literal values cannot be altered yet. */
    set value(value) {
        if (this.isThreadStatic || this.isLiteral) {
            (0, console_1.raise)(`cannot modify the value of field ${this.name}: is thread static or literal`);
        }
        const handle = Memory.alloc(Process.pointerSize);
        (0, utils_1.write)(handle, value, this.type);
        Il2Cpp.Api._fieldSetStaticValue(this.handle, handle);
    }
    /** */
    toString() {
        return `\
${this.isThreadStatic ? `[ThreadStatic] ` : ``}\
${this.isStatic ? `static ` : ``}\
${this.type.name} \
${this.name}\
${this.isLiteral ? ` = ${this.type.class.isEnum ? (0, utils_1.read)(this.value.handle, this.type.class.baseType) : this.value}` : ``};\
${this.isThreadStatic || this.isLiteral ? `` : ` // 0x${this.offset.toString(16)}`}`;
    }
    /** @internal */
    withHolder(instance) {
        let valueHandle = instance.handle.add(this.offset);
        if (instance instanceof Il2Cpp.ValueType) {
            valueHandle = valueHandle.sub(Il2Cpp.Runtime.objectHeaderSize);
        }
        return new Proxy(this, {
            get(target, property) {
                if (property == "value") {
                    return (0, utils_1.read)(valueHandle, target.type);
                }
                return Reflect.get(target, property);
            },
            set(target, property, value) {
                if (property == "value") {
                    (0, utils_1.write)(valueHandle, value, target.type);
                    return true;
                }
                return Reflect.set(target, property, value);
            }
        });
    }
}
__decorate([
    decorator_cache_getter_1.cache
], Il2CppField.prototype, "class", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppField.prototype, "flags", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppField.prototype, "isLiteral", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppField.prototype, "isStatic", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppField.prototype, "isThreadStatic", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppField.prototype, "name", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppField.prototype, "offset", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppField.prototype, "type", null);
Reflect.set(Il2Cpp, "Field", Il2CppField);

},{"../../utils/console":134,"../../utils/native-struct":135,"../utils":132,"decorator-cache-getter":105}],117:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Represents a GCHandle. */
class Il2CppGCHandle {
    handle;
    /** @internal */
    constructor(handle) {
        this.handle = handle;
    }
    /** Gets the object associated to this handle. */
    get target() {
        const handle = Il2Cpp.Api._gcHandleGetTarget(this.handle);
        return handle.isNull() ? null : new Il2Cpp.Object(handle);
    }
    /** Frees this handle. */
    free() {
        return Il2Cpp.Api._gcHandleFree(this.handle);
    }
}
Il2Cpp.GC.Handle = Il2CppGCHandle;

},{}],118:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const versioning_1 = __importDefault(require("versioning"));
/** Garbage collector utility functions. */
class Il2CppGC {
    constructor() { }
    /** Gets the heap size in bytes. */
    static get heapSize() {
        return Il2Cpp.Api._gcGetHeapSize();
    }
    /** Determines whether the garbage collector is disabled. */
    static get isEnabled() {
        return !Il2Cpp.Api._gcIsDisabled();
    }
    /** Determines whether the garbage collector is incremental. */
    static get isIncremental() {
        return !!Il2Cpp.Api._gcIsIncremental();
    }
    /** Gets the number of nanoseconds the garbage collector can spend in a collection step. */
    static get maxTimeSlice() {
        return Il2Cpp.Api._gcGetMaxTimeSlice();
    }
    /** Gets the used heap size in bytes. */
    static get usedHeapSize() {
        return Il2Cpp.Api._gcGetUsedSize();
    }
    /** Enables or disables the garbage collector. */
    static set isEnabled(value) {
        value ? Il2Cpp.Api._gcEnable() : Il2Cpp.Api._gcDisable();
    }
    /** Sets the number of nanoseconds the garbage collector can spend in a collection step. */
    static set maxTimeSlice(nanoseconds) {
        Il2Cpp.Api._gcSetMaxTimeSlice(nanoseconds);
    }
    /** Returns the heap allocated objects of the specified class. This variant reads GC descriptors. */
    static choose(klass) {
        const matches = [];
        const callback = (objects, size, _) => {
            for (let i = 0; i < size; i++) {
                matches.push(new Il2Cpp.Object(objects.add(i * Process.pointerSize).readPointer()));
            }
        };
        const chooseCallback = new NativeCallback(callback, "void", ["pointer", "int", "pointer"]);
        if (versioning_1.default.gte(Il2Cpp.unityVersion, "2021.2.0")) {
            const realloc = (handle, size) => {
                if (!handle.isNull() && size.compare(0) == 0) {
                    Il2Cpp.free(handle);
                    return NULL;
                }
                else {
                    return Il2Cpp.alloc(size);
                }
            };
            const reallocCallback = new NativeCallback(realloc, "pointer", ["pointer", "size_t", "pointer"]);
            const state = Il2Cpp.Api._livenessAllocateStruct(klass.handle, 0, chooseCallback, NULL, reallocCallback);
            Il2Cpp.Api._livenessCalculationFromStatics(state);
            Il2Cpp.Api._livenessFinalize(state);
            Il2Cpp.Api._livenessFreeStruct(state);
        }
        else {
            const onWorld = new NativeCallback(() => { }, "void", []);
            const state = Il2Cpp.Api._livenessCalculationBegin(klass.handle, 0, chooseCallback, NULL, onWorld, onWorld);
            Il2Cpp.Api._livenessCalculationFromStatics(state);
            Il2Cpp.Api._livenessCalculationEnd(state);
        }
        return matches;
    }
    /** Forces a garbage collection of the specified generation. */
    static collect(generation) {
        Il2Cpp.Api._gcCollect(generation < 0 ? 0 : generation > 2 ? 2 : generation);
    }
    /** Forces a garbage collection. */
    static collectALittle() {
        Il2Cpp.Api._gcCollectALittle();
    }
    /** Resumes all the previously stopped threads. */
    static startWorld() {
        return Il2Cpp.Api._gcStartWorld();
    }
    /** Performs an incremental garbage collection. */
    static startIncrementalCollection() {
        return Il2Cpp.Api._gcStartIncrementalCollection();
    }
    /** Stops all threads which may access the garbage collected heap, other than the caller. */
    static stopWorld() {
        return Il2Cpp.Api._gcStopWorld();
    }
}
Reflect.set(Il2Cpp, "GC", Il2CppGC);

},{"versioning":140}],119:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_cache_getter_1 = require("decorator-cache-getter");
const native_struct_1 = require("../../utils/native-struct");
const utils_1 = require("../../utils/utils");
/** Represents a `Il2CppImage`. */
let Il2CppImage = class Il2CppImage extends native_struct_1.NonNullNativeStruct {
    /** Gets the COR library. */
    static get corlib() {
        return new Il2Cpp.Image(Il2Cpp.Api._getCorlib());
    }
    /** Gets the assembly in which the current image is defined. */
    get assembly() {
        return new Il2Cpp.Assembly(Il2Cpp.Api._imageGetAssembly(this));
    }
    /** Gets the amount of classes defined in this image. */
    get classCount() {
        return Il2Cpp.Api._imageGetClassCount(this);
    }
    /** Gets the classes defined in this image. */
    get classes() {
        if (Il2Cpp.unityVersionIsBelow201830) {
            const types = this.assembly.object.method("GetTypes").invoke(false);
            // On Unity 5.3.8f1, getting System.Reflection.Emit.OpCodes type name
            // without iterating all the classes first somehow blows things up at
            // app startup, hence the `Array.from`.
            return Array.from(types).map(e => new Il2Cpp.Class(Il2Cpp.Api._classFromSystemType(e)));
        }
        else {
            return Array.from(Array(this.classCount), (_, i) => new Il2Cpp.Class(Il2Cpp.Api._imageGetClass(this, i)));
        }
    }
    /** Gets the name of this image. */
    get name() {
        return Il2Cpp.Api._imageGetName(this).readUtf8String();
    }
    /** Gets the class with the specified name defined in this image. */
    class(name) {
        return this.tryClass(name);
    }
    /** Gets the class with the specified name defined in this image. */
    tryClass(name) {
        const dotIndex = name.lastIndexOf(".");
        const classNamespace = Memory.allocUtf8String(dotIndex == -1 ? "" : name.slice(0, dotIndex));
        const className = Memory.allocUtf8String(name.slice(dotIndex + 1));
        const handle = Il2Cpp.Api._classFromName(this, classNamespace, className);
        return handle.isNull() ? null : new Il2Cpp.Class(handle);
    }
};
__decorate([
    decorator_cache_getter_1.cache
], Il2CppImage.prototype, "assembly", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppImage.prototype, "classCount", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppImage.prototype, "classes", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppImage.prototype, "name", null);
__decorate([
    (0, utils_1.levenshtein)("classes", e => (e.namespace ? `${e.namespace}.${e.name}` : e.name))
], Il2CppImage.prototype, "class", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppImage, "corlib", null);
Il2CppImage = __decorate([
    utils_1.cacheInstances
], Il2CppImage);
Il2Cpp.Image = Il2CppImage;

},{"../../utils/native-struct":135,"../../utils/utils":137,"decorator-cache-getter":105}],120:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_cache_getter_1 = require("decorator-cache-getter");
const native_struct_1 = require("../../utils/native-struct");
const utils_1 = require("../../utils/utils");
/** Represents a `Il2CppManagedMemorySnapshot`. */
class Il2CppMemorySnapshot extends native_struct_1.NonNullNativeStruct {
    /** Captures a memory snapshot. */
    static capture() {
        return new Il2Cpp.MemorySnapshot();
    }
    /** Creates a memory snapshot with the given handle. */
    constructor(handle = Il2Cpp.Api._memorySnapshotCapture()) {
        super(handle);
    }
    /** Gets any initialized class. */
    get classes() {
        return Array.from((0, utils_1.nativeIterator)(this, Il2Cpp.Api._memorySnapshotGetClasses, Il2Cpp.Class));
    }
    /** Gets the objects tracked by this memory snapshot. */
    get objects() {
        const array = [];
        const [count, start] = Il2Cpp.Api._memorySnapshotGetGCHandles(this);
        for (let i = 0; i < count; i++) {
            array.push(new Il2Cpp.Object(start.add(i * Process.pointerSize).readPointer()));
        }
        return array;
    }
    /** Frees this memory snapshot. */
    free() {
        Il2Cpp.Api._memorySnapshotFree(this);
    }
}
__decorate([
    decorator_cache_getter_1.cache
], Il2CppMemorySnapshot.prototype, "classes", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppMemorySnapshot.prototype, "objects", null);
Il2Cpp.MemorySnapshot = Il2CppMemorySnapshot;

},{"../../utils/native-struct":135,"../../utils/utils":137,"decorator-cache-getter":105}],121:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_cache_getter_1 = require("decorator-cache-getter");
const console_1 = require("../../utils/console");
const native_struct_1 = require("../../utils/native-struct");
const utils_1 = require("../../utils/utils");
const utils_2 = require("../utils");
/** Represents a `MethodInfo`. */
class Il2CppMethod extends native_struct_1.NonNullNativeStruct {
    /** Gets the class in which this method is defined. */
    get class() {
        return new Il2Cpp.Class(Il2Cpp.Api._methodGetClass(this));
    }
    /** Gets the flags of the current method. */
    get flags() {
        return Il2Cpp.Api._methodGetFlags(this, NULL);
    }
    /** Gets the implementation flags of the current method. */
    get implementationFlags() {
        const implementationFlagsPointer = Memory.alloc(Process.pointerSize);
        Il2Cpp.Api._methodGetFlags(this, implementationFlagsPointer);
        return implementationFlagsPointer.readU32();
    }
    /** */
    get fridaSignature() {
        const types = [];
        for (const parameter of this.parameters) {
            types.push(parameter.type.fridaAlias);
        }
        if (!this.isStatic || Il2Cpp.unityVersionIsBelow201830) {
            types.unshift("pointer");
        }
        if (this.isInflated) {
            types.push("pointer");
        }
        return types;
    }
    /** Gets the amount of generic parameters of this generic method. */
    get genericParameterCount() {
        if (!this.isGeneric) {
            return 0;
        }
        return this.object.method("GetGenericArguments").invoke().length;
    }
    /** Determines whether this method is external. */
    get isExternal() {
        return !!Il2Cpp.Api._methodIsExternal(this);
    }
    /** Determines whether this method is generic. */
    get isGeneric() {
        return !!Il2Cpp.Api._methodIsGeneric(this);
    }
    /** Determines whether this method is inflated (generic with a concrete type parameter). */
    get isInflated() {
        return !!Il2Cpp.Api._methodIsInflated(this);
    }
    /** Determines whether this method is static. */
    get isStatic() {
        return !Il2Cpp.Api._methodIsInstance(this);
    }
    /** Determines whether this method is synchronized. */
    get isSynchronized() {
        return !!Il2Cpp.Api._methodIsSynchronized(this);
    }
    /** Gets the access modifier of this method. */
    get modifier() {
        return Il2Cpp.Api._methodGetModifier(this).readUtf8String();
    }
    /** Gets the name of this method. */
    get name() {
        return Il2Cpp.Api._methodGetName(this).readUtf8String();
    }
    /** @internal */
    get nativeFunction() {
        return new NativeFunction(this.virtualAddress, this.returnType.fridaAlias, this.fridaSignature);
    }
    /** Gets the encompassing object of the current method. */
    get object() {
        return new Il2Cpp.Object(Il2Cpp.Api._methodGetObject(this, NULL));
    }
    /** Gets the amount of parameters of this method. */
    get parameterCount() {
        return Il2Cpp.Api._methodGetParameterCount(this);
    }
    /** Gets the parameters of this method. */
    get parameters() {
        return Array.from(Array(this.parameterCount), (_, i) => {
            const parameterName = Il2Cpp.Api._methodGetParameterName(this, i).readUtf8String();
            const parameterType = Il2Cpp.Api._methodGetParameterType(this, i);
            return new Il2Cpp.Parameter(parameterName, i, new Il2Cpp.Type(parameterType));
        });
    }
    /** Gets the relative virtual address (RVA) of this method. */
    get relativeVirtualAddress() {
        return this.virtualAddress.sub(Il2Cpp.module.base);
    }
    /** Gets the return type of this method. */
    get returnType() {
        return new Il2Cpp.Type(Il2Cpp.Api._methodGetReturnType(this));
    }
    /** Gets the virtual address (VA) to this method. */
    get virtualAddress() {
        return Il2Cpp.Api._methodGetPointer(this);
    }
    /** Replaces the body of this method. */
    set implementation(block) {
        const startIndex = +!this.isStatic | +Il2Cpp.unityVersionIsBelow201830;
        const callback = (...args) => {
            const parameters = this.parameters.map((e, i) => (0, utils_2.fromFridaValue)(args[i + startIndex], e.type));
            return (0, utils_2.toFridaValue)(block.call(this.isStatic ? this.class : new Il2Cpp.Object(args[0]), ...parameters));
        };
        try {
            Interceptor.replace(this.virtualAddress, new NativeCallback(callback, this.returnType.fridaAlias, this.fridaSignature));
        }
        catch (e) {
            switch (e.message) {
                case "access violation accessing 0x0":
                    (0, console_1.raise)(`cannot implement method ${this.name}: it has a NULL virtual address`);
                case `unable to intercept function at ${this.virtualAddress}; please file a bug`:
                    (0, console_1.warn)(`cannot implement method ${this.name}: it may be a thunk`);
                    break;
                case "already replaced this function":
                    (0, console_1.warn)(`cannot implement method ${this.name}: already replaced by a thunk`);
                    break;
                default:
                    throw e;
            }
        }
    }
    /** Creates a generic instance of the current generic method. */
    inflate(...classes) {
        if (!this.isGeneric) {
            (0, console_1.raise)(`cannot inflate method ${this.name}: it has no generic parameters`);
        }
        if (this.genericParameterCount != classes.length) {
            (0, console_1.raise)(`cannot inflate method ${this.name}: it needs ${this.genericParameterCount} generic parameter(s), not ${classes.length}`);
        }
        const types = classes.map(klass => klass.type.object);
        const typeArray = Il2Cpp.Array.from(Il2Cpp.Image.corlib.class("System.Type"), types);
        const inflatedMethodObject = this.object.method("MakeGenericMethod", 1).invoke(typeArray);
        return new Il2Cpp.Method(Il2Cpp.Api._methodGetFromReflection(inflatedMethodObject));
    }
    /** Invokes this method. */
    invoke(...parameters) {
        if (!this.isStatic) {
            (0, console_1.raise)(`cannot invoke a non-static method ${this.name}: must be invoked throught a Il2Cpp.Object, not a Il2Cpp.Class`);
        }
        return this.invokeRaw(NULL, ...parameters);
    }
    /** @internal */
    invokeRaw(instance, ...parameters) {
        const allocatedParameters = parameters.map(utils_2.toFridaValue);
        if (!this.isStatic || Il2Cpp.unityVersionIsBelow201830) {
            allocatedParameters.unshift(instance);
        }
        if (this.isInflated) {
            allocatedParameters.push(this.handle);
        }
        try {
            const returnValue = this.nativeFunction(...allocatedParameters);
            return (0, utils_2.fromFridaValue)(returnValue, this.returnType);
        }
        catch (e) {
            if (e == null) {
                (0, console_1.raise)("an unexpected native function exception occurred, this is due to parameter types mismatch");
            }
            switch (e.message) {
                case "bad argument count":
                    (0, console_1.raise)(`cannot invoke method ${this.name}: it needs ${this.parameterCount} parameter(s), not ${parameters.length}`);
                case "expected a pointer":
                case "expected number":
                case "expected array with fields":
                    (0, console_1.raise)(`cannot invoke method ${this.name}: parameter types mismatch`);
            }
            throw e;
        }
    }
    /** Gets the overloaded method with the given parameter types. */
    overload(...parameterTypes) {
        const result = this.tryOverload(...parameterTypes);
        if (result != undefined)
            return result;
        (0, console_1.raise)(`cannot find overloaded method ${this.name}(${parameterTypes})`);
    }
    /** Gets the parameter with the given name. */
    parameter(name) {
        return this.tryParameter(name);
    }
    /** Restore the original method implementation. */
    revert() {
        Interceptor.revert(this.virtualAddress);
        Interceptor.flush();
    }
    /** Gets the overloaded method with the given parameter types. */
    tryOverload(...parameterTypes) {
        return this.class.methods.find(e => e.name == this.name &&
            e.parameterCount == parameterTypes.length &&
            e.parameters.every((e, i) => e.type.name == parameterTypes[i]));
    }
    /** Gets the parameter with the given name. */
    tryParameter(name) {
        return this.parameters.find(e => e.name == name);
    }
    /** */
    toString() {
        return `\
${this.isStatic ? `static ` : ``}\
${this.returnType.name} \
${this.name}\
(${this.parameters.join(`, `)});\
${this.virtualAddress.isNull() ? `` : ` // 0x${this.relativeVirtualAddress.toString(16).padStart(8, `0`)}`}`;
    }
    /** @internal */
    withHolder(instance) {
        return new Proxy(this, {
            get(target, property) {
                switch (property) {
                    case "invoke":
                        return target.invokeRaw.bind(target, instance.handle);
                    case "inflate":
                    case "overload":
                    case "tryOverload":
                        return function (...args) {
                            return target[property](...args)?.withHolder(instance);
                        };
                }
                return Reflect.get(target, property);
            }
        });
    }
}
__decorate([
    decorator_cache_getter_1.cache
], Il2CppMethod.prototype, "class", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppMethod.prototype, "flags", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppMethod.prototype, "implementationFlags", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppMethod.prototype, "fridaSignature", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppMethod.prototype, "genericParameterCount", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppMethod.prototype, "isExternal", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppMethod.prototype, "isGeneric", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppMethod.prototype, "isInflated", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppMethod.prototype, "isStatic", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppMethod.prototype, "isSynchronized", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppMethod.prototype, "name", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppMethod.prototype, "nativeFunction", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppMethod.prototype, "object", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppMethod.prototype, "parameterCount", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppMethod.prototype, "parameters", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppMethod.prototype, "relativeVirtualAddress", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppMethod.prototype, "returnType", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppMethod.prototype, "virtualAddress", null);
__decorate([
    (0, utils_1.levenshtein)("parameters")
], Il2CppMethod.prototype, "parameter", null);
Reflect.set(Il2Cpp, "Method", Il2CppMethod);

},{"../../utils/console":134,"../../utils/native-struct":135,"../../utils/utils":137,"../utils":132,"decorator-cache-getter":105}],122:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_cache_getter_1 = require("decorator-cache-getter");
const native_struct_1 = require("../../utils/native-struct");
/** Represents a `Il2CppObject`. */
class Il2CppObject extends native_struct_1.NativeStruct {
    /** Gets the class of this object. */
    get class() {
        return new Il2Cpp.Class(Il2Cpp.Api._objectGetClass(this));
    }
    /** Gets the size of the current object. */
    get size() {
        return Il2Cpp.Api._objectGetSize(this);
    }
    /** Acquires an exclusive lock on the current object. */
    enter() {
        return Il2Cpp.Api._monitorEnter(this);
    }
    /** Release an exclusive lock on the current object. */
    exit() {
        return Il2Cpp.Api._monitorExit(this);
    }
    /** Gets the field with the given name. */
    field(name) {
        return this.class.field(name).withHolder(this);
    }
    /** Gets the method with the given name. */
    method(name, parameterCount = -1) {
        return this.class.method(name, parameterCount).withHolder(this);
    }
    /** Notifies a thread in the waiting queue of a change in the locked object's state. */
    pulse() {
        return Il2Cpp.Api._monitorPulse(this);
    }
    /** Notifies all waiting threads of a change in the object's state. */
    pulseAll() {
        return Il2Cpp.Api._monitorPulseAll(this);
    }
    /** Creates a reference to this object. */
    ref(pin) {
        return new Il2Cpp.GC.Handle(Il2Cpp.Api._gcHandleNew(this, +pin));
    }
    /** Gets the correct virtual method from the given virtual method. */
    virtualMethod(method) {
        return new Il2Cpp.Method(Il2Cpp.Api._objectGetVirtualMethod(this, method)).withHolder(this);
    }
    /** Attempts to acquire an exclusive lock on the current object. */
    tryEnter(timeout) {
        return !!Il2Cpp.Api._monitorTryEnter(this, timeout);
    }
    /** Gets the field with the given name. */
    tryField(name) {
        return this.class.tryField(name)?.withHolder(this);
    }
    /** Gets the field with the given name. */
    tryMethod(name, parameterCount = -1) {
        return this.class.tryMethod(name, parameterCount)?.withHolder(this);
    }
    /** Releases the lock on an object and attempts to block the current thread until it reacquires the lock. */
    tryWait(timeout) {
        return !!Il2Cpp.Api._monitorTryWait(this, timeout);
    }
    /** */
    toString() {
        return this.isNull() ? "null" : this.method("ToString").invoke().content ?? "null";
    }
    /** Unboxes the value type out of this object. */
    unbox() {
        return new Il2Cpp.ValueType(Il2Cpp.Api._objectUnbox(this), this.class.type);
    }
    /** Releases the lock on an object and blocks the current thread until it reacquires the lock. */
    wait() {
        return Il2Cpp.Api._monitorWait(this);
    }
    /** Creates a weak reference to this object. */
    weakRef(trackResurrection) {
        return new Il2Cpp.GC.Handle(Il2Cpp.Api._gcHandleNewWeakRef(this, +trackResurrection));
    }
}
__decorate([
    decorator_cache_getter_1.cache
], Il2CppObject.prototype, "class", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppObject.prototype, "size", null);
Il2Cpp.Object = Il2CppObject;

},{"../../utils/native-struct":135,"decorator-cache-getter":105}],123:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Represents a `ParameterInfo`. */
class Il2CppParameter {
    /** Name of this parameter. */
    name;
    /** Position of this parameter. */
    position;
    /** Type of this parameter. */
    type;
    constructor(name, position, type) {
        this.name = name;
        this.position = position;
        this.type = type;
    }
    /** */
    toString() {
        return `${this.type.name} ${this.name}`;
    }
}
Il2Cpp.Parameter = Il2CppParameter;

},{}],124:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const native_struct_1 = require("../../utils/native-struct");
/** */
class Il2CppPointer extends native_struct_1.NativeStruct {
    type;
    constructor(handle, type) {
        super(handle);
        this.type = type;
    }
    /** Gets the element at the given index. */
    get(index) {
        return (0, utils_1.read)(this.handle.add(index * this.type.class.arrayElementSize), this.type);
    }
    /** Reads the given amount of elements starting at the given offset. */
    read(length, offset = 0) {
        const values = new Array(length);
        for (let i = 0; i < length; i++) {
            values[i] = this.get(i + offset);
        }
        return values;
    }
    /** Sets the given element at the given index */
    set(index, value) {
        (0, utils_1.write)(this.handle.add(index * this.type.class.arrayElementSize), value, this.type);
    }
    /** */
    toString() {
        return this.handle.toString();
    }
    /** Writes the given elements starting at the given index. */
    write(values, offset = 0) {
        for (let i = 0; i < values.length; i++) {
            this.set(i + offset, values[i]);
        }
    }
}
Il2Cpp.Pointer = Il2CppPointer;

},{"../../utils/native-struct":135,"../utils":132}],125:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const native_struct_1 = require("../../utils/native-struct");
const console_1 = require("../../utils/console");
/** Represent a parameter passed by reference. */
class Il2CppReference extends native_struct_1.NativeStruct {
    type;
    constructor(handle, type) {
        super(handle);
        this.type = type;
    }
    /** Gets the element referenced by the current reference. */
    get value() {
        return (0, utils_1.read)(this.handle, this.type);
    }
    /** Sets the element referenced by the current reference. */
    set value(value) {
        (0, utils_1.write)(this.handle, value, this.type);
    }
    /** */
    toString() {
        return this.isNull() ? "null" : `->${this.value}`;
    }
    /** Creates a reference to the specified value. */
    static to(value, type) {
        const handle = Memory.alloc(Process.pointerSize);
        switch (typeof value) {
            case "boolean":
                return new Il2Cpp.Reference(handle.writeS8(+value), Il2Cpp.Image.corlib.class("System.Boolean").type);
            case "number":
                switch (type?.typeEnum) {
                    case 5 /* U1 */:
                        return new Il2Cpp.Reference(handle.writeU8(value), type);
                    case 4 /* I1 */:
                        return new Il2Cpp.Reference(handle.writeS8(value), type);
                    case 3 /* Char */:
                    case 7 /* U2 */:
                        return new Il2Cpp.Reference(handle.writeU16(value), type);
                    case 6 /* I2 */:
                        return new Il2Cpp.Reference(handle.writeS16(value), type);
                    case 9 /* U4 */:
                        return new Il2Cpp.Reference(handle.writeU32(value), type);
                    case 8 /* I4 */:
                        return new Il2Cpp.Reference(handle.writeS32(value), type);
                    case 11 /* U8 */:
                        return new Il2Cpp.Reference(handle.writeU64(value), type);
                    case 10 /* I8 */:
                        return new Il2Cpp.Reference(handle.writeS64(value), type);
                    case 12 /* R4 */:
                        return new Il2Cpp.Reference(handle.writeFloat(value), type);
                    case 13 /* R8 */:
                        return new Il2Cpp.Reference(handle.writeDouble(value), type);
                }
            case "object":
                if (value instanceof Il2Cpp.ValueType || value instanceof Il2Cpp.Pointer) {
                    return new Il2Cpp.Reference(handle.writePointer(value), value.type);
                }
                else if (value instanceof Il2Cpp.Object) {
                    return new Il2Cpp.Reference(handle.writePointer(value), value.class.type);
                }
                else if (value instanceof Il2Cpp.String || value instanceof Il2Cpp.Array) {
                    return new Il2Cpp.Reference(handle.writePointer(value), value.object.class.type);
                }
                else if (value instanceof NativePointer) {
                    switch (type?.typeEnum) {
                        case 25 /* UnsignedNativeInteger */:
                        case 24 /* NativeInteger */:
                            return new Il2Cpp.Reference(handle.writePointer(value), type);
                    }
                }
                else if (value instanceof Int64) {
                    return new Il2Cpp.Reference(handle.writeS64(value), Il2Cpp.Image.corlib.class("System.Int64").type);
                }
                else if (value instanceof UInt64) {
                    return new Il2Cpp.Reference(handle.writeU64(value), Il2Cpp.Image.corlib.class("System.UInt64").type);
                }
            default:
                (0, console_1.raise)(`don't know how to create a reference to ${value} using type ${type?.name}`);
        }
    }
}
Il2Cpp.Reference = Il2CppReference;

},{"../../utils/console":134,"../../utils/native-struct":135,"../utils":132}],126:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const native_struct_1 = require("../../utils/native-struct");
/** Represents a `Il2CppString`. */
class Il2CppString extends native_struct_1.NativeStruct {
    /** Gets the content of this string. */
    get content() {
        return Il2Cpp.Api._stringChars(this).readUtf16String(this.length);
    }
    /** Sets the content of this string. */
    set content(value) {
        Il2Cpp.Api._stringChars(this).writeUtf16String(value ?? "");
        Il2Cpp.Api._stringSetLength(this, value?.length ?? 0);
    }
    /** Gets the length of this string. */
    get length() {
        return Il2Cpp.Api._stringLength(this);
    }
    /** Gets the encompassing object of the current string. */
    get object() {
        return new Il2Cpp.Object(this);
    }
    /** */
    toString() {
        return this.isNull() ? "null" : `"${this.content}"`;
    }
    /** Creates a new string with the specified content. */
    static from(content) {
        return new Il2Cpp.String(Il2Cpp.Api._stringNew(Memory.allocUtf8String(content || "")));
    }
}
Il2Cpp.String = Il2CppString;

},{"../../utils/native-struct":135}],127:[function(require,module,exports){
(function (setImmediate){(function (){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_cache_getter_1 = require("decorator-cache-getter");
const console_1 = require("../../utils/console");
const native_struct_1 = require("../../utils/native-struct");
/** Represents a `Il2CppThread`. */
class Il2CppThread extends native_struct_1.NativeStruct {
    /** @internal */
    static get idOffset() {
        const handle = ptr(Il2Cpp.currentThread.internal.field("thread_id").value.toString());
        const currentThreadId = Process.getCurrentThreadId();
        for (let i = 0; i < 1024; i++) {
            const candidate = handle.add(i).readS32();
            if (candidate == currentThreadId) {
                return i;
            }
        }
        (0, console_1.raise)(`couldn't determine the offset for a native thread id value`);
    }
    /** Gets the native id of the current thread. */
    get id() {
        return ptr(this.internal.field("thread_id").value.toString()).add(Il2Cpp.Thread.idOffset).readS32();
    }
    /** @internal Gets the encompassing internal object (System.Threding.InternalThreead) of the current thread. */
    get internal() {
        const internalThread = this.object.tryField("internal_thread")?.value;
        return internalThread ? internalThread : this.object;
    }
    /** Determines whether the current thread is the garbage collector finalizer one. */
    get isFinalizer() {
        return !Il2Cpp.Api._threadIsVm(this);
    }
    /** Gets the encompassing object of the current thread. */
    get object() {
        return new Il2Cpp.Object(this);
    }
    /** @internal */
    get staticData() {
        return this.internal.field("static_data").value;
    }
    /** @internal */
    get synchronizationContext() {
        const get_ExecutionContext = this.object.tryMethod("GetMutableExecutionContext") || this.object.method("get_ExecutionContext");
        let synchronizationContext = get_ExecutionContext.invoke().tryMethod("get_SynchronizationContext")?.invoke();
        if (synchronizationContext == null) {
            const SystemThreadingSynchronizationContext = Il2Cpp.Image.corlib.class("System.Threading.SynchronizationContext");
            for (let i = 0; i < 16; i++) {
                try {
                    const candidate = new Il2Cpp.Object(this.staticData
                        .add(Process.pointerSize * i)
                        .readPointer()
                        .readPointer());
                    if (candidate.class.isSubclassOf(SystemThreadingSynchronizationContext, false)) {
                        synchronizationContext = candidate;
                        break;
                    }
                }
                catch (e) { }
            }
        }
        if (synchronizationContext == null) {
            (0, console_1.raise)("couldn't retrieve the SynchronizationContext for this thread.");
        }
        return synchronizationContext;
    }
    /** Detaches the thread from the application domain. */
    detach() {
        return Il2Cpp.Api._threadDetach(this);
    }
    /** Schedules a callback on the current thread. */
    schedule(block, delayMs = 0) {
        const threadId = this.id;
        const GetDisplayName = Il2Cpp.Image.corlib.class("Mono.Runtime").method("GetDisplayName");
        const SendOrPostCallback = Il2Cpp.Image.corlib.class("System.Threading.SendOrPostCallback").alloc();
        SendOrPostCallback.method(".ctor").invoke(NULL, GetDisplayName.handle);
        const Post = this.synchronizationContext.method("Post");
        return new Promise(resolve => {
            const listener = Interceptor.attach(GetDisplayName.virtualAddress, function () {
                if (this.threadId == threadId) {
                    listener.detach();
                    const result = block();
                    setImmediate(() => resolve(result));
                }
            });
            setTimeout(() => Post.invoke(SendOrPostCallback, NULL), delayMs);
        });
    }
}
__decorate([
    decorator_cache_getter_1.cache
], Il2CppThread.prototype, "internal", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppThread.prototype, "object", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppThread.prototype, "staticData", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppThread.prototype, "synchronizationContext", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppThread, "idOffset", null);
Il2Cpp.Thread = Il2CppThread;

}).call(this)}).call(this,require("timers").setImmediate)

},{"../../utils/console":134,"../../utils/native-struct":135,"decorator-cache-getter":105,"timers":139}],128:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],129:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_cache_getter_1 = require("decorator-cache-getter");
const native_struct_1 = require("../../utils/native-struct");
/** Represents a `Il2CppType`. */
class Il2CppType extends native_struct_1.NonNullNativeStruct {
    /** Gets the class of this type. */
    get class() {
        return new Il2Cpp.Class(Il2Cpp.Api._classFromType(this));
    }
    /** */
    get fridaAlias() {
        if (this.isByReference) {
            return "pointer";
        }
        switch (this.typeEnum) {
            case 1 /* Void */:
                return "void";
            case 2 /* Boolean */:
                return "bool";
            case 3 /* Char */:
                return "uchar";
            case 4 /* I1 */:
                return "int8";
            case 5 /* U1 */:
                return "uint8";
            case 6 /* I2 */:
                return "int16";
            case 7 /* U2 */:
                return "uint16";
            case 8 /* I4 */:
                return "int32";
            case 9 /* U4 */:
                return "uint32";
            case 10 /* I8 */:
                return "int64";
            case 11 /* U8 */:
                return "uint64";
            case 12 /* R4 */:
                return "float";
            case 13 /* R8 */:
                return "double";
            case 17 /* ValueType */:
                return getValueTypeFields(this);
            case 24 /* NativeInteger */:
            case 25 /* UnsignedNativeInteger */:
            case 15 /* Pointer */:
            case 14 /* String */:
            case 29 /* SingleDimensionalZeroLowerBoundArray */:
            case 20 /* Array */:
                return "pointer";
            case 18 /* Class */:
            case 28 /* Object */:
            case 21 /* GenericInstance */:
                return this.class.isValueType ? getValueTypeFields(this) : "pointer";
            default:
                return "pointer";
        }
    }
    /** Determines whether this type is passed by reference. */
    get isByReference() {
        return !!Il2Cpp.Api._typeIsByReference(this);
    }
    /** Determines whether this type is primitive. */
    get isPrimitive() {
        return !!Il2Cpp.Api._typeIsPrimitive(this);
    }
    /** Gets the name of this type. */
    get name() {
        const handle = Il2Cpp.Api._typeGetName(this);
        try {
            return handle.readUtf8String();
        }
        finally {
            Il2Cpp.free(handle);
        }
    }
    /** Gets the encompassing object of the current type. */
    get object() {
        return new Il2Cpp.Object(Il2Cpp.Api._typeGetObject(this));
    }
    /** Gets the type enum of the current type. */
    get typeEnum() {
        return Il2Cpp.Api._typeGetTypeEnum(this);
    }
    /** */
    toString() {
        return this.name;
    }
}
__decorate([
    decorator_cache_getter_1.cache
], Il2CppType.prototype, "class", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppType.prototype, "fridaAlias", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppType.prototype, "isByReference", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppType.prototype, "isPrimitive", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppType.prototype, "name", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppType.prototype, "object", null);
__decorate([
    decorator_cache_getter_1.cache
], Il2CppType.prototype, "typeEnum", null);
function getValueTypeFields(type) {
    const instanceFields = type.class.fields.filter(f => !f.isStatic);
    return instanceFields.length == 0 ? ["char"] : instanceFields.map(f => f.type.fridaAlias);
}
Reflect.set(Il2Cpp, "Type", Il2CppType);

},{"../../utils/native-struct":135,"decorator-cache-getter":105}],130:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const native_struct_1 = require("../../utils/native-struct");
/** Value type class utility. */
class Il2CppValueType extends native_struct_1.NativeStruct {
    type;
    constructor(handle, type) {
        super(handle);
        this.type = type;
    }
    /** Boxes the current value type in a object. */
    box() {
        return new Il2Cpp.Object(Il2Cpp.Api._valueBox(this.type.class, this));
    }
    /** Gets the field with the given name. */
    field(name) {
        return this.type.class.field(name).withHolder(this);
    }
    /** */
    toString() {
        return this.isNull() ? "null" : this.box().toString();
    }
}
Il2Cpp.ValueType = Il2CppValueType;

},{"../../utils/native-struct":135}],131:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("../utils/console");
const utils_1 = require("./utils");
/** Tracing utilities. */
class Il2CppTracer {
    /** @internal */
    targets = [];
    /** @internal */
    #assemblies;
    /** @internal */
    #classes;
    /** @internal */
    #methods;
    /** @internal */
    #assemblyFilter;
    /** @internal */
    #classFilter;
    /** @internal */
    #methodFilter;
    /** @internal */
    #parameterFilter;
    domain() {
        return this;
    }
    assemblies(...assemblies) {
        this.#assemblies = assemblies;
        return this;
    }
    classes(...classes) {
        this.#classes = classes;
        return this;
    }
    methods(...methods) {
        this.#methods = methods;
        return this;
    }
    filterAssemblies(filter) {
        this.#assemblyFilter = filter;
        return this;
    }
    filterClasses(filter) {
        this.#classFilter = filter;
        return this;
    }
    filterMethods(filter) {
        this.#methodFilter = filter;
        return this;
    }
    filterParameters(filter) {
        this.#parameterFilter = filter;
        return this;
    }
    and() {
        const filterMethod = (method) => {
            if (this.#parameterFilter == undefined) {
                this.targets.push(method);
                return;
            }
            for (const parameter of method.parameters) {
                if (this.#parameterFilter(parameter)) {
                    this.targets.push(method);
                    break;
                }
            }
        };
        const filterMethods = (values) => {
            for (const method of values) {
                filterMethod(method);
            }
        };
        const filterClass = (klass) => {
            if (this.#methodFilter == undefined) {
                filterMethods(klass.methods);
                return;
            }
            for (const method of klass.methods) {
                if (this.#methodFilter(method)) {
                    filterMethod(method);
                }
            }
        };
        const filterClasses = (values) => {
            for (const klass of values) {
                filterClass(klass);
            }
        };
        const filterAssembly = (assembly) => {
            if (this.#classFilter == undefined) {
                filterClasses(assembly.image.classes);
                return;
            }
            for (const klass of assembly.image.classes) {
                if (this.#classFilter(klass)) {
                    filterClass(klass);
                }
            }
        };
        const filterAssemblies = (assemblies) => {
            for (const assembly of assemblies) {
                filterAssembly(assembly);
            }
        };
        const filterDomain = (domain) => {
            if (this.#assemblyFilter == undefined) {
                filterAssemblies(domain.assemblies);
                return;
            }
            for (const assembly of domain.assemblies) {
                if (this.#assemblyFilter(assembly)) {
                    filterAssembly(assembly);
                }
            }
        };
        this.#methods
            ? filterMethods(this.#methods)
            : this.#classes
                ? filterClasses(this.#classes)
                : this.#assemblies
                    ? filterAssemblies(this.#assemblies)
                    : filterDomain(Il2Cpp.Domain);
        this.#assemblies = undefined;
        this.#classes = undefined;
        this.#methods = undefined;
        this.#assemblyFilter = undefined;
        this.#classFilter = undefined;
        this.#methodFilter = undefined;
        this.#parameterFilter = undefined;
        return this;
    }
    attach(mode = "full") {
        let count = 0;
        for (const target of this.targets) {
            if (target.virtualAddress.isNull()) {
                continue;
            }
            const offset = `\x1b[2m0x${target.relativeVirtualAddress.toString(16).padStart(8, `0`)}\x1b[0m`;
            const fullName = `${target.class.type.name}.\x1b[1m${target.name}\x1b[0m`;
            if (mode == "detailed") {
                const startIndex = +!target.isStatic | +Il2Cpp.unityVersionIsBelow201830;
                const callback = (...args) => {
                    const thisParameter = target.isStatic ? undefined : new Il2Cpp.Parameter("this", -1, target.class.type);
                    const parameters = thisParameter ? [thisParameter].concat(target.parameters) : target.parameters;
                    (0, console_1.inform)(`\
${offset} ${`│ `.repeat(count++)}┌─\x1b[35m${fullName}\x1b[0m(\
${parameters.map(e => `\x1b[32m${e.name}\x1b[0m = \x1b[31m${(0, utils_1.fromFridaValue)(args[e.position + startIndex], e.type)}\x1b[0m`).join(`, `)});`);
                    const returnValue = target.nativeFunction(...args);
                    (0, console_1.inform)(`\
${offset} ${`│ `.repeat(--count)}└─\x1b[33m${fullName}\x1b[0m\
${returnValue == undefined ? `` : ` = \x1b[36m${(0, utils_1.fromFridaValue)(returnValue, target.returnType)}`}\x1b[0m;`);
                    return returnValue;
                };
                try {
                    target.revert();
                    const nativeCallback = new NativeCallback(callback, target.returnType.fridaAlias, target.fridaSignature);
                    Interceptor.replace(target.virtualAddress, nativeCallback);
                }
                catch (e) { }
            }
            else {
                try {
                    Interceptor.attach(target.virtualAddress, {
                        onEnter: () => (0, console_1.inform)(`${offset} ${`│ `.repeat(count++)}┌─\x1b[35m${fullName}\x1b[0m`),
                        onLeave: () => (0, console_1.inform)(`${offset} ${`│ `.repeat(--count)}└─\x1b[33m${fullName}\x1b[0m${count == 0 ? `\n` : ``}`)
                    });
                }
                catch (e) { }
            }
        }
    }
}
Il2Cpp.Tracer = Il2CppTracer;

},{"../utils/console":134,"./utils":132}],132:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toFridaValue = exports.fromFridaValue = exports.write = exports.read = void 0;
const console_1 = require("../utils/console");
const native_struct_1 = require("../utils/native-struct");
/** @internal */
function read(pointer, type) {
    switch (type.typeEnum) {
        case 2 /* Boolean */:
            return !!pointer.readS8();
        case 4 /* I1 */:
            return pointer.readS8();
        case 5 /* U1 */:
            return pointer.readU8();
        case 6 /* I2 */:
            return pointer.readS16();
        case 7 /* U2 */:
            return pointer.readU16();
        case 8 /* I4 */:
            return pointer.readS32();
        case 9 /* U4 */:
            return pointer.readU32();
        case 3 /* Char */:
            return pointer.readU16();
        case 10 /* I8 */:
            return pointer.readS64();
        case 11 /* U8 */:
            return pointer.readU64();
        case 12 /* R4 */:
            return pointer.readFloat();
        case 13 /* R8 */:
            return pointer.readDouble();
        case 24 /* NativeInteger */:
        case 25 /* UnsignedNativeInteger */:
            return pointer.readPointer();
        case 15 /* Pointer */:
            return new Il2Cpp.Pointer(pointer.readPointer(), type.class.baseType);
        case 17 /* ValueType */:
            return new Il2Cpp.ValueType(pointer, type);
        case 28 /* Object */:
        case 18 /* Class */:
            return new Il2Cpp.Object(pointer.readPointer());
        case 21 /* GenericInstance */:
            return type.class.isValueType ? new Il2Cpp.ValueType(pointer, type) : new Il2Cpp.Object(pointer.readPointer());
        case 14 /* String */:
            return new Il2Cpp.String(pointer.readPointer());
        case 29 /* SingleDimensionalZeroLowerBoundArray */:
        case 20 /* Array */:
            return new Il2Cpp.Array(pointer.readPointer());
    }
    (0, console_1.raise)(`read: "${type.name}" (${type.typeEnum}) has not been handled yet. Please file an issue!`);
}
exports.read = read;
/** @internal */
function write(pointer, value, type) {
    switch (type.typeEnum) {
        case 2 /* Boolean */:
            return pointer.writeS8(+value);
        case 4 /* I1 */:
            return pointer.writeS8(value);
        case 5 /* U1 */:
            return pointer.writeU8(value);
        case 6 /* I2 */:
            return pointer.writeS16(value);
        case 7 /* U2 */:
            return pointer.writeU16(value);
        case 8 /* I4 */:
            return pointer.writeS32(value);
        case 9 /* U4 */:
            return pointer.writeU32(value);
        case 3 /* Char */:
            return pointer.writeU16(value);
        case 10 /* I8 */:
            return pointer.writeS64(value);
        case 11 /* U8 */:
            return pointer.writeU64(value);
        case 12 /* R4 */:
            return pointer.writeFloat(value);
        case 13 /* R8 */:
            return pointer.writeDouble(value);
        case 24 /* NativeInteger */:
        case 25 /* UnsignedNativeInteger */:
        case 15 /* Pointer */:
        case 17 /* ValueType */:
        case 14 /* String */:
        case 28 /* Object */:
        case 18 /* Class */:
        case 29 /* SingleDimensionalZeroLowerBoundArray */:
        case 20 /* Array */:
        case 21 /* GenericInstance */:
            if (value instanceof Il2Cpp.ValueType) {
                Memory.copy(pointer, value.handle, type.class.valueSize);
                return pointer;
            }
            return pointer.writePointer(value);
    }
    (0, console_1.raise)(`write: "${type.name}" (${type.typeEnum}) has not been handled yet. Please file an issue!`);
}
exports.write = write;
/** @internal */
function fromFridaValue(value, type) {
    if (Array.isArray(value)) {
        return arrayToValueType(type, value);
    }
    else if (value instanceof NativePointer) {
        if (type.isByReference) {
            return new Il2Cpp.Reference(value, type);
        }
        switch (type.typeEnum) {
            case 15 /* Pointer */:
                return new Il2Cpp.Pointer(value, type.class.baseType);
            case 14 /* String */:
                return new Il2Cpp.String(value);
            case 18 /* Class */:
            case 21 /* GenericInstance */:
            case 28 /* Object */:
                return new Il2Cpp.Object(value);
            case 29 /* SingleDimensionalZeroLowerBoundArray */:
            case 20 /* Array */:
                return new Il2Cpp.Array(value);
            default:
                return value;
        }
    }
    else if (type.typeEnum == 2 /* Boolean */) {
        return !!value;
    }
    else {
        return value;
    }
}
exports.fromFridaValue = fromFridaValue;
/** @internal */
function toFridaValue(value) {
    if (typeof value == "boolean") {
        return +value;
    }
    else if (value instanceof Il2Cpp.ValueType) {
        return valueTypeToArray(value);
    }
    else {
        return value;
    }
}
exports.toFridaValue = toFridaValue;
function valueTypeToArray(value) {
    const instanceFields = value.type.class.fields.filter(f => !f.isStatic);
    return instanceFields.length == 0
        ? [value.handle.readU8()]
        : instanceFields
            .map(field => field.withHolder(value).value)
            .map(value => value instanceof Il2Cpp.ValueType
            ? valueTypeToArray(value)
            : value instanceof native_struct_1.NativeStruct
                ? value.handle
                : typeof value == "boolean"
                    ? +value
                    : value);
}
function arrayToValueType(type, nativeValues) {
    function iter(type, startOffset = 0) {
        const arr = [];
        for (const field of type.class.fields) {
            if (!field.isStatic) {
                const offset = startOffset + field.offset - Il2Cpp.Runtime.objectHeaderSize;
                if (field.type.typeEnum == 17 /* ValueType */ ||
                    (field.type.typeEnum == 21 /* GenericInstance */ && field.type.class.isValueType)) {
                    arr.push(...iter(field.type, offset));
                }
                else {
                    arr.push([field.type.typeEnum, offset]);
                }
            }
        }
        if (arr.length == 0) {
            arr.push([5 /* U1 */, 0]);
        }
        return arr;
    }
    const valueType = Memory.alloc(type.class.valueSize);
    nativeValues = nativeValues.flat(Infinity);
    const typesAndOffsets = iter(type);
    for (let i = 0; i < nativeValues.length; i++) {
        const value = nativeValues[i];
        const [typeEnum, offset] = typesAndOffsets[i];
        const pointer = valueType.add(offset);
        switch (typeEnum) {
            case 2 /* Boolean */:
                pointer.writeS8(value);
                break;
            case 4 /* I1 */:
                pointer.writeS8(value);
                break;
            case 5 /* U1 */:
                pointer.writeU8(value);
                break;
            case 6 /* I2 */:
                pointer.writeS16(value);
                break;
            case 7 /* U2 */:
                pointer.writeU16(value);
                break;
            case 8 /* I4 */:
                pointer.writeS32(value);
                break;
            case 9 /* U4 */:
                pointer.writeU32(value);
                break;
            case 3 /* Char */:
                pointer.writeU16(value);
                break;
            case 10 /* I8 */:
                pointer.writeS64(value);
                break;
            case 11 /* U8 */:
                pointer.writeU64(value);
                break;
            case 12 /* R4 */:
                pointer.writeFloat(value);
                break;
            case 13 /* R8 */:
                pointer.writeDouble(value);
                break;
            case 24 /* NativeInteger */:
            case 25 /* UnsignedNativeInteger */:
            case 15 /* Pointer */:
            case 29 /* SingleDimensionalZeroLowerBoundArray */:
            case 20 /* Array */:
            case 14 /* String */:
            case 28 /* Object */:
            case 18 /* Class */:
            case 21 /* GenericInstance */:
                pointer.writePointer(value);
                break;
            default:
                (0, console_1.warn)(`arrayToValueType: defaulting ${typeEnum} to pointer`);
                pointer.writePointer(value);
                break;
        }
    }
    return new Il2Cpp.ValueType(valueType, type);
}

},{"../utils/console":134,"../utils/native-struct":135}],133:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./il2cpp");

},{"./il2cpp":110}],134:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inform = exports.ok = exports.warn = exports.raise = void 0;
/** @internal */
function raise(message) {
    throw `\x1B[0m\x1B[38;5;9mil2cpp\x1B[0m: ${message}`;
}
exports.raise = raise;
/** @internal */
function warn(message) {
    globalThis.console.log(`\x1B[38;5;11mil2cpp\x1B[0m: ${message}`);
}
exports.warn = warn;
/** @internal */
function ok(message) {
    globalThis.console.log(`\x1B[38;5;10mil2cpp\x1B[0m: ${message}`);
}
exports.ok = ok;
/** @internal */
function inform(message) {
    globalThis.console.log(`\x1B[38;5;12mil2cpp\x1B[0m: ${message}`);
}
exports.inform = inform;

},{}],135:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonNullNativeStruct = exports.NativeStruct = void 0;
/** Scaffold class. */
class NativeStruct {
    handle;
    constructor(handleOrWrapper) {
        if (handleOrWrapper instanceof NativePointer) {
            this.handle = handleOrWrapper;
        }
        else {
            this.handle = handleOrWrapper.handle;
        }
    }
    equals(other) {
        return this.handle.equals(other.handle);
    }
    isNull() {
        return this.handle.isNull();
    }
}
exports.NativeStruct = NativeStruct;
/** Scaffold class whom pointer cannot be null. */
class NonNullNativeStruct extends NativeStruct {
    constructor(handle) {
        super(handle);
        if (handle.isNull()) {
            throw new Error(`Handle for "${this.constructor.name}" cannot be NULL.`);
        }
    }
}
exports.NonNullNativeStruct = NonNullNativeStruct;

},{}],136:[function(require,module,exports){
(function (setImmediate){(function (){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forModule = void 0;
const decorator_cache_getter_1 = require("decorator-cache-getter");
const versioning_1 = __importDefault(require("versioning"));
class Target {
    stringEncoding;
    address;
    constructor(responsible, name, stringEncoding) {
        this.stringEncoding = stringEncoding;
        this.address = Module.findExportByName(responsible, name) ?? NULL;
    }
    static get targets() {
        function info() {
            switch (Process.platform) {
                case "linux":
                    try {
                        if (versioning_1.default.gte(Java.androidVersion, "12")) {
                            return [null, ["__loader_dlopen", "utf8"]];
                        }
                        else {
                            return ["libdl.so", ["dlopen", "utf8"], ["android_dlopen_ext", "utf8"]];
                        }
                    }
                    catch (e) {
                        return [null, ["dlopen", "utf8"]];
                    }
                case "darwin":
                    return ["libdyld.dylib", ["dlopen", "utf8"]];
                case "windows":
                    const ll = "LoadLibrary";
                    return ["kernel32.dll", [`${ll}W`, "utf16"], [`${ll}ExW`, "utf16"], [`${ll}A`, "ansi"], [`${ll}ExA`, "ansi"]];
            }
        }
        const [responsible, ...targets] = info();
        return targets.map(([name, encoding]) => new Target(responsible, name, encoding)).filter(target => !target.address.isNull());
    }
    readString(pointer) {
        switch (this.stringEncoding) {
            case "utf8":
                return pointer.readUtf8String();
            case "utf16":
                return pointer.readUtf16String();
            case "ansi":
                return pointer.readAnsiString();
        }
    }
}
__decorate([
    decorator_cache_getter_1.cache
], Target, "targets", null);
/** @internal */
function forModule(...moduleNames) {
    return new Promise(resolve => {
        for (const moduleName of moduleNames) {
            const module = Process.findModuleByName(moduleName);
            if (module != null) {
                resolve(moduleName);
                return;
            }
        }
        const interceptors = Target.targets.map(target => Interceptor.attach(target.address, {
            onEnter(args) {
                this.modulePath = target.readString(args[0]) ?? "";
            },
            onLeave(returnValue) {
                if (returnValue.isNull())
                    return;
                for (const moduleName of moduleNames) {
                    if (!this.modulePath.endsWith(moduleName))
                        continue;
                    setImmediate(() => interceptors.forEach(i => i.detach()));
                    resolve(moduleName);
                }
            }
        }));
    });
}
exports.forModule = forModule;

}).call(this)}).call(this,require("timers").setImmediate)

},{"decorator-cache-getter":105,"timers":139,"versioning":140}],137:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.levenshtein = exports.cacheInstances = exports.nativeIterator = void 0;
const fastest_levenshtein_1 = require("fastest-levenshtein");
const console_1 = require("./console");
/** @internal */
function* nativeIterator(holder, nativeFunction, Class) {
    const iterator = Memory.alloc(Process.pointerSize);
    let handle;
    while (!(handle = nativeFunction(holder, iterator)).isNull()) {
        yield new Class(handle);
    }
}
exports.nativeIterator = nativeIterator;
/** @internal */
function cacheInstances(Class) {
    const instanceCache = new Map();
    return new Proxy(Class, {
        construct(Target, argArray) {
            const handle = argArray[0].toUInt32();
            if (!instanceCache.has(handle)) {
                instanceCache.set(handle, new Target(argArray[0]));
            }
            return instanceCache.get(handle);
        }
    });
}
exports.cacheInstances = cacheInstances;
/** @internal */
function levenshtein(candidatesKey, nameGetter = e => e.name) {
    return function (_, propertyKey, descriptor) {
        const original = descriptor.value;
        descriptor.value = function (key, ...args) {
            const result = original.call(this, key, ...args);
            if (result != null)
                return result;
            const closestMatch = (0, fastest_levenshtein_1.closest)(key, this[candidatesKey].map(nameGetter));
            (0, console_1.raise)(`couldn't find ${propertyKey} ${key} in ${this.name}${closestMatch ? `, did you mean ${closestMatch}?` : ``}`);
        };
    };
}
exports.levenshtein = levenshtein;

},{"./console":134,"fastest-levenshtein":106}],138:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],139:[function(require,module,exports){
(function (setImmediate,clearImmediate){(function (){
var nextTick = require('process/browser.js').nextTick;
var apply = Function.prototype.apply;
var slice = Array.prototype.slice;
var immediateIds = {};
var nextImmediateId = 0;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) { timeout.close(); };

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
  var id = nextImmediateId++;
  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

  immediateIds[id] = true;

  nextTick(function onNextTick() {
    if (immediateIds[id]) {
      // fn.call() is faster so we optimize for the common use-case
      // @see http://jsperf.com/call-apply-segu
      if (args) {
        fn.apply(null, args);
      } else {
        fn.call(null);
      }
      // Prevent ids from leaking
      exports.clearImmediate(id);
    }
  });

  return id;
};

exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
  delete immediateIds[id];
};
}).call(this)}).call(this,require("timers").setImmediate,require("timers").clearImmediate)

},{"process/browser.js":138,"timers":139}],140:[function(require,module,exports){
/**
 * Semantic Version Number
 * @author 闲耘 <hotoo.cn@gmail.com>
 *
 * @usage
 *    var version = new Versioning("1.2.3")
 *    version > 1
 *    version.eq(1)
 */


// Semantic Versioning Delimiter.
var delimiter = ".";

var Version = function(version){
  this._version = String(version);
};

function compare(v1, v2, complete){
  v1 = String(v1);
  v2 = String(v2);
  if(v1 === v2){return 0;}
  var v1s = v1.split(delimiter);
  var v2s = v2.split(delimiter);
  var len = Math[complete ? "max" : "min"](v1s.length, v2s.length);
  for(var i=0; i<len; i++){
    v1s[i] = "undefined"===typeof v1s[i] ? 0 : parseInt(v1s[i], 10);
    v2s[i] = "undefined"===typeof v2s[i] ? 0 : parseInt(v2s[i], 10);
    if(v1s[i] > v2s[i]){return 1;}
    if(v1s[i] < v2s[i]){return -1;}
  }
  return 0;
}

Version.compare = function(v1, v2){
  return compare(v1, v2, true);
};

/**
 * @param {String} v1.
 * @param {String} v2.
 * @return {Boolean} true if v1 equals v2.
 *
 *    Version.eq("6.1", "6"); // true.
 *    Version.eq("6.1.2", "6.1"); // true.
 */
Version.eq = function(v1, v2, strict){
  return compare(v1, v2, strict) === 0;
};

/**
 * @param {String} v1.
 * @param {String} v2.
 * @return {Boolean} return true
 */
Version.gt = function(v1, v2){
  return compare(v1, v2, true) > 0;
};

Version.gte = function(v1, v2){
  return compare(v1, v2, true) >= 0;
};

Version.lt = function(v1, v2){
  return compare(v1, v2, true) < 0;
};

Version.lte = function(v1, v2){
  return compare(v1, v2, true) <= 0;
};

Version.prototype = {
  // new Version("6.1").eq(6); // true.
  // new Version("6.1.2").eq("6.1"); // true.
  eq: function(version){
    return Version.eq(this._version, version);
  },

  gt: function(version){
    return Version.gt(this._version, version);
  },

  gte: function(version){
    return Version.gte(this._version, version);
  },

  lt: function(version){
    return Version.lt(this._version, version);
  },

  lte: function(version){
    return Version.lte(this._version, version);
  },

  valueOf: function(){
    return parseFloat(
      this._version.split(delimiter).slice(0, 2).join(delimiter),
      10);
  },

  /**
   * XXX: ""+ver 调用的转型方法是 valueOf，而不是 toString，这个有点悲剧。
   * 只能使用 String(ver) 或 ver.toString() 方法。
   * @param {Number} precision, 返回的版本号精度。默认返回完整版本号。
   * @return {String}
   */
  toString: function(precision){
    return "undefined" === typeof precision ? this._version :
      this._version.split(delimiter).slice(0, precision).join(delimiter);
  }
};


module.exports = Version;

},{}]},{},[86])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhZ2VudC9BUEkvbGlzdC50cyIsImFnZW50L0FQSS90ZXh0LnRzIiwiYWdlbnQvYmFzZS9iYXNlLnRzIiwiYWdlbnQvYmFzZS9icmVha2VyLnRzIiwiYWdlbnQvYmFzZS9lbnVtLnRzIiwiYWdlbnQvYmFzZS9nbG9ibGUudHMiLCJhZ2VudC9iYXNlL2luZm8udHMiLCJhZ2VudC9iYXNlL3ZhbHVlUmVzb2x2ZS50cyIsImFnZW50L2JyaWRnZS9leHBhbmQvcGFja2VyLnRzIiwiYWdlbnQvYnJpZGdlL2ZpeC9JbDJjcHBDbGFzcy50cyIsImFnZW50L2JyaWRnZS9maXgvaWwyY3BwTWV0aG9kLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL19pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL2FwaUV4dGVuZHMvYXBpRXh0ZW5kcy50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9HVUkvaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9JbnB1dC9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9Bc3NldEJ1bmRsZS9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9BdmF0YXIvaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvQ29tcG9uZW50L0JlaGF2aW9yL0FuaW1hdGlvbi9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9Db21wb25lbnQvQmVoYXZpb3IvQW5pbWF0b3IvaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvQ29tcG9uZW50L0JlaGF2aW9yL0F1ZGlvU291cnNlL2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L0NvbXBvbmVudC9CZWhhdmlvci9DYW1lcmEvaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvQ29tcG9uZW50L0JlaGF2aW9yL0xpZ2h0L2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L0NvbXBvbmVudC9CZWhhdmlvci9Nb25vQmVoYXZpb3VyL2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L0NvbXBvbmVudC9CZWhhdmlvci9OZXR3b3JrVmlldy9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9Db21wb25lbnQvQmVoYXZpb3IvaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvQ29tcG9uZW50L0NvbGxpZGVyL0NoYXJhY3RlckNvbnRyb2xsZXIvaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvQ29tcG9uZW50L0NvbGxpZGVyL2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L0NvbXBvbmVudC9QYXJ0aWNsZVN5c3RlbS9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9Db21wb25lbnQvUmVuZGVyZXIvaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvQ29tcG9uZW50L1JpZ2lkYm9keS9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9Db21wb25lbnQvVHJhbnNmb3JtL2FwaS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvQ29tcG9uZW50L1RyYW5zZm9ybS9jbGFzcy50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvQ29tcG9uZW50L1RyYW5zZm9ybS9leHBvcnQudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L0NvbXBvbmVudC9UcmFuc2Zvcm0vaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvQ29tcG9uZW50L2FwaS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvQ29tcG9uZW50L2NsYXNzLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9Db21wb25lbnQvZXhwb3J0LnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9Db21wb25lbnQvaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvR2FtZU9iamVjdC9hcGkudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L0dhbWVPYmplY3QvY2xhc3MudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L0dhbWVPYmplY3QvZXhwb3J0LnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9HYW1lT2JqZWN0L2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L01hdGVyaWFsL2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L01lc2gvaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvTW9udGlvbi9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9TaGFkZXIvaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvU3ByaXRlL2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L2FwaS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvY2xhc3MudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovUGh5c2ljcy9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL1Jlc291cmNlcy9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL1J1bnRpbWVUeXBlSGFuZGxlL2FwaS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9SdW50aW1lVHlwZUhhbmRsZS9jbGFzcy50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9SdW50aW1lVHlwZUhhbmRsZS9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL1J1bnRpbWVUeXBlL2FwaS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9SdW50aW1lVHlwZS9jbGFzcy50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9SdW50aW1lVHlwZS9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL1RpbWVzL2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovVHlwZS9hcGkudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovVHlwZS9jbGFzcy50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9UeXBlL2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovVmFsdWVUeXBlL0NvbG9yL2FwaS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9WYWx1ZVR5cGUvQ29sb3IvY2xhc3MudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovVmFsdWVUeXBlL0NvbG9yL2V4cG9ydC50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9WYWx1ZVR5cGUvVmVjdG9yMy9jbGFzcy50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9WYWx1ZVR5cGUvY2xhc3MudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovYXBpLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL2NsYXNzLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvdGhyZWFkL19pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL3RocmVhZC90aHJlYWQudHMiLCJhZ2VudC9leHBhbmQvaW5jbHVkZS50cyIsImFnZW50L2dsb2JlbC50cyIsImFnZW50L2luY2x1ZGUudHMiLCJhZ2VudC9pbmRleC50cyIsImFnZW50L2phdmEvaW5mby50cyIsImFnZW50L25hdGl2ZS9pbmNsdWRlLnRzIiwiYWdlbnQvbmF0aXZlL3N0ZC9faW5jbHVkZS50cyIsImFnZW50L25hdGl2ZS9zdGQvc3RkX2RlcXVlLmpzIiwiYWdlbnQvbmF0aXZlL3N0ZC9zdGRfc3RyaW5nLmpzIiwiYWdlbnQvbmF0aXZlL3N0ZC9zdGRfdmVjdG9yLmpzIiwiYWdlbnQvdXRpbHMvX2luY2x1ZGUudHMiLCJhZ2VudC91dGlscy9hbGxvYy50cyIsImFnZW50L3V0aWxzL2NhY2hlLnRzIiwiYWdlbnQvdXRpbHMvY2FsbGVyLnRzIiwiYWdlbnQvdXRpbHMvY2hlY2tQLnRzIiwiYWdlbnQvdXRpbHMvY29tbW9uLnRzIiwiYWdlbnQvdXRpbHMvY29udGV4dC50cyIsImFnZW50L3V0aWxzL2Zvcm1hcnQudHMiLCJhZ2VudC91dGlscy9sb2dnZXIudHMiLCJhZ2VudC91dGlscy9tYXRoLnRzIiwiYWdlbnQvdXRpbHMvcmVhZGVyLnRzIiwiYWdlbnQvdXRpbHMvc3RhY2sudHMiLCJub2RlX21vZHVsZXMvZGVjb3JhdG9yLWNhY2hlLWdldHRlci9kaXN0L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Zhc3Rlc3QtbGV2ZW5zaHRlaW4vaW5kZXguanMiLCJub2RlX21vZHVsZXMvZnJpZGEtaWwyY3BwLWJyaWRnZS9kaXN0L2lsMmNwcC9hcGkuanMiLCJub2RlX21vZHVsZXMvZnJpZGEtaWwyY3BwLWJyaWRnZS9kaXN0L2lsMmNwcC9iYXNlLmpzIiwibm9kZV9tb2R1bGVzL2ZyaWRhLWlsMmNwcC1icmlkZ2UvZGlzdC9pbDJjcHAvZmlsdGVyaW5nLmpzIiwibm9kZV9tb2R1bGVzL2ZyaWRhLWlsMmNwcC1icmlkZ2UvZGlzdC9pbDJjcHAvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZnJpZGEtaWwyY3BwLWJyaWRnZS9kaXN0L2lsMmNwcC9ydW50aW1lLmpzIiwibm9kZV9tb2R1bGVzL2ZyaWRhLWlsMmNwcC1icmlkZ2UvZGlzdC9pbDJjcHAvc3RydWN0cy9hcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9mcmlkYS1pbDJjcHAtYnJpZGdlL2Rpc3QvaWwyY3BwL3N0cnVjdHMvYXNzZW1ibHkuanMiLCJub2RlX21vZHVsZXMvZnJpZGEtaWwyY3BwLWJyaWRnZS9kaXN0L2lsMmNwcC9zdHJ1Y3RzL2NsYXNzLmpzIiwibm9kZV9tb2R1bGVzL2ZyaWRhLWlsMmNwcC1icmlkZ2UvZGlzdC9pbDJjcHAvc3RydWN0cy9kb21haW4uanMiLCJub2RlX21vZHVsZXMvZnJpZGEtaWwyY3BwLWJyaWRnZS9kaXN0L2lsMmNwcC9zdHJ1Y3RzL2ZpZWxkLmpzIiwibm9kZV9tb2R1bGVzL2ZyaWRhLWlsMmNwcC1icmlkZ2UvZGlzdC9pbDJjcHAvc3RydWN0cy9nYy1oYW5kbGUuanMiLCJub2RlX21vZHVsZXMvZnJpZGEtaWwyY3BwLWJyaWRnZS9kaXN0L2lsMmNwcC9zdHJ1Y3RzL2djLmpzIiwibm9kZV9tb2R1bGVzL2ZyaWRhLWlsMmNwcC1icmlkZ2UvZGlzdC9pbDJjcHAvc3RydWN0cy9pbWFnZS5qcyIsIm5vZGVfbW9kdWxlcy9mcmlkYS1pbDJjcHAtYnJpZGdlL2Rpc3QvaWwyY3BwL3N0cnVjdHMvbWVtb3J5LXNuYXBzaG90LmpzIiwibm9kZV9tb2R1bGVzL2ZyaWRhLWlsMmNwcC1icmlkZ2UvZGlzdC9pbDJjcHAvc3RydWN0cy9tZXRob2QuanMiLCJub2RlX21vZHVsZXMvZnJpZGEtaWwyY3BwLWJyaWRnZS9kaXN0L2lsMmNwcC9zdHJ1Y3RzL29iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9mcmlkYS1pbDJjcHAtYnJpZGdlL2Rpc3QvaWwyY3BwL3N0cnVjdHMvcGFyYW1ldGVyLmpzIiwibm9kZV9tb2R1bGVzL2ZyaWRhLWlsMmNwcC1icmlkZ2UvZGlzdC9pbDJjcHAvc3RydWN0cy9wb2ludGVyLmpzIiwibm9kZV9tb2R1bGVzL2ZyaWRhLWlsMmNwcC1icmlkZ2UvZGlzdC9pbDJjcHAvc3RydWN0cy9yZWZlcmVuY2UuanMiLCJub2RlX21vZHVsZXMvZnJpZGEtaWwyY3BwLWJyaWRnZS9kaXN0L2lsMmNwcC9zdHJ1Y3RzL3N0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9mcmlkYS1pbDJjcHAtYnJpZGdlL2Rpc3QvaWwyY3BwL3N0cnVjdHMvdGhyZWFkLmpzIiwibm9kZV9tb2R1bGVzL2ZyaWRhLWlsMmNwcC1icmlkZ2UvZGlzdC9pbDJjcHAvc3RydWN0cy90eXBlLWVudW0uanMiLCJub2RlX21vZHVsZXMvZnJpZGEtaWwyY3BwLWJyaWRnZS9kaXN0L2lsMmNwcC9zdHJ1Y3RzL3R5cGUuanMiLCJub2RlX21vZHVsZXMvZnJpZGEtaWwyY3BwLWJyaWRnZS9kaXN0L2lsMmNwcC9zdHJ1Y3RzL3ZhbHVlLXR5cGUuanMiLCJub2RlX21vZHVsZXMvZnJpZGEtaWwyY3BwLWJyaWRnZS9kaXN0L2lsMmNwcC90cmFjZXIuanMiLCJub2RlX21vZHVsZXMvZnJpZGEtaWwyY3BwLWJyaWRnZS9kaXN0L2lsMmNwcC91dGlscy5qcyIsIm5vZGVfbW9kdWxlcy9mcmlkYS1pbDJjcHAtYnJpZGdlL2Rpc3QvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZnJpZGEtaWwyY3BwLWJyaWRnZS9kaXN0L3V0aWxzL2NvbnNvbGUuanMiLCJub2RlX21vZHVsZXMvZnJpZGEtaWwyY3BwLWJyaWRnZS9kaXN0L3V0aWxzL25hdGl2ZS1zdHJ1Y3QuanMiLCJub2RlX21vZHVsZXMvZnJpZGEtaWwyY3BwLWJyaWRnZS9kaXN0L3V0aWxzL25hdGl2ZS13YWl0LmpzIiwibm9kZV9tb2R1bGVzL2ZyaWRhLWlsMmNwcC1icmlkZ2UvZGlzdC91dGlscy91dGlscy5qcyIsIm5vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvdGltZXJzLWJyb3dzZXJpZnkvbWFpbi5qcyIsIm5vZGVfbW9kdWxlcy92ZXJzaW9uaW5nL3ZlcnNpb25pbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7OztBQ0NBLDRDQUErQztBQUUvQzs7O0dBR0c7QUFDSCxJQUFJLFdBQVcsR0FBRyxDQUFDLElBQVMsRUFBVSxFQUFFO0lBQ3BDLElBQUksR0FBRyxJQUFBLHNCQUFhLEVBQUMsSUFBSSxDQUFDLENBQUE7SUFDMUIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1FBQUUsT0FBTyxFQUFFLENBQUE7SUFDNUIsT0FBTyxFQUFFLENBQUE7SUFDVCw0RkFBNEY7QUFDaEcsQ0FBQyxDQUFBOzs7Ozs7Ozs7OztBQ1pELG1FQUErQztBQUMvQyxxQ0FBa0M7QUFDbEMsNkRBQStEO0FBQy9ELDBDQUEyQztBQUMzQyxpQ0FBa0M7QUFDbEMsOENBQWdEO0FBRWhELE1BQU0sVUFBVTtJQUNaLGdCQUFnQixDQUFDO0lBR2pCLE1BQU0sS0FBSyxnQkFBZ0I7UUFDdkIsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQTtJQUNuQyxDQUFDO0lBR0QsTUFBTSxLQUFLLHNCQUFzQjtRQUM3QixPQUFPLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDN0QsQ0FBQztJQUdELE1BQU0sS0FBSyxZQUFZO1FBQ25CLE9BQU8sVUFBVSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQXlCLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUN6RixDQUFDO0lBR0QsTUFBTSxLQUFLLHFCQUFxQjtRQUM1QixPQUFPLFVBQVUsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQzNELENBQUM7SUFHRCxNQUFNLEtBQUssa0JBQWtCO1FBQ3pCLE9BQU8sVUFBVSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQXlCLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQy9HLENBQUM7SUFFRCxTQUFTO0lBQ0QsTUFBTSxDQUFDLG9CQUFvQixHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7SUFDL0MsTUFBTSxDQUFDLFlBQVk7UUFDZixJQUFJLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLElBQUksQ0FBQztZQUFFLE9BQU8sVUFBVSxDQUFDLG9CQUFvQixDQUFBO1FBQ3JGLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzFJLE9BQU8sVUFBVSxDQUFDLG9CQUFvQixDQUFBO0lBQzFDLENBQUM7SUFHRCxNQUFNLEtBQUssYUFBYTtRQUNwQixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQXlCLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFtQixFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDdEksQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBaUIsRUFBRSxFQUFFLE9BQWdCLElBQUk7UUFDdkQsc0JBQVksQ0FBQyxXQUFXLENBQUMsOERBQThELENBQUMsQ0FBQTtRQUN4RixVQUFVLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQW1CLEVBQUUsRUFBRTtZQUNuRCxPQUFPLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUE7UUFDakUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3RCLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN6RyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFtQixFQUFFLEVBQUU7WUFDL0IsSUFBSSxDQUFDLE9BQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLE9BQU8sS0FBSyxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsVUFBVSxLQUFLLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUN4RyxDQUFDLENBQUMsQ0FBQTtRQUNGLElBQUksTUFBTSxJQUFJLEVBQUUsRUFBRTtZQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUNqQixJQUFJLENBQUMsVUFBVSxVQUFVLENBQUMsWUFBWSxDQUFDLE1BQU0sU0FBUyxDQUFDLENBQUE7U0FDMUQ7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDckIsQ0FBQztJQUVELE1BQU0sQ0FBQyxXQUFXLENBQUMsV0FBNEMsRUFBRSxrQkFBMEIsRUFBRSxFQUFFLGtCQUEwQixFQUFFO1FBQ3ZILElBQUksS0FBbUIsQ0FBQTtRQUN2QixJQUFJLE9BQU8sV0FBVyxJQUFJLFFBQVEsRUFBRTtZQUNoQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFBO1NBQ3BEO2FBQU0sSUFBSSxPQUFPLFdBQVcsSUFBSSxRQUFRLEVBQUU7WUFDdkMsS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQTtTQUM3QzthQUFNLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsRUFBRTtZQUNsQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsQ0FBQTtZQUNuQyxPQUFNO1NBQ1Q7YUFBTTtZQUNILElBQUksQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFBO1lBQzVDLE9BQU07U0FDVDtRQUVELElBQUksSUFBSSxHQUFHLElBQUksR0FBRyxFQUErQixDQUFBO1FBQ2pELElBQUksY0FBYyxHQUFXLENBQUMsQ0FBQTtRQUM5QixJQUFJLGNBQWMsR0FBVyxDQUFDLENBQUE7UUFDOUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzNDLElBQUksR0FBRyxHQUFHLE1BQU0sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQTtZQUM3QyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksU0FBUyxFQUFFO2dCQUM1QixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLEtBQUssRUFBZ0IsQ0FBQyxDQUFBO2FBQzNDO1lBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ3hDO1FBRUQsSUFBSSxRQUFRLEdBQUcsc0JBQVksQ0FBQyxXQUFXLENBQUMsd0ZBQXdGLENBQUMsQ0FBQTtRQUNqSSxLQUFLLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN6QixJQUFJLFNBQVMsR0FBRyxHQUFHLENBQUE7WUFDbkIsSUFBSSxTQUFTLElBQUksU0FBUyxFQUFFO2dCQUN4QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO2dCQUMvQix5QkFBeUI7Z0JBQ3pCLElBQUksU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQUUsU0FBUTtnQkFDbEYsRUFBRSxjQUFjLENBQUE7Z0JBQ2hCLElBQUksQ0FBQyxLQUFLLFNBQVMsRUFBRSxDQUFDLENBQUE7Z0JBQ3RCLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxLQUFtQixFQUFFLEVBQUU7b0JBQ25DLHlCQUF5QjtvQkFDekIsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTt3QkFDdkUsRUFBRSxjQUFjLENBQUE7d0JBQ2hCLElBQUksQ0FBQyxTQUFTLEtBQUssQ0FBQyxNQUFNLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLE1BQU0sS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtxQkFDOUg7Z0JBQ0wsQ0FBQyxDQUFDLENBQUE7YUFDTDtTQUNKO1FBRUQsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUN4QixJQUFJLGVBQWUsSUFBSSxFQUFFLElBQUksZUFBZSxJQUFJLEVBQUUsRUFBRTtZQUNoRCxJQUFJLENBQUMsUUFBUSxLQUFLLENBQUMsVUFBVSx1QkFBdUIsY0FBYyxhQUFhLENBQUMsQ0FBQTtTQUNuRjthQUFNO1lBQ0gsSUFBSSxDQUFDLE9BQU8sS0FBSyxDQUFDLFVBQVUsbUJBQW1CLGNBQWMsdUJBQXVCLGNBQWMsYUFBYSxDQUFDLENBQUE7U0FDbkg7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7SUFDM0IsQ0FBQztJQUVELE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBcUM7UUFDbEQsSUFBSSxLQUFtQixDQUFBO1FBQ3ZCLElBQUksSUFBSSxZQUFZLGFBQWEsRUFBRTtZQUMvQixLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQ2pDO2FBQU0sSUFBSSxPQUFPLElBQUksSUFBSSxRQUFRLEVBQUU7WUFDaEMsS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtTQUM1QzthQUFNLElBQUksT0FBTyxJQUFJLElBQUksUUFBUSxFQUFFO1lBQ2hDLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7U0FDdEM7YUFBTTtZQUNILE1BQU0sQ0FBQyxnREFBZ0QsQ0FBQyxDQUFBO1NBQzNEO1FBQ0QsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBRSxNQUFNLENBQUMsOEJBQThCLENBQUMsQ0FBQTtRQUN2RSxPQUFPLEtBQUssQ0FBQTtJQUNoQixDQUFDO0lBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFtQjtRQUNsQyxJQUFJLEtBQUssR0FBaUIsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNwRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUM7WUFBRSxPQUFNO1FBQ3JDLHNCQUFZLENBQUMsV0FBVyxDQUFDLFNBQVMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLFdBQVcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLGNBQWMsS0FBSyxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtRQUN6SSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQXFCLEVBQUUsRUFBRTtZQUM1QyxJQUFJLENBQUMsT0FBTyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBQ3BDLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBbUI7UUFDakMsSUFBSSxLQUFLLEdBQWlCLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDcEQsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDO1lBQUUsT0FBTTtRQUNwQyxzQkFBWSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxXQUFXLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxhQUFhLEtBQUssQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7UUFDekksS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFtQixFQUFFLEVBQUU7WUFDekMsSUFBSSxDQUFDLE9BQU8sS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLFVBQVUsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtRQUN4RyxDQUFDLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUNaLENBQUM7SUFFRCwyQ0FBMkM7SUFDbkMsTUFBTSxDQUFDLGVBQWUsR0FBRyxJQUFJLEdBQUcsRUFBd0IsQ0FBQTtJQUNoRSxNQUFNLENBQUMsU0FBUyxDQUFDLGVBQXVCLEVBQUUsY0FBd0IsQ0FBQyxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxVQUFVLENBQUM7UUFDL0csSUFBSSxlQUFlLElBQUksU0FBUztZQUFFLE1BQU0sQ0FBQywwQ0FBMEMsQ0FBQyxDQUFBO1FBQ3BGLElBQUksT0FBTyxlQUFlLElBQUksUUFBUTtZQUFFLE1BQU0sQ0FBQywrQkFBK0IsQ0FBQyxDQUFBO1FBQy9FLElBQUksS0FBSyxHQUE2QixVQUFVLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUNyRixJQUFJLEtBQUssSUFBSSxTQUFTO1lBQUUsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFBO1FBQzNDLElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFBO1FBQ3pDLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ3BELElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzlDLElBQUksR0FBRyxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO2dCQUNwRCxJQUFJLEdBQUcsSUFBSSxTQUFTO29CQUFFLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQTthQUMxQztTQUNKO1FBQ0QsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDcEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUMvQyxJQUFJLEdBQUcsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTtnQkFDcEQsSUFBSSxHQUFHLElBQUksU0FBUztvQkFBRSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUE7YUFDMUM7U0FDSjtRQUVELFNBQVMsU0FBUyxDQUFDLFFBQXdCO1lBQ3ZDLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtnQkFDaEQsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxJQUFJLGVBQWUsRUFBRTtvQkFDekMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO29CQUNoRSxPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtpQkFDekI7UUFDVCxDQUFDO1FBQ0QsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDakIsQ0FBQztJQUdEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsTUFBTSxDQUFDLGFBQWEsQ0FBQyxZQUFvQixFQUFFLFNBQWlCLEVBQUUsVUFBa0IsRUFBRSxZQUFvQixDQUFDLENBQUMsRUFBRSxXQUFxQixFQUFFLEVBQUUsT0FBTyxHQUFHLElBQUk7UUFDN0ksSUFBSSxVQUFxQyxDQUFBO1FBQ3pDLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsSUFBSSxPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxRQUFRLEVBQUU7WUFDOUQsSUFBSTtnQkFDQSxVQUFVLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFBO2dCQUN0RyxJQUFJLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQztvQkFBRSxVQUFVLEdBQUcsVUFBVSxFQUFFLFFBQVEsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFBO2FBQzNFO1lBQUMsTUFBTTtnQkFDSixNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxVQUFVLGFBQWEsU0FBUyxRQUFRLFNBQVMsRUFBRSxDQUFDLENBQUE7YUFDdkc7U0FDSjthQUFNLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsRUFBRTtZQUNsQyxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDNUY7YUFBTSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsRUFBRTtZQUMvRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3RELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ2pFLElBQUksVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFO3dCQUN4RCxVQUFVLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7d0JBQ25ELE1BQUs7cUJBQ1I7aUJBQ0o7YUFDSjtTQUNKO1FBQ0QsSUFBSSxVQUFVLElBQUksU0FBUztZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtRQUNoRSxJQUFJLE9BQU8sRUFBRTtZQUNULGNBQWMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUE7U0FDcEM7YUFBTTtZQUNILE9BQU8sVUFBVSxDQUFBO1NBQ3BCO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSyxNQUFNLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxHQUFHLEVBQXlCLENBQUE7SUFDeEUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxTQUFpQixFQUFFLFNBQWlCLEVBQUUsWUFBb0IsRUFBRSxZQUFvQixDQUFDLENBQUMsRUFBRSxhQUFzQixJQUFJO1FBQ2hJLElBQUksU0FBUyxJQUFJLFNBQVMsSUFBSSxTQUFTLElBQUksU0FBUyxJQUFJLFlBQVksSUFBSSxTQUFTO1lBQUUsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDaEcsbUNBQW1DO1FBQ25DLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFBO1FBQ2pDLElBQUksUUFBUSxHQUFHLFNBQVMsR0FBRyxHQUFHLEdBQUcsU0FBUyxHQUFHLEdBQUcsR0FBRyxZQUFZLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQTtRQUNqRixJQUFJLFVBQVUsRUFBRTtZQUNaLElBQUksYUFBYSxHQUFHLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDbkUsSUFBSSw4QkFBSyxJQUFJLFNBQVM7Z0JBQUUsT0FBTyxhQUE4QixDQUFBO1NBQ2hFO1FBQ0QsSUFBSSxjQUFjLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFBO1FBQzVELElBQUksVUFBVSxHQUFrQixjQUFjLENBQUMsTUFBTSxDQUFBO1FBQ3JELElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxJQUFBLGlCQUFTLEVBQUMsU0FBUyxDQUFDLEVBQUUsSUFBQSxpQkFBUyxFQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7UUFDN0YsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDaEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2pFLElBQUksV0FBVyxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDNUUsSUFBSSxXQUFXLENBQUMsSUFBSSxJQUFJLFNBQVMsRUFBRTtvQkFDL0IsS0FBSyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUE7b0JBQzFCLE1BQUs7aUJBQ1I7YUFDSjtTQUNKO1FBRUQsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQUUsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDakMsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLEVBQUUsSUFBQSxpQkFBUyxFQUFDLFlBQVksQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFBO1FBQzFGLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUFFLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2xDLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2hELE9BQU8sTUFBTSxDQUFBO1NBQ2hCO2FBQU0sSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdkQsT0FBTyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1NBQzFDO1FBRUQsVUFBVSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUE7UUFFckUsSUFBSSxVQUFVO1lBQUUsT0FBTyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUUzRixJQUFJLFlBQVksR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDNUMsSUFBSSxnQkFBZ0IsR0FBRyxZQUFZLENBQUMsY0FBYyxDQUFBO1FBQ2xELElBQUksUUFBUSxHQUFHLElBQUksS0FBSyxFQUFFLENBQUE7UUFDMUIsSUFBSSxrQkFBa0IsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFBO1FBQ3BDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN2QyxJQUFJLGVBQWUsR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ2hELElBQUksU0FBUyxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQTtZQUNqRCxJQUFJLFFBQVEsR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUE7WUFDOUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNwRCxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsR0FBRyxTQUFTLENBQUMsQ0FBQTtTQUN0RDtRQUNELElBQUksTUFBTSxHQUFHLElBQUEsZ0NBQWlCLEVBQUMsTUFBTSxDQUFDLEdBQUcsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsR0FBRztZQUN2RSxZQUFZLENBQUMsSUFBSSxHQUFHLEdBQUc7WUFDdkIsR0FBRyxHQUFHLFFBQVEsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFBO1FBQy9CLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUNqQixHQUFHLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxTQUFTLEdBQUcsSUFBSSxHQUFHLE1BQU0sRUFBRSxlQUFRLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDOUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ2pCLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQTtRQUNwQixHQUFHLENBQUMsc0JBQXNCLEdBQUcsVUFBVSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDNUgsR0FBRyxDQUFDLHNCQUFzQixHQUFHLEtBQUssR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUNwRyxHQUFHLENBQUMscUJBQXFCLEdBQUcsTUFBTSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3JHLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLEdBQUcsVUFBVSxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtRQUNyRyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDckIsQ0FBQzs7QUE5UkQ7SUFEQyw4QkFBSzt3Q0FHTDtBQUdEO0lBREMsOEJBQUs7OENBR0w7QUFHRDtJQURDLDhCQUFLO29DQUdMO0FBR0Q7SUFEQyw4QkFBSzs2Q0FHTDtBQUdEO0lBREMsOEJBQUs7MENBR0w7QUFXRDtJQURDLDhCQUFLO3FDQUdMO0FBK1BJLGdDQUFVO0FBRG5CLE1BQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxjQUFpQyxDQUFBO0FBQzNDLGtDQUFXO0FBS2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQTtBQUU3QyxVQUFVLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUE7QUFDcEMsVUFBVSxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFBO0FBQ3JDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQTtBQUNyQyxVQUFVLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUE7QUFDcEMsVUFBVSxDQUFDLEVBQUUsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFBO0FBQ3BDLFVBQVUsQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQTtBQUMzQyxVQUFVLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUE7QUFDaEQsVUFBVSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUMsY0FBaUMsQ0FBQTtBQUNyRSxVQUFVLENBQUMsRUFBRSxHQUFHLENBQUMsU0FBaUIsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFBO0FBQzlELFVBQVUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBRS9CLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBOzs7Ozs7OztBQy9UNUQsNkRBQThDO0FBQzlDLDZEQUErRTtBQUMvRSw4Q0FBZ0Q7QUFDaEQsaUNBQW9DO0FBQ3BDLGtFQUEwQztBQUcxQyxNQUFNLE9BQU87SUFFRixNQUFNLENBQUMsWUFBWSxHQUFXLEVBQUUsQ0FBQSxDQUFLLDRCQUE0QjtJQUNqRSxNQUFNLENBQUMsV0FBVyxHQUFXLEdBQUcsQ0FBQSxDQUFLLDhCQUE4QjtJQUNsRSxNQUFNLENBQUMsdUJBQXVCLEdBQTJDLElBQUksR0FBRyxFQUFFLENBQUE7SUFDbEYsTUFBTSxDQUFDLHdCQUF3QixHQUErQixJQUFJLEdBQUcsRUFBRSxDQUFBO0lBQ3ZFLE1BQU0sQ0FBQyx5QkFBeUIsR0FBeUIsSUFBSSxLQUFLLEVBQWlCLENBQUE7SUFDbkYsTUFBTSxDQUFDLG1CQUFtQixHQUF5QixJQUFJLEtBQUssRUFBaUIsQ0FBQTtJQUM3RSxNQUFNLENBQUMsdUJBQXVCLEdBQXdCLElBQUksS0FBSyxFQUFnQixDQUFBLENBQUMsWUFBWTtJQUNwRyxvR0FBb0c7SUFFcEcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxjQUE4RCxhQUFhO1FBQzVGLElBQUksV0FBVyxZQUFZLGFBQWEsRUFBRTtZQUN0QyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUE7U0FDMUI7YUFBTSxJQUFJLE9BQU8sV0FBVyxJQUFJLFFBQVEsRUFBRTtZQUN2QyxVQUFVLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUE7U0FDL0I7YUFBTSxJQUFJLE9BQU8sV0FBVyxJQUFJLFFBQVEsRUFBRTtZQUN2QyxJQUFJLFdBQVcsSUFBSSxhQUFhLElBQUksV0FBVyxJQUFJLEtBQUssSUFBSSxXQUFXLElBQUksTUFBTTtnQkFBRSxPQUFPLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFBO1lBQ3hILDRCQUE0QjtZQUM1QixJQUFJLGlCQUFVLENBQUMsa0JBQWtCLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsa0NBQWtDO2dCQUNwRyxZQUFZO2dCQUNaLGlCQUFVLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQW1CLEVBQUUsRUFBRTtvQkFDcEQsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTt3QkFDbEMsc0JBQVksQ0FBQyxXQUFXLENBQUMscUJBQXFCLEdBQUcsV0FBVyxHQUFHLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7d0JBQ3JGLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7cUJBQzNCO2dCQUNMLENBQUMsQ0FBQyxDQUFBO2FBQ0w7aUJBQU07Z0JBQ0gsWUFBWTtnQkFDWixJQUFJLE1BQU0sR0FBa0IsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFBO2dCQUNsRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFO29CQUNsQixzQkFBWSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsR0FBRyxXQUFXLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFBO29CQUMvRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUE7aUJBQ3JCO3FCQUFNO29CQUNILElBQUksU0FBUyxHQUFHLElBQUEsNkJBQU8sRUFBQyxXQUFXLEVBQUUsaUJBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO29CQUNuRSxJQUFJLENBQUMsbUJBQW1CLFNBQVMsTUFBTSxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUE7aUJBQ2xIO2FBQ0o7U0FDSjtRQUVELFNBQVMsVUFBVSxDQUFDLFdBQTBCO1lBQzFDLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUE7WUFDbkQsSUFBSSxXQUFXLENBQUMsTUFBTSxFQUFFO2dCQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQTtZQUNqRSxJQUFJLGlCQUFVLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFO2dCQUMxRixJQUFJLFdBQVcsR0FBRyxXQUFXLENBQUE7Z0JBQzdCLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPO3FCQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO3FCQUMzQixPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFBO2FBQ3JDO2lCQUFNO2dCQUNILElBQUksV0FBVyxHQUFHLFdBQVcsQ0FBQTtnQkFDN0IsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU87cUJBQ2hDLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUE7YUFDckM7WUFDRCxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxlQUFlLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLEdBQUcsUUFBUSxrQkFBa0IsT0FBTyxDQUFDLHVCQUF1QixDQUFDLElBQUksYUFBYSxPQUFPLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNoTCxDQUFDO1FBRUQsU0FBUyxpQkFBaUIsQ0FBQyxJQUFrQjtZQUN6QyxJQUFJLElBQUksSUFBSSxhQUFhLEVBQUU7Z0JBQ3ZCLElBQUksV0FBVyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsd0JBQXdCLENBQUMsQ0FBQTtnQkFDbEksaUJBQVUsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBbUIsRUFBRSxFQUFFO29CQUNwRCxJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDM0Msc0JBQVksQ0FBQyxXQUFXLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDLElBQUksR0FBRyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFBO3dCQUNwRixVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFBO3FCQUMzQjtnQkFDTCxDQUFDLENBQUMsQ0FBQTthQUNMO2lCQUFNLElBQUksSUFBSSxJQUFJLEtBQUssRUFBRTtnQkFDdEIsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsOEJBQThCLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUE7Z0JBQ3pHLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtvQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHlDQUF5QyxDQUFDLENBQUE7Z0JBQy9FLHNCQUFZLENBQUMsV0FBVyxDQUFDLHFCQUFxQixHQUFHLE1BQU0sQ0FBQyxJQUFJLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFDdEYsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFDekIsd0hBQXdIO2FBQzNIO2lCQUFNLElBQUksS0FBSyxFQUFFO2dCQUNkLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO2dCQUNuQixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO2FBQ3RDO2lCQUFNLElBQUksSUFBSSxJQUFJLE1BQU0sRUFBRTtnQkFDdkIsYUFBYTthQUNoQjtpQkFBTTtnQkFDSCxNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUE7YUFDcEQ7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVPLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBcUI7UUFFN0MsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUE7UUFFekIsU0FBUyxpQkFBaUIsQ0FBQyxNQUFxQixFQUFFLGlCQUEwRSxLQUFLO1lBQzdILElBQUksY0FBYyxJQUFJLEtBQUssRUFBRTtnQkFDekIsSUFBSSxDQUFDLElBQUEsZ0NBQWlCLEVBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUU7b0JBQUUsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFBO2FBQzNIO2lCQUFNO2dCQUNILElBQUksQ0FBQyxJQUFBLGdDQUFpQixFQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUM7b0JBQUUsT0FBTTtnQkFDL0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFO29CQUFFLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQTthQUN4RTtRQUNMLENBQUM7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLGVBQWUsR0FBVyxDQUFDLENBQUE7SUFDM0IsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQXFCLEVBQUUsV0FBb0IsS0FBSztRQUMzRSxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDaEMsSUFBSSxDQUFDLElBQUEsNkJBQWMsRUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO1lBQzVCLE9BQU07U0FDVDtRQUNELElBQUksT0FBTyxDQUFDLHVCQUF1QixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7WUFBRSxPQUFNO1FBQ3ZELElBQUk7WUFDQSxJQUFJLFVBQVUsR0FBdUIsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFO2dCQUMzRSxPQUFPLEVBQUUsVUFBbUMsSUFBeUI7b0JBQ2pFLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUM7d0JBQUUsT0FBTTtvQkFDbkQsSUFBSSxDQUFDLFFBQVEsRUFBRTt3QkFDWCw2QkFBNkI7d0JBQzdCLElBQUksT0FBTyxHQUFHLElBQUksRUFBRSxPQUFPLENBQUMsZUFBZSxJQUFJLElBQUksSUFBSSxFQUFFLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQTt3QkFDL0YsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLHNCQUFZLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTt3QkFDaEUsT0FBTyxJQUFJLENBQUUsSUFBSSxDQUFDLFNBQTBCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtxQkFDM0Q7eUJBQU07d0JBQ0gsaUJBQWlCO3dCQUNqQixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUE7d0JBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFOzRCQUNsQixZQUFZOzRCQUNaLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxtQkFBbUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLHNCQUFZLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLFFBQVEsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQTs0QkFDbkosS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLE1BQU0sQ0FBQyxjQUFjLEdBQUcsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFO2dDQUM1RCxJQUFJLEtBQUssR0FBRyxRQUFRLEtBQUssTUFBTSxDQUFBO2dDQUMvQixJQUFJLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksYUFBYSxzQkFBWSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFBO2dDQUN4RyxJQUFJLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQTtnQ0FDekcsSUFBSSxHQUFHLEdBQUcsTUFBTSxzQkFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUE7Z0NBQ2hHLFdBQVcsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxLQUFLLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQTs2QkFDakU7eUJBQ0o7NkJBQU07NEJBQ0gsV0FBVzs0QkFDWCxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsTUFBTSxDQUFDLGNBQWMsRUFBRSxFQUFFLEtBQUssRUFBRTtnQ0FDeEQsSUFBSSxLQUFLLEdBQUcsUUFBUSxLQUFLLE1BQU0sQ0FBQTtnQ0FDL0IsSUFBSSxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksYUFBYSxzQkFBWSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFBO2dDQUNwRyxJQUFJLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxNQUFNLENBQUE7Z0NBQ3BHLElBQUksR0FBRyxHQUFHLEdBQUcsc0JBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUE7Z0NBQ3pGLFdBQVcsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxLQUFLLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQTs2QkFDakU7eUJBQ0o7d0JBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUE7d0JBQzFCLElBQUksVUFBVSxHQUFHLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQTt3QkFDakUsSUFBSSxTQUFTLEdBQUcsR0FBRyxVQUFVLE1BQU0sSUFBQSw2QkFBYyxFQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxNQUFNLENBQUMsTUFBTSxPQUFPLE1BQU0sQ0FBQyxjQUFjLE9BQU8sTUFBTSxDQUFDLHNCQUFzQixPQUFPLElBQUksSUFBSSxFQUFFLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTt3QkFDek0sSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUE7cUJBQzlCO2dCQUNMLENBQUM7Z0JBQ0QsT0FBTyxFQUFFLFVBQW1DLE1BQTZCO29CQUNyRSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDO3dCQUFFLE9BQU07b0JBQ25ELElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxTQUFTLEVBQUU7d0JBQzFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFDLFNBQTBCLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7cUJBQzNGO29CQUNELElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJO3dCQUFFLE9BQU07b0JBQzNELElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQTtvQkFDdkIsSUFBSSxHQUFHLEdBQUcsU0FBUyxzQkFBWSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFBO29CQUMzRCxJQUFJLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sTUFBTSxDQUFBO29CQUM1RSxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksc0JBQVksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7b0JBQ3pFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFBO29CQUNoRSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUksSUFBSSxDQUFDLE9BQXlCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUE7b0JBQzFHLElBQUksQ0FBQyxLQUFLLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUE7b0JBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtvQkFDekMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7b0JBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtnQkFDekIsQ0FBQzthQUNKLENBQUMsQ0FBQTtZQUNGLElBQUksQ0FBQyxJQUFBLDZCQUFjLEVBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtZQUM1QixPQUFPLENBQUMsdUJBQXVCLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQTtTQUMxRDtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ1osVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1NBQ3JCO1FBRUQsU0FBUyxVQUFVLENBQUMsTUFBcUI7WUFDckMsSUFBSSxDQUFDLElBQUEsNkJBQWMsRUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO1lBQzVCLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxLQUFLLEVBQUU7Z0JBQ3ZCLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUE7Z0JBQzdDLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztvQkFBRSxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUE7YUFDL0Q7aUJBQU0sSUFBSSxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sRUFBRTtnQkFDaEMsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtnQkFDN0MsSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO29CQUFFLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUMvRDtpQkFBTTtnQkFDSCxPQUFPLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO2dCQUN4QyxRQUFRLENBQUMsTUFBTSxDQUFDLHNCQUFzQixFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQTthQUNuRTtZQUVELFNBQVMsWUFBWSxDQUFDLEdBQWtCLEVBQUUsUUFBZ0IsNkRBQTZEO2dCQUNuSCxJQUFJLENBQUMsS0FBSyxNQUFNLENBQUMsY0FBYyxPQUFPLEdBQUcsT0FBTyxHQUFHLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxDQUFBO2dCQUN4RSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDZixDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFFTyxNQUFNLENBQUMsV0FBVyxHQUFHLENBQUMsTUFBcUMsRUFBRSxZQUFxRCxTQUFTLEVBQVcsRUFBRTtRQUM1SSwrREFBK0Q7UUFDL0QsSUFBSSxNQUFNLFlBQVksTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLHdCQUF3QixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7Z0JBQUUsT0FBTyxDQUFDLHdCQUF3QixDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDbEcsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUN4RCxJQUFJLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLElBQUk7Z0JBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQTtZQUNwRCxJQUFJLEtBQUssSUFBSSxPQUFPLENBQUMsV0FBVyxFQUFFO2dCQUM5QixPQUFPLENBQUMsdUJBQXVCLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBRSxDQUFDLE1BQU0sRUFBRSxDQUFBO2dCQUNyRCxPQUFPLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO2FBQ2pEO1lBQ0QsSUFBSSxTQUFTLEtBQUssU0FBUztnQkFBRSxPQUFPLENBQUMsd0JBQXdCLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUE7WUFDcEYsT0FBTyxLQUFLLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQTtTQUN0QzthQUFNO1lBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFBO1NBQ2xEO0lBQ0wsQ0FBQyxDQUFBO0lBRUQsTUFBTSxDQUFDLGFBQWEsR0FBRyxDQUFDLElBQW1CLEVBQUUsV0FBbUIsQ0FBQyxFQUFFLEVBQUU7UUFDakUsSUFBSSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN6QixXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtZQUNyQixPQUFPLENBQTBCLElBQXlCO2dCQUN0RCxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO2dCQUN4QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxZQUFZLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUE7Z0JBQzNILElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDMUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsRUFBRSxFQUFFLENBQUM7b0JBQUUsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQ3pELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNkLENBQUM7WUFDRCxPQUFPLENBQTBCLE1BQTZCO2dCQUMxRCxJQUFJLENBQUMsMkJBQTJCLEdBQUcsTUFBTSxDQUFDLENBQUE7WUFDOUMsQ0FBQztTQUNKLENBQUMsQ0FBQTtJQUNOLENBQUMsQ0FBQTtJQUVELE1BQU0sQ0FBQyxjQUFjLEdBQUcsQ0FBQyxJQUFtQixFQUFFLEVBQUU7UUFDNUMsSUFBSSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN6QixXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtZQUNyQixPQUFPLENBQTBCLElBQXlCO2dCQUN0RCxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO2dCQUN4QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxZQUFZLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUE7Z0JBQzNILGdCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtnQkFDOUIsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUM1QixDQUFDO1NBQ0osQ0FBQyxDQUFBO0lBQ04sQ0FBQyxDQUFBO0lBRUQsTUFBTSxDQUFDLFdBQVcsR0FBRyxDQUFDLElBQW1CLEVBQUUsV0FBbUIsRUFBRSxFQUFFLEVBQUU7UUFDaEUsSUFBSSxRQUFRLElBQUksU0FBUztZQUFFLFFBQVEsR0FBRyxFQUFFLENBQUE7UUFDeEMsSUFBSSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN6QixXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtZQUNyQixPQUFPLENBQTBCLElBQXlCO2dCQUN0RCxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO2dCQUN4QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQTtnQkFDaEUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7WUFDdEMsQ0FBQztTQUNKLENBQUMsQ0FBQTtJQUNOLENBQUMsQ0FBQTtJQUVELE1BQU0sQ0FBQyxVQUFVLEdBQUcsR0FBRyxFQUFFO1FBQ3JCLENBQUMsRUFBRSxDQUFBO1FBQ0gsT0FBTyxDQUFDLHVCQUF1QixDQUFDLEtBQUssRUFBRSxDQUFBO1FBQ3ZDLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUN4QyxPQUFPLENBQUMseUJBQXlCLEdBQUcsRUFBRSxDQUFBO0lBQzFDLENBQUMsQ0FBQTtJQUVELE1BQU0sQ0FBQyxhQUFhLEdBQUcsR0FBRyxFQUFFO1FBQ3hCLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNyQixPQUFPLENBQUMsdUJBQXVCLEdBQUcsRUFBRSxDQUFBO1FBQ3BDLE9BQU8sQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUE7SUFDcEMsQ0FBQyxDQUFBO0lBRUQsTUFBTSxDQUFDLG9CQUFvQixHQUFHLENBQUMsYUFBcUIsRUFBRSxFQUFFLEVBQUU7UUFDdEQsSUFBSSxPQUFPLENBQUMsd0JBQXdCLENBQUMsSUFBSSxJQUFJLENBQUM7WUFBRSxPQUFNO1FBQ3RELElBQUksS0FBSyxHQUFHLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQyxxQkFBcUIsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUE7UUFDNUQsSUFBSSxrQkFBa0IsR0FBVyxDQUFDLENBQUE7UUFDbEMsR0FBRyxDQUFDLEdBQUcsS0FBSyxFQUFFLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQzdCLDhEQUE4RDtRQUM5RCxPQUFPLENBQUMsd0JBQXdCLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBYSxFQUFFLEdBQWtCLEVBQUUsRUFBRTtZQUMzRSxJQUFJLEtBQUssSUFBSSxPQUFPLENBQUMsWUFBWSxFQUFFO2dCQUMvQixJQUFJLFVBQVUsSUFBSSxFQUFFLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7b0JBQ3hELElBQUksR0FBRyxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQTtvQkFDNUIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtvQkFDbEQsRUFBRSxrQkFBa0IsQ0FBQTtvQkFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7aUJBQ3hFO2FBQ0o7UUFDTCxDQUFDLENBQUMsQ0FBQTtRQUNGLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNuQyxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsdUJBQXVCLENBQUMsSUFBSSxlQUFlLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLGVBQWUsa0JBQWtCLFNBQVMsQ0FBQyxDQUFBO1FBQy9JLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUM1QyxDQUFDLENBQUE7SUFFRCxNQUFNLENBQUMsZUFBZSxHQUFHLENBQUMsWUFBb0IsRUFBRSxFQUFFLFlBQW9CLEVBQUUsRUFBRSxVQUFtQixLQUFLLEVBQUUsWUFBcUIsSUFBSSxFQUFFLEVBQUU7UUFDN0gsSUFBSSxTQUFTO1lBQUUsQ0FBQyxFQUFFLENBQUE7UUFDbEIsbUJBQW1CO1FBQ25CLElBQUksT0FBTyxTQUFTLElBQUksUUFBUSxFQUFFO1lBQzlCLFNBQVMsR0FBRyxTQUFTLENBQUE7WUFDckIsU0FBUyxHQUFHLEVBQUUsQ0FBQTtTQUNqQjtRQUNELElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyx1QkFBdUI7YUFDNUMsR0FBRyxDQUFDLENBQUMsS0FBbUIsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQzlDLE1BQU0sQ0FBQyxDQUFDLEtBQWEsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUNwRCxLQUFLLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFBO1FBQ3hCLElBQUksT0FBTztZQUFFLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNsQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzdCLENBQUMsQ0FBQTs7QUFrQ0ksMEJBQU87QUEvQmhCLFVBQVUsQ0FBQyxXQUFXLEdBQUcsR0FBVyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsUUFBUSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQTtBQUNqSCxVQUFVLENBQUMsY0FBYyxHQUFHLENBQUMsR0FBZSxFQUFtQyxFQUFFLENBQUMsV0FBVyxFQUFFLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFvQixDQUFDLENBQUMsQ0FBQyxHQUFzQixDQUFBO0FBQ3hKLFVBQVUsQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQTtBQUM5QyxVQUFVLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUE7QUFDakMsVUFBVSxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFBO0FBQ3JDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQTtBQUNwQyxVQUFVLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUE7QUFDdEMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQW1CLEVBQUUsRUFBRTtJQUNuQyxJQUFJLE9BQU8sSUFBSSxJQUFJLFFBQVE7UUFBRSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzdDLElBQUk7UUFDQSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFBLENBQUMsMkJBQTJCO1FBQ3hELElBQUksSUFBSSxZQUFZLE1BQU0sQ0FBQyxNQUFNO1lBQUUsT0FBTyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQzlFLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7S0FDMUQ7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNaLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUE7S0FDOUI7QUFDTCxDQUFDLENBQUE7QUFDRCxVQUFVLENBQUMsb0JBQW9CLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFBOzs7OztBQzVUOUQsSUFBWSxRQUF5QjtBQUFyQyxXQUFZLFFBQVE7SUFBRyx5Q0FBSyxDQUFBO0lBQUUseUNBQUssQ0FBQTtBQUFDLENBQUMsRUFBekIsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFBaUI7QUFJckMsa0JBQWtCO0FBQ2xCLElBQVksTUFTWDtBQVRELFdBQVksTUFBTTtJQUNkLDZEQUFpQixDQUFBO0lBQUUsNkRBQWlCLENBQUE7SUFBRSxtRkFBNEIsQ0FBQTtJQUFFLDZFQUF5QixDQUFBO0lBQzdGLG1GQUE0QixDQUFBO0lBQUUsdUVBQXNCLENBQUE7SUFDcEQsMkVBQXdCLENBQUE7SUFBRSx1RUFBc0IsQ0FBQTtJQUFFLHFFQUFxQixDQUFBO0lBQUUscUZBQTZCLENBQUE7SUFBRSx3RUFBc0IsQ0FBQTtJQUFFLDhGQUFpQyxDQUFBO0lBQ2pLLDhEQUFpQixDQUFBO0lBQUUsb0VBQW9CLENBQUE7SUFBRSx3R0FBc0MsQ0FBQTtJQUFFLDRGQUFnQyxDQUFBO0lBQ2pILDBFQUF1QixDQUFBO0lBQUUsMEVBQXVCLENBQUE7SUFBRSxzRkFBNkIsQ0FBQTtJQUFFLHNGQUE2QixDQUFBO0lBQzlHLDBDQUFPLENBQUE7SUFBRSw0Q0FBUSxDQUFBO0lBQUUsb0RBQVksQ0FBQTtJQUFFLDhDQUFTLENBQUE7SUFBRSxzREFBYSxDQUFBO0lBQUUsNENBQVEsQ0FBQTtJQUFFLDREQUFnQixDQUFBO0lBQUUsd0RBQWMsQ0FBQTtJQUFFLHdDQUFNLENBQUE7SUFBRSx3Q0FBTSxDQUFBO0lBQUUsc0NBQUssQ0FBQTtJQUM1SCxzREFBYSxDQUFBO0lBQUUsc0RBQWEsQ0FBQTtJQUFFLGdEQUFVLENBQUE7SUFDeEMsOERBQWlCLENBQUE7QUFDckIsQ0FBQyxFQVRXLE1BQU0sR0FBTixjQUFNLEtBQU4sY0FBTSxRQVNqQjtBQUVELElBQVksSUFPWDtBQVBELFdBQVksSUFBSTtJQUNaLDRCQUE0QjtJQUM1Qiw4Q0FBOEM7SUFDOUMsZ0hBQWdIO0lBQ2hILG9EQUFvRDtJQUNwRCwrQ0FBK0M7SUFDL0MsbUNBQU0sQ0FBQTtJQUFFLG1DQUFNLENBQUE7SUFBRSxtQ0FBTSxDQUFBO0lBQUUsdUNBQVEsQ0FBQTtJQUFFLHFDQUFPLENBQUE7SUFBRSwyREFBa0IsQ0FBQTtJQUFFLDZDQUFXLENBQUE7SUFBRSx1Q0FBUSxDQUFBO0lBQUUsbURBQWMsQ0FBQTtJQUFFLHlDQUFTLENBQUE7QUFDbkgsQ0FBQyxFQVBXLElBQUksR0FBSixZQUFJLEtBQUosWUFBSSxRQU9mO0FBRUQsVUFBVTtBQUNWLElBQVksTUFNWDtBQU5ELFdBQVksTUFBTTtJQUNkLHVEQUF1RDtJQUN2RCwwQ0FBMEM7SUFDMUMsOENBQThDO0lBQzlDLHVDQUF1QztJQUN2QyxpRUFBbUIsQ0FBQTtJQUFFLG1FQUFvQixDQUFBO0lBQUUscUVBQXFCLENBQUE7SUFBRSxtREFBWSxDQUFBO0lBQUUsaURBQVcsQ0FBQTtBQUMvRixDQUFDLEVBTlcsTUFBTSxHQUFOLGNBQU0sS0FBTixjQUFNLFFBTWpCO0FBRUQsV0FBVztBQUNYLElBQVksTUFXWDtBQVhELFdBQVksTUFBTTtJQUNkLGVBQWU7SUFDZiw0REFBNEQ7SUFDNUQscUNBQXFDO0lBQ3JDLHlDQUF5QztJQUN6Qyw2QkFBNkI7SUFDN0IsNkRBQTZEO0lBQzdELDBGQUEwRjtJQUMxRixnRkFBZ0Y7SUFDaEYsc0RBQXNEO0lBQ3RELG1EQUFZLENBQUE7SUFBRSxxREFBYSxDQUFBO0lBQUUsdURBQWMsQ0FBQTtJQUFFLG1EQUFZLENBQUE7SUFBRSx5REFBZSxDQUFBO0lBQUUseURBQWUsQ0FBQTtJQUFFLGlEQUFXLENBQUE7SUFBRSxpREFBVyxDQUFBO0lBQUUscURBQWEsQ0FBQTtJQUFFLDZDQUFTLENBQUE7SUFBRSw4Q0FBUyxDQUFBO0FBQzlKLENBQUMsRUFYVyxNQUFNLEdBQU4sY0FBTSxLQUFOLGNBQU0sUUFXakI7QUFJRCxJQUFZLGVBbUJYO0FBbkJELFdBQVksZUFBZTtJQUN2QixtSEFBNEMsQ0FBQTtJQUM1QyxxSEFBNkMsQ0FBQTtJQUM3Qyw2RkFBaUMsQ0FBQTtJQUNqQyx5R0FBdUMsQ0FBQTtJQUN2Qyx5RkFBK0IsQ0FBQTtJQUMvQiwyRkFBZ0MsQ0FBQTtJQUNoQyx1R0FBc0MsQ0FBQTtJQUN0QywyRkFBZ0MsQ0FBQTtJQUVoQyw0RkFBZ0MsQ0FBQTtJQUNoQywwRkFBK0IsQ0FBQTtJQUMvQiw4RkFBaUMsQ0FBQTtJQUNqQyxrR0FBa0MsQ0FBQTtJQUNsQywwR0FBc0MsQ0FBQTtJQUN0QyxxSEFBNEMsQ0FBQTtJQUU1QyxtR0FBb0MsQ0FBQTtJQUNwQyxpR0FBa0MsQ0FBQTtBQUN0QyxDQUFDLEVBbkJXLGVBQWUsR0FBZix1QkFBZSxLQUFmLHVCQUFlLFFBbUIxQjtBQUVELElBQVksV0FzQlg7QUF0QkQsV0FBWSxXQUFXO0lBQ25CLHVHQUEwQyxDQUFBO0lBQzFDLDJHQUE0QyxDQUFBO0lBQzVDLG1GQUFnQyxDQUFBO0lBQ2hDLCtGQUFzQyxDQUFBO0lBQ3RDLHFGQUFpQyxDQUFBO0lBQ2pDLGlGQUErQixDQUFBO0lBQy9CLDZGQUFxQyxDQUFBO0lBQ3JDLGlGQUErQixDQUFBO0lBRS9CLGtGQUErQixDQUFBO0lBQy9CLHdGQUFrQyxDQUFBO0lBQ2xDLG9GQUFnQyxDQUFBO0lBQ2hDLG1HQUF1QyxDQUFBO0lBQ3ZDLCtGQUFxQyxDQUFBO0lBQ3JDLGdHQUFxQyxDQUFBO0lBRXJDLG1HQUFzQyxDQUFBO0lBQ3RDLHNHQUF3QyxDQUFBO0lBQ3hDLDBHQUEwQyxDQUFBO0lBQzFDLCtGQUFvQyxDQUFBO0lBQ3BDLGlHQUFzQyxDQUFBO0FBQzFDLENBQUMsRUF0QlcsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFzQnRCO0FBRUQsSUFBWSxRQU1YO0FBTkQsV0FBWSxRQUFRO0lBQ2hCLHlDQUFTLENBQUE7SUFBRSxxQ0FBTyxDQUFBO0lBQUUsMkNBQVUsQ0FBQTtJQUM5QixzQ0FBUSxDQUFBO0lBQUUsc0NBQVEsQ0FBQTtJQUFFLHNDQUFRLENBQUE7SUFBRSxzQ0FBUSxDQUFBO0lBQUUsc0NBQVEsQ0FBQTtJQUFFLHNDQUFRLENBQUE7SUFDMUQsc0NBQVEsQ0FBQTtJQUFFLHNDQUFRLENBQUE7SUFBRSxzQ0FBUSxDQUFBO0lBQUUsc0NBQVEsQ0FBQTtJQUFFLHNDQUFRLENBQUE7SUFBRSxzQ0FBUSxDQUFBO0lBQzFELHNDQUFRLENBQUE7SUFBRSxzQ0FBUSxDQUFBO0lBQUUsc0NBQVEsQ0FBQTtJQUFFLHNDQUFRLENBQUE7SUFBRSxzQ0FBUSxDQUFBO0lBQUUsc0NBQVEsQ0FBQTtJQUFFLHNDQUFRLENBQUE7SUFBRSxzQ0FBUSxDQUFBO0lBQzlFLHlDQUFVLENBQUE7SUFBRSx5Q0FBVSxDQUFBO0lBQUUseUNBQVUsQ0FBQTtJQUFFLHlDQUFVLENBQUE7SUFBRSx5Q0FBVSxDQUFBO0lBQUUseUNBQVUsQ0FBQTtJQUFFLHlDQUFVLENBQUE7SUFBRSx5Q0FBVSxDQUFBO0FBQ2xHLENBQUMsRUFOVyxRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQU1uQjtBQUVELElBQVksUUFFWDtBQUZELFdBQVksUUFBUTtJQUNoQixtREFBVSxDQUFBO0lBQUUsNkRBQWUsQ0FBQTtJQUFFLHVEQUFZLENBQUE7SUFBRSxxRUFBbUIsQ0FBQTtBQUNsRSxDQUFDLEVBRlcsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFFbkI7QUFrQkQsNkZBQTZGO0FBQzdGLHlDQUF5QztBQUN6QyxJQUFJO0FBRUosbUVBQW1FO0FBQ25FLHdEQUF3RDtBQUN4RCw2Q0FBNkM7QUFDN0MsUUFBUTtBQUNSLEtBQUs7QUFFSixhQUFxQixDQUFDLFNBQVMsQ0FBQyxZQUFZLEdBQUcsVUFBVSxHQUFHLElBQVc7SUFDcEUsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDakIsQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLGNBQWMsRUFBRTtJQUMzRCxLQUFLLEVBQUUsVUFBVSxHQUFHLElBQVc7UUFDM0IsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDakIsQ0FBQztDQUNKLENBQUMsQ0FBQTs7Ozs7QUM1SVcsUUFBQSxNQUFNLEdBQVcsY0FBYyxDQUFBO0FBQy9CLFFBQUEsTUFBTSxHQUFXLE9BQU8sQ0FBQyxXQUFXLENBQUE7QUFFMUMsSUFBSSxpQkFBaUIsR0FBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUE7QUFBN0IsUUFBQSxpQkFBaUIscUJBQVk7QUFpQnhDLHlDQUF5QztBQUN6Qyx3Q0FBd0M7QUFDeEMsd0NBQXdDO0FBRXhDLHNEQUFzRDtBQUV0RCx5REFBeUQ7QUFDekQsSUFBSSxrQkFBa0IsR0FBRyxJQUFJLEdBQUcsRUFBeUIsQ0FBQztBQUNuRCxNQUFNLEtBQUssR0FBRyxDQUFDLE1BQWMsRUFBNkIsRUFBRSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUFyRixRQUFBLEtBQUssU0FBZ0Y7QUFDM0YsTUFBTSxLQUFLLEdBQUcsQ0FBQyxNQUFjLEVBQUUsSUFBbUIsRUFBOEIsRUFBRSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFBakgsUUFBQSxLQUFLLFNBQTRHO0FBRTlILDBEQUEwRDtBQUMxRCxJQUFJLG9CQUFvQixHQUFHLElBQUksR0FBRyxFQUFlLENBQUM7QUFDbEQsU0FBZ0IsS0FBSyxDQUFJLElBQVksRUFBRSxJQUFPO0lBQzFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDcEMsSUFBQSxhQUFLLEVBQUMsSUFBSSxFQUFFLElBQWdDLENBQUMsQ0FBQztBQUNsRCxDQUFDO0FBSEQsc0JBR0M7QUFDRCxTQUFnQixPQUFPLENBQUksSUFBWSxFQUFFLElBQU87SUFDNUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUNwQyxJQUFBLGFBQUssRUFBQyxJQUFJLEVBQUUsSUFBZ0MsQ0FBQyxDQUFDO0FBQ2xELENBQUM7QUFIRCwwQkFHQztBQUNELFNBQWdCLEtBQUssQ0FBSSxJQUFZO0lBQ2pDLE9BQU8sb0JBQW9CLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ3pDLENBQUM7QUFGRCxzQkFFQztBQUVELFNBQVM7QUFDVCxJQUFJLGNBQWMsR0FBRyxJQUFJLEdBQUcsRUFBYyxDQUFBO0FBRW5DLE1BQU0sS0FBSyxHQUFHLENBQUMsSUFBVSxFQUFPLEVBQUUsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQXJELFFBQUEsS0FBSyxTQUFnRDtBQUVsRSxTQUFnQixNQUFNLENBQUksSUFBVTtJQUNoQyxJQUFJLEdBQUcsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ2xDLElBQUksR0FBRyxJQUFJLFNBQVM7UUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFBO0lBQzdCLE9BQU8sY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQU0sQ0FBQTtBQUN4QyxDQUFDO0FBSkQsd0JBSUM7QUFDRCxTQUFnQixLQUFLLENBQUMsSUFBVSxFQUFFLEdBQVE7SUFDdEMsT0FBTyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQW1CLENBQUE7QUFDMUQsQ0FBQztBQUZELHNCQUVDO0FBRUQsU0FBZ0IsT0FBTyxDQUFPLElBQVk7SUFDdEMsSUFBSSxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQzFCLE9BQU8sY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQWMsQ0FBQTtLQUMvQztTQUFNO1FBQ0gsSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQVEsQ0FBQTtRQUN6QixPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ2xCLE9BQU8sR0FBRyxDQUFBO0tBQ2I7QUFDTCxDQUFDO0FBUkQsMEJBUUM7QUFFRCxTQUFnQixPQUFPLENBQU8sSUFBWSxFQUFFLEdBQWM7SUFDdEQsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUE7QUFDakMsQ0FBQztBQUZELDBCQUVDO0FBRUQsU0FBZ0IsYUFBYSxDQUFPLElBQVksRUFBRSxHQUFNLEVBQUUsS0FBUTtJQUM5RCxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUE7QUFDaEQsQ0FBQztBQUZELHNDQUVDO0FBRUQsU0FBZ0IsYUFBYSxDQUFPLElBQVksRUFBRSxHQUFNO0lBQ3BELE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUNqQyxDQUFDO0FBRkQsc0NBRUM7QUFFRCxTQUFnQixTQUFTLENBQUksSUFBWTtJQUNyQyxJQUFJLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDMUIsT0FBTyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBYSxDQUFBO0tBQzlDO1NBQU07UUFDSCxJQUFJLEdBQUcsR0FBRyxJQUFJLEtBQUssRUFBSyxDQUFBO1FBQ3hCLFNBQVMsQ0FBSSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDdkIsT0FBTyxHQUFHLENBQUE7S0FDYjtBQUNMLENBQUM7QUFSRCw4QkFRQztBQUVELFNBQWdCLFNBQVMsQ0FBSSxJQUFZLEVBQUUsS0FBZTtJQUN0RCxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQTtBQUNuQyxDQUFDO0FBRkQsOEJBRUM7QUFFRCxTQUFnQixTQUFTLENBQUMsSUFBWTtJQUNsQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQy9CLENBQUM7QUFGRCw4QkFFQztBQUVELFNBQWdCLE9BQU8sQ0FBQyxJQUFZO0lBQ2hDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDL0IsQ0FBQztBQUZELDBCQUVDO0FBU0QsVUFBVSxDQUFDLG9CQUFvQixHQUFHLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsT0FBTyxLQUFLLEVBQUUsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDOUcsVUFBVSxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFBO0FBQ2xELFVBQVUsQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFBO0FBQzFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsY0FBTSxDQUFBOzs7OztBQ25IMUIsTUFBTSxjQUFjLEdBQUcsQ0FBQyxVQUF5QixFQUFRLEVBQUU7SUFDdkQsSUFBSSxPQUFPLFVBQVUsSUFBSSxRQUFRO1FBQUUsVUFBVSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUMvRCxJQUFJLFVBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDOUMsSUFBSSxXQUFXLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUE7SUFDekMsSUFBSSxXQUFXLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFBO0lBQy9DLElBQUksY0FBYyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUE7SUFFM0QsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxVQUFVLENBQUMsY0FBYyxHQUFHLE1BQU0sR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVE7VUFDdEgsVUFBVSxDQUFDLGNBQWMsR0FBRyxRQUFRLEdBQUcsVUFBVSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxDQUFBO0lBQ3RGLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxHQUFHLFFBQVEsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsV0FBVyxHQUFHLFNBQVMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7VUFDakssUUFBUSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsV0FBVyxHQUFHLHdCQUF3QixHQUFHLGNBQWMsR0FBRyxLQUFLLENBQUMsQ0FBQTtJQUNySCxJQUFJLFVBQVUsQ0FBQyxjQUFjLElBQUksQ0FBQztRQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUE7QUFDNUosQ0FBQyxDQUFBO0FBU1Esd0NBQWM7QUFGdkIsVUFBVSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUE7Ozs7QUNuQjFDLDZEQUE0RDtBQUM1RCwwRUFBbUY7QUFDbkYsbUZBQW9GO0FBQ3BGLDhDQUFnRDtBQUNoRCw0Q0FBb0Y7QUFFcEYsTUFBTSxZQUFZO0lBRU4sT0FBTyxHQUFXLEVBQUUsQ0FBQTtJQUNwQixNQUFNLENBQWU7SUFDckIsSUFBSSxDQUFzQjtJQUMxQixNQUFNLEdBQWtCLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV2QyxZQUFtQixPQUFlLEVBQUUsVUFBeUI7UUFDekQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUE7UUFDeEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLEtBQUssQ0FBZ0IsVUFBVSxDQUFDLHFCQUFxQixDQUFDLENBQUE7SUFDMUUsQ0FBQztJQUVNLFVBQVU7UUFDYixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUVNLFVBQVUsQ0FBQyxPQUFlO1FBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLE9BQU8sSUFBSSxDQUFBO0lBQ2YsQ0FBQztJQUVNLFNBQVM7UUFDWixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVNLFNBQVMsQ0FBQyxNQUFxQjtRQUNsQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtRQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksS0FBSyxDQUFnQixNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQTtRQUNsRSxPQUFPLElBQUksQ0FBQTtJQUNmLENBQUM7SUFFTSxNQUFNLENBQUMsS0FBYSxFQUFFLEdBQWtCO1FBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFBO1FBQ3RCLE9BQU8sSUFBSSxDQUFBO0lBQ2YsQ0FBQztJQUVNLFNBQVMsQ0FBQyxNQUFxQjtRQUNsQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtRQUNwQixPQUFPLElBQUksQ0FBQTtJQUNmLENBQUM7SUFFTSxNQUFNLENBQUMsS0FBYTtRQUN2QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVNLFNBQVM7UUFDWixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVNLE9BQU87UUFDVixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVNLFlBQVk7UUFDZixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDO0lBQ3RDLENBQUM7SUFFTSxPQUFPLENBQUMsS0FBMEI7UUFDckMsSUFBSSxLQUFLLElBQUksU0FBUyxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjO1lBQUUsT0FBTyxJQUFJLENBQUE7UUFDckcsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUE7UUFDakIsT0FBTyxJQUFJLENBQUE7SUFDZixDQUFDO0lBRUQsTUFBTSxDQUFDLDBCQUEwQixHQUF3QixJQUFJLEdBQUcsRUFBa0IsQ0FBQTtJQUMzRSxRQUFRO1FBQ1gsSUFBSSxLQUFLLEdBQUcsWUFBWSxDQUFDLDBCQUEwQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDckUsSUFBSSxLQUFLO1lBQUUsT0FBTyxLQUFLLENBQUE7UUFDdkIsSUFBSSxXQUFXLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLHNCQUFzQixHQUFHLENBQUE7UUFDcEYsSUFBSSxTQUFTLEdBQUcsR0FBRyxzQkFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQTtRQUNySCxJQUFJLFdBQVcsR0FBRyxTQUFTLElBQUEsNkJBQWMsRUFBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUE7UUFDakUsSUFBSSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxLQUFLLFdBQVcsUUFBUSxTQUFTLEtBQUssV0FBVyxFQUFFLENBQUE7UUFDL0UsWUFBWSxDQUFDLDBCQUEwQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQ2pFLE9BQU8sTUFBTSxDQUFBO0lBQ2pCLENBQUM7SUFFTSxPQUFPLENBQUMsS0FBYTtRQUN4QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWM7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUE7UUFDNUYsSUFBSSxJQUFJLEdBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3ZELElBQUksSUFBSSxHQUFHLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQTtRQUNwRixPQUFPLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDMUQsQ0FBQztJQUVNLE1BQU0sQ0FBQyxTQUFTLEdBQUcsQ0FBQyxNQUFxQixFQUFFLElBQWlCLEVBQUUsTUFBcUIsRUFBVSxFQUFFO1FBQ2xHLElBQUksT0FBTyxNQUFNLElBQUksUUFBUTtZQUFFLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDbkQsSUFBSSxPQUFPLE1BQU0sSUFBSSxRQUFRO1lBQUUsTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtRQUN0RSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUFFLE9BQU8sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQ3RFLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFBRSxPQUFPLEVBQUUsQ0FBQTtRQUMvQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLGdCQUFnQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFBRSxPQUFPLE1BQU0sQ0FBQTtRQUMxSCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFBRSxPQUFPLFNBQVMsRUFBRSxDQUFBO1FBQzFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQztZQUFFLE9BQU8sY0FBYyxFQUFFLENBQUE7UUFDdkYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNO1lBQUUsT0FBTyxRQUFRLEVBQUUsQ0FBQTtRQUVwRSxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUV2QixTQUFTLFNBQVM7WUFDZCxPQUFPLEVBQUUsQ0FBQTtRQUNiLENBQUM7UUFFRCxTQUFTLGNBQWM7WUFDbkIsT0FBTyxFQUFFLENBQUE7UUFDYixDQUFDO1FBRUQsU0FBUyxRQUFRO1lBQ2IsT0FBTyxFQUFFLENBQUE7UUFDYixDQUFDO1FBRUQsU0FBUyxVQUFVLENBQUMsSUFBaUI7WUFDakMsUUFBUSxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNmLEtBQUssYUFBYTtvQkFDZCxPQUFPLEVBQUUsQ0FBQTtnQkFDYixLQUFLLGdCQUFnQjtvQkFDakIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUE7Z0JBQzlDLEtBQUssY0FBYztvQkFDZixPQUFPLElBQUEsZ0JBQU8sRUFBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtnQkFDckMsS0FBSyxlQUFlO29CQUNoQixPQUFPLElBQUEsaUJBQVEsRUFBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtnQkFDdEMsS0FBSyxjQUFjO29CQUNmLE9BQU8sSUFBQSxrQkFBUyxFQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBO2dCQUN2QyxLQUFLLGVBQWU7b0JBQ2hCLE9BQU8sSUFBQSxtQkFBVSxFQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBO2dCQUN4QyxLQUFLLGVBQWU7b0JBQ2hCLE9BQU8sSUFBQSxnQkFBTyxFQUFDLE1BQU0sQ0FBQyxDQUFBO2dCQUMxQixLQUFLLGVBQWU7b0JBQ2hCLE9BQU8sVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFBO2dCQUM3QixLQUFLLG9CQUFvQjtvQkFDckIsT0FBTyxJQUFJLHlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBO2dCQUNuRCxLQUFLLG1CQUFtQjtvQkFDcEIsT0FBTyxJQUFJLGlCQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUE7Z0JBQzNDLEtBQUssU0FBUztvQkFDVixPQUFPLEdBQUcsTUFBTSxDQUFDLFNBQVMsRUFBRSxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQTtnQkFDL0QsS0FBSyxlQUFlLENBQUM7Z0JBQ3JCLEtBQUssaUJBQWlCLENBQUM7Z0JBQ3ZCLEtBQUssaUJBQWlCO29CQUNsQixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBO2dCQUM5RztvQkFDSSxJQUFJO3dCQUNBLE9BQU8sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBO3FCQUM5QztvQkFBQyxPQUFPLEtBQUssRUFBRTt3QkFDWixPQUFPLEVBQUUsQ0FBQTtxQkFDWjthQUNSO1FBQ0wsQ0FBQztRQUVELFNBQVMsYUFBYSxDQUFDLE1BQW9CO1lBQ3ZDLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQTtZQUNaLE9BQU8sSUFBSSxFQUFFO2dCQUNULElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUE7Z0JBQzFCLElBQUksTUFBTSxJQUFJLElBQUksRUFBRTtvQkFDaEIsTUFBTSxHQUFHLE1BQU0sQ0FBQTtvQkFDZixHQUFHLElBQUksTUFBTSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUE7aUJBQzlCO3FCQUFNO29CQUNILFlBQVk7b0JBQ1osT0FBTyxHQUFHLENBQUE7aUJBQ2I7YUFDSjtRQUNMLENBQUM7SUFDTCxDQUFDLENBQUE7O0FBR0wsa0JBQWUsWUFBWSxDQUFDOzs7O0FDL0o1QixNQUFNLFlBQWEsU0FBUSxNQUFNLENBQUMsTUFBTTtJQUNwQyxPQUFPLEdBQThDLEVBQUUsQ0FBQztJQUN4RCxNQUFNLEdBQXNDLEVBQUUsQ0FBQztJQUMvQyxNQUFNLENBQUMsR0FBRyxJQUFTO0lBRW5CLENBQUM7Q0FDSjtBQUdELE1BQU0sTUFBTyxTQUFRLE1BQU0sQ0FBQyxNQUFNO0lBQzlCLE9BQU8sR0FBOEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUE7SUFDdkUsTUFBTSxHQUFzQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQTtJQUU3RCxJQUFJO1FBRUEsT0FBTyxJQUFJLEtBQUssQ0FBZSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ3ZDLEdBQUcsRUFBRSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRTtnQkFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUEwQixDQUFDLENBQUM7Z0JBQ2hFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBd0IsQ0FBQyxDQUFDO2dCQUM3RCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3pDLENBQUM7U0FDSixDQUE0QixDQUFBO0lBQ2pDLENBQUM7Q0FFSjtBQUVELFNBQVMsUUFBUSxDQUFDLElBQTRCO0lBQzFDLElBQUksT0FBTyxJQUFJLElBQUksUUFBUTtRQUFFLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDN0MsT0FBTyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFBO0FBQzlDLENBQUM7QUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUE7Ozs7QUNuQ3pDLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxjQUFjLEVBQUU7SUFDakQsS0FBSyxFQUFFO1FBQ0gsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFDbkMsT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ2hILENBQUM7Q0FDSixDQUFDLENBQUE7Ozs7Ozs7O0FDUkYsMENBQWlEO0FBR2pELGlCQUFpQjtBQUNWLE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxTQUFpRCxFQUFVLEVBQUU7SUFDM0YsSUFBSSxPQUFPLFNBQVMsSUFBSSxRQUFRO1FBQUUsU0FBUyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUM1RCxJQUFJLFdBQTBCLENBQUE7SUFDOUIsc0RBQXNEO0lBQ3RELElBQUksU0FBUyxZQUFZLE1BQU0sQ0FBQyxNQUFNLEVBQUU7UUFDcEMsV0FBVyxHQUFHLFNBQVMsQ0FBQTtLQUMxQjtTQUFNLElBQUksT0FBTyxTQUFTLElBQUksUUFBUSxFQUFFO1FBQ3JDLFdBQVcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7S0FDbEQ7U0FBTTtRQUNILFdBQVcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUE7S0FDN0M7SUFDRCxJQUFJLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFBO0lBQzdCLElBQUksTUFBTSxHQUFHLEtBQUssR0FBRyxzQkFBZSxDQUFDLG1DQUFtQyxDQUFBO0lBQ3hFLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQTtJQUNoQixRQUFRLE1BQU0sRUFBRTtRQUNaLEtBQUssc0JBQWUsQ0FBQyx3QkFBd0I7WUFDekMsT0FBTyxJQUFJLFVBQVUsQ0FBQTtZQUNyQixNQUFLO1FBQ1QsS0FBSyxzQkFBZSxDQUFDLHVCQUF1QjtZQUN4QyxPQUFPLElBQUksU0FBUyxDQUFBO1lBQ3BCLE1BQUs7UUFDVCxLQUFLLHNCQUFlLENBQUMsdUJBQXVCO1lBQ3hDLE9BQU8sSUFBSSxZQUFZLENBQUE7WUFDdkIsTUFBSztRQUNULEtBQUssc0JBQWUsQ0FBQyxzQkFBc0IsQ0FBQztRQUM1QyxLQUFLLHNCQUFlLENBQUMsOEJBQThCO1lBQy9DLE9BQU8sSUFBSSxXQUFXLENBQUE7WUFDdEIsTUFBSztRQUNULEtBQUssc0JBQWUsQ0FBQyw2QkFBNkI7WUFDOUMsT0FBTyxJQUFJLHFCQUFxQixDQUFBO1lBQ2hDLE1BQUs7S0FDWjtJQUVELElBQUksS0FBSyxHQUFHLHNCQUFlLENBQUMsdUJBQXVCLEVBQUU7UUFDakQsT0FBTyxJQUFJLFNBQVMsQ0FBQTtLQUN2QjtJQUVELElBQUksS0FBSyxHQUFHLHNCQUFlLENBQUMseUJBQXlCLEVBQUU7UUFDbkQsT0FBTyxJQUFJLFdBQVcsQ0FBQTtRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLHNCQUFlLENBQUMsbUNBQW1DLENBQUMsSUFBSSxzQkFBZSxDQUFDLDJCQUEyQixFQUFFO1lBQzlHLE9BQU8sSUFBSSxXQUFXLENBQUE7U0FDekI7S0FDSjtTQUFNLElBQUksS0FBSyxHQUFHLHNCQUFlLENBQUMsc0JBQXNCLEVBQUU7UUFDdkQsSUFBSSxDQUFDLEtBQUssR0FBRyxzQkFBZSxDQUFDLG1DQUFtQyxDQUFDLElBQUksc0JBQWUsQ0FBQywyQkFBMkIsRUFBRTtZQUM5RyxPQUFPLElBQUksa0JBQWtCLENBQUE7U0FDaEM7S0FDSjtTQUFNLElBQUksS0FBSyxHQUFHLHNCQUFlLENBQUMsd0JBQXdCLEVBQUU7UUFDekQsSUFBSSxDQUFDLEtBQUssR0FBRyxzQkFBZSxDQUFDLG1DQUFtQyxDQUFDLElBQUksc0JBQWUsQ0FBQyx5QkFBeUIsRUFBRTtZQUM1RyxPQUFPLElBQUksVUFBVSxDQUFBO1NBQ3hCO2FBQU07WUFDSCxPQUFPLElBQUksV0FBVyxDQUFBO1NBQ3pCO0tBQ0o7SUFDRCxJQUFJLEtBQUssR0FBRyxzQkFBZSxDQUFDLDZCQUE2QixFQUFFO1FBQ3ZELE9BQU8sSUFBSSxTQUFTLENBQUE7S0FDdkI7SUFDRCxPQUFPLE9BQU8sQ0FBQTtBQUNsQixDQUFDLENBQUE7QUF6RFksUUFBQSxpQkFBaUIscUJBeUQ3QjtBQUVNLE1BQU0seUJBQXlCLEdBQUcsQ0FBQyxTQUFpRCxFQUFFLFVBQVUsR0FBRyxJQUFJLEVBQVUsRUFBRTtJQUN0SCxJQUFJLE9BQU8sU0FBUyxJQUFJLFFBQVE7UUFBRSxTQUFTLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQzVELElBQUksU0FBUyxJQUFJLElBQUksSUFBSSxTQUFTLENBQUMsTUFBTSxFQUFFO1FBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxvREFBb0QsQ0FBQyxDQUFBO0lBQ2xILElBQUksV0FBVyxHQUFrQixTQUFTLFlBQVksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDOUcsSUFBSSxhQUFhLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzFELElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQTtJQUNoQixPQUFPLElBQUksSUFBQSx5QkFBaUIsRUFBQyxXQUFXLENBQUMsQ0FBQTtJQUN6QyxPQUFPLElBQUksR0FBRyxhQUFhLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFBO0lBQ3hELE9BQU8sSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFBO0lBQzNCLE9BQU8sSUFBSSxHQUFHLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLElBQUk7UUFDNUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUN4QixPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQzVCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUE7SUFDMUQsT0FBTyxPQUFPLENBQUE7QUFDbEIsQ0FBQyxDQUFBO0FBZFksUUFBQSx5QkFBeUIsNkJBY3JDO0FBRUQsMEJBQTBCO0FBQzFCLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxHQUFHLEVBQWdELENBQUE7QUFDN0UsTUFBTSxhQUFhLEdBQUcsQ0FBQyxNQUE4QyxFQUE2QyxFQUFFO0lBQ3ZILElBQUksTUFBTSxZQUFZLGFBQWEsRUFBRTtRQUNqQyxPQUFPLGtCQUFrQixDQUFDLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO0tBQ3ZEO1NBQU0sSUFBSSxPQUFPLE1BQU0sSUFBSSxRQUFRLEVBQUU7UUFDbEMsT0FBTyxrQkFBa0IsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUM1RDtTQUFNLElBQUksTUFBTSxZQUFZLE1BQU0sQ0FBQyxNQUFNLEVBQUU7UUFDeEMsT0FBTyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQTtLQUNwQztTQUFNO1FBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFBO0tBQ3hEO0lBRUQsSUFBSTtJQUNKLG9CQUFvQjtJQUNwQixvQkFBb0I7SUFDcEIsa0JBQWtCO0lBQ2xCLHVDQUF1QztJQUN2QyxvQkFBb0I7SUFDcEIseUJBQXlCO0lBQ3pCLElBQUk7SUFFSixTQUFTLGtCQUFrQixDQUFDLE1BQXFCO1FBQzdDLElBQUksS0FBSyxHQUFHLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUM1QyxJQUFJLEtBQUssSUFBSSxTQUFTO1lBQUUsT0FBTyxLQUFLLENBQUE7UUFDcEMsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFBO1FBQ2hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQXFCLElBQUk7UUFDcEQsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUEsQ0FBYSxJQUFJO1FBQ3BELE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQSxDQUFLLElBQUk7UUFDOUYsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFBLGlDQUF5QixFQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUEsQ0FBQyxJQUFJO1FBQ3BELE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQSxDQUFlLElBQUk7UUFDcEQsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBLENBQWlCLElBQUk7UUFDcEQsb0JBQW9CLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQTtRQUN6QyxPQUFPLE9BQU8sQ0FBQTtJQUNsQixDQUFDO0FBQ0wsQ0FBQyxDQUFBO0FBakNZLFFBQUEsYUFBYSxpQkFpQ3pCO0FBRUQsNkJBQTZCO0FBQ3RCLE1BQU0sY0FBYyxHQUFHLENBQUMsTUFBcUIsRUFBRSxTQUFrQixLQUFLLEVBQVUsRUFBRTtJQUNyRixJQUFJLEdBQUcsR0FBRyxJQUFBLHFCQUFhLEVBQUMsTUFBTSxDQUFDLENBQUE7SUFDL0IsSUFBSSxHQUFHLElBQUksU0FBUztRQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQTtJQUN2RixhQUFhO0lBQ2IsSUFBSSxNQUFNO1FBQUUsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFBO0lBQ2hILElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQTtJQUN2QixVQUFVLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQTtJQUMvQixVQUFVLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUE7SUFDckMsVUFBVSxJQUFJLEdBQUksR0FBRyxDQUFDLENBQUMsQ0FBbUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQTtJQUMxRSxVQUFVLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtJQUN6QixJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUFFLFVBQVUsSUFBSSxpQkFBaUIsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFBO0lBQzFGLE9BQU8sVUFBVSxDQUFBO0FBQ3JCLENBQUMsQ0FBQTtBQVpZLFFBQUEsY0FBYyxrQkFZMUI7QUFFRCxVQUFVLENBQUMsYUFBYSxHQUFHLHFCQUFvQixDQUFBOzs7O0FDbkkvQyxtQ0FBZ0M7QUFDaEMsaUNBQThCO0FBQzlCLDZCQUEwQjs7OztBQ0YxQixTQUFTLHNCQUFzQixDQUMzQixZQUFvQixFQUFFLFVBQWtCLEVBQUUsWUFBb0IsRUFBRSxZQUFvQixDQUFDLENBQUMsRUFDdEYsT0FBVSxFQUFFLFFBQVc7SUFFdkIsT0FBTyw4QkFBOEIsQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQTtBQUNuSCxDQUFDO0FBRUQsU0FBUyw4QkFBOEIsQ0FDbkMsWUFBb0IsRUFBRSxVQUFrQixFQUFFLFlBQW9CLEVBQUUsWUFBb0IsQ0FBQyxDQUFDLEVBQ3RGLFFBQWtCLEVBQUUsT0FBVSxFQUFFLFFBQVc7SUFFM0MsSUFBSSxNQUFNLEdBQUcsVUFBVSxDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDM0YsSUFBSSxNQUFNLElBQUksU0FBUztRQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsVUFBVSxZQUFZLFlBQVksQ0FBQyxDQUFBO0lBQzVFLElBQUksYUFBYSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUE7SUFDekMsSUFBSSxhQUFhLElBQUksSUFBSTtRQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtJQUNuRSxPQUFPLElBQUksY0FBYyxDQUFPLGFBQWEsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDdEUsQ0FBQztBQUVELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLHNCQUFzQixDQUFBO0FBQ3JDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLDhCQUE4QixDQUFBOztBQ25CN0M7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7Ozs7QUNBQSwrQkFBNEI7QUFDNUIsOEJBQTJCO0FBQzNCLGlDQUE4QjtBQUM5Qiw0QkFBeUI7QUFDekIsMkJBQXdCO0FBQ3hCLG1DQUFnQztBQUNoQyxpQ0FBOEI7O0FDTjlCOzs7O0FDQUEseUNBQXVDOztBQ0F2Qzs7QUNBQTs7QUNBQTs7Ozs7Ozs7OztBQ0FBLG1FQUE4QztBQUM5Qyx1QkFBb0I7QUFFcEIsTUFBTSxZQUFZO0lBR2QsTUFBTSxLQUFLLEtBQUs7UUFDWiwrQ0FBK0M7UUFDL0MsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsRUFBRSx1QkFBdUIsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDL0csQ0FBQztJQUdELE1BQU0sS0FBSyxTQUFTO1FBQ2hCLCtDQUErQztRQUMvQyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixFQUFFLHVCQUF1QixFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDekgsQ0FBQztJQUdELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLDREQUE0RDtRQUM1RCxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixFQUFFLHVCQUF1QixFQUFFLFdBQVcsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDOUgsQ0FBQztJQUdELE1BQU0sS0FBSyxPQUFPO1FBQ2QsNENBQTRDO1FBQzVDLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLEVBQUUsdUJBQXVCLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUMzSCxDQUFDO0lBR0QsTUFBTSxLQUFLLGNBQWM7UUFDckIsb0NBQW9DO1FBQ3BDLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLEVBQUUsdUJBQXVCLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUMzSCxDQUFDO0lBR0QsTUFBTSxLQUFLLHlCQUF5QjtRQUNoQyx1REFBdUQ7UUFDdkQsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsRUFBRSx1QkFBdUIsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzNILENBQUM7SUFHRCxNQUFNLEtBQUssNEJBQTRCO1FBQ25DLCtEQUErRDtRQUMvRCxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixFQUFFLHVCQUF1QixFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUMzSSxDQUFDO0lBR0QsTUFBTSxLQUFLLGtCQUFrQjtRQUN6QiwwQ0FBMEM7UUFDMUMsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsRUFBRSx1QkFBdUIsRUFBRSxtQkFBbUIsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUMzSCxDQUFDO0lBR0QsTUFBTSxLQUFLLFVBQVU7UUFDakIscUNBQXFDO1FBQ3JDLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLEVBQUUsdUJBQXVCLEVBQUUsV0FBVyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUM5SCxDQUFDO0lBR0QsTUFBTSxLQUFLLG9DQUFvQztRQUMzQywyRUFBMkU7UUFDM0UsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsRUFBRSx1QkFBdUIsRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN0SSxDQUFDO0lBR0QsTUFBTSxLQUFLLG1CQUFtQjtRQUMxQix1REFBdUQ7UUFDdkQsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsRUFBRSx1QkFBdUIsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDdkksQ0FBQztJQUdELE1BQU0sS0FBSyxlQUFlO1FBQ3RCLGtEQUFrRDtRQUNsRCxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixFQUFFLHVCQUF1QixFQUFFLGdCQUFnQixFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNuSSxDQUFDO0lBR0QsTUFBTSxLQUFLLGVBQWU7UUFDdEIsc0NBQXNDO1FBQ3RDLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLEVBQUUsdUJBQXVCLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDcEgsQ0FBQztJQUdELE1BQU0sS0FBSyxnQkFBZ0I7UUFDdkIsbUNBQW1DO1FBQ25DLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3BJLENBQUM7SUFHRCxNQUFNLEtBQUssWUFBWTtRQUNuQiwrQkFBK0I7UUFDL0IsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsRUFBRSx1QkFBdUIsRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDckgsQ0FBQztJQUdELE1BQU0sS0FBSyxxQkFBcUI7UUFDNUIsa0RBQWtEO1FBQ2xELE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLEVBQUUsdUJBQXVCLEVBQUUsc0JBQXNCLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3pJLENBQUM7SUFHRCxNQUFNLEtBQUsscUJBQXFCO1FBQzVCLHdDQUF3QztRQUN4QyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixFQUFFLHVCQUF1QixFQUFFLHNCQUFzQixFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzlILENBQUM7SUFHRCxNQUFNLEtBQUssa0JBQWtCO1FBQ3pCLCtDQUErQztRQUMvQyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixFQUFFLHVCQUF1QixFQUFFLG1CQUFtQixFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUN0SSxDQUFDO0lBR0QsTUFBTSxLQUFLLGtCQUFrQjtRQUN6QixxQ0FBcUM7UUFDckMsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsRUFBRSx1QkFBdUIsRUFBRSxtQkFBbUIsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUMzSCxDQUFDO0lBR0QsTUFBTSxLQUFLLGtCQUFrQjtRQUN6QixrREFBa0Q7UUFDbEQsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsRUFBRSx1QkFBdUIsRUFBRSxtQkFBbUIsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDdEksQ0FBQztJQUdELE1BQU0sS0FBSyxrQkFBa0I7UUFDekIsd0NBQXdDO1FBQ3hDLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLEVBQUUsdUJBQXVCLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDM0gsQ0FBQztJQUdELE1BQU0sS0FBSyxlQUFlO1FBQ3RCLDRDQUE0QztRQUM1QyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixFQUFFLHVCQUF1QixFQUFFLGdCQUFnQixFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNuSSxDQUFDO0lBR0QsTUFBTSxLQUFLLGVBQWU7UUFDdEIsa0NBQWtDO1FBQ2xDLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLEVBQUUsdUJBQXVCLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDeEgsQ0FBQztJQUdELE1BQU0sS0FBSyx1QkFBdUI7UUFDOUIsNENBQTRDO1FBQzVDLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLEVBQUUsdUJBQXVCLEVBQUUsd0JBQXdCLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDaEksQ0FBQztJQUdELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLDBDQUEwQztRQUMxQyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixFQUFFLHVCQUF1QixFQUFFLFlBQVksRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDL0gsQ0FBQztJQUdELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLGdDQUFnQztRQUNoQyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixFQUFFLHVCQUF1QixFQUFFLFlBQVksRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNwSCxDQUFDO0lBR0QsTUFBTSxLQUFLLGFBQWE7UUFDcEIsMENBQTBDO1FBQzFDLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLEVBQUUsdUJBQXVCLEVBQUUsY0FBYyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNqSSxDQUFDO0lBR0QsTUFBTSxLQUFLLGFBQWE7UUFDcEIsZ0NBQWdDO1FBQ2hDLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLEVBQUUsdUJBQXVCLEVBQUUsY0FBYyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNqSSxDQUFDO0lBR0QsTUFBTSxLQUFLLGFBQWE7UUFDcEIsNkNBQTZDO1FBQzdDLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLEVBQUUsdUJBQXVCLEVBQUUsY0FBYyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNqSSxDQUFDO0lBR0QsTUFBTSxLQUFLLGFBQWE7UUFDcEIsbUNBQW1DO1FBQ25DLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLEVBQUUsdUJBQXVCLEVBQUUsY0FBYyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3RILENBQUM7SUFHRCxNQUFNLEtBQUssT0FBTztRQUNkLDBCQUEwQjtRQUMxQixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixFQUFFLHVCQUF1QixFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNoSCxDQUFDO0lBR0QsTUFBTSxLQUFLLHVCQUF1QjtRQUM5Qiw0Q0FBNEM7UUFDNUMsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsRUFBRSx1QkFBdUIsRUFBRSx3QkFBd0IsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNoSSxDQUFDO0NBRUo7QUEvTEc7SUFEQyw4QkFBSzsrQkFJTDtBQUdEO0lBREMsOEJBQUs7bUNBSUw7QUFHRDtJQURDLDhCQUFLO29DQUlMO0FBR0Q7SUFEQyw4QkFBSztpQ0FJTDtBQUdEO0lBREMsOEJBQUs7d0NBSUw7QUFHRDtJQURDLDhCQUFLO21EQUlMO0FBR0Q7SUFEQyw4QkFBSztzREFJTDtBQUdEO0lBREMsOEJBQUs7NENBSUw7QUFHRDtJQURDLDhCQUFLO29DQUlMO0FBR0Q7SUFEQyw4QkFBSzs4REFJTDtBQUdEO0lBREMsOEJBQUs7NkNBSUw7QUFHRDtJQURDLDhCQUFLO3lDQUlMO0FBR0Q7SUFEQyw4QkFBSzt5Q0FJTDtBQUdEO0lBREMsOEJBQUs7MENBSUw7QUFHRDtJQURDLDhCQUFLO3NDQUlMO0FBR0Q7SUFEQyw4QkFBSzsrQ0FJTDtBQUdEO0lBREMsOEJBQUs7K0NBSUw7QUFHRDtJQURDLDhCQUFLOzRDQUlMO0FBR0Q7SUFEQyw4QkFBSzs0Q0FJTDtBQUdEO0lBREMsOEJBQUs7NENBSUw7QUFHRDtJQURDLDhCQUFLOzRDQUlMO0FBR0Q7SUFEQyw4QkFBSzt5Q0FJTDtBQUdEO0lBREMsOEJBQUs7eUNBSUw7QUFHRDtJQURDLDhCQUFLO2lEQUlMO0FBR0Q7SUFEQyw4QkFBSztxQ0FJTDtBQUdEO0lBREMsOEJBQUs7cUNBSUw7QUFHRDtJQURDLDhCQUFLO3VDQUlMO0FBR0Q7SUFEQyw4QkFBSzt1Q0FJTDtBQUdEO0lBREMsOEJBQUs7dUNBSUw7QUFHRDtJQURDLDhCQUFLO3VDQUlMO0FBR0Q7SUFEQyw4QkFBSztpQ0FJTDtBQUdEO0lBREMsOEJBQUs7aURBSUw7QUFnQkwsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDOzs7OztBQ25OcEMsNERBQStEO0FBQy9ELG9DQUF5QztBQUV6QyxNQUFNLGFBQWMsU0FBUSxxQkFBYTtJQUVyQyxNQUFNO1FBQ0YsT0FBTyxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCxRQUFRLENBQUMsS0FBYTtRQUNsQixPQUFPLElBQUksYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDakYsQ0FBQztJQUVELGFBQWE7UUFDVCxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELFNBQVM7UUFDTCxPQUFPLElBQUksYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRUQsZUFBZTtRQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQseUJBQXlCLENBQUMsU0FBeUI7UUFDL0MsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxRQUF3QjtRQUMxQyxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELHNCQUFzQixDQUFDLE1BQXNCO1FBQ3pDLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsU0FBUyxDQUFDLE1BQXdCO1FBQzlCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRCwwQ0FBMEM7SUFDMUMsd0NBQXdDO0lBQ3hDLG1FQUFtRTtJQUNuRSxpRUFBaUU7SUFDakUscURBQXFEO0lBQ3JELGtEQUFrRDtJQUNsRCxJQUFJO0lBQ0osNkNBQTZDO0lBQzdDLHVFQUF1RTtJQUN2RSxxREFBcUQ7SUFDckQsK0VBQStFO0lBQy9FLDJFQUEyRTtJQUMzRSw2RUFBNkU7SUFDN0Usa0RBQWtEO0lBQ2xELElBQUk7SUFDSixZQUFZLENBQUMsS0FBcUIsRUFBRSxJQUFvQixFQUFFLEtBQWE7UUFDbkUsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxpQkFBaUI7UUFDYixNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELGdCQUFnQjtRQUNaLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsNkNBQTZDO0lBQzdDLDBFQUEwRTtJQUMxRSxtRUFBbUU7SUFDbkUsa0RBQWtEO0lBQ2xELElBQUk7SUFDSixzQkFBc0IsQ0FBQyxRQUF3QixFQUFFLFFBQTJCO1FBQ3hFLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsZUFBZSxDQUFDLEtBQWE7UUFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFJRCxrQkFBa0IsQ0FBQyxDQUFVLEVBQUUsQ0FBVyxFQUFFLENBQVc7UUFDbkQsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxjQUFjLENBQUMsUUFBd0I7UUFDbkMsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxlQUFlLENBQUMsTUFBc0I7UUFDbEMsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFLRCxTQUFTLENBQUMsQ0FBVSxFQUFFLENBQVcsRUFBRSxDQUFXLEVBQUUsVUFBb0I7UUFDaEUsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxjQUFjO1FBQ1YsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxlQUFlO1FBQ1gsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDNUQsT0FBTyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELGVBQWUsQ0FBQyxLQUFxQjtRQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELFdBQVc7UUFDUCxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVELGNBQWMsQ0FBQyxLQUFjO1FBQ3pCLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsY0FBYztRQUNWLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsb0JBQW9CO1FBQ2hCLE9BQU8sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFFRCxvQkFBb0IsQ0FBQyxLQUFxQjtRQUN0QyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVELGlCQUFpQjtRQUNiLE9BQU8sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3BGLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxLQUFxQjtRQUNuQyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRCxpQkFBaUI7UUFDYixPQUFPLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtJQUN0RixDQUFDO0lBRUQsaUJBQWlCLENBQUMsS0FBd0I7UUFDdEMsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQsY0FBYztRQUNWLE9BQU8sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNqRixDQUFDO0lBRUQsY0FBYyxDQUFDLEtBQXFCO1FBQ2hDLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRCxjQUFjO1FBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxVQUFVO1FBQ04sSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFBRSxPQUFPLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvRCxPQUFPLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUF1QjtRQUM5QixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQsWUFBWTtRQUNSLElBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ3pELE9BQU8sSUFBSSxtQkFBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQXFCO1FBQzlCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFRCxTQUFTO1FBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxZQUFZO1FBQ1IsT0FBTyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFRCxZQUFZLENBQUMsS0FBd0I7UUFDakMsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVELE1BQU07UUFDRixPQUFPLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFxQjtRQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDL0MsQ0FBQztDQUNKO0FBVVEsc0NBQWE7QUFGdEIsTUFBTSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUM7Ozs7QUNsTmpDLG1DQUF1QztBQUV2QyxNQUFNLGFBQWEsR0FBRyxDQUFDLFNBQXdCLEVBQUUsRUFBRTtJQUMvQyxJQUFJLE9BQU8sU0FBUyxJQUFJLFFBQVE7UUFBRSxTQUFTLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQzVELElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUMsY0FBYyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQy9DLElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUM1QyxJQUFJLENBQUMscUJBQXFCLE1BQU0sQ0FBQyxjQUFjLEVBQUUsTUFBTSxNQUFNLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQzVFLGNBQWMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ2xDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUE7SUFFaEUsT0FBTztBQUNYLENBQUMsQ0FBQTtBQUVEOzs7Ozs7R0FNRztBQUNILE1BQU0sY0FBYyxHQUFHLENBQUMsSUFBbUIsRUFBRSxRQUFnQixDQUFDLEVBQUUsU0FBa0IsS0FBSyxFQUFFLEVBQUU7SUFFdkYsSUFBSSxPQUFPLElBQUksSUFBSSxRQUFRO1FBQUUsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUM3QyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7UUFBRSxPQUFNO0lBRXpCLElBQUksTUFBd0IsQ0FBQTtJQUM1QixJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxZQUFZO1FBQUUsSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxNQUFNLENBQUE7SUFDaEcsTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNuQyxJQUFJLEtBQUssSUFBSSxFQUFFO1FBQUUsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN6QyxlQUFlO0lBQ2YsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ2hDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNoQixJQUFJLEtBQUssSUFBSSxFQUFFO1FBQUUsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUV6QyxXQUFXO0lBQ1gsU0FBUyxRQUFRLENBQUMsV0FBNkI7UUFDM0MscUNBQXFDO1FBQ3JDLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxXQUFXLENBQUMsY0FBYyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUU7WUFDL0QsSUFBSSxlQUFlLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUNqRCxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDLEdBQUcsU0FBUyxDQUFBO1lBQ2xELGtEQUFrRDtZQUNsRCxJQUFJLE1BQU0sR0FBRyxDQUFDLElBQUksTUFBTSxJQUFJLEtBQUs7Z0JBQzdCLElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUNsQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUM7b0JBQ3pCLGVBQWUsQ0FBQyxNQUFNLEdBQUcsS0FBSztvQkFDOUIsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7WUFDbkMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFBO1NBQzVCO0lBQ0wsQ0FBQztJQUVELG1CQUFtQjtJQUNuQixTQUFTLFFBQVEsQ0FBQyxXQUE2QjtRQUMzQyxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFO1lBQ3JDLElBQUk7Z0JBQ0EsSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtvQkFBRSxPQUFPLEtBQUssQ0FBQTtnQkFDN0MsV0FBVyxHQUFHLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQTthQUN6QztZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNSLE9BQU8sS0FBSyxDQUFBO2FBQ2Y7U0FDSjtRQUNELE9BQU8sQ0FBQyxDQUFBO0lBQ1osQ0FBQztBQUNMLENBQUMsQ0FBQTtBQUVELE1BQU0sYUFBYSxHQUFHLENBQUMsU0FBd0IsRUFBRSxTQUFrQixLQUFLLEVBQTZCLEVBQUU7SUFDbkcsSUFBSSxPQUFPLFNBQVMsSUFBSSxRQUFRO1FBQUUsU0FBUyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUM1RCxJQUFJLE1BQU0sRUFBRTtRQUNSLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtLQUM1QjtTQUFNO1FBQ0gsT0FBTyxJQUFJLHFCQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUMsTUFBTSxDQUFBO0tBQzlEO0FBQ0wsQ0FBQyxDQUFBO0FBRUQsVUFBVSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUE7QUFDeEMsVUFBVSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUE7QUFDMUMsVUFBVSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUE7Ozs7QUMzRXhDLGlCQUFjO0FBQ2Qsb0JBQWlCO0FBQ2pCLG1CQUFnQjtBQUNoQix1QkFBb0I7Ozs7Ozs7Ozs7OztBQ0ZwQixtRUFBK0M7QUFFL0MsTUFBTSxZQUFZO0lBR2QsTUFBTSxLQUFLLE9BQU87UUFDZCxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixFQUFFLHVCQUF1QixFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUMvRyxDQUFDO0lBR0QsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsRUFBRSx1QkFBdUIsRUFBRSxZQUFZLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzVILENBQUM7SUFHRCxNQUFNLEtBQUssYUFBYTtRQUNwQixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixFQUFFLHVCQUF1QixFQUFFLGNBQWMsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDakksQ0FBQztJQUdELE1BQU0sS0FBSyx1QkFBdUI7UUFDOUIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsRUFBRSx1QkFBdUIsRUFBRSx3QkFBd0IsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ25KLENBQUM7SUFHRCxNQUFNLEtBQUsscUJBQXFCO1FBQzVCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLEVBQUUsdUJBQXVCLEVBQUUsc0JBQXNCLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3pJLENBQUM7SUFHRCxNQUFNLEtBQUssY0FBYztRQUNyQixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixFQUFFLHVCQUF1QixFQUFFLGVBQWUsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzFJLENBQUM7SUFHRCxNQUFNLEtBQUssZUFBZTtRQUN0QixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixFQUFFLHVCQUF1QixFQUFFLGdCQUFnQixFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3hILENBQUM7SUFHRCxNQUFNLEtBQUssUUFBUTtRQUNmLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUN6SCxDQUFDO0lBR0QsTUFBTSxLQUFLLGNBQWM7UUFDckIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsRUFBRSx1QkFBdUIsRUFBRSxlQUFlLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDdkgsQ0FBQztDQUNKO0FBM0NHO0lBREMsOEJBQUs7aUNBR0w7QUFHRDtJQURDLDhCQUFLO3FDQUdMO0FBR0Q7SUFEQyw4QkFBSzt1Q0FHTDtBQUdEO0lBREMsOEJBQUs7aURBR0w7QUFHRDtJQURDLDhCQUFLOytDQUdMO0FBR0Q7SUFEQyw4QkFBSzt3Q0FHTDtBQUdEO0lBREMsOEJBQUs7eUNBR0w7QUFHRDtJQURDLDhCQUFLO2tDQUdMO0FBR0Q7SUFEQyw4QkFBSzt3Q0FHTDtBQVNMLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQzs7Ozs7QUN6RHBDLG9DQUE2QztBQUU3QyxNQUFNLGFBQWMsU0FBUSx5QkFBaUI7SUFFekMsUUFBUTtRQUNKLE9BQU8sSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDckYsQ0FBQztJQUVELFVBQVUsQ0FBQyxHQUFXO1FBQ2xCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDeEUsQ0FBQztJQUVELFlBQVksQ0FBQyxJQUFpQjtRQUMxQixPQUFPLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFBO0lBQ3RGLENBQUM7SUFFRCxzQkFBc0IsQ0FBQyxDQUFjLEVBQUUsZUFBd0I7UUFDM0QsT0FBTyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUE7SUFDckgsQ0FBQztJQUVELG9CQUFvQixDQUFDLENBQWM7UUFDL0IsT0FBTyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtJQUNsRyxDQUFDO0lBRUQsYUFBYSxDQUFDLElBQWlCLEVBQUUsT0FBWTtRQUN6QyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUMxRSxDQUFDO0lBRUQsY0FBYztRQUNWLE9BQU8sSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtJQUNuRixDQUFDO0lBRUQsT0FBTyxDQUFDLEtBQWE7UUFDakIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtJQUN2RSxDQUFDO0lBRUQsYUFBYTtRQUNULE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUMzRCxDQUFDO0NBQ0o7QUFVUSxzQ0FBYTtBQUZ0QixNQUFNLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQzs7QUMvQ2pDOzs7O0FDQUEsOEJBQTJCO0FBQzNCLDhCQUEyQjtBQUMzQixvQ0FBaUM7QUFDakMsK0JBQTRCO0FBQzVCLDhCQUEyQjtBQUMzQiwrQkFBNEI7QUFFNUIsaUJBQWM7QUFDZCxtQkFBZ0I7QUFDaEIsb0JBQWlCO0FBQ2pCLHVCQUFvQjs7Ozs7Ozs7Ozs7O0FDVnBCLG1FQUErQztBQUUvQyxNQUFNLGFBQWE7SUFHZixNQUFNLEtBQUssT0FBTztRQUNkLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLEVBQUUsd0JBQXdCLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ2hILENBQUM7SUFHRCxNQUFNLEtBQUssT0FBTztRQUNkLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLEVBQUUsd0JBQXdCLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUMzSCxDQUFDO0lBR0QsTUFBTSxLQUFLLE9BQU87UUFDZCxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixFQUFFLHdCQUF3QixFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3RJLENBQUM7SUFHRCxNQUFNLEtBQUssYUFBYTtRQUNwQixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixFQUFFLHdCQUF3QixFQUFFLGNBQWMsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDbEksQ0FBQztJQUdELE1BQU0sS0FBSyxhQUFhO1FBQ3BCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLEVBQUUsd0JBQXdCLEVBQUUsY0FBYyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNsSSxDQUFDO0lBR0QsTUFBTSxLQUFLLHVCQUF1QjtRQUM5QixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixFQUFFLHdCQUF3QixFQUFFLHdCQUF3QixFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDdkosQ0FBQztJQUdELE1BQU0sS0FBSyxxQkFBcUI7UUFDNUIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsRUFBRSx3QkFBd0IsRUFBRSxzQkFBc0IsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDMUksQ0FBQztJQUdELE1BQU0sS0FBSyxzQkFBc0I7UUFDN0IsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsRUFBRSx3QkFBd0IsRUFBRSx1QkFBdUIsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNsTSxDQUFDO0lBSUQsTUFBTSxLQUFLLFlBQVk7UUFDbkIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsRUFBRSx3QkFBd0IsRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUM1SSxDQUFDO0lBR0QsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsRUFBRSx3QkFBd0IsRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQy9ILENBQUM7SUFHRCxNQUFNLEtBQUsscUJBQXFCO1FBQzVCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLEVBQUUsd0JBQXdCLEVBQUUseUJBQXlCLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzdJLENBQUM7SUFHRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixFQUFFLHdCQUF3QixFQUFFLFlBQVksRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDaEksQ0FBQztJQUdELE1BQU0sS0FBSyxjQUFjO1FBQ3JCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLEVBQUUsd0JBQXdCLEVBQUUsZUFBZSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3hILENBQUM7SUFHRCxNQUFNLEtBQUssUUFBUTtRQUNmLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLEVBQUUsd0JBQXdCLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ2xILENBQUM7SUFHRCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixFQUFFLHdCQUF3QixFQUFFLFdBQVcsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNwSCxDQUFDO0lBR0QsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsRUFBRSx3QkFBd0IsRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQy9ILENBQUM7SUFHRCxNQUFNLEtBQUssZUFBZTtRQUN0QixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixFQUFFLHdCQUF3QixFQUFFLGdCQUFnQixFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3pILENBQUM7SUFHRCxNQUFNLEtBQUssZUFBZTtRQUN0QixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixFQUFFLHdCQUF3QixFQUFFLGdCQUFnQixFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3RILENBQUM7SUFHRCxNQUFNLEtBQUssS0FBSztRQUNaLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQy9HLENBQUM7SUFHRCxNQUFNLEtBQUsseUJBQXlCO1FBQ2hDLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLEVBQUUsd0JBQXdCLEVBQUUsd0JBQXdCLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDakksQ0FBQztJQUdELE1BQU0sS0FBSyxzQkFBc0I7UUFDN0IsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsRUFBRSx3QkFBd0IsRUFBRSx1QkFBdUIsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNoSSxDQUFDO0lBR0QsTUFBTSxLQUFLLFlBQVk7UUFDbkIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsRUFBRSx3QkFBd0IsRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDdEgsQ0FBQztDQUNKO0FBN0dHO0lBREMsOEJBQUs7a0NBR0w7QUFHRDtJQURDLDhCQUFLO2tDQUdMO0FBR0Q7SUFEQyw4QkFBSztrQ0FHTDtBQUdEO0lBREMsOEJBQUs7d0NBR0w7QUFHRDtJQURDLDhCQUFLO3dDQUdMO0FBR0Q7SUFEQyw4QkFBSztrREFHTDtBQUdEO0lBREMsOEJBQUs7Z0RBR0w7QUFHRDtJQURDLDhCQUFLO2lEQUdMO0FBSUQ7SUFEQyw4QkFBSzt1Q0FHTDtBQUdEO0lBREMsOEJBQUs7cUNBR0w7QUFHRDtJQURDLDhCQUFLO2dEQUdMO0FBR0Q7SUFEQyw4QkFBSztzQ0FHTDtBQUdEO0lBREMsOEJBQUs7eUNBR0w7QUFHRDtJQURDLDhCQUFLO21DQUdMO0FBR0Q7SUFEQyw4QkFBSztxQ0FHTDtBQUdEO0lBREMsOEJBQUs7cUNBR0w7QUFHRDtJQURDLDhCQUFLOzBDQUdMO0FBR0Q7SUFEQyw4QkFBSzswQ0FHTDtBQUdEO0lBREMsOEJBQUs7Z0NBR0w7QUFHRDtJQURDLDhCQUFLO29EQUdMO0FBR0Q7SUFEQyw4QkFBSztpREFHTDtBQUdEO0lBREMsOEJBQUs7dUNBR0w7QUFTTCxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxhQUFhLENBQUM7Ozs7QUMxSHRDLG9DQUE0QztBQUU1QyxNQUFNLGNBQWUsU0FBUSx5QkFBaUI7SUFFMUMsWUFBWSxNQUFxQjtRQUM3QixLQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDakIsQ0FBQztJQUVELE1BQU07UUFDRixPQUFPLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUMxRSxDQUFDO0lBRUQsTUFBTSxDQUFDLElBQVk7UUFDZixPQUFPLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDM0YsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFZLEVBQUUsSUFBbUI7UUFDcEMsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDekQsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQ3hGLENBQUM7SUFFRCxZQUFZLENBQUMsYUFBMEI7UUFDbkMsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQTtJQUMxRSxDQUFDO0lBRUQsWUFBWSxDQUFDLElBQWlCO1FBQzFCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDakUsQ0FBQztJQUVELHNCQUFzQixDQUFDLElBQWlCLEVBQUUsZUFBd0I7UUFDOUQsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLGVBQW9DLENBQUMsQ0FBQyxDQUFBO0lBQzdILENBQUM7SUFFRCxvQkFBb0IsQ0FBQyxJQUFpQixFQUFFLGVBQXdCO1FBQzVELE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxlQUFvQyxDQUFDLENBQUMsQ0FBQTtJQUMzSCxDQUFDO0lBRUQscUJBQXFCLENBQUMsSUFBaUIsRUFBRSw4QkFBdUMsRUFBRSxTQUFrQixFQUFFLGVBQXdCLEVBQUUsT0FBZ0IsRUFBRSxVQUFlO1FBQzdKLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUN4RSxHQUFHLENBQUMsOEJBQW1ELENBQUMsRUFDeEQsR0FBRyxDQUFDLFNBQThCLENBQUMsRUFDbkMsR0FBRyxDQUFDLGVBQW9DLENBQUMsRUFDekMsR0FBRyxDQUFDLE9BQTRCLENBQUMsRUFDakMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUE7SUFDeEIsQ0FBQztJQUVELFdBQVcsQ0FBQyxVQUFrQixFQUFFLE9BQXVCO1FBQ25ELE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQzFGLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBYztRQUNwQixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxLQUEwQixDQUFDLENBQUMsQ0FBQTtJQUN6RixDQUFDO0lBRUQsb0JBQW9CLENBQUMsSUFBaUIsRUFBRSx5QkFBd0M7UUFDNUUsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSx5QkFBeUIsQ0FBQyxDQUFBO0lBQ3BHLENBQUM7SUFFRCxVQUFVLENBQUMsR0FBVztRQUNsQixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ3pFLENBQUM7SUFFRCxhQUFhO1FBQ1QsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUE7UUFDaEYsT0FBTyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO0lBQ2xGLENBQUM7SUFFRCxPQUFPO1FBQ0gsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3RELENBQUM7SUFFRCxTQUFTLENBQUMsS0FBYTtRQUNuQixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0lBQ3BFLENBQUM7SUFFRCxTQUFTO1FBQ0wsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3hELENBQUM7SUFFRCxjQUFjO1FBQ1YsT0FBTyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO0lBQ3BGLENBQUM7SUFFRCxjQUFjO1FBQ1YsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQzdELENBQUM7SUFFRCxxQkFBcUI7UUFDakIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQzdELENBQUM7SUFFRCxxREFBcUQ7SUFDckQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFZO1FBQ3BCLE9BQU8sSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQzlFLENBQUM7SUFFRCx3RUFBd0U7SUFDeEUsTUFBTSxDQUFDLHdCQUF3QixDQUFDLEdBQVc7UUFDdkMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMseUJBQXlCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQW1DLENBQUE7SUFDbkksQ0FBQztJQUVELHFFQUFxRTtJQUNyRSxNQUFNLENBQUMscUJBQXFCLENBQUMsR0FBVztRQUNwQyxPQUFPLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQzlGLENBQUM7SUFFRCxtREFBbUQ7SUFDbkQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFXO1FBQzFCLE9BQU8sSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3BGLENBQUM7Q0FDSjtBQVFELE1BQU0sQ0FBQyxVQUFVLEdBQUcsY0FBYyxDQUFDOzs7OztBQ3RIbkMsTUFBTSxhQUFhLEdBQUcsQ0FBQyxlQUF1QixDQUFDLEVBQUUsRUFBRTtJQUMvQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBVyxFQUFFLEdBQWdCLEVBQUUsRUFBRTtRQUNsRSxJQUFJLFVBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDL0MsSUFBSSxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7WUFBRSxPQUFNO1FBQzNELElBQUksWUFBWSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksWUFBWSxFQUFFO1lBQ3hELElBQUksTUFBTSxHQUFHLGdDQUFnQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxVQUFVLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUMzSCxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtZQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDWixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNoQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDMUI7SUFDTCxDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQTtBQUVELFNBQVMsY0FBYyxDQUFDLElBQW1CO0lBQ3ZDLElBQUksT0FBTyxJQUFJLElBQUksUUFBUTtRQUFFLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDN0MsSUFBSSxVQUE2QixDQUFBO0lBQ2pDLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLFlBQVksRUFBRTtRQUNuQyxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0tBQzNDO1NBQU0sSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksZUFBZSxFQUFFO1FBQzdDLFVBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUE7S0FDM0Q7U0FBTTtRQUNILE1BQU0sSUFBSSxLQUFLLENBQUMscURBQXFELENBQUMsQ0FBQTtLQUN6RTtJQUNELElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFBO0lBQ3RDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDN0MsSUFBSSxDQUFDLG1CQUFtQixHQUFHLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO0lBQ2pELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQTtJQUNqRCxJQUFJLFdBQVcsR0FBRyxVQUFVLENBQUMsYUFBYSxFQUFFLENBQUE7SUFDNUMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNqRCxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUE7SUFDbkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN6QixJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQUUsTUFBSztRQUN0QyxJQUFJLE9BQU8sR0FBRyxXQUFXLENBQUMsY0FBYyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDckQsSUFBSSxNQUFNLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQTtRQUMvQixJQUFJLEdBQUcsR0FBRyxVQUFVLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQTtRQUMxQyxVQUFVLEdBQUcsVUFBVSxHQUFHLEdBQUcsR0FBRyxPQUFPLEdBQUcsR0FBRyxHQUFHLE1BQU0sR0FBRyxHQUFHLENBQUE7UUFDNUQsV0FBVyxHQUFHLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtLQUN6QztJQUNELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxVQUFVLENBQUMsQ0FBQTtBQUMxQyxDQUFDO0FBVVEsd0NBQWM7QUFSdkIsVUFBVSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUE7QUFDeEMsVUFBVSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUE7Ozs7QUMzQzFDLGlCQUFjO0FBQ2QsbUJBQWdCO0FBQ2hCLG9CQUFpQjtBQUNqQix1QkFBb0I7Ozs7QUNIcEI7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7Ozs7Ozs7Ozs7O0FDQ0EsbUVBQStDO0FBRS9DLE1BQU0sWUFBWTtJQUVkLE1BQU0sS0FBSyxPQUFPO1FBQ2QsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsRUFBRSxvQkFBb0IsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDNUcsQ0FBQztJQUdELE1BQU0sS0FBSyxZQUFZO1FBQ25CLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLEVBQUUsb0JBQW9CLEVBQUUsYUFBYSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ2hILENBQUM7SUFHRCxNQUFNLEtBQUssY0FBYztRQUNyQixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixFQUFFLG9CQUFvQixFQUFFLGVBQWUsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNsSCxDQUFDO0lBRUQsTUFBTSxLQUFLLFNBQVM7UUFDaEIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsRUFBRSxvQkFBb0IsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDL0csQ0FBQztJQUVELE1BQU0sS0FBSyxTQUFTO1FBQ2hCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLEVBQUUsb0JBQW9CLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUN2SCxDQUFDO0lBRUQsTUFBTSxLQUFLLFNBQVM7UUFDaEIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsRUFBRSxvQkFBb0IsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDL0csQ0FBQztJQUdELE1BQU0sS0FBSyxPQUFPO1FBQ2QsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsRUFBRSxvQkFBb0IsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDMUcsQ0FBQztJQUVELG1CQUFtQjtJQUduQixNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixFQUFFLG9CQUFvQixFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUMzRyxDQUFDO0lBR0QsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsRUFBRSxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3BILENBQUM7SUFHRCxNQUFNLEtBQUssaUJBQWlCO1FBQ3hCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLEVBQUUsb0JBQW9CLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDcEgsQ0FBQztDQUNKO0FBL0NHO0lBREMsOEJBQUs7aUNBR0w7QUFHRDtJQURDLDhCQUFLO3NDQUdMO0FBR0Q7SUFEQyw4QkFBSzt3Q0FHTDtBQUVEO0lBREMsOEJBQUs7bUNBR0w7QUFFRDtJQURDLDhCQUFLO21DQUdMO0FBRUQ7SUFEQyw4QkFBSzttQ0FHTDtBQUdEO0lBREMsOEJBQUs7aUNBR0w7QUFLRDtJQURDLDhCQUFLO29DQUdMO0FBR0Q7SUFEQyw4QkFBSztvQ0FHTDtBQUdEO0lBREMsOEJBQUs7MkNBR0w7QUFjSSxvQ0FBWTtBQUZyQixNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUM7Ozs7O0FDN0RwQyxNQUFNLGlCQUFrQixTQUFRLE1BQU0sQ0FBQyxNQUFNO0lBRXpDLElBQUk7UUFDQSxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQXdCO1FBQzNCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCxXQUFXO1FBQ1AsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxhQUFhO1FBQ1QsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxRQUFRLENBQUMsS0FBYTtRQUNsQixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQXNCO1FBQ25DLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQXNCLEVBQUUsQ0FBUztRQUM5QyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFzQjtRQUMxQyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7Q0FDSjtBQUVELE1BQU0saUJBQWtCLFNBQVEsaUJBQWlCO0NBRWhEO0FBRVEsOENBQWlCOzs7O0FDakQxQixpQkFBYztBQUNkLG1CQUFnQjtBQUNoQix1QkFBb0I7QUFFcEIsaUNBQThCO0FBQzlCLDRCQUF5QjtBQUN6QiwrQkFBNEI7QUFDNUIsZ0NBQTZCO0FBQzdCLDhCQUEyQjtBQUMzQiwwQkFBdUI7QUFDdkIsNkJBQTBCO0FBQzFCLDRCQUF5QjtBQUN6Qiw0QkFBeUI7Ozs7QUNaekI7O0FDQUE7Ozs7QUNHQSxNQUFNLDRCQUE0QjtDQU9qQztBQVFELFFBQVEsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsNEJBQTRCLENBQUM7Ozs7O0FDakI5RCxvQ0FBdUQ7QUFDdkQsdUJBQW9CO0FBRXBCLE1BQU0sc0NBQXVDLFNBQVEsbUNBQTJCO0NBRy9FO0FBYVEsd0ZBQXNDO0FBRi9DLFFBQVEsQ0FBQyxpQkFBaUIsR0FBRyxzQ0FBc0MsQ0FBQzs7OztBQ2xCcEUsaUJBQWM7QUFDZCxtQkFBZ0I7QUFDaEIsdUJBQW9COzs7Ozs7Ozs7Ozs7QUNEcEIsbUVBQStDO0FBRS9DLE1BQU0sc0JBQXNCO0lBR3hCLE1BQU0sS0FBSywwQkFBMEI7UUFDakMsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsb0JBQW9CLEVBQUUsMkJBQTJCLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDbEgsQ0FBQztJQUdELE1BQU0sS0FBSyxhQUFhO1FBQ3BCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLG9CQUFvQixFQUFFLGNBQWMsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNyRyxDQUFDO0lBR0QsTUFBTSxLQUFLLGtCQUFrQjtRQUN6QixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxvQkFBb0IsRUFBRSxtQkFBbUIsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUMxRyxDQUFDO0lBR0QsTUFBTSxLQUFLLGFBQWE7UUFDcEIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsb0JBQW9CLEVBQUUsY0FBYyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3JHLENBQUM7SUFHRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxvQkFBb0IsRUFBRSxZQUFZLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDaEcsQ0FBQztJQUdELE1BQU0sS0FBSyx1QkFBdUI7UUFDOUIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsb0JBQW9CLEVBQUUsd0JBQXdCLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDNUcsQ0FBQztJQUdELE1BQU0sS0FBSyxrQkFBa0I7UUFDekIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsb0JBQW9CLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDdkcsQ0FBQztJQUdELE1BQU0sS0FBSyxTQUFTO1FBQ2hCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLG9CQUFvQixFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNqRyxDQUFDO0lBR0QsTUFBTSxLQUFLLGNBQWM7UUFDckIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsb0JBQW9CLEVBQUUsZUFBZSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3RHLENBQUM7SUFHRCxNQUFNLEtBQUssa0JBQWtCO1FBQ3pCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLG9CQUFvQixFQUFFLG1CQUFtQixFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzFHLENBQUM7SUFHRCxNQUFNLEtBQUssZUFBZTtRQUN0QixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxvQkFBb0IsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUN2RyxDQUFDO0lBR0QsTUFBTSxLQUFLLHlCQUF5QjtRQUNoQyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxvQkFBb0IsRUFBRSwwQkFBMEIsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNqSCxDQUFDO0NBQ0o7QUExREc7SUFEQyw4QkFBSzs4REFHTDtBQUdEO0lBREMsOEJBQUs7aURBR0w7QUFHRDtJQURDLDhCQUFLO3NEQUdMO0FBR0Q7SUFEQyw4QkFBSztpREFHTDtBQUdEO0lBREMsOEJBQUs7K0NBR0w7QUFHRDtJQURDLDhCQUFLOzJEQUdMO0FBR0Q7SUFEQyw4QkFBSztzREFHTDtBQUdEO0lBREMsOEJBQUs7NkNBR0w7QUFHRDtJQURDLDhCQUFLO2tEQUdMO0FBR0Q7SUFEQyw4QkFBSztzREFHTDtBQUdEO0lBREMsOEJBQUs7bURBR0w7QUFHRDtJQURDLDhCQUFLOzZEQUdMO0FBU0wsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsc0JBQXNCLENBQUM7Ozs7O0FDdEVsRCxzREFBb0Y7QUFDcEYseUNBQTBEO0FBQzFELHVCQUFvQjtBQUVwQixNQUFNLGdDQUFpQyxTQUFRLGlDQUF5QjtJQUVwRSx5QkFBeUI7UUFDckIsT0FBTyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUVELFlBQVk7UUFDUixPQUFPLElBQUksaUNBQXlCLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFFRCxpQkFBaUI7UUFDYixPQUFPLElBQUksaUNBQXlCLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDbkcsQ0FBQztJQUVELFlBQVk7UUFDUixPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVELFVBQVU7UUFDTixPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELHNCQUFzQjtRQUNsQixPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQsaUJBQWlCO1FBQ2IsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELGFBQWE7UUFDVCxPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVELGlCQUFpQjtRQUNiLE9BQU8sSUFBSSxpQ0FBeUIsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNuRyxDQUFDO0lBRUQsY0FBYztRQUNWLE9BQU8sSUFBSSw4Q0FBc0MsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDN0csQ0FBQztJQUVELHdCQUF3QjtRQUNwQixPQUFPLElBQUksaUNBQXlCLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDMUcsQ0FBQztDQUNKO0FBV1EsNEVBQWdDO0FBRnpDLFFBQVEsQ0FBQyxXQUFXLEdBQUcsZ0NBQWdDLENBQUM7Ozs7QUNoRXhELGlCQUFjO0FBQ2QsbUJBQWdCO0FBQ2hCLHVCQUFvQjs7OztBQ0ZwQjs7Ozs7Ozs7OztBQ0NBLG1FQUErQztBQUUvQyxNQUFNLGVBQWU7SUFHakIsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUN0SCxDQUFDO0lBR0QsTUFBTSxLQUFLLFlBQVk7UUFDbkIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNqSCxDQUFDO0lBR0QsTUFBTSxLQUFLLGFBQWE7UUFDcEIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUMxRixDQUFDO0lBR0QsTUFBTSxLQUFLLGVBQWU7UUFDdEIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzlILENBQUM7SUFHRCxNQUFNLEtBQUssWUFBWTtRQUNuQixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzdGLENBQUM7SUFHRCxNQUFNLEtBQUssYUFBYTtRQUNwQixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFHRCxNQUFNLEtBQUssWUFBWTtRQUNuQixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3pGLENBQUM7SUFHRCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3pGLENBQUM7SUFHRCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNwRyxDQUFDO0lBR0QsTUFBTSxLQUFLLFNBQVM7UUFDaEIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUMxRixDQUFDO0NBQ0o7QUFoREc7SUFEQyw4QkFBSzt3Q0FHTDtBQUdEO0lBREMsOEJBQUs7eUNBR0w7QUFHRDtJQURDLDhCQUFLOzBDQUdMO0FBR0Q7SUFEQyw4QkFBSzs0Q0FHTDtBQUdEO0lBREMsOEJBQUs7eUNBR0w7QUFHRDtJQURDLDhCQUFLOzBDQUdMO0FBR0Q7SUFEQyw4QkFBSzt5Q0FHTDtBQUdEO0lBREMsOEJBQUs7dUNBR0w7QUFHRDtJQURDLDhCQUFLO3VDQUdMO0FBR0Q7SUFEQyw4QkFBSztzQ0FHTDtBQVNMLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLGVBQWUsQ0FBQzs7Ozs7QUM5RHBDLG9DQUF1RDtBQUV2RCxNQUFNLHlCQUEwQixTQUFRLG1DQUEyQjtJQUUvRCxVQUFVLENBQUMsR0FBUTtRQUNmLE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELFdBQVcsQ0FBQyxJQUErQjtRQUN2QyxPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQsWUFBWTtRQUNSLE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNsRSxDQUFDO0lBRUQsY0FBYyxDQUFDLEtBQWtDO1FBQzdDLE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRCxXQUFXLENBQUMsR0FBUTtRQUNoQixPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRCxZQUFZO1FBQ1IsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCxXQUFXO1FBQ1AsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pFLENBQUM7SUFFRCxTQUFTO1FBQ0wsT0FBTyxJQUFJLHlCQUF5QixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBRUQsU0FBUyxDQUFDLFFBQWdCO1FBQ3RCLE9BQU8sSUFBSSx5QkFBeUIsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxJQUFJLElBQUk7UUFDSixPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUMsQ0FBQztDQUVKO0FBVVEsOERBQXlCO0FBRmxDLFFBQVEsQ0FBQyxJQUFJLEdBQUcseUJBQXlCLENBQUM7Ozs7QUN4RDFDLGlCQUFjO0FBQ2QsbUJBQWdCO0FBQ2hCLHVCQUFvQjs7Ozs7Ozs7Ozs7OztBQ0RwQix1Q0FBMEQ7QUFDMUQsb0JBQWlCO0FBQ2pCLG1CQUFnQjtBQUNoQix1QkFBb0I7QUFDcEIsbUVBQStDO0FBRS9DLE1BQU0sUUFBUyxTQUFRLG1DQUEyQjtJQUc5QyxNQUFNLEtBQUssT0FBTztRQUNkLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLEVBQUUsbUJBQW1CLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzVJLENBQUM7SUFHRCxNQUFNLEtBQUssT0FBTztRQUNkLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLEVBQUUsbUJBQW1CLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUN2SixDQUFDO0lBR0QsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDdkksQ0FBQztJQUdELE1BQU0sS0FBSyxhQUFhO1FBQ3BCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDM0ksQ0FBQztJQUdELE1BQU0sS0FBSyxZQUFZO1FBQ25CLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLEVBQUUsbUJBQW1CLEVBQUUsYUFBYSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ2hILENBQUM7SUFHRCxNQUFNLEtBQUssU0FBUztRQUNoQixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixFQUFFLG1CQUFtQixFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUM5RyxDQUFDO0lBR0QsTUFBTSxLQUFLLDZCQUE2QjtRQUNwQyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixFQUFFLG1CQUFtQixFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3BJLENBQUM7Q0FDSjtBQWpDRztJQURDLDhCQUFLOzZCQUdMO0FBR0Q7SUFEQyw4QkFBSzs2QkFHTDtBQUdEO0lBREMsOEJBQUs7aUNBR0w7QUFHRDtJQURDLDhCQUFLO21DQUdMO0FBR0Q7SUFEQyw4QkFBSztrQ0FHTDtBQUdEO0lBREMsOEJBQUs7K0JBR0w7QUFHRDtJQURDLDhCQUFLO21EQUdMO0FBV0ksNEJBQVE7QUFGakIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDOzs7OztBQ25ENUIsb0NBQXFEO0FBQ3JELCtCQUFpQztBQUVqQyxNQUFNLFNBQVUsU0FBUSxpQ0FBeUI7SUFDN0MsQ0FBQyxDQUFRO0lBQ1QsQ0FBQyxDQUFRO0lBQ1QsQ0FBQyxDQUFRO0lBQ1QsQ0FBQyxDQUFRO0lBRVQsWUFBWSxJQUFtQjtRQUMzQixLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUN0QixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDN0IsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBQzlCLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtJQUNsQyxDQUFDO0lBRUQsTUFBTSxDQUFDLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUztRQUNsQyxPQUFPLElBQUksU0FBUyxDQUFDLGNBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUNELE1BQU0sQ0FBQyxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTO1FBQzdDLE9BQU8sSUFBSSxTQUFTLENBQUMsY0FBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUNELFVBQVUsQ0FBQyxHQUFRO1FBQ2YsT0FBTyxjQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUNELFlBQVksQ0FBQyxLQUFnQjtRQUN6QixPQUFPLGNBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUNELFdBQVc7UUFDUCxPQUFPLGNBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFDRCxRQUFRO1FBQ0osT0FBTyxPQUFPLENBQUMsY0FBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBQ0QsNEJBQTRCLENBQUMsTUFBYyxFQUFFLFFBQWE7UUFDdEQsT0FBTyxPQUFPLENBQUMsY0FBUSxDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDMUYsQ0FBQztDQUNKO0FBVVEsOEJBQVM7QUFGbEIsTUFBTSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7O0FDOUN6Qjs7Ozs7OztBQ0FBLG9DQUFxRDtBQUVyRCxNQUFNLFdBQVksU0FBUSxpQ0FBeUI7SUFFL0MsQ0FBQyxDQUFTO0lBQ1YsQ0FBQyxDQUFTO0lBQ1YsQ0FBQyxDQUFTO0lBRUYsVUFBVSxHQUFXLENBQUMsQ0FBQztJQUUvQixZQUFZLE1BQXFCLEVBQUUsV0FBbUIsQ0FBQztRQUNuRCxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDZCxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQTtRQUMxQixJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2xELElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzFELENBQUM7SUFFRCxJQUFJLFFBQVEsQ0FBQyxLQUFhO1FBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBQzVCLENBQUM7SUFFRCxHQUFHLENBQUMsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTO1FBQy9CLElBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakQsT0FBTyxJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsUUFBUTtRQUNKLE9BQU8sV0FBVyxJQUFJLENBQUMsTUFBTSxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUM7SUFDcEosQ0FBQztDQUNKO0FBVVEsa0NBQVc7QUFGcEIsTUFBTSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7Ozs7O0FDekM3QixvQ0FBdUQ7QUFHdkQsTUFBTSx5QkFBMEIsU0FBUSxtQ0FBMkI7Q0FFbEU7QUFFUSw4REFBeUI7Ozs7Ozs7Ozs7QUNObEMsbUVBQStDO0FBRS9DLE1BQU0sY0FBYztJQUVoQixNQUFNLEtBQUssT0FBTztRQUNkLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDekYsQ0FBQztJQUdELE1BQU0sS0FBSyxTQUFTO1FBQ2hCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDNUYsQ0FBQztJQUdELE1BQU0sS0FBSyxRQUFRO1FBQ2YsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUMzRixDQUFDO0lBR0QsTUFBTSxLQUFLLFNBQVM7UUFDaEIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUM1RixDQUFDO0lBR0QsTUFBTSxLQUFLLFlBQVk7UUFDbkIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUMvRixDQUFDO0lBRUQscUNBQXFDO0lBRXJDLE1BQU0sS0FBSyxTQUFTO1FBQ2hCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3JHLENBQUM7SUFHRCxNQUFNLEtBQUssU0FBUztRQUNoQixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDaEgsQ0FBQztDQUNKO0FBbENHO0lBREMsOEJBQUs7bUNBR0w7QUFHRDtJQURDLDhCQUFLO3FDQUdMO0FBR0Q7SUFEQyw4QkFBSztvQ0FHTDtBQUdEO0lBREMsOEJBQUs7cUNBR0w7QUFHRDtJQURDLDhCQUFLO3dDQUdMO0FBSUQ7SUFEQyw4QkFBSztxQ0FHTDtBQUdEO0lBREMsOEJBQUs7cUNBR0w7QUFjTCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUU7Q0FBUyxDQUFDLENBQUM7QUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFO0NBQVMsQ0FBQyxDQUFDO0FBRXhDLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQzs7Ozs7QUN0RDFDLHVCQUFvQjtBQUVwQiw0QkFBNEI7QUFDNUIsTUFBTSwyQkFBMkI7SUFFN0IsTUFBTSxDQUFnQjtJQUN0QixZQUFZLGVBQThCO1FBQ3RDLElBQUksQ0FBQyxNQUFNLEdBQUcsZUFBZSxDQUFDO0lBQ2xDLENBQUM7SUFFRCxJQUFJO1FBQ0EsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELGVBQWU7UUFDWCxNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELE9BQU87UUFDSCxPQUFPLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELFdBQVc7UUFDUCxPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUQsQ0FBQztDQUNKO0FBNENRLGtFQUEyQjtBQTFDcEMsTUFBTSxZQUFZLEdBQUcsQ0FBQyxJQUFtQixFQUFpQixFQUFFO0lBQ3hELElBQUksT0FBTyxJQUFJLElBQUksUUFBUTtRQUFFLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDN0MsT0FBTyxJQUFJLDJCQUEyQixDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQzNELENBQUMsQ0FBQTtBQUVELE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxJQUFtQixFQUFVLEVBQUU7SUFDckQsT0FBTyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ25DLENBQUMsQ0FBQTtBQUVELE1BQU0scUJBQXFCLEdBQUcsQ0FBQyxJQUFtQixFQUFFLEVBQUU7SUFDbEQsSUFBSSxNQUFNLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQTtJQUN0QyxJQUFJLENBQUMsYUFBYSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQzVCLElBQUksQ0FBQyxXQUFXLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkQsSUFBSSxRQUFRLEdBQUcsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQztJQUMxRSxJQUFJLFVBQVUsR0FBa0IsTUFBTSxDQUFDO0lBQ3ZDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDekIsSUFBSSxRQUFRLEdBQUcsSUFBSSxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQy9ELElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQUUsTUFBTTtRQUM5QyxVQUFVLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUM3QixJQUFJLFFBQVEsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQUUsTUFBTTtRQUNqRSxRQUFRLElBQUksU0FBUyxRQUFRLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQTtLQUM1RDtJQUNELElBQUksQ0FBQyxHQUFHLFFBQVEsSUFBSSxDQUFDLENBQUM7QUFDMUIsQ0FBQyxDQUFBO0FBYUQsUUFBUSxDQUFDLE1BQU0sR0FBRywyQkFBMkIsQ0FBQztBQUU5QyxVQUFVLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQTtBQUNqQyxVQUFVLENBQUMsV0FBVyxHQUFHLGdCQUFnQixDQUFBO0FBQ3pDLFVBQVUsQ0FBQyxRQUFRLEdBQUcscUJBQXFCLENBQUE7Ozs7QUM1RTNDLGlCQUFjO0FBQ2QsbUJBQWdCO0FBQ2hCLHVCQUFvQjtBQUVwQix5QkFBc0I7QUFDdEIsNEJBQXlCO0FBQ3pCLDJCQUF3QjtBQUN4Qiw2QkFBMEI7QUFDMUIsK0JBQTRCO0FBQzVCLDJCQUF3QjtBQUN4QiwwQkFBdUI7QUFDdkIsaUNBQThCO0FBQzlCLHVDQUFvQzs7Ozs7O0FDWnBDLG9CQUFpQjs7OztBQ0FqQixNQUFNLG1CQUFtQixHQUFHLEdBQUcsRUFBRTtJQUM3QixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3pDLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtRQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDaEQsQ0FBQyxDQUFBO0FBRUQsTUFBTSxtQkFBbUIsR0FBRyxHQUFHLEVBQUU7SUFDN0IsSUFBSSxZQUFZLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMvQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRTtRQUFFLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUN6RSxDQUFDLENBQUE7QUFFRCxVQUFVLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUM7QUFDckQsVUFBVSxDQUFDLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDOzs7O0FDWHJELGtDQUErQjs7QUNBL0I7Ozs7QUNBQSwrQkFBNEI7QUFFNUIsc0JBQW1CO0FBQ25CLHNCQUFtQjtBQUVuQiw0QkFBeUI7QUFFekIsdUJBQW9CO0FBQ3BCLDBCQUF1QjtBQUN2Qix1QkFBb0I7QUFDcEIseUJBQXNCO0FBQ3RCLHVCQUFvQjtBQUVwQixrQ0FBK0I7QUFDL0IsK0JBQTRCO0FBQzVCLG9DQUFpQztBQUNqQyxxQ0FBa0M7QUFFbEMsdUJBQW9CO0FBRXBCLGtDQUErQjtBQUMvQixtQ0FBZ0M7QUFDaEMsbUNBQWdDO0FBRWhDLDRCQUF5QjtBQUV6Qiw0QkFBeUI7QUFFekIsb0JBQWlCOzs7OztBQzNCakIscUJBQWtCO0FBR2xCLG1EQUFtRDtBQUVuRCxTQUFnQixJQUFJO0FBRXBCLENBQUM7QUFGRCxvQkFFQztBQUtELFVBQVUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBOzs7OztBQ2J0Qix1Q0FBdUM7QUFFdkM7O0dBRUc7QUFDSCxTQUFTLFVBQVU7SUFDZixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtRQUNkLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsZUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBRS9CLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLHFCQUFxQixFQUFFLENBQUE7UUFDakcsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUNyRiw2Q0FBNkM7UUFDN0MsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUE7UUFFM0MsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUE7UUFDckMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUN4RCxHQUFHLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxHQUFHLFFBQVEsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxXQUFXLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxlQUFRLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDbEksSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUE7UUFDL0IsR0FBRyxDQUFDLHNCQUFzQixHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLGVBQWUsR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLGVBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUVoSCxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsY0FBYyxFQUFFLENBQUE7UUFDMUMsR0FBRyxDQUFDLGtCQUFrQixHQUFHLFdBQVcsRUFBRSxlQUFRLENBQUMsR0FBRyxDQUFDLENBQUE7UUFFbkQsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUE7UUFDdkMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUE7UUFDdkMsSUFBSSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUE7UUFDM0UsR0FBRyxDQUFDLG9CQUFvQixHQUFHLE9BQU8sR0FBRyxLQUFLLEdBQUcsT0FBTyxHQUFHLHdCQUF3QixHQUFHLGdCQUFnQixHQUFHLEdBQUcsRUFBRSxlQUFRLENBQUMsR0FBRyxDQUFDLENBQUE7UUFFdkgsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUM3RSxHQUFHLENBQUMsa0JBQWtCLEdBQUcsT0FBTyxHQUFHLEtBQUssR0FBRyxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sRUFBRSxlQUFRLENBQUMsR0FBRyxDQUFDLENBQUE7UUFFckcsR0FBRyxDQUFDLDhCQUE4QixHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxjQUFjLEVBQUUsRUFBRSxlQUFRLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDN0csR0FBRyxDQUFDLG9CQUFvQixHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUUsZUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBRWpHLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFBO1FBQ3pDLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFBO1FBQ3BDLEdBQUcsQ0FBQyxtQkFBbUIsR0FBRyxXQUFXLEdBQUcsVUFBVSxHQUFHLFVBQVUsRUFBRSxHQUFHLFVBQVUsR0FBRyxRQUFRLEVBQUUsZUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBRXhHLDhDQUE4QztRQUM5QyxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFBO1FBQzdFLElBQUksU0FBUyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtRQUN2RCxHQUFHLENBQUMsMkJBQTJCLEdBQUcsU0FBUyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUM7WUFDekQsa0JBQWtCLEdBQUcsU0FBUyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUM7WUFDbEQsb0JBQW9CLEdBQUcsU0FBUyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsRUFBRSxlQUFRLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDekUsR0FBRyxDQUFDLHVCQUF1QixHQUFHLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLGVBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUMxRSxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLGVBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUVuQyxDQUFDLENBQUMsQ0FBQTtJQUVGLFNBQVMsV0FBVyxDQUFDLEdBQVc7UUFDNUIscURBQXFEO1FBQ3JELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLHFCQUFxQixFQUFFLENBQUE7UUFDakcsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFBO1FBQ2xHLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFBO1FBQ3JDLElBQUksSUFBSSxJQUFJLFFBQVEsRUFBRTtZQUNsQix3RUFBd0U7WUFDeEUsNEJBQTRCO1lBQzVCLE9BQU8sUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtTQUNqQztRQUNELE9BQU8sS0FBSyxDQUFBO0lBQ2hCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsU0FBUyxTQUFTLENBQUMsZ0JBQXFCLEVBQUUsU0FBaUI7UUFDdkQsTUFBTSxTQUFTLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUNyRixJQUFJLGtCQUFrQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDdkYsa0JBQWtCLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUE7UUFDM0MsSUFBSSxXQUFXLEdBQUcsa0JBQWtCLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDN0MsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFBO1FBQ3BCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDL0IsSUFBSSxRQUFRLEdBQUcsU0FBUyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDekUsSUFBSSxDQUFDLElBQUksUUFBUTtnQkFBRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7WUFDeEUsSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ3RCLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDM0MsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUE7U0FDMUM7SUFDTCxDQUFDO0lBRUQsU0FBUyxVQUFVLENBQUMsT0FBMkIsU0FBUztRQUNwRCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7UUFDZixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLHFCQUFxQixFQUFFLENBQUE7WUFDakcsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixFQUFFLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFBO1lBQ2pFLE1BQU0sR0FBRyxPQUFPLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUM1RCxDQUFDLENBQUMsQ0FBQTtRQUNGLE9BQU8sTUFBTSxDQUFBO0lBQ2pCLENBQUM7QUFDTCxDQUFDO0FBV1EsZ0NBQVU7QUFUbkI7OztHQUdHO0FBQ0gsSUFBSSxTQUFTLEdBQUcsQ0FBQyxPQUFlLEVBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO0lBQ3pELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLHFCQUFxQixFQUFFLENBQUE7SUFDakcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLHlCQUF5QixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNuSSxDQUFDLENBQUMsQ0FBQTtBQUVtQiw4QkFBUztBQUU5QixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUE7QUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFBOzs7QUN6R2pELDZCQUE2QjtBQUM3Qiw0QkFBNEI7O0FBRTVCLDBCQUF1Qjs7OztBQ0h2Qix1QkFBb0I7QUFDcEIsd0JBQXFCO0FBQ3JCLHdCQUFxQjs7O0FDRnJCLGdDQUFnQzs7QUFFaEM7Ozs7Ozs7Ozs7Ozs7O0VBY0U7QUFFRixNQUFxQixRQUFRO0lBQzVCLFlBQVksSUFBSSxFQUFFLFNBQVMsRUFBRSxpQkFBaUI7UUFDN0MsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO0lBQzVDLENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDekIsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN6QixDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsSUFBSSxjQUFjO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsSUFBSSxHQUFHO1FBQ04sT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDekQsQ0FBQztJQUVELElBQUksT0FBTztRQUNWLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM3RCxDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ1IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzdELENBQUM7SUFFRCxJQUFJLE1BQU07UUFDVCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDN0QsQ0FBQztJQUVELElBQUksUUFBUTtRQUNYLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNiLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDL0IsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNyQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzdCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbkMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNyQyxLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEdBQUcsS0FBSyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM1QyxNQUFNLFlBQVksR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDO1lBQ2pDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxDQUFDO1lBQ3ZELE1BQU0sR0FBRyxHQUFHLFlBQVksR0FBRyxRQUFRLENBQUM7WUFDcEMsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzFFLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNyRCxJQUFJLElBQUksQ0FBQztZQUNULElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO2dCQUMzQixJQUFJLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3hDO2lCQUFNO2dCQUNOLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUM5QztZQUNELENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDYjtRQUNELE9BQU8sQ0FBQyxDQUFDO0lBQ1YsQ0FBQztJQUVELFFBQVE7UUFDUCxPQUFPLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSTtZQUMxQixRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUc7WUFDbkIsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLO1lBQ3hCLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTTtZQUN2QixjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7SUFDdkMsQ0FBQztDQUNEO0FBbEVELDJCQWtFQzs7O0FDbkZELGlDQUFpQzs7QUFFakM7Ozs7Ozs7O0VBUUU7QUFFRixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFFcEIsTUFBcUIsU0FBUztJQUM3QixZQUFZLElBQUk7UUFDZixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNsQixDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1YsSUFBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDckMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQy9CO2FBQU07WUFDTixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDakI7SUFDRixDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ1AsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBRUQsSUFBSSxZQUFZO1FBQ2YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZFLENBQUM7SUFFRCxRQUFRO1FBQ1AsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN2QixJQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNqQixPQUFPLHFCQUFxQixDQUFDO1NBQzdCO1FBQ0QsT0FBTyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDekQsQ0FBQztDQUNEO0FBNUJELDRCQTRCQzs7O0FDMUNELGlDQUFpQzs7QUFFakM7Ozs7RUFJRTtBQUVGLE1BQXFCLFNBQVM7SUFDN0IsWUFBWSxJQUFJLEVBQUUsT0FBTztRQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7UUFDbkYsSUFBSSxDQUFDLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztJQUNwRCxDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDVCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN6RCxDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ1IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzdELENBQUM7SUFFRCxZQUFZLENBQUMsS0FBSyxFQUFFLEdBQUc7UUFDdEIsSUFBRyxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDbEIsT0FBTyxDQUFDLENBQUM7U0FDVDtRQUNELE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0IsT0FBTyxLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMzQyxDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ1AsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELFFBQVE7UUFDUCxJQUFJLENBQUMsR0FBRyxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDckYsQ0FBQyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzdELElBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzFCLENBQUMsSUFBSSxjQUFjLENBQUM7WUFDcEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQTtZQUMxQixJQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUNuQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUN6QixLQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUU7b0JBQ3BFLElBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQ3hCLENBQUMsSUFBSSxJQUFJLENBQUM7cUJBQ1Y7b0JBQ0QsQ0FBQyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDL0I7YUFDRDtZQUNELENBQUMsSUFBSSxHQUFHLENBQUM7U0FDVDtRQUNELENBQUMsSUFBSSxJQUFJLENBQUM7UUFDVixPQUFPLENBQUMsQ0FBQztJQUNWLENBQUM7Q0FDRDtBQXZERCw0QkF1REM7Ozs7QUMvREQsbUJBQWdCO0FBQ2hCLG1CQUFnQjtBQUNoQixvQkFBaUI7QUFDakIsb0JBQWlCO0FBQ2pCLG9CQUFpQjtBQUNqQixxQkFBa0I7QUFDbEIsb0JBQWlCO0FBQ2pCLGtCQUFlO0FBQ2Ysb0JBQWlCO0FBQ2pCLG1CQUFnQjtBQUNoQixxQkFBa0I7QUFDbEIsYUFBYTtBQUNiLGtCQUFrQjs7Ozs7QUNibEIsdUNBQStDO0FBSS9DLElBQUksYUFBYSxHQUFHLENBQUMsR0FBVyxFQUFFLE9BQWlCLGVBQVEsQ0FBQyxLQUFLLEVBQWlCLEVBQUUsQ0FBQyxJQUFJLElBQUksZUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pHLE1BQU0sQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUVwRixNQUFNLFNBQVMsR0FBRyxDQUFDLEdBQVcsRUFBaUIsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsZUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBMEI1RCw4QkFBUztBQXhCakMsTUFBTSxTQUFTLEdBQUcsQ0FBQyxHQUFXLEVBQWlCLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLGVBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQXdCakQsOEJBQVM7QUF0QjVDLE1BQU0sTUFBTSxHQUFHLENBQUMsT0FBZSxPQUFPLENBQUMsV0FBVyxFQUFpQixFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQXNCeEUsd0JBQU07QUFwQnRCLE1BQU0sS0FBSyxHQUFHLENBQUMsT0FBZSxDQUFDLEVBQWlCLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFBO0FBb0IvRCxzQkFBSztBQWxCZDs7Ozs7OztHQU9HO0FBQ0gsU0FBUyxXQUFXLENBQUMsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBVTtJQUM1RCxJQUFJLFVBQVUsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFBO0lBQ2pDLFVBQVUsR0FBRyxVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQTtJQUM3QyxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ3ZDLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxVQUFVLEVBQUUsRUFBRSxLQUFLO1FBQzNDLFdBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtJQUNqSCxXQUFXLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQzdELE9BQU8sV0FBVyxDQUFBO0FBQ3RCLENBQUM7QUFFNkMsa0NBQVc7QUFVekQsVUFBVSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUE7QUFDaEMsVUFBVSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUE7QUFDaEMsVUFBVSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUE7QUFDcEMsVUFBVSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7QUFDeEIsVUFBVSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7Ozs7O0FDOUMxQixTQUFnQixjQUFjLENBQXNFLEtBQVE7SUFDeEcsTUFBTSxhQUFhLEdBQUcsSUFBSSxHQUFHLEVBQWEsQ0FBQztJQUUzQyxPQUFPLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRTtRQUNwQixTQUFTLENBQUMsTUFBUyxFQUFFLFFBQXlCO1lBQzFDLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUV0QyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDNUIsYUFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN0RDtZQUNELE9BQU8sYUFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUUsQ0FBQztRQUN0QyxDQUFDO0tBQ0osQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQWJELHdDQWFDO0FBRUQsTUFBTSxZQUFZLEdBQUcsSUFBSSxHQUFHLEVBQWlCLENBQUM7QUFDOUMsU0FBZ0IsT0FBTyxDQUFDLElBQVM7SUFDN0IsT0FBTyxTQUFTLFNBQVMsQ0FBQyxDQUFNLEVBQUUsQ0FBTSxFQUFFLFVBQStDO1FBQ3JGLE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDN0IsSUFBSSxPQUFPLFFBQVEsS0FBSyxVQUFVLEVBQUU7Z0JBQ2hDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsVUFBVSxHQUFHLElBQVM7b0JBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztvQkFDdkQsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxJQUFJLEtBQUssTUFBTSxFQUFFLENBQUMsQ0FBQztvQkFDOUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQ25DLE9BQU8sTUFBTSxDQUFDO2dCQUNsQixDQUFDLENBQUM7YUFDTDtTQUNKO1FBQ0QsT0FBTyxZQUFZLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQztBQUNOLENBQUM7QUFoQkQsMEJBZ0JDOzs7OztBQzdCRCxxQ0FBdUM7QUFDdkMscUNBQXlEO0FBRXpELHlEQUF5RDtBQUN6RCwyREFBMkQ7QUFDM0QscUVBQXFFO0FBQ3JFLFNBQVMsWUFBWSxDQUFDLEtBQXlCLEVBQUUsR0FBRyxJQUFXO0lBQzNELElBQUk7UUFDQSxJQUFJLEtBQUssSUFBSSxTQUFTO1lBQUUsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDdkMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDdkUsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ25GLE9BQU8sSUFBSSxjQUFjLENBQUMsSUFBQSxxQkFBWSxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUN4RyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUMvRDtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1IsR0FBRyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDcEIsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FDaEI7QUFDTCxDQUFDO0FBMEJRLG9DQUFZO0FBeEJyQixhQUFhO0FBQ2IsTUFBTSxjQUFjLEdBQUcsQ0FBQyxJQUF3QixFQUFFLEdBQUcsSUFBVyxFQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0FBdUJ6Rix3Q0FBYztBQXJCckMsY0FBYztBQUNkLE1BQU0sY0FBYyxHQUFHLENBQUMsSUFBd0IsRUFBRSxHQUFHLElBQVcsRUFBVSxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFBO0FBb0IzRSx3Q0FBYztBQWxCckQsYUFBYTtBQUNiLE1BQU0sY0FBYyxHQUFHLENBQUMsSUFBd0IsRUFBRSxHQUFHLElBQVcsRUFBVSxFQUFFLENBQUMsSUFBQSxtQkFBVSxFQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFBO0FBaUI3RCx3Q0FBYztBQWZyRSxZQUFZO0FBQ1osTUFBTSxjQUFjLEdBQUcsQ0FBQyxJQUF3QixFQUFFLEdBQUcsSUFBVyxFQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQTtBQWM3RSx3Q0FBYztBQVpyRixvQkFBb0I7QUFDcEIsTUFBTSxlQUFlLEdBQUcsQ0FBQyxJQUF3QixFQUFFLEdBQUcsSUFBVyxFQUFVLEVBQUUsQ0FBQyxJQUFBLGdCQUFPLEVBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUE7QUFXM0IsMENBQWU7QUFUdEcsZ0JBQWdCO0FBQ2hCLE1BQU0sZUFBZSxHQUFHLENBQUMsSUFBd0IsRUFBRSxHQUFHLElBQVcsRUFBVSxFQUFFO0lBQ3pFLElBQUksTUFBTSxHQUFHLFlBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUN0RCxPQUFPLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFBO0FBQ3ZDLENBQUMsQ0FBQTtBQUt1RywwQ0FBZTtBQUh2SCw0Q0FBNEM7QUFDNUMsTUFBTSxjQUFjLEdBQUcsQ0FBQyxJQUF3QixFQUFFLEdBQUcsSUFBVyxFQUFRLEVBQUUsQ0FBQyxJQUFBLGtCQUFTLEVBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUE7QUFFUSx3Q0FBYztBQWF2SSxVQUFVLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQTtBQUN0QyxVQUFVLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQTtBQUMxQyxVQUFVLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQTtBQUMxQyxVQUFVLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQTtBQUMxQyxVQUFVLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQTtBQUMxQyxVQUFVLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQTtBQUM1QyxVQUFVLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQTtBQUM1QyxVQUFVLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQTs7Ozs7QUNqRTFDOzs7OztHQUtHO0FBQ0gsTUFBTSxZQUFZLEdBQUcsQ0FBQyxLQUF5QixFQUFFLFdBQW9CLEtBQUssRUFBRSxVQUFtQixLQUFLLEVBQWlCLEVBQUU7SUFDbkgsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDM0IsT0FBTyxVQUFVLENBQUMsSUFBSSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtLQUM5QztTQUFNLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQ2xDLE9BQU8sTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxLQUFLLENBQWtCLENBQUE7S0FDL0Q7U0FBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUNsQyxJQUFJLEtBQUssWUFBWSxhQUFhLEVBQUU7WUFDaEMsT0FBTyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDM0I7YUFBTSxJQUFJLEtBQUssYUFBWSxLQUFzQixDQUFBLEVBQUU7WUFDaEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUErQixDQUFDLEVBQUU7Z0JBQzlDLElBQUksUUFBUTtvQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUE7O29CQUMxRCxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTthQUNyQjtZQUNELFFBQVEsS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDbEIsS0FBSyxDQUFDO29CQUNGLE9BQU8sTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFXLENBQWtCLENBQUE7Z0JBQzdFLEtBQUssQ0FBQztvQkFDRixPQUFPLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFXLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBVyxDQUFrQixDQUFBO2dCQUMzRixLQUFLLENBQUM7b0JBQ0YsT0FBTyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFXLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBVyxDQUFDLENBQUE7Z0JBQ3RHO29CQUNJLElBQUksUUFBUTt3QkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLGlFQUFpRSxDQUFDLENBQUE7O3dCQUMzRixPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTthQUN6QjtTQUNKO2FBQU07WUFDSCxJQUFJLFFBQVE7Z0JBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFBOztnQkFDcEQsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDckI7S0FDSjtJQUNELE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBRWIsU0FBUyxVQUFVLENBQUMsSUFBbUI7UUFDbkMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQTtRQUN0RCxJQUFJO1lBQ0EsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ2hELElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtnQkFDbkIsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUMzQyxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUE7Z0JBQ3JELElBQUksU0FBUyxLQUFLLElBQUksRUFBRTtvQkFDcEIsSUFBSSxRQUFRO3dCQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQTs7d0JBQzNELE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO2lCQUNyQjs7b0JBQ0ksT0FBTyxRQUFRLENBQUE7YUFDdkI7O2dCQUFNLE9BQU8sSUFBSSxDQUFBO1NBQ3JCO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDWixJQUFJLFFBQVE7Z0JBQUUsTUFBTSxLQUFLLENBQUE7WUFDekIsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDaEI7SUFDTCxDQUFDO0lBRUQsU0FBUyxVQUFVLENBQUMsS0FBNkI7UUFDN0MsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUNuQixJQUFJLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVE7Z0JBQUUsT0FBTyxLQUFLLENBQUE7WUFDOUMsSUFBSSxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRO2dCQUFFLE9BQU8sS0FBSyxDQUFBO1lBQzlDLElBQUksT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUTtnQkFBRSxPQUFPLEtBQUssQ0FBQTtTQUNqRDtRQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ25DLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQ25CLElBQUksT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUTtvQkFBRSxPQUFPLEtBQUssQ0FBQTthQUNqRDtTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUE7SUFDZixDQUFDO0FBQ0wsQ0FBQyxDQUFBO0FBUVEsb0NBQVk7QUFGckIsVUFBVSxDQUFDLFlBQVksR0FBRyxZQUFtQixDQUFBOzs7OztBQzVFN0MsdUNBQXFFO0FBQ3JFLDJDQUE0SDtBQUU1SCxTQUFTLGFBQWEsQ0FBQyxJQUFTO0lBQzVCLElBQUksSUFBSSxJQUFJLFNBQVM7UUFBRSxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNwQyxJQUFJLE9BQU8sSUFBSSxJQUFJLFFBQVE7UUFBRSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzdDLE9BQU8sSUFBSSxDQUFBO0FBQ2YsQ0FBQztBQW1YdUIsc0NBQWE7QUFqWHJDLElBQUksbUJBQW1CLEdBQUcsSUFBQSxnQkFBTyxFQUE2QixhQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtBQUd6RixNQUFNLFlBQVksR0FBRyxDQUFDLElBQVUsRUFBRSxRQUFzQixFQUFFLFFBQXFCLEVBQUUsYUFBc0IsSUFBSSxFQUFRLEVBQUU7SUFDakgsSUFBSSxPQUFPLElBQUksSUFBSSxRQUFRO1FBQUUsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUM3QyxJQUFJLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQUUsT0FBTTtJQUMxQixJQUFJLFNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO0lBQ3pCLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQzFCLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQzFCLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ2hDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ2hDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUNqQyxJQUFJLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3pCLElBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO1FBQ3BDLE9BQU8sRUFBRSxVQUFVLElBQXlCO1lBQ3hDLElBQUksUUFBUSxJQUFJLFNBQVM7Z0JBQUUsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFBO1FBQ3RFLENBQUM7UUFDRCxPQUFPLEVBQUUsVUFBVSxNQUE2QjtZQUM1QyxJQUFJLFFBQVEsSUFBSSxTQUFTO2dCQUFFLFFBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQTtRQUN4RSxDQUFDO0tBQ0osQ0FBQyxDQUFBO0lBQ0YsNkRBQTZEO0lBQzdELElBQUksVUFBVTtRQUFFLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUE7QUFDbkUsQ0FBQyxDQUFBO0FBeVZHLG9DQUFZO0FBdlZoQix3QkFBd0I7QUFDeEIsSUFBSSxZQUFZLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQTtBQUM5QixXQUFXO0FBQ1gsSUFBSSxXQUFXLEdBQUcsQ0FBQyxJQUFVLEVBQVEsRUFBRTtJQUNuQyxJQUFJLE9BQU8sSUFBSSxJQUFJLFFBQVE7UUFBRSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzdDLElBQUksSUFBSSxJQUFJLFNBQVM7UUFBRSxPQUFNO0lBQzdCLGVBQWUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO0FBQzdDLENBQUMsQ0FBQTtBQWdWNkMsa0NBQVc7QUE5VXpELGNBQWM7QUFDZCxJQUFJLFNBQVMsR0FBRyxDQUFDLElBQVUsRUFBUSxFQUFFO0lBQ2pDLElBQUksT0FBTyxJQUFJLElBQUksUUFBUTtRQUFFLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDN0MsSUFBSSxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztRQUFFLE9BQU07SUFDMUIsSUFBSSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN6QixXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzFDLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN6QyxZQUFZLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7U0FDekQ7S0FDSjtBQUNMLENBQUMsQ0FBQTtBQW1VMEQsOEJBQVM7QUFqVXBFLG1CQUFtQjtBQUNuQixJQUFJLHNCQUFzQixHQUFHLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtBQWdVckIsd0RBQXNCO0FBOVQ1RixxQkFBcUI7QUFDckIsTUFBTSxTQUFTLEdBQUcsQ0FBQyxJQUFXLEVBQUUsRUFBRTtJQUM5QixJQUFJLG1CQUFtQixHQUFHLElBQUEsZ0JBQU8sRUFBNkIsYUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUE7SUFDekYsSUFBSSxPQUFPLElBQUksSUFBSSxRQUFRO1FBQUUsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUM3QyxJQUFJLElBQUksSUFBSSxTQUFTLEVBQUU7UUFDbkIsbUJBQW1CLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDM0IsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFBO0tBQzFCO1NBQU07UUFDSCxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7UUFDcEMsSUFBSSxRQUFRLEdBQUcsbUJBQW1CLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQzNDLElBQUksUUFBUSxJQUFJLFNBQVMsRUFBRTtZQUN2QixRQUFRLENBQUMsTUFBTSxFQUFFLENBQUE7WUFDakIsbUJBQW1CLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1NBQ2xDO0tBQ0o7QUFDTCxDQUFDLENBQUE7QUErU2lCLDhCQUFTO0FBMVMzQixTQUFTLGVBQWUsQ0FBQyxJQUFVLEVBQUUsUUFBeUIsRUFBRSxVQUFtQixJQUFJO0lBQ25GLElBQUksT0FBTyxJQUFJLElBQUksUUFBUTtRQUFFLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDN0MsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFBO0lBQ2xCLElBQUksR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDekIsc0JBQXNCO0lBQ3RCLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtRQUNsRCxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0tBQ2xDO1NBQU07UUFDSCxpQkFBaUI7UUFDakIsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtLQUMzQjtJQUNELG9DQUFvQztJQUNwQyxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQWMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQTtJQUMvRixXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLGNBQWMsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFO1FBQ3BFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsaUJBQWlCLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUE7UUFDNUgsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUNuRCxPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFBO0lBQ3JDLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDaEUsQ0FBQztBQXdSNEIsMENBQWU7QUF0UnJDLE1BQU0sc0JBQXNCLEdBQUcsQ0FBQyxNQUF1QyxFQUFFLFFBQWdCLEVBQUUsRUFBRTtJQUNoRyxJQUFJLE9BQU8sTUFBTSxJQUFJLFFBQVE7UUFBRSxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3pELElBQUksT0FBTyxNQUFNLElBQUksUUFBUTtRQUFFLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDbkQsSUFBSSxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQTtJQUMvQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUU7UUFDcEMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFBRSxPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQTtJQUMzRixPQUFPLENBQUMsQ0FBQyxDQUFBO0FBQ2IsQ0FBQyxDQUFBO0FBUFksUUFBQSxzQkFBc0IsMEJBT2xDO0FBR0QsZ0NBQWdDO0FBQ3pCLE1BQU0sZUFBZSxHQUFHLENBQUMsR0FBMkIsRUFBRSxDQUFVLEVBQUUsRUFBRTtJQUN2RSxJQUFJLE9BQU8sR0FBRyxJQUFJLFFBQVE7UUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzFDLElBQUksR0FBRyxJQUFJLFNBQVMsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztRQUFFLE9BQU07SUFDN0MsSUFBSSxNQUFNLEdBQUcsWUFBWSxDQUFDLFdBQVcsQ0FBQyx3QkFBd0IsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQzlGLElBQUksQ0FBQyxJQUFJLFNBQVMsRUFBRTtRQUNoQixHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7S0FDdkI7U0FBTTtRQUNILE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0tBQ3pCO0FBQ0wsQ0FBQyxDQUFBO0FBVFksUUFBQSxlQUFlLG1CQVMzQjtBQUVEOzs7Ozs7OztHQVFHO0FBQ0gsdUdBQXVHO0FBQ3ZHLDBEQUEwRDtBQUMxRCwwREFBMEQ7QUFDMUQsNEZBQTRGO0FBQzVGLFlBQVk7QUFDWix1QkFBdUI7QUFDdkIsZ0VBQWdFO0FBQ2hFLDhFQUE4RTtBQUM5RSw2RUFBNkU7QUFDN0UsMkNBQTJDO0FBQzNDLDRGQUE0RjtBQUM1Rix3RUFBd0U7QUFDeEUsNERBQTREO0FBQzVELHlGQUF5RjtBQUN6RixtREFBbUQ7QUFDbkQsMkNBQTJDO0FBQzNDLHNEQUFzRDtBQUN0RCxnRUFBZ0U7QUFDaEUsNkJBQTZCO0FBQzdCLDJCQUEyQjtBQUMzQix1REFBdUQ7QUFDdkQsa0ZBQWtGO0FBQ2xGLG9CQUFvQjtBQUNwQixnQkFBZ0I7QUFDaEIsZ0RBQWdEO0FBQ2hELFlBQVk7QUFFWiw2QkFBNkI7QUFDN0IsMEVBQTBFO0FBQzFFLDhFQUE4RTtBQUM5RSw4REFBOEQ7QUFDOUQscUVBQXFFO0FBQ3JFLFlBQVk7QUFFWixrQkFBa0I7QUFDbEIsK0RBQStEO0FBQy9ELGlDQUFpQztBQUNqQyxnREFBZ0Q7QUFDaEQsZ0NBQWdDO0FBQ2hDLDZGQUE2RjtBQUM3Riw2Q0FBNkM7QUFDN0Msb0VBQW9FO0FBQ3BFLGtFQUFrRTtBQUNsRSw2RkFBNkY7QUFDN0Ysc0VBQXNFO0FBQ3RFLG1IQUFtSDtBQUNuSCxnQkFBZ0I7QUFDaEIsWUFBWTtBQUVaLDZCQUE2QjtBQUM3QiwyQkFBMkI7QUFDM0IsNEJBQTRCO0FBQzVCLDZCQUE2QjtBQUM3Qix5Q0FBeUM7QUFDekMsOEJBQThCO0FBQzlCLGdFQUFnRTtBQUNoRSw0QkFBNEI7QUFDNUIseUNBQXlDO0FBQ3pDLDZCQUE2QjtBQUM3QiwwQ0FBMEM7QUFDMUMsNEJBQTRCO0FBQzVCLDRDQUE0QztBQUM1Qyw2QkFBNkI7QUFDN0IsNENBQTRDO0FBQzVDLDZCQUE2QjtBQUM3QixnQ0FBZ0M7QUFDaEMsaUNBQWlDO0FBQ2pDLHdEQUF3RDtBQUN4RCw4QkFBOEI7QUFDOUIsMkdBQTJHO0FBQzNHLDRHQUE0RztBQUM1Ryw2R0FBNkc7QUFDN0csMkdBQTJHO0FBQzNHLHNEQUFzRDtBQUN0RCx3R0FBd0c7QUFDeEcsMERBQTBEO0FBQzFELGdDQUFnQztBQUNoQyxrREFBa0Q7QUFDbEQscUhBQXFIO0FBQ3JILHVIQUF1SDtBQUN2SCxzREFBc0Q7QUFDdEQsZ0ZBQWdGO0FBQ2hGLDZCQUE2QjtBQUM3QixxREFBcUQ7QUFDckQsbUdBQW1HO0FBQ25HLDRCQUE0QjtBQUM1Qiw4QkFBOEI7QUFDOUIsa0NBQWtDO0FBQ2xDLDZCQUE2QjtBQUM3QiwrQkFBK0I7QUFDL0IsK0JBQStCO0FBQy9CLHFEQUFxRDtBQUNyRCxtSEFBbUg7QUFDbkgsK0JBQStCO0FBQy9CLHFEQUFxRDtBQUNyRCw4REFBOEQ7QUFDOUQscUVBQXFFO0FBQ3JFLGtMQUFrTDtBQUNsTCwyQkFBMkI7QUFDM0IsOENBQThDO0FBQzlDLDhCQUE4QjtBQUM5QixxREFBcUQ7QUFDckQsMEJBQTBCO0FBQzFCLG1EQUFtRDtBQUNuRCxnR0FBZ0c7QUFDaEcsZ0dBQWdHO0FBQ2hHLGtHQUFrRztBQUNsRyw2RkFBNkY7QUFDN0YsNEJBQTRCO0FBQzVCLHdIQUF3SDtBQUN4SCxpTEFBaUw7QUFDakwsdU1BQXVNO0FBQ3ZNLGdDQUFnQztBQUNoQywyQkFBMkI7QUFDM0IsNEZBQTRGO0FBQzVGLDhCQUE4QjtBQUM5Qix1R0FBdUc7QUFDdkcsOEJBQThCO0FBQzlCLHVHQUF1RztBQUN2Ryw4QkFBOEI7QUFDOUIsdUdBQXVHO0FBQ3ZHLDRCQUE0QjtBQUM1QixpRUFBaUU7QUFDakUscUdBQXFHO0FBQ3JHLDhCQUE4QjtBQUM5Qix1R0FBdUc7QUFDdkcsNEJBQTRCO0FBQzVCLHNHQUFzRztBQUN0Ryw2QkFBNkI7QUFDN0Isc0dBQXNHO0FBQ3RHLGdDQUFnQztBQUNoQyx5R0FBeUc7QUFDekcsMkJBQTJCO0FBQzNCLG9HQUFvRztBQUNwRywwQkFBMEI7QUFDMUIsbUdBQW1HO0FBQ25HLGlDQUFpQztBQUNqQywwR0FBMEc7QUFDMUcsMkJBQTJCO0FBQzNCLG9HQUFvRztBQUNwRyw0QkFBNEI7QUFDNUIscUdBQXFHO0FBQ3JHLDJCQUEyQjtBQUMzQixzRkFBc0Y7QUFDdEYsa0NBQWtDO0FBQ2xDLHNDQUFzQztBQUN0Qyx3R0FBd0c7QUFDeEcsdUJBQXVCO0FBQ3ZCLHdGQUF3RjtBQUN4RixZQUFZO0FBQ1osb0JBQW9CO0FBQ3BCLG9CQUFvQjtBQUNwQixtQkFBbUI7QUFDbkIsUUFBUTtBQUNSLElBQUk7QUFFSixNQUFNO0FBQ04sbUJBQW1CO0FBQ25CLDZDQUE2QztBQUM3QywwQ0FBMEM7QUFDMUMsTUFBTTtBQUNOLDhHQUE4RztBQUM5Ryw4REFBOEQ7QUFDOUQsaUVBQWlFO0FBQ2pFLG9EQUFvRDtBQUNwRCxxRUFBcUU7QUFDckUsMkVBQTJFO0FBQzNFLG1FQUFtRTtBQUVuRSxnRUFBZ0U7QUFDaEUsc0VBQXNFO0FBQ3RFLHlHQUF5RztBQUV6Ryx3Q0FBd0M7QUFDeEMsNEdBQTRHO0FBQzVHLDJEQUEyRDtBQUMzRCx3QkFBd0I7QUFDeEIsZ0JBQWdCO0FBQ2hCLHNDQUFzQztBQUN0Qyx3QkFBd0I7QUFDeEIsK0NBQStDO0FBQy9DLFlBQVk7QUFDWiwyREFBMkQ7QUFDM0QsUUFBUTtBQUNSLHdFQUF3RTtBQUN4RSxJQUFJO0FBRUo7Ozs7Ozs7O0dBUUc7QUFDSCxNQUFNLGFBQWEsR0FBRyxDQUFDLFFBQXVCLEVBQUUsU0FBa0IsRUFBRSxFQUFFO0lBQ2xFLFNBQVMsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBO0lBQ3JDLElBQUksS0FBSyxHQUFHLFlBQVksQ0FBQyxJQUFBLGNBQUssRUFBQyxhQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBQSxjQUFLLEVBQUMsYUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ3pGLElBQUksT0FBTyxHQUFHLFlBQVksQ0FBQyxJQUFBLGNBQUssRUFBQyxhQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7SUFDdkUsSUFBSSxTQUFTO1FBQUUsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUE7SUFDbkQsR0FBRyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLGVBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUNsRSxDQUFDLENBQUE7QUF5Q0csc0NBQWE7QUF2Q2pCLFNBQVMsUUFBUSxDQUFDLEVBQVE7SUFDdEIsSUFBSSxPQUFPLEVBQUUsS0FBSyxRQUFRO1FBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUN4QyxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDeEMsSUFBSSxFQUFFLElBQUksSUFBSSxFQUFFO1FBQ1osSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUE7UUFDeEIsT0FBTTtLQUNUO0lBQ0QsT0FBTyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtBQUMvQyxDQUFDO0FBbUM2Riw0QkFBUTtBQWpDdEcsTUFBTSxlQUFlLEdBQUcsQ0FBQyxHQUFrQixFQUFFLEVBQUU7SUFDM0MsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFBO0lBQ2IsS0FBSyxJQUFJLEdBQUcsSUFBSSxHQUFHO1FBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNuRCxPQUFPLElBQUksQ0FBQTtBQUNmLENBQUMsQ0FBQTtBQThCc0MsMENBQWU7QUEzQnREOzs7Ozs7R0FNRztBQUNILE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxNQUFjLEVBQUUsV0FBbUIsRUFBRSxFQUFFLEVBQUU7SUFDakUsSUFBSSxDQUFDLElBQUEsZ0JBQU8sRUFBQyxhQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQzNDLElBQUEsc0JBQWEsRUFBQyxhQUFNLENBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUM3QyxPQUFPLENBQUMsQ0FBQTtLQUNYO0lBQ0QsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUEsc0JBQWEsRUFBQyxhQUFNLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ2xFLElBQUEsc0JBQWEsRUFBQyxhQUFNLENBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUNqRCxPQUFPLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBO0FBQzNDLENBQUMsQ0FBQTtBQVlHLGdEQUFrQjtBQVZyQixNQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQW9CLEVBQUUsRUFBRTtJQUNyRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDckMsQ0FBQyxDQUFBO0FBdUJELFVBQVUsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFBO0FBQ3hCLFVBQVUsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFBO0FBQzNCLFVBQVUsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFBO0FBQzFCLFVBQVUsQ0FBQyxFQUFFLEdBQUcsU0FBUyxDQUFBO0FBQ3pCLFVBQVUsQ0FBQyxHQUFHLEdBQUcsc0JBQXNCLENBQUE7QUFDdkMsVUFBVSxDQUFDLENBQUMsR0FBRyxlQUFlLENBQUE7QUFDOUIsVUFBVSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUE7QUFDeEMsVUFBVSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUE7QUFDOUIsVUFBVSxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFBOzs7OztBQ2xabEQsdUNBQXVDO0FBRXZDOzs7OztHQUtHO0FBQ0gsSUFBSSxRQUFRLEdBQUcsQ0FBQyxJQUE0QixFQUFFLFFBQWdCLENBQUMsRUFBRSxPQUFlLENBQUMsRUFBRSxVQUFvQixlQUFRLENBQUMsS0FBSyxFQUFFLFFBQWdCLENBQUMsRUFBRSxFQUFFO0lBQ3hJLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxLQUFLO1FBQUUsT0FBTTtJQUNqQyxJQUFJLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3pCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUFFLE9BQU07SUFDekIsSUFBSSxJQUFJLElBQUksQ0FBQyxFQUFFO1FBQ1gsS0FBSyxJQUFJLE1BQU0sR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLEtBQUssRUFBRSxNQUFNLEVBQUU7WUFBRSxRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0tBQ3hFO1NBQU07UUFDSCxJQUFJLEdBQUcsR0FBRyxLQUFLLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDN0UsSUFBSSxHQUFHLEdBQUcsS0FBSyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUE7UUFDL0MsS0FBSyxJQUFJLE1BQU0sR0FBRyxHQUFHLEVBQUUsTUFBTSxHQUFHLEdBQUcsRUFBRSxNQUFNLEVBQUU7WUFBRSxRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0tBQ3hFO0lBRUQsU0FBUyxRQUFRLENBQUMsT0FBc0IsRUFBRSxNQUFjO1FBQ3BELElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFBO1FBQ3hDLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQTtRQUMzQyx3Q0FBd0M7UUFDeEMsSUFBSSxPQUFPLENBQUMsSUFBSSxJQUFJLEtBQUssSUFBSSxTQUFTLENBQUMsTUFBTSxJQUFJLEVBQUU7WUFBRSxTQUFTLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUE7UUFDakcsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQTtRQUNqRCxJQUFJLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO1FBQ3JELElBQUksSUFBSSxJQUFJLENBQUMsRUFBRTtZQUNYLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ3BJO2FBQU0sSUFBSSxJQUFJLElBQUksQ0FBQyxFQUFFO1lBQ2xCLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ3BJO1FBQ0QsSUFBSTtZQUNBLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLEdBQUcsT0FBTyxHQUFHLElBQUksR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFBO1NBQ2hHO1FBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRztJQUNuQixDQUFDO0FBQ0wsQ0FBQyxDQUFBO0FBTVEsNEJBQVE7QUFKakIsVUFBVSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUE7Ozs7O0FDdEM5Qix1Q0FBdUM7QUFFdkMsTUFBTSxZQUFZO0lBRWQsTUFBTSxDQUFDLFdBQVcsR0FBRyxDQUFDLFFBQWdCLEVBQUUsUUFBa0IsZUFBUSxDQUFDLEdBQUcsRUFBRSxRQUFrQixlQUFRLENBQUMsR0FBRyxFQUFFLFFBQWtCLGVBQVEsQ0FBQyxHQUFHLEVBQVUsRUFBRTtRQUM5SSxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtRQUM3QixHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUMvQixHQUFHLENBQUMsS0FBSyxRQUFRLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUM3QixHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUMvQixPQUFPLEdBQUcsQ0FBQTtJQUNkLENBQUMsQ0FBQTtJQUVELE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtJQUMzQixNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsTUFBYyxFQUFFLFVBQWtCLEdBQUcsRUFBRSxFQUFFO1FBQ3ZELElBQUksR0FBRyxHQUFHLE1BQU0sR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFBO1FBQ2hDLElBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSTtZQUFFLE9BQU8sWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDakYsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLEVBQUUsRUFBRSxLQUFLLEdBQUcsTUFBTSxFQUFFLEtBQUssRUFBRTtZQUFFLE1BQU0sSUFBSSxPQUFPLENBQUE7UUFDM0UsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQ3RDLE9BQU8sTUFBTSxDQUFBO0lBQ2pCLENBQUMsQ0FBQTtJQUVELE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBVyxFQUFFLE9BQWUsRUFBRSxFQUFFLFVBQWtCLEdBQUc7UUFDakUsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQTtRQUN4QixJQUFJLE9BQU8sSUFBSSxJQUFJLEVBQUU7WUFDakIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUNoQyxHQUFHLElBQUksT0FBTyxDQUFBO1NBQ2pCOztZQUFNLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFBRSxHQUFHLElBQUksR0FBRyxDQUFBO1FBQzFELE9BQU8sR0FBRyxDQUFBO0lBQ2QsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBWSxFQUFFLENBQVMsRUFBRSxJQUFZO1FBQ2xELElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNaLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNaLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDakIsT0FBTyxJQUFJLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztTQUMzQjthQUFNO1lBQ0gsRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzFCLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEMsT0FBTyxHQUFHLEVBQUUsR0FBRyxJQUFJLEdBQUcsRUFBRSxFQUFFLENBQUM7U0FDOUI7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLGFBQWEsR0FBRyxDQUFDLEdBQWtCLEVBQUUsT0FBZSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQVUsRUFBRTtRQUNwRyxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQzFCLElBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxJQUFJO1lBQUUsT0FBTyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFBO1FBQzlELEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFBRSxHQUFHLElBQUksR0FBRyxDQUFBO1FBQ3RELE9BQU8sS0FBSyxHQUFHLEVBQUUsQ0FBQTtJQUNyQixDQUFDLENBQUE7O0FBR0ksb0NBQVk7QUFFckIsVUFBVSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFBOzs7OztBQzNEN0MsdUNBQThDO0FBQzlDLDJDQUErQztBQUMvQyx1Q0FBeUM7QUFFekMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxJQUFhLEVBQVEsRUFBRSxDQUFDLElBQUEsY0FBSyxFQUFDLFdBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFvQixDQUFDO0FBRXpGLE1BQU0sVUFBVSxHQUFHLEdBQVksRUFBRSxDQUFDLElBQUEsZUFBTSxFQUFVLFdBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUV4RCxNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQVEsRUFBRSxPQUFpQixlQUFRLENBQUMsS0FBSyxFQUFRLEVBQUU7SUFDbkUsUUFBUSxJQUFJLEVBQUU7UUFDVixLQUFLLGVBQVEsQ0FBQyxLQUFLO1lBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUFDLE1BQUs7UUFDNUMsS0FBSyxlQUFRLENBQUMsR0FBRztZQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFBQyxNQUFLO1FBQzVDLEtBQUssZUFBUSxDQUFDLE1BQU07WUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQUMsTUFBSztRQUM5QztZQUFTLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQyxDQUFDO1lBQUMsTUFBSztLQUN0RTtBQUNMLENBQUMsQ0FBQTtBQVBZLFFBQUEsR0FBRyxPQU9mO0FBRUQsTUFBTSxXQUFXLEdBQVcsU0FBUyxDQUFBO0FBQ3JDLE1BQU0sYUFBYSxHQUFHLENBQUMsS0FBZSxFQUFVLEVBQUU7SUFDOUMsT0FBTyxRQUFRLEtBQWUsR0FBRyxDQUFBO0FBQ3JDLENBQUMsQ0FBQTtBQUVELFdBQVc7QUFDSixNQUFNLElBQUksR0FBRyxDQUFDLEdBQVcsRUFBRSxtQkFBaUQsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLGVBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDbEgsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFBO0lBQ2xCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDOUMsTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDL0MsSUFBSSxRQUFRLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ25DLFFBQVEsR0FBRyxzQkFBWSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQzVELFFBQVEsR0FBRyxzQkFBWSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUE7S0FDbEY7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQ3pCLENBQUMsQ0FBQTtBQVRZLFFBQUEsSUFBSSxRQVNoQjtBQUVNLE1BQU0sSUFBSSxHQUFHLENBQUMsR0FBUSxFQUFRLEVBQUUsQ0FBQyxJQUFBLFdBQUcsRUFBQyxHQUFHLEVBQUUsZUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQXBELFFBQUEsSUFBSSxRQUFnRDtBQUMxRCxNQUFNLElBQUksR0FBRyxDQUFDLEdBQVEsRUFBUSxFQUFFLENBQUMsSUFBQSxXQUFHLEVBQUMsR0FBRyxFQUFFLGVBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUFqRCxRQUFBLElBQUksUUFBNkM7QUFDdkQsTUFBTSxJQUFJLEdBQUcsQ0FBQyxHQUFRLEVBQVEsRUFBRSxDQUFDLElBQUEsV0FBRyxFQUFDLEdBQUcsRUFBRSxlQUFRLENBQUMsR0FBRyxDQUFDLENBQUE7QUFBakQsUUFBQSxJQUFJLFFBQTZDO0FBQ3ZELE1BQU0sSUFBSSxHQUFHLENBQUMsR0FBUSxFQUFRLEVBQUUsQ0FBQyxJQUFBLFdBQUcsRUFBQyxHQUFHLEVBQUUsZUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQWpELFFBQUEsSUFBSSxRQUE2QztBQUN2RCxNQUFNLElBQUksR0FBRyxDQUFDLEdBQVEsRUFBUSxFQUFFLENBQUMsSUFBQSxXQUFHLEVBQUMsR0FBRyxFQUFFLGVBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUFqRCxRQUFBLElBQUksUUFBNkM7QUFFOUQsU0FBZ0IsY0FBYztJQUMxQixJQUFJLEdBQUcsR0FBRyxXQUFXLENBQUE7SUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtREFBbUQsQ0FBQyxDQUFBO0lBQ2hFLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLGFBQWEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDLENBQUE7S0FDdEU7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGdEQUFnRCxDQUFDLENBQUE7SUFDN0QsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sYUFBYSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUMsQ0FBQTtLQUN0RTtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0RBQWdELENBQUMsQ0FBQTtJQUM3RCxLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxhQUFhLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQyxDQUFBO0tBQ3RFO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnREFBZ0QsQ0FBQyxDQUFBO0lBQzdELEtBQUssSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLGFBQWEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDLENBQUE7S0FDdEU7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGdEQUFnRCxDQUFDLENBQUE7QUFDakUsQ0FBQztBQW5CRCx3Q0FtQkM7QUFFRCxJQUFJLFFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO0FBQ2pCLE1BQU0sT0FBTyxHQUFHLENBQUMsTUFBYyxFQUFFLFVBQWtCLEdBQUcsRUFBRSxFQUFFO0lBQzdELElBQUksTUFBTSxJQUFJLENBQUM7UUFBRSxPQUFPLEVBQUUsQ0FBQTtJQUMxQixJQUFJLEdBQUcsR0FBRyxNQUFNLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQTtJQUNoQyxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSTtRQUFFLE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUN2RCxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsRUFBRSxFQUFFLEtBQUssR0FBRyxNQUFNLEVBQUUsS0FBSyxFQUFFO1FBQUUsTUFBTSxJQUFJLE9BQU8sQ0FBQTtJQUMzRSxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUN6QixPQUFPLE1BQU0sQ0FBQTtBQUNqQixDQUFDLENBQUE7QUFQWSxRQUFBLE9BQU8sV0FPbkI7QUFlRCxVQUFVLENBQUMsR0FBRyxHQUFHLFdBQUcsQ0FBQTtBQUNwQix5QkFBeUI7QUFDekIsVUFBVSxDQUFDLElBQUksR0FBRyxZQUFJLENBQUE7QUFDdEIsVUFBVSxDQUFDLElBQUksR0FBRyxZQUFJLENBQUE7QUFDdEIsVUFBVSxDQUFDLElBQUksR0FBRyxZQUFJLENBQUE7QUFDdEIsVUFBVSxDQUFDLElBQUksR0FBRyxZQUFJLENBQUE7QUFDdEIsVUFBVSxDQUFDLElBQUksR0FBRyxZQUFJLENBQUE7QUFDdEIsVUFBVSxDQUFDLE9BQU8sR0FBRyxlQUFPLENBQUE7QUFDNUIsVUFBVSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUE7QUFDMUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxlQUFRLENBQUE7Ozs7O0FDN0Y5QixTQUFnQixVQUFVO0lBQ3hCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzdDLENBQUM7QUFGRCxnQ0FFQztBQUVELE1BQWEsTUFBTTtJQUNULElBQUksQ0FBUztJQUVyQixZQUFZLElBQVk7UUFDdEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbkIsQ0FBQztJQUVELElBQUksR0FBRyxHQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7SUFFdEgsT0FBTyxHQUFHLENBQUMsR0FBVyxFQUFFLEdBQVcsRUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFBO0NBQ2hHO0FBVkQsd0JBVUM7Ozs7O0FDZEQsdUNBQTRDO0FBRTVDLHFDQUF3QztBQUV4Qyw4REFBOEQ7QUFDOUQsTUFBTSxVQUFVLEdBQUcsQ0FBQyxLQUFvQixFQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFBO0FBK0RwRixnQ0FBVTtBQTdEbkIsTUFBTSxXQUFXLEdBQUcsQ0FBQyxLQUFvQixFQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sRUFBRSxJQUFJLEdBQUcsQ0FBQTtBQTZEakYsa0NBQVc7QUEzRGhDLE1BQU0sT0FBTyxHQUFHLENBQUMsS0FBb0IsRUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFBO0FBMkRyRCwwQkFBTztBQXpEekMsTUFBTSxRQUFRLEdBQUcsQ0FBQyxLQUFvQixFQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBO0FBeUQvQyw0QkFBUTtBQXZEbkQsTUFBTSxTQUFTLEdBQUcsQ0FBQyxLQUFvQixFQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFBO0FBdUR6Qiw4QkFBUztBQXJEMUUsTUFBTSxVQUFVLEdBQUcsQ0FBQyxLQUFvQixFQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFBO0FBcUR0QyxnQ0FBVTtBQW5EL0Q7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFVLEVBQVUsRUFBRTtJQUNuQyxJQUFJLE9BQU8sSUFBSSxJQUFJLFFBQVE7UUFBRSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzdDLElBQUksSUFBSSxJQUFJLFNBQVMsSUFBSSxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztRQUFFLE9BQU8sRUFBRSxDQUFBO0lBQ2xELElBQUk7UUFDQSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQTtLQUNwRDtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1IsT0FBTyxFQUFFLENBQUE7S0FDWjtBQUNMLENBQUMsQ0FBQTtBQXVDMkUsMEJBQU87QUFyQ25GLE1BQU0sU0FBUyxHQUFHLENBQUMsSUFBVSxFQUFRLEVBQUU7SUFFbkMsSUFBSSxPQUFPLElBQUksSUFBSSxRQUFRO1FBQUUsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUM3QyxJQUFJLElBQUksSUFBSSxTQUFTLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFBRSxPQUFNO0lBQy9DLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQTtJQUNqQixJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtJQUNqRCxJQUFJLENBQUMsdUJBQXVCLEdBQUcsU0FBUyxHQUFHLGNBQWMsR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUE7SUFDMUUsSUFBSSxTQUFTLElBQUksQ0FBQztRQUFFLE9BQU07SUFDMUIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxNQUFNLEVBQUUsS0FBSyxFQUFFLGVBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNoRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDVCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxFQUFFLEVBQUUsQ0FBQyxFQUFFO1FBQ2hDLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDekMsSUFBSSxXQUFXLEdBQUcsZUFBZSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQTtRQUN6RyxJQUFJLFdBQVcsSUFBSSxxQkFBcUI7WUFDcEMsV0FBVyxJQUFJLENBQUMsSUFBSSxHQUFHLGVBQWUsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3ZILElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxNQUFNLEdBQUcsUUFBUSxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUUsR0FBRyxPQUFPLEdBQUcsV0FBVyxDQUFDLENBQUE7S0FDdEg7SUFDRCxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDYixDQUFDLENBQUE7QUFtQm9GLDhCQUFTO0FBakI5RixJQUFJLE9BQU8sR0FBRyxDQUFDLElBQVMsRUFBRSxTQUFpQixJQUFJLEVBQUUsS0FBMkIsRUFBRSxFQUFFO0lBQzVFLElBQUksR0FBRyxJQUFBLHNCQUFhLEVBQUMsSUFBSSxDQUFDLENBQUE7SUFDMUIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7UUFDNUIsTUFBTSxFQUFFLE1BQU07S0FDakIsQ0FBQyxFQUFFLEtBQUssSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLGVBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQ3BELENBQUMsQ0FBQTtBQVkrRiwwQkFBTztBQVZ2RyxJQUFJLE9BQU8sR0FBRyxDQUFDLElBQVMsRUFBRSxTQUFpQixJQUFJLEVBQUUsU0FBa0IsSUFBSSxFQUFFLEtBQXNCLEVBQUUsRUFBRTtJQUMvRixJQUFJLEdBQUcsSUFBQSxzQkFBYSxFQUFDLElBQUksQ0FBQyxDQUFBO0lBQzFCLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO1FBQ2QsTUFBTSxFQUFFLE1BQU07UUFDZCxNQUFNLEVBQUUsTUFBTTtLQUNqQixDQUFDLEVBQUUsS0FBSyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsZUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDcEQsQ0FBQyxDQUFBO0FBSXdHLDBCQUFPO0FBRmhILE1BQU0sUUFBUSxHQUFHLENBQUMsTUFBYyxFQUFpQixFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtBQUVxQiw0QkFBUTtBQWdCMUgsVUFBVSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUE7QUFDbEMsVUFBVSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUE7QUFDcEMsVUFBVSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7QUFDNUIsVUFBVSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUE7QUFDOUIsVUFBVSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUE7QUFDaEMsVUFBVSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUE7QUFDbEMsVUFBVSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7QUFDNUIsVUFBVSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUE7QUFDaEMsVUFBVSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7QUFDNUIsVUFBVSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7Ozs7O0FDN0Y1QixXQUFXO0FBQ1gsTUFBTSxlQUFlLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUE7QUE0QmhJLDBDQUFlO0FBMUJ4QixhQUFhO0FBQ2IsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLEdBQWUsRUFBRSxVQUFtQixLQUFLLEVBQUUsUUFBZ0IsQ0FBQyxFQUFFLFVBQW1CLEtBQUssRUFBaUIsRUFBRTtJQUMvSCxJQUFJLE9BQU8sR0FBVyxFQUFFLENBQUE7SUFDeEIsSUFBSSxPQUFPLEVBQUU7UUFDVCxPQUFPLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQzthQUM1QyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQzthQUNmLE9BQU8sRUFBRTthQUNULEdBQUcsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0tBQy9DO1NBQU07UUFDSCxPQUFPLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQzthQUM1QyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQzthQUNmLEdBQUcsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0tBQy9DO0lBQ0QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUE7QUFDN0MsQ0FBQyxDQUFBO0FBWXlCLDRDQUFnQjtBQVYxQyxJQUFJLGFBQWEsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7QUFVdEUsc0NBQWE7QUFSekQsSUFBSSxjQUFjLEdBQUcsQ0FBQyxHQUFlLEVBQUUsUUFBZ0IsQ0FBQyxFQUFFLEVBQUU7SUFDeEQsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDO1NBQ3pDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDO1FBQ2hCLGFBQWE7U0FDWixHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLHlFQUF5RTtTQUN4RSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDbkIsQ0FBQyxDQUFBO0FBQzBELHdDQUFjO0FBU3pFLFVBQVUsQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFBO0FBQzVDLFVBQVUsQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQTtBQUM5QyxVQUFVLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQTtBQUN4QyxVQUFVLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQTs7QUN6QzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25KQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNwdUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3BOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDblZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM5R0E7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsUEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDeEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN4TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiJ9
