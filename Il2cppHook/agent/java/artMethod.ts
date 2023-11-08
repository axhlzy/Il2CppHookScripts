import { StdString } from "../plugin/std/std_string"

class ArtMethod {

    /**
     * std::string ArtMethod::PrettyMethod(ArtMethod* m, bool with_signature)
     * ref https://cs.android.com/android/platform/superproject/+/master:art/runtime/art_method.cc;l=827
     * 
     * poly16x4_t *__usercall art::ArtMethod::PrettyMethod@<X0>(poly16x4_t *this@<X0>, poly16x4_t *a2@<X1>, __int64 a3@<X8>)
        {
        if ( this )
            return (poly16x4_t *)art::ArtMethod::PrettyMethod(this, (unsigned __int8)a2 & 1);
        *(_QWORD *)a3 = 0LL;
        *(_QWORD *)(a3 + 8) = 0LL;
        *(_QWORD *)(a3 + 16) = 0LL;
        strcpy((char *)a3, "\bnull");
        return this;
        }
     */
    public static prettyMethod(method: NativePointer, with_signature: boolean = true): string {
        let address: NativePointer | null = Module.findExportByName("libart.so", "_ZN3art9ArtMethod12PrettyMethodEb")
        if (address == null) throw new Error("NOT Found : art::ArtMethod::PrettyMethod(ArtMethod* m, bool with_signature)")
        let localStr = new StdString()
        new NativeFunction(address, 'pointer', ['pointer', 'pointer', 'int'])(localStr.handle, method, with_signature ? 1 : 0)
        return localStr.disposeToString()
    }

    /**
     * _ZN3art9ArtMethod6InvokeEPNS_6ThreadEPjjPNS_6JValueEPKc
     * art::ArtMethod::Invoke(art::Thread*, unsigned int*, unsigned int, art::JValue*, char const*) <- demangleName
     * void ArtMethod::Invoke(Thread* self, uint32_t* args, uint32_t args_size, JValue* result, const char* shorty)
     * ref https://cs.android.com/android/platform/superproject/+/master:art/runtime/art_method.cc;l=365
     */
    public static Hook_ArtMethod_Invoke(needStack: boolean = false, with_signature: boolean = true) {
        Interceptor.attach(get_artMethod_invoke_ptr(), {
            onEnter: function (args) {
                let artMethod: NativePointer = args[0]
                if (with_signature) {
                    let method_name = ArtMethod.prettyMethod(artMethod, false)
                    if (!method_name.includes("java.") && !method_name.includes("android.")) {
                        let msg = `ArtMethod Invoke: ${method_name}`
                        if (needStack) msg += `\ncalled from:\n${Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join('\n') + '\n'}`
                        LOGD(msg)
                    }
                } else {
                    let method_name = ArtMethod.prettyMethod(artMethod, true)
                    if (!method_name.startsWith("java.") && !method_name.startsWith("android.")) {
                        let msg = `ArtMethod Invoke: ${method_name}`
                        if (needStack) msg += `\ncalled from:\n${Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join('\n') + '\n'}`
                        LOGD(msg)
                    }
                }
            }
        })

        function get_artMethod_invoke_ptr(): NativePointer {
            let ret_address: NativePointer | null = Module.findExportByName("libart.so", "_ZN3art9ArtMethod6InvokeEPNS_6ThreadEPjjPNS_6JValueEPKc")
            if (ret_address != null) return ret_address
            Process.findModuleByName("libart.so")!.enumerateSymbols()
                .filter((item: ModuleSymbolDetails) => item.name.indexOf("ArtMethod") >= 0)
                .filter((item: ModuleSymbolDetails) => item.name.indexOf("Invoke") >= 0)
                .filter((item: ModuleSymbolDetails) => item.name.indexOf("Thread") >= 0)
                .forEach((item: ModuleSymbolDetails) => { ret_address = item.address })
            if (ret_address == null) throw new Error("NOT Found : art::ArtMethod::Invoke")
            return ret_address
        }
    }
}

globalThis.hook_artMethodInvoke = ArtMethod.Hook_ArtMethod_Invoke
globalThis.artMethodPtrToString = ArtMethod.prettyMethod

declare global {
    var hook_artMethodInvoke: (needStack?: boolean) => void
    var artMethodPtrToString: (artMethodPtr: NativePointer, with_signature?: boolean) => string
}

export { ArtMethod }