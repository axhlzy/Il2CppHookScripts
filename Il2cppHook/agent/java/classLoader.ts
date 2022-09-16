import { formartClass } from "../utils/formart"

type T_loader = any

class classLoaderManager {
    static iterClassLoader = (callback: (classLoader: T_loader) => void, log: boolean = false) => {
        Java.perform(() => {
            Java.enumerateClassLoaders({
                onMatch: function (loader) {
                    if (log) LOGD('classLoader' + loader.toString())
                    if (loader.toString().indexOf('dalvik.system.DexClassLoader') > -1) {
                        if (callback != null) interCall(loader, callback)
                    } else {
                        if (callback != null) interCall(loader, callback)
                    }
                }, onComplete: function () { }
            })
        })

        function interCall(loader: T_loader, interCallBack: (loader: T_loader) => void) {
            (Java.classFactory.loader as T_loader) = loader
            interCallBack(loader)
        }
    }

    static loaders: Array<T_loader> = new Array()
    static listClassLoader = (formart: boolean = true, needLog = true): void => {
        if (!needLog && classLoaderManager.loaders.length === 0) {
            fillCacle()
            return
        }
        if (!formart) {
            Java.perform(() => classLoaderManager.iterClassLoader(() => { }, true))
        } else {
            fillCacle()
            let classLoaderList = ["java.lang.BootClassLoader", "dalvik.system.DexClassLoader", "dalvik.system.PathClassLoader", "dalvik.system.InMemoryDexClassLoader"]
            classLoaderList.forEach((classLoaderName) => {
                formartClass.printTitile(classLoaderName)
                this.loaders.forEach((loader: T_loader) => {
                    if (loader.toString().indexOf(classLoaderName) > -1) LOGD('  [' + classLoaderManager.loaders.indexOf(loader) + '] ' + loader.toString())
                })
            })
        }

        function fillCacle() {
            if (classLoaderManager.loaders.length !== 0) return
            Java.perform(() => classLoaderManager.iterClassLoader((loader: T_loader) => {
                if (!classLoaderManager.loaders.includes(loader)) classLoaderManager.loaders.push(loader)
            }, false))
        }
    }

    static getClassLoaderByDescriptor = (descriptor: string): T_loader => {
        let ret: T_loader = null
        classLoaderManager.loaders.forEach((loader: T_loader) => {
            if (loader.toString().indexOf(descriptor) > -1) ret = loader
        })
        return ret
    }

    static getClassLoaderByIndex = (index: number): T_loader => {
        return classLoaderManager.loaders[index]
    }

    static HookClassLoader() {
        Java.perform(function () {
            let base_loader = Java.use("dalvik.system.BaseDexClassLoader")
            let lang_class = Java.use("java.lang.Class")
            if (base_loader != null) {
                base_loader.$init.overload("java.lang.String", "java.io.File", "java.lang.String", "java.lang.ClassLoader").implementation = function (str1, file, str2, loader) {
                    let ret = this.$init(str1, file, str2, loader)
                    let clazz_obj = Java.cast(this.getClass(), lang_class)
                    LOG("[I] " + clazz_obj.getName())
                    return ret
                }
                base_loader.loadClass.overload("java.lang.String", "boolean").implementation = function (name: string) {
                    let clazz_obj = Java.cast(this.getClass(), lang_class)
                    LOGD("[L] " + clazz_obj.getName() + " load  --->  " + name)
                    let result = this.loadClass(name, false)
                    return result
                }
                base_loader.findClass.implementation = function (name: string) {
                    let result = this.findClass(name)
                    let clazz_obj = Java.cast(this.getClass(), lang_class)
                    LOGD("[F] " + clazz_obj.getName() + " find  --->  " + name)
                    return result
                }
            }
        })
    }
}

const listClassLoaderTMP = classLoaderManager.listClassLoader
const iterClassLoaderTMP = classLoaderManager.iterClassLoader

globalThis.listClassLoader = classLoaderManager.listClassLoader
globalThis.iterClassLoader = classLoaderManager.iterClassLoader
globalThis.getClassLoaderByDescriptor = classLoaderManager.getClassLoaderByDescriptor
globalThis.getClassLoaderByIndex = classLoaderManager.getClassLoaderByIndex
globalThis.HookClassLoader = classLoaderManager.HookClassLoader

export { listClassLoaderTMP as listClassLoader, iterClassLoaderTMP as iterClassLoader }

declare global {
    var iterClassLoader: (callback: (classLoader: any) => void, log?: boolean) => void
    var listClassLoader: (formart?: boolean) => void
    var getClassLoaderByDescriptor: (descriptor: string) => any
    var getClassLoaderByIndex: (index: number) => any
    var HookClassLoader: () => void
}