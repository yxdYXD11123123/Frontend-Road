## WebAPI简介

### js基础和WebAPI的关系

js基础规定的是js的基本语法

Web API是用来完成网页交互效果的

只有在js基础知识之上，我们才能去学习Web API, 从而实现网页交互

### 什么是Web API

#### API:

其它开发者预先定义好的一些方法（功能）

#### Web API： 

W3C预先定义好的，包括DOM, BOM

DOM用来操作页面元素，BOM用来操作浏览器功能

#### 学习WebAPI的方法：

Web API一般都有输入和输出（函数的传参和返回值）

1. 知道这个方法的作用
2. 知道这个方法需要哪些参数
3. 知道这个方法返回啥
4. 知道这个方法的兼容性咋样

#### 查询：

MDN和语雀 等网站

### DOM

就是文档对象模型 (document object model)

主要的作用：改变网页的内容，样式

#### 基本概念

DOM树：就是根据网页来进行抽象出来的一种树状结构

文档（document）： 一个页面就是一个文档

元素（element）：`<标签>`内容`</标签>` 任何一个标签都是一个元素

节点（node）：

* 标签节点
* 文本节点
* 属性节点
* 注释节点

## 元素获取

### 通过ID获取元素

#### 语法：

元素对象 = document.getElementById("id的名字")

#### 返回值：元素对象

无兼容性问题

```js
// 获取元素通过ID  
let oDiv = document.getElementById("dv")
// 语法：元素对象 = document.getElementById("id的名字")
console.log(oDiv); //打印出的标签其实是一个对象(有方法和属性)
console.dir(oDiv); // 打印对象的详细信息(所有属性和方法)

// 为什么写oDiv为变量名?
// o 代表对象
// a 代表数组
```



### 通过标签名获取元素

#### 语法：

node.getElementsByTagName("标签名");

注意：node可以是任何元素，也可以是document

#### 作用：

通过标签名获取名字

#### 返回值：

元素对象集合（一个伪数组，所以是element<font color=red>s</font>）

#### 兼容性：

在任何浏览器都可以

```html
 	<ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
    </ul>
    <ol id="ol">
        <li>a</li>
        <li>b</li>
        <li>c</li>
    </ol>
    <script>
        let get = document.getElementsByTagName("ul");
        console.log(get);
        console.log(get[0]);
        console.dir(get[0]);
        console.log(document.getElementsByTagName("li"));

        // 需求：只要ol 的 li
        
        // 方法一：
        // node.getElementsByTagName()
        // node是个节点
        // 先要获取ol
        let ol = document.getElementById("ol")
        // 再在ol找有没有li
        let secondLi = ol.getElementsByTagName("li")
        console.log(secondLi);
        
		// 方法二：
        var OlLi = document.getElementsByTagName("ol")[0].getElementsByTagName("li")
        console.log(OlLi);
    </script>
```



### 通过类名获取元素

#### 语法： 

document.getElementsByClassName("元素的类名")

#### 返回值：

元素对象集合（伪数组）

#### 兼容性：

没有标签名和id名好用，但是现代浏览器大概都可以兼容

```html
	<div class="box">你好</div>
    <script>
        // 通过类名获取元素
        // 方法： document.getElementsByClassName("元素的类名")
        // 返回值： 数据对象集合（伪数组）
        let box = document.getElementsByClassName("box")[0]
        console.log(box);
    </script>
```

#### 注意：

`<div class="a b c"></div>` 你可以用a获取，也可以用b获取



### 通过CSS选择器获取元素(推荐)

#### 方法：

document.querySelector("css选择器")

#### 参数：

符合css选择器的 （#id名  .class名  标签名）

#### 返回值：

元素对象

#### 兼容性：

不能用在低版本的浏览器

#### 注意点：

如果符合css选择器的元素有多个，只获取第一个

```html
	<div id="dv">
        <ul>
            <li>1号</li>
            <li>2号</li>
            <li>3号</li>
            <li>4号</li>
        </ul>
        <ul class="list">
            <li>5号</li>
            <li>6号</li>
            <li>7号</li>
            <li>8号</li>
        </ul>
        <p>睡觉</p>
    </div>

    <script>
        // 方法：document.querySelector("css选择器")
        // 参数：符合css选择器的 （#id名  .class名  标签名）
        // 返回值：元素对象
        // 兼容性：不能用在低版本的浏览器
        // 注意点：如果符合css选择器的元素有多个，只获取第一个
        let oDv = document.querySelector("#dv")
        console.log(oDv);
        let oList = document.querySelector(".list")
        console.log(oList);
        let firstLi = document.querySelector(".list li:first-child")
        console.log(firstLi);
        let oP = document.querySelector("p")
        console.log(oP);

        // 只能得到符合选择器的第一个元素
        let li = document.querySelector("li")
        console.log(li);
        
        
          // 如果你想要获取多个，并且还用querySeletor，你可以用querySeletorAll
        // 方法：document.querySeletorAll("css选择器")
        // 返回值：伪数组
        let liAll = document.querySelectorAll("li")
        console.log(liAll);
        let evenLi = document.querySelectorAll("li:nth-child(even)")
        console.log(evenLi);
    </script>

```



### 获取特殊元素

### body

方法：document.body

返回：body元素

参数：无参数

### html

方法：document.documentElement

返回：html元素

参数：没有



## 事件基础

当.....时，做......?

### 什么是事件

是一种信号，它可能是用户或者电脑发生的，在本阶段，主要是用户的点击，按键盘，鼠标划过。

### 事件三要素

事件源：事件发生在谁身上

事件类型：浏览器给我们规定好的一些事件类型: click（点击）、mouseover(鼠标移入)

事件处理程序：当事件在事件源发生的时候，要干啥

```html
<--
// 当发送按钮 被点击的时候，文字发送给了大家
// 当 回车键  被按下的时候，文字发送给了大家
// 当 麦克风图片  被点击的时候，就可以进行语音通话了

// 事件源：事件发生在谁身上
// 事件类型：浏览器给我们规定好的一些事件类型: click（点击）、mouseover(鼠标移入)
// 事件处理程序：当事件在事件源发生的时候，要干啥
    -->
	<button>按钮</button>
    <script>
        // 点击按钮时，浏览器弹出 hello
        // 1. 获取事件源
        let oBtn = document.querySelector("button")
        // 2. 给事件源锁定点击事件 on + 事件类型
        oBtn.onclick = function () {
            // 3. 处理程序
            alert("hello")
        }
    </script>
```

### 事件的执行步骤

1. 获取时间源
2. 绑定事件
3. 书写事件处理程序

```js
let 元素 = 获取元素的方法;
元素.事件 = function () {
    程序;
}
```

### 常见的事件类型

```js
	let oDiv = document.getElementById("dv")
        // 点击事件  click事件
        // oDiv.onclick = function () {
        //     alert("click")
        // }
        // mouseover事件  鼠标经过触发
        // oDiv.onmouseover = function () {
        //     alert("mouseover")
        // }
        // mouseout事件  鼠标离开触发
        // oDiv.onmouseout = function () {
        //     alert("mouseout")
        // }
        // mousemove事件  鼠标移动触发
        oDiv.onmousemove = function () {
            console.log("mousemove");
        }
        // mouseup事件  鼠标弹起触发
        // oDiv.onmouseup = function () {
        //     console.log("mouseup")
        // }
        // mousedown事件  鼠标按下触发
        oDiv.onmousedown = function () {
            alert("mousedown")
        }
```

#### 更多鼠标事件

`onfocus`  获得鼠标焦点触发

`onblur`  失去鼠标焦点触发



## 操作元素

### 操作元素的内容

（标签中的内容）InnerHTML、InnerText

#### 功能：

都可以设置内容和获取内容（增删改查）

#### 区别：

innerHTML：W3C标准，识别标签（会解析标签、换行等等）获取标签内所有内容，包括子标签

innerText：非标准，不识别标签（只会把标签当作文本、不识别换行）只会获取文字内容，不会获取标签

#### 注意：如果想要清空标签里的内容

元素.innerHTML = null; 元素.innerText = null; (空字符也可以实现)

```html
<body>
    <button>点我查看</button>
    <div class="box"></div>
    <div class="outer"></div>
    <script>
        // 操作元素内容  
        // 元素.innerHTML = "内容"
        // 元素.innerText = "内容"

        // 需求， 当点击按钮的时候  把 我在睡觉 这句话写到box中
        // 1. 获取元素
        let OBtn = document.querySelector("button")
        let oBox = document.querySelector(".box")
        let oOuter = document.querySelector(".outer")
        // 2. 
        OBtn.onclick = function () {
            // innerHTML
            // 特点：可以解析标签    例如：可以在里面写标签<h1>我在睡觉</h1>
            oBox.innerHTML = "<h1>我在睡觉</h1>";
            oOuter.innerHTML = "我在玩耍"

            // innerText
            // 特点：不可以解析标签，会把标签显示成文本
            // oBox.innerText = "我在睡觉";
            // oOuter.innerText = "我在玩耍"
            
            
             // innerHTML 和 innerText 在获取内容时的区别
            // innerHTML可以获取标签内所有内容，包括子标签
            // innerText 只会获取文字内容，不会获取标签
            console.log(oBox.innerHTML);  // <h1>我在睡觉</h1>
            console.log(oOuter.innerText);  // 我在睡觉
        }

    </script>
</body>
```



### 操作元素的样式

### 操作元素的常见属性

**`titile`  `id`  `src`  `alt`  `style`  `href`**

```html
<body>
    <button>点我，改变链接</button>
    <a href="http://www.baidu.com">百度一下</a>
    <img>
    <script>
        // title
        // id 
        // src
        // alt
        // href
        // 图片的一些html规定好的属性

        // let oImg = document.getElementsByTagName("img")[0];
        let oBtn = document.querySelector("button")
        let oA = document.querySelector("a")
        oBtn.onclick = function () {
            // oImg.src = '.../psb.jpg'
            oA.href = 'https://es6.ruanyifeng.com/'
            oA.innerText = "问问阮一峰"
        }
    </script>
</body>
```

### **`style` 样式**

给元素添加样式

#### 语法：

元素.style.属性的名字（如果是一个单词，直接写；如果是用横杠分开的，要写成--小驼峰）

```js
元素.style.backgroundColor = "颜色值"
```

```html
<body>
    <button>点击按钮，变颜色</button>
    <button>点击按钮，变大</button>
    <div></div>
    <script>
        // 点击按钮给元素改变样式属性  style
        let oDiv = document.querySelector("div")
        let oBtn = document.querySelector("button")
        let oBtnA = document.querySelectorAll("button")[1]
        oBtn.onclick = function () {
            oDiv.style.backgroundColor = "red"
        }
        oBtnA.onclick = function () {
            oDiv.style.height = "200px"
            oDiv.style.width = "200px"
        }
    </script>
</body>
```

#### 注意：

用js操作的所有的样式都是行内样式，所以如果可以，尽量不要直接用js写样式。

### 操作元素的类名

**尽量用 操作类名 代替 直接操作元素属性 。**

。

#### 语法：

<font color=red>添加类名</font>

* **元素.classList.add("类名")**

  返回值：无

  兼容性：不能再低版本浏览器使用

* **元素.className = "值1 值2 值3"**

  兼容性：无兼容性问题
  
* ##### 注意：

  添加类名时容易遇到一个问题，就是类名叠加时，如果优先级相同，会根据就近原则，与类名前后无关

<font color=red>删除类名  </font>

* **元素.classlist.remove("类名")**

  返回值：无

  兼容性：不能再低版本浏览器使用

* **元素.className = "值1 值2 值3"**

  兼容性：无兼容性问题

<font color=red>切换类名   </font>

* **元素.classList.toggle("要切换的类名")**

  注意：切换的意思是如果元素有这个类名，那么就删除，如果元素没有这个类名，那就添加

<font color=red>判断是否包含某类名</font>

* **元素.classList.contains("要判断的类名")**

  返回值：true / false

  兼容性：不能再低版本浏览器使用

```html
    <style>
        .red {
            background-color: red;
        }

        .blue {
            color: blue;
        }
    </style>
</head>

<body>
    <button>按钮</button>
    <ul>
        <li>1</li>
        <li class="ccc bbb">2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
    </ul>
    <script>
        // 用js来操作类名
        let oBtn = document.querySelector("button")
        let oLi = document.querySelector("li")
        let oSecondLi = document.querySelector(".ccc")

        // 1. 如何给li添加类名
        // 给元素添加类名  元素.classList.add("类名")
        oBtn.onclick = function () {
            // 方案一
            oLi.classList.add('red')
            // 方案二  （古老的方案） 相当于重新设置类名
            oLi.className = 'red';
        }

        // 2. 如何给li删除类名
        // 元素.classlist.remove("类名")
        oBtn.onclick = function () {
            oSecondLi.classList.remove("bbb")
        }

        // 3. 如何切换类名
        // 元素.classList.toggle("要切换的类名")
        // 原则：如果元素有a类名，那么就删除，如果元素没有这个类名，那就添加
        oBtn.onclick = function () {
            oSecondLi.classList.toggle("blue")
        }

        // 4. 如何判断某一个元素是否包含某个类名
        // 元素.classList.contains("类名")   返回true/false
        oBtn.onclick = function () {
            let result = oSecondLi.classList.contains('bbb')
            console.log(result);
        }
    </script>
</body>
```



#### 表单的value属性

##### 语法：元素.value = "值"

```html
<body>
    <!-- 当input输入框  获取焦点时，让input输入框内，用js写入内容，我在学习 -->
    <!-- 当input输入框  失去焦点时，让input输入框内，内容变为，never stop -->
    <input type="text" name="" id="">
    <script>
        // 1. 获取
        let oInput = document.getElementsByTagName("input")[0]
        // 2. 给输入框绑定焦点事件(onfocus)
        oInput.onfocus = function () {
            // 给input的value写入值
            this.value = "我在学习"
        }
        // 3. 给输入框绑定失去焦点事件(onblur)
        oInput.onblur = function () {
            // 给input的value写入值
            this.value = "never stop"
        }
    </script>
</body>
```



#### 表单的type属性

值有 `text` `password` `number` `checkbox` 等

##### 语法：元素.type = "值"

```html
<body>
    <div>
        <label for="psd">密码</label>
        <input type="password" name="psd">
    </div>

    <script>
        // 当input获得焦点时,能看到密码是明文
        // 当input失去焦点时,密码是暗文

        let oInput = document.querySelector("input")
        oInput.onfocus = function () {
            this.type = "text"
        }
        oInput.onblur = function () {
            this.type = "password"
        }
    </script>
</body>
```



#### checked属性

##### 语法：元素.checked = 布尔值  （true代表选中，false代表不选中）

```html
<body>
    <button>修改兴趣</button>
    <label for="basketball">
        <input type="checkbox" value="1" name="hobby" id="basketball"> 打篮球
    </label>
    <label for="ymq">
        <input type="checkbox" value="2" name="hobby" id="ymq"> 羽毛球
    </label>
    <label for="pp">
        <input type="checkbox" value="3" name="hobby" id="pp"> 乒乓球
    </label>

    <script>
        let oBtn = document.querySelector("button")
        let oBasketball = document.getElementById("basketball")
        let oPp = document.getElementById("pp")
        // 点击时,选中两个
        oBtn.onclick = function () {
            oBasketball.checked = true
            oPp.checked = true
        }
    </script>
</body>
```



#### disabled属性

##### 语法：元素.disabled = 布尔值  （true代表不能点击--禁用，false代表能点击）

```html
<body>
    <span>点我看看</span>
    <button>我是按钮</button>

    <script>
        // 点击span 让按钮不可用
        let oSpan = document.querySelector("span")
        let oBtn = document.querySelector("button")

        oSpan.onclick = function () {
            oBtn.disabled = true;  // true为不可用
        }
    </script>
</body>
```



#### selected属性

##### 语法：元素.selected = 布尔值  （true代表选中）

```html
<body>
    <!-- 点击按钮,选中你爱吃的菜 -->
    <button>点击 选中你爱吃的菜</button>

    <select>
        <option value="鱼肉">鱼肉</option>
        <option value="羊肉" id="sheep">羊肉</option>
        <option value="猪肉">猪肉</option>
        <option value="牛肉">牛肉</option>
        <option value="鸡肉">鸡肉</option>
    </select>

    <script>
        let oBtn = document.querySelector("button")
        let oSheep = document.getElementById("sheep")

        oBtn.onclick = function () {
            oSheep.selected = true;
        }
    </script>

</body>
```


