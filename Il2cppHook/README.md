### How to compile & load

```sh
$ git clone https://github.com/axhlzy/Il2CppHookScripts.git
$ cd Il2cppHook/
$ npm install
$ frida -U --no-pause -f com.xxx.xxx -l  ../_Ufunc.js
```

以 frida-il2cpp-bridge 为基础，重新搭建上层函数

它的这一套api更加倾向于用vscode编写打包好了在放上去跑，不太适合动态命令行交互式操作

（刚开张,代码看起来非常乱 后续抽空慢慢的优化代码结构）

<!--
        QQ 交流群: 992091014
        欢迎各位大佬加群交流反馈问题
-->