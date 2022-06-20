import { LogColor } from "../base/enum"

/**
 * 获取APK的一些基本信息
 */
function getApkInfo() {
    Java.perform(() => {
        LOG(getLine(100), LogColor.C33)

        var context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext()
        var pkgInfo = context.getPackageManager().getPackageInfo(context.getPackageName(), 0)
        // var appInfo = context.getApplicationInfo()
        let appInfo = pkgInfo.applicationInfo.value

        let labelRes = appInfo.labelRes.value
        let strName = context.getResources().getString(labelRes)
        LOG("[*]AppName\t\t" + strName + " (UID:" + appInfo.uid.value + ")\t ID:0x" + (appInfo.labelRes.value).toString(16), LogColor.C36)
        let flags = appInfo.flags.value
        LOG("\t\t\tBackupable -> " + ((flags & 32768) != 0) + "\t" + "Debugable -> " + ((flags & 2) != 0), LogColor.C36)

        let str_pkgName = context.getPackageName()
        LOG("\n[*]PkgName\t\t" + str_pkgName, LogColor.C36)

        var verName = pkgInfo.versionName.value
        var verCode = pkgInfo.versionCode.value
        var targetSdkVersion = pkgInfo.applicationInfo.value.targetSdkVersion.value
        LOG("\n[*]Verison\t\t{ " + verName + " / " + verCode + " }\t(targetSdkVersion:" + targetSdkVersion + ")", LogColor.C36)

        let appSize = Java.use("java.io.File").$new(appInfo.sourceDir.value).length()
        LOG("\n[*]AppSize\t\t" + appSize + "\t(" + (appSize / 1024 / 1024).toFixed(2) + " MB)", LogColor.C36)

        LOG("\n[*]Time\t\t\tInstallTime\t" + new Date(pkgInfo.firstInstallTime.value).toLocaleString(), LogColor.C36)
        LOG("\t\t\tUpdateTime\t" + new Date(pkgInfo.lastUpdateTime.value).toLocaleString(), LogColor.C36)

        let ApkLocation = appInfo.sourceDir.value
        let TempFile = appInfo.dataDir.value
        LOG("\n[*]Location\t\t" + ApkLocation + "\n\t\t\t" + getLibPath() + "\n\t\t\t" + TempFile, LogColor.C36)

        // PackageManager.GET_SIGNATURES == 0x00000040
        let pis = context.getPackageManager().getPackageInfo(str_pkgName, 0x00000040)
        let hexDigist = (pis.signatures.value)[0].toByteArray()
        LOG("\n[*]Signatures\t\tMD5\t " + hexdigest(hexDigist, 'MD5') +
            "\n\t\t\tSHA-1\t " + hexdigest(hexDigist, 'SHA-1') +
            "\n\t\t\tSHA-256\t " + hexdigest(hexDigist, 'SHA-256'), LogColor.C36)
        LOG("\n[*]unity.build-id\t" + getMetaData('unity.build-id'), LogColor.C36)
        LOG(getLine(100), LogColor.C33)

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

/**
 * 用包名启动 APK
 * @param {String} pkgName 
 */
var launchApp = (pkgName: string): void => Java.perform(() => {
    let context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext()
    context.startActivity(Java.use("android.content.Intent").$new(context.getPackageManager().getLaunchIntentForPackage(pkgName)));
})

export { getApkInfo, launchApp }

Reflect.set(globalThis, "launchApp", launchApp)
Reflect.set(globalThis, "getApkInfo", getApkInfo)

declare global {
    var launchApp: (pkgName: string) => void
    var getApkInfo: () => void
}