import { formartClass } from "../utils/formart";

const HookJavaLog = (): void => {
    Java.perform(() => {
        var class_name = Java.use("android.util.Log");
        //isLoggable
        class_name.isLoggable.overload("java.lang.String", "int").implementation = function (tag: string, message: string) {
            LOGD("[*] " + formartClass.getTime() + " isLoggable was called:")
            LOGD("\targ1 : " + tag.toString())
            LOGD("\targ2 : " + message.toString())
            return true;
        }
        //DEBUG
        class_name.d.overload("java.lang.String", "java.lang.String").implementation = function (tag: string, message: string) {
            LOGD("[*] " + formartClass.getTime() + " DEBUG (d):")
            LOGD("\targ1 : " + tag.toString())
            LOGD("\targ2 : " + message.toString())
            return true;
        }
        class_name.d.overload("java.lang.String", "java.lang.String", "java.lang.Throwable").implementation = function (tag: string, message: string, error: any) {
            LOGD("[*] " + formartClass.getTime() + " DEBUG (d):")
            LOGD("\targ1 : " + tag.toString())
            LOGD("\targ2 : " + message.toString())
            LOGD("\targ3 : " + error.toString())
            return true;
        }
        //ERROR
        class_name.e.overload("java.lang.String", "java.lang.String").implementation = function (tag: string, message: string) {
            LOGD("[*] " + formartClass.getTime() + " ERROR (e):")
            LOGD("\targ1 : " + tag.toString())
            LOGD("\targ2 : " + message.toString())
            return true;
        }
        class_name.e.overload("java.lang.String", "java.lang.String", "java.lang.Throwable").implementation = function (tag: string, message: string, error: any) {
            LOGD("[*] " + formartClass.getTime() + " ERROR (e):")
            LOGD("\targ1 : " + tag.toString())
            LOGD("\targ2 : " + message.toString())
            LOGD("\targ3 : " + error.toString())
            return true;
        }
        //INFO
        class_name.i.overload("java.lang.String", "java.lang.String").implementation = function (tag: string, message: string) {
            LOGD("[*] " + formartClass.getTime() + " INFO (i):")
            LOGD("\targ1 : " + tag.toString())
            LOGD("\targ2 : " + message.toString())
            return true;
        }
        class_name.i.overload("java.lang.String", "java.lang.String", "java.lang.Throwable").implementation = function (tag: string, message: string, error: any) {
            LOGD("[*] " + formartClass.getTime() + " INFO (i):")
            LOGD("\targ1 : " + tag.toString())
            LOGD("\targ2 : " + message.toString())
            LOGD("\targ3 : " + error.toString())
            return true;
        }
        //VERBOSE
        class_name.v.overload("java.lang.String", "java.lang.String").implementation = function (tag: string, message: string) {
            LOGD("[*] " + formartClass.getTime() + " VERBOSE (v):")
            LOGD("\targ1 : " + tag.toString())
            LOGD("\targ2 : " + message.toString())
            return true;
        }
        class_name.v.overload("java.lang.String", "java.lang.String", "java.lang.Throwable").implementation = function (tag: string, message: string, error: any) {
            LOGD("[*] " + formartClass.getTime() + " VERBOSE (v):")
            LOGD("\targ1 : " + tag.toString())
            LOGD("\targ2 : " + message.toString())
            LOGD("\targ3 : " + error.toString())
            return true;
        }
        //WARNING
        class_name.w.overload("java.lang.String", "java.lang.String").implementation = function (tag: string, message: string) {
            LOGD("[*] " + formartClass.getTime() + " WARNING (w):")
            LOGD("\targ1 : " + tag.toString())
            LOGD("\targ2 : " + message.toString())
            return true;
        }
        class_name.w.overload("java.lang.String", "java.lang.Throwable").implementation = function (tag: string, message: string) {
            LOGD("[*] " + formartClass.getTime() + " WARNING (w):")
            LOGD("\targ1 : " + tag.toString())
            LOGD("\targ2 : " + message.toString())
            return true;
        }
        class_name.w.overload("java.lang.String", "java.lang.String", "java.lang.Throwable").implementation = function (tag: string, message: string, error: any) {
            LOGD("[*] " + formartClass.getTime() + " WARNING (w):")
            LOGD("\targ1 : " + tag.toString())
            LOGD("\targ2 : " + message.toString())
            LOGD("\targ3 : " + error.toString())
            return true;
        }
        //What a Terrible Failure (WTF)
        class_name.wtf.overload("java.lang.String", "java.lang.String").implementation = function (tag: string, message: string) {
            LOGD("[*] " + formartClass.getTime() + " WTF (wtf):")
            LOGD("\targ1 : " + tag.toString())
            LOGD("\targ2 : " + message.toString())
            return true;
        }
        class_name.wtf.overload("java.lang.String", "java.lang.Throwable").implementation = function (tag: string, message: string) {
            LOGD("[*] " + formartClass.getTime() + " WTF (wtf):")
            LOGD("\targ1 : " + tag.toString())
            LOGD("\targ2 : " + message.toString())
            return true;
        }
        class_name.wtf.overload("java.lang.String", "java.lang.String", "java.lang.Throwable").implementation = function (tag: string, message: string, error: any) {
            LOGD("[*] " + formartClass.getTime() + " WTF (wtf):")
            LOGD("\targ1 : " + tag.toString())
            LOGD("\targ2 : " + message.toString())
            LOGD("\targ3 : " + error.toString())
            return true;
        }
    });
}

export { HookJavaLog }

declare global {
    var HookJavaLog: () => void;
}

globalThis.HookJavaLog = HookJavaLog;