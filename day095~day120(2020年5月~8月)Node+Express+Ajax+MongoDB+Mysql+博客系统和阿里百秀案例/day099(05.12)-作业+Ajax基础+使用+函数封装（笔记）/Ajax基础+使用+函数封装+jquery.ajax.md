# Ajax

## Ajax概述

### Ajax的特点

1. Ajax 用在项目中 次数特别的多
2. 不是一个新技术，是老技术的新应用
3. 网速慢的情况下，页面加载时间长，用户只能等待
4. 表单提交后，如果一项内容不合格，需要重新填写所有表单内容
5. 页面跳转，重新加载页面，造成资源浪费，增加用户等待时间
6. 局部跳转



### Ajax是什么

它是浏览提供的一套方法，可以实现页面无刷新更新数据，提高用户浏览网站应用的体验

#### Ajax的应用场景

1. 页面上拉加载更多数据
2. 列表数据无刷新分页
3. 表单项离开焦点数据验证
4. 搜索框提示文字的下拉列表

#### Ajax 的运行环境

Ajax 技术需要运行在网站环境中才能生效，当前课程会使用Node创建的服务器作为网站服务器。



## Ajax基本使用

### Ajax运行原理

Ajax相当于浏览器发送请求与接收响应的代理人，以实现在不影响用户浏览页面的情况下，局部更新页面数据，从而提高用户体验。

### 前端

1. 创建页面
2. 创建按钮
3. 给按钮添加点击事件
4. 发起Ajax请求
   * 实例化`XMLHttpRequest`对象
   * 使用`XMLHttpRequest`对象的open方法设置请求方式，请求地址
   * 发送请求
   * 通过`onreadystatechange`等待数据接收完毕，通过`xhr.responseText`获得数据
5. 把后端返回的数据（`xhr.responseText`）显示到页面上

```html
<body>
    <h2>最简单的ajax代码</h2>

    <button>按钮</button>

    <script>
        let oBtn = document.querySelector("button");

        oBtn.onclick = function () {
            // 实例化XMLHttpRequest对象
            let xhr = new XMLHttpRequest();
            // 请求方式，请求地址
            xhr.open('GET', "/simple");
            // xhr.open('GET', "http://localhost/simple");
            // 发送请求
            xhr.send()
            // 每当 readyState 改变时，就会触发 onreadystatechange 事件。
            // readyState 属性存有 XMLHttpRequest 的状态信息。
            xhr.onreadystatechange = function () {
                console.log(xhr.responseText);
                document.querySelector("h2").innerHTML = xhr.responseText;
            }
        }
    </script>
</body>
```

### 后端

```js
const express = require("express");
const path = require("path");

const app = express();

// 把public 作为静态资源目录
console.log(path.join(__dirname, "public"));

app.use(express.static(path.join(__dirname, "public")));
// 如果服务器获取到通过GET方式发送的标识符为/simple的请求，响应一个hello world
app.get("/simple", (req, res) => {
    res.send("hello world")
})

app.listen(80)
```





## Ajax发起GET请求及参数文件

### get前端

```html
<body>
    <!-- 点击按钮 发送用户名和密码给后端 服务器把用户名和密码打印到div中 -->
    <form>
        账号
        <input type="text" name="username">
        密码
        <input type="password" name="password" id="">

    </form>
    <!-- 将button写在form外面 -->
    <button>提交</button>
    <div class="box"></div>

    <script>
        let oBtn = document.querySelector("button");
        let userInput = document.querySelector("input[name='username']");
        let passInput = document.querySelector("input[name='password']");
        oBtn.onclick = function () {
            let username = userInput.value;
            let password = passInput.value;
            // 实例化
            let xhr = new XMLHttpRequest();
            console.log(xhr.readyState);  // 0  实例化了，但是没有设置请求行
            // 设置请求行   请求地址  仿造一个url格式
            xhr.open("GET", `/getParam?username=${username}&password=${password}`);
            console.log(xhr.readyState);  // 1  实例化了，且已经设置了请求行
            // 发送请求
            xhr.send(null)
            // 每当 readyState 改变时，就会触发 onreadystatechange 事件
            // 因为 readystate 有 5 种状态  1，2，3，4，5，上面经历了0和1两种，所以下面还要改变3次(状态3，4，5)
            // ，所以onreadystatechange还会在不同的readystate下触发3次
            xhr.onreadystatechange = function () {
                console.log(xhr.readyState);  // 2 , 3 , 4
                // 判断 ready状态码为4（响应完成）并且，浏览器的状态为200时，触发一次即可
                if (xhr.readyState == 4 && xhr.status == 200) {
                    let data = JSON.parse(xhr.responseText);
                    document.querySelector('.box').innerHTML = `我的账号是${data.username}，我的密码是${data.password}`
                }
            }
        }
    </script>
</body>
```

### get后端

```js
const express = require("express");
const path = require("path");

const app = express();

// 把public 作为静态资源目录
console.log(path.join(__dirname, "public"));

app.use(express.static(path.join(__dirname, "public")));

// 接收GET参数
// 如果服务器获取到通过GET方式发送的标识符为/getParam的请求
app.get("/getParam", (req, res) => {
    res.send(req.query);
    console.log(req.query);
})

app.listen(80)
```



### `readystate` 数据的接收状态

作用：`xhr`的属性，用来表明数据的接收状态 ，`readystate` 有 5 种状态  1，2，3，4，5

0：`xhr`实例化了，但是没有设置请求行

1：`xhr`实例化了，设置了请求行

2：`xhr`对象接收到了服务端的响应头

3：`xhr`对象接收到了服务端的响应头，但是还没有接受完

4：`xhr`对象接收到了服务端的响应头，内容全部接收完毕

<font color=red>所以，为了避免不要的事件触发，我们要判断一下准备状态以及浏览器状态，让事件在完成状态时触发一次即可。</font>

```js
let oBtn = document.querySelector("button");

oBtn.onclick = function () {
    // 实例化XMLHttpRequest对象
    let xhr = new XMLHttpRequest();
    console.log(xhr.readyState);  // 0  实例化了，但是没有设置请求行
    // 请求方式，请求地址
    xhr.open('GET', "http://localhost/simple");
    console.log(xhr.readyState);  // 1  实例化了，且已经设置了请求行
    // 发送请求
    xhr.send()
    console.log(xhr.readyState);  // 1 
    // 每当 readyState 改变时，就会触发 onreadystatechange 事件。
    // readyState 属性存有 XMLHttpRequest 的状态信息。
    // 每当 readyState 改变时，就会触发 onreadystatechange 事件
    // on(当) readystate(准备状态) change(改变的时候) 触发
    // 因为 readystate 有 5 种状态  1，2，3，4，5，上面经历了0和1两种，所以下面还要改变3次(状态3，4，5)
    // ，所以onreadystatechange还会在不同的readystate下触发3次
    xhr.onreadystatechange = function () {
        console.log(xhr.readyState);  // 2 , 3 , 4
        // 所以我们只需要在完成状态时执行一次，即可
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
            document.querySelector("h2").innerHTML = xhr.responseText;
        }
    }
}
```



## Ajax发起POST请求及参数

### post前端

```html
<body>
    <h1>最简单的post请求方式的ajax</h1>
    <button>按钮</button>

    <script>
        let oBtn = document.querySelector("button");
        oBtn.onclick = function () {
            // 实例化对象
            let xhr = new XMLHttpRequest();
            // 设置请求行
            xhr.open("POST", "/postParam");
            // 注意：post请求，必须需要设置请求头
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
            // 发送请求数据  
         xhr.send("username=zhangsan&password=123456");
            // 监听并处理响应
            xhr.onreadystatechange = function () {
                // 判断 ready状态码为4（响应完成）并且，浏览器的状态为200时，触发事件
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log(xhr.responseText);
                }
            }
        }
    </script>
</body>
```

### post后端

```js
const express = require("express");
const path = require("path");

const app = express();
// 把public 作为静态资源目录
console.log(path.join(__dirname, "public"));

app.use(express.static(path.join(__dirname, "public")));
// 中间件
app.use(express.urlencoded())

// 接收post请求
app.post("/postParam", (req, res) => {
    res.send(req.body)
})

app.listen(80)
```



## Ajax发送JSON数据到服务器

### 前端

```html
<body>
    <!-- 使用ajax发送json数据到服务器 -->
    <h2>最简单的ajax代码</h2>
    <button>按钮</button>

    <script>
        let oBtn = document.querySelector("button");
        let userInfo = {
            username: "tom",
            password: "123456"
        }
        oBtn.onclick = function () {
            // 实例化xhr对象
            let xhr = new XMLHttpRequest();
            // 设置请求行
            xhr.open("POST", "http://localhost/json");
            // 设置请求头  文件类型为json
            xhr.setRequestHeader("Content-Type", "application/json");
            // 发送数据  要把对象变成json格式
            xhr.send(JSON.stringify(userInfo));
            // 监听并处理响应
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log(xhr.responseText);
                }
            }
        }
    </script>
</body>
```

### 后端

````js
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser")  // 引入body-parser

const app = express();

// 设置转json数据的中间件
app.use(bodyParser.json());
// 接收json数据
app.post("/json", (req, res) => {
    console.log(req.body);
    res.send(req.body);
})

app.listen(80)
````



## 封装Ajax工具函数

### 封装

```js
// 需求：发起ajax请求其实是非常简单而又麻烦的，
// 为了不写重复的代码，我们要封装一个ajax工具函数

/**
 * 
 * @param {String} type 请求方式
 * @param {String} url 请求地址
 * @param {String} data 请求数据
 * @param {Function} success 请求成功后的回调函数
 */
function ajax(type, url, data, success) {
    // 实例化xhr对象
    let xhr = new XMLHttpRequest();
    // 设置请求行 
    if (type.toLowerCase() == "get") {
        url = url + "?" + data;
        data = null;
    }
    xhr.open(type, url);
    // 如果是post，要设置请求头
    if (type.toLowerCase() == 'post') {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    }
    // 发送请求数据
    xhr.send(data);
    // 监听并处理响应
    xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            success(xhr.responseText);
        }
    }
}
```

#### 改进版

```js
// 改进版
// 上一个版本 使用函数封装
// 使用这个函数的参数必须是有序的，正确的
// 需求：能不能改成无序的，这四个参数，顺序无所谓，只要传了就行，因为用户不知道这个函数的参数

/**
 * 
 * @param {Object} options ajax请求的请求方式|请求地址|请求数据|回调函数 
 */
function ajax(options) {
    // 定义ajax的具体的四个参数
    let type = options.type;
    let url = options.url;
    let data = options.data;
    let success = options.success;
    // 实例化xhr对象
    let xhr = new XMLHttpRequest();
    // 设置请求行 
    if (type.toLowerCase() == "get") {
        url = url + "?" + data;
        data = null;
    }
    xhr.open(type, url);
    // 如果是post，要设置请求头
    if (type.toLowerCase() == 'post') {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }
    // 发送请求数据
    xhr.send(data);
    // 监听并处理响应
    xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            success(xhr.responseText);
        }
    }
}
```

#### 再次改进版

```js
// 上一个版本 使用对象作为参数，但是后端的数据是必须拼接好的，否则就会出错
// 新需求：把要给后端的数据写出对象，让js处理成key=value&key=value的形式
// 而且我们写的还是一个方法，如果项目人多，不知道你对ajax的封装
// 别人的ajax的封装可能会覆盖你的ajax函数，所以我们要写一个命名空间$

let $ = {
    // 把前端的js对象变成key=value&key=value的形式
    /**
     * 
     * @param {Object} dataObj 前端给后端传的数据对象 
     */
    param: function (dataObj) {
        let dataStr = "";
        for (let k in dataObj) {
            dataStr += k + "=" + dataObj[k] + "&"
        }
        // 切掉最后多余的&
        dataStr = dataStr.slice(0, -1);  // name=zs&age=22
        return dataStr;
    },
    /**
    * 
    * @param {Object} options ajax请求的请求方式|请求地址|请求数据|回调函数 
    */
    ajax: function (options) {
        // 定义ajax的具体的四个参数
        // 请求方式，如果传参数，那么就是传的参数，如果没传，那么会是默认的GET
        let type = options.type || "GET";
        let url = options.url || "";
        let data = this.param(options.data || {});
        let success = options.success;
        // 实例化xhr对象
        let xhr = new XMLHttpRequest();
        // 设置请求行 
        if (type.toLowerCase() == "get") {
            url = url + "?" + data;
            data = null;
        }
        xhr.open(type, url);
        // 如果是post，要设置请求头
        if (type.toLowerCase() == 'post') {
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        }
        // 发送请求数据
        xhr.send(data);
        // 监听并处理响应
        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                success(xhr.responseText);
            }
        }
    }
}
```



### 调用

```html
<body>
    <!-- 使用ajax发送json数据到服务器 -->
    <h2>最简单的ajax代码</h2>
    <button>按钮</button>

    <script src="./js/ajaxTools.js"></script>
    <script>
            // 用工具函数
            ajax("POST", "/reqPost", "name=zs&age=18", function (data) {
                console.log(data);
            })
        }
    </script>
</body>
```

#### 改进版调用方式

```html
<body>
    <!-- 使用ajax发送json数据到服务器 -->
    <h2>最简单的ajax代码</h2>
    <button>按钮</button>

    <script src="./js/ajaxTools.js"></script>
    <script>
            // 改进版工具函数
            ajax({
                type: "get",
                url: "/reqGet",
                data: "name=zs&age=22",
                success: function (data) {
                    console.log(data);
                }
            })
    </script>
</body>
```

#### 再次改进版调用方式

```html
<body>
    <!-- 使用ajax发送json数据到服务器 -->
    <h2>最简单的ajax代码</h2>
    <button>按钮</button>

    <script src="./js/ajaxTools.js"></script>
    <script>
            // 再次改进版工具函数
            $.ajax({
                type: "GET",
                url: "/reqGet",
                data: {
                    name: "zs",
                    age: "22"
                },
                success: function (data) {
                    console.log(data);
                }
            })
    </script>
</body>
```



## 使用jQuery的Ajax

### 安装

```
npm i jquery
```

### 引入

```html
<script src="./lib/jquery.min.js"></script>
```

#### 注意：

我们虽然把jquery下载到了第三方模块中，但是我们不能到第三方模块中去引入，因为express框架开启的静态资源管理，只允许我们访问public文件夹内的文件，所以我们需要把下载好的jquery复制粘贴放在public文件夹中的lib里来引入

### 使用

```js
app.listen(80)
// 使用jQuery的ajax
$.ajax({
    // 请求方式
    type: "get",
    // 请求数据
    url: "/reqGet",
    // 请求数据
    data: {
        name: "zs",
        age: 22
    },
    // 成功时的回调函数
    success: function (data) {
        console.log(data);
    }
})
```

