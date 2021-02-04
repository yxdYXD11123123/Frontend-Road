## <font color="mediumturquoise">前端部分</font>

### 解析当前页面的`href`中`search`的内容

#### 语法：

```json
// http://localhost/detail.html?id=13
// location.search 也就是 '?id=13' 
let searchObj = new URLSearchParams(location.search);
let id = searchObj.get("id") // "13"
```



### 获取文件信息

只用 文件输入框 才有 files属性，并且files属性只有DOM元素有，`jquery`对象没有

#### 语法：

```js
let filesList = $("input:file")[0].files
// FileList {0: File, length: 1}
```



### 获取文件的`url`，达到预览效果

 使用 `URL` 对象的 `createObjectURL` 方法，参数为文件对象

#### 语法：

```js
let imgSrc = URL.createObjectURL(file)
// blob:http://localhost/9583383b-7482-4cb2-80c8-9bd288283103
```



### 用Ajax向后端传输文件数据时

1. 必须使用post请求

2. 必须设置

   ```js
   // 不让jquery将数据转换为 数据字符串的格式
   processData: false,
   // 不让jquery设置contentType
   contentType: false,
   ```

   







## <font color="mediumturquoise">后端部分</font>

### 寻找数组中对应的属性值的某一条数据元素/元素的索引

#### 语法：

```js
/*
[
    {
        name: "zs"
    },
    {
        name: "ls"
    }
]
*/
let index = dataArr.findIndex((item) => {
	return item.name === "ls";
}) 
// index = 1 
let item = dataArr.find((item) => {
	return item.name === "ls";
})
// item = {name: "ls"}
```



### `multer` 的使用

下载引入，然后

```js
// 使用multer创建对象，并设置接收的文件 upload 的存储 以及 命名
let uploader = multer({
    storage: multer.diskStorage({
        // 文件名为 原本的名字
        filename: (req, file, cd) => {
            cd(null, file.originalname);
        },
        // 存储位置
        destination: (req, file, cd) => {
            cd(null, path.join(__dirname, "public", "upload"));
        }
    })
})

// 设置中间件，single是解析单个文件
app.post("/addData", uploader.single('文件的name名'), (req, res) => {

})
```



### 在使用`fs`模块时，可以采用同步和异步两种不同的方式写入数据

```js
// 同步
fs.writeFileSync(...);
// 异步
fs.writeFile(...);
```

