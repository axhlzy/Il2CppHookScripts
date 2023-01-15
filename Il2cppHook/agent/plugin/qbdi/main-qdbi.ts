import { soName } from '../../base/globle';
import { VM, VMAction, GPRState, FPRState, CallbackPriority, VMError } from './frida-qbdi'

// https://qbdi.readthedocs.io/en/stable/api.html
// https://qbdi.readthedocs.io/en/stable/get_started-frida.html#frida-qbdi-script

const testCall = () => {
    const vm = new VM()
    LOGD(JSON.stringify(vm.version))

    let state: GPRState = vm.getGPRState()
    let stack: NativePointer = vm.allocateVirtualStack(state, 0x100000)
    LOGD(stack.toString())

    let funcPtr = Module.findExportByName(soName, "il2cpp_string_new")!
    vm.addInstrumentedModuleFromAddr(funcPtr.toString())
    let res = vm.addInstrumentedModule(soName)
    LOGD(`addInstrumentedModule => ${res}`)

    // 前五条详细打 gpr
    let data = Memory.alloc(p_size * 2).writeInt(5)
    // 测试只显示前面20条指令，后面的就跳过了
    data.add(p_size).writeInt(20)
    let icbk = vm.newInstCallback(function (vm: VM, gpr: GPRState, _fpr: FPRState, data: NativePointer) {
        let inst = vm.getInstAnalysis()
        let count_0 = data.readInt()
        if (count_0 > 0) {
            gpr.dump()
            data.writeInt(--count_0)
        }
        let count_1 = data.add(p_size).readInt()
        if (count_1 > 0) {
            LOGD(`${ptr(inst.address).toString()} ${inst.disassembly} ${inst.mnemonic}`)
            data.add(p_size).writeInt(--count_1)
        }
        return VMAction.CONTINUE
    })

    let iid = vm.addCodeCB(0 as unknown as Readonly<{ PREINST: 0; POSTINST: 1; }>, icbk, data, CallbackPriority.PRIORITY_DEFAULT)
    if (iid == VMError.INVALID_EVENTID) throw new Error("addCodeCB failed")

    let ret = vm.call(funcPtr.toString(), [allocCStr("Hello world !")])
    LOGD(`U16 ret => ${ret} | '${readU16(ret)}'`)
}

globalThis.qbdi = () => {
    testCall()
    // todo
}

declare global {
    var qbdi: () => void
}

export { }