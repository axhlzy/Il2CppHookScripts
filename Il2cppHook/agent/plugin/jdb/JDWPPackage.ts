// https://ioactive.com/hacking-java-debug-wire-protocol-or-how/

import { CommandType, JDB } from "./constant"

var _nextID: number = 0
function nextID() {
    return ++_nextID
}

// PackageHeader(4+4+1+1+1=11)
export class JDWPPackage {
    protected d_src: ArrayBuffer
    protected v_src: DataView

    protected constructor(buffer: ArrayBuffer = new ArrayBuffer(JDB.HEADERLEN)) {
        this.d_src = buffer
        this.v_src = new DataView(this.d_src)
        this.length = JDB.HEADERLEN
        this.id = nextID()
        return this
    }

    set buffer(buffer: ArrayBuffer) {
        this.d_src = buffer
        this.v_src = new DataView(this.d_src)
    }

    get buffer(): ArrayBuffer {
        return this.d_src
    }

    set length(len: number) {
        this.v_src.setUint32(0, len, false)
    }

    get length() {
        return this.v_src.getUint32(0, false)
    }

    set id(id: number) {
        this.v_src.setUint32(4, id, false)
    }

    get id() {
        return this.v_src.getUint32(4, false)
    }

    set flags(flags: JDB.Flag) {
        this.v_src.setUint8(8, flags)
    }

    get flags(): JDB.Flag {
        return this.v_src.getUint8(8)
    }

    set data(buffer: ArrayBuffer) {
        const newTotalLength = JDB.HEADERLEN + buffer.byteLength
        const newBuffer = new ArrayBuffer(newTotalLength)
        const newView = new DataView(newBuffer)
        const oldHeader = new Uint8Array(this.d_src, 0, JDB.HEADERLEN)
        new Uint8Array(newBuffer, 0, JDB.HEADERLEN).set(oldHeader)
        const newData = new Uint8Array(buffer)
        new Uint8Array(newBuffer, JDB.HEADERLEN).set(newData)
        this.d_src = newBuffer
        this.v_src = newView
        this.length = newTotalLength
    }

    get data(): ArrayBuffer {
        return this.v_src.buffer.slice(JDB.HEADERLEN)
    }

    static get Handshake(): ArrayBuffer {
        return str2ab('JDWP-Handshake')
    }

    toString() {
        return arrayBufferToHex(this.buffer)
    }

}

// Request Package 
// length(4) id(4) flags(1) CommandSet(1) Command(1) Data(...) 
export class RequestPackage extends JDWPPackage {

    constructor(id: number, flags: number, commandSet: number, command: number, data: ArrayBuffer = new ArrayBuffer(0)) {
        super()
        this.id = id
        this.flags = flags
        this.commandSet = commandSet
        this.command = command
        this.data = data
        this.length += data.byteLength
    }

    set commandSet(cmd: number) {
        this.v_src.setUint8(9, cmd)
    }

    get commandSet(): number {
        return this.v_src.getUint8(9)
    }

    set command(cmd: number) {
        this.v_src.setUint8(10, cmd)
    }

    get command(): number {
        return this.v_src.getUint8(10)
    }

    static from(cmd: CommandType, data: ArrayBuffer = new ArrayBuffer(0)): RequestPackage {
        return new RequestPackage(nextID(), JDB.Flag.REQUEST_PACKET_TYPE, cmd.commandSet, cmd.command, data)
    }
}

// Replay Package
// length(4) id(4) flags(1) ErrorCode(2) Data(...) 
export class ReplyPackage extends JDWPPackage {

    constructor(id: number = nextID(), flags: number = JDB.Flag.REPLY_PACKET_TYPE, errorCode: number = 0, data: ArrayBuffer = new ArrayBuffer(0)) {
        super()
        this.id = id
        this.flags = flags
        this.errorCode = errorCode
        this.data = data
        this.length += data.byteLength
    }

    set errorCode(code: number) {
        this.v_src.setUint16(8, code)
    }

    get errorCode(): number {
        return this.v_src.getUint16(8)
    }

    static from(buffer: ArrayBuffer): ReplyPackage {
        const retPkg = new ReplyPackage()
        retPkg.buffer = buffer
        return retPkg
    }

}

// str -> ArrayBuffer
export function str2ab(str: string): ArrayBuffer {
    const buf = new ArrayBuffer(str.length)
    const view = new Uint8Array(buf)
    for (let i = 0, l = str.length; i < l; i++) {
        view[i] = str.charCodeAt(i) & 0xFF
    }
    return buf
    // return Memory.allocUtf8String(str).readByteArray(str.length)!
}

// ArrayBuffer -> str
export function ab2str(buf: ArrayBuffer): string {
    return Memory.alloc(buf.byteLength).writeByteArray(buf).readCString()!
}

// ArrayBuffer -> hexString
var cachePtr: NativePointer = NULL
export function arrayBufferToHex(buffer: ArrayBuffer, cached: boolean = true) {
    const tempMem = Memory.alloc(buffer.byteLength)
    tempMem.writeByteArray(buffer)
    if (cached) cachePtr = tempMem
    return hexdump(tempMem, { length: buffer.byteLength })
}

export function arrayBufferToHex2(buffer: ArrayBuffer) {
    const byteArray = new Uint8Array(buffer)
    let hexString: string = ''
    byteArray.forEach(byte => hexString += byte.toString(16).padStart(2, '0') + ' ')
    return hexString.trim()
}

declare global {
    var ab2str: (buf: ArrayBuffer) => string
    var str2ab: (str: string) => ArrayBuffer
    var arrayBufferToHex: (buffer: ArrayBuffer) => string
    var arrayBufferToHex2: (buffer: ArrayBuffer) => string
}

globalThis.ab2str = ab2str
globalThis.str2ab = str2ab
globalThis.arrayBufferToHex = arrayBufferToHex
globalThis.arrayBufferToHex2 = arrayBufferToHex2