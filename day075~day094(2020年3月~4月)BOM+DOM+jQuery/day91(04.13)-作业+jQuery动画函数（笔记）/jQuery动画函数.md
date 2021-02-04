## 滑动动画

#### `slideDown(speed, [easing], [fn])`

#### `slideUp(speed, [easing], [fn])`

#### `slideToggle(speed, [easing], [fn])`

**speed**:

三种预定速度之一的字符串("slow","normal", or "fast")或表示动画时长的毫秒数值(如：1000)

**easing**:

(Optional) 用来指定切换效果，默认是"swing"，可用参数"linear"

**`fn`:**

在动画完成时执行的函数，每个元素执行一次。

```html
    <style>
        div {
            width: 200px;
            height: 200px;
            background-color: aqua;
        }
    </style>
</head>

<body>
    <button class="show">下拉</button>
    <button class="hide">卷起</button>
    <button class="toggle">下拉/卷起</button>
    <div></div>

    <script src="./lib/jquery-3.4.1.js"></script>
    <script>
        $('.show').on("click", function () {
            $("div").slideDown(1000, function () {
                console.log("完全下拉");
            })
        })

        $(".hide").on("click", function () {
            $("div").slideUp(1000, function () {
                console.log("完全卷起");
            })
        })

        $(".toggle").on("click", function () {
            $("div").slideToggle(1000, function () {
                console.log("切换");
            })
        })
    </script>
</body>
```



## 淡出淡入动画

#### `fadeIn([speed],[easing],[fn])`

#### `fadeOut([speed],[easing],[fn])`

#### `fadeToggle([speed],[easing],[fn])`

#### `fadeTo([speed],opacity,[easing],[fn])`



```
    <style>
        div {
            width: 200px;
            height: 200px;
            background-color: black;
        }
    </style>
</head>

<body>
    <button class="show">淡入</button>
    <button class="hide">淡出</button>
    <button class="toggle">淡入/淡出</button>
    <button class="fideto">淡入到0.5</button>
    <div></div>

    <script src="./lib/jquery-3.4.1.js"></script>
    <script>
        $('.show').on("click", function () {
            $("div").fadeIn(1000, function () {
                console.log("完全淡入");
            })
        })

        $(".hide").on("click", function () {
            $("div").fadeOut(1000, "linear", function () {
                console.log("完全淡出");
            })
        })

        $(".toggle").on("click", function () {
            $("div").fadeToggle(1000, function () {
                console.log("淡入/淡出");
            })
        })
        $(".fideto").on("click", function () {
            $("div").fadeTo(1000, 0.5, function () {
                console.log("fadeto");
            })
        })
    </script>
</body>
```

#### 淡入淡出轮播图

```html
  <script>
    // 声明变量，用来记录索引
    let index = 0
    // 点击 right 让轮播图走到下一个
    $('.arrow-right').on("click", function () {
      index++;
      if (index > $(".slider li").length - 1) {
        index = 0;
      }
      // $(".slider li").eq(index).fadeIn(500);
      // $(".slider li").eq(index).siblings("li").fadeOut(500)
      // 链式编程
      $(".slider li").eq(index).fadeIn(500).siblings("li").fadeOut(500)
    })
    // 点击 left 让轮播图走到上一个
    $(".arrow-left").on("click", function () {
      index--;
      if (index < 0) {
        index = $(".slider li").length - 1
      }
      $(".slider li").eq(index).fadeIn(500).siblings("li").fadeOut(500)
    })
    // 自动往下一个走
    setInterval(function () {
      $(".arrow-right").click()
    }, 2000)
  </script>
```



## 显示隐藏动画

### `show(speed, [easing], [fn])`

### `hide(speed, [easing], [fn])`

### `toggle(speed, [easing], [fn])`

##### `speed`: 

隐藏/显示 效果的速度。默认是 "0"毫秒。可能的值：slow，normal，fast。

##### `easing`:

(Optional) 用来指定切换效果，默认是"swing"，可用参数"linear"

##### `fn`:

在动画完成时执行的函数，每个元素执行一次。



```html
    <style>
        div {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 200px;
            height: 200px;
            background-color: aqua;
        }
    </style>
</head>

<body>
    <button class="show">显示</button>
    <button class="hide">隐藏</button>
    <button class="toggle">显示/隐藏</button>
    <div></div>

    <script src="./lib/jquery-3.4.1.js"></script>
    <script>
        $('.show').on("click", function () {
            $("div").show(3000, function () {
                console.log("显示出来了");
            })
        })

        $(".hide").on("click", function () {
            $("div").hide(3000, function () {
                console.log("隐藏起来了");
            })
        })

        $(".toggle").on("click", function () {
            $("div").toggle(3000, function () {
                console.log("切换");
            })
        })
    </script>
</body>
```



#### 轮流显示隐藏案例

```html
  <style>
    div {
      width: 400px;
    }

    img {
      width: 90px;
      height: 90px;
      vertical-align: middle;
    }
  </style>

</head>

<body>
  <input type="button" value="隐藏动画" id="btn1" />
  <input type="button" value="显示动画" id="btn2" />
  <div>
    <img src="image/1.jpg" />
    <img src="image/2.jpg" />
    <img src="image/3.jpg" />
    <img src="image/4.jpg" />
  </div>
  <script src="./lib/jquery-3.4.1.min.js"></script>
  <script>
    // 第一个按钮,隐藏
    $("#btn1").on("click", function () {
      $("div img").eq(-1).hide(300, function fn1() {
        $(this).prev().hide(300, fn1)
      })
    })
    // 显示
    $("#btn2").on("click", function () {
      $("div img").eq(0).show(300, function fn1() {
        $(this).next().show(300, fn1)
      })
    })
  </script>
</body>
```



## 自定义动画

### animate()

```html
    <style>
        div {
            width: 200px;
            height: 200px;
            background-color: chartreuse;
        }
    </style>
</head>

<body>
    <button class="show">动画</button>
    <div></div>

    <script src="./lib/jquery-3.4.1.js"></script>
    <!-- 原本的jQuery不支持颜色渐变，所以我们需要一个插件 -->
    <script src="./lib/jquery.animate-colors-min.js .js"></script>
    <script>
        $('button').on("click", function () {
            $('div').animate({
                width: 400,
                height: 200
            }, 2000, function () {
                $("div").animate({
                    height: 20,
                    width: 300,
                    backgroundColor: "yellow"
                }, 1000)
            })
        })
    </script>
</body>
```

