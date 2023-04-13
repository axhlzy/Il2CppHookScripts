import { UnityEngine_Object } from "../../Object/class"

type UnityEngine_AudioClip_PCMReaderCallback = NativePointer
type UnityEngine_AudioClip_PCMSetPositionCallback = NativePointer
type System_Void = void
type System_Single = NativePointer
type System_Int32 = number

class UnityEngine_AudioClip_Impl extends UnityEngine_Object {

    m_PCMReaderCallback: UnityEngine_AudioClip_PCMReaderCallback = lfv(this.handle, "m_PCMReaderCallback") as unknown as UnityEngine_AudioClip_PCMReaderCallback
    m_PCMSetPositionCallback: UnityEngine_AudioClip_PCMSetPositionCallback = lfv(this.handle, "m_PCMSetPositionCallback") as unknown as UnityEngine_AudioClip_PCMSetPositionCallback

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    _ctor_AudioClip(): System_Void {
        return Il2Cpp.Api.AudioClip.__ctor(this.handle)
    }

    get_length(): System_Single {
        return Il2Cpp.Api.AudioClip._get_length(this.handle)
    }

    InvokePCMReaderCallback_Internal(data: System_Single[]): System_Void {
        return Il2Cpp.Api.AudioClip._InvokePCMReaderCallback_Internal(this.handle, data)
    }

    InvokePCMSetPositionCallback_Internal(position: System_Int32): System_Void {
        return Il2Cpp.Api.AudioClip._InvokePCMSetPositionCallback_Internal(this.handle, position)
    }
}

Il2Cpp.AudioClip = UnityEngine_AudioClip_Impl

declare global {
    namespace Il2Cpp {
        class AudioClip extends UnityEngine_AudioClip_Impl { }
    }
}

export { UnityEngine_AudioClip_Impl }