import { getMethodDesFromMethodInfo } from "./il2cppM"

export class AsmParser {

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



globalThis.showAsm = (mPtr: NativePointer, len: number = 40): void => {

    // AddressToMethodNoException()
    let currentPtr = checkPointer(mPtr)
    let asm: Instruction
    let arrayStrs = new Array<string>()
    let arrayRecords = new Array<NativePointer>()
    while (len-- > 0) {
        asm = Instruction.parse(currentPtr)
        arrayStrs.push(`${asm.address} ${asm.toString()}`)
        let moreInfo: string = getMoreInfo(asm)
        if (moreInfo.length != 0) arrayStrs.push(moreInfo)
        currentPtr = asm.next
    }
    arrayStrs.forEach((str, index) => {
        let b = arrayRecords.map((record, index) => {
            return String(record)
        }).includes(String(asm.address))

        if (b) {
            LOGW(str)
        } else {
            str.startsWith("0x") ? LOGD(str) : LOGZ(str)
        }
    })

    function getMoreInfo(asm: Instruction): string {
        let filterIns = ["bl", "blx", "b", "bx", "b.w", "blx.w", "bl.w", "bne"]
        if (filterIns.includes(asm.mnemonic)) {
            let target = ptr(asm.opStr.replace("#", ""))
            arrayRecords.push(target)
            // unity 方法解析
            let targetMethod = AddressToMethodNoException(target)
            if (targetMethod) return `\ttargetMethod: ${getMethodDesFromMethodInfo(targetMethod)}`
            // 局部跳转方法解析
            let Offset = target.sub(asm.address).toInt32()
            if (Math.abs(Offset) < 0x1000) {
                return `\t ${Offset > 0 ? '↓' : '↑'} ${ptr(Offset)} / ${Offset}`
            }
            return ""
        }
        return ""
    }

}

globalThis.showAsmSJ = (mPtr: NativePointer): void => LOGJSON(Instruction.parse(checkPointer(mPtr)))

declare global {
    var showAsm: (mPtr: NativePointer, len?: number) => void
    var showAsmSJ: (mPtr: NativePointer) => void
}

