## 事件高级

### 回顾事件

事件注册三部曲：

1. 获取事件源
2. 给事件源绑定事件
3. 书写处理程序

`事件源.on+事件名 + function () {}`

### 事件监听注册

#### 为什么学习事件监听

前面学习的on+事件类型绑定事件的方式，不能给一个元素添加多个相同事件，即使加上也不能用的问题。

需求：给一个元素连续绑定两次点击事件，并且事件处理程序都有效



#### 事件的监听

##### 方法一： 传统的注册方法

元素.on+事件名 = function () {}

注意：这种方法只能给元素添加不同的事件，不然会被覆盖



##### 方法二： `ie9`以上以及`ie9`事件监听的方法

`元素.addEventListener(事件类型，事件处理方法(有名字会方便移除)，是否冒泡)`   `ie9`以上以及`ie9`

说明：add添加Event事件 listener监听器，给元素添加事件监听器

注意：这个方法可以添加相同类型的事件多个

这个方法可以控制事件是冒泡还是捕获

是否冒泡：如果不写，为false（冒泡），如果写true，true代表捕获

```html
<body>
    <button>按钮</button>
    <script>
        // 方法二
        let oBtn = document.querySelector("button")
        oBtn.addEventListener("click", function () {
            alert("你好哈")
        })
        oBtn.addEventListener("click", function () {
            alert("吃了吗")
        })
        // 两个事件都会被触发
    </script>
</body>
```



##### 方法三： ` ie9`以下以及`ie9`事件监听的方法

`元素.attachEvent(on+事件类型，事件处理方法)`  ` ie9`以下以及`ie9`

注意：事件类型务必带'on'

```html
<body>
    <button>按钮</button>
    <script>
        var oBtn = document.querySelector("button");  // 注意用var
        // 方法三
        oBtn.attachEvent("onclick", function () {
            alert("aaa");  // ie9中先触发前面的这个，再触发后面的
        });
        oBtn.attachEvent("onclick", function () {
            alert("bbb");  //  ie8中先触发后面的这个，再触发前面的
        });
    </script>
</body>
```

#### 在开发中：

如果遇到给同一个元素添加多个事件，首选`addEventListener`，次选`on+事件类型`，`attachEvent`只是为了照顾低版本浏览器。

#### 兼容写法：

```js
 function addEventListener(element, evenName, fn) {
            // 判断一下元素能不能用这个方法
            if (element, addEventListener) {
                element.addEventListener(evenName, fn)
            }
            // 能不能用这样的方法
            else if (element.attachEvent) {
                element.attachEvent("on"+evenName, fn);
            }
            // 实在不行，用这个方法
            else {
                元素.onclick = function() {
                    element.evenName = fn;
                }
            }
        }
```



### 使用事件监听移除事件的方法（解绑事件）

#### 方法一： 传统方法移除

语法：元素.on+事件名 = null;

注意：理解为把function给覆盖掉了 变成 null

```html
<body>
    <button>按钮</button>

    <script>
        // 点击按钮，弹出一句话，再次点击的时候，把事件解绑（移除）
        let oBtn = document.querySelector("button")
        oBtn.onclick = function () {
            alert("我被点击了，你再点我看看")
            // 解绑
            this.onclick = null;
        }
    </script>
</body>
```



#### 方法二：`ie9`以上以及`ie9`移除事件方法

`元素.removeEventListener(事件类型，事件处理程序名字)`   `ie9`以上以及`ie9`

说明：remove移除，Event事件，Listener监听器

注意：事件处理函数，得写名字

```html
<body>
    <button>按钮</button>

    <script>
        // 点击按钮，弹出一句话，再次点击的时候，把事件解绑（移除）
        var oBtn = document.querySelector("button")
        oBtn.addEventListener("click", clicked) // 想要解绑，必须让函数有名字
        function clicked() {
            alert('我被点击了，你再点我看看');
            // 解绑
            oBtn.removeEventListener("click", clicked)
        }
    </script>
</body>
```



#### 方法三： `ie9`以下以及`ie9`移除事件方法

语法：`事件源.detachEvent("on+事件类型"，事件处理程序名字) ` `ie9`以下以及`ie9`

注意：事件类型务必带on

```html
<body>
    <button>按钮</button>

    <script>
        // ie8以下可以实现 ， 几乎不会用到
        // 点击按钮，弹出一句话，再次点击的时候，把事件解绑（移除）
        var oBtn = document.querySelector("button")
        function clicked() {
            alert("我被点击了，你再点我看看")
            // 解绑
            oBtn.detachEvent("onclick", clicked)
        }
        // 注册事件
        oBtn.attachEvent("onclick", clicked)
    </script>
</body>
```



#### 兼容写法

```html
<body>
    <button>按钮</button>

    <script>
        // 兼容写法（可以百度）
        // 点击按钮，弹出一句话，再次点击的时候，把事件解绑（移除）
        function removeEventListener(element, eventName) {
            // 浏览器是否支持removeEventListenter
            if (element.removeEventListener) {
                element.removeEventListener(eventName, fn)
            }
            // 浏览器是否支持detachEvent
            else if (element.detachEvent) {
                element.detachEvent("on" + eventName, fn)
            }
            // 没办法，必须支持这个
            else {
                // 对象[属性]
                element["on" + eventName] = null
            }
        }
    </script>
</body>
```



### 事件流

#### 什么是事件流

所谓的事件流就是描述从页面中接收事件的顺序

事件的发生是有顺序的，这就是DOM事件流

#### 事件流的三个阶段

第一阶段：捕获阶段（从外往里）

第二阶段：当前的目标阶段

第三阶段：冒泡阶段（从里往外）

```html
    <style>
        div {
            position: absolute;
            top: 0;
            left: 0;
        }

        .one {
            width: 300px;
            height: 300px;
            background-color: brown;
        }

        .two {
            width: 200px;
            height: 200px;
            background-color: cornflowerblue;
        }
    </style>
</head>

<body>
    <div class="one">
        <div class="two"></div>
    </div>

    <script>
        let one = document.querySelector(".one")
        let two = document.querySelector(".two")

        one.addEventListener("click", function () {
            console.log("capture one");
        }, true)
        one.addEventListener("click", function () {
            console.log("bubble one");
        }, false)
        two.addEventListener("click", function () {
            console.log("capture two");
        }, true)
        two.addEventListener("click", function () {
            console.log("bubble two");
        }, false)
        // 输出
        // capture one
        // capture two
        // bubble two
        // bubble one

        // 点击test，首先在捕获阶段 从document逐级向下检查，有没有捕获阶段执行的事件，
        // 在父元素one上有，所以弹出capture one 。
        // 目标阶段，two上绑定两个事件，按照事件注册顺序执行，这里的执行结果是capture two  bubble one。
        // 冒泡阶段，从two处开始检测，一直到document，执行绑定在one上的冒泡事件，弹出bubble two。
    </script>
</body>
```



```html
    <style>
        div {
            position: absolute;
            top: 0;
            left: 0;
        }

        .outer {
            width: 200px;
            height: 200px;
            background-color: aqua;
            text-align: right;
        }

        .inner {
            width: 100px;
            height: 100px;
            background-color: coral;
        }
    </style>
</head>

<body>
    <div class="outer">
        我是outer
        <div class="inner">我是inner</div>
    </div>
    <script>
        // 给inner添加一个事件，点击事件，给outer添加一个事件，点击事件
        let inner = document.querySelector(".inner")
        let outer = document.querySelector(".outer")
        //  inner.addEventListener （事件类型，事件处理程序，true/ 默认为false）如果不写，为false（冒泡）/如果写true，true代表捕获

        // 给inner绑定
        inner.addEventListener("click", function () {
            console.log("我是inner");
        }, true) // 捕获
        // 给outer绑定
        outer.addEventListener("click", function () {
            console.log("我是outer");
        }, true) // 捕获
        // 观察这两个事件的顺序，
        // 如果是冒泡，那应该先触发inner 再触发outer
        // 如果是捕获，那应该先触发outer 再触发inner
    </script>
</body>
```



#### 注意点

1. 在`js`执行过程中，只能执行冒泡或者捕获的其中一个（网景，微软，为了让`js`执行出现最大的兼容，既有捕获又有冒泡）
2. `xxx.onclick` 和`attachEvent` 只有冒泡没有捕获
3. 不是所有的事件都有冒泡和捕获，有些事件没有冒泡`（onblur, onfocus, mouseenter, mouseleave）`
4. 冒泡也不全是问题，有些工作还需要冒泡来做（事件委托）

### 事件对象

#### 什么是事件对象

在事件触发后，在事件处理程序中，所获取并操作的对象，用这个对象代表事件的状态

比如：鼠标的位置，鼠标的按钮，说的直白点就是事件对象里面存的是一系列跟事件相关的信息。

#### 语法：

`事件源.on+事件类型 = function (e) {}`

`事件源.addEventListener(“事件类型”, function (e) {})`

```html
<body>
    <button>按钮</button>

    <script>
        let oBtn = document.querySelector("button")
        // 事件对象传统写法
        oBtn.onclick = function (e) {
            console.log(e);
            // 第一个形参e，就是事件对象，不需要你创建，这是事件中js自动给我弄好的
        }
        // 事件对象监听器写法
        oBtn.addEventListener("click", function (e) {
            console.log(e);
        })
        // 了解的说一下
        oBtn.attachEvent("onclick", function (e) {
            // 直接console.log(e);   在ie7下会出问题
            // 所以
            // 兼容写法是这样的, 有e就给e，没有就给
            var e = e || window.event;
            console.log(e);
        })
    </script>
</body>
```



#### 事件对象的常用属性

<font color =red>**`e.target`  返回触发事件的对象（比较好用，没有兼容性）**</font>

```html
<body>
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
    </ul>
    <script>
        var oBtn = document.getElementsByTagName("ul")[0]

        oBtn.addEventListener("click", function (e) {
            console.log(e.target);  // li 1 - 5  / ul 
        })
    </script>
</body>
```

`e.srcElement`  返回触发时间的对象

`e.type`  事件类型

```html
<body>
    <button>按钮</button>
    <script>
        var oBtn = document.getElementsByTagName("button")[0]

        oBtn.addEventListener("click", function (e) {
            console.log(e.type);
        })
        oBtn.addEventListener("mouseover", function (e) {
            console.log(e.type);
        })
    </script>
</body>
```

`e.cancelBubble`  取消泡泡（阻止冒泡，值为true,则阻止）（非标准）

`e.which`  点的哪个键

<font color =red>**`e.stopPropagation()`  阻止冒泡（标准） **</font>

```html
   <style>
        div {
            position: absolute;
            top: 0;
            left: 0;
        }

        .outer {
            width: 200px;
            height: 200px;
            background-color: aqua;
            text-align: right;
        }

        .inner {
            width: 100px;
            height: 100px;
            background-color: coral;
        }
    </style>
</head>

<body>
    <div class="outer">
        <div class="inner"></div>
    </div>
    <script>
        let outer = document.querySelector(".outer")
        let inner = document.querySelector(".inner")

        inner.addEventListener("click", function (e) {
            console.log("inner");
            // e.cancelBubble = true; // 取消冒泡
            e.stopPropagation()  // 取消冒泡 （标准）
        })
        outer.addEventListener("click", function (e) {
            console.log("outer");
        })
    </script>
</body>

```

<font color =red>**`e.returnValue`  阻止浏览器默认行为**</font>

<font color =red>**`e.preventDefault() `  阻止浏览器默认行为 **</font>

```html

<body>
    <a href="">我的链接</a>
    <span>我的span</span>

    <script>
        // 阻止a标签默认跳转的行为（浏览器默认行为）
        let a = document.querySelector("a")
        let span = document.querySelector("span")

        a.onclick = function (e) {
            console.log(1111);
            // e.preventDefault();   （推荐，标准）
            // e.returnValue = false;
            return false  
            // 以上三种都可以阻止浏览器默认行为
            // 或者直接在标签的href="javascript:;"
        }
        span.onclick = function () {
            console.log(2222);
        }
    </script>
</body>
```



#### 鼠标事件(`mouseEvent`)对象的属性

1. client系列--在可视区内获取鼠标的位置

   * `clientX` 鼠标 距离 可视区的水平坐标

   * `clinetY` 鼠标 距离 可视区的竖直坐标

2. page系列--在页面内获取鼠标的位置

   * `pageX` 鼠标 距离 页面的水平坐标
   * `pageY` 鼠标 距离 页面的竖直坐标

   ```html
   <body>
       <div class="red"></div>
       <script>
           // 给document添加点击事件
           document.addEventListener("click", function (e) {
               // client系列--在可视区内获取鼠标的位置
               console.log("水平位置" + e.clientX, "竖直位置" + e.clientY);
               // page系列--在页面内获取鼠标的位置
               console.log("水平位置" + e.pageX, "竖直位置" + e.pageY);
           })
       </script>
   </body>
   ```

3. screen系列--获取电脑屏幕中鼠标的位置

   * `screenX`
   * `screenY`

#### 键盘事件(`keybordEvent`)的属性

1. `keyup` 按键弹起来的时候触发
2. `keypress` 按键按下的时候触发  (不能识别ctrl shift 左右箭头)
3. `keydown` 按键按下的时候触发

```html
<body>
    <script>
        // keyup 按键弹起来的时候触发
        document.addEventListener("keyup", function () {
            console.log("按键弹起了");
        })
        // keypress 按键按下的时候触发
        document.addEventListener("keydown", function () {
            console.log('按键按下了down');
        })
        // keydown 按键按下的时候触发
        document.addEventListener("keypress", function () {
            console.log('按键按下了press');
        })
        // keydown => keypress => keyup
    </script>
</body>
```

##### 键盘事件的`keyCode`

为了让计算机知道你按下的到底是哪个键，键盘上的键都有一个唯一的键码（`ASCii码`）

获取键值：`e.keyCode`

```html
<body>
    <script>
        // 在键盘中大小写的A  得到的都是65
        document.addEventListener("keyup", function (e) {
            console.log(e.keyCode);
        })
    </script>
</body>
```

```html
<body>
    <input type="text">

    <script>
        // 提高用户体验的效果
        // 当用户打开页面，不需要点击输入框，只要按下s键，就可以获取焦点到input上

        // 思路：检测用户是否按下了s键
        let oInput = document.querySelector("input")

        document.addEventListener("keyup", function (e) {
            // 通过事件对象e  找到触发事件的键位码e.keyCode
            if (e.keyCode == 83) {
                oInput.focus();
            }
        })
    </script>
</body>
```



#### 触摸事件(`touchEvent`)的属性

暂时不学



### 事件委托

#### 为什么需要事件委托

1. 事件委托可以将减少事件注册，节省大量内存占用
2. 如果我们通过for循环给子元素绑定事件，那么有些动态添加的新子元素，是绑定不到，但是如果利用事件委托，我们就可以避免这样的问题

#### 事件委托是什么

概念：把子孙元素的事件注册，完全交给子孙元素的上级元素代理

注意：子孙元素能把事件委托给上级，但是上级不能把事件委托给下级

#### 如何实现事件委托

1. 找到子孙元素的上级，并且给上级注册事件
2. 在事件处理程序中，通过`e.target`找到触发事件的元素
3. 通过事件对象的`nodeName`判断是不是你要的那个元素

```html
<body>
    <ul>
        <li>第1</li>
        <li>第2</li>
        <li>第3</li>
        <span>的</span>
        <li>第4</li>
        <li>第5</li>
    </ul>

    <script>
        // 点击任何一个li 弹出li中的 1 2 3 4 5 内容
        let ul = document.querySelector("ul");

        // 找到子孙元素的上级，并且给上级注册事件
        ul.onclick = function (e) {
            // 在事件处理程序中，通过e.target找到触发事件的元素
            let t = e.target;
            // console.dir(t); 
            // 通过事件对象的nodeName判断是不是你要的那个元素
            // 注意 标签全部大写
            if (t.nodeName == "LI") {
                console.log(t.innerText);
            }
        }

    </script>
</body>

```

#### 通过事件委托注册事件的好处

1. 可以减少事件的绑定，节省了内存
2. 上级元素可以代理未来新动态增加的元素的事件

#### 事件委托的原理

1. 事件冒泡
2. `e.target`





















