export class Utils_Impl {

    public static retrieveSdkKey(): string {
        let ret: string = ""
        Java.perform(() => {
            let Utils = Java.use("com.applovin.mediation.unity.Utils")
            ret = Utils.retrieveSdkKey()
        })
        return ret
    }

    public static Hook_retrieveSdkKey() {
        Java.perform(() => {
            let Utils = Java.use("com.applovin.mediation.unity.Utils")
            Utils["retrieveSdkKey"].implementation = function () {
                let local_ret = this.retrieveSdkKey()
                LOGD(`Called retrieveSdkKey: ret => ${local_ret}`)
                return local_ret
            }
        })
    }

    public static getCurrentActivity(): Object | null {
        let ret: Object = NULL
        Java.perform(() => {
            let Utils = Java.use("com.applovin.mediation.unity.Utils")
            ret = Utils.getCurrentActivity()
        })
        return ret
    }
}

interface MaxUnityAdManagerInterface {
    mAdInfoMap: Object
    // TODO 
}

export class MaxUnityAdManager_impl {

    static get SDK_TAG() {
        let ret: string = ""
        Java.perform(() => {
            ret = Java.use("com.applovin.mediation.unity.MaxUnityAdManager").SDK_TAG.value
        })
        return ret
    }

    static get TAG(): string {
        let ret: string = ""
        Java.perform(() => {
            ret = Java.use("com.applovin.mediation.unity.MaxUnityAdManager").TAG.value
        })
        return ret
    }

    static get VERSION(): string {
        let ret: string = ""
        Java.perform(() => {
            ret = Java.use("com.applovin.mediation.unity.MaxUnityAdManager").VERSION.value
        })
        return ret
    }

    // private static BackgroundCallback backgroundCallback
    static get backgroundCallback(): Object | null {
        let ret: Object = NULL
        Java.perform(() => {
            ret = Java.use("com.applovin.mediation.unity.MaxUnityAdManager").backgroundCallback.value
        })
        return ret
    }

    // private static WeakReference<Activity> currentActivity
    static get currentActivity(): Object | null {
        let ret: Object = NULL
        Java.perform(() => {
            ret = Java.use("com.applovin.mediation.unity.MaxUnityAdManager").currentActivity.value
        })
        return ret
    }

    // private static MaxUnityAdManager instance
    static get instance(): MaxUnityAdManagerInterface | null {
        let ret: MaxUnityAdManagerInterface = {
            mAdInfoMap: {}
        }
        Java.perform(() => {
            ret = Java.use("com.applovin.mediation.unity.MaxUnityAdManager").instance.value
        })
        return ret
    }

    // private final Map<String, MaxAd> mAdInfoMap
    static get mAdInfoMap(): Object | null {
        let ret: Object = NULL
        Java.perform(() => {
            let local_instance = MaxUnityAdManager_impl.instance
            if (local_instance != null) {
                ret = (local_instance.mAdInfoMap as any).value
            }

        })
        return ret
    }
}


Reflect.set(globalThis, "JavaAds", {})

globalThis.JavaAds.Utils = Utils_Impl
globalThis.JavaAds.MaxUnityAdManager = MaxUnityAdManager_impl

declare global {
    namespace JavaAds {
        class Utils extends Utils_Impl { }
        class MaxUnityAdManager extends MaxUnityAdManager_impl { }
    }
}