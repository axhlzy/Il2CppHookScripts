import { soName } from "../../base/globle"
import { filterDuplicateOBJ } from "../../utils/common"

enum breakPointsType {
    version_old = 0,
    version_new = 1
}

export { }

setImmediate(() => {

    let localFunction = () => {
        const dlopen = Module.findExportByName(null, "dlopen")
        const android_dlopen_ext = Module.findExportByName(null, "android_dlopen_ext")
        const callback: InvocationListenerCallbacks = {
            onEnter: function (args) {
                this.path = args[0].readCString()!
            },
            onLeave: function () {
                if (filterDuplicateOBJ(this.path, 1) != -1) {
                    globalThis.soAddr = Module.findBaseAddress(soName)!
                    // Il2Cpp.perform(() => onLoad(this.path))
                    onSoLoad(this.path)
                }
            }
        }
        if (dlopen != null) Interceptor.attach(dlopen, callback)
        if (android_dlopen_ext != null) Interceptor.attach(android_dlopen_ext, callback)
    }

    // localFunction() // frida -U -f xxx -l ../_U_func.js 可能导致崩溃，故不使用

})

const onSoLoad = (soPath: string) => {
    // LOGD(soPath)
    try {
        if (soPath.indexOf(soName) != -1) onIl2cppInit()
    } catch { }
}

// @ Editor\Data\il2cpp\libil2cpp\il2cpp-api.cpp
// int il2cpp_init(const char* domain_name)
function onIl2cppInit() {
    try {
        Interceptor.attach(Module.findExportByName(soName, 'il2cpp_init')!, {
            onEnter(this: InvocationContext, _args: InvocationArguments) {
                // LOGE(`onEnter il2cpp_init('${_args[0].readCString()}')`)
            },
            onLeave(this: InvocationContext, _retval: InvocationReturnValue) {
                dowork() // 初始化完成之后再干活儿，避免使用 Il2Cpp.perform
            }
        })
    } catch (error) {
        // LOGE(error)
    }
}

// arrayAddr 和 arrayName 建议从 printCurrentMethods() 获得
var arrayAddr: string[] =
    []

var arrayName: string[] =
    []


function dowork() {

    if (arrayAddr.length > 0 && arrayName.length > 0) {
        // breakPoints()
        // Il2Cpp.perform(() => { B('Application') })
        // HookPlayerPrefs()
        // ...
    }

    function breakPoints(type: breakPointsType = breakPointsType.version_old) {

        switch (type) {
            case breakPointsType.version_old:
                version_old()
                break
            case breakPointsType.version_new:
                version_new()
                break
            default:
                throw new Error("breakPointsType is error")
        }

        // 老版本写法
        function version_old() {
            const maxCallTime: number = 10
            const soAddr: NativePointer = Module.findBaseAddress(soName)!

            var times = new Map<string, number>()
            for (var t = 0; t < arrayAddr.length; t++) times.set(arrayName[t], 1)
            // console.log(JSON.stringify(times))

            LOGZ(`\n${getLine(45)}`)
            Java.perform(function () {
                arrayAddr.map((addr: string) => <NativePointer>soAddr.add(addr))
                    .forEach((mPtr: NativePointer, index, _array: NativePointer[]) => {
                        LOGZ(`\n[${index}] Attached :${<NativePointer>mPtr} (${<NativePointer>mPtr.sub(soAddr)}) <--- ${<string>arrayName[index]}`)
                        funcTmp(<NativePointer>mPtr, <string>arrayName[index])
                    })
                newLine()
            })

            function funcTmp(mPtr: NativePointer, funcName: string) {
                try {
                    Interceptor.attach(mPtr, {
                        onEnter: function (this: InvocationContext, args: InvocationArguments) {
                            // PrintStackTraceN(this.context)
                            let cTime = times.get(funcName)!
                            times.set(funcName, cTime + 1)
                            if (cTime < maxCallTime) {
                                let exp: string
                                try {
                                    let lr = (<ArmCpuContext>this.context).lr
                                    let md = Process.findModuleByAddress(lr)!
                                    let lrSub = lr.sub(md.base == null ? 0 : md.base)
                                    exp = ` | ${lrSub} @ ${md.name}`
                                } catch (error) {
                                    exp = ``
                                }
                                LOGD(`called : ${funcName}  ----- addr : ${mPtr.sub(soAddr)} ${exp} \n`)
                            }
                        }
                    })
                } catch (e) { LOGE(e) }
            }
        }

        // Address to MethodPointer,then hook
        function version_new() {
            Il2Cpp.perform(() => arrayAddr.forEach((addr: string, _index: number) => b(AddressToMethod(ptr(addr)).handle)))
        }
    }
}