export const B_Particle = (): void => {
    D()
    BF("Fx")
    B("ParticleSystem")
    HookSetActive(true, false, ["Fx", "fx", "Blood", "blood", "Effect", "effect"])
}

globalThis.B_Particle = B_Particle
declare global {
    var B_Particle: () => void
}