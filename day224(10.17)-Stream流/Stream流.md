## Stream流

在Stream流使用之前，当我们的服务器需要把本地某个文件内容给客户端的时候

```javascript
var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
  	// 缓存到整个文件
    fs.readFile(__dirname + '/data.txt', function (err, data) {
       	// 发送给客户端
        res.end(data);
    });
});
server.listen(3000);
```

<font style="color:#000;background-color:#ff0">`fs.readFile` 接口会把整个文件都缓存到内存中去</font>，然后才开始把数据吐给用户。

所以，当**文件体积很大，请求也很多**的时候，服务器需要<font color='red'>消耗很大的内存，导致性能底下</font>。

`Stream` 流 便可以解决这个问题。

![561179-20170126170225816-1851442511](随堂笔记/561179-20170126170225816-1851442511.a866e5aa.gif)

![561179-20170126172845566-1089400487](随堂笔记/561179-20170126172845566-1089400487.17d20775.gif)

可以大大提升响应时间，减轻服务器内存压力

### 概念

<font style="color:#000;background-color:#ff0">流是一组有序的，有起点和终点的字节数据传输手段</font>，它不关心文件的整体内容，只关注是否从文件中读到了数据，以及读到数据之后的处理。**<font color='red'>流是一个抽象接口（abstract interface）</font>**，被Node中的很多对象所实现。比如：<font color='orange'>HTTP服务器的 `request` 和 `response` 对象都是流对象</font>。

```js
// 所以，我们可以读取文件直接流向res, 因为 res是可写流
var server2 = http.createServer(function (req, res) {
    var stream = fs.createReadStream(__dirname + '/data.txt');
    stream.pipe(res);
});
server2.listen(4000);
```

### 可读流 `createReadStream`

##### 监听data事件

流切换到流动模式,数据会被尽可能快的读出

```js
rs.on('data', function (data) { console.log(data);});
```

##### 监听end事件

该事件会在读完数据后被触发

```js
rs.on('end', function () { console.log('读取完成');});
```

##### 监听error事件

该事件会在读完数据出错时被触发

```js
rs.on('error', function (err) { console.log(err);});
```

##### 监听open事件

该事件会在打开被读取文件时被触发

```js
rs.on('open', function () { console.log(err);});
```

##### 监听close事件

该事件会在关闭被读取文件时被触发

```js
rs.on('close', function () { console.log(err);});
```

##### 设置编码

与指定 `{encoding:'utf8'}` 效果相同，设置编码

```js
rs.setEncoding('utf8');
```

##### 暂停和恢复触发data

通过pause()方法和resume()方法

```js
rs.on('data', function (data) { rs.pause(); console.log(data);});
setTimeout(function () { rs.resume();},2000);
```

### 可写流 `createWriteStream`

##### write方法

```js
ws.write(chunk,[encoding],[callback]);
```

* chunk写入的数据buffer/string
* encoding编码格式chunk为字符串时有用，可选
* callback 写入成功后的回调

注意：返回值为布尔值，系统缓存区满时为false,未满时为true

##### end方法

```js
ws.end(chunk,[encoding],[callback]);
```

表明接下来没有数据要被写入 Writable 通过传入可选的 chunk 和 encoding 参数，可以在关闭流之前再写入一段数据 如果传入了可选的 callback 函数，它将作为 'finish' 事件的回调函数

##### finish方法

在调用了 `stream.end()` 方法，且缓冲区数据都已经传给底层系统之后， 'finish' 事件将被触发。

### pipe方法

pipe方法是管道的意思，可以控制速率

- 会监听rs的on('data'),将读取到的内容调用 `ws.write`方法
- 调用写的方法会返回一个boolean类型
- 如果返回了false就调用 `rs.pause()` 暂停读取
- 等待可写流写入完毕后 on('drain') 在恢复读取 pipe方法的使用

```js
let fs = require('fs');
let rs = fs.createReadStream('./2.txt',{
  highWaterMark:1
});
let ws = fs.createWriteStream('./1.txt',{
  highWaterMark:3
});
rs.pipe(ws); // 会控制速率(防止淹没可用内存)
```

#### <font color='red'>`Koa` 中 `ctx.body` 可以直接用 `readStream` 赋值</font>

因为内部封装了 `pipe()` 方法

## 文件上传

使用`koa2`的时候，处理post请求使用的是 `koa-bodyparser`，同时如果是图片上传使用的是 `koa-multer` 
