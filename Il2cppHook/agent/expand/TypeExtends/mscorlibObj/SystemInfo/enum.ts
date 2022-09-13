export enum RenderTextureFormat {
    ARGB1555 = 6,
    ARGB2101010 = 8,
    ARGB32 = 0,
    ARGB4444 = 5,
    ARGB64 = 10,
    ARGBFloat = 11,
    ARGBHalf = 2,
    ARGBInt = 0x11,
    BGR101010_XR = 0x1B,
    BGRA10101010_XR = 0x1A,
    BGRA32 = 20,
    Default = 7,
    DefaultHDR = 9,
    Depth = 1,
    R16 = 0x1C,
    R8 = 0x10,
    RFloat = 14,
    RG16 = 0x19,
    RG32 = 0x17,
    RGB111110Float = 0x16,
    RGB565 = 4,
    RGBAUShort = 0x18,
    RGFloat = 12,
    RGHalf = 13,
    RGInt = 0x12,
    RHalf = 15,
    RInt = 0x13,
    Shadowmap = 3
}

export enum CopyTextureSupport {
    Basic = 1,
    Copy3D = 2,
    DifferentTypes = 4,
    None = 0,
    RTToTexture = 0x10,
    TextureToRT = 8
}

export enum DeviceType {
    Console = 2,
    Desktop = 3,
    Handheld = 1,
    Unknown = 0
}

export enum OperatingSystemFamily {
    Linux = 3,
    MacOSX = 1,
    Other = 0,
    Windows = 2
}

export enum GraphicsDeviceType {
    Null = 4,
    Direct3D9 = 1,
    Direct3D11 = 2,
    PlayStation3 = 3,
    Xbox360 = 6,
    OpenGL2 = 0,
    OpenGLES2 = 8,
    OpenGLES3 = 11,
    PlayStationVita = 12,
    PlayStation4 = 13,
    XboxOne = 14,
    Vulkan = 0x15,
    Switch = 0x16,
    XboxOneD3D12 = 0x17,
    GameCoreXboxOne = 0x18,
    GameCoreXboxSeries = 0x19,
    Metal = 0x10,
    OpenGLCore = 0x11,
    Direct3D12 = 0x12,
    N3DS = 0x13,
    PlayStationMobile = 15,
    PlayStation5 = 0x1A,
    PlayStation5NGGC = 0x1B
}