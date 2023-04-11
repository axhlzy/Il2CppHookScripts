import { PTR } from "../base/enum"
import { PTR2NativePtr } from "../utils/common"

/**
 * 读取 TMP_TEXT 字符串
 * @param {Number} mPtr TMP_TEXT INSTANCE
 */
var readTMPText = (mPtr: PTR): string => {
    mPtr = PTR2NativePtr(mPtr)
    if (mPtr.isNull()) return ""
    return ""
    // return callFunctionRUS(find_method("Unity.TextMeshPro", "TMP_Text", "get_text", 0), mPtr)
}