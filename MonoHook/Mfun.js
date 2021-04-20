/**
 * @Author lzy <axhlzy@live.cn>
 * @HomePage https://github.com/axhlzy
 * @CreatedTime 2021/01/31 15:30
 * @UpdateTime 2021/04/20 12:32
 * @Des frida hook mono functions scrpt
 */

const soName = "libmono.so"
const p_size = Process.pointerSize
var LogFlag = true
var count_method_times
const maxCallTime = 10

//声明libmono.so需要的函数
var mono_thread_attach,mono_get_root_domain,mono_class_from_name,mono_image_loaded,mono_class_get_method_from_name,mono_signature_get_params,
mono_runtime_invoke,mono_compile_method,mono_class_num_methods,mono_class_get_methods,mono_class_get_name,mono_method_signature,
mono_type_get_name,mono_assembly_foreach,mono_assembly_get_image,mono_image_get_name,mono_unity_get_all_classes_with_name_case,
mono_image_get_table_rows,mono_class_get
//声明常用的u3d函数
var getName,getPointerEnter,getParent,getTransform,getLayer

//声明libc.so需要的函数
var fopen,fwrite,fclose,system
//记录image信息
var arr_imgs_name = new Array()
var arr_imgs_addr = new Array()
//记录需要断点的函数信息
var arrayAddr   = new Array()
var arrayName   = new Array()
var arrayMethod = new Array()

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

    setTimeout(() => {mono_thread_attach(mono_get_root_domain())}, 500);
    setTimeout(() => {initU3DFunc()}, 1000);

    function initU3DFunc(){
        getName         = new NativeFunction(find_method('UnityEngine','UnityEngine','Object','get_name',0),'pointer',['pointer'])
        getPointerEnter = new NativeFunction(find_method('UnityEngine.UI','UnityEngine.EventSystems','PointerEventData','get_pointerEnter',0),'pointer',['pointer'])
        getParent       = new NativeFunction(find_method('UnityEngine','UnityEngine','Transform','get_parent',0),'pointer',['pointer'])
        getTransform    = new NativeFunction(find_method('UnityEngine','UnityEngine','GameObject','get_transform',0),'pointer',['pointer'])
        getLayer        = new NativeFunction(find_method("UnityEngine","UnityEngine","GameObject","get_layer",0),'int',['pointer'])
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
       
}

 /**
 * 示例 Demo
 */
function TestDemo(){
    

    // 1.基础函数的断点
    HookMonoMethod("UnityEngine",'UnityEngine','Debug',"LogError",1,{
        onEnter:function(args){
            LOG(readU16(args[0]))
            // Toast(readU16(args[0]))
        },
        onLeave:function(ret){
            
        }
    })

    //find_method('UnityEngine','UnityEngine','GameObject','SetActive',1)
    // HookMonoMethod('UnityEngine','UnityEngine','GameObject','SetActive',1,{
    //     onEnter:function(args){
    //         LOG(readU16(getName(args[0])))
    //     },
    //     onLeave:function(ret){
            
    //     }
    // })

    //find_method('UnityEngine.UI','UnityEngine.UI','Button','OnPointerClick',1)
    HookMonoMethod('UnityEngine.UI','UnityEngine.UI','Button','OnPointerClick',1,{
        onEnter:function(args){
            var transfrom = getTransform(getPointerEnter(args[1]))
            LOG('' + getPStr(transfrom,5))
        },
        onLeave:function(ret){
            
        }
    })

    function getPStr(transform,level){
        var Pname = ""
        for (var i=0;i<level;i++){
            Pname = Pname + getPName(transform,i) + ((level-i==1)?"":" <--- ")
        }
        return Pname
    }

    function getPName(transfrom,level){
        for(var i=0;i<level;i++){
            transfrom = getParent(transfrom)
        }
        if (transfrom == 0x0) return ""
        return readU16(getName(transfrom))
    }

    // 2.class 的 批量断点 == HookMonoClass()
    /**
     * [Pixel XL::com.xxx.xxx]-> i()
        --------------------------------------------------
        [*] 0xcd566000  System.Core
        [*] 0xe855c580  System
        [*] 0xe855be80  DOTween46
        [*] 0xe855bb00  DOTween43
        [*] 0xe855b780  DOTween
        [*] 0xe855b400  DOTweenPro
        [*] 0xe855b080  Vectrosity
        [*] 0xe855a280  UnityEngine.Analytics
        [*] 0xe855a600  UnityEngine.UI
        [*] 0xe855a980  Assembly-CSharp
        [*] 0xe855ad00  Assembly-CSharp-firstpass
        [*] 0xe8559f00  UnityEngine
        [*] 0xe8556a80  mscorlib
        --------------------------------------------------

        [Pixel XL::com.xxx.xxx]-> c(0xe8559f00,"GameObject")
        ------------------------------------------------------------
        [*] 0xd10d5510  GameObject
        ------------------------------
        Classes count 468       |        Filter 1
        ------------------------------------------------------------

        [Pixel XL::com.xxx.xxx]-> a(0xd10d5510)
        -------------------------------------------------------------------------------------
        .ctor (System.String args[0]),.ctor (),.ctor (System.String args[0],System.Type[] args[1]),GetComponent (System.Type args[0]),GetComponentFastPath (System.Type args[0],System.IntPtr args[1]),GetComponentInChildren (System.Type args[0],System.Boolean args[1]),GetComponentInParent (System.Type args[0]),GetComponents (System.Type args[0]),GetComponentsInChildren (System.Type args[0],System.Boolean args[1]),GetComponentsInParent (System.Type args[0],System.Boolean args[1]),GetComponentsInternal (System.Type args[0],System.Boolean args[1],System.Boolean args[2],System.Boolean args[3],System.Boolean args[4],System.Object args[5]),get_transform (),get_layer (),set_layer (System.Int32 args[0]),SetActive (System.Boolean args[0]),get_activeSelf (),get_activeInHierarchy (),get_tag (),set_tag (System.String args[0]),CompareTag (System.String args[0]),SendMessage (System.String args[0],System.Object args[1],UnityEngine.SendMessageOptions args[2]),Internal_AddComponentWithType (System.Type args[0]),AddComponent (System.Type args[0]),Internal_CreateGameObject (UnityEngine.GameObject args[0],System.String args[1]),Find (System.String args[0]),get_gameObject ()
        0xe5ef74f0,0xe5dfa998,0xe5dfa9c0,0xe6004550,0xe5f007a0,0xe5dfab68,0xe5dfac18,0xe5dfacc0,0xe5dfad70,0xe5dfae20,0xe8a71b40,0xe8a6e8d0,0xe8a6e968,0xe5ec73f0,0xe6007a38,0xe5e38850,0xe8a6ef10,0xe5dfaed0,0xe5dfaf68,0xe5dfb000,0xe5dfb0a8,0xe5ef7680,0xe5ef7638,0xe5ef7538,0xe5dfb150,0xe5efcb48

        ------------------------------------------
        Added 26 Methods    |    All 26
        -------------------------------------------------------------------------------------

        [Pixel XL::com.xxx.xxx]-> B()
        -------------------------
        currentAddr:0xe5ef74f0  .ctor (System.String args[0])
                        ---->0   is prepared
        -------------------------
        currentAddr:0xe5dfa998  .ctor ()
                        ---->1   is prepared
        -------------------------
        currentAddr:0xe5dfa9c0  .ctor (System.String args[0],System.Type[] args[1])
                        ---->2   is prepared
        -------------------------
        currentAddr:0xe6004550  GetComponent (System.Type args[0])
                        ---->3   is prepared
        -------------------------
        currentAddr:0xe5f007a0  GetComponentFastPath (System.Type args[0],System.IntPtr args[1])
                        ---->4   is prepared
        ......
        currentAddr:0xe5dfb150  Find (System.String args[0])
                        ---->24  is prepared
        -------------------------
        currentAddr:0xe5efcb48  get_gameObject ()
                        ---->25  is prepared
        ------------------------------------------
        Added 26 BreakPoints    |    All 26
        -------------------------------------------------------------------------------------

        [Pixel XL::com.xxx.xxx]-> 
        called : 0xe8a6ef10(0xe8a6ef10) --->    get_activeInHierarchy ()

        called : 0xe8a6e8d0(0xe8a6e8d0) --->    get_transform ()

        called : 0xe8a6e8d0(0xe8a6e8d0) --->    get_transform ()
        
        called : 0xe6007a38(0xe6007a38) --->    SetActive (System.Boolean args[0])

        called : 0xe8a71b40(0xe8a71b40) --->    GetComponentsInternal (System.Type args[0],System.Boolean args[1],System.Boolean args[2],System.Boolean args[3],System.Boolean args[4],System.Object args[5])

        .......
    */

    //3.image 的批量断点，不建议使用，稳定性远不如 libil2cpp.so ,主要问题在于 mono_compile_method 可能导致卡死
    
    /**
     * [Pixel XL::com.xxx.xxx]-> a(0xe855a980)
        -------------------------------------------------------------------------------------
        .ctor (System.Object args[0],System.String args[1],System.String args[2],UnityEngine.Sprite args[3],UnityEngine.Events.UnityAction<uk.co.codescribble.components.achievements.Achievement> args[4]),get_IsComplete (),get_Key (),get_PlayerPrefsKey (),get_Name (),get_Description (),get_Sprite (),get_OnComplete (),Trigger (System.Boolean args[0]),Trigger (System.Boolean args[0],System.Boolean args[1]),SaveProgress (),LoadProgress ()
        0xe5ed0238,0xf0afac70,0xf0afac98,0xf0afacc0,0xf0aface8,0xf0afad10,0xf0afad38,0xf0afad60,0xf0afad88,0xf0afadc8,0xf0afae50,0xe5ed02d0
        
        .ctor (),get_List (),TriggerAchievement (System.Object args[0],System.Boolean args[1]),RegisterAchievement (uk.co.codescribble.components.achievements.Achievement args[0]),UnlockAll ()
        0xe5ecfcb0,0xf0afae98,0xf0afaf00,0xe5ed0310,0xf0b02000

        ......
    */
   
    // 4.HookSetActive()
    /**
     *  [Pixel XL::com.xxx.xxx]-> HookSetActive()
        [Pixel XL::com.xxx.xxx]->
        --------------------------------------
        public extern void SetActive( false );
        --------------------
        --------- GameObject ---------
        gameObj         --->    0xc9abab70
        getName         --->    0xc9af1390
        getLayer        --->    5
        getTransform    --->    0xc96acbc0
        hierarchy       --->    Background Normal(0xc96acbc0) <--- Icon Container(0xc96acbd0) <--- Cancel Button(0xc96acba0) <--- Content(0xc96acbf0) <--- Settings Screen(0xc96a9070) <--- Screens(0xc96acae0) <--- Panels Canvas(0xc96acac0) <--- Panels(0xc96acab0) <--- Bootstrap(0xc9abb950)
     */

    // 5.HookSetActive()
    /**
     *  [Pixel XL::com.xxx.xxx]-> HookOnPointerClick()
        [Pixel XL::com.xxx.xxx]->
        --------------------------------------
        public void OnPointerClick( 0xc9ae8bb0 );
        --------- GameObject ---------
        gameObj         --->    0xc9abba50
        getName         --->    0xd9915678
        getLayer        --->    5
        getTransform    --->    0xc9abb730
        hierarchy       --->    Icon(0xc9abb730) <--- Container(0xc9abb720) <--- Settings Button(0xc9abb8e0) <--- Container(0xc9abbc60) <--- Bottom Dock(0xc9abbc50) <--- Main Menu(0xc9abb990) <--- Main Menu Canvas(0xc9abb970) <--- Main Menu(0xc9abb960) <--- Bootstrap(0xc9abb950)
    */

    // 6.HookPlayerPrefs()
    /**
     *  [Pixel XL::com.xxx.xxx]-> HookPlayerPrefs()
        [Pixel XL::com.xxx.xxx]->
        [*] '1' = GetInt('HasRatedApp',0xffffffff)

        [*] '1' = GetInt('HasRatedApp',0xffffffff)
        
        ......
     */

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
    var arr_temp_name   = new Array()
    var arr_temp_addr   = new Array()
    var arr_temp_method = new Array()
    // try{
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
            var addrMethod;
            try {
                addrMethod = mono_compile_method(method)
            } catch (error) {
                // LOG(error,LogColor.RED)
                continue
            }
            if (sign == undefined)LOG("[*] "+method+"\t"+addrMethod+"\t"+strMethod,LogColor.C36)
            arr_temp_name.push(strMethod)
            arr_temp_addr.push(addrMethod)
            arr_temp_method.push(method)
        }
    // }catch(e){
    //     LOG(e,LogColor.RED)
    // }
    LogFlag = true
    if (sign !=undefined) return [arr_temp_name,arr_temp_addr,arr_temp_method]
    LOG(getLine(40),LogColor.C33)
    LOG("count_methods : "+count_methods,LogColor.C33)
    LOG(getLine(85),LogColor.C33)
}

/**
 * addBreakPoints (需要使用spawn方式attach上去才能正常使用)
 * @param {*} imgOrCls 
 */
function a(imgOrCls){
    if (imgOrCls == undefined) imgOrCls = getImageByName('Assembly-CSharp')
    imgOrCls = ptr(imgOrCls)
    var method_count = 0
    //判断是image还是class
    LOG(getLine(85),LogColor.C33)
    if (String(arr_imgs_addr).indexOf(String(imgOrCls))!=-1){
        var img = imgOrCls
        var ret_arr = list_classes(img,"")
        ret_arr.forEach(function(value,index){
            var ret = m(value,"")
            if (ret != undefined){
                LOG(ret[0]+"\n"+ret[1])
                arrayName = arrayName.concat(ret[0])
                arrayAddr = arrayAddr.concat(ret[1])
                arrayMethod = arrayAddr.concat(ret[2])
                method_count += ret[0].length
            }
            LOG("\n")
        })
    }else{
        var cls = imgOrCls
        var ret = m(cls,"")
        LOG(ret[0]+"\n"+ret[1]+"\n")
        arrayName = arrayName.concat(ret[0])
        arrayAddr = arrayAddr.concat(ret[1])
        arrayMethod = arrayAddr.concat(ret[2])
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

/**
 * 并不直接调用，直接调用就使用 c() 就行
 * @param {Ptr} image 
 * @param {标识内部调用} sign 1
 * @param {过滤名称} filterName 
 */
function list_classes(image,sign,filterName){
    //参考源码 metadata/unity-utils.c/mono_unity_get_all_classes_with_name_case
    image = ptr(image)
    var filterCount = 0
    if (sign!=undefined) LogFlag = false
    //该dll下的cls数量
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
            if (sign = "1") arr_temp_addr.push(klass)
        }
        if (sign != "1") arr_temp_addr.push(klass)
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
    Interceptor.detachAll()
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
                        LOG("called : "+arrayAddr[index]+"("+arrayMethod[index]+")"+"\t--->\t"+arrayName[index] +"\n",LogColor.C36)
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

function HookMonoClass(ImageName,className){
    LogFlag = false
    i()
    var ret = list_classes(getImageByName(ImageName),"1",className)
    LogFlag = true
    if (ret.length == 1){
        a(ptr(ret[0]))
        B()
    }else{
        LOG(ret)
    }
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
    return ptr(mPtr).add(2+2+4+p_size*2).readPointer().readCString()
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
        LOG("[*]AppName\t\t"+strName + " (UID:"+appInfo.uid.value + ")\t ID:"+appInfo.labelRes.value,LogColor.C36)

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
        LOG("\n[*]Location\t\t"+ApkLocation+"\n\t\t\t"+TempFile,LogColor.C36)

        //PackageManager.GET_SIGNATURES == 0x00000040
        var pis = context.getPackageManager().getPackageInfo(str_pkgName, 0x00000040)
        var hexDigist = (pis.signatures.value)[0].toByteArray()
        LOG("\n[*]Signatures\t\tMD5\t "+hexdigest(hexDigist,'MD5')
            +"\n\t\t\tSHA-1\t "+hexdigest(hexDigist,'SHA-1')
            +"\n\t\t\tSHA-256\t "+hexdigest(hexDigist,'SHA-256'),LogColor.C36)
        
        LOG(getLine(100),LogColor.C33)

        //LOG(getMetaData('unity.build-id'))
        function getMetaData(key){
            //public static final int GET_META_DATA = 0x00000080;
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
        function hexdigest(paramArrayOfByte,algorithm){
            var hexDigits = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102]
            var localMessageDigest = Java.use("java.security.MessageDigest").getInstance(algorithm)
            localMessageDigest.update(paramArrayOfByte)
            var arrayOfByte = localMessageDigest.digest()
            var arrayOfChar = []
            for (var i=0,j=0;;i++,j++){
                var strLenth = algorithm == "MD5" ? 16 : ( algorithm == "SHA-1" ? 20 : 32)
                if (i>=strLenth) return Java.use("java.lang.String").$new(arrayOfChar)
                var k = arrayOfByte[i]
                arrayOfChar[j] = hexDigits[(0xF & k >>> 4)]
                arrayOfChar[++j] = hexDigits[(k & 0xF)]
            }
        }
    })
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

function HookOnPointerClick(){

    var pointerEventData = null
    HookMonoMethod('UnityEngine.UI','UnityEngine.UI','Button','OnPointerClick',1,{
        onEnter:function(args){
            var transform = getTransform(getPointerEnter(args[1]))
            // var str = getPStrDes(transform,5)
            // LOG(str)
            LOG("\n"+getLine(38),LogColor.YELLOW)
            LOG("public void OnPointerClick( "+(args[1])+" );",LogColor.C36)
            pointerEventData = args[1]
            if (pointerEventData == 0) return 
            var gameObj = getPointerEnter(pointerEventData)
            // var m_transform = getTransform(gameObj)
            showGameObject(gameObj)
        },
        onLeave:function(ret){
            
        }
    })
    function getPStr(transform,level){
        var Pname = ""
        try {
            for (var i=0;i<level;i++){
                Pname = Pname + getPName(transform,i) + ((level-i==1)?"":" <--- ")
            }
        } catch (error) {
            return Pname
        }
        return Pname
    }

    function getPStrDes(transform,level){
        var Pname = ""
        try {
            for (var i=0;i<level;i++){
                Pname = Pname + getPName(transform,i)+"("+transform+")" + ((level-i==1)?"":" <--- ")
            }
        } catch (error) {
            return Pname
        }
        return Pname
    }

    function getPName(transform,level){
        for(var i=0;i<level;i++){
            transform = getParent(transform)
        }
        if (transform == 0x0) return ""
        return readU16(getName(transform))
    }
}

function showGameObject(gameObj){
    
    gameObj = ptr(gameObj)
    LOG("--------- GameObject ---------",LogColor.C33)
    LOG("gameObj\t\t--->\t"+gameObj,LogColor.C36)
    if (gameObj == 0) return
    LOG("getName\t\t--->\t"+getName(gameObj),LogColor.C36)
    LOG("getLayer\t--->\t"+getLayer(gameObj),LogColor.C36)           
    var m_transform = getTransform(gameObj)
    LOG("getTransform\t--->\t"+m_transform,LogColor.C36)
    // LOG("getTag\t\t--->\t"+f_getTag(gameObj).add(p_size*3).readUtf16String(),LogColor.C36)
    var debug = true
    var layerNames = ""
    for (var i=0;i<10;i++){
        var spl =  layerNames == "" ? "" : " <--- "
        layerNames = layerNames + spl + readU16(getName(m_transform)) + (debug?"("+m_transform+")":"")
        m_transform = getParent(m_transform)
        if (m_transform == 0) break
    }
    LOG("hierarchy\t--->\t"+layerNames,LogColor.C36)
}

function HookPlayerPrefs(){

    var isShowPrintStack = false

    InterceptorGetFunctions()
    InterceptorSetFunctions()

    function InterceptorGetFunctions(){

        //public static extern float GetFloat(string key, float defaultValue)
        var Addr_GetFloat       = find_method("UnityEngine","UnityEngine","PlayerPrefs","GetFloat",2)
        if (Addr_GetFloat !=0){
            Interceptor.attach(Addr_GetFloat,{
                onEnter:function(args){
                    this.arg0 = args[0]
                    this.arg1 = args[1]
                },
                onLeave:function(ret){
                    LOG("\n[*] '"+ret +"' = GetFloat('"+this.arg0.add(p_size*3).readUtf16String()+"',"+this.arg1+")",LogColor.C36)
                    if (isShowPrintStack) PrintStackTraceN(this.context)
                }
            })
        }
 
        //public static extern int GetInt(string key, int defaultValue)
        var Addr_GetInt         = find_method("UnityEngine","UnityEngine","PlayerPrefs","GetInt",2)
        if (Addr_GetInt !=0){
            Interceptor.attach(Addr_GetInt,{
                onEnter:function(args){
                    this.arg0 = args[0]
                    this.arg1 = args[1]
                },
                onLeave:function(ret){
                    var s_arg0 = this.arg0.add(p_size*3).readUtf16String()
                    var i_arg1 = this.arg1
                    LOG("\n[*] '"+ret.toInt32() +"' = GetInt('"+s_arg0+"',"+i_arg1+")",LogColor.C36)
                    if (isShowPrintStack) PrintStackTraceN(this.context)
                    if (s_arg0.indexOf("SaleBoughted")!=-1) ret.replace(ptr(0x1))
                }
            })
        }
        
        //public static string GetString(string key)
        var Addr_GetString      = find_method("UnityEngine","UnityEngine","PlayerPrefs","GetString",1)
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

        var Addr_SetFloat       = find_method("UnityEngine","UnityEngine","PlayerPrefs","SetFloat",2)
        if (Addr_SetFloat != 0){
            Interceptor.attach(Addr_SetFloat,{
                onEnter:function(args){
                    this.arg0 = args[0].add(p_size*3).readUtf16String()
                    this.arg1 = ( args[1] == 0 ? 0 : args[1].readFloat())
                },
                onLeave:function(ret){
                    LOG("\n[*] SetFloat('"+this.arg0+"',"+this.arg1+")",LogColor.C36)
                    if (isShowPrintStack) PrintStackTraceN(this.context)
                }
            })
        }
        
        //public static extern int GetInt(string key, int defaultValue)
        var Addr_SetInt         = find_method("UnityEngine","UnityEngine","PlayerPrefs","SetInt",2)
        if (Addr_SetInt!=0){
            Interceptor.attach(Addr_SetInt,{
                onEnter:function(args){
                    this.arg0 = args[0].add(p_size*3).readUtf16String()
                    this.arg1 = args[1]
                },
                onLeave:function(ret){
                    LOG("\n[*] SetInt('"+this.arg0+"',"+this.arg1+")",LogColor.C36)
                    if (isShowPrintStack) PrintStackTraceN(this.context)
                }
            })
        }
        
        //public static string GetString(string key)
        var Addr_SetString      = find_method("UnityEngine","UnityEngine","PlayerPrefs","SetString",2)
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

function HookSetActive(){
    Interceptor.attach(find_method("UnityEngine","UnityEngine","GameObject","SetActive",1),{
        onEnter:function(args){
            //显示SetActive为true的项
            if (args[1].toInt32() == 0) {
                LOG("\n"+getLine(38),LogColor.YELLOW)
                LOG("public extern void SetActive( "+(args[1].toInt32()==0?"false":"true")+" );",LogColor.C36)
                LOG(getLine(20),LogColor.C33)
                showGameObject(args[0])
            }
            return 
            //显示SetActive为false的项
            if (args[1].toInt32() == 0) {
                LOG("\n"+getLine(38),LogColor.YELLOW)
                LOG("public extern void SetActive( "+(args[1].toInt32()==0?"false":"true")+" );",LogColor.C36)
                LOG(getLine(20),LogColor.C33)
                showGameObject(args[0])
            }
        },
        onLeave:function(retval){}
    })
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
