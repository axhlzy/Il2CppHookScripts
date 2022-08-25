## Il2cppHook

### 基于 frida 的 libil2cpp.so 运行时解析脚本

#### 特性
- 解析 `Unity` 的方法 / 类 / 字段
- 解析 `运行时` 方法参数
- 常用函数的 `（批量）断点`（参数值 / 返回值 查看）

#### 使用
```sh
$ git clone https://github.com/axhlzy/Il2CppHookScripts.git
$ cd Il2cppHook/
$ npm install
$ frida -U --no-pause -f com.xxx.xxx -l  ../_Ufunc.js
```

#### API

- i() == list_images 列出所有的 Images
    ![test](img/list_images.png)

- c() == list_classes 列出所有的 Classes
    ![test](img/list_classes.png)

- m() == list_methods 列出所有的 Methods
    ![test](img/list_methods.png)

- f() == list_fields 列出所有的 Fields
    ![test](img/list_fields.png)

...

#### Commit
- 文件结构按照Unity类继承关系实现
- 文件命名规则以及结构
  - 一个类文件夹下一个include.ts包含当前类文件以及该类子类文件夹的include
  - api.ts 
    - 用作解析常用函数 (exp: ptr(Il2Cpp.Api.Application._Quit) )
    - 函数的命名使用 '_' + 具体的函数名，多参数使用后缀 '_x' 结尾i (exp: Il2Cpp.Api.Application._Quit_1)
    - api class 命名为 类名 + 'API'
  - class.ts
    - NativePointer转换为Class的实现 (把ptr当成class来解析)
    - 包含一些（静态）字段，（静态）方法，以及方便调用的一些函数封装
    - this.handle 存贮当前 ptr，可以是 实例指针也可以是类指针 （多数情况使用实例指针）
  - export.ts
    - 主要用作拓展类的一些导出方法
- TODO 按照这个文件结构可以拓展到整个UnityAPI

<!--
        QQ群    :  992091014 
        WX      ： axhlzy0922
        欢迎各位大佬加群交流 反馈问题，提交代码
-->