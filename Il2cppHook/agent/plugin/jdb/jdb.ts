import { arrayBufferToHex, ReplyPackage as ReplPkg, RequestPackage as ReqPkg } from "./JDWPPackage"
import { JDB } from "./constant"

function interaction(port = Process.id, host = "127.0.0.1") {
    LOGD(`Connection -> ${host}:${port}`)
    Socket.connect({ "family": 'ipv4', 'host': host, 'port': port })
        .then((connection: SocketConnection) => {

            // JDWP-Handshake
            connection.output
                .write(ReqPkg.Handshake)

            connection.input
                .read(JDB.HANDSHAKE.length)
                .then(function (buff: ArrayBuffer) {
                    if (ab2str(buff) == JDB.HANDSHAKE) LOGD("Handshake Success")
                    else LOGE(arrayBufferToHex(buff))
                })
                .catch(LOGE)

            setTimeout(() => {
                connection.output.write(ReqPkg.from(JDB.CommandSet.VirtualMachine.Version).buffer)
                
                setTimeout(() => {
                    connection.input.read(JDB.HEADERLEN).then((buffer: ArrayBuffer) => {
                        const totalLength:number = ReplPkg.from(buffer).length
                        const additionalDataLen = totalLength - JDB.HEADERLEN
                        if (additionalDataLen > 0) {
                            const maxDispLen = 0x1000
                            const fixDispLen = additionalDataLen > maxDispLen ? maxDispLen : additionalDataLen
                            connection.input.read(fixDispLen).then((data: ArrayBuffer) => {
                                const fullPacket = new ArrayBuffer(fixDispLen + JDB.HEADERLEN)
                                new Uint8Array(fullPacket).set(new Uint8Array(buffer), 0)
                                new Uint8Array(fullPacket).set(new Uint8Array(data), JDB.HEADERLEN)
                                processPacket(ReplPkg.from(fullPacket))
                            })
                        } else {
                            processPacket(ReplPkg.from(buffer))
                        }
                    }).catch(LOGE)
                }, 200);
                
            }, 200)
        })
        .catch((e)=>{
            LOGE(e)
            LOGE("Check to see if you've run the `startJdwpThread()`")
        })

        function processPacket(packet: ReplPkg) {
            LOGD(packet)
        }
}

export { }

declare global {
    var jdbTest: (port?: number, host?: string) => void
}

globalThis.jdbTest = interaction