### How to compile & load

```sh
$ git clone https://github.com/axhlzy/Il2CppHookScripts.git
$ cd Il2cppHook/
$ npm install
$ frida -U --no-pause -f com.xxx.xxx -l  ../_Ufunc.js
```

初步搭建项目结构（和unity类相同的类继承关系）
mscorlibObj === mscorlib.System.Object
...

TODO
1.type的继承关系反应class的继承，用作类参数解析（目前已完成当前类解析，todo完成父类解析）
...

项目基调定在整个UnityAPI的逆向，以个人空闲时间撸代码实在太慢了
真诚欢迎各位大佬加入代码提交

<!--
        QQ群    :  992091014 
        WX      ： axhlzy0922
        欢迎各位大佬加群交流反馈问题
-->
