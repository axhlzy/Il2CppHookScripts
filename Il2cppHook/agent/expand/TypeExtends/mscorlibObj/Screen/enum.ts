// <Token(Token:="0x200006B")> _
// Public Enum FullScreenMode
// ' Fields
//     < Token(Token:="0x4000145") > _
// ExclusiveFullScreen = 0
//     < Token(Token:="0x4000146") > _
// FullScreenWindow = 1
//     < Token(Token:="0x4000147") > _
// MaximizedWindow = 2
//     < Token(Token:="0x4000148") > _
// Windowed = 3
// End Enum

export enum UnityEngine_FullScreenMode {
    ExclusiveFullScreen = 0,
    FullScreenWindow = 1,
    MaximizedWindow = 2,
    Windowed = 3,
}
/**
 * <Token(Token:="0x2000090")> _
Public Enum ScreenOrientation
    ' Fields
    <Token(Token:="0x40001BB")> _
    AutoRotation = 5
    <Token(Token:="0x40001BC")> _
    Landscape = 3
    <Token(Token:="0x40001B9")> _
    LandscapeLeft = 3
    <Token(Token:="0x40001BA")> _
    LandscapeRight = 4
    <Token(Token:="0x40001B7")> _
    Portrait = 1
    <Token(Token:="0x40001B8")> _
    PortraitUpsideDown = 2
    <Token(Token:="0x40001B6"), Attribute(Name:="ObsoleteAttribute", RVA:="0x1F25FC", Offset:="0x1F25FC")> _
    Unknown = 0
End Enum
 */

export enum UnityEngine_ScreenOrientation {
    AutoRotation = 5,
    Landscape = 3,
    LandscapeLeft = 3,
    LandscapeRight = 4,
    Portrait = 1,
    PortraitUpsideDown = 2,
    Unknown = 0,
}