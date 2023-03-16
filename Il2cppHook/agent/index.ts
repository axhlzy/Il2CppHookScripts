import "./include"

setImmediate(() => main())

const main = () => {
    // pause() // <--- Start it directly and comment it out
    setException()
}

class startUpClass {

    private static savedPauseCode: NativePointer = ptr(0)

    public static Pause() {
        Il2Cpp.perform(() => {
            Memory.patchCode(startUpClass.getPauseAddress(), 0x4, (code: NativePointer) => {
                startUpClass.savedPauseCode = code.readPointer()
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
            Memory.patchCode(startUpClass.getPauseAddress(), 0x4, (code: NativePointer) => {
                code.writePointer(startUpClass.savedPauseCode)
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

class exceptionClass {

    private static savedSVCCode: NativePointer = ptr(0)

    public static setException = () => {
        Process.setExceptionHandler((details: ExceptionDetails) => {
            // details.context.pc.w
            console.log(details)
            return true
        })
    }

    public static writeBP = (mPtr: NativePointer) => {
        mPtr = checkPointer(mPtr)
        try {
            let ins = Instruction.parse(mPtr)
            LOGD(`AddBP ${mPtr} ${ins.mnemonic} ${ins.opStr}`)
        } catch (error) {
            throw new Error(`AddBP ${mPtr} ${error}`)
        }
        Memory.patchCode(mPtr, 0x4, (code: NativePointer) => {
            exceptionClass.savedSVCCode = code.readPointer()
            var writer: ArmWriter | Arm64Writer
            if (Process.arch == "arm64") {
                writer = new Arm64Writer(code)
                // svc #0
                writer.putBytes([0xd4, 0x00, 0x00, 0x01])
            } else {
                writer = new ArmWriter(code)
                // swi #0
                writer.putBytes([0xef, 0x00, 0x00, 0x00])
            }
            writer.flush()
        })
    }

}



declare global {
    // you can use pause() to pause the game and resume() to resume the game
    var pause: () => void
    var resume: () => void
    var setException: () => void
    var writeBP: (mPtr: NativePointer) => void
}

globalThis.pause = startUpClass.Pause
globalThis.resume = startUpClass.Resume
globalThis.setException = exceptionClass.setException
globalThis.writeBP = exceptionClass.writeBP