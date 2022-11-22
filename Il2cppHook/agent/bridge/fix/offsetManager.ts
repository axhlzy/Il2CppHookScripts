import { formartClass as FM } from "../../utils/formart"

export class OffsetManager {

    private static _instance: OffsetManager

    public static getInstance(): OffsetManager {
        if (!OffsetManager._instance) OffsetManager._instance = new OffsetManager()
        return OffsetManager._instance
    }

    private constructor() { }

    private static _offsets: Map<string, number> = new Map<string, number>()

    public getOffset(className: string, methodName: string): number {
        let key: string = className + "." + methodName
        let first = find(key)
        if (first == -1) this.addClass(className)
        else return first
        return find(key)

        function find(key: string) {
            if (OffsetManager._offsets.has(key)) {
                let retValue = OffsetManager._offsets.get(key)
                if (retValue != undefined) return retValue
                else return -1
            } else {
                return -1
            }
        }
    }

    public setOffset(className: string, methodName: string, offset: number): void {
        let key = className + "." + methodName
        OffsetManager._offsets.set(key, offset)
    }

    public addClass(className: string): void {
        new Il2Cpp.Class(findClass(className)).fields.forEach(field => {
            this.setOffset(className, field.name, field.offset)
        })
    }

    public showCache(filter: string = ""): void {
        OffsetManager._offsets.forEach((value, key) => {
            if (key.includes(filter)) LOGD(`[*] ${FM.alignStr(ptr(value), 7)} <---   ${key}`)
        })
    }

}

declare global {
    var showOffSets: (filter: string) => void
    var getOffset: (className: string, methodName: string) => number
}

globalThis.showOffSets = (filter: string) => OffsetManager.getInstance().showCache(filter)
globalThis.getOffset = (className: string, methodName: string) => OffsetManager.getInstance().getOffset(className, methodName)