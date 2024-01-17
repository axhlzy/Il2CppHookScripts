import "./include"

setImmediate(() => main())

const main = () => {
    fixMoreVerison() // issue # 22
    // pause()
    // setException()
    // HookExit()
    TODO_OTHERS()
    // JNIHelper.Init() // Hook JNI RegisterNatives
}

function LOGCAT(msg: string) {
    Java.perform(function () {
        Java.use("android.util.Log").e("ZZZ", msg)
    })
}

const TODO_OTHERS = () => {

}

class PauseHelper {

    private static savedPauseCode: NativePointer = ptr(0)

    public static Pause() {
        Il2Cpp.perform(() => {
            Memory.patchCode(PauseHelper.getPauseAddress(), 0x4, (code: NativePointer) => {
                PauseHelper.savedPauseCode = code.readPointer()
                var writer: ArmWriter | Arm64Writer
                writer = Process.arch == "arm64" ? new Arm64Writer(code) : new ArmWriter(code)
                writer.putLabel("loop")
                writer.putBLabel("loop")
                writer.flush()
            })
        })
    }

    public static Resume() {
        Il2Cpp.perform(() => {
            Memory.patchCode(PauseHelper.getPauseAddress(), 0x4, (code: NativePointer) => {
                code.writePointer(PauseHelper.savedPauseCode)
            })
        })
    }

    public static getPauseAddress = () => {
        let EventSystem = Il2Cpp.domain.assembly("UnityEngine.UI").image.tryClass("UnityEngine.EventSystems.EventSystem")
        if (EventSystem != null) {
            let method = EventSystem.tryMethod("Update")
            if (method != null) return method.virtualAddress
        }
        let Image = Il2Cpp.domain.assembly("UnityEngine.UI").image.tryClass("UnityEngine.UI.Image")
        if (Image != null) {
            let method = Image.tryMethod("UpdateMaterial")
            if (method != null) return method.virtualAddress
        }
        return Il2Cpp.Api.GameObject._SetActive
    }
}

// 参考：https://bbs.kanxue.com/thread-276495.htm
// 使用异常处理函数来实现断点的示例，只需要修改一条指令(移植一下c版本的可以用来处理短指令hook问题)
class ExceptionTraceClass {

    // save ptr and ptr.readPointer()
    private static savedCode = new Map<string, string>()

    public static setException = (callback?: (details: ExceptionDetails) => {}) => {
        Process.setExceptionHandler((details: ExceptionDetails) => {
            if (!this.savedCode.keys.toString().includes(details.address.toString())) return false
            if (!callback) {
                LOGD(`\nCalled => ${details.type} : ${details.address}`)
                if (Process.arch == "arm64") {
                    let ctx = details.context as Arm64CpuContext
                    LOGZ(`x0: ${ctx.x0} x1: ${ctx.x1} x2: ${ctx.x2} x3: ${ctx.x3} pc: ${ctx.pc} sp: ${ctx.sp} fp: ${ctx.fp} lr: ${ctx.lr}`)
                } else if (Process.arch == "arm") {
                    let ctx = details.context as ArmCpuContext
                    LOGZ(`r0: ${ctx.r0} r1: ${ctx.r1} r2: ${ctx.r2} r3: ${ctx.r3} pc: ${ctx.pc} sp: ${ctx.sp} fp: ${ctx.r11} ip: ${ctx.r12} lr: ${ctx.lr}`)
                }
            } else {
                callback(details)
            }

            // var message = "An exception occurred: " + "\n"
            // var title = "Exception caught!"
            // var activity = Java.use("android.app.ActivityThread").currentActivity()
            // activity.runOnUiThread(function () {
            //     var builder = Java.use("android.app.AlertDialog$Builder")
            //     builder = builder.$new(activity)
            //     builder.setMessage(message).setTitle(title).setCancelable(false);
            //     builder.setPositiveButton("OK", null);
            //     var dialog = builder.create();
            //     dialog.show();
            // });

            let CodeLength = 0x100
            CodeLength ??= 0x100
            let retPC = details.context.pc
            let ins: NativePointer = ptr(ExceptionTraceClass.savedCode.get(retPC.toString())!)
            let trampoline = Memory.alloc(CodeLength)
            Memory.protect(trampoline, CodeLength, "rwx")
            Memory.protect(retPC, 0x4, "rwx")
            retPC.writePointer(ins)

            let backAddressPointer = trampoline.add(CodeLength - 0x10)
            backAddressPointer.writePointer(retPC.add(0x4))

            var writer: ArmWriter | Arm64Writer
            if (Process.arch == "arm64") {
                writer = new Arm64Writer(trampoline)
                let rel = new Arm64Relocator(retPC, writer)
                rel.readOne()
                rel.writeOne()
                writer.putLdrRegU64Ptr("x16", backAddressPointer)
                writer.putBrReg("x16")
            } else if (Process.arch == "arm") {
                writer = new ArmWriter(trampoline)
                let rel = new ArmRelocator(retPC, writer)
                rel.readOne()
                rel.writeOne()
                writer.putLdrRegU32("r12", backAddressPointer.readU32())
                writer.putBlxReg("r12")
            } else throw new Error("Not support arch")
            writer.putNop()
            writer.flush()

            seeHexA(trampoline)
            details.context.pc = trampoline
            ExceptionTraceClass.writeBP(retPC)
            return true
        })
    }

    public static writeBP = (mPtr: NativePointer) => {

        if (Process.arch == "arm") {
            LOGE("Not test arm32")
        }

        mPtr = checkPointer(mPtr)
        try {
            Instruction.parse(mPtr)
        } catch (error) {
            throw new Error(`AddBP ${mPtr} ${error}`)
        }
        if (ExceptionTraceClass.savedCode.keys.toString().includes(mPtr.toString()))
            throw new Error(`AddBP ${mPtr} already exists`)
        ExceptionTraceClass.savedCode.set(mPtr.toString(), mPtr.readPointer().toString())
        Memory.patchCode(mPtr, 0x4, (code: NativePointer) => {
            var writer: ArmWriter | Arm64Writer
            if (Process.arch == "arm64") {
                writer = new Arm64Writer(code)
            } else {
                writer = new ArmWriter(code)
            }
            writer.putBytes([0x00, 0x00, 0x00, 0x00])
            writer.flush()
        })
    }

    public static removeBP = (mPtr: NativePointer) => {
        if (ExceptionTraceClass.savedCode.keys.toString().includes(mPtr.toString()))
            ExceptionTraceClass.savedCode.delete(mPtr.toString())
    }

    public static is_pc_relative<T extends Instruction>(inst: T) {
        let l_inst = inst as unknown as Arm64Instruction | ArmInstruction
        if (l_inst.regsRead.toString().includes('pc')) {
            return true
        }
        if (l_inst.regsWritten.toString().includes('pc')) {
            return true
        }
        if (l_inst.opStr.includes('pc')) {
            return true
        }
        return false
    }
}

const HookExit = () => {

    Java.perform(function () {
        Java.use("android.app.Activity").finish.overload().implementation = function () {
            console.log("called android.app.Activity.Finish")
            PrintStackTraceJava()
        }
        Java.use("java.lang.System").exit.implementation = function (code: number) {
            console.log("called java.lang.System.exit(" + code + ")")
            PrintStackTraceJava()
        }
    })

    Il2Cpp.perform(() => {
        // UnityEngine.CoreModule UnityEngine.Application Quit(Int32) : Void
        R(Il2Cpp.domain.assembly("UnityEngine.CoreModule").image.class("UnityEngine.Application").method("Quit", 1).virtualAddress, (_srcCall: Function, arg0: NativePointer) => {
            // srcCall(arg0, arg1, arg2, arg3)
            LOGE("called UnityEngine.Application.Quit(" + arg0.toInt32() + ")")
            return ptr(0)
        })
        // UnityEngine.CoreModule UnityEngine.Application Quit() : Void
        R(Il2Cpp.domain.assembly("UnityEngine.CoreModule").image.class("UnityEngine.Application").method("Quit").virtualAddress, (_srcCall: Function) => {
            // srcCall(arg0, arg1, arg2, arg3)
            LOGE("called UnityEngine.Application.Quit()")
            return ptr(0)
        })
    })
}

/**
 *  ERROR : il2cpp: couldn't determine the Unity version, please specify it manually
 *  使用 AssetStudioGUI 确认当前Unity版本后自行修改此处 ↓
 */
function fixMoreVerison() {

    const UnityVersion = "2020.3.0f1c1"

    Il2Cpp.perform(() => {
        if (Il2Cpp.api.resolveInternalCall(allocCStr('UnityEngine.Application::get_unityVersion')).isNull()) {
            LOGW(`Couldn't determine the Unity version, Schedule set to ${UnityVersion}`)
            setTimeout(() => {
                if (Reflect.has(Il2Cpp, "unityVersion")) {
                    Reflect.deleteProperty(Il2Cpp, "unityVersion")
                    Reflect.defineProperty(Il2Cpp, "unityVersion", { value: UnityVersion })
                }
                if (Reflect.has(Il2Cpp, "unityVersionIsBelow201830")) {
                    Reflect.deleteProperty(Il2Cpp, "unityVersionIsBelow201830")
                    Reflect.defineProperty(Il2Cpp, "unityVersionIsBelow201830", { value: false })
                }
            }, 1000)
        }
    })

    // {
    //     Il2Cpp.perform(() => {
    //         setTimeout(() => {
    //             if (Il2Cpp.api.resolveInternalCall(allocCStr('UnityEngine.Application::get_unityVersion')).isNull()) {
    //                 A(Il2Cpp.api.resolveInternalCall, (args: InvocationArguments, _ctx: CpuContext, passValue: Map<PassType, any>) => {
    //                     if (args[0].readCString() == 'UnityEngine.Application::get_unityVersion') {
    //                         passValue.set("RET", allocCStr(UnityVersion))
    //                         LOGE(`Can't get UnityVersion, set to ${UnityVersion}`)
    //                         Reflect.defineProperty(Il2Cpp, "UnityVersion", {
    //                             value: UnityVersion
    //                         })
    //                     }
    //                 }, (ret, _ctx, passValue) => {
    //                     if (passValue.get("RET") != undefined) {
    //                         return new NativeCallback(function () {
    //                             return passValue.get("RET")
    //                         }, 'pointer', [])
    //                     }
    //                     return ret
    //                 })
    //             }
    //         }, 1000)
    //     })
    // }
}

/**
 * class 能正确解析， 结构体解析参数的时候需要去掉他前面的两个 pointer size
 */
// function fixFieldOffset() {
//     Reflect.deleteProperty(Il2Cpp.Field, "offset")
//     Reflect.set(Il2Cpp.Field, "offset", {
//         value: function (field: Il2Cpp.Field) {
//             let local_offset = field.offset
//             if (local_offset < 0) return -1
//             if (Process.arch == "arm") local_offset = field.offset - 8
//             if (Process.arch == "arm64") local_offset = field.offset - 16
//             return local_offset
//         }
//     })
//     A(Il2Cpp.Api.fieldGetOffset, undefined, (ret) => {
//         let local_offset: number = ret.toInt32()
//         if (local_offset < 0) return -1
//         if (Process.arch == "arm") local_offset = local_offset - 8
//         if (Process.arch == "arm64") local_offset = local_offset - 16
//         ret.replace(ptr(local_offset))
//     })
// }

declare global {
    // you can use pause() to pause the game and resume() to resume the game
    var pause: () => void
    var resume: () => void
    var setException: (callback?: (details: ExceptionDetails) => {}) => void
    var addBP: (mPtr: NativePointer) => void
    var removeBP: (mPtr: NativePointer) => void
    var HookExit: () => void
}

globalThis.pause = PauseHelper.Pause
globalThis.resume = PauseHelper.Resume
globalThis.setException = ExceptionTraceClass.setException
globalThis.addBP = ExceptionTraceClass.writeBP
globalThis.removeBP = ExceptionTraceClass.removeBP
globalThis.HookExit = HookExit
