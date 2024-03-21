import { ArtMethod } from "./artMethod"

globalThis.findJavaClasses = (filter: string, accurate: boolean = false) => {
    let count: number = 0
    Java.perform(() => {
        newLine()
        Java.enumerateLoadedClassesSync().filter((className: string) => {
            return accurate ? className == filter : className.indexOf(filter) != -1
        }).forEach((className: string, _index: number, _array: string[]) => {
            LOGD(`[${++count}] ${className}`)
        })
        newLine()
    })
}

const forEachMethod = (className: string, callback: (method: Java.Method) => void) => {
    Java.perform(() => {
        let clazz: Java.Wrapper<{}> = Java.use(className)
        let methodsSet: Set<string> = new Set()
        clazz.class.getDeclaredMethods().forEach((method: Java.Wrapper) => {
            let methodName = method.getName()
            methodsSet.add(methodName)
        })
        methodsSet.forEach((methodName: string) => {
            let overloads: Java.Method[] = clazz[methodName].overloads
            overloads.forEach((overloadMethod: Java.Method) => {
                callback(overloadMethod)
            })
        })
    })
}

const hookClass = (className: string) => {
    Java.perform(() => {
        let count: number = 0
        forEachMethod(className, (overloadMethod) => {
            try {
                overloadMethod.implementation = function () {
                    let params: string = arguments.length == 0 ? '' : JSON.stringify(arguments)
                    LOGD(`CALLED -> ${overloadMethod.toString()}`)
                    LOGZ(`\tClass -> ${className}\n\tPARAMS -> ${params}`)
                    return this[overloadMethod.methodName].apply(this, arguments)
                }
                LOGD(`\t${`[${++count}]`.padEnd(5, ' ')} HOOK -> ${ArtMethod.prettyMethod(overloadMethod.handle, true)}`)
            } catch { }
        })
    })
}

globalThis.BJC = (filter: string, accurate: boolean = false) => {
    let count: number = 0
    Java.perform(() => {
        newLine()
        Java.enumerateLoadedClassesSync().filter((className: string) => {
            return accurate ? className == filter : className.includes(filter)
        }).forEach((className: string, _index: number, _array: string[]) => {
            LOGD(`[${++count}] ${className}`)
            hookClass(className)
        })
        newLine()
    })
}

const isNotSystemClass = (className: string): boolean => {
    if (className == null) return false
    const systemPrefixes: string[] = [
        'android.',
        'androidx.',
        'java.',
        'javax.',
        'dalvik.',
        'com.android.',
        'com.google.android.',
        'sun.',
        'libcore.',
        'kotlin.Function',
        'byte',
        'char',
    ]
    for (let prefix of systemPrefixes) {
        // 包含上述开头的跳过
        if (className.startsWith(prefix)) return false
    }
    try {
        let classLoader: Java.Wrapper = Java.use(className).class.getClassLoader()
        if (classLoader.toString().includes('BootClassLoader')) return false
        if (classLoader.toString().includes('PathClassLoader')) return true
        if (classLoader.toString().includes('DexClassLoader')) return true
    } catch {
        return false
    }
    return false
}

var cachedClassMethods: Map<string, Java.Method[]> = new Map()
globalThis.findJavaMethods = (filter: string, accurate: boolean = false) => {
    if (cachedClassMethods.size != 0) {
        showMethodsFound()
    } else {
        cacheJavaMethods()
        clear()
        showMethodsFound()
    }

    function showMethodsFound() {
        LOGW(`Count methods : ${cachedClassMethods.size}\n`)
        cachedClassMethods.forEach((methods: Java.Method[], className: string) => {
            if (accurate ? className == filter : className.includes(filter)) {
                LOGD(className)
                methods.forEach((method: Java.Method) => {
                    LOGD(`\t${ArtMethod.prettyMethod(method.handle, true)}`)
                })
            }
        })
    }

    function cacheJavaMethods() {
        Java.enumerateClassLoadersSync()
            // .filter((loader: Java.Wrapper) => {
            //     return loader.toString().includes('/data/user/0/') && (loader.$className === "dalvik.system.PathClassLoader" || loader.$className === "dalvik.system.DexClassLoader")
            // })
            .filter((loader: Java.Wrapper) => loader.toString().includes('base.apk'))
            .forEach(function (loader) {
                (Java.ClassFactory as any).loader = loader
                LOGW(`Set ClassLoader to ${loader}`)
                Java.enumerateLoadedClassesSync()
                    .filter(isNotSystemClass)
                    .forEach((className: string) => {
                        LOGD(`-> ${className}`)
                        forEachMethod(className, (method: Java.Method) => {
                            if (accurate ? method.methodName == filter : method.methodName.includes(filter)) {
                                let methods: Java.Method[] = cachedClassMethods.get(className) || []
                                methods.push(method)
                                LOGD(`[${methods.length}] ${className} -> ${ArtMethod.prettyMethod(method.handle, true)}`)
                                cachedClassMethods.set(className, methods)
                            }
                        })
                    })
            })
    }
}

const findJavaMethods = (filter: string, accurate: boolean = false) => {
    let count: number = 0
    Java.perform(() => {
        newLine()
        let methodsArray = Java.enumerateLoadedClassesSync()
            .filter((className: string) => isNotSystemClass(className))
            .flatMap((className: string) => {
                let methods = []
                const classObj: Java.Wrapper = Java.use(className)
                LOGD(`-> ${className}`)
                try {
                    methods = classObj.class.getDeclaredMethods().filter((method: any) => {
                        return accurate ? method.getName() == filter : method.getName().include(filter)
                    }).map((method: any) => {
                        LOGE(`\t${`[${++count}]`.padEnd(5, ' ')} ${ArtMethod.prettyMethod(method.handle, true)}`)
                        return {
                            classObj: classObj,
                            method: method
                        }
                    })
                } catch (e: any) {
                    console.error(`Error processing class $ { className }: ${e.message}`)
                }
                return methods
            })

        clear()

        LOGD(`Count methods : ${methodsArray.length}\n`)
        methodsArray.forEach(({ classObj, method }) => {
            LOGD(`[${++count}] ${classObj.$className} -> ${method.toString()} `)
        })

        newLine()
    })
}

const listJavaMethods = (className: string = "org.cocos2dx.lib.Cocos2dxHelper") => {
    Java.perform(function () {
        const aimClass = Java.use(className)
        const methods = aimClass.class.getDeclaredMethods()
        methods.forEach((method: Java.Wrapper) => LOGD(method.toString()))
    })
}

globalThis.listJavaMethods = listJavaMethods

declare global {
    var findJavaMethods: (filter: string, accurate?: boolean) => void
    var findJavaClasses: (filter: string, accurate?: boolean) => void
    var BJC: (filter: string, accurate?: boolean) => void // b java class
    var listJavaMethods: (className: string) => void
}