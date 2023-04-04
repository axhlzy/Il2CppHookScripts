
const filterPath = ['/system/lib/', '/apex/']

var recordAddress = new Array<NativePointer>()

enum Type {
    INT = 1,
    FLOAT = 2,
    Double = 3,
    STRING = 4
}

export const scan = (input: number | string = 123456, type: Type = Type.INT) => {

    switch (type) {
        case Type.INT:
            scanInt(input as number)
            break
        case Type.FLOAT:
            scanFloat(input as number)
            break
        case Type.Double:
            scanDouble(input as number)
            break
        case Type.STRING:
            scanString(input as string)
            break
        default:
            throw new Error("Unknown type")
    }

    LOGD(`${recordAddress.length} results found`)

    if (recordAddress.length > 0 && recordAddress.length < 20) {
        LOGJSON(recordAddress)
    }
    if (recordAddress.length == 1) {
        let range: RangeDetails = Process.findRangeByAddress(recordAddress[0])!
        LOGJSON(range, LogColor.RED)
    }

    function scanInt(inputNumber: number) {
        let localRecordAddress = new Array<NativePointer>()
        let filter = numberToLittleEndianHexString(inputNumber)
        LOGW(filter)
        let patter = new MatchPattern(filter)
        try {
            Process.enumerateRanges('rw-').forEach((range: RangeDetails) => {
                if (range.file) LOGZ(`${range.file.path}}`)
                LOGD(`Scanning ${range.base} - ${range.base.add(range.size)} (${range.size} bytes)`)
                Memory.scanSync(range.base, range.size, patter).forEach((match: MemoryScanMatch) => {
                    localRecordAddress.push(match.address)
                    LOGW(`Found ${inputNumber} at ${match.address}`)
                })
            })
        } catch { }

        // recordAddress 和 localRecordAddress 取交集 存放在 recordAddress
        if (recordAddress.length == 0) {
            recordAddress = localRecordAddress
        } else {
            let temp = new Array<NativePointer>()
            for (let i = 0; i < recordAddress.length; i++) {
                for (let j = 0; j < localRecordAddress.length; j++) {
                    if (recordAddress[i].equals(localRecordAddress[j])) {
                        temp.push(recordAddress[i])
                    }
                }
            }
            recordAddress = temp
        }
    }

    function scanFloat(inputNumber: number) {
        let localRecordAddress = new Array<NativePointer>()
        let filter = numberToFloatLittleEndianHexString(inputNumber)
        LOGW(filter)
        let patter = new MatchPattern(filter)
        try {
            Process.enumerateRanges('rw-').forEach((range: RangeDetails) => {
                if (range.file) LOGZ(`${range.file.path}}`)
                LOGD(`Scanning ${range.base} - ${range.base.add(range.size)} (${range.size} bytes)`)
                Memory.scanSync(range.base, range.size, patter).forEach((match: MemoryScanMatch) => {
                    localRecordAddress.push(match.address)
                    LOGW(`Found ${inputNumber} at ${match.address}`)
                })
            })
        } catch { }

        // recordAddress 和 localRecordAddress 取交集 存放在 recordAddress
        if (recordAddress.length == 0) {
            recordAddress = localRecordAddress
        } else {
            let temp = new Array<NativePointer>()
            for (let i = 0; i < recordAddress.length; i++) {
                for (let j = 0; j < localRecordAddress.length; j++) {
                    if (recordAddress[i].equals(localRecordAddress[j])) {
                        temp.push(recordAddress[i])
                    }
                }
            }
            recordAddress = temp
        }
    }

    function scanDouble(inputNumber: number) {
        let localRecordAddress = new Array<NativePointer>()
        let filter = numberToDoubleLittleEndianHexString(inputNumber)
        LOGW(filter)
        let patter = new MatchPattern(filter)
        try {
            Process.enumerateRanges('rw-').forEach((range: RangeDetails) => {
                if (range.file) LOGZ(`${range.file.path}}`)
                LOGD(`Scanning ${range.base} - ${range.base.add(range.size)} (${range.size} bytes)`)
                Memory.scanSync(range.base, range.size, patter).forEach((match: MemoryScanMatch) => {
                    localRecordAddress.push(match.address)
                    LOGW(`Found ${inputNumber} at ${match.address}`)
                })
            })
        } catch { }

        if (recordAddress.length == 0) {
            recordAddress = localRecordAddress
        } else {
            let temp = new Array<NativePointer>()
            for (let i = 0; i < recordAddress.length; i++) {
                for (let j = 0; j < localRecordAddress.length; j++) {
                    if (recordAddress[i].equals(localRecordAddress[j])) {
                        temp.push(recordAddress[i])
                    }
                }
            }
            recordAddress = temp
        }
    }

    function scanString(inputString: string) {
        //todo
    }

    function numberToLittleEndianHexString(num: number): string {
        const buffer = new ArrayBuffer(4)
        const view = new DataView(buffer)
        view.setUint32(0, num, true)
        const result = []
        for (let i = 0; i < buffer.byteLength; i++) {
            result.push(view.getUint8(i).toString(16).toUpperCase().padStart(2, "0"))
        }
        return result.join(" ")
    }

    function numberToFloatLittleEndianHexString(num: number): string {
        const buffer = new ArrayBuffer(4)
        const view = new DataView(buffer)
        view.setFloat32(0, num, true)
        const result = []
        for (let i = 0; i < buffer.byteLength; i++) {
            result.push(view.getUint8(i).toString(16).toUpperCase().padStart(2, "0"))
        }
        return result.join(" ")
    }

    function numberToDoubleLittleEndianHexString(num: number): string {
        const buffer = new ArrayBuffer(8)
        const view = new DataView(buffer)
        view.setFloat64(0, num, true)
        const result = []
        for (let i = 0; i < buffer.byteLength; i++) {
            result.push(view.getUint8(i).toString(16).toUpperCase().padStart(2, "0"))
        }
        return result.join(" ")
    }
}

declare global {
    var scan: () => void
}

globalThis.scan = scan

