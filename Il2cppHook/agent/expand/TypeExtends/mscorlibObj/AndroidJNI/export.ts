export {}

var logIndex : number = 0

const needStack : boolean = true

// 这个东西 我之前考虑过添加进来 但是并不稳定 容易崩, 也没太多时间去研究它为什么崩 ...
const B_UnityJNI = () => {

    const class_AndroidJNISafe = Il2Cpp.Domain.tryAssembly("UnityEngine.AndroidJNIModule")?.image.tryClass("UnityEngine.AndroidJNISafe")

    LOGW(`[ B_UnityJNI ] class_AndroidJNISafe = ${class_AndroidJNISafe}`)

    class_AndroidJNISafe?.methods.forEach(method => {

        const methodName = method.name

        // public static IntPtr NewString(String chars)
        if (methodName == "NewString" && method.parameterCount == 1) {
            A(method.virtualAddress, (args, _ctx, passValue)=>{
                passValue.set("chars", args[0])
            }, (ret, _ctx, passValue)=>{
                LOGD(`[ ${++logIndex} ] public static IntPtr NewString(String chars = ${passValue.get("chars")})`)
                LOGO(`\t{ String chars = '${readU16(passValue.get("chars"))}' | ret -> ${ret} }`)
                if (needStack) LOGZ(`${GetStackTraceNative(_ctx).split('\n').map(line => `\t${line}`).join('\n')}`)
            })
        }

        // public static Void DeleteLocalRef(IntPtr localref)
        if (methodName == "DeleteLocalRef" && method.parameterCount == 1) {
            A(method.virtualAddress, (args, _ctx, passValue)=>{
                passValue.set("localref", args[0])
            }, (ret, _ctx, passValue)=>{
                LOGD(`[ ${++logIndex} ] public static Void DeleteLocalRef(IntPtr localref = ${passValue.get("localref")})`)
                if (needStack) LOGZ(`${GetStackTraceNative(_ctx).split('\n').map(line => `\t${line}`).join('\n')}`)
            })
        }

        // public static IntPtr CallStaticObjectMethod(IntPtr clazz, IntPtr methodID, jvalue[] args)
        if (methodName == "CallStaticObjectMethod" && method.parameterCount == 3) {
            A(method.virtualAddress, (args, _ctx, passValue)=>{
                passValue.set("clazz", args[0])
                passValue.set("methodID", args[1])
                passValue.set("args", args[2])
            }, (ret, _ctx, passValue)=>{
                LOGD(`[ ${++logIndex} ] public static IntPtr CallStaticObjectMethod(IntPtr clazz = ${passValue.get("clazz")}, IntPtr methodID = ${passValue.get("methodID")}, jvalue[] args)`)
                LOGO(`\t{ ret -> ${ret} }`)
                if (needStack) LOGZ(`${GetStackTraceNative(_ctx).split('\n').map(line => `\t${line}`).join('\n')}`)
            })
        }

        // public static IntPtr FromReflectedMethod(IntPtr refMethod)
        if (methodName == "FromReflectedMethod" && method.parameterCount == 1) {
            A(method.virtualAddress, (args, _ctx, passValue)=>{
                passValue.set("refMethod", args[0])
            }, (ret, _ctx, passValue)=>{
                LOGD(`[ ${++logIndex} ] public static IntPtr FromReflectedMethod(IntPtr refMethod = ${passValue.get("refMethod")})`)
                LOGO(`\t{ ret -> ${ret} }`)
                if (needStack) LOGZ(`${GetStackTraceNative(_ctx).split('\n').map(line => `\t${line}`).join('\n')}`)
            })
        }

        // public static Void CallVoidMethod(IntPtr obj, IntPtr methodID, jvalue[] args)
        if (methodName == "CallVoidMethod" && method.parameterCount == 3) {
            A(method.virtualAddress, (args, _ctx, passValue)=>{
                passValue.set("obj", args[0])
                passValue.set("methodID", args[1])
                passValue.set("args", args[2])
            }, (_ret, _ctx, passValue)=>{
                LOGD(`[ ${++logIndex} ] public static Void CallVoidMethod(IntPtr obj = ${passValue.get("obj")}, IntPtr methodID = ${passValue.get("methodID")}, jvalue[] args)`)
                if (needStack) LOGZ(`${GetStackTraceNative(_ctx).split('\n').map(line => `\t${line}`).join('\n')}`)
            })
        }

        // public static IntPtr FindClass(String name)
        if (methodName == "FindClass" && method.parameterCount == 1) {
            A(method.virtualAddress, (args, _ctx, passValue)=>{
                passValue.set("name", args[0])
            }, (ret, _ctx, passValue)=>{
                LOGD(`[ ${++logIndex} ] public static IntPtr FindClass(String name = ${passValue.get("name")})`)
                LOGO(`\t{ String name = '${readU16(passValue.get("name"))}' | ret -> ${ret} }`)
                if (needStack) LOGZ(`${GetStackTraceNative(_ctx).split('\n').map(line => `\t${line}`).join('\n')}`)
            })
        }

        // JNI函数太多了 遇到的时候再添加把 ....
        // findClasses("JNI")
        // m("AndroidJavaObject")
    })

}

globalThis.B_UnityJNI = B_UnityJNI

declare global {
    var B_UnityJNI: () => void
}