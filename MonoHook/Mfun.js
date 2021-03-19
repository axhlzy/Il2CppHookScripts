/**
 * @Author lzy <axhlzy@live.cn>
 * @HomePage https://github.com/axhlzy
 * @CreatedTime 2021/01/31 15:30
 * @UpdateTime 2021/03/19 17:34
 * @Des frida hook mono functions scrpt
 */

const soName = "libmono.so"
const p_size = Process.pointerSize
var LogFlag = true
var count_method_times
const maxCallTime = 20

//声明libmono.so需要的函数
var mono_thread_attach,mono_get_root_domain,mono_class_from_name,mono_image_loaded,mono_class_get_method_from_name,mono_signature_get_params,
mono_runtime_invoke,mono_compile_method,mono_class_num_methods,mono_class_get_methods,mono_class_get_name,mono_method_signature,
mono_type_get_name,mono_assembly_foreach,mono_assembly_get_image,mono_image_get_name,mono_unity_get_all_classes_with_name_case,
mono_image_get_table_rows,mono_class_get
//声明libc.so需要的函数
var fopen,fwrite,fclose,system
//记录image信息
var arr_imgs_name = new Array()
var arr_imgs_addr = new Array()
//记录需要断点的函数信息
var arrayAddr = new Array()
var arrayName = new Array()

setImmediate(function(){Module.findBaseAddress(soName) == null ? Hook_dlopen() : InitFunctions()})

function InitFunctions(){

    mono_thread_attach              = new NativeFunction(Module.findExportByName(soName,"mono_thread_attach"),'pointer',['pointer'])
    mono_get_root_domain            = new NativeFunction(Module.findExportByName(soName,"mono_get_root_domain"),'pointer',[])
    mono_class_from_name            = new NativeFunction(Module.findExportByName(soName,"mono_class_from_name"),'pointer',['pointer','pointer','pointer'])
    mono_class_get_method_from_name = new NativeFunction(Module.findExportByName(soName,"mono_class_get_method_from_name"),'pointer',['pointer','pointer','int'])
    mono_image_loaded               = new NativeFunction(Module.findExportByName(soName,"mono_image_loaded"),'pointer',['pointer'])
    mono_runtime_invoke             = new NativeFunction(Module.findExportByName(soName,"mono_runtime_invoke"),'pointer',['pointer','pointer','pointer','pointer'])
    mono_compile_method             = new NativeFunction(Module.findExportByName(soName,"mono_compile_method"),'pointer',['pointer'])
    mono_class_num_methods          = new NativeFunction(Module.findExportByName(soName,"mono_class_num_methods"),'int',['pointer'])
    //MonoMethod *mono_class_get_methods       (MonoClass* klass, void **iter);
    mono_class_get_methods          = new NativeFunction(Module.findExportByName(soName,"mono_class_get_methods"),'pointer',['pointer','pointer'])
    mono_class_get_name             = new NativeFunction(Module.findExportByName(soName,"mono_class_get_name"),'pointer',['pointer'])
    //MonoMethodSignature* mono_method_signature      (MonoMethod *method);
    mono_method_signature           = new NativeFunction(Module.findExportByName(soName,"mono_method_signature"),'pointer',['pointer'])
    //MonoType* mono_signature_get_params      (MonoMethodSignature *sig, void **iter);
    mono_signature_get_params       = new NativeFunction(Module.findExportByName(soName,"mono_signature_get_params"),'pointer',['pointer','pointer'])
    //char* mono_type_get_name         (MonoType *type);
    mono_type_get_name              = new NativeFunction(Module.findExportByName(soName,"mono_type_get_name"),'pointer',['pointer'])
    //void mono_assembly_foreach    (MonoFunc func, void* user_data);
    mono_assembly_foreach           = new NativeFunction(Module.findExportByName(soName,"mono_assembly_foreach"),'void',['pointer','pointer'])
    //MonoImage    *mono_assembly_get_image  (MonoAssembly *assembly);
    mono_assembly_get_image         = new NativeFunction(Module.findExportByName(soName,"mono_assembly_get_image"),'pointer',['pointer'])
    mono_image_get_name             = new NativeFunction(Module.findExportByName(soName,"mono_image_get_name"),'pointer',['pointer'])
    //unsigned mono_unity_get_all_classes_with_name_case (MonoImage *image, const char *name, MonoClass **classes_ref, unsigned *length_ref)
    mono_unity_get_all_classes_with_name_case =  new NativeFunction(Module.findExportByName(soName,"mono_unity_get_all_classes_with_name_case"),'pointer',['pointer','pointer','pointer','pointer'])
    mono_image_get_table_rows       = new NativeFunction(Module.findExportByName(soName,"mono_image_get_table_rows"),'int',['pointer','int'])
    //MonoClass *mono_class_get             (MonoImage *image, uint32_t type_token);
    mono_class_get                  = new NativeFunction(Module.findExportByName(soName,"mono_class_get"),'pointer',['pointer','int'])

    fopen   = new NativeFunction(Module.findExportByName("libc.so", "fopen"), "pointer", ["pointer", "pointer"])
    fwrite  = new NativeFunction(Module.findExportByName("libc.so", "fwrite"), "int", ["pointer",'int','int', "pointer"])
    fclose  = new NativeFunction(Module.findExportByName("libc.so", "fclose"), "int", ["pointer"])
    system  = new NativeFunction(Module.findExportByName("libc.so","system"),"pointer",["pointer"])

    LogFlag = false
    InitImage()
    LogFlag = true

    setTimeout(function(){mono_thread_attach(mono_get_root_domain())},2000)
}

function Hook_dlopen() {
    var HookFlag = false
    const dlopen_old = Module.findExportByName(null, "dlopen")
    const dlopen_new = Module.findExportByName(null, "android_dlopen_ext")
    if (dlopen_old != null) {
        Interceptor.attach(dlopen_old, {
            onEnter: function (args) {
                if (!HookFlag){
                    var l_soName = args[0].readCString()
                    console.log(l_soName)
                    if (l_soName.indexOf(soName) != -1) {
                        this.hook = true
                        HookFlag = true
                    }
                }
            },
            onLeave: function (retval) {
                if (this.hook) {
                    console.warn("\nLoaded "+soName)
                    todo()
                }
            }
        })
    }

    if (dlopen_new != null) {
        Interceptor.attach(dlopen_new, {
            onEnter: function (args) {
                if (!HookFlag){
                    var l_soName = args[0].readCString()
                    console.log(l_soName)
                    if (l_soName.indexOf(soName) != -1) {
                        this.hook = true
                        HookFlag = true
                    }
                }
            },
            onLeave: function (retval) {
                if (this.hook) {
                    console.warn("\nLoaded "+soName)
                    todo()
                }
            }
        })
    }

    function todo(){
        HookMono()
        InitFunctions() 
    }
       
}

function InitImage(){
    arr_imgs_name.splice(0,arr_imgs_name.length)
    arr_imgs_addr.splice(0,arr_imgs_addr.length)
    //typedef void	(*MonoFunc)	(void* data, void* user_data);
    mono_assembly_foreach(new NativeCallback(function(data,user_data){
        var ptrName = mono_image_get_name(mono_assembly_get_image(data))
        var imgName = ptrName.readCString()
        var ptrImg = mono_image_loaded(ptrName)
        arr_imgs_name.push(imgName)
        arr_imgs_addr.push(ptrImg)
    },'void',['pointer','pointer']),NULL)
}

/**
 * 启动时候Hook mono_image_open_from_data_with_name 记录dll的起始位置，名称
 */
function HookMono() {
    //MonoImage *mono_image_open_from_data_with_name (char *data, uint32_t data_len, mono_bool need_copy,MonoImageOpenStatus *status, mono_bool refonly, const char *name);
    Interceptor.attach(Module.findExportByName(soName,"mono_image_open_from_data_with_name"), {
        onEnter: function (args) {
            this.name = args[5].readCString()
            this.size = args[1].toInt32()
        },
        onLeave: function (ret) {
            var t_ret = ret
            LOG("[*] "+t_ret + "\t"+this.name,LogColor.C36)
            var t_arr = this.name.split("/")
            var t_name = t_arr[(t_arr.length)-1].split(".dll")[0]
            arr_imgs_addr.push(String(t_ret))
            arr_imgs_name.push(t_name)
        }
    });
}

function f(imageName,NameSpace,className,FunctName,argsCount){
    find_method(imageName,NameSpace,className,FunctName,argsCount,true)
}

/**
 * List Images
 */
function i(filterName){
    LOG(getLine(50),LogColor.C33)
    if (filterName == undefined) filterName = ""
    arr_imgs_name.filter(function(value){
        return value.indexOf(filterName)!=-1
    }).forEach(function(value,index){
        LOG("[*] "+arr_imgs_addr[index]+"\t"+value,LogColor.C36)
    })
    LOG(getLine(50),LogColor.C33)
}

/**
 * Image to classes
 */
function c(image,filterName){
    list_classes(image,undefined,filterName == undefined ? "" : filterName)
}

/**
 * List Methods
 * @param {*} klass 
 */
function m(klass,sign){
    var iter_methods = Memory.alloc(p_size)
    var method = NULL
    klass = ptr(klass)
    var count_methods = mono_class_num_methods(klass)
    if (count_methods == 0) return 
    if (sign==undefined) LOG(getLine(85),LogColor.C33)
    var arr_temp_name = new Array()
    var arr_temp_addr = new Array()
    try{
        //解析方法
        while (!(method = mono_class_get_methods(klass, iter_methods)).isNull()) {
            var methodName = getMethodName(method)
            var signature = mono_method_signature(method)
            var typeParams = NULL
            //解析参数
            var iter_sign = Memory.alloc(p_size)
            var argsStr = ""
            var argsCount = 0
            while (!(typeParams = mono_signature_get_params(signature,iter_sign)).isNull()) {
                argsStr += mono_type_get_name(typeParams).readCString() + " args["+String(argsCount++)+"],"
            }
            argsStr = argsStr.substr(0,argsStr.length-1)
            var strMethod = methodName+" ("+argsStr+")"
            //这个函数可能会卡死，所以不建议大批量断点，建议有筛选的去断定指定class或者指定方法的断点
            var addrMethod = mono_compile_method(method)
            LOG("[*] "+method+"\t"+addrMethod+"\t"+strMethod,LogColor.C36)
            arr_temp_name.push(strMethod)
            arr_temp_addr.push(addrMethod)
        }
    }catch(e){}
    LogFlag = true
    if (sign !=undefined) return [arr_temp_name,arr_temp_addr]
    LOG(getLine(40),LogColor.C33)
    LOG("count_methods : "+count_methods,LogColor.C33)
    LOG(getLine(85),LogColor.C33)
}

/**
 * addBreakPoints
 * @param {*} imgOrCls 
 */
function a(imgOrCls){
    imgOrCls = ptr(imgOrCls)
    var method_count = 0
    //判断是image还是class
    LOG(getLine(85),LogColor.C33)
    if (String(arr_imgs_addr).indexOf(String(imgOrCls))!=-1){
        var img = imgOrCls
        var ret_arr = list_classes(img,"")
        ret_arr.forEach(function(value,index){
            var ret = m(value,"")
            if (ret == undefined || ret == 0x0) {
                LOG('Error At function a(imgOrCls) + 11 lines',LogColor.RED)
                return
            }
            arrayName = arrayName.concat(ret[0])
            arrayAddr = arrayAddr.concat(ret[1])
            method_count += ret[0].length
        })
    }else{
        var cls = imgOrCls
        var ret = m(cls,"")
        if (ret == undefined || ret == 0x0) {
            LOG('Error At function a(imgOrCls) + 22 lines',LogColor.RED)
            return
        }
        arrayName = arrayName.concat(ret[0])
        arrayAddr = arrayAddr.concat(ret[1])
        method_count += ret[0].length
    }
    
    LOG("------------------------------------------",LogColor.C33)
    LOG("  Added "+method_count+" Methods    |    All "+arrayAddr.length,LogColor.RED)
    LOG(getLine(85),LogColor.C33)
}

function B(filter){
    breakPoints(filter)
}

function d(){
    Interceptor.detachAll()
}

/**
 * 获得 MonoMethod
 * find_method("UnityEngine","UnityEngine","Application","get_identifier",0)
 * find_method("UnityEngine",'UnityEngine','Debug',"LogError",1,true)
 * @param {String}  imageName 
 * @param {String}  nameSpace 
 * @param {String}  className 
 * @param {String}  functName 
 * @param {Int}     argsCount 
 * @param {Boolean} showDetail 
 */
function find_method(imageName,nameSpace,className,functName,argsCount,showDetail){
    if (imageName==undefined ||nameSpace==undefined||className==undefined||functName==undefined) return ptr(0)
    if (argsCount == undefined) argsCount = -1
    if (showDetail == undefined) showDetail = false
    
    // mono_thread_attach(mono_get_root_domain())
    var p_image = getImageByName(imageName) == 0 ? mono_image_loaded(allcStr(imageName)) : getImageByName(imageName)
    var p_class = mono_class_from_name(ptr(p_image),allcStr(nameSpace),allcStr(className))
    var p_method = mono_class_get_method_from_name(p_class,allcStr(functName),argsCount)

    if (!showDetail) return mono_compile_method(p_method)

    LOG(getLine(85),LogColor.C33)
    LOG("MonoImage\t---->\t"+p_image,LogColor.C36)
    LOG("MonoClass\t---->\t"+p_class,LogColor.C36)
    LOG("MonoMethod\t---->\t"+p_method + " ("+getMethodName(p_method)+")",LogColor.C36)
    LOG("MethodPointer\t---->\t"+mono_compile_method(p_method),LogColor.C36)
    LOG(getLine(85),LogColor.C33)
}

function list_classes(image,sign,filterName){
    //参考源码 metadata/unity-utils.c/mono_unity_get_all_classes_with_name_case
    image = ptr(image)
    var filterCount = 0
    if (sign!=undefined) LogFlag = false
    var cls_size = mono_image_get_table_rows(image,2)
    if (cls_size == 0) return
    LOG(getLine(60),LogColor.C33)
    var arr_temp_addr = new Array()
    for (var i=0;i<cls_size;++i){
        var klass = mono_class_get(image, (i + 1)|0x02000000)
        var name = getClassName(klass)
        if (name.indexOf(filterName)!=-1) {
            LOG("[*] " + klass +"\t"+name,LogColor.C36)
            filterCount ++ 
        }
        arr_temp_addr.push(klass)
    }
    LogFlag = true
    if (sign!=undefined) return arr_temp_addr
    LOG(getLine(30),LogColor.C33)
    var strFilterCount = ""
    if (filterName != "") strFilterCount = "\t|\t Filter "+filterCount
    LOG("Classes count "+cls_size +strFilterCount,LogColor.C33)
    LOG(getLine(60),LogColor.C33)
}

function breakPoints(filter){
    // Interceptor.detachAll()
    if (arrayName.length != arrayAddr.length){
        LOG("（arrayName.lenth = "+ arrayName.lenth +"） ≠ （arrayAddr.length = "+arrayAddr.length+")")
        return
    }
    var t_arrayName = new Array()
    var t_arrayAddr = new Array()
    if (filter == undefined || filter == ""){
        t_arrayName = arrayName
        t_arrayAddr = arrayAddr
    }else{
        arrayName.forEach(function(value,index){
            if (value.indexOf(filter)!=-1){
                t_arrayName.push(value)
                t_arrayAddr.push(arrayAddr[index])
            }
        })
    }

    count_method_times = new Array(t_arrayName.length)
    for(var t =0;t<t_arrayAddr.length;t++){
        count_method_times[t] = Number(1)
    }

    t_arrayAddr
        .forEach(function(value,index){
            LOG("-------------------------",LogColor.C90)
            LOG('currentAddr:' + value + "\t"+t_arrayName[index],LogColor.C32)
            try{
                funcTmp(value,index,t_arrayName)
            }catch(e){
                funcTmp(value.add(1),index,t_arrayName)
            }            
            LOG("\t\t---->"+index+"\t"+" is prepared ",LogColor.C33)
        })
    LOG("------------------------------------------",LogColor.C33)
    LOG("  Added "+t_arrayAddr.length+" BreakPoints    |    All "+arrayAddr.length,LogColor.RED)
    LOG("-------------------------------------------------------------------------------------",LogColor.C33)

    function funcTmp(currentAddr,index,arrayName){
        try{
            Interceptor.attach(currentAddr, {
                onEnter: function(args){
                    if(++count_method_times[index] < maxCallTime){
                        LOG("called : "+arrayAddr[index]+"\t--->\t"+arrayName[index] +"\n",LogColor.C36)
                    }
                },
                onLeave: function(retval){
    
                }
            })
        }catch(e){
            LOG(e,LogColor.C91)
        }
    }
}

/**
 * 针对静态无参数方法只需要传一个method指针就好
 * @param {*} monoMethod    method to invoke
 * @param {*} obj           object instance （obj is the this pointer, it should be NULL for static methods, a MonoObject* for object instances and a pointer to the value type for value type）
 * @param {*} params        arguments to the method
 * @param {*} monoObject    exception information
 */
function invoke(monoMethod, obj, params,monoObject){
    obj = obj == undefined ? NULL : obj
    params = params == undefined ? NULL : params
    monoObject = monoObject == undefined ? NULL : monoObject
    return mono_runtime_invoke(ptr(monoMethod),obj,params,monoObject) 
}

function TestAttach(){

    HookMonoMethod("UnityEngine",'UnityEngine','Debug',"LogError",1,{
        onEnter:function(args){
            LOG(readU16(args[0]))
            Toast(readU16(args[0]))
        },
        onLeave:function(ret){
            
        }
    })
}

function Toast(msg){
    Java.scheduleOnMainThread(function(){
        var context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext()
        Java.use("android.widget.Toast").makeText(context,Java.use("java.lang.String").$new(msg),1).show()
    })
}

function HookMonoMethod(imageName,NameSpace,className,FunctName,argsCount,callbacks) {
    var mPtr = find_method(imageName,NameSpace,className,FunctName,argsCount)
    Interceptor.attach(ptr(mPtr),callbacks)
}

function printCtx(pointer,range,sign){
    if (sign != undefined){
        for (var i = 0;i<range;i++){
            printLOG(pointer)
        }
        return
    }
    var max = range == undefined ? 5 : (range%2==1 ? (range + 1 ) : range) /2
    var min = range == undefined ? -4 : max - range
    for (var i = min;i<max;i++){
        printLOG(pointer)
    }

    function printLOG(pointer){
        var cur_p = ptr(pointer).add(p_size*i)
        LOG(cur_p+"\t"+cur_p.readPointer()+"\t"+Instruction.parse(cur_p),i==0?LogColor.RED:LogColor.WHITE)
    }
}

function getClassName(mPtr){
    return mono_class_get_name(ptr(mPtr)).readCString()
}

function getMethodName(mPtr){
    return mPtr.add(2+2+4+p_size*2).readPointer().readCString()
}

function getMethodSignature(mPtr){
    /**
     * struct _MonoMethod {
	 * guint16 flags;
	 * guint16 iflags;
	 * guint32 token;
	 * MonoClass *klass; 
	 * MonoMethodSignature *signature;
	 * const char *name;
     * ......
     * }
     */
    return mPtr.add(2+2+4+p_size*1).readPointer()
}

function readU16(mPtr){
    return ptr(mPtr).add(p_size*2+4).readUtf16String()
}

function getLine(length){
    var retStr = ""
    for (var i=0;i<length;i++) {
        retStr += "-"
    }
    return retStr
}

function getPackageName(){
    var pkgname = NULL
    Java.perform(function(){
        var context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext()
        pkgname = context.getPackageName()
    })
    return pkgname
}

/**
 * 从内存指定位置读取指定长度并写入指定文件目录
 * @param {String}  path    存放路径
 * @param {String}  name    文件名
 * @param {Number}  mPtr    内存起始位置
 * @param {Number}  length  内存区域的长度
 */
function writeFile(path,name,mPtr,length) {

    system(allcStr("mkdir -p "+path))
    var filename = allcStr(path+"/"+name+".dll")
    var open_mode = allcStr("a")
    var file = fopen(filename, open_mode)
    fwrite(mPtr,1,length,file)
    fclose(file)
}

function getImageByName(name){
    for (var i=0;i<arr_imgs_name.length;i++){
        if (arr_imgs_name[i] == name) return arr_imgs_addr[i]
    }
    return ptr(0)
}

/**
 * path1 sdcard 需要读写权限
 */
function DumpDll(){
    if (arr_imgs_addr.length == 0) return 

    var path1 = "/sdcard/DLL/"+getPackageName()
    var context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext()
    var pkgInfo = context.getPackageManager().getPackageInfo(context.getPackageName(), 0)
    var appInfo = pkgInfo.applicationInfo.value
    var path2 = appInfo.dataDir.value

    var TitleTip = "\nStart dump dll and save files to "+path2+"/\n"
    LOG(getLine(TitleTip.length)+TitleTip+getLine(20),LogColor.C33)
    
    arr_imgs_addr.forEach(function(value,index){
        var name = arr_imgs_name[index]
        var mPtr = ptr(value).add(p_size*2).readPointer()
        var length = ptr(value).add(p_size*3).readPointer().toInt32()
        LOG(mPtr+"\t"+length+"\t"+name,LogColor.C36)
        writeFile(path2,name,mPtr,length)
    })
    LOG(getLine(TitleTip.length),LogColor.C33)
}

function getLibPath(name){
    var retStr = ""
    Java.perform(function(){
        var context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext()
        var libPath = context.getApplicationInfo().nativeLibraryDir.value
        retStr =  libPath +"/"+ (name == undefined ? "" : name)
    })
    return retStr
}

function allcStr(str,type){
    return type == undefined ? Memory.allocUtf8String(str) : mono_string_new(mono_get_root_domain(),Memory.allocUtf8String(str))
}

function seeHexR(addr,length){
    LOG(hexdump(ptr(soAddr.add(addr).readPointer()),{length:length}))
}

function seeHexA(addr,length){
    LOG(hexdump(ptr(addr),{length:length}))
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
        default                 : console.log("\x1b["+type+"m"+str+"\x1b[0m");  break
    }
}

var LogColor = {
    WHITE:0,RED:1,YELLOW:3,
    C31:31,C32:32,C33:33,C34:34,C35:35,C36:36,
    C41:41,C42:42,C43:43,C44:44,C45:45,C46:46,
    C90:90,C91:91,C92:92,C93:93,C94:94,C95:95,C96:96,C97:97,
    C100:100,C101:101,C102:102,C103:103,C104:104,C105:105,C106:106,C107:107
}
