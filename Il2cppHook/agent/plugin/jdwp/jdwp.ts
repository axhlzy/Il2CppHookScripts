//  try {
//     void *art_handle = xdl_open("libart.so", XDL_DEFAULT);
//     if (art_handle == nullptr) {
//         throw std::runtime_error("art_handle is nullptr");
//     } else {
//         LOGI("art_handle = %p", art_handle);
//     }

//     // _ZN3art3Dbg9StartJdwpEv | static void StartJdwp();
//     auto lam_startJdwp = [&]() {
//         void *sym = xdl_sym(art_handle, "_ZN3art3Dbg9StartJdwpEv", nullptr);
//         LOGW("StartJdwp = %p", sym);
//         if (sym != nullptr) {
//             typedef void (*StartJdwp)();
//             StartJdwp startJdwp = (StartJdwp)sym;
//             startJdwp();
//         } else {
//             throw std::runtime_error("StartJdwp is nullptr");
//         }
//     };

const startJdwp = () => {
    const addr = Module.findExportByName("libart.so", "_ZN3art3Dbg9StartJdwpEv")
    if (addr) {
        const StartJdwp = new NativeFunction(addr, 'void', [])
        StartJdwp()
    } else {
        throw new Error("StartJdwp is nullptr")
    }
}

//     // _ZN3art3Dbg8StopJdwpEv | static void StopJdwp();
//     auto lam_stopJdwp = [&]() {
//         void *sym = xdl_sym(art_handle, "_ZN3art3Dbg8StopJdwpEv", nullptr);
//         LOGW("StopJdwp = %p", sym);
//         if (sym != nullptr) {
//             typedef void (*StopJdwp)();
//             StopJdwp stopJdwp = (StopJdwp)sym;
//             stopJdwp();
//         } else {
//             throw std::runtime_error("StopJdwp is nullptr");
//         }
//     };
const stopJdwp = () => {
    const addr = Module.findExportByName("libart.so", "_ZN3art3Dbg8StopJdwpEv")
    if (addr) {
        const StopJdwp = new NativeFunction(addr, 'void', [])
        StopJdwp()
    } else {
        throw new Error("StopJdwp is nullptr")
    }
}

//     // _ZN3art3Dbg14SetJdwpAllowedEb | static void SetJdwpAllowed(bool allowed);
//     auto lam_setJdwpAllowed = [&](bool allowed) {
//         void *sym = xdl_sym(art_handle, "_ZN3art3Dbg14SetJdwpAllowedEb", nullptr);
//         LOGW("SetJdwpAllowed = %p", sym);
//         if (sym != nullptr) {
//             typedef void (*SetJdwpAllowed)(bool);
//             SetJdwpAllowed setJdwpAllowed = (SetJdwpAllowed)sym;
//             setJdwpAllowed(allowed);
//         } else {
//             throw std::runtime_error("SetJdwpAllowed is nullptr");
//         }
//     };
const setJdwpAllowed = (allowed: boolean) => {
    const addr = Module.findExportByName("libart.so", "_ZN3art3Dbg14SetJdwpAllowedEb")
    if (addr) {
        const SetJdwpAllowed = new NativeFunction(addr, 'void', ['int'])
        SetJdwpAllowed(allowed ? 1 : 0)
    } else {
        throw new Error("SetJdwpAllowed is nullptr")
    }
}

//     // _ZN3art3Dbg13IsJdwpAllowedEv | static bool IsJdwpAllowed();
//     auto lam_isJdwpAllowed = [&]() {
//         void *sym = xdl_sym(art_handle, "_ZN3art3Dbg13IsJdwpAllowedEv", nullptr);
//         LOGW("IsJdwpAllowed = %p", sym);
//         if (sym != nullptr) {
//             typedef bool (*IsJdwpAllowed)();
//             IsJdwpAllowed isJdwpAllowed = (IsJdwpAllowed)sym;
//             return isJdwpAllowed();
//         } else {
//             throw std::runtime_error("IsJdwpAllowed is nullptr");
//         }
//     };
const isJdwpAllowed = () => {
    try {
        let addr = Module.findExportByName("libart.so", "_ZN3art3Dbg13IsJdwpAllowedEv")
        if (addr == null) {
            try {
                addr = Process.findModuleByName("libart.so")!
                    .enumerateSymbols()
                    .filter(e => e.name == "_ZN3artL12gJdwpAllowedE")[0]
                    .address
            } catch (error) {
                // ... 
            }
        }
        if (addr) {
            const IsJdwpAllowed = new NativeFunction(addr, 'bool', [])
            return IsJdwpAllowed()
        } else {
            throw new Error("IsJdwpAllowed is nullptr")
        }
    } catch (error) {
        return false
    }
}

//     // _ZN3art3Dbg12GetJdwpStateEv | static JDWP::JdwpState* GetJdwpState();
//     auto lam_getJdwpState = [&]() {
//         void *sym = xdl_sym(art_handle, "_ZN3art3Dbg12GetJdwpStateEv", nullptr);
//         LOGW("GetJdwpState = %p", sym);
//         if (sym != nullptr) {
//             typedef void *(*GetJdwpState)();
//             GetJdwpState getJdwpState = (GetJdwpState)sym;
//             return getJdwpState();
//         } else {
//             throw std::runtime_error("GetJdwpState is nullptr");
//         }
//     };
const getJdwpState = () => {
    const addr = Module.findExportByName("libart.so", "_ZN3art3Dbg12GetJdwpStateEv")
    if (addr) {
        const GetJdwpState = new NativeFunction(addr, 'pointer', [])
        return GetJdwpState()
    } else {
        throw new Error("GetJdwpState is nullptr")
    }
}

//     // _ZN3art3Dbg16IsJdwpConfiguredEvFUNC
//     auto lam_isJdwpConfigured = [&]() {
//         void *sym = xdl_sym(art_handle, "_ZN3art3Dbg16IsJdwpConfiguredEv", nullptr);
//         LOGW("IsJdwpConfigured = %p", sym);
//         if (sym != nullptr) {
//             typedef bool (*IsJdwpConfigured)();
//             IsJdwpConfigured isJdwpConfigured = (IsJdwpConfigured)sym;
//             return isJdwpConfigured();
//         } else {
//             throw std::runtime_error("IsJdwpConfigured is nullptr");
//         }
//     };
const isJdwpConfigured = () => {
    const addr = Module.findExportByName("libart.so", "_ZN3art3Dbg16IsJdwpConfiguredEv")
    if (addr) {
        const IsJdwpConfigured = new NativeFunction(addr, 'bool', [])
        return IsJdwpConfigured()
    } else {
        throw new Error("IsJdwpConfigured is nullptr")
    }
}

//     enum JdwpTransportType {
//         kJdwpTransportNone = 0,
//         kJdwpTransportUnknown,    // Unknown tranpsort
//         kJdwpTransportSocket,     // transport=dt_socket
//         kJdwpTransportAndroidAdb, // transport=dt_android_adb
//     };
enum JdwpTransportType {
    kJdwpTransportNone = 0,
    kJdwpTransportUnknown = 1,
    kJdwpTransportSocket = 2,
    kJdwpTransportAndroidAdb = 3
}

//     struct JdwpOptions {
//         JdwpTransportType transport = kJdwpTransportNone;
//         bool server = false;
//         bool suspend = false;
//         std::string host = "";
//         uint16_t port = static_cast<uint16_t>(-1);
//     };
class JdwpOptions {
    transport = JdwpTransportType.kJdwpTransportNone
    server = false
    suspend = false
    host = ""
    port = 0

    static tempMem = NULL

    constructor(transport: JdwpTransportType, server: boolean, suspend: boolean, host: string, port: number) {
        this.transport = transport
        this.server = server
        this.suspend = suspend
        this.host = host
        this.port = port
    }

    public get_pointer() {
        JdwpOptions.tempMem = Memory.alloc(0x4 + 0x2 + 0x2 + Process.pointerSize * 3 + 0x2)
        if (Process.arch == "arm64") {
            JdwpOptions.tempMem.add(0x0).writeInt(this.transport)
            JdwpOptions.tempMem.add(0x4).writeU16(this.server ? 1 : 0)
            JdwpOptions.tempMem.add(0x6).writeU16(this.suspend ? 1 : 0)
            JdwpOptions.tempMem.add(0x8).writeU8(this.host.length * 2)
            JdwpOptions.tempMem.add(0x9).writeUtf8String(this.host)
            JdwpOptions.tempMem.add(0x20).writeU16(this.port)
        } else if (Process.arch == "arm") {
            JdwpOptions.tempMem = Memory.alloc(0x28)
            JdwpOptions.tempMem.add(0x0).writeInt(this.transport)
            JdwpOptions.tempMem.add(0x4).writeU16(this.server ? 1 : 0)
            JdwpOptions.tempMem.add(0x6).writeU16(this.suspend ? 1 : 0)
            JdwpOptions.tempMem.add(0x8).writeU8(this.host.length * 2)
            JdwpOptions.tempMem.add(0x9).writeUtf8String(this.host)
            JdwpOptions.tempMem.add(0x14).writeU16(this.port)
        } else {
            throw new Error("Not support arch")
        }
        return JdwpOptions.tempMem
    }
}

//     // _ZN3art3Dbg13ConfigureJdwpERKNS_4JDWP11JdwpOptionsEFUNC | static void ConfigureJdwp(const JDWP::JdwpOptions& jdwp_options)
//     auto lam_configureJdwp = [&](const JdwpOptions &jdwp_options) {
//         void *sym = xdl_sym(art_handle, "_ZN3art3Dbg13ConfigureJdwpERKNS_4JDWP11JdwpOptionsE", nullptr);
//         LOGW("ConfigureJdwp = %p", sym);
//         if (sym != nullptr) {
//             typedef void (*ConfigureJdwp)(const JdwpOptions &);
//             ConfigureJdwp configureJdwp = (ConfigureJdwp)sym;
//             configureJdwp(jdwp_options);
//         } else {
//             throw std::runtime_error("ConfigureJdwp is nullptr");
//         }
//     };
const configureJdwp = (jdwp_options: JdwpOptions) => {
    const addr = Module.findExportByName("libart.so", "_ZN3art3Dbg13ConfigureJdwpERKNS_4JDWP11JdwpOptionsE")
    if (addr) {
        const ConfigureJdwp = new NativeFunction(addr, 'void', ['pointer'])
        ConfigureJdwp(jdwp_options.get_pointer())
    } else {
        throw new Error("ConfigureJdwp is nullptr")
    }
}

//     lam_stopJdwp();

//     if (!lam_isJdwpAllowed()) {
//         lam_setJdwpAllowed(true);
//     }

//     if (!lam_isJdwpConfigured()) {
//         static JdwpOptions jdwpOptions;
//         jdwpOptions.server = true;
//         jdwpOptions.suspend = false;
//         jdwpOptions.port = 8000;
//         jdwpOptions.host = "127.0.0.1";
//         jdwpOptions.transport = JdwpTransportType::kJdwpTransportAndroidAdb;
//         lam_configureJdwp(jdwpOptions);
//     }

//     lam_startJdwp();

export function startJdwpThread() {
    stopJdwp()

    if (!isJdwpAllowed()) {
        setJdwpAllowed(true)
    }

    if (!isJdwpConfigured()) {
        const jdwpOptions = new JdwpOptions(
            JdwpTransportType.kJdwpTransportAndroidAdb,
            true,
            false,
            "127.0.0.1",
            8000,
        )
        configureJdwp(jdwpOptions)
    }

    startJdwp()

    LOGW(`\nUseage: 
        adb forward tcp:${Process.id} jdwp:${Process.id}
        adb reverse tcp:${Process.id} tcp:${Process.id}
        jdb -attach ${Process.id}\n`)
}

// } catch (const std::exception &e) {
//     LOGD("error: %s", e.what());
// }


declare global {
    var startJdwpThread: () => void
}

globalThis.startJdwpThread = startJdwpThread