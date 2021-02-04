# BOM

## BOM概述

### 什么是BOM

BOM（browser Object Model）浏览器对象模型

为我们提供了与浏览器窗口交互的接口，核心对象就是window

BOM由很多很多对象构成，这些对象都提供了很多方法和属性

#### 注意：

* ECMAScript 这个是没有兼容性的

* DOM 这个兼容性有一些，但是比较小

* BOM因为操作的是浏览器这个软件，所以说不同的浏览器，兼容性是很大的

我们学习的BOM是没有兼容性或者说兼容性比较小的一些属性和方法。

### BOM的组成

Window

Document  操作网页的

Location  操作网址的

Navigator  操作浏览器的信息和设置的（其实只能获取）

Screen  获取屏幕信息的

History  操作浏览器历史记录的



## Window对象

### Window顶级对象

BOM就是window

1. JS访问浏览器的一个接口

2. 它是一个全局对象，定义在全局中的变量和函数都是window的属性和方法。

   ```html
   <body>
       <script>
           var age = 12;
           console.log(window.age); //12
           // 说明age就是window的一个属性
           function fn() {
               console.log("您好");
           }
           window.fn()  // 您好
           
           // 只不过我们将其省略了
           console.log(age)
       </script>
   </body>
   ```

   

### Window的常见事件

#### load事件

##### 功能：

等网页中的所有东西（结构，样式，js代码，img，各种文件）加载完毕，再运行的js代码

##### 语法：

* window.onload = function () {}

* window.addEventListener("load", funciton() {})

```html
    <script>
        window.onload = function () {
            let span = document.querySelector("span")
            console.log(span); // 可以
        }
        // load事件
        // let span = document.querySelector("span")
        // console.log(span); // 报错
    </script>
</head>

<body>
    <!-- 要求大家， 必须把js写在body闭合标签的上面 -->
    <span>您好</span>
</body>
```

##### 缺点：

因为等的东西太多，所以不能及时地响应事件，所以这样是不好的（可能时间等的比较长）



#### DOMContentLoaded事件

##### 功能：

等网页中的DOM结构加载完就可以执行

##### 语法：

`document.addEventListener("DOMContentLoaded", function () {})`

##### 兼容性：

IE6、IE7不支持DOMContentLoaded，但它支持onreadystatechange事件，该事件的目的是提供与文档或元素的加载状态有关的信息。更低的ie还有个特有的方法doScroll。

```html
    <script>
        //  先出1， 再出2
        // 这里需要等所有东西加载完
        window.onload = function () {
            console.log("2");
        }
        // 比window.onload先执行，这里只需要等网页中的DOM结构加载完就会执行
        document.addEventListener("DOMContentLoaded", function () {
            console.log("1");  
        })
        // 所以推荐使用 DOMContentloaded
    </script>
</head>

<body>

</body>
```



#### resize事件

功能：只要浏览器大小发生一丁点变化，这个事件就会触发

语法：window.addEventListener("resize", function () {})

```html
<body>
    <script>
        window.addEventListener("resize", function () {
            console.log("浏览器窗口正在变化。。。");
        })
    </script>
</body>
```

```html
<body>
	<script>
        window.addEventListener("resize", function () {
            // console.log("浏览器窗口正在变化。。。");
            // innerWidth可以获取浏览器窗口的大小
            if (window.innerWidth <= 600) {
                document.querySelector(".box").style.display = "none"
            }
            else {
                document.querySelector(".box").style.display = "block"
            }
            // 这个方法远远早于媒体查询
        })
    </script>
</body>
```



### Window 的定时器

#### 延时定时器（等待一段时间，执行某个动作）

##### 创建：

语法：

* window.setTimeout(调用函数，时间(单位是毫秒))

* let 定时器的名字 = setTimeout(具名函数，时间)   --  推荐写法

注意：要写具名函数，不要写匿名函数，时间是毫秒

```html
<body>
    <script>
        // 延时定时器
        // window.setTimeout() => setTimeout();

        // 等待3秒，弹出一句 我喜欢你
        // 用匿名函数
        // setTimeout(function () {
        //     alert("我喜欢你")
        // }, 3000)
        
        // 用具名函数
        // setTimeout(printWord, 3000);
        function printWord() {
            alert("我喜欢你")
        }
        
        // 常见写法：
        // 在网页中可能会有很多很多定时器（setTimeout） 一般给定时器加个名字
        let timer = setTimeout(printWord, 3000);
    </script>
</body>
```



##### 删除：

功能：清除延时定时器

语法：clearTimeout(定时器的名字)

```html
<body>
    <button>清除定时器</button>

    <script>
        function sayHi() {
            alert("您好")
        }
        let timer = setTimeout(sayHi, 5000)
        console.log(timer)  //1 定时器的值其实是数字（地址）
        
        document.querySelector("button").onclick = function () {
            clearTimeout(timer);
        }
    </script>
</body>
```



#### 周期定时器（隔一段时间，执行一个动作）

##### 创建

语法：let 定时器的名字 = setInterval(具名函数，时间)   --  推荐写法

##### 删除

功能：清除周期定时器

语法：clearInterval(定时器的名字)

注意：其实我们给定时器加变量名是为了变相地获取定时器的返回值，因为我们用clear清楚时，参数必须是想要删除的定时器的返回值

```html
<body>
    <button>清除定时器</button>

    <script>
        let num = 1;
        function sayHi() {
            console.log("您好" + num++)
        }
        let timer = setInterval(sayHi, 2000)
        document.querySelector("button").onclick = function () {
            clearInterval(timer);
        }
    </script>
</body>
```

##### 案例：倒计时

```html
    <style>
        .timer {
            position: relative;
            margin: 100px auto;
            width: 200px;
            height: 260px;
            background-color: aqua;
        }

        .time {
            position: absolute;
            bottom: 200px;
            left: 50%;
            margin-left: -61px;
            overflow: hidden;
        }

        .time span,
        .time b {
            float: left;
            line-height: 32px;
            text-align: center;
        }

        .time span {
            width: 32px;
            height: 32px;
            font-size: 23px;
            background-color: black;
            color: white;
        }

        .time b {
            margin: 0 4px;
        }
    </style>
</head>

<body>
    <div class="timer">

        <div class="time">
            <span class="hour">00</span>
            <b>:</b>
            <span class="min">00</span>
            <b>:</b>
            <span class="second">00</span>
        </div>
    </div>

    <script>
        // 倒计时的功能
        let time = document.querySelector(".time")
        let hour = time.children[0]
        let min = time.children[2]
        let second = time.children[4]

        // 定义事件 啥时候开始
        let start = +new Date("2020-03-19 18:00:00")
        // 用周期定时器，实现每隔一秒给 span中的时间重新赋值一次
        let timer = setInterval(countDown, 1000)

        function countDown() {
            // 获取当前时间
            let now = +new Date();
            // 计算一下时间差   倒计总时长2hours - （现在的时间 - 开始的时间）
            let cha = (2 * 60 * 60 * 1000) - (now - start);

            // 把时间差换算成小时 分钟 秒
            let h = parseInt(cha / 60 / 60 / 1000 % 24)
            hour.innerHTML = fill(h);
            let m = parseInt(cha / 60 / 1000 % 60)
            min.innerHTML = fill(m);
            let s = parseInt(cha / 1000 % 60)
            second.innerHTML = fill(s);

        }
        // 补零函数
        function fill(num) {
            return num >= 10 ? num : "0" + num;
        }
    </script>
</body>
```

##### 案例：点名器

```html

<body>
  <div class="container">
    <div class="content">
      <p>亲，准备好点名了吗？</p>
      <span>开始点名</span>
    </div>
  </div>
  <script>
    // 2. 随机点名器效果(附件)：
    // - 点击"开始点名"按钮，文字就会改成"停止点名",上面就会不断替换名字
    // - 再次点击按钮，文字就会改成"开始点名",上面就显示当前选中的名字

    // 定义数据
    var names = ["王亚亚", "康春龙", "谢仲龙", "袁旭东", "范志伟", "杜鑫博", "官呈达", "谌雯雯", "杨文林", "周子轩", "苏傲"]

    // 获取元素
    let oP = document.querySelector("p")
    let oSpan = document.querySelector("span")

    // 给span绑定点击事件
    oSpan.addEventListener("click", start)
    // 这里为什么要将准备这么一个变量？这个主要是为了销毁每次正在执行的 定时器，
    // 因为我们每次点击“开始点名”后生成的周期定时器的返回值是和上一次不一样的，但是用clearInterval消除周期定时器时，必须需要定时器的独一无二的返回值给clearInterval传参
    // 所以要用这个变量将上一次的返回值保留下来，以便消除对应的执行过的定时器
    // 我们可以把这个特定的返回值看作是每个定时器按顺序排下来的id/编号
    let timerId = 0;
    function start() {
      if (oSpan.innerText == "开始点名") {
        // 我们在这里启动定时器时，其实每次启动的定时器，都是又一个新的定时器，返回值比上次加1
        timerId = setInterval(moveName, 50)
        oSpan.innerText = "停止点名"
      }
      else {
        // 通过保留下来的定时器返回值，消除对应的这次正在执行的定时器
        clearInterval(timerId)
        oSpan.innerText = "开始点名"
      }
    }
    // 上面说了，每次都是一个新的定时器，那么这个参数最好是写个具名函数传参到定时器，不然会在内存中创建多个只使用了一次的匿名函数，导致内存浪费
    function moveName() {
      // 随机一个名字数组中的索引
      let randomIndex = Math.floor(Math.random() * (names.length - 1))
      // 将随机到的索引对应的名字 放入p的内容
      oP.innerHTML = `${names[randomIndex]}`
    }
  </script>
</body>
```



### JS的执行队列（执行机制）

#### JavaScript是单线程

​	JavaScript语言的一大特点就是单线程，也就是说，同一时间只能做一件事情。这是因为JavaScript这门语言的诞生使命所致 -- JavaScript是为了处理页面中用户的交互，以及操作DOM诞生的（例如：我们在点击的时候不可能还会同时做其它的交互事件）

#### 同步和异步任务

  单线程导致的问题就是后面的任务需要等待前面任务完成，如果前面任务很耗时（比如读取网络数据），后面任务不得不一直等待。

  为了解决这个问题，同时加以利用多核CPU的计算能力，HTML5提出 Web Worker 标准，允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，于是，JS中出现了**同步任务**和**异步任务**。

##### 同步

​	前一个任务结束后再执行后一个任务，程序的执行顺序与任务的排列顺序是一致的、同步的。比如做饭的同步做法：我们要烧水煮饭，等水开了（10分钟之后），再去切菜，炒菜。

 **同步任务**
 	在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；

##### 异步

​	你在做一件事情时，因为这件事情会花费很长时间，在做这件事的同时，你还可以去处理其他事情。比如做饭的异步做法，我们在烧水的同时，利用这10分钟，去切菜，炒菜。

 **异步任务**
  不进入主线程、而进入”任务队列”的任务，当主线程中的任务运行完了，才会从”任务队列”取出异步任务放入主线程执行。

  JS中的异步都是通过回调函数实现的
  一般而言,异步任务有以下三种类型: 
  1.普通事件，如click,resize
  2.资源加载, 如load,error等
  3.定时器,包括setInterval,serTimeout等

#### 巩固：this

1. 如果this在全局的函数中，那么这个this指向的是window
2. 如果this在对象中，那么这个this是对象
3. 如果this在构造函数（new的函数）中，那么this指向构造函数的实例对象



## Location对象

### 什么是location对象

window对象给我们提供了一个<font color=red>location属性</font>用于<font color=red>获取或设置窗体的URL</font>，并且可以用于<font color=red>解析URL</font>。因为这个属性返回的是一个对象，所以我们将这个属性也称为<font color=red>location对象</font>。

### 什么是URL

<font color=red>统一资源定位符（Uniform Resource Locator, URL）</font>是互联网上标准资源的地址。互联网上的每个文件都有一个唯一的URL，它包含的信息指出文件的位置以及浏览器应该怎么处理它。

#### URL的一般语法格式为：

```
protocol://host[:port]/path/[?query]#fragment
(javascript用location.hash来操作fragment)

http://www.itcast.cn/index.html?name=andy&age=18#link
```

### Location对象的属性

```html
<body>
    <script>
        // location对象
        console.log(location);
        // 协议：https 和 http 两种
        console.log(location.protocol);  // "https:"
        // 主机  192.168.170 IP地址
        console.log(location.host);
        // 主机名  
        console.log(location.hostname);
        // 端口（计算机为了分出不同的功能设置的数字）
        // 0-65535 个端口
        // 常见端口：80端口  默认端口
        console.log(location.port);
        // 网址 href 可以获取也可以设置 （需要记住的）
        console.log(location.href);
        // 路径  一个网页对应着一个唯一的路径
        console.log(location.pathname);
        // 锚点值
        console.log(location.hash);
        // 通过get方式传递到后台的数据
        console.log(location.search);
        // 刷新页面的方法（需要记住的）
        location.reload();
        // 替换网页的网址
        location.replace("http://www.itcast.cn")
    </script>
</body>
```



## Navigator对象

navigator 对象包含有关浏览器信息，它有很多属性，我们最常用的是userAgent

该属性可以返回由客户机发送服务器的 user-agent 头部的值

下面前端代码可以判断用户那个终端打开页面，实现跳转

```js
if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    window.location.href = "";     //手机
 } else {
    window.location.href = "";     //电脑
 }
```

### 

### 通过navigator对象获取我们当前的位置（经度/纬度）

#### 语法：

**window.navigator.geolocation.getCurrentLocation();**

```html
<body>
    <script>
        console.log(window.navigator);
        console.log(window.navigator.geolocation);  //里面有以下三个方法
        // getCurrentPosition() 获取当前的位置（经度纬度）
        // watchPostion() 不停的获取当前的位置
        // clearWatch() 清除不停获取位置

        // getCurrentPosition(成功获取位置信息方法，失败时获取错误信息方法)
        // 要使用最新的IE浏览器（edge）来获取
        // 如果想要使用 chorme 必须得翻墙
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position);
            console.log("纬度" + position.coords.altitude, "经度" + position.coords.longitude);

        }, function (error) {
            // 代表网络地址服务在 googleap这个网站上，没有内容给我们
            console.log(error);
        })

        // [object Position]: {}

        // latitude: 41.76693600000001  纬度
        // longitude: 109.97241342857144  经度
    </script>
</body>
```



## History对象

​	window对象给我们提供了一个history对象，与浏览器历史记录进行交互。该对象包含用户（在浏览器窗口中）访问过的URL。

history对象一般在实际开发中比较少用，但是会在一些 OA 办公系统中见到。移动端开发用的比较多

### 方法

#### back()

作用：后退

#### forward() 

作用：前进

#### go(参数)

前进后悔功能都有，参数为1时，前进一个页面，参数为-1时，后退一个页面。

```html
<body>
    <h1>关于</h1>
    <a href="./3.html">首页</a>
    <button class="qian">前进</button>
    <button class="hou">后退</button>

    <script>
        let qian = document.querySelector(".qian")
        let hou = document.querySelector(".hou")

        qian.onclick = function () {
            // 点击按钮的时候让页面前进
            // history.forward()
            // 如果我们只后退/前进一步
            history.go(1)
            // go()的参数为步数
        }
        hou.onclick = function () {
            // 点击按钮的时候让页面后退
            // history.back()
            // 相当于 后退一步back()的效果
            history.go(-1)
        }
    </script>
</body>
```
