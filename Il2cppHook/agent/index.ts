
import { distance } from "fastest-levenshtein";
import "./include"


// setImmediate(() => Il2Cpp.perform(() => main()))

export function main() {

}

declare global {
    var main: () => void;
}
globalThis.main = main