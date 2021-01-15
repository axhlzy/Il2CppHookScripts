const soName = "libil2cpp.so"
const soAddr = Module.findBaseAddress(soName)
const p_size = Process.pointerSize

var LogFlag = true
const a_img_addr   = new Array()
const a_img_names  = new Array()

//breakPoints 参数
var count_method_times
//管理出现次数，大于出现次数即不显示（免得反复跳）
const maxCallTime = 20

var arrayAddr =
["0x2e2508","0x2e4940"]

var arrayName =
["private Void ShowAds (Int32 id)","private Void ShowAds (Int32 id,String SceneName)"]


var il2cpp_domain_get                   = new NativeFunction(Module.findExportByName(soName,"il2cpp_domain_get"),'pointer',[])
var il2cpp_domain_get_assemblies        = new NativeFunction(Module.findExportByName(soName,"il2cpp_domain_get_assemblies"),'pointer',['pointer','pointer'])
var il2cpp_assembly_get_image           = new NativeFunction(Module.findExportByName(soName,"il2cpp_assembly_get_image"),'pointer',['pointer'])

var il2cpp_image_get_class_count        = new NativeFunction(Module.findExportByName(soName,"il2cpp_image_get_class_count"),'pointer',['pointer'])
var il2cpp_image_get_class              = new NativeFunction(Module.findExportByName(soName,"il2cpp_image_get_class"),'pointer',['pointer','int'])
var il2cpp_class_get_type               = new NativeFunction(Module.findExportByName(soName,"il2cpp_class_get_type"),'pointer',["pointer"])

var il2cpp_class_get_methods            = new NativeFunction(Module.findExportByName(soName,"il2cpp_class_get_methods"),'pointer',["pointer","pointer"])
var il2cpp_class_from_type              = new NativeFunction(Module.findExportByName(soName,"il2cpp_class_from_type"),'pointer',["pointer"])

var il2cpp_get_corlib                   = new NativeFunction(Module.findExportByName(soName,"il2cpp_get_corlib"),'pointer',[])
var il2cpp_class_from_name              = new NativeFunction(Module.findExportByName(soName,"il2cpp_class_from_name"),'pointer',["pointer","pointer","pointer"])
var il2cpp_class_get_method_from_name   = new NativeFunction(Module.findExportByName(soName,"il2cpp_class_get_method_from_name"),'pointer',["pointer","pointer","int"])

var il2cpp_string_new                   = new NativeFunction(Module.findExportByName(soName,"il2cpp_string_new"),'pointer',["pointer"])

setImmediate(initImages)
function initImages(){
    LogFlag = false 
    list_Images()
    LogFlag = true
}

/**
 * --------------------------------------------------------------------------------------------
 * 快捷调用
 * ---------------------
 * i()      list_Images()
 * c()      list_Classes(image,isShowClass)
 * m()      list_Methods(klass,isShowMore)
 * f()      find_method(ImageName,ClassName,functionName,ArgsCount,isRealAddr)
 * n()      nopfunction(ptr)
 * d()      Interceptor.detachAll()
 * a()      addBreakPoints(imgOrCls)
 * b()      breakPoint(ptr)
 * p()      printCtx(pointer,range,sign)
 * B()      breakPoints(filter)
 * --------------------------------------------------------------------------------------------
 */

function i(){
    list_Images()
}

function c(image,isShowClass){
    list_Classes(image,isShowClass)
}

function m(klass){
    list_Methods(klass,true)
}

/**
 * 参数可以传递 绝对地址 相对地址 methodinfo指针（解析参数）
 * @param {*} m_ptr 
 */
function b(m_ptr){
    var arr_method_info = NULL
    try{
        arr_method_info = get_Method_Des(m_ptr,true)
    }catch(e){
        m_ptr = Number(m_ptr) < Number(soAddr) ? soAddr.add(ptr(m_ptr)) :ptr(m_ptr)
        Interceptor.attach(m_ptr,{
            onEnter:function(args){
                
            },
            onLeave:function(ret){
                LOG("\n[*] Called function addr "+m_ptr+"  ret ---> "+ret,LogColor.C36)
            } 
        })
        return
    }
    var method_addr = ptr(m_ptr).readPointer()
    Interceptor.attach(method_addr,{
        onEnter:function(args){
            LOG("\n-----------------------------------------------------------",LogColor.C33)
            var funcName = arr_method_info[0]
            LOG("Called "+funcName,LogColor.YELLOW)
            LOG("----------------------",LogColor.C33)
            for(var i=0;i<arr_method_info[2];i++){
                var typeCls = arr_method_info[3][i]
                LOG("  arg"+i+"\t--->\t"+ args[(funcName.indexOf("Static")==-1?i+1:i)] +"\t"+ getClassName(typeCls),LogColor.C36)
            }
        },
        onLeave:function(ret){
            LOG("  ret\t--->\t"+ret +"\t"+getClassName(arr_method_info[1]),LogColor.C36)
            LOG("-----------------------------------------------------------",LogColor.C33)
        }
    })
}

/**
 * nop 指定函数 (相对地址/绝对地址都可以填)
 * @param {*} m_ptr 
 */
function n(m_ptr){
    m_ptr = Number(m_ptr) < Number(soAddr) ? soAddr.add(ptr(m_ptr)) :ptr(m_ptr)
    //原函数的引用也可以再replace中调用
    // var srcFunc = new NativeFunction(m_ptr,'void',['pointer','pointer','pointer','pointer'])
    Interceptor.replace(m_ptr,new NativeCallback(function(arg0,arg1,arg2,arg3){
        LOG("\nCalled NOP function ---> "+m_ptr,LogColor.YELLOW)
        // srcFunc(arg0,arg1,arg2,arg3)
    },'void',['pointer','pointer','pointer','pointer']))
}

function d(){
    Interceptor.detachAll()
}

function f(ImageName,ClassName,functionName,ArgsCount){
    find_method(ImageName,ClassName,functionName,ArgsCount,false)
}

/**
 * 用来查看地址 确定不是单独的一条B，以便于InlineHook的后续处理
 * @param {pointer} m_ptr 绝对地址相对地址都可以
 */
function p(m_ptr,range){
    m_ptr = Number(m_ptr) < Number(soAddr) ? soAddr.add(ptr(m_ptr)) :ptr(m_ptr)
    printCtx(m_ptr,(range==undefined?20:range),"")
}

function a(imgOrCls){
    addBP(imgOrCls)
}

function B(filter){
    breakPoints(filter)
}

/**
 * -------------------------------------------基础方法-------------------------------------------------
 */

function list_Images(){
    a_img_names.splice(0,a_img_names.length)
    a_img_addr.splice(0,a_img_addr.length)

    var domain = il2cpp_domain_get()
    var size_t = Memory.alloc(p_size)
    var assemblies = il2cpp_domain_get_assemblies(domain, size_t)
    var count_assemblies = 0
    LOG("-------------------------------------------------------------------------------------",LogColor.C33)
    var assemblies_count = size_t.readInt()
    for (var i=0;i<assemblies_count;i++){
        var img_addr = il2cpp_assembly_get_image(assemblies.add(p_size*i)).readPointer()
        var img_name = img_addr.add(p_size).readPointer().readCString()
        var cls_count = il2cpp_image_get_class_count(img_addr).toInt32()
        LOG("[*] "+img_addr+"\t"+cls_count+"\t"+img_name,LogColor.C36)
        a_img_names.push(img_name)
        a_img_addr.push(img_addr)
        count_assemblies++
    }    
    LOG("----------------------------",LogColor.C33)
    LOG("  List "+count_assemblies+" Images",LogColor.RED)
    LOG("-------------------------------------------------------------------------------------",LogColor.C33)
}

function list_Classes(image,isShowClass){
    if (isShowClass == undefined) isShowClass = true
    var image = ptr(image)
    var cls_count = il2cpp_image_get_class_count(image).toInt32()
    var a_Namespaces = new Array()
    var t_Namespaces = new Array()
    var t_Names = new Array()
    var t_il2CppClass = new Array()
    LOG("-------------------------------------------------------------------------------------",LogColor.C33)
    for(var j=0;j<cls_count;j++){
        var il2CppClass = il2cpp_image_get_class(image,j)
        var name = il2CppClass.add(2*p_size).readPointer().readCString()
        var nameSpace = il2CppClass.add(3*p_size).readPointer().readCString()
        if (a_Namespaces.indexOf(nameSpace)==-1) a_Namespaces.push(nameSpace)
        t_il2CppClass.push(il2CppClass)
        t_Names.push(name)
        t_Namespaces.push(nameSpace)
    }
    for(var i=0;i<a_Namespaces.length;i++){
        LOG((i==0?"":(isShowClass?"\n":""))+"[*] "+a_Namespaces[i],LogColor.C36)
        if (!isShowClass) continue
        for (var j=0;j<t_Names.length;j++){
            if(t_Namespaces[j]==a_Namespaces[i]) LOG("\t[-] "+t_il2CppClass[j]+"\t"+t_Names[j],LogColor.C36)
        }
    }    
    var tmp = new Array()
    t_Namespaces.forEach(function(value){
        if (tmp.indexOf(value) == -1) tmp.push(value)
    })
    LOG("----------------------------",LogColor.C33)
    LOG("  List "+cls_count+" Classes | Group by "+tmp.length+" NameSpaces",LogColor.RED)
    LOG("-------------------------------------------------------------------------------------",LogColor.C33)
}

function list_Methods(klass,isShowMore){

    if (isShowMore == undefined) isShowMore = false

    klass = ptr(klass)
    var iter = Memory.alloc(p_size)
    var method = NULL
    var count_methods = 0
    LOG("-------------------------------------------------------------------------------------",LogColor.C33)
    try{
        while (method = il2cpp_class_get_methods(klass, iter)) {
            var methodName = getMethodName(method)
            var retClass = il2cpp_class_from_type(getMethodReturnType(method))
            var retName = getClassName(retClass)
            var parameters_count = getMethodParametersCount(method)
            //解析参数
            var arr_args = new Array()
            var arr_args_type_addr = new Array()
            for(var i=0;i<parameters_count;i++){
                var ParameterInfo = method.add(p_size*5).readPointer()
                var Il2CppType = ParameterInfo.add(p_size*i*4)
                var typeClass = il2cpp_class_from_type(getParameterType(Il2CppType))
                var TypeName = getClassName(typeClass)
                arr_args.push(TypeName+" "+getParameterName(ParameterInfo))
                arr_args_type_addr.push(TypeName+" "+typeClass)
            }

            LOG((count_methods==0?"":"\n")+"[*] "+method+" ---> "
                + method.readPointer()+" ---> "+method.readPointer().sub(soAddr)+"\t"
                + (!isShowMore?(parameters_count+"\t"):"") + "\n\t"
                + get_method_modifier(method)
                + retName + " "
                + methodName + " "
                + "(" + arr_args+")"+"\t",LogColor.C36)
                
            count_methods ++

            if (!isShowMore) continue

            LOG("\t\t---> ret\t" + retName +"\t"+retClass,LogColor.C90)
            LOG("\t\t---> cls\t" + arr_args_type_addr,LogColor.C90)
        }
    }catch(e){
        // LOG(e)
    }
    LOG("-------------------------------------------------------------------------------------",LogColor.C33)
}

/*
 *  根据 ImageName , ClassName , functionName , argsCount 找到对应 function 的地址
 *  最后一个参数 isRealAddr 用作显示静态分析地址还是当前内存地址（带这个参数则只返回地址，不带则列表信息）
 *  find_method("UnityEngine.UI","Text","get_text",0)
 */
function find_method(ImageName,ClassName,functionName,ArgsCount,isRealAddr){

    // var corlib = il2cpp_get_corlib()
    if (isRealAddr == undefined) isRealAddr = true
    var currentlib = 0
    a_img_names.forEach(function(name,index){
        if (name == ImageName){
            currentlib = a_img_addr[index]
        }
    })

    var klass = il2cpp_class_from_name(currentlib, Memory.allocUtf8String(ImageName), Memory.allocUtf8String(ClassName))
    if (klass == 0){
        for(var j=0;j<il2cpp_image_get_class_count(currentlib).toInt32();j++){
            var il2CppClass = il2cpp_image_get_class(currentlib,j)
            if (getClassName(il2CppClass) == ClassName) {
                klass = il2CppClass
                break
            }
        }
    }
    var method = il2cpp_class_get_method_from_name(klass, Memory.allocUtf8String(functionName), ArgsCount)
    if (method == 0) return ptr(0)
    if (isRealAddr) return isRealAddr ? method.readPointer():method.readPointer().sub(soAddr)
    
    var parameters_count = getMethodParametersCount(method)
    var arr_args = new Array()
    var arr_args_type_addr = new Array()
    for(var i=0;i<parameters_count;i++){
        var ParameterInfo = method.add(p_size*5).readPointer().add(p_size*i*4)
        var typeClass = il2cpp_class_from_type(getParameterType(ParameterInfo))
        var TypeName = getClassName(typeClass)
        arr_args.push(TypeName+" "+getParameterName(ParameterInfo))
        arr_args_type_addr.push(TypeName+" "+typeClass)
    }
    var disStr = get_method_modifier(method)
                + getClassName(il2cpp_class_from_type(getMethodReturnType(method))) + " "
                + getMethodName(method) + " "
                + "(" + arr_args+")"+"\t"
    LOG("-------------------------------------------------------------------------------------",LogColor.C33)
    LOG(ImageName+"."+ClassName+"\t"+disStr,LogColor.RED)
    LOG("----------------------------",LogColor.C33)
    var ShowMore = false
    LOG("Il2CppImage\t---->\t"+currentlib +(ShowMore?" ("+ currentlib.add(p_size).readPointer().readCString()+")":""))
    LOG("Il2CppClass\t---->\t"+klass +(ShowMore?" ("+ getClassName(klass)+")":""))
    LOG("MethodInfo\t---->\t"+method +(ShowMore?" ("+ getMethodName(method)+")":""))
    LOG("methodPointer\t---->\t"+method.readPointer() +"\t===>\t"+method.readPointer().sub(soAddr),LogColor.C36)
    LOG("-------------------------------------------------------------------------------------",LogColor.C33)
}

function addBP(imgOrCls){
    imgOrCls = ptr(imgOrCls)
    var method_count = 0
    var count = 0
    try{
        count = il2cpp_image_get_class_count(imgOrCls).toInt32()
    }catch(e){
        LOG("Error imgOrCls ",LogColor.RED)
        return
    }
    //判断是image还是class
    LOG("-------------------------------------------------------------------------------------",LogColor.C33)
    if (String(a_img_addr).indexOf(imgOrCls)!=-1){
        for(var j=0;j<count;j++){
            var il2CppClass = il2cpp_image_get_class(imgOrCls,j)
            addFunctions(il2CppClass)
        }
    }else{
        addFunctions(imgOrCls)
    }
    
    LOG("------------------------------------------",LogColor.C33)
    LOG("  Added "+method_count+" Methods    |    All "+arrayAddr.length,LogColor.RED)
    LOG("-------------------------------------------------------------------------------------",LogColor.C33)

    function addFunctions(cls){
        var iter = Memory.alloc(p_size)
            var method = NULL
            try{
                while (method = il2cpp_class_get_methods(cls, iter)) {
                    var methodName = get_Method_Des(method)
                    var methodAddr = method.readPointer()
                    if (methodAddr == 0) continue
                    LOG("[*] "+methodAddr+" ---> "+methodAddr.sub(soAddr)+"\t"+methodName,LogColor.C36)
                    if (arrayName.indexOf(methodName)!=-1) continue
                    arrayName.push(methodName)
                    arrayAddr.push(methodAddr.sub(soAddr))
                    method_count ++ 
                }
            }catch(e){
                // LOG(e)
            }
    }
}

function get_Method_Des(method,isArray){
    method = ptr(method)

    var methodName = getMethodName(method)
    var retClass = il2cpp_class_from_type(getMethodReturnType(method))
    var retName = getClassName(retClass)
    var parameters_count = getMethodParametersCount(method)
    var permission = get_method_modifier(method)
    
    //解析参数
    var arr_args = new Array()
    var arr_args_t = new Array()
    for(var i=0;i<parameters_count;i++){
        var ParameterInfo = method.add(p_size*5).readPointer().add(p_size*i*4)
        var typeClass = il2cpp_class_from_type(getParameterType(ParameterInfo))
        var TypeName = getClassName(typeClass)
        arr_args.push(TypeName+" "+getParameterName(ParameterInfo))
        arr_args_t.push(typeClass)
    }

    var ret_str = permission+retName+" "+methodName+ " ("+arr_args+")"

    if (isArray==undefined?false:true){
        var a_ret = new Array()
        a_ret.push(ret_str)             //字符串简述
        a_ret.push(retClass)            //返回值类型
        a_ret.push(parameters_count)    //参数个数
        a_ret.push(arr_args_t)          //参数class列表
        // LOG(JSON.stringify(a_ret))
        return a_ret
    }

    return ret_str
}

/**
 * @param {查询筛选} filter
 */
function breakPoints(filter){
    d()
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

    Java.perform(function(){
        t_arrayAddr
            .map(function(temp){return soAddr.add(temp)})
            .forEach(function(value,index,array){
                LOG("-------------------------",LogColor.C90)
                LOG('currentAddr:' + value + "\t"+t_arrayName[index],LogColor.C32)
                try{
                    funcTmp(value,index,t_arrayName)
                }catch(e){
                    funcTmp(value.add(1),soAddr,index,t_arrayName)
                }
                LOG("\t\t---->"+index+"\t"+value.sub(soAddr)+" is prepared ",LogColor.C33)
            })
        LOG("------------------------------------------",LogColor.C33)
        LOG("  Added "+t_arrayAddr.length+" BreakPoints    |    All "+arrayAddr.length,LogColor.RED)
        LOG("-------------------------------------------------------------------------------------",LogColor.C33)
    })

    function funcTmp(currentAddr,index,arrayName){
        try{
            Interceptor.attach(currentAddr, {
                onEnter: function(args){
                    // PrintStackTraceN(this.context)
                    if(++count_method_times[index] < maxCallTime){
                        LOG("called : "+currentAddr.sub(soAddr)+"\t--->\t"+arrayName[index] +"\n",LogColor.C36)
                        this.temp = currentAddr.sub(soAddr);
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
        if (Number(value)>maxCallTime) LOG("[*] "+arrayAddr[index].add(soAddr)+"\t"+arrayAddr[index]+"\t("+index+")"+"\t--->\t"+arrayName[index]+"\n",LogColor.C32)
    })
}

/**
 *  用来区分transform和gameObj
 * @param {} obj 
 */
function SeeTypeToString(obj){
    var f_Object_ToSting   = new NativeFunction(find_method("UnityEngine.CoreModule","Object","ToString",0,true),'pointer',['pointer'])
    var s_type = f_Object_ToSting(ptr(obj))
    LOG(s_type.add(p_size*3).readUtf16String())
}

function get_method_modifier(method_ptr){
    
    var flags = ptr(method_ptr).add(p_size*9).readU16()
    var access = flags & il2cppTabledefs.METHOD_ATTRIBUTE_MEMBER_ACCESS_MASK
    var ret_str = ""
    switch(access){
        case il2cppTabledefs.METHOD_ATTRIBUTE_PRIVATE:
            ret_str += "private " ; break
        case il2cppTabledefs.METHOD_ATTRIBUTE_PUBLIC:
            ret_str +=  "public " ; break
        case il2cppTabledefs.METHOD_ATTRIBUTE_FAMILY:
            ret_str +=  "protected " ; break
        case il2cppTabledefs.METHOD_ATTRIBUTE_ASSEM:
        case il2cppTabledefs.METHOD_ATTRIBUTE_FAM_AND_ASSEM:
            ret_str +=  "internal " ; break
        case il2cppTabledefs.METHOD_ATTRIBUTE_FAM_OR_ASSEM:
            ret_str +=  "protected internal " ; break
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

function printLogColors(){
    var str = "123456789"
    console.log("----------------  listLogColors  ----------------")
    for (var i = 30 ;i<= 37 ;i++){
        console.log("\t\t\x1b["+i+"m"+i+"\t"+str+"\x1b[0m")
    }
    console.log("----------------------------------------------")
    for (var i = 40 ;i<= 47 ;i++){
        console.log("\t\t\x1b["+i+"m"+i+"\t"+str+"\x1b[0m")
    }
    console.log("----------------------------------------------")
    for (var i = 90 ;i<= 97 ;i++){
        console.log("\t\t\x1b["+i+"m"+i+"\t"+str+"\x1b[0m")
    }
    console.log("----------------------------------------------")
    for (var i = 100 ;i<= 107 ;i++){
        console.log("\t\t\x1b["+i+"m"+i+"\t"+str+"\x1b[0m")
    }
    console.log("----------------------------------------------")
}

var il2cppTabledefs = {
    METHOD_ATTRIBUTE_MEMBER_ACCESS_MASK:0x0007,
    METHOD_ATTRIBUTE_COMPILER_CONTROLLED:0x0000,
    METHOD_ATTRIBUTE_PRIVATE:0x0001,
    METHOD_ATTRIBUTE_FAM_AND_ASSEM:0x0002,
    METHOD_ATTRIBUTE_ASSEM:0x0003,
    METHOD_ATTRIBUTE_FAMILY:0x0004,
    METHOD_ATTRIBUTE_FAM_OR_ASSEM:0x0005,
    METHOD_ATTRIBUTE_PUBLIC:0x0006,

    METHOD_ATTRIBUTE_STATIC                   : 0x0010,
    METHOD_ATTRIBUTE_FINAL                    : 0x0020,
    METHOD_ATTRIBUTE_VIRTUAL                  : 0x0040,
    METHOD_ATTRIBUTE_ABSTRACT                 : 0x0400,
    METHOD_ATTRIBUTE_PINVOKE_IMPL             : 0x2000,
    METHOD_ATTRIBUTE_VTABLE_LAYOUT_MASK       : 0x0100,

    METHOD_ATTRIBUTE_REUSE_SLOT               : 0x0000,
    METHOD_ATTRIBUTE_NEW_SLOT                 : 0x0100,
    METHOD_ATTRIBUTE_PINVOKE_IMPL             : 0x2000,

}

var LogColor = {
    WHITE:0,RED:1,YELLOW:3,
    C31:31,C32:32,C33:33,C34:34,C35:35,C36:36,
    C41:41,C42:42,C43:43,C44:44,C45:45,C46:46,
    C90:90,C91:91,C92:92,C93:93,C94:94,C95:95,C96:96,C97:97,
    C100:100,C101:101,C102:102,C103:103,C104:104,C105:105,C106:106,C107:107
}

function showGameObject(gameObj){
    var f_getName        = new NativeFunction(find_method("UnityEngine.CoreModule","Object","GetName",1,true),'pointer',['pointer'])
    var f_getLayer       = new NativeFunction(find_method("UnityEngine.CoreModule","GameObject","get_layer",0,true),'int',['pointer'])
    var f_getTransform   = new NativeFunction(find_method("UnityEngine.CoreModule","GameObject","get_transform",0,true),'pointer',['pointer'])
    var f_getParent      = new NativeFunction(find_method("UnityEngine.CoreModule","Transform","GetParent",0,true),'pointer',['pointer'])
    // var f_getTag         = new NativeFunction(find_method("UnityEngine.CoreModule","GameObject","get_tag",0,true),'pointer',['pointer'])
    
    LOG("--------- GameObject ---------",LogColor.C33)
    LOG("gameObj\t\t--->\t"+gameObj,LogColor.C36)
    LOG("getName\t\t--->\t"+f_getName(gameObj).add(Process.pointerSize*3).readUtf16String(),LogColor.C36)
    LOG("getLayer\t--->\t"+f_getLayer(gameObj),LogColor.C36)           
    var m_transform = f_getTransform(gameObj)
    LOG("getTransform\t--->\t"+m_transform,LogColor.C36)
    // LOG("getTag\t\t--->\t"+f_getTag(gameObj).add(p_size*3).readUtf16String(),LogColor.C36)
    var layerNames = ""
    for (var i=0;i<10;i++){
        var getName = f_getName(m_transform)
        var spl =  layerNames == "" ? "" : " <--- "
        layerNames = layerNames + spl + getName.add(Process.pointerSize*3).readUtf16String()
        m_transform = f_getParent(m_transform)
        if (m_transform == 0) break
    }
    LOG("hierarchy\t--->\t"+layerNames,LogColor.C36)
}

function showTransform(transform){
    LOG("--------- Transform ---------",LogColor.C33)

    transform = ptr(transform)
    var addr_get_childCount = find_method("UnityEngine.CoreModule","Transform","get_childCount",0,true)
    var addr_GetChild       = find_method("UnityEngine.CoreModule","Transform","GetChild",1,true)
    var f_getName           = new NativeFunction(find_method("UnityEngine.CoreModule","Object","GetName",1,true),'pointer',['pointer'])
    
    if (addr_get_childCount != 0){
        var f_get_childCount = new NativeFunction(addr_get_childCount,'int',['pointer'])
        var f_GetChild = new NativeFunction(addr_GetChild,'pointer',['pointer','int'])
        var childCount = f_get_childCount(transform)
        LOG("childCount\t--->\t"+childCount+"\t("+f_getName(transform).add(Process.pointerSize*3).readUtf16String()+")",LogColor.C36)
        for (var i = 0;i<childCount;i++){
            var c_transform = f_GetChild(transform,i)
            LOG("\t\t\t"+c_transform+" : "+f_getName(c_transform).add(Process.pointerSize*3).readUtf16String(),LogColor.C36)
        }
    }

    var addr_get_eulerAngles = find_method("UnityEngine.CoreModule","Transform","get_eulerAngles",0,true)
    if (addr_get_eulerAngles != 0){
        var f_get_eulerAngles = new NativeFunction(addr_get_eulerAngles,'pointer',['pointer','pointer'])
        var eulerAngles_vector3 = Memory.alloc(p_size*3)
        f_get_eulerAngles(eulerAngles_vector3,transform)
        LOG("eulerAngles\t--->\t"+eulerAngles_vector3.readFloat()+"\t"+eulerAngles_vector3.add(p_size).readFloat()+"\t"+eulerAngles_vector3.add(p_size*2).readFloat(),LogColor.C36)
    }

    var addr_get_forward = find_method("UnityEngine.CoreModule","Transform","get_forward",0,true)
    if (addr_get_forward != 0){
        var f_get_forward = new NativeFunction(addr_get_forward,'pointer',['pointer','pointer'])
        var forward_vector3 = Memory.alloc(p_size*3)
        f_get_forward(forward_vector3,transform)
        LOG("forward\t\t--->\t"+forward_vector3.readFloat()+"\t"+forward_vector3.add(p_size).readFloat()+"\t"+forward_vector3.add(p_size*2).readFloat(),LogColor.C36)
    }

    var addr_get_position = find_method("UnityEngine.CoreModule","Transform","get_position",0,true)
    if (addr_get_position != 0){
        var f_get_position = new NativeFunction(addr_get_position,'pointer',['pointer','pointer'])
        var Position_vector3 = Memory.alloc(p_size*3)
        f_get_position(Position_vector3,transform)

        LOG("position\t--->\t"+Position_vector3.readFloat()+"\t"+Position_vector3.add(p_size).readFloat()+"\t"+Position_vector3.add(p_size*2).readFloat(),LogColor.C36)
    }

    var addr_get_localPosition = find_method("UnityEngine.CoreModule","Transform","get_localPosition",0,true)
    if (addr_get_localPosition != 0){
        var f_get_localPosition = new NativeFunction(addr_get_localPosition,'pointer',['pointer','pointer'])
        var localPosition_vector3 = Memory.alloc(p_size*3)
        f_get_localPosition(localPosition_vector3,transform)
        LOG("localPosition\t--->\t"+localPosition_vector3.readFloat()+"\t"+localPosition_vector3.add(p_size).readFloat()+"\t"+localPosition_vector3.add(p_size*2).readFloat(),LogColor.C36)
    }
    
    var addr_get_localRotation = find_method("UnityEngine.CoreModule","Transform","get_localRotation",0,true)
    if (addr_get_localRotation != 0){
        var f_get_localRotation = new NativeFunction(addr_get_localRotation,'pointer',['pointer','pointer'])
        var localRotation_Quaternion = Memory.alloc(p_size*4)
        f_get_localRotation(localRotation_Quaternion,transform)
        LOG("localRotation\t--->\t"+localRotation_Quaternion.readFloat()+"\t"+localRotation_Quaternion.add(p_size).readFloat()+"\t"+localRotation_Quaternion.add(p_size*2).readFloat()+"\t"+localRotation_Quaternion.add(p_size*3).readFloat(),LogColor.C36)
    }

    var addr_get_localScale = find_method("UnityEngine.CoreModule","Transform","get_localScale",0,true)
    if (addr_get_localScale != 0){
        var f_get_localScale = new NativeFunction(addr_get_localScale,'pointer',['pointer','pointer'])
        var localScale_vector3 = Memory.alloc(p_size*3)
        f_get_localScale(localScale_vector3,transform)
        LOG("localScale\t--->\t"+localScale_vector3.readFloat()+"\t"+localScale_vector3.add(p_size).readFloat()+"\t"+localScale_vector3.add(p_size*2).readFloat(),LogColor.C36)
    }

    var addr_get_lossyScale = find_method("UnityEngine.CoreModule","Transform","get_lossyScale",0,true)
    if (addr_get_lossyScale != 0){
        var f_get_lossyScale = new NativeFunction(addr_get_lossyScale,'pointer',['pointer','pointer'])
        var lossyScale_vector3 = Memory.alloc(p_size*3)
        f_get_lossyScale(lossyScale_vector3,transform)
        LOG("lossyScale\t--->\t"+lossyScale_vector3.readFloat()+"\t"+lossyScale_vector3.add(p_size).readFloat()+"\t"+lossyScale_vector3.add(p_size*2).readFloat(),LogColor.C36)
    }

    var addr_get_right = find_method("UnityEngine.CoreModule","Transform","get_right",0,true)
    if (addr_get_right != 0){
        var f_get_right = new NativeFunction(addr_get_right,'pointer',['pointer','pointer'])
        var right_vector3 = Memory.alloc(p_size*3)
        f_get_right(right_vector3,transform)
        LOG("right\t\t--->\t"+right_vector3.readFloat()+"\t"+right_vector3.add(p_size).readFloat()+"\t"+right_vector3.add(p_size*2).readFloat(),LogColor.C36)
    }

    var addr_get_up = find_method("UnityEngine.CoreModule","Transform","get_up",0,true)
    if (addr_get_up != 0){
        var f_get_up = new NativeFunction(addr_get_up,'pointer',['pointer','pointer'])
        var up_vector3 = Memory.alloc(p_size*3)
        f_get_up(up_vector3,transform)
        LOG("up\t\t--->\t"+up_vector3.readFloat()+"\t"+up_vector3.add(p_size).readFloat()+"\t"+up_vector3.add(p_size*2).readFloat(),LogColor.C36)
    }
    
    var addr_get_rotation = find_method("UnityEngine.CoreModule","Transform","get_rotation",0,true)
    if (addr_get_rotation != 0){
        var f_get_rotation = new NativeFunction(addr_get_rotation,'pointer',['pointer','pointer'])
        var rotation_Quaternion = Memory.alloc(p_size*4)
        f_get_rotation(rotation_Quaternion,transform)
        LOG("rotation\t--->\t"+rotation_Quaternion.readFloat()+"\t"+rotation_Quaternion.add(p_size).readFloat()+"\t"+rotation_Quaternion.add(p_size*2).readFloat()+"\t"+rotation_Quaternion.add(p_size*3).readFloat(),LogColor.C36)
    }
}

function showEventData(eventData){
    LOG("--------- EventData ---------",LogColor.C33)
    var f_get_position = new NativeFunction(find_method("UnityEngine.UI","PointerEventData","get_position",0,true),'pointer',['pointer','pointer'])
    var click_vector2 = Memory.alloc(p_size*2)
    f_get_position(click_vector2,eventData)
    LOG("ClickPositon\t--->\t"+click_vector2.readFloat()+"\t"+click_vector2.add(p_size).readFloat(),LogColor.C36)
    
    var f_get_clickTime = new NativeFunction(find_method("UnityEngine.UI","PointerEventData","get_clickTime",0,true),'float',['pointer'])
    LOG("clickTime\t--->\t"+f_get_clickTime(eventData),LogColor.C36)

    var f_get_clickCount = new NativeFunction(find_method("UnityEngine.UI","PointerEventData","get_clickCount",0,true),'int',['pointer'])
    LOG("clickCount\t--->\t"+f_get_clickCount(eventData),LogColor.C36)
    
    var f_get_delta = new NativeFunction(find_method("UnityEngine.UI","PointerEventData","get_delta",0,true),'pointer',['pointer','pointer'])
    var delta_vector2 = Memory.alloc(p_size*2)
    f_get_delta(delta_vector2,eventData)
    LOG("delta\t\t--->\t"+delta_vector2.readFloat()+"\t"+delta_vector2.add(p_size).readFloat(),LogColor.C36)
    
    // 原UnityEngine.UI.PointerEventData.ToString
    // var f_toSting = new NativeFunction(find_method("UnityEngine.UI","PointerEventData","ToString",0,true),'pointer',['pointer'])
    // var s = f_toSting(PointerEventData)
    // LOG(s.add(p_size*3).readUtf16String())
}
 
function getClassName(klass){
    return ptr(klass).add(p_size*2).readPointer().readCString()
}

function getMethodName(method){
    return ptr(method).add(p_size*2).readPointer().readCString()
}

function getMethodParametersCount(method){
    return ptr(method).add(p_size*10+2).readU8()
}

function getMethodParameters(method){
    return ptr(method).add(p_size*5).readPointer()
}

function getMethodReturnType(method){
    return ptr(method).add(p_size*4).readPointer()
}

function getParameterName(ParameterInfo){
    return ptr(ParameterInfo).readPointer().readCString()
}

function getParameterType(Il2CppType){
    //const Il2CppType* parameter_type;
    return ptr(Il2CppType).add(p_size*2+4).readPointer()
}

/**
 * -------------------------------------------工具方法-------------------------------------------------
 */

function seeHexR(addr,length){
    LOG(hexdump(ptr(soAddr.add(addr).readPointer()),{length:length}))
}

function seeHexA(addr,length){
    LOG(hexdump(ptr(addr),{length:length}))
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

function Hook_dlopen() {
    const dlopen_old = Module.findExportByName(null, "dlopen")
    const dlopen_new = Module.findExportByName(null, "android_dlopen_ext")
    // dlopen_new = null
    if (dlopen_old != null) {
        Interceptor.attach(dlopen_old, {
            onEnter: function (args) {
                var l_soName = args[0].readCString()
                console.log(l_soName)
                if (l_soName.indexOf(soName) != -1) {
                    this.hook = true
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
                var l_soName = args[0].readCString()
                console.log(l_soName)
                if (l_soName.indexOf(soName) != -1) {
                    this.hook = true
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
        FindArgs()
    }
}

function PrintStackTrace(){
    console.log("\x1b[36m"+
        Java.use("android.util.Log")
            .getStackTraceString(Java.use("java.lang.Throwable")
            .$new())+"\x1b[0m");
}

function PrintStackTraceN(ctx){
    console.log("\x1b[36m Called from:\n"+
            Thread.backtrace(ctx,Backtracer.FUZZY)
            .slice(0,6)
            // .reverse()
            .map(DebugSymbol.fromAddress).join("\n")+"\x1b[0m");
}

/**
 * -------------------------------------------拓展方法-------------------------------------------------
 */

function Info(){

    Application()
    SystemInfo()
    Time()

    function Time(){

        console.error("------------------- TIME -------------------")
    
        //public static extern float get_time()
        var addr_get_time = find_method("UnityEngine.CoreModule","Time","get_time",0,true)
        if (addr_get_time != 0)
            LOG("[*] get_time \t\t\t: "+new NativeFunction(addr_get_time,'float',[])()+"\n--------------------",LogColor.C36)
    
        //public static extern float deltaTime()
        var addr_deltaTime = find_method("UnityEngine.CoreModule","Time","deltaTime",0,true)
        if (addr_deltaTime != 0)
            LOG("[*] deltaTime \t\t\t: "+new NativeFunction(addr_deltaTime,'float',[])()+"\n--------------------",LogColor.C36)
    
        //public static extern float get_fixedDeltaTime()
        var addr_get_fixedDeltaTime = find_method("UnityEngine.CoreModule","Time","get_fixedDeltaTime",0,true)
        if (addr_get_fixedDeltaTime != 0)
            LOG("[*] fixedDeltaTime \t\t: "+new NativeFunction(addr_get_fixedDeltaTime,'float',[])()+"\n--------------------",LogColor.C36)
    
        //public static extern float get_fixedTime()
        var addr_get_fixedTime = find_method("UnityEngine.CoreModule","Time","get_fixedTime",0,true)
        if (addr_get_fixedTime != 0)
            LOG("[*] fixedTime \t\t\t: "+new NativeFunction(addr_get_fixedTime,'float',[])()+"\n--------------------",LogColor.C36)
    
        //public static extern int get_frameCount()
        var addr_get_frameCount = find_method("UnityEngine.CoreModule","Time","get_frameCount",0,true)
        if (addr_get_frameCount != 0)
            LOG("[*] frameCount \t\t\t: "+new NativeFunction(addr_get_frameCount,'int',[])()+"\n--------------------",LogColor.C36)
        
        //public static extern float get_inFixedTimeStep()
        var addr_get_inFixedTimeStep = find_method("UnityEngine.CoreModule","Time","get_inFixedTimeStep",0,true)
        if (addr_get_inFixedTimeStep != 0)
            LOG("[*] inFixedTimeStep \t\t: "+(new NativeFunction(addr_get_inFixedTimeStep,'float',[])()==0?"false":"true")+"\n--------------------",LogColor.C36)
    
        //public static extern float realtimeSinceStartup()
        var addr_realtimeSinceStartup = find_method("UnityEngine.CoreModule","Time","realtimeSinceStartup",0,true)
        if (addr_realtimeSinceStartup != 0)
            LOG("[*] realtimeSinceStartup \t\t: "+new NativeFunction(addr_realtimeSinceStartup,'float',[])()+"\n--------------------",LogColor.C36)
    
        //public static extern float get_renderedFrameCount()
        var addr_get_renderedFrameCount = find_method("UnityEngine.CoreModule","Time","get_renderedFrameCount",0,true)
        if (addr_get_renderedFrameCount != 0)
            LOG("[*] renderedFrameCount \t\t: "+new NativeFunction(addr_get_renderedFrameCount,'float',[])()+"\n--------------------",LogColor.C36)
    
        //public static float smoothDeltaTime()
        var addr_smoothDeltaTime = find_method("UnityEngine.CoreModule","Time","smoothDeltaTime",0,true)
        if (addr_smoothDeltaTime != 0)
            LOG("[*] smoothDeltaTime \t\t: "+new NativeFunction(addr_smoothDeltaTime,'float',[])()+"\n--------------------",LogColor.C36)
    }
    
    function Application(){
        LOG("------------------- Application -------------------",LogColor.RED)
        
        var Addr_cloudProjectId         = find_method("UnityEngine.CoreModule","Application","get_cloudProjectId",0,true)
        var Addr_dataPath               = find_method("UnityEngine.CoreModule","Application","get_dataPath",0,true)
        var Addr_identifier             = find_method("UnityEngine.CoreModule","Application","get_identifier",0,true)
        var Addr_internetReachability   = find_method("UnityEngine.CoreModule","Application","get_internetReachability",0,true)
        var Addr_isMobilePlatform       = find_method("UnityEngine.CoreModule","Application","get_isMobilePlatform",0,true)
        var Addr_isConsolePlatform      = find_method("UnityEngine.CoreModule","Application","get_isConsolePlatform",0,true)
        var Addr_isEditor               = find_method("UnityEngine.CoreModule","Application","get_isEditor",0,true)
        var Addr_productName            = find_method("UnityEngine.CoreModule","Application","get_productName",0,true)
        var Addr_streamingAssetsPath    = find_method("UnityEngine.CoreModule","Application","get_streamingAssetsPath",0,true)
        var Addr_version                = find_method("UnityEngine.CoreModule","Application","get_version",0,true)
        var Addr_unityVersion           = find_method("UnityEngine.CoreModule","Application","get_unityVersion",0,true)
        var Addr_systemLanguage         = find_method("UnityEngine.CoreModule","Application","get_systemLanguage",0,true)
        var Addr_isPlaying              = find_method("UnityEngine.CoreModule","Application","get_isPlaying",0,true)
        var Addr_persistentDataPath     = find_method("UnityEngine.CoreModule","Application","get_persistentDataPath",0,true)
        var Addr_dpi                    = find_method("UnityEngine.CoreModule","Application","get_dpi",0,true)
        var Addr_get_height             = find_method("UnityEngine.CoreModule","Application","get_height",0,true)
        var Addr_get_width              = find_method("UnityEngine.CoreModule","Application","get_width",0,true)
        var Addr_get_orientation        = find_method("UnityEngine.CoreModule","Application","get_orientation",0,true)
    
        //public static string cloudProjectId()
        if (Addr_cloudProjectId != 0)
            LOG("[*] cloudProjectId \t\t: "+ 
            new NativeFunction(Addr_cloudProjectId,'pointer',[])()
            .add(p_size*3).readUtf16String()+"\n--------------------",LogColor.C36)
    
        //public static string get_productName()
        if (Addr_productName != 0)
            LOG("[*] productName \t\t: "+
            new NativeFunction(Addr_productName,'pointer',[])()
            .add(p_size*3).readUtf16String()+"\n--------------------",LogColor.C36)
    
        //public static extern string get_identifier()
        if (Addr_identifier != 0)
            LOG("[*] identifier \t\t\t: "+
            new NativeFunction(Addr_identifier,'pointer',[])()
            .add(p_size*3).readUtf16String()+"\n--------------------",LogColor.C36)
    
        //public static string version()
        if (Addr_version != 0)
            LOG("[*] version \t\t\t: "+ 
            new NativeFunction(Addr_version,'pointer',[])()
            .add(p_size*3).readUtf16String()+"\n--------------------",LogColor.C36)
    
        //public static string unityVersion()
        if (Addr_unityVersion != 0)
            LOG("[*] unityVersion \t\t: "+ 
            new NativeFunction(Addr_unityVersion,'pointer',[])()
            .add(p_size*3).readUtf16String()+"\n--------------------",LogColor.C36)
    
        //public static string dataPath()
        if (Addr_dataPath != 0)
            LOG("[*] dataPath \t\t\t: "+
            new NativeFunction(Addr_dataPath,'pointer',[])()
            .add(p_size*3).readUtf16String()+"\n--------------------",LogColor.C36)
    
        //public static string streamingAssetsPath()
        if (Addr_streamingAssetsPath != 0)
            LOG("[*] streamingAssetsPath \t: "+
            new NativeFunction(Addr_streamingAssetsPath,'pointer',[])()
            .add(p_size*3).readUtf16String()+"\n--------------------",LogColor.C36)
    
        //public static string persistentDataPath
        if (Addr_persistentDataPath !=0)
            LOG("[*] persistentDataPath \t\t: "+
            new NativeFunction(Addr_persistentDataPath,'pointer',[])()
            .add(p_size*3).readUtf16String()+"\n--------------------",LogColor.C36)
    
        //public static NetworkReachability internetReachability()
        if (Addr_internetReachability!=0){
            var value = new NativeFunction(Addr_internetReachability,'int',[])()
            LOG("[*] internetReachability \t: "+
                (value==0?"NotReachable":(value==1?"ReachableViaCarrierDataNetwork":"ReachableViaLocalAreaNetwork"))+"\n--------------------",LogColor.C36)
        }
    
        //public static bool get_isMobilePlatform()
        if (Addr_isMobilePlatform!=0)
            LOG("[*] isMobilePlatform \t\t: "+
            (new NativeFunction(Addr_isMobilePlatform,'bool',[])()==1?"true":"false")+"\n--------------------",LogColor.C36)
    
        //public static bool get_isConsolePlatform()
        if (Addr_isConsolePlatform!=0)
            LOG("[*] isConsolePlatform \t\t: "+
            (new NativeFunction(Addr_isConsolePlatform,'bool',[])()==1?"true":"false")+"\n--------------------",LogColor.C36)
    
        //public static bool get_isEditor()
        if (Addr_isEditor!=0)
            LOG("[*] isEditor \t\t\t: "+
            (new NativeFunction(Addr_isEditor,'bool',[])()==1?"true":"false")+"\n--------------------",LogColor.C36)
    
    
        //public static extern bool get_isPlaying();
        if (Addr_isPlaying !=0)
            LOG("[*] isPlaying \t\t\t: "+
            (new NativeFunction(Addr_isPlaying,'bool',[])()==1?"true":"false")+"\n--------------------",LogColor.C36)
        
        //public static float dpi() 
        if (Addr_dpi !=0)
            LOG("[*] dpi \t\t\t: "+
            new NativeFunction(Addr_dpi,'float',[])()+"\n--------------------",LogColor.C36)
    
        //public static extern int get_height()
        //public static extern int get_width()
        if (Addr_get_height != 0 && Addr_get_width != 0)
            LOG("[*] height*width \t\t: "+
            new NativeFunction(Addr_get_height,'int',[])()+"×"+
            new NativeFunction(Addr_get_width,'int',[])()+"\n--------------------",LogColor.C36)
    
        //public static ScreenOrientation get_orientation()
        if (Addr_get_orientation != 0){
            var value = new NativeFunction(Addr_get_orientation,'int',[])()
            switch (value){
                case 0:value = "Unknow" ; break
                case 1:value = "Portrait" ; break
                case 2:value = "PortraitUpsideDown" ; break
                case 3:value = "Landscape" ; break
                case 4:value = "LandscapeRight" ; break
                case 5:value = "AutoRotation" ; break
            }
            LOG("[*] ScreenOrientation \t\t: "+value,LogColor.C36)
        }
    
        //public static extern SystemLanguage get_systemLanguage()
        if (Addr_systemLanguage != 0){
            var value = new NativeFunction(Addr_systemLanguage,'int',[])()
            switch (value){
                case 6  : value = "Chinese" ; break
                case 40 : value = "ChineseSimplified" ; break
                case 41 : value = "ChineseTraditional" ; break
                case 10 : value = "English" ; break
                case 16 : value = "Japanese" ; break
                case 42 : value = "Unknown" ; break
                default : value = value;
            }
            LOG("[*] systemLanguage \t\t: "+value,LogColor.C36)
        }
    }
    
    function SystemInfo(){
        
        LOG("------------------- SystemInfo -------------------",LogColor.RED)
    
        var addr_get_deviceModel = find_method("UnityEngine.CoreModule","SystemInfo","get_deviceModel",0,true)
        var addr_get_deviceName = find_method("UnityEngine.CoreModule","SystemInfo","get_deviceName",0,true)
        var addr_get_deviceType = find_method("UnityEngine.CoreModule","SystemInfo","get_deviceType",0,true)
        var addr_get_deviceUniqueIdentifier = find_method("UnityEngine.CoreModule","SystemInfo","get_deviceUniqueIdentifier",0,true)
        var addr_get_graphicsDeviceID  = find_method("UnityEngine.CoreModule","SystemInfo","get_graphicsDeviceID",0,true)
        var addr_get_graphicsDeviceName = find_method("UnityEngine.CoreModule","SystemInfo","get_graphicsDeviceName",0,true)
        var addr_get_graphicsDeviceVersion = find_method("UnityEngine.CoreModule","SystemInfo","get_graphicsDeviceVersion",0,true)
        var addr_get_graphicsMemorySize = find_method("UnityEngine.CoreModule","SystemInfo","get_graphicsMemorySize",0,true)
        var addr_get_graphicsShaderLevel = find_method("UnityEngine.CoreModule","SystemInfo","get_graphicsShaderLevel",0,true)
        var addr_get_maxTextureSize = find_method("UnityEngine.CoreModule","SystemInfo","get_maxTextureSize",0,true)
        var addr_get_operatingSystem = find_method("UnityEngine.CoreModule","SystemInfo","get_operatingSystem",0,true)
        var addr_get_processorType = find_method("UnityEngine.CoreModule","SystemInfo","get_processorType",0,true)
        var addr_get_systemMemorySize = find_method("UnityEngine.CoreModule","SystemInfo","get_systemMemorySize",0,true)
        var addr_get_processorCount = find_method("UnityEngine.CoreModule","SystemInfo","get_processorCount",0,true)
        var addr_get_operatingSystemFamily = find_method("UnityEngine.CoreModule","SystemInfo","get_operatingSystemFamily",0,true)
    
        if (addr_get_deviceModel != 0)
            LOG("[*] deviceModel \t\t: "+ 
            new NativeFunction(addr_get_deviceModel,'pointer',[])()
            .add(p_size*3).readUtf16String()+"\n--------------------",LogColor.C36)
    
        if (addr_get_deviceName != 0)
            LOG("[*] deviceName \t\t\t: "+ 
            new NativeFunction(addr_get_deviceName,'pointer',[])()
            .add(p_size*3).readUtf16String()+"\n--------------------",LogColor.C36)
        
        if (addr_get_deviceType != 0)
            LOG("[*] deviceType \t\t\t: "+ 
            DeviceType(new NativeFunction(addr_get_deviceType,'int',[])())+"\n--------------------",LogColor.C36)
        
        if (addr_get_deviceUniqueIdentifier != 0)
            LOG("[*] deviceUniqueIdentifier \t: "+ 
            new NativeFunction(addr_get_deviceUniqueIdentifier,'pointer',[])()
            .add(p_size*3).readUtf16String()+"\n--------------------",LogColor.C36)
        
        if (addr_get_graphicsDeviceID != 0)
            LOG("[*] graphicsDeviceID \t\t: "+ 
            new NativeFunction(addr_get_graphicsDeviceID,'int',[])()+"\n--------------------",LogColor.C36)
        
        if (addr_get_graphicsDeviceName != 0)
            LOG("[*] graphicsDeviceName \t\t: "+ 
            new NativeFunction(addr_get_graphicsDeviceName,'pointer',[])()
            .add(p_size*3).readUtf16String()+"\n--------------------",LogColor.C36)
            
        if (addr_get_graphicsDeviceVersion != 0)
            LOG("[*] graphicsDeviceVersion \t: "+ 
            new NativeFunction(addr_get_graphicsDeviceVersion,'pointer',[])()
            .add(p_size*3).readUtf16String()+"\n--------------------",LogColor.C36)
        
        if (addr_get_graphicsShaderLevel != 0)
            LOG("[*] graphicsShaderLevel \t: "+ 
            new NativeFunction(addr_get_graphicsShaderLevel,'int',[])()+"\n--------------------",LogColor.C36)
            
        if (addr_get_graphicsMemorySize != 0)
            LOG("[*] graphicsMemorySize \t\t: "+ 
            new NativeFunction(addr_get_graphicsMemorySize,'int',[])()+"\n--------------------",LogColor.C36)
        
        if (addr_get_maxTextureSize != 0)
            LOG("[*] maxTextureSize \t\t: "+ 
            new NativeFunction(addr_get_maxTextureSize,'int',[])()+"\n--------------------",LogColor.C36)
        
        if (addr_get_operatingSystem != 0)
            LOG("[*] operatingSystem \t\t: "+ 
            new NativeFunction(addr_get_operatingSystem,'pointer',[])()
            .add(p_size*3).readUtf16String()+"\n--------------------",LogColor.C36)
    
        if (addr_get_processorType != 0)
            LOG("[*] processorType \t\t: "+ 
            new NativeFunction(addr_get_processorType,'pointer',[])()
            .add(p_size*3).readUtf16String()+"\n--------------------",LogColor.C36)
            
        if (addr_get_systemMemorySize != 0)
            LOG("[*] systemMemorySize \t\t: "+ 
            new NativeFunction(addr_get_systemMemorySize,'int',[])()+"\n--------------------",LogColor.C36)
        
        if (addr_get_processorCount != 0)
            LOG("[*] processorCount \t\t: "+ 
            new NativeFunction(addr_get_processorCount,'int',[])()+"\n--------------------",LogColor.C36)
    
        if (addr_get_operatingSystemFamily != 0)
            LOG("[*] operatingSystemFamily \t: "+ 
            operatingSystemFamily(new NativeFunction(addr_get_operatingSystemFamily,'int',[])())+"\n--------------------",LogColor.C36)
        
        function operatingSystemFamily(int_arg){
            switch(int_arg){
                case 0 : return "Other"
                case 1 : return "MaxOsX"
                case 2 : return "Windows"
                case 3 : return "Linux"
            }
        }
        
        function DeviceType(int_arg){
            switch(int_arg){
                case 0 : return "Unknown"
                case 1 : return "Handeld"
                case 2 : return "Desktop"
                case 3 : return "Console"
            }
        }
    }
}

function setActive(gameObj,visible){
    new NativeFunction(find_method("UnityEngine.CoreModule","GameObject","SetActive",1,true),'pointer',['pointer','int'])(ptr(gameObj),visible)
}

function HookSetActive(){
    Interceptor.attach(find_method("UnityEngine.CoreModule","GameObject","SetActive",1,true),{
        onEnter:function(args){
            if (args[1].toInt32() == 1 || args[1].toInt32() == 0) {
                LOG("\n--------------------------------------",LogColor.YELLOW)
                LOG("public extern void SetActive( "+(args[1].toInt32()==0?"false":"true")+" );",LogColor.C36)
                LOG("-------------------",LogColor.C33)
                showGameObject(args[0])
            }
        },
        onLeave:function(retval){

        }
    })
}
 
function HookOnPointerClick(){

    var pointerEventData = null
    Interceptor.attach(find_method("UnityEngine.UI","Button","OnPointerClick",1),{
        onEnter:function(args){

            LOG("\n--------------------------------------",LogColor.YELLOW)
            LOG("public void OnPointerClick( "+(args[1])+" );",LogColor.C36)
            pointerEventData = args[1]
            
            var f_get_pointerEnter = new NativeFunction(find_method("UnityEngine.UI","PointerEventData","get_pointerEnter",0),'pointer',['pointer'])
            var gameObj = f_get_pointerEnter(pointerEventData)
            
            var f_getTransform   = new NativeFunction(find_method("UnityEngine.CoreModule","GameObject","get_transform",0),'pointer',['pointer'])
            var m_transform = f_getTransform(gameObj)

            showGameObject(gameObj)

            // showTransform(m_transform)

            // showEventData(pointerEventData)
        },
        onLeave:function(retval){

        } 
    })
}

function HookPlayerPrefs(){

    var isShowPrintStack = false

    var Addr_GetFloat       = find_method("UnityEngine.CoreModule","PlayerPrefs","GetFloat",2,true)
    var Addr_GetInt         = find_method("UnityEngine.CoreModule","PlayerPrefs","GetInt",2,true)
    var Addr_GetString      = find_method("UnityEngine.CoreModule","PlayerPrefs","GetString",1,true)

    var Addr_SetFloat       = find_method("UnityEngine.CoreModule","PlayerPrefs","SetFloat",2,true)
    var Addr_SetInt         = find_method("UnityEngine.CoreModule","PlayerPrefs","SetInt",2,true)
    var Addr_SetString      = find_method("UnityEngine.CoreModule","PlayerPrefs","SetString",2,true)

    InterceptorGetFunctions()

    InterceptorSetFunctions()

    function InterceptorGetFunctions(){

        //public static extern float GetFloat(string key, float defaultValue)
        if (Addr_GetFloat !=0){
            Interceptor.attach(Addr_GetFloat,{
                onEnter:function(args){
                    this.arg0 = args[0]
                    this.arg1 = args[1]
                },
                onLeave:function(ret){
                    LOG("\n[*] '"+ret +"' = GetFloat('"+this.arg0.add(p_size*3).readUtf16String()+"','"+this.arg1+"')",LogColor.C36)
                    if (isShowPrintStack) PrintStackTraceN(this.context)
                }
            })
        }

        //public static extern int GetInt(string key, int defaultValue)
        if (Addr_GetInt !=0){
            Interceptor.attach(Addr_GetInt,{
                onEnter:function(args){
                    this.arg0 = args[0]
                    this.arg1 = args[1]
                },
                onLeave:function(ret){
                    LOG("\n[*] '"+ret.toInt32() +"' = GetInt('"+this.arg0.add(p_size*3).readUtf16String()+"','"+this.arg1+"')",LogColor.C36)
                    if (isShowPrintStack) PrintStackTraceN(this.context)
                }
            })
        }
        
        //public static string GetString(string key)
        if (Addr_GetString !=0){
            Interceptor.attach(Addr_GetString,{
                onEnter:function(args){
                    this.arg0 = args[0]
                },
                onLeave:function(ret){
                    LOG("\n[*] '"+ret.add(p_size*3).readUtf16String()+"' = GetString('"+this.arg0.add(p_size*3).readUtf16String()+"')",LogColor.C36)
                    if (isShowPrintStack) PrintStackTraceN(this.context)
                }
            })
        }
    }

    function InterceptorSetFunctions(){

        //public static extern float GetFloat(string key, float defaultValue)
        if (Addr_SetFloat != 0){
            Interceptor.attach(Addr_SetFloat,{
                onEnter:function(args){
                    this.arg0 = args[0].add(p_size*3).readUtf16String()
                    this.arg1 = args[1].readFloat()
                },
                onLeave:function(ret){
                    LOG("\n[*] SetFloat('"+this.arg0+"','"+this.arg1+"')",LogColor.C36)
                    if (isShowPrintStack) PrintStackTraceN(this.context)
                }
            })
        }
        
        //public static extern int GetInt(string key, int defaultValue)
        if (Addr_SetInt!=0){
            Interceptor.attach(Addr_SetInt,{
                onEnter:function(args){
                    this.arg0 = args[0].add(p_size*3).readUtf16String()
                    this.arg1 = args[1]
                },
                onLeave:function(ret){
                    LOG("\n[*] SetInt('"+this.arg0+"','"+this.arg1+"')",LogColor.C36)
                    if (isShowPrintStack) PrintStackTraceN(this.context)
                }
            })
        }
        
        //public static string GetString(string key)
        if (Addr_SetString!=0){
            Interceptor.attach(Addr_SetString,{
                onEnter:function(args){
                    this.arg0 = args[0].add(p_size*3).readUtf16String()
                    this.arg1 = args[1].add(p_size*3).readUtf16String()
                },
                onLeave:function(ret){
                    LOG("\n[*] SetString('"+this.arg0+"','"+this.arg1+"')",LogColor.C36)
                    if (isShowPrintStack) PrintStackTraceN(this.context)
                }
            })
        }
    }
}

function HookDebugLog(){
    var addr_log_debug = find_method("UnityEngine.CoreModule","Debug","Log",1,true)
    if (addr_log_debug != 0){
        Interceptor.attach(addr_log_debug,{
            onEnter:function(args){
                LOG("\n[*] Debug.LOG('"+args[0].add(p_size*3).readUtf16String()+"')",LogColor.C36)
            },
            onLeave:function(ret){
    
            }
        })
    }

    var addr_log_logger = find_method("UnityEngine.CoreModule","Logger","Log",1,true)
    if (addr_log_logger != 0){
        Interceptor.attach(addr_log_logger,{
            onEnter:function(args){
                LOG("\n[*] Logger.LOG('"+args[0].add(p_size*3).readUtf16String()+"')",LogColor.C32)
            },
            onLeave:function(ret){
    
            }
        })
    }
}

function HookLoadScene(){
    var GetActiveScene = new NativeFunction(find_method("UnityEngine.CoreModule","SceneManager","GetActiveScene",0),'pointer',[])
    var scene = GetActiveScene()

    var get_name = new NativeFunction(find_method("UnityEngine.CoreModule","Scene","get_name",0),'pointer',['pointer'])
    
    LOG(hexdump(get_name(scene)))
}
