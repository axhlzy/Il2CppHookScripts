   function anti_fgets() {
        show_log("anti_fgets");
        var fgetsPtr = Module.findExportByName("libc.so", "fgets");
        var fgets = new NativeFunction(fgetsPtr, 'pointer', ['pointer', 'int', 'pointer']);
        Interceptor.replace(fgetsPtr, new NativeCallback(function (buffer, size, fp) {
            var retval = fgets(buffer, size, fp);
            var bufstr = Memory.readUtf8String(buffer);
            if (bufstr.indexOf("TracerPid:") > -1) {
                Memory.writeUtf8String(buffer, "TracerPid:\t0");
                // dmLogout("tracerpid replaced: " + Memory.readUtf8String(buffer));
            }
            return retval;
        }, 'pointer', ['pointer', 'int', 'pointer']));
    };

function CheckPoen(){

    var popen = Module.findExportByName("libc.so","popen")
    console.log("popen addr : "+popen)
    Interceptor.attach(popen,{
        onEnter:function(args){
            console.warn("\n-----------------------")
            console.log("Called "+'\x1b[3' + '6;01' + 'm', "popen", '\x1b[39;49;00m');
            console.log("===>\t"+args[0].readCString()+"\t"+args[1].readCString())
            console.log("===>\t"+"called from:"+
                Thread.backtrace(this.context,Backtracer.ACCURATE)
                .map(DebugSymbol.fromAddress).join("\n"));
            if(args[0].readCString().indexOf("5D8A")!=-1){
                args[0] = Memory.allocUtf8String(args[0].readCString().replace("5D8A","-5D8A"))
                this.isCheck = true
            }
        },
        onLeave:function(retval){
            if(this.isCheck){
                console.error("反调试类型 ---> 端口检测")
            }
        }
    })

}

//sprintf(file_name, "/proc/%d/status",pid)
//sprintf(name,"/proc/%d/cmdline",statue);
//strstr(nameline,"android_server")
//fp = fopen(file_name,"r");
//int statue =atoi(&line[10]);
function CheckTracePid(){
    var atoi = Module.findExportByName(null,"atoi")
    var sprintf = Module.findExportByName(null,"sprintf")
    console.log("sprintf addr : "+sprintf)
    Interceptor.attach(sprintf,{
        onEnter:function(args){
            if(args[1].readCString().indexOf("proc")!=-1&&args[1].readCString().indexOf("status")!=-1){
                this.isCheck1 = true
            }
            if(args[1].readCString().indexOf("proc")!=-1&&args[1].readCString().indexOf("cmdline")!=-1){
                this.isCheck2 = true
            }
            if(args[1].readCString().indexOf("proc")!=-1&&args[1].readCString().indexOf("maps")!=-1){
                this.isCheck3 = true
            }
            if(this.arg1||this.arg2||this.arg3){
                console.warn("\n-----------------------")
                console.log("Called "+'\x1b[3' + '6;01' + 'm', "sprintf", '\x1b[39;49;00m');
                console.log("===>\t"+args[1].readCString()+"\t")
                console.log("===>\t"+"called from:"+
                    Thread.backtrace(this.context,Backtracer.ACCURATE)
                    .map(DebugSymbol.fromAddress).join("\n"));
            }
            this.arg1 = args[1]
        },
        onLeave:function(retval){
            if(this.isCheck1){
                this.arg1 = Memory.allocUtf8String("/proc/1/status")
                console.log("--->\t"+this.arg1.readCString())
                console.error("反调试类型 ---> TracePid")
            }
            if(this.isCheck2){
                this.arg1 = Memory.allocUtf8String("/proc/1/cmdline")
                console.log("--->\t"+this.arg1.readCString())
                console.error("反调试类型 ---> 进程名称检测")
            }
            if(this.isCheck2){
                this.arg1 = Memory.allocUtf8String("/proc/1/maps")
                console.log("--->\t"+this.arg1.readCString())
            }
        }
    })
}

//签名校验
//GetMethodID(j_clz,"getPackageManager","()Landroid/content/pm/PackageManager;");
//env->GetMethodID(j_clz, "getPackageName", "()Ljava/lang/String;");
//env->GetMethodID(j_clz,"getPackageInfo","(Ljava/lang/String;I)Landroid/content/pm/PackageInfo;");
//env->GetFieldID(j_clz,"signatures","[Landroid/content/pm/Signature;");
//JNI函数原型
//jmethodID GetMethodID(JNIEnv *env, jclass clazz,const char *name, const char *sig);
//jfieldID GetFieldID(JNIEnv *env, jclass clazz,const char *name, const char *sig);

function CheckSignature(){
    Java.perform(function(){
        var env = Java.vm.getEnv();
        var pSize = Process.pointerSize;
        var GetMethodID = 33 , GetFieldID = 94

        function getNativeAddress(idx) {
            return env.handle.readPointer().add(idx * pSize).readPointer();
        }

        Interceptor.attach(getNativeAddress(GetMethodID),{
            onEnter:function(args){
                var tempstr = args[2].readCString()
                if(tempstr.indexOf("getPackageManager")!=-1||tempstr.indexOf("getPackageInfo")!=-1||
                    tempstr.indexOf("getPackageName")!=-1){
                    console.warn("\n-----------------------")
                    console.log("Called "+'\x1b[3' + '6;01' + 'm', "GetMethodID", '\x1b[39;49;00m');
                    console.log("===>\t"+args[2].readCString()+"\t"+args[3].readCString())
                    console.log("===>\t"+"called from:"+
                        Thread.backtrace(this.context,Backtracer.ACCURATE)
                        .map(DebugSymbol.fromAddress).join("\n"));
                }
            },
            onLeave:function(retval){}
        })

        Interceptor.attach(getNativeAddress(GetFieldID),{
            onEnter:function(args){
                if(args[2].readCString().indexOf("signatures")!=-1){
                    this.isCheck = true
                    console.warn("\n-----------------------")
                    console.log("Called "+'\x1b[3' + '6;01' + 'm', "GetMethodID", '\x1b[39;49;00m');
                    console.log("===>\t"+args[2].readCString()+"\t"+args[3].readCString())
                    console.log("===>\t"+"called from:"+
                        Thread.backtrace(this.context,Backtracer.ACCURATE)
                        .map(DebugSymbol.fromAddress).join("\n"));
                }
            },
            onLeave:function(retval){
                if(this.isCheck){
                    retval.replace(env.newStringUtf("asdfasdfasdf1f65s15d6f156s"))
                    console.error("反调试类型 ---> Native签名校验")
                }
            }
        })

        Java.use("android.content.pm.PackageManager").getPackageInfo
            .overload('java.lang.String', 'int')
            .implementation = function(packageName,flag){
                var ret = this.getPackageInfo(packageName,flag)
                console.log("called getPackageInfo : "+ret)
                return ret
        }
    })
}

function CheckProceesName(){
    var strstr = Module.findExportByName(null,"strstr")
    var strcmp = Module.findExportByName(null,"strcmp")
    const str_aim = "android_server"

    Interceptor.attach(strstr,{
        onEnter:function(args){
            if(args[0].readCString().indexOf(str_aim)!=-1||args[1].readCString().indexOf(str_aim)!=-1){
                this.isCheck = true
                console.warn("\n-----------------------")
                console.log("Called "+'\x1b[3' + '6;01' + 'm', "strstr", '\x1b[39;49;00m');
                console.log("===>\t"+args[0].readCString()+"\t"+args[1].readCString())
                console.log("===>\t"+"called from:"+
                    Thread.backtrace(this.context,Backtracer.ACCURATE)
                    .map(DebugSymbol.fromAddress).join("\n"));
            }else if(args[0].readCString().indexOf("com.saurik.substrate")!=-1
                    ||args[1].readCString().indexOf("com.saurik.substrate")!=-1
                    ||args[0].readCString().indexOf("io.va.exposed")!=-1
                    ||args[1].readCString().indexOf("io.va.exposed")!=-1
                    ||args[0].readCString().indexOf("de.robv.android.xposed")!=-1
                    ||args[1].readCString().indexOf("de.robv.android.xposed")!=-1){
                this.isCheck1 = true
                return
            }
        },
        onLeave:function(retval){
            if(this.isCheck){
                console.error("反调试类型 ---> 名称(android_server)校验")
            }
            if(this.isCheck1){

            }
        }
    })

    Interceptor.attach(strcmp,{
        onEnter:function(args){
            if(args[0].readCString().indexOf(str_aim)!=-1||args[1].readCString().indexOf(str_aim)!=-1){
                this.isCheck = true
                console.warn("\n-----------------------")
                console.log("Called "+'\x1b[3' + '6;01' + 'm', "strcmp", '\x1b[39;49;00m');
                console.log("===>\t"+args[0].readCString()+"\t"+args[1].readCString())
                console.log("===>\t"+"called from:"+
                    Thread.backtrace(this.context,Backtracer.ACCURATE)
                    .map(DebugSymbol.fromAddress).join("\n"));
            }
        },
        onLeave:function(retval){
            if(this.isCheck){
                console.error("反调试类型 ---> 名称(android_server)校验")
            }
        }
    })
}

setImmediate(CheckPoen(),CheckTracePid(),CheckSignature(),CheckProceesName())
