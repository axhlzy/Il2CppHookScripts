import { soName } from '../../base/globle';
import { VM, VMAction, GPRState, FPRState, CallbackPriority, VMError, SyncDirection } from './frida-qbdi'

// https://qbdi.readthedocs.io/en/stable/api.html
// https://qbdi.readthedocs.io/en/stable/get_started-frida.html#frida-qbdi-script
// segment 1: Permission denied [SELinux] -> getenforce == Enforcing ? setenforce 0 : null

const testCall = () => {
    const vm = new VM()
    LOGD(JSON.stringify(vm.version))

    let state: GPRState = vm.getGPRState()
    let stack: NativePointer = vm.allocateVirtualStack(state, 0x100000)
    LOGD(stack.toString())

    let funcPtr = Module.findExportByName(soName, "il2cpp_string_new")!
    let res = vm.addInstrumentedModuleFromAddr(funcPtr.toString())
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

const qbdi_replace = (mPtr: NativePointer) => {
    let functionAddr = checkPointer(mPtr)
    const vm = new VM()
    let srcFunc: NativeFunction<NativePointer, [NativePointer, NativePointer, NativePointer, NativePointer, NativePointer]> = new NativeFunction(functionAddr, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer', 'pointer'])
    Interceptor.replace(functionAddr, new NativeCallback(function (arg0: NativePointer, arg1: NativePointer, arg2: NativePointer, arg3: NativePointer, arg4: NativePointer) {
        LOGD(`called ${functionAddr}/${mPtr} | args => ${arg0} ${arg1} ${arg2} ${arg3} ${arg4}`)
        // let ret = srcFunc(arg0, arg1, arg2, arg3, arg4)
        Interceptor.revert(functionAddr)
        Interceptor.flush()
        let state: GPRState = vm.getGPRState()
        let stack: NativePointer = vm.allocateVirtualStack(state, 0x10000)
        // state.synchronizeContext(this.context, SyncDirection.FRIDA_TO_QBDI as any)
        vm.addInstrumentedModuleFromAddr(functionAddr.toString())
        LOGD("p call " + (srcFunc as unknown as NativePointer).toString())
        let retval = vm.call((srcFunc as unknown as NativePointer).toString(), [arg0, arg1, arg2, arg3, arg4])
        // state.synchronizeContext(this.context, SyncDirection.QBDI_TO_FRIDA as any)
        LOGD(`replace => ${retval} ${retval}`)
        return retval
    }, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer', 'pointer', 'pointer']))
}

/* qbdi test */
globalThis.qbdi_test = () => {
    // testCall()
    //     test_replace(Module.findExportByName(soName, "il2cpp_string_new")!)
}

/* qdbi attach */
globalThis.qat = (mPtr: NativePointer) => qbdi_replace(mPtr)


/* qdbi attach log level (stack) */
globalThis.qal = () => {
    // todo

}

declare global {
    var qbdi_test: () => void
    var qat: (mPtr: NativePointer) => void
    var qal: () => void
}

export { }