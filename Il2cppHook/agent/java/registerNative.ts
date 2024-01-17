import { cache } from "decorator-cache-getter"
import { demangleName } from "../base/extends"

class JNINativeMethod {
    name: string
    signature: string
    fnPtr: NativePointer
    extra: { "symbol": string, "moduleName": string, "relativeAddress": string }

    constructor(name: NativePointer, signature: NativePointer, fnPtr: NativePointer) {
        this.name = name.readCString()!
        this.signature = signature.readCString()!
        this.fnPtr = fnPtr
        this.extra = {
            "symbol": demangleName(this.symbal_name), "moduleName": this.moduleName!,
            "relativeAddress": `${this.fnPtr.sub(this.thisMd?.base!)} @ ${this.thisMd?.name}`
        }
    }

    get symbol(): DebugSymbol {
        return DebugSymbol.fromAddress(this.fnPtr)
    }

    get symbol_string(): string {
        return this.symbol.toString()
    }

    get symbal_name(): string {
        return this.symbol.name ? this.symbol.name : ""
    }

    get symbal_name_demangle(): string {
        return demangleName(this.symbal_name)
    }

    get moduleName(): string | null {
        return this.symbol.moduleName
    }

    get thisMd(): Module | null {
        if (this.moduleName) return Process.findModuleByName(this.moduleName)
        else return null
    }

    get address(): NativePointer {
        return this.symbol.address
    }

    get fileName(): string | null {
        return this.symbol.fileName
    }

    get lineNumber(): number | null {
        return this.symbol.lineNumber
    }

    tostring(withSym: boolean = false): string {
        let retStr = `name:${this.name} signature:${this.signature} fnPtr:${this.fnPtr}`
        if (withSym) retStr += `\n\tsymbal_name:${this.symbal_name} | symbal_name_simple:${this.symbal_name_demangle}`
        return retStr
    }
}

class RegisterNativeItem {
    jniEnv: NativePointer
    jclass: { "handle": NativePointer, "className": string }
    jniNativeMethod: JNINativeMethod[]
    count: number

    constructor(jniEnv: NativePointer, jclass: NativePointer, methods: NativePointer, count: number) {
        this.jniEnv = jniEnv
        this.jclass = { "handle": jclass, "className": Java.vm.tryGetEnv().getClassName(jclass) }
        this.jniNativeMethod = this.resolveMethods(methods, count)
        this.count = count
    }

    get className(): string {
        if (this.jclass == null) return ""
        return Java.vm.tryGetEnv().getClassName(this.jclass)
    }

    private resolveMethods(methods: NativePointer, count: number): JNINativeMethod[] {
        let ret: JNINativeMethod[] = []
        for (let i = 0; i < count; i++) {
            let name_ptr = methods.add(i * Process.pointerSize * 3).readPointer()
            let sig_ptr = methods.add(i * Process.pointerSize * 3 + Process.pointerSize).readPointer()
            let fnPtr_ptr = methods.add(i * Process.pointerSize * 3 + Process.pointerSize * 2).readPointer()
            try {
                let method = new JNINativeMethod(name_ptr, sig_ptr, fnPtr_ptr)
                ret.push(method)
            } catch (error) {
                // LOGE(`resolveMethods error:${error}`)
            }
        }
        return ret
    }

    public toString(): string {
        let retStr = `RegisterNativeItem: className:${this.className} count:${this.count}`
        this.jniNativeMethod.forEach((item: JNINativeMethod) => {
            retStr += `\n\t${item.tostring(true)}`
        })
        return retStr
    }
}

class JNIHelper {

    private static _instance: JNIHelper
    static get instance(): JNIHelper {
        if (!JNIHelper._instance) JNIHelper._instance = new JNIHelper()
        return JNIHelper._instance
    }

    public Init() {
        JNIHelper.instance
    }

    private constructor() {
        this.HookRegisterNatives()
    }

    private cacheRegisterNativeItem: RegisterNativeItem[] = []

    @cache
    private get addrRegisterNatives(): NativePointer {
        let md: Module = Process.findModuleByName("libart.so")!
        let symbols: ModuleSymbolDetails[] = md.enumerateSymbols()
        for (let i = 0; i < symbols.length; i++) {
            let symbol = symbols[i]

            //_ZN3art3JNI15RegisterNativesEP7_JNIEnvP7_jclassPK15JNINativeMethodi
            if (symbol.name.indexOf("art") >= 0 &&
                symbol.name.indexOf("JNI") >= 0 &&
                symbol.name.indexOf("RegisterNatives") >= 0 &&
                symbol.name.indexOf("CheckJNI") < 0) {
                // LOGD(`RegisterNatives is at ${symbol.address} ${symbol.name}`)
                return symbol.address
            }
        }
        return NULL
    }

    private HookRegisterNatives() {
        if (!this.addrRegisterNatives.isNull()) {
            Interceptor.attach(this.addrRegisterNatives, {
                onEnter: (args: InvocationArguments) => {
                    // static jint RegisterNatives(JNIEnv env, jclass clazz, const JNINativeMethod* methods, jint nMethods)
                    this.cacheRegisterNativeItem.push(new RegisterNativeItem(args[0], args[1], args[2], args[3].toInt32()))
                }
            })
        }
    }

    public getRegisterNativeItemByClassName(className: string): RegisterNativeItem | null {
        let ret: RegisterNativeItem | null = null
        this.cacheRegisterNativeItem.forEach((item: RegisterNativeItem) => {
            if (item.className == className) {
                ret = item
                return null
            }
        })
        return ret
    }

    public getRegisterNativeItemByMdName(mdName: string): RegisterNativeItem | null {
        let ret: RegisterNativeItem | null = null
        this.cacheRegisterNativeItem.forEach((item: RegisterNativeItem) => {
            if (item.jniNativeMethod.flatMap((item) => item.moduleName).includes(mdName)) {
                ret = item
                return null
            }
        })
        return ret
    }

}

export { JNIHelper }

// enable if needed
// globalThis.JNIHelper = JNIHelper.instance

declare global {
    var JNIHelper: JNIHelper
}