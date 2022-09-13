export function Time() {
    LOG(`${getLine(20)} TIME ${getLine(20)}`, LogColor.RED)
    LOGD(`[*] get_time\t\t\t\t${Il2Cpp.Time.get_time}\n${getLine(20)}`)
    LOGD(`[*] get_deltaTime\t\t\t${Il2Cpp.Time.get_deltaTime}\n${getLine(20)}`)
    LOGD(`[*] get_fixedDeltaTime\t\t\t${Il2Cpp.Time.get_fixedDeltaTime}\n${getLine(20)}`)
    LOGD(`[*] get_realtimeSinceStartup\t\t${Il2Cpp.Time.get_realtimeSinceStartup}\n${getLine(20)}`)
    LOGD(`[*] get_smoothDeltaTime\t\t\t${Il2Cpp.Time.get_smoothDeltaTime}\n${getLine(20)}`)
    LOGD(`[*] get_timeScale\t\t\t${Il2Cpp.Time.get_timeScale}\n${getLine(20)}`)
    // LOGD(`[*] get_timeSinceLevelLoad\t\t${Il2Cpp.Time.get_timeSinceLevelLoad}\n${getLine(20)}`)
    LOGD(`[*] get_unscaledDeltaTime\t\t${Il2Cpp.Time.get_unscaledDeltaTime}\n${getLine(20)}`)
    LOGD(`[*] get_frameCount\t\t\t${Il2Cpp.Time.get_frameCount}\n${getLine(20)}`)
}