// <Serializable, Token(Token:="0x200014C"), Attribute(Name:="ComVisibleAttribute", RVA:="0x201DD0", Offset:="0x201DD0") > _
// Public Enum PlatformID
// ' Fields
//     < Token(Token:="0x40005A3") > _
// MacOSX = 6
//     < Token(Token:="0x40005A1") > _
// Unix = 4
//     < Token(Token:="0x400059F") > _
// Win32NT = 2
//     < Token(Token:="0x400059D") > _
// Win32S = 0
//     < Token(Token:="0x400059E") > _
// Win32Windows = 1
//     < Token(Token:="0x40005A0") > _
// WinCE = 3
//     < Token(Token:="0x40005A2") > _
// Xbox = 5
// End Enum

export enum System_PlatformID {
    Win32S = 0,
    Win32Windows = 1,
    Win32NT = 2,
    WinCE = 3,
    Unix = 4,
    Xbox = 5,
    MacOSX = 6,
}