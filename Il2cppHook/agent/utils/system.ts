export const systemCommand = (command: string): NativePointer => {
    let system = new NativeFunction(Module.findExportByName("libc.so", "system")!, "pointer", ["pointer"])
    return system(Memory.allocUtf8String(command))
}

export const systemCommandSU = (command: string): NativePointer => systemCommand(`su -c '${command}'`)

declare global {
    var system: (command: string) => NativePointer
    var systemSU: (command: string) => NativePointer
}

globalThis.system = systemCommand
globalThis.systemSU = systemCommandSU


/**
 * 手动调用dlopen加载so（用在inlinehook编译出的so）
 * 这里需要手动把文件 adb push inject.so /sdcard/360/inject.so
 * 剩下的复制加载工作就交给 dlopen(name)
 */
// function dlopen(name) {
//     var temp_src_path = "/sdcard/360/" + name
//     var temp_aim_path = getLibPath(name)
//     var dlopen = new NativeFunction(Module.findExportByName("libc.so", "dlopen"), "pointer", ["pointer", "int"])
//     var system = new NativeFunction(Module.findExportByName("libc.so", "system"), "pointer", ["pointer"])
//     system(Memory.allocUtf8String("su -c 'cp " + temp_src_path + " " + temp_aim_path + "'"))
//     system(Memory.allocUtf8String("su -c 'chmod 777 " + temp_aim_path + "'"))
//     var handle = dlopen(Memory.allocUtf8String(temp_aim_path), 1)
//     var showStr = "Copy And Loaded " + temp_aim_path
//     var showStr2 = "Handle -> " + handle
//     var line = getLine(showStr.length)
//     LOG(line, LogColor.C33)
//     LOG("Copy And Loaded " + temp_aim_path, LogColor.C36)
//     LOG(getLine(showStr2.length), LogColor.C33)
//     LOG(showStr2, LogColor.C36)
//     LOG(line, LogColor.C33)
// }

// function dlclose(handle) {
//     LOG(new NativeFunction(Module.findExportByName("libc.so", "dlclose"), "int", ["pointer"])(handle))
// }