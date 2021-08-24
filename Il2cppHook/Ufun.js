/**
 * @Author      lzy <axhlzy@live.cn>
 * @HomePage    https://github.com/axhlzy
 * @CreatedTime 2021/01/16 09:23
 * @UpdateTime  2021/08/24 18:27
 * @Des         frida hook u3d functions script
 */

const soName = "libil2cpp.so"
const p_size = Process.pointerSize
var soAddr = 0
var frida_env = ptr(0)

// 声明一些需要用到的导出函数
var il2cpp_get_corlib, il2cpp_domain_get, il2cpp_domain_get_assemblies, il2cpp_assembly_get_image,
    il2cpp_image_get_class_count, il2cpp_image_get_class,
    il2cpp_class_get_methods, il2cpp_class_from_type, il2cpp_class_get_type, il2cpp_class_from_system_type, il2cpp_class_from_name, il2cpp_class_get_method_from_name,
    il2cpp_string_new, il2cpp_type_get_name, il2cpp_type_get_class_or_element_class,
    il2cpp_class_num_fields, il2cpp_class_get_fields

// 统一使用 f_xxx 声明函数,使用 p_xxx 声明函数地址
var f_getName, f_getLayer, f_getTransform, f_getParent, f_getChildCount, f_getChild, f_get_pointerEnter, f_pthread_create, f_getpid, f_gettid, f_sleep
var p_getName, p_getLayer, p_getTransform, p_getParent, p_getChildCount, p_getChild, p_get_pointerEnter, p_pthread_create, p_getpid, p_gettid, p_sleep

// libart.so中的函数初始化
var DecodeJObject, GetDescriptor, ArtCurrent

// 格式化展示使用到
var lastTime = 0
// 不要LOG的时候值为false，需要时候true
var LogFlag = true
// 用于map中的key
var date = new Date()
// count_method_times 数组用于记录 breakPoints 中方法出现的次数,index是基于临时变量 t_arrayAddr，而不是 arrayAddr
var count_method_times
// 断点的函数出现次数大于 maxCallTime 即不显示
var maxCallTime = 10
// 存放初始化（list_Images）时候的 imgaddr 以及 imgName
var arr_img_addr        = new Array()
var arr_img_names       = new Array()
// 存放MethodInfo指针（供动态断点 a() 提供更详细的信息）
var arrMethodInfo       = new Array()
// filterDuplicateOBJ 
var outFilterMap        = new Map()
// findClassCache 第二次使用findClass的缓存
var findClassCache      = new Array()
// 用来记录已经被 replace 的函数地址
var arr_nop_addr        = new Array()
// 用来记录已经被 Attach  的函数Listener
var map_attach_listener = new Map()
// 只存在于B时候的临时变量，用来记录需要断点的方法地址并方便 b 移除，避免重复显示
var t_arrayAddr

// 过滤 只显示指定ClassName下的Methods filterClass.push("clsName") //即可开启过滤clsName
// clsName 如果显示不全可以使用 getClassName(ptr) 得到全名，不用过滤的时候置空这个array即可
var filterClass = []

// 兼容之前的python脚本筛选，同时也是 addBreakPoints() 或者是 a() 所添加的断点的函数也是存放在这里的
var arrayAddr =
[]

var arrayName =
[]

/**
 * --------------------------------------------------------------------------------------------
 * 快捷方法
 * ---------------------
 * i()      list_Images()
 * c()      list_Classes(image,isShowClass) // 遍历调用
 * C()      list_Classes(imgOrPtr)          // 反射调用
 * m()      list_Methods(klass,isShowMore)
 * f()      listFieldsFromCls(klass)
 * F()      find_method(ImageName,ClassName,functionName,ArgsCount,isRealAddr)
 * n()      nopfunction(ptr)
 * nn()     cancel nopfunction(ptr)
 * nnn()    cancel all nop/replace function
 * d()      Interceptor.detachAll()
 * a()      addBreakPoints(imgOrCls)
 * b()      breakPoint(ptr)
 * P()      printCtx(pointer,range)
 * B()      breakPoints(filter)
 * r()      reflash()
 * D()      detachAll and reset arrays
 * p()      print_list_result(filter)
 * --------------------------------------------------------------------------------------------
 * 拓展方法
 * ---------------------
 * HookSetActive()
 * HookOnPointerClick()
 * HookPlayerPrefs()
 * HookDebugLog()
 * HookLoadScene()
 * HookGetSetText()
 * PrintHierarchy()
 * ......  
 * --------------------------------------------------------------------------------------------
 * 其他方法
 * ---------------------
 * getUnityInfo()
 * getApkInfo()
 * GotoScene(str)
 * CallStatic(mPtr,arg0,arg1,arg2,arg3)
 * SeeTypeToString(obj)
 * FuckKnownType(strType,mPtr)
 * Toast(msg)
 * getLibPath()
 * 
 * --- 用作动态Hook去掉指定gameObj
 * setClick()
 * HideClickedObj()
 * HookMotionEvent()
 * 
 * --- 查看一些对象
 * showEventData(eventData)
 * showTransform(transform)
 * showEventData(eventData)
 * 
 * --- 修改属性
 * destroyObj(gameObj)
 * setActive(gameObj,visible)
 * SetPosition(mTransform,x,y,z)
 * SetLocalScale(mTransform,x,y,z)
 * SetLocalPosition(mTransform,x,y,z)
 * SetLocalRotation(mTransform,x,y,z,w)
 * ----------------------------------------------------------------------
 * SharedPrefs                                                          |
 * ---------------------------------------------------------------------|
 * SetInt(key,value)    | SetFloat(key,value)   | SetString(key,value)  |
 * GetInt(key)          | GetFloat(key)         | GetString(key)        |
 * ----------------------------------------------------------------------
 * PS:  分清楚何时传的MethodInfo,Transform,GameObject指针 ... 调用函数的时候不要瞎传参数
 *      如果使用了gadgat,使用-FU跑一个空脚本先把程序跑起来在进行注入，整个脚本对spawn方式启动的兼容性都不是很好
 * --------------------------------------------------------------------------------------------
 */
setImmediate(main)
function main() {
    
    wait_HookDlopen()
    // Wait_Interval()
    // Wait_NewTread()

    // 有些机型对dlopen的hook可能导致游戏崩溃
    function wait_HookDlopen() {
        soAddr = Module.findBaseAddress(soName)
        if (soAddr != null) return initImages()

        const dlopen_old = Module.findExportByName(null, "dlopen")
        const dlopen_new = Module.findExportByName(null, "android_dlopen_ext")
        // dlopen_new = null
        if (dlopen_old != null) {
            Interceptor.attach(dlopen_old, {
                onEnter: function (args) {
                    var l_soName = args[0].readCString()
                    if (l_soName.indexOf(soName) != -1) {
                        this.hook = true
                    }
                },
                onLeave: function (retval) {
                    if (this.hook) {
                        todo()
                    }
                }
            })
        }

        if (dlopen_new != null) {
            Interceptor.attach(dlopen_new, {
                onEnter: function (args) {
                    var l_soName = args[0].readCString()
                    if (l_soName.indexOf(soName) != -1) {
                        this.hook = true
                    }
                },
                onLeave: function (retval) {
                    if (this.hook) {
                        todo()
                    }
                }
            })
        }
    }

    // setInterval 这个函数巨坑！！！不建议使用
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

    // 真实的 init 位置
    function initImages(){
    
        LogFlag = false 
        initExportFunctions()
        list_Images()
        initU3DFunctions()
        initLibCFunctions()
        initLibArtFunctions()
        initEnv()
        LogFlag = true
        
        function initExportFunctions(){
            // const Il2CppImage* il2cpp_get_corlib()
            il2cpp_get_corlib                       = new NativeFunction(Module.findExportByName(soName,"il2cpp_get_corlib"),'pointer',[])
            // Il2CppDomain* il2cpp_domain_get()
            il2cpp_domain_get                       = new NativeFunction(Module.findExportByName(soName,"il2cpp_domain_get"),'pointer',[])
            // const Il2CppAssembly** il2cpp_domain_get_assemblies(const Il2CppDomain* domain, size_t* size)
            il2cpp_domain_get_assemblies            = new NativeFunction(Module.findExportByName(soName,"il2cpp_domain_get_assemblies"),'pointer',['pointer','pointer'])
            // const Il2CppImage* il2cpp_assembly_get_image(const Il2CppAssembly *assembly)
            il2cpp_assembly_get_image               = new NativeFunction(Module.findExportByName(soName,"il2cpp_assembly_get_image"),'pointer',['pointer'])

            // size_t il2cpp_image_get_class_count(const Il2CppImage * image)
            il2cpp_image_get_class_count            = new NativeFunction(Module.findExportByName(soName,"il2cpp_image_get_class_count"),'pointer',['pointer'])
            // const Il2CppClass* il2cpp_image_get_class(const Il2CppImage * image, size_t index)
            il2cpp_image_get_class                  = new NativeFunction(Module.findExportByName(soName,"il2cpp_image_get_class"),'pointer',['pointer','int'])

            // const MethodInfo* il2cpp_class_get_methods(Il2CppClass *klass, void* *iter)
            il2cpp_class_get_methods                = new NativeFunction(Module.findExportByName(soName,"il2cpp_class_get_methods"),'pointer',["pointer","pointer"])
            // Il2CppClass* il2cpp_class_from_type(const Il2CppType *type)
            il2cpp_class_from_type                  = new NativeFunction(Module.findExportByName(soName,"il2cpp_class_from_type"),'pointer',["pointer"])
            // const Il2CppType* il2cpp_class_get_type(Il2CppClass *klass)
            il2cpp_class_get_type                   = new NativeFunction(Module.findExportByName(soName,"il2cpp_class_get_type"),'pointer',["pointer"])
            // Il2CppClass* il2cpp_class_from_system_type(Il2CppReflectionType *type)
            il2cpp_class_from_system_type           = new NativeFunction(Module.findExportByName(soName,"il2cpp_class_from_system_type"),'pointer',["pointer"])
            // Il2CppClass* il2cpp_class_from_name(const Il2CppImage* image, const char* namespaze, const char *name)
            il2cpp_class_from_name                  = new NativeFunction(Module.findExportByName(soName,"il2cpp_class_from_name"),'pointer',["pointer","pointer","pointer"])
            // const MethodInfo* il2cpp_class_get_method_from_name(Il2CppClass *klass, const char* name, int argsCount)
            il2cpp_class_get_method_from_name       = new NativeFunction(Module.findExportByName(soName,"il2cpp_class_get_method_from_name"),'pointer',["pointer","pointer","int"])

            // Il2CppString* il2cpp_string_new(const char* str)
            il2cpp_string_new                       = new NativeFunction(Module.findExportByName(soName,"il2cpp_string_new"),'pointer',["pointer"])
            // char* il2cpp_type_get_name(const Il2CppType *type)
            il2cpp_type_get_name                    = new NativeFunction(Module.findExportByName(soName,"il2cpp_type_get_name"),'pointer',["pointer"])
            // Il2CppClass* il2cpp_type_get_class_or_element_class(const Il2CppType *type)
            il2cpp_type_get_class_or_element_class  = new NativeFunction(Module.findExportByName(soName,"il2cpp_type_get_class_or_element_class"),'pointer',["pointer"])
        
            // size_t il2cpp_class_num_fields(const Il2CppClass* klass)
            il2cpp_class_num_fields                 = new NativeFunction(Module.findExportByName(soName,"il2cpp_class_num_fields"),'int',["pointer"])
            // FieldInfo* il2cpp_class_get_fields(Il2CppClass *klass, void* *iter)
            il2cpp_class_get_fields                 = new NativeFunction(Module.findExportByName(soName,"il2cpp_class_get_fields"),'pointer',["pointer","pointer"])
        }
        
        function initU3DFunctions(){
            f_getName           = new NativeFunction(p_getName          = find_method("UnityEngine.CoreModule","Object","GetName",1),'pointer',['pointer'])
            f_getLayer          = new NativeFunction(p_getLayer         = find_method("UnityEngine.CoreModule","GameObject","get_layer",0),'int',['pointer'])
            f_getTransform      = new NativeFunction(p_getTransform     = find_method("UnityEngine.CoreModule","GameObject","get_transform",0),'pointer',['pointer'])
            f_getParent         = new NativeFunction(p_getParent        = find_method("UnityEngine.CoreModule","Transform","GetParent",0),'pointer',['pointer'])
            f_getChildCount     = new NativeFunction(p_getChildCount    = find_method("UnityEngine.CoreModule","Transform","get_childCount",0),'int',['pointer'])
            f_getChild          = new NativeFunction(p_getChild         = find_method("UnityEngine.CoreModule","Transform","GetChild",1),'pointer',['pointer','int'])
            f_get_pointerEnter  = new NativeFunction(p_get_pointerEnter = find_method("UnityEngine.UI","PointerEventData","get_pointerEnter",0),'pointer',['pointer'])
            // var f_getTag         = new NativeFunction(find_method("UnityEngine.CoreModule","GameObject","get_tag",0,true),'pointer',['pointer'])
        }

        function initLibCFunctions() {
            f_pthread_create = new NativeFunction(p_pthread_create = Module.findExportByName(null, "pthread_create"),'pointer',['pointer','pointer','pointer','pointer'])
            f_gettid = new NativeFunction(p_gettid = Module.findExportByName(null, "gettid"),'int',[])
            f_getpid = new NativeFunction(p_getpid = Module.findExportByName(null, "getpid"),'int',[])
            f_sleep  = new NativeFunction(p_sleep  = Module.findExportByName(null, "sleep"),'int',['int'])
        }

        function initLibArtFunctions() {
            DecodeJObject = Module.findExportByName("libart.so", "_ZNK3art6Thread13DecodeJObjectEP8_jobject")
            GetDescriptor = Module.findExportByName("libart.so", "_ZN3art6mirror5Class13GetDescriptorEPNSt3__112basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEE")

            // 实际就是获得 Thread::Current()
            // 目前仅用作 jclss 的名称获取
            A(DecodeJObject, (args) => {
                ArtCurrent = args[0]
            })
            
            // 五秒检测一次 ArtCurrent 是否拿到，拿到了就取消Attach
            var taskID = setInterval(() => {
                if (ArtCurrent != undefined) {
                    d(DecodeJObject)
                    clearInterval(taskID)
                }
            }, 5 * 1000)

        }

        function initEnv() {
            Java.perform(() => {
                frida_env = Java.vm.tryGetEnv()
            })
        }
    }
}

function i(filter) {
    list_Images(filter)
}

function c(image, isShowClass) {
    list_Classes(image, isShowClass)
}

function m(klass) {
    list_Methods(klass,1)
}

function f(klass) {
    listFieldsFromCls(klass)
}

/**
 * 参数可以传递 绝对地址/相对地址/methodinfo指针（解析参数）
 * @param {Number} mPtr 
 */
function b(mPtr) {    
    breakPoint(mPtr)
}

/**
 * 查找 Method 地址 == find_method()
 * @param {String} ImageName 
 * @param {String} ClassName 
 * @param {String} functionName 
 * @param {Number} ArgsCount 
 */
function F(ImageName, ClassName, functionName, ArgsCount) {    
    find_method(ImageName, ClassName, functionName, ArgsCount, false)
}

/**
 * 用来查看地址 确定不是单独的一条B，以便于InlineHook的后续处理
 * @param {Number} mPtr 绝对地址相对地址都可以
 * @param {Number} 打印指令条数
 */
function P(mPtr, range) {    
    printCtx(checkPointer(mPtr), (range == undefined ? 20 : range), 2)
}

// 默认就用Assembly-CSharp 和 MaxSdk.Scripts
function a(imgOrCls) {    
    if (imgOrCls == undefined) {
        for (var i = 0; i < arr_img_names.length; i++){            
            //这两个都是 非常 常用的程序集
            if (arr_img_names[i] == "Assembly-CSharp" || arr_img_names[i] == "MaxSdk.Scripts") {                
                imgOrCls = arr_img_addr[i]
            }
        }
    } else if (imgOrCls == "ALL") {        
        for (var i = 0; i < arr_img_names.length; i++){
            addBreakPoints(arr_img_addr[i])            
        }
        return 
    }
    addBreakPoints(imgOrCls)
}

function B(filter, isAnalyticParameter) {    
    if (arrayAddr.length == 0) a()    
    // 默认不要详细参数，都显示可能导致卡顿而且太乱了，建议再需要的时候新开cmd再使用b去指定某个method
    breakPoints(filter, isAnalyticParameter == undefined ? false : isAnalyticParameter)    
}

// 遍历所有的img，添加所有方法，也是一个不太建议的使用方式，需要全部遍历的情况建议使用dps.py配合bpoints.js来使用
function BA(filter, isAnalyticParameter) {    
    D()
    a("ALL")    
    breakPoints(filter, isAnalyticParameter == undefined ? false : isAnalyticParameter)    
}

/**
 * 使用反射来查找class（暂时没怎么用到，在低版本的unity中可能就需要用这种方式来获取image了，后续再改吧。。。）
 */
function C(ImgOrPtr) {
    var corlib = il2cpp_get_corlib()
    var assemblyClass = il2cpp_class_from_name(corlib, allcStr("System.Reflection"), allcStr("Assembly"))
    var assemblyLoad  = il2cpp_class_get_method_from_name(assemblyClass,allcStr("Load"), 1)
    var assemblyGetTypes = il2cpp_class_get_method_from_name(assemblyClass, allcStr("GetTypes"), 0)

    // public static Assembly Load(string assemblyString)
    var func_load = new NativeFunction(assemblyLoad.readPointer(), 'pointer', ['pointer', 'pointer'])    
    // var func_load = new NativeFunction(assemblyLoad.readPointer(),'pointer',['pointer','pointer','pointer'])
    
    // public virtual Type[] GetTypes();
    var func_getTypes = new NativeFunction(assemblyGetTypes.readPointer(), 'pointer', ['pointer', 'pointer'])    

    LOG(getLine(85), LogColor.C33)    
    arr_img_names
        .filter(function (name, index) {        
        if (ImgOrPtr != undefined && Number(arr_img_addr[index]) == Number(ImgOrPtr)) return name        
        if (ImgOrPtr != undefined && name.indexOf(ImgOrPtr) != -1) return name            
        // return name
    }).forEach(function (name) {        
        var logstr = "------------ " + name + " ------------"        
        var logstrSub = ""        
        LOG(logstr, LogColor.C33)        
        for (var i = 0; i < logstr.length; i++) { logstrSub += "-" }        
        LOG(logstrSub, LogColor.C33)        
        var reflectionAssembly = func_load(allcStr(name, ""), ptr(0x0))        
        // var reflectionAssembly = func_load(ptr(0x0)，allcStr(a_img_names[1],""),ptr(0x0))
        var reflectionTypes = func_getTypes(reflectionAssembly, ptr(0x0))        
        
        var items = reflectionTypes.add(p_size * 4)        
        var length = reflectionTypes.add(p_size * 3).readPointer().toInt32()        
        for (var i = 0; i < length; i++){            
            var klass = il2cpp_class_from_system_type(items.add(i * p_size).readPointer())            
            // LOG("[*] "+klass+"\t"+getClassName(klass),LogColor.C36)
            var type = il2cpp_class_get_type(klass)            
            var t_name = il2cpp_type_get_name(type)
            var p_klass = il2cpp_type_get_class_or_element_class(type)            
            LOG("[*] " + p_klass + "\t" + t_name.readCString(), LogColor.C36)            
        }
    })
    LOG(getLine(85), LogColor.C33)    
}

// attach A(0xabcd,(args)=>{},(ret)=>{})
function A(mPtr, mOnEnter, mOnLeave) {
    if (mPtr == null || mPtr == 0) {
        LOG("Can't attach nullptr")        
        return
    }
    mPtr = checkPointer(ptr(mPtr))
    var Listener = Interceptor.attach(mPtr, {
        onEnter: function (args) {
            if (mOnEnter != undefined) mOnEnter(args)
        },
        onLeave: function (ret) {
            if (mOnLeave != undefined) mOnLeave(ret)
        }
    })

    // 记录已经被Attach的函数地址以及listner,默认添加listener记录
    if (arguments[3] == undefined || arguments[3] == true) map_attach_listener.set(String(mPtr), Listener)
}

// R(0xabcd,(srcFunc,arg0,arg1,arg2,arg3)=>{......})
function R(mPtr, callBack) {    
    var src_ptr = ptr(mPtr)    
    var TYPENOP = arguments[2] == undefined    
    mPtr = checkPointer(mPtr)
    // 记录已经被 Replace 的函数地址
    if (String(arr_nop_addr).indexOf(mPtr) == -1) {        
        arr_nop_addr.push(String(mPtr))
    } else {
        //先取消掉再重新 replace
        Interceptor.revert(mPtr)
    }
    // 原函数的引用也可以再replace中调用findTransform
    var srcFunc = new NativeFunction(mPtr, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer'])    
    Interceptor.replace(mPtr, new NativeCallback(function (arg0, arg1, arg2, arg3) {        
        LOG("\nCalled " + (TYPENOP ? "Replaced" : "Nop") + " function ---> " + mPtr + " (" + src_ptr + ")", LogColor.YELLOW)
        var ret = callBack(srcFunc, arg0, arg1, arg2, arg3)        
        return ret == null ? ptr(0) : ret        
    }, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer']))    
}

// nop 指定函数
function n(mPtr) {
    if (mPtr == undefined) return    
    R(mPtr, () => { return ptr(0) }, 0)    
}

// 取消被 nop 的函数
function nn(mPtr) {
    if (mPtr == undefined) return
    mPtr = checkPointer(mPtr)
    Interceptor.revert(mPtr)
    for (var i = 0; i < arr_nop_addr.length; i++){
        if (String(arr_nop_addr[i]) == String(mPtr)) {
            arr_nop_addr = arr_nop_addr.splice(arr_nop_addr[i], 1)
        }
    }
}

// 取消所有已经Replace的函数
function nnn() {
    // 清理已经replace的函数
    arr_nop_addr.forEach((addr) => {
        Interceptor.revert(addr)
    })
}

//detach ---> A(mPtr)
function d(mPtr) {
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

function r() {
    d()
    arrMethodInfo.splice(0, arrMethodInfo.length)    
    arrayAddr.length = 0
    arrayName.length = 0
    count_method_times = 0
    t_arrayAddr = 0
}

function showMap(map) {
    LOG(getLine(20), LogColor.RED)    
    var count = 0 
    map.forEach((value, key, innerMap) => {
        LOG(key + " ---> " + value + "\t\tthis -> " + innerMap, LogColor.C36)
        count ++ 
    })
    if (count == 0 ) LOG("Noting to Show ...",LogColor.C93)
    LOG(getLine(10), LogColor.RED)    
    LOG("Count Map Items : " + count,LogColor.C35)
    LOG(getLine(20), LogColor.RED)    
}

function D(){
    r()
    nnn()
}

function B_UnityJNI() {
    D()
    a(findClass("AndroidJNI"))
    a(findClass("AndroidJNIHelper"))
    B("",true)
}

function B_Rate() {
    d()
    arrayAddr.length = 0 ? a() : ""
    B("Rate")
}

function B_Show() {
    d()
    arrayAddr.length == 0 ? a() : ""
    B("Show")
}

function B_Reward() {
    d()
    arrayAddr.length == 0 ? a() : ""
    B("Reward")
}

function B_Interstitial() {
    d()
    arrayAddr.length == 0 ? a() : ""
    B("Interstitial")
    B("FullScreenAd")
}

// print list result
function p(filter){
    print_list_result(filter)
}

// list all from class
function lafc(klass) {    
    LOG("\nFields :", LogColor.RED)    
    listFieldsFromCls(klass, undefined, 1)    
    LOG("\nMethods :", LogColor.RED)    
    list_Methods(klass, 1)    
}

// list methods from class
function lmfc(klass) {    
    list_Methods(klass, 1)    
}

// list methods from methodinfo   当前methodinfo所属类的methods
function lmfm(methodInfo) {    
    listMethodsFromMethodInfo(methodInfo)    
}

// list fields from methodinfo
function lffm(methodInfo, instance) {    
    listFieldsFromMethodInfo(methodInfo, instance)    
}

// list fields from class
function lffc(klass, instance) {    
    //对于枚举类型也可以使用，枚举类型也是fields
    listFieldsFromCls(klass, instance)    
}

/**
 * -------------------------------------------基础方法-------------------------------------------------
 */

function list_Images(filter) {
    arr_img_names.splice(0, arr_img_names.length)    
    arr_img_addr.splice(0, arr_img_addr.length)

    var domain = il2cpp_domain_get()
    var size_t = Memory.alloc(p_size)
    var assemblies = il2cpp_domain_get_assemblies(domain, size_t)
    var count_assemblies = 0
    var count_assemblies_all = 0
    LOG(getLine(85),LogColor.C33)
    var assemblies_count = size_t.readInt()
    for (var i=0;i<assemblies_count;i++){
        var img_addr = il2cpp_assembly_get_image(assemblies.add(p_size * i)).readPointer()
        var img_name = img_addr.add(p_size).readPointer().readCString()
        var cls_count = il2cpp_image_get_class_count(img_addr).toInt32()
        if (filter == undefined){
            LOG("[*] " + img_addr + "\t" + cls_count + "\t" + img_name, LogColor.C36)
            count_assemblies++
        }else if (img_name.indexOf(filter)!=-1){
            LOG("[*] " + img_addr + "\t" + cls_count + "\t" + img_name, LogColor.C36)
            count_assemblies++
        }
        arr_img_names.push(img_name)
        arr_img_addr.push(img_addr)
        count_assemblies_all++
    }    
    LOG(getLine(28), LogColor.C33)
    var comstr = ""
    if (filter != undefined) comstr = " | All " + count_assemblies_all
    LOG("  List " + count_assemblies + " Images" + comstr, LogColor.RED)
    LOG(getLine(85),LogColor.C33)
}

function list_Classes(image,isShowClass){
    if (isShowClass == undefined) isShowClass = true
    var image = ptr(image)
    var cls_count = il2cpp_image_get_class_count(image).toInt32()
    var a_Namespaces = new Array()
    var t_Namespaces = new Array()
    var t_Names = new Array()
    var t_il2CppClass = new Array()
    LOG(getLine(85), LogColor.C33)    
    for (var j = 0; j < cls_count; j++){
        var il2CppClass = il2cpp_image_get_class(image, j)
        var name = il2CppClass.add(2 * p_size).readPointer().readCString()
        var nameSpace = il2CppClass.add(3 * p_size).readPointer().readCString()
        if (a_Namespaces.indexOf(nameSpace) == -1) a_Namespaces.push(nameSpace)        
        t_il2CppClass.push(il2CppClass)
        t_Names.push(name)
        t_Namespaces.push(nameSpace)
    }
    for(var i=0;i<a_Namespaces.length;i++){
        LOG((i == 0 ? "" : (isShowClass ? "\n" : "")) + "[*] " + a_Namespaces[i], LogColor.C36)
        if (!isShowClass) continue
        for (var j = 0; j < t_Names.length; j++){
            if (t_Namespaces[j] == a_Namespaces[i]) LOG("\t[-] " + t_il2CppClass[j] + "\t" + t_Names[j], LogColor.C36)
        }
    }    
    var tmp = new Array()
    t_Namespaces.forEach(function (value) {
        if (tmp.indexOf(value) == -1) tmp.push(value)
    })
    LOG(getLine(28), LogColor.C33)
    LOG("  List " + cls_count + " Classes | Group by " + tmp.length + " NameSpaces", LogColor.RED)
    LOG(getLine(85), LogColor.C33)
}

// 0 1 2
function list_Methods(klass,TYPE){

    if (TYPE == undefined) TYPE = 0

    var AretName = new Array()
    var AretAddr = new Array()

    klass = ptr(klass)
    var iter = Memory.alloc(p_size)
    var method = NULL
    var count_methods = 0
    if (TYPE == 1) LOG("\n" + getLine(85), LogColor.C33)
    try{
        while (method = il2cpp_class_get_methods(klass, iter)) {
            var methodName = getMethodName(method)
            var retClass = il2cpp_class_from_type(getMethodReturnType(method))
            var retName = getClassName(retClass)
            var parameters_count = getMethodParametersCount(method)

            // 添加名称以及地址到array
            if (AretName.toString().indexOf(methodName) == -1) {
                AretName.push(methodName)
                AretAddr.push(method.readPointer())

                // 解析参数
                var arr_args = new Array()
                var arr_args_type_addr = new Array()                            
                for (var i = 0; i < parameters_count; i++){                    
                    try{
                        var ParameterInfo = method.add(p_size * 5).readPointer()
                        var Il2CppType = ParameterInfo.add(p_size * i * 4)
                        var typeClass = il2cpp_class_from_type(getParameterType(Il2CppType))
                        var TypeName = getClassName(typeClass)
                        arr_args.push(TypeName+" "+getParameterName(ParameterInfo))
                        arr_args_type_addr.push(TypeName+" "+typeClass)
                    }catch(e){}
                }

                if (TYPE != 2) {
                    LOG((count_methods==0?"":"\n")+"[*] "+method+" ---> "
                        + method.readPointer() + " ---> " + method.readPointer().sub(soAddr) + "\t"
                        + (!TYPE ? (parameters_count + "\t") : "") + "\n\t"
                        + get_method_modifier(method)
                        + retName + " "
                        + methodName + " "
                        + "(" + arr_args + ")" + "\t", LogColor.C36)
                }
                
                count_methods++

                if (TYPE != 2) {
                    if (!TYPE) continue

                    LOG("\t\t---> ret\t" + retName + "\t" + retClass, LogColor.C90)
                    LOG("\t\t---> cls\t" + arr_args_type_addr, LogColor.C90)
                }
            }
        }
    }catch(e){
        // LOG(e)
    }
    if (TYPE != 2) {
        LOG(getLine(85), LogColor.C33)
    } else {
        return new Array(AretName,AretAddr)
    }
}


// 解析cls指针下的函数名,返回匹配的函数地址
function getAddrFromName(clsptr, str) {
    var retArray = list_Methods(clsptr, 2)
    for (var i = 0; i < retArray[0].length; i++) {        
        if (retArray[0][i].indexOf(str) != -1) return retArray[1][i]
    }
    return -1
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

    if (imageName == undefined || imageName == null || className == null || functionName == null || argsCount == null) return ptr(0)
    // var corlib = il2cpp_get_corlib()
    if (isRealAddr == undefined) isRealAddr = true
    var currentlib = 0
    arr_img_names.forEach(function(name,index){
        if (name == imageName){
            currentlib = arr_img_addr[index]
        }
    })
    var klass = il2cpp_class_from_name(currentlib, Memory.allocUtf8String(imageName), Memory.allocUtf8String(className))
    if (klass == 0) {
        for (var j = 0; j < il2cpp_image_get_class_count(currentlib).toInt32(); j++){
            var il2CppClass = il2cpp_image_get_class(currentlib, j)
            if (getClassName(il2CppClass) == className) {
                klass = il2CppClass
                break
            }
        }
    }
    
    if (klass == 0 ) return ptr(0)
    var method = il2cpp_class_get_method_from_name(klass, allcStr(functionName), argsCount)
    if (method == 0) return ptr(0)
    if (arguments[5] !=undefined) return method
    if (isRealAddr) return isRealAddr ? method.readPointer():method.readPointer().sub(soAddr)

    var parameters_count = getMethodParametersCount(method)
    var arr_args = new Array()
    var arr_args_type_addr = new Array()
    for (var i = 0; i < parameters_count; i++){        
        var ParameterInfo = method.add(p_size * 5).readPointer().add(p_size * i * 4)
        var typeClass = il2cpp_class_from_type(getParameterType(ParameterInfo))
        var TypeName = getClassName(typeClass)
        arr_args.push(TypeName + " " + getParameterName(ParameterInfo))
        arr_args_type_addr.push(TypeName + " " + typeClass)
    }
    var disStr = get_method_modifier(method)
        + getClassName(il2cpp_class_from_type(getMethodReturnType(method))) + " "
        + getMethodName(method) + " "
        + "(" + arr_args + ")" + "\t"
    LOG(getLine(85),LogColor.C33)
    LOG(imageName+"."+className+"\t"+disStr,LogColor.RED)
    LOG("----------------------------",LogColor.C33)
    var ShowMore = false
    LOG("Il2CppImage\t---->\t" + currentlib + (ShowMore ? " (" + currentlib.add(p_size).readPointer().readCString() + ")" : ""))
    LOG("Il2CppClass\t---->\t" + klass + (ShowMore ? " (" + getClassName(klass) + ")" : ""))
    LOG("MethodInfo\t---->\t" + method + (ShowMore ? " (" + getMethodName(method) + ")" : ""))
    LOG("methodPointer\t---->\t" + method.readPointer() + "\t===>\t" + method.readPointer().sub(soAddr), LogColor.C36)
    LOG(getLine(85), LogColor.C33)
}

function addBreakPoints(imgOrCls){
    imgOrCls = ptr(imgOrCls)
    var method_count = 0
    var count = 0
    try{
        count = il2cpp_image_get_class_count(imgOrCls).toInt32()
    }catch(e){
        LOG("Error imgOrCls ",LogColor.RED)
        return
    }
    // 判断是image还是class
    LOG(getLine(85),LogColor.C33)
    if (String(arr_img_addr).indexOf(imgOrCls) != -1) {
        for (var j = 0; j < count; j++){            
            var il2CppClass = il2cpp_image_get_class(imgOrCls, j)
            addFunctions(il2CppClass)
        }
    }else{
        addFunctions(imgOrCls)
    }
    
    LOG("------------------------------------------", LogColor.C33)
    LOG("  Added " + method_count + " Methods    |    All " + arrayAddr.length, LogColor.RED)
    LOG(getLine(85),LogColor.C33)

    function addFunctions(cls){
        var iter = Memory.alloc(p_size)
        var method = NULL
        try{
            while (method = il2cpp_class_get_methods(cls, iter)) {
                if (Number(method) == 0) break
                var methodName = get_method_des(method)
                var methodAddr = method.readPointer()
                if (methodAddr == 0) continue
                LOG("[*] "+methodAddr+" ---> "+methodAddr.sub(soAddr)+"\t"+methodName,LogColor.C36)
                if (arrayName.indexOf(methodName)!=-1) continue
                arrayName.push(methodName)
                arrayAddr.push(methodAddr.sub(soAddr))
                arrMethodInfo.push(method)
                method_count ++ 
            }
        }catch(e){
            // LOG(e)
        }
    }
}

/**
 * 解析函数的参数信息
 * @param {Number} method MethodInfo指针
 * @param {*} isArray 内部函数调用 b()
 */
function get_method_des(method,isArray){
    method = ptr(method)
    var methodName = getMethodName(method)
    var retClass = il2cpp_class_from_type(getMethodReturnType(method))
    var retName = getClassName(retClass)
    var parameters_count = getMethodParametersCount(method)
    var permission = get_method_modifier(method)
    
    // 解析参数
    var arr_args = new Array()
    var arr_args_t = new Array()
    var arr_args_n = new Array()
    for (var i = 0; i < parameters_count; i++){        
        var ParameterInfo = method.add(p_size * 5).readPointer().add(p_size * i * 4)        
        var typeClass = il2cpp_class_from_type(getParameterType(ParameterInfo))        
        var TypeName = getClassName(typeClass)
        var paraName = getParameterName(ParameterInfo)
        arr_args.push(TypeName + " " + paraName)        
        arr_args_t.push(typeClass)
        arr_args_n.push(paraName)
    }

    // 补空格对齐
    var maxlength = 0
    for (var i = 0; i < arr_args_n.length; i++){        
        maxlength = maxlength > arr_args_n[i].length ? maxlength : arr_args_n[i].length        
    }
    for (var i = 0; i < arr_args_n.length; i++){        
        arr_args_n[i] += getSpace(maxlength - arr_args_n[i].length)        
    }

    var ret_str = permission + retName + " " + methodName + " (" + arr_args + ")"    

    if (isArray==undefined?false:true){
        var a_ret = new Array()
        a_ret.push(ret_str)                 //字符串简述
        a_ret.push(retClass)                //返回值类型
        a_ret.push(parameters_count)        //参数个数
        a_ret.push(arr_args_t)              //参数class列表
        a_ret.push(arr_args_n)              //参数名称
        a_ret.push(getSpace(maxlength))     //参数最大长度（补齐）
        // LOG(JSON.stringify(a_ret))
        return a_ret
    }

    return ret_str

    function getSpace(length){
        var retStr = ""
        for (var i = 0; i < length; i++){            
            retStr += " "            
        }
        return retStr
    }
}

/**
 * 断点单个函数
 * @param {Number} mPtr 可以是绝对地址 相对地址 MethodInfo地址
 * @param {Number} index 
 * @param {String} name 
 */
function breakPoint(mPtr,index,name){
    if (mPtr == undefined || mPtr == null) return 
    var arr_method_info = NULL
    try{
        arr_method_info = get_method_des(mPtr,true)
    }catch(e){
        breakWithArgs(checkPointer(mPtr))
        return
    }

    var method_addr = ptr(mPtr).readPointer()

    //移除在 B 中添加的条目避免重复显示
    if (t_arrayAddr != undefined ){
        var t_method_addr = method_addr.sub(soAddr)
        t_arrayAddr.forEach(function(value,index){ 
            if (Number(value) == Number(t_method_addr)) count_method_times[index] = maxCallTime
        })
    }

    var funcName = arr_method_info[0]
    var titleStr = String("Called " + funcName + "\t at " + method_addr + "(" + method_addr.sub(soAddr) + ") | MethodInfo " + ptr(mPtr))
    
    // LOG(method_addr.sub(soAddr))
    A(method_addr, (args) => {
        // if(index!=undefined && ++count_method_times[index] > maxCallTime) return
        LOG("\n-----------------------------------------------------------", LogColor.C33)
        LOG(titleStr,LogColor.C96)
        LOG("----------------------",LogColor.C33)
        var isStatic = funcName.indexOf("static") == -1
        if (isStatic){
        var insDes = ""
        try {
            insDes = SeeTypeToString(args[0],1)
        }catch(e){}
            LOG("  inst | \t\t" + args[0] + "\t[" + insDes + "]", LogColor.C36)
        }
        for (var i = 0; i < arr_method_info[2]; i++){
            var typeCls = arr_method_info[3][i]
            var strType = getClassName(typeCls)
            //静态方法没有上下文，反之有则arg+1
            var ClsArg = args[(isStatic ? i + 1 : i)]
            var result = FuckKnownType(IsJNIFunction(titleStr,strType),ClsArg,typeCls)
            LOG("  arg" + i + " | " + arr_method_info[4][i] + "\t--->\t" + ClsArg + "\t" +
                ((String(ClsArg).length) < 9 ? "\t" : "") +
                strType + " (" + typeCls + ")" + "\t" + result, LogColor.C36)
        }
    }, (ret) => {
        // if(index!=undefined && count_method_times[index] > maxCallTime) return
        var strType = getClassName(arr_method_info[1])
        var result = FuckKnownType(IsJNIFunction(titleStr, strType), ret, arr_method_info[1])
        var methodStr = arr_method_info.length == 0 ? "" : " (" + arr_method_info[1] + ")"
        LOG("  ret  |" + arr_method_info[5] + "\t--->\t" + ret +
            //这里的长度在32位的时候是十个长度 0xc976bb40 故小于9就多给他添加一个\t补齐显示
            (String(ret).length < 9 ? "\t" : "") + "\t" +
            strType + methodStr + "\t" +
            result, LogColor.C36)
        LOG("-----------------------------------------------------------", LogColor.C33)
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
function breakPoints(filter,isAnalyticParameter){
    // Interceptor.detachAll()
    t_arrayAddr = new Array()
    var t_arrayName = new Array()
    var t_arrayMethod = new Array()
    if (filter == undefined || filter == ""){
        t_arrayName = arrayName
        t_arrayAddr = arrayAddr
        t_arrayMethod = arrMethodInfo
    }else{
        arrayName.forEach(function(value,index){
            if (value.indexOf(filter)!=-1){
                t_arrayName.push(value)
                t_arrayAddr.push(arrayAddr[index])
                t_arrayMethod.push(arrMethodInfo[index])
            }
        })
    }

    count_method_times = new Array(t_arrayName.length)    
    for (var t = 0; t < t_arrayAddr.length; t++){        
        count_method_times[t] = Number(1)        
    }

    t_arrayAddr
        .map(function(temp){return soAddr.add(temp)})
        .forEach(function(value,index){
            LOG("-------------------------",LogColor.C90)
            LOG('currentAddr:' + value + "\t"+t_arrayName[index],LogColor.C32)
            // var a1 = isAnalyticParameter ? arrayMethod[index] : value
            // var a2 = isAnalyticParameter ? undefined : index
            if (isAnalyticParameter) {
                b(arrMethodInfo[index])
                // 等价 contine
                return 0
            }
            try{
                funcTmp(value,index,t_arrayName)
                // breakPoint(a1,a2,t_arrayName[index])
            }catch(e){
                funcTmp(value.add(1),index,t_arrayName)
                // breakPoint(a1.add(1),a2,t_arrayName[index])
            }            
            LOG("\t\t---->"+index+"\t"+value.sub(soAddr)+" is prepared ",LogColor.C33)
        })
    LOG("------------------------------------------",LogColor.C33)
    LOG("  Added "+t_arrayAddr.length+" BreakPoints    |    All "+arrayAddr.length,LogColor.RED)
    LOG("-------------------------------------------------------------------------------------",LogColor.C33)

    function funcTmp(currentAddr,index,arrayName){
        try {
            A(currentAddr, () => {
                if (++count_method_times[index] < maxCallTime) {
                    // 之前是单独添加了一个字段来控制，后面这里改成这样进行筛选判断简洁点
                    if (filterClass.length != 0){
                        var temp = getClassNameFromMethodInfo(t_arrayMethod[index])
                        for (var i = 0; i < filterClass.length; i++){                            
                            var maxLength = filterClass[i].length > maxLength ? filterClass[1].length : maxLength                            
                        }
                        var retStr = getFunctionDesStr(t_arrayMethod, index, maxLength)                        
                        filterClass.forEach((value) => {                            
                            if (temp.indexOf(value) != -1 && temp.length == value.length) {                                
                                LOG("called : "+currentAddr.sub(soAddr) + retStr +" --->\t"+arrayName[index] +"\n",LogColor.C36)
                            }
                        })
                    }else{
                        LOG("\ncalled : "+currentAddr.sub(soAddr) + getFunctionDesStr(t_arrayMethod,index,13) +" --->\t"+arrayName[index],LogColor.C36)
                    }
                }
            }, () => { }, false)
        }catch(e){
            LOG(e,LogColor.C91)
        }
    }

    function getFunctionDesStr(methodInfos,index,maxlength){
        var strMethodP = ""
        var strMethodC = ""
        if (methodInfos.length != 0){
            strMethodP = " ("+methodInfos[index]+")"
            strMethodC = getClassNameFromMethodInfo(methodInfos[index])
            strMethodC = alignStr(strMethodC,maxlength)
            strMethodC += "("+getClassAddrFromMethodInfo(methodInfos[index])+")"
        }
        return strMethodP + "\t" + strMethodC
    }

    function alignStr(str, size) {        
        var srcSize = str.length        
        if (srcSize >= size) {            
            str = str.substring(0, size - 1)            
            str += "."
        }else{
            for (var i = size - srcSize; i > 0; i--){                
                str += " "
            }
        }
        return str
    }
}

/**
 * 有时候方法太多遍历一遍太费时间，就需要手动调用该方法把打印出来的值替换开始处的值（arrayAddr/arrayName）
 */
function print_list_result(filter){
    if (arrayAddr == null || arrayAddr.length ==0) return
    if (filter == undefined){
        LOG("\n-------------- list result --------------",LogColor.C36)
        LOG("\nvar arrayAddr = \n"+JSON.stringify(arrayAddr))
        LOG("\nvar arrayName = \n"+JSON.stringify(arrayName)+"\n")
        LOG("\nCOUNT:"+arrayAddr.length+"\n-----------------------------------------",LogColor.C36)
    }else{
        LOG("\n---- list result by Search '"+filter+"' ----",LogColor.C36)
        var temp_names = new Array()
        var temp_addrs = new Array()
        arrayName.forEach(function(value,index){
            if (value.indexOf(filter)!=-1){
                temp_names.push(value)
                temp_addrs.push(arrayAddr[index])
            }
        })
        LOG("\nvar arrayAddr = \n"+JSON.stringify(temp_addrs))
        LOG("\nvar arrayName = \n"+JSON.stringify(temp_names)+"\n")
        LOG("\nCOUNT:"+temp_addrs.length+"\n-----------------------------------------",LogColor.C36)
    }
}

/**
 * 显示哪些因为超出了最大调用次数的函数地址名称以及index
 */
function print_deserted_methods(){
    if (count_method_times == null || count_method_times.length == 0) return
    LOG("------------------deserted methods------------------\n",LogColor.C92)
    count_method_times.forEach(function(value,index){
        if (Number(value)>maxCallTime) LOG("[*] "+arrayAddr[index].add(soAddr)+"\t"+arrayAddr[index]+"\t"+arrMethodInfo[index]+"\t("+index+")"+"\t--->\t"+arrayName[index]+"\n",LogColor.C32)
    })
}

// 查看类型的,主要用来区分transform和gameObj
function SeeTypeToString(obj,b){
    var s_type = callFunction(find_method("UnityEngine.CoreModule", "Object", "ToString", 0), ptr(obj))
    if (b == undefined) {
        LOG(readU16(s_type))
    }else{
        return readU16(s_type)
    }
}

// 读取浮点数 ptr().readFloat() === readSingle(ptr().readPointer())
function readSingle(value){
    return Memory.alloc(p_size*2).writePointer(value).readFloat()
}

/**
 * 自定义参数解析模板
 * 将mPtr指向的位置以 strType 类型解析并返回 String 
 * 拓展解析一些常用的类，用b断某个方法的时候就可以很方便的打印出参数
 * @param {String}  strType  类型字符串
 * @param {Pointer} mPtr     内存指针cls
 * @param {Pointer} tPtr     类指针（非必选）
 * @returns {String}         简写字符串描述
 */
function FuckKnownType(strType,mPtr,tPtr){
    try{
        mPtr = ptr(mPtr)
        tPtr = ptr(tPtr)
        
        // 数组类型的数据解析
        if (strType.endsWith("[]")) {
            var addr_getCount = getAddrFromName(tPtr, "get_Count")
            var addr_get_Item = getAddrFromName(tPtr, "get_Item")
            var arr_retStr = new Array()
            for (var index = 0; index < callFunction(addr_getCount, mPtr); index++) {
                var item = callFunction(addr_get_Item, mPtr, index)
                var type = String(strType).split("[]")[0]
                arr_retStr.push(FuckKnownType(type,item))
            }
            return JSON.stringify(arr_retStr)
        }
        
        // Dictionary 数据解析
        if (strType.startsWith("Dictionary")) {
            var addr_getCount = getAddrFromName(tPtr, "get_Count")
            var count = callFunction(addr_getCount,mPtr)
            return count + "\t"+FuckKnownType("-1",mPtr,0x0)
        }
        
        // 枚举解析
        if (class_is_enum(tPtr)) {
            var iter = Memory.alloc(p_size)
            var field
            var enumIndex = 0
            while (field = il2cpp_class_get_fields(tPtr, iter)) {
                if (field == 0x0) break
                var fieldName = field.readPointer().readCString()
                var filedType = field.add(p_size).readPointer()
                var field_class = il2cpp_class_from_type(filedType)
                if (String(field_class) != String(tPtr)) continue
                if (Number(mPtr) == Number(enumIndex++)) return (strType != "1" ? "Eunm -> " : "") + fieldName
            }
        }

        switch(strType){
            case "Void"             :
                return ""
            case "String"           : 
                if (mPtr == 0 ) return ""
                // return mPtr.add(0xC).readPointer().readCString()
                return readU16(mPtr)
            case "Boolean":
                var temp = Memory.alloc(p_size)
                temp.writePointer(mPtr)
                return (temp.readU8() == 0x1) ? "True" : "False"
            case "Int32"            : 
            case "Int64"            : 
                return mPtr.toInt32()
            case "Single"           : 
                return readSingle(mPtr)
            case "Object"           : 
            case "Transform"        : 
            case "GameObject"       :
                return SeeTypeToString(mPtr, false)
            case "Texture"          : 
                var w = callFunctionRI(find_method("UnityEngine.CoreModule", "Texture", "GetDataWidth", 0), mPtr)                
                var h = callFunctionRI(find_method("UnityEngine.CoreModule", "Texture", "GetDataHeight", 0), mPtr)                
                var r = callFunctionRI(find_method("UnityEngine.CoreModule", "Texture", "get_isReadable", 0), mPtr)                
                var m = callFunctionRI(find_method("UnityEngine.CoreModule", "Texture", "get_wrapMode", 0), mPtr)                
                r = r == 0 ? "False" : "True"
                m = m == 0 ? "Repeat" : (m == 1 ? "Clamp" : (m == 2 ? "Mirror" : "MirrorOnce"))
                return JSON.stringify([m,w,h,r])
            case "Component"        :
                if (mPtr == 0x0)    return ""                
                var mTransform = callFunction(find_method("UnityEngine.CoreModule", "Component", "get_transform", 0), mPtr)                
                var mGameObject = callFunction(find_method("UnityEngine.CoreModule", "Component", "get_gameObject", 0), mPtr)                
                var gName = getObjName(mGameObject)
                return gName + "\tG:" + mGameObject + " T:" + mTransform + ""            
            case "IntPtr"           : 
                if (mPtr == 0x0)    return "0x0"
                return readU16(callFunction(find_method('mscorlib', 'IntPtr', 'ToString', 0), mPtr))
            case "Action"           :
            case "Action`1"         : 
            case "Action`2"         : 
                if (mPtr == 0x0)    return "0x0"
                return ptr(mPtr).add(0x14).readPointer().readPointer().sub(soAddr)
            case "Delegate"         : 
                if (mPtr == 0x0) return "0x0"
                var tmp_ptr = ptr(mPtr).add(0x8).readPointer()
                var temp_m_target = ptr(mPtr).add(0x10).readPointer()
                return tmp_ptr + "(" + tmp_ptr.sub(soAddr) + ")  m_target:" + temp_m_target + "  virtual:" + (ptr(mPtr).add(0x30).readInt() == 0x0 ? "false" : "true")
            case "Char"             : return mPtr.readCString()
            case "JObject"          : return getJclassName(mPtr,true)
            case "Text"             : return readU16(callFunction(find_method("UnityEngine.UI", "Text", "get_text", 0), mPtr))
            case "Vector2"          : return readU16(callFunction(find_method("UnityEngine.CoreModule", "Vector2", "ToString", 0), mPtr))
            case "Vector3"          : return readU16(callFunction(find_method("UnityEngine.CoreModule", "Vector3", "ToString", 0), mPtr))
            case "Vector4"          : return readU16(callFunction(find_method("UnityEngine.CoreModule", "Vector4", "ToString", 0), mPtr))
            case "Color"            : return readU16(callFunction(find_method("UnityEngine.CoreModule", "Color", "ToString", 0), mPtr))            
            case "Color32"          : return readU16(callFunction(find_method("UnityEngine.CoreModule", "Color32", "ToString", 0), mPtr))            
            case "Event"            : return readU16(callFunction(find_method("UnityEngine.IMGUIModule", "Event", "ToString", 0), mPtr))            
            case "Bounds"           : return readU16(callFunction(find_method("UnityEngine.CoreModule", "Bounds", "ToString", 0), mPtr))            
            case "TextAsset"        : return readU16(callFunction(find_method("UnityEngine.CoreModule", "TextAsset", "ToString", 0), mPtr))            
            case "Rect"             : return readU16(callFunction(find_method("UnityEngine.CoreModule", "Rect", "ToString", 0), mPtr))            
            case "Ray"              : return readU16(callFunction(find_method("UnityEngine.CoreModule", "Ray", "ToString", 0), mPtr))            
            case "Quaternion"       : return readU16(callFunction(find_method("UnityEngine.CoreModule", "Quaternion", "ToString", 0), mPtr))            
            case "Pose"             : return readU16(callFunction(find_method("UnityEngine.CoreModule", "Pose", "ToString", 0), mPtr))            
            case "Plane"            : return readU16(callFunction(find_method("UnityEngine.CoreModule", "Plane", "ToString", 0), mPtr))            
            case "Type"             : return readU16(callFunction(find_method("mscorlib", "Type", "ToString", 0), mPtr))            
            case "TextMeshPro"      :
            case "TextMeshProUGUI"  : return readU16(callFunction(find_method("Unity.TextMeshPro", "TMP_Text", "GetParsedText", 0), mPtr))            
            default                 : return readU16(callFunction(find_method("mscorlib", "Object", "ToString", 0), mPtr))            
        }
    }
    catch (e) {
        // LOG(e)
        return " ? "
    }
}

/**
 * 解析 unity list
 * @param {Pointer} listPtr 该类专属的list实现类指针
 * @param {Pointer} valuePtr 带解析的list指针
 */
function ShowList(listPtr, valuePtr, type) {
    if (type = undefined) lffc(listPtr, valuePtr)
    var a_get_Count = getAddrFromName(listPtr, "get_Count")    
    var a_get_Capacity = getAddrFromName(listPtr, "get_Capacity")    
    var a_get_Item = getAddrFromName(listPtr, "get_Item")    

    var Count = callFunction(a_get_Count, valuePtr).toInt32()    
    var Capacity = callFunction(a_get_Capacity, valuePtr).toInt32()    
    LOG("\nList Size " + Count + " / " + Capacity + "   " + getType(valuePtr, 1) + "\n", LogColor.RED)    

    for (var i = 0; i < Count; i++){
        var header = String("[" + i + "]").length == 3 ? String("[" + i + "]  ") : String("[" + i + "] ")        
        var mPtr = callFunction(a_get_Item, valuePtr, i)        
        var name = ""
        try {
            name = getObjName(mPtr)
        } catch (e) {
            name = FuckKnownType("-1", mPtr)            
        }
        LOG(header + ptr(mPtr) + "\t\t" + name, LogColor.C36)        
    }
    LOG("\n" + FuckKnownType("-1", valuePtr) + "\n", LogColor.YELLOW)    
}

function HookSendMessage(){
    try {
        var UnityPlayer = Java.use("com.unity3d.player.UnityPlayer")        
        UnityPlayer.UnitySendMessage.implementation = function (str0, str1, str2) {            
            console.warn("\n--------------\tCalled UnitySendMessage\t--------------")            
            console.log("UnityPlayer.UnitySendMessage(\x1b[96m'" + str0 + "','" + str1 + "','" + str2 + "'\x1b[0m)")            
            this.UnitySendMessage(str0, str1, str2)            
            PrintStackTrace()            
        }
    } catch (e) {
        // LOG(e)
    }
}

// 清空
function reflash(){

}

/**
 * 解析 Method 的权限符
 * @param {Number} method_ptr 
 */
function get_method_modifier(method_ptr){
    
    var flags = ptr(method_ptr).add(p_size * 8 + 4).readU16()    
    var access = flags & il2cppTabledefs.METHOD_ATTRIBUTE_MEMBER_ACCESS_MASK    
    var ret_str = ""
    switch(access){
        case il2cppTabledefs.METHOD_ATTRIBUTE_PRIVATE:
            ret_str += "private "; break        
        case il2cppTabledefs.METHOD_ATTRIBUTE_PUBLIC:
            ret_str += "public "; break        
        case il2cppTabledefs.METHOD_ATTRIBUTE_FAMILY:
            ret_str += "protected "; break        
        case il2cppTabledefs.METHOD_ATTRIBUTE_ASSEM:
        case il2cppTabledefs.METHOD_ATTRIBUTE_FAM_AND_ASSEM:            
            ret_str += "internal "; break        
        case il2cppTabledefs.METHOD_ATTRIBUTE_FAM_OR_ASSEM:
            ret_str += "protected internal "; break        
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
function printLogColors(){
    var str = "123456789"
    console.log("----------------  listLogColors  ----------------")    
    for (var i = 30; i <= 37; i++){        
        console.log("\t\t\x1b[" + i + "m" + i + "\t" + str + "\x1b[0m")        
    }
    console.log("----------------------------------------------")    
    for (var i = 40; i <= 47; i++){        
        console.log("\t\t\x1b[" + i + "m" + i + "\t" + str + "\x1b[0m")        
    }
    console.log("----------------------------------------------")
    for (var i = 90; i <= 97; i++){        
        console.log("\t\t\x1b[" + i + "m" + i + "\t" + str + "\x1b[0m")        
    }
    console.log("----------------------------------------------")
    for (var i = 100; i <= 107; i++){        
        console.log("\t\t\x1b[" + i + "m" + i + "\t" + str + "\x1b[0m")        
    }
    console.log("----------------------------------------------")
}

var il2cppTabledefs = {
    METHOD_ATTRIBUTE_MEMBER_ACCESS_MASK         : 0x0007,
    METHOD_ATTRIBUTE_COMPILER_CONTROLLED        : 0x0000,
    METHOD_ATTRIBUTE_PRIVATE                    : 0x0001,
    METHOD_ATTRIBUTE_FAM_AND_ASSEM              : 0x0002,
    METHOD_ATTRIBUTE_ASSEM                      : 0x0003,
    METHOD_ATTRIBUTE_FAMILY                     : 0x0004,
    METHOD_ATTRIBUTE_FAM_OR_ASSEM               : 0x0005,
    METHOD_ATTRIBUTE_PUBLIC                     : 0x0006,

    METHOD_ATTRIBUTE_STATIC                     : 0x0010,
    METHOD_ATTRIBUTE_FINAL                      : 0x0020,
    METHOD_ATTRIBUTE_VIRTUAL                    : 0x0040,
    METHOD_ATTRIBUTE_ABSTRACT                   : 0x0400,
    METHOD_ATTRIBUTE_PINVOKE_IMPL               : 0x2000,
    METHOD_ATTRIBUTE_VTABLE_LAYOUT_MASK         : 0x0100,

    METHOD_ATTRIBUTE_REUSE_SLOT                 : 0x0000,
    METHOD_ATTRIBUTE_NEW_SLOT                   : 0x0100,
    METHOD_ATTRIBUTE_PINVOKE_IMPL               : 0x2000,
}

var FieldAccess = { 
    FIELD_ATTRIBUTE_FIELD_ACCESS_MASK     : 0x0007,
    FIELD_ATTRIBUTE_COMPILER_CONTROLLED   : 0x0000,
    FIELD_ATTRIBUTE_PRIVATE               : 0x0001,
    FIELD_ATTRIBUTE_FAM_AND_ASSEM         : 0x0002,
    FIELD_ATTRIBUTE_ASSEMBLY              : 0x0003,
    FIELD_ATTRIBUTE_FAMILY                : 0x0004,
    FIELD_ATTRIBUTE_FAM_OR_ASSEM          : 0x0005,
    FIELD_ATTRIBUTE_PUBLIC                : 0x0006,

    FIELD_ATTRIBUTE_STATIC                : 0x0010,
    FIELD_ATTRIBUTE_INIT_ONLY             : 0x0020,
    FIELD_ATTRIBUTE_LITERAL               : 0x0040,
    FIELD_ATTRIBUTE_NOT_SERIALIZED        : 0x0080,
    FIELD_ATTRIBUTE_SPECIAL_NAME          : 0x0200,
    FIELD_ATTRIBUTE_PINVOKE_IMPL          : 0x2000,

    FIELD_ATTRIBUTE_RESERVED_MASK         : 0x9500,
    FIELD_ATTRIBUTE_RT_SPECIAL_NAME       : 0x0400,
    FIELD_ATTRIBUTE_HAS_FIELD_MARSHAL     : 0x1000,
    FIELD_ATTRIBUTE_HAS_DEFAULT           : 0x8000,
    FIELD_ATTRIBUTE_HAS_FIELD_RVA         : 0x0100
}

var LogColor = {    
    WHITE: 0, RED: 1, YELLOW: 3,    
    C31: 31, C32: 32, C33: 33, C34: 34, C35: 35, C36: 36,
    C41: 41, C42: 42, C43: 43, C44: 44, C45: 45, C46: 46,    
    C90: 90, C91: 91, C92: 92, C93: 93, C94: 94, C95: 95, C96: 96, C97: 97,    
    C100: 100, C101: 101, C102: 102, C103: 103, C104: 104, C105: 105, C106: 106, C107: 107    
}
 
function getClassName(klass) {    
    return ptr(klass).add(p_size * 2).readPointer().readCString()  
}

function getMethodName(method) {    
    return ptr(method).add(p_size * 2).readPointer().readCString()    
}

function getFieldsCount(kclass) {    
    return il2cpp_class_num_fields(ptr(kclass))
}

function getImgName(img) {    
    return ptr(img).add(p_size * 1).readPointer().readCString()    
}

function getMethodParametersCount(method) {    
    return ptr(method).add(p_size * 8 + 4 + 2 + 2 + 2).readU8()    
}

function getMethodParameters(method) {    
    return ptr(method).add(p_size * 5).readPointer()    
}

function getMethodReturnType(method) {    
    return ptr(method).add(p_size * 4).readPointer()    
}

function getParameterName(ParameterInfo) {    
    return ptr(ParameterInfo).readPointer().readCString()    
}

function getParameterType(Il2CppType) {    
    return ptr(Il2CppType).add(4 * 2 + p_size).readPointer()    
}

/**
 * -------------------------------------------其他方法-------------------------------------------------
 */

/**
 * 修改函数参数或者返回值
 * @param {Pointer} mPtr    函数地址
 * @param {Boolean} boolean 返回值修改为True/False
 * @param {Number}  index   null == ret / {1,2....} 等于修改第几个参数
 */
function setFunctionBoolean(mPtr, boolean, index) {    
    setFunctionValue(mPtr, boolean == true ? 0x1 : 0x0, index)    
}

function setFunctionValue(mPtr, value, index) {    
    mPtr = checkPointer(mPtr)    
    A(mPtr, (args) => {
        if (index != undefined){
            args[index] = ptr(value)
        }
    }, (ret) => {
        if (index == undefined) ret.replace(ptr(value))        
        LOG("\nCalled function at " + mPtr + " ---> " + mPtr.sub(soAddr) + " Changed RET", LogColor.C93)        
    })
}

/**
 * 方便对 m(cls) 列出的 mathod 进行调用
 * @param {Pointer} mPtr 
 * @returns 
 */
function callFunction(mPtr){
    if (mPtr == undefined || mPtr == null || mPtr == 0x0) return ptr(0x0)    
    for (var i = 1; i <= (arguments.length < 5 ? 5 : arguments.length) - 1; i++)        
        arguments[i] = arguments[i] == undefined ? ptr(0x0) : ptr(String(arguments[i]))    
    return new NativeFunction(checkPointer(mPtr), 'pointer', ['pointer', 'pointer', 'pointer', 'pointer'])
        (arguments[1], arguments[2], arguments[3], arguments[4])
}

function callFunctionRB(mPtr) {    
    return callFunctionRI(mPtr) == 1
}

function callFunctionRI(mPtr) {    
    return callFunction(mPtr).toInt32()
}

function callFunctionRS(mPtr) {    
    return readSingle(callFunction(mPtr))
}

function callFunctionRF(mPtr) {    
    return callFunction(mPtr).readFloat()
}

function breakWithArgs(mPtr, argCount) {    
    mPtr = checkPointer(mPtr)
    if (argCount == undefined) argCount = 4
    A(mPtr, (args) => {
        LOG("\nCalled from " + String(mPtr).toString(16) + " ---> " + String(mPtr.sub(soAddr)).toString(16), LogColor.C36)        
        switch(argCount){
            case 1: LOG(args[0], LogColor.C36); break            
            case 2: LOG(args[0] + "\t" + args[1], LogColor.C36); break            
            case 3: LOG(args[0] + "\t" + args[1] + "\t" + args[2], LogColor.C36); break            
            case 4: LOG(args[0] + "\t" + args[1] + "\t" + args[2] + "\t" + args[3], LogColor.C36); break            
        }
    }, (ret) => {
        LOG("End Function return " + ret, LogColor.C36)        
    })
}

function breakInline(mPtr, filterRigster, maxCount) {    
    if (maxCount == undefined) maxCount = 10
    mPtr = checkPointer(mPtr)
    Interceptor.attach(mPtr,{
        onEnter: function (args) {
            if (Process.arch != "arm" && filterRigster != undefined
                && filterDuplicateOBJ(String(filterReg(filterRigster, this.context)), maxCount) == -1) return
            LOG("\n---------------------------------------------\n\n"
                +"Called function at "+mPtr+"\n"
                + JSON.stringify(this.context),LogColor.C36)
        },
        onLeave:function(ret){}
    })
    
    function filterReg(ft, context) {
        switch (ft) {
            case "r0": return context.r0
            case "r1": return context.r1
            case "r2": return context.r2
            case "r3": return context.r3
            case "r4": return context.r4
            case "r5": return context.r5
            case "r6": return context.r6
            case "r7": return context.r7
            case "r8": return context.r8
            case "r9": return context.r9
            case "r10": return context.r10
            case "r11": return context.r11
            case "r12": return context.r12
            case "lr": return context.lr
        }
    }
}

/**
 * 快速的打印出我们使用inlinehook操作ui需要hook的函数定义,暂时先这么用着
 * (TODO:后续看搞一个inlinehook版本的find_method(),让inlinehook对unity的hook更方便友好)
 */
function printInfo() {
     
    LOG('\n\t// find_method("UnityEngine.UI","Button","OnPointerClick",1,false)',LogColor.C36)
    LOG("\tunsigned long p_OnPointerClick      = base + "+canUseInlineHook(find_method("UnityEngine.UI","Button","OnPointerClick",1),3)+";",LogColor.C36)
    LOG('\t// find_method("UnityEngine.UI","PointerEventData","get_pointerEnter",0,false)',LogColor.C36)
    LOG("\tunsigned long p_get_pointerEnter    = base + "+canUseInlineHook(find_method("UnityEngine.UI","PointerEventData","get_pointerEnter",0),3)+";",LogColor.C36)
    LOG('\t// find_method("UnityEngine.CoreModule","GameObject","SetActive",1,false)',LogColor.C36)
    LOG("\tunsigned long p_SetActive           = base + "+canUseInlineHook(find_method("UnityEngine.CoreModule","GameObject","SetActive",1),3)+";",LogColor.C36)
    LOG('\t// find_method("UnityEngine.CoreModule","GameObject","get_transform",0,false)',LogColor.C36)
    LOG("\tunsigned long p_getTransform        = base + "+canUseInlineHook(find_method("UnityEngine.CoreModule","GameObject","get_transform",0),3)+";",LogColor.C36)
    LOG('\t// find_method("UnityEngine.CoreModule","Object","GetName",1,false)',LogColor.C36)
    LOG("\tunsigned long p_getName             = base + "+canUseInlineHook(find_method("UnityEngine.CoreModule","Object","GetName",1),3)+";",LogColor.C36)
    LOG('\t// find_method("UnityEngine.CoreModule","Transform","GetParent",0,false)',LogColor.C36)
    LOG("\tunsigned long p_getParent           = base + "+canUseInlineHook(find_method("UnityEngine.CoreModule","Transform","GetParent",0),3)+";",LogColor.C36)
    LOG('\t// find_method("UnityEngine.CoreModule","Transform","get_childCount",0,false)',LogColor.C36)
    LOG("\tunsigned long p_getChildCount       = base + "+canUseInlineHook(find_method("UnityEngine.CoreModule","Transform","get_childCount",0),3)+";",LogColor.C36)
    LOG('\t// find_method("UnityEngine.CoreModule","Transform","GetChild",1,false)',LogColor.C36)
    LOG("\tunsigned long p_getChild            = base + "+canUseInlineHook(find_method("UnityEngine.CoreModule","Transform","GetChild",1),3)+";",LogColor.C36)
    LOG('\t// find_method("UnityEngine.CoreModule","Transform","set_localScale_Injected",1,false)',LogColor.C36)
    LOG("\tunsigned long p_setlocalScale       = base + "+canUseInlineHook(find_method("UnityEngine.CoreModule","Transform","set_localScale_Injected",1),3)+";",LogColor.C36)
    LOG('\t// find_method("UnityEngine.CoreModule","Component","get_gameObject",0,false)',LogColor.C36)
    LOG("\tunsigned long p_get_gameObject      = base + "+canUseInlineHook(find_method("UnityEngine.CoreModule","Component","get_gameObject",0),3)+";",LogColor.C36)

    LOG('\n\t// find_method("UnityEngine.CoreModule","Transform","set_localPosition_Injected",1,false)',LogColor.C96)
    LOG("\tf_setLocalPosition \t= reinterpret_cast<void *(*)(void *, void *)>\t\t(base + "+find_method("UnityEngine.CoreModule","Transform","set_localPosition_Injected",1).sub(soAddr)+");",LogColor.C96)
    LOG('\t// find_method("UnityEngine.UI","Text","set_text",1,false)',LogColor.C96)
    LOG("\tf_set_text \t\t= reinterpret_cast<void *(*)(void *, MonoString *)>\t(base + "+find_method("UnityEngine.UI",'Text','set_text',1).sub(soAddr)+");",LogColor.C96)
    LOG('\t// find_method("UnityEngine.UI","Text","get_text",0,false)',LogColor.C96)
    LOG("\tf_get_text \t\t= reinterpret_cast<MonoString *(*)(void *)>\t\t(base + "+find_method("UnityEngine.UI",'Text','get_text',0).sub(soAddr)+");\n",LogColor.C96)

    // return

    LOG('\n\t// find_method("UnityEngine.CoreModule","PlayerPrefs","SetInt",2,false)')
    var SetInt = find_method("UnityEngine.CoreModule","PlayerPrefs","SetInt",2)
    LOG("\tunsigned long p_SetInt       = base + "+ (SetInt ==0 ? "0x0" : SetInt.sub(soAddr)) +";")
    LOG('\t// find_method("UnityEngine.CoreModule","PlayerPrefs","GetInt",2,false)')
    var GetInt = find_method("UnityEngine.CoreModule","PlayerPrefs","GetInt",2)
    LOG("\tunsigned long p_GetInt       = base + "+ (GetInt ==0 ? "0x0" : GetInt.sub(soAddr)) +";")
    LOG('\t// find_method("UnityEngine.CoreModule","PlayerPrefs","SetFloat",2,false)')
    var SetFloat = find_method("UnityEngine.CoreModule","PlayerPrefs","SetFloat",2)
    LOG("\tunsigned long p_SetFloat     = base + "+ (SetFloat ==0 ? "0x0" : SetFloat.sub(soAddr)) +";")
    LOG('\t// find_method("UnityEngine.CoreModule","PlayerPrefs","SetString",2,false)')
    var SetString = find_method("UnityEngine.CoreModule","PlayerPrefs","SetString",2)
    LOG("\tunsigned long p_SetString    = base + "+ (SetString ==0 ? "0x0" : SetString.sub(soAddr)) +";")

    LOG("\n")
}

function printExp() {
    
    LOG("\n\til2cpp_get_corlib = (Il2CppImage *(*)()) ( soAddr + "+Module.findExportByName(soName,'il2cpp_get_corlib').sub(soAddr)+");",LogColor.C36)
    LOG("\til2cpp_domain_get = (Il2CppDomain *(*)()) ( soAddr + "+Module.findExportByName(soName,'il2cpp_domain_get').sub(soAddr)+");",LogColor.C36)
    LOG("\til2cpp_domain_get_assemblies = (Il2CppAssembly **(*)(const Il2CppDomain *,size_t *)) ( soAddr + "+Module.findExportByName(soName,'il2cpp_domain_get_assemblies').sub(soAddr)+");",LogColor.C36)
    LOG("\til2cpp_assembly_get_image = (Il2CppImage *(*)(const Il2CppAssembly *)) ( soAddr + "+Module.findExportByName(soName,'il2cpp_assembly_get_image').sub(soAddr)+");",LogColor.C36)
    LOG("\til2cpp_image_get_class_count = (size_t (*)(const Il2CppImage *)) ( soAddr + "+Module.findExportByName(soName,'il2cpp_image_get_class_count').sub(soAddr)+");",LogColor.C36)
    LOG("\til2cpp_image_get_class = (Il2CppClass *(*)(const Il2CppImage *,size_t)) ( soAddr + "+Module.findExportByName(soName,'il2cpp_image_get_class').sub(soAddr)+");",LogColor.C36)
    LOG("\til2cpp_class_get_methods = (MethodInfo *(*)(Il2CppClass *,void **)) ( soAddr + "+Module.findExportByName(soName,'il2cpp_class_get_methods').sub(soAddr)+");",LogColor.C36)
    LOG("\til2cpp_class_from_type = (Il2CppClass *(*)(const Il2CppType *)) ( soAddr + "+Module.findExportByName(soName,'il2cpp_class_from_type').sub(soAddr)+");",LogColor.C36)
    LOG("\til2cpp_class_get_type = (Il2CppType *(*)(Il2CppClass *)) ( soAddr + "+Module.findExportByName(soName,'il2cpp_class_get_type').sub(soAddr)+");",LogColor.C36)
    LOG("\til2cpp_class_from_system_type = (Il2CppClass *(*)(Il2CppReflectionType *)) ( soAddr + "+Module.findExportByName(soName,'il2cpp_class_from_system_type').sub(soAddr)+");",LogColor.C36)
    LOG("\til2cpp_class_from_name = (Il2CppClass *(*)(const Il2CppImage *, const char *,const char *)) ( soAddr + "+Module.findExportByName(soName,'il2cpp_class_from_name').sub(soAddr)+");",LogColor.C36)
    LOG("\til2cpp_class_get_method_from_name = (MethodInfo *(*)(Il2CppClass *,const char *,int)) ( soAddr + "+Module.findExportByName(soName,'il2cpp_class_get_method_from_name').sub(soAddr)+");",LogColor.C36)
    LOG("\til2cpp_string_new = (MonoString *(*)(const char *))  ( soAddr + "+Module.findExportByName(soName,'il2cpp_string_new').sub(soAddr)+");",LogColor.C36)
    LOG("\til2cpp_type_get_name = (char *(*)(const Il2CppType *)) ( soAddr + "+Module.findExportByName(soName,'il2cpp_type_get_name').sub(soAddr)+");",LogColor.C36)
    LOG("\til2cpp_type_get_class_or_element_class = (Il2CppClass *(*)(const Il2CppType *)) ( soAddr + "+Module.findExportByName(soName,'il2cpp_type_get_class_or_element_class').sub(soAddr)+");\n",LogColor.C36)
}

function getClassAddrFromMethodInfo(methodInfo) {    
    return ptr(methodInfo).add(p_size * 3).readPointer()
}

function getClassNameFromMethodInfo(methodInfo) {    
    return getClassName(getClassAddrFromMethodInfo(methodInfo))    
}

/**
 * 通过 methodinfo 找到当前方法的 class 中的所有方法
 * @param {Pointer} methodInfo 
 * @returns 
 */
function listMethodsFromMethodInfo(methodInfo) {    
    if (methodInfo == null || methodInfo == undefined) return    
    var Pcls = ptr(methodInfo).add(p_size * 3).readPointer()    
    showMethodInfo(methodInfo)
    if (Pcls != null) m(Pcls)
}

function showMethodInfo(methodInfo) {

    var methodName = getMethodName(methodInfo)
    var methodPointer = ptr(methodInfo).add(p_size * 0).readPointer()    
    var methodPointerR = methodPointer.sub(soAddr)    
    var Il2CppClass = ptr(methodInfo).add(p_size * 3).readPointer()    
    var clsName = getClassName(Il2CppClass)    
    var clsNamespaze = ptr(Il2CppClass).add(p_size * 3).readPointer().readCString()    
    var Il2CppImage = Il2CppClass.readPointer()
    var imgName = getImgName(Il2CppImage)
    var Il2CppAssembly = ptr(Il2CppImage).add(p_size * 2)    

    LOG("\nCurrent Function " + methodName + "\t" + getMethodParametersCount(methodInfo) + "\t0x" + Number(methodInfo).toString(16) + " ---> " + methodPointer + " ---> " + methodPointerR + "\n", LogColor.C96)
    LOG(methodName + " ---> " + clsName + "(" + Il2CppClass + ") ---> " + (String(clsNamespaze).length == 0 ? " - " : clsNamespaze) + " ---> " + imgName + "(" + Il2CppImage + ") ---> Il2CppAssembly(" + Il2CppAssembly + ")", LogColor.C96)
}

function listFieldsFromMethodInfo(methodInfo, instance) {    
    if (methodInfo == null || methodInfo == undefined) return    
    var Pcls = ptr(methodInfo).add(p_size * 3).readPointer()
    showMethodInfo(methodInfo)
    if (Pcls != null) listFieldsFromCls(Pcls, instance)    
}

function listFieldsFromCls(klass,instance){
    if (klass == undefined || klass == null) return
    klass = ptr(klass)
    if (instance !=undefined) instance = ptr(instance)
    var fieldsCount = getFieldsCount(klass)
    if(fieldsCount <= 0) return
    var is_enum = class_is_enum(klass)
    if (arguments[2] == undefined)        
        LOG("\nFound " + fieldsCount + " Fields" + (is_enum == 0x1 ? "(enum)" : "") + " in class: " + getClassName(klass) + " (" + klass + ")", LogColor.C96)
    // ...\Data\il2cpp\libil2cpp\il2cpp-class-internals.h
    var iter = Memory.alloc(p_size)
    var field = null
    var maxlength = 0
    var arrStr = new Array()
    var enumIndex = 0
    while (field = il2cpp_class_get_fields(klass, iter)) {
        if (field == 0x0) break
        var fieldName = field.readPointer().readCString()
        var filedType = field.add(p_size).readPointer()
        var filedOffset = "0x" + field.add(3 * p_size).readInt().toString(16)        
        var field_class = il2cpp_class_from_type(filedType)
        var fieldClassName = getClassName(field_class)
        var accessStr = fuckAccess(filedType)
        accessStr = accessStr.substring(0, accessStr.length - 1)
        var enumStr = (is_enum && (String(field_class) == String(klass))) ? (enumIndex++ + "\t") : " "
        var retStr = filedOffset + "\t" + accessStr + "\t" + fieldClassName + "\t" + field_class + "\t" + fieldName + "\t" + enumStr
        arrStr.push(retStr)
        maxlength = retStr.length < maxlength ? maxlength : retStr.length        
    }
    LOG("\n" + getLine(maxlength + 5), LogColor.C33)    

    /**
     * mStr[0] offset
     * mStr[1] access flag str
     * mStr[2] field class name
     * mStr[3] field class pointer
     * mStr[4] field name
     */
    arrStr.sort((x,y)=>{
        return parseInt(x.split("\t")[0]) - parseInt(y.split("\t")[0])        
    }).forEach((str,index)=>{
        // 静态变量的值并不在该类中
        if (str.indexOf("static") != -1) str = str.replace("0x0", "---") + "\n"        
        var mStr = str.split("\t")        
        // 值解析
        if (mStr[0].indexOf("---") != 0) {            
            var mName = mStr[2]
            var indexStr = String("[" + index + "]")            
            var indexSP = indexStr.length == 3 ? " " : ""            
            var enumStr = String(mStr[5]).length == 1 ? String(mStr[5] + " ") : String(mStr[5])            
            LOG(indexStr + indexSP + " " + mStr[0] + " " + mStr[1] + " " + mStr[2] + "(" + mStr[3] + ") " + enumStr + " " + mStr[4], LogColor.C36)
            if (instance != undefined){
                var mPtr = ptr(instance).add(mStr[0])
                var realP = mPtr.readPointer()
                var fRet = FuckKnownType(mName, realP, mStr[3])
                // 当它是boolean的时候只保留 最后两位显示
                if (mName == "Boolean") {
                    var header = String(realP).substr(0, 2)                    
                    var endstr = String(realP).substr(String(realP).length - 2, String(realP).length).replace("x", "0")                    
                    var middle = getPoint((Process.arch == "arm" ? 10 : 14) - 2 - 2)
                    realP = header + middle + endstr
                }
                fRet = fRet == "UnKnown" ? (mPtr + " ---> " + realP) : (mPtr + " ---> " + realP + " ---> " + fRet)                
                LOG("\t" + fRet + "\n", LogColor.C90)                
            }
        }
    })
    LOG(getLine(maxlength+5),LogColor.C33)

    function fuckAccess(m_type){
        var attrs = m_type.add(p_size).readPointer()
        var outPut = ""
        var access = attrs & FieldAccess.FIELD_ATTRIBUTE_FIELD_ACCESS_MASK
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

    function getPoint(count) {
        var str = ""
        while (count-- > 0) {
            str += "."
        }
        return str
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
function findClass(imageName,className){
    if (arguments[1] == undefined) {
        // 只填写一个参数的情况 (这里的imageName视作className)
        return func1(arguments[0])
    } else {
        // 填写完整参数的情况
        return func2(arguments[0],arguments[1])
    }

    function func1(className) {
        // 先找缓存
        var retPointer = findclsInCache(className)
        if (retPointer != undefined) return retPointer
        // 正常遍历
        for (let i = 0; i < arr_img_addr.length; i++) {
            const element = arr_img_addr[i]
            retPointer = findcls(element, className)
            if (retPointer != 0) return retPointer
        }
        return retPointer
    }

    function func2(imageName, className, useCache){
        var currentlib = 0
        if (imageName == "") imageName = "Assembly-CSharp"
        arr_img_names.forEach(function(name,index){
            if (name == imageName){
                currentlib = arr_img_addr[index]
            }
        })
        // 第一种使用导出函数查找
        var klass = il2cpp_class_from_name(currentlib, Memory.allocUtf8String(imageName), Memory.allocUtf8String(className))
        // 第二种遍历查找
        if (klass == 0 || klass == undefined) klass = findcls(currentlib, className, useCache)
        return klass
    }

    function findcls(imgPtr, clsName, useCache) {
        var retPtr = ptr(0)
        useCache = (useCache == undefined ? false : true)
        // 为了缓存是否需要遍历所有
        // 如果第一次遍历没有完全，那么第二次查找到第一次已经遍历到了的还挺快，如果超出范围又得重新走一遍遍历，所以默认还是让它第一次遍历所有
        var forAll = true
        // 正常遍历
        for (var j = 0; j < il2cpp_image_get_class_count(imgPtr).toInt32(); j++){
            var il2CppClass = il2cpp_image_get_class(imgPtr, j)
            var clsNameC = getClassName(il2CppClass)
            // cache 中没有的话，就把该条clsptr添加进 findClassCache
            if (useCache && findClassCache.length == 0) LOG("Waitting ...")
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
        for (let index = 0; index < findClassCache.length; index++) {
            if (getClassName(findClassCache[index]) == clsName) return findClassCache[index]
        }
    }
}

/**
 * 获取Unity的一些基本信息
 */
function getUnityInfo(){

    var line20 = getLine(20)
    var retStr = undefined

    Application()
    SystemInfo()
    Time()
    Environment()

    LOG(getLine(60),LogColor.RED)
    
    function Application() {
        
        LOG("------------------- Application -------------------", LogColor.RED)
        
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
        retStr = FuckKnownType("1", callFunction(find_method("UnityEngine.CoreModule", "Application", "get_platform", 0)), findClass("UnityEngine.CoreModule", "RuntimePlatform"))
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
        retStr = FuckKnownType("1", callFunction(find_method("UnityEngine.CoreModule", "Application", "get_internetReachability", 0)), findClass("UnityEngine.CoreModule", "NetworkReachability"))
        if (retStr != undefined) LOG("[*] internetReachability \t: " + retStr + "\n" + line20, LogColor.C36)

        // public static bool get_isMobilePlatform()
        retStr = callFunctionRB(find_method("UnityEngine.CoreModule","Application","get_isMobilePlatform",0))
        if (retStr != undefined) LOG("[*] isMobilePlatform \t\t: " + retStr + "\n" + line20, LogColor.C36)

        // public static bool get_isConsolePlatform()
        retStr = callFunctionRB(find_method("UnityEngine.CoreModule","Application","get_isConsolePlatform"))
        if (retStr != undefined) LOG("[*] isConsolePlatform \t\t: " + retStr + "\n" + line20, LogColor.C36)

        // public static bool get_isEditor()
        retStr = callFunctionRB(find_method("UnityEngine.CoreModule","Application","get_isEditor",0))
        if (retStr != undefined) LOG("[*] isEditor \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

        // public static extern bool get_isPlaying()
        retStr = callFunctionRB(find_method("UnityEngine.CoreModule","Application","get_isPlaying",0))
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
        retStr = FuckKnownType("1", callFunction(find_method("UnityEngine.CoreModule", "Screen", "get_fullScreenMode", 0)), findClass("UnityEngine.CoreModule", "FullScreenMode"))
        if (retStr != undefined) LOG("[*] FullScreenMode \t\t: " + retStr + "\n" + line20, LogColor.C36)
    
        // public static ScreenOrientation get_orientation()
        retStr = FuckKnownType("1", callFunction(find_method("UnityEngine.CoreModule", "Screen", "get_orientation", 0)), findClass("UnityEngine.CoreModule", "ScreenOrientation"))
        if (retStr != undefined) LOG("[*] ScreenOrientation \t\t: " + retStr + "\n" + line20, LogColor.C36)

        // public static extern SystemLanguage get_systemLanguage()
        retStr = FuckKnownType("1", callFunction(find_method("UnityEngine.CoreModule", "Application", "get_systemLanguage", 0)), findClass("UnityEngine.CoreModule", "SystemLanguage"))
        if (retStr != undefined) LOG("[*] SystemLanguage \t\t: " + retStr + "\n" + line20, LogColor.C36)
        
    }
    
    function SystemInfo() {
        
        LOG("------------------- SystemInfo -------------------", LogColor.RED)

        retStr = FuckKnownType("1",callFunction(find_method("UnityEngine.CoreModule","SystemInfo","get_copyTextureSupport",0)),findClass("UnityEngine.CoreModule","CopyTextureSupport"))
        if (retStr != undefined && retStr != "") LOG("[*] copyTextureSupport \t\t: " + retStr + "\n" + line20, LogColor.C36)
        
        retStr = readU16(callFunction(find_method("UnityEngine.CoreModule", "SystemInfo", "get_deviceModel", 0)))
        if (retStr != undefined && retStr !=  "") LOG("[*] deviceModel \t\t: " + retStr + "\n" + line20, LogColor.C36)
        
        retStr = readU16(callFunction(find_method("UnityEngine.CoreModule", "SystemInfo", "get_deviceName", 0)))
        if (retStr != undefined && retStr != "") LOG("[*] deviceName \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = readU16(callFunction(find_method("UnityEngine.CoreModule", "SystemInfo", "get_graphicsDeviceVendor", 0)))
        if (retStr != undefined && retStr != "") LOG("[*] graphicsDeviceVendor \t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = callFunctionRB(find_method("UnityEngine.CoreModule", "SystemInfo", "get_graphicsUVStartsAtTop", 0))
        if (retStr != undefined) LOG("[*] graphicsUVStartsAtTop \t: " + retStr + "\n" + line20, LogColor.C36)
        
        retStr = callFunctionRB(find_method("UnityEngine.CoreModule", "SystemInfo", "get_hasHiddenSurfaceRemovalOnGPU ", 0))
        if (retStr != undefined) LOG("[*] HiddenSurfaceRemovalOnGPU \t: " + retStr + "\n" + line20, LogColor.C36)
        
        // retStr = FuckKnownType("1", callFunction(find_method("UnityEngine.CoreModule", "SystemInfo", "get_graphicsDeviceType", 0)), findClass("UnityEngine.CoreModule", "GraphicsDeviceType"))
        // if (retStr != undefined && retStr != "") LOG("[*] graphicsDeviceType \t\t: " + retStr + "\n" + line20, LogColor.C36)

        retStr = FuckKnownType("1",callFunction(find_method("UnityEngine.CoreModule","SystemInfo","get_deviceType",0)),findClass("UnityEngine.CoreModule","DeviceType"))
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
        
        retStr = FuckKnownType("1",callFunction(find_method("UnityEngine.CoreModule","SystemInfo","get_operatingSystemFamily",0)),findClass("UnityEngine.CoreModule","OperatingSystemFamily"))
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

        console.error("------------------- TIME -------------------")
    
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
        
        LOG("------------------- Environment -------------------", LogColor.RED)
        
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

        retStr = FuckKnownType("1", callFunction(find_method("mscorlib", "OperatingSystem", "get_Platform", 0), callFunction(find_method("mscorlib", "Environment", "get_OSVersion", 0))), findClass("mscorlib", "PlatformID"))
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
function getApkInfo(){
    Java.perform(function(){

        LOG(getLine(100),LogColor.C33)

        var context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext()
        var pkgInfo = context.getPackageManager().getPackageInfo(context.getPackageName(), 0)
        // var appInfo = context.getApplicationInfo()
        var appInfo = pkgInfo.applicationInfo.value
        
        var labelRes = appInfo.labelRes.value
        var strName = context.getResources().getString(labelRes)
        LOG("[*]AppName\t\t"+strName + " (UID:"+appInfo.uid.value + ")\t ID:0x"+(appInfo.labelRes.value).toString(16),LogColor.C36)
        var flags = appInfo.flags.value
        LOG("\t\t\tBackupable -> " + ((flags & 32768) != 0) + "\t"+"Debugable -> " + ((flags & 2) != 0), LogColor.C36)
        
        var str_pkgName = context.getPackageName()
        LOG("\n[*]PkgName\t\t"+str_pkgName,LogColor.C36)

        var verName = pkgInfo.versionName.value
        var targetSdkVersion = pkgInfo.applicationInfo.value.targetSdkVersion.value
        LOG("\n[*]Verison\t\t"+verName + " (targetSdkVersion:"+targetSdkVersion+")",LogColor.C36)

        var appSize = Java.use("java.io.File").$new(appInfo.sourceDir.value).length()
        LOG("\n[*]AppSize\t\t"+appSize +"\t("+(appSize/1024/1024).toFixed(2)+" MB)",LogColor.C36)

        LOG("\n[*]Time\t\t\tInstallTime\t" + new Date(pkgInfo.firstInstallTime.value).toLocaleString(),LogColor.C36)
        LOG("\t\t\tUpdateTime\t" + new Date(pkgInfo.lastUpdateTime.value).toLocaleString(),LogColor.C36)

        var ApkLocation = appInfo.sourceDir.value
        var TempFile = appInfo.dataDir.value
        LOG("\n[*]Location\t\t"+ApkLocation+"\n\t\t\t"+getLibPath()+"\n\t\t\t"+TempFile,LogColor.C36)

        // PackageManager.GET_SIGNATURES == 0x00000040
        var pis = context.getPackageManager().getPackageInfo(str_pkgName, 0x00000040)
        var hexDigist = (pis.signatures.value)[0].toByteArray()
        LOG("\n[*]Signatures\t\tMD5\t "+hexdigest(hexDigist,'MD5')
            +"\n\t\t\tSHA-1\t "+hexdigest(hexDigist,'SHA-1')
            +"\n\t\t\tSHA-256\t "+hexdigest(hexDigist,'SHA-256'),LogColor.C36)
        
        LOG(getLine(100),LogColor.C33)

        // LOG(getMetaData('unity.build-id'))
        function getMetaData(key){
            // public static final int GET_META_DATA = 0x00000080
            var appInfo = context.getPackageManager().getApplicationInfo(context.getPackageName(), 0x00000080)
            var metaData = appInfo.metaData.value
            if(null != metaData) {
                // var metaDataB = Java.cast(metaData,Java.use("android.os.BaseBundle"))
                // LOG(metaDataB.mMap.value)
                return metaData.getString(key)
            }
            return null
        }

        /**
         * 计算byte字节并转换为String返回
         * @param {*} paramArrayOfByte byte 字节
         * @param {*} algorithm 算法 MD5 / SHA-1 / SHA-256
         */
        function hexdigest(paramArrayOfByte, algorithm) {            
            var hexDigits = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102]            
            var localMessageDigest = Java.use("java.security.MessageDigest").getInstance(algorithm)            
            localMessageDigest.update(paramArrayOfByte)            
            var arrayOfByte = localMessageDigest.digest()
            var arrayOfChar = []
            for (var i = 0, j = 0; ; i++, j++){                
                var strLenth = algorithm == "MD5" ? 16 : (algorithm == "SHA-1" ? 20 : 32)                
                if (i >= strLenth) return Java.use("java.lang.String").$new(arrayOfChar)                
                var k = arrayOfByte[i]
                arrayOfChar[j] = hexDigits[(0xF & k >>> 4)]                
                arrayOfChar[++j] = hexDigits[(k & 0xF)]                
            }
        }

        function getLibPath(name) {            
            var retStr = ""
            Java.perform(function () {                
                var context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext()                
                var libPath = context.getApplicationInfo().nativeLibraryDir.value                
                retStr = libPath + "/" + (name == undefined ? "" : name)                
            })
            return retStr
        }
    })
}

/**
 * 用包名启动 APK
 * @param {String}} pkgName 
 */
function launchApp(pkgName) {    
    Java.perform(function(){
        var context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext()
        context.startActivity(Java.use("android.content.Intent").$new(context.getPackageManager().getLaunchIntentForPackage(pkgName)));
    })
}

/**
 * 读取c#字符串
 * @param {Number} mPtr c#字符串指针}
 */
function readU16(mPtr) {
    if (mPtr == 0) return undefined
    return ptr(mPtr).add(p_size*2+4).readUtf16String()
}

/**
 * 生成cstring or c#string
 * @param {String} str 字符串
 * @param {*} type 随意填写 填写了就是C#String 不填写就是CString
 */
function allcStr(str,type){
    return type == undefined ? Memory.allocUtf8String(str) : il2cpp_string_new(Memory.allocUtf8String(str))
}

/**
 * 创建一个vector2/vector3/vector4
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} z 
 * @param {Number} w 
 */
function allcVector(x,y,z,w){
    var defaultV = 0
    var args = 2
    if (z != undefined){
        args = 3
        if (w !=undefined) 
            args = 4
    }
    var temp_vector = Memory.alloc(p_size*args)
    temp_vector.writeFloat(x==undefined?defaultV:x)
    temp_vector.add(p_size).writeFloat(y==undefined?defaultV:y)
    if (args >= 3)temp_vector.add(p_size*2).writeFloat(z)
    if (args == 4)temp_vector.add(p_size*3).writeFloat(w)
    return temp_vector
}

function seeHex() {
    if (arguments[0] == undefined || arguments[0] == 0x0) return
    LOG(hexdump(checkPointer(arguments[0]),{length:length}))
}

function seeHexR(addr,length){
    LOG(hexdump(ptr(soAddr.add(addr).readPointer()),{length:length}))
}

function seeHexA(addr,length){
    LOG(hexdump(ptr(addr),{length:length}))
}

/**
 * 判断mPtr是不是ilbil2cpp.so中的地址,自动加上基址
 * @param {Pointer} mPtr 
 * @returns 
 */
function checkPointer(mPtr) {
    if (mPtr == undefined || mPtr == null || soAddr == null || soAddr == 0) return ptr(0)
    mPtr = ptr(Number(mPtr))
    var mdmap = new ModuleMap((md) => {
        if (md.name = soName) return true
    })
    if (mdmap.has(soAddr.add(mPtr))) return soAddr.add(mPtr)
    return mPtr
}

/**
 * 展示代码上下文
 * @param {Pointer} pointer 指针位置
 * @param {Int} range 展示的范围
 * @param {Int} sign 1:正向 2:反向(小端存储，同IDA)   不填写着以当前pointer为中心位置打印信息
 */
function printCtx(pointer, range, sign, redLine) {    
    if (Process.arch != "arm") return
    if (sign != undefined){
        for (var i = 0; i < range; i++){            
            printLOG(pointer)
        }
        return
    }
    var max = range == undefined ? 5 : (range % 2 == 1 ? (range + 1) : range) / 2    
    var min = range == undefined ? -4 : max - range    
    for (var i = min; i < max; i++){        
        printLOG(pointer)        
    }

    function printLOG(pointer) {        
        var cur_p = ptr(pointer).add(p_size * i)        
        var cur_value = cur_p.readPointer().toString()
        var cur_tmp = Array.from(cur_value.toUpperCase())
        var cur_str = (cur_tmp.length == 10) ? cur_value : ""        
        if (sign == 1){
            cur_str = cur_tmp[2] + cur_tmp[3] + ' ' + cur_tmp[4] + cur_tmp[5] + ' ' + cur_tmp[6] + cur_tmp[7] + ' ' + cur_tmp[8] + cur_tmp[9]
        } else if (sign == 2) {
            cur_str = cur_tmp[8] + cur_tmp[9] + ' ' + cur_tmp[6] + cur_tmp[7] + ' ' + cur_tmp[4] + cur_tmp[5] + ' ' + cur_tmp[2] + cur_tmp[3]
        }
        LOG(cur_p + "\t" + cur_str + "\t" + Instruction.parse(cur_p),            
            (redLine == undefined ? i == 0 : i == redLine) ?                
            LogColor.RED : LogColor.WHITE)        
    }
}

function LOG(str,type){
    if(!LogFlag) return
    if (type == undefined) {
        console.log(str)
        return
    }
    switch(type){
        case LogColor.WHITE     : console.log(str);                             break
        case LogColor.RED       : console.error(str);                           break
        case LogColor.YELLOW    : console.warn(str);                            break
        default: console.log("\x1b[" + type + "m" + str + "\x1b[0m");           break
    }
}

function getLine(length) {    
    var retStr = ""    
    for (var i = 0; i < length; i++) {        
        retStr += "-"        
    }
    return retStr
}

function Toast(msg){
    Java.scheduleOnMainThread(function(){
        var context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext()
        Java.use("android.widget.Toast").makeText(context,Java.use("java.lang.String").$new(msg),1).show()
    })
}

/**
 * 配合HookOnPointerClick()，SetLocalScale()使用以达到动态隐藏gameobj
 * @param {Int} x 模拟点击的x位置
 * @param {Int} y 模拟点击的y位置
 */
function setClick(x,y){
    if (x == undefined || y == undefined) return
    Java.perform(function(){
        var Instrumentation = Java.use("android.app.Instrumentation")
        var SystemClock = Java.use("android.os.SystemClock")
        var MotionEvent = Java.use("android.view.MotionEvent")
        var inst = Instrumentation.$new()
        var downTime = SystemClock.uptimeMillis()
        var downEvent = MotionEvent.obtain(downTime,downTime,0,x,y,0)
        var upTime = SystemClock.uptimeMillis()
        var upEvent = MotionEvent.obtain(upTime,upTime,1,x,y,0)
        inst.sendPointerSync(downEvent)
        inst.sendPointerSync(upEvent)
    })
}

/**
 * 用来确定点击view的位置，配合上面这个函数使用 setClick() 以及 HookOnPointerClick() 使用
 * 启动游戏的时候进行模拟点击，配合HookOnPointerClick()即可确定gameobj，通过修改transform即可实现动态的隐藏一些按钮
 * 这里是针对一些bundle资源的u3d游戏，我们不能方便的去静态修改gameobj可见性,或者是一些其他原因我们不能修改，即可用这个动态修改的思路
 */
function HookMotionEvent(){
    Java.perform(function(){
        Java.use("android.view.View").onTouchEvent.implementation = function(event){
            var ret = this.onTouchEvent(event)
            LOG("\n"+getLine(25)+" onTouchEvent "+getLine(25),LogColor.YELLOW)
            LOG(ret+"\t"+event,LogColor.C36)
            return ret
        }

        Java.use("android.app.Activity").dispatchTouchEvent.implementation = function(event){
            var ret = this.dispatchTouchEvent(event)
            LOG("\n"+getLine(25)+" dispatchTouchEvent "+getLine(25),LogColor.YELLOW)
            LOG(ret+"\t"+event,LogColor.C36)
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
function HideClickedObj(x,y){
    var m_ptr = find_method("UnityEngine.UI","Button","OnPointerClick",1)
    var srcFunc = new NativeFunction(m_ptr,'void',['pointer','pointer','pointer','pointer'])
    Interceptor.revert(m_ptr)
    Interceptor.replace(m_ptr,new NativeCallback(function(arg0,pointerEventData,arg2,arg3){
        srcFunc(arg0,pointerEventData,arg2,arg3)
        if (pointerEventData == 0) return 
        var gameObj = f_get_pointerEnter(pointerEventData)
        // 判断名字后使用这三种方式都可以去掉该对象
        if (getObjName(gameObj) == "Settings Button") {
            // setActive(gameObj,0)
            // var m_transform = new NativeFunction(find_method("UnityEngine.CoreModule","GameObject","get_transform",0),'pointer',['pointer'])(gameObj)
            // SetLocalScale(m_transform,0,0,0)
            destroyObj(gameObj)
        }
    },'void',['pointer','pointer','pointer','pointer']))

    setClick(x,y)
    // B 去断点找到点击事件的处理函数并nop掉
    // 循环调用，出现时destory掉这个gameObj
}

// 打印java堆栈
function PrintStackTrace(){
    console.log("\x1b[36m"+
        Java.use("android.util.Log")
            .getStackTraceString(Java.use("java.lang.Throwable")
            .$new())+"\x1b[0m")
}

// 打印native堆栈
function PrintStackTraceN(ctx){
    console.log("\x1b[36m Called from:\n"+
            Thread.backtrace(ctx,Backtracer.FUZZY)
            .slice(0,6)
            // .reverse()
            .map(DebugSymbol.fromAddress).join("\n")+"\x1b[0m")
}

function SetInt(key,value){
    // var temp_size = 100
    // var header_size = Process.pointerSize*3
    // var str_header = new NativeFunction(cloudProjectIdAddr,'pointer',[])()
    // var temp_k = Memory.alloc(temp_size)
    // var tk = Memory.allocUtf16String(key)
    // Memory.copy(temp_k,str_header,header_size)
    // Memory.copy(temp_k.add(header_size),tk,temp_size - header_size)
    // new NativeFunction(Addr_SetInt,'void',['pointer','int'])(temp_k,value)
    callFunction(find_method("UnityEngine.CoreModule", "PlayerPrefs", "SetInt", 2, true), (allcStr(key, ""), value))
}

function SetFloat(key,value){
    callFunction(find_method("UnityEngine.CoreModule", "PlayerPrefs", "SetFloat", 2, true), allcStr(key, ""), value)
}

function SetString(key,value){
    callFunction(find_method("UnityEngine.CoreModule", "PlayerPrefs", "SetString", 2, true), allcStr(key, ""), allcStr(value, ""))
}

function GetInt(key){
    var ret = callFunctionRI(find_method("UnityEngine.CoreModule", "PlayerPrefs", "GetInt", 2, true, allcStr(key, ""), 0))
    LOG("\n[*] GetInt('"+key+"')\t--->\t"+ret.toInt32()+"\n",LogColor.C95)
}

function GetFloat(key){
    var ret = new NativeFunction(find_method("UnityEngine.CoreModule","PlayerPrefs","GetFloat",2,true),'pointer',['pointer','float'])(allcStr(key,""),0)
    LOG("\n[*] GetFloat('"+key+"')\t--->\t"+ret.toInt32()+"\n",LogColor.C95)
}

function GetString(key){
    var ret = callFunction(find_method("UnityEngine.CoreModule", "PlayerPrefs", "GetString", 1), allcStr(key, ""))
    LOG("\n[*] GetString('"+key+"')\t--->\t"+readU16(ret)+"\n",LogColor.C95)
}

function SetLocalScale(mTransform,x,y,z){
    callFunction(find_method("UnityEngine.CoreModule", "Transform", "set_localScale_Injected", 1), ptr(mTransform), allcVector(x, y, z))
}

function SetLocalPosition(mTransform,x,y,z){
    callFunction(find_method("UnityEngine.CoreModule", "Transform", "set_localPosition_Injected", 1), ptr(mTransform), allcVector(x, y, z))
}

function SetPosition(mTransform,x,y,z){
    callFunction(find_method("UnityEngine.CoreModule", "Transform", "set_Position_Injected", 1), ptr(mTransform), allcVector(x, y, z))
}

function SetLocalRotation(mTransform,x,y,z,w){
    // var set_Rotation_Injected = find_method("UnityEngine.CoreModule","Transform","set_Rotation_Injected",1,true)
    callFunction(find_method("UnityEngine.CoreModule", "Transform", "set_localRotation_Injected", 1), ptr(mTransform), allcVector(x, y, z, w))
}

/**
 * GameObject/Transform
 * @param {Pointer}  
 */
 function getObjName(gameObj){
    return readU16(f_getName(ptr(gameObj)))
}

function gameObjToTransform(transform) {
    return getGameObject(transform)
}

function transformToGameObj(gameObj) {
    return f_getTransform(gameObj)
}

/**
 * getGameObject     transform -> GameObject
 * @param {Pointer}  transform
 */
 function getGameObject(transform){
    return callFunction(find_method("UnityEngine.CoreModule","Component","get_gameObject",0),ptr(transform))
}

function class_is_enum(Pcls) {
    return callFunction(Module.findExportByName("libil2cpp.so","il2cpp_class_is_enum"),Pcls) == 0x1
}

/**
 * getType
 * @param {Pointer}  transform/GameObj/.......
 */
function getType(mPtr, TYPE) {
    var p_type = callFunction(find_method('mscorlib', 'Object', 'GetType', 0), ptr(mPtr))
    var p_name = readU16(callFunction(find_method("mscorlib", "Type", "ToString", 0), ptr(p_type)))
    if (TYPE != undefined) return p_name + "(" + p_type + ")"
    LOG("\nType === > " + p_type + "\n" + "Name === > " + p_name + "\n", LogColor.C36)
}

/**
 * TODO 考虑使用 frida 去去获取 GetComponents 等等操作，便于定位obj上面的脚本名称，后续继续完善
 * @param {Pointer} obj this指针
 * @param {Pointer} type 
 */
function GetComponent(obj, type) {
    return callFunction(find_method('UnityEngine.CoreModule', 'Component', 'GetComponent', 1), ptr(obj), ptr(type))
}

function GetComponentG(obj,type){
    return callFunction(find_method('UnityEngine.CoreModule', 'GameObject', 'GetComponent', 1), ptr(obj), ptr(type))
}

function GetTypeFromHandle(obj){
    return callFunction(find_method('mscorlib', 'Type', 'GetTypeFromHandle', 1), ptr(obj), 0)
}

function HookComponent(){

    HookAddComponent()

    function HookAddComponent(){
        Interceptor.attach(find_method('UnityEngine.CoreModule','GameObject','AddComponent',1),{
            onEnter:function(args){
                this.arg0 = args[0]
                this.arg1 = args[1]
            },
            onLeave:function(ret){
                newLine()
                LOG(" [*] AddComponent ---> G:"+this.arg0 + " T:"+f_getTransform(ptr(this.arg0)) +"("+getObjName(this.arg0)+")"+
                    "\t\t\t("+this.arg1+")"+FuckKnownType('Type',this.arg1),LogColor.C36)
            }
        })
    }

    function HookGetComponent(){
        Interceptor.attach(find_method('UnityEngine.CoreModule','GameObject','GetComponent',1),{
            onEnter:function(args){
                this.arg0 = args[0]
                this.arg1 = args[1]
            },
            onLeave:function(ret){
                newLine()
                LOG(" [*] AddComponent ---> G:"+this.arg0 + " T:"+getTransform(ptr(this.arg0)) +"("+getObjName(this.arg0)+")"+
                    "\t\t\t("+this.arg1+")"+FuckKnownType('Type',this.arg1),LogColor.C36)
            }
        })
    }

    // 间隔时间大于一秒,就用新的一行展示
    function newLine(){
        var current = 0
        Java.perform(()=>{current = Java.use('java.lang.System').currentTimeMillis()})
        if (current - lastTime > 1000){
            console.log("\n")
            lastTime = current
        }
    }
}

function SendMessage(str0, str1, str2) {
    
    // Java 
    Java.perform(function(){
        Java.use("com.unity3d.player.UnityPlayer").UnitySendMessage(str0,str1,str2)
    })

    // Native 好像有点问题 不太行
    // callFunction(Module.findExportByName("libunity.so","UnitySendMessage"),allcStr(str0,1),allcStr(str1,1),allcStr(str2,1))
}

function SendMessageImpl() {

    // IronSourceEvents()
    // MaxSdkCallbacks()
    MoPubManager()
    // TTPluginsGameObject()

    SendMessage('GameAnalytics','OnCommandCenterUpdated','')
    SendMessage('GameAnalytics','OnRemoteConfigsUpdated','')
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
    }

    function MaxSdkCallbacks() {

        SendMessage('MaxSdkCallbacks','ForwardEvent','name=OnSdkInitializedEvent\nconsentDialogState=2\ncountryCode=SG\n')

        SendMessage("MaxSdkCallbacks","ForwardEvent","name=OnRewardedAdDisplayedEvent\nadUnitId=ec1a772e0459f45b")
        SendMessage("MaxSdkCallbacks","ForwardEvent","name=OnRewardedAdReceivedRewardEvent\nrewardAmount=0\nadUnitId=ec1a772e0459f45b\nrewardLabel=")
        SendMessage("MaxSdkCallbacks","ForwardEvent","name=OnRewardedAdHiddenEvent\nadUnitId=ec1a772e0459f45b")
        SendMessage("MaxSdkCallbacks","ForwardEvent","name=OnRewardedAdLoadedEvent\nadUnitId=ec1a772e0459f45b")
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
        SendMessage('MoPubManager','EmitRewardedVideoReceivedRewardEvent','["a44632b619174dfa98c46420592a3756","","0"]')
        SendMessage("MoPubManager", "EmitRewardedVideoClosedEvent", "[\"a44632b619174dfa98c46420592a3756\"]")
    }

    function TTPluginsGameObject() {
        SendMessage("TTPluginsGameObject","OnRewardedAdsShown","")
        SendMessage("TTPluginsGameObject","OnRewardedAdsClosed","{\"shouldReward\":true,\"network\":\"admob-unityads\",\"revenue\":0.00138,\"currency\":\"USD\",\"precision\":\"ESTIMATED\"}")
        SendMessage("TTPluginsGameObject","OnRewardedAdsReady","{\"loaded\":true}")
    }
}

function JNI() {

    // UnityEngine.AndroidJNIModule.AndroidJNI public static Boolean CallBooleanMethod (IntPtr obj,IntPtr methodID,jvalue[] args)
    find_method("UnityEngine.AndroidJNIModule", "AndroidJNI", "CallBooleanMethod", 3, false)
    // UnityEngine.AndroidJNIModule.AndroidJNI public static IntPtr CallObjectMethod (IntPtr obj,IntPtr methodID,jvalue[] args)
    find_method("UnityEngine.AndroidJNIModule", "AndroidJNI", "CallObjectMethod", 3, false)
    // UnityEngine.AndroidJNIModule.AndroidJNI public static IntPtr NewStringUTF (String bytes)
    find_method("UnityEngine.AndroidJNIModule", "AndroidJNI", "NewStringUTF", 1, false)   //c#String to jstring
    
    // UnityEngine.AndroidJNIModule.AndroidJNIHelper   public static IntPtr GetMethodID (IntPtr javaClass,String methodName,String signature)
    find_method("UnityEngine.AndroidJNIModule", "AndroidJNIHelper", "GetMethodID", 3, false)
    // UnityEngine.AndroidJNIModule.AndroidJNIHelper   public static String GetSignature (Object obj)
    find_method("UnityEngine.AndroidJNIModule", "AndroidJNIHelper", "GetSignature", 1, false)
     
    // UnityEngine.AndroidJNIModule.AndroidJNISafe     public static IntPtr CallStaticObjectMethod (IntPtr clazz,IntPtr methodID,jvalue[] args)
    find_method("UnityEngine.AndroidJNIModule", "AndroidJNISafe", "CallStaticObjectMethod", 3, false)
    // UnityEngine.AndroidJNIModule.AndroidJNISafe     public static Boolean CallBooleanMethod (IntPtr obj,IntPtr methodID,jvalue[] args)
    find_method("UnityEngine.AndroidJNIModule", "AndroidJNISafe", "CallBooleanMethod", 3, false)
}

function ADS() {

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

function Pay(){
    // todo google支付相关
    find_method("Assembly-CSharp","Purchaser","BuyProductID",1,false)
}

function Update(){
    // todo 更新相关
    find_method("UnityEngine.UI","CanvasScaler","Update",0,false)
}

function Text(){
    // Text 相关
    HookTrackText()
    // HookGetSetText()

    function HookTrackText(){
        /**
         * 或者使用 find_method('UnityEngine.UI','FontUpdateTracker','TrackText',1,false) 找到 MethodInfo
         * 再使用 b(...) 自动解析参数
         */

        var f_set_text = new NativeFunction(find_method("UnityEngine.UI",'Text','set_text',1),'void',['pointer','pointer'])
        var f_get_text = new NativeFunction(find_method("UnityEngine.UI",'Text','get_text',0),'pointer',['pointer'])
        var TrackText = find_method('UnityEngine.UI','FontUpdateTracker','TrackText',1)
        // var UntrackText = find_method('UnityEngine.UI','FontUpdateTracker','UntrackText',1)

        A(find_method('UnityEngine.UI', 'FontUpdateTracker', 'TrackText', 1), (args) => {
            LOG("TrackText : " + args[0] + "\t" +f_get_text(args[0]) +"\t"+ readU16(f_get_text(args[0])))
        })
    }

    function HookGetSetText(){

        hookGet()
        hookSet()
    
        // 动态替换文字
        var arr_src_str = ['Hold To Run','8082','免费获得','+400','暂停','HEADSHOT']
        var arr_rep_str = ['FuckMusic','-99','','-200²','pause','击中头部']
        
        function hookSet() {
            A(find_method("UnityEngine.UI", 'Text', 'set_text', 1), (args) => {
                LOG("\n"+"called set_text("+args[1]+")\n["+ReadLength(args[1])+"]\t"+readU16(args[1]),LogColor.C33)
                var newP = strReplace(args[1])
                if (newP != 0) args[1] = newP
            })
        }
    
        function hookGet() {
            A(find_method("UnityEngine.UI", 'Text', 'get_text', 0), (args) => { }, (ret) => {
                LOG("\n"+"called "+ret+" = get_text()\n["+ReadLength(ret)+"]\t"+readU16(ret),LogColor.C32)
                var newP = strReplace(ret)
                if (newP != 0) ret.replace(newP)
            })
        }
    
        var memcmp = Module.findExportByName("libc.so", "memcmp")        
        if (memcmp != 0) memcmp = new NativeFunction(memcmp, 'pointer', ['pointer', 'pointer', 'int'])        
        function strReplace(mPtr) {            
            if (mPtr == 0 || memcmp == 0 || arr_src_str.length == 0 || arr_rep_str.length != arr_src_str.length) return ptr(0)            
            for (var i = 0; i < arr_src_str.length; i++){                
                if (memcmp(mPtr.add(p_size * 2 + 4), allcStr(arr_src_str[i], "").add(p_size * 2 + 4), ReadLength(mPtr) * 2) == 0) return allcStr(arr_rep_str[i], "")
            }
            return ptr(0)            
        }
    
        function ReadLength(mPtr) {            
            return ptr(mPtr).add(Process.pointerSize * 2).readPointer().toInt32()            
        }
    
        // called : 0x792adc (0xaaf1d4d0)  --->    public Boolean get_hasBorder ()
        // called : 0x787e10 (0xb61477b0)  --->    public Int32 get_fontSize ()
        // called : 0x787e80 (0xb6147a18)  --->    public Boolean get_richText ()
        // called : 0x787eb0 (0xb6147b20)  --->    public Single get_lineSpacing ()
        // called : 0x787e20 (0xb6147808)  --->    public FontStyle get_fontStyle ()
    }

}

/**
 * U3D中的update会被循环一直调用,这里的目的是让函数跑在ui线程里面
 * B("Update") 拿到函数 update 的 pointer 填入第一个参数
 * @param {Pointer} UpDatePtr 
 * @param {Function} Callback 
 */
function runOnMain(UpDatePtr,Callback){
    if (Callback == undefined || UpDatePtr == undefined) return
    A(UpDatePtr, () => {
        if (Callback != undefined && Callback != null){
                try{
                    Callback()
                }catch(e){
                    LOG(e,LogColor.RED)
                }
                Callback = null
            }
    })
}

/**
 * Unity 事件相关的hook,后续在慢慢更新
 */
function hookEvents(){

    // 事件构造
    A(find_method('UnityEngine.CoreModule', 'UnityAction', '.ctor', 2), (args) => {
        LOG(" [*] .ctor ---> "+ptr(args[2])+"\t--->"+ptr(args[2]).sub(soAddr))
    })

}

function showGameObject(gameObj) {
    
    if (gameObj == undefined) return
    gameObj = ptr(gameObj)
    LOG("--------- GameObject ---------",LogColor.C33)
    LOG("gameObj\t\t--->\t"+gameObj,LogColor.C36)
    if (gameObj == 0) return
    LOG("getName\t\t--->\t"+getObjName(gameObj),LogColor.C36)
    LOG("getLayer\t--->\t"+f_getLayer(gameObj),LogColor.C36)           
    var m_transform = f_getTransform(gameObj)
    LOG("getTransform\t--->\t"+m_transform,LogColor.C36)
    // LOG("getTag\t\t--->\t"+f_getTag(gameObj).add(p_size*3).readUtf16String(),LogColor.C36)
    var debug = true
    var layerNames = ""
    for (var i = 0; i < 10; i++){        
        var spl = layerNames == "" ? "" : " <--- "        
        layerNames = layerNames + spl + readU16(f_getName(m_transform)) + (debug ? "(" + m_transform + ")" : "")        
        m_transform = f_getParent(m_transform)
        if (m_transform == 0) break
    }
    LOG("hierarchy\t--->\t" + layerNames, LogColor.C36)    
}

function showTransform(transform) {    
    LOG("--------- Transform ---------", LogColor.C33)    

    transform = ptr(transform)

    // 保留小数位数
    var toFixedNum = 2

    if (p_getChildCount != 0){
        var childCount = f_getChildCount(transform)
        LOG("childCount\t--->\t" + childCount + "\t(" + getObjName(transform) + ")", LogColor.C36)        
        PrintHierarchy(transform,1,true)
    }

    var eulerAngles_vector3 = allcVector(0,0,0)
    callFunction(find_method("UnityEngine.CoreModule", "Transform", "get_eulerAngles", 0), eulerAngles_vector3, transform)
    LOG("eulerAngles\t(" + eulerAngles_vector3 + ")\t--->\t" + eulerAngles_vector3.readFloat().toFixed(toFixedNum) + "\t" + eulerAngles_vector3.add(p_size).readFloat().toFixed(toFixedNum) + "\t" + eulerAngles_vector3.add(p_size * 2).readFloat().toFixed(toFixedNum), LogColor.C36)

    var forward_vector3 = allcVector(0,0,0)
    callFunction(find_method("UnityEngine.CoreModule", "Transform", "get_forward", 0), forward_vector3, transform)
    LOG("forward\t\t(" + forward_vector3 + ")\t--->\t" + forward_vector3.readFloat().toFixed(toFixedNum) + "\t" + forward_vector3.add(p_size).readFloat().toFixed(toFixedNum) + "\t" + forward_vector3.add(p_size * 2).readFloat().toFixed(toFixedNum), LogColor.C36)

    var Position_vector3 = allcVector(0,0,0)
    callFunction(find_method("UnityEngine.CoreModule", "Transform", "get_position", 0), Position_vector3, transform)
    LOG("position\t(" + Position_vector3 + ")\t--->\t" + Position_vector3.readFloat().toFixed(toFixedNum) + "\t" + Position_vector3.add(p_size).readFloat().toFixed(toFixedNum) + "\t" + Position_vector3.add(p_size * 2).readFloat().toFixed(toFixedNum), LogColor.C36)
    
    var localPosition_vector3 = allcVector(0,0,0)
    callFunction(find_method("UnityEngine.CoreModule", "Transform", "get_localPosition", 0), localPosition_vector3, transform)
    LOG("localPosition\t(" + localPosition_vector3 + ")\t--->\t" + localPosition_vector3.readFloat().toFixed(toFixedNum) + "\t" + localPosition_vector3.add(p_size).readFloat().toFixed(toFixedNum) + "\t" + localPosition_vector3.add(p_size * 2).readFloat().toFixed(toFixedNum), LogColor.C36)
    
    var localRotation_Quaternion = allcVector(0,0,0,0)
    callFunction(find_method("UnityEngine.CoreModule", "Transform", "get_localRotation", 0), localRotation_Quaternion, transform)
    LOG("localRotation\t(" + localRotation_Quaternion + ")\t--->\t" + localRotation_Quaternion.readFloat().toFixed(toFixedNum) + "\t" + localRotation_Quaternion.add(p_size).readFloat().toFixed(toFixedNum) + "\t" + localRotation_Quaternion.add(p_size * 2).readFloat().toFixed(toFixedNum) + "\t" + localRotation_Quaternion.add(p_size * 3).readFloat().toFixed(toFixedNum), LogColor.C36)
    
    var localScale_vector3 = allcVector(0,0,0)
    callFunction(find_method("UnityEngine.CoreModule", "Transform", "get_localScale", 0), localScale_vector3, transform)
    LOG("localScale\t(" + localScale_vector3 + ")\t--->\t" + localScale_vector3.readFloat().toFixed(toFixedNum) + "\t" + localScale_vector3.add(p_size).readFloat().toFixed(toFixedNum) + "\t" + localScale_vector3.add(p_size * 2).readFloat().toFixed(toFixedNum), LogColor.C36)

    var lossyScale_vector3 = allcVector(0,0,0)
    callFunction(find_method("UnityEngine.CoreModule", "Transform", "get_lossyScale", 0), lossyScale_vector3, transform)
    LOG("lossyScale\t(" + lossyScale_vector3 + ")\t--->\t" + lossyScale_vector3.readFloat().toFixed(toFixedNum) + "\t" + lossyScale_vector3.add(p_size).readFloat().toFixed(toFixedNum) + "\t" + lossyScale_vector3.add(p_size * 2).readFloat().toFixed(toFixedNum), LogColor.C36)

    var right_vector3 = allcVector(0,0,0)
    callFunction(find_method("UnityEngine.CoreModule", "Transform", "get_right", 0), right_vector3, transform)
    LOG("right\t\t(" + right_vector3 + ")\t--->\t" + right_vector3.readFloat().toFixed(toFixedNum) + "\t" + right_vector3.add(p_size).readFloat().toFixed(toFixedNum) + "\t" + right_vector3.add(p_size * 2).readFloat().toFixed(toFixedNum), LogColor.C36)

    var up_vector3 = allcVector(0,0,0)
    callFunction(find_method("UnityEngine.CoreModule", "Transform", "get_up", 0), up_vector3, transform)
    LOG("up\t\t(" + up_vector3 + ")\t--->\t" + up_vector3.readFloat() + "\t" + up_vector3.add(p_size).readFloat() + "\t" + up_vector3.add(p_size * 2).readFloat(), LogColor.C36)
    
    var rotation_Quaternion = allcVector(0,0,0,0)
    callFunction(find_method("UnityEngine.CoreModule", "Transform", "get_rotation", 0, true), rotation_Quaternion, transform)
    LOG("rotation\t(" + rotation_Quaternion + ")\t--->\t" + rotation_Quaternion.readFloat() + "\t" + rotation_Quaternion.add(p_size).readFloat() + "\t" + rotation_Quaternion.add(p_size * 2).readFloat() + "\t" + rotation_Quaternion.add(p_size * 3).readFloat(), LogColor.C36)
}

function showEventData(eventData){
    LOG("--------- EventData ---------", LogColor.C33)
    
    eventData = ptr(eventData)
    
    var click_vector2 = allcVector()
    callFunction(find_method("UnityEngine.UI", "PointerEventData", "get_position", 0), click_vector2, eventData)
    LOG("ClickPositon\t--->\t"+click_vector2.readFloat()+"\t"+click_vector2.add(p_size).readFloat(),LogColor.C36)
    
    var f_get_clickTime = new NativeFunction(find_method("UnityEngine.UI", "PointerEventData", "get_clickTime", 0, true), 'float', ['pointer'])
    LOG("clickTime\t--->\t"+f_get_clickTime(eventData),LogColor.C36)

    LOG("clickCount\t--->\t" + callFunction(find_method("UnityEngine.UI", "PointerEventData", "get_clickCount", 0), eventData), LogColor.C36)
    
    var delta_vector2 = allcVector()
    callFunction(find_method("UnityEngine.UI","PointerEventData","get_delta",0),allcVector(),eventData)
    LOG("delta\t\t--->\t"+delta_vector2.readFloat()+"\t"+delta_vector2.add(p_size).readFloat(),LogColor.C36)
}

/**
 * -------------------------------------------拓展方法-------------------------------------------------
 */

/**
 * 很多导出函数的地址第一条都是一个跳转指令，这里的计算以便后面使用InlineHook用到
 * 列举一些我们常用的就是了，其他的也可以自行计算
 */
function getRealAddr(){
    
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

    function getLogByExport(exp){

        var realAddr = 0
        var aimAddr = ptr(Module.findExportByName(soName,exp))
    
        // 使用手动计算偏移加源地址得到目的地址
        // realAddr = aimAddr.add((aimAddr.readPointer() << 8 >> 8)*4 + 8)
        // 使用frida的api Instruction
        realAddr = ptr(Instruction.parse(aimAddr).opStr.split('#')[1])
    
        LOG(getLine(20)+'\n'+exp+' \n\t' 
            + aimAddr +' ('+aimAddr.sub(soAddr)+')\t--->\t' 
            + realAddr +' ('+realAddr.sub(soAddr)+')',LogColor.C96)
    }
}

function GotoScene(str){
    callFunction(find_method("UnityEngine.CoreModule", "SceneManager", "LoadScene", 2), il2cpp_string_new(allcStr(str)))
} 

function setActive(gameObj,visible){
    callFunction(find_method("UnityEngine.CoreModule", "GameObject", "SetActive", 1), ptr(gameObj), visible ? 0x1 : 0x0)
}

function destroyObj(gameObj){
    callFunction(find_method("UnityEngine.CoreModule", "Object", "Destroy", 1), ptr(gameObj))
}

/**
 * @param {int} defaltActive 0 setActive(false) 1 setActive(true) 2 all
 */
function HookSetActive(defaltActive) {    
    if (defaltActive == undefined) defaltActive = 1
    A(find_method("UnityEngine", "GameObject", "SetActive", 1), (args) => {        
        // 过滤反复出现的obj
        if (filterDuplicateOBJ(readU16(f_getName(ptr(args[0])))) == -1) return        
        if (defaltActive == 2 || args[1].toInt32() == defaltActive) {
            LOG("\n"+getLine(38),LogColor.YELLOW)
            LOG("public extern void SetActive( " + (args[1].toInt32() == 0 ? "false" : "true") + " );", LogColor.C36)            
            LOG(getLine(20),LogColor.C33)
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
function filterDuplicateOBJ(objstr, maxCount) {
    if (!outFilterMap.has(objstr)) {
        outFilterMap.set(objstr, 0)
        return 0
    }
    var count = Number(outFilterMap.get(objstr)) + 1
    outFilterMap.set(objstr, count)
    return (count >= (maxCount == undefined ? 10 : maxCount)) ? -1 : count   
}

function HookOnPointerClick() {
    
    A(find_method("UnityEngine.UI", "Button", "OnPointerClick", 1), (args) => {
        LOG("\n"+getLine(38),LogColor.YELLOW)
        LOG("public void OnPointerClick( " + args[0] +" , "+ args[1] + " );", LogColor.C36)
        var pointerEventData = args[1]
        if (pointerEventData == 0) return 
        var gameObj = f_get_pointerEnter(pointerEventData)

        showGameObject(gameObj)

        // showTransform(f_getTransform(gameObj))
        // showEventData(pointerEventData)
    })
   
    // HookOthers()

    // 其他几个时机点
    function HookOthers(){

        HookHandlePointerExitAndEnter()
        move()
        drag()
        set_pointerPress()
        GetPointerData()

        
        function move() {
            A(find_method("UnityEngine.UI", "PointerInputModule", "ProcessMove", 1), (args) => {
                LOG("\n"+getLine(38),LogColor.YELLOW)
                LOG("protected virtual Void ProcessMove( " + (args[1]) + " );", LogColor.C36)                
                var pointerEventData = args[1]
                var gameObj = f_get_pointerEnter(pointerEventData)
                showGameObject(gameObj)
            })
        }
    
        function drag() {
            A(find_method("UnityEngine.UI", "PointerInputModule", "ProcessDrag", 1), (args) => {
                LOG("\n" + getLine(38), LogColor.YELLOW)                
                LOG("protected virtual Void ProcessDrag( " + (args[1]) + " );", LogColor.C36)                
                var pointerEventData = args[1]
                var gameObj = f_get_pointerEnter(pointerEventData)
                showGameObject(gameObj)
            })
        }
    
        function HookHandlePointerExitAndEnter() {
            A(find_method("UnityEngine.UI", "BaseInputModule", "HandlePointerExitAndEnter", 2), (args) => {
                LOG("\n" + getLine(38), LogColor.YELLOW)
                LOG("protected virtual Void HandlePointerExitAndEnter( " + (args[1]) + " , " + (args[2]) + ")", LogColor.C36)                
                var pointerEventData = args[1]                
                var gameObj = f_get_pointerEnter(pointerEventData)                
                showGameObject(args[2])                
                showEventData(pointerEventData)                        
            })
        }
    
        function set_pointerPress() {
            A(find_method("UnityEngine.UI", "PointerEventData", "set_pointerPress", 1), (args) => {
                LOG("\n" + getLine(38), LogColor.YELLOW)
                LOG("protected virtual Void set_pointerPress( " + (args[1]) + " );", LogColor.C36)                
                showGameObject(args[1])                
            })
        }
    
        function GetPointerData(){
            A(find_method("UnityEngine.UI", "PointerInputModule", "GetPointerData", 3), (args) => {
                LOG("\n" + getLine(38), LogColor.YELLOW)
                LOG("protected virtual Void set_pointerPress( " + (args[2]) + " );", LogColor.C36)
                showGameObject(args[1])
                showEventData(args[2])
            })
        }
    }
}

function HookPlayerPrefs(){

    var isShowPrintStack = false

    InterceptorGetFunctions()
    InterceptorSetFunctions()

    function InterceptorGetFunctions(){

        //public static extern float GetFloat(string key, float defaultValue)
        var Addr_GetFloat = find_method("UnityEngine.CoreModule", "PlayerPrefs", "GetFloat", 2, true)
        if (Addr_GetFloat != 0) {        
            Interceptor.attach(Addr_GetFloat, {                
                onEnter: function (args) {                    
                    this.arg0 = args[0]
                    this.arg1 = args[1]                    
                },
                onLeave: function (ret) {                    
                    LOG("\n[*] '" + ret + "' = GetFloat('" + readU16(this.arg0) + "'," + this.arg1 + ")", LogColor.C36)
                    if (isShowPrintStack) PrintStackTraceN(this.context)                    
                }
            })
        }
 
        //public static extern int GetInt(string key, int defaultValue)
        var Addr_GetInt = find_method("UnityEngine.CoreModule", "PlayerPrefs", "GetInt", 2, true)        
        if (Addr_GetInt != 0) {            
            Interceptor.attach(Addr_GetInt, {                
                onEnter: function (args) {                    
                    this.arg0 = args[0]
                    this.arg1 = args[1]
                },
                onLeave: function (ret) {
                    var s_arg0 = readU16(this.arg0)                    
                    var i_arg1 = this.arg1
                    LOG("\n[*] '" + ret.toInt32() + "' = GetInt('" + s_arg0 + "'," + i_arg1 + ")", LogColor.C36)                    
                    if (isShowPrintStack) PrintStackTraceN(this.context)                    
                    if (s_arg0.indexOf("SaleBoughted") != -1) ret.replace(ptr(0x1))                    
                }
            })
        }
        
        //public static string GetString(string key)
        var Addr_GetString = find_method("UnityEngine.CoreModule", "PlayerPrefs", "GetString", 1, true)        
        if (Addr_GetString != 0) {            
            Interceptor.attach(Addr_GetString, {                
                onEnter: function (args) {                    
                    this.arg0 = args[0]                    
                },
                onLeave: function (ret) {                    
                    LOG("\n[*] '" + readU16(ret) + "' = GetString('" + readU16(this.arg0) + "')", LogColor.C36)                    
                    if (isShowPrintStack) PrintStackTraceN(this.context)                    
                }
            })
        }
    }

    function InterceptorSetFunctions(){

        //public static extern float GetFloat(string key, float defaultValue)
        var Addr_SetFloat = find_method("UnityEngine.CoreModule", "PlayerPrefs", "SetFloat", 2, true)        
        if (Addr_SetFloat != 0) {            
            Interceptor.attach(Addr_SetFloat, {                
                onEnter: function (args) {                    
                    this.arg0 = readU16(args[0])                    
                    this.arg1 = (args[1] == 0 ? 0 : args[1].readFloat())                    
                },
                onLeave: function (ret) {                    
                    LOG("\n[*] SetFloat('" + this.arg0 + "'," + this.arg1 + ")", LogColor.C36)                    
                    if (isShowPrintStack) PrintStackTraceN(this.context)                    
                }
            })
        }
        
        //public static extern int GetInt(string key, int defaultValue)
        var Addr_SetInt = find_method("UnityEngine.CoreModule", "PlayerPrefs", "SetInt", 2, true)        
        if (Addr_SetInt != 0) {            
            Interceptor.attach(Addr_SetInt, {                
                onEnter: function (args) {
                    this.arg0 = readU16(args[0])                    
                    this.arg1 = args[1]                    
                },
                onLeave: function (ret) {                    
                    LOG("\n[*] SetInt('" + this.arg0 + "'," + this.arg1 + ")", LogColor.C36)                    
                    if (isShowPrintStack) PrintStackTraceN(this.context)                    
                }
            })
        }

        //public static string GetString(string key)
        var Addr_SetString = find_method("UnityEngine.CoreModule", "PlayerPrefs", "SetString", 2, true)        
        if (Addr_SetString != 0) {            
            Interceptor.attach(Addr_SetString, {                
                onEnter: function (args) {                    
                    this.arg0 = readU16(args[0])
                    this.arg1 = readU16(args[1])
                },
                onLeave: function (ret) {                    
                    LOG("\n[*] SetString('" + this.arg0 + "','" + this.arg1 + "')", LogColor.C36)                    
                    if (isShowPrintStack) PrintStackTraceN(this.context)                    
                }
            })
        }
    }
}

function HookDebugLog() {
    
    A(find_method("UnityEngine.CoreModule","Debug","Log",1,true), (args) => {
        LOG("\n[*] Debug.LOG('"+readU16(args[0])+"')",LogColor.C36)
    })

    A(find_method("UnityEngine.CoreModule","Logger","Log",1,true), (args) => {
        LOG("\n[*] Logger.LOG('"+readU16(args[0])+"')",LogColor.C32)
    })
    
}

function HookLoadScene(){
    var GetActiveScene = find_method("UnityEngine.CoreModule","SceneManager","GetActiveScene",0)
    if (current_scene != 0){
        var current_scene = new NativeFunction(GetActiveScene,'pointer',[])()
        var get_name = new NativeFunction(find_method("UnityEngine.CoreModule","Scene","GetNameInternal",1),'pointer',['int'])
        LOG("\nCurrentScene   --->   "+readU16(get_name(current_scene.toInt32()))+"\n",LogColor.C36)
    }

    A(find_method("UnityEngine.CoreModule", "SceneManager", "LoadScene", 2), (args) => {
        LOG("\nCalled public static Scene LoadScene (String sceneName,LoadSceneParameters parameters)",LogColor.C36)
        LOG(" arg0  --->\t"+args[0]+"\t"+readU16(args[0]),LogColor.C36)
    }, (ret) => {
        LOG(" ret  --->\t"+ret,LogColor.C36)
    })
}

function HookUnityExit() {

    var packageName = ""

    R(find_method("UnityEngine.CoreModule", "Application", "Quit", 0), () => {
        LOG("Called UnityEngine.CoreModule.Application.Quit")
    })
    R(find_method("UnityEngine.CoreModule", "Application", "Quit", 1), () => {
        LOG("Called UnityEngine.CoreModule.Application.Quit")
    })
    R(find_method("UnityEngine.CoreModule", "Application", "Quit", 1), (srcCall) => {
        LOG("SrcPackageName ===> " + readU16(srcCall()))
        return packageName == "" ? srcCall() : allcStr(packageName)
    })
}

/**
 * 打印transform往下的层级
 * ps:不建议打印底层的层级，展现一大篇出来毫无重点
 * @param {Number} mPtr Transform Pointer
 * @param {Number} level 最大显示层级
 * @param {Boolean} inCall 内部调用，去掉LOG的相关判断
 */
function PrintHierarchy(mPtr, level, inCall) {    
    LogFlag = true
    if (mPtr == 0 || mPtr == undefined) return

    if (level == undefined) level = 10    
    var transform = ptr(mPtr)
    
    if (level == 10) LOG(getLine(73) + "\n", LogColor.C33)    
    // 当前level作为第一级
    var baseLevel = getLevel(transform)
    LOG((inCall != undefined ? "\t" : "") + getSpace(0) + transform + " : " + getObjName(transform), LogColor.C36)    
    getChild(transform)

    if (level == 10) LOG("\n" + getLine(73), LogColor.C33)    
    
    // 递归调用下层信息
    function getChild(p1){
        var childCount = f_getChildCount(p1)
        for (var i = 0; i < childCount; i++){            
            var c_transform = f_getChild(p1, i)            
            var levelC = getLevel(c_transform) - baseLevel            
            if (levelC <= level) LOG((inCall != undefined ? "\t" : "") + getSpace(levelC) + c_transform + " : " + readU16(f_getName(c_transform)), LogColor.C36)
            getChild(c_transform)
        }
    }

    // 判断当前transform的层级
    function getLevel(transform) {        
        for (var i = 0; i < 10; i++){            
            try{
                transform = f_getParent(transform)
                if (transform ==0) return i
            }catch(e){
                return 0
            }
        }
        return 0 
    }

    // 根据层级进行首行缩进
    function getSpace(length) {        
        var retStr = ''
        for (var i = 0; i < length; i++){            
            retStr += '\t'
        }
        return retStr
    }
}

/**
 * 根据子Transform的名称来找父Transform的子Transform
 * 配合SetLocalScale()和HookSetActive()使用来动态的去掉页面上的view
 */
function findTransform(mPtr, level, filter) {    
    if (mPtr == 0 || mPtr == undefined) return
    if (level ==undefined) level = 10
    var transform = ptr(mPtr)
    var retStr = ""
    
    var baseLevel = getLevel(transform)
    
    getChild(transform)

    function getChild(p1) {        
        var childCount = f_getChildCount(p1)
        for (var i = 0; i < childCount; i++){            
            var c_transform = f_getChild(p1, i)            
            var levelC = getLevel(c_transform) - baseLevel            
            if (levelC <= level) {                
                var name = readU16(f_getName(c_transform))                
                // LOG(c_transform+" ---> "+name)
                if (filter == name){
                    retStr = c_transform
                }
            }
            getChild(c_transform)
        }
    }

    function getLevel(transform) {
        for (var i = 0; i < 10; i++){
            try{
                transform = f_getParent(transform)
                if (transform ==0) return i
            }catch(e){
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
function canUseInlineHook(mPtr,Type){
    mPtr = checkPointer(mPtr)
    if (Type == undefined) Type = 0

    if (Type == 0) return getNextB(mPtr) > 3
    if (Type == 1) return getNextB(mPtr)
    if (Type == 2) return ptr(recommandInlineHook(mPtr))
    if (Type == 3) return ptr(recommandInlineHook(mPtr)).sub(soAddr)

    function getNextB(mPtr){
        mPtr = ptr(mPtr)
        var count = 0
        do {
            var str = Instruction.parse(mPtr).mnemonic
            mPtr = mPtr.add(p_size)
            count++
        } while (str != "b" && str != "bl" && str != "blx" && str != "ret")
        return count
    }

    function recommandInlineHook(mPtr){
        var index = getNextB(ptr(mPtr))
        return index > 3 ? mPtr : ptr(Instruction.parse(mPtr.add(p_size*(index-1))).opStr.split("#")[1]).sub(soAddr)
    }
}

// 有些时候遇到的游戏数据的保存会出现问题,只能整体的保存类(其实用处不大,涉及到存储的是指针就用不了了)
class MemoryUtil {

    /**
     * 指定mPtr开始,保存长度为size的大小到本地文件
     */
    static Save(mPtr,size,fileName){
        var soAddr = Module.findBaseAddress(soName) 
        var path = readU16(new NativeFunction(find_method("UnityEngine.CoreModule","Application","get_persistentDataPath",0),'pointer',[])())+"/"+ (fileName==undefined?"lzy.dat":fileName)
        var fopen = new NativeFunction(Module.findExportByName(null,'fopen'),'pointer',['pointer','pointer'])
        var fwrite = new NativeFunction(Module.findExportByName(null,'fwrite'),'pointer',['pointer','int','int','pointer'])
        var fclose = new NativeFunction(Module.findExportByName(null,'fclose'),'int',['pointer'])
        var stream = fopen(allcStr(path),allcStr("w"))
        Memory.protect(ptr(mPtr),size,'rwx')
        fwrite(ptr(mPtr),1,size,ptr(stream))
        fclose(stream)
    }
    /**
     * 从指定文件,加载长度为size的大小到mPtr
     */
    static Load(mPtr,size,fileName){
        var soAddr = Module.findBaseAddress(soName)
        var path = readU16(new NativeFunction(find_method("UnityEngine.CoreModule","Application","get_persistentDataPath",0),'pointer',[])())+"/"+ (fileName==undefined?"lzy.dat":fileName)
        var fopen = new NativeFunction(Module.findExportByName(null,'fopen'),'pointer',['pointer','pointer'])
        var fread = new NativeFunction(Module.findExportByName(null,'fread'),'pointer',['pointer','int','int','pointer'])
        var fclose = new NativeFunction(Module.findExportByName(null,'fclose'),'int',['pointer'])
        var stream = fopen(allcStr(path),allcStr("r"))
        Memory.protect(ptr(mPtr),size,'rwx')
        fread(ptr(mPtr),1,size,ptr(stream))
        fclose(stream)
    }
}

/**
 * 使用系统 8.1  R7即为中断号
 * 参考 https://bbs.pediy.com/thread-268086.htm
 */
function fuckSVC() {
    var LIBC = "libc.so"
    var syscall = Module.findExportByName(LIBC,"syscall")
    LOG("\nsyscall addr = " + syscall + "\n",LogColor.C92)
    var endFuncOff = 0x0
    var svcOff = 0x0
    for (var p = 0; p < 20; p++){
        if (Instruction.parse(syscall.add(p_size * p)).mnemonic == "svc") svcOff = p 
        if (Instruction.parse(syscall.add(p_size * p)).mnemonic == "b") {
            endFuncOff = p + 1
            break
        }
    }
    printCtx(syscall, endFuncOff, 2, svcOff)
    
    var svcAddr = syscall.add(svcOff * p_size)
    LOG("\nsvc addr = " + syscall.add(svcOff * p_size) + "\n", LogColor.C92)
    
    var arr_context = new Array()
    A(svcAddr, (args) => {
        if (filterDuplicateOBJ(String(this.context.r7), 10 ,false) != -1) {
            LOG("\n---------------------------------------------",LogColor.YELLOW)
            arr_context.length = 0
            // R7 中断号 参考 unistd-common.h 
            LOG("R7:" + this.context.r7,LogColor.C94)
            LOG("sp:" + this.context.sp+ "\t" + "pc:" + this.context.pc,LogColor.C94)
            LOG("R0:" + this.context.r0)
            LOG("R1:" + this.context.r1)
            LOG("R2:" + this.context.r2)
            LOG("R3:" + this.context.r3)
            arr_context.push(this.context.r0)
            arr_context.push(this.context.r1)
            arr_context.push(this.context.r2)
            arr_context.push(this.context.r3)
            // LOG(JSON.stringify(arr_context))
        }
    })
}

var newThreadCallBack = () => { }
var newThreadDelay = 0
var LshowLOG = false
var newThreadSrcCallBack = new NativeCallback(() => {
    if (LshowLOG) LOG("\nEnter new Thread pid:" + f_getpid() + " tid:" + f_gettid(), LogColor.C36)
    while (newThreadDelay-- > 0) {
        if (LshowLOG) LOG("Sleep -> " + newThreadDelay + " secs", LogColor.C94)
        Thread.sleep(1)
    }
    if (LshowLOG) LOG("Called newThreadCallBack", LogColor.C34)
    newThreadCallBack()
    return ptr(0)
}, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer'])

function RunOnNewThread(callback, delay, showLOG) {
    newThreadCallBack = callback
    LshowLOG = showLOG
    if (delay != undefined) newThreadDelay = delay
    if (p_pthread_create == null || p_gettid == null || p_getpid == null) {
        LOG("Fail to init thread",LogColor.RED)
        return
    }
    callFunction(p_pthread_create, Memory.alloc(p_size), ptr(0), newThreadSrcCallBack, ptr(0))
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
function getJclassName(jclsName, ShouldRet, delaySec) {
    ShouldRet == undefined ? false : true
    var pVoid = callFunction(DecodeJObject, ArtCurrent, jclsName)
    var k_class = callFunction(GetDescriptor, pVoid, Memory.alloc(p_size))
    if (ShouldRet) return String(ptr(k_class).readCString())
    LOG("\n" + String(ptr(k_class).readCString())+"\n", LogColor.C36)
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
function getJNIFunction(index) {
    return frida_env.handle.readPointer().add(index * p_size).readPointer()
}
