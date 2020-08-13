
// 结合Il2CppDumper使用，用于批量快速下断点，跟踪native函数调用
// frida -U -f <PackageName> -l C:\Users\lzy\utils\bpoints.js --no-pause


const soName = "libmain.so"

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
                try{
                    console.log('currentAddr:' + value);
                    funcTmp(value,index,arrayName);
                    console.log("\t\t---->"+index,value+" is prepared ");  
                }catch(e){
                    console.warn(e)
                }
            })
        console.log("\n")
    })

    function funcTmp(currentAddr,soAddr,index,arrayName){
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

setImmediate(hook_dlopen())
