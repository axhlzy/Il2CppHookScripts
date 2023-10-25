import { iterClassLoader } from "./classLoader";

const findJavaClass = (className: string = "com.unity3d.player.UnityPlayerActivity") => {
    let boolLoader = true
    Java.perform(() => {
        iterClassLoader(function (loader: any) {
            if (loader) {
                try {
                    let clazz = loader.loadClass(className)
                    if (clazz) boolLoader = false
                    Java.choose(className, {
                        onMatch: function (clazz) {
                            LOGD('[*] onMatch : \n\t' + clazz.toString() + " at " + loader.toString());
                        }, onComplete: function () { }
                    })
                } catch { }
            }
        }, false)
    })
}

const showAllClassesMethods = () => {
    Java.perform(function () {
        Java.enumerateLoadedClasses({
            onMatch: function (className) {
                LOG("[*] Class Name: " + className);
                var db1 = Java.use(className);
                var methodArr = db1.class.getMethods();
                for (var m in methodArr) {
                    LOG("\t" + methodArr[m]);
                }
            },
            onComplete: function () { }
        });
    });
}

const showAllClasses = () => {
    Java.perform(function () {
        Java.enumerateLoadedClasses({
            onMatch: function (className) {
                LOG(className);
            },
            onComplete: function () { }
        });
    });
}

const showSpecificClassMethods = () => {
    Java.perform(function () {
        var class_name = "android.security.keystore.KeyGenParameterSpec$Builder";
        var db1 = Java.use(class_name);
        var methodArr = db1.class.getMethods();
        LOG("[*] Class Name: " + class_name)
        LOG("[*] Method Names:")
        for (var m in methodArr) {
            LOG(methodArr[m]);
        }
    });
}

export { }

declare global {
    var findJavaClass: (className: string) => void
}

globalThis.findJavaClass = findJavaClass