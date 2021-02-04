# day85-ajax练习

## member项目

### 准备工作

#### 初始化项目

命令: >npm init -y

#### 一个简单的服务器

命令: npm install express
创建: app.js

```js
// 1.引入包
const express = require('express');
// 2.设置包
// 2.1 使用express方法创建服务器
const app = express();

// 3.处理请求并响应

// 4.指定端口并启动服务
app.listen(80, () => {
  console.log("服务器已启动，请访问: http://localhost");
})
```

#### 静态资源设置

```js
// 2.2 设置静态资源目录
app.use(express.static(path.join(__dirname, 'public')))
```

#### 把静态资源放到项目中

1.index.html
2.detail.html
3.css文件夹
4.image文件夹
5.upload文件夹
6.lib文件夹
7.js文件夹

## 查

### 显示所有数据

#### 前端页面

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>Members</title>
  <!-- bootstrap UI框架 -->
  <link rel="stylesheet" href="./lib/bootstrap/dist/css/bootstrap.min.css">
  <!-- 该页面CSS -->
  <link rel="stylesheet" href="./css/index.css">

</head>

<body>
  <header>
    <div class="navbar navbar-dark navbar-expand-sm bg-dark shadow-sm">
      <div class="container">
        <a href="#" class="navbar-brand d-flex justify-content-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="feather feather-aperture">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="14.31" y1="8" x2="20.05" y2="17.94"></line>
            <line x1="9.69" y1="8" x2="21.17" y2="8"></line>
            <line x1="7.38" y1="12" x2="13.12" y2="2.06"></line>
            <line x1="9.69" y1="16" x2="3.95" y2="6.06"></line>
            <line x1="14.31" y1="16" x2="2.83" y2="16"></line>
            <line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>
          </svg>
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav">
            <li class="nav-item active"><a class="nav-link" href="#">Members</a></li>
          </ul>
        </div>
      </div>
    </div>
  </header>

  <main role="main">
    <section class="jumbotron mb-0 bg-white text-center">
      <div class="container">
        <h1 class="display-4">Members</h1>
        <p class="lead text-muted">All members~</p>
        <div>
          <a href="#" class="btn btn-primary my-2">New member</a>
          <a href="#" class="btn btn-secondary my-2">Secondary action</a>
        </div>
      </div>
    </section>

    <section class="py-5 bg-light">
      <div class="container">
        <div id="members" class="row">
          <div class="col-lg-4 col-md-6">
            <div class="card mb-4">
              <div class="card-img-top py-4 bg-dark text-center">
                <img class="img-thumbnail mb-2 rounded-circle" src="/image/icon-1.png" alt="heima" width="128">
                <h3 class="card-title text-light">heima</h3>
              </div>
              <div class="card-body">
                <p class="card-text">MAKE IT BETTER!</p>
                <a href="#" class="card-link">View</a>
                <a href="#" class="card-link text-danger">Delete</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="py-5 text-muted">
    <p class="container">
      <span>this demo &copy; heima
        <a class="float-right" href="#">Back to top &uparrow;</a>
    </p>
  </footer>
  <!-- jQuery库 -->
  <script src="./lib/jquery/dist/jquery.min.js"></script>
  <!-- ArtTemplate库 -->
  <script src="./lib/ArtTemplate/template-web.js"></script>
  <!-- 模板 -->
  <!-- 该页面的js文件 -->
  <script src="./js/main.js"></script>
</body>

</html>
```

#### 前端代码

```js
// 载入事件
$(document).ready(function () {
  // 发起ajax请求
  $.ajax({
    // 请求方式
    type: 'GET',
    // 请求地址
    url: '/api/getAll',
    // 请求数据
    data: null,
    // 请求成功时的回调函数
    success: function (result) {
      // 渲染页面
      // console.log(data);
      let htmlStr = template('list_templ', {
        list: result.data
      });

      $('#members').html(htmlStr);
    }
  })

})
```

#### 后端代码

`请求处理`

```js
// 3.1 获取所有数据
// 1.引入包
const express = require('express');
const path = require('path');
const data = require('./data');
// 2.设置包
// 2.1 使用express方法创建服务器
const app = express();
// 2.2 设置静态资源目录
app.use(express.static(path.join(__dirname, 'public')))
// 3.处理请求并响应

// 3.1 获取所有数据
app.get('/api/getAll', (req, res) => {
  // console.log(typeof data.get());
  if (!data.get()) {
    return res.status(500).send({
      code: 500,
      msg: '服务器端错误',
      data: null
    })
  }

  return res.status(200).send({
    code: 200,
    msg: "数据获取成功",
    data: data.get()
  })

})

// 4.指定端口并启动服务
app.listen(80, () => {
  console.log("服务器已启动，请访问: http://localhost");
})
```

`数据处理`

```js
// index.js的作用就是用来处理members.json或者backup.json文件
// 增加 删除 修改 查询 都要用index.js里面的方法来做

// 引入包
// 1.导入fs包
const fs = require('fs');
// 2.导入path
const path = require('path');
// 3.导入backup.json文件
const database = require('./backup.json');

// 把方法导出

module.exports = {
  // get: function (){}
  get: () => {
    return database
  }
}
```

#### 数据库代码(db.json)

### 显示某一条数据的详情页

#### 第一步: index.html

<a href="/details.html?id={{$value.id}}" class="card-link" data-id="{{$value.id}}">View</a>

#### 第二步: details.html中 获取id

```js
  let id = new URLSearchParams(location.search).get('参数键');
```

#### 第三步: 把id传给服务器

```js
$(document).ready(function () {
  // console.log(location)
  // console.log(location.href); // http://localhost/detail.html?id=3
  // console.log(location.search); // ?id=3
  // URL查询参数对象
  // let queryStr = new URLSearchParams(location.search);

  let id = new URLSearchParams(location.search).get('id'); // 字符串切割方法也可以做
  $.ajax({
    type: 'get',
    url: '/api/getDetail',
    data: {
      id: id
    },
    success: function (data) {
      console.log(data);
    }
  })
})
```

#### 第四步: 让data中的index查找id为1的这条数据给服务器

```js
 getById: (id) => {
    // console.log(id)
    // 数组.find() 遍历数组 找到 某一个元素的id和传入的id一样 就把这个元素返回
    return database.find((item) => {
      // 如果数组的元素中的id和传入的id一样 那么就返回这个元素
      return item.id === id;
    })

    // console.log(info);
  }
```

#### 第五步: 让服务器把从data中获取的数据返回给前端

```js
// 3.1 获取所有数据
app.get('/api/getAll', (req, res) => {
  // console.log(typeof data.get());
  if (!data.get()) {
    return res.status(500).send({
      code: 500,
      msg: '服务器端错误',
      data: null
    })
  }

  return res.status(200).send({
    code: 200,
    msg: "数据获取成功",
    data: data.get()
  })

})

// 3.2 通过id查找某一条数据
app.get('/api/getDetail', (req, res) => {
  // console.log(req.query.id);
  if (!req.query.id) {
    return res.status(404).send({
      code: 404,
      msg: "没有找到您找的数据",
      data: null
    })
  }
  let itemInfo = data.getById(parseInt(req.query.id));

  res.status(200).send({
    code: 200,
    msg: "数据查找成功",
    data: itemInfo
  })
})
```

#### 第六步: 渲染页面

```js
  let id = new URLSearchParams(location.search).get('id');
  $.ajax({
    type: 'get',
    url: '/api/getDetail',
    data: {
      id: id
    },
    success: function (result) {
      // console.log(data);
      let htmlStr = template('detail_templ', result.data);

      $('.jumbotron').html(htmlStr);
    }
  })
})

```

## 删

## 改

## 增