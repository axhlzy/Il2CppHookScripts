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
$ fat

```
2. frida spawn app of ${PackageName}
```sh
$ fat ${PackageName}
```

3. Command line options
```sh
$ fat -h

        _ _  ______                        _                 _
        | | |(_____ \                      | |               | |
        | | |  ____) )____ ____  ____ _____| |__   ___   ___ | |  _ _____  ____
        | | | / ____// ___)  _ \|  _ (_____)  _ \ / _ \ / _ \| |_/ ) ___ |/ ___)
        | | || (____( (___| |_| | |_| |    | | | | |_| | |_| |  _ (| ____| |
        |_|_|\______)____)  __/|  __/     |_| |_|\___/ \___/|_| \_)_____)_|
                        |_|   |_|


Usage: fat [options] <package-name?>

Options:
  -h, --help                  Print usage information.
  -r, --runtime [engine]      Specify the JS engine (qjs, v8). Default: v8
  -t, --timeout [ms]          Specify the time in milliseconds before calling the function.
  -f, --functions [name]      Specify the function to call on startup. example: -f i();getApkInfo();
  -l, --log [path]            Specify the path to save the log.
  -v, --version               Print version information.

Report bugs to:
   axhlzy <axhlzy@live.cn> (https://github.com/axhlzy/Il2CppHookScripts/)
```

-------

#### Compile
```sh
$ git clone https://github.com/axhlzy/Il2CppHookScripts.git
$ cd Il2cppHook/
$ npm install
$ npm run watch
$ npm run compress

$ frida -U -f com.xxx.xxx -l ../_Ufunc.js
OR
$ frida -FU -l ../_Ufunc.js
```

-------

#### API

[More details](https://github.com/axhlzy/Il2CppHookScripts/wiki)
