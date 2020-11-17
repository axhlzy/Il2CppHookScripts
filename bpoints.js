// 结合Il2CppDumper使用，用于批量快速下断点，跟踪native函数调用
// frida -U -f <PackageName> -l C:\Users\lzy\utils\bpoints.js --no-pause

setImmediate(hook_dlopen())
//setImmediate(hookJava(),hookNative())

const soName = "libil2cpp.so"

//使用的时候使用dsp.py生成的两个地址名称替换调这里的两个即可
const arrayAddr =
    ['0x71541c', '0x715b38', '0x715be4', '0x715c61']

const arrayName =
    ['GameManager$$Awake', 'GameManager$$GetParam', 'GameManager$$SaveParam', 'GameManager$$ActivatePrivacyButton']

function breakPoints(){

    const soAddr = Module.findBaseAddress(soName);
    console.error('\nsoAddr:' + soAddr + "\n");

    Java.perform(function(){
        arrayAddr
            .map(function(temp){return soAddr.add(temp)})
            .forEach(function(value,index,array){
                console.log("-------------------------");
                console.log('currentAddr:' + value);
                try{
                    funcTmp(value,index,arrayName);
                }catch(e){
                    //Thumb指令集地址要加一
                    funcTmp(value.add(1),soAddr,index,arrayName);
                }
            console.log("\t\t---->"+index,value.add(soAddr)+" is prepared ");
        })
        console.log("\n")
    })

    function funcTmp(currentAddr,index,arrayName){
        Interceptor.attach(currentAddr, {
            onEnter: function(args){
                console.log("called : "+arrayName[index]+"  ----- addr : " + currentAddr.sub(soAddr) +"\n");
                this.temp = currentAddr.sub(soAddr);
                if(this.temp === 0xef3080) {
                    console.log('CCCryptorCreate called from:\n' +
                        Thread.backtrace(this.context, Backtracer.ACCURATE)
                            .map(DebugSymbol.fromAddress).join('\n') + '\n');
                }
            },
            onLeave: function(retval){

            }
        });
    }
}

function hook_dlopen() {
    // const dlopen = Module.findExportByName(null, "dlopen");
    const dlopen = Module.findExportByName(null, "android_dlopen_ext");

    if (dlopen != null) {
        Interceptor.attach(dlopen, {
            onEnter: function (args) {
                var l_soName = args[0].readCString()
                console.log(l_soName)
                if (l_soName.indexOf(soName) != -1) {
                    this.hook = true
                }
            },
            onLeave: function (retval) {
                if (this.hook) {
                    console.warn("\nLoaded "+soName + " add break points")
                    breakPoints()
                }
            }
        })
    }
}

//HookExports,HookSymbols,HookSymbols 这三个玩意儿谨慎使用Hook到某些函数会崩掉
//这三个也是针对有时候想找找关键函数调用的时候用一下，不太推荐用这个
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

//java 堆栈
function PrintStackTrace(){
    console.log("\x1b[36m"+
        Java.use("android.util.Log")
            .getStackTraceString(Java.use("java.lang.Throwable")
            .$new())+"\x1b[0m");
}

//native 堆栈 
function PrintStackTraceN(ctx){
    console.log("\x1b[36m Called from:\n"+
            Thread.backtrace(ctx,Backtracer.ACCURATE)
            // .slice(0,6)
            // .reverse()
            .map(DebugSymbol.fromAddress).join("\n")+"\x1b[0m");
}

//frida的更多使用参见：https://www.jianshu.com/p/4291ee42c412
function hookJava(){
    //java 方法的 hook
    Java.perform(function(){
        Java.use("xxxxxxx").Testfunc.implementation = function(){
            return this.Testfunc.apply(this,arguments)
        }
    })
    //java实例的查找
    Java.choose("xxxxx",{
        onMatch:function(obj){

        },
        onComplete:function(){

        }
    })
}

function hookNative(){
    
    var addr = Module.findBaseAddress(soName)
    //方法调用
    var func = new NativeFunction(addr.add(0x123),'void','pointer')
    func(ptr(0))
    //方法拦截
    Interceptor.attach(addr.add(0x123),{
        onEnter:function(args){

        },
        onLeave:function(retval){

        }
    })
    //方法替换
    Interceptor.replace(func,new NativeCallback(function(arg){
        
    },'void',['pointer','pointer']))

}
