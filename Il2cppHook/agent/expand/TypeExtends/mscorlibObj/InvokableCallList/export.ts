export { }

const HookAddListener = () => {
    let local_ptr: NativeFunction<NativePointer, [NativePointer, NativePointer]> = mscorlib.Api.InvokableCallList._AddListener
    if (local_ptr != null) {
        A(local_ptr, (args: InvocationArguments) => {
            let instance: Il2Cpp.Object = new Il2Cpp.Object(args[0])
            let BaseInvokableCall: NativePointer = args[1]
            let acttionToString: string = new Il2Cpp.Object(BaseInvokableCall).toString()
            LOGD(`\n[*] AddListener : ${getObjName(instance.handle)} @ ${instance.handle}`)
            // todo 这里现在写的很简单，但是此处可以后续做更多的参数解析
            LOGZ(`\BaseInvokableCall\t->  ${acttionToString} @ ${BaseInvokableCall}`)
        })
    }
}

declare global {
    var HookAddListener_InvokableCallList: () => void
}

globalThis.HookAddListener_InvokableCallList = HookAddListener