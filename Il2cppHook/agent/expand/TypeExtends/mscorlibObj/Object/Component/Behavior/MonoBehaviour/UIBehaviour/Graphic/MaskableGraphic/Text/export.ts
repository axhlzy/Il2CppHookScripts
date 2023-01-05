import { filterDuplicateOBJ } from "../../../../../../../../../../../utils/common"

// public static Void TrackText (Text t)
// a(findClass("TextMesh"))
// 用作查找拼接后的字符串
// find_method("mscorlib","String","Format",3)
// a(findClass("String"))
// find_method("UnityEngine.UI","Text","get_text",0,false)
// FindObjectsOfType("TextMeshProUGUI")
// \n 0x0A | \r 0x0D | \t 0x09 | [空格] 0x20 | [换行] 0x0D 0x0A
const B_Text = (): void => {

    let mapRecord = new Map()
    let strMap = new Map()

    strMap.set("SETTINGS", "设置")
    strMap.set("選擇角色", "选择角色")
    strMap.set("ADDED", "已添加")
    strMap.set("ON", "开")
    strMap.set("Loading...", "加载中...")
    strMap.set("More games", "更多游戏")

    try {
        LOGD("Enable TMP_Text Hook".padEnd(30, " ") + "| class : " + findClass("TMP_Text"))
        TMP_Text(false)
    } catch {
        LOGE("Unity.TextMeshPro.TMP_Text.get_transform NOT FOUND !")
    }

    try {
        LOGD("Enable TextMeshPro Hook".padEnd(30, " ") + "| class : " + findClass("TextMeshPro"))
        TextMeshPro()
    } catch {
        LOGE("Unity.TextMeshPro.TextMeshPro.get_transform NOT FOUND !")
    }

    try {
        LOGD("Enable Text Hook".padEnd(30, " ") + "| class : " + findClass("Text"))
        UnityEngine_UI_Text(false)
    } catch {
        LOGE("UnityEngine.UI.Text.get_text/set_text NOT FOUND!")
    }

    try {
        LOGD("Enable TrackText Hook".padEnd(30, " ") + "| class : " + findClass("FontUpdateTracker"))
        HookTrackText()
    } catch {
        LOGE("UnityEngine.UI.FontUpdateTracker.TrackText NOT FOUND !")
    }

    try {
        LOGD("Enable Print Hook".padEnd(30, " ") + "| class : " + findClass("NGUIText"))
        HookPrint()
    } catch {
        LOGE("NGUIText.Print NOT FOUND !")
    }

    function TMP_Text(showGobj: boolean) {
        A(find_method("Unity.TextMeshPro", "TMP_Text", "get_transform", 0), (args, ctx) => {
            let aimStr = "|" + readU16(callFunction(["Unity.TextMeshPro", "TMP_Text", "get_text", 0], args[0])) + "|"
            if (filterDuplicateOBJ(String(args[0]), 30) == -1) return
            worksWithText(args[0], "TMP_Text")
            LOGD("\n[TMP_Text]  " + args[0] + "\t" + aimStr + "\t" + getPlatformCtx(ctx).lr)
            if (strMap.size != 0) {
                let repStr = strMap.get(aimStr.substring(1, aimStr.length - 1))
                if (repStr != undefined) {
                    callFunction(find_method("Unity.TextMeshPro", "TMP_Text", "set_text", 1), args[0], allocCStr(repStr))
                    LOGH(" \n\t {REP} " + aimStr + " ---> " + repStr)
                }
                if (showGobj != undefined && showGobj == true) {
                    showGameObject(args[0])
                }
            }
        })
    }

    function TextMeshPro() {
        // A(find_method("Unity.TextMeshPro", "TextMeshPro", "get_transform", 0), (args) => {
        A(Il2Cpp.Api.TextMeshPro._get_transform, (args) => {
            let aimStr = "|" + new Il2Cpp.TMP_Text(args[0]).get_text() + "|"
            if (filterDuplicateOBJ(String(args[0])) == -1) return
            worksWithText(args[0], "TextMeshPro")
            LOG("\n[TextMeshPro]  " + args[0] + "\t" + aimStr, LogColor.C35)
            if (strMap.size != 0) {
                let repStr = strMap.get(aimStr.substring(1, aimStr.length - 1))
                if (repStr != undefined) {
                    callFunction(find_method("Unity.TextMeshPro", "TextMeshPro", "set_text", 1), args[0], allocCStr(repStr))
                    LOGH(" \n\t {REP} " + aimStr + " ---> " + repStr)
                }
            }
        })
    }

    function UnityEngine_UI_Text(showGameObj: boolean) {
        if (showGameObj == undefined) showGameObj = false;
        // A(find_method("UnityEngine.UI", "Text", "get_text", 0), (args) => {
        A(Il2Cpp.Api.Text._get_text, (args) => {
            worksWithText(args[0], "Text")
            if (showGameObj) new Il2Cpp.Component(args[0]).get_gameObject().showSelf()
        }, (ret, ctx) => {
            let aimStr = "|" + readU16(ret) + "|"
            if (filterDuplicateOBJ(String(ret)) == -1) return
            getPlatformCtx
            LOGG("\n[Text_Get]  " + getPlatformCtxWithArgV(ctx, 0) + "\t" + aimStr)
            if (strMap.size != 0) {
                let repStr = strMap.get(aimStr.substring(1, aimStr.length - 1))
                if (repStr != undefined) {
                    ret.replace(allocUStr(repStr))
                    // callFunction(find_method("UnityEngine.UI", 'Text', 'set_text', 1), p_size == 4 ? ctx.r0 : ctx.x0, allocStr(repStr, ""))
                    LOGH(` \n\t {REP} ${aimStr} ---> ${repStr}`)
                }
            }
        })

        // A(find_method("UnityEngine.UI", "Text", "set_text", 1), (args, ctx) => {
        A(Il2Cpp.Api.Text._set_text, (args, ctx) => {
            if (filterDuplicateOBJ(String(args[1])) == -1) return
            worksWithText(args[0], "Text")
            let aimStr = "|" + readU16(args[1]) + "|"
            LOGO("\n[Text_Set]  " + args[0] + "\t" + aimStr)
            if (strMap.size != 0) {
                let repStr = strMap.get(aimStr.substring(1, aimStr.length - 1))
                if (repStr != undefined) {
                    args[1] = allocUStr(repStr)
                    LOGH(` \n\t {REP} ${aimStr} ---> ${repStr}`)
                }
                if (showGameObj)
                    // showGameObject(callFunction(["UnityEngine.CoreModule", "Component", "get_gameObject", 0], args[0]))
                    new Il2Cpp.Component(args[0]).get_gameObject().showSelf()
            }
        })
    }

    function HookTrackText() {
        A(find_method('UnityEngine.UI', 'FontUpdateTracker', 'TrackText', 1), (args) => {
            let aimStr = "|" + callFunctionRUS(["UnityEngine.UI", 'Text', 'get_text', 0], args[0]) + "|"
            if (filterDuplicateOBJ(String(callFunctionRUS(["UnityEngine.UI", 'Text', 'get_text', 0], args[0]))) == -1) return
            LOGD(`\n[FontUpdateTracker] ${args[0]} \t ${aimStr}`)
            worksWithText(args[0], "Text")
            if (strMap.size != 0) {
                let repStr = strMap.get(aimStr.substring(1, aimStr.length - 1))
                if (repStr != undefined) {
                    args[1] = allocUStr(repStr)
                    LOGH(` \n\t {REP} ${aimStr} ---> ${repStr}`)
                }
            }
        })
    }

    function HookPrint() {
        A(find_method('Assembly-CSharp', 'NGUIText', 'Print', 4), (args) => {
            let aimStr = "|" + readU16(args[0]) + "|"
            if (filterDuplicateOBJ(aimStr) == -1) return
            LOGD(`\n[NGUIText] ${args[0]} \t ${aimStr}`)
            worksWithText(args[0], "Text", true)
            if (strMap.size != 0) {
                let repStr = strMap.get(aimStr.substring(1, aimStr.length - 1))
                if (repStr != undefined) {
                    args[0] = allocUStr(repStr)
                    LOGH(` \n\t {REP} ${aimStr} ---> ${repStr}`)
                }
            }
        })
    }

    function TMP() {
        let get_Ins = find_method("Unity.TextMeshPro", "TMP_Settings", "get_instance", 0)
        if (get_Ins.isNull()) return
        let INS: NativePointer = ptr(0)
        A(get_Ins, () => { }, (ret) => {
            INS = ret
            d(get_Ins)
            LOGD(`[*] TMPro.TMP_Settings ---> ${ret}`)
            let TMP_FontAsset = callFunction(find_method("Unity.TextMeshPro", "TMP_Settings", "get_defaultFontAsset", 0), INS)
            // lffc(findClass("TMP_FontAsset"), TMP_FontAsset)
            lfs(TMP_FontAsset)
            let faceInfo = callFunction(find_method("Unity.TextMeshPro", "TMP_FontAsset", "get_fontInfo", 0), TMP_FontAsset)
            // lffc(findClass("FaceInfo_Legacy"), faceInfo)
            lfs(faceInfo)
        })
    }

    function worksWithText(textPtr: NativePointer, typeStr: string, printHex: boolean = false) {
        if (mapRecord.get(typeStr) == null) {
            mapRecord.set(typeStr, 1)
            getTypeParent(textPtr)
        }
        if (printHex) {
            try {
                let startPtr = textPtr.add(p_size * 2)
                let endPtr = Memory.scanSync(startPtr, (startPtr.readInt() * 0.5 + 3) * p_size, "00 00 00 00")[0]["address"]
                LOGO("\t" + hexdump(startPtr.add(p_size), {
                    length: endPtr.sub(startPtr).sub(p_size).toInt32(),
                    header: false
                }))
            } catch (e) { }
        }
    }

    var TMP_Template = () => {

        try {
            LOGH(`${getLine(80)} \n[*] Hook Resources.Load\n${getLine(30)}`)
            let Template_Resources_Load =
                'R(' + find_method("UnityEngine.CoreModule", "Resources", "Load", 2, false, true) + ', (srcFunc, arg0, arg1, arg2, arg3) => {\n' +
                '    var ret = srcFunc(arg0, arg1, arg2, arg3)\n' +
                '    var p_type = callFunction(' + find_method("mscorlib", "Object", "GetType", 0, false, true) + ', ret)\n' +
                '    var p_name = callFunction(' + find_method("mscorlib", "Type", "ToString", 0, false, true) + ', p_type)\n' +
                '    LOG(ret + "\t" + readU16(arg0) + "\\t" + readU16(p_name))\n' +
                '    return ret\n' +
                '})\n'
            LOGD(Template_Resources_Load)
        } catch {
            LOGE("NOT FOUND ---> public static Object[] LoadAll(string path, Type systemTypeInstance)\n")
        }

        try {
            if (find_method("UnityEngine.AssetBundleModule", "AssetBundle", "LoadFromFileAsync", 2, false, true).isNull()) throw new Error()
            LOGH(getLine(80) + "\n[*] Hook AssetBundle\n" + getLine(30))
            let Template_LoadFromFileAsync =
                '\nR(' + find_method("UnityEngine.AssetBundleModule", "AssetBundle", "LoadFromFileAsync", 2, false, true) + ', (srcFunc, arg0, arg1, arg2, arg3) => {\n' +
                '    LOG("[*] LoadFromFileAsync(\'" + readU16(arg0) + "\' , " + arg1 + ")")\n' +
                '    return srcFunc(arg0, arg1, arg2, arg3)\n' +
                '})\n'
            LOGD(Template_LoadFromFileAsync)
        } catch {
            LOGE("NOT FOUND ---> public static AssetBundleCreateRequest LoadFromFileAsync(string path, uint crc)\n")
        }

        try {

            LOGH(`${getLine(80)} \n[*] Hook LanguageSourceData\n${getLine(30)}`)
            let Template_GetTermData =
                'R(0x557578, (srcFunc, arg0, arg1, arg2, arg3) => {\n' +
                '    var ret = srcFunc(arg0, arg1, arg2, arg3)\n' +
                '    LOG(ret + " = GetTermData(string " + readU16(arg1) + " , bool allowCategoryMistmatch = " + (arg2 == 0x0 ? false : true) + ") ")\n' +
                '    if (ret == 0x0) return ret\n' +
                '    var strArr = ptr(ret).add(' + new Il2Cpp.Class(findClass("TermData")).field("Languages").offset + ').readPointer()\n' +
                '    var size = ptr(strArr).add(' + p_size + ' * 3).readUInt()\n' +
                '    console.error("\tSize  -> " + size)\n' +
                '    var tmpArr = []\n' +
                '    for (let i = 1; i <= size; i++) tmpArr.push(readU16(ptr(strArr).add(' + p_size + ' * (3 + i)).readPointer()))\n' +
                '    console.error("\tDate  -> " + JSON.stringify(tmpArr))\n' +
                '    return ret\n' +
                '})\n'
            LOGD(Template_GetTermData)
        } catch {
            LOGE(`NOT FOUND ---> public TermData GetTermData(string term, bool allowCategoryMistmatch = false)\n`)
        }
    }
}

export { B_Text }
declare global {
    var B_Text: () => void
}

globalThis.B_Text = B_Text