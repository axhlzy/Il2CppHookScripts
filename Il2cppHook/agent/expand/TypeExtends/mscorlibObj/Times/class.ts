class UnityEngine_Time_impl extends Il2cpp.Object {

    static get get_time(): number {
        return Il2Cpp.Api.Time._get_time()
    }

    static get get_deltaTime(): number {
        return Il2Cpp.Api.Time._get_deltaTime()
    }

    static get get_unscaledTime(): number {
        return Il2Cpp.Api.Time._get_unscaledTime()
    }

    static get get_fixedUnscaledTime(): number {
        return Il2Cpp.Api.Time._get_fixedUnscaledTime()
    }

    static get get_unscaledDeltaTime(): number {
        return Il2Cpp.Api.Time._get_unscaledDeltaTime()
    }

    static get get_fixedDeltaTime(): number {
        return Il2Cpp.Api.Time._get_fixedDeltaTime()
    }

    static get get_smoothDeltaTime(): number {
        return Il2Cpp.Api.Time._get_smoothDeltaTime()
    }

    static get get_timeScale(): number {
        return Il2Cpp.Api.Time._get_timeScale()
    }

    static set_timeScale(value: number): void {
        Il2Cpp.Api.Time._set_timeScale(value)
    }

    static get get_frameCount(): number {
        return Il2Cpp.Api.Time._get_frameCount()
    }

    static get get_realtimeSinceStartup(): number {
        return Il2Cpp.Api.Time._get_realtimeSinceStartup()
    }
}

declare global {
    namespace Il2Cpp {
        class Time extends UnityEngine_Time_impl { }
    }
}

Il2Cpp.Time = UnityEngine_Time_impl;

export { UnityEngine_Time_impl };