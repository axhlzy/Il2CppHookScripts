
### 作用
1. 降低u3d游戏找关键函数难度（按img/cls批量断点）
2. 查找一些常用函数实现一些通用Hook

### 使用
1. 在U3d游戏启动之后进行attach
2. 使用frida -FU -l D:\Project\Frida\JS\Il2CppDumperTool\U3DHook\Ufun.js
3. 使用的两个数组是兼容之前使用python脚本查找function的方法
4. 可以多次使用AddBP(img/cls)添加多个类或者img的方法到这个两个数组
5. 方法添加完成后建议使用print_list_result()列出当前方法，然后手动替换掉开始部分的arrayAddr和arrayName(以免手机ADB断掉又得重新添加方法 ps:wifiADB真香)
---
### API

##### 基础方法
- list_Images()
- list_Classes(image,isShowClass)
- list_Methods(klass,isShowMore)
- find_method(ImageName,ClassName,functionName,ArgsCount,isRealAddr)
- addBP(imgOrCls)
- breakPoints(filter)
- breakPoint(ptr)
##### 拓展方法
- Info()
- HookOnPointerClick()
- HookSetActive()
- HookDebugLog()
- HookPlayerPrefs()
---

### 用例
1. **list_Images()   ===   i()**
   
![](https://github.com/axhlzy/Il2CppDumperTool/blob/master/imgs/u3d_0.png)

2. **list_Classes(image,isShowClass)   ===   c()**
   
![](https://github.com/axhlzy/Il2CppDumperTool/blob/master/imgs/u3d_1.png)

3. **list_Methods(klass,isShowMore)   ===   m()**
   
![](https://github.com/axhlzy/Il2CppDumperTool/blob/master/imgs/u3d_2.png)

![](https://github.com/axhlzy/Il2CppDumperTool/blob/master/imgs/u3d_3.png)

4. **find_method(ImageName,ClassName,functionName,ArgsCount,isRealAddr)   ===   f()**
   
![](https://github.com/axhlzy/Il2CppDumperTool/blob/master/imgs/u3d_4.png)

5. **addBP(imgOrCls)   ===   a()**
   
![](https://github.com/axhlzy/Il2CppDumperTool/blob/master/imgs/u3d_5.png)

6. **breakPoints(filter)   ===   B()**
   
![](https://github.com/axhlzy/Il2CppDumperTool/blob/master/imgs/u3d_6.png)

7. **breakPoint(ptr)   ===   b()**
   
![](https://github.com/axhlzy/Il2CppDumperTool/blob/master/imgs/u3d_7.png)

8. **Interceptor.detachAll()   ===   d()** 

9. **HookOnPointerClick()**
   
![](https://github.com/axhlzy/Il2CppDumperTool/blob/master/imgs/u3d_8.png)

9. **Info()**
   
![](https://github.com/axhlzy/Il2CppDumperTool/blob/master/imgs/u3d_9.png)

....