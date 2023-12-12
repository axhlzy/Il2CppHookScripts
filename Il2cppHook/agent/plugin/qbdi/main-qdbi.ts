import { VM, VMAction, GPRState, FPRState, CallbackPriority, VMError, InstPosition, SyncDirection } from './frida-qbdi'
import { methodToString } from '../../bridge/fix/il2cppM'
import { ValueResolve } from '../../base/valueResolve'

// https://qbdi.readthedocs.io/en/stable/api.html
// https://qbdi.readthedocs.io/en/stable/get_started-frida.html#frida-qbdi-script
// segment 1: Permission denied [SELinux] -> getenforce == Enforcing ? setenforce 0 : null

// 已知问题 ：QBDI JNI模拟调用会出现栈检查错误 （CheckPossibleHeapValue）
// ref : https://github.com/QBDI/QBDI/issues/243

const UINT64_SIZE = 0x8         // 定义存放数据基本块大小
const StackSize = 0x1000 * 10   // 定义栈大小

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
    // fakeStackCheck()
    vm = new VM()
    state = vm.getGPRState()
    stack = vm.allocateVirtualStack(state, size)
    baseSP = state.getRegister("SP")!
    if (stack == NULL) throw new Error("allocateVirtualStack failed")
    LOGD(`INIT QBDI VM -> Stack: ${stack} | SP: ${baseSP}`)
    QBDI_INIT = true
}

const init_CMOUDLE = () => {

}

// type ICBK_CALL = (vm: VM, gpr: GPRState, fpr: FPRState, data: NativePointer) => VMAction
type ICBK_CALL = (vm: VM, gpr: GPRState, fpr: FPRState, data: NativePointer) => number

const default_icbk = function (vm: VM, gpr: GPRState, _fpr: FPRState, _data: NativePointer) {
    let inst = vm.getInstAnalysis()
    let lastAddress: NativePointer = _data.readPointer()
    if (lastAddress == NULL) baseSP = gpr.getRegister("SP")!
    let index: UInt64 = _data.add(UINT64_SIZE * 1).readU64()
    let startTime_ICBK: UInt64 = _data.add(UINT64_SIZE * 2).readU64()
    let run_inst_count: UInt64 = _data.add(UINT64_SIZE * 3).readU64()
    let currentAddress: NativePointer = ptr(inst.address)
    let currentTime: UInt64 = new UInt64(Date.now())
    let custTime = index.equals(0) ? 0 : currentTime.sub(startTime_ICBK)
    let preText = `[ ${index.toString().padEnd(3, ' ')} | ${custTime} ms ]`.padEnd(18, ' ')
    if (startTime_ICBK.equals(0)) _data.add(UINT64_SIZE * 2).writeU64(Date.now())

    let forceInstLog = true
    let needParseArgs = false
    let asmOffset = baseSP.sub(gpr.getRegister("SP"))
    if (lastAddress != NULL && (forceInstLog || !currentAddress.sub(lastAddress).equals(4))) {
        let methodInfo: Il2Cpp.Method | null = AddressToMethodNoException(currentAddress)
        if (methodInfo != null) {
            _data.add(UINT64_SIZE * 1).writeU64(index.add(1))
            LOGD(`${preText} ${asmOffset.toString().padEnd(8, ' ')} ${currentAddress} | ${methodInfo.handle} -> ${methodInfo.class.name}::${methodToString(methodInfo, true)}`)
            let cacheID: string = `${_data.add(UINT64_SIZE * 1).readU64()} ${methodInfo.class.name}::${methodToString(methodInfo, true)}`
            let argsLocal: NativePointer[] = Object.values(gpr.getRegisters())
            if (needParseArgs) LOGO(`\t\t\t${new ValueResolve(cacheID, methodInfo).setArgs(argsLocal).argsToString()}`.padEnd(80, ' '))
        }
        if (!run_inst_count.equals(0) && (forceInstLog || run_inst_count.toNumber() % 1000 === 0)) {
            let md: Module | null = Process.findModuleByAddress(currentAddress)
            let extra = md == null ? "" : `${currentAddress.sub(md.base)} @ ${md.name}`.padEnd(30, ' ')
            LOGZ(`${preText} ${asmOffset.toString().padEnd(8, ' ')} ${currentAddress} | ${extra} | INSC: ${run_inst_count.toString().padEnd(7, ' ')} | ${inst.disassembly}`)
        }
    }
    _data.add(UINT64_SIZE * 3).writeU64(run_inst_count.add(1))
    _data.writePointer(currentAddress)
    return VMAction.CONTINUE
}

// 竞品 StalkerTracePath @ Il2cppHook\agent\base\extends.ts
globalThis.traceFunction = (mPtr: NativePointer | string | number, icbk_function: ICBK_CALL | NativePointer = default_icbk, argsCount: number = 4, once: boolean = true) => {
    if (mPtr == null) throw new Error("traceFunction : mPtr is null")
    let function_ptr: NativePointer = NULL
    if (mPtr instanceof NativePointer) function_ptr = mPtr
    if (typeof mPtr == "string" || typeof mPtr == "number") function_ptr = ptr(mPtr)
    if (icbk_function == NULL) icbk_function = default_icbk

    initQBDI()

    let syncRegs = true
    type callBackType = NativeFunction<NativePointer, [NativePointer, NativePointer, NativePointer, NativePointer, NativePointer]>
    let srcFunc: callBackType = new NativeFunction(function_ptr, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer', 'pointer'])
    var callback = new NativeCallback(function (_arg0, _arg1, _arg2, _arg3, _arg4) {
        let args: NativePointer[] = []
        for (let i = 0; i < argsCount; i++) args.push(arguments[i]);
        LOGD(`\ncalled ${function_ptr} | args => ${args.join(' ')}`)
        // let ret: NativePointer = srcFunc.apply(null, arguments as any)
        Interceptor.revert(function_ptr)
        Interceptor.flush()
        if (syncRegs) state.synchronizeContext(this.context, SyncDirection.FRIDA_TO_QBDI)
        vm.addInstrumentedModuleFromAddr(function_ptr)
        let icbk = vm.newInstCallback(icbk_function)
        var extraInfo: NativePointer = Memory.alloc(UINT64_SIZE * 4)
        extraInfo.add(UINT64_SIZE * 0).writePointer(NULL) // int64_t 记录上一次的地址
        extraInfo.add(UINT64_SIZE * 1).writePointer(NULL) // int64_t 记录 index
        extraInfo.add(UINT64_SIZE * 2).writePointer(NULL) // int64_t 开始时间
        extraInfo.add(UINT64_SIZE * 3).writePointer(NULL) // int64_t 记录 run inst count
        let status = vm.addCodeCB(InstPosition.PREINST, icbk, extraInfo, CallbackPriority.PRIORITY_DEFAULT)
        if (status == VMError.INVALID_EVENTID) throw new Error("addCodeCB failed")
        var startTime = Date.now()
        LOGD(`VM START | CALL -> ${srcFunc} | at ${new Date().toLocaleTimeString()}`)
        let vm_retval = vm.call(srcFunc, args)
        if (syncRegs) state.synchronizeContext(this.context, SyncDirection.QBDI_TO_FRIDA)
        LOGD(`VM STOP | RET => ${vm_retval} | cust ${Date.now() - startTime}ms`)
        if (!once) Interceptor.replace(function_ptr, callback)
        return vm_retval
    }, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer', 'pointer'])

    try {
        Interceptor.replace(function_ptr, callback)
    } catch (error: any) {
        if (error.message.includes("already replaced")) {
            Interceptor.revert(function_ptr)
            Interceptor.flush()
            Interceptor.replace(function_ptr, callback)
        } else throw error
    }
}

globalThis.traceMethodInfo = (methodinfo: NativePointer | string | number, once?: boolean) => {
    let localMethodPtr: NativePointer = NULL
    if (methodinfo == null) throw new Error("traceMethodInfo : methodinfo is null")
    if (typeof methodinfo == "string" && methodinfo.startsWith("0x")) localMethodPtr = ptr(methodinfo)
    if (methodinfo instanceof NativePointer) localMethodPtr = methodinfo
    if (typeof methodinfo == "number") localMethodPtr = ptr(methodinfo)
    let method = new Il2Cpp.Method(localMethodPtr)
    if (method.handle == null || method.virtualAddress == null) throw new Error("method is null")
    traceFunction(method.virtualAddress, NULL, method.isStatic ? method.parameterCount : method.parameterCount + 1, once)
}

globalThis.t = globalThis.traceMethodInfo

// not stable
globalThis.fakeStackCheck = () => {
    // bool CheckPossibleHeapValue(ScopedObjectAccess& soa, char fmt, JniValueType arg)
    // _ZN3art12_GLOBAL__N_111ScopedCheck22CheckPossibleHeapValueERNS_18ScopedObjectAccessEcNS0_12JniValueTypeE
    let CheckPossibleHeapValue = Module.findExportByName("libart.so", "_ZN3art12_GLOBAL__N_111ScopedCheck22CheckPossibleHeapValueERNS_18ScopedObjectAccessEcNS0_12JniValueTypeE")
    if (CheckPossibleHeapValue) {
        let src_CheckPossibleHeapValue = new NativeFunction(CheckPossibleHeapValue, 'bool', ['pointer', 'pointer', 'int'])
        Interceptor.replace(CheckPossibleHeapValue, new NativeCallback((soa: NativePointer, fmt: NativePointer, arg: number) => {
            // let ret = src_CheckPossibleHeapValue(soa, fmt, arg)
            // LOGD(`CheckPossibleHeapValue -> ${fmt} | ${arg}`)
            return 1
        }, 'bool', ['pointer', 'pointer', 'int']))
    }

    // bool CheckNonHeapValue(char fmt, JniValueType arg)
    // _ZN3art12_GLOBAL__N_111ScopedCheck17CheckNonHeapValueEcNS0_12JniValueTypeE
    let CheckNonHeapValue = Module.findExportByName("libart.so", "_ZN3art12_GLOBAL__N_111ScopedCheck17CheckNonHeapValueEcNS0_12JniValueTypeE")
    if (CheckNonHeapValue) {
        let SRC_CheckNonHeapValue = new NativeFunction(CheckNonHeapValue, 'bool', ['pointer', 'int'])
        Interceptor.replace(CheckNonHeapValue, new NativeCallback((fmt: NativePointer, arg: number) => {
            // let ret = src_CheckNonHeapValue(fmt, arg)
            // LOGD(`CheckNonHeapValue -> ${fmt} | ${arg}`)
            return 1
        }, 'bool', ['pointer', 'int']))
    }

}

declare global {
    var traceFunction: (mPtr: NativePointer, icbk_function?: ICBK_CALL | NativePointer, argsCount?: number, once?: boolean) => void
    var traceMethodInfo: (methodinfo: NativePointer, once?: boolean) => void
    var t: (methodinfo: NativePointer, once?: boolean) => void // alies traceMethodInfo

    var fakeStackCheck: () => void
}

export { }