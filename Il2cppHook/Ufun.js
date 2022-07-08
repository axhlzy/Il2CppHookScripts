/**
 * @Author      lzy <axhlzy@live.cn>
 * @HomePage    https://github.com/axhlzy
 * @CreatedTime 2021/01/16 09:23
 * @UpdateTime  2022/07/08 16:41
 * @Des         frida hook u3d functions script
 */

const soName = "libil2cpp.so"
const p_size = Process.pointerSize
var frida_env = ptr(0)
var soAddr = 0

// 声明一些需要用到的导出函数
let il2cpp_get_corlib, il2cpp_domain_get, il2cpp_domain_get_assemblies, il2cpp_assembly_get_image,
    il2cpp_image_get_class_count, il2cpp_image_get_class,
    il2cpp_class_get_methods, il2cpp_class_from_type, il2cpp_class_get_type, il2cpp_class_from_system_type, il2cpp_class_from_name, il2cpp_class_get_method_from_name,
    il2cpp_string_new, il2cpp_type_get_name, il2cpp_type_get_class_or_element_class, il2cpp_class_get_field_from_name,
    il2cpp_class_num_fields, il2cpp_class_get_fields, il2cpp_field_static_get_value, il2cpp_field_static_set_value

// 统一使用 f_xxx 声明函数,使用 p_xxx 声明函数地址
var f_getName, f_getLayer, f_getTransform, f_getParent, f_getChildCount, f_getChild, f_get_pointerEnter, f_pthread_create, f_getpid, f_gettid, f_sleep
var p_getName, p_getLayer, p_getTransform, p_getParent, p_getChildCount, p_getChild, p_get_pointerEnter, p_pthread_create, p_getpid, p_gettid, p_sleep

// libart.so 中的函数初始化
let DecodeJObject, GetDescriptor, ArtCurrent, mdMap

// 格式化展示使用到
let lastTime = 0
// 不要LOG的时候值为false，需要时候true
var LogFlag = true
// 用于map中的key
let date = new Date()
// count_method_times 数组用于记录 breakPoints 中方法出现的次数,index是基于临时变量 t_arrayAddr，而不是 arrayAddr
var count_method_times
// 断点的函数出现次数大于 maxCallTime 即不显示
var maxCallTime = 10
// 存放初始化（list_Images）时候的 imgAddr 以及 imgName
let arr_img_addr = new Array()
let arr_img_names = new Array()
// filterDuplicateOBJ 
let outFilterMap = new Map()
// findClassCache 第二次使用findClass的缓存
let findClassCache = new Array()
// 通用缓存 （目前暂时只用来缓存 Text）
let CommonCache = new Map()
// 用来记录已经被 replace 的函数地址
let arr_nop_addr = new Array()
// 用来记录运行时类型
let arr_runtimeType = new Array()
// findMethod 单独hook记录
let findMethodArray = new Array()
// 用来记录已经被 Attach  的函数Listener
let map_attach_listener = new Map()
// find_class 的缓存
let map_find_class_cache = new Map()
// find_method 的缓存
let map_find_method_cache = new Map()
// 只存在于B时候的临时变量，用来记录需要断点的方法地址并方便 b 移除，避免重复显示
let t_arrayAddr

// 过滤 只显示指定ClassName下的Methods filterClass.push("clsName") //即可开启过滤clsName
// clsName 如果显示不全可以使用 getClassName(ptr) 得到全名，不用过滤的时候置空这个array即可
var filterClass = []

// 存放MethodInfo指针（供动态断点 a() 提供更详细的信息）
let arrMethodInfo = new Array()
// 兼容之前的python脚本筛选，同时也是 addBreakPoints() 或者是 a() 所添加的断点的函数也是存放在这里的
var arrayAddr = []

var arrayName = []

setImmediate(() => Module.findBaseAddress(soName) == null ? LOGE("Not Unity Game") : main())

function main() {

    hook_dlopen()
    // Wait_Interval()
    // Wait_NewTread()

    // 有些机型对dlopen的hook可能导致游戏崩溃 (别用在gadget)
    function hook_dlopen() {
        soAddr = Module.findBaseAddress(soName)
        if (soAddr != null) return initImages()

        A(Module.findExportByName(null, "dlopen"), (args, ctx, pass) => {
            if (args[0].readCString().indexOf(soName) != -1) pass.set("hook", true)
        }, (ret, ctx, pass) => {
            if (pass.get("hook")) todo()
        })

        A(Module.findExportByName(null, "android_dlopen_ext"), (args, ctx, pass) => {
            if (args[0].readCString().indexOf(soName) != -1) pass.set("hook", true)
        }, (ret, ctx, pass) => {
            if (pass.get("hook")) todo()
        })
    }

    // setInterval 涉及js的单线程问题，有点坑，不建议使用
    function Wait_Interval() {
        var taskId = setInterval(() => {
            if (LshowLOG) LOG("\nWaitting load libil2cpp ...... ")
            soAddr = Module.findBaseAddress(soName)
            if (soAddr != null) {
                if (LshowLOG) LOG("Found il2cpp at " + soAddr + " And Enter initImages")
                todo()
                clearInterval(taskId)
            }
        }, 1000)
    }

    function Wait_NewTread() {
        RunOnNewThread(() => {
            while (true) {
                if (LshowLOG) LOG("\nWaitting load libil2cpp ...... ")
                soAddr = Module.findBaseAddress(soName)
                if (soAddr != null) {
                    if (LshowLOG) LOG("Found il2cpp at " + soAddr + " And Enter Main ")
                    todo()
                    return ptr(0)
                }
                Thread.sleep(1)
            }
        })
    }

    // 在初始化之后再做其他事情 initImages()之后 
    function todo() {
        // hookdlopen时机早于u3d引擎初始化完成时间，u3d 初始化完成后才能 initImages()
        setTimeout(() => {
            // 初始化参数
            initImages()
            // detach掉对dlopen的hook
            d()
        }, 300)
    }

    // init
    function initImages() {

        LogFlag = false
        initExportFunctions()
        list_Images()
        initU3DFunctions()
        initLibCFunctions()
        initLibArtFunctions()
        initEnv()
        // initRuntimeType() //需要时候手动调用 (获取runtimeType)
        LogFlag = true

        function initExportFunctions() {
            // const Il2CppImage* il2cpp_get_corlib()
            il2cpp_get_corlib = new NativeFunction(checkPointer([soName, "il2cpp_get_corlib"]), 'pointer', [])
            // Il2CppDomain* il2cpp_domain_get()
            il2cpp_domain_get = new NativeFunction(checkPointer([soName, "il2cpp_domain_get"]), 'pointer', [])
            // const Il2CppAssembly** il2cpp_domain_get_assemblies(const Il2CppDomain* domain, size_t* size)
            il2cpp_domain_get_assemblies = new NativeFunction(checkPointer([soName, "il2cpp_domain_get_assemblies"]), 'pointer', ['pointer', 'pointer'])
            // const Il2CppImage* il2cpp_assembly_get_image(const Il2CppAssembly *assembly)
            il2cpp_assembly_get_image = new NativeFunction(checkPointer([soName, "il2cpp_assembly_get_image"]), 'pointer', ['pointer'])

            // size_t il2cpp_image_get_class_count(const Il2CppImage * image)
            il2cpp_image_get_class_count = new NativeFunction(checkPointer([soName, "il2cpp_image_get_class_count"]), 'pointer', ['pointer'])
            // const Il2CppClass* il2cpp_image_get_class(const Il2CppImage * image, size_t index)
            il2cpp_image_get_class = new NativeFunction(checkPointer([soName, "il2cpp_image_get_class"]), 'pointer', ['pointer', 'int'])

            // const MethodInfo* il2cpp_class_get_methods(Il2CppClass *klass, void* *iter)
            il2cpp_class_get_methods = new NativeFunction(checkPointer([soName, "il2cpp_class_get_methods"]), 'pointer', ["pointer", "pointer"])
            // Il2CppClass* il2cpp_class_from_type(const Il2CppType *type)
            il2cpp_class_from_type = new NativeFunction(checkPointer([soName, "il2cpp_class_from_type"]), 'pointer', ["pointer"])
            // const Il2CppType* il2cpp_class_get_type(Il2CppClass *klass)
            il2cpp_class_get_type = new NativeFunction(checkPointer([soName, "il2cpp_class_get_type"]), 'pointer', ["pointer"])
            // Il2CppClass* il2cpp_class_from_system_type(Il2CppReflectionType *type)
            il2cpp_class_from_system_type = new NativeFunction(checkPointer([soName, "il2cpp_class_from_system_type"]), 'pointer', ["pointer"])
            // Il2CppClass* il2cpp_class_from_name(const Il2CppImage* image, const char* namespaze, const char *name)
            il2cpp_class_from_name = new NativeFunction(checkPointer([soName, "il2cpp_class_from_name"]), 'pointer', ["pointer", "pointer", "pointer"])
            // const MethodInfo* il2cpp_class_get_method_from_name(Il2CppClass *klass, const char* name, int argsCount)
            il2cpp_class_get_method_from_name = new NativeFunction(checkPointer([soName, "il2cpp_class_get_method_from_name"]), 'pointer', ["pointer", "pointer", "int"])

            // Il2CppString* il2cpp_string_new(const char* str)
            il2cpp_string_new = new NativeFunction(checkPointer([soName, "il2cpp_string_new"]), 'pointer', ["pointer"])
            // char* il2cpp_type_get_name(const Il2CppType *type)
            il2cpp_type_get_name = new NativeFunction(checkPointer([soName, "il2cpp_type_get_name"]), 'pointer', ["pointer"])
            // Il2CppClass* il2cpp_type_get_class_or_element_class(const Il2CppType *type)
            il2cpp_type_get_class_or_element_class = new NativeFunction(checkPointer([soName, "il2cpp_type_get_class_or_element_class"]), 'pointer', ["pointer"])

            // size_t il2cpp_class_num_fields(const Il2CppClass* klass)
            il2cpp_class_num_fields = new NativeFunction(checkPointer([soName, "il2cpp_class_num_fields"]), 'int', ["pointer"])
            // FieldInfo* il2cpp_class_get_fields(Il2CppClass *klass, void* *iter)
            il2cpp_class_get_fields = new NativeFunction(checkPointer([soName, "il2cpp_class_get_fields"]), 'pointer', ["pointer", "pointer"])
            // void il2cpp_field_static_get_value(FieldInfo *field, void *value)
            il2cpp_field_static_get_value = new NativeFunction(checkPointer([soName, "il2cpp_field_static_get_value"]), 'pointer', ["pointer", "pointer"])
            // void il2cpp_field_static_set_value(FieldInfo *field, void *value)
            il2cpp_field_static_set_value = new NativeFunction(checkPointer([soName, "il2cpp_field_static_set_value"]), 'pointer', ["pointer", "pointer"])
            // FieldInfo* il2cpp_class_get_field_from_name(Il2CppClass* klass, const char *name)
            il2cpp_class_get_field_from_name = new NativeFunction(checkPointer([soName, "il2cpp_class_get_field_from_name"]), 'pointer', ["pointer", "pointer"])
        }

        function initU3DFunctions() {
            try {
                f_getName = new NativeFunction(p_getName = find_method("UnityEngine.CoreModule", "Object", "GetName", 1), 'pointer', ['pointer'])
                f_getLayer = new NativeFunction(p_getLayer = find_method("UnityEngine.CoreModule", "GameObject", "get_layer", 0), 'int', ['pointer'])
                f_getTransform = new NativeFunction(p_getTransform = find_method("UnityEngine.CoreModule", "GameObject", "get_transform", 0), 'pointer', ['pointer'])
                f_getParent = new NativeFunction(p_getParent = find_method("UnityEngine.CoreModule", "Transform", "GetParent", 0), 'pointer', ['pointer'])
                f_getChildCount = new NativeFunction(p_getChildCount = find_method("UnityEngine.CoreModule", "Transform", "get_childCount", 0), 'int', ['pointer'])
                f_getChild = new NativeFunction(p_getChild = find_method("UnityEngine.CoreModule", "Transform", "GetChild", 1), 'pointer', ['pointer', 'int'])
                f_get_pointerEnter = new NativeFunction(p_get_pointerEnter = find_method("UnityEngine.UI", "PointerEventData", "get_pointerEnter", 0), 'pointer', ['pointer'])
                // var f_getTag         = new NativeFunction(find_method("UnityEngine.CoreModule","GameObject","get_tag",0,true),'pointer',['pointer'])
            } catch {}
        }

        function initLibCFunctions() {
            f_pthread_create = new NativeFunction(p_pthread_create = checkPointer("pthread_create"), 'pointer', ['pointer', 'pointer', 'pointer', 'pointer'])
            f_gettid = new NativeFunction(p_gettid = checkPointer("gettid"), 'int', [])
            f_getpid = new NativeFunction(p_getpid = checkPointer("getpid"), 'int', [])
            f_sleep = new NativeFunction(p_sleep = checkPointer("sleep"), 'int', ['int'])
        }

        function initLibArtFunctions() {
            DecodeJObject = checkPointer(["libart.so", "_ZNK3art6Thread13DecodeJObjectEP8_jobject"])
            GetDescriptor = checkPointer(["libart.so", "_ZN3art6mirror5Class13GetDescriptorEPNSt3__112basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEE"])

            // 实际就是获得 Thread::Current() , 目前仅用作 jcls 的名称获取
            A(DecodeJObject, (args) => {
                ArtCurrent = args[0]
            })

            var taskID = setInterval(() => {
                if (ArtCurrent != undefined) {
                    d(DecodeJObject)
                    clearInterval(taskID)
                }
            }, 5 * 1000)
        }

        function initEnv() {
            attachJava(() => {
                frida_env = Java.vm.tryGetEnv()
            })
        }
    }
}

var i = filter => list_Images(filter)

var c = (image, isShowClass) => list_Classes(image, isShowClass)

var m = klass => list_Methods(klass, 1)

var f = klass => listFieldsFromCls(klass)

var fc = (arg0, arg1) => findClass(arg0, arg1)

/**
 * 参数可以传递 绝对地址/相对地址/methodinfo指针（解析参数）
 * @param {Number} mPtr 
 */
var b = mPtr => breakPoint(mPtr)

/**
 * 查找 Method 地址 == find_method()
 * @param {String} ImageName 
 * @param {String} ClassName 
 * @param {String} functionName 
 * @param {Number} ArgsCount 
 */
var F = (ImageName, ClassName, functionName, ArgsCount) => find_method(ImageName, ClassName, functionName, ArgsCount, false)

/**
 * 用来查看地址 确定不是单独的一条B，以便于InlineHook的后续处理
 * @param {Number} mPtr 绝对地址相对地址都可以
 * @param {Number} 打印指令条数
 */
var P = (mPtr, range, type) => printCtx(mPtr, (range == undefined ? 20 : range), type)

/**
 * 简写 a(findClass(mStr))
 * @param {String} mStr 
 */
var af = mStr => {
    if (mStr == undefined || !isNaN(mStr)) return
    a(findClass(mStr))
}

var a = imgOrCls => {
    if (imgOrCls == undefined) {
        for (let i = 0; i < arr_img_names.length; i++) {
            // 默认就用Assembly-CSharp 和 MaxSdk.Scripts
            if (arr_img_names[i] == "Assembly-CSharp" || arr_img_names[i] == "MaxSdk.Scripts")
                addBreakPoints(arr_img_addr[i])
            if (arr_img_names[i] == "Game" || arr_img_names[i] == "Zenject" || arr_img_names[i] == "UniRx")
                addBreakPoints(arr_img_addr[i])
        }
        // 补充一些常用的 unity API ...
        // a(findClass("GameObject"))
        // a(findClass("Component"))
        // a(findClass("Application"))
        // a(findClass("Object"))
        // a(findClass("Transform"))
        // a(findClass("Button"))
        // a(findClass("MonoBehaviour"))
    } else if (imgOrCls == "ALL" || imgOrCls == 1) {
        for (let i = 0; i < arr_img_names.length; i++)
            addBreakPoints(arr_img_addr[i])
    } else if (!isNaN(imgOrCls)) {
        addBreakPoints(imgOrCls)
    }
}

var B = (filter, isAnalyticParameter) => {
    if (arrayAddr.length == 0) a()
    // 默认不要详细参数，都显示可能导致卡顿而且太乱了，建议再需要的时候新开cmd再使用b去指定某个method
    breakPoints(filter, isAnalyticParameter == undefined ? false : isAnalyticParameter)
}

// 遍历所有的img，添加所有方法，也是一个不太建议的使用方式，需要全部遍历的情况建议使用dps.py配合bpoints.js来使用
var BA = (filter, isAnalyticParameter) => {
    D()
    a("ALL")
    breakPoints(filter, isAnalyticParameter == undefined ? false : isAnalyticParameter)
}

/**
 * 使用反射来查找class（暂时没怎么用到，在低版本的unity中可能就需要用这种方式来获取image了，后续再改吧。。。）
 */
var C = ImgOrPtr => {
    const corlib = il2cpp_get_corlib()
    const assemblyClass = il2cpp_class_from_name(corlib, allocStr("System.Reflection"), allocStr("Assembly"))
    const assemblyLoad = il2cpp_class_get_method_from_name(assemblyClass, allocStr("Load"), 1)
    const assemblyGetTypes = il2cpp_class_get_method_from_name(assemblyClass, allocStr("GetTypes"), 0)

    // public static Assembly Load(string assemblyString)
    const func_load = new NativeFunction(assemblyLoad.readPointer(), 'pointer', ['pointer', 'pointer'])
    // var func_load = new NativeFunction(assemblyLoad.readPointer(),'pointer',['pointer','pointer','pointer'])
    // public virtual Type[] GetTypes();
    const func_getTypes = new NativeFunction(assemblyGetTypes.readPointer(), 'pointer', ['pointer', 'pointer'])

    LOG(getLine(85), LogColor.C33)
    arr_img_names
        .filter((name, index) => {
            if (ImgOrPtr != undefined && Number(arr_img_addr[index]) == Number(ImgOrPtr)) return name
            if (ImgOrPtr != undefined && name.indexOf(ImgOrPtr) != -1) return name
            // return name
        }).forEach(name => {
            let logstr = `${getLine(15)} ${name} ${getLine(15)}`
            LOG(logstr, LogColor.C33)
            LOG(getLine(logstr.length), LogColor.C33)
            let reflectionAssembly = func_load(allocStr(name, ""), ptr(0x0))
            // var reflectionAssembly = func_load(ptr(0x0)，allocStr(a_img_names[1],""),ptr(0x0))
            let reflectionTypes = func_getTypes(reflectionAssembly, ptr(0x0))
            let items = reflectionTypes.add(p_size * 4)
            let length = reflectionTypes.add(p_size * 3).readPointer().toInt32()
            for (let i = 0; i < length; i++) {
                let klass = il2cpp_class_from_system_type(items.add(i * p_size).readPointer())
                // LOG("[*] "+klass+"\t"+getClassName(klass),LogColor.C36)
                let type = il2cpp_class_get_type(klass)
                let t_name = il2cpp_type_get_name(type)
                let p_klass = il2cpp_type_get_class_or_element_class(type)
                LOG("[*] " + p_klass + "\t" + t_name.readCString(), LogColor.C36)
            }
        })
    LOG(getLine(85), LogColor.C33)
}

var aui = () => {
    // for 遍历 arr_img_names
    for (let i = 0; i < arr_img_names.length; ++i) {
        if (arr_img_names[i] == "UnityEngine.UI") {
            a(arr_img_addr[i])
        }
    }
    B()
    setTimeout(() => {
        print_deserted_methods(1)
    }, 3000)
}

var attachJava = func => {
    if (func == undefined) return
    Java.perform(() => func(frida_env))
}

// attach A(0xabcd,(args,ctx,pass)=>{},(ret)=>{})
var A = (mPtr, mOnEnter, mOnLeave, needRecord) => {
    if (mPtr == null || mPtr == 0) return
    var passValue = new Map()
    passValue.set("org", mPtr)
    passValue.set("src", mPtr)
    passValue.set("enter", mOnEnter)
    passValue.set("leave", mOnLeave)
    passValue.set("time", new Date())
    mPtr = checkPointer(ptr(mPtr))
    let Listener = Interceptor.attach(mPtr, {
        onEnter: function (args) {
            if (mOnEnter != undefined) mOnEnter(args, this.context, passValue)
        },
        onLeave: function (ret) {
            if (mOnLeave != undefined) mOnLeave(ret, this.context, passValue)
        }
    })
    // 记录已经被Attach的函数地址以及listner,默认添加listener记录 (只有填写false的时候不记录)
    if (needRecord != false) map_attach_listener.set(String(mPtr), Listener)
}

// R(0xabcd,(srcFunc,arg0,arg1,arg2,arg3)=>{......})
function R(mPtr, callBack) {
    let src_ptr = ptr(mPtr)
    let TYPENOP = arguments[2] == undefined
    mPtr = checkPointer(mPtr)
    // 记录已经被 Replace 的函数地址
    if (String(arr_nop_addr).indexOf(mPtr) == -1) {
        arr_nop_addr.push(String(mPtr))
    } else {
        //先取消掉再重新 replace
        Interceptor.revert(mPtr)
    }
    // 原函数的引用也可以再replace中调用findTransform
    let srcFunc = new NativeFunction(mPtr, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer'])
    Interceptor.replace(mPtr, new NativeCallback((arg0, arg1, arg2, arg3) => {
        LOG("\nCalled " + (TYPENOP ? "Replaced" : "Nop") + " function ---> " + mPtr + " (" + ptr(src_ptr).sub(soAddr) + ")", LogColor.YELLOW)
        let ret = callBack(srcFunc, arg0, arg1, arg2, arg3)
        return ret == null ? ptr(0) : ret
    }, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer']))
}

// nop 指定函数
var n = mPtr => {
    if (mPtr == undefined) return
    R(mPtr, () => ptr(0), 0)
}

// 取消被 nop 的函数
var nn = mPtr => {
    if (mPtr == undefined) return
    mPtr = checkPointer(mPtr)
    Interceptor.revert(mPtr)
    for (let i = 0; i < arr_nop_addr.length; i++) {
        if (String(arr_nop_addr[i]) == String(mPtr)) {
            arr_nop_addr = arr_nop_addr.splice(arr_nop_addr[i], 1)
        }
    }
}

// 取消所有已经Replace的函数
var nnn = () => arr_nop_addr.forEach((addr) => Interceptor.revert(addr))

//detach ---> A(mPtr)
var d = mPtr => {
    if (mPtr == undefined) {
        map_attach_listener.clear()
        Interceptor.detachAll()
    } else {
        var key = String(checkPointer(mPtr))
        var listener = map_attach_listener.get(key)
        if (listener != undefined) {
            listener.detach()
            map_attach_listener.delete(key)
        }
    }
}

var r = () => {
    d()
    arrMethodInfo.splice(0, arrMethodInfo.length)
    arrayAddr.length = 0
    arrayName.length = 0
    count_method_times = 0
    t_arrayAddr = new Array()
}

var bs = (mPtr, range) => interceptorStalker(mPtr, range)

var showMap = map => {
    LOG(getLine(20), LogColor.RED)
    var count = 0
    map.forEach((value, key, innerMap) => {
        LOG(key + " ---> " + value + "\t\tthis -> " + innerMap, LogColor.C36)
        count++
    })
    if (count == 0) LOG("Noting to Show ...", LogColor.C93)
    LOG(getLine(10), LogColor.RED)
    LOG("Count Map Items : " + count, LogColor.C35)
    LOG(getLine(20), LogColor.RED)
}

var D = () => {
    try {
        r()
        nnn()
    } catch (e) {}
}

var B_Ads = () => {
    a(findClass("MaxSdkAndroid"))
}

var B_Analytics = () => {
    a(findClass("Analytics"))
    a(findClass("AnalyticsManager"))
    a(findClass("AnalyticsService"))
    a(findClass("FirebaseAnalytics"))
}

//System.Text.StringBuilder
var B_ToString = () => {
    A(find_method("mscorlib", "StringBuilder", "ToString", 0), () => {}, (ret) => {
        LOG(readU16(ret))
    })
}

var B_UnityJNI = () => {
    D()
    a(findClass("AndroidJNI"))
    a(findClass("AndroidJNIHelper"))
    B("", true)
}

var B_Rate = () => {
    d()
    arrayAddr.length = 0 ? a() : ""
    B("Rate")
}

var B_Show = () => {
    d()
    arrayAddr.length == 0 ? a() : ""
    B("Show")
}

var B_Reward = () => {
    d()
    arrayAddr.length == 0 ? a() : ""
    B("Reward")
}

var B_Interstitial = () => {
    d()
    arrayAddr.length == 0 ? a() : ""
    B("Interstitial")
    B("FullScreenAd")
}

// print list result
var p = filter => print_list_result(filter)

// list all from class
var lafc = klass => {
    LOG("\nFields :", LogColor.RED)
    listFieldsFromCls(klass, undefined, 1)
    LOG("\nMethods :", LogColor.RED)
    list_Methods(klass, 1)
}

// list methods from class
var lmfc = klass => list_Methods(klass, 1)

// list methods from methodinfo   当前methodinfo所属类的methods
var lmfm = methodInfo => listMethodsFromMethodInfo(methodInfo)

// list fields from methodinfo
var lffm = (methodInfo, instance) => listFieldsFromMethodInfo(methodInfo, instance)

// list fields from class
//对于枚举类型也可以使用，枚举类型也是fields
var lffc = (klass, instance) => listFieldsFromCls(klass, instance)

/**
 * 需要用的时候手动调用一下， 毕竟type还是有点多， 会导致启动很慢
 * 
 */
function initRuntimeType() {

    // 前想法也能用，但是太慢了不太好用
    // A(find_method("mscorlib", "Assembly", "GetHashCode", 0), (args) => {
    //     addRuntimeType(args[0])
    // })

    // 仅这些 Assembly 将会遍历 type   "mscorlib", "UnityEngine.UI" "Assembly-CSharp" "UnityEngine.CoreModule"
    let FilterAssembly = arguments[0] == undefined ? ["UnityEngine.UI", "UnityEngine.CoreModule"] : []
    LOG(getLine(60), LogColor.YELLOW)
    let appDomain = callFunction(["mscorlib", "AppDomain", "get_CurrentDomain", 0])
    let arrAssembiles = callFunction(["mscorlib", "AppDomain", "GetAssemblies", 0], appDomain)
    if (arrAssembiles == 0x0) {
        let get_CurrentDomain = find_method("mscorlib", "AppDomain", "get_CurrentDomain", 0)
        let GetAssemblies = find_method("mscorlib", "AppDomain", "GetAssemblies", 0)
        LOG(`ERROR -> CurrentDomain : ${get_CurrentDomain} | Assemblies:${GetAssemblies}`, LogColor.RED)
        return
    }
    let countAll = 0
    // 遍历到所有的 Assemblies
    for (let i = 0; i < ptr(arrAssembiles).add(p_size * 3).readInt(); ++i) {
        let assembly = ptr(arrAssembiles).add(p_size * (4 + i)).readPointer()
        // get_FullName 在该type未被初始化的时候会导致崩溃
        // let currentName = callFunctionRUS(find_method("mscorlib", "Assembly", "get_FullName", 0), assembly)
        let currentName = callFunctionRUS(["mscorlib", "Assembly", "ToString", 0], assembly)
        LOG(String("[" + i + "]").padEnd(5, " ") + assembly + " ---> " + currentName, LogColor.C36)

        if (FilterAssembly.length == 0) {
            // 添加全部 type
            forItems(assembly)
        } else {
            // 添加部分 type
            for (let ass of FilterAssembly) {
                if (currentName.indexOf(ass) == -1) continue
                forItems(assembly)
            }
        }
    }
    LOG("\n" + getLine(20) + "\nCount:" + countAll + "\n" + getLine(60), LogColor.YELLOW)

    function forItems(assembly) {
        // 遍历指定 Assembly 下的所有类型（type）
        let arrTypes = callFunction(["mscorlib", "Assembly", "GetTypes", 0], assembly)
        for (let i = 0; i < ptr(arrTypes).add(p_size * 3).readInt(); ++i) {
            let mType = ptr(arrTypes).add(p_size * (4 + i)).readPointer()
            // LOG("-->" + mType + "  " + mType.readPointer())
            // 如果遇到崩溃就别打印 ToString 日志了 有可能是没有初始化
            // let currentName = callFunctionRUS(find_method("mscorlib", "Object", "ToString", 0), mType)
            let currentName = callFunctionRUS(["mscorlib", "Type", "ToString", 0], mType)
            LOG(String("\t[" + i + "]").padEnd(6, " ") + " " + mType + " ---> " + currentName, LogColor.C36)
            countAll++
            addRuntimeType(mType, 1)
        }
    }
}

/**
 * -------------------------------------------基础方法-------------------------------------------------
 */

var list_Images = filter => {
    arr_img_names.splice(0, arr_img_names.length)
    arr_img_addr.splice(0, arr_img_addr.length)

    const domain = il2cpp_domain_get()
    const size_t = alloc()
    const assemblies = il2cpp_domain_get_assemblies(domain, size_t)
    let count_assemblies = 0
    let count_assemblies_all = 0
    LOG(getLine(85), LogColor.C33)
    let assemblies_count = size_t.readInt()
    for (let i = 0; i < assemblies_count; i++) {
        let img_addr = il2cpp_assembly_get_image(assemblies.add(p_size * i)).readPointer()
        let img_name = img_addr.add(p_size).readPointer().readCString()
        let cls_count = il2cpp_image_get_class_count(img_addr).toInt32()
        if (filter == undefined) {
            LOG("[*] " + img_addr + "\t" + cls_count + "\t" + img_name, LogColor.C36)
            count_assemblies++
        } else if (img_name.indexOf(filter) != -1) {
            LOG("[*] " + img_addr + "\t" + cls_count + "\t" + img_name, LogColor.C36)
            count_assemblies++
        }
        arr_img_names.push(img_name)
        arr_img_addr.push(img_addr)
        count_assemblies_all++
    }
    LOG(getLine(28), LogColor.C33)
    let comstr = ""
    if (filter != undefined) comstr = " | All " + count_assemblies_all
    LOG("  List " + count_assemblies + " Images" + comstr, LogColor.RED)
    LOG(getLine(85), LogColor.C33)
}

function list_Classes(image, isShowClass) {
    if (isShowClass == undefined) isShowClass = true
    image = ptr(image)
    let cls_count = il2cpp_image_get_class_count(image).toInt32()
    let a_Namespaces = new Array()
    let t_Namespaces = new Array()
    let t_Names = new Array()
    let t_il2CppClass = new Array()
    LOG(getLine(85), LogColor.C33)
    for (let j = 0; j < cls_count; j++) {
        let il2CppClass = il2cpp_image_get_class(image, j)
        let name = il2CppClass.add(2 * p_size).readPointer().readCString()
        let nameSpace = il2CppClass.add(3 * p_size).readPointer().readCString()
        if (a_Namespaces.indexOf(nameSpace) == -1) a_Namespaces.push(nameSpace)
        t_il2CppClass.push(il2CppClass)
        t_Names.push(name)
        t_Namespaces.push(nameSpace)
    }
    for (let i = 0; i < a_Namespaces.length; i++) {
        LOG((i == 0 ? "" : (isShowClass ? "\n" : "")) + "[*] " + a_Namespaces[i], LogColor.C36)
        if (!isShowClass) continue
        for (let j = 0; j < t_Names.length; j++)
            if (t_Namespaces[j] == a_Namespaces[i]) LOG("\t[-] " + t_il2CppClass[j] + "\t" + t_Names[j], LogColor.C36)
    }
    let tmp = new Array()
    t_Namespaces.forEach(value => {
        if (tmp.indexOf(value) == -1) tmp.push(value)
    })
    LOG(getLine(28), LogColor.C33)
    LOG("  List " + cls_count + " Classes | Group by " + tmp.length + " NameSpaces", LogColor.RED)
    LOG(getLine(85), LogColor.C33)
}

// 0 1 2
var list_Methods = (klass, TYPE) => {

    if (TYPE == undefined) TYPE = 0

    let AretName = new Array()
    let AretAddr = new Array()

    klass = ptr(klass)
    let iter = alloc()
    let method = NULL
    let count_methods = 0
    if (TYPE == 1) LOG("\n" + getLine(85), LogColor.C33)
    try {
        while (method = il2cpp_class_get_methods(klass, iter)) {
            if (method == 0) break
            // if (klass != getClassAddrFromMethodInfo(method)) MethodInfoOffset = 0x1
            let methodName = getMethodName(method)
            let retClass = il2cpp_class_from_type(getMethodReturnType(method))
            let retName = getClassName(retClass)
            let parameters_count = getMethodParametersCount(method)
            // 添加名称以及地址到array
            if (AretName.toString().indexOf(methodName) == -1) {
                AretName.push(methodName)
                AretAddr.push(method.readPointer())
                // 解析参数
                let arr_args = new Array()
                let arr_args_type_addr = new Array()
                for (let i = 0; i < parameters_count; i++) {
                    try {
                        let ParameterInfo = method.add(p_size * 5).readPointer()
                        let Il2CppType = ParameterInfo.add(p_size * i * 4)
                        let typeClass = il2cpp_class_from_type(getParameterType(Il2CppType))
                        let TypeName = getClassName(typeClass)
                        arr_args.push(TypeName + " " + getParameterName(ParameterInfo))
                        // 这里的TypeName 和 typeClass 之间之所以不用 /t 是因为多参数
                        arr_args_type_addr.push(TypeName + " " + typeClass)
                    } catch (e) {}
                }
                if (TYPE != 2) {
                    let realAddr = method.readPointer()
                    LOG((count_methods == 0 ? "" : "\n") + "[*] " + method + " ---> " +
                        realAddr + (realAddr == 0x0 ? "" : (" ---> " + method.readPointer().sub(soAddr))) + "\t" +
                        (!TYPE ? (parameters_count + "\t") : "") + "\n\t" +
                        get_method_modifier(method) +
                        retName + " " +
                        methodName + " " +
                        "(" + arr_args + ")" + "\t", LogColor.C36)
                }
                count_methods++
                if (TYPE != 2) {
                    if (!TYPE) continue
                    LOG("\t\t---> ret\t" + retName + "\t" + retClass, LogColor.C90)
                    LOG("\t\t---> cls\t" + arr_args_type_addr, LogColor.C90)
                }
            }
        }
    } catch (e) {}
    if (TYPE != 2) {
        LOG(getLine(85) + "\n", LogColor.C33)
    } else {
        return [AretName, AretAddr]
    }
}

var getFunctionAddrFromCls = (clsptr, funcName) => {
    let retArray = list_Methods(clsptr, 2)
    for (let i = 0; i < retArray[0].length; i++)
        if (retArray[0][i].indexOf(funcName) != -1) return retArray[1][i]
    return -1
}

function getFieldOffFromCls(clsptr, fieldName) {
    if (arguments[2] == undefined) return listFieldsFromCls(clsptr, 0, 2, fieldName)
    return listFieldsFromCls(clsptr, ptr(arguments[2]), 1, fieldName)
}

function getFieldInfoFromCls(clsptrOrName, fieldName) {
    if (isNaN(clsptrOrName)) clsptrOrName = findClass(clsptrOrName)
    if (arguments[2] == undefined) return listFieldsFromCls(clsptrOrName, 0, 2, fieldName)
    return listFieldsFromCls(clsptrOrName, ptr(arguments[2]), 2, fieldName)
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
function find_method(imageName, className, functionName, argsCount, isRealAddr) {

    if (imageName == undefined || className == undefined || functionName == undefined || argsCount == undefined) return ptr(0)

    // var corlib = il2cpp_get_corlib()
    if (isRealAddr == undefined) isRealAddr = true
    let tmpKey = imageName + "." + className + "." + functionName + "." + argsCount
    if (isRealAddr) {
        let cache = map_find_method_cache.get(tmpKey)
        if (cache != null) return ptr(cache)
    }
    let currentlib = 0
    arr_img_names.forEach(function (name, index) {
        if (name == imageName) {
            currentlib = arr_img_addr[index]
        }
    })
    let klass = il2cpp_class_from_name(currentlib, allocStr(imageName), allocStr(className))
    if (klass == 0) {
        for (let j = 0; j < il2cpp_image_get_class_count(currentlib).toInt32(); j++) {
            let il2CppClass = il2cpp_image_get_class(currentlib, j)
            if (getClassName(il2CppClass) == className) {
                klass = il2CppClass
                break
            }
        }
    }

    if (klass == 0) return ptr(0)
    let method = il2cpp_class_get_method_from_name(klass, allocStr(functionName), argsCount)
    if (method == 0) return ptr(0)
    if (arguments[5] != undefined && arguments[5] != 2) {
        return method
    } else if (arguments[5] != undefined && arguments[5] == 2) {
        return method.readPointer().sub(soAddr)
    }
    //缓存
    map_find_method_cache.set(tmpKey, method.readPointer())

    if (isRealAddr) return isRealAddr ? method.readPointer() : method.readPointer().sub(soAddr)

    let parameters_count = getMethodParametersCount(method)
    let arr_args = new Array()
    let arr_args_type_addr = new Array()
    for (let i = 0; i < parameters_count; i++) {
        let ParameterInfo = method.add(p_size * 5).readPointer().add(p_size * i * 4)
        let typeClass = il2cpp_class_from_type(getParameterType(ParameterInfo))
        let TypeName = getClassName(typeClass)
        arr_args.push(TypeName + " " + getParameterName(ParameterInfo))
        arr_args_type_addr.push(TypeName + " " + typeClass)
    }
    let disStr = get_method_modifier(method) +
        getClassName(il2cpp_class_from_type(getMethodReturnType(method))) + " " +
        getMethodName(method) + " " +
        "(" + arr_args + ")" + "\t"
    LOG(getLine(85), LogColor.C33)
    LOG(imageName + "." + className + "\t" + disStr, LogColor.RED)
    LOG(getLine(30), LogColor.C33)
    let ShowMore = false
    LOG("Il2CppImage\t---->\t" + currentlib + (ShowMore ? " (" + currentlib.add(p_size).readPointer().readCString() + ")" : ""))
    LOG("Il2CppClass\t---->\t" + klass + (ShowMore ? " (" + getClassName(klass) + ")" : ""))
    LOG("MethodInfo\t---->\t" + method + (ShowMore ? " (" + getMethodName(method) + ")" : ""))
    LOG("methodPointer\t---->\t" + method.readPointer() + "\t===>\t" + method.readPointer().sub(soAddr), LogColor.C36)
    LOG(getLine(85), LogColor.C33)
}

let addBreakPoints = imgOrCls => {
    imgOrCls = ptr(imgOrCls)
    let method_count = 0
    let count = 0
    try {
        count = il2cpp_image_get_class_count(imgOrCls).toInt32()
    } catch (e) {
        LOGE("Error img Or Cls ")
        return
    }
    // 判断是image还是class
    LOG(getLine(85), LogColor.C33)
    if (String(arr_img_addr).indexOf(imgOrCls) != -1) {
        for (let j = 0; j < count; j++) addFunctions(il2cpp_image_get_class(imgOrCls, j))
    } else {
        addFunctions(imgOrCls)
    }

    LOG(getLine(40), LogColor.C33)
    LOGE("  Added " + method_count + " Methods    |    All " + arrayAddr.length)
    LOG(getLine(85), LogColor.C33)

    function addFunctions(cls) {
        let iter = alloc()
        let method = NULL
        try {
            while (method = il2cpp_class_get_methods(cls, iter)) {
                if (method == 0) break
                // if (Number(cls) != Number(getClassAddrFromMethodInfo(method))) MethodInfoOffset = 0x1
                let methodName = get_method_des(method)
                let methodAddr = method.readPointer()
                if (methodAddr == 0) continue
                LOGD("[*] " + method + " ---> " + methodAddr + " (" + methodAddr.sub(soAddr) + ")" + "\t|  " + methodName)
                if (arrayName.indexOf(methodName) != -1) continue
                arrayName.push(methodName)
                arrayAddr.push(methodAddr.sub(soAddr))
                arrMethodInfo.push(method)
                method_count++
            }
        } catch (e) {
            // LOG(e)
        }
    }
}

/**
 * 解析函数的参数信息
 * @param {Number} method MethodInfo指针
 * @param {*} isArray 内部函数调用 b()
 */
let get_method_des = (method, isArray) => {
    method = ptr(method)
    let methodName = getMethodName(method)
    let retClass = il2cpp_class_from_type(getMethodReturnType(method))
    let retName = getClassName(retClass)
    let parameters_count = getMethodParametersCount(method)
    let permission = get_method_modifier(method)

    // 解析参数
    let arr_args = new Array()
    let arr_args_t = new Array()
    let arr_args_n = new Array()
    for (let i = 0; i < parameters_count; i++) {
        let ParameterInfo = method.add(p_size * 5).readPointer().add(p_size * i * 4)
        let typeClass = il2cpp_class_from_type(getParameterType(ParameterInfo))
        let TypeName = getClassName(typeClass)
        let paraName = getParameterName(ParameterInfo)
        arr_args.push(TypeName + " " + paraName)
        arr_args_t.push(typeClass)
        arr_args_n.push(paraName)
    }

    // 补空格对齐
    let maxlength = 0
    for (let i = 0; i < arr_args_n.length; i++) maxlength = maxlength > arr_args_n[i].length ? maxlength : arr_args_n[i].length
    for (let i = 0; i < arr_args_n.length; i++) arr_args_n[i] += getLine(maxlength - arr_args_n[i].length, " ")

    let ret_str = permission + retName + " " + methodName + " (" + arr_args + ")"

    if (isArray == undefined ? false : true) {
        let a_ret = new Array()
        a_ret.push(ret_str) //字符串简述
        a_ret.push(retClass) //返回值类型
        a_ret.push(parameters_count) //参数个数
        a_ret.push(arr_args_t) //参数class列表
        a_ret.push(arr_args_n) //参数名称
        a_ret.push(getLine(maxlength, " ")) //参数最大长度（补齐）
        // LOG(JSON.stringify(a_ret))
        return a_ret
    }

    return ret_str
}

/**
 * 断点单个函数
 * @param {Number} mPtr 可以是绝对地址 相对地址 MethodInfo地址
 * @param {Number} index 
 * @param {String} name 
 */
let breakPoint = (mPtr, index, name) => {
    if (mPtr == undefined || mPtr == null) return
    let arr_method_info = NULL
    try {
        arr_method_info = get_method_des(mPtr, true)
    } catch (e) {
        breakWithArgs(checkPointer(mPtr))
        return
    }

    let method_addr = ptr(mPtr).readPointer()

    //移除在 B 中添加的条目避免重复显示
    if (t_arrayAddr != undefined) {
        let t_method_addr = method_addr.sub(soAddr)
        t_arrayAddr.forEach((value, index) => {
            if (Number(value) == Number(t_method_addr)) count_method_times[index] = maxCallTime
        })
    }

    let funcName = arr_method_info[0]
    let titleStr = String("Called " + funcName + "\t at " + method_addr + "(" + method_addr.sub(soAddr) + ") | MethodInfo " + ptr(mPtr))

    // LOG(method_addr.sub(soAddr))
    A(method_addr, (args) => {
        // if(index!=undefined && ++count_method_times[index] > maxCallTime) return
        LOG("\n" + getLine(60), LogColor.C33)
        LOG(titleStr, LogColor.C96)
        LOG(getLine(22), LogColor.C33)
        let isStatic = funcName.indexOf("static") == -1
        if (isStatic) {
            let insDes = ""
            try {
                insDes = SeeTypeToString(args[0], 1)
            } catch (e) {}
            LOG("  inst | \t\t" + args[0] + "\t[" + insDes + "]", LogColor.C36)
        }
        for (let i = 0; i < arr_method_info[2]; i++) {
            let typeCls = arr_method_info[3][i]
            let strType = getClassName(typeCls)
            //静态方法没有上下文，反之有则arg+1
            let ClsArg = args[(isStatic ? i + 1 : i)]
            let result = FackKnownType(IsJNIFunction(titleStr, strType), ClsArg, typeCls)
            LOG("  arg" + i + " | " + arr_method_info[4][i] + "\t--->\t" + ClsArg + "\t" +
                ((String(ClsArg).length) < 9 ? "\t" : "") +
                strType + " (" + typeCls + ")" + "\t" + result, LogColor.C36)
        }
    }, (ret) => {
        // if(index!=undefined && count_method_times[index] > maxCallTime) return
        let strType = getClassName(arr_method_info[1])
        let result = FackKnownType(IsJNIFunction(titleStr, strType), ret, arr_method_info[1])
        let methodStr = arr_method_info.length == 0 ? "" : " (" + arr_method_info[1] + ")"
        LOG("  ret  |" + arr_method_info[5] + "\t--->\t" + ret +
            //这里的长度在32位的时候是十个长度 0xc976bb40 故小于9就多给他添加一个\t补齐显示
            (String(ret).length < 9 ? "\t" : "") + "\t" +
            strType + methodStr + "\t" +
            result, LogColor.C36)
        LOG("\n" + getLine(60), LogColor.C33)
    })

    function IsJNIFunction(functionDesc, typeStr) {
        //typeStr 基本上只会是 IntPtr 如果是jni函数就调用 getJclassName 解析为String
        return (((functionDesc.indexOf("JNI") != -1 || functionDesc.indexOf("java") != -1) && String(typeStr) == String("IntPtr")) ? "JObject" : typeStr)
    }
}

/**
 * 使用arrayName 和 arrayAddr 断点多个函数 （动态添加的时候使用到arrMethodInfo）
 * @param {String} filter 查询筛选
 * @param {Boolean} isAnalyticParameter 是否解析参数
 */
let breakPoints = (filter, isAnalyticParameter) => {
    // Interceptor.detachAll()
    let breakPointsCount = 0
    let countError = 0
    t_arrayAddr = new Array()
    let t_arrayName = new Array()
    let t_arrayMethod = new Array()
    if (filter == undefined || filter == "") {
        t_arrayName = arrayName
        t_arrayAddr = arrayAddr
        t_arrayMethod = arrMethodInfo
    } else {
        arrayName.forEach((value, index) => {
            if (value.indexOf(filter) != -1) {
                t_arrayName.push(value)
                t_arrayAddr.push(arrayAddr[index])
                t_arrayMethod.push(arrMethodInfo[index])
            }
        })
    }

    count_method_times = new Array(t_arrayName.length)
    for (let t = 0; t < t_arrayAddr.length; t++) count_method_times[t] = Number(1)

    t_arrayAddr
        .map(temp => soAddr.add(temp))
        .forEach((value, index) => {
            LOG(getLine(24), LogColor.C90)
            let tmpStrTitle = "Current : " + (isAnalyticParameter ? arrMethodInfo[index] : value)
            LOG(tmpStrTitle + "\t" + t_arrayName[index], LogColor.C32)
            // var a1 = isAnalyticParameter ? arrayMethod[index] : value
            // var a2 = isAnalyticParameter ? undefined : index
            if (isAnalyticParameter) {
                try {
                    b(arrMethodInfo[index])
                } catch (e) {
                    ++countError
                    LOG(e, LogColor.RED)
                }
                // 等价 contine
                return 0
            }
            try {
                funcTmp(value, index, t_arrayName)
                // breakPoint(a1,a2,t_arrayName[index])
            } catch (e) {
                funcTmp(value.add(1), index, t_arrayName)
                    ++countError
                // breakPoint(a1.add(1),a2,t_arrayName[index])
            }
            LOG("\t\t---->" + index + "\t" + value.sub(soAddr) + " is prepared ", LogColor.C33)
        })
    LOG("\n" + getLine(85), LogColor.C33)
    LOG("  Found " + t_arrayAddr.length + " BreakPoints    |    Add " + (arrayAddr.length - countError) + "    |    Errors " + countError, LogColor.RED)
    LOG(getLine(85), LogColor.C33)

    function funcTmp(currentAddr, index, arrayName) {
        try {
            A(currentAddr, () => {
                // 有些函数嗲用这个获取类型会导致游戏卡屏崩溃，所以需要类型的时候 还是考虑手动调用getType去获取
                // addRuntimeType(args[0])
                let tmpCurAddr = p_size == 0x8 ? String(currentAddr.sub(soAddr)).padEnd(12, " ") : String(currentAddr.sub(soAddr))
                if (++count_method_times[index] < maxCallTime) {
                    // 之前是单独添加了一个字段来控制，后面这里改成这样进行筛选判断简洁点
                    ++breakPointsCount
                    let TmpCountStr = "[" + String(breakPointsCount) + "]"
                    if (filterClass.length != 0) {
                        let temp = getClassNameFromMethodInfo(t_arrayMethod[index])
                        for (let i = 0; i < filterClass.length; i++)
                            var maxLength = filterClass[i].length > maxLength ? filterClass[1].length : maxLength
                        let retStr = getFunctionDesStr(t_arrayMethod, index, maxLength)
                        filterClass.forEach((value) => {
                            if (temp.indexOf(value) != -1 && temp.length == value.length)
                                LOG(TmpCountStr + " called : " + tmpCurAddr + retStr + " --->\t" + arrayName[index] + "\n", LogColor.C36)
                        })
                    } else {
                        LOG("\n" + TmpCountStr + " called : " + tmpCurAddr + getFunctionDesStr(t_arrayMethod, index, 13) + " --->\t" + arrayName[index], LogColor.C36)
                    }
                }
            }, () => {}, false)
        } catch (e) {
            LOG(e, LogColor.C91)
        }
    }

    function getFunctionDesStr(methodInfos, index, maxlength) {
        let strMethodP = ""
        let strMethodC = ""
        if (methodInfos.length != 0) {
            strMethodP = " (" + methodInfos[index] + ")"
            strMethodC = getClassNameFromMethodInfo(methodInfos[index])
            strMethodC = alignStr(strMethodC, maxlength)
            strMethodC += "(" + getClassAddrFromMethodInfo(methodInfos[index]) + ")"
        }
        return strMethodP + "\t" + strMethodC
    }

    function alignStr(str, size) {
        let srcSize = str.length
        if (srcSize >= size) {
            str = str.substring(0, size - 1)
            str += "."
        } else {
            for (let i = size - srcSize; i > 0; i--) {
                str += " "
            }
        }
        return str
    }
}

/**
 * 有时候方法太多遍历一遍太费时间，就需要手动调用该方法把打印出来的值替换开始处的值（arrayAddr/arrayName）
 */
var print_list_result = filter => {
    if (arrayAddr == null || arrayAddr.length == 0) return
    if (filter == undefined) {
        LOG(`\n${getLine(15)} list result ${getLine(15)}`, LogColor.C36)
        LOG("\nvar arrayAddr = \n" + JSON.stringify(arrayAddr))
        LOG("\nvar arrayName = \n" + JSON.stringify(arrayName) + "\n")
        LOG(`\nCOUNT:${arrayAddr.length} \n${getLine(40)}`, LogColor.C36)
    } else {
        LOG(`\n${getLine(5)} list result by Search ${filter} ${getLine(5)}`, LogColor.C36)
        let temp_names = new Array()
        let temp_addrs = new Array()
        arrayName.forEach(function (value, index) {
            if (value.indexOf(filter) != -1) {
                temp_names.push(value)
                temp_addrs.push(arrayAddr[index])
            }
        })
        LOG("\nvar arrayAddr = \n" + JSON.stringify(temp_addrs))
        LOG("\nvar arrayName = \n" + JSON.stringify(temp_names) + "\n")
        LOG(`\nCOUNT: ${temp_addrs.length} \n${getLine(50)}`, LogColor.C36)
    }
}

/**
 * 显示哪些因为超出了最大调用次数的函数地址名称以及index
 */
var print_deserted_methods = (type) => {
    if (count_method_times == null || count_method_times.length == 0) return
    LOG(`${getLine(20)} deserted methods ${getLine(20)}\n`, LogColor.C92)
    count_method_times.forEach(function (value, index) {
        if (Number(value) > maxCallTime && (type != undefined ? String(arrayName[index]).indexOf("Update") != -1 : true))
            LOG("[*] " + ptr(arrayAddr[index]).add(soAddr) + "\t" + arrayAddr[index] + "\t" + arrMethodInfo[index] + "\t(" + index + ")" + "\t--->\t" + arrayName[index] + "\n", LogColor.C32)
    })
}

// 查看类型的,主要用来区分transform和gameObj
var SeeTypeToString = (obj, b) => {
    if (obj == undefined || ptr(obj) == ptr(0)) return
    let s_type = callFunction(find_method("UnityEngine.CoreModule", "Object", "ToString", 0), ptr(obj))
    if (b == undefined) {
        LOG(readU16(s_type))
    } else {
        return readU16(s_type)
    }
}

// 读取浮点数 ptr().readFloat() === readSingle(ptr().readPointer())
var readSingle = value => alloc(2).writePointer(value).readFloat()

var readBoolean = value => alloc(0.25).writePointer(value).readU8() == 0x1

var readInt = value => alloc().writePointer(value).readInt()

var readUInt = value => alloc(1).writePointer(value).readUInt()

var readUInt64 = value => alloc(2).writePointer(value).readU64()

/**
 * 自定义参数解析模板
 * 将mPtr指向的位置以 strType 类型解析并返回 String 
 * 拓展解析一些常用的类，用b断某个方法的时候就可以很方便的打印出参数
 * @param {String}  typeStr  类型字符串
 * @param {Pointer} insPtr     内存指针cls
 * @param {Pointer} clsPtr     类指针（非必选）
 * @returns {String}         简写字符串描述
 */
var FackKnownType = (typeStr, insPtr, clsPtr) => {
    if (insPtr == 0x0 && typeStr != "Boolean" && !class_is_enum(clsPtr)) return "NULL"
    if (clsPtr == undefined) clsPtr = findClass(typeStr)
    try {
        insPtr = ptr(insPtr)
        clsPtr = ptr(clsPtr)

        // 数组类型的数据解析
        if (clsPtr > 100 && typeStr.endsWith("[]")) {
            let addr_getCount = getFunctionAddrFromCls(clsPtr, "get_Count")
            let addr_get_Item = getFunctionAddrFromCls(clsPtr, "get_Item")
            let arr_retStr = new Array()
            for (let index = 0; index < callFunction(addr_getCount, insPtr); index++) {
                let item = callFunction(addr_get_Item, insPtr, index)
                let type = String(typeStr).split("[]")[0]
                // LOG("--->" + mPtr + " " + type + " " + addr_get_Item, LogColor.RED)
                if (type.indexOf("Int") != -1) {
                    // int数组转回int该有的显示类型
                    arr_retStr.push(item.toInt32())
                } else if (type.indexOf(".........") != -1) {
                    //TODO
                } else {
                    // 通用解法速度偏慢，所以前面针对性的先处理一些常用的类型处理
                    arr_retStr.push(FackKnownType(type, item, findClass(type)))
                }
            }
            return JSON.stringify(arr_retStr)
        }

        // Dictionary 数据解析
        if (clsPtr > 100 && typeStr.startsWith("Dictionary")) {
            let addr_getCount = getFunctionAddrFromCls(clsPtr, "get_Count")
            let count = callFunction(addr_getCount, insPtr)
            return count + "\t" + FackKnownType("-1", insPtr, 0x0)
        }

        // 枚举解析
        if (clsPtr > 100 && class_is_enum(clsPtr)) {
            let iter = alloc()
            let field
            let enumIndex = 0
            while (field = il2cpp_class_get_fields(clsPtr, iter)) {
                if (field == 0x0) break
                let fieldName = field.readPointer().readCString()
                let filedType = field.add(p_size).readPointer()
                let field_class = il2cpp_class_from_type(filedType)
                if (String(field_class) != String(clsPtr)) continue
                if (Number(insPtr) == Number(enumIndex++)) return (typeStr != "1" ? "Eunm -> " : "") + fieldName
            }
        }

        switch (typeStr) {
            case "Void":
                return ""
            case "String":
                return readU16(insPtr)
            case "Boolean":
                return readBoolean(insPtr) ? "True" : "False"
            case "Int32":
                return readInt(insPtr)
            case "UInt32":
                return readUInt(insPtr)
            case "Int64":
                return readUInt64(insPtr)
            case "Single":
                return readSingle(insPtr)
            case "Object":
            case "Transform":
            case "GameObject":
                return SeeTypeToString(insPtr, false)
            case "Texture":
                let w = callFunctionRI(["UnityEngine.CoreModule", "Texture", "GetDataWidth", 0], insPtr)
                let h = callFunctionRI(["UnityEngine.CoreModule", "Texture", "GetDataHeight", 0], insPtr)
                let r = callFunctionRI(["UnityEngine.CoreModule", "Texture", "get_isReadable", 0], insPtr)
                let m = callFunctionRI(["UnityEngine.CoreModule", "Texture", "get_wrapMode", 0], insPtr)
                r = r == 0 ? "False" : "True"
                m = m == 0 ? "Repeat" : (m == 1 ? "Clamp" : (m == 2 ? "Mirror" : "MirrorOnce"))
                return JSON.stringify([m, w, h, r])
            case "Component":
                if (insPtr == 0x0) return ""
                let mTransform = callFunction(["UnityEngine.CoreModule", "Component", "get_transform", 0], insPtr)
                let mGameObject = callFunction(["UnityEngine.CoreModule", "Component", "get_gameObject", 0], insPtr)
                let gName = getObjName(mGameObject)
                return gName + "\tG:" + mGameObject + " T:" + mTransform + ""
            case "IntPtr":
                if (insPtr == 0x0) return "0x0"
                return callFunctionRUS(find_method('mscorlib', 'IntPtr', 'ToString', 0), insPtr)
            case "Block":
            case "Block`1":
            case "UnityAction":
            case "Action":
            case "Action`1":
            case "Action`2":
                if (insPtr == 0x0) return "0x0"
                return ptr(insPtr).add(p_size == 4 ? 0x14 : 0x10).readPointer().readPointer().sub(soAddr)
            case "Delegate":
                if (insPtr == 0x0) return "0x0"
                let tmp_ptr = ptr(insPtr).add(0x8).readPointer()
                let temp_m_target = ptr(insPtr).add(0x10).readPointer()
                return tmp_ptr + "(" + tmp_ptr.sub(soAddr) + ")  m_target:" + temp_m_target + "  virtual:" + (ptr(insPtr).add(0x30).readInt() == 0x0 ? "false" : "true")
            case "Char":
                return insPtr.readCString()
            case "JObject":
                return getJclassName(insPtr, true)
            case "OBJ":
                let objName = getObjName(insPtr)
                let tmp_type_Ptr = callFunction(["mscorlib", "Object", "GetType", 0], insPtr)
                let tmp_str_Ptr = callFunction(["mscorlib", "Object", "ToString", 0], insPtr)
                if (clsPtr == 0x1) return [objName, readU16(tmp_str_Ptr), tmp_type_Ptr]
                return objName + "\t\t" + readU16(tmp_str_Ptr) + " (" + tmp_type_Ptr + ")"
            case "Image":
                let retStr = "Sprite : " + callFunction(["UnityEngine.UI", "Image", "get_sprite", 0], insPtr) + " | "
                retStr += ("Type : " + FackKnownType("Type", callFunctionRI(["UnityEngine.UI", "Image", "get_type", 0], insPtr), findClass("UnityEngine.UI", "Type")) + " | ")
                retStr += ("fillMethod : " + FackKnownType("FillMethod", callFunctionRI(["UnityEngine.UI", "Image", "get_fillMethod", 0], insPtr), findClass("UnityEngine.UI", "FillMethod")) + " ")
                return retStr
            case "Text":
                return callFunctionRUS(["UnityEngine.UI", "Text", "get_text", 0], insPtr)
            case "Vector2":
                return callFunctionRUS(["UnityEngine.CoreModule", "Vector2", "ToString", 0], insPtr)
            case "Vector3":
                return callFunctionRUS(["UnityEngine.CoreModule", "Vector3", "ToString", 0], insPtr)
            case "Vector4":
                return callFunctionRUS(["UnityEngine.CoreModule", "Vector4", "ToString", 0], insPtr)
            case "Color":
                // RGBA {float,float,float,float}  这里有问题，暂时没空改
                return callFunctionRUS(["UnityEngine.CoreModule", "Color", "ToString", 0], insPtr)
            case "Color32":
                return callFunctionRUS(["UnityEngine.CoreModule", "Color32", "ToString", 0], insPtr)
            case "Event":
                return callFunctionRUS(["UnityEngine.IMGUIModule", "Event", "ToString", 0], insPtr)
            case "Bounds":
                return callFunctionRUS(["UnityEngine.CoreModule", "Bounds", "ToString", 0], insPtr)
            case "TextAsset":
                return callFunctionRUS(["UnityEngine.CoreModule", "TextAsset", "ToString", 0], insPtr)
            case "Rect":
                return callFunctionRUS(["UnityEngine.CoreModule", "Rect", "ToString", 0], insPtr)
            case "Ray":
                return callFunctionRUS(["UnityEngine.CoreModule", "Ray", "ToString", 0], insPtr)
            case "Quaternion":
                return callFunctionRUS(["UnityEngine.CoreModule", "Quaternion", "ToString", 0], insPtr)
            case "Pose":
                return callFunctionRUS(["UnityEngine.CoreModule", "Pose", "ToString", 0], insPtr)
            case "Plane":
                return callFunctionRUS(["UnityEngine.CoreModule", "Plane", "ToString", 0], insPtr)
            case "Type":
                return callFunctionRUS(["mscorlib", "Type", "ToString", 0], insPtr)
            case "TextMeshPro":
            case "TextMeshProUGUI":
                return callFunctionRUS(["Unity.TextMeshPro", "TMP_Text", "GetParsedText", 0], insPtr)
            default:
                return callFunctionRUS(["mscorlib", "Object", "ToString", 0], insPtr)
        }
    } catch (e) {
        // LOG(e)
        return e
    }
}

/**
 * 解析 unity list
 * @param {Pointer} listPtr 该类专属的list实现类指针
 * @param {Pointer} valuePtr 带解析的list指针
 */
var ShowList = (listPtr, valuePtr, type) => {
    if (type = undefined) lffc(listPtr, valuePtr)
    let a_get_Count = getFunctionAddrFromCls(listPtr, "get_Count")
    let a_get_Capacity = getFunctionAddrFromCls(listPtr, "get_Capacity")
    let a_get_Item = getFunctionAddrFromCls(listPtr, "get_Item")

    let Count = callFunction(a_get_Count, valuePtr).toInt32()
    let Capacity = callFunction(a_get_Capacity, valuePtr).toInt32()
    LOG("\nList Size " + Count + " / " + Capacity + "   " + getType(valuePtr, 1) + "\n", LogColor.RED)

    for (let i = 0; i < Count; i++) {
        let header = String("[" + i + "]").length == 3 ? String("[" + i + "]  ") : String("[" + i + "] ")
        let mPtr = callFunction(a_get_Item, valuePtr, i)
        let name = ""
        try {
            name = getObjName(mPtr)
        } catch (e) {
            name = FackKnownType("-1", mPtr)
        }
        LOG(header + ptr(mPtr) + "\t\t" + name, LogColor.C36)
    }
    LOG("\n" + FackKnownType("-1", valuePtr) + "\n", LogColor.YELLOW)
}

var HookSendMessage = () => {
    try {
        let UnityPlayer = Java.use("com.unity3d.player.UnityPlayer")
        UnityPlayer.UnitySendMessage.implementation = function (str0, str1, str2) {
            LOG(`\n${getLine(15)}\tCalled UnitySendMessage\t${getLine(15)}`, LogColor.C36)
            console.log("UnityPlayer.UnitySendMessage(\x1b[96m'" + str0 + "','" + str1 + "','" + str2 + "'\x1b[0m)")
            this.UnitySendMessage(str0, str1, str2)
            PrintStackTrace()
        }
    } catch (e) {}
}

/**
 * 解析 Method 的权限符
 * @param {Number} method_ptr 
 */
let get_method_modifier = method_ptr => {
    let flags = ptr(method_ptr).add(p_size * 8 + 4).readU16()
    let access = flags & il2cppTabledefs.METHOD_ATTRIBUTE_MEMBER_ACCESS_MASK
    let ret_str = ""
    switch (access) {
        case il2cppTabledefs.METHOD_ATTRIBUTE_PRIVATE:
            ret_str += "private "
            break
        case il2cppTabledefs.METHOD_ATTRIBUTE_PUBLIC:
            ret_str += "public "
            break
        case il2cppTabledefs.METHOD_ATTRIBUTE_FAMILY:
            ret_str += "protected "
            break
        case il2cppTabledefs.METHOD_ATTRIBUTE_ASSEM:
        case il2cppTabledefs.METHOD_ATTRIBUTE_FAM_AND_ASSEM:
            ret_str += "internal "
            break
        case il2cppTabledefs.METHOD_ATTRIBUTE_FAM_OR_ASSEM:
            ret_str += "protected internal "
            break
    }

    if (flags & il2cppTabledefs.METHOD_ATTRIBUTE_STATIC) {
        ret_str += "static "
    }

    if (flags & il2cppTabledefs.METHOD_ATTRIBUTE_ABSTRACT) {
        ret_str += "abstract "
        if ((flags & il2cppTabledefs.METHOD_ATTRIBUTE_VTABLE_LAYOUT_MASK) == il2cppTabledefs.METHOD_ATTRIBUTE_REUSE_SLOT) {
            ret_str += "override "
        }
    } else if (flags & il2cppTabledefs.METHOD_ATTRIBUTE_FINAL) {
        if ((flags & il2cppTabledefs.METHOD_ATTRIBUTE_VTABLE_LAYOUT_MASK) == il2cppTabledefs.METHOD_ATTRIBUTE_REUSE_SLOT) {
            ret_str += "sealed override "
        }
    } else if (flags & il2cppTabledefs.METHOD_ATTRIBUTE_VIRTUAL) {
        if ((flags & il2cppTabledefs.METHOD_ATTRIBUTE_VTABLE_LAYOUT_MASK) == il2cppTabledefs.METHOD_ATTRIBUTE_NEW_SLOT) {
            ret_str += "virtual "
        } else {
            ret_str += "override "
        }
    }
    if (flags & il2cppTabledefs.METHOD_ATTRIBUTE_PINVOKE_IMPL) {
        ret_str += "extern "
    }
    return ret_str
}

/**
 * 可用的字体颜色demo
 */
var printLogColors = () => {
    let str = "123456789"
    LOG(`${getLine(16)}  listLogColors ${getLine(16)}`)
    for (let i = 30; i <= 37; i++) console.log("\t\t\x1b[" + i + "mC" + i + "\t" + str + "\x1b[0m")
    var line = getLine(50)
    LOG(line)
    for (let i = 40; i <= 47; i++) console.log("\t\t\x1b[" + i + "mC" + i + "\t" + str + "\x1b[0m")
    LOG(line)
    for (let i = 90; i <= 97; i++) console.log("\t\t\x1b[" + i + "mC" + i + "\t" + str + "\x1b[0m")
    LOG(line)
    for (let i = 100; i <= 107; i++) console.log("\t\t\x1b[" + i + "mC" + i + "\t" + str + "\x1b[0m")
    LOG(line)
}

const il2cppTabledefs = {
    METHOD_ATTRIBUTE_MEMBER_ACCESS_MASK: 0x0007,
    METHOD_ATTRIBUTE_COMPILER_CONTROLLED: 0x0000,
    METHOD_ATTRIBUTE_PRIVATE: 0x0001,
    METHOD_ATTRIBUTE_FAM_AND_ASSEM: 0x0002,
    METHOD_ATTRIBUTE_ASSEM: 0x0003,
    METHOD_ATTRIBUTE_FAMILY: 0x0004,
    METHOD_ATTRIBUTE_FAM_OR_ASSEM: 0x0005,
    METHOD_ATTRIBUTE_PUBLIC: 0x0006,

    METHOD_ATTRIBUTE_STATIC: 0x0010,
    METHOD_ATTRIBUTE_FINAL: 0x0020,
    METHOD_ATTRIBUTE_VIRTUAL: 0x0040,
    METHOD_ATTRIBUTE_ABSTRACT: 0x0400,
    METHOD_ATTRIBUTE_PINVOKE_IMPL: 0x2000,
    METHOD_ATTRIBUTE_VTABLE_LAYOUT_MASK: 0x0100,

    METHOD_ATTRIBUTE_REUSE_SLOT: 0x0000,
    METHOD_ATTRIBUTE_NEW_SLOT: 0x0100,
    METHOD_ATTRIBUTE_PINVOKE_IMPL: 0x2000,
}

const FieldAccess = {
    FIELD_ATTRIBUTE_FIELD_ACCESS_MASK: 0x0007,
    FIELD_ATTRIBUTE_COMPILER_CONTROLLED: 0x0000,
    FIELD_ATTRIBUTE_PRIVATE: 0x0001,
    FIELD_ATTRIBUTE_FAM_AND_ASSEM: 0x0002,
    FIELD_ATTRIBUTE_ASSEMBLY: 0x0003,
    FIELD_ATTRIBUTE_FAMILY: 0x0004,
    FIELD_ATTRIBUTE_FAM_OR_ASSEM: 0x0005,
    FIELD_ATTRIBUTE_PUBLIC: 0x0006,

    FIELD_ATTRIBUTE_STATIC: 0x0010,
    FIELD_ATTRIBUTE_INIT_ONLY: 0x0020,
    FIELD_ATTRIBUTE_LITERAL: 0x0040,
    FIELD_ATTRIBUTE_NOT_SERIALIZED: 0x0080,
    FIELD_ATTRIBUTE_SPECIAL_NAME: 0x0200,
    FIELD_ATTRIBUTE_PINVOKE_IMPL: 0x2000,

    FIELD_ATTRIBUTE_RESERVED_MASK: 0x9500,
    FIELD_ATTRIBUTE_RT_SPECIAL_NAME: 0x0400,
    FIELD_ATTRIBUTE_HAS_FIELD_MARSHAL: 0x1000,
    FIELD_ATTRIBUTE_HAS_DEFAULT: 0x8000,
    FIELD_ATTRIBUTE_HAS_FIELD_RVA: 0x0100
}

const LogColor = {
    WHITE: 0,
    RED: 1,
    YELLOW: 3,
    C31: 31,
    C32: 32,
    C33: 33,
    C34: 34,
    C35: 35,
    C36: 36,
    C41: 41,
    C42: 42,
    C43: 43,
    C44: 44,
    C45: 45,
    C46: 46,
    C90: 90,
    C91: 91,
    C92: 92,
    C93: 93,
    C94: 94,
    C95: 95,
    C96: 96,
    C97: 97,
    C100: 100,
    C101: 101,
    C102: 102,
    C103: 103,
    C104: 104,
    C105: 105,
    C106: 106,
    C107: 107
}

// 2021.2.7f1c1
// typedef struct MethodInfo {
//     Il2CppMethodPointer methodPointer;
//     Il2CppMethodPointer virtualMethodPointer;
//     InvokerMethod invoker_method;
//     const char * name;
//     Il2CppClass * klass;
//     const Il2CppType * return_type;
//     const Il2CppType ** parameters;

var MethodInfoOffset = 0x1

var getClassName = klass => ptr(klass).add(p_size * 2).readPointer().readCString()

var getMethodName = method => ptr(method).add(p_size * (2 + MethodInfoOffset)).readPointer().readCString()

var getFieldsCount = kclass => il2cpp_class_num_fields(ptr(kclass))

var getImgName = img => ptr(img).add(p_size * 1).readPointer().readCString()

var getMethodParametersCount = method => ptr(method).add(p_size * (8 + MethodInfoOffset) + 4 + 2 + 2 + 2).readU8()

var getMethodParameters = method => ptr(method).add(p_size * (5 + MethodInfoOffset)).readPointer()

var getMethodReturnType = method => ptr(method).add(p_size * (4 + MethodInfoOffset)).readPointer()

var getParameterName = ParameterInfo => ptr(ParameterInfo).readPointer().readCString()

var getParameterType = Il2CppType => ptr(Il2CppType).add(4 * 2 + p_size).readPointer()

var getClassAddrFromMethodInfo = methodInfo => ptr(methodInfo).add(p_size * (3 + MethodInfoOffset)).readPointer()

var getClassNameFromMethodInfo = methodInfo => getClassName(getClassAddrFromMethodInfo(methodInfo))

var class_is_enum = Pcls => callFunction(checkPointer([soName, "il2cpp_class_is_enum"]), Pcls) == 0x1

/**
 * -------------------------------------------其他方法-------------------------------------------------
 */

/**
 * 修改函数参数或者返回值
 * @param {Pointer} mPtr    函数地址
 * @param {Boolean} boolean 返回值修改为True/False
 * @param {Number}  index   null == ret / {0,1,2....} 等于修改第几个参数
 */
var setFunctionBoolean = (mPtr, boolean, index) => setFunctionValue(mPtr, boolean == true ? 0x1 : 0x0, index)

var setFunctionValue = (mPtr, value, index) => {
    mPtr = ptr(mPtr)
    A(mPtr, (args) => {
        if (index != undefined) args[index] = ptr(value)
    }, (ret) => {
        if (index == undefined) ret.replace(ptr(value))
        LOG("\nCalled function at " + mPtr + " ---> " + mPtr.sub(soAddr) + " Changed RET", LogColor.C93)
    })
}

// callFunction("strcmp",allocStr("123"),allocStr("123"))
// callFunction(["strcmp"],allocStr("123"),allocStr("123"))
// callFunction(["libc.so","strcmp"],allocStr("123"),allocStr("123"))
function callFunction(value, ...args) {
    try {
        if (value == undefined || value == null || value == 0x0) return ptr(0x0)
        for (let i = 1; i <= (arguments.length < 7 ? 7 : arguments.length) - 1; i++)
            arguments[i] = arguments[i] == undefined ? ptr(0x0) : ptr(String(arguments[i]))
        return new NativeFunction(checkPointer(value, true), 'pointer', ['pointer', 'pointer', 'pointer', 'pointer', 'pointer', 'pointer'])
            (arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6])
    } catch (e) {
        LOG(e, LogColor.C95)
        return ptr(0)
    }
}

// 返回 boolean
var callFunctionRB = (mPtr, ...args) => callFunctionRI(mPtr, ...args) == 1

// 返回值 toInt32
var callFunctionRI = (mPtr, ...args) => callFunction(mPtr, ...args).toInt32()

// readSingle
var callFunctionRS = (mPtr, ...args) => readSingle(callFunction(mPtr, ...args))

// readFloat
var callFunctionRF = (mPtr, ...args) => alloc(p_size * 2).writePointer(ptr(callFunction(mPtr, ...args))).readFloat()

// 返回值为 Unity String
var callFunctionRUS = (mPtr, ...args) => readU16(callFunction(mPtr, ...args))

// 返回值为 C String
var callFunctionRCS = (mPtr, ...args) => callFunction(mPtr, ...args).readCString()

// 返回值为 [] / display / hashset size off:0x10
var callFunctionRA = (mPtr, ...args) => showArray(callFunction(mPtr, ...args))

var showArray = mPtr => {
    if (mPtr == undefined || mPtr == 0x0) return
    let retPtr = ptr(mPtr)
    let arrLength = ptr(retPtr).add(p_size * 3).readUInt()
    LOGD("\n[*] Array length : " + arrLength + "  |  RET => " + retPtr + "\n")
    if (arrLength == 0) return
    seeHexA(ptr(retPtr).add(p_size * 4), (arrLength > 32 ? 32 : arrLength) * p_size, false, LogColor.C33)
    LOG("\n")
    for (let i = 0; i < arrLength; ++i) {
        let tmpPtr = ptr(retPtr).add(p_size * (4 + i))
        let ObjToString = callFunctionRUS(["mscorlib", "Object", "ToString", 0], tmpPtr.readPointer())
        if (ObjToString == "UnityEngine.UI.Text")
            ObjToString += ("\t" + callFunctionRUS(["UnityEngine.UI", "Text", "get_text", 0], tmpPtr.readPointer()))
        LOGD(String("[" + i + "]").padEnd(5, " ") + " " + tmpPtr + " ---> " + tmpPtr.readPointer() + "  |  " + ObjToString)
    }
    LOG("\n")
}

var breakWithArgs = (mPtr, argCount) => {
    mPtr = checkPointer(mPtr)
    A(mPtr, (args, ctx) => {
        LOG("\n" + getLine(65), LogColor.C33)
        LOG("Called from " + ptr(mPtr) + " ---> " + ptr(mPtr).sub(soAddr) + "\t|  LR : " + checkCtx(ctx.lr) + "\n", LogColor.C96)
        let tStr = String(args[0])
        for (let t = 1; t < (argCount == undefined ? 4 : argCount); t++) tStr += "\t" + args[t]
        LOGD(tStr)
    }, (ret) => {
        LOGD("End Function return ---> " + ret)
    })
}

var breakWithStack = mPtr => {
    mPtr = checkPointer(mPtr)
    A(mPtr, (args, ctx) => {
        LOG("\n" + getLine(65), LogColor.C33)
        LOG("Called from " + ptr(mPtr) + " ---> " + ptr(mPtr) + "\t|  LR : " + checkCtx(ctx.lr) + "\n", LogColor.C96)
        PrintStackTraceN(ctx)
        LOG("\n" + getLine(65), LogColor.C33)
    })
}

var breakInline = (mPtr, filterRigster, maxCount) => {
    if (maxCount == undefined) maxCount = 10
    mPtr = checkPointer(mPtr)
    A(mPtr, (args, ctx) => {
        LOG("\n" + getLine(65), LogColor.C33)
        if (Process.arch != "arm" && filterRigster != undefined && filterDuplicateOBJ(String(filterReg(filterRigster, ctx)), maxCount) == -1) return
        LOG("Called from " + ptr(mPtr) + " ---> " + ptr(mPtr).sub(soAddr) + "\n", LogColor.C96)
        LOGD(JSON.stringify(ctx))
    })
}

/**
 * 用作inlinehook中不指定使用动态查找功能，手动配置一些常用的基础参数
 */
var printExp = () => {

    LOG("\n\til2cpp_get_corlib = (Il2CppImage *(*)()) ( soAddr + " + checkPointer([soName, 'il2cpp_get_corlib']).sub(soAddr) + ");", LogColor.C36)
    LOG("\til2cpp_domain_get = (Il2CppDomain *(*)()) ( soAddr + " + checkPointer([soName, "il2cpp_domain_get"]).sub(soAddr) + ");", LogColor.C36)
    LOG("\til2cpp_domain_get_assemblies = (Il2CppAssembly **(*)(const Il2CppDomain *,size_t *)) ( soAddr + " + Module.findExportByName(soName, 'il2cpp_domain_get_assemblies').sub(soAddr) + ");", LogColor.C36)
    LOG("\til2cpp_assembly_get_image = (Il2CppImage *(*)(const Il2CppAssembly *)) ( soAddr + " + Module.findExportByName(soName, 'il2cpp_assembly_get_image').sub(soAddr) + ");", LogColor.C36)
    LOG("\til2cpp_image_get_class_count = (size_t (*)(const Il2CppImage *)) ( soAddr + " + Module.findExportByName(soName, 'il2cpp_image_get_class_count').sub(soAddr) + ");", LogColor.C36)
    LOG("\til2cpp_image_get_class = (Il2CppClass *(*)(const Il2CppImage *,size_t)) ( soAddr + " + Module.findExportByName(soName, 'il2cpp_image_get_class').sub(soAddr) + ");", LogColor.C36)
    LOG("\til2cpp_class_get_methods = (MethodInfo *(*)(Il2CppClass *,void **)) ( soAddr + " + Module.findExportByName(soName, 'il2cpp_class_get_methods').sub(soAddr) + ");", LogColor.C36)
    LOG("\til2cpp_class_from_type = (Il2CppClass *(*)(const Il2CppType *)) ( soAddr + " + Module.findExportByName(soName, 'il2cpp_class_from_type').sub(soAddr) + ");", LogColor.C36)
    LOG("\til2cpp_class_get_type = (Il2CppType *(*)(Il2CppClass *)) ( soAddr + " + Module.findExportByName(soName, 'il2cpp_class_get_type').sub(soAddr) + ");", LogColor.C36)
    LOG("\til2cpp_class_from_system_type = (Il2CppClass *(*)(Il2CppReflectionType *)) ( soAddr + " + Module.findExportByName(soName, 'il2cpp_class_from_system_type').sub(soAddr) + ");", LogColor.C36)
    LOG("\til2cpp_class_from_name = (Il2CppClass *(*)(const Il2CppImage *, const char *,const char *)) ( soAddr + " + Module.findExportByName(soName, 'il2cpp_class_from_name').sub(soAddr) + ");", LogColor.C36)
    LOG("\til2cpp_class_get_method_from_name = (MethodInfo *(*)(Il2CppClass *,const char *,int)) ( soAddr + " + Module.findExportByName(soName, 'il2cpp_class_get_method_from_name').sub(soAddr) + ");", LogColor.C36)
    LOG("\til2cpp_string_new = (MonoString *(*)(const char *))  ( soAddr + " + Module.findExportByName(soName, 'il2cpp_string_new').sub(soAddr) + ");", LogColor.C36)
    LOG("\til2cpp_type_get_name = (char *(*)(const Il2CppType *)) ( soAddr + " + Module.findExportByName(soName, 'il2cpp_type_get_name').sub(soAddr) + ");", LogColor.C36)
    LOG("\til2cpp_type_get_class_or_element_class = (Il2CppClass *(*)(const Il2CppType *)) ( soAddr + " + Module.findExportByName(soName, 'il2cpp_type_get_class_or_element_class').sub(soAddr) + ");\n", LogColor.C36)

    LOG("\n\told_func_OnPointerClick = reinterpret_cast<void *(*)(void *, void *)>(soAddr + " + find_method("UnityEngine.UI", "Button", "OnPointerClick", 1, false, 2) + ");", LogColor.C96)
    LOG("\told_get_pointerEnter = reinterpret_cast<GameObject *(*)(void *)>(soAddr + " + find_method("UnityEngine.UI", "PointerEventData", "get_pointerEnter", 0, false, 2) + ");", LogColor.C96)
    LOG("\told_func_SetActive = reinterpret_cast<void *(*)(void *, bool)>(soAddr + " + find_method("UnityEngine.CoreModule", "GameObject", "SetActive", 1, false, 2) + ");", LogColor.C96)
    LOG("\told_func_getTransform = reinterpret_cast<Transform *(*)(void *)>(soAddr + " + find_method("UnityEngine.CoreModule", "GameObject", "get_transform", 0, false, 2) + ");", LogColor.C96)
    LOG("\told_func_GetName = reinterpret_cast<MonoString *(*)(void *)>(soAddr + " + find_method("UnityEngine.CoreModule", "Object", "GetName", 1, false, 2) + ");", LogColor.C96)
    LOG("\told_func_GetParent = reinterpret_cast<Transform *(*)(void *)>(soAddr + " + find_method("UnityEngine.CoreModule", "Transform", "GetParent", 0, false, 2) + ");", LogColor.C96)
    LOG("\told_func_get_childCount = reinterpret_cast<int (*)(void *)>(soAddr + " + find_method("UnityEngine.CoreModule", "Transform", "get_childCount", 0, false, 2) + ");", LogColor.C96)
    LOG("\told_func_GetChild = reinterpret_cast<Transform *(*)(void *, int)>(soAddr + " + find_method("UnityEngine.CoreModule", "Transform", "GetChild", 1, false, 2) + ");", LogColor.C96)
    LOG("\told_func_set_localScale_Injected = reinterpret_cast<void *(*)(void *, void *)>(soAddr + " + find_method("UnityEngine.CoreModule", "Transform", "set_localScale_Injected", 1, false, 2) + ");", LogColor.C96)
    LOG("\told_func_set_LocalPosition = reinterpret_cast<void *(*)(void *, void *)>(soAddr + " + find_method("UnityEngine.CoreModule", "Transform", "set_localPosition_Injected", 1, false, 2) + ");", LogColor.C96)
    LOG("\told_func_get_gameObject = reinterpret_cast<GameObject *(*)(void *)>(soAddr + " + find_method("UnityEngine.CoreModule", "Component", "get_gameObject", 0, false, 2) + ");", LogColor.C96)
    LOG("\told_get_text = reinterpret_cast<MonoString *(*)(void *)>(soAddr + " + find_method("UnityEngine.UI", "Text", "get_text", 0, false, 2) + ");", LogColor.C96)
    LOG("\told_set_text = reinterpret_cast<void *(*)(void *, MonoString *)>(soAddr + " + find_method("UnityEngine.UI", "Text", "set_text", 1, false, 2) + ");", LogColor.C96)
    LOG("\told_func_SetInt = reinterpret_cast<void *(*)(MonoString *, int)>(soAddr + " + find_method("UnityEngine.CoreModule", "PlayerPrefs", "SetInt", 2, false, 2) + ");", LogColor.C96)
    LOG("\told_func_GetInt = reinterpret_cast<int (*)(MonoString *, int)>(soAddr + " + find_method("UnityEngine.CoreModule", "PlayerPrefs", "GetInt", 2, false, 2) + ");", LogColor.C96)
    LOG("\ttransform_find = reinterpret_cast<Transform *(*)(Transform *, MonoString *)>(soAddr + " + find_method("UnityEngine.CoreModule", "Transform", "Find", 1, false, 2) + ");", LogColor.C96)
    LOG("\tgameObj_find = reinterpret_cast<GameObject *(*)(MonoString *)>(soAddr + " + find_method("UnityEngine.CoreModule", "GameObject", "Find", 1, false, 2) + ");", LogColor.C96)
    try {
        LOG("\tTMPText_GetTransform = reinterpret_cast<Transform *(*)(void *)>(soAddr + " + find_method("Unity.TextMeshPro", "TMP_Text", "get_transform", 0, false, 2) + ");", LogColor.C96)
        LOG("\tTMPText_getText = reinterpret_cast<MonoString *(*)(void *)>(soAddr + " + find_method("Unity.TextMeshPro", "TMP_Text", "get_text", 0, false, 2) + ");", LogColor.C96)
        LOG("\tTMPText_setText = reinterpret_cast<void (*)(void *, MonoString *)>(soAddr + " + find_method("Unity.TextMeshPro", "TMP_Text", "set_text", 1, false, 2) + ");", LogColor.C96)
    } catch (e) {}
    try {
        LOG("\tTextMeshPro_GetTransform = reinterpret_cast<Transform *(*)(void *)>(soAddr + " + find_method("Unity.TextMeshPro", "TextMeshPro", "get_transform", 0, false, 2) + ");", LogColor.C96)
        LOG("\tTextMeshPro_getText = reinterpret_cast<MonoString *(*)(void *)>(soAddr + " + find_method("Unity.TextMeshPro", "TextMeshPro", "get_text", 0, false, 2) + ");", LogColor.C96)
        LOG("\tTextMeshPro_setText = reinterpret_cast<void (*)(void *, MonoString *)>(soAddr + " + find_method("Unity.TextMeshPro", "TextMeshPro", "set_text", 1, false, 2) + ");", LogColor.C96)
    } catch (e) {}
    try {
        LOG("\tTMPText_ParseInputText = reinterpret_cast < void * ( * )(void * ) > (soAddr +" + find_method("Unity.TextMeshPro", "TMP_Text", "ParseInputText", 0, false, 2) + ");", LogColor.C96)
    } catch {}
    try {
        LOG("\tGetKeyDown = reinterpret_cast<bool (*)(void *)>(soAddr + " + find_method("UnityEngine.InputLegacyModule", "Input", "GetKeyDown", 1, false, 2) + ");", LogColor.C96)
        LOG("\tQuit_0 = reinterpret_cast<bool (*)()>(soAddr + " + find_method("UnityEngine.CoreModule", "Application", "Quit", 0, false, 2) + ");", LogColor.C96)
        LOG("\tQuit_1 = reinterpret_cast<bool (*)(int)>(soAddr + " + find_method("UnityEngine.CoreModule", "Application", "Quit", 1, false, 2) + ");\n", LogColor.C96)
    } catch {}

    LOGE("\t" + getLine(80))

    printInfo()

    function printInfo() {

        try {
            LOG('\n\t// find_method("UnityEngine.UI","Button","OnPointerClick",1,false)', LogColor.C36)
            LOG("\tunsigned long p_OnPointerClick      = base + " + canUseInlineHook(find_method("UnityEngine.UI", "Button", "OnPointerClick", 1), 3) + ";", LogColor.C36)
            LOG('\t// find_method("UnityEngine.UI","PointerEventData","get_pointerEnter",0,false)', LogColor.C36)
            LOG("\tunsigned long p_get_pointerEnter    = base + " + canUseInlineHook(find_method("UnityEngine.UI", "PointerEventData", "get_pointerEnter", 0), 3) + ";", LogColor.C36)
            LOG('\t// find_method("UnityEngine.CoreModule","GameObject","SetActive",1,false)', LogColor.C36)
            LOG("\tunsigned long p_SetActive           = base + " + canUseInlineHook(find_method("UnityEngine.CoreModule", "GameObject", "SetActive", 1), 3) + ";", LogColor.C36)
            LOG('\t// find_method("UnityEngine.CoreModule","GameObject","get_transform",0,false)', LogColor.C36)
            LOG("\tunsigned long p_getTransform        = base + " + canUseInlineHook(find_method("UnityEngine.CoreModule", "GameObject", "get_transform", 0), 3) + ";", LogColor.C36)
            LOG('\t// find_method("UnityEngine.CoreModule","Object","GetName",1,false)', LogColor.C36)
            LOG("\tunsigned long p_getName             = base + " + canUseInlineHook(find_method("UnityEngine.CoreModule", "Object", "GetName", 1), 3) + ";", LogColor.C36)
            LOG('\t// find_method("UnityEngine.CoreModule","Transform","GetParent",0,false)', LogColor.C36)
            LOG("\tunsigned long p_getParent           = base + " + canUseInlineHook(find_method("UnityEngine.CoreModule", "Transform", "GetParent", 0), 3) + ";", LogColor.C36)
            LOG('\t// find_method("UnityEngine.CoreModule","Transform","get_childCount",0,false)', LogColor.C36)
            LOG("\tunsigned long p_getChildCount       = base + " + canUseInlineHook(find_method("UnityEngine.CoreModule", "Transform", "get_childCount", 0), 3) + ";", LogColor.C36)
            LOG('\t// find_method("UnityEngine.CoreModule","Transform","GetChild",1,false)', LogColor.C36)
            LOG("\tunsigned long p_getChild            = base + " + canUseInlineHook(find_method("UnityEngine.CoreModule", "Transform", "GetChild", 1), 3) + ";", LogColor.C36)
            LOG('\t// find_method("UnityEngine.CoreModule","Transform","set_localScale_Injected",1,false)', LogColor.C36)
            LOG("\tunsigned long p_setlocalScale       = base + " + canUseInlineHook(find_method("UnityEngine.CoreModule", "Transform", "set_localScale_Injected", 1), 3) + ";", LogColor.C36)
            LOG('\t// find_method("UnityEngine.CoreModule","Component","get_gameObject",0,false)', LogColor.C36)
            LOG("\tunsigned long p_get_gameObject      = base + " + canUseInlineHook(find_method("UnityEngine.CoreModule", "Component", "get_gameObject", 0), 3) + ";", LogColor.C36)

            try {
                LOG('\t// find_method("UnityEngine.CoreModule", "GameObject", "Find", 1,false)', LogColor.C36)
                LOG("\tunsigned long gameObj_find          = base + " + canUseInlineHook(find_method("UnityEngine.CoreModule", "GameObject", "Find", 1), 3) + ";", LogColor.C36)
                LOG('\t// find_method("UnityEngine.CoreModule", "Transform", "Find", 1,false)', LogColor.C36)
                LOG("\tunsigned long transform_find        = base + " + canUseInlineHook(find_method("UnityEngine.CoreModule", "Transform", "Find", 1), 3) + ";", LogColor.C36)

            } catch (e) {}

            LOG('\n\t// find_method("UnityEngine.CoreModule","Transform","set_localPosition_Injected",1,false)', LogColor.C96)
            LOG("\tf_setLocalPosition \t= reinterpret_cast<void *(*)(void *, void *)>\t\t(base + " + find_method("UnityEngine.CoreModule", "Transform", "set_localPosition_Injected", 1).sub(soAddr) + ");", LogColor.C96)
            LOG('\t// find_method("UnityEngine.UI","Text","set_text",1,false)', LogColor.C96)
            LOG("\tf_set_text \t\t= reinterpret_cast<void *(*)(void *, MonoString *)>\t(base + " + find_method("UnityEngine.UI", 'Text', 'set_text', 1).sub(soAddr) + ");", LogColor.C96)
            LOG('\t// find_method("UnityEngine.UI","Text","get_text",0,false)', LogColor.C96)
            LOG("\tf_get_text \t\t= reinterpret_cast<MonoString *(*)(void *)>\t\t(base + " + find_method("UnityEngine.UI", 'Text', 'get_text', 0).sub(soAddr) + ");\n", LogColor.C96)

            // return

            LOG('\n\t// find_method("UnityEngine.CoreModule","PlayerPrefs","SetInt",2,false)')
            var SetInt = find_method("UnityEngine.CoreModule", "PlayerPrefs", "SetInt", 2)
            LOG("\tunsigned long p_SetInt       = base + " + (SetInt == 0 ? "0x0" : SetInt.sub(soAddr)) + ";")
            LOG('\t// find_method("UnityEngine.CoreModule","PlayerPrefs","GetInt",2,false)')
            var GetInt = find_method("UnityEngine.CoreModule", "PlayerPrefs", "GetInt", 2)
            LOG("\tunsigned long p_GetInt       = base + " + (GetInt == 0 ? "0x0" : GetInt.sub(soAddr)) + ";")
            LOG('\t// find_method("UnityEngine.CoreModule","PlayerPrefs","SetFloat",2,false)')
            var SetFloat = find_method("UnityEngine.CoreModule", "PlayerPrefs", "SetFloat", 2)
            LOG("\tunsigned long p_SetFloat     = base + " + (SetFloat == 0 ? "0x0" : SetFloat.sub(soAddr)) + ";")
            LOG('\t// find_method("UnityEngine.CoreModule","PlayerPrefs","SetString",2,false)')
            var SetString = find_method("UnityEngine.CoreModule", "PlayerPrefs", "SetString", 2)
            LOG("\tunsigned long p_SetString    = base + " + (SetString == 0 ? "0x0" : SetString.sub(soAddr)) + ";")

            LOG('\n\tins.recordSymbols({"il2cpp_string_new": ' + checkPointer([soName, 'il2cpp_string_new']).sub(soAddr) +
                ', "FindClass": ' + find_method("UnityEngine.AndroidJNIModule", "AndroidJNI", "FindClass", 1).sub(soAddr) +
                ', "GetStaticMethodID": ' + find_method("UnityEngine.AndroidJNIModule", "AndroidJNI", "GetStaticMethodID", 3).sub(soAddr) +
                ',"CallStaticVoidMethod": ' + find_method("UnityEngine.AndroidJNIModule", "AndroidJNI", "CallStaticVoidMethod", 3).sub(soAddr) +
                '})')
        } catch (e) {
            LOG(e, LogColor.RED)
        }

        LOG("\n")
    }
}

/**
 * 通过 methodinfo 找到当前方法的 class 中的所有方法
 * @param {Pointer} methodInfo 
 * @returns 
 */
let listMethodsFromMethodInfo = methodInfo => {
    if (methodInfo == null || methodInfo == undefined) return
    var Pcls = ptr(methodInfo).add(p_size * 3).readPointer()
    showMethodInfo(methodInfo)
    if (Pcls != null) m(Pcls)
}

var showMethodInfo = methodInfo => {

    let methodName = getMethodName(methodInfo)
    let methodPointer = ptr(methodInfo).add(p_size * 0).readPointer()
    let methodPointerR = methodPointer.sub(soAddr)
    let Il2CppClass = ptr(methodInfo).add(p_size * 3).readPointer()
    let clsName = getClassName(Il2CppClass)
    let clsNamespaze = ptr(Il2CppClass).add(p_size * 3).readPointer().readCString()
    let Il2CppImage = Il2CppClass.readPointer()
    let imgName = getImgName(Il2CppImage)
    let Il2CppAssembly = ptr(Il2CppImage).add(p_size * 2)

    LOG("\nCurrent Function " + methodName + "\t" + getMethodParametersCount(methodInfo) + "\t0x" + Number(methodInfo).toString(16) + " ---> " + methodPointer + " ---> " + methodPointerR + "\n", LogColor.C96)
    LOG(methodName + " ---> " + clsName + "(" + Il2CppClass + ") ---> " + (String(clsNamespaze).length == 0 ? " - " : clsNamespaze) + " ---> " + imgName + "(" + Il2CppImage + ") ---> Il2CppAssembly(" + Il2CppAssembly + ")", LogColor.C96)
}

let listFieldsFromMethodInfo = (methodInfo, instance) => {
    if (methodInfo == null || methodInfo == undefined) return
    let Pcls = ptr(methodInfo).add(p_size * 3).readPointer()
    showMethodInfo(methodInfo)
    if (Pcls != null) listFieldsFromCls(Pcls, instance)
}

function listFieldsFromCls(klass, instance) {
    if (klass == undefined || klass == null) return
    klass = ptr(klass)
    if (instance != undefined) instance = ptr(instance)
    let fieldsCount = getFieldsCount(klass)
    if (fieldsCount <= 0) return
    let is_enum = class_is_enum(klass)
    if (arguments[2] == undefined)
        LOG("\nFound " + fieldsCount + " Fields" + (is_enum == 0x1 ? "(enum)" : "") + " in class: " + getClassName(klass) + " (" + klass + ")", LogColor.C96)
    // ...\Data\il2cpp\libil2cpp\il2cpp-class-internals.h
    let iter = alloc()
    let field = null
    let maxlength = 0
    let arrStr = new Array()
    let enumIndex = 0
    while (field = il2cpp_class_get_fields(klass, iter)) {
        if (field == 0x0) break
        let fieldName = field.readPointer().readCString()
        let filedType = field.add(p_size).readPointer()
        let filedOffset = "0x" + field.add(3 * p_size).readInt().toString(16)
        let field_class = il2cpp_class_from_type(filedType)
        let fieldClassName = getClassName(field_class)
        let accessStr = fackAccess(filedType)
        accessStr = accessStr.substring(0, accessStr.length - 1)
        let enumStr = (is_enum && (String(field_class) == String(klass))) ? (enumIndex++ + "\t") : " "
        let retStr = filedOffset + "\t" + accessStr + "\t" + fieldClassName + "\t" + field_class + "\t" + fieldName + "\t" + enumStr
        if (arguments[2] == "1" && fieldName == arguments[3]) return ptr(filedOffset)
        if (arguments[2] == "2" && fieldName == arguments[3]) {
            let tmpValue = instance != 0 ? ptr(instance).add(ptr(filedOffset)) : ptr(0)
            let tmpValueR = instance != 0 ? ptr(instance).add(ptr(filedOffset)).readPointer() : ptr(0)
            return [fieldName, filedOffset, field_class, fieldClassName, tmpValue, tmpValueR]
        }
        arrStr.push(retStr)
        maxlength = retStr.length < maxlength ? maxlength : retStr.length
    }
    if (arguments[2] != undefined && fieldName == arguments[3]) return ptr(0)

    LOG("\n" + getLine(maxlength + 5), LogColor.C33)

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
        if (instance != undefined && str.indexOf("static") == -1) {
            let mPtr = ptr(instance).add(mStr[0])
            let realP = mPtr.readPointer()
            let fRet = FackKnownType(mName, realP, mStr[3])
            // 当它是boolean的时候只保留 最后两位显示
            if (mName == "Boolean") {
                let header = String(realP).substr(0, 2)
                let endstr = String(realP).substr(String(realP).length - 2, String(realP).length).replace("x", "0")
                let middle = getLine(((Process.arch == "arm" ? 10 : 14) - 2 - 2), ".")
                realP = header + middle + endstr
            }
            fRet = fRet == "UnKnown" ? (mPtr + " ---> " + realP) : (mPtr + " ---> " + realP + " ---> " + fRet)
            LOG("\t" + fRet + "\n", LogColor.C90)
        } else if (str.indexOf("static") != -1) {
            // console.warn(+ptr(mStr[3])+allocStr(mStr[4])+"\t"+mStr[4])
            let field = il2cpp_class_get_field_from_name(ptr(mStr[3]), allocStr(mStr[4]))
            if (!field.isNull()) {
                let addrOut = alloc()
                il2cpp_field_static_get_value(field, addrOut)
                let realP = addrOut.readPointer()
                LOG("\t" + addrOut + " ---> " + realP + " ---> " + FackKnownType(mName, realP, mStr[3]), LogColor.C90)
            }
            LOG("\n")
        }
    })
    LOG(getLine(maxlength + 5), LogColor.C33)

    function fackAccess(m_type) {
        let attrs = m_type.add(p_size).readPointer()
        let outPut = ""
        let access = attrs & FieldAccess.FIELD_ATTRIBUTE_FIELD_ACCESS_MASK
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
        if (attrs & FieldAccess.FIELD_ATTRIBUTE_LITERAL) {
            outPut += "const "
        } else {
            if (attrs & FieldAccess.FIELD_ATTRIBUTE_STATIC) {
                outPut += "static "
            }
            if (attrs & FieldAccess.FIELD_ATTRIBUTE_INIT_ONLY) {
                outPut += "readonly "
            }
        }
        return outPut
    }
}

let readStatic = (imageName, className, fieldName) => {
    let pCls = findClass(imageName, className)
    if (pCls == null) return ptr(-1)
    const field = il2cpp_class_get_field_from_name(pCls, allocStr(fieldName))
    if (field.isNull()) return ptr(-2)
    const addrOut = alloc()
    il2cpp_field_static_get_value(field, addrOut)
    return addrOut.readPointer()
}

var BF = methodOrAddr => {

    var cp_arrayAddr, cp_arrayName, cp_arrayMethod
    if (methodOrAddr == undefined) {
        findMethodArray.forEach(value => b(value[0]))
    } else {
        backup()
        reset()
        d()
        B()
        restore()
    }

    function backup() {
        cp_arrayAddr = arrayAddr
        cp_arrayName = arrayName
        cp_arrayMethod = arrMethodInfo
    }

    function restore() {
        arrayAddr = cp_arrayAddr
        arrayName = cp_arrayName
        arrMethodInfo = cp_arrayMethod
    }

    function reset() {
        arrMethodInfo = findMethodArray.map(value => value[0])
        arrayAddr = findMethodArray.map(value => value[1])
        arrayName = findMethodArray.map(value => getMethodName(value[0]))
    }
}

/**
 * 从Class中查找指定方法名的方法（异步方法）
 * 本质是从存放的 arr_img_addr arr_img_names arrMethodInfo 中去查找 
 * 一些方法的其他信息补充可以从methodInfo里面获取 ---> showMethodInfo(mPtr)
 * @param {String}} methodName 待查方法名
 * @param {String} clsNameOrPtr cls指针或者名称
 */
function findMethod(methodName, clsNameOrPtr) {
    if (methodName == undefined) return
    if (clsNameOrPtr != undefined) {
        new Promise(callBack => {
            LOG("Task : add class functions ... ", LogColor.YELLOW)
            LogFlag = false
            a(isNaN(clsNameOrPtr) ? findClass(clsNameOrPtr) : clsNameOrPtr)
            LogFlag = true
            callback()
        }).then(() => {
            findFromArray(methodName)
        })
    } else {
        LogFlag = false
        if (arrMethodInfo.length == 0) a(findClass("Object"))
        LogFlag = true
        findFromArray(methodName)
    }

    function findFromArray(name) {
        new Promise((Finish) => {
            let strDes = ""
            let countStr = 0
            let tmpRecord = new Array()
            for (let i = 0; i < arrayName.length; ++i) {
                if (String(arrayName[i]).indexOf(String(name)) != -1) {
                    ++countStr
                    let clsAddr = getClassAddrFromMethodInfo(arrMethodInfo[i])
                    let fixClsName = getClassName(clsAddr)
                    fixClsName = fixClsName.length >= 15 ? fixClsName.substring(0, 14) + "." : fixClsName.padEnd(15, " ")
                    tmpRecord.push([arrMethodInfo[i], arrayAddr[i]])
                    strDes += String("[" + i + "] ").padEnd(8, " ") + fixClsName + "(" + clsAddr + ") |\t" + arrMethodInfo[i] + " ---> " + arrayAddr[i] + "\t" + arrayName[i] + "\t" + "\n"
                }
            }
            Finish([countStr, strDes.trimEnd(), tmpRecord])
        }).then(value => {
            if (Number(value[0]) == 0) throw new Error("NOT FOUND ...")
            findMethodArray = value[2]
            LOGW(`\n${getLine(20)} Result (${Number(value[0])}) ${getLine(20)}\n`)
            LOGD(String(value[1] + "\n"))
        }).catch(e => LOGE(e))
    }
}

/**
 * 根据 imgName 和 clsName 来查找cls pointer
 * 正常情况填写两个参数，如果第二个参数没有填写的情况，就把第一个参数视作第二个参数，使用遍历查找
 * 知道 imageName 就把他填好，不知道的话遍历速度会比较慢（也就第一次）
 * @param {String} imageName imgName
 * @param {String} className clsName
 * @returns 
 */
function findClass() {
    if (arguments[1] == undefined) {
        // 只填写一个参数的情况 (这里的imageName视作className)
        let cache = map_find_class_cache.get(arguments[0])
        if (cache != null) return ptr(cache)
        let ret = findClsWithArg1(arguments[0])
        map_find_class_cache.set(arguments[0], ret)
        return ret
    } else {
        // 填写完整参数的情况
        return findClsWithArg2(arguments[0], arguments[1])
    }

    // 这是早期的缓存，不好用
    function findClsWithArg1(className) {
        // 先找缓存
        let retPointer = findclsInCache(className)
        if (retPointer != undefined) return retPointer
        // 正常遍历
        for (let i = 0; i < arr_img_addr.length; i++) {
            const element = arr_img_addr[i]
            retPointer = findClsInner(element, className)
            if (retPointer != 0) return retPointer
        }
        return retPointer
    }

    function findClsWithArg2(imageName, className, useCache) {
        let currentlib = 0
        if (imageName == "") imageName = "Assembly-CSharp"
        arr_img_names.forEach(function (name, index) {
            if (name == imageName) {
                currentlib = arr_img_addr[index]
            }
        })
        // 第一种使用 导出函数(il2cpp_class_from_name) 查找
        let klass = il2cpp_class_from_name(currentlib, allocCStr(imageName), allocCStr(className))
        // 第二种遍历查找
        if (klass == 0 || klass == undefined) klass = findClsInner(currentlib, className, useCache)
        // 只填写一个className的情况有时候也会找不到，填两个参数就行了
        return klass
    }

    //暂时没用，用了感觉更慢了 emmmmm ....
    function findClsInner(imgPtr, clsName, useCache) {
        let retPtr = ptr(0)
        useCache = (useCache == undefined ? false : true)
        // 为了缓存是否需要遍历所有
        // 如果第一次遍历没有完全，那么第二次查找到第一次已经遍历到了的还挺快，如果超出范围又得重新走一遍遍历，所以默认还是让它第一次遍历所有
        let forAll = true
        // 正常遍历
        for (let j = 0; j < il2cpp_image_get_class_count(imgPtr).toInt32(); j++) {
            let il2CppClass = il2cpp_image_get_class(imgPtr, j)
            let clsNameC = getClassName(il2CppClass)
            // cache 中没有的话，就把该条clsptr添加进 findClassCache
            if (useCache && findClassCache.length == 0) LOG("Waitting ...", LogColor.C36)
            if (useCache && String(findClassCache).indexOf(String(il2CppClass)) == -1) findClassCache.push(il2CppClass)
            // LOG(""+clsNameC+"\t"+clsName+"\t"+il2CppClass )
            if (clsNameC == clsName) {
                if (!forAll) return il2CppClass
                retPtr = il2CppClass
            }
        }
        return retPtr
    }

    function findclsInCache(clsName) {
        for (let index = 0; index < findClassCache.length; index++)
            if (getClassName(findClassCache[index]) == clsName) return findClassCache[index]
    }
}

/**
 * 获取Unity的一些基本信息
 */
function getUnityInfo() {

    let line20 = getLine(20)
    let retStr = undefined

    Application()
    SystemInfo()
    Time()
    Environment()

    LOG(getLine(60), LogColor.RED)

    function Application() {

        LOG(`${line20} Application ${line20}`, LogColor.RED)

        // public static string cloudProjectId()
        retStr = readU16(callFunction(find_method("UnityEngine.CoreModule", "Application", "get_cloudProjectId", 0)))
        if (retStr != undefined) LOG("[*] cloudProjectId \t\t: " + retStr + "\n" + line20, LogColor.C36)

        // public static string get_productName()
        retStr = readU16(callFunction(find_method("UnityEngine.CoreModule", "Application", "get_productName", 0)))
        if (retStr != undefined) LOG("[*] productName \t\t: " + retStr + "\n" + line20, LogColor.C36)

        // public static extern string get_identifier()
        retStr = readU16(callFunction(find_method("UnityEngine.CoreModule", "Application", "get_identifier", 0)))
        if (retStr != undefined) LOG("[*] identifier \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

        // public static string version()
        retStr = readU16(callFunction(find_method("UnityEngine.CoreModule", "Application", "get_version", 0)))
        if (retStr != undefined) LOG("[*] version \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

        // public static string unityVersion()
        retStr = readU16(callFunction(find_method("UnityEngine.CoreModule", "Application", "get_unityVersion", 0)))
        if (retStr != undefined) LOG("[*] unityVersion \t\t: " + retStr + "\n" + line20, LogColor.C36)

        // public static extern RuntimePlatform get_platform()
        retStr = FackKnownType("1", callFunction(find_method("UnityEngine.CoreModule", "Application", "get_platform", 0)), findClass("UnityEngine.CoreModule", "RuntimePlatform"))
        if (retStr != undefined) LOG("[*] platform \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

        // public static string dataPath()
        retStr = readU16(callFunction(find_method("UnityEngine.CoreModule", "Application", "get_dataPath", 0)))
        if (retStr != undefined) LOG("[*] dataPath \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

        // public static string streamingAssetsPath()
        retStr = readU16(callFunction(find_method("UnityEngine.CoreModule", "Application", "get_streamingAssetsPath", 0)))
        if (retStr != undefined) LOG("[*] streamingAssetsPath \t: " + retStr + "\n" + line20, LogColor.C36)

        // public static string persistentDataPath
        retStr = readU16(callFunction(find_method("UnityEngine.CoreModule", "Application", "get_persistentDataPath", 0)))
        if (retStr != undefined) LOG("[*] persistentDataPath \t\t: " + retStr + "\n" + line20, LogColor.C36)

        // public static NetworkReachability internetReachability()
        retStr = FackKnownType("1", callFunction(find_method("UnityEngine.CoreModule", "Application", "get_internetReachability", 0)), findClass("UnityEngine.CoreModule", "NetworkReachability"))
        if (retStr != undefined) LOG("[*] internetReachability \t: " + retStr + "\n" + line20, LogColor.C36)

        // public static bool get_isMobilePlatform()
        retStr = callFunctionRB(find_method("UnityEngine.CoreModule", "Application", "get_isMobilePlatform", 0))
        if (retStr != undefined) LOG("[*] isMobilePlatform \t\t: " + retStr + "\n" + line20, LogColor.C36)

        // public static bool get_isConsolePlatform()
        retStr = callFunctionRB(find_method("UnityEngine.CoreModule", "Application", "get_isConsolePlatform"))
        if (retStr != undefined) LOG("[*] isConsolePlatform \t\t: " + retStr + "\n" + line20, LogColor.C36)

        // public static bool get_isEditor()
        retStr = callFunctionRB(find_method("UnityEngine.CoreModule", "Application", "get_isEditor", 0))
        if (retStr != undefined) LOG("[*] isEditor \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

        // public static extern bool get_isPlaying()
        retStr = callFunctionRB(find_method("UnityEngine.CoreModule", "Application", "get_isPlaying", 0))
        if (retStr != undefined) LOG("[*] isPlaying \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

        // public static float dpi() 
        // retStr = callFunctionRI(find_method("UnityEngine.CoreModule","Screen","get_dpi",0))
        // if (retStr != undefined) LOG("[*] Dpi \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

        // public static extern int get_height()
        // public static extern int get_width()
        var height = callFunction(find_method("UnityEngine.CoreModule", "Screen", "get_height", 0)).toInt32()
        var width = callFunction(find_method("UnityEngine.CoreModule", "Screen", "get_width", 0)).toInt32()
        if (height != 0 && width != 0) LOG("[*] height*width \t\t: " + height + " × " + width + "\n" + line20, LogColor.C36)

        // public static extern FullScreenMode get_fullScreenMode()
        retStr = FackKnownType("1", callFunction(find_method("UnityEngine.CoreModule", "Screen", "get_fullScreenMode", 0)), findClass("UnityEngine.CoreModule", "FullScreenMode"))
        if (retStr != undefined) LOG("[*] FullScreenMode \t\t: " + retStr + "\n" + line20, LogColor.C36)

        // public static ScreenOrientation get_orientation()
        retStr = FackKnownType("1", callFunction(find_method("UnityEngine.CoreModule", "Screen", "get_orientation", 0)), findClass("UnityEngine.CoreModule", "ScreenOrientation"))
        if (retStr != undefined) LOG("[*] ScreenOrientation \t\t: " + retStr + "\n" + line20, LogColor.C36)

        // public static extern SystemLanguage get_systemLanguage()
        retStr = FackKnownType("1", callFunction(find_method("UnityEngine.CoreModule", "Application", "get_systemLanguage", 0)), findClass("UnityEngine.CoreModule", "SystemLanguage"))
        if (retStr != undefined) LOG("[*] SystemLanguage \t\t: " + retStr + "\n" + line20, LogColor.C36)

    }

    function SystemInfo() {

        LOG(`${line20} SystemInfo ${line20}`, LogColor.RED)

        retStr = FackKnownType("1", callFunction(find_method("UnityEngine.CoreModule", "SystemInfo", "get_copyTextureSupport", 0)), findClass("UnityEngine.CoreModule", "CopyTextureSupport"))
        if (retStr != undefined && retStr != "") LOG("[*] copyTextureSupport \t\t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = readU16(callFunction(find_method("UnityEngine.CoreModule", "SystemInfo", "get_deviceModel", 0)))
        if (retStr != undefined && retStr != "") LOG("[*] deviceModel \t\t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = readU16(callFunction(find_method("UnityEngine.CoreModule", "SystemInfo", "get_deviceName", 0)))
        if (retStr != undefined && retStr != "") LOG("[*] deviceName \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = readU16(callFunction(find_method("UnityEngine.CoreModule", "SystemInfo", "get_graphicsDeviceVendor", 0)))
        if (retStr != undefined && retStr != "") LOG("[*] graphicsDeviceVendor \t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = callFunctionRB(find_method("UnityEngine.CoreModule", "SystemInfo", "get_graphicsUVStartsAtTop", 0))
        if (retStr != undefined) LOG("[*] graphicsUVStartsAtTop \t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = callFunctionRB(find_method("UnityEngine.CoreModule", "SystemInfo", "get_hasHiddenSurfaceRemovalOnGPU ", 0))
        if (retStr != undefined) LOG("[*] HiddenSurfaceRemovalOnGPU \t: " + retStr + "\n" + line20, LogColor.C36)

        // retStr = FackKnownType("1", callFunction(find_method("UnityEngine.CoreModule", "SystemInfo", "get_graphicsDeviceType", 0)), findClass("UnityEngine.CoreModule", "GraphicsDeviceType"))
        // if (retStr != undefined && retStr != "") LOG("[*] graphicsDeviceType \t\t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = FackKnownType("1", callFunction(find_method("UnityEngine.CoreModule", "SystemInfo", "get_deviceType", 0)), findClass("UnityEngine.CoreModule", "DeviceType"))
        if (retStr != undefined && retStr != "") LOG("[*] deviceType \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = readU16(callFunction(find_method("UnityEngine.CoreModule", "SystemInfo", "get_deviceUniqueIdentifier", 0)))
        if (retStr != undefined && retStr != "") LOG("[*] deviceUniqueIdentifier \t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = readU16(callFunction(find_method("UnityEngine.CoreModule", "SystemInfo", "get_graphicsDeviceID", 0)))
        if (retStr != undefined && retStr != "") LOG("[*] graphicsDeviceID \t\t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = readU16(callFunction(find_method("UnityEngine.CoreModule", "SystemInfo", "get_graphicsDeviceName", 0)))
        if (retStr != undefined && retStr != "") LOG("[*] graphicsDeviceName \t\t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = readU16(callFunction(find_method("UnityEngine.CoreModule", "SystemInfo", "get_graphicsDeviceVersion", 0)))
        if (retStr != undefined && retStr != "") LOG("[*] graphicsDeviceVersion \t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = callFunction(find_method("UnityEngine.CoreModule", "SystemInfo", "get_graphicsShaderLevel", 0)).toInt32()
        if (retStr != undefined && retStr != "") LOG("[*] graphicsShaderLevel \t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = callFunctionRI(find_method("UnityEngine.CoreModule", "SystemInfo", "get_graphicsMemorySize", 0))
        if (retStr != undefined && retStr != "") LOG("[*] graphicsMemorySize \t\t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = callFunctionRI(find_method("UnityEngine.CoreModule", "SystemInfo", "get_maxTextureSize", 0))
        if (retStr != undefined && retStr != "") LOG("[*] maxTextureSize \t\t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = readU16(callFunction(find_method("UnityEngine.CoreModule", "SystemInfo", "get_operatingSystem", 0)))
        if (retStr != undefined && retStr != "") LOG("[*] operatingSystem \t\t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = readU16(callFunction(find_method("UnityEngine.CoreModule", "SystemInfo", "get_processorType", 0)))
        if (retStr != undefined && retStr != "") LOG("[*] processorType \t\t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = callFunction(find_method("UnityEngine.CoreModule", "SystemInfo", "get_systemMemorySize", 0)).toInt32() + " MB"
        if (retStr != undefined && retStr != "") LOG("[*] systemMemorySize \t\t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = FackKnownType("1", callFunction(find_method("UnityEngine.CoreModule", "SystemInfo", "get_operatingSystemFamily", 0)), findClass("UnityEngine.CoreModule", "OperatingSystemFamily"))
        if (retStr != undefined && retStr != "") LOG("[*] operatingSystemFamily \t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = callFunctionRI(find_method("UnityEngine.CoreModule", "SystemInfo", "get_supportedRenderTargetCount", 0))
        if (retStr != undefined && retStr != "") LOG("[*] supportedRenderTargetCount \t\t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = callFunctionRI(find_method("UnityEngine.CoreModule", "SystemInfo", "get_supportsMultisampledTextures", 0))
        if (retStr != undefined && retStr != "") LOG("[*] supportsMultisampledTextures \t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = callFunctionRB(find_method("UnityEngine.CoreModule", "SystemInfo", "get_supportsGraphicsFence", 0))
        if (retStr != undefined && retStr != "") LOG("[*] supportsGraphicsFence \t\t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = callFunctionRB(find_method("UnityEngine.CoreModule", "SystemInfo", "get_supportsMultisampleAutoResolve", 0))
        if (retStr != undefined && retStr != "") LOG("[*] supportsMultisampleAutoResolve \t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = callFunctionRB(find_method("UnityEngine.CoreModule", "SystemInfo", "get_supportsMultisampledTextures", 0))
        if (retStr != undefined && retStr != "") LOG("[*] supportsMultisampledTextures \t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = callFunctionRB(find_method("UnityEngine.CoreModule", "SystemInfo", "get_supportsMultiview", 0))
        if (retStr != undefined && retStr != "") LOG("[*] supportsMultiview \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = callFunctionRB(find_method("UnityEngine.CoreModule", "SystemInfo", "get_supportsShadows", 0))
        if (retStr != undefined && retStr != "") LOG("[*] supportsShadows \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = callFunctionRB(find_method("UnityEngine.CoreModule", "SystemInfo", "get_supportsStoreAndResolveAction", 0))
        if (retStr != undefined && retStr != "") LOG("[*] supportsStoreAndResolveAction \t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = callFunctionRB(find_method("UnityEngine.CoreModule", "SystemInfo", "get_usesReversedZBuffer", 0))
        if (retStr != undefined && retStr != "") LOG("[*] usesReversedZBuffer \t\t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = callFunctionRB(find_method("UnityEngine.CoreModule", "SystemInfo", "get_supportsRenderTargetArrayIndexFromVertexShader", 0))
        if (retStr != undefined && retStr != "") LOG("[*] supportsRenderTargetArrayIndexFromVertexShader \t: " + retStr + "\n" + line20, LogColor.C36)
    }

    function Time() {

        LOG(`${line20} TIME ${line20}`, LogColor.RED)

        // public static extern float get_time()
        retStr = callFunctionRS(find_method("UnityEngine.CoreModule", "Time", "get_time", 0))
        if (retStr != undefined && retStr != 0x0) LOG("[*] get_time \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

        // public static extern float deltaTime()
        retStr = callFunctionRS(find_method("UnityEngine.CoreModule", "Time", "get_deltaTime", 0))
        if (retStr != undefined && retStr != 0x0) LOG("[*] deltaTime \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

        // public static extern float get_fixedDeltaTime()
        retStr = callFunctionRS(find_method("UnityEngine.CoreModule", "Time", "get_fixedDeltaTime", 0))
        if (retStr != undefined && retStr != 0x0) LOG("[*] fixedDeltaTime \t\t: " + retStr + "\n" + line20, LogColor.C36)

        // get_realtimeSinceStartup() : Single
        retStr = callFunctionRS(find_method("UnityEngine.CoreModule", "Time", "get_realtimeSinceStartup", 0))
        if (retStr != undefined && retStr != 0x0) LOG("[*] realtimeSinceStartup \t: " + retStr + "\n" + line20, LogColor.C36)

        // get_smoothDeltaTime() : Single
        retStr = callFunctionRS(find_method("UnityEngine.CoreModule", "Time", "get_smoothDeltaTime", 0))
        if (retStr != undefined && retStr != 0x0) LOG("[*] smoothDeltaTime \t\t: " + retStr + "\n" + line20, LogColor.C36)

        // get_timeScale() : Single
        retStr = callFunctionRS(find_method("UnityEngine.CoreModule", "Time", "get_timeScale", 0))
        if (retStr != undefined && retStr != 0x0) LOG("[*] timeScale \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

        // get_timeSinceLevelLoad() : Single
        retStr = callFunctionRS(find_method("UnityEngine.CoreModule", "Time", "get_timeSinceLevelLoad", 0))
        if (retStr != undefined && retStr != 0x0) LOG("[*] timeSinceLevelLoad \t\t: " + retStr + "\n" + line20, LogColor.C36)

        // get_unscaledDeltaTime() : Single
        retStr = callFunctionRS(find_method("UnityEngine.CoreModule", "Time", "get_unscaledDeltaTime", 0))
        if (retStr != undefined && retStr != 0x0) LOG("[*] unscaledDeltaTime \t\t: " + retStr + "\n" + line20, LogColor.C36)

        // get_unscaledTime() : Single
        retStr = callFunctionRS(find_method("UnityEngine.CoreModule", "Time", "get_unscaledTime", 0))
        if (retStr != undefined && retStr != 0x0) LOG("[*] unscaledTime \t\t: " + retStr + "\n" + line20, LogColor.C36)

        // public static extern float get_fixedTime()
        retStr = callFunction(find_method("UnityEngine.CoreModule", "Time", "get_fixedTime", 0))
        if (retStr != undefined && retStr != 0x0) LOG("[*] fixedTime \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

        // public static extern int get_frameCount()
        retStr = callFunction(find_method("UnityEngine.CoreModule", "Time", "get_frameCount", 0)).toInt32()
        if (retStr != undefined && retStr != 0x0) LOG("[*] frameCount \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

        // public static extern float get_inFixedTimeStep()
        retStr = callFunction(find_method("UnityEngine.CoreModule", "Time", "get_inFixedTimeStep", 0))
        if (retStr != undefined && retStr != 0x0) LOG("[*] inFixedTimeStep \t\t: " + retStr + "\n" + line20, LogColor.C36)

        // public static extern float realtimeSinceStartup()
        retStr = callFunction(find_method("UnityEngine.CoreModule", "Time", "realtimeSinceStartup", 0))
        if (retStr != undefined && retStr != 0x0) LOG("[*] realtimeSinceStartup \t: " + retStr + "\n" + line20, LogColor.C36)

        // public static extern float get_renderedFrameCount()
        retStr = callFunction(find_method("UnityEngine.CoreModule", "Time", "get_renderedFrameCount", 0))
        if (retStr != undefined && retStr != 0x0) LOG("[*] renderedFrameCount \t\t: " + retStr + "\n" + line20, LogColor.C36)

        // public static float smoothDeltaTime()
        retStr = callFunction(find_method("UnityEngine.CoreModule", "Time", "smoothDeltaTime", 0))
        if (retStr != undefined && retStr != 0x0) LOG("[*] smoothDeltaTime \t\t: " + retStr + "\n" + line20, LogColor.C36)
    }

    function Environment() {

        LOG(`${line20} Environment ${line20}`, LogColor.RED)

        // retStr = callFunction(find_method("mscorlib", "Environment", "get_CurrentManagedThreadId", 0)).toInt32()
        // if (retStr != undefined) LOG("[*] CurrentManagedThreadId \t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = readU16(callFunction(find_method("mscorlib", "Environment", "GetOSVersionString", 0)))
        if (retStr != undefined) LOG("[*] OSVersionString \t\t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = readU16(callFunction(find_method("mscorlib", "Environment", "GetMachineConfigPath", 0)))
        if (retStr != undefined) LOG("[*] MachineConfigPath \t\t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = callFunction(find_method("mscorlib", "Environment", "GetPageSize", 0)).toInt32()
        if (retStr != undefined) LOG("[*] PageSize \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = callFunctionRB(find_method("mscorlib", "Environment", "get_HasShutdownStarted", 0))
        if (retStr != undefined) LOG("[*] HasShutdownStarted \t\t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = callFunctionRB(find_method("mscorlib", "Environment", "get_Is64BitProcess", 0))
        if (retStr != undefined) LOG("[*] Is64BitProcess \t\t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = callFunctionRB(find_method("mscorlib", "Environment", "get_IsRunningOnWindows", 0))
        if (retStr != undefined) LOG("[*] IsRunningOnWindows \t\t: " + retStr + "\n" + line20, LogColor.C36)

        // retStr = readU16(callFunction(find_method("mscorlib", "Environment", "get_NewLine", 0)))
        // if (retStr != undefined) LOG("[*] NewLine \t\t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = FackKnownType("1", callFunction(find_method("mscorlib", "OperatingSystem", "get_Platform", 0), callFunction(find_method("mscorlib", "Environment", "get_OSVersion", 0))), findClass("mscorlib", "PlatformID"))
        if (retStr != undefined) LOG("[*] PlatformID \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = callFunction(find_method("mscorlib", "Environment", "get_ProcessorCount", 0)).toInt32()
        if (retStr != undefined) LOG("[*] processorCount \t\t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = callFunction(find_method("mscorlib", "Environment", "get_TickCount", 0)).toInt32()
        if (retStr != undefined) LOG("[*] TickCount \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = readU16(callFunction(find_method("mscorlib", "Environment", "get_MachineName", 0)))
        if (retStr != undefined) LOG("[*] MachineName \t\t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = readU16(callFunction(find_method("mscorlib", "Environment", "get_UserDomainName", 0)))
        if (retStr != undefined) LOG("[*] UserDomainName \t\t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = readU16(callFunction(find_method("mscorlib", "Environment", "get_UserName", 0)))
        if (retStr != undefined) LOG("[*] UserName \t\t\t: " + retStr + "\n" + line20, LogColor.C36)
    }
}

/**
 * 获取APK的一些基本信息
 */
function getApkInfo() {
    attachJava(() => {
        LOG(getLine(100), LogColor.C33)

        var context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext()
        var pkgInfo = context.getPackageManager().getPackageInfo(context.getPackageName(), 0)
        // var appInfo = context.getApplicationInfo()
        let appInfo = pkgInfo.applicationInfo.value

        let labelRes = appInfo.labelRes.value
        let strName = context.getResources().getString(labelRes)
        LOG("[*]AppName\t\t" + strName + " (UID:" + appInfo.uid.value + ")\t ID:0x" + (appInfo.labelRes.value).toString(16), LogColor.C36)
        let flags = appInfo.flags.value
        LOG("\t\t\tBackupable -> " + ((flags & 32768) != 0) + "\t" + "Debugable -> " + ((flags & 2) != 0), LogColor.C36)

        let str_pkgName = context.getPackageName()
        LOG("\n[*]PkgName\t\t" + str_pkgName, LogColor.C36)

        var verName = pkgInfo.versionName.value
        var verCode = pkgInfo.versionCode.value
        var targetSdkVersion = pkgInfo.applicationInfo.value.targetSdkVersion.value
        LOG("\n[*]Verison\t\t{ " + verName + " / " + verCode + " }\t(targetSdkVersion:" + targetSdkVersion + ")", LogColor.C36)

        let appSize = Java.use("java.io.File").$new(appInfo.sourceDir.value).length()
        LOG("\n[*]AppSize\t\t" + appSize + "\t(" + (appSize / 1024 / 1024).toFixed(2) + " MB)", LogColor.C36)

        LOG("\n[*]Time\t\t\tInstallTime\t" + new Date(pkgInfo.firstInstallTime.value).toLocaleString(), LogColor.C36)
        LOG("\t\t\tUpdateTime\t" + new Date(pkgInfo.lastUpdateTime.value).toLocaleString(), LogColor.C36)

        let ApkLocation = appInfo.sourceDir.value
        let TempFile = appInfo.dataDir.value
        LOG("\n[*]Location\t\t" + ApkLocation + "\n\t\t\t" + getLibPath() + "\n\t\t\t" + TempFile, LogColor.C36)

        // PackageManager.GET_SIGNATURES == 0x00000040
        let pis = context.getPackageManager().getPackageInfo(str_pkgName, 0x00000040)
        let hexDigist = (pis.signatures.value)[0].toByteArray()
        LOG("\n[*]Signatures\t\tMD5\t " + hexdigest(hexDigist, 'MD5') +
            "\n\t\t\tSHA-1\t " + hexdigest(hexDigist, 'SHA-1') +
            "\n\t\t\tSHA-256\t " + hexdigest(hexDigist, 'SHA-256'), LogColor.C36)
        LOG("\n[*]unity.build-id\t" + getMetaData('unity.build-id'), LogColor.C36)
        LOG(getLine(100), LogColor.C33)

    })

    function getMetaData(key) {
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
    function hexdigest(paramArrayOfByte, algorithm) {
        const hexDigits = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102]
        let localMessageDigest = Java.use("java.security.MessageDigest").getInstance(algorithm)
        localMessageDigest.update(paramArrayOfByte)
        let arrayOfByte = localMessageDigest.digest()
        let arrayOfChar = []
        for (let i = 0, j = 0;; i++, j++) {
            let strLenth = algorithm == "MD5" ? 16 : (algorithm == "SHA-1" ? 20 : 32)
            if (i >= strLenth) return Java.use("java.lang.String").$new(arrayOfChar)
            let k = arrayOfByte[i]
            arrayOfChar[j] = hexDigits[(0xF & k >>> 4)]
            arrayOfChar[++j] = hexDigits[(k & 0xF)]
        }
    }

    function getLibPath(name) {
        let retStr = ""
        attachJava(() => {
            let context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext()
            let libPath = context.getApplicationInfo().nativeLibraryDir.value
            retStr = libPath + "/" + (name == undefined ? "" : name)
        })
        return retStr
    }
}

/**
 * 用包名启动 APK
 * @param {String}} pkgName 
 */
var launchApp = pkgName => attachJava(() => {
    let context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext()
    context.startActivity(Java.use("android.content.Intent").$new(context.getPackageManager().getLaunchIntentForPackage(pkgName)));
})

/**
 * 读取 c# 字符串
 * @param {Number} mPtr c#字符串指针}
 */
var readU16 = mPtr => {
    if (mPtr == undefined || mPtr == 0) return ""
    try {
        return ptr(mPtr).add(p_size * 2 + 4).readUtf16String()
    } catch (e) {
        return ""
    }
}

/**
 * 读取 TMP_TEXT 字符串
 * @param {Number} mPtr TMP_TEXT INSTANCE
 */
var readTMPText = mPtr => {
    if (mPtr == undefined || mPtr == 0) return ""
    return callFunctionRUS(find_method("Unity.TextMeshPro", "TMP_Text", "get_text", 0), mPtr)
}

/**
 * 生成cstring or c#string
 * @param {String} str 字符串
 * @param {*} type 随意填写 填写了就是C#String 不填写就是CString
 */
let allocStr = (str, type) => type == undefined ? Memory.allocUtf8String(str) : il2cpp_string_new(Memory.allocUtf8String(str))

var allocCStr = str => allocStr(str)

var allocUStr = str => allocStr(str, 1)

var alloc = size => Memory.alloc((size == undefined ? 1 : size) * p_size)

/**
 * 创建一个vector2/vector3/vector4
 * 也可使用u3d自己的函数创建，这里暂时就先这样吧
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} z 
 * @param {Number} w 
 */
function allocVector(x, y, z, w) {
    let argsLength = arguments.length
    argsLength = argsLength == 0 ? 3 : argsLength
    let temp_vector = alloc(argsLength + 1)
    for (let index = 0; index < argsLength; ++index)
        temp_vector.add(p_size * index).writeFloat(arguments[index] == undefined ? 0 : arguments[index])
    temp_vector.add(p_size * argsLength).writeInt(0)
    return temp_vector
}

function seeHex() {
    if (arguments[0] == undefined || arguments[0] == 0x0) return
    LOG(hexdump(checkPointer(arguments[0]), {
        length: length
    }))
}

var seeHexR = (addr, length, color) => {
    LOG(hexdump(ptr(soAddr.add(addr).readPointer()), {
        length: length
    }), color == undefined ? LogColor.WHITE : color)
}

var seeHexA = (addr, length, header, color) => {
    LOG(hexdump(ptr(addr), {
        length: length,
        header: header == undefined ? true : false
    }), color == undefined ? LogColor.WHITE : color)
}

/**
 * 判断mPtr是不是ilbil2cpp.so中的地址,自动加上基址
 * 只会自动添加上属于libil2cpp的基地址
 * @param {Pointer} value
 * @returns ptr
 */
var checkPointer = (value, throwErr, showLog) => {
    if (value == undefined || value == null || soAddr == null || soAddr == 0) return ptr(0)
    if (!isNaN(value)) {
        // checkPointer(mPtr)
        value = ptr(Number(value))
    } else if (value instanceof Array) {
        switch (value.length) {
            case 1:
                // checkPointer(["expName"])
                value = Module.findExportByName(null, value[0])
                break
            case 2:
                // checkPointer(["mdName","expName"])
                value = Module.findExportByName(value[0], value[1])
                break
            case 4:
                // find_method(imageName, className, functionName, argsCount, isRealAddr)
                value = find_method(value[0], value[1], value[2], value[3])
                break
            default:
                value == 0
                break
        }
    } else {
        // checkPointer("expName")
        value = Module.findExportByName(null, value)
        if (value == 0) value = Module.findExportByName(soName, value[0])
    }
    if (throwErr != undefined && value == 0) {
        LOGE("Can't call ptr 0x0")
        return ptr(0)
    }
    if (value == 0) return ptr(0)
    try {
        var retValue = Process.findModuleByAddress(value) == null ?
            ptr(Process.findModuleByAddress(soAddr.add(value)).base).add(value) : value
    } catch {
        var retValue = value
    }
    if (showLog == undefined) return retValue
    let moduleValue = Process.findModuleByAddress(retValue)
    let moduleStr = JSON.stringify(moduleValue)
    LOG(`${getLine(moduleStr.length)}\n[*] ${retValue} ---> ${retValue.sub(moduleValue.base)}\n
    ${moduleStr}\n${getLine(moduleStr.length)}`, LogColor.C36)
}

/**
 * 展示代码上下文
 * @param {Pointer} mPtr 指针位置
 * @param {Int} range 展示的范围
 * @param {Int} type 1:正向 2:反向(小端存储，同IDA)   不填写着以当前pointer为中心位置打印信息
 */
var printCtx = (mPtr, range, type, redLine) => {
    if (Process.arch != "arm" || mPtr == undefined) return
    mPtr = checkPointer(mPtr)
    if (type != undefined) {
        for (let offset = 0; offset < range; offset++) printLOG(mPtr, offset)
    } else {
        let max = range == undefined ? 5 : (range % 2 == 1 ? (range + 1) : range) / 2
        let min = range == undefined ? -4 : max - range
        for (let offset = min; offset < max; offset++) printLOG(mPtr, offset)
    }

    function printLOG(pointer, offset) {
        let cur_p = ptr(pointer).add(p_size * offset)
        let cur_value = String(cur_p.readPointer())
        // fix 12 00 00 0A => 0x0A00012 少一个0的情况 
        if (Process.arch == "arm" && cur_value.length != 10) cur_value = cur_value.replace("000", "0000")
        let cur_tmp = Array.from(cur_value.toUpperCase())
        let cur_str = (cur_tmp.length == 10) ? cur_value : ""
        if (type == 1) {
            cur_str = cur_tmp[2] + cur_tmp[3] + ' ' + cur_tmp[4] + cur_tmp[5] + ' ' + cur_tmp[6] + cur_tmp[7] + ' ' + cur_tmp[8] + cur_tmp[9]
        } else if (type == 2) {
            cur_str = cur_tmp[8] + cur_tmp[9] + ' ' + cur_tmp[6] + cur_tmp[7] + ' ' + cur_tmp[4] + cur_tmp[5] + ' ' + cur_tmp[2] + cur_tmp[3]
        }
        LOG(cur_p + "\t" + cur_str + "\t" + Instruction.parse(cur_p),
            (redLine == undefined ? offset == 0 : offset == redLine) ?
            LogColor.RED : LogColor.WHITE)
    }
}

var LOGW = str => LOG(str, LogColor.YELLOW)
var LOGE = str => LOG(str, LogColor.RED)
var LOGD = str => LOG(str, LogColor.C36)
var LOGO = str => LOG(str, LogColor.C33)
var LOGH = str => LOG(str, LogColor.C96)
var LOG = (str, type) => {
    if (!LogFlag) return
    switch (type) {
        case LogColor.WHITE || undefined:
            console.log(str);
            break
        case LogColor.RED:
            console.error(str);
            break
        case LogColor.YELLOW:
            console.warn(str);
            break
        default:
            console.log("\x1b[" + type + "m" + str + "\x1b[0m");
            break
    }
}

let linesMap = new Map()
var getLine = (length, fillStr) => {
    fillStr = fillStr == undefined ? "-" : fillStr
    let key = length + "|" + fillStr
    if (linesMap.get(key) != null) return linesMap.get(key)
    for (var index = 0, tmpRet = ""; index < length; index++) tmpRet += fillStr
    linesMap.set(key, tmpRet)
    return tmpRet
}

var Toast = msg => {
    Java.scheduleOnMainThread(() => {
        let context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext()
        Java.use("android.widget.Toast").makeText(context, Java.use("java.lang.String").$new(msg), 1).show()
    })
}

/**
 * 配合HookOnPointerClick()，SetLocalScale()使用以达到动态隐藏gameobj
 * @param {Int} x 模拟点击的x位置
 * @param {Int} y 模拟点击的y位置
 */
var setClick = (x, y) => {
    if (x == undefined || y == undefined) return
    attachJava(() => {
        let Instrumentation = Java.use("android.app.Instrumentation")
        let SystemClock = Java.use("android.os.SystemClock")
        let MotionEvent = Java.use("android.view.MotionEvent")
        let inst = Instrumentation.$new()
        let downTime = SystemClock.uptimeMillis()
        let downEvent = MotionEvent.obtain(downTime, downTime, 0, x, y, 0)
        let upTime = SystemClock.uptimeMillis()
        let upEvent = MotionEvent.obtain(upTime, upTime, 1, x, y, 0)
        inst.sendPointerSync(downEvent)
        inst.sendPointerSync(upEvent)
    })
}

/**
 * 用来确定点击view的位置，配合上面这个函数使用 setClick() 以及 HookOnPointerClick() 使用
 * 启动游戏的时候进行模拟点击，配合HookOnPointerClick()即可确定gameobj，通过修改transform即可实现动态的隐藏一些按钮
 * 这里是针对一些bundle资源的u3d游戏，我们不能方便的去静态修改gameobj可见性,或者是一些其他原因我们不能修改，即可用这个动态修改的思路
 */
var HookMotionEvent = () => {
    attachJava(() => {
        Java.use("android.view.View").onTouchEvent.implementation = function (event) {
            let ret = this.onTouchEvent(event)
            LOG("\n" + getLine(25) + " onTouchEvent " + getLine(25), LogColor.YELLOW)
            LOG(ret + "\t" + event, LogColor.C36)
            return ret
        }

        Java.use("android.app.Activity").dispatchTouchEvent.implementation = function (event) {
            let ret = this.dispatchTouchEvent(event)
            LOG("\n" + getLine(25) + " dispatchTouchEvent " + getLine(25), LogColor.YELLOW)
            LOG(ret + "\t" + event, LogColor.C36)
            return ret
        }
    })
}

/**
 * 隐藏模拟点击位置的gameobj
 * 这里find_method()在移植的时候写具体的地址就是，不用移植整个js代码
 * @param {*} x 
 * @param {*} y 
 */
var HideClickedObj = (x, y) => {
    let m_ptr = find_method("UnityEngine.UI", "Button", "OnPointerClick", 1)
    let srcFunc = new NativeFunction(m_ptr, 'void', ['pointer', 'pointer', 'pointer', 'pointer'])
    Interceptor.revert(m_ptr)
    Interceptor.replace(m_ptr, new NativeCallback(function (arg0, pointerEventData, arg2, arg3) {
        srcFunc(arg0, pointerEventData, arg2, arg3)
        if (pointerEventData == 0) return
        let gameObj = f_get_pointerEnter(pointerEventData)
        // 判断名字后使用这三种方式都可以去掉该对象
        if (getObjName(gameObj) == "Settings Button") {
            // setActive(gameObj,0)
            // var m_transform = new NativeFunction(find_method("UnityEngine.CoreModule","GameObject","get_transform",0),'pointer',['pointer'])(gameObj)
            // SetLocalScale(m_transform,0,0,0)
            destroyObj(gameObj)
        }
    }, 'void', ['pointer', 'pointer', 'pointer', 'pointer']))

    setClick(x, y)
    // B 去断点找到点击事件的处理函数并nop掉
    // 循环调用，出现时destory掉这个gameObj
}

// 打印java堆栈
var PrintStackTrace = () => LOGD(GetStackTrace())

var GetStackTrace = () => Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new())

// 打印native堆栈
var PrintStackTraceN = (ctx, level) => LOGD(GetStackTraceN(ctx, level))

var GetStackTraceN = (ctx, level) => {
    return Thread.backtrace(ctx, Backtracer.FUZZY)
        .slice(0, level === undefined ? 6 : level)
        // .reverse()
        .map(frame => DebugSymbol.fromAddress(frame))
        // .map(symbol => `${getLine(level==undefined?0:level,"\n")}${symbol}\n`)
        .join("\n")
}

var SetInt = (key, value) => {
    // ↓ 记录一下之前最蠢的做法 -.-|| ↓
    // var temp_size = 100
    // var header_size = Process.pointerSize*3
    // var str_header = new NativeFunction(cloudProjectIdAddr,'pointer',[])()
    // var temp_k = Memory.alloc(temp_size)
    // var tk = Memory.allocUtf16String(key)
    // Memory.copy(temp_k,str_header,header_size)
    // Memory.copy(temp_k.add(header_size),tk,temp_size - header_size)
    // new NativeFunction(Addr_SetInt,'void',['pointer','int'])(temp_k,value)
    callFunction(find_method("UnityEngine.CoreModule", "PlayerPrefs", "SetInt", 2, true), allocUStr(key), value)
}

var SetFloat = (key, value) => callFunction(find_method("UnityEngine.CoreModule", "PlayerPrefs", "SetFloat", 2, true), allocUStr(key), value)

var SetString = (key, value) => callFunction(find_method("UnityEngine.CoreModule", "PlayerPrefs", "SetString", 2, true), allocUStr(key), allocUStr(value))

var GetInt = key => {
    let ret = callFunctionRI(find_method("UnityEngine.CoreModule", "PlayerPrefs", "GetInt", 2, true), allocUStr(key), 0)
    LOG("\n[*] GetInt('" + key + "')\t--->\t" + ret + "\n", LogColor.C95)
}

var GetFloat = key => {
    let ret = callFunctionRF(find_method("UnityEngine.CoreModule", "PlayerPrefs", "GetFloat", 2, true), allocUStr(key), 0)
    LOG("\n[*] GetFloat('" + key + "')\t--->\t" + ret + "\n", LogColor.C95)
}

var GetString = key => {
    let ret = callFunctionRUS(find_method("UnityEngine.CoreModule", "PlayerPrefs", "GetString", 1), allocUStr(key))
    LOG("\n[*] GetString('" + key + "')\t--->\t" + ret + "\n", LogColor.C95)
}

var setLocalScale = (mTransform, x, y, z) => callFunction(find_method("UnityEngine.CoreModule", "Transform", "set_localScale_Injected", 1), mTransform, allocVector(x, y, z))

var setLocalPosition = (mTransform, x, y, z) => callFunction(find_method("UnityEngine.CoreModule", "Transform", "set_localPosition_Injected", 1), mTransform, allocVector(x, y, z))

var setPosition = (mTransform, x, y, z) => callFunction(find_method("UnityEngine.CoreModule", "Transform", "set_Position_Injected", 1), mTransform, allocVector(x, y, z))

// var set_Rotation_Injected = find_method("UnityEngine.CoreModule","Transform","set_Rotation_Injected",1,true)
var setLocalRotation = (mTransform, x, y, z, w) => callFunction(find_method("UnityEngine.CoreModule", "Transform", "set_localRotation_Injected", 1), ptr(mTransform), allocVector(x, y, z, w))

/**
 * GameObject/Transform
 * @param {Pointer}  
 */
var getObjName = gameObj => readU16(f_getName(ptr(gameObj)))

var gameObjToTransform = transform => getGameObject(transform)

var transformToGameObj = gameObj => f_getTransform(gameObj)

// getGameObject     transform -> GameObject
var getGameObject = mPtr => callFunction(find_method("UnityEngine.CoreModule", "Component", "get_gameObject", 0), mPtr)

var getGameObjectG = mPtr => callFunction(find_method("UnityEngine.CoreModule", "GameObject", "get_gameObject", 0), ptr(mPtr))

/**
 * TODO 考虑使用 frida 去去获取 GetComponents 等等操作，便于定位obj上面的脚本名称，后续继续完善
 * @param {Pointer} obj this指针
 * @param {Pointer} type 
 */
var GetComponent = (obj, type) => {
    if (getType(obj, 2)[0] == "GameObject") obj = f_getTransform(obj)
    return callFunction(['UnityEngine.CoreModule', 'Component', 'GetComponent', 1], obj, type)
}

var GetComponentG = (obj, type) => {
    return callFunction(find_method('UnityEngine.CoreModule', 'GameObject', 'GetComponent', 1), obj, type)
}

// public Component[] GetComponents(Type type) [UnityEngine.CoreModule UnityEngine.GameObject]
var GetComponents = (insPtr, mType) => {
    // if (getType(insPtr, 2)[0] == "GameObject") {
    //     callFunctionRA(find_method("UnityEngine.CoreModule", "GameObject", "GetComponents", 1), insPtr, mType)
    // }
    // public void GetComponents(Type type, List<Component> results)  ---> 这里有一个 list 解析的问题 
    // list {offset 0x8 .readPointer() / offset 0xc .readInt() 数组长度 / offset 0x10 .readInt() list版本号}
    let tempMem = alloc(8)
    if (mType == undefined) mType = getRuntimeType("MonoBehaviour") //make sure getRuntimeType return not null
    if (getType(insPtr, 2)[0] == "GameObject") insPtr = f_getTransform(ptr(insPtr))
    callFunction(["UnityEngine.CoreModule", "Component", "GetComponents", 2], insPtr, mType, tempMem)
    seeHexA(tempMem, 8 * p_size)
}

// public Component[] GetComponentsInChildren(Type type, bool includeInactive) [UnityEngine.CoreModule UnityEngine.GameObject]
var GetComponentsInChildren = (insPtr, mType, includeInactive) => {
    includeInactive = includeInactive == undefined ? true : false
    try {
        // if (getType(insPtr, 2)[0] == "GameObject") {
        //     callFunctionRA(find_method("UnityEngine.CoreModule", "GameObject", "GetComponentsInChildren", 2), insPtr, mType, includeInactive)
        // } else {
        // public Component[] GetComponents(Type type) 
        callFunctionRA(["UnityEngine.CoreModule", "Component", "GetComponentsInChildren", 2], insPtr, mType, includeInactive)
        // }
    } catch (e) {
        LOG("ERROR :" + e)
    }
}

// public Component[] GetComponentsInParent(Type type, bool includeInactive) [UnityEngine.CoreModule UnityEngine.GameObject]
var GetComponentsInParent = (insPtr, mType, includeInactive) => {
    includeInactive = includeInactive == undefined ? true : false
    try {
        if (getType(insPtr, 2)[0] == "GameObject") {
            callFunctionRA(["UnityEngine.CoreModule", "GameObject", "GetComponentsInParent", 2], insPtr, mType, includeInactive)
        } else {
            // public Component[] GetComponents(Type type) 
            callFunctionRA(["UnityEngine.CoreModule", "Component", "GetComponentsInParent", 2], insPtr, mType, includeInactive)
        }
    } catch (e) {
        LOG("ERROR :" + e)
    }
}

// public static Object Instantiate(Object original, Transform parent, bool instantiateInWorldSpace)
// public static Object Instantiate(Object original)
var Instantiate = original => {
    runOnMain(find_method("UnityEngine.UI", "CanvasUpdateRegistry", "PerformUpdate", 0), () => {
        showGameObject(callFunction(find_method("UnityEngine.CoreModule", "Object", "Instantiate", 1), original))
    })
}

// public static Object Instantiate(Object original, Vector3 position, Quaternion rotation)
var InstantiatePR = (original, position, rotation) => {
    runOnMain(find_method("UnityEngine.UI", "CanvasUpdateRegistry", "PerformUpdate", 0), () => {
        if (trsOrPos == undefined) callFunction(find_method("UnityEngine.CoreModule", "Object", "Instantiate", 3), original, position, rotation)
    })
}

/**
 * getType
 * @param {Pointer}  transform/GameObj/.......
 */
var getType = (mPtr, TYPE) => {
    let p_type = callFunction(find_method('mscorlib', 'Object', 'GetType', 0), ptr(mPtr))
    let p_name = typeDes(p_type, 1)
    if (TYPE == 1) return p_name + "(" + p_type + ")"
    if (TYPE == 2) return [String(p_name).split(": ")[1], p_type]
    let p_level = typeExtends(p_type)
    LOG(`\nType ===> ${p_type}\nName ===> ${p_name}\n\n${p_level}\n`, LogColor.C36)
}

var getBaseType = (mPtr, level) => {
    if (mPtr == undefined || mPtr == null) return
    for (let i = 0; i < (level == undefined ? 1 : level); ++i)
        mPtr = callFunction(checkPointer(["mscorlib", "RuntimeType", "get_BaseType", 0]), mPtr)
    return ptr(mPtr)
}

// 从当前的 runtimeType 查找上层的 runtimeType 并记录
let typeExtends = mPtr => {
    var displayStr = ""
    let currentType = 0
    try {
        for (let index = 0; index < 100; ++index) {
            currentType = getBaseType(mPtr, index)
            if (currentType == 0x0) {
                displayStr = displayStr.substring(0, displayStr.length - 6)
                break
            }
            addRuntimeType(currentType, 1)
            displayStr += `${typeDes(currentType)}(${currentType})  <---  `
        }
    } catch (e) {
        return ""
    }
    return displayStr
}

let typeDes = (mPtr, simple) => simple != undefined ? callFunctionRUS(find_method("mscorlib", "Type", "ToString", 0), mPtr) : callFunctionRUS(find_method("mscorlib", "Type", "ToString", 0), mPtr).split("Type: ")[1]

var GetTypeFromHandle = () => callFunction(find_method('mscorlib', 'Type', 'GetTypeFromHandle', 1), obj, 0)

var SendMessage = (str0, str1, str2) => {
    // Java 
    Java.perform(() => {
        Java.use("com.unity3d.player.UnityPlayer").UnitySendMessage(str0, str1, str2)
    })

    // Native 好像有点问题
    // callFunction(Module.findExportByName("libunity.so","UnitySendMessage"),allocStr(str0,1),allocStr(str1,1),allocStr(str2,1))
}

var SendMessageImpl = platform => {

    switch (platform) {
        case "IronSource":
            IronSourceEvents()
            break
        case "MaxSdkCallbacks":
            MaxSdkCallbacks()
            break
        case "MoPubManager":
            MoPubManager()
            break
        case "TPluginsGameObject":
            TPluginsGameObject()
            break
        default:
            IronSourceEvents()
            MaxSdkCallbacks()
            MoPubManager()
            TTPluginsGameObject()
            break
    }


    SendMessage('GameAnalytics', 'OnCommandCenterUpdated', '')
    SendMessage('GameAnalytics', 'OnRemoteConfigsUpdated', '')
    SendMessage('UnityFacebookSDKPlugin', 'OnInitComplete', '{"key_hash":"0eWmEB4CY7TpepNbZdxCOaz2Crs=\n"}')

    function IronSourceEvents() {
        SendMessage("IronSourceEvents", "onRewardedVideoAvailabilityChanged", "true")
        SendMessage("IronSourceEvents", "onRewardedVideoAdShowFailedDemandOnly", "true")
        SendMessage('IronSourceEvents', 'onInterstitialAdReady', '')
        SendMessage("IronSourceEvents", "onRewardedVideoAdOpened", "")
        SendMessage("IronSourceEvents", "onRewardedVideoAdStarted", "")
        SendMessage("IronSourceEvents", "onRewardedVideoAdEnded", "")
        SendMessage("IronSourceEvents", "onRewardedVideoAdRewarded", "{'placement_reward_name':'Virtual Item','placement_name':'rewardedVideo','placement_reward_amount':'1','placement_id':'2'}")
        SendMessage("IronSourceEvents", "onRewardedVideoAdClosed", "")

        SendMessage("IronSourceRewardedVideoAndroid", "onRewardedVideoAvailabilityChanged", "true")
        SendMessage("IronSourceRewardedVideoAndroid", "onRewardedVideoAdShowFailedDemandOnly", "true")
        SendMessage('IronSourceRewardedVideoAndroid', 'onInterstitialAdReady', '')
        SendMessage("IronSourceRewardedVideoAndroid", "onRewardedVideoAdOpened", "")
        SendMessage("IronSourceRewardedVideoAndroid", "onRewardedVideoAdStarted", "")
        SendMessage("IronSourceRewardedVideoAndroid", "onRewardedVideoAdEnded", "")
        SendMessage("IronSourceRewardedVideoAndroid", "OnRewardedVideoAdRewarded", "{'placement_reward_name':'Virtual Item','placement_name':'rewardedVideo','placement_reward_amount':'1','placement_id':'2'}")
        SendMessage("IronSourceRewardedVideoAndroid", "onRewardedVideoAdClosed", "")
    }

    function MaxSdkCallbacks() {
        SendMessage('MaxSdkCallbacks', 'ForwardEvent', 'networkName=AppLovin\nname=OnRewardedAdRevenuePaidEvent\nrevenue=0.014579974174499511\nplacement=\nadUnitId=e01cb721520cd33c\ncreativeId=11831000\n')
        SendMessage('MaxSdkCallbacks', 'ForwardEvent', 'networkName=AppLovin\nname=OnRewardedAdDisplayedEvent\nrevenue=0.014579974174499511\nplacement=\nadUnitId=e01cb721520cd33c\ncreativeId=11831000\n')
        SendMessage('MaxSdkCallbacks', 'ForwardEvent', 'revenue=0.014579974174499511\nnetworkName=AppLovin\nname=OnRewardedAdReceivedRewardEvent\nplacement=\nrewardAmount=0\nadUnitId=e01cb721520cd33c\ncreativeId=11831000\nrewardLabel=\n')
        SendMessage('MaxSdkCallbacks', 'ForwardEvent', 'networkName=AppLovin\nname=OnRewardedAdHiddenEvent\nrevenue=0.014579974174499511\nplacement=\nadUnitId=e01cb721520cd33c\ncreativeId=11831000\n')

        SendMessage('MaxSdkCallbacks', 'OnRollicAdsRewardedVideoClickedEvent', 'name=OnSdkInitializedEvent\nconsentDialogState=2\ncountryCode=SG\n')
        SendMessage("MaxSdkCallbacks", "OnRollicAdsRewardedVideoClosedEvent", "name=OnRewardedAdDisplayedEvent\nadUnitId=ec1a772e0459f45b")
        SendMessage("MaxSdkCallbacks", "OnRollicAdsRewardedVideoReceivedRewardEvent", "name=OnRewardedAdReceivedRewardEvent\nrewardAmount=0\nadUnitId=ec1a772e0459f45b\nrewardLabel=")
        SendMessage("MaxSdkCallbacks", "OnRollicAdsRewardedVideoShownEvent", "name=OnRewardedAdHiddenEvent\nadUnitId=ec1a772e0459f45b")
        SendMessage("MaxSdkCallbacks", "OnRollicAdsRewardedVideoLoadedEvent", "name=OnRewardedAdLoadedEvent\nadUnitId=ec1a772e0459f45b")
    }

    function MoPubManager() {

        // java.lang.Throwable
        // at com.unity3d.player.UnityPlayer.UnitySendMessage(Native Method)
        // at com.mopub.unity.MoPubUnityPlugin$UnityEvent.Emit(MoPubUnityPlugin.java:95)
        // at com.mopub.unity.MoPubRewardedVideoUnityPluginManager.onRewardedVideoClosed(MoPubRewardedVideoUnityPluginManager.java:67)
        // at com.mopub.mobileads.MoPubRewardedVideos$1.callback(MoPubRewardedVideos.java:87)
        // at com.mopub.mobileads.MoPubRewardedVideos.showRewardedVideo(MoPubRewardedVideos.java:77)
        // at com.mopub.mobileads.MoPubRewardedVideos.showRewardedVideo(MoPubRewardedVideos.java:103)
        // at com.mopub.unity.MoPubRewardedVideoUnityPlugin$2.run(MoPubRewardedVideoUnityPlugin.java:122)
        // at com.mopub.unity.MoPubUnityPlugin$10.run(MoPubUnityPlugin.java:526)
        // at android.os.Handler.handleCallback(Handler.java:790)
        // at android.os.Handler.dispatchMessage(Handler.java:99)
        // at android.os.Looper.loop(Looper.java:164)
        // at android.app.ActivityThread.main(ActivityThread.java:6494)
        // at java.lang.reflect.Method.invoke(Native Method)
        // at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:438)
        // at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:807)

        SendMessage("UnityFacebookSDKPlugin", "UnityFacebookSDKPlugin", "{\"key_hash\":\"NgS2u0aEWjJAWRbMgtyAolzO6s8=\\n\"}")
        SendMessage("MoPubManager", "EmitSdkInitializedEvent", "[\"0fe07d2ca88549ff9598aed6c45f0773\",\"70\"]")
        SendMessage("MoPubManager", "EmitInterstitialLoadedEvent", "[\"a44632b619174dfa98c46420592a3756\"]")
        SendMessage('MoPubManager', 'EmitAdLoadedEvent', '["f7a8241fad1041bda59f303eae75be2d","320","50"]')
        SendMessage("MoPubManager", "EmitRewardedVideoLoadedEvent", "[\"a44632b619174dfa98c46420592a3756\"]")

        SendMessage("MoPubManager", "EmitRewardedVideoShownEvent", "[\"a44632b619174dfa98c46420592a3756\"]")
        // SendMessage("MoPubManager", "EmitRewardedVideoReceivedRewardEvent", "[\"a44632b619174dfa98c46420592a3756\"]")
        SendMessage('MoPubManager', 'EmitRewardedVideoReceivedRewardEvent', '["a44632b619174dfa98c46420592a3756","","0"]')
        SendMessage("MoPubManager", "EmitRewardedVideoClosedEvent", "[\"a44632b619174dfa98c46420592a3756\"]")
    }

    function TTPluginsGameObject() {
        SendMessage("TTPluginsGameObject", "OnRewardedAdsShown", "")
        SendMessage("TTPluginsGameObject", "OnRewardedAdsClosed", "{\"shouldReward\":true,\"network\":\"admob-unityads\",\"revenue\":0.00138,\"currency\":\"USD\",\"precision\":\"ESTIMATED\"}")
        SendMessage("TTPluginsGameObject", "OnRewardedAdsReady", "{\"loaded\":true}")
    }
}

var JNI = () => {

    // UnityEngine.AndroidJNIModule.AndroidJNI public static Boolean CallBooleanMethod (IntPtr obj,IntPtr methodID,jvalue[] args)
    find_method("UnityEngine.AndroidJNIModule", "AndroidJNI", "CallBooleanMethod", 3, false)
    // UnityEngine.AndroidJNIModule.AndroidJNI public static IntPtr CallObjectMethod (IntPtr obj,IntPtr methodID,jvalue[] args)
    find_method("UnityEngine.AndroidJNIModule", "AndroidJNI", "CallObjectMethod", 3, false)
    // UnityEngine.AndroidJNIModule.AndroidJNI public static IntPtr NewStringUTF (String bytes)
    find_method("UnityEngine.AndroidJNIModule", "AndroidJNI", "NewStringUTF", 1, false) //c#String to jstring

    // UnityEngine.AndroidJNIModule.AndroidJNIHelper   public static IntPtr GetMethodID (IntPtr javaClass,String methodName,String signature)
    find_method("UnityEngine.AndroidJNIModule", "AndroidJNIHelper", "GetMethodID", 3, false)
    // UnityEngine.AndroidJNIModule.AndroidJNIHelper   public static String GetSignature (Object obj)
    find_method("UnityEngine.AndroidJNIModule", "AndroidJNIHelper", "GetSignature", 1, false)

    // UnityEngine.AndroidJNIModule.AndroidJNISafe     public static IntPtr CallStaticObjectMethod (IntPtr clazz,IntPtr methodID,jvalue[] args)
    find_method("UnityEngine.AndroidJNIModule", "AndroidJNISafe", "CallStaticObjectMethod", 3, false)
    // UnityEngine.AndroidJNIModule.AndroidJNISafe     public static Boolean CallBooleanMethod (IntPtr obj,IntPtr methodID,jvalue[] args)
    find_method("UnityEngine.AndroidJNIModule", "AndroidJNISafe", "CallBooleanMethod", 3, false)
}

var ADS = () => {

    // ShowCrossPromo() nop
    // 0x53bdb8 (0xc4b85bf4)  SwCrossPromo (0xc4b66e00) --->  private Void Show ()

    // TODO 归纳总结广告平台调用，最终目的是从native层解决广告移植问题

    /**
     *  MaxSdkCallbacks
     */
    // MaxSdkCallbacks      findClass("MaxSdk.Scripts","MaxSdkCallbacks")
    // ForwardEvent         find_method("MaxSdk.Scripts","MaxSdkCallbacks","ForwardEvent",1,false)
    // sendMessage 到达 ForwardEvent ,再到 CanInvokeEvent 判断是否能进行 真实native函数调用
    // public static void ShowRewardedAd(string adUnitIdentifier, string placement)
    // public static void ShowInterstitial(string adUnitIdentifier, string placement)
    a(findClass("MaxSdk.Scripts", "MaxSdkAndroid"))

    /**
     *  IronSource
     * 
     *  IronSourcePlacement 三个参数的构造函数，三个fields
     * 
     *  在 IronSourceEvents.onRewardedVideoAdRewarded(String) 的参数（java传过来的参数），
     *  使用 IronSourceEvents.getPlacementFromObject（key-value的形式解析，只保留值） 解析为 IronSourcePlacement
     */
    // public void ShowInterstitial(string placementName, Action CloseAction, Action FailedAction)
    // public void ShowRewarded(string placementName, Action FinishedAction, Action SkippedAction, Action FailedAction)
    a(findClass("Assembly-CSharp", "SDKWrapper"))

    // IronSource findClass("Assembly-CSharp","IronSource")
    // isRewardedVideoAvailable() / isInterstitialReady()
    // public static IronSource get_Agent ()
    a(findClass("Assembly-CSharp", "IronSource"))

    // public void onRewardedVideoAdOpened(string empty)
    // public void onRewardedVideoAdRewarded(string description)  find_method("Assembly-CSharp","IronSourceEvents","onRewardedVideoAdRewarded",1,false)
    // public void onRewardedVideoAdClicked(string description)
    // public void onRewardedVideoAdClosed(string empty)
    // public void onRewardedVideoAdEnded(string empty)
    // public void onRewardedVideoAdShowFailed(string description)  ===> onRewardedVideoAdShowFailed inlinehook -> onRewardedVideoAdRewarded
    // public void onRewardedVideoAvailabilityChanged(string stringAvailable)   "true"
    a(findClass("Assembly-CSharp", "IronSourceEvents"))

    // public bool isRewardedVideoAvailable()
    // public void setMetaData(string key, string value) // 常出问题的jni调用
    // public void showInterstitial() / public void showInterstitial(string placementName)
    // public void showRewardedVideo() / public void showRewardedVideo(string placementName)
    a(findClass("Assembly-CSharp", "AndroidAgent"))

    /**
     *  MoPubManager
     */
    // public void EmitRewardedVideoReceivedRewardEvent(string argsJson)
    // public void EmitRewardedVideoShownEvent(string argsJson)
    // public void EmitRewardedVideoClosedEvent(string argsJson)
    a(findClass("Assembly-CSharp", "MoPubManager"))

    // Assembly-CSharp.MoPub   public static Void ShowRewardedVideo (String adUnitId,String customData)
    find_method("Assembly-CSharp", "MoPub", "ShowRewardedVideo", 2, false)
    // Assembly-CSharp.MoPub   public static Void ShowInterstitialAd (String adUnitId)
    find_method("Assembly-CSharp", "MoPub", "ShowInterstitialAd", 1, false)
    // Assembly-CSharp.MoPub   public static Boolean HasRewardedVideo (String adUnitId)
    find_method("Assembly-CSharp", "MoPub", "HasRewardedVideo", 1, false)

    // Assembly-CSharp.VoodooSauce     public static Void ShowRewardedVideo (Action`1 onComplete,String tag)
    find_method("Assembly-CSharp", "VoodooSauce", "ShowRewardedVideo", 2, false)
    // Assembly-CSharp.VoodooSauce     public static Void ShowInterstitial (Action onComplete,Boolean ignoreConditions,String tag)
    find_method("Assembly-CSharp", "VoodooSauce", "ShowInterstitial", 3, false)
    // Assembly-CSharp.VoodooSauce     public static Boolean IsRewardedVideoAvailable ()
    find_method("Assembly-CSharp", "VoodooSauce", "IsRewardedVideoAvailable", 0, false)

    // Assembly-CSharp.AndroidTenjin   public override Void SendEvent (String eventName)
    find_method("Assembly-CSharp", "AndroidTenjin", "SendEvent", 1, false)
}

var Pay = () => {
    // todo google支付相关
    find_method("Assembly-CSharp", "Purchaser", "BuyProductID", 1, false)
}

var Update = () => {
    // todo 更新相关
    find_method("UnityEngine.UI", "CanvasScaler", "Update", 0, false)
}

/**
 * runOnMain函数名描述的可能不太恰当，但是初衷是让传入的函数再updata中被调用一次
 * 涉及到UI操作的函数调用在frida里是必然调用失败的 0x8
 * B("Update") 拿到函数 update 的 pointer 填入第一个参数
 * @param {Pointer} UpDatePtr 
 * @param {Function} Callback 
 */
var runOnMain = (UpDatePtr, Callback) => {
    if (Callback == undefined) return
    if (typeof (UpDatePtr) == "function") {
        Callback = UpDatePtr
        UpDatePtr = find_method("UnityEngine.UI", "CanvasUpdateRegistry", "PerformUpdate", 0)
    }
    A(UpDatePtr, () => {
        if (Callback != undefined && Callback != null) {
            try {
                Callback()
            } catch (e) {
                LOG(e, LogColor.RED)
            }
            Callback = null
        }
    })
}

/**
 * TODO Unity 事件相关的hook
 */
var HookEvents = () => {
    // 事件构造
    A(find_method('UnityEngine.CoreModule', 'UnityAction', '.ctor', 2), (args) => {
        LOG(" [*] .ctor ---> " + ptr(args[2]) + "\t--->" + ptr(args[2]).sub(soAddr))
    })
    // 事件系统

}

var showGameObject = gameObj => {

    if (gameObj == undefined) return
    gameObj = ptr(gameObj)
    LOG("--------- GameObject ---------", LogColor.C33)
    LOG("gameObj\t\t--->\t" + gameObj, LogColor.C36)
    if (gameObj == 0) return
    LOG("getName\t\t--->\t" + getObjName(gameObj), LogColor.C36)
    LOG("getLayer\t--->\t" + f_getLayer(gameObj), LogColor.C36)
    var m_transform = f_getTransform(gameObj)
    LOG("getTransform\t--->\t" + m_transform, LogColor.C36)
    // LOG("getTag\t\t--->\t"+f_getTag(gameObj).add(p_size*3).readUtf16String(),LogColor.C36)
    var debug = true
    var layerNames = ""
    for (let i = 0; i < 10; i++) {
        var spl = layerNames == "" ? "" : " <--- "
        layerNames = layerNames + spl + readU16(f_getName(m_transform)) + (debug ? "(" + m_transform + ")" : "")
        m_transform = f_getParent(m_transform)
        if (m_transform == 0) break
    }
    LOG("hierarchy\t--->\t" + layerNames, LogColor.C36)
}

var showTransform = transform => {
    LOG(`${getLine(15)} Transform ${getLine(15)}`, LogColor.C33)

    transform = ptr(transform)

    // 保留小数位数
    let toFixedNum = 2

    try {
        if (p_getChildCount != 0) {
            let childCount = f_getChildCount(transform)
            LOG("childCount\t--->\t" + childCount + "\t(" + getObjName(transform) + ")", LogColor.C36)
            PrintHierarchy(transform, 1, true)
        }
    } catch {}

    let eulerAngles_vector3 = allocVector(0, 0, 0)
    callFunction(find_method("UnityEngine.CoreModule", "Transform", "get_eulerAngles", 0), eulerAngles_vector3, transform)
    LOG("eulerAngles\t(" + eulerAngles_vector3 + ")\t--->\t" + eulerAngles_vector3.readFloat().toFixed(toFixedNum) + "\t" + eulerAngles_vector3.add(p_size).readFloat().toFixed(toFixedNum) + "\t" + eulerAngles_vector3.add(p_size * 2).readFloat().toFixed(toFixedNum), LogColor.C36)

    let forward_vector3 = allocVector(0, 0, 0)
    callFunction(find_method("UnityEngine.CoreModule", "Transform", "get_forward", 0), forward_vector3, transform)
    LOG("forward\t\t(" + forward_vector3 + ")\t--->\t" + forward_vector3.readFloat().toFixed(toFixedNum) + "\t" + forward_vector3.add(p_size).readFloat().toFixed(toFixedNum) + "\t" + forward_vector3.add(p_size * 2).readFloat().toFixed(toFixedNum), LogColor.C36)

    let Position_vector3 = allocVector(0, 0, 0)
    callFunction(find_method("UnityEngine.CoreModule", "Transform", "get_position", 0), Position_vector3, transform)
    LOG("position\t(" + Position_vector3 + ")\t--->\t" + Position_vector3.readFloat().toFixed(toFixedNum) + "\t" + Position_vector3.add(p_size).readFloat().toFixed(toFixedNum) + "\t" + Position_vector3.add(p_size * 2).readFloat().toFixed(toFixedNum), LogColor.C36)

    let localPosition_vector3 = allocVector(0, 0, 0)
    callFunction(find_method("UnityEngine.CoreModule", "Transform", "get_localPosition", 0), localPosition_vector3, transform)
    LOG("localPosition\t(" + localPosition_vector3 + ")\t--->\t" + localPosition_vector3.readFloat().toFixed(toFixedNum) + "\t" + localPosition_vector3.add(p_size).readFloat().toFixed(toFixedNum) + "\t" + localPosition_vector3.add(p_size * 2).readFloat().toFixed(toFixedNum), LogColor.C36)

    let localRotation_Quaternion = allocVector(0, 0, 0, 0)
    callFunction(find_method("UnityEngine.CoreModule", "Transform", "get_localRotation", 0), localRotation_Quaternion, transform)
    LOG("localRotation\t(" + localRotation_Quaternion + ")\t--->\t" + localRotation_Quaternion.readFloat().toFixed(toFixedNum) + "\t" + localRotation_Quaternion.add(p_size).readFloat().toFixed(toFixedNum) + "\t" + localRotation_Quaternion.add(p_size * 2).readFloat().toFixed(toFixedNum) + "\t" + localRotation_Quaternion.add(p_size * 3).readFloat().toFixed(toFixedNum), LogColor.C36)

    let localScale_vector3 = allocVector(0, 0, 0)
    callFunction(find_method("UnityEngine.CoreModule", "Transform", "get_localScale", 0), localScale_vector3, transform)
    LOG("localScale\t(" + localScale_vector3 + ")\t--->\t" + localScale_vector3.readFloat().toFixed(toFixedNum) + "\t" + localScale_vector3.add(p_size).readFloat().toFixed(toFixedNum) + "\t" + localScale_vector3.add(p_size * 2).readFloat().toFixed(toFixedNum), LogColor.C36)

    let lossyScale_vector3 = allocVector(0, 0, 0)
    callFunction(find_method("UnityEngine.CoreModule", "Transform", "get_lossyScale", 0), lossyScale_vector3, transform)
    LOG("lossyScale\t(" + lossyScale_vector3 + ")\t--->\t" + lossyScale_vector3.readFloat().toFixed(toFixedNum) + "\t" + lossyScale_vector3.add(p_size).readFloat().toFixed(toFixedNum) + "\t" + lossyScale_vector3.add(p_size * 2).readFloat().toFixed(toFixedNum), LogColor.C36)

    let right_vector3 = allocVector(0, 0, 0)
    callFunction(find_method("UnityEngine.CoreModule", "Transform", "get_right", 0), right_vector3, transform)
    LOG("right\t\t(" + right_vector3 + ")\t--->\t" + right_vector3.readFloat().toFixed(toFixedNum) + "\t" + right_vector3.add(p_size).readFloat().toFixed(toFixedNum) + "\t" + right_vector3.add(p_size * 2).readFloat().toFixed(toFixedNum), LogColor.C36)

    let up_vector3 = allocVector(0, 0, 0)
    callFunction(find_method("UnityEngine.CoreModule", "Transform", "get_up", 0), up_vector3, transform)
    LOG("up\t\t(" + up_vector3 + ")\t--->\t" + up_vector3.readFloat() + "\t" + up_vector3.add(p_size).readFloat() + "\t" + up_vector3.add(p_size * 2).readFloat(), LogColor.C36)

    let rotation_Quaternion = allocVector(0, 0, 0, 0)
    callFunction(find_method("UnityEngine.CoreModule", "Transform", "get_rotation", 0, true), rotation_Quaternion, transform)
    LOG("rotation\t(" + rotation_Quaternion + ")\t--->\t" + rotation_Quaternion.readFloat() + "\t" + rotation_Quaternion.add(p_size).readFloat() + "\t" + rotation_Quaternion.add(p_size * 2).readFloat() + "\t" + rotation_Quaternion.add(p_size * 3).readFloat(), LogColor.C36)
}

var showEventData = eventData => {
    LOG(`${getLine(15)} EventData ${getLine(15)}`, LogColor.C33)

    eventData = ptr(eventData)

    let click_vector2 = allocVector()
    callFunction(find_method("UnityEngine.UI", "PointerEventData", "get_position", 0), click_vector2, eventData)
    LOG("ClickPositon\t--->\t" + click_vector2.readFloat() + "\t" + click_vector2.add(p_size).readFloat(), LogColor.C36)

    let f_get_clickTime = new NativeFunction(find_method("UnityEngine.UI", "PointerEventData", "get_clickTime", 0, true), 'float', ['pointer'])
    LOG("clickTime\t--->\t" + f_get_clickTime(eventData), LogColor.C36)

    LOG("clickCount\t--->\t" + callFunction(find_method("UnityEngine.UI", "PointerEventData", "get_clickCount", 0), eventData), LogColor.C36)

    let delta_vector2 = allocVector()
    callFunction(find_method("UnityEngine.UI", "PointerEventData", "get_delta", 0), allocVector(), eventData)
    LOG("delta\t\t--->\t" + delta_vector2.readFloat() + "\t" + delta_vector2.add(p_size).readFloat(), LogColor.C36)
}

/**
 * -------------------------------------------拓展方法-------------------------------------------------
 */

/**
 * 很多导出函数的地址第一条都是一个跳转指令，这里的计算以便后面使用InlineHook用到
 * 列举一些我们常用的就是了，其他的也可以自行计算
 */
var getRealAddr = () => {

    getLogByExport('il2cpp_string_new')
    getLogByExport('il2cpp_get_corlib')
    getLogByExport('il2cpp_domain_get')
    getLogByExport('il2cpp_assembly_get_image')
    getLogByExport('il2cpp_image_get_class_count')
    getLogByExport('il2cpp_image_get_class')
    getLogByExport('il2cpp_class_get_methods')
    getLogByExport('il2cpp_class_get_type')
    getLogByExport('il2cpp_class_from_system_type')
    getLogByExport('il2cpp_class_from_name')
    getLogByExport('il2cpp_class_get_method_from_name')

    function getLogByExport(exp) {

        let realAddr = 0
        let aimAddr = ptr(Module.findExportByName(soName, exp))

        // 使用手动计算偏移加源地址得到目的地址
        // realAddr = aimAddr.add((aimAddr.readPointer() << 8 >> 8)*4 + 8)
        // 使用frida的api Instruction
        realAddr = ptr(Instruction.parse(aimAddr).opStr.split('#')[1])

        LOGH(getLine(20) + '\n' + exp + ' \n\t' +
            aimAddr + ' (' + aimAddr.sub(soAddr) + ')\t--->\t' +
            realAddr + ' (' + realAddr.sub(soAddr) + ')')
    }
}

var GotoScene = str => {
    if (str == undefined) return
    callFunction(find_method("UnityEngine.CoreModule", "SceneManager", "LoadScene", 2), il2cpp_string_new(allocStr(str)))
}

var setActive = (gObjOrTrs, visible) => {
    if (gObjOrTrs == undefined) return
    if (visible == undefined) visible = false
    if (getType(gObjOrTrs, 2)[0] == "Transform") gObjOrTrs = getGameObject(gObjOrTrs)
    callFunction(find_method("UnityEngine.CoreModule", "GameObject", "SetActive", 1), gObjOrTrs, visible ? 0x1 : 0x0)
}

var destroyObj = gObjOrTrs => {
    if (gObjOrTrs == undefined) return
    if (getType(gObjOrTrs, 2)[0] == "Transform") gObjOrTrs = getGameObject(gObjOrTrs)
    callFunction(find_method("UnityEngine.CoreModule", "Object", "Destroy", 1), ptr(gObjOrTrs))
}

/**
 * @param {int} defaltActive 0 setActive(false) 1 setActive(true) 2 all
 */
var HookSetActive = defaltActive => {
    defaltActive = defaltActive == undefined ? 1 : defaltActive
    A(find_method("UnityEngine", "GameObject", "SetActive", 1), (args, ctx) => {
        // 过滤那些不安分的反复横跳的obj
        if (filterDuplicateOBJ(readU16(f_getName(ptr(args[0])))) == -1) return
        if (defaltActive == 2 || args[1].toInt32() == defaltActive) {
            LOGW("\n" + getLine(38))
            LOGD("public extern void SetActive( " + (args[1].toInt32() == 0 ? "false" : "true") + " );  LR:" + checkCtx(ctx.lr))
            LOGO(getLine(20))
            showGameObject(args[0])
        }
    })
}

/**
 * 大于最大出现次数返回值为 -1
 * 主要是为了过滤比如setActive中重复出现的一直频繁调用的obj
 * @param {String} objstr 重复出现的str 
 * @param {int} maxCount 最大出现次数
 * @returns ? -1
 */
var filterDuplicateOBJ = (objstr, maxCount) => {
    if (!outFilterMap.has(objstr)) {
        outFilterMap.set(objstr, 0)
        return 0
    }
    let count = Number(outFilterMap.get(objstr)) + 1
    outFilterMap.set(objstr, count)
    return (count >= (maxCount == undefined ? 10 : maxCount)) ? -1 : count
}

function HookOnPointerClick() {
    let funcAddr = undefined
    switch (arguments[0]) {
        default:
            funcAddr = find_method("UnityEngine.UI", "Button", "OnPointerClick", 1)
            if (funcAddr == 0) break
            LOGE("\nEnable Hook OnPointerClick at " + funcAddr + "(" + funcAddr.sub(soAddr) + ")" + "\n")
            A(funcAddr, (args) => {
                LOGW("\n" + getLine(38))
                LOGD("public void OnPointerClick( " + args[0] + " , " + args[1] + " );")
                FakePointerEventData(args[1])
            })
            break
        case 0:
            funcAddr = find_method("UnityEngine.UI", "PointerInputModule", "DeselectIfSelectionChanged", 2)
            if (funcAddr == 0) break
            LOGE("\nEnable Hook DeselectIfSelectionChanged at " + funcAddr + "(" + funcAddr.sub(soAddr) + ")" + "\n")
            A(funcAddr, (args) => {
                LOGW("\n" + getLine(38))
                LOGD("protected void DeselectIfSelectionChanged(Ins = " + args[0] + " , GameObject = " + args[1] + " , BaseEventData(" + findClass("BaseEventData") + ") = " + args[2] + " );")
                if (args[1] != 0) showGameObject(args[1])
            })
            break
        case 1:
            funcAddr = find_method("UnityEngine.UI", "ScrollRect", "OnInitializePotentialDrag", 1)
            if (funcAddr == 0) break
            LOGE("\nEnable Hook OnInitializePotentialDrag at " + funcAddr + "(" + funcAddr.sub(soAddr) + ")" + "\n")
            A(funcAddr, (args) => {
                LOGW("\n" + getLine(38))
                LOGD("public void OnInitializePotentialDrag( " + args[0] + " , " + args[1] + " );")
                FakePointerEventData(args[1])
            })
            break
        case 2:
            A(find_method("UnityEngine.UI", "PointerInputModule", "ProcessMove", 1), (args) => {
                LOGW("\n" + getLine(38))
                LOGD("protected virtual Void ProcessMove( " + (args[1]) + " );")
                FakePointerEventData(args[1])
            })
            break
        case 3:
            A(find_method("UnityEngine.UI", "PointerInputModule", "ProcessDrag", 1), (args) => {
                LOGW("\n" + getLine(38))
                LOGD("protected virtual Void ProcessDrag( " + (args[1]) + " );")
                FakePointerEventData(args[1])
            })
            break
        case 4:
            A(find_method("UnityEngine.UI", "BaseInputModule", "HandlePointerExitAndEnter", 2), (args) => {
                LOGW("\n" + getLine(38))
                LOGD("protected virtual Void HandlePointerExitAndEnter( " + (args[1]) + " , " + (args[2]) + ")")
                FakePointerEventData(args[1])
            })
            break
        case 5:
            A(find_method("UnityEngine.UI", "PointerEventData", "set_pointerPress", 1), (args) => {
                LOGW("\n" + getLine(38))
                LOGD("protected virtual Void set_pointerPress( " + (args[1]) + " );")
                showGameObject(args[1])
            })
            break
        case 6:
            A(find_method("UnityEngine.UI", "PointerInputModule", "GetPointerData", 3), (args) => {
                LOGW("\n" + getLine(38))
                LOGD("protected virtual Void GetPointerData( " + (args[2]) + " );")
                showGameObject(args[1])
                showEventData(args[2])
            })
            break
        case 7:
            // EventSystem --->  public Void RaycastAll (PointerEventData eventData,List`1 raycastResults)
            A(find_method("UnityEngine.UI", "EventSystem", "RaycastAll", 2), (args) => {
                LOGW("\n" + getLine(38))
                LOGD(`protected virtual Void RaycastAll( ${args[0]} , ${args[1]} , ${args[2]} );`)
                FakePointerEventData(args[1])
            })
            break
        case 8:
            // PointerInputModule --->  protected PointerEventData GetTouchPointerEventData (Touch input,Boolean pressed,Boolean released)
            A(find_method("UnityEngine.UI", "PointerInputModule", "GetTouchPointerEventData", 3), (args) => {}, (ret) => {
                LOGW("\n" + getLine(38))
                LOGD(`protected virtual Void GetTouchPointerEventData `)
                FakePointerEventData(ret)
            })
        case 9:
            // Selectable --->  public virtual Void OnPointerExit (PointerEventData eventData)
            A(find_method("UnityEngine.UI", "Selectable", "OnPointerExit", 1), (args) => {
                LOGW("\n" + getLine(38))
                LOGD("protected virtual Void OnPointerExit( " + (args[1]) + " );")
                FakePointerEventData(args[1])
            })
            break
    }

    function FakePointerEventData(eventData) {
        if (eventData == 0) return
        let gameObj = f_get_pointerEnter(eventData)
        if (gameObj != 0) showGameObject(gameObj)
        // showTransform(f_getTransform(gameObj))
        // showEventData(pointerEventData)
    }
}

var HookPlayerPrefs = (isShowPrintStack, needLRInfo) => {
    isShowPrintStack = !(isShowPrintStack == undefined)
    if (needLRInfo == undefined && !isShowPrintStack) needLRInfo = true

    InterceptorGetFunctions()
    InterceptorSetFunctions()

    function InterceptorGetFunctions() {

        //public static extern float GetFloat(string key, float defaultValue)
        A(find_method("UnityEngine.CoreModule", "PlayerPrefs", "GetFloat", 2, true), (args, ctx, pass) => {
            pass.set("arg0", readU16(args[0]))
            pass.set("arg1", args[1])
        }, (ret, ctx, pass) => {
            LOGD("\n[*] '" + ret + "' = GetFloat('" + pass.get("arg0") + "'," + pass.get("arg1") + ")")
            if (needLRInfo) LOG("\t\t { LR:" + checkCtx(ctx.lr) + " } | { PC:" + checkCtx(ctx.pc) + " }", LogColor.C90)
            if (isShowPrintStack) LOG((GetStackTraceN(ctx)), LogColor.C90)
        })

        //public static extern int GetInt(string key, int defaultValue)
        A(find_method("UnityEngine.CoreModule", "PlayerPrefs", "GetInt", 2, true), (args, ctx, pass) => {
            pass.set("arg0", readU16(args[0]))
            pass.set("arg1", args[1])
        }, (ret, ctx, pass) => {
            LOGD("\n[*] '" + ret.toInt32() + "' = GetInt('" + pass.get("arg0") + "'," + pass.get("arg1") + ")")
            if (needLRInfo) LOG("\t\t { LR:" + checkCtx(ctx.lr) + " } | { PC:" + checkCtx(ctx.pc) + " }", LogColor.C90)
            if (isShowPrintStack) LOG((GetStackTraceN(ctx)), LogColor.C90)
            if (pass.get("arg0").indexOf("SaleBoughted") != -1) ret.replace(ptr(0x1))
        })

        //public static string GetString(string key)
        A(find_method("UnityEngine.CoreModule", "PlayerPrefs", "GetString", 1, true), (args, ctx, pass) => {
            pass.set("arg0", readU16(args[0]))
        }, (ret, ctx, pass) => {
            LOGD("\n[*] '" + readU16(ret) + "' = GetString('" + pass.get("arg0") + "')")
            if (needLRInfo) LOG("\t\t { LR:" + checkCtx(ctx.lr) + " } | { PC:" + checkCtx(ctx.pc) + " }", LogColor.C90)
            if (isShowPrintStack) LOG((GetStackTraceN(ctx)), LogColor.C90)
        })
    }

    function InterceptorSetFunctions() {

        //public static extern float GetFloat(string key, float defaultValue)
        A(find_method("UnityEngine.CoreModule", "PlayerPrefs", "SetFloat", 2, true), (args, ctx, pass) => {
            pass.set("arg0", readU16(args[0]))
            pass.set("arg1", (args[1] == 0 ? 0 : readSingle(args[1])))
        }, (ret, ctx, pass) => {
            LOGD("\n[*] SetFloat('" + pass.get("arg0") + "'," + pass.get("arg1") + ")")
            if (needLRInfo) LOG("\t\t { LR:" + checkCtx(ctx.lr) + " } | { PC:" + checkCtx(ctx.pc) + " }", LogColor.C90)
            if (isShowPrintStack) LOG((GetStackTraceN(ctx)), LogColor.C90)
        })

        //public static extern int GetInt(string key, int defaultValue)
        A(find_method("UnityEngine.CoreModule", "PlayerPrefs", "SetInt", 2, true), (args, ctx, pass) => {
            pass.set("arg0", readU16(args[0]))
            pass.set("arg1", args[1])
        }, (ret, ctx, pass) => {
            LOGD("\n[*] SetInt('" + pass.get("arg0") + "'," + pass.get("arg1") + ")")
            if (needLRInfo) LOG("\t\t { LR:" + checkCtx(ctx.lr) + " } | { PC:" + checkCtx(ctx.pc) + " }", LogColor.C90)
            if (isShowPrintStack) LOG((GetStackTraceN(ctx)), LogColor.C90)
        })

        //public static string GetString(string key)
        A(find_method("UnityEngine.CoreModule", "PlayerPrefs", "SetString", 2, true), (args, ctx, pass) => {
            pass.set("arg0", readU16(args[0]))
            pass.set("arg1", readU16(args[1]))
        }, (ret, ctx, pass) => {
            LOGD("\n[*] SetString('" + pass.get("arg0") + "','" + pass.get("arg1") + "')")
            if (needLRInfo) LOG("\t\t { LR:" + checkCtx(ctx.lr) + " } | { PC:" + checkCtx(ctx.pc) + " }", LogColor.C90)
            if (isShowPrintStack) LOG((GetStackTraceN(ctx)), LogColor.C90)
        })
    }
}

function checkCtx(lr) {
    let md = Process.findModuleByAddress(lr)
    return ptr(lr).sub(md.base) + `|${md.name}`
}

var HookDebugLog = () => {
    // public static void Log(object message)
    // A(find_method("UnityEngine.CoreModule", "Debug", "Log", 1, true), (args) => {
    //     LOG("\n[*] Debug.LOG('" + readU16(args[0]) + "')", LogColor.C36)
    // })

    // public void Log(LogType logType, object message)
    let addr_Log = find_method("UnityEngine.CoreModule", "Logger", "Log", 2, false, 2)
    LOG("[*] Hook : UnityEngine.CoreModule.Logger.Log : " + addr_Log)
    A(addr_Log, (args, ctx) => {
        LOG("\n[*] Logger.LOG('" + args[1] + "\t" + readU16(args[2]) + "') LR : " + checkCtx(ctx.lr), LogColor.C32)
    })

    // public static void LogException(Exception exception)
    let addr_LogException = find_method("UnityEngine.CoreModule", "Debug", "LogException", 1, false, 2)
    LOG("[*] Hook : UnityEngine.CoreModule.Debug.LogException : " + addr_LogException)
    A(addr_LogException, (args) => {
        let retStr = callFunction(find_method("mscorlib", "Exception", "ToString", 0, true), args[0])
        LOG("\n[*] Logger.LOG('" + readU16(retStr) + "')", LogColor.C36)
    })
}

var HookLoadScene = () => {

    getCurrent()

    A(find_method("UnityEngine.CoreModule", "SceneManager", "LoadScene", 2), (args) => {
        LOG("\nCalled public static Scene LoadScene (String sceneName,LoadSceneParameters parameters)", LogColor.C36)
        LOG(" arg0  --->\t" + args[0] + "\t" + readU16(args[0]), LogColor.C36)
    }, (ret) => {
        LOG(" ret  --->\t" + ret, LogColor.C36)
    })

    function getCurrent() {
        //B("Scene") 其他程序自定义的点
        let GetActiveScene = find_method("UnityEngine.CoreModule", "SceneManager", "GetActiveScene", 0)
        if (GetActiveScene != 0) {
            LOG("\nCurrentScene   --->   " +
                readU16(callFunction(find_method("UnityEngine.CoreModule", "Scene", "GetNameInternal", 1),
                    callFunction(GetActiveScene))) + "\n", LogColor.C36)
        }
    }
}

var HookUnityExit = () => {
    var packageName = ""
    R(find_method("UnityEngine.CoreModule", "Application", "Quit", 0), () => {
        LOG("Called UnityEngine.CoreModule.Application.Quit")
    })
    R(find_method("UnityEngine.CoreModule", "Application", "Quit", 1), () => {
        LOG("Called UnityEngine.CoreModule.Application.Quit")
    })
    // R(find_method("UnityEngine.CoreModule", "Application", "Quit", 1), (srcCall) => {
    //     LOG("SrcPackageName ===> " + readU16(srcCall()))
    //     return packageName == "" ? srcCall() : allocStr(packageName)
    // })

    attachJava(function () {
        Java.use("android.app.Activity").finish.overload().implementation = function () {
            LOG("called Finish ~ ", LogColor.C36)
            PrintStackTrace()
        }
        Java.use("java.lang.System").exit.implementation = function (code) {
            LOG("called exit(" + code + ") ~ ", LogColor.C36)
            PrintStackTrace()
        }
    })
}

var HookInstantiate = () => {
    b(find_method("UnityEngine.CoreModule", "Object", "Instantiate", 1, false, 1))
    b(find_method("UnityEngine.CoreModule", "Object", "Instantiate", 3, false, 1))
    b(find_method("UnityEngine.CoreModule", "Object", "Instantiate", 4, false, 1))
}

/**
 * 打印transform往下的层级
 * ps:不建议打印底层的层级，展现一大篇出来毫无重点
 * @param {Number} mPtr Transform Pointer
 * @param {Number} level 最大显示层级
 * @param {Boolean} inCall 内部调用，去掉LOG的相关判断
 */
var PrintHierarchy = (mPtr, level, inCall) => {
    LogFlag = true
    if (mPtr == 0 || mPtr == undefined) return
    if (getType(ptr(mPtr), 2)[0] == "GameObject") mPtr = f_getTransform(ptr(mPtr))

    if (level == undefined) level = 2
    let transform = ptr(mPtr)

    if (level == 10) LOG(getLine(75) + "\n", LogColor.C33)
    // 当前level作为第一级
    let baseLevel = getLevel(transform)
    LOGD((inCall ? "\t" : "") + getLine(0, "\t") + baseLevel)
    LOG((inCall != undefined ? "\t" : "") + getLine(0, "\t") + transform + " : " + getObjName(transform), LogColor.C36)
    getChild(transform)

    if (level == 10) LOG("\n" + getLine(75), LogColor.C33)

    // 递归调用下层信息
    function getChild(p1) {
        let childCount = f_getChildCount(p1)
        for (let i = 0; i < childCount; i++) {
            let c_transform = f_getChild(p1, i)
            let levelC = getLevel(c_transform) - baseLevel
            // 这里可能出现 -1 -2 的情况，打出来一大片和当前transform无关的transform
            if (levelC > 0 && levelC <= level)
                LOG((inCall != undefined ? "\t" : "") +
                    getLine(levelC, "\t") +
                    c_transform + " : " +
                    readU16(f_getName(c_transform)), LogColor.C36)
            getChild(c_transform)
        }
    }

    // 判断当前transform的层级
    function getLevel(transform) {
        for (let i = 0; i < 10; i++) {
            try {
                transform = f_getParent(transform)
                if (transform == 0) return i
            } catch (e) {
                return 0
            }
        }
        return 0
    }
}

/**
 * 根据子Transform的名称来找父Transform的子Transform
 * 配合SetLocalScale()和HookSetActive()使用来动态的去掉页面上的view
 * 有时候可能会遇到同名，只需要多查找一层，判断子transform名称，并通过f_getParent即可找到特定父级
 */
var findTransform = (mPtr, level, filter) => {
    if (mPtr == 0 || mPtr == undefined) return
    if (level == undefined) level = 10
    let transform = ptr(mPtr)
    let retStr = ""

    let baseLevel = getLevel(transform)

    getChild(transform)

    function getChild(p1) {
        let childCount = f_getChildCount(p1)
        for (let i = 0; i < childCount; i++) {
            let c_transform = f_getChild(p1, i)
            let levelC = getLevel(c_transform) - baseLevel
            if (levelC <= level) {
                let name = readU16(f_getName(c_transform))
                // LOG(c_transform+" ---> "+name)
                if (filter == name) {
                    retStr = c_transform
                }
            }
            getChild(c_transform)
        }
    }

    function getLevel(transform) {
        for (let i = 0; i < 10; i++) {
            try {
                transform = f_getParent(transform)
                if (transform == 0) return i
            } catch (e) {
                return 0
            }
        }
        return 0
    }
    return retStr
}

/**
 * 辅助我们判断该地址是否可以使用 inlinehook
 * @param {Pointer} mPtr 
 * @param {int} Type 0 true/false | 1 int | 2 Pointer | 3 sub(soAddr)
 * @returns 
 */
var canUseInlineHook = (mPtr, Type) => {
    mPtr = checkPointer(mPtr)
    if (Type == undefined) Type = 0
    if (Type == 0) return getNextB(mPtr) > 3
    if (Type == 1) return getNextB(mPtr)
    if (Type == 2) return ptr(recommandInlineHook(mPtr))
    if (Type == 3) return ptr(recommandInlineHook(mPtr)).sub(soAddr)

    function getNextB(mPtr) {
        mPtr = ptr(mPtr)
        let count = 0
        do {
            var str = Instruction.parse(mPtr).mnemonic
            mPtr = mPtr.add(p_size)
            count++
        } while (str != "b" && str != "bl" && str != "blx" && str != "ret")
        return count
    }

    function recommandInlineHook(mPtr) {
        let index = getNextB(ptr(mPtr))
        return index > 3 ? mPtr : ptr(Instruction.parse(mPtr.add(p_size * (index - 1))).opStr.split("#")[1]).sub(soAddr)
    }
}

// 有些时候遇到的游戏数据的保存会出现问题,只能整体的保存类(其实用处不大,涉及到存储的是指针就用不了了)
class MemoryUtil {

    /**
     * 指定mPtr开始,保存长度为size的大小到本地文件
     */
    static Save(mPtr, size, fileName) {
        let path = readU16(new NativeFunction(find_method("UnityEngine.CoreModule", "Application", "get_persistentDataPath", 0), 'pointer', [])()) + "/" + (fileName == undefined ? "lzy.dat" : fileName)
        let fopen = new NativeFunction(Module.findExportByName(null, 'fopen'), 'pointer', ['pointer', 'pointer'])
        let fwrite = new NativeFunction(Module.findExportByName(null, 'fwrite'), 'pointer', ['pointer', 'int', 'int', 'pointer'])
        let fclose = new NativeFunction(Module.findExportByName(null, 'fclose'), 'int', ['pointer'])
        let stream = fopen(allocStr(path), allocStr("w"))
        Memory.protect(ptr(mPtr), size, 'rwx')
        fwrite(ptr(mPtr), 1, size, ptr(stream))
        fclose(stream)
    }
    /**
     * 从指定文件,加载长度为size的大小到mPtr
     */
    static Load(mPtr, size, fileName) {
        let path = readU16(new NativeFunction(find_method("UnityEngine.CoreModule", "Application", "get_persistentDataPath", 0), 'pointer', [])()) + "/" + (fileName == undefined ? "lzy.dat" : fileName)
        let fopen = new NativeFunction(Module.findExportByName(null, 'fopen'), 'pointer', ['pointer', 'pointer'])
        let fread = new NativeFunction(Module.findExportByName(null, 'fread'), 'pointer', ['pointer', 'int', 'int', 'pointer'])
        let fclose = new NativeFunction(Module.findExportByName(null, 'fclose'), 'int', ['pointer'])
        let stream = fopen(allocStr(path), allocStr("r"))
        Memory.protect(ptr(mPtr), size, 'rwx')
        fread(ptr(mPtr), 1, size, ptr(stream))
        fclose(stream)
    }
}

/**
 * 使用系统 8.1  R7即为中断号
 * 参考 https://bbs.pediy.com/thread-268086.htm
 */
function fackSVC() {
    let LIBC = "libc.so"
    let syscall = Module.findExportByName(LIBC, "syscall")
    LOG("\nsyscall addr = " + syscall + "\n", LogColor.C92)
    let endFuncOff = 0x0
    let svcOff = 0x0
    for (let p = 0; p < 20; p++) {
        if (Instruction.parse(syscall.add(p_size * p)).mnemonic == "svc") svcOff = p
        if (Instruction.parse(syscall.add(p_size * p)).mnemonic == "b") {
            endFuncOff = p + 1
            break
        }
    }
    printCtx(syscall, endFuncOff, 2, svcOff)

    let svcAddr = syscall.add(svcOff * p_size)
    LOG("\nsvc addr = " + syscall.add(svcOff * p_size) + "\n", LogColor.C92)

    let arr_context = new Array()
    A(svcAddr, (args, ctx) => {
        if (filterDuplicateOBJ(String(ctx.r7), 10, false) != -1) {
            LOG(`\n${getLine(45)}`, LogColor.YELLOW)
            arr_context.length = 0
            // R7 中断号 参考 unistd-common.h 
            LOG("R7:" + ctx.r7, LogColor.C94)
            LOG("sp:" + ctx.sp + "\t" + "pc:" + ctx.pc, LogColor.C94)
            LOG("R0:" + ctx.r0)
            LOG("R1:" + ctx.r1)
            LOG("R2:" + ctx.r2)
            LOG("R3:" + ctx.r3)
            arr_context.push(ctx.r0)
            arr_context.push(ctx.r1)
            arr_context.push(ctx.r2)
            arr_context.push(ctx.r3)
            // LOG(JSON.stringify(arr_context))
        }
    })
}

let newThreadCallBack = () => {}
let newThreadDelay = 0
let LshowLOG = true
let newThreadSrcCallBack = new NativeCallback(() => {
    if (LshowLOG) LOG("\nEnter new Thread pid:" + f_getpid() + " tid:" + f_gettid(), LogColor.C36)
    while (newThreadDelay-- > 0) {
        if (LshowLOG) LOG("Sleep -> " + newThreadDelay + " secs", LogColor.C94)
        Thread.sleep(1)
    }
    if (LshowLOG) LOG("Called newThreadCallBack", LogColor.C34)
    newThreadCallBack()
    return ptr(0)
}, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer'])

var RunOnNewThread = (callback, delay, showLOG) => {
    newThreadCallBack = callback
    LshowLOG = showLOG
    if (delay != undefined) newThreadDelay = delay
    if (p_pthread_create == null || p_gettid == null || p_getpid == null) {
        LOG("Fail to init thread", LogColor.RED)
        return
    }
    callFunction(p_pthread_create, alloc(), ptr(0), newThreadSrcCallBack, ptr(0))
}

/**
 * 未找到 void *Art::Current() 就将就这么用一下
 * 运行这个 getJclassName 函数时候再两秒钟内触发一下 DecodeJObject 函数即可得到 jclsName
 * 
 * 参考链接：
 * https://www.jianshu.com/p/dba5e5ef2ad5?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation
 * https://cs.android.com/android/platform/superproject/+/master:art/runtime/mirror/class.cc;l=1634;bpv=1;bpt=1?q=class.cc&sq=&ss=android%2Fplatform%2Fsuperproject
 * @param {*} jclsName 
 */
let getJclassName = (jclsName, ShouldRet) => {
    ShouldRet == undefined ? false : true
    let pVoid = callFunction(DecodeJObject, ArtCurrent, jclsName)
    let k_class = callFunction(GetDescriptor, pVoid, alloc())
    if (ShouldRet) return String(ptr(k_class).readCString())
    LOG("\n" + String(ptr(k_class).readCString()) + "\n", LogColor.C36)
}

/**
 * 常用index
 * NewStringUTF 166 | GetStringUTFChars 169 | FindClass 6 | 
 * GetStaticMethodID 113 | GetStaticFieldID 144 | GetFieldID 94 | GetMethodID 33 
 * CallVoidMethod 61 | CallObjectMethod 34 
 * @param {Number} index 位于env结构体的位置
 * @returns ptr jni函数真实地址
 */
//https://docs.oracle.com/javase/8/docs/technotes/guides/jni/spec/functions.html#NewStringUTF
var getJNIFunction = index => frida_env.handle.readPointer().add(index * p_size).readPointer()

let saveIndexCode = [
    [],
    [],
    []
]

var patchCode = (mPtr, mList, saveIndex) => {
    if (mList == undefined) mList = [0x00, 0xF0, 0x20, 0xE3]
    if (mList == "MOV R0,#1") mList = [0x01, 0x00, 0xA0, 0xE3]
    if (mList == "MOV R0,#0") mList = [0x00, 0x00, 0xA0, 0xE3]
    mPtr = checkPointer(mPtr)
    Memory.protect(mPtr, 0x1000, "rwx")
    if (saveIndex != undefined) saveIndexCode[i] = mPtr.readByteArray(4)
    mPtr.writeByteArray(mList)
}

var restoreCode = (mPtr, saveIndex) => {
    Memory.protect(mPtr, 100, "rwx")
    if (saveIndex[saveIndex] == undefined) return
    checkPointer(mPtr).writeByteArray(saveIndexCode[saveIndex])
}

function findInMemory(typeStr) {
    switch (typeStr) {
        case "Dex1":
            find("54 61 70 20 54 6F 20 53 74 61 72 74", (pattern, address, size) => {
                LOG('Found "DEX ' + pattern + " Address: " + address.toString() + "\n", LogColor.C36)
            })
            break
        case "Dex":
            find("64 65 78 0a 30 33 35 00", (pattern, address, size) => {
                // TODO
                LOG('Found "DEX"' + pattern + " Address: " + address.toString() + "\n", LogColor.C36)
            })
            break
        case "PNG":
            Process.enumerateRanges("r--").forEach((item) => {
                new Promise((onFound) => {
                    Memory.scan(item.base, item.size, "89 50 4E 47 0D 0A 1A 0A", {
                        onMatch: function (addressStart) {
                            onFound(ptr(addressStart))
                        },
                        onComplete: function () {}
                    })
                }).then(addressStart => {
                    // 同步方式效率太低
                    // let tmpResult = Memory.scanSync(ptr(addressStart), 8 * 1024, "00 00 00 00 49 45 4E 44 AE 42 60 82") 
                    new Promise((onFound) => {
                        Memory.scan(item.base, item.size, "00 00 00 00 49 45 4E 44 AE 42 60 82", {
                            onMatch: function (addressEnd) {
                                onFound(addressEnd)
                                return "stop"
                            },
                            onComplete: function () {}
                        })
                    }).then(value => {
                        return [addressStart, value]
                    }).then(result => {
                        let off = ptr(result[1]).sub(ptr(result[0]))
                        result[3] = off
                        LOG("\n" + getLine(60) + "\n[*] Found PNG From " + result[0] + " To " + result[1] + "  size : " + off + "(" + off.toInt32() + ")", LogColor.C36)
                        // arm 是小端模式 所以这里是字节顺序是大端 （Object下拓展了一个函数用来倒序 toInt32Big）
                        let x = toInt32Big(ptr(result[0]).add(p_size * 4).readPointer()).toInt32()
                        let y = toInt32Big(ptr(result[0]).add(p_size * 5).readPointer()).toInt32()
                        let dep = ptr(result[0]).add(p_size * 6).readU8()
                        let type = ptr(result[0]).add(p_size * 6 + 1).readU8()
                        let sig = toInt32Big(ptr(ptr(result[0]).add(p_size * 7 + 1).readPointer()))
                        LOG("\t (" + x + " X " + y + ") \t" + dep + " " + type + "\t" + sig, LogColor.C36)
                        return result
                    }).then(result => {
                        let length = ptr(result[3]).add(12).toInt32()
                        if (length <= 0) return
                        Memory.protect(result[0], 0xFFFF, "rwx")
                        let path = "/data/data/" + getPkgName() + "/" + result[0] + "_" + result[1] + ".png"
                        let file = new File(path, "wb")
                        file.write(Memory.readByteArray(result[0], length))
                        file.flush()
                        file.close()
                        LOGD('\tSave to\t\t===>\t' + path)
                    }).catch(err => {
                        LOGE(err)
                    })
                })
            })
            break
        case "global-metadata.dat":
            find("AF 1B B1 FA 18", (pattern, address, size) => {
                LOGE("\n" + getLine(80))
                LOGD('Found "global-metadata.dat"' + pattern + " Address: " + address.toString() + "\n")
                seeHexA(address, 64, true, LogColor.C33)

                let DefinitionsOffset = parseInt(address, 16) + 0x108;
                let DefinitionsOffset_size = Memory.readInt(ptr(DefinitionsOffset))

                let DefinitionsCount = parseInt(address, 16) + 0x10C;
                let DefinitionsCount_size = Memory.readInt(ptr(DefinitionsCount))

                // 根据两个偏移得出global-metadata大小
                let global_metadata_size = DefinitionsOffset_size + DefinitionsCount_size
                LOGD("\nFile size\t===>\t" + global_metadata_size + "B (" + (global_metadata_size / 1024 / 1024).toFixed(2) + "MB)")
                // 只保留大于两兆的文件
                if (global_metadata_size > 1024 * 1024 * 2) {
                    let path = "/data/data/" + getPkgName() + "/global-metadata.dat"
                    let file = new File(path, "wb")
                    file.write(Memory.readByteArray(address, global_metadata_size))
                    file.flush()
                    file.close()
                    LOGD('Save to\t\t===>\t' + path)
                }
                LOGD(getLine(80))
            })
            break
    }

    function find(pattern, callback) {
        LOG("Start Find Pattern '" + pattern + "'\nWatting ......", LogColor.C96)
        // 代码都是位于只读段
        let addrArray = Process.enumerateRanges("r--");
        addrArray.forEach((item) => {
            Memory.scan(item.base, item.size, pattern, {
                onMatch: function (address, size) {
                    callback(pattern, address, size)
                },
                onComplete: function () {}
            })
        })
    }

    function getPkgName() {
        let retStr = ""
        Java.perform(() => retStr = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext().getPackageName())
        return retStr
    }
}

/**
 * 两种方式查找 根据路径查找指定gameobj
 * @param {String} path 路径或者是顶层gobjName
 */
function findGameObject(path, transform) {
    try {
        if (transform == undefined) {
            if (arguments[2] != undefined) {
                // 返回 gameobject
                return callFunction(["UnityEngine.CoreModule", "GameObject", "Find", 1], allocStr(path, ""))
            } else {
                // GameObject.find（静态方法）得到GameObject,路径查找
                showGameObject(callFunction(["UnityEngine.CoreModule", "GameObject", "Find", 1], allocStr(path, "")))
            }
        } else if (getType(transform, 1).indexOf("Transform") != -1) {
            if (arguments[2] != undefined) {
                // 返回 transform
                return callFunction(["UnityEngine.CoreModule", "Transform", "Find", 1], transform, allocStr(path, ""))
            } else {
                // Transform.find(非静态方法) 得到的也是transform，指定查找起始点，可以查找隐藏对象
                showGameObject(getGameObject(callFunction(["UnityEngine.CoreModule", "Transform", "Find", 1], transform, allocStr(path, ""))))
            }
        } else {
            LOGE("\narguments[1] Need a Transform Ptr\n")
        }
    } catch (error) {
        LOGE("\nNot Found ...\n")
    }
}

/**
 * File : script.json (目前只针对32位做了适配)
 * 在arm32的时候是以下样子
 *      UnityEngine.UI.Button_var
 *      UnityEngine.RectTransform_var
 *      UnityEngine.UI.Text_var
 *      TMPro.TMP_SubMesh_var
 *      TMPro.TextMeshPro_var ...
 *  在arm64的时候是以下样子 
 *      UnityEngine.Component$$GetComponents < Component >
 *      UnityEngine.Component$$GetComponents < CanvasGroup >
 *      UnityEngine.GameObject$$GetComponent < Button >
 *      UnityEngine.GameObject$$GetComponent < Image >
 *  在arm64中使用到的上述函数只是对原GetComponents的一层封装，就是多做了一步 UnityEngine_Component__get_gameObject 拿到对应的gobj
 *      (***(Method$UnityEngine.Component.GetComponents<Component>() + 0x30))() 这一步懒得手动去转了，后续还是考虑处理解析到外层封装然后直接调用
 * arm64 和 arm32 一样会有一个初始化函数，这一点目前来说可能还是需要手动查找IDA
 * 通过 Il2CppDumper 静态解析出来的类型地址(bss中)， 获得运行时该类型指针（ 有可能类型未被初始化， 需要手动初始化）
 * @param {*} bssPtr    bss 段的 UnityEngine.Component_var / UnityEngine.MonoBehaviour_var / UnityEngine.RectTransform_var / UnityEngine.UI.Text_var ......
 * @param {*} initFuc   初始化函数地址 （三条LDR后面）
 * @param {*} index     初始化index （第二条LDR指向的BSS的值）
 * @returns 
 */
var getRuntimeTypeFromBssOrData = (bssPtr, initFuc, index) => {
    let handle = ptr(soAddr.add(bssPtr)).readPointer()
    if (handle == 0x0) {
        // 可能出现没有初始化的情况， 所以还是得借助ida去查看出初始化函数以及index
        if (initFuc != undefined && index != undefined) {
            callFunction(initFuc, index)
            LOGE("called init / try call this function again")
        } else {
            throw new Error("且未填写初始化函数\n借助IDA查看初始化函数以及Index")
        }
    }
    return callFunction(["mscorlib", "Type", "GetTypeFromHandle", 1], handle)
}

/**
 *  1. Init UnityEngine.RectTransform_var UnityEngine.UI.Text_var
    2. public static Type GetTypeFromHandle(RuntimeTypeHandle handle) RuntimeTypeHandle-- - > Type
    3. public static extern Object[] FindObjectsOfType(Type type) Type-- - > Type[] instance
    4. 返回的数组 size： add(0xC) / real: add(0xF)
    c3bd6660 60 a3 60 cb 00 00 00 00 00 00 00 00 86 00 00 00 `.`.............
    c3bd6670 80 f6 14 c4 30 f5 14 c4 70 f6 14 c4 30 f6 14 c4....0...p...0...
    c3bd6680 f0 f5 14 c4 d0 f5 14 c4 00 fc 14 c4 a0 f5 14 c4................
    c3bd6690 90 f5 14 c4 60 f5 14 c4 40 f5 14 c4 10 f5 14 c4....
    `...@.......
                c3bd66a0  20 f6 14 c4 00 f5 14 c4 e0 f4 14 c4 70 f5 14 c4   ...........p...

            [Pixel XL::Stick Warfare: Blood Strike]-> FindObjectsOfType(0xE2A9E0,0x2A9D90,0xDEC,"Text")
                0xc2d56cc0 ---> 开始
                0xc2d60d48 ---> 每日任务
                0xc2d75110 ---> 装备
                0xc2d75088 ---> 物品
                0xc2b94bb0 ---> 已拥有
                0xc2b94b28 ---> 金币: <Color=#ffc000>0 G</Color>
                0xc2b946e8 ---> 关闭
                0xc2b945d8 ---> 购买 ($2)
                0xc2b944c8 ---> 现金: <Color=#1ed300>0 $</Color>
                0xc2b94110 ---> 离开
            ......
 * TIPS:
 *  1.这个函数（ FindObjectsOfType） 也不是太好用，仅当setActive为true才能找到
 *  2.Button上面默认没有挂上调用的函数地址，都是在第一次用到了才会被注册在按键上
 *  3.当然运行时类型也有其他的方式获得 getType(ins) 即可（受限于必须得有方法调用才能拿到对应的实例）
 *  4.新增了 
 * @param {ptr} typePtr 运行时类型 
 * @param {String} typeStr fackknowType的参数，解析为什么类型
 */
function FindObjectsOfType(typePtr, ext) {
    // 给一个默认的 MonoBehaviour
    if (typePtr == undefined) typePtr = "MonoBehaviour"
    if (isNaN(typePtr)) typePtr = getRuntimeType(String(typePtr))
    if (typePtr == 0x0) return
    let FindObjectsOfTypeAddr = 0x0
    var tmpArray = new Array()
    switch (ext) {
        case 0:
        case 1:
            FindObjectsOfTypeAddr = find_method("UnityEngine.CoreModule", "Object", "FindObjectsOfType", 2)
            listObj(callFunction(FindObjectsOfTypeAddr, typePtr, ext), "OBJ")
            break
        case 2:
            FindObjectsOfTypeAddr = find_method("UnityEngine.CoreModule", "Resources", "FindObjectsOfTypeAll", 1)
            if (FindObjectsOfTypeAddr == 0x0) {
                FindObjectsOfTypeAddr = find_method("UnityEngine.CoreModule", "Object", "FindObjectsOfType", 2)
                listObj(callFunction(FindObjectsOfTypeAddr, typePtr, 1), "OBJ")
            } else {
                listObj(callFunction(FindObjectsOfTypeAddr, typePtr, 0), "OBJ")
            }
            break
        default:
            FindObjectsOfTypeAddr = find_method("UnityEngine.CoreModule", "Object", "FindObjectsOfType", 1)
            listObj(callFunction(FindObjectsOfTypeAddr, typePtr, 0), "OBJ")
            break
    }

    function listObj(arrPtr) {
        let arrLenth = ptr(arrPtr).add(p_size * 3).readInt()
        if (arrLenth == 0) throw new Error("There's no Instance")
        // 记录上次 对比不同就显示类型 反之不显示 （应对typePtr为Monobehavior的情况）
        let lastType = null
        let enableTypeShow = false
        let runtimeTypeDes = callFunctionRUS(["mscorlib", "Type", "ToString", 0], typePtr)
        LOGW(getLine(60))
        for (let index = 0; index < arrLenth; ++index) {
            let current = ptr(arrPtr).add(p_size * (4 + index)).readPointer()
            let arrRet = FackKnownType("OBJ", current, 0x1)
            if (index == 0) {
                runtimeTypeDes == "Type: MonoBehaviour" ? LOG(runtimeTypeDes + "(" + arrPtr + ")", LogColor.C91) : LOG(arrRet[1] + "(" + arrRet[2] + ")", LogColor.C91)
                LOG("---> Count:" + arrLenth, LogColor.C31)
                LOGW(getLine(40) + "\n")
            }
            let gObj = getGameObject(current)
            let gtrs = f_getTransform(getGameObject(current))
            let runtimeType = addRuntimeType(current)
            if (lastType == null) lastType = String(runtimeType)
            if (lastType != "" && lastType != String(runtimeType)) enableTypeShow = true
            let disPlayItemTitile = "[*] " + current + " ---> " + arrRet[0] + " { G:" + gObj + " | T:" + gtrs + " }  " + (enableTypeShow ? ("RuntimeType: " + runtimeType[0] + "(" + runtimeType[1] + ")") : "")
            LOGH(disPlayItemTitile)
            TaskDisplay(arrRet, current)
        }
        LOGW(getLine(60))
    }

    // 解析展示不同运行时类型 <--- 原 FackRuntimeType()
    function TaskDisplay(arrRet, mPtr) {
        switch (arrRet[1]) {
            case "UnityEngine.UI.Text":
                LOGD("\t[-] |" + FackKnownType("Text", mPtr, arrRet[2]) + "|")
                break
            case "UnityEngine.UI.Button":
                let ButtonClickedEvent = callFunction(["UnityEngine.UI", "Button", "get_onClick", 0], mPtr)
                let ret_mCalls = getFieldInfoFromCls(findClass("UnityEventBase"), "m_Calls", ButtonClickedEvent)
                LOGO("\t[-] Button: " + ret_mCalls[3] + "(" + ret_mCalls[2] + ") " + ret_mCalls[0] + " " + ret_mCalls[5])
                // 处理三个 list
                ansItems(ret_mCalls, "m_PersistentCalls")
                // ansItems(ret_mCalls, "m_RuntimeCalls")
                // ansItems(ret_mCalls, "m_ExecutingCalls")
                break
            case "UnityEngine.UI.InputField":
                // lffc(findClass("InputField"),instance)
                let arr_m_Text = getFieldInfoFromCls(findClass("InputField"), "m_Text", mPtr)
                let arr_m_ReadOnly = getFieldInfoFromCls(findClass("InputField"), "m_ReadOnly", mPtr)
                let arr_m_AllowInput = getFieldInfoFromCls(findClass("InputField"), "m_AllowInput", mPtr)
                let disPlayStr = "\t[-] Text: " + readU16(arr_m_Text[5]) + " | ReadOnly(" + arr_m_ReadOnly[1] + "):" + (ptr(arr_m_ReadOnly[4]).readU8() == 0 ? "false" : "true") +
                    " | AllowInput(" + arr_m_AllowInput[1] + "):" + (ptr(arr_m_AllowInput[4]).readU8() == 0 ? "false" : "true")
                LOGO(disPlayStr.replace(/^\s+|\s+$/g, ''))
                break
            case "TMPro.TextMeshProUGUI":
                // todo 这个还有点东西 先这么简单的写写
                let text = callFunctionRUS(["Unity.TextMeshPro", "TMP_Text", "get_text", 0], mPtr)
                let fontSize = callFunctionRF(["Unity.TextMeshPro", "TMP_Text", "get_fontSize", 0], mPtr).toFixed(2)
                let tmpText = ("\t[-] Text: |" + text + "|  fontSize:" + fontSize)
                let fontAsset = callFunction(["Unity.TextMeshPro", "TMP_Text", "get_font", 0], mPtr)
                tmpText += (fontAsset != 0 ? ("  TMP_FontAsset:" + fontAsset) : "")
                let spriteAsset = callFunction(["Unity.TextMeshPro", "TMP_Text", "get_spriteAsset", 0], mPtr)
                tmpText += (spriteAsset != 0 ? ("  TMP_SpriteAsset:" + spriteAsset) : "")
                let styleSheet = callFunction(["Unity.TextMeshPro", "TMP_Text", "get_styleSheet", 0], mPtr)
                tmpText += (styleSheet != 0 ? ("  TMP_StyleSheet:" + styleSheet) : "")
                saveCache("TextMeshProUGUI", text)
                LOGO(tmpText)
                break
            case "UnityEngine.UI.Image":
                LOGO(`\t[-] ${FackKnownType("Image", mPtr)}`)
                break
            case "I2.Loc.Localize":
                var str0 = readU16(ptr(getFieldInfoFromCls(findClass("Localize"), "LastLocalizedLanguage", mPtr)[4].readPointer())) + " | "
                var str1 = readU16(ptr(getFieldInfoFromCls(findClass("Localize"), "FinalSecondaryTerm", mPtr)[4]).readPointer())
                LOGO(`\t[-] Localize: " ${str0} ${str1}`)
                break
            case "UnityEngine.EventSystems.StandaloneInputModule":
                var str0 = "m_SubmitButton : " + readU16(ptr(getFieldInfoFromCls(findClass("StandaloneInputModule"), "m_SubmitButton", mPtr)[4].readPointer())) + " | "
                var str1 = "m_CancelButton : " + readU16(ptr(getFieldInfoFromCls(findClass("StandaloneInputModule"), "m_CancelButton", mPtr)[4]).readPointer()) + " | "
                var str2 = "m_InputActionsPerSecond : " + readSingle(getFieldInfoFromCls(findClass("StandaloneInputModule"), "m_InputActionsPerSecond", mPtr)[5]) + " | "
                var str3 = "m_RepeatDelay : " + readSingle(getFieldInfoFromCls(findClass("StandaloneInputModule"), "m_RepeatDelay", mPtr)[5])
                LOGO(`\t[-] Localize: ${str0} ${str1} ${str2} ${str3}`)
                break
            case "LocalizationTextMeshProUGUI":

                break
            case "UnityEngine.EventSystems.EventSystem":

                break
            case "UnityEngine.UI.GraphicRaycaster":

                break
            case "UnityEngine.Canvas":

                break
            case "UnityEngine.RectTransform":

                break
            default:
                // if (strType.startsWith("UnityEngine.") || strType.startsWith("TMPro.")) break
                // lffc(findClass(strType), mPtr)
                if (RepeatCount(arrRet[1])) LOG("\t[-] " + JSON.stringify(arrRet) + " ---> " + mPtr, LogColor.C90)
                break
        }
    }



    function RepeatCount(str) {
        for (var value of tmpArray)
            if (String(value) == str) return false
        tmpArray.push(String(str))
        return true
    }
}

var FindObjectsOfTypeAll = typePtr => FindObjectsOfType(typePtr, 2)

let saveCache = (key, value) => {
    // 不记录数字
    if (!isNaN(value)) return
    if (CommonCache.get(String(key)) == undefined) CommonCache.set(String(key), new Array())
    let insArray = CommonCache.get(String(key))
    if (String(value).length == 0) return
    if (insArray instanceof Array && JSON.stringify(insArray).indexOf(value) == -1)
        insArray.push(value)
}

var printSavedCache = key => {
    if (key == undefined) {
        new Promise((onFinish) => {
            let maxKeyLength = 0
            for (var item of CommonCache) maxKeyLength = maxKeyLength > item[0].length ? maxKeyLength : item[0].length
            onFinish(maxKeyLength)
        }).then((len) => {
            LOGE(`${getLine(50)}`)
            for (var item of CommonCache)
                LOGD(`[*] ${String(item[0]).padEnd(len, " ")}  --->  ${item[1]}`)
            LOGE(`${getLine(50)}`)
        })
    } else {
        if (CommonCache.get(String(key)) == undefined) return
        let insArray = CommonCache.get(String(key))
        if (insArray instanceof Array) insArray.forEach(item => LOGD(`[*] ${item}`))
    }
}

/**
 * 内部调用函数（展示解析的数据）  
 * @param {*} ret_mCalls 
 * @param {*} itemStr 
 */
let ansItems = (ret_mCalls, itemStr) => {
    //  ps:暂时只是适配了arm32
    if (Process.arch != "arm") return
    let ret_itemCalls = getFieldInfoFromCls(ret_mCalls[2], itemStr, ret_mCalls[5])
    let m_size = getFieldInfoFromCls(ret_itemCalls[2], "_size", ret_itemCalls[5])[5]
    if (m_size != 0) {
        let item = getFieldInfoFromCls(ret_itemCalls[2], "_items", ret_itemCalls[5])
        let arrAddr = []
        for (let i = 0; i < m_size; ++i) {
            // 本来是想解析动态解析类型的
            let tmpType = "UnityAction"
            // 这里就默认使用了0x8偏移位置的函数指针 从dump出来的情况看起来并不是每一个子类类型都有一个0x8，但实测0x8是可用的
            let tmpValue = FackKnownType(tmpType, ptr(item[5]).add(p_size * (4 + i)).readPointer().add(p_size * 2).readPointer())
            let functionName = mapNameToAddr(tmpValue)
            tmpValue += (functionName == "" || functionName == undefined ? "" : (" | " + functionName))
            arrAddr.push(tmpValue)
        }
        LOGD("\t" + itemStr.substring(2, 3) + "_calls ( INS :" + item[5] + ")  [TYPE : " + ret_itemCalls[3] + " ( " + ret_itemCalls[2] + " ) | LEN : " + m_size +
            "] \n\t\t" + JSON.stringify(arrAddr) + " <--- " + JSON.stringify(JSON.parse(FackKnownType(item[3], item[5], item[2])).slice(0, m_size)))
    }
}

/**
 * 获取 RuntimeType 
 * 可传递clsName 或者是 clsPtr
 * 不传递则默认为 list 当前已保存的 runtimeTypes
 */
function getRuntimeType(str) {
    // 列出 arr_runtimeType 中的所有 type
    if (arguments[0] == undefined) {
        LOG("\n" + getLine(60) + "\n", LogColor.YELLOW)
        let count = 0
        if (arr_runtimeType.length != 0) {
            for (let item of arr_runtimeType) {
                LOG(String("[" + count++ + "] ").padEnd(6, " ") + item[1] + " ---> " + item[0], LogColor.C36)
                let addr = find_method("mscorlib", "RuntimeType", "get_AssemblyQualifiedName", 0)
                addr = addr != 0 ? addr : find_method("mscorlib", "RuntimeType", "getFullName", 2)
                LOG("\tQualifiedName : " + callFunctionRUS(addr, item[1], 1, 1), LogColor.C33)
            }
        } else {
            LOG("RuntimeType Array is null ....", LogColor.RED)
        }
        LOG("\n" + getLine(60), LogColor.YELLOW)
    } else if (isNaN(arguments[0])) {
        // 传递一个 类名String
        return TaskGetType(String(arguments[0]))
    } else if (!isNaN(arguments[0])) {
        // 传递一个 类指针
        // todo 
        return ptr(0)
    } else {
        return ptr(0)
    }

    function TaskGetType(name) {
        if (name == undefined) return ptr(0)
        for (let item of arr_runtimeType)
            if (String(name) == String(item[0])) return item[1]
        return ptr(0)
        // new Promise((onFinish) => {
        //     LOG("Waitting Init ... ", LogColor.RED)
        //     LogFlag = false
        //     initRuntimeType(1)
        //     LogFlag = true
        //     onFinish()
        // }).then(() => {
        //     // 一处异步则需要处处异步 ...  这里异步的结果只是一个 log
        //     for (let item of arr_runtimeType)
        //         if (String(name) == String(item[0])) LOG(item[1])
        // })
    }
}

/**
 * 函数地址与函数名的映射关系
 */
var mapNameToAddr = addrOrName => {
    if (arrayAddr.length == 0 || addrOrName == undefined) return
    // true => String | false => Number
    if (isNaN(addrOrName)) {
        for (let index = 0; index < arrayAddr.length; index++) {
            LOG(String(arrayName[index]) + " \t " + String(addrOrName))
            if (String(addrOrName).indexOf(String(arrayName[index])) != -1) return arrayAddr[index]
        }
        return ptr(0)
    } else {
        for (let index = 0; index < arrayAddr.length; index++)
            if (Number(arrayAddr[index]) == Number(addrOrName)) return arrayName[index]
        return ""
    }
}

var B_Component = () => {

    HookAddComponent()

    function HookAddComponent() {
        A(find_method('UnityEngine.CoreModule', 'GameObject', 'AddComponent', 1), (args, ctx, pass) => {
            pass.set("arg0", ptr(args[0]))
            pass.set("arg1", ptr(args[1]))
        }, () => {
            newLine()
            LOG(" [*] AddComponent ---> G:" + pass.get("arg0") + " T:" + f_getTransform(ptr(pass.get("arg0"))) + "(" + getObjName(this.arg0) + ")" +
                "\t\t\t(" + pass.get("arg1") + ")" + FackKnownType('Type', pass.get("arg1")), LogColor.C36)
        })

        // Interceptor.attach(find_method('UnityEngine.CoreModule', 'GameObject', 'AddComponent', 1), {
        //     onEnter: function (args) {
        //         this.arg0 = args[0]
        //         this.arg1 = args[1]
        //     },
        //     onLeave: function (ret) {
        //         newLine()
        //         LOG(" [*] AddComponent ---> G:" + this.arg0 + " T:" + f_getTransform(ptr(this.arg0)) + "(" + getObjName(this.arg0) + ")" +
        //             "\t\t\t(" + this.arg1 + ")" + FackKnownType('Type', this.arg1), LogColor.C36)
        //     }
        // })
    }

    function HookGetComponent() {
        Interceptor.attach(find_method('UnityEngine.CoreModule', 'GameObject', 'GetComponent', 1), {
            onEnter: function (args) {
                this.arg0 = args[0]
                this.arg1 = args[1]
            },
            onLeave: function (ret) {
                newLine()
                LOG(" [*] AddComponent ---> G:" + this.arg0 + " T:" + getTransform(ptr(this.arg0)) + "(" + getObjName(this.arg0) + ")" +
                    "\t\t\t(" + this.arg1 + ")" + FackKnownType('Type', this.arg1), LogColor.C36)
            }
        })
    }

    // 间隔时间大于一秒,就用新的一行展示
    function newLine() {
        var current = 0
        Java.perform(() => current = Java.use('java.lang.System').currentTimeMillis())
        if (current - lastTime > 1000) {
            LOG("\n")
            lastTime = current
        }
    }
}

/**
 * 通过按键的点击事件确定点击事件对应的函数 （函数并不是一开始就绑定在按钮上的,需要时加载）
 */
var B_Button = () => {
    A(find_method("UnityEngine.UI", "Button", "OnPointerClick", 1), (args) => {
        let current = args[0]
        addRuntimeType(current)
        let ButtonClickedEvent = callFunction(["UnityEngine.UI", "Button", "get_onClick", 0], current)
        let ret_mCalls = getFieldInfoFromCls(findClass("UnityEventBase"), "m_Calls", ButtonClickedEvent)
        let gObj = getGameObject(current)
        let gtrs = f_getTransform(getGameObject(current))
        LOG("\n[*] " + current + " ---> " + getObjName(current) + " { G:" + gObj + " | T:" + gtrs + " }", LogColor.C96)
        LOG("    [-] " + ret_mCalls[3] + "(" + ret_mCalls[2] + ") " + ret_mCalls[0] + " " + ret_mCalls[5], LogColor.C33)
        // 立即去获取是拿不到函数地址的,这里做一点点小延时
        setTimeout(() => {
            ansItems(ret_mCalls, "m_PersistentCalls")
            ansItems(ret_mCalls, "m_RuntimeCalls")
            ansItems(ret_mCalls, "m_ExecutingCalls")
        }, 10);
    })
}

let addRuntimeType = (instance, arg1) => {
    if (instance == null || instance == 0 || instance == undefined) return null
    // initRuntimeType 的调用
    let tmpType = ptr(0)
    try {
        if (arg1 != undefined) {
            tmpType = [callFunctionRUS(["mscorlib", "Type", "ToString", 0], instance).split(": ")[1], instance]
        } else {
            tmpType = getType(instance, 2)
        }
        for (let item of arr_runtimeType)
            if (item[0] == tmpType[0]) return tmpType
        arr_runtimeType.push(tmpType)
    } catch (e) {
        return tmpType
    }
    return tmpType
}

/**
 * GetComponents(getGameObject(0x9aca17a0),getRuntimeTypeFromBss(38557020))
 * @param {*} GameObject 
 * @param {*} RuntimeType 
 * @param {*} TYPE 
 * @returns 
 */
let GetComponentsOld = (GameObject, RuntimeType, TYPE) => {
    TYPE = TYPE == undefined ? 0x1 : TYPE
    let ComponentsFucAddr = 0x0
    if (TYPE == 0x0) {
        let G_GetComponents = find_method("UnityEngine.CoreModule", "GameObject", "GetComponents", 1)
        ComponentsFucAddr = G_GetComponents == 0x0 ? find_method("UnityEngine.CoreModule", "Component", "GetComponents", 1) : G_GetComponents
    } else if (TYPE == 0x1) {
        let G_GetComponents = find_method("UnityEngine.CoreModule", "GameObject", "GetComponentsInParent", 1)
        ComponentsFucAddr = G_GetComponents == 0x0 ? find_method("UnityEngine.CoreModule", "Component", "GetComponentsInParent", 1) : G_GetComponents
    } else {
        let G_GetComponents = find_method("UnityEngine.CoreModule", "GameObject", "GetComponentsInChildren", 1)
        ComponentsFucAddr = G_GetComponents == 0x0 ? find_method("UnityEngine.CoreModule", "Component", "GetComponentsInChildren", 1) : G_GetComponents
    }

    let arrPtr = callFunction(ComponentsFucAddr, GameObject, RuntimeType)

    // 并不是所有游戏都有GetComponentsInParent
    if (ComponentsFucAddr == 0x0 || arrPtr == 0x0) {
        LOG("ComponentsFucAddr = " + ComponentsFucAddr + "  arrPtr = " + arrPtr)
        throw new Error("ComponentsFucAddr Not Found Or RetArr Error")
    }
    listObj(arrPtr)

    function listObj(arrPtr) {
        let typeStr = "OBJ"
        let arrLenth = ptr(arrPtr).add(p_size * 3).readInt()
        LOG("\n")
        let lastName = ""
        for (let i = 0; i < arrLenth; i++) {
            let current = ptr(arrPtr).add(p_size * (4 + i)).readPointer()
            let arrRet = FackKnownType(typeStr, current, 0x1)
            if (lastName == "" || lastName != arrRet[0]) {
                LOG((i == 0 ? "" : "\n") + "[*] " + arrRet[0], LogColor.C36)
                lastName = arrRet[0]
            }
            LOGD("\t" + current + " ---> " + arrRet[1] + "(" + arrRet[2] + ")")
        }
        LOG("\n")
    }
}

// UI.LocalizedTextMeshPro
var HookLocalized = () => {

    if (checkPointer(["Assembly-CSharp", "LocalizedTextMeshPro", "SetText", 0]) == 0) {
        LOGE("NOT FOUND : Assembly-CSharp.LocalizedTextMeshPro.SetText")
    } else {
        A(find_method("Assembly-CSharp", "LocalizedTextMeshPro", "SetText", 0), (args) => {
            let value = readU16(callFunction(find_method("Assembly-CSharp", "TextMeshProAttachment", "get_text", 0, true), args[0]))
            let key = readU16(ptr(args[0]).add(getFieldOffFromCls(findClass("LocalizedTextMeshPro"), "key")).readPointer())
            LOGD("[0] " + String(String(key).length < 20 ? String(key).padEnd(20, " ") : String(key)) + "\t--->\t\t" + value)
        })
    }

    if (checkPointer(["Assembly-CSharp", "LocalizedText", "SetText", 0]) == 0) {
        LOGE("NOT FOUND : Assembly-CSharp.LocalizedText.SetText")
    } else {
        A(find_method("Assembly-CSharp", "LocalizedText", "SetText", 0), (args) => {
            let value = readU16(callFunction(find_method("Assembly-CSharp", "TextAttachment", "get_text", 0, true), args[0]))
            let key = readU16(ptr(args[0]).add(getFieldOffFromCls(findClass("LocalizedText"), "key")).readPointer())
            LOGD("[1] " + String(String(key).length < 20 ? String(key).padEnd(20, " ") : String(key)) + "\t--->\t\t" + value)
        })
    }
}

var B_GameObject = type => {
    switch (type) {
        case 0:
            ctor_0()
            break
        case 1:
            ctor_1()
            break
        case 2:
            ctor_2()
            break
        case 3:
            sendMessage_1()
            break
        case 4:
            sendMessage_2()
            break
        case 5:
            sendMessage_3()
            break
        case 6:
            GetComponentFastPath_2()
            break
        default:
            ctor_0()
            ctor_1()
            ctor_2()
            sendMessage_1()
            sendMessage_2()
            sendMessage_3()
            GetComponentFastPath_2()
            break
    }

    function ctor_0() {
        try {
            b(find_method("UnityEngine.CoreModule", "GameObject", ".ctor", 0, false, 1))
            let a_ctor = find_method("UnityEngine.CoreModule", "GameObject", ".ctor", 0)
            LOG("Add breakpoint " + a_ctor + "(" + a_ctor.sub(soAddr) + ")" + " | public Void .ctor ()")
        } catch (e) {
            LOG("NOT FOUND : public Void .ctor ()", LogColor.RED)
        }
    }

    function ctor_1() {
        try {
            b(find_method("UnityEngine.CoreModule", "GameObject", ".ctor", 1, false, 1))
            let a_ctor = find_method("UnityEngine.CoreModule", "GameObject", ".ctor", 1)
            LOG("Add breakpoint " + a_ctor + "(" + a_ctor.sub(soAddr) + ")" + " | public Void .ctor (String name)")
        } catch (e) {
            LOG("NOT FOUND : public Void public Void .ctor (String name)", LogColor.RED)
        }
    }

    function ctor_2() {
        try {
            b(find_method("UnityEngine.CoreModule", "GameObject", ".ctor", 2, false, 1))
            let a_ctor = find_method("UnityEngine.CoreModule", "GameObject", ".ctor", 2)
            LOG("Add breakpoint " + a_ctor + "(" + a_ctor.sub(soAddr) + ")" + " | public Void .ctor (String name,Type[] components)")
        } catch (e) {
            LOG("NOT FOUND : public Void .ctor (String name,Type[] components)", LogColor.RED)
        }
    }

    function sendMessage_1() {
        try {
            b(find_method("UnityEngine.CoreModule", "GameObject", "SendMessage", 1, false, 1))
            let a_sendMessage = find_method("UnityEngine.CoreModule", "GameObject", "SendMessage", 1)
            LOG("Add breakpoint " + a_sendMessage + "(" + a_sendMessage.sub(soAddr) + ")" + " | public Void SendMessage (String methodName)")
        } catch (e) {
            LOG("NOT FOUND : public Void SendMessage (String methodName)", LogColor.RED)
        }
    }

    function sendMessage_2() {
        try {
            b(find_method("UnityEngine.CoreModule", "GameObject", "SendMessage", 2, false, 1))
            let a_sendMessage = find_method("UnityEngine.CoreModule", "GameObject", "SendMessage", 2)
            LOG("Add breakpoint " + a_sendMessage + "(" + a_sendMessage.sub(soAddr) + ")" + " | public Void SendMessage (String methodName,Object value)")
        } catch (e) {
            LOG("NOT FOUND : public Void SendMessage (String methodName,Object value)", LogColor.RED)
        }
    }

    function sendMessage_3() {
        try {
            b(find_method("UnityEngine.CoreModule", "GameObject", "SendMessage", 3, false, 1))
            let a_sendMessage = find_method("UnityEngine.CoreModule", "GameObject", "SendMessage", 3)
            LOG("Add breakpoint " + a_sendMessage + "(" + a_sendMessage.sub(soAddr) + ")" + " | public Void SendMessage (String methodName,Object value,SendMessageOptions options)")
        } catch (e) {
            LOG("NOT FOUND : public Void SendMessage (String methodName,Object value,SendMessageOptions options)", LogColor.RED)
        }
    }

    function GetComponentFastPath_2() {
        try {
            b(find_method("UnityEngine.CoreModule", "GameObject", "GetComponentFastPath", 2, false, 1))
            let a_component = find_method("UnityEngine.CoreModule", "GameObject", "GetComponentFastPath", 2)
            LOG("Add breakpoint " + a_component + "(" + a_component.sub(soAddr) + ")" + " | internal Void GetComponentFastPath (Type type,IntPtr oneFurtherThanResultValue)")
        } catch (e) {
            LOG("NOT FOUND : internal Void GetComponentFastPath (Type type,IntPtr oneFurtherThanResultValue)", LogColor.RED)
        }
    }
}

var B_InputField = () => {
    D()
    // UnityEngine.UI.InputField
    a(findClass("InputField"))
    B()
    // public Void ActivateInputField ()
    // n(find_method("UnityEngine.UI", "InputField", "ActivateInputField", 0))
}

// 汉化翻译 相关函数
var B_LocalizationManager = () => {
    A(find_method("Assembly-CSharp", "LocalizationManager", "GetLocalizedValue", 3), (args) => {
        LOGD("[*] Key: |" + readU16(args[0]) + "|")
    }, (ret) => {
        LOGD("\tTo : |" + readU16(ret) + "|")
    })
}

// public static Void TrackText (Text t)
// a(findClass("TextMesh"))
// 用作查找拼接后的字符串
// find_method("mscorlib","String","Format",3)
// a(findClass("String"))
// find_method("UnityEngine.UI","Text","get_text",0,false)
// FindObjectsOfType("TextMeshProUGUI")
// \n 0x0A | \r 0x0D | \t 0x09 | [空格] 0x20 | [换行] 0x0D 0x0A
var B_Text = () => {
    let mapRecord = new Map()
    let strMap = new Map()

    strMap.set("SETTINGS", "设置")
    strMap.set("ADDED", "已添加")
    strMap.set("ON", "开")
    strMap.set("Loading...", "加载中...")
    strMap.set("More games", "更多游戏")

    try {
        LOGD("Enable TMP_Text Hook".padEnd(30, " ") + "| class : " + findClass("TMP_Text"))
        TMP_Text(false)
    } catch {
        LOGE("Unity.TextMeshPro.TMP_Text.get_transform NOT FOUND !")
    }

    try {
        LOGD("Enable TextMeshPro Hook".padEnd(30, " ") + "| class : " + findClass("TextMeshPro"))
        TextMeshPro()
    } catch {
        LOGE("Unity.TextMeshPro.TextMeshPro.get_transform NOT FOUND !")
    }

    try {
        LOGD("Enable Text Hook".padEnd(30, " ") + "| class : " + findClass("Text"))
        UnityEngine_UI_Text(false)
    } catch {
        LOGE("UnityEngine.UI.Text.get_text/set_text NOT FOUND!")
    }

    try {
        LOGD("Enable TrackText Hook".padEnd(30, " ") + "| class : " + findClass("FontUpdateTracker"))
        HookTrackText()
    } catch {
        LOGE("UnityEngine.UI.FontUpdateTracker.TrackText NOT FOUND !")
    }

    try {
        LOGD("Enable Print Hook".padEnd(30, " ") + "| class : " + findClass("NGUIText"))
        HookPrint()
    } catch {
        LOGE("NGUIText.Print NOT FOUND !")
    }

    function TMP_Text(showGobj) {
        A(find_method("Unity.TextMeshPro", "TMP_Text", "get_transform", 0), (args, ctx) => {
            let aimStr = "|" + readU16(callFunction(["Unity.TextMeshPro", "TMP_Text", "get_text", 0], args[0])) + "|"
            if (filterDuplicateOBJ(String(args[0]), 30) == -1) return
            worksWithText(args[0], "TMP_Text")
            LOGD("\n[TMP_Text]  " + args[0] + "\t" + aimStr + "\t" + ctx.lr)
            if (strMap.size != 0) {
                let repStr = strMap.get(aimStr.substring(1, aimStr.length - 1))
                if (repStr != undefined) {
                    callFunction(["Unity.TextMeshPro", "TMP_Text", "set_text", 1], args[0], allocStr(repStr, ""))
                    LOGH(" \n\t {REP} " + aimStr + " ---> " + repStr)
                }
                if (showGobj != undefined && showGobj == true) {
                    showGameObject(getGameObject(args[0]))
                }
            }
        })
    }

    function TextMeshPro() {
        A(find_method("Unity.TextMeshPro", "TextMeshPro", "get_transform", 0), (args) => {
            let aimStr = "|" + readU16(callFunction(["Unity.TextMeshPro", "TextMeshPro", "get_text", 0], args[0])) + "|"
            if (filterDuplicateOBJ(String(args[0])) == -1) return
            worksWithText(args[0], "TextMeshPro")
            LOG("\n[TextMeshPro]  " + args[0] + "\t" + aimStr, LogColor.C35)
            if (strMap.size != 0) {
                let repStr = strMap.get(aimStr.substring(1, aimStr.length - 1))
                if (repStr != undefined) {
                    callFunction(find_method("Unity.TextMeshPro", "TextMeshPro", "set_text", 1), args[0], allocStr(repStr, ""))
                    LOG(" \n\t {REP} " + aimStr + " ---> " + repStr, LogColor.C96)
                }
            }
        })
    }

    function UnityEngine_UI_Text(showGameObj) {
        if (showGameObj == undefined) showGameObj = false;
        A(find_method("UnityEngine.UI", "Text", "get_text", 0), (args) => {
            worksWithText(args[0], "Text")
            if (showGameObj)
                showGameObject(callFunction(["UnityEngine.CoreModule", "Component", "get_gameObject", 0], args[0]))
        }, (ret, ctx) => {
            let aimStr = "|" + readU16(ret) + "|"
            if (filterDuplicateOBJ(String(ret)) == -1) return
            LOG("\n[Text_Get]  " + (p_size == 4 ? ctx.r0 : ctx.x0) + "\t" + aimStr, LogColor.C32)
            if (strMap.size != 0) {
                let repStr = strMap.get(aimStr.substring(1, aimStr.length - 1))
                if (repStr != undefined) {
                    ret.replace(allocUStr(repStr))
                    // callFunction(find_method("UnityEngine.UI", 'Text', 'set_text', 1), p_size == 4 ? ctx.r0 : ctx.x0, allocStr(repStr, ""))
                    LOGH(` \n\t {REP} ${aimStr} ---> ${repStr}`)
                }
            }
        })

        A(find_method("UnityEngine.UI", "Text", "set_text", 1), (args, ctx) => {
            if (filterDuplicateOBJ(String(args[1])) == -1) return
            worksWithText(args[0], "Text")
            let aimStr = "|" + readU16(args[1]) + "|"
            LOG("\n[Text_Set]  " + args[0] + "\t" + aimStr, LogColor.C33)
            if (strMap.size != 0) {
                let repStr = strMap.get(aimStr.substring(1, aimStr.length - 1))
                if (repStr != undefined) {
                    args[1] = allocUStr(repStr)
                    LOGH(` \n\t {REP} ${aimStr} ---> ${repStr}`)
                }
                if (showGameObj)
                    showGameObject(callFunction(["UnityEngine.CoreModule", "Component", "get_gameObject", 0], args[0]))
            }
        })
    }

    function HookTrackText() {
        A(find_method('UnityEngine.UI', 'FontUpdateTracker', 'TrackText', 1), (args) => {
            let aimStr = "|" + callFunctionRUS(["UnityEngine.UI", 'Text', 'get_text', 0], args[0]) + "|"
            if (filterDuplicateOBJ(String(callFunctionRUS(["UnityEngine.UI", 'Text', 'get_text', 0], args[0])) == -1)) return
            LOGD(`\n[FontUpdateTracker] ${args[0]} \t ${aimStr}`)
            worksWithText(args[0], "Text")
            if (strMap.size != 0) {
                let repStr = strMap.get(aimStr.substring(1, aimStr.length - 1))
                if (repStr != undefined) {
                    args[1] = allocUStr(repStr)
                    LOGH(` \n\t {REP} ${aimStr} ---> ${repStr}`)
                }
            }
        })
    }

    function HookPrint() {
        A(find_method('Assembly-CSharp', 'NGUIText', 'Print', 4), (args) => {
            let aimStr = "|" + readU16(args[0]) + "|"
            if (filterDuplicateOBJ(aimStr) == -1) return
            LOGD(`\n[NGUIText] ${args[0]} \t ${aimStr}`)
            worksWithText(args[0], "Text", true)
            if (strMap.size != 0) {
                let repStr = strMap.get(aimStr.substring(1, aimStr.length - 1))
                if (repStr != undefined) {
                    args[0] = allocUStr(repStr)
                    LOGH(` \n\t {REP} ${aimStr} ---> ${repStr}`)
                }
            }
        })
    }

    function TMP() {
        let get_Ins = find_method("Unity.TextMeshPro", "TMP_Settings", "get_instance", 0)
        if (get_Ins == 0x0) return
        let INS = 0x0
        A(get_Ins, () => {}, (ret) => {
            INS = ret
            d(get_Ins)
            LOGD(`[*] TMPro.TMP_Settings ---> ${ret}`)
            let TMP_FontAsset = callFunction(find_method("Unity.TextMeshPro", "TMP_Settings", "get_defaultFontAsset", 0), INS)
            lffc(findClass("TMP_FontAsset"), TMP_FontAsset)
            let faceInfo = callFunction(find_method("Unity.TextMeshPro", "TMP_FontAsset", "get_fontInfo", 0), TMP_FontAsset)
            lffc(findClass("FaceInfo_Legacy"), faceInfo)
        })
    }

    function worksWithText(textPtr, typeStr, printHex = false) {
        if (mapRecord.get(typeStr) == null) {
            mapRecord.set(typeStr, 1)
            LogFlag = false
            getType(textPtr)
            LogFlag = true
        }
        if (printHex) {
            try {
                let startPtr = ptr(textPtr).add(p_size * 2)
                let endPtr = Memory.scanSync(startPtr, (startPtr.readInt() * 0.5 + 3) * p_size, "00 00 00 00")[0]["address"]
                LOGO("\t" + hexdump(ptr(startPtr).add(p_size), {
                    length: endPtr - startPtr - p_size,
                    header: false
                }).replaceAll("\n", "\n\t"))
            } catch (e) {}
        }
    }

    var TMP_Template = () => {

        try {
            LOGH(`${getLine(80)} \n[*] Hook Resources.Load\n${getLine(30)}`)
            let Template_Resources_Load =
                'R(' + find_method("UnityEngine.CoreModule", "Resources", "Load", 2, false, 2) + ', (srcFunc, arg0, arg1, arg2, arg3) => {\n' +
                '    var ret = srcFunc(arg0, arg1, arg2, arg3)\n' +
                '    var p_type = callFunction(' + find_method("mscorlib", "Object", "GetType", 0, false, 2) + ', ret)\n' +
                '    var p_name = callFunction(' + find_method("mscorlib", "Type", "ToString", 0, false, 2) + ', p_type)\n' +
                '    LOG(ret + "\t" + readU16(arg0) + "\\t" + readU16(p_name))\n' +
                '    return ret\n' +
                '})\n'
            LOGD(Template_Resources_Load)
        } catch {
            LOGE("NOT FOUND ---> public static Object[] LoadAll(string path, Type systemTypeInstance)\n")
        }

        try {
            if (find_method("UnityEngine.AssetBundleModule", "AssetBundle", "LoadFromFileAsync", 2, false, 2) == 0) throw new Error()
            LOG(getLine(80) + "\n[*] Hook AssetBundle\n" + getLine(30), LogColor.C96)
            let Template_LoadFromFileAsync =
                '\nR(' + find_method("UnityEngine.AssetBundleModule", "AssetBundle", "LoadFromFileAsync", 2, false, 2) + ', (srcFunc, arg0, arg1, arg2, arg3) => {\n' +
                '    LOG("[*] LoadFromFileAsync(\'" + readU16(arg0) + "\' , " + arg1 + ")")\n' +
                '    return srcFunc(arg0, arg1, arg2, arg3)\n' +
                '})\n'
            LOGD(Template_LoadFromFileAsync)
        } catch {
            LOGE("NOT FOUND ---> public static AssetBundleCreateRequest LoadFromFileAsync(string path, uint crc)\n")
        }

        try {

            LOGH(`${getLine(80)} \n[*] Hook LanguageSourceData\n${getLine(30)}`)
            let Template_GetTermData =
                'R(0x557578, (srcFunc, arg0, arg1, arg2, arg3) => {\n' +
                '    var ret = srcFunc(arg0, arg1, arg2, arg3)\n' +
                '    LOG(ret + " = GetTermData(string " + readU16(arg1) + " , bool allowCategoryMistmatch = " + (arg2 == 0x0 ? false : true) + ") ")\n' +
                '    if (ret == 0x0) return ret\n' +
                '    var strArr = ptr(ret).add(' + getFieldOffFromCls(findClass("TermData"), "Languages") + ').readPointer()\n' +
                '    var size = ptr(strArr).add(' + p_size + ' * 3).readUInt()\n' +
                '    console.error("\tSize  -> " + size)\n' +
                '    var tmpArr = []\n' +
                '    for (let i = 1; i <= size; i++) tmpArr.push(readU16(ptr(strArr).add(' + p_size + ' * (3 + i)).readPointer()))\n' +
                '    console.error("\tDate  -> " + JSON.stringify(tmpArr))\n' +
                '    return ret\n' +
                '})\n'
            LOGD(Template_GetTermData)
        } catch {
            LOGE(`NOT FOUND ---> public TermData GetTermData(string term, bool allowCategoryMistmatch = false)\n`)
        }
    }
}

/**
 * 内购相关
 * @param {*} mPtr ProductCollection 实例
 */
var ProductCollectionList = mPtr => {
    let retPtr = callFunction(find_method("UnityEngine.Purchasing", "ProductCollection", "get_all", 0, false, 2), mPtr)
    let arrLength = ptr(retPtr).add(p_size * 3).readUInt()
    LOGD(`\n[*] Product length : ${arrLength}  |  RET => ${retPtr}\n`)
    seeHexA(ptr(retPtr).add(p_size * 4), (arrLength > 32 ? 32 : arrLength) * p_size, false, LogColor.C33)
    LOG("\n")
    for (let i = 0; i < arrLength; ++i) {
        let tmpPtr = ptr(retPtr).add(p_size * (4 + i))
        let definitionk = getFieldInfoFromCls(findClass("Product"), "<definition>k__BackingField", tmpPtr.readPointer())
        let productName = readU16(getFieldInfoFromCls(definitionk[2], "<id>k__BackingField", definitionk[5])[5])
        LOGD(`[${i}] ${tmpPtr} ---> ${tmpPtr.readPointer()}  |  ${productName}`)
    }
    LOG("\n")
}

var getTextFromAsset = (type, mPtr) => {
    // mPtr (type:LanguageSourceAsset)
    if (mPtr == undefined || mPtr == 0 || type == undefined) return
    mPtr = ptr(mPtr)

    switch (type) {
        // 针对于使用到 unity I2.Localization 的情况（mPtr 来自于 resource load ---> TMP_Template）
        // b(find_method("I2.Localization","GoogleLanguages","LanguageMatchesFilter",2,false,1))
        // b(find_method("I2.Localization","GoogleLanguages","GetLanguageName",3,false,1))
        case "LanguageSourceAsset":
            do_LanguageSourceAsset()
            break
        case "VocabulariesAsset":
            do_VocabulariesAsset()
            break
        default:
            break
    }

    function do_LanguageSourceAsset() {
        let LanguageSourceData = callFunction(find_method("I2.Localization", "LanguageSourceAsset", "get_SourceData", 0), mPtr)
        // lffc(findClass("LanguageSourceData"), LanguageSourceData)
        let clsLSD = findClass("LanguageSourceData")
        let Type_list = getFieldInfoFromCls(clsLSD, "mTerms", LanguageSourceData)[2]
        let value_Terms = getFieldInfoFromCls(clsLSD, "mTerms", LanguageSourceData)[5]
        // public Int32 get_Count ()
        let addr_get_Count = getFunctionAddrFromCls(Type_list, "get_Count")
        // public TermData get_Item (Int32 index)
        let addr_get_Item = getFunctionAddrFromCls(Type_list, "get_Item")
        let count = callFunctionRI(addr_get_Count, value_Terms)

        LOGE("\nFound " + count + " Items\n")
        let strArrCls = undefined
        let strArrStr = undefined
        let arrAddr_getItem = undefined
        let resultStr = []
        for (let index = 0; index < count; index++) {
            let termData = callFunction(addr_get_Item, value_Terms, index)
            if (strArrCls == undefined) {
                let tmp = getFieldInfoFromCls(findClass("TermData"), "Languages")
                strArrCls = tmp[2]
                strArrStr = tmp[3]
                arrAddr_getItem = getFunctionAddrFromCls(strArrCls, "get_Item")
            }
            // lffc(findClass("TermData"), termData)
            let currentStr = readU16(getFieldInfoFromCls(findClass("TermData"), "Term", termData)[5])
            let currentLanguages = getFieldInfoFromCls(findClass("TermData"), "Languages", termData)[5]
            let LanguagesArr = FackKnownType(strArrStr, currentLanguages, strArrCls)
            LOG(getLine(30))
            LOGD(currentStr + "\n" + LanguagesArr)
            let indexValue = callFunctionRUS(arrAddr_getItem, currentLanguages, 0)
            resultStr.push(indexValue)
        }
        LOG("\n" + JSON.stringify(resultStr) + "\n", LogColor.C92)
    }

    function do_VocabulariesAsset() {
        let debug = false
        let clsVoc = getFieldInfoFromCls(findClass("VocabulariesAsset"), "_vocabularyEntries", mPtr)
        let items = getFieldInfoFromCls(clsVoc[2], "_items", clsVoc[5])
        LOGW("\n" + getLine(60))
        if (debug) LOG("items --->" + JSON.stringify(items))
        let size = ptr(getFieldInfoFromCls(clsVoc[2], "_size", clsVoc[5])[5]).toInt32()
        if (debug) LOG("size ---> " + size)
        let clsEntryStrOff = ptr(getFieldInfoFromCls(findClass("VocabularyEntry"), "Language")[1]).toInt32()
        if (debug) LOG("LanguageOffset --->" + clsEntryStrOff)
        if (debug) LOGW(getLine(30))
        for (let index = 0; index < size; index++) {
            let tempPtr1 = ptr(items[5].add(p_size * 4).add(index * 0x18))
            let tempPtr2 = tempPtr1.add(clsEntryStrOff)
            let itemStr = readU16(tempPtr2.readPointer())
            LOG((debug ? index + "\t--->\t" : "") + itemStr, LogColor.C36)
        }
        LOGW(getLine(60))
    }
}

let interceptorStalker = (mPtr, range) => {
    if (mPtr == undefined || mPtr == 0x0) return
    mPtr = soAddr.add(mPtr)
    const threadID = Process.enumerateThreads[0]
    const moduleG = Process.findModuleByAddress(mPtr)
    // LOG(JSON.stringify(moduleG), LogColor.C33)
    A(mPtr, (args) => {
        LOGW("\n" + getLine(60))
        LOGE(`Enter ---> arg0:${args[0]}  arg1:${args[1]}  arg2:${args[2]}  arg3:${args[3]}`)
        stalkerEnter(threadID)
    }, (ret) => {
        LOGE(`Exit ---> ${ret}`)
        stalkerExit(threadID)
        LOGW(getLine(60))
    })

    function stalkerEnter(tid) {
        let moduleMap = new ModuleMap((module) => {
            if (module.base.equals(moduleG.base)) return true
            Stalker.exclude(module)
            return false
        })

        Stalker.follow(tid, {
            transform: (iterator) => {
                let instruction = iterator.next()
                let isModuleCode = moduleMap.has(instruction.address)
                let subAddress = ptr(instruction.address).sub(soAddr)
                if (range != undefined) {
                    if (Number(subAddress) > Number(range[0]) && Number(subAddress) < Number(range[1])) {
                        LOGD(`[*] ${instruction.address} ( ${subAddress} ) ---> ${instruction.mnemonic} ${instruction.opStr}`)
                    }
                } else if (isModuleCode) {
                    LOGD(`[*] ${instruction.address} ( ${subAddress} ) ---> ${instruction.mnemonic} ${instruction.opStr}`)
                }
                do {
                    // if (isModuleCode) {
                    //     LOG(JSON.stringify(instruction), LogColor.C36)
                    // }
                    iterator.keep()
                } while (iterator.next() !== null)
            }
        })
    }

    function stalkerExit(tid) {
        Stalker.unfollow(tid)
        Stalker.garbageCollect()
    }
}

Object.prototype.toInt32Big = (mPtr) => {
    var resultStr = ''
    if (mPtr == undefined) mPtr = ptr(this)
    var aimStr = String(mPtr).split("0x")[1]
    for (let i = aimStr.length - 1; i >= 0; i--)
        resultStr += aimStr.charAt(i)
    return ptr("0x" + resultStr)
}

// 其他
var hookT = () => {
    // hook concat  
    find_method("mscorlib", "String", "Concat", 2)
    // hook AndroidJavaObject (主要是 string 构造  配合 lr 查看位置)
    a(findClass("UnityEngine.AndroidJNIModule", "AndroidJavaObject"))
}

function createArray(length, ...items) {
    if (length == 0 || items.length == 0) return
    // public static Array CreateInstance(Type elementType, int length)
    // 已知bug 这里需要的是第二个参数为 int 的重载，但是 find_method 总会找到最后一个重载
    let ret = callFunction(find_method("mscorlib", "Array", "CreateInstance", 2), getType(items[0], 2)[1], length)
    for (let index = 0; index < items.length; ++index) {
        ret.add(p_size * (4 + index)).writePointer(items[index])
    }
    return ret
}

// todo
// particleSystem 相关...
// anamation 相关...
// image 相关 (加载图片的资源)
// 动态插入提示 gobj addcomponent<type>...
