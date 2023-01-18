import { soName } from '../../base/globle';
import { VM, VMAction, GPRState, FPRState, CallbackPriority, VMError, SyncDirection } from './frida-qbdi'

// https://qbdi.readthedocs.io/en/stable/api.html
// https://qbdi.readthedocs.io/en/stable/get_started-frida.html#frida-qbdi-script

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

const test_replace = (mPtr: NativePointer) => {

    let functionAddr = checkPointer(mPtr)

    testCall()



    let srcFunc: NativeFunction<NativePointer, [NativePointer, NativePointer, NativePointer, NativePointer, NativePointer]> = new NativeFunction(functionAddr, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer', 'pointer'])
    Interceptor.replace(functionAddr, new NativeCallback(function (arg0: NativePointer, arg1: NativePointer, arg2: NativePointer, arg3: NativePointer, arg4: NativePointer) {
        LOGD(`replace => ${arg0} ${arg1} ${arg2} ${arg3} ${arg4}`)
        let ret = srcFunc(arg0, arg1, arg2, arg3, arg4)
        let ret1 = qbdiExec(this.context, arg0, arg1, arg2, arg3, arg4)
        LOGD(`replace => ${ret} ${ret1}`)
        return ret1
    }, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer', 'pointer', 'pointer']))


    function qbdiExec(ctx: CpuContext, arg0: NativePointer, arg1: NativePointer, arg2: NativePointer, arg3: NativePointer, arg4: NativePointer): NativePointer {
        const vm = new VM()
        let state: GPRState = vm.getGPRState()
        let stack: NativePointer = vm.allocateVirtualStack(state, 0x100000)
        state.synchronizeContext(ctx, SyncDirection.FRIDA_TO_QBDI as unknown as Readonly<{ FRIDA_TO_QBDI: 0; QBDI_TO_FRIDA: 1; }>)
        vm.addInstrumentedModuleFromAddr(functionAddr.toString())
        let retval = vm.call((srcFunc as unknown as NativePointer).toString(), [arg0, arg1, arg2, arg3, arg4])
        console.log(retval.toString(), readU16(retval))
        // let retval = ptr(0)
        // vm.alignedFree(stack)
        return retval
    }


    function testCall() {
        const vm = new VM()
        let state: GPRState = vm.getGPRState()
        let stack: NativePointer = vm.allocateVirtualStack(state, 0x100000)
        vm.addInstrumentedModuleFromAddr(functionAddr.toString())
        let retval = vm.call(functionAddr.toString(), [allocCStr("123123")])
        LOGD(`testCall U16 ret => ${retval} | '${readU16(retval)}'`)
        vm.alignedFree(stack)
    }






}

/* qbdi test */
globalThis.qbdi_test = () => {
    // testCall()
    test_replace(Module.findExportByName(soName, "il2cpp_string_new")!)
}

/* qdbi attach */
globalThis.qat = () => {


}

/* qdbi attach log level (stack) */
globalThis.qat = () => {
    // todo

}

declare global {
    var qbdi_test: () => void
    var qat: () => void
    var qal: () => void
}

export { }