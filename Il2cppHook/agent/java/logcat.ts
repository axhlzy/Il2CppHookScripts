import { formartClass as FM} from "../utils/formart"

const HookJavaLog = (): void => {
    Java.perform(() => {
        var class_name = Java.use("android.util.Log")
        //isLoggable
        // class_name.isLoggable.overload("java.lang.String", "int").implementation = function (tag: string, message: string) {
        //     LOGD("[*] " + formartClass.getTime() + " isLoggable was called:")
        //     LOGD("\targ1 : " + tag.toString())
        //     LOGD("\targ2 : " + message.toString())
        //     return this.apply(this, arguments)
        // }
        //DEBUG
        class_name.d.overload("java.lang.String", "java.lang.String").implementation = function (tag: string, message: string) {
            LOGD("[*] " + FM.getTime() + " DEBUG (d):")
            LOGD("\targ1 : " + tag.toString())
            LOGD("\targ2 : " + message.toString())
            return this.d(arguments)
        }
        // class_name.d.overload("java.lang.String", "java.lang.String", "java.lang.Throwable").implementation = function (tag: string, message: string, error: any) {
        //     LOGD("[*] " + formartClass.getTime() + " DEBUG (d):")
        //     LOGD("\targ1 : " + tag.toString())
        //     LOGD("\targ2 : " + message.toString())
        //     LOGD("\targ3 : " + error.toString())
        //     return this.d(arguments)
        // }
        //ERROR
        class_name.e.overload("java.lang.String", "java.lang.String").implementation = function (tag: string, message: string) {
            LOGD("[*] " + FM.getTime() + " ERROR (e):")
            LOGD("\targ1 : " + tag.toString())
            LOGD("\targ2 : " + message.toString())
            return this.e(arguments)
        }
        class_name.e.overload("java.lang.String", "java.lang.String", "java.lang.Throwable").implementation = function (tag: string, message: string, error: any) {
            LOGD("[*] " + FM.getTime() + " ERROR (e):")
            LOGD("\targ1 : " + tag.toString())
            LOGD("\targ2 : " + message.toString())
            LOGD("\targ3 : " + error.toString())
            return this.e(arguments)
        }
        //INFO
        class_name.i.overload("java.lang.String", "java.lang.String").implementation = function (tag: string, message: string) {
            LOGD("[*] " + FM.getTime() + " INFO (i):")
            LOGD("\targ1 : " + tag.toString())
            LOGD("\targ2 : " + message.toString())
            return this.i(arguments)
        }
        class_name.i.overload("java.lang.String", "java.lang.String", "java.lang.Throwable").implementation = function (tag: string, message: string, error: any) {
            LOGD("[*] " + FM.getTime() + " INFO (i):")
            LOGD("\targ1 : " + tag.toString())
            LOGD("\targ2 : " + message.toString())
            LOGD("\targ3 : " + error.toString())
            return this.i(arguments)
        }
        //VERBOSE
        class_name.v.overload("java.lang.String", "java.lang.String").implementation = function (tag: string, message: string) {
            LOGD("[*] " + FM.getTime() + " VERBOSE (v):")
            LOGD("\targ1 : " + tag.toString())
            LOGD("\targ2 : " + message.toString())
            return this.v(arguments)
        }
        class_name.v.overload("java.lang.String", "java.lang.String", "java.lang.Throwable").implementation = function (tag: string, message: string, error: any) {
            LOGD("[*] " + FM.getTime() + " VERBOSE (v):")
            LOGD("\targ1 : " + tag.toString())
            LOGD("\targ2 : " + message.toString())
            LOGD("\targ3 : " + error.toString())
            return this.v(arguments)
        }
        //WARNING
        class_name.w.overload("java.lang.String", "java.lang.String").implementation = function (tag: string, message: string) {
            LOGD("[*] " + FM.getTime() + " WARNING (w):")
            LOGD("\targ1 : " + tag.toString())
            LOGD("\targ2 : " + message.toString())
            return this.w(arguments)
        }
        class_name.w.overload("java.lang.String", "java.lang.Throwable").implementation = function (tag: string, message: string) {
            LOGD("[*] " + FM.getTime() + " WARNING (w):")
            LOGD("\targ1 : " + tag.toString())
            LOGD("\targ2 : " + message.toString())
            return this.w(arguments)
        }
        class_name.w.overload("java.lang.String", "java.lang.String", "java.lang.Throwable").implementation = function (tag: string, message: string, error: any) {
            LOGD("[*] " + FM.getTime() + " WARNING (w):")
            LOGD("\targ1 : " + tag.toString())
            LOGD("\targ2 : " + message.toString())
            LOGD("\targ3 : " + error.toString())
            return this.w(arguments)
        }
        //What a Terrible Failure (WTF)
        class_name.wtf.overload("java.lang.String", "java.lang.String").implementation = function (tag: string, message: string) {
            LOGD("[*] " + FM.getTime() + " WTF (wtf):")
            LOGD("\targ1 : " + tag.toString())
            LOGD("\targ2 : " + message.toString())
            return this.wtf(arguments)
        }
        class_name.wtf.overload("java.lang.String", "java.lang.Throwable").implementation = function (tag: string, message: string) {
            LOGD("[*] " + FM.getTime() + " WTF (wtf):")
            LOGD("\targ1 : " + tag.toString())
            LOGD("\targ2 : " + message.toString())
            return this.wtf(arguments)
        }
        class_name.wtf.overload("java.lang.String", "java.lang.String", "java.lang.Throwable").implementation = function (tag: string, message: string, error: any) {
            LOGD("[*] " + FM.getTime() + " WTF (wtf):")
            LOGD("\targ1 : " + tag.toString())
            LOGD("\targ2 : " + message.toString())
            LOGD("\targ3 : " + error.toString())
            return this.wtf(arguments)
        }
    })
}

export { HookJavaLog }

declare global {
    var HookJavaLog: () => void
}

globalThis.HookJavaLog = HookJavaLog