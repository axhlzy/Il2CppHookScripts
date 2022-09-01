class AsmParser {

    private current: NativePointer = ptr(0)
    private Offset: number = 0
    private len: number = 0
    private ret: Instruction | ArmInstruction | Arm64Instruction | null = null

    constructor(mPtr: NativePointer, len: number = 20) {
        if (mPtr.isNull()) throw new Error("Current mPtr can not be null")
        this.current = mPtr
        this.len = len
        try {
            Instruction.parse(this.current)
        } catch (error) { throw error }
    }

    next(): Instruction | X86Instruction | ArmInstruction | Arm64Instruction | null {
        if (this.len <= 0 || this.Offset > this.len) return null
        while (!this.current.isNull()) {
            try {
                this.ret = Instruction.parse(this.current.add(this.Offset))
            } catch (error) {
                this.ret = null
            }
            // arm32 [× thumb, √ arm]  / arm64
            this.Offset += Process.pageSize
        }
        return this.ret
    }

    value(): Instruction | ArmInstruction | Arm64Instruction {
        return this.ret as Instruction | ArmInstruction | Arm64Instruction
    }

    tostring(): string {
        if (this.ret) return this.ret.toString()
        else return ""
    }





}



const showAsm = (mPtr: NativePointer, len: number = 20): void => {
    let asmP = new AsmParser(checkPointer(mPtr), len)
    while (asmP.next()) {
        LOGD(asmP.toString())
    }
}

export { showAsm }

declare global {
    var showAsm: (mPtr: NativePointer, len?: number) => void
}

globalThis.showAsm = showAsm
