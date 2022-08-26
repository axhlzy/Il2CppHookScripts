globalThis.HookResourceLoad = () => {
    A(Il2cpp.Api.ResourcesAPI._Load, (args: InvocationArguments,) => {
        LOGD(`\n[*] ResourcesAPI.load`)
        LOGZ(`   | ARG ---> ins:'${args[0]}',name:'${readU16(args[1])}', type:'${args[2]}'`)
    }, (retval: InvocationReturnValue) => {
        LOGZ(`   | RET ---> ${retval} --- {${new Il2Cpp.Object(retval).toString()}}`)
    })
}

export { }

declare global {
    var HookResourceLoad: () => void;
}