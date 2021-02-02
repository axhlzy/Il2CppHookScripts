/**
 * @Author lzy <axhlzy@live.cn>
 * @HomePage https://github.com/axhlzy
 * @CreatedTime 2021/01/31 15:30
 * @UpdateTime 2021/02/02 17:45
 * @Des frida hook mono functions scrpt
 */

const soName = "libmono.so"
const p_size = Process.pointerSize

//声明libmono.so需要的函数
var mono_thread_attach,mono_get_root_domain,mono_class_from_name,mono_image_loaded,mono_class_get_method_from_name,
mono_runtime_invoke,mono_compile_method
//声明libc.so需要的函数
var fopen,fwrite,fclose,system

var arr_imgs_name = new Array()
var arr_imgs_addr = new Array()

setImmediate(function(){Module.findBaseAddress(soName) == NULL ? Hook_dlopen() : InitFunctions()})

function InitFunctions(){
    mono_thread_attach              = new NativeFunction(Module.findExportByName(soName,"mono_thread_attach"),'pointer',['pointer'])
    mono_get_root_domain            = new NativeFunction(Module.findExportByName(soName,"mono_get_root_domain"),'pointer',[])
    mono_class_from_name            = new NativeFunction(Module.findExportByName(soName,"mono_class_from_name"),'pointer',['pointer','pointer','pointer'])
    mono_class_get_method_from_name = new NativeFunction(Module.findExportByName(soName,"mono_class_get_method_from_name"),'pointer',['pointer','pointer','int'])
    mono_image_loaded               = new NativeFunction(Module.findExportByName(soName,"mono_image_loaded"),'pointer',['pointer'])
    mono_runtime_invoke             = new NativeFunction(Module.findExportByName(soName,"mono_runtime_invoke"),'pointer',['pointer','pointer','pointer','pointer'])
    mono_compile_method             = new NativeFunction(Module.findExportByName(soName,"mono_compile_method"),'pointer',['pointer'])
    
    mono_thread_attach(mono_get_root_domain())

    fopen   = new NativeFunction(Module.findExportByName("libc.so", "fopen"), "pointer", ["pointer", "pointer"])
    fwrite  = new NativeFunction(Module.findExportByName("libc.so", "fwrite"), "int", ["pointer",'int','int', "pointer"])
    fclose  = new NativeFunction(Module.findExportByName("libc.so", "fclose"), "int", ["pointer"])
    system  = new NativeFunction(Module.findExportByName("libc.so","system"),"pointer",["pointer"])
}

function Hook_dlopen() {
    const dlopen_old = Module.findExportByName(null, "dlopen")
    const dlopen_new = Module.findExportByName(null, "android_dlopen_ext")
    // dlopen_new = null
    if (dlopen_old != null) {
        Interceptor.attach(dlopen_old, {
            onEnter: function (args) {
                var l_soName = args[0].readCString()
                LOG(l_soName)
                if (l_soName.indexOf(soName) != -1) {
                    isHook = this.isHook
                }
            },
            onLeave: function (retval) {
                if (this.isHook) {
                    LOG("\nLoaded "+soName,LogColor.YELLOW)
                    todo()
                }
            }
        })
    }

    if (dlopen_new != null) {
        Interceptor.attach(dlopen_new, {
            onEnter: function (args) {
                var l_soName = args[0].readCString()
                LOG(l_soName)
                if (l_soName.indexOf(soName) != -1) {
                    isHook = this.isHook
                }
            },
            onLeave: function (retval) {
                if (this.isHook) {
                    LOG("\nLoaded "+soName,LogColor.YELLOW)
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

/**
 * 获得 MonoMethod
 * getMethod("UnityEngine","UnityEngine","Application","get_identifier",0)
 * getMethod("UnityEngine",'UnityEngine','Debug',"LogError",1,true)
 * @param {String}  imageName 
 * @param {String}  NameSpace 
 * @param {String}  className 
 * @param {String}  FunctName 
 * @param {Int}     argsCount 
 * @param {Boolean} showDetail 
 */
function getMethod(imageName,NameSpace,className,FunctName,argsCount,showDetail){
    if (imageName==undefined ||NameSpace==undefined||className==undefined||FunctName==undefined) return ptr(0)
    if (argsCount == undefined) argsCount = -1
    if (showDetail == undefined) showDetail = false
    
    // mono_thread_attach(mono_get_root_domain())
    var p_image = getImageByName(imageName) == 0 ? mono_image_loaded(allcStr(imageName)) : getImageByName(imageName)
    var p_class = mono_class_from_name(ptr(p_image),allcStr(NameSpace),allcStr(className))
    var p_method = mono_class_get_method_from_name(p_class,allcStr(FunctName),argsCount)

    if (!showDetail) return ptr(p_method)

    LOG(getLine(85),LogColor.C33)
    LOG("MonoImage\t---->\t"+p_image,LogColor.C36)
    LOG("MonoClass\t---->\t"+p_class,LogColor.C36)
    LOG("MonoMethod\t---->\t"+p_method + " ("+ReadMethodName(p_method)+")",LogColor.C36)
    LOG(getLine(85),LogColor.C33)
}

/**
 * 
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
        },
        onLeave:function(ret){

        }
    })
}

function HookMonoMethod(imageName,NameSpace,className,FunctName,argsCount,callbacks) {
    var mPtr = mono_compile_method(getMethod(imageName,NameSpace,className,FunctName,argsCount))
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

function ReadMethodName(mPtr){
    return mPtr.add(2+2+4+p_size*2).readPointer().readCString()
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

function DumpDll(){
    if (arr_imgs_addr.length == 0) return 
    var TitleTip = "\nStart dump dll and save files to /sdcard/DLL/"+getPackageName()+"/\n"
    LOG(getLine(TitleTip.length)+TitleTip+getLine(20),LogColor.C33)
    var path = "/sdcard/DLL/"+getPackageName()
    arr_imgs_addr.forEach(function(value,index){
        var name = arr_imgs_name[index]
        var mPtr = ptr(value).add(p_size*2).readPointer()
        var length = ptr(value).add(p_size*3).readPointer().toInt32()
        LOG(mPtr+"\t"+length+"\t"+name,LogColor.C36)
        writeFile(path,name,mPtr,length)
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

function LOG(str,type){
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

function allcStr(str,type){
    return type == undefined ? Memory.allocUtf8String(str) : mono_string_new(mono_get_root_domain(),Memory.allocUtf8String(str))
}

function seeHexR(addr,length){
    LOG(hexdump(ptr(soAddr.add(addr).readPointer()),{length:length}))
}

function seeHexA(addr,length){
    LOG(hexdump(ptr(addr),{length:length}))
}