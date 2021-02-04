## 文件预览(主要前端代码)

需要URL对象的`createObjectURL`方法，参数为DOM对象`input:file`的files数组中的文件对象

```js
  // 当input中选择到图片，那么就在网页中预览图片

    // 1.获取元素 
    let oInput = document.querySelector('input');
    let oImg = document.querySelector('img');
    // 2.当input中的文件从空到有文件的时候 触发chnage事件
    oInput.onchange = function () {
      // console.dir(oInput.files[0]);
      // 重点
      let imgUrl = URL.createObjectURL(oInput.files[0])
      // 3.把图片的url设置一下
      oImg.src = imgUrl;
```

## 表单文件上传(主要关注后台)

### 前端代码

1.上传文件 必须使用POST请求
2.`form`标签的属性`enctype`必须要加 `enctype="multipart/form-data"`

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <form action="/profile" method="POST" enctype="multipart/form-data">
    <!-- 上传头像 -->
    <input type="file" name="avatar">
    <input type="submit" value="按钮">
  </form>
</body>

</html>
```

### 后端代码(`multer`)

1.下载引入`multer`
2.设置`multer`
3.接收到的数据打印出来

### `multer`

`Multer`是Express官方推出的，用于Node.js`multipart/form-data`请求数据处理的中间件。它基于busboy构建，可以高效的处理文件上传，但并不处理`multipart/form-data`之外的用户请求。

**`Multer`在解析完请求体后，会向Request对象中添加一个body对象和一个file或files对象（上传多个文件时使用files对象 ）。其中，body对象中包含所提交表单中的文本字段（如果有），而file(或files)对象中包含通过表单上传的文件。**

#### `multer`解析完上传文件后，会被保存为一个包含以下字段的对象：

`fieldname` - 表单提交的文件名(input控件的name属性)
`originalname` - 文件在用户设备中的原始名称
encoding - 文件的编码类型
`mimetype` - 文件的Mime类型
size - 文件的大小
destination - 文件的保存目录(`DiskStorage`)
filename - 文件在destination中的名称(`DiskStorage`)
path - 上传文件的全路径(`DiskStorage`)

buffer - 文件对象的Buffer(`MemoryStorage`)

#### 在一般的Web应用中，只有`dest`选项需要设置。使用示例如下：

`var upload = multer({ dest: 'uploads/' })`

如果需要对上传文件做更多控制，可以使用storage代替`dest`，`Multer`会将存储引擎由`DiskStorage`(硬盘存储)切换为`MemoryStorage`(内存存储)。

创建`multer`对象后，我们可以使用以下实例来接收上传文件：

`.single(fieldname)` - 单个文件上传

接收一个名为`fieldname`的上传文件，所上传的文件会被保存在`req.file`。



```js
// 1.引入包
const express = require('express');
const path = require('path');
const multer = require('multer')

// 2.设置包
// 2.1 创建后台服务
const app = express();
// 2.2 设置静态资源目录
app.use(express.static(path.join(__dirname, 'public')))
// 2.3 设置文件上传的路径
let uploader = multer({
  storage: multer.diskStorage({
    // 确定上传的文件在哪里 cb: callback
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, 'upload'))
    },
    // 确定你上传之后的文件的名字
    filename: (req, file, cb) => {
      // originname包含文件的名字和后缀
      cb(null, file.originalname)
    }
  })
})
// 3.处理请求并响应
app.post('/profile', uploader.single('avatar'), function (req, res) {
  // req.file 是 `avatar` 文件的信息
  console.log(req.file)
  // req.body 将具有文本域数据，如果存在的话
})


// 4.指定端口并启动服务
app.listen(80, () => {
  console.log("服务器已启动，请访问: http://localhost");
})
```

## formData(ajax文件上传)

### 介绍

表单数据以键值对的形式向服务器发送，这个过程是浏览器自动完成的。但是有时候，我们希望通过脚本完成过程，构造和编辑表单键值对，然后通过XMLHttpRequest.send()方法发送。浏览器原生提供了 FormData 对象。

### 方法

```js
//通过FormData构造函数创建一个空对象
var formdata=new FormData();
//可以通过append()方法来追加数据
formdata.append("name","laotie");
//通过get方法对值进行读取
console.log(formdata.get("name"));//laotie
//通过set方法对值进行设置
formdata.set("name","laoliu");
console.log(formdata.get("name"));//laoliu
```



### 前端

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <!-- formData 提供的元素内置对象 和XMLHttpRequest 和 Date()  和 Math  和Array对象 -->
  <!-- 方便我们进行表单的序列化 -->
  <!-- set() -->
  <!-- get() -->
  <!-- append() -->
  <!-- <form>
    <input type="text" name="username" placeholder="请输入用户名">
    <input type="password" name="password" placeholder="请输入密码">

    <input type="button" value="按钮">
  </form>
  <script>
    document.querySelector('input[type="button"]').onclick = function () {

      // $('form').serialize();
      // 1.实例化formdata
      let formdata = new FormData(document.querySelector('form'));

      // console.log(formdata.get('username'))
      // console.log(formdata.get('password'));
      // formdata.append("键","值")
      // formdata.append('email', 'q3423@qq.com');

      // console.log(formdata.get('email'));
    } -->
  <!-- </script> -->
  <!-- 把图片 和 数据发送给服务器 -->
  <form>
    <!-- 1.用户名 -->
    <input type="text" name="username" placeholder="请输入用户名">
    <!-- 2.密码 -->
    <input type="password" name="password" placeholder="请输入密码">
    <!-- 3.头像 -->
    <input type="file" name="avatar" id="">
  </form>

  <button>按钮</button>
  <script src="./lib/jquery.min.js"></script>
  <script>
    $('button').on('click', function () {
      // 使用原生的序列化方法 序列化表单
      let formdata = new FormData(document.querySelector('form'));

      $.ajax({
        type: 'post',
        url: '/profile',
        data: formdata,
        // 注意: 有两个地方注意
        // {} => key=value&key=value 不要转成key=value&key=value
        processData: false,
        // 不要让jquery自动添加content-type
        contentType: false,
        success: function (data) {
          console.log(data);
        }
      })
    })
  </script>


</body>

</html>
```

### 后端

```js
// 1.引入包
const express = require('express');
const path = require('path');
const multer = require('multer')

// 2.设置包
// 2.1 创建后台服务
const app = express();
// 2.2 设置静态资源目录
app.use(express.static(path.join(__dirname, 'public')))
// 2.3 设置文件上传的路径
let uploader = multer({
  storage: multer.diskStorage({
    // 确定上传的文件在哪里 cb: callback
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, 'upload'))
    },
    // 确定你上传之后的文件的名字
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
  })
})
// 3.处理请求并响应
app.post('/profile', uploader.single('avatar'), function (req, res) {
  // req.file 是 `avatar` 文件的信息
  console.log(req.file)

  // req.body 将具有文本域数据，如果存在的话
  console.log(req.body);
})


// 4.指定端口并启动服务
app.listen(80, () => {
  console.log("服务器已启动，请访问: http://localhost");
})
```

## members 添加用户

### 在·`index.html`中添加到`add.html`的超链接

```html
 <a href="/add.html" class="btn btn-primary my-2">New member</a>
```

### 当选择头像图片之后 要进行预览

```js
$(function () {
  // 预览
  // 1.给图片上传控件添加change事件
  $('#input_avatar').on('change', function () {
    // 2.获取input中的文件对象 xxx.files[0]

    // 3.创建URL.createObjectURL(oInput.files[0])
    //  $('#input_avatar')[0].files[0]
    let imgSrc = URL.createObjectURL($(this)[0].files[0]);
    // console.log(imgSrc);
    // 4.赋值
    $('#avatar').attr('src', imgSrc);
  })

  // ajax请求
})
```

### 当点击save按钮的时候 把数据发送到服务器

```js
  // ajax请求

  // 1.给Save按钮添加一个点击事件
  $('#btn_add').on('click', function () {
    // 2.把需要的数据都收集好，放到formdata中去
    let formdata = new FormData();

    formdata.append('name', $('#input_name').val());
    formdata.append('bio', $('#input_bio').val());
     formdata.append('avatar', $('#input_avatar')[0].files[0]);
    // 3.发起ajax请求

    $.ajax({
      type: 'POST',
      url: '/api/add',
      data: formdata,
      processData: false,
      contentType: false,
      // 成功时的回调函数
      success: function (result) {
        console.log(result)
      },
      // 失败时的回掉函数
      error: function () {
        alert("用户添加失败")
      }
    })

    // 点击按钮之后 以后的操作就不做了
    // 解决按钮重复点击的问题 操作true 或 false
    return false;
  })


})
```

### 服务器处理前端发送来的请求(1.图片是否已经上传成功2.数据是否接受成功)

```js
// 1.引入包
const express = require('express');
const path = require('path');
const multer = require('multer');
const data = require('./data');
// 2.设置包
// 2.1 使用express方法创建服务器
const app = express();
// 2.2 设置静态资源目录
app.use(express.static(path.join(__dirname, 'public')))
// 2.3 设置multer
let uploader = multer({
  storage: multer.diskStorage({
    // 确定上传的文件在哪里 cb: callback
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, 'public', 'upload'))
    },
    // 确定你上传之后的文件的名字
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
  })
})
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

// 3.3 添加用户
app.post('/api/add', uploader.single('avatar'), function (req, res) {
  // req.file 是 `avatar` 文件的信息
  console.log(req.file)

  // req.body 将具有文本域数据，如果存在的话
  console.log(req.body);
})


// 4.指定端口并启动服务
app.listen(80, () => {
  console.log("服务器已启动，请访问: http://localhost");
})
```

### 把接受到的数据放到数据库中(backup.json)

`app.js`

```js
// 3.3 添加用户
app.post('/api/add', uploader.single('avatar'), function (req, res) {
  // req.file 是 `avatar` 文件的信息
  // console.log(req.file)

  // req.body 将具有文本域数据，如果存在的话
  // console.log(req.body);


  // 错误的判断
  // 构建数据结构
  let member = {
    id: +new Date(),
    name: req.body.name,
    avatar: `/upload/${req.file.filename}`,
    bio: req.body.bio,
    created: new Date()
  };
  // console.log(member);
  data.add(member);

  res.send({
    code: 200,
    message: "用户添加成功",
    data: null
  })
})

```

`index.js`

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
  },
  getById: (id) => {
    // console.log(id)
    // 数组.find() 遍历数组 找到 某一个元素的id和传入的id一样 就把这个元素返回
    return database.find((item) => {
      // 如果数组的元素中的id和传入的id一样 那么就返回这个元素
      return item.id === id;
    })

    // console.log(info);
  },
  // 添加用户
  add: (member) => {
    database.unshift(member)
    // console.log(database);
    let json = JSON.stringify(database);
    // console.log(json);
    // 带sync的是同步的 
    fs.writeFileSync(path.join(__dirname, 'backup.json'), json);

  }
}
```

