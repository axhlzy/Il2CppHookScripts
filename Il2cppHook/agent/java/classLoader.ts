import { formartClass } from "../utils/formart";

type T_loader = any

class classLoaderManager {
    static iterClassLoader = (callback: (classLoader: T_loader) => void, log: boolean = false) => {
        Java.perform(() => {
            Java.enumerateClassLoaders({
                onMatch: function (loader) {
                    if (log) LOGD('classLoader' + loader.toString());
                    if (loader.toString().indexOf('dalvik.system.DexClassLoader') > -1) {
                        if (callback != null) interCall(loader, callback)
                    } else {
                        if (callback != null) interCall(loader, callback)
                    }
                }, onComplete: function () { }
            })
        })

        function interCall(loader: T_loader, interCallBack: (loader: T_loader) => void) {
            (Java.classFactory.loader as T_loader) = loader;
            interCallBack(loader);
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
}

const listClassLoaderTMP = classLoaderManager.listClassLoader;
const iterClassLoaderTMP = classLoaderManager.iterClassLoader;
const getClassLoaderByDescriptorTMP = classLoaderManager.getClassLoaderByDescriptor;
const getClassLoaderByIndexTMP = classLoaderManager.getClassLoaderByIndex;

export { listClassLoaderTMP as listClassLoader, iterClassLoaderTMP as iterClassLoader }

declare global {
    var iterClassLoader: (callback: (classLoader: any) => void, log?: boolean) => void
    var listClassLoader: (formart?: boolean) => void
    var getClassLoaderByDescriptor: (descriptor: string) => any
    var getClassLoaderByIndex: (index: number) => any
}

globalThis.listClassLoader = listClassLoaderTMP;
globalThis.iterClassLoader = iterClassLoaderTMP;
globalThis.getClassLoaderByDescriptor = getClassLoaderByDescriptorTMP;
globalThis.getClassLoaderByIndex = getClassLoaderByIndexTMP;