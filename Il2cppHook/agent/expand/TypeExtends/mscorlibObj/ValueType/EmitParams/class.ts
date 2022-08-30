import { UnityEngine_ParticleSystem_Impl as ParticleSystem } from "../../Object/Component/ParticleSystem/class"
import { System_ValueType_Impl } from "../class"

class UnityEngine_ParticleSystem_EmitParams_Impl extends System_ValueType_Impl {

    m_Particle: ParticleSystem = new ParticleSystem(lfv(this.handle, "m_Particle"))
    m_PositionSet: boolean = lfv(this.handle, "m_PositionSet") as unknown as boolean
    m_VelocitySet: boolean = lfv(this.handle, "m_VelocitySet") as unknown as boolean
    m_AxisOfRotationSet: boolean = lfv(this.handle, "m_AxisOfRotationSet") as unknown as boolean
    m_RotationSet: boolean = lfv(this.handle, "m_RotationSet") as unknown as boolean
    m_AngularVelocitySet: boolean = lfv(this.handle, "m_AngularVelocitySet") as unknown as boolean
    m_StartSizeSet: boolean = lfv(this.handle, "m_StartSizeSet") as unknown as boolean
    m_StartColorSet: boolean = lfv(this.handle, "m_StartColorSet") as unknown as boolean
    m_RandomSeedSet: boolean = lfv(this.handle, "m_RandomSeedSet") as unknown as boolean
    m_StartLifetimeSet: boolean = lfv(this.handle, "m_StartLifetimeSet") as unknown as boolean
    m_MeshIndexSet: boolean = lfv(this.handle, "m_MeshIndexSet") as unknown as boolean
    m_ApplyShapeToPosition: boolean = lfv(this.handle, "m_ApplyShapeToPosition") as unknown as boolean

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }
}

Il2Cpp.EmitParams = UnityEngine_ParticleSystem_EmitParams_Impl

declare global {
    namespace Il2Cpp {
        class EmitParams extends UnityEngine_ParticleSystem_EmitParams_Impl { }
    }
}

export { UnityEngine_ParticleSystem_EmitParams_Impl }
