import { filterDuplicateOBJ } from "../../../../../../../../../../../utils/common"
import { TMPro_TMP_Text_Impl as TMPro_TMP_Text } from "../TMP_Text/class"

const enableDebugLog:boolean = false
const enableHookFont:boolean = true
const savedFonts:Il2Cpp.Object[] = []
var choosedFont:Il2Cpp.Object | null = null
var choosed_TMP_FontAsset:NativePointer = NULL

// try hook Font.InvokeTextureRebuilt_Internal to modify font dynamically
Il2Cpp.perform(()=>{
    if (!enableHookFont) return

    try {
        // [-]UnityEngine.TextRenderingModule @ 0x75f0260930
        //   [-]UnityEngine.TextRenderingModule.dll @ 0x75f025e3c0 | C:15
        //   [-]Font @ 0x75f1686700 | M:12 | F:2 | N:UnityEngine
        //     [-]internal static Void InvokeTextureRebuilt_Internal(Font font) @ MI: 0x75f1694bb0 & MP: 0x762f6283a8 & RP: 0x415e3a8
        //       [-]font                | type: 0x762fc07d40 | @ class:0x75f1686700 | UnityEngine.Font
        const class_Font = Il2Cpp.Domain.assembly('UnityEngine.TextRenderingModule').image.class('UnityEngine.Font')
        const method_InvokeTextureRebuilt_Internal = class_Font.method('InvokeTextureRebuilt_Internal', 1).overload('UnityEngine.Font')
        Interceptor.attach(method_InvokeTextureRebuilt_Internal.virtualAddress, {
            onEnter: function (args: NativePointer[]) {
                const obj = new Il2Cpp.Object(args[0])
                if (enableDebugLog) LOGD(`called Font.InvokeTextureRebuilt_Internal( Font="${obj}" )`)
                savedFonts.push(obj)
            }
        })
    } catch (error) {
        if (enableDebugLog) LOGE(`Hook Font.InvokeTextureRebuilt_Internal failed: ${error}`)   
    }
})

const listFonts = () => {
    if (!enableHookFont) throw new Error("Hook Font is not enabled")
    if (savedFonts.length == 0) {
        LOGE(`No font saved`)
        return
    }
    newLine()
    savedFonts.forEach((font, index) => {
        LOGD(`[${index}] ${font.handle} -> ${font} `)
    })
    newLine()
}

const setFont = (index: number) => {
    if (choosedFont != null) {
        LOGE(`Font has been set`)
        return
    }
    if (index < 0 || index >= savedFonts.length) {
        LOGE(`Index out of range`)
        return
    }
    
    // ↓ class : TMP_FontAsset ↓
    // public static TMP_FontAsset CreateFontAsset(Font font)
    // public static TMP_FontAsset CreateFontAsset(Font font, Int32 samplingPointSize, Int32 atlasPadding, GlyphRenderMode renderMode, Int32 atlasWidth, Int32 atlasHeight, AtlasPopulationMode atlasPopulationMode, Boolean enableMultiAtlasSupport)

    runOnMain(()=>{
        choosed_TMP_FontAsset = Il2Cpp.Api.TMP_FontAsset._CreateFontAsset(savedFonts[index].handle)
    })
}

// public static Void TrackText (Text t)
// a(findClass("TextMesh"))
// 用作查找拼接后的字符串
// find_method("mscorlib","String","Format",3)
// a(findClass("String"))
// find_method("UnityEngine.UI","Text","get_text",0,false)
// FindObjectsOfType("TextMeshProUGUI")
// \n 0x0A | \r 0x0D | \t 0x09 | [空格] 0x20 | [换行] 0x0D 0x0A
const B_Text = (): void => {

    const strRecordMap = new Map()
    const strReplaceMap = new Map()

    strReplaceMap.set("SETTINGS", "设置")
    strReplaceMap.set("Setting", "SETTINGS")
    strReplaceMap.set("選擇角色", "选择角色")
    strReplaceMap.set("ADDED", "已添加")
    strReplaceMap.set("Play", "开始")
    strReplaceMap.set("Options", "选项")
    strReplaceMap.set("Back", "返回")
    strReplaceMap.set("Settings", "设置")
    strReplaceMap.set("Loading...", "加载中...")
    strReplaceMap.set("More games", "更多游戏")
    strReplaceMap.set("Watch ad?", "看广告？")
    strReplaceMap.set("Not Enough Money", "金钱不够")
    strReplaceMap.set("No translation found for 'Watch ad?' in Texts", "看广告？")

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
            const aimStr = "|" + readU16(callFunction(["Unity.TextMeshPro", "TMP_Text", "get_text", 0], args[0])) + "|"
            if (filterDuplicateOBJ(aimStr, 30) == -1) return
            worksWithText(args[0], "TMP_Text")
            LOGD("\n[TMP_Text]\t" + args[0] + "\t" + aimStr + "\t" + getPlatformCtx(ctx).lr)
            if (strReplaceMap.size != 0) {
                const repStr = strReplaceMap.get(aimStr.substring(1, aimStr.length - 1))
                if (repStr != undefined) {
                    callFunction(find_method("Unity.TextMeshPro", "TMP_Text", "set_text", 1), args[0], allocUStr(repStr))
                    LOGH(" \n\t {REP} " + aimStr + " ---> " + repStr)
                }
                if (showGobj != undefined && showGobj == true) {
                    showGameObject(args[0])
                }
            }
            if (enableHookFont && !choosed_TMP_FontAsset.isNull()) {
                LOGZ("\n\t { FONT } " + new Il2Cpp.Object(Il2Cpp.Api.TMP_Text._get_font(args[0])))
                const tmpObj = new Il2Cpp.Object(args[0])
                // public Void set_font(TMP_FontAsset value)
                tmpObj.tryMethod<void>("set_font", 1)!.invoke(choosed_TMP_FontAsset)
                // TextMeshPro public Void UpdateFontAsset()
                Il2Cpp.Api.TextMeshPro._UpdateFontAsset(args[0])
            }
        })
    }

    function TextMeshPro() {
        // A(find_method("Unity.TextMeshPro", "TextMeshPro", "get_transform", 0), (args) => {
        A(Il2Cpp.Api.TextMeshPro._get_transform, (args) => {
            const aimStr = "|" + new TMPro_TMP_Text(args[0]).get_text() + "|"
            if (filterDuplicateOBJ(aimStr) == -1) return
            worksWithText(args[0], "TextMeshPro")
            LOG("\n[TextMeshPro]  " + args[0] + "\t" + aimStr, LogColor.C35)
            if (strReplaceMap.size != 0) {
                const repStr = strReplaceMap.get(aimStr.substring(1, aimStr.length - 1))
                if (repStr != undefined) {
                    callFunction(find_method("Unity.TextMeshPro", "TextMeshPro", "set_text", 1), args[0], allocUStr(repStr))
                    LOGH("\n\t { REP } " + aimStr + " ---> " + repStr)
                }
            }
            if (enableHookFont && !choosed_TMP_FontAsset.isNull()) {
                LOGZ("\n\t { FONT } " + new Il2Cpp.Object(Il2Cpp.Api.TMP_Text._get_font(args[0])))
                const tmpObj = new Il2Cpp.Object(args[0])
                // public Void set_font(TMP_FontAsset value)
                tmpObj.tryMethod<void>("set_font", 1)!.invoke(choosed_TMP_FontAsset)
                // TextMeshPro public Void UpdateFontAsset()
                Il2Cpp.Api.TextMeshPro._UpdateFontAsset(args[0])
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
            const aimStr = "|" + readU16(ret) + "|"
            if (filterDuplicateOBJ(aimStr) == -1) return
            LOGG("\n[Text_Get]  " + getPlatformCtxWithArgV(ctx, 0) + "\t" + aimStr)
            if (strReplaceMap.size != 0) {
                const repStr = strReplaceMap.get(aimStr.substring(1, aimStr.length - 1))
                if (repStr != undefined) {
                    ret.replace(allocUStr(repStr))
                    // callFunction(find_method("UnityEngine.UI", 'Text', 'set_text', 1), p_size == 4 ? ctx.r0 : ctx.x0, allocStr(repStr, ""))
                    LOGH(` \n\t {REP} ${aimStr} ---> ${repStr}`)
                }
            }
        })

        // A(find_method("UnityEngine.UI", "Text", "set_text", 1), (args, ctx) => {
        A(Il2Cpp.Api.Text._set_text, (args:NativePointer[], _ctx:CpuContext) => {
            const aimStr = "|" + readU16(args[1]) + "|"
            if (filterDuplicateOBJ(aimStr) == -1 || filterDuplicateOBJ(args[0].toString()) == -1) return
            worksWithText(args[0], "Text")
            LOGO("\n[Text_Set]  " + args[0] + "\t" + aimStr)
            if (strReplaceMap.size != 0) {
                const repStr = strReplaceMap.get(aimStr.substring(1, aimStr.length - 1))
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
            const aimStr = "|" + callFunctionRUS(["UnityEngine.UI", 'Text', 'get_text', 0], args[0]) + "|"
            if (filterDuplicateOBJ(aimStr) == -1) return
            LOGD(`\n[FontUpdateTracker] ${args[0]} \t ${aimStr}`)
            worksWithText(args[0], "Text")
            if (strReplaceMap.size != 0) {
                const repStr = strReplaceMap.get(aimStr.substring(1, aimStr.length - 1))
                if (repStr != undefined) {
                    args[1] = allocUStr(repStr)
                    LOGH(` \n\t {REP} ${aimStr} ---> ${repStr}`)
                }
            }
        })
    }

    function HookPrint() {
        A(find_method('Assembly-CSharp', 'NGUIText', 'Print', 4), (args) => {
            const aimStr = "|" + readU16(args[0]) + "|"
            if (filterDuplicateOBJ(aimStr) == -1) return
            LOGD(`\n[NGUIText] ${args[0]} \t ${aimStr}`)
            worksWithText(args[0], "Text", true)
            if (strReplaceMap.size != 0) {
                let repStr = strReplaceMap.get(aimStr.substring(1, aimStr.length - 1))
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
        if (strRecordMap.get(typeStr) == null) {
            strRecordMap.set(typeStr, 1)
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

// LoadFromFileAsync
function hook_crc() { 
    // [-]UnityEngine.AssetBundleModule @ 0x72b0299e18
    //   [-]UnityEngine.AssetBundleModule.dll @ 0x72b02975f8 | C:6
    //     [-]AssetBundle @ 0x72b0762470 | M:15 | F:0 | N:UnityEngine
    //       [-]public static AssetBundleCreateRequest LoadFromFileAsync(String path, UInt32 crc) @ MI: 0x72b0813938 & MP: 0x72ecf58470 & RP: 0x3ad4470
    //         [-]path                | type: 0x72ed555f18 | @ class:0x72b025abc0 | System.String
    //         [-]crc                 | type: 0x72ed556ef8 | @ class:0x72b0259760 | System.UInt32
    //         [-]_RET_               | type: 0x72ed55c668 | @ class:0x72b1e75940 | UnityEngine.AssetBundleCreateRequest
    var cls_AssetBundle = Il2Cpp.Domain.assembly('UnityEngine.AssetBundleModule').image.class('UnityEngine.AssetBundle')
    const method_CreateFromMemory = cls_AssetBundle.tryMethod('LoadFromFileAsync', 2)!
    Interceptor.attach(method_CreateFromMemory.virtualAddress, {
        onEnter: function (args: NativePointer[]) {
            this.path = new Il2Cpp.String(args[0])
            this.crc = args[1]
            console.log(`[+]AssetBundle.LoadFromFileAsync: ${this.path.toString()} crc:${args[1]}`)
            args[1] = ptr(0)
        }
    })
}

globalThis.hook_crc = hook_crc

declare global {
    var B_Text: () => void

    var listFonts: () => void
    var setFont: (index: number) => void

    var hook_crc: () => void

    var savedFonts: Il2Cpp.Object[]
    var choosed_TMP_FontAsset: NativePointer
}

globalThis.B_Text = B_Text

globalThis.listFonts = listFonts
globalThis.setFont = setFont

globalThis.savedFonts = savedFonts
globalThis.choosed_TMP_FontAsset = choosed_TMP_FontAsset