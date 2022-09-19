## Il2cppHook

### 基于 frida 的 libil2cpp.so 运行时解析脚本
 
#### Features 

- 解析 `Unity` 的方法 / 类 / 字段
- 解析 `运行时` 方法参数
- 常用函数的 `（批量）断点`（参数值 / 返回值 查看）
- 更方便的查看以及调用函数

#### Usage
```sh
$ git clone https://github.com/axhlzy/Il2CppHookScripts.git
$ cd Il2cppHook/
$ npm install

$ frida -U --no-pause -f com.xxx.xxx -l  ../_Ufunc.js
OR
$ frida -FU -l ../_Ufunc.js
```

#### API

##### Contents


  1. 基础函数
     * [i() == list_images : 列出所有的 Images](#list_images)
     * [c() == list_classes : 列出所有的 Classes](#list_classes)
     * [m() == list_methods : 列出所有的 Methods](#list_methods)
     * [f() == list_fields : 列出所有的 Fields](#list_fields)
     * [findClass(className) : 查找类,一般配合 m() 使用 , m(findClass('className')) === m('className')](#findClass)
     * [findMethod / find_method : 根据类名查找相关的函数](#findMethod)
     * [printExp : 查找名称为参数的函数,比较慢，但是方便](#printExp)
     * [getApkInfo : 获取 apk 信息](#getApkInfo)
     * [callFunction : 函数调用](#callFunction)
     * [showAsm : 基于frida.Instruction结合unity函数信息的反汇编](#showAsm)
     * [showMethodInfo / MethodToShow : 查看MethodInfo信息（后者多用在findMethod）](#MethodInfo)
  2. 断点函数
     * [B : breakPoint 断点函数类 / b : 断点指定的一个函数](#bp)
     * [n/nn : nop 指定的一个函数](#np)
     * [breakInline : InlineHook](#breakInline)
     * [breakWithArgs : 带参数断点](#breakWithArgs)
     * [breakWithStack : 带堆栈断点](#breakWithStack)
     * [dlopen.ts : 提供早期函数hook位置的回调](#dlopen)
     * [watch/watchDisabled : MemoryAccessMonitor的简单封装（arm32易崩）](#watch)
     * [StalkerTracePath : StalkerTrace封装,分析调用顺序](#StalkerTracePath)
     * [StalkerTraceEvent : StalkerTraceEvent,分析事件](#StalkerTraceEvent)
  3. 常用函数Hook的封装
     * [HookOnPointerClick ：Hook 点击事件](#HookOnPointerClick)
     * [HookDebugLog : Hook Debug.Log](#HookDebugLog)
     * [HookSetActive : Hook SetActive](#HookSetActive)
     * [HookPlayerPrefs : Hook PlayerPrefs](#HookPlayerPrefs)
     * [B_Button : HookOnPointerClick to get actions](#B_Button)
     * [PrintHierarchy : 打印当前场景的层级结构](#PrintHierarchy)
     * ...
  4. Module/Thread相关
     * [listModule : (filterName?: string) => void](#listModule)
     * [listModules : (moduleName: string, printItems?: number) => void](#listModules)
     * [listThreads : (maxCountThreads?: number) => void](#listThreads)
     * [attachCurrentThread : Il2Cpp.Api._threadCurrent()](#attachCurrentThread)
     * [findExport : (exportName: string, moduleName?: string, callback?: (exp: ModuleExportDetails) => void) => void](#findExport)
     * [findImport : (moduleName: string, importName?: string) => void](#findImport)

  ...

--- 
#### Examples

- **i() == list_images 不带参数即列出所有的 Images** <a id="list_images"></a>
  
    ![list_images](img/list_images.png)

- **c() == list_classes 列出所有的 Classes list_classes(ptr/strFilter)** <a id="list_classes"></a>
  
    ![list_classes](img/list_classes.png)

- **m() == list_methods 列出所有的 Methods** <a id="list_methods"></a>
  
    ![list_methods](img/list_methods.png)

- **f() == list_fields 列出所有的 Fields** <a id="list_fields"></a>
  
    ![list_fields](img/list_fields.png)

- **findClass(className) 查找类,一般配合 m() 使用 , m(findClass('className')) === m('className')** <a id="findClass"></a>
  
    ![findClass](img/findClass.png)

- **findMethod 新版 / find_method 旧版** <a id="findMethod"></a>
  
    ![findMethod](img/findMethod.png)

- **printExp 作为findMethod的补充版，方便查找函数** <a id="printExp"></a>
    - 第一个参数是查找的函数名
        ![findMethod](img/printExp_0.png)
    - 第二个参数标识是否全局查找（默认在常用的函数中查找，因为是遍历嘛，这样可以有效提高查找速度）
        ![findMethod](img/printExp_1.png)

- **getApkInfo 获取 apk 信息** <a id="getApkInfo"></a>
  
    ![getApkInfo](img/getApkInfo.png)

- **callFunction 函数调用** <a id="callFunction"></a>
      
     ![callFunction](img/callFunction.png)

- **showAsm 基于frida.Instruction结合unity函数信息的反汇编** <a id="showAsm"></a>
    
    ![showAsm](img/showAsm.png)
    
    ![showAsmSP](img/showAsmSP.png)

- **showMethodInfo / MethodToShow 查看MethodInfo信息（后者多用在findMethod）showAddressInfo alias showMethodInfo(addressToMethod)** <a id="MethodInfo"></a>
    
    ![showMethodInfo](img/showMethodInfo.png)

- **B breakPoint 断点函数类** <a id="bp"></a>
  - B ('ClassName') === B(findClass('ClassName')),不会重复添加已添加的Method,不带参数即断点所有常用的方法
  
    ![breakPoint_B](img/breakPoint_B_0.png)
  - BF 等价于原来的 B("filterStr") ,断点包含指定字符串的方法
  
    ![breakPoint_BF](img/breakPoint_BF.png)

  - b ('Method_Pointer') / b('MethodInfo_Pointer')
      
    ![breakPoint_b](img/breakPoint_b_1.png)

  - d / D : d === detachAll and d(ptr) === detach(ptr) / D()  === detachAll + clear list cache
  - bp('filterMethodName') 断点包含 指定的函数名(filterMethodName)  的所有函数

- **n/nn nop Function** <a id="np"></a>
  
  - n / nn : n(ptr) === nop function and nn() === cancel nop function

    ![nop](img/nop.png)

- **breakInline InlineHook** <a id="breakInline"></a>
  
    ![breakInline](img/breakInline.png)
    
- **breakWithArgs 带参数断点** <a id="breakWithArgs"></a>

    ![breakWithArgs](img/breakWithArgs.png)

- **breakWithStack 带堆栈断点** <a id="breakWithStack"></a>
    
    ![breakWithStack](img/breakWithStack.png)

- **dlopen : 提供一个早期的函数hook点** <a id="dlopen"></a>
  
    ![dlopen](img/dlopen.png)

- **watch/watchDisabled MemoryAccessMonitor的简单封装（arm32易崩）** <a id="watch"></a>
  
    ![watch](img/watch.png)

- **StalkerTracePath StalkerTrace封装,分析调用顺序** <a id="StalkerTracePath"></a>
    
    ![StalkerTracePath](img/StalkerTracePath.png)

- **StalkerTraceEvent StalkerTraceEvent,分析事件** <a id="StalkerTraceEvent"></a>
    
    ![StalkerTraceEvent](img/StalkerTraceEvent.png)

- **HookOnPointerClick ：Hook 点击事件** <a id="HookOnPointerClick"></a>
  
    ![HookOnPointerClick](img/HookOnPointerClick.png)

- **HookDebugLog : Hook Debug.Log** <a id="HookDebugLog"></a>
    
    ![HookDebugLog](img/HookDebugLog.png)

- **HookSetActive : Hook SetActive** <a id="HookSetActive"></a>
    
    ![HookSetActive](img/HookSetActive.png)

- **HookPlayerPrefs : Hook PlayerPrefs** <a id="HookPlayerPrefs"></a>
    
    ![HookPlayerPrefs](img/HookPlayerPrefs.png)

- **B_Button : Hook Button** <a id="B_Button"></a>
    
    ![B_Button](img/B_Button.png)

    ![B_Button](img/B_Button_1.png)

- **PrintHierarchy : 打印当前场景的层级结构** <a id="PrintHierarchy"></a>
  - 注意：arm64的地址用双引号包裹起来，arm32直接传递即可
    ![PrintHierarchy](img/PrintHierarchy.png)

- **listModule (filterName: string) => void** <a id="listModule"></a>
  
    ![listModule](img/listModule.png)

- **listModules (moduleName: string, printItems?: number) => void** <a id="listModules"></a>
  
    ![listModules](img/listModules.png)

- **listThreads (maxCountThreads?: number) => void** <a id="listThreads"></a>
  
    ![listThreads](img/listThreads.png)

- **findExport (exportName: string, moduleName?: string, callback?: (exp: ModuleExportDetails) => void) => void** <a id="findExport"></a>
  
    ![findExport](img/findExport.png)

- **findImport (moduleName: string, importName?: string) => void** <a id="findImport"></a>

    ![findImport](img/findImport.png)


...

#### Commit
- 文件结构按照Unity类继承关系实现
- 文件命名规则以及结构
  - 一个类文件夹下一个include.ts包含当前类文件以及该类子类文件夹的include
  - api.ts 
    - 用作解析常用函数 (exp: ptr(Il2Cpp.Api.Application._Quit) )
    - 函数的命名使用 '_' + 具体的函数名，多参数使用后缀 '_x' 结尾i (exp: Il2Cpp.Api.Application._Quit_1)
    - api class 命名为 类名 + 'API' (exp: System_ValueType_API)
  - class.ts
    - NativePointer转换为Class的实现 (把ptr当成class来解析)
    - 包含一些（静态）字段，（静态）方法，以及方便调用的一些函数封装
    - this.handle 存贮当前 ptr，可以是 实例指针也可以是类指针 （多数情况使用实例指针）
  - export.ts
    - 主要用作拓展类的一些导出方法
- TODO 按照这个文件结构可以拓展到整个UnityAPI
    (提供了 generateApi / generateClass / generateFieldEnum 方便的拓展类，生成的东西不太准，需要稍微修改点点)

#### Tips
- 由于JS特性的问题，再arm64下的指针大小是8字节，所以arm64下控制台传参指针值的时候建议使用string类型 
    存在计算精度的问题(js命令行传参最大值为Number.MAX_SAFE_INTEGER = 9007199254740991,直接给值超出范围导致精度丢失)
    use ptr("0x12345678") instead of ptr(0x12345678)
    这部分发现的比较晚后续很多东西都没有做好优化
- 我这里用的环境： frida==15.2.2 | frida-tools==10.5.4 , 测试机 ：piex 4 原生android 11
    1. 确认手机端server与电脑端frida版本一致，如果你的版本不一致概率性出问题
    2. 已确认高版本的 frida-tools 在使用老版 Ufunc.js （ts版不受影响）会出问题，所以建议直接使用 10.5.4 版本
    

<!--
        QQ群    :  992091014 
        WX      ： axhlzy0922
        欢迎各位大佬加群交流 反馈问题，提交代码
-->