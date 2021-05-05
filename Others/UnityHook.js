
const soName = "libil2cpp.so"

setImmediate(Hook)
setImmediate(function(){Interceptor.detachAll()})

function Hook(){
    Java.perform(function(){

        Hook_dlopen()
        
        // HookSendMessage()

        // HookRewardManager()
    
        // HookToast()

        // HookLog()

        // HookDialog()

        // HookSharedPrefences()

        // HookLoadLibrary()

        // HookJava()
        
    })
}

function HookNative(){

    Interceptor.detachAll()

    var soAddr = Module.findBaseAddress(soName)

    callNewFunc()
    // interceptFunc()
    // replaceFunc()

    function callNewFunc(){
        var func = new NativeFunction(soAddr.add(0x9A5B08),'pointer',['pointer'])
        console.log(hexdump(func(ptr(0))))
    }

    function interceptFunc(){

        Interceptor.attach(soAddr.add(0xa109),{
            onEnter:function(args){
                console.log(readStdString(args[0]))
                console.log(hexdump(args[0]))
                console.warn("----------------------")
                
            },
            onLeave:function(retval){
    
            }
        })

    }

    function replaceFunc(){

        Interceptor.replace(soAddr.add(0x0000),new NativeCallback(function(arg){
            console.log("-------------nop function called")
            PrintStackTraceN(this.context)
        },'void',['pointer','pointer']))
    

    }

    function readStdString(str){
        const isTiny = (str.readU8() & 1) === 0
        if (isTiny){
            return str.add(1).readUtf8String()
        }else{
            return str.add(2 * Process.pointerSize).readPointer().readUtf8String()
        }
    }

    function writeStdString(str,content){
        const isTiny = (str.readU8() & 1) === 0
        if (isTiny){
            return str.add(1).writeUtf8String(content)
        }else{
            return str.add(2 * Process.pointerSize).readPointer().writeUtf8String(content)
        }
    }
}

function HookJava(){

    Java.perform(function(){
        // try{
        //     Java.openClassFile("/data/local/tmp/helper.dex").load()
        //     var Gson = Java.use("com.google.gson.Gson");
        //     var gson = Gson.$new();
        // }catch(e){
        //     console.log(e)
        // }
        
        // var String = Java.use("java.lang.String")
    
        // Java.use("com.google.android.gms.internal.ads.zzcnz").run.implementation = function(){
        //     console.log("called nop")
    
        // }

        Java.use("com.unity3d.player.UnityPlayerActivity").checkAsyncTimeout.implementation = function(){
            console.log("called checkAsyncTimeout")
            this.checkAsyncTimeout()
        }

        console.log(clazz.a9())


        // Java.choose("com.heigame.util.MainActivity",{
        //     onMatch:function(obj){
        //         console.log(obj)
        //         obj.CallFullScreenAd(obj)
        //     },
        //     onComplete:function(){
        //         console.log("onComplete")
        //     }
        // })
    
        // Java.use("android.app.Activity").startActivity.overload('android.content.Intent').implementation = function(a){
        //     this.startActivity(a)
        //     PrintStackTrace()
        // }
    })

}

function Hook_dlopen() {
    const dlopen_old = Module.findExportByName(null, "dlopen");
    const dlopen_new = Module.findExportByName(null, "android_dlopen_ext");

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

    // libil2cpp.so 加载完成时候做的事情（早时机的hook位置）
    function todo(){
        // Hook_unity_get_set(0x300DC4,0x300DCC)
        // ExportCppFunction()

        // breakPoints()
    
        // var soAddr = Module.findBaseAddress(soName)
        // Interceptor.attach(soAddr.add(0x5335F8),{
        //     onEnter:function(args){
        //         console.warn("0x5335F8")
        //         this.arg1 = args[1]
        //     },
        //     onLeave:function(retval){
        //         console.log(retval.toInt32())
        //         retval.replace(ptr(0x1))
        //         // new NativeFunction(soAddr.add(0x40DD54),'void',['pointer'])(this.arg1)
        //         // new NativeFunction(soAddr.add(0x40E244),'void',['pointer','pointer'])(this.arg1,ptr(0x1))
        //         // new NativeFunction(soAddr.add(0x40E52C),'void',['pointer','pointer'])(this.arg1,ptr(0x1))
        //     }
        // })

        // Interceptor.replace(soAddr.add(0x4A3688),new NativeCallback(function(arg){
        //     console.log("-------------nop function called")
        //     // new NativeFunction(soAddr.add(0x7DC898),'void',['pointer'])(arg)
        // },'void',['pointer','pointer']))
 
    }

    function ExportCppFunction(){
        //https://floe-ice.cn/archives/502
        var p_size = Process.pointerSize
        var soAddr = Module.findBaseAddress("libil2cpp.so")
        Interceptor.attach(Module.findExportByName("libil2cpp.so","il2cpp_class_get_methods"),{
            onEnter:function(args){
     
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
    }
}

function breakPoints(){
    var arrayAddr =
    ['0x40da70', '0x40dcc8', '0x40dd54', '0x40de48', '0x40ca00', '0x40dfa8', '0x40e244', '0x40e52c', '0x40e814', '0x40e918', '0x40e9bc', '0x40eac0', '0x40dc44', '0x40eb64', '0x40dfa0', '0x40ec74']
    
    var arrayName =
    ['GooglePlayGames.OurUtils.PlayGamesHelperObject$$CreateObject', 'GooglePlayGames.OurUtils.PlayGamesHelperObject$$Awake', 'GooglePlayGames.OurUtils.PlayGamesHelperObject$$OnDisable', 'GooglePlayGames.OurUtils.PlayGamesHelperObject$$RunCoroutine', 'GooglePlayGames.OurUtils.PlayGamesHelperObject$$RunOnGameThread', 'GooglePlayGames.OurUtils.PlayGamesHelperObject$$Update', 'GooglePlayGames.OurUtils.PlayGamesHelperObject$$OnApplicationFocus', 'GooglePlayGames.OurUtils.PlayGamesHelperObject$$OnApplicationPause', 'GooglePlayGames.OurUtils.PlayGamesHelperObject$$AddFocusCallback', 'GooglePlayGames.OurUtils.PlayGamesHelperObject$$RemoveFocusCallback', 'GooglePlayGames.OurUtils.PlayGamesHelperObject$$AddPauseCallback', 'GooglePlayGames.OurUtils.PlayGamesHelperObject$$RemovePauseCallback', 'GooglePlayGames.OurUtils.PlayGamesHelperObject$$.ctor', 'GooglePlayGames.OurUtils.PlayGamesHelperObject$$.cctor', 'GooglePlayGames.OurUtils.PlayGamesHelperObject.<>c__DisplayClass10_0$$.ctor', 'GooglePlayGames.OurUtils.PlayGamesHelperObject.<>c__DisplayClass10_0$$<RunCoroutine>b__0']


    // var soAddr = Module.findBaseAddress(soName)
    // Interceptor.replace(soAddr.add(0x40DFA8),new NativeCallback(function(arg){
    //     console.log("-------------nop function called")
    //     new NativeFunction(soAddr.add(0x7DC898),'void',['pointer'])(arg)
    // },'void',['pointer','pointer']))
    
    
    const isShowPrintStack = false
    const isShowPrintStackN = false

    const soAddr = Module.findBaseAddress(soName);

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
                    console.log("called : "+arrayName[index]+"  ----- addr : " + currentAddr.sub(soAddr) +"\n");
                    this.temp = currentAddr.sub(soAddr);
                    if(isShowPrintStack) PrintStackTrace()
                    if(isShowPrintStackN) PrintStackTraceN(this.context)
                },
                onLeave: function(retval){
    
                }
            });
        }catch(e){
            console.log(e)
        }
    }
}

function HookSendMessage(){
    try{
        var UnityPlayer = Java.use("com.unity3d.player.UnityPlayer")
        UnityPlayer.UnitySendMessage.implementation = function(str0,str1,str2){
            console.warn("\n--------------\tCalled UnitySendMessage\t--------------")
            console.log("UnityPlayer.UnitySendMessage(\x1b[96m'"+str0+"','"+str1+"','"+str2+"'\x1b[0m)")
            this.UnitySendMessage(str0,str1,str2)
        }
    }catch(e){
    }
}

function HookRewardManager(){
    
    const isShowPrintStack = true

    var RewardManager = Java.use("com.was.m.RewardManager");

    RewardManager.setAct.implementation = function(ctx){
        console.warn("\n--------------\tCalled RewardManager.setAct\t--------------")
        this.setAct(ctx)
        if(isShowPrintStack) PrintStackTrace()
    }

    RewardManager.showMoreGame.implementation = function(){
        console.warn("\n--------------\tCalled RewardManager.showMoreGame\t--------------")
        this.showMoreGame()
        if(isShowPrintStack) PrintStackTrace()
    }

    RewardManager.showInter.implementation = function(){
        console.warn("\n--------------\tCalled RewardManager.showInter\t--------------")
        this.showInter()
        if(isShowPrintStack) PrintStackTrace()
    }

    RewardManager.showBan.implementation = function(){
        console.warn("\n--------------\tCalled RewardManager.showBan\t--------------")
        this.showBan()
        if(isShowPrintStack) PrintStackTrace()
    }

    RewardManager.showAd.implementation = function(name, obj, args){
        console.warn("\n--------------\tCalled RewardManager.showAd('"+name+"','"+obj+"','"+args+"')\t--------------")
        this.showAd(name, obj, args)
        if(isShowPrintStack) PrintStackTrace()
    }

    RewardManager.sa10.implementation = function(){
        console.warn("\n--------------\tCalled RewardManager.sa10\t--------------")
        this.sa10()
        if(isShowPrintStack) PrintStackTrace()
    }

    RewardManager.sa11.implementation = function(){
        console.warn("\n--------------\tCalled RewardManager.sa11\t--------------")
        this.sa11()
        if(isShowPrintStack) PrintStackTrace()
    }

    RewardManager.dsds.implementation = function(){
        console.warn("\n--------------\tCalled RewardManager.dsds\t--------------")
        this.dsds()
        if(isShowPrintStack) PrintStackTrace()
    }

    RewardManager.aplv.implementation = function(){
        console.warn("\n--------------\tCalled RewardManager.aplv\t--------------")
        this.aplv()
        if(isShowPrintStack) PrintStackTrace()
    }

    RewardManager.gdu.implementation = function(){
        console.warn("\n--------------\tCalled RewardManager.gdu\t--------------")
        this.gdu()
        if(isShowPrintStack) PrintStackTrace()
    }

    RewardManager.cdu.implementation = function(){
        console.warn("\n--------------\tCalled RewardManager.cdu\t--------------")
        this.cdu()
        if(isShowPrintStack) PrintStackTrace()
    }

    RewardManager.iap.implementation = function(){
        console.warn("\n--------------\tCalled RewardManager.iap\t--------------")
        this.iap()
        if(isShowPrintStack) PrintStackTrace()
    }

    RewardManager.gads.implementation = function(){
        console.warn("\n--------------\tCalled RewardManager.gads\t--------------")
        this.gads()
        if(isShowPrintStack) PrintStackTrace()
    }

    RewardManager.hads.implementation = function(){
        console.warn("\n--------------\tCalled RewardManager.hads\t--------------")
        this.hads()
        if(isShowPrintStack) PrintStackTrace()
    }

    RewardManager.hads.implementation = function(){
        console.warn("\n--------------\tCalled RewardManager.hads\t--------------")
        this.hads()
        if(isShowPrintStack) PrintStackTrace()
    }

    RewardManager.applfac.implementation = function(){
        console.warn("\n--------------\tCalled RewardManager.applfac\t--------------")
        this.applfac()
        if(isShowPrintStack) PrintStackTrace()
    }

    RewardManager.irs.implementation = function(){
        console.warn("\n--------------\tCalled RewardManager.irs\t--------------")
        this.irs()
        if(isShowPrintStack) PrintStackTrace()
    }

    RewardManager.mo.implementation = function(){
        console.warn("\n--------------\tCalled RewardManager.mo\t--------------")
        this.mo()
        if(isShowPrintStack) PrintStackTrace()
    }

    RewardManager.maxu.implementation = function(){
        console.warn("\n--------------\tCalled RewardManager.maxu\t--------------")
        this.maxu()
        if(isShowPrintStack) PrintStackTrace()
    }

    function temp(){
        var RewardManager = Java.use("com.was.m.RewardManager");
        var methods = RewardManager.class.getDeclaredMethods();
        for(var j = 0; j < methods.length; j++){
            var methodName = methods[j].getName();
            console.log(methodName);
            for(var k = 0; k < RewardManager[methodName].overloads.length; k++){
                RewardManager[methodName].overloads[k].implementation = function(){
                    // console.warn("\n--------------\tCalled "+RewardManager[methodName]+"\t--------------")
                    PrintStackTrace()
                    return this[methodName].apply(this, arguments);
                }
            }
        }    
    }
}

function HookLog(){

    const isShowPrintStack = false
    // const filter = ["AppLovinSdk","VIVI","BGAQ","opqwt","AppLovinManager","MM"]
    const filter = []
    Java.perform(function(){
        call()
    })
    function call(){
        logD()
        logI()
        logE()
    }

    function logD(){
        var Log = Java.use("android.util.Log")
            Log.d.overload('java.lang.String', 'java.lang.String').implementation = function(str0,str1){
                if(filter.length != 0){
                    filter.forEach(function(item){
                        if(str0.indexOf(item)!=-1) show(str0,str1)
                    })
                }else{
                    show(str0,str1)
                }
                return this.d(str0,str1)
            }
            function show(str0,str1){
                console.warn("\n--------------\tCalled Log.d\t--------------")
                console.log("Log.d(\x1b[96m'"+str0+"','"+str1+"'\x1b[0m)")
                if(isShowPrintStack) PrintStackTrace()
            }
    }
    
    function logI(){
        var Log = Java.use("android.util.Log")
            Log.i.overload('java.lang.String', 'java.lang.String').implementation = function(str0,str1){
                if(filter.length != 0){
                    filter.forEach(function(item){
                        if(str0.indexOf(item)!=-1) show(str0,str1)
                    })
                }else{
                    show(str0,str1)
                }
                return this.i(str0,str1)
            }
            function show(str0,str1){
                console.warn("\n--------------\tCalled Log.i\t--------------")
                console.log("Log.i(\x1b[96m'"+str0+"','"+str1+"'\x1b[0m)")
                if(isShowPrintStack) PrintStackTrace()
            }
    }

    function logE(){
        var Log = Java.use("android.util.Log")
            Log.e.overload('java.lang.String', 'java.lang.String').implementation = function(str0,str1){
                if(filter.length != 0){
                    filter.forEach(function(item){
                        if(str0.indexOf(item)!=-1) show(str0,str1)
                    })
                }else{
                    show(str0,str1)
                }
                return this.e(str0,str1)
            }
            function show(str0,str1){
                console.warn("\n--------------\tCalled Log.i\t--------------")
                console.log("Log.e(\x1b[96m'"+str0+"','"+str1+"'\x1b[0m)")
                if(isShowPrintStack) PrintStackTrace()
            }
    }

    call()
    
}

function HookToast(){

    const isShowPrintStack = true

    Java.use("android.widget.Toast").makeText.overload('android.content.Context', 'java.lang.CharSequence', 'int').implementation = function(context,text,duration){
        console.warn("\n--------------\tCalled Toast.makeText\t--------------")
        var duration_str = "Toast.LENGTH_SHORT"
        if(duration == 1) duration_str = "Toast.LENGTH_LONG"
        console.log("Toast.makeText(\x1b[96m'"+JSON.stringify(context)+"','"+text+"','"+duration_str+"'\x1b[0m)")
        if(isShowPrintStack) PrintStackTrace()
        return this.makeText(context,text,duration)
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
            Thread.backtrace(ctx,Backtracer.ACCURATE)
            // .slice(0,6)
            // .reverse()
            .map(DebugSymbol.fromAddress).join("\n")+"\x1b[0m");
}

function SendMessage(str0,str1,str2){
    Java.perform(function(){
        var UnityPlayer = Java.use("com.unity3d.player.UnityPlayer")
        UnityPlayer.UnitySendMessage(str0,str1,str2)
    })

}

function hookLog() {
    var isFirst = true
    Interceptor.attach(Module.findExportByName(null,"__android_log_print"), {
        onEnter: function (args) {
            if(isFirst) {
                console.log("\n")
                isFirst = false
            }
            console.warn("---------------------------")
            console.log(args[1].readCString()+"\t"+args[2].readCString()+"\t"+args[3]+"\t"+args[4]+"\t"+args[5])
            PrintStackTraceN(this.context)
        }
    });
}

function HookSharedPrefences(){

    hookGet()
    hookPut()
    hookInit()
    const isShowPrintStack = true

    function hookInit(){
        Java.perform(function(){
            var SharedPreferencesImpl = Java.use("android.app.SharedPreferencesImpl")
            SharedPreferencesImpl.$init.implementation = function(key,value){
                console.error("\n\x1b[96mCalled SharedPreferencesImpl.$init'"+key+"','"+value+"'\x1b[0m")
                return this.$init(a,b)
            }
        })
        
    }

    function hookGet(){
        Java.perform(function(){
            var SharedPreferencesImpl = Java.use("android.app.SharedPreferencesImpl")
        
            SharedPreferencesImpl.getString.implementation = function(key,value){
                console.warn("----------------------------")
                var ret = this.getString(key,value)
                console.log(ret + " = Sp.getString(\x1b[96m'"+key+"','"+value+"'\x1b[0m)")
                if(isShowPrintStack) PrintStackTrace()
                return ret;
            }

            SharedPreferencesImpl.getInt.implementation = function(key,value){
                console.warn("----------------------------")
                var ret = this.getInt(key,value)
                console.log(ret + " = Sp.getInt(\x1b[96m'"+key+"','"+value+"'\x1b[0m)")
                if(isShowPrintStack) PrintStackTrace()
                return ret;
            }

            SharedPreferencesImpl.getLong.implementation = function(key,value){
                console.warn("----------------------------")
                var ret = this.getLong(key,value)
                console.log(ret + " = Sp.getLong(\x1b[96m'"+key+"','"+value+"'\x1b[0m)")
                if(isShowPrintStack) PrintStackTrace()
                return ret;
            }

            SharedPreferencesImpl.getFloat.implementation = function(key,value){
                console.warn("----------------------------")
                var ret = this.getFloat(key,value)
                console.log(ret + " = Sp.getFloat(\x1b[96m'"+key+"','"+value+"'\x1b[0m)")
                if(isShowPrintStack) PrintStackTrace()
                return ret;
            }

            SharedPreferencesImpl.getBoolean.implementation = function(key,value){
                console.warn("----------------------------")
                var ret = this.getBoolean(key,value)
                console.log(ret + " = Sp.getBoolean(\x1b[96m'"+key+"','"+value+"'\x1b[0m)")
                if(isShowPrintStack) PrintStackTrace()
                return ret;
            }

            SharedPreferencesImpl.contains.implementation = function(key){
                console.warn("----------------------------")
                var ret = this.contains(key)
                console.log(ret +" = Sp.contains(\x1b[96m'"+key+"'\x1b[0m)")
                if(isShowPrintStack) PrintStackTrace()
                return ret;
            }
        })
    }

    function hookPut(){
        Java.perform(function(){
            var EditorImpl = Java.use("android.app.SharedPreferencesImpl$EditorImpl")
    
            EditorImpl.putString.implementation = function(key,value){
                console.warn("----------------------------")
                console.log("edit.putString(\x1b[96m'"+key+"','"+value+"'\x1b[0m)")
                if(isShowPrintStack) PrintStackTrace()
                return this.putString(key,value);
            }
            
            EditorImpl.putInt.implementation = function(key,value){
                console.warn("----------------------------")
                console.log("edit.putInt(\x1b[96m'"+key+"','"+value+"'\x1b[0m)")
                if(isShowPrintStack) PrintStackTrace()
                return this.putInt(key,value);
            }

            EditorImpl.putLong.implementation = function(key,value){
                console.warn("----------------------------")
                console.log("edit.putLong(\x1b[96m'"+key+"','"+value+"'\x1b[0m)")
                if(isShowPrintStack) PrintStackTrace()
                return this.putLong(key,value);
            }

            EditorImpl.putFloat.implementation = function(key,value){
                console.warn("----------------------------")
                console.log("edit.putFloat(\x1b[96m'"+key+"','"+value+"'\x1b[0m)")
                if(isShowPrintStack) PrintStackTrace()
                return this.putFloat(key,value);
            }

            EditorImpl.putBoolean.implementation = function(key,value){
                console.warn("----------------------------")
                console.log("edit.putBoolean(\x1b[96m'"+key+"','"+value+"'\x1b[0m)")
                if(isShowPrintStack) PrintStackTrace()
                return this.putBoolean(key,value);
            }

            EditorImpl.putStringSet.implementation = function(key,value){
                console.warn("----------------------------")
                console.log("edit.putStringSet(\x1b[96m'"+key+"','"+value+"'\x1b[0m)")
                if(isShowPrintStack) PrintStackTrace()
                return this.putStringSet(key,value);
            }

        })
    }

}

function ReadSpFromMemory(){

    Java.perform(function(){

        var current_item = 0

        var SharedPreferencesImpl = Java.use("android.app.SharedPreferencesImpl")
        SharedPreferencesImpl.$init.implementation = function(a,b){
            console.log("called SharedPreferencesImpl.$init "+ a +"   "+ b)
            return this.$init(a,b)
        }
        
        //如果没有Gson包的话自行导入，或者使用JSON.stringify
        Java.openClassFile("/data/local/tmp/helper.dex").load()
        var Gson = Java.use("com.google.gson.Gson");
        var gson = Gson.$new();

        Java.choose("android.app.SharedPreferencesImpl",{
            onMatch:function(obj){
                console.warn("\n---------------------------- "+current_item+++" ----------------------------")
                console.log("\x1b[96mSharedPreferencesImpl('"+obj.mFile.value+"','"+convert_mode_toString(obj.mMode.value)+"')\x1b[0m")
                console.log("HashCode : \t\t"+obj.hashCode() +" ====> 0x" +obj.hashCode().toString(16))
                console.log("StatTimestamp : \t"+obj.mStatTimestamp.value)
                console.log("StatSize : \t\t"+obj.mStatSize.value)
                console.log("\n========CONTENT======== ↓")
                console.log(gson.toJson(obj.mMap.value))
            },
            onComplete:function(){
                console.error("\nSearch onComplete ^_^\n")
            }
        })

        function convert_mode_toString(mode){
            switch(mode){
                case 0: return "MODE_PRIVATE";
                case 1: return "MODE_WORLD_READABLE";
                case 2: return "MODE_WORLD_WRITEABLE";
                case 4: return "MODE_MULTI_PROCESS";
            }
        }
    })
}

function HookDialog(){

    const isShowPrintStack = true

    Java.perform(function(){
        Java.use("androidx.appcompat.app.AlertDialog").show.implementation = function(){
            console.log("called androidx.appcompat.app.AlertDialog.show()")
            if(isShowPrintStack) PrintStackTrace()
            return this.show()
        }
    })
}

function HookExports(name,mdname,ishook){
    
    //java堆栈
    const isShowPrintStack = false
    //native堆栈
    const isShowPrintStackN = true

    soName = mdname == undefined || mdname == "" ? soName : mdname
    Interceptor.detachAll()

    var md = NULL
    var addr = NULL
    try{
        var md = Process.findModuleByName(soName)
        addr = md.base
    }catch(e){
        console.error(soName + " not found!")
        return
    }
    console.error(soName+" at "+addr)
    
    md.enumerateExports().forEach(function(item){
        if(item.name.indexOf(name)!=-1){
            console.log(JSON.stringify(item))
            if(ishook!=undefined)hook_item(item)
        }
    })

    function hook_item(item){
        console.log("add break points at "+item.address)
        try{
            Interceptor.attach(item.address,{
                onEnter:function(args){
                    console.log("\n\x1b[96mA called "+item.address+" ===> "+item.address.sub(addr)+"\t"+item.name+"\x1b[0m")
                    if(isShowPrintStack) PrintStackTrace()
                    if(isShowPrintStackN) PrintStackTraceN(this.context)
                },
                onLeave:function(retval){

                }
            })
        }catch(e){
            try{
                Interceptor.attach(item.address.add(1),{
                    onEnter:function(args){
                        console.log("\n\x1b[96mT Called "+item.address+" ===> "+item.address.add(1).sub(addr)+"\t"+item.name+"\x1b[0m")
                        if(isShowPrintStack) PrintStackTrace()
                        if(isShowPrintStackN) PrintStackTraceN(this.context)
                    },
                    onLeave:function(retval){
    
                    }
                })
            }catch(e){
                console.log(e)
            }
        }
    }
}

function HookImports(name,mdname,ishook){
    //java堆栈
    const isShowPrintStack = false
    //native堆栈
    const isShowPrintStackN = true

    Interceptor.detachAll()

    soName = mdname == undefined || mdname == "" ? soName : mdname
    var md = NULL
    var addr = NULL
    try{
        var md = Process.findModuleByName(soName)
        addr = md.base
    }catch(e){
        console.error(soName + " not found!")
        return
    }
    
    md.enumerateImports().forEach(function(item){
        if(item.name.indexOf(name)!=-1){
            console.log(JSON.stringify(item))
            if(ishook!=undefined)hook_item(item)
        }
    })

    function hook_item(item){
        console.log("add break points at "+item.address)
        try{
            Interceptor.attach(item.address,{
                onEnter:function(args){
                    console.log("\n\x1b[96mA called "+item.address+" ===> "+item.address.sub(addr)+"\t"+item.name+"\x1b[0m")
                    if(isShowPrintStack) PrintStackTrace()
                    if(isShowPrintStackN) PrintStackTraceN(this.context)
                },
                onLeave:function(retval){

                }
            })
        }catch(e){
            try{
                Interceptor.attach(item.address.add(1),{
                    onEnter:function(args){
                        console.log("\n\x1b[96mT Called "+item.address+" ===> "+item.address.add(1).sub(addr)+"\t"+item.name+"\x1b[0m")
                        if(isShowPrintStack) PrintStackTrace()
                        if(isShowPrintStackN) PrintStackTraceN(this.context)
                    },
                    onLeave:function(retval){
    
                    }
                })
            }catch(e){
                console.log(e)
            }
        }
    }
}

function HookSymbols(name,mdname,ishook){
    //java堆栈
    const isShowPrintStack = false
    //native堆栈
    const isShowPrintStackN = true

    Interceptor.detachAll()

    soName = mdname == undefined || mdname == "" ? soName : mdname
    var md = NULL
    var addr = NULL
    try{
        var md = Process.findModuleByName(soName)
        addr = md.base
    }catch(e){
        console.error(soName + " not found!")
        return
    }
    
    md.enumerateSymbols().forEach(function(item){
        if(item.name.indexOf(name)!=-1){
            console.log(JSON.stringify(item))
            if(ishook!=undefined)hook_item(item)
            if(ishook == 1) return item.address
        }
    })

    function hook_item(item){
        console.log("add break points at "+item.address)
        try{
            Interceptor.attach(item.address,{
                onEnter:function(args){
                    console.log("\n\x1b[96mA called "+item.address+" ===> "+item.address.sub(addr)+"\t"+item.name+"\x1b[0m")
                    if(isShowPrintStack) PrintStackTrace()
                    if(isShowPrintStackN) PrintStackTraceN(this.context)
                },
                onLeave:function(retval){

                }
            })
        }catch(e){
            try{
                Interceptor.attach(item.address.add(1),{
                    onEnter:function(args){
                        console.log("\n\x1b[96mT Called "+item.address+" ===> "+item.address.add(1).sub(addr)+"\t"+item.name+"\x1b[0m")
                        if(isShowPrintStack) PrintStackTrace()
                        if(isShowPrintStackN) PrintStackTraceN(this.context)
                    },
                    onLeave:function(retval){
    
                    }
                })
            }catch(e){
                console.log(e)
            }
        }
    }
}

function seeString(addr){
    console.log(ptr(addr).readCString())
}

function seeHex(addr,length){
    console.log(hexdump(ptr(addr),{length:length}))
}

function allocMemory(){
    var arr = [
        0x00,0x84,0xab,0xed,0x00,0x00,0x00,0x00,0x01,0x00,0x00,0x00,
        0xfd,0x56,0x2d,0x4e,
        0x00,0x00,0x00,0x00];
    const r = Memory.alloc(arr.length);
    Memory.writeByteArray(r,arr);
    return r
}

function memorySearch(filter){
    //filter like this "67 1f 95"
    Memory.protect(m.base,m.size,'rwx')
    Memory.scan(m.base,m.size,filter,{
        onMatch:function(address,size){
            console.log("onMatch ===> " + address + "\t size ===> "+size)
        },
        onComplete:function(){
            console.log("onComplete")
        },
        onError:function(str){
            console.error(str)
        }
    })
}

// setImmediate(Hook_unity_get_set(0x300DC4,0x300DCC))
function Hook_unity_get_set(g,s){

    var soAddr = Module.findBaseAddress(soName)

    var func_get = g == 0 ? 0x0 : g;
    var func_set = s == 0 ? 0x0 : s;

    var show_length = 64

    if(func_get != 0){
        Interceptor.attach(soAddr.add(func_get),{
            onEnter:function(args){
                
            },
            onLeave:function(ret){
                console.warn("\nCalled func_get at "+ func_get)
                console.log(hexdump(ret,{length:show_length}))
            }
        })
    }

    if(func_set != 0){
        Interceptor.attach(soAddr.add(func_set),{
            onEnter:function(args){
                console.warn("\nCalled func_set at "+ func_set)
                console.log(hexdump(args[1],{length:show_length}))
            },
            onLeave:function(ret){
                
            }
        })
    }
}

// setImmediate(HookLoadLibrary)
function HookLoadLibrary(){

    //这里三个子函数建议分开单独跑，避免日志混乱

    loadLibrary()
    // dlopen_and_dlsym()
    // initArray()

    /**
     * System.loadlibrary 的java层加载堆栈
     */
    function loadLibrary(){
        Java.perform(function() {
            const System = Java.use('java.lang.System');
            const Runtime = Java.use('java.lang.Runtime');
            const VMStack = Java.use('dalvik.system.VMStack');
    
            System.loadLibrary.implementation = function(library) {
                try {
                    console.error("-------------------------------------")
                    console.warn('\nSystem.loadLibrary("' + library + '")');
                    PrintStackTrace()
                    const loaded = Runtime.getRuntime().loadLibrary0(VMStack.getCallingClassLoader(), library);
                    return loaded;
                } catch(ex) {
                    console.log(ex);
                }
            };
    
            System.load.implementation = function(library) {
                try {
                    console.log('System.load("' + library + '")');
                    PrintStackTrace()
                    const loaded = Runtime.getRuntime().load0(VMStack.getCallingClassLoader(), library);
                    return loaded;
                } catch(ex) {
                    console.log(ex);
                }
            };
        });
    }

    /**
     * dlopen和dlsym调用参数hook
     */
    function dlopen_and_dlsym(){

        Interceptor.attach(Module.findExportByName(null, "__loader_android_dlopen_ext"),{
            onEnter:function(args){
                this.arg0 = args[0]
                this.arg1 = args[1]
            },
            onLeave:function(retval){
                console.warn("\n\x1b[36m"+retval+' = dlopen('+this.arg0.readCString()+","+this.arg1.toInt32()+')\x1b[0m');
            }
        })

        Interceptor.attach(Module.findExportByName(null, "__loader_dlopen"),{
            onEnter:function(args){
                this.arg0 = args[0]
                this.arg1 = args[1]
            },
            onLeave:function(retval){
                console.warn("\n\x1b[36m"+retval+' = dlopen('+this.arg0.readCString()+","+this.arg1.toInt32()+')\x1b[0m');
            }
        })

        Interceptor.attach(Module.findExportByName(null, "__loader_dlsym"),{
            onEnter:function(args){
                this.arg0 = args[0]
                this.arg1 = args[1].readCString()
            },
            onLeave:function(retval){
                console.log("\t\x1b[36m"+retval+' = dlsym('+this.arg0+',"'+this.arg1+'")\x1b[0m');
            }
        })
    }

    /**
     * initArray 函数的 Hook
     * （快速找到initArray的时候调用了哪些函数）
     */
    function initArray(){
        Process.findModuleByName("linker64")
            .enumerateSymbols()
            .forEach(function(item){
                if(item.name.indexOf("call_array")!=-1){
                    console.warn("\n"+"---------------------------------------------------------------")
                    console.error(JSON.stringify(item))
                    Interceptor.attach(item.address,{
                        onEnter:function(args){
                            console.warn("---------------------------------------------------------------")
                            console.log(args[0].readCString())
                            console.log(args[1])
                            var arr=args[3].readCString().split("/")
                            var sn = arr[arr.length-1]
                            if (args[1]!=0 && args[2]!=0){
                                for(var i=0;i<args[2];i++){
                                    var addrs = (args[1].add(i*Process.pointerSize)).readPointer()
                                    var name = find_from_exports(sn,addrs)
                                    var temp_so_addr = Module.findBaseAddress(sn)
                                    console.log("\t\x1b[36m[*]"+addrs +"\t ===> \t" + name +"\t ===> \t" + addrs.sub(temp_so_addr)+"\x1b[0m")
                                }
                            }
                            console.log(args[2])
                            console.log(args[3].readCString() + "\t\t===>\t" + Module.findBaseAddress(sn)+"\n")
                        },
                        onLeave:function(retval){

                        }
                    })
                }
            }
        )

    /**
     * @param {*so name} 需要查找的so
     * @param {*address} 需要比对的地址 
     * @returns {*function name} 返回函数名
     */
    function find_from_exports(sn,ad){
        var md = NULL
        var name = "---"
        try{
            var md = Process.findModuleByName(sn)
        }catch(e){
            console.error(sn + " not found!")
            return
        }
        md.enumerateExports().forEach(function(item){
            if (item.address.sub(ad) == 0) name = item.name
        })

        if (name.indexOf("---") != 0 ) return name
        
        md.enumerateSymbols().forEach(function(item){
            if (item.address.sub(ad) == 0) name = item.name
        })
        return name
    }

    }


}
















