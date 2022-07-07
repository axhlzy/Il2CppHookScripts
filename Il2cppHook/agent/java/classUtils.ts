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

export { }

declare global {
    var findJavaClass: (className: string) => void;
}

globalThis.findJavaClass = findJavaClass;