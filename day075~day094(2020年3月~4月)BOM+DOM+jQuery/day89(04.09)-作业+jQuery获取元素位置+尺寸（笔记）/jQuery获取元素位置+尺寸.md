## 获取/设置标签的位置

### offset()相对于页面左上角的坐标

#### left

语法：元素.offset().left

#### top

语法：元素.offset().top

##### 注意：此方法只对可见元素有效

#### 参数

- 值对，比如 {top:100,left:0}
- 带有 top 和 left 属性的对象

```html
    <style>
        html,
        body {
            margin: 0;
        }

        .box {
            position: absolute;
            top: 30px;
            left: 30px;
            width: 300px;
            height: 300px;
            background-color: chartreuse;
        }

        .inner {
            position: absolute;
            /* display: none; */
            top: 20px;
            left: 20px;
            width: 100px;
            height: 100px;
            background-color: darkorange;
        }
    </style>
</head>

<body>
    <div class="box">
        <div class="inner"></div>
    </div>

    <script src="./lib/jquery-3.4.1.js"></script>
    <script>
        console.log($(".inner").offset().top);
        console.log($(".inner").offset().left);
        
        $(".inner").offset({ left: 0, top: 0 })
    </script>
</body>
```



### position()是一个定位元素相对于定位父元素(或者根元素`<body>`)左上角的位置

#### 语法：

1. $("选择器").position().top
2. $("选择器").position().left

```html
    <style>
        html,
        body {
            margin: 0;
            overflow: hidden;
        }

        .box {
            margin: 10px;
            width: 300px;
            height: 300px;
            background-color: chartreuse;
            overflow: hidden;
        }

        .inner {
            position: relative;
            /* display: none; */
            top: 20px;
            left: 20px;
            width: 100px;
            height: 100px;
            background-color: darkorange;
        }
    </style>
</head>

<body>
    <div class="box">
        <div class="inner"></div>
    </div>

    <script src="./lib/jquery-3.4.1.js"></script>
    <script>
        let position = $(".inner").position()
        $(".inner").html("left: " + position.left + ", top: " + position.top);
        // left: 30, top: 30   相对于body
    </script>
</body>
```



### 获取卷曲内容的高度

#### 语法：

1. `$("选择器").scrollTop()`
2. `$("选择器").scrollLeft()`

#### 参数

可以设置 `scrollTop / scrollLeft ` 的值

##### 注意：此方法对可见和隐藏元素均有效

```javascript
    // 给页面添加滚动监听
    $(document).scroll(function () {
      if ($(document).scrollTop() > 500) {
        $('a').show()
      }
      else {
        $("a").hide()
      }
    })

    // 给a添加点击事件
    $("a").click(function () {
        // 返回顶部
      $(document).scrollTop(0)
    })
```





## 获取/设置标签的尺寸

### 获取元素计算后的高度/宽度

#### width()

#### height()

可以获取，也可以设置

```html
    <style>
        div {
            width: 200px;
            height: 200px;
            padding: 20px;
            margin: 10px;
            border: 2px solid red;
        }
    </style>
</head>

<body>
    <div>

    </div>
    <script src="./lib/jquery-3.4.1.js"></script>
    <script>
        console.log($("div").width());  // 200
        console.log($("div").height());  // 200
        $("div").width(40)
        $("div").height(40)
    </script>
</body>
```



### 获取匹配元素不包括边框，包括内边距的宽度

#### `innerWidth() / innerHeight()`

### 获取匹配元素不包括边框，包括内边距，包括边框的宽度

#### `outerWidth() / outerHeight()`

```html
    <style>
        div {
            width: 200px;
            height: 200px;
            padding: 20px;
            margin: 10px;
            border: 2px solid red;
        }
    </style>
</head>

<body>
    <div></div>
    <script src="./lib/jquery-3.4.1.js"></script>
    <script>
        console.log($("div").innerWidth() + "宽," + $("div").innerHeight() + "高");
        // 240宽,240高
        console.log($("div").outerWidth() + "宽," + $("div").outerHeight() + "高");
        // 244宽,244高
    </script>
</body>
```

