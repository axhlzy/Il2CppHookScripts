import { type } from 'os'
import { soName } from '../../base/globle'
import { VM, VMAction, GPRState, FPRState, CallbackPriority, VMError, InstPosition, SyncDirection } from './frida-qbdi'

// https://qbdi.readthedocs.io/en/stable/api.html
// https://qbdi.readthedocs.io/en/stable/get_started-frida.html#frida-qbdi-script
// segment 1: Permission denied [SELinux] -> getenforce == Enforcing ? setenforce 0 : null

const StackSize = 0x1000 * 50
// const StackSize = 0x1000 * 0x1000 * 10

var QBDI_INIT = false
var vm: VM
var state: GPRState
var stack: NativePointer = NULL
var baseSP: NativePointer = NULL

const initQBDI = (size: number = StackSize) => {
    if (QBDI_INIT) {
        vm.clearAllCache()
        return
    }
    vm = new VM()
    state = vm.getGPRState()
    stack = vm.allocateVirtualStack(state, size)
    baseSP = state.getRegister("SP")!
    if (stack == NULL) throw new Error("allocateVirtualStack failed")
    LOGD(`INIT QBDI VM -> Stack: ${stack} | SP: ${baseSP}`)
    QBDI_INIT = true
}

globalThis.qbdi_test = () => {

    initQBDI()

    LOGD(JSON.stringify(vm.version))
    let exp_func_string_new = Module.findExportByName(soName, "il2cpp_string_new")!
    vm.addInstrumentedModuleFromAddr(exp_func_string_new)

    let data = Memory.alloc(p_size * 2)
    data.writeInt(2)
    data.add(p_size).writeInt(999)
    let icbk = vm.newInstCallback(function (vm: VM, gpr: GPRState, _fpr: FPRState, data: NativePointer) {
        let inst = vm.getInstAnalysis()
        if (data.readInt() > 0) {
            gpr.dump()
            data.writeInt(data.readInt() - 1)
        }
        if (data.add(p_size).readInt() > 0) {
            LOGD(`${ptr(inst.address)} ${inst.disassembly}`)
            data.add(p_size).writeInt(data.add(p_size).readInt() - 1)
        }
        return VMAction.CONTINUE
    })

    let iid = vm.addCodeCB(InstPosition.PREINST, icbk, data, CallbackPriority.PRIORITY_DEFAULT)
    if (iid == VMError.INVALID_EVENTID) throw new Error("addCodeCB failed")
    LOGD(`start VM.CALL -> ${exp_func_string_new}`)
    let ret = vm.call(exp_func_string_new, [allocCStr("test string | 测试文本 !")])
    LOGD(`VM.CALL END | U16 ret => ${ret} | '${readU16(ret)}'`)
}

// type ICBK_CALL = (vm: VM, gpr: GPRState, fpr: FPRState, data: NativePointer) => VMAction
type ICBK_CALL = (vm: VM, gpr: GPRState, fpr: FPRState, data: NativePointer) => number

const default_icbk = function (vm: VM, gpr: GPRState, _fpr: FPRState, _data: NativePointer) {
    let inst = vm.getInstAnalysis()
    let lastAddress: NativePointer = _data.readPointer()
    let currentAddress: NativePointer = ptr(inst.address)
    LOGD(`${currentAddress}   ${baseSP.sub(gpr.getRegister("SP"))}  ${inst.disassembly}`)
    // if (lastAddress != NULL && !currentAddress.sub(lastAddress).equals(4)) {
    //     let methodInfo: Il2Cpp.Method = new Il2Cpp.Method(ptr(123))
    //     try {
    //         methodInfo = AddressToMethod(currentAddress)
    //     } catch { }
    //     LOGE(`branch to -> ${currentAddress} ${methodInfo.handle != ptr(123) ? methodInfo.name : ""}}`)
    // }
    _data.writePointer(currentAddress)
    return VMAction.CONTINUE
}

globalThis.traceFunction = (mPtr: NativePointer | string, icbk_function: ICBK_CALL | NativePointer = default_icbk, argsCount: number = 4, once: boolean = true) => {
    if (mPtr == null) throw new Error("traceFunction : mPtr is null")
    if (typeof mPtr == "string") mPtr = ptr(mPtr)
    if (icbk_function == NULL) icbk_function = default_icbk

    initQBDI()

    let function_ptr = ptr(mPtr as any)
    let srcFunc: NativeFunction<NativePointer, [NativePointer, NativePointer, NativePointer, NativePointer, NativePointer]> = new NativeFunction(function_ptr, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer', 'pointer'])
    var callback = new NativeCallback(function () {
        let args = []
        for (let i = 0; i < argsCount; i++) args.push(arguments[i]);
        LOGD(`called ${function_ptr} | args => ${args.join(' ')}`)
        // let ret = srcFunc.apply(null, args)
        Interceptor.revert(function_ptr)
        Interceptor.flush()
        // state.synchronizeContext(this.context, SyncDirection.FRIDA_TO_QBDI)
        vm.addInstrumentedModuleFromAddr(function_ptr)
        let icbk = vm.newInstCallback(icbk_function)
        var extraInfo: NativePointer = Memory.alloc(0x10)
        extraInfo.writePointer(NULL)
        let status = vm.addCodeCB(InstPosition.PREINST, icbk, extraInfo, CallbackPriority.PRIORITY_DEFAULT)
        if (status == VMError.INVALID_EVENTID) throw new Error("addCodeCB failed")
        LOGD(`VM START | CALL -> ${srcFunc}`)
        let vm_retval = vm.call(srcFunc, args)
        LOGD(`VM STOP | RET => ${vm_retval}`)
        if (!once) Interceptor.replace(function_ptr, callback)
        return vm_retval
    }, 'pointer', Array(argsCount).fill('pointer'))
    Interceptor.replace(function_ptr, callback)
}

globalThis.traceMethodInfo = (methodinfo: NativePointer, once?: boolean) => {
    let method = new Il2Cpp.Method(methodinfo)
    if (method == null || method.virtualAddress == null) throw new Error("method is null")
    traceFunction(method.virtualAddress, NULL, method.isStatic ? method.parameterCount : method.parameterCount + 1, once)
}

globalThis.t = globalThis.traceMethodInfo

declare global {
    var qbdi_test: () => void
    var traceFunction: (mPtr: NativePointer, icbk_function?: ICBK_CALL | NativePointer, argsCount?: number, once?: boolean) => void
    var traceMethodInfo: (methodinfo: NativePointer, once?: boolean) => void
    var t: (methodinfo: NativePointer, once?: boolean) => void // alies traceMethodInfo
}

export { }