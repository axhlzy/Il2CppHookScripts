
### 简述
1. 降低u3d游戏找关键函数难度（按img/cls添加批量断点）
2. 单独提出一些常用函数的通用Hook
3. 方便函数调用测试,函数动态参数解析
4. 对class指针解析内存数据(fields)

### 使用
1. 在U3d游戏启动之后,使用 **frida -FU -l ...\Ufun.js** 进行attach
2. B() 即可对程序集Assembly-CSharp中的方法进行全部断点,也可自行使用 i() , a() 进行添加后在使用 B("Filter") 进行断点
3. 一些常用的hook都使用 Hook... 开头命名 (欢迎各位大佬继续拓展)
4. 函数调用使用 callfunction() ,第一个参数为函数地址,后面的参数是参数值; setFunctionValue() 快速的修改函数返回值
5. breakWithArgs() 断点函数并显示指定个数参数; breakInline() 任意位置
6. 还有一个 b() 方法会用的比较频繁,b()方法的参数是一个methodinfo指针,用于对参数的识别和解析,find_method()和B()断点括号用的都能找到
7. 还有一系列的get/set方法用来操作gameobj/transform等等
8. SeeTypeToString() 帮我们快速的判断当前指针的类型, m() 参数也是一个cls指针,帮我们确认类方法
9. listClsFromMethodInfo() 通过一个类方法的methodinfo回溯到它对应的cls下的其他方法信息
   
以上为一些个人总结的比较常用的api

#### tips:

使用的两个数组是兼容之前使用python脚本查找function的方法
可以多次使用AddBP(img/cls)添加多个类或者img的方法到这个两个数组
方法添加完成后建议使用print_list_result()列出当前方法，然后手动替换掉开始部分的arrayAddr和arrayName

---

### API (简单的列了一下)

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

10. **Info()**
   
![](https://github.com/axhlzy/Il2CppDumperTool/blob/master/imgs/u3d_9.png)

....
