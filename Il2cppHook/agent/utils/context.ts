import { LogColor } from "../base/enum"

/**
 * 展示代码上下文
 * @param {Pointer} mPtr 指针位置
 * @param {Int} range 展示的范围
 * @param {Int} type 1:正向 2:反向(小端存储，同IDA)   不填写着以当前pointer为中心位置打印信息
 */
var printCtx = (mPtr: NativePointer | number, range: number = 5, type: number = 0, redLine: LogColor = LogColor.WHITE, space: number = 0) => {
    if (Process.arch != "arm") return
    mPtr = checkPointer(mPtr)
    if (mPtr.isNull()) return
    if (type != 0) {
        for (let offset = 0; offset < range; offset++) printLOG(mPtr, offset)
    } else {
        let max = range == undefined ? 5 : (range % 2 == 1 ? (range + 1) : range) / 2
        let min = range == undefined ? -4 : max - range
        for (let offset = min; offset < max; offset++) printLOG(mPtr, offset)
    }

    function printLOG(pointer: NativePointer, offset: number) {
        let cur_p = pointer.add(p_size * offset)
        let cur_value = String(cur_p.readPointer())
        // fix 12 00 00 0A => 0x0A00012 少一个0的情况 
        if (Process.arch == "arm" && cur_value.length != 10) cur_value = cur_value.replace("000", "0000")
        let cur_tmp = Array.from(cur_value.toUpperCase())
        let cur_str = (cur_tmp.length == 10) ? cur_value : ""
        if (type == 1) {
            cur_str = cur_tmp[2] + cur_tmp[3] + ' ' + cur_tmp[4] + cur_tmp[5] + ' ' + cur_tmp[6] + cur_tmp[7] + ' ' + cur_tmp[8] + cur_tmp[9]
        } else if (type == 2) {
            cur_str = cur_tmp[8] + cur_tmp[9] + ' ' + cur_tmp[6] + cur_tmp[7] + ' ' + cur_tmp[4] + cur_tmp[5] + ' ' + cur_tmp[2] + cur_tmp[3]
        }
        try {
            LOG(getLine(space, "\t") + cur_p + "\t" + cur_str + "\t" + Instruction.parse(cur_p), redLine)
        } catch (e) { }
    }
}

globalThis.printCtx = printCtx

declare global {
    var printCtx: (mPtr: NativePointer | number, range?: number, type?: number, redLine?: number, space?: number) => void
}

export { printCtx }