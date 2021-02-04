## (增)添加节点

#### 用 `html()` 添加 

但是这个方法会先清空元素里面的内容

```
$("div").html("<b>你好</b>")
```

#### 插入到元素里面的后面

语法：

1. `父元素.append(子元素)`

   ```html
   <body>
       <div class="box"></div>
       <span>span</span>
       <span>span2</span>
   
       <script src="./lib/jquery-3.4.1.js"></script>
       <script>
           let span = document.querySelector("span")
           $(".box").append(span) // 把第一个span插入到了.box中
           // 或者
           // $(".box").append($("span"))  // 把两个span都插入到.box中
           // 注意：这样会删除原有的span，然后插入到 .box中
       </script>
   </body>
   ```

   

2. `子元素.appendTo(父元素)`

   ```js
   // 将一个元素插入到父元素最后
   let box = document.querySelector(".box")
   $("<b>b标签</b>").appendTo(box)
   // 或者
   $("<b>b标签</b>").appendTo($(".box"))
   ```

   

#### 插入到元素里面的前面

语法：

1. `父元素.prepend(子元素)`
2. `子元素.prependto(父元素)`

```html
<body>
    <div class="box"><b>我是b</b></div>

    <script src="./lib/jquery-3.4.1.js"></script>
    <script>
        $('.box').prepend("<small>我是small1</small>")
        $("<small>我是small2</small>").prependTo($(".box"))
        // 参数也可以直接写 ".box"  , 不需要 $(".box")或者是DOM对象
        //String, Element, jQuery都可以是参数
        $("<small>我是small3</small>").prependTo(".box")
    </script>
</body>
```



#### 插入到某个元素外面的后面 / 前面

 语法：

1. 后面：`.after(content)`
2. 前面：`.before(content)`
3. 后面：`.insertAfter()`
4. 前面：`.insertBefore()`

```html
<body>
    <div class="box"><b>我是b</b></div>

    <script src="./lib/jquery-3.4.1.js"></script>
    <script>
        $("<small>我是small后</small>").insertAfter(".box")
        $("<small>我是small前</small>").insertBefore(".box")
    </script>
</body>
```



## (改)替换节点

#### `元素.replaceWith(content)`



#### `$(content).replaceAll(被替换的目标)`



## (删)删除节点

#### `元素.remove()`    删除这个元素



#### `父元素.empty()`   清空父元素的所有子元素



## 复制节点

#### `元素.clone()`

参数：true为深克隆，false为浅克隆

注意：这里的深克隆是指 对象的绑定事件也会克隆

## (查)查找节点

#### `父元素.children()`

获取所有子元素

#### `元素.find(后代元素选择器)`

用选择器寻找某个后代元素

#### `parent()`

某个元素的父元素

#### `parents( 用于筛选祖先元素的表达式--可以不写 )`

某个元素的所有祖先元素

#### `prev()`

某个元素前面的兄弟元素

#### `prevAll()`

某个元素前面所有的兄弟元素

#### `next()`

某个元素后面的兄弟元素

#### `nextAll()`

某个元素后面所有的兄弟元素

#### `siblings()`

某个元素的所有兄弟元素（不包括自己）



## 操作 `css` 样式

#### 语法

`元素.css()`

`css`属性名要用驼峰命名法

#### 参数

可以是字符串，或者是一个对象

仅传入一个字符串时返回：`css`样式的值

```html
<body>
    <div class="box"><b>我是b</b></div>

    <script src="./lib/jquery-3.4.1.js"></script>
    <script>
        console.log($("div").css('backgroundColor'));
        $("div").css('backgroundColor', 'red')
        $("div").css({
            backgroundColor: "blue",
            color: "yellow",
            height: 100
        })
    </script>
</body>
```

