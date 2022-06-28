import { LogColor } from "../base/enum"

class formartClass {

    static printTitile = (strTitle: string, Line1: LogColor = LogColor.C33, Line2: LogColor = LogColor.C33, Line3: LogColor = LogColor.C33): number => {
        let len = strTitle.length + 2
        LOG(` ${getLine(len)} `, Line1)
        LOG(`| ${strTitle} |`, Line2)
        LOG(` ${getLine(len)} `, Line3)
        return len
    }

    static linesMap = new Map()
    static getLine = (length: number, fillStr: string = "-") => {
        let key = length + "|" + fillStr
        if (formartClass.linesMap.get(key) != null) return formartClass.linesMap.get(key)
        for (var index = 0, tmpRet = ""; index < length; index++) tmpRet += fillStr
        formartClass.linesMap.set(key, tmpRet)
        return tmpRet
    }

    static alignStr(str: string, size: number = 13, fillStr: string = "."): string {
        let srcSize = str.length
        if (srcSize >= size) {
            str = str.substring(0, size - 1)
            str += fillStr
        } else for (let i = size - srcSize; i > 0; i--) str += " "
        return str
    }

    /**
 * 字符串指定位置添加元素
 * @param str1:原字符串
 * @param n:插入位置
 * @param str2:插入元素
 * @return  拼接后的字符串
 */
    static insertStr(str1: string, n: number, str2: string): string {
        var s1 = '';
        var s2 = '';
        if (str1.length < n) {
            return str1 + "" + str2;
        } else {
            s1 = str1.substring(0, n);
            s2 = str1.substring(n, str1.length);
            return `${s1}${str2}${s2}`;
        }
    }
}

export { formartClass }

globalThis.insertStr = formartClass.insertStr
declare global {
    var insertStr: (str1: string, n: number, str2: string) => string
}