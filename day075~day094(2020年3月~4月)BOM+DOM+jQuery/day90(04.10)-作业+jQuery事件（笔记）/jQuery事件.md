# `jQuery`事件

## 事件处理

### 绑定事件

#### `元素.on(事件类型，[触发事件的元素]，事件处理函数)` 

可以触发多次

##### 注意：

<font color=red>我们的参数里如果有委托事件的对象时， 处理事件函数中的this是触发事件元素，不是绑定事件的元素</font>



#### `元素.one(事件类型，事件处理函数) `

只能触发一次

```html
<body>
    <div>
        <button>按钮</button>
    </div>

    <script src="./lib/jquery-3.4.1.js"></script>
    <script>
        $("button").on("click", function () {
            console.log(111);
        })

        $("button").one("click", function () {
            console.log(222);
        })

        // 事件委托
        // 给 document 绑定点击事件，当点击 button 时触发事件
        $('div').on("click", "button", function () {
            console.log("div身上的委托事件")
            console.log($(this))
            // jQuery.fn.init [button]
        })
        // 注意：我们的参数里如果有委托事件的对象时，
        //      处理事件函数中的this是触发事件元素，不是绑定事件的元素
    </script>
</body>
```



### 解绑事件

#### 元素.off(事件名, 选择器)

```html
<body>
    <button>按钮</button>
    <div></div>

    <script src="./lib/jquery-3.4.1.js"></script>
    <script>
        $("button").on("click", function () {
            console.log(111);
        })
        $("button").on("mouseover", function () {
            console.log(222);
        })
        $("div").on("click", function () {
            $("button").off("click");
            $("button").off("mouseover");
        })
    </script>
</body>
```



### 常见事件类型

#### 载入事件

入口函数：

```html
    <style>
        div {
            width: 100px;
            background-color: aqua;
            height: 100px;
        }
    </style>
    <!-- 
        什么情况下，需要将script写到 head 中
        例如：用js变动了html,css样式，就需要写到上面
        否则打开页面会有闪动的情况

        例如：轮播的创建li
    -->
    <!-- 注意：将js永远要写到style下面 -->
    <script src="./lib/jquery-3.4.1.js"></script>
    <script>
        // 这样写，相当于 DOMComtentLoaded 
        $(document).ready(function () {
            $("div").click(function () {
                console.log(1);
            })
        })

        // 这样写，相当于 window.onload
        $(function () {
            $("div").click(function () {
                console.log(2);
            })
        })
    </script>
</head>

<body>
    <div>
        <button>按钮</button>
    </div>
</body>
```



#### 鼠标事件

`click(), dblclick(), mouseenter(), mouseleave(), mouseout(), mouseover(), mouseup(), mousedown()...`

#### 键盘事件

`keydown(), keyup(), keypress()`

键盘变色案例：

```html
  <style>
    * {
      padding: 0;
      margin: 0;
      list-style: none;
    }

    ul {
      width: 800px;
      margin: 100px auto;
    }

    li {
      border: 1px solid #f00;
      width: 80px;
      float: left;
      text-align: center;
      height: 30px;
      line-height: 30px;
    }

    .active {
      background-color: #0F0
    }
  </style>
</head>

<body>
  <ul class="box">

  </ul>
  <script src="./lib/jquery-3.4.1.min.js"></script>
  <script>
    // - 把给定的数据渲染到页面上
    //  - 键盘按下对应的数据的哪个键，页面中对应的那个数据的就会选中，添加背景色
    var allKey = ["1", '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U',
      'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'
    ];
    // // 1.遍历allkey数组
    // 获取box
    let $box = $(".box")
    // 渲染数据
    $.each(allKey, function (i, j) {
      $box.append(`<li keyCode="${j.charCodeAt()}">${j}</li>`)
    })
    // // 2.给document添加keydown事件 e.keyCode a+健码 = id 通过id找到这个元素 让这个元素高亮
    $(document).keydown(downKey)
    function downKey(e) {
      $(`.box li[keyCode = ${e.keyCode}]`).addClass("active")
    }
    // // 3.给document添加keyup事件 e.keyCode a+健码 = id 通过id找到这个元素 让这个元素去除active
    $(document).keyup(upKey)
    function upKey(e) {
      $(`.box li[keyCode = ${e.keyCode}]`).removeClass("active")
    }
  </script>
</body>
```





## 事件切换

### 同时绑定鼠标移入移出

##### 语法：`hover(overfn, outfn)`

```html
  <style>
    div {
      width: 200px;
      height: 200px;
      background-color: red;
    }
  </style>
</head>

<body>
  <div></div>
  <script src="./lib/jquery-3.4.1.min.js"></script>
  <script>
    $("div").hover(function () {
      $(this).css("backgroundColor", "yellow")
    }, function () {
      $(this).css("backgroundColor", "green")
    })
  </script>
</body>
```





### 切换显示和隐藏

##### 语法：`toggle()`

```html
  <style>
    div {
      width: 200px;
      height: 200px;
      background-color: red;
    }
  </style>
</head>

<body>
  <button>按钮</button>
  <div></div>
  <script src="./lib/jquery-3.4.1.min.js"></script>
  <script>
    $("button").click(function () {
      $("div").toggle()
    })
  </script>
</body>
```



## 事件坐标

### 相对于可视窗口的左上角

`e.clientX`

`e.clientY`

### 相对于页面左上角

`e.pageX`

`e.pageY`

### 相对于元素左上角

`e.offsetX`

`e.offsetY`

```html
  <style>
    div {
      width: 200px;
      height: 200px;
      background-color: aqua;
      margin-top: 100px;
      margin-left: 50px;
    }
  </style>
</head>

<body>
  <div></div>
  <script src="./lib/jquery-3.4.1.min.js"></script>
  <script>
    $("div").mousemove(function (e) {
      console.log(e.offsetX + "   " + e.offsetY);
    })
  </script>
</body>
```



## 阻止事件冒泡

#### `e.stopPropagation()`

```html
  <style>
    .outer {
      width: 400px;
      height: 400px;
      background-color: red;
    }

    .inner {
      width: 200px;
      height: 200px;
      background-color: green;
    }
  </style>
</head>

<body>
  <div class="outer">
    <div class="inner"></div>
  </div>
  <script src="./lib/jquery-3.4.1.min.js"></script>
  <script>
    $('.inner').click(function (e) {
      console.log(111111);
      // 阻止事件冒泡
      e.stopPropagation()
    })
    $('.outer').click(function () {
      console.log(22222);
    })
  </script>
</body>
```



## 取消事件默认行为

#### `e.preventDefault()`

```html
<body>
  <a href="https://www.baidu.com/">百度</a>
  <script src="./lib/jquery-3.4.1.min.js"></script>
  <script>
    // 也可以：
    //  <a href="javascript:;">百度</a>
    //  <a href="javascript:void(0);">百度</a>

    $("a").click(function (e) {
      e.preventDefault();
    })
  </script>
</body>
```

