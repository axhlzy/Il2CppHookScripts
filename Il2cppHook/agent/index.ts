import "./include"

setImmediate(() => main())

const main = () => {
    // pause() // <--- Start it directly and comment it out
    setException()
    HookExit()
}

class PauseHelper {

    private static savedPauseCode: NativePointer = ptr(0)

    public static Pause() {
        Il2Cpp.perform(() => {
            Memory.patchCode(PauseHelper.getPauseAddress(), 0x4, (code: NativePointer) => {
                PauseHelper.savedPauseCode = code.readPointer()
                var writer: ArmWriter | Arm64Writer
                if (Process.arch == "arm64") {
                    writer = new Arm64Writer(code)
                } else {
                    writer = new ArmWriter(code)
                }
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
        let EventSystem = Il2Cpp.Domain.assembly("UnityEngine.UI").image.tryClass("UnityEngine.EventSystems.EventSystem")
        if (EventSystem != null) {
            let method = EventSystem.tryMethod("Update")
            if (method != null) return method.virtualAddress
        }
        let Image = Il2Cpp.Domain.assembly("UnityEngine.UI").image.tryClass("UnityEngine.UI.Image")
        if (Image != null) {
            let method = Image.tryMethod("UpdateMaterial")
            if (method != null) return method.virtualAddress
        }
        return Il2Cpp.Api.GameObject._SetActive
    }
}

// 参考：https://bbs.kanxue.com/thread-276495.htm
// 使用异常处理函数来实现断点的示例，只需要修改一条指令
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

            let CodeLength = 0x100
            let retPC = details.context.pc
            let ins: NativePointer = ptr(ExceptionTraceClass.savedCode.get(retPC.toString())!)
            let trampoline = Memory.alloc(CodeLength)
            Memory.protect(trampoline, CodeLength, "rwx")
            Memory.protect(retPC, 0x4, "rwx")
            retPC.writePointer(ins)

            let backAddressPointer = trampoline.add(CodeLength - 0x10)
            backAddressPointer.writePointer(retPC.add(0x4))
            LOGW(`${retPC} => ${trampoline}`)

            var writer: ArmWriter | Arm64Writer
            if (Process.arch == "arm64") {
                writer = new Arm64Writer(trampoline)
                let rel = new Arm64Relocator(retPC, writer)
                rel.readOne()
                rel.writeOne()
                writer.putLdrRegU64Ptr("x16", backAddressPointer)
                writer.putBrReg("x16")
            } else {
                LOGD("124")
                writer = new ArmWriter(trampoline)
                let rel = new ArmRelocator(retPC, writer)
                rel.readOne()
                rel.writeOne()
                writer.putLdrRegU32("r12", retPC.add(0x4).toInt32())
                writer.putBlxReg("r12")
            }
            writer.putNop()
            writer.flush()

            seeHexA(trampoline)
            details.context.pc = trampoline
            writeBP(retPC)
            return true
        })
    }

    public static writeBP = (mPtr: NativePointer) => {
        mPtr = checkPointer(mPtr)
        try {
            let ins = Instruction.parse(mPtr)
            if (!ExceptionTraceClass.is_pc_relative(ins)) {
                LOGD(`AddBP ${mPtr} | ${ins.mnemonic} ${ins.opStr}`)
            } else {
                LOGE(`TODO`)
            }
        } catch (error) {
            throw new Error(`AddBP ${mPtr} ${error}`)
        }
        Memory.patchCode(mPtr, 0x4, (code: NativePointer) => {
            ExceptionTraceClass.savedCode.set(mPtr.toString(), code.readPointer().toString())
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
            PrintStackTrace()
        }
        Java.use("java.lang.System").exit.implementation = function (code: number) {
            console.log("called java.lang.System.exit(" + code + ")")
            PrintStackTrace()
        }
    })
}

declare global {
    // you can use pause() to pause the game and resume() to resume the game
    var pause: () => void
    var resume: () => void
    var setException: (callback?: (details: ExceptionDetails) => {}) => void
    var writeBP: (mPtr: NativePointer) => void
    var testRelocate: (mPtr: NativePointer) => void
}

globalThis.pause = PauseHelper.Pause
globalThis.resume = PauseHelper.Resume
globalThis.setException = ExceptionTraceClass.setException
globalThis.writeBP = ExceptionTraceClass.writeBP

var tmp
globalThis.testRelocate = (mPtr: NativePointer) => {
    tmp = Memory.alloc(0x200)
    Memory.protect(tmp, 0x200, "rwx")
    let writer = new Arm64Writer(tmp)
    let rel = new Arm64Relocator(mPtr, writer)
    for (let i = 0; i < 0x200; i += 0x4) {
        writer.putNop()
    }

    let backAddressPointer = tmp.add(0x14)
    backAddressPointer.writePointer(ptr(0))
    backAddressPointer.writePointer(mPtr.add(0x4))

    for (let i = 0; i < 2; i++) {
        LOGW(rel.readOne())
    }

    rel.writeAll()
    writer.reset(tmp.add(0x4))
    writer.putLdrRegU64Ptr("x16", backAddressPointer)
    writer.putBrReg("x16")
    writer.putNop()
    writer.putNop()
    writer.flush()

    LOGE(`Relocate ${mPtr} => ${tmp}`)

    for (let i = 0; i < 20; i++) {
        let ins = Instruction.parse(tmp.add(i * 4))
        LOGD(`${ins.address} ${ins.mnemonic} ${ins.opStr}`)
    }

    LOGD(newLine(20))
    for (let i = 0; i < 15; i++) {
        let ins = Instruction.parse(mPtr.add(i * 4))
        LOGD(`${ins.mnemonic} ${ins.opStr}`)
    }

}