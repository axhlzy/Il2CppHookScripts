import { ArrKAY, EpFunc, GKEY, GKEYE, MapKAY } from "./enum";

export const soName: string = "libil2cpp.so"
export const p_size: number = Process.pointerSize

export let newThreadCallBack = () => { }

export type ARGM = NativePointer | number | any
export type ZERO_ARG_S = () => NativePointer
export type ONE_ARG_S = (arg0: ARGM) => NativePointer
export type TWO_ARG_S = (arg0: ARGM, arg1: ARGM) => NativePointer
export type THREE_ARG_S = (arg0: ARGM, arg1: ARGM, arg2: ARGM) => NativePointer
export type FOUR_ARG_S = (arg0: ARGM, arg1: ARGM, arg2: ARGM, arg3: ARGM) => NativePointer
export type ZERO_ARG = NativeFunction<NativePointer, []>
export type ONE_ARG = NativeFunction<NativePointer, [NativePointer]>
export type TWO_ARG = NativeFunction<NativePointer, [NativePointer, NativePointer]>
export type THREE_ARG = NativeFunction<NativePointer, [NativePointer, NativePointer, NativePointer]>
export type FOUR_ARG = NativeFunction<NativePointer, [NativePointer, NativePointer, NativePointer, NativePointer]>
export type ARGS = ONE_ARG_S | TWO_ARG_S | THREE_ARG_S | FOUR_ARG_S | ZERO_ARG_S | ZERO_ARG | ONE_ARG | TWO_ARG | THREE_ARG | FOUR_ARG

export type TYPE_CHECK_POINTER = NativePointer | Array<string | number | NativePointer | boolean> | Array<string | string | string | number> | string | number

// export type GameObject = NativePointer
// export type Component = NativePointer
// export type Transform = NativePointer

// ---------------------- 全局变量 ---------------------- 

// 记录函数地址 address (SET_A:set address / GET_A:get address)
let MAP_EXPORT_ADDRESS = new Map<EpFunc, NativePointer>();
export const GET_A = (typeEp: EpFunc): NativePointer | undefined => MAP_EXPORT_ADDRESS.get(typeEp)
export const SET_A = (typeEp: EpFunc, mPtr: NativePointer): Map<EpFunc, NativePointer> => MAP_EXPORT_ADDRESS.set(typeEp, mPtr)

// 记录函数 function (SET_F:set function / GET_F:get function)
let MAP_EXPORT_FUNCTIONS = new Map<EpFunc, any>();
export function SET_F<T>(type: EpFunc, func: T): void {
    MAP_EXPORT_FUNCTIONS.set(type, func)
    SET_A(type, func as unknown as NativePointer);
}
export function SET_F_A<T>(type: EpFunc, func: T): void {
    MAP_EXPORT_FUNCTIONS.set(type, func)
    SET_A(type, func as unknown as NativePointer);
}
export function GET_F<T>(type: EpFunc): T {
    return MAP_EXPORT_FUNCTIONS.get(type)
}

// 记录全局变量
let MAP_GLOABE_OBJ = new Map<GKEYE, any>()

export const GET_G = (gKey: GKEY): any => MAP_GLOABE_OBJ.get(gKey)

export function GET_GT<T>(gKey: GKEY): T {
    let tmp = MAP_GLOABE_OBJ.get(gKey)
    if (tmp == undefined) tmp = 0
    return MAP_GLOABE_OBJ.get(gKey) as T
}
export function SET_G(gKey: GKEY, obj: any): Map<GKEY, any> {
    return MAP_GLOABE_OBJ.set(gKey, obj) as Map<GKEY, any>
}

export function GET_MAP<K, V>(tKay: MapKAY): Map<K, V> {
    if (MAP_GLOABE_OBJ.get(tKay)) {
        return MAP_GLOABE_OBJ.get(tKay) as Map<K, V>
    } else {
        let tmp = new Map<K, V>()
        SET_MAP(tKay, tmp)
        return tmp
    }
}

export function SET_MAP<K, V>(tKay: MapKAY, map: Map<K, V>): void {
    MAP_GLOABE_OBJ.set(tKay, map)
}

export function SET_MAP_VALUE<K, V>(tKay: MapKAY, key: K, value: V): void {
    SET_MAP(tKay, GET_MAP(tKay).set(key, value))
}

export function GET_MAP_VALUE<K, V>(tKay: MapKAY, key: K): any {
    return GET_MAP(tKay).get(key)
}

export function GET_ARRAY<K>(tKay: ArrKAY): Array<K> {
    if (MAP_GLOABE_OBJ.get(tKay)) {
        return MAP_GLOABE_OBJ.get(tKay) as Array<K>
    } else {
        let tmp = new Array<K>()
        SET_ARRAY<K>(tKay, tmp)
        return tmp
    }
}

export function SET_ARRAY<K>(tKay: ArrKAY, array: Array<K>): void {
    MAP_GLOABE_OBJ.set(tKay, array)
}

export function NOP_ARRAY(tKay: ArrKAY): void {
    MAP_GLOABE_OBJ.delete(tKay)
}

export function NOP_MAP(tKay: ArrKAY): void {
    MAP_GLOABE_OBJ.delete(tKay)
}

declare global {
    var MAP_EXPORT_FUNCTIONS: void
    var MAP_EXPORT_ADDRESS: Map<EpFunc, NativePointer>
    var MAP_GLOABE_OBJ: Map<GKEYE, any>
    var p_size: number
}

globalThis.MAP_EXPORT_FUNCTIONS = MAP_EXPORT_FUNCTIONS.forEach((value, key) => { LOGD(`${key} => ${value}`) })
globalThis.MAP_EXPORT_ADDRESS = MAP_EXPORT_ADDRESS
globalThis.MAP_GLOABE_OBJ = MAP_GLOABE_OBJ
globalThis.p_size = p_size