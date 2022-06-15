### How to compile & load

```sh
$ git clone https://github.com/axhlzy/Il2CppHookScripts.git
$ cd Il2cppHook/
$ npm install
$ frida -U --no-pause -f com.xxx.xxx -l  ../_Ufunc.js
```

### Development workflow

To continuously recompile on change, keep this running in a terminal:

```sh
$ npm run watch
```

And use an editor like Visual Studio Code for code completion and instant
type-checking feedback.
