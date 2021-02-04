## guestbook 留言板

### 需求

展示留言

添加留言

### 功能

#### 显示已经存在的留言

#### 添加留言

#### <font color=red>新方法</font>

express的 `status`

express的 `json`

```js
// status 200代表的是浏览器的状态码
// 这里的status方法是设置http状态码
// json方法是以json的形式返回数据
res.status(200).json({
// 返回给前端的状态数据
	code: 200,
 	// 返回给前端的状态数据对应的信息
    msg: "数据添加成功"
})
```



express设置post请求数据获取中间件

```js
// extended: false：表示使用系统模块querystring来处理，也是官方推荐的
// extended: true：表示使用第三方模块qs来处理
app.use(express.urlencoded({ extended: false }));
```



## 模板引擎

### 作用：

为了解决复杂数据的页面渲染

### ArtTemplate

artTemplate是新一代的高性能的javascript模板引擎

### 使用：

1. 引入ArtTemplate库

   ```html
   <script src="./lib/template-web.js"></script>
   ```

2. 在引入所有库之后，创建模板

   text/template的作用就是防止这部分内容按js文件执行

   ```html
       <script type="text/template" id="str_templ">
           <h1>{{content}}</h1>
       </script>
   ```

3. 使用template方法渲染html  =  template("模板ID",对象)

   ```html
       <script>
           let title = "我是标题";
           let oBtn = document.querySelector("button");
           oBtn.onclick = function () {
               let htmlStr = template("str_templ", {
                   content: title
               })
               // 插入页面
               document.querySelector("div").innerHTML = htmlStr;
           }
       </script>
   ```

### 语法：

#### 插入列表数据

```html
<body>
    <button>按钮</button>
    <div></div>
    <script src="./lib/template-web.js"></script>
    <script type="text/template" id="list_templ">
   		<!-- each为遍历, 遍历两个each中间的内容 -->
        {{each target}}
        <!-- 加上$，index为索引，value为值 -->
        <li>{{$index}}-{{$value}}</li>
        {{/each}}
    </script>
    <script>
        let data = ["你", '我', "他"]
        let oBtn = document.querySelector("button");
        oBtn.onclick = function () {
            let htmlStr = template("list_templ", {
                target: data
            })
            // 插入页面
            document.querySelector("div").innerHTML = htmlStr;
        }
    </script>
</body>
```

#### 根据一定判断插入

```html
<body>
    <button>按钮</button>
    <div></div>

    <script src="./lib/template-web.js"></script>
    <script type="text/template" id="judge_templ">
        {{if data.length>0}}
        <ul>
            {{each data}}
            <li>{{$value}}</li>
            {{/each}}
        </ul>
        {{else}}
        <p>没有数据</p>
        {{/if}}
    </script>
    <script>
        let data = ["你", '我', "他"]
        let oBtn = document.querySelector("button");
        oBtn.onclick = function () {
            let htmlStr = template("judge_templ", {
                data: data
            })
            // 插入页面
            document.querySelector("div").innerHTML = htmlStr;
        }
    </script>
</body>
```

