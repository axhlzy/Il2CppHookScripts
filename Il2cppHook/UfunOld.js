
/*
 *  @author https://github.com/axhlzy
*/

var soName = "libil2cpp.so"
var soAddr = Module.findBaseAddress(soName)
var p_size = Process.pointerSize

var b_init   = true
var b_refesh = false
var b_log    = true
const a_image_name   = new Array()
const a_image_addr   = new Array()
const a_class_addr   = new Array()
const a_class_count  = new Array()
const a_class_names  = new Array()
const a_namespaces   = new Array()
const a_methods_name = new Array()
const a_methods_addr = new Array()

//运行的基本数据
//启动游戏后再附加,这里的s_Base不为空的时候就用这个值（在自动获取失败的情况这么操作）
// const s_Base                    = soAddr.add(0x1860EF0)
var s_Base                    = soAddr.add(0x1860EF0)
var sizeof_Il2CppImage        = 56
var sizeof_Assembliy          = 68

var s_TypeInfoDefinitionTable = 0
var s_ImagesCount             = 0
var s_ImagesTable             = 0
var s_AssembliesCount         = 0
var s_AssembliesTable         = 0

//breakPoints 参数
const maxCallTime = 10          //管理出现次数，大于出现次数即不显示（免得反复跳）
var arrayAddr =
[]

var arrayName =
[]

setImmediate(Init)
function Init(){
    if (s_Base !=0 ) {
        InitArgs()
        return
    }
    b_log = false
    // ! FindArgs() ? FindArgsOld() : ""
    FindArgs()
    b_log = true
}

/*
 *  从汇编解析需要的三个参数
*/
function FindArgs(){ 
 
    var il2cpp_init = Module.findExportByName(soName,"il2cpp_init")
    soAddr = Module.findBaseAddress(soName)

    if (il2cpp_init == null){
        Hook_dlopen()
        return
    }

    LOG("--------------------------------\nil2cpp_init\texp : "+il2cpp_init+"\n---------",LogColor.YELLOW)

    //bool Runtime::Init(const char* domainName)
    var next_p = TestNextLevelLDR(il2cpp_init,"mscorlib.dll")

    if (next_p == 0) return false

    //从我们找到的mscorlib.dll 这个位置往上去解析b bl blx
    LOG("--------------------------------\nInit\t\texp : "+next_p+"\n---------",LogColor.YELLOW)

    var next_p = TestNextLevelLDR(next_p,"global-metadata.dat",-1)

    if (next_p == 0) return false
    
    LOG("--------------------------------\nInitialize\texp : "+next_p+"\n---------",LogColor.YELLOW)

    var a_bl_addrs = new Array()
    var a_bl_addrs_tostring = new Array()
    var a_real_malloc_addrs= new Array()

    for (var i = 0;i<200;i++){
        var cur_p = ptr(next_p).add(p_size*i)
        if (Instruction.parse(cur_p).mnemonic == "bl") {
            // LOG(cur_p+"\t"+Instruction.parse(cur_p).toString())
            a_bl_addrs.push(cur_p)
            a_bl_addrs_tostring.push(Instruction.parse(cur_p).toString())
        }
    }

    var addr_malloc_str = null
    for (var i=0;i<a_bl_addrs_tostring.length-3;i++){
        if (a_bl_addrs_tostring[i]==a_bl_addrs_tostring[i+1]&& a_bl_addrs_tostring[i+1]==a_bl_addrs_tostring[i+2]){
            addr_malloc_str = a_bl_addrs_tostring[i]
            break
        }
    }
    
    if (addr_malloc_str == null) return false

    for (var i=0;i<a_bl_addrs.length;i++){
        // console.log(addr_malloc_str + "\t"+ Instruction.parse(a_bl_addrs[i]))
        if ( addr_malloc_str == Instruction.parse(a_bl_addrs[i]).toString()) a_real_malloc_addrs.push(a_bl_addrs[i])
    }

    //打印日志
    for (var i = 0;i<200;i++){
        var cur_p = ptr(next_p).add(p_size*i)
        if (Instruction.parse(cur_p).mnemonic == "bl") {
            var index = a_real_malloc_addrs.toString().indexOf(String(cur_p))
            LOG(cur_p+"\t"+Instruction.parse(cur_p).toString(),index != -1 ? LogColor.RED : LogColor.COLOR_33)
        }
    }
    
    LOG("---------\nFound malloc Address : "+addr_malloc_str+"\n---------",LogColor.COLOR_36)

    printThirdLog_common(a_real_malloc_addrs)

    InitArgs()
}

function FindArgsOld(){

    var il2cpp_init = Module.findExportByName(soName,"il2cpp_init")
    LOG("--------------------------------\nil2cpp_init\texp : "+il2cpp_init+"\n---------",LogColor.YELLOW)

    //bool Runtime::Init(const char* domainName)
    var next_p = null
    for (var i = 0;i<15;i++){
        var cur_p = ptr(il2cpp_init).add(p_size*i)
        var cur_ins =Instruction.parse(cur_p)
        if (cur_ins.mnemonic == "bl"){
            next_p = cur_ins.opStr.substring(1,11)
            printCtx(cur_p,10)
        }
    }

    //Runtime::Init(domain_name)
    if (next_p == null) return
    LOG("--------------------------------\nInit\t\texp : "+next_p+"\n---------",LogColor.YELLOW)
    var a_real_addr = new Array()
    for (var i = 0;i<200;i++){
        if (Instruction.parse(ptr(next_p).add(p_size*i)).mnemonic == "add"){
            // console.log(Instruction.parse(ptr(next_p).add(p_size*i)))
            a_real_addr.push(ptr(next_p).add(p_size*i))
        }
    }
    var aim_pointer =  null
    var aim_addr =  null

    //特征寻找，倒推 bl，再从 bl 跳转进函数
    for (var i = 0;i<a_real_addr.length-3;i++){
        if (a_real_addr[i].readPointer() == 0xe08f0000 
            &&a_real_addr[i+1].readPointer() == 0xe08f1001
            &&a_real_addr[i+2].readPointer() == 0xe08f2002
            &&a_real_addr[i+3].readPointer() == 0xe08f1001
            &&a_real_addr[i+4].readPointer() == 0xe08f2002){
                aim_addr = a_real_addr[i].sub(p_size*26)
                aim_pointer = Instruction.parse(aim_addr).opStr.substring(1,11)
                break
        }
    }
    
    if (aim_addr == null || aim_pointer == null) return
    printCtx(aim_addr)

    a_real_addr.splice(0,a_real_addr.length)
    //最终用来存放dword_CC6468 = sub_24F540("global-metadata.dat"); 中的malloc函数的地址
    var temp_arr = new Array()
    for (var i = 0;i<300;i++){
        var cur_p = ptr(aim_pointer).add(p_size*i)
        var ins = Instruction.parse(cur_p)
        if (ins.mnemonic == "bl") a_real_addr.push(cur_p)
    }

    LOG("--------------------------------\nInitialize\texp : "+aim_pointer+"\n---------",LogColor.YELLOW)
    
    //第一次遍历找到重复出现的函数地址，并记录重复的函数地址（其实就是malloc函数地址）
    for (var i=0;i<a_real_addr.length-2;i++){
        // console.log(Instruction.parse(a_real_addr[i]),"\t",Instruction.parse(a_real_addr[i]).toString()==Instruction.parse(a_real_addr[i+1]).toString())
        if (Instruction.parse(a_real_addr[i]).toString() == Instruction.parse(a_real_addr[i+1]).toString() 
            && Instruction.parse(a_real_addr[i+2]).toString() == Instruction.parse(a_real_addr[i+1]).toString())
                aim_pointer = Instruction.parse(a_real_addr[i]).opStr
    }
    //第二次遍历找到bl malloc的所有当前函数跳转地址的位置，存放在 temp_arr
    for (var i=0;i<a_real_addr.length;i++){
        if (Instruction.parse(a_real_addr[i]).opStr == aim_pointer) temp_arr.push(a_real_addr[i])
    }

    printThirdLog_common(temp_arr)

    
}

//初始化值
function InitArgs(){
    s_TypeInfoDefinitionTable =   s_Base.readPointer()
    s_ImagesCount             =   s_Base.add(p_size*3).readPointer().toInt32()
    s_ImagesTable             =   s_Base.add(p_size*4).readPointer()
    s_AssembliesCount         =   s_Base.add(p_size*5).readPointer().toInt32()
    s_AssembliesTable         =   s_Base.add(p_size*6).readPointer()

    b_log = false
    list_Images()
    b_log = true
}

function printThirdLog_common(temp_arr){
    printCtx(temp_arr[1],7)
    LOG("......")
    printCtx(temp_arr[4],6)
    LOG("......")
    printCtx(temp_arr[5],12)

    //find sizeof(Il2CppImage)
    //从 temp_arr[4] 往上推最多十条指令找到 R1
    //s_ImagesTable = (Il2CppImage*)IL2CPP_CALLOC(s_ImagesCount, sizeof(Il2CppImage));
    LOG("\n----------------------------------------------------------------",LogColor.RED)
    LOG("Found Taget Info",LogColor.YELLOW)
    LOG("-----------------",LogColor.RED)

    var temp = FuckLDR(temp_arr[1].add(p_size),true)
    if (temp != 0){
        s_Base =  temp
        LOG("s_MethodInfoDefinitionTable\t"+s_Base+"\t--->\t"+s_Base.sub(soAddr))
    }
    

    var bl_addr = temp_arr[4]
    for(var i = 1;i<10;i++){
        var ins = Instruction.parse(bl_addr.sub(p_size*i))
        if (ins.mnemonic == "mov" && ins.opStr.indexOf("r1")==0){
            var temp = ins.opStr.split("#")[1]
            if (temp == 0){
                LOG("Error ! Find sizeof(Il2CppImage)",LogColor.RED)
            }
            sizeof_Il2CppImage = temp
            LOG("sizeof(Il2CppImage)\t\t"+sizeof_Il2CppImage+"\t\t--->\t"+Number(sizeof_Il2CppImage))
            break
        }
    }

    //find sizeof(Il2CppAssembly)
    //从 temp_arr[5] 往上推最多十条指令找到 R1
    //s_AssembliesTable = (Il2CppAssembly*)IL2CPP_CALLOC(s_AssembliesCount, sizeof(Il2CppAssembly));
    var bl_addr = temp_arr[5]
    for(var i = 1;i<10;i++){
        var ins = Instruction.parse(bl_addr.sub(p_size*i))
        if (ins.mnemonic == "mov" && ins.opStr.indexOf("r1")==0){
            var temp = ins.opStr.split("#")[1]
            if (temp == 0){
                LOG("Error ! Find sizeof(Il2CppAssembly)",LogColor.RED)
            }
            sizeof_Assembliy = temp
            LOG("sizeof(Il2CppAssembly)\t\t"+sizeof_Assembliy+"\t\t--->\t"+Number(sizeof_Assembliy))
            break
        }
    }
    LOG("----------------------------------------------------------------\n",LogColor.RED)
}

function list_Images(keywords){
    var tmp = s_ImagesCount + 1
    var current_off = s_TypeInfoDefinitionTable
    if (!b_init){
        LOG("-------------------------------------------------------------------------------------",LogColor.COLOR_33)
        for(var t=0;t<s_ImagesCount;t++){
            var tt = s_ImagesTable.add(sizeof_Il2CppImage*t)
            var typeCount = tt.add(p_size*4).readPointer().toInt32()
            var name = tt.add(p_size).readPointer().readCString()
            if (keywords != undefined){
                if (name.indexOf(keywords)!=-1){
                    LOG("[*]"+tt+"\t"+name,LogColor.COLOR_36)
                }else{--tmp}
            }else{
                LOG("[*]"+tt+"\t"+name,LogColor.COLOR_36)
            }
            current_off = current_off.add(typeCount*p_size)
        }
        LOG("----------------------------",LogColor.COLOR_33)
        LOG("  List "+(keywords==undefined?tmp:--tmp)+" Images",LogColor.RED)
        LOG("-------------------------------------------------------------------------------------",LogColor.COLOR_33)
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

function list_Images_detail(keywords){
    var tmp = s_ImagesCount + 1
    var current_off = s_TypeInfoDefinitionTable
    if (!b_init){
        LOG("-------------------------------------------------------------------------------------",LogColor.COLOR_33)
        for(var t=0;t<s_ImagesCount;t++){
            var tt = s_ImagesTable.add(sizeof_Il2CppImage*t)
            var typeCount = tt.add(p_size*4).readPointer().toInt32()
            var name = tt.add(p_size).readPointer().readCString()
            if (keywords != undefined){
                if (name.indexOf(keywords)!=-1){
                    LOG("\n[*]"+tt+"\t"+name,LogColor.COLOR_36)
                    LOG("\t\t\tIl2CppAssembly"+"\t--->\t"+tt.add(p_size*2).readPointer(),LogColor.COLOR_36)
                    LOG("\t\t\tIl2CppClass"+"\t\t--->\t"+current_off,LogColor.COLOR_36)
                    LOG("\t\t\ttypeStart"+"\t\t--->\t"+tt.add(p_size*3).readPointer()+"\t\ttypeCount = "+typeCount,LogColor.COLOR_36)
                }else{--tmp}
            }else{
                LOG("\n[*]"+tt+"\t"+name,LogColor.COLOR_36)
                LOG("\t\t\tIl2CppAssembly"+"\t--->\t"+tt.add(p_size*2).readPointer(),LogColor.COLOR_36)
                LOG("\t\t\tIl2CppClass"+"\t\t--->\t"+current_off,LogColor.COLOR_36)
                LOG("\t\t\ttypeStart"+"\t\t--->\t"+tt.add(p_size*3).readPointer()+"\t\ttypeCount = "+typeCount,LogColor.COLOR_36)
            }
            current_off = current_off.add(typeCount*p_size)
        }
        LOG("----------------------------",LogColor.COLOR_33)
        LOG("  List "+(keywords==undefined?tmp:--tmp)+" Images",LogColor.RED)
        LOG("-------------------------------------------------------------------------------------",LogColor.COLOR_33)
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

//这玩意用处不大，对应 Il2CppImage 结构体中的第三个指针位置的值
function list_Assemblies(){
    LOG("---------------------------------------------------------",LogColor.COLOR_33)
    var tmp = s_AssembliesCount + 1
    for(var t=0;t<s_AssembliesCount;t++){
        LOG("[*]"+s_AssembliesTable.add(sizeof_Assembliy*t)+"\t"+
        s_AssembliesTable.add(sizeof_Assembliy*t).add(p_size*4).readPointer().readCString(),LogColor.COLOR_36)
    }
    LOG("---------------------------------------------------------",LogColor.COLOR_33)
    LOG("  List "+tmp+" Assemblies",LogColor.RED)
    LOG("----------------------------",LogColor.COLOR_33)
}

/*
 *  根据 Addr 或者 Name 列出所有 NameSpace
 *  list_NameSpace("UnityEngine.UI")
*/
function list_NameSpace(AddrOrName){
    var tmp = 0
    var a_namespaces = new Array()
    if (AddrOrName == undefined){
        LOG("please input a Addr or a Name",LogColor.RED)
        return
    }
    var addr = null
    try{
        addr = ptr(AddrOrName)
    }catch(e){
        addr = get_cls_by_name(AddrOrName)
    }
    LOG("---------------------------------------------",LogColor.COLOR_33)
    for (var t = 0;t<get_count_by_addr(addr);t++){
        try{
            var t_Il2CppClass = addr.add(t*p_size).readPointer()
            var NameSpaze = t_Il2CppClass.add(p_size*3).readPointer().readCString()
            if (a_namespaces.indexOf(NameSpaze)==-1) a_namespaces.push(NameSpaze)
        }catch(e){
            // LOG(e,LogColor.RED)
        }
    }
    if (a_namespaces.length == 0){
        LOG("Error input AddrOrName",LogColor.RED)
    }else{
        a_namespaces.forEach(function(value){
            LOG("[*] "+ value,LogColor.COLOR_36)
            tmp ++
        })
    }
    LOG("----------------------------",LogColor.COLOR_33)
    LOG("  List "+tmp+" NameSpace",LogColor.RED)
    LOG("---------------------------------------------",LogColor.COLOR_33)
}

/*
 *  根据 Addr 或者 Name 列出所有 类 带筛选
 *  list_Classes("UnityEngine.UI","UnityEngine.UI.Collections")
*/
function list_Classes(AddrOrName,filterNameSp){
    if (b_refesh) a_class_names.splice(0,a_class_names.length)
    if (AddrOrName == undefined){
        console.error("please input a Addr or a Name")
        return
    }
    if (filterNameSp == undefined) filterNameSp = ""
    var addr = null
    try{
        addr = ptr(AddrOrName)
    }catch(e){
        addr = get_cls_by_name(AddrOrName)
    }
    var Count = 0
    if (!b_refesh) console.warn("---------------------------------------------")
    for (var t = 0;t<get_count_by_addr(addr);t++){
        try{
            var t_Il2CppClass = addr.add(t*p_size).readPointer()
            var NameSpaze = t_Il2CppClass.add(p_size*3).readPointer().readCString()
            var ClassName = t_Il2CppClass.add(p_size*2).readPointer().readCString()
            if (filterNameSp != ""){
                if (NameSpaze!="" && filterNameSp == NameSpaze){
                    Count ++
                    if (b_refesh){
                        a_class_names.push(ClassName)
                        continue
                    }
                    LOG("[*]"+addr.add(t*p_size)+"\t"+ClassName,LogColor.COLOR_36)
                }  
            }else{
                Count ++
                if (b_refesh){
                    a_class_names.push(ClassName)
                    continue
                }
                LOG("[*]"+addr.add(t*p_size)+"\t"+"\t"+ClassName,LogColor.COLOR_36)
            }
        }catch(e){

        }
    }
    if (!b_refesh) console.warn("---------------------------------------------")
    b_refesh = false
}

function list_Classes_detail(AddrOrName,filterNameSp){
    if (b_refesh) a_class_names.splice(0,a_class_names.length)
    if (AddrOrName == undefined){
        LOG("please input a Addr or a Name",LogColor.RED)
        return
    }
    if (filterNameSp == undefined) filterNameSp = ""
    var addr = null
    try{
        addr = ptr(AddrOrName)
    }catch(e){
        addr = get_cls_by_name(AddrOrName)
    }
    var Count = 0
    var CountAll = get_count_by_addr(addr)
    if (!b_refesh) LOG("---------------------------------------------",LogColor.YELLOW)
    for (var t = 0;t<get_count_by_addr(addr);t++){
        try{
            var t_Il2CppClass = addr.add(t*p_size).readPointer()
            var NameSpaze = t_Il2CppClass.add(p_size*3).readPointer().readCString()
            var ClassName = t_Il2CppClass.add(p_size*2).readPointer().readCString()
            if (filterNameSp != ""){
                if (NameSpaze!="" && filterNameSp == NameSpaze){
                    Count ++
                    if (b_refesh){
                        a_class_names.push(ClassName)
                        continue
                    }
                    LOG("Il2CppClass \t--->\t"+addr.add(t*p_size))
                    LOG("Il2CppImage \t--->\t"+t_Il2CppClass.add(p_size*0).readPointer())
                    LOG("ClassName \t--->\t"+ClassName)
                    LOG("NameSpaze \t--->\t"+NameSpaze)
                    LOG("---------------------------------------------",LogColor.YELLOW)
                }  
            }else{
                Count ++
                if (b_refesh){
                    a_class_names.push(ClassName)
                    continue
                }
                LOG("Il2CppClass \t--->\t"+addr.add(t*p_size))
                LOG("Il2CppImage \t--->\t"+t_Il2CppClass.add(p_size*0).readPointer())
                LOG("ClassName \t--->\t"+ClassName)
                LOG("NameSpaze \t--->\t"+NameSpaze)
                LOG("---------------------------------------------",LogColor.YELLOW)
            }
        }catch(e){

        }
    }
    if (!b_refesh) LOG("Count Classes : "+Count+" of all "+CountAll,LogColor.RED)
    if (!b_refesh) LOG("---------------------------------------------",LogColor.YELLOW)
    b_refesh = false
}

/*
 *  根据 Addr 或者 Name 列出所有 类
 *  list_Classes("UnityEngine.UI")
*/
function list_Classes_FT(AddrOrName,from,to,typeCount){
    var addr = null
    if (AddrOrName == undefined){
        console.error("please input a Addr or Name")
        return
    }
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

/*
 *  根据ImageName 和 NameSpace 列出所有方法信息
 *  list_method("UnityEngine.UI","UnityEngine.EventSystems")
*/

function list_Methods(AddrOrName,nameSpace,className){
    if (AddrOrName == undefined || nameSpace == undefined){
        LOG("Input args ?",LogColor.RED)
        return
    }
    b_refesh = true
    //筛选准备namespace列表
    list_Classes_detail(AddrOrName,nameSpace)
    //遍历打印
    a_class_names.forEach(function(value){
        if (className == ""){
            ShowClassInfo(AddrOrName,"",false)
            return
        }
        if (className == undefined ? true : ( className.indexOf(value)!=-1 ) ) ShowClassInfo(AddrOrName,value,false)
    })
}

function list_all_method(AddrOrName,filterNameSp,filter){
    list_Methods(AddrOrName,filterNameSp,filter)
}

/*
 *  根据 ImageName 和 ClassName 找到对应 Class 的地址
 *  find_class("UnityEngine.TextCoreModule","FaceInfo")
*/
function find_class(AddrorName,className){
    var addr = null
    try{
        addr = ptr(AddrorName)
    }catch(e){
        addr = get_cls_by_name(AddrorName)
    }
    var typeCount = typeCount == undefined ? get_count_by_addr(addr) : typeCount
    for (var t = 0;t<typeCount;t++){
        try{
            var t_Il2CppClass = addr.add(t*p_size).readPointer()
            if (t_Il2CppClass.add(p_size*2).readPointer().readCString() == className) return addr.add(t*p_size)
        }catch(e){

        }
    }
    return 0 
}

/*
 *  根据 ImageName , ClassName , functionName , argsCount 找到对应 function 的地址
 *  最后一个参数 isRealAddr 用作显示静态分析地址还是当前内存地址（带这个参数则只返回地址，不带则列表信息）
 *  find_method("UnityEngine.UI","Text","get_text",0)
 */
function find_method(imgName,className,functionName,argsCount,isRealAddr){
    var addr_Il2CppClass = find_class(imgName,className).readPointer()
    if(addr_Il2CppClass == 0){
        console.warn("Il2CppClass addr not found!")
        return ptr(0)
    }
    if (isRealAddr == undefined){
        console.warn("--------------------------------------------------------")
        console.error(imgName+"."+className+"."+functionName,"\targsCount:",argsCount)
        console.warn("----------------------------")
        console.log("Il2CppImage\t---->\t",get_img_by_name(imgName))
        console.log("Il2CppClass\t---->\t",addr_Il2CppClass)
        //const MethodInfo* il2cpp_class_get_method_from_name(Il2CppClass *klass, const char* name, int argsCount)
        var il2cpp_class_get_method_from_name = new NativeFunction(
            Module.findExportByName(soName,"il2cpp_class_get_method_from_name"),
            'pointer',['pointer','pointer','int'])
        var MethodInfo = il2cpp_class_get_method_from_name(addr_Il2CppClass,Memory.allocUtf8String(functionName),argsCount)
        if (MethodInfo == 0){
            console.error("Error to find MethodInfo")
            return ptr(0)
        }
        console.log("MethodInfo\t---->\t",MethodInfo)
        console.log("\x1b[36mmethodPointer\t---->\t "+MethodInfo.readPointer() +"\t ===> \t"+MethodInfo.readPointer().sub(soAddr)+"\x1b[0m")
        console.warn("--------------------------------------------------------")
    } else {
        var il2cpp_class_get_method_from_name = new NativeFunction(
            Module.findExportByName(soName,"il2cpp_class_get_method_from_name"),
            'pointer',['pointer','pointer','int'])
        var MethodInfo = il2cpp_class_get_method_from_name(addr_Il2CppClass,Memory.allocUtf8String(functionName),argsCount)
        if (MethodInfo == 0){
            console.error("Error to find MethodInfo")
            return ptr(0)
        }
        return isRealAddr?MethodInfo.readPointer():MethodInfo.readPointer().sub(soAddr)
    }
}

/*
 *  完全使用导出函数实现的查找,无法查找 ImgaeName 之外的方法
 *  find_method_old("UnityEngine.UI","Text","get_text",0)
 */
function find_method_old(nameSpaze,className,functionName,argsCount){
    var Il2CppImage = get_img_by_name(nameSpaze)
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
    LOG("MethodInfo\t---->\t"+MethodInfo)
    LOG("methodPointer\t---->\t"+MethodInfo.readPointer() +"\t ===> \t"+MethodInfo.readPointer().sub(soAddr),LogColor.COLOR_36)
    LOG("---------------------------------------------------------",LogColor.YELLOW)
}

/*
 *  根据ImageName 和 ClassName 找到对应 Class 的地址
 *  find_class("UnityEngine.TextCoreModule","FaceInfo")
*/
function ShowMethodInfo(methodInfo){
    if (methodInfo == undefined) {
        LOG("Input a methodInfo addr",LogColor.RED)
        return
    }
    methodInfo = ptr(methodInfo)
    LOG("-------------------------------------------",LogColor.YELLOW)
    LOG("FunctionName\t\t===>\t "+methodInfo.add(p_size*2).readPointer().readCString(),LogColor.COLOR_36)
    LOG("Il2CppMethodPointer\t===>\t"+methodInfo.readPointer())
    LOG("InvokerMethod\t\t===>\t"+methodInfo.add(p_size).readPointer())
    LOG("Il2CppClass\t\t===>\t"+methodInfo.add(p_size*3).readPointer())
    LOG("Il2CppType\t\t===>\t"+methodInfo.add(p_size*4).readPointer())
    var parameters_count = methodInfo.add(p_size*10).add(2).readU8()
    var arr_args = new Array()
    for(var i=0;i<parameters_count;i++){
        var ParameterInfo = methodInfo.add(p_size*5).readPointer().add(p_size*i*4)
        arr_args.push(ParameterInfo.readPointer().readCString())
    }
    LOG("Il2CppType\t\t===>\t"+methodInfo.add(p_size*4).readPointer())
    LOG("ParameterInfo\t\t===>\t"+methodInfo.add(p_size*5).readPointer())
    LOG("parameters_count\t===>\t"+parameters_count+"\t"+JSON.stringify(arr_args))
    LOG("-------------------------------------------",LogColor.YELLOW)
}

/*
 *  解析指定位置的 MethodInfo 信息
 *  MethodInfo      ---->    0xc5fe1534
 *  ShowClassInfo("0xc5fe1534")
 */
function ShowClassInfo(nameSpace,className,isRealAddr){
    a_methods_addr.splice(0,a_methods_addr.length)
    if (nameSpace == undefined) {
        LOG("Input a nameSpace addr",LogColor.RED)
        return
    }
    if (className == undefined) {
        LOG("Input a className addr",LogColor.RED)
        return
    }
    if (isRealAddr == undefined){
        isRealAddr = false
    }
    var il2CppClass = null
    try{
        il2CppClass = find_class(nameSpace,className).readPointer()
    }catch(e){
        LOG("Error while get il2CppClass",LogColor.RED)
        return
    }
    LOG(il2CppClass.add(3*p_size).readPointer().readCString()+"."+il2CppClass.add(2*p_size).readPointer().readCString(),LogColor.YELLOW)
    var method_count = il2CppClass.add(41*p_size).readU16()
    LOG("---------------------------------",LogColor.COLOR_33)
    LOG("List "+method_count+" methods",LogColor.COLOR_33)
    LOG("------------------",LogColor.COLOR_33)
    for (var i=0;i<method_count;i++){
        try{
            var p_method = il2CppClass.add(19*p_size).readPointer().add(i*p_size).readPointer()
            var methodName = p_method.add(p_size*2).readPointer().readCString()
            var methodArgs = p_method.add(p_size*10).add(2).readU8()
            var addr_method = find_method(nameSpace,className,methodName,methodArgs,isRealAddr)
            LOG(addr_method+"\t--->\t"+methodName,LogColor.COLOR_36)
            a_methods_name.push(methodName)
            a_methods_addr.push(addr_method)
            //展示更详细的方法信息
            // ShowMethodInfo(p_method)
        }catch(e){
            LOG(e,LogColor.COLOR_33)
            // LOG("il2CppClass.add(19*p_size).readPointer() 基本都回出问题的")
        }
    }
    LOG("---------------------------------",LogColor.COLOR_33)
}

//----------------------------------------  工具方法  -------------------------------------------------

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

function seeHexR(addr,length){
    const soAddr = Module.findBaseAddress(soName);
    addr = soAddr.add(addr).readPointer()
    LOG(hexdump(ptr(addr),{length:length}))
}

function seeHexA(addr,length){
    LOG(hexdump(ptr(addr),{length:length}))
}

function printCtx(pointer,range){
    var max = range == undefined ? 5 : (range%2==1 ? (range + 1 ) : range) /2
    var min = range == undefined ? -4 : max - range
    for (var i = min;i<max;i++){
        var cur_p = ptr(pointer).add(p_size*i)
        LOG(cur_p+"\t"+cur_p.readPointer()+"\t"+Instruction.parse(cur_p),i==0?LogColor.RED:LogColor.WHITE)
    }
}

function FuckLDR(addr,isRealAddr){
    var ins = Instruction.parse(addr)
    if (ins.mnemonic != "ldr"){
        LOG("Not LDR Instruction")
        return ptr(0) 
    }
    var off = ins.operands[1].value.disp
    // console.log(JSON.stringify(ins.operands))
    var pc_1 = addr.add(p_size*2)
    var pc_2 = addr.add(p_size*3)
    var codeEnd = pc_1.add(off).readPointer()
    var final = codeEnd.add(pc_2)
    return isRealAddr?final:final.sub(soAddr)
}

function FuckADR(addr,isRealAddr){
    var ins = Instruction.parse(addr)
    if (ins.mnemonic != "sub"){
        LOG("Not ADR Instruction")
        return ptr(0) 
    }
    try {
        var off = ins.operands[2].value
        // console.log(JSON.stringify(ins.operands))
        var pc_1 = addr.add(p_size*2)
        return isRealAddr ? pc_1.sub(off) : pc_1.sub(off).sub(soAddr)
    }catch(e){
        return 0
    }
}

function TestLDR(addr,filter,length){
    addr = ptr(addr)
    if (addr == undefined || filter == undefined){
        LOG("Input args",LogColor.RED)
        return
    }
    length = length == undefined ? 100 : length
    for (var i = 0;i<length;i++){
        var t_addr = addr.add(p_size*i)
        try{
            if (Instruction.parse(t_addr).mnemonic == "ldr"){
                // var pattern = '6d 73 63 6f 72 6c 69 62 2e 64 6c 6c';
                // var result = Memory.scanSync(soAddr.add(0x6852D4).sub(1000),2000,pattern)
                // console.warn(result[0] == undefined || result[0].address == undefined)
                var temp = FuckLDR(t_addr,true).readCString().indexOf(filter)!=-1?addr:0
                if (temp !=0) return temp
            }    
        }catch(e){
            // LOG("NOT Instruction")
        }
    }
    return 0 
}

function TestADR(addr,filter,length){
    addr = ptr(addr)
    if (addr == undefined || filter == undefined){
        LOG("Input args",LogColor.RED)
        return
    }
    length = length == undefined ? 200 : length
    for (var i = 0;i<length;i++){
        var t_addr = addr.add(p_size*i)
        try{
            if (Instruction.parse(t_addr).mnemonic == "sub"){
                var temp = FuckADR(t_addr,true).readCString().indexOf(filter)!=-1?addr:0
                if (temp !=0) return temp
            }    
        }catch(e){
            // LOG("NOT Instruction")
        }
    }
    return 0 
}

function TestNextLevelLDR(addr,filter,length){
    var next_p = null
    if (addr == undefined || filter == undefined){
        LOG("Input args",LogColor.RED)
        return
    }
    addr = ptr(addr)
    length = length == undefined ? 100 : length
    for (var i=length<0?length:0;i<length<0?0:length;i++){
        var cur_p = addr.add(p_size*i)
        try{
            var cur_ins =Instruction.parse(cur_p)
            var mnemonic = cur_ins.mnemonic
            if (mnemonic == "bl" || mnemonic == "bl" || mnemonic == "blx"){
                next_p = cur_ins.opStr.substring(1,11)
                // printCtx(cur_p,10)
                LOG(cur_p+"\tInstruction  --->   "+ cur_ins)
                var ret_addr = TestADR(next_p,filter)
                if (ret_addr == 0) ret_addr = TestLDR(next_p,filter)
                LOG("\tFOUND\t --- >"+ret_addr,ret_addr==0?LogColor.COLOR_33:LogColor.RED)
                next_p = ret_addr
                if (next_p != 0) return next_p
            }
        }catch(e){
            // LOG("NOT Instruction")
        }
    }
}

function LOG(str,type){
    if (!b_log) return
    if (type == undefined) {
        console.log(str)
        return
    }
    switch(type){
        case LogColor.WHITE     : console.log(str);                         break
        case LogColor.RED       : console.error(str);                       break
        case LogColor.YELLOW    : console.warn(str);                        break
        case LogColor.COLOR_33  : console.log("\x1b[33m"+str+"\x1b[0m");    break
        case LogColor.COLOR_36  : console.log("\x1b[36m"+str+"\x1b[0m");    break
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

function showGameObject(gameObj){
    var f_getName        = new NativeFunction(find_method("UnityEngine.CoreModule","Object","GetName",1,true),'pointer',['pointer'])
    var f_getLayer       = new NativeFunction(find_method("UnityEngine.CoreModule","GameObject","get_layer",0,true),'int',['pointer'])
    var f_getTransform   = new NativeFunction(find_method("UnityEngine.CoreModule","GameObject","get_transform",0,true),'pointer',['pointer'])
    var f_getParent      = new NativeFunction(find_method("UnityEngine.CoreModule","Transform","GetParent",0,true),'pointer',['pointer'])
    // var f_getTag         = new NativeFunction(find_method("UnityEngine.CoreModule","GameObject","get_tag",0,true),'pointer',['pointer'])
    
    LOG("--------- GameObject ---------",LogColor.COLOR_33)
    LOG("gameObj\t\t--->\t"+gameObj,LogColor.COLOR_36)
    LOG("getName\t\t--->\t"+f_getName(gameObj).add(Process.pointerSize*3).readUtf16String(),LogColor.COLOR_36)
    LOG("getLayer\t--->\t"+f_getLayer(gameObj),LogColor.COLOR_36)               
    var m_transform = f_getTransform(gameObj)
    LOG("getTransform\t--->\t"+m_transform,LogColor.COLOR_36)
    // LOG("getTag\t\t--->\t"+f_getTag(gameObj).add(p_size*3).readUtf16String(),LogColor.COLOR_36)
    var layerNames = ""
    for (var i=0;i<10;i++){
        var getName = f_getName(m_transform)
        var spl =  layerNames == "" ? "" : " <--- "
        layerNames = layerNames + spl + getName.add(Process.pointerSize*3).readUtf16String()
        m_transform = f_getParent(m_transform)
        if (m_transform == 0) break
    }
    LOG("hierarchy\t--->\t"+layerNames,LogColor.COLOR_36)
}

function showTransform(transform){
    LOG("--------- Transform ---------",LogColor.COLOR_33)

    transform = ptr(transform)
    var addr_get_childCount = find_method("UnityEngine.CoreModule","Transform","get_childCount",0,true)
    var addr_GetChild       = find_method("UnityEngine.CoreModule","Transform","GetChild",1,true)
    var f_getName           = new NativeFunction(find_method("UnityEngine.CoreModule","Object","GetName",1,true),'pointer',['pointer'])
    
    if (addr_get_childCount != 0){
        var f_get_childCount = new NativeFunction(addr_get_childCount,'int',['pointer'])
        var f_GetChild = new NativeFunction(addr_GetChild,'pointer',['pointer','int'])
        var childCount = f_get_childCount(transform)
        LOG("childCount\t--->\t"+childCount+"\t("+f_getName(transform).add(Process.pointerSize*3).readUtf16String()+")",LogColor.COLOR_36)
        for (var i = 0;i<childCount;i++){
            var c_transform = f_GetChild(transform,i)
            LOG("\t\t\t"+c_transform+" : "+f_getName(c_transform).add(Process.pointerSize*3).readUtf16String(),LogColor.COLOR_36)
        }
    }

    var addr_get_eulerAngles = find_method("UnityEngine.CoreModule","Transform","get_eulerAngles",0,true)
    if (addr_get_eulerAngles != 0){
        var f_get_eulerAngles = new NativeFunction(addr_get_eulerAngles,'pointer',['pointer','pointer'])
        var eulerAngles_vector3 = Memory.alloc(p_size*3)
        f_get_eulerAngles(eulerAngles_vector3,transform)
        LOG("eulerAngles\t--->\t"+eulerAngles_vector3.readFloat()+"\t"+eulerAngles_vector3.add(p_size).readFloat()+"\t"+eulerAngles_vector3.add(p_size*2).readFloat(),LogColor.COLOR_36)
    }

    var addr_get_forward = find_method("UnityEngine.CoreModule","Transform","get_forward",0,true)
    if (addr_get_forward != 0){
        var f_get_forward = new NativeFunction(addr_get_forward,'pointer',['pointer','pointer'])
        var forward_vector3 = Memory.alloc(p_size*3)
        f_get_forward(forward_vector3,transform)
        LOG("forward\t\t--->\t"+forward_vector3.readFloat()+"\t"+forward_vector3.add(p_size).readFloat()+"\t"+forward_vector3.add(p_size*2).readFloat(),LogColor.COLOR_36)
    }

    var addr_get_position = find_method("UnityEngine.CoreModule","Transform","get_position",0,true)
    if (addr_get_position != 0){
        var f_get_position = new NativeFunction(addr_get_position,'pointer',['pointer','pointer'])
        var Position_vector3 = Memory.alloc(p_size*3)
        f_get_position(Position_vector3,transform)

        LOG("position\t--->\t"+Position_vector3.readFloat()+"\t"+Position_vector3.add(p_size).readFloat()+"\t"+Position_vector3.add(p_size*2).readFloat(),LogColor.COLOR_36)
    }

    var addr_get_localPosition = find_method("UnityEngine.CoreModule","Transform","get_localPosition",0,true)
    if (addr_get_localPosition != 0){
        var f_get_localPosition = new NativeFunction(addr_get_localPosition,'pointer',['pointer','pointer'])
        var localPosition_vector3 = Memory.alloc(p_size*3)
        f_get_localPosition(localPosition_vector3,transform)
        LOG("localPosition\t--->\t"+localPosition_vector3.readFloat()+"\t"+localPosition_vector3.add(p_size).readFloat()+"\t"+localPosition_vector3.add(p_size*2).readFloat(),LogColor.COLOR_36)
    }
    
    var addr_get_localRotation = find_method("UnityEngine.CoreModule","Transform","get_localRotation",0,true)
    if (addr_get_localRotation != 0){
        var f_get_localRotation = new NativeFunction(addr_get_localRotation,'pointer',['pointer','pointer'])
        var localRotation_Quaternion = Memory.alloc(p_size*4)
        f_get_localRotation(localRotation_Quaternion,transform)
        LOG("localRotation\t--->\t"+localRotation_Quaternion.readFloat()+"\t"+localRotation_Quaternion.add(p_size).readFloat()+"\t"+localRotation_Quaternion.add(p_size*2).readFloat()+"\t"+localRotation_Quaternion.add(p_size*3).readFloat(),LogColor.COLOR_36)
    }

    var addr_get_localScale = find_method("UnityEngine.CoreModule","Transform","get_localScale",0,true)
    if (addr_get_localScale != 0){
        var f_get_localScale = new NativeFunction(addr_get_localScale,'pointer',['pointer','pointer'])
        var localScale_vector3 = Memory.alloc(p_size*3)
        f_get_localScale(localScale_vector3,transform)
        LOG("localScale\t--->\t"+localScale_vector3.readFloat()+"\t"+localScale_vector3.add(p_size).readFloat()+"\t"+localScale_vector3.add(p_size*2).readFloat(),LogColor.COLOR_36)
    }

    var addr_get_lossyScale = find_method("UnityEngine.CoreModule","Transform","get_lossyScale",0,true)
    if (addr_get_lossyScale != 0){
        var f_get_lossyScale = new NativeFunction(addr_get_lossyScale,'pointer',['pointer','pointer'])
        var lossyScale_vector3 = Memory.alloc(p_size*3)
        f_get_lossyScale(lossyScale_vector3,transform)
        LOG("lossyScale\t--->\t"+lossyScale_vector3.readFloat()+"\t"+lossyScale_vector3.add(p_size).readFloat()+"\t"+lossyScale_vector3.add(p_size*2).readFloat(),LogColor.COLOR_36)
    }

    var addr_get_right = find_method("UnityEngine.CoreModule","Transform","get_right",0,true)
    if (addr_get_right != 0){
        var f_get_right = new NativeFunction(addr_get_right,'pointer',['pointer','pointer'])
        var right_vector3 = Memory.alloc(p_size*3)
        f_get_right(right_vector3,transform)
        LOG("right\t\t--->\t"+right_vector3.readFloat()+"\t"+right_vector3.add(p_size).readFloat()+"\t"+right_vector3.add(p_size*2).readFloat(),LogColor.COLOR_36)
    }

    var addr_get_up = find_method("UnityEngine.CoreModule","Transform","get_up",0,true)
    if (addr_get_up != 0){
        var f_get_up = new NativeFunction(addr_get_up,'pointer',['pointer','pointer'])
        var up_vector3 = Memory.alloc(p_size*3)
        f_get_up(up_vector3,transform)
        LOG("up\t\t--->\t"+up_vector3.readFloat()+"\t"+up_vector3.add(p_size).readFloat()+"\t"+up_vector3.add(p_size*2).readFloat(),LogColor.COLOR_36)
    }
    
    var addr_get_rotation = find_method("UnityEngine.CoreModule","Transform","get_rotation",0,true)
    if (addr_get_rotation != 0){
        var f_get_rotation = new NativeFunction(addr_get_rotation,'pointer',['pointer','pointer'])
        var rotation_Quaternion = Memory.alloc(p_size*4)
        f_get_rotation(rotation_Quaternion,transform)
        LOG("rotation\t--->\t"+rotation_Quaternion.readFloat()+"\t"+rotation_Quaternion.add(p_size).readFloat()+"\t"+rotation_Quaternion.add(p_size*2).readFloat()+"\t"+rotation_Quaternion.add(p_size*3).readFloat(),LogColor.COLOR_36)
    }
}

function showEventData(eventData){
    LOG("--------- EventData ---------",LogColor.COLOR_33)
    var f_get_position = new NativeFunction(find_method("UnityEngine.UI","PointerEventData","get_position",0,true),'pointer',['pointer','pointer'])
    var click_vector2 = Memory.alloc(p_size*2)
    f_get_position(click_vector2,eventData)
    LOG("ClickPositon\t--->\t"+click_vector2.readFloat()+"\t"+click_vector2.add(p_size).readFloat(),LogColor.COLOR_36)
    
    var f_get_clickTime = new NativeFunction(find_method("UnityEngine.UI","PointerEventData","get_clickTime",0,true),'float',['pointer'])
    LOG("clickTime\t--->\t"+f_get_clickTime(eventData),LogColor.COLOR_36)

    var f_get_clickCount = new NativeFunction(find_method("UnityEngine.UI","PointerEventData","get_clickCount",0,true),'int',['pointer'])
    LOG("clickCount\t--->\t"+f_get_clickCount(eventData),LogColor.COLOR_36)
    
    var f_get_delta = new NativeFunction(find_method("UnityEngine.UI","PointerEventData","get_delta",0,true),'pointer',['pointer','pointer'])
    var delta_vector2 = Memory.alloc(p_size*2)
    f_get_delta(delta_vector2,eventData)
    LOG("delta\t\t--->\t"+delta_vector2.readFloat()+"\t"+delta_vector2.add(p_size).readFloat(),LogColor.COLOR_36)
    
    // 原UnityEngine.UI.PointerEventData.ToString
    // var f_toSting = new NativeFunction(find_method("UnityEngine.UI","PointerEventData","ToString",0,true),'pointer',['pointer'])
    // var s = f_toSting(PointerEventData)
    // LOG(s.add(p_size*3).readUtf16String())
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

var LogColor = {
    WHITE:0,
    RED:1,
    YELLOW:3,
    COLOR_33:4,
    COLOR_36:5
}

//----------------------------------------  拓展功能  -------------------------------------------------

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

function HookSetActive(){
    Interceptor.attach(find_method("UnityEngine.CoreModule","GameObject","SetActive",1,true),{
        onEnter:function(args){
            if (args[1].toInt32() == 1 || args[1].toInt32() == 0) {
                LOG("\n--------------------------------------",LogColor.YELLOW)
                LOG("public extern void SetActive( "+(args[1].toInt32()==0?"false":"true")+" );",LogColor.COLOR_36)
                LOG("-------------------",LogColor.COLOR_33)
                showGameObject(args[0])
            }
        },
        onLeave:function(retval){

        }
    })
}
 
function HookOnPointerClick(){

    var pointerEventData = null
    Interceptor.attach(find_method("UnityEngine.UI","Button","OnPointerClick",1,true),{
        onEnter:function(args){

            LOG("\n--------------------------------------",LogColor.YELLOW)
            LOG("public void OnPointerClick( "+(args[1])+" );",LogColor.COLOR_36)
            pointerEventData = args[1]
            
            var f_get_pointerEnter = new NativeFunction(find_method("UnityEngine.UI","PointerEventData","get_pointerEnter",0,true),'pointer',['pointer'])
            var gameObj = f_get_pointerEnter(pointerEventData)
            
            var f_getTransform   = new NativeFunction(find_method("UnityEngine.CoreModule","GameObject","get_transform",0,true),'pointer',['pointer'])
            var m_transform = f_getTransform(gameObj)

            showGameObject(gameObj)

            showTransform(m_transform)

            showEventData(pointerEventData)
        },
        onLeave:function(retval){

        } 
    })
}

function SeeTypeToString(obj){
    var f_Object_ToSting   = new NativeFunction(find_method("UnityEngine.CoreModule","Object","ToString",0,true),'pointer',['pointer'])
    var s_type = f_Object_ToSting(ptr(obj))
    LOG(s_type.add(p_size*3).readUtf16String())
}

function setActive(gameObj,visible){
    new NativeFunction(find_method("UnityEngine.CoreModule","GameObject","SetActive",1,true),'pointer',['pointer','int'])(ptr(gameObj),visible)
}

function nopFunction(ptrOrImg,className,functionName,argsCount){
    var armP = 0
    try {
        armP = Number(ptrOrImg) < Number(soAddr) ? soAddr.add(ptr(ptrOrImg)) :ptr(ptrOrImg)
    }catch(e){
        if (ptrOrImg == undefined || className == undefined ||functionName == undefined ||argsCount == undefined){
            LOG("Maybe it was a bad input ")
            return
        }
        armP = find_method(ptrOrImg,className,functionName,argsCount,true)
    }
    Interceptor.replace(armP,new NativeCallback(function(arg){
        LOG("\n-------------nop function called "+armP,LogColor.YELLOW)
    },'void',['pointer','pointer','pointer','pointer']))
}

function breakPoints(filterName){

    if (a_methods_addr != null && a_methods_addr != null){
        a_methods_name.forEach(function(value,index){
            if (filterName !=undefined && value.indexOf(filterName)!=-1){
                arrayName.push(value)
                arrayAddr.push(a_methods_addr[index])
            }else{
                arrayAddr = a_methods_addr
                arrayName = a_methods_name
            }
        })
    }

    var times = new Array(arrayAddr.length)
    for(var t =0;t<arrayAddr.length;t++){
        times[t] = Number(1)
    }

    Java.perform(function(){
        arrayAddr
            .map(function(temp){return soAddr.add(temp)})
            .forEach(function(value,index,array){
                console.log("-------------------------");
                console.log('currentAddr:' + value);
                try{
                    funcTmp(value,index,arrayName);
                }catch(e){
                    funcTmp(value.add(1),soAddr,index,arrayName);
                }
            console.log("\t\t---->"+index,value+" is prepared ");
        })
        console.log("\n")
    })

    function funcTmp(currentAddr,index,arrayName){
        try{
            Interceptor.attach(currentAddr, {
                onEnter: function(args){
                    // PrintStackTraceN(this.context)
                    if(++times[index] < maxCallTime){
                        console.log("called : "+arrayName[index]+"  ----- addr : " + currentAddr.sub(soAddr) +"\n");
                        this.temp = currentAddr.sub(soAddr); 
                    }
                },
                onLeave: function(retval){
    
                }
            });
        }catch(e){
            console.log(e)
        }
    }
}

function GameObject_FindGameObject(name){
    var f_find = new NativeFunction(find_method("UnityEngine.CoreModule","GameObject","Find",1,true),'pointer',['pointer'])
    name = Memory.allocUtf8String(name)
    var ret = f_find(name)
    LOG(ret)
}

function Transform_FindGameObject(transform,name){
    var f_find = new NativeFunction(find_method("UnityEngine.CoreModule","Transform","FindChild",1,true),'pointer',['pointer','pointer'])
    name = Memory.allocUtf8String(name)
    var ret = f_find(ptr(transform),name)
    LOG(ret)
}

