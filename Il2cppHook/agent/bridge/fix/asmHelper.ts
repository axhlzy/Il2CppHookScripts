import { LogColor } from "../../base/enum"
import { cacheMethods } from "../../java/info"
import { formartClass } from "../../utils/formart"
import { getMethodDesFromMethodInfo } from "./il2cppM"

class ItemInfo {
    ins: Instruction
    current: NativePointer
    size: number
    title: string = ""
    info: string
    infoColor: LogColor = LogColor.C36
    extra: string = ""
    extraColor: LogColor = LogColor.C90
    private static _preCache: Set<String> = new Set<String>()
    private static _filterIns = new Array<string>('smull', 'strd', 'strh', 'sbc')

    constructor(ins: Instruction) {
        this.ins = ins
        this.current = ins.address
        this.size = ins.size
        cacheMethods()
        let currentMethod = AddressToMethodNoException(this.current)
        if (currentMethod) this.title = `${getMethodDesFromMethodInfo(currentMethod)}`
        let insStr = ins.toString()
        ItemInfo._filterIns.forEach((item) => {
            if (insStr.includes(item)) insStr = ins.address.readPointer().toString()
        })
        this.info = `${ins.address} ${insStr}`
        if (ItemInfo._preCache.has(this.current.toString()))
            this.infoColor = LogColor.C32
        this.checkExtra()
    }

    setExtra(extra: string) {
        this.extra = extra
    }

    getExtra(): string {
        return this.extra
    }

    toString(): string {
        return `${this.info}${this.extra.length == 0 ? "" : '\n\t' + this.extra}`
    }

    private checkExtra(): void {
        let filterIns = ["bl", "blx", "b", "bx", "b.w", "blx.w", "bl.w", "bne", "beq"]
        if (filterIns.includes(this.ins.mnemonic)) {
            let target = ptr(this.ins.opStr.replace("#", ""))
            ItemInfo._preCache.add(target.toString())
            // unity 方法解析
            let targetMethod = AddressToMethodNoException(target)
            if (targetMethod) {
                let localMethod = targetMethod as Il2Cpp.Method
                this.extra = `→ ${getMethodDesFromMethodInfo(targetMethod)} @ ${localMethod.handle}`
            }
            // 局部跳转方法解析
            let Offset = target.sub(this.ins.address).toInt32()
            if (Math.abs(Offset) < 0x1000) {
                this.extra = `${Offset > 0 ? '↓' : '↑'} ${Offset / p_size} ( ${ptr(Offset)} / ${Offset})`
            }
        }
    }
}

globalThis.showAsm = (mPtr: NativePointer, len: number = 40): void => {

    let currentPtr = checkPointer(mPtr)
    let asm: Instruction
    let mapInfo = new Map<NativePointer, ItemInfo>()

    while (len-- > 0) {
        asm = Instruction.parse(currentPtr)
        mapInfo.set(asm.address, new ItemInfo(asm))
        currentPtr = asm.next
    }

    mapInfo.forEach((value: ItemInfo, key: NativePointer) => {
        if (value.title.length > 0) formartClass.printTitile(value.title)
        LOG(value.info, value.infoColor)
        if (value.extra.length > 0) LOG(`\t${value.extra}`, value.extraColor)
    })
}

globalThis.showAsmSJ = (mPtr: NativePointer): void => LOGJSON(Instruction.parse(checkPointer(mPtr)))

declare global {
    var showAsm: (mPtr: NativePointer, len?: number) => void
    var showAsmSJ: (mPtr: NativePointer) => void
}

