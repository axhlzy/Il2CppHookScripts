export { }

declare global {
    var patch: Function
    var watch: (mPtr: NativePointer) => void
    var watchDisabled: Function
    var memScanTest: Function
    var stalkerTest: Function
}

// patchTest
globalThis.patch = (mPtr: NativePointer, size: number = 1) => {
    console.log('patch')
    mPtr = checkPointer(mPtr)
    Memory.patchCode(mPtr, Process.pageSize * size, (code: NativePointer) => {
        LOGD(code)
        let writer = new ArmWriter(code)
        writer.putLabel('start')
        writer.putNop()
        writer.putCallAddressWithArguments(Module.findExportByName("libil2cpp.so", "il2cpp_string_new")!, ['r10', 0x10])
        LOGD(writer.base + " " + writer.pc + " " + writer.offset + " " + writer.code)
        writer.putBlxReg('lr')
        writer.putBCondLabel("eq", 'start')
        writer.flush()
    })

}

globalThis.watch = (mPtr: NativePointer) => {

    class MenRange implements MemoryAccessRange {
        base: NativePointer
        size: number
        constructor(base: NativePointer, size: number = 0x10) {
            this.base = checkPointer(base)
            this.size = size
        }
    }

    class MemoryDetails implements MemoryAccessDetails {
        operation: MemoryOperation
        from: NativePointer
        address: NativePointer
        rangeIndex: number
        pageIndex: number
        pagesCompleted: number
        pagesTotal: number
        private mdFrom: Module
        private mdAddress: Module

        constructor(detail: MemoryAccessDetails) {
            this.operation = detail.operation
            this.from = detail.from
            this.address = detail.address
            this.rangeIndex = detail.rangeIndex
            this.pageIndex = detail.pageIndex
            this.pagesCompleted = detail.pagesCompleted
            this.pagesTotal = detail.pagesTotal
            this.mdAddress = Process.findModuleByAddress(this.address)!
            this.mdFrom = Process.findModuleByAddress(this.from)!
        }

        public tostring(): string {
            return `
operation:\t\t${this.operation}
from:\t\t\t${this.from} { ${this.from.sub(this.mdFrom.base)} @ ${this.mdFrom.name} }
address:\t\t${this.address} { ${this.address.sub(this.mdAddress.base)} @ ${this.mdAddress.name} }
rangeIndex:\t\t${this.rangeIndex}
pageIndex:\t\t${this.pageIndex}
pagesCompleted:\t\t${this.pagesCompleted}
pagesTotal:\t\t${this.pagesTotal}`
        }
    }

    MemoryAccessMonitor.enable(new MenRange(mPtr), {
        onAccess: (access: MemoryAccessDetails) => {
            LOGD(new MemoryDetails(access).tostring())
        }
    })
}

globalThis.watchDisabled = () => {
    MemoryAccessMonitor.disable()
}