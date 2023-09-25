import { LogColor } from "../../base/enum"
import { cacheMethods } from "../../java/info"
import { formartClass as FM } from "../../utils/formart"
import { getMethodDesFromMethodInfo } from "./il2cppM"

class ItemInfo {
    ins: Instruction
    current: NativePointer
    size: number
    title: string = ""
    info: string
    extra_class_Str: string = ''
    infoColor: LogColor = LogColor.C36
    extra_MI: Il2Cpp.Method | null = null
    extra_Str: string = ""
    extraColor: LogColor = LogColor.C90

    public static countMethod: number = -1
    private static _preCache: Set<String> = new Set<String>()
    private static _filterIns = new Array<string>('smull', 'strd', 'strh', 'sbc', 'teq')

    constructor(ins: Instruction) {
        this.ins = ins
        this.current = ins.address
        this.size = ins.size
        cacheMethods()
        let currentMethod: Il2Cpp.Method | null = AddressToMethodNoException(this.current)
        if (currentMethod) {
            let method: Il2Cpp.Method = currentMethod
            // MI means MethodInfo ; MP means MethodPointer
            this.title = `${method.class.image.assembly.name}.${method.class.name}.${getMethodDesFromMethodInfo(currentMethod)} | MI: ${method.handle} & MP: ${method.relativeVirtualAddress}`
            ++ItemInfo.countMethod
        }
        let insStr = ins.toString()
        ItemInfo._filterIns.forEach((item) => {
            if (insStr.includes(item)) insStr = `= ${ins.address.readPointer().toString()}`
        })
        this.info = `${ins.address} ${insStr}`
        if (ItemInfo._preCache.has(this.current.toString()))
            this.infoColor = LogColor.C32
        this.checkExtra()
    }

    setExtra(extra: string) {
        this.extra_Str = extra
    }

    getExtra(): string {
        return this.extra_Str
    }

    toString(): string {
        return `${this.info}${this.extra_Str.length == 0 ? "" : '\n\t' + this.extra_Str}`
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
                this.extra_MI = localMethod
                this.extra_Str = `→ ${getMethodDesFromMethodInfo(localMethod)} @ MI ${localMethod.handle} | MP ${localMethod.relativeVirtualAddress}`
                let current = `${this.current} ( ${this.current.sub(Process.findModuleByAddress(this.current)!.base)} )`
                this.extra_class_Str = `${current} | ${localMethod.class.image.assembly.name}(${localMethod.class.image.handle}).${localMethod.class.name}(${localMethod.class.handle})`
            }
            // 局部跳转方法解析
            let Offset = target.sub(this.ins.address).toInt32()
            if (Math.abs(Offset) < 0x1000) {
                this.extra_Str = `${Offset > 0 ? '↓' : '↑'} ${Offset / p_size} ( ${ptr(Offset)} / ${Offset})`
            }
        }
    }
}

class RecordScanInfo {
    start: NativePointer = ptr(0)
    end: NativePointer = ptr(0)
    extra: Array<string> = new Array<string>()

    get getSubStart(): NativePointer {
        return this.start.sub(Process.findModuleByAddress(this.start)!.base)
    }

    get getSubEnd(): NativePointer {
        return this.end.sub(Process.findModuleByAddress(this.end)!.base).sub(p_size)
    }

    set addExtra(extra: string) {
        this.extra.push(extra)
    }

}

globalThis.showAsm = (mPtr: NativePointer, len: number = 0x40, needAsm: boolean = true): void => {
    ItemInfo.countMethod = -1
    let currentPtr: NativePointer = checkPointer(mPtr)
    let recordScan: RecordScanInfo = new RecordScanInfo()
    // 记录开始位置
    recordScan.start = currentPtr
    let asm: Instruction
    let mapInfo = new Map<NativePointer, ItemInfo>()
    if (len == -1) {
        // 简洁版只扫描一个函数并记录函数调用
        while (true) {
            try {
                asm = Instruction.parse(currentPtr)
                let info = new ItemInfo(asm)
                // len == -1 的情况下只记录一个methodInfo 即返回
                if (ItemInfo.countMethod > 0) {
                    recordScan.end = currentPtr
                    break
                } else tipsCurrent(currentPtr)
                mapInfo.set(asm.address, info)
                currentPtr = asm.next
            } catch (error) {
                // LOGE(error)
                recordScan.end = currentPtr
                break
            }
        }
    } else {
        while (len-- > 0) {
            try {
                asm = Instruction.parse(currentPtr)
                mapInfo.set(asm.address, new ItemInfo(asm))
                tipsCurrent(currentPtr)
                currentPtr = asm.next
                recordScan.end = currentPtr
            } catch (error) {
                // LOGE(error)
                recordScan.end = currentPtr
                break
            }
        }
    }

    mapInfo.forEach((value: ItemInfo, key: NativePointer) => {
        // 解析的 Unity 方法名称
        if (value.title.length > 0) FM.printTitile(value.title)
        // 正常汇编代码
        if (needAsm) {
            if (value.info.indexOf('= ') != -1) {
                LOG(value.info, LogColor.C34)
            } else {
                LOG(value.info, value.infoColor)
            }
        }
        // 附加信息 (bl 偏移，以及行内 unity 方法跳转)
        if (value.extra_Str.length > 0) {
            if (needAsm) {
                LOG(`\t${value.extra_Str}`, value.extraColor)
            } else {
                if (value.extra_Str.includes('→')) {
                    LOG(`\t${value.extra_Str}`, LogColor.C36)
                    LOG(`\t\t@${value.extra_class_Str}\n`, value.extraColor)
                    recordScan.addExtra = value.extra_class_Str // 只是记录了一下调用的次数
                }
            }
        }
    })

    // 底部额外信息
    if (!recordScan.start.isNull()) {
        let ext = recordScan.extra.length == 0 ? "" : `| ${recordScan.extra.length} methods`
        let addr = `${recordScan.start} - ${recordScan.end}`
        let addrSub = `${recordScan.getSubStart} - ${recordScan.getSubEnd}`
        LOGO(`\nscan asm @ ${addr} ( ${addrSub} ) ${ext}\n`)
    }

    // 提示一下当前位置，避免看起来像卡死
    function tipsCurrent(mPtr: NativePointer) {
        if (mPtr.toInt32() % 0x100 == 0) LOGZ(`scan asm @ ${mPtr}`)
    }
}

globalThis.showAsmSJ = (mPtr: NativePointer): void => LOGJSON(Instruction.parse(checkPointer(mPtr)))
globalThis.showAsmSP = (mPtr: NativePointer): void => showAsm(mPtr, -1, false)
globalThis.showAsmSL = (mPtr: NativePointer, insCount: number = 20, ignoreError = true): void => {
    let current: NativePointer = checkPointer(mPtr)
    newLine()
    let index: number = 0
    while (true) {
        try {
            let ins = Instruction.parse(current)
            let indexStr = `[${String(++index)}]`.padEnd(6, ' ')
            LOGD(`${indexStr} ${ins.address}\t${ins.toString()}`)
            current = ins.next
            if (index == insCount) break
        } catch (error) {
            if (!ignoreError) {
                throw error
            } else {
                ++index
                LOGE(error)
                continue
            }
        }
    }
    newLine()
}

declare global {
    // showAsm : with il2cpp MethodInfo Name and asm
    var showAsm: (mPtr: NativePointer, len?: number, needAsm?: boolean) => void
    // showAsm : alias LOGJSON(Instruction.parse(checkPointer(mPtr)))
    var showAsmSJ: (mPtr: NativePointer) => void
    // showAsm : with only il2cpp MethodInfo Name
    var showAsmSP: (mPtr: NativePointer) => void
    // showAsm : with only asm
    var showAsmSL: (mPtr: NativePointer, len?: number) => void
}