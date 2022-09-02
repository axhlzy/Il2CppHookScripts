import { distance } from "fastest-levenshtein"
import { HookerBase } from "../base/base"
import { Breaker } from "../base/breaker"
import { getMethodDesFromMethodInfo, methodToString } from "../bridge/fix/il2cppM"
import { formartClass } from "../utils/formart"

/**
 * 获取APK的一些基本信息
 */
function getApkInfo() {
    Java.perform(() => {
        LOGO(getLine(100))

        let context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext()
        let pkgInfo = context.getPackageManager().getPackageInfo(context.getPackageName(), 0)
        // var appInfo = context.getApplicationInfo()
        let appInfo = pkgInfo.applicationInfo.value

        let labelRes = appInfo.labelRes.value
        let strName = context.getResources().getString(labelRes)
        LOGD("[*]AppName\t\t" + strName + " (UID:" + appInfo.uid.value + ")\t ID:0x" + (appInfo.labelRes.value).toString(16))
        let flags = appInfo.flags.value
        LOGZ("\t\t\tBackupable -> " + ((flags & 32768) != 0) + "\t" + "Debugable -> " + ((flags & 2) != 0))

        let str_pkgName = context.getPackageName()
        LOGD("\n[*]PkgName\t\t" + str_pkgName)

        let verName = pkgInfo.versionName.value
        let verCode = pkgInfo.versionCode.value
        let targetSdkVersion = pkgInfo.applicationInfo.value.targetSdkVersion.value
        LOGD("\n[*]Verison\t\t{ " + verName + " / " + verCode + " }\t(targetSdkVersion:" + targetSdkVersion + ")")

        let appSize = Java.use("java.io.File").$new(appInfo.sourceDir.value).length()
        LOGD("\n[*]AppSize\t\t" + appSize + "\t(" + (appSize / 1024 / 1024).toFixed(2) + " MB)")

        LOGD("\n[*]Time\t\t\tInstallTime\t" + new Date(pkgInfo.firstInstallTime.value).toLocaleString())
        LOGD("\t\t\tUpdateTime\t" + new Date(pkgInfo.lastUpdateTime.value).toLocaleString())

        let ApkLocation = appInfo.sourceDir.value
        let TempFile = appInfo.dataDir.value
        LOGD("\n[*]Location\t\t" + ApkLocation + "\n\t\t\t" + getLibPath() + "\n\t\t\t" + TempFile)

        // PackageManager.GET_SIGNATURES == 0x00000040
        let pis = context.getPackageManager().getPackageInfo(str_pkgName, 0x00000040)
        let hexDigist = (pis.signatures.value)[0].toByteArray()
        LOGD("\n[*]Signatures\t\tMD5\t " + hexdigest(hexDigist, 'MD5') +
            "\n\t\t\tSHA-1\t " + hexdigest(hexDigist, 'SHA-1') +
            "\n\t\t\tSHA-256\t " + hexdigest(hexDigist, 'SHA-256'))
        LOGD("\n[*]unity.build-id\t" + getMetaData('unity.build-id'))
        LOGO(getLine(100))
    })

    function getMetaData(key: string): string {
        // public static final int GET_META_DATA = 0x00000080
        let context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext()
        let appInfo = context.getPackageManager().getApplicationInfo(context.getPackageName(), 0x00000080)
        let metaData = appInfo.metaData.value
        if (null != metaData) {
            // var metaDataB = Java.cast(metaData,Java.use("android.os.BaseBundle"))
            // LOG(metaDataB.mMap.value)
            return metaData.getString(key)
        }
        return "..."
    }

    /**
     * 计算byte字节并转换为String返回
     * @param {*} paramArrayOfByte byte 字节
     * @param {*} algorithm 算法 MD5 / SHA-1 / SHA-256
     */
    function hexdigest(paramArrayOfByte: any, algorithm: string) {
        const hexDigits = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102]
        let localMessageDigest = Java.use("java.security.MessageDigest").getInstance(algorithm)
        localMessageDigest.update(paramArrayOfByte)
        let arrayOfByte = localMessageDigest.digest()
        let arrayOfChar = []
        for (let i = 0, j = 0; ; i++, j++) {
            let strLenth = algorithm == "MD5" ? 16 : (algorithm == "SHA-1" ? 20 : 32)
            if (i >= strLenth) return Java.use("java.lang.String").$new(arrayOfChar)
            let k = arrayOfByte[i]
            arrayOfChar[j] = hexDigits[(0xF & k >>> 4)]
            arrayOfChar[++j] = hexDigits[(k & 0xF)]
        }
    }

    function getLibPath(name: string | undefined = undefined): string {
        let retStr = ""
        Java.perform(() => {
            let context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext()
            let libPath = context.getApplicationInfo().nativeLibraryDir.value
            retStr = libPath + "/" + (name == undefined ? "" : name)
        })
        return retStr
    }
}

// todo ....
function getUnityInfo() {

    let line20 = getLine(20)
    let retStr = undefined

    Application()
    // SystemInfo()
    // Time()
    // Environment()

    // LOG(getLine(60), LogColor.RED)

    function Application() {
        LOGE(`${line20} Application ${line20}`)
        LOGD(`Application.dataPath\t\t${Il2Cpp.Application.dataPath}`)
        LOGD(`Application.persistentDataPath\t${Il2Cpp.Application.persistentDataPath}`)
        LOGD(`Application.streamingAssetsPath\t${Il2Cpp.Application.streamingAssetsPath}`)
        LOGD(`Application.temporaryCachePath\t${Il2Cpp.Application.temporaryCachePath}`)
        LOGD(`Application.unityVersion\t\t${Il2Cpp.Application.unityVersion}`)
        LOGD(`Application.version\t\t${Il2Cpp.Application.version}`)
        LOGD(`Application.identifier\t\t${Il2Cpp.Application.identifier}`)
        LOGD(`Application.companyName\t\t${Il2Cpp.Application.companyName}`)
        LOGD(`Application.productName\t\t${Il2Cpp.Application.productName}`)
    }

    // function Application() {

    //     LOG(`${line20} Application ${line20}`, LogColor.RED)

    //     // public static string cloudProjectId()
    //     retStr = readU16(callFunction(find_method("UnityEngine.CoreModule", "Application", "get_cloudProjectId", 0)))
    //     if (retStr != undefined) LOG("[*] cloudProjectId \t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     // public static string get_productName()
    //     retStr = readU16(callFunction(find_method("UnityEngine.CoreModule", "Application", "get_productName", 0)))
    //     if (retStr != undefined) LOG("[*] productName \t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     // public static extern string get_identifier()
    //     retStr = readU16(callFunction(find_method("UnityEngine.CoreModule", "Application", "get_identifier", 0)))
    //     if (retStr != undefined) LOG("[*] identifier \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     // public static string version()
    //     retStr = readU16(callFunction(find_method("UnityEngine.CoreModule", "Application", "get_version", 0)))
    //     if (retStr != undefined) LOG("[*] version \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     // public static string unityVersion()
    //     retStr = readU16(callFunction(find_method("UnityEngine.CoreModule", "Application", "get_unityVersion", 0)))
    //     if (retStr != undefined) LOG("[*] unityVersion \t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     // public static extern RuntimePlatform get_platform()
    //     retStr = FackKnownType("1", callFunction(find_method("UnityEngine.CoreModule", "Application", "get_platform", 0)), findClass("UnityEngine.CoreModule", "RuntimePlatform"))
    //     if (retStr != undefined) LOG("[*] platform \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     // public static string dataPath()
    //     retStr = readU16(callFunction(find_method("UnityEngine.CoreModule", "Application", "get_dataPath", 0)))
    //     if (retStr != undefined) LOG("[*] dataPath \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     // public static string streamingAssetsPath()
    //     retStr = readU16(callFunction(find_method("UnityEngine.CoreModule", "Application", "get_streamingAssetsPath", 0)))
    //     if (retStr != undefined) LOG("[*] streamingAssetsPath \t: " + retStr + "\n" + line20, LogColor.C36)

    //     // public static string persistentDataPath
    //     retStr = readU16(callFunction(find_method("UnityEngine.CoreModule", "Application", "get_persistentDataPath", 0)))
    //     if (retStr != undefined) LOG("[*] persistentDataPath \t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     // public static NetworkReachability internetReachability()
    //     retStr = FackKnownType("1", callFunction(find_method("UnityEngine.CoreModule", "Application", "get_internetReachability", 0)), findClass("UnityEngine.CoreModule", "NetworkReachability"))
    //     if (retStr != undefined) LOG("[*] internetReachability \t: " + retStr + "\n" + line20, LogColor.C36)

    //     // public static bool get_isMobilePlatform()
    //     retStr = callFunctionRB(find_method("UnityEngine.CoreModule", "Application", "get_isMobilePlatform", 0))
    //     if (retStr != undefined) LOG("[*] isMobilePlatform \t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     // public static bool get_isConsolePlatform()
    //     retStr = callFunctionRB(find_method("UnityEngine.CoreModule", "Application", "get_isConsolePlatform"))
    //     if (retStr != undefined) LOG("[*] isConsolePlatform \t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     // public static bool get_isEditor()
    //     retStr = callFunctionRB(find_method("UnityEngine.CoreModule", "Application", "get_isEditor", 0))
    //     if (retStr != undefined) LOG("[*] isEditor \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     // public static extern bool get_isPlaying()
    //     retStr = callFunctionRB(find_method("UnityEngine.CoreModule", "Application", "get_isPlaying", 0))
    //     if (retStr != undefined) LOG("[*] isPlaying \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     // public static float dpi() 
    //     // retStr = callFunctionRI(find_method("UnityEngine.CoreModule","Screen","get_dpi",0))
    //     // if (retStr != undefined) LOG("[*] Dpi \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     // public static extern int get_height()
    //     // public static extern int get_width()
    //     var height = callFunction(find_method("UnityEngine.CoreModule", "Screen", "get_height", 0)).toInt32()
    //     var width = callFunction(find_method("UnityEngine.CoreModule", "Screen", "get_width", 0)).toInt32()
    //     if (height != 0 && width != 0) LOG("[*] height*width \t\t: " + height + " × " + width + "\n" + line20, LogColor.C36)

    //     // public static extern FullScreenMode get_fullScreenMode()
    //     retStr = FackKnownType("1", callFunction(find_method("UnityEngine.CoreModule", "Screen", "get_fullScreenMode", 0)), findClass("UnityEngine.CoreModule", "FullScreenMode"))
    //     if (retStr != undefined) LOG("[*] FullScreenMode \t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     // public static ScreenOrientation get_orientation()
    //     retStr = FackKnownType("1", callFunction(find_method("UnityEngine.CoreModule", "Screen", "get_orientation", 0)), findClass("UnityEngine.CoreModule", "ScreenOrientation"))
    //     if (retStr != undefined) LOG("[*] ScreenOrientation \t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     // public static extern SystemLanguage get_systemLanguage()
    //     retStr = FackKnownType("1", callFunction(find_method("UnityEngine.CoreModule", "Application", "get_systemLanguage", 0)), findClass("UnityEngine.CoreModule", "SystemLanguage"))
    //     if (retStr != undefined) LOG("[*] SystemLanguage \t\t: " + retStr + "\n" + line20, LogColor.C36)

    // }

    // function SystemInfo() {

    //     LOGE(`${line20} SystemInfo ${line20}`)

    //     retStr = FackKnownType("1", callFunction(find_method("UnityEngine.CoreModule", "SystemInfo", "get_copyTextureSupport", 0)), findClass("UnityEngine.CoreModule", "CopyTextureSupport"))
    //     if (retStr != undefined && retStr != "") LOG("[*] copyTextureSupport \t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = readU16(callFunction(find_method("UnityEngine.CoreModule", "SystemInfo", "get_deviceModel", 0)))
    //     if (retStr != undefined && retStr != "") LOG("[*] deviceModel \t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = readU16(callFunction(find_method("UnityEngine.CoreModule", "SystemInfo", "get_deviceName", 0)))
    //     if (retStr != undefined && retStr != "") LOG("[*] deviceName \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = readU16(callFunction(find_method("UnityEngine.CoreModule", "SystemInfo", "get_graphicsDeviceVendor", 0)))
    //     if (retStr != undefined && retStr != "") LOG("[*] graphicsDeviceVendor \t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = callFunctionRB(find_method("UnityEngine.CoreModule", "SystemInfo", "get_graphicsUVStartsAtTop", 0))
    //     if (retStr != undefined) LOG("[*] graphicsUVStartsAtTop \t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = callFunctionRB(find_method("UnityEngine.CoreModule", "SystemInfo", "get_hasHiddenSurfaceRemovalOnGPU ", 0))
    //     if (retStr != undefined) LOG("[*] HiddenSurfaceRemovalOnGPU \t: " + retStr + "\n" + line20, LogColor.C36)

    //     // retStr = FackKnownType("1", callFunction(find_method("UnityEngine.CoreModule", "SystemInfo", "get_graphicsDeviceType", 0)), findClass("UnityEngine.CoreModule", "GraphicsDeviceType"))
    //     // if (retStr != undefined && retStr != "") LOG("[*] graphicsDeviceType \t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = FackKnownType("1", callFunction(find_method("UnityEngine.CoreModule", "SystemInfo", "get_deviceType", 0)), findClass("UnityEngine.CoreModule", "DeviceType"))
    //     if (retStr != undefined && retStr != "") LOG("[*] deviceType \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = readU16(callFunction(find_method("UnityEngine.CoreModule", "SystemInfo", "get_deviceUniqueIdentifier", 0)))
    //     if (retStr != undefined && retStr != "") LOG("[*] deviceUniqueIdentifier \t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = readU16(callFunction(find_method("UnityEngine.CoreModule", "SystemInfo", "get_graphicsDeviceID", 0)))
    //     if (retStr != undefined && retStr != "") LOG("[*] graphicsDeviceID \t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = readU16(callFunction(find_method("UnityEngine.CoreModule", "SystemInfo", "get_graphicsDeviceName", 0)))
    //     if (retStr != undefined && retStr != "") LOG("[*] graphicsDeviceName \t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = readU16(callFunction(find_method("UnityEngine.CoreModule", "SystemInfo", "get_graphicsDeviceVersion", 0)))
    //     if (retStr != undefined && retStr != "") LOG("[*] graphicsDeviceVersion \t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = callFunction(find_method("UnityEngine.CoreModule", "SystemInfo", "get_graphicsShaderLevel", 0)).toInt32()
    //     if (retStr != undefined && retStr != "") LOG("[*] graphicsShaderLevel \t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = callFunctionRI(find_method("UnityEngine.CoreModule", "SystemInfo", "get_graphicsMemorySize", 0))
    //     if (retStr != undefined && retStr != "") LOG("[*] graphicsMemorySize \t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = callFunctionRI(find_method("UnityEngine.CoreModule", "SystemInfo", "get_maxTextureSize", 0))
    //     if (retStr != undefined && retStr != "") LOG("[*] maxTextureSize \t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = readU16(callFunction(find_method("UnityEngine.CoreModule", "SystemInfo", "get_operatingSystem", 0)))
    //     if (retStr != undefined && retStr != "") LOG("[*] operatingSystem \t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = readU16(callFunction(find_method("UnityEngine.CoreModule", "SystemInfo", "get_processorType", 0)))
    //     if (retStr != undefined && retStr != "") LOG("[*] processorType \t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = callFunction(find_method("UnityEngine.CoreModule", "SystemInfo", "get_systemMemorySize", 0)).toInt32() + " MB"
    //     if (retStr != undefined && retStr != "") LOG("[*] systemMemorySize \t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = FackKnownType("1", callFunction(find_method("UnityEngine.CoreModule", "SystemInfo", "get_operatingSystemFamily", 0)), findClass("UnityEngine.CoreModule", "OperatingSystemFamily"))
    //     if (retStr != undefined && retStr != "") LOG("[*] operatingSystemFamily \t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = callFunctionRI(find_method("UnityEngine.CoreModule", "SystemInfo", "get_supportedRenderTargetCount", 0))
    //     if (retStr != undefined && retStr != "") LOG("[*] supportedRenderTargetCount \t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = callFunctionRI(find_method("UnityEngine.CoreModule", "SystemInfo", "get_supportsMultisampledTextures", 0))
    //     if (retStr != undefined && retStr != "") LOG("[*] supportsMultisampledTextures \t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = callFunctionRB(find_method("UnityEngine.CoreModule", "SystemInfo", "get_supportsGraphicsFence", 0))
    //     if (retStr != undefined && retStr != "") LOG("[*] supportsGraphicsFence \t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = callFunctionRB(find_method("UnityEngine.CoreModule", "SystemInfo", "get_supportsMultisampleAutoResolve", 0))
    //     if (retStr != undefined && retStr != "") LOG("[*] supportsMultisampleAutoResolve \t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = callFunctionRB(find_method("UnityEngine.CoreModule", "SystemInfo", "get_supportsMultisampledTextures", 0))
    //     if (retStr != undefined && retStr != "") LOG("[*] supportsMultisampledTextures \t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = callFunctionRB(find_method("UnityEngine.CoreModule", "SystemInfo", "get_supportsMultiview", 0))
    //     if (retStr != undefined && retStr != "") LOG("[*] supportsMultiview \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = callFunctionRB(find_method("UnityEngine.CoreModule", "SystemInfo", "get_supportsShadows", 0))
    //     if (retStr != undefined && retStr != "") LOG("[*] supportsShadows \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = callFunctionRB(find_method("UnityEngine.CoreModule", "SystemInfo", "get_supportsStoreAndResolveAction", 0))
    //     if (retStr != undefined && retStr != "") LOG("[*] supportsStoreAndResolveAction \t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = callFunctionRB(find_method("UnityEngine.CoreModule", "SystemInfo", "get_usesReversedZBuffer", 0))
    //     if (retStr != undefined && retStr != "") LOG("[*] usesReversedZBuffer \t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = callFunctionRB(find_method("UnityEngine.CoreModule", "SystemInfo", "get_supportsRenderTargetArrayIndexFromVertexShader", 0))
    //     if (retStr != undefined && retStr != "") LOG("[*] supportsRenderTargetArrayIndexFromVertexShader \t: " + retStr + "\n" + line20, LogColor.C36)
    // }

    // function Time() {

    //     LOG(`${line20} TIME ${line20}`, LogColor.RED)

    //     // public static extern float get_time()
    //     retStr = callFunctionRS(find_method("UnityEngine.CoreModule", "Time", "get_time", 0))
    //     if (retStr != undefined && retStr != 0x0) LOG("[*] get_time \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     // public static extern float deltaTime()
    //     retStr = callFunctionRS(find_method("UnityEngine.CoreModule", "Time", "get_deltaTime", 0))
    //     if (retStr != undefined && retStr != 0x0) LOG("[*] deltaTime \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     // public static extern float get_fixedDeltaTime()
    //     retStr = callFunctionRS(find_method("UnityEngine.CoreModule", "Time", "get_fixedDeltaTime", 0))
    //     if (retStr != undefined && retStr != 0x0) LOG("[*] fixedDeltaTime \t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     // get_realtimeSinceStartup() : Single
    //     retStr = callFunctionRS(find_method("UnityEngine.CoreModule", "Time", "get_realtimeSinceStartup", 0))
    //     if (retStr != undefined && retStr != 0x0) LOG("[*] realtimeSinceStartup \t: " + retStr + "\n" + line20, LogColor.C36)

    //     // get_smoothDeltaTime() : Single
    //     retStr = callFunctionRS(find_method("UnityEngine.CoreModule", "Time", "get_smoothDeltaTime", 0))
    //     if (retStr != undefined && retStr != 0x0) LOG("[*] smoothDeltaTime \t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     // get_timeScale() : Single
    //     retStr = callFunctionRS(find_method("UnityEngine.CoreModule", "Time", "get_timeScale", 0))
    //     if (retStr != undefined && retStr != 0x0) LOG("[*] timeScale \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     // get_timeSinceLevelLoad() : Single
    //     retStr = callFunctionRS(find_method("UnityEngine.CoreModule", "Time", "get_timeSinceLevelLoad", 0))
    //     if (retStr != undefined && retStr != 0x0) LOG("[*] timeSinceLevelLoad \t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     // get_unscaledDeltaTime() : Single
    //     retStr = callFunctionRS(find_method("UnityEngine.CoreModule", "Time", "get_unscaledDeltaTime", 0))
    //     if (retStr != undefined && retStr != 0x0) LOG("[*] unscaledDeltaTime \t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     // get_unscaledTime() : Single
    //     retStr = callFunctionRS(find_method("UnityEngine.CoreModule", "Time", "get_unscaledTime", 0))
    //     if (retStr != undefined && retStr != 0x0) LOG("[*] unscaledTime \t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     // public static extern float get_fixedTime()
    //     retStr = callFunction(find_method("UnityEngine.CoreModule", "Time", "get_fixedTime", 0))
    //     if (retStr != undefined && retStr != 0x0) LOG("[*] fixedTime \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     // public static extern int get_frameCount()
    //     retStr = callFunction(find_method("UnityEngine.CoreModule", "Time", "get_frameCount", 0)).toInt32()
    //     if (retStr != undefined && retStr != 0x0) LOG("[*] frameCount \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     // public static extern float get_inFixedTimeStep()
    //     retStr = callFunction(find_method("UnityEngine.CoreModule", "Time", "get_inFixedTimeStep", 0))
    //     if (retStr != undefined && retStr != 0x0) LOG("[*] inFixedTimeStep \t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     // public static extern float realtimeSinceStartup()
    //     retStr = callFunction(find_method("UnityEngine.CoreModule", "Time", "realtimeSinceStartup", 0))
    //     if (retStr != undefined && retStr != 0x0) LOG("[*] realtimeSinceStartup \t: " + retStr + "\n" + line20, LogColor.C36)

    //     // public static extern float get_renderedFrameCount()
    //     retStr = callFunction(find_method("UnityEngine.CoreModule", "Time", "get_renderedFrameCount", 0))
    //     if (retStr != undefined && retStr != 0x0) LOG("[*] renderedFrameCount \t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     // public static float smoothDeltaTime()
    //     retStr = callFunction(find_method("UnityEngine.CoreModule", "Time", "smoothDeltaTime", 0))
    //     if (retStr != undefined && retStr != 0x0) LOG("[*] smoothDeltaTime \t\t: " + retStr + "\n" + line20, LogColor.C36)
    // }

    // function Environment() {

    //     LOG(`${line20} Environment ${line20}`, LogColor.RED)

    //     // retStr = callFunction(find_method("mscorlib", "Environment", "get_CurrentManagedThreadId", 0)).toInt32()
    //     // if (retStr != undefined) LOG("[*] CurrentManagedThreadId \t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = readU16(callFunction(find_method("mscorlib", "Environment", "GetOSVersionString", 0)))
    //     if (retStr != undefined) LOG("[*] OSVersionString \t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = readU16(callFunction(find_method("mscorlib", "Environment", "GetMachineConfigPath", 0)))
    //     if (retStr != undefined) LOG("[*] MachineConfigPath \t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = callFunction(find_method("mscorlib", "Environment", "GetPageSize", 0)).toInt32()
    //     if (retStr != undefined) LOG("[*] PageSize \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = callFunctionRB(find_method("mscorlib", "Environment", "get_HasShutdownStarted", 0))
    //     if (retStr != undefined) LOG("[*] HasShutdownStarted \t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = callFunctionRB(find_method("mscorlib", "Environment", "get_Is64BitProcess", 0))
    //     if (retStr != undefined) LOG("[*] Is64BitProcess \t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = callFunctionRB(find_method("mscorlib", "Environment", "get_IsRunningOnWindows", 0))
    //     if (retStr != undefined) LOG("[*] IsRunningOnWindows \t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     // retStr = readU16(callFunction(find_method("mscorlib", "Environment", "get_NewLine", 0)))
    //     // if (retStr != undefined) LOG("[*] NewLine \t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = FackKnownType("1", callFunction(find_method("mscorlib", "OperatingSystem", "get_Platform", 0), callFunction(find_method("mscorlib", "Environment", "get_OSVersion", 0))), findClass("mscorlib", "PlatformID"))
    //     if (retStr != undefined) LOG("[*] PlatformID \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = callFunction(find_method("mscorlib", "Environment", "get_ProcessorCount", 0)).toInt32()
    //     if (retStr != undefined) LOG("[*] processorCount \t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = callFunction(find_method("mscorlib", "Environment", "get_TickCount", 0)).toInt32()
    //     if (retStr != undefined) LOG("[*] TickCount \t\t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = readU16(callFunction(find_method("mscorlib", "Environment", "get_MachineName", 0)))
    //     if (retStr != undefined) LOG("[*] MachineName \t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = readU16(callFunction(find_method("mscorlib", "Environment", "get_UserDomainName", 0)))
    //     if (retStr != undefined) LOG("[*] UserDomainName \t\t: " + retStr + "\n" + line20, LogColor.C36)

    //     retStr = readU16(callFunction(find_method("mscorlib", "Environment", "get_UserName", 0)))
    //     if (retStr != undefined) LOG("[*] UserName \t\t\t: " + retStr + "\n" + line20, LogColor.C36)
    // }
}

let allMethodsCacheArray: Array<Il2Cpp.Method> = new Array<Il2Cpp.Method>() // all methods cache
const cacheMethods = (withLog: boolean = true) => {
    if (allMethodsCacheArray.length > 0) return
    if (withLog) LOGZ("Caching methods ...")
    let timeCurrent = Date.now()
    Il2Cpp.Domain.assemblies.forEach((assembly: Il2Cpp.Assembly) => {
        assembly.image.classes.forEach((klass: Il2Cpp.Class) => {
            klass.methods.forEach((item: Il2Cpp.Method) => allMethodsCacheArray.push(item))
        })
    })
    if (withLog) LOGZ(`Caching methods done. ${allMethodsCacheArray.length} Methods . cost ${Date.now() - timeCurrent} ms\n`)
}

// filter and show useful address
const printExp = (filter: string = "", findAll: boolean = false, formartMaxLine: number = -1, retArr: boolean = false): void | Array<Il2Cpp.Method> => {

    let countIndex: number = -1
    let arrStrResult: Array<string> = new Array<string>()
    let arrPtrResult: Array<Il2Cpp.Method> = new Array<Il2Cpp.Method>()
    let enterTime: number = Date.now()

    // libil2cpp.so common export function
    findExport("il2cpp_", "libil2cpp.so", (item: ModuleExportDetails) => {
        if (item.type == "function" && item.name.toLocaleLowerCase().includes(filter.toLowerCase())) formartAndSaveModuleDetails(item)
    })

    findExport("", "libunity.so", (item: ModuleExportDetails) => {
        if (item.type == "function" && item.name.toLocaleLowerCase().includes(filter.toLowerCase())) formartAndSaveModuleDetails(item)
    })

    // 查找所有函数
    if (findAll) {
        if (allMethodsCacheArray.length == 0) cacheMethods()
        allMethodsCacheArray
            .filter((item: Il2Cpp.Method) => item.name.toLocaleLowerCase().includes(filter.toLowerCase()))
            .forEach(formartAndSaveIl2cppMehods)
    }
    // 查找常用的一些函数
    else {
        new Il2Cpp.Class(findClass("Text")).methods.forEach((item: Il2Cpp.Method) => {
            if (item.name.toLocaleLowerCase().includes(filter.toLowerCase())) formartAndSaveIl2cppMehods(item)
        })

        new Il2Cpp.Class(findClass("Transform")).methods.forEach((item: Il2Cpp.Method) => {
            if (item.name.toLocaleLowerCase().includes(filter.toLowerCase())) formartAndSaveIl2cppMehods(item)
        })

        new Il2Cpp.Class(findClass("GameObject")).methods.forEach((item: Il2Cpp.Method) => {
            if (item.name.toLocaleLowerCase().includes(filter.toLowerCase())) formartAndSaveIl2cppMehods(item)
        })

        new Il2Cpp.Class(findClass("Application")).methods.forEach((item: Il2Cpp.Method) => {
            if (item.name.toLocaleLowerCase().includes(filter.toLowerCase())) formartAndSaveIl2cppMehods(item)
        })

        new Il2Cpp.Class(findClass("Input")).methods.forEach((item: Il2Cpp.Method) => {
            if (item.name.toLocaleLowerCase().includes(filter.toLowerCase())) formartAndSaveIl2cppMehods(item)
        })

        new Il2Cpp.Class(findClass("PlayerPrefs")).methods.forEach((item: Il2Cpp.Method) => {
            if (item.name.toLocaleLowerCase().includes(filter.toLowerCase())) formartAndSaveIl2cppMehods(item)
        })

        new Il2Cpp.Class(findClass("Object", ["UnityEngine.CoreModule"], false)).methods.forEach((item: Il2Cpp.Method) => {
            if (item.name.toLocaleLowerCase().includes(filter.toLowerCase())) formartAndSaveIl2cppMehods(item)
        })

        new Il2Cpp.Class(findClass("Object", ["mscorlib"], false)).methods.forEach((item: Il2Cpp.Method) => {
            if (item.name.toLocaleLowerCase().includes(filter.toLowerCase())) formartAndSaveIl2cppMehods(item)
        })
    }

    if (retArr) return arrPtrResult

    newLine()
    arrStrResult.sort(distance).forEach(LOGD)
    LOGZ(`\nTake ${Date.now() - enterTime}ms to find ${arrStrResult.length} ${arrStrResult.length <= 1 ? "result" : "results"}`)
    if (formartMaxLine != -1 && formartMaxLine < 100) LOGZ(`\n${formartMaxLine} lines of results are shown recommended to be greater than 100`)
    newLine(1)

    function formartAndSaveModuleDetails(item: ModuleExportDetails) {
        if (retArr) return
        let index = formartClass.alignStr(`[${++countIndex}]`, 6)
        let result = `${index} ${formartClass.alignStr(item.address, p_size * 4)}  --->   ${item.address.sub(soAddr)}\t${item.name}`
        if (formartMaxLine != -1 && formartMaxLine > 10) result = formartClass.alignStr(result, formartMaxLine)
        arrStrResult.push(result)
    }

    function formartAndSaveIl2cppMehods(item: Il2Cpp.Method) {
        if (retArr) {
            arrPtrResult.push(item)
            return
        }
        let index = formartClass.alignStr(`[${++countIndex}]`, 6)
        let result = `${index} ${formartClass.alignStr(item.handle, p_size * 4)}  --->   ${item.relativeVirtualAddress}\t${item.class.name}( ${item.class.handle} ) | ${getMethodDesFromMethodInfo(item)}`
        if (formartMaxLine != -1 && formartMaxLine > 10) result = formartClass.alignStr(result, formartMaxLine)
        arrStrResult.push(result)
    }
}

const AddressToMethod = (mPtr: NativePointer, withLog: boolean = true): Il2Cpp.Method => {
    allMethodsCacheArray.length == 0 ? cacheMethods(withLog) : null
    if (typeof mPtr == "string" && String(mPtr).startsWith("0x")) mPtr = ptr(mPtr)
    if (typeof mPtr == "number") mPtr = ptr(mPtr)
    let result = allMethodsCacheArray.find((item: Il2Cpp.Method) => item.virtualAddress.equals(mPtr) || item.relativeVirtualAddress.equals(mPtr))
    if (result) return result
    throw new Error(`Can't find method by address ${mPtr}`)
}

const AddressToMethodNoException = (mPtr: NativePointer, withLog: boolean = false): Il2Cpp.Method | null => {
    try {
        return AddressToMethod(mPtr, withLog)
    } catch { return null }
}

const AddressToMethodToString = (mPtr: NativePointer, simple: boolean = true): void => {
    if (simple) return HookerBase.MethodToShow(AddressToMethod(mPtr))
    let method: Il2Cpp.Method = AddressToMethod(mPtr)
    let ImageName = method.class.image.name
    let NameSpace = method.class.namespace
    let MethodName = method.class.name
    let maxLen = Math.max(ImageName.length, NameSpace.length, MethodName.length) + 1
    ImageName = formartClass.alignStr(ImageName, maxLen)
    NameSpace = formartClass.alignStr(NameSpace, maxLen)
    MethodName = formartClass.alignStr(MethodName, maxLen)
    let line1 = `image\t\t${ImageName} @ ${method.class.image.handle}`
    let line2 = `namespace\t${NameSpace.trim().length == 0 ? formartClass.centerStr("---", maxLen) : NameSpace} @ ${method.class.handle}`
    let line3 = `class\t\t${MethodName} @ ${method.class.handle}`
    let line4 = `methodInfo\t${method.handle} -> ${method.virtualAddress} -> ${method.relativeVirtualAddress}`
    let line5 = `methodName\t${getMethodDesFromMethodInfo(method)}`
    let maxDispLen = Math.max(line1.length, line2.length, line3.length, line4.length, line5.length) + 4
    LOGW(getLine(maxDispLen))
    LOGD(`${line1}\n${line2}\n${line3}\n${line4}\n${line5}`)
    LOGW(getLine(maxDispLen))
}

/**
 * 用包名启动 APK
 * @param {String} pkgName 
 */
const launchApp = (pkgName: string): void => Java.perform(() => {
    let context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext()
    context.startActivity(Java.use("android.content.Intent").$new(context.getPackageManager().getLaunchIntentForPackage(pkgName)));
})

globalThis.bp = (filterName: string, breakMethodInfo: boolean = false) => {
    (printExp(filterName, true, -1, true) as Array<Il2Cpp.Method>)
        .forEach((item: Il2Cpp.Method) => {
            if (!item.virtualAddress.isNull()) breakMethodInfo ? b(item.handle) : Breaker.attachMethod(item)
        })
}

export { getApkInfo, launchApp, cacheMethods }

Reflect.set(globalThis, "launchApp", launchApp)
Reflect.set(globalThis, "getApkInfo", getApkInfo)
Reflect.set(globalThis, "printExp", printExp)
Reflect.set(globalThis, "getUnityInfo", getUnityInfo)
Reflect.set(globalThis, "AddressToMethod", AddressToMethod)
Reflect.set(globalThis, "AddressToMethodToString", AddressToMethodToString)
Reflect.set(globalThis, "AddressToMethodNoException", AddressToMethodNoException)

declare global {
    var launchApp: (pkgName: string) => void
    var getApkInfo: () => void
    var printExp: (filter: string, findAll?: boolean, formartMaxLine?: number) => void | Array<Il2Cpp.Method>
    var getUnityInfo: () => void
    var bp: (filterName: string, breakMethodInfo?: boolean) => void
    var AddressToMethod: (mPtr: NativePointer, withLog?: boolean) => Il2Cpp.Method
    var AddressToMethodToString: (mPtr: NativePointer) => void
    var AddressToMethodNoException: (mPtr: NativePointer, withLog?: boolean) => Il2Cpp.Method | null
}