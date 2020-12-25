/* 上面这个s_Base的地址以及两个结构体的大小可以手动的去IDA查看但是这里也提出两个方法去动态获取
    1.由导出函数il2cpp_init倒数第二行BL动态解析到跳转位置，
        再由mscorlib.dll出现的位置倒数往上推32个指针位置即可找到BL以及BL的下一条CMP来确定跳转地址，
        然后跳转过去继续手动指令解析即可获取
    2.由showAddr得到一个常用的Unity函数地址，就是MethodInfo*，Il2CppClass*，通过该结构体中的parent字段逐级回溯
 */ 

const soName = "libil2cpp.so"
const soAddr = Module.findBaseAddress("libil2cpp.so")
const p_size = Process.pointerSize

var b_init = true
const a_image_name = new Array()
const a_image_addr = new Array()
const a_class_addr = new Array()
const a_class_count = new Array()

//赋值语句下面第二个地址 s_TypeInfoDefinitionTable 的地址
const s_Base = soAddr.add(0xCC6474)
//if 语句上面第三个函数第二个参数
const sizeof_Il2CppImage = 56
//if 语句上面那个函数第二个参数
const sizeof_Assembliy = 64

const s_TypeInfoDefinitionTable =   s_Base.readPointer()
const s_ImagesCount             =   s_Base.add(p_size*3).readPointer().toInt32()
const s_ImagesTable             =   s_Base.add(p_size*4).readPointer()
const s_AssembliesCount         =   s_Base.add(p_size*5).readPointer().toInt32()
const s_AssembliesTable         =   s_Base.add(p_size*6).readPointer()

function hook_test(){
    Interceptor.attach(Module.findExportByName(soName,"il2cpp_class_get_methods"),{
        onEnter:function(args){
            // console.log(hexdump(args[0]))
        },
        onLeave:function(ret){
            console.error("--------------------------------------------------------")
            console.log(hexdump(ret,{length:16}))
            console.log("methodPointer => \t"+ret.readPointer() +"\t ===> \t"+ret.readPointer().sub(soAddr))
            console.log("invoker_method => \t"+ret.add(p_size*1).readPointer() +"\t ===> \t"+ret.add(p_size*1).readPointer().sub(soAddr))
            console.log("MethodName => \t\t"+ret.add(p_size*2).readPointer().readCString())
            var klass = ret.add(p_size*3).readPointer()
            console.log("namespaze => \t\t"+klass.add(p_size*3).readPointer().readCString()+"."
                +klass.add(p_size*2).readPointer().readCString())
        }
    })

    //Il2CppClass* il2cpp_class_from_name(const Il2CppImage* image, const char* namespaze, const char *name)
    Interceptor.attach(Module.findExportByName(soName,"il2cpp_class_from_name"),{
        onEnter:function(args){
            console.warn("onEnter il2cpp_class_from_name")
            if (args[1].readCString().indexOf("UnityEngine") == 0){
                Il2CppImage = args[0]
                console.log("Il2CppImage* \t",args[0])
                console.log("namespaze* \t",args[1].readCString())
                console.log("name* \t",args[2].readCString())
            }
        },
        onLeave:function(ret){
            
        }
    })
}

setImmediate(list_Images)
function list_Images(keywords){
    var tmp = s_ImagesCount + 1
    var current_off = s_TypeInfoDefinitionTable
    if (!b_init){
        console.warn("-------------------------------------------------------------------------------------")
        for(var t=0;t<s_ImagesCount;t++){
            var tt = s_ImagesTable.add(sizeof_Il2CppImage*t)
            var typeCount = tt.add(p_size*4).readPointer().toInt32()
            var name = tt.add(p_size).readPointer().readCString()
            if (keywords != undefined){
                if (name.indexOf(keywords)!=-1){
                    console.log("\n\x1b[36m [*]",tt,"\t",name+"\x1b[0m")
                    console.log("\t\t\t\x1b[36m","Il2CppAssembly","\t--->\t",tt.add(p_size*2).readPointer(),"\x1b[0m")
                    console.log("\t\t\t\x1b[36m","Il2CppClass","\t\t--->\t",current_off,"\x1b[0m")
                    console.log("\t\t\t\x1b[36m","typeStart","\t\t--->\t",tt.add(p_size*3).readPointer(),"\t\ttypeCount =",typeCount,"\x1b[0m")
                }else{--tmp}
            }else{
                console.log("\n\x1b[36m [*]",tt,"\t",name+"\x1b[0m")
                console.log("\t\t\t\x1b[36m","Il2CppAssembly","\t--->\t",tt.add(p_size*2).readPointer(),"\x1b[0m")
                console.log("\t\t\t\x1b[36m","Il2CppClass","\t\t--->\t",current_off,"\x1b[0m")
                console.log("\t\t\t\x1b[36m","typeStart","\t\t--->\t",tt.add(p_size*3).readPointer(),"\t\ttypeCount =",typeCount,"\x1b[0m")
            }
            current_off = current_off.add(typeCount*p_size)
        }
        console.warn("\n----------------------------")
        console.error("  List ",keywords==undefined?tmp:--tmp," Images")
        console.warn("-------------------------------------------------------------------------------------")
    }else{
        b_init = !b_init
        for(var t=0;t<s_ImagesCount;t++){
            var tt = s_ImagesTable.add(sizeof_Il2CppImage*t)
            var typeCount = tt.add(p_size*4).readPointer().toInt32()
            a_image_name.push(tt.add(p_size).readPointer().readCString())
            a_class_addr.push(current_off)
            a_image_addr.push(tt)
            a_class_count.push(typeCount)
            current_off = current_off.add(typeCount*p_size)
        }
    }
}

function list_Classes(AddrOrName,from,to,typeCount){
    if (AddrOrName == undefined){
        console.error("please input a Addr or Name")
        return
    }
    var addr = null
    try{
        addr = ptr(AddrOrName)
    }catch(e){
        addr = get_cls_by_name(AddrOrName)
    }
    if (typeCount == undefined) typeCount = get_count_by_addr(addr)
    if (from !=undefined && from !="" && to != undefined && to !=""){
        console.warn("---------------------------------------------")
        for (var t = from;t<to;t++){
            var t_Il2CppClass = addr.add(t*p_size).readPointer()
            console.log("Il2CppClass \t--->\t"+addr.add(t*p_size))
            console.log("Il2CppImage \t--->\t"+t_Il2CppClass.add(p_size*0))
            console.log("ClassName \t--->\t"+t_Il2CppClass.add(p_size*2).readPointer().readCString())
            console.log("NameSpaze \t--->\t"+t_Il2CppClass.add(p_size*3).readPointer().readCString())
            console.warn("---------------------------------------------")
        }
        console.error("Count Classes : ",to-from,"\t|\tAll Classs : ",typeCount)
        console.error("From index : \t",from," to ",to)
        console.warn("---------------------------------------------"+"\n")
    }else{
        console.warn("---------------------------------------------")
        for (var t = 0;t<typeCount;t++){
            var t_Il2CppClass = addr.add(t*p_size).readPointer()
            console.log("Il2CppClass \t--->\t"+addr.add(t*p_size))
            console.log("Il2CppImage \t--->\t"+t_Il2CppClass.add(p_size*0))
            console.log("ClassName \t--->\t"+t_Il2CppClass.add(p_size*2).readPointer().readCString())
            console.log("NameSpaze \t--->\t"+t_Il2CppClass.add(p_size*3).readPointer().readCString())
            console.warn("---------------------------------------------")
        }
        console.error("Count Classes : ",typeCount)
        console.warn("---------------------------------------------"+"\n")
    }
}

function list_NameSpacesFromClass(AddrOrName,filterNameSp){
    if (AddrOrName == undefined){
        console.error("please input a Addr or a Name")
        return
    }
    if (filterNameSp == undefined){
        console.error("please input filterNameSp")
        return
    } 
    var addr = null
    try{
        addr = ptr(AddrOrName)
    }catch(e){
        addr = get_cls_by_name(AddrOrName)
    }
    var Count = 0
    var CountAll = get_count_by_addr(addr)
    console.warn("---------------------------------------------")
    new Set()
    for (var t = 0;t<get_count_by_addr(addr);t++){




        var t_Il2CppClass = addr.add(t*p_size).readPointer()
        var NameSpaze = t_Il2CppClass.add(p_size*3).readPointer().readCString()
        if (filterNameSp != ""){
            if (filterNameSp!="" && filterNameSp.indexOf(NameSpaze)!=-1){
                console.log("Il2CppClass \t--->\t"+addr.add(t*p_size))
                console.log("Il2CppImage \t--->\t"+t_Il2CppClass.add(p_size*0))
                console.log("ClassName \t--->\t"+t_Il2CppClass.add(p_size*2).readPointer().readCString())
                console.log("NameSpaze \t--->\t"+t_Il2CppClass.add(p_size*3).readPointer().readCString())
                console.warn("---------------------------------------------")
            }  
        }else{
            if (filterNameSp == NameSpaze){
                console.log("Il2CppClass \t--->\t"+addr.add(t*p_size))
                console.log("Il2CppImage \t--->\t"+t_Il2CppClass.add(p_size*0))
                console.log("ClassName \t--->\t"+t_Il2CppClass.add(p_size*2).readPointer().readCString())
                console.log("NameSpaze \t--->\t"+t_Il2CppClass.add(p_size*3).readPointer().readCString())
                console.warn("---------------------------------------------")
            }
        }
        Count ++
    }
    console.error("Count Classes : ",Count," of all ",CountAll)
    console.warn("---------------------------------------------"+"\n")
}

function list_Assemblies(){
    console.warn("--------------------------------------------------------")
    var tmp = s_AssembliesCount + 1
    for(var t=0;t<s_AssembliesCount;t++){
        console.log("\n\x1b[36m [*]",s_AssembliesTable.add(sizeof_Assembliy*t),"\t",
        s_AssembliesTable.add(sizeof_Assembliy*t).add(p_size*4).readPointer().readCString()+"\x1b[0m")
    }
    console.warn("---------------------------------------------------------")
    console.error("  List ",tmp," Assemblies")
    console.warn("----------------------------")
}

function get_img_by_name(imgName){
    for(var i=0 ;i<a_image_name.length;i++ ){
        if( a_image_name[i]==imgName) {
            return a_image_addr[i]
        }
    }
    return ptr(0)
}

function get_cls_by_name(imgName){
    for(var i=0 ;i<a_image_name.length;i++ ){
        if( a_image_name[i]==imgName) {
            return a_class_addr[i]
        }
    }
    return ptr(0)
}

function get_count_by_addr(addr){
    for(var i=0 ;i<a_image_addr.length;i++ ){
        if( Number(a_class_addr[i])==Number(addr)) {
            return a_class_count[i]
        }
    }
    return 0
}

function find_class(AddrorName,className){
    var addr = null
    try{
        addr = ptr(AddrorName)
    }catch(e){
        addr = get_cls_by_name(AddrorName)
    }
    var typeCount = typeCount == undefined ? get_count_by_addr(addr) : typeCount
    for (var t = 0;t<typeCount;t++){
        var t_Il2CppClass = addr.add(t*p_size).readPointer()
        if (t_Il2CppClass.add(p_size*2).readPointer().readCString() == className) return addr.add(t*p_size)
        // console.log("Il2CppClass \t--->\t"+addr.add(t*p_size))
        // console.log("Il2CppImage \t--->\t"+t_Il2CppClass.add(p_size*0))
        // console.log("NameSpaze \t--->\t"+t_Il2CppClass.add(p_size*3).readPointer().readCString())
        // console.warn("---------------------------------------------")
    }
    return 0 
}

function find_method(imgName,className,functionName,argsCount,isRealAddr){
    var addr_Il2CppClass = find_class(imgName,className)
    if(addr_Il2CppClass == 0){
        console.warn("Il2CppClass addr not found!")
        return
    }
    if (isRealAddr == undefined){
        console.warn("--------------------------------------------------------")
        console.error(imgName+","+className+","+functionName,"\targsCount:",argsCount)
        console.warn("----------------------------")
        console.log("Il2CppImage\t---->\t",addr_Il2CppClass)
        //const MethodInfo* il2cpp_class_get_method_from_name(Il2CppClass *klass, const char* name, int argsCount)
        var il2cpp_class_get_method_from_name = new NativeFunction(
            Module.findExportByName(soName,"il2cpp_class_get_method_from_name"),
            'pointer',['pointer','pointer','int'])
        var MethodInfo = il2cpp_class_get_method_from_name(addr_Il2CppClass.readPointer(),Memory.allocUtf8String(functionName),argsCount)
        if (MethodInfo == 0){
            console.error("Error to find MethodInfo")
            return
        }
        console.log("MethodInfo\t---->\t",MethodInfo)
        console.log("\x1b[36mmethodPointer\t---->\t "+MethodInfo.readPointer() +"\t ===> \t"+MethodInfo.readPointer().sub(soAddr)+"\x1b[0m")
        console.warn("--------------------------------------------------------")
    } else {
        var il2cpp_class_get_method_from_name = new NativeFunction(
            Module.findExportByName(soName,"il2cpp_class_get_method_from_name"),
            'pointer',['pointer','pointer','int'])
        var MethodInfo = il2cpp_class_get_method_from_name(addr_Il2CppClass.readPointer(),Memory.allocUtf8String(functionName),argsCount)
        if (MethodInfo == 0){
            console.error("Error to find MethodInfo")
            return
        }
        return isRealAddr?MethodInfo.readPointer():MethodInfo.readPointer().sub(soAddr)
    }
    
}

function showAddr(nameSpaze,className,functionName,argsCount){

    Il2CppImage = findAddrByName(nameSpaze)
    for(var t=0;t<s_ImagesCount;t++){
        var t_name = s_ImagesTable.add(sizeof_Il2CppImage*t).add(p_size).readPointer().readCString()
        if (t_name == nameSpaze) {
            Il2CppImage = ptr(s_ImagesTable.add(sizeof_Il2CppImage*t))
            break
        }else{
            Il2CppImage = ptr(0)
        }
    }
    if (Il2CppImage == 0) {
        console.warn("Il2CppImage addr not found!")
        return
    }
    console.warn("---------------------------------------------------------")
    console.error(nameSpaze+"."+className+"."+functionName)
    console.warn("----------------------------")
    console.log("Il2CppImage\t---->\t "+Il2CppImage)

    //Il2CppClass* il2cpp_class_from_name(const Il2CppImage* image, const char* namespaze, const char *name)
    var il2cpp_class_from_name = new NativeFunction(
        Module.findExportByName(soName,"il2cpp_class_from_name"),
        'pointer',['pointer','pointer','pointer'])

    //const MethodInfo* il2cpp_class_get_method_from_name(Il2CppClass *klass, const char* name, int argsCount)
    var il2cpp_class_get_method_from_name = new NativeFunction(
        Module.findExportByName(soName,"il2cpp_class_get_method_from_name"),
        'pointer',['pointer','pointer','int'])
    
    var namespaze_t = Memory.allocUtf8String(nameSpaze)
    var className_t = Memory.allocUtf8String(className)
    var functionName_t = Memory.allocUtf8String(functionName)

    var Il2CppClass = il2cpp_class_from_name(Il2CppImage,namespaze_t,className_t)
    console.log("Il2CppClass\t---->\t",Il2CppClass)

    var MethodInfo = il2cpp_class_get_method_from_name(Il2CppClass,functionName_t,argsCount)
    console.log("MethodInfo\t---->\t",MethodInfo)
    console.log("\x1b[36mmethodPointer\t---->\t "+MethodInfo.readPointer() +"\t ===> \t"+MethodInfo.readPointer().sub(soAddr)+"\x1b[0m")
    console.warn("---------------------------------------------------------")
}

function HookUnityFunctions(){
    
    var soAddr = Module.findBaseAddress(soName)

    // Random()
    // Time()
    Application()
    // PlayerPrefs()
    // CurrentScene()

    function Random(){
        
        console.error("------------------- Random -------------------")
        //public static int RandomRange(int min, int max)
        var value = new NativeFunction(soAddr.add(0x10E382C),'int',['int','int'])(100,200)
        console.log("RandomRange int \t: "+value)

        var value = new NativeFunction(soAddr.add(0x10E37D4),'float',['float','float'])(100,200)
        console.log("RandomRange float \t: "+value)

        console.error("------------------- Random -------------------")
    }

    function Time(){

        console.error("------------------- TIME -------------------")

        //public static extern float get_time()
        var value = new NativeFunction(soAddr.add(0x1560C88),'float',[])()
        console.log("[*] get_time \t\t\t: "+value+"\n--------------------")

        //public static float deltaTime()
        var value = new NativeFunction(soAddr.add(0x1560D18),'float',[])()
        console.log("[*] deltaTime \t\t\t: "+value +"\n--------------------")

        //public static extern float get_fixedDeltaTime()
        var value = new NativeFunction(soAddr.add(0x1560E38),'float',[])()
        console.log("[*] fixedDeltaTime \t\t: "+value +"\n--------------------")

        //public static extern float get_fixedTime()
        var value = new NativeFunction(soAddr.add(0x1560D60),'float',[])()
        console.log("[*] fixedTime \t\t\t: "+value +"\n--------------------")

        //public static extern int get_frameCount()
        var value = new NativeFunction(soAddr.add(0x1560F60),'int',[])()
        console.log("[*] frameCount \t\t\t: "+value +"\n--------------------")

        //public static extern bool get_inFixedTimeStep()
        var value = new NativeFunction(soAddr.add(0x1561038),'bool',[])()
        console.log("[*] inFixedTimeStep \t\t: "+(value==0?"false":"true") +"\n--------------------")
    
        //public static extern float get_realtimeSinceStartup()
        var value = new NativeFunction(soAddr.add(0x1560FF0),'float',[])()
        console.log("[*] realtimeSinceStartup \t: "+value+"\n--------------------")
    
        //public static extern int get_renderedFrameCount()
        var value = new NativeFunction(soAddr.add(0x1560FA8),'int',[])()
        console.log("[*] renderedFrameCount \t\t: "+value+"\n--------------------")
    
        //public static float smoothDeltaTime()
        var value = new NativeFunction(soAddr.add(0x1560E80),'float',[])()
        console.log("[*] smoothDeltaTime \t\t: "+value)
    
        console.error("------------------- TIME -------------------")
    }

    function Application(){
        console.error("------------------- Application -------------------")

        var Addr_cloudProjectId         = soAddr.add(0x112D410)
        var Addr_dataPath               = soAddr.add(0x112D1D0)
        var Addr_identifier             = soAddr.add(0x112D380)
        var Addr_internetReachability   = soAddr.add(0x112D6AC)
        var Addr_isMobilePlatform       = soAddr.add(0x112D5E0)
        var Addr_isPlaying              = soAddr.add(0x112D138)
        var Addr_persistentDataPath     = soAddr.add(0x112D260)
        var Addr_dpi                    = soAddr.add(0x10F1FA8)
        var Addr_get_height             = soAddr.add(0x10F1F18)
        var Addr_get_width              = soAddr.add(0x10F1F60)
        var Addr_get_orientation        = soAddr.add(0x10F2038)
        
        //public static string cloudProjectId()
        if (Addr_cloudProjectId != soAddr)
            console.log("[*] cloudProjectId \t\t: "+ 
            new NativeFunction(Addr_cloudProjectId,'pointer',[])()
            .add(12).readUtf16String()+"\n--------------------")

        //public static string dataPath()
        if (Addr_dataPath != soAddr)
            console.log("[*] dataPath \t\t\t: "+
            new NativeFunction(Addr_dataPath,'pointer',[])()
            .add(12).readUtf16String()+"\n--------------------")

        //public static extern string get_identifier()
        if (Addr_identifier != soAddr)
            console.log("[*] identifier \t\t\t: "+
            new NativeFunction(Addr_identifier,'pointer',[])()
            .add(12).readUtf16String()+"\n--------------------")

        //public static NetworkReachability internetReachability()
        if (Addr_internetReachability!=soAddr){
            var value = new NativeFunction(Addr_internetReachability,'int',[])()
            console.log("[*] internetReachability \t: "+
                (value==0?"NotReachable":(value==1?"ReachableViaCarrierDataNetwork":"ReachableViaLocalAreaNetwork"))+"\n--------------------")
        }
        
        //public static bool get_isMobilePlatform()
        if (Addr_isMobilePlatform!=soAddr)
            console.log("[*] isMobilePlatform \t\t: "+
            (new NativeFunction(Addr_isMobilePlatform,'bool',[])()==1?"true":"false")+"\n--------------------")

        //public static extern bool get_isPlaying();
        if (Addr_isPlaying !=soAddr)
            console.log("[*] isPlaying \t\t\t: "+
            (new NativeFunction(Addr_isPlaying,'bool',[])()==1?"true":"false")+"\n--------------------")

        //public static string persistentDataPath
        if (Addr_persistentDataPath !=soAddr)
            console.log("[*] persistentDataPath \t\t: "+
            new NativeFunction(Addr_persistentDataPath,'pointer',[])()
            .add(12).readUtf16String()+"\n--------------------")
        
        //public static float dpi() 
        if (Addr_dpi !=soAddr)
            console.log("[*] dpi \t\t\t: "+
            new NativeFunction(Addr_dpi,'float',[])()+"\n--------------------")

        //public static extern int get_height()
        //public static extern int get_width()
        if (Addr_get_height != soAddr && Addr_get_width != soAddr)
            console.log("[*] height*width \t\t: "+
            new NativeFunction(Addr_get_height,'int',[])()+"×"+
            new NativeFunction(Addr_get_width,'int',[])()+"\n--------------------")

        //public static ScreenOrientation get_orientation()
        if (Addr_get_orientation != soAddr){
            var value = new NativeFunction(Addr_get_orientation,'int',[])()
            switch (value){
                case 0:value = "Unknow" ; break
                case 1:value = "Portrait" ; break
                case 2:value = "PortraitUpsideDown" ; break
                case 3:value = "Landscape" ; break
                case 4:value = "LandscapeRight" ; break
                case 5:value = "AutoRotation" ; break
            }
            console.log("[*] ScreenOrientation \t\t: "+value)
        }

        console.error("------------------- Application -------------------")
    }

    function PlayerPrefs(){
        console.error("------------------- PlayerPrefs -------------------")
        var isShowPrintStack = false

        // var cloudProjectIdAddr = soAddr.add(0x112D410)
        var Addr_GetFloat       = soAddr.add(0x8C0BE0)
        var Addr_GetInt         = soAddr.add(0x8C0AB0)
        var Addr_GetGetString   = soAddr.add(0x8C0D6C)
        // var Addr_SetFloat       = soAddr.add(0x10DFD74)
        // var Addr_SetInt         = soAddr.add(0x10DFB68)
        // var Addr_SetString      = soAddr.add(0x10DFEA8)

        // InterceptorFunctions()

        function InterceptorFunctions(){

            //public static extern float GetFloat(string key, float defaultValue)
            Interceptor.attach(Addr_GetFloat,{
                onEnter:function(args){
                    this.arg0 = args[0]
                    this.arg1 = args[1]
                },
                onLeave:function(ret){
                    console.log("\n"+ret +" = GetFloat('"+this.arg0.add(12).readUtf16String()+","+this.arg1+"')")
                    if (isShowPrintStack) PrintStackTraceN(this.context)
                }
            })

            //public static extern int GetInt(string key, int defaultValue)
            Interceptor.attach(Addr_GetInt,{
                onEnter:function(args){
                    this.arg0 = args[0]
                    this.arg1 = args[1]
                },
                onLeave:function(ret){
                    console.log("\n"+ret.toInt32() +" = GetInt('"+this.arg0.add(12).readUtf16String()+","+this.arg1+"')")
                    if (isShowPrintStack) PrintStackTraceN(this.context)
                }
            })

            //public static string GetString(string key)
            Interceptor.attach(Addr_GetGetString,{
                onEnter:function(args){
                    this.arg0 = args[0]
                },
                onLeave:function(ret){
                    console.log("\n'"+ret.add(12).readUtf16String()+"' = GetString('"+this.arg0.add(12).readUtf16String()+"')")
                    if (isShowPrintStack) PrintStackTraceN(this.context)
                }
            })
        }

        function SetInt(key,value){
            var temp_size = 100
            var header_size = Process.pointerSize*3
            var str_header = new NativeFunction(cloudProjectIdAddr,'pointer',[])()
            var temp_k = Memory.alloc(temp_size)
            var tk = Memory.allocUtf16String(key)
            Memory.copy(temp_k,str_header,header_size)
            Memory.copy(temp_k.add(header_size),tk,temp_size - header_size)
            new NativeFunction(Addr_SetInt,'void',['pointer','int'])(temp_k,value)
        }

        function SetFloat(key,value){
            var temp_size = 100
            var header_size = Process.pointerSize*3
            var str_header = new NativeFunction(cloudProjectIdAddr,'pointer',[])()
            var temp_k = Memory.alloc(temp_size)
            var tk = Memory.allocUtf16String(key)
            Memory.copy(temp_k,str_header,header_size)
            Memory.copy(temp_k.add(header_size),tk,temp_size - header_size)
            new NativeFunction(Addr_SetFloat,'void',['pointer','float'])(temp_k,value)
        }

        function SetString(key,value){
            var temp_size = 100
            var header_size = Process.pointerSize*3
            var str_header = new NativeFunction(cloudProjectIdAddr,'pointer',[])()
            var temp_k = Memory.alloc(temp_size)
            var temp_v = Memory.alloc(temp_size)
            var tk = Memory.allocUtf16String(key)
            var tv = Memory.allocUtf16String(value)
            Memory.copy(temp_k,str_header,header_size)
            Memory.copy(temp_v,str_header,header_size)
            Memory.copy(temp_k.add(header_size),tk,temp_size - header_size)
            Memory.copy(temp_v.add(header_size),tv,temp_size - header_size)
            new NativeFunction(Addr_SetString,'void',['pointer','pointer'])(temp_k,temp_v)
        }
    }

    
}

function ShowMethodInfo(methodInfo){
    if (methodInfo == undefined) {
        console.error("Input a methodInfo addr")
        return
    }
    methodInfo = ptr(methodInfo)
    console.warn("-------------------------------------------")
    console.log("\x1b[36mFunctionName\t\t===>\t "+methodInfo.add(p_size*2).readPointer().readCString()+"\x1b[0m")
    console.log("Il2CppMethodPointer\t===>\t",methodInfo.readPointer())
    console.log("InvokerMethod\t\t===>\t",methodInfo.add(p_size).readPointer())
    console.log("Il2CppClass\t\t===>\t",methodInfo.add(p_size*3).readPointer())
    console.log("Il2CppType\t\t===>\t",methodInfo.add(p_size*4).readPointer())
    var parameters_count = methodInfo.add(p_size*10).add(2).readU8()
    var arr_args = new Array()
    for(var i=0;i<parameters_count;i++){
        var ParameterInfo = methodInfo.add(p_size*5).readPointer().add(p_size*i*4)
        arr_args.push(ParameterInfo.readPointer().readCString())
    }
    console.log("ParameterInfo\t\t===>\t",methodInfo.add(p_size*5).readPointer())
    console.log("parameters_count\t===>\t",parameters_count,"\t",JSON.stringify(arr_args))
    console.warn("-------------------------------------------")
}

//Todo ..............
function ShowClassInfo(il2CppClass){
    // if (il2CppClass == undefined) {
    //     console.error("Input a methodInfo addr")
    //     return
    // }
    il2CppClass = find_class("UnityEngine.UI","Text")
    
    il2CppClass = ptr(il2CppClass).readPointer()

    console.log(il2CppClass.add(3*p_size).readPointer().readCString(),".",il2CppClass.add(2*p_size).readPointer().readCString())
    // console.log(hexdump(il2CppClass))
    var method_count = il2CppClass.add(41*p_size).readU16()
    console.log("---------------------------------")
    console.error("List ",method_count," methods")
    console.log("------------------")
    for (var i=0;i<method_count;i++){
        console.log(il2CppClass.add(19*p_size).readPointer().add(i*p_size).readPointer().add(p_size*2).readPointer().readCString())
    }
    console.log("---------------------------------")
}

function seeHexR(addr,length){
    const soAddr = Module.findBaseAddress(soName);
    addr = soAddr.add(addr).readPointer()
    console.log(hexdump(ptr(addr),{length:length}))
}

function seeHexA(addr,length){
    console.log(hexdump(ptr(addr),{length:length}))
}

