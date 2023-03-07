export const hook_callstatic = () => {
    Il2Cpp.perform(() => {
        let _CallStatic = Il2Cpp.Domain.assembly("UnityEngine.AndroidJNIModule").image.class("UnityEngine.AndroidJavaObject").method("_CallStatic").virtualAddress
        if (_CallStatic.isNull()) throw new Error("CallStatic is null")
        /**
         * protected void _CallStatic(string methodName, params object[] args)
         * 
         *  object[] like this ↘
                                struct Array{
                                        void* klass;
                                        void* monitor;
                                        void* nop;
                                        intptr_t length;
                                        void* vector[1];
                                    };
         */
        A(_CallStatic, (args: NativePointer[]) => {
            let instance = new Il2Cpp.AndroidJavaObject(args[0])
            let methodName = new Il2Cpp.String(args[1]).toString()
            let arg_objs = new Il2Cpp.Array<Il2Cpp.Object>(args[2])
            LOGD(`\n[+] CallStatic: ${caseClassToString(instance.m_jclass.m_jobject)} -> ${methodName} argsCount:${arg_objs.length}`)
            for (let i = 0; i < arg_objs.length; i++) {
                let localArg = arg_objs.get(i)
                if (localArg.toString().includes("AndroidJavaObject")) { // AndroidJavaObject
                    LOGO(`\t[-] ${localArg.handle} -> ${localArg.toString()} { ${caseClassToString(new Il2Cpp.AndroidJavaObject(localArg.handle).m_jclass.m_jobject)} }`)
                } else {
                    LOGO(`\t[-] ${localArg.handle} -> ${localArg.toString()}`)
                }
            }

        }, (ret) => {

        })

        function caseClassToString(jclass: NativePointer) {
            return `${Java.cast(jclass, Java.use("java.lang.Object"))} @ ${jclass}`
        }
    })
}

declare global {
    var hook_callstatic: () => void
}

globalThis.hook_callstatic = hook_callstatic