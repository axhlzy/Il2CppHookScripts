import { LogColor } from "../base/enum"

class formartClass {

    static printTitile = (strTitle: string, Line1: LogColor = LogColor.C33, Line2: LogColor = LogColor.C33, Line3: LogColor = LogColor.C33) => {
        let len = strTitle.length + 2
        LOG(` ${getLine(len)} `, Line1)
        LOG(`| ${strTitle} |`, Line2)
        LOG(` ${getLine(len)} `, Line3)
    }

    static linesMap = new Map()
    static getLine = (length: number, fillStr: string = "-") => {
        let key = length + "|" + fillStr
        if (formartClass.linesMap.get(key) != null) return formartClass.linesMap.get(key)
        for (var index = 0, tmpRet = ""; index < length; index++) tmpRet += fillStr
        formartClass.linesMap.set(key, tmpRet)
        return tmpRet
    }

}

export { formartClass }