const soName = "libil2cpp.so"

setImmediate(Hook_dlopen)

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
        Hook_unity_get_set(0xFD1094,0xFD109C)
    }
}

function Hook_unity_get_set(g,s){

    var soAddr = Module.findBaseAddress(soName)
    
    var memcmp = Module.findExportByName("libc.so","memcmp")

    var func_get = g == 0 ? 0x0 : g;
    var func_set = s == 0 ? 0x0 : s;

    if(func_get != 0){
        Interceptor.attach(soAddr.add(func_get),{
            onEnter:function(args){
                
            },
            onLeave:function(ret){
                // console.warn("\nCalled func_get at "+ func_get)
                // console.log(hexdump(ret,{length:show_length}))
                var str_start = ret.add(Process.pointerSize*2)
                if(str_start.readPointer().toInt32() == 0x1d){
                    var arr_p = [0x1d,0x00,0x00,0x00,0x54,0x00,0x65,0x00,0x78,0x00,0x74,0x00,0x20,0x00,0x28,0x00,0x55,0x00,0x6e,0x00,0x69,0x00,0x74,0x00]
                    const m_arr_p = Memory.alloc(arr_p.length)
                    Memory.writeByteArray(m_arr_p,arr_p)
                    var mem_ret = new NativeFunction(memcmp,'pointer',['pointer','pointer','int'])(m_arr_p,str_start,10)
                    console.warn("mem_ret = ",mem_ret)
                    if (mem_ret == 0x0){
                        var arr_r = [0xFF,0xFE, 0x0B, 0x77,0xC6, 0x89,0x91,0x98,0x20,0x00,0xD7,0x00,0x35,0x00,0x00,0x00,0x00,0x00]
                        Memory.writeByteArray(str_start.add(Process.pointerSize),arr_r)
                    }
                }
            }
        })
    }


    if(func_set != 0){
        Interceptor.attach(soAddr.add(func_set),{
            onEnter:function(args){
                // console.warn("\nCalled func_set at "+ func_set)
                // console.log(hexdump(args[1],{length:show_length}))
                var str_start = args[1].add(Process.pointerSize*2)
                if(str_start.readPointer().toInt32() == 0x1d){
                    var arr_p = [0x1d,0x00,0x00,0x00,0x54,0x00,0x65,0x00,0x78,0x00,0x74,0x00,0x20,0x00,0x28,0x00,0x55,0x00,0x6e,0x00,0x69,0x00,0x74,0x00]
                    const m_arr_p = Memory.alloc(arr_p.length)
                    Memory.writeByteArray(m_arr_p,arr_p)
                    var mem_ret = new NativeFunction(memcmp,'pointer',['pointer','pointer','int'])(m_arr_p,str_start,10)
                    console.warn("mem_ret = ",mem_ret)
                    if (mem_ret == 0x0){
                        var arr_r = [0xFF,0xFE, 0x0B, 0x77,0xC6, 0x89,0x91,0x98,0x20,0x00,0xD7,0x00,0x35,0x00,0x00,0x00,0x00,0x00]
                        Memory.writeByteArray(str_start.add(Process.pointerSize),arr_r)
                    }
                }
            },
            onLeave:function(ret){
                
            }
        })
    }
}