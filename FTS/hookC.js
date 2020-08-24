/*
* Author: lzy <axhlzy@live.cn>
* HomePage: https://github.com/axhlzy
* CreatedTime: 2020/8/21 10:20
* Describe:用来Hook一些关键C函数，快速的找到反调试的点
* */

var filter_str = ["xposed","android_server","frida","substrate","exposed","status","proc","cmdline","netstat","TracerPid"]
var filter_port = ["27042","23046","27043","5D8A"]
var temp = filter_str.concat(filter_port)

var filter_sprintf = temp
var filter_fgets = temp
var filter_strstr = temp
var filter_strcmp = temp
var filter_strlen = temp
var filter_strncpy = temp
var filter_fopen = temp
var filter_atoi = filter_port

function hook(){

    call()
    NOP_KILL()

    //RealCall
    //可以拆分开多次hook，不建议一次性hook太多函数

    function call(){
        
        // FIND_BY_STR()
        // PTRACE()
        FIND_THREAD_KILL()

    }

    //通过关键词的配合C函数查找
    function FIND_BY_STR(){
        find_sprintf()
        find_fgets()
        find_strstr()
        find_strcmp()
        find_strlen()
        find_strncpy()
        find_atoi()
        find_fopen()
    }

    //查找进程开始/结束
    function FIND_THREAD_KILL(){
        find_kill()
        find_raise()
        find_pthread_create()
        // find_fork()
    }

    //查找系统调用
    function FIND_SYSCALL(){
        find_syscall()
    }
    
    //内存相关
    function ABOUT_MEMORY(){
        find_mmap()
        find_calloc()
    }

    //程序附加检测
    function PTRACE(){
        //查找ptrace
        find_ptrace()
        //反调试ptrace
        anti_fgets()
    }

    //日志打印
    function SHOW_LOGGER(){
        show_android_log_print()
    }

    //linker断点
    function Linker_Points(){
        hook_call_array()
    }
}

setImmediate(hook)

function find_sprintf(){
    //int sprintf(char *str, const char *format, ...)
    //C 库函数 int sprintf(char *str, const char *format, ...) 发送格式化输出到 str 所指向的字符串
    Interceptor.attach(Module.findExportByName(null,"sprintf"),{
        onEnter:function(args){
            var isFound = false
            this.arg0 = args[0]
            this.arg1 = args[1]
            this.arg2 = args[2]
            if(filter_sprintf.length != 0){
                filter_sprintf.forEach(function(item){
                    if(args[0].readCString().indexOf(item)!=-1 || args[1].readCString().indexOf(item)!=-1){
                        isFound = true
                    }
                })
            }
            this.isFound = isFound
        },
        onLeave:function(ret){
            if(this.isFound){
                console.warn("\n[*]\t\x1b[0mCalled sprintf in onLeave at "+ this.context.lr+"\x1b[0m")
                console.log("\x1b[96mint "+ret.toInt32()+
                    " = sprintf('"+this.arg0.readCString().replace(/\s+/g,"")+"','"+
                    this.arg1.readCString()+"','"+this.arg2.toInt32()+"')\x1b[0m")
                printBKA(this.context)
            }
        }
    })
}

function find_fgets(){
    //char *fgets(char *str, int n, FILE *stream)
    //从指定的流 stream 读取一行，并把它存储在 str 所指向的字符串内
    
    Interceptor.attach(Module.findExportByName(null,"fgets"),{
        onEnter:function(args){
            var isFound = false
            this.arg0 = args[0]
            this.arg1 = args[1]
            this.arg2 = args[2]
            if(filter_fgets.length != 0){
                filter_fgets.forEach(function(item){
                    if(args[0].readCString().indexOf(item)!=-1){
                        isFound = true
                    }
                })
            }
            this.isFound = isFound
        },
        onLeave:function(ret){
            try{
                if(this.isFound){
                    console.warn("\n[*]\t\x1b[0mCalled fgets in onLeave at "+ this.context.lr+"\x1b[0m")
                    console.log("\x1b[96mChar* "+ret.readCString().replace(/\s+/g,"")+
                        " = fgets('"+this.arg0.readCString().replace(/\s+/g,"")+"','"+
                        this.arg1.toInt32()+"','"+this.arg2+"')\x1b[0m")
                    printBKA(this.context)
                }
            }catch(e){}
        }
    })
}

function find_strstr(){
    //char *strstr(const char *haystack, const char *needle)
    //C 库函数 char *strstr(const char *haystack, const char *needle) 在字符串 haystack 中查找第一次出现字符串 needle 的位置，不包含终止符 '\0'



    Interceptor.attach(Module.findExportByName(null,"strstr"),{
        onEnter:function(args){
            var isFound = false
            this.arg0 = args[0]
            this.arg1 = args[1]
            if(filter_strstr.length != 0 ){
                filter_strstr.forEach(function(item){
                    if(args[0].readCString().indexOf(item)!=-1 || args[1].readCString().indexOf(item)!=-1){
                        isFound = true
                    }
                })
            }
            this.isFound = isFound
        },
        onLeave:function(ret){
            try{
                if(this.isFound){
                    console.warn("\n[*]\t\x1b[0mCalled strstr in onLeave at "+ this.context.lr+"\x1b[0m")
                    console.log("\x1b[96mint "+ret.toInt32()+
                        " = strstr('"+this.arg0.readCString().replace(/\s+/g,"")+"','"+this.arg1.readCString().replace(/\s+/g,"")+"')\x1b[0m")
                    printBK(this.context)
                }
            }catch(e){}
        }
    })
}

function find_strcmp(){
    //int strcmp(const char *str1, const char *str2)
    //C 库函数 把 str1 所指向的字符串和 str2 所指向的字符串进行比较

    Interceptor.attach(Module.findExportByName(null,"strcmp"),{
        onEnter:function(args){
            var isFound = false
            this.arg0 = args[0]
            this.arg1 = args[1]
            if(filter_strcmp.length != 0){
                filter_strcmp.forEach(function(item){
                    if(args[0].readCString().indexOf(item)!=-1 || args[1].readCString().indexOf(item)!=-1){
                        isFound = true
                    }
                })
            }
            this.isFound = isFound
        },
        onLeave:function(ret){
            if(this.isFound){
                console.warn("\n[*]\t\x1b[0mCalled strcmp in onLeave at "+ this.context.lr+"\x1b[0m")
                console.log("\x1b[96mint "+ret.toInt32()+" = strcmp('"+this.arg0.readCString()+"','"+this.arg1.readCString()+"')\x1b[0m")
                printBKA(this.context)
            }
        }
    })
}

function find_strlen(){

    //size_t strlen(const char *str)
    //C 库函数 size_t strlen(const char *str) 计算字符串 str 的长度，直到空结束字符，但不包括空结束字符

    Interceptor.attach(Module.findExportByName(null,"strlen"),{
        onEnter:function(args){
            var isFound = false
            this.isFound = isFound
            this.arg0 = args[0]
            if(filter_strlen.length != 0){
                filter_strlen.forEach(function(item){
                    if(args[0].readCString().indexOf(item)!=-1){
                        isFound = true
                    }
                })
                this.isFound = isFound
            }
        },
        onLeave:function(ret){
            if(this.isFound){
                console.warn("\n[*]\t\x1b[0mCalled strlen in onLeave at "+ this.context.lr+"\x1b[0m")
                console.log("\x1b[96mint "+ret.toInt32()+" = strlen('"+this.arg0.readCString()+"')\x1b[0m")
                printBK(this.context)
            }
        }
    })
}

function find_strncpy(){
    //size_t strlen(const char *str)
    //C 库函数 size_t strlen(const char *str) 计算字符串 str 的长度，直到空结束字符，但不包括空结束字符

    Interceptor.attach(Module.findExportByName(null,"strncpy"),{
        onEnter:function(args){
            var isFound = false
            this.arg0 = args[0].readCString()
            this.arg1 = args[1].readCString()
            this.arg2 = args[2].toInt32()
            if(filter_strncpy.length != 0){
                filter_strncpy.forEach(function(item){
                    if(args[0].readCString().indexOf(item)!=-1 || args[1].readCString().indexOf(item)!=-1){
                        isFound = true
                    }
                })
            }                
            this.isFound = isFound
        },
        onLeave:function(ret){
            if(this.isFound){
                console.warn("\n[*]\t\x1b[0mCalled strncpy in onLeave at "+ this.context.lr+"\x1b[0m")
                console.log("\x1b[96mint'"+ret.readCString()+"' = strncpy('"+this.arg0+"','"+this.arg1+"',"+this.arg2+")\x1b[0m")
                printBK(this.context)
            }
        }
    })
}

function find_kill(){
    //int kill(pid_t pid, int sig)
    //函数有两个参数，一个是进程号，一个是信号 (int ret = kill(pid, SIGKILL))
    //SIGKILL的值参考signal.h的定义

    // Interceptor.attach(Module.findExportByName(null,"kill"),{
    //     onEnter:function(args){
    //         this.arg0 = args[0]
    //         this.arg1 = args[1]
    //     },
    //     onLeave:function(ret){
    //         console.warn("\n[*]\t\x1b[0mCalled kill in onLeave at "+ this.context.lr+"\x1b[0m")
    //         console.log("\x1b[96mint "+ret.toInt32()+" = kill("+this.arg0.toInt32()+","+this.arg1.toInt32()+")\x1b[0m")
    //         printBKA(this.context)
    //     }
    // })

    //以上方法线程结束的详细堆栈打印可能出现frida断开的情况,用一下replace的方式nop掉
    Interceptor.replace(new NativeFunction(Module.findExportByName(null,"kill"),'void', ['int','int']), new NativeCallback(function (pid,SIGKILL) {
        console.warn("\n[*]\t\x1b[0mCalled kill in replace at "+ this.context.lr+"\x1b[0m")
        console.log("\x1b[96mint "+0+" = kill("+pid+","+Convert_Sig(SIGKILL)+")\x1b[0m")
        printBKA(this.context)
        return 0
    }, 'int', ['int','int']));
}

function find_raise(){

    Interceptor.replace(new NativeFunction(Module.findExportByName(null,"raise"),'void', ['int']), new NativeCallback(function (sig) {
        console.warn("\n[*]\t\x1b[0mCalled raise in replace at "+ this.context.lr+"\x1b[0m")
        console.log("\x1b[96mint "+0+" = raise("+Convert_Sig(sig)+")\x1b[0m")
        printBKA(this.context)
        return 0
    }, 'int', ['int']));
}

function find_pthread_create(){

    //int pthread_create(pthread_t *tidp,const pthread_attr_t *attr,void *(*start_rtn)(void*),void *arg)
    Interceptor.attach(Module.findExportByName(null,"pthread_create"),{
        onEnter:function(args){
            this.arg0 = args[0]
            this.arg1 = args[1]
            this.arg2 = args[2]
            this.arg3 = args[3]
        },
        onLeave:function(ret){
            console.warn("\n[*]\t\x1b[0mCalled pthread_create in onLeave at "+ this.context.lr+"\x1b[0m")
            console.log("\x1b[96mint "+ret.toInt32()+" = pthread_create("+this.arg0+","+this.arg1+","+this.arg2+","+this.arg3+")\x1b[0m")
            printBK(this.context)
        }
    })
}

function find_ptrace(){
    // int ptrace(int request, int pid, int addr, int data)
    //request:决定了系统调用的功能
    //pid:目标进程的ID
    //addr:目标进程的地址值
    //data:作用则根据request的不同而变化，待读写的数据
    //https://blog.csdn.net/life_liver/article/details/8554097
    Interceptor.attach(Module.findExportByName(null,"ptrace"),{
        onEnter:function(args){
            this.arg0 = args[0].toInt32()
            this.arg1 = args[1].toInt32()
            this.arg2 = args[2]
            this.arg3 = args[3]
        },
        onLeave:function(ret){
            console.warn("\n[*]\t\x1b[0mCalled ptrace in onLeave at "+ this.context.lr+"\x1b[0m")
            console.log("\x1b[96mint "+ret.toInt32()+" = ptrace("+convert(this.arg0)+","+this.arg1+","+this.arg2+","+this.arg3+")\x1b[0m")
            printBKA(this.context)
        }
    })

    function convert(request){
       switch(request){
            case 0:
                return "PTRACE_TRACEME"
            case 1:
                return "PTRACE_PEEKTEXT"
            case 2:
                return "PTRACE_PEEKDATA"
            case 3:
                return "PTRACE_PEEKUSR"
            case 4:
                return "PTRACE_POKETEXT"
            case 5:
                return "PTRACE_POKEDATA"
            case 6:
                return "PTRACE_POKEUSR"
            case 7:
                return "PTRACE_CONT"
            case 8:
                return "PTRACE_KILL"
            case 9:
                return "PTRACE_SINGLESTEP"
            case 16:
                return "PTRACE_ATTACH"
            case 17:
                return "PTRACE_DETACH"
            case 24:
                return "PTRACE_SYSCALL"
            case 0x4200:
                return "PTRACE_SETOPTIONS"
            case 0x4201:
                return "PTRACE_GETEVENTMSG"
            case 0x4202:
                return "PTRACE_GETSIGINFO"
            case 0x4203:
                return "PTRACE_GETSIGINFO"
            case 0x4204:
                return "PTRACE_GETREGSET"
            case 0x4205:
                return "PTRACE_SETREGSET"
            case 0x4206:
                return "PTRACE_SEIZE"
            case 0x4207:
                return "PTRACE_INTERRUPT"
            case 0x4208:
                return "PTRACE_LISTEN"
            case 0x4209:
                return "PTRACE_PEEKSIGINFO"
       }
    }
}

function find_fopen(){
    //FILE *fopen(const char *filename, const char *mode)
    //filename -- 这是 C 字符串，包含了要打开的文件名称
    //mode -- 这是 C 字符串，包含了文件访问模式

    Interceptor.attach(Module.findExportByName(null,"fopen"),{
        onEnter:function(args){
            var isFound = false
            this.arg0 = args[0].readCString()
            this.arg1 = args[1].readCString()
            if(filter_fopen.length != 0){
                filter_fopen.forEach(function(item){
                    if(args[0].readCString().indexOf(item)!=-1){
                        isFound = true
                    }
                })
            }
            this.isFound = isFound
        },
        onLeave:function(ret){
            if(this.isFound){
                console.warn("\n[*]\t\x1b[0mCalled fopen in onLeave at "+ this.context.lr+"\x1b[0m")
                console.log("\x1b[96m"+ret+" = fopen('"+this.arg0+"','"+this.arg1+"')\x1b[0m")
                // console.log("args[0]:"+args[0]+"\t"+"args[1]:"+args[1])
                printBK(this.context)
            }
        }
    })
}

function find_mmap(){
    //void* mmap(void* start,size_t length,int prot,int flags,int fd,off_t offset)
    //一个文件或者其它对象映射进内存
    //start：映射区的开始地址，设置为0时表示由系统决定映射区的起始地址
    //length：映射区的长度，长度单位是以字节为单位，不足一内存页按一内存页处理
    //prot：期望的内存保护标志（读写状态）{PROT_EXEC/PROT_READ/PROT_WRITE/PROT_NONE}
    //flags：指定映射对象的类型，映射选项和映射页是否可以共享
    // #define PROT_READ 0x1
    // #define PROT_WRITE 0x2
    // #define PROT_EXEC 0x4
    // #define PROT_SEM 0x8
    // #define PROT_NONE 0x0
    Interceptor.attach(Module.findExportByName(null,"mmap"),{
        onEnter:function(args){
            this.arg0 = args[0]
            this.arg1 = args[1].toInt32()
            this.arg2 = args[2].toInt32()
            this.arg3 = args[3].toInt32()
            this.arg4 = args[4]
        },
        onLeave:function(ret){
            console.warn("\n[*]\t\x1b[0mCalled mmap in onLeave at "+ this.context.lr+"\x1b[0m")
            console.log("\x1b[96m"+ret+" = mmap("+this.arg0+","+this.arg1+","+this.arg2+","+this.arg3+","+this.arg4+")\x1b[0m")
            printBK(this.context)
        }
    })

    //int munmap(void *start, size_t length)
    //解除内存映射
    Interceptor.attach(Module.findExportByName(null,"munmap"),{
        onEnter:function(args){
            this.args0 = args[0]
            this.args1 = args[1]
        },
        onLeave:function(ret){
            console.warn("\n[*]\t\x1b[0mCalled munmap in onLeave at "+ this.context.lr+"\x1b[0m")
            console.log("\x1b[96m"+ret.toInt32()+" = munmap("+this.args0+","+this.args1.toInt32()+")\x1b[0m")
            printBK(this.context)
        }
    })
}

function find_calloc(){
    //void *calloc(size_t nitems, size_t size)
    //C 库函数 void *calloc(size_t nitems, size_t size) 分配所需的内存空间，并返回一个指向它的指针
    //malloc 和 calloc 之间的不同点是:malloc 不会设置内存为零，而 calloc 会设置分配的内存为零

   Interceptor.attach(Module.findExportByName(null,"calloc"),{
        onEnter:function(args){
            this.arg0 = args[0].toInt32()
            this.arg1 = args[1].toInt32()
        },
        onLeave:function(ret){
            if(this.arg1 > 1024*4){
                console.warn("\n[*]\t\x1b[0mCalled calloc in onLeave at "+ this.context.lr+"\x1b[0m")
                console.log("\x1b[96mint "+ret+" = calloc("+this.arg0+","+this.arg1+")\x1b[0m")
                printBKA(this.context)
            }
        }
    })
}

function find_atoi(){
    //int atoi(const char *str)
    //C 库函数 int atoi(const char *str) 把参数 str 所指向的字符串转换为一个整数（类型为 int 型）

    Interceptor.attach(Module.findExportByName(null,"atoi"),{
        onEnter:function(args){
            var isFound = false
            this.arg0 = args[0]
            if(filter_atoi.length != 0){
                filter_atoi.forEach(function(item){
                    if(args[0].readCString().indexOf(item)!=-1){
                        isFound = true
                    }
                })
            }
            this.isFound = isFound
        },
        onLeave:function(ret){
            if(this.isFound){
                console.warn("\n[*]\t\x1b[0mCalled atoi in onLeave at "+ this.context.lr+"\x1b[0m")
                console.log("\x1b[96mint "+ret.toInt32()+" = atoi('"+this.arg0.readCString()+"')\x1b[0m")
                printBKA(this.context)
            }
        }
    })
}

function find_fork(){
    //pid_t fork(void)
    //fork()函数通过系统调用创建一个与原来进程几乎完全相同的进程
    //一个进程调用fork()函数后，系统先给新的进程分配资源，例如存储数据和代码的空间。然后把原来的进程的所有值都复制到新的新进程中
    Interceptor.attach(Module.findExportByName(null,"fork"),{
        onEnter:function(args){
        },
        onLeave:function(ret){
            console.warn("\n[*]\t\x1b[0mCalled fopen in onLeave at "+ this.context.lr+"\x1b[0m")
            console.log("\x1b[36;01mint "+ret.toInt32()+" = fork()\x1b[0m")
            printBKA(this.context)
        }
    })
}

function find_syscall(){
    Interceptor.attach(Module.findExportByName(null,"syscall"),{
        onEnter:function(args){
            this.args0 = args[0].toInt32()
        },
        onLeave:function(ret){
            console.warn("\n[*]\t\x1b[0mCalled syscall in onLeave at "+ this.context.lr+"\x1b[0m")
            console.log("\x1b[36;01mint "+ret.toInt32()+" = syscall("+this.args0+")\x1b[0m")
            printBKA(this.context)
        }
    })
}

function printBK(ctx){
    console.log("\x1b[36m-------Backtrace-------\n"+
                Thread.backtrace(ctx,Backtracer.FUZZY)
                    .filter(function(value,index){return index<4})
                    .map(DebugSymbol.fromAddress)
                    .join("\n")+"\x1b[0m")
}

function printBKA(ctx){
    console.log("\x1b[36m-------Backtrace-------\n"+
                Thread.backtrace(ctx,Backtracer.ACCURATE)
                    .map(DebugSymbol.fromAddress)
                    .join("\n")+"\x1b[0m")
}

function Convert_Sig(SIGKILL){
    switch(SIGKILL){
        case 1:
            return "SIGHUP"
        case 2:
            return "SIGINT"
        case 3:
            return "SIGQUIT"
        case 4:
            return "SIGILL"
        case 5:
            return "SIGTRAP"
        case 6:
            return "SIGABRT/SIGIOT"
        case 7:
            return "SIGBUS"
        case 8:
            return "SIGFPE"
        case 9:
            return "SIGKILL"
        case 10:
            return "SIGUSR1"
        case 11:
            return "SIGSEGV"
        case 12:
            return "SIGUSR2"
        case 13:
            return "SIGPIPE"
        case 14:
            return "SIGALRM"
        case 15:
            return "SIGTERM"
        case 16:
            return "SIGSTKFLT"
        case 17:
            return "SIGCHLD"
        case 18:
            return "SIGCONT"
        case 19:
            return "SIGSTOP"
        case 20:
            return "SIGTSTP"
        case 21:
            return "SIGTTIN"
        case 22:
            return "SIGTTOU"
        case 23:
            return "SIGURG"
        case 24:
            return "SIGXCPU"
        case 25:
            return "SIGXFSZ"
        case 26:
            return "SIGVTALRM"
        case 27:
            return "SIGPROF"
        case 28:
            return "SIGWINCH"
        case 29:
            return "SIGIO"
        case 30:
            return "SIGPWR"
        case 31:
            return "SIGUNUSED/SIGSYS"
        case 32:
            return "SIGSWI/__SIGRTMIN"
    }
}

function hook_dlopen() {
    var soName = "libc.so"
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
                    hook()
                }
            }
        })
    }
}

function show_android_log_print(){
    //int __android_log_print(int prio, const char* tag, const char* fmt, ...)
    var __android_log_print = Module.findExportByName("liblog.so","__android_log_print")
    console.log("Hook __android_log_print at "+__android_log_print)
    Interceptor.attach(__android_log_print,{
        onEnter: function (args) {
            var level = ""
            var level_i = parseInt(args[0])
            if(level_i == 0){
                level = "ANDROID_LOG_UNKNOWN"
            }else if(level_i == 1){
                level = "ANDROID_LOG_DEFAULT"
            }else if(level_i == 2){
                level = "ANDROID_LOG_VERBOSE"
            }else if(level_i == 3){
                level = "ANDROID_LOG_DEBUG"
            }else if(level_i == 4){
                level = "ANDROID_LOG_INFO"
            }else if(level_i == 5){
                level = "ANDROID_LOG_WARN"
            }else if(level_i == 6){
                level = "ANDROID_LOG_ERROR"
            }else if(level_i == 7){
                level = "ANDROID_LOG_FATAL"
            }else if(level_i == 8){
                level = "ANDROID_LOG_SILENT"
            }
            try{
                if(level_i==5){
                    console.warn(level+"\t"+args[1].readCString()+"\t"+args[2].readCString())
                }else if(level_i > 5){
                    console.error(level+"\t"+args[1].readCString()+"\t"+args[2].readCString())
                }else{
                    console.log(level+"\t"+args[1].readCString()+"\t"+args[2].readCString()+"\t"+args[3].toInt32())
                }
            }catch(e){
                //变长参数类型，以及长度不确定，导致异常
                // console.error(e)
            }
        },
        onLeave:function(ret){
            if(false){
                printBK(this.context)
            }
        }
    })
}

function hook_call_array(){
    //int __android_log_print(int prio, const char* tag, const char* fmt, ...)
    var linker = Process.findModuleByName("linker")

    var call_array = null

    linker.enumerateSymbols().forEach(function(item){
        if(item.name.indexOf("call_array")!=-1){
            console.log(JSON.stringify(item))
            call_array = item.address
        }
    })

    Interceptor.attach(call_array,{
        onEnter: function (args) {
            try{
                console.log("\n"+args[0].readCString()+"\t"+
                args[1]+"\t"+
                args[2].toInt32()+"\t"+
                args[3]+"\t"+
                args[4])
            }catch(e){}
        },
        onLeave:function(ret){
           
        }
    })
}

function anti_fgets() {
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

function NOP_KILL(){

    try{
        Interceptor.replace(new NativeFunction(Module.findExportByName(null,"kill"),'void', ['int','int']), new NativeCallback(function (pid,SIGKILL) {
       
        }, 'void', ['int','int']));
    }catch(e){}
    
}
