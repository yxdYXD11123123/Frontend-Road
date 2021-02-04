# 动画效果

## offset系列

### offsetWidth和offsetHeight

#### offsetWidth

用来获取元素的宽度  `宽度+padding+border`   不包括margin 不带单位

注意：我们一般不用元素.style.属性名来获取元素的样式，这种方式只能获取行内样式，获取不了样式表或者style标签中的样式。

#### offsetHeight

用来获取元素的高度  `高度+padding+border`   不包括margin 不带单位

```html
    <style>
        html,
        body {
            padding: 0;
            margin: 0;
        }

        div {
            width: 200px;
            height: 200px;
            background-color: aqua;
            margin: 50px;
            padding: 20px;
            border: 1px solid black;
        }
    </style>
</head>

<body>
    <div></div>
    <script>
        let div = document.querySelector("div")
        console.log(div.offsetWidth); // 242

    </script>
</body>
```



### offsetLeft和offsetTop

#### offsetLeft:

 找到自身相对于定位父级的left值

#### offsetTop:

 找到自身相对于定位父级的Top值

#### 注意：

1. 一直往上找有定位的祖先元素，如果不存在任何有定位的祖先元素，那么就从body计算

```html
    <style>
        html,
        body {
            padding: 0;
            margin: 0;
        }

        .outer {
            width: 200px;
            height: 200px;
            background-color: chartreuse;
            margin-top: 100px;
            margin-left: 100px;
        }

        .inner {
            width: 100px;
            height: 100px;
            background-color: cadetblue;
        }
    </style>
</head>

<body>
    <div class="outer">
        <div class="inner"></div>
    </div>
    <script>
        // 获取inner相对于定位父级的位置
        let inner = document.querySelector(".inner")
        console.log(inner.offsetLeft);  //  100  此时是相对于body
   		console.log(inner.offsetParent);  // body  也就是说定位父级是body
    </script>
</body>
```





### offsetParent

offsetParent：获取自己的定位父级

##### 注意：

1. 元素自身如果有fixed属性，offsetParent的值为null
2. body元素的offsetParent为null
3. 如果最近的父级没有定位，那么offsetParent往上找，找到就返回该父元素，找不到，返回body

```html
    <style>
        html,
        body {
            padding: 0;
            margin: 0;
        }

        .outer {
            width: 200px;
            height: 200px;
            background-color: chartreuse;
            margin-top: 100px;
            margin-left: 100px;
        }

        .inner {
            /* 如果元素本身有fixed定位 */
            position: fixed;
            width: 100px;
            height: 100px;
            background-color: cadetblue;
        }
    </style>
</head>

<body>
    <div class="outer">
        <div class="inner"></div>
    </div>
    <script>
        // 获取inner相对于定位父级的位置
        let inner = document.querySelector(".inner")
        console.log(inner.offsetTop);  // 100 还会相对于body
        // 注意
        console.log(inner.offsetParent);  //  null 
    </script>
</body>
```





### 拖动的模态框



### 京东放大镜



## client系列

### clientLeft 和 clientTop

clientLeft：左边框的宽度

clientTop：上边框的宽度

### clientWidth 和 clientHeight

clientWidth：获取的元素不包括边框的宽度

clientHeight：获取的元素不包括边框的高度

```html
    <style>
        div {
            width: 200px;
            height: 200px;
            padding: 20px;
            border: 10px solid rebeccapurple;
            background-color: springgreen;
        }
    </style>
</head>

<body>
    <div></div>

    <script>
        let oDiv = document.querySelector("div")
        console.log(oDiv.clientLeft);  // 10  左边border宽
        console.log(oDiv.clientWidth);  // 240  不包括border
    </script>
</body>
```



## scroll系列

### scrollLeft 和 scrollTop

scrollTop：被卷去的高度（超出盒子上边框的内容高度）

scrollLeft：被卷去的宽度

#### 注意：

可以用于获取，也可以用于设置

### scrollWidth 和 scrollHeight

scrollWidth：获取指定标签内内容的真实宽度

scrollHeight：获取指定标签内内容的真实高度

```js
	let oPre = document.querySelector('pre');

    console.log(oPre.scrollWidth + "是内容的真实宽度");
    console.log(oPre.scrollHeight + "是内容的真实高度");

    oPre.addEventListener("scroll", function () {
      console.log("上边被卷去的宽度" + oPre.scrollTop);
      console.log("左边被卷去的宽度" + oPre.scrollLeft);
    })
```

```html
    <style>
        div {
            font-size: 18px;

        }

        a {
            display: none;
            position: fixed;
            right: 10px;
            bottom: 0;
            background-color: green;
            color: #fff;
            text-decoration: nong;
        }
    </style>
</head>

<body>
    <a href="javascript:;">返<br>回<br>顶<br>部</a>
    <h1>第七集第二十四章</h1>
    <pre> ... </re>
    
    <script>
        let oA = document.querySelector("a")
        // 功能1: 当滚动条到一定位置 让返回顶部显示 否则隐藏
        // 这里监听document和window都可以
        document.addEventListener("scroll", function () {
            // 这里为了兼容性  判断多个
            if (document.documentElement.scrollTop > 300 || document.body.scrollTop > 300 || window.pageYOffset > 300) {
                // IE9以上: window.pageYOffset  相当于 document.body.scrollTop
                oA.style.display = "block"
            }
            else {
                oA.style.display = "none"
            }
        })
        // 功能2:
        // 点击a标签，返回顶部
        oA.onclick = function () {
            // 这里也可以为了兼容性，更改多个，以确保返回成功
            document.documentElement.scrollTop = 0;
        }
    </script>
</body>
```



#### 固定导航 案例

```html
    <style>
        html,
        body {
            padding: 0;
            margin: 0;
            height: 1500px;
        }

        header {
            height: 400px;
            background-color: springgreen;
        }

        nav {
            height: 20px;
            background-color: tan;
        }
    </style>
</head>

<body>
    <header></header>
    <nav>导航栏</nav>

    <script>
        // 获取元素
        let header = document.querySelector("header")
        let nav = document.querySelector("nav")

        // 获取nav距离页面顶部的距离，也就是到body顶边的距离
        let navAwayTop = nav.offsetTop;
        document.addEventListener("scroll", function () {
            if (document.documentElement.scrollTop > navAwayTop) {
                nav.style.position = "fixed"
                nav.style.width = "100%"
                nav.style.top = "0px";
                nav.style.left = "0px"
            }
            else {
                nav.style.position = "static"
            }
        })
    </script>
</body>
```

