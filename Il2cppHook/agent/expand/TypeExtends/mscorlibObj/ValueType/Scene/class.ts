import { mscorlib_System_Object_impl as System_Object } from "../../class"
import { GameObjectImpl } from "../../Object/GameObject/class"
import { System_ValueType_Impl as System_ValueType } from "../class"
import { System_Int32_Impl } from "../Int32/class"

class UnityEngine_SceneManagement_Scene_Impl extends System_ValueType {

    m_Handle: number

    constructor(handleOrWrapper: NativePointer) {
        let tmpPtr = alloc(0x8)
        super(tmpPtr)
        this.m_Handle = Number(handleOrWrapper)
    }

    static GetPathInternal(sceneHandle: number): string {
        return readU16(Il2Cpp.Api.Scene._GetPathInternal(sceneHandle))
    }

    static GetNameInternal(sceneHandle: number): string {
        return readU16(Il2Cpp.Api.Scene._GetNameInternal(sceneHandle))
    }

    static GetBuildIndexInternal(sceneHandle: number): number {
        return Il2Cpp.Api.Scene._GetBuildIndexInternal(sceneHandle)
    }

    get_handle(): number {
        return this.m_Handle
    }

    get_path(): string {
        try {
            return UnityEngine_SceneManagement_Scene_Impl.GetPathInternal(this.m_Handle)
        } catch { return "" }
    }

    get_name(): string {
        try {
            return UnityEngine_SceneManagement_Scene_Impl.GetNameInternal(this.m_Handle)
        } catch { return "" }
    }

    get_buildIndex(): number {
        try {
            return UnityEngine_SceneManagement_Scene_Impl.GetBuildIndexInternal(this.m_Handle)
        } catch { return -1 }
    }

    GetHashCode(): System_Int32_Impl {
        return Il2Cpp.Api.Scene._GetHashCode(this.handle)
    }

    Equals(other: System_Object): boolean {
        return Il2Cpp.Api.Scene._Equals(this.handle, other)
    }

    toString(): string {
        let name: string = `Scene:\t${this.get_name()}`
        let buildIndex: string = `(buildIndex: ${this.get_buildIndex()}) `
        let path: string = `Path:\t${this.get_path()}`
        let handle: string = `Handle:\t${ptr(this.get_handle())}`
        return `\n${name} ( ${buildIndex} )\n${path}\n${handle}\n`
    }

    static IsValidInternal(sceneHandle: number): boolean {
        return Il2Cpp.Api.Scene._IsValidInternal(sceneHandle)
    }

    static GetIsLoadedInternal(sceneHandle: number): boolean {
        return Il2Cpp.Api.Scene._GetIsLoadedInternal(sceneHandle)
    }

    static GetRootCountInternal(sceneHandle: number): number {
        return Il2Cpp.Api.Scene._GetRootCountInternal(sceneHandle)
    }

    static GetRootGameObjectsInternal(sceneHandle: number, resultRootList: System_Object): void {
        return Il2Cpp.Api.Scene._GetRootGameObjectsInternal(sceneHandle, resultRootList)
    }

    IsValid(): boolean {
        return Il2Cpp.Api.Scene._IsValid(this.handle)
    }

    get_isLoaded(): boolean {
        return Il2Cpp.Api.Scene._get_isLoaded(this.handle)
    }

    get_rootCount(): number {
        return Il2Cpp.Api.Scene._get_rootCount(this.handle)
    }

    // GetRootGameObjects(): GameObjectImpl[] {
    //     return Il2Cpp.Api.Scene._GetRootGameObjects(this.handle)
    // }
    GetRootGameObjects(): NativePointer {
        return Il2Cpp.Api.Scene._GetRootGameObjects(this.handle)
    }

    // GetRootGameObjects_1(rootGameObjects: System_Collections.Generic.List<UnityEngine.GameObject>): void {
    //     return Il2Cpp.Api.Scene._GetRootGameObjects(this.handle, rootGameObjects)
    // }
    GetRootGameObjects_1(rootGameObjects: NativePointer): void {
        return Il2Cpp.Api.Scene._GetRootGameObjects(this.handle, rootGameObjects)
    }
}

Il2Cpp.Scene = UnityEngine_SceneManagement_Scene_Impl

declare global {
    namespace Il2Cpp {
        class Scene extends UnityEngine_SceneManagement_Scene_Impl { }
    }
}

export { UnityEngine_SceneManagement_Scene_Impl }