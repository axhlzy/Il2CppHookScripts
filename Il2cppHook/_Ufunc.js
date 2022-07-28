(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../utils/common");
var readTMPText = (mPtr) => {
    mPtr = (0, common_1.PTR2NativePtr)(mPtr);
    if (mPtr.isNull())
        return "";
    return "";
};
},{"../utils/common":150}],3:[function(require,module,exports){
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
                if (nameSpace.toLowerCase().indexOf(filterNameSpace.toLowerCase()) == -1)
                    continue;
                ++countNameSpace;
                LOGD(`\n${nameSpace}`);
                array?.forEach((klass) => {
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
    static findMethodsyncCacheMap = new Map();
    static findMethodSync(imageName, className, functionName, argsCount = -1, isRealAddr = true, cmdCall = true) {
        if (imageName == undefined || className == undefined || functionName == undefined)
            return ptr(0);
        const soAddr = Il2Cpp.module.base;
        let cacheKey = imageName + "." + className + "." + functionName + "." + argsCount;
        if (isRealAddr) {
            let cachedPointer = HookerBase.findMethodsyncCacheMap.get(cacheKey);
            if (cachedPointer != undefined)
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
    static listFieldsFromCls(klass, instance) {
        if (klass == undefined || klass == null)
            return;
        if (typeof klass == "number")
            klass = ptr(klass);
        if (typeof instance == "number")
            instance = ptr(instance);
        let packCls = new Il2Cpp.Class(klass);
        let fieldsCount = packCls.fields.length;
        if (fieldsCount <= 0)
            return;
        let is_enum = packCls.isEnum;
        if (arguments[2] == undefined)
            LOGH("\nFound " + fieldsCount + " Fields" + (is_enum ? "(enum)" : "") + " in class: " + packCls.name + " (" + klass + ")");
        let iter = alloc();
        let field = null;
        let maxlength = 0;
        let arrStr = new Array();
        let enumIndex = 0;
        while (field = Il2Cpp.Api._classGetFields(klass, iter)) {
            if (field.isNull())
                break;
            let fieldName = field.readPointer().readCString();
            let filedType = field.add(p_size).readPointer();
            let filedOffset = "0x" + field.add(3 * p_size).readInt().toString(16);
            let field_class = Il2Cpp.Api._classFromType(filedType);
            let fieldClassName = new Il2Cpp.Class(field_class).name;
            let accessStr = fackAccess(filedType);
            accessStr = accessStr.substring(0, accessStr.length - 1);
            let enumStr = (is_enum && (String(field_class) == String(klass))) ? (enumIndex++ + "\t") : " ";
            let retStr = filedOffset + "\t" + accessStr + "\t" + fieldClassName + "\t" + field_class + "\t" + fieldName + "\t" + enumStr;
            if (arguments[2] == "1" && fieldName == arguments[3])
                return ptr(filedOffset);
            if (arguments[2] == "2" && fieldName == arguments[3]) {
                let tmpValue = !instance.isNull() ? instance.add(ptr(filedOffset)) : ptr(0);
                let tmpValueR = !instance.isNull() ? instance.add(ptr(filedOffset)).readPointer() : ptr(0);
                return [fieldName, filedOffset, field_class, fieldClassName, tmpValue, tmpValueR];
            }
            arrStr.push(retStr);
            maxlength = retStr.length < maxlength ? maxlength : retStr.length;
        }
        if (arguments[2] != undefined)
            return ptr(0);
        LOGO("\n" + getLine(maxlength + 5));
        arrStr.sort((x, y) => {
            return parseInt(x.split("\t")[0]) - parseInt(y.split("\t")[0]);
        }).forEach((str, index) => {
            let mStr = str.split("\t");
            let mName = mStr[2];
            let indexStr = String("[" + index + "]");
            let indexSP = indexStr.length == 3 ? " " : "";
            let enumStr = String(mStr[5]).length == 1 ? String(mStr[5] + " ") : String(mStr[5]);
            LOG(indexStr + indexSP + " " + mStr[0] + " " + mStr[1] + " " + mStr[2] + "(" + mStr[3] + ") " + enumStr + " " + mStr[4], enum_1.LogColor.C36);
            if (typeof instance == "number")
                instance = ptr(instance);
            if (instance != undefined && str.indexOf("static") == -1) {
                let mPtr = instance.add(mStr[0]);
                let realP = mPtr.readPointer();
                let fRet = FackKnownType(mName, realP, mStr[3]);
                if (mName == "Boolean") {
                    let header = String(realP).substr(0, 2);
                    let endstr = String(realP).substr(String(realP).length - 2, String(realP).length).replace("x", "0");
                    let middle = getLine(((Process.arch == "arm" ? 10 : 14) - 2 - 2), ".");
                }
                LOG("\t" + fRet + "\n", enum_1.LogColor.C90);
            }
            else if (str.indexOf("static") != -1) {
                let field = Il2Cpp.Api._classGetFieldFromName(ptr(mStr[3]), (0, alloc_1.allocCStr)(mStr[4]));
                if (!field.isNull()) {
                    let addrOut = alloc();
                    Il2Cpp.Api._fieldGetStaticValue(field, addrOut);
                    let realP = addrOut.readPointer();
                    LOG("\t" + addrOut + " ---> " + realP + " ---> " + FackKnownType(mName, realP, mStr[3]), enum_1.LogColor.C90);
                }
                LOG("\n");
            }
        });
        LOGO(getLine(maxlength + 5));
        function fackAccess(m_type) {
            let attrs = m_type.add(p_size).readPointer();
            let outPut = "";
            let access = Number(attrs) & enum_1.FieldAccess.FIELD_ATTRIBUTE_FIELD_ACCESS_MASK;
            switch (access) {
                case enum_1.FieldAccess.FIELD_ATTRIBUTE_PRIVATE:
                    outPut += "private ";
                    break;
                case enum_1.FieldAccess.FIELD_ATTRIBUTE_PUBLIC:
                    outPut += "public ";
                    break;
                case enum_1.FieldAccess.FIELD_ATTRIBUTE_FAMILY:
                    outPut += "protected ";
                    break;
                case enum_1.FieldAccess.FIELD_ATTRIBUTE_ASSEMBLY:
                case enum_1.FieldAccess.FIELD_ATTRIBUTE_FAM_AND_ASSEM:
                    outPut += "internal ";
                    break;
                case enum_1.FieldAccess.FIELD_ATTRIBUTE_FAM_OR_ASSEM:
                    outPut += "protected internal ";
                    break;
            }
            if (Number(attrs) & enum_1.FieldAccess.FIELD_ATTRIBUTE_LITERAL) {
                outPut += "const ";
            }
            else {
                if (Number(attrs) & enum_1.FieldAccess.FIELD_ATTRIBUTE_STATIC) {
                    outPut += "static ";
                }
                if (Number(attrs) & enum_1.FieldAccess.FIELD_ATTRIBUTE_INIT_ONLY) {
                    outPut += "readonly ";
                }
            }
            return outPut;
        }
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
function FackKnownType(...args) {
}
const find_method = HookerBase.findMethodSync;
exports.find_method = find_method;
Reflect.set(globalThis, "Hooker", HookerBase);
globalThis.i = HookerBase.showImages;
globalThis.c = HookerBase.showClasses;
globalThis.m = HookerBase.showMethods;
globalThis.f = HookerBase.showFields;
globalThis.F = HookerBase.listFieldsFromCls;
globalThis.fc = HookerBase.findClass;
globalThis.findClass = HookerBase.findClass;
globalThis.findMethod = HookerBase.findMethodNew;
globalThis.find_method = HookerBase.findMethodSync;
globalThis.af = (className) => B(findClass(className));
globalThis.aui = () => B("AUI");
Il2Cpp.perform(() => globalThis.soAddr = Il2Cpp.module.base);
},{"../bridge/fix/Il2cppClass":11,"../bridge/fix/il2cppMethod":13,"../utils/alloc":146,"../utils/formart":152,"./enum":5,"decorator-cache-getter":157}],4:[function(require,module,exports){
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
var CommonClass = ["Assembly-CSharp", "MaxSdk.Scripts", "Game", "Zenject", "UniRx", "Purchasing.Common", "UnityEngine.Purchasing"];
class Breaker {
    static maxCallTimes = 10;
    static detachTimes = 500;
    static map_attachedMethodInfos = new Map();
    static map_methodInfo_callTimes = new Map();
    static array_methodInfo_detached = new Array();
    static array_attach_failed = new Array();
    static array_methodValue_cache = new Array();
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
            if (base_1.HookerBase._list_images_names.toString().includes(imgOrClsPtr)) {
                base_1.HookerBase._list_images.forEach((image) => {
                    if (image.name.includes(imgOrClsPtr)) {
                        formart_1.formartClass.printTitile("Found : ImageName: " + imgOrClsPtr + " at " + image.handle);
                        innerImage(image.handle);
                    }
                });
            }
            else {
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
            }
            else if ("AUI") {
                innerImage(Il2Cpp.Domain.assembly("Assembly-CSharp").image.handle);
                setTimeout(() => h("Update"), 3000);
            }
            else if (type == "Soon") {
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
    static attachMethodInfo(method, detailLog = false) {
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
                    if (!detailLog) {
                        let cacheID = `[${++Breaker.callTimesInline}|${new Date().toLocaleTimeString().split(" ")[0]}]`;
                        this.passValue = new valueResolve_1.default(cacheID, method).setArgs(args);
                        return LOGD(this.passValue.toString());
                    }
                    else {
                        let tmp_content = [];
                        if (!method.isStatic) {
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
                    if (!detailLog && this.passValue != undefined) {
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
                LOGH("Called from " + mPtr + " ---> " + mPtr.sub(soAddr) + "\t|  LR : " + checkCtx(getPlatformCtx(this.context)) + "\n");
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
                LOGH("Called from " + mPtr + " ---> " + mPtr.sub(soAddr) + "\t|  LR : " + checkCtx(getPlatformCtx(this.context)) + "\n");
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
    static printHistoryNum = (start = 0, end = 100, detachAll = false) => {
        if (detachAll)
            D();
        Breaker.array_methodValue_cache.slice(start, end).forEach(LOGD);
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
globalThis.hn = Breaker.printHistoryNum;
globalThis.b = (mPtr) => {
    if (typeof mPtr == "number")
        mPtr = ptr(mPtr);
    try {
        new Il2Cpp.Method(mPtr).name;
        if (mPtr instanceof Il2Cpp.Method)
            return Breaker.attachMethodInfo(mPtr, true);
        Breaker.attachMethodInfo(new Il2Cpp.Method(mPtr), true);
    }
    catch (error) {
        Breaker.breakWithArgs(mPtr);
    }
};
globalThis.printDesertedMethods = Breaker.printDesertedMethods;
globalThis.BF = (filterStr) => {
    if (typeof filterStr != "string")
        return;
    DD();
    base_1.HookerBase._list_images.forEach((image) => {
        if (CommonClass.includes(image.assembly.name)) {
            image.classes.flatMap((cls) => cls.methods).forEach((mPtr) => {
                if (mPtr.name.indexOf(filterStr) != -1)
                    Breaker.attachMethodInfo(mPtr, false);
            });
        }
    });
};
},{"../bridge/fix/il2cppMethod":13,"../utils/formart":152,"./base":3,"./valueResolve":9,"fastest-levenshtein":158}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADS_TYPE = exports.LogColor = exports.FieldAccess = exports.il2cppTabledefs = exports.ArrKAY = exports.MapKAY = exports.GKEY = exports.EpFunc = exports.TYPE_STR = void 0;
var TYPE_STR;
(function (TYPE_STR) {
    TYPE_STR[TYPE_STR["U_STR"] = 0] = "U_STR";
    TYPE_STR[TYPE_STR["C_STR"] = 1] = "C_STR";
})(TYPE_STR = exports.TYPE_STR || (exports.TYPE_STR = {}));
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
var MapKAY;
(function (MapKAY) {
    MapKAY[MapKAY["map_attach_listener"] = 0] = "map_attach_listener";
    MapKAY[MapKAY["map_find_class_cache"] = 1] = "map_find_class_cache";
    MapKAY[MapKAY["map_find_method_cache"] = 2] = "map_find_method_cache";
    MapKAY[MapKAY["outFilterMap"] = 3] = "outFilterMap";
    MapKAY[MapKAY["CommonCache"] = 4] = "CommonCache";
})(MapKAY = exports.MapKAY || (exports.MapKAY = {}));
var ArrKAY;
(function (ArrKAY) {
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
let MAP_EXPORT_ADDRESS = new Map();
const GET_A = (typeEp) => MAP_EXPORT_ADDRESS.get(typeEp);
exports.GET_A = GET_A;
const SET_A = (typeEp, mPtr) => MAP_EXPORT_ADDRESS.set(typeEp, mPtr);
exports.SET_A = SET_A;
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
globalThis.patch = (mPtr, size = 1) => {
    console.log('patch');
    mPtr = checkPointer(mPtr);
    Memory.patchCode(mPtr, Process.pageSize * size, (code) => {
        LOGD(code);
        let writer = new ArmWriter(code);
        writer.putLabel('start');
        writer.putNop();
        writer.putCallAddressWithArguments(Module.findExportByName("libil2cpp.so", "il2cpp_string_new"), ['r10', 0x10]);
        LOGD(writer.base + " " + writer.pc + " " + writer.offset + " " + writer.code);
        writer.putBlxReg('lr');
        writer.putBCondLabel("eq", 'start');
        writer.flush();
    });
};
globalThis.watch = (mPtr) => {
    class MenRange {
        base;
        size;
        constructor(base, size = 0x10) {
            this.base = checkPointer(base);
            this.size = size;
        }
    }
    class MemoryDetails {
        operation;
        from;
        address;
        rangeIndex;
        pageIndex;
        pagesCompleted;
        pagesTotal;
        mdFrom;
        mdAddress;
        constructor(detail) {
            this.operation = detail.operation;
            this.from = detail.from;
            this.address = detail.address;
            this.rangeIndex = detail.rangeIndex;
            this.pageIndex = detail.pageIndex;
            this.pagesCompleted = detail.pagesCompleted;
            this.pagesTotal = detail.pagesTotal;
            this.mdAddress = Process.findModuleByAddress(this.address);
            this.mdFrom = Process.findModuleByAddress(this.from);
        }
        tostring() {
            return `
operation:\t\t${this.operation}
from:\t\t\t${this.from} { ${this.from.sub(this.mdFrom.base)} @ ${this.mdFrom.name} }
address:\t\t${this.address} { ${this.address.sub(this.mdAddress.base)} @ ${this.mdAddress.name} }
rangeIndex:\t\t${this.rangeIndex}
pageIndex:\t\t${this.pageIndex}
pagesCompleted:\t\t${this.pagesCompleted}
pagesTotal:\t\t${this.pagesTotal}`;
        }
    }
    MemoryAccessMonitor.enable(new MenRange(mPtr), {
        onAccess: (access) => {
            LOGD(new MemoryDetails(access).tostring());
        }
    });
};
globalThis.watchDisabled = () => {
    MemoryAccessMonitor.disable();
};
},{}],9:[function(require,module,exports){
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
        if (value == undefined || value.length === 0 || value.length < this.method.parameterCount)
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
        let append = "";
        let length = String(this.method.class.handle).length + 1;
        try {
            append += ",";
            append += formart_1.formartClass.alignStr(String(this.args[0]), length, " ");
        }
        catch {
            append += "  ";
            append += formart_1.formartClass.getLine(length, " ");
        }
        let classInfo = `${formart_1.formartClass.alignStr(this.method.class.name, 18)}(${this.method.class.handle}${append.trim()})`;
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
                    return ret;
                }
            }
        }
    };
}
exports.default = ValueResolve;
},{"../bridge/fix/il2cppMethod":13,"../expand/TypeExtends/mscorlibObj/Object/class":85,"../expand/TypeExtends/mscorlibObj/ValueType/Color/class":118,"../utils/formart":152,"../utils/reader":155}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Reflect.defineProperty(Il2Cpp.Class, "prettyString", {
    value: function () {
        var proto = Il2Cpp.Class.prototype;
        return `${proto.isEnum ? `enum` : proto.isValueType ? `struct` : proto.isInterface ? `interface` : `class`}`;
    }
});
},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.methodToString = exports.methodToArray = exports.getMethodDesFromMethodPtr = exports.getMethodModifier = void 0;
const enum_1 = require("../../base/enum");
const getMethodModifier = (methodPtr) => {
    if (typeof methodPtr == "number")
        methodPtr = ptr(methodPtr);
    let localMethod;
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
    function getArrayFromMethod(method) {
        let cache = map_cache_method_des.get(method);
        if (cache != undefined)
            return cache;
        let ret_arr = [];
        ret_arr.push(method.handle);
        ret_arr.push(method.virtualAddress);
        ret_arr.push(method.virtualAddress.isNull() ? ptr(0) : method.relativeVirtualAddress);
        ret_arr.push((0, exports.getMethodDesFromMethodPtr)(method));
        ret_arr.push(method.class.handle);
        ret_arr.push(method.class.name);
        map_cache_method_des.set(method, ret_arr);
        return ret_arr;
    }
};
exports.methodToArray = methodToArray;
const methodToString = (method, simple = false) => {
    let arr = (0, exports.methodToArray)(method);
    if (arr == undefined)
        throw new Error("methodToString: methodToArray return undefined");
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
},{"../../base/enum":5}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./apiExtends/apiExtends");
require("./mscorlibObj/include");
require("./thread/_include");
},{"./apiExtends/apiExtends":15,"./mscorlibObj/include":125,"./thread/_include":127}],15:[function(require,module,exports){
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
},{}],16:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointerEventDataAPI = void 0;
const decorator_cache_getter_1 = require("decorator-cache-getter");
class PointerEventDataAPI {
    static get _ctor_1() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", ".ctor", 1, "void", ["pointer"]);
    }
    static get _IsPointerMoving() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "IsPointerMoving", 0, "bool", ["pointer"]);
    }
    static get _IsScrolling() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "IsScrolling", 0, "bool", ["pointer"]);
    }
    static get _ToString() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "ToString", 0, "pointer", ["pointer"]);
    }
    static get _set_button() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "set_button", 1, "void", ["pointer", "pointer"]);
    }
    static get _get_button() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_button", 0, "pointer", ["pointer"]);
    }
    static get _set_clickCount() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "set_clickCount", 1, "void", ["pointer", "int"]);
    }
    static get _get_clickCount() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_clickCount", 0, "int", ["pointer"]);
    }
    static get _set_clickTime() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "set_clickTime", 1, "void", ["pointer", "int"]);
    }
    static get _get_clickTime() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_clickTime", 0, "int", ["pointer"]);
    }
    static get _set_delta() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "set_delta", 1, "void", ["pointer", "pointer"]);
    }
    static get _get_delta() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_delta", 0, "pointer", ["pointer"]);
    }
    static get _set_dragging() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "set_dragging", 1, "void", ["pointer", "bool"]);
    }
    static get _get_dragging() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_dragging", 0, "bool", ["pointer"]);
    }
    static get _set_eligibleForClick() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "set_eligibleForClick", 1, "void", ["pointer", "bool"]);
    }
    static get _get_eligibleForClick() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_eligibleForClick", 0, "bool", ["pointer"]);
    }
    static get _set_pointerId() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "set_pointerId", 1, "void", ["pointer", "int"]);
    }
    static get _get_pointerId() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_pointerId", 0, "int", ["pointer"]);
    }
    static get _set_pointerPress() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "set_pointerPress", 1, "void", ["pointer", "pointer"]);
    }
    static get _get_pointerPress() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_pointerPress", 0, "pointer", ["pointer"]);
    }
    static get _set_pointerPressRaycast() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "set_pointerPressRaycast", 1, "void", ["pointer", "pointer"]);
    }
    static get _get_pointerPressRaycast() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_pointerPressRaycast", 0, "pointer", ["pointer"]);
    }
    static get _set_position() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "set_position", 1, "void", ["pointer", "pointer"]);
    }
    static get _get_position() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_position", 0, "pointer", ["pointer"]);
    }
    static get _get_pressEventCamera() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_pressEventCamera", 0, "pointer", ["pointer"]);
    }
    static get _set_pressPosition() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "set_pressPosition", 1, "void", ["pointer", "pointer"]);
    }
    static get _get_pressPosition() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_pressPosition", 0, "pointer", ["pointer"]);
    }
    static get _set_rawPointerPress() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "set_rawPointerPress", 1, "void", ["pointer", "pointer"]);
    }
    static get _get_rawPointerPress() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_rawPointerPress", 0, "pointer", ["pointer"]);
    }
    static get _set_scrollDelta() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "set_scrollDelta", 1, "void", ["pointer", "pointer"]);
    }
    static get _get_scrollDelta() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_scrollDelta", 0, "pointer", ["pointer"]);
    }
    static get _set_useDragThreshold() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "set_useDragThreshold", 1, "void", ["pointer", "bool"]);
    }
    static get _get_useDragThreshold() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_useDragThreshold", 0, "bool", ["pointer"]);
    }
    static get _set_worldNormal() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "set_worldNormal", 1, "void", ["pointer", "pointer"]);
    }
    static get _get_worldNormal() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_worldNormal", 0, "pointer", ["pointer"]);
    }
    static get _set_worldPosition() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "set_worldPosition", 1, "void", ["pointer", "pointer"]);
    }
    static get _get_worldPosition() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_worldPosition", 0, "pointer", ["pointer"]);
    }
    static get _get_enterEventCamera() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_enterEventCamera", 1, "void", ["pointer", "pointer"]);
    }
    static get _get_pointerCurrentRaycast() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_pointerCurrentRaycast", 0, "pointer", ["pointer"]);
    }
    static get _set_pointerCurrentRaycast() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "set_pointerCurrentRaycast", 1, "void", ["pointer", "pointer"]);
    }
    static get _get_pointerEnter() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_pointerEnter", 0, "pointer", ["pointer"]);
    }
    static get _set_pointerEnter() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "set_pointerEnter", 1, "void", ["pointer", "pointer"]);
    }
    static get _get_pointerDrag() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_pointerDrag", 0, "pointer", ["pointer"]);
    }
    static get _set_lastPress() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "set_lastPress", 1, "void", ["pointer", "pointer"]);
    }
    static get _get_lastPress() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_lastPress", 0, "pointer", ["pointer"]);
    }
}
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_ctor_1", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_IsPointerMoving", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_IsScrolling", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_ToString", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_set_button", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_get_button", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_set_clickCount", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_get_clickCount", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_set_clickTime", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_get_clickTime", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_set_delta", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_get_delta", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_set_dragging", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_get_dragging", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_set_eligibleForClick", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_get_eligibleForClick", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_set_pointerId", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_get_pointerId", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_set_pointerPress", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_get_pointerPress", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_set_pointerPressRaycast", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_get_pointerPressRaycast", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_set_position", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_get_position", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_get_pressEventCamera", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_set_pressPosition", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_get_pressPosition", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_set_rawPointerPress", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_get_rawPointerPress", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_set_scrollDelta", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_get_scrollDelta", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_set_useDragThreshold", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_get_useDragThreshold", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_set_worldNormal", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_get_worldNormal", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_set_worldPosition", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_get_worldPosition", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_get_enterEventCamera", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_get_pointerCurrentRaycast", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_set_pointerCurrentRaycast", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_get_pointerEnter", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_set_pointerEnter", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_get_pointerDrag", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_set_lastPress", null);
__decorate([
    decorator_cache_getter_1.cache
], PointerEventDataAPI, "_get_lastPress", null);
exports.PointerEventDataAPI = PointerEventDataAPI;
Il2Cpp.Api.PointerEventData = PointerEventDataAPI;
},{"decorator-cache-getter":157}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointerEventImpl = void 0;
const class_1 = require("../class");
class PointerEventImpl extends class_1.BaseEventDataImpl {
    ctor_11(eventSystem) {
        return new PointerEventImpl(Il2Cpp.Api.PointerEventData._ctor_1(alloc(), eventSystem));
    }
    IsPointerMoving() {
        return Il2Cpp.Api.PointerEventData._IsPointerMoving(this.handle);
    }
    IsScrolling() {
        return Il2Cpp.Api.PointerEventData._IsScrolling(this.handle);
    }
    toString() {
        return Il2Cpp.Api.PointerEventData._ToString(this.handle);
    }
    set_button(button) {
        return Il2Cpp.Api.PointerEventData._set_button(this.handle, button);
    }
    get_button() {
        return Il2Cpp.Api.PointerEventData._get_button(this.handle);
    }
    set_clickCount(clickCount) {
        return Il2Cpp.Api.PointerEventData._set_clickCount(this.handle, clickCount);
    }
    get_clickCount() {
        return Il2Cpp.Api.PointerEventData._get_clickCount(this.handle);
    }
    set_clickTime(clickTime) {
        return Il2Cpp.Api.PointerEventData._set_clickTime(this.handle, clickTime);
    }
    get_clickTime() {
        return Il2Cpp.Api.PointerEventData._get_clickTime(this.handle);
    }
    set_delta(delta) {
        return Il2Cpp.Api.PointerEventData._set_delta(this.handle, delta);
    }
    get_delta() {
        return Il2Cpp.Api.PointerEventData._get_delta(this.handle);
    }
    set_dragging(dragging) {
        return Il2Cpp.Api.PointerEventData._set_dragging(this.handle, dragging);
    }
    get_dragging() {
        return Il2Cpp.Api.PointerEventData._get_dragging(this.handle);
    }
    set_eligibleForClick(eligibleForClick) {
        return Il2Cpp.Api.PointerEventData._set_eligibleForClick(this.handle, eligibleForClick);
    }
    get_eligibleForClick() {
        return Il2Cpp.Api.PointerEventData._get_eligibleForClick(this.handle);
    }
    get_enterEventCamera() {
        return Il2Cpp.Api.PointerEventData._get_enterEventCamera(this.handle);
    }
    set_pointerCurrentRaycast(pointerCurrentRaycast) {
        return Il2Cpp.Api.PointerEventData._set_pointerCurrentRaycast(this.handle, pointerCurrentRaycast);
    }
    get_pointerCurrentRaycast() {
        return Il2Cpp.Api.PointerEventData._get_pointerCurrentRaycast(this.handle);
    }
    set_lastPress(lastPress) {
        return Il2Cpp.Api.PointerEventData._set_lastPress(this.handle, lastPress);
    }
    get_lastPress() {
        return new Il2Cpp.GameObject(Il2Cpp.Api.PointerEventData._get_lastPress(this.handle));
    }
    set_pointerDrag(pointerDrag) {
        return Il2Cpp.Api.PointerEventData._set_pointerEnter(this.handle, pointerDrag);
    }
    get_pointerDrag() {
        return new Il2Cpp.GameObject(Il2Cpp.Api.PointerEventData._get_pointerDrag(this.handle));
    }
    set_pointerEnter(pointerEnter) {
        return Il2Cpp.Api.PointerEventData._set_pointerEnter(this.handle, pointerEnter);
    }
    get_pointerEnter() {
        return new Il2Cpp.GameObject(Il2Cpp.Api.PointerEventData._get_pointerEnter(this.handle));
    }
    set_pointerId(pointerId) {
        return Il2Cpp.Api.PointerEventData._set_pointerId(this.handle, pointerId);
    }
    get_pointerId() {
        return Il2Cpp.Api.PointerEventData._get_pointerId(this.handle);
    }
    set_pointerPress(pointerPress) {
        return Il2Cpp.Api.PointerEventData._set_pointerPress(this.handle, pointerPress);
    }
    get_pointerPress() {
        return new Il2Cpp.GameObject(Il2Cpp.Api.PointerEventData._get_pointerPress(this.handle));
    }
    set_pointerPressRaycast(pointerPressRaycast) {
        return Il2Cpp.Api.PointerEventData._set_pointerPressRaycast(this.handle, pointerPressRaycast);
    }
    get_pointerPressRaycast() {
        return Il2Cpp.Api.PointerEventData._get_pointerPressRaycast(this.handle);
    }
    set_position(position) {
        return Il2Cpp.Api.PointerEventData._set_position(this.handle, position);
    }
    get_position() {
        return Il2Cpp.Api.PointerEventData._get_position(this.handle);
    }
    get_pressEventCamera() {
        return Il2Cpp.Api.PointerEventData._get_pressEventCamera(this.handle);
    }
    set_pressPosition(pressPosition) {
        return Il2Cpp.Api.PointerEventData._set_pressPosition(this.handle, pressPosition);
    }
    get_pressPosition() {
        return Il2Cpp.Api.PointerEventData._get_pressPosition(this.handle);
    }
    set_rawPointerPress(rawPointerPress) {
        return Il2Cpp.Api.PointerEventData._set_rawPointerPress(this.handle, rawPointerPress);
    }
    get_rawPointerPress() {
        return new Il2Cpp.GameObject(Il2Cpp.Api.PointerEventData._get_rawPointerPress(this.handle));
    }
    set_scrollDelta(scrollDelta) {
        return Il2Cpp.Api.PointerEventData._set_scrollDelta(this.handle, scrollDelta);
    }
    get_scrollDelta() {
        return Il2Cpp.Api.PointerEventData._get_scrollDelta(this.handle);
    }
    set_useDragThreshold(useDragThreshold) {
        return Il2Cpp.Api.PointerEventData._set_useDragThreshold(this.handle, useDragThreshold);
    }
    get_useDragThreshold() {
        return Il2Cpp.Api.PointerEventData._get_useDragThreshold(this.handle);
    }
    set_worldNormal(worldNormal) {
        return Il2Cpp.Api.PointerEventData._set_worldNormal(this.handle, worldNormal);
    }
    get_worldNormal() {
        return Il2Cpp.Api.PointerEventData._get_worldNormal(this.handle);
    }
    set_worldPosition(worldPosition) {
        return Il2Cpp.Api.PointerEventData._set_worldPosition(this.handle, worldPosition);
    }
    get_worldPosition() {
        return Il2Cpp.Api.PointerEventData._get_worldPosition(this.handle);
    }
}
exports.PointerEventImpl = PointerEventImpl;
},{"../class":22}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showEventData = void 0;
const class_1 = require("./class");
const showEventData = (eventData) => {
    LOGO(`${getLine(15)} EventData ${getLine(15)}`);
    let eventDataPack = new class_1.PointerEventImpl(eventData);
    let click_vector2 = allocVector();
    callFunction(find_method("UnityEngine.UI", "PointerEventData", "get_position", 0), click_vector2, eventData);
    LOGD("ClickPositon\t--->\t" + click_vector2.readFloat() + "\t" + click_vector2.add(p_size).readFloat());
    LOGD("clickTime\t--->\t" + eventDataPack.get_clickTime());
    LOGD("clickCount\t--->\t" + eventDataPack.get_clickCount());
    let delta_vector2 = allocVector();
    callFunction(find_method("UnityEngine.UI", "PointerEventData", "get_delta", 0), allocVector(), eventData);
    LOGD("delta\t\t--->\t" + delta_vector2.readFloat() + "\t" + delta_vector2.add(p_size).readFloat());
};
exports.showEventData = showEventData;
globalThis.showEventData = showEventData;
},{"./class":17}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./api");
require("./class");
require("./interface");
require("./export");
},{"./api":16,"./class":17,"./export":18,"./interface":20}],20:[function(require,module,exports){
"use strict";
},{}],21:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEventDataAPI = void 0;
const decorator_cache_getter_1 = require("decorator-cache-getter");
class BaseEventDataAPI {
    static get _ctor_1() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.BaseEventData", ".ctor", 1, "void", ["pointer", "pointer"]);
    }
    static get _get_currentInputModule() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.BaseEventData", "get_currentInputModule", 0, "pointer", ["pointer"]);
    }
    static get _set_selectedObject() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.BaseEventData", "set_selectedObject", 1, "void", ["pointer", "pointer"]);
    }
    static get _get_selectedObject() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.BaseEventData", "get_selectedObject", 0, "pointer", ["pointer"]);
    }
}
__decorate([
    decorator_cache_getter_1.cache
], BaseEventDataAPI, "_ctor_1", null);
__decorate([
    decorator_cache_getter_1.cache
], BaseEventDataAPI, "_get_currentInputModule", null);
__decorate([
    decorator_cache_getter_1.cache
], BaseEventDataAPI, "_set_selectedObject", null);
__decorate([
    decorator_cache_getter_1.cache
], BaseEventDataAPI, "_get_selectedObject", null);
exports.BaseEventDataAPI = BaseEventDataAPI;
Il2Cpp.Api.BaseEventData = BaseEventDataAPI;
},{"decorator-cache-getter":157}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEventDataImpl = void 0;
const class_1 = require("../../class");
const class_2 = require("../../Object/GameObject/class");
class BaseEventDataImpl extends class_1.mscorlib_System_Object_impl {
    ctor_1() {
        return new BaseEventDataImpl(Il2Cpp.Api.BaseEventData._ctor_1(alloc()));
    }
    get_currentInputModule() {
        return Il2Cpp.Api.BaseEventData._get_currentInputModule(this.handle);
    }
    set_selectedObject(gameObject) {
        return Il2Cpp.Api.BaseEventData._set_selectedObject(this.handle, gameObject.handle);
    }
    get_selectedObject() {
        return new class_2.GameObjectImpl(Il2Cpp.Api.BaseEventData._get_selectedObject(this.handle));
    }
}
exports.BaseEventDataImpl = BaseEventDataImpl;
},{"../../Object/GameObject/class":75,"../../class":124}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./PointerEventData/include");
require("./api");
require("./class");
require("./interface");
},{"./PointerEventData/include":19,"./api":21,"./class":22,"./interface":24}],24:[function(require,module,exports){
"use strict";
},{}],25:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractEventDataAPI = void 0;
const decorator_cache_getter_1 = require("decorator-cache-getter");
class AbstractEventDataAPI {
    static get _ctor_0() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.AbstractEventData", ".ctor", 0, "void", ["pointer"]);
    }
    static get _Reset() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.AbstractEventData", "Reset", 0, "void", ["pointer"]);
    }
    static get _Use() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.AbstractEventData", "Use", 0, "void", ["pointer"]);
    }
    static get _get_used() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.AbstractEventData", "get_used", 0, "bool", ["pointer"]);
    }
}
__decorate([
    decorator_cache_getter_1.cache
], AbstractEventDataAPI, "_ctor_0", null);
__decorate([
    decorator_cache_getter_1.cache
], AbstractEventDataAPI, "_Reset", null);
__decorate([
    decorator_cache_getter_1.cache
], AbstractEventDataAPI, "_Use", null);
__decorate([
    decorator_cache_getter_1.cache
], AbstractEventDataAPI, "_get_used", null);
exports.AbstractEventDataAPI = AbstractEventDataAPI;
Il2Cpp.Api.AbstractEventData = AbstractEventDataAPI;
},{"decorator-cache-getter":157}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractEventDataImpl = void 0;
const class_1 = require("../class");
class AbstractEventDataImpl extends class_1.mscorlib_System_Object_impl {
    ctor_0() {
        return new AbstractEventDataImpl(Il2Cpp.Api.AbstractEventData._ctor_0(alloc()));
    }
    Reset() {
        return Il2Cpp.Api.AbstractEventData._Reset(this.handle);
    }
    Use() {
        return Il2Cpp.Api.AbstractEventData._Use(this.handle);
    }
    get_used() {
        return Il2Cpp.Api.AbstractEventData._get_used(this.handle);
    }
}
exports.AbstractEventDataImpl = AbstractEventDataImpl;
},{"../class":124}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./BaseEventData/include");
require("./api");
require("./class");
require("./interface");
},{"./BaseEventData/include":23,"./api":25,"./class":26,"./interface":28}],28:[function(require,module,exports){
"use strict";
},{}],29:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_cache_getter_1 = require("decorator-cache-getter");
class DebugAPI {
    static get _cctor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", ".cctor", 0, "pointer", ["pointer"]);
    }
    static get Break() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "Break", 0, "void", ["void"]);
    }
    static get DrawLine_3() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "DrawLine", 3, "void", ["pointer", "pointer", "pointer"]);
    }
    static get DrawLine_4() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "DrawLine", 4, "void", ["pointer", "pointer", "pointer", "float"]);
    }
    static get DrawLine_5() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "DrawLine", 5, "void", ["pointer", "pointer", "pointer", "float", "bool"]);
    }
    static get DrawRay_3() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "DrawRay", 3, "void", ["pointer", "pointer", "float"]);
    }
    static get DrawRay_4() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "DrawRay", 4, "void", ["pointer", "pointer", "float", "bool"]);
    }
    static get Log_1() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "Log", 1, "void", ["pointer"]);
    }
    static get Log_2() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "Log", 2, "void", ["pointer", "pointer"]);
    }
    static get LogAssertion_1() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "LogAssertion", 1, "void", ["pointer"]);
    }
    static get LogError_1() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "LogError", 1, "void", ["pointer"]);
    }
    static get LogError_2() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "LogError", 2, "void", ["pointer", "pointer"]);
    }
    static get LogErrorFormat_2() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "LogErrorFormat", 2, "void", ["pointer", "pointer"]);
    }
    static get LogException_1() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "LogException", 1, "void", ["pointer"]);
    }
    static get LogException_2() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "LogException", 2, "void", ["pointer", "pointer"]);
    }
    static get LogFormat_2() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "LogFormat", 2, "void", ["pointer", "pointer"]);
    }
    static get LogWarning_1() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "LogWarning", 1, "void", ["pointer"]);
    }
    static get LogWarning_2() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "LogWarning", 2, "void", ["pointer", "pointer"]);
    }
    static get LogWarningFormat_2() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "LogWarningFormat", 2, "void", ["pointer", "pointer"]);
    }
    static get get_isDebugBuild() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "get_isDebugBuild", 0, "bool", ["void"]);
    }
    static get get_unityLogger() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "get_unityLogger", 0, "pointer", ["void"]);
    }
}
__decorate([
    decorator_cache_getter_1.cache
], DebugAPI, "_cctor", null);
__decorate([
    decorator_cache_getter_1.cache
], DebugAPI, "Break", null);
__decorate([
    decorator_cache_getter_1.cache
], DebugAPI, "DrawLine_3", null);
__decorate([
    decorator_cache_getter_1.cache
], DebugAPI, "DrawLine_4", null);
__decorate([
    decorator_cache_getter_1.cache
], DebugAPI, "DrawLine_5", null);
__decorate([
    decorator_cache_getter_1.cache
], DebugAPI, "DrawRay_3", null);
__decorate([
    decorator_cache_getter_1.cache
], DebugAPI, "DrawRay_4", null);
__decorate([
    decorator_cache_getter_1.cache
], DebugAPI, "Log_1", null);
__decorate([
    decorator_cache_getter_1.cache
], DebugAPI, "Log_2", null);
__decorate([
    decorator_cache_getter_1.cache
], DebugAPI, "LogAssertion_1", null);
__decorate([
    decorator_cache_getter_1.cache
], DebugAPI, "LogError_1", null);
__decorate([
    decorator_cache_getter_1.cache
], DebugAPI, "LogError_2", null);
__decorate([
    decorator_cache_getter_1.cache
], DebugAPI, "LogErrorFormat_2", null);
__decorate([
    decorator_cache_getter_1.cache
], DebugAPI, "LogException_1", null);
__decorate([
    decorator_cache_getter_1.cache
], DebugAPI, "LogException_2", null);
__decorate([
    decorator_cache_getter_1.cache
], DebugAPI, "LogFormat_2", null);
__decorate([
    decorator_cache_getter_1.cache
], DebugAPI, "LogWarning_1", null);
__decorate([
    decorator_cache_getter_1.cache
], DebugAPI, "LogWarning_2", null);
__decorate([
    decorator_cache_getter_1.cache
], DebugAPI, "LogWarningFormat_2", null);
__decorate([
    decorator_cache_getter_1.cache
], DebugAPI, "get_isDebugBuild", null);
__decorate([
    decorator_cache_getter_1.cache
], DebugAPI, "get_unityLogger", null);
Il2Cpp.Api.Debug = DebugAPI;
},{"decorator-cache-getter":157}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HookDebugLog = void 0;
const HookDebugLog = () => {
    let addr_Log = find_method("UnityEngine.CoreModule", "Logger", "Log", 2, true);
    LOG("[*] Hook : UnityEngine.CoreModule.Logger.Log : " + addr_Log);
    A(addr_Log, (args, ctx) => {
        LOG("\n[*] Logger.LOG('" + args[1] + "\t" + readU16(args[2]) + "') LR : " + checkCtx(ctx, "LR"), LogColor.C32);
    });
    let addr_LogException = Il2Cpp.Api.Debug.LogException_2;
    LOG("[*] Hook : UnityEngine.CoreModule.Debug.LogException : " + addr_LogException);
    A(addr_LogException, (args) => {
        let retStr = callFunction(find_method("mscorlib", "Exception", "ToString", 0, true), args[0]);
        LOG("\n[*] Logger.LOG('" + readU16(retStr) + "')", LogColor.C36);
    });
};
exports.HookDebugLog = HookDebugLog;
globalThis.HookDebugLog = HookDebugLog;
},{}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./api");
require("./export");
},{"./api":29,"./export":30}],32:[function(require,module,exports){
"use strict";
},{}],33:[function(require,module,exports){
"use strict";
},{}],34:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_cache_getter_1 = require("decorator-cache-getter");
class LoggerAPI {
    static get _cctor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", ".cctor", 1, "pointer", ["pointer", "pointer"]);
    }
    static get IsLogTypeAllowed() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "IsLogTypeAllowed", 1, "bool", ["pointer", "int"]);
    }
    static get Log_string_object() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "Log", 2, "void", ["pointer", "pointer", "pointer"]);
    }
    static get Log_logType_object() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "Log", 2, "void", ["pointer", "int", "pointer"]);
    }
    static get Log_logType_object_object() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "Log", 3, "void", ["pointer", "int", "pointer", "pointer"]);
    }
    static get LogError_string_object() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "LogError", 2, "void", ["pointer", "pointer", "pointer"]);
    }
    static get LogException_exception() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "LogException", 1, "void", ["pointer", "pointer"]);
    }
    static get LogException_exception_object() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "LogException", 2, "void", ["pointer", "pointer", "pointer"]);
    }
    static get LogFormat_logType_string_object() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "LogFormat", 3, "void", ["pointer", "int", "pointer", "pointer"]);
    }
    static get LogFormat_logType_object_string_object() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "LogFormat", 4, "void", ["pointer", "int", "pointer", "pointer", "pointer"]);
    }
    static get LogWarning_string_object() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "LogWarning", 2, "void", ["pointer", "pointer", "pointer"]);
    }
    static get set_filterLogType() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "set_filterLogType", 1, "void", ["pointer", "int"]);
    }
    static get get_filterLogType() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "get_filterLogType", 0, "int", ["pointer"]);
    }
    static get set_logEnabled() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "set_logEnabled", 1, "void", ["pointer", "bool"]);
    }
    static get get_logEnabled() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "get_logEnabled", 0, "bool", ["pointer"]);
    }
    static get set_logHandler() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "set_logHandler", 1, "void", ["pointer", "pointer"]);
    }
    static get get_logHandler() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "get_logHandler", 0, "pointer", ["pointer"]);
    }
}
__decorate([
    decorator_cache_getter_1.cache
], LoggerAPI, "_cctor", null);
__decorate([
    decorator_cache_getter_1.cache
], LoggerAPI, "IsLogTypeAllowed", null);
__decorate([
    decorator_cache_getter_1.cache
], LoggerAPI, "Log_string_object", null);
__decorate([
    decorator_cache_getter_1.cache
], LoggerAPI, "Log_logType_object", null);
__decorate([
    decorator_cache_getter_1.cache
], LoggerAPI, "Log_logType_object_object", null);
__decorate([
    decorator_cache_getter_1.cache
], LoggerAPI, "LogError_string_object", null);
__decorate([
    decorator_cache_getter_1.cache
], LoggerAPI, "LogException_exception", null);
__decorate([
    decorator_cache_getter_1.cache
], LoggerAPI, "LogException_exception_object", null);
__decorate([
    decorator_cache_getter_1.cache
], LoggerAPI, "LogFormat_logType_string_object", null);
__decorate([
    decorator_cache_getter_1.cache
], LoggerAPI, "LogFormat_logType_object_string_object", null);
__decorate([
    decorator_cache_getter_1.cache
], LoggerAPI, "LogWarning_string_object", null);
__decorate([
    decorator_cache_getter_1.cache
], LoggerAPI, "set_filterLogType", null);
__decorate([
    decorator_cache_getter_1.cache
], LoggerAPI, "get_filterLogType", null);
__decorate([
    decorator_cache_getter_1.cache
], LoggerAPI, "set_logEnabled", null);
__decorate([
    decorator_cache_getter_1.cache
], LoggerAPI, "get_logEnabled", null);
__decorate([
    decorator_cache_getter_1.cache
], LoggerAPI, "set_logHandler", null);
__decorate([
    decorator_cache_getter_1.cache
], LoggerAPI, "get_logHandler", null);
Il2Cpp.Api.Logger = LoggerAPI;
},{"decorator-cache-getter":157}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./api");
},{"./api":34}],36:[function(require,module,exports){
"use strict";
},{}],37:[function(require,module,exports){
"use strict";
},{}],38:[function(require,module,exports){
"use strict";
},{}],39:[function(require,module,exports){
"use strict";
},{}],40:[function(require,module,exports){
"use strict";
},{}],41:[function(require,module,exports){
"use strict";
},{}],42:[function(require,module,exports){
"use strict";
},{}],43:[function(require,module,exports){
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
class ButtonAPI {
    static get _ctor() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.Button", ".ctor", 0, "pointer", ["pointer"]);
    }
    static get _OnFinishSubmit() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.Button", "OnFinishSubmit", 0, "pointer", ["pointer"]);
    }
    static get _OnPointerClick() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.Button", "OnPointerClick", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _OnSubmit() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.Button", "OnSubmit", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _Press() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.Button", "Press", 0, "pointer", ["pointer"]);
    }
    static get _set_onClick() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.Button", "set_onClick", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _get_onClick() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.Button", "get_onClick", 0, "pointer", ["pointer"]);
    }
}
__decorate([
    decorator_cache_getter_1.cache
], ButtonAPI, "_ctor", null);
__decorate([
    decorator_cache_getter_1.cache
], ButtonAPI, "_OnFinishSubmit", null);
__decorate([
    decorator_cache_getter_1.cache
], ButtonAPI, "_OnPointerClick", null);
__decorate([
    decorator_cache_getter_1.cache
], ButtonAPI, "_OnSubmit", null);
__decorate([
    decorator_cache_getter_1.cache
], ButtonAPI, "_Press", null);
__decorate([
    decorator_cache_getter_1.cache
], ButtonAPI, "_set_onClick", null);
__decorate([
    decorator_cache_getter_1.cache
], ButtonAPI, "_get_onClick", null);
Il2Cpp.Api.Button = ButtonAPI;
},{"./interface":47,"decorator-cache-getter":157}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonImpl = void 0;
const class_1 = require("../class");
class ButtonImpl extends class_1.SelectableImpl {
    ctor_0() {
        return new ButtonImpl(Il2Cpp.Api.Button._ctor(alloc()));
    }
    OnFinishSubmit() {
        return Il2Cpp.Api.Button._OnFinishSubmit(this.handle);
    }
    OnPointerClick(PointerEventData) {
        return Il2Cpp.Api.Button._OnPointerClick(this.handle, PointerEventData);
    }
    OnSubmit(BaseEventData) {
        return Il2Cpp.Api.Button._OnSubmit(this.handle, BaseEventData);
    }
    Press() {
        return Il2Cpp.Api.Button._Press(this.handle);
    }
    get_onClick() {
        return Il2Cpp.Api.Button._get_onClick(this.handle);
    }
    set_onClick(ButtonClickedEvent) {
        return Il2Cpp.Api.Button._set_onClick(this.handle, ButtonClickedEvent);
    }
}
exports.ButtonImpl = ButtonImpl;
Il2Cpp.Button = ButtonImpl;
},{"../class":49}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HideClickedObj = exports.OnButtonClick = exports.OnPointerClick = void 0;
const class_1 = require("../../../../../../AbstractEventData/BaseEventData/PointerEventData/class");
function OnPointerClick() {
    let funcAddr = undefined;
    switch (arguments[0]) {
        default:
            funcAddr = Il2Cpp.Api.Button._OnPointerClick;
            if (funcAddr == undefined || funcAddr.isNull())
                break;
            LOGE("\nEnable Hook OnPointerClick at " + funcAddr + "(" + funcAddr.sub(soAddr) + ")" + "\n");
            A(Il2Cpp.Api.Button._OnPointerClick, (args) => {
                LOGW("\n" + getLine(38));
                LOGD("public void OnPointerClick( " + args[0] + " , " + args[1] + " );");
                FakePointerEventData(args[1]);
            });
            break;
        case 0:
            funcAddr = find_method("UnityEngine.UI", "PointerInputModule", "DeselectIfSelectionChanged", 2);
            if (funcAddr.isNull())
                break;
            LOGE("\nEnable Hook DeselectIfSelectionChanged at " + funcAddr + "(" + funcAddr.sub(soAddr) + ")" + "\n");
            A(funcAddr, (args) => {
                LOGW("\n" + getLine(38));
                LOGD("protected void DeselectIfSelectionChanged(Ins = " + args[0] + " , GameObject = " + args[1] + " , BaseEventData(" + findClass("BaseEventData") + ") = " + args[2] + " );");
                if (!args[1].isNull())
                    showGameObject(args[1]);
            });
            break;
        case 1:
            funcAddr = find_method("UnityEngine.UI", "ScrollRect", "OnInitializePotentialDrag", 1);
            if (funcAddr.isNull())
                break;
            LOGE("\nEnable Hook OnInitializePotentialDrag at " + funcAddr + "(" + funcAddr.sub(soAddr) + ")" + "\n");
            A(funcAddr, (args) => {
                LOGW("\n" + getLine(38));
                LOGD("public void OnInitializePotentialDrag( " + args[0] + " , " + args[1] + " );");
                FakePointerEventData(args[1]);
            });
            break;
        case 2:
            A(find_method("UnityEngine.UI", "PointerInputModule", "ProcessMove", 1), (args) => {
                LOGW("\n" + getLine(38));
                LOGD("protected virtual Void ProcessMove( " + (args[1]) + " );");
                FakePointerEventData(args[1]);
            });
            break;
        case 3:
            A(find_method("UnityEngine.UI", "PointerInputModule", "ProcessDrag", 1), (args) => {
                LOGW("\n" + getLine(38));
                LOGD("protected virtual Void ProcessDrag( " + (args[1]) + " );");
                FakePointerEventData(args[1]);
            });
            break;
        case 4:
            A(find_method("UnityEngine.UI", "BaseInputModule", "HandlePointerExitAndEnter", 2), (args) => {
                LOGW("\n" + getLine(38));
                LOGD("protected virtual Void HandlePointerExitAndEnter( " + (args[1]) + " , " + (args[2]) + ")");
                FakePointerEventData(args[1]);
            });
            break;
        case 5:
            A(find_method("UnityEngine.UI", "PointerEventData", "set_pointerPress", 1), (args) => {
                LOGW("\n" + getLine(38));
                LOGD("protected virtual Void set_pointerPress( " + (args[1]) + " );");
                showGameObject(args[1]);
            });
            break;
        case 6:
            A(find_method("UnityEngine.UI", "PointerInputModule", "GetPointerData", 3), (args) => {
                LOGW("\n" + getLine(38));
                LOGD("protected virtual Void GetPointerData( " + (args[2]) + " );");
                showGameObject(args[1]);
                showEventData(args[2]);
            });
            break;
        case 7:
            A(find_method("UnityEngine.UI", "EventSystem", "RaycastAll", 2), (args) => {
                LOGW("\n" + getLine(38));
                LOGD(`protected virtual Void RaycastAll( ${args[0]} , ${args[1]} , ${args[2]} );`);
                FakePointerEventData(args[1]);
            });
            break;
        case 8:
            A(find_method("UnityEngine.UI", "PointerInputModule", "GetTouchPointerEventData", 3), (args) => { }, (ret) => {
                LOGW("\n" + getLine(38));
                LOGD(`protected virtual Void GetTouchPointerEventData `);
                FakePointerEventData(ret);
            });
        case 9:
            A(find_method("UnityEngine.UI", "Selectable", "OnPointerExit", 1), (args) => {
                LOGW("\n" + getLine(38));
                LOGD("protected virtual Void OnPointerExit( " + (args[1]) + " );");
                FakePointerEventData(args[1]);
            });
            break;
    }
    function FakePointerEventData(eventData) {
        if (eventData.isNull())
            return;
        let gameObj = new class_1.PointerEventImpl(eventData).get_pointerEnter();
        if (!gameObj.handle.isNull())
            showGameObject(gameObj.handle);
    }
}
exports.OnPointerClick = OnPointerClick;
const OnButtonClick = () => {
};
exports.OnButtonClick = OnButtonClick;
const HideClickedObj = (x, y) => {
    let m_ptr = find_method("UnityEngine.UI", "Button", "OnPointerClick", 1);
    let srcFunc = new NativeFunction(m_ptr, 'void', ['pointer', 'pointer', 'pointer', 'pointer']);
    Interceptor.revert(m_ptr);
    Interceptor.replace(m_ptr, new NativeCallback(function (arg0, pointerEventData, arg2, arg3) {
        srcFunc(arg0, pointerEventData, arg2, arg3);
        if (pointerEventData.isNull())
            return;
        let gameObj = new class_1.PointerEventImpl(pointerEventData).get_pointerEnter();
        if (gameObj.get_name() === "Settings Button") {
        }
    }, 'void', ['pointer', 'pointer', 'pointer', 'pointer']));
    setClick(x, y);
};
exports.HideClickedObj = HideClickedObj;
globalThis.HookOnPointerClick = OnPointerClick;
globalThis.B_Button = OnButtonClick;
globalThis.HideClickedObj = HideClickedObj;
},{"../../../../../../AbstractEventData/BaseEventData/PointerEventData/class":17}],46:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./api");
require("./export");
require("./class");
require("./interface");
},{"./api":43,"./class":44,"./export":45,"./interface":47}],47:[function(require,module,exports){
"use strict";
},{}],48:[function(require,module,exports){
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
class SelectableAPI {
    static get _Awake() {
        return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.Selectable", "Awake", 0, "pointer", ["pointer"]);
    }
}
__decorate([
    decorator_cache_getter_1.cache
], SelectableAPI, "_Awake", null);
Il2Cpp.Api.Selectable = SelectableAPI;
},{"./interface":51,"decorator-cache-getter":157}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectableImpl = void 0;
const class_1 = require("../class");
class SelectableImpl extends class_1.MonoBehaviourImpl {
    Awake() {
        return Il2Cpp.Api.Selectable._Awake(this.handle);
    }
}
exports.SelectableImpl = SelectableImpl;
Il2Cpp.Selectable = SelectableImpl;
},{"../class":53}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./Button/include");
require("./class");
require("./interface");
require("./api");
},{"./Button/include":46,"./api":48,"./class":49,"./interface":51}],51:[function(require,module,exports){
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
const decorator_cache_getter_1 = require("decorator-cache-getter");
require("./interface");
class MonoBehaviourAPI {
    static get _ctor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", ".ctor", 0, "pointer", ["pointer"]);
    }
    static get _CancelInvoke() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "CancelInvoke", 0, "void", ["pointer"]);
    }
    static get _CancelInvoke_String() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "CancelInvoke", 1, "void", ["pointer", "pointer"]);
    }
    static get _InvokeRepeating() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "InvokeRepeating", 3, "void", ["pointer", "float", "float", "float"]);
    }
    static get _Invoke() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "Invoke", 2, "void", ["pointer", "float", "float"]);
    }
    static get _IsInvoking_String() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "IsInvoking", 1, "bool", ["pointer", "pointer"]);
    }
    static get _IsInvoking_0() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "IsInvoking", 0, "bool", ["pointer"]);
    }
    static get _print() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "print", 1, "void", ["pointer", "pointer"]);
    }
    static get _StartCoroutine_IEnumerator() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "StartCoroutine", 1, ["System.Collections.IEnumerator"], "pointer", ["pointer", "pointer"]);
    }
    static get _StartCoroutine_String() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "StartCoroutine", 1, ["System.String"], "pointer", ["pointer", "pointer"]);
    }
    static get _StartCoroutine_String_Object() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "StartCoroutine", 2, ["System.String", "System.Object"], "pointer", ["pointer", "pointer", "pointer"]);
    }
    static get _StartCoroutine_Auto() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "StartCoroutine_Auto", 1, ["System.Collections.IEnumerator"], "pointer", ["pointer", "pointer"]);
    }
    static get _StopAllCoroutines() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "StopAllCoroutines", 0, "void", ["pointer"]);
    }
    static get _StopCoroutine_Coroutine() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "StopCoroutine", 1, ["System.Collections.IEnumerator"], "void", ["pointer", "pointer"]);
    }
    static get _StopCoroutine_String() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "StopCoroutine", 1, ["System.String"], "void", ["pointer", "pointer"]);
    }
    static get _StopCoroutine_IEnumerator() {
        return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "StopCoroutine", 1, ["System.Collections.IEnumerator"], "void", ["pointer", "pointer"]);
    }
    static get _set_useGUILayout() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "set_useGUILayout", 1, "void", ["pointer", "bool"]);
    }
    static get _get_useGUILayout() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "get_useGUILayout", 0, "bool", ["pointer"]);
    }
}
__decorate([
    decorator_cache_getter_1.cache
], MonoBehaviourAPI, "_ctor", null);
__decorate([
    decorator_cache_getter_1.cache
], MonoBehaviourAPI, "_CancelInvoke", null);
__decorate([
    decorator_cache_getter_1.cache
], MonoBehaviourAPI, "_CancelInvoke_String", null);
__decorate([
    decorator_cache_getter_1.cache
], MonoBehaviourAPI, "_InvokeRepeating", null);
__decorate([
    decorator_cache_getter_1.cache
], MonoBehaviourAPI, "_Invoke", null);
__decorate([
    decorator_cache_getter_1.cache
], MonoBehaviourAPI, "_IsInvoking_String", null);
__decorate([
    decorator_cache_getter_1.cache
], MonoBehaviourAPI, "_IsInvoking_0", null);
__decorate([
    decorator_cache_getter_1.cache
], MonoBehaviourAPI, "_print", null);
__decorate([
    decorator_cache_getter_1.cache
], MonoBehaviourAPI, "_StartCoroutine_IEnumerator", null);
__decorate([
    decorator_cache_getter_1.cache
], MonoBehaviourAPI, "_StartCoroutine_String", null);
__decorate([
    decorator_cache_getter_1.cache
], MonoBehaviourAPI, "_StartCoroutine_String_Object", null);
__decorate([
    decorator_cache_getter_1.cache
], MonoBehaviourAPI, "_StartCoroutine_Auto", null);
__decorate([
    decorator_cache_getter_1.cache
], MonoBehaviourAPI, "_StopAllCoroutines", null);
__decorate([
    decorator_cache_getter_1.cache
], MonoBehaviourAPI, "_StopCoroutine_Coroutine", null);
__decorate([
    decorator_cache_getter_1.cache
], MonoBehaviourAPI, "_StopCoroutine_String", null);
__decorate([
    decorator_cache_getter_1.cache
], MonoBehaviourAPI, "_StopCoroutine_IEnumerator", null);
__decorate([
    decorator_cache_getter_1.cache
], MonoBehaviourAPI, "_set_useGUILayout", null);
__decorate([
    decorator_cache_getter_1.cache
], MonoBehaviourAPI, "_get_useGUILayout", null);
Il2Cpp.Api.MonoBehaviour = MonoBehaviourAPI;
},{"./interface":56,"decorator-cache-getter":157}],53:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonoBehaviourImpl = void 0;
const class_1 = require("../../class");
class MonoBehaviourImpl extends class_1.ComponentImpl {
    ctor_0() {
        return new MonoBehaviourImpl(Il2Cpp.Api.MonoBehaviour._ctor(alloc()));
    }
    CancelInvoke_0() {
        return Il2Cpp.Api.MonoBehaviour._CancelInvoke(this.handle);
    }
    CancelInvoke_methodName(methodName) {
        return Il2Cpp.Api.MonoBehaviour._CancelInvoke_String(this.handle, allocCStr(methodName));
    }
    InvokeRepeating(methodName, time, repeatRate) {
        return Il2Cpp.Api.MonoBehaviour._InvokeRepeating(this.handle, allocCStr(methodName), time, repeatRate);
    }
    Invoke(methodName, time) {
        return Il2Cpp.Api.MonoBehaviour._Invoke(this.handle, allocCStr(methodName), time);
    }
    IsInvoking_methodName(methodName) {
        return Il2Cpp.Api.MonoBehaviour._IsInvoking_String(this.handle, allocCStr(methodName));
    }
    IsInvoking_0() {
        return Il2Cpp.Api.MonoBehaviour._IsInvoking_0(this.handle);
    }
    print(obj) {
        return Il2Cpp.Api.MonoBehaviour._print(this.handle, obj);
    }
    StartCoroutine_enumerator(enumerator) {
        return Il2Cpp.Api.MonoBehaviour._StartCoroutine_IEnumerator(this.handle, enumerator);
    }
    StartCoroutine_methodName(methodName) {
        return Il2Cpp.Api.MonoBehaviour._StartCoroutine_String(this.handle, allocCStr(methodName));
    }
    StartCoroutine_methodName_obj(methodName, obj) {
        return Il2Cpp.Api.MonoBehaviour._StartCoroutine_String_Object(this.handle, allocCStr(methodName), obj);
    }
    StartCoroutine_Auto(enumerator) {
        return Il2Cpp.Api.MonoBehaviour._StartCoroutine_Auto(this.handle, enumerator);
    }
    StopAllCoroutines() {
        return Il2Cpp.Api.MonoBehaviour._StopAllCoroutines(this.handle);
    }
    StopCoroutine_coroutine(coroutine) {
        return Il2Cpp.Api.MonoBehaviour._StopCoroutine_Coroutine(this.handle, coroutine);
    }
    StopCoroutine_methodName(methodName) {
        return Il2Cpp.Api.MonoBehaviour._StopCoroutine_String(this.handle, allocCStr(methodName));
    }
    StopCoroutine_enumerator(enumerator) {
        return Il2Cpp.Api.MonoBehaviour._StopCoroutine_IEnumerator(this.handle, enumerator);
    }
    set_useGUILayout(value) {
        return Il2Cpp.Api.MonoBehaviour._set_useGUILayout(this.handle, value);
    }
    get_useGUILayout() {
        return Il2Cpp.Api.MonoBehaviour._get_useGUILayout(this.handle);
    }
}
exports.MonoBehaviourImpl = MonoBehaviourImpl;
Il2Cpp.MonoBehaviour = MonoBehaviourImpl;
},{"../../class":70}],54:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
},{}],55:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./Selectable/include");
require("./api");
require("./class");
require("./export");
require("./interface");
},{"./Selectable/include":50,"./api":52,"./class":53,"./export":54,"./interface":56}],56:[function(require,module,exports){
"use strict";
},{}],57:[function(require,module,exports){
"use strict";
},{}],58:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./Animation/include");
require("./Animator/include");
require("./AudioSourse/include");
require("./Camera/include");
require("./Light/include");
require("./MonoBehaviour/include");
require("./NetworkView/include");
},{"./Animation/include":38,"./Animator/include":39,"./AudioSourse/include":40,"./Camera/include":41,"./Light/include":42,"./MonoBehaviour/include":55,"./NetworkView/include":57}],59:[function(require,module,exports){
"use strict";
},{}],60:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./CharacterController/include");
},{"./CharacterController/include":59}],61:[function(require,module,exports){
"use strict";
},{}],62:[function(require,module,exports){
"use strict";
},{}],63:[function(require,module,exports){
"use strict";
},{}],64:[function(require,module,exports){
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
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", ".ctor", 1, "pointer", ["pointer"]);
    }
    static get _GetChild() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "GetChild", 1, "pointer", ["pointer", "int"]);
    }
    static get _IsChildOf() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "IsChildOf", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _LookAt() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "LookAt", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _Rotate_eulers() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "Rotate", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _Rotate_eulers_relativeTo() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "Rotate", 2, "pointer", ["pointer", "pointer"]);
    }
    static get _Rotate_xAngle_yAngle_zAngle() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "Rotate", 3, "pointer", ["pointer", "float", "float", "float"]);
    }
    static get _SetAsFirstSibling() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "SetAsFirstSibling", 0, "pointer", ["pointer"]);
    }
    static get _SetParent() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "SetParent", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _SetParent_parent_worldPositionStays() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "SetParent", 2, "pointer", ["pointer", "pointer", "bool"]);
    }
    static get _TransformDirection() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "TransformDirection", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _TransformPoint() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "TransformPoint", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _get_childCount() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "get_childCount", 0, "int", ["pointer"]);
    }
    static get _get_eulerAngles() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "get_eulerAngles", 0, "pointer", ["pointer", "pointer"]);
    }
    static get _get_forward() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "get_forward", 0, "pointer", ["pointer"]);
    }
    static get _set_localEulerAngles() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "set_localEulerAngles", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _get_localEulerAngles() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "get_localEulerAngles", 0, "pointer", ["pointer"]);
    }
    static get _set_localPosition() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "set_localPosition", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _get_localPosition() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "get_localPosition", 0, "pointer", ["pointer"]);
    }
    static get _set_localRotation() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "set_localRotation", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _get_localRotation() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "get_localRotation", 0, "pointer", ["pointer"]);
    }
    static get _set_localScale() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "set_localScale", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _get_localScale() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "get_localScale", 0, "pointer", ["pointer"]);
    }
    static get _get_localToWorldMatrix() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "get_localToWorldMatrix", 0, "pointer", ["pointer"]);
    }
    static get _set_parent() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "set_parent", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _get_parent() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "get_parent", 0, "pointer", ["pointer"]);
    }
    static get _set_position() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "set_position", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _get_position() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "get_position", 0, "pointer", ["pointer", "pointer"]);
    }
    static get _set_rotation() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "set_rotation", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _get_rotation() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "get_rotation", 0, "pointer", ["pointer"]);
    }
    static get _get_up() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "get_up", 0, "pointer", ["pointer"]);
    }
    static get _get_worldToLocalMatrix() {
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
},{"./interface":68,"decorator-cache-getter":157}],65:[function(require,module,exports){
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
    RotateAround(point, axis, angle) {
        throw new Error("Method not implemented.");
    }
    SetAsFirstSibling() {
        throw new Error("Method not implemented.");
    }
    SetAsLastSibling() {
        throw new Error("Method not implemented.");
    }
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
},{"../../../ValueType/Vector3/class":121,"../class":70}],66:[function(require,module,exports){
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
};
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
    let baseLevel = getLevel(trsIns);
    getChild(trsIns);
    if (level == 10)
        LOGO(`${getLine(75)}\n`);
    function getChild(trsInsLocal) {
        for (let index = 0; index < trsInsLocal.get_childCount(); ++index) {
            let child_transform = trsInsLocal.GetChild(index);
            let levelC = getLevel(child_transform) - baseLevel;
            if (levelC > 0 && levelC <= level)
                LOGD((inCall != undefined ? "\t" : "") +
                    getLine(levelC - 1, "\t") +
                    child_transform.handle + " : " +
                    child_transform.get_name());
            getChild(child_transform);
        }
    }
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
},{"./class":65}],67:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./api");
require("./export");
require("./class");
require("./interface");
},{"./api":64,"./class":65,"./export":66,"./interface":68}],68:[function(require,module,exports){
"use strict";
},{}],69:[function(require,module,exports){
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
},{"decorator-cache-getter":157}],70:[function(require,module,exports){
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
},{"../class":85}],71:[function(require,module,exports){
"use strict";
},{}],72:[function(require,module,exports){
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
},{"./Behavior/include":58,"./Collider/include":60,"./ParticleSystem/include":61,"./Renderer/include":62,"./Rigidbody/include":63,"./Transform/include":67,"./api":69,"./class":70,"./export":71,"./interface":73}],73:[function(require,module,exports){
"use strict";
},{}],74:[function(require,module,exports){
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
},{"decorator-cache-getter":157}],75:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameObjectImpl = void 0;
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
    static Find(name) {
        return new Il2Cpp.GameObject(Il2Cpp.Api.GameObject._Find(allocUStr(name)));
    }
    static FindGameObjectsWithTag_A(tag) {
        return new Il2Cpp.GameObject(Il2Cpp.Api.GameObject._FindGameObjectsWithTag_A(allocUStr(tag)));
    }
    static FindGameObjectWithTag(tag) {
        return new Il2Cpp.GameObject(Il2Cpp.Api.GameObject._FindGameObjectWithTag(allocUStr(tag)));
    }
    static FindWithTag(tag) {
        return new Il2Cpp.GameObject(Il2Cpp.Api.GameObject._FindWithTag(allocUStr(tag)));
    }
}
exports.GameObjectImpl = GameObjectImpl;
Il2Cpp.GameObject = GameObjectImpl;
},{"../class":85}],76:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showGameObject = void 0;
const common_1 = require("../../../../../utils/common");
const HookSetActive = (defaltActive = 1) => {
    A(Il2Cpp.Api.GameObject._SetActive, (args, ctx, passValue) => {
        if (args[0].isNull())
            return;
        let gameObject = new Il2Cpp.GameObject(args[0]);
        if ((0, common_1.filterDuplicateOBJ)(gameObject.toString()) == -1)
            return;
        if (defaltActive == 2 || args[1].toInt32() == defaltActive) {
            let strTmp = "public extern void SetActive( " + (args[1].toInt32() == 0 ? "false" : "true") + " );  LR:" + checkCtx(ctx);
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
},{"../../../../../utils/common":150}],77:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./api");
require("./class");
require("./export");
require("./interface");
},{"./api":74,"./class":75,"./export":76,"./interface":78}],78:[function(require,module,exports){
"use strict";
},{}],79:[function(require,module,exports){
"use strict";
},{}],80:[function(require,module,exports){
"use strict";
},{}],81:[function(require,module,exports){
"use strict";
},{}],82:[function(require,module,exports){
"use strict";
},{}],83:[function(require,module,exports){
"use strict";
},{}],84:[function(require,module,exports){
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
},{"decorator-cache-getter":157}],85:[function(require,module,exports){
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
},{}],86:[function(require,module,exports){
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
},{"./AssetBundle/include":36,"./Avatar/include":37,"./Component/include":72,"./GameObject/include":77,"./Material/include":79,"./Mesh/include":80,"./Montion/include":81,"./Shader/include":82,"./Sprite/include":83,"./api":84,"./class":85,"./interface":87}],87:[function(require,module,exports){
"use strict";
},{}],88:[function(require,module,exports){
"use strict";
},{}],89:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_cache_getter_1 = require("decorator-cache-getter");
class PlayerPrefsAPI {
    static get _DeleteAll() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.PlayerPrefs", "DeleteAll", 0, "pointer", ["pointer"]);
    }
    static get _DeleteKey() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.PlayerPrefs", "DeleteKey", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _GetFloat() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.PlayerPrefs", "GetFloat", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _GetFloat_2() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.PlayerPrefs", "GetFloat", 2, "pointer", ["pointer", "pointer", "pointer"]);
    }
    static get _GetInt() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.PlayerPrefs", "GetInt", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _GetInt_2() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.PlayerPrefs", "GetInt", 2, "pointer", ["pointer", "pointer", "pointer"]);
    }
    static get _GetString() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.PlayerPrefs", "GetString", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _GetString_2() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.PlayerPrefs", "GetString", 2, "pointer", ["pointer", "pointer", "pointer"]);
    }
    static get _HasKey() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.PlayerPrefs", "HasKey", 1, "pointer", ["pointer", "pointer"]);
    }
    static get _Save() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.PlayerPrefs", "Save", 0, "pointer", ["pointer"]);
    }
    static get _SetFloat() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.PlayerPrefs", "SetFloat", 2, "pointer", ["pointer", "pointer", "pointer"]);
    }
    static get _SetInt() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.PlayerPrefs", "SetInt", 2, "pointer", ["pointer", "pointer", "pointer"]);
    }
    static get _SetString() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.PlayerPrefs", "SetString", 2, "pointer", ["pointer", "pointer", "pointer"]);
    }
}
__decorate([
    decorator_cache_getter_1.cache
], PlayerPrefsAPI, "_DeleteAll", null);
__decorate([
    decorator_cache_getter_1.cache
], PlayerPrefsAPI, "_DeleteKey", null);
__decorate([
    decorator_cache_getter_1.cache
], PlayerPrefsAPI, "_GetFloat", null);
__decorate([
    decorator_cache_getter_1.cache
], PlayerPrefsAPI, "_GetFloat_2", null);
__decorate([
    decorator_cache_getter_1.cache
], PlayerPrefsAPI, "_GetInt", null);
__decorate([
    decorator_cache_getter_1.cache
], PlayerPrefsAPI, "_GetInt_2", null);
__decorate([
    decorator_cache_getter_1.cache
], PlayerPrefsAPI, "_GetString", null);
__decorate([
    decorator_cache_getter_1.cache
], PlayerPrefsAPI, "_GetString_2", null);
__decorate([
    decorator_cache_getter_1.cache
], PlayerPrefsAPI, "_HasKey", null);
__decorate([
    decorator_cache_getter_1.cache
], PlayerPrefsAPI, "_Save", null);
__decorate([
    decorator_cache_getter_1.cache
], PlayerPrefsAPI, "_SetFloat", null);
__decorate([
    decorator_cache_getter_1.cache
], PlayerPrefsAPI, "_SetInt", null);
__decorate([
    decorator_cache_getter_1.cache
], PlayerPrefsAPI, "_SetString", null);
Il2Cpp.Api.PlayerPrefs = PlayerPrefsAPI;
},{"decorator-cache-getter":157}],90:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerPrefsImpl = void 0;
const class_1 = require("../Object/class");
class PlayerPrefsImpl extends class_1.ObjectIl2cpp_impl {
    DeleteAll() {
        return Il2Cpp.Api.PlayerPrefs._DeleteAll(this.handle);
    }
    DeleteKey(key) {
        return Il2Cpp.Api.PlayerPrefs._DeleteKey(this.handle, allocCStr(key));
    }
    GetFloat(key) {
        return Il2Cpp.Api.PlayerPrefs._GetFloat(this.handle, allocCStr(key));
    }
    GetFloat_2(key, defaultValue = 0) {
        return Il2Cpp.Api.PlayerPrefs._GetFloat_2(this.handle, allocCStr(key), defaultValue);
    }
    GetInt(key) {
        return Il2Cpp.Api.PlayerPrefs._GetInt(this.handle, allocCStr(key));
    }
    GetInt_2(key, defaultValue = 0) {
        return Il2Cpp.Api.PlayerPrefs._GetInt_2(this.handle, allocCStr(key), defaultValue);
    }
    GetString(key) {
        return Il2Cpp.Api.PlayerPrefs._GetString(this.handle, allocCStr(key));
    }
    GetString_2(key, defaultValue = "") {
        return Il2Cpp.Api.PlayerPrefs._GetString_2(this.handle, allocCStr(key), allocCStr(defaultValue));
    }
    HasKey(key) {
        return Il2Cpp.Api.PlayerPrefs._HasKey(this.handle, allocCStr(key));
    }
    Save() {
        return Il2Cpp.Api.PlayerPrefs._Save(this.handle);
    }
    SetFloat(key, value = 0) {
        return Il2Cpp.Api.PlayerPrefs._SetFloat(this.handle, allocCStr(key), value);
    }
    SetInt(key, value = 0) {
        return Il2Cpp.Api.PlayerPrefs._SetInt(this.handle, allocCStr(key), value);
    }
    SetString(key, value = "") {
        return Il2Cpp.Api.PlayerPrefs._SetString(this.handle, allocCStr(key), allocCStr(value));
    }
}
exports.PlayerPrefsImpl = PlayerPrefsImpl;
Il2Cpp.PlayerPrefs = PlayerPrefsImpl;
},{"../Object/class":85}],91:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HookPlayerPrefs = void 0;
const HookPlayerPrefs = (isShowPrintStack = false, needLRInfo = true) => {
    InterceptorGetFunctions();
    InterceptorSetFunctions();
    function InterceptorGetFunctions() {
        A(Il2Cpp.Api.PlayerPrefs._GetFloat_2, (args, ctx, pass) => {
            pass.set("arg0", readU16(args[0]));
            pass.set("arg1", args[1]);
        }, (retval, ctx, pass) => {
            LOGD("\n[*] '" + retval + "' = GetFloat('" + pass.get("arg0") + "'," + pass.get("arg1") + ")");
            if (needLRInfo)
                LOGZ("\t\t { LR:" + checkCtx(ctx) + " } | { PC:" + checkCtx(ctx, "PC") + " }");
            if (isShowPrintStack)
                LOGZ((GetStackTraceN(ctx)));
        });
        A(Il2Cpp.Api.PlayerPrefs._GetInt_2, (args, ctx, pass) => {
            pass.set("arg0", readU16(args[0]));
            pass.set("arg1", args[1]);
        }, (retval, ctx, pass) => {
            LOGD("\n[*] '" + retval.toInt32() + "' = GetInt('" + pass.get("arg0") + "'," + pass.get("arg1") + ")");
            if (needLRInfo)
                LOGZ("\t\t { LR:" + checkCtx(ctx) + " } | { PC:" + checkCtx(ctx, "PC") + " }");
            if (isShowPrintStack)
                LOGZ((GetStackTraceN(ctx)));
            if (pass.get("arg0").indexOf("SaleBoughted") != -1)
                retval.replace(ptr(0x1));
        });
        A(Il2Cpp.Api.PlayerPrefs._GetString, (args, ctx, pass) => {
            pass.set("arg0", readU16(args[0]));
        }, (retval, ctx, pass) => {
            LOGD("\n[*] '" + readU16(retval) + "' = GetString('" + pass.get("arg0") + "')");
            if (needLRInfo)
                LOGZ("\t\t { LR:" + checkCtx(ctx) + " } | { PC:" + checkCtx(ctx, "PC") + " }");
            if (isShowPrintStack)
                LOGZ((GetStackTraceN(ctx)));
        });
    }
    function InterceptorSetFunctions() {
        A(Il2Cpp.Api.PlayerPrefs._SetFloat, (args, ctx, pass) => {
            pass.set("arg0", readU16(args[0]));
            pass.set("arg1", (args[1].isNull() ? 0 : readSingle(args[1])));
        }, (retval, ctx, pass) => {
            LOGD("\n[*] SetFloat('" + pass.get("arg0") + "'," + pass.get("arg1") + ")");
            if (needLRInfo)
                LOGZ("\t\t { LR:" + checkCtx(ctx) + " } | { PC:" + checkCtx(ctx, "PC") + " }");
            if (isShowPrintStack)
                LOGZ((GetStackTraceN(ctx)));
        });
        A(Il2Cpp.Api.PlayerPrefs._SetInt, (args, ctx, pass) => {
            pass.set("arg0", readU16(args[0]));
            pass.set("arg1", args[1]);
        }, (retval, ctx, pass) => {
            LOGD("\n[*] SetInt('" + pass.get("arg0") + "'," + pass.get("arg1") + ")");
            if (needLRInfo)
                LOGZ("\t\t { LR:" + checkCtx(ctx) + " } | { PC:" + checkCtx(ctx, "PC") + " }");
            if (isShowPrintStack)
                LOGZ((GetStackTraceN(ctx)));
        });
        A(Il2Cpp.Api.PlayerPrefs._SetString, (args, ctx, pass) => {
            pass.set("arg0", readU16(args[0]));
            pass.set("arg1", readU16(args[1]));
        }, (retval, ctx, pass) => {
            LOGD("\n[*] SetString('" + pass.get("arg0") + "','" + pass.get("arg1") + "')");
            if (needLRInfo)
                LOGZ("\t\t { LR:" + checkCtx(ctx) + " } | { PC:" + checkCtx(ctx, "PC") + " }");
            if (isShowPrintStack)
                LOGZ((GetStackTraceN(ctx)));
        });
    }
};
exports.HookPlayerPrefs = HookPlayerPrefs;
globalThis.SetInt = (key, value) => callFunction(find_method("UnityEngine.CoreModule", "PlayerPrefs", "SetInt", 2, true), allocUStr(key), value);
globalThis.SetFloat = (key, value) => callFunction(find_method("UnityEngine.CoreModule", "PlayerPrefs", "SetFloat", 2, true), allocUStr(key), value);
globalThis.SetString = (key, value) => callFunction(find_method("UnityEngine.CoreModule", "PlayerPrefs", "SetString", 2, true), allocUStr(key), allocUStr(value));
globalThis.GetInt = (key) => {
    let ret = callFunctionRI(find_method("UnityEngine.CoreModule", "PlayerPrefs", "GetInt", 2, true), allocUStr(key), 0);
    LOG("\n[*] GetInt('" + key + "')\t--->\t" + ret + "\n", LogColor.C95);
};
globalThis.GetFloat = (key) => {
    let ret = callFunctionRF(find_method("UnityEngine.CoreModule", "PlayerPrefs", "GetFloat", 2, true), allocUStr(key), 0);
    LOG("\n[*] GetFloat('" + key + "')\t--->\t" + ret + "\n", LogColor.C95);
};
globalThis.GetString = (key) => {
    let ret = callFunctionRUS(find_method("UnityEngine.CoreModule", "PlayerPrefs", "GetString", 1), allocUStr(key));
    LOG("\n[*] GetString('" + key + "')\t--->\t" + ret + "\n", LogColor.C95);
};
globalThis.HookPlayerPrefs = HookPlayerPrefs;
},{}],92:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./api");
require("./class");
require("./export");
require("./interface");
},{"./api":89,"./class":90,"./export":91,"./interface":93}],93:[function(require,module,exports){
"use strict";
},{}],94:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_cache_getter_1 = require("decorator-cache-getter");
class ResourcesAPI_API {
    static get _get_cctor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourcesAPI", ".cctor", 0, "pointer", ["pointer"]);
    }
    static get _get_ctor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourcesAPI", ".ctor", 0, "pointer", ["pointer"]);
    }
    static get _FindObjectsOfTypeAll() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourcesAPI", "FindObjectsOfTypeAll", 1, "pointer", ["pointer"]);
    }
    static get _FindShaderByName() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourcesAPI", "FindShaderByName", 1, "pointer", ["pointer"]);
    }
    static get _Load() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourcesAPI", "Load", 2, "pointer", ["pointer", "pointer"]);
    }
    static get _LoadAll() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourcesAPI", "LoadAll", 2, "pointer", ["pointer", "pointer"]);
    }
    static get _LoadAsync() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourcesAPI", "LoadAsync", 2, "pointer", ["pointer", "pointer"]);
    }
    static get _UnloadAsset() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourcesAPI", "UnloadAsset", 1, "pointer", ["pointer"]);
    }
    static get _get_ActiveAPI() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourcesAPI", "get_ActiveAPI", 0, "pointer", ["pointer"]);
    }
    static get _get_overrideAPI() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourcesAPI", "get_overrideAPI", 0, "pointer", ["pointer"]);
    }
}
__decorate([
    decorator_cache_getter_1.cache
], ResourcesAPI_API, "_get_cctor", null);
__decorate([
    decorator_cache_getter_1.cache
], ResourcesAPI_API, "_get_ctor", null);
__decorate([
    decorator_cache_getter_1.cache
], ResourcesAPI_API, "_FindObjectsOfTypeAll", null);
__decorate([
    decorator_cache_getter_1.cache
], ResourcesAPI_API, "_FindShaderByName", null);
__decorate([
    decorator_cache_getter_1.cache
], ResourcesAPI_API, "_Load", null);
__decorate([
    decorator_cache_getter_1.cache
], ResourcesAPI_API, "_LoadAll", null);
__decorate([
    decorator_cache_getter_1.cache
], ResourcesAPI_API, "_LoadAsync", null);
__decorate([
    decorator_cache_getter_1.cache
], ResourcesAPI_API, "_UnloadAsset", null);
__decorate([
    decorator_cache_getter_1.cache
], ResourcesAPI_API, "_get_ActiveAPI", null);
__decorate([
    decorator_cache_getter_1.cache
], ResourcesAPI_API, "_get_overrideAPI", null);
mscorlib.Api.ResourcesAPI = ResourcesAPI_API;
},{"decorator-cache-getter":157}],95:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourcesApi_impl = void 0;
const class_1 = require("../Type/class");
require("./interface");
class ResourcesApi_impl extends class_1.mscorlib_System_Type_impl {
    FindObjectsOfTypeAll(type) {
        return mscorlib.Api.ResourcesAPI._FindObjectsOfTypeAll(this.handle, type);
    }
    FindShaderByName(name) {
        return mscorlib.Api.ResourcesAPI._FindShaderByName(this.handle, name);
    }
    Load(name, type) {
        return new Il2Cpp.Object(mscorlib.Api.ResourcesAPI._Load(this.handle, name, type));
    }
    LoadAll(name, type) {
        return mscorlib.Api.ResourcesAPI._LoadAll(this.handle, name, type);
    }
    LoadAsync(name, type) {
        return mscorlib.Api.ResourcesAPI._LoadAsync(this.handle, name, type);
    }
    UnloadAsset(asset) {
        return mscorlib.Api.ResourcesAPI._UnloadAsset(this.handle, asset);
    }
    get ActiveAPI() {
        return mscorlib.Api.ResourcesAPI._get_ActiveAPI();
    }
    get overrideAPI() {
        return mscorlib.Api.ResourcesAPI._get_overrideAPI();
    }
}
exports.ResourcesApi_impl = ResourcesApi_impl;
mscorlib.ResourcesAPI = ResourcesApi_impl;
},{"../Type/class":114,"./interface":98}],96:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
globalThis.HookResourceLoad = () => {
    A(mscorlib.Api.ResourcesAPI._Load, (args) => {
        LOGD(`\n[*] ResourcesAPI.load`);
        LOGZ(`   | ARG ---> ins:'${args[0]}',name:'${readU16(args[1])}', type:'${args[2]}'`);
    }, (retval) => {
        LOGZ(`   | RET ---> ${retval} --- {${new Il2Cpp.Object(retval).toString()}}`);
    });
};
},{}],97:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./api");
require("./class");
require("./interface");
require("./export");
},{"./api":94,"./class":95,"./export":96,"./interface":98}],98:[function(require,module,exports){
"use strict";
},{}],99:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_cache_getter_1 = require("decorator-cache-getter");
class ResourcesRequest_API {
    static get _get_ctor() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourceRequest", ".ctor", 0, "pointer", ["pointer"]);
    }
    static get _get_asset() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourceRequest", "get_asset", 0, "pointer", ["pointer"]);
    }
    static get _GetResult() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourceRequest", "GetResult", 0, "pointer", ["pointer"]);
    }
}
__decorate([
    decorator_cache_getter_1.cache
], ResourcesRequest_API, "_get_ctor", null);
__decorate([
    decorator_cache_getter_1.cache
], ResourcesRequest_API, "_get_asset", null);
__decorate([
    decorator_cache_getter_1.cache
], ResourcesRequest_API, "_GetResult", null);
mscorlib.Api.ResourcesRequest = ResourcesRequest_API;
},{"decorator-cache-getter":157}],100:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourcesRequest_impl = void 0;
const class_1 = require("../Type/class");
class ResourcesRequest_impl extends class_1.mscorlib_System_Type_impl {
}
exports.ResourcesRequest_impl = ResourcesRequest_impl;
mscorlib.ResourcesRequest = ResourcesRequest_impl;
},{"../Type/class":114}],101:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./api");
require("./class");
},{"./api":99,"./class":100}],102:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_cache_getter_1 = require("decorator-cache-getter");
class Resources_API {
    static get _FindObjectsOfTypeAll() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Resources", "FindObjectsOfTypeAll", 1, "pointer", ["pointer"]);
    }
    static get _GetBuiltinResource() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Resources", "GetBuiltinResource", 2, "pointer", ["pointer", "pointer"]);
    }
    static get _Load() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Resources", "Load", 1, "pointer", ["pointer"]);
    }
    static get _LoadAll() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Resources", "LoadAll", 2, "pointer", ["pointer", "pointer"]);
    }
    static get _LoadAsync() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Resources", "LoadAsync", 2, "pointer", ["pointer", "pointer"]);
    }
    static get _UnloadAsset() {
        return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Resources", "UnloadAsset", 1, "pointer", ["pointer"]);
    }
}
__decorate([
    decorator_cache_getter_1.cache
], Resources_API, "_FindObjectsOfTypeAll", null);
__decorate([
    decorator_cache_getter_1.cache
], Resources_API, "_GetBuiltinResource", null);
__decorate([
    decorator_cache_getter_1.cache
], Resources_API, "_Load", null);
__decorate([
    decorator_cache_getter_1.cache
], Resources_API, "_LoadAll", null);
__decorate([
    decorator_cache_getter_1.cache
], Resources_API, "_LoadAsync", null);
__decorate([
    decorator_cache_getter_1.cache
], Resources_API, "_UnloadAsset", null);
mscorlib.Api.Resources = Resources_API;
},{"decorator-cache-getter":157}],103:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./api");
},{"./api":102}],104:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class mscorlibRuntimeTypeHandleAPI {
}
mscorlib.Api.RuntimeTypeHandle = mscorlibRuntimeTypeHandleAPI;
},{}],105:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mscorlib_System_RuntimeTypeHandle_impl = void 0;
const class_1 = require("../class");
require("./interface");
class mscorlib_System_RuntimeTypeHandle_impl extends class_1.mscorlib_System_Object_impl {
}
exports.mscorlib_System_RuntimeTypeHandle_impl = mscorlib_System_RuntimeTypeHandle_impl;
mscorlib.RuntimeTypeHandle = mscorlib_System_RuntimeTypeHandle_impl;
},{"../class":124,"./interface":107}],106:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./api");
require("./class");
require("./interface");
},{"./api":104,"./class":105,"./interface":107}],107:[function(require,module,exports){
"use strict";
},{}],108:[function(require,module,exports){
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
},{"decorator-cache-getter":157}],109:[function(require,module,exports){
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
},{"../RuntimeTypeHandle/class":105,"../Type/class":114,"./interface":111}],110:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./api");
require("./class");
require("./interface");
},{"./api":108,"./class":109,"./interface":111}],111:[function(require,module,exports){
"use strict";
},{}],112:[function(require,module,exports){
"use strict";
},{}],113:[function(require,module,exports){
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
},{"decorator-cache-getter":157}],114:[function(require,module,exports){
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
},{"../class":124}],115:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./api");
require("./class");
require("./interface");
},{"./api":113,"./class":114,"./interface":116}],116:[function(require,module,exports){
"use strict";
},{}],117:[function(require,module,exports){
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
},{"../../class":124,"./class":118,"./export":119,"./interface":120,"decorator-cache-getter":157}],118:[function(require,module,exports){
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
},{"../class":122,"./api":117}],119:[function(require,module,exports){
"use strict";
},{}],120:[function(require,module,exports){
"use strict";
},{}],121:[function(require,module,exports){
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
},{"../class":122}],122:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mscorlib_System_ValueType = void 0;
const class_1 = require("../class");
class mscorlib_System_ValueType extends class_1.mscorlib_System_Object_impl {
}
exports.mscorlib_System_ValueType = mscorlib_System_ValueType;
},{"../class":124}],123:[function(require,module,exports){
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
},{"decorator-cache-getter":157}],124:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mscorlib_System_Object_impl = void 0;
require("./interface");
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
},{"./interface":126}],125:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./api");
require("./class");
require("./interface");
require("./GUI/include");
require("./Object/include");
require("./Input/include");
require("./Physics/include");
require("./PlayerPrefs/include");
require("./Resources/include");
require("./ResourcesAPI/include");
require("./ResourcesRequest/include");
require("./Times/include");
require("./Type/include");
require("./RuntimeType/include");
require("./RuntimeTypeHandle/include");
require("./AbstractEventData/include");
require("./Debug/include");
require("./Logger/include");
},{"./AbstractEventData/include":27,"./Debug/include":31,"./GUI/include":32,"./Input/include":33,"./Logger/include":35,"./Object/include":86,"./Physics/include":88,"./PlayerPrefs/include":92,"./Resources/include":103,"./ResourcesAPI/include":97,"./ResourcesRequest/include":101,"./RuntimeType/include":110,"./RuntimeTypeHandle/include":106,"./Times/include":112,"./Type/include":115,"./api":123,"./class":124,"./interface":126}],126:[function(require,module,exports){
"use strict";
},{}],127:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./thread");
},{"./thread":128}],128:[function(require,module,exports){
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
},{}],129:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./TypeExtends/_include");
},{"./TypeExtends/_include":14}],130:[function(require,module,exports){
"use strict";
},{}],131:[function(require,module,exports){
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
require("./base/patch");
require("./bridge/expand/packer");
require("./bridge/fix/apiFix");
require("./bridge/fix/Il2cppClass");
require("./bridge/fix/il2cppMethod");
require("./java/include");
require("./native/std/std_deque");
require("./native/std/std_string");
require("./native/std/std_vector");
require("./utils/_include");
require("./native/include");
require("./globel");
},{"./API/list":1,"./API/text":2,"./base/base":3,"./base/breaker":4,"./base/enum":5,"./base/globle":6,"./base/info":7,"./base/patch":8,"./bridge/expand/packer":10,"./bridge/fix/Il2cppClass":11,"./bridge/fix/apiFix":12,"./bridge/fix/il2cppMethod":13,"./expand/include":129,"./globel":130,"./java/include":136,"./native/include":140,"./native/std/std_deque":142,"./native/std/std_string":143,"./native/std/std_vector":144,"./utils/_include":145,"frida-il2cpp-bridge":185}],132:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
require("./include");
function main() {
}
exports.main = main;
globalThis.main = main;
},{"./include":131}],133:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iterClassLoader = exports.listClassLoader = void 0;
const formart_1 = require("../utils/formart");
class classLoaderManager {
    static iterClassLoader = (callback, log = false) => {
        Java.perform(() => {
            Java.enumerateClassLoaders({
                onMatch: function (loader) {
                    if (log)
                        LOGD('classLoader' + loader.toString());
                    if (loader.toString().indexOf('dalvik.system.DexClassLoader') > -1) {
                        if (callback != null)
                            interCall(loader, callback);
                    }
                    else {
                        if (callback != null)
                            interCall(loader, callback);
                    }
                }, onComplete: function () { }
            });
        });
        function interCall(loader, interCallBack) {
            Java.classFactory.loader = loader;
            interCallBack(loader);
        }
    };
    static loaders = new Array();
    static listClassLoader = (formart = true, needLog = true) => {
        if (!needLog && classLoaderManager.loaders.length === 0) {
            fillCacle();
            return;
        }
        if (!formart) {
            Java.perform(() => classLoaderManager.iterClassLoader(() => { }, true));
        }
        else {
            fillCacle();
            let classLoaderList = ["java.lang.BootClassLoader", "dalvik.system.DexClassLoader", "dalvik.system.PathClassLoader", "dalvik.system.InMemoryDexClassLoader"];
            classLoaderList.forEach((classLoaderName) => {
                formart_1.formartClass.printTitile(classLoaderName);
                this.loaders.forEach((loader) => {
                    if (loader.toString().indexOf(classLoaderName) > -1)
                        LOGD('  [' + classLoaderManager.loaders.indexOf(loader) + '] ' + loader.toString());
                });
            });
        }
        function fillCacle() {
            if (classLoaderManager.loaders.length !== 0)
                return;
            Java.perform(() => classLoaderManager.iterClassLoader((loader) => {
                if (!classLoaderManager.loaders.includes(loader))
                    classLoaderManager.loaders.push(loader);
            }, false));
        }
    };
    static getClassLoaderByDescriptor = (descriptor) => {
        let ret = null;
        classLoaderManager.loaders.forEach((loader) => {
            if (loader.toString().indexOf(descriptor) > -1)
                ret = loader;
        });
        return ret;
    };
    static getClassLoaderByIndex = (index) => {
        return classLoaderManager.loaders[index];
    };
}
const listClassLoaderTMP = classLoaderManager.listClassLoader;
exports.listClassLoader = listClassLoaderTMP;
const iterClassLoaderTMP = classLoaderManager.iterClassLoader;
exports.iterClassLoader = iterClassLoaderTMP;
const getClassLoaderByDescriptorTMP = classLoaderManager.getClassLoaderByDescriptor;
const getClassLoaderByIndexTMP = classLoaderManager.getClassLoaderByIndex;
globalThis.listClassLoader = listClassLoaderTMP;
globalThis.iterClassLoader = iterClassLoaderTMP;
globalThis.getClassLoaderByDescriptor = getClassLoaderByDescriptorTMP;
globalThis.getClassLoaderByIndex = getClassLoaderByIndexTMP;
},{"../utils/formart":152}],134:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classLoader_1 = require("./classLoader");
const findJavaClass = (className = "com.unity3d.player.UnityPlayerActivity") => {
    let boolLoader = true;
    Java.perform(() => {
        (0, classLoader_1.iterClassLoader)(function (loader) {
            if (loader) {
                try {
                    let clazz = loader.loadClass(className);
                    if (clazz)
                        boolLoader = false;
                    Java.choose(className, {
                        onMatch: function (clazz) {
                            LOGD('[*] onMatch : \n\t' + clazz.toString() + " at " + loader.toString());
                        }, onComplete: function () { }
                    });
                }
                catch { }
            }
        }, false);
    });
};
const showAllClassesMethods = () => {
    Java.perform(function () {
        Java.enumerateLoadedClasses({
            onMatch: function (className) {
                LOG("[*] Class Name: " + className);
                var db1 = Java.use(className);
                var methodArr = db1.class.getMethods();
                for (var m in methodArr) {
                    LOG("\t" + methodArr[m]);
                }
            },
            onComplete: function () { }
        });
    });
};
const showAllClasses = () => {
    Java.perform(function () {
        Java.enumerateLoadedClasses({
            onMatch: function (className) {
                LOG(className);
            },
            onComplete: function () { }
        });
    });
};
const showSpecificClassMethods = () => {
    Java.perform(function () {
        var class_name = "android.security.keystore.KeyGenParameterSpec$Builder";
        var db1 = Java.use(class_name);
        var methodArr = db1.class.getMethods();
        LOG("[*] Class Name: " + class_name);
        LOG("[*] Method Names:");
        for (var m in methodArr) {
            LOG(methodArr[m]);
        }
    });
};
globalThis.findJavaClass = findJavaClass;
},{"./classLoader":133}],135:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setClick = exports.HookMotionEvent = void 0;
const HookMotionEvent = () => {
    Java.perform(() => {
        Java.use("android.view.View").onTouchEvent.implementation = function (event) {
            let ret = this.onTouchEvent(event);
            LOG("\n" + getLine(25) + " onTouchEvent " + getLine(25), LogColor.YELLOW);
            LOG(ret + "\t" + event, LogColor.C36);
            return ret;
        };
        Java.use("android.app.Activity").dispatchTouchEvent.implementation = function (event) {
            let ret = this.dispatchTouchEvent(event);
            LOG("\n" + getLine(25) + " dispatchTouchEvent " + getLine(25), LogColor.YELLOW);
            LOG(ret + "\t" + event, LogColor.C36);
            return ret;
        };
    });
};
exports.HookMotionEvent = HookMotionEvent;
const setClick = (x, y) => {
    if (x == undefined || y == undefined)
        return;
    Java.perform(() => {
        let Instrumentation = Java.use("android.app.Instrumentation");
        let SystemClock = Java.use("android.os.SystemClock");
        let MotionEvent = Java.use("android.view.MotionEvent");
        let inst = Instrumentation.$new();
        let downTime = SystemClock.uptimeMillis();
        let downEvent = MotionEvent.obtain(downTime, downTime, 0, x, y, 0);
        let upTime = SystemClock.uptimeMillis();
        let upEvent = MotionEvent.obtain(upTime, upTime, 1, x, y, 0);
        inst.sendPointerSync(downEvent);
        inst.sendPointerSync(upEvent);
    });
};
exports.setClick = setClick;
globalThis.HookMotionEvent = HookMotionEvent;
globalThis.setClick = setClick;
},{}],136:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./click");
require("./info");
require("./others");
require("./logcat");
require("./classUtils");
require("./classLoader");
},{"./classLoader":133,"./classUtils":134,"./click":135,"./info":137,"./logcat":138,"./others":139}],137:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchApp = exports.getApkInfo = void 0;
const enum_1 = require("../base/enum");
function getApkInfo() {
    Java.perform(() => {
        LOG(getLine(100), enum_1.LogColor.C33);
        var context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext();
        var pkgInfo = context.getPackageManager().getPackageInfo(context.getPackageName(), 0);
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
        let pis = context.getPackageManager().getPackageInfo(str_pkgName, 0x00000040);
        let hexDigist = (pis.signatures.value)[0].toByteArray();
        LOG("\n[*]Signatures\t\tMD5\t " + hexdigest(hexDigist, 'MD5') +
            "\n\t\t\tSHA-1\t " + hexdigest(hexDigist, 'SHA-1') +
            "\n\t\t\tSHA-256\t " + hexdigest(hexDigist, 'SHA-256'), enum_1.LogColor.C36);
        LOG("\n[*]unity.build-id\t" + getMetaData('unity.build-id'), enum_1.LogColor.C36);
        LOG(getLine(100), enum_1.LogColor.C33);
    });
    function getMetaData(key) {
        let context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext();
        let appInfo = context.getPackageManager().getApplicationInfo(context.getPackageName(), 0x00000080);
        let metaData = appInfo.metaData.value;
        if (null != metaData) {
            return metaData.getString(key);
        }
        return "...";
    }
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
var launchApp = (pkgName) => Java.perform(() => {
    let context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext();
    context.startActivity(Java.use("android.content.Intent").$new(context.getPackageManager().getLaunchIntentForPackage(pkgName)));
});
exports.launchApp = launchApp;
Reflect.set(globalThis, "launchApp", launchApp);
Reflect.set(globalThis, "getApkInfo", getApkInfo);
},{"../base/enum":5}],138:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HookJavaLog = void 0;
const formart_1 = require("../utils/formart");
const HookJavaLog = () => {
    Java.perform(() => {
        var class_name = Java.use("android.util.Log");
        class_name.isLoggable.overload("java.lang.String", "int").implementation = function (tag, message) {
            LOGD("[*] " + formart_1.formartClass.getTime() + " isLoggable was called:");
            LOGD("\targ1 : " + tag.toString());
            LOGD("\targ2 : " + message.toString());
            return true;
        };
        class_name.d.overload("java.lang.String", "java.lang.String").implementation = function (tag, message) {
            LOGD("[*] " + formart_1.formartClass.getTime() + " DEBUG (d):");
            LOGD("\targ1 : " + tag.toString());
            LOGD("\targ2 : " + message.toString());
            return true;
        };
        class_name.d.overload("java.lang.String", "java.lang.String", "java.lang.Throwable").implementation = function (tag, message, error) {
            LOGD("[*] " + formart_1.formartClass.getTime() + " DEBUG (d):");
            LOGD("\targ1 : " + tag.toString());
            LOGD("\targ2 : " + message.toString());
            LOGD("\targ3 : " + error.toString());
            return true;
        };
        class_name.e.overload("java.lang.String", "java.lang.String").implementation = function (tag, message) {
            LOGD("[*] " + formart_1.formartClass.getTime() + " ERROR (e):");
            LOGD("\targ1 : " + tag.toString());
            LOGD("\targ2 : " + message.toString());
            return true;
        };
        class_name.e.overload("java.lang.String", "java.lang.String", "java.lang.Throwable").implementation = function (tag, message, error) {
            LOGD("[*] " + formart_1.formartClass.getTime() + " ERROR (e):");
            LOGD("\targ1 : " + tag.toString());
            LOGD("\targ2 : " + message.toString());
            LOGD("\targ3 : " + error.toString());
            return true;
        };
        class_name.i.overload("java.lang.String", "java.lang.String").implementation = function (tag, message) {
            LOGD("[*] " + formart_1.formartClass.getTime() + " INFO (i):");
            LOGD("\targ1 : " + tag.toString());
            LOGD("\targ2 : " + message.toString());
            return true;
        };
        class_name.i.overload("java.lang.String", "java.lang.String", "java.lang.Throwable").implementation = function (tag, message, error) {
            LOGD("[*] " + formart_1.formartClass.getTime() + " INFO (i):");
            LOGD("\targ1 : " + tag.toString());
            LOGD("\targ2 : " + message.toString());
            LOGD("\targ3 : " + error.toString());
            return true;
        };
        class_name.v.overload("java.lang.String", "java.lang.String").implementation = function (tag, message) {
            LOGD("[*] " + formart_1.formartClass.getTime() + " VERBOSE (v):");
            LOGD("\targ1 : " + tag.toString());
            LOGD("\targ2 : " + message.toString());
            return true;
        };
        class_name.v.overload("java.lang.String", "java.lang.String", "java.lang.Throwable").implementation = function (tag, message, error) {
            LOGD("[*] " + formart_1.formartClass.getTime() + " VERBOSE (v):");
            LOGD("\targ1 : " + tag.toString());
            LOGD("\targ2 : " + message.toString());
            LOGD("\targ3 : " + error.toString());
            return true;
        };
        class_name.w.overload("java.lang.String", "java.lang.String").implementation = function (tag, message) {
            LOGD("[*] " + formart_1.formartClass.getTime() + " WARNING (w):");
            LOGD("\targ1 : " + tag.toString());
            LOGD("\targ2 : " + message.toString());
            return true;
        };
        class_name.w.overload("java.lang.String", "java.lang.Throwable").implementation = function (tag, message) {
            LOGD("[*] " + formart_1.formartClass.getTime() + " WARNING (w):");
            LOGD("\targ1 : " + tag.toString());
            LOGD("\targ2 : " + message.toString());
            return true;
        };
        class_name.w.overload("java.lang.String", "java.lang.String", "java.lang.Throwable").implementation = function (tag, message, error) {
            LOGD("[*] " + formart_1.formartClass.getTime() + " WARNING (w):");
            LOGD("\targ1 : " + tag.toString());
            LOGD("\targ2 : " + message.toString());
            LOGD("\targ3 : " + error.toString());
            return true;
        };
        class_name.wtf.overload("java.lang.String", "java.lang.String").implementation = function (tag, message) {
            LOGD("[*] " + formart_1.formartClass.getTime() + " WTF (wtf):");
            LOGD("\targ1 : " + tag.toString());
            LOGD("\targ2 : " + message.toString());
            return true;
        };
        class_name.wtf.overload("java.lang.String", "java.lang.Throwable").implementation = function (tag, message) {
            LOGD("[*] " + formart_1.formartClass.getTime() + " WTF (wtf):");
            LOGD("\targ1 : " + tag.toString());
            LOGD("\targ2 : " + message.toString());
            return true;
        };
        class_name.wtf.overload("java.lang.String", "java.lang.String", "java.lang.Throwable").implementation = function (tag, message, error) {
            LOGD("[*] " + formart_1.formartClass.getTime() + " WTF (wtf):");
            LOGD("\targ1 : " + tag.toString());
            LOGD("\targ2 : " + message.toString());
            LOGD("\targ3 : " + error.toString());
            return true;
        };
    });
};
exports.HookJavaLog = HookJavaLog;
globalThis.HookJavaLog = HookJavaLog;
},{"../utils/formart":152}],139:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toast = void 0;
var Toast = (msg) => {
    Java.scheduleOnMainThread(() => {
        let context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext();
        Java.use("android.widget.Toast").makeText(context, Java.use("java.lang.String").$new(msg), 1).show();
    });
};
exports.Toast = Toast;
globalThis.Toast = Toast;
},{}],140:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./std/_include");
},{"./std/_include":141}],141:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./std_deque");
require("./std_string");
require("./std_vector");
},{"./std_deque":142,"./std_string":143,"./std_vector":144}],142:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
},{}],143:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
},{}],144:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
},{}],145:[function(require,module,exports){
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
},{"./alloc":146,"./cache":147,"./caller":148,"./checkP":149,"./common":150,"./context":151,"./formart":152,"./logger":153,"./math":154,"./reader":155,"./stack":156}],146:[function(require,module,exports){
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
function allocVector(x = 0, y = 0, z = 0, w) {
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
},{"../base/enum":5}],147:[function(require,module,exports){
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
},{}],148:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callFunctionRA = exports.callFunctionRCS = exports.callFunctionRUS = exports.callFunctionRF = exports.callFunctionRS = exports.callFunctionRI = exports.callFunctionRB = exports.callFunction = void 0;
const checkP_1 = require("./checkP");
const reader_1 = require("./reader");
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
function callFunctionWithOutError(value, ...args) {
    try {
        if (value == undefined)
            return ptr(0x0);
        for (let i = 1; i <= (arguments.length < 5 ? 5 : arguments.length) - 1; i++)
            arguments[i] = arguments[i] == undefined ? ptr(0x0) : ptr(String(arguments[i]));
        return new NativeFunction((0, checkP_1.checkPointer)(value, true), 'pointer', ['pointer', 'pointer', 'pointer', 'pointer'])(arguments[1], arguments[2], arguments[3], arguments[4]);
    }
    catch (e) {
        return ptr(0);
    }
}
const callFunctionRB = (mPtr, ...args) => callFunctionRI(mPtr, ...args) == 1;
exports.callFunctionRB = callFunctionRB;
const callFunctionRI = (mPtr, ...args) => callFunction(mPtr, ...args).toInt32();
exports.callFunctionRI = callFunctionRI;
const callFunctionRS = (mPtr, ...args) => (0, reader_1.readSingle)(callFunction(mPtr, ...args));
exports.callFunctionRS = callFunctionRS;
const callFunctionRF = (mPtr, ...args) => alloc(p_size * 2).writePointer(callFunction(mPtr, ...args)).readFloat();
exports.callFunctionRF = callFunctionRF;
const callFunctionRUS = (mPtr, ...args) => (0, reader_1.readU16)(callFunction(mPtr, ...args));
exports.callFunctionRUS = callFunctionRUS;
const callFunctionRCS = (mPtr, ...args) => {
    let tmpRet = callFunction(mPtr, ...args).readCString();
    return tmpRet == null ? "" : tmpRet;
};
exports.callFunctionRCS = callFunctionRCS;
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
globalThis.callFunctionWithOutError = callFunctionWithOutError;
},{"./checkP":149,"./reader":155}],149:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPointer = void 0;
const checkPointer = (value, throwErr = false, showLog = false) => {
    if (Il2Cpp.module.base.isNull())
        return ptr(value);
    if (typeof value === "number") {
        return calPointer(ptr(value));
    }
    else if (typeof value === "string") {
        return Module.findExportByName(null, value);
    }
    else if (typeof value === "function") {
        return value;
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
        if (mPtr.isNull() || !mPtr.compare(soAddr))
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
},{}],150:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJclassName = exports.mapValueToArray = exports.PTR2NativePtr = exports.filterDuplicateOBJ = exports.checkCtx = exports.cancelAllNopedFunction = exports.cancelNop = exports.nopFunction = exports.replaceFunction = exports.detachAll = exports.attachNative = exports.SeeTypeToString = exports.getFunctionAddrFromCls = void 0;
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
var passValueKey;
(function (passValueKey) {
    passValueKey["org"] = "org";
    passValueKey["src"] = "src";
    passValueKey["enter"] = "enter";
    passValueKey["leave"] = "leave";
    passValueKey["time"] = "time";
})(passValueKey || (passValueKey = {}));
let map_attach_listener = (0, globle_1.GET_MAP)(enum_1.MapKAY.map_attach_listener);
const attachNative = (mPtr, mOnEnter, mOnLeave, needRecord = true) => {
    if (typeof mPtr == "number")
        mPtr = ptr(mPtr);
    if (mPtr instanceof NativePointer && mPtr.isNull())
        return;
    var passValue = new Map();
    passValue.set(passValueKey.org, mPtr);
    passValue.set(passValueKey.src, mPtr);
    passValue.set(passValueKey.enter, mOnEnter);
    passValue.set(passValueKey.leave, mOnLeave);
    passValue.set(passValueKey.time, new Date());
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
    if (needRecord)
        map_attach_listener.set(String(mPtr), Listener);
};
exports.attachNative = attachNative;
let arr_nop_addr = new Array();
var nopFunction = (mPtr) => {
    if (typeof mPtr == "number")
        mPtr = ptr(mPtr);
    if (mPtr == undefined)
        return;
    replaceFunction(mPtr, () => ptr(0), true);
};
exports.nopFunction = nopFunction;
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
var cancelAllNopedFunction = () => arr_nop_addr.forEach((addr) => Interceptor.revert(addr));
exports.cancelAllNopedFunction = cancelAllNopedFunction;
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
    if (String(arr_nop_addr).indexOf(String(mPtr)) == -1) {
        arr_nop_addr.push(String(mPtr));
    }
    else {
        Interceptor.revert(mPtr);
    }
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
const getJclassName = (jclsName, ShouldRet) => {
    ShouldRet == undefined ? false : true;
    let pVoid = callFunction((0, globle_1.GET_F)(enum_1.EpFunc.DecodeJObject), (0, globle_1.GET_F)(enum_1.EpFunc.ArtCurrent), jclsName);
    let k_class = callFunction((0, globle_1.GET_F)(enum_1.EpFunc.GetDescriptor), pVoid, alloc());
    if (ShouldRet)
        return String(k_class.readCString());
    LOG("\n" + String(k_class.readCString()) + "\n", enum_1.LogColor.C36);
};
exports.getJclassName = getJclassName;
function checkCtx(ctx, type = "LR") {
    let TMP = getPlatformCtx(ctx);
    let lr = TMP.lr;
    let pc = TMP.pc;
    let md_lr = Process.findModuleByAddress(lr);
    if (type == "LR" && md_lr != null)
        return lr.sub(md_lr.base) + `|${md_lr.name}`;
    let md_pc = Process.findModuleByAddress(pc);
    if (type == "PC" && md_pc != null)
        return pc.sub(md_pc.base) + `|${md_pc.name}`;
    if (type == "SP")
        return String(TMP.sp).toString();
    return JSON.stringify(ctx);
}
exports.checkCtx = checkCtx;
const mapValueToArray = (map) => {
    var list = [];
    for (var key in map)
        list.push([key, map.get(key)]);
    return list;
};
exports.mapValueToArray = mapValueToArray;
var runOnMain = (UpDatePtr, Callback) => {
    if (Callback == undefined)
        return;
    if (typeof (UpDatePtr) == "function") {
        Callback = UpDatePtr;
        UpDatePtr = find_method("UnityEngine.UI", "CanvasUpdateRegistry", "PerformUpdate", 0);
    }
    A(UpDatePtr, () => {
        if (Callback != undefined && Callback != null) {
            try {
                Callback();
            }
            catch (e) {
                LOGE(e);
            }
            Callback = () => { };
        }
    });
};
var SendMessage = (str0, str1, str2 = "") => {
    Java.perform(() => Java.use("com.unity3d.player.UnityPlayer").UnitySendMessage(str0, str1, str2));
};
var SendMessageImpl = (platform) => {
    switch (platform) {
        case "IronSource":
            IronSourceEvents();
            break;
        case "MaxSdkCallbacks":
            MaxSdkCallbacks();
            break;
        case "MoPubManager":
            MoPubManager();
            break;
        case "TPluginsGameObject":
            TTPluginsGameObject();
            break;
        default:
            IronSourceEvents();
            MaxSdkCallbacks();
            MoPubManager();
            TTPluginsGameObject();
            break;
    }
    SendMessage('GameAnalytics', 'OnCommandCenterUpdated', '');
    SendMessage('GameAnalytics', 'OnRemoteConfigsUpdated', '');
    SendMessage('UnityFacebookSDKPlugin', 'OnInitComplete', '{"key_hash":"0eWmEB4CY7TpepNbZdxCOaz2Crs=\n"}');
    function IronSourceEvents() {
        SendMessage("IronSourceEvents", "onRewardedVideoAvailabilityChanged", "true");
        SendMessage("IronSourceEvents", "onRewardedVideoAdShowFailedDemandOnly", "true");
        SendMessage('IronSourceEvents', 'onInterstitialAdReady', '');
        SendMessage("IronSourceEvents", "onRewardedVideoAdOpened", "");
        SendMessage("IronSourceEvents", "onRewardedVideoAdStarted", "");
        SendMessage("IronSourceEvents", "onRewardedVideoAdEnded", "");
        SendMessage("IronSourceEvents", "onRewardedVideoAdRewarded", "{'placement_reward_name':'Virtual Item','placement_name':'rewardedVideo','placement_reward_amount':'1','placement_id':'2'}");
        SendMessage("IronSourceEvents", "onRewardedVideoAdClosed", "");
        SendMessage("IronSourceRewardedVideoAndroid", "onRewardedVideoAvailabilityChanged", "true");
        SendMessage("IronSourceRewardedVideoAndroid", "onRewardedVideoAdShowFailedDemandOnly", "true");
        SendMessage('IronSourceRewardedVideoAndroid', 'onInterstitialAdReady', '');
        SendMessage("IronSourceRewardedVideoAndroid", "onRewardedVideoAdOpened", "");
        SendMessage("IronSourceRewardedVideoAndroid", "onRewardedVideoAdStarted", "");
        SendMessage("IronSourceRewardedVideoAndroid", "onRewardedVideoAdEnded", "");
        SendMessage("IronSourceRewardedVideoAndroid", "OnRewardedVideoAdRewarded", "{'placement_reward_name':'Virtual Item','placement_name':'rewardedVideo','placement_reward_amount':'1','placement_id':'2'}");
        SendMessage("IronSourceRewardedVideoAndroid", "onRewardedVideoAdClosed", "");
    }
    function MaxSdkCallbacks() {
        SendMessage('MaxSdkCallbacks', 'ForwardEvent', 'networkName=AppLovin\nname=OnRewardedAdRevenuePaidEvent\nrevenue=0.014579974174499511\nplacement=\nadUnitId=e01cb721520cd33c\ncreativeId=11831000\n');
        SendMessage('MaxSdkCallbacks', 'ForwardEvent', 'networkName=AppLovin\nname=OnRewardedAdDisplayedEvent\nrevenue=0.014579974174499511\nplacement=\nadUnitId=e01cb721520cd33c\ncreativeId=11831000\n');
        SendMessage('MaxSdkCallbacks', 'ForwardEvent', 'revenue=0.014579974174499511\nnetworkName=AppLovin\nname=OnRewardedAdReceivedRewardEvent\nplacement=\nrewardAmount=0\nadUnitId=e01cb721520cd33c\ncreativeId=11831000\nrewardLabel=\n');
        SendMessage('MaxSdkCallbacks', 'ForwardEvent', 'networkName=AppLovin\nname=OnRewardedAdHiddenEvent\nrevenue=0.014579974174499511\nplacement=\nadUnitId=e01cb721520cd33c\ncreativeId=11831000\n');
        SendMessage('MaxSdkCallbacks', 'OnRollicAdsRewardedVideoClickedEvent', 'name=OnSdkInitializedEvent\nconsentDialogState=2\ncountryCode=SG\n');
        SendMessage("MaxSdkCallbacks", "OnRollicAdsRewardedVideoClosedEvent", "name=OnRewardedAdDisplayedEvent\nadUnitId=ec1a772e0459f45b");
        SendMessage("MaxSdkCallbacks", "OnRollicAdsRewardedVideoReceivedRewardEvent", "name=OnRewardedAdReceivedRewardEvent\nrewardAmount=0\nadUnitId=ec1a772e0459f45b\nrewardLabel=");
        SendMessage("MaxSdkCallbacks", "OnRollicAdsRewardedVideoShownEvent", "name=OnRewardedAdHiddenEvent\nadUnitId=ec1a772e0459f45b");
        SendMessage("MaxSdkCallbacks", "OnRollicAdsRewardedVideoLoadedEvent", "name=OnRewardedAdLoadedEvent\nadUnitId=ec1a772e0459f45b");
    }
    function MoPubManager() {
        SendMessage("UnityFacebookSDKPlugin", "UnityFacebookSDKPlugin", "{\"key_hash\":\"NgS2u0aEWjJAWRbMgtyAolzO6s8=\\n\"}");
        SendMessage("MoPubManager", "EmitSdkInitializedEvent", "[\"0fe07d2ca88549ff9598aed6c45f0773\",\"70\"]");
        SendMessage("MoPubManager", "EmitInterstitialLoadedEvent", "[\"a44632b619174dfa98c46420592a3756\"]");
        SendMessage('MoPubManager', 'EmitAdLoadedEvent', '["f7a8241fad1041bda59f303eae75be2d","320","50"]');
        SendMessage("MoPubManager", "EmitRewardedVideoLoadedEvent", "[\"a44632b619174dfa98c46420592a3756\"]");
        SendMessage("MoPubManager", "EmitRewardedVideoShownEvent", "[\"a44632b619174dfa98c46420592a3756\"]");
        SendMessage('MoPubManager', 'EmitRewardedVideoReceivedRewardEvent', '["a44632b619174dfa98c46420592a3756","","0"]');
        SendMessage("MoPubManager", "EmitRewardedVideoClosedEvent", "[\"a44632b619174dfa98c46420592a3756\"]");
    }
    function TTPluginsGameObject() {
        SendMessage("TTPluginsGameObject", "OnRewardedAdsShown", "");
        SendMessage("TTPluginsGameObject", "OnRewardedAdsClosed", "{\"shouldReward\":true,\"network\":\"admob-unityads\",\"revenue\":0.00138,\"currency\":\"USD\",\"precision\":\"ESTIMATED\"}");
        SendMessage("TTPluginsGameObject", "OnRewardedAdsReady", "{\"loaded\":true}");
    }
};
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
globalThis.runOnMain = runOnMain;
globalThis.SendMessage = SendMessage;
globalThis.SendMessageImpl = SendMessageImpl;
},{"../base/enum":5,"../base/globle":6}],151:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printCtx = void 0;
const enum_1 = require("../base/enum");
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
},{"../base/enum":5}],152:[function(require,module,exports){
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
    static getTime = () => {
        let today = new Date();
        return today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    };
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
},{"../base/enum":5}],153:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLine = exports.printLogColors = exports.LOGZ = exports.LOGH = exports.LOGO = exports.LOGD = exports.LOGE = exports.LOGW = exports.LOGS = exports.LOG = void 0;
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
const LOGZ = (msg) => (0, exports.LOG)(msg, enum_1.LogColor.C90);
exports.LOGZ = LOGZ;
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
globalThis.LOGW = exports.LOGW;
globalThis.LOGE = exports.LOGE;
globalThis.LOGD = exports.LOGD;
globalThis.LOGO = exports.LOGO;
globalThis.LOGH = exports.LOGH;
globalThis.LOGZ = exports.LOGZ;
globalThis.getLine = exports.getLine;
globalThis.printLogColors = printLogColors;
globalThis.LogColor = enum_1.LogColor;
globalThis.NewLine = (lines = 1) => (0, exports.LOG)((0, exports.getLine)(lines, "\n"));
},{"../base/enum":5,"../base/globle":6,"./formart":152}],154:[function(require,module,exports){
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
},{}],155:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFloat = exports.seeHexA = exports.seeHexR = exports.showArray = exports.readU16 = exports.readInt64 = exports.readUInt64 = exports.readUInt = exports.readInt = exports.readBoolean = exports.readSingle = void 0;
const enum_1 = require("../base/enum");
const common_1 = require("./common");
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
const readU16 = (mPtr) => {
    if (typeof mPtr == "number")
        mPtr = ptr(mPtr);
    if (mPtr == undefined || mPtr == ptr(0))
        return "";
    try {
        return mPtr.add(p_size * 2 + 4).readUtf16String();
    }
    catch {
        return "";
    }
};
exports.readU16 = readU16;
const showArray = (mPtr, funcTransform) => {
    if (typeof mPtr == "number")
        mPtr = ptr(mPtr);
    if (mPtr == undefined || mPtr == ptr(0))
        return;
    let retPtr = mPtr;
    let arrLength = retPtr.add(p_size * 3).readUInt();
    LOGD(`\n[*] Array length : ${arrLength}  |  RET => ${retPtr}\n`);
    if (arrLength == 0)
        return;
    seeHexA(retPtr.add(p_size * 4), (arrLength > 32 ? 32 : arrLength) * p_size, false, enum_1.LogColor.C33);
    NewLine();
    for (let i = 0; i < arrLength; ++i) {
        let tmpPtr = ptr(retPtr).add(p_size * (4 + i));
        let relItem = tmpPtr.readPointer();
        let ObjToString = "";
        try {
            ObjToString = `${getType(relItem).toString()} | ${new Il2Cpp.Object(relItem).toString()}`;
        }
        catch {
            ObjToString = new Il2Cpp.Object(relItem).toString();
        }
        if (ObjToString.indexOf("String"))
            ObjToString += `\t|${readU16(relItem)}|`;
        if (ObjToString.indexOf("Text"))
            ObjToString += `\t${callFunctionRUS(["UnityEngine.UI", "Text", "get_fontSize", 0])} ${relItem}`;
        if (ObjToString.indexOf("TermData") || ObjToString.indexOf("LanguageData"))
            ObjToString += `\t | ${readU16(tmpPtr.readPointer().add(0x8).readPointer())}| `;
        LOGD(String("[" + i + "]").padEnd(5, " ") + " " + tmpPtr + " ---> " + relItem + "  |  " + ObjToString);
        if (funcTransform != undefined && typeof funcTransform == "function")
            LOG("\t" + funcTransform(relItem, ObjToString), enum_1.LogColor.C90);
    }
    NewLine();
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
},{"../base/enum":5,"./common":150}],156:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetStackTraceN = exports.GetStackTrace = exports.PrintStackTraceN = exports.PrintStackTrace = void 0;
const PrintStackTrace = () => LOG(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()), LogColor.C36);
exports.PrintStackTrace = PrintStackTrace;
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
        .map(frame => DebugSymbol.fromAddress(frame))
        .join("\n");
};
exports.GetStackTraceN = GetStackTraceN;
globalThis.PrintStackTrace = PrintStackTrace;
globalThis.PrintStackTraceN = PrintStackTraceN;
globalThis.GetStackTrace = GetStackTrace;
globalThis.GetStackTraceN = GetStackTraceN;
},{}],157:[function(require,module,exports){
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

},{}],158:[function(require,module,exports){
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

},{}],159:[function(require,module,exports){
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

},{"../utils/console":186,"decorator-cache-getter":157,"versioning":192}],160:[function(require,module,exports){
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

},{"../utils/console":186,"../utils/native-wait":188,"decorator-cache-getter":157,"timers":191,"versioning":192}],161:[function(require,module,exports){
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

},{}],162:[function(require,module,exports){
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

},{"./api":159,"./base":160,"./filtering":161,"./runtime":163,"./structs/array":164,"./structs/assembly":165,"./structs/class":166,"./structs/domain":167,"./structs/field":168,"./structs/gc":170,"./structs/gc-handle":169,"./structs/image":171,"./structs/memory-snapshot":172,"./structs/method":173,"./structs/object":174,"./structs/parameter":175,"./structs/pointer":176,"./structs/reference":177,"./structs/string":178,"./structs/thread":179,"./structs/type":181,"./structs/type-enum":180,"./structs/value-type":182,"./tracer":183}],163:[function(require,module,exports){
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

},{"decorator-cache-getter":157}],164:[function(require,module,exports){
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

},{"../../utils/console":186,"../../utils/native-struct":187,"decorator-cache-getter":157}],165:[function(require,module,exports){
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

},{"../../utils/native-struct":187,"../../utils/utils":189,"decorator-cache-getter":157}],166:[function(require,module,exports){
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

},{"../../utils/console":186,"../../utils/native-struct":187,"../../utils/utils":189,"decorator-cache-getter":157}],167:[function(require,module,exports){
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

},{"../../utils/utils":189,"decorator-cache-getter":157}],168:[function(require,module,exports){
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

},{"../../utils/console":186,"../../utils/native-struct":187,"../utils":184,"decorator-cache-getter":157}],169:[function(require,module,exports){
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

},{}],170:[function(require,module,exports){
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

},{"versioning":192}],171:[function(require,module,exports){
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

},{"../../utils/native-struct":187,"../../utils/utils":189,"decorator-cache-getter":157}],172:[function(require,module,exports){
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

},{"../../utils/native-struct":187,"../../utils/utils":189,"decorator-cache-getter":157}],173:[function(require,module,exports){
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

},{"../../utils/console":186,"../../utils/native-struct":187,"../../utils/utils":189,"../utils":184,"decorator-cache-getter":157}],174:[function(require,module,exports){
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

},{"../../utils/native-struct":187,"decorator-cache-getter":157}],175:[function(require,module,exports){
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

},{}],176:[function(require,module,exports){
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

},{"../../utils/native-struct":187,"../utils":184}],177:[function(require,module,exports){
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

},{"../../utils/console":186,"../../utils/native-struct":187,"../utils":184}],178:[function(require,module,exports){
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

},{"../../utils/native-struct":187}],179:[function(require,module,exports){
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

},{"../../utils/console":186,"../../utils/native-struct":187,"decorator-cache-getter":157,"timers":191}],180:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],181:[function(require,module,exports){
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

},{"../../utils/native-struct":187,"decorator-cache-getter":157}],182:[function(require,module,exports){
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

},{"../../utils/native-struct":187}],183:[function(require,module,exports){
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

},{"../utils/console":186,"./utils":184}],184:[function(require,module,exports){
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

},{"../utils/console":186,"../utils/native-struct":187}],185:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./il2cpp");

},{"./il2cpp":162}],186:[function(require,module,exports){
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

},{}],187:[function(require,module,exports){
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

},{}],188:[function(require,module,exports){
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

},{"decorator-cache-getter":157,"timers":191,"versioning":192}],189:[function(require,module,exports){
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

},{"./console":186,"fastest-levenshtein":158}],190:[function(require,module,exports){
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

},{}],191:[function(require,module,exports){
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

},{"process/browser.js":190,"timers":191}],192:[function(require,module,exports){
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

},{}]},{},[132])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhZ2VudC9BUEkvbGlzdC50cyIsImFnZW50L0FQSS90ZXh0LnRzIiwiYWdlbnQvYmFzZS9iYXNlLnRzIiwiYWdlbnQvYmFzZS9icmVha2VyLnRzIiwiYWdlbnQvYmFzZS9lbnVtLnRzIiwiYWdlbnQvYmFzZS9nbG9ibGUudHMiLCJhZ2VudC9iYXNlL2luZm8udHMiLCJhZ2VudC9iYXNlL3BhdGNoLnRzIiwiYWdlbnQvYmFzZS92YWx1ZVJlc29sdmUudHMiLCJhZ2VudC9icmlkZ2UvZXhwYW5kL3BhY2tlci50cyIsImFnZW50L2JyaWRnZS9maXgvSWwyY3BwQ2xhc3MudHMiLCJhZ2VudC9icmlkZ2UvZml4L2lsMmNwcE1ldGhvZC50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9faW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9hcGlFeHRlbmRzL2FwaUV4dGVuZHMudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovQWJzdHJhY3RFdmVudERhdGEvQmFzZUV2ZW50RGF0YS9Qb2ludGVyRXZlbnREYXRhL2FwaS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9BYnN0cmFjdEV2ZW50RGF0YS9CYXNlRXZlbnREYXRhL1BvaW50ZXJFdmVudERhdGEvY2xhc3MudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovQWJzdHJhY3RFdmVudERhdGEvQmFzZUV2ZW50RGF0YS9Qb2ludGVyRXZlbnREYXRhL2V4cG9ydC50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9BYnN0cmFjdEV2ZW50RGF0YS9CYXNlRXZlbnREYXRhL1BvaW50ZXJFdmVudERhdGEvaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9BYnN0cmFjdEV2ZW50RGF0YS9CYXNlRXZlbnREYXRhL2FwaS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9BYnN0cmFjdEV2ZW50RGF0YS9CYXNlRXZlbnREYXRhL2NsYXNzLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL0Fic3RyYWN0RXZlbnREYXRhL0Jhc2VFdmVudERhdGEvaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9BYnN0cmFjdEV2ZW50RGF0YS9hcGkudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovQWJzdHJhY3RFdmVudERhdGEvY2xhc3MudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovQWJzdHJhY3RFdmVudERhdGEvaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9EZWJ1Zy9hcGkudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovRGVidWcvZXhwb3J0LnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL0RlYnVnL2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovR1VJL2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovSW5wdXQvaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9Mb2dnZXIvYXBpLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL0xvZ2dlci9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9Bc3NldEJ1bmRsZS9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9BdmF0YXIvaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvQ29tcG9uZW50L0JlaGF2aW9yL0FuaW1hdGlvbi9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9Db21wb25lbnQvQmVoYXZpb3IvQW5pbWF0b3IvaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvQ29tcG9uZW50L0JlaGF2aW9yL0F1ZGlvU291cnNlL2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L0NvbXBvbmVudC9CZWhhdmlvci9DYW1lcmEvaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvQ29tcG9uZW50L0JlaGF2aW9yL0xpZ2h0L2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L0NvbXBvbmVudC9CZWhhdmlvci9Nb25vQmVoYXZpb3VyL1NlbGVjdGFibGUvQnV0dG9uL2FwaS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvQ29tcG9uZW50L0JlaGF2aW9yL01vbm9CZWhhdmlvdXIvU2VsZWN0YWJsZS9CdXR0b24vY2xhc3MudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L0NvbXBvbmVudC9CZWhhdmlvci9Nb25vQmVoYXZpb3VyL1NlbGVjdGFibGUvQnV0dG9uL2V4cG9ydC50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvQ29tcG9uZW50L0JlaGF2aW9yL01vbm9CZWhhdmlvdXIvU2VsZWN0YWJsZS9CdXR0b24vaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvQ29tcG9uZW50L0JlaGF2aW9yL01vbm9CZWhhdmlvdXIvU2VsZWN0YWJsZS9hcGkudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L0NvbXBvbmVudC9CZWhhdmlvci9Nb25vQmVoYXZpb3VyL1NlbGVjdGFibGUvY2xhc3MudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L0NvbXBvbmVudC9CZWhhdmlvci9Nb25vQmVoYXZpb3VyL1NlbGVjdGFibGUvaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvQ29tcG9uZW50L0JlaGF2aW9yL01vbm9CZWhhdmlvdXIvYXBpLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9Db21wb25lbnQvQmVoYXZpb3IvTW9ub0JlaGF2aW91ci9jbGFzcy50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvQ29tcG9uZW50L0JlaGF2aW9yL01vbm9CZWhhdmlvdXIvaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvQ29tcG9uZW50L0JlaGF2aW9yL05ldHdvcmtWaWV3L2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L0NvbXBvbmVudC9CZWhhdmlvci9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9Db21wb25lbnQvQ29sbGlkZXIvQ2hhcmFjdGVyQ29udHJvbGxlci9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9Db21wb25lbnQvQ29sbGlkZXIvaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvQ29tcG9uZW50L1BhcnRpY2xlU3lzdGVtL2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L0NvbXBvbmVudC9SZW5kZXJlci9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9Db21wb25lbnQvUmlnaWRib2R5L2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L0NvbXBvbmVudC9UcmFuc2Zvcm0vYXBpLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9Db21wb25lbnQvVHJhbnNmb3JtL2NsYXNzLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9Db21wb25lbnQvVHJhbnNmb3JtL2V4cG9ydC50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvQ29tcG9uZW50L1RyYW5zZm9ybS9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9Db21wb25lbnQvYXBpLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9Db21wb25lbnQvY2xhc3MudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L0NvbXBvbmVudC9leHBvcnQudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L0NvbXBvbmVudC9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9HYW1lT2JqZWN0L2FwaS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvR2FtZU9iamVjdC9jbGFzcy50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvR2FtZU9iamVjdC9leHBvcnQudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L0dhbWVPYmplY3QvaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvTWF0ZXJpYWwvaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvTWVzaC9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9Nb250aW9uL2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L1NoYWRlci9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9TcHJpdGUvaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvYXBpLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9jbGFzcy50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9QaHlzaWNzL2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovUGxheWVyUHJlZnMvYXBpLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL1BsYXllclByZWZzL2NsYXNzLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL1BsYXllclByZWZzL2V4cG9ydC50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9QbGF5ZXJQcmVmcy9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL1Jlc291cmNlc0FQSS9hcGkudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovUmVzb3VyY2VzQVBJL2NsYXNzLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL1Jlc291cmNlc0FQSS9leHBvcnQudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovUmVzb3VyY2VzQVBJL2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovUmVzb3VyY2VzUmVxdWVzdC9hcGkudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovUmVzb3VyY2VzUmVxdWVzdC9jbGFzcy50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9SZXNvdXJjZXNSZXF1ZXN0L2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovUmVzb3VyY2VzL2FwaS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9SZXNvdXJjZXMvaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9SdW50aW1lVHlwZUhhbmRsZS9hcGkudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovUnVudGltZVR5cGVIYW5kbGUvY2xhc3MudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovUnVudGltZVR5cGVIYW5kbGUvaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9SdW50aW1lVHlwZS9hcGkudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovUnVudGltZVR5cGUvY2xhc3MudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovUnVudGltZVR5cGUvaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9UaW1lcy9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL1R5cGUvYXBpLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL1R5cGUvY2xhc3MudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovVHlwZS9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL1ZhbHVlVHlwZS9Db2xvci9hcGkudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovVmFsdWVUeXBlL0NvbG9yL2NsYXNzLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL1ZhbHVlVHlwZS9Db2xvci9leHBvcnQudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovVmFsdWVUeXBlL1ZlY3RvcjMvY2xhc3MudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovVmFsdWVUeXBlL2NsYXNzLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL2FwaS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9jbGFzcy50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL3RocmVhZC9faW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy90aHJlYWQvdGhyZWFkLnRzIiwiYWdlbnQvZXhwYW5kL2luY2x1ZGUudHMiLCJhZ2VudC9nbG9iZWwudHMiLCJhZ2VudC9pbmNsdWRlLnRzIiwiYWdlbnQvaW5kZXgudHMiLCJhZ2VudC9qYXZhL2NsYXNzTG9hZGVyLnRzIiwiYWdlbnQvamF2YS9jbGFzc1V0aWxzLnRzIiwiYWdlbnQvamF2YS9jbGljay50cyIsImFnZW50L2phdmEvaW5jbHVkZS50cyIsImFnZW50L2phdmEvaW5mby50cyIsImFnZW50L2phdmEvbG9nY2F0LnRzIiwiYWdlbnQvamF2YS9vdGhlcnMudHMiLCJhZ2VudC9uYXRpdmUvaW5jbHVkZS50cyIsImFnZW50L25hdGl2ZS9zdGQvX2luY2x1ZGUudHMiLCJhZ2VudC9uYXRpdmUvc3RkL3N0ZF9kZXF1ZS5qcyIsImFnZW50L25hdGl2ZS9zdGQvc3RkX3N0cmluZy5qcyIsImFnZW50L25hdGl2ZS9zdGQvc3RkX3ZlY3Rvci5qcyIsImFnZW50L3V0aWxzL19pbmNsdWRlLnRzIiwiYWdlbnQvdXRpbHMvYWxsb2MudHMiLCJhZ2VudC91dGlscy9jYWNoZS50cyIsImFnZW50L3V0aWxzL2NhbGxlci50cyIsImFnZW50L3V0aWxzL2NoZWNrUC50cyIsImFnZW50L3V0aWxzL2NvbW1vbi50cyIsImFnZW50L3V0aWxzL2NvbnRleHQudHMiLCJhZ2VudC91dGlscy9mb3JtYXJ0LnRzIiwiYWdlbnQvdXRpbHMvbG9nZ2VyLnRzIiwiYWdlbnQvdXRpbHMvbWF0aC50cyIsImFnZW50L3V0aWxzL3JlYWRlci50cyIsImFnZW50L3V0aWxzL3N0YWNrLnRzIiwibm9kZV9tb2R1bGVzL2RlY29yYXRvci1jYWNoZS1nZXR0ZXIvZGlzdC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9mYXN0ZXN0LWxldmVuc2h0ZWluL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2ZyaWRhLWlsMmNwcC1icmlkZ2UvZGlzdC9pbDJjcHAvYXBpLmpzIiwibm9kZV9tb2R1bGVzL2ZyaWRhLWlsMmNwcC1icmlkZ2UvZGlzdC9pbDJjcHAvYmFzZS5qcyIsIm5vZGVfbW9kdWxlcy9mcmlkYS1pbDJjcHAtYnJpZGdlL2Rpc3QvaWwyY3BwL2ZpbHRlcmluZy5qcyIsIm5vZGVfbW9kdWxlcy9mcmlkYS1pbDJjcHAtYnJpZGdlL2Rpc3QvaWwyY3BwL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2ZyaWRhLWlsMmNwcC1icmlkZ2UvZGlzdC9pbDJjcHAvcnVudGltZS5qcyIsIm5vZGVfbW9kdWxlcy9mcmlkYS1pbDJjcHAtYnJpZGdlL2Rpc3QvaWwyY3BwL3N0cnVjdHMvYXJyYXkuanMiLCJub2RlX21vZHVsZXMvZnJpZGEtaWwyY3BwLWJyaWRnZS9kaXN0L2lsMmNwcC9zdHJ1Y3RzL2Fzc2VtYmx5LmpzIiwibm9kZV9tb2R1bGVzL2ZyaWRhLWlsMmNwcC1icmlkZ2UvZGlzdC9pbDJjcHAvc3RydWN0cy9jbGFzcy5qcyIsIm5vZGVfbW9kdWxlcy9mcmlkYS1pbDJjcHAtYnJpZGdlL2Rpc3QvaWwyY3BwL3N0cnVjdHMvZG9tYWluLmpzIiwibm9kZV9tb2R1bGVzL2ZyaWRhLWlsMmNwcC1icmlkZ2UvZGlzdC9pbDJjcHAvc3RydWN0cy9maWVsZC5qcyIsIm5vZGVfbW9kdWxlcy9mcmlkYS1pbDJjcHAtYnJpZGdlL2Rpc3QvaWwyY3BwL3N0cnVjdHMvZ2MtaGFuZGxlLmpzIiwibm9kZV9tb2R1bGVzL2ZyaWRhLWlsMmNwcC1icmlkZ2UvZGlzdC9pbDJjcHAvc3RydWN0cy9nYy5qcyIsIm5vZGVfbW9kdWxlcy9mcmlkYS1pbDJjcHAtYnJpZGdlL2Rpc3QvaWwyY3BwL3N0cnVjdHMvaW1hZ2UuanMiLCJub2RlX21vZHVsZXMvZnJpZGEtaWwyY3BwLWJyaWRnZS9kaXN0L2lsMmNwcC9zdHJ1Y3RzL21lbW9yeS1zbmFwc2hvdC5qcyIsIm5vZGVfbW9kdWxlcy9mcmlkYS1pbDJjcHAtYnJpZGdlL2Rpc3QvaWwyY3BwL3N0cnVjdHMvbWV0aG9kLmpzIiwibm9kZV9tb2R1bGVzL2ZyaWRhLWlsMmNwcC1icmlkZ2UvZGlzdC9pbDJjcHAvc3RydWN0cy9vYmplY3QuanMiLCJub2RlX21vZHVsZXMvZnJpZGEtaWwyY3BwLWJyaWRnZS9kaXN0L2lsMmNwcC9zdHJ1Y3RzL3BhcmFtZXRlci5qcyIsIm5vZGVfbW9kdWxlcy9mcmlkYS1pbDJjcHAtYnJpZGdlL2Rpc3QvaWwyY3BwL3N0cnVjdHMvcG9pbnRlci5qcyIsIm5vZGVfbW9kdWxlcy9mcmlkYS1pbDJjcHAtYnJpZGdlL2Rpc3QvaWwyY3BwL3N0cnVjdHMvcmVmZXJlbmNlLmpzIiwibm9kZV9tb2R1bGVzL2ZyaWRhLWlsMmNwcC1icmlkZ2UvZGlzdC9pbDJjcHAvc3RydWN0cy9zdHJpbmcuanMiLCJub2RlX21vZHVsZXMvZnJpZGEtaWwyY3BwLWJyaWRnZS9kaXN0L2lsMmNwcC9zdHJ1Y3RzL3RocmVhZC5qcyIsIm5vZGVfbW9kdWxlcy9mcmlkYS1pbDJjcHAtYnJpZGdlL2Rpc3QvaWwyY3BwL3N0cnVjdHMvdHlwZS1lbnVtLmpzIiwibm9kZV9tb2R1bGVzL2ZyaWRhLWlsMmNwcC1icmlkZ2UvZGlzdC9pbDJjcHAvc3RydWN0cy90eXBlLmpzIiwibm9kZV9tb2R1bGVzL2ZyaWRhLWlsMmNwcC1icmlkZ2UvZGlzdC9pbDJjcHAvc3RydWN0cy92YWx1ZS10eXBlLmpzIiwibm9kZV9tb2R1bGVzL2ZyaWRhLWlsMmNwcC1icmlkZ2UvZGlzdC9pbDJjcHAvdHJhY2VyLmpzIiwibm9kZV9tb2R1bGVzL2ZyaWRhLWlsMmNwcC1icmlkZ2UvZGlzdC9pbDJjcHAvdXRpbHMuanMiLCJub2RlX21vZHVsZXMvZnJpZGEtaWwyY3BwLWJyaWRnZS9kaXN0L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2ZyaWRhLWlsMmNwcC1icmlkZ2UvZGlzdC91dGlscy9jb25zb2xlLmpzIiwibm9kZV9tb2R1bGVzL2ZyaWRhLWlsMmNwcC1icmlkZ2UvZGlzdC91dGlscy9uYXRpdmUtc3RydWN0LmpzIiwibm9kZV9tb2R1bGVzL2ZyaWRhLWlsMmNwcC1icmlkZ2UvZGlzdC91dGlscy9uYXRpdmUtd2FpdC5qcyIsIm5vZGVfbW9kdWxlcy9mcmlkYS1pbDJjcHAtYnJpZGdlL2Rpc3QvdXRpbHMvdXRpbHMuanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3RpbWVycy1icm93c2VyaWZ5L21haW4uanMiLCJub2RlX21vZHVsZXMv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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3B1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDcE5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdlNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzlHQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xQQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN4RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3hMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIn0=
