declare class Module {
    static findExportByName(moduleName: string | null, exportName: string): NativePointer | null
    static findGlobalExportByName(exportName: string): NativePointer | null
}

interface ParsedVersion {
    major: number
    minor: number
    patch?: number
    raw: string
}
export function parseFridaVersion(versionString: string): ParsedVersion | null {
    if (!versionString || typeof versionString !== 'string') {
        return null
    }
    const parts = versionString.split('.')
    if (parts.length === 0) {
        return null
    }
    const major = parseInt(parts[0], 10);
    if (isNaN(major)) {
        return null
    }
    const minor = parts.length > 1 ? parseInt(parts[1], 10) : 0;
    const patch = parts.length > 2 ? parseInt(parts[2], 10) : undefined
    return {
        major: major,
        minor: isNaN(minor) ? 0 : minor,
        patch: isNaN(patch as number) ? undefined : patch,
        raw: versionString
    };
}

let v = parseFridaVersion(Frida.version)
if (!v || v.major >= 17) {
    Module.findExportByName = function(moduleName: string | null, exportName: string): NativePointer | null {
        // console.log(`[Frida Adapter] Redirecting Module.findExportByName('${moduleName}', '${exportName}') to Module.findGlobalExportByName('${exportName}')`);
        return Module.findGlobalExportByName(exportName);
    }
}