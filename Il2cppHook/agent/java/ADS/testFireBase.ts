// setImmediate(() => {
//     test_fireBase()
// })

const test_fireBase = () => {
    Java.perform(() => {
        // test1()
        test2()
    })
}

export { }

declare global {
    var test_fireBase: () => void
    var disbaleFirebase: () => void
}

globalThis.test_fireBase = test_fireBase

globalThis.disbaleFirebase = () => {
    Il2Cpp.perform(() => {
        // 0x1C46810 CheckDependencies() : DependencyStatus 
        A(find_method('Firebase.App', 'FirebaseApp', 'CheckDependencies', 0), undefined, (ret) => {
            LOGD(`CheckDependencies() => ${ret}`)
            ret.replace(ptr(1))
        })

        // 0x1C46670 CheckAndFixDependenciesAsync() : Task<DependencyStatus>
        A(find_method('Firebase.App', 'FirebaseApp', 'CheckAndFixDependenciesAsync', 0), undefined, (ret) => LOGD(`CheckAndFixDependenciesAsync() => ${ret}`))

        // 0x1C4641C CheckDependenciesAsync() : Task<DependencyStatus>
        A(find_method('Firebase.App', 'FirebaseApp', 'CheckDependenciesAsync', 0), undefined, (ret) => { LOGD(`CheckDependenciesAsync() => ${ret}`) })

    })
}

const test1 = () => {
    Il2Cpp.perform(() => {
        // B('Firebase.RemoteConfig')
        var instance: NativePointer = ptr(0)
        let enter = true
        // 0x22cb950      |  FirebaseRemoteCon.(0x720952a290)  ===>  public static FirebaseRemoteConfig get_DefaultInstance()
        A(find_method('Firebase.RemoteConfig', 'FirebaseRemoteConfig', "get_DefaultInstance", 0), (args) => { }, (ret) => {
            LOGD(`FirebaseRemoteConfig.get_DefaultInstance() => ${ret}`)
            var instance = ret
            if (enter == true) {
                enter = false
                // Il2Cpp.perform(() => {
                var task = callFunction(find_method('Firebase.RemoteConfig', 'FirebaseRemoteConfig', "FetchAndActivateAsync", 0), instance)
                LOGD(`FetchAndActivateAsync(${instance}) => ${task}`)
                setInterval(() => {
                    //     [-]mscorlib @ 0x72c903abd8
                    //     [-]mscorlib.dll @ 0x72c90350a8 | C:1715
                    //     [-]Task`1 @ 0x72e9ac6530 | M:28 | F:2 | N:System.Threading.Tasks
                    //         [-]public Boolean get_Result() @ MI:0x72e9ac6e70 & MP: 0x7072974c24 & RP: 0x2353c24
                    var ret_B = callFunction(0x2353c24, task)
                    LOGD(`Task ${task} | ${ret_B}`)

                    var ins_keys = callFunction(find_method('Firebase.RemoteConfig', 'FirebaseRemoteConfig', "get_Keys", 0), instance)

                    var ins_count = callFunctionRI(find_method('Firebase.App', 'StringList', "get_Count", 0), ins_keys)

                    var ins_array = callFunction(find_method('Firebase.App', 'StringList', "ToArray", 0), ins_keys)

                    LOGD(`GOT Data len : ${ins_count} | array : ${ins_array}`)

                    for (var index = 0; index < ins_count; index++) {
                        var name = readU16(ins_array.add(0x20).add(p_size * index).readPointer())
                        if (name.includes("test")) {
                            LOGE(name)
                        } else {
                            LOGD(name)
                        }
                    }

                    Java.perform(() => {
                        var FirebaseRemoteConfig = Java.use("com.google.firebase.remoteconfig.FirebaseRemoteConfig")
                        var instance = FirebaseRemoteConfig.getInstance()
                        LOGD(instance)

                        LOGD(instance.getAll().size())

                        var s = instance.getString("abd")
                        LOGD(JSON.stringify(s))
                        LOGD(s.toString())

                    })




                    // showArray(ins_array)

                    // public ConfigValue GetValue(String key)
                    var configValue = callFunction(find_method('Firebase.RemoteConfig', 'FirebaseRemoteConfig', "GetValue", 1), instance, allocUStr('TestRemoteKey'))
                    var configValue1 = callFunction(find_method('Firebase.RemoteConfig', 'FirebaseRemoteConfig', "GetValue", 1), instance, allocUStr('abc'))
                    var configValue2 = callFunction(find_method('Firebase.RemoteConfig', 'FirebaseRemoteConfig', "GetValue", 1), instance, allocUStr('abd'))
                    var configValue3 = callFunction(find_method('Firebase.RemoteConfig', 'FirebaseRemoteConfig', "GetValue", 1), instance, allocUStr('UnlockCars_LevelsVersion'))

                    var str = callFunction(find_method('Firebase.RemoteConfig', 'ConfigValue', "get_StringValue", 0), configValue)

                    LOGD(`GOT Data : ${str} | ${readU16(str)}`)


                    LOGD(getLine(30, '-'))

                }, 1000)



                // })
            }
        })
    })
}

const test2 = () => {

    // change1()
    change2()

    setTimeout(() => {
        addCall()
    }, 5000)

    function change1() {
        let string = Java.use("java.lang.String")
        let FirebaseOptions = Java.use("com.google.firebase.FirebaseOptions")
        let FirebaseOptions_Builder = Java.use("com.google.firebase.FirebaseOptions$Builder")
        FirebaseOptions["fromResource"].implementation = function (context: any) {
            console.log('fromResource is called' + ', ' + 'context: ' + context)
            let ret = this.fromResource(context)
            console.log('fromResource ret value is ' + ret)
            return ret
            let newret = FirebaseOptions_Builder.$new()
                .setApplicationId("1:1006447557104:android:575473cdfe4c92c20f4535")
                .setApiKey("AIzaSyAK2GAaeAFFaIqDjt2iOpnWPCh2RsE5qY8")
                .setDatabaseUrl(null)
                .setGaTrackingId("1006447557104")
                .setGcmSenderId(null)
                .setStorageBucket("test-9d867.appspot.com")
                .setProjectId("test-9d867")
                .build()
            console.warn('fromResource newret value is ' + newret)
            return newret
        }
    }

    function change2() {
        let StringResourceValueReader = Java.use("com.google.android.gms.common.internal.StringResourceValueReader")
        StringResourceValueReader["getString"].implementation = function (str: string) {
            if (str == "google_app_id") return "1:1006447557104:android:575473cdfe4c92c20f4535"
            if (str == "google_api_key") return "AIzaSyAK2GAaeAFFaIqDjt2iOpnWPCh2RsE5qY8"
            if (str == "firebase_database_url") return "https://test-9d867.firebaseio.com"
            if (str == "ga_trackingId") return "1006447557104"
            if (str == "gcm_defaultSenderId") return "1006447557104"
            if (str == "google_storage_bucket") return "test-9d867.appspot.com"
            if (str == "project_id") return "test-9d867"
            let ret = this.getString(str)
            return ret
        }
    }

    function addCall() {
        var FirebaseRemoteConfig = Java.use("com.google.firebase.remoteconfig.FirebaseRemoteConfig")
        var FirebaseRemoteConfigSettings = Java.use("com.google.firebase.remoteconfig.FirebaseRemoteConfigSettings")
        let FirebaseRemoteConfigSettings_Builder = Java.use("com.google.firebase.remoteconfig.FirebaseRemoteConfigSettings$Builder");

        // FirebaseRemoteConfig mFirebaseRemoteConfig = FirebaseRemoteConfig.getInstance();
        var instance = FirebaseRemoteConfig.getInstance()
        LOGD("instance abc ->" + instance.getString("abc"))
        // FirebaseRemoteConfigSettings configSettings = new FirebaseRemoteConfigSettings.Builder()
        // .setMinimumFetchIntervalInSeconds(3600)
        // .build();
        var configSettings = FirebaseRemoteConfigSettings_Builder.$new().setMinimumFetchIntervalInSeconds(1).build()
        // mFirebaseRemoteConfig.setConfigSettingsAsync(configSettings);
        instance.setConfigSettingsAsync(configSettings)

        let task = instance.fetchAndActivate()
        let isSuccessful = task.isSuccessful()

        let id = setInterval(() => {
            isSuccessful = task.isSuccessful()
            LOGD(task + "  " + isSuccessful)
            if (isSuccessful) {
                LOGD("TestRemoteKey -> " + instance.getString("TestRemoteKey"))
                LOGD("abc ->" + instance.getString("abc"))
                LOGD(instance.getAll().size())
                clearInterval(id)
            }
        }, 2000)
        return isSuccessful
    }
}