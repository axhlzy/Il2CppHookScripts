
export enum TYPE_STR { U_STR, C_STR }

export type PTR = NativePointer | number

// ExportFunctions
export enum EpFunc {
    il2cpp_get_corlib, il2cpp_domain_get, il2cpp_domain_get_assemblies, il2cpp_assembly_get_image,
    il2cpp_image_get_class_count, il2cpp_image_get_class,
    il2cpp_class_get_methods, il2cpp_class_from_type, il2cpp_class_get_type, il2cpp_class_from_system_type, il2cpp_class_from_name, il2cpp_class_get_method_from_name,
    il2cpp_string_new, il2cpp_type_get_name, il2cpp_type_get_class_or_element_class, il2cpp_class_get_field_from_name,
    il2cpp_class_num_fields, il2cpp_class_get_fields, il2cpp_field_static_get_value, il2cpp_field_static_set_value,
    getName, getLayer, getTransform, getParent, getChildCount, getChild, get_pointerEnter, pthread_create, getpid, gettid, sleep,
    DecodeJObject, GetDescriptor, ArtCurrent,
    newThreadCallBack
}

export enum GKEY {
    // 格式化展示使用到 let lastTime = 0
    // 不要LOG的时候值为false，需要时候true let LogFlag = true
    // count_method_times 数组用于记录 breakPoints 中方法出现的次数,index是基于临时变量 t_arrayAddr，而不是 arrayAddr  var count_method_times
    // 断点的函数出现次数大于 maxCallTime 即不显示 var maxCallTime = 10
    // let LshowLOG = true | let newThreadDelay = 0
    soName, soAddr, p_size, lastTime, LogFlag, count_method_times, maxCallTime, LshowLOG, newThreadDelay, frida_env
}

// map key
export enum MapKAY {
    // map_attach_listener      用来记录已经被 Attach  的函数Listener
    // map_find_class_cache     find_class 的缓存
    // outFilterMap             filterDuplicateOBJ
    // CommonCache 通用缓存      目前暂时只用来缓存 Text
    map_attach_listener, map_find_class_cache, map_find_method_cache, outFilterMap, CommonCache
}

//array key
export enum ArrKAY {
    // arr_img_addr
    // arr_img_names    存放初始化（list_Images）时候的 imgAddr 以及 imgName
    // findClassCache   第二次使用findClass的缓存
    // arr_nop_addr     用来记录已经被 replace 的函数地址
    // arr_runtimeType  用来记录运行时类型
    // findMethodArray  只存在于B时候的临时变量，用来记录需要断点的方法地址并方便 b 移除，避免重复显示
    // t_arrayAddr      过滤 只显示指定ClassName下的Methods filterClass.push("clsName") //即可开启过滤clsName
    // filterClass      clsName 如果显示不全可以使用 getClassName(ptr) 得到全名，不用过滤的时候置空这个array即可
    // arrMethodInfo    存放MethodInfo指针（供动态断点 a() 提供更详细的信息）
    arr_img_addr, arr_img_names, findClassCache, arr_nop_addr, arr_runtimeType, findMethodArray, t_arrayAddr, filterClass, arrMethodInfo, arrayAddr, arrayName
}

export type GKEYE = GKEY | ArrKAY | MapKAY

export enum il2cppTabledefs {
    METHOD_ATTRIBUTE_MEMBER_ACCESS_MASK = 0x0007,
    METHOD_ATTRIBUTE_COMPILER_CONTROLLED = 0x0000,
    METHOD_ATTRIBUTE_PRIVATE = 0x0001,
    METHOD_ATTRIBUTE_FAM_AND_ASSEM = 0x0002,
    METHOD_ATTRIBUTE_ASSEM = 0x0003,
    METHOD_ATTRIBUTE_FAMILY = 0x0004,
    METHOD_ATTRIBUTE_FAM_OR_ASSEM = 0x0005,
    METHOD_ATTRIBUTE_PUBLIC = 0x0006,

    METHOD_ATTRIBUTE_STATIC = 0x0010,
    METHOD_ATTRIBUTE_FINAL = 0x0020,
    METHOD_ATTRIBUTE_VIRTUAL = 0x0040,
    METHOD_ATTRIBUTE_ABSTRACT = 0x0400,
    METHOD_ATTRIBUTE_PINVOKE_IMPL = 0x2000,
    METHOD_ATTRIBUTE_VTABLE_LAYOUT_MASK = 0x0100,

    METHOD_ATTRIBUTE_REUSE_SLOT = 0x0000,
    METHOD_ATTRIBUTE_NEW_SLOT = 0x0100
}

export enum FieldAccess {
    FIELD_ATTRIBUTE_FIELD_ACCESS_MASK = 0x0007,
    FIELD_ATTRIBUTE_COMPILER_CONTROLLED = 0x0000,
    FIELD_ATTRIBUTE_PRIVATE = 0x0001,
    FIELD_ATTRIBUTE_FAM_AND_ASSEM = 0x0002,
    FIELD_ATTRIBUTE_ASSEMBLY = 0x0003,
    FIELD_ATTRIBUTE_FAMILY = 0x0004,
    FIELD_ATTRIBUTE_FAM_OR_ASSEM = 0x0005,
    FIELD_ATTRIBUTE_PUBLIC = 0x0006,

    FIELD_ATTRIBUTE_STATIC = 0x0010,
    FIELD_ATTRIBUTE_INIT_ONLY = 0x0020,
    FIELD_ATTRIBUTE_LITERAL = 0x0040,
    FIELD_ATTRIBUTE_NOT_SERIALIZED = 0x0080,
    FIELD_ATTRIBUTE_SPECIAL_NAME = 0x0200,
    FIELD_ATTRIBUTE_PINVOKE_IMPL = 0x2000,

    FIELD_ATTRIBUTE_RESERVED_MASK = 0x9500,
    FIELD_ATTRIBUTE_RT_SPECIAL_NAME = 0x0400,
    FIELD_ATTRIBUTE_HAS_FIELD_MARSHAL = 0x1000,
    FIELD_ATTRIBUTE_HAS_DEFAULT = 0x8000,
    FIELD_ATTRIBUTE_HAS_FIELD_RVA = 0x0100
}

export enum LogColor {
    WHITE = 0, RED = 1, YELLOW = 3,
    C31 = 31, C32 = 32, C33 = 33, C34 = 34, C35 = 35, C36 = 36,
    C41 = 41, C42 = 42, C43 = 43, C44 = 44, C45 = 45, C46 = 46,
    C90 = 90, C91 = 91, C92 = 92, C93 = 93, C94 = 94, C95 = 95, C96 = 96, C97 = 97,
    C100 = 100, C101 = 101, C102 = 102, C103 = 103, C104 = 104, C105 = 105, C106 = 106, C107 = 107
}

export enum ADS_TYPE {
    IronSource, MaxSdkCallbacks, MoPubManager, TTPluginsGameObject,
}

// (NativePointer as any).prototype.callFunction = function (...args: any[]): NativePointer {
//     return callFunction(this, ...args)
// }

// Object.defineProperty(NativePointer.prototype, "callFunction", {
//     value: function (...args: any[]): NativePointer {
//         return callFunction(this, ...args)
//     }
// })

(NativePointer as any).prototype.callFunction = function (...args: any[]): NativePointer {
    return ptr(1)
}

Object.defineProperty(NativePointer.prototype, "callFunction", {
    value: function (...args: any[]): NativePointer {
        return ptr(2)
    }
})


/**
 * #define SIGHUP 1
#define SIGINT 2
#define SIGQUIT 3
#define SIGILL 4
#define SIGTRAP 5
#define SIGABRT 6
#define SIGIOT 6
#define SIGBUS 7
#define SIGFPE 8
#define SIGKILL 9
#define SIGUSR1 10
#define SIGSEGV 11
#define SIGUSR2 12
#define SIGPIPE 13
#define SIGALRM 14
#define SIGTERM 15
#define SIGSTKFLT 16
#define SIGCHLD 17
#define SIGCONT 18
#define SIGSTOP 19
#define SIGTSTP 20
#define SIGTTIN 21
#define SIGTTOU 22
#define SIGURG 23
#define SIGXCPU 24
#define SIGXFSZ 25
#define SIGVTALRM 26
#define SIGPROF 27
#define SIGWINCH 28
#define SIGIO 29
#define SIGPOLL SIGIO
#define SIGPWR 30
#define SIGSYS 31
#define SIGUNUSED 31
#define __SIGRTMIN 32
 */
export enum SIGNAL {
    SIGHUP = 1,
    SIGINT = 2,
    SIGQUIT = 3,
    SIGILL = 4,
    SIGTRAP = 5,
    SIGABRT = 6,
    SIGIOT = 6,
    SIGBUS = 7,
    SIGFPE = 8,
    SIGKILL = 9,
    SIGUSR1 = 10,
    SIGSEGV = 11,
    SIGUSR2 = 12,
    SIGPIPE = 13,
    SIGALRM = 14,
    SIGTERM = 15,
    SIGSTKFLT = 16,
    SIGCHLD = 17,
    SIGCONT = 18,
    SIGSTOP = 19,
    SIGTSTP = 20,
    SIGTTIN = 21,
    SIGTTOU = 22,
    SIGURG = 23,
    SIGXCPU = 24,
    SIGXFSZ = 25,
    SIGVTALRM = 26,
    SIGPROF = 27,
    SIGWINCH = 28,
    SIGIO = 29,
    SIGPOLL = 29,
    SIGPWR = 30,
    SIGSYS = 31,
    SIGUNUSED = 31,
    __SIGRTMIN = 32,
}

export enum JSHOOKTYPE {
    INLINE,
    ARGS,
    STACK,
    METHOD,
    MEMORY
}

export enum MethodSortType {
    ADDRESS = 0, // 默认低地址在前高地址在后
    ACCESS = 1, // 这个还算比较常用，把public函数提前方便查看
    MethodName = 2,
    ARGSCOUNT = 3,
}