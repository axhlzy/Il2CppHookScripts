import './frida-qbdi'
import { QBDI } from './frida-qbdi';

setTimeout(() => main(), 0);

function main() {
    const vm = new QBDI();
    let a = vm.getModuleNames() as string[]
    a.forEach(item => console.log(item))

}

globalThis.eee = main

declare global {
    var eee: Function
}

export { }