function dump_so(soName: string = "libil2cpp.so") {
    const module = Process.getModuleByName(soName)
    LOGE(getLine(30))
    LOGW("[name]:" + module.name)
    LOGW("[base]:" + module.base)
    LOGW("[size]:" + module.size)
    LOGW("[path]:" + module.path)
    LOGE(getLine(30))
    const fileName = `${module.name}_${module.base}_${ptr(module.size)}.so`
    dump_mem(module.base, module.size, fileName)
}

function dump_mem(from: NativePointer, length: number, fileName: string | undefined) {
    from = checkCmdInput(from)
    if (length <= 0) return

    // 获取dump文件路径
    let savedPath: string = ''
    Java.perform(function () {
        let currentApplication = Java.use("android.app.ActivityThread").currentApplication()
        savedPath = currentApplication.getApplicationContext().getFilesDir().getPath()
    })
    // 拼接文件名
    if (fileName == undefined) {
        savedPath += `/${from}_${length}.bin`
    } else {
        savedPath += fileName
    }
    // dump
    const file_handle = new File(savedPath, "wb")
    if (file_handle && file_handle != null) {
        Memory.protect(from, length, 'rwx')
        let libso_buffer = from.readByteArray(length)!
        file_handle.write(libso_buffer)
        file_handle.flush()
        file_handle.close()
        LOGZ(`\nDump ${length} bytes from ${from} to ${from.add(length)}`)
        LOGD(`Saved to -> ${savedPath}\n`)
    }
}

declare global {
    var dumpSo: (soName: string) => void
    var dumpMem: (from: NativePointer, length: number, fileName: string | undefined) => void
}

globalThis.dumpSo = dump_so
globalThis.dumpMem = dump_mem

export { }