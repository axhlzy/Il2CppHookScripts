
### 作用
1. 降低u3d游戏找关键函数难度（按img/cls批量断点）
2. 查找一些常用函数实现一些通用Hook

### 使用
1. 在U3d游戏启动之后进行attach
2. 使用frida -FU -l D:\Project\Frida\JS\Il2CppDumperTool\U3DHook\Ufun.js

### API

- list_Images()
- list_Classes(image,isShowClass)
- list_Methods(klass,isShowMore)
- find_method(ImageName,ClassName,functionName,ArgsCount,isRealAddr)
- breakPoint(ptr)
- breakPoints(filter)
- addBP(imgOrCls)

---

### 用例
1. list_Images()   ===   i()
   ![](https://github.com/axhlzy/Il2CppDumperTool/blob/master/imgs/u3d_0.png)
2. list_Classes(image,isShowClass)   ===   c()