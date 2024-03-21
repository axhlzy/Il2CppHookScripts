export function HookReflect(){
    Java.perform(()=>{
        let Method = Java.use('java.lang.reflect.Method')
        Method.invoke.overload('java.lang.Object', '[Ljava.lang.Object;').implementation = function (obj: any, args: any) {
            if (Hooks_value_hideJavaLog) return this.invoke(obj, args)
            let params: string = args.length == 0 ? '' : JSON.stringify(args)
            LOGW(`CALLED -> ${this.toString()}`)
            LOGZ(`\tPARAMS[${args.length}] -> ${params}`)
            PrintStackTraceJava()
            return this.invoke(obj, args)
        }
    })
}

export function HookIntent(){
    // Java.perform(function(){
    //     Java.use("android.content.Intent").startActivity.implementation = function(){
    //         console.warn("\n--------------\tCalled Intent.startActivity\t--------------")
    //         console.log("Intent.startActivity(\x1b[96m'"+this+"'\x1b[0m)")
    //         PrintStackTraceJava()
    //         return this.startActivity()
    //     }
    // })
 
    // android.content.Intent
    hookJavaClass("android.content.Intent", (_methodName, _methodSignature, _args) => {
        return {
            skipOriginal: false,
            parseValue: !Hooks_value_hideJavaLog,

            // Using example ↓
            // after: (_this: any, _args: any, returnValue: any) => {
            //     // todo something if you want ?
            //     PrintStackTraceJava()
            //     return returnValue
            // }
            
        }
    })
}

export function HookExit(){

    Java.perform(function () {
        Java.use("android.app.Activity").finish.overload().implementation = function () {
            if (Hooks_value_hideJavaLog) return this.finish()
            console.log("called android.app.Activity.Finish")
            PrintStackTraceJava()
        }
        Java.use("java.lang.System").exit.implementation = function (code: number) {
            if (Hooks_value_hideJavaLog) return this.exit(code)
            console.log("called java.lang.System.exit(" + code + ")")
            PrintStackTraceJava()
        }
    })

}

export function HookStartActivity(){
    Java.perform(function() {
        const Activity = Java.use('android.app.Activity')
        Activity.onCreate.overload('android.os.Bundle').implementation = function(bundle:any) {
            if (Hooks_value_hideJavaLog) return this.onCreate(bundle)
            console.info('Activity started: ' + this)
            PrintStackTraceJava()
            // Call the original onCreate method
            this.onCreate(bundle)
        }
    })
}

function HookToast(){
    Java.use("android.widget.Toast").makeText.overload('android.content.Context', 'java.lang.CharSequence', 'int').implementation = function(context: any,text: string,duration: number){
        if (Hooks_value_hideJavaLog) return this.makeText(context,text,duration)
        console.warn("\n--------------\tCalled Toast.makeText\t--------------")
        let duration_str = "Toast.LENGTH_SHORT"
        if(duration == 1) duration_str = "Toast.LENGTH_LONG"
        console.log("Toast.makeText(\x1b[96m'"+JSON.stringify(context)+"','"+text+"','"+duration_str+"'\x1b[0m)")
        PrintStackTraceJava()
        return this.makeText(context,text,duration)
    }
}

function HookLog(){

    const isShowPrintStack = false
    // const filter = ["AppLovinSdk","VIVI","BGAQ","opqwt","AppLovinManager","MM"]
    const filter :any[] = []

    Java.perform(()=>{
        logD()
        logI()
        logE()
    })

    function logD(){
        const Log = Java.use("android.util.Log")
            Log.d.overload('java.lang.String', 'java.lang.String').implementation = function(str0: string | any[],str1: any){
                if(filter.length != 0){
                    filter.forEach(function(item){
                        if(str0.indexOf(item)!=-1) show(str0,str1)
                    })
                }else{
                    show(str0,str1)
                }
                return this.d(str0,str1)
            }
            function show(str0: string | any[],str1: string){
                if (Hooks_value_hideJavaLog) return
                console.warn("\n--------------\tCalled Log.d\t--------------")
                console.log("Log.d(\x1b[96m'"+str0+"','"+str1+"'\x1b[0m)")
                if(isShowPrintStack) PrintStackTraceJava()
            }
    }
    
    function logI(){
        const Log = Java.use("android.util.Log")
            Log.i.overload('java.lang.String', 'java.lang.String').implementation = function(str0: string | any[],str1: any){
                if(filter.length != 0){
                    filter.forEach(function(item){
                        if(str0.indexOf(item)!=-1) show(str0,str1)
                    })
                }else{
                    show(str0,str1)
                }
                return this.i(str0,str1)
            }
            function show(str0: string | any[],str1: string){
                if (Hooks_value_hideJavaLog) return
                console.warn("\n--------------\tCalled Log.i\t--------------")
                console.log("Log.i(\x1b[96m'"+str0+"','"+str1+"'\x1b[0m)")
                if(isShowPrintStack) PrintStackTraceJava()
            }
    }

    function logE(){
        const Log = Java.use("android.util.Log")
            Log.e.overload('java.lang.String', 'java.lang.String').implementation = function(str0: string | any[],str1: any){
                if(filter.length != 0){
                    filter.forEach(function(item){
                        if(str0.indexOf(item)!=-1) show(str0,str1)
                    })
                }else{
                    show(str0,str1)
                }
                return this.e(str0,str1)
            }
            function show(str0: string | any[],str1: string){
                if (Hooks_value_hideJavaLog) return
                console.warn("\n--------------\tCalled Log.i\t--------------")
                console.log("Log.e(\x1b[96m'"+str0+"','"+str1+"'\x1b[0m)")
                if(isShowPrintStack) PrintStackTraceJava()
            }
    }
    
}

function HookNLog() {
    let isFirst = true
    Interceptor.attach(Module.findExportByName(null,"__android_log_print")!, {
        onEnter: function (args) {
            if (Hooks_value_hideJavaLog) return
            if(isFirst) {
                console.log("\n")
                isFirst = false
            }
            console.warn("---------------------------")
            console.log(args[1].readCString()+"\t"+args[2].readCString()+"\t"+args[3]+"\t"+args[4]+"\t"+args[5])
            PrintStackTraceNative(this.context)
        }
    })
}


function HookPackageAndSign(){

    showCurrent()
    // hookJava()
    // hookNative()

    function showCurrent(){
        Java.perform(function(){
            const currentApplication = Java.use('android.app.ActivityThread').currentApplication()
            const context = currentApplication.getApplicationContext()
            const packageName = context.getPackageName()
            const PackageManager = context.getPackageManager()
            const PackageInfo = PackageManager.getPackageInfo(packageName,0x00000040)
            console.error("\n------------------------------------------------------------------")
            console.log("PackageName\t===>\t",packageName)
            console.log("PackageManager\t===>\t",PackageManager)
            console.log("PackageInfo\t===>\t",PackageInfo)
            console.log("versionCode\t===>\t",PackageInfo.versionCode.value)
            console.log("versionName\t===>\t",PackageInfo.versionName.value)
            console.log("signatures\t===>\t",PackageInfo.signatures.value)
            console.error("------------------------------------------------------------------\n")
        })
    }

    function hookJava(){
        Java.perform(function(){
            Java.use("android.content.ContextWrapper").getPackageManager.implementation = function(){
                console.error("\n------------------------------------------------------------------")
                console.warn("called getPackageManager()")
                PrintStackTraceJava()
                return this.getPackageManager()
            }
            
            Java.use("android.app.ApplicationPackageManager").getPackageInfo.overload('java.lang.String', 'int').implementation = function(a: string,b: any){
                console.error("\n------------------------------------------------------------------")
                console.warn("called getPackageInfo('"+a+"','"+b+"')\t--->\t.overload('java.lang.String', 'int')")
                PrintStackTraceJava()
                return this.getPackageInfo(a,b)
            }
    
            Java.use("android.app.ApplicationPackageManager").getPackageInfo.overload('android.content.pm.VersionedPackage', 'int').implementation = function(a: any,b: any){
                console.error("\n------------------------------------------------------------------")
                console.warn("called getPackageInfo('"+a+"','"+b+"')\t--->\t.overload('android.content.pm.VersionedPackage', 'int')")
                PrintStackTraceJava()
                return this.getPackageInfo(a,b)
            }
        })
    }

    function hookNative(){
        Java.perform(function(){
            const pSize = Process.pointerSize
            const env = Java.vm.getEnv()

            const filter = ['getPackageName','getPackageInfo','getPackageManager','Sign','hashCode']
            //https://docs.oracle.com/javase/8/docs/technotes/guides/jni/spec/functions.html#NewStringUTF
            const GetStaticMethodID = 113, GetFieldID = 94,GetMethodID = 33
    
            function getNativeAddress(idx: number) {
                return env.handle.readPointer().add(idx * pSize).readPointer()
            }

            //TODO .........

            hook_GetFieldID()

            hook_GetMethodID()
    
            function hook_GetMethodID(){
                Interceptor.attach(getNativeAddress(GetMethodID),{
                    onEnter:function(args){
                        const ctx = this.context
                        filter.forEach(function(value,index,array){
                            if (value.indexOf(args[2].readCString()!)!=-1||value.indexOf(args[3].readCString()!)!=-1){
                                console.error("\n-------------GetMethodID-------------")
                                console.warn("env\t--->\t"+args[0])
                                console.warn("jclass\t--->\t"+args[1])
                                console.warn("name\t--->\t"+args[2].readCString())
                                console.warn("sign\t--->\t"+args[3].readCString())
                                PrintStackTraceNative(ctx)
                            }
                        })
                    },
                    onLeave:function(retval){}
                })
            }

            function hook_GetFieldID(){
                Interceptor.attach(getNativeAddress(GetFieldID),{
                    onEnter:function(args){
                        const ctx = this.context
                        filter.forEach(function(value,index,array){
                            // if (value.indexOf(args[2].readCString())!=-1||value.indexOf(args[3].readCString())!=-1){
                                console.error("\n-------------GetFieldID-------------")
                                console.warn("env\t--->\t"+args[0])
                                console.warn("jclass\t--->\t"+args[1])
                                console.warn("name\t--->\t"+args[2].readCString())
                                console.warn("sign\t--->\t"+args[3].readCString())
                                PrintStackTraceNative(ctx)
                            // }
                        })
                    },
                    onLeave:function(retval){}
                })
            }
        })
    }
}


function HookJSONObject(){
    Java.perform(function(){
        Java.use('org.json.JSONObject').getString.implementation = function (key: string) {
            const ret = this.getString(key)
            if (Hooks_value_hideJavaLog) return ret
            LOG("\n--------------------------------------\n"+ key,LogColor.COLOR_36)
            LOG(ret,LogColor.COLOR_36)
            PrintStackTraceJava()
            return ret
        } 
    })
}

declare global {
    var HookJavaReflect: () => void
    var HookJavaIntent: () => void
    var HookJavaExit: () => void
    var HookJavaStartActivity: () => void
    var HookJavaToast: () => void
    var HookLog: () => void
    var HookNLog: () => void
    var HookPackageAndSign: () => void
    var HookJSONObject: () => void

    var hideJavaLog: (flag?:boolean) => void
}

globalThis.HookJavaReflect = HookReflect
globalThis.HookJavaIntent = HookIntent
globalThis.HookJavaExit = HookExit
globalThis.HookJavaStartActivity = HookStartActivity
globalThis.HookJavaToast = HookToast
globalThis.HookLog = HookLog
globalThis.HookNLog = HookNLog
globalThis.HookPackageAndSign = HookPackageAndSign
globalThis.HookJSONObject = HookJSONObject

export var Hooks_value_hideJavaLog :boolean = false

globalThis.hideJavaLog = function(flag:boolean = true){
    Hooks_value_hideJavaLog = flag
    HookIntent()
}

