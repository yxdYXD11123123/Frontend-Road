# 选择题

1. 下列选项关于window对象方法的说法错误的是（D)

  A、window对象包括location对象、history对象和docuement对象

  B、window.onload会在一个页面中所有资源加载完成后执行

  C、window.onresize会在窗口被调整大小时发生

  D、document.DomContentLoaded会在一个页面中所有图片加载完后执行

​	<font color =red>是在DOM树加载完后执行</font>

2. 下列选项关于onload事件说法正确的是(C)

  A、onload事件会在媒体或图片加载完成后执行

  B、onload事件会在图片加载完之后执行

  C、onload事件会在页面中所有资源加载完毕之后执行

  D、onload事件会在页面中dom文档树加载完之后执行

3. 下列选项关于定时器的说法正确的是( D)

  A、setTimeout(函数名,时间)能够多次执行

  B、var timer = setInterval(函数名,时间)执行之后，timer接收的结果是一个数字<font color= red>正整数</font>

  C、setTimeout创建的定时器，需要通过clearInterval()来停止定时器<font color=red>可以实现，但是不能用</font>

  D、setTimeout(函数名,时间)可以创建一个定时器

4. 下列关于周期性定时器的书写方式错误的是(C)

  A、setInterval(function(){},1000)

  B、setInterval(test,1000);function test(){console.log(1)}

  C、setInterval(<font color=red>test()</font>,1000);function test(){}

5. 下列选项关于定时器说法不正确的是(B)

  A、用于指定在一段特定的时间后执行某段程序 

  B、setTimeout(“<表达式>”，毫秒数)其功能是在经过毫秒数后执行多次<表达式>

  C、clearTimeout()和clearInterval()都是是用于终止一个定时器 

  D、setInterval(“<表达式>”，毫秒)的功能是每隔毫秒数重复执行<表达式>，直至窗口被关闭或执行clearInterval定时器关闭。

# 简答题

第1题. BOM是什么的缩写，BOM的顶级对象是什么？
```js
Browser Object Model 
Window
```
第2题. DOMContentLoaded事件和onload事件的区别是什么？
```js
document.DOMContentLoaded是等页面中DOM结构加载完就会执行
window.onload是等页面所有东西全部加载完后，最后执行。
```
第3题. 定时器分为几种，有什么区别，怎么清除定时器

```js
两种：
1. 延时定时器，等待一段时间，执行某个动作，只触发一次
let 变量名 = setTimeout(具名函数，时间)
// 清除
clearTimeout(变量名)

2. 周期定时器，每隔一段时间，执行一次, 可触发多次
let 变量名 = setInterval(具名函数，时间)
// 清除
clearInterval(变量名)
```


# 编程题

1. 实现美女时钟效果(附件)：
 - 页面和功能都需要自己完成
 - 页面中会不断变换美女，并且美女手里拿的日历的小时和秒是和系统当前的时间是一样的

2. 随机点名器效果(附件)：
- 点击"开始点名"按钮，文字就会改成"停止点名",上面就会不断替换名字
- 再次点击按钮，文字就会改成"开始点名",上面就显示当前选中的名字