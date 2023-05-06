## Il2cppHook

### frida-based libil2cpp.so runtime parsing script
 
#### Features 

- Parse Unity's method `m` / class `c` / field `f` / instance `lfs`
- parse runtime method argument `b`
- (Batch) Hook `B/BF` for commonly used functions, modify function return value `setFunction...`
- More convenient to find function `findMethods` and call function `callFunction`
- object hierarchy `PrintHierarchy` / type hierarchy `showTypeParent`
- Disassemble `showAsm` with frida and method information
- Commonly used Hook package `HookOnPointerClick/HookSetActive/B_Button...`
- Parse mount script `showComponents alias s` `HookOnPointerClick/PrintHierarchyWithComponents` is also introduced <--- testing
- ...

-------

#### Install
```sh
$ npm install il2cpp-hooker -g
```
then you can use like this ↓

1. frida attch current app
```sh
$ fnp
```
2. frida spawn app of ${PackageName}
```sh
$ fnp ${PackageName}
```

-------

#### Compile
```sh
$ git clone https://github.com/axhlzy/Il2CppHookScripts.git
$ cd Il2cppHook/
$ npm install
$ npm run watch

$ frida -U -f com.xxx.xxx -l ../_Ufunc.js
OR
$ frida -FU -l ../_Ufunc.js
```

-------

#### API

[More details](https://github.com/axhlzy/Il2CppHookScripts/wiki)
