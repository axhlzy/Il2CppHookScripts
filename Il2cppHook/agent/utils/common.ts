import { type } from "os";
import { ArrKAY, EpFunc, LogColor, MapKAY, PTR } from "../base/enum";
import { ARGM, GET_ARRAY, GET_F, GET_MAP, GET_MAP_VALUE, ONE_ARG, SET_MAP_VALUE, THREE_ARG, TWO_ARG } from "../base/globle";

function PTR2NativePtr(mPtr: PTR): NativePointer {
    if (mPtr == undefined) return ptr(0)
    if (typeof mPtr == "number") mPtr = ptr(mPtr)
    return mPtr
}

let map_attach_listener = GET_MAP<string, InvocationListener>(MapKAY.map_attach_listener)
type OnEnterType = (args: InvocationArguments, ctx: CpuContext, passValue: Map<string, any>) => void
type OnExitType = (retval: InvocationReturnValue, ctx: CpuContext, passValue: Map<string, any>) => void
const attachNative = (mPtr: ARGM, mOnEnter?: OnEnterType, mOnLeave?: OnExitType, needRecord: boolean = true): void => {
    if (typeof mPtr == "number") mPtr = ptr(mPtr)
    if (mPtr == ptr(0)) return
    var passValue = new Map()
    passValue.set("org", mPtr)
    passValue.set("src", mPtr)
    passValue.set("enter", mOnEnter)
    passValue.set("leave", mOnLeave)
    passValue.set("time", new Date())
    mPtr = checkPointer(mPtr)
    let Listener = Interceptor.attach(mPtr, {
        onEnter: function (args: InvocationArguments) {
            if (mOnEnter != undefined) mOnEnter(args, this.context, passValue)
        },
        onLeave: function (retval: InvocationReturnValue) {
            if (mOnLeave != undefined) mOnLeave(retval, this.context, passValue)
        }
    })
    // 记录已经被Attach的函数地址以及listner,默认添加listener记录 (只有填写false的时候不记录)
    if (needRecord) map_attach_listener.set(String(mPtr), Listener)
}

// 用来记录已经被 replace 的函数地址
let arr_nop_addr = new Array()
// nop 指定函数
var nopFunction = (mPtr: ARGM): void => {
    if (typeof mPtr == "number") mPtr = ptr(mPtr)
    if (mPtr == undefined) return
    replaceFunction(mPtr, () => ptr(0), true)
}

// 取消被 nop 的函数
var cancelNop = (mPtr: ARGM): void => {
    if (typeof mPtr == "number") mPtr = ptr(mPtr)
    if (mPtr == ptr(0)) return
    mPtr = checkPointer(mPtr)
    Interceptor.revert(mPtr)
    for (let i = 0; i < arr_nop_addr.length; i++) {
        if (String(arr_nop_addr[i]) == String(mPtr)) {
            arr_nop_addr = arr_nop_addr.splice(arr_nop_addr[i], 1)
        }
    }
}

// 取消所有已经Replace的函数
var cancelAllNopedFunction = () => arr_nop_addr.forEach((addr) => Interceptor.revert(addr))

//detach ---> A(mPtr)
const detachAll = (mPtr?: ARGM) => {
    let map_attach_listener = GET_MAP<string, InvocationListener>(MapKAY.map_attach_listener)
    if (typeof mPtr == "number") mPtr = ptr(mPtr)
    if (mPtr == undefined) {
        map_attach_listener.clear()
        Interceptor.detachAll()
    } else {
        let key = String(checkPointer(mPtr))
        let listener = map_attach_listener.get(key)
        if (listener != undefined) {
            listener.detach()
            map_attach_listener.delete(key)
        }
    }
}

// R(0xabcd,(srcFunc,arg0,arg1,arg2,arg3)=>{......})
type ReplaceFunc = NativeFunction<NativePointer, [NativePointerValue, NativePointerValue, NativePointerValue, NativePointerValue]>
type ReplaceFuncType = (srcCall: ReplaceFunc, arg0: NativePointer, arg1: NativePointer, arg2: NativePointer, arg3: NativePointer) => any
function replaceFunction(mPtr: ARGM, callBack: ReplaceFuncType, TYPENOP: boolean = true): void {
    if (typeof mPtr == "number") mPtr = ptr(mPtr)
    let src_ptr = mPtr
    mPtr = checkPointer(mPtr)
    // 记录已经被 Replace 的函数地址
    if (String(arr_nop_addr).indexOf(String(mPtr)) == -1) {
        arr_nop_addr.push(String(mPtr))
    } else {
        //先取消掉再重新 replace
        Interceptor.revert(mPtr)
    }
    // 原函数的引用也可以再replace中调用findTransform
    let srcFunc = new NativeFunction(mPtr, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer'])
    Interceptor.replace(mPtr, new NativeCallback((arg0, arg1, arg2, arg3) => {
        LOGW("\nCalled " + (TYPENOP ? "Replaced" : "Nop") + " function ---> " + mPtr + " (" + src_ptr.sub(Il2Cpp.module.base) + ")")
        let ret = callBack(srcFunc, arg0, arg1, arg2, arg3)
        return ret == null ? ptr(0) : ret
    }, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer']))
}

export const getFunctionAddrFromCls = (clsptr: NativePointer | number | string, funcName: string) => {
    if (typeof clsptr == "string") clsptr = findClass(clsptr)
    if (typeof clsptr == "number") clsptr = ptr(clsptr)
    let retArray = new Il2Cpp.Class(clsptr).methods
    for (let i = 0; i < retArray.length; i++)
        if (retArray[i].name.indexOf(funcName) != -1) return retArray[i].relativeVirtualAddress
    return -1
}


// 查看类型的,主要用来区分transform和gameObj
export const SeeTypeToString = (obj: number | NativePointer, b: boolean) => {
    if (typeof obj == "number") obj = ptr(obj)
    if (obj == undefined || obj == ptr(0)) return
    let s_type = callFunction(find_method("UnityEngine.CoreModule", "Object", "ToString", 0), obj)
    if (b == undefined) {
        LOG(readU16(s_type))
    } else {
        return readU16(s_type)
    }
}

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
const getJclassName = (jclsName: NativePointer, ShouldRet: boolean) => {
    ShouldRet == undefined ? false : true
    let pVoid = callFunction(GET_F(EpFunc.DecodeJObject), GET_F(EpFunc.ArtCurrent), jclsName)
    let k_class = callFunction(GET_F(EpFunc.GetDescriptor), pVoid, alloc())
    if (ShouldRet) return String(k_class.readCString())
    LOG("\n" + String(k_class.readCString()) + "\n", LogColor.C36)
}

function checkCtx(lr: ARGM) {
    if (typeof lr === "number") lr = ptr(lr)
    let md = Process.findModuleByAddress(lr)
    if (md == null) {
        LOGE("Module not found")
        return
    }
    return ptr(lr).sub(md.base) + `|${md.name}`
}


/**
 * 大于最大出现次数返回值为 -1
 * 主要是为了过滤比如setActive中重复出现的一直频繁调用的obj
 * @param {String} objstr 重复出现的str 
 * @param {int} maxCount 最大出现次数
 * @returns ? -1
 */
const filterDuplicateOBJ = (objstr: string, maxCount: number = 10) => {
    if (!GET_MAP(MapKAY.outFilterMap).has(objstr)) {
        SET_MAP_VALUE(MapKAY.outFilterMap, objstr, 0)
        return 0
    }
    let count = Number(GET_MAP_VALUE(MapKAY.outFilterMap, objstr)) + 1
    SET_MAP_VALUE(MapKAY.outFilterMap, objstr, count)
    return (count >= maxCount) ? -1 : count
}

(Number as any).prototype.add = (num: string | number) => {
    return Number(this) + Number(num)
}

export {
    getJclassName
}

export {
    attachNative, detachAll, replaceFunction, nopFunction, cancelNop, cancelAllNopedFunction, checkCtx,
    filterDuplicateOBJ, PTR2NativePtr
}

declare global {
    var d: Function
    var A: Function
    var n: Function
    var nn: Function
    var nnn: Function
    var R: Function
    var getJclassName: Function
    var checkCtx: Function
    var filterDuplicateOBJ: (objstr: string, maxCount?: number) => number
}

globalThis.d = detachAll
globalThis.A = attachNative
globalThis.n = nopFunction
globalThis.nn = cancelNop
globalThis.nnn = cancelAllNopedFunction
globalThis.R = replaceFunction
globalThis.getJclassName = getJclassName
globalThis.checkCtx = checkCtx
globalThis.filterDuplicateOBJ = filterDuplicateOBJ
