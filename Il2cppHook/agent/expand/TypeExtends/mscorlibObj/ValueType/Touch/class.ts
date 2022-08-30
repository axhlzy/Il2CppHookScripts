import { System_ValueType_Impl } from "../class"
import { UnityEngine_Vector2_Impl as UnityEngine_Vector2 } from "../Vector2/class"

class UnityEngine_Touch_Impl extends System_ValueType_Impl {

    m_FingerId: number = lfv(this.handle, "m_FingerId") as unknown as number
    m_Position: UnityEngine_Vector2 = lfv(this.handle, "m_Position") as unknown as UnityEngine_Vector2
    m_RawPosition: UnityEngine_Vector2 = lfv(this.handle, "m_RawPosition") as unknown as UnityEngine_Vector2
    m_PositionDelta: UnityEngine_Vector2 = lfv(this.handle, "m_PositionDelta") as unknown as UnityEngine_Vector2
    m_TimeDelta: number = lfv(this.handle, "m_TimeDelta") as unknown as number
    m_TapCount: number = lfv(this.handle, "m_TapCount") as unknown as number
    m_Phase: UnityEngine_TouchPhase = lfv(this.handle, "m_Phase") as unknown as UnityEngine_TouchPhase
    m_Type: UnityEngine_TouchType = lfv(this.handle, "m_Type") as unknown as UnityEngine_TouchType
    m_Pressure: number = lfv(this.handle, "m_Pressure") as unknown as number
    m_maximumPossiblePressure: number = lfv(this.handle, "m_maximumPossiblePressure") as unknown as number
    m_Radius: number = lfv(this.handle, "m_Radius") as unknown as number
    m_RadiusVariance: number = lfv(this.handle, "m_RadiusVariance") as unknown as number
    m_AltitudeAngle: number = lfv(this.handle, "m_AltitudeAngle") as unknown as number
    m_AzimuthAngle: number = lfv(this.handle, "m_AzimuthAngle") as unknown as number

    constructor(handleOrWrapper: NativePointer) {
        super(handleOrWrapper)
    }

    get_fingerId(): number {
        return Il2Cpp.Api.Touch._get_fingerId(this.handle)
    }

    get_position(): UnityEngine_Vector2 {
        return Il2Cpp.Api.Touch._get_position(this.handle)
    }

    get_deltaPosition(): UnityEngine_Vector2 {
        return Il2Cpp.Api.Touch._get_deltaPosition(this.handle)
    }

    get_phase(): UnityEngine_TouchPhase {
        return Il2Cpp.Api.Touch._get_phase(this.handle)
    }

    get_type(): UnityEngine_TouchType {
        return Il2Cpp.Api.Touch._get_type(this.handle)
    }
}

Il2Cpp.Touch = UnityEngine_Touch_Impl

declare global {
    namespace Il2Cpp {
        class Touch extends UnityEngine_Touch_Impl { }
    }
}

export { UnityEngine_Touch_Impl }