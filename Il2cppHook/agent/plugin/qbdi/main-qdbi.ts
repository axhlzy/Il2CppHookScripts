import './frida-qbdi'
import { QBDI } from './frida-qbdi'

setTimeout(() => main(), 0)

function main() {
    const vm = new QBDI();
    let names = vm.getModuleNames() as string[]
    names.forEach(item => console.log(item))
}

globalThis.qbdi = main

declare global {
    var qbdi: () => void
}

export { }